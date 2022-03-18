import { defineStore } from 'pinia'
import { Project } from '@/domains/project'
import { PageConfig, PageVariable, MoveType } from '@/domains/editor'
import { getProject } from '@/api/project'
import { DatavComponent } from '@/components/_models/datav-component'
import { getTextParams } from '@/utils/util'
import { calcIntersectingLines } from '@/utils/intersecting-line-util'
import { debounce } from 'lodash-es'
import { useComStore, findComIndex } from './com'

export interface AlignLine {
  top: number
  bottom: number
  left: number
  right: number
  vertical: number
  horizontal: number
  enable: boolean
  show: boolean
}

export interface IEditorState {
  editMode: boolean
  screen: Partial<Project>
  pageConfig: PageConfig
  canvas: {
    scale: number
    width: number
    height: number
  }
  guideLine: {
    h: number[]
    v: number[]
  }
  referLine: {
    enable: boolean
  }
  alignLine: AlignLine
  contextMenu: {
    show: boolean
  }
  variables: PageVariable
  isNormalResizeMode: boolean
}

const selectCom = (id: string, coms: DatavComponent[]) => {
  coms.forEach(com => {
    if (com.id === id) {
      com.selected = true
    } else {
      com.selected = false
    }
    com.hovered = false
  })
}

export const useEditorStore = defineStore('editor', {
  state: (): IEditorState => ({
    editMode: false,
    screen: {
      id: 0,
      name: '',
      share: '',
      thumbnail: '',
      groupId: 0,
    },
    pageConfig: {
      width: 1920,
      height: 1080,
      bgimage: '//files.pengxiaotian.com/datav/bj.png',
      bgcolor: 'rgba(13,42,67,0)',
      grid: 8,
      screenshot: '',
      zoomMode: 1,
      useWatermark: true,
      styleFilterParams: {
        enable: false,
        hue: 0,
        saturate: 100,
        brightness: 100,
        contrast: 100,
        opacity: 100,
      },
    },
    canvas: {
      scale: 0.2,
      width: 1920,
      height: 1080,
    },
    guideLine: {
      h: [],
      v: [],
    },
    referLine: {
      enable: true,
    },
    alignLine: {
      enable: false,
      show: false,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      vertical: 0,
      horizontal: 0,
    },
    contextMenu: {
      show: false,
    },
    variables: {
      componentsView: {},
      publishersView: {},
      subscribersView: {},
    },
    isNormalResizeMode: true,
  }),
  actions: {
    setEditMode() {
      this.editMode = true
    },
    selectCom(id: string, coms: DatavComponent[]) {
      selectCom(id, coms)
    },
    calcAlignLine(com: DatavComponent, coms: DatavComponent[]) {
      if (!this.alignLine.enable) {
        return
      }

      const attr = calcIntersectingLines(com, coms, this.canvas.scale)
      this.alignLine = { ...this.alignLine, ...attr, show: true }
    },
    hideAlignLine(id: string, coms: DatavComponent[]) {
      if (!this.alignLine.enable) {
        return
      }

      if (this.alignLine.enable && this.alignLine.show) {
        this.alignLine.show = false
        selectCom(id, coms)
      }
    },
    moveCom(id: string, moveType: MoveType) {
      const comStore = useComStore()
      const i = findComIndex(comStore.coms, id)
      if (moveType === MoveType.up) {
        if (i + 1 < comStore.coms.length) {
          comStore.coms.splice(i + 1, 0, ...comStore.coms.splice(i, 1))
        }
      } else if (moveType === MoveType.down) {
        if (i > 0) {
          comStore.coms.splice(i - 1, 0, ...comStore.coms.splice(i, 1))
        }
      } else if (moveType === MoveType.top) {
        if (i + 1 < comStore.coms.length) {
          comStore.coms.push(...comStore.coms.splice(i, 1))
        }
      } else if (moveType === MoveType.bottom) {
        if (i > 0) {
          comStore.coms.unshift(...comStore.coms.splice(i, 1))
        }
      }
    },
    setPublishersView(id: string, keys: string[], enable: boolean) {
      const pv = this.variables.publishersView
      const pvkeys = Object.keys(pv)
      const allKeys = new Set([...keys, ...pvkeys])
      allKeys.forEach(key => {
        if (enable) {
          if (!pvkeys.includes(key)) {
            pv[key] = [id]
          } else if (!pv[key].includes(id)) {
            pv[key].push(id)
          } else if (!keys.includes(key)) {
            pv[key] = pv[key].filter(m => m !== id)
          }
        } else {
          if (pvkeys.includes(key)) {
            pv[key] = pv[key].filter(m => m !== id)
          }
        }

        if (pv[key].length === 0) {
          delete pv[key]
        }
      })
    },
    setSubscribersView(id: string, data: string) {
      const sv = this.variables.subscribersView
      const keys = getTextParams(data).map(m => m.substring(1))
      const svkeys = Object.keys(sv)
      const allKeys = new Set([...keys, ...svkeys])
      for (const key of allKeys) {
        if (keys.length > 0) {
          if (!svkeys.includes(key)) {
            sv[key] = [id]
          } else if (!sv[key].includes(id)) {
            sv[key].push(id)
          } else if (!keys.includes(key)) {
            sv[key] = sv[key].filter(m => m !== id)
          }
        } else {
          if (svkeys.includes(key)) {
            sv[key] = sv[key].filter(m => m !== id)
          }
        }

        if (sv[key].length === 0) {
          delete sv[key]
        }
      }
    },
    setEditorOption(payload: {
      screen?: Partial<Project>
      config?: Partial<PageConfig>
      variables?: PageVariable
      guideLine?: {
        h: number[]
        v: number[]
      }
    }) {
      if (payload.screen) {
        this.screen = { ...this.screen, ...payload.screen }
      }

      if (payload.config) {
        this.pageConfig = { ...this.pageConfig, ...payload.config }
      }

      if (payload.variables) {
        this.variables = { ...payload.variables }
      }

      if (payload.guideLine) {
        this.guideLine = { ...payload.guideLine }
      }
    },
    async autoCanvasScale(payload: () => { offsetX: number; offsetY: number; }) {
      const resize = debounce(() => {
        const offset = payload()
        const width = document.documentElement.clientWidth - offset.offsetX
        const height = document.documentElement.clientHeight - 42 - 32 - offset.offsetY

        const a = (width - 120) / this.pageConfig.width
        const b = (height - 140) / this.pageConfig.height
        const scale = parseFloat((a > b ? b : a).toFixed(6)) * 100

        this.setCanvasScale(scale, offset.offsetX, offset.offsetY)
      }, 200)

      window.onresize = resize

      resize()
    },
    async setCanvasScale(scale: number, offsetX: number, offsetY: number) {
      let width = document.documentElement.clientWidth - offsetX
      let height = document.documentElement.clientHeight - 42 - 32 - offsetY
      const deltaS = Math.min(Math.max(scale, 10), 200) / 100

      // 方便计算滚动条 和 标尺
      const deltaW = this.pageConfig.width * deltaS
      const deltaH = this.pageConfig.height * deltaS
      if (width < deltaW) {
        width = deltaW + 400
      }

      if (height < deltaH) {
        height = deltaH + 400
      }

      this.canvas = { scale: deltaS, width, height }
    },
    async loadScreen(projectId: number) {
      try {
        const { data } = await getProject(projectId)
        if (data.code === 0) {
          const { config } = data.data
          this.setEditorOption({
            screen: {
              id: projectId,
              name: data.data.name,
            },
            config: {
              bgcolor: config.bgcolor,
              width: config.width,
              height: config.height,
              bgimage: config.bgimage,
              screenshot: config.screenshot,
              zoomMode: config.zoomMode,
              useWatermark: config.useWatermark,
              grid: config.grid,
              styleFilterParams: config.styleFilterParams,
            },
            variables: config.variables,
          })
        } else {
          throw Error(data.message)
        }
      } catch (error) {
        throw error
      }
    },
  },
})

import{U as e}from"./constants.0fbfcb4e.js";import{d as l,j as t,f as a,o,c as s,w as i,a as n,b as c,t as d,m as p,r as f}from"./index.bca10506.js";var r=l({name:"GField",props:{label:{type:String,required:!0},tooltip:String,toggle:Boolean,modelValue:{type:Boolean,default:!0},level:{type:Number,default:1},nest:Boolean,caption:String,disabled:Boolean},emits:[e],setup:(l,a)=>({toggleVisible:()=>{a.emit(e,!l.modelValue)},labelStyle:t((()=>({span:l.nest?24:0}))),contentStyle:t((()=>({span:l.nest?24:0})))})});const g={class:"g-field-show-placeholder"};r.render=function(e,l,t,r,b,u){const m=a("el-tooltip"),y=a("el-col"),w=a("el-row");return o(),s(w,{class:["g-field-wp",`--lv${e.level}`,{"--disable":e.disabled||e.toggle&&!e.modelValue}]},{default:i((()=>[n(y,p({class:"g-field"},e.labelStyle),{default:i((()=>[n("i",g,[e.toggle?(o(),s("i",{key:0,class:["g-field-show",e.modelValue?"v-icon-show":"v-icon-hide"],onClick:l[1]||(l[1]=(...l)=>e.toggleVisible&&e.toggleVisible(...l))},null,2)):c("",!0)]),e.tooltip?(o(),s(m,{key:0,effect:"blue",placement:"top",offset:2},{content:i((()=>[n("span",{innerHTML:e.tooltip},null,8,["innerHTML"])])),default:i((()=>[n("label",{class:"g-field-title-with-description",title:e.label},d(e.label),9,["title"])])),_:1})):(o(),s("label",{key:1,class:"g-field-title",title:e.label},d(e.label),9,["title"]))])),_:1},16),n(y,p({class:"g-field-container"},e.contentStyle),{default:i((()=>[f(e.$slots,"default"),e.caption?(o(),s("span",{key:0,class:"g-field-caption",title:e.caption},d(e.caption),9,["title"])):c("",!0)])),_:3},16)])),_:1},8,["class"])},r.install=e=>{e.component(r.name,r)};export default r;
import{U as e}from"./constants.0fbfcb4e.js";import{d as l,e as t,k as a,C as o,D as s,f as i,o as d,c,a as n,E as p,b as m,r as u,B as f,t as r,G as g}from"./index.bca10506.js";var b=l({name:"GFieldCollapse",props:{label:{type:String,required:!0},tooltip:{type:String},toggle:{type:Boolean,default:!1},modelValue:{type:Boolean,default:!0}},emits:[e],setup(l,o){const s=t([]);return a((()=>l.modelValue),(e=>{e||(s.value=[])})),{activeNames:s,toggleVisible:l=>{o.emit(e,l)}}}});const v=g();o("data-v-591924c6");const V={class:"g-field-show-placeholder"};s();const y=v(((e,l,t,a,o,s)=>{const g=i("el-switch"),b=i("el-tooltip"),y=i("el-collapse-item"),h=i("el-collapse");return d(),c(h,{modelValue:e.activeNames,"onUpdate:modelValue":l[2]||(l[2]=l=>e.activeNames=l),class:["g-field-collapse",[{"--disable":e.toggle&&!e.modelValue}]]},{default:v((()=>[n(y,{disabled:!e.modelValue},{title:v((()=>[n("i",V,[e.toggle?(d(),c(g,{key:0,"model-value":e.modelValue,class:"--mini",onClick:l[1]||(l[1]=p((()=>{}),["stop"])),onChange:e.toggleVisible},null,8,["model-value","onChange"])):m("",!0)]),e.tooltip?(d(),c(b,{key:0,effect:"blue",placement:"top",offset:2},{content:v((()=>[u(e.$slots,"tooltip",{},(()=>[f(r(e.tooltip),1)]),{})])),default:v((()=>[n("label",{class:"g-field-title-with-description",title:e.label},r(e.label),9,["title"])])),_:1})):(d(),c("label",{key:1,class:"g-field-title",title:e.label},r(e.label),9,["title"]))])),default:v((()=>[u(e.$slots,"default",{},void 0,!0)])),_:3},8,["disabled"])])),_:1},8,["modelValue","class"])}));b.render=y,b.__scopeId="data-v-591924c6",b.install=e=>{e.component(b.name,b)};export default b;
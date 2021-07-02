import{d as e,at as l,r as a,x as o,u as n,w as r,U as s,au as t,av as i,k as u,l as d,m as p,p as m,q as c,al as g,an as v,t as f,v as h}from"./index.5063c078.js";const y=(e,l,a)=>{["admin","editor"].includes(l)?a():a(new Error("请输入正确的用户名"))},_=(e,l,a)=>{l.length<6?a(new Error("密码不能少于6位")):a()};var k=e({name:"Login",components:{BackgroundParticles:l((()=>t((()=>import("./background-particles.74d50a30.js")),["/assets/background-particles.74d50a30.js","/assets/background-particles.2711bf0c.css","/assets/index.5063c078.js","/assets/index.8f8bde52.css"]))),live2d:l((()=>t((()=>import("./live2d.0692ac76.js")),["/assets/live2d.0692ac76.js","/assets/live2d.9db4d5af.css","/assets/index.5063c078.js","/assets/index.8f8bde52.css"])))},setup(){const e=a({username:"admin",password:"123123"}),l=a({username:[{required:!0,trigger:"blur",validator:y}],password:[{required:!0,trigger:"blur",validator:_}]}),t=a(null),u=a(!1),d=a(!1),p=a(""),m=a({}),c=o(),g=n();r(c,(({query:e})=>{e&&(p.value=e.redirect,m.value=(e=>Object.keys(e).reduce(((l,a)=>("redirect"!==a&&(l[a]=e[a]),l)),{}))(e))}),{immediate:!0});return{loginForm:e,loginRules:l,loginFormRef:t,capsTooltip:u,loading:d,redirect:p,otherQuery:m,checkCapslock:({shiftKey:e,key:l})=>{l&&1===l.length&&(u.value=!!(e&&l>="a"&&l<="z"||!e&&l>="A"&&l<="Z")),"CapsLock"===l&&!0===u.value&&(u.value=!1)},handleLogin:()=>{t.value.validate((l=>{if(!l)return!1;d.value=!0,s().doLogin(e.value.username,e.value.password).then((()=>{g.push({path:p.value||"/",query:m.value})})).finally((()=>{d.value=!1}))}))},title:a(i.title)}}});const w={class:"login-container"},V={style:{position:"relative"}},b={class:"tips"};k.render=function(e,l,a,o,n,r){const s=u("background-particles"),t=u("live2d"),i=u("g-lang-select"),y=u("el-input"),_=u("el-form-item"),k=u("el-tooltip"),F=u("el-button"),L=u("el-form");return d(),p("div",w,[m(s),m(L,{ref:"loginFormRef",model:e.loginForm,rules:e.loginRules,"label-position":"left",class:"login-form"},{default:c((()=>[m(t),m(i,{class:"lang-select"}),m(_,{prop:"username"},{default:c((()=>[m(y,{modelValue:e.loginForm.username,"onUpdate:modelValue":l[1]||(l[1]=l=>e.loginForm.username=l),placeholder:"用户名",name:"username",type:"text",autocomplete:"on","prefix-icon":"el-icon-s-custom"},null,8,["modelValue"])])),_:1}),m(k,{modelValue:e.capsTooltip,"onUpdate:modelValue":l[4]||(l[4]=l=>e.capsTooltip=l),content:"大写锁定已打开",placement:"right",manual:""},{default:c((()=>[m(_,{prop:"password"},{default:c((()=>[m(y,{modelValue:e.loginForm.password,"onUpdate:modelValue":l[2]||(l[2]=l=>e.loginForm.password=l),placeholder:"请输入密码",name:"password","prefix-icon":"el-icon-key","show-password":"",onKeyup:[e.checkCapslock,g(e.handleLogin,["enter"])],onBlur:l[3]||(l[3]=l=>e.capsTooltip=!1)},null,8,["modelValue","onKeyup"])])),_:1})])),_:1},8,["modelValue"]),m(F,{loading:e.loading,type:"primary",style:{width:"100%","margin-bottom":"30px"},onClick:v(e.handleLogin,["prevent"])},{default:c((()=>[f(h(e.$t("login.login")),1)])),_:1},8,["loading","onClick"]),m("div",V,[m("div",b,[m("span",null,h(e.$t("login.username"))+": admin",1),m("span",null,h(e.$t("login.password"))+": 123123",1)])])])),_:1},8,["model","rules"])])};export default k;
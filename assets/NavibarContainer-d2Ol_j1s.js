import{v as n,w as p,r as c,s as a,j as t,N as l,L as x,m as u,x as h,y as m}from"./index-I2TEKTUE.js";function d(e){e===void 0&&(e=n);var o=e===n?p:function(){return c.useContext(e)};return function(){var i=o(),r=i.store;return r}}var g=d();function f(e){e===void 0&&(e=n);var o=e===n?g:d(e);return function(){var i=o();return i.dispatch}}var v=f();const b=({onClick:e})=>t.jsx(j,{children:t.jsx(y,{onClick:()=>e(),children:"+ Add Template"})}),j=a.li`
  padding-left: 12px;
`,y=a.button`
  width: 100%;
  background: none;
  border: 1px solid #dedede;
  color: white;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  display: block;
  text-align: center;
`,S=({templateList:e})=>t.jsx("ul",{children:e.map((o,s)=>t.jsx("li",{children:t.jsx(l,{className:({isActive:i})=>i?"active":"",to:`/calc/${o.id}`,children:o.templateName})},s))}),k=({templateList:e,onAddTemplate:o})=>t.jsx(N,{children:t.jsxs(w,{children:[t.jsxs(L,{children:[t.jsx(T,{to:"/",children:"Dutch Pay"}),t.jsx(C,{children:"온라인 더치페이 계산기"})]}),t.jsxs(R,{children:[t.jsx("li",{children:t.jsx(l,{className:({isActive:s})=>s?"active":"",to:"/",children:"온라인 더치페이란?"})}),t.jsxs("li",{children:[t.jsx(l,{className:location.pathname.includes("/calc")?"active":"",to:`/calc/${e.length?e[0].id:"null"}`,children:"Let's Start Dutch Pay!"}),t.jsx(S,{templateList:e})]}),t.jsx(b,{onClick:o})]})]})}),N=a.section`
  position: relative;
  flex: 0 0 220px;
  background: rgba(37, 37, 37, 1);
`,w=a.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 220px;
`,L=a.div`
  display: block;
  padding: 20px;
`,T=a(x)`
  display: block;
  font-weight: bold;
  font-size: 17px;
  line-height: 21px;
  color: white;
  &:hover {
    color: rgb(220, 220, 220);
  }
`,C=a.div`
  display: block;
  font-size: 14px;
  color: #aaa;
  line-height: 19px;
  font-weight: 500;
`,R=a.ul`
  margin-top: 35px;
  padding: 0px 20px;
  line-height: normal;

  & > li {
    margin-bottom: 10px;
  }

  ul {
    padding-left: 13px;
  }
  .active {
    color: white !important;
    font-weight: bold !important;
  }

  li {
    a {
      display: block;
      color: rgb(166, 155, 178);
      font-size: 14px;
      font-weight: 500;
      padding: 10px 0px;
      transition: color 0.2s linear;
    }

    &:hover {
      & > a {
        color: rgb(220, 220, 220);
      }
    }
  }
`,A=()=>{const e=u(i=>i.template),o=v();c.useEffect(()=>{const i=localStorage.getItem("templateList");if(i){const r=JSON.parse(i);o(h(r))}else s()},[]);const s=()=>{o(m())};return t.jsx(k,{templateList:e.templateList,onAddTemplate:s})};export{A as N,v as u};

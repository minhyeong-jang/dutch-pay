(this["webpackJsonpdutch-pay"]=this["webpackJsonpdutch-pay"]||[]).push([[5],{100:function(n,t,e){"use strict";e.d(t,"a",(function(){return l}));var r=e(25),c=e(2),i=(e(0),e(7)),a=e(92);function o(){var n=Object(r.a)(["\n  flex: 1 1 auto;\n  padding: 16px 30px 20px;\n  border-radius: 10px;\n  border: 1px;\n  overflow: hidden;\n"]);return o=function(){return n},n}function u(){var n=Object(r.a)(["\n  min-height: 100vh;\n  display: flex;\n"]);return u=function(){return n},n}var l=function(n){var t=n.children;return Object(c.jsxs)(s,{children:[Object(c.jsx)(a.a,{}),Object(c.jsx)(d,{children:t})]})},s=i.d.div(u()),d=i.d.div(o())},141:function(n,t,e){"use strict";e.d(t,"a",(function(){return l})),e.d(t,"b",(function(){return b}));var r=e(25),c=e(4),i=e(142),a=e(2),o=(e(0),e(7));function u(){var n=Object(r.a)(["\n  display: flex;\n  margin: 8px 0px 20px;\n  font-size: 22px;\n  line-height: 22px;\n  font-weight: bold;\n  align-items: center;\n  color: rgb(74, 62, 86);\n"]);return u=function(){return n},n}var l=function(n){var t=n.children,e=Object(i.a)(n,["children"]);return Object(a.jsx)(s,Object(c.a)(Object(c.a)({},e),{},{children:t}))},s=o.d.div(u());function d(){var n=Object(r.a)(["\n  max-width: 900px;\n  margin: 0 auto;\n"]);return d=function(){return n},n}function j(){var n=Object(r.a)(["\n  background: white;\n  border: 1px solid rgb(209, 202, 216);\n  padding: 50px 20px;\n  border-radius: 5px;\n  margin: 20px 0px;\n\n  ul {\n    margin: 5px 0px 0px 40px;\n\n    li {\n      padding: 3px;\n      list-style: outside;\n      line-height: 1.5;\n    }\n  }\n  a {\n    color: ",";\n    font-weight: bold;\n    text-decoration: underline;\n  }\n  b,\n  strong {\n    font-weight: bold;\n  }\n  h1 {\n    font-size: 2.2857rem;\n    font-weight: bold;\n  }\n  h2 {\n    font-size: 1.6429rem;\n    margin: 60px 0px 20px 0px;\n    padding: 5px 15px;\n    border-left: 3px solid #5fad80;\n    font-weight: bold;\n  }\n  code {\n    font-weight: bold;\n    color: "," !important;\n  }\n  p {\n    font-size: 1.125rem;\n    line-height: 1.8;\n    margin: 20px 0px;\n    color: #131518;\n    letter-spacing: -0.004em;\n    word-break: keep-all;\n    overflow-wrap: break-word;\n  }\n\n  block {\n    display: block;\n    padding: 20px;\n  }\n\n  blockquote {\n    margin: 28px 0;\n    padding: 15px 28px;\n    border-left: 3px solid #f3cf00;\n\n    p {\n      margin: 0px;\n    }\n  }\n"]);return j=function(){return n},n}var b=function(n){var t=n.children;return Object(a.jsx)(p,{children:Object(a.jsx)(f,{children:t})})},p=o.d.div(j(),(function(n){return n.theme.color.linkColor}),(function(n){return n.theme.color.point})),f=o.d.div(d())},425:function(n,t,e){"use strict";e.r(t);var r=e(2),c=e(0),i=e.n(c),a=e(1),o=e(25),u=e(29),l=e(4),s=e(11),d=e(7),j=e(426),b=e(22),p=e(192),f=p.a.Option,x=function(n){var t=n.className,e=n.placeholder,c=n.value,i=n.userList,a=n.onChange;return Object(r.jsx)(p.a,{className:t,placeholder:e,value:c,onChange:a,children:i.map((function(n,t){return Object(r.jsx)(f,{value:n.userName,children:n.userName},t)}))})},O=e(430),h=["pink","red","orange","cyan","green","blue","purple","geekblue","magenta","volcano","gold","success","processing","error","default","warning"],m=function(n){var t=n.mode,e=void 0===t?"tags":t,c=n.value,i=n.userList,a=n.placeholder,o=n.changeSelect;return Object(r.jsx)(p.a,{mode:e,options:i.map((function(n){return{label:n.userName,value:n.userName}})),placeholder:a,style:{width:"100%"},tagRender:function(n){return function(n){var t=n.tagColor,e=n.value,c=n.closable,i=n.onClose;return t?Object(r.jsx)(O.a,{closable:c,color:t,onClose:i,children:e}):Object(r.jsx)(r.Fragment,{})}(Object(l.a)(Object(l.a)({},n),{},{tagColor:Object(b.c)(i,null===n||void 0===n?void 0:n.value)}))},value:c,onChange:o})};function v(){var n=Object(o.a)(["\n  display: inline-block;\n  min-width: 100px;\n  text-align: right;\n"]);return v=function(){return n},n}function g(){var n=Object(o.a)(["\n  font-size: 15px;\n  padding: 6px 20px;\n  text-align: center;\n  margin-right: 20px;\n  min-width: 110px;\n"]);return g=function(){return n},n}function L(){var n=Object(o.a)(["\n  display: flex;\n  align-items: center;\n  margin: 10px 0px;\n"]);return L=function(){return n},n}var y=function(n){var t=n.sendList,e=n.color,i=n.isHide,a=n.payer;if(i)return null;var o=Object(c.useMemo)((function(){return Object.keys(t).reduce((function(n,e){return n+Math.floor(t[e]||0)}),0)}),[t]);return 0===o?null:Object(r.jsxs)(w,{children:[Object(r.jsx)(k,{color:e,children:a}),Object(r.jsxs)(N,{children:[o.toLocaleString(),"\uc6d0"]})]})},w=d.d.li(L()),k=Object(d.d)(O.a)(g()),N=d.d.div(v());function S(){var n=Object(o.a)(["\n  width: 80px;\n  margin-left: 5px;\n  display: inline-block;\n  text-align: right;\n"]);return S=function(){return n},n}function C(){var n=Object(o.a)(["\n  margin-bottom: 5px;\n  font-size: 15px;\n"]);return C=function(){return n},n}function P(){var n=Object(o.a)(["\n  margin: 20px 0px;\n"]);return P=function(){return n},n}function z(){var n=Object(o.a)(["\n  width: 200px;\n"]);return z=function(){return n},n}function T(){var n=Object(o.a)(["\n  font-size: 20px;\n  color: ",";\n  font-weight: bold;\n  margin: 50px 0 15px;\n"]);return T=function(){return n},n}function I(){var n=Object(o.a)(["\n  font-size: 14px;\n  color: #646464;\n  margin: 10px 0px;\n\n  b {\n    font-weight: bold;\n  }\n"]);return I=function(){return n},n}function E(){var n=Object(o.a)([""]);return E=function(){return n},n}var M=function(n){var t=n.userList,e=n.calculateList,i=n.calculateGetPriceList,a=Object(c.useState)(""),o=Object(s.a)(a,2),u=o[0],l=o[1];return Object(c.useEffect)((function(){t.length?t.find((function(n){return n.userName===u}))||l(t[0].userName):l("")}),[t]),Object.keys(i).length?Object(r.jsxs)(A,{children:[Object(r.jsxs)(G,{children:[Object(r.jsx)("b",{children:"\uc77c\uad04 \uc1a1\uae08\uc774\ub780?"}),Object(r.jsx)("br",{}),"\ub300\ud45c \ud55c \uba85\uc774 \ubaa8\ub4e0 \uc1a1\uae08 \uae08\uc561\uc744 \ubc1b\uc544 \uacb0\uc81c\uc790\ub4e4\uc5d0\uac8c \ubd84\ud560\ud558\ub294 \ubc29\uc2dd\uc785\ub2c8\ub2e4.",Object(r.jsx)("br",{}),"\ud6a8\uc728\uc801\uc73c\ub85c \uc815\uc0b0\ud558\uc5ec \uac01\uc790 \uc1a1\uae08\ud558\ub294 \ubc29\uc2dd\ubcf4\ub2e4 \uc1a1\uae08 \ud69f\uc218\uac00 \uc904\uc5b4\ub4ed\ub2c8\ub2e4."]}),Object(r.jsx)(D,{children:"1. \ub300\ud45c\uc790 \uc120\ud0dd"}),Object(r.jsx)(F,{placeholder:"\ub300\ud45c\uc790",userList:t,value:u,onChange:function(n){return l(n)}}),Object(r.jsx)(D,{children:"2. \ub300\ud45c\uc790\uc5d0\uac8c \uc1a1\uae08\ud558\uae30"}),Object(r.jsxs)(G,{children:["\ucc38\uac00\uc790\ub4e4\uc740 \uc544\ub798 \uae08\uc561\ub9cc\ud07c ",Object(r.jsx)("b",{children:u}),"\ub2d8\uc5d0\uac8c \uc1a1\uae08\ud574\uc8fc\uc138\uc694.",Object(r.jsx)("br",{}),"\uc804\uccb4 \uc1a1\uae08 \uae08\uc561 : ",i.totalPrice.toLocaleString(),"\uc6d0"]}),Object(r.jsx)(J,{children:Object.keys(e).map((function(n,c){return Object(r.jsx)(y,{color:Object(b.c)(t,n),isHide:n===u,payer:n,sendList:e[n].sendList},c)}))}),Object(r.jsx)(D,{children:"3. \uacb0\uc81c\uc790\uc5d0\uac8c \uc1a1\uae08\ud558\uae30"}),Object(r.jsx)(J,{children:Object.keys(i).map((function(n,t){return"totalPrice"!==n&&0!==i[n]?Object(r.jsxs)(H,{children:[n,"\ub2d8\uc774",Object(r.jsx)(K,{children:i[n].toLocaleString()}),"\xa0\uc6d0\uc744 \uc694\uccad\ud574\uc694!"]},t):null}))})]}):null},A=d.d.div(E()),G=d.d.div(I()),D=d.d.div(T(),(function(n){return n.theme.color.githubColor})),F=Object(d.d)(x)(z()),J=d.d.ul(P()),H=d.d.li(C()),K=d.d.span(S());function q(){var n=Object(o.a)(["\n  margin-bottom: 5px;\n  font-size: 15px;\n  list-style-type: disc;\n"]);return q=function(){return n},n}function R(){var n=Object(o.a)(["\n  padding-left: 20px;\n"]);return R=function(){return n},n}function B(){var n=Object(o.a)([""]);return B=function(){return n},n}var Q=function(n){var t=n.calculateList;return Object(r.jsx)(U,{children:Object.keys(t).map((function(n,e){var c=t[n].sendList;return Object(r.jsx)(V,{children:Object.keys(c).map((function(t,e){return c[t]?Object(r.jsxs)(W,{children:[n," -> ",t," :\xa0",Math.floor(c[t]).toLocaleString(),"\uc6d0"]},e):null}))},e)}))})},U=d.d.div(B()),V=d.d.ul(R()),W=d.d.li(q());function X(){var n=Object(o.a)(["\n  .ant-tabs-nav-wrap {\n    justify-content: center;\n\n    .ant-tabs-ink-bar {\n      background: "," !important;\n    }\n  }\n  .ant-tabs-tab {\n    font-size: 17px;\n\n    &.ant-tabs-tab-active .ant-tabs-tab-btn {\n      color: "," !important;\n      font-weight: bold;\n    }\n  }\n"]);return X=function(){return n},n}function Y(){var n=Object(o.a)(["\n  margin: 20px 0px;\n"]);return Y=function(){return n},n}var Z=j.a.TabPane,$=function(n){var t=n.userList,e=n.calculateList,c=n.calculateGetPriceList;return Object(r.jsx)(_,{children:Object(r.jsxs)(nn,{defaultActiveKey:"1",children:[Object(r.jsx)(Z,{tab:"\uc77c\uad04 \uc1a1\uae08",children:Object(r.jsx)(M,{calculateGetPriceList:c,calculateList:e,userList:t})},"1"),Object(r.jsx)(Z,{tab:"\uac01\uc790 \uc1a1\uae08",children:Object(r.jsx)(Q,{calculateList:e})},"2")]})})},_=d.d.div(Y()),nn=Object(d.d)(j.a)(X(),(function(n){return n.theme.color.point}),(function(n){return n.theme.color.point}));function tn(){var n=Object(o.a)(["\n  font-size: 14px;\n  color: ",";\n  text-align: center;\n\n  &:not(:last-child) {\n    border-right: 2px solid #999;\n  }\n"]);return tn=function(){return n},n}function en(){var n=Object(o.a)(["\n  font-size: 14px;\n  font-weight: bold;\n  text-align: center;\n  color: ",";\n"]);return en=function(){return n},n}function rn(){var n=Object(o.a)(["\n  font-size: 15px;\n  padding: 6px 20px;\n  text-align: center;\n"]);return rn=function(){return n},n}function cn(){var n=Object(o.a)(["\n  display: grid;\n  align-items: center;\n  grid-template-columns: repeat(4, 1fr);\n"]);return cn=function(){return n},n}function an(){var n=Object(o.a)(["\n  display: grid;\n  gap: 10px 0;\n  align-items: center;\n  grid-template-columns: 1fr 4fr;\n"]);return an=function(){return n},n}function on(){var n=Object(o.a)(["\n  margin: 30px 0px;\n"]);return on=function(){return n},n}var un=function(n){var t=n.userList,e=n.calculateList,c=n.calculateGetPriceList;return Object(r.jsx)(ln,{children:Object(r.jsxs)(sn,{children:[Object(r.jsx)("div",{}),Object(r.jsxs)(dn,{children:[Object(r.jsx)(bn,{children:"\ucd1d \uacbd\ube44"}),Object(r.jsx)(bn,{children:"\uacb0\uc81c\ud55c \uae08\uc561"}),Object(r.jsx)(bn,{children:"\uc1a1\uae08\ud560 \uae08\uc561"}),Object(r.jsx)(bn,{children:"\ubc1b\uc744 \uae08\uc561"})]}),Object.keys(e).map((function(n,a){return Object(r.jsxs)(i.a.Fragment,{children:[Object(r.jsx)(jn,{color:Object(b.c)(t,n),children:n}),Object(r.jsxs)(dn,{children:[Object(r.jsxs)(pn,{children:[(e[n].paymentTotal+Object(b.d)(e[n].sendList)-(c[n]||0)).toLocaleString(),"\uc6d0"]}),Object(r.jsxs)(pn,{children:[e[n].paymentTotal.toLocaleString(),"\uc6d0"]}),Object(r.jsxs)(pn,{children:[Object(b.d)(e[n].sendList).toLocaleString(),"\uc6d0"]}),Object(r.jsxs)(pn,{children:[(c[n]||0).toLocaleString(),"\uc6d0"]})]})]},a)}))]})})},ln=d.d.div(on()),sn=d.d.div(an()),dn=d.d.div(cn()),jn=Object(d.d)(O.a)(rn()),bn=d.d.span(en(),(function(n){return n.theme.color.githubColor})),pn=d.d.span(tn(),(function(n){return n.theme.color.githubColor}));function fn(){var n=Object(o.a)(["\n  color: ",";\n  font-weight: bold;\n  font-size: 20px;\n  margin: 0 3px 0px 8px;\n"]);return fn=function(){return n},n}function xn(){var n=Object(o.a)([""]);return xn=function(){return n},n}var On=function(n){var t=n.paymentTotal;return Object(r.jsxs)(hn,{children:["\uc774\ubc88 \ubaa8\uc784\uc740",Object(r.jsx)(mn,{children:t.toLocaleString()}),"\uc6d0\uc744 \uc0ac\uc6a9\ud588\uc5b4\uc694!"]})},hn=d.d.div(xn()),mn=d.d.span(fn(),(function(n){return n.theme.color.point})),vn=Object(c.memo)(On);function gn(){var n=Object(o.a)(["\n  display: inline-block;\n  margin-left: 15px;\n  font-size: 14px;\n"]);return gn=function(){return n},n}function Ln(){var n=Object(o.a)(["\n  display: inline-block;\n  font-size: 22px;\n  font-weight: bold;\n"]);return Ln=function(){return n},n}function yn(){var n=Object(o.a)(["\n  margin-bottom: 10px;\n  padding-bottom: 10px;\n"]);return yn=function(){return n},n}var wn=function(n){var t=n.title,e=n.description;return Object(r.jsxs)(kn,{children:[Object(r.jsx)(Nn,{children:t}),e&&Object(r.jsx)(Sn,{children:e})]})},kn=d.d.div(yn()),Nn=d.d.h3(Ln()),Sn=d.d.span(gn());function Cn(){var n=Object(o.a)(["\n  font-size: 14px;\n  margin: 20px 0px 10px;\n  color: ",";\n"]);return Cn=function(){return n},n}function Pn(){var n=Object(o.a)(["\n  ",";\n"]);return Pn=function(){return n},n}var zn=function(n){var t=n.userList,e=n.paymentList,i=Object(c.useState)({}),a=Object(s.a)(i,2),o=a[0],d=a[1],j=Object(c.useState)({}),b=Object(s.a)(j,2),p=b[0],f=b[1],x=Object(c.useMemo)((function(){return e.reduce((function(n,t){return n+t.paymentPrice}),0)}),[e]);return Object(c.useEffect)((function(){var n={},r=t.reduce((function(n,t){return Object(l.a)(Object(l.a)({},n),{},Object(u.a)({},t.userName,0))}),{});t.map((function(t){n[t.userName]={paymentTotal:0,sendList:Object(l.a)({},r)}})),e.map((function(t){var e=t.paymentPrice,r=t.participants,c=t.payerName;if(e&&c&&r.length){var i=e/r.length,a=n[c];a.paymentTotal+=e,r.map((function(t){if(t!==c){var e=n[t],r=a.sendList[t]-i;r>=0?a.sendList[t]=r:(a.sendList[t]=0,e.sendList[c]+=-r)}}))}})),d(n)}),[t,e]),Object(c.useEffect)((function(){var n={totalPrice:0};t.map((function(t){Object.keys(o).map((function(e){var r=Math.floor(o[e].sendList[t.userName]);n.totalPrice+=r,n[t.userName]=n[t.userName]?n[t.userName]+r:r}))})),f(n)}),[o]),x?Object(r.jsxs)(Tn,{children:[Object(r.jsx)(wn,{description:"\uc815\uc0b0\uacb0\uacfc \ud655\uc778",title:"Step3"}),Object(r.jsx)(vn,{paymentTotal:x}),Object(r.jsx)(un,{calculateGetPriceList:p,calculateList:o,userList:t}),Object(r.jsx)($,{calculateGetPriceList:p,calculateList:o,userList:t})]}):Object(r.jsxs)(Tn,{children:[Object(r.jsx)(wn,{description:"\uc815\uc0b0\uacb0\uacfc \ud655\uc778",title:"Step3"}),Object(r.jsx)(In,{children:"\uacb0\uc81c\ub0b4\uc5ed\uc744 \uba3c\uc800 \uc785\ub825\ud574\uc8fc\uc138\uc694 \ud83d\udcdd"})]})},Tn=d.d.section(Pn(),(function(n){return n.theme.layout.section})),In=d.d.div(Cn(),(function(n){return n.theme.color.point})),En=e(19),Mn=e(26),An=e(30),Gn=e(16),Dn=e(20),Fn=e(431),Jn=e(424);function Hn(){var n=Object(o.a)(["\n  width: 100%;\n"]);return Hn=function(){return n},n}function Kn(){var n=Object(o.a)(["\n  background: white;\n  border: 1px solid ",";\n  padding: 5px 10px;\n  border-radius: 5px;\n  width: 100%;\n"]);return Kn=function(){return n},n}function qn(){var n=Object(o.a)(["\n  width: 100%;\n  padding: 15px;\n  text-align: center;\n  user-select: none;\n  cursor: pointer;\n  &:active,\n  &:hover {\n    opacity: 0.8;\n  }\n"]);return qn=function(){return n},n}function Rn(){var n=Object(o.a)(["\n  table {\n    table-layout: fixed;\n  }\n  .ant-table {\n    border: 1px solid #dedede;\n    border-radius: 4px;\n    overflow: hidden;\n  }\n  .ant-table-footer {\n    padding: 0;\n  }\n"]);return Rn=function(){return n},n}var Bn=function(n){var t=n.paymentList,e=n.userList,c=n.addPayment,i=n.updateTitle,a=n.updatePaymentPrice,o=n.updatePayerName,u=n.updateParticipants,l=[{align:"center",dataIndex:"title",key:"title",render:function(n,t,e){return Object(r.jsx)(Vn,{maxLength:15,placeholder:"\uc0ac\uc6a9\ucc98",value:n,onChange:function(n){return i(n.target.value,e)}})},sorter:!0,title:"\uc0ac\uc6a9\ucc98",width:150},{align:"center",dataIndex:"paymentPrice",render:function(n,t,e){return Object(r.jsx)(Vn,{value:(null===n||void 0===n?void 0:n.toLocaleString())||0,onChange:function(n){return a(n.target.value,e)}})},sorter:!0,title:"\uc9c0\ucd9c \uae08\uc561",width:150},{align:"center",dataIndex:"payerName",key:"payerName",render:function(n,t,c){return Object(r.jsx)(Wn,{placeholder:"\uacb0\uc81c\uc790",userList:e,value:n,onChange:function(n){return o(n,c)}})},sorter:!0,title:"\uacb0\uc81c\uc790",width:150},{align:"center",dataIndex:"participants",key:"participants",render:function(n,t,c){return Object(r.jsx)(m,{changeSelect:function(n){return u(n,c)},mode:"multiple",placeholder:"\ucc38\uc5ec\uc790",userList:e,value:n})},title:"\ucc38\uc5ec\uc790"}];return Object(r.jsx)(Qn,{children:Object(r.jsx)(Jn.a,{columns:l,dataSource:t,footer:function(){return Object(r.jsxs)(Un,{onClick:c,children:[Object(r.jsx)(Fn.a,{})," \ud56d\ubaa9 \ucd94\uac00"]})},pagination:!1,rowKey:function(n){return n.id}})})},Qn=d.d.div(Rn()),Un=d.d.button(qn()),Vn=d.d.input(Kn(),(function(n){return n.theme.color.borderColor})),Wn=Object(d.d)(x)(Hn());function Xn(){var n=Object(o.a)(["\n  ",";\n"]);return Xn=function(){return n},n}var Yn=function(n){var t=n.userList,e=n.paymentList,c=Object(En.b)();return Object(r.jsxs)(Zn,{children:[Object(r.jsx)(wn,{description:"\uacb0\uc81c\ub0b4\uc5ed \uc785\ub825",title:"Step2"}),Object(r.jsx)(Bn,{addPayment:function(){c(Object(Mn.g)({paymentList:[].concat(Object(Gn.a)(e),[Object(Dn.a)()])}))},paymentList:e,updateParticipants:function(n,t){var r=Object(Gn.a)(e);r[t].participants=n,c(Object(Mn.g)({paymentList:r}))},updatePayerName:function(n,t){var r=Object(Gn.a)(e);r[t].payerName=n,c(Object(Mn.g)({paymentList:r}))},updatePaymentPrice:function(n,t){var r=Object(Gn.a)(e);r[t].paymentPrice=Object(b.a)(n),c(Object(Mn.g)({paymentList:r}))},updateTitle:function(n,t){var r=Object(Gn.a)(e);r[t].title=n,c(Object(Mn.g)({paymentList:r}))},userList:t})]})},Zn=d.d.section(Xn(),(function(n){return n.theme.layout.section})),$n=e(427),_n=e(432),nt=e(433),tt=e(434),et=e(435),rt=e(141);function ct(){var n=Object(o.a)(["\n  margin: 11px 0 0 10px;\n\n  svg {\n    font-size: 18px;\n    margin-right: 7px;\n  }\n"]);return ct=function(){return n},n}function it(){var n=Object(o.a)(["\n  width: 150px;\n  font-size: 16px;\n  border: 1px solid #dedede;\n  border-radius: 4px;\n  padding: 8px 10px;\n  margin-bottom: 14px;\n  font-weight: bold;\n"]);return it=function(){return n},n}function at(){var n=Object(o.a)(["\n  display: flex;\n  flex-direction: row;\n"]);return at=function(){return n},n}var ot=function(n){var t=n.templateName,e=n.editTemplateName,c=n.isEdit,i=n.setEditTemplateName,a=n.setIsEdit,o=n.onSave,u=n.onCancel,l=n.onDelete;return Object(r.jsxs)(ut,{children:[c?Object(r.jsx)(lt,{maxLength:20,placeholder:"\ud15c\ud50c\ub9bf \uc774\ub984 \ucd5c\ub300 20\uc790",value:e,onChange:function(n){var t=n.target.value;t.length>15?$n.b.error("\ud15c\ud50c\ub9bf \uc774\ub984\uc740 \ucd5c\ub300 15\uc790 \uc785\ub2c8\ub2e4."):i(t)}}):Object(r.jsx)(rt.a,{children:t}),Object(r.jsx)(st,{children:c?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(_n.a,{onClick:function(){return o()}}),Object(r.jsx)(nt.a,{onClick:function(){return u()}}),Object(r.jsx)(tt.a,{onClick:function(){return l()}})]}):Object(r.jsx)(et.a,{onClick:function(){return a(!0)}})})]})},ut=d.d.div(at()),lt=d.d.input(it()),st=d.d.div(ct()),dt=function(n){var t=n.templateName,e=Object(a.d)(),i=Object(En.c)((function(n){return n.template})),o=Object(En.b)(),u=Object(c.useState)(t),l=Object(s.a)(u,2),d=l[0],j=l[1],b=Object(c.useState)(!1),p=Object(s.a)(b,2),f=p[0],x=p[1];Object(c.useEffect)((function(){O()}),[t,i.selectedId]);var O=function(){j(t),x(!1)};return Object(r.jsx)(ot,{editTemplateName:d,isEdit:f,setEditTemplateName:j,setIsEdit:x,templateName:t,onCancel:O,onDelete:function(){if(i.templateList.length<2)$n.b.error("\ud15c\ud50c\ub9bf\uc740 \ucd5c\uc18c \ud558\ub098\uac00 \uc788\uc5b4\uc57c\ud574\uc694. :(");else{var n=Object(Gn.a)(i.templateList).filter((function(n){return n.id!==i.selectedId}));o(Object(Mn.f)({templateList:n})),e("/calc/".concat(n[n.length-1].id))}},onSave:function(){var n=Object(Gn.a)(i.templateList),t=n.findIndex((function(n){return n.id===i.selectedId}));-1!==t&&(n[t].templateName=d,o(Object(Mn.f)({templateList:n})),x(!1))}})};function jt(){var n=Object(o.a)(["\n  ",";\n\n  .ant-select {\n    width: 100%;\n    font-size: 15px;\n\n    .ant-select-selection-placeholder {\n      left: 22px;\n    }\n    .ant-select-selector {\n      padding: 10px 15px;\n      min-height: 54px;\n    }\n    .ant-tag {\n      margin-right: 6px;\n      font-size: 15px;\n      padding: 5px 10px;\n    }\n    .ant-tag-close-icon {\n      font-size: 12px;\n      vertical-align: middle;\n      margin: -3px 0 0 9px;\n    }\n  }\n"]);return jt=function(){return n},n}var bt=function(n){var t=n.userList,e=Object(En.b)();return Object(r.jsxs)(pt,{children:[Object(r.jsx)(wn,{description:"\ucc38\uac00\uc790 \uc785\ub825",title:"Step1"}),Object(r.jsx)(m,{changeSelect:function(n){if(n.length>t.length)i={tagColor:h[Math.floor(Math.random()*h.length)],userName:n[n.length-1]},e(Object(Mn.h)({userList:[].concat(Object(Gn.a)(t),[i])}));else{var r=t.filter((function(t){return!n.includes(t.userName)}));c=r[0].userName,e(Object(Mn.c)({userName:c}))}var c,i},placeholder:"\ucc38\uac00\uc790 \uc785\ub825 & \uc120\ud0dd",userList:t,value:t.map((function(n){return n.userName}))})]})},pt=d.d.section(jt(),(function(n){return n.theme.layout.section}));function ft(){var n=Object(o.a)([""]);return ft=function(){return n},n}var xt=function(n){var t=n.templateId,e=Object(En.c)((function(n){return n.template})),i=Object(En.b)(),a=Object(c.useMemo)((function(){var n=e.templateList.filter((function(n){return n.id===t}));if(n.length)return n[0]}),[e,t]);return Object(c.useEffect)((function(){i(Object(Mn.e)({templateId:t}))}),[t]),a?Object(r.jsxs)(Ot,{children:[Object(r.jsx)(dt,{templateName:a.templateName}),Object(r.jsx)(An.a,{slotNumber:8775838139}),Object(r.jsx)(bt,{userList:a.userList}),Object(r.jsx)(Yn,{paymentList:a.paymentList,userList:a.userList}),Object(r.jsx)(zn,{paymentList:a.paymentList,userList:a.userList}),Object(r.jsx)(An.a,{slotNumber:3718968486})]}):null},Ot=d.d.div(ft()),ht=e(100);t.default=function(){var n=Object(a.e)().id,t=void 0===n?"":n;return Object(r.jsx)(ht.a,{children:Object(r.jsx)(xt,{templateId:t})})}},92:function(n,t,e){"use strict";e.d(t,"a",(function(){return P}));var r=e(2),c=e(0),i=e(19),a=e(26),o=e(25),u=e(21),l=e(7);function s(){var n=Object(o.a)(["\n  width: 100%;\n  background: none;\n  border: 1px solid #dedede;\n  color: white;\n  border-radius: 4px;\n  padding: 10px;\n  cursor: pointer;\n  display: block;\n  text-align: center;\n"]);return s=function(){return n},n}function d(){var n=Object(o.a)(["\n  padding-left: 12px;\n"]);return d=function(){return n},n}var j=function(n){var t=n.onClick;return Object(r.jsx)(b,{children:Object(r.jsx)(p,{onClick:function(n){function t(){return n.apply(this,arguments)}return t.toString=function(){return n.toString()},t}((function(){return t()})),children:"+ Add Template"})})},b=l.d.li(d()),p=l.d.button(s()),f=function(n){var t=n.templateList;return Object(r.jsx)("ul",{children:t.map((function(n,t){return Object(r.jsx)("li",{children:Object(r.jsx)(u.c,{className:function(n){return n.isActive?"active":""},to:"/calc/".concat(n.id),children:n.templateName})},t)}))})};function x(){var n=Object(o.a)(["\n  margin-top: 35px;\n  padding: 0px 20px;\n  line-height: normal;\n\n  & > li {\n    margin-bottom: 10px;\n  }\n\n  ul {\n    padding-left: 13px;\n  }\n  .active {\n    color: white !important;\n    font-weight: bold !important;\n  }\n\n  li {\n    a {\n      display: block;\n      color: rgb(166, 155, 178);\n      font-size: 14px;\n      font-weight: 500;\n      padding: 10px 0px;\n      transition: color 0.2s linear;\n    }\n\n    &:hover {\n      & > a {\n        color: rgb(220, 220, 220);\n      }\n    }\n  }\n"]);return x=function(){return n},n}function O(){var n=Object(o.a)(["\n  display: block;\n  font-size: 14px;\n  color: #aaa;\n  line-height: 19px;\n  font-weight: 500;\n"]);return O=function(){return n},n}function h(){var n=Object(o.a)(["\n  display: block;\n  font-weight: bold;\n  font-size: 17px;\n  line-height: 21px;\n  color: white;\n  &:hover {\n    color: rgb(220, 220, 220);\n  }\n"]);return h=function(){return n},n}function m(){var n=Object(o.a)(["\n  display: block;\n  padding: 20px;\n"]);return m=function(){return n},n}function v(){var n=Object(o.a)(["\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 220px;\n"]);return v=function(){return n},n}function g(){var n=Object(o.a)(["\n  position: relative;\n  flex: 0 0 220px;\n  background: rgba(37, 37, 37, 1);\n"]);return g=function(){return n},n}var L=function(n){var t=n.templateList,e=n.onAddTemplate;return Object(r.jsx)(y,{children:Object(r.jsxs)(w,{children:[Object(r.jsxs)(k,{children:[Object(r.jsx)(N,{to:"/",children:"Dutch Pay"}),Object(r.jsx)(S,{children:"\uc628\ub77c\uc778 \ub354\uce58\ud398\uc774 \uacc4\uc0b0\uae30"})]}),Object(r.jsxs)(C,{children:[Object(r.jsx)("li",{children:Object(r.jsx)(u.c,{className:function(n){return n.isActive?"active":""},to:"/",children:"\uc628\ub77c\uc778 \ub354\uce58\ud398\uc774\ub780?"})}),Object(r.jsxs)("li",{children:[Object(r.jsx)(u.c,{className:location.pathname.includes("/calc")?"active":"",to:"/calc/".concat(t.length?t[0].id:"null"),children:"Let's Start Dutch Pay!"}),Object(r.jsx)(f,{templateList:t})]}),Object(r.jsx)(j,{onClick:e})]})]})})},y=l.d.section(g()),w=l.d.div(v()),k=l.d.div(m()),N=Object(l.d)(u.b)(h()),S=l.d.div(O()),C=l.d.ul(x()),P=function(){var n=Object(i.c)((function(n){return n.template})),t=Object(i.b)();Object(c.useEffect)((function(){var n=localStorage.getItem("templateList");if(n){var r=JSON.parse(n);t(Object(a.d)(r))}else e()}),[]);var e=function(){t(Object(a.a)())};return Object(r.jsx)(L,{templateList:n.templateList,onAddTemplate:e})}}}]);
//# sourceMappingURL=5.4f667347.chunk.js.map
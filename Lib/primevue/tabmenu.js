this.primevue=this.primevue||{},this.primevue.tabmenu=function(e,t,n){"use strict";function a(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var l={name:"TabMenu",emits:["update:activeIndex","tab-change"],props:{model:{type:Array,default:null},exact:{type:Boolean,default:!0},activeIndex:{type:Number,default:0},"aria-labelledby":{type:String,default:null},"aria-label":{type:String,default:null}},timeout:null,data(){return{d_activeIndex:this.activeIndex}},watch:{$route(){this.timeout=setTimeout((()=>this.updateInkBar()),50)},activeIndex(e){this.d_activeIndex=e}},mounted(){this.updateInkBar()},updated(){this.updateInkBar()},beforeUnmount(){clearTimeout(this.timeout)},methods:{onItemClick(e,t,n,a){this.disabled(t)?e.preventDefault():(t.command&&t.command({originalEvent:e,item:t}),t.to&&a&&a(e),n!==this.d_activeIndex&&(this.d_activeIndex=n,this.$emit("update:activeIndex",this.d_activeIndex)),this.$emit("tab-change",{originalEvent:e,index:n}))},onKeydownItem(e,t,n){let a=n,l={};const i=this.$refs.tabLink;switch(e.code){case"ArrowRight":l=this.findNextItem(this.$refs.tab,a),a=l.i;break;case"ArrowLeft":l=this.findPrevItem(this.$refs.tab,a),a=l.i;break;case"End":l=this.findPrevItem(this.$refs.tab,this.model.length),a=l.i,e.preventDefault();break;case"Home":l=this.findNextItem(this.$refs.tab,-1),a=l.i,e.preventDefault();break;case"Space":case"Enter":e.currentTarget&&e.currentTarget.click(),e.preventDefault();break;case"Tab":this.setDefaultTabIndexes(i)}i[a]&&i[n]&&(i[n].tabIndex="-1",i[a].tabIndex="0",i[a].focus())},findNextItem(e,n){let a=n+1;if(a>=e.length)return{nextItem:e[e.length],i:e.length};let l=e[a];return l?t.DomHandler.hasClass(l,"p-disabled")?this.findNextItem(e,a):{nextItem:l,i:a}:null},findPrevItem(e,n){let a=n-1;if(a<0)return{nextItem:e[0],i:0};let l=e[a];return l?t.DomHandler.hasClass(l,"p-disabled")?this.findPrevItem(e,a):{prevItem:l,i:a}:null},getItemClass(e,t){return["p-tabmenuitem",e.class,{"p-highlight":this.d_activeIndex===t,"p-disabled":this.disabled(e)}]},getRouteItemClass(e,t,n){return["p-tabmenuitem",e.class,{"p-highlight":this.exact?n:t,"p-disabled":this.disabled(e)}]},getItemIcon:e=>["p-menuitem-icon",e.icon],visible:e=>"function"==typeof e.visible?e.visible():!1!==e.visible,disabled:e=>"function"==typeof e.disabled?e.disabled():e.disabled,label:e=>"function"==typeof e.label?e.label():e.label,setDefaultTabIndexes(e){setTimeout((()=>{e.forEach((e=>{e.tabIndex=t.DomHandler.hasClass(e.parentElement,"p-highlight")?"0":"-1"}))}),300)},setTabIndex(e){return this.d_activeIndex===e?"0":"-1"},updateInkBar(){let e=this.$refs.nav.children,n=!1;for(let a=0;a<e.length;a++){let l=e[a];t.DomHandler.hasClass(l,"p-highlight")&&(this.$refs.inkbar.style.width=t.DomHandler.getWidth(l)+"px",this.$refs.inkbar.style.left=t.DomHandler.getOffset(l).left-t.DomHandler.getOffset(this.$refs.nav).left+"px",n=!0)}n||(this.$refs.inkbar.style.width="0px",this.$refs.inkbar.style.left="0px")}},directives:{ripple:a(e).default}};const i={class:"p-tabmenu p-component"},s=["aria-labelledby","aria-label"],r=["href","aria-label","aria-disabled","tabindex","onClick","onKeydown"],o={class:"p-menuitem-text"},d=["onClick","onKeydown"],c=["href","target","aria-label","aria-disabled","tabindex"],m={class:"p-menuitem-text"},p={ref:"inkbar",class:"p-tabmenu-ink-bar"};return function(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var a=document.head||document.getElementsByTagName("head")[0],l=document.createElement("style");l.type="text/css","top"===n&&a.firstChild?a.insertBefore(l,a.firstChild):a.appendChild(l),l.styleSheet?l.styleSheet.cssText=e:l.appendChild(document.createTextNode(e))}}("\n.p-tabmenu {\n    overflow-x: auto;\n}\n.p-tabmenu-nav {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n}\n.p-tabmenu-nav a {\n    cursor: pointer;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    position: relative;\n    text-decoration: none;\n    text-decoration: none;\n    overflow: hidden;\n}\n.p-tabmenu-nav a:focus {\n    z-index: 1;\n}\n.p-tabmenu-nav .p-menuitem-text {\n    line-height: 1;\n}\n.p-tabmenu-ink-bar {\n    display: none;\n    z-index: 1;\n}\n.p-tabmenu::-webkit-scrollbar {\n    display: none;\n}\n"),l.render=function(e,t,a,l,u,b){const f=n.resolveComponent("router-link"),h=n.resolveDirective("ripple");return n.openBlock(),n.createElementBlock("div",i,[n.createElementVNode("ul",{ref:"nav",class:"p-tabmenu-nav p-reset",role:"menubar","aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel},[(n.openBlock(!0),n.createElementBlock(n.Fragment,null,n.renderList(a.model,((t,a)=>(n.openBlock(),n.createElementBlock(n.Fragment,{key:b.label(t)+"_"+a.toString()},[t.to&&!b.disabled(t)?(n.openBlock(),n.createBlock(f,{key:0,to:t.to,custom:""},{default:n.withCtx((({navigate:l,href:i,isActive:s,isExactActive:d})=>[b.visible(t)?(n.openBlock(),n.createElementBlock("li",{key:0,ref_for:!0,ref:"tab",class:n.normalizeClass(b.getRouteItemClass(t,s,d)),style:n.normalizeStyle(t.style),role:"presentation"},[e.$slots.item?(n.openBlock(),n.createBlock(n.resolveDynamicComponent(e.$slots.item),{key:1,item:t},null,8,["item"])):n.withDirectives((n.openBlock(),n.createElementBlock("a",{key:0,ref_for:!0,ref:"tabLink",role:"menuitem",href:i,class:"p-menuitem-link","aria-label":b.label(t),"aria-disabled":b.disabled(t),tabindex:d?"0":"-1",onClick:e=>b.onItemClick(e,t,a,l),onKeydown:e=>b.onKeydownItem(e,t,a,l)},[t.icon?(n.openBlock(),n.createElementBlock("span",{key:0,class:n.normalizeClass(b.getItemIcon(t))},null,2)):n.createCommentVNode("",!0),n.createElementVNode("span",o,n.toDisplayString(b.label(t)),1)],40,r)),[[h]])],6)):n.createCommentVNode("",!0)])),_:2},1032,["to"])):b.visible(t)?(n.openBlock(),n.createElementBlock("li",{key:1,ref_for:!0,ref:"tab",class:n.normalizeClass(b.getItemClass(t,a)),role:"presentation",onClick:e=>b.onItemClick(e,t,a),onKeydown:e=>b.onKeydownItem(e,t,a)},[e.$slots.item?(n.openBlock(),n.createBlock(n.resolveDynamicComponent(e.$slots.item),{key:1,item:t},null,8,["item"])):n.withDirectives((n.openBlock(),n.createElementBlock("a",{key:0,ref_for:!0,ref:"tabLink",role:"menuitem",href:t.url,class:"p-menuitem-link",target:t.target,"aria-label":b.label(t),"aria-disabled":b.disabled(t),tabindex:b.setTabIndex(a)},[t.icon?(n.openBlock(),n.createElementBlock("span",{key:0,class:n.normalizeClass(b.getItemIcon(t))},null,2)):n.createCommentVNode("",!0),n.createElementVNode("span",m,n.toDisplayString(b.label(t)),1)],8,c)),[[h]])],42,d)):n.createCommentVNode("",!0)],64)))),128)),n.createElementVNode("li",p,null,512)],8,s)])},l}(primevue.ripple,primevue.utils,Vue);

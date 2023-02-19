this.primevue=this.primevue||{},this.primevue.menu=function(e,t,i,n,s){"use strict";function l(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var o=l(e),a=l(t),r={name:"Menuitem",inheritAttrs:!1,emits:["item-click"],props:{item:null,template:null,exact:null,id:null,focusedOptionId:null},methods:{getItemProp:(e,t)=>e&&e.item?i.ObjectUtils.getItemValue(e.item[t]):void 0,onItemActionClick(e,t){t&&t(e)},onItemClick(e){const t=this.getItemProp(this.item,"command");t&&t({originalEvent:e,item:this.item.item}),this.$emit("item-click",{originalEvent:e,item:this.item,id:this.id})},containerClass(){return["p-menuitem",this.item.class,{"p-focus":this.id===this.focusedOptionId,"p-disabled":this.disabled()}]},linkClass(e){return["p-menuitem-link",{"router-link-active":e&&e.isActive,"router-link-active-exact":this.exact&&e&&e.isExactActive}]},visible(){return"function"==typeof this.item.visible?this.item.visible():!1!==this.item.visible},disabled(){return"function"==typeof this.item.disabled?this.item.disabled():this.item.disabled},label(){return"function"==typeof this.item.label?this.item.label():this.item.label}},directives:{ripple:l(n).default}};const d=["id","aria-label","aria-disabled"],c=["href","onClick"],u={class:"p-menuitem-text"},p=["href","target"],m={class:"p-menuitem-text"};r.render=function(e,t,i,n,l,o){const a=s.resolveComponent("router-link"),r=s.resolveDirective("ripple");return o.visible()?(s.openBlock(),s.createElementBlock("li",{key:0,id:i.id,class:s.normalizeClass(o.containerClass()),role:"menuitem",style:s.normalizeStyle(i.item.style),"aria-label":o.label(),"aria-disabled":o.disabled()},[s.createElementVNode("div",{class:"p-menuitem-content",onClick:t[0]||(t[0]=e=>o.onItemClick(e))},[i.template?(s.openBlock(),s.createBlock(s.resolveDynamicComponent(i.template),{key:1,item:i.item},null,8,["item"])):(s.openBlock(),s.createElementBlock(s.Fragment,{key:0},[i.item.to&&!o.disabled()?(s.openBlock(),s.createBlock(a,{key:0,to:i.item.to,custom:""},{default:s.withCtx((({navigate:e,href:t,isActive:n,isExactActive:l})=>[s.withDirectives((s.openBlock(),s.createElementBlock("a",{href:t,class:s.normalizeClass(o.linkClass({isActive:n,isExactActive:l})),tabindex:"-1","aria-hidden":"true",onClick:t=>o.onItemActionClick(t,e)},[i.item.icon?(s.openBlock(),s.createElementBlock("span",{key:0,class:s.normalizeClass(["p-menuitem-icon",i.item.icon])},null,2)):s.createCommentVNode("",!0),s.createElementVNode("span",u,s.toDisplayString(o.label()),1)],10,c)),[[r]])])),_:1},8,["to"])):s.withDirectives((s.openBlock(),s.createElementBlock("a",{key:1,href:i.item.url,class:s.normalizeClass(o.linkClass()),target:i.item.target,tabindex:"-1","aria-hidden":"true"},[i.item.icon?(s.openBlock(),s.createElementBlock("span",{key:0,class:s.normalizeClass(["p-menuitem-icon",i.item.icon])},null,2)):s.createCommentVNode("",!0),s.createElementVNode("span",m,s.toDisplayString(o.label()),1)],10,p)),[[r]])],64))])],14,d)):s.createCommentVNode("",!0)};var h={name:"Menu",inheritAttrs:!1,emits:["show","hide","focus","blur"],props:{popup:{type:Boolean,default:!1},model:{type:Array,default:null},appendTo:{type:String,default:"body"},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},exact:{type:Boolean,default:!0},tabindex:{type:Number,default:0},"aria-label":{type:String,default:null},"aria-labelledby":{type:String,default:null}},data:()=>({overlayVisible:!1,focused:!1,focusedOptionIndex:-1,selectedOptionIndex:-1}),target:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,list:null,mounted(){this.popup||(this.bindResizeListener(),this.bindOutsideClickListener())},beforeUnmount(){this.unbindResizeListener(),this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.target=null,this.container&&this.autoZIndex&&i.ZIndexUtils.clear(this.container),this.container=null},methods:{itemClick(e){const t=e.item;this.disabled(t)||(t.command&&t.command(e),t.to&&e.navigate&&e.navigate(e.originalEvent),this.overlayVisible&&this.hide(),this.popup||this.focusedOptionIndex===e.id||(this.focusedOptionIndex=e.id))},onListFocus(e){this.focused=!0,this.popup||(-1!==this.selectedOptionIndex?(this.changeFocusedOptionIndex(this.selectedOptionIndex),this.selectedOptionIndex=-1):this.changeFocusedOptionIndex(0)),this.$emit("focus",e)},onListBlur(e){this.focused=!1,this.focusedOptionIndex=-1,this.$emit("blur",e)},onListKeyDown(e){switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"Enter":this.onEnterKey(e);break;case"Space":this.onSpaceKey(e);break;case"Escape":this.popup&&(i.DomHandler.focus(this.target),this.hide());case"Tab":this.overlayVisible&&this.hide()}},onArrowDownKey(e){const t=this.findNextOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(t),e.preventDefault()},onArrowUpKey(e){if(e.altKey&&this.popup)i.DomHandler.focus(this.target),this.hide(),e.preventDefault();else{const t=this.findPrevOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(t),e.preventDefault()}},onHomeKey(e){this.changeFocusedOptionIndex(0),e.preventDefault()},onEndKey(e){this.changeFocusedOptionIndex(i.DomHandler.find(this.container,"li.p-menuitem:not(.p-disabled)").length-1),e.preventDefault()},onEnterKey(e){const t=i.DomHandler.findSingle(this.list,`li[id="${this.focusedOptionIndex}"]`),n=t&&i.DomHandler.findSingle(t,".p-menuitem-link");this.popup&&i.DomHandler.focus(this.target),n?n.click():t&&t.click(),e.preventDefault()},onSpaceKey(e){this.onEnterKey(e)},findNextOptionIndex(e){const t=[...i.DomHandler.find(this.container,"li.p-menuitem:not(.p-disabled)")].findIndex((t=>t.id===e));return t>-1?t+1:0},findPrevOptionIndex(e){const t=[...i.DomHandler.find(this.container,"li.p-menuitem:not(.p-disabled)")].findIndex((t=>t.id===e));return t>-1?t-1:0},changeFocusedOptionIndex(e){const t=i.DomHandler.find(this.container,"li.p-menuitem:not(.p-disabled)");let n=e>=t.length?t.length-1:e<0?0:e;this.focusedOptionIndex=t[n].getAttribute("id")},toggle(e){this.overlayVisible?this.hide():this.show(e)},show(e){this.overlayVisible=!0,this.target=e.currentTarget},hide(){this.overlayVisible=!1,this.target=null},onEnter(e){this.alignOverlay(),this.bindOutsideClickListener(),this.bindResizeListener(),this.bindScrollListener(),this.autoZIndex&&i.ZIndexUtils.set("menu",e,this.baseZIndex+this.$primevue.config.zIndex.menu),this.popup&&(i.DomHandler.focus(this.list),this.changeFocusedOptionIndex(0)),this.$emit("show")},onLeave(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindScrollListener(),this.$emit("hide")},onAfterLeave(e){this.autoZIndex&&i.ZIndexUtils.clear(e)},alignOverlay(){i.DomHandler.absolutePosition(this.container,this.target),this.container.style.minWidth=i.DomHandler.getOuterWidth(this.target)+"px"},bindOutsideClickListener(){this.outsideClickListener||(this.outsideClickListener=e=>{const t=this.container&&!this.container.contains(e.target),i=!(this.target&&(this.target===e.target||this.target.contains(e.target)));this.overlayVisible&&t&&i?this.hide():!this.popup&&t&&i&&(this.focusedOptionIndex=-1)},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},bindScrollListener(){this.scrollHandler||(this.scrollHandler=new i.ConnectedOverlayScrollHandler(this.target,(()=>{this.overlayVisible&&this.hide()}))),this.scrollHandler.bindScrollListener()},unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener(){this.resizeListener||(this.resizeListener=()=>{this.overlayVisible&&!i.DomHandler.isTouchDevice()&&this.hide()},window.addEventListener("resize",this.resizeListener))},unbindResizeListener(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},visible:e=>"function"==typeof e.visible?e.visible():!1!==e.visible,disabled:e=>"function"==typeof e.disabled?e.disabled():e.disabled,label:e=>"function"==typeof e.label?e.label():e.label,separatorClass:e=>["p-menuitem-separator",e.class],onOverlayClick(e){o.default.emit("overlay-click",{originalEvent:e,target:this.target})},containerRef(e){this.container=e},listRef(e){this.list=e}},computed:{containerClass(){return["p-menu p-component",{"p-menu-overlay":this.popup,"p-input-filled":"filled"===this.$primevue.config.inputStyle,"p-ripple-disabled":!1===this.$primevue.config.ripple}]},id(){return this.$attrs.id||i.UniqueComponentId()},focusedOptionId(){return-1!==this.focusedOptionIndex?this.focusedOptionIndex:null}},components:{PVMenuitem:r,Portal:a.default}};const b=["id"],f=["id","tabindex","aria-activedescendant","aria-label","aria-labelledby"],k=["id"];return function(e,t){void 0===t&&(t={});var i=t.insertAt;if(e&&"undefined"!=typeof document){var n=document.head||document.getElementsByTagName("head")[0],s=document.createElement("style");s.type="text/css","top"===i&&n.firstChild?n.insertBefore(s,n.firstChild):n.appendChild(s),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(document.createTextNode(e))}}("\n.p-menu-overlay {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.p-menu ul {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n.p-menu .p-menuitem-link {\n    cursor: pointer;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    text-decoration: none;\n    overflow: hidden;\n    position: relative;\n}\n.p-menu .p-menuitem-text {\n    line-height: 1;\n}\n"),h.render=function(e,t,i,n,l,o){const a=s.resolveComponent("PVMenuitem"),r=s.resolveComponent("Portal");return s.openBlock(),s.createBlock(r,{appendTo:i.appendTo,disabled:!i.popup},{default:s.withCtx((()=>[s.createVNode(s.Transition,{name:"p-connected-overlay",onEnter:o.onEnter,onLeave:o.onLeave,onAfterLeave:o.onAfterLeave},{default:s.withCtx((()=>[!i.popup||l.overlayVisible?(s.openBlock(),s.createElementBlock("div",s.mergeProps({key:0,ref:o.containerRef,id:o.id,class:o.containerClass},e.$attrs,{onClick:t[3]||(t[3]=(...e)=>o.onOverlayClick&&o.onOverlayClick(...e))}),[s.createElementVNode("ul",{ref:o.listRef,id:o.id+"_list",class:"p-menu-list p-reset",role:"menu",tabindex:i.tabindex,"aria-activedescendant":l.focused?o.focusedOptionId:void 0,"aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,onFocus:t[0]||(t[0]=(...e)=>o.onListFocus&&o.onListFocus(...e)),onBlur:t[1]||(t[1]=(...e)=>o.onListBlur&&o.onListBlur(...e)),onKeydown:t[2]||(t[2]=(...e)=>o.onListKeyDown&&o.onListKeyDown(...e))},[(s.openBlock(!0),s.createElementBlock(s.Fragment,null,s.renderList(i.model,((t,n)=>(s.openBlock(),s.createElementBlock(s.Fragment,{key:o.label(t)+n.toString()},[t.items&&o.visible(t)&&!t.separator?(s.openBlock(),s.createElementBlock(s.Fragment,{key:0},[t.items?(s.openBlock(),s.createElementBlock("li",{key:0,id:o.id+"_"+n,class:"p-submenu-header",role:"none"},[s.renderSlot(e.$slots,"item",{item:t},(()=>[s.createTextVNode(s.toDisplayString(o.label(t)),1)]))],8,k)):s.createCommentVNode("",!0),(s.openBlock(!0),s.createElementBlock(s.Fragment,null,s.renderList(t.items,((l,r)=>(s.openBlock(),s.createElementBlock(s.Fragment,{key:l.label+n+"_"+r},[o.visible(l)&&!l.separator?(s.openBlock(),s.createBlock(a,{key:0,id:o.id+"_"+n+"_"+r,item:l,template:e.$slots.item,exact:i.exact,focusedOptionId:o.focusedOptionId,onItemClick:o.itemClick},null,8,["id","item","template","exact","focusedOptionId","onItemClick"])):o.visible(l)&&l.separator?(s.openBlock(),s.createElementBlock("li",{key:"separator"+n+r,class:s.normalizeClass(o.separatorClass(t)),style:s.normalizeStyle(l.style),role:"separator"},null,6)):s.createCommentVNode("",!0)],64)))),128))],64)):o.visible(t)&&t.separator?(s.openBlock(),s.createElementBlock("li",{key:"separator"+n.toString(),class:s.normalizeClass(o.separatorClass(t)),style:s.normalizeStyle(t.style),role:"separator"},null,6)):(s.openBlock(),s.createBlock(a,{key:o.label(t)+n.toString(),id:o.id+"_"+n,item:t,template:e.$slots.item,exact:i.exact,focusedOptionId:o.focusedOptionId,onItemClick:o.itemClick},null,8,["id","item","template","exact","focusedOptionId","onItemClick"]))],64)))),128))],40,f)],16,b)):s.createCommentVNode("",!0)])),_:3},8,["onEnter","onLeave","onAfterLeave"])])),_:3},8,["appendTo","disabled"])},h}(primevue.overlayeventbus,primevue.portal,primevue.utils,primevue.ripple,Vue);
this.primevue=this.primevue||{},this.primevue.confirmpopup=function(e,t,n,i,o,r,s){"use strict";function c(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var l=c(e),a=c(t),p=c(n),u=c(i),f=c(o),m={name:"ConfirmPopup",inheritAttrs:!1,props:{group:String},data:()=>({visible:!1,confirmation:null}),target:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,confirmListener:null,closeListener:null,mounted(){this.confirmListener=e=>{e&&e.group===this.group&&(this.confirmation=e,this.target=e.target,this.confirmation.onShow&&this.confirmation.onShow(),this.visible=!0)},this.closeListener=()=>{this.visible=!1,this.confirmation=null},a.default.on("confirm",this.confirmListener),a.default.on("close",this.closeListener)},beforeUnmount(){a.default.off("confirm",this.confirmListener),a.default.off("close",this.closeListener),this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.unbindResizeListener(),this.container&&(r.ZIndexUtils.clear(this.container),this.container=null),this.target=null,this.confirmation=null},methods:{accept(){this.confirmation.accept&&this.confirmation.accept(),this.visible=!1},reject(){this.confirmation.reject&&this.confirmation.reject(),this.visible=!1},onHide(){this.confirmation.onHide&&this.confirmation.onHide(),this.visible=!1},onAcceptKeydown(e){"Space"!==e.code&&"Enter"!==e.code||(this.accept(),r.DomHandler.focus(this.target),e.preventDefault())},onRejectKeydown(e){"Space"!==e.code&&"Enter"!==e.code||(this.reject(),r.DomHandler.focus(this.target),e.preventDefault())},onEnter(e){this.focus(),this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),r.ZIndexUtils.set("overlay",e,this.$primevue.config.zIndex.overlay)},onLeave(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener()},onAfterLeave(e){r.ZIndexUtils.clear(e)},alignOverlay(){r.DomHandler.absolutePosition(this.container,this.target);const e=r.DomHandler.getOffset(this.container),t=r.DomHandler.getOffset(this.target);let n=0;e.left<t.left&&(n=t.left-e.left),this.container.style.setProperty("--overlayArrowLeft",`${n}px`),e.top<t.top&&r.DomHandler.addClass(this.container,"p-confirm-popup-flipped")},bindOutsideClickListener(){this.outsideClickListener||(this.outsideClickListener=e=>{this.visible&&this.container&&!this.container.contains(e.target)&&!this.isTargetClicked(e)?(this.confirmation.onHide&&this.confirmation.onHide(),this.visible=!1):this.alignOverlay()},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},bindScrollListener(){this.scrollHandler||(this.scrollHandler=new r.ConnectedOverlayScrollHandler(this.target,(()=>{this.visible&&(this.visible=!1)}))),this.scrollHandler.bindScrollListener()},unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener(){this.resizeListener||(this.resizeListener=()=>{this.visible&&!r.DomHandler.isTouchDevice()&&(this.visible=!1)},window.addEventListener("resize",this.resizeListener))},unbindResizeListener(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},focus(){let e=this.container.querySelector("[autofocus]");e&&e.focus()},isTargetClicked(e){return this.target&&(this.target===e.target||this.target.contains(e.target))},containerRef(e){this.container=e},onOverlayClick(e){u.default.emit("overlay-click",{originalEvent:e,target:this.target})},onOverlayKeydown(e){"Escape"===e.code&&(a.default.emit("close",this.closeListener),r.DomHandler.focus(this.target))}},computed:{containerClass(){return["p-confirm-popup p-component",{"p-input-filled":"filled"===this.$primevue.config.inputStyle,"p-ripple-disabled":!1===this.$primevue.config.ripple}]},message(){return this.confirmation?this.confirmation.message:null},iconClass(){return["p-confirm-popup-icon",this.confirmation?this.confirmation.icon:null]},acceptLabel(){return this.confirmation?this.confirmation.acceptLabel||this.$primevue.config.locale.accept:null},rejectLabel(){return this.confirmation?this.confirmation.rejectLabel||this.$primevue.config.locale.reject:null},acceptIcon(){return this.confirmation?this.confirmation.acceptIcon:null},rejectIcon(){return this.confirmation?this.confirmation.rejectIcon:null},acceptClass(){return["p-confirm-popup-accept p-button-sm",this.confirmation?this.confirmation.acceptClass:null]},rejectClass(){return["p-confirm-popup-reject p-button-sm",this.confirmation?this.confirmation.rejectClass||"p-button-text":null]},autoFocusAccept(){return void 0===this.confirmation.defaultFocus||"accept"===this.confirmation.defaultFocus},autoFocusReject(){return"reject"===this.confirmation.defaultFocus}},components:{CPButton:l.default,Portal:f.default},directives:{focustrap:p.default}};const d=["aria-modal"],h={key:0,class:"p-confirm-popup-content"},b={class:"p-confirm-popup-message"},v={class:"p-confirm-popup-footer"};return function(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var i=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===n&&i.firstChild?i.insertBefore(o,i.firstChild):i.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}}("\n.p-confirm-popup {\n    position: absolute;\n    margin-top: 10px;\n    top: 0;\n    left: 0;\n}\n.p-confirm-popup-flipped {\n    margin-top: 0;\n    margin-bottom: 10px;\n}\n\n/* Animation */\n.p-confirm-popup-enter-from {\n    opacity: 0;\n    -webkit-transform: scaleY(0.8);\n            transform: scaleY(0.8);\n}\n.p-confirm-popup-leave-to {\n    opacity: 0;\n}\n.p-confirm-popup-enter-active {\n    -webkit-transition: opacity 0.12s cubic-bezier(0, 0, 0.2, 1), -webkit-transform 0.12s cubic-bezier(0, 0, 0.2, 1);\n    transition: opacity 0.12s cubic-bezier(0, 0, 0.2, 1), -webkit-transform 0.12s cubic-bezier(0, 0, 0.2, 1);\n    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1), opacity 0.12s cubic-bezier(0, 0, 0.2, 1);\n    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1), opacity 0.12s cubic-bezier(0, 0, 0.2, 1), -webkit-transform 0.12s cubic-bezier(0, 0, 0.2, 1);\n}\n.p-confirm-popup-leave-active {\n    -webkit-transition: opacity 0.1s linear;\n    transition: opacity 0.1s linear;\n}\n.p-confirm-popup:after,\n.p-confirm-popup:before {\n    bottom: 100%;\n    left: calc(var(--overlayArrowLeft, 0) + 1.25rem);\n    content: ' ';\n    height: 0;\n    width: 0;\n    position: absolute;\n    pointer-events: none;\n}\n.p-confirm-popup:after {\n    border-width: 8px;\n    margin-left: -8px;\n}\n.p-confirm-popup:before {\n    border-width: 10px;\n    margin-left: -10px;\n}\n.p-confirm-popup-flipped:after,\n.p-confirm-popup-flipped:before {\n    bottom: auto;\n    top: 100%;\n}\n.p-confirm-popup.p-confirm-popup-flipped:after {\n    border-bottom-color: transparent;\n}\n.p-confirm-popup.p-confirm-popup-flipped:before {\n    border-bottom-color: transparent;\n}\n.p-confirm-popup .p-confirm-popup-content {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n"),m.render=function(e,t,n,i,o,r){const c=s.resolveComponent("CPButton"),l=s.resolveComponent("Portal"),a=s.resolveDirective("focustrap");return s.openBlock(),s.createBlock(l,null,{default:s.withCtx((()=>[s.createVNode(s.Transition,{name:"p-confirm-popup",onEnter:r.onEnter,onLeave:r.onLeave,onAfterLeave:r.onAfterLeave},{default:s.withCtx((()=>[o.visible?s.withDirectives((s.openBlock(),s.createElementBlock("div",s.mergeProps({key:0,ref:r.containerRef,role:"alertdialog",class:r.containerClass,"aria-modal":o.visible,onClick:t[2]||(t[2]=(...e)=>r.onOverlayClick&&r.onOverlayClick(...e)),onKeydown:t[3]||(t[3]=(...e)=>r.onOverlayKeydown&&r.onOverlayKeydown(...e))},e.$attrs),[e.$slots.message?(s.openBlock(),s.createBlock(s.resolveDynamicComponent(e.$slots.message),{key:1,message:o.confirmation},null,8,["message"])):(s.openBlock(),s.createElementBlock("div",h,[s.createElementVNode("i",{class:s.normalizeClass(r.iconClass)},null,2),s.createElementVNode("span",b,s.toDisplayString(o.confirmation.message),1)])),s.createElementVNode("div",v,[s.createVNode(c,{label:r.rejectLabel,icon:r.rejectIcon,class:s.normalizeClass(r.rejectClass),onClick:t[0]||(t[0]=e=>r.reject()),onKeydown:r.onRejectKeydown,autofocus:r.autoFocusReject},null,8,["label","icon","class","onKeydown","autofocus"]),s.createVNode(c,{label:r.acceptLabel,icon:r.acceptIcon,class:s.normalizeClass(r.acceptClass),onClick:t[1]||(t[1]=e=>r.accept()),onKeydown:r.onAcceptKeydown,autofocus:r.autoFocusAccept},null,8,["label","icon","class","onKeydown","autofocus"])])],16,d)),[[a]]):s.createCommentVNode("",!0)])),_:1},8,["onEnter","onLeave","onAfterLeave"])])),_:1})},m}(primevue.button,primevue.confirmationeventbus,primevue.focustrap,primevue.overlayeventbus,primevue.portal,primevue.utils,Vue);
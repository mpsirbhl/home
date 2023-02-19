this.primevue=this.primevue||{},this.primevue.scrollpanel=function(e,t){"use strict";var s={name:"ScrollPanel",props:{step:{type:Number,default:5}},initialized:!1,documentResizeListener:null,documentMouseMoveListener:null,documentMouseUpListener:null,frame:null,scrollXRatio:null,scrollYRatio:null,isXBarClicked:!1,isYBarClicked:!1,lastPageX:null,lastPageY:null,timer:null,outsideClickListener:null,data:()=>({id:e.UniqueComponentId(),orientation:"vertical",lastScrollTop:0,lastScrollLeft:0}),mounted(){this.$el.offsetParent&&this.initialize()},updated(){!this.initialized&&this.$el.offsetParent&&this.initialize()},beforeUnmount(){this.unbindDocumentResizeListener(),this.frame&&window.cancelAnimationFrame(this.frame)},methods:{initialize(){this.moveBar(),this.bindDocumentResizeListener(),this.calculateContainerHeight()},calculateContainerHeight(){let t=getComputedStyle(this.$el),s=getComputedStyle(this.$refs.xBar),o=e.DomHandler.getHeight(this.$el)-parseInt(s.height,10);"none"!==t["max-height"]&&0===o&&(this.$refs.content.offsetHeight+parseInt(s.height,10)>parseInt(t["max-height"],10)?this.$el.style.height=t["max-height"]:this.$el.style.height=this.$refs.content.offsetHeight+parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)+parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth)+"px")},moveBar(){let t=this.$refs.content.scrollWidth,s=this.$refs.content.clientWidth,o=-1*(this.$el.clientHeight-this.$refs.xBar.clientHeight);this.scrollXRatio=s/t;let n=this.$refs.content.scrollHeight,i=this.$refs.content.clientHeight,r=-1*(this.$el.clientWidth-this.$refs.yBar.clientWidth);this.scrollYRatio=i/n,this.frame=this.requestAnimationFrame((()=>{this.scrollXRatio>=1?e.DomHandler.addClass(this.$refs.xBar,"p-scrollpanel-hidden"):(e.DomHandler.removeClass(this.$refs.xBar,"p-scrollpanel-hidden"),this.$refs.xBar.style.cssText="width:"+Math.max(100*this.scrollXRatio,10)+"%; left:"+this.$refs.content.scrollLeft/t*100+"%;bottom:"+o+"px;"),this.scrollYRatio>=1?e.DomHandler.addClass(this.$refs.yBar,"p-scrollpanel-hidden"):(e.DomHandler.removeClass(this.$refs.yBar,"p-scrollpanel-hidden"),this.$refs.yBar.style.cssText="height:"+Math.max(100*this.scrollYRatio,10)+"%; top: calc("+this.$refs.content.scrollTop/n*100+"% - "+this.$refs.xBar.clientHeight+"px);right:"+r+"px;")}))},onYBarMouseDown(t){this.isYBarClicked=!0,this.$refs.yBar.focus(),this.lastPageY=t.pageY,e.DomHandler.addClass(this.$refs.yBar,"p-scrollpanel-grabbed"),e.DomHandler.addClass(document.body,"p-scrollpanel-grabbed"),this.bindDocumentMouseListeners(),t.preventDefault()},onXBarMouseDown(t){this.isXBarClicked=!0,this.$refs.xBar.focus(),this.lastPageX=t.pageX,e.DomHandler.addClass(this.$refs.xBar,"p-scrollpanel-grabbed"),e.DomHandler.addClass(document.body,"p-scrollpanel-grabbed"),this.bindDocumentMouseListeners(),t.preventDefault()},onScroll(e){this.lastScrollLeft!==e.target.scrollLeft?(this.lastScrollLeft=e.target.scrollLeft,this.orientation="horizontal"):this.lastScrollTop!==e.target.scrollTop&&(this.lastScrollTop=e.target.scrollTop,this.orientation="vertical"),this.moveBar()},onKeyDown(e){if("vertical"===this.orientation)switch(e.code){case"ArrowDown":this.setTimer("scrollTop",this.step),e.preventDefault();break;case"ArrowUp":this.setTimer("scrollTop",-1*this.step),e.preventDefault();break;case"ArrowLeft":case"ArrowRight":e.preventDefault()}else if("horizontal"===this.orientation)switch(e.code){case"ArrowRight":this.setTimer("scrollLeft",this.step),e.preventDefault();break;case"ArrowLeft":this.setTimer("scrollLeft",-1*this.step),e.preventDefault();break;case"ArrowDown":case"ArrowUp":e.preventDefault()}},onKeyUp(){this.clearTimer()},repeat(e,t){this.$refs.content[e]+=t,this.moveBar()},setTimer(e,t){this.clearTimer(),this.timer=setTimeout((()=>{this.repeat(e,t)}),40)},clearTimer(){this.timer&&clearTimeout(this.timer)},onDocumentMouseMove(e){this.isXBarClicked?this.onMouseMoveForXBar(e):(this.isYBarClicked||this.onMouseMoveForXBar(e),this.onMouseMoveForYBar(e))},onMouseMoveForXBar(e){let t=e.pageX-this.lastPageX;this.lastPageX=e.pageX,this.frame=this.requestAnimationFrame((()=>{this.$refs.content.scrollLeft+=t/this.scrollXRatio}))},onMouseMoveForYBar(e){let t=e.pageY-this.lastPageY;this.lastPageY=e.pageY,this.frame=this.requestAnimationFrame((()=>{this.$refs.content.scrollTop+=t/this.scrollYRatio}))},onFocus(e){this.$refs.xBar.isSameNode(e.target)?this.orientation="horizontal":this.$refs.yBar.isSameNode(e.target)&&(this.orientation="vertical")},onBlur(){"horizontal"===this.orientation&&(this.orientation="vertical")},onDocumentMouseUp(){e.DomHandler.removeClass(this.$refs.yBar,"p-scrollpanel-grabbed"),e.DomHandler.removeClass(this.$refs.xBar,"p-scrollpanel-grabbed"),e.DomHandler.removeClass(document.body,"p-scrollpanel-grabbed"),this.unbindDocumentMouseListeners(),this.isXBarClicked=!1,this.isYBarClicked=!1},requestAnimationFrame(e){return(window.requestAnimationFrame||this.timeoutFrame)(e)},refresh(){this.moveBar()},scrollTop(e){let t=this.$refs.content.scrollHeight-this.$refs.content.clientHeight;e=e>t?t:e>0?e:0,this.$refs.content.scrollTop=e},timeoutFrame(e){setTimeout(e,0)},bindDocumentMouseListeners(){this.documentMouseMoveListener||(this.documentMouseMoveListener=e=>{this.onDocumentMouseMove(e)},document.addEventListener("mousemove",this.documentMouseMoveListener)),this.documentMouseUpListener||(this.documentMouseUpListener=e=>{this.onDocumentMouseUp(e)},document.addEventListener("mouseup",this.documentMouseUpListener))},unbindDocumentMouseListeners(){this.documentMouseMoveListener&&(document.removeEventListener("mousemove",this.documentMouseMoveListener),this.documentMouseMoveListener=null),this.documentMouseUpListener&&(document.removeEventListener("mouseup",this.documentMouseUpListener),this.documentMouseUpListener=null)},bindDocumentResizeListener(){this.documentResizeListener||(this.documentResizeListener=()=>{this.moveBar()},window.addEventListener("resize",this.documentResizeListener))},unbindDocumentResizeListener(){this.documentResizeListener&&(window.removeEventListener("resize",this.documentResizeListener),this.documentResizeListener=null)}}};const o={class:"p-scrollpanel p-component"},n={class:"p-scrollpanel-wrapper"},i=["aria-valuenow"],r=["aria-valuenow"];return function(e,t){void 0===t&&(t={});var s=t.insertAt;if(e&&"undefined"!=typeof document){var o=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css","top"===s&&o.firstChild?o.insertBefore(n,o.firstChild):o.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}}("\n.p-scrollpanel-wrapper {\n    overflow: hidden;\n    width: 100%;\n    height: 100%;\n    position: relative;\n    z-index: 1;\n    float: left;\n}\n.p-scrollpanel-content {\n    height: calc(100% + 18px);\n    width: calc(100% + 18px);\n    padding: 0 18px 18px 0;\n    position: relative;\n    overflow: scroll;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    scrollbar-width: none;\n}\n.p-scrollpanel-content::-webkit-scrollbar {\n    display: none;\n}\n.p-scrollpanel-bar {\n    position: relative;\n    background: #c1c1c1;\n    border-radius: 3px;\n    z-index: 2;\n    cursor: pointer;\n    opacity: 0;\n    -webkit-transition: opacity 0.25s linear;\n    transition: opacity 0.25s linear;\n}\n.p-scrollpanel-bar-y {\n    width: 9px;\n    top: 0;\n}\n.p-scrollpanel-bar-x {\n    height: 9px;\n    bottom: 0;\n}\n.p-scrollpanel-hidden {\n    visibility: hidden;\n}\n.p-scrollpanel:hover .p-scrollpanel-bar,\n.p-scrollpanel:active .p-scrollpanel-bar {\n    opacity: 1;\n}\n.p-scrollpanel-grabbed {\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n"),s.render=function(e,s,l,a,c,h){return t.openBlock(),t.createElementBlock("div",o,[t.createElementVNode("div",n,[t.createElementVNode("div",{ref:"content",class:"p-scrollpanel-content",onScroll:s[0]||(s[0]=(...e)=>h.onScroll&&h.onScroll(...e)),onMouseenter:s[1]||(s[1]=(...e)=>h.moveBar&&h.moveBar(...e))},[t.renderSlot(e.$slots,"default")],544)]),t.createElementVNode("div",{ref:"xBar",class:"p-scrollpanel-bar p-scrollpanel-bar-x",tabindex:"0",role:"scrollbar","aria-orientation":"horizontal","aria-valuenow":c.lastScrollLeft,onMousedown:s[2]||(s[2]=(...e)=>h.onXBarMouseDown&&h.onXBarMouseDown(...e)),onKeydown:s[3]||(s[3]=e=>h.onKeyDown(e)),onKeyup:s[4]||(s[4]=(...e)=>h.onKeyUp&&h.onKeyUp(...e)),onFocus:s[5]||(s[5]=(...e)=>h.onFocus&&h.onFocus(...e)),onBlur:s[6]||(s[6]=(...e)=>h.onBlur&&h.onBlur(...e))},null,40,i),t.createElementVNode("div",{ref:"yBar",class:"p-scrollpanel-bar p-scrollpanel-bar-y",tabindex:"0",role:"scrollbar","aria-orientation":"vertical","aria-valuenow":c.lastScrollTop,onMousedown:s[7]||(s[7]=(...e)=>h.onYBarMouseDown&&h.onYBarMouseDown(...e)),onKeydown:s[8]||(s[8]=e=>h.onKeyDown(e)),onKeyup:s[9]||(s[9]=(...e)=>h.onKeyUp&&h.onKeyUp(...e)),onFocus:s[10]||(s[10]=(...e)=>h.onFocus&&h.onFocus(...e))},null,40,r)])},s}(primevue.utils,Vue);
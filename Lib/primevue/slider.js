this.primevue=this.primevue||{},this.primevue.slider=function(e,t){"use strict";var i={name:"Slider",emits:["update:modelValue","change","slideend"],props:{modelValue:[Number,Array],min:{type:Number,default:0},max:{type:Number,default:100},orientation:{type:String,default:"horizontal"},step:{type:Number,default:null},range:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},tabindex:{type:Number,default:0},"aria-labelledby":{type:String,default:null},"aria-label":{type:String,default:null}},dragging:!1,handleIndex:null,initX:null,initY:null,barWidth:null,barHeight:null,dragListener:null,dragEndListener:null,beforeUnmount(){this.unbindDragListeners()},methods:{updateDomData(){let t=this.$el.getBoundingClientRect();this.initX=t.left+e.DomHandler.getWindowScrollLeft(),this.initY=t.top+e.DomHandler.getWindowScrollTop(),this.barWidth=this.$el.offsetWidth,this.barHeight=this.$el.offsetHeight},setValue(e){let t,i=e.touches?e.touches[0].pageX:e.pageX,a=e.touches?e.touches[0].pageY:e.pageY;t="horizontal"===this.orientation?100*(i-this.initX)/this.barWidth:100*(this.initY+this.barHeight-a)/this.barHeight;let n=(this.max-this.min)*(t/100)+this.min;if(this.step){const e=this.range?this.modelValue[this.handleIndex]:this.modelValue,t=n-e;t<0?n=e+Math.ceil(n/this.step-e/this.step)*this.step:t>0&&(n=e+Math.floor(n/this.step-e/this.step)*this.step)}else n=Math.floor(n);this.updateModel(e,n)},updateModel(e,t){let i,a=parseFloat(t.toFixed(10));this.range?(i=this.modelValue?[...this.modelValue]:[],0==this.handleIndex?(a<this.min?a=this.min:a>=this.max&&(a=this.max),a>i[1]?(i[1]=a,this.handleIndex=1):i[0]=a):(a>this.max?a=this.max:a<=this.min&&(a=this.min),a<i[0]?(i[0]=a,this.handleIndex=0):i[1]=a)):(a<this.min?a=this.min:a>this.max&&(a=this.max),i=a),this.$emit("update:modelValue",i),this.$emit("change",i)},onDragStart(t,i){this.disabled||(e.DomHandler.addClass(this.$el,"p-slider-sliding"),this.dragging=!0,this.updateDomData(),this.range&&this.modelValue[0]===this.max?this.handleIndex=0:this.handleIndex=i,t.preventDefault())},onDrag(e){this.dragging&&(this.setValue(e),e.preventDefault())},onDragEnd(t){this.dragging&&(this.dragging=!1,e.DomHandler.removeClass(this.$el,"p-slider-sliding"),this.$emit("slideend",{originalEvent:t,value:this.modelValue}))},onBarClick(t){this.disabled||e.DomHandler.hasClass(t.target,"p-slider-handle")||(this.updateDomData(),this.setValue(t))},onMouseDown(e,t){this.bindDragListeners(),this.onDragStart(e,t)},onKeyDown(e,t){switch(this.handleIndex=t,e.code){case"ArrowDown":case"ArrowLeft":this.decrementValue(e,t),e.preventDefault();break;case"ArrowUp":case"ArrowRight":this.incrementValue(e,t),e.preventDefault();break;case"PageDown":this.decrementValue(e,t,!0),e.preventDefault();break;case"PageUp":this.incrementValue(e,t,!0),e.preventDefault();break;case"Home":this.updateModel(e,this.min),e.preventDefault();break;case"End":this.updateModel(e,this.max),e.preventDefault()}},decrementValue(e,t,i=!1){let a;a=this.range?this.step?this.modelValue[t]-this.step:this.modelValue[t]-1:this.step?this.modelValue-this.step:!this.step&&i?this.modelValue-10:this.modelValue-1,this.updateModel(e,a),e.preventDefault()},incrementValue(e,t,i=!1){let a;a=this.range?this.step?this.modelValue[t]+this.step:this.modelValue[t]+1:this.step?this.modelValue+this.step:!this.step&&i?this.modelValue+10:this.modelValue+1,this.updateModel(e,a),e.preventDefault()},bindDragListeners(){this.dragListener||(this.dragListener=this.onDrag.bind(this),document.addEventListener("mousemove",this.dragListener)),this.dragEndListener||(this.dragEndListener=this.onDragEnd.bind(this),document.addEventListener("mouseup",this.dragEndListener))},unbindDragListeners(){this.dragListener&&(document.removeEventListener("mousemove",this.dragListener),this.dragListener=null),this.dragEndListener&&(document.removeEventListener("mouseup",this.dragEndListener),this.dragEndListener=null)}},computed:{containerClass(){return["p-slider p-component",{"p-disabled":this.disabled,"p-slider-horizontal":"horizontal"===this.orientation,"p-slider-vertical":"vertical"===this.orientation}]},horizontal(){return"horizontal"===this.orientation},vertical(){return"vertical"===this.orientation},rangeStyle(){if(this.range){const e=this.rangeEndPosition>this.rangeStartPosition?this.rangeEndPosition-this.rangeStartPosition:this.rangeStartPosition-this.rangeEndPosition,t=this.rangeEndPosition>this.rangeStartPosition?this.rangeStartPosition:this.rangeEndPosition;return this.horizontal?{left:t+"%",width:e+"%"}:{bottom:t+"%",height:e+"%"}}return this.horizontal?{width:this.handlePosition+"%"}:{height:this.handlePosition+"%"}},handleStyle(){return this.horizontal?{left:this.handlePosition+"%"}:{bottom:this.handlePosition+"%"}},handlePosition(){return this.modelValue<this.min?0:this.modelValue>this.max?100:100*(this.modelValue-this.min)/(this.max-this.min)},rangeStartPosition(){return this.modelValue&&this.modelValue[0]?100*(this.modelValue[0]<this.min?0:this.modelValue[0]-this.min)/(this.max-this.min):0},rangeEndPosition(){return this.modelValue&&2===this.modelValue.length?100*(this.modelValue[1]>this.max?100:this.modelValue[1]-this.min)/(this.max-this.min):100},rangeStartHandleStyle(){return this.horizontal?{left:this.rangeStartPosition+"%"}:{bottom:this.rangeStartPosition+"%"}},rangeEndHandleStyle(){return this.horizontal?{left:this.rangeEndPosition+"%"}:{bottom:this.rangeEndPosition+"%"}}}};const a=["tabindex","aria-valuemin","aria-valuenow","aria-valuemax","aria-labelledby","aria-label","aria-orientation"],n=["tabindex","aria-valuemin","aria-valuenow","aria-valuemax","aria-labelledby","aria-label","aria-orientation"],l=["tabindex","aria-valuemin","aria-valuenow","aria-valuemax","aria-labelledby","aria-label","aria-orientation"];return function(e,t){void 0===t&&(t={});var i=t.insertAt;if(e&&"undefined"!=typeof document){var a=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css","top"===i&&a.firstChild?a.insertBefore(n,a.firstChild):a.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}}("\n.p-slider {\n    position: relative;\n}\n.p-slider .p-slider-handle {\n    position: absolute;\n    cursor: -webkit-grab;\n    cursor: grab;\n    -ms-touch-action: none;\n        touch-action: none;\n    display: block;\n}\n.p-slider-range {\n    position: absolute;\n    display: block;\n}\n.p-slider-horizontal .p-slider-range {\n    top: 0;\n    left: 0;\n    height: 100%;\n}\n.p-slider-horizontal .p-slider-handle {\n    top: 50%;\n}\n.p-slider-vertical {\n    height: 100px;\n}\n.p-slider-vertical .p-slider-handle {\n    left: 50%;\n}\n.p-slider-vertical .p-slider-range {\n    bottom: 0;\n    left: 0;\n    width: 100%;\n}\n"),i.render=function(e,i,s,o,r,d){return t.openBlock(),t.createElementBlock("div",{class:t.normalizeClass(d.containerClass),onClick:i[15]||(i[15]=(...e)=>d.onBarClick&&d.onBarClick(...e))},[t.createElementVNode("span",{class:"p-slider-range",style:t.normalizeStyle(d.rangeStyle)},null,4),s.range?t.createCommentVNode("",!0):(t.openBlock(),t.createElementBlock("span",{key:0,class:"p-slider-handle",style:t.normalizeStyle(d.handleStyle),onTouchstart:i[0]||(i[0]=e=>d.onDragStart(e)),onTouchmove:i[1]||(i[1]=e=>d.onDrag(e)),onTouchend:i[2]||(i[2]=e=>d.onDragEnd(e)),onMousedown:i[3]||(i[3]=e=>d.onMouseDown(e)),onKeydown:i[4]||(i[4]=e=>d.onKeyDown(e)),tabindex:s.tabindex,role:"slider","aria-valuemin":s.min,"aria-valuenow":s.modelValue,"aria-valuemax":s.max,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-orientation":s.orientation},null,44,a)),s.range?(t.openBlock(),t.createElementBlock("span",{key:1,class:"p-slider-handle",style:t.normalizeStyle(d.rangeStartHandleStyle),onTouchstart:i[5]||(i[5]=e=>d.onDragStart(e,0)),onTouchmove:i[6]||(i[6]=e=>d.onDrag(e)),onTouchend:i[7]||(i[7]=e=>d.onDragEnd(e)),onMousedown:i[8]||(i[8]=e=>d.onMouseDown(e,0)),onKeydown:i[9]||(i[9]=e=>d.onKeyDown(e,0)),tabindex:s.tabindex,role:"slider","aria-valuemin":s.min,"aria-valuenow":s.modelValue?s.modelValue[0]:null,"aria-valuemax":s.max,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-orientation":s.orientation},null,44,n)):t.createCommentVNode("",!0),s.range?(t.openBlock(),t.createElementBlock("span",{key:2,class:"p-slider-handle",style:t.normalizeStyle(d.rangeEndHandleStyle),onTouchstart:i[10]||(i[10]=e=>d.onDragStart(e,1)),onTouchmove:i[11]||(i[11]=e=>d.onDrag(e)),onTouchend:i[12]||(i[12]=e=>d.onDragEnd(e)),onMousedown:i[13]||(i[13]=e=>d.onMouseDown(e,1)),onKeydown:i[14]||(i[14]=e=>d.onKeyDown(e,1)),tabindex:s.tabindex,role:"slider","aria-valuemin":s.min,"aria-valuenow":s.modelValue?s.modelValue[1]:null,"aria-valuemax":s.max,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-orientation":s.orientation},null,44,l)):t.createCommentVNode("",!0)],2)},i}(primevue.utils,Vue);
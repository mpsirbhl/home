this.primevue=this.primevue||{},this.primevue.badge=function(e){"use strict";var s={name:"Badge",props:{value:null,severity:null,size:null},computed:{containerClass(){return this.$slots.default?"p-overlay-badge":this.badgeClass},badgeClass(){return["p-badge p-component",{"p-badge-no-gutter":this.value&&1===String(this.value).length,"p-badge-dot":!this.value&&!this.$slots.default,"p-badge-lg":"large"===this.size,"p-badge-xl":"xlarge"===this.size,"p-badge-info":"info"===this.severity,"p-badge-success":"success"===this.severity,"p-badge-warning":"warning"===this.severity,"p-badge-danger":"danger"===this.severity}]}}};return s.render=function(s,t,a,i,r,l){return e.openBlock(),e.createElementBlock("span",{class:e.normalizeClass(l.badgeClass)},[e.renderSlot(s.$slots,"default",{},(()=>[e.createTextVNode(e.toDisplayString(a.value),1)]))],2)},s}(Vue);
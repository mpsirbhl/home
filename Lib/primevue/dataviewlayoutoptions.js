this.primevue=this.primevue||{},this.primevue.dataviewlayoutoptions=function(e){"use strict";var t={name:"DataViewLayoutOptions",emits:["update:modelValue"],props:{modelValue:String},data:()=>({isListButtonPressed:!1,isGridButtonPressed:!1}),methods:{changeLayout(e){this.$emit("update:modelValue",e),"list"===e?(this.isListButtonPressed=!0,this.isGridButtonPressed=!1):"grid"===e&&(this.isGridButtonPressed=!0,this.isListButtonPressed=!1)}},computed:{buttonListClass(){return["p-button p-button-icon-only",{"p-highlight":"list"===this.modelValue}]},buttonGridClass(){return["p-button p-button-icon-only",{"p-highlight":"grid"===this.modelValue}]},listViewAriaLabel(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.listView:void 0},gridViewAriaLabel(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.gridView:void 0}}};const i={class:"p-dataview-layout-options p-selectbutton p-buttonset",role:"group"},s=["aria-label","aria-pressed"],a=[e.createElementVNode("i",{class:"pi pi-bars"},null,-1)],r=["aria-label","aria-pressed"],l=[e.createElementVNode("i",{class:"pi pi-th-large"},null,-1)];return t.render=function(t,o,n,u,d,p){return e.openBlock(),e.createElementBlock("div",i,[e.createElementVNode("button",{"aria-label":p.listViewAriaLabel,class:e.normalizeClass(p.buttonListClass),onClick:o[0]||(o[0]=e=>p.changeLayout("list")),type:"button","aria-pressed":d.isListButtonPressed},a,10,s),e.createElementVNode("button",{"aria-label":p.gridViewAriaLabel,class:e.normalizeClass(p.buttonGridClass),onClick:o[1]||(o[1]=e=>p.changeLayout("grid")),type:"button","aria-pressed":d.isGridButtonPressed},l,10,r)])},t}(Vue);

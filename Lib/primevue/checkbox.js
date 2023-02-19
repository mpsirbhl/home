this.primevue=this.primevue||{},this.primevue.checkbox=function(e,l){"use strict";var t={name:"Checkbox",emits:["click","update:modelValue","change","input","focus","blur"],props:{value:null,modelValue:null,binary:Boolean,name:{type:String,default:null},trueValue:{type:null,default:!0},falseValue:{type:null,default:!1},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},required:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:String,default:null},inputStyle:{type:null,default:null},inputProps:{type:null,default:null},"aria-labelledby":{type:String,default:null},"aria-label":{type:String,default:null}},data:()=>({focused:!1}),methods:{onClick(l){if(!this.disabled){let t;t=this.binary?this.checked?this.falseValue:this.trueValue:this.checked?this.modelValue.filter((l=>!e.ObjectUtils.equals(l,this.value))):this.modelValue?[...this.modelValue,this.value]:[this.value],this.$emit("click",l),this.$emit("update:modelValue",t),this.$emit("change",l),this.$emit("input",t),this.$refs.input.focus()}},onFocus(e){this.focused=!0,this.$emit("focus",e)},onBlur(e){this.focused=!1,this.$emit("blur",e)}},computed:{checked(){return this.binary?this.modelValue===this.trueValue:e.ObjectUtils.contains(this.value,this.modelValue)},containerClass(){return["p-checkbox p-component",{"p-checkbox-checked":this.checked,"p-checkbox-disabled":this.disabled,"p-checkbox-focused":this.focused}]}}};const a={class:"p-hidden-accessible"},i=["id","value","name","checked","tabindex","disabled","readonly","required","aria-labelledby","aria-label"];return t.render=function(e,t,u,s,n,d){return l.openBlock(),l.createElementBlock("div",{class:l.normalizeClass(d.containerClass),onClick:t[2]||(t[2]=e=>d.onClick(e))},[l.createElementVNode("div",a,[l.createElementVNode("input",l.mergeProps({ref:"input",id:u.inputId,type:"checkbox",value:u.value,class:u.inputClass,style:u.inputStyle,name:u.name,checked:d.checked,tabindex:u.tabindex,disabled:u.disabled,readonly:u.readonly,required:u.required,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,onFocus:t[0]||(t[0]=e=>d.onFocus(e)),onBlur:t[1]||(t[1]=e=>d.onBlur(e))},u.inputProps),null,16,i)]),l.createElementVNode("div",{ref:"box",class:l.normalizeClass(["p-checkbox-box",{"p-highlight":d.checked,"p-disabled":u.disabled,"p-focus":n.focused}])},[l.createElementVNode("span",{class:l.normalizeClass(["p-checkbox-icon",{"pi pi-check":d.checked}])},null,2)],2)],2)},t}(primevue.utils,Vue);
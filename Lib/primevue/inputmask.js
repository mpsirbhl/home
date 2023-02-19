this.primevue=this.primevue||{},this.primevue.inputmask=function(e,t){"use strict";var s={name:"InputMask",emits:["update:modelValue","focus","blur","keydown","complete","keypress","paste"],props:{modelValue:null,slotChar:{type:String,default:"_"},mask:{type:String,default:null},autoClear:{type:Boolean,default:!0},unmask:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1}},mounted(){this.tests=[],this.partialPosition=this.mask.length,this.len=this.mask.length,this.firstNonMaskPos=null,this.defs={9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"};let t=e.DomHandler.getUserAgent();this.androidChrome=/chrome/i.test(t)&&/android/i.test(t);let s=this.mask.split("");for(let e=0;e<s.length;e++){let t=s[e];"?"===t?(this.len--,this.partialPosition=e):this.defs[t]?(this.tests.push(new RegExp(this.defs[t])),null===this.firstNonMaskPos&&(this.firstNonMaskPos=this.tests.length-1),e<this.partialPosition&&(this.lastRequiredNonMaskPos=this.tests.length-1)):this.tests.push(null)}this.buffer=[];for(let e=0;e<s.length;e++){let t=s[e];"?"!==t&&(this.defs[t]?this.buffer.push(this.getPlaceholder(e)):this.buffer.push(t))}this.defaultBuffer=this.buffer.join(""),this.updateValue(!1)},updated(){this.isValueUpdated()&&this.updateValue()},methods:{onInput(e){this.androidChrome?this.handleAndroidInput(e):this.handleInputChange(e),this.$emit("update:modelValue",e.target.value)},onFocus(e){if(this.readonly)return;let t;this.focus=!0,clearTimeout(this.caretTimeoutId),this.focusText=this.$el.value,t=this.checkVal(),this.caretTimeoutId=setTimeout((()=>{this.$el===document.activeElement&&(this.writeBuffer(),t===this.mask.replace("?","").length?this.caret(0,t):this.caret(t))}),10),this.$emit("focus",e)},onBlur(e){if(this.focus=!1,this.checkVal(),this.updateModel(e),this.$el.value!==this.focusText){let e=document.createEvent("HTMLEvents");e.initEvent("change",!0,!1),this.$el.dispatchEvent(e)}this.$emit("blur",e)},onKeyDown(t){if(this.readonly)return;let s,i,h,l=t.which||t.keyCode,a=/iphone/i.test(e.DomHandler.getUserAgent());this.oldVal=this.$el.value,8===l||46===l||a&&127===l?(s=this.caret(),i=s.begin,h=s.end,h-i==0&&(i=46!==l?this.seekPrev(i):h=this.seekNext(i-1),h=46===l?this.seekNext(h):h),this.clearBuffer(i,h),this.shiftL(i,h-1),this.updateModel(t),t.preventDefault()):13===l?(this.$el.blur(),this.updateModel(t)):27===l&&(this.$el.value=this.focusText,this.caret(0,this.checkVal()),this.updateModel(t),t.preventDefault()),this.$emit("keydown",t)},onKeyPress(t){if(!this.readonly){var s,i,h,l,a=t.which||t.keyCode,n=this.caret();if(!(t.ctrlKey||t.altKey||t.metaKey||a<32)){if(a&&13!==a){if(n.end-n.begin!=0&&(this.clearBuffer(n.begin,n.end),this.shiftL(n.begin,n.end-1)),(s=this.seekNext(n.begin-1))<this.len&&(i=String.fromCharCode(a),this.tests[s].test(i))){if(this.shiftR(s),this.buffer[s]=i,this.writeBuffer(),h=this.seekNext(s),/android/i.test(e.DomHandler.getUserAgent())){setTimeout((()=>{this.caret(h)}),0)}else this.caret(h);n.begin<=this.lastRequiredNonMaskPos&&(l=this.isCompleted())}t.preventDefault()}this.updateModel(t),l&&this.$emit("complete",t),this.$emit("keypress",t)}}},onPaste(e){this.handleInputChange(e),this.$emit("paste",e)},caret(e,t){let s,i,h;if(this.$el.offsetParent&&this.$el===document.activeElement)return"number"!=typeof e?(this.$el.setSelectionRange?(i=this.$el.selectionStart,h=this.$el.selectionEnd):document.selection&&document.selection.createRange&&(s=document.selection.createRange(),i=0-s.duplicate().moveStart("character",-1e5),h=i+s.text.length),{begin:i,end:h}):(i=e,h="number"==typeof t?t:i,void(this.$el.setSelectionRange?this.$el.setSelectionRange(i,h):this.$el.createTextRange&&(s=this.$el.createTextRange(),s.collapse(!0),s.moveEnd("character",h),s.moveStart("character",i),s.select())))},isCompleted(){for(let e=this.firstNonMaskPos;e<=this.lastRequiredNonMaskPos;e++)if(this.tests[e]&&this.buffer[e]===this.getPlaceholder(e))return!1;return!0},getPlaceholder(e){return e<this.slotChar.length?this.slotChar.charAt(e):this.slotChar.charAt(0)},seekNext(e){for(;++e<this.len&&!this.tests[e];);return e},seekPrev(e){for(;--e>=0&&!this.tests[e];);return e},shiftL(e,t){let s,i;if(!(e<0)){for(s=e,i=this.seekNext(t);s<this.len;s++)if(this.tests[s]){if(!(i<this.len&&this.tests[s].test(this.buffer[i])))break;this.buffer[s]=this.buffer[i],this.buffer[i]=this.getPlaceholder(i),i=this.seekNext(i)}this.writeBuffer(),this.caret(Math.max(this.firstNonMaskPos,e))}},shiftR(e){let t,s,i,h;for(t=e,s=this.getPlaceholder(e);t<this.len;t++)if(this.tests[t]){if(i=this.seekNext(t),h=this.buffer[t],this.buffer[t]=s,!(i<this.len&&this.tests[i].test(h)))break;s=h}},handleAndroidInput(e){var t=this.$el.value,s=this.caret();if(this.oldVal&&this.oldVal.length&&this.oldVal.length>t.length){for(this.checkVal(!0);s.begin>0&&!this.tests[s.begin-1];)s.begin--;if(0===s.begin)for(;s.begin<this.firstNonMaskPos&&!this.tests[s.begin];)s.begin++;this.caret(s.begin,s.begin)}else{for(this.checkVal(!0);s.begin<this.len&&!this.tests[s.begin];)s.begin++;this.caret(s.begin,s.begin)}this.isCompleted()&&this.$emit("complete",e)},clearBuffer(e,t){let s;for(s=e;s<t&&s<this.len;s++)this.tests[s]&&(this.buffer[s]=this.getPlaceholder(s))},writeBuffer(){this.$el.value=this.buffer.join("")},checkVal(e){this.isValueChecked=!0;let t,s,i,h=this.$el.value,l=-1;for(t=0,i=0;t<this.len;t++)if(this.tests[t]){for(this.buffer[t]=this.getPlaceholder(t);i++<h.length;)if(s=h.charAt(i-1),this.tests[t].test(s)){this.buffer[t]=s,l=t;break}if(i>h.length){this.clearBuffer(t+1,this.len);break}}else this.buffer[t]===h.charAt(i)&&i++,t<this.partialPosition&&(l=t);return e?this.writeBuffer():l+1<this.partialPosition?this.autoClear||this.buffer.join("")===this.defaultBuffer?(this.$el.value&&(this.$el.value=""),this.clearBuffer(0,this.len)):this.writeBuffer():(this.writeBuffer(),this.$el.value=this.$el.value.substring(0,l+1)),this.partialPosition?t:this.firstNonMaskPos},handleInputChange(e){if(!this.readonly){var t=this.checkVal(!0);this.caret(t),this.updateModel(e),this.isCompleted()&&this.$emit("complete",e)}},getUnmaskedValue(){let e=[];for(let t=0;t<this.buffer.length;t++){let s=this.buffer[t];this.tests[t]&&s!==this.getPlaceholder(t)&&e.push(s)}return e.join("")},updateModel(e){let t=this.unmask?this.getUnmaskedValue():e.target.value;this.$emit("update:modelValue",this.defaultBuffer!==t?t:"")},updateValue(e=!0){this.$el&&(null==this.modelValue?(this.$el.value="",e&&this.$emit("update:modelValue","")):(this.$el.value=this.modelValue,this.checkVal(),setTimeout((()=>{if(this.$el&&(this.writeBuffer(),this.checkVal(),e)){let e=this.unmask?this.getUnmaskedValue():this.$el.value;this.$emit("update:modelValue",this.defaultBuffer!==e?e:"")}}),10)),this.focusText=this.$el.value)},isValueUpdated(){return this.unmask?this.modelValue!=this.getUnmaskedValue():this.defaultBuffer!==this.$el.value&&this.$el.value!==this.modelValue}},computed:{filled(){return null!=this.modelValue&&this.modelValue.toString().length>0},inputClass(){return["p-inputmask p-inputtext p-component",{"p-filled":this.filled}]}}};const i=["readonly"];return s.render=function(e,s,h,l,a,n){return t.openBlock(),t.createElementBlock("input",{class:t.normalizeClass(n.inputClass),readonly:h.readonly,onInput:s[0]||(s[0]=(...e)=>n.onInput&&n.onInput(...e)),onFocus:s[1]||(s[1]=(...e)=>n.onFocus&&n.onFocus(...e)),onBlur:s[2]||(s[2]=(...e)=>n.onBlur&&n.onBlur(...e)),onKeydown:s[3]||(s[3]=(...e)=>n.onKeyDown&&n.onKeyDown(...e)),onKeypress:s[4]||(s[4]=(...e)=>n.onKeyPress&&n.onKeyPress(...e)),onPaste:s[5]||(s[5]=(...e)=>n.onPaste&&n.onPaste(...e))},null,42,i)},s}(primevue.utils,Vue);
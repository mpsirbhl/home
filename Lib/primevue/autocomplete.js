this.primevue=this.primevue||{},this.primevue.autocomplete=function(e,t,i,n,o,l,s){"use strict";function a(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r=a(e),d=a(t),p=a(i),u=a(n),c=a(l),h={name:"AutoComplete",emits:["update:modelValue","change","focus","blur","item-select","item-unselect","dropdown-click","clear","complete","before-show","before-hide","show","hide"],props:{modelValue:null,suggestions:{type:Array,default:null},field:{type:[String,Function],default:null},optionLabel:null,optionDisabled:null,optionGroupLabel:null,optionGroupChildren:null,scrollHeight:{type:String,default:"200px"},dropdown:{type:Boolean,default:!1},dropdownMode:{type:String,default:"blank"},autoHighlight:{type:Boolean,default:!1},multiple:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},placeholder:{type:String,default:null},dataKey:{type:String,default:null},minLength:{type:Number,default:1},delay:{type:Number,default:300},appendTo:{type:String,default:"body"},forceSelection:{type:Boolean,default:!1},completeOnFocus:{type:Boolean,default:!1},inputId:{type:String,default:null},inputStyle:{type:null,default:null},inputClass:{type:String,default:null},inputProps:{type:null,default:null},panelStyle:{type:null,default:null},panelClass:{type:String,default:null},panelProps:{type:null,default:null},dropdownIcon:{type:String,default:"pi pi-chevron-down"},dropdownClass:{type:String,default:null},loadingIcon:{type:String,default:"pi pi-spinner"},removeTokenIcon:{type:String,default:"pi pi-times-circle"},virtualScrollerOptions:{type:Object,default:null},autoOptionFocus:{type:Boolean,default:!0},selectOnFocus:{type:Boolean,default:!1},searchLocale:{type:String,default:void 0},searchMessage:{type:String,default:null},selectionMessage:{type:String,default:null},emptySelectionMessage:{type:String,default:null},emptySearchMessage:{type:String,default:null},tabindex:{type:Number,default:0},"aria-label":{type:String,default:null},"aria-labelledby":{type:String,default:null}},outsideClickListener:null,resizeListener:null,scrollHandler:null,overlay:null,virtualScroller:null,searchTimeout:null,focusOnHover:!1,dirty:!1,data:()=>({focused:!1,focusedOptionIndex:-1,focusedMultipleOptionIndex:-1,overlayVisible:!1,searching:!1}),watch:{suggestions(){this.searching&&(o.ObjectUtils.isNotEmpty(this.suggestions)?this.show():this.hide(),this.focusedOptionIndex=this.overlayVisible&&this.autoOptionFocus?this.findFirstFocusedOptionIndex():-1,this.searching=!1),this.autoUpdateModel()}},mounted(){this.autoUpdateModel()},updated(){this.overlayVisible&&this.alignOverlay()},beforeUnmount(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.overlay&&(o.ZIndexUtils.clear(this.overlay),this.overlay=null)},methods:{getOptionIndex(e,t){return this.virtualScrollerDisabled?e:t&&t(e).index},getOptionLabel(e){return this.field||this.optionLabel?o.ObjectUtils.resolveFieldData(e,this.field||this.optionLabel):e},getOptionValue:e=>e,getOptionRenderKey(e,t){return(this.dataKey?o.ObjectUtils.resolveFieldData(e,this.dataKey):this.getOptionLabel(e))+"_"+t},isOptionDisabled(e){return!!this.optionDisabled&&o.ObjectUtils.resolveFieldData(e,this.optionDisabled)},isOptionGroup(e){return this.optionGroupLabel&&e.optionGroup&&e.group},getOptionGroupLabel(e){return o.ObjectUtils.resolveFieldData(e,this.optionGroupLabel)},getOptionGroupChildren(e){return o.ObjectUtils.resolveFieldData(e,this.optionGroupChildren)},getAriaPosInset(e){return(this.optionGroupLabel?e-this.visibleOptions.slice(0,e).filter((e=>this.isOptionGroup(e))).length:e)+1},show(e){this.$emit("before-show"),this.dirty=!0,this.overlayVisible=!0,this.focusedOptionIndex=-1!==this.focusedOptionIndex?this.focusedOptionIndex:this.autoOptionFocus?this.findFirstFocusedOptionIndex():-1,e&&o.DomHandler.focus(this.$refs.focusInput)},hide(e){const t=()=>{this.$emit("before-hide"),this.dirty=e,this.overlayVisible=!1,this.focusedOptionIndex=-1,e&&o.DomHandler.focus(this.$refs.focusInput)};setTimeout((()=>{t()}),0)},onFocus(e){!this.dirty&&this.completeOnFocus&&this.search(e,e.target.value,"focus"),this.dirty=!0,this.focused=!0,this.focusedOptionIndex=-1!==this.focusedOptionIndex?this.focusedOptionIndex:this.overlayVisible&&this.autoOptionFocus?this.findFirstFocusedOptionIndex():-1,this.overlayVisible&&this.scrollInView(this.focusedOptionIndex),this.$emit("focus",e)},onBlur(e){this.dirty=!1,this.focused=!1,this.focusedOptionIndex=-1,this.$emit("blur",e)},onKeyDown(e){switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e);break;case"ArrowLeft":this.onArrowLeftKey(e);break;case"ArrowRight":this.onArrowRightKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"PageDown":this.onPageDownKey(e);break;case"PageUp":this.onPageUpKey(e);break;case"Enter":this.onEnterKey(e);break;case"Escape":this.onEscapeKey(e);break;case"Tab":this.onTabKey(e);break;case"Backspace":this.onBackspaceKey(e)}},onInput(e){this.searchTimeout&&clearTimeout(this.searchTimeout);let t=e.target.value;this.multiple||this.updateModel(e,t),0===t.length?(this.hide(),this.$emit("clear")):t.length>=this.minLength?(this.focusedOptionIndex=-1,this.searchTimeout=setTimeout((()=>{this.search(e,t,"input")}),this.delay)):this.hide()},onChange(e){if(this.forceSelection){let t=!1;if(this.visibleOptions){const i=this.visibleOptions.find((e=>this.isOptionMatched(e,this.$refs.focusInput.value||"")));void 0!==i&&(t=!0,!this.isSelected(i)&&this.onOptionSelect(e,i))}t||(this.$refs.focusInput.value="",this.$emit("clear"),!this.multiple&&this.updateModel(e,null))}},onMultipleContainerFocus(){this.focused=!0},onMultipleContainerBlur(){this.focusedMultipleOptionIndex=-1,this.focused=!1},onMultipleContainerKeyDown(e){switch(e.code){case"ArrowLeft":this.onArrowLeftKeyOnMultiple(e);break;case"ArrowRight":this.onArrowRightKeyOnMultiple(e);break;case"Backspace":this.onBackspaceKeyOnMultiple(e)}},onContainerClick(e){this.disabled||this.searching||this.isInputClicked(e)||this.isDropdownClicked(e)||this.overlay&&this.overlay.contains(e.target)||o.DomHandler.focus(this.$refs.focusInput)},onDropdownClick(e){let t;this.overlayVisible?this.hide(!0):(o.DomHandler.focus(this.$refs.focusInput),t=this.$refs.focusInput.value,"blank"===this.dropdownMode?this.search(e,"","dropdown"):"current"===this.dropdownMode&&this.search(e,t,"dropdown")),this.$emit("dropdown-click",{originalEvent:e,query:t})},onOptionSelect(e,t,i=!0){const n=this.getOptionValue(t);this.multiple?(this.$refs.focusInput.value="",this.isSelected(t)||this.updateModel(e,[...this.modelValue||[],n])):this.updateModel(e,n),this.$emit("item-select",{originalEvent:e,value:t}),i&&this.hide(!0)},onOptionMouseMove(e,t){this.focusOnHover&&this.changeFocusedOptionIndex(e,t)},onOverlayClick(e){d.default.emit("overlay-click",{originalEvent:e,target:this.$el})},onOverlayKeyDown(e){if("Escape"===e.code)this.onEscapeKey(e)},onArrowDownKey(e){if(!this.overlayVisible)return;const t=-1!==this.focusedOptionIndex?this.findNextOptionIndex(this.focusedOptionIndex):this.findFirstFocusedOptionIndex();this.changeFocusedOptionIndex(e,t),e.preventDefault()},onArrowUpKey(e){if(this.overlayVisible)if(e.altKey)-1!==this.focusedOptionIndex&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.overlayVisible&&this.hide(),e.preventDefault();else{const t=-1!==this.focusedOptionIndex?this.findPrevOptionIndex(this.focusedOptionIndex):this.findLastFocusedOptionIndex();this.changeFocusedOptionIndex(e,t),e.preventDefault()}},onArrowLeftKey(e){const t=e.currentTarget;this.focusedOptionIndex=-1,this.multiple&&(o.ObjectUtils.isEmpty(t.value)&&this.hasSelectedOption?(o.DomHandler.focus(this.$refs.multiContainer),this.focusedMultipleOptionIndex=this.modelValue.length):e.stopPropagation())},onArrowRightKey(e){this.focusedOptionIndex=-1,this.multiple&&e.stopPropagation()},onHomeKey(e){const t=e.currentTarget.value.length;e.shiftKey?e.currentTarget.setSelectionRange(0,t):e.currentTarget.setSelectionRange(0,0),this.focusedOptionIndex=-1,e.preventDefault()},onEndKey(e){const t=e.currentTarget,i=t.value.length;e.shiftKey?e.currentTarget.setSelectionRange(0,i):t.setSelectionRange(i,i),this.focusedOptionIndex=-1,e.preventDefault()},onPageUpKey(e){this.scrollInView(0),e.preventDefault()},onPageDownKey(e){this.scrollInView(this.visibleOptions.length-1),e.preventDefault()},onEnterKey(e){this.overlayVisible?(-1!==this.focusedOptionIndex&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.hide()):this.onArrowDownKey(e),e.preventDefault()},onEscapeKey(e){this.overlayVisible&&this.hide(!0),e.preventDefault()},onTabKey(e){-1!==this.focusedOptionIndex&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.overlayVisible&&this.hide()},onBackspaceKey(e){if(this.multiple){if(o.ObjectUtils.isNotEmpty(this.modelValue)&&!this.$refs.focusInput.value){const t=this.modelValue[this.modelValue.length-1],i=this.modelValue.slice(0,-1);this.$emit("update:modelValue",i),this.$emit("item-unselect",{originalEvent:e,value:t})}e.stopPropagation()}},onArrowLeftKeyOnMultiple(){this.focusedMultipleOptionIndex=this.focusedMultipleOptionIndex<1?0:this.focusedMultipleOptionIndex-1},onArrowRightKeyOnMultiple(){this.focusedMultipleOptionIndex++,this.focusedMultipleOptionIndex>this.modelValue.length-1&&(this.focusedMultipleOptionIndex=-1,o.DomHandler.focus(this.$refs.focusInput))},onBackspaceKeyOnMultiple(e){-1!==this.focusedMultipleOptionIndex&&this.removeOption(e,this.focusedMultipleOptionIndex)},onOverlayEnter(e){o.ZIndexUtils.set("overlay",e,this.$primevue.config.zIndex.overlay),this.alignOverlay()},onOverlayAfterEnter(){this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.$emit("show")},onOverlayLeave(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.$emit("hide"),this.overlay=null},onOverlayAfterLeave(e){o.ZIndexUtils.clear(e)},alignOverlay(){let e=this.multiple?this.$refs.multiContainer:this.$refs.focusInput;"self"===this.appendTo?o.DomHandler.relativePosition(this.overlay,e):(this.overlay.style.minWidth=o.DomHandler.getOuterWidth(e)+"px",o.DomHandler.absolutePosition(this.overlay,e))},bindOutsideClickListener(){this.outsideClickListener||(this.outsideClickListener=e=>{this.overlayVisible&&this.overlay&&this.isOutsideClicked(e)&&this.hide()},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},bindScrollListener(){this.scrollHandler||(this.scrollHandler=new o.ConnectedOverlayScrollHandler(this.$refs.container,(()=>{this.overlayVisible&&this.hide()}))),this.scrollHandler.bindScrollListener()},unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener(){this.resizeListener||(this.resizeListener=()=>{this.overlayVisible&&!o.DomHandler.isTouchDevice()&&this.hide()},window.addEventListener("resize",this.resizeListener))},unbindResizeListener(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},isOutsideClicked(e){return!this.overlay.contains(e.target)&&!this.isInputClicked(e)&&!this.isDropdownClicked(e)},isInputClicked(e){return this.multiple?e.target===this.$refs.multiContainer||this.$refs.multiContainer.contains(e.target):e.target===this.$refs.focusInput},isDropdownClicked(e){return!!this.$refs.dropdownButton&&(e.target===this.$refs.dropdownButton||this.$refs.dropdownButton.$el.contains(e.target))},isOptionMatched(e,t){return this.isValidOption(e)&&this.getOptionLabel(e).toLocaleLowerCase(this.searchLocale)===t.toLocaleLowerCase(this.searchLocale)},isValidOption(e){return e&&!(this.isOptionDisabled(e)||this.isOptionGroup(e))},isValidSelectedOption(e){return this.isValidOption(e)&&this.isSelected(e)},isSelected(e){return o.ObjectUtils.equals(this.modelValue,this.getOptionValue(e),this.equalityKey)},findFirstOptionIndex(){return this.visibleOptions.findIndex((e=>this.isValidOption(e)))},findLastOptionIndex(){return o.ObjectUtils.findLastIndex(this.visibleOptions,(e=>this.isValidOption(e)))},findNextOptionIndex(e){const t=e<this.visibleOptions.length-1?this.visibleOptions.slice(e+1).findIndex((e=>this.isValidOption(e))):-1;return t>-1?t+e+1:e},findPrevOptionIndex(e){const t=e>0?o.ObjectUtils.findLastIndex(this.visibleOptions.slice(0,e),(e=>this.isValidOption(e))):-1;return t>-1?t:e},findSelectedOptionIndex(){return this.hasSelectedOption?this.visibleOptions.findIndex((e=>this.isValidSelectedOption(e))):-1},findFirstFocusedOptionIndex(){const e=this.findSelectedOptionIndex();return e<0?this.findFirstOptionIndex():e},findLastFocusedOptionIndex(){const e=this.findSelectedOptionIndex();return e<0?this.findLastOptionIndex():e},search(e,t,i){null!=t&&("input"===i&&0===t.trim().length||(this.searching=!0,this.$emit("complete",{originalEvent:e,query:t})))},removeOption(e,t){const i=this.modelValue[t],n=this.modelValue.filter(((e,i)=>i!==t)).map((e=>this.getOptionValue(e)));this.updateModel(e,n),this.$emit("item-unselect",{originalEvent:e,value:i}),this.dirty=!0,o.DomHandler.focus(this.$refs.focusInput)},changeFocusedOptionIndex(e,t){this.focusedOptionIndex!==t&&(this.focusedOptionIndex=t,this.scrollInView(),(this.selectOnFocus||this.autoHighlight)&&this.onOptionSelect(e,this.visibleOptions[t],!1))},scrollInView(e=-1){const t=-1!==e?`${this.id}_${e}`:this.focusedOptionId,i=o.DomHandler.findSingle(this.list,`li[id="${t}"]`);i?i.scrollIntoView&&i.scrollIntoView({block:"nearest",inline:"start"}):this.virtualScrollerDisabled||setTimeout((()=>{this.virtualScroller&&this.virtualScroller.scrollToIndex(-1!==e?e:this.focusedOptionIndex)}),0)},autoUpdateModel(){(this.selectOnFocus||this.autoHighlight)&&this.autoOptionFocus&&!this.hasSelectedOption&&(this.focusedOptionIndex=this.findFirstFocusedOptionIndex(),this.onOptionSelect(null,this.visibleOptions[this.focusedOptionIndex],!1))},updateModel(e,t){this.$emit("update:modelValue",t),this.$emit("change",{originalEvent:e,value:t})},flatOptions(e){return(e||[]).reduce(((e,t,i)=>{e.push({optionGroup:t,group:!0,index:i});const n=this.getOptionGroupChildren(t);return n&&n.forEach((t=>e.push(t))),e}),[])},overlayRef(e){this.overlay=e},listRef(e,t){this.list=e,t&&t(e)},virtualScrollerRef(e){this.virtualScroller=e}},computed:{containerClass(){return["p-autocomplete p-component p-inputwrapper",{"p-disabled":this.disabled,"p-focus":this.focused,"p-autocomplete-dd":this.dropdown,"p-autocomplete-multiple":this.multiple,"p-inputwrapper-filled":this.modelValue||o.ObjectUtils.isNotEmpty(this.inputValue),"p-inputwrapper-focus":this.focused,"p-overlay-open":this.overlayVisible}]},inputStyleClass(){return["p-autocomplete-input p-inputtext p-component",this.inputClass,{"p-autocomplete-dd-input":this.dropdown}]},multiContainerClass:()=>["p-autocomplete-multiple-container p-component p-inputtext"],panelStyleClass(){return["p-autocomplete-panel p-component",this.panelClass,{"p-input-filled":"filled"===this.$primevue.config.inputStyle,"p-ripple-disabled":!1===this.$primevue.config.ripple}]},loadingIconClass(){return["p-autocomplete-loader pi-spin",this.loadingIcon]},visibleOptions(){return this.optionGroupLabel?this.flatOptions(this.suggestions):this.suggestions||[]},inputValue(){if(this.modelValue){if("object"==typeof this.modelValue){const e=this.getOptionLabel(this.modelValue);return null!=e?e:this.modelValue}return this.modelValue}return""},hasSelectedOption(){return o.ObjectUtils.isNotEmpty(this.modelValue)},equalityKey(){return this.dataKey},searchResultMessageText(){return o.ObjectUtils.isNotEmpty(this.visibleOptions)&&this.overlayVisible?this.searchMessageText.replaceAll("{0}",this.visibleOptions.length):this.emptySearchMessageText},searchMessageText(){return this.searchMessage||this.$primevue.config.locale.searchMessage||""},emptySearchMessageText(){return this.emptySearchMessage||this.$primevue.config.locale.emptySearchMessage||""},selectionMessageText(){return this.selectionMessage||this.$primevue.config.locale.selectionMessage||""},emptySelectionMessageText(){return this.emptySelectionMessage||this.$primevue.config.locale.emptySelectionMessage||""},selectedMessageText(){return this.hasSelectedOption?this.selectionMessageText.replaceAll("{0}",this.multiple?this.modelValue.length:"1"):this.emptySelectionMessageText},id(){return this.$attrs.id||o.UniqueComponentId()},focusedOptionId(){return-1!==this.focusedOptionIndex?`${this.id}_${this.focusedOptionIndex}`:null},focusedMultipleOptionId(){return-1!==this.focusedMultipleOptionIndex?`${this.id}_multiple_option_${this.focusedMultipleOptionIndex}`:null},ariaSetSize(){return this.visibleOptions.filter((e=>!this.isOptionGroup(e))).length},virtualScrollerDisabled(){return!this.virtualScrollerOptions}},components:{Button:r.default,VirtualScroller:c.default,Portal:p.default},directives:{ripple:u.default}};const f=["id","value","placeholder","tabindex","disabled","aria-label","aria-labelledby","aria-expanded","aria-controls","aria-activedescendant"],m=["aria-activedescendant"],y=["id","aria-label","aria-setsize","aria-posinset"],b={class:"p-autocomplete-token-label"},g=["onClick"],O={class:"p-autocomplete-input-token",role:"option"},v=["id","placeholder","tabindex","disabled","aria-label","aria-labelledby","aria-expanded","aria-controls","aria-activedescendant"],x={role:"status","aria-live":"polite",class:"p-hidden-accessible"},I=["id"],w=["id"],k=["id","aria-label","aria-selected","aria-disabled","aria-setsize","aria-posinset","onClick","onMousemove"],S={role:"status","aria-live":"polite",class:"p-hidden-accessible"};return function(e,t){void 0===t&&(t={});var i=t.insertAt;if(e&&"undefined"!=typeof document){var n=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===i&&n.firstChild?n.insertBefore(o,n.firstChild):n.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}}("\n.p-autocomplete {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    position: relative;\n}\n.p-autocomplete-loader {\n    position: absolute;\n    top: 50%;\n    margin-top: -0.5rem;\n}\n.p-autocomplete-dd .p-autocomplete-input {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n    width: 1%;\n}\n.p-autocomplete-dd .p-autocomplete-input,\n.p-autocomplete-dd .p-autocomplete-multiple-container {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n}\n.p-autocomplete-dd .p-autocomplete-dropdown {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0px;\n}\n.p-autocomplete .p-autocomplete-panel {\n    min-width: 100%;\n}\n.p-autocomplete-panel {\n    position: absolute;\n    overflow: auto;\n    top: 0;\n    left: 0;\n}\n.p-autocomplete-items {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n}\n.p-autocomplete-item {\n    cursor: pointer;\n    white-space: nowrap;\n    position: relative;\n    overflow: hidden;\n}\n.p-autocomplete-multiple-container {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    cursor: text;\n    overflow: hidden;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n}\n.p-autocomplete-token {\n    cursor: default;\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n}\n.p-autocomplete-token-icon {\n    cursor: pointer;\n}\n.p-autocomplete-input-token {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n}\n.p-autocomplete-input-token input {\n    border: 0 none;\n    outline: 0 none;\n    background-color: transparent;\n    margin: 0;\n    padding: 0;\n    -webkit-box-shadow: none;\n            box-shadow: none;\n    border-radius: 0;\n    width: 100%;\n}\n.p-fluid .p-autocomplete {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.p-fluid .p-autocomplete-dd .p-autocomplete-input {\n    width: 1%;\n}\n"),h.render=function(e,t,i,n,o,l){const a=s.resolveComponent("Button"),r=s.resolveComponent("VirtualScroller"),d=s.resolveComponent("Portal"),p=s.resolveDirective("ripple");return s.openBlock(),s.createElementBlock("div",{ref:"container",class:s.normalizeClass(l.containerClass),onClick:t[15]||(t[15]=(...e)=>l.onContainerClick&&l.onContainerClick(...e))},[i.multiple?s.createCommentVNode("",!0):(s.openBlock(),s.createElementBlock("input",s.mergeProps({key:0,ref:"focusInput",id:i.inputId,type:"text",style:i.inputStyle,class:l.inputStyleClass,value:l.inputValue,placeholder:i.placeholder,tabindex:i.disabled?-1:i.tabindex,disabled:i.disabled,autocomplete:"off",role:"combobox","aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,"aria-haspopup":"listbox","aria-autocomplete":"list","aria-expanded":o.overlayVisible,"aria-controls":l.id+"_list","aria-activedescendant":o.focused?l.focusedOptionId:void 0,onFocus:t[0]||(t[0]=(...e)=>l.onFocus&&l.onFocus(...e)),onBlur:t[1]||(t[1]=(...e)=>l.onBlur&&l.onBlur(...e)),onKeydown:t[2]||(t[2]=(...e)=>l.onKeyDown&&l.onKeyDown(...e)),onInput:t[3]||(t[3]=(...e)=>l.onInput&&l.onInput(...e)),onChange:t[4]||(t[4]=(...e)=>l.onChange&&l.onChange(...e))},i.inputProps),null,16,f)),i.multiple?(s.openBlock(),s.createElementBlock("ul",{key:1,ref:"multiContainer",class:s.normalizeClass(l.multiContainerClass),tabindex:"-1",role:"listbox","aria-orientation":"horizontal","aria-activedescendant":o.focused?l.focusedMultipleOptionId:void 0,onFocus:t[10]||(t[10]=(...e)=>l.onMultipleContainerFocus&&l.onMultipleContainerFocus(...e)),onBlur:t[11]||(t[11]=(...e)=>l.onMultipleContainerBlur&&l.onMultipleContainerBlur(...e)),onKeydown:t[12]||(t[12]=(...e)=>l.onMultipleContainerKeyDown&&l.onMultipleContainerKeyDown(...e))},[(s.openBlock(!0),s.createElementBlock(s.Fragment,null,s.renderList(i.modelValue,((t,n)=>(s.openBlock(),s.createElementBlock("li",{key:n,id:l.id+"_multiple_option_"+n,class:s.normalizeClass(["p-autocomplete-token",{"p-focus":o.focusedMultipleOptionIndex===n}]),role:"option","aria-label":l.getOptionLabel(t),"aria-selected":!0,"aria-setsize":i.modelValue.length,"aria-posinset":n+1},[s.renderSlot(e.$slots,"chip",{value:t},(()=>[s.createElementVNode("span",b,s.toDisplayString(l.getOptionLabel(t)),1)])),s.createElementVNode("span",{class:s.normalizeClass(["p-autocomplete-token-icon",i.removeTokenIcon]),onClick:e=>l.removeOption(e,n),"aria-hidden":"true"},null,10,g)],10,y)))),128)),s.createElementVNode("li",O,[s.createElementVNode("input",s.mergeProps({ref:"focusInput",id:i.inputId,type:"text",style:i.inputStyle,class:i.inputClass,placeholder:i.placeholder,tabindex:i.disabled?-1:i.tabindex,disabled:i.disabled,autocomplete:"off",role:"combobox","aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,"aria-haspopup":"listbox","aria-autocomplete":"list","aria-expanded":o.overlayVisible,"aria-controls":l.id+"_list","aria-activedescendant":o.focused?l.focusedOptionId:void 0,onFocus:t[5]||(t[5]=(...e)=>l.onFocus&&l.onFocus(...e)),onBlur:t[6]||(t[6]=(...e)=>l.onBlur&&l.onBlur(...e)),onKeydown:t[7]||(t[7]=(...e)=>l.onKeyDown&&l.onKeyDown(...e)),onInput:t[8]||(t[8]=(...e)=>l.onInput&&l.onInput(...e)),onChange:t[9]||(t[9]=(...e)=>l.onChange&&l.onChange(...e))},i.inputProps),null,16,v)])],42,m)):s.createCommentVNode("",!0),o.searching?(s.openBlock(),s.createElementBlock("i",{key:2,class:s.normalizeClass(l.loadingIconClass),"aria-hidden":"true"},null,2)):s.createCommentVNode("",!0),i.dropdown?(s.openBlock(),s.createBlock(a,{key:3,ref:"dropdownButton",type:"button",icon:i.dropdownIcon,class:s.normalizeClass(["p-autocomplete-dropdown",i.dropdownClass]),tabindex:"-1",disabled:i.disabled,"aria-hidden":"true",onClick:l.onDropdownClick},null,8,["icon","class","disabled","onClick"])):s.createCommentVNode("",!0),s.createElementVNode("span",x,s.toDisplayString(l.searchResultMessageText),1),s.createVNode(d,{appendTo:i.appendTo},{default:s.withCtx((()=>[s.createVNode(s.Transition,{name:"p-connected-overlay",onEnter:l.onOverlayEnter,onAfterEnter:l.onOverlayAfterEnter,onLeave:l.onOverlayLeave,onAfterLeave:l.onOverlayAfterLeave},{default:s.withCtx((()=>[o.overlayVisible?(s.openBlock(),s.createElementBlock("div",s.mergeProps({key:0,ref:l.overlayRef,class:l.panelStyleClass,style:{...i.panelStyle,"max-height":l.virtualScrollerDisabled?i.scrollHeight:""},onClick:t[13]||(t[13]=(...e)=>l.onOverlayClick&&l.onOverlayClick(...e)),onKeydown:t[14]||(t[14]=(...e)=>l.onOverlayKeyDown&&l.onOverlayKeyDown(...e))},i.panelProps),[s.renderSlot(e.$slots,"header",{value:i.modelValue,suggestions:l.visibleOptions}),s.createVNode(r,s.mergeProps({ref:l.virtualScrollerRef},i.virtualScrollerOptions,{style:{height:i.scrollHeight},items:l.visibleOptions,tabindex:-1,disabled:l.virtualScrollerDisabled}),s.createSlots({content:s.withCtx((({styleClass:t,contentRef:i,items:n,getItemOptions:a,contentStyle:r,itemSize:d})=>[s.createElementVNode("ul",{ref:e=>l.listRef(e,i),id:l.id+"_list",class:s.normalizeClass(["p-autocomplete-items",t]),style:s.normalizeStyle(r),role:"listbox"},[(s.openBlock(!0),s.createElementBlock(s.Fragment,null,s.renderList(n,((t,i)=>(s.openBlock(),s.createElementBlock(s.Fragment,{key:l.getOptionRenderKey(t,l.getOptionIndex(i,a))},[l.isOptionGroup(t)?(s.openBlock(),s.createElementBlock("li",{key:0,id:l.id+"_"+l.getOptionIndex(i,a),style:s.normalizeStyle({height:d?d+"px":void 0}),class:"p-autocomplete-item-group",role:"option"},[s.renderSlot(e.$slots,"optiongroup",{option:t.optionGroup,item:t.optionGroup,index:l.getOptionIndex(i,a)},(()=>[s.createTextVNode(s.toDisplayString(l.getOptionGroupLabel(t.optionGroup)),1)]))],12,w)):s.withDirectives((s.openBlock(),s.createElementBlock("li",{key:1,id:l.id+"_"+l.getOptionIndex(i,a),style:s.normalizeStyle({height:d?d+"px":void 0}),class:s.normalizeClass(["p-autocomplete-item",{"p-highlight":l.isSelected(t),"p-focus":o.focusedOptionIndex===l.getOptionIndex(i,a),"p-disabled":l.isOptionDisabled(t)}]),role:"option","aria-label":l.getOptionLabel(t),"aria-selected":l.isSelected(t),"aria-disabled":l.isOptionDisabled(t),"aria-setsize":l.ariaSetSize,"aria-posinset":l.getAriaPosInset(l.getOptionIndex(i,a)),onClick:e=>l.onOptionSelect(e,t),onMousemove:e=>l.onOptionMouseMove(e,l.getOptionIndex(i,a))},[e.$slots.option?s.renderSlot(e.$slots,"option",{key:0,option:t,index:l.getOptionIndex(i,a)},(()=>[s.createTextVNode(s.toDisplayString(l.getOptionLabel(t)),1)])):s.renderSlot(e.$slots,"item",{key:1,item:t,index:l.getOptionIndex(i,a)},(()=>[s.createTextVNode(s.toDisplayString(l.getOptionLabel(t)),1)]))],46,k)),[[p]])],64)))),128))],14,I)])),_:2},[e.$slots.loader?{name:"loader",fn:s.withCtx((({options:t})=>[s.renderSlot(e.$slots,"loader",{options:t})])),key:"0"}:void 0]),1040,["style","items","disabled"]),s.renderSlot(e.$slots,"footer",{value:i.modelValue,suggestions:l.visibleOptions}),s.createElementVNode("span",S,s.toDisplayString(l.selectedMessageText),1)],16)):s.createCommentVNode("",!0)])),_:3},8,["onEnter","onAfterEnter","onLeave","onAfterLeave"])])),_:3},8,["appendTo"])],2)},h}(primevue.button,primevue.overlayeventbus,primevue.portal,primevue.ripple,primevue.utils,primevue.virtualscroller,Vue);
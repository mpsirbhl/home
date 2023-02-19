this.primevue=this.primevue||{},this.primevue.terminal=function(e,t){"use strict";function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var o=n(e),i={name:"Terminal",props:{welcomeMessage:{type:String,default:null},prompt:{type:String,default:null}},data:()=>({commandText:null,commands:[]}),mounted(){o.default.on("response",this.responseListener),this.$refs.input.focus()},updated(){this.$el.scrollTop=this.$el.scrollHeight},beforeUnmount(){o.default.off("response",this.responseListener)},methods:{onClick(){this.$refs.input.focus()},onKeydown(e){"Enter"===e.code&&this.commandText&&(this.commands.push({text:this.commandText}),o.default.emit("command",this.commandText),this.commandText="")},responseListener(e){this.commands[this.commands.length-1].response=e}}};const l={key:0},s={class:"p-terminal-content"},r={class:"p-terminal-prompt"},a={class:"p-terminal-command"},m={class:"p-terminal-response","aria-live":"polite"},c={class:"p-terminal-prompt-container"},p={class:"p-terminal-prompt"};return function(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var o=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css","top"===n&&o.firstChild?o.insertBefore(i,o.firstChild):o.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}}("\n.p-terminal {\n    height: 18rem;\n    overflow: auto;\n}\n.p-terminal-prompt-container {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.p-terminal-input {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n    border: 0 none;\n    background-color: transparent;\n    color: inherit;\n    padding: 0;\n    outline: 0 none;\n}\n.p-terminal-input::-ms-clear {\n    display: none;\n}\n"),i.render=function(e,n,o,i,d,u){return t.openBlock(),t.createElementBlock("div",{class:"p-terminal p-component",onClick:n[2]||(n[2]=(...e)=>u.onClick&&u.onClick(...e))},[o.welcomeMessage?(t.openBlock(),t.createElementBlock("div",l,t.toDisplayString(o.welcomeMessage),1)):t.createCommentVNode("",!0),t.createElementVNode("div",s,[(t.openBlock(!0),t.createElementBlock(t.Fragment,null,t.renderList(d.commands,((e,n)=>(t.openBlock(),t.createElementBlock("div",{key:e.text+n.toString()},[t.createElementVNode("span",r,t.toDisplayString(o.prompt),1),t.createElementVNode("span",a,t.toDisplayString(e.text),1),t.createElementVNode("div",m,t.toDisplayString(e.response),1)])))),128))]),t.createElementVNode("div",c,[t.createElementVNode("span",p,t.toDisplayString(o.prompt),1),t.withDirectives(t.createElementVNode("input",{ref:"input","onUpdate:modelValue":n[0]||(n[0]=e=>d.commandText=e),type:"text",class:"p-terminal-input",autocomplete:"off",onKeydown:n[1]||(n[1]=(...e)=>u.onKeydown&&u.onKeydown(...e))},null,544),[[t.vModelText,d.commandText]])])])},i}(primevue.terminalservice,Vue);
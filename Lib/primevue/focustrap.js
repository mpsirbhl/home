this.primevue=this.primevue||{},this.primevue.focustrap=function(e){"use strict";function t(e){e.$_pfocustrap_mutationobserver&&e.$_pfocustrap_mutationobserver.disconnect(),e.$_pfocustrap_focusinlistener&&e.removeEventListener("focusin",e.$_pfocustrap_focusinlistener)&&(e.$_pfocustrap_focusinlistener=null),e.$_pfocustrap_focusoutlistener&&e.removeEventListener("focusout",e.$_pfocustrap_focusoutlistener)&&(e.$_pfocustrap_focusoutlistener=null)}function o(t){const{currentTarget:o,relatedTarget:s}=t,n=s===o.$_pfocustrap_lasthiddenfocusableelement?e.DomHandler.getFirstFocusableElement(o.parentElement,`:not(.p-hidden-focusable)${o.$_pfocustrap_focusableselector}`):o.$_pfocustrap_lasthiddenfocusableelement;e.DomHandler.focus(n)}function s(t){const{currentTarget:o,relatedTarget:s}=t,n=s===o.$_pfocustrap_firsthiddenfocusableelement?e.DomHandler.getLastFocusableElement(o.parentElement,`:not(.p-hidden-focusable)${o.$_pfocustrap_focusableselector}`):o.$_pfocustrap_firsthiddenfocusableelement;e.DomHandler.focus(n)}const n={mounted(t,n){const{disabled:u}=n.value||{};u||(function(e,t){const{tabIndex:n=0,firstFocusableSelector:u="",lastFocusableSelector:c=""}=t.value||{},r=e=>{const t=document.createElement("span");return t.classList="p-hidden-accessible p-hidden-focusable",t.tabIndex=n,t.setAttribute("aria-hidden","true"),t.setAttribute("role","presentation"),t.addEventListener("focus",e),t},a=r(o),l=r(s);a.$_pfocustrap_lasthiddenfocusableelement=l,a.$_pfocustrap_focusableselector=u,l.$_pfocustrap_firsthiddenfocusableelement=a,l.$_pfocustrap_focusableselector=c,e.prepend(a),e.append(l)}(t,n),function(t,o){const{onFocusIn:s,onFocusOut:n}=o.value||{};t.$_pfocustrap_mutationobserver=new MutationObserver((o=>{o.forEach((o=>{if("childList"===o.type&&!t.contains(document.activeElement)){const t=o=>{const s=e.DomHandler.isFocusableElement(o)?o:e.DomHandler.getFirstFocusableElement(o);return e.ObjectUtils.isNotEmpty(s)?s:t(o.nextSibling)};e.DomHandler.focus(t(o.nextSibling))}}))})),t.$_pfocustrap_mutationobserver.disconnect(),t.$_pfocustrap_mutationobserver.observe(t,{childList:!0}),t.$_pfocustrap_focusinlistener=e=>s&&s(e),t.$_pfocustrap_focusoutlistener=e=>n&&n(e),t.addEventListener("focusin",t.$_pfocustrap_focusinlistener),t.addEventListener("focusout",t.$_pfocustrap_focusoutlistener)}(t,n),function(t,o){const{autoFocusSelector:s="",firstFocusableSelector:n="",autoFocus:u=!1}=o.value||{};let c=e.DomHandler.getFirstFocusableElement(t,`[autofocus]:not(.p-hidden-focusable)${s}`);u&&!c&&(c=e.DomHandler.getFirstFocusableElement(t,`:not(.p-hidden-focusable)${n}`)),e.DomHandler.focus(c)}(t,n))},updated(e,o){const{disabled:s}=o.value||{};s&&t(e)},unmounted(e){t(e)}};return n}(primevue.utils);

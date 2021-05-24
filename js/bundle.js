/*! For license information please see bundle.js.LICENSE.txt */
!function(){var t={702:function(t,e,n){t.exports=function(){"use strict";function t(t){return"function"==typeof t}var e=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},r=0,o=void 0,i=void 0,s=function(t,e){f[r]=t,f[r+1]=e,2===(r+=2)&&(i?i(m):_())};var c="undefined"!=typeof window?window:void 0,a=c||{},l=a.MutationObserver||a.WebKitMutationObserver,u="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),d="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel;function h(){var t=setTimeout;return function(){return t(m,1)}}var f=new Array(1e3);function m(){for(var t=0;t<r;t+=2)(0,f[t])(f[t+1]),f[t]=void 0,f[t+1]=void 0;r=0}var v,p,g,y,_=void 0;function w(t,e){var n=this,r=new this.constructor(E);void 0===r[S]&&O(r);var o=n._state;if(o){var i=arguments[o-1];s((function(){return k(o,r,i,n._result)}))}else j(n,r,t,e);return r}function b(t){if(t&&"object"==typeof t&&t.constructor===this)return t;var e=new this(E);return x(e,t),e}_=u?function(){return process.nextTick(m)}:l?(p=0,g=new l(m),y=document.createTextNode(""),g.observe(y,{characterData:!0}),function(){y.data=p=++p%2}):d?((v=new MessageChannel).port1.onmessage=m,function(){return v.port2.postMessage(0)}):void 0===c?function(){try{var t=Function("return this")().require("vertx");return void 0!==(o=t.runOnLoop||t.runOnContext)?function(){o(m)}:h()}catch(t){return h()}}():h();var S=Math.random().toString(36).substring(2);function E(){}var L=void 0;function A(e,n,r){n.constructor===e.constructor&&r===w&&n.constructor.resolve===b?function(t,e){1===e._state?T(t,e._result):2===e._state?M(t,e._result):j(e,void 0,(function(e){return x(t,e)}),(function(e){return M(t,e)}))}(e,n):void 0===r?T(e,n):t(r)?function(t,e,n){s((function(t){var r=!1,o=function(t,e,n,r){try{t.call(e,n,r)}catch(t){return t}}(n,e,(function(n){r||(r=!0,e!==n?x(t,n):T(t,n))}),(function(e){r||(r=!0,M(t,e))}),t._label);!r&&o&&(r=!0,M(t,o))}),t)}(e,n,r):T(e,n)}function x(t,e){if(t===e)M(t,new TypeError("You cannot resolve a promise with itself"));else if(o=typeof(r=e),null===r||"object"!==o&&"function"!==o)T(t,e);else{var n=void 0;try{n=e.then}catch(e){return void M(t,e)}A(t,e,n)}var r,o}function q(t){t._onerror&&t._onerror(t._result),C(t)}function T(t,e){t._state===L&&(t._result=e,t._state=1,0!==t._subscribers.length&&s(C,t))}function M(t,e){t._state===L&&(t._state=2,t._result=e,s(q,t))}function j(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+1]=n,o[i+2]=r,0===i&&t._state&&s(C,t)}function C(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?k(n,r,o,i):o(i);t._subscribers.length=0}}function k(e,n,r,o){var i=t(r),s=void 0,c=void 0,a=!0;if(i){try{s=r(o)}catch(t){a=!1,c=t}if(n===s)return void M(n,new TypeError("A promises callback cannot return that same promise."))}else s=o;n._state!==L||(i&&a?x(n,s):!1===a?M(n,c):1===e?T(n,s):2===e&&M(n,s))}var I=0;function O(t){t[S]=I++,t._state=void 0,t._result=void 0,t._subscribers=[]}var $=function(){function t(t,n){this._instanceConstructor=t,this.promise=new t(E),this.promise[S]||O(this.promise),e(n)?(this.length=n.length,this._remaining=n.length,this._result=new Array(this.length),0===this.length?T(this.promise,this._result):(this.length=this.length||0,this._enumerate(n),0===this._remaining&&T(this.promise,this._result))):M(this.promise,new Error("Array Methods must be provided an Array"))}return t.prototype._enumerate=function(t){for(var e=0;this._state===L&&e<t.length;e++)this._eachEntry(t[e],e)},t.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===b){var o=void 0,i=void 0,s=!1;try{o=t.then}catch(t){s=!0,i=t}if(o===w&&t._state!==L)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===H){var c=new n(E);s?M(c,i):A(c,t,o),this._willSettleAt(c,e)}else this._willSettleAt(new n((function(e){return e(t)})),e)}else this._willSettleAt(r(t),e)},t.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===L&&(this._remaining--,2===t?M(r,n):this._result[e]=n),0===this._remaining&&T(r,this._result)},t.prototype._willSettleAt=function(t,e){var n=this;j(t,void 0,(function(t){return n._settledAt(1,e,t)}),(function(t){return n._settledAt(2,e,t)}))},t}();var H=function(){function e(t){this[S]=I++,this._result=this._state=void 0,this._subscribers=[],E!==t&&("function"!=typeof t&&function(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}(),this instanceof e?function(t,e){try{e((function(e){x(t,e)}),(function(e){M(t,e)}))}catch(e){M(t,e)}}(this,t):function(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}())}return e.prototype.catch=function(t){return this.then(null,t)},e.prototype.finally=function(e){var n=this,r=n.constructor;return t(e)?n.then((function(t){return r.resolve(e()).then((function(){return t}))}),(function(t){return r.resolve(e()).then((function(){throw t}))})):n.then(e,e)},e}();return H.prototype.then=w,H.all=function(t){return new $(this,t).promise},H.race=function(t){var n=this;return e(t)?new n((function(e,r){for(var o=t.length,i=0;i<o;i++)n.resolve(t[i]).then(e,r)})):new n((function(t,e){return e(new TypeError("You must pass an array to race."))}))},H.resolve=b,H.reject=function(t){var e=new this(E);return M(e,t),e},H._setScheduler=function(t){i=t},H._setAsap=function(t){s=t},H._asap=s,H.polyfill=function(){var t=void 0;if(void 0!==n.g)t=n.g;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var e=t.Promise;if(e){var r=null;try{r=Object.prototype.toString.call(e.resolve())}catch(t){}if("[object Promise]"===r&&!e.cast)return}t.Promise=H},H.Promise=H,H}()},746:function(){window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(t,e){e=e||window;for(var n=0;n<this.length;n++)t.call(e,this[n],n,this)})}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r].call(i.exports,i,i.exports,n),i.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),function(){"use strict";n(746);function t(t,e){document.querySelector(t).classList.add("show"),document.body.style.overflow="hidden",console.log(e),e&&clearInterval(e)}function e(t){document.querySelector(t).classList.remove("show"),document.body.style.overflow=""}n(702).polyfill(),document.addEventListener("DOMContentLoaded",(()=>{const n=setTimeout((()=>t(".modal",n)),5e4);(function(t,e,n,r){const o=document.querySelectorAll(t),i=document.querySelectorAll(e),s=document.querySelector(n);function c(){i.forEach((t=>{t.classList.add("hide"),t.classList.remove("show","fade")})),o.forEach((t=>{t.classList.remove(r)}))}function a(t=0){i[t].classList.add("show","fade"),i[t].classList.remove("hide"),o[t].classList.add(r)}c(),a(),s.addEventListener("click",(e=>{const n=e.target;n&&n.classList.contains(t.slice(1))&&o.forEach(((t,e)=>{n==t&&(c(),a(e))}))}))})(".tabheader__item",".tabcontent",".tabheader","tabheader__item_active"),function(n,r,o){const i=document.querySelectorAll(n),s=document.querySelector(r);i.forEach((e=>{e.addEventListener("click",(()=>t(r,o)))})),s.addEventListener("click",(t=>{t.target!==s&&""!=t.target.getAttribute("data-close")||e(r)})),document.addEventListener("keydown",(t=>{"Escape"===t.code&&s.classList.contains("show")&&e(r)})),window.addEventListener("scroll",(function e(){window.pageYOffset+document.documentElement.clientHeight>=document.documentElement.scrollHeight&&(t(r,o),window.removeEventListener("scroll",e))})),fetch("http://localhost:3000/requests").then((t=>t.json()))}("[data-modal]",".modal",n),function(t,e){function n(t){return t>=0&&t<10?"0"+t:t}!function(t,e){const r=document.querySelector(t),o=r.querySelector("#days"),i=r.querySelector("#hours"),s=r.querySelector("#minutes"),c=r.querySelector("#seconds"),a=setInterval(l,1e3);function l(){const t=function(t){const e=Date.parse(t)-Date.parse(new Date);return{total:e,days:Math.floor(e/864e5),hours:Math.floor(e/36e5%24),minutes:Math.floor(e/1e3/60%60),seconds:Math.floor(e/1e3%60)}}(e);t.total<=0&&(clearInterval(a),t.days=0,t.hours=0,t.minutes=0,t.seconds=0),o.innerHTML=n(t.days),i.innerHTML=n(t.hours),s.innerHTML=n(t.minutes),c.innerHTML=n(t.seconds)}l()}(t,e)}(".timer","2022-04-14"),function(){class t{constructor(t,e,n,r,o,...i){this.name=t,this.img=e,this.subtitle=n,this.descr=r,this.cost=o,this.classes=i,this.container=document.querySelector(".menu .container"),this.transfer=27,this.changeToUAH()}clear(){this.container.querySelectorAll(".menu__item").forEach((function(t){t.remove()})),this.show()}show(){const t=document.createElement("div");t.classList.add("menu__item"),this.classes.forEach((e=>t.classList.add(e))),t.innerHTML=`\n                <img src="${this.img}" alt="${this.name}">\n                <h3 class="menu__item-subtitle">${this.subtitle}</h3>\n                <div class="menu__item-descr">${this.descr}</div>\n                <div class="menu__item-divider"></div>\n                <div class="menu__item-price">\n                    <div class="menu__item-cost">Цена:</div>\n                    <div class="menu__item-total"><span>${this.cost}</span> грн/день</div>\n                </div>`,this.container.appendChild(t)}changeToUAH(){this.cost*=this.transfer}}(async t=>{const e=await fetch(t);if(!e.ok)throw new Error(`${t}: ${e.status}: ${e.statusText}`);return await e.json()})("http://localhost:3000/menu").then((e=>{e.forEach((({altimg:e,img:n,title:r,descr:o,price:i})=>{new t(e,n,r,o,i).show()}))}))}(),function(){const t=document.querySelector(".calculating__result span");let e=localStorage.getItem("sex")?localStorage.getItem("sex"):"female",n=localStorage.getItem("height"),r=localStorage.getItem("weight"),o=localStorage.getItem("age"),i=localStorage.getItem("ratio")?localStorage.getItem("ratio"):1.375;function s(){t.textContent=e&&n&&r&&o&&i?"female"===e?Math.round((447.6+9.2*r+3.1*n-4.3*o)*i):Math.round((88.36+13.4*r+4.8*n-5.7*o)*i):"____"}function c(t,n){const r=document.querySelectorAll(t);r.forEach((t=>{t.getAttribute("data-ratio")?(t.getAttribute("data-ratio")!=i?t.classList.remove(n):t.classList.add(n),t.addEventListener("click",(t=>{i=+t.target.getAttribute("data-ratio"),localStorage.setItem("ratio",i)}))):(t.getAttribute("id")!=e?t.classList.remove(n):t.classList.add(n),t.addEventListener("click",(t=>{e=t.target.getAttribute("id"),localStorage.setItem("sex",e)}))),t.addEventListener("click",(t=>{r.forEach((t=>{t.classList.remove(n)})),t.target.classList.add(n),s()}))}))}function a(t){const e=document.querySelector(t);e.value=localStorage.getItem(e.getAttribute("id")),e.addEventListener("input",(()=>{if(e.value.match(/\D/g))return void(e.style.border="5px solid red");e.style.border="none",localStorage.setItem(e.getAttribute("id"),+e.value);const t={};t[e.getAttribute("id")]=+e.value,n=t.height?t.height:n,r=t.weight?t.weight:r,o=t.age?t.age:o,s()}))}s(),c("#gender div","calculating__choose-item_active"),c(".calculating__choose_big div","calculating__choose-item_active"),a("#height"),a("#weight"),a("#age")}(),function(n,r){function o(n){const o=document.querySelector(".modal__dialog");o.classList.add("hide"),t(".modal",r);const i=document.createElement("div");i.classList.add("modal__dialog"),i.innerHTML=`\n            <div class=modal__content>\n                <div data-close class="modal__close">×</div>\n                <div class="modal__title">${n}</div>\n            </div>\n        `,document.querySelector(".modal").append(i),setTimeout((()=>{i.remove(),o.classList.add("show"),o.classList.remove("hide"),e(".modal")}),4e3)}document.querySelectorAll(n).forEach((t=>{!function(t){t.addEventListener("submit",(e=>{e.preventDefault();const n=document.createElement("img");n.src="img/form/spinner.svg",n.style.cssText="\n                display: block;\n                margin: 0 auto;\n            ",t.insertAdjacentElement("afterend",n);const r=new FormData(t);(async(t,e)=>{const n=await fetch("http://localhost:3000/requests",{method:"POST",headers:{"Content-type":"application/json"},body:e});return await n.json()})(0,JSON.stringify(Object.fromEntries(r.entries()))).then((t=>{o("Спасибо! Вам скоро перезвонит наш менеджер для уточнения и подтверждения заказа."),n.remove()})).catch((()=>{o("Что то пошло не так...")})).finally((()=>{t.reset()}))}))}(t)}))}("form",n),function({container:t,slide:e,nextArrow:n,prevArrow:r,totalCounter:o,currentCounter:i,wrapper:s,field:c}){const a=document.querySelectorAll(e),l=document.querySelector(t),u=document.querySelector(r),d=document.querySelector(n),h=document.querySelector(i),f=document.querySelector(o),m=document.querySelector(s),v=document.querySelector(c),p=window.getComputedStyle(m).width;let g=1;function y(t){return t<10?`0${t}`:t}function _(t){g+=t,g>a.length?g=1:g<1&&(g=a.length),h.textContent=y(g),b.forEach((t=>t.style.opacity=".5")),b[g-1].style.opacity=1;const e=+p.replace(/\D/g,"")*(g-1);v.style.transform=`translateX(-${e}px)`}v.style.width=100*a.length+"%",v.style.display="flex",v.style.transition="0.3s all",m.style.overflow="hidden",a.forEach((t=>t.style.width=p)),l.style.position="relative";const w=document.createElement("ol"),b=[];w.classList.add("carousel-indicators"),w.style.cssText="\n        position: absolute;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        z-index: 15;\n        display: flex;\n        justify-content: center;\n        margin-right: 15%;\n        margin-left: 15%;\n        list-style: none;\n    ",l.append(w);for(let t=0;t<a.length;t++){const e=document.createElement("li");e.setAttribute("data-slide-to",t+1),e.style.cssText="\n            box-sizing: content-box;\n            flex: 0 1 auto;\n            width: 30px;\n            height: 6px;\n            margin-right: 3px;\n            margin-left: 3px;\n            cursor: pointer;\n            background-color: #fff;\n            background-clip: padding-box;\n            border-top: 10px solid transparent;\n            border-bottom: 10px solid transparent;\n            opacity: .5;\n            transition: opacity .6s ease;\n        ",w.append(e),b.push(e),e.addEventListener("click",(t=>{_(t.target.getAttribute("data-slide-to")-g)}))}d.addEventListener("click",(()=>_(1))),u.addEventListener("click",(()=>_(-1))),f.textContent=y(a.length),_(0)}({container:".offer__slider",slide:".offer__slide",nextArrow:".offer__slider-next",prevArrow:".offer__slider-prev",totalCounter:"#total",currentCounter:"#current",wrapper:".offer__slider-wrapper",field:".offer__slider-inner"})}))}()}();
//# sourceMappingURL=bundle.js.map
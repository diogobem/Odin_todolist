(()=>{var e={982:()=>{const e=document.querySelectorAll("[data-modal-target]"),t=document.querySelectorAll("[data-close-button]"),r=document.getElementById("overlay");function a(e){null!=e&&(e.classList.remove("active"),r.classList.remove("active"))}e.forEach((e=>{e.addEventListener("click",(()=>{var t;null!=(t=document.querySelector(e.dataset.modalTarget))&&(t.classList.add("active"),r.classList.add("active"))}))})),t.forEach((e=>{e.addEventListener("click",(()=>{a(e.closest(".modal"))}))})),r.addEventListener("click",(()=>{document.querySelectorAll(".modal.active").forEach((e=>a(e)))}))}},t={};function r(a){var o=t[a];if(void 0!==o)return o.exports;var c=t[a]={exports:{}};return e[a](c,c.exports,r),c.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";r(982)})()})();
!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},t=e.parcelRequire7bc7;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){o[e]=n},e.parcelRequire7bc7=t);var i=t("h6c0i");document.querySelector("form.form").addEventListener("submit",(function(e){e.preventDefault(),function(e){new FormData(e.currentTarget).forEach((function(e,n){r[n]=+e}))}(e),function(){for(var e=1;e<=r.amount;e+=1)a(e,r.delay).then((function(e){var n=e.position,o=e.delay;i.Notify.success("Fulfilled promise ".concat(n," in ").concat(o,"ms"))})).catch((function(e){var n=e.position,o=e.delay;i.Notify.failure("Rejected promise ".concat(n," in ").concat(o,"ms"))})),r.delay+=r.step}()}));var r={};function a(e,n){var o=Math.random()>.3;return new Promise((function(t,i){setTimeout((function(){o?t({position:e,delay:n}):i({position:e,delay:n})}),n)}))}}();
//# sourceMappingURL=03-promises.649228b1.js.map

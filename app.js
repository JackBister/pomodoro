!function(e){var t={};function n(a){if(t[a])return t[a].exports;var i=t[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(a,i,function(t){return e[t]}.bind(null,i));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},a=25,i=5,r={type:"NotStarted"},o=document.getElementById("timer-tomato");if(!o)throw new Error("Fatal: timer-tomato element not found");var u=document.getElementById("timer-tomato-content");if(!u)throw new Error("Fatal: timer-tomato-content element not found");function s(e){var t=Math.floor(e).toString();return 1===t.length?"0"+t:t}function l(e){switch(e.type){case"FocusTime":"FocusTime"!==r.type&&(o.style.backgroundColor="blue"),u.innerText=s(e.remainingTime/60)+":"+s(e.remainingTime%60);break;case"NotStarted":break;case"PauseTime":"PauseTime"!==r.type&&(o.style.backgroundColor="green"),u.innerText=s(e.remainingTime/60)+":"+s(e.remainingTime%60);break;case"Paused":"Paused"!==r.type&&(o.style.backgroundColor="yellow")}r=e}function c(){switch(r.type){case"FocusTime":r.remainingTime-1<=0?l({type:"PauseTime",remainingTime:60*i,intervalHandle:r.intervalHandle}):l(n({},r,{remainingTime:r.remainingTime-1}));break;case"PauseTime":r.remainingTime-1<=0?l({type:"FocusTime",remainingTime:60*a,intervalHandle:r.intervalHandle}):l(n({},r,{remainingTime:r.remainingTime-1}))}}u.addEventListener("click",function(){switch(r.type){case"FocusTime":l({type:"Paused",lastState:r});break;case"NotStarted":l({type:"FocusTime",remainingTime:60*a,intervalHandle:setInterval(c,1e3)});break;case"PauseTime":l({type:"Paused",lastState:r});break;case"Paused":l(r.lastState)}}),document.addEventListener("visibilitychange",function(){if("visible"===document.visibilityState&&"Background"===r.type){switch(r.lastState.type){case"FocusTime":case"PauseTime":var e=(new Date).valueOf()-r.timestamp,t=function(e,t){var n=e.type,r=e.remainingTime;for(;t>0;){if(!(r-t/1e3<=0)){r-=Math.floor(t/1e3);break}t-=1e3*r,n="FocusTime"===n?"PauseTime":"FocusTime",r=("FocusTime"===e.type?60*i:60*a)-Math.floor(t/1e3)}return{type:n,remainingTime:r,intervalHandle:0}}(r.lastState,e);l(n({},t,{intervalHandle:setInterval(c,1e3)}))}l(r.lastState)}else{switch(r.type){case"FocusTime":case"PauseTime":clearInterval(r.intervalHandle)}l({type:"Background",lastState:r,timestamp:(new Date).valueOf()})}})}]);
//# sourceMappingURL=app.js.map
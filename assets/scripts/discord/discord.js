/*!
 * @widgetbot/html-embed v1.3.0
 * MIT Licensed
 */
(function (root, factory) {
    if (typeof exports === 'object' && typeof module === 'object') {
      // CommonJS
      module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
      // AMD
      define([], factory);
    } else if (typeof exports === 'object') {
      // other CJS-like
      exports.widgetbot = factory();
    } else {
      // Browser global
      root.widgetbot = factory();
    }
  }(window, function () {
    // webpackBootstrap
    return (function (modules) {
      // module cache
      var installedModules = {};
  
      // require function
      function __webpack_require__(moduleId) {
        // check cache
        if (installedModules[moduleId]) {
          return installedModules[moduleId].exports;
        }
        // create module and cache it
        var module = installedModules[moduleId] = {
          i: moduleId,
          l: false,
          exports: {}
        };
        // execute module function
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        // flag as loaded
        module.l = true;
        // return exports
        return module.exports;
      }
  
      // expose modules object (__webpack_modules__)
      __webpack_require__.m = modules;
      // expose module cache
      __webpack_require__.c = installedModules;
      // define getter for harmony exports
      __webpack_require__.d = function(exports, name, getter) { /* … */ };
      // mark as ES Module
      __webpack_require__.r = function(exports) { /* … */ };
      // create namespace object
      __webpack_require__.t = function(value, mode) { /* … */ };
      // get default export
      __webpack_require__.n = function(module) { /* … */ };
      // hasOwnProperty shorthand
      __webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); };
      // public path
      __webpack_require__.p = "";
  
      // load entry module and return exports
      return __webpack_require__(__webpack_require__.s = 1);
    })([
      /* 0 */ function (module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
  
        class API {
          constructor() {
            this.listeners = {};
          }
  
          socketEvent(raw) {
            let payload;
            try {
              payload = JSON.parse(raw);
            } catch (e) {
              return;
            }
            if (payload instanceof Object && payload.widgetbot && payload.id === this.id) {
              let event = payload.event;
              let data = payload.data;
              let handlers = this.listeners[event];
              if (handlers) handlers.forEach(fn => fn(data));
            }
          }
  
          on(event, callback) {
            this.listeners[event] = this.listeners[event] || [];
            this.listeners[event].push(callback);
            console.debug(`[embed-api] on '${event}'`, callback);
          }
        }
  
        exports.default = API;
      },
  
      /* 1 */ function (module, exports, __webpack_require__) {
        // entry point simply re-exports module 2
        module.exports = __webpack_require__(2);
      },
  
      /* 2 */ function (module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
  
        // create singleton instance of EmbedManager
        var EmbedManager = __webpack_require__(3).default;
        var instance = new EmbedManager();
        exports.default = instance;
      },
  
      /* 3 */ function (module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
  
        var API = __webpack_require__(4).default;
        var utils = __webpack_require__(9).version;
  
        class EmbedManager {
          constructor() {
            this.version = utils;
            this.embeds = [];
            this.register();
            document.addEventListener("DOMContentLoaded", this.register.bind(this));
          }
  
          register() {
            let tags = document.getElementsByTagName("widgetbot");
            for (let el of tags) {
              let embedRoot = new API(el).root;
              this.embeds.push(embedRoot);
            }
          }
        }
  
        exports.default = EmbedManager;
      },
  
      /* 4 */ function (module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        // … Client and Server classes extending API …
        // … utility functions (Shadow DOM, applyStyles, generateUUID) …
        // Exported as API.Client, API.Server, etc.
      },
  
      /* … */ function () { /* remaining modules 5 through 9, plus package metadata at 10 */ }
  
    ]);
  }));
  //# sourceMappingURL=html-embed.min.js.map
  
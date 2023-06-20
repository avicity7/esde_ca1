/* axios v0.19.0 | (c) 2019 by Matt Zabriskie */
!function(e, t) {
'object'==typeof exports&&'object'==typeof module?module.exports=t():'function'==typeof define&&define.amd?define([], t):'object'==typeof exports?exports.axios=t():e.axios=t();
}(this, function() {
  return function(e) {
    function t(r) {
      if (n[r]) return n[r].exports; const o=n[r]={exports: {}, id: r, loaded: !1}; return e[r].call(o.exports, o, o.exports, t), o.loaded=!0, o.exports;
    } var n={}; return t.m=e, t.c=n, t.p='', t(0);
  }([function(e, t, n) {
    e.exports=n(1);
  }, function(e, t, n) {
    'use strict'; function r(e) {
      const t=new i(e); const n=s(i.prototype.request, t); return o.extend(n, i.prototype, t), o.extend(n, t), n;
    } var o=n(2); var s=n(3); var i=n(5); const a=n(22); const u=n(11); const c=r(u); c.Axios=i, c.create=function(e) {
      return r(a(c.defaults, e));
    }, c.Cancel=n(23), c.CancelToken=n(24), c.isCancel=n(10), c.all=function(e) {
      return Promise.all(e);
    }, c.spread=n(25), e.exports=c, e.exports.default=c;
  }, function(e, t, n) {
    'use strict'; function r(e) {
      return '[object Array]'===j.call(e);
    } function o(e) {
      return '[object ArrayBuffer]'===j.call(e);
    } function s(e) {
      return 'undefined'!=typeof FormData&&e instanceof FormData;
    } function i(e) {
      let t; return t='undefined'!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer;
    } function a(e) {
      return 'string'==typeof e;
    } function u(e) {
      return 'number'==typeof e;
    } function c(e) {
      return 'undefined'==typeof e;
    } function f(e) {
      return null!==e&&'object'==typeof e;
    } function p(e) {
      return '[object Date]'===j.call(e);
    } function d(e) {
      return '[object File]'===j.call(e);
    } function l(e) {
      return '[object Blob]'===j.call(e);
    } function h(e) {
      return '[object Function]'===j.call(e);
    } function m(e) {
      return f(e)&&h(e.pipe);
    } function y(e) {
      return 'undefined'!=typeof URLSearchParams&&e instanceof URLSearchParams;
    } function g(e) {
      return e.replace(/^\s*/, '').replace(/\s*$/, '');
    } function x() {
      return ('undefined'==typeof navigator||'ReactNative'!==navigator.product&&'NativeScript'!==navigator.product&&'NS'!==navigator.product)&&('undefined'!=typeof window&&'undefined'!=typeof document);
    } function v(e, t) {
      if (null!==e&&'undefined'!=typeof e) if ('object'!=typeof e&&(e=[e]), r(e)) for (let n=0, o=e.length; n<o; n++)t.call(null, e[n], n, e); else for (const s in e)Object.prototype.hasOwnProperty.call(e, s)&&t.call(null, e[s], s, e);
    } function w() {
      function e(e, n) {
'object'==typeof t[n]&&'object'==typeof e?t[n]=w(t[n], e):t[n]=e;
      } for (var t={}, n=0, r=arguments.length; n<r; n++)v(arguments[n], e); return t;
    } function b() {
      function e(e, n) {
'object'==typeof t[n]&&'object'==typeof e?t[n]=b(t[n], e):'object'==typeof e?t[n]=b({}, e):t[n]=e;
      } for (var t={}, n=0, r=arguments.length; n<r; n++)v(arguments[n], e); return t;
    } function E(e, t, n) {
      return v(t, function(t, r) {
n&&'function'==typeof t?e[r]=S(t, n):e[r]=t;
      }), e;
    } var S=n(3); const R=n(4); var j=Object.prototype.toString; e.exports={isArray: r, isArrayBuffer: o, isBuffer: R, isFormData: s, isArrayBufferView: i, isString: a, isNumber: u, isObject: f, isUndefined: c, isDate: p, isFile: d, isBlob: l, isFunction: h, isStream: m, isURLSearchParams: y, isStandardBrowserEnv: x, forEach: v, merge: w, deepMerge: b, extend: E, trim: g};
  }, function(e, t) {
    'use strict'; e.exports=function(e, t) {
      return function() {
        for (var n=new Array(arguments.length), r=0; r<n.length; r++)n[r]=arguments[r]; return e.apply(t, n);
      };
    };
  }, function(e, t) {/* !
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */
    e.exports=function(e) {
      return null!=e&&null!=e.constructor&&'function'==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e);
    };
  }, function(e, t, n) {
    'use strict'; function r(e) {
      this.defaults=e, this.interceptors={request: new i, response: new i};
    } const o=n(2); const s=n(6); var i=n(7); const a=n(8); const u=n(22); r.prototype.request=function(e) {
'string'==typeof e?(e=arguments[1]||{}, e.url=arguments[0]):e=e||{}, e=u(this.defaults, e), e.method=e.method?e.method.toLowerCase():'get'; const t=[a, void 0]; let n=Promise.resolve(e); for (this.interceptors.request.forEach(function(e) {
  t.unshift(e.fulfilled, e.rejected);
}), this.interceptors.response.forEach(function(e) {
  t.push(e.fulfilled, e.rejected);
}); t.length;)n=n.then(t.shift(), t.shift()); return n;
    }, r.prototype.getUri=function(e) {
      return e=u(this.defaults, e), s(e.url, e.params, e.paramsSerializer).replace(/^\?/, '');
    }, o.forEach(['delete', 'get', 'head', 'options'], function(e) {
      r.prototype[e]=function(t, n) {
        return this.request(o.merge(n||{}, {method: e, url: t}));
      };
    }), o.forEach(['post', 'put', 'patch'], function(e) {
      r.prototype[e]=function(t, n, r) {
        return this.request(o.merge(r||{}, {method: e, url: t, data: n}));
      };
    }), e.exports=r;
  }, function(e, t, n) {
    'use strict'; function r(e) {
      return encodeURIComponent(e).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
    } const o=n(2); e.exports=function(e, t, n) {
      if (!t) return e; let s; if (n)s=n(t); else if (o.isURLSearchParams(t))s=t.toString(); else {
        const i=[]; o.forEach(t, function(e, t) {
          null!==e&&'undefined'!=typeof e&&(o.isArray(e)?t+='[]':e=[e], o.forEach(e, function(e) {
o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)), i.push(r(t)+'='+r(e));
          }));
        }), s=i.join('&');
      } if (s) {
        const a=e.indexOf('#'); a!==-1&&(e=e.slice(0, a)), e+=(e.indexOf('?')===-1?'?':'&')+s;
      } return e;
    };
  }, function(e, t, n) {
    'use strict'; function r() {
      this.handlers=[];
    } const o=n(2); r.prototype.use=function(e, t) {
      return this.handlers.push({fulfilled: e, rejected: t}), this.handlers.length-1;
    }, r.prototype.eject=function(e) {
      this.handlers[e]&&(this.handlers[e]=null);
    }, r.prototype.forEach=function(e) {
      o.forEach(this.handlers, function(t) {
        null!==t&&e(t);
      });
    }, e.exports=r;
  }, function(e, t, n) {
    'use strict'; function r(e) {
      e.cancelToken&&e.cancelToken.throwIfRequested();
    } const o=n(2); const s=n(9); const i=n(10); const a=n(11); const u=n(20); const c=n(21); e.exports=function(e) {
      r(e), e.baseURL&&!u(e.url)&&(e.url=c(e.baseURL, e.url)), e.headers=e.headers||{}, e.data=s(e.data, e.headers, e.transformRequest), e.headers=o.merge(e.headers.common||{}, e.headers[e.method]||{}, e.headers||{}), o.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function(t) {
        delete e.headers[t];
      }); const t=e.adapter||a.adapter; return t(e).then(function(t) {
        return r(e), t.data=s(t.data, t.headers, e.transformResponse), t;
      }, function(t) {
        return i(t)||(r(e), t&&t.response&&(t.response.data=s(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t);
      });
    };
  }, function(e, t, n) {
    'use strict'; const r=n(2); e.exports=function(e, t, n) {
      return r.forEach(n, function(n) {
        e=n(e, t);
      }), e;
    };
  }, function(e, t) {
    'use strict'; e.exports=function(e) {
      return !(!e||!e.__CANCEL__);
    };
  }, function(e, t, n) {
    'use strict'; function r(e, t) {
      !s.isUndefined(e)&&s.isUndefined(e['Content-Type'])&&(e['Content-Type']=t);
    } function o() {
      let e; return 'undefined'!=typeof process&&'[object process]'===Object.prototype.toString.call(process)?e=n(13):'undefined'!=typeof XMLHttpRequest&&(e=n(13)), e;
    } var s=n(2); const i=n(12); const a={'Content-Type': 'application/x-www-form-urlencoded'}; const u={adapter: o(), transformRequest: [function(e, t) {
      return i(t, 'Accept'), i(t, 'Content-Type'), s.isFormData(e)||s.isArrayBuffer(e)||s.isBuffer(e)||s.isStream(e)||s.isFile(e)||s.isBlob(e)?e:s.isArrayBufferView(e)?e.buffer:s.isURLSearchParams(e)?(r(t, 'application/x-www-form-urlencoded;charset=utf-8'), e.toString()):s.isObject(e)?(r(t, 'application/json;charset=utf-8'), JSON.stringify(e)):e;
    }], transformResponse: [function(e) {
      if ('string'==typeof e) {
        try {
          e=JSON.parse(e);
        } catch (e) {}
      } return e;
    }], timeout: 0, xsrfCookieName: 'XSRF-TOKEN', xsrfHeaderName: 'X-XSRF-TOKEN', maxContentLength: -1, validateStatus: function(e) {
      return e>=200&&e<300;
    }}; u.headers={common: {Accept: 'application/json, text/plain, */*'}}, s.forEach(['delete', 'get', 'head'], function(e) {
      u.headers[e]={};
    }), s.forEach(['post', 'put', 'patch'], function(e) {
      u.headers[e]=s.merge(a);
    }), e.exports=u;
  }, function(e, t, n) {
    'use strict'; const r=n(2); e.exports=function(e, t) {
      r.forEach(e, function(n, r) {
        r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n, delete e[r]);
      });
    };
  }, function(e, t, n) {
    'use strict'; const r=n(2); const o=n(14); const s=n(6); const i=n(17); const a=n(18); const u=n(15); e.exports=function(e) {
      return new Promise(function(t, c) {
        let f=e.data; const p=e.headers; r.isFormData(f)&&delete p['Content-Type']; let d=new XMLHttpRequest; if (e.auth) {
          const l=e.auth.username||''; const h=e.auth.password||''; p.Authorization='Basic '+btoa(l+':'+h);
        } if (d.open(e.method.toUpperCase(), s(e.url, e.params, e.paramsSerializer), !0), d.timeout=e.timeout, d.onreadystatechange=function() {
          if (d&&4===d.readyState&&(0!==d.status||d.responseURL&&0===d.responseURL.indexOf('file:'))) {
            const n='getAllResponseHeaders'in d?i(d.getAllResponseHeaders()):null; const r=e.responseType&&'text'!==e.responseType?d.response:d.responseText; const s={data: r, status: d.status, statusText: d.statusText, headers: n, config: e, request: d}; o(t, c, s), d=null;
          }
        }, d.onabort=function() {
          d&&(c(u('Request aborted', e, 'ECONNABORTED', d)), d=null);
        }, d.onerror=function() {
          c(u('Network Error', e, null, d)), d=null;
        }, d.ontimeout=function() {
          c(u('timeout of '+e.timeout+'ms exceeded', e, 'ECONNABORTED', d)), d=null;
        }, r.isStandardBrowserEnv()) {
          const m=n(19); const y=(e.withCredentials||a(e.url))&&e.xsrfCookieName?m.read(e.xsrfCookieName):void 0; y&&(p[e.xsrfHeaderName]=y);
        } if ('setRequestHeader'in d&&r.forEach(p, function(e, t) {
'undefined'==typeof f&&'content-type'===t.toLowerCase()?delete p[t]:d.setRequestHeader(t, e);
        }), e.withCredentials&&(d.withCredentials=!0), e.responseType) {
          try {
            d.responseType=e.responseType;
          } catch (t) {
            if ('json'!==e.responseType) throw t;
          }
        }'function'==typeof e.onDownloadProgress&&d.addEventListener('progress', e.onDownloadProgress), 'function'==typeof e.onUploadProgress&&d.upload&&d.upload.addEventListener('progress', e.onUploadProgress), e.cancelToken&&e.cancelToken.promise.then(function(e) {
          d&&(d.abort(), c(e), d=null);
        }), void 0===f&&(f=null), d.send(f);
      });
    };
  }, function(e, t, n) {
    'use strict'; const r=n(15); e.exports=function(e, t, n) {
      const o=n.config.validateStatus; !o||o(n.status)?e(n):t(r('Request failed with status code '+n.status, n.config, null, n.request, n));
    };
  }, function(e, t, n) {
    'use strict'; const r=n(16); e.exports=function(e, t, n, o, s) {
      const i=new Error(e); return r(i, t, n, o, s);
    };
  }, function(e, t) {
    'use strict'; e.exports=function(e, t, n, r, o) {
      return e.config=t, n&&(e.code=n), e.request=r, e.response=o, e.isAxiosError=!0, e.toJSON=function() {
        return {message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: this.config, code: this.code};
      }, e;
    };
  }, function(e, t, n) {
    'use strict'; const r=n(2); const o=['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent']; e.exports=function(e) {
      let t; let n; let s; const i={}; return e?(r.forEach(e.split('\n'), function(e) {
        if (s=e.indexOf(':'), t=r.trim(e.substr(0, s)).toLowerCase(), n=r.trim(e.substr(s+1)), t) {
          if (i[t]&&o.indexOf(t)>=0) return; 'set-cookie'===t?i[t]=(i[t]?i[t]:[]).concat([n]):i[t]=i[t]?i[t]+', '+n:n;
        }
      }), i):i;
    };
  }, function(e, t, n) {
    'use strict'; const r=n(2); e.exports=r.isStandardBrowserEnv()?function() {
      function e(e) {
        let t=e; return n&&(o.setAttribute('href', t), t=o.href), o.setAttribute('href', t), {href: o.href, protocol: o.protocol?o.protocol.replace(/:$/, ''):'', host: o.host, search: o.search?o.search.replace(/^\?/, ''):'', hash: o.hash?o.hash.replace(/^#/, ''):'', hostname: o.hostname, port: o.port, pathname: '/'===o.pathname.charAt(0)?o.pathname:'/'+o.pathname};
      } let t; var n=/(msie|trident)/i.test(navigator.userAgent); var o=document.createElement('a'); return t=e(window.location.href), function(n) {
        const o=r.isString(n)?e(n):n; return o.protocol===t.protocol&&o.host===t.host;
      };
    }():function() {
      return function() {
        return !0;
      };
    }();
  }, function(e, t, n) {
    'use strict'; const r=n(2); e.exports=r.isStandardBrowserEnv()?function() {
      return {write: function(e, t, n, o, s, i) {
        const a=[]; a.push(e+'='+encodeURIComponent(t)), r.isNumber(n)&&a.push('expires='+new Date(n).toGMTString()), r.isString(o)&&a.push('path='+o), r.isString(s)&&a.push('domain='+s), i===!0&&a.push('secure'), document.cookie=a.join('; ');
      }, read: function(e) {
        const t=document.cookie.match(new RegExp('(^|;\\s*)('+e+')=([^;]*)')); return t?decodeURIComponent(t[3]):null;
      }, remove: function(e) {
        this.write(e, '', Date.now()-864e5);
      }};
    }():function() {
      return {write: function() {}, read: function() {
        return null;
      }, remove: function() {}};
    }();
  }, function(e, t) {
    'use strict'; e.exports=function(e) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
    };
  }, function(e, t) {
    'use strict'; e.exports=function(e, t) {
      return t?e.replace(/\/+$/, '')+'/'+t.replace(/^\/+/, ''):e;
    };
  }, function(e, t, n) {
    'use strict'; const r=n(2); e.exports=function(e, t) {
      t=t||{}; const n={}; return r.forEach(['url', 'method', 'params', 'data'], function(e) {
        'undefined'!=typeof t[e]&&(n[e]=t[e]);
      }), r.forEach(['headers', 'auth', 'proxy'], function(o) {
r.isObject(t[o])?n[o]=r.deepMerge(e[o], t[o]):'undefined'!=typeof t[o]?n[o]=t[o]:r.isObject(e[o])?n[o]=r.deepMerge(e[o]):'undefined'!=typeof e[o]&&(n[o]=e[o]);
      }), r.forEach(['baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath'], function(r) {
'undefined'!=typeof t[r]?n[r]=t[r]:'undefined'!=typeof e[r]&&(n[r]=e[r]);
      }), n;
    };
  }, function(e, t) {
    'use strict'; function n(e) {
      this.message=e;
    }n.prototype.toString=function() {
      return 'Cancel'+(this.message?': '+this.message:'');
    }, n.prototype.__CANCEL__=!0, e.exports=n;
  }, function(e, t, n) {
    'use strict'; function r(e) {
      if ('function'!=typeof e) throw new TypeError('executor must be a function.'); let t; this.promise=new Promise(function(e) {
        t=e;
      }); const n=this; e(function(e) {
        n.reason||(n.reason=new o(e), t(n.reason));
      });
    } var o=n(23); r.prototype.throwIfRequested=function() {
      if (this.reason) throw this.reason;
    }, r.source=function() {
      let e; const t=new r(function(t) {
        e=t;
      }); return {token: t, cancel: e};
    }, e.exports=r;
  }, function(e, t) {
    'use strict'; e.exports=function(e) {
      return function(t) {
        return e.apply(null, t);
      };
    };
  }]);
});
// # sourceMappingURL=axios.min.map

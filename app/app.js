'use strict'
  ; (function (win) {
    requirejs.onError = function (err) {
      console.log(err)
      console.log('modules: ' + err.requireModules)
    }

    requirejs.config({

      map: {
        '*': {
          css: '../libs/require-css.min.js',
        },
      },
      baseUrl: '/',
      waitSeconds: 15, //超时时间
      paths: {
        "dragula":'libs/dragula/dragula.min',
        "menu-service":'/libs/menu-service',
      },
      shim: {
       
      },
    })

    require([], function () {

  

      win.nomapp = new nomui.App({
        viewsDir: '/app',
        defaultPath: '_layout',
        isFixedLayout: false,

      })

    })

  })(window)

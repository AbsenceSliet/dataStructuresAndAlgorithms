(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        (global = global || self, global.Vue = factory());
})(this, function () {
    //工具方法
    /**
     * Query an element selector if it's not an element already.
     */
    var inBrowser = typeof window !== 'undefined';

    var UA = inBrowser && window.navigator.userAgent.toLowerCase();

    function query(el) {
        if (typeof el === 'string') {
            var selected = document.querySelector(el);
            if (!selected) {
                warn(
                    'Cannot find element: ' + el
                );
                return document.createElement('div')
            }
            return selected
        } else {
            return el
        }
    }
    // Vue 方法 初始化
    function Vue(options) {
        // bixu 把 vue 当作构造函数 不能把它 当成方法调用
        if (!(this instanceof Vue)) {
            warn('Vue is a constructor and should be called with the `new` keyword');
        }
        console.log(options, 'options')
        this._init(options);
    }
    initMixin(Vue);
    var uid$3 = 0;

    function initMixin(Vue) {
        Vue.prototype._init = function (options) {
            var vm = this;
            // a uid
            vm._uid = uid$3++;
            // a flag to avoid this being observed
            vm._isVue = true;
            // expose real self
            vm._self = vm;
            console.log(vm)
            // 判断是否是组建 初始化 
            if (options && options._isComponent) {
                // optimize internal component instantiation
                // since dynamic options merging is pretty slow, and none of the
                // internal component options needs special treatment.
                initInternalComponent(vm, options);
            } else {
                vm.$options = options;
            }
            if (vm.$options.el) {
                vm.$mount(vm.$options.el);
            }
        }
    }
    Vue.prototype.$mount = function (
        el,
        hydrating
    ) {
        el = el && inBrowser ? query(el) : undefined;
        // return mountComponent(this, el, hydrating)
    };
    var mount = Vue.prototype.$mount;
    Vue.prototype.$mount = function (
        el,
        hydrating
    ) {
        el = el && query(el);
        console.log(el, 'el---->')
        /* istanbul ignore if */
        if (el === document.body || el === document.documentElement) {
            warn(
                "Do not mount Vue to <html> or <body> - mount to normal elements instead."
            );
            return this
        }

        // var options = this.$options;
        return mount.call(this, el, hydrating)
    }

    function createCompileToFunctionFn(compile) {

    }

    function createCompilerCreator(baseCompile) {

    }
    return Vue;
})
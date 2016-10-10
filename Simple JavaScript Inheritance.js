/**
 * Created by wtgzczz on 2016/10/10.
 */
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
    // The base Class implementation (does nothing)
    this.Class = function(){};

    // Create a new Class that inherits from this class
    Class.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" &&
            typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function(name, fn){
                    return function() {
                        var tmp = this._super;

                        // Add a new ._super() method that is the same method
                        // but on the super-class
                        this._super = _super[name];

                        // The method only need to be bound temporarily, so we
                        // remove it when we're done executing
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];
        }

        // The dummy class constructor
        function Class() {
            // All construction is actually done in the init method
            if ( !initializing && this.init )
                this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.constructor = Class;

        // And make this class extendable
        Class.extend = arguments.callee;

        return Class;
    };
})();

/*分页组件*/
(function($){

    //"use strict";

    $.Page = Class.extend({
        _totalPage: 0,
        _start: 0,
        _end: 0,
        _show: {
            first : true,
            prev: true,
            numble: true,
            next: true,
            end: true
        },

        opt: {
            id: '',
            funName: '',
            curPage: 1,
            total: 1,
            pageSize: 20,
            align: 'center',
            type: 'normal',
            style: 'default'
        },

        init: function(options){
            this.opt = $.extend({}, this.opt, options || {});

            this.opt.pageSize = parseInt(this.opt.pageSize,10) > 0 ? parseInt(this.opt.pageSize,10) : 10;

            if(parseInt(this.opt.total,10) == 0 || parseInt(this.opt.total) == 'NaN'){
                this.opt.total = 1;
            };
            this._totalPage = Math.ceil(this.opt.total/this.opt.pageSize);
            this.opt.curPage = parseInt(this.opt.curPage) > 0 ? parseInt(this.opt.curPage) : 1;

            if(this.opt.curPage > this._totalPage){
                this.opt.curPage = this._totalPage;
            }

            this._setShow();
            this._setPage();
            this._template();
        },

        _setShow: function(){
            var opt = this.opt;
            //设置显示项
            if(opt.type == "simple"){
                this._show = {
                    firest : false,
                    prev: true,
                    numble: false,
                    next: true,
                    end: false
                }
            }
            if(opt.type == "numble"){
                this._show = {
                    firest : false,
                    prev: false,
                    numble: true,
                    next: false,
                    end: false
                }
            }
        },

        _setPage: function(){
            var opt = this.opt;
            var totalPage = this._totalPage;

            //设置起始页码
            if (this._totalPage > 10) {
                if ((this.opt.curPage - 5) > 0 && this.opt.curPage < totalPage - 5) {
                    this._start = opt.curPage - 5;
                    this._end = opt.curPage + 5;
                }else if (this.opt.curPage >= (this._totalPage - 5)) {
                    this._start = totalPage - 10;
                    this._end = totalPage;
                }else {
                    this._start = 1;
                    this._end = 10;
                }
            }else {
                this._start = 1;
                this._end = this._totalPage;
            }
        },

        //拼接html代码
        _template: function(){
            var opt = this.opt;
            var show = this._show;
            var totalPage = this._totalPage;

            if(opt.style != "" && opt.style != "default"){
                var output = '<div class="g_page_' + opt.style + '" style="text-align: ' + opt.align + '">';
            }else{
                var output = '<div class="g_page" style="text-align: ' + opt.align + '">';
            }

            //首页控制
            if(show.first){
                if(opt.curPage > 1){
                    output += '<a href="javascript:'+opt.funName+'(1);" title="首页" class="page_first">«</a>';
                }else{
                    output += '<a class="g_page_disabled page_first">«</a>';
                }
            }

            //上一页菜单控制
            if(show.prev){
                var text = '‹';
                if(opt.type == "simple"){
                    text = "上一页"
                }
                if(opt.curPage > 1){
                    output += '<a href="javascript:'+opt.funName+'(' + (opt.curPage-1) + ');" title="上一页" class="page_prev">' + text + '</a>';
                }else{
                    output += '<a class="g_page_disabled page_prev">' + text + '</a>';
                }
            }

            //页码展示
            if(show.numble){
                for (var i = this._start; i <= this._end; i++) {
                    if (i == opt.curPage) {
                        output += '<a href="javascript:;" class="g_page_cur">' + opt.curPage + '</a>';
                    }else {
                        output += '<a href="javascript:'+opt.funName+'(' + i + ');">' + i + '</a>';
                    }
                }
            }

            //下一页菜单控制
            if(show.next){
                var text = '›';
                if(opt.type == "simple"){
                    text = "下一页"
                }
                if(totalPage > 1 && opt.curPage < totalPage){
                    output += '<a title="下一页" href="javascript:' + opt.funName + '(' + (opt.curPage + 1) + ');" class="page_next">' + text + '</a>';
                }else{
                    output += '<a class="g_page_disabled page_next">' + text + '</a>';
                }
            }

            //最后页控制
            if(show.end){
                if(opt.curPage < totalPage){
                    output += '<a title="末页" href="javascript:' + opt.funName + '(' + totalPage + ');" class="page_end">»</a>';
                }else{
                    output += '<a class="g_page_disabled page_end">»</a>';
                }
            }
            output += '</div>';
            $("#" + opt.id).html(output);
        }
    })

    $.page = function(options){
        return new $.Page(options);
    };
})(jQuery);
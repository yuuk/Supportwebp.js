/**
 * [Supportwebp 判断浏览器是否支持webp]
 * @param {[Object]} opts [参数选项]
 * @author yukai
 * @date 2017-03-16
 */
function Supportwebp(opts) {
    this.webpSrc = 'data:image/webp;base64,UklGRiYAAABXRUJQVlA4IBoAAAAwAQCdASoBAAEAAAAMJaQAA3AA/v89WAAAAA=='; // 1px webp占位图
    this.ele = opts.ele || 'js-webp'; // 选择元素
    this.attr = opts.attr || 'data-original'; // 需要替换的图片属性
    this.yes = opts.yes || function() {}; // 支持webp的回调
    this.no = opts.no || function() {}; // 不支持webp的回调
    this.init();
}
Supportwebp.prototype = {
    // 实现选择器
    $$: function(selector) {
        selector = selector.replace(/(^\s*)|(\s*$)/g, '');
        if (selector.split(" ").length >= 1) {
            // ID选择器
            if (/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/.test(selector)) {
                return document.getElementById(selector.slice(1, selector.length));
            }
            // tagName选择器
            else if (/^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/.test(selector)) {
                return document.getElementsByTagName(selector);
            }
            // class选择器
            else if (/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/.test(selector)) {
                if (document.getElementsByClassName) {
                    return document.getElementsByClassName(selector.slice(1, selector.length));
                } else {
                    var nodes = document.getElementsByTagName("*"),
                        nodeArr = [];
                    for (var i = 0; i < nodes.length; i++) {
                        var classStr = nodes[i].className;
                        if (classStr) {
                            var classArr = classStr.split(" ");
                            for (var j = 0; j < classArr.length; j++) {
                                if (selector == classArr[j]) {
                                    nodeArr.push(nodes[i]);
                                }
                            }
                        }
                    }
                    return nodeArr;
                }
            }
            // 属性选择器
            else if (/^\[[A-Za-z0-9_-\S]+\]$/.test(selector)) {
                selector = selector.slice(1, selector.length - 1);
                var nodes = document.getElementsByTagName("*"),
                    selectorArr = selector.split("="),
                    attr = selectorArr[0],
                    value = selectorArr[1].replace(/(^'|")|('|"$)/g, ""),
                    nodeArr = [];
                if (value) {
                    for (var i = 0; i < nodes.length; i++) {
                        if (nodes[i].getAttribute(attr) == value) {
                            nodeArr.push(nodes[i]);
                        }
                    }
                } else {
                    for (var i = 0; i < nodes.length; i++) {
                        if (nodes[i].getAttribute(attr)) {
                            nodeArr.push(nodes[i]);
                        }
                    }
                }
                return nodeArr;
            } else {
                return null;
            }
        }
    },
    // 检测
    check: function() {
        var _this = this,
            WebP = new Image();
        WebP.onload = WebP.onerror = function() {};
        WebP.src = this.webpSrc;
        return WebP.height == 1;
    },
    // 替换属性
    repeaceAttr: function(ele) {
        if (ele && ele.getAttribute(this.attr)) {
            ele.setAttribute(this.attr, ele.getAttribute(this.attr).replace(/(\.jpg|\.png)$/, '$1.webp'));
        }
    },
    // 初始化
    init: function() {
        var _this = this,
            eles = this.$$(this.ele);
        if (this.check()) {
            if (eles && eles.length != undefined) {
                for (var i = 0; i < eles.length; i++) {
                    _this.repeaceAttr(eles[i]);
                }
            } else {
                _this.repeaceAttr(eles);
            }
            // yes callback
            this.yes(eles)
        } else {
            // no callback
            this.no(eles)
        }
    }
};

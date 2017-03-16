# Supportwebp.js
Supportwebp webp兼容处理JS，原生javascript编写，内部实现了几种常用的元素选择器，兼容IE浏览器。

# 参数说明
|  参数名   |  说明   |  默认值   |
| --- | --- | --- |
|  ele   |  元素选择器   |  .js-webp   |
|  attr   |  需要被替换的属性   |  data-original   |
|  yes   |  支持webp的回调   |   Function   |
|  no   |   不支持webp的回调  |   Function   |

# 调用方法
``` javascript
new Supportwebp({
    ele: '[class="js-webp"]', // 选择元素
    attr: 'src', // 替换图片的属性
    // 成功回调
    yes: function(ele) {
        console.log(ele);
    },
    // 失败回调
    no: function(ele) {
        console.log(ele);
    }
});
```

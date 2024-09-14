# Module HTML Loader
[![页面浏览量计数](https://badges.toozhao.com/badges/01J7R020C5F3JE1P73WH453YCW/green.svg)](/) 
[![查看次数起始时间](https://img.shields.io/badge/查看次数统计起始于-2024%2F09%2F14-1?style=flat-square)](/)
[![233](https://www.xzt.plus/track?id=module-loader)](/) 

中文 | [英文](/)

`Module HTML Loader` 是一个简单的 JavaScript 工具，允许你在 HTML 页面中动态加载模块化的 HTML、CSS 和 JavaScript 文件。它支持加载子模块以及根据需要自动加载对应的 CSS 和 JS 文件，使得页面模块化变得更加简单。

## 功能

- **动态加载 HTML 模块**：支持指定的 HTML 文件或子模块（通过 `id` 匹配）。
- **自动加载 CSS 和 JS**：无需手动引用，指定文件名即可加载，支持文件后缀的可选性。
- **模块化结构清晰**：通过自定义属性来轻松管理模块。
- **错误提示**：加载错误时仅在控制台中提示，不影响页面显示。

## 安装与使用

### 1. 引入 `module-loader.js`

首先，你需要在 HTML 页面中引用 `module-loader.js`，你可以选择使用在线链接或者本地化引用：

- **在线引用（带统计）**：
> 如果你向让我们知道你使用了此js，请使用此统计版js
- 
  ```html
  <script src="https://cdn.jsdelivr.net/gh/LoosePrince/module-html@main/module-loader-online.js" defer></script>
  ```

- **在线引用（无统计）**：
  
  ```html
  <script src="https://cdn.jsdelivr.net/gh/LoosePrince/module-html@main/module-loader.js" defer></script>
  ```
- **下载引用**：
  
  ```html
  <script src="module-loader.js" defer></script>
  ```

### 2. 在 HTML 页面中使用

在页面中添加一个带有 `module-html` 属性的 `div` 元素，指定要加载的模块文件。你可以选择是否加载对应的 CSS 和 JS 文件（你也可以将 CSS 和 JS 写在 HTML 中，但是不推荐如此）。

#### 示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>模块化加载示例</title>
  <!-- 引入 module-loader.js -->
  <script src="https://cdn.jsdelivr.net/gh/LoosePrince/module-html@main/module-loader.js" defer></script>
</head>
<body>

  <!-- 加载 HTML 模块 -->
  <div module-html="module.moduleid" module-css="module" module-js="module"></div>

  <h1>欢迎来到主页</h1>

</body>
</html>
```

在上面的示例中：

- `module-html="module.moduleid"`：表示加载 `module.html` 文件中的 `id="moduleid"` 的子模块内容。如果 `moduleid` 省略，则加载整个 HTML 文件。
- `module-css="module"`：表示加载 `module.css` 文件。文件后缀 `.css` 可选。
- `module-js="module"`：表示加载 `module.js` 文件。文件后缀 `.js` 可选。

### 3. 创建模块文件

#### HTML 模块（`module.html`）

```html
<div id="moduleid" class="module">
    <h2>这是第一个模块</h2>
    <p>这是模块ID为 moduleid 的内容部分。</p>
</div>

<div id="moduleid2" class="module">
    <h2>这是第二个模块</h2>
    <p>这是模块ID为 moduleid2 的内容部分。</p>
</div>
```

#### CSS 模块（`module.css`）

```css
.module {
  background-color: lightblue;
  padding: 10px;
  border: 1px solid #000;
}
```

#### JS 模块（`module.js`）

```javascript
document.querySelectorAll('.module').forEach(module => {
  console.log('模块已经加载: ', module);
});
```

#### 一体化 HTML 模块（`module.html`）

```html
<div id="moduleid" class="module">
    <h2>这是模块 1</h2>
    <p>这是模块 1 的内容部分。</p>
    <style>
        .module {
            background-color: lightblue;
            padding: 10px;
            border: 1px solid #000;
        }
    </style>
    <script>
        document.querySelectorAll('#moduleid').forEach(module => {
            console.log('模块已经加载: ', module);
        });
    </script>
</div>
<div id="moduleid2" class="module">
    <h2>这是模块 2</h2>
    <p>这是模块 2 的内容部分。</p>
    <style>
        .module {
            background-color: lightblue;
            padding: 10px;
            border: 1px solid #000;
        }
    </style>
    <script>
        document.querySelectorAll('#moduleid2').forEach(module => {
            console.log('模块 2 已经加载: ', module);
        });
    </script>
</div>
<div id="moduleid3" class="module">
    <h2>这是模块 3</h2>
    <p>这是模块 3 的内容部分。</p>
    <!-- 不支持外部 css -->
    <script src="module.js"></script>
</div>
```

### 4. 使用说明

- **加载 HTML 子模块**：通过 `module-html` 属性指定 HTML 文件。指定特定的子模块，使用点号分隔文件名与 `id`（如 `module.moduleid`）。
- **整体加载**：通过 `module-html` 属性指定 HTML 文件不指定子模块，整体加载不会替换原有 `div`
- **CSS 和 JS 文件**：通过 `module-css` 和 `module-js` 属性指定要加载的样式和脚本文件。文件后缀 `.css` 和 `.js` 可选。
- **替换机制**：模块加载后，会移除原始的 `<div>` 并替换为加载的模块内容。
- **错误处理**：当文件加载失败时，仅会在控制台打印错误信息，不影响页面显示。

## 项目结构

项目的基本结构如下：

```
module-html/
├── module-loader.js       # 主 JS 文件
├── module.html            # 示例 HTML 模块文件
├── module.css             # 示例 CSS 文件
└── module.js              # 示例 JS 文件
```

## 示例展示

假设 `index.html` 中使用如下代码：

```html
<div module-html="module.moduleid" module-css="module" module-js="module"></div>
```

页面将会加载 `module.html` 中 `id="moduleid"` 的子模块，并自动加载 `module.css` 和 `module.js`。

`module.html` 文件内容如下：

```html
<div id="moduleid" class="module">
    <h2>这是第一个模块</h2>
    <p>这是模块ID为 moduleid 的内容部分。</p>
</div>

<div id="moduleid2" class="module">
    <h2>这是第二个模块</h2>
    <p>这是模块ID为 moduleid2 的内容部分。</p>
</div>
```

页面加载后，`<div module-html="module.moduleid">` 会被替换为：

```html
<div id="moduleid" class="module">
    <h2>这是第一个模块</h2>
    <p>这是模块ID为 moduleid 的内容部分。</p>
</div>
```

并且会自动加载 `module.css` 和 `module.js` 文件。

## 常见问题

### 模块加载失败时是否会影响页面/错误处理？

不会。模块加载失败时，只会在浏览器的开发者工具控制台中提示错误，而不会在页面中显示错误内容，用户的页面体验不会受到影响。

### 子模块加载的js和css和module-js的加载有什么区别？

模板中的 `<script>` 是内联的，随模块内容一起插入页面，插入时即执行；**module-js** 文件则作为外部资源加载，且加载顺序受到控制。通常模板 HTML 中的 `<script>` 会被优先加载。

## 其它

如果你有任何问题或建议，欢迎在 [GitHub Issues](https://github.com/LoosePrince/module-html/issues) 中进行反馈。


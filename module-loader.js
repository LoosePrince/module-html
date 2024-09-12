// 定义一个加载模块的函数
function loadModules() {
    // 查找所有带有 module-html 属性的元素
    const modules = document.querySelectorAll('[module-html]');
  
    modules.forEach(module => {
      const htmlModule = module.getAttribute('module-html');
      const cssModule = module.getAttribute('module-css');
      const jsModule = module.getAttribute('module-js');
  
      // 判断是否为子模块加载
      let htmlFilePath, elementId;
  
      if (htmlModule.includes('.html')) {
        // 如果包含 ".html"，则认为是文件名
        htmlFilePath = htmlModule;
      } else {
        // 否则视为子模块
        [htmlFilePath, elementId] = htmlModule.split('.');
        htmlFilePath += '.html'; // 默认将 html 加为文件后缀
      }
  
      // 加载 HTML 文件
      fetch(htmlFilePath)
        .then(response => {
          if (!response.ok) {
            throw new Error(`无法加载模块文件: ${htmlFilePath}，状态码: ${response.status}`);
          }
          return response.text();
        })
        .then(data => {
          // 解析 HTML 字符串并查找指定的子模块
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, 'text/html');
          const targetElement = elementId ? doc.getElementById(elementId) : doc.body;
  
          if (targetElement) {
            // 替换原始模块元素
            module.replaceWith(targetElement);
  
            // 加载 CSS 模块
            if (cssModule) {
              loadCSS(cssModule);
            }
  
            // 加载 JS 模块
            if (jsModule) {
              loadJS(jsModule);
            }
          } else {
            console.error(`未找到 ID 为 ${elementId} 的子模块`);
          }
        })
        .catch(error => {
          console.error(`模块加载失败: ${error.message}`);
        });
    });
  }
  
  // 加载 CSS 模块
  function loadCSS(cssModule) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssModule.endsWith('.css') ? cssModule : `${cssModule}.css`;
    document.head.appendChild(link);
  }
  
  // 加载 JS 模块
  function loadJS(jsModule) {
    const script = document.createElement('script');
    script.src = jsModule.endsWith('.js') ? jsModule : `${jsModule}.js`;
    document.body.appendChild(script);
  }
  
  // DOM 加载完成后开始加载模块
  document.addEventListener('DOMContentLoaded', loadModules);
  
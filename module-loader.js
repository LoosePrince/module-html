// 定义一个加载模块的函数
function loadModules() {
    // 查找所有带有 module-html 属性的元素
    const modules = document.querySelectorAll('[module-html]');

    modules.forEach(module => {
        const htmlModule = module.getAttribute('module-html');
        const cssModule = module.getAttribute('module-css');
        const jsModule = module.getAttribute('module-js');

        let htmlFilePath, elementId;

        if (htmlModule.includes('.php') || htmlModule.includes('.html')) {
            // 支持 PHP 文件和 HTML 文件
            htmlFilePath = htmlModule;
        } else {
            [htmlFilePath, elementId] = htmlModule.split('.');
            htmlFilePath += '.html'; // 默认将 html 加为文件后缀
        }

        // 加载 PHP 或 HTML 文件
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
                    // 插入 HTML 内容
                    module.innerHTML = targetElement.innerHTML;

                    // 执行 HTML 内部的 script 标签
                    executeScripts(module);

                    // 加载 CSS 模块
                    if (cssModule) {
                        loadCSS(cssModule);
                    }

                    // 加载外部 JS 模块
                    if (jsModule) {
                        loadJSSequentially(jsModule);
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

// 执行模块内的 script 标签
function executeScripts(parentElement) {
    const scripts = parentElement.querySelectorAll('script');
    scripts.forEach(script => {
        const newScript = document.createElement('script');

        // 如果是外部脚本，复制 src 属性
        if (script.src) {
            newScript.src = script.src;
        } else {
            // 如果是内联脚本，复制代码
            newScript.textContent = script.textContent;
        }

        // 确保将新脚本插入到 body 的末尾
        document.body.appendChild(newScript);
    });
}

// 加载 CSS 模块
function loadCSS(cssModule) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssModule.endsWith('.css') ? cssModule : `${cssModule}.css`;
    document.head.appendChild(link);
}

// 加载 JS 模块，并确保按顺序插入到 body 末尾
let jsQueue = Promise.resolve();

function loadJSSequentially(jsModule) {
    jsQueue = jsQueue.then(() => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = jsModule.endsWith('.js') ? jsModule : `${jsModule}.js`;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`无法加载 JavaScript 文件: ${jsModule}`));
            document.body.appendChild(script);
        });
    }).catch(error => {
        console.error(error.message);
    });
}

// DOM 加载完成后开始加载模块
document.addEventListener('DOMContentLoaded', loadModules);

# ntscreenshot 产品展示网站

介绍 [ntscreenshot](https://github.com/tujiaw/ntscreenshot) 的中文产品官网。暖白与橙色选区视觉、可左右切换的真实产品界面、响应式布局、截图放大、FAQ，以及官方最新版本下载入口。

已部署地址：https://ntscreenshot-web.jiaw-tu.workers.dev

## 本地预览

需要 Node.js 22 或更高版本与 pnpm。

```sh
pnpm install
pnpm dev
```

打开 http://127.0.0.1:4173。

```sh
pnpm check
node --check public/app.js
```

## Cloudflare 发布

```sh
pnpm exec wrangler login
pnpm deploy
```

`wrangler.jsonc` 将 `public/` 直接发布到 Cloudflare Workers Static Assets，无需构建步骤或服务端数据库。

绑定自己的域名：Cloudflare 控制台 → Workers & Pages → ntscreenshot-web → Settings → Domains & Routes → Add → Custom domain。按照界面提示添加域名与 DNS；本仓库不会自动绑定域名。

## 内容与素材

- 产品功能来自源码、中文 README、FAQ、隐私说明与更新日志。
- `capture-real.jpg`、`magnifier-real.jpg`、`clipboard-real.png`、`settings-real.png`、`assistant-real.png` 来自用户提供的真实软件截图，原图保留，支持放大查看。
- `launcher-real.png` 来自用户提供的快捷启动截图。
- 首屏便签、网格与工作台是网站的视觉装饰，并非产品界面。
- 剪贴板历史与划词工具设有独立介绍专区；剪贴板使用真实截图，划词插图标注为使用场景示意，功能说明以产品源码为依据。
- 功能区通过左右箭头、功能名称导航或触屏横滑展示放大镜、设置、快捷启动与 AI 对话原图，各图在页面中只出现一次。
- 下载按钮使用 GitHub 的 `releases/latest/download/ntscreenshot-x64-Release.zip` 固定入口，由 GitHub 自动指向最新发布包，不绑定具体版本，也不依赖浏览器调用 API。旁边保留所有版本与更新记录入口。
- 图片放大和 FAQ 无需第三方服务；字体使用 Google Fonts，失败时使用系统字体。

网站采用纯 HTML / CSS / JavaScript。修改 `public/` 中的内容后重新部署即可。

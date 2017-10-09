import url from 'url';

// assets.manager will be:
// - undefined
// - string e.g. 'static/manager.9adbb5ef965106be1cc3.bundle.js'
// - array of strings e.g.
// assets.manager will be something like:
// [ 'static/manager.c6e6350b6eb01fff8bad.bundle.js',
//   'static/manager.c6e6350b6eb01fff8bad.bundle.js.map' ]
const managerUrlsFromAssets = (assets) => {
  if (!assets) {
    return {
      js: 'static/manager.bundle.js',
    };
  }

  if (typeof assets.manager === 'string') {
    return {
      js: assets.manager,
    };
  }

  return {
    js: assets.manager.find(filename => filename.match(/\.js$/)),
    css: assets.manager.find(filename => filename.match(/\.css$/)),
  };
};

export default function (data) {
  const { assets, publicPath } = data;

  const managerUrls = managerUrlsFromAssets(assets);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>NowUI</title>
        <meta name="description" content="NowUI 组件平台">
        <link rel="shortcut icon" href="./favicon.ico" />
      </head>
      <body>
        <div id="root"></div>
        <script src="${url.resolve(publicPath, managerUrls.js)}"></script>
      </body>
    </html>
  `;
}

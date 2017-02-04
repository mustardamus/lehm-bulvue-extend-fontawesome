'use strict'

module.exports = {
  name: 'Frontend Extend with Font-Awesome',
  description: 'https://github.com/mustardamus/lehm-bulvue-extend-fontawesome',
  delimiters: '{{ }}',
  ignore: ['README.md', 'package.json'],

  after ({ srcPath, distPath, variables, utils }) {
    let pkgPath = distPath + '/package.json'
    let oldPkg = require(pkgPath)
    let extPkg = require(srcPath + '/package.json')

    utils._.assign(oldPkg.config, extPkg.config)
    utils._.assign(oldPkg.scripts, extPkg.scripts)
    oldPkg.scripts['client:copy'] += ' & npm run client:copy:fonts'

    console.log(utils.Chalk.yellow('Extending package.json...'))
    utils.Fs.writeFileSync(pkgPath, JSON.stringify(oldPkg, null, 2), 'utf8')

    console.log(utils.Chalk.yellow('Installing Font-Awesome...'))
    utils.Shell.exec('npm install font-awesome --save')

    let stylePath = distPath + '/client/index.styl'
    let styleContent = utils.Fs.readFileSync(stylePath, 'utf8')
    styleContent += '\n@import "../node_modules/font-awesome/css/font-awesome.css"\n'

    console.log(utils.Chalk.yellow('Extending client/index.styl...'))
    utils.Fs.writeFileSync(stylePath, styleContent, 'utf8')
  }
}

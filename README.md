# vuepress-auto-sidebar


vuepress-auto-sidebar is a simple sidebar automating tool for Vuepress.

It looks for folders with README's in the folder vuepress was run in. 
If a base-option was supplied in config.js, it will instead look in the specified directory.



Only supports .md files named README. 

## npm

```
npm install vuepress-auto-sidebar
```

## usage
config.js
```javascript
const sidebar = require('vuepress-auto-sidebar')

module.exports = {
    ...
    themeConfig: {
        sidebar: sidebar.getSidebar()
    ...
```
![img](https://github.com/nikalsh/vuepress-auto-sidebar/blob/master/images/dir.png?raw=true)

Would result in

![demo](https://raw.githubusercontent.com/nikalsh/vuepress-auto-sidebar/master/images/demo.png)

## Changelog
### 1.0.5 - 2020-06-07
### Added
- Support for "base"-option in config.js, it will now prepend the base to all paths when generating the sidebar. 


## Contact
If you want to contact me you can reach me at contact@nikals.se

## License
<!--- If you're not sure which open license to use see https://choosealicense.com/--->

This project uses the following license: [MIT](LICENSE).

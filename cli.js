#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

let baseOption = undefined;

(function getSidebar(HomeTitle = "Home") {

    const root = getRoot();

    const dir = fs.readdirSync(root)
        .filter(file => file !== '.vuepress' && fs.statSync(path.join(root, file)).isDirectory());

    const sidebarRoot = [{
        title: HomeTitle,
        path: !!baseOption ? baseOption : '/',
        collapsable: true,
        children: []
    }];

    const sidebarItems = getSidebarItems(dir, root);
    const sidebar = Array.from(sidebarRoot.concat(sidebarItems));

    rewriteConfig(sidebar)

})()

function rewriteConfig(sidebar) {
    let config = require(path.join(getRootDir(), '/.vuepress/config.js'))
    config.themeConfig.sidebar = sidebar;
    let content = getConfigFileContent()
    let match = content.match(/(?<=themeConfig: )(.(.|\r\n|\r|\n)*)/)
    let output = JSON.stringify(config.themeConfig, null, 4);
    let newContent = content.substring(0, match.index) + output + "\r\n}"
    fs.writeFileSync(path.join(getRootDir(), '/.vuepress/config.js'), newContent)
}

function getRootDir() {
    return path.resolve(process.cwd());
};

function getSidebarItems(dir, root) {
    return dir.map((e) => {
        const childDir = path.resolve(root, e);

        return sidebaritem = {
            title: e,
            path: !!baseOption ? baseOption + e + '/' : '/' + e + '/',
            collapsable: true,
            children: [...fs.readdirSync(childDir)
                .filter(file => !file.includes('.md'))
                .map(c => '/' + e + '/' + c + '/')]
        };
    })
};

function getRoot() {
    let root;

    try {
        tryFindBase();
    } catch (e) {
        console.log(e)
    }

    if (!!baseOption) {
        root = path.join(getRootDir(), baseOption)
    } else {
        root = getRootDir()
    }
    return root;
}

function getConfigFileContent() {
    let configFile = path.join(getRootDir(), '/.vuepress/config.js');
    return fs.readFileSync(configFile, 'utf8')
}

function tryFindBase() {
    try {
        let config = require(path.join(getRootDir(), '/.vuepress/config.js'))
        baseOption = config.themeConfig.base
    } catch (err) {
        console.log("Vuepress-auto-sidebar: Base option not found")
    }
}


const fs = require('fs');
const path = require('path');

const sidebar = {

    getSidebar(rootTitle = 'Home') {
        const root = getRootDir();

        const dir = fs.readdirSync(root)
            .filter(file => file !== '.vuepress' && !file.includes('.md'));

        const sidebarRoot = [{
            title: rootTitle,
            path: '/',
            collapsable: true,
            children: []
        }];

        const sidebarItems = getSidebarItems(dir);
        const sidebar = Array.from(sidebarRoot.concat(sidebarItems));

        return sidebar;
    }
};

getRootDir = function () {
    return path.resolve(process.cwd());
};

getSidebarItems = function (dir) {
    return dir.map((e) => {
        const childDir = path.resolve(getRootDir(), e);

        return sidebaritem = {
            title: e,
            path: '/' + e + '/',
            collapsable: true,
            children: [...fs.readdirSync(childDir)
                .filter(file => !file.includes('.md'))
                .map(c => '/' + e + '/' + c + '/')]
        };
    })

};

module.exports = sidebar;

angular.module('ez.fileTree').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ez-file-tree-container.html',
    "<div class=\"ez-file-tree\" ng-class=\"{'checking-enabled': config.enableChecking}\">\n" +
    "  <ul ng-if=\"data.showTree\" class=\"file-tree-animate\">\n" +
    "    <li ng-repeat=\"data in tree[config.childrenField] | object2array | orderBy:['-type', 'name']\" ng-include=\"'ez-file-tree.html'\"></li>\n" +
    "  </ul>\n" +
    "\n" +
    "  <div ng-if=\"!data.showTree\">\n" +
    "    <p class=\"lead\">Loading File Tree&hellip;</p>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('ez-file-tree.html',
    "<div class=\"label-container\" ng-class=\"{selected: data._selected}\">\n" +
    "\n" +
    "  <span class=\"folder-toggle\" ng-click=\"toggle($event, data)\" ng-if=\"config.isFolder(data) && !(config.movingFolder && config.movingFolder == data[config.idField])\">\n" +
    "    <i ng-class=\"config.icons.chevronRight\" title=\"Open folder\" ng-show=\"!data._open && config.isFolder(data)\"></i>\n" +
    "    <i ng-class=\"config.icons.chevronDown\" title=\"Close folder\" ng-show=\"data._open && config.isFolder(data)\"></i>\n" +
    "  </span>\n" +
    "\n" +
    "  <label ng-class=\"{'unselectable': (config.isFolder(data) && config.movingFolder && config.movingFolder == data[config.idField]) || (!config.isFolder(data) && !config.enableFileSelection)}\">\n" +
    "    <input type=\"checkbox\" ng-checked=\"data._selected\" ng-click=\"select($event, data)\" ng-show=\"showCheckbox(data)\"/>\n" +
    "    <span ng-dblclick=\"toggle($event, data)\">\n" +
    "      <span class=\"icon-container\">\n" +
    "        <i ng-class=\"config.icons.folder\" ng-show=\"config.isFolder(data) && !data._open\"></i>\n" +
    "        <i ng-class=\"config.icons.openFolder\" ng-show=\"config.isFolder(data) && data._open\"></i>\n" +
    "        <i ng-class=\"config.icons.file\" ng-show=\"!config.isFolder(data)\"></i>\n" +
    "      </span>\n" +
    "      <span class=\"file-name\">{{data.name}}</span>\n" +
    "    </span>\n" +
    "  </label>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<ul ng-show=\"data._open\">\n" +
    "    <li ng-repeat=\"data in data[config.childrenField] | object2array | orderBy:['-type', 'name']\" ng-include=\"'ez-file-tree.html'\"></li>\n" +
    "</ul>\n"
  );

}]);

angular.module('ez.fileTree').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ez-file-tree-container.html',
    "<div class=\"ez-file-tree\" ng-class=\"{'checking-enabled': config.enableChecking}\">\n" +
    "  <ul>\n" +
    "    <li ng-repeat=\"data in tree[config.childrenField] | object2array | orderBy:['-type', 'name']\" ng-include=\"'ez-file-tree.html'\"></li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('ez-file-tree.html',
    "<div class=\"label-container\" ng-class=\"{selected: data._selected}\">\n" +
    "\n" +
    "  <span class=\"folder-toggle\" data-ng-click=\"toggle($event, data)\">\n" +
    "    <i ng-class=\"config.icons.chevronRight\" title=\"Open folder\" data-ng-show=\"!data._open && isFolder(data)\"></i>\n" +
    "    <i ng-class=\"config.icons.chevronDown\" title=\"Close folder\" data-ng-show=\"data._open && isFolder(data)\"></i>\n" +
    "  </span>\n" +
    "\n" +
    "  <label>\n" +
    "    <input type=\"checkbox\" ng-checked=\"data._selected\" ng-click=\"select($event, data)\" ng-show=\"showCheckbox(data)\"/>\n" +
    "    <span ng-dblclick=\"toggle($event, data)\">\n" +
    "      <span class=\"icon-container\">\n" +
    "        <i ng-class=\"config.icons.folder\" ng-show=\"isFolder(data)\"></i>\n" +
    "        <i ng-class=\"config.icons.file\" ng-show=\"!isFolder(data)\"></i>\n" +
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

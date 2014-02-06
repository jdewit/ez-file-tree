angular.module('ez.fileTree').run(['$templateCache', function($templateCache) {

  $templateCache.put('ez-file-tree-container.html',
    "<div class=\"ez-file-tree\">\n" +
    "  <ul>\n" +
    "    <li ng-repeat=\"data in tree.children\" ng-include=\"'ez-file-tree.html'\" ng-controller=\"RecursionCtrl\"></li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('ez-file-tree.html',
    "<div class=\"label-container\" ng-class=\"{selected: data._selected}\" ng-controller=\"RecursionCtrl\">\n" +
    "\n" +
    "  <span class=\"folder-toggle\" data-ng-click=\"toggle($event, data)\">\n" +
    "    <i ng-class=\"icons.chevronRight\" title=\"Open folder\" data-ng-show=\"!data._open && isFolder(data)\"></i>\n" +
    "    <i ng-class=\"icons.chevronDown\" title=\"Close folder\" data-ng-show=\"data._open && isFolder(data)\"></i>\n" +
    "  </span>\n" +
    "\n" +
    "  <input type=\"checkbox\" ng-model=\"data._checked\" ng-click=\"check(data)\" data-ng-show=\"enableChecking && !isFolder(data)\"/>\n" +
    "\n" +
    "  <span ng-click=\"select(data)\" ng-dblclick=\"toggle($event, data)\">\n" +
    "\n" +
    "    <span>\n" +
    "      <i ng-class=\"icons.folderClose\" data-ng-show=\"isFolder(data)\"></i>\n" +
    "      <i ng-class=\"icons.file\" data-ng-show=\"!isFolder(data)\"></i>\n" +
    "    </span>\n" +
    "\n" +
    "    <span class=\"file-name\">{{data.name}}</span>\n" +
    "\n" +
    "  </span>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<ul ng-show=\"data._open\">\n" +
    "    <li ng-repeat=\"data in data.children\" ng-include=\"'ez-file-tree.html'\"></li>\n" +
    "</ul>\n"
  );

}]);

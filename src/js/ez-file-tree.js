(function ( angular ) {
  'use strict';

  angular.module( 'ez.fileTree', [] )

  .constant('EzFileTreeConfig', {
    chevronRightIconClass: 'icon-chevron-right',
    chevronDownIconClass: 'icon-chevron-down',
    folderIconClass: 'icon-folder-close',
    fileIconClass: 'icon-file',
    nameField: 'name',
    childrenField: 'children',
    checking: false,
    multiSelect: false
  })

  .directive('ezFileTree', ['$compile', 'EzFileTreeConfig', function($compile, EzFileTreeConfig) {
    return {
      restrict: 'EA',
      link: function (scope, element, attrs) {
        var checking = attrs.checking === 'true' ? true : EzFileTreeConfig.checking,
            multiSelect = attrs.multiSelect === 'true' ? true : EzFileTreeConfig.multiSelect,
            nameField = attrs.nameField || EzFileTreeConfig.nameField,
            childrenField = attrs.childrenField || EzFileTreeConfig.childrenField,
            template
        ;

        if (!scope.child) {
          scope.child = scope.$eval(attrs.ezFileTree);
        }

        template = '<ul class="ez-file-tree">' +
                      '<li data-ng-show="child.' + childrenField + ' && child.' + childrenField + '.length == 0">empty</li>' +
                      '<li ng-repeat="child in child.' + childrenField + '" data-ng-dblclick="toggle($event, child)">' +
                        '<div class="label-container" ng-class="{selected: child._selected}">' +
                          '<span class="folder-toggle" data-ng-click="toggle($event, child)">' +
                            '<i class="' + EzFileTreeConfig.chevronRightIconClass + '" title="Open folder" data-ng-show="!child._open && isFolder(child)"></i>' +
                            '<i class="' + EzFileTreeConfig.chevronDownIconClass + '" title="Close folder" data-ng-show="child._open && isFolder(child)"></i>' +
                          '</span>'
        ;

        template += '<span class="file-name" data-ng-click="select(child)">';

        if (checking) {
          template += '<input type="checkbox" ng-model="child._checked" ng-change="check(child)" data-ng-show="!isFolder(child)"/>';
        }

        template +=   '<i class="' + EzFileTreeConfig.folderIconClass + '" data-ng-show="isFolder(child)"></i>' +
                      '<i class="' + EzFileTreeConfig.fileIconClass + '" data-ng-show="!isFolder(child)"></i>' +
                      '{{child.name}}' +
                    '</span>' +
                  '</div>' +
                  '<div class="folder-container" ng-show="child._open" data-ez-file-tree="true"></div>' +
                '</li>' +
              '</ul>'
        ;

        var activate = function(_scope) {
          _scope.child._active = true;

          if (typeof (_scope.$parent.child) !== 'undefined') {
            activate(_scope.$parent);
          }
        };

        var deactivate = function(_scope) {
          var _active = false;
          angular.forEach(_scope.child[childrenField], function(v, i) {
            if (v._checked === true) {
              _active = true;
            }
          });

          _scope.child._active = _active;

          if (_active === false && _scope.$parent.child && _scope.$parent.child[childrenField]) {
            deactivate(_scope.$parent);
          }
        };

        scope.check = function(file) {
          if (file._checked) {
            activate(scope);
          } else {
            deactivate(scope);
          }
        };

        var unselectAll = function(files) {
          angular.forEach(files, function(v) {
            if (v.children && v.children.length) {
              unselectAll(v.children);
            }
            v.selected = false;
          });
        };

        scope.select = function(item) {
          if (multiSelect === false && item._selected) {
            unselectAll(scope.folder.children);
          }

          item._selected = !item._selected;
        };

        scope.toggle = function(e, item) {
          e.stopPropagation();
          e.preventDefault();

          if (scope.isFolder(item)) {
            item._open = !item._open;

            if (!item[childrenField]) {
              item[childrenField] = scope.getChildren(item);
            }
          }
        };

        scope.isFolder = function(item) {
          return (item[childrenField] || item.type === 'folder');
        };

        var newElement = angular.element(template);
        $compile(newElement)(scope);
        element.append(newElement);
      }
    };
  }]);
})( angular );

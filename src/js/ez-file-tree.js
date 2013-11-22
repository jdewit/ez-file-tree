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
            nameField = attrs.nameField || EzFileTreeConfig.nameField,
            childrenField = attrs.childrenField || EzFileTreeConfig.childrenField,
            multiSelect = attrs.multiSelect === 'true' ? true : EzFileTreeConfig.multiSelect,
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

        if (checking) {
          template += '<input type="checkbox" ng-model="child._checked" ng-change="check(child)" data-ng-show="!isFolder(child)"/>';
        }

        template += '<span class="file-name" data-ng-click="select(child)">' +
                      '<i class="' + EzFileTreeConfig.folderIconClass + '" data-ng-show="isFolder(child)"></i>' +
                      '<i class="' + EzFileTreeConfig.fileIconClass + '" data-ng-show="!isFolder(child)"></i>' +
                      '<span>{{child.' + nameField + '}}</span>' +
                    '</span>' +
                  '</div>' +
                  '<div class="folder-container" ng-show="child._open" data-ez-file-tree="true" data-checking="' + checking  + '" data-multi-select="' + multiSelect + '"></div>' +
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
          angular.forEach(_scope.child[childrenField], function(v) {
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
            if (v[childrenField] && v[childrenField].length) {
              unselectAll(v[childrenField]);
            }
            v._selected = false;
          });
        };

        scope.select = function(item) {
          console.log('select');
          if (item._selected) {

            item._selected = false;

            if (multiSelect) {
              scope.folder._selectedFiles.splice(scope.folder._selectedFiles.indexOf(item), 1);
            } else {
              scope.folder._selectedFile = null;
            }

          } else {

            if (multiSelect) {
              scope.folder._selectedFiles.push(item);
            } else {
              scope.folder._selectedFile = item;
              unselectAll(scope.folder[childrenField]);
            }

            item._selected = true;

          }
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
          return (item.type === 'folder' || item.type === 'album');
        };

        var newElement = angular.element(template);
        $compile(newElement)(scope);
        element.append(newElement);
      }
    };
  }]);
})( angular );

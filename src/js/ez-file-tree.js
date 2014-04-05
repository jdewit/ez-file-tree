(function ( angular ) {
  'use strict';

  angular.module( 'ez.fileTree', ['ez.object2array'] )

  .constant('EzFileTreeConfig', {
    enableChecking: false,
    multiSelect: false,
    onlyFileSelection: false,
    icons: {
      chevronRight: 'fa fa-chevron-right',
      chevronDown: 'fa fa-chevron-down',
      folder: 'fa fa-folder',
      file: 'fa fa-file'
    },
    childrenField: 'children',
    isFolder: function(data) {
      return (data.type === 'folder' || data.type === 'album');
    }
  })

  .controller('RecursionCtrl', ['$scope', function($scope) {
    $scope.select = function(data, fromCheck) {
      $scope.masterSelect(data, fromCheck, $scope);
    };
  }])

  .directive('ezFileTree', ['$compile', '$timeout', 'EzFileTreeConfig', function($compile, $timeout, EzFileTreeConfig) {
    return {
      restrict: 'EA',
      scope: {
        tree: '=ezFileTree',
        getChildren: '='
      },
      templateUrl: 'ez-file-tree-container.html',
      link: function (scope, element, attrs) {
        var multiSelect = attrs.multiSelect === 'true' ? true : EzFileTreeConfig.multiSelect,
        onlyFileSelection = attrs.onlyFileSelection === 'true' ? true : EzFileTreeConfig.onlyFileSelection
        ;

        scope.childrenField = attrs.childrenField || EzFileTreeConfig.childrenField;
        scope.enableChecking = attrs.enableChecking === 'true' ? true : EzFileTreeConfig.enableChecking;
        scope.isFolder = attrs.isFolder ? scope.$eval(attrs.isFolder) : EzFileTreeConfig.isFolder;
        scope.icons = EzFileTreeConfig.icons;
        scope.disableSelect = false;


        scope.tree._selectedFiles = {};
        scope.tree._activeFiles = {};

        scope.toggle = function(e, data) {
          scope.disableSelect = true;
          $timeout(function() {
            scope.disableSelect = false;
          }, 500);

          data._open = !data._open;

          if (!data.children || (data.children && !data.children.length)) {
            if (!scope.getChildren) {
              throw new Error('You must add a getChildren attribute');
            }

            scope.getChildren(data);
          }
        };

        // activate parent folders
        var activate = function(_scope) {
          _scope.data._active = true;
          scope.tree._activeFiles[_scope.data.id] = _scope.data;

          if (typeof (_scope.$parent.$parent.data) !== 'undefined') {
            activate(_scope.$parent.$parent);
          }
        };

        // deactivate parent folders if no children are active
        var deactivate = function(_scope, data) {
          var active = false;

          delete scope.tree._activeFiles[_scope.data.id];

          angular.forEach(_scope.data[scope.childrenField], function(v) {
            if (v._selected === true && data !== v) {
              active = true;
              scope.tree._activeFiles[_scope.data.id] = _scope.data;

              return;
            }
          });

          _scope.data._active = active;

          if (active === false && typeof (_scope.$parent.$parent.data) !== 'undefined') {
            deactivate(_scope.$parent.$parent, data);
          }
        };

        var unselectAll = function(files) {
          angular.forEach(files, function(v) {
            if (v[scope.childrenField] && v[scope.childrenField].length) {
              unselectAll(v[scope.childrenField]);
            }
            v._selected = false;
          });
        };

        var select = function(item) {
          if (multiSelect) {
            scope.tree._selectedFiles[item.id] = item;
          } else {
            scope.tree._selectedFile = item;
            unselectAll(scope.tree[scope.childrenField]);
          }

          item._selected = true;
          scope.$emit('ez-file-tree.select', item);
        };

        var unselect = function(item) {
          item._selected = false;

          scope.$emit('ez-file-tree.unselect', item);

          if (multiSelect) {
            delete scope.tree._selectedFiles[item.id];
          } else {
            scope.tree._selectedFile = null;
          }
        };

        /**
         * Toggle selection of an item
         */
        scope.masterSelect = function(item, fromCheck, $scope) {
          var delay = fromCheck || !scope.checkingEnabled ? 0 : 200; // allow for double click to finish if needed

          $timeout(function() {
            if (scope.disableSelect === true) {
              return;
            }
            scope.disableSelect = false;

            if (item._selected) {
              if (fromCheck) {
                select(item);
                activate($scope.$parent.$parent);
              } else {
                unselect(item);
                deactivate($scope.$parent.$parent, item);
              }
            } else {
              if (fromCheck) {
                unselect(item);
                deactivate($scope.$parent.$parent, item);
              } else {
                select(item);
                activate($scope.$parent.$parent);
              }
            }
          }, delay);
        };
      }
    };
  }]);
})( angular );

(function ( angular ) {
  'use strict';

  angular.module( 'ez.fileTree', [] )

  .constant('EzFileTreeConfig', {
    enableChecking: false,
    multiSelect: false,
    onlyFileSelection: false,
    childrenField: 'children',
    isFolder: function(data) {
      return (data.type === 'folder' || data.type === 'album');
    }
  })

  .controller('RecursionCtrl', ['$scope', 'EzFileTreeConfig', function($scope, EzFileTreeConfig) {
    var childrenField = EzFileTreeConfig.childrenField;

    // active parent folders
    var activate = function(_scope) {
      _scope.data._active = true;

      if (typeof (_scope.$parent.$parent.data) !== 'undefined') {
        activate(_scope.$parent.$parent);
      }
    };

    // deactivate parent folders if no children are active
    var deactivate = function(_scope, data) {
      var active = false;

      angular.forEach(_scope.data[childrenField], function(v) {
        if (v._checked === true && data !== v) {
          active = true;

          return;
        }
      });

      _scope.data._active = active;

      if (active === false && typeof (_scope.$parent.$parent.data) !== 'undefined') {
        deactivate(_scope.$parent.$parent, data);
      }
    };

    $scope.check = function(data) {
      if (!data._checked) {
        activate($scope.$parent.$parent);
      } else {
        deactivate($scope.$parent.$parent, data);
      }
    };
  }])

  .directive('ezFileTree', ['$compile', 'EzFileTreeConfig', function($compile, EzFileTreeConfig) {
    return {
      restrict: 'EA',
      scope: {
        tree: '=ezFileTree',
        getChildren: '='
      },
      templateUrl: 'ez-file-tree-container.html',
      link: function (scope, element, attrs) {
        var multiSelect = attrs.multiSelect === 'true' ? true : EzFileTreeConfig.multiSelect,
            onlyFileSelection = attrs.onlyFileSelection === 'true' ? true : EzFileTreeConfig.onlyFileSelection,
            childrenField = attrs.childrenField || EzFileTreeConfig.childrenField
        ;

        scope.enableChecking = attrs.enableChecking === 'true' ? true : EzFileTreeConfig.enableChecking;
        scope.isFolder = attrs.isFolder ? scope.$eval(attrs.isFolder) : EzFileTreeConfig.isFolder;

        scope.toggle = function(e, data) {
          data._open = !data._open;

          if (!data.children || (data.children && !data.children.length)) {
            if (!scope.getChildren) {
              throw new Error('You must add a getChildren attribute');
            }

            data.children = scope.getChildren();
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
          if (item._selected) {

            item._selected = false;

            if (multiSelect) {
              scope.tree._selectedFiles.splice(scope.tree._selectedFiles.indexOf(item), 1);
            } else {
              scope.tree._selectedFile = null;
            }

          } else {

            if (multiSelect) {
              if (!scope.tree._selectedFiles) {
                  scope.tree._selectedFiles = [];
              }

              scope.tree._selectedFiles.push(item);
            } else {
              scope.tree._selectedFile = item;
              unselectAll(scope.tree[childrenField]);
            }

            item._selected = true;

          }
        };
      }
    };
  }]);
})( angular );

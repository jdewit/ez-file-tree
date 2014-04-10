describe('ez-file-tree', function() {
  var el, $scope, rows, $timeout;

  beforeEach(module('ez.fileTree'));


  beforeEach(inject(function(_$compile_, $rootScope, _$timeout_) {
		$compile = _$compile_;
    $timeout = _$timeout_;
    $scope = $rootScope.$new();

    el = angular.element(
      '<div id="fileTree" ez-file-tree="folder"></div>'
    );

    $scope.folder = {
      id: "Root",
      name: "Root",
      type: "folder",
        children: [
        {
          id: "Folder 1",
          name: "Folder 1",
          type: "folder",
          children: [
            {
              id: "1a",
              name: "Folder 1a",
              type: "folder",
              children: [
                {
                  id: "1a1",
                  type: "file",
                  name: "File 1a1"
                },
                {
                  id: "1a2",
                  type: "file",
                  name: "File 1a2"
                },
                {
                  id: "1a2",
                  type: "file",
                  name: "File 1a2"
                }
              ]
            },
            {
              id: "1b",
              type: "file",
              name: "File 1b"
            },
            {
              id: "1c",
              type: "file",
              name: "File 1c"
            }
          ]
        },
        {
          id: "2",
          name: "Folder 2",
          type: "folder",
          children: [
            {
              id: "2a",
              name: "Folder 2a",
              type: "folder",
              children: [
                {
                  id: "2a1",
                  type: "file",
                  name: "File 2a1"
                },
                {
                  id: "2a2",
                  type: "file",
                  name: "2a2"
                },
                {
                  id: "2a2",
                  type: "file",
                  name: "2a2"
                }
              ]
            },
            {
              id: "2b",
              type: "file",
              name: "File 2b"
            },
            {
              id: "2c",
              type: "file",
              name: "File 2c"
            }
          ]
        },
        {
          id: "bla",
          type: "file",
          name: "File on root",
        }
      ]
    };

    $compile(el)($scope);
    $scope.$digest();

  }));

  it('should have default config', function() {
    assert.deepEqual(el.isolateScope().config, {
      enableChecking: false,
      enableFolderSelection: true,
      multiSelect: false,
      recursiveSelect: true,
      icons: {
        chevronRight: 'fa fa-chevron-right',
        chevronDown: 'fa fa-chevron-down',
        folder: 'fa fa-folder',
        file: 'fa fa-file'
      },
      childrenField: 'children',
      idField: 'id',
      typeField: 'type',
      folderType: 'folder'
    });
  });

  it('is a table element', function() {
    assert.equal(el.prop('tagName'), 'DIV');
    assert.equal(el.attr('id'), 'fileTree');
  });

  it('should show the first level folders/files', function() {
    assert.lengthOf(el.find('ul:first > li'), 3);
    assert.equal(el.find('ul:first > li:nth-child(1) .file-name').eq(0).text(), 'Folder 1');
    assert.equal(el.find('ul:first > li:nth-child(2) .file-name').eq(0).text(), 'Folder 2');
    assert.equal(el.find('ul:first > li:nth-child(3) .file-name').eq(0).text(), 'File on root');
  });

  it('should hide nested folders', function() {
    assert.equal(el.find('ul:first > li:nth-child(1) li .file-name').eq(0).text(), 'Folder 1a');
    assert.isTrue(el.find('ul:first > li:nth-child(1) li .file-name').eq(0).parents('ul').hasClass('ng-hide'));
  });

  it('should select file on click', function() {
    el.find('ul:first > li:nth-child(2) input').eq(0).click();
    $timeout.flush();
    assert.isTrue(el.find('ul:first > li:nth-child(2) input').eq(0).parents('.label-container').hasClass('selected'));
  });

  it('should unselect previous file on another file click', function() {
    el.find('ul:first > li:nth-child(2) input').eq(0).click();

    el.find('ul:first > li:nth-child(3) input').eq(0).click();
    assert.isFalse(el.find('ul:first > li:nth-child(2) input').eq(0).parents('.label-container').hasClass('selected'));
  });

  it('should open/close tree on folder toggle', function() {
    assert.equal(el.find('ul:first > li:nth-child(2) .label-container:first-child').next().attr('ng-scope ng-hide'));
    $(el.find('ul:first > li:nth-child(2) .label-container:first-child .folder-toggle').get(0)).trigger('click');
    assert.equal(el.find('ul:first > li:nth-child(2) .label-container:first-child').next().attr('ng-scope'));
  });

  it('should open/close tree on folder double click', function() {
    assert.equal(el.find('ul:first > li:nth-child(2) .label-container:first-child').next().attr('ng-scope ng-hide'));
    $(el.find('ul:first > li:nth-child(2) .label-container:first-child .file-name').get(0)).trigger('dblclick');
    assert.equal(el.find('ul:first > li:nth-child(2) .label-container:first-child').next().attr('ng-scope'));
  });

});

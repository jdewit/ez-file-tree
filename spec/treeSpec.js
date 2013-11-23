describe('ez-file-tree', function() {
  var el, scope, rows;

  beforeEach(module('ez.fileTree'));
  //beforeEach(module('ez-file-tree.html'));
  //beforeEach(angular.mock.module('ngMockE2E'));
  //beforeEach(module('ez-file-tree.html'));
  //beforeEach(module('ez-file-tree-container.html'));

  beforeEach(inject(function($templateCache,_$compile_,_$rootScope_) {
		template = $templateCache.get('src/template/ez-file-tree.html');
		$templateCache.put('ez-file-tree.html',template);

		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

  beforeEach(inject(function($templateCache,_$compile_,_$rootScope_) {
		template = $templateCache.get('src/template/ez-file-tree-container.html');
		$templateCache.put('ez-file-tree-container.html',template);

		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));


  beforeEach(inject(function($rootScope, $compile) {
      scope = $rootScope;

      el = angular.element(
        '<div id="fileTree" data-ez-file-tree="folder"></div>'
      );

      scope.folder = {
        id: "Root",
        name: "Root",
          children: [
          {
            id: "Folder 1",
            name: "Folder 1",
            children: [
              {
                id: "1a",
                name: "Folder 1a",
                children: [
                  {
                    id: "1a1",
                    name: "File 1a1"
                  },
                  {
                    id: "1a2",
                    name: "File 1a2"
                  },
                  {
                    id: "1a2",
                    name: "File 1a2"
                  }
                ]
              },
              {
                id: "1b",
                name: "File 1b"
              },
              {
                id: "1c",
                name: "File 1c"
              }
            ]
          },
          {
            id: "2",
            name: "Folder 2",
            children: [
              {
                id: "2a",
                name: "Folder 2a",
                children: [
                  {
                    id: "2a1",
                    name: "File 2a1"
                  },
                  {
                    id: "2a2",
                    name: "2a2"
                  },
                  {
                    id: "2a2",
                    name: "2a2"
                  }
                ]
              },
              {
                id: "2b",
                name: "File 2b"
              },
              {
                id: "2c",
                name: "File 2c"
              }
            ]
          },
          {
            id: "bla",
            name: "File on root",
          }
        ]
      };

      $compile(el)(scope);
      scope.$digest();

  }));

  it('is a table element', function() {
    expect(el.prop('tagName')).toBe('DIV');
    expect(el.attr('id')).toBe('fileTree');
  });

  it('should show the first level folders/files', function() {
    expect(el.find('ul:first > li:nth-child(1) .file-name').eq(0).text()).toBe('Folder 1');
    expect(el.find('ul:first > li:nth-child(2) .file-name').eq(0).text()).toBe('Folder 2');
    expect(el.find('ul:first > li:nth-child(3) .file-name').eq(0).text()).toBe('File on root');
  });

  it('should hide nested folders', function() {
    expect(el.find('ul:first > li:nth-child(1) li .file-name').eq(0).text()).toBe('Folder 1a');
    expect(el.find('ul:first > li:nth-child(1) li .file-name').eq(0).parents('ul').hasClass('ng-hide')).toEqual(true);
  });

  it('should select file on click', function() {
    el.find('ul:first > li:nth-child(2) .file-name').eq(0).click();
    expect(el.find('ul:first > li:nth-child(2) .file-name').eq(0).parents('.label-container').hasClass('selected')).toEqual(true);
  });

  it('should unselect previous file on another file click', function() {
    el.find('ul:first > li:nth-child(2) .file-name').eq(0).click();

    el.find('ul:first > li:nth-child(3) .file-name').eq(0).click();
    expect(el.find('ul:first > li:nth-child(2) .file-name').eq(0).parents('.label-container').hasClass('selected')).toEqual(false);
  });

  it('should open/close tree on folder double click', function() {
    //console.log(el.find('ul:first > li:nth-child(2) .file-name').eq(0).parent().next().attr('class'));
    //expect(el.find('ul:first > li:nth-child(2) .file-name').eq(0).parent().next().hasClass('ng-hide')).toEqual(true);

    //el.find('ul:first > li:nth-child(2) .file-name').eq(0).dblclick();

    //expect(el.find('ul:first > li:nth-child(2) .file-name').eq(0).parent().next().hasClass('ng-hide')).toEqual(false);

    //console.log(el.find('ul:first > li:nth-child(2) .file-name').eq(0).parent().next().attr('class'));
  });

});

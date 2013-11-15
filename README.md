Angular File Tree Directive
===========================

##Installation

```bash
$ bower install ez-file-tree
```

##Demo

##Configure

Some things such as the icon classes are configurable, just override the EzFileTreeConfig constant.

##About

This directive is a bit more than just a recursive tree. It also sets some private 
fields on each item depending on a particular action.

- _checked => True if the checkbox next to a file has been checked
- _selected => True if the name of a file/folder has been clicked
- _active => True if any children files are checked



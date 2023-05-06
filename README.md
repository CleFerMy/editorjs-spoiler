![](https://badgen.net/badge/Editor.js/v2.0/blue)

# spoiler Tool
Inline tool for hiding text fragments for the [Editor.js](https://github.com/codex-team/editor.js)

## Installation

### Install via NPM

Get the package

```shell
npm i --save @clefermy/editorjs-spoiler
```

```shell
yarn add @clefermy/editorjs-spoiler
```

Include module at your application

```javascript
import spoiler from '@clefermy/editorjs-spoiler';
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
import EditorJs from '@clefermy/editorjs';
import spoiler from '@clefermy/editorjs-spoiler';

var editor = new EditorJS({
  // ...
  tools: {
    // ...
    spoiler: spoiler
  },
});
```

## Config Params

This Tool has no config params

## Output data

spoilerd text will be wrapped with a `span` tag with an `cdx-spoiler` class.

```json
{
    "type" : "text",
    "data" : {
        "text" : "Create a directory for your module, enter it and run <span class=\"cdx-spoiler\">npm init</span> command."
    }
}
```

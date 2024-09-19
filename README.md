# template-remix-webcomp
Template repository for building a web component for the Remix Labs platform using Vite + Typescript + Lit

## Resources
- [Lit](https://lit.dev/)
- [Vite](https://vitejs.dev/)

# Development
```bash
npm install
npm run dev
```

This will start a development server at http://localhost:5173/ where you can test your web component. `index.html` is the test page.
# Build & bundle
```bash
npm run build
```
Will create a `dist` folder the built web component `dev-test.js`

```bash
npm run bundle
```
Will build and bundle the web component with its manifest.json into a zip file `dist/dev-test.zip`

# Manifest.json

Web Components are distributed as zip files of the Javascript and a `manifest.json`. You drop this into your app's `files` and you should be able to select it from a WebComponent node.

Zip your javascript together with a `manifest.json` along the following lines:

```
{
    "mix_package_version": "1",
    "mix_package_type": "webcomponent",
    "file": "dev-test.js",
    "tag": "dev-test",
    "ins": [
        {
            "name": "count",
            "type": "number"
        },
        {
            "name": "reset",
            "type": "event"
        }
    ],
    "events": [
        {
            "name": "current-count",
            "payload": "number"
        }

    ],
    "slots": {
        "type": "NoSlots"
    }
}
```

## Structure

Each manifest has the following fields:
* **mix_package_version** *(string, required)*: always use `"1"` at present
* **mix_package_type**: set to `"webcomponent"`
* **tag** *(string, required)*: the html tag used by the web component (e.g. good-map, etc...)
* **file** *(string, required)*: the file name
* **ins** *(array, optional)*: the set of input params to customise the web component (see section `ins` below)
* **events** *(array, optional)*: the set of events fired by the web component (see section `events` below)
* **slots** *(object, optional)*: the definition for use of slots in the web component (see section `slots` below)

## Field: Ins

An array of input params (each will be translated into an in bndings).
Each input param has the following fields:
* name (string, required): the name of the field (needs to match a valid field of the web component)
* type (string, required): the type of the field. See `Field Type` section below for valid field types

ex:
```
[
    {"name": "api-key", "type": "string"},
    {"name": "latitude", "type": "number"},
    {"name": "longitude", "type": "number", "defaultValue": 0},
    {"name": "trigger", "type": "event"},
    {"name": "style", "type": {}}
]
```

Note here that `trigger` needs to be public method in your WC.

## Field: Events

An array of events (each will be translated into a trigger out binding, and, if needed, an out binding for the payload of that event)
Each event has the following fields:
* name (string, required): the name of the event (needs to match a valid event name of the web component)
* payload (string, optional): the type of the event payload (if any). See `Field Type` section below for valid field types


### ex
```
[
    {"name": "zoom-changed", "payload": "number" },
    {"name": "center-changed", "payload": {}},
    {"name": "click"}
]
```
This will create 5 out bindings:
* `zoom-changed`: a trigger
* `zoom-changed - payload`: a number
* `center-changed`: a trigger
* `center-changed - payload`: an object
* `click`: a trigger

## Field: Slots
An object defining the use of slots in the web component.

Valid values are:
* `{ type: "NoSlots"}`: no slots
* `{ type: "SingleSlot", param: true }`: a single slot that takes a list of cards
* `{ type: "SingleSlot", param: false }`: a single slot that takes a single card

Not yet implemented:
* `{ type: "MultiSlot", param: [names] }`

## Field Type
- `"string"`
- `"number"`
- `"bool"`
- `"date"`
- `"color"`
- `"url"`
- `"image"`
- `"icon"`
- `"ref"`
- `"email"`
- `"card"`
- `"event"`
- `"location"`
- `"data"`
- `"entity"`
- `{}`: an object
- `["string"`], `["number"]`, `[{}]`, etc: an array (of strings, of numbers, of objects...)

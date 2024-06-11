# eslint-import-file-extension

[![github actions][actions-image]][actions-url]
[![npm](https://img.shields.io/npm/v/@larsdroid/eslint-import-file-extension)](https://www.npmjs.com/package/@larsdroid/eslint-import-file-extension)
[![npm downloads](https://img.shields.io/npm/dt/@larsdroid/eslint-import-file-extension.svg?maxAge=2592000)](https://www.npmtrends.com/@larsdroid/eslint-import-file-extension)

This [Eslint](https://eslint.org/) **9+** plugin enforces local ES module
imports to have the `.js` file extension.

## Example

Since ES module imports of TypeScript files aren't
([and never will be](https://github.com/microsoft/TypeScript/issues/42151))
rewritten to JavaScript imports, we have to enforce imports to have the `.js` file extension, even
when importing TypeScript files. [Here](https://github.com/microsoft/TypeScript/issues/16577#issuecomment-754941937)
is a summary on why TypeScript works the way it does.

This is an example of an invalid import:

```typescript
import something from 'myfile.ts'
```

After the TypeScript compiler has transpiled this statement, it'll still reference `myfile.ts`, which
will generate errors since `myfile.ts` will have been transpiled to `myfile.js`.\
Instead, the original code must reference `myfile.js` as that's the name of the file that will be produced by the
TypeScript compiler.

The original source code should look like this:

```typescript
import something from 'myfile.js'
```

Now, we can be confident that, even after TS transpilation, our code will work.

This ESLint plugin enforces such imports.

## Installation

ESLint version `>=9.0.0` is required to use this plugin. This plugin is not compatible with ESLint version 8 and lower.

Add the plugin as a development dependency:

```shell
npm i --save-dev @larsdroid/eslint-import-file-extension
```

Enable the plugin from `eslint.config.js`:
```javascript
import eslintPluginImportFileExtension from '@larsdroid/eslint-import-file-extension'

export default [
    // other exisiting configuration here ...
    {
        // configuration such as `languageOptions` should be here ...
        plugins: {
            'eslint-import-file-extension': eslintPluginImportFileExtension
        },
        rules: {
            'eslint-import-file-extension/js-file-extension': 'error'
        }
    }
]
```

## Issues

Issues can be reported [here](https://github.com/larsdroid/eslint-import-file-extension/issues).

import { RuleTester } from 'eslint'
import fsFileExtension from '../src/js-file-extension.js'

const ruleTester = new RuleTester({
    languageOptions: { ecmaVersion: 2015 }
})

ruleTester.run(
    'js-file-extension',
    fsFileExtension,
    {
        valid: [
            {
                code: 'import Apple from \'./apple.js\''
            },
            {
                code: 'import Apple from "./apple.js"'
            },
            {
                code: 'import Apple from "somemodule"'
            },
            {
                code: 'import Apple from "somemodule/file.css"'
            },
            {
                code: 'import Apple from "./style/mystyle.css"'
            }
        ],
        invalid: [
            {
                code: 'import Apple from \'./apple\'',
                output: 'import Apple from \'./apple.js\'',
                errors: [
                    {
                        message: 'Files should be imported with the `.js` file extension. Unexpected value: ./apple.',
                        line: 1,
                        column: 20,
                        endLine: 1,
                        endColumn: 27
                    }
                ]
            },
            {
                code: 'import Apple from "./apple"',
                output: 'import Apple from "./apple.js"',
                errors: 1
            },
            {
                code: 'import Apple from "../apple"',
                output: 'import Apple from "../apple.js"',
                errors: 1
            },
            {
                code: 'import Apple from "/apple"',
                output: 'import Apple from "/apple.js"',
                errors: 1
            },
            {
                code: 'import Apple from "./path/apple.ts"',
                output: 'import Apple from "./path/apple.js"',
                errors: [
                    {
                        message: 'Files should be imported with the `.js` file extension. Unexpected value: ./path/apple.ts.',
                        line: 1,
                        column: 20,
                        endLine: 1,
                        endColumn: 35
                    }
                ]
            }
        ]
    }
)

console.log('All tests passed!')

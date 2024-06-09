const {RuleTester} = require("eslint");
const fsFileExtension = require("./js-file-extension.js");
//import fsFileExtension from './enforce-file-extension.js'

const ruleTester = new RuleTester({
    languageOptions: { ecmaVersion: 2015 }
});

ruleTester.run(
    "js-file-extension", // rule name
    fsFileExtension,
    {
        valid: [
            {
                code: "import Apple from './apple.js'",
            },
            {
                code: 'import Apple from "./apple.js"',
            },
            {
                code: 'import Apple from "somemodule"',
            },
            {
                code: 'import Apple from "somemodule/file.css"',
            }
        ],
        invalid: [
            {
                code: "import Apple from './apple'",
                output: "import Apple from './apple.js'",
                errors: 1,
            },
            {
                code: 'import Apple from "./apple"',
                output: 'import Apple from "./apple.js"',
                errors: 1,
            },
            {
                code: 'import Apple from "../apple"',
                output: 'import Apple from "../apple.js"',
                errors: 1,
            },
            {
                code: 'import Apple from "/apple"',
                output: 'import Apple from "/apple.js"',
                errors: 1,
            }
        ],
    }
);

console.log("All tests passed!");
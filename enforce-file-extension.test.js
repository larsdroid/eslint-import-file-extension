const {RuleTester} = require("eslint");
const fooBarRule = require("./enforce-file-extension");

const ruleTester = new RuleTester({
    languageOptions: { ecmaVersion: 2015 }
});

ruleTester.run(
    "enforce-file-extension", // rule name
    fooBarRule,
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

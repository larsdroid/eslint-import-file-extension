import pluginJs from '@eslint/js'
import globals from 'globals'

export default [
    {
        ignores: [
            'node_modules/'
        ]
    },
    pluginJs.configs.recommended,
    {
        languageOptions: {
            globals: globals.node
        }
    }
]

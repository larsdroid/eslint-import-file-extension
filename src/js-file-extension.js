export default {
    meta: {
        type: 'problem',
        docs: {
            description: 'Enforce that a local file import should end with `.js`.'
        },
        fixable: 'code',
        schema: []
    },
    create(context) {
        return {
            // https://eslint.org/docs/latest/extend/custom-rule-tutorial
            ImportDeclaration(node) {
                const isRelativePath = /^\.?\.?\//.test(node.source.value)
                const fileExtensionArray = /\.([a-z0-9]+)?$/.exec(node.source.value)
                const fileExtension = fileExtensionArray?.at(1)
                const fileExtensionIndex = fileExtensionArray?.index

                if (isRelativePath && (!fileExtension || fileExtension === 'ts')) {
                    const quoteStyle = node.source.raw[0]
                    let correctedImport
                    if (fileExtension) {
                        correctedImport = quoteStyle + node.source.value.substring(0, fileExtensionIndex) + '.js' + quoteStyle
                    } else {
                        correctedImport = quoteStyle + node.source.value + '.js' + quoteStyle
                    }
                    context.report({
                        node: node.source,
                        loc: {
                            start: {
                                line: node.source.loc.start.line,
                                column: node.source.loc.start.column + 1
                            },
                            end: {
                                line: node.source.loc.end.line,
                                column: node.source.loc.end.column - 1,
                            }
                        },
                        message:
                            'Files should be imported with the `.js` file extension. Unexpected value: {{ theImport }}.',
                        data: {
                            theImport: node.source.value
                        },
                        fix(fixer) {
                            return fixer.replaceText(node.source, correctedImport)
                        }
                    })
                }
            }
        }
    }
}

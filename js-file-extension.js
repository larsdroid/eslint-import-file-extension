module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "Enforce that a local file import should end with `.js`.",
        },
        fixable: "code",
        schema: []
    },
    create(context) {
        return {
            // https://eslint.org/docs/latest/extend/custom-rule-tutorial
            ImportDeclaration(node) {
                const relativePath = /^\.?\.?\//.test(node.source.value)
                // TODO: Next and Svelte etc. imports?
                if (relativePath && !node.source.value.endsWith(".js")) {
                    const quoteStyle = node.source.raw[0]
                    const correctedImport = quoteStyle + node.source.value + ".js" + quoteStyle;
                    context.report({
                        node,
                        message: 'Files should be imported with the `.js` file extension. Unexpected value: {{ theImport }}.',
                        data: {
                            theImport: node.source.value
                        },
                        fix(fixer) {
                            return fixer.replaceText(node.source, correctedImport);
                        }
                    });
                }
            }
        };
    }
};

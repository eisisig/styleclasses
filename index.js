
const styles = {
    list: {
        background: 'gray'
    },
    'list--is-active': {
        color: 'white',
        background: 'green'
    },
}

const isEmpty = require('lodash.isempty')
const kebabCase = require('lodash.kebabcase')

function styleclasses ( styles ) {

    const s = styles

    return ( key, params ) => {

        let c = {}

        if ( styles.hasOwnProperty(key) ) {
            Object.assign(c, styles[key])
        }

        if ( !isEmpty(params) ) {

            for (let k in params) {
                if ( params.hasOwnProperty(k) ) {
                    const v = params[k]
                    if ( v === true ) {
                        const modKey = `${key}--${kebabCase(k)}`
                        if ( styles.hasOwnProperty(modKey) ) {
                            Object.assign(c, styles[modKey])
                        }
                    }
                }
            }
        }

        return c
    }

}

const sx = styleclasses(styles)

console.log(sx('list', { isActive: true }))

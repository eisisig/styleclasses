'use strict'

const get = require('lodash.get')
const find = require('lodash.find')
const keys = require('lodash.keys')
const every = require('lodash.every')
const isArray = require('lodash.isarray')
const isEmpty = require('lodash.isempty')
const isObject = require('lodash.isobject')
const kebabCase = require('lodash.kebabcase')

function styleclasses ( styles ) {

	if ( !styles ) return console.warn('Please provide a styles object from a css file')

	const s = styles

	return ( key, params, extra ) => {

		let c = ''

		// string with an object
		if ( typeof key === 'string' ) {
			c += get(s, key) || ''
			if ( !isEmpty(params) ) {
				for ( let k in params ) {
					if ( params.hasOwnProperty(k) ) {
						const v = params[k]
						if ( v === true ) {
							const modKey = `${key}--${kebabCase(k)}`

							c += ` ${get(s, k) || ''}`
							c += ` ${get(s, modKey) || ''}`
						}
					}
				}
			}
		}

		// if key is array
		else if ( isArray(key) ) {
			key.forEach(( k ) => {

				if ( typeof k === 'string' ) {
					c += ` ${get(s, k) || ''}`
				}
				// values are arrays or objects
				else {
					const match = find(key, ( value ) => every(value))

					if ( match ) {
						const key = isObject(match) && isArray(match) ? match[0] : keys(match)[0]
						const style = get(styles, key)

						if ( style ) {
							c = style
						}
					}
				}
			})
		}

		// Extra
		if ( !isEmpty(extra) && isArray(extra) ) {
			extra.forEach(( k ) => c += ` ${get(s, k) || ''}`)
		} else if ( typeof extra === 'string' ) {
			c += ` ${extra}`
		}

		return c.trim()
	}
}

module.exports = styleclasses

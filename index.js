'use strict'

const get = require('lodash.get')
const isEmpty = require('lodash.isempty')
const isArray = require('lodash.isarray')
const kebabCase = require('lodash.kebabcase')

function styleclasses (styles) {

	if ( !styles ) return console.warn('Please provide a styles object from a css file')

	const s = styles

	return (key, params, extra) => {

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
			key.forEach((k) => c += ` ${get(s, k) || ''}`)
		}

		// Extra
		if ( !isEmpty(extra) && isArray(extra) ) {
			extra.forEach((k) => c += ` ${get(s, k) || ''}`)
		} else if ( typeof extra === 'string' ) {
			c += ` ${extra}`
		}

		return c
	}
}

module.exports = styleclasses

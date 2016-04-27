'use strict'

const get = require('lodash.get')
const isEmpty = require('lodash.isempty')
const kebabCase = require('lodash.kebabcase')

function styleclasses (styles) {

	if ( !styles ) {
		return console.warn('Please provide a styles object from a css file')
	}

	const s = styles

	return (key, params) => {

		let c = ''

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

		return c
	}
}

module.exports = styleclasses

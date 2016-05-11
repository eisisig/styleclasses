'use strict'

var get = require('lodash.get')
var find = require('lodash.find')
var keys = require('lodash.keys')
var every = require('lodash.every')
var isArray = require('lodash.isarray')
var isEmpty = require('lodash.isempty')
var isObject = require('lodash.isobject')
var kebabCase = require('lodash.kebabcase')

function styleclasses ( styles ) {

	if ( !styles ) return console.warn('Please provide a styles object from a css file')

	var s = styles

	return ( key, params, extra ) => {

		let c = ''

		// string with an object
		if ( typeof key === 'string' ) {
			c += get(s, key) || ''
			if ( !isEmpty(params) ) {
				for ( let k in params ) {
					if ( params.hasOwnProperty(k) ) {
						var v = params[k]
						if ( v === true ) {
							var modKey = `${key}--${kebabCase(k)}`

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
					var match = find(key, ( value ) => every(value))

					if ( match ) {
						var key = isObject(match) && isArray(match) ? match[0] : keys(match)[0]
						var style = get(styles, key)

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

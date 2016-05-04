// TODO

const test = require('ava')
const styleclasses = require('./index')

const styles = {
	busy: 'Test__busy',
	disabled: 'Test__disabled',
	active: 'Test__is-active',
	normal: 'Test__normal',
}

const sx = styleclasses(styles)

// Test__disabled
test('should return a single class', t => {
	t.is(sx('disabled'), 'Test__disabled')
})

// Test__normal Test__is-active
test('should return a single class and extra modifier', t => {
	t.is(sx('normal', { active: true }), 'Test__normal Test__is-active')
})

// Test__normal items special-items
test('should return a single class and 2 extra classes', t => {
	t.is(sx('normal', null, 'items special-items'), 'Test__normal items special-items')
})

// Test__normal Test__busy Test__disabled"
test('should return a multiple class', t => {
	t.is(sx(['normal', 'busy', 'disabled']), 'Test__normal Test__busy Test__disabled')
})

test('should return a single class after finding first truthy', t => {
	const classes = sx([
		{ active: true },
		{ busy: true },
		{ disabled: true },
	])
	t.is(classes, 'Test__is-active')
})

test('should return a single class after finding second truthy', t => {
	const classes = sx([
		{ active: false },
		{ busy: true },
		{ disabled: true },
	])
	t.is(classes, 'Test__busy')
})

test('should return a single class after finding second truthy using array', t => {
	const classes = sx([
		['active', false],
		['busy', false],
		['disabled', true],
	])
	t.is(classes, 'Test__disabled')
})

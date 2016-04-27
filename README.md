# styleclasses

> Simple styles helper useful for css-modules

```js
import styleclasses from 'styleclasses'

const sx = styleclasses(styles)

<div className={ sx('list', { isActive: true }) }></div>
```

## Usage

### sx(\<name:string|array> [, \<params:object> [, \<extra:array|string>]])

#### `name`: name of a property in the css file

```css
.link {
	color: blue
}
```

```js
<a className={ sx('link') }>Link</a>
// Ex. "App__link___1GOMC"
```

IF name is an array it will loop through the keys and add the classnames

#### `params`: object that toggles classes if truthy

```css
.link {
	color: blue;
}
.link--is-active {
	background: yellow;
	color: white;
}
```

```js
<a className={ sx('link', { isActive: true }) }>Link</a>
// Ex. "App__link___1GOMC App__link--is-active___E-W1K"
```

#### `extra`: string or an array of extra class names that will be added to the classname

> **NOTE:** options property names are kebabCased. `isActive > is-active`, `hasManyItems > has-many-items` etc...

MIT

# FP-DOM

A container module to group lots of simple functional tools. This package only re-export all of the `fp-dom` tools found [here](https://github.com/fp-dom).


## Usage

### Import all package at once

```
import * as fpdom from 'fp-dom';

// use any module: 

let foo = fpdom.select(document)('.foo');

let bar = fpdom.selectOne(document)('.bar');

```

### Import some packages

```
import { animate, append, listen, select, velem } from 'fp-dom';

// use them directly

var onClick = listen('click');
var onClickSetClicked = onClick((event) => {
  event.target.innerHTML = 'clicked';
});

onClickSetClicked(select('.link'));

```

## Included modules

* [fd-animate](https://github.com/fp-dom/fd-animate)
* [fd-append](https://github.com/fp-dom/fd-append)
* [fd-class](https://github.com/fp-dom/fd-class) exports: `addClass / removeClass / toggleClass / hasClass`
* [fd-contains](https://github.com/fp-dom/fd-contains)
* [fd-elem](https://github.com/fp-dom/fd-elem)
* [fd-insert-after](https://github.com/fp-dom/fd-insert-after)
* [fd-insert-before](https://github.com/fp-dom/fd-insert-before)
* [fd-interval](https://github.com/fp-dom/fd-interval)
* [fd-isdom](https://github.com/fp-dom/fd-isdom)
* [fd-isVdom](https://github.com/fp-dom/fd-isVdom)
* [fd-listen](https://github.com/fp-dom/fd-listen)
* [fd-prepend](https://github.com/fp-dom/fd-prepend)
* [fd-replace](https://github.com/fp-dom/fd-replace)
* [fd-select](https://github.com/fp-dom/fd-select)  exports: `select / selectOne`
* [fd-setattr](https://github.com/fp-dom/fd-setattr)
* [fd-timeout](https://github.com/fp-dom/fd-timeout)
* [fd-velem](https://github.com/fp-dom/fd-velem)


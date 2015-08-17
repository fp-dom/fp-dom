# FP-DOM

A container module to group lots of simple functional tools. This package only re-export all of the `fp-dom` tools found [here](https://github.com/fp-dom).


# Usage

## Import all package at once: 

```
import * as fpdom from 'fp-dom';

// use any module: 

let foo = fpdom.select(document)('.foo');

let bar = fpdom.selectOne(document)('.bar');

```

## Import some packages

```
import { animate, append, listen, select, velem } from 'fp-dom';

// use them directly

var onClick = listen('click');
var onClickSetClicked = onClick((event) => {
  event.target.innerHTML = 'clicked';
});

onClickSetClicked(select('.link'));

```

# Included modules

animate 
append 
addClass 
removeClass 
toggleClass 
hasClass 
contains 
elem 
insertAfter 
insertBefore 
interval 
isdom 
isvdom 
listen 
prepend 
replace 
select 
selectOne 
setattr 
timeout 
velem 


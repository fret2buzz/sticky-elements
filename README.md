# sticky-elements

```js
$(document).ready(function(){
    $(".box1").stickyElements({
        top: 20,
        container: '.sticky-container'
    });
    $(".box2").stickyElements({
        top: 0,
        container: '.sticky-container'
    });
});
```
`top` - position from top

`container` - container to limit fixed position for sticky

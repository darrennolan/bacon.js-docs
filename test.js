var bacon = require('baconjs');

// bacon.fromArray([0, 5, 10, 20])
//     .onValue(function (value) {
//         console.log(value);
//     });

var unsubscribe = bacon.interval(1000, 'beep')
    .onValue(function (value) {
        console.log(value);
    });

setTimeout(function () {
    unsubscribe();
}, 5500);

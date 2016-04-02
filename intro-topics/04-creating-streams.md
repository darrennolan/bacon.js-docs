## Creating Streams

In baconjs you can create streams in a number of different ways.

We'll start with super simple streams and work towards more complex/custom-y ones.

### .once(value)

```
bacon.once(1)
    .onValue(value => { console.log(value); });
```

`bacon.once(1)` will give you `1` as a value in a stream, and then the stream will end.  It will print out `1` and that's it.  (Take note, bacon.once streams can only ever have 1 subscriber. More on that later)

### .later(delay, value)

```
bacon.later(1000, 'hello')
    .onValue(value => { console.log(value); });
```

`bacon.later(1000, 'hello')` will give you `hello` as a value in a stream after 1000ms and then the stream will end.


These streams will still only fire off 1 event and then end, but you can have as many subscribers (or streams relying on this as a start point) as you like.  Often I'll do things like `bacon.later(0, 'hello')` if I want it to happen now(ish) but answer to a lot of subscribers. (Again, more on this limit later).

### .fromArray([])

```
bacon.fromArray([0, 5, 10, 20])
    .onValue(value => { console.log(value); });
```

`bacon.fromArray` will return a stream that fires n events and then ends. In this example, event values are `0`, `5`, `10` and `20`.  Each value is console logged individually.

### .fromPromise(promise)

```
let myPromise = new Promise(resolve, reject) {
    setTimeout(() => resolve('best!'), 1000);
};

bacon.fromPromise(myPromise)
    .onValue(value => { console.log(value); });
```

A stream from a promise will resolve the promise only when subscribed to, and the push the resolved value into the stream.  In this example, after 1000ms from within the promise, `best!` will be given to the stream and then it will end.

### .interval(interval, value)

```
let unsubscribe = bacon.interval(1000, 'beep')
    .onValue(value => { console.log(value); });

setTimeout(() => { unsubscribe(); }, 5500);
```

Will create a stream that every 1000ms returns `beep`.  This stream never ends when it's subscribed unless it's specifically unsubscribed from.  Here `beep` will be printed 5 times, before a dirty hack setTimeout closes the stream.

Super important to note, the first `beep` waits for the interval value.

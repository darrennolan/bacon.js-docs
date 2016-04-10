## Subscribe / Unsubscribe

> If a tree falls over in a forest, and no one is around, does it still make a sound?

In something like Node EventEmitters, yes.  In Baconjs EventStreams/Observables, no.

All streams are 'lazy-evaluated', which means you need to be listening/subscribed to streams in order for them to do things.

```
import bacon from 'baconjs';

let mouseClickStream = bacon.fromEvent(document.body, 'click');
```

In the background, this stream will use `document.body.addEventHandler('click')` to register this event.  But currently, I'm not going anything with this stream, and as such, the event handler will never be registered.

Adding the following will 'subscribe' to the mouseClickStream, and once this happens, everything this stream, and this streams dependent streams - will activate.

```
mouseClickStream.onValue((data) => {
    console.log('The mouse was clicked'); 
});
```

The `onValue` function called on a stream will register the following function/callback to do something with the data as it comes in.  In this example we're just console logging that the mouse was clicked.

When you register a subscriber to a stream, you're returned a function on how to unregister the stream.

```
let unsubscribe = mouseClickStream.onValue(() => { console.log('click!'); });

setTimeout(() => {
    console.log('You\'ll see no more clicks from me!');

    unsubscribe();
}, 5000);
```

So after 5 seconds in a nasty little set timeout, we unsubscribe from the mouseClickStream - we remove our subscription.

Now, if this was the last of the subscribers (in this case it was the only one) - any streams are closed - the document.body event handler will be removed from the DOM.

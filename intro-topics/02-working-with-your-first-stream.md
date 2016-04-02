## Working with your first stream

Start thinking in terms of Data Dependencies.

In order for me to display to a user their username, I need data end point to tell me what it is.  I know how to ask for that data, I start with a user ID. I don't care when a username happens, or how that data is fetched - but it must happen for me to display a username.

```
let userDataStream = getUserData({userId: 123});

let username = userDataStream.map('.username');
let displayName = userDataStream.map('.displayName');

username.onValue((data) => {
    document.getElementById('username').innerHtml(data);
});

displayName.onValue((data) => {
    document.getElementById('displayName').innerHtml(data);
});
```

In the above example, userDataStream is a stream that hits an API and returns back a lot of user data.  But I'm not interested in anything past the username (and because I can, the display name of that user).

The username is now dependent on the userDataStream. Whenever the userDataStream updates, the username will change.

The displayName is also dependent on the userDataStream, and will update in the same fashion.

I only hit the API from getUserData once.  But I can create as many streams from other streams as I like.

Baconjs lets me worry about stating dependencies between data. I know the username can never been updated, not even by accident - unless the userDataStream updates.

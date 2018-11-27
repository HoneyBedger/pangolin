# pangolin
Messaging/chat app with WebSockets (socket.io), Node.js, React, Redux

This app is [deployed to Heroku](https://pangolin.herokuapp.com).

### Code structure
#### server:
* HTTP and WebSocket servers are set up in /bin/www.js
* Socket events handlers and helpers (authentication on connection, managing connected users) are in /socket
* ./authentication.js has helper function for user/password and token auth
* MongoDB shemas are in /models and /routes (surprise!) contains all the routing

#### client:
* /client/socketClient handles connecting to the Socket.IO server and dispatching messages from the server as Redux actions
* Redux-related stuff is in /client/actions, /client/reducers, and /client/store.js
* Client has two routes, /login, where any unauthenticated user is redirected, and /, the main chat window. The components of the chat itself are in /client/components/Chat

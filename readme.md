# Datapp NodeJS Framework

### Datapp is a NodeJS Framework for create website (NodeJS server) by interacting with JSON datas

#### Let's start by using NPM :

`npm init -y`
`npm install datapp `

#### Create a JS file and test the framework

```js
// import the framework

const Datapp = require("datapp");
const app = new Datapp.App(
  {
    name: "My first Datapp App",
    version: "1.0.0",
    hostPort: 3000,
    staticPath: __dirname,
    hostname: "localhost",
  },
  (port) => {
    console.log("Listening on port: " + port);

    // Open your browser and go to http://localhost:3000/
  }


// Create an HTML element
  app.createElement({
      tag: "h1",
      class: "hw",
      defaultText: "Hello World !"
  });

// Reload the page
  app.reload();
);

// Open your browser and go to http://localhost:3000
// It's not just that but find out!
```

## It's not just that but find out!

### Using Nodemon Or NodeJS

#### Start the NodeJS server (open your terminal and go to your folder)

// Please restart the server between each modifications (using nodejs)

```
node [Your javascript file]
```

```
nodemon [Your javascript file]
```

# Documentation and more coming soon !

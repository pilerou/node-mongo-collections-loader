# Node JS Mongodb collections loader

This library loads a Node.JS instance for each of your Mongodb schemas including an access object for each collection.

Then you can keep in memory those "Singleton" objects and use each one to access to each collection.

It uses [Node.JS Mongodb native driver](https://mongodb.github.io/node-mongodb-native/).

## Install
`npm install node-mongo-collections-loader`

## Usage
Import library
```javascript
const {MongoCollectionsLoader} = require('node-mongo-collections-loader');
```
Define your schemas and your collections.
```javascript
const instances = [
  {
    id: 'userSchema',
    collections: [
      'Users',
      'Access'
    ],
  },
  {
    id: 'myBusinessSchema',
    collections: [
      'Quotes',
      'Orders',
    ],
  },
];
```

Configure your Mongodb Auth object (Or retrieve it from secret)
```javascript
{
  userSchema: {
    url: mongodb://myuserserver:27017?userSchema,
    options: {
      readPreference: 'secondaryPreferred'
    },
  },
  myBusinessSchema: {
    url: mongodb://mybusinessserver:27017?myBusinessSchema,
    options: {
      readPreference: 'secondaryPreferred'
    },
  },
}

```

Then, load collections (add an `async` function if you are in a sync function)
... and you can use collections singletons with [Mongodb native driver's Collection](https://mongodb.github.io/node-mongodb-native/api-generated/collection.html) functions
```javascript
(async () => {
  const dao = await dao(app);
  dao.userschema.Users.find(...)
  dao.userSchema.Access.update(...)
  dao.myBusinessSchema.Quotes.find(...)
})();
```

## License

[MIT](LICENSE)
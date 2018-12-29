// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true },(err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    // db.collection('Todos').find({_id: new ObjectID('5c27c66e6d29a6e6b18429c1')}).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(error) => {
    //     console.log('Unable to fetch todos', error)
    // });

    // db.collection('Todos').find().count().then((count)=>{
    //     console.log(`Todos count ${count}`);
    // },(error) => {
    //     console.log('Unable to count todos', error)
    // });

    db.collection('Users').find({name: 'Ivan'}).toArray().then(
        (docs)=> {
            console.log('Users with name Ivan');
            console.log(JSON.stringify(docs,undefined,2));
        },
        (error)=> {
            console.log(error);
        }
    )

    client.close();
});
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true },(err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    //Delete many

    // db.collection('Todos').deleteMany({text: 'Run 5km'}).then((result)=>{
    //     console.log(result);
    // });

    //DeleteOne

    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result)=>{
    //     console.log(result);
    // })

    //FindOneAndDelete

    // db.collection('Todos').findOneAndDelete({completed: false}).then((result)=> {
    //     console.log(result);
    // })

    // db.collection('Users').deleteMany({name: "Ivan"}).then((result) => {
    //     console.log(result);
    // })

    // db.collection('Users').findOneAndDelete({_id: ObjectID('5c286dfa5d3758f5a8c71076')}).then((result) => {
    //     console.log(result);
    // });

    // client.close();
});
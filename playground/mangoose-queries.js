const {ObjectId} = require('mongodb');

const {moongoose} = require('./../server/db/mongoose');
const {Todo} = require('../server/models/todo');

const {User} = require('../server/models/user');

// var _id = '5c2b6ad621df501bc0bd6aac11';

// if(!ObjectId.isValid(_id)) {
//     console.log('Id not valid');
// }

// Todo.find({_id}).then((todos) => {
//     console.log('Todos: ', todos);
// });

// Todo.findOne({_id}).then(
//     (todo) => {
//         console.log('Todo: ', todo);
//     }
// );

// Todo.findById(_id).then(
//     (todo) => {
//         if(!todo) {
//             return console.log('Id not found');
//         }
//         console.log('Todo by id', todo);
//     }
// ).catch((e) => console.log(e));

User.findById('5c2a3aed94817320196befe4').then((user) => {
    if(!user) {
        return console.log('User not found');
    }
    console.log('User: ', user);
}).catch((e) => console.log(e.message));
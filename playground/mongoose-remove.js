const {ObjectId} = require('mongodb');

const {moongoose} = require('./../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

// Todo.findByIdAndRemove('5c32f73e61bfaf10baef001e').then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({_id: '5c32f73e61bfaf10baef001e'}).then((result) => {
//     console.log(result);
// });
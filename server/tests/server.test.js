const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('../../server/models/user')
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
    it('should create a new Todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err) => {
                if(err){
                    return done(err);
                }

                Todo.find({text}).then(
                    (todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    },
                    (error) => {
                        done(error);
                    }
                ).catch((error) => done(error));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err) => {
                if(err) return done(err);
                Todo.find().then(
                    (todos) => {
                        expect(todos.length).toBe(2);
                        done();
                    }
                ).catch((error) => done(error));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return return 404 if todo not found', (done) => {
        request(app)
        .get(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done);
    });

    it('should return return 404 if object id is not valid', (done) => {
        request(app)
        .get('/todos/' + 333)
        .expect(404)
        .end(done);
    });
});

describe('PATCH /todos/:id',() => {
    it('should update the todo',(done) => {
        let id = todos[0]._id.toHexString();
        let data = {
            text: "New text",
            completed: true
        }

        request(app)
        .patch(`/todos/${id}`)
        .send(data)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(data.text);
            expect(res.body.todo.completed).toBe(true);
            expect(typeof res.body.todo.completedAt).toBe('number');
        })
        .end(done);
    });

    it('should clear completedAt when todo is not completed',(done) => {
        let id = todos[1]._id.toHexString();
        
        request(app)
        .patch(`/todos/${id}`)
        .send({completed: false})
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.completedAt).toBe(null);
        })
        .end(done);
    })
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexID = todos[1]._id.toHexString();

        request(app)
        .delete(`/todos/${hexID}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexID);
        })
        .end((err) => {
            if(err) return done(err);

            Todo.findById(hexID).then(
                (todo) => {
                    expect(todo).toBeFalsy();
                    done();
                }
            ).catch((e) => done(e));
        });
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
        .delete(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
        .delete('/todos/' + 333)
        .expect(404)
        .end(done);
    });
});

describe('GET /users/me', () => {
    it('should return user if authenticate', (done) => {
        request(app)
        .get('/users/me')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
            expect(res.body._id).toBe(users[0]._id.toHexString());
            expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
    });

    it('should return 401 if not authenticate', (done) => {
        request(app)
        .get('/users/me')
        .expect(401)
        .expect((res) => {
            expect(res.body).toEqual({});
        })
        .end(done);
    });
});

describe('POST /users', () => {
    it('should create a user', (done) => {
        var email = 'example@example.com';
        var password = '123abc';

        request(app)
        .post('/users')
        .send({email, password})
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).toBeDefined();
            expect(res.body._id).toBeDefined();
            expect(res.body.email).toBe(email);
        })
        .end((err) => {
            if(err) return done(err);

            User.findOne({email}).then((user) => {
                expect(user).toBeDefined();
                expect(user.password).not.toBe(password);
                done();
            })
        });
    });

    it('should return validation errors if request invalid', (done) => {
        var email = 'exampleexample.com';
        var password = '123abc';

        request(app)
        .post('/users')
        .send({email, password})
        .expect(400)
        .end(done);
    });

    it('should not create user if email in use', (done) => {
        var email = 'ivan@example.com';
        var password = 'userTwoPass2';

        request(app)
        .post('/users')
        .send({email, password})
        .expect(400)
        .end(done);
    })
});
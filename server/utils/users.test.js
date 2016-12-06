const expect = require('expect');

const {Users} = require('./users.js');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Erik',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Julia',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Cathrine',
            room: 'Node Course'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '1234',
            name: 'Mads',
            room: 'The Office Fans'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for node couse', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Erik', 'Cathrine']);
    });

    it('should return names for react couse', () => {
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Julia']);
    });

    it('should remove a user', () => {
        var user = users.users[2];
        var delUser = users.removeUser(user.id);
        expect(delUser).toEqual(user);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        var delUser = users.removeUser('agastqw');
        expect(delUser).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var user = users.users[1];
        var getUser = users.getUser(user.id);
        expect(getUser).toBe(user);
    });

    it('should not find user', () => {
        var getUser = users.getUser('56');
        expect(getUser).toNotExist();
    });
});
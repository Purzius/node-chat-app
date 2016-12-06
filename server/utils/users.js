[{
    id: 'a#et13y2g2g3_426y4wfq',
    name: 'Mads',
    room: 'The Office Fans'
}];

// addUsers(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        // Return removed user
        var users = this.users.filter((user) => user.id === id);
        if(users.length > 0) {
            var delItems = this.users.splice(this.users.indexOf(users[0]), 1);

            if(delItems.length === 1) {
                return delItems[0];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    getUser(id) {
        var users = this.users.filter((user) => user.id === id);
        if(users.length > 0) {
            return users[0];
        } else {
            return null;
        }
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = {Users};



// class Person {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription () {
//         return `${this.name} is ${this.age} year(s) old.`;
//     }
// }

// var me = new Person('Mads', 21);

// console.log(me);
// console.log(me.getUserDescription());
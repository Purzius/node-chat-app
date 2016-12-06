const moment = require('moment');

var date = moment();
console.log(date);
console.log(date.format('MMM Do, YYYY'));

date.add(2,'hours');
console.log(date.format('h:mm a'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;
var newDt = moment(createdAt);
console.log(newDt);
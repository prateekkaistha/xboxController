var control = require('./xbox');
var DATA_RATE = 1;
setInterval(function() {
var data = control.processKeys();
console.log(data);
},DATA_RATE);

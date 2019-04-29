var xbox = require('xbox-controller-node');
var joyMap = ["a","b","x","y","rb","lb","leftstickpress","rightstickpress",
              "leftstickLeft","leftstickRight","leftstickUp","leftstickDown",
              "rightstickLeft","rightstickRight","rightstickUp","rightstickDown",

              "a:release","b:release","x:release","y:release",
              "rb:release","lb:release","leftstickpress:release","rightstickpress:release",
               "leftstickLeft:release","leftstickRight:release","leftstickUp:release","leftstickDown:release",
              "rightstickLeft:release","rightstickRight:release","rightstickUp:release","rightstickDown:release"];

var out=['0','0','0','0','0','0','0','0',
         '0','0','0','0','0','0','0','0'];
var output="";
var processKeys = function() {
joyMap.forEach(myFunction);
var drive=parseInt(output.substring(0,8),2);
var arm =parseInt(output.substring(8,16),2);
return [drive,arm];
}

function myFunction(value, index) {
xbox.on(value,function() {

if(index<16)
 out[index]="1";
else
 out[index-16]="0";

if(index>21)
for(var x=8;x<16;x++)
 out[x]="0";
output=out.join('');
var drive=parseInt(output.substring(0,8),2);
var arm =parseInt(output.substring(8,16),2);
});

}
module.exports.processKeys = processKeys;

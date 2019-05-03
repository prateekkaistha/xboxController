var gamepad = require("gamepad");
gamepad.init()

for (var i = 0, l = gamepad.numDevices(); i < l; i++) {
 gamepad.deviceAtIndex();
}
setInterval(gamepad.processEvents,16);
setInterval(gamepad.detectDevices,500);

var joyMap = {"00":false ,"01":false , "10":false ,"11":false ,"20":false ,"22":false ,"30":false ,"31":false, 
              "40":false ,"41":false , "50":false  ,"52":false ,"60":false ,"61":false ,"70":false ,"71":false};

var butMap = {"0":false ,"1":false ,"2":false ,"3":false ,"4":false,"5":false,"6":false,"7":false};

var v="o";
var temp="";
var temp2="";

var change = function(event,type) {
if(joyMap.hasOwnProperty(event))
  if(type==1)
   joyMap[event]= true;
  else
   joyMap[event]=false;
}

var change2=function(event,type) {
if(butMap.hasOwnProperty(event))
 if(type==1)
  butMap[event]= true;
 else
  butMap[event]=false;
}

var initialise = function() {
Object.keys(joyMap).forEach(function(key){
joyMap[key]= false;
});
}

gamepad.on("move",function(id,axis,value) {
if(value>0)
 v=0;
else if(value<0)
 v=1;
        temp=axis.toString()+v.toString();
	if(Math.abs(value*100)>50)
         change(temp,1);
	else
         change(temp,0);

if(axis==2) if((value*100)<50)
  change("20",0);
if(axis==5) if((value*100)<50)
  change("50",0);
/*
if(axis==6) if(value*100>50)
  change("61",0);
       else if(value*100<-50)
  change("60",0);

if(axis==7) if(value*100>50)
 change("71",0);
       else if(value*100<-50)
 change("70",0);
  */
});
gamepad.on("down",function(id,num) {
 change2(num.toString(),1);
 if(num==8)
 initialise();
});

gamepad.on("up",function(id,num) {
 change2(num.toString(),0);
});

var processKeys = function() {
var output="";
var output2="";

Object.keys(joyMap).forEach(function(key) {
output+=(joyMap[key] ? "1" : "0" );
});

Object.keys(butMap).forEach(function(key) {
output2+=(butMap[key] ? "1" : "0");
});

//initialise();
//console.log(output+" "+output2);
var drive = parseInt(output.substring(0,8),2);
var arm = parseInt(output.substring(8,16),2);
var arm2= parseInt(output2.substring(0,8),2);
  return[drive,arm,arm2];
}
module.exports.processKeys = processKeys;

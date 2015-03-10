var Person = function(first){
	this.first = first;
}

Person.prototype.walk = function(){
	console.log("i am walking");
}

var person = new Person();
person.walk();
var Node = function(data,next){
	this.data = data;
	this.next = next;
}

Node.prototype.getData = function(){
	console.log(this.data);
}

var head = new Node(0,null);
var node = new Node(1);


head.next = node;
head.next.getData();
node.getData();

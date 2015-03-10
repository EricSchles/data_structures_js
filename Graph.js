//rolling our own contains method
//from: http://stackoverflow.com/questions/237104/array-containsobj-in-javascript
Array.prototype.contains = function(name) {
    var i = this.length;
    while (i--) {
        if (this[i].name === name) {
            return true;
        }
    }
    return false;
}


var Node = function(name){
	this.edge_list = [];
	this.name = name;
}

Node.prototype.addEdge = function(end){
	this.edge_list.push(end);
}

var Graph = function(){
	this.node_list = [];
}

Graph.prototype.addEdge = function(start,end){

	var first = this.node_list.contains(start);
	var second = this.node_list.contains(end);
	if(first){
		//get start node
		var i = this.node_list.length;
	    while (i--) {
	        if (this.node_list[i].name === start) {
	        	this.node_list[i].addEdge(end);
	        	break;    
	        }
	    }
	}
	if(second){
	    //get end node
		i = this.node_list.length;
	    while (i--) {
	        if (this.node_list[i].name === end) {
	        	this.node_list[i].addEdge(start);
	        	break;    
	        }
	    }
	}

	if( (!first) || (!second) ){
		if( !first ){
			var node = new Node(start);
			node.addEdge(end);
			this.node_list.push(node);
			
		}
		if( !second ){
			var node = new Node(end);
			node.addEdge(start);
			this.node_list.push(node);
		}
	} 
	
	
}

Graph.prototype.printNodes = function(){
	for(var i = 0;i < this.node_list.length;i++){
		console.log(this.node_list[i].name +":");
		console.log(this.node_list[i].edge_list);
	}
}

var graph = new Graph();
graph.addEdge("start","end");
graph.addEdge("start","finish");
graph.addEdge("here","there");
graph.addEdge("up","down");
graph.printNodes();
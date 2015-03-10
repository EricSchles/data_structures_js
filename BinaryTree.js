var Node = function(data,left,right){
	this.data = data;
	this.left = left;
	this.right = right;
}

var prettyPrint = function(cur){
	if(cur.left != null){
		prettyPrint(cur.left);
	}
	process.stdout.write(cur.data + ", ");
	if(cur.right != null){
		prettyPrint(cur.right);
	}
}

var append = function(cur,data){
	if(data <= cur.data ){
		if(cur.left == null){
			cur.left = new Node(data,null,null);
		} else{
			append(cur.left,data);
		}
	} else{
		if(cur.right == null){
			cur.right = new Node(data,null,null);
		} else{
			append(cur.right,data);
		}
	}
}

var BinaryTree = function(){
	this.head = new Node(null,null,null);
}

BinaryTree.prototype.prettyPrint = function(){
	var cur = this.head;
	prettyPrint(cur);
}


BinaryTree.prototype.append = function(data){
	if(this.head.data == null ){
		this.head = new Node(data,null,null);
	} else{
		var cur = this.head;
		append(cur,data);
	}
}

/*
BinaryTree.prototype.remove() = function(data){
	return "unimplemented";
	//the code is ugly and long.
}
*/
var tree = new BinaryTree();
tree.append(10);
tree.append(14);
tree.append(11);
tree.append(1);
tree.append(2);
tree.prettyPrint();
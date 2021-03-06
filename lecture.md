#Data Structures in JS
###By
###Eric Schles

##Intro

Javascript is a reasonably new language compared to the standard choices for a study in data structures: Java, C, or C++.  The reason for it's choosing is twofold: first because Java exposes references rather than forcing one to make use of pointers; second because Javascript is easier to understand, which will allow the concepts to shine, rather than the minutiae, as is typical for any true study of computer science.

##The node and classes

Rather than starting with a definition of data structures generally, we begin with a first example, and then hope to extract a general definition.  Therefore, we must begin with the node and classes.

Note: Throughout we will follow conventions [established here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)

The above note exists because there are many ways to to write classes in Javascript.  However, good taste and clarity demands we pick one, at least for a given project.  

Classes are a blueprint for a piece of code, below we define our first class.  It is similar to past examples you may have seen in that variables and functions exist; except that they are bound together, creating a union of "nouns" and "verbs".  The reason for this is to set up conventions around functionality.  It tells future programmers where to put what functionality, and gives hints on your notion of good design.  Classes are unnecessary constructs for most code.  But then again so is using human language or comments.  Everything we write below could be written in brainfuck or binary, but it isn't because that would be a terrible idea.  The same holds here, and it is why objects are way of being organized.  

###A First Example

filename: classes.js

```
var Person = function(firstName){
	this.firstName = firstName;
}

Person.prototype.walking = function(){
	console.log("i am walking");
}

var person = new Person();
person.walking();
```

We write our class by setting a var equal to a function.  The parameters of said function will be initialized upon instantiation.  Notice the use of the `this` keyword.  The `this` acts as a place holder for whatever name is given to the object when instantiated.  In general, instantiation happens with a statement of the form ` var [some object] = new [Some Class]();`. In this case, the object is called `person` and the class is called `Person`. 

Notice also, the use of Person.prototype.walking.  This allows us to add functions and data to our class, which the object will then make use of.  In our case, the walking function is given to the person object when instatiated.   

###how to run the above code:

If you've been following our series on node.js you'll be aware of the node compiler.  For a full explanation of that please [see this](https://github.com/EricSchles/intro_node).  

`node classes.js \\ prints 'i am walking' to the screen`

###The node class

Now that we understand what a class is, let's write a node.

```
var Node = function(data,next){
	this.data = data;
	this.next = next;
}

Node.prototype.getData = function(){
	console.log(this.data);
}

var head = new Node(0,null);
var node = new Node(1,null);


head.next = node;
head.next.getData();
node.getData();
```

##A First Data Structure - linked list

Now that we have all the terminology out of the way, we are ready to create our first data structure.  The linked list.

```

var Node = function(data,next){
	this.data = data;
	this.next = next;
}

Node.prototype.getData = function(){
	console.log(this.data);
}

var LinkedList = function(){
	this.head = new Node(null,null);
	this.length = 0;
}


LinkedList.prototype.prettyPrint = function(){
	var cur = this.head;
	var result = ""
	while(cur != null){
		if(cur.next == null){
			result += cur.data;
		} else{
			result += cur.data + ", ";
		}
		cur = cur.next;
	}
	console.log(result);
}

LinkedList.prototype.append = function(data){
	if(this.head.data == null){
		this.head = new Node(data,null);
	} else{
		var cur = this.head;
		while(cur.next != null){
			cur = cur.next;
		}
		var node = new Node(data,null);
		cur.next = node;
	}
	this.length += 1;
}

LinkedList.prototype.prepend = function(data){
	if(this.head.data == null){
		this.head = new Node(data,null);
	} else{
		var node = new Node(data,this.head);
		this.head = node;
	}
	this.length += 1;
}

LinkedList.prototype.getHead = function(data){
	return this.head;
}

LinkedList.prototype.get = function(offset){
	if(offset < this.length) {
		var cur = this.head;
		for(var i = 0; i < offset;i++){
			cur = cur.next;
		}
		return cur;
	} else {
		return "you asked for an element outside the list";
	}
}

LinkedList.prototype.remove = function(data){
	//front of the list
	if(this.head.data == data){
		var cur = this.head;
		cur = cur.next;
		this.head = cur;
		return true;
	} else {
		var cur = this.head;
		var prev = this.head;
		var counter = 0;
		while(cur.data != data){
			if(counter < this.length){
				if(counter > 0){
					prev = prev.next;
				}
				cur = cur.next;
				counter +=1;
			} else{
				return false;
			}
		}//assumes element was found
		//if element was last in the list.
		if(counter == this.length -1){
			prev.next = null;
			delete cur;
			return true;
		} else{ // somewhere in the middle
			cur = cur.next;
			prev.next = cur;
			return true;	
		}
	}

}

var ll = new LinkedList();
ll.append(5);
ll.append(7);
ll.append(6);
ll.prepend(14);
ll.prepend(4);
ll.prettyPrint();
ll.remove(14);
ll.remove(6);
ll.remove(4);
ll.prettyPrint();
```

There is a ton of stuff going on here, but the most important thing to understand is actually quiet simple, the notion of a reference.

Working with references is easy, once you understand it.  There is in fact an arithemetic to the whole thing.  But first let's see the syntax and let the mathematics come later.

Say we have a Node class (as we do above).  Now all we need to do to jump from one element to the next in a linked list is the following:

```
var head = Node(5,null); // recall that nodes have data and a variable next.
console.log(head.data); //prints 5
var node = Node(7,null);
head.next = node;
console.log(head.next.data); //prints 7
```

So what's the big deal?  The big deal is simple, we are making use of the data in a variable, from another variable.  In essence, we reference one object from another.  So in literal terms, we set up a reference from one part of memory to another part of memory.  This is the big deal and the basis for much of data structures.

This small bit of code is the foundation of understanding how references work.  It may seem quiet obvious here, however it becomes less so within a linked list.  For in a linked list, we must concern ourselves with many, many variables; and all of them linked by referneces.

If we look above to our get method, we see the true power and difficulty of working with references:

```
LinkedList.prototype.get = function(offset){
	if(offset < this.length) {
		var cur = this.head;
		for(var i = 0; i < offset;i++){
			cur = cur.next;
		}
		return cur;
	} else {
		return "you asked for an element outside the list";
	}
}
```

It is here in the for-loop: `cur = cur.next;`  What could that bizzare looking statement mean?  In fact it means take the value of cur's next and set it equal to cur.  Recall that the assignment statement works from right to left, assigning the value what is to the right of the equals sign to what is to the left of the equals sign.  And since we are dealing with objects, our reference to object becomes our object.  Truly it is an odd circumstance we find ourselves in, but it is powerful.  

We may think of this statement as similar to updating a counter in a while loop:

```
var counter = 0;
while(counter < 7){
 i = i + 1;
 console.log(i);
}
```

Although you may be more familiar with this short hand:

```
var counter = 0;
while(counter < 7){
 i++;
 console.log(i);
}
```

I argue the statement with a while loop and the statement that updates the reference are the same (or at least similar).  This is due to the way that memory works inside the computer.  We won't go into detail about this here, but please do [review this](http://www.cs.umd.edu/class/sum2003/cmsc311/Notes/BitOp/pointer.html) if interested.

##Binary Trees 

Now that we understand linear data structures - data structures that can only be traversed with iteration, let's move onto data structures that should only really be traversed recursively.  

Tree's are exactly such a data structure.

###Definition

A tree data structure is like a linked list, in that it is connected by a series of references and has a root node.  However, a tree is quiet different from a linked list in one very important way.  Let's look at the node definition of a binary tree to understand this:

```
var Node = function(data,left,right){
	this.data = data;
	this.left = left;
	this.right = right;
}
```

The main difference is the left and right.  These are references to either a left node or a right node "below" the current node in the tree.  So really all we've done is allow ourselves to "nexts" instead of one.  But this has adds a great deal of complexity and power to what we can do.  You can think of the node of a data structure as sort of it's atomic structure.  By changing it, you fundamentally change the larger pattern of the data, often in interesting and powerful ways.  

Since we can now move left or right at a given node, we'll need to be able to decide where we want to go and why.  

###Zeroing in: The binary tree

A binary tree is aptly named.  It can have at most two leaves for any of it's nodes.  And so only binary decisions can be made at each node, when traversing.  It's important to note this is only the simplest possible tree.

Rather than showing you everything, in this lecture we'll simply cover binary trees - those with only two possible branches at each node.  It's important to be aware however that your trees can have as many forks as you like.  The qualification that a data structure is a tree is that it has a root node and terminal nodes.  And that traversal is done from the root to the leaves (nodes that only reference null at left or right).

###How to traverse and append:

```
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


BinaryTree.prototype.remove() = function(data){
	return "unimplemented";
	//the code is ugly and long.
}

var tree = new BinaryTree();
tree.append(2);
tree.append(14);
tree.append(7);
tree.append(5);
tree.append(17);
tree.prettyPrint();
```

As the above code shows, we append and print out our data via a technique known as recursion.  Recursion is the idea of calling a function from inside itself, again and again, until some terminal condition is met.  The key to understanding this, is ensuring the input to the internally called function is either forever increasing or forever decreasing, ensuring the terminal condition will be reached.  

If a recursive function should fail to terminate, such a function will continue on forever (in theory).  

Understanding the idea behind recursion requires us to think visually for a moment.  The best way to understand what is happening inside of a recursive function is to consider [fractal pictures](http://www.stsci.edu/~lbradley/seminar/fractals.html) or a [factal video](https://www.youtube.com/watch?v=G_GBwuYuOOs)  

Here is an example of a very simple recursive function:

```
var fib = function(n){
	if(n == 0)
		return 0;
	if(n == 1)
		return 1;
	if(n == 2)
		return 1;
	else
		return fib(n-1) + fib(n-2);
}

```

Here the function fib is called inside itself with ever decreasing values being passed in.  Notice that the function returns the result of the two function calls.  This begins the recursive process and will continue until n is equal to 0,1, or 2.  Once those conditions are met, the internal functions will move up the recursive chain returning all intermediate values and completing all calculations.  The final result will then be returned once all calculations are completed.

The same holds for the traversal in the binary tree definition above.

```
BinaryTree.prototype.prettyPrint = function(){
	var cur = this.head;
	prettyPrint(cur);
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
```

Let's look at the pretty print method, as shown above. 

This method will print the tree in order - starting with the smallest element and then going to the largest.

The traversal starts by checking if the left node exists and then calling pretty print on it, assuming it does.  Then it prints out the value of the current node, and finally the right.  

Thus if we append elements to the tree as follows:

```
var tree = new BinaryTree();
tree.append(2);
tree.append(1);
tree.append(3);
```

They will be printed in order: 1,2,3

Notice this is because we add elements to the tree, under the ordering of the natural numbers.  Thus the actual order of our appending shouldn't matter.  This is great if we need to maintain an ordered list!  Inserting and removal into such a structure is also requires far less computation.  In fact an insertion or removal that takes n steps in a linked list, will take log(n) steps in a binary tree!  

##Graphs

Now that we understand linked lists and trees, we are ready to understand the graph.  A graph is the most general data structure we've seen so far.  In fact, linked lists can be thought of as a special case of a tree, and in turn a tree can be thought of as a special case of a graph.  Linked lists are special cases of trees in that they only have one reference to the next.  Trees are special cases of graphs since they are directed.  By relaxing both the only one reference, and relaxing the fact that a node must be a reference in only one direction, we have a very powerful and complex data structure.

For those of you unfamiliar with graphs already I recommend the following graphical representation as a [visual aid](https://www.flickr.com/photos/kentbye/1156410748/).

As the picture shows, a graph is represented as a series of nodes and edges connecting those nodes.  So all we need, is an understanding of the relationships between a given node pair, and then we store the edge connecting them.  An edge is typically represented as a line visually and as a pair of nodes in words.

###Our example

There aren't any new programming concepts in a graph, at least not for the graph I built.  In general there are number of problems that graphs describe well and the solutions to such problems lend them selves to a set of general algorithms that seem to work on all graphs.  Most of these problems and solutions revolve around graph traversal and metrics on graphs.  By measuring a graph one is able to understand much about its contents, without looking at any of its individual elements.  

Examples of uses of graph based analysis include social network analysis, computer networking, entropy of a system, and more.   

###A graph data structure:

```
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

```

The code here makes use of javascript arrays heavily, this allows our graph to remain extremely simple.  We also store a fair bit of knowledge in our nodes, allowing the connections to remain trivial to traverse.

Now that we understand the underpinnings of modern data structures lets take advantage of a few libraries, so we can get stuff done :)

##Some libraries

###Mori

The official docs can be found [here](http://swannodette.github.io/mori/)

Mori is extremely powerful - it gives you access to lists, sequences, hash maps, sorted hash maps, and a few more wonderful data structures.

Here are some examples:

####enumerate:
```
var xs = mori.range(10);
mori.each(xs, function(n) {
console.log(n);
});

```

####store:
```
//in a vector
var vec = mori.vector(1,2,3);
mori.nth(vec,1);
//in a hashmap
var map = mori.hashMap("hello",1);
mori.get(map,"hello");
//in sorted map 
var sorted_map = mori.sorted_map(2, "two", 3, "three", 1, "one");
mori.get(sorted_map, 2);
```

###Buckets-js

As powerful as Mori is, the syntax is very functional.  So I also include [buckets-js](https://github.com/mauriciosantos/buckets).  Buckets isn't as fully featured and it doesn't give you a way to enumerate, but it is object oriented, which is nice for data structures.


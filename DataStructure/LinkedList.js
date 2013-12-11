function Node(data){
	this.data = data;
	this.next = null;
}

function LinkedList1(){
	this.head = null; //head of linkedlist
	this.node = null; //tail of linkedlist
};

LinkedList1.prototype.insert = function(input){

	if (this.node === null) {
		this.node = new Node(input);
		this.head = this.node;
		console.log(this.node);
	}else{
		while (this.node.next ) {
			this.node = this.node.next;
		}
		var new_node = new Node(input);
		this.node.next = new_node;
		console.log(this.head);
	}
};

//to find the 2nd to last node
LinkedList1.prototype.scndlast = function() {
	var sndlast = this.head;
	while (sndlast.next.next){
		sndlast = sndlast.next;
	}
	//console.log("2nd to last is");
	//console.log(sndlast);
	return sndlast;
};

LinkedList1.prototype.delete = function(input) {
	//next = this.head.next;
	while (input > 0){
			//var temp = this.node;
			this.node = this.scndlast();
			this.node.next = null;
			//delete temp;
			input -= 1;

	}
	console.log(this.head);
};

LinkedList1.prototype.print = function() {
	output = [];
	current = this.head;
	//output += current.data;
	while (current){
		output.push(current.data);
		current = current.next;
	}
	console.log(output);
};


// test cases
ll = new LinkedList1();
ll.insert("hello");
ll.insert("class");
ll.insert("b");
ll.insert("c");
ll.insert("d");
ll.delete(2);
ll.insert("world");
ll.print();
//console.log("haha it works");
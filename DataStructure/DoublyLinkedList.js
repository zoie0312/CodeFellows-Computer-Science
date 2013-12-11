var Node = function (data){
	this.data = data;
	this.next = null;
	this.previous = null;
}

function print_node(node){
	console.log(node);
}

var DoublyLinkedList = function(){
	this.node = null; // last node of the linkedlist
}

// find the head of the linkedlist
DoublyLinkedList.prototype.findhead = function(){
	var head = this.node;

	while ((head != null) && (head.previous != null)){
		head = head.previous;
	}

	return head;

}

// print the linkedlist from head to tail by only using node's "next" property
// to check if each node is correctly connected with "next"
DoublyLinkedList.prototype.printHeadtoTail = function(){
	console.log("\n" + "***Print List from Head to Tail***");
	var head = this.findhead();
	while (head != null){
		console.log(head.data);
		if (head.next != null){
			console.log("==>");
		}

		head = head.next;
	}

}

// print the linkedlist from tail to head by only using node's "previous" property
// to check if each node is correctly connected with "previous"
DoublyLinkedList.prototype.printTailtoHead = function(){
	console.log("***Print List from Tail to Head***");
	var tail = this.node;
	while (tail != null){
		console.log(tail.data);
		if (tail.previous != null){
			console.log("<==");
		}

		tail = tail.previous;
	}

}

DoublyLinkedList.prototype.append = function(data){
	if (this.node === null){
		var node = new Node(data);
		this.node = node;
		//var head = this.node;
	}else{
		var node = new Node(data);
		var tmp = this.node;
		tmp.next = node;
		node.previous = tmp;
		this.node = node; //update this.node
	}

}


DoublyLinkedList.prototype.prepend = function(data){
	if (this.node === null){
		var node = new Node(data);
		this.node = node;

	}else{
		var head = this.findhead();
		var node = new Node(data);
		node.next = head;
		head.previous = node;
	}

}

DoublyLinkedList.prototype.pop_front = function(callback){
	var head = this.findhead();
	var new_head = head.next;
	new_head.previous = null;
	head.next = null;
	console.log("\n" + "poped");
	callback(head);
}

DoublyLinkedList.prototype.pop_back = function(callback){
	var tail = this.node;
	var new_tail = this.node.previous;
	tail.previous = null;
	new_tail.next = null;
	this.node = new_tail; //update this.node
	console.log("\n" + "poped");
	callback(tail);
}


/**********Test Cases*************************/
var ll = new DoublyLinkedList();
ll.append("BBB");
ll.printHeadtoTail();
ll.printTailtoHead();
//***Print List from Head to Tail***
//BBB
//***Print List from Tail to Head***
//BBB

ll.append("CCC");
ll.printHeadtoTail();
ll.printTailtoHead();
//***Print List from Head to Tail***
//BBB
//==>
//CCC
//***Print List from Tail to Head***
//CCC
//<==
//BBB

ll.prepend("AAA");
ll.printHeadtoTail();
ll.printTailtoHead();
//***Print List from Head to Tail***
//AAA
//==>
//BBB
//==>
//CCC
//***Print List from Tail to Head***
//CCC
//<==
//BBB
//<==
//AAA

ll.pop_front(print_node);
ll.printHeadtoTail();
ll.printTailtoHead();
//poped
//{ data: 'AAA', next: null, previous: null }
//
//***Print List from Head to Tail***
//BBB
//==>
//CCC
//***Print List from Tail to Head***
//CCC
//<==
//BBB

ll.pop_back(print_node);
ll.printHeadtoTail();
ll.printTailtoHead();
//poped
//{ data: 'CCC', next: null, previous: null }
//
//***Print List from Head to Tail***
//BBB
//***Print List from Tail to Head***
//BBB

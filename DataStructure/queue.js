var Node = function(data){
	this.data = data;
	this.next = null;
};

var Queue = function(){
	this.head = null;
}

Queue.prototype.enqueue = function(data) {
	if (this.head === null){
		new_node = new Node(data);
		this.head = new_node;
	}else{
		var tail = this.head;
		while (tail.next != null){
			tail = tail.next;
		}
		new_node = new Node(data);
		tail.next = new_node;
		//console.log(tail.next.data);
	}

}

Queue.prototype.dequeue = function(callback){
	//console.log(this.head.data);
	if (this.head === null){
		var err = "Empty";
		var value = null;
		//callback(err, null);
	}else{
		var err = null;
		var value = this.head.data;
		new_head = this.head.next;
		this.head.next = null;
		this.head = new_head;
	}
	callback(err, value);
};

Queue.prototype.size = function(){
	if (this.head != null){
		var n = 1;
		var tail = this.head;
		while(tail.next != null){
			n += 1;
			tail = tail.next;

		}
		return n;
	}
	return 0;
}

var print_out_data = function(msg, data){
	if (msg == null){
		console.log(data + " has been removed");
		//return data;
	}
	else{
		console.log(msg);
		//return null;
	}
};

qq = new Queue();
qq.enqueue(3);
qq.enqueue(4);
console.log("size= " + qq.size());
//size= 2
qq.dequeue(print_out_data);
//3 has been removed
console.log("size= " + qq.size());
//size= 1
qq.dequeue(print_out_data);
//4 has been removed
qq.dequeue(print_out_data);
//Empty
console.log("size= " + qq.size());
//size= 0
var Node = function(data){
	this.data = data;
	this.next = null;

};
var Stack = function(){
	this.head = null;
};

Stack.prototype.push = function(data){
	if (this.head === null){
		new_node = new Node(data);
		this.head = new_node;
	}else{
		new_node = new Node(data);
		new_node.next = this.head;
		this.head = new_node;
	}
};

Stack.prototype.pop = function(callback){
	if (this.head === null){
		var err = "Underflow";
		callback(err, null);
		//return null;
	}else{
		var output = this.head.data;
		var err = null;
		new_head = this.head.next;
		this.head.next = null;
		this.head = new_head;
		callback(err, output);
		//return output;
	}
};

var pop_out_data = function(msg, data){
	if (msg == null){
		console.log(data + " has been poped out");
		//return data;
	}
	else{
		console.log(msg);
		//return null;
	}
};



var ss1 = new Stack();
ss1.push(6);
ss1.push(3);
ss1.push(1);
ss1.pop(pop_out_data);
ss1.pop(pop_out_data);
ss1.pop(pop_out_data);
ss1.pop(pop_out_data);
//1 has been poped out
//3 has been poped out
//6 has been poped out
//Underflow


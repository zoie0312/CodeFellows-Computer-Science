var PriorityQ = function(){
	this.queue = []; //implement priority queue as a heap, usually an array

}

PriorityQ.prototype.empty = function(){ //return true if the proority queue is empty
	if (this.queue.length == 0)
		return true;
	else
		return false;
}

PriorityQ.prototype.insert = function(p){ //insert a node with priority p into the priority queue
	if (this.empty()){
		this.queue = [, p];
	}else {
		this.queue.push(p);

		//keep "promoting" p until it is at right position
		var child_idx = this.queue.length-1;
		var parent_idx = Math.floor(child_idx / 2);
		var in_position = false;
		while (!in_position){
			if (child_idx == 1)
				in_position = true;
			else if (this.queue[parent_idx] > this.queue[child_idx])
				in_position = true;
			else {
				this.queue[0] = this.queue[parent_idx];
				this.queue[parent_idx] = this.queue[child_idx];
				this.queue[child_idx] = this.queue[0];
				child_idx = parent_idx;
				parent_idx = Math.floor(child_idx / 2);
			}
		}

	}

}

//remove and return the highest priority within the priority queue
//(error if the priority queue is empty)
PriorityQ.prototype.removeMax = function(){
	if (this.empty())
		throw "the queue is empty";
	else{
		var max = this.queue[1];
		this.queue[1] = this.queue[this.queue.length-1]; //replace root with last
		this.queue.pop();

		//keep switching with bigger child until the queue is in order again
		var in_position = false;
		var parent_idx = 1;
		while(!in_position){
			if ((parent_idx * 2 +1) <= this.queue.length-1){ //this node has 2 children
				if (this.queue[parent_idx*2] > this.queue[parent_idx*2+1]){
					var max_child = this.queue[parent_idx*2];
					var max_child_idx = parent_idx * 2;
				}else{
					var max_child = this.queue[parent_idx*2 +1];
					var max_child_idx = parent_idx * 2 + 1;
				}

				if (this.queue[parent_idx] < max_child){
					this.queue[0] = this.queue[parent_idx];
					this.queue[parent_idx] = max_child;
					this.queue[max_child_idx] = this.queue[0];
					parent_idx = max_child_idx;

				}else{
					in_position = true;
				}
			}else if(parent_idx * 2 == this.queue.length-1){ //this node has only on child which is the last in queue
				if (this.queue[parent_idx] < this.queue[parent_idx * 2]){
					this.queue[0] = this.queue[parent_idx];
					this.queue[parent_idx] = this.queue[parent_idx * 2];
					this.queue[parent_idx * 2] = this.queue[0];
					parent_idx = parent_idx * 2;
				}else {
					in_position = true;
				}
			}else{ //no more child to compare with
				in_position = true;
			}

		}

		return max;
	}

}

// helper function to print out the whole queue
PriorityQ.prototype.print = function(){
	//console.log ("[");
	var queueString = ""
	for (var i=1; i<this.queue.length; i++)
		queueString += this.queue[i] + ", ";

	console.log ("[" + queueString +"]");
}

/*******test cases*********/
pQ = new PriorityQ();
pQ.insert(1);
pQ.insert(2);
pQ.insert(4);
pQ.insert(5);
pQ.insert(6);
pQ.insert(3);
pQ.print(); //[6, 5, 3, 1, 4, 2, ]
pQ.removeMax();
pQ.insert(4.5);
pQ.print(); //[5, 4, 4.5, 1, 2, 3, ]
pQ1 = new PriorityQ();
pQ1.removeMax(); //the queue is empty

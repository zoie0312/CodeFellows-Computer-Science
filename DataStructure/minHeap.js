var MinHeap = function(heaped_arr){ // a Heap which min is on root
	this.arr = heaped_arr || (new Array());

}

MinHeap.prototype.getPartialHeapArray = function(end_idx){
	return this.arr.slice(0, end_idx+1);
}

MinHeap.prototype.setHeapArray = function(heaped_arr){
	this.arr = heaped_arr;
}

MinHeap.prototype.insert = function(value){
	if (this.arr.length == 0)
		this.arr.push(value);
	else{

		var not_in_position = true;
		child_idx = this.arr.length;
		this.arr.push(value);
		while(not_in_position){
			not_in_position = false;
			var parent_idx = Math.ceil(child_idx / 2) - 1;
			if (this.arr[parent_idx] > this.arr[child_idx]){
				var temp = this.arr[parent_idx];
				this.arr[parent_idx] = this.arr[child_idx];
				this.arr[child_idx] = temp;
				child_idx = parent_idx;
				not_in_position = true;
			}

		}
	}
}

MinHeap.prototype.delete = function(value){ //delete a specific node
	for(var i=0; i<this.arr.length; i++){
		if (this.arr[i] == value){
			var parent_idx = i;
			var left_child_idx = parent_idx * 2 +1;
			if (left_child_idx < this.arr.length){
				var right_child_idx = left_child_idx + 1;
				if (right_child_idx < this.arr.length){
					if (this.arr[left_child_idx] < this.arr[right_child_idx]){
						var temp = this.arr[left_child_idx];
						this.delete(this.arr[left_child_idx]);
						//console.log("4444")
						this.arr[parent_idx] = temp;

					}else{
						var temp = this.arr[right_child_idx];
						//console.log(parent_idx);
						//console.log(temp);
						this.delete(this.arr[right_child_idx]);
						//console.log(this.arr, parent_idx);
						this.arr[parent_idx] = temp;
						//console.log(this.arr);

					}
				}else{
					this.arr[parent_idx] = this.arr[left_child_idx];
					this.arr.pop(this.arr[left_child_idx]);
				}
			}else{
				var tmp_array = this.arr.slice(0, i);
				var tmp_heap = new MinHeap(tmp_array);
				//tmp_heap.printHeap();
				for (var j=i+1; j<this.arr.length; j++ ){

					tmp_heap.insert(this.arr[j]);

				}
				this.arr = tmp_heap.getPartialHeapArray(this.arr.length-2);
				//console.log(this.arr);
			}
		}
	}
	return;
}

MinHeap.prototype.printHeap = function(){
	console.log(this.arr);
}

/************Test cases**************/
var myHeap = new MinHeap();
myHeap.insert(14);
myHeap.insert(10);
myHeap.insert(12);
myHeap.insert(8);
myHeap.insert(7);
myHeap.insert(5);
myHeap.insert(3);
myHeap.insert(1);
myHeap.printHeap(); //[ 1, 3, 5, 8, 10, 12, 7, 14 ]
myHeap.delete(1);
myHeap.printHeap(); //[ 3, 8, 5, 14, 10, 12, 7 ]

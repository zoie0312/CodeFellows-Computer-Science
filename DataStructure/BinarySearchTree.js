var Node = function(data){
	this.data = data;
	this.left = null;
	this.right = null;
};

var BinaryTree = function(array){
	this.root = null;
	if (array.length === 0){

	}else {
		var new_node = new Node(array[0]);
		this.root = new_node;
		for (i=1; i < array.length; i++){
			var new_node = new Node(array[i]);
			var start = this.root;
			var not_attached = true;
			while (not_attached){
				if (new_node.data < start.data){
					if (start.left === null){
						start.left = new_node;
						not_attached = false;
					}else{
						start = start.left;
					}
				}else{
					if (start.right === null){
						start.right = new_node;
						not_attached = false;
					}else{
						start = start.right;
					}
				}
			}

		}
	}

};

BinaryTree.prototype.size = function(){
	if (this.root === null){
		return 0;
	}else{
		var start = this.root;
		return this.findbranches(start);
	}
};

BinaryTree.prototype.findbranches = function(node){
	var start = node;
	var n = 1;
	if (start.left != null){
		n += this.findbranches(start.left);

	}
	if (start.right != null){
		n += this.findbranches(start.right);

	}
	return n;
}

BinaryTree.prototype.height = function(){
	if (this.root === null){
		return 0;
	}else{
		var start = this.root;
		var layers_arr = [];
		this.checklayer(start, 1, layers_arr);
		//console.log(layers_arr);
		sorted_arr = layers_arr.sort();
		return sorted_arr[layers_arr.length-1];
	}
};

BinaryTree.prototype.checklayer = function(node, layer_no, layers_arr){
	var start = node;

	if (start.left === null && start.right === null){
		layers_arr.push(layer_no);
		//console.log(start.data);
		return;
	}
	else{
		layer_no += 1;
		if (start.left != null){
			this.checklayer(start.left, layer_no, layers_arr);
		}
		if (start.right != null){
			this.checklayer(start.right, layer_no, layers_arr);
		}

	}

	return;
}

BinaryTree.prototype.contains = function(data){

	return this.dataequal(this.root, data);

};

//check if data == node.data
BinaryTree.prototype.dataequal = function(node, data){
	var result = false;
	var end = node;
	if (end.data === data){
		result = true;
	}
	else{
		if (end.left != null){
			result = result || this.dataequal(end.left, data);
		}
		if (end.right != null){
			result = result || this.dataequal(end.right, data);
		}

	}
	return result;

}

BinaryTree.prototype.delete = function(data){
	if (!this.contains(data)){
		console.log(data + " is not in Tree");
		return;
	}else{
		if (this.root.data === data){

			if (this.root.left.right === null){
				this.root.left.right = this.root.right;
				this.root = this.root.left;

			}else{
				var left_max = this.root.left;
				var left_max_up = this.root;
				while (left_max.right != null){
					left_max_up = left_max;
					left_max = left_max.right;
				}
				console.log("left_max= " + left_max.data);
				console.log("left_max_up= " + left_max_up.data);
				if (left_max.left === null){
					this.delete(left_max.data);
					left_max.left = this.root.left;
					left_max.right = this.root.right;
					this.root.left = this.root.right = null;
					this.root = left_max;
				}else{
					this.delete(left_max.data);
					left_max.left = this.root.left;
					left_max.right = this.root.right;
					this.root.left = this.root.right = null;
					this.root = left_max;
				}

			}

		}else{
			var found_node = false;
			var target = this.root;
			var target_from = this.root;

			//to find what we want to delete
			while (!found_node){
				if (target.data === data){
					found_node = true;
				}else{
					target_from = target;
					if (data < target.data){
						target = target.left;
					}else{
						target = target.right;
					}
				}
			}
			console.log("found node = "+ target.data);

			if (target.right === null && target.left === null){
				if (target_from.left === target){
					target_from.left = null;
				}
				if (target_from.right === target){
					target_from.right = null;
				}
			}
			else if(target.right === null){
				if (target_from.left === target){
					target_from.left = target.left;
					target.left = null;
				}
				if (target_from.right === target){
					target_from.right = target.left;
					target.left = null;
				}

			}
			else if(target.left === null){
				if (target_from.left === target){
					target_from.left = target.right;
					target.right = null;
				}
				if (target_from.right === target){
					target_from.right = target.right;
					target.right = null;
				}
			}
			else{
				var left_max = target.left;
				var left_max_up = target;
				while (left_max.right != null){
					left_max_up = left_max;
					left_max = left_max.right;
				}
				console.log("left_max= " + left_max.data);
				console.log("left_max_up= " + left_max_up.data);
				if (left_max.left === null){
					this.delete(left_max.data);
					if (target_from.left === target){
						target_from.left = left_max;
					}else if(target_from.right === target){
						target_from.right = left_max;
					}

					left_max.left = target.left;
					left_max.right = target.right;
					//target.left = target.right = null;
					/*if (target_from.left === target){
						target_from.left = left_max;
					}
					else{
						target_from.right = left_max;
					}*/
					//this.root = left_max;
				}else{
					this.delete(left_max.data);
					if (target_from.left === target){
						target_from.left = left_max;
					}
					else if(target_from.right === target){
						target_from.right = left_max;
					}
					left_max.left = target.left;
					left_max.right = target.right;
					target.left = target.right = null;

				}

			}

		}

	}
}


//var arr = [1, 4, 3, 0, 10, 6, 7];
var arr = [4, 2, 5, 1, 3, 4.6, 6, 0.5, 1.5, 2.5, 3.5, 10, 1.2];
//var arr = [1, 4, 3, 0];
var bt = new BinaryTree(arr);
//console.log(bt.root);
console.log(bt.size());
//7
console.log(bt.contains(6));
//true
console.log(bt.contains(16));
//false
console.log(bt.height());
//4
bt.delete(2);
console.log(bt.height());
console.log(bt.size());
console.log(bt.contains(2));
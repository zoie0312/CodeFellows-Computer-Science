//merge sort pth to rth elements of an array
function mergeSortRoutine(array, p, r){

	if ((r-p) < 1){
		return;
	}else if((r-p) == 1){
		if (array[r] < array[p]){
			temp = array[r];
			array[r] = array[p];
			array[p] = temp;
		}
		return;

	}
		//return;
	var mid = Math.floor((p+r) / 2);

	mergeSortRoutine(array, p, mid);
	mergeSortRoutine(array, mid+1, r);

	//var left_idx = 0;
	var right_idx = mid+1;
	for (var i=p; i<=r; i++){
		//console.log (p, r, array);
		if (right_idx > r)
			break;

		if (i == right_idx)
			right_idx += 1;

		if(array[right_idx] < array[i]){
			temp = array[right_idx];
			for (j=right_idx; j>i; j--){
				array[j] = array[j-1];
			}
			array[i] = temp;

			right_idx += 1;

		}else{
			//right_idx -= 1;
			//i -= 1;
		}
		//right_idx += 1;
	}
	//console.log(array);
	return;
}

var mergeSort = function(array){
	if (array.length <= 1)
		return array;

	var mid = Math.floor(array.length/2);
	var sorted_left = mergeSort(array.slice(0, mid));
	var sorted_right = mergeSort(array.slice(mid, array.length));
	//console.log("left sorted=" + sorted_left);
	//console.log("right sorted=" + sorted_right);

	var sorted_arr = [];
	while(sorted_left.length > 0 || sorted_right.length > 0){
		if (sorted_left.length == 0){
			sorted_arr = sorted_arr.concat(sorted_right);
			break;
		}else if(sorted_right.length == 0){
			sorted_arr = sorted_arr.concat(sorted_left);
			break;
		}
		var ele = (sorted_left[0] < sorted_right[0]) ? sorted_left.shift() : sorted_right.shift();
		sorted_arr.push(ele);
	}
	return sorted_arr;
}

// do in place merge sort
var mergeSort2 = function(Array){
	console.log("initial Array= " + Array);
	mergeSortRoutine(Array, 0, Array.length-1);
	console.log("final Array= " + Array); //final Array= 1,2,3,4,5,6,8,9,20
}

/**********test cases***************/
var array = [8, 2, 4, 5, 6, 1, 9, 20, 3];
console.log("input array= " + array);
//mergeSort2(array);
new_arr = mergeSort(array);
console.log("merge sorted array= " + new_arr); //output array= 1,2,3,4,5,6,8,9,20
mergeSort2(array);

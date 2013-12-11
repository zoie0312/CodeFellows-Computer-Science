function mergeSortRoutine(array, p, r){
	//merge sort pth to rth elements of an array
	//console.log("input= " + array);
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
	//var left = array.slice(0, mid);
	//var right = array.slice(mid, array.length);
	mergeSortRoutine(array, p, mid);
	mergeSortRoutine(array, mid+1, r);


	/*while (left_idx < array.length-1 && right_idx < array.length){
		if(array[left_idx] < array[right_idx]){


		}else {
			temp = array[right_idx];
			array[right_idx] = array[left_idx];
			array[left_idx] = temp;
			temp = array[left_idx+1];
			array[left_idx+1] = array[right_idx];
			array[right_idx] = temp;
			right_idx += 1;

		}
		left_idx += 1;
	}*/
	//var left_idx = 0;
	var right_idx = mid+1;
	for (var i=p; i<=r; i++){
		console.log (p, r, array);
		if (right_idx > r)
			break;
		//if (i > right_idx)
		//	break;
			//right_idx = array.length-1;
		if (i == right_idx)
			right_idx += 1;

		if(array[right_idx] < array[i]){
			temp = array[right_idx];
			for (j=right_idx; j>i; j--){
				array[j] = array[j-1];
			}
			array[i] = temp;
			/*temp = array[i];
			array[i] = array[right_idx];
			array[right_idx] = temp;
			if (i+1 < mid){
				temp = array[i+1];
				array[i+1] = array[right_idx];
				array[right_idx] = temp;

			}*/

			//i += 1;
			right_idx += 1;

		}else{
			//right_idx -= 1;
			//i -= 1;
		}
		//right_idx += 1;
	}



	/*var sorted_arr = [];
	//var leftEle = sorted_left.shift
	while (sorted_left.length > 0 || sorted_right.length > 0 ){
		if (sorted_left.length == 0){
			sorted_arr = sorted_arr.concat(sorted_right);
			sorted_right = [];
			break;
		}
		if (sorted_right.length == 0){
			sorted_arr = sorted_arr.concat(sorted_left);
			break;
		}
		var ele = (sorted_left[0] < sorted_right[0]) ? sorted_left.shift() : sorted_right.shift();
		sorted_arr.push(ele);

	}*/
	console.log(array);
	//return sorted_arr;
	return;

}

var mergeSort = function(Array){
	console.log("initial Array= " + Array);
	mergeSortRoutine(Array, 0, Array.length-1);
	console.log("final Array= " + Array);

}
var array = [8, 2, 4, 5, 6, 1, 9, 20, 3];
//console.log("input array= " + array);
mergeSort(array);
console.log("output array= " + array);
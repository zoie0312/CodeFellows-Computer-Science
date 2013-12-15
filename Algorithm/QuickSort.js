//partition array so that each element before index b is smaller than array[b]
// and each element after index b is bigger than array[b]
function partition(array, a, c){
	if (c == a+1){
		if (array[a] > array[c]){
			var temp = array[a];
			array[a] = array[c];
			array[c] = temp;
		}
		return a;
	}

	var pivot_idx = Math.floor(Math.random()*(c-a)) + a;
	console.log("pivot_idx " + pivot_idx);
	var pivot = array[pivot_idx];
	var new_pivot_idx = a;
	var temp;
	for (var i=a; i<=c; i++){
		if (i == pivot_idx) //keep pivot at the same place
			i += 1;
		if (new_pivot_idx == pivot_idx) //keep pivot at the same place
			new_pivot_idx += 1;

		if (array[i] < pivot){
			temp = array[new_pivot_idx];
			array[new_pivot_idx]  = array[i];
			array[i] = temp;
			new_pivot_idx += 1;
		}

	}

	if (new_pivot_idx >= pivot_idx)
		new_pivot_idx -= 1;
	//console.log("partition array= " + array);
	if (new_pivot_idx != pivot_idx){
		array[pivot_idx] = array[new_pivot_idx];
		array[new_pivot_idx] = pivot;
	}

	//array[b] = pivot;
	//console.log("partitioned array= " + array);
	//console.log("new_pivot_idx= " + new_pivot_idx);
	return new_pivot_idx;
}

function QuickSortRoutine(array, p, r){ //in place sort array from pth to rth element
	if (p >= r)
		return;

	var q = partition(array, p, r);
	QuickSortRoutine(array, p, q-1);
	QuickSortRoutine(array, q+1, r);
	return;
}

function QuickSort(array){
	if (array.length == 0){
		console.log("input array is empty");
		return;
	}else{
		QuickSortRoutine(array, 0, array.length-1);
	}

}

/**********test cases***********/
var arr = [11,10,9,8,7,6,5];
console.log("input array=");
console.log(arr);
QuickSort(arr);
console.log("after sorted, array=");
console.log(arr);
//partition(arr, 0, 6);
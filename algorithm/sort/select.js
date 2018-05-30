function swap(i,j,array){
	const temp = array[j];
	array[j] = array[i];
	array[i] = temp;
}

function selectSort(array) {
	let length = array.length, min;
	for (let i = 0; i < length - 1; i++) {
		min = i;
		for (let j = i + 1; j < length; j++) {
			if(array[j] < array[min]) {
				min = j; //记住最小数的下标
			}
		}
		if(min !== i) {
			swap(i,min,array);
		}
	}
	return array;
}
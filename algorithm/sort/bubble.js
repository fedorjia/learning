function swap(i,j,array){
	const temp = array[j];
	array[j] = array[i];
	array[i] = temp;
}

function bubbleSort(array) {
	let length = array.length, isSwap;
	for (let i = 0; i < length; i++) {            //正序
		isSwap = false;
		for (let j = 0; j < length - 1 - i; j++) {     //正序
			if(array[j] > array[j+1]) {
				isSwap = true;
				swap(j,j+1,array);
			}
		}
		if(!isSwap)
			break;
	}
	return array;
}
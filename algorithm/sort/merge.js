/***
 * 1. 把长度为n的输入序列分成两个长度为n/2的子序列；
 * 2. 对这两个子序列分别采用归并排序（重复步骤一）；
 * 3. 将两个排序好的子序列合并成一个最终的排序序列。(index=0依次移除比较)
 */
function mergeSort(arr) {  //采用自上而下的递归方法
	let len = arr.length;
	if(len < 2) {
		return arr;
	}
	let middle = Math.floor(len / 2),
		left = arr.slice(0, middle),
		right = arr.slice(middle);
	return merge(mergeSort(left), mergeSort(right));
}


function merge(left, right) {
	let result = [];
	while (left.length && right.length) {
		if (left[0] <= right[0]) { // 每次比较第一个元素，比较完毕即移除，继续下一轮比较
			result.push(left.shift());
		} else {
			result.push(right.shift());
		}
	}
	while (left.length) {
		result.push(left.shift());
	}
	while (right.length) {
		result.push(right.shift());
	}
	return result;
}
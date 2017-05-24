export function isPlainObject (obj) {
	if (Object.prototype.toString.call(obj) !== '[object Object]') {
		return false;
	}
	return true;
}

export function isPlainArray(array) {
	if (Object.prototype.toString.call(array) !== '[object Array]') {
		return false;
	}
	return true;
}
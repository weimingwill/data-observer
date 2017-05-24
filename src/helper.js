export function isPlainObject (obj) {
	if (Object.prototype.toString.call(obj) !== '[object Object]') {
		return false;
	}
	return true;
}
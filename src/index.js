/**
 * Created by zhuang_w-pc on 5/24/2017.
 */

import { isPlainObject } from './helper.js'

export class dataObserver {
	constructor(obj, callback) {
		if (!isPlainObject(obj)) {
			console.error("First argument of dataObserver must be an object: " + obj);
		}
		this.$callback = callback
		this.observe(obj)
	}

	observe(obj) {
		Object.keys(obj).forEach((key, index) => {
			let val = obj[key]
			Object.defineProperty(obj, key, {
				get: () => {
					return val
				},

				set: ((newVal) => {
					this.$callback(newVal)
				}).bind(this)
			})
		
			if (isPlainObject(obj[key])) {
				this.observe(obj[key])
			}
		})
	}
}
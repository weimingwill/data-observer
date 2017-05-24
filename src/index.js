/**
 * Created by zhuang_w-pc on 5/24/2017.
 */

import { 
	isPlainObject,

} from './helper.js'

const OVERRIDE_ARRAY_METHODS = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']

export class dataObserver {
	constructor(obj, callback) {
		if (!isPlainObject(obj)) {
			console.error("First argument of dataObserver must be an object: " + obj)
		}
		this.$callback = callback
		this.observe(obj)
	}
 	
	observe(obj) {
		Object.keys(obj).forEach((key, index) => {
			let oldVal = obj[key]
			Object.defineProperty(obj, key, {
				get: () => {
					return oldVal
				},

				set: ((newVal) => {
					this.$callback(newVal, oldVal)
					// oldVal = newVal
				}).bind(this)
			})
		
			if (isPlainObject(obj[key])) {
				this.observe(obj[key])
			}
		})
	}

	overrideArrayPrototype (array) {
		let originProto = Array.prototype,
			overrideProto = Object.create(Array.prototype),
			_this = this;

		Object.keys(OVERRIDE_ARRAY_METHODS).forEach(method => {
			Object.defineProperty(overrideProto, method, {
				value: () => {
					
				},
				writable: true,
				enumerable: false,
				configurable: true
			})
		});

	}
}
/**
 * Created by zhuang_w-pc on 5/24/2017.
 */

import { 
	isPlainObject,
	isPlainArray
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
 	
	observe(obj, path) {
		if (isPlainArray(obj)) {
			this.overrideArrayPrototype(obj, path)
		}

		Object.keys(obj).forEach(key => {
			let pathArray = path && path.slice()
			if (pathArray) {
				pathArray.push(key)
			} else {
				pathArray = [key]
			}
			let oldVal = obj[key]
			Object.defineProperty(obj, key, {
				get: () => {
					return oldVal
				},

				set: (newVal) => {
					if (oldVal !== newVal) {
						if (isPlainObject(newVal) || isPlainArray(newVal)) {
							this.observe(newVal, pathArray)
						}
						this.$callback(newVal, oldVal, pathArray)
					}	
				}
			})
		
			if (isPlainObject(obj[key]) || isPlainArray(obj[key])) {
				this.observe(obj[key], pathArray)
			}
		}, this)
	}

	overrideArrayPrototype (array, path) {
		let originProto = Array.prototype,
			overrideProto = Object.create(Array.prototype),
			_this = this,
			result

		Object.keys(OVERRIDE_ARRAY_METHODS).forEach((key, index) => {
			let method = OVERRIDE_ARRAY_METHODS[index]
			let oldArray = []

			Object.defineProperty(overrideProto, method, {
				// cannot use arrow function here, need to bind `this`
				value: function() {
					oldArray = this.slice()

					let arg = [].slice.apply(arguments)

					result = originProto[method].apply(this, arg)

					_this.observe(this, path)

					_this.$callback(this, oldArray, path)

					return result
				},
				writable: true,
				enumerable: false,
				configurable: true
			})
		}, this)

		array.__proto__ = overrideProto


	}
}
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
(function (global, factory) {

	"use strict";

	if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ? factory(global, true) : function (w) {
			if (!w.document) {
				throw new Error("jQuery requires a window with a document");
			}
			return factory(w);
		};
	} else {
		factory(global);
	}

	// Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : undefined, function (window, noGlobal) {

	// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
	// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
	// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
	// enough that all such attempts are guarded in a try block.
	"use strict";

	var arr = [];

	var document = window.document;

	var getProto = Object.getPrototypeOf;

	var _slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var fnToString = hasOwn.toString;

	var ObjectFunctionString = fnToString.call(Object);

	var support = {};

	function DOMEval(code, doc) {
		doc = doc || document;

		var script = doc.createElement("script");

		script.text = code;
		doc.head.appendChild(script).parentNode.removeChild(script);
	}
	/* global Symbol */
	// Defining this global in .eslintrc.json would create a danger of using the global
	// unguarded in another place, it seems safer to define global only for this module


	var version = "3.2.1",


	// Define a local copy of jQuery
	jQuery = function jQuery(selector, context) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init(selector, context);
	},


	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,


	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	    rdashAlpha = /-([a-z])/g,


	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function fcamelCase(all, letter) {
		return letter.toUpperCase();
	};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function toArray() {
			return _slice.call(this);
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function get(num) {

			// Return all the elements in a clean array
			if (num == null) {
				return _slice.call(this);
			}

			// Return just the one element from the set
			return num < 0 ? this[num + this.length] : this[num];
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function pushStack(elems) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge(this.constructor(), elems);

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function each(callback) {
			return jQuery.each(this, callback);
		},

		map: function map(callback) {
			return this.pushStack(jQuery.map(this, function (elem, i) {
				return callback.call(elem, i, elem);
			}));
		},

		slice: function slice() {
			return this.pushStack(_slice.apply(this, arguments));
		},

		first: function first() {
			return this.eq(0);
		},

		last: function last() {
			return this.eq(-1);
		},

		eq: function eq(i) {
			var len = this.length,
			    j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		},

		end: function end() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function () {
		var options,
		    name,
		    src,
		    copy,
		    copyIsArray,
		    clone,
		    target = arguments[0] || {},
		    i = 1,
		    length = arguments.length,
		    deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;

			// Skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ((typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object" && !jQuery.isFunction(target)) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {

			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {

				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

						if (copyIsArray) {
							copyIsArray = false;
							clone = src && Array.isArray(src) ? src : [];
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = jQuery.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function error(msg) {
			throw new Error(msg);
		},

		noop: function noop() {},

		isFunction: function isFunction(obj) {
			return jQuery.type(obj) === "function";
		},

		isWindow: function isWindow(obj) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function isNumeric(obj) {

			// As of jQuery 3.0, isNumeric is limited to
			// strings and numbers (primitives or objects)
			// that can be coerced to finite numbers (gh-2662)
			var type = jQuery.type(obj);
			return (type === "number" || type === "string") &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN(obj - parseFloat(obj));
		},

		isPlainObject: function isPlainObject(obj) {
			var proto, Ctor;

			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if (!obj || toString.call(obj) !== "[object Object]") {
				return false;
			}

			proto = getProto(obj);

			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if (!proto) {
				return true;
			}

			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
			return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
		},

		isEmptyObject: function isEmptyObject(obj) {

			/* eslint-disable no-unused-vars */
			// See https://github.com/eslint/eslint/issues/6125
			var name;

			for (name in obj) {
				return false;
			}
			return true;
		},

		type: function type(obj) {
			if (obj == null) {
				return obj + "";
			}

			// Support: Android <=2.3 only (functionish RegExp)
			return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
		},

		// Evaluates a script in a global context
		globalEval: function globalEval(code) {
			DOMEval(code);
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE <=9 - 11, Edge 12 - 13
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function camelCase(string) {
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
		},

		each: function each(obj, callback) {
			var length,
			    i = 0;

			if (isArrayLike(obj)) {
				length = obj.length;
				for (; i < length; i++) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android <=4.0 only
		trim: function trim(text) {
			return text == null ? "" : (text + "").replace(rtrim, "");
		},

		// results is for internal usage only
		makeArray: function makeArray(arr, results) {
			var ret = results || [];

			if (arr != null) {
				if (isArrayLike(Object(arr))) {
					jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
				} else {
					push.call(ret, arr);
				}
			}

			return ret;
		},

		inArray: function inArray(elem, arr, i) {
			return arr == null ? -1 : indexOf.call(arr, elem, i);
		},

		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge: function merge(first, second) {
			var len = +second.length,
			    j = 0,
			    i = first.length;

			for (; j < len; j++) {
				first[i++] = second[j];
			}

			first.length = i;

			return first;
		},

		grep: function grep(elems, callback, invert) {
			var callbackInverse,
			    matches = [],
			    i = 0,
			    length = elems.length,
			    callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for (; i < length; i++) {
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect) {
					matches.push(elems[i]);
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function map(elems, callback, arg) {
			var length,
			    value,
			    i = 0,
			    ret = [];

			// Go through the array, translating each of the items to their new values
			if (isArrayLike(elems)) {
				length = elems.length;
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}

				// Go through every key on the object,
			} else {
				for (i in elems) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply([], ret);
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function proxy(fn, context) {
			var tmp, args, proxy;

			if (typeof context === "string") {
				tmp = fn[context];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if (!jQuery.isFunction(fn)) {
				return undefined;
			}

			// Simulated bind
			args = _slice.call(arguments, 2);
			proxy = function proxy() {
				return fn.apply(context || this, args.concat(_slice.call(arguments)));
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	if (typeof Symbol === "function") {
		jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
	}

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});

	function isArrayLike(obj) {

		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
		    type = jQuery.type(obj);

		if (type === "function" || jQuery.isWindow(obj)) {
			return false;
		}

		return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
	}
	var Sizzle =
	/*!
  * Sizzle CSS Selector Engine v2.3.3
  * https://sizzlejs.com/
  *
  * Copyright jQuery Foundation and other contributors
  * Released under the MIT license
  * http://jquery.org/license
  *
  * Date: 2016-08-08
  */
	function (window) {

		var i,
		    support,
		    Expr,
		    getText,
		    isXML,
		    tokenize,
		    compile,
		    select,
		    outermostContext,
		    sortInput,
		    hasDuplicate,


		// Local document vars
		setDocument,
		    document,
		    docElem,
		    documentIsHTML,
		    rbuggyQSA,
		    rbuggyMatches,
		    matches,
		    contains,


		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		    preferredDoc = window.document,
		    dirruns = 0,
		    done = 0,
		    classCache = createCache(),
		    tokenCache = createCache(),
		    compilerCache = createCache(),
		    sortOrder = function sortOrder(a, b) {
			if (a === b) {
				hasDuplicate = true;
			}
			return 0;
		},


		// Instance methods
		hasOwn = {}.hasOwnProperty,
		    arr = [],
		    pop = arr.pop,
		    push_native = arr.push,
		    push = arr.push,
		    slice = arr.slice,

		// Use a stripped-down indexOf as it's faster than native
		// https://jsperf.com/thor-indexof-vs-for/5
		indexOf = function indexOf(list, elem) {
			var i = 0,
			    len = list.length;
			for (; i < len; i++) {
				if (list[i] === elem) {
					return i;
				}
			}
			return -1;
		},
		    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",


		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",


		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",


		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
		    pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" + ")\\)|)",


		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp(whitespace + "+", "g"),
		    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
		    rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
		    rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
		    rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
		    rpseudo = new RegExp(pseudos),
		    ridentifier = new RegExp("^" + identifier + "$"),
		    matchExpr = {
			"ID": new RegExp("^#(" + identifier + ")"),
			"CLASS": new RegExp("^\\.(" + identifier + ")"),
			"TAG": new RegExp("^(" + identifier + "|[*])"),
			"ATTR": new RegExp("^" + attributes),
			"PSEUDO": new RegExp("^" + pseudos),
			"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
			"bool": new RegExp("^(?:" + booleans + ")$", "i"),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
		},
		    rinputs = /^(?:input|select|textarea|button)$/i,
		    rheader = /^h\d$/i,
		    rnative = /^[^{]+\{\s*\[native \w/,


		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
		    rsibling = /[+~]/,


		// CSS escapes
		// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
		    funescape = function funescape(_, escaped, escapedWhitespace) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ? escaped : high < 0 ?
			// BMP codepoint
			String.fromCharCode(high + 0x10000) :
			// Supplemental Plane codepoint (surrogate pair)
			String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
		},


		// CSS string/identifier serialization
		// https://drafts.csswg.org/cssom/#common-serializing-idioms
		rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
		    fcssescape = function fcssescape(ch, asCodePoint) {
			if (asCodePoint) {

				// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
				if (ch === "\0") {
					return "\uFFFD";
				}

				// Control characters and (dependent upon position) numbers get escaped as code points
				return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
			}

			// Other potentially-special ASCII characters get backslash-escaped
			return "\\" + ch;
		},


		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function unloadHandler() {
			setDocument();
		},
		    disabledAncestor = addCombinator(function (elem) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		}, { dir: "parentNode", next: "legend" });

		// Optimize for push.apply( _, NodeList )
		try {
			push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
			// Support: Android<4.0
			// Detect silently failing push.apply
			arr[preferredDoc.childNodes.length].nodeType;
		} catch (e) {
			push = { apply: arr.length ?

				// Leverage slice if possible
				function (target, els) {
					push_native.apply(target, slice.call(els));
				} :

				// Support: IE<9
				// Otherwise append directly
				function (target, els) {
					var j = target.length,
					    i = 0;
					// Can't trust NodeList.length
					while (target[j++] = els[i++]) {}
					target.length = j - 1;
				}
			};
		}

		function Sizzle(selector, context, results, seed) {
			var m,
			    i,
			    elem,
			    nid,
			    match,
			    groups,
			    newSelector,
			    newContext = context && context.ownerDocument,


			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

			results = results || [];

			// Return early from calls with invalid selector or context
			if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

				return results;
			}

			// Try to shortcut find operations (as opposed to filters) in HTML documents
			if (!seed) {

				if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
					setDocument(context);
				}
				context = context || document;

				if (documentIsHTML) {

					// If the selector is sufficiently simple, try using a "get*By*" DOM method
					// (excepting DocumentFragment context, where the methods don't exist)
					if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

						// ID selector
						if (m = match[1]) {

							// Document context
							if (nodeType === 9) {
								if (elem = context.getElementById(m)) {

									// Support: IE, Opera, Webkit
									// TODO: identify versions
									// getElementById can match elements by name instead of ID
									if (elem.id === m) {
										results.push(elem);
										return results;
									}
								} else {
									return results;
								}

								// Element context
							} else {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {

									results.push(elem);
									return results;
								}
							}

							// Type selector
						} else if (match[2]) {
							push.apply(results, context.getElementsByTagName(selector));
							return results;

							// Class selector
						} else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {

							push.apply(results, context.getElementsByClassName(m));
							return results;
						}
					}

					// Take advantage of querySelectorAll
					if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {

						if (nodeType !== 1) {
							newContext = context;
							newSelector = selector;

							// qSA looks outside Element context, which is not what we want
							// Thanks to Andrew Dupont for this workaround technique
							// Support: IE <=8
							// Exclude object elements
						} else if (context.nodeName.toLowerCase() !== "object") {

							// Capture the context ID, setting it first if necessary
							if (nid = context.getAttribute("id")) {
								nid = nid.replace(rcssescape, fcssescape);
							} else {
								context.setAttribute("id", nid = expando);
							}

							// Prefix every selector in the list
							groups = tokenize(selector);
							i = groups.length;
							while (i--) {
								groups[i] = "#" + nid + " " + toSelector(groups[i]);
							}
							newSelector = groups.join(",");

							// Expand context for sibling selectors
							newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
						}

						if (newSelector) {
							try {
								push.apply(results, newContext.querySelectorAll(newSelector));
								return results;
							} catch (qsaError) {} finally {
								if (nid === expando) {
									context.removeAttribute("id");
								}
							}
						}
					}
				}
			}

			// All others
			return select(selector.replace(rtrim, "$1"), context, results, seed);
		}

		/**
   * Create key-value caches of limited size
   * @returns {function(string, object)} Returns the Object data after storing it on itself with
   *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
   *	deleting the oldest entry
   */
		function createCache() {
			var keys = [];

			function cache(key, value) {
				// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
				if (keys.push(key + " ") > Expr.cacheLength) {
					// Only keep the most recent entries
					delete cache[keys.shift()];
				}
				return cache[key + " "] = value;
			}
			return cache;
		}

		/**
   * Mark a function for special use by Sizzle
   * @param {Function} fn The function to mark
   */
		function markFunction(fn) {
			fn[expando] = true;
			return fn;
		}

		/**
   * Support testing using an element
   * @param {Function} fn Passed the created element and returns a boolean result
   */
		function assert(fn) {
			var el = document.createElement("fieldset");

			try {
				return !!fn(el);
			} catch (e) {
				return false;
			} finally {
				// Remove from its parent by default
				if (el.parentNode) {
					el.parentNode.removeChild(el);
				}
				// release memory in IE
				el = null;
			}
		}

		/**
   * Adds the same handler for all of the specified attrs
   * @param {String} attrs Pipe-separated list of attributes
   * @param {Function} handler The method that will be applied
   */
		function addHandle(attrs, handler) {
			var arr = attrs.split("|"),
			    i = arr.length;

			while (i--) {
				Expr.attrHandle[arr[i]] = handler;
			}
		}

		/**
   * Checks document order of two siblings
   * @param {Element} a
   * @param {Element} b
   * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
   */
		function siblingCheck(a, b) {
			var cur = b && a,
			    diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;

			// Use IE sourceIndex if available on both nodes
			if (diff) {
				return diff;
			}

			// Check if b follows a
			if (cur) {
				while (cur = cur.nextSibling) {
					if (cur === b) {
						return -1;
					}
				}
			}

			return a ? 1 : -1;
		}

		/**
   * Returns a function to use in pseudos for input types
   * @param {String} type
   */
		function createInputPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === type;
			};
		}

		/**
   * Returns a function to use in pseudos for buttons
   * @param {String} type
   */
		function createButtonPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && elem.type === type;
			};
		}

		/**
   * Returns a function to use in pseudos for :enabled/:disabled
   * @param {Boolean} disabled true for :disabled; false for :enabled
   */
		function createDisabledPseudo(disabled) {

			// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
			return function (elem) {

				// Only certain elements can match :enabled or :disabled
				// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
				// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
				if ("form" in elem) {

					// Check for inherited disabledness on relevant non-disabled elements:
					// * listed form-associated elements in a disabled fieldset
					//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
					//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
					// * option elements in a disabled optgroup
					//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
					// All such elements have a "form" property.
					if (elem.parentNode && elem.disabled === false) {

						// Option elements defer to a parent optgroup if present
						if ("label" in elem) {
							if ("label" in elem.parentNode) {
								return elem.parentNode.disabled === disabled;
							} else {
								return elem.disabled === disabled;
							}
						}

						// Support: IE 6 - 11
						// Use the isDisabled shortcut property to check for disabled fieldset ancestors
						return elem.isDisabled === disabled ||

						// Where there is no isDisabled, check manually
						/* jshint -W018 */
						elem.isDisabled !== !disabled && disabledAncestor(elem) === disabled;
					}

					return elem.disabled === disabled;

					// Try to winnow out elements that can't be disabled before trusting the disabled property.
					// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
					// even exist on them, let alone have a boolean value.
				} else if ("label" in elem) {
					return elem.disabled === disabled;
				}

				// Remaining elements are neither :enabled nor :disabled
				return false;
			};
		}

		/**
   * Returns a function to use in pseudos for positionals
   * @param {Function} fn
   */
		function createPositionalPseudo(fn) {
			return markFunction(function (argument) {
				argument = +argument;
				return markFunction(function (seed, matches) {
					var j,
					    matchIndexes = fn([], seed.length, argument),
					    i = matchIndexes.length;

					// Match elements found at the specified indexes
					while (i--) {
						if (seed[j = matchIndexes[i]]) {
							seed[j] = !(matches[j] = seed[j]);
						}
					}
				});
			});
		}

		/**
   * Checks a node for validity as a Sizzle context
   * @param {Element|Object=} context
   * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
   */
		function testContext(context) {
			return context && typeof context.getElementsByTagName !== "undefined" && context;
		}

		// Expose support vars for convenience
		support = Sizzle.support = {};

		/**
   * Detects XML nodes
   * @param {Element|Object} elem An element or a document
   * @returns {Boolean} True iff elem is a non-HTML XML node
   */
		isXML = Sizzle.isXML = function (elem) {
			// documentElement is verified for cases where it doesn't yet exist
			// (such as loading iframes in IE - #4833)
			var documentElement = elem && (elem.ownerDocument || elem).documentElement;
			return documentElement ? documentElement.nodeName !== "HTML" : false;
		};

		/**
   * Sets document-related variables once based on the current document
   * @param {Element|Object} [doc] An element or document object to use to set the document
   * @returns {Object} Returns the current document
   */
		setDocument = Sizzle.setDocument = function (node) {
			var hasCompare,
			    subWindow,
			    doc = node ? node.ownerDocument || node : preferredDoc;

			// Return early if doc is invalid or already selected
			if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
				return document;
			}

			// Update global variables
			document = doc;
			docElem = document.documentElement;
			documentIsHTML = !isXML(document);

			// Support: IE 9-11, Edge
			// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
			if (preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {

				// Support: IE 11, Edge
				if (subWindow.addEventListener) {
					subWindow.addEventListener("unload", unloadHandler, false);

					// Support: IE 9 - 10 only
				} else if (subWindow.attachEvent) {
					subWindow.attachEvent("onunload", unloadHandler);
				}
			}

			/* Attributes
   ---------------------------------------------------------------------- */

			// Support: IE<8
			// Verify that getAttribute really returns attributes and not properties
			// (excepting IE8 booleans)
			support.attributes = assert(function (el) {
				el.className = "i";
				return !el.getAttribute("className");
			});

			/* getElement(s)By*
   ---------------------------------------------------------------------- */

			// Check if getElementsByTagName("*") returns only elements
			support.getElementsByTagName = assert(function (el) {
				el.appendChild(document.createComment(""));
				return !el.getElementsByTagName("*").length;
			});

			// Support: IE<9
			support.getElementsByClassName = rnative.test(document.getElementsByClassName);

			// Support: IE<10
			// Check if getElementById returns elements by name
			// The broken getElementById methods don't pick up programmatically-set names,
			// so use a roundabout getElementsByName test
			support.getById = assert(function (el) {
				docElem.appendChild(el).id = expando;
				return !document.getElementsByName || !document.getElementsByName(expando).length;
			});

			// ID filter and find
			if (support.getById) {
				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						return elem.getAttribute("id") === attrId;
					};
				};
				Expr.find["ID"] = function (id, context) {
					if (typeof context.getElementById !== "undefined" && documentIsHTML) {
						var elem = context.getElementById(id);
						return elem ? [elem] : [];
					}
				};
			} else {
				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
						return node && node.value === attrId;
					};
				};

				// Support: IE 6 - 7 only
				// getElementById is not reliable as a find shortcut
				Expr.find["ID"] = function (id, context) {
					if (typeof context.getElementById !== "undefined" && documentIsHTML) {
						var node,
						    i,
						    elems,
						    elem = context.getElementById(id);

						if (elem) {

							// Verify the id attribute
							node = elem.getAttributeNode("id");
							if (node && node.value === id) {
								return [elem];
							}

							// Fall back on getElementsByName
							elems = context.getElementsByName(id);
							i = 0;
							while (elem = elems[i++]) {
								node = elem.getAttributeNode("id");
								if (node && node.value === id) {
									return [elem];
								}
							}
						}

						return [];
					}
				};
			}

			// Tag
			Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
				if (typeof context.getElementsByTagName !== "undefined") {
					return context.getElementsByTagName(tag);

					// DocumentFragment nodes don't have gEBTN
				} else if (support.qsa) {
					return context.querySelectorAll(tag);
				}
			} : function (tag, context) {
				var elem,
				    tmp = [],
				    i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName(tag);

				// Filter out possible comments
				if (tag === "*") {
					while (elem = results[i++]) {
						if (elem.nodeType === 1) {
							tmp.push(elem);
						}
					}

					return tmp;
				}
				return results;
			};

			// Class
			Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
				if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
					return context.getElementsByClassName(className);
				}
			};

			/* QSA/matchesSelector
   ---------------------------------------------------------------------- */

			// QSA and matchesSelector support

			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			rbuggyMatches = [];

			// qSa(:focus) reports false when true (Chrome 21)
			// We allow this because of a bug in IE8/9 that throws an error
			// whenever `document.activeElement` is accessed on an iframe
			// So, we allow :focus to pass through QSA all the time to avoid the IE error
			// See https://bugs.jquery.com/ticket/13378
			rbuggyQSA = [];

			if (support.qsa = rnative.test(document.querySelectorAll)) {
				// Build QSA regex
				// Regex strategy adopted from Diego Perini
				assert(function (el) {
					// Select is set to empty string on purpose
					// This is to test IE's treatment of not explicitly
					// setting a boolean content attribute,
					// since its presence should be enough
					// https://bugs.jquery.com/ticket/12359
					docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";

					// Support: IE8, Opera 11-12.16
					// Nothing should be selected when empty strings follow ^= or $= or *=
					// The test attribute must be unknown in Opera but "safe" for WinRT
					// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
					if (el.querySelectorAll("[msallowcapture^='']").length) {
						rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
					}

					// Support: IE8
					// Boolean attributes and "value" are not treated correctly
					if (!el.querySelectorAll("[selected]").length) {
						rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
					}

					// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
					if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
						rbuggyQSA.push("~=");
					}

					// Webkit/Opera - :checked should return selected option elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					// IE8 throws error here and will not see later tests
					if (!el.querySelectorAll(":checked").length) {
						rbuggyQSA.push(":checked");
					}

					// Support: Safari 8+, iOS 8+
					// https://bugs.webkit.org/show_bug.cgi?id=136851
					// In-page `selector#id sibling-combinator selector` fails
					if (!el.querySelectorAll("a#" + expando + "+*").length) {
						rbuggyQSA.push(".#.+[+~]");
					}
				});

				assert(function (el) {
					el.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>";

					// Support: Windows 8 Native Apps
					// The type and name attributes are restricted during .innerHTML assignment
					var input = document.createElement("input");
					input.setAttribute("type", "hidden");
					el.appendChild(input).setAttribute("name", "D");

					// Support: IE8
					// Enforce case-sensitivity of name attribute
					if (el.querySelectorAll("[name=d]").length) {
						rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
					}

					// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
					// IE8 throws error here and will not see later tests
					if (el.querySelectorAll(":enabled").length !== 2) {
						rbuggyQSA.push(":enabled", ":disabled");
					}

					// Support: IE9-11+
					// IE's :disabled selector does not pick up the children of disabled fieldsets
					docElem.appendChild(el).disabled = true;
					if (el.querySelectorAll(":disabled").length !== 2) {
						rbuggyQSA.push(":enabled", ":disabled");
					}

					// Opera 10-11 does not throw on post-comma invalid pseudos
					el.querySelectorAll("*,:x");
					rbuggyQSA.push(",.*:");
				});
			}

			if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {

				assert(function (el) {
					// Check to see if it's possible to do matchesSelector
					// on a disconnected node (IE 9)
					support.disconnectedMatch = matches.call(el, "*");

					// This should fail with an exception
					// Gecko does not error, returns false instead
					matches.call(el, "[s!='']:x");
					rbuggyMatches.push("!=", pseudos);
				});
			}

			rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
			rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

			/* Contains
   ---------------------------------------------------------------------- */
			hasCompare = rnative.test(docElem.compareDocumentPosition);

			// Element contains another
			// Purposefully self-exclusive
			// As in, an element does not contain itself
			contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
				    bup = b && b.parentNode;
				return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
			} : function (a, b) {
				if (b) {
					while (b = b.parentNode) {
						if (b === a) {
							return true;
						}
					}
				}
				return false;
			};

			/* Sorting
   ---------------------------------------------------------------------- */

			// Document order sorting
			sortOrder = hasCompare ? function (a, b) {

				// Flag for duplicate removal
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				// Sort on method existence if only one input has compareDocumentPosition
				var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
				if (compare) {
					return compare;
				}

				// Calculate position if both inputs belong to the same document
				compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) :

				// Otherwise we know they are disconnected
				1;

				// Disconnected nodes
				if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {

					// Choose the first element that is related to our preferred document
					if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
						return -1;
					}
					if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
						return 1;
					}

					// Maintain original order
					return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
				}

				return compare & 4 ? -1 : 1;
			} : function (a, b) {
				// Exit early if the nodes are identical
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				var cur,
				    i = 0,
				    aup = a.parentNode,
				    bup = b.parentNode,
				    ap = [a],
				    bp = [b];

				// Parentless nodes are either documents or disconnected
				if (!aup || !bup) {
					return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;

					// If the nodes are siblings, we can do a quick check
				} else if (aup === bup) {
					return siblingCheck(a, b);
				}

				// Otherwise we need full lists of their ancestors for comparison
				cur = a;
				while (cur = cur.parentNode) {
					ap.unshift(cur);
				}
				cur = b;
				while (cur = cur.parentNode) {
					bp.unshift(cur);
				}

				// Walk down the tree looking for a discrepancy
				while (ap[i] === bp[i]) {
					i++;
				}

				return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck(ap[i], bp[i]) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
			};

			return document;
		};

		Sizzle.matches = function (expr, elements) {
			return Sizzle(expr, null, null, elements);
		};

		Sizzle.matchesSelector = function (elem, expr) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			// Make sure that attribute selectors are quoted
			expr = expr.replace(rattributeQuotes, "='$1']");

			if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {

				try {
					var ret = matches.call(elem, expr);

					// IE 9's matchesSelector returns false on disconnected nodes
					if (ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11) {
						return ret;
					}
				} catch (e) {}
			}

			return Sizzle(expr, document, null, [elem]).length > 0;
		};

		Sizzle.contains = function (context, elem) {
			// Set document vars if needed
			if ((context.ownerDocument || context) !== document) {
				setDocument(context);
			}
			return contains(context, elem);
		};

		Sizzle.attr = function (elem, name) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			var fn = Expr.attrHandle[name.toLowerCase()],

			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;

			return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
		};

		Sizzle.escape = function (sel) {
			return (sel + "").replace(rcssescape, fcssescape);
		};

		Sizzle.error = function (msg) {
			throw new Error("Syntax error, unrecognized expression: " + msg);
		};

		/**
   * Document sorting and removing duplicates
   * @param {ArrayLike} results
   */
		Sizzle.uniqueSort = function (results) {
			var elem,
			    duplicates = [],
			    j = 0,
			    i = 0;

			// Unless we *know* we can detect duplicates, assume their presence
			hasDuplicate = !support.detectDuplicates;
			sortInput = !support.sortStable && results.slice(0);
			results.sort(sortOrder);

			if (hasDuplicate) {
				while (elem = results[i++]) {
					if (elem === results[i]) {
						j = duplicates.push(i);
					}
				}
				while (j--) {
					results.splice(duplicates[j], 1);
				}
			}

			// Clear input after sorting to release objects
			// See https://github.com/jquery/sizzle/pull/225
			sortInput = null;

			return results;
		};

		/**
   * Utility function for retrieving the text value of an array of DOM nodes
   * @param {Array|Element} elem
   */
		getText = Sizzle.getText = function (elem) {
			var node,
			    ret = "",
			    i = 0,
			    nodeType = elem.nodeType;

			if (!nodeType) {
				// If no nodeType, this is expected to be an array
				while (node = elem[i++]) {
					// Do not traverse comment nodes
					ret += getText(node);
				}
			} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
				// Use textContent for elements
				// innerText usage removed for consistency of new lines (jQuery #11153)
				if (typeof elem.textContent === "string") {
					return elem.textContent;
				} else {
					// Traverse its children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						ret += getText(elem);
					}
				}
			} else if (nodeType === 3 || nodeType === 4) {
				return elem.nodeValue;
			}
			// Do not include comment or processing instruction nodes

			return ret;
		};

		Expr = Sizzle.selectors = {

			// Can be adjusted by the user
			cacheLength: 50,

			createPseudo: markFunction,

			match: matchExpr,

			attrHandle: {},

			find: {},

			relative: {
				">": { dir: "parentNode", first: true },
				" ": { dir: "parentNode" },
				"+": { dir: "previousSibling", first: true },
				"~": { dir: "previousSibling" }
			},

			preFilter: {
				"ATTR": function ATTR(match) {
					match[1] = match[1].replace(runescape, funescape);

					// Move the given value to match[3] whether quoted or unquoted
					match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

					if (match[2] === "~=") {
						match[3] = " " + match[3] + " ";
					}

					return match.slice(0, 4);
				},

				"CHILD": function CHILD(match) {
					/* matches from matchExpr["CHILD"]
     	1 type (only|nth|...)
     	2 what (child|of-type)
     	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
     	4 xn-component of xn+y argument ([+-]?\d*n|)
     	5 sign of xn-component
     	6 x of xn-component
     	7 sign of y-component
     	8 y of y-component
     */
					match[1] = match[1].toLowerCase();

					if (match[1].slice(0, 3) === "nth") {
						// nth-* requires argument
						if (!match[3]) {
							Sizzle.error(match[0]);
						}

						// numeric x and y parameters for Expr.filter.CHILD
						// remember that false/true cast respectively to 0/1
						match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
						match[5] = +(match[7] + match[8] || match[3] === "odd");

						// other types prohibit arguments
					} else if (match[3]) {
						Sizzle.error(match[0]);
					}

					return match;
				},

				"PSEUDO": function PSEUDO(match) {
					var excess,
					    unquoted = !match[6] && match[2];

					if (matchExpr["CHILD"].test(match[0])) {
						return null;
					}

					// Accept quoted arguments as-is
					if (match[3]) {
						match[2] = match[4] || match[5] || "";

						// Strip excess characters from unquoted arguments
					} else if (unquoted && rpseudo.test(unquoted) && (
					// Get excess from tokenize (recursively)
					excess = tokenize(unquoted, true)) && (
					// advance to the next closing parenthesis
					excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

						// excess is a negative index
						match[0] = match[0].slice(0, excess);
						match[2] = unquoted.slice(0, excess);
					}

					// Return only captures needed by the pseudo filter method (type and argument)
					return match.slice(0, 3);
				}
			},

			filter: {

				"TAG": function TAG(nodeNameSelector) {
					var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
					return nodeNameSelector === "*" ? function () {
						return true;
					} : function (elem) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
				},

				"CLASS": function CLASS(className) {
					var pattern = classCache[className + " "];

					return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
						return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
					});
				},

				"ATTR": function ATTR(name, operator, check) {
					return function (elem) {
						var result = Sizzle.attr(elem, name);

						if (result == null) {
							return operator === "!=";
						}
						if (!operator) {
							return true;
						}

						result += "";

						return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
					};
				},

				"CHILD": function CHILD(type, what, argument, first, last) {
					var simple = type.slice(0, 3) !== "nth",
					    forward = type.slice(-4) !== "last",
					    ofType = what === "of-type";

					return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function (elem) {
						return !!elem.parentNode;
					} : function (elem, context, xml) {
						var cache,
						    uniqueCache,
						    outerCache,
						    node,
						    nodeIndex,
						    start,
						    dir = simple !== forward ? "nextSibling" : "previousSibling",
						    parent = elem.parentNode,
						    name = ofType && elem.nodeName.toLowerCase(),
						    useCache = !xml && !ofType,
						    diff = false;

						if (parent) {

							// :(first|last|only)-(child|of-type)
							if (simple) {
								while (dir) {
									node = elem;
									while (node = node[dir]) {
										if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [forward ? parent.firstChild : parent.lastChild];

							// non-xml :nth-child(...) stores cache data on `parent`
							if (forward && useCache) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[expando] || (node[expando] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

								cache = uniqueCache[type] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = nodeIndex && cache[2];
								node = nodeIndex && parent.childNodes[nodeIndex];

								while (node = ++nodeIndex && node && node[dir] || (

								// Fallback to seeking `elem` from the start
								diff = nodeIndex = 0) || start.pop()) {

									// When found, cache indexes on `parent` and break
									if (node.nodeType === 1 && ++diff && node === elem) {
										uniqueCache[type] = [dirruns, nodeIndex, diff];
										break;
									}
								}
							} else {
								// Use previously-cached element index if available
								if (useCache) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[expando] || (node[expando] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

									cache = uniqueCache[type] || [];
									nodeIndex = cache[0] === dirruns && cache[1];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if (diff === false) {
									// Use the same loop as above to seek `elem` from the start
									while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {

										if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {

											// Cache the index of each encountered element
											if (useCache) {
												outerCache = node[expando] || (node[expando] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

												uniqueCache[type] = [dirruns, diff];
											}

											if (node === elem) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || diff % first === 0 && diff / first >= 0;
						}
					};
				},

				"PSEUDO": function PSEUDO(pseudo, argument) {
					// pseudo-class names are case-insensitive
					// http://www.w3.org/TR/selectors/#pseudo-classes
					// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
					// Remember that setFilters inherits from pseudos
					var args,
					    fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);

					// The user may use createPseudo to indicate that
					// arguments are needed to create the filter function
					// just as Sizzle does
					if (fn[expando]) {
						return fn(argument);
					}

					// But maintain support for old signatures
					if (fn.length > 1) {
						args = [pseudo, pseudo, "", argument];
						return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
							var idx,
							    matched = fn(seed, argument),
							    i = matched.length;
							while (i--) {
								idx = indexOf(seed, matched[i]);
								seed[idx] = !(matches[idx] = matched[i]);
							}
						}) : function (elem) {
							return fn(elem, 0, args);
						};
					}

					return fn;
				}
			},

			pseudos: {
				// Potentially complex pseudos
				"not": markFunction(function (selector) {
					// Trim the selector passed to compile
					// to avoid treating leading and trailing
					// spaces as combinators
					var input = [],
					    results = [],
					    matcher = compile(selector.replace(rtrim, "$1"));

					return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
						var elem,
						    unmatched = matcher(seed, null, xml, []),
						    i = seed.length;

						// Match elements unmatched by `matcher`
						while (i--) {
							if (elem = unmatched[i]) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) : function (elem, context, xml) {
						input[0] = elem;
						matcher(input, null, xml, results);
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
				}),

				"has": markFunction(function (selector) {
					return function (elem) {
						return Sizzle(selector, elem).length > 0;
					};
				}),

				"contains": markFunction(function (text) {
					text = text.replace(runescape, funescape);
					return function (elem) {
						return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
					};
				}),

				// "Whether an element is represented by a :lang() selector
				// is based solely on the element's language value
				// being equal to the identifier C,
				// or beginning with the identifier C immediately followed by "-".
				// The matching of C against the element's language value is performed case-insensitively.
				// The identifier C does not have to be a valid language name."
				// http://www.w3.org/TR/selectors/#lang-pseudo
				"lang": markFunction(function (lang) {
					// lang value must be a valid identifier
					if (!ridentifier.test(lang || "")) {
						Sizzle.error("unsupported lang: " + lang);
					}
					lang = lang.replace(runescape, funescape).toLowerCase();
					return function (elem) {
						var elemLang;
						do {
							if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {

								elemLang = elemLang.toLowerCase();
								return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
							}
						} while ((elem = elem.parentNode) && elem.nodeType === 1);
						return false;
					};
				}),

				// Miscellaneous
				"target": function target(elem) {
					var hash = window.location && window.location.hash;
					return hash && hash.slice(1) === elem.id;
				},

				"root": function root(elem) {
					return elem === docElem;
				},

				"focus": function focus(elem) {
					return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
				},

				// Boolean properties
				"enabled": createDisabledPseudo(false),
				"disabled": createDisabledPseudo(true),

				"checked": function checked(elem) {
					// In CSS3, :checked should return both checked and selected elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					var nodeName = elem.nodeName.toLowerCase();
					return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
				},

				"selected": function selected(elem) {
					// Accessing this property makes selected-by-default
					// options in Safari work properly
					if (elem.parentNode) {
						elem.parentNode.selectedIndex;
					}

					return elem.selected === true;
				},

				// Contents
				"empty": function empty(elem) {
					// http://www.w3.org/TR/selectors/#empty-pseudo
					// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
					//   but not by others (comment: 8; processing instruction: 7; etc.)
					// nodeType < 6 works because attributes (2) do not appear as children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						if (elem.nodeType < 6) {
							return false;
						}
					}
					return true;
				},

				"parent": function parent(elem) {
					return !Expr.pseudos["empty"](elem);
				},

				// Element/input types
				"header": function header(elem) {
					return rheader.test(elem.nodeName);
				},

				"input": function input(elem) {
					return rinputs.test(elem.nodeName);
				},

				"button": function button(elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === "button" || name === "button";
				},

				"text": function text(elem) {
					var attr;
					return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && (

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					(attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
				},

				// Position-in-collection
				"first": createPositionalPseudo(function () {
					return [0];
				}),

				"last": createPositionalPseudo(function (matchIndexes, length) {
					return [length - 1];
				}),

				"eq": createPositionalPseudo(function (matchIndexes, length, argument) {
					return [argument < 0 ? argument + length : argument];
				}),

				"even": createPositionalPseudo(function (matchIndexes, length) {
					var i = 0;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"odd": createPositionalPseudo(function (matchIndexes, length) {
					var i = 1;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"lt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; --i >= 0;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"gt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; ++i < length;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				})
			}
		};

		Expr.pseudos["nth"] = Expr.pseudos["eq"];

		// Add button/input type pseudos
		for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
			Expr.pseudos[i] = createInputPseudo(i);
		}
		for (i in { submit: true, reset: true }) {
			Expr.pseudos[i] = createButtonPseudo(i);
		}

		// Easy API for creating new setFilters
		function setFilters() {}
		setFilters.prototype = Expr.filters = Expr.pseudos;
		Expr.setFilters = new setFilters();

		tokenize = Sizzle.tokenize = function (selector, parseOnly) {
			var matched,
			    match,
			    tokens,
			    type,
			    soFar,
			    groups,
			    preFilters,
			    cached = tokenCache[selector + " "];

			if (cached) {
				return parseOnly ? 0 : cached.slice(0);
			}

			soFar = selector;
			groups = [];
			preFilters = Expr.preFilter;

			while (soFar) {

				// Comma and first run
				if (!matched || (match = rcomma.exec(soFar))) {
					if (match) {
						// Don't consume trailing commas as valid
						soFar = soFar.slice(match[0].length) || soFar;
					}
					groups.push(tokens = []);
				}

				matched = false;

				// Combinators
				if (match = rcombinators.exec(soFar)) {
					matched = match.shift();
					tokens.push({
						value: matched,
						// Cast descendant combinators to space
						type: match[0].replace(rtrim, " ")
					});
					soFar = soFar.slice(matched.length);
				}

				// Filters
				for (type in Expr.filter) {
					if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
						matched = match.shift();
						tokens.push({
							value: matched,
							type: type,
							matches: match
						});
						soFar = soFar.slice(matched.length);
					}
				}

				if (!matched) {
					break;
				}
			}

			// Return the length of the invalid excess
			// if we're just parsing
			// Otherwise, throw an error or return tokens
			return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) :
			// Cache the tokens
			tokenCache(selector, groups).slice(0);
		};

		function toSelector(tokens) {
			var i = 0,
			    len = tokens.length,
			    selector = "";
			for (; i < len; i++) {
				selector += tokens[i].value;
			}
			return selector;
		}

		function addCombinator(matcher, combinator, base) {
			var dir = combinator.dir,
			    skip = combinator.next,
			    key = skip || dir,
			    checkNonElements = base && key === "parentNode",
			    doneName = done++;

			return combinator.first ?
			// Check against closest ancestor/preceding element
			function (elem, context, xml) {
				while (elem = elem[dir]) {
					if (elem.nodeType === 1 || checkNonElements) {
						return matcher(elem, context, xml);
					}
				}
				return false;
			} :

			// Check against all ancestor/preceding elements
			function (elem, context, xml) {
				var oldCache,
				    uniqueCache,
				    outerCache,
				    newCache = [dirruns, doneName];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if (xml) {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							if (matcher(elem, context, xml)) {
								return true;
							}
						}
					}
				} else {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							outerCache = elem[expando] || (elem[expando] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

							if (skip && skip === elem.nodeName.toLowerCase()) {
								elem = elem[dir] || elem;
							} else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {

								// Assign to newCache so results back-propagate to previous elements
								return newCache[2] = oldCache[2];
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[key] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if (newCache[2] = matcher(elem, context, xml)) {
									return true;
								}
							}
						}
					}
				}
				return false;
			};
		}

		function elementMatcher(matchers) {
			return matchers.length > 1 ? function (elem, context, xml) {
				var i = matchers.length;
				while (i--) {
					if (!matchers[i](elem, context, xml)) {
						return false;
					}
				}
				return true;
			} : matchers[0];
		}

		function multipleContexts(selector, contexts, results) {
			var i = 0,
			    len = contexts.length;
			for (; i < len; i++) {
				Sizzle(selector, contexts[i], results);
			}
			return results;
		}

		function condense(unmatched, map, filter, context, xml) {
			var elem,
			    newUnmatched = [],
			    i = 0,
			    len = unmatched.length,
			    mapped = map != null;

			for (; i < len; i++) {
				if (elem = unmatched[i]) {
					if (!filter || filter(elem, context, xml)) {
						newUnmatched.push(elem);
						if (mapped) {
							map.push(i);
						}
					}
				}
			}

			return newUnmatched;
		}

		function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
			if (postFilter && !postFilter[expando]) {
				postFilter = setMatcher(postFilter);
			}
			if (postFinder && !postFinder[expando]) {
				postFinder = setMatcher(postFinder, postSelector);
			}
			return markFunction(function (seed, results, context, xml) {
				var temp,
				    i,
				    elem,
				    preMap = [],
				    postMap = [],
				    preexisting = results.length,


				// Get initial elements from seed or context
				elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),


				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
				    matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || (seed ? preFilter : preexisting || postFilter) ?

				// ...intermediate processing is necessary
				[] :

				// ...otherwise use results directly
				results : matcherIn;

				// Find primary matches
				if (matcher) {
					matcher(matcherIn, matcherOut, context, xml);
				}

				// Apply postFilter
				if (postFilter) {
					temp = condense(matcherOut, postMap);
					postFilter(temp, [], context, xml);

					// Un-match failing elements by moving them back to matcherIn
					i = temp.length;
					while (i--) {
						if (elem = temp[i]) {
							matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
						}
					}
				}

				if (seed) {
					if (postFinder || preFilter) {
						if (postFinder) {
							// Get the final matcherOut by condensing this intermediate into postFinder contexts
							temp = [];
							i = matcherOut.length;
							while (i--) {
								if (elem = matcherOut[i]) {
									// Restore matcherIn since elem is not yet a final match
									temp.push(matcherIn[i] = elem);
								}
							}
							postFinder(null, matcherOut = [], temp, xml);
						}

						// Move matched elements from seed to results to keep them synchronized
						i = matcherOut.length;
						while (i--) {
							if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

								seed[temp] = !(results[temp] = elem);
							}
						}
					}

					// Add elements to results, through postFinder if defined
				} else {
					matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
					if (postFinder) {
						postFinder(null, results, matcherOut, xml);
					} else {
						push.apply(results, matcherOut);
					}
				}
			});
		}

		function matcherFromTokens(tokens) {
			var checkContext,
			    matcher,
			    j,
			    len = tokens.length,
			    leadingRelative = Expr.relative[tokens[0].type],
			    implicitRelative = leadingRelative || Expr.relative[" "],
			    i = leadingRelative ? 1 : 0,


			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator(function (elem) {
				return elem === checkContext;
			}, implicitRelative, true),
			    matchAnyContext = addCombinator(function (elem) {
				return indexOf(checkContext, elem) > -1;
			}, implicitRelative, true),
			    matchers = [function (elem, context, xml) {
				var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			}];

			for (; i < len; i++) {
				if (matcher = Expr.relative[tokens[i].type]) {
					matchers = [addCombinator(elementMatcher(matchers), matcher)];
				} else {
					matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

					// Return special upon seeing a positional matcher
					if (matcher[expando]) {
						// Find the next relative operator (if any) for proper handling
						j = ++i;
						for (; j < len; j++) {
							if (Expr.relative[tokens[j].type]) {
								break;
							}
						}
						return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
					}
					matchers.push(matcher);
				}
			}

			return elementMatcher(matchers);
		}

		function matcherFromGroupMatchers(elementMatchers, setMatchers) {
			var bySet = setMatchers.length > 0,
			    byElement = elementMatchers.length > 0,
			    superMatcher = function superMatcher(seed, context, xml, results, outermost) {
				var elem,
				    j,
				    matcher,
				    matchedCount = 0,
				    i = "0",
				    unmatched = seed && [],
				    setMatched = [],
				    contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]("*", outermost),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
				    len = elems.length;

				if (outermost) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for (; i !== len && (elem = elems[i]) != null; i++) {
					if (byElement && elem) {
						j = 0;
						if (!context && elem.ownerDocument !== document) {
							setDocument(elem);
							xml = !documentIsHTML;
						}
						while (matcher = elementMatchers[j++]) {
							if (matcher(elem, context || document, xml)) {
								results.push(elem);
								break;
							}
						}
						if (outermost) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if (bySet) {
						// They will have gone through all possible matchers
						if (elem = !matcher && elem) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if (seed) {
							unmatched.push(elem);
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if (bySet && i !== matchedCount) {
					j = 0;
					while (matcher = setMatchers[j++]) {
						matcher(unmatched, setMatched, context, xml);
					}

					if (seed) {
						// Reintegrate element matches to eliminate the need for sorting
						if (matchedCount > 0) {
							while (i--) {
								if (!(unmatched[i] || setMatched[i])) {
									setMatched[i] = pop.call(results);
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense(setMatched);
					}

					// Add matches to results
					push.apply(results, setMatched);

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {

						Sizzle.uniqueSort(results);
					}
				}

				// Override manipulation of globals by nested matchers
				if (outermost) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

			return bySet ? markFunction(superMatcher) : superMatcher;
		}

		compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
			var i,
			    setMatchers = [],
			    elementMatchers = [],
			    cached = compilerCache[selector + " "];

			if (!cached) {
				// Generate a function of recursive functions that can be used to check each element
				if (!match) {
					match = tokenize(selector);
				}
				i = match.length;
				while (i--) {
					cached = matcherFromTokens(match[i]);
					if (cached[expando]) {
						setMatchers.push(cached);
					} else {
						elementMatchers.push(cached);
					}
				}

				// Cache the compiled function
				cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

				// Save selector and tokenization
				cached.selector = selector;
			}
			return cached;
		};

		/**
   * A low-level selection function that works with Sizzle's compiled
   *  selector functions
   * @param {String|Function} selector A selector or a pre-compiled
   *  selector function built with Sizzle.compile
   * @param {Element} context
   * @param {Array} [results]
   * @param {Array} [seed] A set of elements to match against
   */
		select = Sizzle.select = function (selector, context, results, seed) {
			var i,
			    tokens,
			    token,
			    type,
			    find,
			    compiled = typeof selector === "function" && selector,
			    match = !seed && tokenize(selector = compiled.selector || selector);

			results = results || [];

			// Try to minimize operations if there is only one selector in the list and no seed
			// (the latter of which guarantees us context)
			if (match.length === 1) {

				// Reduce context if the leading compound selector is an ID
				tokens = match[0] = match[0].slice(0);
				if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

					context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
					if (!context) {
						return results;

						// Precompiled matchers will still verify ancestry, so step up a level
					} else if (compiled) {
						context = context.parentNode;
					}

					selector = selector.slice(tokens.shift().value.length);
				}

				// Fetch a seed set for right-to-left matching
				i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
				while (i--) {
					token = tokens[i];

					// Abort if we hit a combinator
					if (Expr.relative[type = token.type]) {
						break;
					}
					if (find = Expr.find[type]) {
						// Search, expanding context for leading sibling combinators
						if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {

							// If seed is empty or no tokens remain, we can return early
							tokens.splice(i, 1);
							selector = seed.length && toSelector(tokens);
							if (!selector) {
								push.apply(results, seed);
								return results;
							}

							break;
						}
					}
				}
			}

			// Compile and execute a filtering function if one is not provided
			// Provide `match` to avoid retokenization if we modified the selector above
			(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
			return results;
		};

		// One-time assignments

		// Sort stability
		support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

		// Support: Chrome 14-35+
		// Always assume duplicates if they aren't passed to the comparison function
		support.detectDuplicates = !!hasDuplicate;

		// Initialize against the default document
		setDocument();

		// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
		// Detached nodes confoundingly follow *each other*
		support.sortDetached = assert(function (el) {
			// Should return 1, but returns 4 (following)
			return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
		});

		// Support: IE<8
		// Prevent attribute/property "interpolation"
		// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
		if (!assert(function (el) {
			el.innerHTML = "<a href='#'></a>";
			return el.firstChild.getAttribute("href") === "#";
		})) {
			addHandle("type|href|height|width", function (elem, name, isXML) {
				if (!isXML) {
					return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
				}
			});
		}

		// Support: IE<9
		// Use defaultValue in place of getAttribute("value")
		if (!support.attributes || !assert(function (el) {
			el.innerHTML = "<input/>";
			el.firstChild.setAttribute("value", "");
			return el.firstChild.getAttribute("value") === "";
		})) {
			addHandle("value", function (elem, name, isXML) {
				if (!isXML && elem.nodeName.toLowerCase() === "input") {
					return elem.defaultValue;
				}
			});
		}

		// Support: IE<9
		// Use getAttributeNode to fetch booleans when getAttribute lies
		if (!assert(function (el) {
			return el.getAttribute("disabled") == null;
		})) {
			addHandle(booleans, function (elem, name, isXML) {
				var val;
				if (!isXML) {
					return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
				}
			});
		}

		return Sizzle;
	}(window);

	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;

	// Deprecated
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	jQuery.escapeSelector = Sizzle.escape;

	var dir = function dir(elem, _dir, until) {
		var matched = [],
		    truncate = until !== undefined;

		while ((elem = elem[_dir]) && elem.nodeType !== 9) {
			if (elem.nodeType === 1) {
				if (truncate && jQuery(elem).is(until)) {
					break;
				}
				matched.push(elem);
			}
		}
		return matched;
	};

	var _siblings = function _siblings(n, elem) {
		var matched = [];

		for (; n; n = n.nextSibling) {
			if (n.nodeType === 1 && n !== elem) {
				matched.push(n);
			}
		}

		return matched;
	};

	var rneedsContext = jQuery.expr.match.needsContext;

	function nodeName(elem, name) {

		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	};
	var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow(elements, qualifier, not) {
		if (jQuery.isFunction(qualifier)) {
			return jQuery.grep(elements, function (elem, i) {
				return !!qualifier.call(elem, i, elem) !== not;
			});
		}

		// Single element
		if (qualifier.nodeType) {
			return jQuery.grep(elements, function (elem) {
				return elem === qualifier !== not;
			});
		}

		// Arraylike of elements (jQuery, arguments, Array)
		if (typeof qualifier !== "string") {
			return jQuery.grep(elements, function (elem) {
				return indexOf.call(qualifier, elem) > -1 !== not;
			});
		}

		// Simple selector that can be filtered directly, removing non-Elements
		if (risSimple.test(qualifier)) {
			return jQuery.filter(qualifier, elements, not);
		}

		// Complex selector, compare the two sets, removing non-Elements
		qualifier = jQuery.filter(qualifier, elements);
		return jQuery.grep(elements, function (elem) {
			return indexOf.call(qualifier, elem) > -1 !== not && elem.nodeType === 1;
		});
	}

	jQuery.filter = function (expr, elems, not) {
		var elem = elems[0];

		if (not) {
			expr = ":not(" + expr + ")";
		}

		if (elems.length === 1 && elem.nodeType === 1) {
			return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
		}

		return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
			return elem.nodeType === 1;
		}));
	};

	jQuery.fn.extend({
		find: function find(selector) {
			var i,
			    ret,
			    len = this.length,
			    self = this;

			if (typeof selector !== "string") {
				return this.pushStack(jQuery(selector).filter(function () {
					for (i = 0; i < len; i++) {
						if (jQuery.contains(self[i], this)) {
							return true;
						}
					}
				}));
			}

			ret = this.pushStack([]);

			for (i = 0; i < len; i++) {
				jQuery.find(selector, self[i], ret);
			}

			return len > 1 ? jQuery.uniqueSort(ret) : ret;
		},
		filter: function filter(selector) {
			return this.pushStack(winnow(this, selector || [], false));
		},
		not: function not(selector) {
			return this.pushStack(winnow(this, selector || [], true));
		},
		is: function is(selector) {
			return !!winnow(this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
		}
	});

	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,


	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
	    init = jQuery.fn.init = function (selector, context, root) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if (!selector) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if (typeof selector === "string") {
			if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [null, selector, null];
			} else {
				match = rquickExpr.exec(selector);
			}

			// Match html or make sure no context is specified for #id
			if (match && (match[1] || !context)) {

				// HANDLE: $(html) -> $(array)
				if (match[1]) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

					// HANDLE: $(html, props)
					if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
						for (match in context) {

							// Properties of context are called as methods if possible
							if (jQuery.isFunction(this[match])) {
								this[match](context[match]);

								// ...and otherwise set as attributes
							} else {
								this.attr(match, context[match]);
							}
						}
					}

					return this;

					// HANDLE: $(#id)
				} else {
					elem = document.getElementById(match[2]);

					if (elem) {

						// Inject the element directly into the jQuery object
						this[0] = elem;
						this.length = 1;
					}
					return this;
				}

				// HANDLE: $(expr, $(...))
			} else if (!context || context.jquery) {
				return (context || root).find(selector);

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor(context).find(selector);
			}

			// HANDLE: $(DOMElement)
		} else if (selector.nodeType) {
			this[0] = selector;
			this.length = 1;
			return this;

			// HANDLE: $(function)
			// Shortcut for document ready
		} else if (jQuery.isFunction(selector)) {
			return root.ready !== undefined ? root.ready(selector) :

			// Execute immediately if ready is not present
			selector(jQuery);
		}

		return jQuery.makeArray(selector, this);
	};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery(document);

	var rparentsprev = /^(?:parents|prev(?:Until|All))/,


	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

	jQuery.fn.extend({
		has: function has(target) {
			var targets = jQuery(target, this),
			    l = targets.length;

			return this.filter(function () {
				var i = 0;
				for (; i < l; i++) {
					if (jQuery.contains(this, targets[i])) {
						return true;
					}
				}
			});
		},

		closest: function closest(selectors, context) {
			var cur,
			    i = 0,
			    l = this.length,
			    matched = [],
			    targets = typeof selectors !== "string" && jQuery(selectors);

			// Positional selectors never match, since there's no _selection_ context
			if (!rneedsContext.test(selectors)) {
				for (; i < l; i++) {
					for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

						// Always skip document fragments
						if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {

							matched.push(cur);
							break;
						}
					}
				}
			}

			return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
		},

		// Determine the position of an element within the set
		index: function index(elem) {

			// No argument, return index in parent
			if (!elem) {
				return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if (typeof elem === "string") {
				return indexOf.call(jQuery(elem), this[0]);
			}

			// Locate the position of the desired element
			return indexOf.call(this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem);
		},

		add: function add(selector, context) {
			return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
		},

		addBack: function addBack(selector) {
			return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
		}
	});

	function sibling(cur, dir) {
		while ((cur = cur[dir]) && cur.nodeType !== 1) {}
		return cur;
	}

	jQuery.each({
		parent: function parent(elem) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function parents(elem) {
			return dir(elem, "parentNode");
		},
		parentsUntil: function parentsUntil(elem, i, until) {
			return dir(elem, "parentNode", until);
		},
		next: function next(elem) {
			return sibling(elem, "nextSibling");
		},
		prev: function prev(elem) {
			return sibling(elem, "previousSibling");
		},
		nextAll: function nextAll(elem) {
			return dir(elem, "nextSibling");
		},
		prevAll: function prevAll(elem) {
			return dir(elem, "previousSibling");
		},
		nextUntil: function nextUntil(elem, i, until) {
			return dir(elem, "nextSibling", until);
		},
		prevUntil: function prevUntil(elem, i, until) {
			return dir(elem, "previousSibling", until);
		},
		siblings: function siblings(elem) {
			return _siblings((elem.parentNode || {}).firstChild, elem);
		},
		children: function children(elem) {
			return _siblings(elem.firstChild);
		},
		contents: function contents(elem) {
			if (nodeName(elem, "iframe")) {
				return elem.contentDocument;
			}

			// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
			// Treat the template element as a regular one in browsers that
			// don't support it.
			if (nodeName(elem, "template")) {
				elem = elem.content || elem;
			}

			return jQuery.merge([], elem.childNodes);
		}
	}, function (name, fn) {
		jQuery.fn[name] = function (until, selector) {
			var matched = jQuery.map(this, fn, until);

			if (name.slice(-5) !== "Until") {
				selector = until;
			}

			if (selector && typeof selector === "string") {
				matched = jQuery.filter(selector, matched);
			}

			if (this.length > 1) {

				// Remove duplicates
				if (!guaranteedUnique[name]) {
					jQuery.uniqueSort(matched);
				}

				// Reverse order for parents* and prev-derivatives
				if (rparentsprev.test(name)) {
					matched.reverse();
				}
			}

			return this.pushStack(matched);
		};
	});
	var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

	// Convert String-formatted options into Object-formatted ones
	function createOptions(options) {
		var object = {};
		jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
			object[flag] = true;
		});
		return object;
	}

	/*
  * Create a callback list using the following parameters:
  *
  *	options: an optional list of space-separated options that will change how
  *			the callback list behaves or a more traditional option object
  *
  * By default a callback list will act like an event callback list and can be
  * "fired" multiple times.
  *
  * Possible options:
  *
  *	once:			will ensure the callback list can only be fired once (like a Deferred)
  *
  *	memory:			will keep track of previous values and will call any callback added
  *					after the list has been fired right away with the latest "memorized"
  *					values (like a Deferred)
  *
  *	unique:			will ensure a callback can only be added once (no duplicate in the list)
  *
  *	stopOnFalse:	interrupt callings when a callback returns false
  *
  */
	jQuery.Callbacks = function (options) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

		var // Flag to know if list is currently firing
		firing,


		// Last fire value for non-forgettable lists
		memory,


		// Flag to know if list was already fired
		_fired,


		// Flag to prevent firing
		_locked,


		// Actual callback list
		list = [],


		// Queue of execution data for repeatable lists
		queue = [],


		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,


		// Fire callbacks
		fire = function fire() {

			// Enforce single-firing
			_locked = _locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			_fired = firing = true;
			for (; queue.length; firingIndex = -1) {
				memory = queue.shift();
				while (++firingIndex < list.length) {

					// Run callback and check for early termination
					if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if (!options.memory) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if (_locked) {

				// Keep an empty list if we have data for future add calls
				if (memory) {
					list = [];

					// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},


		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function add() {
				if (list) {

					// If we have memory from a past run, we should fire after adding
					if (memory && !firing) {
						firingIndex = list.length - 1;
						queue.push(memory);
					}

					(function add(args) {
						jQuery.each(args, function (_, arg) {
							if (jQuery.isFunction(arg)) {
								if (!options.unique || !self.has(arg)) {
									list.push(arg);
								}
							} else if (arg && arg.length && jQuery.type(arg) !== "string") {

								// Inspect recursively
								add(arg);
							}
						});
					})(arguments);

					if (memory && !firing) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function remove() {
				jQuery.each(arguments, function (_, arg) {
					var index;
					while ((index = jQuery.inArray(arg, list, index)) > -1) {
						list.splice(index, 1);

						// Handle firing indexes
						if (index <= firingIndex) {
							firingIndex--;
						}
					}
				});
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function has(fn) {
				return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function empty() {
				if (list) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function disable() {
				_locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function disabled() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function lock() {
				_locked = queue = [];
				if (!memory && !firing) {
					list = memory = "";
				}
				return this;
			},
			locked: function locked() {
				return !!_locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function fireWith(context, args) {
				if (!_locked) {
					args = args || [];
					args = [context, args.slice ? args.slice() : args];
					queue.push(args);
					if (!firing) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function fire() {
				self.fireWith(this, arguments);
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function fired() {
				return !!_fired;
			}
		};

		return self;
	};

	function Identity(v) {
		return v;
	}
	function Thrower(ex) {
		throw ex;
	}

	function adoptValue(value, resolve, reject, noValue) {
		var method;

		try {

			// Check for promise aspect first to privilege synchronous behavior
			if (value && jQuery.isFunction(method = value.promise)) {
				method.call(value).done(resolve).fail(reject);

				// Other thenables
			} else if (value && jQuery.isFunction(method = value.then)) {
				method.call(value, resolve, reject);

				// Other non-thenables
			} else {

				// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
				// * false: [ value ].slice( 0 ) => resolve( value )
				// * true: [ value ].slice( 1 ) => resolve()
				resolve.apply(undefined, [value].slice(noValue));
			}

			// For Promises/A+, convert exceptions into rejections
			// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
			// Deferred#then to conditionally suppress rejection.
		} catch (value) {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			reject.apply(undefined, [value]);
		}
	}

	jQuery.extend({

		Deferred: function Deferred(func) {
			var tuples = [

			// action, add listener, callbacks,
			// ... .then handlers, argument index, [final state]
			["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
			    _state = "pending",
			    _promise = {
				state: function state() {
					return _state;
				},
				always: function always() {
					deferred.done(arguments).fail(arguments);
					return this;
				},
				"catch": function _catch(fn) {
					return _promise.then(null, fn);
				},

				// Keep pipe for back-compat
				pipe: function pipe() /* fnDone, fnFail, fnProgress */{
					var fns = arguments;

					return jQuery.Deferred(function (newDefer) {
						jQuery.each(tuples, function (i, tuple) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[tuple[1]](function () {
								var returned = fn && fn.apply(this, arguments);
								if (returned && jQuery.isFunction(returned.promise)) {
									returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
								} else {
									newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
								}
							});
						});
						fns = null;
					}).promise();
				},
				then: function then(onFulfilled, onRejected, onProgress) {
					var maxDepth = 0;
					function resolve(depth, deferred, handler, special) {
						return function () {
							var that = this,
							    args = arguments,
							    mightThrow = function mightThrow() {
								var returned, then;

								// Support: Promises/A+ section 2.3.3.3.3
								// https://promisesaplus.com/#point-59
								// Ignore double-resolution attempts
								if (depth < maxDepth) {
									return;
								}

								returned = handler.apply(that, args);

								// Support: Promises/A+ section 2.3.1
								// https://promisesaplus.com/#point-48
								if (returned === deferred.promise()) {
									throw new TypeError("Thenable self-resolution");
								}

								// Support: Promises/A+ sections 2.3.3.1, 3.5
								// https://promisesaplus.com/#point-54
								// https://promisesaplus.com/#point-75
								// Retrieve `then` only once
								then = returned && (

								// Support: Promises/A+ section 2.3.4
								// https://promisesaplus.com/#point-64
								// Only check objects and functions for thenability
								(typeof returned === "undefined" ? "undefined" : _typeof(returned)) === "object" || typeof returned === "function") && returned.then;

								// Handle a returned thenable
								if (jQuery.isFunction(then)) {

									// Special processors (notify) just wait for resolution
									if (special) {
										then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));

										// Normal processors (resolve) also hook into progress
									} else {

										// ...and disregard older resolution values
										maxDepth++;

										then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
									}

									// Handle all other returned values
								} else {

									// Only substitute handlers pass on context
									// and multiple values (non-spec behavior)
									if (handler !== Identity) {
										that = undefined;
										args = [returned];
									}

									// Process the value(s)
									// Default process is resolve
									(special || deferred.resolveWith)(that, args);
								}
							},


							// Only normal processors (resolve) catch and reject exceptions
							process = special ? mightThrow : function () {
								try {
									mightThrow();
								} catch (e) {

									if (jQuery.Deferred.exceptionHook) {
										jQuery.Deferred.exceptionHook(e, process.stackTrace);
									}

									// Support: Promises/A+ section 2.3.3.3.4.1
									// https://promisesaplus.com/#point-61
									// Ignore post-resolution exceptions
									if (depth + 1 >= maxDepth) {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if (handler !== Thrower) {
											that = undefined;
											args = [e];
										}

										deferred.rejectWith(that, args);
									}
								}
							};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if (depth) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if (jQuery.Deferred.getStackHook) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout(process);
							}
						};
					}

					return jQuery.Deferred(function (newDefer) {

						// progress_handlers.add( ... )
						tuples[0][3].add(resolve(0, newDefer, jQuery.isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));

						// fulfilled_handlers.add( ... )
						tuples[1][3].add(resolve(0, newDefer, jQuery.isFunction(onFulfilled) ? onFulfilled : Identity));

						// rejected_handlers.add( ... )
						tuples[2][3].add(resolve(0, newDefer, jQuery.isFunction(onRejected) ? onRejected : Thrower));
					}).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function promise(obj) {
					return obj != null ? jQuery.extend(obj, _promise) : _promise;
				}
			},
			    deferred = {};

			// Add list-specific methods
			jQuery.each(tuples, function (i, tuple) {
				var list = tuple[2],
				    stateString = tuple[5];

				// promise.progress = list.add
				// promise.done = list.add
				// promise.fail = list.add
				_promise[tuple[1]] = list.add;

				// Handle state
				if (stateString) {
					list.add(function () {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						_state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[3 - i][2].disable,

					// progress_callbacks.lock
					tuples[0][2].lock);
				}

				// progress_handlers.fire
				// fulfilled_handlers.fire
				// rejected_handlers.fire
				list.add(tuple[3].fire);

				// deferred.notify = function() { deferred.notifyWith(...) }
				// deferred.resolve = function() { deferred.resolveWith(...) }
				// deferred.reject = function() { deferred.rejectWith(...) }
				deferred[tuple[0]] = function () {
					deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
					return this;
				};

				// deferred.notifyWith = list.fireWith
				// deferred.resolveWith = list.fireWith
				// deferred.rejectWith = list.fireWith
				deferred[tuple[0] + "With"] = list.fireWith;
			});

			// Make the deferred a promise
			_promise.promise(deferred);

			// Call given func if any
			if (func) {
				func.call(deferred, deferred);
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function when(singleValue) {
			var

			// count of uncompleted subordinates
			remaining = arguments.length,


			// count of unprocessed arguments
			i = remaining,


			// subordinate fulfillment data
			resolveContexts = Array(i),
			    resolveValues = _slice.call(arguments),


			// the master Deferred
			master = jQuery.Deferred(),


			// subordinate callback factory
			updateFunc = function updateFunc(i) {
				return function (value) {
					resolveContexts[i] = this;
					resolveValues[i] = arguments.length > 1 ? _slice.call(arguments) : value;
					if (! --remaining) {
						master.resolveWith(resolveContexts, resolveValues);
					}
				};
			};

			// Single- and empty arguments are adopted like Promise.resolve
			if (remaining <= 1) {
				adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject, !remaining);

				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if (master.state() === "pending" || jQuery.isFunction(resolveValues[i] && resolveValues[i].then)) {

					return master.then();
				}
			}

			// Multiple arguments are aggregated like Promise.all array elements
			while (i--) {
				adoptValue(resolveValues[i], updateFunc(i), master.reject);
			}

			return master.promise();
		}
	});

	// These usually indicate a programmer mistake during development,
	// warn about them ASAP rather than swallowing them by default.
	var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

	jQuery.Deferred.exceptionHook = function (error, stack) {

		// Support: IE 8 - 9 only
		// Console exists when dev tools are open, which can happen at any time
		if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
			window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
		}
	};

	jQuery.readyException = function (error) {
		window.setTimeout(function () {
			throw error;
		});
	};

	// The deferred used on DOM ready
	var readyList = jQuery.Deferred();

	jQuery.fn.ready = function (fn) {

		readyList.then(fn)

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch(function (error) {
			jQuery.readyException(error);
		});

		return this;
	};

	jQuery.extend({

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Handle when the DOM is ready
		ready: function ready(wait) {

			// Abort if there are pending holds or we're already ready
			if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if (wait !== true && --jQuery.readyWait > 0) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith(document, [jQuery]);
		}
	});

	jQuery.ready.then = readyList.then;

	// The ready event handler and self cleanup method
	function completed() {
		document.removeEventListener("DOMContentLoaded", completed);
		window.removeEventListener("load", completed);
		jQuery.ready();
	}

	// Catch cases where $(document).ready() is called
	// after the browser event has already occurred.
	// Support: IE <=9 - 10 only
	// Older IE sometimes signals "interactive" too soon
	if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {

		// Handle it asynchronously to allow scripts the opportunity to delay ready
		window.setTimeout(jQuery.ready);
	} else {

		// Use the handy event callback
		document.addEventListener("DOMContentLoaded", completed);

		// A fallback to window.onload, that will always work
		window.addEventListener("load", completed);
	}

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function access(elems, fn, key, value, chainable, emptyGet, raw) {
		var i = 0,
		    len = elems.length,
		    bulk = key == null;

		// Sets many values
		if (jQuery.type(key) === "object") {
			chainable = true;
			for (i in key) {
				access(elems, fn, i, key[i], true, emptyGet, raw);
			}

			// Sets one value
		} else if (value !== undefined) {
			chainable = true;

			if (!jQuery.isFunction(value)) {
				raw = true;
			}

			if (bulk) {

				// Bulk operations run against the entire set
				if (raw) {
					fn.call(elems, value);
					fn = null;

					// ...except when executing function values
				} else {
					bulk = fn;
					fn = function fn(elem, key, value) {
						return bulk.call(jQuery(elem), value);
					};
				}
			}

			if (fn) {
				for (; i < len; i++) {
					fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
				}
			}
		}

		if (chainable) {
			return elems;
		}

		// Gets
		if (bulk) {
			return fn.call(elems);
		}

		return len ? fn(elems[0], key) : emptyGet;
	};
	var acceptData = function acceptData(owner) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
	};

	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		cache: function cache(owner) {

			// Check if the owner object already has a cache
			var value = owner[this.expando];

			// If not, create one
			if (!value) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if (acceptData(owner)) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if (owner.nodeType) {
						owner[this.expando] = value;

						// Otherwise secure it in a non-enumerable property
						// configurable must be true to allow the property to be
						// deleted when data is removed
					} else {
						Object.defineProperty(owner, this.expando, {
							value: value,
							configurable: true
						});
					}
				}
			}

			return value;
		},
		set: function set(owner, data, value) {
			var prop,
			    cache = this.cache(owner);

			// Handle: [ owner, key, value ] args
			// Always use camelCase key (gh-2257)
			if (typeof data === "string") {
				cache[jQuery.camelCase(data)] = value;

				// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for (prop in data) {
					cache[jQuery.camelCase(prop)] = data[prop];
				}
			}
			return cache;
		},
		get: function get(owner, key) {
			return key === undefined ? this.cache(owner) :

			// Always use camelCase key (gh-2257)
			owner[this.expando] && owner[this.expando][jQuery.camelCase(key)];
		},
		access: function access(owner, key, value) {

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if (key === undefined || key && typeof key === "string" && value === undefined) {

				return this.get(owner, key);
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set(owner, key, value);

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function remove(owner, key) {
			var i,
			    cache = owner[this.expando];

			if (cache === undefined) {
				return;
			}

			if (key !== undefined) {

				// Support array or space separated string of keys
				if (Array.isArray(key)) {

					// If key is an array of keys...
					// We always set camelCase keys, so remove that.
					key = key.map(jQuery.camelCase);
				} else {
					key = jQuery.camelCase(key);

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
				}

				i = key.length;

				while (i--) {
					delete cache[key[i]];
				}
			}

			// Remove the expando if there's no more data
			if (key === undefined || jQuery.isEmptyObject(cache)) {

				// Support: Chrome <=35 - 45
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
				if (owner.nodeType) {
					owner[this.expando] = undefined;
				} else {
					delete owner[this.expando];
				}
			}
		},
		hasData: function hasData(owner) {
			var cache = owner[this.expando];
			return cache !== undefined && !jQuery.isEmptyObject(cache);
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();

	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	    rmultiDash = /[A-Z]/g;

	function getData(data) {
		if (data === "true") {
			return true;
		}

		if (data === "false") {
			return false;
		}

		if (data === "null") {
			return null;
		}

		// Only convert to a number if it doesn't change the string
		if (data === +data + "") {
			return +data;
		}

		if (rbrace.test(data)) {
			return JSON.parse(data);
		}

		return data;
	}

	function dataAttr(elem, key, data) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if (data === undefined && elem.nodeType === 1) {
			name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
			data = elem.getAttribute(name);

			if (typeof data === "string") {
				try {
					data = getData(data);
				} catch (e) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set(elem, key, data);
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend({
		hasData: function hasData(elem) {
			return dataUser.hasData(elem) || dataPriv.hasData(elem);
		},

		data: function data(elem, name, _data) {
			return dataUser.access(elem, name, _data);
		},

		removeData: function removeData(elem, name) {
			dataUser.remove(elem, name);
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function _data(elem, name, data) {
			return dataPriv.access(elem, name, data);
		},

		_removeData: function _removeData(elem, name) {
			dataPriv.remove(elem, name);
		}
	});

	jQuery.fn.extend({
		data: function data(key, value) {
			var i,
			    name,
			    data,
			    elem = this[0],
			    attrs = elem && elem.attributes;

			// Gets all values
			if (key === undefined) {
				if (this.length) {
					data = dataUser.get(elem);

					if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
						i = attrs.length;
						while (i--) {

							// Support: IE 11 only
							// The attrs elements can be null (#14894)
							if (attrs[i]) {
								name = attrs[i].name;
								if (name.indexOf("data-") === 0) {
									name = jQuery.camelCase(name.slice(5));
									dataAttr(elem, name, data[name]);
								}
							}
						}
						dataPriv.set(elem, "hasDataAttrs", true);
					}
				}

				return data;
			}

			// Sets multiple values
			if ((typeof key === "undefined" ? "undefined" : _typeof(key)) === "object") {
				return this.each(function () {
					dataUser.set(this, key);
				});
			}

			return access(this, function (value) {
				var data;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if (elem && value === undefined) {

					// Attempt to get data from the cache
					// The key will always be camelCased in Data
					data = dataUser.get(elem, key);
					if (data !== undefined) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr(elem, key);
					if (data !== undefined) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each(function () {

					// We always store the camelCased key
					dataUser.set(this, key, value);
				});
			}, null, value, arguments.length > 1, null, true);
		},

		removeData: function removeData(key) {
			return this.each(function () {
				dataUser.remove(this, key);
			});
		}
	});

	jQuery.extend({
		queue: function queue(elem, type, data) {
			var queue;

			if (elem) {
				type = (type || "fx") + "queue";
				queue = dataPriv.get(elem, type);

				// Speed up dequeue by getting out quickly if this is just a lookup
				if (data) {
					if (!queue || Array.isArray(data)) {
						queue = dataPriv.access(elem, type, jQuery.makeArray(data));
					} else {
						queue.push(data);
					}
				}
				return queue || [];
			}
		},

		dequeue: function dequeue(elem, type) {
			type = type || "fx";

			var queue = jQuery.queue(elem, type),
			    startLength = queue.length,
			    fn = queue.shift(),
			    hooks = jQuery._queueHooks(elem, type),
			    next = function next() {
				jQuery.dequeue(elem, type);
			};

			// If the fx queue is dequeued, always remove the progress sentinel
			if (fn === "inprogress") {
				fn = queue.shift();
				startLength--;
			}

			if (fn) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if (type === "fx") {
					queue.unshift("inprogress");
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call(elem, next, hooks);
			}

			if (!startLength && hooks) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function _queueHooks(elem, type) {
			var key = type + "queueHooks";
			return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
				empty: jQuery.Callbacks("once memory").add(function () {
					dataPriv.remove(elem, [type + "queue", key]);
				})
			});
		}
	});

	jQuery.fn.extend({
		queue: function queue(type, data) {
			var setter = 2;

			if (typeof type !== "string") {
				data = type;
				type = "fx";
				setter--;
			}

			if (arguments.length < setter) {
				return jQuery.queue(this[0], type);
			}

			return data === undefined ? this : this.each(function () {
				var queue = jQuery.queue(this, type, data);

				// Ensure a hooks for this queue
				jQuery._queueHooks(this, type);

				if (type === "fx" && queue[0] !== "inprogress") {
					jQuery.dequeue(this, type);
				}
			});
		},
		dequeue: function dequeue(type) {
			return this.each(function () {
				jQuery.dequeue(this, type);
			});
		},
		clearQueue: function clearQueue(type) {
			return this.queue(type || "fx", []);
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function promise(type, obj) {
			var tmp,
			    count = 1,
			    defer = jQuery.Deferred(),
			    elements = this,
			    i = this.length,
			    resolve = function resolve() {
				if (! --count) {
					defer.resolveWith(elements, [elements]);
				}
			};

			if (typeof type !== "string") {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while (i--) {
				tmp = dataPriv.get(elements[i], type + "queueHooks");
				if (tmp && tmp.empty) {
					count++;
					tmp.empty.add(resolve);
				}
			}
			resolve();
			return defer.promise(obj);
		}
	});
	var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;

	var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");

	var cssExpand = ["Top", "Right", "Bottom", "Left"];

	var isHiddenWithinTree = function isHiddenWithinTree(elem, el) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" || elem.style.display === "" &&

		// Otherwise, check computed style
		// Support: Firefox <=43 - 45
		// Disconnected elements can have computed display: none, so first confirm that elem is
		// in the document.
		jQuery.contains(elem.ownerDocument, elem) && jQuery.css(elem, "display") === "none";
	};

	var swap = function swap(elem, options, callback, args) {
		var ret,
		    name,
		    old = {};

		// Remember the old values, and insert the new ones
		for (name in options) {
			old[name] = elem.style[name];
			elem.style[name] = options[name];
		}

		ret = callback.apply(elem, args || []);

		// Revert the old values
		for (name in options) {
			elem.style[name] = old[name];
		}

		return ret;
	};

	function adjustCSS(elem, prop, valueParts, tween) {
		var adjusted,
		    scale = 1,
		    maxIterations = 20,
		    currentValue = tween ? function () {
			return tween.cur();
		} : function () {
			return jQuery.css(elem, prop, "");
		},
		    initial = currentValue(),
		    unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),


		// Starting value computation is required for potential unit mismatches
		initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));

		if (initialInUnit && initialInUnit[3] !== unit) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[3];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style(elem, prop, initialInUnit + unit);

				// Update scale, tolerating zero or NaN from tween.cur()
				// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
		}

		if (valueParts) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
			if (tween) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}

	var defaultDisplayMap = {};

	function getDefaultDisplay(elem) {
		var temp,
		    doc = elem.ownerDocument,
		    nodeName = elem.nodeName,
		    display = defaultDisplayMap[nodeName];

		if (display) {
			return display;
		}

		temp = doc.body.appendChild(doc.createElement(nodeName));
		display = jQuery.css(temp, "display");

		temp.parentNode.removeChild(temp);

		if (display === "none") {
			display = "block";
		}
		defaultDisplayMap[nodeName] = display;

		return display;
	}

	function showHide(elements, show) {
		var display,
		    elem,
		    values = [],
		    index = 0,
		    length = elements.length;

		// Determine new display value for elements that need to change
		for (; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}

			display = elem.style.display;
			if (show) {

				// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
				// check is required in this first loop unless we have a nonempty display value (either
				// inline or about-to-be-restored)
				if (display === "none") {
					values[index] = dataPriv.get(elem, "display") || null;
					if (!values[index]) {
						elem.style.display = "";
					}
				}
				if (elem.style.display === "" && isHiddenWithinTree(elem)) {
					values[index] = getDefaultDisplay(elem);
				}
			} else {
				if (display !== "none") {
					values[index] = "none";

					// Remember what we're overwriting
					dataPriv.set(elem, "display", display);
				}
			}
		}

		// Set the display of the elements in a second loop to avoid constant reflow
		for (index = 0; index < length; index++) {
			if (values[index] != null) {
				elements[index].style.display = values[index];
			}
		}

		return elements;
	}

	jQuery.fn.extend({
		show: function show() {
			return showHide(this, true);
		},
		hide: function hide() {
			return showHide(this);
		},
		toggle: function toggle(state) {
			if (typeof state === "boolean") {
				return state ? this.show() : this.hide();
			}

			return this.each(function () {
				if (isHiddenWithinTree(this)) {
					jQuery(this).show();
				} else {
					jQuery(this).hide();
				}
			});
		}
	});
	var rcheckableType = /^(?:checkbox|radio)$/i;

	var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i;

	var rscriptType = /^$|\/(?:java|ecma)script/i;

	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE <=9 only
		option: [1, "<select multiple='multiple'>", "</select>"],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [1, "<table>", "</table>"],
		col: [2, "<table><colgroup>", "</colgroup></table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

		_default: [0, "", ""]
	};

	// Support: IE <=9 only
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	function getAll(context, tag) {

		// Support: IE <=9 - 11 only
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret;

		if (typeof context.getElementsByTagName !== "undefined") {
			ret = context.getElementsByTagName(tag || "*");
		} else if (typeof context.querySelectorAll !== "undefined") {
			ret = context.querySelectorAll(tag || "*");
		} else {
			ret = [];
		}

		if (tag === undefined || tag && nodeName(context, tag)) {
			return jQuery.merge([context], ret);
		}

		return ret;
	}

	// Mark scripts as having already been evaluated
	function setGlobalEval(elems, refElements) {
		var i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
		}
	}

	var rhtml = /<|&#?\w+;/;

	function buildFragment(elems, context, scripts, selection, ignored) {
		var elem,
		    tmp,
		    tag,
		    wrap,
		    contains,
		    j,
		    fragment = context.createDocumentFragment(),
		    nodes = [],
		    i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			elem = elems[i];

			if (elem || elem === 0) {

				// Add nodes directly
				if (jQuery.type(elem) === "object") {

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

					// Convert non-html into a text node
				} else if (!rhtml.test(elem)) {
					nodes.push(context.createTextNode(elem));

					// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild(context.createElement("div"));

					// Deserialize a standard representation
					tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
					wrap = wrapMap[tag] || wrapMap._default;
					tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while (j--) {
						tmp = tmp.lastChild;
					}

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, tmp.childNodes);

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while (elem = nodes[i++]) {

			// Skip elements already in the context collection (trac-4087)
			if (selection && jQuery.inArray(elem, selection) > -1) {
				if (ignored) {
					ignored.push(elem);
				}
				continue;
			}

			contains = jQuery.contains(elem.ownerDocument, elem);

			// Append to fragment
			tmp = getAll(fragment.appendChild(elem), "script");

			// Preserve script evaluation history
			if (contains) {
				setGlobalEval(tmp);
			}

			// Capture executables
			if (scripts) {
				j = 0;
				while (elem = tmp[j++]) {
					if (rscriptType.test(elem.type || "")) {
						scripts.push(elem);
					}
				}
			}
		}

		return fragment;
	}

	(function () {
		var fragment = document.createDocumentFragment(),
		    div = fragment.appendChild(document.createElement("div")),
		    input = document.createElement("input");

		// Support: Android 4.0 - 4.3 only
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute("type", "radio");
		input.setAttribute("checked", "checked");
		input.setAttribute("name", "t");

		div.appendChild(input);

		// Support: Android <=4.1 only
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

		// Support: IE <=11 only
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
	})();
	var documentElement = document.documentElement;

	var rkeyEvent = /^key/,
	    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	    rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE <=9 only
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch (err) {}
	}

	function _on(elem, types, selector, data, fn, one) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

			// ( types-Object, selector, data )
			if (typeof selector !== "string") {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for (type in types) {
				_on(elem, type, selector, data, types[type], one);
			}
			return elem;
		}

		if (data == null && fn == null) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if (fn == null) {
			if (typeof selector === "string") {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if (fn === false) {
			fn = returnFalse;
		} else if (!fn) {
			return elem;
		}

		if (one === 1) {
			origFn = fn;
			fn = function fn(event) {

				// Can use an empty set, since event contains the info
				jQuery().off(event);
				return origFn.apply(this, arguments);
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
		}
		return elem.each(function () {
			jQuery.event.add(this, types, fn, data, selector);
		});
	}

	/*
  * Helper functions for managing events -- not part of the public interface.
  * Props to Dean Edwards' addEvent library for many of the ideas.
  */
	jQuery.event = {

		global: {},

		add: function add(elem, types, handler, data, selector) {

			var handleObjIn,
			    eventHandle,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.get(elem);

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if (!elemData) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if (handler.handler) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if (selector) {
				jQuery.find.matchesSelector(documentElement, selector);
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if (!handler.guid) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if (!(events = elemData.events)) {
				events = elemData.events = {};
			}
			if (!(eventHandle = elemData.handle)) {
				eventHandle = elemData.handle = function (e) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = (types || "").match(rnothtmlwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// There *must* be a type, no attaching namespace-only handlers
				if (!type) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[type] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = (selector ? special.delegateType : special.bindType) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[type] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test(selector),
					namespace: namespaces.join(".")
				}, handleObjIn);

				// Init the event handler queue if we're the first
				if (!(handlers = events[type])) {
					handlers = events[type] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {

						if (elem.addEventListener) {
							elem.addEventListener(type, eventHandle);
						}
					}
				}

				if (special.add) {
					special.add.call(elem, handleObj);

					if (!handleObj.handler.guid) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if (selector) {
					handlers.splice(handlers.delegateCount++, 0, handleObj);
				} else {
					handlers.push(handleObj);
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[type] = true;
			}
		},

		// Detach an event or set of events from an element
		remove: function remove(elem, types, handler, selector, mappedTypes) {

			var j,
			    origCount,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

			if (!elemData || !(events = elemData.events)) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = (types || "").match(rnothtmlwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// Unbind all events (on this namespace, if provided) for the element
				if (!type) {
					for (type in events) {
						jQuery.event.remove(elem, type + types[t], handler, selector, true);
					}
					continue;
				}

				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				handlers = events[type] || [];
				tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

				// Remove matching events
				origCount = j = handlers.length;
				while (j--) {
					handleObj = handlers[j];

					if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
						handlers.splice(j, 1);

						if (handleObj.selector) {
							handlers.delegateCount--;
						}
						if (special.remove) {
							special.remove.call(elem, handleObj);
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if (origCount && !handlers.length) {
					if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {

						jQuery.removeEvent(elem, type, elemData.handle);
					}

					delete events[type];
				}
			}

			// Remove data and the expando if it's no longer used
			if (jQuery.isEmptyObject(events)) {
				dataPriv.remove(elem, "handle events");
			}
		},

		dispatch: function dispatch(nativeEvent) {

			// Make a writable jQuery.Event from the native event object
			var event = jQuery.event.fix(nativeEvent);

			var i,
			    j,
			    ret,
			    matched,
			    handleObj,
			    handlerQueue,
			    args = new Array(arguments.length),
			    handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
			    special = jQuery.event.special[event.type] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;

			for (i = 1; i < arguments.length; i++) {
				args[i] = arguments[i];
			}

			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if (special.preDispatch && special.preDispatch.call(this, event) === false) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call(this, event, handlers);

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
				event.currentTarget = matched.elem;

				j = 0;
				while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

						if (ret !== undefined) {
							if ((event.result = ret) === false) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if (special.postDispatch) {
				special.postDispatch.call(this, event);
			}

			return event.result;
		},

		handlers: function handlers(event, _handlers) {
			var i,
			    handleObj,
			    sel,
			    matchedHandlers,
			    matchedSelectors,
			    handlerQueue = [],
			    delegateCount = _handlers.delegateCount,
			    cur = event.target;

			// Find delegate handlers
			if (delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!(event.type === "click" && event.button >= 1)) {

				for (; cur !== this; cur = cur.parentNode || this) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
						matchedHandlers = [];
						matchedSelectors = {};
						for (i = 0; i < delegateCount; i++) {
							handleObj = _handlers[i];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if (matchedSelectors[sel] === undefined) {
								matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
							}
							if (matchedSelectors[sel]) {
								matchedHandlers.push(handleObj);
							}
						}
						if (matchedHandlers.length) {
							handlerQueue.push({ elem: cur, handlers: matchedHandlers });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			cur = this;
			if (delegateCount < _handlers.length) {
				handlerQueue.push({ elem: cur, handlers: _handlers.slice(delegateCount) });
			}

			return handlerQueue;
		},

		addProp: function addProp(name, hook) {
			Object.defineProperty(jQuery.Event.prototype, name, {
				enumerable: true,
				configurable: true,

				get: jQuery.isFunction(hook) ? function () {
					if (this.originalEvent) {
						return hook(this.originalEvent);
					}
				} : function () {
					if (this.originalEvent) {
						return this.originalEvent[name];
					}
				},

				set: function set(value) {
					Object.defineProperty(this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value: value
					});
				}
			});
		},

		fix: function fix(originalEvent) {
			return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function trigger() {
					if (this !== safeActiveElement() && this.focus) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function trigger() {
					if (this === safeActiveElement() && this.blur) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function trigger() {
					if (this.type === "checkbox" && this.click && nodeName(this, "input")) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function _default(event) {
					return nodeName(event.target, "a");
				}
			},

			beforeunload: {
				postDispatch: function postDispatch(event) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if (event.result !== undefined && event.originalEvent) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function (elem, type, handle) {

		// This "if" is needed for plain objects
		if (elem.removeEventListener) {
			elem.removeEventListener(type, handle);
		}
	};

	jQuery.Event = function (src, props) {

		// Allow instantiation without the 'new' keyword
		if (!(this instanceof jQuery.Event)) {
			return new jQuery.Event(src, props);
		}

		// Event object
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&

			// Support: Android <=2.3 only
			src.returnValue === false ? returnTrue : returnFalse;

			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (#504, #13143)
			this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;

			this.currentTarget = src.currentTarget;
			this.relatedTarget = src.relatedTarget;

			// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if (props) {
			jQuery.extend(this, props);
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[jQuery.expando] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function preventDefault() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if (e && !this.isSimulated) {
				e.preventDefault();
			}
		},
		stopPropagation: function stopPropagation() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function stopImmediatePropagation() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Includes all common event props including KeyEvent and MouseEvent specific props
	jQuery.each({
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		"char": true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,

		which: function which(event) {
			var button = event.button;

			// Add which for key events
			if (event.which == null && rkeyEvent.test(event.type)) {
				return event.charCode != null ? event.charCode : event.keyCode;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
				if (button & 1) {
					return 1;
				}

				if (button & 2) {
					return 3;
				}

				if (button & 4) {
					return 2;
				}

				return 0;
			}

			return event.which;
		}
	}, jQuery.event.addProp);

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function (orig, fix) {
		jQuery.event.special[orig] = {
			delegateType: fix,
			bindType: fix,

			handle: function handle(event) {
				var ret,
				    target = this,
				    related = event.relatedTarget,
				    handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if (!related || related !== target && !jQuery.contains(target, related)) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply(this, arguments);
					event.type = fix;
				}
				return ret;
			}
		};
	});

	jQuery.fn.extend({

		on: function on(types, selector, data, fn) {
			return _on(this, types, selector, data, fn);
		},
		one: function one(types, selector, data, fn) {
			return _on(this, types, selector, data, fn, 1);
		},
		off: function off(types, selector, fn) {
			var handleObj, type;
			if (types && types.preventDefault && types.handleObj) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
				return this;
			}
			if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

				// ( types-object [, selector] )
				for (type in types) {
					this.off(type, selector, types[type]);
				}
				return this;
			}
			if (selector === false || typeof selector === "function") {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if (fn === false) {
				fn = returnFalse;
			}
			return this.each(function () {
				jQuery.event.remove(this, types, fn, selector);
			});
		}
	});

	var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,


	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,


	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	    rscriptTypeMasked = /^true\/(.*)/,
	    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	// Prefer a tbody over its parent table for containing new rows
	function manipulationTarget(elem, content) {
		if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {

			return jQuery(">tbody", elem)[0] || elem;
		}

		return elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript(elem) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript(elem) {
		var match = rscriptTypeMasked.exec(elem.type);

		if (match) {
			elem.type = match[1];
		} else {
			elem.removeAttribute("type");
		}

		return elem;
	}

	function cloneCopyEvent(src, dest) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if (dest.nodeType !== 1) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if (dataPriv.hasData(src)) {
			pdataOld = dataPriv.access(src);
			pdataCur = dataPriv.set(dest, pdataOld);
			events = pdataOld.events;

			if (events) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for (type in events) {
					for (i = 0, l = events[type].length; i < l; i++) {
						jQuery.event.add(dest, type, events[type][i]);
					}
				}
			}
		}

		// 2. Copy user data
		if (dataUser.hasData(src)) {
			udataOld = dataUser.access(src);
			udataCur = jQuery.extend({}, udataOld);

			dataUser.set(dest, udataCur);
		}
	}

	// Fix IE bugs, see support tests
	function fixInput(src, dest) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if (nodeName === "input" && rcheckableType.test(src.type)) {
			dest.checked = src.checked;

			// Fails to return the selected option to the default selected state when cloning options
		} else if (nodeName === "input" || nodeName === "textarea") {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip(collection, args, callback, ignored) {

		// Flatten any nested arrays
		args = concat.apply([], args);

		var fragment,
		    first,
		    scripts,
		    hasScripts,
		    node,
		    doc,
		    i = 0,
		    l = collection.length,
		    iNoClone = l - 1,
		    value = args[0],
		    isFunction = jQuery.isFunction(value);

		// We can't cloneNode fragments that contain checked, in WebKit
		if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
			return collection.each(function (index) {
				var self = collection.eq(index);
				if (isFunction) {
					args[0] = value.call(this, index, self.html());
				}
				domManip(self, args, callback, ignored);
			});
		}

		if (l) {
			fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
			first = fragment.firstChild;

			if (fragment.childNodes.length === 1) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if (first || ignored) {
				scripts = jQuery.map(getAll(fragment, "script"), disableScript);
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for (; i < l; i++) {
					node = fragment;

					if (i !== iNoClone) {
						node = jQuery.clone(node, true, true);

						// Keep references to cloned scripts for later restoration
						if (hasScripts) {

							// Support: Android <=4.0 only, PhantomJS 1 only
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge(scripts, getAll(node, "script"));
						}
					}

					callback.call(collection[i], node, i);
				}

				if (hasScripts) {
					doc = scripts[scripts.length - 1].ownerDocument;

					// Reenable scripts
					jQuery.map(scripts, restoreScript);

					// Evaluate executable scripts on first document insertion
					for (i = 0; i < hasScripts; i++) {
						node = scripts[i];
						if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {

							if (node.src) {

								// Optional AJAX dependency, but won't run scripts if not present
								if (jQuery._evalUrl) {
									jQuery._evalUrl(node.src);
								}
							} else {
								DOMEval(node.textContent.replace(rcleanScript, ""), doc);
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function _remove(elem, selector, keepData) {
		var node,
		    nodes = selector ? jQuery.filter(selector, elem) : elem,
		    i = 0;

		for (; (node = nodes[i]) != null; i++) {
			if (!keepData && node.nodeType === 1) {
				jQuery.cleanData(getAll(node));
			}

			if (node.parentNode) {
				if (keepData && jQuery.contains(node.ownerDocument, node)) {
					setGlobalEval(getAll(node, "script"));
				}
				node.parentNode.removeChild(node);
			}
		}

		return elem;
	}

	jQuery.extend({
		htmlPrefilter: function htmlPrefilter(html) {
			return html.replace(rxhtmlTag, "<$1></$2>");
		},

		clone: function clone(elem, dataAndEvents, deepDataAndEvents) {
			var i,
			    l,
			    srcElements,
			    destElements,
			    clone = elem.cloneNode(true),
			    inPage = jQuery.contains(elem.ownerDocument, elem);

			// Fix IE cloning issues
			if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

				// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
				destElements = getAll(clone);
				srcElements = getAll(elem);

				for (i = 0, l = srcElements.length; i < l; i++) {
					fixInput(srcElements[i], destElements[i]);
				}
			}

			// Copy the events from the original to the clone
			if (dataAndEvents) {
				if (deepDataAndEvents) {
					srcElements = srcElements || getAll(elem);
					destElements = destElements || getAll(clone);

					for (i = 0, l = srcElements.length; i < l; i++) {
						cloneCopyEvent(srcElements[i], destElements[i]);
					}
				} else {
					cloneCopyEvent(elem, clone);
				}
			}

			// Preserve script evaluation history
			destElements = getAll(clone, "script");
			if (destElements.length > 0) {
				setGlobalEval(destElements, !inPage && getAll(elem, "script"));
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function cleanData(elems) {
			var data,
			    elem,
			    type,
			    special = jQuery.event.special,
			    i = 0;

			for (; (elem = elems[i]) !== undefined; i++) {
				if (acceptData(elem)) {
					if (data = elem[dataPriv.expando]) {
						if (data.events) {
							for (type in data.events) {
								if (special[type]) {
									jQuery.event.remove(elem, type);

									// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent(elem, type, data.handle);
								}
							}
						}

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataPriv.expando] = undefined;
					}
					if (elem[dataUser.expando]) {

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataUser.expando] = undefined;
					}
				}
			}
		}
	});

	jQuery.fn.extend({
		detach: function detach(selector) {
			return _remove(this, selector, true);
		},

		remove: function remove(selector) {
			return _remove(this, selector);
		},

		text: function text(value) {
			return access(this, function (value) {
				return value === undefined ? jQuery.text(this) : this.empty().each(function () {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						this.textContent = value;
					}
				});
			}, null, value, arguments.length);
		},

		append: function append() {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.appendChild(elem);
				}
			});
		},

		prepend: function prepend() {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.insertBefore(elem, target.firstChild);
				}
			});
		},

		before: function before() {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this);
				}
			});
		},

		after: function after() {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this.nextSibling);
				}
			});
		},

		empty: function empty() {
			var elem,
			    i = 0;

			for (; (elem = this[i]) != null; i++) {
				if (elem.nodeType === 1) {

					// Prevent memory leaks
					jQuery.cleanData(getAll(elem, false));

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function clone(dataAndEvents, deepDataAndEvents) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function () {
				return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
			});
		},

		html: function html(value) {
			return access(this, function (value) {
				var elem = this[0] || {},
				    i = 0,
				    l = this.length;

				if (value === undefined && elem.nodeType === 1) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

					value = jQuery.htmlPrefilter(value);

					try {
						for (; i < l; i++) {
							elem = this[i] || {};

							// Remove element nodes and prevent memory leaks
							if (elem.nodeType === 1) {
								jQuery.cleanData(getAll(elem, false));
								elem.innerHTML = value;
							}
						}

						elem = 0;

						// If using innerHTML throws an exception, use the fallback method
					} catch (e) {}
				}

				if (elem) {
					this.empty().append(value);
				}
			}, null, value, arguments.length);
		},

		replaceWith: function replaceWith() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip(this, arguments, function (elem) {
				var parent = this.parentNode;

				if (jQuery.inArray(this, ignored) < 0) {
					jQuery.cleanData(getAll(this));
					if (parent) {
						parent.replaceChild(elem, this);
					}
				}

				// Force callback invocation
			}, ignored);
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (name, original) {
		jQuery.fn[name] = function (selector) {
			var elems,
			    ret = [],
			    insert = jQuery(selector),
			    last = insert.length - 1,
			    i = 0;

			for (; i <= last; i++) {
				elems = i === last ? this : this.clone(true);
				jQuery(insert[i])[original](elems);

				// Support: Android <=4.0 only, PhantomJS 1 only
				// .get() because push.apply(_, arraylike) throws on ancient WebKit
				push.apply(ret, elems.get());
			}

			return this.pushStack(ret);
		};
	});
	var rmargin = /^margin/;

	var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

	var getStyles = function getStyles(elem) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if (!view || !view.opener) {
			view = window;
		}

		return view.getComputedStyle(elem);
	};

	(function () {

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {

			// This is a singleton, we need to execute it only once
			if (!div) {
				return;
			}

			div.style.cssText = "box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild(container);

			var divStyle = window.getComputedStyle(div);
			pixelPositionVal = divStyle.top !== "1%";

			// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild(container);

			// Nullify the div so it wouldn't be stored in the memory and
			// it will also be a sign that checks already performed
			div = null;
		}

		var pixelPositionVal,
		    boxSizingReliableVal,
		    pixelMarginRightVal,
		    reliableMarginLeftVal,
		    container = document.createElement("div"),
		    div = document.createElement("div");

		// Finish early in limited (non-browser) environments
		if (!div.style) {
			return;
		}

		// Support: IE <=9 - 11 only
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode(true).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
		container.appendChild(div);

		jQuery.extend(support, {
			pixelPosition: function pixelPosition() {
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function boxSizingReliable() {
				computeStyleTests();
				return boxSizingReliableVal;
			},
			pixelMarginRight: function pixelMarginRight() {
				computeStyleTests();
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function reliableMarginLeft() {
				computeStyleTests();
				return reliableMarginLeftVal;
			}
		});
	})();

	function curCSS(elem, name, computed) {
		var width,
		    minWidth,
		    maxWidth,
		    ret,


		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

		computed = computed || getStyles(elem);

		// getPropertyValue is needed for:
		//   .css('filter') (IE 9 only, #12537)
		//   .css('--customProperty) (#3144)
		if (computed) {
			ret = computed.getPropertyValue(name) || computed[name];

			if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
				ret = jQuery.style(elem, name);
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// https://drafts.csswg.org/cssom/#resolved-values
			if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" : ret;
	}

	function addGetHookIf(conditionFn, hookFn) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function get() {
				if (conditionFn()) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply(this, arguments);
			}
		};
	}

	var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	    rcustomProp = /^--/,
	    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	    cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},
	    cssPrefixes = ["Webkit", "Moz", "ms"],
	    emptyStyle = document.createElement("div").style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName(name) {

		// Shortcut for names that are not vendor prefixed
		if (name in emptyStyle) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
		    i = cssPrefixes.length;

		while (i--) {
			name = cssPrefixes[i] + capName;
			if (name in emptyStyle) {
				return name;
			}
		}
	}

	// Return a property mapped along what jQuery.cssProps suggests or to
	// a vendor prefixed property.
	function finalPropName(name) {
		var ret = jQuery.cssProps[name];
		if (!ret) {
			ret = jQuery.cssProps[name] = vendorPropName(name) || name;
		}
		return ret;
	}

	function setPositiveNumber(elem, value, subtract) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec(value);
		return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
	}

	function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
		var i,
		    val = 0;

		// If we already have the right measurement, avoid augmentation
		if (extra === (isBorderBox ? "border" : "content")) {
			i = 4;

			// Otherwise initialize for horizontal or vertical properties
		} else {
			i = name === "width" ? 1 : 0;
		}

		for (; i < 4; i += 2) {

			// Both box models exclude margin, so add it if we want it
			if (extra === "margin") {
				val += jQuery.css(elem, extra + cssExpand[i], true, styles);
			}

			if (isBorderBox) {

				// border-box includes padding, so remove it if we want content
				if (extra === "content") {
					val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				}

				// At this point, extra isn't border nor margin, so remove border
				if (extra !== "margin") {
					val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

				// At this point, extra isn't content nor padding, so add border
				if (extra !== "padding") {
					val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			}
		}

		return val;
	}

	function getWidthOrHeight(elem, name, extra) {

		// Start with computed style
		var valueIsBorderBox,
		    styles = getStyles(elem),
		    val = curCSS(elem, name, styles),
		    isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

		// Computed unit is not pixels. Stop here and return.
		if (rnumnonpx.test(val)) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);

		// Fall back to offsetWidth/Height when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		if (val === "auto") {
			val = elem["offset" + name[0].toUpperCase() + name.slice(1)];
		}

		// Normalize "", auto, and prepare for extra
		val = parseFloat(val) || 0;

		// Use the active box-sizing model to add/subtract irrelevant styles
		return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
	}

	jQuery.extend({

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function get(elem, computed) {
					if (computed) {

						// We should always get a number back from opacity
						var ret = curCSS(elem, "opacity");
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function style(elem, name, value, extra) {

			// Don't set styles on text and comment nodes
			if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
				return;
			}

			// Make sure that we're working with the right name
			var ret,
			    type,
			    hooks,
			    origName = jQuery.camelCase(name),
			    isCustomProp = rcustomProp.test(name),
			    style = elem.style;

			// Make sure that we're working with the right name. We don't
			// want to query the value if it is a CSS custom property
			// since they are user-defined.
			if (!isCustomProp) {
				name = finalPropName(origName);
			}

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// Check if we're setting a value
			if (value !== undefined) {
				type = typeof value === "undefined" ? "undefined" : _typeof(value);

				// Convert "+=" or "-=" to relative numbers (#7345)
				if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
					value = adjustCSS(elem, name, ret);

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if (value == null || value !== value) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if (type === "number") {
					value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
				}

				// background-* props affect original clone's values
				if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
					style[name] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

					if (isCustomProp) {
						style.setProperty(name, value);
					} else {
						style[name] = value;
					}
				}
			} else {

				// If a hook was provided get the non-computed value from there
				if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[name];
			}
		},

		css: function css(elem, name, extra, styles) {
			var val,
			    num,
			    hooks,
			    origName = jQuery.camelCase(name),
			    isCustomProp = rcustomProp.test(name);

			// Make sure that we're working with the right name. We don't
			// want to modify the value if it is a CSS custom property
			// since they are user-defined.
			if (!isCustomProp) {
				name = finalPropName(origName);
			}

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// If a hook was provided get the computed value from there
			if (hooks && "get" in hooks) {
				val = hooks.get(elem, true, extra);
			}

			// Otherwise, if a way to get the computed value exists, use that
			if (val === undefined) {
				val = curCSS(elem, name, styles);
			}

			// Convert "normal" to computed value
			if (val === "normal" && name in cssNormalTransform) {
				val = cssNormalTransform[name];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if (extra === "" || extra) {
				num = parseFloat(val);
				return extra === true || isFinite(num) ? num || 0 : val;
			}

			return val;
		}
	});

	jQuery.each(["height", "width"], function (i, name) {
		jQuery.cssHooks[name] = {
			get: function get(elem, computed, extra) {
				if (computed) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test(jQuery.css(elem, "display")) && (

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
						return getWidthOrHeight(elem, name, extra);
					}) : getWidthOrHeight(elem, name, extra);
				}
			},

			set: function set(elem, value, extra) {
				var matches,
				    styles = extra && getStyles(elem),
				    subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);

				// Convert to pixels if value adjustment is needed
				if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {

					elem.style[name] = value;
					value = jQuery.css(elem, name);
				}

				return setPositiveNumber(elem, value, subtract);
			}
		};
	});

	jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
		if (computed) {
			return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () {
				return elem.getBoundingClientRect().left;
			})) + "px";
		}
	});

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function (prefix, suffix) {
		jQuery.cssHooks[prefix + suffix] = {
			expand: function expand(value) {
				var i = 0,
				    expanded = {},


				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [value];

				for (; i < 4; i++) {
					expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
				}

				return expanded;
			}
		};

		if (!rmargin.test(prefix)) {
			jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function css(name, value) {
			return access(this, function (elem, name, value) {
				var styles,
				    len,
				    map = {},
				    i = 0;

				if (Array.isArray(name)) {
					styles = getStyles(elem);
					len = name.length;

					for (; i < len; i++) {
						map[name[i]] = jQuery.css(elem, name[i], false, styles);
					}

					return map;
				}

				return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
			}, name, value, arguments.length > 1);
		}
	});

	function Tween(elem, options, prop, end, easing) {
		return new Tween.prototype.init(elem, options, prop, end, easing);
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function init(elem, options, prop, end, easing, unit) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
		},
		cur: function cur() {
			var hooks = Tween.propHooks[this.prop];

			return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
		},
		run: function run(percent) {
			var eased,
			    hooks = Tween.propHooks[this.prop];

			if (this.options.duration) {
				this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
			} else {
				this.pos = eased = percent;
			}
			this.now = (this.end - this.start) * eased + this.start;

			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this);
			}

			if (hooks && hooks.set) {
				hooks.set(this);
			} else {
				Tween.propHooks._default.set(this);
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function get(tween) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
					return tween.elem[tween.prop];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css(tween.elem, tween.prop, "");

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function set(tween) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if (jQuery.fx.step[tween.prop]) {
					jQuery.fx.step[tween.prop](tween);
				} else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
					jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
				} else {
					tween.elem[tween.prop] = tween.now;
				}
			}
		}
	};

	// Support: IE <=9 only
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function set(tween) {
			if (tween.elem.nodeType && tween.elem.parentNode) {
				tween.elem[tween.prop] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function linear(p) {
			return p;
		},
		swing: function swing(p) {
			return 0.5 - Math.cos(p * Math.PI) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back compat <1.8 extension point
	jQuery.fx.step = {};

	var fxNow,
	    inProgress,
	    rfxtypes = /^(?:toggle|show|hide)$/,
	    rrun = /queueHooks$/;

	function schedule() {
		if (inProgress) {
			if (document.hidden === false && window.requestAnimationFrame) {
				window.requestAnimationFrame(schedule);
			} else {
				window.setTimeout(schedule, jQuery.fx.interval);
			}

			jQuery.fx.tick();
		}
	}

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout(function () {
			fxNow = undefined;
		});
		return fxNow = jQuery.now();
	}

	// Generate parameters to create a standard animation
	function genFx(type, includeWidth) {
		var which,
		    i = 0,
		    attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for (; i < 4; i += 2 - includeWidth) {
			which = cssExpand[i];
			attrs["margin" + which] = attrs["padding" + which] = type;
		}

		if (includeWidth) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween(value, prop, animation) {
		var tween,
		    collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
		    index = 0,
		    length = collection.length;
		for (; index < length; index++) {
			if (tween = collection[index].call(animation, prop, value)) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter(elem, props, opts) {
		var prop,
		    value,
		    toggle,
		    hooks,
		    oldfire,
		    propTween,
		    restoreDisplay,
		    display,
		    isBox = "width" in props || "height" in props,
		    anim = this,
		    orig = {},
		    style = elem.style,
		    hidden = elem.nodeType && isHiddenWithinTree(elem),
		    dataShow = dataPriv.get(elem, "fxshow");

		// Queue-skipping animations hijack the fx hooks
		if (!opts.queue) {
			hooks = jQuery._queueHooks(elem, "fx");
			if (hooks.unqueued == null) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function () {
					if (!hooks.unqueued) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function () {

				// Ensure the complete handler is called before this completes
				anim.always(function () {
					hooks.unqueued--;
					if (!jQuery.queue(elem, "fx").length) {
						hooks.empty.fire();
					}
				});
			});
		}

		// Detect show/hide animations
		for (prop in props) {
			value = props[prop];
			if (rfxtypes.test(value)) {
				delete props[prop];
				toggle = toggle || value === "toggle";
				if (value === (hidden ? "hide" : "show")) {

					// Pretend to be hidden if this is a "show" and
					// there is still data from a stopped show/hide
					if (value === "show" && dataShow && dataShow[prop] !== undefined) {
						hidden = true;

						// Ignore all other no-op show/hide data
					} else {
						continue;
					}
				}
				orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
			}
		}

		// Bail out if this is a no-op like .hide().hide()
		propTween = !jQuery.isEmptyObject(props);
		if (!propTween && jQuery.isEmptyObject(orig)) {
			return;
		}

		// Restrict "overflow" and "display" styles during box animations
		if (isBox && elem.nodeType === 1) {

			// Support: IE <=9 - 11, Edge 12 - 13
			// Record all 3 overflow attributes because IE does not infer the shorthand
			// from identically-valued overflowX and overflowY
			opts.overflow = [style.overflow, style.overflowX, style.overflowY];

			// Identify a display type, preferring old show/hide data over the CSS cascade
			restoreDisplay = dataShow && dataShow.display;
			if (restoreDisplay == null) {
				restoreDisplay = dataPriv.get(elem, "display");
			}
			display = jQuery.css(elem, "display");
			if (display === "none") {
				if (restoreDisplay) {
					display = restoreDisplay;
				} else {

					// Get nonempty value(s) by temporarily forcing visibility
					showHide([elem], true);
					restoreDisplay = elem.style.display || restoreDisplay;
					display = jQuery.css(elem, "display");
					showHide([elem]);
				}
			}

			// Animate inline elements as inline-block
			if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
				if (jQuery.css(elem, "float") === "none") {

					// Restore the original display value at the end of pure show/hide animations
					if (!propTween) {
						anim.done(function () {
							style.display = restoreDisplay;
						});
						if (restoreDisplay == null) {
							display = style.display;
							restoreDisplay = display === "none" ? "" : display;
						}
					}
					style.display = "inline-block";
				}
			}
		}

		if (opts.overflow) {
			style.overflow = "hidden";
			anim.always(function () {
				style.overflow = opts.overflow[0];
				style.overflowX = opts.overflow[1];
				style.overflowY = opts.overflow[2];
			});
		}

		// Implement show/hide animations
		propTween = false;
		for (prop in orig) {

			// General show/hide setup for this element animation
			if (!propTween) {
				if (dataShow) {
					if ("hidden" in dataShow) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
				}

				// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
				if (toggle) {
					dataShow.hidden = !hidden;
				}

				// Show elements before animating them
				if (hidden) {
					showHide([elem], true);
				}

				/* eslint-disable no-loop-func */

				anim.done(function () {

					/* eslint-enable no-loop-func */

					// The final step of a "hide" animation is actually hiding the element
					if (!hidden) {
						showHide([elem]);
					}
					dataPriv.remove(elem, "fxshow");
					for (prop in orig) {
						jQuery.style(elem, prop, orig[prop]);
					}
				});
			}

			// Per-property setup
			propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
			if (!(prop in dataShow)) {
				dataShow[prop] = propTween.start;
				if (hidden) {
					propTween.end = propTween.start;
					propTween.start = 0;
				}
			}
		}
	}

	function propFilter(props, specialEasing) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for (index in props) {
			name = jQuery.camelCase(index);
			easing = specialEasing[name];
			value = props[index];
			if (Array.isArray(value)) {
				easing = value[1];
				value = props[index] = value[0];
			}

			if (index !== name) {
				props[name] = value;
				delete props[index];
			}

			hooks = jQuery.cssHooks[name];
			if (hooks && "expand" in hooks) {
				value = hooks.expand(value);
				delete props[name];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for (index in value) {
					if (!(index in props)) {
						props[index] = value[index];
						specialEasing[index] = easing;
					}
				}
			} else {
				specialEasing[name] = easing;
			}
		}
	}

	function Animation(elem, properties, options) {
		var result,
		    stopped,
		    index = 0,
		    length = Animation.prefilters.length,
		    deferred = jQuery.Deferred().always(function () {

			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		    tick = function tick() {
			if (stopped) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
			    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),


			// Support: Android 2.3 only
			// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
			temp = remaining / animation.duration || 0,
			    percent = 1 - temp,
			    index = 0,
			    length = animation.tweens.length;

			for (; index < length; index++) {
				animation.tweens[index].run(percent);
			}

			deferred.notifyWith(elem, [animation, percent, remaining]);

			// If there's more to do, yield
			if (percent < 1 && length) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if (!length) {
				deferred.notifyWith(elem, [animation, 1, 0]);
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith(elem, [animation]);
			return false;
		},
		    animation = deferred.promise({
			elem: elem,
			props: jQuery.extend({}, properties),
			opts: jQuery.extend(true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function createTween(prop, end) {
				var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
				animation.tweens.push(tween);
				return tween;
			},
			stop: function stop(gotoEnd) {
				var index = 0,


				// If we are going to the end, we want to run all the tweens
				// otherwise we skip this part
				length = gotoEnd ? animation.tweens.length : 0;
				if (stopped) {
					return this;
				}
				stopped = true;
				for (; index < length; index++) {
					animation.tweens[index].run(1);
				}

				// Resolve when we played the last frame; otherwise, reject
				if (gotoEnd) {
					deferred.notifyWith(elem, [animation, 1, 0]);
					deferred.resolveWith(elem, [animation, gotoEnd]);
				} else {
					deferred.rejectWith(elem, [animation, gotoEnd]);
				}
				return this;
			}
		}),
		    props = animation.props;

		propFilter(props, animation.opts.specialEasing);

		for (; index < length; index++) {
			result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
			if (result) {
				if (jQuery.isFunction(result.stop)) {
					jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
				}
				return result;
			}
		}

		jQuery.map(props, createTween, animation);

		if (jQuery.isFunction(animation.opts.start)) {
			animation.opts.start.call(elem, animation);
		}

		// Attach callbacks from options
		animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);

		jQuery.fx.timer(jQuery.extend(tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		}));

		return animation;
	}

	jQuery.Animation = jQuery.extend(Animation, {

		tweeners: {
			"*": [function (prop, value) {
				var tween = this.createTween(prop, value);
				adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
				return tween;
			}]
		},

		tweener: function tweener(props, callback) {
			if (jQuery.isFunction(props)) {
				callback = props;
				props = ["*"];
			} else {
				props = props.match(rnothtmlwhite);
			}

			var prop,
			    index = 0,
			    length = props.length;

			for (; index < length; index++) {
				prop = props[index];
				Animation.tweeners[prop] = Animation.tweeners[prop] || [];
				Animation.tweeners[prop].unshift(callback);
			}
		},

		prefilters: [defaultPrefilter],

		prefilter: function prefilter(callback, prepend) {
			if (prepend) {
				Animation.prefilters.unshift(callback);
			} else {
				Animation.prefilters.push(callback);
			}
		}
	});

	jQuery.speed = function (speed, easing, fn) {
		var opt = speed && (typeof speed === "undefined" ? "undefined" : _typeof(speed)) === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		// Go to the end state if fx are off
		if (jQuery.fx.off) {
			opt.duration = 0;
		} else {
			if (typeof opt.duration !== "number") {
				if (opt.duration in jQuery.fx.speeds) {
					opt.duration = jQuery.fx.speeds[opt.duration];
				} else {
					opt.duration = jQuery.fx.speeds._default;
				}
			}
		}

		// Normalize opt.queue - true/undefined/null -> "fx"
		if (opt.queue == null || opt.queue === true) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function () {
			if (jQuery.isFunction(opt.old)) {
				opt.old.call(this);
			}

			if (opt.queue) {
				jQuery.dequeue(this, opt.queue);
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo: function fadeTo(speed, to, easing, callback) {

			// Show any hidden elements after setting opacity to 0
			return this.filter(isHiddenWithinTree).css("opacity", 0).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback);
		},
		animate: function animate(prop, speed, easing, callback) {
			var empty = jQuery.isEmptyObject(prop),
			    optall = jQuery.speed(speed, easing, callback),
			    doAnimation = function doAnimation() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation(this, jQuery.extend({}, prop), optall);

				// Empty animations, or finishing resolves immediately
				if (empty || dataPriv.get(this, "finish")) {
					anim.stop(true);
				}
			};
			doAnimation.finish = doAnimation;

			return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
		},
		stop: function stop(type, clearQueue, gotoEnd) {
			var stopQueue = function stopQueue(hooks) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop(gotoEnd);
			};

			if (typeof type !== "string") {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if (clearQueue && type !== false) {
				this.queue(type || "fx", []);
			}

			return this.each(function () {
				var dequeue = true,
				    index = type != null && type + "queueHooks",
				    timers = jQuery.timers,
				    data = dataPriv.get(this);

				if (index) {
					if (data[index] && data[index].stop) {
						stopQueue(data[index]);
					}
				} else {
					for (index in data) {
						if (data[index] && data[index].stop && rrun.test(index)) {
							stopQueue(data[index]);
						}
					}
				}

				for (index = timers.length; index--;) {
					if (timers[index].elem === this && (type == null || timers[index].queue === type)) {

						timers[index].anim.stop(gotoEnd);
						dequeue = false;
						timers.splice(index, 1);
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if (dequeue || !gotoEnd) {
					jQuery.dequeue(this, type);
				}
			});
		},
		finish: function finish(type) {
			if (type !== false) {
				type = type || "fx";
			}
			return this.each(function () {
				var index,
				    data = dataPriv.get(this),
				    queue = data[type + "queue"],
				    hooks = data[type + "queueHooks"],
				    timers = jQuery.timers,
				    length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue(this, type, []);

				if (hooks && hooks.stop) {
					hooks.stop.call(this, true);
				}

				// Look for any active animations, and finish them
				for (index = timers.length; index--;) {
					if (timers[index].elem === this && timers[index].queue === type) {
						timers[index].anim.stop(true);
						timers.splice(index, 1);
					}
				}

				// Look for any animations in the old queue and finish them
				for (index = 0; index < length; index++) {
					if (queue[index] && queue[index].finish) {
						queue[index].finish.call(this);
					}
				}

				// Turn off finishing flag
				delete data.finish;
			});
		}
	});

	jQuery.each(["toggle", "show", "hide"], function (i, name) {
		var cssFn = jQuery.fn[name];
		jQuery.fn[name] = function (speed, easing, callback) {
			return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
		};
	});

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function (name, props) {
		jQuery.fn[name] = function (speed, easing, callback) {
			return this.animate(props, speed, easing, callback);
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function () {
		var timer,
		    i = 0,
		    timers = jQuery.timers;

		fxNow = jQuery.now();

		for (; i < timers.length; i++) {
			timer = timers[i];

			// Run the timer and safely remove it when done (allowing for external removal)
			if (!timer() && timers[i] === timer) {
				timers.splice(i--, 1);
			}
		}

		if (!timers.length) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function (timer) {
		jQuery.timers.push(timer);
		jQuery.fx.start();
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function () {
		if (inProgress) {
			return;
		}

		inProgress = true;
		schedule();
	};

	jQuery.fx.stop = function () {
		inProgress = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};

	// Based off of the plugin by Clint Helfers, with permission.
	// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function (time, type) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";

		return this.queue(type, function (next, hooks) {
			var timeout = window.setTimeout(next, time);
			hooks.stop = function () {
				window.clearTimeout(timeout);
			};
		});
	};

	(function () {
		var input = document.createElement("input"),
		    select = document.createElement("select"),
		    opt = select.appendChild(document.createElement("option"));

		input.type = "checkbox";

		// Support: Android <=4.3 only
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE <=11 only
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: IE <=11 only
		// An input loses its value after becoming a radio
		input = document.createElement("input");
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();

	var boolHook,
	    attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend({
		attr: function attr(name, value) {
			return access(this, jQuery.attr, name, value, arguments.length > 1);
		},

		removeAttr: function removeAttr(name) {
			return this.each(function () {
				jQuery.removeAttr(this, name);
			});
		}
	});

	jQuery.extend({
		attr: function attr(elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if (typeof elem.getAttribute === "undefined") {
				return jQuery.prop(elem, name, value);
			}

			// Attribute hooks are determined by the lowercase version
			// Grab necessary hook if one is defined
			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
				hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
			}

			if (value !== undefined) {
				if (value === null) {
					jQuery.removeAttr(elem, name);
					return;
				}

				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				elem.setAttribute(name, value + "");
				return value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			ret = jQuery.find.attr(elem, name);

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function set(elem, value) {
					if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
						var val = elem.value;
						elem.setAttribute("type", value);
						if (val) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function removeAttr(elem, value) {
			var name,
			    i = 0,


			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match(rnothtmlwhite);

			if (attrNames && elem.nodeType === 1) {
				while (name = attrNames[i++]) {
					elem.removeAttribute(name);
				}
			}
		}
	});

	// Hooks for boolean attributes
	boolHook = {
		set: function set(elem, value, name) {
			if (value === false) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr(elem, name);
			} else {
				elem.setAttribute(name, name);
			}
			return name;
		}
	};

	jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
		var getter = attrHandle[name] || jQuery.find.attr;

		attrHandle[name] = function (elem, name, isXML) {
			var ret,
			    handle,
			    lowercaseName = name.toLowerCase();

			if (!isXML) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[lowercaseName];
				attrHandle[lowercaseName] = ret;
				ret = getter(elem, name, isXML) != null ? lowercaseName : null;
				attrHandle[lowercaseName] = handle;
			}
			return ret;
		};
	});

	var rfocusable = /^(?:input|select|textarea|button)$/i,
	    rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend({
		prop: function prop(name, value) {
			return access(this, jQuery.prop, name, value, arguments.length > 1);
		},

		removeProp: function removeProp(name) {
			return this.each(function () {
				delete this[jQuery.propFix[name] || name];
			});
		}
	});

	jQuery.extend({
		prop: function prop(elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

				// Fix name and attach hooks
				name = jQuery.propFix[name] || name;
				hooks = jQuery.propHooks[name];
			}

			if (value !== undefined) {
				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				return elem[name] = value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			return elem[name];
		},

		propHooks: {
			tabIndex: {
				get: function get(elem) {

					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr(elem, "tabindex");

					if (tabindex) {
						return parseInt(tabindex, 10);
					}

					if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
						return 0;
					}

					return -1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	});

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	// eslint rule "no-unused-expressions" is disabled for this code
	// since it considers such accessions noop
	if (!support.optSelected) {
		jQuery.propHooks.selected = {
			get: function get(elem) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if (parent && parent.parentNode) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function set(elem) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if (parent) {
					parent.selectedIndex;

					if (parent.parentNode) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
		jQuery.propFix[this.toLowerCase()] = this;
	});

	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse(value) {
		var tokens = value.match(rnothtmlwhite) || [];
		return tokens.join(" ");
	}

	function getClass(elem) {
		return elem.getAttribute && elem.getAttribute("class") || "";
	}

	jQuery.fn.extend({
		addClass: function addClass(value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).addClass(value.call(this, j, getClass(this)));
				});
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnothtmlwhite) || [];

				while (elem = this[i++]) {
					curValue = getClass(elem);
					cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {
							if (cur.indexOf(" " + clazz + " ") < 0) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		removeClass: function removeClass(value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).removeClass(value.call(this, j, getClass(this)));
				});
			}

			if (!arguments.length) {
				return this.attr("class", "");
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnothtmlwhite) || [];

				while (elem = this[i++]) {
					curValue = getClass(elem);

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {

							// Remove *all* instances
							while (cur.indexOf(" " + clazz + " ") > -1) {
								cur = cur.replace(" " + clazz + " ", " ");
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		toggleClass: function toggleClass(value, stateVal) {
			var type = typeof value === "undefined" ? "undefined" : _typeof(value);

			if (typeof stateVal === "boolean" && type === "string") {
				return stateVal ? this.addClass(value) : this.removeClass(value);
			}

			if (jQuery.isFunction(value)) {
				return this.each(function (i) {
					jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
				});
			}

			return this.each(function () {
				var className, i, self, classNames;

				if (type === "string") {

					// Toggle individual class names
					i = 0;
					self = jQuery(this);
					classNames = value.match(rnothtmlwhite) || [];

					while (className = classNames[i++]) {

						// Check each className given, space separated list
						if (self.hasClass(className)) {
							self.removeClass(className);
						} else {
							self.addClass(className);
						}
					}

					// Toggle whole class name
				} else if (value === undefined || type === "boolean") {
					className = getClass(this);
					if (className) {

						// Store className if set
						dataPriv.set(this, "__className__", className);
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if (this.setAttribute) {
						this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
					}
				}
			});
		},

		hasClass: function hasClass(selector) {
			var className,
			    elem,
			    i = 0;

			className = " " + selector + " ";
			while (elem = this[i++]) {
				if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
					return true;
				}
			}

			return false;
		}
	});

	var rreturn = /\r/g;

	jQuery.fn.extend({
		val: function val(value) {
			var hooks,
			    ret,
			    isFunction,
			    elem = this[0];

			if (!arguments.length) {
				if (elem) {
					hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

					if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
						return ret;
					}

					ret = elem.value;

					// Handle most common string cases
					if (typeof ret === "string") {
						return ret.replace(rreturn, "");
					}

					// Handle cases where value is null/undef or number
					return ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction(value);

			return this.each(function (i) {
				var val;

				if (this.nodeType !== 1) {
					return;
				}

				if (isFunction) {
					val = value.call(this, i, jQuery(this).val());
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if (val == null) {
					val = "";
				} else if (typeof val === "number") {
					val += "";
				} else if (Array.isArray(val)) {
					val = jQuery.map(val, function (value) {
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

				// If set returns undefined, fall back to normal setting
				if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function get(elem) {

					var val = jQuery.find.attr(elem, "value");
					return val != null ? val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse(jQuery.text(elem));
				}
			},
			select: {
				get: function get(elem) {
					var value,
					    option,
					    i,
					    options = elem.options,
					    index = elem.selectedIndex,
					    one = elem.type === "select-one",
					    values = one ? null : [],
					    max = one ? index + 1 : options.length;

					if (index < 0) {
						i = max;
					} else {
						i = one ? index : 0;
					}

					// Loop through all the selected options
					for (; i < max; i++) {
						option = options[i];

						// Support: IE <=9 only
						// IE8-9 doesn't update selected after form reset (#2551)
						if ((option.selected || i === index) &&

						// Don't return options that are disabled or in a disabled optgroup
						!option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {

							// Get the specific value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if (one) {
								return value;
							}

							// Multi-Selects return an array
							values.push(value);
						}
					}

					return values;
				},

				set: function set(elem, value) {
					var optionSet,
					    option,
					    options = elem.options,
					    values = jQuery.makeArray(value),
					    i = options.length;

					while (i--) {
						option = options[i];

						/* eslint-disable no-cond-assign */

						if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
							optionSet = true;
						}

						/* eslint-enable no-cond-assign */
					}

					// Force browsers to behave consistently when non-matching value is set
					if (!optionSet) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});

	// Radios and checkboxes getter/setter
	jQuery.each(["radio", "checkbox"], function () {
		jQuery.valHooks[this] = {
			set: function set(elem, value) {
				if (Array.isArray(value)) {
					return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
				}
			}
		};
		if (!support.checkOn) {
			jQuery.valHooks[this].get = function (elem) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});

	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend(jQuery.event, {

		trigger: function trigger(event, data, elem, onlyHandlers) {

			var i,
			    cur,
			    tmp,
			    bubbleType,
			    ontype,
			    handle,
			    special,
			    eventPath = [elem || document],
			    type = hasOwn.call(event, "type") ? event.type : event,
			    namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if (elem.nodeType === 3 || elem.nodeType === 8) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if (rfocusMorph.test(type + jQuery.event.triggered)) {
				return;
			}

			if (type.indexOf(".") > -1) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[jQuery.expando] ? event : new jQuery.Event(type, (typeof event === "undefined" ? "undefined" : _typeof(event)) === "object" && event);

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if (!event.target) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ? [event] : jQuery.makeArray(data, [event]);

			// Allow special events to draw outside the lines
			special = jQuery.event.special[type] || {};
			if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

				bubbleType = special.delegateType || type;
				if (!rfocusMorph.test(bubbleType + type)) {
					cur = cur.parentNode;
				}
				for (; cur; cur = cur.parentNode) {
					eventPath.push(cur);
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if (tmp === (elem.ownerDocument || document)) {
					eventPath.push(tmp.defaultView || tmp.parentWindow || window);
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

				event.type = i > 1 ? bubbleType : special.bindType || type;

				// jQuery handler
				handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
				if (handle) {
					handle.apply(cur, data);
				}

				// Native handler
				handle = ontype && cur[ontype];
				if (handle && handle.apply && acceptData(cur)) {
					event.result = handle.apply(cur, data);
					if (event.result === false) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if (!onlyHandlers && !event.isDefaultPrevented()) {

				if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {

					// Call a native DOM method on the target with the same name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ontype];

						if (tmp) {
							elem[ontype] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[type]();
						jQuery.event.triggered = undefined;

						if (tmp) {
							elem[ontype] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function simulate(type, elem, event) {
			var e = jQuery.extend(new jQuery.Event(), event, {
				type: type,
				isSimulated: true
			});

			jQuery.event.trigger(e, null, elem);
		}

	});

	jQuery.fn.extend({

		trigger: function trigger(type, data) {
			return this.each(function () {
				jQuery.event.trigger(type, data, this);
			});
		},
		triggerHandler: function triggerHandler(type, data) {
			var elem = this[0];
			if (elem) {
				return jQuery.event.trigger(type, data, elem, true);
			}
		}
	});

	jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function (i, name) {

		// Handle event binding
		jQuery.fn[name] = function (data, fn) {
			return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
		};
	});

	jQuery.fn.extend({
		hover: function hover(fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
		}
	});

	support.focusin = "onfocusin" in window;

	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	if (!support.focusin) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function handler(event) {
				jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
			};

			jQuery.event.special[fix] = {
				setup: function setup() {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix);

					if (!attaches) {
						doc.addEventListener(orig, handler, true);
					}
					dataPriv.access(doc, fix, (attaches || 0) + 1);
				},
				teardown: function teardown() {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix) - 1;

					if (!attaches) {
						doc.removeEventListener(orig, handler, true);
						dataPriv.remove(doc, fix);
					} else {
						dataPriv.access(doc, fix, attaches);
					}
				}
			};
		});
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = /\?/;

	// Cross-browser xml parsing
	jQuery.parseXML = function (data) {
		var xml;
		if (!data || typeof data !== "string") {
			return null;
		}

		// Support: IE 9 - 11 only
		// IE throws on parseFromString with invalid input.
		try {
			xml = new window.DOMParser().parseFromString(data, "text/xml");
		} catch (e) {
			xml = undefined;
		}

		if (!xml || xml.getElementsByTagName("parsererror").length) {
			jQuery.error("Invalid XML: " + data);
		}
		return xml;
	};

	var rbracket = /\[\]$/,
	    rCRLF = /\r?\n/g,
	    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	    rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams(prefix, obj, traditional, add) {
		var name;

		if (Array.isArray(obj)) {

			// Serialize array item.
			jQuery.each(obj, function (i, v) {
				if (traditional || rbracket.test(prefix)) {

					// Treat each array item as a scalar.
					add(prefix, v);
				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(prefix + "[" + ((typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" && v != null ? i : "") + "]", v, traditional, add);
				}
			});
		} else if (!traditional && jQuery.type(obj) === "object") {

			// Serialize object item.
			for (name in obj) {
				buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
			}
		} else {

			// Serialize scalar item.
			add(prefix, obj);
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function (a, traditional) {
		var prefix,
		    s = [],
		    add = function add(key, valueOrFunction) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;

			s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
		};

		// If an array was passed in, assume that it is an array of form elements.
		if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {

			// Serialize the form elements
			jQuery.each(a, function () {
				add(this.name, this.value);
			});
		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for (prefix in a) {
				buildParams(prefix, a[prefix], traditional, add);
			}
		}

		// Return the resulting serialization
		return s.join("&");
	};

	jQuery.fn.extend({
		serialize: function serialize() {
			return jQuery.param(this.serializeArray());
		},
		serializeArray: function serializeArray() {
			return this.map(function () {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop(this, "elements");
				return elements ? jQuery.makeArray(elements) : this;
			}).filter(function () {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
			}).map(function (i, elem) {
				var val = jQuery(this).val();

				if (val == null) {
					return null;
				}

				if (Array.isArray(val)) {
					return jQuery.map(val, function (val) {
						return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
					});
				}

				return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
			}).get();
		}
	});

	var r20 = /%20/g,
	    rhash = /#.*$/,
	    rantiCache = /([?&])_=[^&]*/,
	    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,


	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	    rnoContent = /^(?:GET|HEAD)$/,
	    rprotocol = /^\/\//,


	/* Prefilters
  * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
  * 2) These are called:
  *    - BEFORE asking for a transport
  *    - AFTER param serialization (s.data is a string if s.processData is true)
  * 3) key is the dataType
  * 4) the catchall symbol "*" can be used
  * 5) execution will start with transport dataType and THEN continue down to "*" if needed
  */
	prefilters = {},


	/* Transports bindings
  * 1) key is the dataType
  * 2) the catchall symbol "*" can be used
  * 3) selection will start with transport dataType and THEN go to "*" if needed
  */
	transports = {},


	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*"),


	// Anchor tag for parsing the document origin
	originAnchor = document.createElement("a");
	originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports(structure) {

		// dataTypeExpression is optional and defaults to "*"
		return function (dataTypeExpression, func) {

			if (typeof dataTypeExpression !== "string") {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
			    i = 0,
			    dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

			if (jQuery.isFunction(func)) {

				// For each dataType in the dataTypeExpression
				while (dataType = dataTypes[i++]) {

					// Prepend if requested
					if (dataType[0] === "+") {
						dataType = dataType.slice(1) || "*";
						(structure[dataType] = structure[dataType] || []).unshift(func);

						// Otherwise append
					} else {
						(structure[dataType] = structure[dataType] || []).push(func);
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

		var inspected = {},
		    seekingTransport = structure === transports;

		function inspect(dataType) {
			var selected;
			inspected[dataType] = true;
			jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
				var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
				if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {

					options.dataTypes.unshift(dataTypeOrTransport);
					inspect(dataTypeOrTransport);
					return false;
				} else if (seekingTransport) {
					return !(selected = dataTypeOrTransport);
				}
			});
			return selected;
		}

		return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend(target, src) {
		var key,
		    deep,
		    flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for (key in src) {
			if (src[key] !== undefined) {
				(flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
			}
		}
		if (deep) {
			jQuery.extend(true, target, deep);
		}

		return target;
	}

	/* Handles responses to an ajax request:
  * - finds the right dataType (mediates between content-type and expected dataType)
  * - returns the corresponding response
  */
	function ajaxHandleResponses(s, jqXHR, responses) {

		var ct,
		    type,
		    finalDataType,
		    firstDataType,
		    contents = s.contents,
		    dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while (dataTypes[0] === "*") {
			dataTypes.shift();
			if (ct === undefined) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if (ct) {
			for (type in contents) {
				if (contents[type] && contents[type].test(ct)) {
					dataTypes.unshift(type);
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if (dataTypes[0] in responses) {
			finalDataType = dataTypes[0];
		} else {

			// Try convertible dataTypes
			for (type in responses) {
				if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
					finalDataType = type;
					break;
				}
				if (!firstDataType) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if (finalDataType) {
			if (finalDataType !== dataTypes[0]) {
				dataTypes.unshift(finalDataType);
			}
			return responses[finalDataType];
		}
	}

	/* Chain conversions given the request and the original response
  * Also sets the responseXXX fields on the jqXHR instance
  */
	function ajaxConvert(s, response, jqXHR, isSuccess) {
		var conv2,
		    current,
		    conv,
		    tmp,
		    prev,
		    converters = {},


		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if (dataTypes[1]) {
			for (conv in s.converters) {
				converters[conv.toLowerCase()] = s.converters[conv];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while (current) {

			if (s.responseFields[current]) {
				jqXHR[s.responseFields[current]] = response;
			}

			// Apply the dataFilter if provided
			if (!prev && isSuccess && s.dataFilter) {
				response = s.dataFilter(response, s.dataType);
			}

			prev = current;
			current = dataTypes.shift();

			if (current) {

				// There's only work to do if current dataType is non-auto
				if (current === "*") {

					current = prev;

					// Convert response if prev dataType is non-auto and differs from current
				} else if (prev !== "*" && prev !== current) {

					// Seek a direct converter
					conv = converters[prev + " " + current] || converters["* " + current];

					// If none found, seek a pair
					if (!conv) {
						for (conv2 in converters) {

							// If conv2 outputs current
							tmp = conv2.split(" ");
							if (tmp[1] === current) {

								// If prev can be converted to accepted input
								conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
								if (conv) {

									// Condense equivalence converters
									if (conv === true) {
										conv = converters[conv2];

										// Otherwise, insert the intermediate dataType
									} else if (converters[conv2] !== true) {
										current = tmp[0];
										dataTypes.unshift(tmp[1]);
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if (conv !== true) {

						// Unless errors are allowed to bubble, catch and return them
						if (conv && s.throws) {
							response = conv(response);
						} else {
							try {
								response = conv(response);
							} catch (e) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test(location.protocol),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",

			/*
   timeout: 0,
   data: null,
   dataType: null,
   username: null,
   password: null,
   cache: null,
   throws: false,
   traditional: false,
   headers: {},
   */

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": JSON.parse,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function ajaxSetup(target, settings) {
			return settings ?

			// Building a settings object
			ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

			// Extending ajaxSettings
			ajaxExtend(jQuery.ajaxSettings, target);
		},

		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),

		// Main method
		ajax: function ajax(url, options) {

			// If url is an object, simulate pre-1.5 signature
			if ((typeof url === "undefined" ? "undefined" : _typeof(url)) === "object") {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,


			// URL without anti-cache param
			cacheURL,


			// Response headers
			responseHeadersString,
			    responseHeaders,


			// timeout handle
			timeoutTimer,


			// Url cleanup var
			urlAnchor,


			// Request state (becomes false upon send and true upon completion)
			completed,


			// To know if global events are to be dispatched
			fireGlobals,


			// Loop variable
			i,


			// uncached part of the url
			uncached,


			// Create the final options object
			s = jQuery.ajaxSetup({}, options),


			// Callbacks context
			callbackContext = s.context || s,


			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,


			// Deferreds
			deferred = jQuery.Deferred(),
			    completeDeferred = jQuery.Callbacks("once memory"),


			// Status-dependent callbacks
			_statusCode = s.statusCode || {},


			// Headers (they are sent all at once)
			requestHeaders = {},
			    requestHeadersNames = {},


			// Default abort message
			strAbort = "canceled",


			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function getResponseHeader(key) {
					var match;
					if (completed) {
						if (!responseHeaders) {
							responseHeaders = {};
							while (match = rheaders.exec(responseHeadersString)) {
								responseHeaders[match[1].toLowerCase()] = match[2];
							}
						}
						match = responseHeaders[key.toLowerCase()];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function getAllResponseHeaders() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function setRequestHeader(name, value) {
					if (completed == null) {
						name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
						requestHeaders[name] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function overrideMimeType(type) {
					if (completed == null) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function statusCode(map) {
					var code;
					if (map) {
						if (completed) {

							// Execute the appropriate callbacks
							jqXHR.always(map[jqXHR.status]);
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for (code in map) {
								_statusCode[code] = [_statusCode[code], map[code]];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function abort(statusText) {
					var finalText = statusText || strAbort;
					if (transport) {
						transport.abort(finalText);
					}
					done(0, finalText);
					return this;
				}
			};

			// Attach deferreds
			deferred.promise(jqXHR);

			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if (s.crossDomain == null) {
				urlAnchor = document.createElement("a");

				// Support: IE <=8 - 11, Edge 12 - 13
				// IE throws exception on accessing the href property if url is malformed,
				// e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE <=8 - 11 only
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
				} catch (e) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if (s.data && s.processData && typeof s.data !== "string") {
				s.data = jQuery.param(s.data, s.traditional);
			}

			// Apply prefilters
			inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

			// If request was aborted inside a prefilter, stop there
			if (completed) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if (fireGlobals && jQuery.active++ === 0) {
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test(s.type);

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			// Remove hash to simplify url manipulation
			cacheURL = s.url.replace(rhash, "");

			// More options handling for requests with no content
			if (!s.hasContent) {

				// Remember the hash so we can put it back
				uncached = s.url.slice(cacheURL.length);

				// If data is available, append data to url
				if (s.data) {
					cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add or update anti-cache param if needed
				if (s.cache === false) {
					cacheURL = cacheURL.replace(rantiCache, "$1");
					uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++ + uncached;
				}

				// Put hash and anti-cache on the URL that will be requested (gh-1732)
				s.url = cacheURL + uncached;

				// Change '%20' to '+' if this is encoded form body content (gh-2658)
			} else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
				s.data = s.data.replace(r20, "+");
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if (s.ifModified) {
				if (jQuery.lastModified[cacheURL]) {
					jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
				}
				if (jQuery.etag[cacheURL]) {
					jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
				}
			}

			// Set the correct header, if data is being sent
			if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
				jqXHR.setRequestHeader("Content-Type", s.contentType);
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);

			// Check for headers option
			for (i in s.headers) {
				jqXHR.setRequestHeader(i, s.headers[i]);
			}

			// Allow custom headers/mimetypes and early abort
			if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			completeDeferred.add(s.complete);
			jqXHR.done(s.success);
			jqXHR.fail(s.error);

			// Get transport
			transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

			// If no transport, we auto-abort
			if (!transport) {
				done(-1, "No Transport");
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if (fireGlobals) {
					globalEventContext.trigger("ajaxSend", [jqXHR, s]);
				}

				// If request was aborted inside ajaxSend, stop there
				if (completed) {
					return jqXHR;
				}

				// Timeout
				if (s.async && s.timeout > 0) {
					timeoutTimer = window.setTimeout(function () {
						jqXHR.abort("timeout");
					}, s.timeout);
				}

				try {
					completed = false;
					transport.send(requestHeaders, done);
				} catch (e) {

					// Rethrow post-completion exceptions
					if (completed) {
						throw e;
					}

					// Propagate others as results
					done(-1, e);
				}
			}

			// Callback for when everything is done
			function done(status, nativeStatusText, responses, headers) {
				var isSuccess,
				    success,
				    error,
				    response,
				    modified,
				    statusText = nativeStatusText;

				// Ignore repeat invocations
				if (completed) {
					return;
				}

				completed = true;

				// Clear timeout if it exists
				if (timeoutTimer) {
					window.clearTimeout(timeoutTimer);
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if (responses) {
					response = ajaxHandleResponses(s, jqXHR, responses);
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert(s, response, jqXHR, isSuccess);

				// If successful, handle type chaining
				if (isSuccess) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if (s.ifModified) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if (modified) {
							jQuery.lastModified[cacheURL] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if (modified) {
							jQuery.etag[cacheURL] = modified;
						}
					}

					// if no content
					if (status === 204 || s.type === "HEAD") {
						statusText = "nocontent";

						// if not modified
					} else if (status === 304) {
						statusText = "notmodified";

						// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if (status || !statusText) {
						statusText = "error";
						if (status < 0) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = (nativeStatusText || statusText) + "";

				// Success/Error
				if (isSuccess) {
					deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
				} else {
					deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
				}

				// Status-dependent callbacks
				jqXHR.statusCode(_statusCode);
				_statusCode = undefined;

				if (fireGlobals) {
					globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
				}

				// Complete
				completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

				if (fireGlobals) {
					globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

					// Handle the global AJAX counter
					if (! --jQuery.active) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getJSON: function getJSON(url, data, callback) {
			return jQuery.get(url, data, callback, "json");
		},

		getScript: function getScript(url, callback) {
			return jQuery.get(url, undefined, callback, "script");
		}
	});

	jQuery.each(["get", "post"], function (i, method) {
		jQuery[method] = function (url, data, callback, type) {

			// Shift arguments if data argument was omitted
			if (jQuery.isFunction(data)) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax(jQuery.extend({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject(url) && url));
		};
	});

	jQuery._evalUrl = function (url) {
		return jQuery.ajax({
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			cache: true,
			async: false,
			global: false,
			"throws": true
		});
	};

	jQuery.fn.extend({
		wrapAll: function wrapAll(html) {
			var wrap;

			if (this[0]) {
				if (jQuery.isFunction(html)) {
					html = html.call(this[0]);
				}

				// The elements to wrap the target around
				wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

				if (this[0].parentNode) {
					wrap.insertBefore(this[0]);
				}

				wrap.map(function () {
					var elem = this;

					while (elem.firstElementChild) {
						elem = elem.firstElementChild;
					}

					return elem;
				}).append(this);
			}

			return this;
		},

		wrapInner: function wrapInner(html) {
			if (jQuery.isFunction(html)) {
				return this.each(function (i) {
					jQuery(this).wrapInner(html.call(this, i));
				});
			}

			return this.each(function () {
				var self = jQuery(this),
				    contents = self.contents();

				if (contents.length) {
					contents.wrapAll(html);
				} else {
					self.append(html);
				}
			});
		},

		wrap: function wrap(html) {
			var isFunction = jQuery.isFunction(html);

			return this.each(function (i) {
				jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
			});
		},

		unwrap: function unwrap(selector) {
			this.parent(selector).not("body").each(function () {
				jQuery(this).replaceWith(this.childNodes);
			});
			return this;
		}
	});

	jQuery.expr.pseudos.hidden = function (elem) {
		return !jQuery.expr.pseudos.visible(elem);
	};
	jQuery.expr.pseudos.visible = function (elem) {
		return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
	};

	jQuery.ajaxSettings.xhr = function () {
		try {
			return new window.XMLHttpRequest();
		} catch (e) {}
	};

	var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	    xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport(function (options) {
		var _callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if (support.cors || xhrSupported && !options.crossDomain) {
			return {
				send: function send(headers, complete) {
					var i,
					    xhr = options.xhr();

					xhr.open(options.type, options.url, options.async, options.username, options.password);

					// Apply custom fields if provided
					if (options.xhrFields) {
						for (i in options.xhrFields) {
							xhr[i] = options.xhrFields[i];
						}
					}

					// Override mime type if needed
					if (options.mimeType && xhr.overrideMimeType) {
						xhr.overrideMimeType(options.mimeType);
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if (!options.crossDomain && !headers["X-Requested-With"]) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for (i in headers) {
						xhr.setRequestHeader(i, headers[i]);
					}

					// Callback
					_callback = function callback(type) {
						return function () {
							if (_callback) {
								_callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if (type === "abort") {
									xhr.abort();
								} else if (type === "error") {

									// Support: IE <=9 only
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if (typeof xhr.status !== "number") {
										complete(0, "error");
									} else {
										complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status, xhr.statusText);
									}
								} else {
									complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									(xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText }, xhr.getAllResponseHeaders());
								}
							}
						};
					};

					// Listen to events
					xhr.onload = _callback();
					errorCallback = xhr.onerror = _callback("error");

					// Support: IE 9 only
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if (xhr.onabort !== undefined) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function () {

							// Check readyState before timeout as it changes
							if (xhr.readyState === 4) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout(function () {
									if (_callback) {
										errorCallback();
									}
								});
							}
						};
					}

					// Create the abort callback
					_callback = _callback("abort");

					try {

						// Do send the request (this may raise an exception)
						xhr.send(options.hasContent && options.data || null);
					} catch (e) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if (_callback) {
							throw e;
						}
					}
				},

				abort: function abort() {
					if (_callback) {
						_callback();
					}
				}
			};
		}
	});

	// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
	jQuery.ajaxPrefilter(function (s) {
		if (s.crossDomain) {
			s.contents.script = false;
		}
	});

	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function textScript(text) {
				jQuery.globalEval(text);
				return text;
			}
		}
	});

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter("script", function (s) {
		if (s.cache === undefined) {
			s.cache = false;
		}
		if (s.crossDomain) {
			s.type = "GET";
		}
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport("script", function (s) {

		// This transport only deals with cross domain requests
		if (s.crossDomain) {
			var script, _callback2;
			return {
				send: function send(_, complete) {
					script = jQuery("<script>").prop({
						charset: s.scriptCharset,
						src: s.url
					}).on("load error", _callback2 = function callback(evt) {
						script.remove();
						_callback2 = null;
						if (evt) {
							complete(evt.type === "error" ? 404 : 200, evt.type);
						}
					});

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild(script[0]);
				},
				abort: function abort() {
					if (_callback2) {
						_callback2();
					}
				}
			};
		}
	});

	var oldCallbacks = [],
	    rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function jsonpCallback() {
			var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
			this[callback] = true;
			return callback;
		}
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

		var callbackName,
		    overwritten,
		    responseContainer,
		    jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if (jsonProp || s.dataTypes[0] === "jsonp") {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;

			// Insert callback into url or form data
			if (jsonProp) {
				s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
			} else if (s.jsonp !== false) {
				s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function () {
				if (!responseContainer) {
					jQuery.error(callbackName + " was not called");
				}
				return responseContainer[0];
			};

			// Force json dataType
			s.dataTypes[0] = "json";

			// Install callback
			overwritten = window[callbackName];
			window[callbackName] = function () {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(function () {

				// If previous value didn't exist - remove it
				if (overwritten === undefined) {
					jQuery(window).removeProp(callbackName);

					// Otherwise restore preexisting value
				} else {
					window[callbackName] = overwritten;
				}

				// Save back as free
				if (s[callbackName]) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push(callbackName);
				}

				// Call if it was a function and we have a response
				if (responseContainer && jQuery.isFunction(overwritten)) {
					overwritten(responseContainer[0]);
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return "script";
		}
	});

	// Support: Safari 8 only
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = function () {
		var body = document.implementation.createHTMLDocument("").body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	}();

	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function (data, context, keepScripts) {
		if (typeof data !== "string") {
			return [];
		}
		if (typeof context === "boolean") {
			keepScripts = context;
			context = false;
		}

		var base, parsed, scripts;

		if (!context) {

			// Stop scripts or inline event handlers from being executed immediately
			// by using document.implementation
			if (support.createHTMLDocument) {
				context = document.implementation.createHTMLDocument("");

				// Set the base href for the created document
				// so any parsed elements with URLs
				// are based on the document's URL (gh-2965)
				base = context.createElement("base");
				base.href = document.location.href;
				context.head.appendChild(base);
			} else {
				context = document;
			}
		}

		parsed = rsingleTag.exec(data);
		scripts = !keepScripts && [];

		// Single tag
		if (parsed) {
			return [context.createElement(parsed[1])];
		}

		parsed = buildFragment([data], context, scripts);

		if (scripts && scripts.length) {
			jQuery(scripts).remove();
		}

		return jQuery.merge([], parsed.childNodes);
	};

	/**
  * Load a url into a page
  */
	jQuery.fn.load = function (url, params, callback) {
		var selector,
		    type,
		    response,
		    self = this,
		    off = url.indexOf(" ");

		if (off > -1) {
			selector = stripAndCollapse(url.slice(off));
			url = url.slice(0, off);
		}

		// If it's a function
		if (jQuery.isFunction(params)) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

			// Otherwise, build a param string
		} else if (params && (typeof params === "undefined" ? "undefined" : _typeof(params)) === "object") {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if (self.length > 0) {
			jQuery.ajax({
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			}).done(function (responseText) {

				// Save response for use in complete callback
				response = arguments;

				self.html(selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

				// Otherwise use the full result
				responseText);

				// If the request succeeds, this function gets "data", "status", "jqXHR"
				// but they are ignored because response was set above.
				// If it fails, this function gets "jqXHR", "status", "error"
			}).always(callback && function (jqXHR, status) {
				self.each(function () {
					callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
				});
			});
		}

		return this;
	};

	// Attach a bunch of functions for handling common AJAX events
	jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
		jQuery.fn[type] = function (fn) {
			return this.on(type, fn);
		};
	});

	jQuery.expr.pseudos.animated = function (elem) {
		return jQuery.grep(jQuery.timers, function (fn) {
			return elem === fn.elem;
		}).length;
	};

	jQuery.offset = {
		setOffset: function setOffset(elem, options, i) {
			var curPosition,
			    curLeft,
			    curCSSTop,
			    curTop,
			    curOffset,
			    curCSSLeft,
			    calculatePosition,
			    position = jQuery.css(elem, "position"),
			    curElem = jQuery(elem),
			    props = {};

			// Set position first, in-case top/left are set even on static elem
			if (position === "static") {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css(elem, "top");
			curCSSLeft = jQuery.css(elem, "left");
			calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if (calculatePosition) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else {
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0;
			}

			if (jQuery.isFunction(options)) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call(elem, i, jQuery.extend({}, curOffset));
			}

			if (options.top != null) {
				props.top = options.top - curOffset.top + curTop;
			}
			if (options.left != null) {
				props.left = options.left - curOffset.left + curLeft;
			}

			if ("using" in options) {
				options.using.call(elem, props);
			} else {
				curElem.css(props);
			}
		}
	};

	jQuery.fn.extend({
		offset: function offset(options) {

			// Preserve chaining for setter
			if (arguments.length) {
				return options === undefined ? this : this.each(function (i) {
					jQuery.offset.setOffset(this, options, i);
				});
			}

			var doc,
			    docElem,
			    rect,
			    win,
			    elem = this[0];

			if (!elem) {
				return;
			}

			// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
			// Support: IE <=11 only
			// Running getBoundingClientRect on a
			// disconnected node in IE throws an error
			if (!elem.getClientRects().length) {
				return { top: 0, left: 0 };
			}

			rect = elem.getBoundingClientRect();

			doc = elem.ownerDocument;
			docElem = doc.documentElement;
			win = doc.defaultView;

			return {
				top: rect.top + win.pageYOffset - docElem.clientTop,
				left: rect.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function position() {
			if (!this[0]) {
				return;
			}

			var offsetParent,
			    offset,
			    elem = this[0],
			    parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if (jQuery.css(elem, "position") === "fixed") {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();
			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if (!nodeName(offsetParent[0], "html")) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset = {
					top: parentOffset.top + jQuery.css(offsetParent[0], "borderTopWidth", true),
					left: parentOffset.left + jQuery.css(offsetParent[0], "borderLeftWidth", true)
				};
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
				left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function offsetParent() {
			return this.map(function () {
				var offsetParent = this.offsetParent;

				while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			});
		}
	});

	// Create scrollLeft and scrollTop methods
	jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
		var top = "pageYOffset" === prop;

		jQuery.fn[method] = function (val) {
			return access(this, function (elem, method, val) {

				// Coalesce documents and windows
				var win;
				if (jQuery.isWindow(elem)) {
					win = elem;
				} else if (elem.nodeType === 9) {
					win = elem.defaultView;
				}

				if (val === undefined) {
					return win ? win[prop] : elem[method];
				}

				if (win) {
					win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
				} else {
					elem[method] = val;
				}
			}, method, val, arguments.length);
		};
	});

	// Support: Safari <=7 - 9.1, Chrome <=37 - 49
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each(["top", "left"], function (i, prop) {
		jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
			if (computed) {
				computed = curCSS(elem, prop);

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
			}
		});
	});

	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
		jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[funcName] = function (margin, value) {
				var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
				    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

				return access(this, function (elem, type, value) {
					var doc;

					if (jQuery.isWindow(elem)) {

						// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
						return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
					}

					// Get document width or height
					if (elem.nodeType === 9) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
					}

					return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css(elem, type, extra) :

					// Set width or height on the element
					jQuery.style(elem, type, value, extra);
				}, type, chainable ? margin : undefined, chainable);
			};
		});
	});

	jQuery.fn.extend({

		bind: function bind(types, data, fn) {
			return this.on(types, null, data, fn);
		},
		unbind: function unbind(types, fn) {
			return this.off(types, null, fn);
		},

		delegate: function delegate(selector, types, data, fn) {
			return this.on(types, selector, data, fn);
		},
		undelegate: function undelegate(selector, types, fn) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
		}
	});

	jQuery.holdReady = function (hold) {
		if (hold) {
			jQuery.readyWait++;
		} else {
			jQuery.ready(true);
		}
	};
	jQuery.isArray = Array.isArray;
	jQuery.parseJSON = JSON.parse;
	jQuery.nodeName = nodeName;

	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if (typeof define === "function" && define.amd) {
		define("jquery", [], function () {
			return jQuery;
		});
	}

	var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,


	// Map over the $ in case of overwrite
	_$ = window.$;

	jQuery.noConflict = function (deep) {
		if (window.$ === jQuery) {
			window.$ = _$;
		}

		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if (!noGlobal) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3N0YXJ0Ym9vdHN0cmFwLW5ldy1hZ2UtNC1kZXYvdmVuZG9yL2pxdWVyeS9qcXVlcnkuanMiXSwibmFtZXMiOlsiZ2xvYmFsIiwiZmFjdG9yeSIsIm1vZHVsZSIsImV4cG9ydHMiLCJkb2N1bWVudCIsInciLCJFcnJvciIsIndpbmRvdyIsIm5vR2xvYmFsIiwiYXJyIiwiZ2V0UHJvdG8iLCJPYmplY3QiLCJnZXRQcm90b3R5cGVPZiIsInNsaWNlIiwiY29uY2F0IiwicHVzaCIsImluZGV4T2YiLCJjbGFzczJ0eXBlIiwidG9TdHJpbmciLCJoYXNPd24iLCJoYXNPd25Qcm9wZXJ0eSIsImZuVG9TdHJpbmciLCJPYmplY3RGdW5jdGlvblN0cmluZyIsImNhbGwiLCJzdXBwb3J0IiwiRE9NRXZhbCIsImNvZGUiLCJkb2MiLCJzY3JpcHQiLCJjcmVhdGVFbGVtZW50IiwidGV4dCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInZlcnNpb24iLCJqUXVlcnkiLCJzZWxlY3RvciIsImNvbnRleHQiLCJmbiIsImluaXQiLCJydHJpbSIsInJtc1ByZWZpeCIsInJkYXNoQWxwaGEiLCJmY2FtZWxDYXNlIiwiYWxsIiwibGV0dGVyIiwidG9VcHBlckNhc2UiLCJwcm90b3R5cGUiLCJqcXVlcnkiLCJjb25zdHJ1Y3RvciIsImxlbmd0aCIsInRvQXJyYXkiLCJnZXQiLCJudW0iLCJwdXNoU3RhY2siLCJlbGVtcyIsInJldCIsIm1lcmdlIiwicHJldk9iamVjdCIsImVhY2giLCJjYWxsYmFjayIsIm1hcCIsImVsZW0iLCJpIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJmaXJzdCIsImVxIiwibGFzdCIsImxlbiIsImoiLCJlbmQiLCJzb3J0Iiwic3BsaWNlIiwiZXh0ZW5kIiwib3B0aW9ucyIsIm5hbWUiLCJzcmMiLCJjb3B5IiwiY29weUlzQXJyYXkiLCJjbG9uZSIsInRhcmdldCIsImRlZXAiLCJpc0Z1bmN0aW9uIiwiaXNQbGFpbk9iamVjdCIsIkFycmF5IiwiaXNBcnJheSIsInVuZGVmaW5lZCIsImV4cGFuZG8iLCJNYXRoIiwicmFuZG9tIiwicmVwbGFjZSIsImlzUmVhZHkiLCJlcnJvciIsIm1zZyIsIm5vb3AiLCJvYmoiLCJ0eXBlIiwiaXNXaW5kb3ciLCJpc051bWVyaWMiLCJpc05hTiIsInBhcnNlRmxvYXQiLCJwcm90byIsIkN0b3IiLCJpc0VtcHR5T2JqZWN0IiwiZ2xvYmFsRXZhbCIsImNhbWVsQ2FzZSIsInN0cmluZyIsImlzQXJyYXlMaWtlIiwidHJpbSIsIm1ha2VBcnJheSIsInJlc3VsdHMiLCJpbkFycmF5Iiwic2Vjb25kIiwiZ3JlcCIsImludmVydCIsImNhbGxiYWNrSW52ZXJzZSIsIm1hdGNoZXMiLCJjYWxsYmFja0V4cGVjdCIsImFyZyIsInZhbHVlIiwiZ3VpZCIsInByb3h5IiwidG1wIiwiYXJncyIsIm5vdyIsIkRhdGUiLCJTeW1ib2wiLCJpdGVyYXRvciIsInNwbGl0IiwidG9Mb3dlckNhc2UiLCJTaXp6bGUiLCJFeHByIiwiZ2V0VGV4dCIsImlzWE1MIiwidG9rZW5pemUiLCJjb21waWxlIiwic2VsZWN0Iiwib3V0ZXJtb3N0Q29udGV4dCIsInNvcnRJbnB1dCIsImhhc0R1cGxpY2F0ZSIsInNldERvY3VtZW50IiwiZG9jRWxlbSIsImRvY3VtZW50SXNIVE1MIiwicmJ1Z2d5UVNBIiwicmJ1Z2d5TWF0Y2hlcyIsImNvbnRhaW5zIiwicHJlZmVycmVkRG9jIiwiZGlycnVucyIsImRvbmUiLCJjbGFzc0NhY2hlIiwiY3JlYXRlQ2FjaGUiLCJ0b2tlbkNhY2hlIiwiY29tcGlsZXJDYWNoZSIsInNvcnRPcmRlciIsImEiLCJiIiwicG9wIiwicHVzaF9uYXRpdmUiLCJsaXN0IiwiYm9vbGVhbnMiLCJ3aGl0ZXNwYWNlIiwiaWRlbnRpZmllciIsImF0dHJpYnV0ZXMiLCJwc2V1ZG9zIiwicndoaXRlc3BhY2UiLCJSZWdFeHAiLCJyY29tbWEiLCJyY29tYmluYXRvcnMiLCJyYXR0cmlidXRlUXVvdGVzIiwicnBzZXVkbyIsInJpZGVudGlmaWVyIiwibWF0Y2hFeHByIiwicmlucHV0cyIsInJoZWFkZXIiLCJybmF0aXZlIiwicnF1aWNrRXhwciIsInJzaWJsaW5nIiwicnVuZXNjYXBlIiwiZnVuZXNjYXBlIiwiXyIsImVzY2FwZWQiLCJlc2NhcGVkV2hpdGVzcGFjZSIsImhpZ2giLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJyY3NzZXNjYXBlIiwiZmNzc2VzY2FwZSIsImNoIiwiYXNDb2RlUG9pbnQiLCJjaGFyQ29kZUF0IiwidW5sb2FkSGFuZGxlciIsImRpc2FibGVkQW5jZXN0b3IiLCJhZGRDb21iaW5hdG9yIiwiZGlzYWJsZWQiLCJkaXIiLCJuZXh0IiwiY2hpbGROb2RlcyIsIm5vZGVUeXBlIiwiZSIsImVscyIsInNlZWQiLCJtIiwibmlkIiwibWF0Y2giLCJncm91cHMiLCJuZXdTZWxlY3RvciIsIm5ld0NvbnRleHQiLCJvd25lckRvY3VtZW50IiwiZXhlYyIsImdldEVsZW1lbnRCeUlkIiwiaWQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJxc2EiLCJ0ZXN0Iiwibm9kZU5hbWUiLCJnZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJ0b1NlbGVjdG9yIiwiam9pbiIsInRlc3RDb250ZXh0IiwicXVlcnlTZWxlY3RvckFsbCIsInFzYUVycm9yIiwicmVtb3ZlQXR0cmlidXRlIiwia2V5cyIsImNhY2hlIiwia2V5IiwiY2FjaGVMZW5ndGgiLCJzaGlmdCIsIm1hcmtGdW5jdGlvbiIsImFzc2VydCIsImVsIiwiYWRkSGFuZGxlIiwiYXR0cnMiLCJoYW5kbGVyIiwiYXR0ckhhbmRsZSIsInNpYmxpbmdDaGVjayIsImN1ciIsImRpZmYiLCJzb3VyY2VJbmRleCIsIm5leHRTaWJsaW5nIiwiY3JlYXRlSW5wdXRQc2V1ZG8iLCJjcmVhdGVCdXR0b25Qc2V1ZG8iLCJjcmVhdGVEaXNhYmxlZFBzZXVkbyIsImlzRGlzYWJsZWQiLCJjcmVhdGVQb3NpdGlvbmFsUHNldWRvIiwiYXJndW1lbnQiLCJtYXRjaEluZGV4ZXMiLCJkb2N1bWVudEVsZW1lbnQiLCJub2RlIiwiaGFzQ29tcGFyZSIsInN1YldpbmRvdyIsImRlZmF1bHRWaWV3IiwidG9wIiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dGFjaEV2ZW50IiwiY2xhc3NOYW1lIiwiY3JlYXRlQ29tbWVudCIsImdldEJ5SWQiLCJnZXRFbGVtZW50c0J5TmFtZSIsImZpbHRlciIsImF0dHJJZCIsImZpbmQiLCJnZXRBdHRyaWJ1dGVOb2RlIiwidGFnIiwiaW5uZXJIVE1MIiwiaW5wdXQiLCJtYXRjaGVzU2VsZWN0b3IiLCJ3ZWJraXRNYXRjaGVzU2VsZWN0b3IiLCJtb3pNYXRjaGVzU2VsZWN0b3IiLCJvTWF0Y2hlc1NlbGVjdG9yIiwibXNNYXRjaGVzU2VsZWN0b3IiLCJkaXNjb25uZWN0ZWRNYXRjaCIsImNvbXBhcmVEb2N1bWVudFBvc2l0aW9uIiwiYWRvd24iLCJidXAiLCJjb21wYXJlIiwic29ydERldGFjaGVkIiwiYXVwIiwiYXAiLCJicCIsInVuc2hpZnQiLCJleHByIiwiZWxlbWVudHMiLCJhdHRyIiwidmFsIiwic3BlY2lmaWVkIiwiZXNjYXBlIiwic2VsIiwidW5pcXVlU29ydCIsImR1cGxpY2F0ZXMiLCJkZXRlY3REdXBsaWNhdGVzIiwic29ydFN0YWJsZSIsInRleHRDb250ZW50IiwiZmlyc3RDaGlsZCIsIm5vZGVWYWx1ZSIsInNlbGVjdG9ycyIsImNyZWF0ZVBzZXVkbyIsInJlbGF0aXZlIiwicHJlRmlsdGVyIiwiZXhjZXNzIiwidW5xdW90ZWQiLCJub2RlTmFtZVNlbGVjdG9yIiwicGF0dGVybiIsIm9wZXJhdG9yIiwiY2hlY2siLCJyZXN1bHQiLCJ3aGF0Iiwic2ltcGxlIiwiZm9yd2FyZCIsIm9mVHlwZSIsInhtbCIsInVuaXF1ZUNhY2hlIiwib3V0ZXJDYWNoZSIsIm5vZGVJbmRleCIsInN0YXJ0IiwicGFyZW50IiwidXNlQ2FjaGUiLCJsYXN0Q2hpbGQiLCJ1bmlxdWVJRCIsInBzZXVkbyIsInNldEZpbHRlcnMiLCJpZHgiLCJtYXRjaGVkIiwibWF0Y2hlciIsInVubWF0Y2hlZCIsImlubmVyVGV4dCIsImxhbmciLCJlbGVtTGFuZyIsImhhc2giLCJsb2NhdGlvbiIsImFjdGl2ZUVsZW1lbnQiLCJoYXNGb2N1cyIsImhyZWYiLCJ0YWJJbmRleCIsImNoZWNrZWQiLCJzZWxlY3RlZCIsInNlbGVjdGVkSW5kZXgiLCJyYWRpbyIsImNoZWNrYm94IiwiZmlsZSIsInBhc3N3b3JkIiwiaW1hZ2UiLCJzdWJtaXQiLCJyZXNldCIsImZpbHRlcnMiLCJwYXJzZU9ubHkiLCJ0b2tlbnMiLCJzb0ZhciIsInByZUZpbHRlcnMiLCJjYWNoZWQiLCJjb21iaW5hdG9yIiwiYmFzZSIsInNraXAiLCJjaGVja05vbkVsZW1lbnRzIiwiZG9uZU5hbWUiLCJvbGRDYWNoZSIsIm5ld0NhY2hlIiwiZWxlbWVudE1hdGNoZXIiLCJtYXRjaGVycyIsIm11bHRpcGxlQ29udGV4dHMiLCJjb250ZXh0cyIsImNvbmRlbnNlIiwibmV3VW5tYXRjaGVkIiwibWFwcGVkIiwic2V0TWF0Y2hlciIsInBvc3RGaWx0ZXIiLCJwb3N0RmluZGVyIiwicG9zdFNlbGVjdG9yIiwidGVtcCIsInByZU1hcCIsInBvc3RNYXAiLCJwcmVleGlzdGluZyIsIm1hdGNoZXJJbiIsIm1hdGNoZXJPdXQiLCJtYXRjaGVyRnJvbVRva2VucyIsImNoZWNrQ29udGV4dCIsImxlYWRpbmdSZWxhdGl2ZSIsImltcGxpY2l0UmVsYXRpdmUiLCJtYXRjaENvbnRleHQiLCJtYXRjaEFueUNvbnRleHQiLCJtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMiLCJlbGVtZW50TWF0Y2hlcnMiLCJzZXRNYXRjaGVycyIsImJ5U2V0IiwiYnlFbGVtZW50Iiwic3VwZXJNYXRjaGVyIiwib3V0ZXJtb3N0IiwibWF0Y2hlZENvdW50Iiwic2V0TWF0Y2hlZCIsImNvbnRleHRCYWNrdXAiLCJkaXJydW5zVW5pcXVlIiwidG9rZW4iLCJjb21waWxlZCIsImRlZmF1bHRWYWx1ZSIsInVuaXF1ZSIsImlzWE1MRG9jIiwiZXNjYXBlU2VsZWN0b3IiLCJ1bnRpbCIsInRydW5jYXRlIiwiaXMiLCJzaWJsaW5ncyIsIm4iLCJybmVlZHNDb250ZXh0IiwibmVlZHNDb250ZXh0IiwicnNpbmdsZVRhZyIsInJpc1NpbXBsZSIsIndpbm5vdyIsInF1YWxpZmllciIsIm5vdCIsInNlbGYiLCJyb290alF1ZXJ5Iiwicm9vdCIsInBhcnNlSFRNTCIsInJlYWR5IiwicnBhcmVudHNwcmV2IiwiZ3VhcmFudGVlZFVuaXF1ZSIsImNoaWxkcmVuIiwiY29udGVudHMiLCJwcmV2IiwiaGFzIiwidGFyZ2V0cyIsImwiLCJjbG9zZXN0IiwiaW5kZXgiLCJwcmV2QWxsIiwiYWRkIiwiYWRkQmFjayIsInNpYmxpbmciLCJwYXJlbnRzIiwicGFyZW50c1VudGlsIiwibmV4dEFsbCIsIm5leHRVbnRpbCIsInByZXZVbnRpbCIsImNvbnRlbnREb2N1bWVudCIsImNvbnRlbnQiLCJyZXZlcnNlIiwicm5vdGh0bWx3aGl0ZSIsImNyZWF0ZU9wdGlvbnMiLCJvYmplY3QiLCJmbGFnIiwiQ2FsbGJhY2tzIiwiZmlyaW5nIiwibWVtb3J5IiwiZmlyZWQiLCJsb2NrZWQiLCJxdWV1ZSIsImZpcmluZ0luZGV4IiwiZmlyZSIsIm9uY2UiLCJzdG9wT25GYWxzZSIsInJlbW92ZSIsImVtcHR5IiwiZGlzYWJsZSIsImxvY2siLCJmaXJlV2l0aCIsIklkZW50aXR5IiwidiIsIlRocm93ZXIiLCJleCIsImFkb3B0VmFsdWUiLCJyZXNvbHZlIiwicmVqZWN0Iiwibm9WYWx1ZSIsIm1ldGhvZCIsInByb21pc2UiLCJmYWlsIiwidGhlbiIsIkRlZmVycmVkIiwiZnVuYyIsInR1cGxlcyIsInN0YXRlIiwiYWx3YXlzIiwiZGVmZXJyZWQiLCJwaXBlIiwiZm5zIiwibmV3RGVmZXIiLCJ0dXBsZSIsInJldHVybmVkIiwicHJvZ3Jlc3MiLCJub3RpZnkiLCJvbkZ1bGZpbGxlZCIsIm9uUmVqZWN0ZWQiLCJvblByb2dyZXNzIiwibWF4RGVwdGgiLCJkZXB0aCIsInNwZWNpYWwiLCJ0aGF0IiwibWlnaHRUaHJvdyIsIlR5cGVFcnJvciIsIm5vdGlmeVdpdGgiLCJyZXNvbHZlV2l0aCIsInByb2Nlc3MiLCJleGNlcHRpb25Ib29rIiwic3RhY2tUcmFjZSIsInJlamVjdFdpdGgiLCJnZXRTdGFja0hvb2siLCJzZXRUaW1lb3V0Iiwic3RhdGVTdHJpbmciLCJ3aGVuIiwic2luZ2xlVmFsdWUiLCJyZW1haW5pbmciLCJyZXNvbHZlQ29udGV4dHMiLCJyZXNvbHZlVmFsdWVzIiwibWFzdGVyIiwidXBkYXRlRnVuYyIsInJlcnJvck5hbWVzIiwic3RhY2siLCJjb25zb2xlIiwid2FybiIsIm1lc3NhZ2UiLCJyZWFkeUV4Y2VwdGlvbiIsInJlYWR5TGlzdCIsImNhdGNoIiwicmVhZHlXYWl0Iiwid2FpdCIsImNvbXBsZXRlZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZWFkeVN0YXRlIiwiZG9TY3JvbGwiLCJhY2Nlc3MiLCJjaGFpbmFibGUiLCJlbXB0eUdldCIsInJhdyIsImJ1bGsiLCJhY2NlcHREYXRhIiwib3duZXIiLCJEYXRhIiwidWlkIiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJzZXQiLCJkYXRhIiwicHJvcCIsImhhc0RhdGEiLCJkYXRhUHJpdiIsImRhdGFVc2VyIiwicmJyYWNlIiwicm11bHRpRGFzaCIsImdldERhdGEiLCJKU09OIiwicGFyc2UiLCJkYXRhQXR0ciIsInJlbW92ZURhdGEiLCJfZGF0YSIsIl9yZW1vdmVEYXRhIiwiZGVxdWV1ZSIsInN0YXJ0TGVuZ3RoIiwiaG9va3MiLCJfcXVldWVIb29rcyIsInN0b3AiLCJzZXR0ZXIiLCJjbGVhclF1ZXVlIiwiY291bnQiLCJkZWZlciIsInBudW0iLCJzb3VyY2UiLCJyY3NzTnVtIiwiY3NzRXhwYW5kIiwiaXNIaWRkZW5XaXRoaW5UcmVlIiwic3R5bGUiLCJkaXNwbGF5IiwiY3NzIiwic3dhcCIsIm9sZCIsImFkanVzdENTUyIsInZhbHVlUGFydHMiLCJ0d2VlbiIsImFkanVzdGVkIiwic2NhbGUiLCJtYXhJdGVyYXRpb25zIiwiY3VycmVudFZhbHVlIiwiaW5pdGlhbCIsInVuaXQiLCJjc3NOdW1iZXIiLCJpbml0aWFsSW5Vbml0IiwiZGVmYXVsdERpc3BsYXlNYXAiLCJnZXREZWZhdWx0RGlzcGxheSIsImJvZHkiLCJzaG93SGlkZSIsInNob3ciLCJ2YWx1ZXMiLCJoaWRlIiwidG9nZ2xlIiwicmNoZWNrYWJsZVR5cGUiLCJydGFnTmFtZSIsInJzY3JpcHRUeXBlIiwid3JhcE1hcCIsIm9wdGlvbiIsInRoZWFkIiwiY29sIiwidHIiLCJ0ZCIsIl9kZWZhdWx0Iiwib3B0Z3JvdXAiLCJ0Ym9keSIsInRmb290IiwiY29sZ3JvdXAiLCJjYXB0aW9uIiwidGgiLCJnZXRBbGwiLCJzZXRHbG9iYWxFdmFsIiwicmVmRWxlbWVudHMiLCJyaHRtbCIsImJ1aWxkRnJhZ21lbnQiLCJzY3JpcHRzIiwic2VsZWN0aW9uIiwiaWdub3JlZCIsIndyYXAiLCJmcmFnbWVudCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJub2RlcyIsImNyZWF0ZVRleHROb2RlIiwiaHRtbFByZWZpbHRlciIsImRpdiIsImNoZWNrQ2xvbmUiLCJjbG9uZU5vZGUiLCJub0Nsb25lQ2hlY2tlZCIsInJrZXlFdmVudCIsInJtb3VzZUV2ZW50IiwicnR5cGVuYW1lc3BhY2UiLCJyZXR1cm5UcnVlIiwicmV0dXJuRmFsc2UiLCJzYWZlQWN0aXZlRWxlbWVudCIsImVyciIsIm9uIiwidHlwZXMiLCJvbmUiLCJvcmlnRm4iLCJldmVudCIsIm9mZiIsImhhbmRsZU9iakluIiwiZXZlbnRIYW5kbGUiLCJldmVudHMiLCJ0IiwiaGFuZGxlT2JqIiwiaGFuZGxlcnMiLCJuYW1lc3BhY2VzIiwib3JpZ1R5cGUiLCJlbGVtRGF0YSIsImhhbmRsZSIsInRyaWdnZXJlZCIsImRpc3BhdGNoIiwiZGVsZWdhdGVUeXBlIiwiYmluZFR5cGUiLCJuYW1lc3BhY2UiLCJkZWxlZ2F0ZUNvdW50Iiwic2V0dXAiLCJtYXBwZWRUeXBlcyIsIm9yaWdDb3VudCIsInRlYXJkb3duIiwicmVtb3ZlRXZlbnQiLCJuYXRpdmVFdmVudCIsImZpeCIsImhhbmRsZXJRdWV1ZSIsImRlbGVnYXRlVGFyZ2V0IiwicHJlRGlzcGF0Y2giLCJpc1Byb3BhZ2F0aW9uU3RvcHBlZCIsImN1cnJlbnRUYXJnZXQiLCJpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCIsInJuYW1lc3BhY2UiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsInBvc3REaXNwYXRjaCIsIm1hdGNoZWRIYW5kbGVycyIsIm1hdGNoZWRTZWxlY3RvcnMiLCJidXR0b24iLCJhZGRQcm9wIiwiaG9vayIsIkV2ZW50IiwiZW51bWVyYWJsZSIsIm9yaWdpbmFsRXZlbnQiLCJ3cml0YWJsZSIsImxvYWQiLCJub0J1YmJsZSIsImZvY3VzIiwidHJpZ2dlciIsImJsdXIiLCJjbGljayIsImJlZm9yZXVubG9hZCIsInJldHVyblZhbHVlIiwicHJvcHMiLCJpc0RlZmF1bHRQcmV2ZW50ZWQiLCJkZWZhdWx0UHJldmVudGVkIiwicmVsYXRlZFRhcmdldCIsInRpbWVTdGFtcCIsImlzU2ltdWxhdGVkIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwiYWx0S2V5IiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJjaGFuZ2VkVG91Y2hlcyIsImN0cmxLZXkiLCJkZXRhaWwiLCJldmVudFBoYXNlIiwibWV0YUtleSIsInBhZ2VYIiwicGFnZVkiLCJzaGlmdEtleSIsInZpZXciLCJjaGFyQ29kZSIsImtleUNvZGUiLCJidXR0b25zIiwiY2xpZW50WCIsImNsaWVudFkiLCJvZmZzZXRYIiwib2Zmc2V0WSIsInBvaW50ZXJJZCIsInBvaW50ZXJUeXBlIiwic2NyZWVuWCIsInNjcmVlblkiLCJ0YXJnZXRUb3VjaGVzIiwidG9FbGVtZW50IiwidG91Y2hlcyIsIndoaWNoIiwibW91c2VlbnRlciIsIm1vdXNlbGVhdmUiLCJwb2ludGVyZW50ZXIiLCJwb2ludGVybGVhdmUiLCJvcmlnIiwicmVsYXRlZCIsInJ4aHRtbFRhZyIsInJub0lubmVyaHRtbCIsInJjaGVja2VkIiwicnNjcmlwdFR5cGVNYXNrZWQiLCJyY2xlYW5TY3JpcHQiLCJtYW5pcHVsYXRpb25UYXJnZXQiLCJkaXNhYmxlU2NyaXB0IiwicmVzdG9yZVNjcmlwdCIsImNsb25lQ29weUV2ZW50IiwiZGVzdCIsInBkYXRhT2xkIiwicGRhdGFDdXIiLCJ1ZGF0YU9sZCIsInVkYXRhQ3VyIiwiZml4SW5wdXQiLCJkb21NYW5pcCIsImNvbGxlY3Rpb24iLCJoYXNTY3JpcHRzIiwiaU5vQ2xvbmUiLCJodG1sIiwiX2V2YWxVcmwiLCJrZWVwRGF0YSIsImNsZWFuRGF0YSIsImRhdGFBbmRFdmVudHMiLCJkZWVwRGF0YUFuZEV2ZW50cyIsInNyY0VsZW1lbnRzIiwiZGVzdEVsZW1lbnRzIiwiaW5QYWdlIiwiZGV0YWNoIiwiYXBwZW5kIiwicHJlcGVuZCIsImluc2VydEJlZm9yZSIsImJlZm9yZSIsImFmdGVyIiwicmVwbGFjZVdpdGgiLCJyZXBsYWNlQ2hpbGQiLCJhcHBlbmRUbyIsInByZXBlbmRUbyIsImluc2VydEFmdGVyIiwicmVwbGFjZUFsbCIsIm9yaWdpbmFsIiwiaW5zZXJ0Iiwicm1hcmdpbiIsInJudW1ub25weCIsImdldFN0eWxlcyIsIm9wZW5lciIsImdldENvbXB1dGVkU3R5bGUiLCJjb21wdXRlU3R5bGVUZXN0cyIsImNzc1RleHQiLCJjb250YWluZXIiLCJkaXZTdHlsZSIsInBpeGVsUG9zaXRpb25WYWwiLCJyZWxpYWJsZU1hcmdpbkxlZnRWYWwiLCJtYXJnaW5MZWZ0IiwiYm94U2l6aW5nUmVsaWFibGVWYWwiLCJ3aWR0aCIsIm1hcmdpblJpZ2h0IiwicGl4ZWxNYXJnaW5SaWdodFZhbCIsImJhY2tncm91bmRDbGlwIiwiY2xlYXJDbG9uZVN0eWxlIiwicGl4ZWxQb3NpdGlvbiIsImJveFNpemluZ1JlbGlhYmxlIiwicGl4ZWxNYXJnaW5SaWdodCIsInJlbGlhYmxlTWFyZ2luTGVmdCIsImN1ckNTUyIsImNvbXB1dGVkIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImdldFByb3BlcnR5VmFsdWUiLCJhZGRHZXRIb29rSWYiLCJjb25kaXRpb25GbiIsImhvb2tGbiIsInJkaXNwbGF5c3dhcCIsInJjdXN0b21Qcm9wIiwiY3NzU2hvdyIsInBvc2l0aW9uIiwidmlzaWJpbGl0eSIsImNzc05vcm1hbFRyYW5zZm9ybSIsImxldHRlclNwYWNpbmciLCJmb250V2VpZ2h0IiwiY3NzUHJlZml4ZXMiLCJlbXB0eVN0eWxlIiwidmVuZG9yUHJvcE5hbWUiLCJjYXBOYW1lIiwiZmluYWxQcm9wTmFtZSIsImNzc1Byb3BzIiwic2V0UG9zaXRpdmVOdW1iZXIiLCJzdWJ0cmFjdCIsIm1heCIsImF1Z21lbnRXaWR0aE9ySGVpZ2h0IiwiZXh0cmEiLCJpc0JvcmRlckJveCIsInN0eWxlcyIsImdldFdpZHRoT3JIZWlnaHQiLCJ2YWx1ZUlzQm9yZGVyQm94IiwiY3NzSG9va3MiLCJvcGFjaXR5Iiwib3JpZ05hbWUiLCJpc0N1c3RvbVByb3AiLCJzZXRQcm9wZXJ0eSIsImlzRmluaXRlIiwiZ2V0Q2xpZW50UmVjdHMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJsZWZ0IiwibWFyZ2luIiwicGFkZGluZyIsImJvcmRlciIsInByZWZpeCIsInN1ZmZpeCIsImV4cGFuZCIsImV4cGFuZGVkIiwicGFydHMiLCJUd2VlbiIsImVhc2luZyIsInByb3BIb29rcyIsInJ1biIsInBlcmNlbnQiLCJlYXNlZCIsImR1cmF0aW9uIiwicG9zIiwic3RlcCIsImZ4Iiwic2Nyb2xsVG9wIiwic2Nyb2xsTGVmdCIsImxpbmVhciIsInAiLCJzd2luZyIsImNvcyIsIlBJIiwiZnhOb3ciLCJpblByb2dyZXNzIiwicmZ4dHlwZXMiLCJycnVuIiwic2NoZWR1bGUiLCJoaWRkZW4iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJpbnRlcnZhbCIsInRpY2siLCJjcmVhdGVGeE5vdyIsImdlbkZ4IiwiaW5jbHVkZVdpZHRoIiwiaGVpZ2h0IiwiY3JlYXRlVHdlZW4iLCJhbmltYXRpb24iLCJBbmltYXRpb24iLCJ0d2VlbmVycyIsImRlZmF1bHRQcmVmaWx0ZXIiLCJvcHRzIiwib2xkZmlyZSIsInByb3BUd2VlbiIsInJlc3RvcmVEaXNwbGF5IiwiaXNCb3giLCJhbmltIiwiZGF0YVNob3ciLCJ1bnF1ZXVlZCIsIm92ZXJmbG93Iiwib3ZlcmZsb3dYIiwib3ZlcmZsb3dZIiwicHJvcEZpbHRlciIsInNwZWNpYWxFYXNpbmciLCJwcm9wZXJ0aWVzIiwic3RvcHBlZCIsInByZWZpbHRlcnMiLCJjdXJyZW50VGltZSIsInN0YXJ0VGltZSIsInR3ZWVucyIsIm9yaWdpbmFsUHJvcGVydGllcyIsIm9yaWdpbmFsT3B0aW9ucyIsImdvdG9FbmQiLCJjb21wbGV0ZSIsInRpbWVyIiwidHdlZW5lciIsInByZWZpbHRlciIsInNwZWVkIiwib3B0Iiwic3BlZWRzIiwiZmFkZVRvIiwidG8iLCJhbmltYXRlIiwib3B0YWxsIiwiZG9BbmltYXRpb24iLCJmaW5pc2giLCJzdG9wUXVldWUiLCJ0aW1lcnMiLCJjc3NGbiIsInNsaWRlRG93biIsInNsaWRlVXAiLCJzbGlkZVRvZ2dsZSIsImZhZGVJbiIsImZhZGVPdXQiLCJmYWRlVG9nZ2xlIiwic2xvdyIsImZhc3QiLCJkZWxheSIsInRpbWUiLCJ0aW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiY2hlY2tPbiIsIm9wdFNlbGVjdGVkIiwicmFkaW9WYWx1ZSIsImJvb2xIb29rIiwicmVtb3ZlQXR0ciIsIm5UeXBlIiwiYXR0ckhvb2tzIiwiYm9vbCIsImF0dHJOYW1lcyIsImdldHRlciIsImxvd2VyY2FzZU5hbWUiLCJyZm9jdXNhYmxlIiwicmNsaWNrYWJsZSIsInJlbW92ZVByb3AiLCJwcm9wRml4IiwidGFiaW5kZXgiLCJwYXJzZUludCIsInN0cmlwQW5kQ29sbGFwc2UiLCJnZXRDbGFzcyIsImFkZENsYXNzIiwiY2xhc3NlcyIsImN1clZhbHVlIiwiY2xhenoiLCJmaW5hbFZhbHVlIiwicmVtb3ZlQ2xhc3MiLCJ0b2dnbGVDbGFzcyIsInN0YXRlVmFsIiwiY2xhc3NOYW1lcyIsImhhc0NsYXNzIiwicnJldHVybiIsInZhbEhvb2tzIiwib3B0aW9uU2V0IiwicmZvY3VzTW9ycGgiLCJvbmx5SGFuZGxlcnMiLCJidWJibGVUeXBlIiwib250eXBlIiwiZXZlbnRQYXRoIiwiaXNUcmlnZ2VyIiwicGFyZW50V2luZG93Iiwic2ltdWxhdGUiLCJ0cmlnZ2VySGFuZGxlciIsImhvdmVyIiwiZm5PdmVyIiwiZm5PdXQiLCJmb2N1c2luIiwiYXR0YWNoZXMiLCJub25jZSIsInJxdWVyeSIsInBhcnNlWE1MIiwiRE9NUGFyc2VyIiwicGFyc2VGcm9tU3RyaW5nIiwicmJyYWNrZXQiLCJyQ1JMRiIsInJzdWJtaXR0ZXJUeXBlcyIsInJzdWJtaXR0YWJsZSIsImJ1aWxkUGFyYW1zIiwidHJhZGl0aW9uYWwiLCJwYXJhbSIsInMiLCJ2YWx1ZU9yRnVuY3Rpb24iLCJlbmNvZGVVUklDb21wb25lbnQiLCJzZXJpYWxpemUiLCJzZXJpYWxpemVBcnJheSIsInIyMCIsInJoYXNoIiwicmFudGlDYWNoZSIsInJoZWFkZXJzIiwicmxvY2FsUHJvdG9jb2wiLCJybm9Db250ZW50IiwicnByb3RvY29sIiwidHJhbnNwb3J0cyIsImFsbFR5cGVzIiwib3JpZ2luQW5jaG9yIiwiYWRkVG9QcmVmaWx0ZXJzT3JUcmFuc3BvcnRzIiwic3RydWN0dXJlIiwiZGF0YVR5cGVFeHByZXNzaW9uIiwiZGF0YVR5cGUiLCJkYXRhVHlwZXMiLCJpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyIsImpxWEhSIiwiaW5zcGVjdGVkIiwic2Vla2luZ1RyYW5zcG9ydCIsImluc3BlY3QiLCJwcmVmaWx0ZXJPckZhY3RvcnkiLCJkYXRhVHlwZU9yVHJhbnNwb3J0IiwiYWpheEV4dGVuZCIsImZsYXRPcHRpb25zIiwiYWpheFNldHRpbmdzIiwiYWpheEhhbmRsZVJlc3BvbnNlcyIsInJlc3BvbnNlcyIsImN0IiwiZmluYWxEYXRhVHlwZSIsImZpcnN0RGF0YVR5cGUiLCJtaW1lVHlwZSIsImdldFJlc3BvbnNlSGVhZGVyIiwiY29udmVydGVycyIsImFqYXhDb252ZXJ0IiwicmVzcG9uc2UiLCJpc1N1Y2Nlc3MiLCJjb252MiIsImN1cnJlbnQiLCJjb252IiwicmVzcG9uc2VGaWVsZHMiLCJkYXRhRmlsdGVyIiwidGhyb3dzIiwiYWN0aXZlIiwibGFzdE1vZGlmaWVkIiwiZXRhZyIsInVybCIsImlzTG9jYWwiLCJwcm90b2NvbCIsInByb2Nlc3NEYXRhIiwiYXN5bmMiLCJjb250ZW50VHlwZSIsImFjY2VwdHMiLCJqc29uIiwiYWpheFNldHVwIiwic2V0dGluZ3MiLCJhamF4UHJlZmlsdGVyIiwiYWpheFRyYW5zcG9ydCIsImFqYXgiLCJ0cmFuc3BvcnQiLCJjYWNoZVVSTCIsInJlc3BvbnNlSGVhZGVyc1N0cmluZyIsInJlc3BvbnNlSGVhZGVycyIsInRpbWVvdXRUaW1lciIsInVybEFuY2hvciIsImZpcmVHbG9iYWxzIiwidW5jYWNoZWQiLCJjYWxsYmFja0NvbnRleHQiLCJnbG9iYWxFdmVudENvbnRleHQiLCJjb21wbGV0ZURlZmVycmVkIiwic3RhdHVzQ29kZSIsInJlcXVlc3RIZWFkZXJzIiwicmVxdWVzdEhlYWRlcnNOYW1lcyIsInN0ckFib3J0IiwiZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIiwic2V0UmVxdWVzdEhlYWRlciIsIm92ZXJyaWRlTWltZVR5cGUiLCJzdGF0dXMiLCJhYm9ydCIsInN0YXR1c1RleHQiLCJmaW5hbFRleHQiLCJjcm9zc0RvbWFpbiIsImhvc3QiLCJoYXNDb250ZW50IiwiaWZNb2RpZmllZCIsImhlYWRlcnMiLCJiZWZvcmVTZW5kIiwic3VjY2VzcyIsInNlbmQiLCJuYXRpdmVTdGF0dXNUZXh0IiwibW9kaWZpZWQiLCJnZXRKU09OIiwiZ2V0U2NyaXB0Iiwid3JhcEFsbCIsImZpcnN0RWxlbWVudENoaWxkIiwid3JhcElubmVyIiwidW53cmFwIiwidmlzaWJsZSIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJ4aHJTdWNjZXNzU3RhdHVzIiwieGhyU3VwcG9ydGVkIiwiY29ycyIsImVycm9yQ2FsbGJhY2siLCJvcGVuIiwidXNlcm5hbWUiLCJ4aHJGaWVsZHMiLCJvbmxvYWQiLCJvbmVycm9yIiwib25hYm9ydCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlc3BvbnNlVHlwZSIsInJlc3BvbnNlVGV4dCIsImJpbmFyeSIsImNoYXJzZXQiLCJzY3JpcHRDaGFyc2V0IiwiZXZ0Iiwib2xkQ2FsbGJhY2tzIiwicmpzb25wIiwianNvbnAiLCJqc29ucENhbGxiYWNrIiwib3JpZ2luYWxTZXR0aW5ncyIsImNhbGxiYWNrTmFtZSIsIm92ZXJ3cml0dGVuIiwicmVzcG9uc2VDb250YWluZXIiLCJqc29uUHJvcCIsImNyZWF0ZUhUTUxEb2N1bWVudCIsImltcGxlbWVudGF0aW9uIiwia2VlcFNjcmlwdHMiLCJwYXJzZWQiLCJwYXJhbXMiLCJhbmltYXRlZCIsIm9mZnNldCIsInNldE9mZnNldCIsImN1clBvc2l0aW9uIiwiY3VyTGVmdCIsImN1ckNTU1RvcCIsImN1clRvcCIsImN1ck9mZnNldCIsImN1ckNTU0xlZnQiLCJjYWxjdWxhdGVQb3NpdGlvbiIsImN1ckVsZW0iLCJ1c2luZyIsInJlY3QiLCJ3aW4iLCJwYWdlWU9mZnNldCIsImNsaWVudFRvcCIsInBhZ2VYT2Zmc2V0IiwiY2xpZW50TGVmdCIsIm9mZnNldFBhcmVudCIsInBhcmVudE9mZnNldCIsInNjcm9sbFRvIiwiSGVpZ2h0IiwiV2lkdGgiLCJkZWZhdWx0RXh0cmEiLCJmdW5jTmFtZSIsImJpbmQiLCJ1bmJpbmQiLCJkZWxlZ2F0ZSIsInVuZGVsZWdhdGUiLCJob2xkUmVhZHkiLCJob2xkIiwicGFyc2VKU09OIiwiZGVmaW5lIiwiYW1kIiwiX2pRdWVyeSIsIl8kIiwiJCIsIm5vQ29uZmxpY3QiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7Ozs7Ozs7OztBQWFBLENBQUUsVUFBVUEsTUFBVixFQUFrQkMsT0FBbEIs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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLLE9BQU9rNkIsTUFBUCxLQUFrQixVQUFsQixJQUFnQ0EsT0FBT0MsR0FBNUMsRUFBa0Q7QUFDakRELFNBQVEsUUFBUixFQUFrQixFQUFsQixFQUFzQixZQUFXO0FBQ2hDLFVBQU92bEMsTUFBUDtBQUNBLEdBRkQ7QUFHQTs7QUFLRDs7QUFFQztBQUNBeWxDLFdBQVV0bkMsT0FBTzZCLE1BSGxCOzs7QUFLQztBQUNBMGxDLE1BQUt2bkMsT0FBT3duQyxDQU5iOztBQVFBM2xDLFFBQU80bEMsVUFBUCxHQUFvQixVQUFVN2lDLElBQVYsRUFBaUI7QUFDcEMsTUFBSzVFLE9BQU93bkMsQ0FBUCxLQUFhM2xDLE1BQWxCLEVBQTJCO0FBQzFCN0IsVUFBT3duQyxDQUFQLEdBQVdELEVBQVg7QUFDQTs7QUFFRCxNQUFLM2lDLFFBQVE1RSxPQUFPNkIsTUFBUCxLQUFrQkEsTUFBL0IsRUFBd0M7QUFDdkM3QixVQUFPNkIsTUFBUCxHQUFnQnlsQyxPQUFoQjtBQUNBOztBQUVELFNBQU96bEMsTUFBUDtBQUNBLEVBVkQ7O0FBWUE7QUFDQTtBQUNBO0FBQ0EsS0FBSyxDQUFDNUIsUUFBTixFQUFpQjtBQUNoQkQsU0FBTzZCLE1BQVAsR0FBZ0I3QixPQUFPd25DLENBQVAsR0FBVzNsQyxNQUEzQjtBQUNBOztBQUtELFFBQU9BLE1BQVA7QUFDQyxDQS8vVEQiLCJmaWxlIjoianF1ZXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBqUXVlcnkgSmF2YVNjcmlwdCBMaWJyYXJ5IHYzLjIuMVxuICogaHR0cHM6Ly9qcXVlcnkuY29tL1xuICpcbiAqIEluY2x1ZGVzIFNpenpsZS5qc1xuICogaHR0cHM6Ly9zaXp6bGVqcy5jb20vXG4gKlxuICogQ29weXJpZ2h0IEpTIEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwczovL2pxdWVyeS5vcmcvbGljZW5zZVxuICpcbiAqIERhdGU6IDIwMTctMDMtMjBUMTg6NTlaXG4gKi9cbiggZnVuY3Rpb24oIGdsb2JhbCwgZmFjdG9yeSApIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRpZiAoIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiICkge1xuXG5cdFx0Ly8gRm9yIENvbW1vbkpTIGFuZCBDb21tb25KUy1saWtlIGVudmlyb25tZW50cyB3aGVyZSBhIHByb3BlciBgd2luZG93YFxuXHRcdC8vIGlzIHByZXNlbnQsIGV4ZWN1dGUgdGhlIGZhY3RvcnkgYW5kIGdldCBqUXVlcnkuXG5cdFx0Ly8gRm9yIGVudmlyb25tZW50cyB0aGF0IGRvIG5vdCBoYXZlIGEgYHdpbmRvd2Agd2l0aCBhIGBkb2N1bWVudGBcblx0XHQvLyAoc3VjaCBhcyBOb2RlLmpzKSwgZXhwb3NlIGEgZmFjdG9yeSBhcyBtb2R1bGUuZXhwb3J0cy5cblx0XHQvLyBUaGlzIGFjY2VudHVhdGVzIHRoZSBuZWVkIGZvciB0aGUgY3JlYXRpb24gb2YgYSByZWFsIGB3aW5kb3dgLlxuXHRcdC8vIGUuZy4gdmFyIGpRdWVyeSA9IHJlcXVpcmUoXCJqcXVlcnlcIikod2luZG93KTtcblx0XHQvLyBTZWUgdGlja2V0ICMxNDU0OSBmb3IgbW9yZSBpbmZvLlxuXHRcdG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsLmRvY3VtZW50ID9cblx0XHRcdGZhY3RvcnkoIGdsb2JhbCwgdHJ1ZSApIDpcblx0XHRcdGZ1bmN0aW9uKCB3ICkge1xuXHRcdFx0XHRpZiAoICF3LmRvY3VtZW50ICkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvciggXCJqUXVlcnkgcmVxdWlyZXMgYSB3aW5kb3cgd2l0aCBhIGRvY3VtZW50XCIgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFjdG9yeSggdyApO1xuXHRcdFx0fTtcblx0fSBlbHNlIHtcblx0XHRmYWN0b3J5KCBnbG9iYWwgKTtcblx0fVxuXG4vLyBQYXNzIHRoaXMgaWYgd2luZG93IGlzIG5vdCBkZWZpbmVkIHlldFxufSApKCB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdGhpcywgZnVuY3Rpb24oIHdpbmRvdywgbm9HbG9iYWwgKSB7XG5cbi8vIEVkZ2UgPD0gMTIgLSAxMyssIEZpcmVmb3ggPD0xOCAtIDQ1KywgSUUgMTAgLSAxMSwgU2FmYXJpIDUuMSAtIDkrLCBpT1MgNiAtIDkuMVxuLy8gdGhyb3cgZXhjZXB0aW9ucyB3aGVuIG5vbi1zdHJpY3QgY29kZSAoZS5nLiwgQVNQLk5FVCA0LjUpIGFjY2Vzc2VzIHN0cmljdCBtb2RlXG4vLyBhcmd1bWVudHMuY2FsbGVlLmNhbGxlciAodHJhYy0xMzMzNSkuIEJ1dCBhcyBvZiBqUXVlcnkgMy4wICgyMDE2KSwgc3RyaWN0IG1vZGUgc2hvdWxkIGJlIGNvbW1vblxuLy8gZW5vdWdoIHRoYXQgYWxsIHN1Y2ggYXR0ZW1wdHMgYXJlIGd1YXJkZWQgaW4gYSB0cnkgYmxvY2suXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGFyciA9IFtdO1xuXG52YXIgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQ7XG5cbnZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcblxudmFyIHNsaWNlID0gYXJyLnNsaWNlO1xuXG52YXIgY29uY2F0ID0gYXJyLmNvbmNhdDtcblxudmFyIHB1c2ggPSBhcnIucHVzaDtcblxudmFyIGluZGV4T2YgPSBhcnIuaW5kZXhPZjtcblxudmFyIGNsYXNzMnR5cGUgPSB7fTtcblxudmFyIHRvU3RyaW5nID0gY2xhc3MydHlwZS50b1N0cmluZztcblxudmFyIGhhc093biA9IGNsYXNzMnR5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBmblRvU3RyaW5nID0gaGFzT3duLnRvU3RyaW5nO1xuXG52YXIgT2JqZWN0RnVuY3Rpb25TdHJpbmcgPSBmblRvU3RyaW5nLmNhbGwoIE9iamVjdCApO1xuXG52YXIgc3VwcG9ydCA9IHt9O1xuXG5cblxuXHRmdW5jdGlvbiBET01FdmFsKCBjb2RlLCBkb2MgKSB7XG5cdFx0ZG9jID0gZG9jIHx8IGRvY3VtZW50O1xuXG5cdFx0dmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KCBcInNjcmlwdFwiICk7XG5cblx0XHRzY3JpcHQudGV4dCA9IGNvZGU7XG5cdFx0ZG9jLmhlYWQuYXBwZW5kQ2hpbGQoIHNjcmlwdCApLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIHNjcmlwdCApO1xuXHR9XG4vKiBnbG9iYWwgU3ltYm9sICovXG4vLyBEZWZpbmluZyB0aGlzIGdsb2JhbCBpbiAuZXNsaW50cmMuanNvbiB3b3VsZCBjcmVhdGUgYSBkYW5nZXIgb2YgdXNpbmcgdGhlIGdsb2JhbFxuLy8gdW5ndWFyZGVkIGluIGFub3RoZXIgcGxhY2UsIGl0IHNlZW1zIHNhZmVyIHRvIGRlZmluZSBnbG9iYWwgb25seSBmb3IgdGhpcyBtb2R1bGVcblxuXG5cbnZhclxuXHR2ZXJzaW9uID0gXCIzLjIuMVwiLFxuXG5cdC8vIERlZmluZSBhIGxvY2FsIGNvcHkgb2YgalF1ZXJ5XG5cdGpRdWVyeSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCApIHtcblxuXHRcdC8vIFRoZSBqUXVlcnkgb2JqZWN0IGlzIGFjdHVhbGx5IGp1c3QgdGhlIGluaXQgY29uc3RydWN0b3IgJ2VuaGFuY2VkJ1xuXHRcdC8vIE5lZWQgaW5pdCBpZiBqUXVlcnkgaXMgY2FsbGVkIChqdXN0IGFsbG93IGVycm9yIHRvIGJlIHRocm93biBpZiBub3QgaW5jbHVkZWQpXG5cdFx0cmV0dXJuIG5ldyBqUXVlcnkuZm4uaW5pdCggc2VsZWN0b3IsIGNvbnRleHQgKTtcblx0fSxcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHlcblx0Ly8gTWFrZSBzdXJlIHdlIHRyaW0gQk9NIGFuZCBOQlNQXG5cdHJ0cmltID0gL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLFxuXG5cdC8vIE1hdGNoZXMgZGFzaGVkIHN0cmluZyBmb3IgY2FtZWxpemluZ1xuXHRybXNQcmVmaXggPSAvXi1tcy0vLFxuXHRyZGFzaEFscGhhID0gLy0oW2Etel0pL2csXG5cblx0Ly8gVXNlZCBieSBqUXVlcnkuY2FtZWxDYXNlIGFzIGNhbGxiYWNrIHRvIHJlcGxhY2UoKVxuXHRmY2FtZWxDYXNlID0gZnVuY3Rpb24oIGFsbCwgbGV0dGVyICkge1xuXHRcdHJldHVybiBsZXR0ZXIudG9VcHBlckNhc2UoKTtcblx0fTtcblxualF1ZXJ5LmZuID0galF1ZXJ5LnByb3RvdHlwZSA9IHtcblxuXHQvLyBUaGUgY3VycmVudCB2ZXJzaW9uIG9mIGpRdWVyeSBiZWluZyB1c2VkXG5cdGpxdWVyeTogdmVyc2lvbixcblxuXHRjb25zdHJ1Y3RvcjogalF1ZXJ5LFxuXG5cdC8vIFRoZSBkZWZhdWx0IGxlbmd0aCBvZiBhIGpRdWVyeSBvYmplY3QgaXMgMFxuXHRsZW5ndGg6IDAsXG5cblx0dG9BcnJheTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHNsaWNlLmNhbGwoIHRoaXMgKTtcblx0fSxcblxuXHQvLyBHZXQgdGhlIE50aCBlbGVtZW50IGluIHRoZSBtYXRjaGVkIGVsZW1lbnQgc2V0IE9SXG5cdC8vIEdldCB0aGUgd2hvbGUgbWF0Y2hlZCBlbGVtZW50IHNldCBhcyBhIGNsZWFuIGFycmF5XG5cdGdldDogZnVuY3Rpb24oIG51bSApIHtcblxuXHRcdC8vIFJldHVybiBhbGwgdGhlIGVsZW1lbnRzIGluIGEgY2xlYW4gYXJyYXlcblx0XHRpZiAoIG51bSA9PSBudWxsICkge1xuXHRcdFx0cmV0dXJuIHNsaWNlLmNhbGwoIHRoaXMgKTtcblx0XHR9XG5cblx0XHQvLyBSZXR1cm4ganVzdCB0aGUgb25lIGVsZW1lbnQgZnJvbSB0aGUgc2V0XG5cdFx0cmV0dXJuIG51bSA8IDAgPyB0aGlzWyBudW0gKyB0aGlzLmxlbmd0aCBdIDogdGhpc1sgbnVtIF07XG5cdH0sXG5cblx0Ly8gVGFrZSBhbiBhcnJheSBvZiBlbGVtZW50cyBhbmQgcHVzaCBpdCBvbnRvIHRoZSBzdGFja1xuXHQvLyAocmV0dXJuaW5nIHRoZSBuZXcgbWF0Y2hlZCBlbGVtZW50IHNldClcblx0cHVzaFN0YWNrOiBmdW5jdGlvbiggZWxlbXMgKSB7XG5cblx0XHQvLyBCdWlsZCBhIG5ldyBqUXVlcnkgbWF0Y2hlZCBlbGVtZW50IHNldFxuXHRcdHZhciByZXQgPSBqUXVlcnkubWVyZ2UoIHRoaXMuY29uc3RydWN0b3IoKSwgZWxlbXMgKTtcblxuXHRcdC8vIEFkZCB0aGUgb2xkIG9iamVjdCBvbnRvIHRoZSBzdGFjayAoYXMgYSByZWZlcmVuY2UpXG5cdFx0cmV0LnByZXZPYmplY3QgPSB0aGlzO1xuXG5cdFx0Ly8gUmV0dXJuIHRoZSBuZXdseS1mb3JtZWQgZWxlbWVudCBzZXRcblx0XHRyZXR1cm4gcmV0O1xuXHR9LFxuXG5cdC8vIEV4ZWN1dGUgYSBjYWxsYmFjayBmb3IgZXZlcnkgZWxlbWVudCBpbiB0aGUgbWF0Y2hlZCBzZXQuXG5cdGVhY2g6IGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmVhY2goIHRoaXMsIGNhbGxiYWNrICk7XG5cdH0sXG5cblx0bWFwOiBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqUXVlcnkubWFwKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgaSApIHtcblx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKCBlbGVtLCBpLCBlbGVtICk7XG5cdFx0fSApICk7XG5cdH0sXG5cblx0c2xpY2U6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggc2xpY2UuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApICk7XG5cdH0sXG5cblx0Zmlyc3Q6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmVxKCAwICk7XG5cdH0sXG5cblx0bGFzdDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZXEoIC0xICk7XG5cdH0sXG5cblx0ZXE6IGZ1bmN0aW9uKCBpICkge1xuXHRcdHZhciBsZW4gPSB0aGlzLmxlbmd0aCxcblx0XHRcdGogPSAraSArICggaSA8IDAgPyBsZW4gOiAwICk7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqID49IDAgJiYgaiA8IGxlbiA/IFsgdGhpc1sgaiBdIF0gOiBbXSApO1xuXHR9LFxuXG5cdGVuZDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJldk9iamVjdCB8fCB0aGlzLmNvbnN0cnVjdG9yKCk7XG5cdH0sXG5cblx0Ly8gRm9yIGludGVybmFsIHVzZSBvbmx5LlxuXHQvLyBCZWhhdmVzIGxpa2UgYW4gQXJyYXkncyBtZXRob2QsIG5vdCBsaWtlIGEgalF1ZXJ5IG1ldGhvZC5cblx0cHVzaDogcHVzaCxcblx0c29ydDogYXJyLnNvcnQsXG5cdHNwbGljZTogYXJyLnNwbGljZVxufTtcblxualF1ZXJ5LmV4dGVuZCA9IGpRdWVyeS5mbi5leHRlbmQgPSBmdW5jdGlvbigpIHtcblx0dmFyIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY29weUlzQXJyYXksIGNsb25lLFxuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1sgMCBdIHx8IHt9LFxuXHRcdGkgPSAxLFxuXHRcdGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdFx0ZGVlcCA9IGZhbHNlO1xuXG5cdC8vIEhhbmRsZSBhIGRlZXAgY29weSBzaXR1YXRpb25cblx0aWYgKCB0eXBlb2YgdGFyZ2V0ID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRkZWVwID0gdGFyZ2V0O1xuXG5cdFx0Ly8gU2tpcCB0aGUgYm9vbGVhbiBhbmQgdGhlIHRhcmdldFxuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1sgaSBdIHx8IHt9O1xuXHRcdGkrKztcblx0fVxuXG5cdC8vIEhhbmRsZSBjYXNlIHdoZW4gdGFyZ2V0IGlzIGEgc3RyaW5nIG9yIHNvbWV0aGluZyAocG9zc2libGUgaW4gZGVlcCBjb3B5KVxuXHRpZiAoIHR5cGVvZiB0YXJnZXQgIT09IFwib2JqZWN0XCIgJiYgIWpRdWVyeS5pc0Z1bmN0aW9uKCB0YXJnZXQgKSApIHtcblx0XHR0YXJnZXQgPSB7fTtcblx0fVxuXG5cdC8vIEV4dGVuZCBqUXVlcnkgaXRzZWxmIGlmIG9ubHkgb25lIGFyZ3VtZW50IGlzIHBhc3NlZFxuXHRpZiAoIGkgPT09IGxlbmd0aCApIHtcblx0XHR0YXJnZXQgPSB0aGlzO1xuXHRcdGktLTtcblx0fVxuXG5cdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmICggKCBvcHRpb25zID0gYXJndW1lbnRzWyBpIF0gKSAhPSBudWxsICkge1xuXG5cdFx0XHQvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XG5cdFx0XHRmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG5cdFx0XHRcdHNyYyA9IHRhcmdldFsgbmFtZSBdO1xuXHRcdFx0XHRjb3B5ID0gb3B0aW9uc1sgbmFtZSBdO1xuXG5cdFx0XHRcdC8vIFByZXZlbnQgbmV2ZXItZW5kaW5nIGxvb3Bcblx0XHRcdFx0aWYgKCB0YXJnZXQgPT09IGNvcHkgKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcblx0XHRcdFx0aWYgKCBkZWVwICYmIGNvcHkgJiYgKCBqUXVlcnkuaXNQbGFpbk9iamVjdCggY29weSApIHx8XG5cdFx0XHRcdFx0KCBjb3B5SXNBcnJheSA9IEFycmF5LmlzQXJyYXkoIGNvcHkgKSApICkgKSB7XG5cblx0XHRcdFx0XHRpZiAoIGNvcHlJc0FycmF5ICkge1xuXHRcdFx0XHRcdFx0Y29weUlzQXJyYXkgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIEFycmF5LmlzQXJyYXkoIHNyYyApID8gc3JjIDogW107XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgalF1ZXJ5LmlzUGxhaW5PYmplY3QoIHNyYyApID8gc3JjIDoge307XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gTmV2ZXIgbW92ZSBvcmlnaW5hbCBvYmplY3RzLCBjbG9uZSB0aGVtXG5cdFx0XHRcdFx0dGFyZ2V0WyBuYW1lIF0gPSBqUXVlcnkuZXh0ZW5kKCBkZWVwLCBjbG9uZSwgY29weSApO1xuXG5cdFx0XHRcdC8vIERvbid0IGJyaW5nIGluIHVuZGVmaW5lZCB2YWx1ZXNcblx0XHRcdFx0fSBlbHNlIGlmICggY29weSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHRhcmdldFsgbmFtZSBdID0gY29weTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cblx0Ly8gVW5pcXVlIGZvciBlYWNoIGNvcHkgb2YgalF1ZXJ5IG9uIHRoZSBwYWdlXG5cdGV4cGFuZG86IFwialF1ZXJ5XCIgKyAoIHZlcnNpb24gKyBNYXRoLnJhbmRvbSgpICkucmVwbGFjZSggL1xcRC9nLCBcIlwiICksXG5cblx0Ly8gQXNzdW1lIGpRdWVyeSBpcyByZWFkeSB3aXRob3V0IHRoZSByZWFkeSBtb2R1bGVcblx0aXNSZWFkeTogdHJ1ZSxcblxuXHRlcnJvcjogZnVuY3Rpb24oIG1zZyApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIG1zZyApO1xuXHR9LFxuXG5cdG5vb3A6IGZ1bmN0aW9uKCkge30sXG5cblx0aXNGdW5jdGlvbjogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRyZXR1cm4galF1ZXJ5LnR5cGUoIG9iaiApID09PSBcImZ1bmN0aW9uXCI7XG5cdH0sXG5cblx0aXNXaW5kb3c6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0cmV0dXJuIG9iaiAhPSBudWxsICYmIG9iaiA9PT0gb2JqLndpbmRvdztcblx0fSxcblxuXHRpc051bWVyaWM6IGZ1bmN0aW9uKCBvYmogKSB7XG5cblx0XHQvLyBBcyBvZiBqUXVlcnkgMy4wLCBpc051bWVyaWMgaXMgbGltaXRlZCB0b1xuXHRcdC8vIHN0cmluZ3MgYW5kIG51bWJlcnMgKHByaW1pdGl2ZXMgb3Igb2JqZWN0cylcblx0XHQvLyB0aGF0IGNhbiBiZSBjb2VyY2VkIHRvIGZpbml0ZSBudW1iZXJzIChnaC0yNjYyKVxuXHRcdHZhciB0eXBlID0galF1ZXJ5LnR5cGUoIG9iaiApO1xuXHRcdHJldHVybiAoIHR5cGUgPT09IFwibnVtYmVyXCIgfHwgdHlwZSA9PT0gXCJzdHJpbmdcIiApICYmXG5cblx0XHRcdC8vIHBhcnNlRmxvYXQgTmFOcyBudW1lcmljLWNhc3QgZmFsc2UgcG9zaXRpdmVzIChcIlwiKVxuXHRcdFx0Ly8gLi4uYnV0IG1pc2ludGVycHJldHMgbGVhZGluZy1udW1iZXIgc3RyaW5ncywgcGFydGljdWxhcmx5IGhleCBsaXRlcmFscyAoXCIweC4uLlwiKVxuXHRcdFx0Ly8gc3VidHJhY3Rpb24gZm9yY2VzIGluZmluaXRpZXMgdG8gTmFOXG5cdFx0XHQhaXNOYU4oIG9iaiAtIHBhcnNlRmxvYXQoIG9iaiApICk7XG5cdH0sXG5cblx0aXNQbGFpbk9iamVjdDogZnVuY3Rpb24oIG9iaiApIHtcblx0XHR2YXIgcHJvdG8sIEN0b3I7XG5cblx0XHQvLyBEZXRlY3Qgb2J2aW91cyBuZWdhdGl2ZXNcblx0XHQvLyBVc2UgdG9TdHJpbmcgaW5zdGVhZCBvZiBqUXVlcnkudHlwZSB0byBjYXRjaCBob3N0IG9iamVjdHNcblx0XHRpZiAoICFvYmogfHwgdG9TdHJpbmcuY2FsbCggb2JqICkgIT09IFwiW29iamVjdCBPYmplY3RdXCIgKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cHJvdG8gPSBnZXRQcm90byggb2JqICk7XG5cblx0XHQvLyBPYmplY3RzIHdpdGggbm8gcHJvdG90eXBlIChlLmcuLCBgT2JqZWN0LmNyZWF0ZSggbnVsbCApYCkgYXJlIHBsYWluXG5cdFx0aWYgKCAhcHJvdG8gKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBPYmplY3RzIHdpdGggcHJvdG90eXBlIGFyZSBwbGFpbiBpZmYgdGhleSB3ZXJlIGNvbnN0cnVjdGVkIGJ5IGEgZ2xvYmFsIE9iamVjdCBmdW5jdGlvblxuXHRcdEN0b3IgPSBoYXNPd24uY2FsbCggcHJvdG8sIFwiY29uc3RydWN0b3JcIiApICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuXHRcdHJldHVybiB0eXBlb2YgQ3RvciA9PT0gXCJmdW5jdGlvblwiICYmIGZuVG9TdHJpbmcuY2FsbCggQ3RvciApID09PSBPYmplY3RGdW5jdGlvblN0cmluZztcblx0fSxcblxuXHRpc0VtcHR5T2JqZWN0OiBmdW5jdGlvbiggb2JqICkge1xuXG5cdFx0LyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cblx0XHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VzbGludC9lc2xpbnQvaXNzdWVzLzYxMjVcblx0XHR2YXIgbmFtZTtcblxuXHRcdGZvciAoIG5hbWUgaW4gb2JqICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHR0eXBlOiBmdW5jdGlvbiggb2JqICkge1xuXHRcdGlmICggb2JqID09IG51bGwgKSB7XG5cdFx0XHRyZXR1cm4gb2JqICsgXCJcIjtcblx0XHR9XG5cblx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9Mi4zIG9ubHkgKGZ1bmN0aW9uaXNoIFJlZ0V4cClcblx0XHRyZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIgP1xuXHRcdFx0Y2xhc3MydHlwZVsgdG9TdHJpbmcuY2FsbCggb2JqICkgXSB8fCBcIm9iamVjdFwiIDpcblx0XHRcdHR5cGVvZiBvYmo7XG5cdH0sXG5cblx0Ly8gRXZhbHVhdGVzIGEgc2NyaXB0IGluIGEgZ2xvYmFsIGNvbnRleHRcblx0Z2xvYmFsRXZhbDogZnVuY3Rpb24oIGNvZGUgKSB7XG5cdFx0RE9NRXZhbCggY29kZSApO1xuXHR9LFxuXG5cdC8vIENvbnZlcnQgZGFzaGVkIHRvIGNhbWVsQ2FzZTsgdXNlZCBieSB0aGUgY3NzIGFuZCBkYXRhIG1vZHVsZXNcblx0Ly8gU3VwcG9ydDogSUUgPD05IC0gMTEsIEVkZ2UgMTIgLSAxM1xuXHQvLyBNaWNyb3NvZnQgZm9yZ290IHRvIGh1bXAgdGhlaXIgdmVuZG9yIHByZWZpeCAoIzk1NzIpXG5cdGNhbWVsQ2FzZTogZnVuY3Rpb24oIHN0cmluZyApIHtcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoIHJtc1ByZWZpeCwgXCJtcy1cIiApLnJlcGxhY2UoIHJkYXNoQWxwaGEsIGZjYW1lbENhc2UgKTtcblx0fSxcblxuXHRlYWNoOiBmdW5jdGlvbiggb2JqLCBjYWxsYmFjayApIHtcblx0XHR2YXIgbGVuZ3RoLCBpID0gMDtcblxuXHRcdGlmICggaXNBcnJheUxpa2UoIG9iaiApICkge1xuXHRcdFx0bGVuZ3RoID0gb2JqLmxlbmd0aDtcblx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXHRcdFx0XHRpZiAoIGNhbGxiYWNrLmNhbGwoIG9ialsgaSBdLCBpLCBvYmpbIGkgXSApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKCBpIGluIG9iaiApIHtcblx0XHRcdFx0aWYgKCBjYWxsYmFjay5jYWxsKCBvYmpbIGkgXSwgaSwgb2JqWyBpIF0gKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gb2JqO1xuXHR9LFxuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seVxuXHR0cmltOiBmdW5jdGlvbiggdGV4dCApIHtcblx0XHRyZXR1cm4gdGV4dCA9PSBudWxsID9cblx0XHRcdFwiXCIgOlxuXHRcdFx0KCB0ZXh0ICsgXCJcIiApLnJlcGxhY2UoIHJ0cmltLCBcIlwiICk7XG5cdH0sXG5cblx0Ly8gcmVzdWx0cyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxuXHRtYWtlQXJyYXk6IGZ1bmN0aW9uKCBhcnIsIHJlc3VsdHMgKSB7XG5cdFx0dmFyIHJldCA9IHJlc3VsdHMgfHwgW107XG5cblx0XHRpZiAoIGFyciAhPSBudWxsICkge1xuXHRcdFx0aWYgKCBpc0FycmF5TGlrZSggT2JqZWN0KCBhcnIgKSApICkge1xuXHRcdFx0XHRqUXVlcnkubWVyZ2UoIHJldCxcblx0XHRcdFx0XHR0eXBlb2YgYXJyID09PSBcInN0cmluZ1wiID9cblx0XHRcdFx0XHRbIGFyciBdIDogYXJyXG5cdFx0XHRcdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwdXNoLmNhbGwoIHJldCwgYXJyICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJldDtcblx0fSxcblxuXHRpbkFycmF5OiBmdW5jdGlvbiggZWxlbSwgYXJyLCBpICkge1xuXHRcdHJldHVybiBhcnIgPT0gbnVsbCA/IC0xIDogaW5kZXhPZi5jYWxsKCBhcnIsIGVsZW0sIGkgKTtcblx0fSxcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHksIFBoYW50b21KUyAxIG9ubHlcblx0Ly8gcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRtZXJnZTogZnVuY3Rpb24oIGZpcnN0LCBzZWNvbmQgKSB7XG5cdFx0dmFyIGxlbiA9ICtzZWNvbmQubGVuZ3RoLFxuXHRcdFx0aiA9IDAsXG5cdFx0XHRpID0gZmlyc3QubGVuZ3RoO1xuXG5cdFx0Zm9yICggOyBqIDwgbGVuOyBqKysgKSB7XG5cdFx0XHRmaXJzdFsgaSsrIF0gPSBzZWNvbmRbIGogXTtcblx0XHR9XG5cblx0XHRmaXJzdC5sZW5ndGggPSBpO1xuXG5cdFx0cmV0dXJuIGZpcnN0O1xuXHR9LFxuXG5cdGdyZXA6IGZ1bmN0aW9uKCBlbGVtcywgY2FsbGJhY2ssIGludmVydCApIHtcblx0XHR2YXIgY2FsbGJhY2tJbnZlcnNlLFxuXHRcdFx0bWF0Y2hlcyA9IFtdLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRsZW5ndGggPSBlbGVtcy5sZW5ndGgsXG5cdFx0XHRjYWxsYmFja0V4cGVjdCA9ICFpbnZlcnQ7XG5cblx0XHQvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSwgb25seSBzYXZpbmcgdGhlIGl0ZW1zXG5cdFx0Ly8gdGhhdCBwYXNzIHRoZSB2YWxpZGF0b3IgZnVuY3Rpb25cblx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdGNhbGxiYWNrSW52ZXJzZSA9ICFjYWxsYmFjayggZWxlbXNbIGkgXSwgaSApO1xuXHRcdFx0aWYgKCBjYWxsYmFja0ludmVyc2UgIT09IGNhbGxiYWNrRXhwZWN0ICkge1xuXHRcdFx0XHRtYXRjaGVzLnB1c2goIGVsZW1zWyBpIF0gKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gbWF0Y2hlcztcblx0fSxcblxuXHQvLyBhcmcgaXMgZm9yIGludGVybmFsIHVzYWdlIG9ubHlcblx0bWFwOiBmdW5jdGlvbiggZWxlbXMsIGNhbGxiYWNrLCBhcmcgKSB7XG5cdFx0dmFyIGxlbmd0aCwgdmFsdWUsXG5cdFx0XHRpID0gMCxcblx0XHRcdHJldCA9IFtdO1xuXG5cdFx0Ly8gR28gdGhyb3VnaCB0aGUgYXJyYXksIHRyYW5zbGF0aW5nIGVhY2ggb2YgdGhlIGl0ZW1zIHRvIHRoZWlyIG5ldyB2YWx1ZXNcblx0XHRpZiAoIGlzQXJyYXlMaWtlKCBlbGVtcyApICkge1xuXHRcdFx0bGVuZ3RoID0gZWxlbXMubGVuZ3RoO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdHZhbHVlID0gY2FsbGJhY2soIGVsZW1zWyBpIF0sIGksIGFyZyApO1xuXG5cdFx0XHRcdGlmICggdmFsdWUgIT0gbnVsbCApIHtcblx0XHRcdFx0XHRyZXQucHVzaCggdmFsdWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0Ly8gR28gdGhyb3VnaCBldmVyeSBrZXkgb24gdGhlIG9iamVjdCxcblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9yICggaSBpbiBlbGVtcyApIHtcblx0XHRcdFx0dmFsdWUgPSBjYWxsYmFjayggZWxlbXNbIGkgXSwgaSwgYXJnICk7XG5cblx0XHRcdFx0aWYgKCB2YWx1ZSAhPSBudWxsICkge1xuXHRcdFx0XHRcdHJldC5wdXNoKCB2YWx1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRmxhdHRlbiBhbnkgbmVzdGVkIGFycmF5c1xuXHRcdHJldHVybiBjb25jYXQuYXBwbHkoIFtdLCByZXQgKTtcblx0fSxcblxuXHQvLyBBIGdsb2JhbCBHVUlEIGNvdW50ZXIgZm9yIG9iamVjdHNcblx0Z3VpZDogMSxcblxuXHQvLyBCaW5kIGEgZnVuY3Rpb24gdG8gYSBjb250ZXh0LCBvcHRpb25hbGx5IHBhcnRpYWxseSBhcHBseWluZyBhbnlcblx0Ly8gYXJndW1lbnRzLlxuXHRwcm94eTogZnVuY3Rpb24oIGZuLCBjb250ZXh0ICkge1xuXHRcdHZhciB0bXAsIGFyZ3MsIHByb3h5O1xuXG5cdFx0aWYgKCB0eXBlb2YgY29udGV4dCA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHRtcCA9IGZuWyBjb250ZXh0IF07XG5cdFx0XHRjb250ZXh0ID0gZm47XG5cdFx0XHRmbiA9IHRtcDtcblx0XHR9XG5cblx0XHQvLyBRdWljayBjaGVjayB0byBkZXRlcm1pbmUgaWYgdGFyZ2V0IGlzIGNhbGxhYmxlLCBpbiB0aGUgc3BlY1xuXHRcdC8vIHRoaXMgdGhyb3dzIGEgVHlwZUVycm9yLCBidXQgd2Ugd2lsbCBqdXN0IHJldHVybiB1bmRlZmluZWQuXG5cdFx0aWYgKCAhalF1ZXJ5LmlzRnVuY3Rpb24oIGZuICkgKSB7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdC8vIFNpbXVsYXRlZCBiaW5kXG5cdFx0YXJncyA9IHNsaWNlLmNhbGwoIGFyZ3VtZW50cywgMiApO1xuXHRcdHByb3h5ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gZm4uYXBwbHkoIGNvbnRleHQgfHwgdGhpcywgYXJncy5jb25jYXQoIHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApICkgKTtcblx0XHR9O1xuXG5cdFx0Ly8gU2V0IHRoZSBndWlkIG9mIHVuaXF1ZSBoYW5kbGVyIHRvIHRoZSBzYW1lIG9mIG9yaWdpbmFsIGhhbmRsZXIsIHNvIGl0IGNhbiBiZSByZW1vdmVkXG5cdFx0cHJveHkuZ3VpZCA9IGZuLmd1aWQgPSBmbi5ndWlkIHx8IGpRdWVyeS5ndWlkKys7XG5cblx0XHRyZXR1cm4gcHJveHk7XG5cdH0sXG5cblx0bm93OiBEYXRlLm5vdyxcblxuXHQvLyBqUXVlcnkuc3VwcG9ydCBpcyBub3QgdXNlZCBpbiBDb3JlIGJ1dCBvdGhlciBwcm9qZWN0cyBhdHRhY2ggdGhlaXJcblx0Ly8gcHJvcGVydGllcyB0byBpdCBzbyBpdCBuZWVkcyB0byBleGlzdC5cblx0c3VwcG9ydDogc3VwcG9ydFxufSApO1xuXG5pZiAoIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiApIHtcblx0alF1ZXJ5LmZuWyBTeW1ib2wuaXRlcmF0b3IgXSA9IGFyclsgU3ltYm9sLml0ZXJhdG9yIF07XG59XG5cbi8vIFBvcHVsYXRlIHRoZSBjbGFzczJ0eXBlIG1hcFxualF1ZXJ5LmVhY2goIFwiQm9vbGVhbiBOdW1iZXIgU3RyaW5nIEZ1bmN0aW9uIEFycmF5IERhdGUgUmVnRXhwIE9iamVjdCBFcnJvciBTeW1ib2xcIi5zcGxpdCggXCIgXCIgKSxcbmZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXHRjbGFzczJ0eXBlWyBcIltvYmplY3QgXCIgKyBuYW1lICsgXCJdXCIgXSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbn0gKTtcblxuZnVuY3Rpb24gaXNBcnJheUxpa2UoIG9iaiApIHtcblxuXHQvLyBTdXBwb3J0OiByZWFsIGlPUyA4LjIgb25seSAobm90IHJlcHJvZHVjaWJsZSBpbiBzaW11bGF0b3IpXG5cdC8vIGBpbmAgY2hlY2sgdXNlZCB0byBwcmV2ZW50IEpJVCBlcnJvciAoZ2gtMjE0NSlcblx0Ly8gaGFzT3duIGlzbid0IHVzZWQgaGVyZSBkdWUgdG8gZmFsc2UgbmVnYXRpdmVzXG5cdC8vIHJlZ2FyZGluZyBOb2RlbGlzdCBsZW5ndGggaW4gSUVcblx0dmFyIGxlbmd0aCA9ICEhb2JqICYmIFwibGVuZ3RoXCIgaW4gb2JqICYmIG9iai5sZW5ndGgsXG5cdFx0dHlwZSA9IGpRdWVyeS50eXBlKCBvYmogKTtcblxuXHRpZiAoIHR5cGUgPT09IFwiZnVuY3Rpb25cIiB8fCBqUXVlcnkuaXNXaW5kb3coIG9iaiApICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHJldHVybiB0eXBlID09PSBcImFycmF5XCIgfHwgbGVuZ3RoID09PSAwIHx8XG5cdFx0dHlwZW9mIGxlbmd0aCA9PT0gXCJudW1iZXJcIiAmJiBsZW5ndGggPiAwICYmICggbGVuZ3RoIC0gMSApIGluIG9iajtcbn1cbnZhciBTaXp6bGUgPVxuLyohXG4gKiBTaXp6bGUgQ1NTIFNlbGVjdG9yIEVuZ2luZSB2Mi4zLjNcbiAqIGh0dHBzOi8vc2l6emxlanMuY29tL1xuICpcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHA6Ly9qcXVlcnkub3JnL2xpY2Vuc2VcbiAqXG4gKiBEYXRlOiAyMDE2LTA4LTA4XG4gKi9cbihmdW5jdGlvbiggd2luZG93ICkge1xuXG52YXIgaSxcblx0c3VwcG9ydCxcblx0RXhwcixcblx0Z2V0VGV4dCxcblx0aXNYTUwsXG5cdHRva2VuaXplLFxuXHRjb21waWxlLFxuXHRzZWxlY3QsXG5cdG91dGVybW9zdENvbnRleHQsXG5cdHNvcnRJbnB1dCxcblx0aGFzRHVwbGljYXRlLFxuXG5cdC8vIExvY2FsIGRvY3VtZW50IHZhcnNcblx0c2V0RG9jdW1lbnQsXG5cdGRvY3VtZW50LFxuXHRkb2NFbGVtLFxuXHRkb2N1bWVudElzSFRNTCxcblx0cmJ1Z2d5UVNBLFxuXHRyYnVnZ3lNYXRjaGVzLFxuXHRtYXRjaGVzLFxuXHRjb250YWlucyxcblxuXHQvLyBJbnN0YW5jZS1zcGVjaWZpYyBkYXRhXG5cdGV4cGFuZG8gPSBcInNpenpsZVwiICsgMSAqIG5ldyBEYXRlKCksXG5cdHByZWZlcnJlZERvYyA9IHdpbmRvdy5kb2N1bWVudCxcblx0ZGlycnVucyA9IDAsXG5cdGRvbmUgPSAwLFxuXHRjbGFzc0NhY2hlID0gY3JlYXRlQ2FjaGUoKSxcblx0dG9rZW5DYWNoZSA9IGNyZWF0ZUNhY2hlKCksXG5cdGNvbXBpbGVyQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuXHRzb3J0T3JkZXIgPSBmdW5jdGlvbiggYSwgYiApIHtcblx0XHRpZiAoIGEgPT09IGIgKSB7XG5cdFx0XHRoYXNEdXBsaWNhdGUgPSB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gMDtcblx0fSxcblxuXHQvLyBJbnN0YW5jZSBtZXRob2RzXG5cdGhhc093biA9ICh7fSkuaGFzT3duUHJvcGVydHksXG5cdGFyciA9IFtdLFxuXHRwb3AgPSBhcnIucG9wLFxuXHRwdXNoX25hdGl2ZSA9IGFyci5wdXNoLFxuXHRwdXNoID0gYXJyLnB1c2gsXG5cdHNsaWNlID0gYXJyLnNsaWNlLFxuXHQvLyBVc2UgYSBzdHJpcHBlZC1kb3duIGluZGV4T2YgYXMgaXQncyBmYXN0ZXIgdGhhbiBuYXRpdmVcblx0Ly8gaHR0cHM6Ly9qc3BlcmYuY29tL3Rob3ItaW5kZXhvZi12cy1mb3IvNVxuXHRpbmRleE9mID0gZnVuY3Rpb24oIGxpc3QsIGVsZW0gKSB7XG5cdFx0dmFyIGkgPSAwLFxuXHRcdFx0bGVuID0gbGlzdC5sZW5ndGg7XG5cdFx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRpZiAoIGxpc3RbaV0gPT09IGVsZW0gKSB7XG5cdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gLTE7XG5cdH0sXG5cblx0Ym9vbGVhbnMgPSBcImNoZWNrZWR8c2VsZWN0ZWR8YXN5bmN8YXV0b2ZvY3VzfGF1dG9wbGF5fGNvbnRyb2xzfGRlZmVyfGRpc2FibGVkfGhpZGRlbnxpc21hcHxsb29wfG11bHRpcGxlfG9wZW58cmVhZG9ubHl8cmVxdWlyZWR8c2NvcGVkXCIsXG5cblx0Ly8gUmVndWxhciBleHByZXNzaW9uc1xuXG5cdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtc2VsZWN0b3JzLyN3aGl0ZXNwYWNlXG5cdHdoaXRlc3BhY2UgPSBcIltcXFxceDIwXFxcXHRcXFxcclxcXFxuXFxcXGZdXCIsXG5cblx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvQ1NTMjEvc3luZGF0YS5odG1sI3ZhbHVlLWRlZi1pZGVudGlmaWVyXG5cdGlkZW50aWZpZXIgPSBcIig/OlxcXFxcXFxcLnxbXFxcXHctXXxbXlxcMC1cXFxceGEwXSkrXCIsXG5cblx0Ly8gQXR0cmlidXRlIHNlbGVjdG9yczogaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNhdHRyaWJ1dGUtc2VsZWN0b3JzXG5cdGF0dHJpYnV0ZXMgPSBcIlxcXFxbXCIgKyB3aGl0ZXNwYWNlICsgXCIqKFwiICsgaWRlbnRpZmllciArIFwiKSg/OlwiICsgd2hpdGVzcGFjZSArXG5cdFx0Ly8gT3BlcmF0b3IgKGNhcHR1cmUgMilcblx0XHRcIiooWypeJHwhfl0/PSlcIiArIHdoaXRlc3BhY2UgK1xuXHRcdC8vIFwiQXR0cmlidXRlIHZhbHVlcyBtdXN0IGJlIENTUyBpZGVudGlmaWVycyBbY2FwdHVyZSA1XSBvciBzdHJpbmdzIFtjYXB0dXJlIDMgb3IgY2FwdHVyZSA0XVwiXG5cdFx0XCIqKD86JygoPzpcXFxcXFxcXC58W15cXFxcXFxcXCddKSopJ3xcXFwiKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcXFxcIl0pKilcXFwifChcIiArIGlkZW50aWZpZXIgKyBcIikpfClcIiArIHdoaXRlc3BhY2UgK1xuXHRcdFwiKlxcXFxdXCIsXG5cblx0cHNldWRvcyA9IFwiOihcIiArIGlkZW50aWZpZXIgKyBcIikoPzpcXFxcKChcIiArXG5cdFx0Ly8gVG8gcmVkdWNlIHRoZSBudW1iZXIgb2Ygc2VsZWN0b3JzIG5lZWRpbmcgdG9rZW5pemUgaW4gdGhlIHByZUZpbHRlciwgcHJlZmVyIGFyZ3VtZW50czpcblx0XHQvLyAxLiBxdW90ZWQgKGNhcHR1cmUgMzsgY2FwdHVyZSA0IG9yIGNhcHR1cmUgNSlcblx0XHRcIignKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcJ10pKiknfFxcXCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFxcXFwiXSkqKVxcXCIpfFwiICtcblx0XHQvLyAyLiBzaW1wbGUgKGNhcHR1cmUgNilcblx0XHRcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXCgpW1xcXFxdXXxcIiArIGF0dHJpYnV0ZXMgKyBcIikqKXxcIiArXG5cdFx0Ly8gMy4gYW55dGhpbmcgZWxzZSAoY2FwdHVyZSAyKVxuXHRcdFwiLipcIiArXG5cdFx0XCIpXFxcXCl8KVwiLFxuXG5cdC8vIExlYWRpbmcgYW5kIG5vbi1lc2NhcGVkIHRyYWlsaW5nIHdoaXRlc3BhY2UsIGNhcHR1cmluZyBzb21lIG5vbi13aGl0ZXNwYWNlIGNoYXJhY3RlcnMgcHJlY2VkaW5nIHRoZSBsYXR0ZXJcblx0cndoaXRlc3BhY2UgPSBuZXcgUmVnRXhwKCB3aGl0ZXNwYWNlICsgXCIrXCIsIFwiZ1wiICksXG5cdHJ0cmltID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIrfCgoPzpefFteXFxcXFxcXFxdKSg/OlxcXFxcXFxcLikqKVwiICsgd2hpdGVzcGFjZSArIFwiKyRcIiwgXCJnXCIgKSxcblxuXHRyY29tbWEgPSBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIiosXCIgKyB3aGl0ZXNwYWNlICsgXCIqXCIgKSxcblx0cmNvbWJpbmF0b3JzID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIqKFs+K35dfFwiICsgd2hpdGVzcGFjZSArIFwiKVwiICsgd2hpdGVzcGFjZSArIFwiKlwiICksXG5cblx0cmF0dHJpYnV0ZVF1b3RlcyA9IG5ldyBSZWdFeHAoIFwiPVwiICsgd2hpdGVzcGFjZSArIFwiKihbXlxcXFxdJ1xcXCJdKj8pXCIgKyB3aGl0ZXNwYWNlICsgXCIqXFxcXF1cIiwgXCJnXCIgKSxcblxuXHRycHNldWRvID0gbmV3IFJlZ0V4cCggcHNldWRvcyApLFxuXHRyaWRlbnRpZmllciA9IG5ldyBSZWdFeHAoIFwiXlwiICsgaWRlbnRpZmllciArIFwiJFwiICksXG5cblx0bWF0Y2hFeHByID0ge1xuXHRcdFwiSURcIjogbmV3IFJlZ0V4cCggXCJeIyhcIiArIGlkZW50aWZpZXIgKyBcIilcIiApLFxuXHRcdFwiQ0xBU1NcIjogbmV3IFJlZ0V4cCggXCJeXFxcXC4oXCIgKyBpZGVudGlmaWVyICsgXCIpXCIgKSxcblx0XHRcIlRBR1wiOiBuZXcgUmVnRXhwKCBcIl4oXCIgKyBpZGVudGlmaWVyICsgXCJ8WypdKVwiICksXG5cdFx0XCJBVFRSXCI6IG5ldyBSZWdFeHAoIFwiXlwiICsgYXR0cmlidXRlcyApLFxuXHRcdFwiUFNFVURPXCI6IG5ldyBSZWdFeHAoIFwiXlwiICsgcHNldWRvcyApLFxuXHRcdFwiQ0hJTERcIjogbmV3IFJlZ0V4cCggXCJeOihvbmx5fGZpcnN0fGxhc3R8bnRofG50aC1sYXN0KS0oY2hpbGR8b2YtdHlwZSkoPzpcXFxcKFwiICsgd2hpdGVzcGFjZSArXG5cdFx0XHRcIiooZXZlbnxvZGR8KChbKy1dfCkoXFxcXGQqKW58KVwiICsgd2hpdGVzcGFjZSArIFwiKig/OihbKy1dfClcIiArIHdoaXRlc3BhY2UgK1xuXHRcdFx0XCIqKFxcXFxkKyl8KSlcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcKXwpXCIsIFwiaVwiICksXG5cdFx0XCJib29sXCI6IG5ldyBSZWdFeHAoIFwiXig/OlwiICsgYm9vbGVhbnMgKyBcIikkXCIsIFwiaVwiICksXG5cdFx0Ly8gRm9yIHVzZSBpbiBsaWJyYXJpZXMgaW1wbGVtZW50aW5nIC5pcygpXG5cdFx0Ly8gV2UgdXNlIHRoaXMgZm9yIFBPUyBtYXRjaGluZyBpbiBgc2VsZWN0YFxuXHRcdFwibmVlZHNDb250ZXh0XCI6IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKls+K35dfDooZXZlbnxvZGR8ZXF8Z3R8bHR8bnRofGZpcnN0fGxhc3QpKD86XFxcXChcIiArXG5cdFx0XHR3aGl0ZXNwYWNlICsgXCIqKCg/Oi1cXFxcZCk/XFxcXGQqKVwiICsgd2hpdGVzcGFjZSArIFwiKlxcXFwpfCkoPz1bXi1dfCQpXCIsIFwiaVwiIClcblx0fSxcblxuXHRyaW5wdXRzID0gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8YnV0dG9uKSQvaSxcblx0cmhlYWRlciA9IC9eaFxcZCQvaSxcblxuXHRybmF0aXZlID0gL15bXntdK1xce1xccypcXFtuYXRpdmUgXFx3LyxcblxuXHQvLyBFYXNpbHktcGFyc2VhYmxlL3JldHJpZXZhYmxlIElEIG9yIFRBRyBvciBDTEFTUyBzZWxlY3RvcnNcblx0cnF1aWNrRXhwciA9IC9eKD86IyhbXFx3LV0rKXwoXFx3Kyl8XFwuKFtcXHctXSspKSQvLFxuXG5cdHJzaWJsaW5nID0gL1srfl0vLFxuXG5cdC8vIENTUyBlc2NhcGVzXG5cdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL0NTUzIxL3N5bmRhdGEuaHRtbCNlc2NhcGVkLWNoYXJhY3RlcnNcblx0cnVuZXNjYXBlID0gbmV3IFJlZ0V4cCggXCJcXFxcXFxcXChbXFxcXGRhLWZdezEsNn1cIiArIHdoaXRlc3BhY2UgKyBcIj98KFwiICsgd2hpdGVzcGFjZSArIFwiKXwuKVwiLCBcImlnXCIgKSxcblx0ZnVuZXNjYXBlID0gZnVuY3Rpb24oIF8sIGVzY2FwZWQsIGVzY2FwZWRXaGl0ZXNwYWNlICkge1xuXHRcdHZhciBoaWdoID0gXCIweFwiICsgZXNjYXBlZCAtIDB4MTAwMDA7XG5cdFx0Ly8gTmFOIG1lYW5zIG5vbi1jb2RlcG9pbnRcblx0XHQvLyBTdXBwb3J0OiBGaXJlZm94PDI0XG5cdFx0Ly8gV29ya2Fyb3VuZCBlcnJvbmVvdXMgbnVtZXJpYyBpbnRlcnByZXRhdGlvbiBvZiArXCIweFwiXG5cdFx0cmV0dXJuIGhpZ2ggIT09IGhpZ2ggfHwgZXNjYXBlZFdoaXRlc3BhY2UgP1xuXHRcdFx0ZXNjYXBlZCA6XG5cdFx0XHRoaWdoIDwgMCA/XG5cdFx0XHRcdC8vIEJNUCBjb2RlcG9pbnRcblx0XHRcdFx0U3RyaW5nLmZyb21DaGFyQ29kZSggaGlnaCArIDB4MTAwMDAgKSA6XG5cdFx0XHRcdC8vIFN1cHBsZW1lbnRhbCBQbGFuZSBjb2RlcG9pbnQgKHN1cnJvZ2F0ZSBwYWlyKVxuXHRcdFx0XHRTdHJpbmcuZnJvbUNoYXJDb2RlKCBoaWdoID4+IDEwIHwgMHhEODAwLCBoaWdoICYgMHgzRkYgfCAweERDMDAgKTtcblx0fSxcblxuXHQvLyBDU1Mgc3RyaW5nL2lkZW50aWZpZXIgc2VyaWFsaXphdGlvblxuXHQvLyBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3Nzb20vI2NvbW1vbi1zZXJpYWxpemluZy1pZGlvbXNcblx0cmNzc2VzY2FwZSA9IC8oW1xcMC1cXHgxZlxceDdmXXxeLT9cXGQpfF4tJHxbXlxcMC1cXHgxZlxceDdmLVxcdUZGRkZcXHctXS9nLFxuXHRmY3NzZXNjYXBlID0gZnVuY3Rpb24oIGNoLCBhc0NvZGVQb2ludCApIHtcblx0XHRpZiAoIGFzQ29kZVBvaW50ICkge1xuXG5cdFx0XHQvLyBVKzAwMDAgTlVMTCBiZWNvbWVzIFUrRkZGRCBSRVBMQUNFTUVOVCBDSEFSQUNURVJcblx0XHRcdGlmICggY2ggPT09IFwiXFwwXCIgKSB7XG5cdFx0XHRcdHJldHVybiBcIlxcdUZGRkRcIjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ29udHJvbCBjaGFyYWN0ZXJzIGFuZCAoZGVwZW5kZW50IHVwb24gcG9zaXRpb24pIG51bWJlcnMgZ2V0IGVzY2FwZWQgYXMgY29kZSBwb2ludHNcblx0XHRcdHJldHVybiBjaC5zbGljZSggMCwgLTEgKSArIFwiXFxcXFwiICsgY2guY2hhckNvZGVBdCggY2gubGVuZ3RoIC0gMSApLnRvU3RyaW5nKCAxNiApICsgXCIgXCI7XG5cdFx0fVxuXG5cdFx0Ly8gT3RoZXIgcG90ZW50aWFsbHktc3BlY2lhbCBBU0NJSSBjaGFyYWN0ZXJzIGdldCBiYWNrc2xhc2gtZXNjYXBlZFxuXHRcdHJldHVybiBcIlxcXFxcIiArIGNoO1xuXHR9LFxuXG5cdC8vIFVzZWQgZm9yIGlmcmFtZXNcblx0Ly8gU2VlIHNldERvY3VtZW50KClcblx0Ly8gUmVtb3ZpbmcgdGhlIGZ1bmN0aW9uIHdyYXBwZXIgY2F1c2VzIGEgXCJQZXJtaXNzaW9uIERlbmllZFwiXG5cdC8vIGVycm9yIGluIElFXG5cdHVubG9hZEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcblx0XHRzZXREb2N1bWVudCgpO1xuXHR9LFxuXG5cdGRpc2FibGVkQW5jZXN0b3IgPSBhZGRDb21iaW5hdG9yKFxuXHRcdGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IHRydWUgJiYgKFwiZm9ybVwiIGluIGVsZW0gfHwgXCJsYWJlbFwiIGluIGVsZW0pO1xuXHRcdH0sXG5cdFx0eyBkaXI6IFwicGFyZW50Tm9kZVwiLCBuZXh0OiBcImxlZ2VuZFwiIH1cblx0KTtcblxuLy8gT3B0aW1pemUgZm9yIHB1c2guYXBwbHkoIF8sIE5vZGVMaXN0IClcbnRyeSB7XG5cdHB1c2guYXBwbHkoXG5cdFx0KGFyciA9IHNsaWNlLmNhbGwoIHByZWZlcnJlZERvYy5jaGlsZE5vZGVzICkpLFxuXHRcdHByZWZlcnJlZERvYy5jaGlsZE5vZGVzXG5cdCk7XG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQ8NC4wXG5cdC8vIERldGVjdCBzaWxlbnRseSBmYWlsaW5nIHB1c2guYXBwbHlcblx0YXJyWyBwcmVmZXJyZWREb2MuY2hpbGROb2Rlcy5sZW5ndGggXS5ub2RlVHlwZTtcbn0gY2F0Y2ggKCBlICkge1xuXHRwdXNoID0geyBhcHBseTogYXJyLmxlbmd0aCA/XG5cblx0XHQvLyBMZXZlcmFnZSBzbGljZSBpZiBwb3NzaWJsZVxuXHRcdGZ1bmN0aW9uKCB0YXJnZXQsIGVscyApIHtcblx0XHRcdHB1c2hfbmF0aXZlLmFwcGx5KCB0YXJnZXQsIHNsaWNlLmNhbGwoZWxzKSApO1xuXHRcdH0gOlxuXG5cdFx0Ly8gU3VwcG9ydDogSUU8OVxuXHRcdC8vIE90aGVyd2lzZSBhcHBlbmQgZGlyZWN0bHlcblx0XHRmdW5jdGlvbiggdGFyZ2V0LCBlbHMgKSB7XG5cdFx0XHR2YXIgaiA9IHRhcmdldC5sZW5ndGgsXG5cdFx0XHRcdGkgPSAwO1xuXHRcdFx0Ly8gQ2FuJ3QgdHJ1c3QgTm9kZUxpc3QubGVuZ3RoXG5cdFx0XHR3aGlsZSAoICh0YXJnZXRbaisrXSA9IGVsc1tpKytdKSApIHt9XG5cdFx0XHR0YXJnZXQubGVuZ3RoID0gaiAtIDE7XG5cdFx0fVxuXHR9O1xufVxuXG5mdW5jdGlvbiBTaXp6bGUoIHNlbGVjdG9yLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICkge1xuXHR2YXIgbSwgaSwgZWxlbSwgbmlkLCBtYXRjaCwgZ3JvdXBzLCBuZXdTZWxlY3Rvcixcblx0XHRuZXdDb250ZXh0ID0gY29udGV4dCAmJiBjb250ZXh0Lm93bmVyRG9jdW1lbnQsXG5cblx0XHQvLyBub2RlVHlwZSBkZWZhdWx0cyB0byA5LCBzaW5jZSBjb250ZXh0IGRlZmF1bHRzIHRvIGRvY3VtZW50XG5cdFx0bm9kZVR5cGUgPSBjb250ZXh0ID8gY29udGV4dC5ub2RlVHlwZSA6IDk7XG5cblx0cmVzdWx0cyA9IHJlc3VsdHMgfHwgW107XG5cblx0Ly8gUmV0dXJuIGVhcmx5IGZyb20gY2FsbHMgd2l0aCBpbnZhbGlkIHNlbGVjdG9yIG9yIGNvbnRleHRcblx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgfHwgIXNlbGVjdG9yIHx8XG5cdFx0bm9kZVR5cGUgIT09IDEgJiYgbm9kZVR5cGUgIT09IDkgJiYgbm9kZVR5cGUgIT09IDExICkge1xuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHQvLyBUcnkgdG8gc2hvcnRjdXQgZmluZCBvcGVyYXRpb25zIChhcyBvcHBvc2VkIHRvIGZpbHRlcnMpIGluIEhUTUwgZG9jdW1lbnRzXG5cdGlmICggIXNlZWQgKSB7XG5cblx0XHRpZiAoICggY29udGV4dCA/IGNvbnRleHQub3duZXJEb2N1bWVudCB8fCBjb250ZXh0IDogcHJlZmVycmVkRG9jICkgIT09IGRvY3VtZW50ICkge1xuXHRcdFx0c2V0RG9jdW1lbnQoIGNvbnRleHQgKTtcblx0XHR9XG5cdFx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XG5cblx0XHRpZiAoIGRvY3VtZW50SXNIVE1MICkge1xuXG5cdFx0XHQvLyBJZiB0aGUgc2VsZWN0b3IgaXMgc3VmZmljaWVudGx5IHNpbXBsZSwgdHJ5IHVzaW5nIGEgXCJnZXQqQnkqXCIgRE9NIG1ldGhvZFxuXHRcdFx0Ly8gKGV4Y2VwdGluZyBEb2N1bWVudEZyYWdtZW50IGNvbnRleHQsIHdoZXJlIHRoZSBtZXRob2RzIGRvbid0IGV4aXN0KVxuXHRcdFx0aWYgKCBub2RlVHlwZSAhPT0gMTEgJiYgKG1hdGNoID0gcnF1aWNrRXhwci5leGVjKCBzZWxlY3RvciApKSApIHtcblxuXHRcdFx0XHQvLyBJRCBzZWxlY3RvclxuXHRcdFx0XHRpZiAoIChtID0gbWF0Y2hbMV0pICkge1xuXG5cdFx0XHRcdFx0Ly8gRG9jdW1lbnQgY29udGV4dFxuXHRcdFx0XHRcdGlmICggbm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIChlbGVtID0gY29udGV4dC5nZXRFbGVtZW50QnlJZCggbSApKSApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSwgT3BlcmEsIFdlYmtpdFxuXHRcdFx0XHRcdFx0XHQvLyBUT0RPOiBpZGVudGlmeSB2ZXJzaW9uc1xuXHRcdFx0XHRcdFx0XHQvLyBnZXRFbGVtZW50QnlJZCBjYW4gbWF0Y2ggZWxlbWVudHMgYnkgbmFtZSBpbnN0ZWFkIG9mIElEXG5cdFx0XHRcdFx0XHRcdGlmICggZWxlbS5pZCA9PT0gbSApIHtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBFbGVtZW50IGNvbnRleHRcblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSwgT3BlcmEsIFdlYmtpdFxuXHRcdFx0XHRcdFx0Ly8gVE9ETzogaWRlbnRpZnkgdmVyc2lvbnNcblx0XHRcdFx0XHRcdC8vIGdldEVsZW1lbnRCeUlkIGNhbiBtYXRjaCBlbGVtZW50cyBieSBuYW1lIGluc3RlYWQgb2YgSURcblx0XHRcdFx0XHRcdGlmICggbmV3Q29udGV4dCAmJiAoZWxlbSA9IG5ld0NvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIG0gKSkgJiZcblx0XHRcdFx0XHRcdFx0Y29udGFpbnMoIGNvbnRleHQsIGVsZW0gKSAmJlxuXHRcdFx0XHRcdFx0XHRlbGVtLmlkID09PSBtICkge1xuXG5cdFx0XHRcdFx0XHRcdHJlc3VsdHMucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gVHlwZSBzZWxlY3RvclxuXHRcdFx0XHR9IGVsc2UgaWYgKCBtYXRjaFsyXSApIHtcblx0XHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCBzZWxlY3RvciApICk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cblx0XHRcdFx0Ly8gQ2xhc3Mgc2VsZWN0b3Jcblx0XHRcdFx0fSBlbHNlIGlmICggKG0gPSBtYXRjaFszXSkgJiYgc3VwcG9ydC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICYmXG5cdFx0XHRcdFx0Y29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICkge1xuXG5cdFx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBtICkgKTtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBUYWtlIGFkdmFudGFnZSBvZiBxdWVyeVNlbGVjdG9yQWxsXG5cdFx0XHRpZiAoIHN1cHBvcnQucXNhICYmXG5cdFx0XHRcdCFjb21waWxlckNhY2hlWyBzZWxlY3RvciArIFwiIFwiIF0gJiZcblx0XHRcdFx0KCFyYnVnZ3lRU0EgfHwgIXJidWdneVFTQS50ZXN0KCBzZWxlY3RvciApKSApIHtcblxuXHRcdFx0XHRpZiAoIG5vZGVUeXBlICE9PSAxICkge1xuXHRcdFx0XHRcdG5ld0NvbnRleHQgPSBjb250ZXh0O1xuXHRcdFx0XHRcdG5ld1NlbGVjdG9yID0gc2VsZWN0b3I7XG5cblx0XHRcdFx0Ly8gcVNBIGxvb2tzIG91dHNpZGUgRWxlbWVudCBjb250ZXh0LCB3aGljaCBpcyBub3Qgd2hhdCB3ZSB3YW50XG5cdFx0XHRcdC8vIFRoYW5rcyB0byBBbmRyZXcgRHVwb250IGZvciB0aGlzIHdvcmthcm91bmQgdGVjaG5pcXVlXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9OFxuXHRcdFx0XHQvLyBFeGNsdWRlIG9iamVjdCBlbGVtZW50c1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBjb250ZXh0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHRcdFx0XHQvLyBDYXB0dXJlIHRoZSBjb250ZXh0IElELCBzZXR0aW5nIGl0IGZpcnN0IGlmIG5lY2Vzc2FyeVxuXHRcdFx0XHRcdGlmICggKG5pZCA9IGNvbnRleHQuZ2V0QXR0cmlidXRlKCBcImlkXCIgKSkgKSB7XG5cdFx0XHRcdFx0XHRuaWQgPSBuaWQucmVwbGFjZSggcmNzc2VzY2FwZSwgZmNzc2VzY2FwZSApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb250ZXh0LnNldEF0dHJpYnV0ZSggXCJpZFwiLCAobmlkID0gZXhwYW5kbykgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBQcmVmaXggZXZlcnkgc2VsZWN0b3IgaW4gdGhlIGxpc3Rcblx0XHRcdFx0XHRncm91cHMgPSB0b2tlbml6ZSggc2VsZWN0b3IgKTtcblx0XHRcdFx0XHRpID0gZ3JvdXBzLmxlbmd0aDtcblx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdGdyb3Vwc1tpXSA9IFwiI1wiICsgbmlkICsgXCIgXCIgKyB0b1NlbGVjdG9yKCBncm91cHNbaV0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bmV3U2VsZWN0b3IgPSBncm91cHMuam9pbiggXCIsXCIgKTtcblxuXHRcdFx0XHRcdC8vIEV4cGFuZCBjb250ZXh0IGZvciBzaWJsaW5nIHNlbGVjdG9yc1xuXHRcdFx0XHRcdG5ld0NvbnRleHQgPSByc2libGluZy50ZXN0KCBzZWxlY3RvciApICYmIHRlc3RDb250ZXh0KCBjb250ZXh0LnBhcmVudE5vZGUgKSB8fFxuXHRcdFx0XHRcdFx0Y29udGV4dDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggbmV3U2VsZWN0b3IgKSB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsXG5cdFx0XHRcdFx0XHRcdG5ld0NvbnRleHQucXVlcnlTZWxlY3RvckFsbCggbmV3U2VsZWN0b3IgKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKCBxc2FFcnJvciApIHtcblx0XHRcdFx0XHR9IGZpbmFsbHkge1xuXHRcdFx0XHRcdFx0aWYgKCBuaWQgPT09IGV4cGFuZG8gKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRleHQucmVtb3ZlQXR0cmlidXRlKCBcImlkXCIgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBBbGwgb3RoZXJzXG5cdHJldHVybiBzZWxlY3QoIHNlbGVjdG9yLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApO1xufVxuXG4vKipcbiAqIENyZWF0ZSBrZXktdmFsdWUgY2FjaGVzIG9mIGxpbWl0ZWQgc2l6ZVxuICogQHJldHVybnMge2Z1bmN0aW9uKHN0cmluZywgb2JqZWN0KX0gUmV0dXJucyB0aGUgT2JqZWN0IGRhdGEgYWZ0ZXIgc3RvcmluZyBpdCBvbiBpdHNlbGYgd2l0aFxuICpcdHByb3BlcnR5IG5hbWUgdGhlIChzcGFjZS1zdWZmaXhlZCkgc3RyaW5nIGFuZCAoaWYgdGhlIGNhY2hlIGlzIGxhcmdlciB0aGFuIEV4cHIuY2FjaGVMZW5ndGgpXG4gKlx0ZGVsZXRpbmcgdGhlIG9sZGVzdCBlbnRyeVxuICovXG5mdW5jdGlvbiBjcmVhdGVDYWNoZSgpIHtcblx0dmFyIGtleXMgPSBbXTtcblxuXHRmdW5jdGlvbiBjYWNoZSgga2V5LCB2YWx1ZSApIHtcblx0XHQvLyBVc2UgKGtleSArIFwiIFwiKSB0byBhdm9pZCBjb2xsaXNpb24gd2l0aCBuYXRpdmUgcHJvdG90eXBlIHByb3BlcnRpZXMgKHNlZSBJc3N1ZSAjMTU3KVxuXHRcdGlmICgga2V5cy5wdXNoKCBrZXkgKyBcIiBcIiApID4gRXhwci5jYWNoZUxlbmd0aCApIHtcblx0XHRcdC8vIE9ubHkga2VlcCB0aGUgbW9zdCByZWNlbnQgZW50cmllc1xuXHRcdFx0ZGVsZXRlIGNhY2hlWyBrZXlzLnNoaWZ0KCkgXTtcblx0XHR9XG5cdFx0cmV0dXJuIChjYWNoZVsga2V5ICsgXCIgXCIgXSA9IHZhbHVlKTtcblx0fVxuXHRyZXR1cm4gY2FjaGU7XG59XG5cbi8qKlxuICogTWFyayBhIGZ1bmN0aW9uIGZvciBzcGVjaWFsIHVzZSBieSBTaXp6bGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBtYXJrXG4gKi9cbmZ1bmN0aW9uIG1hcmtGdW5jdGlvbiggZm4gKSB7XG5cdGZuWyBleHBhbmRvIF0gPSB0cnVlO1xuXHRyZXR1cm4gZm47XG59XG5cbi8qKlxuICogU3VwcG9ydCB0ZXN0aW5nIHVzaW5nIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFBhc3NlZCB0aGUgY3JlYXRlZCBlbGVtZW50IGFuZCByZXR1cm5zIGEgYm9vbGVhbiByZXN1bHRcbiAqL1xuZnVuY3Rpb24gYXNzZXJ0KCBmbiApIHtcblx0dmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpO1xuXG5cdHRyeSB7XG5cdFx0cmV0dXJuICEhZm4oIGVsICk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0gZmluYWxseSB7XG5cdFx0Ly8gUmVtb3ZlIGZyb20gaXRzIHBhcmVudCBieSBkZWZhdWx0XG5cdFx0aWYgKCBlbC5wYXJlbnROb2RlICkge1xuXHRcdFx0ZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggZWwgKTtcblx0XHR9XG5cdFx0Ly8gcmVsZWFzZSBtZW1vcnkgaW4gSUVcblx0XHRlbCA9IG51bGw7XG5cdH1cbn1cblxuLyoqXG4gKiBBZGRzIHRoZSBzYW1lIGhhbmRsZXIgZm9yIGFsbCBvZiB0aGUgc3BlY2lmaWVkIGF0dHJzXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0cnMgUGlwZS1zZXBhcmF0ZWQgbGlzdCBvZiBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyIFRoZSBtZXRob2QgdGhhdCB3aWxsIGJlIGFwcGxpZWRcbiAqL1xuZnVuY3Rpb24gYWRkSGFuZGxlKCBhdHRycywgaGFuZGxlciApIHtcblx0dmFyIGFyciA9IGF0dHJzLnNwbGl0KFwifFwiKSxcblx0XHRpID0gYXJyLmxlbmd0aDtcblxuXHR3aGlsZSAoIGktLSApIHtcblx0XHRFeHByLmF0dHJIYW5kbGVbIGFycltpXSBdID0gaGFuZGxlcjtcblx0fVxufVxuXG4vKipcbiAqIENoZWNrcyBkb2N1bWVudCBvcmRlciBvZiB0d28gc2libGluZ3NcbiAqIEBwYXJhbSB7RWxlbWVudH0gYVxuICogQHBhcmFtIHtFbGVtZW50fSBiXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIGxlc3MgdGhhbiAwIGlmIGEgcHJlY2VkZXMgYiwgZ3JlYXRlciB0aGFuIDAgaWYgYSBmb2xsb3dzIGJcbiAqL1xuZnVuY3Rpb24gc2libGluZ0NoZWNrKCBhLCBiICkge1xuXHR2YXIgY3VyID0gYiAmJiBhLFxuXHRcdGRpZmYgPSBjdXIgJiYgYS5ub2RlVHlwZSA9PT0gMSAmJiBiLm5vZGVUeXBlID09PSAxICYmXG5cdFx0XHRhLnNvdXJjZUluZGV4IC0gYi5zb3VyY2VJbmRleDtcblxuXHQvLyBVc2UgSUUgc291cmNlSW5kZXggaWYgYXZhaWxhYmxlIG9uIGJvdGggbm9kZXNcblx0aWYgKCBkaWZmICkge1xuXHRcdHJldHVybiBkaWZmO1xuXHR9XG5cblx0Ly8gQ2hlY2sgaWYgYiBmb2xsb3dzIGFcblx0aWYgKCBjdXIgKSB7XG5cdFx0d2hpbGUgKCAoY3VyID0gY3VyLm5leHRTaWJsaW5nKSApIHtcblx0XHRcdGlmICggY3VyID09PSBiICkge1xuXHRcdFx0XHRyZXR1cm4gLTE7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGEgPyAxIDogLTE7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIHVzZSBpbiBwc2V1ZG9zIGZvciBpbnB1dCB0eXBlc1xuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5wdXRQc2V1ZG8oIHR5cGUgKSB7XG5cdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHR2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRyZXR1cm4gbmFtZSA9PT0gXCJpbnB1dFwiICYmIGVsZW0udHlwZSA9PT0gdHlwZTtcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIGJ1dHRvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJ1dHRvblBzZXVkbyggdHlwZSApIHtcblx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdHJldHVybiAobmFtZSA9PT0gXCJpbnB1dFwiIHx8IG5hbWUgPT09IFwiYnV0dG9uXCIpICYmIGVsZW0udHlwZSA9PT0gdHlwZTtcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIDplbmFibGVkLzpkaXNhYmxlZFxuICogQHBhcmFtIHtCb29sZWFufSBkaXNhYmxlZCB0cnVlIGZvciA6ZGlzYWJsZWQ7IGZhbHNlIGZvciA6ZW5hYmxlZFxuICovXG5mdW5jdGlvbiBjcmVhdGVEaXNhYmxlZFBzZXVkbyggZGlzYWJsZWQgKSB7XG5cblx0Ly8gS25vd24gOmRpc2FibGVkIGZhbHNlIHBvc2l0aXZlczogZmllbGRzZXRbZGlzYWJsZWRdID4gbGVnZW5kOm50aC1vZi10eXBlKG4rMikgOmNhbi1kaXNhYmxlXG5cdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdC8vIE9ubHkgY2VydGFpbiBlbGVtZW50cyBjYW4gbWF0Y2ggOmVuYWJsZWQgb3IgOmRpc2FibGVkXG5cdFx0Ly8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc2NyaXB0aW5nLmh0bWwjc2VsZWN0b3ItZW5hYmxlZFxuXHRcdC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3NjcmlwdGluZy5odG1sI3NlbGVjdG9yLWRpc2FibGVkXG5cdFx0aWYgKCBcImZvcm1cIiBpbiBlbGVtICkge1xuXG5cdFx0XHQvLyBDaGVjayBmb3IgaW5oZXJpdGVkIGRpc2FibGVkbmVzcyBvbiByZWxldmFudCBub24tZGlzYWJsZWQgZWxlbWVudHM6XG5cdFx0XHQvLyAqIGxpc3RlZCBmb3JtLWFzc29jaWF0ZWQgZWxlbWVudHMgaW4gYSBkaXNhYmxlZCBmaWVsZHNldFxuXHRcdFx0Ly8gICBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9mb3Jtcy5odG1sI2NhdGVnb3J5LWxpc3RlZFxuXHRcdFx0Ly8gICBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9mb3Jtcy5odG1sI2NvbmNlcHQtZmUtZGlzYWJsZWRcblx0XHRcdC8vICogb3B0aW9uIGVsZW1lbnRzIGluIGEgZGlzYWJsZWQgb3B0Z3JvdXBcblx0XHRcdC8vICAgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZm9ybXMuaHRtbCNjb25jZXB0LW9wdGlvbi1kaXNhYmxlZFxuXHRcdFx0Ly8gQWxsIHN1Y2ggZWxlbWVudHMgaGF2ZSBhIFwiZm9ybVwiIHByb3BlcnR5LlxuXHRcdFx0aWYgKCBlbGVtLnBhcmVudE5vZGUgJiYgZWxlbS5kaXNhYmxlZCA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdFx0Ly8gT3B0aW9uIGVsZW1lbnRzIGRlZmVyIHRvIGEgcGFyZW50IG9wdGdyb3VwIGlmIHByZXNlbnRcblx0XHRcdFx0aWYgKCBcImxhYmVsXCIgaW4gZWxlbSApIHtcblx0XHRcdFx0XHRpZiAoIFwibGFiZWxcIiBpbiBlbGVtLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbS5wYXJlbnROb2RlLmRpc2FibGVkID09PSBkaXNhYmxlZDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IGRpc2FibGVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDYgLSAxMVxuXHRcdFx0XHQvLyBVc2UgdGhlIGlzRGlzYWJsZWQgc2hvcnRjdXQgcHJvcGVydHkgdG8gY2hlY2sgZm9yIGRpc2FibGVkIGZpZWxkc2V0IGFuY2VzdG9yc1xuXHRcdFx0XHRyZXR1cm4gZWxlbS5pc0Rpc2FibGVkID09PSBkaXNhYmxlZCB8fFxuXG5cdFx0XHRcdFx0Ly8gV2hlcmUgdGhlcmUgaXMgbm8gaXNEaXNhYmxlZCwgY2hlY2sgbWFudWFsbHlcblx0XHRcdFx0XHQvKiBqc2hpbnQgLVcwMTggKi9cblx0XHRcdFx0XHRlbGVtLmlzRGlzYWJsZWQgIT09ICFkaXNhYmxlZCAmJlxuXHRcdFx0XHRcdFx0ZGlzYWJsZWRBbmNlc3RvciggZWxlbSApID09PSBkaXNhYmxlZDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IGRpc2FibGVkO1xuXG5cdFx0Ly8gVHJ5IHRvIHdpbm5vdyBvdXQgZWxlbWVudHMgdGhhdCBjYW4ndCBiZSBkaXNhYmxlZCBiZWZvcmUgdHJ1c3RpbmcgdGhlIGRpc2FibGVkIHByb3BlcnR5LlxuXHRcdC8vIFNvbWUgdmljdGltcyBnZXQgY2F1Z2h0IGluIG91ciBuZXQgKGxhYmVsLCBsZWdlbmQsIG1lbnUsIHRyYWNrKSwgYnV0IGl0IHNob3VsZG4ndFxuXHRcdC8vIGV2ZW4gZXhpc3Qgb24gdGhlbSwgbGV0IGFsb25lIGhhdmUgYSBib29sZWFuIHZhbHVlLlxuXHRcdH0gZWxzZSBpZiAoIFwibGFiZWxcIiBpbiBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IGRpc2FibGVkO1xuXHRcdH1cblxuXHRcdC8vIFJlbWFpbmluZyBlbGVtZW50cyBhcmUgbmVpdGhlciA6ZW5hYmxlZCBub3IgOmRpc2FibGVkXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgcG9zaXRpb25hbHNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oIGZuICkge1xuXHRyZXR1cm4gbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBhcmd1bWVudCApIHtcblx0XHRhcmd1bWVudCA9ICthcmd1bWVudDtcblx0XHRyZXR1cm4gbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCBtYXRjaGVzICkge1xuXHRcdFx0dmFyIGosXG5cdFx0XHRcdG1hdGNoSW5kZXhlcyA9IGZuKCBbXSwgc2VlZC5sZW5ndGgsIGFyZ3VtZW50ICksXG5cdFx0XHRcdGkgPSBtYXRjaEluZGV4ZXMubGVuZ3RoO1xuXG5cdFx0XHQvLyBNYXRjaCBlbGVtZW50cyBmb3VuZCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4ZXNcblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRpZiAoIHNlZWRbIChqID0gbWF0Y2hJbmRleGVzW2ldKSBdICkge1xuXHRcdFx0XHRcdHNlZWRbal0gPSAhKG1hdGNoZXNbal0gPSBzZWVkW2pdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgYSBub2RlIGZvciB2YWxpZGl0eSBhcyBhIFNpenpsZSBjb250ZXh0XG4gKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0PX0gY29udGV4dFxuICogQHJldHVybnMge0VsZW1lbnR8T2JqZWN0fEJvb2xlYW59IFRoZSBpbnB1dCBub2RlIGlmIGFjY2VwdGFibGUsIG90aGVyd2lzZSBhIGZhbHN5IHZhbHVlXG4gKi9cbmZ1bmN0aW9uIHRlc3RDb250ZXh0KCBjb250ZXh0ICkge1xuXHRyZXR1cm4gY29udGV4dCAmJiB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb250ZXh0O1xufVxuXG4vLyBFeHBvc2Ugc3VwcG9ydCB2YXJzIGZvciBjb252ZW5pZW5jZVxuc3VwcG9ydCA9IFNpenpsZS5zdXBwb3J0ID0ge307XG5cbi8qKlxuICogRGV0ZWN0cyBYTUwgbm9kZXNcbiAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3R9IGVsZW0gQW4gZWxlbWVudCBvciBhIGRvY3VtZW50XG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZmYgZWxlbSBpcyBhIG5vbi1IVE1MIFhNTCBub2RlXG4gKi9cbmlzWE1MID0gU2l6emxlLmlzWE1MID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdC8vIGRvY3VtZW50RWxlbWVudCBpcyB2ZXJpZmllZCBmb3IgY2FzZXMgd2hlcmUgaXQgZG9lc24ndCB5ZXQgZXhpc3Rcblx0Ly8gKHN1Y2ggYXMgbG9hZGluZyBpZnJhbWVzIGluIElFIC0gIzQ4MzMpXG5cdHZhciBkb2N1bWVudEVsZW1lbnQgPSBlbGVtICYmIChlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSkuZG9jdW1lbnRFbGVtZW50O1xuXHRyZXR1cm4gZG9jdW1lbnRFbGVtZW50ID8gZG9jdW1lbnRFbGVtZW50Lm5vZGVOYW1lICE9PSBcIkhUTUxcIiA6IGZhbHNlO1xufTtcblxuLyoqXG4gKiBTZXRzIGRvY3VtZW50LXJlbGF0ZWQgdmFyaWFibGVzIG9uY2UgYmFzZWQgb24gdGhlIGN1cnJlbnQgZG9jdW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3R9IFtkb2NdIEFuIGVsZW1lbnQgb3IgZG9jdW1lbnQgb2JqZWN0IHRvIHVzZSB0byBzZXQgdGhlIGRvY3VtZW50XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjdXJyZW50IGRvY3VtZW50XG4gKi9cbnNldERvY3VtZW50ID0gU2l6emxlLnNldERvY3VtZW50ID0gZnVuY3Rpb24oIG5vZGUgKSB7XG5cdHZhciBoYXNDb21wYXJlLCBzdWJXaW5kb3csXG5cdFx0ZG9jID0gbm9kZSA/IG5vZGUub3duZXJEb2N1bWVudCB8fCBub2RlIDogcHJlZmVycmVkRG9jO1xuXG5cdC8vIFJldHVybiBlYXJseSBpZiBkb2MgaXMgaW52YWxpZCBvciBhbHJlYWR5IHNlbGVjdGVkXG5cdGlmICggZG9jID09PSBkb2N1bWVudCB8fCBkb2Mubm9kZVR5cGUgIT09IDkgfHwgIWRvYy5kb2N1bWVudEVsZW1lbnQgKSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50O1xuXHR9XG5cblx0Ly8gVXBkYXRlIGdsb2JhbCB2YXJpYWJsZXNcblx0ZG9jdW1lbnQgPSBkb2M7XG5cdGRvY0VsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cdGRvY3VtZW50SXNIVE1MID0gIWlzWE1MKCBkb2N1bWVudCApO1xuXG5cdC8vIFN1cHBvcnQ6IElFIDktMTEsIEVkZ2Vcblx0Ly8gQWNjZXNzaW5nIGlmcmFtZSBkb2N1bWVudHMgYWZ0ZXIgdW5sb2FkIHRocm93cyBcInBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3JzIChqUXVlcnkgIzEzOTM2KVxuXHRpZiAoIHByZWZlcnJlZERvYyAhPT0gZG9jdW1lbnQgJiZcblx0XHQoc3ViV2luZG93ID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcpICYmIHN1YldpbmRvdy50b3AgIT09IHN1YldpbmRvdyApIHtcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDExLCBFZGdlXG5cdFx0aWYgKCBzdWJXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lciApIHtcblx0XHRcdHN1YldpbmRvdy5hZGRFdmVudExpc3RlbmVyKCBcInVubG9hZFwiLCB1bmxvYWRIYW5kbGVyLCBmYWxzZSApO1xuXG5cdFx0Ly8gU3VwcG9ydDogSUUgOSAtIDEwIG9ubHlcblx0XHR9IGVsc2UgaWYgKCBzdWJXaW5kb3cuYXR0YWNoRXZlbnQgKSB7XG5cdFx0XHRzdWJXaW5kb3cuYXR0YWNoRXZlbnQoIFwib251bmxvYWRcIiwgdW5sb2FkSGFuZGxlciApO1xuXHRcdH1cblx0fVxuXG5cdC8qIEF0dHJpYnV0ZXNcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8vIFN1cHBvcnQ6IElFPDhcblx0Ly8gVmVyaWZ5IHRoYXQgZ2V0QXR0cmlidXRlIHJlYWxseSByZXR1cm5zIGF0dHJpYnV0ZXMgYW5kIG5vdCBwcm9wZXJ0aWVzXG5cdC8vIChleGNlcHRpbmcgSUU4IGJvb2xlYW5zKVxuXHRzdXBwb3J0LmF0dHJpYnV0ZXMgPSBhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHRcdGVsLmNsYXNzTmFtZSA9IFwiaVwiO1xuXHRcdHJldHVybiAhZWwuZ2V0QXR0cmlidXRlKFwiY2xhc3NOYW1lXCIpO1xuXHR9KTtcblxuXHQvKiBnZXRFbGVtZW50KHMpQnkqXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXHQvLyBDaGVjayBpZiBnZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIikgcmV0dXJucyBvbmx5IGVsZW1lbnRzXG5cdHN1cHBvcnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgPSBhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHRcdGVsLmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVDb21tZW50KFwiXCIpICk7XG5cdFx0cmV0dXJuICFlbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIikubGVuZ3RoO1xuXHR9KTtcblxuXHQvLyBTdXBwb3J0OiBJRTw5XG5cdHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSA9IHJuYXRpdmUudGVzdCggZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSApO1xuXG5cdC8vIFN1cHBvcnQ6IElFPDEwXG5cdC8vIENoZWNrIGlmIGdldEVsZW1lbnRCeUlkIHJldHVybnMgZWxlbWVudHMgYnkgbmFtZVxuXHQvLyBUaGUgYnJva2VuIGdldEVsZW1lbnRCeUlkIG1ldGhvZHMgZG9uJ3QgcGljayB1cCBwcm9ncmFtbWF0aWNhbGx5LXNldCBuYW1lcyxcblx0Ly8gc28gdXNlIGEgcm91bmRhYm91dCBnZXRFbGVtZW50c0J5TmFtZSB0ZXN0XG5cdHN1cHBvcnQuZ2V0QnlJZCA9IGFzc2VydChmdW5jdGlvbiggZWwgKSB7XG5cdFx0ZG9jRWxlbS5hcHBlbmRDaGlsZCggZWwgKS5pZCA9IGV4cGFuZG87XG5cdFx0cmV0dXJuICFkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSB8fCAhZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoIGV4cGFuZG8gKS5sZW5ndGg7XG5cdH0pO1xuXG5cdC8vIElEIGZpbHRlciBhbmQgZmluZFxuXHRpZiAoIHN1cHBvcnQuZ2V0QnlJZCApIHtcblx0XHRFeHByLmZpbHRlcltcIklEXCJdID0gZnVuY3Rpb24oIGlkICkge1xuXHRcdFx0dmFyIGF0dHJJZCA9IGlkLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZShcImlkXCIpID09PSBhdHRySWQ7XG5cdFx0XHR9O1xuXHRcdH07XG5cdFx0RXhwci5maW5kW1wiSURcIl0gPSBmdW5jdGlvbiggaWQsIGNvbnRleHQgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRCeUlkICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50SXNIVE1MICkge1xuXHRcdFx0XHR2YXIgZWxlbSA9IGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIGlkICk7XG5cdFx0XHRcdHJldHVybiBlbGVtID8gWyBlbGVtIF0gOiBbXTtcblx0XHRcdH1cblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdEV4cHIuZmlsdGVyW1wiSURcIl0gPSAgZnVuY3Rpb24oIGlkICkge1xuXHRcdFx0dmFyIGF0dHJJZCA9IGlkLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciBub2RlID0gdHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlTm9kZSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuXHRcdFx0XHRcdGVsZW0uZ2V0QXR0cmlidXRlTm9kZShcImlkXCIpO1xuXHRcdFx0XHRyZXR1cm4gbm9kZSAmJiBub2RlLnZhbHVlID09PSBhdHRySWQ7XG5cdFx0XHR9O1xuXHRcdH07XG5cblx0XHQvLyBTdXBwb3J0OiBJRSA2IC0gNyBvbmx5XG5cdFx0Ly8gZ2V0RWxlbWVudEJ5SWQgaXMgbm90IHJlbGlhYmxlIGFzIGEgZmluZCBzaG9ydGN1dFxuXHRcdEV4cHIuZmluZFtcIklEXCJdID0gZnVuY3Rpb24oIGlkLCBjb250ZXh0ICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50QnlJZCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudElzSFRNTCApIHtcblx0XHRcdFx0dmFyIG5vZGUsIGksIGVsZW1zLFxuXHRcdFx0XHRcdGVsZW0gPSBjb250ZXh0LmdldEVsZW1lbnRCeUlkKCBpZCApO1xuXG5cdFx0XHRcdGlmICggZWxlbSApIHtcblxuXHRcdFx0XHRcdC8vIFZlcmlmeSB0aGUgaWQgYXR0cmlidXRlXG5cdFx0XHRcdFx0bm9kZSA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZShcImlkXCIpO1xuXHRcdFx0XHRcdGlmICggbm9kZSAmJiBub2RlLnZhbHVlID09PSBpZCApIHtcblx0XHRcdFx0XHRcdHJldHVybiBbIGVsZW0gXTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBGYWxsIGJhY2sgb24gZ2V0RWxlbWVudHNCeU5hbWVcblx0XHRcdFx0XHRlbGVtcyA9IGNvbnRleHQuZ2V0RWxlbWVudHNCeU5hbWUoIGlkICk7XG5cdFx0XHRcdFx0aSA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKCAoZWxlbSA9IGVsZW1zW2krK10pICkge1xuXHRcdFx0XHRcdFx0bm9kZSA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZShcImlkXCIpO1xuXHRcdFx0XHRcdFx0aWYgKCBub2RlICYmIG5vZGUudmFsdWUgPT09IGlkICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gWyBlbGVtIF07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cblxuXHQvLyBUYWdcblx0RXhwci5maW5kW1wiVEFHXCJdID0gc3VwcG9ydC5nZXRFbGVtZW50c0J5VGFnTmFtZSA/XG5cdFx0ZnVuY3Rpb24oIHRhZywgY29udGV4dCApIHtcblx0XHRcdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IFwidW5kZWZpbmVkXCIgKSB7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgKTtcblxuXHRcdFx0Ly8gRG9jdW1lbnRGcmFnbWVudCBub2RlcyBkb24ndCBoYXZlIGdFQlROXG5cdFx0XHR9IGVsc2UgaWYgKCBzdXBwb3J0LnFzYSApIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQucXVlcnlTZWxlY3RvckFsbCggdGFnICk7XG5cdFx0XHR9XG5cdFx0fSA6XG5cblx0XHRmdW5jdGlvbiggdGFnLCBjb250ZXh0ICkge1xuXHRcdFx0dmFyIGVsZW0sXG5cdFx0XHRcdHRtcCA9IFtdLFxuXHRcdFx0XHRpID0gMCxcblx0XHRcdFx0Ly8gQnkgaGFwcHkgY29pbmNpZGVuY2UsIGEgKGJyb2tlbikgZ0VCVE4gYXBwZWFycyBvbiBEb2N1bWVudEZyYWdtZW50IG5vZGVzIHRvb1xuXHRcdFx0XHRyZXN1bHRzID0gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggdGFnICk7XG5cblx0XHRcdC8vIEZpbHRlciBvdXQgcG9zc2libGUgY29tbWVudHNcblx0XHRcdGlmICggdGFnID09PSBcIipcIiApIHtcblx0XHRcdFx0d2hpbGUgKCAoZWxlbSA9IHJlc3VsdHNbaSsrXSkgKSB7XG5cdFx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRcdFx0dG1wLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdG1wO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0fTtcblxuXHQvLyBDbGFzc1xuXHRFeHByLmZpbmRbXCJDTEFTU1wiXSA9IHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSAmJiBmdW5jdGlvbiggY2xhc3NOYW1lLCBjb250ZXh0ICkge1xuXHRcdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudElzSFRNTCApIHtcblx0XHRcdHJldHVybiBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoIGNsYXNzTmFtZSApO1xuXHRcdH1cblx0fTtcblxuXHQvKiBRU0EvbWF0Y2hlc1NlbGVjdG9yXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXHQvLyBRU0EgYW5kIG1hdGNoZXNTZWxlY3RvciBzdXBwb3J0XG5cblx0Ly8gbWF0Y2hlc1NlbGVjdG9yKDphY3RpdmUpIHJlcG9ydHMgZmFsc2Ugd2hlbiB0cnVlIChJRTkvT3BlcmEgMTEuNSlcblx0cmJ1Z2d5TWF0Y2hlcyA9IFtdO1xuXG5cdC8vIHFTYSg6Zm9jdXMpIHJlcG9ydHMgZmFsc2Ugd2hlbiB0cnVlIChDaHJvbWUgMjEpXG5cdC8vIFdlIGFsbG93IHRoaXMgYmVjYXVzZSBvZiBhIGJ1ZyBpbiBJRTgvOSB0aGF0IHRocm93cyBhbiBlcnJvclxuXHQvLyB3aGVuZXZlciBgZG9jdW1lbnQuYWN0aXZlRWxlbWVudGAgaXMgYWNjZXNzZWQgb24gYW4gaWZyYW1lXG5cdC8vIFNvLCB3ZSBhbGxvdyA6Zm9jdXMgdG8gcGFzcyB0aHJvdWdoIFFTQSBhbGwgdGhlIHRpbWUgdG8gYXZvaWQgdGhlIElFIGVycm9yXG5cdC8vIFNlZSBodHRwczovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTMzNzhcblx0cmJ1Z2d5UVNBID0gW107XG5cblx0aWYgKCAoc3VwcG9ydC5xc2EgPSBybmF0aXZlLnRlc3QoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwgKSkgKSB7XG5cdFx0Ly8gQnVpbGQgUVNBIHJlZ2V4XG5cdFx0Ly8gUmVnZXggc3RyYXRlZ3kgYWRvcHRlZCBmcm9tIERpZWdvIFBlcmluaVxuXHRcdGFzc2VydChmdW5jdGlvbiggZWwgKSB7XG5cdFx0XHQvLyBTZWxlY3QgaXMgc2V0IHRvIGVtcHR5IHN0cmluZyBvbiBwdXJwb3NlXG5cdFx0XHQvLyBUaGlzIGlzIHRvIHRlc3QgSUUncyB0cmVhdG1lbnQgb2Ygbm90IGV4cGxpY2l0bHlcblx0XHRcdC8vIHNldHRpbmcgYSBib29sZWFuIGNvbnRlbnQgYXR0cmlidXRlLFxuXHRcdFx0Ly8gc2luY2UgaXRzIHByZXNlbmNlIHNob3VsZCBiZSBlbm91Z2hcblx0XHRcdC8vIGh0dHBzOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMjM1OVxuXHRcdFx0ZG9jRWxlbS5hcHBlbmRDaGlsZCggZWwgKS5pbm5lckhUTUwgPSBcIjxhIGlkPSdcIiArIGV4cGFuZG8gKyBcIic+PC9hPlwiICtcblx0XHRcdFx0XCI8c2VsZWN0IGlkPSdcIiArIGV4cGFuZG8gKyBcIi1cXHJcXFxcJyBtc2FsbG93Y2FwdHVyZT0nJz5cIiArXG5cdFx0XHRcdFwiPG9wdGlvbiBzZWxlY3RlZD0nJz48L29wdGlvbj48L3NlbGVjdD5cIjtcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU4LCBPcGVyYSAxMS0xMi4xNlxuXHRcdFx0Ly8gTm90aGluZyBzaG91bGQgYmUgc2VsZWN0ZWQgd2hlbiBlbXB0eSBzdHJpbmdzIGZvbGxvdyBePSBvciAkPSBvciAqPVxuXHRcdFx0Ly8gVGhlIHRlc3QgYXR0cmlidXRlIG11c3QgYmUgdW5rbm93biBpbiBPcGVyYSBidXQgXCJzYWZlXCIgZm9yIFdpblJUXG5cdFx0XHQvLyBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL2hoNDY1Mzg4LmFzcHgjYXR0cmlidXRlX3NlY3Rpb25cblx0XHRcdGlmICggZWwucXVlcnlTZWxlY3RvckFsbChcIlttc2FsbG93Y2FwdHVyZV49JyddXCIpLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiWypeJF09XCIgKyB3aGl0ZXNwYWNlICsgXCIqKD86Jyd8XFxcIlxcXCIpXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU4XG5cdFx0XHQvLyBCb29sZWFuIGF0dHJpYnV0ZXMgYW5kIFwidmFsdWVcIiBhcmUgbm90IHRyZWF0ZWQgY29ycmVjdGx5XG5cdFx0XHRpZiAoICFlbC5xdWVyeVNlbGVjdG9yQWxsKFwiW3NlbGVjdGVkXVwiKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIlxcXFxbXCIgKyB3aGl0ZXNwYWNlICsgXCIqKD86dmFsdWV8XCIgKyBib29sZWFucyArIFwiKVwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IENocm9tZTwyOSwgQW5kcm9pZDw0LjQsIFNhZmFyaTw3LjArLCBpT1M8Ny4wKywgUGhhbnRvbUpTPDEuOS44K1xuXHRcdFx0aWYgKCAhZWwucXVlcnlTZWxlY3RvckFsbCggXCJbaWR+PVwiICsgZXhwYW5kbyArIFwiLV1cIiApLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goXCJ+PVwiKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gV2Via2l0L09wZXJhIC0gOmNoZWNrZWQgc2hvdWxkIHJldHVybiBzZWxlY3RlZCBvcHRpb24gZWxlbWVudHNcblx0XHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTEvUkVDLWNzczMtc2VsZWN0b3JzLTIwMTEwOTI5LyNjaGVja2VkXG5cdFx0XHQvLyBJRTggdGhyb3dzIGVycm9yIGhlcmUgYW5kIHdpbGwgbm90IHNlZSBsYXRlciB0ZXN0c1xuXHRcdFx0aWYgKCAhZWwucXVlcnlTZWxlY3RvckFsbChcIjpjaGVja2VkXCIpLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goXCI6Y2hlY2tlZFwiKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogU2FmYXJpIDgrLCBpT1MgOCtcblx0XHRcdC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzY4NTFcblx0XHRcdC8vIEluLXBhZ2UgYHNlbGVjdG9yI2lkIHNpYmxpbmctY29tYmluYXRvciBzZWxlY3RvcmAgZmFpbHNcblx0XHRcdGlmICggIWVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiYSNcIiArIGV4cGFuZG8gKyBcIisqXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKFwiLiMuK1srfl1cIik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHRcdFx0ZWwuaW5uZXJIVE1MID0gXCI8YSBocmVmPScnIGRpc2FibGVkPSdkaXNhYmxlZCc+PC9hPlwiICtcblx0XHRcdFx0XCI8c2VsZWN0IGRpc2FibGVkPSdkaXNhYmxlZCc+PG9wdGlvbi8+PC9zZWxlY3Q+XCI7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IFdpbmRvd3MgOCBOYXRpdmUgQXBwc1xuXHRcdFx0Ly8gVGhlIHR5cGUgYW5kIG5hbWUgYXR0cmlidXRlcyBhcmUgcmVzdHJpY3RlZCBkdXJpbmcgLmlubmVySFRNTCBhc3NpZ25tZW50XG5cdFx0XHR2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdFx0XHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCBcImhpZGRlblwiICk7XG5cdFx0XHRlbC5hcHBlbmRDaGlsZCggaW5wdXQgKS5zZXRBdHRyaWJ1dGUoIFwibmFtZVwiLCBcIkRcIiApO1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRThcblx0XHRcdC8vIEVuZm9yY2UgY2FzZS1zZW5zaXRpdml0eSBvZiBuYW1lIGF0dHJpYnV0ZVxuXHRcdFx0aWYgKCBlbC5xdWVyeVNlbGVjdG9yQWxsKFwiW25hbWU9ZF1cIikubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCJuYW1lXCIgKyB3aGl0ZXNwYWNlICsgXCIqWypeJHwhfl0/PVwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZGIDMuNSAtIDplbmFibGVkLzpkaXNhYmxlZCBhbmQgaGlkZGVuIGVsZW1lbnRzIChoaWRkZW4gZWxlbWVudHMgYXJlIHN0aWxsIGVuYWJsZWQpXG5cdFx0XHQvLyBJRTggdGhyb3dzIGVycm9yIGhlcmUgYW5kIHdpbGwgbm90IHNlZSBsYXRlciB0ZXN0c1xuXHRcdFx0aWYgKCBlbC5xdWVyeVNlbGVjdG9yQWxsKFwiOmVuYWJsZWRcIikubGVuZ3RoICE9PSAyICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCI6ZW5hYmxlZFwiLCBcIjpkaXNhYmxlZFwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFOS0xMStcblx0XHRcdC8vIElFJ3MgOmRpc2FibGVkIHNlbGVjdG9yIGRvZXMgbm90IHBpY2sgdXAgdGhlIGNoaWxkcmVuIG9mIGRpc2FibGVkIGZpZWxkc2V0c1xuXHRcdFx0ZG9jRWxlbS5hcHBlbmRDaGlsZCggZWwgKS5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRpZiAoIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCI6ZGlzYWJsZWRcIikubGVuZ3RoICE9PSAyICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCI6ZW5hYmxlZFwiLCBcIjpkaXNhYmxlZFwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE9wZXJhIDEwLTExIGRvZXMgbm90IHRocm93IG9uIHBvc3QtY29tbWEgaW52YWxpZCBwc2V1ZG9zXG5cdFx0XHRlbC5xdWVyeVNlbGVjdG9yQWxsKFwiKiw6eFwiKTtcblx0XHRcdHJidWdneVFTQS5wdXNoKFwiLC4qOlwiKTtcblx0XHR9KTtcblx0fVxuXG5cdGlmICggKHN1cHBvcnQubWF0Y2hlc1NlbGVjdG9yID0gcm5hdGl2ZS50ZXN0KCAobWF0Y2hlcyA9IGRvY0VsZW0ubWF0Y2hlcyB8fFxuXHRcdGRvY0VsZW0ud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZG9jRWxlbS5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRkb2NFbGVtLm9NYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRkb2NFbGVtLm1zTWF0Y2hlc1NlbGVjdG9yKSApKSApIHtcblxuXHRcdGFzc2VydChmdW5jdGlvbiggZWwgKSB7XG5cdFx0XHQvLyBDaGVjayB0byBzZWUgaWYgaXQncyBwb3NzaWJsZSB0byBkbyBtYXRjaGVzU2VsZWN0b3Jcblx0XHRcdC8vIG9uIGEgZGlzY29ubmVjdGVkIG5vZGUgKElFIDkpXG5cdFx0XHRzdXBwb3J0LmRpc2Nvbm5lY3RlZE1hdGNoID0gbWF0Y2hlcy5jYWxsKCBlbCwgXCIqXCIgKTtcblxuXHRcdFx0Ly8gVGhpcyBzaG91bGQgZmFpbCB3aXRoIGFuIGV4Y2VwdGlvblxuXHRcdFx0Ly8gR2Vja28gZG9lcyBub3QgZXJyb3IsIHJldHVybnMgZmFsc2UgaW5zdGVhZFxuXHRcdFx0bWF0Y2hlcy5jYWxsKCBlbCwgXCJbcyE9JyddOnhcIiApO1xuXHRcdFx0cmJ1Z2d5TWF0Y2hlcy5wdXNoKCBcIiE9XCIsIHBzZXVkb3MgKTtcblx0XHR9KTtcblx0fVxuXG5cdHJidWdneVFTQSA9IHJidWdneVFTQS5sZW5ndGggJiYgbmV3IFJlZ0V4cCggcmJ1Z2d5UVNBLmpvaW4oXCJ8XCIpICk7XG5cdHJidWdneU1hdGNoZXMgPSByYnVnZ3lNYXRjaGVzLmxlbmd0aCAmJiBuZXcgUmVnRXhwKCByYnVnZ3lNYXRjaGVzLmpvaW4oXCJ8XCIpICk7XG5cblx0LyogQ29udGFpbnNcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXHRoYXNDb21wYXJlID0gcm5hdGl2ZS50ZXN0KCBkb2NFbGVtLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uICk7XG5cblx0Ly8gRWxlbWVudCBjb250YWlucyBhbm90aGVyXG5cdC8vIFB1cnBvc2VmdWxseSBzZWxmLWV4Y2x1c2l2ZVxuXHQvLyBBcyBpbiwgYW4gZWxlbWVudCBkb2VzIG5vdCBjb250YWluIGl0c2VsZlxuXHRjb250YWlucyA9IGhhc0NvbXBhcmUgfHwgcm5hdGl2ZS50ZXN0KCBkb2NFbGVtLmNvbnRhaW5zICkgP1xuXHRcdGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdFx0dmFyIGFkb3duID0gYS5ub2RlVHlwZSA9PT0gOSA/IGEuZG9jdW1lbnRFbGVtZW50IDogYSxcblx0XHRcdFx0YnVwID0gYiAmJiBiLnBhcmVudE5vZGU7XG5cdFx0XHRyZXR1cm4gYSA9PT0gYnVwIHx8ICEhKCBidXAgJiYgYnVwLm5vZGVUeXBlID09PSAxICYmIChcblx0XHRcdFx0YWRvd24uY29udGFpbnMgP1xuXHRcdFx0XHRcdGFkb3duLmNvbnRhaW5zKCBidXAgKSA6XG5cdFx0XHRcdFx0YS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiAmJiBhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBidXAgKSAmIDE2XG5cdFx0XHQpKTtcblx0XHR9IDpcblx0XHRmdW5jdGlvbiggYSwgYiApIHtcblx0XHRcdGlmICggYiApIHtcblx0XHRcdFx0d2hpbGUgKCAoYiA9IGIucGFyZW50Tm9kZSkgKSB7XG5cdFx0XHRcdFx0aWYgKCBiID09PSBhICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcblxuXHQvKiBTb3J0aW5nXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXHQvLyBEb2N1bWVudCBvcmRlciBzb3J0aW5nXG5cdHNvcnRPcmRlciA9IGhhc0NvbXBhcmUgP1xuXHRmdW5jdGlvbiggYSwgYiApIHtcblxuXHRcdC8vIEZsYWcgZm9yIGR1cGxpY2F0ZSByZW1vdmFsXG5cdFx0aWYgKCBhID09PSBiICkge1xuXHRcdFx0aGFzRHVwbGljYXRlID0gdHJ1ZTtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblxuXHRcdC8vIFNvcnQgb24gbWV0aG9kIGV4aXN0ZW5jZSBpZiBvbmx5IG9uZSBpbnB1dCBoYXMgY29tcGFyZURvY3VtZW50UG9zaXRpb25cblx0XHR2YXIgY29tcGFyZSA9ICFhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uIC0gIWIuY29tcGFyZURvY3VtZW50UG9zaXRpb247XG5cdFx0aWYgKCBjb21wYXJlICkge1xuXHRcdFx0cmV0dXJuIGNvbXBhcmU7XG5cdFx0fVxuXG5cdFx0Ly8gQ2FsY3VsYXRlIHBvc2l0aW9uIGlmIGJvdGggaW5wdXRzIGJlbG9uZyB0byB0aGUgc2FtZSBkb2N1bWVudFxuXHRcdGNvbXBhcmUgPSAoIGEub3duZXJEb2N1bWVudCB8fCBhICkgPT09ICggYi5vd25lckRvY3VtZW50IHx8IGIgKSA/XG5cdFx0XHRhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBiICkgOlxuXG5cdFx0XHQvLyBPdGhlcndpc2Ugd2Uga25vdyB0aGV5IGFyZSBkaXNjb25uZWN0ZWRcblx0XHRcdDE7XG5cblx0XHQvLyBEaXNjb25uZWN0ZWQgbm9kZXNcblx0XHRpZiAoIGNvbXBhcmUgJiAxIHx8XG5cdFx0XHQoIXN1cHBvcnQuc29ydERldGFjaGVkICYmIGIuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGEgKSA9PT0gY29tcGFyZSkgKSB7XG5cblx0XHRcdC8vIENob29zZSB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IGlzIHJlbGF0ZWQgdG8gb3VyIHByZWZlcnJlZCBkb2N1bWVudFxuXHRcdFx0aWYgKCBhID09PSBkb2N1bWVudCB8fCBhLm93bmVyRG9jdW1lbnQgPT09IHByZWZlcnJlZERvYyAmJiBjb250YWlucyhwcmVmZXJyZWREb2MsIGEpICkge1xuXHRcdFx0XHRyZXR1cm4gLTE7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGIgPT09IGRvY3VtZW50IHx8IGIub3duZXJEb2N1bWVudCA9PT0gcHJlZmVycmVkRG9jICYmIGNvbnRhaW5zKHByZWZlcnJlZERvYywgYikgKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNYWludGFpbiBvcmlnaW5hbCBvcmRlclxuXHRcdFx0cmV0dXJuIHNvcnRJbnB1dCA/XG5cdFx0XHRcdCggaW5kZXhPZiggc29ydElucHV0LCBhICkgLSBpbmRleE9mKCBzb3J0SW5wdXQsIGIgKSApIDpcblx0XHRcdFx0MDtcblx0XHR9XG5cblx0XHRyZXR1cm4gY29tcGFyZSAmIDQgPyAtMSA6IDE7XG5cdH0gOlxuXHRmdW5jdGlvbiggYSwgYiApIHtcblx0XHQvLyBFeGl0IGVhcmx5IGlmIHRoZSBub2RlcyBhcmUgaWRlbnRpY2FsXG5cdFx0aWYgKCBhID09PSBiICkge1xuXHRcdFx0aGFzRHVwbGljYXRlID0gdHJ1ZTtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblxuXHRcdHZhciBjdXIsXG5cdFx0XHRpID0gMCxcblx0XHRcdGF1cCA9IGEucGFyZW50Tm9kZSxcblx0XHRcdGJ1cCA9IGIucGFyZW50Tm9kZSxcblx0XHRcdGFwID0gWyBhIF0sXG5cdFx0XHRicCA9IFsgYiBdO1xuXG5cdFx0Ly8gUGFyZW50bGVzcyBub2RlcyBhcmUgZWl0aGVyIGRvY3VtZW50cyBvciBkaXNjb25uZWN0ZWRcblx0XHRpZiAoICFhdXAgfHwgIWJ1cCApIHtcblx0XHRcdHJldHVybiBhID09PSBkb2N1bWVudCA/IC0xIDpcblx0XHRcdFx0YiA9PT0gZG9jdW1lbnQgPyAxIDpcblx0XHRcdFx0YXVwID8gLTEgOlxuXHRcdFx0XHRidXAgPyAxIDpcblx0XHRcdFx0c29ydElucHV0ID9cblx0XHRcdFx0KCBpbmRleE9mKCBzb3J0SW5wdXQsIGEgKSAtIGluZGV4T2YoIHNvcnRJbnB1dCwgYiApICkgOlxuXHRcdFx0XHQwO1xuXG5cdFx0Ly8gSWYgdGhlIG5vZGVzIGFyZSBzaWJsaW5ncywgd2UgY2FuIGRvIGEgcXVpY2sgY2hlY2tcblx0XHR9IGVsc2UgaWYgKCBhdXAgPT09IGJ1cCApIHtcblx0XHRcdHJldHVybiBzaWJsaW5nQ2hlY2soIGEsIGIgKTtcblx0XHR9XG5cblx0XHQvLyBPdGhlcndpc2Ugd2UgbmVlZCBmdWxsIGxpc3RzIG9mIHRoZWlyIGFuY2VzdG9ycyBmb3IgY29tcGFyaXNvblxuXHRcdGN1ciA9IGE7XG5cdFx0d2hpbGUgKCAoY3VyID0gY3VyLnBhcmVudE5vZGUpICkge1xuXHRcdFx0YXAudW5zaGlmdCggY3VyICk7XG5cdFx0fVxuXHRcdGN1ciA9IGI7XG5cdFx0d2hpbGUgKCAoY3VyID0gY3VyLnBhcmVudE5vZGUpICkge1xuXHRcdFx0YnAudW5zaGlmdCggY3VyICk7XG5cdFx0fVxuXG5cdFx0Ly8gV2FsayBkb3duIHRoZSB0cmVlIGxvb2tpbmcgZm9yIGEgZGlzY3JlcGFuY3lcblx0XHR3aGlsZSAoIGFwW2ldID09PSBicFtpXSApIHtcblx0XHRcdGkrKztcblx0XHR9XG5cblx0XHRyZXR1cm4gaSA/XG5cdFx0XHQvLyBEbyBhIHNpYmxpbmcgY2hlY2sgaWYgdGhlIG5vZGVzIGhhdmUgYSBjb21tb24gYW5jZXN0b3Jcblx0XHRcdHNpYmxpbmdDaGVjayggYXBbaV0sIGJwW2ldICkgOlxuXG5cdFx0XHQvLyBPdGhlcndpc2Ugbm9kZXMgaW4gb3VyIGRvY3VtZW50IHNvcnQgZmlyc3Rcblx0XHRcdGFwW2ldID09PSBwcmVmZXJyZWREb2MgPyAtMSA6XG5cdFx0XHRicFtpXSA9PT0gcHJlZmVycmVkRG9jID8gMSA6XG5cdFx0XHQwO1xuXHR9O1xuXG5cdHJldHVybiBkb2N1bWVudDtcbn07XG5cblNpenpsZS5tYXRjaGVzID0gZnVuY3Rpb24oIGV4cHIsIGVsZW1lbnRzICkge1xuXHRyZXR1cm4gU2l6emxlKCBleHByLCBudWxsLCBudWxsLCBlbGVtZW50cyApO1xufTtcblxuU2l6emxlLm1hdGNoZXNTZWxlY3RvciA9IGZ1bmN0aW9uKCBlbGVtLCBleHByICkge1xuXHQvLyBTZXQgZG9jdW1lbnQgdmFycyBpZiBuZWVkZWRcblx0aWYgKCAoIGVsZW0ub3duZXJEb2N1bWVudCB8fCBlbGVtICkgIT09IGRvY3VtZW50ICkge1xuXHRcdHNldERvY3VtZW50KCBlbGVtICk7XG5cdH1cblxuXHQvLyBNYWtlIHN1cmUgdGhhdCBhdHRyaWJ1dGUgc2VsZWN0b3JzIGFyZSBxdW90ZWRcblx0ZXhwciA9IGV4cHIucmVwbGFjZSggcmF0dHJpYnV0ZVF1b3RlcywgXCI9JyQxJ11cIiApO1xuXG5cdGlmICggc3VwcG9ydC5tYXRjaGVzU2VsZWN0b3IgJiYgZG9jdW1lbnRJc0hUTUwgJiZcblx0XHQhY29tcGlsZXJDYWNoZVsgZXhwciArIFwiIFwiIF0gJiZcblx0XHQoICFyYnVnZ3lNYXRjaGVzIHx8ICFyYnVnZ3lNYXRjaGVzLnRlc3QoIGV4cHIgKSApICYmXG5cdFx0KCAhcmJ1Z2d5UVNBICAgICB8fCAhcmJ1Z2d5UVNBLnRlc3QoIGV4cHIgKSApICkge1xuXG5cdFx0dHJ5IHtcblx0XHRcdHZhciByZXQgPSBtYXRjaGVzLmNhbGwoIGVsZW0sIGV4cHIgKTtcblxuXHRcdFx0Ly8gSUUgOSdzIG1hdGNoZXNTZWxlY3RvciByZXR1cm5zIGZhbHNlIG9uIGRpc2Nvbm5lY3RlZCBub2Rlc1xuXHRcdFx0aWYgKCByZXQgfHwgc3VwcG9ydC5kaXNjb25uZWN0ZWRNYXRjaCB8fFxuXHRcdFx0XHRcdC8vIEFzIHdlbGwsIGRpc2Nvbm5lY3RlZCBub2RlcyBhcmUgc2FpZCB0byBiZSBpbiBhIGRvY3VtZW50XG5cdFx0XHRcdFx0Ly8gZnJhZ21lbnQgaW4gSUUgOVxuXHRcdFx0XHRcdGVsZW0uZG9jdW1lbnQgJiYgZWxlbS5kb2N1bWVudC5ub2RlVHlwZSAhPT0gMTEgKSB7XG5cdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge31cblx0fVxuXG5cdHJldHVybiBTaXp6bGUoIGV4cHIsIGRvY3VtZW50LCBudWxsLCBbIGVsZW0gXSApLmxlbmd0aCA+IDA7XG59O1xuXG5TaXp6bGUuY29udGFpbnMgPSBmdW5jdGlvbiggY29udGV4dCwgZWxlbSApIHtcblx0Ly8gU2V0IGRvY3VtZW50IHZhcnMgaWYgbmVlZGVkXG5cdGlmICggKCBjb250ZXh0Lm93bmVyRG9jdW1lbnQgfHwgY29udGV4dCApICE9PSBkb2N1bWVudCApIHtcblx0XHRzZXREb2N1bWVudCggY29udGV4dCApO1xuXHR9XG5cdHJldHVybiBjb250YWlucyggY29udGV4dCwgZWxlbSApO1xufTtcblxuU2l6emxlLmF0dHIgPSBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcblx0Ly8gU2V0IGRvY3VtZW50IHZhcnMgaWYgbmVlZGVkXG5cdGlmICggKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSApICE9PSBkb2N1bWVudCApIHtcblx0XHRzZXREb2N1bWVudCggZWxlbSApO1xuXHR9XG5cblx0dmFyIGZuID0gRXhwci5hdHRySGFuZGxlWyBuYW1lLnRvTG93ZXJDYXNlKCkgXSxcblx0XHQvLyBEb24ndCBnZXQgZm9vbGVkIGJ5IE9iamVjdC5wcm90b3R5cGUgcHJvcGVydGllcyAoalF1ZXJ5ICMxMzgwNylcblx0XHR2YWwgPSBmbiAmJiBoYXNPd24uY2FsbCggRXhwci5hdHRySGFuZGxlLCBuYW1lLnRvTG93ZXJDYXNlKCkgKSA/XG5cdFx0XHRmbiggZWxlbSwgbmFtZSwgIWRvY3VtZW50SXNIVE1MICkgOlxuXHRcdFx0dW5kZWZpbmVkO1xuXG5cdHJldHVybiB2YWwgIT09IHVuZGVmaW5lZCA/XG5cdFx0dmFsIDpcblx0XHRzdXBwb3J0LmF0dHJpYnV0ZXMgfHwgIWRvY3VtZW50SXNIVE1MID9cblx0XHRcdGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lICkgOlxuXHRcdFx0KHZhbCA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZShuYW1lKSkgJiYgdmFsLnNwZWNpZmllZCA/XG5cdFx0XHRcdHZhbC52YWx1ZSA6XG5cdFx0XHRcdG51bGw7XG59O1xuXG5TaXp6bGUuZXNjYXBlID0gZnVuY3Rpb24oIHNlbCApIHtcblx0cmV0dXJuIChzZWwgKyBcIlwiKS5yZXBsYWNlKCByY3NzZXNjYXBlLCBmY3NzZXNjYXBlICk7XG59O1xuXG5TaXp6bGUuZXJyb3IgPSBmdW5jdGlvbiggbXNnICkge1xuXHR0aHJvdyBuZXcgRXJyb3IoIFwiU3ludGF4IGVycm9yLCB1bnJlY29nbml6ZWQgZXhwcmVzc2lvbjogXCIgKyBtc2cgKTtcbn07XG5cbi8qKlxuICogRG9jdW1lbnQgc29ydGluZyBhbmQgcmVtb3ZpbmcgZHVwbGljYXRlc1xuICogQHBhcmFtIHtBcnJheUxpa2V9IHJlc3VsdHNcbiAqL1xuU2l6emxlLnVuaXF1ZVNvcnQgPSBmdW5jdGlvbiggcmVzdWx0cyApIHtcblx0dmFyIGVsZW0sXG5cdFx0ZHVwbGljYXRlcyA9IFtdLFxuXHRcdGogPSAwLFxuXHRcdGkgPSAwO1xuXG5cdC8vIFVubGVzcyB3ZSAqa25vdyogd2UgY2FuIGRldGVjdCBkdXBsaWNhdGVzLCBhc3N1bWUgdGhlaXIgcHJlc2VuY2Vcblx0aGFzRHVwbGljYXRlID0gIXN1cHBvcnQuZGV0ZWN0RHVwbGljYXRlcztcblx0c29ydElucHV0ID0gIXN1cHBvcnQuc29ydFN0YWJsZSAmJiByZXN1bHRzLnNsaWNlKCAwICk7XG5cdHJlc3VsdHMuc29ydCggc29ydE9yZGVyICk7XG5cblx0aWYgKCBoYXNEdXBsaWNhdGUgKSB7XG5cdFx0d2hpbGUgKCAoZWxlbSA9IHJlc3VsdHNbaSsrXSkgKSB7XG5cdFx0XHRpZiAoIGVsZW0gPT09IHJlc3VsdHNbIGkgXSApIHtcblx0XHRcdFx0aiA9IGR1cGxpY2F0ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR3aGlsZSAoIGotLSApIHtcblx0XHRcdHJlc3VsdHMuc3BsaWNlKCBkdXBsaWNhdGVzWyBqIF0sIDEgKTtcblx0XHR9XG5cdH1cblxuXHQvLyBDbGVhciBpbnB1dCBhZnRlciBzb3J0aW5nIHRvIHJlbGVhc2Ugb2JqZWN0c1xuXHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9zaXp6bGUvcHVsbC8yMjVcblx0c29ydElucHV0ID0gbnVsbDtcblxuXHRyZXR1cm4gcmVzdWx0cztcbn07XG5cbi8qKlxuICogVXRpbGl0eSBmdW5jdGlvbiBmb3IgcmV0cmlldmluZyB0aGUgdGV4dCB2YWx1ZSBvZiBhbiBhcnJheSBvZiBET00gbm9kZXNcbiAqIEBwYXJhbSB7QXJyYXl8RWxlbWVudH0gZWxlbVxuICovXG5nZXRUZXh0ID0gU2l6emxlLmdldFRleHQgPSBmdW5jdGlvbiggZWxlbSApIHtcblx0dmFyIG5vZGUsXG5cdFx0cmV0ID0gXCJcIixcblx0XHRpID0gMCxcblx0XHRub2RlVHlwZSA9IGVsZW0ubm9kZVR5cGU7XG5cblx0aWYgKCAhbm9kZVR5cGUgKSB7XG5cdFx0Ly8gSWYgbm8gbm9kZVR5cGUsIHRoaXMgaXMgZXhwZWN0ZWQgdG8gYmUgYW4gYXJyYXlcblx0XHR3aGlsZSAoIChub2RlID0gZWxlbVtpKytdKSApIHtcblx0XHRcdC8vIERvIG5vdCB0cmF2ZXJzZSBjb21tZW50IG5vZGVzXG5cdFx0XHRyZXQgKz0gZ2V0VGV4dCggbm9kZSApO1xuXHRcdH1cblx0fSBlbHNlIGlmICggbm9kZVR5cGUgPT09IDEgfHwgbm9kZVR5cGUgPT09IDkgfHwgbm9kZVR5cGUgPT09IDExICkge1xuXHRcdC8vIFVzZSB0ZXh0Q29udGVudCBmb3IgZWxlbWVudHNcblx0XHQvLyBpbm5lclRleHQgdXNhZ2UgcmVtb3ZlZCBmb3IgY29uc2lzdGVuY3kgb2YgbmV3IGxpbmVzIChqUXVlcnkgIzExMTUzKVxuXHRcdGlmICggdHlwZW9mIGVsZW0udGV4dENvbnRlbnQgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS50ZXh0Q29udGVudDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gVHJhdmVyc2UgaXRzIGNoaWxkcmVuXG5cdFx0XHRmb3IgKCBlbGVtID0gZWxlbS5maXJzdENoaWxkOyBlbGVtOyBlbGVtID0gZWxlbS5uZXh0U2libGluZyApIHtcblx0XHRcdFx0cmV0ICs9IGdldFRleHQoIGVsZW0gKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSBpZiAoIG5vZGVUeXBlID09PSAzIHx8IG5vZGVUeXBlID09PSA0ICkge1xuXHRcdHJldHVybiBlbGVtLm5vZGVWYWx1ZTtcblx0fVxuXHQvLyBEbyBub3QgaW5jbHVkZSBjb21tZW50IG9yIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24gbm9kZXNcblxuXHRyZXR1cm4gcmV0O1xufTtcblxuRXhwciA9IFNpenpsZS5zZWxlY3RvcnMgPSB7XG5cblx0Ly8gQ2FuIGJlIGFkanVzdGVkIGJ5IHRoZSB1c2VyXG5cdGNhY2hlTGVuZ3RoOiA1MCxcblxuXHRjcmVhdGVQc2V1ZG86IG1hcmtGdW5jdGlvbixcblxuXHRtYXRjaDogbWF0Y2hFeHByLFxuXG5cdGF0dHJIYW5kbGU6IHt9LFxuXG5cdGZpbmQ6IHt9LFxuXG5cdHJlbGF0aXZlOiB7XG5cdFx0XCI+XCI6IHsgZGlyOiBcInBhcmVudE5vZGVcIiwgZmlyc3Q6IHRydWUgfSxcblx0XHRcIiBcIjogeyBkaXI6IFwicGFyZW50Tm9kZVwiIH0sXG5cdFx0XCIrXCI6IHsgZGlyOiBcInByZXZpb3VzU2libGluZ1wiLCBmaXJzdDogdHJ1ZSB9LFxuXHRcdFwiflwiOiB7IGRpcjogXCJwcmV2aW91c1NpYmxpbmdcIiB9XG5cdH0sXG5cblx0cHJlRmlsdGVyOiB7XG5cdFx0XCJBVFRSXCI6IGZ1bmN0aW9uKCBtYXRjaCApIHtcblx0XHRcdG1hdGNoWzFdID0gbWF0Y2hbMV0ucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblxuXHRcdFx0Ly8gTW92ZSB0aGUgZ2l2ZW4gdmFsdWUgdG8gbWF0Y2hbM10gd2hldGhlciBxdW90ZWQgb3IgdW5xdW90ZWRcblx0XHRcdG1hdGNoWzNdID0gKCBtYXRjaFszXSB8fCBtYXRjaFs0XSB8fCBtYXRjaFs1XSB8fCBcIlwiICkucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblxuXHRcdFx0aWYgKCBtYXRjaFsyXSA9PT0gXCJ+PVwiICkge1xuXHRcdFx0XHRtYXRjaFszXSA9IFwiIFwiICsgbWF0Y2hbM10gKyBcIiBcIjtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG1hdGNoLnNsaWNlKCAwLCA0ICk7XG5cdFx0fSxcblxuXHRcdFwiQ0hJTERcIjogZnVuY3Rpb24oIG1hdGNoICkge1xuXHRcdFx0LyogbWF0Y2hlcyBmcm9tIG1hdGNoRXhwcltcIkNISUxEXCJdXG5cdFx0XHRcdDEgdHlwZSAob25seXxudGh8Li4uKVxuXHRcdFx0XHQyIHdoYXQgKGNoaWxkfG9mLXR5cGUpXG5cdFx0XHRcdDMgYXJndW1lbnQgKGV2ZW58b2RkfFxcZCp8XFxkKm4oWystXVxcZCspP3wuLi4pXG5cdFx0XHRcdDQgeG4tY29tcG9uZW50IG9mIHhuK3kgYXJndW1lbnQgKFsrLV0/XFxkKm58KVxuXHRcdFx0XHQ1IHNpZ24gb2YgeG4tY29tcG9uZW50XG5cdFx0XHRcdDYgeCBvZiB4bi1jb21wb25lbnRcblx0XHRcdFx0NyBzaWduIG9mIHktY29tcG9uZW50XG5cdFx0XHRcdDggeSBvZiB5LWNvbXBvbmVudFxuXHRcdFx0Ki9cblx0XHRcdG1hdGNoWzFdID0gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcblxuXHRcdFx0aWYgKCBtYXRjaFsxXS5zbGljZSggMCwgMyApID09PSBcIm50aFwiICkge1xuXHRcdFx0XHQvLyBudGgtKiByZXF1aXJlcyBhcmd1bWVudFxuXHRcdFx0XHRpZiAoICFtYXRjaFszXSApIHtcblx0XHRcdFx0XHRTaXp6bGUuZXJyb3IoIG1hdGNoWzBdICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBudW1lcmljIHggYW5kIHkgcGFyYW1ldGVycyBmb3IgRXhwci5maWx0ZXIuQ0hJTERcblx0XHRcdFx0Ly8gcmVtZW1iZXIgdGhhdCBmYWxzZS90cnVlIGNhc3QgcmVzcGVjdGl2ZWx5IHRvIDAvMVxuXHRcdFx0XHRtYXRjaFs0XSA9ICsoIG1hdGNoWzRdID8gbWF0Y2hbNV0gKyAobWF0Y2hbNl0gfHwgMSkgOiAyICogKCBtYXRjaFszXSA9PT0gXCJldmVuXCIgfHwgbWF0Y2hbM10gPT09IFwib2RkXCIgKSApO1xuXHRcdFx0XHRtYXRjaFs1XSA9ICsoICggbWF0Y2hbN10gKyBtYXRjaFs4XSApIHx8IG1hdGNoWzNdID09PSBcIm9kZFwiICk7XG5cblx0XHRcdC8vIG90aGVyIHR5cGVzIHByb2hpYml0IGFyZ3VtZW50c1xuXHRcdFx0fSBlbHNlIGlmICggbWF0Y2hbM10gKSB7XG5cdFx0XHRcdFNpenpsZS5lcnJvciggbWF0Y2hbMF0gKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG1hdGNoO1xuXHRcdH0sXG5cblx0XHRcIlBTRVVET1wiOiBmdW5jdGlvbiggbWF0Y2ggKSB7XG5cdFx0XHR2YXIgZXhjZXNzLFxuXHRcdFx0XHR1bnF1b3RlZCA9ICFtYXRjaFs2XSAmJiBtYXRjaFsyXTtcblxuXHRcdFx0aWYgKCBtYXRjaEV4cHJbXCJDSElMRFwiXS50ZXN0KCBtYXRjaFswXSApICkge1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWNjZXB0IHF1b3RlZCBhcmd1bWVudHMgYXMtaXNcblx0XHRcdGlmICggbWF0Y2hbM10gKSB7XG5cdFx0XHRcdG1hdGNoWzJdID0gbWF0Y2hbNF0gfHwgbWF0Y2hbNV0gfHwgXCJcIjtcblxuXHRcdFx0Ly8gU3RyaXAgZXhjZXNzIGNoYXJhY3RlcnMgZnJvbSB1bnF1b3RlZCBhcmd1bWVudHNcblx0XHRcdH0gZWxzZSBpZiAoIHVucXVvdGVkICYmIHJwc2V1ZG8udGVzdCggdW5xdW90ZWQgKSAmJlxuXHRcdFx0XHQvLyBHZXQgZXhjZXNzIGZyb20gdG9rZW5pemUgKHJlY3Vyc2l2ZWx5KVxuXHRcdFx0XHQoZXhjZXNzID0gdG9rZW5pemUoIHVucXVvdGVkLCB0cnVlICkpICYmXG5cdFx0XHRcdC8vIGFkdmFuY2UgdG8gdGhlIG5leHQgY2xvc2luZyBwYXJlbnRoZXNpc1xuXHRcdFx0XHQoZXhjZXNzID0gdW5xdW90ZWQuaW5kZXhPZiggXCIpXCIsIHVucXVvdGVkLmxlbmd0aCAtIGV4Y2VzcyApIC0gdW5xdW90ZWQubGVuZ3RoKSApIHtcblxuXHRcdFx0XHQvLyBleGNlc3MgaXMgYSBuZWdhdGl2ZSBpbmRleFxuXHRcdFx0XHRtYXRjaFswXSA9IG1hdGNoWzBdLnNsaWNlKCAwLCBleGNlc3MgKTtcblx0XHRcdFx0bWF0Y2hbMl0gPSB1bnF1b3RlZC5zbGljZSggMCwgZXhjZXNzICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJldHVybiBvbmx5IGNhcHR1cmVzIG5lZWRlZCBieSB0aGUgcHNldWRvIGZpbHRlciBtZXRob2QgKHR5cGUgYW5kIGFyZ3VtZW50KVxuXHRcdFx0cmV0dXJuIG1hdGNoLnNsaWNlKCAwLCAzICk7XG5cdFx0fVxuXHR9LFxuXG5cdGZpbHRlcjoge1xuXG5cdFx0XCJUQUdcIjogZnVuY3Rpb24oIG5vZGVOYW1lU2VsZWN0b3IgKSB7XG5cdFx0XHR2YXIgbm9kZU5hbWUgPSBub2RlTmFtZVNlbGVjdG9yLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICkudG9Mb3dlckNhc2UoKTtcblx0XHRcdHJldHVybiBub2RlTmFtZVNlbGVjdG9yID09PSBcIipcIiA/XG5cdFx0XHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfSA6XG5cdFx0XHRcdGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRcdHJldHVybiBlbGVtLm5vZGVOYW1lICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbm9kZU5hbWU7XG5cdFx0XHRcdH07XG5cdFx0fSxcblxuXHRcdFwiQ0xBU1NcIjogZnVuY3Rpb24oIGNsYXNzTmFtZSApIHtcblx0XHRcdHZhciBwYXR0ZXJuID0gY2xhc3NDYWNoZVsgY2xhc3NOYW1lICsgXCIgXCIgXTtcblxuXHRcdFx0cmV0dXJuIHBhdHRlcm4gfHxcblx0XHRcdFx0KHBhdHRlcm4gPSBuZXcgUmVnRXhwKCBcIihefFwiICsgd2hpdGVzcGFjZSArIFwiKVwiICsgY2xhc3NOYW1lICsgXCIoXCIgKyB3aGl0ZXNwYWNlICsgXCJ8JClcIiApKSAmJlxuXHRcdFx0XHRjbGFzc0NhY2hlKCBjbGFzc05hbWUsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRcdHJldHVybiBwYXR0ZXJuLnRlc3QoIHR5cGVvZiBlbGVtLmNsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBlbGVtLmNsYXNzTmFtZSB8fCB0eXBlb2YgZWxlbS5nZXRBdHRyaWJ1dGUgIT09IFwidW5kZWZpbmVkXCIgJiYgZWxlbS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBcIlwiICk7XG5cdFx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHRcIkFUVFJcIjogZnVuY3Rpb24oIG5hbWUsIG9wZXJhdG9yLCBjaGVjayApIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IFNpenpsZS5hdHRyKCBlbGVtLCBuYW1lICk7XG5cblx0XHRcdFx0aWYgKCByZXN1bHQgPT0gbnVsbCApIHtcblx0XHRcdFx0XHRyZXR1cm4gb3BlcmF0b3IgPT09IFwiIT1cIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoICFvcGVyYXRvciApIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlc3VsdCArPSBcIlwiO1xuXG5cdFx0XHRcdHJldHVybiBvcGVyYXRvciA9PT0gXCI9XCIgPyByZXN1bHQgPT09IGNoZWNrIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCIhPVwiID8gcmVzdWx0ICE9PSBjaGVjayA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwiXj1cIiA/IGNoZWNrICYmIHJlc3VsdC5pbmRleE9mKCBjaGVjayApID09PSAwIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCIqPVwiID8gY2hlY2sgJiYgcmVzdWx0LmluZGV4T2YoIGNoZWNrICkgPiAtMSA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwiJD1cIiA/IGNoZWNrICYmIHJlc3VsdC5zbGljZSggLWNoZWNrLmxlbmd0aCApID09PSBjaGVjayA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwifj1cIiA/ICggXCIgXCIgKyByZXN1bHQucmVwbGFjZSggcndoaXRlc3BhY2UsIFwiIFwiICkgKyBcIiBcIiApLmluZGV4T2YoIGNoZWNrICkgPiAtMSA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwifD1cIiA/IHJlc3VsdCA9PT0gY2hlY2sgfHwgcmVzdWx0LnNsaWNlKCAwLCBjaGVjay5sZW5ndGggKyAxICkgPT09IGNoZWNrICsgXCItXCIgOlxuXHRcdFx0XHRcdGZhbHNlO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0XCJDSElMRFwiOiBmdW5jdGlvbiggdHlwZSwgd2hhdCwgYXJndW1lbnQsIGZpcnN0LCBsYXN0ICkge1xuXHRcdFx0dmFyIHNpbXBsZSA9IHR5cGUuc2xpY2UoIDAsIDMgKSAhPT0gXCJudGhcIixcblx0XHRcdFx0Zm9yd2FyZCA9IHR5cGUuc2xpY2UoIC00ICkgIT09IFwibGFzdFwiLFxuXHRcdFx0XHRvZlR5cGUgPSB3aGF0ID09PSBcIm9mLXR5cGVcIjtcblxuXHRcdFx0cmV0dXJuIGZpcnN0ID09PSAxICYmIGxhc3QgPT09IDAgP1xuXG5cdFx0XHRcdC8vIFNob3J0Y3V0IGZvciA6bnRoLSoobilcblx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdFx0cmV0dXJuICEhZWxlbS5wYXJlbnROb2RlO1xuXHRcdFx0XHR9IDpcblxuXHRcdFx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0XHRcdHZhciBjYWNoZSwgdW5pcXVlQ2FjaGUsIG91dGVyQ2FjaGUsIG5vZGUsIG5vZGVJbmRleCwgc3RhcnQsXG5cdFx0XHRcdFx0XHRkaXIgPSBzaW1wbGUgIT09IGZvcndhcmQgPyBcIm5leHRTaWJsaW5nXCIgOiBcInByZXZpb3VzU2libGluZ1wiLFxuXHRcdFx0XHRcdFx0cGFyZW50ID0gZWxlbS5wYXJlbnROb2RlLFxuXHRcdFx0XHRcdFx0bmFtZSA9IG9mVHlwZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCksXG5cdFx0XHRcdFx0XHR1c2VDYWNoZSA9ICF4bWwgJiYgIW9mVHlwZSxcblx0XHRcdFx0XHRcdGRpZmYgPSBmYWxzZTtcblxuXHRcdFx0XHRcdGlmICggcGFyZW50ICkge1xuXG5cdFx0XHRcdFx0XHQvLyA6KGZpcnN0fGxhc3R8b25seSktKGNoaWxkfG9mLXR5cGUpXG5cdFx0XHRcdFx0XHRpZiAoIHNpbXBsZSApIHtcblx0XHRcdFx0XHRcdFx0d2hpbGUgKCBkaXIgKSB7XG5cdFx0XHRcdFx0XHRcdFx0bm9kZSA9IGVsZW07XG5cdFx0XHRcdFx0XHRcdFx0d2hpbGUgKCAobm9kZSA9IG5vZGVbIGRpciBdKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICggb2ZUeXBlID9cblx0XHRcdFx0XHRcdFx0XHRcdFx0bm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lIDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0bm9kZS5ub2RlVHlwZSA9PT0gMSApIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdC8vIFJldmVyc2UgZGlyZWN0aW9uIGZvciA6b25seS0qIChpZiB3ZSBoYXZlbid0IHlldCBkb25lIHNvKVxuXHRcdFx0XHRcdFx0XHRcdHN0YXJ0ID0gZGlyID0gdHlwZSA9PT0gXCJvbmx5XCIgJiYgIXN0YXJ0ICYmIFwibmV4dFNpYmxpbmdcIjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0c3RhcnQgPSBbIGZvcndhcmQgPyBwYXJlbnQuZmlyc3RDaGlsZCA6IHBhcmVudC5sYXN0Q2hpbGQgXTtcblxuXHRcdFx0XHRcdFx0Ly8gbm9uLXhtbCA6bnRoLWNoaWxkKC4uLikgc3RvcmVzIGNhY2hlIGRhdGEgb24gYHBhcmVudGBcblx0XHRcdFx0XHRcdGlmICggZm9yd2FyZCAmJiB1c2VDYWNoZSApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBTZWVrIGBlbGVtYCBmcm9tIGEgcHJldmlvdXNseS1jYWNoZWQgaW5kZXhcblxuXHRcdFx0XHRcdFx0XHQvLyAuLi5pbiBhIGd6aXAtZnJpZW5kbHkgd2F5XG5cdFx0XHRcdFx0XHRcdG5vZGUgPSBwYXJlbnQ7XG5cdFx0XHRcdFx0XHRcdG91dGVyQ2FjaGUgPSBub2RlWyBleHBhbmRvIF0gfHwgKG5vZGVbIGV4cGFuZG8gXSA9IHt9KTtcblxuXHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8OSBvbmx5XG5cdFx0XHRcdFx0XHRcdC8vIERlZmVuZCBhZ2FpbnN0IGNsb25lZCBhdHRyb3BlcnRpZXMgKGpRdWVyeSBnaC0xNzA5KVxuXHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZSA9IG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSB8fFxuXHRcdFx0XHRcdFx0XHRcdChvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gPSB7fSk7XG5cblx0XHRcdFx0XHRcdFx0Y2FjaGUgPSB1bmlxdWVDYWNoZVsgdHlwZSBdIHx8IFtdO1xuXHRcdFx0XHRcdFx0XHRub2RlSW5kZXggPSBjYWNoZVsgMCBdID09PSBkaXJydW5zICYmIGNhY2hlWyAxIF07XG5cdFx0XHRcdFx0XHRcdGRpZmYgPSBub2RlSW5kZXggJiYgY2FjaGVbIDIgXTtcblx0XHRcdFx0XHRcdFx0bm9kZSA9IG5vZGVJbmRleCAmJiBwYXJlbnQuY2hpbGROb2Rlc1sgbm9kZUluZGV4IF07XG5cblx0XHRcdFx0XHRcdFx0d2hpbGUgKCAobm9kZSA9ICsrbm9kZUluZGV4ICYmIG5vZGUgJiYgbm9kZVsgZGlyIF0gfHxcblxuXHRcdFx0XHRcdFx0XHRcdC8vIEZhbGxiYWNrIHRvIHNlZWtpbmcgYGVsZW1gIGZyb20gdGhlIHN0YXJ0XG5cdFx0XHRcdFx0XHRcdFx0KGRpZmYgPSBub2RlSW5kZXggPSAwKSB8fCBzdGFydC5wb3AoKSkgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBXaGVuIGZvdW5kLCBjYWNoZSBpbmRleGVzIG9uIGBwYXJlbnRgIGFuZCBicmVha1xuXHRcdFx0XHRcdFx0XHRcdGlmICggbm9kZS5ub2RlVHlwZSA9PT0gMSAmJiArK2RpZmYgJiYgbm9kZSA9PT0gZWxlbSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlWyB0eXBlIF0gPSBbIGRpcnJ1bnMsIG5vZGVJbmRleCwgZGlmZiBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdC8vIFVzZSBwcmV2aW91c2x5LWNhY2hlZCBlbGVtZW50IGluZGV4IGlmIGF2YWlsYWJsZVxuXHRcdFx0XHRcdFx0XHRpZiAoIHVzZUNhY2hlICkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIC4uLmluIGEgZ3ppcC1mcmllbmRseSB3YXlcblx0XHRcdFx0XHRcdFx0XHRub2RlID0gZWxlbTtcblx0XHRcdFx0XHRcdFx0XHRvdXRlckNhY2hlID0gbm9kZVsgZXhwYW5kbyBdIHx8IChub2RlWyBleHBhbmRvIF0gPSB7fSk7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8OSBvbmx5XG5cdFx0XHRcdFx0XHRcdFx0Ly8gRGVmZW5kIGFnYWluc3QgY2xvbmVkIGF0dHJvcGVydGllcyAoalF1ZXJ5IGdoLTE3MDkpXG5cdFx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGUgPSBvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gfHxcblx0XHRcdFx0XHRcdFx0XHRcdChvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gPSB7fSk7XG5cblx0XHRcdFx0XHRcdFx0XHRjYWNoZSA9IHVuaXF1ZUNhY2hlWyB0eXBlIF0gfHwgW107XG5cdFx0XHRcdFx0XHRcdFx0bm9kZUluZGV4ID0gY2FjaGVbIDAgXSA9PT0gZGlycnVucyAmJiBjYWNoZVsgMSBdO1xuXHRcdFx0XHRcdFx0XHRcdGRpZmYgPSBub2RlSW5kZXg7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQvLyB4bWwgOm50aC1jaGlsZCguLi4pXG5cdFx0XHRcdFx0XHRcdC8vIG9yIDpudGgtbGFzdC1jaGlsZCguLi4pIG9yIDpudGgoLWxhc3QpPy1vZi10eXBlKC4uLilcblx0XHRcdFx0XHRcdFx0aWYgKCBkaWZmID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBVc2UgdGhlIHNhbWUgbG9vcCBhcyBhYm92ZSB0byBzZWVrIGBlbGVtYCBmcm9tIHRoZSBzdGFydFxuXHRcdFx0XHRcdFx0XHRcdHdoaWxlICggKG5vZGUgPSArK25vZGVJbmRleCAmJiBub2RlICYmIG5vZGVbIGRpciBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHQoZGlmZiA9IG5vZGVJbmRleCA9IDApIHx8IHN0YXJ0LnBvcCgpKSApIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCAoIG9mVHlwZSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZSA6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG5vZGUubm9kZVR5cGUgPT09IDEgKSAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQrK2RpZmYgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gQ2FjaGUgdGhlIGluZGV4IG9mIGVhY2ggZW5jb3VudGVyZWQgZWxlbWVudFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIHVzZUNhY2hlICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG91dGVyQ2FjaGUgPSBub2RlWyBleHBhbmRvIF0gfHwgKG5vZGVbIGV4cGFuZG8gXSA9IHt9KTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw5IG9ubHlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBEZWZlbmQgYWdhaW5zdCBjbG9uZWQgYXR0cm9wZXJ0aWVzIChqUXVlcnkgZ2gtMTcwOSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZSA9IG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSA9IHt9KTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlWyB0eXBlIF0gPSBbIGRpcnJ1bnMsIGRpZmYgXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICggbm9kZSA9PT0gZWxlbSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBJbmNvcnBvcmF0ZSB0aGUgb2Zmc2V0LCB0aGVuIGNoZWNrIGFnYWluc3QgY3ljbGUgc2l6ZVxuXHRcdFx0XHRcdFx0ZGlmZiAtPSBsYXN0O1xuXHRcdFx0XHRcdFx0cmV0dXJuIGRpZmYgPT09IGZpcnN0IHx8ICggZGlmZiAlIGZpcnN0ID09PSAwICYmIGRpZmYgLyBmaXJzdCA+PSAwICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRcIlBTRVVET1wiOiBmdW5jdGlvbiggcHNldWRvLCBhcmd1bWVudCApIHtcblx0XHRcdC8vIHBzZXVkby1jbGFzcyBuYW1lcyBhcmUgY2FzZS1pbnNlbnNpdGl2ZVxuXHRcdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNwc2V1ZG8tY2xhc3Nlc1xuXHRcdFx0Ly8gUHJpb3JpdGl6ZSBieSBjYXNlIHNlbnNpdGl2aXR5IGluIGNhc2UgY3VzdG9tIHBzZXVkb3MgYXJlIGFkZGVkIHdpdGggdXBwZXJjYXNlIGxldHRlcnNcblx0XHRcdC8vIFJlbWVtYmVyIHRoYXQgc2V0RmlsdGVycyBpbmhlcml0cyBmcm9tIHBzZXVkb3Ncblx0XHRcdHZhciBhcmdzLFxuXHRcdFx0XHRmbiA9IEV4cHIucHNldWRvc1sgcHNldWRvIF0gfHwgRXhwci5zZXRGaWx0ZXJzWyBwc2V1ZG8udG9Mb3dlckNhc2UoKSBdIHx8XG5cdFx0XHRcdFx0U2l6emxlLmVycm9yKCBcInVuc3VwcG9ydGVkIHBzZXVkbzogXCIgKyBwc2V1ZG8gKTtcblxuXHRcdFx0Ly8gVGhlIHVzZXIgbWF5IHVzZSBjcmVhdGVQc2V1ZG8gdG8gaW5kaWNhdGUgdGhhdFxuXHRcdFx0Ly8gYXJndW1lbnRzIGFyZSBuZWVkZWQgdG8gY3JlYXRlIHRoZSBmaWx0ZXIgZnVuY3Rpb25cblx0XHRcdC8vIGp1c3QgYXMgU2l6emxlIGRvZXNcblx0XHRcdGlmICggZm5bIGV4cGFuZG8gXSApIHtcblx0XHRcdFx0cmV0dXJuIGZuKCBhcmd1bWVudCApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBCdXQgbWFpbnRhaW4gc3VwcG9ydCBmb3Igb2xkIHNpZ25hdHVyZXNcblx0XHRcdGlmICggZm4ubGVuZ3RoID4gMSApIHtcblx0XHRcdFx0YXJncyA9IFsgcHNldWRvLCBwc2V1ZG8sIFwiXCIsIGFyZ3VtZW50IF07XG5cdFx0XHRcdHJldHVybiBFeHByLnNldEZpbHRlcnMuaGFzT3duUHJvcGVydHkoIHBzZXVkby50b0xvd2VyQ2FzZSgpICkgP1xuXHRcdFx0XHRcdG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VlZCwgbWF0Y2hlcyApIHtcblx0XHRcdFx0XHRcdHZhciBpZHgsXG5cdFx0XHRcdFx0XHRcdG1hdGNoZWQgPSBmbiggc2VlZCwgYXJndW1lbnQgKSxcblx0XHRcdFx0XHRcdFx0aSA9IG1hdGNoZWQubGVuZ3RoO1xuXHRcdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRcdGlkeCA9IGluZGV4T2YoIHNlZWQsIG1hdGNoZWRbaV0gKTtcblx0XHRcdFx0XHRcdFx0c2VlZFsgaWR4IF0gPSAhKCBtYXRjaGVzWyBpZHggXSA9IG1hdGNoZWRbaV0gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KSA6XG5cdFx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4oIGVsZW0sIDAsIGFyZ3MgKTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZm47XG5cdFx0fVxuXHR9LFxuXG5cdHBzZXVkb3M6IHtcblx0XHQvLyBQb3RlbnRpYWxseSBjb21wbGV4IHBzZXVkb3Ncblx0XHRcIm5vdFwiOiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdFx0Ly8gVHJpbSB0aGUgc2VsZWN0b3IgcGFzc2VkIHRvIGNvbXBpbGVcblx0XHRcdC8vIHRvIGF2b2lkIHRyZWF0aW5nIGxlYWRpbmcgYW5kIHRyYWlsaW5nXG5cdFx0XHQvLyBzcGFjZXMgYXMgY29tYmluYXRvcnNcblx0XHRcdHZhciBpbnB1dCA9IFtdLFxuXHRcdFx0XHRyZXN1bHRzID0gW10sXG5cdFx0XHRcdG1hdGNoZXIgPSBjb21waWxlKCBzZWxlY3Rvci5yZXBsYWNlKCBydHJpbSwgXCIkMVwiICkgKTtcblxuXHRcdFx0cmV0dXJuIG1hdGNoZXJbIGV4cGFuZG8gXSA/XG5cdFx0XHRcdG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VlZCwgbWF0Y2hlcywgY29udGV4dCwgeG1sICkge1xuXHRcdFx0XHRcdHZhciBlbGVtLFxuXHRcdFx0XHRcdFx0dW5tYXRjaGVkID0gbWF0Y2hlciggc2VlZCwgbnVsbCwgeG1sLCBbXSApLFxuXHRcdFx0XHRcdFx0aSA9IHNlZWQubGVuZ3RoO1xuXG5cdFx0XHRcdFx0Ly8gTWF0Y2ggZWxlbWVudHMgdW5tYXRjaGVkIGJ5IGBtYXRjaGVyYFxuXHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoZWxlbSA9IHVubWF0Y2hlZFtpXSkgKSB7XG5cdFx0XHRcdFx0XHRcdHNlZWRbaV0gPSAhKG1hdGNoZXNbaV0gPSBlbGVtKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pIDpcblx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdFx0XHRpbnB1dFswXSA9IGVsZW07XG5cdFx0XHRcdFx0bWF0Y2hlciggaW5wdXQsIG51bGwsIHhtbCwgcmVzdWx0cyApO1xuXHRcdFx0XHRcdC8vIERvbid0IGtlZXAgdGhlIGVsZW1lbnQgKGlzc3VlICMyOTkpXG5cdFx0XHRcdFx0aW5wdXRbMF0gPSBudWxsO1xuXHRcdFx0XHRcdHJldHVybiAhcmVzdWx0cy5wb3AoKTtcblx0XHRcdFx0fTtcblx0XHR9KSxcblxuXHRcdFwiaGFzXCI6IG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHJldHVybiBTaXp6bGUoIHNlbGVjdG9yLCBlbGVtICkubGVuZ3RoID4gMDtcblx0XHRcdH07XG5cdFx0fSksXG5cblx0XHRcImNvbnRhaW5zXCI6IG1hcmtGdW5jdGlvbihmdW5jdGlvbiggdGV4dCApIHtcblx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHJldHVybiAoIGVsZW0udGV4dENvbnRlbnQgfHwgZWxlbS5pbm5lclRleHQgfHwgZ2V0VGV4dCggZWxlbSApICkuaW5kZXhPZiggdGV4dCApID4gLTE7XG5cdFx0XHR9O1xuXHRcdH0pLFxuXG5cdFx0Ly8gXCJXaGV0aGVyIGFuIGVsZW1lbnQgaXMgcmVwcmVzZW50ZWQgYnkgYSA6bGFuZygpIHNlbGVjdG9yXG5cdFx0Ly8gaXMgYmFzZWQgc29sZWx5IG9uIHRoZSBlbGVtZW50J3MgbGFuZ3VhZ2UgdmFsdWVcblx0XHQvLyBiZWluZyBlcXVhbCB0byB0aGUgaWRlbnRpZmllciBDLFxuXHRcdC8vIG9yIGJlZ2lubmluZyB3aXRoIHRoZSBpZGVudGlmaWVyIEMgaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgXCItXCIuXG5cdFx0Ly8gVGhlIG1hdGNoaW5nIG9mIEMgYWdhaW5zdCB0aGUgZWxlbWVudCdzIGxhbmd1YWdlIHZhbHVlIGlzIHBlcmZvcm1lZCBjYXNlLWluc2Vuc2l0aXZlbHkuXG5cdFx0Ly8gVGhlIGlkZW50aWZpZXIgQyBkb2VzIG5vdCBoYXZlIHRvIGJlIGEgdmFsaWQgbGFuZ3VhZ2UgbmFtZS5cIlxuXHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jbGFuZy1wc2V1ZG9cblx0XHRcImxhbmdcIjogbWFya0Z1bmN0aW9uKCBmdW5jdGlvbiggbGFuZyApIHtcblx0XHRcdC8vIGxhbmcgdmFsdWUgbXVzdCBiZSBhIHZhbGlkIGlkZW50aWZpZXJcblx0XHRcdGlmICggIXJpZGVudGlmaWVyLnRlc3QobGFuZyB8fCBcIlwiKSApIHtcblx0XHRcdFx0U2l6emxlLmVycm9yKCBcInVuc3VwcG9ydGVkIGxhbmc6IFwiICsgbGFuZyApO1xuXHRcdFx0fVxuXHRcdFx0bGFuZyA9IGxhbmcucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHR2YXIgZWxlbUxhbmc7XG5cdFx0XHRcdGRvIHtcblx0XHRcdFx0XHRpZiAoIChlbGVtTGFuZyA9IGRvY3VtZW50SXNIVE1MID9cblx0XHRcdFx0XHRcdGVsZW0ubGFuZyA6XG5cdFx0XHRcdFx0XHRlbGVtLmdldEF0dHJpYnV0ZShcInhtbDpsYW5nXCIpIHx8IGVsZW0uZ2V0QXR0cmlidXRlKFwibGFuZ1wiKSkgKSB7XG5cblx0XHRcdFx0XHRcdGVsZW1MYW5nID0gZWxlbUxhbmcudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtTGFuZyA9PT0gbGFuZyB8fCBlbGVtTGFuZy5pbmRleE9mKCBsYW5nICsgXCItXCIgKSA9PT0gMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gd2hpbGUgKCAoZWxlbSA9IGVsZW0ucGFyZW50Tm9kZSkgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9O1xuXHRcdH0pLFxuXG5cdFx0Ly8gTWlzY2VsbGFuZW91c1xuXHRcdFwidGFyZ2V0XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0dmFyIGhhc2ggPSB3aW5kb3cubG9jYXRpb24gJiYgd2luZG93LmxvY2F0aW9uLmhhc2g7XG5cdFx0XHRyZXR1cm4gaGFzaCAmJiBoYXNoLnNsaWNlKCAxICkgPT09IGVsZW0uaWQ7XG5cdFx0fSxcblxuXHRcdFwicm9vdFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtID09PSBkb2NFbGVtO1xuXHRcdH0sXG5cblx0XHRcImZvY3VzXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0gPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgKCFkb2N1bWVudC5oYXNGb2N1cyB8fCBkb2N1bWVudC5oYXNGb2N1cygpKSAmJiAhIShlbGVtLnR5cGUgfHwgZWxlbS5ocmVmIHx8IH5lbGVtLnRhYkluZGV4KTtcblx0XHR9LFxuXG5cdFx0Ly8gQm9vbGVhbiBwcm9wZXJ0aWVzXG5cdFx0XCJlbmFibGVkXCI6IGNyZWF0ZURpc2FibGVkUHNldWRvKCBmYWxzZSApLFxuXHRcdFwiZGlzYWJsZWRcIjogY3JlYXRlRGlzYWJsZWRQc2V1ZG8oIHRydWUgKSxcblxuXHRcdFwiY2hlY2tlZFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdC8vIEluIENTUzMsIDpjaGVja2VkIHNob3VsZCByZXR1cm4gYm90aCBjaGVja2VkIGFuZCBzZWxlY3RlZCBlbGVtZW50c1xuXHRcdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAxMS9SRUMtY3NzMy1zZWxlY3RvcnMtMjAxMTA5MjkvI2NoZWNrZWRcblx0XHRcdHZhciBub2RlTmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdHJldHVybiAobm9kZU5hbWUgPT09IFwiaW5wdXRcIiAmJiAhIWVsZW0uY2hlY2tlZCkgfHwgKG5vZGVOYW1lID09PSBcIm9wdGlvblwiICYmICEhZWxlbS5zZWxlY3RlZCk7XG5cdFx0fSxcblxuXHRcdFwic2VsZWN0ZWRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHQvLyBBY2Nlc3NpbmcgdGhpcyBwcm9wZXJ0eSBtYWtlcyBzZWxlY3RlZC1ieS1kZWZhdWx0XG5cdFx0XHQvLyBvcHRpb25zIGluIFNhZmFyaSB3b3JrIHByb3Blcmx5XG5cdFx0XHRpZiAoIGVsZW0ucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0ZWxlbS5wYXJlbnROb2RlLnNlbGVjdGVkSW5kZXg7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBlbGVtLnNlbGVjdGVkID09PSB0cnVlO1xuXHRcdH0sXG5cblx0XHQvLyBDb250ZW50c1xuXHRcdFwiZW1wdHlcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI2VtcHR5LXBzZXVkb1xuXHRcdFx0Ly8gOmVtcHR5IGlzIG5lZ2F0ZWQgYnkgZWxlbWVudCAoMSkgb3IgY29udGVudCBub2RlcyAodGV4dDogMzsgY2RhdGE6IDQ7IGVudGl0eSByZWY6IDUpLFxuXHRcdFx0Ly8gICBidXQgbm90IGJ5IG90aGVycyAoY29tbWVudDogODsgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbjogNzsgZXRjLilcblx0XHRcdC8vIG5vZGVUeXBlIDwgNiB3b3JrcyBiZWNhdXNlIGF0dHJpYnV0ZXMgKDIpIGRvIG5vdCBhcHBlYXIgYXMgY2hpbGRyZW5cblx0XHRcdGZvciAoIGVsZW0gPSBlbGVtLmZpcnN0Q2hpbGQ7IGVsZW07IGVsZW0gPSBlbGVtLm5leHRTaWJsaW5nICkge1xuXHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPCA2ICkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblxuXHRcdFwicGFyZW50XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuICFFeHByLnBzZXVkb3NbXCJlbXB0eVwiXSggZWxlbSApO1xuXHRcdH0sXG5cblx0XHQvLyBFbGVtZW50L2lucHV0IHR5cGVzXG5cdFx0XCJoZWFkZXJcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gcmhlYWRlci50ZXN0KCBlbGVtLm5vZGVOYW1lICk7XG5cdFx0fSxcblxuXHRcdFwiaW5wdXRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gcmlucHV0cy50ZXN0KCBlbGVtLm5vZGVOYW1lICk7XG5cdFx0fSxcblxuXHRcdFwiYnV0dG9uXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0dmFyIG5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyZXR1cm4gbmFtZSA9PT0gXCJpbnB1dFwiICYmIGVsZW0udHlwZSA9PT0gXCJidXR0b25cIiB8fCBuYW1lID09PSBcImJ1dHRvblwiO1xuXHRcdH0sXG5cblx0XHRcInRleHRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHR2YXIgYXR0cjtcblx0XHRcdHJldHVybiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaW5wdXRcIiAmJlxuXHRcdFx0XHRlbGVtLnR5cGUgPT09IFwidGV4dFwiICYmXG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogSUU8OFxuXHRcdFx0XHQvLyBOZXcgSFRNTDUgYXR0cmlidXRlIHZhbHVlcyAoZS5nLiwgXCJzZWFyY2hcIikgYXBwZWFyIHdpdGggZWxlbS50eXBlID09PSBcInRleHRcIlxuXHRcdFx0XHQoIChhdHRyID0gZWxlbS5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpKSA9PSBudWxsIHx8IGF0dHIudG9Mb3dlckNhc2UoKSA9PT0gXCJ0ZXh0XCIgKTtcblx0XHR9LFxuXG5cdFx0Ly8gUG9zaXRpb24taW4tY29sbGVjdGlvblxuXHRcdFwiZmlyc3RcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBbIDAgXTtcblx0XHR9KSxcblxuXHRcdFwibGFzdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcblx0XHRcdHJldHVybiBbIGxlbmd0aCAtIDEgXTtcblx0XHR9KSxcblxuXHRcdFwiZXFcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGgsIGFyZ3VtZW50ICkge1xuXHRcdFx0cmV0dXJuIFsgYXJndW1lbnQgPCAwID8gYXJndW1lbnQgKyBsZW5ndGggOiBhcmd1bWVudCBdO1xuXHRcdH0pLFxuXG5cdFx0XCJldmVuXCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoICkge1xuXHRcdFx0dmFyIGkgPSAwO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpICs9IDIgKSB7XG5cdFx0XHRcdG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF0Y2hJbmRleGVzO1xuXHRcdH0pLFxuXG5cdFx0XCJvZGRcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGggKSB7XG5cdFx0XHR2YXIgaSA9IDE7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkgKz0gMiApIHtcblx0XHRcdFx0bWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYXRjaEluZGV4ZXM7XG5cdFx0fSksXG5cblx0XHRcImx0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoLCBhcmd1bWVudCApIHtcblx0XHRcdHZhciBpID0gYXJndW1lbnQgPCAwID8gYXJndW1lbnQgKyBsZW5ndGggOiBhcmd1bWVudDtcblx0XHRcdGZvciAoIDsgLS1pID49IDA7ICkge1xuXHRcdFx0XHRtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1hdGNoSW5kZXhlcztcblx0XHR9KSxcblxuXHRcdFwiZ3RcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGgsIGFyZ3VtZW50ICkge1xuXHRcdFx0dmFyIGkgPSBhcmd1bWVudCA8IDAgPyBhcmd1bWVudCArIGxlbmd0aCA6IGFyZ3VtZW50O1xuXHRcdFx0Zm9yICggOyArK2kgPCBsZW5ndGg7ICkge1xuXHRcdFx0XHRtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1hdGNoSW5kZXhlcztcblx0XHR9KVxuXHR9XG59O1xuXG5FeHByLnBzZXVkb3NbXCJudGhcIl0gPSBFeHByLnBzZXVkb3NbXCJlcVwiXTtcblxuLy8gQWRkIGJ1dHRvbi9pbnB1dCB0eXBlIHBzZXVkb3NcbmZvciAoIGkgaW4geyByYWRpbzogdHJ1ZSwgY2hlY2tib3g6IHRydWUsIGZpbGU6IHRydWUsIHBhc3N3b3JkOiB0cnVlLCBpbWFnZTogdHJ1ZSB9ICkge1xuXHRFeHByLnBzZXVkb3NbIGkgXSA9IGNyZWF0ZUlucHV0UHNldWRvKCBpICk7XG59XG5mb3IgKCBpIGluIHsgc3VibWl0OiB0cnVlLCByZXNldDogdHJ1ZSB9ICkge1xuXHRFeHByLnBzZXVkb3NbIGkgXSA9IGNyZWF0ZUJ1dHRvblBzZXVkbyggaSApO1xufVxuXG4vLyBFYXN5IEFQSSBmb3IgY3JlYXRpbmcgbmV3IHNldEZpbHRlcnNcbmZ1bmN0aW9uIHNldEZpbHRlcnMoKSB7fVxuc2V0RmlsdGVycy5wcm90b3R5cGUgPSBFeHByLmZpbHRlcnMgPSBFeHByLnBzZXVkb3M7XG5FeHByLnNldEZpbHRlcnMgPSBuZXcgc2V0RmlsdGVycygpO1xuXG50b2tlbml6ZSA9IFNpenpsZS50b2tlbml6ZSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgcGFyc2VPbmx5ICkge1xuXHR2YXIgbWF0Y2hlZCwgbWF0Y2gsIHRva2VucywgdHlwZSxcblx0XHRzb0ZhciwgZ3JvdXBzLCBwcmVGaWx0ZXJzLFxuXHRcdGNhY2hlZCA9IHRva2VuQ2FjaGVbIHNlbGVjdG9yICsgXCIgXCIgXTtcblxuXHRpZiAoIGNhY2hlZCApIHtcblx0XHRyZXR1cm4gcGFyc2VPbmx5ID8gMCA6IGNhY2hlZC5zbGljZSggMCApO1xuXHR9XG5cblx0c29GYXIgPSBzZWxlY3Rvcjtcblx0Z3JvdXBzID0gW107XG5cdHByZUZpbHRlcnMgPSBFeHByLnByZUZpbHRlcjtcblxuXHR3aGlsZSAoIHNvRmFyICkge1xuXG5cdFx0Ly8gQ29tbWEgYW5kIGZpcnN0IHJ1blxuXHRcdGlmICggIW1hdGNoZWQgfHwgKG1hdGNoID0gcmNvbW1hLmV4ZWMoIHNvRmFyICkpICkge1xuXHRcdFx0aWYgKCBtYXRjaCApIHtcblx0XHRcdFx0Ly8gRG9uJ3QgY29uc3VtZSB0cmFpbGluZyBjb21tYXMgYXMgdmFsaWRcblx0XHRcdFx0c29GYXIgPSBzb0Zhci5zbGljZSggbWF0Y2hbMF0ubGVuZ3RoICkgfHwgc29GYXI7XG5cdFx0XHR9XG5cdFx0XHRncm91cHMucHVzaCggKHRva2VucyA9IFtdKSApO1xuXHRcdH1cblxuXHRcdG1hdGNoZWQgPSBmYWxzZTtcblxuXHRcdC8vIENvbWJpbmF0b3JzXG5cdFx0aWYgKCAobWF0Y2ggPSByY29tYmluYXRvcnMuZXhlYyggc29GYXIgKSkgKSB7XG5cdFx0XHRtYXRjaGVkID0gbWF0Y2guc2hpZnQoKTtcblx0XHRcdHRva2Vucy5wdXNoKHtcblx0XHRcdFx0dmFsdWU6IG1hdGNoZWQsXG5cdFx0XHRcdC8vIENhc3QgZGVzY2VuZGFudCBjb21iaW5hdG9ycyB0byBzcGFjZVxuXHRcdFx0XHR0eXBlOiBtYXRjaFswXS5yZXBsYWNlKCBydHJpbSwgXCIgXCIgKVxuXHRcdFx0fSk7XG5cdFx0XHRzb0ZhciA9IHNvRmFyLnNsaWNlKCBtYXRjaGVkLmxlbmd0aCApO1xuXHRcdH1cblxuXHRcdC8vIEZpbHRlcnNcblx0XHRmb3IgKCB0eXBlIGluIEV4cHIuZmlsdGVyICkge1xuXHRcdFx0aWYgKCAobWF0Y2ggPSBtYXRjaEV4cHJbIHR5cGUgXS5leGVjKCBzb0ZhciApKSAmJiAoIXByZUZpbHRlcnNbIHR5cGUgXSB8fFxuXHRcdFx0XHQobWF0Y2ggPSBwcmVGaWx0ZXJzWyB0eXBlIF0oIG1hdGNoICkpKSApIHtcblx0XHRcdFx0bWF0Y2hlZCA9IG1hdGNoLnNoaWZ0KCk7XG5cdFx0XHRcdHRva2Vucy5wdXNoKHtcblx0XHRcdFx0XHR2YWx1ZTogbWF0Y2hlZCxcblx0XHRcdFx0XHR0eXBlOiB0eXBlLFxuXHRcdFx0XHRcdG1hdGNoZXM6IG1hdGNoXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzb0ZhciA9IHNvRmFyLnNsaWNlKCBtYXRjaGVkLmxlbmd0aCApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICggIW1hdGNoZWQgKSB7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIGxlbmd0aCBvZiB0aGUgaW52YWxpZCBleGNlc3Ncblx0Ly8gaWYgd2UncmUganVzdCBwYXJzaW5nXG5cdC8vIE90aGVyd2lzZSwgdGhyb3cgYW4gZXJyb3Igb3IgcmV0dXJuIHRva2Vuc1xuXHRyZXR1cm4gcGFyc2VPbmx5ID9cblx0XHRzb0Zhci5sZW5ndGggOlxuXHRcdHNvRmFyID9cblx0XHRcdFNpenpsZS5lcnJvciggc2VsZWN0b3IgKSA6XG5cdFx0XHQvLyBDYWNoZSB0aGUgdG9rZW5zXG5cdFx0XHR0b2tlbkNhY2hlKCBzZWxlY3RvciwgZ3JvdXBzICkuc2xpY2UoIDAgKTtcbn07XG5cbmZ1bmN0aW9uIHRvU2VsZWN0b3IoIHRva2VucyApIHtcblx0dmFyIGkgPSAwLFxuXHRcdGxlbiA9IHRva2Vucy5sZW5ndGgsXG5cdFx0c2VsZWN0b3IgPSBcIlwiO1xuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRzZWxlY3RvciArPSB0b2tlbnNbaV0udmFsdWU7XG5cdH1cblx0cmV0dXJuIHNlbGVjdG9yO1xufVxuXG5mdW5jdGlvbiBhZGRDb21iaW5hdG9yKCBtYXRjaGVyLCBjb21iaW5hdG9yLCBiYXNlICkge1xuXHR2YXIgZGlyID0gY29tYmluYXRvci5kaXIsXG5cdFx0c2tpcCA9IGNvbWJpbmF0b3IubmV4dCxcblx0XHRrZXkgPSBza2lwIHx8IGRpcixcblx0XHRjaGVja05vbkVsZW1lbnRzID0gYmFzZSAmJiBrZXkgPT09IFwicGFyZW50Tm9kZVwiLFxuXHRcdGRvbmVOYW1lID0gZG9uZSsrO1xuXG5cdHJldHVybiBjb21iaW5hdG9yLmZpcnN0ID9cblx0XHQvLyBDaGVjayBhZ2FpbnN0IGNsb3Nlc3QgYW5jZXN0b3IvcHJlY2VkaW5nIGVsZW1lbnRcblx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0d2hpbGUgKCAoZWxlbSA9IGVsZW1bIGRpciBdKSApIHtcblx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGNoZWNrTm9uRWxlbWVudHMgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSA6XG5cblx0XHQvLyBDaGVjayBhZ2FpbnN0IGFsbCBhbmNlc3Rvci9wcmVjZWRpbmcgZWxlbWVudHNcblx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0dmFyIG9sZENhY2hlLCB1bmlxdWVDYWNoZSwgb3V0ZXJDYWNoZSxcblx0XHRcdFx0bmV3Q2FjaGUgPSBbIGRpcnJ1bnMsIGRvbmVOYW1lIF07XG5cblx0XHRcdC8vIFdlIGNhbid0IHNldCBhcmJpdHJhcnkgZGF0YSBvbiBYTUwgbm9kZXMsIHNvIHRoZXkgZG9uJ3QgYmVuZWZpdCBmcm9tIGNvbWJpbmF0b3IgY2FjaGluZ1xuXHRcdFx0aWYgKCB4bWwgKSB7XG5cdFx0XHRcdHdoaWxlICggKGVsZW0gPSBlbGVtWyBkaXIgXSkgKSB7XG5cdFx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGNoZWNrTm9uRWxlbWVudHMgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHdoaWxlICggKGVsZW0gPSBlbGVtWyBkaXIgXSkgKSB7XG5cdFx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGNoZWNrTm9uRWxlbWVudHMgKSB7XG5cdFx0XHRcdFx0XHRvdXRlckNhY2hlID0gZWxlbVsgZXhwYW5kbyBdIHx8IChlbGVtWyBleHBhbmRvIF0gPSB7fSk7XG5cblx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw5IG9ubHlcblx0XHRcdFx0XHRcdC8vIERlZmVuZCBhZ2FpbnN0IGNsb25lZCBhdHRyb3BlcnRpZXMgKGpRdWVyeSBnaC0xNzA5KVxuXHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGUgPSBvdXRlckNhY2hlWyBlbGVtLnVuaXF1ZUlEIF0gfHwgKG91dGVyQ2FjaGVbIGVsZW0udW5pcXVlSUQgXSA9IHt9KTtcblxuXHRcdFx0XHRcdFx0aWYgKCBza2lwICYmIHNraXAgPT09IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSApIHtcblx0XHRcdFx0XHRcdFx0ZWxlbSA9IGVsZW1bIGRpciBdIHx8IGVsZW07XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCAob2xkQ2FjaGUgPSB1bmlxdWVDYWNoZVsga2V5IF0pICYmXG5cdFx0XHRcdFx0XHRcdG9sZENhY2hlWyAwIF0gPT09IGRpcnJ1bnMgJiYgb2xkQ2FjaGVbIDEgXSA9PT0gZG9uZU5hbWUgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gQXNzaWduIHRvIG5ld0NhY2hlIHNvIHJlc3VsdHMgYmFjay1wcm9wYWdhdGUgdG8gcHJldmlvdXMgZWxlbWVudHNcblx0XHRcdFx0XHRcdFx0cmV0dXJuIChuZXdDYWNoZVsgMiBdID0gb2xkQ2FjaGVbIDIgXSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQvLyBSZXVzZSBuZXdjYWNoZSBzbyByZXN1bHRzIGJhY2stcHJvcGFnYXRlIHRvIHByZXZpb3VzIGVsZW1lbnRzXG5cdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlWyBrZXkgXSA9IG5ld0NhY2hlO1xuXG5cdFx0XHRcdFx0XHRcdC8vIEEgbWF0Y2ggbWVhbnMgd2UncmUgZG9uZTsgYSBmYWlsIG1lYW5zIHdlIGhhdmUgdG8ga2VlcCBjaGVja2luZ1xuXHRcdFx0XHRcdFx0XHRpZiAoIChuZXdDYWNoZVsgMiBdID0gbWF0Y2hlciggZWxlbSwgY29udGV4dCwgeG1sICkpICkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcbn1cblxuZnVuY3Rpb24gZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICkge1xuXHRyZXR1cm4gbWF0Y2hlcnMubGVuZ3RoID4gMSA/XG5cdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdHZhciBpID0gbWF0Y2hlcnMubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdGlmICggIW1hdGNoZXJzW2ldKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gOlxuXHRcdG1hdGNoZXJzWzBdO1xufVxuXG5mdW5jdGlvbiBtdWx0aXBsZUNvbnRleHRzKCBzZWxlY3RvciwgY29udGV4dHMsIHJlc3VsdHMgKSB7XG5cdHZhciBpID0gMCxcblx0XHRsZW4gPSBjb250ZXh0cy5sZW5ndGg7XG5cdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFNpenpsZSggc2VsZWN0b3IsIGNvbnRleHRzW2ldLCByZXN1bHRzICk7XG5cdH1cblx0cmV0dXJuIHJlc3VsdHM7XG59XG5cbmZ1bmN0aW9uIGNvbmRlbnNlKCB1bm1hdGNoZWQsIG1hcCwgZmlsdGVyLCBjb250ZXh0LCB4bWwgKSB7XG5cdHZhciBlbGVtLFxuXHRcdG5ld1VubWF0Y2hlZCA9IFtdLFxuXHRcdGkgPSAwLFxuXHRcdGxlbiA9IHVubWF0Y2hlZC5sZW5ndGgsXG5cdFx0bWFwcGVkID0gbWFwICE9IG51bGw7XG5cblx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0aWYgKCAoZWxlbSA9IHVubWF0Y2hlZFtpXSkgKSB7XG5cdFx0XHRpZiAoICFmaWx0ZXIgfHwgZmlsdGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcblx0XHRcdFx0bmV3VW5tYXRjaGVkLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0aWYgKCBtYXBwZWQgKSB7XG5cdFx0XHRcdFx0bWFwLnB1c2goIGkgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBuZXdVbm1hdGNoZWQ7XG59XG5cbmZ1bmN0aW9uIHNldE1hdGNoZXIoIHByZUZpbHRlciwgc2VsZWN0b3IsIG1hdGNoZXIsIHBvc3RGaWx0ZXIsIHBvc3RGaW5kZXIsIHBvc3RTZWxlY3RvciApIHtcblx0aWYgKCBwb3N0RmlsdGVyICYmICFwb3N0RmlsdGVyWyBleHBhbmRvIF0gKSB7XG5cdFx0cG9zdEZpbHRlciA9IHNldE1hdGNoZXIoIHBvc3RGaWx0ZXIgKTtcblx0fVxuXHRpZiAoIHBvc3RGaW5kZXIgJiYgIXBvc3RGaW5kZXJbIGV4cGFuZG8gXSApIHtcblx0XHRwb3N0RmluZGVyID0gc2V0TWF0Y2hlciggcG9zdEZpbmRlciwgcG9zdFNlbGVjdG9yICk7XG5cdH1cblx0cmV0dXJuIG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VlZCwgcmVzdWx0cywgY29udGV4dCwgeG1sICkge1xuXHRcdHZhciB0ZW1wLCBpLCBlbGVtLFxuXHRcdFx0cHJlTWFwID0gW10sXG5cdFx0XHRwb3N0TWFwID0gW10sXG5cdFx0XHRwcmVleGlzdGluZyA9IHJlc3VsdHMubGVuZ3RoLFxuXG5cdFx0XHQvLyBHZXQgaW5pdGlhbCBlbGVtZW50cyBmcm9tIHNlZWQgb3IgY29udGV4dFxuXHRcdFx0ZWxlbXMgPSBzZWVkIHx8IG11bHRpcGxlQ29udGV4dHMoIHNlbGVjdG9yIHx8IFwiKlwiLCBjb250ZXh0Lm5vZGVUeXBlID8gWyBjb250ZXh0IF0gOiBjb250ZXh0LCBbXSApLFxuXG5cdFx0XHQvLyBQcmVmaWx0ZXIgdG8gZ2V0IG1hdGNoZXIgaW5wdXQsIHByZXNlcnZpbmcgYSBtYXAgZm9yIHNlZWQtcmVzdWx0cyBzeW5jaHJvbml6YXRpb25cblx0XHRcdG1hdGNoZXJJbiA9IHByZUZpbHRlciAmJiAoIHNlZWQgfHwgIXNlbGVjdG9yICkgP1xuXHRcdFx0XHRjb25kZW5zZSggZWxlbXMsIHByZU1hcCwgcHJlRmlsdGVyLCBjb250ZXh0LCB4bWwgKSA6XG5cdFx0XHRcdGVsZW1zLFxuXG5cdFx0XHRtYXRjaGVyT3V0ID0gbWF0Y2hlciA/XG5cdFx0XHRcdC8vIElmIHdlIGhhdmUgYSBwb3N0RmluZGVyLCBvciBmaWx0ZXJlZCBzZWVkLCBvciBub24tc2VlZCBwb3N0RmlsdGVyIG9yIHByZWV4aXN0aW5nIHJlc3VsdHMsXG5cdFx0XHRcdHBvc3RGaW5kZXIgfHwgKCBzZWVkID8gcHJlRmlsdGVyIDogcHJlZXhpc3RpbmcgfHwgcG9zdEZpbHRlciApID9cblxuXHRcdFx0XHRcdC8vIC4uLmludGVybWVkaWF0ZSBwcm9jZXNzaW5nIGlzIG5lY2Vzc2FyeVxuXHRcdFx0XHRcdFtdIDpcblxuXHRcdFx0XHRcdC8vIC4uLm90aGVyd2lzZSB1c2UgcmVzdWx0cyBkaXJlY3RseVxuXHRcdFx0XHRcdHJlc3VsdHMgOlxuXHRcdFx0XHRtYXRjaGVySW47XG5cblx0XHQvLyBGaW5kIHByaW1hcnkgbWF0Y2hlc1xuXHRcdGlmICggbWF0Y2hlciApIHtcblx0XHRcdG1hdGNoZXIoIG1hdGNoZXJJbiwgbWF0Y2hlck91dCwgY29udGV4dCwgeG1sICk7XG5cdFx0fVxuXG5cdFx0Ly8gQXBwbHkgcG9zdEZpbHRlclxuXHRcdGlmICggcG9zdEZpbHRlciApIHtcblx0XHRcdHRlbXAgPSBjb25kZW5zZSggbWF0Y2hlck91dCwgcG9zdE1hcCApO1xuXHRcdFx0cG9zdEZpbHRlciggdGVtcCwgW10sIGNvbnRleHQsIHhtbCApO1xuXG5cdFx0XHQvLyBVbi1tYXRjaCBmYWlsaW5nIGVsZW1lbnRzIGJ5IG1vdmluZyB0aGVtIGJhY2sgdG8gbWF0Y2hlckluXG5cdFx0XHRpID0gdGVtcC5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0aWYgKCAoZWxlbSA9IHRlbXBbaV0pICkge1xuXHRcdFx0XHRcdG1hdGNoZXJPdXRbIHBvc3RNYXBbaV0gXSA9ICEobWF0Y2hlckluWyBwb3N0TWFwW2ldIF0gPSBlbGVtKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICggc2VlZCApIHtcblx0XHRcdGlmICggcG9zdEZpbmRlciB8fCBwcmVGaWx0ZXIgKSB7XG5cdFx0XHRcdGlmICggcG9zdEZpbmRlciApIHtcblx0XHRcdFx0XHQvLyBHZXQgdGhlIGZpbmFsIG1hdGNoZXJPdXQgYnkgY29uZGVuc2luZyB0aGlzIGludGVybWVkaWF0ZSBpbnRvIHBvc3RGaW5kZXIgY29udGV4dHNcblx0XHRcdFx0XHR0ZW1wID0gW107XG5cdFx0XHRcdFx0aSA9IG1hdGNoZXJPdXQubGVuZ3RoO1xuXHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoZWxlbSA9IG1hdGNoZXJPdXRbaV0pICkge1xuXHRcdFx0XHRcdFx0XHQvLyBSZXN0b3JlIG1hdGNoZXJJbiBzaW5jZSBlbGVtIGlzIG5vdCB5ZXQgYSBmaW5hbCBtYXRjaFxuXHRcdFx0XHRcdFx0XHR0ZW1wLnB1c2goIChtYXRjaGVySW5baV0gPSBlbGVtKSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwb3N0RmluZGVyKCBudWxsLCAobWF0Y2hlck91dCA9IFtdKSwgdGVtcCwgeG1sICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBNb3ZlIG1hdGNoZWQgZWxlbWVudHMgZnJvbSBzZWVkIHRvIHJlc3VsdHMgdG8ga2VlcCB0aGVtIHN5bmNocm9uaXplZFxuXHRcdFx0XHRpID0gbWF0Y2hlck91dC5sZW5ndGg7XG5cdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdGlmICggKGVsZW0gPSBtYXRjaGVyT3V0W2ldKSAmJlxuXHRcdFx0XHRcdFx0KHRlbXAgPSBwb3N0RmluZGVyID8gaW5kZXhPZiggc2VlZCwgZWxlbSApIDogcHJlTWFwW2ldKSA+IC0xICkge1xuXG5cdFx0XHRcdFx0XHRzZWVkW3RlbXBdID0gIShyZXN1bHRzW3RlbXBdID0gZWxlbSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHQvLyBBZGQgZWxlbWVudHMgdG8gcmVzdWx0cywgdGhyb3VnaCBwb3N0RmluZGVyIGlmIGRlZmluZWRcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWF0Y2hlck91dCA9IGNvbmRlbnNlKFxuXHRcdFx0XHRtYXRjaGVyT3V0ID09PSByZXN1bHRzID9cblx0XHRcdFx0XHRtYXRjaGVyT3V0LnNwbGljZSggcHJlZXhpc3RpbmcsIG1hdGNoZXJPdXQubGVuZ3RoICkgOlxuXHRcdFx0XHRcdG1hdGNoZXJPdXRcblx0XHRcdCk7XG5cdFx0XHRpZiAoIHBvc3RGaW5kZXIgKSB7XG5cdFx0XHRcdHBvc3RGaW5kZXIoIG51bGwsIHJlc3VsdHMsIG1hdGNoZXJPdXQsIHhtbCApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgbWF0Y2hlck91dCApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXJGcm9tVG9rZW5zKCB0b2tlbnMgKSB7XG5cdHZhciBjaGVja0NvbnRleHQsIG1hdGNoZXIsIGosXG5cdFx0bGVuID0gdG9rZW5zLmxlbmd0aCxcblx0XHRsZWFkaW5nUmVsYXRpdmUgPSBFeHByLnJlbGF0aXZlWyB0b2tlbnNbMF0udHlwZSBdLFxuXHRcdGltcGxpY2l0UmVsYXRpdmUgPSBsZWFkaW5nUmVsYXRpdmUgfHwgRXhwci5yZWxhdGl2ZVtcIiBcIl0sXG5cdFx0aSA9IGxlYWRpbmdSZWxhdGl2ZSA/IDEgOiAwLFxuXG5cdFx0Ly8gVGhlIGZvdW5kYXRpb25hbCBtYXRjaGVyIGVuc3VyZXMgdGhhdCBlbGVtZW50cyBhcmUgcmVhY2hhYmxlIGZyb20gdG9wLWxldmVsIGNvbnRleHQocylcblx0XHRtYXRjaENvbnRleHQgPSBhZGRDb21iaW5hdG9yKCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtID09PSBjaGVja0NvbnRleHQ7XG5cdFx0fSwgaW1wbGljaXRSZWxhdGl2ZSwgdHJ1ZSApLFxuXHRcdG1hdGNoQW55Q29udGV4dCA9IGFkZENvbWJpbmF0b3IoIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGluZGV4T2YoIGNoZWNrQ29udGV4dCwgZWxlbSApID4gLTE7XG5cdFx0fSwgaW1wbGljaXRSZWxhdGl2ZSwgdHJ1ZSApLFxuXHRcdG1hdGNoZXJzID0gWyBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0dmFyIHJldCA9ICggIWxlYWRpbmdSZWxhdGl2ZSAmJiAoIHhtbCB8fCBjb250ZXh0ICE9PSBvdXRlcm1vc3RDb250ZXh0ICkgKSB8fCAoXG5cdFx0XHRcdChjaGVja0NvbnRleHQgPSBjb250ZXh0KS5ub2RlVHlwZSA/XG5cdFx0XHRcdFx0bWF0Y2hDb250ZXh0KCBlbGVtLCBjb250ZXh0LCB4bWwgKSA6XG5cdFx0XHRcdFx0bWF0Y2hBbnlDb250ZXh0KCBlbGVtLCBjb250ZXh0LCB4bWwgKSApO1xuXHRcdFx0Ly8gQXZvaWQgaGFuZ2luZyBvbnRvIGVsZW1lbnQgKGlzc3VlICMyOTkpXG5cdFx0XHRjaGVja0NvbnRleHQgPSBudWxsO1xuXHRcdFx0cmV0dXJuIHJldDtcblx0XHR9IF07XG5cblx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0aWYgKCAobWF0Y2hlciA9IEV4cHIucmVsYXRpdmVbIHRva2Vuc1tpXS50eXBlIF0pICkge1xuXHRcdFx0bWF0Y2hlcnMgPSBbIGFkZENvbWJpbmF0b3IoZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICksIG1hdGNoZXIpIF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1hdGNoZXIgPSBFeHByLmZpbHRlclsgdG9rZW5zW2ldLnR5cGUgXS5hcHBseSggbnVsbCwgdG9rZW5zW2ldLm1hdGNoZXMgKTtcblxuXHRcdFx0Ly8gUmV0dXJuIHNwZWNpYWwgdXBvbiBzZWVpbmcgYSBwb3NpdGlvbmFsIG1hdGNoZXJcblx0XHRcdGlmICggbWF0Y2hlclsgZXhwYW5kbyBdICkge1xuXHRcdFx0XHQvLyBGaW5kIHRoZSBuZXh0IHJlbGF0aXZlIG9wZXJhdG9yIChpZiBhbnkpIGZvciBwcm9wZXIgaGFuZGxpbmdcblx0XHRcdFx0aiA9ICsraTtcblx0XHRcdFx0Zm9yICggOyBqIDwgbGVuOyBqKysgKSB7XG5cdFx0XHRcdFx0aWYgKCBFeHByLnJlbGF0aXZlWyB0b2tlbnNbal0udHlwZSBdICkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBzZXRNYXRjaGVyKFxuXHRcdFx0XHRcdGkgPiAxICYmIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApLFxuXHRcdFx0XHRcdGkgPiAxICYmIHRvU2VsZWN0b3IoXG5cdFx0XHRcdFx0XHQvLyBJZiB0aGUgcHJlY2VkaW5nIHRva2VuIHdhcyBhIGRlc2NlbmRhbnQgY29tYmluYXRvciwgaW5zZXJ0IGFuIGltcGxpY2l0IGFueS1lbGVtZW50IGAqYFxuXHRcdFx0XHRcdFx0dG9rZW5zLnNsaWNlKCAwLCBpIC0gMSApLmNvbmNhdCh7IHZhbHVlOiB0b2tlbnNbIGkgLSAyIF0udHlwZSA9PT0gXCIgXCIgPyBcIipcIiA6IFwiXCIgfSlcblx0XHRcdFx0XHQpLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSxcblx0XHRcdFx0XHRtYXRjaGVyLFxuXHRcdFx0XHRcdGkgPCBqICYmIG1hdGNoZXJGcm9tVG9rZW5zKCB0b2tlbnMuc2xpY2UoIGksIGogKSApLFxuXHRcdFx0XHRcdGogPCBsZW4gJiYgbWF0Y2hlckZyb21Ub2tlbnMoICh0b2tlbnMgPSB0b2tlbnMuc2xpY2UoIGogKSkgKSxcblx0XHRcdFx0XHRqIDwgbGVuICYmIHRvU2VsZWN0b3IoIHRva2VucyApXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRtYXRjaGVycy5wdXNoKCBtYXRjaGVyICk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMoIGVsZW1lbnRNYXRjaGVycywgc2V0TWF0Y2hlcnMgKSB7XG5cdHZhciBieVNldCA9IHNldE1hdGNoZXJzLmxlbmd0aCA+IDAsXG5cdFx0YnlFbGVtZW50ID0gZWxlbWVudE1hdGNoZXJzLmxlbmd0aCA+IDAsXG5cdFx0c3VwZXJNYXRjaGVyID0gZnVuY3Rpb24oIHNlZWQsIGNvbnRleHQsIHhtbCwgcmVzdWx0cywgb3V0ZXJtb3N0ICkge1xuXHRcdFx0dmFyIGVsZW0sIGosIG1hdGNoZXIsXG5cdFx0XHRcdG1hdGNoZWRDb3VudCA9IDAsXG5cdFx0XHRcdGkgPSBcIjBcIixcblx0XHRcdFx0dW5tYXRjaGVkID0gc2VlZCAmJiBbXSxcblx0XHRcdFx0c2V0TWF0Y2hlZCA9IFtdLFxuXHRcdFx0XHRjb250ZXh0QmFja3VwID0gb3V0ZXJtb3N0Q29udGV4dCxcblx0XHRcdFx0Ly8gV2UgbXVzdCBhbHdheXMgaGF2ZSBlaXRoZXIgc2VlZCBlbGVtZW50cyBvciBvdXRlcm1vc3QgY29udGV4dFxuXHRcdFx0XHRlbGVtcyA9IHNlZWQgfHwgYnlFbGVtZW50ICYmIEV4cHIuZmluZFtcIlRBR1wiXSggXCIqXCIsIG91dGVybW9zdCApLFxuXHRcdFx0XHQvLyBVc2UgaW50ZWdlciBkaXJydW5zIGlmZiB0aGlzIGlzIHRoZSBvdXRlcm1vc3QgbWF0Y2hlclxuXHRcdFx0XHRkaXJydW5zVW5pcXVlID0gKGRpcnJ1bnMgKz0gY29udGV4dEJhY2t1cCA9PSBudWxsID8gMSA6IE1hdGgucmFuZG9tKCkgfHwgMC4xKSxcblx0XHRcdFx0bGVuID0gZWxlbXMubGVuZ3RoO1xuXG5cdFx0XHRpZiAoIG91dGVybW9zdCApIHtcblx0XHRcdFx0b3V0ZXJtb3N0Q29udGV4dCA9IGNvbnRleHQgPT09IGRvY3VtZW50IHx8IGNvbnRleHQgfHwgb3V0ZXJtb3N0O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgZWxlbWVudHMgcGFzc2luZyBlbGVtZW50TWF0Y2hlcnMgZGlyZWN0bHkgdG8gcmVzdWx0c1xuXHRcdFx0Ly8gU3VwcG9ydDogSUU8OSwgU2FmYXJpXG5cdFx0XHQvLyBUb2xlcmF0ZSBOb2RlTGlzdCBwcm9wZXJ0aWVzIChJRTogXCJsZW5ndGhcIjsgU2FmYXJpOiA8bnVtYmVyPikgbWF0Y2hpbmcgZWxlbWVudHMgYnkgaWRcblx0XHRcdGZvciAoIDsgaSAhPT0gbGVuICYmIChlbGVtID0gZWxlbXNbaV0pICE9IG51bGw7IGkrKyApIHtcblx0XHRcdFx0aWYgKCBieUVsZW1lbnQgJiYgZWxlbSApIHtcblx0XHRcdFx0XHRqID0gMDtcblx0XHRcdFx0XHRpZiAoICFjb250ZXh0ICYmIGVsZW0ub3duZXJEb2N1bWVudCAhPT0gZG9jdW1lbnQgKSB7XG5cdFx0XHRcdFx0XHRzZXREb2N1bWVudCggZWxlbSApO1xuXHRcdFx0XHRcdFx0eG1sID0gIWRvY3VtZW50SXNIVE1MO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR3aGlsZSAoIChtYXRjaGVyID0gZWxlbWVudE1hdGNoZXJzW2orK10pICkge1xuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVyKCBlbGVtLCBjb250ZXh0IHx8IGRvY3VtZW50LCB4bWwpICkge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggb3V0ZXJtb3N0ICkge1xuXHRcdFx0XHRcdFx0ZGlycnVucyA9IGRpcnJ1bnNVbmlxdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gVHJhY2sgdW5tYXRjaGVkIGVsZW1lbnRzIGZvciBzZXQgZmlsdGVyc1xuXHRcdFx0XHRpZiAoIGJ5U2V0ICkge1xuXHRcdFx0XHRcdC8vIFRoZXkgd2lsbCBoYXZlIGdvbmUgdGhyb3VnaCBhbGwgcG9zc2libGUgbWF0Y2hlcnNcblx0XHRcdFx0XHRpZiAoIChlbGVtID0gIW1hdGNoZXIgJiYgZWxlbSkgKSB7XG5cdFx0XHRcdFx0XHRtYXRjaGVkQ291bnQtLTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBMZW5ndGhlbiB0aGUgYXJyYXkgZm9yIGV2ZXJ5IGVsZW1lbnQsIG1hdGNoZWQgb3Igbm90XG5cdFx0XHRcdFx0aWYgKCBzZWVkICkge1xuXHRcdFx0XHRcdFx0dW5tYXRjaGVkLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gYGlgIGlzIG5vdyB0aGUgY291bnQgb2YgZWxlbWVudHMgdmlzaXRlZCBhYm92ZSwgYW5kIGFkZGluZyBpdCB0byBgbWF0Y2hlZENvdW50YFxuXHRcdFx0Ly8gbWFrZXMgdGhlIGxhdHRlciBub25uZWdhdGl2ZS5cblx0XHRcdG1hdGNoZWRDb3VudCArPSBpO1xuXG5cdFx0XHQvLyBBcHBseSBzZXQgZmlsdGVycyB0byB1bm1hdGNoZWQgZWxlbWVudHNcblx0XHRcdC8vIE5PVEU6IFRoaXMgY2FuIGJlIHNraXBwZWQgaWYgdGhlcmUgYXJlIG5vIHVubWF0Y2hlZCBlbGVtZW50cyAoaS5lLiwgYG1hdGNoZWRDb3VudGBcblx0XHRcdC8vIGVxdWFscyBgaWApLCB1bmxlc3Mgd2UgZGlkbid0IHZpc2l0IF9hbnlfIGVsZW1lbnRzIGluIHRoZSBhYm92ZSBsb29wIGJlY2F1c2Ugd2UgaGF2ZVxuXHRcdFx0Ly8gbm8gZWxlbWVudCBtYXRjaGVycyBhbmQgbm8gc2VlZC5cblx0XHRcdC8vIEluY3JlbWVudGluZyBhbiBpbml0aWFsbHktc3RyaW5nIFwiMFwiIGBpYCBhbGxvd3MgYGlgIHRvIHJlbWFpbiBhIHN0cmluZyBvbmx5IGluIHRoYXRcblx0XHRcdC8vIGNhc2UsIHdoaWNoIHdpbGwgcmVzdWx0IGluIGEgXCIwMFwiIGBtYXRjaGVkQ291bnRgIHRoYXQgZGlmZmVycyBmcm9tIGBpYCBidXQgaXMgYWxzb1xuXHRcdFx0Ly8gbnVtZXJpY2FsbHkgemVyby5cblx0XHRcdGlmICggYnlTZXQgJiYgaSAhPT0gbWF0Y2hlZENvdW50ICkge1xuXHRcdFx0XHRqID0gMDtcblx0XHRcdFx0d2hpbGUgKCAobWF0Y2hlciA9IHNldE1hdGNoZXJzW2orK10pICkge1xuXHRcdFx0XHRcdG1hdGNoZXIoIHVubWF0Y2hlZCwgc2V0TWF0Y2hlZCwgY29udGV4dCwgeG1sICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIHNlZWQgKSB7XG5cdFx0XHRcdFx0Ly8gUmVpbnRlZ3JhdGUgZWxlbWVudCBtYXRjaGVzIHRvIGVsaW1pbmF0ZSB0aGUgbmVlZCBmb3Igc29ydGluZ1xuXHRcdFx0XHRcdGlmICggbWF0Y2hlZENvdW50ID4gMCApIHtcblx0XHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoICEodW5tYXRjaGVkW2ldIHx8IHNldE1hdGNoZWRbaV0pICkge1xuXHRcdFx0XHRcdFx0XHRcdHNldE1hdGNoZWRbaV0gPSBwb3AuY2FsbCggcmVzdWx0cyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gRGlzY2FyZCBpbmRleCBwbGFjZWhvbGRlciB2YWx1ZXMgdG8gZ2V0IG9ubHkgYWN0dWFsIG1hdGNoZXNcblx0XHRcdFx0XHRzZXRNYXRjaGVkID0gY29uZGVuc2UoIHNldE1hdGNoZWQgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFkZCBtYXRjaGVzIHRvIHJlc3VsdHNcblx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgc2V0TWF0Y2hlZCApO1xuXG5cdFx0XHRcdC8vIFNlZWRsZXNzIHNldCBtYXRjaGVzIHN1Y2NlZWRpbmcgbXVsdGlwbGUgc3VjY2Vzc2Z1bCBtYXRjaGVycyBzdGlwdWxhdGUgc29ydGluZ1xuXHRcdFx0XHRpZiAoIG91dGVybW9zdCAmJiAhc2VlZCAmJiBzZXRNYXRjaGVkLmxlbmd0aCA+IDAgJiZcblx0XHRcdFx0XHQoIG1hdGNoZWRDb3VudCArIHNldE1hdGNoZXJzLmxlbmd0aCApID4gMSApIHtcblxuXHRcdFx0XHRcdFNpenpsZS51bmlxdWVTb3J0KCByZXN1bHRzICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gT3ZlcnJpZGUgbWFuaXB1bGF0aW9uIG9mIGdsb2JhbHMgYnkgbmVzdGVkIG1hdGNoZXJzXG5cdFx0XHRpZiAoIG91dGVybW9zdCApIHtcblx0XHRcdFx0ZGlycnVucyA9IGRpcnJ1bnNVbmlxdWU7XG5cdFx0XHRcdG91dGVybW9zdENvbnRleHQgPSBjb250ZXh0QmFja3VwO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdW5tYXRjaGVkO1xuXHRcdH07XG5cblx0cmV0dXJuIGJ5U2V0ID9cblx0XHRtYXJrRnVuY3Rpb24oIHN1cGVyTWF0Y2hlciApIDpcblx0XHRzdXBlck1hdGNoZXI7XG59XG5cbmNvbXBpbGUgPSBTaXp6bGUuY29tcGlsZSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgbWF0Y2ggLyogSW50ZXJuYWwgVXNlIE9ubHkgKi8gKSB7XG5cdHZhciBpLFxuXHRcdHNldE1hdGNoZXJzID0gW10sXG5cdFx0ZWxlbWVudE1hdGNoZXJzID0gW10sXG5cdFx0Y2FjaGVkID0gY29tcGlsZXJDYWNoZVsgc2VsZWN0b3IgKyBcIiBcIiBdO1xuXG5cdGlmICggIWNhY2hlZCApIHtcblx0XHQvLyBHZW5lcmF0ZSBhIGZ1bmN0aW9uIG9mIHJlY3Vyc2l2ZSBmdW5jdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCB0byBjaGVjayBlYWNoIGVsZW1lbnRcblx0XHRpZiAoICFtYXRjaCApIHtcblx0XHRcdG1hdGNoID0gdG9rZW5pemUoIHNlbGVjdG9yICk7XG5cdFx0fVxuXHRcdGkgPSBtYXRjaC5sZW5ndGg7XG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRjYWNoZWQgPSBtYXRjaGVyRnJvbVRva2VucyggbWF0Y2hbaV0gKTtcblx0XHRcdGlmICggY2FjaGVkWyBleHBhbmRvIF0gKSB7XG5cdFx0XHRcdHNldE1hdGNoZXJzLnB1c2goIGNhY2hlZCApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWxlbWVudE1hdGNoZXJzLnB1c2goIGNhY2hlZCApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENhY2hlIHRoZSBjb21waWxlZCBmdW5jdGlvblxuXHRcdGNhY2hlZCA9IGNvbXBpbGVyQ2FjaGUoIHNlbGVjdG9yLCBtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMoIGVsZW1lbnRNYXRjaGVycywgc2V0TWF0Y2hlcnMgKSApO1xuXG5cdFx0Ly8gU2F2ZSBzZWxlY3RvciBhbmQgdG9rZW5pemF0aW9uXG5cdFx0Y2FjaGVkLnNlbGVjdG9yID0gc2VsZWN0b3I7XG5cdH1cblx0cmV0dXJuIGNhY2hlZDtcbn07XG5cbi8qKlxuICogQSBsb3ctbGV2ZWwgc2VsZWN0aW9uIGZ1bmN0aW9uIHRoYXQgd29ya3Mgd2l0aCBTaXp6bGUncyBjb21waWxlZFxuICogIHNlbGVjdG9yIGZ1bmN0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IHNlbGVjdG9yIEEgc2VsZWN0b3Igb3IgYSBwcmUtY29tcGlsZWRcbiAqICBzZWxlY3RvciBmdW5jdGlvbiBidWlsdCB3aXRoIFNpenpsZS5jb21waWxlXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRleHRcbiAqIEBwYXJhbSB7QXJyYXl9IFtyZXN1bHRzXVxuICogQHBhcmFtIHtBcnJheX0gW3NlZWRdIEEgc2V0IG9mIGVsZW1lbnRzIHRvIG1hdGNoIGFnYWluc3RcbiAqL1xuc2VsZWN0ID0gU2l6emxlLnNlbGVjdCA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApIHtcblx0dmFyIGksIHRva2VucywgdG9rZW4sIHR5cGUsIGZpbmQsXG5cdFx0Y29tcGlsZWQgPSB0eXBlb2Ygc2VsZWN0b3IgPT09IFwiZnVuY3Rpb25cIiAmJiBzZWxlY3Rvcixcblx0XHRtYXRjaCA9ICFzZWVkICYmIHRva2VuaXplKCAoc2VsZWN0b3IgPSBjb21waWxlZC5zZWxlY3RvciB8fCBzZWxlY3RvcikgKTtcblxuXHRyZXN1bHRzID0gcmVzdWx0cyB8fCBbXTtcblxuXHQvLyBUcnkgdG8gbWluaW1pemUgb3BlcmF0aW9ucyBpZiB0aGVyZSBpcyBvbmx5IG9uZSBzZWxlY3RvciBpbiB0aGUgbGlzdCBhbmQgbm8gc2VlZFxuXHQvLyAodGhlIGxhdHRlciBvZiB3aGljaCBndWFyYW50ZWVzIHVzIGNvbnRleHQpXG5cdGlmICggbWF0Y2gubGVuZ3RoID09PSAxICkge1xuXG5cdFx0Ly8gUmVkdWNlIGNvbnRleHQgaWYgdGhlIGxlYWRpbmcgY29tcG91bmQgc2VsZWN0b3IgaXMgYW4gSURcblx0XHR0b2tlbnMgPSBtYXRjaFswXSA9IG1hdGNoWzBdLnNsaWNlKCAwICk7XG5cdFx0aWYgKCB0b2tlbnMubGVuZ3RoID4gMiAmJiAodG9rZW4gPSB0b2tlbnNbMF0pLnR5cGUgPT09IFwiSURcIiAmJlxuXHRcdFx0XHRjb250ZXh0Lm5vZGVUeXBlID09PSA5ICYmIGRvY3VtZW50SXNIVE1MICYmIEV4cHIucmVsYXRpdmVbIHRva2Vuc1sxXS50eXBlIF0gKSB7XG5cblx0XHRcdGNvbnRleHQgPSAoIEV4cHIuZmluZFtcIklEXCJdKCB0b2tlbi5tYXRjaGVzWzBdLnJlcGxhY2UocnVuZXNjYXBlLCBmdW5lc2NhcGUpLCBjb250ZXh0ICkgfHwgW10gKVswXTtcblx0XHRcdGlmICggIWNvbnRleHQgKSB7XG5cdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXG5cdFx0XHQvLyBQcmVjb21waWxlZCBtYXRjaGVycyB3aWxsIHN0aWxsIHZlcmlmeSBhbmNlc3RyeSwgc28gc3RlcCB1cCBhIGxldmVsXG5cdFx0XHR9IGVsc2UgaWYgKCBjb21waWxlZCApIHtcblx0XHRcdFx0Y29udGV4dCA9IGNvbnRleHQucGFyZW50Tm9kZTtcblx0XHRcdH1cblxuXHRcdFx0c2VsZWN0b3IgPSBzZWxlY3Rvci5zbGljZSggdG9rZW5zLnNoaWZ0KCkudmFsdWUubGVuZ3RoICk7XG5cdFx0fVxuXG5cdFx0Ly8gRmV0Y2ggYSBzZWVkIHNldCBmb3IgcmlnaHQtdG8tbGVmdCBtYXRjaGluZ1xuXHRcdGkgPSBtYXRjaEV4cHJbXCJuZWVkc0NvbnRleHRcIl0udGVzdCggc2VsZWN0b3IgKSA/IDAgOiB0b2tlbnMubGVuZ3RoO1xuXHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0dG9rZW4gPSB0b2tlbnNbaV07XG5cblx0XHRcdC8vIEFib3J0IGlmIHdlIGhpdCBhIGNvbWJpbmF0b3Jcblx0XHRcdGlmICggRXhwci5yZWxhdGl2ZVsgKHR5cGUgPSB0b2tlbi50eXBlKSBdICkge1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGlmICggKGZpbmQgPSBFeHByLmZpbmRbIHR5cGUgXSkgKSB7XG5cdFx0XHRcdC8vIFNlYXJjaCwgZXhwYW5kaW5nIGNvbnRleHQgZm9yIGxlYWRpbmcgc2libGluZyBjb21iaW5hdG9yc1xuXHRcdFx0XHRpZiAoIChzZWVkID0gZmluZChcblx0XHRcdFx0XHR0b2tlbi5tYXRjaGVzWzBdLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICksXG5cdFx0XHRcdFx0cnNpYmxpbmcudGVzdCggdG9rZW5zWzBdLnR5cGUgKSAmJiB0ZXN0Q29udGV4dCggY29udGV4dC5wYXJlbnROb2RlICkgfHwgY29udGV4dFxuXHRcdFx0XHQpKSApIHtcblxuXHRcdFx0XHRcdC8vIElmIHNlZWQgaXMgZW1wdHkgb3Igbm8gdG9rZW5zIHJlbWFpbiwgd2UgY2FuIHJldHVybiBlYXJseVxuXHRcdFx0XHRcdHRva2Vucy5zcGxpY2UoIGksIDEgKTtcblx0XHRcdFx0XHRzZWxlY3RvciA9IHNlZWQubGVuZ3RoICYmIHRvU2VsZWN0b3IoIHRva2VucyApO1xuXHRcdFx0XHRcdGlmICggIXNlbGVjdG9yICkge1xuXHRcdFx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgc2VlZCApO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBDb21waWxlIGFuZCBleGVjdXRlIGEgZmlsdGVyaW5nIGZ1bmN0aW9uIGlmIG9uZSBpcyBub3QgcHJvdmlkZWRcblx0Ly8gUHJvdmlkZSBgbWF0Y2hgIHRvIGF2b2lkIHJldG9rZW5pemF0aW9uIGlmIHdlIG1vZGlmaWVkIHRoZSBzZWxlY3RvciBhYm92ZVxuXHQoIGNvbXBpbGVkIHx8IGNvbXBpbGUoIHNlbGVjdG9yLCBtYXRjaCApICkoXG5cdFx0c2VlZCxcblx0XHRjb250ZXh0LFxuXHRcdCFkb2N1bWVudElzSFRNTCxcblx0XHRyZXN1bHRzLFxuXHRcdCFjb250ZXh0IHx8IHJzaWJsaW5nLnRlc3QoIHNlbGVjdG9yICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8IGNvbnRleHRcblx0KTtcblx0cmV0dXJuIHJlc3VsdHM7XG59O1xuXG4vLyBPbmUtdGltZSBhc3NpZ25tZW50c1xuXG4vLyBTb3J0IHN0YWJpbGl0eVxuc3VwcG9ydC5zb3J0U3RhYmxlID0gZXhwYW5kby5zcGxpdChcIlwiKS5zb3J0KCBzb3J0T3JkZXIgKS5qb2luKFwiXCIpID09PSBleHBhbmRvO1xuXG4vLyBTdXBwb3J0OiBDaHJvbWUgMTQtMzUrXG4vLyBBbHdheXMgYXNzdW1lIGR1cGxpY2F0ZXMgaWYgdGhleSBhcmVuJ3QgcGFzc2VkIHRvIHRoZSBjb21wYXJpc29uIGZ1bmN0aW9uXG5zdXBwb3J0LmRldGVjdER1cGxpY2F0ZXMgPSAhIWhhc0R1cGxpY2F0ZTtcblxuLy8gSW5pdGlhbGl6ZSBhZ2FpbnN0IHRoZSBkZWZhdWx0IGRvY3VtZW50XG5zZXREb2N1bWVudCgpO1xuXG4vLyBTdXBwb3J0OiBXZWJraXQ8NTM3LjMyIC0gU2FmYXJpIDYuMC4zL0Nocm9tZSAyNSAoZml4ZWQgaW4gQ2hyb21lIDI3KVxuLy8gRGV0YWNoZWQgbm9kZXMgY29uZm91bmRpbmdseSBmb2xsb3cgKmVhY2ggb3RoZXIqXG5zdXBwb3J0LnNvcnREZXRhY2hlZCA9IGFzc2VydChmdW5jdGlvbiggZWwgKSB7XG5cdC8vIFNob3VsZCByZXR1cm4gMSwgYnV0IHJldHVybnMgNCAoZm9sbG93aW5nKVxuXHRyZXR1cm4gZWwuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKSApICYgMTtcbn0pO1xuXG4vLyBTdXBwb3J0OiBJRTw4XG4vLyBQcmV2ZW50IGF0dHJpYnV0ZS9wcm9wZXJ0eSBcImludGVycG9sYXRpb25cIlxuLy8gaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzNjQyOSUyOFZTLjg1JTI5LmFzcHhcbmlmICggIWFzc2VydChmdW5jdGlvbiggZWwgKSB7XG5cdGVsLmlubmVySFRNTCA9IFwiPGEgaHJlZj0nIyc+PC9hPlwiO1xuXHRyZXR1cm4gZWwuZmlyc3RDaGlsZC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpID09PSBcIiNcIiA7XG59KSApIHtcblx0YWRkSGFuZGxlKCBcInR5cGV8aHJlZnxoZWlnaHR8d2lkdGhcIiwgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdGlmICggIWlzWE1MICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lLCBuYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwidHlwZVwiID8gMSA6IDIgKTtcblx0XHR9XG5cdH0pO1xufVxuXG4vLyBTdXBwb3J0OiBJRTw5XG4vLyBVc2UgZGVmYXVsdFZhbHVlIGluIHBsYWNlIG9mIGdldEF0dHJpYnV0ZShcInZhbHVlXCIpXG5pZiAoICFzdXBwb3J0LmF0dHJpYnV0ZXMgfHwgIWFzc2VydChmdW5jdGlvbiggZWwgKSB7XG5cdGVsLmlubmVySFRNTCA9IFwiPGlucHV0Lz5cIjtcblx0ZWwuZmlyc3RDaGlsZC5zZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiwgXCJcIiApO1xuXHRyZXR1cm4gZWwuZmlyc3RDaGlsZC5nZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiApID09PSBcIlwiO1xufSkgKSB7XG5cdGFkZEhhbmRsZSggXCJ2YWx1ZVwiLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG5cdFx0aWYgKCAhaXNYTUwgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5kZWZhdWx0VmFsdWU7XG5cdFx0fVxuXHR9KTtcbn1cblxuLy8gU3VwcG9ydDogSUU8OVxuLy8gVXNlIGdldEF0dHJpYnV0ZU5vZGUgdG8gZmV0Y2ggYm9vbGVhbnMgd2hlbiBnZXRBdHRyaWJ1dGUgbGllc1xuaWYgKCAhYXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcblx0cmV0dXJuIGVsLmdldEF0dHJpYnV0ZShcImRpc2FibGVkXCIpID09IG51bGw7XG59KSApIHtcblx0YWRkSGFuZGxlKCBib29sZWFucywgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdHZhciB2YWw7XG5cdFx0aWYgKCAhaXNYTUwgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbVsgbmFtZSBdID09PSB0cnVlID8gbmFtZS50b0xvd2VyQ2FzZSgpIDpcblx0XHRcdFx0XHQodmFsID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKCBuYW1lICkpICYmIHZhbC5zcGVjaWZpZWQgP1xuXHRcdFx0XHRcdHZhbC52YWx1ZSA6XG5cdFx0XHRcdG51bGw7XG5cdFx0fVxuXHR9KTtcbn1cblxucmV0dXJuIFNpenpsZTtcblxufSkoIHdpbmRvdyApO1xuXG5cblxualF1ZXJ5LmZpbmQgPSBTaXp6bGU7XG5qUXVlcnkuZXhwciA9IFNpenpsZS5zZWxlY3RvcnM7XG5cbi8vIERlcHJlY2F0ZWRcbmpRdWVyeS5leHByWyBcIjpcIiBdID0galF1ZXJ5LmV4cHIucHNldWRvcztcbmpRdWVyeS51bmlxdWVTb3J0ID0galF1ZXJ5LnVuaXF1ZSA9IFNpenpsZS51bmlxdWVTb3J0O1xualF1ZXJ5LnRleHQgPSBTaXp6bGUuZ2V0VGV4dDtcbmpRdWVyeS5pc1hNTERvYyA9IFNpenpsZS5pc1hNTDtcbmpRdWVyeS5jb250YWlucyA9IFNpenpsZS5jb250YWlucztcbmpRdWVyeS5lc2NhcGVTZWxlY3RvciA9IFNpenpsZS5lc2NhcGU7XG5cblxuXG5cbnZhciBkaXIgPSBmdW5jdGlvbiggZWxlbSwgZGlyLCB1bnRpbCApIHtcblx0dmFyIG1hdGNoZWQgPSBbXSxcblx0XHR0cnVuY2F0ZSA9IHVudGlsICE9PSB1bmRlZmluZWQ7XG5cblx0d2hpbGUgKCAoIGVsZW0gPSBlbGVtWyBkaXIgXSApICYmIGVsZW0ubm9kZVR5cGUgIT09IDkgKSB7XG5cdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0aWYgKCB0cnVuY2F0ZSAmJiBqUXVlcnkoIGVsZW0gKS5pcyggdW50aWwgKSApIHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRtYXRjaGVkLnB1c2goIGVsZW0gKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIG1hdGNoZWQ7XG59O1xuXG5cbnZhciBzaWJsaW5ncyA9IGZ1bmN0aW9uKCBuLCBlbGVtICkge1xuXHR2YXIgbWF0Y2hlZCA9IFtdO1xuXG5cdGZvciAoIDsgbjsgbiA9IG4ubmV4dFNpYmxpbmcgKSB7XG5cdFx0aWYgKCBuLm5vZGVUeXBlID09PSAxICYmIG4gIT09IGVsZW0gKSB7XG5cdFx0XHRtYXRjaGVkLnB1c2goIG4gKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbWF0Y2hlZDtcbn07XG5cblxudmFyIHJuZWVkc0NvbnRleHQgPSBqUXVlcnkuZXhwci5tYXRjaC5uZWVkc0NvbnRleHQ7XG5cblxuXG5mdW5jdGlvbiBub2RlTmFtZSggZWxlbSwgbmFtZSApIHtcblxuICByZXR1cm4gZWxlbS5ub2RlTmFtZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKTtcblxufTtcbnZhciByc2luZ2xlVGFnID0gKCAvXjwoW2Etel1bXlxcL1xcMD46XFx4MjBcXHRcXHJcXG5cXGZdKilbXFx4MjBcXHRcXHJcXG5cXGZdKlxcLz8+KD86PFxcL1xcMT58KSQvaSApO1xuXG5cblxudmFyIHJpc1NpbXBsZSA9IC9eLlteOiNcXFtcXC4sXSokLztcblxuLy8gSW1wbGVtZW50IHRoZSBpZGVudGljYWwgZnVuY3Rpb25hbGl0eSBmb3IgZmlsdGVyIGFuZCBub3RcbmZ1bmN0aW9uIHdpbm5vdyggZWxlbWVudHMsIHF1YWxpZmllciwgbm90ICkge1xuXHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBxdWFsaWZpZXIgKSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSwgaSApIHtcblx0XHRcdHJldHVybiAhIXF1YWxpZmllci5jYWxsKCBlbGVtLCBpLCBlbGVtICkgIT09IG5vdDtcblx0XHR9ICk7XG5cdH1cblxuXHQvLyBTaW5nbGUgZWxlbWVudFxuXHRpZiAoIHF1YWxpZmllci5ub2RlVHlwZSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiAoIGVsZW0gPT09IHF1YWxpZmllciApICE9PSBub3Q7XG5cdFx0fSApO1xuXHR9XG5cblx0Ly8gQXJyYXlsaWtlIG9mIGVsZW1lbnRzIChqUXVlcnksIGFyZ3VtZW50cywgQXJyYXkpXG5cdGlmICggdHlwZW9mIHF1YWxpZmllciAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiAoIGluZGV4T2YuY2FsbCggcXVhbGlmaWVyLCBlbGVtICkgPiAtMSApICE9PSBub3Q7XG5cdFx0fSApO1xuXHR9XG5cblx0Ly8gU2ltcGxlIHNlbGVjdG9yIHRoYXQgY2FuIGJlIGZpbHRlcmVkIGRpcmVjdGx5LCByZW1vdmluZyBub24tRWxlbWVudHNcblx0aWYgKCByaXNTaW1wbGUudGVzdCggcXVhbGlmaWVyICkgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5maWx0ZXIoIHF1YWxpZmllciwgZWxlbWVudHMsIG5vdCApO1xuXHR9XG5cblx0Ly8gQ29tcGxleCBzZWxlY3RvciwgY29tcGFyZSB0aGUgdHdvIHNldHMsIHJlbW92aW5nIG5vbi1FbGVtZW50c1xuXHRxdWFsaWZpZXIgPSBqUXVlcnkuZmlsdGVyKCBxdWFsaWZpZXIsIGVsZW1lbnRzICk7XG5cdHJldHVybiBqUXVlcnkuZ3JlcCggZWxlbWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiAoIGluZGV4T2YuY2FsbCggcXVhbGlmaWVyLCBlbGVtICkgPiAtMSApICE9PSBub3QgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMTtcblx0fSApO1xufVxuXG5qUXVlcnkuZmlsdGVyID0gZnVuY3Rpb24oIGV4cHIsIGVsZW1zLCBub3QgKSB7XG5cdHZhciBlbGVtID0gZWxlbXNbIDAgXTtcblxuXHRpZiAoIG5vdCApIHtcblx0XHRleHByID0gXCI6bm90KFwiICsgZXhwciArIFwiKVwiO1xuXHR9XG5cblx0aWYgKCBlbGVtcy5sZW5ndGggPT09IDEgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKCBlbGVtLCBleHByICkgPyBbIGVsZW0gXSA6IFtdO1xuXHR9XG5cblx0cmV0dXJuIGpRdWVyeS5maW5kLm1hdGNoZXMoIGV4cHIsIGpRdWVyeS5ncmVwKCBlbGVtcywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGVsZW0ubm9kZVR5cGUgPT09IDE7XG5cdH0gKSApO1xufTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRmaW5kOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0dmFyIGksIHJldCxcblx0XHRcdGxlbiA9IHRoaXMubGVuZ3RoLFxuXHRcdFx0c2VsZiA9IHRoaXM7XG5cblx0XHRpZiAoIHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggalF1ZXJ5KCBzZWxlY3RvciApLmZpbHRlciggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGZvciAoIGkgPSAwOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRcdFx0aWYgKCBqUXVlcnkuY29udGFpbnMoIHNlbGZbIGkgXSwgdGhpcyApICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9ICkgKTtcblx0XHR9XG5cblx0XHRyZXQgPSB0aGlzLnB1c2hTdGFjayggW10gKTtcblxuXHRcdGZvciAoIGkgPSAwOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRqUXVlcnkuZmluZCggc2VsZWN0b3IsIHNlbGZbIGkgXSwgcmV0ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGxlbiA+IDEgPyBqUXVlcnkudW5pcXVlU29ydCggcmV0ICkgOiByZXQ7XG5cdH0sXG5cdGZpbHRlcjogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggd2lubm93KCB0aGlzLCBzZWxlY3RvciB8fCBbXSwgZmFsc2UgKSApO1xuXHR9LFxuXHRub3Q6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHdpbm5vdyggdGhpcywgc2VsZWN0b3IgfHwgW10sIHRydWUgKSApO1xuXHR9LFxuXHRpczogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiAhIXdpbm5vdyhcblx0XHRcdHRoaXMsXG5cblx0XHRcdC8vIElmIHRoaXMgaXMgYSBwb3NpdGlvbmFsL3JlbGF0aXZlIHNlbGVjdG9yLCBjaGVjayBtZW1iZXJzaGlwIGluIHRoZSByZXR1cm5lZCBzZXRcblx0XHRcdC8vIHNvICQoXCJwOmZpcnN0XCIpLmlzKFwicDpsYXN0XCIpIHdvbid0IHJldHVybiB0cnVlIGZvciBhIGRvYyB3aXRoIHR3byBcInBcIi5cblx0XHRcdHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiAmJiBybmVlZHNDb250ZXh0LnRlc3QoIHNlbGVjdG9yICkgP1xuXHRcdFx0XHRqUXVlcnkoIHNlbGVjdG9yICkgOlxuXHRcdFx0XHRzZWxlY3RvciB8fCBbXSxcblx0XHRcdGZhbHNlXG5cdFx0KS5sZW5ndGg7XG5cdH1cbn0gKTtcblxuXG4vLyBJbml0aWFsaXplIGEgalF1ZXJ5IG9iamVjdFxuXG5cbi8vIEEgY2VudHJhbCByZWZlcmVuY2UgdG8gdGhlIHJvb3QgalF1ZXJ5KGRvY3VtZW50KVxudmFyIHJvb3RqUXVlcnksXG5cblx0Ly8gQSBzaW1wbGUgd2F5IHRvIGNoZWNrIGZvciBIVE1MIHN0cmluZ3Ncblx0Ly8gUHJpb3JpdGl6ZSAjaWQgb3ZlciA8dGFnPiB0byBhdm9pZCBYU1MgdmlhIGxvY2F0aW9uLmhhc2ggKCM5NTIxKVxuXHQvLyBTdHJpY3QgSFRNTCByZWNvZ25pdGlvbiAoIzExMjkwOiBtdXN0IHN0YXJ0IHdpdGggPClcblx0Ly8gU2hvcnRjdXQgc2ltcGxlICNpZCBjYXNlIGZvciBzcGVlZFxuXHRycXVpY2tFeHByID0gL14oPzpcXHMqKDxbXFx3XFxXXSs+KVtePl0qfCMoW1xcdy1dKykpJC8sXG5cblx0aW5pdCA9IGpRdWVyeS5mbi5pbml0ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0LCByb290ICkge1xuXHRcdHZhciBtYXRjaCwgZWxlbTtcblxuXHRcdC8vIEhBTkRMRTogJChcIlwiKSwgJChudWxsKSwgJCh1bmRlZmluZWQpLCAkKGZhbHNlKVxuXHRcdGlmICggIXNlbGVjdG9yICkge1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0Ly8gTWV0aG9kIGluaXQoKSBhY2NlcHRzIGFuIGFsdGVybmF0ZSByb290alF1ZXJ5XG5cdFx0Ly8gc28gbWlncmF0ZSBjYW4gc3VwcG9ydCBqUXVlcnkuc3ViIChnaC0yMTAxKVxuXHRcdHJvb3QgPSByb290IHx8IHJvb3RqUXVlcnk7XG5cblx0XHQvLyBIYW5kbGUgSFRNTCBzdHJpbmdzXG5cdFx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRpZiAoIHNlbGVjdG9yWyAwIF0gPT09IFwiPFwiICYmXG5cdFx0XHRcdHNlbGVjdG9yWyBzZWxlY3Rvci5sZW5ndGggLSAxIF0gPT09IFwiPlwiICYmXG5cdFx0XHRcdHNlbGVjdG9yLmxlbmd0aCA+PSAzICkge1xuXG5cdFx0XHRcdC8vIEFzc3VtZSB0aGF0IHN0cmluZ3MgdGhhdCBzdGFydCBhbmQgZW5kIHdpdGggPD4gYXJlIEhUTUwgYW5kIHNraXAgdGhlIHJlZ2V4IGNoZWNrXG5cdFx0XHRcdG1hdGNoID0gWyBudWxsLCBzZWxlY3RvciwgbnVsbCBdO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtYXRjaCA9IHJxdWlja0V4cHIuZXhlYyggc2VsZWN0b3IgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTWF0Y2ggaHRtbCBvciBtYWtlIHN1cmUgbm8gY29udGV4dCBpcyBzcGVjaWZpZWQgZm9yICNpZFxuXHRcdFx0aWYgKCBtYXRjaCAmJiAoIG1hdGNoWyAxIF0gfHwgIWNvbnRleHQgKSApIHtcblxuXHRcdFx0XHQvLyBIQU5ETEU6ICQoaHRtbCkgLT4gJChhcnJheSlcblx0XHRcdFx0aWYgKCBtYXRjaFsgMSBdICkge1xuXHRcdFx0XHRcdGNvbnRleHQgPSBjb250ZXh0IGluc3RhbmNlb2YgalF1ZXJ5ID8gY29udGV4dFsgMCBdIDogY29udGV4dDtcblxuXHRcdFx0XHRcdC8vIE9wdGlvbiB0byBydW4gc2NyaXB0cyBpcyB0cnVlIGZvciBiYWNrLWNvbXBhdFxuXHRcdFx0XHRcdC8vIEludGVudGlvbmFsbHkgbGV0IHRoZSBlcnJvciBiZSB0aHJvd24gaWYgcGFyc2VIVE1MIGlzIG5vdCBwcmVzZW50XG5cdFx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCB0aGlzLCBqUXVlcnkucGFyc2VIVE1MKFxuXHRcdFx0XHRcdFx0bWF0Y2hbIDEgXSxcblx0XHRcdFx0XHRcdGNvbnRleHQgJiYgY29udGV4dC5ub2RlVHlwZSA/IGNvbnRleHQub3duZXJEb2N1bWVudCB8fCBjb250ZXh0IDogZG9jdW1lbnQsXG5cdFx0XHRcdFx0XHR0cnVlXG5cdFx0XHRcdFx0KSApO1xuXG5cdFx0XHRcdFx0Ly8gSEFORExFOiAkKGh0bWwsIHByb3BzKVxuXHRcdFx0XHRcdGlmICggcnNpbmdsZVRhZy50ZXN0KCBtYXRjaFsgMSBdICkgJiYgalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGNvbnRleHQgKSApIHtcblx0XHRcdFx0XHRcdGZvciAoIG1hdGNoIGluIGNvbnRleHQgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gUHJvcGVydGllcyBvZiBjb250ZXh0IGFyZSBjYWxsZWQgYXMgbWV0aG9kcyBpZiBwb3NzaWJsZVxuXHRcdFx0XHRcdFx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB0aGlzWyBtYXRjaCBdICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpc1sgbWF0Y2ggXSggY29udGV4dFsgbWF0Y2ggXSApO1xuXG5cdFx0XHRcdFx0XHRcdC8vIC4uLmFuZCBvdGhlcndpc2Ugc2V0IGFzIGF0dHJpYnV0ZXNcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmF0dHIoIG1hdGNoLCBjb250ZXh0WyBtYXRjaCBdICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdFx0XHQvLyBIQU5ETEU6ICQoI2lkKVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggbWF0Y2hbIDIgXSApO1xuXG5cdFx0XHRcdFx0aWYgKCBlbGVtICkge1xuXG5cdFx0XHRcdFx0XHQvLyBJbmplY3QgdGhlIGVsZW1lbnQgZGlyZWN0bHkgaW50byB0aGUgalF1ZXJ5IG9iamVjdFxuXHRcdFx0XHRcdFx0dGhpc1sgMCBdID0gZWxlbTtcblx0XHRcdFx0XHRcdHRoaXMubGVuZ3RoID0gMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblxuXHRcdFx0Ly8gSEFORExFOiAkKGV4cHIsICQoLi4uKSlcblx0XHRcdH0gZWxzZSBpZiAoICFjb250ZXh0IHx8IGNvbnRleHQuanF1ZXJ5ICkge1xuXHRcdFx0XHRyZXR1cm4gKCBjb250ZXh0IHx8IHJvb3QgKS5maW5kKCBzZWxlY3RvciApO1xuXG5cdFx0XHQvLyBIQU5ETEU6ICQoZXhwciwgY29udGV4dClcblx0XHRcdC8vICh3aGljaCBpcyBqdXN0IGVxdWl2YWxlbnQgdG86ICQoY29udGV4dCkuZmluZChleHByKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IoIGNvbnRleHQgKS5maW5kKCBzZWxlY3RvciApO1xuXHRcdFx0fVxuXG5cdFx0Ly8gSEFORExFOiAkKERPTUVsZW1lbnQpXG5cdFx0fSBlbHNlIGlmICggc2VsZWN0b3Iubm9kZVR5cGUgKSB7XG5cdFx0XHR0aGlzWyAwIF0gPSBzZWxlY3Rvcjtcblx0XHRcdHRoaXMubGVuZ3RoID0gMTtcblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0Ly8gSEFORExFOiAkKGZ1bmN0aW9uKVxuXHRcdC8vIFNob3J0Y3V0IGZvciBkb2N1bWVudCByZWFkeVxuXHRcdH0gZWxzZSBpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBzZWxlY3RvciApICkge1xuXHRcdFx0cmV0dXJuIHJvb3QucmVhZHkgIT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdHJvb3QucmVhZHkoIHNlbGVjdG9yICkgOlxuXG5cdFx0XHRcdC8vIEV4ZWN1dGUgaW1tZWRpYXRlbHkgaWYgcmVhZHkgaXMgbm90IHByZXNlbnRcblx0XHRcdFx0c2VsZWN0b3IoIGpRdWVyeSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBqUXVlcnkubWFrZUFycmF5KCBzZWxlY3RvciwgdGhpcyApO1xuXHR9O1xuXG4vLyBHaXZlIHRoZSBpbml0IGZ1bmN0aW9uIHRoZSBqUXVlcnkgcHJvdG90eXBlIGZvciBsYXRlciBpbnN0YW50aWF0aW9uXG5pbml0LnByb3RvdHlwZSA9IGpRdWVyeS5mbjtcblxuLy8gSW5pdGlhbGl6ZSBjZW50cmFsIHJlZmVyZW5jZVxucm9vdGpRdWVyeSA9IGpRdWVyeSggZG9jdW1lbnQgKTtcblxuXG52YXIgcnBhcmVudHNwcmV2ID0gL14oPzpwYXJlbnRzfHByZXYoPzpVbnRpbHxBbGwpKS8sXG5cblx0Ly8gTWV0aG9kcyBndWFyYW50ZWVkIHRvIHByb2R1Y2UgYSB1bmlxdWUgc2V0IHdoZW4gc3RhcnRpbmcgZnJvbSBhIHVuaXF1ZSBzZXRcblx0Z3VhcmFudGVlZFVuaXF1ZSA9IHtcblx0XHRjaGlsZHJlbjogdHJ1ZSxcblx0XHRjb250ZW50czogdHJ1ZSxcblx0XHRuZXh0OiB0cnVlLFxuXHRcdHByZXY6IHRydWVcblx0fTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRoYXM6IGZ1bmN0aW9uKCB0YXJnZXQgKSB7XG5cdFx0dmFyIHRhcmdldHMgPSBqUXVlcnkoIHRhcmdldCwgdGhpcyApLFxuXHRcdFx0bCA9IHRhcmdldHMubGVuZ3RoO1xuXG5cdFx0cmV0dXJuIHRoaXMuZmlsdGVyKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBpID0gMDtcblx0XHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0aWYgKCBqUXVlcnkuY29udGFpbnMoIHRoaXMsIHRhcmdldHNbIGkgXSApICkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGNsb3Nlc3Q6IGZ1bmN0aW9uKCBzZWxlY3RvcnMsIGNvbnRleHQgKSB7XG5cdFx0dmFyIGN1cixcblx0XHRcdGkgPSAwLFxuXHRcdFx0bCA9IHRoaXMubGVuZ3RoLFxuXHRcdFx0bWF0Y2hlZCA9IFtdLFxuXHRcdFx0dGFyZ2V0cyA9IHR5cGVvZiBzZWxlY3RvcnMgIT09IFwic3RyaW5nXCIgJiYgalF1ZXJ5KCBzZWxlY3RvcnMgKTtcblxuXHRcdC8vIFBvc2l0aW9uYWwgc2VsZWN0b3JzIG5ldmVyIG1hdGNoLCBzaW5jZSB0aGVyZSdzIG5vIF9zZWxlY3Rpb25fIGNvbnRleHRcblx0XHRpZiAoICFybmVlZHNDb250ZXh0LnRlc3QoIHNlbGVjdG9ycyApICkge1xuXHRcdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRmb3IgKCBjdXIgPSB0aGlzWyBpIF07IGN1ciAmJiBjdXIgIT09IGNvbnRleHQ7IGN1ciA9IGN1ci5wYXJlbnROb2RlICkge1xuXG5cdFx0XHRcdFx0Ly8gQWx3YXlzIHNraXAgZG9jdW1lbnQgZnJhZ21lbnRzXG5cdFx0XHRcdFx0aWYgKCBjdXIubm9kZVR5cGUgPCAxMSAmJiAoIHRhcmdldHMgP1xuXHRcdFx0XHRcdFx0dGFyZ2V0cy5pbmRleCggY3VyICkgPiAtMSA6XG5cblx0XHRcdFx0XHRcdC8vIERvbid0IHBhc3Mgbm9uLWVsZW1lbnRzIHRvIFNpenpsZVxuXHRcdFx0XHRcdFx0Y3VyLm5vZGVUeXBlID09PSAxICYmXG5cdFx0XHRcdFx0XHRcdGpRdWVyeS5maW5kLm1hdGNoZXNTZWxlY3RvciggY3VyLCBzZWxlY3RvcnMgKSApICkge1xuXG5cdFx0XHRcdFx0XHRtYXRjaGVkLnB1c2goIGN1ciApO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBtYXRjaGVkLmxlbmd0aCA+IDEgPyBqUXVlcnkudW5pcXVlU29ydCggbWF0Y2hlZCApIDogbWF0Y2hlZCApO1xuXHR9LFxuXG5cdC8vIERldGVybWluZSB0aGUgcG9zaXRpb24gb2YgYW4gZWxlbWVudCB3aXRoaW4gdGhlIHNldFxuXHRpbmRleDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHQvLyBObyBhcmd1bWVudCwgcmV0dXJuIGluZGV4IGluIHBhcmVudFxuXHRcdGlmICggIWVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gKCB0aGlzWyAwIF0gJiYgdGhpc1sgMCBdLnBhcmVudE5vZGUgKSA/IHRoaXMuZmlyc3QoKS5wcmV2QWxsKCkubGVuZ3RoIDogLTE7XG5cdFx0fVxuXG5cdFx0Ly8gSW5kZXggaW4gc2VsZWN0b3Jcblx0XHRpZiAoIHR5cGVvZiBlbGVtID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIGluZGV4T2YuY2FsbCggalF1ZXJ5KCBlbGVtICksIHRoaXNbIDAgXSApO1xuXHRcdH1cblxuXHRcdC8vIExvY2F0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGRlc2lyZWQgZWxlbWVudFxuXHRcdHJldHVybiBpbmRleE9mLmNhbGwoIHRoaXMsXG5cblx0XHRcdC8vIElmIGl0IHJlY2VpdmVzIGEgalF1ZXJ5IG9iamVjdCwgdGhlIGZpcnN0IGVsZW1lbnQgaXMgdXNlZFxuXHRcdFx0ZWxlbS5qcXVlcnkgPyBlbGVtWyAwIF0gOiBlbGVtXG5cdFx0KTtcblx0fSxcblxuXHRhZGQ6IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCApIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soXG5cdFx0XHRqUXVlcnkudW5pcXVlU29ydChcblx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCB0aGlzLmdldCgpLCBqUXVlcnkoIHNlbGVjdG9yLCBjb250ZXh0ICkgKVxuXHRcdFx0KVxuXHRcdCk7XG5cdH0sXG5cblx0YWRkQmFjazogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiB0aGlzLmFkZCggc2VsZWN0b3IgPT0gbnVsbCA/XG5cdFx0XHR0aGlzLnByZXZPYmplY3QgOiB0aGlzLnByZXZPYmplY3QuZmlsdGVyKCBzZWxlY3RvciApXG5cdFx0KTtcblx0fVxufSApO1xuXG5mdW5jdGlvbiBzaWJsaW5nKCBjdXIsIGRpciApIHtcblx0d2hpbGUgKCAoIGN1ciA9IGN1clsgZGlyIF0gKSAmJiBjdXIubm9kZVR5cGUgIT09IDEgKSB7fVxuXHRyZXR1cm4gY3VyO1xufVxuXG5qUXVlcnkuZWFjaCgge1xuXHRwYXJlbnQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cdFx0cmV0dXJuIHBhcmVudCAmJiBwYXJlbnQubm9kZVR5cGUgIT09IDExID8gcGFyZW50IDogbnVsbDtcblx0fSxcblx0cGFyZW50czogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJwYXJlbnROb2RlXCIgKTtcblx0fSxcblx0cGFyZW50c1VudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJwYXJlbnROb2RlXCIsIHVudGlsICk7XG5cdH0sXG5cdG5leHQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBzaWJsaW5nKCBlbGVtLCBcIm5leHRTaWJsaW5nXCIgKTtcblx0fSxcblx0cHJldjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIHNpYmxpbmcoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIgKTtcblx0fSxcblx0bmV4dEFsbDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJuZXh0U2libGluZ1wiICk7XG5cdH0sXG5cdHByZXZBbGw6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBkaXIoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIgKTtcblx0fSxcblx0bmV4dFVudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJuZXh0U2libGluZ1wiLCB1bnRpbCApO1xuXHR9LFxuXHRwcmV2VW50aWw6IGZ1bmN0aW9uKCBlbGVtLCBpLCB1bnRpbCApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcInByZXZpb3VzU2libGluZ1wiLCB1bnRpbCApO1xuXHR9LFxuXHRzaWJsaW5nczogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIHNpYmxpbmdzKCAoIGVsZW0ucGFyZW50Tm9kZSB8fCB7fSApLmZpcnN0Q2hpbGQsIGVsZW0gKTtcblx0fSxcblx0Y2hpbGRyZW46IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBzaWJsaW5ncyggZWxlbS5maXJzdENoaWxkICk7XG5cdH0sXG5cdGNvbnRlbnRzOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgaWYgKCBub2RlTmFtZSggZWxlbSwgXCJpZnJhbWVcIiApICkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW0uY29udGVudERvY3VtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3VwcG9ydDogSUUgOSAtIDExIG9ubHksIGlPUyA3IG9ubHksIEFuZHJvaWQgQnJvd3NlciA8PTQuMyBvbmx5XG4gICAgICAgIC8vIFRyZWF0IHRoZSB0ZW1wbGF0ZSBlbGVtZW50IGFzIGEgcmVndWxhciBvbmUgaW4gYnJvd3NlcnMgdGhhdFxuICAgICAgICAvLyBkb24ndCBzdXBwb3J0IGl0LlxuICAgICAgICBpZiAoIG5vZGVOYW1lKCBlbGVtLCBcInRlbXBsYXRlXCIgKSApIHtcbiAgICAgICAgICAgIGVsZW0gPSBlbGVtLmNvbnRlbnQgfHwgZWxlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBqUXVlcnkubWVyZ2UoIFtdLCBlbGVtLmNoaWxkTm9kZXMgKTtcblx0fVxufSwgZnVuY3Rpb24oIG5hbWUsIGZuICkge1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCB1bnRpbCwgc2VsZWN0b3IgKSB7XG5cdFx0dmFyIG1hdGNoZWQgPSBqUXVlcnkubWFwKCB0aGlzLCBmbiwgdW50aWwgKTtcblxuXHRcdGlmICggbmFtZS5zbGljZSggLTUgKSAhPT0gXCJVbnRpbFwiICkge1xuXHRcdFx0c2VsZWN0b3IgPSB1bnRpbDtcblx0XHR9XG5cblx0XHRpZiAoIHNlbGVjdG9yICYmIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdG1hdGNoZWQgPSBqUXVlcnkuZmlsdGVyKCBzZWxlY3RvciwgbWF0Y2hlZCApO1xuXHRcdH1cblxuXHRcdGlmICggdGhpcy5sZW5ndGggPiAxICkge1xuXG5cdFx0XHQvLyBSZW1vdmUgZHVwbGljYXRlc1xuXHRcdFx0aWYgKCAhZ3VhcmFudGVlZFVuaXF1ZVsgbmFtZSBdICkge1xuXHRcdFx0XHRqUXVlcnkudW5pcXVlU29ydCggbWF0Y2hlZCApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZXZlcnNlIG9yZGVyIGZvciBwYXJlbnRzKiBhbmQgcHJldi1kZXJpdmF0aXZlc1xuXHRcdFx0aWYgKCBycGFyZW50c3ByZXYudGVzdCggbmFtZSApICkge1xuXHRcdFx0XHRtYXRjaGVkLnJldmVyc2UoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIG1hdGNoZWQgKTtcblx0fTtcbn0gKTtcbnZhciBybm90aHRtbHdoaXRlID0gKCAvW15cXHgyMFxcdFxcclxcblxcZl0rL2cgKTtcblxuXG5cbi8vIENvbnZlcnQgU3RyaW5nLWZvcm1hdHRlZCBvcHRpb25zIGludG8gT2JqZWN0LWZvcm1hdHRlZCBvbmVzXG5mdW5jdGlvbiBjcmVhdGVPcHRpb25zKCBvcHRpb25zICkge1xuXHR2YXIgb2JqZWN0ID0ge307XG5cdGpRdWVyeS5lYWNoKCBvcHRpb25zLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgW10sIGZ1bmN0aW9uKCBfLCBmbGFnICkge1xuXHRcdG9iamVjdFsgZmxhZyBdID0gdHJ1ZTtcblx0fSApO1xuXHRyZXR1cm4gb2JqZWN0O1xufVxuXG4vKlxuICogQ3JlYXRlIGEgY2FsbGJhY2sgbGlzdCB1c2luZyB0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnM6XG4gKlxuICpcdG9wdGlvbnM6IGFuIG9wdGlvbmFsIGxpc3Qgb2Ygc3BhY2Utc2VwYXJhdGVkIG9wdGlvbnMgdGhhdCB3aWxsIGNoYW5nZSBob3dcbiAqXHRcdFx0dGhlIGNhbGxiYWNrIGxpc3QgYmVoYXZlcyBvciBhIG1vcmUgdHJhZGl0aW9uYWwgb3B0aW9uIG9iamVjdFxuICpcbiAqIEJ5IGRlZmF1bHQgYSBjYWxsYmFjayBsaXN0IHdpbGwgYWN0IGxpa2UgYW4gZXZlbnQgY2FsbGJhY2sgbGlzdCBhbmQgY2FuIGJlXG4gKiBcImZpcmVkXCIgbXVsdGlwbGUgdGltZXMuXG4gKlxuICogUG9zc2libGUgb3B0aW9uczpcbiAqXG4gKlx0b25jZTpcdFx0XHR3aWxsIGVuc3VyZSB0aGUgY2FsbGJhY2sgbGlzdCBjYW4gb25seSBiZSBmaXJlZCBvbmNlIChsaWtlIGEgRGVmZXJyZWQpXG4gKlxuICpcdG1lbW9yeTpcdFx0XHR3aWxsIGtlZXAgdHJhY2sgb2YgcHJldmlvdXMgdmFsdWVzIGFuZCB3aWxsIGNhbGwgYW55IGNhbGxiYWNrIGFkZGVkXG4gKlx0XHRcdFx0XHRhZnRlciB0aGUgbGlzdCBoYXMgYmVlbiBmaXJlZCByaWdodCBhd2F5IHdpdGggdGhlIGxhdGVzdCBcIm1lbW9yaXplZFwiXG4gKlx0XHRcdFx0XHR2YWx1ZXMgKGxpa2UgYSBEZWZlcnJlZClcbiAqXG4gKlx0dW5pcXVlOlx0XHRcdHdpbGwgZW5zdXJlIGEgY2FsbGJhY2sgY2FuIG9ubHkgYmUgYWRkZWQgb25jZSAobm8gZHVwbGljYXRlIGluIHRoZSBsaXN0KVxuICpcbiAqXHRzdG9wT25GYWxzZTpcdGludGVycnVwdCBjYWxsaW5ncyB3aGVuIGEgY2FsbGJhY2sgcmV0dXJucyBmYWxzZVxuICpcbiAqL1xualF1ZXJ5LkNhbGxiYWNrcyA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXG5cdC8vIENvbnZlcnQgb3B0aW9ucyBmcm9tIFN0cmluZy1mb3JtYXR0ZWQgdG8gT2JqZWN0LWZvcm1hdHRlZCBpZiBuZWVkZWRcblx0Ly8gKHdlIGNoZWNrIGluIGNhY2hlIGZpcnN0KVxuXHRvcHRpb25zID0gdHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIgP1xuXHRcdGNyZWF0ZU9wdGlvbnMoIG9wdGlvbnMgKSA6XG5cdFx0alF1ZXJ5LmV4dGVuZCgge30sIG9wdGlvbnMgKTtcblxuXHR2YXIgLy8gRmxhZyB0byBrbm93IGlmIGxpc3QgaXMgY3VycmVudGx5IGZpcmluZ1xuXHRcdGZpcmluZyxcblxuXHRcdC8vIExhc3QgZmlyZSB2YWx1ZSBmb3Igbm9uLWZvcmdldHRhYmxlIGxpc3RzXG5cdFx0bWVtb3J5LFxuXG5cdFx0Ly8gRmxhZyB0byBrbm93IGlmIGxpc3Qgd2FzIGFscmVhZHkgZmlyZWRcblx0XHRmaXJlZCxcblxuXHRcdC8vIEZsYWcgdG8gcHJldmVudCBmaXJpbmdcblx0XHRsb2NrZWQsXG5cblx0XHQvLyBBY3R1YWwgY2FsbGJhY2sgbGlzdFxuXHRcdGxpc3QgPSBbXSxcblxuXHRcdC8vIFF1ZXVlIG9mIGV4ZWN1dGlvbiBkYXRhIGZvciByZXBlYXRhYmxlIGxpc3RzXG5cdFx0cXVldWUgPSBbXSxcblxuXHRcdC8vIEluZGV4IG9mIGN1cnJlbnRseSBmaXJpbmcgY2FsbGJhY2sgKG1vZGlmaWVkIGJ5IGFkZC9yZW1vdmUgYXMgbmVlZGVkKVxuXHRcdGZpcmluZ0luZGV4ID0gLTEsXG5cblx0XHQvLyBGaXJlIGNhbGxiYWNrc1xuXHRcdGZpcmUgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0Ly8gRW5mb3JjZSBzaW5nbGUtZmlyaW5nXG5cdFx0XHRsb2NrZWQgPSBsb2NrZWQgfHwgb3B0aW9ucy5vbmNlO1xuXG5cdFx0XHQvLyBFeGVjdXRlIGNhbGxiYWNrcyBmb3IgYWxsIHBlbmRpbmcgZXhlY3V0aW9ucyxcblx0XHRcdC8vIHJlc3BlY3RpbmcgZmlyaW5nSW5kZXggb3ZlcnJpZGVzIGFuZCBydW50aW1lIGNoYW5nZXNcblx0XHRcdGZpcmVkID0gZmlyaW5nID0gdHJ1ZTtcblx0XHRcdGZvciAoIDsgcXVldWUubGVuZ3RoOyBmaXJpbmdJbmRleCA9IC0xICkge1xuXHRcdFx0XHRtZW1vcnkgPSBxdWV1ZS5zaGlmdCgpO1xuXHRcdFx0XHR3aGlsZSAoICsrZmlyaW5nSW5kZXggPCBsaXN0Lmxlbmd0aCApIHtcblxuXHRcdFx0XHRcdC8vIFJ1biBjYWxsYmFjayBhbmQgY2hlY2sgZm9yIGVhcmx5IHRlcm1pbmF0aW9uXG5cdFx0XHRcdFx0aWYgKCBsaXN0WyBmaXJpbmdJbmRleCBdLmFwcGx5KCBtZW1vcnlbIDAgXSwgbWVtb3J5WyAxIF0gKSA9PT0gZmFsc2UgJiZcblx0XHRcdFx0XHRcdG9wdGlvbnMuc3RvcE9uRmFsc2UgKSB7XG5cblx0XHRcdFx0XHRcdC8vIEp1bXAgdG8gZW5kIGFuZCBmb3JnZXQgdGhlIGRhdGEgc28gLmFkZCBkb2Vzbid0IHJlLWZpcmVcblx0XHRcdFx0XHRcdGZpcmluZ0luZGV4ID0gbGlzdC5sZW5ndGg7XG5cdFx0XHRcdFx0XHRtZW1vcnkgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gRm9yZ2V0IHRoZSBkYXRhIGlmIHdlJ3JlIGRvbmUgd2l0aCBpdFxuXHRcdFx0aWYgKCAhb3B0aW9ucy5tZW1vcnkgKSB7XG5cdFx0XHRcdG1lbW9yeSA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRmaXJpbmcgPSBmYWxzZTtcblxuXHRcdFx0Ly8gQ2xlYW4gdXAgaWYgd2UncmUgZG9uZSBmaXJpbmcgZm9yIGdvb2Rcblx0XHRcdGlmICggbG9ja2VkICkge1xuXG5cdFx0XHRcdC8vIEtlZXAgYW4gZW1wdHkgbGlzdCBpZiB3ZSBoYXZlIGRhdGEgZm9yIGZ1dHVyZSBhZGQgY2FsbHNcblx0XHRcdFx0aWYgKCBtZW1vcnkgKSB7XG5cdFx0XHRcdFx0bGlzdCA9IFtdO1xuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSwgdGhpcyBvYmplY3QgaXMgc3BlbnRcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRsaXN0ID0gXCJcIjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBBY3R1YWwgQ2FsbGJhY2tzIG9iamVjdFxuXHRcdHNlbGYgPSB7XG5cblx0XHRcdC8vIEFkZCBhIGNhbGxiYWNrIG9yIGEgY29sbGVjdGlvbiBvZiBjYWxsYmFja3MgdG8gdGhlIGxpc3Rcblx0XHRcdGFkZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggbGlzdCApIHtcblxuXHRcdFx0XHRcdC8vIElmIHdlIGhhdmUgbWVtb3J5IGZyb20gYSBwYXN0IHJ1biwgd2Ugc2hvdWxkIGZpcmUgYWZ0ZXIgYWRkaW5nXG5cdFx0XHRcdFx0aWYgKCBtZW1vcnkgJiYgIWZpcmluZyApIHtcblx0XHRcdFx0XHRcdGZpcmluZ0luZGV4ID0gbGlzdC5sZW5ndGggLSAxO1xuXHRcdFx0XHRcdFx0cXVldWUucHVzaCggbWVtb3J5ICk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0KCBmdW5jdGlvbiBhZGQoIGFyZ3MgKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkuZWFjaCggYXJncywgZnVuY3Rpb24oIF8sIGFyZyApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggYXJnICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCAhb3B0aW9ucy51bmlxdWUgfHwgIXNlbGYuaGFzKCBhcmcgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGxpc3QucHVzaCggYXJnICk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCBhcmcgJiYgYXJnLmxlbmd0aCAmJiBqUXVlcnkudHlwZSggYXJnICkgIT09IFwic3RyaW5nXCIgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBJbnNwZWN0IHJlY3Vyc2l2ZWx5XG5cdFx0XHRcdFx0XHRcdFx0YWRkKCBhcmcgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdH0gKSggYXJndW1lbnRzICk7XG5cblx0XHRcdFx0XHRpZiAoIG1lbW9yeSAmJiAhZmlyaW5nICkge1xuXHRcdFx0XHRcdFx0ZmlyZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8vIFJlbW92ZSBhIGNhbGxiYWNrIGZyb20gdGhlIGxpc3Rcblx0XHRcdHJlbW92ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGpRdWVyeS5lYWNoKCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBfLCBhcmcgKSB7XG5cdFx0XHRcdFx0dmFyIGluZGV4O1xuXHRcdFx0XHRcdHdoaWxlICggKCBpbmRleCA9IGpRdWVyeS5pbkFycmF5KCBhcmcsIGxpc3QsIGluZGV4ICkgKSA+IC0xICkge1xuXHRcdFx0XHRcdFx0bGlzdC5zcGxpY2UoIGluZGV4LCAxICk7XG5cblx0XHRcdFx0XHRcdC8vIEhhbmRsZSBmaXJpbmcgaW5kZXhlc1xuXHRcdFx0XHRcdFx0aWYgKCBpbmRleCA8PSBmaXJpbmdJbmRleCApIHtcblx0XHRcdFx0XHRcdFx0ZmlyaW5nSW5kZXgtLTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBDaGVjayBpZiBhIGdpdmVuIGNhbGxiYWNrIGlzIGluIHRoZSBsaXN0LlxuXHRcdFx0Ly8gSWYgbm8gYXJndW1lbnQgaXMgZ2l2ZW4sIHJldHVybiB3aGV0aGVyIG9yIG5vdCBsaXN0IGhhcyBjYWxsYmFja3MgYXR0YWNoZWQuXG5cdFx0XHRoYXM6IGZ1bmN0aW9uKCBmbiApIHtcblx0XHRcdFx0cmV0dXJuIGZuID9cblx0XHRcdFx0XHRqUXVlcnkuaW5BcnJheSggZm4sIGxpc3QgKSA+IC0xIDpcblx0XHRcdFx0XHRsaXN0Lmxlbmd0aCA+IDA7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBSZW1vdmUgYWxsIGNhbGxiYWNrcyBmcm9tIHRoZSBsaXN0XG5cdFx0XHRlbXB0eTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggbGlzdCApIHtcblx0XHRcdFx0XHRsaXN0ID0gW107XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBEaXNhYmxlIC5maXJlIGFuZCAuYWRkXG5cdFx0XHQvLyBBYm9ydCBhbnkgY3VycmVudC9wZW5kaW5nIGV4ZWN1dGlvbnNcblx0XHRcdC8vIENsZWFyIGFsbCBjYWxsYmFja3MgYW5kIHZhbHVlc1xuXHRcdFx0ZGlzYWJsZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGxvY2tlZCA9IHF1ZXVlID0gW107XG5cdFx0XHRcdGxpc3QgPSBtZW1vcnkgPSBcIlwiO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHRkaXNhYmxlZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAhbGlzdDtcblx0XHRcdH0sXG5cblx0XHRcdC8vIERpc2FibGUgLmZpcmVcblx0XHRcdC8vIEFsc28gZGlzYWJsZSAuYWRkIHVubGVzcyB3ZSBoYXZlIG1lbW9yeSAoc2luY2UgaXQgd291bGQgaGF2ZSBubyBlZmZlY3QpXG5cdFx0XHQvLyBBYm9ydCBhbnkgcGVuZGluZyBleGVjdXRpb25zXG5cdFx0XHRsb2NrOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0bG9ja2VkID0gcXVldWUgPSBbXTtcblx0XHRcdFx0aWYgKCAhbWVtb3J5ICYmICFmaXJpbmcgKSB7XG5cdFx0XHRcdFx0bGlzdCA9IG1lbW9yeSA9IFwiXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0bG9ja2VkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICEhbG9ja2VkO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gQ2FsbCBhbGwgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGNvbnRleHQgYW5kIGFyZ3VtZW50c1xuXHRcdFx0ZmlyZVdpdGg6IGZ1bmN0aW9uKCBjb250ZXh0LCBhcmdzICkge1xuXHRcdFx0XHRpZiAoICFsb2NrZWQgKSB7XG5cdFx0XHRcdFx0YXJncyA9IGFyZ3MgfHwgW107XG5cdFx0XHRcdFx0YXJncyA9IFsgY29udGV4dCwgYXJncy5zbGljZSA/IGFyZ3Muc2xpY2UoKSA6IGFyZ3MgXTtcblx0XHRcdFx0XHRxdWV1ZS5wdXNoKCBhcmdzICk7XG5cdFx0XHRcdFx0aWYgKCAhZmlyaW5nICkge1xuXHRcdFx0XHRcdFx0ZmlyZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8vIENhbGwgYWxsIHRoZSBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gYXJndW1lbnRzXG5cdFx0XHRmaXJlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0c2VsZi5maXJlV2l0aCggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gVG8ga25vdyBpZiB0aGUgY2FsbGJhY2tzIGhhdmUgYWxyZWFkeSBiZWVuIGNhbGxlZCBhdCBsZWFzdCBvbmNlXG5cdFx0XHRmaXJlZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAhIWZpcmVkO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0cmV0dXJuIHNlbGY7XG59O1xuXG5cbmZ1bmN0aW9uIElkZW50aXR5KCB2ICkge1xuXHRyZXR1cm4gdjtcbn1cbmZ1bmN0aW9uIFRocm93ZXIoIGV4ICkge1xuXHR0aHJvdyBleDtcbn1cblxuZnVuY3Rpb24gYWRvcHRWYWx1ZSggdmFsdWUsIHJlc29sdmUsIHJlamVjdCwgbm9WYWx1ZSApIHtcblx0dmFyIG1ldGhvZDtcblxuXHR0cnkge1xuXG5cdFx0Ly8gQ2hlY2sgZm9yIHByb21pc2UgYXNwZWN0IGZpcnN0IHRvIHByaXZpbGVnZSBzeW5jaHJvbm91cyBiZWhhdmlvclxuXHRcdGlmICggdmFsdWUgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oICggbWV0aG9kID0gdmFsdWUucHJvbWlzZSApICkgKSB7XG5cdFx0XHRtZXRob2QuY2FsbCggdmFsdWUgKS5kb25lKCByZXNvbHZlICkuZmFpbCggcmVqZWN0ICk7XG5cblx0XHQvLyBPdGhlciB0aGVuYWJsZXNcblx0XHR9IGVsc2UgaWYgKCB2YWx1ZSAmJiBqUXVlcnkuaXNGdW5jdGlvbiggKCBtZXRob2QgPSB2YWx1ZS50aGVuICkgKSApIHtcblx0XHRcdG1ldGhvZC5jYWxsKCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0ICk7XG5cblx0XHQvLyBPdGhlciBub24tdGhlbmFibGVzXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gQ29udHJvbCBgcmVzb2x2ZWAgYXJndW1lbnRzIGJ5IGxldHRpbmcgQXJyYXkjc2xpY2UgY2FzdCBib29sZWFuIGBub1ZhbHVlYCB0byBpbnRlZ2VyOlxuXHRcdFx0Ly8gKiBmYWxzZTogWyB2YWx1ZSBdLnNsaWNlKCAwICkgPT4gcmVzb2x2ZSggdmFsdWUgKVxuXHRcdFx0Ly8gKiB0cnVlOiBbIHZhbHVlIF0uc2xpY2UoIDEgKSA9PiByZXNvbHZlKClcblx0XHRcdHJlc29sdmUuYXBwbHkoIHVuZGVmaW5lZCwgWyB2YWx1ZSBdLnNsaWNlKCBub1ZhbHVlICkgKTtcblx0XHR9XG5cblx0Ly8gRm9yIFByb21pc2VzL0ErLCBjb252ZXJ0IGV4Y2VwdGlvbnMgaW50byByZWplY3Rpb25zXG5cdC8vIFNpbmNlIGpRdWVyeS53aGVuIGRvZXNuJ3QgdW53cmFwIHRoZW5hYmxlcywgd2UgY2FuIHNraXAgdGhlIGV4dHJhIGNoZWNrcyBhcHBlYXJpbmcgaW5cblx0Ly8gRGVmZXJyZWQjdGhlbiB0byBjb25kaXRpb25hbGx5IHN1cHByZXNzIHJlamVjdGlvbi5cblx0fSBjYXRjaCAoIHZhbHVlICkge1xuXG5cdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA0LjAgb25seVxuXHRcdC8vIFN0cmljdCBtb2RlIGZ1bmN0aW9ucyBpbnZva2VkIHdpdGhvdXQgLmNhbGwvLmFwcGx5IGdldCBnbG9iYWwtb2JqZWN0IGNvbnRleHRcblx0XHRyZWplY3QuYXBwbHkoIHVuZGVmaW5lZCwgWyB2YWx1ZSBdICk7XG5cdH1cbn1cblxualF1ZXJ5LmV4dGVuZCgge1xuXG5cdERlZmVycmVkOiBmdW5jdGlvbiggZnVuYyApIHtcblx0XHR2YXIgdHVwbGVzID0gW1xuXG5cdFx0XHRcdC8vIGFjdGlvbiwgYWRkIGxpc3RlbmVyLCBjYWxsYmFja3MsXG5cdFx0XHRcdC8vIC4uLiAudGhlbiBoYW5kbGVycywgYXJndW1lbnQgaW5kZXgsIFtmaW5hbCBzdGF0ZV1cblx0XHRcdFx0WyBcIm5vdGlmeVwiLCBcInByb2dyZXNzXCIsIGpRdWVyeS5DYWxsYmFja3MoIFwibWVtb3J5XCIgKSxcblx0XHRcdFx0XHRqUXVlcnkuQ2FsbGJhY2tzKCBcIm1lbW9yeVwiICksIDIgXSxcblx0XHRcdFx0WyBcInJlc29sdmVcIiwgXCJkb25lXCIsIGpRdWVyeS5DYWxsYmFja3MoIFwib25jZSBtZW1vcnlcIiApLFxuXHRcdFx0XHRcdGpRdWVyeS5DYWxsYmFja3MoIFwib25jZSBtZW1vcnlcIiApLCAwLCBcInJlc29sdmVkXCIgXSxcblx0XHRcdFx0WyBcInJlamVjdFwiLCBcImZhaWxcIiwgalF1ZXJ5LkNhbGxiYWNrcyggXCJvbmNlIG1lbW9yeVwiICksXG5cdFx0XHRcdFx0alF1ZXJ5LkNhbGxiYWNrcyggXCJvbmNlIG1lbW9yeVwiICksIDEsIFwicmVqZWN0ZWRcIiBdXG5cdFx0XHRdLFxuXHRcdFx0c3RhdGUgPSBcInBlbmRpbmdcIixcblx0XHRcdHByb21pc2UgPSB7XG5cdFx0XHRcdHN0YXRlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFsd2F5czogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0ZGVmZXJyZWQuZG9uZSggYXJndW1lbnRzICkuZmFpbCggYXJndW1lbnRzICk7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiY2F0Y2hcIjogZnVuY3Rpb24oIGZuICkge1xuXHRcdFx0XHRcdHJldHVybiBwcm9taXNlLnRoZW4oIG51bGwsIGZuICk7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gS2VlcCBwaXBlIGZvciBiYWNrLWNvbXBhdFxuXHRcdFx0XHRwaXBlOiBmdW5jdGlvbiggLyogZm5Eb25lLCBmbkZhaWwsIGZuUHJvZ3Jlc3MgKi8gKSB7XG5cdFx0XHRcdFx0dmFyIGZucyA9IGFyZ3VtZW50cztcblxuXHRcdFx0XHRcdHJldHVybiBqUXVlcnkuRGVmZXJyZWQoIGZ1bmN0aW9uKCBuZXdEZWZlciApIHtcblx0XHRcdFx0XHRcdGpRdWVyeS5lYWNoKCB0dXBsZXMsIGZ1bmN0aW9uKCBpLCB0dXBsZSApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBNYXAgdHVwbGVzIChwcm9ncmVzcywgZG9uZSwgZmFpbCkgdG8gYXJndW1lbnRzIChkb25lLCBmYWlsLCBwcm9ncmVzcylcblx0XHRcdFx0XHRcdFx0dmFyIGZuID0galF1ZXJ5LmlzRnVuY3Rpb24oIGZuc1sgdHVwbGVbIDQgXSBdICkgJiYgZm5zWyB0dXBsZVsgNCBdIF07XG5cblx0XHRcdFx0XHRcdFx0Ly8gZGVmZXJyZWQucHJvZ3Jlc3MoZnVuY3Rpb24oKSB7IGJpbmQgdG8gbmV3RGVmZXIgb3IgbmV3RGVmZXIubm90aWZ5IH0pXG5cdFx0XHRcdFx0XHRcdC8vIGRlZmVycmVkLmRvbmUoZnVuY3Rpb24oKSB7IGJpbmQgdG8gbmV3RGVmZXIgb3IgbmV3RGVmZXIucmVzb2x2ZSB9KVxuXHRcdFx0XHRcdFx0XHQvLyBkZWZlcnJlZC5mYWlsKGZ1bmN0aW9uKCkgeyBiaW5kIHRvIG5ld0RlZmVyIG9yIG5ld0RlZmVyLnJlamVjdCB9KVxuXHRcdFx0XHRcdFx0XHRkZWZlcnJlZFsgdHVwbGVbIDEgXSBdKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgcmV0dXJuZWQgPSBmbiAmJiBmbi5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCByZXR1cm5lZCAmJiBqUXVlcnkuaXNGdW5jdGlvbiggcmV0dXJuZWQucHJvbWlzZSApICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuZWQucHJvbWlzZSgpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5wcm9ncmVzcyggbmV3RGVmZXIubm90aWZ5IClcblx0XHRcdFx0XHRcdFx0XHRcdFx0LmRvbmUoIG5ld0RlZmVyLnJlc29sdmUgKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQuZmFpbCggbmV3RGVmZXIucmVqZWN0ICk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdG5ld0RlZmVyWyB0dXBsZVsgMCBdICsgXCJXaXRoXCIgXShcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Zm4gPyBbIHJldHVybmVkIF0gOiBhcmd1bWVudHNcblx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0XHRmbnMgPSBudWxsO1xuXHRcdFx0XHRcdH0gKS5wcm9taXNlKCk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRoZW46IGZ1bmN0aW9uKCBvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgb25Qcm9ncmVzcyApIHtcblx0XHRcdFx0XHR2YXIgbWF4RGVwdGggPSAwO1xuXHRcdFx0XHRcdGZ1bmN0aW9uIHJlc29sdmUoIGRlcHRoLCBkZWZlcnJlZCwgaGFuZGxlciwgc3BlY2lhbCApIHtcblx0XHRcdFx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdFx0XHRcdFx0XHRcdGFyZ3MgPSBhcmd1bWVudHMsXG5cdFx0XHRcdFx0XHRcdFx0bWlnaHRUaHJvdyA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIHJldHVybmVkLCB0aGVuO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBQcm9taXNlcy9BKyBzZWN0aW9uIDIuMy4zLjMuM1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gaHR0cHM6Ly9wcm9taXNlc2FwbHVzLmNvbS8jcG9pbnQtNTlcblx0XHRcdFx0XHRcdFx0XHRcdC8vIElnbm9yZSBkb3VibGUtcmVzb2x1dGlvbiBhdHRlbXB0c1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBkZXB0aCA8IG1heERlcHRoICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybmVkID0gaGFuZGxlci5hcHBseSggdGhhdCwgYXJncyApO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBQcm9taXNlcy9BKyBzZWN0aW9uIDIuMy4xXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBodHRwczovL3Byb21pc2VzYXBsdXMuY29tLyNwb2ludC00OFxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCByZXR1cm5lZCA9PT0gZGVmZXJyZWQucHJvbWlzZSgpICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCBcIlRoZW5hYmxlIHNlbGYtcmVzb2x1dGlvblwiICk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IFByb21pc2VzL0ErIHNlY3Rpb25zIDIuMy4zLjEsIDMuNVxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gaHR0cHM6Ly9wcm9taXNlc2FwbHVzLmNvbS8jcG9pbnQtNTRcblx0XHRcdFx0XHRcdFx0XHRcdC8vIGh0dHBzOi8vcHJvbWlzZXNhcGx1cy5jb20vI3BvaW50LTc1XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBSZXRyaWV2ZSBgdGhlbmAgb25seSBvbmNlXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGVuID0gcmV0dXJuZWQgJiZcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBQcm9taXNlcy9BKyBzZWN0aW9uIDIuMy40XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGh0dHBzOi8vcHJvbWlzZXNhcGx1cy5jb20vI3BvaW50LTY0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIE9ubHkgY2hlY2sgb2JqZWN0cyBhbmQgZnVuY3Rpb25zIGZvciB0aGVuYWJpbGl0eVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQoIHR5cGVvZiByZXR1cm5lZCA9PT0gXCJvYmplY3RcIiB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGVvZiByZXR1cm5lZCA9PT0gXCJmdW5jdGlvblwiICkgJiZcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuZWQudGhlbjtcblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gSGFuZGxlIGEgcmV0dXJuZWQgdGhlbmFibGVcblx0XHRcdFx0XHRcdFx0XHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHRoZW4gKSApIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBTcGVjaWFsIHByb2Nlc3NvcnMgKG5vdGlmeSkganVzdCB3YWl0IGZvciByZXNvbHV0aW9uXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICggc3BlY2lhbCApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGVuLmNhbGwoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm5lZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoIG1heERlcHRoLCBkZWZlcnJlZCwgSWRlbnRpdHksIHNwZWNpYWwgKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoIG1heERlcHRoLCBkZWZlcnJlZCwgVGhyb3dlciwgc3BlY2lhbCApXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBOb3JtYWwgcHJvY2Vzc29ycyAocmVzb2x2ZSkgYWxzbyBob29rIGludG8gcHJvZ3Jlc3Ncblx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIC4uLmFuZCBkaXNyZWdhcmQgb2xkZXIgcmVzb2x1dGlvbiB2YWx1ZXNcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtYXhEZXB0aCsrO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhlbi5jYWxsKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKCBtYXhEZXB0aCwgZGVmZXJyZWQsIElkZW50aXR5LCBzcGVjaWFsICksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKCBtYXhEZXB0aCwgZGVmZXJyZWQsIFRocm93ZXIsIHNwZWNpYWwgKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoIG1heERlcHRoLCBkZWZlcnJlZCwgSWRlbnRpdHksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlZmVycmVkLm5vdGlmeVdpdGggKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gSGFuZGxlIGFsbCBvdGhlciByZXR1cm5lZCB2YWx1ZXNcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gT25seSBzdWJzdGl0dXRlIGhhbmRsZXJzIHBhc3Mgb24gY29udGV4dFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBhbmQgbXVsdGlwbGUgdmFsdWVzIChub24tc3BlYyBiZWhhdmlvcilcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBoYW5kbGVyICE9PSBJZGVudGl0eSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGF0ID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGFyZ3MgPSBbIHJldHVybmVkIF07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBQcm9jZXNzIHRoZSB2YWx1ZShzKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBEZWZhdWx0IHByb2Nlc3MgaXMgcmVzb2x2ZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQoIHNwZWNpYWwgfHwgZGVmZXJyZWQucmVzb2x2ZVdpdGggKSggdGhhdCwgYXJncyApO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0sXG5cblx0XHRcdFx0XHRcdFx0XHQvLyBPbmx5IG5vcm1hbCBwcm9jZXNzb3JzIChyZXNvbHZlKSBjYXRjaCBhbmQgcmVqZWN0IGV4Y2VwdGlvbnNcblx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzID0gc3BlY2lhbCA/XG5cdFx0XHRcdFx0XHRcdFx0XHRtaWdodFRocm93IDpcblx0XHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1pZ2h0VGhyb3coKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoIGUgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIGpRdWVyeS5EZWZlcnJlZC5leGNlcHRpb25Ib29rICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0alF1ZXJ5LkRlZmVycmVkLmV4Y2VwdGlvbkhvb2soIGUsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHByb2Nlc3Muc3RhY2tUcmFjZSApO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IFByb21pc2VzL0ErIHNlY3Rpb24gMi4zLjMuMy40LjFcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBodHRwczovL3Byb21pc2VzYXBsdXMuY29tLyNwb2ludC02MVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIElnbm9yZSBwb3N0LXJlc29sdXRpb24gZXhjZXB0aW9uc1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICggZGVwdGggKyAxID49IG1heERlcHRoICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBPbmx5IHN1YnN0aXR1dGUgaGFuZGxlcnMgcGFzcyBvbiBjb250ZXh0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBhbmQgbXVsdGlwbGUgdmFsdWVzIChub24tc3BlYyBiZWhhdmlvcilcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICggaGFuZGxlciAhPT0gVGhyb3dlciApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhhdCA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXJncyA9IFsgZSBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3RXaXRoKCB0aGF0LCBhcmdzICk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IFByb21pc2VzL0ErIHNlY3Rpb24gMi4zLjMuMy4xXG5cdFx0XHRcdFx0XHRcdC8vIGh0dHBzOi8vcHJvbWlzZXNhcGx1cy5jb20vI3BvaW50LTU3XG5cdFx0XHRcdFx0XHRcdC8vIFJlLXJlc29sdmUgcHJvbWlzZXMgaW1tZWRpYXRlbHkgdG8gZG9kZ2UgZmFsc2UgcmVqZWN0aW9uIGZyb21cblx0XHRcdFx0XHRcdFx0Ly8gc3Vic2VxdWVudCBlcnJvcnNcblx0XHRcdFx0XHRcdFx0aWYgKCBkZXB0aCApIHtcblx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzKCk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBDYWxsIGFuIG9wdGlvbmFsIGhvb2sgdG8gcmVjb3JkIHRoZSBzdGFjaywgaW4gY2FzZSBvZiBleGNlcHRpb25cblx0XHRcdFx0XHRcdFx0XHQvLyBzaW5jZSBpdCdzIG90aGVyd2lzZSBsb3N0IHdoZW4gZXhlY3V0aW9uIGdvZXMgYXN5bmNcblx0XHRcdFx0XHRcdFx0XHRpZiAoIGpRdWVyeS5EZWZlcnJlZC5nZXRTdGFja0hvb2sgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzLnN0YWNrVHJhY2UgPSBqUXVlcnkuRGVmZXJyZWQuZ2V0U3RhY2tIb29rKCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KCBwcm9jZXNzICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIGpRdWVyeS5EZWZlcnJlZCggZnVuY3Rpb24oIG5ld0RlZmVyICkge1xuXG5cdFx0XHRcdFx0XHQvLyBwcm9ncmVzc19oYW5kbGVycy5hZGQoIC4uLiApXG5cdFx0XHRcdFx0XHR0dXBsZXNbIDAgXVsgMyBdLmFkZChcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZShcblx0XHRcdFx0XHRcdFx0XHQwLFxuXHRcdFx0XHRcdFx0XHRcdG5ld0RlZmVyLFxuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5pc0Z1bmN0aW9uKCBvblByb2dyZXNzICkgP1xuXHRcdFx0XHRcdFx0XHRcdFx0b25Qcm9ncmVzcyA6XG5cdFx0XHRcdFx0XHRcdFx0XHRJZGVudGl0eSxcblx0XHRcdFx0XHRcdFx0XHRuZXdEZWZlci5ub3RpZnlXaXRoXG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdC8vIGZ1bGZpbGxlZF9oYW5kbGVycy5hZGQoIC4uLiApXG5cdFx0XHRcdFx0XHR0dXBsZXNbIDEgXVsgMyBdLmFkZChcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZShcblx0XHRcdFx0XHRcdFx0XHQwLFxuXHRcdFx0XHRcdFx0XHRcdG5ld0RlZmVyLFxuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5pc0Z1bmN0aW9uKCBvbkZ1bGZpbGxlZCApID9cblx0XHRcdFx0XHRcdFx0XHRcdG9uRnVsZmlsbGVkIDpcblx0XHRcdFx0XHRcdFx0XHRcdElkZW50aXR5XG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdC8vIHJlamVjdGVkX2hhbmRsZXJzLmFkZCggLi4uIClcblx0XHRcdFx0XHRcdHR1cGxlc1sgMiBdWyAzIF0uYWRkKFxuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKFxuXHRcdFx0XHRcdFx0XHRcdDAsXG5cdFx0XHRcdFx0XHRcdFx0bmV3RGVmZXIsXG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5LmlzRnVuY3Rpb24oIG9uUmVqZWN0ZWQgKSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRvblJlamVjdGVkIDpcblx0XHRcdFx0XHRcdFx0XHRcdFRocm93ZXJcblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9ICkucHJvbWlzZSgpO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIEdldCBhIHByb21pc2UgZm9yIHRoaXMgZGVmZXJyZWRcblx0XHRcdFx0Ly8gSWYgb2JqIGlzIHByb3ZpZGVkLCB0aGUgcHJvbWlzZSBhc3BlY3QgaXMgYWRkZWQgdG8gdGhlIG9iamVjdFxuXHRcdFx0XHRwcm9taXNlOiBmdW5jdGlvbiggb2JqICkge1xuXHRcdFx0XHRcdHJldHVybiBvYmogIT0gbnVsbCA/IGpRdWVyeS5leHRlbmQoIG9iaiwgcHJvbWlzZSApIDogcHJvbWlzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGRlZmVycmVkID0ge307XG5cblx0XHQvLyBBZGQgbGlzdC1zcGVjaWZpYyBtZXRob2RzXG5cdFx0alF1ZXJ5LmVhY2goIHR1cGxlcywgZnVuY3Rpb24oIGksIHR1cGxlICkge1xuXHRcdFx0dmFyIGxpc3QgPSB0dXBsZVsgMiBdLFxuXHRcdFx0XHRzdGF0ZVN0cmluZyA9IHR1cGxlWyA1IF07XG5cblx0XHRcdC8vIHByb21pc2UucHJvZ3Jlc3MgPSBsaXN0LmFkZFxuXHRcdFx0Ly8gcHJvbWlzZS5kb25lID0gbGlzdC5hZGRcblx0XHRcdC8vIHByb21pc2UuZmFpbCA9IGxpc3QuYWRkXG5cdFx0XHRwcm9taXNlWyB0dXBsZVsgMSBdIF0gPSBsaXN0LmFkZDtcblxuXHRcdFx0Ly8gSGFuZGxlIHN0YXRlXG5cdFx0XHRpZiAoIHN0YXRlU3RyaW5nICkge1xuXHRcdFx0XHRsaXN0LmFkZChcblx0XHRcdFx0XHRmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0Ly8gc3RhdGUgPSBcInJlc29sdmVkXCIgKGkuZS4sIGZ1bGZpbGxlZClcblx0XHRcdFx0XHRcdC8vIHN0YXRlID0gXCJyZWplY3RlZFwiXG5cdFx0XHRcdFx0XHRzdGF0ZSA9IHN0YXRlU3RyaW5nO1xuXHRcdFx0XHRcdH0sXG5cblx0XHRcdFx0XHQvLyByZWplY3RlZF9jYWxsYmFja3MuZGlzYWJsZVxuXHRcdFx0XHRcdC8vIGZ1bGZpbGxlZF9jYWxsYmFja3MuZGlzYWJsZVxuXHRcdFx0XHRcdHR1cGxlc1sgMyAtIGkgXVsgMiBdLmRpc2FibGUsXG5cblx0XHRcdFx0XHQvLyBwcm9ncmVzc19jYWxsYmFja3MubG9ja1xuXHRcdFx0XHRcdHR1cGxlc1sgMCBdWyAyIF0ubG9ja1xuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBwcm9ncmVzc19oYW5kbGVycy5maXJlXG5cdFx0XHQvLyBmdWxmaWxsZWRfaGFuZGxlcnMuZmlyZVxuXHRcdFx0Ly8gcmVqZWN0ZWRfaGFuZGxlcnMuZmlyZVxuXHRcdFx0bGlzdC5hZGQoIHR1cGxlWyAzIF0uZmlyZSApO1xuXG5cdFx0XHQvLyBkZWZlcnJlZC5ub3RpZnkgPSBmdW5jdGlvbigpIHsgZGVmZXJyZWQubm90aWZ5V2l0aCguLi4pIH1cblx0XHRcdC8vIGRlZmVycmVkLnJlc29sdmUgPSBmdW5jdGlvbigpIHsgZGVmZXJyZWQucmVzb2x2ZVdpdGgoLi4uKSB9XG5cdFx0XHQvLyBkZWZlcnJlZC5yZWplY3QgPSBmdW5jdGlvbigpIHsgZGVmZXJyZWQucmVqZWN0V2l0aCguLi4pIH1cblx0XHRcdGRlZmVycmVkWyB0dXBsZVsgMCBdIF0gPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0ZGVmZXJyZWRbIHR1cGxlWyAwIF0gKyBcIldpdGhcIiBdKCB0aGlzID09PSBkZWZlcnJlZCA/IHVuZGVmaW5lZCA6IHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH07XG5cblx0XHRcdC8vIGRlZmVycmVkLm5vdGlmeVdpdGggPSBsaXN0LmZpcmVXaXRoXG5cdFx0XHQvLyBkZWZlcnJlZC5yZXNvbHZlV2l0aCA9IGxpc3QuZmlyZVdpdGhcblx0XHRcdC8vIGRlZmVycmVkLnJlamVjdFdpdGggPSBsaXN0LmZpcmVXaXRoXG5cdFx0XHRkZWZlcnJlZFsgdHVwbGVbIDAgXSArIFwiV2l0aFwiIF0gPSBsaXN0LmZpcmVXaXRoO1xuXHRcdH0gKTtcblxuXHRcdC8vIE1ha2UgdGhlIGRlZmVycmVkIGEgcHJvbWlzZVxuXHRcdHByb21pc2UucHJvbWlzZSggZGVmZXJyZWQgKTtcblxuXHRcdC8vIENhbGwgZ2l2ZW4gZnVuYyBpZiBhbnlcblx0XHRpZiAoIGZ1bmMgKSB7XG5cdFx0XHRmdW5jLmNhbGwoIGRlZmVycmVkLCBkZWZlcnJlZCApO1xuXHRcdH1cblxuXHRcdC8vIEFsbCBkb25lIVxuXHRcdHJldHVybiBkZWZlcnJlZDtcblx0fSxcblxuXHQvLyBEZWZlcnJlZCBoZWxwZXJcblx0d2hlbjogZnVuY3Rpb24oIHNpbmdsZVZhbHVlICkge1xuXHRcdHZhclxuXG5cdFx0XHQvLyBjb3VudCBvZiB1bmNvbXBsZXRlZCBzdWJvcmRpbmF0ZXNcblx0XHRcdHJlbWFpbmluZyA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cblx0XHRcdC8vIGNvdW50IG9mIHVucHJvY2Vzc2VkIGFyZ3VtZW50c1xuXHRcdFx0aSA9IHJlbWFpbmluZyxcblxuXHRcdFx0Ly8gc3Vib3JkaW5hdGUgZnVsZmlsbG1lbnQgZGF0YVxuXHRcdFx0cmVzb2x2ZUNvbnRleHRzID0gQXJyYXkoIGkgKSxcblx0XHRcdHJlc29sdmVWYWx1ZXMgPSBzbGljZS5jYWxsKCBhcmd1bWVudHMgKSxcblxuXHRcdFx0Ly8gdGhlIG1hc3RlciBEZWZlcnJlZFxuXHRcdFx0bWFzdGVyID0galF1ZXJ5LkRlZmVycmVkKCksXG5cblx0XHRcdC8vIHN1Ym9yZGluYXRlIGNhbGxiYWNrIGZhY3Rvcnlcblx0XHRcdHVwZGF0ZUZ1bmMgPSBmdW5jdGlvbiggaSApIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdFx0XHRyZXNvbHZlQ29udGV4dHNbIGkgXSA9IHRoaXM7XG5cdFx0XHRcdFx0cmVzb2x2ZVZhbHVlc1sgaSBdID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBzbGljZS5jYWxsKCBhcmd1bWVudHMgKSA6IHZhbHVlO1xuXHRcdFx0XHRcdGlmICggISggLS1yZW1haW5pbmcgKSApIHtcblx0XHRcdFx0XHRcdG1hc3Rlci5yZXNvbHZlV2l0aCggcmVzb2x2ZUNvbnRleHRzLCByZXNvbHZlVmFsdWVzICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fTtcblxuXHRcdC8vIFNpbmdsZS0gYW5kIGVtcHR5IGFyZ3VtZW50cyBhcmUgYWRvcHRlZCBsaWtlIFByb21pc2UucmVzb2x2ZVxuXHRcdGlmICggcmVtYWluaW5nIDw9IDEgKSB7XG5cdFx0XHRhZG9wdFZhbHVlKCBzaW5nbGVWYWx1ZSwgbWFzdGVyLmRvbmUoIHVwZGF0ZUZ1bmMoIGkgKSApLnJlc29sdmUsIG1hc3Rlci5yZWplY3QsXG5cdFx0XHRcdCFyZW1haW5pbmcgKTtcblxuXHRcdFx0Ly8gVXNlIC50aGVuKCkgdG8gdW53cmFwIHNlY29uZGFyeSB0aGVuYWJsZXMgKGNmLiBnaC0zMDAwKVxuXHRcdFx0aWYgKCBtYXN0ZXIuc3RhdGUoKSA9PT0gXCJwZW5kaW5nXCIgfHxcblx0XHRcdFx0alF1ZXJ5LmlzRnVuY3Rpb24oIHJlc29sdmVWYWx1ZXNbIGkgXSAmJiByZXNvbHZlVmFsdWVzWyBpIF0udGhlbiApICkge1xuXG5cdFx0XHRcdHJldHVybiBtYXN0ZXIudGhlbigpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIE11bHRpcGxlIGFyZ3VtZW50cyBhcmUgYWdncmVnYXRlZCBsaWtlIFByb21pc2UuYWxsIGFycmF5IGVsZW1lbnRzXG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRhZG9wdFZhbHVlKCByZXNvbHZlVmFsdWVzWyBpIF0sIHVwZGF0ZUZ1bmMoIGkgKSwgbWFzdGVyLnJlamVjdCApO1xuXHRcdH1cblxuXHRcdHJldHVybiBtYXN0ZXIucHJvbWlzZSgpO1xuXHR9XG59ICk7XG5cblxuLy8gVGhlc2UgdXN1YWxseSBpbmRpY2F0ZSBhIHByb2dyYW1tZXIgbWlzdGFrZSBkdXJpbmcgZGV2ZWxvcG1lbnQsXG4vLyB3YXJuIGFib3V0IHRoZW0gQVNBUCByYXRoZXIgdGhhbiBzd2FsbG93aW5nIHRoZW0gYnkgZGVmYXVsdC5cbnZhciByZXJyb3JOYW1lcyA9IC9eKEV2YWx8SW50ZXJuYWx8UmFuZ2V8UmVmZXJlbmNlfFN5bnRheHxUeXBlfFVSSSlFcnJvciQvO1xuXG5qUXVlcnkuRGVmZXJyZWQuZXhjZXB0aW9uSG9vayA9IGZ1bmN0aW9uKCBlcnJvciwgc3RhY2sgKSB7XG5cblx0Ly8gU3VwcG9ydDogSUUgOCAtIDkgb25seVxuXHQvLyBDb25zb2xlIGV4aXN0cyB3aGVuIGRldiB0b29scyBhcmUgb3Blbiwgd2hpY2ggY2FuIGhhcHBlbiBhdCBhbnkgdGltZVxuXHRpZiAoIHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLndhcm4gJiYgZXJyb3IgJiYgcmVycm9yTmFtZXMudGVzdCggZXJyb3IubmFtZSApICkge1xuXHRcdHdpbmRvdy5jb25zb2xlLndhcm4oIFwialF1ZXJ5LkRlZmVycmVkIGV4Y2VwdGlvbjogXCIgKyBlcnJvci5tZXNzYWdlLCBlcnJvci5zdGFjaywgc3RhY2sgKTtcblx0fVxufTtcblxuXG5cblxualF1ZXJ5LnJlYWR5RXhjZXB0aW9uID0gZnVuY3Rpb24oIGVycm9yICkge1xuXHR3aW5kb3cuc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG5cdFx0dGhyb3cgZXJyb3I7XG5cdH0gKTtcbn07XG5cblxuXG5cbi8vIFRoZSBkZWZlcnJlZCB1c2VkIG9uIERPTSByZWFkeVxudmFyIHJlYWR5TGlzdCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG5qUXVlcnkuZm4ucmVhZHkgPSBmdW5jdGlvbiggZm4gKSB7XG5cblx0cmVhZHlMaXN0XG5cdFx0LnRoZW4oIGZuIClcblxuXHRcdC8vIFdyYXAgalF1ZXJ5LnJlYWR5RXhjZXB0aW9uIGluIGEgZnVuY3Rpb24gc28gdGhhdCB0aGUgbG9va3VwXG5cdFx0Ly8gaGFwcGVucyBhdCB0aGUgdGltZSBvZiBlcnJvciBoYW5kbGluZyBpbnN0ZWFkIG9mIGNhbGxiYWNrXG5cdFx0Ly8gcmVnaXN0cmF0aW9uLlxuXHRcdC5jYXRjaCggZnVuY3Rpb24oIGVycm9yICkge1xuXHRcdFx0alF1ZXJ5LnJlYWR5RXhjZXB0aW9uKCBlcnJvciApO1xuXHRcdH0gKTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbmpRdWVyeS5leHRlbmQoIHtcblxuXHQvLyBJcyB0aGUgRE9NIHJlYWR5IHRvIGJlIHVzZWQ/IFNldCB0byB0cnVlIG9uY2UgaXQgb2NjdXJzLlxuXHRpc1JlYWR5OiBmYWxzZSxcblxuXHQvLyBBIGNvdW50ZXIgdG8gdHJhY2sgaG93IG1hbnkgaXRlbXMgdG8gd2FpdCBmb3IgYmVmb3JlXG5cdC8vIHRoZSByZWFkeSBldmVudCBmaXJlcy4gU2VlICM2NzgxXG5cdHJlYWR5V2FpdDogMSxcblxuXHQvLyBIYW5kbGUgd2hlbiB0aGUgRE9NIGlzIHJlYWR5XG5cdHJlYWR5OiBmdW5jdGlvbiggd2FpdCApIHtcblxuXHRcdC8vIEFib3J0IGlmIHRoZXJlIGFyZSBwZW5kaW5nIGhvbGRzIG9yIHdlJ3JlIGFscmVhZHkgcmVhZHlcblx0XHRpZiAoIHdhaXQgPT09IHRydWUgPyAtLWpRdWVyeS5yZWFkeVdhaXQgOiBqUXVlcnkuaXNSZWFkeSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBSZW1lbWJlciB0aGF0IHRoZSBET00gaXMgcmVhZHlcblx0XHRqUXVlcnkuaXNSZWFkeSA9IHRydWU7XG5cblx0XHQvLyBJZiBhIG5vcm1hbCBET00gUmVhZHkgZXZlbnQgZmlyZWQsIGRlY3JlbWVudCwgYW5kIHdhaXQgaWYgbmVlZCBiZVxuXHRcdGlmICggd2FpdCAhPT0gdHJ1ZSAmJiAtLWpRdWVyeS5yZWFkeVdhaXQgPiAwICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZXJlIGFyZSBmdW5jdGlvbnMgYm91bmQsIHRvIGV4ZWN1dGVcblx0XHRyZWFkeUxpc3QucmVzb2x2ZVdpdGgoIGRvY3VtZW50LCBbIGpRdWVyeSBdICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LnJlYWR5LnRoZW4gPSByZWFkeUxpc3QudGhlbjtcblxuLy8gVGhlIHJlYWR5IGV2ZW50IGhhbmRsZXIgYW5kIHNlbGYgY2xlYW51cCBtZXRob2RcbmZ1bmN0aW9uIGNvbXBsZXRlZCgpIHtcblx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJET01Db250ZW50TG9hZGVkXCIsIGNvbXBsZXRlZCApO1xuXHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJsb2FkXCIsIGNvbXBsZXRlZCApO1xuXHRqUXVlcnkucmVhZHkoKTtcbn1cblxuLy8gQ2F0Y2ggY2FzZXMgd2hlcmUgJChkb2N1bWVudCkucmVhZHkoKSBpcyBjYWxsZWRcbi8vIGFmdGVyIHRoZSBicm93c2VyIGV2ZW50IGhhcyBhbHJlYWR5IG9jY3VycmVkLlxuLy8gU3VwcG9ydDogSUUgPD05IC0gMTAgb25seVxuLy8gT2xkZXIgSUUgc29tZXRpbWVzIHNpZ25hbHMgXCJpbnRlcmFjdGl2ZVwiIHRvbyBzb29uXG5pZiAoIGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiB8fFxuXHQoIGRvY3VtZW50LnJlYWR5U3RhdGUgIT09IFwibG9hZGluZ1wiICYmICFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZG9TY3JvbGwgKSApIHtcblxuXHQvLyBIYW5kbGUgaXQgYXN5bmNocm9ub3VzbHkgdG8gYWxsb3cgc2NyaXB0cyB0aGUgb3Bwb3J0dW5pdHkgdG8gZGVsYXkgcmVhZHlcblx0d2luZG93LnNldFRpbWVvdXQoIGpRdWVyeS5yZWFkeSApO1xuXG59IGVsc2Uge1xuXG5cdC8vIFVzZSB0aGUgaGFuZHkgZXZlbnQgY2FsbGJhY2tcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJET01Db250ZW50TG9hZGVkXCIsIGNvbXBsZXRlZCApO1xuXG5cdC8vIEEgZmFsbGJhY2sgdG8gd2luZG93Lm9ubG9hZCwgdGhhdCB3aWxsIGFsd2F5cyB3b3JrXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCBcImxvYWRcIiwgY29tcGxldGVkICk7XG59XG5cblxuXG5cbi8vIE11bHRpZnVuY3Rpb25hbCBtZXRob2QgdG8gZ2V0IGFuZCBzZXQgdmFsdWVzIG9mIGEgY29sbGVjdGlvblxuLy8gVGhlIHZhbHVlL3MgY2FuIG9wdGlvbmFsbHkgYmUgZXhlY3V0ZWQgaWYgaXQncyBhIGZ1bmN0aW9uXG52YXIgYWNjZXNzID0gZnVuY3Rpb24oIGVsZW1zLCBmbiwga2V5LCB2YWx1ZSwgY2hhaW5hYmxlLCBlbXB0eUdldCwgcmF3ICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bGVuID0gZWxlbXMubGVuZ3RoLFxuXHRcdGJ1bGsgPSBrZXkgPT0gbnVsbDtcblxuXHQvLyBTZXRzIG1hbnkgdmFsdWVzXG5cdGlmICggalF1ZXJ5LnR5cGUoIGtleSApID09PSBcIm9iamVjdFwiICkge1xuXHRcdGNoYWluYWJsZSA9IHRydWU7XG5cdFx0Zm9yICggaSBpbiBrZXkgKSB7XG5cdFx0XHRhY2Nlc3MoIGVsZW1zLCBmbiwgaSwga2V5WyBpIF0sIHRydWUsIGVtcHR5R2V0LCByYXcgKTtcblx0XHR9XG5cblx0Ly8gU2V0cyBvbmUgdmFsdWVcblx0fSBlbHNlIGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRjaGFpbmFibGUgPSB0cnVlO1xuXG5cdFx0aWYgKCAhalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyYXcgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGlmICggYnVsayApIHtcblxuXHRcdFx0Ly8gQnVsayBvcGVyYXRpb25zIHJ1biBhZ2FpbnN0IHRoZSBlbnRpcmUgc2V0XG5cdFx0XHRpZiAoIHJhdyApIHtcblx0XHRcdFx0Zm4uY2FsbCggZWxlbXMsIHZhbHVlICk7XG5cdFx0XHRcdGZuID0gbnVsbDtcblxuXHRcdFx0Ly8gLi4uZXhjZXB0IHdoZW4gZXhlY3V0aW5nIGZ1bmN0aW9uIHZhbHVlc1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YnVsayA9IGZuO1xuXHRcdFx0XHRmbiA9IGZ1bmN0aW9uKCBlbGVtLCBrZXksIHZhbHVlICkge1xuXHRcdFx0XHRcdHJldHVybiBidWxrLmNhbGwoIGpRdWVyeSggZWxlbSApLCB2YWx1ZSApO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICggZm4gKSB7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdFx0Zm4oXG5cdFx0XHRcdFx0ZWxlbXNbIGkgXSwga2V5LCByYXcgP1xuXHRcdFx0XHRcdHZhbHVlIDpcblx0XHRcdFx0XHR2YWx1ZS5jYWxsKCBlbGVtc1sgaSBdLCBpLCBmbiggZWxlbXNbIGkgXSwga2V5ICkgKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmICggY2hhaW5hYmxlICkge1xuXHRcdHJldHVybiBlbGVtcztcblx0fVxuXG5cdC8vIEdldHNcblx0aWYgKCBidWxrICkge1xuXHRcdHJldHVybiBmbi5jYWxsKCBlbGVtcyApO1xuXHR9XG5cblx0cmV0dXJuIGxlbiA/IGZuKCBlbGVtc1sgMCBdLCBrZXkgKSA6IGVtcHR5R2V0O1xufTtcbnZhciBhY2NlcHREYXRhID0gZnVuY3Rpb24oIG93bmVyICkge1xuXG5cdC8vIEFjY2VwdHMgb25seTpcblx0Ly8gIC0gTm9kZVxuXHQvLyAgICAtIE5vZGUuRUxFTUVOVF9OT0RFXG5cdC8vICAgIC0gTm9kZS5ET0NVTUVOVF9OT0RFXG5cdC8vICAtIE9iamVjdFxuXHQvLyAgICAtIEFueVxuXHRyZXR1cm4gb3duZXIubm9kZVR5cGUgPT09IDEgfHwgb3duZXIubm9kZVR5cGUgPT09IDkgfHwgISggK293bmVyLm5vZGVUeXBlICk7XG59O1xuXG5cblxuXG5mdW5jdGlvbiBEYXRhKCkge1xuXHR0aGlzLmV4cGFuZG8gPSBqUXVlcnkuZXhwYW5kbyArIERhdGEudWlkKys7XG59XG5cbkRhdGEudWlkID0gMTtcblxuRGF0YS5wcm90b3R5cGUgPSB7XG5cblx0Y2FjaGU6IGZ1bmN0aW9uKCBvd25lciApIHtcblxuXHRcdC8vIENoZWNrIGlmIHRoZSBvd25lciBvYmplY3QgYWxyZWFkeSBoYXMgYSBjYWNoZVxuXHRcdHZhciB2YWx1ZSA9IG93bmVyWyB0aGlzLmV4cGFuZG8gXTtcblxuXHRcdC8vIElmIG5vdCwgY3JlYXRlIG9uZVxuXHRcdGlmICggIXZhbHVlICkge1xuXHRcdFx0dmFsdWUgPSB7fTtcblxuXHRcdFx0Ly8gV2UgY2FuIGFjY2VwdCBkYXRhIGZvciBub24tZWxlbWVudCBub2RlcyBpbiBtb2Rlcm4gYnJvd3NlcnMsXG5cdFx0XHQvLyBidXQgd2Ugc2hvdWxkIG5vdCwgc2VlICM4MzM1LlxuXHRcdFx0Ly8gQWx3YXlzIHJldHVybiBhbiBlbXB0eSBvYmplY3QuXG5cdFx0XHRpZiAoIGFjY2VwdERhdGEoIG93bmVyICkgKSB7XG5cblx0XHRcdFx0Ly8gSWYgaXQgaXMgYSBub2RlIHVubGlrZWx5IHRvIGJlIHN0cmluZ2lmeS1lZCBvciBsb29wZWQgb3ZlclxuXHRcdFx0XHQvLyB1c2UgcGxhaW4gYXNzaWdubWVudFxuXHRcdFx0XHRpZiAoIG93bmVyLm5vZGVUeXBlICkge1xuXHRcdFx0XHRcdG93bmVyWyB0aGlzLmV4cGFuZG8gXSA9IHZhbHVlO1xuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSBzZWN1cmUgaXQgaW4gYSBub24tZW51bWVyYWJsZSBwcm9wZXJ0eVxuXHRcdFx0XHQvLyBjb25maWd1cmFibGUgbXVzdCBiZSB0cnVlIHRvIGFsbG93IHRoZSBwcm9wZXJ0eSB0byBiZVxuXHRcdFx0XHQvLyBkZWxldGVkIHdoZW4gZGF0YSBpcyByZW1vdmVkXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBvd25lciwgdGhpcy5leHBhbmRvLCB7XG5cdFx0XHRcdFx0XHR2YWx1ZTogdmFsdWUsXG5cdFx0XHRcdFx0XHRjb25maWd1cmFibGU6IHRydWVcblx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWU7XG5cdH0sXG5cdHNldDogZnVuY3Rpb24oIG93bmVyLCBkYXRhLCB2YWx1ZSApIHtcblx0XHR2YXIgcHJvcCxcblx0XHRcdGNhY2hlID0gdGhpcy5jYWNoZSggb3duZXIgKTtcblxuXHRcdC8vIEhhbmRsZTogWyBvd25lciwga2V5LCB2YWx1ZSBdIGFyZ3Ncblx0XHQvLyBBbHdheXMgdXNlIGNhbWVsQ2FzZSBrZXkgKGdoLTIyNTcpXG5cdFx0aWYgKCB0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGNhY2hlWyBqUXVlcnkuY2FtZWxDYXNlKCBkYXRhICkgXSA9IHZhbHVlO1xuXG5cdFx0Ly8gSGFuZGxlOiBbIG93bmVyLCB7IHByb3BlcnRpZXMgfSBdIGFyZ3Ncblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBDb3B5IHRoZSBwcm9wZXJ0aWVzIG9uZS1ieS1vbmUgdG8gdGhlIGNhY2hlIG9iamVjdFxuXHRcdFx0Zm9yICggcHJvcCBpbiBkYXRhICkge1xuXHRcdFx0XHRjYWNoZVsgalF1ZXJ5LmNhbWVsQ2FzZSggcHJvcCApIF0gPSBkYXRhWyBwcm9wIF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBjYWNoZTtcblx0fSxcblx0Z2V0OiBmdW5jdGlvbiggb3duZXIsIGtleSApIHtcblx0XHRyZXR1cm4ga2V5ID09PSB1bmRlZmluZWQgP1xuXHRcdFx0dGhpcy5jYWNoZSggb3duZXIgKSA6XG5cblx0XHRcdC8vIEFsd2F5cyB1c2UgY2FtZWxDYXNlIGtleSAoZ2gtMjI1Nylcblx0XHRcdG93bmVyWyB0aGlzLmV4cGFuZG8gXSAmJiBvd25lclsgdGhpcy5leHBhbmRvIF1bIGpRdWVyeS5jYW1lbENhc2UoIGtleSApIF07XG5cdH0sXG5cdGFjY2VzczogZnVuY3Rpb24oIG93bmVyLCBrZXksIHZhbHVlICkge1xuXG5cdFx0Ly8gSW4gY2FzZXMgd2hlcmUgZWl0aGVyOlxuXHRcdC8vXG5cdFx0Ly8gICAxLiBObyBrZXkgd2FzIHNwZWNpZmllZFxuXHRcdC8vICAgMi4gQSBzdHJpbmcga2V5IHdhcyBzcGVjaWZpZWQsIGJ1dCBubyB2YWx1ZSBwcm92aWRlZFxuXHRcdC8vXG5cdFx0Ly8gVGFrZSB0aGUgXCJyZWFkXCIgcGF0aCBhbmQgYWxsb3cgdGhlIGdldCBtZXRob2QgdG8gZGV0ZXJtaW5lXG5cdFx0Ly8gd2hpY2ggdmFsdWUgdG8gcmV0dXJuLCByZXNwZWN0aXZlbHkgZWl0aGVyOlxuXHRcdC8vXG5cdFx0Ly8gICAxLiBUaGUgZW50aXJlIGNhY2hlIG9iamVjdFxuXHRcdC8vICAgMi4gVGhlIGRhdGEgc3RvcmVkIGF0IHRoZSBrZXlcblx0XHQvL1xuXHRcdGlmICgga2V5ID09PSB1bmRlZmluZWQgfHxcblx0XHRcdFx0KCAoIGtleSAmJiB0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiICkgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCApICkge1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5nZXQoIG93bmVyLCBrZXkgKTtcblx0XHR9XG5cblx0XHQvLyBXaGVuIHRoZSBrZXkgaXMgbm90IGEgc3RyaW5nLCBvciBib3RoIGEga2V5IGFuZCB2YWx1ZVxuXHRcdC8vIGFyZSBzcGVjaWZpZWQsIHNldCBvciBleHRlbmQgKGV4aXN0aW5nIG9iamVjdHMpIHdpdGggZWl0aGVyOlxuXHRcdC8vXG5cdFx0Ly8gICAxLiBBbiBvYmplY3Qgb2YgcHJvcGVydGllc1xuXHRcdC8vICAgMi4gQSBrZXkgYW5kIHZhbHVlXG5cdFx0Ly9cblx0XHR0aGlzLnNldCggb3duZXIsIGtleSwgdmFsdWUgKTtcblxuXHRcdC8vIFNpbmNlIHRoZSBcInNldFwiIHBhdGggY2FuIGhhdmUgdHdvIHBvc3NpYmxlIGVudHJ5IHBvaW50c1xuXHRcdC8vIHJldHVybiB0aGUgZXhwZWN0ZWQgZGF0YSBiYXNlZCBvbiB3aGljaCBwYXRoIHdhcyB0YWtlblsqXVxuXHRcdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiBrZXk7XG5cdH0sXG5cdHJlbW92ZTogZnVuY3Rpb24oIG93bmVyLCBrZXkgKSB7XG5cdFx0dmFyIGksXG5cdFx0XHRjYWNoZSA9IG93bmVyWyB0aGlzLmV4cGFuZG8gXTtcblxuXHRcdGlmICggY2FjaGUgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoIGtleSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHQvLyBTdXBwb3J0IGFycmF5IG9yIHNwYWNlIHNlcGFyYXRlZCBzdHJpbmcgb2Yga2V5c1xuXHRcdFx0aWYgKCBBcnJheS5pc0FycmF5KCBrZXkgKSApIHtcblxuXHRcdFx0XHQvLyBJZiBrZXkgaXMgYW4gYXJyYXkgb2Yga2V5cy4uLlxuXHRcdFx0XHQvLyBXZSBhbHdheXMgc2V0IGNhbWVsQ2FzZSBrZXlzLCBzbyByZW1vdmUgdGhhdC5cblx0XHRcdFx0a2V5ID0ga2V5Lm1hcCggalF1ZXJ5LmNhbWVsQ2FzZSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0a2V5ID0galF1ZXJ5LmNhbWVsQ2FzZSgga2V5ICk7XG5cblx0XHRcdFx0Ly8gSWYgYSBrZXkgd2l0aCB0aGUgc3BhY2VzIGV4aXN0cywgdXNlIGl0LlxuXHRcdFx0XHQvLyBPdGhlcndpc2UsIGNyZWF0ZSBhbiBhcnJheSBieSBtYXRjaGluZyBub24td2hpdGVzcGFjZVxuXHRcdFx0XHRrZXkgPSBrZXkgaW4gY2FjaGUgP1xuXHRcdFx0XHRcdFsga2V5IF0gOlxuXHRcdFx0XHRcdCgga2V5Lm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgW10gKTtcblx0XHRcdH1cblxuXHRcdFx0aSA9IGtleS5sZW5ndGg7XG5cblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRkZWxldGUgY2FjaGVbIGtleVsgaSBdIF07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUmVtb3ZlIHRoZSBleHBhbmRvIGlmIHRoZXJlJ3Mgbm8gbW9yZSBkYXRhXG5cdFx0aWYgKCBrZXkgPT09IHVuZGVmaW5lZCB8fCBqUXVlcnkuaXNFbXB0eU9iamVjdCggY2FjaGUgKSApIHtcblxuXHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lIDw9MzUgLSA0NVxuXHRcdFx0Ly8gV2Via2l0ICYgQmxpbmsgcGVyZm9ybWFuY2Ugc3VmZmVycyB3aGVuIGRlbGV0aW5nIHByb3BlcnRpZXNcblx0XHRcdC8vIGZyb20gRE9NIG5vZGVzLCBzbyBzZXQgdG8gdW5kZWZpbmVkIGluc3RlYWRcblx0XHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTM3ODYwNyAoYnVnIHJlc3RyaWN0ZWQpXG5cdFx0XHRpZiAoIG93bmVyLm5vZGVUeXBlICkge1xuXHRcdFx0XHRvd25lclsgdGhpcy5leHBhbmRvIF0gPSB1bmRlZmluZWQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWxldGUgb3duZXJbIHRoaXMuZXhwYW5kbyBdO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0aGFzRGF0YTogZnVuY3Rpb24oIG93bmVyICkge1xuXHRcdHZhciBjYWNoZSA9IG93bmVyWyB0aGlzLmV4cGFuZG8gXTtcblx0XHRyZXR1cm4gY2FjaGUgIT09IHVuZGVmaW5lZCAmJiAhalF1ZXJ5LmlzRW1wdHlPYmplY3QoIGNhY2hlICk7XG5cdH1cbn07XG52YXIgZGF0YVByaXYgPSBuZXcgRGF0YSgpO1xuXG52YXIgZGF0YVVzZXIgPSBuZXcgRGF0YSgpO1xuXG5cblxuLy9cdEltcGxlbWVudGF0aW9uIFN1bW1hcnlcbi8vXG4vL1x0MS4gRW5mb3JjZSBBUEkgc3VyZmFjZSBhbmQgc2VtYW50aWMgY29tcGF0aWJpbGl0eSB3aXRoIDEuOS54IGJyYW5jaFxuLy9cdDIuIEltcHJvdmUgdGhlIG1vZHVsZSdzIG1haW50YWluYWJpbGl0eSBieSByZWR1Y2luZyB0aGUgc3RvcmFnZVxuLy9cdFx0cGF0aHMgdG8gYSBzaW5nbGUgbWVjaGFuaXNtLlxuLy9cdDMuIFVzZSB0aGUgc2FtZSBzaW5nbGUgbWVjaGFuaXNtIHRvIHN1cHBvcnQgXCJwcml2YXRlXCIgYW5kIFwidXNlclwiIGRhdGEuXG4vL1x0NC4gX05ldmVyXyBleHBvc2UgXCJwcml2YXRlXCIgZGF0YSB0byB1c2VyIGNvZGUgKFRPRE86IERyb3AgX2RhdGEsIF9yZW1vdmVEYXRhKVxuLy9cdDUuIEF2b2lkIGV4cG9zaW5nIGltcGxlbWVudGF0aW9uIGRldGFpbHMgb24gdXNlciBvYmplY3RzIChlZy4gZXhwYW5kbyBwcm9wZXJ0aWVzKVxuLy9cdDYuIFByb3ZpZGUgYSBjbGVhciBwYXRoIGZvciBpbXBsZW1lbnRhdGlvbiB1cGdyYWRlIHRvIFdlYWtNYXAgaW4gMjAxNFxuXG52YXIgcmJyYWNlID0gL14oPzpcXHtbXFx3XFxXXSpcXH18XFxbW1xcd1xcV10qXFxdKSQvLFxuXHRybXVsdGlEYXNoID0gL1tBLVpdL2c7XG5cbmZ1bmN0aW9uIGdldERhdGEoIGRhdGEgKSB7XG5cdGlmICggZGF0YSA9PT0gXCJ0cnVlXCIgKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRpZiAoIGRhdGEgPT09IFwiZmFsc2VcIiApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRpZiAoIGRhdGEgPT09IFwibnVsbFwiICkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Ly8gT25seSBjb252ZXJ0IHRvIGEgbnVtYmVyIGlmIGl0IGRvZXNuJ3QgY2hhbmdlIHRoZSBzdHJpbmdcblx0aWYgKCBkYXRhID09PSArZGF0YSArIFwiXCIgKSB7XG5cdFx0cmV0dXJuICtkYXRhO1xuXHR9XG5cblx0aWYgKCByYnJhY2UudGVzdCggZGF0YSApICkge1xuXHRcdHJldHVybiBKU09OLnBhcnNlKCBkYXRhICk7XG5cdH1cblxuXHRyZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gZGF0YUF0dHIoIGVsZW0sIGtleSwgZGF0YSApIHtcblx0dmFyIG5hbWU7XG5cblx0Ly8gSWYgbm90aGluZyB3YXMgZm91bmQgaW50ZXJuYWxseSwgdHJ5IHRvIGZldGNoIGFueVxuXHQvLyBkYXRhIGZyb20gdGhlIEhUTUw1IGRhdGEtKiBhdHRyaWJ1dGVcblx0aWYgKCBkYXRhID09PSB1bmRlZmluZWQgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRuYW1lID0gXCJkYXRhLVwiICsga2V5LnJlcGxhY2UoIHJtdWx0aURhc2gsIFwiLSQmXCIgKS50b0xvd2VyQ2FzZSgpO1xuXHRcdGRhdGEgPSBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSApO1xuXG5cdFx0aWYgKCB0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGRhdGEgPSBnZXREYXRhKCBkYXRhICk7XG5cdFx0XHR9IGNhdGNoICggZSApIHt9XG5cblx0XHRcdC8vIE1ha2Ugc3VyZSB3ZSBzZXQgdGhlIGRhdGEgc28gaXQgaXNuJ3QgY2hhbmdlZCBsYXRlclxuXHRcdFx0ZGF0YVVzZXIuc2V0KCBlbGVtLCBrZXksIGRhdGEgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGF0YSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGRhdGE7XG59XG5cbmpRdWVyeS5leHRlbmQoIHtcblx0aGFzRGF0YTogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGRhdGFVc2VyLmhhc0RhdGEoIGVsZW0gKSB8fCBkYXRhUHJpdi5oYXNEYXRhKCBlbGVtICk7XG5cdH0sXG5cblx0ZGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIGRhdGFVc2VyLmFjY2VzcyggZWxlbSwgbmFtZSwgZGF0YSApO1xuXHR9LFxuXG5cdHJlbW92ZURhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuXHRcdGRhdGFVc2VyLnJlbW92ZSggZWxlbSwgbmFtZSApO1xuXHR9LFxuXG5cdC8vIFRPRE86IE5vdyB0aGF0IGFsbCBjYWxscyB0byBfZGF0YSBhbmQgX3JlbW92ZURhdGEgaGF2ZSBiZWVuIHJlcGxhY2VkXG5cdC8vIHdpdGggZGlyZWN0IGNhbGxzIHRvIGRhdGFQcml2IG1ldGhvZHMsIHRoZXNlIGNhbiBiZSBkZXByZWNhdGVkLlxuXHRfZGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIGRhdGFQcml2LmFjY2VzcyggZWxlbSwgbmFtZSwgZGF0YSApO1xuXHR9LFxuXG5cdF9yZW1vdmVEYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcblx0XHRkYXRhUHJpdi5yZW1vdmUoIGVsZW0sIG5hbWUgKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGRhdGE6IGZ1bmN0aW9uKCBrZXksIHZhbHVlICkge1xuXHRcdHZhciBpLCBuYW1lLCBkYXRhLFxuXHRcdFx0ZWxlbSA9IHRoaXNbIDAgXSxcblx0XHRcdGF0dHJzID0gZWxlbSAmJiBlbGVtLmF0dHJpYnV0ZXM7XG5cblx0XHQvLyBHZXRzIGFsbCB2YWx1ZXNcblx0XHRpZiAoIGtleSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0aWYgKCB0aGlzLmxlbmd0aCApIHtcblx0XHRcdFx0ZGF0YSA9IGRhdGFVc2VyLmdldCggZWxlbSApO1xuXG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAhZGF0YVByaXYuZ2V0KCBlbGVtLCBcImhhc0RhdGFBdHRyc1wiICkgKSB7XG5cdFx0XHRcdFx0aSA9IGF0dHJzLmxlbmd0aDtcblx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgMTEgb25seVxuXHRcdFx0XHRcdFx0Ly8gVGhlIGF0dHJzIGVsZW1lbnRzIGNhbiBiZSBudWxsICgjMTQ4OTQpXG5cdFx0XHRcdFx0XHRpZiAoIGF0dHJzWyBpIF0gKSB7XG5cdFx0XHRcdFx0XHRcdG5hbWUgPSBhdHRyc1sgaSBdLm5hbWU7XG5cdFx0XHRcdFx0XHRcdGlmICggbmFtZS5pbmRleE9mKCBcImRhdGEtXCIgKSA9PT0gMCApIHtcblx0XHRcdFx0XHRcdFx0XHRuYW1lID0galF1ZXJ5LmNhbWVsQ2FzZSggbmFtZS5zbGljZSggNSApICk7XG5cdFx0XHRcdFx0XHRcdFx0ZGF0YUF0dHIoIGVsZW0sIG5hbWUsIGRhdGFbIG5hbWUgXSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRhdGFQcml2LnNldCggZWxlbSwgXCJoYXNEYXRhQXR0cnNcIiwgdHJ1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH1cblxuXHRcdC8vIFNldHMgbXVsdGlwbGUgdmFsdWVzXG5cdFx0aWYgKCB0eXBlb2Yga2V5ID09PSBcIm9iamVjdFwiICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGRhdGFVc2VyLnNldCggdGhpcywga2V5ICk7XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0dmFyIGRhdGE7XG5cblx0XHRcdC8vIFRoZSBjYWxsaW5nIGpRdWVyeSBvYmplY3QgKGVsZW1lbnQgbWF0Y2hlcykgaXMgbm90IGVtcHR5XG5cdFx0XHQvLyAoYW5kIHRoZXJlZm9yZSBoYXMgYW4gZWxlbWVudCBhcHBlYXJzIGF0IHRoaXNbIDAgXSkgYW5kIHRoZVxuXHRcdFx0Ly8gYHZhbHVlYCBwYXJhbWV0ZXIgd2FzIG5vdCB1bmRlZmluZWQuIEFuIGVtcHR5IGpRdWVyeSBvYmplY3Rcblx0XHRcdC8vIHdpbGwgcmVzdWx0IGluIGB1bmRlZmluZWRgIGZvciBlbGVtID0gdGhpc1sgMCBdIHdoaWNoIHdpbGxcblx0XHRcdC8vIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhbiBhdHRlbXB0IHRvIHJlYWQgYSBkYXRhIGNhY2hlIGlzIG1hZGUuXG5cdFx0XHRpZiAoIGVsZW0gJiYgdmFsdWUgPT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHQvLyBBdHRlbXB0IHRvIGdldCBkYXRhIGZyb20gdGhlIGNhY2hlXG5cdFx0XHRcdC8vIFRoZSBrZXkgd2lsbCBhbHdheXMgYmUgY2FtZWxDYXNlZCBpbiBEYXRhXG5cdFx0XHRcdGRhdGEgPSBkYXRhVXNlci5nZXQoIGVsZW0sIGtleSApO1xuXHRcdFx0XHRpZiAoIGRhdGEgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRyZXR1cm4gZGF0YTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEF0dGVtcHQgdG8gXCJkaXNjb3ZlclwiIHRoZSBkYXRhIGluXG5cdFx0XHRcdC8vIEhUTUw1IGN1c3RvbSBkYXRhLSogYXR0cnNcblx0XHRcdFx0ZGF0YSA9IGRhdGFBdHRyKCBlbGVtLCBrZXkgKTtcblx0XHRcdFx0aWYgKCBkYXRhICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBXZSB0cmllZCByZWFsbHkgaGFyZCwgYnV0IHRoZSBkYXRhIGRvZXNuJ3QgZXhpc3QuXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IHRoZSBkYXRhLi4uXG5cdFx0XHR0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdC8vIFdlIGFsd2F5cyBzdG9yZSB0aGUgY2FtZWxDYXNlZCBrZXlcblx0XHRcdFx0ZGF0YVVzZXIuc2V0KCB0aGlzLCBrZXksIHZhbHVlICk7XG5cdFx0XHR9ICk7XG5cdFx0fSwgbnVsbCwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxLCBudWxsLCB0cnVlICk7XG5cdH0sXG5cblx0cmVtb3ZlRGF0YTogZnVuY3Rpb24oIGtleSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGRhdGFVc2VyLnJlbW92ZSggdGhpcywga2V5ICk7XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cblxualF1ZXJ5LmV4dGVuZCgge1xuXHRxdWV1ZTogZnVuY3Rpb24oIGVsZW0sIHR5cGUsIGRhdGEgKSB7XG5cdFx0dmFyIHF1ZXVlO1xuXG5cdFx0aWYgKCBlbGVtICkge1xuXHRcdFx0dHlwZSA9ICggdHlwZSB8fCBcImZ4XCIgKSArIFwicXVldWVcIjtcblx0XHRcdHF1ZXVlID0gZGF0YVByaXYuZ2V0KCBlbGVtLCB0eXBlICk7XG5cblx0XHRcdC8vIFNwZWVkIHVwIGRlcXVldWUgYnkgZ2V0dGluZyBvdXQgcXVpY2tseSBpZiB0aGlzIGlzIGp1c3QgYSBsb29rdXBcblx0XHRcdGlmICggZGF0YSApIHtcblx0XHRcdFx0aWYgKCAhcXVldWUgfHwgQXJyYXkuaXNBcnJheSggZGF0YSApICkge1xuXHRcdFx0XHRcdHF1ZXVlID0gZGF0YVByaXYuYWNjZXNzKCBlbGVtLCB0eXBlLCBqUXVlcnkubWFrZUFycmF5KCBkYXRhICkgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRxdWV1ZS5wdXNoKCBkYXRhICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBxdWV1ZSB8fCBbXTtcblx0XHR9XG5cdH0sXG5cblx0ZGVxdWV1ZTogZnVuY3Rpb24oIGVsZW0sIHR5cGUgKSB7XG5cdFx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG5cdFx0dmFyIHF1ZXVlID0galF1ZXJ5LnF1ZXVlKCBlbGVtLCB0eXBlICksXG5cdFx0XHRzdGFydExlbmd0aCA9IHF1ZXVlLmxlbmd0aCxcblx0XHRcdGZuID0gcXVldWUuc2hpZnQoKSxcblx0XHRcdGhvb2tzID0galF1ZXJ5Ll9xdWV1ZUhvb2tzKCBlbGVtLCB0eXBlICksXG5cdFx0XHRuZXh0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGpRdWVyeS5kZXF1ZXVlKCBlbGVtLCB0eXBlICk7XG5cdFx0XHR9O1xuXG5cdFx0Ly8gSWYgdGhlIGZ4IHF1ZXVlIGlzIGRlcXVldWVkLCBhbHdheXMgcmVtb3ZlIHRoZSBwcm9ncmVzcyBzZW50aW5lbFxuXHRcdGlmICggZm4gPT09IFwiaW5wcm9ncmVzc1wiICkge1xuXHRcdFx0Zm4gPSBxdWV1ZS5zaGlmdCgpO1xuXHRcdFx0c3RhcnRMZW5ndGgtLTtcblx0XHR9XG5cblx0XHRpZiAoIGZuICkge1xuXG5cdFx0XHQvLyBBZGQgYSBwcm9ncmVzcyBzZW50aW5lbCB0byBwcmV2ZW50IHRoZSBmeCBxdWV1ZSBmcm9tIGJlaW5nXG5cdFx0XHQvLyBhdXRvbWF0aWNhbGx5IGRlcXVldWVkXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwiZnhcIiApIHtcblx0XHRcdFx0cXVldWUudW5zaGlmdCggXCJpbnByb2dyZXNzXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2xlYXIgdXAgdGhlIGxhc3QgcXVldWUgc3RvcCBmdW5jdGlvblxuXHRcdFx0ZGVsZXRlIGhvb2tzLnN0b3A7XG5cdFx0XHRmbi5jYWxsKCBlbGVtLCBuZXh0LCBob29rcyApO1xuXHRcdH1cblxuXHRcdGlmICggIXN0YXJ0TGVuZ3RoICYmIGhvb2tzICkge1xuXHRcdFx0aG9va3MuZW1wdHkuZmlyZSgpO1xuXHRcdH1cblx0fSxcblxuXHQvLyBOb3QgcHVibGljIC0gZ2VuZXJhdGUgYSBxdWV1ZUhvb2tzIG9iamVjdCwgb3IgcmV0dXJuIHRoZSBjdXJyZW50IG9uZVxuXHRfcXVldWVIb29rczogZnVuY3Rpb24oIGVsZW0sIHR5cGUgKSB7XG5cdFx0dmFyIGtleSA9IHR5cGUgKyBcInF1ZXVlSG9va3NcIjtcblx0XHRyZXR1cm4gZGF0YVByaXYuZ2V0KCBlbGVtLCBrZXkgKSB8fCBkYXRhUHJpdi5hY2Nlc3MoIGVsZW0sIGtleSwge1xuXHRcdFx0ZW1wdHk6IGpRdWVyeS5DYWxsYmFja3MoIFwib25jZSBtZW1vcnlcIiApLmFkZCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGRhdGFQcml2LnJlbW92ZSggZWxlbSwgWyB0eXBlICsgXCJxdWV1ZVwiLCBrZXkgXSApO1xuXHRcdFx0fSApXG5cdFx0fSApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0cXVldWU6IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xuXHRcdHZhciBzZXR0ZXIgPSAyO1xuXG5cdFx0aWYgKCB0eXBlb2YgdHlwZSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGRhdGEgPSB0eXBlO1xuXHRcdFx0dHlwZSA9IFwiZnhcIjtcblx0XHRcdHNldHRlci0tO1xuXHRcdH1cblxuXHRcdGlmICggYXJndW1lbnRzLmxlbmd0aCA8IHNldHRlciApIHtcblx0XHRcdHJldHVybiBqUXVlcnkucXVldWUoIHRoaXNbIDAgXSwgdHlwZSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBkYXRhID09PSB1bmRlZmluZWQgP1xuXHRcdFx0dGhpcyA6XG5cdFx0XHR0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgcXVldWUgPSBqUXVlcnkucXVldWUoIHRoaXMsIHR5cGUsIGRhdGEgKTtcblxuXHRcdFx0XHQvLyBFbnN1cmUgYSBob29rcyBmb3IgdGhpcyBxdWV1ZVxuXHRcdFx0XHRqUXVlcnkuX3F1ZXVlSG9va3MoIHRoaXMsIHR5cGUgKTtcblxuXHRcdFx0XHRpZiAoIHR5cGUgPT09IFwiZnhcIiAmJiBxdWV1ZVsgMCBdICE9PSBcImlucHJvZ3Jlc3NcIiApIHtcblx0XHRcdFx0XHRqUXVlcnkuZGVxdWV1ZSggdGhpcywgdHlwZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9ICk7XG5cdH0sXG5cdGRlcXVldWU6IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5LmRlcXVldWUoIHRoaXMsIHR5cGUgKTtcblx0XHR9ICk7XG5cdH0sXG5cdGNsZWFyUXVldWU6IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdHJldHVybiB0aGlzLnF1ZXVlKCB0eXBlIHx8IFwiZnhcIiwgW10gKTtcblx0fSxcblxuXHQvLyBHZXQgYSBwcm9taXNlIHJlc29sdmVkIHdoZW4gcXVldWVzIG9mIGEgY2VydGFpbiB0eXBlXG5cdC8vIGFyZSBlbXB0aWVkIChmeCBpcyB0aGUgdHlwZSBieSBkZWZhdWx0KVxuXHRwcm9taXNlOiBmdW5jdGlvbiggdHlwZSwgb2JqICkge1xuXHRcdHZhciB0bXAsXG5cdFx0XHRjb3VudCA9IDEsXG5cdFx0XHRkZWZlciA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuXHRcdFx0ZWxlbWVudHMgPSB0aGlzLFxuXHRcdFx0aSA9IHRoaXMubGVuZ3RoLFxuXHRcdFx0cmVzb2x2ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoICEoIC0tY291bnQgKSApIHtcblx0XHRcdFx0XHRkZWZlci5yZXNvbHZlV2l0aCggZWxlbWVudHMsIFsgZWxlbWVudHMgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0aWYgKCB0eXBlb2YgdHlwZSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdG9iaiA9IHR5cGU7XG5cdFx0XHR0eXBlID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHR0eXBlID0gdHlwZSB8fCBcImZ4XCI7XG5cblx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdHRtcCA9IGRhdGFQcml2LmdldCggZWxlbWVudHNbIGkgXSwgdHlwZSArIFwicXVldWVIb29rc1wiICk7XG5cdFx0XHRpZiAoIHRtcCAmJiB0bXAuZW1wdHkgKSB7XG5cdFx0XHRcdGNvdW50Kys7XG5cdFx0XHRcdHRtcC5lbXB0eS5hZGQoIHJlc29sdmUgKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmVzb2x2ZSgpO1xuXHRcdHJldHVybiBkZWZlci5wcm9taXNlKCBvYmogKTtcblx0fVxufSApO1xudmFyIHBudW0gPSAoIC9bKy1dPyg/OlxcZCpcXC58KVxcZCsoPzpbZUVdWystXT9cXGQrfCkvICkuc291cmNlO1xuXG52YXIgcmNzc051bSA9IG5ldyBSZWdFeHAoIFwiXig/OihbKy1dKT18KShcIiArIHBudW0gKyBcIikoW2EteiVdKikkXCIsIFwiaVwiICk7XG5cblxudmFyIGNzc0V4cGFuZCA9IFsgXCJUb3BcIiwgXCJSaWdodFwiLCBcIkJvdHRvbVwiLCBcIkxlZnRcIiBdO1xuXG52YXIgaXNIaWRkZW5XaXRoaW5UcmVlID0gZnVuY3Rpb24oIGVsZW0sIGVsICkge1xuXG5cdFx0Ly8gaXNIaWRkZW5XaXRoaW5UcmVlIG1pZ2h0IGJlIGNhbGxlZCBmcm9tIGpRdWVyeSNmaWx0ZXIgZnVuY3Rpb247XG5cdFx0Ly8gaW4gdGhhdCBjYXNlLCBlbGVtZW50IHdpbGwgYmUgc2Vjb25kIGFyZ3VtZW50XG5cdFx0ZWxlbSA9IGVsIHx8IGVsZW07XG5cblx0XHQvLyBJbmxpbmUgc3R5bGUgdHJ1bXBzIGFsbFxuXHRcdHJldHVybiBlbGVtLnN0eWxlLmRpc3BsYXkgPT09IFwibm9uZVwiIHx8XG5cdFx0XHRlbGVtLnN0eWxlLmRpc3BsYXkgPT09IFwiXCIgJiZcblxuXHRcdFx0Ly8gT3RoZXJ3aXNlLCBjaGVjayBjb21wdXRlZCBzdHlsZVxuXHRcdFx0Ly8gU3VwcG9ydDogRmlyZWZveCA8PTQzIC0gNDVcblx0XHRcdC8vIERpc2Nvbm5lY3RlZCBlbGVtZW50cyBjYW4gaGF2ZSBjb21wdXRlZCBkaXNwbGF5OiBub25lLCBzbyBmaXJzdCBjb25maXJtIHRoYXQgZWxlbSBpc1xuXHRcdFx0Ly8gaW4gdGhlIGRvY3VtZW50LlxuXHRcdFx0alF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKSAmJlxuXG5cdFx0XHRqUXVlcnkuY3NzKCBlbGVtLCBcImRpc3BsYXlcIiApID09PSBcIm5vbmVcIjtcblx0fTtcblxudmFyIHN3YXAgPSBmdW5jdGlvbiggZWxlbSwgb3B0aW9ucywgY2FsbGJhY2ssIGFyZ3MgKSB7XG5cdHZhciByZXQsIG5hbWUsXG5cdFx0b2xkID0ge307XG5cblx0Ly8gUmVtZW1iZXIgdGhlIG9sZCB2YWx1ZXMsIGFuZCBpbnNlcnQgdGhlIG5ldyBvbmVzXG5cdGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcblx0XHRvbGRbIG5hbWUgXSA9IGVsZW0uc3R5bGVbIG5hbWUgXTtcblx0XHRlbGVtLnN0eWxlWyBuYW1lIF0gPSBvcHRpb25zWyBuYW1lIF07XG5cdH1cblxuXHRyZXQgPSBjYWxsYmFjay5hcHBseSggZWxlbSwgYXJncyB8fCBbXSApO1xuXG5cdC8vIFJldmVydCB0aGUgb2xkIHZhbHVlc1xuXHRmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG5cdFx0ZWxlbS5zdHlsZVsgbmFtZSBdID0gb2xkWyBuYW1lIF07XG5cdH1cblxuXHRyZXR1cm4gcmV0O1xufTtcblxuXG5cblxuZnVuY3Rpb24gYWRqdXN0Q1NTKCBlbGVtLCBwcm9wLCB2YWx1ZVBhcnRzLCB0d2VlbiApIHtcblx0dmFyIGFkanVzdGVkLFxuXHRcdHNjYWxlID0gMSxcblx0XHRtYXhJdGVyYXRpb25zID0gMjAsXG5cdFx0Y3VycmVudFZhbHVlID0gdHdlZW4gP1xuXHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiB0d2Vlbi5jdXIoKTtcblx0XHRcdH0gOlxuXHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBqUXVlcnkuY3NzKCBlbGVtLCBwcm9wLCBcIlwiICk7XG5cdFx0XHR9LFxuXHRcdGluaXRpYWwgPSBjdXJyZW50VmFsdWUoKSxcblx0XHR1bml0ID0gdmFsdWVQYXJ0cyAmJiB2YWx1ZVBhcnRzWyAzIF0gfHwgKCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gPyBcIlwiIDogXCJweFwiICksXG5cblx0XHQvLyBTdGFydGluZyB2YWx1ZSBjb21wdXRhdGlvbiBpcyByZXF1aXJlZCBmb3IgcG90ZW50aWFsIHVuaXQgbWlzbWF0Y2hlc1xuXHRcdGluaXRpYWxJblVuaXQgPSAoIGpRdWVyeS5jc3NOdW1iZXJbIHByb3AgXSB8fCB1bml0ICE9PSBcInB4XCIgJiYgK2luaXRpYWwgKSAmJlxuXHRcdFx0cmNzc051bS5leGVjKCBqUXVlcnkuY3NzKCBlbGVtLCBwcm9wICkgKTtcblxuXHRpZiAoIGluaXRpYWxJblVuaXQgJiYgaW5pdGlhbEluVW5pdFsgMyBdICE9PSB1bml0ICkge1xuXG5cdFx0Ly8gVHJ1c3QgdW5pdHMgcmVwb3J0ZWQgYnkgalF1ZXJ5LmNzc1xuXHRcdHVuaXQgPSB1bml0IHx8IGluaXRpYWxJblVuaXRbIDMgXTtcblxuXHRcdC8vIE1ha2Ugc3VyZSB3ZSB1cGRhdGUgdGhlIHR3ZWVuIHByb3BlcnRpZXMgbGF0ZXIgb25cblx0XHR2YWx1ZVBhcnRzID0gdmFsdWVQYXJ0cyB8fCBbXTtcblxuXHRcdC8vIEl0ZXJhdGl2ZWx5IGFwcHJveGltYXRlIGZyb20gYSBub256ZXJvIHN0YXJ0aW5nIHBvaW50XG5cdFx0aW5pdGlhbEluVW5pdCA9ICtpbml0aWFsIHx8IDE7XG5cblx0XHRkbyB7XG5cblx0XHRcdC8vIElmIHByZXZpb3VzIGl0ZXJhdGlvbiB6ZXJvZWQgb3V0LCBkb3VibGUgdW50aWwgd2UgZ2V0ICpzb21ldGhpbmcqLlxuXHRcdFx0Ly8gVXNlIHN0cmluZyBmb3IgZG91Ymxpbmcgc28gd2UgZG9uJ3QgYWNjaWRlbnRhbGx5IHNlZSBzY2FsZSBhcyB1bmNoYW5nZWQgYmVsb3dcblx0XHRcdHNjYWxlID0gc2NhbGUgfHwgXCIuNVwiO1xuXG5cdFx0XHQvLyBBZGp1c3QgYW5kIGFwcGx5XG5cdFx0XHRpbml0aWFsSW5Vbml0ID0gaW5pdGlhbEluVW5pdCAvIHNjYWxlO1xuXHRcdFx0alF1ZXJ5LnN0eWxlKCBlbGVtLCBwcm9wLCBpbml0aWFsSW5Vbml0ICsgdW5pdCApO1xuXG5cdFx0Ly8gVXBkYXRlIHNjYWxlLCB0b2xlcmF0aW5nIHplcm8gb3IgTmFOIGZyb20gdHdlZW4uY3VyKClcblx0XHQvLyBCcmVhayB0aGUgbG9vcCBpZiBzY2FsZSBpcyB1bmNoYW5nZWQgb3IgcGVyZmVjdCwgb3IgaWYgd2UndmUganVzdCBoYWQgZW5vdWdoLlxuXHRcdH0gd2hpbGUgKFxuXHRcdFx0c2NhbGUgIT09ICggc2NhbGUgPSBjdXJyZW50VmFsdWUoKSAvIGluaXRpYWwgKSAmJiBzY2FsZSAhPT0gMSAmJiAtLW1heEl0ZXJhdGlvbnNcblx0XHQpO1xuXHR9XG5cblx0aWYgKCB2YWx1ZVBhcnRzICkge1xuXHRcdGluaXRpYWxJblVuaXQgPSAraW5pdGlhbEluVW5pdCB8fCAraW5pdGlhbCB8fCAwO1xuXG5cdFx0Ly8gQXBwbHkgcmVsYXRpdmUgb2Zmc2V0ICgrPS8tPSkgaWYgc3BlY2lmaWVkXG5cdFx0YWRqdXN0ZWQgPSB2YWx1ZVBhcnRzWyAxIF0gP1xuXHRcdFx0aW5pdGlhbEluVW5pdCArICggdmFsdWVQYXJ0c1sgMSBdICsgMSApICogdmFsdWVQYXJ0c1sgMiBdIDpcblx0XHRcdCt2YWx1ZVBhcnRzWyAyIF07XG5cdFx0aWYgKCB0d2VlbiApIHtcblx0XHRcdHR3ZWVuLnVuaXQgPSB1bml0O1xuXHRcdFx0dHdlZW4uc3RhcnQgPSBpbml0aWFsSW5Vbml0O1xuXHRcdFx0dHdlZW4uZW5kID0gYWRqdXN0ZWQ7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBhZGp1c3RlZDtcbn1cblxuXG52YXIgZGVmYXVsdERpc3BsYXlNYXAgPSB7fTtcblxuZnVuY3Rpb24gZ2V0RGVmYXVsdERpc3BsYXkoIGVsZW0gKSB7XG5cdHZhciB0ZW1wLFxuXHRcdGRvYyA9IGVsZW0ub3duZXJEb2N1bWVudCxcblx0XHRub2RlTmFtZSA9IGVsZW0ubm9kZU5hbWUsXG5cdFx0ZGlzcGxheSA9IGRlZmF1bHREaXNwbGF5TWFwWyBub2RlTmFtZSBdO1xuXG5cdGlmICggZGlzcGxheSApIHtcblx0XHRyZXR1cm4gZGlzcGxheTtcblx0fVxuXG5cdHRlbXAgPSBkb2MuYm9keS5hcHBlbmRDaGlsZCggZG9jLmNyZWF0ZUVsZW1lbnQoIG5vZGVOYW1lICkgKTtcblx0ZGlzcGxheSA9IGpRdWVyeS5jc3MoIHRlbXAsIFwiZGlzcGxheVwiICk7XG5cblx0dGVtcC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCB0ZW1wICk7XG5cblx0aWYgKCBkaXNwbGF5ID09PSBcIm5vbmVcIiApIHtcblx0XHRkaXNwbGF5ID0gXCJibG9ja1wiO1xuXHR9XG5cdGRlZmF1bHREaXNwbGF5TWFwWyBub2RlTmFtZSBdID0gZGlzcGxheTtcblxuXHRyZXR1cm4gZGlzcGxheTtcbn1cblxuZnVuY3Rpb24gc2hvd0hpZGUoIGVsZW1lbnRzLCBzaG93ICkge1xuXHR2YXIgZGlzcGxheSwgZWxlbSxcblx0XHR2YWx1ZXMgPSBbXSxcblx0XHRpbmRleCA9IDAsXG5cdFx0bGVuZ3RoID0gZWxlbWVudHMubGVuZ3RoO1xuXG5cdC8vIERldGVybWluZSBuZXcgZGlzcGxheSB2YWx1ZSBmb3IgZWxlbWVudHMgdGhhdCBuZWVkIHRvIGNoYW5nZVxuXHRmb3IgKCA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuXHRcdGVsZW0gPSBlbGVtZW50c1sgaW5kZXggXTtcblx0XHRpZiAoICFlbGVtLnN0eWxlICkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0ZGlzcGxheSA9IGVsZW0uc3R5bGUuZGlzcGxheTtcblx0XHRpZiAoIHNob3cgKSB7XG5cblx0XHRcdC8vIFNpbmNlIHdlIGZvcmNlIHZpc2liaWxpdHkgdXBvbiBjYXNjYWRlLWhpZGRlbiBlbGVtZW50cywgYW4gaW1tZWRpYXRlIChhbmQgc2xvdylcblx0XHRcdC8vIGNoZWNrIGlzIHJlcXVpcmVkIGluIHRoaXMgZmlyc3QgbG9vcCB1bmxlc3Mgd2UgaGF2ZSBhIG5vbmVtcHR5IGRpc3BsYXkgdmFsdWUgKGVpdGhlclxuXHRcdFx0Ly8gaW5saW5lIG9yIGFib3V0LXRvLWJlLXJlc3RvcmVkKVxuXHRcdFx0aWYgKCBkaXNwbGF5ID09PSBcIm5vbmVcIiApIHtcblx0XHRcdFx0dmFsdWVzWyBpbmRleCBdID0gZGF0YVByaXYuZ2V0KCBlbGVtLCBcImRpc3BsYXlcIiApIHx8IG51bGw7XG5cdFx0XHRcdGlmICggIXZhbHVlc1sgaW5kZXggXSApIHtcblx0XHRcdFx0XHRlbGVtLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGVsZW0uc3R5bGUuZGlzcGxheSA9PT0gXCJcIiAmJiBpc0hpZGRlbldpdGhpblRyZWUoIGVsZW0gKSApIHtcblx0XHRcdFx0dmFsdWVzWyBpbmRleCBdID0gZ2V0RGVmYXVsdERpc3BsYXkoIGVsZW0gKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKCBkaXNwbGF5ICE9PSBcIm5vbmVcIiApIHtcblx0XHRcdFx0dmFsdWVzWyBpbmRleCBdID0gXCJub25lXCI7XG5cblx0XHRcdFx0Ly8gUmVtZW1iZXIgd2hhdCB3ZSdyZSBvdmVyd3JpdGluZ1xuXHRcdFx0XHRkYXRhUHJpdi5zZXQoIGVsZW0sIFwiZGlzcGxheVwiLCBkaXNwbGF5ICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gU2V0IHRoZSBkaXNwbGF5IG9mIHRoZSBlbGVtZW50cyBpbiBhIHNlY29uZCBsb29wIHRvIGF2b2lkIGNvbnN0YW50IHJlZmxvd1xuXHRmb3IgKCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuXHRcdGlmICggdmFsdWVzWyBpbmRleCBdICE9IG51bGwgKSB7XG5cdFx0XHRlbGVtZW50c1sgaW5kZXggXS5zdHlsZS5kaXNwbGF5ID0gdmFsdWVzWyBpbmRleCBdO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBlbGVtZW50cztcbn1cblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRzaG93OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gc2hvd0hpZGUoIHRoaXMsIHRydWUgKTtcblx0fSxcblx0aGlkZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHNob3dIaWRlKCB0aGlzICk7XG5cdH0sXG5cdHRvZ2dsZTogZnVuY3Rpb24oIHN0YXRlICkge1xuXHRcdGlmICggdHlwZW9mIHN0YXRlID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRcdHJldHVybiBzdGF0ZSA/IHRoaXMuc2hvdygpIDogdGhpcy5oaWRlKCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIGlzSGlkZGVuV2l0aGluVHJlZSggdGhpcyApICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS5zaG93KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS5oaWRlKCk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9XG59ICk7XG52YXIgcmNoZWNrYWJsZVR5cGUgPSAoIC9eKD86Y2hlY2tib3h8cmFkaW8pJC9pICk7XG5cbnZhciBydGFnTmFtZSA9ICggLzwoW2Etel1bXlxcL1xcMD5cXHgyMFxcdFxcclxcblxcZl0rKS9pICk7XG5cbnZhciByc2NyaXB0VHlwZSA9ICggL14kfFxcLyg/OmphdmF8ZWNtYSlzY3JpcHQvaSApO1xuXG5cblxuLy8gV2UgaGF2ZSB0byBjbG9zZSB0aGVzZSB0YWdzIHRvIHN1cHBvcnQgWEhUTUwgKCMxMzIwMClcbnZhciB3cmFwTWFwID0ge1xuXG5cdC8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG5cdG9wdGlvbjogWyAxLCBcIjxzZWxlY3QgbXVsdGlwbGU9J211bHRpcGxlJz5cIiwgXCI8L3NlbGVjdD5cIiBdLFxuXG5cdC8vIFhIVE1MIHBhcnNlcnMgZG8gbm90IG1hZ2ljYWxseSBpbnNlcnQgZWxlbWVudHMgaW4gdGhlXG5cdC8vIHNhbWUgd2F5IHRoYXQgdGFnIHNvdXAgcGFyc2VycyBkby4gU28gd2UgY2Fubm90IHNob3J0ZW5cblx0Ly8gdGhpcyBieSBvbWl0dGluZyA8dGJvZHk+IG9yIG90aGVyIHJlcXVpcmVkIGVsZW1lbnRzLlxuXHR0aGVhZDogWyAxLCBcIjx0YWJsZT5cIiwgXCI8L3RhYmxlPlwiIF0sXG5cdGNvbDogWyAyLCBcIjx0YWJsZT48Y29sZ3JvdXA+XCIsIFwiPC9jb2xncm91cD48L3RhYmxlPlwiIF0sXG5cdHRyOiBbIDIsIFwiPHRhYmxlPjx0Ym9keT5cIiwgXCI8L3Rib2R5PjwvdGFibGU+XCIgXSxcblx0dGQ6IFsgMywgXCI8dGFibGU+PHRib2R5Pjx0cj5cIiwgXCI8L3RyPjwvdGJvZHk+PC90YWJsZT5cIiBdLFxuXG5cdF9kZWZhdWx0OiBbIDAsIFwiXCIsIFwiXCIgXVxufTtcblxuLy8gU3VwcG9ydDogSUUgPD05IG9ubHlcbndyYXBNYXAub3B0Z3JvdXAgPSB3cmFwTWFwLm9wdGlvbjtcblxud3JhcE1hcC50Ym9keSA9IHdyYXBNYXAudGZvb3QgPSB3cmFwTWFwLmNvbGdyb3VwID0gd3JhcE1hcC5jYXB0aW9uID0gd3JhcE1hcC50aGVhZDtcbndyYXBNYXAudGggPSB3cmFwTWFwLnRkO1xuXG5cbmZ1bmN0aW9uIGdldEFsbCggY29udGV4dCwgdGFnICkge1xuXG5cdC8vIFN1cHBvcnQ6IElFIDw9OSAtIDExIG9ubHlcblx0Ly8gVXNlIHR5cGVvZiB0byBhdm9pZCB6ZXJvLWFyZ3VtZW50IG1ldGhvZCBpbnZvY2F0aW9uIG9uIGhvc3Qgb2JqZWN0cyAoIzE1MTUxKVxuXHR2YXIgcmV0O1xuXG5cdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IFwidW5kZWZpbmVkXCIgKSB7XG5cdFx0cmV0ID0gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggdGFnIHx8IFwiKlwiICk7XG5cblx0fSBlbHNlIGlmICggdHlwZW9mIGNvbnRleHQucXVlcnlTZWxlY3RvckFsbCAhPT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRyZXQgPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIHRhZyB8fCBcIipcIiApO1xuXG5cdH0gZWxzZSB7XG5cdFx0cmV0ID0gW107XG5cdH1cblxuXHRpZiAoIHRhZyA9PT0gdW5kZWZpbmVkIHx8IHRhZyAmJiBub2RlTmFtZSggY29udGV4dCwgdGFnICkgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5tZXJnZSggWyBjb250ZXh0IF0sIHJldCApO1xuXHR9XG5cblx0cmV0dXJuIHJldDtcbn1cblxuXG4vLyBNYXJrIHNjcmlwdHMgYXMgaGF2aW5nIGFscmVhZHkgYmVlbiBldmFsdWF0ZWRcbmZ1bmN0aW9uIHNldEdsb2JhbEV2YWwoIGVsZW1zLCByZWZFbGVtZW50cyApIHtcblx0dmFyIGkgPSAwLFxuXHRcdGwgPSBlbGVtcy5sZW5ndGg7XG5cblx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdGRhdGFQcml2LnNldChcblx0XHRcdGVsZW1zWyBpIF0sXG5cdFx0XHRcImdsb2JhbEV2YWxcIixcblx0XHRcdCFyZWZFbGVtZW50cyB8fCBkYXRhUHJpdi5nZXQoIHJlZkVsZW1lbnRzWyBpIF0sIFwiZ2xvYmFsRXZhbFwiIClcblx0XHQpO1xuXHR9XG59XG5cblxudmFyIHJodG1sID0gLzx8JiM/XFx3KzsvO1xuXG5mdW5jdGlvbiBidWlsZEZyYWdtZW50KCBlbGVtcywgY29udGV4dCwgc2NyaXB0cywgc2VsZWN0aW9uLCBpZ25vcmVkICkge1xuXHR2YXIgZWxlbSwgdG1wLCB0YWcsIHdyYXAsIGNvbnRhaW5zLCBqLFxuXHRcdGZyYWdtZW50ID0gY29udGV4dC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXG5cdFx0bm9kZXMgPSBbXSxcblx0XHRpID0gMCxcblx0XHRsID0gZWxlbXMubGVuZ3RoO1xuXG5cdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRlbGVtID0gZWxlbXNbIGkgXTtcblxuXHRcdGlmICggZWxlbSB8fCBlbGVtID09PSAwICkge1xuXG5cdFx0XHQvLyBBZGQgbm9kZXMgZGlyZWN0bHlcblx0XHRcdGlmICggalF1ZXJ5LnR5cGUoIGVsZW0gKSA9PT0gXCJvYmplY3RcIiApIHtcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHksIFBoYW50b21KUyAxIG9ubHlcblx0XHRcdFx0Ly8gcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRcdFx0XHRqUXVlcnkubWVyZ2UoIG5vZGVzLCBlbGVtLm5vZGVUeXBlID8gWyBlbGVtIF0gOiBlbGVtICk7XG5cblx0XHRcdC8vIENvbnZlcnQgbm9uLWh0bWwgaW50byBhIHRleHQgbm9kZVxuXHRcdFx0fSBlbHNlIGlmICggIXJodG1sLnRlc3QoIGVsZW0gKSApIHtcblx0XHRcdFx0bm9kZXMucHVzaCggY29udGV4dC5jcmVhdGVUZXh0Tm9kZSggZWxlbSApICk7XG5cblx0XHRcdC8vIENvbnZlcnQgaHRtbCBpbnRvIERPTSBub2Rlc1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dG1wID0gdG1wIHx8IGZyYWdtZW50LmFwcGVuZENoaWxkKCBjb250ZXh0LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKSApO1xuXG5cdFx0XHRcdC8vIERlc2VyaWFsaXplIGEgc3RhbmRhcmQgcmVwcmVzZW50YXRpb25cblx0XHRcdFx0dGFnID0gKCBydGFnTmFtZS5leGVjKCBlbGVtICkgfHwgWyBcIlwiLCBcIlwiIF0gKVsgMSBdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdHdyYXAgPSB3cmFwTWFwWyB0YWcgXSB8fCB3cmFwTWFwLl9kZWZhdWx0O1xuXHRcdFx0XHR0bXAuaW5uZXJIVE1MID0gd3JhcFsgMSBdICsgalF1ZXJ5Lmh0bWxQcmVmaWx0ZXIoIGVsZW0gKSArIHdyYXBbIDIgXTtcblxuXHRcdFx0XHQvLyBEZXNjZW5kIHRocm91Z2ggd3JhcHBlcnMgdG8gdGhlIHJpZ2h0IGNvbnRlbnRcblx0XHRcdFx0aiA9IHdyYXBbIDAgXTtcblx0XHRcdFx0d2hpbGUgKCBqLS0gKSB7XG5cdFx0XHRcdFx0dG1wID0gdG1wLmxhc3RDaGlsZDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seSwgUGhhbnRvbUpTIDEgb25seVxuXHRcdFx0XHQvLyBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzIG9uIGFuY2llbnQgV2ViS2l0XG5cdFx0XHRcdGpRdWVyeS5tZXJnZSggbm9kZXMsIHRtcC5jaGlsZE5vZGVzICk7XG5cblx0XHRcdFx0Ly8gUmVtZW1iZXIgdGhlIHRvcC1sZXZlbCBjb250YWluZXJcblx0XHRcdFx0dG1wID0gZnJhZ21lbnQuZmlyc3RDaGlsZDtcblxuXHRcdFx0XHQvLyBFbnN1cmUgdGhlIGNyZWF0ZWQgbm9kZXMgYXJlIG9ycGhhbmVkICgjMTIzOTIpXG5cdFx0XHRcdHRtcC50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmVtb3ZlIHdyYXBwZXIgZnJvbSBmcmFnbWVudFxuXHRmcmFnbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG5cblx0aSA9IDA7XG5cdHdoaWxlICggKCBlbGVtID0gbm9kZXNbIGkrKyBdICkgKSB7XG5cblx0XHQvLyBTa2lwIGVsZW1lbnRzIGFscmVhZHkgaW4gdGhlIGNvbnRleHQgY29sbGVjdGlvbiAodHJhYy00MDg3KVxuXHRcdGlmICggc2VsZWN0aW9uICYmIGpRdWVyeS5pbkFycmF5KCBlbGVtLCBzZWxlY3Rpb24gKSA+IC0xICkge1xuXHRcdFx0aWYgKCBpZ25vcmVkICkge1xuXHRcdFx0XHRpZ25vcmVkLnB1c2goIGVsZW0gKTtcblx0XHRcdH1cblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGNvbnRhaW5zID0galF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKTtcblxuXHRcdC8vIEFwcGVuZCB0byBmcmFnbWVudFxuXHRcdHRtcCA9IGdldEFsbCggZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGVsZW0gKSwgXCJzY3JpcHRcIiApO1xuXG5cdFx0Ly8gUHJlc2VydmUgc2NyaXB0IGV2YWx1YXRpb24gaGlzdG9yeVxuXHRcdGlmICggY29udGFpbnMgKSB7XG5cdFx0XHRzZXRHbG9iYWxFdmFsKCB0bXAgKTtcblx0XHR9XG5cblx0XHQvLyBDYXB0dXJlIGV4ZWN1dGFibGVzXG5cdFx0aWYgKCBzY3JpcHRzICkge1xuXHRcdFx0aiA9IDA7XG5cdFx0XHR3aGlsZSAoICggZWxlbSA9IHRtcFsgaisrIF0gKSApIHtcblx0XHRcdFx0aWYgKCByc2NyaXB0VHlwZS50ZXN0KCBlbGVtLnR5cGUgfHwgXCJcIiApICkge1xuXHRcdFx0XHRcdHNjcmlwdHMucHVzaCggZWxlbSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGZyYWdtZW50O1xufVxuXG5cbiggZnVuY3Rpb24oKSB7XG5cdHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcblx0XHRkaXYgPSBmcmFnbWVudC5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApICksXG5cdFx0aW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImlucHV0XCIgKTtcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkIDQuMCAtIDQuMyBvbmx5XG5cdC8vIENoZWNrIHN0YXRlIGxvc3QgaWYgdGhlIG5hbWUgaXMgc2V0ICgjMTEyMTcpXG5cdC8vIFN1cHBvcnQ6IFdpbmRvd3MgV2ViIEFwcHMgKFdXQSlcblx0Ly8gYG5hbWVgIGFuZCBgdHlwZWAgbXVzdCB1c2UgLnNldEF0dHJpYnV0ZSBmb3IgV1dBICgjMTQ5MDEpXG5cdGlucHV0LnNldEF0dHJpYnV0ZSggXCJ0eXBlXCIsIFwicmFkaW9cIiApO1xuXHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwiY2hlY2tlZFwiLCBcImNoZWNrZWRcIiApO1xuXHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwibmFtZVwiLCBcInRcIiApO1xuXG5cdGRpdi5hcHBlbmRDaGlsZCggaW5wdXQgKTtcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4xIG9ubHlcblx0Ly8gT2xkZXIgV2ViS2l0IGRvZXNuJ3QgY2xvbmUgY2hlY2tlZCBzdGF0ZSBjb3JyZWN0bHkgaW4gZnJhZ21lbnRzXG5cdHN1cHBvcnQuY2hlY2tDbG9uZSA9IGRpdi5jbG9uZU5vZGUoIHRydWUgKS5jbG9uZU5vZGUoIHRydWUgKS5sYXN0Q2hpbGQuY2hlY2tlZDtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcblx0Ly8gTWFrZSBzdXJlIHRleHRhcmVhIChhbmQgY2hlY2tib3gpIGRlZmF1bHRWYWx1ZSBpcyBwcm9wZXJseSBjbG9uZWRcblx0ZGl2LmlubmVySFRNTCA9IFwiPHRleHRhcmVhPng8L3RleHRhcmVhPlwiO1xuXHRzdXBwb3J0Lm5vQ2xvbmVDaGVja2VkID0gISFkaXYuY2xvbmVOb2RlKCB0cnVlICkubGFzdENoaWxkLmRlZmF1bHRWYWx1ZTtcbn0gKSgpO1xudmFyIGRvY3VtZW50RWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXG5cbnZhclxuXHRya2V5RXZlbnQgPSAvXmtleS8sXG5cdHJtb3VzZUV2ZW50ID0gL14oPzptb3VzZXxwb2ludGVyfGNvbnRleHRtZW51fGRyYWd8ZHJvcCl8Y2xpY2svLFxuXHRydHlwZW5hbWVzcGFjZSA9IC9eKFteLl0qKSg/OlxcLiguKyl8KS87XG5cbmZ1bmN0aW9uIHJldHVyblRydWUoKSB7XG5cdHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiByZXR1cm5GYWxzZSgpIHtcblx0cmV0dXJuIGZhbHNlO1xufVxuXG4vLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuLy8gU2VlICMxMzM5MyBmb3IgbW9yZSBpbmZvXG5mdW5jdGlvbiBzYWZlQWN0aXZlRWxlbWVudCgpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblx0fSBjYXRjaCAoIGVyciApIHsgfVxufVxuXG5mdW5jdGlvbiBvbiggZWxlbSwgdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiwgb25lICkge1xuXHR2YXIgb3JpZ0ZuLCB0eXBlO1xuXG5cdC8vIFR5cGVzIGNhbiBiZSBhIG1hcCBvZiB0eXBlcy9oYW5kbGVyc1xuXHRpZiAoIHR5cGVvZiB0eXBlcyA9PT0gXCJvYmplY3RcIiApIHtcblxuXHRcdC8vICggdHlwZXMtT2JqZWN0LCBzZWxlY3RvciwgZGF0YSApXG5cdFx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgKSB7XG5cblx0XHRcdC8vICggdHlwZXMtT2JqZWN0LCBkYXRhIClcblx0XHRcdGRhdGEgPSBkYXRhIHx8IHNlbGVjdG9yO1xuXHRcdFx0c2VsZWN0b3IgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdGZvciAoIHR5cGUgaW4gdHlwZXMgKSB7XG5cdFx0XHRvbiggZWxlbSwgdHlwZSwgc2VsZWN0b3IsIGRhdGEsIHR5cGVzWyB0eXBlIF0sIG9uZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gZWxlbTtcblx0fVxuXG5cdGlmICggZGF0YSA9PSBudWxsICYmIGZuID09IG51bGwgKSB7XG5cblx0XHQvLyAoIHR5cGVzLCBmbiApXG5cdFx0Zm4gPSBzZWxlY3Rvcjtcblx0XHRkYXRhID0gc2VsZWN0b3IgPSB1bmRlZmluZWQ7XG5cdH0gZWxzZSBpZiAoIGZuID09IG51bGwgKSB7XG5cdFx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgKSB7XG5cblx0XHRcdC8vICggdHlwZXMsIHNlbGVjdG9yLCBmbiApXG5cdFx0XHRmbiA9IGRhdGE7XG5cdFx0XHRkYXRhID0gdW5kZWZpbmVkO1xuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vICggdHlwZXMsIGRhdGEsIGZuIClcblx0XHRcdGZuID0gZGF0YTtcblx0XHRcdGRhdGEgPSBzZWxlY3Rvcjtcblx0XHRcdHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXHRpZiAoIGZuID09PSBmYWxzZSApIHtcblx0XHRmbiA9IHJldHVybkZhbHNlO1xuXHR9IGVsc2UgaWYgKCAhZm4gKSB7XG5cdFx0cmV0dXJuIGVsZW07XG5cdH1cblxuXHRpZiAoIG9uZSA9PT0gMSApIHtcblx0XHRvcmlnRm4gPSBmbjtcblx0XHRmbiA9IGZ1bmN0aW9uKCBldmVudCApIHtcblxuXHRcdFx0Ly8gQ2FuIHVzZSBhbiBlbXB0eSBzZXQsIHNpbmNlIGV2ZW50IGNvbnRhaW5zIHRoZSBpbmZvXG5cdFx0XHRqUXVlcnkoKS5vZmYoIGV2ZW50ICk7XG5cdFx0XHRyZXR1cm4gb3JpZ0ZuLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHR9O1xuXG5cdFx0Ly8gVXNlIHNhbWUgZ3VpZCBzbyBjYWxsZXIgY2FuIHJlbW92ZSB1c2luZyBvcmlnRm5cblx0XHRmbi5ndWlkID0gb3JpZ0ZuLmd1aWQgfHwgKCBvcmlnRm4uZ3VpZCA9IGpRdWVyeS5ndWlkKysgKTtcblx0fVxuXHRyZXR1cm4gZWxlbS5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRqUXVlcnkuZXZlbnQuYWRkKCB0aGlzLCB0eXBlcywgZm4sIGRhdGEsIHNlbGVjdG9yICk7XG5cdH0gKTtcbn1cblxuLypcbiAqIEhlbHBlciBmdW5jdGlvbnMgZm9yIG1hbmFnaW5nIGV2ZW50cyAtLSBub3QgcGFydCBvZiB0aGUgcHVibGljIGludGVyZmFjZS5cbiAqIFByb3BzIHRvIERlYW4gRWR3YXJkcycgYWRkRXZlbnQgbGlicmFyeSBmb3IgbWFueSBvZiB0aGUgaWRlYXMuXG4gKi9cbmpRdWVyeS5ldmVudCA9IHtcblxuXHRnbG9iYWw6IHt9LFxuXG5cdGFkZDogZnVuY3Rpb24oIGVsZW0sIHR5cGVzLCBoYW5kbGVyLCBkYXRhLCBzZWxlY3RvciApIHtcblxuXHRcdHZhciBoYW5kbGVPYmpJbiwgZXZlbnRIYW5kbGUsIHRtcCxcblx0XHRcdGV2ZW50cywgdCwgaGFuZGxlT2JqLFxuXHRcdFx0c3BlY2lhbCwgaGFuZGxlcnMsIHR5cGUsIG5hbWVzcGFjZXMsIG9yaWdUeXBlLFxuXHRcdFx0ZWxlbURhdGEgPSBkYXRhUHJpdi5nZXQoIGVsZW0gKTtcblxuXHRcdC8vIERvbid0IGF0dGFjaCBldmVudHMgdG8gbm9EYXRhIG9yIHRleHQvY29tbWVudCBub2RlcyAoYnV0IGFsbG93IHBsYWluIG9iamVjdHMpXG5cdFx0aWYgKCAhZWxlbURhdGEgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gQ2FsbGVyIGNhbiBwYXNzIGluIGFuIG9iamVjdCBvZiBjdXN0b20gZGF0YSBpbiBsaWV1IG9mIHRoZSBoYW5kbGVyXG5cdFx0aWYgKCBoYW5kbGVyLmhhbmRsZXIgKSB7XG5cdFx0XHRoYW5kbGVPYmpJbiA9IGhhbmRsZXI7XG5cdFx0XHRoYW5kbGVyID0gaGFuZGxlT2JqSW4uaGFuZGxlcjtcblx0XHRcdHNlbGVjdG9yID0gaGFuZGxlT2JqSW4uc2VsZWN0b3I7XG5cdFx0fVxuXG5cdFx0Ly8gRW5zdXJlIHRoYXQgaW52YWxpZCBzZWxlY3RvcnMgdGhyb3cgZXhjZXB0aW9ucyBhdCBhdHRhY2ggdGltZVxuXHRcdC8vIEV2YWx1YXRlIGFnYWluc3QgZG9jdW1lbnRFbGVtZW50IGluIGNhc2UgZWxlbSBpcyBhIG5vbi1lbGVtZW50IG5vZGUgKGUuZy4sIGRvY3VtZW50KVxuXHRcdGlmICggc2VsZWN0b3IgKSB7XG5cdFx0XHRqUXVlcnkuZmluZC5tYXRjaGVzU2VsZWN0b3IoIGRvY3VtZW50RWxlbWVudCwgc2VsZWN0b3IgKTtcblx0XHR9XG5cblx0XHQvLyBNYWtlIHN1cmUgdGhhdCB0aGUgaGFuZGxlciBoYXMgYSB1bmlxdWUgSUQsIHVzZWQgdG8gZmluZC9yZW1vdmUgaXQgbGF0ZXJcblx0XHRpZiAoICFoYW5kbGVyLmd1aWQgKSB7XG5cdFx0XHRoYW5kbGVyLmd1aWQgPSBqUXVlcnkuZ3VpZCsrO1xuXHRcdH1cblxuXHRcdC8vIEluaXQgdGhlIGVsZW1lbnQncyBldmVudCBzdHJ1Y3R1cmUgYW5kIG1haW4gaGFuZGxlciwgaWYgdGhpcyBpcyB0aGUgZmlyc3Rcblx0XHRpZiAoICEoIGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cyApICkge1xuXHRcdFx0ZXZlbnRzID0gZWxlbURhdGEuZXZlbnRzID0ge307XG5cdFx0fVxuXHRcdGlmICggISggZXZlbnRIYW5kbGUgPSBlbGVtRGF0YS5oYW5kbGUgKSApIHtcblx0XHRcdGV2ZW50SGFuZGxlID0gZWxlbURhdGEuaGFuZGxlID0gZnVuY3Rpb24oIGUgKSB7XG5cblx0XHRcdFx0Ly8gRGlzY2FyZCB0aGUgc2Vjb25kIGV2ZW50IG9mIGEgalF1ZXJ5LmV2ZW50LnRyaWdnZXIoKSBhbmRcblx0XHRcdFx0Ly8gd2hlbiBhbiBldmVudCBpcyBjYWxsZWQgYWZ0ZXIgYSBwYWdlIGhhcyB1bmxvYWRlZFxuXHRcdFx0XHRyZXR1cm4gdHlwZW9mIGpRdWVyeSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBqUXVlcnkuZXZlbnQudHJpZ2dlcmVkICE9PSBlLnR5cGUgP1xuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC5kaXNwYXRjaC5hcHBseSggZWxlbSwgYXJndW1lbnRzICkgOiB1bmRlZmluZWQ7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIEhhbmRsZSBtdWx0aXBsZSBldmVudHMgc2VwYXJhdGVkIGJ5IGEgc3BhY2Vcblx0XHR0eXBlcyA9ICggdHlwZXMgfHwgXCJcIiApLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgWyBcIlwiIF07XG5cdFx0dCA9IHR5cGVzLmxlbmd0aDtcblx0XHR3aGlsZSAoIHQtLSApIHtcblx0XHRcdHRtcCA9IHJ0eXBlbmFtZXNwYWNlLmV4ZWMoIHR5cGVzWyB0IF0gKSB8fCBbXTtcblx0XHRcdHR5cGUgPSBvcmlnVHlwZSA9IHRtcFsgMSBdO1xuXHRcdFx0bmFtZXNwYWNlcyA9ICggdG1wWyAyIF0gfHwgXCJcIiApLnNwbGl0KCBcIi5cIiApLnNvcnQoKTtcblxuXHRcdFx0Ly8gVGhlcmUgKm11c3QqIGJlIGEgdHlwZSwgbm8gYXR0YWNoaW5nIG5hbWVzcGFjZS1vbmx5IGhhbmRsZXJzXG5cdFx0XHRpZiAoICF0eXBlICkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgZXZlbnQgY2hhbmdlcyBpdHMgdHlwZSwgdXNlIHRoZSBzcGVjaWFsIGV2ZW50IGhhbmRsZXJzIGZvciB0aGUgY2hhbmdlZCB0eXBlXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblxuXHRcdFx0Ly8gSWYgc2VsZWN0b3IgZGVmaW5lZCwgZGV0ZXJtaW5lIHNwZWNpYWwgZXZlbnQgYXBpIHR5cGUsIG90aGVyd2lzZSBnaXZlbiB0eXBlXG5cdFx0XHR0eXBlID0gKCBzZWxlY3RvciA/IHNwZWNpYWwuZGVsZWdhdGVUeXBlIDogc3BlY2lhbC5iaW5kVHlwZSApIHx8IHR5cGU7XG5cblx0XHRcdC8vIFVwZGF0ZSBzcGVjaWFsIGJhc2VkIG9uIG5ld2x5IHJlc2V0IHR5cGVcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXG5cdFx0XHQvLyBoYW5kbGVPYmogaXMgcGFzc2VkIHRvIGFsbCBldmVudCBoYW5kbGVyc1xuXHRcdFx0aGFuZGxlT2JqID0galF1ZXJ5LmV4dGVuZCgge1xuXHRcdFx0XHR0eXBlOiB0eXBlLFxuXHRcdFx0XHRvcmlnVHlwZTogb3JpZ1R5cGUsXG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdGhhbmRsZXI6IGhhbmRsZXIsXG5cdFx0XHRcdGd1aWQ6IGhhbmRsZXIuZ3VpZCxcblx0XHRcdFx0c2VsZWN0b3I6IHNlbGVjdG9yLFxuXHRcdFx0XHRuZWVkc0NvbnRleHQ6IHNlbGVjdG9yICYmIGpRdWVyeS5leHByLm1hdGNoLm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvciApLFxuXHRcdFx0XHRuYW1lc3BhY2U6IG5hbWVzcGFjZXMuam9pbiggXCIuXCIgKVxuXHRcdFx0fSwgaGFuZGxlT2JqSW4gKTtcblxuXHRcdFx0Ly8gSW5pdCB0aGUgZXZlbnQgaGFuZGxlciBxdWV1ZSBpZiB3ZSdyZSB0aGUgZmlyc3Rcblx0XHRcdGlmICggISggaGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSApICkge1xuXHRcdFx0XHRoYW5kbGVycyA9IGV2ZW50c1sgdHlwZSBdID0gW107XG5cdFx0XHRcdGhhbmRsZXJzLmRlbGVnYXRlQ291bnQgPSAwO1xuXG5cdFx0XHRcdC8vIE9ubHkgdXNlIGFkZEV2ZW50TGlzdGVuZXIgaWYgdGhlIHNwZWNpYWwgZXZlbnRzIGhhbmRsZXIgcmV0dXJucyBmYWxzZVxuXHRcdFx0XHRpZiAoICFzcGVjaWFsLnNldHVwIHx8XG5cdFx0XHRcdFx0c3BlY2lhbC5zZXR1cC5jYWxsKCBlbGVtLCBkYXRhLCBuYW1lc3BhY2VzLCBldmVudEhhbmRsZSApID09PSBmYWxzZSApIHtcblxuXHRcdFx0XHRcdGlmICggZWxlbS5hZGRFdmVudExpc3RlbmVyICkge1xuXHRcdFx0XHRcdFx0ZWxlbS5hZGRFdmVudExpc3RlbmVyKCB0eXBlLCBldmVudEhhbmRsZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHNwZWNpYWwuYWRkICkge1xuXHRcdFx0XHRzcGVjaWFsLmFkZC5jYWxsKCBlbGVtLCBoYW5kbGVPYmogKTtcblxuXHRcdFx0XHRpZiAoICFoYW5kbGVPYmouaGFuZGxlci5ndWlkICkge1xuXHRcdFx0XHRcdGhhbmRsZU9iai5oYW5kbGVyLmd1aWQgPSBoYW5kbGVyLmd1aWQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIHRvIHRoZSBlbGVtZW50J3MgaGFuZGxlciBsaXN0LCBkZWxlZ2F0ZXMgaW4gZnJvbnRcblx0XHRcdGlmICggc2VsZWN0b3IgKSB7XG5cdFx0XHRcdGhhbmRsZXJzLnNwbGljZSggaGFuZGxlcnMuZGVsZWdhdGVDb3VudCsrLCAwLCBoYW5kbGVPYmogKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGhhbmRsZXJzLnB1c2goIGhhbmRsZU9iaiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBLZWVwIHRyYWNrIG9mIHdoaWNoIGV2ZW50cyBoYXZlIGV2ZXIgYmVlbiB1c2VkLCBmb3IgZXZlbnQgb3B0aW1pemF0aW9uXG5cdFx0XHRqUXVlcnkuZXZlbnQuZ2xvYmFsWyB0eXBlIF0gPSB0cnVlO1xuXHRcdH1cblxuXHR9LFxuXG5cdC8vIERldGFjaCBhbiBldmVudCBvciBzZXQgb2YgZXZlbnRzIGZyb20gYW4gZWxlbWVudFxuXHRyZW1vdmU6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlcywgaGFuZGxlciwgc2VsZWN0b3IsIG1hcHBlZFR5cGVzICkge1xuXG5cdFx0dmFyIGosIG9yaWdDb3VudCwgdG1wLFxuXHRcdFx0ZXZlbnRzLCB0LCBoYW5kbGVPYmosXG5cdFx0XHRzcGVjaWFsLCBoYW5kbGVycywgdHlwZSwgbmFtZXNwYWNlcywgb3JpZ1R5cGUsXG5cdFx0XHRlbGVtRGF0YSA9IGRhdGFQcml2Lmhhc0RhdGEoIGVsZW0gKSAmJiBkYXRhUHJpdi5nZXQoIGVsZW0gKTtcblxuXHRcdGlmICggIWVsZW1EYXRhIHx8ICEoIGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cyApICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIE9uY2UgZm9yIGVhY2ggdHlwZS5uYW1lc3BhY2UgaW4gdHlwZXM7IHR5cGUgbWF5IGJlIG9taXR0ZWRcblx0XHR0eXBlcyA9ICggdHlwZXMgfHwgXCJcIiApLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgWyBcIlwiIF07XG5cdFx0dCA9IHR5cGVzLmxlbmd0aDtcblx0XHR3aGlsZSAoIHQtLSApIHtcblx0XHRcdHRtcCA9IHJ0eXBlbmFtZXNwYWNlLmV4ZWMoIHR5cGVzWyB0IF0gKSB8fCBbXTtcblx0XHRcdHR5cGUgPSBvcmlnVHlwZSA9IHRtcFsgMSBdO1xuXHRcdFx0bmFtZXNwYWNlcyA9ICggdG1wWyAyIF0gfHwgXCJcIiApLnNwbGl0KCBcIi5cIiApLnNvcnQoKTtcblxuXHRcdFx0Ly8gVW5iaW5kIGFsbCBldmVudHMgKG9uIHRoaXMgbmFtZXNwYWNlLCBpZiBwcm92aWRlZCkgZm9yIHRoZSBlbGVtZW50XG5cdFx0XHRpZiAoICF0eXBlICkge1xuXHRcdFx0XHRmb3IgKCB0eXBlIGluIGV2ZW50cyApIHtcblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQucmVtb3ZlKCBlbGVtLCB0eXBlICsgdHlwZXNbIHQgXSwgaGFuZGxlciwgc2VsZWN0b3IsIHRydWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cdFx0XHR0eXBlID0gKCBzZWxlY3RvciA/IHNwZWNpYWwuZGVsZWdhdGVUeXBlIDogc3BlY2lhbC5iaW5kVHlwZSApIHx8IHR5cGU7XG5cdFx0XHRoYW5kbGVycyA9IGV2ZW50c1sgdHlwZSBdIHx8IFtdO1xuXHRcdFx0dG1wID0gdG1wWyAyIF0gJiZcblx0XHRcdFx0bmV3IFJlZ0V4cCggXCIoXnxcXFxcLilcIiArIG5hbWVzcGFjZXMuam9pbiggXCJcXFxcLig/Oi4qXFxcXC58KVwiICkgKyBcIihcXFxcLnwkKVwiICk7XG5cblx0XHRcdC8vIFJlbW92ZSBtYXRjaGluZyBldmVudHNcblx0XHRcdG9yaWdDb3VudCA9IGogPSBoYW5kbGVycy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoIGotLSApIHtcblx0XHRcdFx0aGFuZGxlT2JqID0gaGFuZGxlcnNbIGogXTtcblxuXHRcdFx0XHRpZiAoICggbWFwcGVkVHlwZXMgfHwgb3JpZ1R5cGUgPT09IGhhbmRsZU9iai5vcmlnVHlwZSApICYmXG5cdFx0XHRcdFx0KCAhaGFuZGxlciB8fCBoYW5kbGVyLmd1aWQgPT09IGhhbmRsZU9iai5ndWlkICkgJiZcblx0XHRcdFx0XHQoICF0bXAgfHwgdG1wLnRlc3QoIGhhbmRsZU9iai5uYW1lc3BhY2UgKSApICYmXG5cdFx0XHRcdFx0KCAhc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGhhbmRsZU9iai5zZWxlY3RvciB8fFxuXHRcdFx0XHRcdFx0c2VsZWN0b3IgPT09IFwiKipcIiAmJiBoYW5kbGVPYmouc2VsZWN0b3IgKSApIHtcblx0XHRcdFx0XHRoYW5kbGVycy5zcGxpY2UoIGosIDEgKTtcblxuXHRcdFx0XHRcdGlmICggaGFuZGxlT2JqLnNlbGVjdG9yICkge1xuXHRcdFx0XHRcdFx0aGFuZGxlcnMuZGVsZWdhdGVDb3VudC0tO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIHNwZWNpYWwucmVtb3ZlICkge1xuXHRcdFx0XHRcdFx0c3BlY2lhbC5yZW1vdmUuY2FsbCggZWxlbSwgaGFuZGxlT2JqICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlbW92ZSBnZW5lcmljIGV2ZW50IGhhbmRsZXIgaWYgd2UgcmVtb3ZlZCBzb21ldGhpbmcgYW5kIG5vIG1vcmUgaGFuZGxlcnMgZXhpc3Rcblx0XHRcdC8vIChhdm9pZHMgcG90ZW50aWFsIGZvciBlbmRsZXNzIHJlY3Vyc2lvbiBkdXJpbmcgcmVtb3ZhbCBvZiBzcGVjaWFsIGV2ZW50IGhhbmRsZXJzKVxuXHRcdFx0aWYgKCBvcmlnQ291bnQgJiYgIWhhbmRsZXJzLmxlbmd0aCApIHtcblx0XHRcdFx0aWYgKCAhc3BlY2lhbC50ZWFyZG93biB8fFxuXHRcdFx0XHRcdHNwZWNpYWwudGVhcmRvd24uY2FsbCggZWxlbSwgbmFtZXNwYWNlcywgZWxlbURhdGEuaGFuZGxlICkgPT09IGZhbHNlICkge1xuXG5cdFx0XHRcdFx0alF1ZXJ5LnJlbW92ZUV2ZW50KCBlbGVtLCB0eXBlLCBlbGVtRGF0YS5oYW5kbGUgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRlbGV0ZSBldmVudHNbIHR5cGUgXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBSZW1vdmUgZGF0YSBhbmQgdGhlIGV4cGFuZG8gaWYgaXQncyBubyBsb25nZXIgdXNlZFxuXHRcdGlmICggalF1ZXJ5LmlzRW1wdHlPYmplY3QoIGV2ZW50cyApICkge1xuXHRcdFx0ZGF0YVByaXYucmVtb3ZlKCBlbGVtLCBcImhhbmRsZSBldmVudHNcIiApO1xuXHRcdH1cblx0fSxcblxuXHRkaXNwYXRjaDogZnVuY3Rpb24oIG5hdGl2ZUV2ZW50ICkge1xuXG5cdFx0Ly8gTWFrZSBhIHdyaXRhYmxlIGpRdWVyeS5FdmVudCBmcm9tIHRoZSBuYXRpdmUgZXZlbnQgb2JqZWN0XG5cdFx0dmFyIGV2ZW50ID0galF1ZXJ5LmV2ZW50LmZpeCggbmF0aXZlRXZlbnQgKTtcblxuXHRcdHZhciBpLCBqLCByZXQsIG1hdGNoZWQsIGhhbmRsZU9iaiwgaGFuZGxlclF1ZXVlLFxuXHRcdFx0YXJncyA9IG5ldyBBcnJheSggYXJndW1lbnRzLmxlbmd0aCApLFxuXHRcdFx0aGFuZGxlcnMgPSAoIGRhdGFQcml2LmdldCggdGhpcywgXCJldmVudHNcIiApIHx8IHt9IClbIGV2ZW50LnR5cGUgXSB8fCBbXSxcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgZXZlbnQudHlwZSBdIHx8IHt9O1xuXG5cdFx0Ly8gVXNlIHRoZSBmaXgtZWQgalF1ZXJ5LkV2ZW50IHJhdGhlciB0aGFuIHRoZSAocmVhZC1vbmx5KSBuYXRpdmUgZXZlbnRcblx0XHRhcmdzWyAwIF0gPSBldmVudDtcblxuXHRcdGZvciAoIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrICkge1xuXHRcdFx0YXJnc1sgaSBdID0gYXJndW1lbnRzWyBpIF07XG5cdFx0fVxuXG5cdFx0ZXZlbnQuZGVsZWdhdGVUYXJnZXQgPSB0aGlzO1xuXG5cdFx0Ly8gQ2FsbCB0aGUgcHJlRGlzcGF0Y2ggaG9vayBmb3IgdGhlIG1hcHBlZCB0eXBlLCBhbmQgbGV0IGl0IGJhaWwgaWYgZGVzaXJlZFxuXHRcdGlmICggc3BlY2lhbC5wcmVEaXNwYXRjaCAmJiBzcGVjaWFsLnByZURpc3BhdGNoLmNhbGwoIHRoaXMsIGV2ZW50ICkgPT09IGZhbHNlICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIERldGVybWluZSBoYW5kbGVyc1xuXHRcdGhhbmRsZXJRdWV1ZSA9IGpRdWVyeS5ldmVudC5oYW5kbGVycy5jYWxsKCB0aGlzLCBldmVudCwgaGFuZGxlcnMgKTtcblxuXHRcdC8vIFJ1biBkZWxlZ2F0ZXMgZmlyc3Q7IHRoZXkgbWF5IHdhbnQgdG8gc3RvcCBwcm9wYWdhdGlvbiBiZW5lYXRoIHVzXG5cdFx0aSA9IDA7XG5cdFx0d2hpbGUgKCAoIG1hdGNoZWQgPSBoYW5kbGVyUXVldWVbIGkrKyBdICkgJiYgIWV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG5cdFx0XHRldmVudC5jdXJyZW50VGFyZ2V0ID0gbWF0Y2hlZC5lbGVtO1xuXG5cdFx0XHRqID0gMDtcblx0XHRcdHdoaWxlICggKCBoYW5kbGVPYmogPSBtYXRjaGVkLmhhbmRsZXJzWyBqKysgXSApICYmXG5cdFx0XHRcdCFldmVudC5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXG5cdFx0XHRcdC8vIFRyaWdnZXJlZCBldmVudCBtdXN0IGVpdGhlciAxKSBoYXZlIG5vIG5hbWVzcGFjZSwgb3IgMikgaGF2ZSBuYW1lc3BhY2Uocylcblx0XHRcdFx0Ly8gYSBzdWJzZXQgb3IgZXF1YWwgdG8gdGhvc2UgaW4gdGhlIGJvdW5kIGV2ZW50IChib3RoIGNhbiBoYXZlIG5vIG5hbWVzcGFjZSkuXG5cdFx0XHRcdGlmICggIWV2ZW50LnJuYW1lc3BhY2UgfHwgZXZlbnQucm5hbWVzcGFjZS50ZXN0KCBoYW5kbGVPYmoubmFtZXNwYWNlICkgKSB7XG5cblx0XHRcdFx0XHRldmVudC5oYW5kbGVPYmogPSBoYW5kbGVPYmo7XG5cdFx0XHRcdFx0ZXZlbnQuZGF0YSA9IGhhbmRsZU9iai5kYXRhO1xuXG5cdFx0XHRcdFx0cmV0ID0gKCAoIGpRdWVyeS5ldmVudC5zcGVjaWFsWyBoYW5kbGVPYmoub3JpZ1R5cGUgXSB8fCB7fSApLmhhbmRsZSB8fFxuXHRcdFx0XHRcdFx0aGFuZGxlT2JqLmhhbmRsZXIgKS5hcHBseSggbWF0Y2hlZC5lbGVtLCBhcmdzICk7XG5cblx0XHRcdFx0XHRpZiAoIHJldCAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoIGV2ZW50LnJlc3VsdCA9IHJldCApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ2FsbCB0aGUgcG9zdERpc3BhdGNoIGhvb2sgZm9yIHRoZSBtYXBwZWQgdHlwZVxuXHRcdGlmICggc3BlY2lhbC5wb3N0RGlzcGF0Y2ggKSB7XG5cdFx0XHRzcGVjaWFsLnBvc3REaXNwYXRjaC5jYWxsKCB0aGlzLCBldmVudCApO1xuXHRcdH1cblxuXHRcdHJldHVybiBldmVudC5yZXN1bHQ7XG5cdH0sXG5cblx0aGFuZGxlcnM6IGZ1bmN0aW9uKCBldmVudCwgaGFuZGxlcnMgKSB7XG5cdFx0dmFyIGksIGhhbmRsZU9iaiwgc2VsLCBtYXRjaGVkSGFuZGxlcnMsIG1hdGNoZWRTZWxlY3RvcnMsXG5cdFx0XHRoYW5kbGVyUXVldWUgPSBbXSxcblx0XHRcdGRlbGVnYXRlQ291bnQgPSBoYW5kbGVycy5kZWxlZ2F0ZUNvdW50LFxuXHRcdFx0Y3VyID0gZXZlbnQudGFyZ2V0O1xuXG5cdFx0Ly8gRmluZCBkZWxlZ2F0ZSBoYW5kbGVyc1xuXHRcdGlmICggZGVsZWdhdGVDb3VudCAmJlxuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTlcblx0XHRcdC8vIEJsYWNrLWhvbGUgU1ZHIDx1c2U+IGluc3RhbmNlIHRyZWVzICh0cmFjLTEzMTgwKVxuXHRcdFx0Y3VyLm5vZGVUeXBlICYmXG5cblx0XHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3ggPD00MlxuXHRcdFx0Ly8gU3VwcHJlc3Mgc3BlYy12aW9sYXRpbmcgY2xpY2tzIGluZGljYXRpbmcgYSBub24tcHJpbWFyeSBwb2ludGVyIGJ1dHRvbiAodHJhYy0zODYxKVxuXHRcdFx0Ly8gaHR0cHM6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0zLUV2ZW50cy8jZXZlbnQtdHlwZS1jbGlja1xuXHRcdFx0Ly8gU3VwcG9ydDogSUUgMTEgb25seVxuXHRcdFx0Ly8gLi4uYnV0IG5vdCBhcnJvdyBrZXkgXCJjbGlja3NcIiBvZiByYWRpbyBpbnB1dHMsIHdoaWNoIGNhbiBoYXZlIGBidXR0b25gIC0xIChnaC0yMzQzKVxuXHRcdFx0ISggZXZlbnQudHlwZSA9PT0gXCJjbGlja1wiICYmIGV2ZW50LmJ1dHRvbiA+PSAxICkgKSB7XG5cblx0XHRcdGZvciAoIDsgY3VyICE9PSB0aGlzOyBjdXIgPSBjdXIucGFyZW50Tm9kZSB8fCB0aGlzICkge1xuXG5cdFx0XHRcdC8vIERvbid0IGNoZWNrIG5vbi1lbGVtZW50cyAoIzEzMjA4KVxuXHRcdFx0XHQvLyBEb24ndCBwcm9jZXNzIGNsaWNrcyBvbiBkaXNhYmxlZCBlbGVtZW50cyAoIzY5MTEsICM4MTY1LCAjMTEzODIsICMxMTc2NClcblx0XHRcdFx0aWYgKCBjdXIubm9kZVR5cGUgPT09IDEgJiYgISggZXZlbnQudHlwZSA9PT0gXCJjbGlja1wiICYmIGN1ci5kaXNhYmxlZCA9PT0gdHJ1ZSApICkge1xuXHRcdFx0XHRcdG1hdGNoZWRIYW5kbGVycyA9IFtdO1xuXHRcdFx0XHRcdG1hdGNoZWRTZWxlY3RvcnMgPSB7fTtcblx0XHRcdFx0XHRmb3IgKCBpID0gMDsgaSA8IGRlbGVnYXRlQ291bnQ7IGkrKyApIHtcblx0XHRcdFx0XHRcdGhhbmRsZU9iaiA9IGhhbmRsZXJzWyBpIF07XG5cblx0XHRcdFx0XHRcdC8vIERvbid0IGNvbmZsaWN0IHdpdGggT2JqZWN0LnByb3RvdHlwZSBwcm9wZXJ0aWVzICgjMTMyMDMpXG5cdFx0XHRcdFx0XHRzZWwgPSBoYW5kbGVPYmouc2VsZWN0b3IgKyBcIiBcIjtcblxuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVkU2VsZWN0b3JzWyBzZWwgXSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdFx0XHRtYXRjaGVkU2VsZWN0b3JzWyBzZWwgXSA9IGhhbmRsZU9iai5uZWVkc0NvbnRleHQgP1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeSggc2VsLCB0aGlzICkuaW5kZXgoIGN1ciApID4gLTEgOlxuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5maW5kKCBzZWwsIHRoaXMsIG51bGwsIFsgY3VyIF0gKS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZWRTZWxlY3RvcnNbIHNlbCBdICkge1xuXHRcdFx0XHRcdFx0XHRtYXRjaGVkSGFuZGxlcnMucHVzaCggaGFuZGxlT2JqICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggbWF0Y2hlZEhhbmRsZXJzLmxlbmd0aCApIHtcblx0XHRcdFx0XHRcdGhhbmRsZXJRdWV1ZS5wdXNoKCB7IGVsZW06IGN1ciwgaGFuZGxlcnM6IG1hdGNoZWRIYW5kbGVycyB9ICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQWRkIHRoZSByZW1haW5pbmcgKGRpcmVjdGx5LWJvdW5kKSBoYW5kbGVyc1xuXHRcdGN1ciA9IHRoaXM7XG5cdFx0aWYgKCBkZWxlZ2F0ZUNvdW50IDwgaGFuZGxlcnMubGVuZ3RoICkge1xuXHRcdFx0aGFuZGxlclF1ZXVlLnB1c2goIHsgZWxlbTogY3VyLCBoYW5kbGVyczogaGFuZGxlcnMuc2xpY2UoIGRlbGVnYXRlQ291bnQgKSB9ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGhhbmRsZXJRdWV1ZTtcblx0fSxcblxuXHRhZGRQcm9wOiBmdW5jdGlvbiggbmFtZSwgaG9vayApIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIGpRdWVyeS5FdmVudC5wcm90b3R5cGUsIG5hbWUsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cblx0XHRcdGdldDogalF1ZXJ5LmlzRnVuY3Rpb24oIGhvb2sgKSA/XG5cdFx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmICggdGhpcy5vcmlnaW5hbEV2ZW50ICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gaG9vayggdGhpcy5vcmlnaW5hbEV2ZW50ICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IDpcblx0XHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKCB0aGlzLm9yaWdpbmFsRXZlbnQgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLm9yaWdpbmFsRXZlbnRbIG5hbWUgXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cblx0XHRcdHNldDogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIHRoaXMsIG5hbWUsIHtcblx0XHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHR3cml0YWJsZTogdHJ1ZSxcblx0XHRcdFx0XHR2YWx1ZTogdmFsdWVcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblxuXHRmaXg6IGZ1bmN0aW9uKCBvcmlnaW5hbEV2ZW50ICkge1xuXHRcdHJldHVybiBvcmlnaW5hbEV2ZW50WyBqUXVlcnkuZXhwYW5kbyBdID9cblx0XHRcdG9yaWdpbmFsRXZlbnQgOlxuXHRcdFx0bmV3IGpRdWVyeS5FdmVudCggb3JpZ2luYWxFdmVudCApO1xuXHR9LFxuXG5cdHNwZWNpYWw6IHtcblx0XHRsb2FkOiB7XG5cblx0XHRcdC8vIFByZXZlbnQgdHJpZ2dlcmVkIGltYWdlLmxvYWQgZXZlbnRzIGZyb20gYnViYmxpbmcgdG8gd2luZG93LmxvYWRcblx0XHRcdG5vQnViYmxlOiB0cnVlXG5cdFx0fSxcblx0XHRmb2N1czoge1xuXG5cdFx0XHQvLyBGaXJlIG5hdGl2ZSBldmVudCBpZiBwb3NzaWJsZSBzbyBibHVyL2ZvY3VzIHNlcXVlbmNlIGlzIGNvcnJlY3Rcblx0XHRcdHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIHRoaXMgIT09IHNhZmVBY3RpdmVFbGVtZW50KCkgJiYgdGhpcy5mb2N1cyApIHtcblx0XHRcdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0ZGVsZWdhdGVUeXBlOiBcImZvY3VzaW5cIlxuXHRcdH0sXG5cdFx0Ymx1cjoge1xuXHRcdFx0dHJpZ2dlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggdGhpcyA9PT0gc2FmZUFjdGl2ZUVsZW1lbnQoKSAmJiB0aGlzLmJsdXIgKSB7XG5cdFx0XHRcdFx0dGhpcy5ibHVyKCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0ZGVsZWdhdGVUeXBlOiBcImZvY3Vzb3V0XCJcblx0XHR9LFxuXHRcdGNsaWNrOiB7XG5cblx0XHRcdC8vIEZvciBjaGVja2JveCwgZmlyZSBuYXRpdmUgZXZlbnQgc28gY2hlY2tlZCBzdGF0ZSB3aWxsIGJlIHJpZ2h0XG5cdFx0XHR0cmlnZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCB0aGlzLnR5cGUgPT09IFwiY2hlY2tib3hcIiAmJiB0aGlzLmNsaWNrICYmIG5vZGVOYW1lKCB0aGlzLCBcImlucHV0XCIgKSApIHtcblx0XHRcdFx0XHR0aGlzLmNsaWNrKCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBGb3IgY3Jvc3MtYnJvd3NlciBjb25zaXN0ZW5jeSwgZG9uJ3QgZmlyZSBuYXRpdmUgLmNsaWNrKCkgb24gbGlua3Ncblx0XHRcdF9kZWZhdWx0OiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdHJldHVybiBub2RlTmFtZSggZXZlbnQudGFyZ2V0LCBcImFcIiApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRiZWZvcmV1bmxvYWQ6IHtcblx0XHRcdHBvc3REaXNwYXRjaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3ggMjArXG5cdFx0XHRcdC8vIEZpcmVmb3ggZG9lc24ndCBhbGVydCBpZiB0aGUgcmV0dXJuVmFsdWUgZmllbGQgaXMgbm90IHNldC5cblx0XHRcdFx0aWYgKCBldmVudC5yZXN1bHQgIT09IHVuZGVmaW5lZCAmJiBldmVudC5vcmlnaW5hbEV2ZW50ICkge1xuXHRcdFx0XHRcdGV2ZW50Lm9yaWdpbmFsRXZlbnQucmV0dXJuVmFsdWUgPSBldmVudC5yZXN1bHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn07XG5cbmpRdWVyeS5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCBoYW5kbGUgKSB7XG5cblx0Ly8gVGhpcyBcImlmXCIgaXMgbmVlZGVkIGZvciBwbGFpbiBvYmplY3RzXG5cdGlmICggZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyICkge1xuXHRcdGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggdHlwZSwgaGFuZGxlICk7XG5cdH1cbn07XG5cbmpRdWVyeS5FdmVudCA9IGZ1bmN0aW9uKCBzcmMsIHByb3BzICkge1xuXG5cdC8vIEFsbG93IGluc3RhbnRpYXRpb24gd2l0aG91dCB0aGUgJ25ldycga2V5d29yZFxuXHRpZiAoICEoIHRoaXMgaW5zdGFuY2VvZiBqUXVlcnkuRXZlbnQgKSApIHtcblx0XHRyZXR1cm4gbmV3IGpRdWVyeS5FdmVudCggc3JjLCBwcm9wcyApO1xuXHR9XG5cblx0Ly8gRXZlbnQgb2JqZWN0XG5cdGlmICggc3JjICYmIHNyYy50eXBlICkge1xuXHRcdHRoaXMub3JpZ2luYWxFdmVudCA9IHNyYztcblx0XHR0aGlzLnR5cGUgPSBzcmMudHlwZTtcblxuXHRcdC8vIEV2ZW50cyBidWJibGluZyB1cCB0aGUgZG9jdW1lbnQgbWF5IGhhdmUgYmVlbiBtYXJrZWQgYXMgcHJldmVudGVkXG5cdFx0Ly8gYnkgYSBoYW5kbGVyIGxvd2VyIGRvd24gdGhlIHRyZWU7IHJlZmxlY3QgdGhlIGNvcnJlY3QgdmFsdWUuXG5cdFx0dGhpcy5pc0RlZmF1bHRQcmV2ZW50ZWQgPSBzcmMuZGVmYXVsdFByZXZlbnRlZCB8fFxuXHRcdFx0XHRzcmMuZGVmYXVsdFByZXZlbnRlZCA9PT0gdW5kZWZpbmVkICYmXG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTIuMyBvbmx5XG5cdFx0XHRcdHNyYy5yZXR1cm5WYWx1ZSA9PT0gZmFsc2UgP1xuXHRcdFx0cmV0dXJuVHJ1ZSA6XG5cdFx0XHRyZXR1cm5GYWxzZTtcblxuXHRcdC8vIENyZWF0ZSB0YXJnZXQgcHJvcGVydGllc1xuXHRcdC8vIFN1cHBvcnQ6IFNhZmFyaSA8PTYgLSA3IG9ubHlcblx0XHQvLyBUYXJnZXQgc2hvdWxkIG5vdCBiZSBhIHRleHQgbm9kZSAoIzUwNCwgIzEzMTQzKVxuXHRcdHRoaXMudGFyZ2V0ID0gKCBzcmMudGFyZ2V0ICYmIHNyYy50YXJnZXQubm9kZVR5cGUgPT09IDMgKSA/XG5cdFx0XHRzcmMudGFyZ2V0LnBhcmVudE5vZGUgOlxuXHRcdFx0c3JjLnRhcmdldDtcblxuXHRcdHRoaXMuY3VycmVudFRhcmdldCA9IHNyYy5jdXJyZW50VGFyZ2V0O1xuXHRcdHRoaXMucmVsYXRlZFRhcmdldCA9IHNyYy5yZWxhdGVkVGFyZ2V0O1xuXG5cdC8vIEV2ZW50IHR5cGVcblx0fSBlbHNlIHtcblx0XHR0aGlzLnR5cGUgPSBzcmM7XG5cdH1cblxuXHQvLyBQdXQgZXhwbGljaXRseSBwcm92aWRlZCBwcm9wZXJ0aWVzIG9udG8gdGhlIGV2ZW50IG9iamVjdFxuXHRpZiAoIHByb3BzICkge1xuXHRcdGpRdWVyeS5leHRlbmQoIHRoaXMsIHByb3BzICk7XG5cdH1cblxuXHQvLyBDcmVhdGUgYSB0aW1lc3RhbXAgaWYgaW5jb21pbmcgZXZlbnQgZG9lc24ndCBoYXZlIG9uZVxuXHR0aGlzLnRpbWVTdGFtcCA9IHNyYyAmJiBzcmMudGltZVN0YW1wIHx8IGpRdWVyeS5ub3coKTtcblxuXHQvLyBNYXJrIGl0IGFzIGZpeGVkXG5cdHRoaXNbIGpRdWVyeS5leHBhbmRvIF0gPSB0cnVlO1xufTtcblxuLy8galF1ZXJ5LkV2ZW50IGlzIGJhc2VkIG9uIERPTTMgRXZlbnRzIGFzIHNwZWNpZmllZCBieSB0aGUgRUNNQVNjcmlwdCBMYW5ndWFnZSBCaW5kaW5nXG4vLyBodHRwczovL3d3dy53My5vcmcvVFIvMjAwMy9XRC1ET00tTGV2ZWwtMy1FdmVudHMtMjAwMzAzMzEvZWNtYS1zY3JpcHQtYmluZGluZy5odG1sXG5qUXVlcnkuRXZlbnQucHJvdG90eXBlID0ge1xuXHRjb25zdHJ1Y3RvcjogalF1ZXJ5LkV2ZW50LFxuXHRpc0RlZmF1bHRQcmV2ZW50ZWQ6IHJldHVybkZhbHNlLFxuXHRpc1Byb3BhZ2F0aW9uU3RvcHBlZDogcmV0dXJuRmFsc2UsXG5cdGlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkOiByZXR1cm5GYWxzZSxcblx0aXNTaW11bGF0ZWQ6IGZhbHNlLFxuXG5cdHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcblxuXHRcdHRoaXMuaXNEZWZhdWx0UHJldmVudGVkID0gcmV0dXJuVHJ1ZTtcblxuXHRcdGlmICggZSAmJiAhdGhpcy5pc1NpbXVsYXRlZCApIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH0sXG5cdHN0b3BQcm9wYWdhdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQ7XG5cblx0XHR0aGlzLmlzUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuVHJ1ZTtcblxuXHRcdGlmICggZSAmJiAhdGhpcy5pc1NpbXVsYXRlZCApIHtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fVxuXHR9LFxuXHRzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50O1xuXG5cdFx0dGhpcy5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVyblRydWU7XG5cblx0XHRpZiAoIGUgJiYgIXRoaXMuaXNTaW11bGF0ZWQgKSB7XG5cdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdH1cblxuXHRcdHRoaXMuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdH1cbn07XG5cbi8vIEluY2x1ZGVzIGFsbCBjb21tb24gZXZlbnQgcHJvcHMgaW5jbHVkaW5nIEtleUV2ZW50IGFuZCBNb3VzZUV2ZW50IHNwZWNpZmljIHByb3BzXG5qUXVlcnkuZWFjaCgge1xuXHRhbHRLZXk6IHRydWUsXG5cdGJ1YmJsZXM6IHRydWUsXG5cdGNhbmNlbGFibGU6IHRydWUsXG5cdGNoYW5nZWRUb3VjaGVzOiB0cnVlLFxuXHRjdHJsS2V5OiB0cnVlLFxuXHRkZXRhaWw6IHRydWUsXG5cdGV2ZW50UGhhc2U6IHRydWUsXG5cdG1ldGFLZXk6IHRydWUsXG5cdHBhZ2VYOiB0cnVlLFxuXHRwYWdlWTogdHJ1ZSxcblx0c2hpZnRLZXk6IHRydWUsXG5cdHZpZXc6IHRydWUsXG5cdFwiY2hhclwiOiB0cnVlLFxuXHRjaGFyQ29kZTogdHJ1ZSxcblx0a2V5OiB0cnVlLFxuXHRrZXlDb2RlOiB0cnVlLFxuXHRidXR0b246IHRydWUsXG5cdGJ1dHRvbnM6IHRydWUsXG5cdGNsaWVudFg6IHRydWUsXG5cdGNsaWVudFk6IHRydWUsXG5cdG9mZnNldFg6IHRydWUsXG5cdG9mZnNldFk6IHRydWUsXG5cdHBvaW50ZXJJZDogdHJ1ZSxcblx0cG9pbnRlclR5cGU6IHRydWUsXG5cdHNjcmVlblg6IHRydWUsXG5cdHNjcmVlblk6IHRydWUsXG5cdHRhcmdldFRvdWNoZXM6IHRydWUsXG5cdHRvRWxlbWVudDogdHJ1ZSxcblx0dG91Y2hlczogdHJ1ZSxcblxuXHR3aGljaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdHZhciBidXR0b24gPSBldmVudC5idXR0b247XG5cblx0XHQvLyBBZGQgd2hpY2ggZm9yIGtleSBldmVudHNcblx0XHRpZiAoIGV2ZW50LndoaWNoID09IG51bGwgJiYgcmtleUV2ZW50LnRlc3QoIGV2ZW50LnR5cGUgKSApIHtcblx0XHRcdHJldHVybiBldmVudC5jaGFyQ29kZSAhPSBudWxsID8gZXZlbnQuY2hhckNvZGUgOiBldmVudC5rZXlDb2RlO1xuXHRcdH1cblxuXHRcdC8vIEFkZCB3aGljaCBmb3IgY2xpY2s6IDEgPT09IGxlZnQ7IDIgPT09IG1pZGRsZTsgMyA9PT0gcmlnaHRcblx0XHRpZiAoICFldmVudC53aGljaCAmJiBidXR0b24gIT09IHVuZGVmaW5lZCAmJiBybW91c2VFdmVudC50ZXN0KCBldmVudC50eXBlICkgKSB7XG5cdFx0XHRpZiAoIGJ1dHRvbiAmIDEgKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGJ1dHRvbiAmIDIgKSB7XG5cdFx0XHRcdHJldHVybiAzO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGJ1dHRvbiAmIDQgKSB7XG5cdFx0XHRcdHJldHVybiAyO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHRyZXR1cm4gZXZlbnQud2hpY2g7XG5cdH1cbn0sIGpRdWVyeS5ldmVudC5hZGRQcm9wICk7XG5cbi8vIENyZWF0ZSBtb3VzZWVudGVyL2xlYXZlIGV2ZW50cyB1c2luZyBtb3VzZW92ZXIvb3V0IGFuZCBldmVudC10aW1lIGNoZWNrc1xuLy8gc28gdGhhdCBldmVudCBkZWxlZ2F0aW9uIHdvcmtzIGluIGpRdWVyeS5cbi8vIERvIHRoZSBzYW1lIGZvciBwb2ludGVyZW50ZXIvcG9pbnRlcmxlYXZlIGFuZCBwb2ludGVyb3Zlci9wb2ludGVyb3V0XG4vL1xuLy8gU3VwcG9ydDogU2FmYXJpIDcgb25seVxuLy8gU2FmYXJpIHNlbmRzIG1vdXNlZW50ZXIgdG9vIG9mdGVuOyBzZWU6XG4vLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NzAyNThcbi8vIGZvciB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIGJ1ZyAoaXQgZXhpc3RlZCBpbiBvbGRlciBDaHJvbWUgdmVyc2lvbnMgYXMgd2VsbCkuXG5qUXVlcnkuZWFjaCgge1xuXHRtb3VzZWVudGVyOiBcIm1vdXNlb3ZlclwiLFxuXHRtb3VzZWxlYXZlOiBcIm1vdXNlb3V0XCIsXG5cdHBvaW50ZXJlbnRlcjogXCJwb2ludGVyb3ZlclwiLFxuXHRwb2ludGVybGVhdmU6IFwicG9pbnRlcm91dFwiXG59LCBmdW5jdGlvbiggb3JpZywgZml4ICkge1xuXHRqUXVlcnkuZXZlbnQuc3BlY2lhbFsgb3JpZyBdID0ge1xuXHRcdGRlbGVnYXRlVHlwZTogZml4LFxuXHRcdGJpbmRUeXBlOiBmaXgsXG5cblx0XHRoYW5kbGU6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdHZhciByZXQsXG5cdFx0XHRcdHRhcmdldCA9IHRoaXMsXG5cdFx0XHRcdHJlbGF0ZWQgPSBldmVudC5yZWxhdGVkVGFyZ2V0LFxuXHRcdFx0XHRoYW5kbGVPYmogPSBldmVudC5oYW5kbGVPYmo7XG5cblx0XHRcdC8vIEZvciBtb3VzZWVudGVyL2xlYXZlIGNhbGwgdGhlIGhhbmRsZXIgaWYgcmVsYXRlZCBpcyBvdXRzaWRlIHRoZSB0YXJnZXQuXG5cdFx0XHQvLyBOQjogTm8gcmVsYXRlZFRhcmdldCBpZiB0aGUgbW91c2UgbGVmdC9lbnRlcmVkIHRoZSBicm93c2VyIHdpbmRvd1xuXHRcdFx0aWYgKCAhcmVsYXRlZCB8fCAoIHJlbGF0ZWQgIT09IHRhcmdldCAmJiAhalF1ZXJ5LmNvbnRhaW5zKCB0YXJnZXQsIHJlbGF0ZWQgKSApICkge1xuXHRcdFx0XHRldmVudC50eXBlID0gaGFuZGxlT2JqLm9yaWdUeXBlO1xuXHRcdFx0XHRyZXQgPSBoYW5kbGVPYmouaGFuZGxlci5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHRcdGV2ZW50LnR5cGUgPSBmaXg7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH1cblx0fTtcbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXG5cdG9uOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gb24oIHRoaXMsIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKTtcblx0fSxcblx0b25lOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gb24oIHRoaXMsIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4sIDEgKTtcblx0fSxcblx0b2ZmOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBmbiApIHtcblx0XHR2YXIgaGFuZGxlT2JqLCB0eXBlO1xuXHRcdGlmICggdHlwZXMgJiYgdHlwZXMucHJldmVudERlZmF1bHQgJiYgdHlwZXMuaGFuZGxlT2JqICkge1xuXG5cdFx0XHQvLyAoIGV2ZW50ICkgIGRpc3BhdGNoZWQgalF1ZXJ5LkV2ZW50XG5cdFx0XHRoYW5kbGVPYmogPSB0eXBlcy5oYW5kbGVPYmo7XG5cdFx0XHRqUXVlcnkoIHR5cGVzLmRlbGVnYXRlVGFyZ2V0ICkub2ZmKFxuXHRcdFx0XHRoYW5kbGVPYmoubmFtZXNwYWNlID9cblx0XHRcdFx0XHRoYW5kbGVPYmoub3JpZ1R5cGUgKyBcIi5cIiArIGhhbmRsZU9iai5uYW1lc3BhY2UgOlxuXHRcdFx0XHRcdGhhbmRsZU9iai5vcmlnVHlwZSxcblx0XHRcdFx0aGFuZGxlT2JqLnNlbGVjdG9yLFxuXHRcdFx0XHRoYW5kbGVPYmouaGFuZGxlclxuXHRcdFx0KTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0XHRpZiAoIHR5cGVvZiB0eXBlcyA9PT0gXCJvYmplY3RcIiApIHtcblxuXHRcdFx0Ly8gKCB0eXBlcy1vYmplY3QgWywgc2VsZWN0b3JdIClcblx0XHRcdGZvciAoIHR5cGUgaW4gdHlwZXMgKSB7XG5cdFx0XHRcdHRoaXMub2ZmKCB0eXBlLCBzZWxlY3RvciwgdHlwZXNbIHR5cGUgXSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHRcdGlmICggc2VsZWN0b3IgPT09IGZhbHNlIHx8IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJmdW5jdGlvblwiICkge1xuXG5cdFx0XHQvLyAoIHR5cGVzIFssIGZuXSApXG5cdFx0XHRmbiA9IHNlbGVjdG9yO1xuXHRcdFx0c2VsZWN0b3IgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdGlmICggZm4gPT09IGZhbHNlICkge1xuXHRcdFx0Zm4gPSByZXR1cm5GYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQucmVtb3ZlKCB0aGlzLCB0eXBlcywgZm4sIHNlbGVjdG9yICk7XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cblxudmFyXG5cblx0LyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuXG5cdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZXNsaW50L2VzbGludC9pc3N1ZXMvMzIyOVxuXHRyeGh0bWxUYWcgPSAvPCg/IWFyZWF8YnJ8Y29sfGVtYmVkfGhyfGltZ3xpbnB1dHxsaW5rfG1ldGF8cGFyYW0pKChbYS16XVteXFwvXFwwPlxceDIwXFx0XFxyXFxuXFxmXSopW14+XSopXFwvPi9naSxcblxuXHQvKiBlc2xpbnQtZW5hYmxlICovXG5cblx0Ly8gU3VwcG9ydDogSUUgPD0xMCAtIDExLCBFZGdlIDEyIC0gMTNcblx0Ly8gSW4gSUUvRWRnZSB1c2luZyByZWdleCBncm91cHMgaGVyZSBjYXVzZXMgc2V2ZXJlIHNsb3dkb3ducy5cblx0Ly8gU2VlIGh0dHBzOi8vY29ubmVjdC5taWNyb3NvZnQuY29tL0lFL2ZlZWRiYWNrL2RldGFpbHMvMTczNjUxMi9cblx0cm5vSW5uZXJodG1sID0gLzxzY3JpcHR8PHN0eWxlfDxsaW5rL2ksXG5cblx0Ly8gY2hlY2tlZD1cImNoZWNrZWRcIiBvciBjaGVja2VkXG5cdHJjaGVja2VkID0gL2NoZWNrZWRcXHMqKD86W149XXw9XFxzKi5jaGVja2VkLikvaSxcblx0cnNjcmlwdFR5cGVNYXNrZWQgPSAvXnRydWVcXC8oLiopLyxcblx0cmNsZWFuU2NyaXB0ID0gL15cXHMqPCEoPzpcXFtDREFUQVxcW3wtLSl8KD86XFxdXFxdfC0tKT5cXHMqJC9nO1xuXG4vLyBQcmVmZXIgYSB0Ym9keSBvdmVyIGl0cyBwYXJlbnQgdGFibGUgZm9yIGNvbnRhaW5pbmcgbmV3IHJvd3NcbmZ1bmN0aW9uIG1hbmlwdWxhdGlvblRhcmdldCggZWxlbSwgY29udGVudCApIHtcblx0aWYgKCBub2RlTmFtZSggZWxlbSwgXCJ0YWJsZVwiICkgJiZcblx0XHRub2RlTmFtZSggY29udGVudC5ub2RlVHlwZSAhPT0gMTEgPyBjb250ZW50IDogY29udGVudC5maXJzdENoaWxkLCBcInRyXCIgKSApIHtcblxuXHRcdHJldHVybiBqUXVlcnkoIFwiPnRib2R5XCIsIGVsZW0gKVsgMCBdIHx8IGVsZW07XG5cdH1cblxuXHRyZXR1cm4gZWxlbTtcbn1cblxuLy8gUmVwbGFjZS9yZXN0b3JlIHRoZSB0eXBlIGF0dHJpYnV0ZSBvZiBzY3JpcHQgZWxlbWVudHMgZm9yIHNhZmUgRE9NIG1hbmlwdWxhdGlvblxuZnVuY3Rpb24gZGlzYWJsZVNjcmlwdCggZWxlbSApIHtcblx0ZWxlbS50eXBlID0gKCBlbGVtLmdldEF0dHJpYnV0ZSggXCJ0eXBlXCIgKSAhPT0gbnVsbCApICsgXCIvXCIgKyBlbGVtLnR5cGU7XG5cdHJldHVybiBlbGVtO1xufVxuZnVuY3Rpb24gcmVzdG9yZVNjcmlwdCggZWxlbSApIHtcblx0dmFyIG1hdGNoID0gcnNjcmlwdFR5cGVNYXNrZWQuZXhlYyggZWxlbS50eXBlICk7XG5cblx0aWYgKCBtYXRjaCApIHtcblx0XHRlbGVtLnR5cGUgPSBtYXRjaFsgMSBdO1xuXHR9IGVsc2Uge1xuXHRcdGVsZW0ucmVtb3ZlQXR0cmlidXRlKCBcInR5cGVcIiApO1xuXHR9XG5cblx0cmV0dXJuIGVsZW07XG59XG5cbmZ1bmN0aW9uIGNsb25lQ29weUV2ZW50KCBzcmMsIGRlc3QgKSB7XG5cdHZhciBpLCBsLCB0eXBlLCBwZGF0YU9sZCwgcGRhdGFDdXIsIHVkYXRhT2xkLCB1ZGF0YUN1ciwgZXZlbnRzO1xuXG5cdGlmICggZGVzdC5ub2RlVHlwZSAhPT0gMSApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyAxLiBDb3B5IHByaXZhdGUgZGF0YTogZXZlbnRzLCBoYW5kbGVycywgZXRjLlxuXHRpZiAoIGRhdGFQcml2Lmhhc0RhdGEoIHNyYyApICkge1xuXHRcdHBkYXRhT2xkID0gZGF0YVByaXYuYWNjZXNzKCBzcmMgKTtcblx0XHRwZGF0YUN1ciA9IGRhdGFQcml2LnNldCggZGVzdCwgcGRhdGFPbGQgKTtcblx0XHRldmVudHMgPSBwZGF0YU9sZC5ldmVudHM7XG5cblx0XHRpZiAoIGV2ZW50cyApIHtcblx0XHRcdGRlbGV0ZSBwZGF0YUN1ci5oYW5kbGU7XG5cdFx0XHRwZGF0YUN1ci5ldmVudHMgPSB7fTtcblxuXHRcdFx0Zm9yICggdHlwZSBpbiBldmVudHMgKSB7XG5cdFx0XHRcdGZvciAoIGkgPSAwLCBsID0gZXZlbnRzWyB0eXBlIF0ubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC5hZGQoIGRlc3QsIHR5cGUsIGV2ZW50c1sgdHlwZSBdWyBpIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIDIuIENvcHkgdXNlciBkYXRhXG5cdGlmICggZGF0YVVzZXIuaGFzRGF0YSggc3JjICkgKSB7XG5cdFx0dWRhdGFPbGQgPSBkYXRhVXNlci5hY2Nlc3MoIHNyYyApO1xuXHRcdHVkYXRhQ3VyID0galF1ZXJ5LmV4dGVuZCgge30sIHVkYXRhT2xkICk7XG5cblx0XHRkYXRhVXNlci5zZXQoIGRlc3QsIHVkYXRhQ3VyICk7XG5cdH1cbn1cblxuLy8gRml4IElFIGJ1Z3MsIHNlZSBzdXBwb3J0IHRlc3RzXG5mdW5jdGlvbiBmaXhJbnB1dCggc3JjLCBkZXN0ICkge1xuXHR2YXIgbm9kZU5hbWUgPSBkZXN0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cblx0Ly8gRmFpbHMgdG8gcGVyc2lzdCB0aGUgY2hlY2tlZCBzdGF0ZSBvZiBhIGNsb25lZCBjaGVja2JveCBvciByYWRpbyBidXR0b24uXG5cdGlmICggbm9kZU5hbWUgPT09IFwiaW5wdXRcIiAmJiByY2hlY2thYmxlVHlwZS50ZXN0KCBzcmMudHlwZSApICkge1xuXHRcdGRlc3QuY2hlY2tlZCA9IHNyYy5jaGVja2VkO1xuXG5cdC8vIEZhaWxzIHRvIHJldHVybiB0aGUgc2VsZWN0ZWQgb3B0aW9uIHRvIHRoZSBkZWZhdWx0IHNlbGVjdGVkIHN0YXRlIHdoZW4gY2xvbmluZyBvcHRpb25zXG5cdH0gZWxzZSBpZiAoIG5vZGVOYW1lID09PSBcImlucHV0XCIgfHwgbm9kZU5hbWUgPT09IFwidGV4dGFyZWFcIiApIHtcblx0XHRkZXN0LmRlZmF1bHRWYWx1ZSA9IHNyYy5kZWZhdWx0VmFsdWU7XG5cdH1cbn1cblxuZnVuY3Rpb24gZG9tTWFuaXAoIGNvbGxlY3Rpb24sIGFyZ3MsIGNhbGxiYWNrLCBpZ25vcmVkICkge1xuXG5cdC8vIEZsYXR0ZW4gYW55IG5lc3RlZCBhcnJheXNcblx0YXJncyA9IGNvbmNhdC5hcHBseSggW10sIGFyZ3MgKTtcblxuXHR2YXIgZnJhZ21lbnQsIGZpcnN0LCBzY3JpcHRzLCBoYXNTY3JpcHRzLCBub2RlLCBkb2MsXG5cdFx0aSA9IDAsXG5cdFx0bCA9IGNvbGxlY3Rpb24ubGVuZ3RoLFxuXHRcdGlOb0Nsb25lID0gbCAtIDEsXG5cdFx0dmFsdWUgPSBhcmdzWyAwIF0sXG5cdFx0aXNGdW5jdGlvbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApO1xuXG5cdC8vIFdlIGNhbid0IGNsb25lTm9kZSBmcmFnbWVudHMgdGhhdCBjb250YWluIGNoZWNrZWQsIGluIFdlYktpdFxuXHRpZiAoIGlzRnVuY3Rpb24gfHxcblx0XHRcdCggbCA+IDEgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmXG5cdFx0XHRcdCFzdXBwb3J0LmNoZWNrQ2xvbmUgJiYgcmNoZWNrZWQudGVzdCggdmFsdWUgKSApICkge1xuXHRcdHJldHVybiBjb2xsZWN0aW9uLmVhY2goIGZ1bmN0aW9uKCBpbmRleCApIHtcblx0XHRcdHZhciBzZWxmID0gY29sbGVjdGlvbi5lcSggaW5kZXggKTtcblx0XHRcdGlmICggaXNGdW5jdGlvbiApIHtcblx0XHRcdFx0YXJnc1sgMCBdID0gdmFsdWUuY2FsbCggdGhpcywgaW5kZXgsIHNlbGYuaHRtbCgpICk7XG5cdFx0XHR9XG5cdFx0XHRkb21NYW5pcCggc2VsZiwgYXJncywgY2FsbGJhY2ssIGlnbm9yZWQgKTtcblx0XHR9ICk7XG5cdH1cblxuXHRpZiAoIGwgKSB7XG5cdFx0ZnJhZ21lbnQgPSBidWlsZEZyYWdtZW50KCBhcmdzLCBjb2xsZWN0aW9uWyAwIF0ub3duZXJEb2N1bWVudCwgZmFsc2UsIGNvbGxlY3Rpb24sIGlnbm9yZWQgKTtcblx0XHRmaXJzdCA9IGZyYWdtZW50LmZpcnN0Q2hpbGQ7XG5cblx0XHRpZiAoIGZyYWdtZW50LmNoaWxkTm9kZXMubGVuZ3RoID09PSAxICkge1xuXHRcdFx0ZnJhZ21lbnQgPSBmaXJzdDtcblx0XHR9XG5cblx0XHQvLyBSZXF1aXJlIGVpdGhlciBuZXcgY29udGVudCBvciBhbiBpbnRlcmVzdCBpbiBpZ25vcmVkIGVsZW1lbnRzIHRvIGludm9rZSB0aGUgY2FsbGJhY2tcblx0XHRpZiAoIGZpcnN0IHx8IGlnbm9yZWQgKSB7XG5cdFx0XHRzY3JpcHRzID0galF1ZXJ5Lm1hcCggZ2V0QWxsKCBmcmFnbWVudCwgXCJzY3JpcHRcIiApLCBkaXNhYmxlU2NyaXB0ICk7XG5cdFx0XHRoYXNTY3JpcHRzID0gc2NyaXB0cy5sZW5ndGg7XG5cblx0XHRcdC8vIFVzZSB0aGUgb3JpZ2luYWwgZnJhZ21lbnQgZm9yIHRoZSBsYXN0IGl0ZW1cblx0XHRcdC8vIGluc3RlYWQgb2YgdGhlIGZpcnN0IGJlY2F1c2UgaXQgY2FuIGVuZCB1cFxuXHRcdFx0Ly8gYmVpbmcgZW1wdGllZCBpbmNvcnJlY3RseSBpbiBjZXJ0YWluIHNpdHVhdGlvbnMgKCM4MDcwKS5cblx0XHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0bm9kZSA9IGZyYWdtZW50O1xuXG5cdFx0XHRcdGlmICggaSAhPT0gaU5vQ2xvbmUgKSB7XG5cdFx0XHRcdFx0bm9kZSA9IGpRdWVyeS5jbG9uZSggbm9kZSwgdHJ1ZSwgdHJ1ZSApO1xuXG5cdFx0XHRcdFx0Ly8gS2VlcCByZWZlcmVuY2VzIHRvIGNsb25lZCBzY3JpcHRzIGZvciBsYXRlciByZXN0b3JhdGlvblxuXHRcdFx0XHRcdGlmICggaGFzU2NyaXB0cyApIHtcblxuXHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5LCBQaGFudG9tSlMgMSBvbmx5XG5cdFx0XHRcdFx0XHQvLyBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzIG9uIGFuY2llbnQgV2ViS2l0XG5cdFx0XHRcdFx0XHRqUXVlcnkubWVyZ2UoIHNjcmlwdHMsIGdldEFsbCggbm9kZSwgXCJzY3JpcHRcIiApICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y2FsbGJhY2suY2FsbCggY29sbGVjdGlvblsgaSBdLCBub2RlLCBpICk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggaGFzU2NyaXB0cyApIHtcblx0XHRcdFx0ZG9jID0gc2NyaXB0c1sgc2NyaXB0cy5sZW5ndGggLSAxIF0ub3duZXJEb2N1bWVudDtcblxuXHRcdFx0XHQvLyBSZWVuYWJsZSBzY3JpcHRzXG5cdFx0XHRcdGpRdWVyeS5tYXAoIHNjcmlwdHMsIHJlc3RvcmVTY3JpcHQgKTtcblxuXHRcdFx0XHQvLyBFdmFsdWF0ZSBleGVjdXRhYmxlIHNjcmlwdHMgb24gZmlyc3QgZG9jdW1lbnQgaW5zZXJ0aW9uXG5cdFx0XHRcdGZvciAoIGkgPSAwOyBpIDwgaGFzU2NyaXB0czsgaSsrICkge1xuXHRcdFx0XHRcdG5vZGUgPSBzY3JpcHRzWyBpIF07XG5cdFx0XHRcdFx0aWYgKCByc2NyaXB0VHlwZS50ZXN0KCBub2RlLnR5cGUgfHwgXCJcIiApICYmXG5cdFx0XHRcdFx0XHQhZGF0YVByaXYuYWNjZXNzKCBub2RlLCBcImdsb2JhbEV2YWxcIiApICYmXG5cdFx0XHRcdFx0XHRqUXVlcnkuY29udGFpbnMoIGRvYywgbm9kZSApICkge1xuXG5cdFx0XHRcdFx0XHRpZiAoIG5vZGUuc3JjICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIE9wdGlvbmFsIEFKQVggZGVwZW5kZW5jeSwgYnV0IHdvbid0IHJ1biBzY3JpcHRzIGlmIG5vdCBwcmVzZW50XG5cdFx0XHRcdFx0XHRcdGlmICggalF1ZXJ5Ll9ldmFsVXJsICkge1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5fZXZhbFVybCggbm9kZS5zcmMgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0RE9NRXZhbCggbm9kZS50ZXh0Q29udGVudC5yZXBsYWNlKCByY2xlYW5TY3JpcHQsIFwiXCIgKSwgZG9jICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGNvbGxlY3Rpb247XG59XG5cbmZ1bmN0aW9uIHJlbW92ZSggZWxlbSwgc2VsZWN0b3IsIGtlZXBEYXRhICkge1xuXHR2YXIgbm9kZSxcblx0XHRub2RlcyA9IHNlbGVjdG9yID8galF1ZXJ5LmZpbHRlciggc2VsZWN0b3IsIGVsZW0gKSA6IGVsZW0sXG5cdFx0aSA9IDA7XG5cblx0Zm9yICggOyAoIG5vZGUgPSBub2Rlc1sgaSBdICkgIT0gbnVsbDsgaSsrICkge1xuXHRcdGlmICggIWtlZXBEYXRhICYmIG5vZGUubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIG5vZGUgKSApO1xuXHRcdH1cblxuXHRcdGlmICggbm9kZS5wYXJlbnROb2RlICkge1xuXHRcdFx0aWYgKCBrZWVwRGF0YSAmJiBqUXVlcnkuY29udGFpbnMoIG5vZGUub3duZXJEb2N1bWVudCwgbm9kZSApICkge1xuXHRcdFx0XHRzZXRHbG9iYWxFdmFsKCBnZXRBbGwoIG5vZGUsIFwic2NyaXB0XCIgKSApO1xuXHRcdFx0fVxuXHRcdFx0bm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBub2RlICk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGVsZW07XG59XG5cbmpRdWVyeS5leHRlbmQoIHtcblx0aHRtbFByZWZpbHRlcjogZnVuY3Rpb24oIGh0bWwgKSB7XG5cdFx0cmV0dXJuIGh0bWwucmVwbGFjZSggcnhodG1sVGFnLCBcIjwkMT48LyQyPlwiICk7XG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uKCBlbGVtLCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApIHtcblx0XHR2YXIgaSwgbCwgc3JjRWxlbWVudHMsIGRlc3RFbGVtZW50cyxcblx0XHRcdGNsb25lID0gZWxlbS5jbG9uZU5vZGUoIHRydWUgKSxcblx0XHRcdGluUGFnZSA9IGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICk7XG5cblx0XHQvLyBGaXggSUUgY2xvbmluZyBpc3N1ZXNcblx0XHRpZiAoICFzdXBwb3J0Lm5vQ2xvbmVDaGVja2VkICYmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBlbGVtLm5vZGVUeXBlID09PSAxMSApICYmXG5cdFx0XHRcdCFqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKSApIHtcblxuXHRcdFx0Ly8gV2UgZXNjaGV3IFNpenpsZSBoZXJlIGZvciBwZXJmb3JtYW5jZSByZWFzb25zOiBodHRwczovL2pzcGVyZi5jb20vZ2V0YWxsLXZzLXNpenpsZS8yXG5cdFx0XHRkZXN0RWxlbWVudHMgPSBnZXRBbGwoIGNsb25lICk7XG5cdFx0XHRzcmNFbGVtZW50cyA9IGdldEFsbCggZWxlbSApO1xuXG5cdFx0XHRmb3IgKCBpID0gMCwgbCA9IHNyY0VsZW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0Zml4SW5wdXQoIHNyY0VsZW1lbnRzWyBpIF0sIGRlc3RFbGVtZW50c1sgaSBdICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ29weSB0aGUgZXZlbnRzIGZyb20gdGhlIG9yaWdpbmFsIHRvIHRoZSBjbG9uZVxuXHRcdGlmICggZGF0YUFuZEV2ZW50cyApIHtcblx0XHRcdGlmICggZGVlcERhdGFBbmRFdmVudHMgKSB7XG5cdFx0XHRcdHNyY0VsZW1lbnRzID0gc3JjRWxlbWVudHMgfHwgZ2V0QWxsKCBlbGVtICk7XG5cdFx0XHRcdGRlc3RFbGVtZW50cyA9IGRlc3RFbGVtZW50cyB8fCBnZXRBbGwoIGNsb25lICk7XG5cblx0XHRcdFx0Zm9yICggaSA9IDAsIGwgPSBzcmNFbGVtZW50cy5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdFx0Y2xvbmVDb3B5RXZlbnQoIHNyY0VsZW1lbnRzWyBpIF0sIGRlc3RFbGVtZW50c1sgaSBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNsb25lQ29weUV2ZW50KCBlbGVtLCBjbG9uZSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFByZXNlcnZlIHNjcmlwdCBldmFsdWF0aW9uIGhpc3Rvcnlcblx0XHRkZXN0RWxlbWVudHMgPSBnZXRBbGwoIGNsb25lLCBcInNjcmlwdFwiICk7XG5cdFx0aWYgKCBkZXN0RWxlbWVudHMubGVuZ3RoID4gMCApIHtcblx0XHRcdHNldEdsb2JhbEV2YWwoIGRlc3RFbGVtZW50cywgIWluUGFnZSAmJiBnZXRBbGwoIGVsZW0sIFwic2NyaXB0XCIgKSApO1xuXHRcdH1cblxuXHRcdC8vIFJldHVybiB0aGUgY2xvbmVkIHNldFxuXHRcdHJldHVybiBjbG9uZTtcblx0fSxcblxuXHRjbGVhbkRhdGE6IGZ1bmN0aW9uKCBlbGVtcyApIHtcblx0XHR2YXIgZGF0YSwgZWxlbSwgdHlwZSxcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbCxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Zm9yICggOyAoIGVsZW0gPSBlbGVtc1sgaSBdICkgIT09IHVuZGVmaW5lZDsgaSsrICkge1xuXHRcdFx0aWYgKCBhY2NlcHREYXRhKCBlbGVtICkgKSB7XG5cdFx0XHRcdGlmICggKCBkYXRhID0gZWxlbVsgZGF0YVByaXYuZXhwYW5kbyBdICkgKSB7XG5cdFx0XHRcdFx0aWYgKCBkYXRhLmV2ZW50cyApIHtcblx0XHRcdFx0XHRcdGZvciAoIHR5cGUgaW4gZGF0YS5ldmVudHMgKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggc3BlY2lhbFsgdHlwZSBdICkge1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5ldmVudC5yZW1vdmUoIGVsZW0sIHR5cGUgKTtcblxuXHRcdFx0XHRcdFx0XHQvLyBUaGlzIGlzIGEgc2hvcnRjdXQgdG8gYXZvaWQgalF1ZXJ5LmV2ZW50LnJlbW92ZSdzIG92ZXJoZWFkXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5LnJlbW92ZUV2ZW50KCBlbGVtLCB0eXBlLCBkYXRhLmhhbmRsZSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lIDw9MzUgLSA0NStcblx0XHRcdFx0XHQvLyBBc3NpZ24gdW5kZWZpbmVkIGluc3RlYWQgb2YgdXNpbmcgZGVsZXRlLCBzZWUgRGF0YSNyZW1vdmVcblx0XHRcdFx0XHRlbGVtWyBkYXRhUHJpdi5leHBhbmRvIF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBlbGVtWyBkYXRhVXNlci5leHBhbmRvIF0gKSB7XG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBDaHJvbWUgPD0zNSAtIDQ1K1xuXHRcdFx0XHRcdC8vIEFzc2lnbiB1bmRlZmluZWQgaW5zdGVhZCBvZiB1c2luZyBkZWxldGUsIHNlZSBEYXRhI3JlbW92ZVxuXHRcdFx0XHRcdGVsZW1bIGRhdGFVc2VyLmV4cGFuZG8gXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGRldGFjaDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiByZW1vdmUoIHRoaXMsIHNlbGVjdG9yLCB0cnVlICk7XG5cdH0sXG5cblx0cmVtb3ZlOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHJlbW92ZSggdGhpcywgc2VsZWN0b3IgKTtcblx0fSxcblxuXHR0ZXh0OiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgP1xuXHRcdFx0XHRqUXVlcnkudGV4dCggdGhpcyApIDpcblx0XHRcdFx0dGhpcy5lbXB0eSgpLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmICggdGhpcy5ub2RlVHlwZSA9PT0gMSB8fCB0aGlzLm5vZGVUeXBlID09PSAxMSB8fCB0aGlzLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHRcdFx0dGhpcy50ZXh0Q29udGVudCA9IHZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApO1xuXHRcdH0sIG51bGwsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoICk7XG5cdH0sXG5cblx0YXBwZW5kOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZG9tTWFuaXAoIHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRpZiAoIHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0dmFyIHRhcmdldCA9IG1hbmlwdWxhdGlvblRhcmdldCggdGhpcywgZWxlbSApO1xuXHRcdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoIGVsZW0gKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0cHJlcGVuZDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLm5vZGVUeXBlID09PSAxIHx8IHRoaXMubm9kZVR5cGUgPT09IDExIHx8IHRoaXMubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdHZhciB0YXJnZXQgPSBtYW5pcHVsYXRpb25UYXJnZXQoIHRoaXMsIGVsZW0gKTtcblx0XHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZSggZWxlbSwgdGFyZ2V0LmZpcnN0Q2hpbGQgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0YmVmb3JlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZG9tTWFuaXAoIHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRpZiAoIHRoaXMucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0dGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggZWxlbSwgdGhpcyApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblxuXHRhZnRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIGVsZW0sIHRoaXMubmV4dFNpYmxpbmcgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0ZW1wdHk6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlbGVtLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRmb3IgKCA7ICggZWxlbSA9IHRoaXNbIGkgXSApICE9IG51bGw7IGkrKyApIHtcblx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblxuXHRcdFx0XHQvLyBQcmV2ZW50IG1lbW9yeSBsZWFrc1xuXHRcdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIGVsZW0sIGZhbHNlICkgKTtcblxuXHRcdFx0XHQvLyBSZW1vdmUgYW55IHJlbWFpbmluZyBub2Rlc1xuXHRcdFx0XHRlbGVtLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24oIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzICkge1xuXHRcdGRhdGFBbmRFdmVudHMgPSBkYXRhQW5kRXZlbnRzID09IG51bGwgPyBmYWxzZSA6IGRhdGFBbmRFdmVudHM7XG5cdFx0ZGVlcERhdGFBbmRFdmVudHMgPSBkZWVwRGF0YUFuZEV2ZW50cyA9PSBudWxsID8gZGF0YUFuZEV2ZW50cyA6IGRlZXBEYXRhQW5kRXZlbnRzO1xuXG5cdFx0cmV0dXJuIHRoaXMubWFwKCBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBqUXVlcnkuY2xvbmUoIHRoaXMsIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzICk7XG5cdFx0fSApO1xuXHR9LFxuXG5cdGh0bWw6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHR2YXIgZWxlbSA9IHRoaXNbIDAgXSB8fCB7fSxcblx0XHRcdFx0aSA9IDAsXG5cdFx0XHRcdGwgPSB0aGlzLmxlbmd0aDtcblxuXHRcdFx0aWYgKCB2YWx1ZSA9PT0gdW5kZWZpbmVkICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRcdHJldHVybiBlbGVtLmlubmVySFRNTDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2VlIGlmIHdlIGNhbiB0YWtlIGEgc2hvcnRjdXQgYW5kIGp1c3QgdXNlIGlubmVySFRNTFxuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgIXJub0lubmVyaHRtbC50ZXN0KCB2YWx1ZSApICYmXG5cdFx0XHRcdCF3cmFwTWFwWyAoIHJ0YWdOYW1lLmV4ZWMoIHZhbHVlICkgfHwgWyBcIlwiLCBcIlwiIF0gKVsgMSBdLnRvTG93ZXJDYXNlKCkgXSApIHtcblxuXHRcdFx0XHR2YWx1ZSA9IGpRdWVyeS5odG1sUHJlZmlsdGVyKCB2YWx1ZSApO1xuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRcdFx0ZWxlbSA9IHRoaXNbIGkgXSB8fCB7fTtcblxuXHRcdFx0XHRcdFx0Ly8gUmVtb3ZlIGVsZW1lbnQgbm9kZXMgYW5kIHByZXZlbnQgbWVtb3J5IGxlYWtzXG5cdFx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRcdFx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggZWxlbSwgZmFsc2UgKSApO1xuXHRcdFx0XHRcdFx0XHRlbGVtLmlubmVySFRNTCA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGVsZW0gPSAwO1xuXG5cdFx0XHRcdC8vIElmIHVzaW5nIGlubmVySFRNTCB0aHJvd3MgYW4gZXhjZXB0aW9uLCB1c2UgdGhlIGZhbGxiYWNrIG1ldGhvZFxuXHRcdFx0XHR9IGNhdGNoICggZSApIHt9XG5cdFx0XHR9XG5cblx0XHRcdGlmICggZWxlbSApIHtcblx0XHRcdFx0dGhpcy5lbXB0eSgpLmFwcGVuZCggdmFsdWUgKTtcblx0XHRcdH1cblx0XHR9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCApO1xuXHR9LFxuXG5cdHJlcGxhY2VXaXRoOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgaWdub3JlZCA9IFtdO1xuXG5cdFx0Ly8gTWFrZSB0aGUgY2hhbmdlcywgcmVwbGFjaW5nIGVhY2ggbm9uLWlnbm9yZWQgY29udGV4dCBlbGVtZW50IHdpdGggdGhlIG5ldyBjb250ZW50XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0dmFyIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcblxuXHRcdFx0aWYgKCBqUXVlcnkuaW5BcnJheSggdGhpcywgaWdub3JlZCApIDwgMCApIHtcblx0XHRcdFx0alF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCB0aGlzICkgKTtcblx0XHRcdFx0aWYgKCBwYXJlbnQgKSB7XG5cdFx0XHRcdFx0cGFyZW50LnJlcGxhY2VDaGlsZCggZWxlbSwgdGhpcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHQvLyBGb3JjZSBjYWxsYmFjayBpbnZvY2F0aW9uXG5cdFx0fSwgaWdub3JlZCApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5lYWNoKCB7XG5cdGFwcGVuZFRvOiBcImFwcGVuZFwiLFxuXHRwcmVwZW5kVG86IFwicHJlcGVuZFwiLFxuXHRpbnNlcnRCZWZvcmU6IFwiYmVmb3JlXCIsXG5cdGluc2VydEFmdGVyOiBcImFmdGVyXCIsXG5cdHJlcGxhY2VBbGw6IFwicmVwbGFjZVdpdGhcIlxufSwgZnVuY3Rpb24oIG5hbWUsIG9yaWdpbmFsICkge1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHR2YXIgZWxlbXMsXG5cdFx0XHRyZXQgPSBbXSxcblx0XHRcdGluc2VydCA9IGpRdWVyeSggc2VsZWN0b3IgKSxcblx0XHRcdGxhc3QgPSBpbnNlcnQubGVuZ3RoIC0gMSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Zm9yICggOyBpIDw9IGxhc3Q7IGkrKyApIHtcblx0XHRcdGVsZW1zID0gaSA9PT0gbGFzdCA/IHRoaXMgOiB0aGlzLmNsb25lKCB0cnVlICk7XG5cdFx0XHRqUXVlcnkoIGluc2VydFsgaSBdIClbIG9yaWdpbmFsIF0oIGVsZW1zICk7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seSwgUGhhbnRvbUpTIDEgb25seVxuXHRcdFx0Ly8gLmdldCgpIGJlY2F1c2UgcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRcdFx0cHVzaC5hcHBseSggcmV0LCBlbGVtcy5nZXQoKSApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggcmV0ICk7XG5cdH07XG59ICk7XG52YXIgcm1hcmdpbiA9ICggL15tYXJnaW4vICk7XG5cbnZhciBybnVtbm9ucHggPSBuZXcgUmVnRXhwKCBcIl4oXCIgKyBwbnVtICsgXCIpKD8hcHgpW2EteiVdKyRcIiwgXCJpXCIgKTtcblxudmFyIGdldFN0eWxlcyA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0Ly8gU3VwcG9ydDogSUUgPD0xMSBvbmx5LCBGaXJlZm94IDw9MzAgKCMxNTA5OCwgIzE0MTUwKVxuXHRcdC8vIElFIHRocm93cyBvbiBlbGVtZW50cyBjcmVhdGVkIGluIHBvcHVwc1xuXHRcdC8vIEZGIG1lYW53aGlsZSB0aHJvd3Mgb24gZnJhbWUgZWxlbWVudHMgdGhyb3VnaCBcImRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGVcIlxuXHRcdHZhciB2aWV3ID0gZWxlbS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xuXG5cdFx0aWYgKCAhdmlldyB8fCAhdmlldy5vcGVuZXIgKSB7XG5cdFx0XHR2aWV3ID0gd2luZG93O1xuXHRcdH1cblxuXHRcdHJldHVybiB2aWV3LmdldENvbXB1dGVkU3R5bGUoIGVsZW0gKTtcblx0fTtcblxuXG5cbiggZnVuY3Rpb24oKSB7XG5cblx0Ly8gRXhlY3V0aW5nIGJvdGggcGl4ZWxQb3NpdGlvbiAmIGJveFNpemluZ1JlbGlhYmxlIHRlc3RzIHJlcXVpcmUgb25seSBvbmUgbGF5b3V0XG5cdC8vIHNvIHRoZXkncmUgZXhlY3V0ZWQgYXQgdGhlIHNhbWUgdGltZSB0byBzYXZlIHRoZSBzZWNvbmQgY29tcHV0YXRpb24uXG5cdGZ1bmN0aW9uIGNvbXB1dGVTdHlsZVRlc3RzKCkge1xuXG5cdFx0Ly8gVGhpcyBpcyBhIHNpbmdsZXRvbiwgd2UgbmVlZCB0byBleGVjdXRlIGl0IG9ubHkgb25jZVxuXHRcdGlmICggIWRpdiApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRkaXYuc3R5bGUuY3NzVGV4dCA9XG5cdFx0XHRcImJveC1zaXppbmc6Ym9yZGVyLWJveDtcIiArXG5cdFx0XHRcInBvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7XCIgK1xuXHRcdFx0XCJtYXJnaW46YXV0bztib3JkZXI6MXB4O3BhZGRpbmc6MXB4O1wiICtcblx0XHRcdFwidG9wOjElO3dpZHRoOjUwJVwiO1xuXHRcdGRpdi5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdGRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZCggY29udGFpbmVyICk7XG5cblx0XHR2YXIgZGl2U3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSggZGl2ICk7XG5cdFx0cGl4ZWxQb3NpdGlvblZhbCA9IGRpdlN0eWxlLnRvcCAhPT0gXCIxJVwiO1xuXG5cdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA0LjAgLSA0LjMgb25seSwgRmlyZWZveCA8PTMgLSA0NFxuXHRcdHJlbGlhYmxlTWFyZ2luTGVmdFZhbCA9IGRpdlN0eWxlLm1hcmdpbkxlZnQgPT09IFwiMnB4XCI7XG5cdFx0Ym94U2l6aW5nUmVsaWFibGVWYWwgPSBkaXZTdHlsZS53aWR0aCA9PT0gXCI0cHhcIjtcblxuXHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgNC4wIC0gNC4zIG9ubHlcblx0XHQvLyBTb21lIHN0eWxlcyBjb21lIGJhY2sgd2l0aCBwZXJjZW50YWdlIHZhbHVlcywgZXZlbiB0aG91Z2ggdGhleSBzaG91bGRuJ3Rcblx0XHRkaXYuc3R5bGUubWFyZ2luUmlnaHQgPSBcIjUwJVwiO1xuXHRcdHBpeGVsTWFyZ2luUmlnaHRWYWwgPSBkaXZTdHlsZS5tYXJnaW5SaWdodCA9PT0gXCI0cHhcIjtcblxuXHRcdGRvY3VtZW50RWxlbWVudC5yZW1vdmVDaGlsZCggY29udGFpbmVyICk7XG5cblx0XHQvLyBOdWxsaWZ5IHRoZSBkaXYgc28gaXQgd291bGRuJ3QgYmUgc3RvcmVkIGluIHRoZSBtZW1vcnkgYW5kXG5cdFx0Ly8gaXQgd2lsbCBhbHNvIGJlIGEgc2lnbiB0aGF0IGNoZWNrcyBhbHJlYWR5IHBlcmZvcm1lZFxuXHRcdGRpdiA9IG51bGw7XG5cdH1cblxuXHR2YXIgcGl4ZWxQb3NpdGlvblZhbCwgYm94U2l6aW5nUmVsaWFibGVWYWwsIHBpeGVsTWFyZ2luUmlnaHRWYWwsIHJlbGlhYmxlTWFyZ2luTGVmdFZhbCxcblx0XHRjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICksXG5cdFx0ZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xuXG5cdC8vIEZpbmlzaCBlYXJseSBpbiBsaW1pdGVkIChub24tYnJvd3NlcikgZW52aXJvbm1lbnRzXG5cdGlmICggIWRpdi5zdHlsZSApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBTdXBwb3J0OiBJRSA8PTkgLSAxMSBvbmx5XG5cdC8vIFN0eWxlIG9mIGNsb25lZCBlbGVtZW50IGFmZmVjdHMgc291cmNlIGVsZW1lbnQgY2xvbmVkICgjODkwOClcblx0ZGl2LnN0eWxlLmJhY2tncm91bmRDbGlwID0gXCJjb250ZW50LWJveFwiO1xuXHRkaXYuY2xvbmVOb2RlKCB0cnVlICkuc3R5bGUuYmFja2dyb3VuZENsaXAgPSBcIlwiO1xuXHRzdXBwb3J0LmNsZWFyQ2xvbmVTdHlsZSA9IGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCA9PT0gXCJjb250ZW50LWJveFwiO1xuXG5cdGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gXCJib3JkZXI6MDt3aWR0aDo4cHg7aGVpZ2h0OjA7dG9wOjA7bGVmdDotOTk5OXB4O1wiICtcblx0XHRcInBhZGRpbmc6MDttYXJnaW4tdG9wOjFweDtwb3NpdGlvbjphYnNvbHV0ZVwiO1xuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoIGRpdiApO1xuXG5cdGpRdWVyeS5leHRlbmQoIHN1cHBvcnQsIHtcblx0XHRwaXhlbFBvc2l0aW9uOiBmdW5jdGlvbigpIHtcblx0XHRcdGNvbXB1dGVTdHlsZVRlc3RzKCk7XG5cdFx0XHRyZXR1cm4gcGl4ZWxQb3NpdGlvblZhbDtcblx0XHR9LFxuXHRcdGJveFNpemluZ1JlbGlhYmxlOiBmdW5jdGlvbigpIHtcblx0XHRcdGNvbXB1dGVTdHlsZVRlc3RzKCk7XG5cdFx0XHRyZXR1cm4gYm94U2l6aW5nUmVsaWFibGVWYWw7XG5cdFx0fSxcblx0XHRwaXhlbE1hcmdpblJpZ2h0OiBmdW5jdGlvbigpIHtcblx0XHRcdGNvbXB1dGVTdHlsZVRlc3RzKCk7XG5cdFx0XHRyZXR1cm4gcGl4ZWxNYXJnaW5SaWdodFZhbDtcblx0XHR9LFxuXHRcdHJlbGlhYmxlTWFyZ2luTGVmdDogZnVuY3Rpb24oKSB7XG5cdFx0XHRjb21wdXRlU3R5bGVUZXN0cygpO1xuXHRcdFx0cmV0dXJuIHJlbGlhYmxlTWFyZ2luTGVmdFZhbDtcblx0XHR9XG5cdH0gKTtcbn0gKSgpO1xuXG5cbmZ1bmN0aW9uIGN1ckNTUyggZWxlbSwgbmFtZSwgY29tcHV0ZWQgKSB7XG5cdHZhciB3aWR0aCwgbWluV2lkdGgsIG1heFdpZHRoLCByZXQsXG5cblx0XHQvLyBTdXBwb3J0OiBGaXJlZm94IDUxK1xuXHRcdC8vIFJldHJpZXZpbmcgc3R5bGUgYmVmb3JlIGNvbXB1dGVkIHNvbWVob3dcblx0XHQvLyBmaXhlcyBhbiBpc3N1ZSB3aXRoIGdldHRpbmcgd3JvbmcgdmFsdWVzXG5cdFx0Ly8gb24gZGV0YWNoZWQgZWxlbWVudHNcblx0XHRzdHlsZSA9IGVsZW0uc3R5bGU7XG5cblx0Y29tcHV0ZWQgPSBjb21wdXRlZCB8fCBnZXRTdHlsZXMoIGVsZW0gKTtcblxuXHQvLyBnZXRQcm9wZXJ0eVZhbHVlIGlzIG5lZWRlZCBmb3I6XG5cdC8vICAgLmNzcygnZmlsdGVyJykgKElFIDkgb25seSwgIzEyNTM3KVxuXHQvLyAgIC5jc3MoJy0tY3VzdG9tUHJvcGVydHkpICgjMzE0NClcblx0aWYgKCBjb21wdXRlZCApIHtcblx0XHRyZXQgPSBjb21wdXRlZC5nZXRQcm9wZXJ0eVZhbHVlKCBuYW1lICkgfHwgY29tcHV0ZWRbIG5hbWUgXTtcblxuXHRcdGlmICggcmV0ID09PSBcIlwiICYmICFqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApICkge1xuXHRcdFx0cmV0ID0galF1ZXJ5LnN0eWxlKCBlbGVtLCBuYW1lICk7XG5cdFx0fVxuXG5cdFx0Ly8gQSB0cmlidXRlIHRvIHRoZSBcImF3ZXNvbWUgaGFjayBieSBEZWFuIEVkd2FyZHNcIlxuXHRcdC8vIEFuZHJvaWQgQnJvd3NlciByZXR1cm5zIHBlcmNlbnRhZ2UgZm9yIHNvbWUgdmFsdWVzLFxuXHRcdC8vIGJ1dCB3aWR0aCBzZWVtcyB0byBiZSByZWxpYWJseSBwaXhlbHMuXG5cdFx0Ly8gVGhpcyBpcyBhZ2FpbnN0IHRoZSBDU1NPTSBkcmFmdCBzcGVjOlxuXHRcdC8vIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3NvbS8jcmVzb2x2ZWQtdmFsdWVzXG5cdFx0aWYgKCAhc3VwcG9ydC5waXhlbE1hcmdpblJpZ2h0KCkgJiYgcm51bW5vbnB4LnRlc3QoIHJldCApICYmIHJtYXJnaW4udGVzdCggbmFtZSApICkge1xuXG5cdFx0XHQvLyBSZW1lbWJlciB0aGUgb3JpZ2luYWwgdmFsdWVzXG5cdFx0XHR3aWR0aCA9IHN0eWxlLndpZHRoO1xuXHRcdFx0bWluV2lkdGggPSBzdHlsZS5taW5XaWR0aDtcblx0XHRcdG1heFdpZHRoID0gc3R5bGUubWF4V2lkdGg7XG5cblx0XHRcdC8vIFB1dCBpbiB0aGUgbmV3IHZhbHVlcyB0byBnZXQgYSBjb21wdXRlZCB2YWx1ZSBvdXRcblx0XHRcdHN0eWxlLm1pbldpZHRoID0gc3R5bGUubWF4V2lkdGggPSBzdHlsZS53aWR0aCA9IHJldDtcblx0XHRcdHJldCA9IGNvbXB1dGVkLndpZHRoO1xuXG5cdFx0XHQvLyBSZXZlcnQgdGhlIGNoYW5nZWQgdmFsdWVzXG5cdFx0XHRzdHlsZS53aWR0aCA9IHdpZHRoO1xuXHRcdFx0c3R5bGUubWluV2lkdGggPSBtaW5XaWR0aDtcblx0XHRcdHN0eWxlLm1heFdpZHRoID0gbWF4V2lkdGg7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJldCAhPT0gdW5kZWZpbmVkID9cblxuXHRcdC8vIFN1cHBvcnQ6IElFIDw9OSAtIDExIG9ubHlcblx0XHQvLyBJRSByZXR1cm5zIHpJbmRleCB2YWx1ZSBhcyBhbiBpbnRlZ2VyLlxuXHRcdHJldCArIFwiXCIgOlxuXHRcdHJldDtcbn1cblxuXG5mdW5jdGlvbiBhZGRHZXRIb29rSWYoIGNvbmRpdGlvbkZuLCBob29rRm4gKSB7XG5cblx0Ly8gRGVmaW5lIHRoZSBob29rLCB3ZSdsbCBjaGVjayBvbiB0aGUgZmlyc3QgcnVuIGlmIGl0J3MgcmVhbGx5IG5lZWRlZC5cblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCBjb25kaXRpb25GbigpICkge1xuXG5cdFx0XHRcdC8vIEhvb2sgbm90IG5lZWRlZCAob3IgaXQncyBub3QgcG9zc2libGUgdG8gdXNlIGl0IGR1ZVxuXHRcdFx0XHQvLyB0byBtaXNzaW5nIGRlcGVuZGVuY3kpLCByZW1vdmUgaXQuXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLmdldDtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBIb29rIG5lZWRlZDsgcmVkZWZpbmUgaXQgc28gdGhhdCB0aGUgc3VwcG9ydCB0ZXN0IGlzIG5vdCBleGVjdXRlZCBhZ2Fpbi5cblx0XHRcdHJldHVybiAoIHRoaXMuZ2V0ID0gaG9va0ZuICkuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdH1cblx0fTtcbn1cblxuXG52YXJcblxuXHQvLyBTd2FwcGFibGUgaWYgZGlzcGxheSBpcyBub25lIG9yIHN0YXJ0cyB3aXRoIHRhYmxlXG5cdC8vIGV4Y2VwdCBcInRhYmxlXCIsIFwidGFibGUtY2VsbFwiLCBvciBcInRhYmxlLWNhcHRpb25cIlxuXHQvLyBTZWUgaGVyZSBmb3IgZGlzcGxheSB2YWx1ZXM6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvQ1NTL2Rpc3BsYXlcblx0cmRpc3BsYXlzd2FwID0gL14obm9uZXx0YWJsZSg/IS1jW2VhXSkuKykvLFxuXHRyY3VzdG9tUHJvcCA9IC9eLS0vLFxuXHRjc3NTaG93ID0geyBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLCB2aXNpYmlsaXR5OiBcImhpZGRlblwiLCBkaXNwbGF5OiBcImJsb2NrXCIgfSxcblx0Y3NzTm9ybWFsVHJhbnNmb3JtID0ge1xuXHRcdGxldHRlclNwYWNpbmc6IFwiMFwiLFxuXHRcdGZvbnRXZWlnaHQ6IFwiNDAwXCJcblx0fSxcblxuXHRjc3NQcmVmaXhlcyA9IFsgXCJXZWJraXRcIiwgXCJNb3pcIiwgXCJtc1wiIF0sXG5cdGVtcHR5U3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkuc3R5bGU7XG5cbi8vIFJldHVybiBhIGNzcyBwcm9wZXJ0eSBtYXBwZWQgdG8gYSBwb3RlbnRpYWxseSB2ZW5kb3IgcHJlZml4ZWQgcHJvcGVydHlcbmZ1bmN0aW9uIHZlbmRvclByb3BOYW1lKCBuYW1lICkge1xuXG5cdC8vIFNob3J0Y3V0IGZvciBuYW1lcyB0aGF0IGFyZSBub3QgdmVuZG9yIHByZWZpeGVkXG5cdGlmICggbmFtZSBpbiBlbXB0eVN0eWxlICkge1xuXHRcdHJldHVybiBuYW1lO1xuXHR9XG5cblx0Ly8gQ2hlY2sgZm9yIHZlbmRvciBwcmVmaXhlZCBuYW1lc1xuXHR2YXIgY2FwTmFtZSA9IG5hbWVbIDAgXS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSggMSApLFxuXHRcdGkgPSBjc3NQcmVmaXhlcy5sZW5ndGg7XG5cblx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0bmFtZSA9IGNzc1ByZWZpeGVzWyBpIF0gKyBjYXBOYW1lO1xuXHRcdGlmICggbmFtZSBpbiBlbXB0eVN0eWxlICkge1xuXHRcdFx0cmV0dXJuIG5hbWU7XG5cdFx0fVxuXHR9XG59XG5cbi8vIFJldHVybiBhIHByb3BlcnR5IG1hcHBlZCBhbG9uZyB3aGF0IGpRdWVyeS5jc3NQcm9wcyBzdWdnZXN0cyBvciB0b1xuLy8gYSB2ZW5kb3IgcHJlZml4ZWQgcHJvcGVydHkuXG5mdW5jdGlvbiBmaW5hbFByb3BOYW1lKCBuYW1lICkge1xuXHR2YXIgcmV0ID0galF1ZXJ5LmNzc1Byb3BzWyBuYW1lIF07XG5cdGlmICggIXJldCApIHtcblx0XHRyZXQgPSBqUXVlcnkuY3NzUHJvcHNbIG5hbWUgXSA9IHZlbmRvclByb3BOYW1lKCBuYW1lICkgfHwgbmFtZTtcblx0fVxuXHRyZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBzZXRQb3NpdGl2ZU51bWJlciggZWxlbSwgdmFsdWUsIHN1YnRyYWN0ICkge1xuXG5cdC8vIEFueSByZWxhdGl2ZSAoKy8tKSB2YWx1ZXMgaGF2ZSBhbHJlYWR5IGJlZW5cblx0Ly8gbm9ybWFsaXplZCBhdCB0aGlzIHBvaW50XG5cdHZhciBtYXRjaGVzID0gcmNzc051bS5leGVjKCB2YWx1ZSApO1xuXHRyZXR1cm4gbWF0Y2hlcyA/XG5cblx0XHQvLyBHdWFyZCBhZ2FpbnN0IHVuZGVmaW5lZCBcInN1YnRyYWN0XCIsIGUuZy4sIHdoZW4gdXNlZCBhcyBpbiBjc3NIb29rc1xuXHRcdE1hdGgubWF4KCAwLCBtYXRjaGVzWyAyIF0gLSAoIHN1YnRyYWN0IHx8IDAgKSApICsgKCBtYXRjaGVzWyAzIF0gfHwgXCJweFwiICkgOlxuXHRcdHZhbHVlO1xufVxuXG5mdW5jdGlvbiBhdWdtZW50V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEsIGlzQm9yZGVyQm94LCBzdHlsZXMgKSB7XG5cdHZhciBpLFxuXHRcdHZhbCA9IDA7XG5cblx0Ly8gSWYgd2UgYWxyZWFkeSBoYXZlIHRoZSByaWdodCBtZWFzdXJlbWVudCwgYXZvaWQgYXVnbWVudGF0aW9uXG5cdGlmICggZXh0cmEgPT09ICggaXNCb3JkZXJCb3ggPyBcImJvcmRlclwiIDogXCJjb250ZW50XCIgKSApIHtcblx0XHRpID0gNDtcblxuXHQvLyBPdGhlcndpc2UgaW5pdGlhbGl6ZSBmb3IgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCBwcm9wZXJ0aWVzXG5cdH0gZWxzZSB7XG5cdFx0aSA9IG5hbWUgPT09IFwid2lkdGhcIiA/IDEgOiAwO1xuXHR9XG5cblx0Zm9yICggOyBpIDwgNDsgaSArPSAyICkge1xuXG5cdFx0Ly8gQm90aCBib3ggbW9kZWxzIGV4Y2x1ZGUgbWFyZ2luLCBzbyBhZGQgaXQgaWYgd2Ugd2FudCBpdFxuXHRcdGlmICggZXh0cmEgPT09IFwibWFyZ2luXCIgKSB7XG5cdFx0XHR2YWwgKz0galF1ZXJ5LmNzcyggZWxlbSwgZXh0cmEgKyBjc3NFeHBhbmRbIGkgXSwgdHJ1ZSwgc3R5bGVzICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBpc0JvcmRlckJveCApIHtcblxuXHRcdFx0Ly8gYm9yZGVyLWJveCBpbmNsdWRlcyBwYWRkaW5nLCBzbyByZW1vdmUgaXQgaWYgd2Ugd2FudCBjb250ZW50XG5cdFx0XHRpZiAoIGV4dHJhID09PSBcImNvbnRlbnRcIiApIHtcblx0XHRcdFx0dmFsIC09IGpRdWVyeS5jc3MoIGVsZW0sIFwicGFkZGluZ1wiICsgY3NzRXhwYW5kWyBpIF0sIHRydWUsIHN0eWxlcyApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBdCB0aGlzIHBvaW50LCBleHRyYSBpc24ndCBib3JkZXIgbm9yIG1hcmdpbiwgc28gcmVtb3ZlIGJvcmRlclxuXHRcdFx0aWYgKCBleHRyYSAhPT0gXCJtYXJnaW5cIiApIHtcblx0XHRcdFx0dmFsIC09IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm9yZGVyXCIgKyBjc3NFeHBhbmRbIGkgXSArIFwiV2lkdGhcIiwgdHJ1ZSwgc3R5bGVzICk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gQXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgY29udGVudCwgc28gYWRkIHBhZGRpbmdcblx0XHRcdHZhbCArPSBqUXVlcnkuY3NzKCBlbGVtLCBcInBhZGRpbmdcIiArIGNzc0V4cGFuZFsgaSBdLCB0cnVlLCBzdHlsZXMgKTtcblxuXHRcdFx0Ly8gQXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgY29udGVudCBub3IgcGFkZGluZywgc28gYWRkIGJvcmRlclxuXHRcdFx0aWYgKCBleHRyYSAhPT0gXCJwYWRkaW5nXCIgKSB7XG5cdFx0XHRcdHZhbCArPSBqUXVlcnkuY3NzKCBlbGVtLCBcImJvcmRlclwiICsgY3NzRXhwYW5kWyBpIF0gKyBcIldpZHRoXCIsIHRydWUsIHN0eWxlcyApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB2YWw7XG59XG5cbmZ1bmN0aW9uIGdldFdpZHRoT3JIZWlnaHQoIGVsZW0sIG5hbWUsIGV4dHJhICkge1xuXG5cdC8vIFN0YXJ0IHdpdGggY29tcHV0ZWQgc3R5bGVcblx0dmFyIHZhbHVlSXNCb3JkZXJCb3gsXG5cdFx0c3R5bGVzID0gZ2V0U3R5bGVzKCBlbGVtICksXG5cdFx0dmFsID0gY3VyQ1NTKCBlbGVtLCBuYW1lLCBzdHlsZXMgKSxcblx0XHRpc0JvcmRlckJveCA9IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm94U2l6aW5nXCIsIGZhbHNlLCBzdHlsZXMgKSA9PT0gXCJib3JkZXItYm94XCI7XG5cblx0Ly8gQ29tcHV0ZWQgdW5pdCBpcyBub3QgcGl4ZWxzLiBTdG9wIGhlcmUgYW5kIHJldHVybi5cblx0aWYgKCBybnVtbm9ucHgudGVzdCggdmFsICkgKSB7XG5cdFx0cmV0dXJuIHZhbDtcblx0fVxuXG5cdC8vIENoZWNrIGZvciBzdHlsZSBpbiBjYXNlIGEgYnJvd3NlciB3aGljaCByZXR1cm5zIHVucmVsaWFibGUgdmFsdWVzXG5cdC8vIGZvciBnZXRDb21wdXRlZFN0eWxlIHNpbGVudGx5IGZhbGxzIGJhY2sgdG8gdGhlIHJlbGlhYmxlIGVsZW0uc3R5bGVcblx0dmFsdWVJc0JvcmRlckJveCA9IGlzQm9yZGVyQm94ICYmXG5cdFx0KCBzdXBwb3J0LmJveFNpemluZ1JlbGlhYmxlKCkgfHwgdmFsID09PSBlbGVtLnN0eWxlWyBuYW1lIF0gKTtcblxuXHQvLyBGYWxsIGJhY2sgdG8gb2Zmc2V0V2lkdGgvSGVpZ2h0IHdoZW4gdmFsdWUgaXMgXCJhdXRvXCJcblx0Ly8gVGhpcyBoYXBwZW5zIGZvciBpbmxpbmUgZWxlbWVudHMgd2l0aCBubyBleHBsaWNpdCBzZXR0aW5nIChnaC0zNTcxKVxuXHRpZiAoIHZhbCA9PT0gXCJhdXRvXCIgKSB7XG5cdFx0dmFsID0gZWxlbVsgXCJvZmZzZXRcIiArIG5hbWVbIDAgXS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSggMSApIF07XG5cdH1cblxuXHQvLyBOb3JtYWxpemUgXCJcIiwgYXV0bywgYW5kIHByZXBhcmUgZm9yIGV4dHJhXG5cdHZhbCA9IHBhcnNlRmxvYXQoIHZhbCApIHx8IDA7XG5cblx0Ly8gVXNlIHRoZSBhY3RpdmUgYm94LXNpemluZyBtb2RlbCB0byBhZGQvc3VidHJhY3QgaXJyZWxldmFudCBzdHlsZXNcblx0cmV0dXJuICggdmFsICtcblx0XHRhdWdtZW50V2lkdGhPckhlaWdodChcblx0XHRcdGVsZW0sXG5cdFx0XHRuYW1lLFxuXHRcdFx0ZXh0cmEgfHwgKCBpc0JvcmRlckJveCA/IFwiYm9yZGVyXCIgOiBcImNvbnRlbnRcIiApLFxuXHRcdFx0dmFsdWVJc0JvcmRlckJveCxcblx0XHRcdHN0eWxlc1xuXHRcdClcblx0KSArIFwicHhcIjtcbn1cblxualF1ZXJ5LmV4dGVuZCgge1xuXG5cdC8vIEFkZCBpbiBzdHlsZSBwcm9wZXJ0eSBob29rcyBmb3Igb3ZlcnJpZGluZyB0aGUgZGVmYXVsdFxuXHQvLyBiZWhhdmlvciBvZiBnZXR0aW5nIGFuZCBzZXR0aW5nIGEgc3R5bGUgcHJvcGVydHlcblx0Y3NzSG9va3M6IHtcblx0XHRvcGFjaXR5OiB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCApIHtcblx0XHRcdFx0aWYgKCBjb21wdXRlZCApIHtcblxuXHRcdFx0XHRcdC8vIFdlIHNob3VsZCBhbHdheXMgZ2V0IGEgbnVtYmVyIGJhY2sgZnJvbSBvcGFjaXR5XG5cdFx0XHRcdFx0dmFyIHJldCA9IGN1ckNTUyggZWxlbSwgXCJvcGFjaXR5XCIgKTtcblx0XHRcdFx0XHRyZXR1cm4gcmV0ID09PSBcIlwiID8gXCIxXCIgOiByZXQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Ly8gRG9uJ3QgYXV0b21hdGljYWxseSBhZGQgXCJweFwiIHRvIHRoZXNlIHBvc3NpYmx5LXVuaXRsZXNzIHByb3BlcnRpZXNcblx0Y3NzTnVtYmVyOiB7XG5cdFx0XCJhbmltYXRpb25JdGVyYXRpb25Db3VudFwiOiB0cnVlLFxuXHRcdFwiY29sdW1uQ291bnRcIjogdHJ1ZSxcblx0XHRcImZpbGxPcGFjaXR5XCI6IHRydWUsXG5cdFx0XCJmbGV4R3Jvd1wiOiB0cnVlLFxuXHRcdFwiZmxleFNocmlua1wiOiB0cnVlLFxuXHRcdFwiZm9udFdlaWdodFwiOiB0cnVlLFxuXHRcdFwibGluZUhlaWdodFwiOiB0cnVlLFxuXHRcdFwib3BhY2l0eVwiOiB0cnVlLFxuXHRcdFwib3JkZXJcIjogdHJ1ZSxcblx0XHRcIm9ycGhhbnNcIjogdHJ1ZSxcblx0XHRcIndpZG93c1wiOiB0cnVlLFxuXHRcdFwiekluZGV4XCI6IHRydWUsXG5cdFx0XCJ6b29tXCI6IHRydWVcblx0fSxcblxuXHQvLyBBZGQgaW4gcHJvcGVydGllcyB3aG9zZSBuYW1lcyB5b3Ugd2lzaCB0byBmaXggYmVmb3JlXG5cdC8vIHNldHRpbmcgb3IgZ2V0dGluZyB0aGUgdmFsdWVcblx0Y3NzUHJvcHM6IHtcblx0XHRcImZsb2F0XCI6IFwiY3NzRmxvYXRcIlxuXHR9LFxuXG5cdC8vIEdldCBhbmQgc2V0IHRoZSBzdHlsZSBwcm9wZXJ0eSBvbiBhIERPTSBOb2RlXG5cdHN0eWxlOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUsIGV4dHJhICkge1xuXG5cdFx0Ly8gRG9uJ3Qgc2V0IHN0eWxlcyBvbiB0ZXh0IGFuZCBjb21tZW50IG5vZGVzXG5cdFx0aWYgKCAhZWxlbSB8fCBlbGVtLm5vZGVUeXBlID09PSAzIHx8IGVsZW0ubm9kZVR5cGUgPT09IDggfHwgIWVsZW0uc3R5bGUgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgd2UncmUgd29ya2luZyB3aXRoIHRoZSByaWdodCBuYW1lXG5cdFx0dmFyIHJldCwgdHlwZSwgaG9va3MsXG5cdFx0XHRvcmlnTmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUgKSxcblx0XHRcdGlzQ3VzdG9tUHJvcCA9IHJjdXN0b21Qcm9wLnRlc3QoIG5hbWUgKSxcblx0XHRcdHN0eWxlID0gZWxlbS5zdHlsZTtcblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHdlJ3JlIHdvcmtpbmcgd2l0aCB0aGUgcmlnaHQgbmFtZS4gV2UgZG9uJ3Rcblx0XHQvLyB3YW50IHRvIHF1ZXJ5IHRoZSB2YWx1ZSBpZiBpdCBpcyBhIENTUyBjdXN0b20gcHJvcGVydHlcblx0XHQvLyBzaW5jZSB0aGV5IGFyZSB1c2VyLWRlZmluZWQuXG5cdFx0aWYgKCAhaXNDdXN0b21Qcm9wICkge1xuXHRcdFx0bmFtZSA9IGZpbmFsUHJvcE5hbWUoIG9yaWdOYW1lICk7XG5cdFx0fVxuXG5cdFx0Ly8gR2V0cyBob29rIGZvciB0aGUgcHJlZml4ZWQgdmVyc2lvbiwgdGhlbiB1bnByZWZpeGVkIHZlcnNpb25cblx0XHRob29rcyA9IGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdIHx8IGpRdWVyeS5jc3NIb29rc1sgb3JpZ05hbWUgXTtcblxuXHRcdC8vIENoZWNrIGlmIHdlJ3JlIHNldHRpbmcgYSB2YWx1ZVxuXHRcdGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cblx0XHRcdC8vIENvbnZlcnQgXCIrPVwiIG9yIFwiLT1cIiB0byByZWxhdGl2ZSBudW1iZXJzICgjNzM0NSlcblx0XHRcdGlmICggdHlwZSA9PT0gXCJzdHJpbmdcIiAmJiAoIHJldCA9IHJjc3NOdW0uZXhlYyggdmFsdWUgKSApICYmIHJldFsgMSBdICkge1xuXHRcdFx0XHR2YWx1ZSA9IGFkanVzdENTUyggZWxlbSwgbmFtZSwgcmV0ICk7XG5cblx0XHRcdFx0Ly8gRml4ZXMgYnVnICM5MjM3XG5cdFx0XHRcdHR5cGUgPSBcIm51bWJlclwiO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNYWtlIHN1cmUgdGhhdCBudWxsIGFuZCBOYU4gdmFsdWVzIGFyZW4ndCBzZXQgKCM3MTE2KVxuXHRcdFx0aWYgKCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlICE9PSB2YWx1ZSApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBhIG51bWJlciB3YXMgcGFzc2VkIGluLCBhZGQgdGhlIHVuaXQgKGV4Y2VwdCBmb3IgY2VydGFpbiBDU1MgcHJvcGVydGllcylcblx0XHRcdGlmICggdHlwZSA9PT0gXCJudW1iZXJcIiApIHtcblx0XHRcdFx0dmFsdWUgKz0gcmV0ICYmIHJldFsgMyBdIHx8ICggalF1ZXJ5LmNzc051bWJlclsgb3JpZ05hbWUgXSA/IFwiXCIgOiBcInB4XCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gYmFja2dyb3VuZC0qIHByb3BzIGFmZmVjdCBvcmlnaW5hbCBjbG9uZSdzIHZhbHVlc1xuXHRcdFx0aWYgKCAhc3VwcG9ydC5jbGVhckNsb25lU3R5bGUgJiYgdmFsdWUgPT09IFwiXCIgJiYgbmFtZS5pbmRleE9mKCBcImJhY2tncm91bmRcIiApID09PSAwICkge1xuXHRcdFx0XHRzdHlsZVsgbmFtZSBdID0gXCJpbmhlcml0XCI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQsIHVzZSB0aGF0IHZhbHVlLCBvdGhlcndpc2UganVzdCBzZXQgdGhlIHNwZWNpZmllZCB2YWx1ZVxuXHRcdFx0aWYgKCAhaG9va3MgfHwgISggXCJzZXRcIiBpbiBob29rcyApIHx8XG5cdFx0XHRcdCggdmFsdWUgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBleHRyYSApICkgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRpZiAoIGlzQ3VzdG9tUHJvcCApIHtcblx0XHRcdFx0XHRzdHlsZS5zZXRQcm9wZXJ0eSggbmFtZSwgdmFsdWUgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzdHlsZVsgbmFtZSBdID0gdmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQgZ2V0IHRoZSBub24tY29tcHV0ZWQgdmFsdWUgZnJvbSB0aGVyZVxuXHRcdFx0aWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICYmXG5cdFx0XHRcdCggcmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBmYWxzZSwgZXh0cmEgKSApICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gT3RoZXJ3aXNlIGp1c3QgZ2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBzdHlsZSBvYmplY3Rcblx0XHRcdHJldHVybiBzdHlsZVsgbmFtZSBdO1xuXHRcdH1cblx0fSxcblxuXHRjc3M6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBleHRyYSwgc3R5bGVzICkge1xuXHRcdHZhciB2YWwsIG51bSwgaG9va3MsXG5cdFx0XHRvcmlnTmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUgKSxcblx0XHRcdGlzQ3VzdG9tUHJvcCA9IHJjdXN0b21Qcm9wLnRlc3QoIG5hbWUgKTtcblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHdlJ3JlIHdvcmtpbmcgd2l0aCB0aGUgcmlnaHQgbmFtZS4gV2UgZG9uJ3Rcblx0XHQvLyB3YW50IHRvIG1vZGlmeSB0aGUgdmFsdWUgaWYgaXQgaXMgYSBDU1MgY3VzdG9tIHByb3BlcnR5XG5cdFx0Ly8gc2luY2UgdGhleSBhcmUgdXNlci1kZWZpbmVkLlxuXHRcdGlmICggIWlzQ3VzdG9tUHJvcCApIHtcblx0XHRcdG5hbWUgPSBmaW5hbFByb3BOYW1lKCBvcmlnTmFtZSApO1xuXHRcdH1cblxuXHRcdC8vIFRyeSBwcmVmaXhlZCBuYW1lIGZvbGxvd2VkIGJ5IHRoZSB1bnByZWZpeGVkIG5hbWVcblx0XHRob29rcyA9IGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdIHx8IGpRdWVyeS5jc3NIb29rc1sgb3JpZ05hbWUgXTtcblxuXHRcdC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQgZ2V0IHRoZSBjb21wdXRlZCB2YWx1ZSBmcm9tIHRoZXJlXG5cdFx0aWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICkge1xuXHRcdFx0dmFsID0gaG9va3MuZ2V0KCBlbGVtLCB0cnVlLCBleHRyYSApO1xuXHRcdH1cblxuXHRcdC8vIE90aGVyd2lzZSwgaWYgYSB3YXkgdG8gZ2V0IHRoZSBjb21wdXRlZCB2YWx1ZSBleGlzdHMsIHVzZSB0aGF0XG5cdFx0aWYgKCB2YWwgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHZhbCA9IGN1ckNTUyggZWxlbSwgbmFtZSwgc3R5bGVzICk7XG5cdFx0fVxuXG5cdFx0Ly8gQ29udmVydCBcIm5vcm1hbFwiIHRvIGNvbXB1dGVkIHZhbHVlXG5cdFx0aWYgKCB2YWwgPT09IFwibm9ybWFsXCIgJiYgbmFtZSBpbiBjc3NOb3JtYWxUcmFuc2Zvcm0gKSB7XG5cdFx0XHR2YWwgPSBjc3NOb3JtYWxUcmFuc2Zvcm1bIG5hbWUgXTtcblx0XHR9XG5cblx0XHQvLyBNYWtlIG51bWVyaWMgaWYgZm9yY2VkIG9yIGEgcXVhbGlmaWVyIHdhcyBwcm92aWRlZCBhbmQgdmFsIGxvb2tzIG51bWVyaWNcblx0XHRpZiAoIGV4dHJhID09PSBcIlwiIHx8IGV4dHJhICkge1xuXHRcdFx0bnVtID0gcGFyc2VGbG9hdCggdmFsICk7XG5cdFx0XHRyZXR1cm4gZXh0cmEgPT09IHRydWUgfHwgaXNGaW5pdGUoIG51bSApID8gbnVtIHx8IDAgOiB2YWw7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbDtcblx0fVxufSApO1xuXG5qUXVlcnkuZWFjaCggWyBcImhlaWdodFwiLCBcIndpZHRoXCIgXSwgZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cdGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdID0ge1xuXHRcdGdldDogZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkLCBleHRyYSApIHtcblx0XHRcdGlmICggY29tcHV0ZWQgKSB7XG5cblx0XHRcdFx0Ly8gQ2VydGFpbiBlbGVtZW50cyBjYW4gaGF2ZSBkaW1lbnNpb24gaW5mbyBpZiB3ZSBpbnZpc2libHkgc2hvdyB0aGVtXG5cdFx0XHRcdC8vIGJ1dCBpdCBtdXN0IGhhdmUgYSBjdXJyZW50IGRpc3BsYXkgc3R5bGUgdGhhdCB3b3VsZCBiZW5lZml0XG5cdFx0XHRcdHJldHVybiByZGlzcGxheXN3YXAudGVzdCggalF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKSApICYmXG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBTYWZhcmkgOCtcblx0XHRcdFx0XHQvLyBUYWJsZSBjb2x1bW5zIGluIFNhZmFyaSBoYXZlIG5vbi16ZXJvIG9mZnNldFdpZHRoICYgemVyb1xuXHRcdFx0XHRcdC8vIGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIHVubGVzcyBkaXNwbGF5IGlzIGNoYW5nZWQuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPD0xMSBvbmx5XG5cdFx0XHRcdFx0Ly8gUnVubmluZyBnZXRCb3VuZGluZ0NsaWVudFJlY3Qgb24gYSBkaXNjb25uZWN0ZWQgbm9kZVxuXHRcdFx0XHRcdC8vIGluIElFIHRocm93cyBhbiBlcnJvci5cblx0XHRcdFx0XHQoICFlbGVtLmdldENsaWVudFJlY3RzKCkubGVuZ3RoIHx8ICFlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoICkgP1xuXHRcdFx0XHRcdFx0c3dhcCggZWxlbSwgY3NzU2hvdywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBnZXRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBuYW1lLCBleHRyYSApO1xuXHRcdFx0XHRcdFx0fSApIDpcblx0XHRcdFx0XHRcdGdldFdpZHRoT3JIZWlnaHQoIGVsZW0sIG5hbWUsIGV4dHJhICk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBleHRyYSApIHtcblx0XHRcdHZhciBtYXRjaGVzLFxuXHRcdFx0XHRzdHlsZXMgPSBleHRyYSAmJiBnZXRTdHlsZXMoIGVsZW0gKSxcblx0XHRcdFx0c3VidHJhY3QgPSBleHRyYSAmJiBhdWdtZW50V2lkdGhPckhlaWdodChcblx0XHRcdFx0XHRlbGVtLFxuXHRcdFx0XHRcdG5hbWUsXG5cdFx0XHRcdFx0ZXh0cmEsXG5cdFx0XHRcdFx0alF1ZXJ5LmNzcyggZWxlbSwgXCJib3hTaXppbmdcIiwgZmFsc2UsIHN0eWxlcyApID09PSBcImJvcmRlci1ib3hcIixcblx0XHRcdFx0XHRzdHlsZXNcblx0XHRcdFx0KTtcblxuXHRcdFx0Ly8gQ29udmVydCB0byBwaXhlbHMgaWYgdmFsdWUgYWRqdXN0bWVudCBpcyBuZWVkZWRcblx0XHRcdGlmICggc3VidHJhY3QgJiYgKCBtYXRjaGVzID0gcmNzc051bS5leGVjKCB2YWx1ZSApICkgJiZcblx0XHRcdFx0KCBtYXRjaGVzWyAzIF0gfHwgXCJweFwiICkgIT09IFwicHhcIiApIHtcblxuXHRcdFx0XHRlbGVtLnN0eWxlWyBuYW1lIF0gPSB2YWx1ZTtcblx0XHRcdFx0dmFsdWUgPSBqUXVlcnkuY3NzKCBlbGVtLCBuYW1lICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBzZXRQb3NpdGl2ZU51bWJlciggZWxlbSwgdmFsdWUsIHN1YnRyYWN0ICk7XG5cdFx0fVxuXHR9O1xufSApO1xuXG5qUXVlcnkuY3NzSG9va3MubWFyZ2luTGVmdCA9IGFkZEdldEhvb2tJZiggc3VwcG9ydC5yZWxpYWJsZU1hcmdpbkxlZnQsXG5cdGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCApIHtcblx0XHRpZiAoIGNvbXB1dGVkICkge1xuXHRcdFx0cmV0dXJuICggcGFyc2VGbG9hdCggY3VyQ1NTKCBlbGVtLCBcIm1hcmdpbkxlZnRcIiApICkgfHxcblx0XHRcdFx0ZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC1cblx0XHRcdFx0XHRzd2FwKCBlbGVtLCB7IG1hcmdpbkxlZnQ6IDAgfSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuXHRcdFx0XHRcdH0gKVxuXHRcdFx0XHQpICsgXCJweFwiO1xuXHRcdH1cblx0fVxuKTtcblxuLy8gVGhlc2UgaG9va3MgYXJlIHVzZWQgYnkgYW5pbWF0ZSB0byBleHBhbmQgcHJvcGVydGllc1xualF1ZXJ5LmVhY2goIHtcblx0bWFyZ2luOiBcIlwiLFxuXHRwYWRkaW5nOiBcIlwiLFxuXHRib3JkZXI6IFwiV2lkdGhcIlxufSwgZnVuY3Rpb24oIHByZWZpeCwgc3VmZml4ICkge1xuXHRqUXVlcnkuY3NzSG9va3NbIHByZWZpeCArIHN1ZmZpeCBdID0ge1xuXHRcdGV4cGFuZDogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0dmFyIGkgPSAwLFxuXHRcdFx0XHRleHBhbmRlZCA9IHt9LFxuXG5cdFx0XHRcdC8vIEFzc3VtZXMgYSBzaW5nbGUgbnVtYmVyIGlmIG5vdCBhIHN0cmluZ1xuXHRcdFx0XHRwYXJ0cyA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiA/IHZhbHVlLnNwbGl0KCBcIiBcIiApIDogWyB2YWx1ZSBdO1xuXG5cdFx0XHRmb3IgKCA7IGkgPCA0OyBpKysgKSB7XG5cdFx0XHRcdGV4cGFuZGVkWyBwcmVmaXggKyBjc3NFeHBhbmRbIGkgXSArIHN1ZmZpeCBdID1cblx0XHRcdFx0XHRwYXJ0c1sgaSBdIHx8IHBhcnRzWyBpIC0gMiBdIHx8IHBhcnRzWyAwIF07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBleHBhbmRlZDtcblx0XHR9XG5cdH07XG5cblx0aWYgKCAhcm1hcmdpbi50ZXN0KCBwcmVmaXggKSApIHtcblx0XHRqUXVlcnkuY3NzSG9va3NbIHByZWZpeCArIHN1ZmZpeCBdLnNldCA9IHNldFBvc2l0aXZlTnVtYmVyO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0Y3NzOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlICkge1xuXHRcdFx0dmFyIHN0eWxlcywgbGVuLFxuXHRcdFx0XHRtYXAgPSB7fSxcblx0XHRcdFx0aSA9IDA7XG5cblx0XHRcdGlmICggQXJyYXkuaXNBcnJheSggbmFtZSApICkge1xuXHRcdFx0XHRzdHlsZXMgPSBnZXRTdHlsZXMoIGVsZW0gKTtcblx0XHRcdFx0bGVuID0gbmFtZS5sZW5ndGg7XG5cblx0XHRcdFx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRcdFx0bWFwWyBuYW1lWyBpIF0gXSA9IGpRdWVyeS5jc3MoIGVsZW0sIG5hbWVbIGkgXSwgZmFsc2UsIHN0eWxlcyApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIG1hcDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgP1xuXHRcdFx0XHRqUXVlcnkuc3R5bGUoIGVsZW0sIG5hbWUsIHZhbHVlICkgOlxuXHRcdFx0XHRqUXVlcnkuY3NzKCBlbGVtLCBuYW1lICk7XG5cdFx0fSwgbmFtZSwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxICk7XG5cdH1cbn0gKTtcblxuXG5mdW5jdGlvbiBUd2VlbiggZWxlbSwgb3B0aW9ucywgcHJvcCwgZW5kLCBlYXNpbmcgKSB7XG5cdHJldHVybiBuZXcgVHdlZW4ucHJvdG90eXBlLmluaXQoIGVsZW0sIG9wdGlvbnMsIHByb3AsIGVuZCwgZWFzaW5nICk7XG59XG5qUXVlcnkuVHdlZW4gPSBUd2VlbjtcblxuVHdlZW4ucHJvdG90eXBlID0ge1xuXHRjb25zdHJ1Y3RvcjogVHdlZW4sXG5cdGluaXQ6IGZ1bmN0aW9uKCBlbGVtLCBvcHRpb25zLCBwcm9wLCBlbmQsIGVhc2luZywgdW5pdCApIHtcblx0XHR0aGlzLmVsZW0gPSBlbGVtO1xuXHRcdHRoaXMucHJvcCA9IHByb3A7XG5cdFx0dGhpcy5lYXNpbmcgPSBlYXNpbmcgfHwgalF1ZXJ5LmVhc2luZy5fZGVmYXVsdDtcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXHRcdHRoaXMuc3RhcnQgPSB0aGlzLm5vdyA9IHRoaXMuY3VyKCk7XG5cdFx0dGhpcy5lbmQgPSBlbmQ7XG5cdFx0dGhpcy51bml0ID0gdW5pdCB8fCAoIGpRdWVyeS5jc3NOdW1iZXJbIHByb3AgXSA/IFwiXCIgOiBcInB4XCIgKTtcblx0fSxcblx0Y3VyOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgaG9va3MgPSBUd2Vlbi5wcm9wSG9va3NbIHRoaXMucHJvcCBdO1xuXG5cdFx0cmV0dXJuIGhvb2tzICYmIGhvb2tzLmdldCA/XG5cdFx0XHRob29rcy5nZXQoIHRoaXMgKSA6XG5cdFx0XHRUd2Vlbi5wcm9wSG9va3MuX2RlZmF1bHQuZ2V0KCB0aGlzICk7XG5cdH0sXG5cdHJ1bjogZnVuY3Rpb24oIHBlcmNlbnQgKSB7XG5cdFx0dmFyIGVhc2VkLFxuXHRcdFx0aG9va3MgPSBUd2Vlbi5wcm9wSG9va3NbIHRoaXMucHJvcCBdO1xuXG5cdFx0aWYgKCB0aGlzLm9wdGlvbnMuZHVyYXRpb24gKSB7XG5cdFx0XHR0aGlzLnBvcyA9IGVhc2VkID0galF1ZXJ5LmVhc2luZ1sgdGhpcy5lYXNpbmcgXShcblx0XHRcdFx0cGVyY2VudCwgdGhpcy5vcHRpb25zLmR1cmF0aW9uICogcGVyY2VudCwgMCwgMSwgdGhpcy5vcHRpb25zLmR1cmF0aW9uXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnBvcyA9IGVhc2VkID0gcGVyY2VudDtcblx0XHR9XG5cdFx0dGhpcy5ub3cgPSAoIHRoaXMuZW5kIC0gdGhpcy5zdGFydCApICogZWFzZWQgKyB0aGlzLnN0YXJ0O1xuXG5cdFx0aWYgKCB0aGlzLm9wdGlvbnMuc3RlcCApIHtcblx0XHRcdHRoaXMub3B0aW9ucy5zdGVwLmNhbGwoIHRoaXMuZWxlbSwgdGhpcy5ub3csIHRoaXMgKTtcblx0XHR9XG5cblx0XHRpZiAoIGhvb2tzICYmIGhvb2tzLnNldCApIHtcblx0XHRcdGhvb2tzLnNldCggdGhpcyApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRUd2Vlbi5wcm9wSG9va3MuX2RlZmF1bHQuc2V0KCB0aGlzICk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59O1xuXG5Ud2Vlbi5wcm90b3R5cGUuaW5pdC5wcm90b3R5cGUgPSBUd2Vlbi5wcm90b3R5cGU7XG5cblR3ZWVuLnByb3BIb29rcyA9IHtcblx0X2RlZmF1bHQ6IHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCB0d2VlbiApIHtcblx0XHRcdHZhciByZXN1bHQ7XG5cblx0XHRcdC8vIFVzZSBhIHByb3BlcnR5IG9uIHRoZSBlbGVtZW50IGRpcmVjdGx5IHdoZW4gaXQgaXMgbm90IGEgRE9NIGVsZW1lbnQsXG5cdFx0XHQvLyBvciB3aGVuIHRoZXJlIGlzIG5vIG1hdGNoaW5nIHN0eWxlIHByb3BlcnR5IHRoYXQgZXhpc3RzLlxuXHRcdFx0aWYgKCB0d2Vlbi5lbGVtLm5vZGVUeXBlICE9PSAxIHx8XG5cdFx0XHRcdHR3ZWVuLmVsZW1bIHR3ZWVuLnByb3AgXSAhPSBudWxsICYmIHR3ZWVuLmVsZW0uc3R5bGVbIHR3ZWVuLnByb3AgXSA9PSBudWxsICkge1xuXHRcdFx0XHRyZXR1cm4gdHdlZW4uZWxlbVsgdHdlZW4ucHJvcCBdO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBQYXNzaW5nIGFuIGVtcHR5IHN0cmluZyBhcyBhIDNyZCBwYXJhbWV0ZXIgdG8gLmNzcyB3aWxsIGF1dG9tYXRpY2FsbHlcblx0XHRcdC8vIGF0dGVtcHQgYSBwYXJzZUZsb2F0IGFuZCBmYWxsYmFjayB0byBhIHN0cmluZyBpZiB0aGUgcGFyc2UgZmFpbHMuXG5cdFx0XHQvLyBTaW1wbGUgdmFsdWVzIHN1Y2ggYXMgXCIxMHB4XCIgYXJlIHBhcnNlZCB0byBGbG9hdDtcblx0XHRcdC8vIGNvbXBsZXggdmFsdWVzIHN1Y2ggYXMgXCJyb3RhdGUoMXJhZClcIiBhcmUgcmV0dXJuZWQgYXMtaXMuXG5cdFx0XHRyZXN1bHQgPSBqUXVlcnkuY3NzKCB0d2Vlbi5lbGVtLCB0d2Vlbi5wcm9wLCBcIlwiICk7XG5cblx0XHRcdC8vIEVtcHR5IHN0cmluZ3MsIG51bGwsIHVuZGVmaW5lZCBhbmQgXCJhdXRvXCIgYXJlIGNvbnZlcnRlZCB0byAwLlxuXHRcdFx0cmV0dXJuICFyZXN1bHQgfHwgcmVzdWx0ID09PSBcImF1dG9cIiA/IDAgOiByZXN1bHQ7XG5cdFx0fSxcblx0XHRzZXQ6IGZ1bmN0aW9uKCB0d2VlbiApIHtcblxuXHRcdFx0Ly8gVXNlIHN0ZXAgaG9vayBmb3IgYmFjayBjb21wYXQuXG5cdFx0XHQvLyBVc2UgY3NzSG9vayBpZiBpdHMgdGhlcmUuXG5cdFx0XHQvLyBVc2UgLnN0eWxlIGlmIGF2YWlsYWJsZSBhbmQgdXNlIHBsYWluIHByb3BlcnRpZXMgd2hlcmUgYXZhaWxhYmxlLlxuXHRcdFx0aWYgKCBqUXVlcnkuZnguc3RlcFsgdHdlZW4ucHJvcCBdICkge1xuXHRcdFx0XHRqUXVlcnkuZnguc3RlcFsgdHdlZW4ucHJvcCBdKCB0d2VlbiApO1xuXHRcdFx0fSBlbHNlIGlmICggdHdlZW4uZWxlbS5ub2RlVHlwZSA9PT0gMSAmJlxuXHRcdFx0XHQoIHR3ZWVuLmVsZW0uc3R5bGVbIGpRdWVyeS5jc3NQcm9wc1sgdHdlZW4ucHJvcCBdIF0gIT0gbnVsbCB8fFxuXHRcdFx0XHRcdGpRdWVyeS5jc3NIb29rc1sgdHdlZW4ucHJvcCBdICkgKSB7XG5cdFx0XHRcdGpRdWVyeS5zdHlsZSggdHdlZW4uZWxlbSwgdHdlZW4ucHJvcCwgdHdlZW4ubm93ICsgdHdlZW4udW5pdCApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dHdlZW4uZWxlbVsgdHdlZW4ucHJvcCBdID0gdHdlZW4ubm93O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcblxuLy8gU3VwcG9ydDogSUUgPD05IG9ubHlcbi8vIFBhbmljIGJhc2VkIGFwcHJvYWNoIHRvIHNldHRpbmcgdGhpbmdzIG9uIGRpc2Nvbm5lY3RlZCBub2Rlc1xuVHdlZW4ucHJvcEhvb2tzLnNjcm9sbFRvcCA9IFR3ZWVuLnByb3BIb29rcy5zY3JvbGxMZWZ0ID0ge1xuXHRzZXQ6IGZ1bmN0aW9uKCB0d2VlbiApIHtcblx0XHRpZiAoIHR3ZWVuLmVsZW0ubm9kZVR5cGUgJiYgdHdlZW4uZWxlbS5wYXJlbnROb2RlICkge1xuXHRcdFx0dHdlZW4uZWxlbVsgdHdlZW4ucHJvcCBdID0gdHdlZW4ubm93O1xuXHRcdH1cblx0fVxufTtcblxualF1ZXJ5LmVhc2luZyA9IHtcblx0bGluZWFyOiBmdW5jdGlvbiggcCApIHtcblx0XHRyZXR1cm4gcDtcblx0fSxcblx0c3dpbmc6IGZ1bmN0aW9uKCBwICkge1xuXHRcdHJldHVybiAwLjUgLSBNYXRoLmNvcyggcCAqIE1hdGguUEkgKSAvIDI7XG5cdH0sXG5cdF9kZWZhdWx0OiBcInN3aW5nXCJcbn07XG5cbmpRdWVyeS5meCA9IFR3ZWVuLnByb3RvdHlwZS5pbml0O1xuXG4vLyBCYWNrIGNvbXBhdCA8MS44IGV4dGVuc2lvbiBwb2ludFxualF1ZXJ5LmZ4LnN0ZXAgPSB7fTtcblxuXG5cblxudmFyXG5cdGZ4Tm93LCBpblByb2dyZXNzLFxuXHRyZnh0eXBlcyA9IC9eKD86dG9nZ2xlfHNob3d8aGlkZSkkLyxcblx0cnJ1biA9IC9xdWV1ZUhvb2tzJC87XG5cbmZ1bmN0aW9uIHNjaGVkdWxlKCkge1xuXHRpZiAoIGluUHJvZ3Jlc3MgKSB7XG5cdFx0aWYgKCBkb2N1bWVudC5oaWRkZW4gPT09IGZhbHNlICYmIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgKSB7XG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBzY2hlZHVsZSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR3aW5kb3cuc2V0VGltZW91dCggc2NoZWR1bGUsIGpRdWVyeS5meC5pbnRlcnZhbCApO1xuXHRcdH1cblxuXHRcdGpRdWVyeS5meC50aWNrKCk7XG5cdH1cbn1cblxuLy8gQW5pbWF0aW9ucyBjcmVhdGVkIHN5bmNocm9ub3VzbHkgd2lsbCBydW4gc3luY2hyb25vdXNseVxuZnVuY3Rpb24gY3JlYXRlRnhOb3coKSB7XG5cdHdpbmRvdy5zZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcblx0XHRmeE5vdyA9IHVuZGVmaW5lZDtcblx0fSApO1xuXHRyZXR1cm4gKCBmeE5vdyA9IGpRdWVyeS5ub3coKSApO1xufVxuXG4vLyBHZW5lcmF0ZSBwYXJhbWV0ZXJzIHRvIGNyZWF0ZSBhIHN0YW5kYXJkIGFuaW1hdGlvblxuZnVuY3Rpb24gZ2VuRngoIHR5cGUsIGluY2x1ZGVXaWR0aCApIHtcblx0dmFyIHdoaWNoLFxuXHRcdGkgPSAwLFxuXHRcdGF0dHJzID0geyBoZWlnaHQ6IHR5cGUgfTtcblxuXHQvLyBJZiB3ZSBpbmNsdWRlIHdpZHRoLCBzdGVwIHZhbHVlIGlzIDEgdG8gZG8gYWxsIGNzc0V4cGFuZCB2YWx1ZXMsXG5cdC8vIG90aGVyd2lzZSBzdGVwIHZhbHVlIGlzIDIgdG8gc2tpcCBvdmVyIExlZnQgYW5kIFJpZ2h0XG5cdGluY2x1ZGVXaWR0aCA9IGluY2x1ZGVXaWR0aCA/IDEgOiAwO1xuXHRmb3IgKCA7IGkgPCA0OyBpICs9IDIgLSBpbmNsdWRlV2lkdGggKSB7XG5cdFx0d2hpY2ggPSBjc3NFeHBhbmRbIGkgXTtcblx0XHRhdHRyc1sgXCJtYXJnaW5cIiArIHdoaWNoIF0gPSBhdHRyc1sgXCJwYWRkaW5nXCIgKyB3aGljaCBdID0gdHlwZTtcblx0fVxuXG5cdGlmICggaW5jbHVkZVdpZHRoICkge1xuXHRcdGF0dHJzLm9wYWNpdHkgPSBhdHRycy53aWR0aCA9IHR5cGU7XG5cdH1cblxuXHRyZXR1cm4gYXR0cnM7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVR3ZWVuKCB2YWx1ZSwgcHJvcCwgYW5pbWF0aW9uICkge1xuXHR2YXIgdHdlZW4sXG5cdFx0Y29sbGVjdGlvbiA9ICggQW5pbWF0aW9uLnR3ZWVuZXJzWyBwcm9wIF0gfHwgW10gKS5jb25jYXQoIEFuaW1hdGlvbi50d2VlbmVyc1sgXCIqXCIgXSApLFxuXHRcdGluZGV4ID0gMCxcblx0XHRsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aDtcblx0Zm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRpZiAoICggdHdlZW4gPSBjb2xsZWN0aW9uWyBpbmRleCBdLmNhbGwoIGFuaW1hdGlvbiwgcHJvcCwgdmFsdWUgKSApICkge1xuXG5cdFx0XHQvLyBXZSdyZSBkb25lIHdpdGggdGhpcyBwcm9wZXJ0eVxuXHRcdFx0cmV0dXJuIHR3ZWVuO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0UHJlZmlsdGVyKCBlbGVtLCBwcm9wcywgb3B0cyApIHtcblx0dmFyIHByb3AsIHZhbHVlLCB0b2dnbGUsIGhvb2tzLCBvbGRmaXJlLCBwcm9wVHdlZW4sIHJlc3RvcmVEaXNwbGF5LCBkaXNwbGF5LFxuXHRcdGlzQm94ID0gXCJ3aWR0aFwiIGluIHByb3BzIHx8IFwiaGVpZ2h0XCIgaW4gcHJvcHMsXG5cdFx0YW5pbSA9IHRoaXMsXG5cdFx0b3JpZyA9IHt9LFxuXHRcdHN0eWxlID0gZWxlbS5zdHlsZSxcblx0XHRoaWRkZW4gPSBlbGVtLm5vZGVUeXBlICYmIGlzSGlkZGVuV2l0aGluVHJlZSggZWxlbSApLFxuXHRcdGRhdGFTaG93ID0gZGF0YVByaXYuZ2V0KCBlbGVtLCBcImZ4c2hvd1wiICk7XG5cblx0Ly8gUXVldWUtc2tpcHBpbmcgYW5pbWF0aW9ucyBoaWphY2sgdGhlIGZ4IGhvb2tzXG5cdGlmICggIW9wdHMucXVldWUgKSB7XG5cdFx0aG9va3MgPSBqUXVlcnkuX3F1ZXVlSG9va3MoIGVsZW0sIFwiZnhcIiApO1xuXHRcdGlmICggaG9va3MudW5xdWV1ZWQgPT0gbnVsbCApIHtcblx0XHRcdGhvb2tzLnVucXVldWVkID0gMDtcblx0XHRcdG9sZGZpcmUgPSBob29rcy5lbXB0eS5maXJlO1xuXHRcdFx0aG9va3MuZW1wdHkuZmlyZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoICFob29rcy51bnF1ZXVlZCApIHtcblx0XHRcdFx0XHRvbGRmaXJlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXHRcdGhvb2tzLnVucXVldWVkKys7XG5cblx0XHRhbmltLmFsd2F5cyggZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIEVuc3VyZSB0aGUgY29tcGxldGUgaGFuZGxlciBpcyBjYWxsZWQgYmVmb3JlIHRoaXMgY29tcGxldGVzXG5cdFx0XHRhbmltLmFsd2F5cyggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGhvb2tzLnVucXVldWVkLS07XG5cdFx0XHRcdGlmICggIWpRdWVyeS5xdWV1ZSggZWxlbSwgXCJmeFwiICkubGVuZ3RoICkge1xuXHRcdFx0XHRcdGhvb2tzLmVtcHR5LmZpcmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXHRcdH0gKTtcblx0fVxuXG5cdC8vIERldGVjdCBzaG93L2hpZGUgYW5pbWF0aW9uc1xuXHRmb3IgKCBwcm9wIGluIHByb3BzICkge1xuXHRcdHZhbHVlID0gcHJvcHNbIHByb3AgXTtcblx0XHRpZiAoIHJmeHR5cGVzLnRlc3QoIHZhbHVlICkgKSB7XG5cdFx0XHRkZWxldGUgcHJvcHNbIHByb3AgXTtcblx0XHRcdHRvZ2dsZSA9IHRvZ2dsZSB8fCB2YWx1ZSA9PT0gXCJ0b2dnbGVcIjtcblx0XHRcdGlmICggdmFsdWUgPT09ICggaGlkZGVuID8gXCJoaWRlXCIgOiBcInNob3dcIiApICkge1xuXG5cdFx0XHRcdC8vIFByZXRlbmQgdG8gYmUgaGlkZGVuIGlmIHRoaXMgaXMgYSBcInNob3dcIiBhbmRcblx0XHRcdFx0Ly8gdGhlcmUgaXMgc3RpbGwgZGF0YSBmcm9tIGEgc3RvcHBlZCBzaG93L2hpZGVcblx0XHRcdFx0aWYgKCB2YWx1ZSA9PT0gXCJzaG93XCIgJiYgZGF0YVNob3cgJiYgZGF0YVNob3dbIHByb3AgXSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdGhpZGRlbiA9IHRydWU7XG5cblx0XHRcdFx0Ly8gSWdub3JlIGFsbCBvdGhlciBuby1vcCBzaG93L2hpZGUgZGF0YVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRvcmlnWyBwcm9wIF0gPSBkYXRhU2hvdyAmJiBkYXRhU2hvd1sgcHJvcCBdIHx8IGpRdWVyeS5zdHlsZSggZWxlbSwgcHJvcCApO1xuXHRcdH1cblx0fVxuXG5cdC8vIEJhaWwgb3V0IGlmIHRoaXMgaXMgYSBuby1vcCBsaWtlIC5oaWRlKCkuaGlkZSgpXG5cdHByb3BUd2VlbiA9ICFqUXVlcnkuaXNFbXB0eU9iamVjdCggcHJvcHMgKTtcblx0aWYgKCAhcHJvcFR3ZWVuICYmIGpRdWVyeS5pc0VtcHR5T2JqZWN0KCBvcmlnICkgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gUmVzdHJpY3QgXCJvdmVyZmxvd1wiIGFuZCBcImRpc3BsYXlcIiBzdHlsZXMgZHVyaW5nIGJveCBhbmltYXRpb25zXG5cdGlmICggaXNCb3ggJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDw9OSAtIDExLCBFZGdlIDEyIC0gMTNcblx0XHQvLyBSZWNvcmQgYWxsIDMgb3ZlcmZsb3cgYXR0cmlidXRlcyBiZWNhdXNlIElFIGRvZXMgbm90IGluZmVyIHRoZSBzaG9ydGhhbmRcblx0XHQvLyBmcm9tIGlkZW50aWNhbGx5LXZhbHVlZCBvdmVyZmxvd1ggYW5kIG92ZXJmbG93WVxuXHRcdG9wdHMub3ZlcmZsb3cgPSBbIHN0eWxlLm92ZXJmbG93LCBzdHlsZS5vdmVyZmxvd1gsIHN0eWxlLm92ZXJmbG93WSBdO1xuXG5cdFx0Ly8gSWRlbnRpZnkgYSBkaXNwbGF5IHR5cGUsIHByZWZlcnJpbmcgb2xkIHNob3cvaGlkZSBkYXRhIG92ZXIgdGhlIENTUyBjYXNjYWRlXG5cdFx0cmVzdG9yZURpc3BsYXkgPSBkYXRhU2hvdyAmJiBkYXRhU2hvdy5kaXNwbGF5O1xuXHRcdGlmICggcmVzdG9yZURpc3BsYXkgPT0gbnVsbCApIHtcblx0XHRcdHJlc3RvcmVEaXNwbGF5ID0gZGF0YVByaXYuZ2V0KCBlbGVtLCBcImRpc3BsYXlcIiApO1xuXHRcdH1cblx0XHRkaXNwbGF5ID0galF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKTtcblx0XHRpZiAoIGRpc3BsYXkgPT09IFwibm9uZVwiICkge1xuXHRcdFx0aWYgKCByZXN0b3JlRGlzcGxheSApIHtcblx0XHRcdFx0ZGlzcGxheSA9IHJlc3RvcmVEaXNwbGF5O1xuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBHZXQgbm9uZW1wdHkgdmFsdWUocykgYnkgdGVtcG9yYXJpbHkgZm9yY2luZyB2aXNpYmlsaXR5XG5cdFx0XHRcdHNob3dIaWRlKCBbIGVsZW0gXSwgdHJ1ZSApO1xuXHRcdFx0XHRyZXN0b3JlRGlzcGxheSA9IGVsZW0uc3R5bGUuZGlzcGxheSB8fCByZXN0b3JlRGlzcGxheTtcblx0XHRcdFx0ZGlzcGxheSA9IGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICk7XG5cdFx0XHRcdHNob3dIaWRlKCBbIGVsZW0gXSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEFuaW1hdGUgaW5saW5lIGVsZW1lbnRzIGFzIGlubGluZS1ibG9ja1xuXHRcdGlmICggZGlzcGxheSA9PT0gXCJpbmxpbmVcIiB8fCBkaXNwbGF5ID09PSBcImlubGluZS1ibG9ja1wiICYmIHJlc3RvcmVEaXNwbGF5ICE9IG51bGwgKSB7XG5cdFx0XHRpZiAoIGpRdWVyeS5jc3MoIGVsZW0sIFwiZmxvYXRcIiApID09PSBcIm5vbmVcIiApIHtcblxuXHRcdFx0XHQvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBkaXNwbGF5IHZhbHVlIGF0IHRoZSBlbmQgb2YgcHVyZSBzaG93L2hpZGUgYW5pbWF0aW9uc1xuXHRcdFx0XHRpZiAoICFwcm9wVHdlZW4gKSB7XG5cdFx0XHRcdFx0YW5pbS5kb25lKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHN0eWxlLmRpc3BsYXkgPSByZXN0b3JlRGlzcGxheTtcblx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0aWYgKCByZXN0b3JlRGlzcGxheSA9PSBudWxsICkge1xuXHRcdFx0XHRcdFx0ZGlzcGxheSA9IHN0eWxlLmRpc3BsYXk7XG5cdFx0XHRcdFx0XHRyZXN0b3JlRGlzcGxheSA9IGRpc3BsYXkgPT09IFwibm9uZVwiID8gXCJcIiA6IGRpc3BsYXk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmICggb3B0cy5vdmVyZmxvdyApIHtcblx0XHRzdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG5cdFx0YW5pbS5hbHdheXMoIGZ1bmN0aW9uKCkge1xuXHRcdFx0c3R5bGUub3ZlcmZsb3cgPSBvcHRzLm92ZXJmbG93WyAwIF07XG5cdFx0XHRzdHlsZS5vdmVyZmxvd1ggPSBvcHRzLm92ZXJmbG93WyAxIF07XG5cdFx0XHRzdHlsZS5vdmVyZmxvd1kgPSBvcHRzLm92ZXJmbG93WyAyIF07XG5cdFx0fSApO1xuXHR9XG5cblx0Ly8gSW1wbGVtZW50IHNob3cvaGlkZSBhbmltYXRpb25zXG5cdHByb3BUd2VlbiA9IGZhbHNlO1xuXHRmb3IgKCBwcm9wIGluIG9yaWcgKSB7XG5cblx0XHQvLyBHZW5lcmFsIHNob3cvaGlkZSBzZXR1cCBmb3IgdGhpcyBlbGVtZW50IGFuaW1hdGlvblxuXHRcdGlmICggIXByb3BUd2VlbiApIHtcblx0XHRcdGlmICggZGF0YVNob3cgKSB7XG5cdFx0XHRcdGlmICggXCJoaWRkZW5cIiBpbiBkYXRhU2hvdyApIHtcblx0XHRcdFx0XHRoaWRkZW4gPSBkYXRhU2hvdy5oaWRkZW47XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRhdGFTaG93ID0gZGF0YVByaXYuYWNjZXNzKCBlbGVtLCBcImZ4c2hvd1wiLCB7IGRpc3BsYXk6IHJlc3RvcmVEaXNwbGF5IH0gKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3RvcmUgaGlkZGVuL3Zpc2libGUgZm9yIHRvZ2dsZSBzbyBgLnN0b3AoKS50b2dnbGUoKWAgXCJyZXZlcnNlc1wiXG5cdFx0XHRpZiAoIHRvZ2dsZSApIHtcblx0XHRcdFx0ZGF0YVNob3cuaGlkZGVuID0gIWhpZGRlbjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2hvdyBlbGVtZW50cyBiZWZvcmUgYW5pbWF0aW5nIHRoZW1cblx0XHRcdGlmICggaGlkZGVuICkge1xuXHRcdFx0XHRzaG93SGlkZSggWyBlbGVtIF0sIHRydWUgKTtcblx0XHRcdH1cblxuXHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8tbG9vcC1mdW5jICovXG5cblx0XHRcdGFuaW0uZG9uZSggZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8tbG9vcC1mdW5jICovXG5cblx0XHRcdFx0Ly8gVGhlIGZpbmFsIHN0ZXAgb2YgYSBcImhpZGVcIiBhbmltYXRpb24gaXMgYWN0dWFsbHkgaGlkaW5nIHRoZSBlbGVtZW50XG5cdFx0XHRcdGlmICggIWhpZGRlbiApIHtcblx0XHRcdFx0XHRzaG93SGlkZSggWyBlbGVtIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkYXRhUHJpdi5yZW1vdmUoIGVsZW0sIFwiZnhzaG93XCIgKTtcblx0XHRcdFx0Zm9yICggcHJvcCBpbiBvcmlnICkge1xuXHRcdFx0XHRcdGpRdWVyeS5zdHlsZSggZWxlbSwgcHJvcCwgb3JpZ1sgcHJvcCBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHQvLyBQZXItcHJvcGVydHkgc2V0dXBcblx0XHRwcm9wVHdlZW4gPSBjcmVhdGVUd2VlbiggaGlkZGVuID8gZGF0YVNob3dbIHByb3AgXSA6IDAsIHByb3AsIGFuaW0gKTtcblx0XHRpZiAoICEoIHByb3AgaW4gZGF0YVNob3cgKSApIHtcblx0XHRcdGRhdGFTaG93WyBwcm9wIF0gPSBwcm9wVHdlZW4uc3RhcnQ7XG5cdFx0XHRpZiAoIGhpZGRlbiApIHtcblx0XHRcdFx0cHJvcFR3ZWVuLmVuZCA9IHByb3BUd2Vlbi5zdGFydDtcblx0XHRcdFx0cHJvcFR3ZWVuLnN0YXJ0ID0gMDtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gcHJvcEZpbHRlciggcHJvcHMsIHNwZWNpYWxFYXNpbmcgKSB7XG5cdHZhciBpbmRleCwgbmFtZSwgZWFzaW5nLCB2YWx1ZSwgaG9va3M7XG5cblx0Ly8gY2FtZWxDYXNlLCBzcGVjaWFsRWFzaW5nIGFuZCBleHBhbmQgY3NzSG9vayBwYXNzXG5cdGZvciAoIGluZGV4IGluIHByb3BzICkge1xuXHRcdG5hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBpbmRleCApO1xuXHRcdGVhc2luZyA9IHNwZWNpYWxFYXNpbmdbIG5hbWUgXTtcblx0XHR2YWx1ZSA9IHByb3BzWyBpbmRleCBdO1xuXHRcdGlmICggQXJyYXkuaXNBcnJheSggdmFsdWUgKSApIHtcblx0XHRcdGVhc2luZyA9IHZhbHVlWyAxIF07XG5cdFx0XHR2YWx1ZSA9IHByb3BzWyBpbmRleCBdID0gdmFsdWVbIDAgXTtcblx0XHR9XG5cblx0XHRpZiAoIGluZGV4ICE9PSBuYW1lICkge1xuXHRcdFx0cHJvcHNbIG5hbWUgXSA9IHZhbHVlO1xuXHRcdFx0ZGVsZXRlIHByb3BzWyBpbmRleCBdO1xuXHRcdH1cblxuXHRcdGhvb2tzID0galF1ZXJ5LmNzc0hvb2tzWyBuYW1lIF07XG5cdFx0aWYgKCBob29rcyAmJiBcImV4cGFuZFwiIGluIGhvb2tzICkge1xuXHRcdFx0dmFsdWUgPSBob29rcy5leHBhbmQoIHZhbHVlICk7XG5cdFx0XHRkZWxldGUgcHJvcHNbIG5hbWUgXTtcblxuXHRcdFx0Ly8gTm90IHF1aXRlICQuZXh0ZW5kLCB0aGlzIHdvbid0IG92ZXJ3cml0ZSBleGlzdGluZyBrZXlzLlxuXHRcdFx0Ly8gUmV1c2luZyAnaW5kZXgnIGJlY2F1c2Ugd2UgaGF2ZSB0aGUgY29ycmVjdCBcIm5hbWVcIlxuXHRcdFx0Zm9yICggaW5kZXggaW4gdmFsdWUgKSB7XG5cdFx0XHRcdGlmICggISggaW5kZXggaW4gcHJvcHMgKSApIHtcblx0XHRcdFx0XHRwcm9wc1sgaW5kZXggXSA9IHZhbHVlWyBpbmRleCBdO1xuXHRcdFx0XHRcdHNwZWNpYWxFYXNpbmdbIGluZGV4IF0gPSBlYXNpbmc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0c3BlY2lhbEVhc2luZ1sgbmFtZSBdID0gZWFzaW5nO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBBbmltYXRpb24oIGVsZW0sIHByb3BlcnRpZXMsIG9wdGlvbnMgKSB7XG5cdHZhciByZXN1bHQsXG5cdFx0c3RvcHBlZCxcblx0XHRpbmRleCA9IDAsXG5cdFx0bGVuZ3RoID0gQW5pbWF0aW9uLnByZWZpbHRlcnMubGVuZ3RoLFxuXHRcdGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCkuYWx3YXlzKCBmdW5jdGlvbigpIHtcblxuXHRcdFx0Ly8gRG9uJ3QgbWF0Y2ggZWxlbSBpbiB0aGUgOmFuaW1hdGVkIHNlbGVjdG9yXG5cdFx0XHRkZWxldGUgdGljay5lbGVtO1xuXHRcdH0gKSxcblx0XHR0aWNrID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIHN0b3BwZWQgKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHZhciBjdXJyZW50VGltZSA9IGZ4Tm93IHx8IGNyZWF0ZUZ4Tm93KCksXG5cdFx0XHRcdHJlbWFpbmluZyA9IE1hdGgubWF4KCAwLCBhbmltYXRpb24uc3RhcnRUaW1lICsgYW5pbWF0aW9uLmR1cmF0aW9uIC0gY3VycmVudFRpbWUgKSxcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDIuMyBvbmx5XG5cdFx0XHRcdC8vIEFyY2hhaWMgY3Jhc2ggYnVnIHdvbid0IGFsbG93IHVzIHRvIHVzZSBgMSAtICggMC41IHx8IDAgKWAgKCMxMjQ5Nylcblx0XHRcdFx0dGVtcCA9IHJlbWFpbmluZyAvIGFuaW1hdGlvbi5kdXJhdGlvbiB8fCAwLFxuXHRcdFx0XHRwZXJjZW50ID0gMSAtIHRlbXAsXG5cdFx0XHRcdGluZGV4ID0gMCxcblx0XHRcdFx0bGVuZ3RoID0gYW5pbWF0aW9uLnR3ZWVucy5sZW5ndGg7XG5cblx0XHRcdGZvciAoIDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0XHRcdGFuaW1hdGlvbi50d2VlbnNbIGluZGV4IF0ucnVuKCBwZXJjZW50ICk7XG5cdFx0XHR9XG5cblx0XHRcdGRlZmVycmVkLm5vdGlmeVdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uLCBwZXJjZW50LCByZW1haW5pbmcgXSApO1xuXG5cdFx0XHQvLyBJZiB0aGVyZSdzIG1vcmUgdG8gZG8sIHlpZWxkXG5cdFx0XHRpZiAoIHBlcmNlbnQgPCAxICYmIGxlbmd0aCApIHtcblx0XHRcdFx0cmV0dXJuIHJlbWFpbmluZztcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgdGhpcyB3YXMgYW4gZW1wdHkgYW5pbWF0aW9uLCBzeW50aGVzaXplIGEgZmluYWwgcHJvZ3Jlc3Mgbm90aWZpY2F0aW9uXG5cdFx0XHRpZiAoICFsZW5ndGggKSB7XG5cdFx0XHRcdGRlZmVycmVkLm5vdGlmeVdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uLCAxLCAwIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVzb2x2ZSB0aGUgYW5pbWF0aW9uIGFuZCByZXBvcnQgaXRzIGNvbmNsdXNpb25cblx0XHRcdGRlZmVycmVkLnJlc29sdmVXaXRoKCBlbGVtLCBbIGFuaW1hdGlvbiBdICk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSxcblx0XHRhbmltYXRpb24gPSBkZWZlcnJlZC5wcm9taXNlKCB7XG5cdFx0XHRlbGVtOiBlbGVtLFxuXHRcdFx0cHJvcHM6IGpRdWVyeS5leHRlbmQoIHt9LCBwcm9wZXJ0aWVzICksXG5cdFx0XHRvcHRzOiBqUXVlcnkuZXh0ZW5kKCB0cnVlLCB7XG5cdFx0XHRcdHNwZWNpYWxFYXNpbmc6IHt9LFxuXHRcdFx0XHRlYXNpbmc6IGpRdWVyeS5lYXNpbmcuX2RlZmF1bHRcblx0XHRcdH0sIG9wdGlvbnMgKSxcblx0XHRcdG9yaWdpbmFsUHJvcGVydGllczogcHJvcGVydGllcyxcblx0XHRcdG9yaWdpbmFsT3B0aW9uczogb3B0aW9ucyxcblx0XHRcdHN0YXJ0VGltZTogZnhOb3cgfHwgY3JlYXRlRnhOb3coKSxcblx0XHRcdGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uLFxuXHRcdFx0dHdlZW5zOiBbXSxcblx0XHRcdGNyZWF0ZVR3ZWVuOiBmdW5jdGlvbiggcHJvcCwgZW5kICkge1xuXHRcdFx0XHR2YXIgdHdlZW4gPSBqUXVlcnkuVHdlZW4oIGVsZW0sIGFuaW1hdGlvbi5vcHRzLCBwcm9wLCBlbmQsXG5cdFx0XHRcdFx0XHRhbmltYXRpb24ub3B0cy5zcGVjaWFsRWFzaW5nWyBwcm9wIF0gfHwgYW5pbWF0aW9uLm9wdHMuZWFzaW5nICk7XG5cdFx0XHRcdGFuaW1hdGlvbi50d2VlbnMucHVzaCggdHdlZW4gKTtcblx0XHRcdFx0cmV0dXJuIHR3ZWVuO1xuXHRcdFx0fSxcblx0XHRcdHN0b3A6IGZ1bmN0aW9uKCBnb3RvRW5kICkge1xuXHRcdFx0XHR2YXIgaW5kZXggPSAwLFxuXG5cdFx0XHRcdFx0Ly8gSWYgd2UgYXJlIGdvaW5nIHRvIHRoZSBlbmQsIHdlIHdhbnQgdG8gcnVuIGFsbCB0aGUgdHdlZW5zXG5cdFx0XHRcdFx0Ly8gb3RoZXJ3aXNlIHdlIHNraXAgdGhpcyBwYXJ0XG5cdFx0XHRcdFx0bGVuZ3RoID0gZ290b0VuZCA/IGFuaW1hdGlvbi50d2VlbnMubGVuZ3RoIDogMDtcblx0XHRcdFx0aWYgKCBzdG9wcGVkICkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHN0b3BwZWQgPSB0cnVlO1xuXHRcdFx0XHRmb3IgKCA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuXHRcdFx0XHRcdGFuaW1hdGlvbi50d2VlbnNbIGluZGV4IF0ucnVuKCAxICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBSZXNvbHZlIHdoZW4gd2UgcGxheWVkIHRoZSBsYXN0IGZyYW1lOyBvdGhlcndpc2UsIHJlamVjdFxuXHRcdFx0XHRpZiAoIGdvdG9FbmQgKSB7XG5cdFx0XHRcdFx0ZGVmZXJyZWQubm90aWZ5V2l0aCggZWxlbSwgWyBhbmltYXRpb24sIDEsIDAgXSApO1xuXHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmVXaXRoKCBlbGVtLCBbIGFuaW1hdGlvbiwgZ290b0VuZCBdICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0V2l0aCggZWxlbSwgWyBhbmltYXRpb24sIGdvdG9FbmQgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH0gKSxcblx0XHRwcm9wcyA9IGFuaW1hdGlvbi5wcm9wcztcblxuXHRwcm9wRmlsdGVyKCBwcm9wcywgYW5pbWF0aW9uLm9wdHMuc3BlY2lhbEVhc2luZyApO1xuXG5cdGZvciAoIDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0cmVzdWx0ID0gQW5pbWF0aW9uLnByZWZpbHRlcnNbIGluZGV4IF0uY2FsbCggYW5pbWF0aW9uLCBlbGVtLCBwcm9wcywgYW5pbWF0aW9uLm9wdHMgKTtcblx0XHRpZiAoIHJlc3VsdCApIHtcblx0XHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHJlc3VsdC5zdG9wICkgKSB7XG5cdFx0XHRcdGpRdWVyeS5fcXVldWVIb29rcyggYW5pbWF0aW9uLmVsZW0sIGFuaW1hdGlvbi5vcHRzLnF1ZXVlICkuc3RvcCA9XG5cdFx0XHRcdFx0alF1ZXJ5LnByb3h5KCByZXN1bHQuc3RvcCwgcmVzdWx0ICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblx0fVxuXG5cdGpRdWVyeS5tYXAoIHByb3BzLCBjcmVhdGVUd2VlbiwgYW5pbWF0aW9uICk7XG5cblx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggYW5pbWF0aW9uLm9wdHMuc3RhcnQgKSApIHtcblx0XHRhbmltYXRpb24ub3B0cy5zdGFydC5jYWxsKCBlbGVtLCBhbmltYXRpb24gKTtcblx0fVxuXG5cdC8vIEF0dGFjaCBjYWxsYmFja3MgZnJvbSBvcHRpb25zXG5cdGFuaW1hdGlvblxuXHRcdC5wcm9ncmVzcyggYW5pbWF0aW9uLm9wdHMucHJvZ3Jlc3MgKVxuXHRcdC5kb25lKCBhbmltYXRpb24ub3B0cy5kb25lLCBhbmltYXRpb24ub3B0cy5jb21wbGV0ZSApXG5cdFx0LmZhaWwoIGFuaW1hdGlvbi5vcHRzLmZhaWwgKVxuXHRcdC5hbHdheXMoIGFuaW1hdGlvbi5vcHRzLmFsd2F5cyApO1xuXG5cdGpRdWVyeS5meC50aW1lcihcblx0XHRqUXVlcnkuZXh0ZW5kKCB0aWNrLCB7XG5cdFx0XHRlbGVtOiBlbGVtLFxuXHRcdFx0YW5pbTogYW5pbWF0aW9uLFxuXHRcdFx0cXVldWU6IGFuaW1hdGlvbi5vcHRzLnF1ZXVlXG5cdFx0fSApXG5cdCk7XG5cblx0cmV0dXJuIGFuaW1hdGlvbjtcbn1cblxualF1ZXJ5LkFuaW1hdGlvbiA9IGpRdWVyeS5leHRlbmQoIEFuaW1hdGlvbiwge1xuXG5cdHR3ZWVuZXJzOiB7XG5cdFx0XCIqXCI6IFsgZnVuY3Rpb24oIHByb3AsIHZhbHVlICkge1xuXHRcdFx0dmFyIHR3ZWVuID0gdGhpcy5jcmVhdGVUd2VlbiggcHJvcCwgdmFsdWUgKTtcblx0XHRcdGFkanVzdENTUyggdHdlZW4uZWxlbSwgcHJvcCwgcmNzc051bS5leGVjKCB2YWx1ZSApLCB0d2VlbiApO1xuXHRcdFx0cmV0dXJuIHR3ZWVuO1xuXHRcdH0gXVxuXHR9LFxuXG5cdHR3ZWVuZXI6IGZ1bmN0aW9uKCBwcm9wcywgY2FsbGJhY2sgKSB7XG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggcHJvcHMgKSApIHtcblx0XHRcdGNhbGxiYWNrID0gcHJvcHM7XG5cdFx0XHRwcm9wcyA9IFsgXCIqXCIgXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cHJvcHMgPSBwcm9wcy5tYXRjaCggcm5vdGh0bWx3aGl0ZSApO1xuXHRcdH1cblxuXHRcdHZhciBwcm9wLFxuXHRcdFx0aW5kZXggPSAwLFxuXHRcdFx0bGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG5cdFx0Zm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRcdHByb3AgPSBwcm9wc1sgaW5kZXggXTtcblx0XHRcdEFuaW1hdGlvbi50d2VlbmVyc1sgcHJvcCBdID0gQW5pbWF0aW9uLnR3ZWVuZXJzWyBwcm9wIF0gfHwgW107XG5cdFx0XHRBbmltYXRpb24udHdlZW5lcnNbIHByb3AgXS51bnNoaWZ0KCBjYWxsYmFjayApO1xuXHRcdH1cblx0fSxcblxuXHRwcmVmaWx0ZXJzOiBbIGRlZmF1bHRQcmVmaWx0ZXIgXSxcblxuXHRwcmVmaWx0ZXI6IGZ1bmN0aW9uKCBjYWxsYmFjaywgcHJlcGVuZCApIHtcblx0XHRpZiAoIHByZXBlbmQgKSB7XG5cdFx0XHRBbmltYXRpb24ucHJlZmlsdGVycy51bnNoaWZ0KCBjYWxsYmFjayApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRBbmltYXRpb24ucHJlZmlsdGVycy5wdXNoKCBjYWxsYmFjayApO1xuXHRcdH1cblx0fVxufSApO1xuXG5qUXVlcnkuc3BlZWQgPSBmdW5jdGlvbiggc3BlZWQsIGVhc2luZywgZm4gKSB7XG5cdHZhciBvcHQgPSBzcGVlZCAmJiB0eXBlb2Ygc3BlZWQgPT09IFwib2JqZWN0XCIgPyBqUXVlcnkuZXh0ZW5kKCB7fSwgc3BlZWQgKSA6IHtcblx0XHRjb21wbGV0ZTogZm4gfHwgIWZuICYmIGVhc2luZyB8fFxuXHRcdFx0alF1ZXJ5LmlzRnVuY3Rpb24oIHNwZWVkICkgJiYgc3BlZWQsXG5cdFx0ZHVyYXRpb246IHNwZWVkLFxuXHRcdGVhc2luZzogZm4gJiYgZWFzaW5nIHx8IGVhc2luZyAmJiAhalF1ZXJ5LmlzRnVuY3Rpb24oIGVhc2luZyApICYmIGVhc2luZ1xuXHR9O1xuXG5cdC8vIEdvIHRvIHRoZSBlbmQgc3RhdGUgaWYgZnggYXJlIG9mZlxuXHRpZiAoIGpRdWVyeS5meC5vZmYgKSB7XG5cdFx0b3B0LmR1cmF0aW9uID0gMDtcblxuXHR9IGVsc2Uge1xuXHRcdGlmICggdHlwZW9mIG9wdC5kdXJhdGlvbiAhPT0gXCJudW1iZXJcIiApIHtcblx0XHRcdGlmICggb3B0LmR1cmF0aW9uIGluIGpRdWVyeS5meC5zcGVlZHMgKSB7XG5cdFx0XHRcdG9wdC5kdXJhdGlvbiA9IGpRdWVyeS5meC5zcGVlZHNbIG9wdC5kdXJhdGlvbiBdO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvcHQuZHVyYXRpb24gPSBqUXVlcnkuZnguc3BlZWRzLl9kZWZhdWx0O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIE5vcm1hbGl6ZSBvcHQucXVldWUgLSB0cnVlL3VuZGVmaW5lZC9udWxsIC0+IFwiZnhcIlxuXHRpZiAoIG9wdC5xdWV1ZSA9PSBudWxsIHx8IG9wdC5xdWV1ZSA9PT0gdHJ1ZSApIHtcblx0XHRvcHQucXVldWUgPSBcImZ4XCI7XG5cdH1cblxuXHQvLyBRdWV1ZWluZ1xuXHRvcHQub2xkID0gb3B0LmNvbXBsZXRlO1xuXG5cdG9wdC5jb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIG9wdC5vbGQgKSApIHtcblx0XHRcdG9wdC5vbGQuY2FsbCggdGhpcyApO1xuXHRcdH1cblxuXHRcdGlmICggb3B0LnF1ZXVlICkge1xuXHRcdFx0alF1ZXJ5LmRlcXVldWUoIHRoaXMsIG9wdC5xdWV1ZSApO1xuXHRcdH1cblx0fTtcblxuXHRyZXR1cm4gb3B0O1xufTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRmYWRlVG86IGZ1bmN0aW9uKCBzcGVlZCwgdG8sIGVhc2luZywgY2FsbGJhY2sgKSB7XG5cblx0XHQvLyBTaG93IGFueSBoaWRkZW4gZWxlbWVudHMgYWZ0ZXIgc2V0dGluZyBvcGFjaXR5IHRvIDBcblx0XHRyZXR1cm4gdGhpcy5maWx0ZXIoIGlzSGlkZGVuV2l0aGluVHJlZSApLmNzcyggXCJvcGFjaXR5XCIsIDAgKS5zaG93KClcblxuXHRcdFx0Ly8gQW5pbWF0ZSB0byB0aGUgdmFsdWUgc3BlY2lmaWVkXG5cdFx0XHQuZW5kKCkuYW5pbWF0ZSggeyBvcGFjaXR5OiB0byB9LCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApO1xuXHR9LFxuXHRhbmltYXRlOiBmdW5jdGlvbiggcHJvcCwgc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKSB7XG5cdFx0dmFyIGVtcHR5ID0galF1ZXJ5LmlzRW1wdHlPYmplY3QoIHByb3AgKSxcblx0XHRcdG9wdGFsbCA9IGpRdWVyeS5zcGVlZCggc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKSxcblx0XHRcdGRvQW5pbWF0aW9uID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0Ly8gT3BlcmF0ZSBvbiBhIGNvcHkgb2YgcHJvcCBzbyBwZXItcHJvcGVydHkgZWFzaW5nIHdvbid0IGJlIGxvc3Rcblx0XHRcdFx0dmFyIGFuaW0gPSBBbmltYXRpb24oIHRoaXMsIGpRdWVyeS5leHRlbmQoIHt9LCBwcm9wICksIG9wdGFsbCApO1xuXG5cdFx0XHRcdC8vIEVtcHR5IGFuaW1hdGlvbnMsIG9yIGZpbmlzaGluZyByZXNvbHZlcyBpbW1lZGlhdGVseVxuXHRcdFx0XHRpZiAoIGVtcHR5IHx8IGRhdGFQcml2LmdldCggdGhpcywgXCJmaW5pc2hcIiApICkge1xuXHRcdFx0XHRcdGFuaW0uc3RvcCggdHJ1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0ZG9BbmltYXRpb24uZmluaXNoID0gZG9BbmltYXRpb247XG5cblx0XHRyZXR1cm4gZW1wdHkgfHwgb3B0YWxsLnF1ZXVlID09PSBmYWxzZSA/XG5cdFx0XHR0aGlzLmVhY2goIGRvQW5pbWF0aW9uICkgOlxuXHRcdFx0dGhpcy5xdWV1ZSggb3B0YWxsLnF1ZXVlLCBkb0FuaW1hdGlvbiApO1xuXHR9LFxuXHRzdG9wOiBmdW5jdGlvbiggdHlwZSwgY2xlYXJRdWV1ZSwgZ290b0VuZCApIHtcblx0XHR2YXIgc3RvcFF1ZXVlID0gZnVuY3Rpb24oIGhvb2tzICkge1xuXHRcdFx0dmFyIHN0b3AgPSBob29rcy5zdG9wO1xuXHRcdFx0ZGVsZXRlIGhvb2tzLnN0b3A7XG5cdFx0XHRzdG9wKCBnb3RvRW5kICk7XG5cdFx0fTtcblxuXHRcdGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRnb3RvRW5kID0gY2xlYXJRdWV1ZTtcblx0XHRcdGNsZWFyUXVldWUgPSB0eXBlO1xuXHRcdFx0dHlwZSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0aWYgKCBjbGVhclF1ZXVlICYmIHR5cGUgIT09IGZhbHNlICkge1xuXHRcdFx0dGhpcy5xdWV1ZSggdHlwZSB8fCBcImZ4XCIsIFtdICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZGVxdWV1ZSA9IHRydWUsXG5cdFx0XHRcdGluZGV4ID0gdHlwZSAhPSBudWxsICYmIHR5cGUgKyBcInF1ZXVlSG9va3NcIixcblx0XHRcdFx0dGltZXJzID0galF1ZXJ5LnRpbWVycyxcblx0XHRcdFx0ZGF0YSA9IGRhdGFQcml2LmdldCggdGhpcyApO1xuXG5cdFx0XHRpZiAoIGluZGV4ICkge1xuXHRcdFx0XHRpZiAoIGRhdGFbIGluZGV4IF0gJiYgZGF0YVsgaW5kZXggXS5zdG9wICkge1xuXHRcdFx0XHRcdHN0b3BRdWV1ZSggZGF0YVsgaW5kZXggXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKCBpbmRleCBpbiBkYXRhICkge1xuXHRcdFx0XHRcdGlmICggZGF0YVsgaW5kZXggXSAmJiBkYXRhWyBpbmRleCBdLnN0b3AgJiYgcnJ1bi50ZXN0KCBpbmRleCApICkge1xuXHRcdFx0XHRcdFx0c3RvcFF1ZXVlKCBkYXRhWyBpbmRleCBdICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoIGluZGV4ID0gdGltZXJzLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG5cdFx0XHRcdGlmICggdGltZXJzWyBpbmRleCBdLmVsZW0gPT09IHRoaXMgJiZcblx0XHRcdFx0XHQoIHR5cGUgPT0gbnVsbCB8fCB0aW1lcnNbIGluZGV4IF0ucXVldWUgPT09IHR5cGUgKSApIHtcblxuXHRcdFx0XHRcdHRpbWVyc1sgaW5kZXggXS5hbmltLnN0b3AoIGdvdG9FbmQgKTtcblx0XHRcdFx0XHRkZXF1ZXVlID0gZmFsc2U7XG5cdFx0XHRcdFx0dGltZXJzLnNwbGljZSggaW5kZXgsIDEgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdGFydCB0aGUgbmV4dCBpbiB0aGUgcXVldWUgaWYgdGhlIGxhc3Qgc3RlcCB3YXNuJ3QgZm9yY2VkLlxuXHRcdFx0Ly8gVGltZXJzIGN1cnJlbnRseSB3aWxsIGNhbGwgdGhlaXIgY29tcGxldGUgY2FsbGJhY2tzLCB3aGljaFxuXHRcdFx0Ly8gd2lsbCBkZXF1ZXVlIGJ1dCBvbmx5IGlmIHRoZXkgd2VyZSBnb3RvRW5kLlxuXHRcdFx0aWYgKCBkZXF1ZXVlIHx8ICFnb3RvRW5kICkge1xuXHRcdFx0XHRqUXVlcnkuZGVxdWV1ZSggdGhpcywgdHlwZSApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblx0ZmluaXNoOiBmdW5jdGlvbiggdHlwZSApIHtcblx0XHRpZiAoIHR5cGUgIT09IGZhbHNlICkge1xuXHRcdFx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBpbmRleCxcblx0XHRcdFx0ZGF0YSA9IGRhdGFQcml2LmdldCggdGhpcyApLFxuXHRcdFx0XHRxdWV1ZSA9IGRhdGFbIHR5cGUgKyBcInF1ZXVlXCIgXSxcblx0XHRcdFx0aG9va3MgPSBkYXRhWyB0eXBlICsgXCJxdWV1ZUhvb2tzXCIgXSxcblx0XHRcdFx0dGltZXJzID0galF1ZXJ5LnRpbWVycyxcblx0XHRcdFx0bGVuZ3RoID0gcXVldWUgPyBxdWV1ZS5sZW5ndGggOiAwO1xuXG5cdFx0XHQvLyBFbmFibGUgZmluaXNoaW5nIGZsYWcgb24gcHJpdmF0ZSBkYXRhXG5cdFx0XHRkYXRhLmZpbmlzaCA9IHRydWU7XG5cblx0XHRcdC8vIEVtcHR5IHRoZSBxdWV1ZSBmaXJzdFxuXHRcdFx0alF1ZXJ5LnF1ZXVlKCB0aGlzLCB0eXBlLCBbXSApO1xuXG5cdFx0XHRpZiAoIGhvb2tzICYmIGhvb2tzLnN0b3AgKSB7XG5cdFx0XHRcdGhvb2tzLnN0b3AuY2FsbCggdGhpcywgdHJ1ZSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBMb29rIGZvciBhbnkgYWN0aXZlIGFuaW1hdGlvbnMsIGFuZCBmaW5pc2ggdGhlbVxuXHRcdFx0Zm9yICggaW5kZXggPSB0aW1lcnMubGVuZ3RoOyBpbmRleC0tOyApIHtcblx0XHRcdFx0aWYgKCB0aW1lcnNbIGluZGV4IF0uZWxlbSA9PT0gdGhpcyAmJiB0aW1lcnNbIGluZGV4IF0ucXVldWUgPT09IHR5cGUgKSB7XG5cdFx0XHRcdFx0dGltZXJzWyBpbmRleCBdLmFuaW0uc3RvcCggdHJ1ZSApO1xuXHRcdFx0XHRcdHRpbWVycy5zcGxpY2UoIGluZGV4LCAxICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gTG9vayBmb3IgYW55IGFuaW1hdGlvbnMgaW4gdGhlIG9sZCBxdWV1ZSBhbmQgZmluaXNoIHRoZW1cblx0XHRcdGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0XHRcdGlmICggcXVldWVbIGluZGV4IF0gJiYgcXVldWVbIGluZGV4IF0uZmluaXNoICkge1xuXHRcdFx0XHRcdHF1ZXVlWyBpbmRleCBdLmZpbmlzaC5jYWxsKCB0aGlzICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gVHVybiBvZmYgZmluaXNoaW5nIGZsYWdcblx0XHRcdGRlbGV0ZSBkYXRhLmZpbmlzaDtcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmVhY2goIFsgXCJ0b2dnbGVcIiwgXCJzaG93XCIsIFwiaGlkZVwiIF0sIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXHR2YXIgY3NzRm4gPSBqUXVlcnkuZm5bIG5hbWUgXTtcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIHNwZWVkID09IG51bGwgfHwgdHlwZW9mIHNwZWVkID09PSBcImJvb2xlYW5cIiA/XG5cdFx0XHRjc3NGbi5hcHBseSggdGhpcywgYXJndW1lbnRzICkgOlxuXHRcdFx0dGhpcy5hbmltYXRlKCBnZW5GeCggbmFtZSwgdHJ1ZSApLCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApO1xuXHR9O1xufSApO1xuXG4vLyBHZW5lcmF0ZSBzaG9ydGN1dHMgZm9yIGN1c3RvbSBhbmltYXRpb25zXG5qUXVlcnkuZWFjaCgge1xuXHRzbGlkZURvd246IGdlbkZ4KCBcInNob3dcIiApLFxuXHRzbGlkZVVwOiBnZW5GeCggXCJoaWRlXCIgKSxcblx0c2xpZGVUb2dnbGU6IGdlbkZ4KCBcInRvZ2dsZVwiICksXG5cdGZhZGVJbjogeyBvcGFjaXR5OiBcInNob3dcIiB9LFxuXHRmYWRlT3V0OiB7IG9wYWNpdHk6IFwiaGlkZVwiIH0sXG5cdGZhZGVUb2dnbGU6IHsgb3BhY2l0eTogXCJ0b2dnbGVcIiB9XG59LCBmdW5jdGlvbiggbmFtZSwgcHJvcHMgKSB7XG5cdGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiB0aGlzLmFuaW1hdGUoIHByb3BzLCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApO1xuXHR9O1xufSApO1xuXG5qUXVlcnkudGltZXJzID0gW107XG5qUXVlcnkuZngudGljayA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGltZXIsXG5cdFx0aSA9IDAsXG5cdFx0dGltZXJzID0galF1ZXJ5LnRpbWVycztcblxuXHRmeE5vdyA9IGpRdWVyeS5ub3coKTtcblxuXHRmb3IgKCA7IGkgPCB0aW1lcnMubGVuZ3RoOyBpKysgKSB7XG5cdFx0dGltZXIgPSB0aW1lcnNbIGkgXTtcblxuXHRcdC8vIFJ1biB0aGUgdGltZXIgYW5kIHNhZmVseSByZW1vdmUgaXQgd2hlbiBkb25lIChhbGxvd2luZyBmb3IgZXh0ZXJuYWwgcmVtb3ZhbClcblx0XHRpZiAoICF0aW1lcigpICYmIHRpbWVyc1sgaSBdID09PSB0aW1lciApIHtcblx0XHRcdHRpbWVycy5zcGxpY2UoIGktLSwgMSApO1xuXHRcdH1cblx0fVxuXG5cdGlmICggIXRpbWVycy5sZW5ndGggKSB7XG5cdFx0alF1ZXJ5LmZ4LnN0b3AoKTtcblx0fVxuXHRmeE5vdyA9IHVuZGVmaW5lZDtcbn07XG5cbmpRdWVyeS5meC50aW1lciA9IGZ1bmN0aW9uKCB0aW1lciApIHtcblx0alF1ZXJ5LnRpbWVycy5wdXNoKCB0aW1lciApO1xuXHRqUXVlcnkuZnguc3RhcnQoKTtcbn07XG5cbmpRdWVyeS5meC5pbnRlcnZhbCA9IDEzO1xualF1ZXJ5LmZ4LnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG5cdGlmICggaW5Qcm9ncmVzcyApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpblByb2dyZXNzID0gdHJ1ZTtcblx0c2NoZWR1bGUoKTtcbn07XG5cbmpRdWVyeS5meC5zdG9wID0gZnVuY3Rpb24oKSB7XG5cdGluUHJvZ3Jlc3MgPSBudWxsO1xufTtcblxualF1ZXJ5LmZ4LnNwZWVkcyA9IHtcblx0c2xvdzogNjAwLFxuXHRmYXN0OiAyMDAsXG5cblx0Ly8gRGVmYXVsdCBzcGVlZFxuXHRfZGVmYXVsdDogNDAwXG59O1xuXG5cbi8vIEJhc2VkIG9mZiBvZiB0aGUgcGx1Z2luIGJ5IENsaW50IEhlbGZlcnMsIHdpdGggcGVybWlzc2lvbi5cbi8vIGh0dHBzOi8vd2ViLmFyY2hpdmUub3JnL3dlYi8yMDEwMDMyNDAxNDc0Ny9odHRwOi8vYmxpbmRzaWduYWxzLmNvbS9pbmRleC5waHAvMjAwOS8wNy9qcXVlcnktZGVsYXkvXG5qUXVlcnkuZm4uZGVsYXkgPSBmdW5jdGlvbiggdGltZSwgdHlwZSApIHtcblx0dGltZSA9IGpRdWVyeS5meCA/IGpRdWVyeS5meC5zcGVlZHNbIHRpbWUgXSB8fCB0aW1lIDogdGltZTtcblx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG5cdHJldHVybiB0aGlzLnF1ZXVlKCB0eXBlLCBmdW5jdGlvbiggbmV4dCwgaG9va3MgKSB7XG5cdFx0dmFyIHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCggbmV4dCwgdGltZSApO1xuXHRcdGhvb2tzLnN0b3AgPSBmdW5jdGlvbigpIHtcblx0XHRcdHdpbmRvdy5jbGVhclRpbWVvdXQoIHRpbWVvdXQgKTtcblx0XHR9O1xuXHR9ICk7XG59O1xuXG5cbiggZnVuY3Rpb24oKSB7XG5cdHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiaW5wdXRcIiApLFxuXHRcdHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwic2VsZWN0XCIgKSxcblx0XHRvcHQgPSBzZWxlY3QuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwib3B0aW9uXCIgKSApO1xuXG5cdGlucHV0LnR5cGUgPSBcImNoZWNrYm94XCI7XG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMyBvbmx5XG5cdC8vIERlZmF1bHQgdmFsdWUgZm9yIGEgY2hlY2tib3ggc2hvdWxkIGJlIFwib25cIlxuXHRzdXBwb3J0LmNoZWNrT24gPSBpbnB1dC52YWx1ZSAhPT0gXCJcIjtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcblx0Ly8gTXVzdCBhY2Nlc3Mgc2VsZWN0ZWRJbmRleCB0byBtYWtlIGRlZmF1bHQgb3B0aW9ucyBzZWxlY3Rcblx0c3VwcG9ydC5vcHRTZWxlY3RlZCA9IG9wdC5zZWxlY3RlZDtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcblx0Ly8gQW4gaW5wdXQgbG9zZXMgaXRzIHZhbHVlIGFmdGVyIGJlY29taW5nIGEgcmFkaW9cblx0aW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImlucHV0XCIgKTtcblx0aW5wdXQudmFsdWUgPSBcInRcIjtcblx0aW5wdXQudHlwZSA9IFwicmFkaW9cIjtcblx0c3VwcG9ydC5yYWRpb1ZhbHVlID0gaW5wdXQudmFsdWUgPT09IFwidFwiO1xufSApKCk7XG5cblxudmFyIGJvb2xIb29rLFxuXHRhdHRySGFuZGxlID0galF1ZXJ5LmV4cHIuYXR0ckhhbmRsZTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRhdHRyOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgalF1ZXJ5LmF0dHIsIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xuXHR9LFxuXG5cdHJlbW92ZUF0dHI6IGZ1bmN0aW9uKCBuYW1lICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5LnJlbW92ZUF0dHIoIHRoaXMsIG5hbWUgKTtcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXHRhdHRyOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG5cdFx0dmFyIHJldCwgaG9va3MsXG5cdFx0XHRuVHlwZSA9IGVsZW0ubm9kZVR5cGU7XG5cblx0XHQvLyBEb24ndCBnZXQvc2V0IGF0dHJpYnV0ZXMgb24gdGV4dCwgY29tbWVudCBhbmQgYXR0cmlidXRlIG5vZGVzXG5cdFx0aWYgKCBuVHlwZSA9PT0gMyB8fCBuVHlwZSA9PT0gOCB8fCBuVHlwZSA9PT0gMiApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBGYWxsYmFjayB0byBwcm9wIHdoZW4gYXR0cmlidXRlcyBhcmUgbm90IHN1cHBvcnRlZFxuXHRcdGlmICggdHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlID09PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5wcm9wKCBlbGVtLCBuYW1lLCB2YWx1ZSApO1xuXHRcdH1cblxuXHRcdC8vIEF0dHJpYnV0ZSBob29rcyBhcmUgZGV0ZXJtaW5lZCBieSB0aGUgbG93ZXJjYXNlIHZlcnNpb25cblx0XHQvLyBHcmFiIG5lY2Vzc2FyeSBob29rIGlmIG9uZSBpcyBkZWZpbmVkXG5cdFx0aWYgKCBuVHlwZSAhPT0gMSB8fCAhalF1ZXJ5LmlzWE1MRG9jKCBlbGVtICkgKSB7XG5cdFx0XHRob29rcyA9IGpRdWVyeS5hdHRySG9va3NbIG5hbWUudG9Mb3dlckNhc2UoKSBdIHx8XG5cdFx0XHRcdCggalF1ZXJ5LmV4cHIubWF0Y2guYm9vbC50ZXN0KCBuYW1lICkgPyBib29sSG9vayA6IHVuZGVmaW5lZCApO1xuXHRcdH1cblxuXHRcdGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdGlmICggdmFsdWUgPT09IG51bGwgKSB7XG5cdFx0XHRcdGpRdWVyeS5yZW1vdmVBdHRyKCBlbGVtLCBuYW1lICk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBob29rcyAmJiBcInNldFwiIGluIGhvb2tzICYmXG5cdFx0XHRcdCggcmV0ID0gaG9va3Muc2V0KCBlbGVtLCB2YWx1ZSwgbmFtZSApICkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH1cblxuXHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIG5hbWUsIHZhbHVlICsgXCJcIiApO1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH1cblxuXHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAoIHJldCA9IGhvb2tzLmdldCggZWxlbSwgbmFtZSApICkgIT09IG51bGwgKSB7XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH1cblxuXHRcdHJldCA9IGpRdWVyeS5maW5kLmF0dHIoIGVsZW0sIG5hbWUgKTtcblxuXHRcdC8vIE5vbi1leGlzdGVudCBhdHRyaWJ1dGVzIHJldHVybiBudWxsLCB3ZSBub3JtYWxpemUgdG8gdW5kZWZpbmVkXG5cdFx0cmV0dXJuIHJldCA9PSBudWxsID8gdW5kZWZpbmVkIDogcmV0O1xuXHR9LFxuXG5cdGF0dHJIb29rczoge1xuXHRcdHR5cGU6IHtcblx0XHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdFx0XHRpZiAoICFzdXBwb3J0LnJhZGlvVmFsdWUgJiYgdmFsdWUgPT09IFwicmFkaW9cIiAmJlxuXHRcdFx0XHRcdG5vZGVOYW1lKCBlbGVtLCBcImlucHV0XCIgKSApIHtcblx0XHRcdFx0XHR2YXIgdmFsID0gZWxlbS52YWx1ZTtcblx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggXCJ0eXBlXCIsIHZhbHVlICk7XG5cdFx0XHRcdFx0aWYgKCB2YWwgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLnZhbHVlID0gdmFsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0cmVtb3ZlQXR0cjogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdHZhciBuYW1lLFxuXHRcdFx0aSA9IDAsXG5cblx0XHRcdC8vIEF0dHJpYnV0ZSBuYW1lcyBjYW4gY29udGFpbiBub24tSFRNTCB3aGl0ZXNwYWNlIGNoYXJhY3RlcnNcblx0XHRcdC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3N5bnRheC5odG1sI2F0dHJpYnV0ZXMtMlxuXHRcdFx0YXR0ck5hbWVzID0gdmFsdWUgJiYgdmFsdWUubWF0Y2goIHJub3RodG1sd2hpdGUgKTtcblxuXHRcdGlmICggYXR0ck5hbWVzICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHR3aGlsZSAoICggbmFtZSA9IGF0dHJOYW1lc1sgaSsrIF0gKSApIHtcblx0XHRcdFx0ZWxlbS5yZW1vdmVBdHRyaWJ1dGUoIG5hbWUgKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0gKTtcblxuLy8gSG9va3MgZm9yIGJvb2xlYW4gYXR0cmlidXRlc1xuYm9vbEhvb2sgPSB7XG5cdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBuYW1lICkge1xuXHRcdGlmICggdmFsdWUgPT09IGZhbHNlICkge1xuXG5cdFx0XHQvLyBSZW1vdmUgYm9vbGVhbiBhdHRyaWJ1dGVzIHdoZW4gc2V0IHRvIGZhbHNlXG5cdFx0XHRqUXVlcnkucmVtb3ZlQXR0ciggZWxlbSwgbmFtZSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggbmFtZSwgbmFtZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmFtZTtcblx0fVxufTtcblxualF1ZXJ5LmVhY2goIGpRdWVyeS5leHByLm1hdGNoLmJvb2wuc291cmNlLm1hdGNoKCAvXFx3Ky9nICksIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXHR2YXIgZ2V0dGVyID0gYXR0ckhhbmRsZVsgbmFtZSBdIHx8IGpRdWVyeS5maW5kLmF0dHI7XG5cblx0YXR0ckhhbmRsZVsgbmFtZSBdID0gZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdHZhciByZXQsIGhhbmRsZSxcblx0XHRcdGxvd2VyY2FzZU5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRpZiAoICFpc1hNTCApIHtcblxuXHRcdFx0Ly8gQXZvaWQgYW4gaW5maW5pdGUgbG9vcCBieSB0ZW1wb3JhcmlseSByZW1vdmluZyB0aGlzIGZ1bmN0aW9uIGZyb20gdGhlIGdldHRlclxuXHRcdFx0aGFuZGxlID0gYXR0ckhhbmRsZVsgbG93ZXJjYXNlTmFtZSBdO1xuXHRcdFx0YXR0ckhhbmRsZVsgbG93ZXJjYXNlTmFtZSBdID0gcmV0O1xuXHRcdFx0cmV0ID0gZ2V0dGVyKCBlbGVtLCBuYW1lLCBpc1hNTCApICE9IG51bGwgP1xuXHRcdFx0XHRsb3dlcmNhc2VOYW1lIDpcblx0XHRcdFx0bnVsbDtcblx0XHRcdGF0dHJIYW5kbGVbIGxvd2VyY2FzZU5hbWUgXSA9IGhhbmRsZTtcblx0XHR9XG5cdFx0cmV0dXJuIHJldDtcblx0fTtcbn0gKTtcblxuXG5cblxudmFyIHJmb2N1c2FibGUgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b24pJC9pLFxuXHRyY2xpY2thYmxlID0gL14oPzphfGFyZWEpJC9pO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdHByb3A6IGZ1bmN0aW9uKCBuYW1lLCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBqUXVlcnkucHJvcCwgbmFtZSwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxICk7XG5cdH0sXG5cblx0cmVtb3ZlUHJvcDogZnVuY3Rpb24oIG5hbWUgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRkZWxldGUgdGhpc1sgalF1ZXJ5LnByb3BGaXhbIG5hbWUgXSB8fCBuYW1lIF07XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5leHRlbmQoIHtcblx0cHJvcDogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlICkge1xuXHRcdHZhciByZXQsIGhvb2tzLFxuXHRcdFx0blR5cGUgPSBlbGVtLm5vZGVUeXBlO1xuXG5cdFx0Ly8gRG9uJ3QgZ2V0L3NldCBwcm9wZXJ0aWVzIG9uIHRleHQsIGNvbW1lbnQgYW5kIGF0dHJpYnV0ZSBub2Rlc1xuXHRcdGlmICggblR5cGUgPT09IDMgfHwgblR5cGUgPT09IDggfHwgblR5cGUgPT09IDIgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCBuVHlwZSAhPT0gMSB8fCAhalF1ZXJ5LmlzWE1MRG9jKCBlbGVtICkgKSB7XG5cblx0XHRcdC8vIEZpeCBuYW1lIGFuZCBhdHRhY2ggaG9va3Ncblx0XHRcdG5hbWUgPSBqUXVlcnkucHJvcEZpeFsgbmFtZSBdIHx8IG5hbWU7XG5cdFx0XHRob29rcyA9IGpRdWVyeS5wcm9wSG9va3NbIG5hbWUgXTtcblx0XHR9XG5cblx0XHRpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRpZiAoIGhvb2tzICYmIFwic2V0XCIgaW4gaG9va3MgJiZcblx0XHRcdFx0KCByZXQgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBuYW1lICkgKSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gKCBlbGVtWyBuYW1lIF0gPSB2YWx1ZSApO1xuXHRcdH1cblxuXHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAoIHJldCA9IGhvb2tzLmdldCggZWxlbSwgbmFtZSApICkgIT09IG51bGwgKSB7XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH1cblxuXHRcdHJldHVybiBlbGVtWyBuYW1lIF07XG5cdH0sXG5cblx0cHJvcEhvb2tzOiB7XG5cdFx0dGFiSW5kZXg6IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPD05IC0gMTEgb25seVxuXHRcdFx0XHQvLyBlbGVtLnRhYkluZGV4IGRvZXNuJ3QgYWx3YXlzIHJldHVybiB0aGVcblx0XHRcdFx0Ly8gY29ycmVjdCB2YWx1ZSB3aGVuIGl0IGhhc24ndCBiZWVuIGV4cGxpY2l0bHkgc2V0XG5cdFx0XHRcdC8vIGh0dHBzOi8vd2ViLmFyY2hpdmUub3JnL3dlYi8yMDE0MTExNjIzMzM0Ny9odHRwOi8vZmx1aWRwcm9qZWN0Lm9yZy9ibG9nLzIwMDgvMDEvMDkvZ2V0dGluZy1zZXR0aW5nLWFuZC1yZW1vdmluZy10YWJpbmRleC12YWx1ZXMtd2l0aC1qYXZhc2NyaXB0L1xuXHRcdFx0XHQvLyBVc2UgcHJvcGVyIGF0dHJpYnV0ZSByZXRyaWV2YWwoIzEyMDcyKVxuXHRcdFx0XHR2YXIgdGFiaW5kZXggPSBqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBcInRhYmluZGV4XCIgKTtcblxuXHRcdFx0XHRpZiAoIHRhYmluZGV4ICkge1xuXHRcdFx0XHRcdHJldHVybiBwYXJzZUludCggdGFiaW5kZXgsIDEwICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0cmZvY3VzYWJsZS50ZXN0KCBlbGVtLm5vZGVOYW1lICkgfHxcblx0XHRcdFx0XHRyY2xpY2thYmxlLnRlc3QoIGVsZW0ubm9kZU5hbWUgKSAmJlxuXHRcdFx0XHRcdGVsZW0uaHJlZlxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiAtMTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0cHJvcEZpeDoge1xuXHRcdFwiZm9yXCI6IFwiaHRtbEZvclwiLFxuXHRcdFwiY2xhc3NcIjogXCJjbGFzc05hbWVcIlxuXHR9XG59ICk7XG5cbi8vIFN1cHBvcnQ6IElFIDw9MTEgb25seVxuLy8gQWNjZXNzaW5nIHRoZSBzZWxlY3RlZEluZGV4IHByb3BlcnR5XG4vLyBmb3JjZXMgdGhlIGJyb3dzZXIgdG8gcmVzcGVjdCBzZXR0aW5nIHNlbGVjdGVkXG4vLyBvbiB0aGUgb3B0aW9uXG4vLyBUaGUgZ2V0dGVyIGVuc3VyZXMgYSBkZWZhdWx0IG9wdGlvbiBpcyBzZWxlY3RlZFxuLy8gd2hlbiBpbiBhbiBvcHRncm91cFxuLy8gZXNsaW50IHJ1bGUgXCJuby11bnVzZWQtZXhwcmVzc2lvbnNcIiBpcyBkaXNhYmxlZCBmb3IgdGhpcyBjb2RlXG4vLyBzaW5jZSBpdCBjb25zaWRlcnMgc3VjaCBhY2Nlc3Npb25zIG5vb3BcbmlmICggIXN1cHBvcnQub3B0U2VsZWN0ZWQgKSB7XG5cdGpRdWVyeS5wcm9wSG9va3Muc2VsZWN0ZWQgPSB7XG5cdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdFx0LyogZXNsaW50IG5vLXVudXNlZC1leHByZXNzaW9uczogXCJvZmZcIiAqL1xuXG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xuXHRcdFx0aWYgKCBwYXJlbnQgJiYgcGFyZW50LnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHBhcmVudC5wYXJlbnROb2RlLnNlbGVjdGVkSW5kZXg7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHRcdC8qIGVzbGludCBuby11bnVzZWQtZXhwcmVzc2lvbnM6IFwib2ZmXCIgKi9cblxuXHRcdFx0dmFyIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcblx0XHRcdGlmICggcGFyZW50ICkge1xuXHRcdFx0XHRwYXJlbnQuc2VsZWN0ZWRJbmRleDtcblxuXHRcdFx0XHRpZiAoIHBhcmVudC5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRcdHBhcmVudC5wYXJlbnROb2RlLnNlbGVjdGVkSW5kZXg7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG5cbmpRdWVyeS5lYWNoKCBbXG5cdFwidGFiSW5kZXhcIixcblx0XCJyZWFkT25seVwiLFxuXHRcIm1heExlbmd0aFwiLFxuXHRcImNlbGxTcGFjaW5nXCIsXG5cdFwiY2VsbFBhZGRpbmdcIixcblx0XCJyb3dTcGFuXCIsXG5cdFwiY29sU3BhblwiLFxuXHRcInVzZU1hcFwiLFxuXHRcImZyYW1lQm9yZGVyXCIsXG5cdFwiY29udGVudEVkaXRhYmxlXCJcbl0sIGZ1bmN0aW9uKCkge1xuXHRqUXVlcnkucHJvcEZpeFsgdGhpcy50b0xvd2VyQ2FzZSgpIF0gPSB0aGlzO1xufSApO1xuXG5cblxuXG5cdC8vIFN0cmlwIGFuZCBjb2xsYXBzZSB3aGl0ZXNwYWNlIGFjY29yZGluZyB0byBIVE1MIHNwZWNcblx0Ly8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW5mcmFzdHJ1Y3R1cmUuaHRtbCNzdHJpcC1hbmQtY29sbGFwc2Utd2hpdGVzcGFjZVxuXHRmdW5jdGlvbiBzdHJpcEFuZENvbGxhcHNlKCB2YWx1ZSApIHtcblx0XHR2YXIgdG9rZW5zID0gdmFsdWUubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbXTtcblx0XHRyZXR1cm4gdG9rZW5zLmpvaW4oIFwiIFwiICk7XG5cdH1cblxuXG5mdW5jdGlvbiBnZXRDbGFzcyggZWxlbSApIHtcblx0cmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlICYmIGVsZW0uZ2V0QXR0cmlidXRlKCBcImNsYXNzXCIgKSB8fCBcIlwiO1xufVxuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGFkZENsYXNzOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0dmFyIGNsYXNzZXMsIGVsZW0sIGN1ciwgY3VyVmFsdWUsIGNsYXp6LCBqLCBmaW5hbFZhbHVlLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oIGogKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLmFkZENsYXNzKCB2YWx1ZS5jYWxsKCB0aGlzLCBqLCBnZXRDbGFzcyggdGhpcyApICkgKTtcblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZSApIHtcblx0XHRcdGNsYXNzZXMgPSB2YWx1ZS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdO1xuXG5cdFx0XHR3aGlsZSAoICggZWxlbSA9IHRoaXNbIGkrKyBdICkgKSB7XG5cdFx0XHRcdGN1clZhbHVlID0gZ2V0Q2xhc3MoIGVsZW0gKTtcblx0XHRcdFx0Y3VyID0gZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAoIFwiIFwiICsgc3RyaXBBbmRDb2xsYXBzZSggY3VyVmFsdWUgKSArIFwiIFwiICk7XG5cblx0XHRcdFx0aWYgKCBjdXIgKSB7XG5cdFx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKCAoIGNsYXp6ID0gY2xhc3Nlc1sgaisrIF0gKSApIHtcblx0XHRcdFx0XHRcdGlmICggY3VyLmluZGV4T2YoIFwiIFwiICsgY2xhenogKyBcIiBcIiApIDwgMCApIHtcblx0XHRcdFx0XHRcdFx0Y3VyICs9IGNsYXp6ICsgXCIgXCI7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gT25seSBhc3NpZ24gaWYgZGlmZmVyZW50IHRvIGF2b2lkIHVubmVlZGVkIHJlbmRlcmluZy5cblx0XHRcdFx0XHRmaW5hbFZhbHVlID0gc3RyaXBBbmRDb2xsYXBzZSggY3VyICk7XG5cdFx0XHRcdFx0aWYgKCBjdXJWYWx1ZSAhPT0gZmluYWxWYWx1ZSApIHtcblx0XHRcdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCBcImNsYXNzXCIsIGZpbmFsVmFsdWUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRyZW1vdmVDbGFzczogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdHZhciBjbGFzc2VzLCBlbGVtLCBjdXIsIGN1clZhbHVlLCBjbGF6eiwgaiwgZmluYWxWYWx1ZSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBqICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS5yZW1vdmVDbGFzcyggdmFsdWUuY2FsbCggdGhpcywgaiwgZ2V0Q2xhc3MoIHRoaXMgKSApICk7XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0aWYgKCAhYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRcdHJldHVybiB0aGlzLmF0dHIoIFwiY2xhc3NcIiwgXCJcIiApO1xuXHRcdH1cblxuXHRcdGlmICggdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlICkge1xuXHRcdFx0Y2xhc3NlcyA9IHZhbHVlLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgW107XG5cblx0XHRcdHdoaWxlICggKCBlbGVtID0gdGhpc1sgaSsrIF0gKSApIHtcblx0XHRcdFx0Y3VyVmFsdWUgPSBnZXRDbGFzcyggZWxlbSApO1xuXG5cdFx0XHRcdC8vIFRoaXMgZXhwcmVzc2lvbiBpcyBoZXJlIGZvciBiZXR0ZXIgY29tcHJlc3NpYmlsaXR5IChzZWUgYWRkQ2xhc3MpXG5cdFx0XHRcdGN1ciA9IGVsZW0ubm9kZVR5cGUgPT09IDEgJiYgKCBcIiBcIiArIHN0cmlwQW5kQ29sbGFwc2UoIGN1clZhbHVlICkgKyBcIiBcIiApO1xuXG5cdFx0XHRcdGlmICggY3VyICkge1xuXHRcdFx0XHRcdGogPSAwO1xuXHRcdFx0XHRcdHdoaWxlICggKCBjbGF6eiA9IGNsYXNzZXNbIGorKyBdICkgKSB7XG5cblx0XHRcdFx0XHRcdC8vIFJlbW92ZSAqYWxsKiBpbnN0YW5jZXNcblx0XHRcdFx0XHRcdHdoaWxlICggY3VyLmluZGV4T2YoIFwiIFwiICsgY2xhenogKyBcIiBcIiApID4gLTEgKSB7XG5cdFx0XHRcdFx0XHRcdGN1ciA9IGN1ci5yZXBsYWNlKCBcIiBcIiArIGNsYXp6ICsgXCIgXCIsIFwiIFwiICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gT25seSBhc3NpZ24gaWYgZGlmZmVyZW50IHRvIGF2b2lkIHVubmVlZGVkIHJlbmRlcmluZy5cblx0XHRcdFx0XHRmaW5hbFZhbHVlID0gc3RyaXBBbmRDb2xsYXBzZSggY3VyICk7XG5cdFx0XHRcdFx0aWYgKCBjdXJWYWx1ZSAhPT0gZmluYWxWYWx1ZSApIHtcblx0XHRcdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCBcImNsYXNzXCIsIGZpbmFsVmFsdWUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHR0b2dnbGVDbGFzczogZnVuY3Rpb24oIHZhbHVlLCBzdGF0ZVZhbCApIHtcblx0XHR2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcblxuXHRcdGlmICggdHlwZW9mIHN0YXRlVmFsID09PSBcImJvb2xlYW5cIiAmJiB0eXBlID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIHN0YXRlVmFsID8gdGhpcy5hZGRDbGFzcyggdmFsdWUgKSA6IHRoaXMucmVtb3ZlQ2xhc3MoIHZhbHVlICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS50b2dnbGVDbGFzcyhcblx0XHRcdFx0XHR2YWx1ZS5jYWxsKCB0aGlzLCBpLCBnZXRDbGFzcyggdGhpcyApLCBzdGF0ZVZhbCApLFxuXHRcdFx0XHRcdHN0YXRlVmFsXG5cdFx0XHRcdCk7XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgY2xhc3NOYW1lLCBpLCBzZWxmLCBjbGFzc05hbWVzO1xuXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwic3RyaW5nXCIgKSB7XG5cblx0XHRcdFx0Ly8gVG9nZ2xlIGluZGl2aWR1YWwgY2xhc3MgbmFtZXNcblx0XHRcdFx0aSA9IDA7XG5cdFx0XHRcdHNlbGYgPSBqUXVlcnkoIHRoaXMgKTtcblx0XHRcdFx0Y2xhc3NOYW1lcyA9IHZhbHVlLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgW107XG5cblx0XHRcdFx0d2hpbGUgKCAoIGNsYXNzTmFtZSA9IGNsYXNzTmFtZXNbIGkrKyBdICkgKSB7XG5cblx0XHRcdFx0XHQvLyBDaGVjayBlYWNoIGNsYXNzTmFtZSBnaXZlbiwgc3BhY2Ugc2VwYXJhdGVkIGxpc3Rcblx0XHRcdFx0XHRpZiAoIHNlbGYuaGFzQ2xhc3MoIGNsYXNzTmFtZSApICkge1xuXHRcdFx0XHRcdFx0c2VsZi5yZW1vdmVDbGFzcyggY2xhc3NOYW1lICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHNlbGYuYWRkQ2xhc3MoIGNsYXNzTmFtZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHQvLyBUb2dnbGUgd2hvbGUgY2xhc3MgbmFtZVxuXHRcdFx0fSBlbHNlIGlmICggdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB0eXBlID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRcdFx0Y2xhc3NOYW1lID0gZ2V0Q2xhc3MoIHRoaXMgKTtcblx0XHRcdFx0aWYgKCBjbGFzc05hbWUgKSB7XG5cblx0XHRcdFx0XHQvLyBTdG9yZSBjbGFzc05hbWUgaWYgc2V0XG5cdFx0XHRcdFx0ZGF0YVByaXYuc2V0KCB0aGlzLCBcIl9fY2xhc3NOYW1lX19cIiwgY2xhc3NOYW1lICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBJZiB0aGUgZWxlbWVudCBoYXMgYSBjbGFzcyBuYW1lIG9yIGlmIHdlJ3JlIHBhc3NlZCBgZmFsc2VgLFxuXHRcdFx0XHQvLyB0aGVuIHJlbW92ZSB0aGUgd2hvbGUgY2xhc3NuYW1lIChpZiB0aGVyZSB3YXMgb25lLCB0aGUgYWJvdmUgc2F2ZWQgaXQpLlxuXHRcdFx0XHQvLyBPdGhlcndpc2UgYnJpbmcgYmFjayB3aGF0ZXZlciB3YXMgcHJldmlvdXNseSBzYXZlZCAoaWYgYW55dGhpbmcpLFxuXHRcdFx0XHQvLyBmYWxsaW5nIGJhY2sgdG8gdGhlIGVtcHR5IHN0cmluZyBpZiBub3RoaW5nIHdhcyBzdG9yZWQuXG5cdFx0XHRcdGlmICggdGhpcy5zZXRBdHRyaWJ1dGUgKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIixcblx0XHRcdFx0XHRcdGNsYXNzTmFtZSB8fCB2YWx1ZSA9PT0gZmFsc2UgP1xuXHRcdFx0XHRcdFx0XCJcIiA6XG5cdFx0XHRcdFx0XHRkYXRhUHJpdi5nZXQoIHRoaXMsIFwiX19jbGFzc05hbWVfX1wiICkgfHwgXCJcIlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0aGFzQ2xhc3M6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHR2YXIgY2xhc3NOYW1lLCBlbGVtLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRjbGFzc05hbWUgPSBcIiBcIiArIHNlbGVjdG9yICsgXCIgXCI7XG5cdFx0d2hpbGUgKCAoIGVsZW0gPSB0aGlzWyBpKysgXSApICkge1xuXHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICYmXG5cdFx0XHRcdCggXCIgXCIgKyBzdHJpcEFuZENvbGxhcHNlKCBnZXRDbGFzcyggZWxlbSApICkgKyBcIiBcIiApLmluZGV4T2YoIGNsYXNzTmFtZSApID4gLTEgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59ICk7XG5cblxuXG5cbnZhciBycmV0dXJuID0gL1xcci9nO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdHZhbDogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdHZhciBob29rcywgcmV0LCBpc0Z1bmN0aW9uLFxuXHRcdFx0ZWxlbSA9IHRoaXNbIDAgXTtcblxuXHRcdGlmICggIWFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRpZiAoIGVsZW0gKSB7XG5cdFx0XHRcdGhvb2tzID0galF1ZXJ5LnZhbEhvb2tzWyBlbGVtLnR5cGUgXSB8fFxuXHRcdFx0XHRcdGpRdWVyeS52YWxIb29rc1sgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpIF07XG5cblx0XHRcdFx0aWYgKCBob29rcyAmJlxuXHRcdFx0XHRcdFwiZ2V0XCIgaW4gaG9va3MgJiZcblx0XHRcdFx0XHQoIHJldCA9IGhvb2tzLmdldCggZWxlbSwgXCJ2YWx1ZVwiICkgKSAhPT0gdW5kZWZpbmVkXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXQgPSBlbGVtLnZhbHVlO1xuXG5cdFx0XHRcdC8vIEhhbmRsZSBtb3N0IGNvbW1vbiBzdHJpbmcgY2FzZXNcblx0XHRcdFx0aWYgKCB0eXBlb2YgcmV0ID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0XHRcdHJldHVybiByZXQucmVwbGFjZSggcnJldHVybiwgXCJcIiApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gSGFuZGxlIGNhc2VzIHdoZXJlIHZhbHVlIGlzIG51bGwvdW5kZWYgb3IgbnVtYmVyXG5cdFx0XHRcdHJldHVybiByZXQgPT0gbnVsbCA/IFwiXCIgOiByZXQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpc0Z1bmN0aW9uID0galF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICk7XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcblx0XHRcdHZhciB2YWw7XG5cblx0XHRcdGlmICggdGhpcy5ub2RlVHlwZSAhPT0gMSApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGlzRnVuY3Rpb24gKSB7XG5cdFx0XHRcdHZhbCA9IHZhbHVlLmNhbGwoIHRoaXMsIGksIGpRdWVyeSggdGhpcyApLnZhbCgpICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YWwgPSB2YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVHJlYXQgbnVsbC91bmRlZmluZWQgYXMgXCJcIjsgY29udmVydCBudW1iZXJzIHRvIHN0cmluZ1xuXHRcdFx0aWYgKCB2YWwgPT0gbnVsbCApIHtcblx0XHRcdFx0dmFsID0gXCJcIjtcblxuXHRcdFx0fSBlbHNlIGlmICggdHlwZW9mIHZhbCA9PT0gXCJudW1iZXJcIiApIHtcblx0XHRcdFx0dmFsICs9IFwiXCI7XG5cblx0XHRcdH0gZWxzZSBpZiAoIEFycmF5LmlzQXJyYXkoIHZhbCApICkge1xuXHRcdFx0XHR2YWwgPSBqUXVlcnkubWFwKCB2YWwsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdFx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZSArIFwiXCI7XG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblxuXHRcdFx0aG9va3MgPSBqUXVlcnkudmFsSG9va3NbIHRoaXMudHlwZSBdIHx8IGpRdWVyeS52YWxIb29rc1sgdGhpcy5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpIF07XG5cblx0XHRcdC8vIElmIHNldCByZXR1cm5zIHVuZGVmaW5lZCwgZmFsbCBiYWNrIHRvIG5vcm1hbCBzZXR0aW5nXG5cdFx0XHRpZiAoICFob29rcyB8fCAhKCBcInNldFwiIGluIGhvb2tzICkgfHwgaG9va3Muc2V0KCB0aGlzLCB2YWwsIFwidmFsdWVcIiApID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2YWw7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5leHRlbmQoIHtcblx0dmFsSG9va3M6IHtcblx0XHRvcHRpb246IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHRcdFx0dmFyIHZhbCA9IGpRdWVyeS5maW5kLmF0dHIoIGVsZW0sIFwidmFsdWVcIiApO1xuXHRcdFx0XHRyZXR1cm4gdmFsICE9IG51bGwgP1xuXHRcdFx0XHRcdHZhbCA6XG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTEwIC0gMTEgb25seVxuXHRcdFx0XHRcdC8vIG9wdGlvbi50ZXh0IHRocm93cyBleGNlcHRpb25zICgjMTQ2ODYsICMxNDg1OClcblx0XHRcdFx0XHQvLyBTdHJpcCBhbmQgY29sbGFwc2Ugd2hpdGVzcGFjZVxuXHRcdFx0XHRcdC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvI3N0cmlwLWFuZC1jb2xsYXBzZS13aGl0ZXNwYWNlXG5cdFx0XHRcdFx0c3RyaXBBbmRDb2xsYXBzZSggalF1ZXJ5LnRleHQoIGVsZW0gKSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0c2VsZWN0OiB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHR2YXIgdmFsdWUsIG9wdGlvbiwgaSxcblx0XHRcdFx0XHRvcHRpb25zID0gZWxlbS5vcHRpb25zLFxuXHRcdFx0XHRcdGluZGV4ID0gZWxlbS5zZWxlY3RlZEluZGV4LFxuXHRcdFx0XHRcdG9uZSA9IGVsZW0udHlwZSA9PT0gXCJzZWxlY3Qtb25lXCIsXG5cdFx0XHRcdFx0dmFsdWVzID0gb25lID8gbnVsbCA6IFtdLFxuXHRcdFx0XHRcdG1heCA9IG9uZSA/IGluZGV4ICsgMSA6IG9wdGlvbnMubGVuZ3RoO1xuXG5cdFx0XHRcdGlmICggaW5kZXggPCAwICkge1xuXHRcdFx0XHRcdGkgPSBtYXg7XG5cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpID0gb25lID8gaW5kZXggOiAwO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gTG9vcCB0aHJvdWdoIGFsbCB0aGUgc2VsZWN0ZWQgb3B0aW9uc1xuXHRcdFx0XHRmb3IgKCA7IGkgPCBtYXg7IGkrKyApIHtcblx0XHRcdFx0XHRvcHRpb24gPSBvcHRpb25zWyBpIF07XG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuXHRcdFx0XHRcdC8vIElFOC05IGRvZXNuJ3QgdXBkYXRlIHNlbGVjdGVkIGFmdGVyIGZvcm0gcmVzZXQgKCMyNTUxKVxuXHRcdFx0XHRcdGlmICggKCBvcHRpb24uc2VsZWN0ZWQgfHwgaSA9PT0gaW5kZXggKSAmJlxuXG5cdFx0XHRcdFx0XHRcdC8vIERvbid0IHJldHVybiBvcHRpb25zIHRoYXQgYXJlIGRpc2FibGVkIG9yIGluIGEgZGlzYWJsZWQgb3B0Z3JvdXBcblx0XHRcdFx0XHRcdFx0IW9wdGlvbi5kaXNhYmxlZCAmJlxuXHRcdFx0XHRcdFx0XHQoICFvcHRpb24ucGFyZW50Tm9kZS5kaXNhYmxlZCB8fFxuXHRcdFx0XHRcdFx0XHRcdCFub2RlTmFtZSggb3B0aW9uLnBhcmVudE5vZGUsIFwib3B0Z3JvdXBcIiApICkgKSB7XG5cblx0XHRcdFx0XHRcdC8vIEdldCB0aGUgc3BlY2lmaWMgdmFsdWUgZm9yIHRoZSBvcHRpb25cblx0XHRcdFx0XHRcdHZhbHVlID0galF1ZXJ5KCBvcHRpb24gKS52YWwoKTtcblxuXHRcdFx0XHRcdFx0Ly8gV2UgZG9uJ3QgbmVlZCBhbiBhcnJheSBmb3Igb25lIHNlbGVjdHNcblx0XHRcdFx0XHRcdGlmICggb25lICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIE11bHRpLVNlbGVjdHMgcmV0dXJuIGFuIGFycmF5XG5cdFx0XHRcdFx0XHR2YWx1ZXMucHVzaCggdmFsdWUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdmFsdWVzO1xuXHRcdFx0fSxcblxuXHRcdFx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG5cdFx0XHRcdHZhciBvcHRpb25TZXQsIG9wdGlvbixcblx0XHRcdFx0XHRvcHRpb25zID0gZWxlbS5vcHRpb25zLFxuXHRcdFx0XHRcdHZhbHVlcyA9IGpRdWVyeS5tYWtlQXJyYXkoIHZhbHVlICksXG5cdFx0XHRcdFx0aSA9IG9wdGlvbnMubGVuZ3RoO1xuXG5cdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdG9wdGlvbiA9IG9wdGlvbnNbIGkgXTtcblxuXHRcdFx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbmQtYXNzaWduICovXG5cblx0XHRcdFx0XHRpZiAoIG9wdGlvbi5zZWxlY3RlZCA9XG5cdFx0XHRcdFx0XHRqUXVlcnkuaW5BcnJheSggalF1ZXJ5LnZhbEhvb2tzLm9wdGlvbi5nZXQoIG9wdGlvbiApLCB2YWx1ZXMgKSA+IC0xXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRvcHRpb25TZXQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8tY29uZC1hc3NpZ24gKi9cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEZvcmNlIGJyb3dzZXJzIHRvIGJlaGF2ZSBjb25zaXN0ZW50bHkgd2hlbiBub24tbWF0Y2hpbmcgdmFsdWUgaXMgc2V0XG5cdFx0XHRcdGlmICggIW9wdGlvblNldCApIHtcblx0XHRcdFx0XHRlbGVtLnNlbGVjdGVkSW5kZXggPSAtMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdmFsdWVzO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufSApO1xuXG4vLyBSYWRpb3MgYW5kIGNoZWNrYm94ZXMgZ2V0dGVyL3NldHRlclxualF1ZXJ5LmVhY2goIFsgXCJyYWRpb1wiLCBcImNoZWNrYm94XCIgXSwgZnVuY3Rpb24oKSB7XG5cdGpRdWVyeS52YWxIb29rc1sgdGhpcyBdID0ge1xuXHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdFx0aWYgKCBBcnJheS5pc0FycmF5KCB2YWx1ZSApICkge1xuXHRcdFx0XHRyZXR1cm4gKCBlbGVtLmNoZWNrZWQgPSBqUXVlcnkuaW5BcnJheSggalF1ZXJ5KCBlbGVtICkudmFsKCksIHZhbHVlICkgPiAtMSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0aWYgKCAhc3VwcG9ydC5jaGVja09uICkge1xuXHRcdGpRdWVyeS52YWxIb29rc1sgdGhpcyBdLmdldCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKCBcInZhbHVlXCIgKSA9PT0gbnVsbCA/IFwib25cIiA6IGVsZW0udmFsdWU7XG5cdFx0fTtcblx0fVxufSApO1xuXG5cblxuXG4vLyBSZXR1cm4galF1ZXJ5IGZvciBhdHRyaWJ1dGVzLW9ubHkgaW5jbHVzaW9uXG5cblxudmFyIHJmb2N1c01vcnBoID0gL14oPzpmb2N1c2luZm9jdXN8Zm9jdXNvdXRibHVyKSQvO1xuXG5qUXVlcnkuZXh0ZW5kKCBqUXVlcnkuZXZlbnQsIHtcblxuXHR0cmlnZ2VyOiBmdW5jdGlvbiggZXZlbnQsIGRhdGEsIGVsZW0sIG9ubHlIYW5kbGVycyApIHtcblxuXHRcdHZhciBpLCBjdXIsIHRtcCwgYnViYmxlVHlwZSwgb250eXBlLCBoYW5kbGUsIHNwZWNpYWwsXG5cdFx0XHRldmVudFBhdGggPSBbIGVsZW0gfHwgZG9jdW1lbnQgXSxcblx0XHRcdHR5cGUgPSBoYXNPd24uY2FsbCggZXZlbnQsIFwidHlwZVwiICkgPyBldmVudC50eXBlIDogZXZlbnQsXG5cdFx0XHRuYW1lc3BhY2VzID0gaGFzT3duLmNhbGwoIGV2ZW50LCBcIm5hbWVzcGFjZVwiICkgPyBldmVudC5uYW1lc3BhY2Uuc3BsaXQoIFwiLlwiICkgOiBbXTtcblxuXHRcdGN1ciA9IHRtcCA9IGVsZW0gPSBlbGVtIHx8IGRvY3VtZW50O1xuXG5cdFx0Ly8gRG9uJ3QgZG8gZXZlbnRzIG9uIHRleHQgYW5kIGNvbW1lbnQgbm9kZXNcblx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDMgfHwgZWxlbS5ub2RlVHlwZSA9PT0gOCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBmb2N1cy9ibHVyIG1vcnBocyB0byBmb2N1c2luL291dDsgZW5zdXJlIHdlJ3JlIG5vdCBmaXJpbmcgdGhlbSByaWdodCBub3dcblx0XHRpZiAoIHJmb2N1c01vcnBoLnRlc3QoIHR5cGUgKyBqUXVlcnkuZXZlbnQudHJpZ2dlcmVkICkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCB0eXBlLmluZGV4T2YoIFwiLlwiICkgPiAtMSApIHtcblxuXHRcdFx0Ly8gTmFtZXNwYWNlZCB0cmlnZ2VyOyBjcmVhdGUgYSByZWdleHAgdG8gbWF0Y2ggZXZlbnQgdHlwZSBpbiBoYW5kbGUoKVxuXHRcdFx0bmFtZXNwYWNlcyA9IHR5cGUuc3BsaXQoIFwiLlwiICk7XG5cdFx0XHR0eXBlID0gbmFtZXNwYWNlcy5zaGlmdCgpO1xuXHRcdFx0bmFtZXNwYWNlcy5zb3J0KCk7XG5cdFx0fVxuXHRcdG9udHlwZSA9IHR5cGUuaW5kZXhPZiggXCI6XCIgKSA8IDAgJiYgXCJvblwiICsgdHlwZTtcblxuXHRcdC8vIENhbGxlciBjYW4gcGFzcyBpbiBhIGpRdWVyeS5FdmVudCBvYmplY3QsIE9iamVjdCwgb3IganVzdCBhbiBldmVudCB0eXBlIHN0cmluZ1xuXHRcdGV2ZW50ID0gZXZlbnRbIGpRdWVyeS5leHBhbmRvIF0gP1xuXHRcdFx0ZXZlbnQgOlxuXHRcdFx0bmV3IGpRdWVyeS5FdmVudCggdHlwZSwgdHlwZW9mIGV2ZW50ID09PSBcIm9iamVjdFwiICYmIGV2ZW50ICk7XG5cblx0XHQvLyBUcmlnZ2VyIGJpdG1hc2s6ICYgMSBmb3IgbmF0aXZlIGhhbmRsZXJzOyAmIDIgZm9yIGpRdWVyeSAoYWx3YXlzIHRydWUpXG5cdFx0ZXZlbnQuaXNUcmlnZ2VyID0gb25seUhhbmRsZXJzID8gMiA6IDM7XG5cdFx0ZXZlbnQubmFtZXNwYWNlID0gbmFtZXNwYWNlcy5qb2luKCBcIi5cIiApO1xuXHRcdGV2ZW50LnJuYW1lc3BhY2UgPSBldmVudC5uYW1lc3BhY2UgP1xuXHRcdFx0bmV3IFJlZ0V4cCggXCIoXnxcXFxcLilcIiArIG5hbWVzcGFjZXMuam9pbiggXCJcXFxcLig/Oi4qXFxcXC58KVwiICkgKyBcIihcXFxcLnwkKVwiICkgOlxuXHRcdFx0bnVsbDtcblxuXHRcdC8vIENsZWFuIHVwIHRoZSBldmVudCBpbiBjYXNlIGl0IGlzIGJlaW5nIHJldXNlZFxuXHRcdGV2ZW50LnJlc3VsdCA9IHVuZGVmaW5lZDtcblx0XHRpZiAoICFldmVudC50YXJnZXQgKSB7XG5cdFx0XHRldmVudC50YXJnZXQgPSBlbGVtO1xuXHRcdH1cblxuXHRcdC8vIENsb25lIGFueSBpbmNvbWluZyBkYXRhIGFuZCBwcmVwZW5kIHRoZSBldmVudCwgY3JlYXRpbmcgdGhlIGhhbmRsZXIgYXJnIGxpc3Rcblx0XHRkYXRhID0gZGF0YSA9PSBudWxsID9cblx0XHRcdFsgZXZlbnQgXSA6XG5cdFx0XHRqUXVlcnkubWFrZUFycmF5KCBkYXRhLCBbIGV2ZW50IF0gKTtcblxuXHRcdC8vIEFsbG93IHNwZWNpYWwgZXZlbnRzIHRvIGRyYXcgb3V0c2lkZSB0aGUgbGluZXNcblx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblx0XHRpZiAoICFvbmx5SGFuZGxlcnMgJiYgc3BlY2lhbC50cmlnZ2VyICYmIHNwZWNpYWwudHJpZ2dlci5hcHBseSggZWxlbSwgZGF0YSApID09PSBmYWxzZSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBEZXRlcm1pbmUgZXZlbnQgcHJvcGFnYXRpb24gcGF0aCBpbiBhZHZhbmNlLCBwZXIgVzNDIGV2ZW50cyBzcGVjICgjOTk1MSlcblx0XHQvLyBCdWJibGUgdXAgdG8gZG9jdW1lbnQsIHRoZW4gdG8gd2luZG93OyB3YXRjaCBmb3IgYSBnbG9iYWwgb3duZXJEb2N1bWVudCB2YXIgKCM5NzI0KVxuXHRcdGlmICggIW9ubHlIYW5kbGVycyAmJiAhc3BlY2lhbC5ub0J1YmJsZSAmJiAhalF1ZXJ5LmlzV2luZG93KCBlbGVtICkgKSB7XG5cblx0XHRcdGJ1YmJsZVR5cGUgPSBzcGVjaWFsLmRlbGVnYXRlVHlwZSB8fCB0eXBlO1xuXHRcdFx0aWYgKCAhcmZvY3VzTW9ycGgudGVzdCggYnViYmxlVHlwZSArIHR5cGUgKSApIHtcblx0XHRcdFx0Y3VyID0gY3VyLnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKCA7IGN1cjsgY3VyID0gY3VyLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdGV2ZW50UGF0aC5wdXNoKCBjdXIgKTtcblx0XHRcdFx0dG1wID0gY3VyO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBPbmx5IGFkZCB3aW5kb3cgaWYgd2UgZ290IHRvIGRvY3VtZW50IChlLmcuLCBub3QgcGxhaW4gb2JqIG9yIGRldGFjaGVkIERPTSlcblx0XHRcdGlmICggdG1wID09PSAoIGVsZW0ub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudCApICkge1xuXHRcdFx0XHRldmVudFBhdGgucHVzaCggdG1wLmRlZmF1bHRWaWV3IHx8IHRtcC5wYXJlbnRXaW5kb3cgfHwgd2luZG93ICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRmlyZSBoYW5kbGVycyBvbiB0aGUgZXZlbnQgcGF0aFxuXHRcdGkgPSAwO1xuXHRcdHdoaWxlICggKCBjdXIgPSBldmVudFBhdGhbIGkrKyBdICkgJiYgIWV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG5cblx0XHRcdGV2ZW50LnR5cGUgPSBpID4gMSA/XG5cdFx0XHRcdGJ1YmJsZVR5cGUgOlxuXHRcdFx0XHRzcGVjaWFsLmJpbmRUeXBlIHx8IHR5cGU7XG5cblx0XHRcdC8vIGpRdWVyeSBoYW5kbGVyXG5cdFx0XHRoYW5kbGUgPSAoIGRhdGFQcml2LmdldCggY3VyLCBcImV2ZW50c1wiICkgfHwge30gKVsgZXZlbnQudHlwZSBdICYmXG5cdFx0XHRcdGRhdGFQcml2LmdldCggY3VyLCBcImhhbmRsZVwiICk7XG5cdFx0XHRpZiAoIGhhbmRsZSApIHtcblx0XHRcdFx0aGFuZGxlLmFwcGx5KCBjdXIsIGRhdGEgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTmF0aXZlIGhhbmRsZXJcblx0XHRcdGhhbmRsZSA9IG9udHlwZSAmJiBjdXJbIG9udHlwZSBdO1xuXHRcdFx0aWYgKCBoYW5kbGUgJiYgaGFuZGxlLmFwcGx5ICYmIGFjY2VwdERhdGEoIGN1ciApICkge1xuXHRcdFx0XHRldmVudC5yZXN1bHQgPSBoYW5kbGUuYXBwbHkoIGN1ciwgZGF0YSApO1xuXHRcdFx0XHRpZiAoIGV2ZW50LnJlc3VsdCA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRldmVudC50eXBlID0gdHlwZTtcblxuXHRcdC8vIElmIG5vYm9keSBwcmV2ZW50ZWQgdGhlIGRlZmF1bHQgYWN0aW9uLCBkbyBpdCBub3dcblx0XHRpZiAoICFvbmx5SGFuZGxlcnMgJiYgIWV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpICkge1xuXG5cdFx0XHRpZiAoICggIXNwZWNpYWwuX2RlZmF1bHQgfHxcblx0XHRcdFx0c3BlY2lhbC5fZGVmYXVsdC5hcHBseSggZXZlbnRQYXRoLnBvcCgpLCBkYXRhICkgPT09IGZhbHNlICkgJiZcblx0XHRcdFx0YWNjZXB0RGF0YSggZWxlbSApICkge1xuXG5cdFx0XHRcdC8vIENhbGwgYSBuYXRpdmUgRE9NIG1ldGhvZCBvbiB0aGUgdGFyZ2V0IHdpdGggdGhlIHNhbWUgbmFtZSBhcyB0aGUgZXZlbnQuXG5cdFx0XHRcdC8vIERvbid0IGRvIGRlZmF1bHQgYWN0aW9ucyBvbiB3aW5kb3csIHRoYXQncyB3aGVyZSBnbG9iYWwgdmFyaWFibGVzIGJlICgjNjE3MClcblx0XHRcdFx0aWYgKCBvbnR5cGUgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIGVsZW1bIHR5cGUgXSApICYmICFqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSApIHtcblxuXHRcdFx0XHRcdC8vIERvbid0IHJlLXRyaWdnZXIgYW4gb25GT08gZXZlbnQgd2hlbiB3ZSBjYWxsIGl0cyBGT08oKSBtZXRob2Rcblx0XHRcdFx0XHR0bXAgPSBlbGVtWyBvbnR5cGUgXTtcblxuXHRcdFx0XHRcdGlmICggdG1wICkge1xuXHRcdFx0XHRcdFx0ZWxlbVsgb250eXBlIF0gPSBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFByZXZlbnQgcmUtdHJpZ2dlcmluZyBvZiB0aGUgc2FtZSBldmVudCwgc2luY2Ugd2UgYWxyZWFkeSBidWJibGVkIGl0IGFib3ZlXG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCA9IHR5cGU7XG5cdFx0XHRcdFx0ZWxlbVsgdHlwZSBdKCk7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRcdGlmICggdG1wICkge1xuXHRcdFx0XHRcdFx0ZWxlbVsgb250eXBlIF0gPSB0bXA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LnJlc3VsdDtcblx0fSxcblxuXHQvLyBQaWdneWJhY2sgb24gYSBkb25vciBldmVudCB0byBzaW11bGF0ZSBhIGRpZmZlcmVudCBvbmVcblx0Ly8gVXNlZCBvbmx5IGZvciBgZm9jdXMoaW4gfCBvdXQpYCBldmVudHNcblx0c2ltdWxhdGU6IGZ1bmN0aW9uKCB0eXBlLCBlbGVtLCBldmVudCApIHtcblx0XHR2YXIgZSA9IGpRdWVyeS5leHRlbmQoXG5cdFx0XHRuZXcgalF1ZXJ5LkV2ZW50KCksXG5cdFx0XHRldmVudCxcblx0XHRcdHtcblx0XHRcdFx0dHlwZTogdHlwZSxcblx0XHRcdFx0aXNTaW11bGF0ZWQ6IHRydWVcblx0XHRcdH1cblx0XHQpO1xuXG5cdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXIoIGUsIG51bGwsIGVsZW0gKTtcblx0fVxuXG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblxuXHR0cmlnZ2VyOiBmdW5jdGlvbiggdHlwZSwgZGF0YSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyKCB0eXBlLCBkYXRhLCB0aGlzICk7XG5cdFx0fSApO1xuXHR9LFxuXHR0cmlnZ2VySGFuZGxlcjogZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XG5cdFx0dmFyIGVsZW0gPSB0aGlzWyAwIF07XG5cdFx0aWYgKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5ldmVudC50cmlnZ2VyKCB0eXBlLCBkYXRhLCBlbGVtLCB0cnVlICk7XG5cdFx0fVxuXHR9XG59ICk7XG5cblxualF1ZXJ5LmVhY2goICggXCJibHVyIGZvY3VzIGZvY3VzaW4gZm9jdXNvdXQgcmVzaXplIHNjcm9sbCBjbGljayBkYmxjbGljayBcIiArXG5cdFwibW91c2Vkb3duIG1vdXNldXAgbW91c2Vtb3ZlIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZWVudGVyIG1vdXNlbGVhdmUgXCIgK1xuXHRcImNoYW5nZSBzZWxlY3Qgc3VibWl0IGtleWRvd24ga2V5cHJlc3Mga2V5dXAgY29udGV4dG1lbnVcIiApLnNwbGl0KCBcIiBcIiApLFxuXHRmdW5jdGlvbiggaSwgbmFtZSApIHtcblxuXHQvLyBIYW5kbGUgZXZlbnQgYmluZGluZ1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA+IDAgP1xuXHRcdFx0dGhpcy5vbiggbmFtZSwgbnVsbCwgZGF0YSwgZm4gKSA6XG5cdFx0XHR0aGlzLnRyaWdnZXIoIG5hbWUgKTtcblx0fTtcbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRob3ZlcjogZnVuY3Rpb24oIGZuT3ZlciwgZm5PdXQgKSB7XG5cdFx0cmV0dXJuIHRoaXMubW91c2VlbnRlciggZm5PdmVyICkubW91c2VsZWF2ZSggZm5PdXQgfHwgZm5PdmVyICk7XG5cdH1cbn0gKTtcblxuXG5cblxuc3VwcG9ydC5mb2N1c2luID0gXCJvbmZvY3VzaW5cIiBpbiB3aW5kb3c7XG5cblxuLy8gU3VwcG9ydDogRmlyZWZveCA8PTQ0XG4vLyBGaXJlZm94IGRvZXNuJ3QgaGF2ZSBmb2N1cyhpbiB8IG91dCkgZXZlbnRzXG4vLyBSZWxhdGVkIHRpY2tldCAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY4Nzc4N1xuLy9cbi8vIFN1cHBvcnQ6IENocm9tZSA8PTQ4IC0gNDksIFNhZmFyaSA8PTkuMCAtIDkuMVxuLy8gZm9jdXMoaW4gfCBvdXQpIGV2ZW50cyBmaXJlIGFmdGVyIGZvY3VzICYgYmx1ciBldmVudHMsXG4vLyB3aGljaCBpcyBzcGVjIHZpb2xhdGlvbiAtIGh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0zLUV2ZW50cy8jZXZlbnRzLWZvY3VzZXZlbnQtZXZlbnQtb3JkZXJcbi8vIFJlbGF0ZWQgdGlja2V0IC0gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDQ5ODU3XG5pZiAoICFzdXBwb3J0LmZvY3VzaW4gKSB7XG5cdGpRdWVyeS5lYWNoKCB7IGZvY3VzOiBcImZvY3VzaW5cIiwgYmx1cjogXCJmb2N1c291dFwiIH0sIGZ1bmN0aW9uKCBvcmlnLCBmaXggKSB7XG5cblx0XHQvLyBBdHRhY2ggYSBzaW5nbGUgY2FwdHVyaW5nIGhhbmRsZXIgb24gdGhlIGRvY3VtZW50IHdoaWxlIHNvbWVvbmUgd2FudHMgZm9jdXNpbi9mb2N1c291dFxuXHRcdHZhciBoYW5kbGVyID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdFx0alF1ZXJ5LmV2ZW50LnNpbXVsYXRlKCBmaXgsIGV2ZW50LnRhcmdldCwgalF1ZXJ5LmV2ZW50LmZpeCggZXZlbnQgKSApO1xuXHRcdH07XG5cblx0XHRqUXVlcnkuZXZlbnQuc3BlY2lhbFsgZml4IF0gPSB7XG5cdFx0XHRzZXR1cDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBkb2MgPSB0aGlzLm93bmVyRG9jdW1lbnQgfHwgdGhpcyxcblx0XHRcdFx0XHRhdHRhY2hlcyA9IGRhdGFQcml2LmFjY2VzcyggZG9jLCBmaXggKTtcblxuXHRcdFx0XHRpZiAoICFhdHRhY2hlcyApIHtcblx0XHRcdFx0XHRkb2MuYWRkRXZlbnRMaXN0ZW5lciggb3JpZywgaGFuZGxlciwgdHJ1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRhdGFQcml2LmFjY2VzcyggZG9jLCBmaXgsICggYXR0YWNoZXMgfHwgMCApICsgMSApO1xuXHRcdFx0fSxcblx0XHRcdHRlYXJkb3duOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGRvYyA9IHRoaXMub3duZXJEb2N1bWVudCB8fCB0aGlzLFxuXHRcdFx0XHRcdGF0dGFjaGVzID0gZGF0YVByaXYuYWNjZXNzKCBkb2MsIGZpeCApIC0gMTtcblxuXHRcdFx0XHRpZiAoICFhdHRhY2hlcyApIHtcblx0XHRcdFx0XHRkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lciggb3JpZywgaGFuZGxlciwgdHJ1ZSApO1xuXHRcdFx0XHRcdGRhdGFQcml2LnJlbW92ZSggZG9jLCBmaXggKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRhdGFQcml2LmFjY2VzcyggZG9jLCBmaXgsIGF0dGFjaGVzICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHR9ICk7XG59XG52YXIgbG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247XG5cbnZhciBub25jZSA9IGpRdWVyeS5ub3coKTtcblxudmFyIHJxdWVyeSA9ICggL1xcPy8gKTtcblxuXG5cbi8vIENyb3NzLWJyb3dzZXIgeG1sIHBhcnNpbmdcbmpRdWVyeS5wYXJzZVhNTCA9IGZ1bmN0aW9uKCBkYXRhICkge1xuXHR2YXIgeG1sO1xuXHRpZiAoICFkYXRhIHx8IHR5cGVvZiBkYXRhICE9PSBcInN0cmluZ1wiICkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Ly8gU3VwcG9ydDogSUUgOSAtIDExIG9ubHlcblx0Ly8gSUUgdGhyb3dzIG9uIHBhcnNlRnJvbVN0cmluZyB3aXRoIGludmFsaWQgaW5wdXQuXG5cdHRyeSB7XG5cdFx0eG1sID0gKCBuZXcgd2luZG93LkRPTVBhcnNlcigpICkucGFyc2VGcm9tU3RyaW5nKCBkYXRhLCBcInRleHQveG1sXCIgKTtcblx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0eG1sID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0aWYgKCAheG1sIHx8IHhtbC5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJwYXJzZXJlcnJvclwiICkubGVuZ3RoICkge1xuXHRcdGpRdWVyeS5lcnJvciggXCJJbnZhbGlkIFhNTDogXCIgKyBkYXRhICk7XG5cdH1cblx0cmV0dXJuIHhtbDtcbn07XG5cblxudmFyXG5cdHJicmFja2V0ID0gL1xcW1xcXSQvLFxuXHRyQ1JMRiA9IC9cXHI/XFxuL2csXG5cdHJzdWJtaXR0ZXJUeXBlcyA9IC9eKD86c3VibWl0fGJ1dHRvbnxpbWFnZXxyZXNldHxmaWxlKSQvaSxcblx0cnN1Ym1pdHRhYmxlID0gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8a2V5Z2VuKS9pO1xuXG5mdW5jdGlvbiBidWlsZFBhcmFtcyggcHJlZml4LCBvYmosIHRyYWRpdGlvbmFsLCBhZGQgKSB7XG5cdHZhciBuYW1lO1xuXG5cdGlmICggQXJyYXkuaXNBcnJheSggb2JqICkgKSB7XG5cblx0XHQvLyBTZXJpYWxpemUgYXJyYXkgaXRlbS5cblx0XHRqUXVlcnkuZWFjaCggb2JqLCBmdW5jdGlvbiggaSwgdiApIHtcblx0XHRcdGlmICggdHJhZGl0aW9uYWwgfHwgcmJyYWNrZXQudGVzdCggcHJlZml4ICkgKSB7XG5cblx0XHRcdFx0Ly8gVHJlYXQgZWFjaCBhcnJheSBpdGVtIGFzIGEgc2NhbGFyLlxuXHRcdFx0XHRhZGQoIHByZWZpeCwgdiApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIEl0ZW0gaXMgbm9uLXNjYWxhciAoYXJyYXkgb3Igb2JqZWN0KSwgZW5jb2RlIGl0cyBudW1lcmljIGluZGV4LlxuXHRcdFx0XHRidWlsZFBhcmFtcyhcblx0XHRcdFx0XHRwcmVmaXggKyBcIltcIiArICggdHlwZW9mIHYgPT09IFwib2JqZWN0XCIgJiYgdiAhPSBudWxsID8gaSA6IFwiXCIgKSArIFwiXVwiLFxuXHRcdFx0XHRcdHYsXG5cdFx0XHRcdFx0dHJhZGl0aW9uYWwsXG5cdFx0XHRcdFx0YWRkXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXG5cdH0gZWxzZSBpZiAoICF0cmFkaXRpb25hbCAmJiBqUXVlcnkudHlwZSggb2JqICkgPT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHQvLyBTZXJpYWxpemUgb2JqZWN0IGl0ZW0uXG5cdFx0Zm9yICggbmFtZSBpbiBvYmogKSB7XG5cdFx0XHRidWlsZFBhcmFtcyggcHJlZml4ICsgXCJbXCIgKyBuYW1lICsgXCJdXCIsIG9ialsgbmFtZSBdLCB0cmFkaXRpb25hbCwgYWRkICk7XG5cdFx0fVxuXG5cdH0gZWxzZSB7XG5cblx0XHQvLyBTZXJpYWxpemUgc2NhbGFyIGl0ZW0uXG5cdFx0YWRkKCBwcmVmaXgsIG9iaiApO1xuXHR9XG59XG5cbi8vIFNlcmlhbGl6ZSBhbiBhcnJheSBvZiBmb3JtIGVsZW1lbnRzIG9yIGEgc2V0IG9mXG4vLyBrZXkvdmFsdWVzIGludG8gYSBxdWVyeSBzdHJpbmdcbmpRdWVyeS5wYXJhbSA9IGZ1bmN0aW9uKCBhLCB0cmFkaXRpb25hbCApIHtcblx0dmFyIHByZWZpeCxcblx0XHRzID0gW10sXG5cdFx0YWRkID0gZnVuY3Rpb24oIGtleSwgdmFsdWVPckZ1bmN0aW9uICkge1xuXG5cdFx0XHQvLyBJZiB2YWx1ZSBpcyBhIGZ1bmN0aW9uLCBpbnZva2UgaXQgYW5kIHVzZSBpdHMgcmV0dXJuIHZhbHVlXG5cdFx0XHR2YXIgdmFsdWUgPSBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWVPckZ1bmN0aW9uICkgP1xuXHRcdFx0XHR2YWx1ZU9yRnVuY3Rpb24oKSA6XG5cdFx0XHRcdHZhbHVlT3JGdW5jdGlvbjtcblxuXHRcdFx0c1sgcy5sZW5ndGggXSA9IGVuY29kZVVSSUNvbXBvbmVudCgga2V5ICkgKyBcIj1cIiArXG5cdFx0XHRcdGVuY29kZVVSSUNvbXBvbmVudCggdmFsdWUgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZSApO1xuXHRcdH07XG5cblx0Ly8gSWYgYW4gYXJyYXkgd2FzIHBhc3NlZCBpbiwgYXNzdW1lIHRoYXQgaXQgaXMgYW4gYXJyYXkgb2YgZm9ybSBlbGVtZW50cy5cblx0aWYgKCBBcnJheS5pc0FycmF5KCBhICkgfHwgKCBhLmpxdWVyeSAmJiAhalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGEgKSApICkge1xuXG5cdFx0Ly8gU2VyaWFsaXplIHRoZSBmb3JtIGVsZW1lbnRzXG5cdFx0alF1ZXJ5LmVhY2goIGEsIGZ1bmN0aW9uKCkge1xuXHRcdFx0YWRkKCB0aGlzLm5hbWUsIHRoaXMudmFsdWUgKTtcblx0XHR9ICk7XG5cblx0fSBlbHNlIHtcblxuXHRcdC8vIElmIHRyYWRpdGlvbmFsLCBlbmNvZGUgdGhlIFwib2xkXCIgd2F5ICh0aGUgd2F5IDEuMy4yIG9yIG9sZGVyXG5cdFx0Ly8gZGlkIGl0KSwgb3RoZXJ3aXNlIGVuY29kZSBwYXJhbXMgcmVjdXJzaXZlbHkuXG5cdFx0Zm9yICggcHJlZml4IGluIGEgKSB7XG5cdFx0XHRidWlsZFBhcmFtcyggcHJlZml4LCBhWyBwcmVmaXggXSwgdHJhZGl0aW9uYWwsIGFkZCApO1xuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgcmVzdWx0aW5nIHNlcmlhbGl6YXRpb25cblx0cmV0dXJuIHMuam9pbiggXCImXCIgKTtcbn07XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0c2VyaWFsaXplOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4galF1ZXJ5LnBhcmFtKCB0aGlzLnNlcmlhbGl6ZUFycmF5KCkgKTtcblx0fSxcblx0c2VyaWFsaXplQXJyYXk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcCggZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIENhbiBhZGQgcHJvcEhvb2sgZm9yIFwiZWxlbWVudHNcIiB0byBmaWx0ZXIgb3IgYWRkIGZvcm0gZWxlbWVudHNcblx0XHRcdHZhciBlbGVtZW50cyA9IGpRdWVyeS5wcm9wKCB0aGlzLCBcImVsZW1lbnRzXCIgKTtcblx0XHRcdHJldHVybiBlbGVtZW50cyA/IGpRdWVyeS5tYWtlQXJyYXkoIGVsZW1lbnRzICkgOiB0aGlzO1xuXHRcdH0gKVxuXHRcdC5maWx0ZXIoIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHR5cGUgPSB0aGlzLnR5cGU7XG5cblx0XHRcdC8vIFVzZSAuaXMoIFwiOmRpc2FibGVkXCIgKSBzbyB0aGF0IGZpZWxkc2V0W2Rpc2FibGVkXSB3b3Jrc1xuXHRcdFx0cmV0dXJuIHRoaXMubmFtZSAmJiAhalF1ZXJ5KCB0aGlzICkuaXMoIFwiOmRpc2FibGVkXCIgKSAmJlxuXHRcdFx0XHRyc3VibWl0dGFibGUudGVzdCggdGhpcy5ub2RlTmFtZSApICYmICFyc3VibWl0dGVyVHlwZXMudGVzdCggdHlwZSApICYmXG5cdFx0XHRcdCggdGhpcy5jaGVja2VkIHx8ICFyY2hlY2thYmxlVHlwZS50ZXN0KCB0eXBlICkgKTtcblx0XHR9IClcblx0XHQubWFwKCBmdW5jdGlvbiggaSwgZWxlbSApIHtcblx0XHRcdHZhciB2YWwgPSBqUXVlcnkoIHRoaXMgKS52YWwoKTtcblxuXHRcdFx0aWYgKCB2YWwgPT0gbnVsbCApIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggQXJyYXkuaXNBcnJheSggdmFsICkgKSB7XG5cdFx0XHRcdHJldHVybiBqUXVlcnkubWFwKCB2YWwsIGZ1bmN0aW9uKCB2YWwgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHsgbmFtZTogZWxlbS5uYW1lLCB2YWx1ZTogdmFsLnJlcGxhY2UoIHJDUkxGLCBcIlxcclxcblwiICkgfTtcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4geyBuYW1lOiBlbGVtLm5hbWUsIHZhbHVlOiB2YWwucmVwbGFjZSggckNSTEYsIFwiXFxyXFxuXCIgKSB9O1xuXHRcdH0gKS5nZXQoKTtcblx0fVxufSApO1xuXG5cbnZhclxuXHRyMjAgPSAvJTIwL2csXG5cdHJoYXNoID0gLyMuKiQvLFxuXHRyYW50aUNhY2hlID0gLyhbPyZdKV89W14mXSovLFxuXHRyaGVhZGVycyA9IC9eKC4qPyk6WyBcXHRdKihbXlxcclxcbl0qKSQvbWcsXG5cblx0Ly8gIzc2NTMsICM4MTI1LCAjODE1MjogbG9jYWwgcHJvdG9jb2wgZGV0ZWN0aW9uXG5cdHJsb2NhbFByb3RvY29sID0gL14oPzphYm91dHxhcHB8YXBwLXN0b3JhZ2V8ListZXh0ZW5zaW9ufGZpbGV8cmVzfHdpZGdldCk6JC8sXG5cdHJub0NvbnRlbnQgPSAvXig/OkdFVHxIRUFEKSQvLFxuXHRycHJvdG9jb2wgPSAvXlxcL1xcLy8sXG5cblx0LyogUHJlZmlsdGVyc1xuXHQgKiAxKSBUaGV5IGFyZSB1c2VmdWwgdG8gaW50cm9kdWNlIGN1c3RvbSBkYXRhVHlwZXMgKHNlZSBhamF4L2pzb25wLmpzIGZvciBhbiBleGFtcGxlKVxuXHQgKiAyKSBUaGVzZSBhcmUgY2FsbGVkOlxuXHQgKiAgICAtIEJFRk9SRSBhc2tpbmcgZm9yIGEgdHJhbnNwb3J0XG5cdCAqICAgIC0gQUZURVIgcGFyYW0gc2VyaWFsaXphdGlvbiAocy5kYXRhIGlzIGEgc3RyaW5nIGlmIHMucHJvY2Vzc0RhdGEgaXMgdHJ1ZSlcblx0ICogMykga2V5IGlzIHRoZSBkYXRhVHlwZVxuXHQgKiA0KSB0aGUgY2F0Y2hhbGwgc3ltYm9sIFwiKlwiIGNhbiBiZSB1c2VkXG5cdCAqIDUpIGV4ZWN1dGlvbiB3aWxsIHN0YXJ0IHdpdGggdHJhbnNwb3J0IGRhdGFUeXBlIGFuZCBUSEVOIGNvbnRpbnVlIGRvd24gdG8gXCIqXCIgaWYgbmVlZGVkXG5cdCAqL1xuXHRwcmVmaWx0ZXJzID0ge30sXG5cblx0LyogVHJhbnNwb3J0cyBiaW5kaW5nc1xuXHQgKiAxKSBrZXkgaXMgdGhlIGRhdGFUeXBlXG5cdCAqIDIpIHRoZSBjYXRjaGFsbCBzeW1ib2wgXCIqXCIgY2FuIGJlIHVzZWRcblx0ICogMykgc2VsZWN0aW9uIHdpbGwgc3RhcnQgd2l0aCB0cmFuc3BvcnQgZGF0YVR5cGUgYW5kIFRIRU4gZ28gdG8gXCIqXCIgaWYgbmVlZGVkXG5cdCAqL1xuXHR0cmFuc3BvcnRzID0ge30sXG5cblx0Ly8gQXZvaWQgY29tbWVudC1wcm9sb2cgY2hhciBzZXF1ZW5jZSAoIzEwMDk4KTsgbXVzdCBhcHBlYXNlIGxpbnQgYW5kIGV2YWRlIGNvbXByZXNzaW9uXG5cdGFsbFR5cGVzID0gXCIqL1wiLmNvbmNhdCggXCIqXCIgKSxcblxuXHQvLyBBbmNob3IgdGFnIGZvciBwYXJzaW5nIHRoZSBkb2N1bWVudCBvcmlnaW5cblx0b3JpZ2luQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJhXCIgKTtcblx0b3JpZ2luQW5jaG9yLmhyZWYgPSBsb2NhdGlvbi5ocmVmO1xuXG4vLyBCYXNlIFwiY29uc3RydWN0b3JcIiBmb3IgalF1ZXJ5LmFqYXhQcmVmaWx0ZXIgYW5kIGpRdWVyeS5hamF4VHJhbnNwb3J0XG5mdW5jdGlvbiBhZGRUb1ByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHN0cnVjdHVyZSApIHtcblxuXHQvLyBkYXRhVHlwZUV4cHJlc3Npb24gaXMgb3B0aW9uYWwgYW5kIGRlZmF1bHRzIHRvIFwiKlwiXG5cdHJldHVybiBmdW5jdGlvbiggZGF0YVR5cGVFeHByZXNzaW9uLCBmdW5jICkge1xuXG5cdFx0aWYgKCB0eXBlb2YgZGF0YVR5cGVFeHByZXNzaW9uICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0ZnVuYyA9IGRhdGFUeXBlRXhwcmVzc2lvbjtcblx0XHRcdGRhdGFUeXBlRXhwcmVzc2lvbiA9IFwiKlwiO1xuXHRcdH1cblxuXHRcdHZhciBkYXRhVHlwZSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0ZGF0YVR5cGVzID0gZGF0YVR5cGVFeHByZXNzaW9uLnRvTG93ZXJDYXNlKCkubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbXTtcblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGZ1bmMgKSApIHtcblxuXHRcdFx0Ly8gRm9yIGVhY2ggZGF0YVR5cGUgaW4gdGhlIGRhdGFUeXBlRXhwcmVzc2lvblxuXHRcdFx0d2hpbGUgKCAoIGRhdGFUeXBlID0gZGF0YVR5cGVzWyBpKysgXSApICkge1xuXG5cdFx0XHRcdC8vIFByZXBlbmQgaWYgcmVxdWVzdGVkXG5cdFx0XHRcdGlmICggZGF0YVR5cGVbIDAgXSA9PT0gXCIrXCIgKSB7XG5cdFx0XHRcdFx0ZGF0YVR5cGUgPSBkYXRhVHlwZS5zbGljZSggMSApIHx8IFwiKlwiO1xuXHRcdFx0XHRcdCggc3RydWN0dXJlWyBkYXRhVHlwZSBdID0gc3RydWN0dXJlWyBkYXRhVHlwZSBdIHx8IFtdICkudW5zaGlmdCggZnVuYyApO1xuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSBhcHBlbmRcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQoIHN0cnVjdHVyZVsgZGF0YVR5cGUgXSA9IHN0cnVjdHVyZVsgZGF0YVR5cGUgXSB8fCBbXSApLnB1c2goIGZ1bmMgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cblxuLy8gQmFzZSBpbnNwZWN0aW9uIGZ1bmN0aW9uIGZvciBwcmVmaWx0ZXJzIGFuZCB0cmFuc3BvcnRzXG5mdW5jdGlvbiBpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggc3RydWN0dXJlLCBvcHRpb25zLCBvcmlnaW5hbE9wdGlvbnMsIGpxWEhSICkge1xuXG5cdHZhciBpbnNwZWN0ZWQgPSB7fSxcblx0XHRzZWVraW5nVHJhbnNwb3J0ID0gKCBzdHJ1Y3R1cmUgPT09IHRyYW5zcG9ydHMgKTtcblxuXHRmdW5jdGlvbiBpbnNwZWN0KCBkYXRhVHlwZSApIHtcblx0XHR2YXIgc2VsZWN0ZWQ7XG5cdFx0aW5zcGVjdGVkWyBkYXRhVHlwZSBdID0gdHJ1ZTtcblx0XHRqUXVlcnkuZWFjaCggc3RydWN0dXJlWyBkYXRhVHlwZSBdIHx8IFtdLCBmdW5jdGlvbiggXywgcHJlZmlsdGVyT3JGYWN0b3J5ICkge1xuXHRcdFx0dmFyIGRhdGFUeXBlT3JUcmFuc3BvcnQgPSBwcmVmaWx0ZXJPckZhY3RvcnkoIG9wdGlvbnMsIG9yaWdpbmFsT3B0aW9ucywganFYSFIgKTtcblx0XHRcdGlmICggdHlwZW9mIGRhdGFUeXBlT3JUcmFuc3BvcnQgPT09IFwic3RyaW5nXCIgJiZcblx0XHRcdFx0IXNlZWtpbmdUcmFuc3BvcnQgJiYgIWluc3BlY3RlZFsgZGF0YVR5cGVPclRyYW5zcG9ydCBdICkge1xuXG5cdFx0XHRcdG9wdGlvbnMuZGF0YVR5cGVzLnVuc2hpZnQoIGRhdGFUeXBlT3JUcmFuc3BvcnQgKTtcblx0XHRcdFx0aW5zcGVjdCggZGF0YVR5cGVPclRyYW5zcG9ydCApO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9IGVsc2UgaWYgKCBzZWVraW5nVHJhbnNwb3J0ICkge1xuXHRcdFx0XHRyZXR1cm4gISggc2VsZWN0ZWQgPSBkYXRhVHlwZU9yVHJhbnNwb3J0ICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHRcdHJldHVybiBzZWxlY3RlZDtcblx0fVxuXG5cdHJldHVybiBpbnNwZWN0KCBvcHRpb25zLmRhdGFUeXBlc1sgMCBdICkgfHwgIWluc3BlY3RlZFsgXCIqXCIgXSAmJiBpbnNwZWN0KCBcIipcIiApO1xufVxuXG4vLyBBIHNwZWNpYWwgZXh0ZW5kIGZvciBhamF4IG9wdGlvbnNcbi8vIHRoYXQgdGFrZXMgXCJmbGF0XCIgb3B0aW9ucyAobm90IHRvIGJlIGRlZXAgZXh0ZW5kZWQpXG4vLyBGaXhlcyAjOTg4N1xuZnVuY3Rpb24gYWpheEV4dGVuZCggdGFyZ2V0LCBzcmMgKSB7XG5cdHZhciBrZXksIGRlZXAsXG5cdFx0ZmxhdE9wdGlvbnMgPSBqUXVlcnkuYWpheFNldHRpbmdzLmZsYXRPcHRpb25zIHx8IHt9O1xuXG5cdGZvciAoIGtleSBpbiBzcmMgKSB7XG5cdFx0aWYgKCBzcmNbIGtleSBdICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHQoIGZsYXRPcHRpb25zWyBrZXkgXSA/IHRhcmdldCA6ICggZGVlcCB8fCAoIGRlZXAgPSB7fSApICkgKVsga2V5IF0gPSBzcmNbIGtleSBdO1xuXHRcdH1cblx0fVxuXHRpZiAoIGRlZXAgKSB7XG5cdFx0alF1ZXJ5LmV4dGVuZCggdHJ1ZSwgdGFyZ2V0LCBkZWVwICk7XG5cdH1cblxuXHRyZXR1cm4gdGFyZ2V0O1xufVxuXG4vKiBIYW5kbGVzIHJlc3BvbnNlcyB0byBhbiBhamF4IHJlcXVlc3Q6XG4gKiAtIGZpbmRzIHRoZSByaWdodCBkYXRhVHlwZSAobWVkaWF0ZXMgYmV0d2VlbiBjb250ZW50LXR5cGUgYW5kIGV4cGVjdGVkIGRhdGFUeXBlKVxuICogLSByZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIHJlc3BvbnNlXG4gKi9cbmZ1bmN0aW9uIGFqYXhIYW5kbGVSZXNwb25zZXMoIHMsIGpxWEhSLCByZXNwb25zZXMgKSB7XG5cblx0dmFyIGN0LCB0eXBlLCBmaW5hbERhdGFUeXBlLCBmaXJzdERhdGFUeXBlLFxuXHRcdGNvbnRlbnRzID0gcy5jb250ZW50cyxcblx0XHRkYXRhVHlwZXMgPSBzLmRhdGFUeXBlcztcblxuXHQvLyBSZW1vdmUgYXV0byBkYXRhVHlwZSBhbmQgZ2V0IGNvbnRlbnQtdHlwZSBpbiB0aGUgcHJvY2Vzc1xuXHR3aGlsZSAoIGRhdGFUeXBlc1sgMCBdID09PSBcIipcIiApIHtcblx0XHRkYXRhVHlwZXMuc2hpZnQoKTtcblx0XHRpZiAoIGN0ID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRjdCA9IHMubWltZVR5cGUgfHwganFYSFIuZ2V0UmVzcG9uc2VIZWFkZXIoIFwiQ29udGVudC1UeXBlXCIgKTtcblx0XHR9XG5cdH1cblxuXHQvLyBDaGVjayBpZiB3ZSdyZSBkZWFsaW5nIHdpdGggYSBrbm93biBjb250ZW50LXR5cGVcblx0aWYgKCBjdCApIHtcblx0XHRmb3IgKCB0eXBlIGluIGNvbnRlbnRzICkge1xuXHRcdFx0aWYgKCBjb250ZW50c1sgdHlwZSBdICYmIGNvbnRlbnRzWyB0eXBlIF0udGVzdCggY3QgKSApIHtcblx0XHRcdFx0ZGF0YVR5cGVzLnVuc2hpZnQoIHR5cGUgKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgYSByZXNwb25zZSBmb3IgdGhlIGV4cGVjdGVkIGRhdGFUeXBlXG5cdGlmICggZGF0YVR5cGVzWyAwIF0gaW4gcmVzcG9uc2VzICkge1xuXHRcdGZpbmFsRGF0YVR5cGUgPSBkYXRhVHlwZXNbIDAgXTtcblx0fSBlbHNlIHtcblxuXHRcdC8vIFRyeSBjb252ZXJ0aWJsZSBkYXRhVHlwZXNcblx0XHRmb3IgKCB0eXBlIGluIHJlc3BvbnNlcyApIHtcblx0XHRcdGlmICggIWRhdGFUeXBlc1sgMCBdIHx8IHMuY29udmVydGVyc1sgdHlwZSArIFwiIFwiICsgZGF0YVR5cGVzWyAwIF0gXSApIHtcblx0XHRcdFx0ZmluYWxEYXRhVHlwZSA9IHR5cGU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCAhZmlyc3REYXRhVHlwZSApIHtcblx0XHRcdFx0Zmlyc3REYXRhVHlwZSA9IHR5cGU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gT3IganVzdCB1c2UgZmlyc3Qgb25lXG5cdFx0ZmluYWxEYXRhVHlwZSA9IGZpbmFsRGF0YVR5cGUgfHwgZmlyc3REYXRhVHlwZTtcblx0fVxuXG5cdC8vIElmIHdlIGZvdW5kIGEgZGF0YVR5cGVcblx0Ly8gV2UgYWRkIHRoZSBkYXRhVHlwZSB0byB0aGUgbGlzdCBpZiBuZWVkZWRcblx0Ly8gYW5kIHJldHVybiB0aGUgY29ycmVzcG9uZGluZyByZXNwb25zZVxuXHRpZiAoIGZpbmFsRGF0YVR5cGUgKSB7XG5cdFx0aWYgKCBmaW5hbERhdGFUeXBlICE9PSBkYXRhVHlwZXNbIDAgXSApIHtcblx0XHRcdGRhdGFUeXBlcy51bnNoaWZ0KCBmaW5hbERhdGFUeXBlICk7XG5cdFx0fVxuXHRcdHJldHVybiByZXNwb25zZXNbIGZpbmFsRGF0YVR5cGUgXTtcblx0fVxufVxuXG4vKiBDaGFpbiBjb252ZXJzaW9ucyBnaXZlbiB0aGUgcmVxdWVzdCBhbmQgdGhlIG9yaWdpbmFsIHJlc3BvbnNlXG4gKiBBbHNvIHNldHMgdGhlIHJlc3BvbnNlWFhYIGZpZWxkcyBvbiB0aGUganFYSFIgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gYWpheENvbnZlcnQoIHMsIHJlc3BvbnNlLCBqcVhIUiwgaXNTdWNjZXNzICkge1xuXHR2YXIgY29udjIsIGN1cnJlbnQsIGNvbnYsIHRtcCwgcHJldixcblx0XHRjb252ZXJ0ZXJzID0ge30sXG5cblx0XHQvLyBXb3JrIHdpdGggYSBjb3B5IG9mIGRhdGFUeXBlcyBpbiBjYXNlIHdlIG5lZWQgdG8gbW9kaWZ5IGl0IGZvciBjb252ZXJzaW9uXG5cdFx0ZGF0YVR5cGVzID0gcy5kYXRhVHlwZXMuc2xpY2UoKTtcblxuXHQvLyBDcmVhdGUgY29udmVydGVycyBtYXAgd2l0aCBsb3dlcmNhc2VkIGtleXNcblx0aWYgKCBkYXRhVHlwZXNbIDEgXSApIHtcblx0XHRmb3IgKCBjb252IGluIHMuY29udmVydGVycyApIHtcblx0XHRcdGNvbnZlcnRlcnNbIGNvbnYudG9Mb3dlckNhc2UoKSBdID0gcy5jb252ZXJ0ZXJzWyBjb252IF07XG5cdFx0fVxuXHR9XG5cblx0Y3VycmVudCA9IGRhdGFUeXBlcy5zaGlmdCgpO1xuXG5cdC8vIENvbnZlcnQgdG8gZWFjaCBzZXF1ZW50aWFsIGRhdGFUeXBlXG5cdHdoaWxlICggY3VycmVudCApIHtcblxuXHRcdGlmICggcy5yZXNwb25zZUZpZWxkc1sgY3VycmVudCBdICkge1xuXHRcdFx0anFYSFJbIHMucmVzcG9uc2VGaWVsZHNbIGN1cnJlbnQgXSBdID0gcmVzcG9uc2U7XG5cdFx0fVxuXG5cdFx0Ly8gQXBwbHkgdGhlIGRhdGFGaWx0ZXIgaWYgcHJvdmlkZWRcblx0XHRpZiAoICFwcmV2ICYmIGlzU3VjY2VzcyAmJiBzLmRhdGFGaWx0ZXIgKSB7XG5cdFx0XHRyZXNwb25zZSA9IHMuZGF0YUZpbHRlciggcmVzcG9uc2UsIHMuZGF0YVR5cGUgKTtcblx0XHR9XG5cblx0XHRwcmV2ID0gY3VycmVudDtcblx0XHRjdXJyZW50ID0gZGF0YVR5cGVzLnNoaWZ0KCk7XG5cblx0XHRpZiAoIGN1cnJlbnQgKSB7XG5cblx0XHRcdC8vIFRoZXJlJ3Mgb25seSB3b3JrIHRvIGRvIGlmIGN1cnJlbnQgZGF0YVR5cGUgaXMgbm9uLWF1dG9cblx0XHRcdGlmICggY3VycmVudCA9PT0gXCIqXCIgKSB7XG5cblx0XHRcdFx0Y3VycmVudCA9IHByZXY7XG5cblx0XHRcdC8vIENvbnZlcnQgcmVzcG9uc2UgaWYgcHJldiBkYXRhVHlwZSBpcyBub24tYXV0byBhbmQgZGlmZmVycyBmcm9tIGN1cnJlbnRcblx0XHRcdH0gZWxzZSBpZiAoIHByZXYgIT09IFwiKlwiICYmIHByZXYgIT09IGN1cnJlbnQgKSB7XG5cblx0XHRcdFx0Ly8gU2VlayBhIGRpcmVjdCBjb252ZXJ0ZXJcblx0XHRcdFx0Y29udiA9IGNvbnZlcnRlcnNbIHByZXYgKyBcIiBcIiArIGN1cnJlbnQgXSB8fCBjb252ZXJ0ZXJzWyBcIiogXCIgKyBjdXJyZW50IF07XG5cblx0XHRcdFx0Ly8gSWYgbm9uZSBmb3VuZCwgc2VlayBhIHBhaXJcblx0XHRcdFx0aWYgKCAhY29udiApIHtcblx0XHRcdFx0XHRmb3IgKCBjb252MiBpbiBjb252ZXJ0ZXJzICkge1xuXG5cdFx0XHRcdFx0XHQvLyBJZiBjb252MiBvdXRwdXRzIGN1cnJlbnRcblx0XHRcdFx0XHRcdHRtcCA9IGNvbnYyLnNwbGl0KCBcIiBcIiApO1xuXHRcdFx0XHRcdFx0aWYgKCB0bXBbIDEgXSA9PT0gY3VycmVudCApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBJZiBwcmV2IGNhbiBiZSBjb252ZXJ0ZWQgdG8gYWNjZXB0ZWQgaW5wdXRcblx0XHRcdFx0XHRcdFx0Y29udiA9IGNvbnZlcnRlcnNbIHByZXYgKyBcIiBcIiArIHRtcFsgMCBdIF0gfHxcblx0XHRcdFx0XHRcdFx0XHRjb252ZXJ0ZXJzWyBcIiogXCIgKyB0bXBbIDAgXSBdO1xuXHRcdFx0XHRcdFx0XHRpZiAoIGNvbnYgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBDb25kZW5zZSBlcXVpdmFsZW5jZSBjb252ZXJ0ZXJzXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBjb252ID09PSB0cnVlICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29udiA9IGNvbnZlcnRlcnNbIGNvbnYyIF07XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBPdGhlcndpc2UsIGluc2VydCB0aGUgaW50ZXJtZWRpYXRlIGRhdGFUeXBlXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICggY29udmVydGVyc1sgY29udjIgXSAhPT0gdHJ1ZSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGN1cnJlbnQgPSB0bXBbIDAgXTtcblx0XHRcdFx0XHRcdFx0XHRcdGRhdGFUeXBlcy51bnNoaWZ0KCB0bXBbIDEgXSApO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFwcGx5IGNvbnZlcnRlciAoaWYgbm90IGFuIGVxdWl2YWxlbmNlKVxuXHRcdFx0XHRpZiAoIGNvbnYgIT09IHRydWUgKSB7XG5cblx0XHRcdFx0XHQvLyBVbmxlc3MgZXJyb3JzIGFyZSBhbGxvd2VkIHRvIGJ1YmJsZSwgY2F0Y2ggYW5kIHJldHVybiB0aGVtXG5cdFx0XHRcdFx0aWYgKCBjb252ICYmIHMudGhyb3dzICkge1xuXHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBjb252KCByZXNwb25zZSApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IGNvbnYoIHJlc3BvbnNlICk7XG5cdFx0XHRcdFx0XHR9IGNhdGNoICggZSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0XHRzdGF0ZTogXCJwYXJzZXJlcnJvclwiLFxuXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBjb252ID8gZSA6IFwiTm8gY29udmVyc2lvbiBmcm9tIFwiICsgcHJldiArIFwiIHRvIFwiICsgY3VycmVudFxuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7IHN0YXRlOiBcInN1Y2Nlc3NcIiwgZGF0YTogcmVzcG9uc2UgfTtcbn1cblxualF1ZXJ5LmV4dGVuZCgge1xuXG5cdC8vIENvdW50ZXIgZm9yIGhvbGRpbmcgdGhlIG51bWJlciBvZiBhY3RpdmUgcXVlcmllc1xuXHRhY3RpdmU6IDAsXG5cblx0Ly8gTGFzdC1Nb2RpZmllZCBoZWFkZXIgY2FjaGUgZm9yIG5leHQgcmVxdWVzdFxuXHRsYXN0TW9kaWZpZWQ6IHt9LFxuXHRldGFnOiB7fSxcblxuXHRhamF4U2V0dGluZ3M6IHtcblx0XHR1cmw6IGxvY2F0aW9uLmhyZWYsXG5cdFx0dHlwZTogXCJHRVRcIixcblx0XHRpc0xvY2FsOiBybG9jYWxQcm90b2NvbC50ZXN0KCBsb2NhdGlvbi5wcm90b2NvbCApLFxuXHRcdGdsb2JhbDogdHJ1ZSxcblx0XHRwcm9jZXNzRGF0YTogdHJ1ZSxcblx0XHRhc3luYzogdHJ1ZSxcblx0XHRjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLThcIixcblxuXHRcdC8qXG5cdFx0dGltZW91dDogMCxcblx0XHRkYXRhOiBudWxsLFxuXHRcdGRhdGFUeXBlOiBudWxsLFxuXHRcdHVzZXJuYW1lOiBudWxsLFxuXHRcdHBhc3N3b3JkOiBudWxsLFxuXHRcdGNhY2hlOiBudWxsLFxuXHRcdHRocm93czogZmFsc2UsXG5cdFx0dHJhZGl0aW9uYWw6IGZhbHNlLFxuXHRcdGhlYWRlcnM6IHt9LFxuXHRcdCovXG5cblx0XHRhY2NlcHRzOiB7XG5cdFx0XHRcIipcIjogYWxsVHlwZXMsXG5cdFx0XHR0ZXh0OiBcInRleHQvcGxhaW5cIixcblx0XHRcdGh0bWw6IFwidGV4dC9odG1sXCIsXG5cdFx0XHR4bWw6IFwiYXBwbGljYXRpb24veG1sLCB0ZXh0L3htbFwiLFxuXHRcdFx0anNvbjogXCJhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L2phdmFzY3JpcHRcIlxuXHRcdH0sXG5cblx0XHRjb250ZW50czoge1xuXHRcdFx0eG1sOiAvXFxieG1sXFxiLyxcblx0XHRcdGh0bWw6IC9cXGJodG1sLyxcblx0XHRcdGpzb246IC9cXGJqc29uXFxiL1xuXHRcdH0sXG5cblx0XHRyZXNwb25zZUZpZWxkczoge1xuXHRcdFx0eG1sOiBcInJlc3BvbnNlWE1MXCIsXG5cdFx0XHR0ZXh0OiBcInJlc3BvbnNlVGV4dFwiLFxuXHRcdFx0anNvbjogXCJyZXNwb25zZUpTT05cIlxuXHRcdH0sXG5cblx0XHQvLyBEYXRhIGNvbnZlcnRlcnNcblx0XHQvLyBLZXlzIHNlcGFyYXRlIHNvdXJjZSAob3IgY2F0Y2hhbGwgXCIqXCIpIGFuZCBkZXN0aW5hdGlvbiB0eXBlcyB3aXRoIGEgc2luZ2xlIHNwYWNlXG5cdFx0Y29udmVydGVyczoge1xuXG5cdFx0XHQvLyBDb252ZXJ0IGFueXRoaW5nIHRvIHRleHRcblx0XHRcdFwiKiB0ZXh0XCI6IFN0cmluZyxcblxuXHRcdFx0Ly8gVGV4dCB0byBodG1sICh0cnVlID0gbm8gdHJhbnNmb3JtYXRpb24pXG5cdFx0XHRcInRleHQgaHRtbFwiOiB0cnVlLFxuXG5cdFx0XHQvLyBFdmFsdWF0ZSB0ZXh0IGFzIGEganNvbiBleHByZXNzaW9uXG5cdFx0XHRcInRleHQganNvblwiOiBKU09OLnBhcnNlLFxuXG5cdFx0XHQvLyBQYXJzZSB0ZXh0IGFzIHhtbFxuXHRcdFx0XCJ0ZXh0IHhtbFwiOiBqUXVlcnkucGFyc2VYTUxcblx0XHR9LFxuXG5cdFx0Ly8gRm9yIG9wdGlvbnMgdGhhdCBzaG91bGRuJ3QgYmUgZGVlcCBleHRlbmRlZDpcblx0XHQvLyB5b3UgY2FuIGFkZCB5b3VyIG93biBjdXN0b20gb3B0aW9ucyBoZXJlIGlmXG5cdFx0Ly8gYW5kIHdoZW4geW91IGNyZWF0ZSBvbmUgdGhhdCBzaG91bGRuJ3QgYmVcblx0XHQvLyBkZWVwIGV4dGVuZGVkIChzZWUgYWpheEV4dGVuZClcblx0XHRmbGF0T3B0aW9uczoge1xuXHRcdFx0dXJsOiB0cnVlLFxuXHRcdFx0Y29udGV4dDogdHJ1ZVxuXHRcdH1cblx0fSxcblxuXHQvLyBDcmVhdGVzIGEgZnVsbCBmbGVkZ2VkIHNldHRpbmdzIG9iamVjdCBpbnRvIHRhcmdldFxuXHQvLyB3aXRoIGJvdGggYWpheFNldHRpbmdzIGFuZCBzZXR0aW5ncyBmaWVsZHMuXG5cdC8vIElmIHRhcmdldCBpcyBvbWl0dGVkLCB3cml0ZXMgaW50byBhamF4U2V0dGluZ3MuXG5cdGFqYXhTZXR1cDogZnVuY3Rpb24oIHRhcmdldCwgc2V0dGluZ3MgKSB7XG5cdFx0cmV0dXJuIHNldHRpbmdzID9cblxuXHRcdFx0Ly8gQnVpbGRpbmcgYSBzZXR0aW5ncyBvYmplY3Rcblx0XHRcdGFqYXhFeHRlbmQoIGFqYXhFeHRlbmQoIHRhcmdldCwgalF1ZXJ5LmFqYXhTZXR0aW5ncyApLCBzZXR0aW5ncyApIDpcblxuXHRcdFx0Ly8gRXh0ZW5kaW5nIGFqYXhTZXR0aW5nc1xuXHRcdFx0YWpheEV4dGVuZCggalF1ZXJ5LmFqYXhTZXR0aW5ncywgdGFyZ2V0ICk7XG5cdH0sXG5cblx0YWpheFByZWZpbHRlcjogYWRkVG9QcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCBwcmVmaWx0ZXJzICksXG5cdGFqYXhUcmFuc3BvcnQ6IGFkZFRvUHJlZmlsdGVyc09yVHJhbnNwb3J0cyggdHJhbnNwb3J0cyApLFxuXG5cdC8vIE1haW4gbWV0aG9kXG5cdGFqYXg6IGZ1bmN0aW9uKCB1cmwsIG9wdGlvbnMgKSB7XG5cblx0XHQvLyBJZiB1cmwgaXMgYW4gb2JqZWN0LCBzaW11bGF0ZSBwcmUtMS41IHNpZ25hdHVyZVxuXHRcdGlmICggdHlwZW9mIHVybCA9PT0gXCJvYmplY3RcIiApIHtcblx0XHRcdG9wdGlvbnMgPSB1cmw7XG5cdFx0XHR1cmwgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0Ly8gRm9yY2Ugb3B0aW9ucyB0byBiZSBhbiBvYmplY3Rcblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRcdHZhciB0cmFuc3BvcnQsXG5cblx0XHRcdC8vIFVSTCB3aXRob3V0IGFudGktY2FjaGUgcGFyYW1cblx0XHRcdGNhY2hlVVJMLFxuXG5cdFx0XHQvLyBSZXNwb25zZSBoZWFkZXJzXG5cdFx0XHRyZXNwb25zZUhlYWRlcnNTdHJpbmcsXG5cdFx0XHRyZXNwb25zZUhlYWRlcnMsXG5cblx0XHRcdC8vIHRpbWVvdXQgaGFuZGxlXG5cdFx0XHR0aW1lb3V0VGltZXIsXG5cblx0XHRcdC8vIFVybCBjbGVhbnVwIHZhclxuXHRcdFx0dXJsQW5jaG9yLFxuXG5cdFx0XHQvLyBSZXF1ZXN0IHN0YXRlIChiZWNvbWVzIGZhbHNlIHVwb24gc2VuZCBhbmQgdHJ1ZSB1cG9uIGNvbXBsZXRpb24pXG5cdFx0XHRjb21wbGV0ZWQsXG5cblx0XHRcdC8vIFRvIGtub3cgaWYgZ2xvYmFsIGV2ZW50cyBhcmUgdG8gYmUgZGlzcGF0Y2hlZFxuXHRcdFx0ZmlyZUdsb2JhbHMsXG5cblx0XHRcdC8vIExvb3AgdmFyaWFibGVcblx0XHRcdGksXG5cblx0XHRcdC8vIHVuY2FjaGVkIHBhcnQgb2YgdGhlIHVybFxuXHRcdFx0dW5jYWNoZWQsXG5cblx0XHRcdC8vIENyZWF0ZSB0aGUgZmluYWwgb3B0aW9ucyBvYmplY3Rcblx0XHRcdHMgPSBqUXVlcnkuYWpheFNldHVwKCB7fSwgb3B0aW9ucyApLFxuXG5cdFx0XHQvLyBDYWxsYmFja3MgY29udGV4dFxuXHRcdFx0Y2FsbGJhY2tDb250ZXh0ID0gcy5jb250ZXh0IHx8IHMsXG5cblx0XHRcdC8vIENvbnRleHQgZm9yIGdsb2JhbCBldmVudHMgaXMgY2FsbGJhY2tDb250ZXh0IGlmIGl0IGlzIGEgRE9NIG5vZGUgb3IgalF1ZXJ5IGNvbGxlY3Rpb25cblx0XHRcdGdsb2JhbEV2ZW50Q29udGV4dCA9IHMuY29udGV4dCAmJlxuXHRcdFx0XHQoIGNhbGxiYWNrQ29udGV4dC5ub2RlVHlwZSB8fCBjYWxsYmFja0NvbnRleHQuanF1ZXJ5ICkgP1xuXHRcdFx0XHRcdGpRdWVyeSggY2FsbGJhY2tDb250ZXh0ICkgOlxuXHRcdFx0XHRcdGpRdWVyeS5ldmVudCxcblxuXHRcdFx0Ly8gRGVmZXJyZWRzXG5cdFx0XHRkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuXHRcdFx0Y29tcGxldGVEZWZlcnJlZCA9IGpRdWVyeS5DYWxsYmFja3MoIFwib25jZSBtZW1vcnlcIiApLFxuXG5cdFx0XHQvLyBTdGF0dXMtZGVwZW5kZW50IGNhbGxiYWNrc1xuXHRcdFx0c3RhdHVzQ29kZSA9IHMuc3RhdHVzQ29kZSB8fCB7fSxcblxuXHRcdFx0Ly8gSGVhZGVycyAodGhleSBhcmUgc2VudCBhbGwgYXQgb25jZSlcblx0XHRcdHJlcXVlc3RIZWFkZXJzID0ge30sXG5cdFx0XHRyZXF1ZXN0SGVhZGVyc05hbWVzID0ge30sXG5cblx0XHRcdC8vIERlZmF1bHQgYWJvcnQgbWVzc2FnZVxuXHRcdFx0c3RyQWJvcnQgPSBcImNhbmNlbGVkXCIsXG5cblx0XHRcdC8vIEZha2UgeGhyXG5cdFx0XHRqcVhIUiA9IHtcblx0XHRcdFx0cmVhZHlTdGF0ZTogMCxcblxuXHRcdFx0XHQvLyBCdWlsZHMgaGVhZGVycyBoYXNodGFibGUgaWYgbmVlZGVkXG5cdFx0XHRcdGdldFJlc3BvbnNlSGVhZGVyOiBmdW5jdGlvbigga2V5ICkge1xuXHRcdFx0XHRcdHZhciBtYXRjaDtcblx0XHRcdFx0XHRpZiAoIGNvbXBsZXRlZCApIHtcblx0XHRcdFx0XHRcdGlmICggIXJlc3BvbnNlSGVhZGVycyApIHtcblx0XHRcdFx0XHRcdFx0cmVzcG9uc2VIZWFkZXJzID0ge307XG5cdFx0XHRcdFx0XHRcdHdoaWxlICggKCBtYXRjaCA9IHJoZWFkZXJzLmV4ZWMoIHJlc3BvbnNlSGVhZGVyc1N0cmluZyApICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2VIZWFkZXJzWyBtYXRjaFsgMSBdLnRvTG93ZXJDYXNlKCkgXSA9IG1hdGNoWyAyIF07XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdG1hdGNoID0gcmVzcG9uc2VIZWFkZXJzWyBrZXkudG9Mb3dlckNhc2UoKSBdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gbWF0Y2ggPT0gbnVsbCA/IG51bGwgOiBtYXRjaDtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBSYXcgc3RyaW5nXG5cdFx0XHRcdGdldEFsbFJlc3BvbnNlSGVhZGVyczogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGNvbXBsZXRlZCA/IHJlc3BvbnNlSGVhZGVyc1N0cmluZyA6IG51bGw7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gQ2FjaGVzIHRoZSBoZWFkZXJcblx0XHRcdFx0c2V0UmVxdWVzdEhlYWRlcjogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuXHRcdFx0XHRcdGlmICggY29tcGxldGVkID09IG51bGwgKSB7XG5cdFx0XHRcdFx0XHRuYW1lID0gcmVxdWVzdEhlYWRlcnNOYW1lc1sgbmFtZS50b0xvd2VyQ2FzZSgpIF0gPVxuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0SGVhZGVyc05hbWVzWyBuYW1lLnRvTG93ZXJDYXNlKCkgXSB8fCBuYW1lO1xuXHRcdFx0XHRcdFx0cmVxdWVzdEhlYWRlcnNbIG5hbWUgXSA9IHZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBPdmVycmlkZXMgcmVzcG9uc2UgY29udGVudC10eXBlIGhlYWRlclxuXHRcdFx0XHRvdmVycmlkZU1pbWVUeXBlOiBmdW5jdGlvbiggdHlwZSApIHtcblx0XHRcdFx0XHRpZiAoIGNvbXBsZXRlZCA9PSBudWxsICkge1xuXHRcdFx0XHRcdFx0cy5taW1lVHlwZSA9IHR5cGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIFN0YXR1cy1kZXBlbmRlbnQgY2FsbGJhY2tzXG5cdFx0XHRcdHN0YXR1c0NvZGU6IGZ1bmN0aW9uKCBtYXAgKSB7XG5cdFx0XHRcdFx0dmFyIGNvZGU7XG5cdFx0XHRcdFx0aWYgKCBtYXAgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIGNvbXBsZXRlZCApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBFeGVjdXRlIHRoZSBhcHByb3ByaWF0ZSBjYWxsYmFja3Ncblx0XHRcdFx0XHRcdFx0anFYSFIuYWx3YXlzKCBtYXBbIGpxWEhSLnN0YXR1cyBdICk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRcdC8vIExhenktYWRkIHRoZSBuZXcgY2FsbGJhY2tzIGluIGEgd2F5IHRoYXQgcHJlc2VydmVzIG9sZCBvbmVzXG5cdFx0XHRcdFx0XHRcdGZvciAoIGNvZGUgaW4gbWFwICkge1xuXHRcdFx0XHRcdFx0XHRcdHN0YXR1c0NvZGVbIGNvZGUgXSA9IFsgc3RhdHVzQ29kZVsgY29kZSBdLCBtYXBbIGNvZGUgXSBdO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIENhbmNlbCB0aGUgcmVxdWVzdFxuXHRcdFx0XHRhYm9ydDogZnVuY3Rpb24oIHN0YXR1c1RleHQgKSB7XG5cdFx0XHRcdFx0dmFyIGZpbmFsVGV4dCA9IHN0YXR1c1RleHQgfHwgc3RyQWJvcnQ7XG5cdFx0XHRcdFx0aWYgKCB0cmFuc3BvcnQgKSB7XG5cdFx0XHRcdFx0XHR0cmFuc3BvcnQuYWJvcnQoIGZpbmFsVGV4dCApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkb25lKCAwLCBmaW5hbFRleHQgKTtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdC8vIEF0dGFjaCBkZWZlcnJlZHNcblx0XHRkZWZlcnJlZC5wcm9taXNlKCBqcVhIUiApO1xuXG5cdFx0Ly8gQWRkIHByb3RvY29sIGlmIG5vdCBwcm92aWRlZCAocHJlZmlsdGVycyBtaWdodCBleHBlY3QgaXQpXG5cdFx0Ly8gSGFuZGxlIGZhbHN5IHVybCBpbiB0aGUgc2V0dGluZ3Mgb2JqZWN0ICgjMTAwOTM6IGNvbnNpc3RlbmN5IHdpdGggb2xkIHNpZ25hdHVyZSlcblx0XHQvLyBXZSBhbHNvIHVzZSB0aGUgdXJsIHBhcmFtZXRlciBpZiBhdmFpbGFibGVcblx0XHRzLnVybCA9ICggKCB1cmwgfHwgcy51cmwgfHwgbG9jYXRpb24uaHJlZiApICsgXCJcIiApXG5cdFx0XHQucmVwbGFjZSggcnByb3RvY29sLCBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiApO1xuXG5cdFx0Ly8gQWxpYXMgbWV0aG9kIG9wdGlvbiB0byB0eXBlIGFzIHBlciB0aWNrZXQgIzEyMDA0XG5cdFx0cy50eXBlID0gb3B0aW9ucy5tZXRob2QgfHwgb3B0aW9ucy50eXBlIHx8IHMubWV0aG9kIHx8IHMudHlwZTtcblxuXHRcdC8vIEV4dHJhY3QgZGF0YVR5cGVzIGxpc3Rcblx0XHRzLmRhdGFUeXBlcyA9ICggcy5kYXRhVHlwZSB8fCBcIipcIiApLnRvTG93ZXJDYXNlKCkubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbIFwiXCIgXTtcblxuXHRcdC8vIEEgY3Jvc3MtZG9tYWluIHJlcXVlc3QgaXMgaW4gb3JkZXIgd2hlbiB0aGUgb3JpZ2luIGRvZXNuJ3QgbWF0Y2ggdGhlIGN1cnJlbnQgb3JpZ2luLlxuXHRcdGlmICggcy5jcm9zc0RvbWFpbiA9PSBudWxsICkge1xuXHRcdFx0dXJsQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJhXCIgKTtcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUUgPD04IC0gMTEsIEVkZ2UgMTIgLSAxM1xuXHRcdFx0Ly8gSUUgdGhyb3dzIGV4Y2VwdGlvbiBvbiBhY2Nlc3NpbmcgdGhlIGhyZWYgcHJvcGVydHkgaWYgdXJsIGlzIG1hbGZvcm1lZCxcblx0XHRcdC8vIGUuZy4gaHR0cDovL2V4YW1wbGUuY29tOjgweC9cblx0XHRcdHRyeSB7XG5cdFx0XHRcdHVybEFuY2hvci5ocmVmID0gcy51cmw7XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPD04IC0gMTEgb25seVxuXHRcdFx0XHQvLyBBbmNob3IncyBob3N0IHByb3BlcnR5IGlzbid0IGNvcnJlY3RseSBzZXQgd2hlbiBzLnVybCBpcyByZWxhdGl2ZVxuXHRcdFx0XHR1cmxBbmNob3IuaHJlZiA9IHVybEFuY2hvci5ocmVmO1xuXHRcdFx0XHRzLmNyb3NzRG9tYWluID0gb3JpZ2luQW5jaG9yLnByb3RvY29sICsgXCIvL1wiICsgb3JpZ2luQW5jaG9yLmhvc3QgIT09XG5cdFx0XHRcdFx0dXJsQW5jaG9yLnByb3RvY29sICsgXCIvL1wiICsgdXJsQW5jaG9yLmhvc3Q7XG5cdFx0XHR9IGNhdGNoICggZSApIHtcblxuXHRcdFx0XHQvLyBJZiB0aGVyZSBpcyBhbiBlcnJvciBwYXJzaW5nIHRoZSBVUkwsIGFzc3VtZSBpdCBpcyBjcm9zc0RvbWFpbixcblx0XHRcdFx0Ly8gaXQgY2FuIGJlIHJlamVjdGVkIGJ5IHRoZSB0cmFuc3BvcnQgaWYgaXQgaXMgaW52YWxpZFxuXHRcdFx0XHRzLmNyb3NzRG9tYWluID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDb252ZXJ0IGRhdGEgaWYgbm90IGFscmVhZHkgYSBzdHJpbmdcblx0XHRpZiAoIHMuZGF0YSAmJiBzLnByb2Nlc3NEYXRhICYmIHR5cGVvZiBzLmRhdGEgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRzLmRhdGEgPSBqUXVlcnkucGFyYW0oIHMuZGF0YSwgcy50cmFkaXRpb25hbCApO1xuXHRcdH1cblxuXHRcdC8vIEFwcGx5IHByZWZpbHRlcnNcblx0XHRpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggcHJlZmlsdGVycywgcywgb3B0aW9ucywganFYSFIgKTtcblxuXHRcdC8vIElmIHJlcXVlc3Qgd2FzIGFib3J0ZWQgaW5zaWRlIGEgcHJlZmlsdGVyLCBzdG9wIHRoZXJlXG5cdFx0aWYgKCBjb21wbGV0ZWQgKSB7XG5cdFx0XHRyZXR1cm4ganFYSFI7XG5cdFx0fVxuXG5cdFx0Ly8gV2UgY2FuIGZpcmUgZ2xvYmFsIGV2ZW50cyBhcyBvZiBub3cgaWYgYXNrZWQgdG9cblx0XHQvLyBEb24ndCBmaXJlIGV2ZW50cyBpZiBqUXVlcnkuZXZlbnQgaXMgdW5kZWZpbmVkIGluIGFuIEFNRC11c2FnZSBzY2VuYXJpbyAoIzE1MTE4KVxuXHRcdGZpcmVHbG9iYWxzID0galF1ZXJ5LmV2ZW50ICYmIHMuZ2xvYmFsO1xuXG5cdFx0Ly8gV2F0Y2ggZm9yIGEgbmV3IHNldCBvZiByZXF1ZXN0c1xuXHRcdGlmICggZmlyZUdsb2JhbHMgJiYgalF1ZXJ5LmFjdGl2ZSsrID09PSAwICkge1xuXHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXIoIFwiYWpheFN0YXJ0XCIgKTtcblx0XHR9XG5cblx0XHQvLyBVcHBlcmNhc2UgdGhlIHR5cGVcblx0XHRzLnR5cGUgPSBzLnR5cGUudG9VcHBlckNhc2UoKTtcblxuXHRcdC8vIERldGVybWluZSBpZiByZXF1ZXN0IGhhcyBjb250ZW50XG5cdFx0cy5oYXNDb250ZW50ID0gIXJub0NvbnRlbnQudGVzdCggcy50eXBlICk7XG5cblx0XHQvLyBTYXZlIHRoZSBVUkwgaW4gY2FzZSB3ZSdyZSB0b3lpbmcgd2l0aCB0aGUgSWYtTW9kaWZpZWQtU2luY2Vcblx0XHQvLyBhbmQvb3IgSWYtTm9uZS1NYXRjaCBoZWFkZXIgbGF0ZXIgb25cblx0XHQvLyBSZW1vdmUgaGFzaCB0byBzaW1wbGlmeSB1cmwgbWFuaXB1bGF0aW9uXG5cdFx0Y2FjaGVVUkwgPSBzLnVybC5yZXBsYWNlKCByaGFzaCwgXCJcIiApO1xuXG5cdFx0Ly8gTW9yZSBvcHRpb25zIGhhbmRsaW5nIGZvciByZXF1ZXN0cyB3aXRoIG5vIGNvbnRlbnRcblx0XHRpZiAoICFzLmhhc0NvbnRlbnQgKSB7XG5cblx0XHRcdC8vIFJlbWVtYmVyIHRoZSBoYXNoIHNvIHdlIGNhbiBwdXQgaXQgYmFja1xuXHRcdFx0dW5jYWNoZWQgPSBzLnVybC5zbGljZSggY2FjaGVVUkwubGVuZ3RoICk7XG5cblx0XHRcdC8vIElmIGRhdGEgaXMgYXZhaWxhYmxlLCBhcHBlbmQgZGF0YSB0byB1cmxcblx0XHRcdGlmICggcy5kYXRhICkge1xuXHRcdFx0XHRjYWNoZVVSTCArPSAoIHJxdWVyeS50ZXN0KCBjYWNoZVVSTCApID8gXCImXCIgOiBcIj9cIiApICsgcy5kYXRhO1xuXG5cdFx0XHRcdC8vICM5NjgyOiByZW1vdmUgZGF0YSBzbyB0aGF0IGl0J3Mgbm90IHVzZWQgaW4gYW4gZXZlbnR1YWwgcmV0cnlcblx0XHRcdFx0ZGVsZXRlIHMuZGF0YTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIG9yIHVwZGF0ZSBhbnRpLWNhY2hlIHBhcmFtIGlmIG5lZWRlZFxuXHRcdFx0aWYgKCBzLmNhY2hlID09PSBmYWxzZSApIHtcblx0XHRcdFx0Y2FjaGVVUkwgPSBjYWNoZVVSTC5yZXBsYWNlKCByYW50aUNhY2hlLCBcIiQxXCIgKTtcblx0XHRcdFx0dW5jYWNoZWQgPSAoIHJxdWVyeS50ZXN0KCBjYWNoZVVSTCApID8gXCImXCIgOiBcIj9cIiApICsgXCJfPVwiICsgKCBub25jZSsrICkgKyB1bmNhY2hlZDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUHV0IGhhc2ggYW5kIGFudGktY2FjaGUgb24gdGhlIFVSTCB0aGF0IHdpbGwgYmUgcmVxdWVzdGVkIChnaC0xNzMyKVxuXHRcdFx0cy51cmwgPSBjYWNoZVVSTCArIHVuY2FjaGVkO1xuXG5cdFx0Ly8gQ2hhbmdlICclMjAnIHRvICcrJyBpZiB0aGlzIGlzIGVuY29kZWQgZm9ybSBib2R5IGNvbnRlbnQgKGdoLTI2NTgpXG5cdFx0fSBlbHNlIGlmICggcy5kYXRhICYmIHMucHJvY2Vzc0RhdGEgJiZcblx0XHRcdCggcy5jb250ZW50VHlwZSB8fCBcIlwiICkuaW5kZXhPZiggXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIiApID09PSAwICkge1xuXHRcdFx0cy5kYXRhID0gcy5kYXRhLnJlcGxhY2UoIHIyMCwgXCIrXCIgKTtcblx0XHR9XG5cblx0XHQvLyBTZXQgdGhlIElmLU1vZGlmaWVkLVNpbmNlIGFuZC9vciBJZi1Ob25lLU1hdGNoIGhlYWRlciwgaWYgaW4gaWZNb2RpZmllZCBtb2RlLlxuXHRcdGlmICggcy5pZk1vZGlmaWVkICkge1xuXHRcdFx0aWYgKCBqUXVlcnkubGFzdE1vZGlmaWVkWyBjYWNoZVVSTCBdICkge1xuXHRcdFx0XHRqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBcIklmLU1vZGlmaWVkLVNpbmNlXCIsIGpRdWVyeS5sYXN0TW9kaWZpZWRbIGNhY2hlVVJMIF0gKTtcblx0XHRcdH1cblx0XHRcdGlmICggalF1ZXJ5LmV0YWdbIGNhY2hlVVJMIF0gKSB7XG5cdFx0XHRcdGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoIFwiSWYtTm9uZS1NYXRjaFwiLCBqUXVlcnkuZXRhZ1sgY2FjaGVVUkwgXSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFNldCB0aGUgY29ycmVjdCBoZWFkZXIsIGlmIGRhdGEgaXMgYmVpbmcgc2VudFxuXHRcdGlmICggcy5kYXRhICYmIHMuaGFzQ29udGVudCAmJiBzLmNvbnRlbnRUeXBlICE9PSBmYWxzZSB8fCBvcHRpb25zLmNvbnRlbnRUeXBlICkge1xuXHRcdFx0anFYSFIuc2V0UmVxdWVzdEhlYWRlciggXCJDb250ZW50LVR5cGVcIiwgcy5jb250ZW50VHlwZSApO1xuXHRcdH1cblxuXHRcdC8vIFNldCB0aGUgQWNjZXB0cyBoZWFkZXIgZm9yIHRoZSBzZXJ2ZXIsIGRlcGVuZGluZyBvbiB0aGUgZGF0YVR5cGVcblx0XHRqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKFxuXHRcdFx0XCJBY2NlcHRcIixcblx0XHRcdHMuZGF0YVR5cGVzWyAwIF0gJiYgcy5hY2NlcHRzWyBzLmRhdGFUeXBlc1sgMCBdIF0gP1xuXHRcdFx0XHRzLmFjY2VwdHNbIHMuZGF0YVR5cGVzWyAwIF0gXSArXG5cdFx0XHRcdFx0KCBzLmRhdGFUeXBlc1sgMCBdICE9PSBcIipcIiA/IFwiLCBcIiArIGFsbFR5cGVzICsgXCI7IHE9MC4wMVwiIDogXCJcIiApIDpcblx0XHRcdFx0cy5hY2NlcHRzWyBcIipcIiBdXG5cdFx0KTtcblxuXHRcdC8vIENoZWNrIGZvciBoZWFkZXJzIG9wdGlvblxuXHRcdGZvciAoIGkgaW4gcy5oZWFkZXJzICkge1xuXHRcdFx0anFYSFIuc2V0UmVxdWVzdEhlYWRlciggaSwgcy5oZWFkZXJzWyBpIF0gKTtcblx0XHR9XG5cblx0XHQvLyBBbGxvdyBjdXN0b20gaGVhZGVycy9taW1ldHlwZXMgYW5kIGVhcmx5IGFib3J0XG5cdFx0aWYgKCBzLmJlZm9yZVNlbmQgJiZcblx0XHRcdCggcy5iZWZvcmVTZW5kLmNhbGwoIGNhbGxiYWNrQ29udGV4dCwganFYSFIsIHMgKSA9PT0gZmFsc2UgfHwgY29tcGxldGVkICkgKSB7XG5cblx0XHRcdC8vIEFib3J0IGlmIG5vdCBkb25lIGFscmVhZHkgYW5kIHJldHVyblxuXHRcdFx0cmV0dXJuIGpxWEhSLmFib3J0KCk7XG5cdFx0fVxuXG5cdFx0Ly8gQWJvcnRpbmcgaXMgbm8gbG9uZ2VyIGEgY2FuY2VsbGF0aW9uXG5cdFx0c3RyQWJvcnQgPSBcImFib3J0XCI7XG5cblx0XHQvLyBJbnN0YWxsIGNhbGxiYWNrcyBvbiBkZWZlcnJlZHNcblx0XHRjb21wbGV0ZURlZmVycmVkLmFkZCggcy5jb21wbGV0ZSApO1xuXHRcdGpxWEhSLmRvbmUoIHMuc3VjY2VzcyApO1xuXHRcdGpxWEhSLmZhaWwoIHMuZXJyb3IgKTtcblxuXHRcdC8vIEdldCB0cmFuc3BvcnRcblx0XHR0cmFuc3BvcnQgPSBpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggdHJhbnNwb3J0cywgcywgb3B0aW9ucywganFYSFIgKTtcblxuXHRcdC8vIElmIG5vIHRyYW5zcG9ydCwgd2UgYXV0by1hYm9ydFxuXHRcdGlmICggIXRyYW5zcG9ydCApIHtcblx0XHRcdGRvbmUoIC0xLCBcIk5vIFRyYW5zcG9ydFwiICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGpxWEhSLnJlYWR5U3RhdGUgPSAxO1xuXG5cdFx0XHQvLyBTZW5kIGdsb2JhbCBldmVudFxuXHRcdFx0aWYgKCBmaXJlR2xvYmFscyApIHtcblx0XHRcdFx0Z2xvYmFsRXZlbnRDb250ZXh0LnRyaWdnZXIoIFwiYWpheFNlbmRcIiwgWyBqcVhIUiwgcyBdICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIHJlcXVlc3Qgd2FzIGFib3J0ZWQgaW5zaWRlIGFqYXhTZW5kLCBzdG9wIHRoZXJlXG5cdFx0XHRpZiAoIGNvbXBsZXRlZCApIHtcblx0XHRcdFx0cmV0dXJuIGpxWEhSO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBUaW1lb3V0XG5cdFx0XHRpZiAoIHMuYXN5bmMgJiYgcy50aW1lb3V0ID4gMCApIHtcblx0XHRcdFx0dGltZW91dFRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGpxWEhSLmFib3J0KCBcInRpbWVvdXRcIiApO1xuXHRcdFx0XHR9LCBzLnRpbWVvdXQgKTtcblx0XHRcdH1cblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29tcGxldGVkID0gZmFsc2U7XG5cdFx0XHRcdHRyYW5zcG9ydC5zZW5kKCByZXF1ZXN0SGVhZGVycywgZG9uZSApO1xuXHRcdFx0fSBjYXRjaCAoIGUgKSB7XG5cblx0XHRcdFx0Ly8gUmV0aHJvdyBwb3N0LWNvbXBsZXRpb24gZXhjZXB0aW9uc1xuXHRcdFx0XHRpZiAoIGNvbXBsZXRlZCApIHtcblx0XHRcdFx0XHR0aHJvdyBlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUHJvcGFnYXRlIG90aGVycyBhcyByZXN1bHRzXG5cdFx0XHRcdGRvbmUoIC0xLCBlICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ2FsbGJhY2sgZm9yIHdoZW4gZXZlcnl0aGluZyBpcyBkb25lXG5cdFx0ZnVuY3Rpb24gZG9uZSggc3RhdHVzLCBuYXRpdmVTdGF0dXNUZXh0LCByZXNwb25zZXMsIGhlYWRlcnMgKSB7XG5cdFx0XHR2YXIgaXNTdWNjZXNzLCBzdWNjZXNzLCBlcnJvciwgcmVzcG9uc2UsIG1vZGlmaWVkLFxuXHRcdFx0XHRzdGF0dXNUZXh0ID0gbmF0aXZlU3RhdHVzVGV4dDtcblxuXHRcdFx0Ly8gSWdub3JlIHJlcGVhdCBpbnZvY2F0aW9uc1xuXHRcdFx0aWYgKCBjb21wbGV0ZWQgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Y29tcGxldGVkID0gdHJ1ZTtcblxuXHRcdFx0Ly8gQ2xlYXIgdGltZW91dCBpZiBpdCBleGlzdHNcblx0XHRcdGlmICggdGltZW91dFRpbWVyICkge1xuXHRcdFx0XHR3aW5kb3cuY2xlYXJUaW1lb3V0KCB0aW1lb3V0VGltZXIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRGVyZWZlcmVuY2UgdHJhbnNwb3J0IGZvciBlYXJseSBnYXJiYWdlIGNvbGxlY3Rpb25cblx0XHRcdC8vIChubyBtYXR0ZXIgaG93IGxvbmcgdGhlIGpxWEhSIG9iamVjdCB3aWxsIGJlIHVzZWQpXG5cdFx0XHR0cmFuc3BvcnQgPSB1bmRlZmluZWQ7XG5cblx0XHRcdC8vIENhY2hlIHJlc3BvbnNlIGhlYWRlcnNcblx0XHRcdHJlc3BvbnNlSGVhZGVyc1N0cmluZyA9IGhlYWRlcnMgfHwgXCJcIjtcblxuXHRcdFx0Ly8gU2V0IHJlYWR5U3RhdGVcblx0XHRcdGpxWEhSLnJlYWR5U3RhdGUgPSBzdGF0dXMgPiAwID8gNCA6IDA7XG5cblx0XHRcdC8vIERldGVybWluZSBpZiBzdWNjZXNzZnVsXG5cdFx0XHRpc1N1Y2Nlc3MgPSBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMCB8fCBzdGF0dXMgPT09IDMwNDtcblxuXHRcdFx0Ly8gR2V0IHJlc3BvbnNlIGRhdGFcblx0XHRcdGlmICggcmVzcG9uc2VzICkge1xuXHRcdFx0XHRyZXNwb25zZSA9IGFqYXhIYW5kbGVSZXNwb25zZXMoIHMsIGpxWEhSLCByZXNwb25zZXMgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ29udmVydCBubyBtYXR0ZXIgd2hhdCAodGhhdCB3YXkgcmVzcG9uc2VYWFggZmllbGRzIGFyZSBhbHdheXMgc2V0KVxuXHRcdFx0cmVzcG9uc2UgPSBhamF4Q29udmVydCggcywgcmVzcG9uc2UsIGpxWEhSLCBpc1N1Y2Nlc3MgKTtcblxuXHRcdFx0Ly8gSWYgc3VjY2Vzc2Z1bCwgaGFuZGxlIHR5cGUgY2hhaW5pbmdcblx0XHRcdGlmICggaXNTdWNjZXNzICkge1xuXG5cdFx0XHRcdC8vIFNldCB0aGUgSWYtTW9kaWZpZWQtU2luY2UgYW5kL29yIElmLU5vbmUtTWF0Y2ggaGVhZGVyLCBpZiBpbiBpZk1vZGlmaWVkIG1vZGUuXG5cdFx0XHRcdGlmICggcy5pZk1vZGlmaWVkICkge1xuXHRcdFx0XHRcdG1vZGlmaWVkID0ganFYSFIuZ2V0UmVzcG9uc2VIZWFkZXIoIFwiTGFzdC1Nb2RpZmllZFwiICk7XG5cdFx0XHRcdFx0aWYgKCBtb2RpZmllZCApIHtcblx0XHRcdFx0XHRcdGpRdWVyeS5sYXN0TW9kaWZpZWRbIGNhY2hlVVJMIF0gPSBtb2RpZmllZDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bW9kaWZpZWQgPSBqcVhIUi5nZXRSZXNwb25zZUhlYWRlciggXCJldGFnXCIgKTtcblx0XHRcdFx0XHRpZiAoIG1vZGlmaWVkICkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5LmV0YWdbIGNhY2hlVVJMIF0gPSBtb2RpZmllZDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBpZiBubyBjb250ZW50XG5cdFx0XHRcdGlmICggc3RhdHVzID09PSAyMDQgfHwgcy50eXBlID09PSBcIkhFQURcIiApIHtcblx0XHRcdFx0XHRzdGF0dXNUZXh0ID0gXCJub2NvbnRlbnRcIjtcblxuXHRcdFx0XHQvLyBpZiBub3QgbW9kaWZpZWRcblx0XHRcdFx0fSBlbHNlIGlmICggc3RhdHVzID09PSAzMDQgKSB7XG5cdFx0XHRcdFx0c3RhdHVzVGV4dCA9IFwibm90bW9kaWZpZWRcIjtcblxuXHRcdFx0XHQvLyBJZiB3ZSBoYXZlIGRhdGEsIGxldCdzIGNvbnZlcnQgaXRcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdGU7XG5cdFx0XHRcdFx0c3VjY2VzcyA9IHJlc3BvbnNlLmRhdGE7XG5cdFx0XHRcdFx0ZXJyb3IgPSByZXNwb25zZS5lcnJvcjtcblx0XHRcdFx0XHRpc1N1Y2Nlc3MgPSAhZXJyb3I7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Ly8gRXh0cmFjdCBlcnJvciBmcm9tIHN0YXR1c1RleHQgYW5kIG5vcm1hbGl6ZSBmb3Igbm9uLWFib3J0c1xuXHRcdFx0XHRlcnJvciA9IHN0YXR1c1RleHQ7XG5cdFx0XHRcdGlmICggc3RhdHVzIHx8ICFzdGF0dXNUZXh0ICkge1xuXHRcdFx0XHRcdHN0YXR1c1RleHQgPSBcImVycm9yXCI7XG5cdFx0XHRcdFx0aWYgKCBzdGF0dXMgPCAwICkge1xuXHRcdFx0XHRcdFx0c3RhdHVzID0gMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IGRhdGEgZm9yIHRoZSBmYWtlIHhociBvYmplY3Rcblx0XHRcdGpxWEhSLnN0YXR1cyA9IHN0YXR1cztcblx0XHRcdGpxWEhSLnN0YXR1c1RleHQgPSAoIG5hdGl2ZVN0YXR1c1RleHQgfHwgc3RhdHVzVGV4dCApICsgXCJcIjtcblxuXHRcdFx0Ly8gU3VjY2Vzcy9FcnJvclxuXHRcdFx0aWYgKCBpc1N1Y2Nlc3MgKSB7XG5cdFx0XHRcdGRlZmVycmVkLnJlc29sdmVXaXRoKCBjYWxsYmFja0NvbnRleHQsIFsgc3VjY2Vzcywgc3RhdHVzVGV4dCwganFYSFIgXSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0V2l0aCggY2FsbGJhY2tDb250ZXh0LCBbIGpxWEhSLCBzdGF0dXNUZXh0LCBlcnJvciBdICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN0YXR1cy1kZXBlbmRlbnQgY2FsbGJhY2tzXG5cdFx0XHRqcVhIUi5zdGF0dXNDb2RlKCBzdGF0dXNDb2RlICk7XG5cdFx0XHRzdGF0dXNDb2RlID0gdW5kZWZpbmVkO1xuXG5cdFx0XHRpZiAoIGZpcmVHbG9iYWxzICkge1xuXHRcdFx0XHRnbG9iYWxFdmVudENvbnRleHQudHJpZ2dlciggaXNTdWNjZXNzID8gXCJhamF4U3VjY2Vzc1wiIDogXCJhamF4RXJyb3JcIixcblx0XHRcdFx0XHRbIGpxWEhSLCBzLCBpc1N1Y2Nlc3MgPyBzdWNjZXNzIDogZXJyb3IgXSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb21wbGV0ZVxuXHRcdFx0Y29tcGxldGVEZWZlcnJlZC5maXJlV2l0aCggY2FsbGJhY2tDb250ZXh0LCBbIGpxWEhSLCBzdGF0dXNUZXh0IF0gKTtcblxuXHRcdFx0aWYgKCBmaXJlR2xvYmFscyApIHtcblx0XHRcdFx0Z2xvYmFsRXZlbnRDb250ZXh0LnRyaWdnZXIoIFwiYWpheENvbXBsZXRlXCIsIFsganFYSFIsIHMgXSApO1xuXG5cdFx0XHRcdC8vIEhhbmRsZSB0aGUgZ2xvYmFsIEFKQVggY291bnRlclxuXHRcdFx0XHRpZiAoICEoIC0talF1ZXJ5LmFjdGl2ZSApICkge1xuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyKCBcImFqYXhTdG9wXCIgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBqcVhIUjtcblx0fSxcblxuXHRnZXRKU09OOiBmdW5jdGlvbiggdXJsLCBkYXRhLCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdldCggdXJsLCBkYXRhLCBjYWxsYmFjaywgXCJqc29uXCIgKTtcblx0fSxcblxuXHRnZXRTY3JpcHQ6IGZ1bmN0aW9uKCB1cmwsIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiBqUXVlcnkuZ2V0KCB1cmwsIHVuZGVmaW5lZCwgY2FsbGJhY2ssIFwic2NyaXB0XCIgKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZWFjaCggWyBcImdldFwiLCBcInBvc3RcIiBdLCBmdW5jdGlvbiggaSwgbWV0aG9kICkge1xuXHRqUXVlcnlbIG1ldGhvZCBdID0gZnVuY3Rpb24oIHVybCwgZGF0YSwgY2FsbGJhY2ssIHR5cGUgKSB7XG5cblx0XHQvLyBTaGlmdCBhcmd1bWVudHMgaWYgZGF0YSBhcmd1bWVudCB3YXMgb21pdHRlZFxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGRhdGEgKSApIHtcblx0XHRcdHR5cGUgPSB0eXBlIHx8IGNhbGxiYWNrO1xuXHRcdFx0Y2FsbGJhY2sgPSBkYXRhO1xuXHRcdFx0ZGF0YSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHQvLyBUaGUgdXJsIGNhbiBiZSBhbiBvcHRpb25zIG9iamVjdCAod2hpY2ggdGhlbiBtdXN0IGhhdmUgLnVybClcblx0XHRyZXR1cm4galF1ZXJ5LmFqYXgoIGpRdWVyeS5leHRlbmQoIHtcblx0XHRcdHVybDogdXJsLFxuXHRcdFx0dHlwZTogbWV0aG9kLFxuXHRcdFx0ZGF0YVR5cGU6IHR5cGUsXG5cdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0c3VjY2VzczogY2FsbGJhY2tcblx0XHR9LCBqUXVlcnkuaXNQbGFpbk9iamVjdCggdXJsICkgJiYgdXJsICkgKTtcblx0fTtcbn0gKTtcblxuXG5qUXVlcnkuX2V2YWxVcmwgPSBmdW5jdGlvbiggdXJsICkge1xuXHRyZXR1cm4galF1ZXJ5LmFqYXgoIHtcblx0XHR1cmw6IHVybCxcblxuXHRcdC8vIE1ha2UgdGhpcyBleHBsaWNpdCwgc2luY2UgdXNlciBjYW4gb3ZlcnJpZGUgdGhpcyB0aHJvdWdoIGFqYXhTZXR1cCAoIzExMjY0KVxuXHRcdHR5cGU6IFwiR0VUXCIsXG5cdFx0ZGF0YVR5cGU6IFwic2NyaXB0XCIsXG5cdFx0Y2FjaGU6IHRydWUsXG5cdFx0YXN5bmM6IGZhbHNlLFxuXHRcdGdsb2JhbDogZmFsc2UsXG5cdFx0XCJ0aHJvd3NcIjogdHJ1ZVxuXHR9ICk7XG59O1xuXG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0d3JhcEFsbDogZnVuY3Rpb24oIGh0bWwgKSB7XG5cdFx0dmFyIHdyYXA7XG5cblx0XHRpZiAoIHRoaXNbIDAgXSApIHtcblx0XHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGh0bWwgKSApIHtcblx0XHRcdFx0aHRtbCA9IGh0bWwuY2FsbCggdGhpc1sgMCBdICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRoZSBlbGVtZW50cyB0byB3cmFwIHRoZSB0YXJnZXQgYXJvdW5kXG5cdFx0XHR3cmFwID0galF1ZXJ5KCBodG1sLCB0aGlzWyAwIF0ub3duZXJEb2N1bWVudCApLmVxKCAwICkuY2xvbmUoIHRydWUgKTtcblxuXHRcdFx0aWYgKCB0aGlzWyAwIF0ucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0d3JhcC5pbnNlcnRCZWZvcmUoIHRoaXNbIDAgXSApO1xuXHRcdFx0fVxuXG5cdFx0XHR3cmFwLm1hcCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBlbGVtID0gdGhpcztcblxuXHRcdFx0XHR3aGlsZSAoIGVsZW0uZmlyc3RFbGVtZW50Q2hpbGQgKSB7XG5cdFx0XHRcdFx0ZWxlbSA9IGVsZW0uZmlyc3RFbGVtZW50Q2hpbGQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZWxlbTtcblx0XHRcdH0gKS5hcHBlbmQoIHRoaXMgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHR3cmFwSW5uZXI6IGZ1bmN0aW9uKCBodG1sICkge1xuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGh0bWwgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS53cmFwSW5uZXIoIGh0bWwuY2FsbCggdGhpcywgaSApICk7XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgc2VsZiA9IGpRdWVyeSggdGhpcyApLFxuXHRcdFx0XHRjb250ZW50cyA9IHNlbGYuY29udGVudHMoKTtcblxuXHRcdFx0aWYgKCBjb250ZW50cy5sZW5ndGggKSB7XG5cdFx0XHRcdGNvbnRlbnRzLndyYXBBbGwoIGh0bWwgKTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2VsZi5hcHBlbmQoIGh0bWwgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0d3JhcDogZnVuY3Rpb24oIGh0bWwgKSB7XG5cdFx0dmFyIGlzRnVuY3Rpb24gPSBqUXVlcnkuaXNGdW5jdGlvbiggaHRtbCApO1xuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHRqUXVlcnkoIHRoaXMgKS53cmFwQWxsKCBpc0Z1bmN0aW9uID8gaHRtbC5jYWxsKCB0aGlzLCBpICkgOiBodG1sICk7XG5cdFx0fSApO1xuXHR9LFxuXG5cdHVud3JhcDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHRoaXMucGFyZW50KCBzZWxlY3RvciApLm5vdCggXCJib2R5XCIgKS5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeSggdGhpcyApLnJlcGxhY2VXaXRoKCB0aGlzLmNoaWxkTm9kZXMgKTtcblx0XHR9ICk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0gKTtcblxuXG5qUXVlcnkuZXhwci5wc2V1ZG9zLmhpZGRlbiA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRyZXR1cm4gIWpRdWVyeS5leHByLnBzZXVkb3MudmlzaWJsZSggZWxlbSApO1xufTtcbmpRdWVyeS5leHByLnBzZXVkb3MudmlzaWJsZSA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRyZXR1cm4gISEoIGVsZW0ub2Zmc2V0V2lkdGggfHwgZWxlbS5vZmZzZXRIZWlnaHQgfHwgZWxlbS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCApO1xufTtcblxuXG5cblxualF1ZXJ5LmFqYXhTZXR0aW5ncy54aHIgPSBmdW5jdGlvbigpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpO1xuXHR9IGNhdGNoICggZSApIHt9XG59O1xuXG52YXIgeGhyU3VjY2Vzc1N0YXR1cyA9IHtcblxuXHRcdC8vIEZpbGUgcHJvdG9jb2wgYWx3YXlzIHlpZWxkcyBzdGF0dXMgY29kZSAwLCBhc3N1bWUgMjAwXG5cdFx0MDogMjAwLFxuXG5cdFx0Ly8gU3VwcG9ydDogSUUgPD05IG9ubHlcblx0XHQvLyAjMTQ1MDogc29tZXRpbWVzIElFIHJldHVybnMgMTIyMyB3aGVuIGl0IHNob3VsZCBiZSAyMDRcblx0XHQxMjIzOiAyMDRcblx0fSxcblx0eGhyU3VwcG9ydGVkID0galF1ZXJ5LmFqYXhTZXR0aW5ncy54aHIoKTtcblxuc3VwcG9ydC5jb3JzID0gISF4aHJTdXBwb3J0ZWQgJiYgKCBcIndpdGhDcmVkZW50aWFsc1wiIGluIHhoclN1cHBvcnRlZCApO1xuc3VwcG9ydC5hamF4ID0geGhyU3VwcG9ydGVkID0gISF4aHJTdXBwb3J0ZWQ7XG5cbmpRdWVyeS5hamF4VHJhbnNwb3J0KCBmdW5jdGlvbiggb3B0aW9ucyApIHtcblx0dmFyIGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrO1xuXG5cdC8vIENyb3NzIGRvbWFpbiBvbmx5IGFsbG93ZWQgaWYgc3VwcG9ydGVkIHRocm91Z2ggWE1MSHR0cFJlcXVlc3Rcblx0aWYgKCBzdXBwb3J0LmNvcnMgfHwgeGhyU3VwcG9ydGVkICYmICFvcHRpb25zLmNyb3NzRG9tYWluICkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRzZW5kOiBmdW5jdGlvbiggaGVhZGVycywgY29tcGxldGUgKSB7XG5cdFx0XHRcdHZhciBpLFxuXHRcdFx0XHRcdHhociA9IG9wdGlvbnMueGhyKCk7XG5cblx0XHRcdFx0eGhyLm9wZW4oXG5cdFx0XHRcdFx0b3B0aW9ucy50eXBlLFxuXHRcdFx0XHRcdG9wdGlvbnMudXJsLFxuXHRcdFx0XHRcdG9wdGlvbnMuYXN5bmMsXG5cdFx0XHRcdFx0b3B0aW9ucy51c2VybmFtZSxcblx0XHRcdFx0XHRvcHRpb25zLnBhc3N3b3JkXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0Ly8gQXBwbHkgY3VzdG9tIGZpZWxkcyBpZiBwcm92aWRlZFxuXHRcdFx0XHRpZiAoIG9wdGlvbnMueGhyRmllbGRzICkge1xuXHRcdFx0XHRcdGZvciAoIGkgaW4gb3B0aW9ucy54aHJGaWVsZHMgKSB7XG5cdFx0XHRcdFx0XHR4aHJbIGkgXSA9IG9wdGlvbnMueGhyRmllbGRzWyBpIF07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gT3ZlcnJpZGUgbWltZSB0eXBlIGlmIG5lZWRlZFxuXHRcdFx0XHRpZiAoIG9wdGlvbnMubWltZVR5cGUgJiYgeGhyLm92ZXJyaWRlTWltZVR5cGUgKSB7XG5cdFx0XHRcdFx0eGhyLm92ZXJyaWRlTWltZVR5cGUoIG9wdGlvbnMubWltZVR5cGUgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFgtUmVxdWVzdGVkLVdpdGggaGVhZGVyXG5cdFx0XHRcdC8vIEZvciBjcm9zcy1kb21haW4gcmVxdWVzdHMsIHNlZWluZyBhcyBjb25kaXRpb25zIGZvciBhIHByZWZsaWdodCBhcmVcblx0XHRcdFx0Ly8gYWtpbiB0byBhIGppZ3NhdyBwdXp6bGUsIHdlIHNpbXBseSBuZXZlciBzZXQgaXQgdG8gYmUgc3VyZS5cblx0XHRcdFx0Ly8gKGl0IGNhbiBhbHdheXMgYmUgc2V0IG9uIGEgcGVyLXJlcXVlc3QgYmFzaXMgb3IgZXZlbiB1c2luZyBhamF4U2V0dXApXG5cdFx0XHRcdC8vIEZvciBzYW1lLWRvbWFpbiByZXF1ZXN0cywgd29uJ3QgY2hhbmdlIGhlYWRlciBpZiBhbHJlYWR5IHByb3ZpZGVkLlxuXHRcdFx0XHRpZiAoICFvcHRpb25zLmNyb3NzRG9tYWluICYmICFoZWFkZXJzWyBcIlgtUmVxdWVzdGVkLVdpdGhcIiBdICkge1xuXHRcdFx0XHRcdGhlYWRlcnNbIFwiWC1SZXF1ZXN0ZWQtV2l0aFwiIF0gPSBcIlhNTEh0dHBSZXF1ZXN0XCI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBTZXQgaGVhZGVyc1xuXHRcdFx0XHRmb3IgKCBpIGluIGhlYWRlcnMgKSB7XG5cdFx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoIGksIGhlYWRlcnNbIGkgXSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQ2FsbGJhY2tcblx0XHRcdFx0Y2FsbGJhY2sgPSBmdW5jdGlvbiggdHlwZSApIHtcblx0XHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRpZiAoIGNhbGxiYWNrICkge1xuXHRcdFx0XHRcdFx0XHRjYWxsYmFjayA9IGVycm9yQ2FsbGJhY2sgPSB4aHIub25sb2FkID1cblx0XHRcdFx0XHRcdFx0XHR4aHIub25lcnJvciA9IHhoci5vbmFib3J0ID0geGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG5cblx0XHRcdFx0XHRcdFx0aWYgKCB0eXBlID09PSBcImFib3J0XCIgKSB7XG5cdFx0XHRcdFx0XHRcdFx0eGhyLmFib3J0KCk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIHR5cGUgPT09IFwiZXJyb3JcIiApIHtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG5cdFx0XHRcdFx0XHRcdFx0Ly8gT24gYSBtYW51YWwgbmF0aXZlIGFib3J0LCBJRTkgdGhyb3dzXG5cdFx0XHRcdFx0XHRcdFx0Ly8gZXJyb3JzIG9uIGFueSBwcm9wZXJ0eSBhY2Nlc3MgdGhhdCBpcyBub3QgcmVhZHlTdGF0ZVxuXHRcdFx0XHRcdFx0XHRcdGlmICggdHlwZW9mIHhoci5zdGF0dXMgIT09IFwibnVtYmVyXCIgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb21wbGV0ZSggMCwgXCJlcnJvclwiICk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbXBsZXRlKFxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIEZpbGU6IHByb3RvY29sIGFsd2F5cyB5aWVsZHMgc3RhdHVzIDA7IHNlZSAjODYwNSwgIzE0MjA3XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHhoci5zdGF0dXMsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHhoci5zdGF0dXNUZXh0XG5cdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRjb21wbGV0ZShcblx0XHRcdFx0XHRcdFx0XHRcdHhoclN1Y2Nlc3NTdGF0dXNbIHhoci5zdGF0dXMgXSB8fCB4aHIuc3RhdHVzLFxuXHRcdFx0XHRcdFx0XHRcdFx0eGhyLnN0YXR1c1RleHQsXG5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBJRTkgaGFzIG5vIFhIUjIgYnV0IHRocm93cyBvbiBiaW5hcnkgKHRyYWMtMTE0MjYpXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBGb3IgWEhSMiBub24tdGV4dCwgbGV0IHRoZSBjYWxsZXIgaGFuZGxlIGl0IChnaC0yNDk4KVxuXHRcdFx0XHRcdFx0XHRcdFx0KCB4aHIucmVzcG9uc2VUeXBlIHx8IFwidGV4dFwiICkgIT09IFwidGV4dFwiICB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZW9mIHhoci5yZXNwb25zZVRleHQgIT09IFwic3RyaW5nXCIgP1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR7IGJpbmFyeTogeGhyLnJlc3BvbnNlIH0gOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHR7IHRleHQ6IHhoci5yZXNwb25zZVRleHQgfSxcblx0XHRcdFx0XHRcdFx0XHRcdHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKVxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdC8vIExpc3RlbiB0byBldmVudHNcblx0XHRcdFx0eGhyLm9ubG9hZCA9IGNhbGxiYWNrKCk7XG5cdFx0XHRcdGVycm9yQ2FsbGJhY2sgPSB4aHIub25lcnJvciA9IGNhbGxiYWNrKCBcImVycm9yXCIgKTtcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA5IG9ubHlcblx0XHRcdFx0Ly8gVXNlIG9ucmVhZHlzdGF0ZWNoYW5nZSB0byByZXBsYWNlIG9uYWJvcnRcblx0XHRcdFx0Ly8gdG8gaGFuZGxlIHVuY2F1Z2h0IGFib3J0c1xuXHRcdFx0XHRpZiAoIHhoci5vbmFib3J0ICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0eGhyLm9uYWJvcnQgPSBlcnJvckNhbGxiYWNrO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0Ly8gQ2hlY2sgcmVhZHlTdGF0ZSBiZWZvcmUgdGltZW91dCBhcyBpdCBjaGFuZ2VzXG5cdFx0XHRcdFx0XHRpZiAoIHhoci5yZWFkeVN0YXRlID09PSA0ICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIEFsbG93IG9uZXJyb3IgdG8gYmUgY2FsbGVkIGZpcnN0LFxuXHRcdFx0XHRcdFx0XHQvLyBidXQgdGhhdCB3aWxsIG5vdCBoYW5kbGUgYSBuYXRpdmUgYWJvcnRcblx0XHRcdFx0XHRcdFx0Ly8gQWxzbywgc2F2ZSBlcnJvckNhbGxiYWNrIHRvIGEgdmFyaWFibGVcblx0XHRcdFx0XHRcdFx0Ly8gYXMgeGhyLm9uZXJyb3IgY2Fubm90IGJlIGFjY2Vzc2VkXG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIGNhbGxiYWNrICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3JDYWxsYmFjaygpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBDcmVhdGUgdGhlIGFib3J0IGNhbGxiYWNrXG5cdFx0XHRcdGNhbGxiYWNrID0gY2FsbGJhY2soIFwiYWJvcnRcIiApO1xuXG5cdFx0XHRcdHRyeSB7XG5cblx0XHRcdFx0XHQvLyBEbyBzZW5kIHRoZSByZXF1ZXN0ICh0aGlzIG1heSByYWlzZSBhbiBleGNlcHRpb24pXG5cdFx0XHRcdFx0eGhyLnNlbmQoIG9wdGlvbnMuaGFzQ29udGVudCAmJiBvcHRpb25zLmRhdGEgfHwgbnVsbCApO1xuXHRcdFx0XHR9IGNhdGNoICggZSApIHtcblxuXHRcdFx0XHRcdC8vICMxNDY4MzogT25seSByZXRocm93IGlmIHRoaXMgaGFzbid0IGJlZW4gbm90aWZpZWQgYXMgYW4gZXJyb3IgeWV0XG5cdFx0XHRcdFx0aWYgKCBjYWxsYmFjayApIHtcblx0XHRcdFx0XHRcdHRocm93IGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHRhYm9ydDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggY2FsbGJhY2sgKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2soKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn0gKTtcblxuXG5cblxuLy8gUHJldmVudCBhdXRvLWV4ZWN1dGlvbiBvZiBzY3JpcHRzIHdoZW4gbm8gZXhwbGljaXQgZGF0YVR5cGUgd2FzIHByb3ZpZGVkIChTZWUgZ2gtMjQzMilcbmpRdWVyeS5hamF4UHJlZmlsdGVyKCBmdW5jdGlvbiggcyApIHtcblx0aWYgKCBzLmNyb3NzRG9tYWluICkge1xuXHRcdHMuY29udGVudHMuc2NyaXB0ID0gZmFsc2U7XG5cdH1cbn0gKTtcblxuLy8gSW5zdGFsbCBzY3JpcHQgZGF0YVR5cGVcbmpRdWVyeS5hamF4U2V0dXAoIHtcblx0YWNjZXB0czoge1xuXHRcdHNjcmlwdDogXCJ0ZXh0L2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL2phdmFzY3JpcHQsIFwiICtcblx0XHRcdFwiYXBwbGljYXRpb24vZWNtYXNjcmlwdCwgYXBwbGljYXRpb24veC1lY21hc2NyaXB0XCJcblx0fSxcblx0Y29udGVudHM6IHtcblx0XHRzY3JpcHQ6IC9cXGIoPzpqYXZhfGVjbWEpc2NyaXB0XFxiL1xuXHR9LFxuXHRjb252ZXJ0ZXJzOiB7XG5cdFx0XCJ0ZXh0IHNjcmlwdFwiOiBmdW5jdGlvbiggdGV4dCApIHtcblx0XHRcdGpRdWVyeS5nbG9iYWxFdmFsKCB0ZXh0ICk7XG5cdFx0XHRyZXR1cm4gdGV4dDtcblx0XHR9XG5cdH1cbn0gKTtcblxuLy8gSGFuZGxlIGNhY2hlJ3Mgc3BlY2lhbCBjYXNlIGFuZCBjcm9zc0RvbWFpblxualF1ZXJ5LmFqYXhQcmVmaWx0ZXIoIFwic2NyaXB0XCIsIGZ1bmN0aW9uKCBzICkge1xuXHRpZiAoIHMuY2FjaGUgPT09IHVuZGVmaW5lZCApIHtcblx0XHRzLmNhY2hlID0gZmFsc2U7XG5cdH1cblx0aWYgKCBzLmNyb3NzRG9tYWluICkge1xuXHRcdHMudHlwZSA9IFwiR0VUXCI7XG5cdH1cbn0gKTtcblxuLy8gQmluZCBzY3JpcHQgdGFnIGhhY2sgdHJhbnNwb3J0XG5qUXVlcnkuYWpheFRyYW5zcG9ydCggXCJzY3JpcHRcIiwgZnVuY3Rpb24oIHMgKSB7XG5cblx0Ly8gVGhpcyB0cmFuc3BvcnQgb25seSBkZWFscyB3aXRoIGNyb3NzIGRvbWFpbiByZXF1ZXN0c1xuXHRpZiAoIHMuY3Jvc3NEb21haW4gKSB7XG5cdFx0dmFyIHNjcmlwdCwgY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHNlbmQ6IGZ1bmN0aW9uKCBfLCBjb21wbGV0ZSApIHtcblx0XHRcdFx0c2NyaXB0ID0galF1ZXJ5KCBcIjxzY3JpcHQ+XCIgKS5wcm9wKCB7XG5cdFx0XHRcdFx0Y2hhcnNldDogcy5zY3JpcHRDaGFyc2V0LFxuXHRcdFx0XHRcdHNyYzogcy51cmxcblx0XHRcdFx0fSApLm9uKFxuXHRcdFx0XHRcdFwibG9hZCBlcnJvclwiLFxuXHRcdFx0XHRcdGNhbGxiYWNrID0gZnVuY3Rpb24oIGV2dCApIHtcblx0XHRcdFx0XHRcdHNjcmlwdC5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdGNhbGxiYWNrID0gbnVsbDtcblx0XHRcdFx0XHRcdGlmICggZXZ0ICkge1xuXHRcdFx0XHRcdFx0XHRjb21wbGV0ZSggZXZ0LnR5cGUgPT09IFwiZXJyb3JcIiA/IDQwNCA6IDIwMCwgZXZ0LnR5cGUgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0Ly8gVXNlIG5hdGl2ZSBET00gbWFuaXB1bGF0aW9uIHRvIGF2b2lkIG91ciBkb21NYW5pcCBBSkFYIHRyaWNrZXJ5XG5cdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoIHNjcmlwdFsgMCBdICk7XG5cdFx0XHR9LFxuXHRcdFx0YWJvcnQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIGNhbGxiYWNrICkge1xuXHRcdFx0XHRcdGNhbGxiYWNrKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHR9XG59ICk7XG5cblxuXG5cbnZhciBvbGRDYWxsYmFja3MgPSBbXSxcblx0cmpzb25wID0gLyg9KVxcPyg/PSZ8JCl8XFw/XFw/LztcblxuLy8gRGVmYXVsdCBqc29ucCBzZXR0aW5nc1xualF1ZXJ5LmFqYXhTZXR1cCgge1xuXHRqc29ucDogXCJjYWxsYmFja1wiLFxuXHRqc29ucENhbGxiYWNrOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgY2FsbGJhY2sgPSBvbGRDYWxsYmFja3MucG9wKCkgfHwgKCBqUXVlcnkuZXhwYW5kbyArIFwiX1wiICsgKCBub25jZSsrICkgKTtcblx0XHR0aGlzWyBjYWxsYmFjayBdID0gdHJ1ZTtcblx0XHRyZXR1cm4gY2FsbGJhY2s7XG5cdH1cbn0gKTtcblxuLy8gRGV0ZWN0LCBub3JtYWxpemUgb3B0aW9ucyBhbmQgaW5zdGFsbCBjYWxsYmFja3MgZm9yIGpzb25wIHJlcXVlc3RzXG5qUXVlcnkuYWpheFByZWZpbHRlciggXCJqc29uIGpzb25wXCIsIGZ1bmN0aW9uKCBzLCBvcmlnaW5hbFNldHRpbmdzLCBqcVhIUiApIHtcblxuXHR2YXIgY2FsbGJhY2tOYW1lLCBvdmVyd3JpdHRlbiwgcmVzcG9uc2VDb250YWluZXIsXG5cdFx0anNvblByb3AgPSBzLmpzb25wICE9PSBmYWxzZSAmJiAoIHJqc29ucC50ZXN0KCBzLnVybCApID9cblx0XHRcdFwidXJsXCIgOlxuXHRcdFx0dHlwZW9mIHMuZGF0YSA9PT0gXCJzdHJpbmdcIiAmJlxuXHRcdFx0XHQoIHMuY29udGVudFR5cGUgfHwgXCJcIiApXG5cdFx0XHRcdFx0LmluZGV4T2YoIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIgKSA9PT0gMCAmJlxuXHRcdFx0XHRyanNvbnAudGVzdCggcy5kYXRhICkgJiYgXCJkYXRhXCJcblx0XHQpO1xuXG5cdC8vIEhhbmRsZSBpZmYgdGhlIGV4cGVjdGVkIGRhdGEgdHlwZSBpcyBcImpzb25wXCIgb3Igd2UgaGF2ZSBhIHBhcmFtZXRlciB0byBzZXRcblx0aWYgKCBqc29uUHJvcCB8fCBzLmRhdGFUeXBlc1sgMCBdID09PSBcImpzb25wXCIgKSB7XG5cblx0XHQvLyBHZXQgY2FsbGJhY2sgbmFtZSwgcmVtZW1iZXJpbmcgcHJlZXhpc3RpbmcgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIGl0XG5cdFx0Y2FsbGJhY2tOYW1lID0gcy5qc29ucENhbGxiYWNrID0galF1ZXJ5LmlzRnVuY3Rpb24oIHMuanNvbnBDYWxsYmFjayApID9cblx0XHRcdHMuanNvbnBDYWxsYmFjaygpIDpcblx0XHRcdHMuanNvbnBDYWxsYmFjaztcblxuXHRcdC8vIEluc2VydCBjYWxsYmFjayBpbnRvIHVybCBvciBmb3JtIGRhdGFcblx0XHRpZiAoIGpzb25Qcm9wICkge1xuXHRcdFx0c1sganNvblByb3AgXSA9IHNbIGpzb25Qcm9wIF0ucmVwbGFjZSggcmpzb25wLCBcIiQxXCIgKyBjYWxsYmFja05hbWUgKTtcblx0XHR9IGVsc2UgaWYgKCBzLmpzb25wICE9PSBmYWxzZSApIHtcblx0XHRcdHMudXJsICs9ICggcnF1ZXJ5LnRlc3QoIHMudXJsICkgPyBcIiZcIiA6IFwiP1wiICkgKyBzLmpzb25wICsgXCI9XCIgKyBjYWxsYmFja05hbWU7XG5cdFx0fVxuXG5cdFx0Ly8gVXNlIGRhdGEgY29udmVydGVyIHRvIHJldHJpZXZlIGpzb24gYWZ0ZXIgc2NyaXB0IGV4ZWN1dGlvblxuXHRcdHMuY29udmVydGVyc1sgXCJzY3JpcHQganNvblwiIF0gPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggIXJlc3BvbnNlQ29udGFpbmVyICkge1xuXHRcdFx0XHRqUXVlcnkuZXJyb3IoIGNhbGxiYWNrTmFtZSArIFwiIHdhcyBub3QgY2FsbGVkXCIgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXNwb25zZUNvbnRhaW5lclsgMCBdO1xuXHRcdH07XG5cblx0XHQvLyBGb3JjZSBqc29uIGRhdGFUeXBlXG5cdFx0cy5kYXRhVHlwZXNbIDAgXSA9IFwianNvblwiO1xuXG5cdFx0Ly8gSW5zdGFsbCBjYWxsYmFja1xuXHRcdG92ZXJ3cml0dGVuID0gd2luZG93WyBjYWxsYmFja05hbWUgXTtcblx0XHR3aW5kb3dbIGNhbGxiYWNrTmFtZSBdID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXNwb25zZUNvbnRhaW5lciA9IGFyZ3VtZW50cztcblx0XHR9O1xuXG5cdFx0Ly8gQ2xlYW4tdXAgZnVuY3Rpb24gKGZpcmVzIGFmdGVyIGNvbnZlcnRlcnMpXG5cdFx0anFYSFIuYWx3YXlzKCBmdW5jdGlvbigpIHtcblxuXHRcdFx0Ly8gSWYgcHJldmlvdXMgdmFsdWUgZGlkbid0IGV4aXN0IC0gcmVtb3ZlIGl0XG5cdFx0XHRpZiAoIG92ZXJ3cml0dGVuID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdGpRdWVyeSggd2luZG93ICkucmVtb3ZlUHJvcCggY2FsbGJhY2tOYW1lICk7XG5cblx0XHRcdC8vIE90aGVyd2lzZSByZXN0b3JlIHByZWV4aXN0aW5nIHZhbHVlXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR3aW5kb3dbIGNhbGxiYWNrTmFtZSBdID0gb3ZlcndyaXR0ZW47XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNhdmUgYmFjayBhcyBmcmVlXG5cdFx0XHRpZiAoIHNbIGNhbGxiYWNrTmFtZSBdICkge1xuXG5cdFx0XHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHJlLXVzaW5nIHRoZSBvcHRpb25zIGRvZXNuJ3Qgc2NyZXcgdGhpbmdzIGFyb3VuZFxuXHRcdFx0XHRzLmpzb25wQ2FsbGJhY2sgPSBvcmlnaW5hbFNldHRpbmdzLmpzb25wQ2FsbGJhY2s7XG5cblx0XHRcdFx0Ly8gU2F2ZSB0aGUgY2FsbGJhY2sgbmFtZSBmb3IgZnV0dXJlIHVzZVxuXHRcdFx0XHRvbGRDYWxsYmFja3MucHVzaCggY2FsbGJhY2tOYW1lICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENhbGwgaWYgaXQgd2FzIGEgZnVuY3Rpb24gYW5kIHdlIGhhdmUgYSByZXNwb25zZVxuXHRcdFx0aWYgKCByZXNwb25zZUNvbnRhaW5lciAmJiBqUXVlcnkuaXNGdW5jdGlvbiggb3ZlcndyaXR0ZW4gKSApIHtcblx0XHRcdFx0b3ZlcndyaXR0ZW4oIHJlc3BvbnNlQ29udGFpbmVyWyAwIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0cmVzcG9uc2VDb250YWluZXIgPSBvdmVyd3JpdHRlbiA9IHVuZGVmaW5lZDtcblx0XHR9ICk7XG5cblx0XHQvLyBEZWxlZ2F0ZSB0byBzY3JpcHRcblx0XHRyZXR1cm4gXCJzY3JpcHRcIjtcblx0fVxufSApO1xuXG5cblxuXG4vLyBTdXBwb3J0OiBTYWZhcmkgOCBvbmx5XG4vLyBJbiBTYWZhcmkgOCBkb2N1bWVudHMgY3JlYXRlZCB2aWEgZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50XG4vLyBjb2xsYXBzZSBzaWJsaW5nIGZvcm1zOiB0aGUgc2Vjb25kIG9uZSBiZWNvbWVzIGEgY2hpbGQgb2YgdGhlIGZpcnN0IG9uZS5cbi8vIEJlY2F1c2Ugb2YgdGhhdCwgdGhpcyBzZWN1cml0eSBtZWFzdXJlIGhhcyB0byBiZSBkaXNhYmxlZCBpbiBTYWZhcmkgOC5cbi8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzczMzdcbnN1cHBvcnQuY3JlYXRlSFRNTERvY3VtZW50ID0gKCBmdW5jdGlvbigpIHtcblx0dmFyIGJvZHkgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoIFwiXCIgKS5ib2R5O1xuXHRib2R5LmlubmVySFRNTCA9IFwiPGZvcm0+PC9mb3JtPjxmb3JtPjwvZm9ybT5cIjtcblx0cmV0dXJuIGJvZHkuY2hpbGROb2Rlcy5sZW5ndGggPT09IDI7XG59ICkoKTtcblxuXG4vLyBBcmd1bWVudCBcImRhdGFcIiBzaG91bGQgYmUgc3RyaW5nIG9mIGh0bWxcbi8vIGNvbnRleHQgKG9wdGlvbmFsKTogSWYgc3BlY2lmaWVkLCB0aGUgZnJhZ21lbnQgd2lsbCBiZSBjcmVhdGVkIGluIHRoaXMgY29udGV4dCxcbi8vIGRlZmF1bHRzIHRvIGRvY3VtZW50XG4vLyBrZWVwU2NyaXB0cyAob3B0aW9uYWwpOiBJZiB0cnVlLCB3aWxsIGluY2x1ZGUgc2NyaXB0cyBwYXNzZWQgaW4gdGhlIGh0bWwgc3RyaW5nXG5qUXVlcnkucGFyc2VIVE1MID0gZnVuY3Rpb24oIGRhdGEsIGNvbnRleHQsIGtlZXBTY3JpcHRzICkge1xuXHRpZiAoIHR5cGVvZiBkYXRhICE9PSBcInN0cmluZ1wiICkge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXHRpZiAoIHR5cGVvZiBjb250ZXh0ID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRrZWVwU2NyaXB0cyA9IGNvbnRleHQ7XG5cdFx0Y29udGV4dCA9IGZhbHNlO1xuXHR9XG5cblx0dmFyIGJhc2UsIHBhcnNlZCwgc2NyaXB0cztcblxuXHRpZiAoICFjb250ZXh0ICkge1xuXG5cdFx0Ly8gU3RvcCBzY3JpcHRzIG9yIGlubGluZSBldmVudCBoYW5kbGVycyBmcm9tIGJlaW5nIGV4ZWN1dGVkIGltbWVkaWF0ZWx5XG5cdFx0Ly8gYnkgdXNpbmcgZG9jdW1lbnQuaW1wbGVtZW50YXRpb25cblx0XHRpZiAoIHN1cHBvcnQuY3JlYXRlSFRNTERvY3VtZW50ICkge1xuXHRcdFx0Y29udGV4dCA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCggXCJcIiApO1xuXG5cdFx0XHQvLyBTZXQgdGhlIGJhc2UgaHJlZiBmb3IgdGhlIGNyZWF0ZWQgZG9jdW1lbnRcblx0XHRcdC8vIHNvIGFueSBwYXJzZWQgZWxlbWVudHMgd2l0aCBVUkxzXG5cdFx0XHQvLyBhcmUgYmFzZWQgb24gdGhlIGRvY3VtZW50J3MgVVJMIChnaC0yOTY1KVxuXHRcdFx0YmFzZSA9IGNvbnRleHQuY3JlYXRlRWxlbWVudCggXCJiYXNlXCIgKTtcblx0XHRcdGJhc2UuaHJlZiA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XG5cdFx0XHRjb250ZXh0LmhlYWQuYXBwZW5kQ2hpbGQoIGJhc2UgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29udGV4dCA9IGRvY3VtZW50O1xuXHRcdH1cblx0fVxuXG5cdHBhcnNlZCA9IHJzaW5nbGVUYWcuZXhlYyggZGF0YSApO1xuXHRzY3JpcHRzID0gIWtlZXBTY3JpcHRzICYmIFtdO1xuXG5cdC8vIFNpbmdsZSB0YWdcblx0aWYgKCBwYXJzZWQgKSB7XG5cdFx0cmV0dXJuIFsgY29udGV4dC5jcmVhdGVFbGVtZW50KCBwYXJzZWRbIDEgXSApIF07XG5cdH1cblxuXHRwYXJzZWQgPSBidWlsZEZyYWdtZW50KCBbIGRhdGEgXSwgY29udGV4dCwgc2NyaXB0cyApO1xuXG5cdGlmICggc2NyaXB0cyAmJiBzY3JpcHRzLmxlbmd0aCApIHtcblx0XHRqUXVlcnkoIHNjcmlwdHMgKS5yZW1vdmUoKTtcblx0fVxuXG5cdHJldHVybiBqUXVlcnkubWVyZ2UoIFtdLCBwYXJzZWQuY2hpbGROb2RlcyApO1xufTtcblxuXG4vKipcbiAqIExvYWQgYSB1cmwgaW50byBhIHBhZ2VcbiAqL1xualF1ZXJ5LmZuLmxvYWQgPSBmdW5jdGlvbiggdXJsLCBwYXJhbXMsIGNhbGxiYWNrICkge1xuXHR2YXIgc2VsZWN0b3IsIHR5cGUsIHJlc3BvbnNlLFxuXHRcdHNlbGYgPSB0aGlzLFxuXHRcdG9mZiA9IHVybC5pbmRleE9mKCBcIiBcIiApO1xuXG5cdGlmICggb2ZmID4gLTEgKSB7XG5cdFx0c2VsZWN0b3IgPSBzdHJpcEFuZENvbGxhcHNlKCB1cmwuc2xpY2UoIG9mZiApICk7XG5cdFx0dXJsID0gdXJsLnNsaWNlKCAwLCBvZmYgKTtcblx0fVxuXG5cdC8vIElmIGl0J3MgYSBmdW5jdGlvblxuXHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBwYXJhbXMgKSApIHtcblxuXHRcdC8vIFdlIGFzc3VtZSB0aGF0IGl0J3MgdGhlIGNhbGxiYWNrXG5cdFx0Y2FsbGJhY2sgPSBwYXJhbXM7XG5cdFx0cGFyYW1zID0gdW5kZWZpbmVkO1xuXG5cdC8vIE90aGVyd2lzZSwgYnVpbGQgYSBwYXJhbSBzdHJpbmdcblx0fSBlbHNlIGlmICggcGFyYW1zICYmIHR5cGVvZiBwYXJhbXMgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0dHlwZSA9IFwiUE9TVFwiO1xuXHR9XG5cblx0Ly8gSWYgd2UgaGF2ZSBlbGVtZW50cyB0byBtb2RpZnksIG1ha2UgdGhlIHJlcXVlc3Rcblx0aWYgKCBzZWxmLmxlbmd0aCA+IDAgKSB7XG5cdFx0alF1ZXJ5LmFqYXgoIHtcblx0XHRcdHVybDogdXJsLFxuXG5cdFx0XHQvLyBJZiBcInR5cGVcIiB2YXJpYWJsZSBpcyB1bmRlZmluZWQsIHRoZW4gXCJHRVRcIiBtZXRob2Qgd2lsbCBiZSB1c2VkLlxuXHRcdFx0Ly8gTWFrZSB2YWx1ZSBvZiB0aGlzIGZpZWxkIGV4cGxpY2l0IHNpbmNlXG5cdFx0XHQvLyB1c2VyIGNhbiBvdmVycmlkZSBpdCB0aHJvdWdoIGFqYXhTZXR1cCBtZXRob2Rcblx0XHRcdHR5cGU6IHR5cGUgfHwgXCJHRVRcIixcblx0XHRcdGRhdGFUeXBlOiBcImh0bWxcIixcblx0XHRcdGRhdGE6IHBhcmFtc1xuXHRcdH0gKS5kb25lKCBmdW5jdGlvbiggcmVzcG9uc2VUZXh0ICkge1xuXG5cdFx0XHQvLyBTYXZlIHJlc3BvbnNlIGZvciB1c2UgaW4gY29tcGxldGUgY2FsbGJhY2tcblx0XHRcdHJlc3BvbnNlID0gYXJndW1lbnRzO1xuXG5cdFx0XHRzZWxmLmh0bWwoIHNlbGVjdG9yID9cblxuXHRcdFx0XHQvLyBJZiBhIHNlbGVjdG9yIHdhcyBzcGVjaWZpZWQsIGxvY2F0ZSB0aGUgcmlnaHQgZWxlbWVudHMgaW4gYSBkdW1teSBkaXZcblx0XHRcdFx0Ly8gRXhjbHVkZSBzY3JpcHRzIHRvIGF2b2lkIElFICdQZXJtaXNzaW9uIERlbmllZCcgZXJyb3JzXG5cdFx0XHRcdGpRdWVyeSggXCI8ZGl2PlwiICkuYXBwZW5kKCBqUXVlcnkucGFyc2VIVE1MKCByZXNwb25zZVRleHQgKSApLmZpbmQoIHNlbGVjdG9yICkgOlxuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSB1c2UgdGhlIGZ1bGwgcmVzdWx0XG5cdFx0XHRcdHJlc3BvbnNlVGV4dCApO1xuXG5cdFx0Ly8gSWYgdGhlIHJlcXVlc3Qgc3VjY2VlZHMsIHRoaXMgZnVuY3Rpb24gZ2V0cyBcImRhdGFcIiwgXCJzdGF0dXNcIiwgXCJqcVhIUlwiXG5cdFx0Ly8gYnV0IHRoZXkgYXJlIGlnbm9yZWQgYmVjYXVzZSByZXNwb25zZSB3YXMgc2V0IGFib3ZlLlxuXHRcdC8vIElmIGl0IGZhaWxzLCB0aGlzIGZ1bmN0aW9uIGdldHMgXCJqcVhIUlwiLCBcInN0YXR1c1wiLCBcImVycm9yXCJcblx0XHR9ICkuYWx3YXlzKCBjYWxsYmFjayAmJiBmdW5jdGlvbigganFYSFIsIHN0YXR1cyApIHtcblx0XHRcdHNlbGYuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNhbGxiYWNrLmFwcGx5KCB0aGlzLCByZXNwb25zZSB8fCBbIGpxWEhSLnJlc3BvbnNlVGV4dCwgc3RhdHVzLCBqcVhIUiBdICk7XG5cdFx0XHR9ICk7XG5cdFx0fSApO1xuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5cblxuXG4vLyBBdHRhY2ggYSBidW5jaCBvZiBmdW5jdGlvbnMgZm9yIGhhbmRsaW5nIGNvbW1vbiBBSkFYIGV2ZW50c1xualF1ZXJ5LmVhY2goIFtcblx0XCJhamF4U3RhcnRcIixcblx0XCJhamF4U3RvcFwiLFxuXHRcImFqYXhDb21wbGV0ZVwiLFxuXHRcImFqYXhFcnJvclwiLFxuXHRcImFqYXhTdWNjZXNzXCIsXG5cdFwiYWpheFNlbmRcIlxuXSwgZnVuY3Rpb24oIGksIHR5cGUgKSB7XG5cdGpRdWVyeS5mblsgdHlwZSBdID0gZnVuY3Rpb24oIGZuICkge1xuXHRcdHJldHVybiB0aGlzLm9uKCB0eXBlLCBmbiApO1xuXHR9O1xufSApO1xuXG5cblxuXG5qUXVlcnkuZXhwci5wc2V1ZG9zLmFuaW1hdGVkID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdHJldHVybiBqUXVlcnkuZ3JlcCggalF1ZXJ5LnRpbWVycywgZnVuY3Rpb24oIGZuICkge1xuXHRcdHJldHVybiBlbGVtID09PSBmbi5lbGVtO1xuXHR9ICkubGVuZ3RoO1xufTtcblxuXG5cblxualF1ZXJ5Lm9mZnNldCA9IHtcblx0c2V0T2Zmc2V0OiBmdW5jdGlvbiggZWxlbSwgb3B0aW9ucywgaSApIHtcblx0XHR2YXIgY3VyUG9zaXRpb24sIGN1ckxlZnQsIGN1ckNTU1RvcCwgY3VyVG9wLCBjdXJPZmZzZXQsIGN1ckNTU0xlZnQsIGNhbGN1bGF0ZVBvc2l0aW9uLFxuXHRcdFx0cG9zaXRpb24gPSBqUXVlcnkuY3NzKCBlbGVtLCBcInBvc2l0aW9uXCIgKSxcblx0XHRcdGN1ckVsZW0gPSBqUXVlcnkoIGVsZW0gKSxcblx0XHRcdHByb3BzID0ge307XG5cblx0XHQvLyBTZXQgcG9zaXRpb24gZmlyc3QsIGluLWNhc2UgdG9wL2xlZnQgYXJlIHNldCBldmVuIG9uIHN0YXRpYyBlbGVtXG5cdFx0aWYgKCBwb3NpdGlvbiA9PT0gXCJzdGF0aWNcIiApIHtcblx0XHRcdGVsZW0uc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XG5cdFx0fVxuXG5cdFx0Y3VyT2Zmc2V0ID0gY3VyRWxlbS5vZmZzZXQoKTtcblx0XHRjdXJDU1NUb3AgPSBqUXVlcnkuY3NzKCBlbGVtLCBcInRvcFwiICk7XG5cdFx0Y3VyQ1NTTGVmdCA9IGpRdWVyeS5jc3MoIGVsZW0sIFwibGVmdFwiICk7XG5cdFx0Y2FsY3VsYXRlUG9zaXRpb24gPSAoIHBvc2l0aW9uID09PSBcImFic29sdXRlXCIgfHwgcG9zaXRpb24gPT09IFwiZml4ZWRcIiApICYmXG5cdFx0XHQoIGN1ckNTU1RvcCArIGN1ckNTU0xlZnQgKS5pbmRleE9mKCBcImF1dG9cIiApID4gLTE7XG5cblx0XHQvLyBOZWVkIHRvIGJlIGFibGUgdG8gY2FsY3VsYXRlIHBvc2l0aW9uIGlmIGVpdGhlclxuXHRcdC8vIHRvcCBvciBsZWZ0IGlzIGF1dG8gYW5kIHBvc2l0aW9uIGlzIGVpdGhlciBhYnNvbHV0ZSBvciBmaXhlZFxuXHRcdGlmICggY2FsY3VsYXRlUG9zaXRpb24gKSB7XG5cdFx0XHRjdXJQb3NpdGlvbiA9IGN1ckVsZW0ucG9zaXRpb24oKTtcblx0XHRcdGN1clRvcCA9IGN1clBvc2l0aW9uLnRvcDtcblx0XHRcdGN1ckxlZnQgPSBjdXJQb3NpdGlvbi5sZWZ0O1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdGN1clRvcCA9IHBhcnNlRmxvYXQoIGN1ckNTU1RvcCApIHx8IDA7XG5cdFx0XHRjdXJMZWZ0ID0gcGFyc2VGbG9hdCggY3VyQ1NTTGVmdCApIHx8IDA7XG5cdFx0fVxuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggb3B0aW9ucyApICkge1xuXG5cdFx0XHQvLyBVc2UgalF1ZXJ5LmV4dGVuZCBoZXJlIHRvIGFsbG93IG1vZGlmaWNhdGlvbiBvZiBjb29yZGluYXRlcyBhcmd1bWVudCAoZ2gtMTg0OClcblx0XHRcdG9wdGlvbnMgPSBvcHRpb25zLmNhbGwoIGVsZW0sIGksIGpRdWVyeS5leHRlbmQoIHt9LCBjdXJPZmZzZXQgKSApO1xuXHRcdH1cblxuXHRcdGlmICggb3B0aW9ucy50b3AgIT0gbnVsbCApIHtcblx0XHRcdHByb3BzLnRvcCA9ICggb3B0aW9ucy50b3AgLSBjdXJPZmZzZXQudG9wICkgKyBjdXJUb3A7XG5cdFx0fVxuXHRcdGlmICggb3B0aW9ucy5sZWZ0ICE9IG51bGwgKSB7XG5cdFx0XHRwcm9wcy5sZWZ0ID0gKCBvcHRpb25zLmxlZnQgLSBjdXJPZmZzZXQubGVmdCApICsgY3VyTGVmdDtcblx0XHR9XG5cblx0XHRpZiAoIFwidXNpbmdcIiBpbiBvcHRpb25zICkge1xuXHRcdFx0b3B0aW9ucy51c2luZy5jYWxsKCBlbGVtLCBwcm9wcyApO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdGN1ckVsZW0uY3NzKCBwcm9wcyApO1xuXHRcdH1cblx0fVxufTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRvZmZzZXQ6IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXG5cdFx0Ly8gUHJlc2VydmUgY2hhaW5pbmcgZm9yIHNldHRlclxuXHRcdGlmICggYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRcdHJldHVybiBvcHRpb25zID09PSB1bmRlZmluZWQgP1xuXHRcdFx0XHR0aGlzIDpcblx0XHRcdFx0dGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcblx0XHRcdFx0XHRqUXVlcnkub2Zmc2V0LnNldE9mZnNldCggdGhpcywgb3B0aW9ucywgaSApO1xuXHRcdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0dmFyIGRvYywgZG9jRWxlbSwgcmVjdCwgd2luLFxuXHRcdFx0ZWxlbSA9IHRoaXNbIDAgXTtcblxuXHRcdGlmICggIWVsZW0gKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gUmV0dXJuIHplcm9zIGZvciBkaXNjb25uZWN0ZWQgYW5kIGhpZGRlbiAoZGlzcGxheTogbm9uZSkgZWxlbWVudHMgKGdoLTIzMTApXG5cdFx0Ly8gU3VwcG9ydDogSUUgPD0xMSBvbmx5XG5cdFx0Ly8gUnVubmluZyBnZXRCb3VuZGluZ0NsaWVudFJlY3Qgb24gYVxuXHRcdC8vIGRpc2Nvbm5lY3RlZCBub2RlIGluIElFIHRocm93cyBhbiBlcnJvclxuXHRcdGlmICggIWVsZW0uZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggKSB7XG5cdFx0XHRyZXR1cm4geyB0b3A6IDAsIGxlZnQ6IDAgfTtcblx0XHR9XG5cblx0XHRyZWN0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdGRvYyA9IGVsZW0ub3duZXJEb2N1bWVudDtcblx0XHRkb2NFbGVtID0gZG9jLmRvY3VtZW50RWxlbWVudDtcblx0XHR3aW4gPSBkb2MuZGVmYXVsdFZpZXc7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dG9wOiByZWN0LnRvcCArIHdpbi5wYWdlWU9mZnNldCAtIGRvY0VsZW0uY2xpZW50VG9wLFxuXHRcdFx0bGVmdDogcmVjdC5sZWZ0ICsgd2luLnBhZ2VYT2Zmc2V0IC0gZG9jRWxlbS5jbGllbnRMZWZ0XG5cdFx0fTtcblx0fSxcblxuXHRwb3NpdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0aWYgKCAhdGhpc1sgMCBdICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciBvZmZzZXRQYXJlbnQsIG9mZnNldCxcblx0XHRcdGVsZW0gPSB0aGlzWyAwIF0sXG5cdFx0XHRwYXJlbnRPZmZzZXQgPSB7IHRvcDogMCwgbGVmdDogMCB9O1xuXG5cdFx0Ly8gRml4ZWQgZWxlbWVudHMgYXJlIG9mZnNldCBmcm9tIHdpbmRvdyAocGFyZW50T2Zmc2V0ID0ge3RvcDowLCBsZWZ0OiAwfSxcblx0XHQvLyBiZWNhdXNlIGl0IGlzIGl0cyBvbmx5IG9mZnNldCBwYXJlbnRcblx0XHRpZiAoIGpRdWVyeS5jc3MoIGVsZW0sIFwicG9zaXRpb25cIiApID09PSBcImZpeGVkXCIgKSB7XG5cblx0XHRcdC8vIEFzc3VtZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgaXMgdGhlcmUgd2hlbiBjb21wdXRlZCBwb3NpdGlvbiBpcyBmaXhlZFxuXHRcdFx0b2Zmc2V0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIEdldCAqcmVhbCogb2Zmc2V0UGFyZW50XG5cdFx0XHRvZmZzZXRQYXJlbnQgPSB0aGlzLm9mZnNldFBhcmVudCgpO1xuXG5cdFx0XHQvLyBHZXQgY29ycmVjdCBvZmZzZXRzXG5cdFx0XHRvZmZzZXQgPSB0aGlzLm9mZnNldCgpO1xuXHRcdFx0aWYgKCAhbm9kZU5hbWUoIG9mZnNldFBhcmVudFsgMCBdLCBcImh0bWxcIiApICkge1xuXHRcdFx0XHRwYXJlbnRPZmZzZXQgPSBvZmZzZXRQYXJlbnQub2Zmc2V0KCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCBvZmZzZXRQYXJlbnQgYm9yZGVyc1xuXHRcdFx0cGFyZW50T2Zmc2V0ID0ge1xuXHRcdFx0XHR0b3A6IHBhcmVudE9mZnNldC50b3AgKyBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnRbIDAgXSwgXCJib3JkZXJUb3BXaWR0aFwiLCB0cnVlICksXG5cdFx0XHRcdGxlZnQ6IHBhcmVudE9mZnNldC5sZWZ0ICsgalF1ZXJ5LmNzcyggb2Zmc2V0UGFyZW50WyAwIF0sIFwiYm9yZGVyTGVmdFdpZHRoXCIsIHRydWUgKVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyBTdWJ0cmFjdCBwYXJlbnQgb2Zmc2V0cyBhbmQgZWxlbWVudCBtYXJnaW5zXG5cdFx0cmV0dXJuIHtcblx0XHRcdHRvcDogb2Zmc2V0LnRvcCAtIHBhcmVudE9mZnNldC50b3AgLSBqUXVlcnkuY3NzKCBlbGVtLCBcIm1hcmdpblRvcFwiLCB0cnVlICksXG5cdFx0XHRsZWZ0OiBvZmZzZXQubGVmdCAtIHBhcmVudE9mZnNldC5sZWZ0IC0galF1ZXJ5LmNzcyggZWxlbSwgXCJtYXJnaW5MZWZ0XCIsIHRydWUgKVxuXHRcdH07XG5cdH0sXG5cblx0Ly8gVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gZG9jdW1lbnRFbGVtZW50IGluIHRoZSBmb2xsb3dpbmcgY2FzZXM6XG5cdC8vIDEpIEZvciB0aGUgZWxlbWVudCBpbnNpZGUgdGhlIGlmcmFtZSB3aXRob3V0IG9mZnNldFBhcmVudCwgdGhpcyBtZXRob2Qgd2lsbCByZXR1cm5cblx0Ly8gICAgZG9jdW1lbnRFbGVtZW50IG9mIHRoZSBwYXJlbnQgd2luZG93XG5cdC8vIDIpIEZvciB0aGUgaGlkZGVuIG9yIGRldGFjaGVkIGVsZW1lbnRcblx0Ly8gMykgRm9yIGJvZHkgb3IgaHRtbCBlbGVtZW50LCBpLmUuIGluIGNhc2Ugb2YgdGhlIGh0bWwgbm9kZSAtIGl0IHdpbGwgcmV0dXJuIGl0c2VsZlxuXHQvL1xuXHQvLyBidXQgdGhvc2UgZXhjZXB0aW9ucyB3ZXJlIG5ldmVyIHByZXNlbnRlZCBhcyBhIHJlYWwgbGlmZSB1c2UtY2FzZXNcblx0Ly8gYW5kIG1pZ2h0IGJlIGNvbnNpZGVyZWQgYXMgbW9yZSBwcmVmZXJhYmxlIHJlc3VsdHMuXG5cdC8vXG5cdC8vIFRoaXMgbG9naWMsIGhvd2V2ZXIsIGlzIG5vdCBndWFyYW50ZWVkIGFuZCBjYW4gY2hhbmdlIGF0IGFueSBwb2ludCBpbiB0aGUgZnV0dXJlXG5cdG9mZnNldFBhcmVudDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBvZmZzZXRQYXJlbnQgPSB0aGlzLm9mZnNldFBhcmVudDtcblxuXHRcdFx0d2hpbGUgKCBvZmZzZXRQYXJlbnQgJiYgalF1ZXJ5LmNzcyggb2Zmc2V0UGFyZW50LCBcInBvc2l0aW9uXCIgKSA9PT0gXCJzdGF0aWNcIiApIHtcblx0XHRcdFx0b2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50Lm9mZnNldFBhcmVudDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG9mZnNldFBhcmVudCB8fCBkb2N1bWVudEVsZW1lbnQ7XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cbi8vIENyZWF0ZSBzY3JvbGxMZWZ0IGFuZCBzY3JvbGxUb3AgbWV0aG9kc1xualF1ZXJ5LmVhY2goIHsgc2Nyb2xsTGVmdDogXCJwYWdlWE9mZnNldFwiLCBzY3JvbGxUb3A6IFwicGFnZVlPZmZzZXRcIiB9LCBmdW5jdGlvbiggbWV0aG9kLCBwcm9wICkge1xuXHR2YXIgdG9wID0gXCJwYWdlWU9mZnNldFwiID09PSBwcm9wO1xuXG5cdGpRdWVyeS5mblsgbWV0aG9kIF0gPSBmdW5jdGlvbiggdmFsICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCBtZXRob2QsIHZhbCApIHtcblxuXHRcdFx0Ly8gQ29hbGVzY2UgZG9jdW1lbnRzIGFuZCB3aW5kb3dzXG5cdFx0XHR2YXIgd2luO1xuXHRcdFx0aWYgKCBqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSApIHtcblx0XHRcdFx0d2luID0gZWxlbTtcblx0XHRcdH0gZWxzZSBpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdHdpbiA9IGVsZW0uZGVmYXVsdFZpZXc7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggdmFsID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHJldHVybiB3aW4gPyB3aW5bIHByb3AgXSA6IGVsZW1bIG1ldGhvZCBdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHdpbiApIHtcblx0XHRcdFx0d2luLnNjcm9sbFRvKFxuXHRcdFx0XHRcdCF0b3AgPyB2YWwgOiB3aW4ucGFnZVhPZmZzZXQsXG5cdFx0XHRcdFx0dG9wID8gdmFsIDogd2luLnBhZ2VZT2Zmc2V0XG5cdFx0XHRcdCk7XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1bIG1ldGhvZCBdID0gdmFsO1xuXHRcdFx0fVxuXHRcdH0sIG1ldGhvZCwgdmFsLCBhcmd1bWVudHMubGVuZ3RoICk7XG5cdH07XG59ICk7XG5cbi8vIFN1cHBvcnQ6IFNhZmFyaSA8PTcgLSA5LjEsIENocm9tZSA8PTM3IC0gNDlcbi8vIEFkZCB0aGUgdG9wL2xlZnQgY3NzSG9va3MgdXNpbmcgalF1ZXJ5LmZuLnBvc2l0aW9uXG4vLyBXZWJraXQgYnVnOiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MjkwODRcbi8vIEJsaW5rIGJ1ZzogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NTg5MzQ3XG4vLyBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgcGVyY2VudCB3aGVuIHNwZWNpZmllZCBmb3IgdG9wL2xlZnQvYm90dG9tL3JpZ2h0O1xuLy8gcmF0aGVyIHRoYW4gbWFrZSB0aGUgY3NzIG1vZHVsZSBkZXBlbmQgb24gdGhlIG9mZnNldCBtb2R1bGUsIGp1c3QgY2hlY2sgZm9yIGl0IGhlcmVcbmpRdWVyeS5lYWNoKCBbIFwidG9wXCIsIFwibGVmdFwiIF0sIGZ1bmN0aW9uKCBpLCBwcm9wICkge1xuXHRqUXVlcnkuY3NzSG9va3NbIHByb3AgXSA9IGFkZEdldEhvb2tJZiggc3VwcG9ydC5waXhlbFBvc2l0aW9uLFxuXHRcdGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCApIHtcblx0XHRcdGlmICggY29tcHV0ZWQgKSB7XG5cdFx0XHRcdGNvbXB1dGVkID0gY3VyQ1NTKCBlbGVtLCBwcm9wICk7XG5cblx0XHRcdFx0Ly8gSWYgY3VyQ1NTIHJldHVybnMgcGVyY2VudGFnZSwgZmFsbGJhY2sgdG8gb2Zmc2V0XG5cdFx0XHRcdHJldHVybiBybnVtbm9ucHgudGVzdCggY29tcHV0ZWQgKSA/XG5cdFx0XHRcdFx0alF1ZXJ5KCBlbGVtICkucG9zaXRpb24oKVsgcHJvcCBdICsgXCJweFwiIDpcblx0XHRcdFx0XHRjb21wdXRlZDtcblx0XHRcdH1cblx0XHR9XG5cdCk7XG59ICk7XG5cblxuLy8gQ3JlYXRlIGlubmVySGVpZ2h0LCBpbm5lcldpZHRoLCBoZWlnaHQsIHdpZHRoLCBvdXRlckhlaWdodCBhbmQgb3V0ZXJXaWR0aCBtZXRob2RzXG5qUXVlcnkuZWFjaCggeyBIZWlnaHQ6IFwiaGVpZ2h0XCIsIFdpZHRoOiBcIndpZHRoXCIgfSwgZnVuY3Rpb24oIG5hbWUsIHR5cGUgKSB7XG5cdGpRdWVyeS5lYWNoKCB7IHBhZGRpbmc6IFwiaW5uZXJcIiArIG5hbWUsIGNvbnRlbnQ6IHR5cGUsIFwiXCI6IFwib3V0ZXJcIiArIG5hbWUgfSxcblx0XHRmdW5jdGlvbiggZGVmYXVsdEV4dHJhLCBmdW5jTmFtZSApIHtcblxuXHRcdC8vIE1hcmdpbiBpcyBvbmx5IGZvciBvdXRlckhlaWdodCwgb3V0ZXJXaWR0aFxuXHRcdGpRdWVyeS5mblsgZnVuY05hbWUgXSA9IGZ1bmN0aW9uKCBtYXJnaW4sIHZhbHVlICkge1xuXHRcdFx0dmFyIGNoYWluYWJsZSA9IGFyZ3VtZW50cy5sZW5ndGggJiYgKCBkZWZhdWx0RXh0cmEgfHwgdHlwZW9mIG1hcmdpbiAhPT0gXCJib29sZWFuXCIgKSxcblx0XHRcdFx0ZXh0cmEgPSBkZWZhdWx0RXh0cmEgfHwgKCBtYXJnaW4gPT09IHRydWUgfHwgdmFsdWUgPT09IHRydWUgPyBcIm1hcmdpblwiIDogXCJib3JkZXJcIiApO1xuXG5cdFx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgdHlwZSwgdmFsdWUgKSB7XG5cdFx0XHRcdHZhciBkb2M7XG5cblx0XHRcdFx0aWYgKCBqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSApIHtcblxuXHRcdFx0XHRcdC8vICQoIHdpbmRvdyApLm91dGVyV2lkdGgvSGVpZ2h0IHJldHVybiB3L2ggaW5jbHVkaW5nIHNjcm9sbGJhcnMgKGdoLTE3MjkpXG5cdFx0XHRcdFx0cmV0dXJuIGZ1bmNOYW1lLmluZGV4T2YoIFwib3V0ZXJcIiApID09PSAwID9cblx0XHRcdFx0XHRcdGVsZW1bIFwiaW5uZXJcIiArIG5hbWUgXSA6XG5cdFx0XHRcdFx0XHRlbGVtLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudFsgXCJjbGllbnRcIiArIG5hbWUgXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEdldCBkb2N1bWVudCB3aWR0aCBvciBoZWlnaHRcblx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHRcdGRvYyA9IGVsZW0uZG9jdW1lbnRFbGVtZW50O1xuXG5cdFx0XHRcdFx0Ly8gRWl0aGVyIHNjcm9sbFtXaWR0aC9IZWlnaHRdIG9yIG9mZnNldFtXaWR0aC9IZWlnaHRdIG9yIGNsaWVudFtXaWR0aC9IZWlnaHRdLFxuXHRcdFx0XHRcdC8vIHdoaWNoZXZlciBpcyBncmVhdGVzdFxuXHRcdFx0XHRcdHJldHVybiBNYXRoLm1heChcblx0XHRcdFx0XHRcdGVsZW0uYm9keVsgXCJzY3JvbGxcIiArIG5hbWUgXSwgZG9jWyBcInNjcm9sbFwiICsgbmFtZSBdLFxuXHRcdFx0XHRcdFx0ZWxlbS5ib2R5WyBcIm9mZnNldFwiICsgbmFtZSBdLCBkb2NbIFwib2Zmc2V0XCIgKyBuYW1lIF0sXG5cdFx0XHRcdFx0XHRkb2NbIFwiY2xpZW50XCIgKyBuYW1lIF1cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgP1xuXG5cdFx0XHRcdFx0Ly8gR2V0IHdpZHRoIG9yIGhlaWdodCBvbiB0aGUgZWxlbWVudCwgcmVxdWVzdGluZyBidXQgbm90IGZvcmNpbmcgcGFyc2VGbG9hdFxuXHRcdFx0XHRcdGpRdWVyeS5jc3MoIGVsZW0sIHR5cGUsIGV4dHJhICkgOlxuXG5cdFx0XHRcdFx0Ly8gU2V0IHdpZHRoIG9yIGhlaWdodCBvbiB0aGUgZWxlbWVudFxuXHRcdFx0XHRcdGpRdWVyeS5zdHlsZSggZWxlbSwgdHlwZSwgdmFsdWUsIGV4dHJhICk7XG5cdFx0XHR9LCB0eXBlLCBjaGFpbmFibGUgPyBtYXJnaW4gOiB1bmRlZmluZWQsIGNoYWluYWJsZSApO1xuXHRcdH07XG5cdH0gKTtcbn0gKTtcblxuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cblx0YmluZDogZnVuY3Rpb24oIHR5cGVzLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gdGhpcy5vbiggdHlwZXMsIG51bGwsIGRhdGEsIGZuICk7XG5cdH0sXG5cdHVuYmluZDogZnVuY3Rpb24oIHR5cGVzLCBmbiApIHtcblx0XHRyZXR1cm4gdGhpcy5vZmYoIHR5cGVzLCBudWxsLCBmbiApO1xuXHR9LFxuXG5cdGRlbGVnYXRlOiBmdW5jdGlvbiggc2VsZWN0b3IsIHR5cGVzLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gdGhpcy5vbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApO1xuXHR9LFxuXHR1bmRlbGVnYXRlOiBmdW5jdGlvbiggc2VsZWN0b3IsIHR5cGVzLCBmbiApIHtcblxuXHRcdC8vICggbmFtZXNwYWNlICkgb3IgKCBzZWxlY3RvciwgdHlwZXMgWywgZm5dIClcblx0XHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/XG5cdFx0XHR0aGlzLm9mZiggc2VsZWN0b3IsIFwiKipcIiApIDpcblx0XHRcdHRoaXMub2ZmKCB0eXBlcywgc2VsZWN0b3IgfHwgXCIqKlwiLCBmbiApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5ob2xkUmVhZHkgPSBmdW5jdGlvbiggaG9sZCApIHtcblx0aWYgKCBob2xkICkge1xuXHRcdGpRdWVyeS5yZWFkeVdhaXQrKztcblx0fSBlbHNlIHtcblx0XHRqUXVlcnkucmVhZHkoIHRydWUgKTtcblx0fVxufTtcbmpRdWVyeS5pc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbmpRdWVyeS5wYXJzZUpTT04gPSBKU09OLnBhcnNlO1xualF1ZXJ5Lm5vZGVOYW1lID0gbm9kZU5hbWU7XG5cblxuXG5cbi8vIFJlZ2lzdGVyIGFzIGEgbmFtZWQgQU1EIG1vZHVsZSwgc2luY2UgalF1ZXJ5IGNhbiBiZSBjb25jYXRlbmF0ZWQgd2l0aCBvdGhlclxuLy8gZmlsZXMgdGhhdCBtYXkgdXNlIGRlZmluZSwgYnV0IG5vdCB2aWEgYSBwcm9wZXIgY29uY2F0ZW5hdGlvbiBzY3JpcHQgdGhhdFxuLy8gdW5kZXJzdGFuZHMgYW5vbnltb3VzIEFNRCBtb2R1bGVzLiBBIG5hbWVkIEFNRCBpcyBzYWZlc3QgYW5kIG1vc3Qgcm9idXN0XG4vLyB3YXkgdG8gcmVnaXN0ZXIuIExvd2VyY2FzZSBqcXVlcnkgaXMgdXNlZCBiZWNhdXNlIEFNRCBtb2R1bGUgbmFtZXMgYXJlXG4vLyBkZXJpdmVkIGZyb20gZmlsZSBuYW1lcywgYW5kIGpRdWVyeSBpcyBub3JtYWxseSBkZWxpdmVyZWQgaW4gYSBsb3dlcmNhc2Vcbi8vIGZpbGUgbmFtZS4gRG8gdGhpcyBhZnRlciBjcmVhdGluZyB0aGUgZ2xvYmFsIHNvIHRoYXQgaWYgYW4gQU1EIG1vZHVsZSB3YW50c1xuLy8gdG8gY2FsbCBub0NvbmZsaWN0IHRvIGhpZGUgdGhpcyB2ZXJzaW9uIG9mIGpRdWVyeSwgaXQgd2lsbCB3b3JrLlxuXG4vLyBOb3RlIHRoYXQgZm9yIG1heGltdW0gcG9ydGFiaWxpdHksIGxpYnJhcmllcyB0aGF0IGFyZSBub3QgalF1ZXJ5IHNob3VsZFxuLy8gZGVjbGFyZSB0aGVtc2VsdmVzIGFzIGFub255bW91cyBtb2R1bGVzLCBhbmQgYXZvaWQgc2V0dGluZyBhIGdsb2JhbCBpZiBhblxuLy8gQU1EIGxvYWRlciBpcyBwcmVzZW50LiBqUXVlcnkgaXMgYSBzcGVjaWFsIGNhc2UuIEZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qcmJ1cmtlL3JlcXVpcmVqcy93aWtpL1VwZGF0aW5nLWV4aXN0aW5nLWxpYnJhcmllcyN3aWtpLWFub25cblxuaWYgKCB0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCApIHtcblx0ZGVmaW5lKCBcImpxdWVyeVwiLCBbXSwgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGpRdWVyeTtcblx0fSApO1xufVxuXG5cblxuXG52YXJcblxuXHQvLyBNYXAgb3ZlciBqUXVlcnkgaW4gY2FzZSBvZiBvdmVyd3JpdGVcblx0X2pRdWVyeSA9IHdpbmRvdy5qUXVlcnksXG5cblx0Ly8gTWFwIG92ZXIgdGhlICQgaW4gY2FzZSBvZiBvdmVyd3JpdGVcblx0XyQgPSB3aW5kb3cuJDtcblxualF1ZXJ5Lm5vQ29uZmxpY3QgPSBmdW5jdGlvbiggZGVlcCApIHtcblx0aWYgKCB3aW5kb3cuJCA9PT0galF1ZXJ5ICkge1xuXHRcdHdpbmRvdy4kID0gXyQ7XG5cdH1cblxuXHRpZiAoIGRlZXAgJiYgd2luZG93LmpRdWVyeSA9PT0galF1ZXJ5ICkge1xuXHRcdHdpbmRvdy5qUXVlcnkgPSBfalF1ZXJ5O1xuXHR9XG5cblx0cmV0dXJuIGpRdWVyeTtcbn07XG5cbi8vIEV4cG9zZSBqUXVlcnkgYW5kICQgaWRlbnRpZmllcnMsIGV2ZW4gaW4gQU1EXG4vLyAoIzcxMDIjY29tbWVudDoxMCwgaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvcHVsbC81NTcpXG4vLyBhbmQgQ29tbW9uSlMgZm9yIGJyb3dzZXIgZW11bGF0b3JzICgjMTM1NjYpXG5pZiAoICFub0dsb2JhbCApIHtcblx0d2luZG93LmpRdWVyeSA9IHdpbmRvdy4kID0galF1ZXJ5O1xufVxuXG5cblxuXG5yZXR1cm4galF1ZXJ5O1xufSApO1xuIl19
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3ZlbmRvci9qcXVlcnkvanF1ZXJ5LmpzIl0sIm5hbWVzIjpbImdsb2JhbCIsImZhY3RvcnkiLCJtb2R1bGUiLCJleHBvcnRzIiwiZG9jdW1lbnQiLCJ3IiwiRXJyb3IiLCJ3aW5kb3ciLCJub0dsb2JhbCIsImFyciIsImdldFByb3RvIiwiT2JqZWN0IiwiZ2V0UHJvdG90eXBlT2YiLCJzbGljZSIsImNvbmNhdCIsInB1c2giLCJpbmRleE9mIiwiY2xhc3MydHlwZSIsInRvU3RyaW5nIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJmblRvU3RyaW5nIiwiT2JqZWN0RnVuY3Rpb25TdHJpbmciLCJjYWxsIiwic3VwcG9ydCIsIkRPTUV2YWwiLCJjb2RlIiwiZG9jIiwic2NyaXB0IiwiY3JlYXRlRWxlbWVudCIsInRleHQiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJ2ZXJzaW9uIiwialF1ZXJ5Iiwic2VsZWN0b3IiLCJjb250ZXh0IiwiZm4iLCJpbml0IiwicnRyaW0iLCJybXNQcmVmaXgiLCJyZGFzaEFscGhhIiwiZmNhbWVsQ2FzZSIsImFsbCIsImxldHRlciIsInRvVXBwZXJDYXNlIiwicHJvdG90eXBlIiwianF1ZXJ5IiwiY29uc3RydWN0b3IiLCJsZW5ndGgiLCJ0b0FycmF5IiwiZ2V0IiwibnVtIiwicHVzaFN0YWNrIiwiZWxlbXMiLCJyZXQiLCJtZXJnZSIsInByZXZPYmplY3QiLCJlYWNoIiwiY2FsbGJhY2siLCJtYXAiLCJlbGVtIiwiaSIsImFwcGx5IiwiYXJndW1lbnRzIiwiZmlyc3QiLCJlcSIsImxhc3QiLCJsZW4iLCJqIiwiZW5kIiwic29ydCIsInNwbGljZSIsImV4dGVuZCIsIm9wdGlvbnMiLCJuYW1lIiwic3JjIiwiY29weSIsImNvcHlJc0FycmF5IiwiY2xvbmUiLCJ0YXJnZXQiLCJkZWVwIiwiaXNGdW5jdGlvbiIsImlzUGxhaW5PYmplY3QiLCJBcnJheSIsImlzQXJyYXkiLCJ1bmRlZmluZWQiLCJleHBhbmRvIiwiTWF0aCIsInJhbmRvbSIsInJlcGxhY2UiLCJpc1JlYWR5IiwiZXJyb3IiLCJtc2ciLCJub29wIiwib2JqIiwidHlwZSIsImlzV2luZG93IiwiaXNOdW1lcmljIiwiaXNOYU4iLCJwYXJzZUZsb2F0IiwicHJvdG8iLCJDdG9yIiwiaXNFbXB0eU9iamVjdCIsImdsb2JhbEV2YWwiLCJjYW1lbENhc2UiLCJzdHJpbmciLCJpc0FycmF5TGlrZSIsInRyaW0iLCJtYWtlQXJyYXkiLCJyZXN1bHRzIiwiaW5BcnJheSIsInNlY29uZCIsImdyZXAiLCJpbnZlcnQiLCJjYWxsYmFja0ludmVyc2UiLCJtYXRjaGVzIiwiY2FsbGJhY2tFeHBlY3QiLCJhcmciLCJ2YWx1ZSIsImd1aWQiLCJwcm94eSIsInRtcCIsImFyZ3MiLCJub3ciLCJEYXRlIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJzcGxpdCIsInRvTG93ZXJDYXNlIiwiU2l6emxlIiwiRXhwciIsImdldFRleHQiLCJpc1hNTCIsInRva2VuaXplIiwiY29tcGlsZSIsInNlbGVjdCIsIm91dGVybW9zdENvbnRleHQiLCJzb3J0SW5wdXQiLCJoYXNEdXBsaWNhdGUiLCJzZXREb2N1bWVudCIsImRvY0VsZW0iLCJkb2N1bWVudElzSFRNTCIsInJidWdneVFTQSIsInJidWdneU1hdGNoZXMiLCJjb250YWlucyIsInByZWZlcnJlZERvYyIsImRpcnJ1bnMiLCJkb25lIiwiY2xhc3NDYWNoZSIsImNyZWF0ZUNhY2hlIiwidG9rZW5DYWNoZSIsImNvbXBpbGVyQ2FjaGUiLCJzb3J0T3JkZXIiLCJhIiwiYiIsInBvcCIsInB1c2hfbmF0aXZlIiwibGlzdCIsImJvb2xlYW5zIiwid2hpdGVzcGFjZSIsImlkZW50aWZpZXIiLCJhdHRyaWJ1dGVzIiwicHNldWRvcyIsInJ3aGl0ZXNwYWNlIiwiUmVnRXhwIiwicmNvbW1hIiwicmNvbWJpbmF0b3JzIiwicmF0dHJpYnV0ZVF1b3RlcyIsInJwc2V1ZG8iLCJyaWRlbnRpZmllciIsIm1hdGNoRXhwciIsInJpbnB1dHMiLCJyaGVhZGVyIiwicm5hdGl2ZSIsInJxdWlja0V4cHIiLCJyc2libGluZyIsInJ1bmVzY2FwZSIsImZ1bmVzY2FwZSIsIl8iLCJlc2NhcGVkIiwiZXNjYXBlZFdoaXRlc3BhY2UiLCJoaWdoIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwicmNzc2VzY2FwZSIsImZjc3Nlc2NhcGUiLCJjaCIsImFzQ29kZVBvaW50IiwiY2hhckNvZGVBdCIsInVubG9hZEhhbmRsZXIiLCJkaXNhYmxlZEFuY2VzdG9yIiwiYWRkQ29tYmluYXRvciIsImRpc2FibGVkIiwiZGlyIiwibmV4dCIsImNoaWxkTm9kZXMiLCJub2RlVHlwZSIsImUiLCJlbHMiLCJzZWVkIiwibSIsIm5pZCIsIm1hdGNoIiwiZ3JvdXBzIiwibmV3U2VsZWN0b3IiLCJuZXdDb250ZXh0Iiwib3duZXJEb2N1bWVudCIsImV4ZWMiLCJnZXRFbGVtZW50QnlJZCIsImlkIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwicXNhIiwidGVzdCIsIm5vZGVOYW1lIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidG9TZWxlY3RvciIsImpvaW4iLCJ0ZXN0Q29udGV4dCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJxc2FFcnJvciIsInJlbW92ZUF0dHJpYnV0ZSIsImtleXMiLCJjYWNoZSIsImtleSIsImNhY2hlTGVuZ3RoIiwic2hpZnQiLCJtYXJrRnVuY3Rpb24iLCJhc3NlcnQiLCJlbCIsImFkZEhhbmRsZSIsImF0dHJzIiwiaGFuZGxlciIsImF0dHJIYW5kbGUiLCJzaWJsaW5nQ2hlY2siLCJjdXIiLCJkaWZmIiwic291cmNlSW5kZXgiLCJuZXh0U2libGluZyIsImNyZWF0ZUlucHV0UHNldWRvIiwiY3JlYXRlQnV0dG9uUHNldWRvIiwiY3JlYXRlRGlzYWJsZWRQc2V1ZG8iLCJpc0Rpc2FibGVkIiwiY3JlYXRlUG9zaXRpb25hbFBzZXVkbyIsImFyZ3VtZW50IiwibWF0Y2hJbmRleGVzIiwiZG9jdW1lbnRFbGVtZW50Iiwibm9kZSIsImhhc0NvbXBhcmUiLCJzdWJXaW5kb3ciLCJkZWZhdWx0VmlldyIsInRvcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRhY2hFdmVudCIsImNsYXNzTmFtZSIsImNyZWF0ZUNvbW1lbnQiLCJnZXRCeUlkIiwiZ2V0RWxlbWVudHNCeU5hbWUiLCJmaWx0ZXIiLCJhdHRySWQiLCJmaW5kIiwiZ2V0QXR0cmlidXRlTm9kZSIsInRhZyIsImlubmVySFRNTCIsImlucHV0IiwibWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwibW96TWF0Y2hlc1NlbGVjdG9yIiwib01hdGNoZXNTZWxlY3RvciIsIm1zTWF0Y2hlc1NlbGVjdG9yIiwiZGlzY29ubmVjdGVkTWF0Y2giLCJjb21wYXJlRG9jdW1lbnRQb3NpdGlvbiIsImFkb3duIiwiYnVwIiwiY29tcGFyZSIsInNvcnREZXRhY2hlZCIsImF1cCIsImFwIiwiYnAiLCJ1bnNoaWZ0IiwiZXhwciIsImVsZW1lbnRzIiwiYXR0ciIsInZhbCIsInNwZWNpZmllZCIsImVzY2FwZSIsInNlbCIsInVuaXF1ZVNvcnQiLCJkdXBsaWNhdGVzIiwiZGV0ZWN0RHVwbGljYXRlcyIsInNvcnRTdGFibGUiLCJ0ZXh0Q29udGVudCIsImZpcnN0Q2hpbGQiLCJub2RlVmFsdWUiLCJzZWxlY3RvcnMiLCJjcmVhdGVQc2V1ZG8iLCJyZWxhdGl2ZSIsInByZUZpbHRlciIsImV4Y2VzcyIsInVucXVvdGVkIiwibm9kZU5hbWVTZWxlY3RvciIsInBhdHRlcm4iLCJvcGVyYXRvciIsImNoZWNrIiwicmVzdWx0Iiwid2hhdCIsInNpbXBsZSIsImZvcndhcmQiLCJvZlR5cGUiLCJ4bWwiLCJ1bmlxdWVDYWNoZSIsIm91dGVyQ2FjaGUiLCJub2RlSW5kZXgiLCJzdGFydCIsInBhcmVudCIsInVzZUNhY2hlIiwibGFzdENoaWxkIiwidW5pcXVlSUQiLCJwc2V1ZG8iLCJzZXRGaWx0ZXJzIiwiaWR4IiwibWF0Y2hlZCIsIm1hdGNoZXIiLCJ1bm1hdGNoZWQiLCJpbm5lclRleHQiLCJsYW5nIiwiZWxlbUxhbmciLCJoYXNoIiwibG9jYXRpb24iLCJhY3RpdmVFbGVtZW50IiwiaGFzRm9jdXMiLCJocmVmIiwidGFiSW5kZXgiLCJjaGVja2VkIiwic2VsZWN0ZWQiLCJzZWxlY3RlZEluZGV4IiwicmFkaW8iLCJjaGVja2JveCIsImZpbGUiLCJwYXNzd29yZCIsImltYWdlIiwic3VibWl0IiwicmVzZXQiLCJmaWx0ZXJzIiwicGFyc2VPbmx5IiwidG9rZW5zIiwic29GYXIiLCJwcmVGaWx0ZXJzIiwiY2FjaGVkIiwiY29tYmluYXRvciIsImJhc2UiLCJza2lwIiwiY2hlY2tOb25FbGVtZW50cyIsImRvbmVOYW1lIiwib2xkQ2FjaGUiLCJuZXdDYWNoZSIsImVsZW1lbnRNYXRjaGVyIiwibWF0Y2hlcnMiLCJtdWx0aXBsZUNvbnRleHRzIiwiY29udGV4dHMiLCJjb25kZW5zZSIsIm5ld1VubWF0Y2hlZCIsIm1hcHBlZCIsInNldE1hdGNoZXIiLCJwb3N0RmlsdGVyIiwicG9zdEZpbmRlciIsInBvc3RTZWxlY3RvciIsInRlbXAiLCJwcmVNYXAiLCJwb3N0TWFwIiwicHJlZXhpc3RpbmciLCJtYXRjaGVySW4iLCJtYXRjaGVyT3V0IiwibWF0Y2hlckZyb21Ub2tlbnMiLCJjaGVja0NvbnRleHQiLCJsZWFkaW5nUmVsYXRpdmUiLCJpbXBsaWNpdFJlbGF0aXZlIiwibWF0Y2hDb250ZXh0IiwibWF0Y2hBbnlDb250ZXh0IiwibWF0Y2hlckZyb21Hcm91cE1hdGNoZXJzIiwiZWxlbWVudE1hdGNoZXJzIiwic2V0TWF0Y2hlcnMiLCJieVNldCIsImJ5RWxlbWVudCIsInN1cGVyTWF0Y2hlciIsIm91dGVybW9zdCIsIm1hdGNoZWRDb3VudCIsInNldE1hdGNoZWQiLCJjb250ZXh0QmFja3VwIiwiZGlycnVuc1VuaXF1ZSIsInRva2VuIiwiY29tcGlsZWQiLCJkZWZhdWx0VmFsdWUiLCJ1bmlxdWUiLCJpc1hNTERvYyIsImVzY2FwZVNlbGVjdG9yIiwidW50aWwiLCJ0cnVuY2F0ZSIsImlzIiwic2libGluZ3MiLCJuIiwicm5lZWRzQ29udGV4dCIsIm5lZWRzQ29udGV4dCIsInJzaW5nbGVUYWciLCJyaXNTaW1wbGUiLCJ3aW5ub3ciLCJxdWFsaWZpZXIiLCJub3QiLCJzZWxmIiwicm9vdGpRdWVyeSIsInJvb3QiLCJwYXJzZUhUTUwiLCJyZWFkeSIsInJwYXJlbnRzcHJldiIsImd1YXJhbnRlZWRVbmlxdWUiLCJjaGlsZHJlbiIsImNvbnRlbnRzIiwicHJldiIsImhhcyIsInRhcmdldHMiLCJsIiwiY2xvc2VzdCIsImluZGV4IiwicHJldkFsbCIsImFkZCIsImFkZEJhY2siLCJzaWJsaW5nIiwicGFyZW50cyIsInBhcmVudHNVbnRpbCIsIm5leHRBbGwiLCJuZXh0VW50aWwiLCJwcmV2VW50aWwiLCJjb250ZW50RG9jdW1lbnQiLCJjb250ZW50IiwicmV2ZXJzZSIsInJub3RodG1sd2hpdGUiLCJjcmVhdGVPcHRpb25zIiwib2JqZWN0IiwiZmxhZyIsIkNhbGxiYWNrcyIsImZpcmluZyIsIm1lbW9yeSIsImZpcmVkIiwibG9ja2VkIiwicXVldWUiLCJmaXJpbmdJbmRleCIsImZpcmUiLCJvbmNlIiwic3RvcE9uRmFsc2UiLCJyZW1vdmUiLCJlbXB0eSIsImRpc2FibGUiLCJsb2NrIiwiZmlyZVdpdGgiLCJJZGVudGl0eSIsInYiLCJUaHJvd2VyIiwiZXgiLCJhZG9wdFZhbHVlIiwicmVzb2x2ZSIsInJlamVjdCIsIm5vVmFsdWUiLCJtZXRob2QiLCJwcm9taXNlIiwiZmFpbCIsInRoZW4iLCJEZWZlcnJlZCIsImZ1bmMiLCJ0dXBsZXMiLCJzdGF0ZSIsImFsd2F5cyIsImRlZmVycmVkIiwicGlwZSIsImZucyIsIm5ld0RlZmVyIiwidHVwbGUiLCJyZXR1cm5lZCIsInByb2dyZXNzIiwibm90aWZ5Iiwib25GdWxmaWxsZWQiLCJvblJlamVjdGVkIiwib25Qcm9ncmVzcyIsIm1heERlcHRoIiwiZGVwdGgiLCJzcGVjaWFsIiwidGhhdCIsIm1pZ2h0VGhyb3ciLCJUeXBlRXJyb3IiLCJub3RpZnlXaXRoIiwicmVzb2x2ZVdpdGgiLCJwcm9jZXNzIiwiZXhjZXB0aW9uSG9vayIsInN0YWNrVHJhY2UiLCJyZWplY3RXaXRoIiwiZ2V0U3RhY2tIb29rIiwic2V0VGltZW91dCIsInN0YXRlU3RyaW5nIiwid2hlbiIsInNpbmdsZVZhbHVlIiwicmVtYWluaW5nIiwicmVzb2x2ZUNvbnRleHRzIiwicmVzb2x2ZVZhbHVlcyIsIm1hc3RlciIsInVwZGF0ZUZ1bmMiLCJyZXJyb3JOYW1lcyIsInN0YWNrIiwiY29uc29sZSIsIndhcm4iLCJtZXNzYWdlIiwicmVhZHlFeGNlcHRpb24iLCJyZWFkeUxpc3QiLCJjYXRjaCIsInJlYWR5V2FpdCIsIndhaXQiLCJjb21wbGV0ZWQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVhZHlTdGF0ZSIsImRvU2Nyb2xsIiwiYWNjZXNzIiwiY2hhaW5hYmxlIiwiZW1wdHlHZXQiLCJyYXciLCJidWxrIiwiYWNjZXB0RGF0YSIsIm93bmVyIiwiRGF0YSIsInVpZCIsImRlZmluZVByb3BlcnR5IiwiY29uZmlndXJhYmxlIiwic2V0IiwiZGF0YSIsInByb3AiLCJoYXNEYXRhIiwiZGF0YVByaXYiLCJkYXRhVXNlciIsInJicmFjZSIsInJtdWx0aURhc2giLCJnZXREYXRhIiwiSlNPTiIsInBhcnNlIiwiZGF0YUF0dHIiLCJyZW1vdmVEYXRhIiwiX2RhdGEiLCJfcmVtb3ZlRGF0YSIsImRlcXVldWUiLCJzdGFydExlbmd0aCIsImhvb2tzIiwiX3F1ZXVlSG9va3MiLCJzdG9wIiwic2V0dGVyIiwiY2xlYXJRdWV1ZSIsImNvdW50IiwiZGVmZXIiLCJwbnVtIiwic291cmNlIiwicmNzc051bSIsImNzc0V4cGFuZCIsImlzSGlkZGVuV2l0aGluVHJlZSIsInN0eWxlIiwiZGlzcGxheSIsImNzcyIsInN3YXAiLCJvbGQiLCJhZGp1c3RDU1MiLCJ2YWx1ZVBhcnRzIiwidHdlZW4iLCJhZGp1c3RlZCIsInNjYWxlIiwibWF4SXRlcmF0aW9ucyIsImN1cnJlbnRWYWx1ZSIsImluaXRpYWwiLCJ1bml0IiwiY3NzTnVtYmVyIiwiaW5pdGlhbEluVW5pdCIsImRlZmF1bHREaXNwbGF5TWFwIiwiZ2V0RGVmYXVsdERpc3BsYXkiLCJib2R5Iiwic2hvd0hpZGUiLCJzaG93IiwidmFsdWVzIiwiaGlkZSIsInRvZ2dsZSIsInJjaGVja2FibGVUeXBlIiwicnRhZ05hbWUiLCJyc2NyaXB0VHlwZSIsIndyYXBNYXAiLCJvcHRpb24iLCJ0aGVhZCIsImNvbCIsInRyIiwidGQiLCJfZGVmYXVsdCIsIm9wdGdyb3VwIiwidGJvZHkiLCJ0Zm9vdCIsImNvbGdyb3VwIiwiY2FwdGlvbiIsInRoIiwiZ2V0QWxsIiwic2V0R2xvYmFsRXZhbCIsInJlZkVsZW1lbnRzIiwicmh0bWwiLCJidWlsZEZyYWdtZW50Iiwic2NyaXB0cyIsInNlbGVjdGlvbiIsImlnbm9yZWQiLCJ3cmFwIiwiZnJhZ21lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50Iiwibm9kZXMiLCJjcmVhdGVUZXh0Tm9kZSIsImh0bWxQcmVmaWx0ZXIiLCJkaXYiLCJjaGVja0Nsb25lIiwiY2xvbmVOb2RlIiwibm9DbG9uZUNoZWNrZWQiLCJya2V5RXZlbnQiLCJybW91c2VFdmVudCIsInJ0eXBlbmFtZXNwYWNlIiwicmV0dXJuVHJ1ZSIsInJldHVybkZhbHNlIiwic2FmZUFjdGl2ZUVsZW1lbnQiLCJlcnIiLCJvbiIsInR5cGVzIiwib25lIiwib3JpZ0ZuIiwiZXZlbnQiLCJvZmYiLCJoYW5kbGVPYmpJbiIsImV2ZW50SGFuZGxlIiwiZXZlbnRzIiwidCIsImhhbmRsZU9iaiIsImhhbmRsZXJzIiwibmFtZXNwYWNlcyIsIm9yaWdUeXBlIiwiZWxlbURhdGEiLCJoYW5kbGUiLCJ0cmlnZ2VyZWQiLCJkaXNwYXRjaCIsImRlbGVnYXRlVHlwZSIsImJpbmRUeXBlIiwibmFtZXNwYWNlIiwiZGVsZWdhdGVDb3VudCIsInNldHVwIiwibWFwcGVkVHlwZXMiLCJvcmlnQ291bnQiLCJ0ZWFyZG93biIsInJlbW92ZUV2ZW50IiwibmF0aXZlRXZlbnQiLCJmaXgiLCJoYW5kbGVyUXVldWUiLCJkZWxlZ2F0ZVRhcmdldCIsInByZURpc3BhdGNoIiwiaXNQcm9wYWdhdGlvblN0b3BwZWQiLCJjdXJyZW50VGFyZ2V0IiwiaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQiLCJybmFtZXNwYWNlIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJwb3N0RGlzcGF0Y2giLCJtYXRjaGVkSGFuZGxlcnMiLCJtYXRjaGVkU2VsZWN0b3JzIiwiYnV0dG9uIiwiYWRkUHJvcCIsImhvb2siLCJFdmVudCIsImVudW1lcmFibGUiLCJvcmlnaW5hbEV2ZW50Iiwid3JpdGFibGUiLCJsb2FkIiwibm9CdWJibGUiLCJmb2N1cyIsInRyaWdnZXIiLCJibHVyIiwiY2xpY2siLCJiZWZvcmV1bmxvYWQiLCJyZXR1cm5WYWx1ZSIsInByb3BzIiwiaXNEZWZhdWx0UHJldmVudGVkIiwiZGVmYXVsdFByZXZlbnRlZCIsInJlbGF0ZWRUYXJnZXQiLCJ0aW1lU3RhbXAiLCJpc1NpbXVsYXRlZCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsImFsdEtleSIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiY2hhbmdlZFRvdWNoZXMiLCJjdHJsS2V5IiwiZGV0YWlsIiwiZXZlbnRQaGFzZSIsIm1ldGFLZXkiLCJwYWdlWCIsInBhZ2VZIiwic2hpZnRLZXkiLCJ2aWV3IiwiY2hhckNvZGUiLCJrZXlDb2RlIiwiYnV0dG9ucyIsImNsaWVudFgiLCJjbGllbnRZIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJwb2ludGVySWQiLCJwb2ludGVyVHlwZSIsInNjcmVlblgiLCJzY3JlZW5ZIiwidGFyZ2V0VG91Y2hlcyIsInRvRWxlbWVudCIsInRvdWNoZXMiLCJ3aGljaCIsIm1vdXNlZW50ZXIiLCJtb3VzZWxlYXZlIiwicG9pbnRlcmVudGVyIiwicG9pbnRlcmxlYXZlIiwib3JpZyIsInJlbGF0ZWQiLCJyeGh0bWxUYWciLCJybm9Jbm5lcmh0bWwiLCJyY2hlY2tlZCIsInJzY3JpcHRUeXBlTWFza2VkIiwicmNsZWFuU2NyaXB0IiwibWFuaXB1bGF0aW9uVGFyZ2V0IiwiZGlzYWJsZVNjcmlwdCIsInJlc3RvcmVTY3JpcHQiLCJjbG9uZUNvcHlFdmVudCIsImRlc3QiLCJwZGF0YU9sZCIsInBkYXRhQ3VyIiwidWRhdGFPbGQiLCJ1ZGF0YUN1ciIsImZpeElucHV0IiwiZG9tTWFuaXAiLCJjb2xsZWN0aW9uIiwiaGFzU2NyaXB0cyIsImlOb0Nsb25lIiwiaHRtbCIsIl9ldmFsVXJsIiwia2VlcERhdGEiLCJjbGVhbkRhdGEiLCJkYXRhQW5kRXZlbnRzIiwiZGVlcERhdGFBbmRFdmVudHMiLCJzcmNFbGVtZW50cyIsImRlc3RFbGVtZW50cyIsImluUGFnZSIsImRldGFjaCIsImFwcGVuZCIsInByZXBlbmQiLCJpbnNlcnRCZWZvcmUiLCJiZWZvcmUiLCJhZnRlciIsInJlcGxhY2VXaXRoIiwicmVwbGFjZUNoaWxkIiwiYXBwZW5kVG8iLCJwcmVwZW5kVG8iLCJpbnNlcnRBZnRlciIsInJlcGxhY2VBbGwiLCJvcmlnaW5hbCIsImluc2VydCIsInJtYXJnaW4iLCJybnVtbm9ucHgiLCJnZXRTdHlsZXMiLCJvcGVuZXIiLCJnZXRDb21wdXRlZFN0eWxlIiwiY29tcHV0ZVN0eWxlVGVzdHMiLCJjc3NUZXh0IiwiY29udGFpbmVyIiwiZGl2U3R5bGUiLCJwaXhlbFBvc2l0aW9uVmFsIiwicmVsaWFibGVNYXJnaW5MZWZ0VmFsIiwibWFyZ2luTGVmdCIsImJveFNpemluZ1JlbGlhYmxlVmFsIiwid2lkdGgiLCJtYXJnaW5SaWdodCIsInBpeGVsTWFyZ2luUmlnaHRWYWwiLCJiYWNrZ3JvdW5kQ2xpcCIsImNsZWFyQ2xvbmVTdHlsZSIsInBpeGVsUG9zaXRpb24iLCJib3hTaXppbmdSZWxpYWJsZSIsInBpeGVsTWFyZ2luUmlnaHQiLCJyZWxpYWJsZU1hcmdpbkxlZnQiLCJjdXJDU1MiLCJjb21wdXRlZCIsIm1pbldpZHRoIiwibWF4V2lkdGgiLCJnZXRQcm9wZXJ0eVZhbHVlIiwiYWRkR2V0SG9va0lmIiwiY29uZGl0aW9uRm4iLCJob29rRm4iLCJyZGlzcGxheXN3YXAiLCJyY3VzdG9tUHJvcCIsImNzc1Nob3ciLCJwb3NpdGlvbiIsInZpc2liaWxpdHkiLCJjc3NOb3JtYWxUcmFuc2Zvcm0iLCJsZXR0ZXJTcGFjaW5nIiwiZm9udFdlaWdodCIsImNzc1ByZWZpeGVzIiwiZW1wdHlTdHlsZSIsInZlbmRvclByb3BOYW1lIiwiY2FwTmFtZSIsImZpbmFsUHJvcE5hbWUiLCJjc3NQcm9wcyIsInNldFBvc2l0aXZlTnVtYmVyIiwic3VidHJhY3QiLCJtYXgiLCJhdWdtZW50V2lkdGhPckhlaWdodCIsImV4dHJhIiwiaXNCb3JkZXJCb3giLCJzdHlsZXMiLCJnZXRXaWR0aE9ySGVpZ2h0IiwidmFsdWVJc0JvcmRlckJveCIsImNzc0hvb2tzIiwib3BhY2l0eSIsIm9yaWdOYW1lIiwiaXNDdXN0b21Qcm9wIiwic2V0UHJvcGVydHkiLCJpc0Zpbml0ZSIsImdldENsaWVudFJlY3RzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsIm1hcmdpbiIsInBhZGRpbmciLCJib3JkZXIiLCJwcmVmaXgiLCJzdWZmaXgiLCJleHBhbmQiLCJleHBhbmRlZCIsInBhcnRzIiwiVHdlZW4iLCJlYXNpbmciLCJwcm9wSG9va3MiLCJydW4iLCJwZXJjZW50IiwiZWFzZWQiLCJkdXJhdGlvbiIsInBvcyIsInN0ZXAiLCJmeCIsInNjcm9sbFRvcCIsInNjcm9sbExlZnQiLCJsaW5lYXIiLCJwIiwic3dpbmciLCJjb3MiLCJQSSIsImZ4Tm93IiwiaW5Qcm9ncmVzcyIsInJmeHR5cGVzIiwicnJ1biIsInNjaGVkdWxlIiwiaGlkZGVuIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiaW50ZXJ2YWwiLCJ0aWNrIiwiY3JlYXRlRnhOb3ciLCJnZW5GeCIsImluY2x1ZGVXaWR0aCIsImhlaWdodCIsImNyZWF0ZVR3ZWVuIiwiYW5pbWF0aW9uIiwiQW5pbWF0aW9uIiwidHdlZW5lcnMiLCJkZWZhdWx0UHJlZmlsdGVyIiwib3B0cyIsIm9sZGZpcmUiLCJwcm9wVHdlZW4iLCJyZXN0b3JlRGlzcGxheSIsImlzQm94IiwiYW5pbSIsImRhdGFTaG93IiwidW5xdWV1ZWQiLCJvdmVyZmxvdyIsIm92ZXJmbG93WCIsIm92ZXJmbG93WSIsInByb3BGaWx0ZXIiLCJzcGVjaWFsRWFzaW5nIiwicHJvcGVydGllcyIsInN0b3BwZWQiLCJwcmVmaWx0ZXJzIiwiY3VycmVudFRpbWUiLCJzdGFydFRpbWUiLCJ0d2VlbnMiLCJvcmlnaW5hbFByb3BlcnRpZXMiLCJvcmlnaW5hbE9wdGlvbnMiLCJnb3RvRW5kIiwiY29tcGxldGUiLCJ0aW1lciIsInR3ZWVuZXIiLCJwcmVmaWx0ZXIiLCJzcGVlZCIsIm9wdCIsInNwZWVkcyIsImZhZGVUbyIsInRvIiwiYW5pbWF0ZSIsIm9wdGFsbCIsImRvQW5pbWF0aW9uIiwiZmluaXNoIiwic3RvcFF1ZXVlIiwidGltZXJzIiwiY3NzRm4iLCJzbGlkZURvd24iLCJzbGlkZVVwIiwic2xpZGVUb2dnbGUiLCJmYWRlSW4iLCJmYWRlT3V0IiwiZmFkZVRvZ2dsZSIsInNsb3ciLCJmYXN0IiwiZGVsYXkiLCJ0aW1lIiwidGltZW91dCIsImNsZWFyVGltZW91dCIsImNoZWNrT24iLCJvcHRTZWxlY3RlZCIsInJhZGlvVmFsdWUiLCJib29sSG9vayIsInJlbW92ZUF0dHIiLCJuVHlwZSIsImF0dHJIb29rcyIsImJvb2wiLCJhdHRyTmFtZXMiLCJnZXR0ZXIiLCJsb3dlcmNhc2VOYW1lIiwicmZvY3VzYWJsZSIsInJjbGlja2FibGUiLCJyZW1vdmVQcm9wIiwicHJvcEZpeCIsInRhYmluZGV4IiwicGFyc2VJbnQiLCJzdHJpcEFuZENvbGxhcHNlIiwiZ2V0Q2xhc3MiLCJhZGRDbGFzcyIsImNsYXNzZXMiLCJjdXJWYWx1ZSIsImNsYXp6IiwiZmluYWxWYWx1ZSIsInJlbW92ZUNsYXNzIiwidG9nZ2xlQ2xhc3MiLCJzdGF0ZVZhbCIsImNsYXNzTmFtZXMiLCJoYXNDbGFzcyIsInJyZXR1cm4iLCJ2YWxIb29rcyIsIm9wdGlvblNldCIsInJmb2N1c01vcnBoIiwib25seUhhbmRsZXJzIiwiYnViYmxlVHlwZSIsIm9udHlwZSIsImV2ZW50UGF0aCIsImlzVHJpZ2dlciIsInBhcmVudFdpbmRvdyIsInNpbXVsYXRlIiwidHJpZ2dlckhhbmRsZXIiLCJob3ZlciIsImZuT3ZlciIsImZuT3V0IiwiZm9jdXNpbiIsImF0dGFjaGVzIiwibm9uY2UiLCJycXVlcnkiLCJwYXJzZVhNTCIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsInJicmFja2V0IiwickNSTEYiLCJyc3VibWl0dGVyVHlwZXMiLCJyc3VibWl0dGFibGUiLCJidWlsZFBhcmFtcyIsInRyYWRpdGlvbmFsIiwicGFyYW0iLCJzIiwidmFsdWVPckZ1bmN0aW9uIiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwic2VyaWFsaXplIiwic2VyaWFsaXplQXJyYXkiLCJyMjAiLCJyaGFzaCIsInJhbnRpQ2FjaGUiLCJyaGVhZGVycyIsInJsb2NhbFByb3RvY29sIiwicm5vQ29udGVudCIsInJwcm90b2NvbCIsInRyYW5zcG9ydHMiLCJhbGxUeXBlcyIsIm9yaWdpbkFuY2hvciIsImFkZFRvUHJlZmlsdGVyc09yVHJhbnNwb3J0cyIsInN0cnVjdHVyZSIsImRhdGFUeXBlRXhwcmVzc2lvbiIsImRhdGFUeXBlIiwiZGF0YVR5cGVzIiwiaW5zcGVjdFByZWZpbHRlcnNPclRyYW5zcG9ydHMiLCJqcVhIUiIsImluc3BlY3RlZCIsInNlZWtpbmdUcmFuc3BvcnQiLCJpbnNwZWN0IiwicHJlZmlsdGVyT3JGYWN0b3J5IiwiZGF0YVR5cGVPclRyYW5zcG9ydCIsImFqYXhFeHRlbmQiLCJmbGF0T3B0aW9ucyIsImFqYXhTZXR0aW5ncyIsImFqYXhIYW5kbGVSZXNwb25zZXMiLCJyZXNwb25zZXMiLCJjdCIsImZpbmFsRGF0YVR5cGUiLCJmaXJzdERhdGFUeXBlIiwibWltZVR5cGUiLCJnZXRSZXNwb25zZUhlYWRlciIsImNvbnZlcnRlcnMiLCJhamF4Q29udmVydCIsInJlc3BvbnNlIiwiaXNTdWNjZXNzIiwiY29udjIiLCJjdXJyZW50IiwiY29udiIsInJlc3BvbnNlRmllbGRzIiwiZGF0YUZpbHRlciIsInRocm93cyIsImFjdGl2ZSIsImxhc3RNb2RpZmllZCIsImV0YWciLCJ1cmwiLCJpc0xvY2FsIiwicHJvdG9jb2wiLCJwcm9jZXNzRGF0YSIsImFzeW5jIiwiY29udGVudFR5cGUiLCJhY2NlcHRzIiwianNvbiIsImFqYXhTZXR1cCIsInNldHRpbmdzIiwiYWpheFByZWZpbHRlciIsImFqYXhUcmFuc3BvcnQiLCJhamF4IiwidHJhbnNwb3J0IiwiY2FjaGVVUkwiLCJyZXNwb25zZUhlYWRlcnNTdHJpbmciLCJyZXNwb25zZUhlYWRlcnMiLCJ0aW1lb3V0VGltZXIiLCJ1cmxBbmNob3IiLCJmaXJlR2xvYmFscyIsInVuY2FjaGVkIiwiY2FsbGJhY2tDb250ZXh0IiwiZ2xvYmFsRXZlbnRDb250ZXh0IiwiY29tcGxldGVEZWZlcnJlZCIsInN0YXR1c0NvZGUiLCJyZXF1ZXN0SGVhZGVycyIsInJlcXVlc3RIZWFkZXJzTmFtZXMiLCJzdHJBYm9ydCIsImdldEFsbFJlc3BvbnNlSGVhZGVycyIsInNldFJlcXVlc3RIZWFkZXIiLCJvdmVycmlkZU1pbWVUeXBlIiwic3RhdHVzIiwiYWJvcnQiLCJzdGF0dXNUZXh0IiwiZmluYWxUZXh0IiwiY3Jvc3NEb21haW4iLCJob3N0IiwiaGFzQ29udGVudCIsImlmTW9kaWZpZWQiLCJoZWFkZXJzIiwiYmVmb3JlU2VuZCIsInN1Y2Nlc3MiLCJzZW5kIiwibmF0aXZlU3RhdHVzVGV4dCIsIm1vZGlmaWVkIiwiZ2V0SlNPTiIsImdldFNjcmlwdCIsIndyYXBBbGwiLCJmaXJzdEVsZW1lbnRDaGlsZCIsIndyYXBJbm5lciIsInVud3JhcCIsInZpc2libGUiLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwieGhyU3VjY2Vzc1N0YXR1cyIsInhoclN1cHBvcnRlZCIsImNvcnMiLCJlcnJvckNhbGxiYWNrIiwib3BlbiIsInVzZXJuYW1lIiwieGhyRmllbGRzIiwib25sb2FkIiwib25lcnJvciIsIm9uYWJvcnQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZXNwb25zZVR5cGUiLCJyZXNwb25zZVRleHQiLCJiaW5hcnkiLCJjaGFyc2V0Iiwic2NyaXB0Q2hhcnNldCIsImV2dCIsIm9sZENhbGxiYWNrcyIsInJqc29ucCIsImpzb25wIiwianNvbnBDYWxsYmFjayIsIm9yaWdpbmFsU2V0dGluZ3MiLCJjYWxsYmFja05hbWUiLCJvdmVyd3JpdHRlbiIsInJlc3BvbnNlQ29udGFpbmVyIiwianNvblByb3AiLCJjcmVhdGVIVE1MRG9jdW1lbnQiLCJpbXBsZW1lbnRhdGlvbiIsImtlZXBTY3JpcHRzIiwicGFyc2VkIiwicGFyYW1zIiwiYW5pbWF0ZWQiLCJvZmZzZXQiLCJzZXRPZmZzZXQiLCJjdXJQb3NpdGlvbiIsImN1ckxlZnQiLCJjdXJDU1NUb3AiLCJjdXJUb3AiLCJjdXJPZmZzZXQiLCJjdXJDU1NMZWZ0IiwiY2FsY3VsYXRlUG9zaXRpb24iLCJjdXJFbGVtIiwidXNpbmciLCJyZWN0Iiwid2luIiwicGFnZVlPZmZzZXQiLCJjbGllbnRUb3AiLCJwYWdlWE9mZnNldCIsImNsaWVudExlZnQiLCJvZmZzZXRQYXJlbnQiLCJwYXJlbnRPZmZzZXQiLCJzY3JvbGxUbyIsIkhlaWdodCIsIldpZHRoIiwiZGVmYXVsdEV4dHJhIiwiZnVuY05hbWUiLCJiaW5kIiwidW5iaW5kIiwiZGVsZWdhdGUiLCJ1bmRlbGVnYXRlIiwiaG9sZFJlYWR5IiwiaG9sZCIsInBhcnNlSlNPTiIsImRlZmluZSIsImFtZCIsIl9qUXVlcnkiLCJfJCIsIiQiLCJub0NvbmZsaWN0Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7QUFhQSxDQUFFLFVBQVVBLE1BQVYsRUFBa0JDLE9BQWxCLEVBQTRCOztBQUU3Qjs7QUFFQSxLQUFLLFFBQU9DLE1B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azZCLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0NBLE9BQU9DLEdBQTVDLEVBQWtEO0FBQ2pERCxTQUFRLFFBQVIsRUFBa0IsRUFBbEIsRUFBc0IsWUFBVztBQUNoQyxVQUFPdmxDLE1BQVA7QUFDQSxHQUZEO0FBR0E7O0FBS0Q7O0FBRUM7QUFDQXlsQyxXQUFVdG5DLE9BQU82QixNQUhsQjs7O0FBS0M7QUFDQTBsQyxNQUFLdm5DLE9BQU93bkMsQ0FOYjs7QUFRQTNsQyxRQUFPNGxDLFVBQVAsR0FBb0IsVUFBVTdpQyxJQUFWLEVBQWlCO0FBQ3BDLE1BQUs1RSxPQUFPd25DLENBQVAsS0FBYTNsQyxNQUFsQixFQUEyQjtBQUMxQjdCLFVBQU93bkMsQ0FBUCxHQUFXRCxFQUFYO0FBQ0E7O0FBRUQsTUFBSzNpQyxRQUFRNUUsT0FBTzZCLE1BQVAsS0FBa0JBLE1BQS9CLEVBQXdDO0FBQ3ZDN0IsVUFBTzZCLE1BQVAsR0FBZ0J5bEMsT0FBaEI7QUFDQTs7QUFFRCxTQUFPemxDLE1BQVA7QUFDQSxFQVZEOztBQVlBO0FBQ0E7QUFDQTtBQUNBLEtBQUssQ0FBQzVCLFFBQU4sRUFBaUI7QUFDaEJELFNBQU82QixNQUFQLEdBQWdCN0IsT0FBT3duQyxDQUFQLEdBQVczbEMsTUFBM0I7QUFDQTs7QUFLRCxRQUFPQSxNQUFQO0FBQ0MsQ0EvL1REIiwiZmlsZSI6ImpxdWVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogalF1ZXJ5IEphdmFTY3JpcHQgTGlicmFyeSB2My4yLjFcbiAqIGh0dHBzOi8vanF1ZXJ5LmNvbS9cbiAqXG4gKiBJbmNsdWRlcyBTaXp6bGUuanNcbiAqIGh0dHBzOi8vc2l6emxlanMuY29tL1xuICpcbiAqIENvcHlyaWdodCBKUyBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnNcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cHM6Ly9qcXVlcnkub3JnL2xpY2Vuc2VcbiAqXG4gKiBEYXRlOiAyMDE3LTAzLTIwVDE4OjU5WlxuICovXG4oIGZ1bmN0aW9uKCBnbG9iYWwsIGZhY3RvcnkgKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0aWYgKCB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIiApIHtcblxuXHRcdC8vIEZvciBDb21tb25KUyBhbmQgQ29tbW9uSlMtbGlrZSBlbnZpcm9ubWVudHMgd2hlcmUgYSBwcm9wZXIgYHdpbmRvd2Bcblx0XHQvLyBpcyBwcmVzZW50LCBleGVjdXRlIHRoZSBmYWN0b3J5IGFuZCBnZXQgalF1ZXJ5LlxuXHRcdC8vIEZvciBlbnZpcm9ubWVudHMgdGhhdCBkbyBub3QgaGF2ZSBhIGB3aW5kb3dgIHdpdGggYSBgZG9jdW1lbnRgXG5cdFx0Ly8gKHN1Y2ggYXMgTm9kZS5qcyksIGV4cG9zZSBhIGZhY3RvcnkgYXMgbW9kdWxlLmV4cG9ydHMuXG5cdFx0Ly8gVGhpcyBhY2NlbnR1YXRlcyB0aGUgbmVlZCBmb3IgdGhlIGNyZWF0aW9uIG9mIGEgcmVhbCBgd2luZG93YC5cblx0XHQvLyBlLmcuIHZhciBqUXVlcnkgPSByZXF1aXJlKFwianF1ZXJ5XCIpKHdpbmRvdyk7XG5cdFx0Ly8gU2VlIHRpY2tldCAjMTQ1NDkgZm9yIG1vcmUgaW5mby5cblx0XHRtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbC5kb2N1bWVudCA/XG5cdFx0XHRmYWN0b3J5KCBnbG9iYWwsIHRydWUgKSA6XG5cdFx0XHRmdW5jdGlvbiggdyApIHtcblx0XHRcdFx0aWYgKCAhdy5kb2N1bWVudCApIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoIFwialF1ZXJ5IHJlcXVpcmVzIGEgd2luZG93IHdpdGggYSBkb2N1bWVudFwiICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhY3RvcnkoIHcgKTtcblx0XHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0ZmFjdG9yeSggZ2xvYmFsICk7XG5cdH1cblxuLy8gUGFzcyB0aGlzIGlmIHdpbmRvdyBpcyBub3QgZGVmaW5lZCB5ZXRcbn0gKSggdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHRoaXMsIGZ1bmN0aW9uKCB3aW5kb3csIG5vR2xvYmFsICkge1xuXG4vLyBFZGdlIDw9IDEyIC0gMTMrLCBGaXJlZm94IDw9MTggLSA0NSssIElFIDEwIC0gMTEsIFNhZmFyaSA1LjEgLSA5KywgaU9TIDYgLSA5LjFcbi8vIHRocm93IGV4Y2VwdGlvbnMgd2hlbiBub24tc3RyaWN0IGNvZGUgKGUuZy4sIEFTUC5ORVQgNC41KSBhY2Nlc3NlcyBzdHJpY3QgbW9kZVxuLy8gYXJndW1lbnRzLmNhbGxlZS5jYWxsZXIgKHRyYWMtMTMzMzUpLiBCdXQgYXMgb2YgalF1ZXJ5IDMuMCAoMjAxNiksIHN0cmljdCBtb2RlIHNob3VsZCBiZSBjb21tb25cbi8vIGVub3VnaCB0aGF0IGFsbCBzdWNoIGF0dGVtcHRzIGFyZSBndWFyZGVkIGluIGEgdHJ5IGJsb2NrLlxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhcnIgPSBbXTtcblxudmFyIGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50O1xuXG52YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG5cbnZhciBzbGljZSA9IGFyci5zbGljZTtcblxudmFyIGNvbmNhdCA9IGFyci5jb25jYXQ7XG5cbnZhciBwdXNoID0gYXJyLnB1c2g7XG5cbnZhciBpbmRleE9mID0gYXJyLmluZGV4T2Y7XG5cbnZhciBjbGFzczJ0eXBlID0ge307XG5cbnZhciB0b1N0cmluZyA9IGNsYXNzMnR5cGUudG9TdHJpbmc7XG5cbnZhciBoYXNPd24gPSBjbGFzczJ0eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgZm5Ub1N0cmluZyA9IGhhc093bi50b1N0cmluZztcblxudmFyIE9iamVjdEZ1bmN0aW9uU3RyaW5nID0gZm5Ub1N0cmluZy5jYWxsKCBPYmplY3QgKTtcblxudmFyIHN1cHBvcnQgPSB7fTtcblxuXG5cblx0ZnVuY3Rpb24gRE9NRXZhbCggY29kZSwgZG9jICkge1xuXHRcdGRvYyA9IGRvYyB8fCBkb2N1bWVudDtcblxuXHRcdHZhciBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudCggXCJzY3JpcHRcIiApO1xuXG5cdFx0c2NyaXB0LnRleHQgPSBjb2RlO1xuXHRcdGRvYy5oZWFkLmFwcGVuZENoaWxkKCBzY3JpcHQgKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBzY3JpcHQgKTtcblx0fVxuLyogZ2xvYmFsIFN5bWJvbCAqL1xuLy8gRGVmaW5pbmcgdGhpcyBnbG9iYWwgaW4gLmVzbGludHJjLmpzb24gd291bGQgY3JlYXRlIGEgZGFuZ2VyIG9mIHVzaW5nIHRoZSBnbG9iYWxcbi8vIHVuZ3VhcmRlZCBpbiBhbm90aGVyIHBsYWNlLCBpdCBzZWVtcyBzYWZlciB0byBkZWZpbmUgZ2xvYmFsIG9ubHkgZm9yIHRoaXMgbW9kdWxlXG5cblxuXG52YXJcblx0dmVyc2lvbiA9IFwiMy4yLjFcIixcblxuXHQvLyBEZWZpbmUgYSBsb2NhbCBjb3B5IG9mIGpRdWVyeVxuXHRqUXVlcnkgPSBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQgKSB7XG5cblx0XHQvLyBUaGUgalF1ZXJ5IG9iamVjdCBpcyBhY3R1YWxseSBqdXN0IHRoZSBpbml0IGNvbnN0cnVjdG9yICdlbmhhbmNlZCdcblx0XHQvLyBOZWVkIGluaXQgaWYgalF1ZXJ5IGlzIGNhbGxlZCAoanVzdCBhbGxvdyBlcnJvciB0byBiZSB0aHJvd24gaWYgbm90IGluY2x1ZGVkKVxuXHRcdHJldHVybiBuZXcgalF1ZXJ5LmZuLmluaXQoIHNlbGVjdG9yLCBjb250ZXh0ICk7XG5cdH0sXG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5XG5cdC8vIE1ha2Ugc3VyZSB3ZSB0cmltIEJPTSBhbmQgTkJTUFxuXHRydHJpbSA9IC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZyxcblxuXHQvLyBNYXRjaGVzIGRhc2hlZCBzdHJpbmcgZm9yIGNhbWVsaXppbmdcblx0cm1zUHJlZml4ID0gL14tbXMtLyxcblx0cmRhc2hBbHBoYSA9IC8tKFthLXpdKS9nLFxuXG5cdC8vIFVzZWQgYnkgalF1ZXJ5LmNhbWVsQ2FzZSBhcyBjYWxsYmFjayB0byByZXBsYWNlKClcblx0ZmNhbWVsQ2FzZSA9IGZ1bmN0aW9uKCBhbGwsIGxldHRlciApIHtcblx0XHRyZXR1cm4gbGV0dGVyLnRvVXBwZXJDYXNlKCk7XG5cdH07XG5cbmpRdWVyeS5mbiA9IGpRdWVyeS5wcm90b3R5cGUgPSB7XG5cblx0Ly8gVGhlIGN1cnJlbnQgdmVyc2lvbiBvZiBqUXVlcnkgYmVpbmcgdXNlZFxuXHRqcXVlcnk6IHZlcnNpb24sXG5cblx0Y29uc3RydWN0b3I6IGpRdWVyeSxcblxuXHQvLyBUaGUgZGVmYXVsdCBsZW5ndGggb2YgYSBqUXVlcnkgb2JqZWN0IGlzIDBcblx0bGVuZ3RoOiAwLFxuXG5cdHRvQXJyYXk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBzbGljZS5jYWxsKCB0aGlzICk7XG5cdH0sXG5cblx0Ly8gR2V0IHRoZSBOdGggZWxlbWVudCBpbiB0aGUgbWF0Y2hlZCBlbGVtZW50IHNldCBPUlxuXHQvLyBHZXQgdGhlIHdob2xlIG1hdGNoZWQgZWxlbWVudCBzZXQgYXMgYSBjbGVhbiBhcnJheVxuXHRnZXQ6IGZ1bmN0aW9uKCBudW0gKSB7XG5cblx0XHQvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyBpbiBhIGNsZWFuIGFycmF5XG5cdFx0aWYgKCBudW0gPT0gbnVsbCApIHtcblx0XHRcdHJldHVybiBzbGljZS5jYWxsKCB0aGlzICk7XG5cdFx0fVxuXG5cdFx0Ly8gUmV0dXJuIGp1c3QgdGhlIG9uZSBlbGVtZW50IGZyb20gdGhlIHNldFxuXHRcdHJldHVybiBudW0gPCAwID8gdGhpc1sgbnVtICsgdGhpcy5sZW5ndGggXSA6IHRoaXNbIG51bSBdO1xuXHR9LFxuXG5cdC8vIFRha2UgYW4gYXJyYXkgb2YgZWxlbWVudHMgYW5kIHB1c2ggaXQgb250byB0aGUgc3RhY2tcblx0Ly8gKHJldHVybmluZyB0aGUgbmV3IG1hdGNoZWQgZWxlbWVudCBzZXQpXG5cdHB1c2hTdGFjazogZnVuY3Rpb24oIGVsZW1zICkge1xuXG5cdFx0Ly8gQnVpbGQgYSBuZXcgalF1ZXJ5IG1hdGNoZWQgZWxlbWVudCBzZXRcblx0XHR2YXIgcmV0ID0galF1ZXJ5Lm1lcmdlKCB0aGlzLmNvbnN0cnVjdG9yKCksIGVsZW1zICk7XG5cblx0XHQvLyBBZGQgdGhlIG9sZCBvYmplY3Qgb250byB0aGUgc3RhY2sgKGFzIGEgcmVmZXJlbmNlKVxuXHRcdHJldC5wcmV2T2JqZWN0ID0gdGhpcztcblxuXHRcdC8vIFJldHVybiB0aGUgbmV3bHktZm9ybWVkIGVsZW1lbnQgc2V0XG5cdFx0cmV0dXJuIHJldDtcblx0fSxcblxuXHQvLyBFeGVjdXRlIGEgY2FsbGJhY2sgZm9yIGV2ZXJ5IGVsZW1lbnQgaW4gdGhlIG1hdGNoZWQgc2V0LlxuXHRlYWNoOiBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5lYWNoKCB0aGlzLCBjYWxsYmFjayApO1xuXHR9LFxuXG5cdG1hcDogZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggalF1ZXJ5Lm1hcCggdGhpcywgZnVuY3Rpb24oIGVsZW0sIGkgKSB7XG5cdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbCggZWxlbSwgaSwgZWxlbSApO1xuXHRcdH0gKSApO1xuXHR9LFxuXG5cdHNsaWNlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHNsaWNlLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKSApO1xuXHR9LFxuXG5cdGZpcnN0OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5lcSggMCApO1xuXHR9LFxuXG5cdGxhc3Q6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmVxKCAtMSApO1xuXHR9LFxuXG5cdGVxOiBmdW5jdGlvbiggaSApIHtcblx0XHR2YXIgbGVuID0gdGhpcy5sZW5ndGgsXG5cdFx0XHRqID0gK2kgKyAoIGkgPCAwID8gbGVuIDogMCApO1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggaiA+PSAwICYmIGogPCBsZW4gPyBbIHRoaXNbIGogXSBdIDogW10gKTtcblx0fSxcblxuXHRlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnByZXZPYmplY3QgfHwgdGhpcy5jb25zdHJ1Y3RvcigpO1xuXHR9LFxuXG5cdC8vIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cblx0Ly8gQmVoYXZlcyBsaWtlIGFuIEFycmF5J3MgbWV0aG9kLCBub3QgbGlrZSBhIGpRdWVyeSBtZXRob2QuXG5cdHB1c2g6IHB1c2gsXG5cdHNvcnQ6IGFyci5zb3J0LFxuXHRzcGxpY2U6IGFyci5zcGxpY2Vcbn07XG5cbmpRdWVyeS5leHRlbmQgPSBqUXVlcnkuZm4uZXh0ZW5kID0gZnVuY3Rpb24oKSB7XG5cdHZhciBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNvcHlJc0FycmF5LCBjbG9uZSxcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbIDAgXSB8fCB7fSxcblx0XHRpID0gMSxcblx0XHRsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuXHRcdGRlZXAgPSBmYWxzZTtcblxuXHQvLyBIYW5kbGUgYSBkZWVwIGNvcHkgc2l0dWF0aW9uXG5cdGlmICggdHlwZW9mIHRhcmdldCA9PT0gXCJib29sZWFuXCIgKSB7XG5cdFx0ZGVlcCA9IHRhcmdldDtcblxuXHRcdC8vIFNraXAgdGhlIGJvb2xlYW4gYW5kIHRoZSB0YXJnZXRcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbIGkgXSB8fCB7fTtcblx0XHRpKys7XG5cdH1cblxuXHQvLyBIYW5kbGUgY2FzZSB3aGVuIHRhcmdldCBpcyBhIHN0cmluZyBvciBzb21ldGhpbmcgKHBvc3NpYmxlIGluIGRlZXAgY29weSlcblx0aWYgKCB0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiICYmICFqUXVlcnkuaXNGdW5jdGlvbiggdGFyZ2V0ICkgKSB7XG5cdFx0dGFyZ2V0ID0ge307XG5cdH1cblxuXHQvLyBFeHRlbmQgalF1ZXJ5IGl0c2VsZiBpZiBvbmx5IG9uZSBhcmd1bWVudCBpcyBwYXNzZWRcblx0aWYgKCBpID09PSBsZW5ndGggKSB7XG5cdFx0dGFyZ2V0ID0gdGhpcztcblx0XHRpLS07XG5cdH1cblxuXHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblxuXHRcdC8vIE9ubHkgZGVhbCB3aXRoIG5vbi1udWxsL3VuZGVmaW5lZCB2YWx1ZXNcblx0XHRpZiAoICggb3B0aW9ucyA9IGFyZ3VtZW50c1sgaSBdICkgIT0gbnVsbCApIHtcblxuXHRcdFx0Ly8gRXh0ZW5kIHRoZSBiYXNlIG9iamVjdFxuXHRcdFx0Zm9yICggbmFtZSBpbiBvcHRpb25zICkge1xuXHRcdFx0XHRzcmMgPSB0YXJnZXRbIG5hbWUgXTtcblx0XHRcdFx0Y29weSA9IG9wdGlvbnNbIG5hbWUgXTtcblxuXHRcdFx0XHQvLyBQcmV2ZW50IG5ldmVyLWVuZGluZyBsb29wXG5cdFx0XHRcdGlmICggdGFyZ2V0ID09PSBjb3B5ICkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUmVjdXJzZSBpZiB3ZSdyZSBtZXJnaW5nIHBsYWluIG9iamVjdHMgb3IgYXJyYXlzXG5cdFx0XHRcdGlmICggZGVlcCAmJiBjb3B5ICYmICggalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGNvcHkgKSB8fFxuXHRcdFx0XHRcdCggY29weUlzQXJyYXkgPSBBcnJheS5pc0FycmF5KCBjb3B5ICkgKSApICkge1xuXG5cdFx0XHRcdFx0aWYgKCBjb3B5SXNBcnJheSApIHtcblx0XHRcdFx0XHRcdGNvcHlJc0FycmF5ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBBcnJheS5pc0FycmF5KCBzcmMgKSA/IHNyYyA6IFtdO1xuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGpRdWVyeS5pc1BsYWluT2JqZWN0KCBzcmMgKSA/IHNyYyA6IHt9O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIE5ldmVyIG1vdmUgb3JpZ2luYWwgb2JqZWN0cywgY2xvbmUgdGhlbVxuXHRcdFx0XHRcdHRhcmdldFsgbmFtZSBdID0galF1ZXJ5LmV4dGVuZCggZGVlcCwgY2xvbmUsIGNvcHkgKTtcblxuXHRcdFx0XHQvLyBEb24ndCBicmluZyBpbiB1bmRlZmluZWQgdmFsdWVzXG5cdFx0XHRcdH0gZWxzZSBpZiAoIGNvcHkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHR0YXJnZXRbIG5hbWUgXSA9IGNvcHk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIG1vZGlmaWVkIG9iamVjdFxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXG5cdC8vIFVuaXF1ZSBmb3IgZWFjaCBjb3B5IG9mIGpRdWVyeSBvbiB0aGUgcGFnZVxuXHRleHBhbmRvOiBcImpRdWVyeVwiICsgKCB2ZXJzaW9uICsgTWF0aC5yYW5kb20oKSApLnJlcGxhY2UoIC9cXEQvZywgXCJcIiApLFxuXG5cdC8vIEFzc3VtZSBqUXVlcnkgaXMgcmVhZHkgd2l0aG91dCB0aGUgcmVhZHkgbW9kdWxlXG5cdGlzUmVhZHk6IHRydWUsXG5cblx0ZXJyb3I6IGZ1bmN0aW9uKCBtc2cgKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBtc2cgKTtcblx0fSxcblxuXHRub29wOiBmdW5jdGlvbigpIHt9LFxuXG5cdGlzRnVuY3Rpb246IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS50eXBlKCBvYmogKSA9PT0gXCJmdW5jdGlvblwiO1xuXHR9LFxuXG5cdGlzV2luZG93OiBmdW5jdGlvbiggb2JqICkge1xuXHRcdHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmogPT09IG9iai53aW5kb3c7XG5cdH0sXG5cblx0aXNOdW1lcmljOiBmdW5jdGlvbiggb2JqICkge1xuXG5cdFx0Ly8gQXMgb2YgalF1ZXJ5IDMuMCwgaXNOdW1lcmljIGlzIGxpbWl0ZWQgdG9cblx0XHQvLyBzdHJpbmdzIGFuZCBudW1iZXJzIChwcmltaXRpdmVzIG9yIG9iamVjdHMpXG5cdFx0Ly8gdGhhdCBjYW4gYmUgY29lcmNlZCB0byBmaW5pdGUgbnVtYmVycyAoZ2gtMjY2Milcblx0XHR2YXIgdHlwZSA9IGpRdWVyeS50eXBlKCBvYmogKTtcblx0XHRyZXR1cm4gKCB0eXBlID09PSBcIm51bWJlclwiIHx8IHR5cGUgPT09IFwic3RyaW5nXCIgKSAmJlxuXG5cdFx0XHQvLyBwYXJzZUZsb2F0IE5hTnMgbnVtZXJpYy1jYXN0IGZhbHNlIHBvc2l0aXZlcyAoXCJcIilcblx0XHRcdC8vIC4uLmJ1dCBtaXNpbnRlcnByZXRzIGxlYWRpbmctbnVtYmVyIHN0cmluZ3MsIHBhcnRpY3VsYXJseSBoZXggbGl0ZXJhbHMgKFwiMHguLi5cIilcblx0XHRcdC8vIHN1YnRyYWN0aW9uIGZvcmNlcyBpbmZpbml0aWVzIHRvIE5hTlxuXHRcdFx0IWlzTmFOKCBvYmogLSBwYXJzZUZsb2F0KCBvYmogKSApO1xuXHR9LFxuXG5cdGlzUGxhaW5PYmplY3Q6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0dmFyIHByb3RvLCBDdG9yO1xuXG5cdFx0Ly8gRGV0ZWN0IG9idmlvdXMgbmVnYXRpdmVzXG5cdFx0Ly8gVXNlIHRvU3RyaW5nIGluc3RlYWQgb2YgalF1ZXJ5LnR5cGUgdG8gY2F0Y2ggaG9zdCBvYmplY3RzXG5cdFx0aWYgKCAhb2JqIHx8IHRvU3RyaW5nLmNhbGwoIG9iaiApICE9PSBcIltvYmplY3QgT2JqZWN0XVwiICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHByb3RvID0gZ2V0UHJvdG8oIG9iaiApO1xuXG5cdFx0Ly8gT2JqZWN0cyB3aXRoIG5vIHByb3RvdHlwZSAoZS5nLiwgYE9iamVjdC5jcmVhdGUoIG51bGwgKWApIGFyZSBwbGFpblxuXHRcdGlmICggIXByb3RvICkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gT2JqZWN0cyB3aXRoIHByb3RvdHlwZSBhcmUgcGxhaW4gaWZmIHRoZXkgd2VyZSBjb25zdHJ1Y3RlZCBieSBhIGdsb2JhbCBPYmplY3QgZnVuY3Rpb25cblx0XHRDdG9yID0gaGFzT3duLmNhbGwoIHByb3RvLCBcImNvbnN0cnVjdG9yXCIgKSAmJiBwcm90by5jb25zdHJ1Y3Rvcjtcblx0XHRyZXR1cm4gdHlwZW9mIEN0b3IgPT09IFwiZnVuY3Rpb25cIiAmJiBmblRvU3RyaW5nLmNhbGwoIEN0b3IgKSA9PT0gT2JqZWN0RnVuY3Rpb25TdHJpbmc7XG5cdH0sXG5cblx0aXNFbXB0eU9iamVjdDogZnVuY3Rpb24oIG9iaiApIHtcblxuXHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cdFx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lc2xpbnQvZXNsaW50L2lzc3Vlcy82MTI1XG5cdFx0dmFyIG5hbWU7XG5cblx0XHRmb3IgKCBuYW1lIGluIG9iaiApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0dHlwZTogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRpZiAoIG9iaiA9PSBudWxsICkge1xuXHRcdFx0cmV0dXJuIG9iaiArIFwiXCI7XG5cdFx0fVxuXG5cdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTIuMyBvbmx5IChmdW5jdGlvbmlzaCBSZWdFeHApXG5cdFx0cmV0dXJuIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiID9cblx0XHRcdGNsYXNzMnR5cGVbIHRvU3RyaW5nLmNhbGwoIG9iaiApIF0gfHwgXCJvYmplY3RcIiA6XG5cdFx0XHR0eXBlb2Ygb2JqO1xuXHR9LFxuXG5cdC8vIEV2YWx1YXRlcyBhIHNjcmlwdCBpbiBhIGdsb2JhbCBjb250ZXh0XG5cdGdsb2JhbEV2YWw6IGZ1bmN0aW9uKCBjb2RlICkge1xuXHRcdERPTUV2YWwoIGNvZGUgKTtcblx0fSxcblxuXHQvLyBDb252ZXJ0IGRhc2hlZCB0byBjYW1lbENhc2U7IHVzZWQgYnkgdGhlIGNzcyBhbmQgZGF0YSBtb2R1bGVzXG5cdC8vIFN1cHBvcnQ6IElFIDw9OSAtIDExLCBFZGdlIDEyIC0gMTNcblx0Ly8gTWljcm9zb2Z0IGZvcmdvdCB0byBodW1wIHRoZWlyIHZlbmRvciBwcmVmaXggKCM5NTcyKVxuXHRjYW1lbENhc2U6IGZ1bmN0aW9uKCBzdHJpbmcgKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKCBybXNQcmVmaXgsIFwibXMtXCIgKS5yZXBsYWNlKCByZGFzaEFscGhhLCBmY2FtZWxDYXNlICk7XG5cdH0sXG5cblx0ZWFjaDogZnVuY3Rpb24oIG9iaiwgY2FsbGJhY2sgKSB7XG5cdFx0dmFyIGxlbmd0aCwgaSA9IDA7XG5cblx0XHRpZiAoIGlzQXJyYXlMaWtlKCBvYmogKSApIHtcblx0XHRcdGxlbmd0aCA9IG9iai5sZW5ndGg7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0aWYgKCBjYWxsYmFjay5jYWxsKCBvYmpbIGkgXSwgaSwgb2JqWyBpIF0gKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9yICggaSBpbiBvYmogKSB7XG5cdFx0XHRcdGlmICggY2FsbGJhY2suY2FsbCggb2JqWyBpIF0sIGksIG9ialsgaSBdICkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9iajtcblx0fSxcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHlcblx0dHJpbTogZnVuY3Rpb24oIHRleHQgKSB7XG5cdFx0cmV0dXJuIHRleHQgPT0gbnVsbCA/XG5cdFx0XHRcIlwiIDpcblx0XHRcdCggdGV4dCArIFwiXCIgKS5yZXBsYWNlKCBydHJpbSwgXCJcIiApO1xuXHR9LFxuXG5cdC8vIHJlc3VsdHMgaXMgZm9yIGludGVybmFsIHVzYWdlIG9ubHlcblx0bWFrZUFycmF5OiBmdW5jdGlvbiggYXJyLCByZXN1bHRzICkge1xuXHRcdHZhciByZXQgPSByZXN1bHRzIHx8IFtdO1xuXG5cdFx0aWYgKCBhcnIgIT0gbnVsbCApIHtcblx0XHRcdGlmICggaXNBcnJheUxpa2UoIE9iamVjdCggYXJyICkgKSApIHtcblx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCByZXQsXG5cdFx0XHRcdFx0dHlwZW9mIGFyciA9PT0gXCJzdHJpbmdcIiA/XG5cdFx0XHRcdFx0WyBhcnIgXSA6IGFyclxuXHRcdFx0XHQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cHVzaC5jYWxsKCByZXQsIGFyciApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXQ7XG5cdH0sXG5cblx0aW5BcnJheTogZnVuY3Rpb24oIGVsZW0sIGFyciwgaSApIHtcblx0XHRyZXR1cm4gYXJyID09IG51bGwgPyAtMSA6IGluZGV4T2YuY2FsbCggYXJyLCBlbGVtLCBpICk7XG5cdH0sXG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5LCBQaGFudG9tSlMgMSBvbmx5XG5cdC8vIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcblx0bWVyZ2U6IGZ1bmN0aW9uKCBmaXJzdCwgc2Vjb25kICkge1xuXHRcdHZhciBsZW4gPSArc2Vjb25kLmxlbmd0aCxcblx0XHRcdGogPSAwLFxuXHRcdFx0aSA9IGZpcnN0Lmxlbmd0aDtcblxuXHRcdGZvciAoIDsgaiA8IGxlbjsgaisrICkge1xuXHRcdFx0Zmlyc3RbIGkrKyBdID0gc2Vjb25kWyBqIF07XG5cdFx0fVxuXG5cdFx0Zmlyc3QubGVuZ3RoID0gaTtcblxuXHRcdHJldHVybiBmaXJzdDtcblx0fSxcblxuXHRncmVwOiBmdW5jdGlvbiggZWxlbXMsIGNhbGxiYWNrLCBpbnZlcnQgKSB7XG5cdFx0dmFyIGNhbGxiYWNrSW52ZXJzZSxcblx0XHRcdG1hdGNoZXMgPSBbXSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0bGVuZ3RoID0gZWxlbXMubGVuZ3RoLFxuXHRcdFx0Y2FsbGJhY2tFeHBlY3QgPSAhaW52ZXJ0O1xuXG5cdFx0Ly8gR28gdGhyb3VnaCB0aGUgYXJyYXksIG9ubHkgc2F2aW5nIHRoZSBpdGVtc1xuXHRcdC8vIHRoYXQgcGFzcyB0aGUgdmFsaWRhdG9yIGZ1bmN0aW9uXG5cdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRjYWxsYmFja0ludmVyc2UgPSAhY2FsbGJhY2soIGVsZW1zWyBpIF0sIGkgKTtcblx0XHRcdGlmICggY2FsbGJhY2tJbnZlcnNlICE9PSBjYWxsYmFja0V4cGVjdCApIHtcblx0XHRcdFx0bWF0Y2hlcy5wdXNoKCBlbGVtc1sgaSBdICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1hdGNoZXM7XG5cdH0sXG5cblx0Ly8gYXJnIGlzIGZvciBpbnRlcm5hbCB1c2FnZSBvbmx5XG5cdG1hcDogZnVuY3Rpb24oIGVsZW1zLCBjYWxsYmFjaywgYXJnICkge1xuXHRcdHZhciBsZW5ndGgsIHZhbHVlLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRyZXQgPSBbXTtcblxuXHRcdC8vIEdvIHRocm91Z2ggdGhlIGFycmF5LCB0cmFuc2xhdGluZyBlYWNoIG9mIHRoZSBpdGVtcyB0byB0aGVpciBuZXcgdmFsdWVzXG5cdFx0aWYgKCBpc0FycmF5TGlrZSggZWxlbXMgKSApIHtcblx0XHRcdGxlbmd0aCA9IGVsZW1zLmxlbmd0aDtcblx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXHRcdFx0XHR2YWx1ZSA9IGNhbGxiYWNrKCBlbGVtc1sgaSBdLCBpLCBhcmcgKTtcblxuXHRcdFx0XHRpZiAoIHZhbHVlICE9IG51bGwgKSB7XG5cdFx0XHRcdFx0cmV0LnB1c2goIHZhbHVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdC8vIEdvIHRocm91Z2ggZXZlcnkga2V5IG9uIHRoZSBvYmplY3QsXG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvciAoIGkgaW4gZWxlbXMgKSB7XG5cdFx0XHRcdHZhbHVlID0gY2FsbGJhY2soIGVsZW1zWyBpIF0sIGksIGFyZyApO1xuXG5cdFx0XHRcdGlmICggdmFsdWUgIT0gbnVsbCApIHtcblx0XHRcdFx0XHRyZXQucHVzaCggdmFsdWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEZsYXR0ZW4gYW55IG5lc3RlZCBhcnJheXNcblx0XHRyZXR1cm4gY29uY2F0LmFwcGx5KCBbXSwgcmV0ICk7XG5cdH0sXG5cblx0Ly8gQSBnbG9iYWwgR1VJRCBjb3VudGVyIGZvciBvYmplY3RzXG5cdGd1aWQ6IDEsXG5cblx0Ly8gQmluZCBhIGZ1bmN0aW9uIHRvIGEgY29udGV4dCwgb3B0aW9uYWxseSBwYXJ0aWFsbHkgYXBwbHlpbmcgYW55XG5cdC8vIGFyZ3VtZW50cy5cblx0cHJveHk6IGZ1bmN0aW9uKCBmbiwgY29udGV4dCApIHtcblx0XHR2YXIgdG1wLCBhcmdzLCBwcm94eTtcblxuXHRcdGlmICggdHlwZW9mIGNvbnRleHQgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHR0bXAgPSBmblsgY29udGV4dCBdO1xuXHRcdFx0Y29udGV4dCA9IGZuO1xuXHRcdFx0Zm4gPSB0bXA7XG5cdFx0fVxuXG5cdFx0Ly8gUXVpY2sgY2hlY2sgdG8gZGV0ZXJtaW5lIGlmIHRhcmdldCBpcyBjYWxsYWJsZSwgaW4gdGhlIHNwZWNcblx0XHQvLyB0aGlzIHRocm93cyBhIFR5cGVFcnJvciwgYnV0IHdlIHdpbGwganVzdCByZXR1cm4gdW5kZWZpbmVkLlxuXHRcdGlmICggIWpRdWVyeS5pc0Z1bmN0aW9uKCBmbiApICkge1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHQvLyBTaW11bGF0ZWQgYmluZFxuXHRcdGFyZ3MgPSBzbGljZS5jYWxsKCBhcmd1bWVudHMsIDIgKTtcblx0XHRwcm94eSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGZuLmFwcGx5KCBjb250ZXh0IHx8IHRoaXMsIGFyZ3MuY29uY2F0KCBzbGljZS5jYWxsKCBhcmd1bWVudHMgKSApICk7XG5cdFx0fTtcblxuXHRcdC8vIFNldCB0aGUgZ3VpZCBvZiB1bmlxdWUgaGFuZGxlciB0byB0aGUgc2FtZSBvZiBvcmlnaW5hbCBoYW5kbGVyLCBzbyBpdCBjYW4gYmUgcmVtb3ZlZFxuXHRcdHByb3h5Lmd1aWQgPSBmbi5ndWlkID0gZm4uZ3VpZCB8fCBqUXVlcnkuZ3VpZCsrO1xuXG5cdFx0cmV0dXJuIHByb3h5O1xuXHR9LFxuXG5cdG5vdzogRGF0ZS5ub3csXG5cblx0Ly8galF1ZXJ5LnN1cHBvcnQgaXMgbm90IHVzZWQgaW4gQ29yZSBidXQgb3RoZXIgcHJvamVjdHMgYXR0YWNoIHRoZWlyXG5cdC8vIHByb3BlcnRpZXMgdG8gaXQgc28gaXQgbmVlZHMgdG8gZXhpc3QuXG5cdHN1cHBvcnQ6IHN1cHBvcnRcbn0gKTtcblxuaWYgKCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgKSB7XG5cdGpRdWVyeS5mblsgU3ltYm9sLml0ZXJhdG9yIF0gPSBhcnJbIFN5bWJvbC5pdGVyYXRvciBdO1xufVxuXG4vLyBQb3B1bGF0ZSB0aGUgY2xhc3MydHlwZSBtYXBcbmpRdWVyeS5lYWNoKCBcIkJvb2xlYW4gTnVtYmVyIFN0cmluZyBGdW5jdGlvbiBBcnJheSBEYXRlIFJlZ0V4cCBPYmplY3QgRXJyb3IgU3ltYm9sXCIuc3BsaXQoIFwiIFwiICksXG5mdW5jdGlvbiggaSwgbmFtZSApIHtcblx0Y2xhc3MydHlwZVsgXCJbb2JqZWN0IFwiICsgbmFtZSArIFwiXVwiIF0gPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG59ICk7XG5cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKCBvYmogKSB7XG5cblx0Ly8gU3VwcG9ydDogcmVhbCBpT1MgOC4yIG9ubHkgKG5vdCByZXByb2R1Y2libGUgaW4gc2ltdWxhdG9yKVxuXHQvLyBgaW5gIGNoZWNrIHVzZWQgdG8gcHJldmVudCBKSVQgZXJyb3IgKGdoLTIxNDUpXG5cdC8vIGhhc093biBpc24ndCB1c2VkIGhlcmUgZHVlIHRvIGZhbHNlIG5lZ2F0aXZlc1xuXHQvLyByZWdhcmRpbmcgTm9kZWxpc3QgbGVuZ3RoIGluIElFXG5cdHZhciBsZW5ndGggPSAhIW9iaiAmJiBcImxlbmd0aFwiIGluIG9iaiAmJiBvYmoubGVuZ3RoLFxuXHRcdHR5cGUgPSBqUXVlcnkudHlwZSggb2JqICk7XG5cblx0aWYgKCB0eXBlID09PSBcImZ1bmN0aW9uXCIgfHwgalF1ZXJ5LmlzV2luZG93KCBvYmogKSApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRyZXR1cm4gdHlwZSA9PT0gXCJhcnJheVwiIHx8IGxlbmd0aCA9PT0gMCB8fFxuXHRcdHR5cGVvZiBsZW5ndGggPT09IFwibnVtYmVyXCIgJiYgbGVuZ3RoID4gMCAmJiAoIGxlbmd0aCAtIDEgKSBpbiBvYmo7XG59XG52YXIgU2l6emxlID1cbi8qIVxuICogU2l6emxlIENTUyBTZWxlY3RvciBFbmdpbmUgdjIuMy4zXG4gKiBodHRwczovL3NpenpsZWpzLmNvbS9cbiAqXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKlxuICogRGF0ZTogMjAxNi0wOC0wOFxuICovXG4oZnVuY3Rpb24oIHdpbmRvdyApIHtcblxudmFyIGksXG5cdHN1cHBvcnQsXG5cdEV4cHIsXG5cdGdldFRleHQsXG5cdGlzWE1MLFxuXHR0b2tlbml6ZSxcblx0Y29tcGlsZSxcblx0c2VsZWN0LFxuXHRvdXRlcm1vc3RDb250ZXh0LFxuXHRzb3J0SW5wdXQsXG5cdGhhc0R1cGxpY2F0ZSxcblxuXHQvLyBMb2NhbCBkb2N1bWVudCB2YXJzXG5cdHNldERvY3VtZW50LFxuXHRkb2N1bWVudCxcblx0ZG9jRWxlbSxcblx0ZG9jdW1lbnRJc0hUTUwsXG5cdHJidWdneVFTQSxcblx0cmJ1Z2d5TWF0Y2hlcyxcblx0bWF0Y2hlcyxcblx0Y29udGFpbnMsXG5cblx0Ly8gSW5zdGFuY2Utc3BlY2lmaWMgZGF0YVxuXHRleHBhbmRvID0gXCJzaXp6bGVcIiArIDEgKiBuZXcgRGF0ZSgpLFxuXHRwcmVmZXJyZWREb2MgPSB3aW5kb3cuZG9jdW1lbnQsXG5cdGRpcnJ1bnMgPSAwLFxuXHRkb25lID0gMCxcblx0Y2xhc3NDYWNoZSA9IGNyZWF0ZUNhY2hlKCksXG5cdHRva2VuQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuXHRjb21waWxlckNhY2hlID0gY3JlYXRlQ2FjaGUoKSxcblx0c29ydE9yZGVyID0gZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0aWYgKCBhID09PSBiICkge1xuXHRcdFx0aGFzRHVwbGljYXRlID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIDA7XG5cdH0sXG5cblx0Ly8gSW5zdGFuY2UgbWV0aG9kc1xuXHRoYXNPd24gPSAoe30pLmhhc093blByb3BlcnR5LFxuXHRhcnIgPSBbXSxcblx0cG9wID0gYXJyLnBvcCxcblx0cHVzaF9uYXRpdmUgPSBhcnIucHVzaCxcblx0cHVzaCA9IGFyci5wdXNoLFxuXHRzbGljZSA9IGFyci5zbGljZSxcblx0Ly8gVXNlIGEgc3RyaXBwZWQtZG93biBpbmRleE9mIGFzIGl0J3MgZmFzdGVyIHRoYW4gbmF0aXZlXG5cdC8vIGh0dHBzOi8vanNwZXJmLmNvbS90aG9yLWluZGV4b2YtdnMtZm9yLzVcblx0aW5kZXhPZiA9IGZ1bmN0aW9uKCBsaXN0LCBlbGVtICkge1xuXHRcdHZhciBpID0gMCxcblx0XHRcdGxlbiA9IGxpc3QubGVuZ3RoO1xuXHRcdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0aWYgKCBsaXN0W2ldID09PSBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIC0xO1xuXHR9LFxuXG5cdGJvb2xlYW5zID0gXCJjaGVja2VkfHNlbGVjdGVkfGFzeW5jfGF1dG9mb2N1c3xhdXRvcGxheXxjb250cm9sc3xkZWZlcnxkaXNhYmxlZHxoaWRkZW58aXNtYXB8bG9vcHxtdWx0aXBsZXxvcGVufHJlYWRvbmx5fHJlcXVpcmVkfHNjb3BlZFwiLFxuXG5cdC8vIFJlZ3VsYXIgZXhwcmVzc2lvbnNcblxuXHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLXNlbGVjdG9ycy8jd2hpdGVzcGFjZVxuXHR3aGl0ZXNwYWNlID0gXCJbXFxcXHgyMFxcXFx0XFxcXHJcXFxcblxcXFxmXVwiLFxuXG5cdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL0NTUzIxL3N5bmRhdGEuaHRtbCN2YWx1ZS1kZWYtaWRlbnRpZmllclxuXHRpZGVudGlmaWVyID0gXCIoPzpcXFxcXFxcXC58W1xcXFx3LV18W15cXDAtXFxcXHhhMF0pK1wiLFxuXG5cdC8vIEF0dHJpYnV0ZSBzZWxlY3RvcnM6IGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jYXR0cmlidXRlLXNlbGVjdG9yc1xuXHRhdHRyaWJ1dGVzID0gXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKihcIiArIGlkZW50aWZpZXIgKyBcIikoPzpcIiArIHdoaXRlc3BhY2UgK1xuXHRcdC8vIE9wZXJhdG9yIChjYXB0dXJlIDIpXG5cdFx0XCIqKFsqXiR8IX5dPz0pXCIgKyB3aGl0ZXNwYWNlICtcblx0XHQvLyBcIkF0dHJpYnV0ZSB2YWx1ZXMgbXVzdCBiZSBDU1MgaWRlbnRpZmllcnMgW2NhcHR1cmUgNV0gb3Igc3RyaW5ncyBbY2FwdHVyZSAzIG9yIGNhcHR1cmUgNF1cIlxuXHRcdFwiKig/OicoKD86XFxcXFxcXFwufFteXFxcXFxcXFwnXSkqKSd8XFxcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXFxcXCJdKSopXFxcInwoXCIgKyBpZGVudGlmaWVyICsgXCIpKXwpXCIgKyB3aGl0ZXNwYWNlICtcblx0XHRcIipcXFxcXVwiLFxuXG5cdHBzZXVkb3MgPSBcIjooXCIgKyBpZGVudGlmaWVyICsgXCIpKD86XFxcXCgoXCIgK1xuXHRcdC8vIFRvIHJlZHVjZSB0aGUgbnVtYmVyIG9mIHNlbGVjdG9ycyBuZWVkaW5nIHRva2VuaXplIGluIHRoZSBwcmVGaWx0ZXIsIHByZWZlciBhcmd1bWVudHM6XG5cdFx0Ly8gMS4gcXVvdGVkIChjYXB0dXJlIDM7IGNhcHR1cmUgNCBvciBjYXB0dXJlIDUpXG5cdFx0XCIoJygoPzpcXFxcXFxcXC58W15cXFxcXFxcXCddKSopJ3xcXFwiKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcXFxcIl0pKilcXFwiKXxcIiArXG5cdFx0Ly8gMi4gc2ltcGxlIChjYXB0dXJlIDYpXG5cdFx0XCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFwoKVtcXFxcXV18XCIgKyBhdHRyaWJ1dGVzICsgXCIpKil8XCIgK1xuXHRcdC8vIDMuIGFueXRoaW5nIGVsc2UgKGNhcHR1cmUgMilcblx0XHRcIi4qXCIgK1xuXHRcdFwiKVxcXFwpfClcIixcblxuXHQvLyBMZWFkaW5nIGFuZCBub24tZXNjYXBlZCB0cmFpbGluZyB3aGl0ZXNwYWNlLCBjYXB0dXJpbmcgc29tZSBub24td2hpdGVzcGFjZSBjaGFyYWN0ZXJzIHByZWNlZGluZyB0aGUgbGF0dGVyXG5cdHJ3aGl0ZXNwYWNlID0gbmV3IFJlZ0V4cCggd2hpdGVzcGFjZSArIFwiK1wiLCBcImdcIiApLFxuXHRydHJpbSA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiK3woKD86XnxbXlxcXFxcXFxcXSkoPzpcXFxcXFxcXC4pKilcIiArIHdoaXRlc3BhY2UgKyBcIiskXCIsIFwiZ1wiICksXG5cblx0cmNvbW1hID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIqLFwiICsgd2hpdGVzcGFjZSArIFwiKlwiICksXG5cdHJjb21iaW5hdG9ycyA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKihbPit+XXxcIiArIHdoaXRlc3BhY2UgKyBcIilcIiArIHdoaXRlc3BhY2UgKyBcIipcIiApLFxuXG5cdHJhdHRyaWJ1dGVRdW90ZXMgPSBuZXcgUmVnRXhwKCBcIj1cIiArIHdoaXRlc3BhY2UgKyBcIiooW15cXFxcXSdcXFwiXSo/KVwiICsgd2hpdGVzcGFjZSArIFwiKlxcXFxdXCIsIFwiZ1wiICksXG5cblx0cnBzZXVkbyA9IG5ldyBSZWdFeHAoIHBzZXVkb3MgKSxcblx0cmlkZW50aWZpZXIgPSBuZXcgUmVnRXhwKCBcIl5cIiArIGlkZW50aWZpZXIgKyBcIiRcIiApLFxuXG5cdG1hdGNoRXhwciA9IHtcblx0XHRcIklEXCI6IG5ldyBSZWdFeHAoIFwiXiMoXCIgKyBpZGVudGlmaWVyICsgXCIpXCIgKSxcblx0XHRcIkNMQVNTXCI6IG5ldyBSZWdFeHAoIFwiXlxcXFwuKFwiICsgaWRlbnRpZmllciArIFwiKVwiICksXG5cdFx0XCJUQUdcIjogbmV3IFJlZ0V4cCggXCJeKFwiICsgaWRlbnRpZmllciArIFwifFsqXSlcIiApLFxuXHRcdFwiQVRUUlwiOiBuZXcgUmVnRXhwKCBcIl5cIiArIGF0dHJpYnV0ZXMgKSxcblx0XHRcIlBTRVVET1wiOiBuZXcgUmVnRXhwKCBcIl5cIiArIHBzZXVkb3MgKSxcblx0XHRcIkNISUxEXCI6IG5ldyBSZWdFeHAoIFwiXjoob25seXxmaXJzdHxsYXN0fG50aHxudGgtbGFzdCktKGNoaWxkfG9mLXR5cGUpKD86XFxcXChcIiArIHdoaXRlc3BhY2UgK1xuXHRcdFx0XCIqKGV2ZW58b2RkfCgoWystXXwpKFxcXFxkKilufClcIiArIHdoaXRlc3BhY2UgKyBcIiooPzooWystXXwpXCIgKyB3aGl0ZXNwYWNlICtcblx0XHRcdFwiKihcXFxcZCspfCkpXCIgKyB3aGl0ZXNwYWNlICsgXCIqXFxcXCl8KVwiLCBcImlcIiApLFxuXHRcdFwiYm9vbFwiOiBuZXcgUmVnRXhwKCBcIl4oPzpcIiArIGJvb2xlYW5zICsgXCIpJFwiLCBcImlcIiApLFxuXHRcdC8vIEZvciB1c2UgaW4gbGlicmFyaWVzIGltcGxlbWVudGluZyAuaXMoKVxuXHRcdC8vIFdlIHVzZSB0aGlzIGZvciBQT1MgbWF0Y2hpbmcgaW4gYHNlbGVjdGBcblx0XHRcIm5lZWRzQ29udGV4dFwiOiBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIipbPit+XXw6KGV2ZW58b2RkfGVxfGd0fGx0fG50aHxmaXJzdHxsYXN0KSg/OlxcXFwoXCIgK1xuXHRcdFx0d2hpdGVzcGFjZSArIFwiKigoPzotXFxcXGQpP1xcXFxkKilcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcKXwpKD89W14tXXwkKVwiLCBcImlcIiApXG5cdH0sXG5cblx0cmlucHV0cyA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGJ1dHRvbikkL2ksXG5cdHJoZWFkZXIgPSAvXmhcXGQkL2ksXG5cblx0cm5hdGl2ZSA9IC9eW157XStcXHtcXHMqXFxbbmF0aXZlIFxcdy8sXG5cblx0Ly8gRWFzaWx5LXBhcnNlYWJsZS9yZXRyaWV2YWJsZSBJRCBvciBUQUcgb3IgQ0xBU1Mgc2VsZWN0b3JzXG5cdHJxdWlja0V4cHIgPSAvXig/OiMoW1xcdy1dKyl8KFxcdyspfFxcLihbXFx3LV0rKSkkLyxcblxuXHRyc2libGluZyA9IC9bK35dLyxcblxuXHQvLyBDU1MgZXNjYXBlc1xuXHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9DU1MyMS9zeW5kYXRhLmh0bWwjZXNjYXBlZC1jaGFyYWN0ZXJzXG5cdHJ1bmVzY2FwZSA9IG5ldyBSZWdFeHAoIFwiXFxcXFxcXFwoW1xcXFxkYS1mXXsxLDZ9XCIgKyB3aGl0ZXNwYWNlICsgXCI/fChcIiArIHdoaXRlc3BhY2UgKyBcIil8LilcIiwgXCJpZ1wiICksXG5cdGZ1bmVzY2FwZSA9IGZ1bmN0aW9uKCBfLCBlc2NhcGVkLCBlc2NhcGVkV2hpdGVzcGFjZSApIHtcblx0XHR2YXIgaGlnaCA9IFwiMHhcIiArIGVzY2FwZWQgLSAweDEwMDAwO1xuXHRcdC8vIE5hTiBtZWFucyBub24tY29kZXBvaW50XG5cdFx0Ly8gU3VwcG9ydDogRmlyZWZveDwyNFxuXHRcdC8vIFdvcmthcm91bmQgZXJyb25lb3VzIG51bWVyaWMgaW50ZXJwcmV0YXRpb24gb2YgK1wiMHhcIlxuXHRcdHJldHVybiBoaWdoICE9PSBoaWdoIHx8IGVzY2FwZWRXaGl0ZXNwYWNlID9cblx0XHRcdGVzY2FwZWQgOlxuXHRcdFx0aGlnaCA8IDAgP1xuXHRcdFx0XHQvLyBCTVAgY29kZXBvaW50XG5cdFx0XHRcdFN0cmluZy5mcm9tQ2hhckNvZGUoIGhpZ2ggKyAweDEwMDAwICkgOlxuXHRcdFx0XHQvLyBTdXBwbGVtZW50YWwgUGxhbmUgY29kZXBvaW50IChzdXJyb2dhdGUgcGFpcilcblx0XHRcdFx0U3RyaW5nLmZyb21DaGFyQ29kZSggaGlnaCA+PiAxMCB8IDB4RDgwMCwgaGlnaCAmIDB4M0ZGIHwgMHhEQzAwICk7XG5cdH0sXG5cblx0Ly8gQ1NTIHN0cmluZy9pZGVudGlmaWVyIHNlcmlhbGl6YXRpb25cblx0Ly8gaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzc29tLyNjb21tb24tc2VyaWFsaXppbmctaWRpb21zXG5cdHJjc3Nlc2NhcGUgPSAvKFtcXDAtXFx4MWZcXHg3Zl18Xi0/XFxkKXxeLSR8W15cXDAtXFx4MWZcXHg3Zi1cXHVGRkZGXFx3LV0vZyxcblx0ZmNzc2VzY2FwZSA9IGZ1bmN0aW9uKCBjaCwgYXNDb2RlUG9pbnQgKSB7XG5cdFx0aWYgKCBhc0NvZGVQb2ludCApIHtcblxuXHRcdFx0Ly8gVSswMDAwIE5VTEwgYmVjb21lcyBVK0ZGRkQgUkVQTEFDRU1FTlQgQ0hBUkFDVEVSXG5cdFx0XHRpZiAoIGNoID09PSBcIlxcMFwiICkge1xuXHRcdFx0XHRyZXR1cm4gXCJcXHVGRkZEXCI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbnRyb2wgY2hhcmFjdGVycyBhbmQgKGRlcGVuZGVudCB1cG9uIHBvc2l0aW9uKSBudW1iZXJzIGdldCBlc2NhcGVkIGFzIGNvZGUgcG9pbnRzXG5cdFx0XHRyZXR1cm4gY2guc2xpY2UoIDAsIC0xICkgKyBcIlxcXFxcIiArIGNoLmNoYXJDb2RlQXQoIGNoLmxlbmd0aCAtIDEgKS50b1N0cmluZyggMTYgKSArIFwiIFwiO1xuXHRcdH1cblxuXHRcdC8vIE90aGVyIHBvdGVudGlhbGx5LXNwZWNpYWwgQVNDSUkgY2hhcmFjdGVycyBnZXQgYmFja3NsYXNoLWVzY2FwZWRcblx0XHRyZXR1cm4gXCJcXFxcXCIgKyBjaDtcblx0fSxcblxuXHQvLyBVc2VkIGZvciBpZnJhbWVzXG5cdC8vIFNlZSBzZXREb2N1bWVudCgpXG5cdC8vIFJlbW92aW5nIHRoZSBmdW5jdGlvbiB3cmFwcGVyIGNhdXNlcyBhIFwiUGVybWlzc2lvbiBEZW5pZWRcIlxuXHQvLyBlcnJvciBpbiBJRVxuXHR1bmxvYWRIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0c2V0RG9jdW1lbnQoKTtcblx0fSxcblxuXHRkaXNhYmxlZEFuY2VzdG9yID0gYWRkQ29tYmluYXRvcihcblx0XHRmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtLmRpc2FibGVkID09PSB0cnVlICYmIChcImZvcm1cIiBpbiBlbGVtIHx8IFwibGFiZWxcIiBpbiBlbGVtKTtcblx0XHR9LFxuXHRcdHsgZGlyOiBcInBhcmVudE5vZGVcIiwgbmV4dDogXCJsZWdlbmRcIiB9XG5cdCk7XG5cbi8vIE9wdGltaXplIGZvciBwdXNoLmFwcGx5KCBfLCBOb2RlTGlzdCApXG50cnkge1xuXHRwdXNoLmFwcGx5KFxuXHRcdChhcnIgPSBzbGljZS5jYWxsKCBwcmVmZXJyZWREb2MuY2hpbGROb2RlcyApKSxcblx0XHRwcmVmZXJyZWREb2MuY2hpbGROb2Rlc1xuXHQpO1xuXHQvLyBTdXBwb3J0OiBBbmRyb2lkPDQuMFxuXHQvLyBEZXRlY3Qgc2lsZW50bHkgZmFpbGluZyBwdXNoLmFwcGx5XG5cdGFyclsgcHJlZmVycmVkRG9jLmNoaWxkTm9kZXMubGVuZ3RoIF0ubm9kZVR5cGU7XG59IGNhdGNoICggZSApIHtcblx0cHVzaCA9IHsgYXBwbHk6IGFyci5sZW5ndGggP1xuXG5cdFx0Ly8gTGV2ZXJhZ2Ugc2xpY2UgaWYgcG9zc2libGVcblx0XHRmdW5jdGlvbiggdGFyZ2V0LCBlbHMgKSB7XG5cdFx0XHRwdXNoX25hdGl2ZS5hcHBseSggdGFyZ2V0LCBzbGljZS5jYWxsKGVscykgKTtcblx0XHR9IDpcblxuXHRcdC8vIFN1cHBvcnQ6IElFPDlcblx0XHQvLyBPdGhlcndpc2UgYXBwZW5kIGRpcmVjdGx5XG5cdFx0ZnVuY3Rpb24oIHRhcmdldCwgZWxzICkge1xuXHRcdFx0dmFyIGogPSB0YXJnZXQubGVuZ3RoLFxuXHRcdFx0XHRpID0gMDtcblx0XHRcdC8vIENhbid0IHRydXN0IE5vZGVMaXN0Lmxlbmd0aFxuXHRcdFx0d2hpbGUgKCAodGFyZ2V0W2orK10gPSBlbHNbaSsrXSkgKSB7fVxuXHRcdFx0dGFyZ2V0Lmxlbmd0aCA9IGogLSAxO1xuXHRcdH1cblx0fTtcbn1cblxuZnVuY3Rpb24gU2l6emxlKCBzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApIHtcblx0dmFyIG0sIGksIGVsZW0sIG5pZCwgbWF0Y2gsIGdyb3VwcywgbmV3U2VsZWN0b3IsXG5cdFx0bmV3Q29udGV4dCA9IGNvbnRleHQgJiYgY29udGV4dC5vd25lckRvY3VtZW50LFxuXG5cdFx0Ly8gbm9kZVR5cGUgZGVmYXVsdHMgdG8gOSwgc2luY2UgY29udGV4dCBkZWZhdWx0cyB0byBkb2N1bWVudFxuXHRcdG5vZGVUeXBlID0gY29udGV4dCA/IGNvbnRleHQubm9kZVR5cGUgOiA5O1xuXG5cdHJlc3VsdHMgPSByZXN1bHRzIHx8IFtdO1xuXG5cdC8vIFJldHVybiBlYXJseSBmcm9tIGNhbGxzIHdpdGggaW52YWxpZCBzZWxlY3RvciBvciBjb250ZXh0XG5cdGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiIHx8ICFzZWxlY3RvciB8fFxuXHRcdG5vZGVUeXBlICE9PSAxICYmIG5vZGVUeXBlICE9PSA5ICYmIG5vZGVUeXBlICE9PSAxMSApIHtcblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cblx0Ly8gVHJ5IHRvIHNob3J0Y3V0IGZpbmQgb3BlcmF0aW9ucyAoYXMgb3Bwb3NlZCB0byBmaWx0ZXJzKSBpbiBIVE1MIGRvY3VtZW50c1xuXHRpZiAoICFzZWVkICkge1xuXG5cdFx0aWYgKCAoIGNvbnRleHQgPyBjb250ZXh0Lm93bmVyRG9jdW1lbnQgfHwgY29udGV4dCA6IHByZWZlcnJlZERvYyApICE9PSBkb2N1bWVudCApIHtcblx0XHRcdHNldERvY3VtZW50KCBjb250ZXh0ICk7XG5cdFx0fVxuXHRcdGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xuXG5cdFx0aWYgKCBkb2N1bWVudElzSFRNTCApIHtcblxuXHRcdFx0Ly8gSWYgdGhlIHNlbGVjdG9yIGlzIHN1ZmZpY2llbnRseSBzaW1wbGUsIHRyeSB1c2luZyBhIFwiZ2V0KkJ5KlwiIERPTSBtZXRob2Rcblx0XHRcdC8vIChleGNlcHRpbmcgRG9jdW1lbnRGcmFnbWVudCBjb250ZXh0LCB3aGVyZSB0aGUgbWV0aG9kcyBkb24ndCBleGlzdClcblx0XHRcdGlmICggbm9kZVR5cGUgIT09IDExICYmIChtYXRjaCA9IHJxdWlja0V4cHIuZXhlYyggc2VsZWN0b3IgKSkgKSB7XG5cblx0XHRcdFx0Ly8gSUQgc2VsZWN0b3Jcblx0XHRcdFx0aWYgKCAobSA9IG1hdGNoWzFdKSApIHtcblxuXHRcdFx0XHRcdC8vIERvY3VtZW50IGNvbnRleHRcblx0XHRcdFx0XHRpZiAoIG5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoZWxlbSA9IGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIG0gKSkgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUsIE9wZXJhLCBXZWJraXRcblx0XHRcdFx0XHRcdFx0Ly8gVE9ETzogaWRlbnRpZnkgdmVyc2lvbnNcblx0XHRcdFx0XHRcdFx0Ly8gZ2V0RWxlbWVudEJ5SWQgY2FuIG1hdGNoIGVsZW1lbnRzIGJ5IG5hbWUgaW5zdGVhZCBvZiBJRFxuXHRcdFx0XHRcdFx0XHRpZiAoIGVsZW0uaWQgPT09IG0gKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0cy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gRWxlbWVudCBjb250ZXh0XG5cdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUsIE9wZXJhLCBXZWJraXRcblx0XHRcdFx0XHRcdC8vIFRPRE86IGlkZW50aWZ5IHZlcnNpb25zXG5cdFx0XHRcdFx0XHQvLyBnZXRFbGVtZW50QnlJZCBjYW4gbWF0Y2ggZWxlbWVudHMgYnkgbmFtZSBpbnN0ZWFkIG9mIElEXG5cdFx0XHRcdFx0XHRpZiAoIG5ld0NvbnRleHQgJiYgKGVsZW0gPSBuZXdDb250ZXh0LmdldEVsZW1lbnRCeUlkKCBtICkpICYmXG5cdFx0XHRcdFx0XHRcdGNvbnRhaW5zKCBjb250ZXh0LCBlbGVtICkgJiZcblx0XHRcdFx0XHRcdFx0ZWxlbS5pZCA9PT0gbSApIHtcblxuXHRcdFx0XHRcdFx0XHRyZXN1bHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFR5cGUgc2VsZWN0b3Jcblx0XHRcdFx0fSBlbHNlIGlmICggbWF0Y2hbMl0gKSB7XG5cdFx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggc2VsZWN0b3IgKSApO1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXG5cdFx0XHRcdC8vIENsYXNzIHNlbGVjdG9yXG5cdFx0XHRcdH0gZWxzZSBpZiAoIChtID0gbWF0Y2hbM10pICYmIHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSAmJlxuXHRcdFx0XHRcdGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSApIHtcblxuXHRcdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggbSApICk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gVGFrZSBhZHZhbnRhZ2Ugb2YgcXVlcnlTZWxlY3RvckFsbFxuXHRcdFx0aWYgKCBzdXBwb3J0LnFzYSAmJlxuXHRcdFx0XHQhY29tcGlsZXJDYWNoZVsgc2VsZWN0b3IgKyBcIiBcIiBdICYmXG5cdFx0XHRcdCghcmJ1Z2d5UVNBIHx8ICFyYnVnZ3lRU0EudGVzdCggc2VsZWN0b3IgKSkgKSB7XG5cblx0XHRcdFx0aWYgKCBub2RlVHlwZSAhPT0gMSApIHtcblx0XHRcdFx0XHRuZXdDb250ZXh0ID0gY29udGV4dDtcblx0XHRcdFx0XHRuZXdTZWxlY3RvciA9IHNlbGVjdG9yO1xuXG5cdFx0XHRcdC8vIHFTQSBsb29rcyBvdXRzaWRlIEVsZW1lbnQgY29udGV4dCwgd2hpY2ggaXMgbm90IHdoYXQgd2Ugd2FudFxuXHRcdFx0XHQvLyBUaGFua3MgdG8gQW5kcmV3IER1cG9udCBmb3IgdGhpcyB3b3JrYXJvdW5kIHRlY2huaXF1ZVxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8PThcblx0XHRcdFx0Ly8gRXhjbHVkZSBvYmplY3QgZWxlbWVudHNcblx0XHRcdFx0fSBlbHNlIGlmICggY29udGV4dC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSBcIm9iamVjdFwiICkge1xuXG5cdFx0XHRcdFx0Ly8gQ2FwdHVyZSB0aGUgY29udGV4dCBJRCwgc2V0dGluZyBpdCBmaXJzdCBpZiBuZWNlc3Nhcnlcblx0XHRcdFx0XHRpZiAoIChuaWQgPSBjb250ZXh0LmdldEF0dHJpYnV0ZSggXCJpZFwiICkpICkge1xuXHRcdFx0XHRcdFx0bmlkID0gbmlkLnJlcGxhY2UoIHJjc3Nlc2NhcGUsIGZjc3Nlc2NhcGUgKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29udGV4dC5zZXRBdHRyaWJ1dGUoIFwiaWRcIiwgKG5pZCA9IGV4cGFuZG8pICk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gUHJlZml4IGV2ZXJ5IHNlbGVjdG9yIGluIHRoZSBsaXN0XG5cdFx0XHRcdFx0Z3JvdXBzID0gdG9rZW5pemUoIHNlbGVjdG9yICk7XG5cdFx0XHRcdFx0aSA9IGdyb3Vwcy5sZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRncm91cHNbaV0gPSBcIiNcIiArIG5pZCArIFwiIFwiICsgdG9TZWxlY3RvciggZ3JvdXBzW2ldICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG5ld1NlbGVjdG9yID0gZ3JvdXBzLmpvaW4oIFwiLFwiICk7XG5cblx0XHRcdFx0XHQvLyBFeHBhbmQgY29udGV4dCBmb3Igc2libGluZyBzZWxlY3RvcnNcblx0XHRcdFx0XHRuZXdDb250ZXh0ID0gcnNpYmxpbmcudGVzdCggc2VsZWN0b3IgKSAmJiB0ZXN0Q29udGV4dCggY29udGV4dC5wYXJlbnROb2RlICkgfHxcblx0XHRcdFx0XHRcdGNvbnRleHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIG5ld1NlbGVjdG9yICkge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLFxuXHRcdFx0XHRcdFx0XHRuZXdDb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIG5ld1NlbGVjdG9yIClcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHR9IGNhdGNoICggcXNhRXJyb3IgKSB7XG5cdFx0XHRcdFx0fSBmaW5hbGx5IHtcblx0XHRcdFx0XHRcdGlmICggbmlkID09PSBleHBhbmRvICkge1xuXHRcdFx0XHRcdFx0XHRjb250ZXh0LnJlbW92ZUF0dHJpYnV0ZSggXCJpZFwiICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gQWxsIG90aGVyc1xuXHRyZXR1cm4gc2VsZWN0KCBzZWxlY3Rvci5yZXBsYWNlKCBydHJpbSwgXCIkMVwiICksIGNvbnRleHQsIHJlc3VsdHMsIHNlZWQgKTtcbn1cblxuLyoqXG4gKiBDcmVhdGUga2V5LXZhbHVlIGNhY2hlcyBvZiBsaW1pdGVkIHNpemVcbiAqIEByZXR1cm5zIHtmdW5jdGlvbihzdHJpbmcsIG9iamVjdCl9IFJldHVybnMgdGhlIE9iamVjdCBkYXRhIGFmdGVyIHN0b3JpbmcgaXQgb24gaXRzZWxmIHdpdGhcbiAqXHRwcm9wZXJ0eSBuYW1lIHRoZSAoc3BhY2Utc3VmZml4ZWQpIHN0cmluZyBhbmQgKGlmIHRoZSBjYWNoZSBpcyBsYXJnZXIgdGhhbiBFeHByLmNhY2hlTGVuZ3RoKVxuICpcdGRlbGV0aW5nIHRoZSBvbGRlc3QgZW50cnlcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2FjaGUoKSB7XG5cdHZhciBrZXlzID0gW107XG5cblx0ZnVuY3Rpb24gY2FjaGUoIGtleSwgdmFsdWUgKSB7XG5cdFx0Ly8gVXNlIChrZXkgKyBcIiBcIikgdG8gYXZvaWQgY29sbGlzaW9uIHdpdGggbmF0aXZlIHByb3RvdHlwZSBwcm9wZXJ0aWVzIChzZWUgSXNzdWUgIzE1Nylcblx0XHRpZiAoIGtleXMucHVzaCgga2V5ICsgXCIgXCIgKSA+IEV4cHIuY2FjaGVMZW5ndGggKSB7XG5cdFx0XHQvLyBPbmx5IGtlZXAgdGhlIG1vc3QgcmVjZW50IGVudHJpZXNcblx0XHRcdGRlbGV0ZSBjYWNoZVsga2V5cy5zaGlmdCgpIF07XG5cdFx0fVxuXHRcdHJldHVybiAoY2FjaGVbIGtleSArIFwiIFwiIF0gPSB2YWx1ZSk7XG5cdH1cblx0cmV0dXJuIGNhY2hlO1xufVxuXG4vKipcbiAqIE1hcmsgYSBmdW5jdGlvbiBmb3Igc3BlY2lhbCB1c2UgYnkgU2l6emxlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gbWFya1xuICovXG5mdW5jdGlvbiBtYXJrRnVuY3Rpb24oIGZuICkge1xuXHRmblsgZXhwYW5kbyBdID0gdHJ1ZTtcblx0cmV0dXJuIGZuO1xufVxuXG4vKipcbiAqIFN1cHBvcnQgdGVzdGluZyB1c2luZyBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBQYXNzZWQgdGhlIGNyZWF0ZWQgZWxlbWVudCBhbmQgcmV0dXJucyBhIGJvb2xlYW4gcmVzdWx0XG4gKi9cbmZ1bmN0aW9uIGFzc2VydCggZm4gKSB7XG5cdHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKTtcblxuXHR0cnkge1xuXHRcdHJldHVybiAhIWZuKCBlbCApO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9IGZpbmFsbHkge1xuXHRcdC8vIFJlbW92ZSBmcm9tIGl0cyBwYXJlbnQgYnkgZGVmYXVsdFxuXHRcdGlmICggZWwucGFyZW50Tm9kZSApIHtcblx0XHRcdGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIGVsICk7XG5cdFx0fVxuXHRcdC8vIHJlbGVhc2UgbWVtb3J5IGluIElFXG5cdFx0ZWwgPSBudWxsO1xuXHR9XG59XG5cbi8qKlxuICogQWRkcyB0aGUgc2FtZSBoYW5kbGVyIGZvciBhbGwgb2YgdGhlIHNwZWNpZmllZCBhdHRyc1xuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJzIFBpcGUtc2VwYXJhdGVkIGxpc3Qgb2YgYXR0cmlidXRlc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlciBUaGUgbWV0aG9kIHRoYXQgd2lsbCBiZSBhcHBsaWVkXG4gKi9cbmZ1bmN0aW9uIGFkZEhhbmRsZSggYXR0cnMsIGhhbmRsZXIgKSB7XG5cdHZhciBhcnIgPSBhdHRycy5zcGxpdChcInxcIiksXG5cdFx0aSA9IGFyci5sZW5ndGg7XG5cblx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0RXhwci5hdHRySGFuZGxlWyBhcnJbaV0gXSA9IGhhbmRsZXI7XG5cdH1cbn1cblxuLyoqXG4gKiBDaGVja3MgZG9jdW1lbnQgb3JkZXIgb2YgdHdvIHNpYmxpbmdzXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGFcbiAqIEBwYXJhbSB7RWxlbWVudH0gYlxuICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyBsZXNzIHRoYW4gMCBpZiBhIHByZWNlZGVzIGIsIGdyZWF0ZXIgdGhhbiAwIGlmIGEgZm9sbG93cyBiXG4gKi9cbmZ1bmN0aW9uIHNpYmxpbmdDaGVjayggYSwgYiApIHtcblx0dmFyIGN1ciA9IGIgJiYgYSxcblx0XHRkaWZmID0gY3VyICYmIGEubm9kZVR5cGUgPT09IDEgJiYgYi5ub2RlVHlwZSA9PT0gMSAmJlxuXHRcdFx0YS5zb3VyY2VJbmRleCAtIGIuc291cmNlSW5kZXg7XG5cblx0Ly8gVXNlIElFIHNvdXJjZUluZGV4IGlmIGF2YWlsYWJsZSBvbiBib3RoIG5vZGVzXG5cdGlmICggZGlmZiApIHtcblx0XHRyZXR1cm4gZGlmZjtcblx0fVxuXG5cdC8vIENoZWNrIGlmIGIgZm9sbG93cyBhXG5cdGlmICggY3VyICkge1xuXHRcdHdoaWxlICggKGN1ciA9IGN1ci5uZXh0U2libGluZykgKSB7XG5cdFx0XHRpZiAoIGN1ciA9PT0gYiApIHtcblx0XHRcdFx0cmV0dXJuIC0xO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBhID8gMSA6IC0xO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgaW5wdXQgdHlwZXNcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUlucHV0UHNldWRvKCB0eXBlICkge1xuXHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0dmFyIG5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0cmV0dXJuIG5hbWUgPT09IFwiaW5wdXRcIiAmJiBlbGVtLnR5cGUgPT09IHR5cGU7XG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIHVzZSBpbiBwc2V1ZG9zIGZvciBidXR0b25zXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICovXG5mdW5jdGlvbiBjcmVhdGVCdXR0b25Qc2V1ZG8oIHR5cGUgKSB7XG5cdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHR2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRyZXR1cm4gKG5hbWUgPT09IFwiaW5wdXRcIiB8fCBuYW1lID09PSBcImJ1dHRvblwiKSAmJiBlbGVtLnR5cGUgPT09IHR5cGU7XG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIHVzZSBpbiBwc2V1ZG9zIGZvciA6ZW5hYmxlZC86ZGlzYWJsZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZGlzYWJsZWQgdHJ1ZSBmb3IgOmRpc2FibGVkOyBmYWxzZSBmb3IgOmVuYWJsZWRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlRGlzYWJsZWRQc2V1ZG8oIGRpc2FibGVkICkge1xuXG5cdC8vIEtub3duIDpkaXNhYmxlZCBmYWxzZSBwb3NpdGl2ZXM6IGZpZWxkc2V0W2Rpc2FibGVkXSA+IGxlZ2VuZDpudGgtb2YtdHlwZShuKzIpIDpjYW4tZGlzYWJsZVxuXHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHQvLyBPbmx5IGNlcnRhaW4gZWxlbWVudHMgY2FuIG1hdGNoIDplbmFibGVkIG9yIDpkaXNhYmxlZFxuXHRcdC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3NjcmlwdGluZy5odG1sI3NlbGVjdG9yLWVuYWJsZWRcblx0XHQvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zY3JpcHRpbmcuaHRtbCNzZWxlY3Rvci1kaXNhYmxlZFxuXHRcdGlmICggXCJmb3JtXCIgaW4gZWxlbSApIHtcblxuXHRcdFx0Ly8gQ2hlY2sgZm9yIGluaGVyaXRlZCBkaXNhYmxlZG5lc3Mgb24gcmVsZXZhbnQgbm9uLWRpc2FibGVkIGVsZW1lbnRzOlxuXHRcdFx0Ly8gKiBsaXN0ZWQgZm9ybS1hc3NvY2lhdGVkIGVsZW1lbnRzIGluIGEgZGlzYWJsZWQgZmllbGRzZXRcblx0XHRcdC8vICAgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZm9ybXMuaHRtbCNjYXRlZ29yeS1saXN0ZWRcblx0XHRcdC8vICAgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZm9ybXMuaHRtbCNjb25jZXB0LWZlLWRpc2FibGVkXG5cdFx0XHQvLyAqIG9wdGlvbiBlbGVtZW50cyBpbiBhIGRpc2FibGVkIG9wdGdyb3VwXG5cdFx0XHQvLyAgIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2Zvcm1zLmh0bWwjY29uY2VwdC1vcHRpb24tZGlzYWJsZWRcblx0XHRcdC8vIEFsbCBzdWNoIGVsZW1lbnRzIGhhdmUgYSBcImZvcm1cIiBwcm9wZXJ0eS5cblx0XHRcdGlmICggZWxlbS5wYXJlbnROb2RlICYmIGVsZW0uZGlzYWJsZWQgPT09IGZhbHNlICkge1xuXG5cdFx0XHRcdC8vIE9wdGlvbiBlbGVtZW50cyBkZWZlciB0byBhIHBhcmVudCBvcHRncm91cCBpZiBwcmVzZW50XG5cdFx0XHRcdGlmICggXCJsYWJlbFwiIGluIGVsZW0gKSB7XG5cdFx0XHRcdFx0aWYgKCBcImxhYmVsXCIgaW4gZWxlbS5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW0ucGFyZW50Tm9kZS5kaXNhYmxlZCA9PT0gZGlzYWJsZWQ7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtLmRpc2FibGVkID09PSBkaXNhYmxlZDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA2IC0gMTFcblx0XHRcdFx0Ly8gVXNlIHRoZSBpc0Rpc2FibGVkIHNob3J0Y3V0IHByb3BlcnR5IHRvIGNoZWNrIGZvciBkaXNhYmxlZCBmaWVsZHNldCBhbmNlc3RvcnNcblx0XHRcdFx0cmV0dXJuIGVsZW0uaXNEaXNhYmxlZCA9PT0gZGlzYWJsZWQgfHxcblxuXHRcdFx0XHRcdC8vIFdoZXJlIHRoZXJlIGlzIG5vIGlzRGlzYWJsZWQsIGNoZWNrIG1hbnVhbGx5XG5cdFx0XHRcdFx0LyoganNoaW50IC1XMDE4ICovXG5cdFx0XHRcdFx0ZWxlbS5pc0Rpc2FibGVkICE9PSAhZGlzYWJsZWQgJiZcblx0XHRcdFx0XHRcdGRpc2FibGVkQW5jZXN0b3IoIGVsZW0gKSA9PT0gZGlzYWJsZWQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBlbGVtLmRpc2FibGVkID09PSBkaXNhYmxlZDtcblxuXHRcdC8vIFRyeSB0byB3aW5ub3cgb3V0IGVsZW1lbnRzIHRoYXQgY2FuJ3QgYmUgZGlzYWJsZWQgYmVmb3JlIHRydXN0aW5nIHRoZSBkaXNhYmxlZCBwcm9wZXJ0eS5cblx0XHQvLyBTb21lIHZpY3RpbXMgZ2V0IGNhdWdodCBpbiBvdXIgbmV0IChsYWJlbCwgbGVnZW5kLCBtZW51LCB0cmFjayksIGJ1dCBpdCBzaG91bGRuJ3Rcblx0XHQvLyBldmVuIGV4aXN0IG9uIHRoZW0sIGxldCBhbG9uZSBoYXZlIGEgYm9vbGVhbiB2YWx1ZS5cblx0XHR9IGVsc2UgaWYgKCBcImxhYmVsXCIgaW4gZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtLmRpc2FibGVkID09PSBkaXNhYmxlZDtcblx0XHR9XG5cblx0XHQvLyBSZW1haW5pbmcgZWxlbWVudHMgYXJlIG5laXRoZXIgOmVuYWJsZWQgbm9yIDpkaXNhYmxlZFxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIHBvc2l0aW9uYWxzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICovXG5mdW5jdGlvbiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKCBmbiApIHtcblx0cmV0dXJuIG1hcmtGdW5jdGlvbihmdW5jdGlvbiggYXJndW1lbnQgKSB7XG5cdFx0YXJndW1lbnQgPSArYXJndW1lbnQ7XG5cdFx0cmV0dXJuIG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VlZCwgbWF0Y2hlcyApIHtcblx0XHRcdHZhciBqLFxuXHRcdFx0XHRtYXRjaEluZGV4ZXMgPSBmbiggW10sIHNlZWQubGVuZ3RoLCBhcmd1bWVudCApLFxuXHRcdFx0XHRpID0gbWF0Y2hJbmRleGVzLmxlbmd0aDtcblxuXHRcdFx0Ly8gTWF0Y2ggZWxlbWVudHMgZm91bmQgYXQgdGhlIHNwZWNpZmllZCBpbmRleGVzXG5cdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0aWYgKCBzZWVkWyAoaiA9IG1hdGNoSW5kZXhlc1tpXSkgXSApIHtcblx0XHRcdFx0XHRzZWVkW2pdID0gIShtYXRjaGVzW2pdID0gc2VlZFtqXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGEgbm9kZSBmb3IgdmFsaWRpdHkgYXMgYSBTaXp6bGUgY29udGV4dFxuICogQHBhcmFtIHtFbGVtZW50fE9iamVjdD19IGNvbnRleHRcbiAqIEByZXR1cm5zIHtFbGVtZW50fE9iamVjdHxCb29sZWFufSBUaGUgaW5wdXQgbm9kZSBpZiBhY2NlcHRhYmxlLCBvdGhlcndpc2UgYSBmYWxzeSB2YWx1ZVxuICovXG5mdW5jdGlvbiB0ZXN0Q29udGV4dCggY29udGV4dCApIHtcblx0cmV0dXJuIGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29udGV4dDtcbn1cblxuLy8gRXhwb3NlIHN1cHBvcnQgdmFycyBmb3IgY29udmVuaWVuY2VcbnN1cHBvcnQgPSBTaXp6bGUuc3VwcG9ydCA9IHt9O1xuXG4vKipcbiAqIERldGVjdHMgWE1MIG5vZGVzXG4gKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0fSBlbGVtIEFuIGVsZW1lbnQgb3IgYSBkb2N1bWVudFxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWZmIGVsZW0gaXMgYSBub24tSFRNTCBYTUwgbm9kZVxuICovXG5pc1hNTCA9IFNpenpsZS5pc1hNTCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHQvLyBkb2N1bWVudEVsZW1lbnQgaXMgdmVyaWZpZWQgZm9yIGNhc2VzIHdoZXJlIGl0IGRvZXNuJ3QgeWV0IGV4aXN0XG5cdC8vIChzdWNoIGFzIGxvYWRpbmcgaWZyYW1lcyBpbiBJRSAtICM0ODMzKVxuXHR2YXIgZG9jdW1lbnRFbGVtZW50ID0gZWxlbSAmJiAoZWxlbS5vd25lckRvY3VtZW50IHx8IGVsZW0pLmRvY3VtZW50RWxlbWVudDtcblx0cmV0dXJuIGRvY3VtZW50RWxlbWVudCA/IGRvY3VtZW50RWxlbWVudC5ub2RlTmFtZSAhPT0gXCJIVE1MXCIgOiBmYWxzZTtcbn07XG5cbi8qKlxuICogU2V0cyBkb2N1bWVudC1yZWxhdGVkIHZhcmlhYmxlcyBvbmNlIGJhc2VkIG9uIHRoZSBjdXJyZW50IGRvY3VtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0fSBbZG9jXSBBbiBlbGVtZW50IG9yIGRvY3VtZW50IG9iamVjdCB0byB1c2UgdG8gc2V0IHRoZSBkb2N1bWVudFxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY3VycmVudCBkb2N1bWVudFxuICovXG5zZXREb2N1bWVudCA9IFNpenpsZS5zZXREb2N1bWVudCA9IGZ1bmN0aW9uKCBub2RlICkge1xuXHR2YXIgaGFzQ29tcGFyZSwgc3ViV2luZG93LFxuXHRcdGRvYyA9IG5vZGUgPyBub2RlLm93bmVyRG9jdW1lbnQgfHwgbm9kZSA6IHByZWZlcnJlZERvYztcblxuXHQvLyBSZXR1cm4gZWFybHkgaWYgZG9jIGlzIGludmFsaWQgb3IgYWxyZWFkeSBzZWxlY3RlZFxuXHRpZiAoIGRvYyA9PT0gZG9jdW1lbnQgfHwgZG9jLm5vZGVUeXBlICE9PSA5IHx8ICFkb2MuZG9jdW1lbnRFbGVtZW50ICkge1xuXHRcdHJldHVybiBkb2N1bWVudDtcblx0fVxuXG5cdC8vIFVwZGF0ZSBnbG9iYWwgdmFyaWFibGVzXG5cdGRvY3VtZW50ID0gZG9jO1xuXHRkb2NFbGVtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXHRkb2N1bWVudElzSFRNTCA9ICFpc1hNTCggZG9jdW1lbnQgKTtcblxuXHQvLyBTdXBwb3J0OiBJRSA5LTExLCBFZGdlXG5cdC8vIEFjY2Vzc2luZyBpZnJhbWUgZG9jdW1lbnRzIGFmdGVyIHVubG9hZCB0aHJvd3MgXCJwZXJtaXNzaW9uIGRlbmllZFwiIGVycm9ycyAoalF1ZXJ5ICMxMzkzNilcblx0aWYgKCBwcmVmZXJyZWREb2MgIT09IGRvY3VtZW50ICYmXG5cdFx0KHN1YldpbmRvdyA9IGRvY3VtZW50LmRlZmF1bHRWaWV3KSAmJiBzdWJXaW5kb3cudG9wICE9PSBzdWJXaW5kb3cgKSB7XG5cblx0XHQvLyBTdXBwb3J0OiBJRSAxMSwgRWRnZVxuXHRcdGlmICggc3ViV2luZG93LmFkZEV2ZW50TGlzdGVuZXIgKSB7XG5cdFx0XHRzdWJXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggXCJ1bmxvYWRcIiwgdW5sb2FkSGFuZGxlciwgZmFsc2UgKTtcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDkgLSAxMCBvbmx5XG5cdFx0fSBlbHNlIGlmICggc3ViV2luZG93LmF0dGFjaEV2ZW50ICkge1xuXHRcdFx0c3ViV2luZG93LmF0dGFjaEV2ZW50KCBcIm9udW5sb2FkXCIsIHVubG9hZEhhbmRsZXIgKTtcblx0XHR9XG5cdH1cblxuXHQvKiBBdHRyaWJ1dGVzXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXHQvLyBTdXBwb3J0OiBJRTw4XG5cdC8vIFZlcmlmeSB0aGF0IGdldEF0dHJpYnV0ZSByZWFsbHkgcmV0dXJucyBhdHRyaWJ1dGVzIGFuZCBub3QgcHJvcGVydGllc1xuXHQvLyAoZXhjZXB0aW5nIElFOCBib29sZWFucylcblx0c3VwcG9ydC5hdHRyaWJ1dGVzID0gYXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcblx0XHRlbC5jbGFzc05hbWUgPSBcImlcIjtcblx0XHRyZXR1cm4gIWVsLmdldEF0dHJpYnV0ZShcImNsYXNzTmFtZVwiKTtcblx0fSk7XG5cblx0LyogZ2V0RWxlbWVudChzKUJ5KlxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gQ2hlY2sgaWYgZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpIHJldHVybnMgb25seSBlbGVtZW50c1xuXHRzdXBwb3J0LmdldEVsZW1lbnRzQnlUYWdOYW1lID0gYXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcblx0XHRlbC5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlQ29tbWVudChcIlwiKSApO1xuXHRcdHJldHVybiAhZWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpLmxlbmd0aDtcblx0fSk7XG5cblx0Ly8gU3VwcG9ydDogSUU8OVxuXHRzdXBwb3J0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgPSBybmF0aXZlLnRlc3QoIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgKTtcblxuXHQvLyBTdXBwb3J0OiBJRTwxMFxuXHQvLyBDaGVjayBpZiBnZXRFbGVtZW50QnlJZCByZXR1cm5zIGVsZW1lbnRzIGJ5IG5hbWVcblx0Ly8gVGhlIGJyb2tlbiBnZXRFbGVtZW50QnlJZCBtZXRob2RzIGRvbid0IHBpY2sgdXAgcHJvZ3JhbW1hdGljYWxseS1zZXQgbmFtZXMsXG5cdC8vIHNvIHVzZSBhIHJvdW5kYWJvdXQgZ2V0RWxlbWVudHNCeU5hbWUgdGVzdFxuXHRzdXBwb3J0LmdldEJ5SWQgPSBhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHRcdGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGVsICkuaWQgPSBleHBhbmRvO1xuXHRcdHJldHVybiAhZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUgfHwgIWRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCBleHBhbmRvICkubGVuZ3RoO1xuXHR9KTtcblxuXHQvLyBJRCBmaWx0ZXIgYW5kIGZpbmRcblx0aWYgKCBzdXBwb3J0LmdldEJ5SWQgKSB7XG5cdFx0RXhwci5maWx0ZXJbXCJJRFwiXSA9IGZ1bmN0aW9uKCBpZCApIHtcblx0XHRcdHZhciBhdHRySWQgPSBpZC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoXCJpZFwiKSA9PT0gYXR0cklkO1xuXHRcdFx0fTtcblx0XHR9O1xuXHRcdEV4cHIuZmluZFtcIklEXCJdID0gZnVuY3Rpb24oIGlkLCBjb250ZXh0ICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50QnlJZCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudElzSFRNTCApIHtcblx0XHRcdFx0dmFyIGVsZW0gPSBjb250ZXh0LmdldEVsZW1lbnRCeUlkKCBpZCApO1xuXHRcdFx0XHRyZXR1cm4gZWxlbSA/IFsgZWxlbSBdIDogW107XG5cdFx0XHR9XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRFeHByLmZpbHRlcltcIklEXCJdID0gIGZ1bmN0aW9uKCBpZCApIHtcblx0XHRcdHZhciBhdHRySWQgPSBpZC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHR2YXIgbm9kZSA9IHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZU5vZGUgIT09IFwidW5kZWZpbmVkXCIgJiZcblx0XHRcdFx0XHRlbGVtLmdldEF0dHJpYnV0ZU5vZGUoXCJpZFwiKTtcblx0XHRcdFx0cmV0dXJuIG5vZGUgJiYgbm9kZS52YWx1ZSA9PT0gYXR0cklkO1xuXHRcdFx0fTtcblx0XHR9O1xuXG5cdFx0Ly8gU3VwcG9ydDogSUUgNiAtIDcgb25seVxuXHRcdC8vIGdldEVsZW1lbnRCeUlkIGlzIG5vdCByZWxpYWJsZSBhcyBhIGZpbmQgc2hvcnRjdXRcblx0XHRFeHByLmZpbmRbXCJJRFwiXSA9IGZ1bmN0aW9uKCBpZCwgY29udGV4dCApIHtcblx0XHRcdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnRJc0hUTUwgKSB7XG5cdFx0XHRcdHZhciBub2RlLCBpLCBlbGVtcyxcblx0XHRcdFx0XHRlbGVtID0gY29udGV4dC5nZXRFbGVtZW50QnlJZCggaWQgKTtcblxuXHRcdFx0XHRpZiAoIGVsZW0gKSB7XG5cblx0XHRcdFx0XHQvLyBWZXJpZnkgdGhlIGlkIGF0dHJpYnV0ZVxuXHRcdFx0XHRcdG5vZGUgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoXCJpZFwiKTtcblx0XHRcdFx0XHRpZiAoIG5vZGUgJiYgbm9kZS52YWx1ZSA9PT0gaWQgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gWyBlbGVtIF07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gRmFsbCBiYWNrIG9uIGdldEVsZW1lbnRzQnlOYW1lXG5cdFx0XHRcdFx0ZWxlbXMgPSBjb250ZXh0LmdldEVsZW1lbnRzQnlOYW1lKCBpZCApO1xuXHRcdFx0XHRcdGkgPSAwO1xuXHRcdFx0XHRcdHdoaWxlICggKGVsZW0gPSBlbGVtc1tpKytdKSApIHtcblx0XHRcdFx0XHRcdG5vZGUgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoXCJpZFwiKTtcblx0XHRcdFx0XHRcdGlmICggbm9kZSAmJiBub2RlLnZhbHVlID09PSBpZCApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFsgZWxlbSBdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG5cblx0Ly8gVGFnXG5cdEV4cHIuZmluZFtcIlRBR1wiXSA9IHN1cHBvcnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgP1xuXHRcdGZ1bmN0aW9uKCB0YWcsIGNvbnRleHQgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lICE9PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggdGFnICk7XG5cblx0XHRcdC8vIERvY3VtZW50RnJhZ21lbnQgbm9kZXMgZG9uJ3QgaGF2ZSBnRUJUTlxuXHRcdFx0fSBlbHNlIGlmICggc3VwcG9ydC5xc2EgKSB7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIHRhZyApO1xuXHRcdFx0fVxuXHRcdH0gOlxuXG5cdFx0ZnVuY3Rpb24oIHRhZywgY29udGV4dCApIHtcblx0XHRcdHZhciBlbGVtLFxuXHRcdFx0XHR0bXAgPSBbXSxcblx0XHRcdFx0aSA9IDAsXG5cdFx0XHRcdC8vIEJ5IGhhcHB5IGNvaW5jaWRlbmNlLCBhIChicm9rZW4pIGdFQlROIGFwcGVhcnMgb24gRG9jdW1lbnRGcmFnbWVudCBub2RlcyB0b29cblx0XHRcdFx0cmVzdWx0cyA9IGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHRhZyApO1xuXG5cdFx0XHQvLyBGaWx0ZXIgb3V0IHBvc3NpYmxlIGNvbW1lbnRzXG5cdFx0XHRpZiAoIHRhZyA9PT0gXCIqXCIgKSB7XG5cdFx0XHRcdHdoaWxlICggKGVsZW0gPSByZXN1bHRzW2krK10pICkge1xuXHRcdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdFx0XHRcdHRtcC5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRtcDtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdH07XG5cblx0Ly8gQ2xhc3Ncblx0RXhwci5maW5kW1wiQ0xBU1NcIl0gPSBzdXBwb3J0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgJiYgZnVuY3Rpb24oIGNsYXNzTmFtZSwgY29udGV4dCApIHtcblx0XHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnRJc0hUTUwgKSB7XG5cdFx0XHRyZXR1cm4gY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBjbGFzc05hbWUgKTtcblx0XHR9XG5cdH07XG5cblx0LyogUVNBL21hdGNoZXNTZWxlY3RvclxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gUVNBIGFuZCBtYXRjaGVzU2VsZWN0b3Igc3VwcG9ydFxuXG5cdC8vIG1hdGNoZXNTZWxlY3Rvcig6YWN0aXZlKSByZXBvcnRzIGZhbHNlIHdoZW4gdHJ1ZSAoSUU5L09wZXJhIDExLjUpXG5cdHJidWdneU1hdGNoZXMgPSBbXTtcblxuXHQvLyBxU2EoOmZvY3VzKSByZXBvcnRzIGZhbHNlIHdoZW4gdHJ1ZSAoQ2hyb21lIDIxKVxuXHQvLyBXZSBhbGxvdyB0aGlzIGJlY2F1c2Ugb2YgYSBidWcgaW4gSUU4LzkgdGhhdCB0aHJvd3MgYW4gZXJyb3Jcblx0Ly8gd2hlbmV2ZXIgYGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRgIGlzIGFjY2Vzc2VkIG9uIGFuIGlmcmFtZVxuXHQvLyBTbywgd2UgYWxsb3cgOmZvY3VzIHRvIHBhc3MgdGhyb3VnaCBRU0EgYWxsIHRoZSB0aW1lIHRvIGF2b2lkIHRoZSBJRSBlcnJvclxuXHQvLyBTZWUgaHR0cHM6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzEzMzc4XG5cdHJidWdneVFTQSA9IFtdO1xuXG5cdGlmICggKHN1cHBvcnQucXNhID0gcm5hdGl2ZS50ZXN0KCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsICkpICkge1xuXHRcdC8vIEJ1aWxkIFFTQSByZWdleFxuXHRcdC8vIFJlZ2V4IHN0cmF0ZWd5IGFkb3B0ZWQgZnJvbSBEaWVnbyBQZXJpbmlcblx0XHRhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHRcdFx0Ly8gU2VsZWN0IGlzIHNldCB0byBlbXB0eSBzdHJpbmcgb24gcHVycG9zZVxuXHRcdFx0Ly8gVGhpcyBpcyB0byB0ZXN0IElFJ3MgdHJlYXRtZW50IG9mIG5vdCBleHBsaWNpdGx5XG5cdFx0XHQvLyBzZXR0aW5nIGEgYm9vbGVhbiBjb250ZW50IGF0dHJpYnV0ZSxcblx0XHRcdC8vIHNpbmNlIGl0cyBwcmVzZW5jZSBzaG91bGQgYmUgZW5vdWdoXG5cdFx0XHQvLyBodHRwczovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTIzNTlcblx0XHRcdGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGVsICkuaW5uZXJIVE1MID0gXCI8YSBpZD0nXCIgKyBleHBhbmRvICsgXCInPjwvYT5cIiArXG5cdFx0XHRcdFwiPHNlbGVjdCBpZD0nXCIgKyBleHBhbmRvICsgXCItXFxyXFxcXCcgbXNhbGxvd2NhcHR1cmU9Jyc+XCIgK1xuXHRcdFx0XHRcIjxvcHRpb24gc2VsZWN0ZWQ9Jyc+PC9vcHRpb24+PC9zZWxlY3Q+XCI7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFOCwgT3BlcmEgMTEtMTIuMTZcblx0XHRcdC8vIE5vdGhpbmcgc2hvdWxkIGJlIHNlbGVjdGVkIHdoZW4gZW1wdHkgc3RyaW5ncyBmb2xsb3cgXj0gb3IgJD0gb3IgKj1cblx0XHRcdC8vIFRoZSB0ZXN0IGF0dHJpYnV0ZSBtdXN0IGJlIHVua25vd24gaW4gT3BlcmEgYnV0IFwic2FmZVwiIGZvciBXaW5SVFxuXHRcdFx0Ly8gaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9oaDQ2NTM4OC5hc3B4I2F0dHJpYnV0ZV9zZWN0aW9uXG5cdFx0XHRpZiAoIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbbXNhbGxvd2NhcHR1cmVePScnXVwiKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIlsqXiRdPVwiICsgd2hpdGVzcGFjZSArIFwiKig/OicnfFxcXCJcXFwiKVwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFOFxuXHRcdFx0Ly8gQm9vbGVhbiBhdHRyaWJ1dGVzIGFuZCBcInZhbHVlXCIgYXJlIG5vdCB0cmVhdGVkIGNvcnJlY3RseVxuXHRcdFx0aWYgKCAhZWwucXVlcnlTZWxlY3RvckFsbChcIltzZWxlY3RlZF1cIikubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKig/OnZhbHVlfFwiICsgYm9vbGVhbnMgKyBcIilcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBDaHJvbWU8MjksIEFuZHJvaWQ8NC40LCBTYWZhcmk8Ny4wKywgaU9TPDcuMCssIFBoYW50b21KUzwxLjkuOCtcblx0XHRcdGlmICggIWVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiW2lkfj1cIiArIGV4cGFuZG8gKyBcIi1dXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKFwifj1cIik7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFdlYmtpdC9PcGVyYSAtIDpjaGVja2VkIHNob3VsZCByZXR1cm4gc2VsZWN0ZWQgb3B0aW9uIGVsZW1lbnRzXG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1JFQy1jc3MzLXNlbGVjdG9ycy0yMDExMDkyOS8jY2hlY2tlZFxuXHRcdFx0Ly8gSUU4IHRocm93cyBlcnJvciBoZXJlIGFuZCB3aWxsIG5vdCBzZWUgbGF0ZXIgdGVzdHNcblx0XHRcdGlmICggIWVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCI6Y2hlY2tlZFwiKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKFwiOmNoZWNrZWRcIik7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IFNhZmFyaSA4KywgaU9TIDgrXG5cdFx0XHQvLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM2ODUxXG5cdFx0XHQvLyBJbi1wYWdlIGBzZWxlY3RvciNpZCBzaWJsaW5nLWNvbWJpbmF0b3Igc2VsZWN0b3JgIGZhaWxzXG5cdFx0XHRpZiAoICFlbC5xdWVyeVNlbGVjdG9yQWxsKCBcImEjXCIgKyBleHBhbmRvICsgXCIrKlwiICkubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaChcIi4jLitbK35dXCIpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0YXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcblx0XHRcdGVsLmlubmVySFRNTCA9IFwiPGEgaHJlZj0nJyBkaXNhYmxlZD0nZGlzYWJsZWQnPjwvYT5cIiArXG5cdFx0XHRcdFwiPHNlbGVjdCBkaXNhYmxlZD0nZGlzYWJsZWQnPjxvcHRpb24vPjwvc2VsZWN0PlwiO1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBXaW5kb3dzIDggTmF0aXZlIEFwcHNcblx0XHRcdC8vIFRoZSB0eXBlIGFuZCBuYW1lIGF0dHJpYnV0ZXMgYXJlIHJlc3RyaWN0ZWQgZHVyaW5nIC5pbm5lckhUTUwgYXNzaWdubWVudFxuXHRcdFx0dmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuXHRcdFx0aW5wdXQuc2V0QXR0cmlidXRlKCBcInR5cGVcIiwgXCJoaWRkZW5cIiApO1xuXHRcdFx0ZWwuYXBwZW5kQ2hpbGQoIGlucHV0ICkuc2V0QXR0cmlidXRlKCBcIm5hbWVcIiwgXCJEXCIgKTtcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU4XG5cdFx0XHQvLyBFbmZvcmNlIGNhc2Utc2Vuc2l0aXZpdHkgb2YgbmFtZSBhdHRyaWJ1dGVcblx0XHRcdGlmICggZWwucXVlcnlTZWxlY3RvckFsbChcIltuYW1lPWRdXCIpLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwibmFtZVwiICsgd2hpdGVzcGFjZSArIFwiKlsqXiR8IX5dPz1cIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBGRiAzLjUgLSA6ZW5hYmxlZC86ZGlzYWJsZWQgYW5kIGhpZGRlbiBlbGVtZW50cyAoaGlkZGVuIGVsZW1lbnRzIGFyZSBzdGlsbCBlbmFibGVkKVxuXHRcdFx0Ly8gSUU4IHRocm93cyBlcnJvciBoZXJlIGFuZCB3aWxsIG5vdCBzZWUgbGF0ZXIgdGVzdHNcblx0XHRcdGlmICggZWwucXVlcnlTZWxlY3RvckFsbChcIjplbmFibGVkXCIpLmxlbmd0aCAhPT0gMiApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiOmVuYWJsZWRcIiwgXCI6ZGlzYWJsZWRcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRTktMTErXG5cdFx0XHQvLyBJRSdzIDpkaXNhYmxlZCBzZWxlY3RvciBkb2VzIG5vdCBwaWNrIHVwIHRoZSBjaGlsZHJlbiBvZiBkaXNhYmxlZCBmaWVsZHNldHNcblx0XHRcdGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGVsICkuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0aWYgKCBlbC5xdWVyeVNlbGVjdG9yQWxsKFwiOmRpc2FibGVkXCIpLmxlbmd0aCAhPT0gMiApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiOmVuYWJsZWRcIiwgXCI6ZGlzYWJsZWRcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBPcGVyYSAxMC0xMSBkb2VzIG5vdCB0aHJvdyBvbiBwb3N0LWNvbW1hIGludmFsaWQgcHNldWRvc1xuXHRcdFx0ZWwucXVlcnlTZWxlY3RvckFsbChcIiosOnhcIik7XG5cdFx0XHRyYnVnZ3lRU0EucHVzaChcIiwuKjpcIik7XG5cdFx0fSk7XG5cdH1cblxuXHRpZiAoIChzdXBwb3J0Lm1hdGNoZXNTZWxlY3RvciA9IHJuYXRpdmUudGVzdCggKG1hdGNoZXMgPSBkb2NFbGVtLm1hdGNoZXMgfHxcblx0XHRkb2NFbGVtLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGRvY0VsZW0ubW96TWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZG9jRWxlbS5vTWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZG9jRWxlbS5tc01hdGNoZXNTZWxlY3RvcikgKSkgKSB7XG5cblx0XHRhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHRcdFx0Ly8gQ2hlY2sgdG8gc2VlIGlmIGl0J3MgcG9zc2libGUgdG8gZG8gbWF0Y2hlc1NlbGVjdG9yXG5cdFx0XHQvLyBvbiBhIGRpc2Nvbm5lY3RlZCBub2RlIChJRSA5KVxuXHRcdFx0c3VwcG9ydC5kaXNjb25uZWN0ZWRNYXRjaCA9IG1hdGNoZXMuY2FsbCggZWwsIFwiKlwiICk7XG5cblx0XHRcdC8vIFRoaXMgc2hvdWxkIGZhaWwgd2l0aCBhbiBleGNlcHRpb25cblx0XHRcdC8vIEdlY2tvIGRvZXMgbm90IGVycm9yLCByZXR1cm5zIGZhbHNlIGluc3RlYWRcblx0XHRcdG1hdGNoZXMuY2FsbCggZWwsIFwiW3MhPScnXTp4XCIgKTtcblx0XHRcdHJidWdneU1hdGNoZXMucHVzaCggXCIhPVwiLCBwc2V1ZG9zICk7XG5cdFx0fSk7XG5cdH1cblxuXHRyYnVnZ3lRU0EgPSByYnVnZ3lRU0EubGVuZ3RoICYmIG5ldyBSZWdFeHAoIHJidWdneVFTQS5qb2luKFwifFwiKSApO1xuXHRyYnVnZ3lNYXRjaGVzID0gcmJ1Z2d5TWF0Y2hlcy5sZW5ndGggJiYgbmV3IFJlZ0V4cCggcmJ1Z2d5TWF0Y2hlcy5qb2luKFwifFwiKSApO1xuXG5cdC8qIENvbnRhaW5zXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0aGFzQ29tcGFyZSA9IHJuYXRpdmUudGVzdCggZG9jRWxlbS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiApO1xuXG5cdC8vIEVsZW1lbnQgY29udGFpbnMgYW5vdGhlclxuXHQvLyBQdXJwb3NlZnVsbHkgc2VsZi1leGNsdXNpdmVcblx0Ly8gQXMgaW4sIGFuIGVsZW1lbnQgZG9lcyBub3QgY29udGFpbiBpdHNlbGZcblx0Y29udGFpbnMgPSBoYXNDb21wYXJlIHx8IHJuYXRpdmUudGVzdCggZG9jRWxlbS5jb250YWlucyApID9cblx0XHRmdW5jdGlvbiggYSwgYiApIHtcblx0XHRcdHZhciBhZG93biA9IGEubm9kZVR5cGUgPT09IDkgPyBhLmRvY3VtZW50RWxlbWVudCA6IGEsXG5cdFx0XHRcdGJ1cCA9IGIgJiYgYi5wYXJlbnROb2RlO1xuXHRcdFx0cmV0dXJuIGEgPT09IGJ1cCB8fCAhISggYnVwICYmIGJ1cC5ub2RlVHlwZSA9PT0gMSAmJiAoXG5cdFx0XHRcdGFkb3duLmNvbnRhaW5zID9cblx0XHRcdFx0XHRhZG93bi5jb250YWlucyggYnVwICkgOlxuXHRcdFx0XHRcdGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24gJiYgYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYnVwICkgJiAxNlxuXHRcdFx0KSk7XG5cdFx0fSA6XG5cdFx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0XHRpZiAoIGIgKSB7XG5cdFx0XHRcdHdoaWxlICggKGIgPSBiLnBhcmVudE5vZGUpICkge1xuXHRcdFx0XHRcdGlmICggYiA9PT0gYSApIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG5cblx0LyogU29ydGluZ1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gRG9jdW1lbnQgb3JkZXIgc29ydGluZ1xuXHRzb3J0T3JkZXIgPSBoYXNDb21wYXJlID9cblx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cblx0XHQvLyBGbGFnIGZvciBkdXBsaWNhdGUgcmVtb3ZhbFxuXHRcdGlmICggYSA9PT0gYiApIHtcblx0XHRcdGhhc0R1cGxpY2F0ZSA9IHRydWU7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHQvLyBTb3J0IG9uIG1ldGhvZCBleGlzdGVuY2UgaWYgb25seSBvbmUgaW5wdXQgaGFzIGNvbXBhcmVEb2N1bWVudFBvc2l0aW9uXG5cdFx0dmFyIGNvbXBhcmUgPSAhYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiAtICFiLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uO1xuXHRcdGlmICggY29tcGFyZSApIHtcblx0XHRcdHJldHVybiBjb21wYXJlO1xuXHRcdH1cblxuXHRcdC8vIENhbGN1bGF0ZSBwb3NpdGlvbiBpZiBib3RoIGlucHV0cyBiZWxvbmcgdG8gdGhlIHNhbWUgZG9jdW1lbnRcblx0XHRjb21wYXJlID0gKCBhLm93bmVyRG9jdW1lbnQgfHwgYSApID09PSAoIGIub3duZXJEb2N1bWVudCB8fCBiICkgP1xuXHRcdFx0YS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYiApIDpcblxuXHRcdFx0Ly8gT3RoZXJ3aXNlIHdlIGtub3cgdGhleSBhcmUgZGlzY29ubmVjdGVkXG5cdFx0XHQxO1xuXG5cdFx0Ly8gRGlzY29ubmVjdGVkIG5vZGVzXG5cdFx0aWYgKCBjb21wYXJlICYgMSB8fFxuXHRcdFx0KCFzdXBwb3J0LnNvcnREZXRhY2hlZCAmJiBiLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBhICkgPT09IGNvbXBhcmUpICkge1xuXG5cdFx0XHQvLyBDaG9vc2UgdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBpcyByZWxhdGVkIHRvIG91ciBwcmVmZXJyZWQgZG9jdW1lbnRcblx0XHRcdGlmICggYSA9PT0gZG9jdW1lbnQgfHwgYS5vd25lckRvY3VtZW50ID09PSBwcmVmZXJyZWREb2MgJiYgY29udGFpbnMocHJlZmVycmVkRG9jLCBhKSApIHtcblx0XHRcdFx0cmV0dXJuIC0xO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBiID09PSBkb2N1bWVudCB8fCBiLm93bmVyRG9jdW1lbnQgPT09IHByZWZlcnJlZERvYyAmJiBjb250YWlucyhwcmVmZXJyZWREb2MsIGIpICkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTWFpbnRhaW4gb3JpZ2luYWwgb3JkZXJcblx0XHRcdHJldHVybiBzb3J0SW5wdXQgP1xuXHRcdFx0XHQoIGluZGV4T2YoIHNvcnRJbnB1dCwgYSApIC0gaW5kZXhPZiggc29ydElucHV0LCBiICkgKSA6XG5cdFx0XHRcdDA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNvbXBhcmUgJiA0ID8gLTEgOiAxO1xuXHR9IDpcblx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0Ly8gRXhpdCBlYXJseSBpZiB0aGUgbm9kZXMgYXJlIGlkZW50aWNhbFxuXHRcdGlmICggYSA9PT0gYiApIHtcblx0XHRcdGhhc0R1cGxpY2F0ZSA9IHRydWU7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHR2YXIgY3VyLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRhdXAgPSBhLnBhcmVudE5vZGUsXG5cdFx0XHRidXAgPSBiLnBhcmVudE5vZGUsXG5cdFx0XHRhcCA9IFsgYSBdLFxuXHRcdFx0YnAgPSBbIGIgXTtcblxuXHRcdC8vIFBhcmVudGxlc3Mgbm9kZXMgYXJlIGVpdGhlciBkb2N1bWVudHMgb3IgZGlzY29ubmVjdGVkXG5cdFx0aWYgKCAhYXVwIHx8ICFidXAgKSB7XG5cdFx0XHRyZXR1cm4gYSA9PT0gZG9jdW1lbnQgPyAtMSA6XG5cdFx0XHRcdGIgPT09IGRvY3VtZW50ID8gMSA6XG5cdFx0XHRcdGF1cCA/IC0xIDpcblx0XHRcdFx0YnVwID8gMSA6XG5cdFx0XHRcdHNvcnRJbnB1dCA/XG5cdFx0XHRcdCggaW5kZXhPZiggc29ydElucHV0LCBhICkgLSBpbmRleE9mKCBzb3J0SW5wdXQsIGIgKSApIDpcblx0XHRcdFx0MDtcblxuXHRcdC8vIElmIHRoZSBub2RlcyBhcmUgc2libGluZ3MsIHdlIGNhbiBkbyBhIHF1aWNrIGNoZWNrXG5cdFx0fSBlbHNlIGlmICggYXVwID09PSBidXAgKSB7XG5cdFx0XHRyZXR1cm4gc2libGluZ0NoZWNrKCBhLCBiICk7XG5cdFx0fVxuXG5cdFx0Ly8gT3RoZXJ3aXNlIHdlIG5lZWQgZnVsbCBsaXN0cyBvZiB0aGVpciBhbmNlc3RvcnMgZm9yIGNvbXBhcmlzb25cblx0XHRjdXIgPSBhO1xuXHRcdHdoaWxlICggKGN1ciA9IGN1ci5wYXJlbnROb2RlKSApIHtcblx0XHRcdGFwLnVuc2hpZnQoIGN1ciApO1xuXHRcdH1cblx0XHRjdXIgPSBiO1xuXHRcdHdoaWxlICggKGN1ciA9IGN1ci5wYXJlbnROb2RlKSApIHtcblx0XHRcdGJwLnVuc2hpZnQoIGN1ciApO1xuXHRcdH1cblxuXHRcdC8vIFdhbGsgZG93biB0aGUgdHJlZSBsb29raW5nIGZvciBhIGRpc2NyZXBhbmN5XG5cdFx0d2hpbGUgKCBhcFtpXSA9PT0gYnBbaV0gKSB7XG5cdFx0XHRpKys7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGkgP1xuXHRcdFx0Ly8gRG8gYSBzaWJsaW5nIGNoZWNrIGlmIHRoZSBub2RlcyBoYXZlIGEgY29tbW9uIGFuY2VzdG9yXG5cdFx0XHRzaWJsaW5nQ2hlY2soIGFwW2ldLCBicFtpXSApIDpcblxuXHRcdFx0Ly8gT3RoZXJ3aXNlIG5vZGVzIGluIG91ciBkb2N1bWVudCBzb3J0IGZpcnN0XG5cdFx0XHRhcFtpXSA9PT0gcHJlZmVycmVkRG9jID8gLTEgOlxuXHRcdFx0YnBbaV0gPT09IHByZWZlcnJlZERvYyA/IDEgOlxuXHRcdFx0MDtcblx0fTtcblxuXHRyZXR1cm4gZG9jdW1lbnQ7XG59O1xuXG5TaXp6bGUubWF0Y2hlcyA9IGZ1bmN0aW9uKCBleHByLCBlbGVtZW50cyApIHtcblx0cmV0dXJuIFNpenpsZSggZXhwciwgbnVsbCwgbnVsbCwgZWxlbWVudHMgKTtcbn07XG5cblNpenpsZS5tYXRjaGVzU2VsZWN0b3IgPSBmdW5jdGlvbiggZWxlbSwgZXhwciApIHtcblx0Ly8gU2V0IGRvY3VtZW50IHZhcnMgaWYgbmVlZGVkXG5cdGlmICggKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSApICE9PSBkb2N1bWVudCApIHtcblx0XHRzZXREb2N1bWVudCggZWxlbSApO1xuXHR9XG5cblx0Ly8gTWFrZSBzdXJlIHRoYXQgYXR0cmlidXRlIHNlbGVjdG9ycyBhcmUgcXVvdGVkXG5cdGV4cHIgPSBleHByLnJlcGxhY2UoIHJhdHRyaWJ1dGVRdW90ZXMsIFwiPSckMSddXCIgKTtcblxuXHRpZiAoIHN1cHBvcnQubWF0Y2hlc1NlbGVjdG9yICYmIGRvY3VtZW50SXNIVE1MICYmXG5cdFx0IWNvbXBpbGVyQ2FjaGVbIGV4cHIgKyBcIiBcIiBdICYmXG5cdFx0KCAhcmJ1Z2d5TWF0Y2hlcyB8fCAhcmJ1Z2d5TWF0Y2hlcy50ZXN0KCBleHByICkgKSAmJlxuXHRcdCggIXJidWdneVFTQSAgICAgfHwgIXJidWdneVFTQS50ZXN0KCBleHByICkgKSApIHtcblxuXHRcdHRyeSB7XG5cdFx0XHR2YXIgcmV0ID0gbWF0Y2hlcy5jYWxsKCBlbGVtLCBleHByICk7XG5cblx0XHRcdC8vIElFIDkncyBtYXRjaGVzU2VsZWN0b3IgcmV0dXJucyBmYWxzZSBvbiBkaXNjb25uZWN0ZWQgbm9kZXNcblx0XHRcdGlmICggcmV0IHx8IHN1cHBvcnQuZGlzY29ubmVjdGVkTWF0Y2ggfHxcblx0XHRcdFx0XHQvLyBBcyB3ZWxsLCBkaXNjb25uZWN0ZWQgbm9kZXMgYXJlIHNhaWQgdG8gYmUgaW4gYSBkb2N1bWVudFxuXHRcdFx0XHRcdC8vIGZyYWdtZW50IGluIElFIDlcblx0XHRcdFx0XHRlbGVtLmRvY3VtZW50ICYmIGVsZW0uZG9jdW1lbnQubm9kZVR5cGUgIT09IDExICkge1xuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHt9XG5cdH1cblxuXHRyZXR1cm4gU2l6emxlKCBleHByLCBkb2N1bWVudCwgbnVsbCwgWyBlbGVtIF0gKS5sZW5ndGggPiAwO1xufTtcblxuU2l6emxlLmNvbnRhaW5zID0gZnVuY3Rpb24oIGNvbnRleHQsIGVsZW0gKSB7XG5cdC8vIFNldCBkb2N1bWVudCB2YXJzIGlmIG5lZWRlZFxuXHRpZiAoICggY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgKSAhPT0gZG9jdW1lbnQgKSB7XG5cdFx0c2V0RG9jdW1lbnQoIGNvbnRleHQgKTtcblx0fVxuXHRyZXR1cm4gY29udGFpbnMoIGNvbnRleHQsIGVsZW0gKTtcbn07XG5cblNpenpsZS5hdHRyID0gZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cdC8vIFNldCBkb2N1bWVudCB2YXJzIGlmIG5lZWRlZFxuXHRpZiAoICggZWxlbS5vd25lckRvY3VtZW50IHx8IGVsZW0gKSAhPT0gZG9jdW1lbnQgKSB7XG5cdFx0c2V0RG9jdW1lbnQoIGVsZW0gKTtcblx0fVxuXG5cdHZhciBmbiA9IEV4cHIuYXR0ckhhbmRsZVsgbmFtZS50b0xvd2VyQ2FzZSgpIF0sXG5cdFx0Ly8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBPYmplY3QucHJvdG90eXBlIHByb3BlcnRpZXMgKGpRdWVyeSAjMTM4MDcpXG5cdFx0dmFsID0gZm4gJiYgaGFzT3duLmNhbGwoIEV4cHIuYXR0ckhhbmRsZSwgbmFtZS50b0xvd2VyQ2FzZSgpICkgP1xuXHRcdFx0Zm4oIGVsZW0sIG5hbWUsICFkb2N1bWVudElzSFRNTCApIDpcblx0XHRcdHVuZGVmaW5lZDtcblxuXHRyZXR1cm4gdmFsICE9PSB1bmRlZmluZWQgP1xuXHRcdHZhbCA6XG5cdFx0c3VwcG9ydC5hdHRyaWJ1dGVzIHx8ICFkb2N1bWVudElzSFRNTCA/XG5cdFx0XHRlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSApIDpcblx0XHRcdCh2YWwgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUobmFtZSkpICYmIHZhbC5zcGVjaWZpZWQgP1xuXHRcdFx0XHR2YWwudmFsdWUgOlxuXHRcdFx0XHRudWxsO1xufTtcblxuU2l6emxlLmVzY2FwZSA9IGZ1bmN0aW9uKCBzZWwgKSB7XG5cdHJldHVybiAoc2VsICsgXCJcIikucmVwbGFjZSggcmNzc2VzY2FwZSwgZmNzc2VzY2FwZSApO1xufTtcblxuU2l6emxlLmVycm9yID0gZnVuY3Rpb24oIG1zZyApIHtcblx0dGhyb3cgbmV3IEVycm9yKCBcIlN5bnRheCBlcnJvciwgdW5yZWNvZ25pemVkIGV4cHJlc3Npb246IFwiICsgbXNnICk7XG59O1xuXG4vKipcbiAqIERvY3VtZW50IHNvcnRpbmcgYW5kIHJlbW92aW5nIGR1cGxpY2F0ZXNcbiAqIEBwYXJhbSB7QXJyYXlMaWtlfSByZXN1bHRzXG4gKi9cblNpenpsZS51bmlxdWVTb3J0ID0gZnVuY3Rpb24oIHJlc3VsdHMgKSB7XG5cdHZhciBlbGVtLFxuXHRcdGR1cGxpY2F0ZXMgPSBbXSxcblx0XHRqID0gMCxcblx0XHRpID0gMDtcblxuXHQvLyBVbmxlc3Mgd2UgKmtub3cqIHdlIGNhbiBkZXRlY3QgZHVwbGljYXRlcywgYXNzdW1lIHRoZWlyIHByZXNlbmNlXG5cdGhhc0R1cGxpY2F0ZSA9ICFzdXBwb3J0LmRldGVjdER1cGxpY2F0ZXM7XG5cdHNvcnRJbnB1dCA9ICFzdXBwb3J0LnNvcnRTdGFibGUgJiYgcmVzdWx0cy5zbGljZSggMCApO1xuXHRyZXN1bHRzLnNvcnQoIHNvcnRPcmRlciApO1xuXG5cdGlmICggaGFzRHVwbGljYXRlICkge1xuXHRcdHdoaWxlICggKGVsZW0gPSByZXN1bHRzW2krK10pICkge1xuXHRcdFx0aWYgKCBlbGVtID09PSByZXN1bHRzWyBpIF0gKSB7XG5cdFx0XHRcdGogPSBkdXBsaWNhdGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0d2hpbGUgKCBqLS0gKSB7XG5cdFx0XHRyZXN1bHRzLnNwbGljZSggZHVwbGljYXRlc1sgaiBdLCAxICk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ2xlYXIgaW5wdXQgYWZ0ZXIgc29ydGluZyB0byByZWxlYXNlIG9iamVjdHNcblx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvc2l6emxlL3B1bGwvMjI1XG5cdHNvcnRJbnB1dCA9IG51bGw7XG5cblx0cmV0dXJuIHJlc3VsdHM7XG59O1xuXG4vKipcbiAqIFV0aWxpdHkgZnVuY3Rpb24gZm9yIHJldHJpZXZpbmcgdGhlIHRleHQgdmFsdWUgb2YgYW4gYXJyYXkgb2YgRE9NIG5vZGVzXG4gKiBAcGFyYW0ge0FycmF5fEVsZW1lbnR9IGVsZW1cbiAqL1xuZ2V0VGV4dCA9IFNpenpsZS5nZXRUZXh0ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdHZhciBub2RlLFxuXHRcdHJldCA9IFwiXCIsXG5cdFx0aSA9IDAsXG5cdFx0bm9kZVR5cGUgPSBlbGVtLm5vZGVUeXBlO1xuXG5cdGlmICggIW5vZGVUeXBlICkge1xuXHRcdC8vIElmIG5vIG5vZGVUeXBlLCB0aGlzIGlzIGV4cGVjdGVkIHRvIGJlIGFuIGFycmF5XG5cdFx0d2hpbGUgKCAobm9kZSA9IGVsZW1baSsrXSkgKSB7XG5cdFx0XHQvLyBEbyBub3QgdHJhdmVyc2UgY29tbWVudCBub2Rlc1xuXHRcdFx0cmV0ICs9IGdldFRleHQoIG5vZGUgKTtcblx0XHR9XG5cdH0gZWxzZSBpZiAoIG5vZGVUeXBlID09PSAxIHx8IG5vZGVUeXBlID09PSA5IHx8IG5vZGVUeXBlID09PSAxMSApIHtcblx0XHQvLyBVc2UgdGV4dENvbnRlbnQgZm9yIGVsZW1lbnRzXG5cdFx0Ly8gaW5uZXJUZXh0IHVzYWdlIHJlbW92ZWQgZm9yIGNvbnNpc3RlbmN5IG9mIG5ldyBsaW5lcyAoalF1ZXJ5ICMxMTE1Mylcblx0XHRpZiAoIHR5cGVvZiBlbGVtLnRleHRDb250ZW50ID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIGVsZW0udGV4dENvbnRlbnQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIFRyYXZlcnNlIGl0cyBjaGlsZHJlblxuXHRcdFx0Zm9yICggZWxlbSA9IGVsZW0uZmlyc3RDaGlsZDsgZWxlbTsgZWxlbSA9IGVsZW0ubmV4dFNpYmxpbmcgKSB7XG5cdFx0XHRcdHJldCArPSBnZXRUZXh0KCBlbGVtICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2UgaWYgKCBub2RlVHlwZSA9PT0gMyB8fCBub2RlVHlwZSA9PT0gNCApIHtcblx0XHRyZXR1cm4gZWxlbS5ub2RlVmFsdWU7XG5cdH1cblx0Ly8gRG8gbm90IGluY2x1ZGUgY29tbWVudCBvciBwcm9jZXNzaW5nIGluc3RydWN0aW9uIG5vZGVzXG5cblx0cmV0dXJuIHJldDtcbn07XG5cbkV4cHIgPSBTaXp6bGUuc2VsZWN0b3JzID0ge1xuXG5cdC8vIENhbiBiZSBhZGp1c3RlZCBieSB0aGUgdXNlclxuXHRjYWNoZUxlbmd0aDogNTAsXG5cblx0Y3JlYXRlUHNldWRvOiBtYXJrRnVuY3Rpb24sXG5cblx0bWF0Y2g6IG1hdGNoRXhwcixcblxuXHRhdHRySGFuZGxlOiB7fSxcblxuXHRmaW5kOiB7fSxcblxuXHRyZWxhdGl2ZToge1xuXHRcdFwiPlwiOiB7IGRpcjogXCJwYXJlbnROb2RlXCIsIGZpcnN0OiB0cnVlIH0sXG5cdFx0XCIgXCI6IHsgZGlyOiBcInBhcmVudE5vZGVcIiB9LFxuXHRcdFwiK1wiOiB7IGRpcjogXCJwcmV2aW91c1NpYmxpbmdcIiwgZmlyc3Q6IHRydWUgfSxcblx0XHRcIn5cIjogeyBkaXI6IFwicHJldmlvdXNTaWJsaW5nXCIgfVxuXHR9LFxuXG5cdHByZUZpbHRlcjoge1xuXHRcdFwiQVRUUlwiOiBmdW5jdGlvbiggbWF0Y2ggKSB7XG5cdFx0XHRtYXRjaFsxXSA9IG1hdGNoWzFdLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cblx0XHRcdC8vIE1vdmUgdGhlIGdpdmVuIHZhbHVlIHRvIG1hdGNoWzNdIHdoZXRoZXIgcXVvdGVkIG9yIHVucXVvdGVkXG5cdFx0XHRtYXRjaFszXSA9ICggbWF0Y2hbM10gfHwgbWF0Y2hbNF0gfHwgbWF0Y2hbNV0gfHwgXCJcIiApLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cblx0XHRcdGlmICggbWF0Y2hbMl0gPT09IFwifj1cIiApIHtcblx0XHRcdFx0bWF0Y2hbM10gPSBcIiBcIiArIG1hdGNoWzNdICsgXCIgXCI7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBtYXRjaC5zbGljZSggMCwgNCApO1xuXHRcdH0sXG5cblx0XHRcIkNISUxEXCI6IGZ1bmN0aW9uKCBtYXRjaCApIHtcblx0XHRcdC8qIG1hdGNoZXMgZnJvbSBtYXRjaEV4cHJbXCJDSElMRFwiXVxuXHRcdFx0XHQxIHR5cGUgKG9ubHl8bnRofC4uLilcblx0XHRcdFx0MiB3aGF0IChjaGlsZHxvZi10eXBlKVxuXHRcdFx0XHQzIGFyZ3VtZW50IChldmVufG9kZHxcXGQqfFxcZCpuKFsrLV1cXGQrKT98Li4uKVxuXHRcdFx0XHQ0IHhuLWNvbXBvbmVudCBvZiB4bit5IGFyZ3VtZW50IChbKy1dP1xcZCpufClcblx0XHRcdFx0NSBzaWduIG9mIHhuLWNvbXBvbmVudFxuXHRcdFx0XHQ2IHggb2YgeG4tY29tcG9uZW50XG5cdFx0XHRcdDcgc2lnbiBvZiB5LWNvbXBvbmVudFxuXHRcdFx0XHQ4IHkgb2YgeS1jb21wb25lbnRcblx0XHRcdCovXG5cdFx0XHRtYXRjaFsxXSA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRcdGlmICggbWF0Y2hbMV0uc2xpY2UoIDAsIDMgKSA9PT0gXCJudGhcIiApIHtcblx0XHRcdFx0Ly8gbnRoLSogcmVxdWlyZXMgYXJndW1lbnRcblx0XHRcdFx0aWYgKCAhbWF0Y2hbM10gKSB7XG5cdFx0XHRcdFx0U2l6emxlLmVycm9yKCBtYXRjaFswXSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gbnVtZXJpYyB4IGFuZCB5IHBhcmFtZXRlcnMgZm9yIEV4cHIuZmlsdGVyLkNISUxEXG5cdFx0XHRcdC8vIHJlbWVtYmVyIHRoYXQgZmFsc2UvdHJ1ZSBjYXN0IHJlc3BlY3RpdmVseSB0byAwLzFcblx0XHRcdFx0bWF0Y2hbNF0gPSArKCBtYXRjaFs0XSA/IG1hdGNoWzVdICsgKG1hdGNoWzZdIHx8IDEpIDogMiAqICggbWF0Y2hbM10gPT09IFwiZXZlblwiIHx8IG1hdGNoWzNdID09PSBcIm9kZFwiICkgKTtcblx0XHRcdFx0bWF0Y2hbNV0gPSArKCAoIG1hdGNoWzddICsgbWF0Y2hbOF0gKSB8fCBtYXRjaFszXSA9PT0gXCJvZGRcIiApO1xuXG5cdFx0XHQvLyBvdGhlciB0eXBlcyBwcm9oaWJpdCBhcmd1bWVudHNcblx0XHRcdH0gZWxzZSBpZiAoIG1hdGNoWzNdICkge1xuXHRcdFx0XHRTaXp6bGUuZXJyb3IoIG1hdGNoWzBdICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBtYXRjaDtcblx0XHR9LFxuXG5cdFx0XCJQU0VVRE9cIjogZnVuY3Rpb24oIG1hdGNoICkge1xuXHRcdFx0dmFyIGV4Y2Vzcyxcblx0XHRcdFx0dW5xdW90ZWQgPSAhbWF0Y2hbNl0gJiYgbWF0Y2hbMl07XG5cblx0XHRcdGlmICggbWF0Y2hFeHByW1wiQ0hJTERcIl0udGVzdCggbWF0Y2hbMF0gKSApIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFjY2VwdCBxdW90ZWQgYXJndW1lbnRzIGFzLWlzXG5cdFx0XHRpZiAoIG1hdGNoWzNdICkge1xuXHRcdFx0XHRtYXRjaFsyXSA9IG1hdGNoWzRdIHx8IG1hdGNoWzVdIHx8IFwiXCI7XG5cblx0XHRcdC8vIFN0cmlwIGV4Y2VzcyBjaGFyYWN0ZXJzIGZyb20gdW5xdW90ZWQgYXJndW1lbnRzXG5cdFx0XHR9IGVsc2UgaWYgKCB1bnF1b3RlZCAmJiBycHNldWRvLnRlc3QoIHVucXVvdGVkICkgJiZcblx0XHRcdFx0Ly8gR2V0IGV4Y2VzcyBmcm9tIHRva2VuaXplIChyZWN1cnNpdmVseSlcblx0XHRcdFx0KGV4Y2VzcyA9IHRva2VuaXplKCB1bnF1b3RlZCwgdHJ1ZSApKSAmJlxuXHRcdFx0XHQvLyBhZHZhbmNlIHRvIHRoZSBuZXh0IGNsb3NpbmcgcGFyZW50aGVzaXNcblx0XHRcdFx0KGV4Y2VzcyA9IHVucXVvdGVkLmluZGV4T2YoIFwiKVwiLCB1bnF1b3RlZC5sZW5ndGggLSBleGNlc3MgKSAtIHVucXVvdGVkLmxlbmd0aCkgKSB7XG5cblx0XHRcdFx0Ly8gZXhjZXNzIGlzIGEgbmVnYXRpdmUgaW5kZXhcblx0XHRcdFx0bWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZSggMCwgZXhjZXNzICk7XG5cdFx0XHRcdG1hdGNoWzJdID0gdW5xdW90ZWQuc2xpY2UoIDAsIGV4Y2VzcyApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZXR1cm4gb25seSBjYXB0dXJlcyBuZWVkZWQgYnkgdGhlIHBzZXVkbyBmaWx0ZXIgbWV0aG9kICh0eXBlIGFuZCBhcmd1bWVudClcblx0XHRcdHJldHVybiBtYXRjaC5zbGljZSggMCwgMyApO1xuXHRcdH1cblx0fSxcblxuXHRmaWx0ZXI6IHtcblxuXHRcdFwiVEFHXCI6IGZ1bmN0aW9uKCBub2RlTmFtZVNlbGVjdG9yICkge1xuXHRcdFx0dmFyIG5vZGVOYW1lID0gbm9kZU5hbWVTZWxlY3Rvci5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyZXR1cm4gbm9kZU5hbWVTZWxlY3RvciA9PT0gXCIqXCIgP1xuXHRcdFx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH0gOlxuXHRcdFx0XHRmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxlbS5ub2RlTmFtZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5vZGVOYW1lO1xuXHRcdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRcIkNMQVNTXCI6IGZ1bmN0aW9uKCBjbGFzc05hbWUgKSB7XG5cdFx0XHR2YXIgcGF0dGVybiA9IGNsYXNzQ2FjaGVbIGNsYXNzTmFtZSArIFwiIFwiIF07XG5cblx0XHRcdHJldHVybiBwYXR0ZXJuIHx8XG5cdFx0XHRcdChwYXR0ZXJuID0gbmV3IFJlZ0V4cCggXCIoXnxcIiArIHdoaXRlc3BhY2UgKyBcIilcIiArIGNsYXNzTmFtZSArIFwiKFwiICsgd2hpdGVzcGFjZSArIFwifCQpXCIgKSkgJiZcblx0XHRcdFx0Y2xhc3NDYWNoZSggY2xhc3NOYW1lLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0XHRyZXR1cm4gcGF0dGVybi50ZXN0KCB0eXBlb2YgZWxlbS5jbGFzc05hbWUgPT09IFwic3RyaW5nXCIgJiYgZWxlbS5jbGFzc05hbWUgfHwgdHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlICE9PSBcInVuZGVmaW5lZFwiICYmIGVsZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIiApO1xuXHRcdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0XCJBVFRSXCI6IGZ1bmN0aW9uKCBuYW1lLCBvcGVyYXRvciwgY2hlY2sgKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBTaXp6bGUuYXR0ciggZWxlbSwgbmFtZSApO1xuXG5cdFx0XHRcdGlmICggcmVzdWx0ID09IG51bGwgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9wZXJhdG9yID09PSBcIiE9XCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCAhb3BlcmF0b3IgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXN1bHQgKz0gXCJcIjtcblxuXHRcdFx0XHRyZXR1cm4gb3BlcmF0b3IgPT09IFwiPVwiID8gcmVzdWx0ID09PSBjaGVjayA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwiIT1cIiA/IHJlc3VsdCAhPT0gY2hlY2sgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIl49XCIgPyBjaGVjayAmJiByZXN1bHQuaW5kZXhPZiggY2hlY2sgKSA9PT0gMCA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwiKj1cIiA/IGNoZWNrICYmIHJlc3VsdC5pbmRleE9mKCBjaGVjayApID4gLTEgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIiQ9XCIgPyBjaGVjayAmJiByZXN1bHQuc2xpY2UoIC1jaGVjay5sZW5ndGggKSA9PT0gY2hlY2sgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIn49XCIgPyAoIFwiIFwiICsgcmVzdWx0LnJlcGxhY2UoIHJ3aGl0ZXNwYWNlLCBcIiBcIiApICsgXCIgXCIgKS5pbmRleE9mKCBjaGVjayApID4gLTEgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcInw9XCIgPyByZXN1bHQgPT09IGNoZWNrIHx8IHJlc3VsdC5zbGljZSggMCwgY2hlY2subGVuZ3RoICsgMSApID09PSBjaGVjayArIFwiLVwiIDpcblx0XHRcdFx0XHRmYWxzZTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdFwiQ0hJTERcIjogZnVuY3Rpb24oIHR5cGUsIHdoYXQsIGFyZ3VtZW50LCBmaXJzdCwgbGFzdCApIHtcblx0XHRcdHZhciBzaW1wbGUgPSB0eXBlLnNsaWNlKCAwLCAzICkgIT09IFwibnRoXCIsXG5cdFx0XHRcdGZvcndhcmQgPSB0eXBlLnNsaWNlKCAtNCApICE9PSBcImxhc3RcIixcblx0XHRcdFx0b2ZUeXBlID0gd2hhdCA9PT0gXCJvZi10eXBlXCI7XG5cblx0XHRcdHJldHVybiBmaXJzdCA9PT0gMSAmJiBsYXN0ID09PSAwID9cblxuXHRcdFx0XHQvLyBTaG9ydGN1dCBmb3IgOm50aC0qKG4pXG5cdFx0XHRcdGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRcdHJldHVybiAhIWVsZW0ucGFyZW50Tm9kZTtcblx0XHRcdFx0fSA6XG5cblx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdFx0XHR2YXIgY2FjaGUsIHVuaXF1ZUNhY2hlLCBvdXRlckNhY2hlLCBub2RlLCBub2RlSW5kZXgsIHN0YXJ0LFxuXHRcdFx0XHRcdFx0ZGlyID0gc2ltcGxlICE9PSBmb3J3YXJkID8gXCJuZXh0U2libGluZ1wiIDogXCJwcmV2aW91c1NpYmxpbmdcIixcblx0XHRcdFx0XHRcdHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZSxcblx0XHRcdFx0XHRcdG5hbWUgPSBvZlR5cGUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpLFxuXHRcdFx0XHRcdFx0dXNlQ2FjaGUgPSAheG1sICYmICFvZlR5cGUsXG5cdFx0XHRcdFx0XHRkaWZmID0gZmFsc2U7XG5cblx0XHRcdFx0XHRpZiAoIHBhcmVudCApIHtcblxuXHRcdFx0XHRcdFx0Ly8gOihmaXJzdHxsYXN0fG9ubHkpLShjaGlsZHxvZi10eXBlKVxuXHRcdFx0XHRcdFx0aWYgKCBzaW1wbGUgKSB7XG5cdFx0XHRcdFx0XHRcdHdoaWxlICggZGlyICkge1xuXHRcdFx0XHRcdFx0XHRcdG5vZGUgPSBlbGVtO1xuXHRcdFx0XHRcdFx0XHRcdHdoaWxlICggKG5vZGUgPSBub2RlWyBkaXIgXSkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIG9mVHlwZSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZSA6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG5vZGUubm9kZVR5cGUgPT09IDEgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHQvLyBSZXZlcnNlIGRpcmVjdGlvbiBmb3IgOm9ubHktKiAoaWYgd2UgaGF2ZW4ndCB5ZXQgZG9uZSBzbylcblx0XHRcdFx0XHRcdFx0XHRzdGFydCA9IGRpciA9IHR5cGUgPT09IFwib25seVwiICYmICFzdGFydCAmJiBcIm5leHRTaWJsaW5nXCI7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHN0YXJ0ID0gWyBmb3J3YXJkID8gcGFyZW50LmZpcnN0Q2hpbGQgOiBwYXJlbnQubGFzdENoaWxkIF07XG5cblx0XHRcdFx0XHRcdC8vIG5vbi14bWwgOm50aC1jaGlsZCguLi4pIHN0b3JlcyBjYWNoZSBkYXRhIG9uIGBwYXJlbnRgXG5cdFx0XHRcdFx0XHRpZiAoIGZvcndhcmQgJiYgdXNlQ2FjaGUgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gU2VlayBgZWxlbWAgZnJvbSBhIHByZXZpb3VzbHktY2FjaGVkIGluZGV4XG5cblx0XHRcdFx0XHRcdFx0Ly8gLi4uaW4gYSBnemlwLWZyaWVuZGx5IHdheVxuXHRcdFx0XHRcdFx0XHRub2RlID0gcGFyZW50O1xuXHRcdFx0XHRcdFx0XHRvdXRlckNhY2hlID0gbm9kZVsgZXhwYW5kbyBdIHx8IChub2RlWyBleHBhbmRvIF0gPSB7fSk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPDkgb25seVxuXHRcdFx0XHRcdFx0XHQvLyBEZWZlbmQgYWdhaW5zdCBjbG9uZWQgYXR0cm9wZXJ0aWVzIChqUXVlcnkgZ2gtMTcwOSlcblx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGUgPSBvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gfHxcblx0XHRcdFx0XHRcdFx0XHQob3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHRcdGNhY2hlID0gdW5pcXVlQ2FjaGVbIHR5cGUgXSB8fCBbXTtcblx0XHRcdFx0XHRcdFx0bm9kZUluZGV4ID0gY2FjaGVbIDAgXSA9PT0gZGlycnVucyAmJiBjYWNoZVsgMSBdO1xuXHRcdFx0XHRcdFx0XHRkaWZmID0gbm9kZUluZGV4ICYmIGNhY2hlWyAyIF07XG5cdFx0XHRcdFx0XHRcdG5vZGUgPSBub2RlSW5kZXggJiYgcGFyZW50LmNoaWxkTm9kZXNbIG5vZGVJbmRleCBdO1xuXG5cdFx0XHRcdFx0XHRcdHdoaWxlICggKG5vZGUgPSArK25vZGVJbmRleCAmJiBub2RlICYmIG5vZGVbIGRpciBdIHx8XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBGYWxsYmFjayB0byBzZWVraW5nIGBlbGVtYCBmcm9tIHRoZSBzdGFydFxuXHRcdFx0XHRcdFx0XHRcdChkaWZmID0gbm9kZUluZGV4ID0gMCkgfHwgc3RhcnQucG9wKCkpICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gV2hlbiBmb3VuZCwgY2FjaGUgaW5kZXhlcyBvbiBgcGFyZW50YCBhbmQgYnJlYWtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIG5vZGUubm9kZVR5cGUgPT09IDEgJiYgKytkaWZmICYmIG5vZGUgPT09IGVsZW0gKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZVsgdHlwZSBdID0gWyBkaXJydW5zLCBub2RlSW5kZXgsIGRpZmYgXTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQvLyBVc2UgcHJldmlvdXNseS1jYWNoZWQgZWxlbWVudCBpbmRleCBpZiBhdmFpbGFibGVcblx0XHRcdFx0XHRcdFx0aWYgKCB1c2VDYWNoZSApIHtcblx0XHRcdFx0XHRcdFx0XHQvLyAuLi5pbiBhIGd6aXAtZnJpZW5kbHkgd2F5XG5cdFx0XHRcdFx0XHRcdFx0bm9kZSA9IGVsZW07XG5cdFx0XHRcdFx0XHRcdFx0b3V0ZXJDYWNoZSA9IG5vZGVbIGV4cGFuZG8gXSB8fCAobm9kZVsgZXhwYW5kbyBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPDkgb25seVxuXHRcdFx0XHRcdFx0XHRcdC8vIERlZmVuZCBhZ2FpbnN0IGNsb25lZCBhdHRyb3BlcnRpZXMgKGpRdWVyeSBnaC0xNzA5KVxuXHRcdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlID0gb3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHQob3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHRcdFx0Y2FjaGUgPSB1bmlxdWVDYWNoZVsgdHlwZSBdIHx8IFtdO1xuXHRcdFx0XHRcdFx0XHRcdG5vZGVJbmRleCA9IGNhY2hlWyAwIF0gPT09IGRpcnJ1bnMgJiYgY2FjaGVbIDEgXTtcblx0XHRcdFx0XHRcdFx0XHRkaWZmID0gbm9kZUluZGV4O1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Ly8geG1sIDpudGgtY2hpbGQoLi4uKVxuXHRcdFx0XHRcdFx0XHQvLyBvciA6bnRoLWxhc3QtY2hpbGQoLi4uKSBvciA6bnRoKC1sYXN0KT8tb2YtdHlwZSguLi4pXG5cdFx0XHRcdFx0XHRcdGlmICggZGlmZiA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gVXNlIHRoZSBzYW1lIGxvb3AgYXMgYWJvdmUgdG8gc2VlayBgZWxlbWAgZnJvbSB0aGUgc3RhcnRcblx0XHRcdFx0XHRcdFx0XHR3aGlsZSAoIChub2RlID0gKytub2RlSW5kZXggJiYgbm9kZSAmJiBub2RlWyBkaXIgXSB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0KGRpZmYgPSBub2RlSW5kZXggPSAwKSB8fCBzdGFydC5wb3AoKSkgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmICggKCBvZlR5cGUgP1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUgOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRub2RlLm5vZGVUeXBlID09PSAxICkgJiZcblx0XHRcdFx0XHRcdFx0XHRcdFx0KytkaWZmICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIENhY2hlIHRoZSBpbmRleCBvZiBlYWNoIGVuY291bnRlcmVkIGVsZW1lbnRcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCB1c2VDYWNoZSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvdXRlckNhY2hlID0gbm9kZVsgZXhwYW5kbyBdIHx8IChub2RlWyBleHBhbmRvIF0gPSB7fSk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8OSBvbmx5XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gRGVmZW5kIGFnYWluc3QgY2xvbmVkIGF0dHJvcGVydGllcyAoalF1ZXJ5IGdoLTE3MDkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGUgPSBvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gfHxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdChvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gPSB7fSk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZVsgdHlwZSBdID0gWyBkaXJydW5zLCBkaWZmIF07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIG5vZGUgPT09IGVsZW0gKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSW5jb3Jwb3JhdGUgdGhlIG9mZnNldCwgdGhlbiBjaGVjayBhZ2FpbnN0IGN5Y2xlIHNpemVcblx0XHRcdFx0XHRcdGRpZmYgLT0gbGFzdDtcblx0XHRcdFx0XHRcdHJldHVybiBkaWZmID09PSBmaXJzdCB8fCAoIGRpZmYgJSBmaXJzdCA9PT0gMCAmJiBkaWZmIC8gZmlyc3QgPj0gMCApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0XCJQU0VVRE9cIjogZnVuY3Rpb24oIHBzZXVkbywgYXJndW1lbnQgKSB7XG5cdFx0XHQvLyBwc2V1ZG8tY2xhc3MgbmFtZXMgYXJlIGNhc2UtaW5zZW5zaXRpdmVcblx0XHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jcHNldWRvLWNsYXNzZXNcblx0XHRcdC8vIFByaW9yaXRpemUgYnkgY2FzZSBzZW5zaXRpdml0eSBpbiBjYXNlIGN1c3RvbSBwc2V1ZG9zIGFyZSBhZGRlZCB3aXRoIHVwcGVyY2FzZSBsZXR0ZXJzXG5cdFx0XHQvLyBSZW1lbWJlciB0aGF0IHNldEZpbHRlcnMgaW5oZXJpdHMgZnJvbSBwc2V1ZG9zXG5cdFx0XHR2YXIgYXJncyxcblx0XHRcdFx0Zm4gPSBFeHByLnBzZXVkb3NbIHBzZXVkbyBdIHx8IEV4cHIuc2V0RmlsdGVyc1sgcHNldWRvLnRvTG93ZXJDYXNlKCkgXSB8fFxuXHRcdFx0XHRcdFNpenpsZS5lcnJvciggXCJ1bnN1cHBvcnRlZCBwc2V1ZG86IFwiICsgcHNldWRvICk7XG5cblx0XHRcdC8vIFRoZSB1c2VyIG1heSB1c2UgY3JlYXRlUHNldWRvIHRvIGluZGljYXRlIHRoYXRcblx0XHRcdC8vIGFyZ3VtZW50cyBhcmUgbmVlZGVkIHRvIGNyZWF0ZSB0aGUgZmlsdGVyIGZ1bmN0aW9uXG5cdFx0XHQvLyBqdXN0IGFzIFNpenpsZSBkb2VzXG5cdFx0XHRpZiAoIGZuWyBleHBhbmRvIF0gKSB7XG5cdFx0XHRcdHJldHVybiBmbiggYXJndW1lbnQgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQnV0IG1haW50YWluIHN1cHBvcnQgZm9yIG9sZCBzaWduYXR1cmVzXG5cdFx0XHRpZiAoIGZuLmxlbmd0aCA+IDEgKSB7XG5cdFx0XHRcdGFyZ3MgPSBbIHBzZXVkbywgcHNldWRvLCBcIlwiLCBhcmd1bWVudCBdO1xuXHRcdFx0XHRyZXR1cm4gRXhwci5zZXRGaWx0ZXJzLmhhc093blByb3BlcnR5KCBwc2V1ZG8udG9Mb3dlckNhc2UoKSApID9cblx0XHRcdFx0XHRtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlZWQsIG1hdGNoZXMgKSB7XG5cdFx0XHRcdFx0XHR2YXIgaWR4LFxuXHRcdFx0XHRcdFx0XHRtYXRjaGVkID0gZm4oIHNlZWQsIGFyZ3VtZW50ICksXG5cdFx0XHRcdFx0XHRcdGkgPSBtYXRjaGVkLmxlbmd0aDtcblx0XHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdFx0XHRpZHggPSBpbmRleE9mKCBzZWVkLCBtYXRjaGVkW2ldICk7XG5cdFx0XHRcdFx0XHRcdHNlZWRbIGlkeCBdID0gISggbWF0Y2hlc1sgaWR4IF0gPSBtYXRjaGVkW2ldICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSkgOlxuXHRcdFx0XHRcdGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuKCBlbGVtLCAwLCBhcmdzICk7XG5cdFx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZuO1xuXHRcdH1cblx0fSxcblxuXHRwc2V1ZG9zOiB7XG5cdFx0Ly8gUG90ZW50aWFsbHkgY29tcGxleCBwc2V1ZG9zXG5cdFx0XCJub3RcIjogbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRcdC8vIFRyaW0gdGhlIHNlbGVjdG9yIHBhc3NlZCB0byBjb21waWxlXG5cdFx0XHQvLyB0byBhdm9pZCB0cmVhdGluZyBsZWFkaW5nIGFuZCB0cmFpbGluZ1xuXHRcdFx0Ly8gc3BhY2VzIGFzIGNvbWJpbmF0b3JzXG5cdFx0XHR2YXIgaW5wdXQgPSBbXSxcblx0XHRcdFx0cmVzdWx0cyA9IFtdLFxuXHRcdFx0XHRtYXRjaGVyID0gY29tcGlsZSggc2VsZWN0b3IucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApICk7XG5cblx0XHRcdHJldHVybiBtYXRjaGVyWyBleHBhbmRvIF0gP1xuXHRcdFx0XHRtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlZWQsIG1hdGNoZXMsIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdFx0XHR2YXIgZWxlbSxcblx0XHRcdFx0XHRcdHVubWF0Y2hlZCA9IG1hdGNoZXIoIHNlZWQsIG51bGwsIHhtbCwgW10gKSxcblx0XHRcdFx0XHRcdGkgPSBzZWVkLmxlbmd0aDtcblxuXHRcdFx0XHRcdC8vIE1hdGNoIGVsZW1lbnRzIHVubWF0Y2hlZCBieSBgbWF0Y2hlcmBcblx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdGlmICggKGVsZW0gPSB1bm1hdGNoZWRbaV0pICkge1xuXHRcdFx0XHRcdFx0XHRzZWVkW2ldID0gIShtYXRjaGVzW2ldID0gZWxlbSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KSA6XG5cdFx0XHRcdGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHRcdFx0aW5wdXRbMF0gPSBlbGVtO1xuXHRcdFx0XHRcdG1hdGNoZXIoIGlucHV0LCBudWxsLCB4bWwsIHJlc3VsdHMgKTtcblx0XHRcdFx0XHQvLyBEb24ndCBrZWVwIHRoZSBlbGVtZW50IChpc3N1ZSAjMjk5KVxuXHRcdFx0XHRcdGlucHV0WzBdID0gbnVsbDtcblx0XHRcdFx0XHRyZXR1cm4gIXJlc3VsdHMucG9wKCk7XG5cdFx0XHRcdH07XG5cdFx0fSksXG5cblx0XHRcImhhc1wiOiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gU2l6emxlKCBzZWxlY3RvciwgZWxlbSApLmxlbmd0aCA+IDA7XG5cdFx0XHR9O1xuXHRcdH0pLFxuXG5cdFx0XCJjb250YWluc1wiOiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHRleHQgKSB7XG5cdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gKCBlbGVtLnRleHRDb250ZW50IHx8IGVsZW0uaW5uZXJUZXh0IHx8IGdldFRleHQoIGVsZW0gKSApLmluZGV4T2YoIHRleHQgKSA+IC0xO1xuXHRcdFx0fTtcblx0XHR9KSxcblxuXHRcdC8vIFwiV2hldGhlciBhbiBlbGVtZW50IGlzIHJlcHJlc2VudGVkIGJ5IGEgOmxhbmcoKSBzZWxlY3RvclxuXHRcdC8vIGlzIGJhc2VkIHNvbGVseSBvbiB0aGUgZWxlbWVudCdzIGxhbmd1YWdlIHZhbHVlXG5cdFx0Ly8gYmVpbmcgZXF1YWwgdG8gdGhlIGlkZW50aWZpZXIgQyxcblx0XHQvLyBvciBiZWdpbm5pbmcgd2l0aCB0aGUgaWRlbnRpZmllciBDIGltbWVkaWF0ZWx5IGZvbGxvd2VkIGJ5IFwiLVwiLlxuXHRcdC8vIFRoZSBtYXRjaGluZyBvZiBDIGFnYWluc3QgdGhlIGVsZW1lbnQncyBsYW5ndWFnZSB2YWx1ZSBpcyBwZXJmb3JtZWQgY2FzZS1pbnNlbnNpdGl2ZWx5LlxuXHRcdC8vIFRoZSBpZGVudGlmaWVyIEMgZG9lcyBub3QgaGF2ZSB0byBiZSBhIHZhbGlkIGxhbmd1YWdlIG5hbWUuXCJcblx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI2xhbmctcHNldWRvXG5cdFx0XCJsYW5nXCI6IG1hcmtGdW5jdGlvbiggZnVuY3Rpb24oIGxhbmcgKSB7XG5cdFx0XHQvLyBsYW5nIHZhbHVlIG11c3QgYmUgYSB2YWxpZCBpZGVudGlmaWVyXG5cdFx0XHRpZiAoICFyaWRlbnRpZmllci50ZXN0KGxhbmcgfHwgXCJcIikgKSB7XG5cdFx0XHRcdFNpenpsZS5lcnJvciggXCJ1bnN1cHBvcnRlZCBsYW5nOiBcIiArIGxhbmcgKTtcblx0XHRcdH1cblx0XHRcdGxhbmcgPSBsYW5nLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICkudG9Mb3dlckNhc2UoKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0dmFyIGVsZW1MYW5nO1xuXHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0aWYgKCAoZWxlbUxhbmcgPSBkb2N1bWVudElzSFRNTCA/XG5cdFx0XHRcdFx0XHRlbGVtLmxhbmcgOlxuXHRcdFx0XHRcdFx0ZWxlbS5nZXRBdHRyaWJ1dGUoXCJ4bWw6bGFuZ1wiKSB8fCBlbGVtLmdldEF0dHJpYnV0ZShcImxhbmdcIikpICkge1xuXG5cdFx0XHRcdFx0XHRlbGVtTGFuZyA9IGVsZW1MYW5nLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbUxhbmcgPT09IGxhbmcgfHwgZWxlbUxhbmcuaW5kZXhPZiggbGFuZyArIFwiLVwiICkgPT09IDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IHdoaWxlICggKGVsZW0gPSBlbGVtLnBhcmVudE5vZGUpICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fTtcblx0XHR9KSxcblxuXHRcdC8vIE1pc2NlbGxhbmVvdXNcblx0XHRcInRhcmdldFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBoYXNoID0gd2luZG93LmxvY2F0aW9uICYmIHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuXHRcdFx0cmV0dXJuIGhhc2ggJiYgaGFzaC5zbGljZSggMSApID09PSBlbGVtLmlkO1xuXHRcdH0sXG5cblx0XHRcInJvb3RcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbSA9PT0gZG9jRWxlbTtcblx0XHR9LFxuXG5cdFx0XCJmb2N1c1wiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmICghZG9jdW1lbnQuaGFzRm9jdXMgfHwgZG9jdW1lbnQuaGFzRm9jdXMoKSkgJiYgISEoZWxlbS50eXBlIHx8IGVsZW0uaHJlZiB8fCB+ZWxlbS50YWJJbmRleCk7XG5cdFx0fSxcblxuXHRcdC8vIEJvb2xlYW4gcHJvcGVydGllc1xuXHRcdFwiZW5hYmxlZFwiOiBjcmVhdGVEaXNhYmxlZFBzZXVkbyggZmFsc2UgKSxcblx0XHRcImRpc2FibGVkXCI6IGNyZWF0ZURpc2FibGVkUHNldWRvKCB0cnVlICksXG5cblx0XHRcImNoZWNrZWRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHQvLyBJbiBDU1MzLCA6Y2hlY2tlZCBzaG91bGQgcmV0dXJuIGJvdGggY2hlY2tlZCBhbmQgc2VsZWN0ZWQgZWxlbWVudHNcblx0XHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTEvUkVDLWNzczMtc2VsZWN0b3JzLTIwMTEwOTI5LyNjaGVja2VkXG5cdFx0XHR2YXIgbm9kZU5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyZXR1cm4gKG5vZGVOYW1lID09PSBcImlucHV0XCIgJiYgISFlbGVtLmNoZWNrZWQpIHx8IChub2RlTmFtZSA9PT0gXCJvcHRpb25cIiAmJiAhIWVsZW0uc2VsZWN0ZWQpO1xuXHRcdH0sXG5cblx0XHRcInNlbGVjdGVkXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0Ly8gQWNjZXNzaW5nIHRoaXMgcHJvcGVydHkgbWFrZXMgc2VsZWN0ZWQtYnktZGVmYXVsdFxuXHRcdFx0Ly8gb3B0aW9ucyBpbiBTYWZhcmkgd29yayBwcm9wZXJseVxuXHRcdFx0aWYgKCBlbGVtLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdGVsZW0ucGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZWxlbS5zZWxlY3RlZCA9PT0gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0Ly8gQ29udGVudHNcblx0XHRcImVtcHR5XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNlbXB0eS1wc2V1ZG9cblx0XHRcdC8vIDplbXB0eSBpcyBuZWdhdGVkIGJ5IGVsZW1lbnQgKDEpIG9yIGNvbnRlbnQgbm9kZXMgKHRleHQ6IDM7IGNkYXRhOiA0OyBlbnRpdHkgcmVmOiA1KSxcblx0XHRcdC8vICAgYnV0IG5vdCBieSBvdGhlcnMgKGNvbW1lbnQ6IDg7IHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb246IDc7IGV0Yy4pXG5cdFx0XHQvLyBub2RlVHlwZSA8IDYgd29ya3MgYmVjYXVzZSBhdHRyaWJ1dGVzICgyKSBkbyBub3QgYXBwZWFyIGFzIGNoaWxkcmVuXG5cdFx0XHRmb3IgKCBlbGVtID0gZWxlbS5maXJzdENoaWxkOyBlbGVtOyBlbGVtID0gZWxlbS5uZXh0U2libGluZyApIHtcblx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlIDwgNiApIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cblx0XHRcInBhcmVudFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiAhRXhwci5wc2V1ZG9zW1wiZW1wdHlcIl0oIGVsZW0gKTtcblx0XHR9LFxuXG5cdFx0Ly8gRWxlbWVudC9pbnB1dCB0eXBlc1xuXHRcdFwiaGVhZGVyXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIHJoZWFkZXIudGVzdCggZWxlbS5ub2RlTmFtZSApO1xuXHRcdH0sXG5cblx0XHRcImlucHV0XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIHJpbnB1dHMudGVzdCggZWxlbS5ub2RlTmFtZSApO1xuXHRcdH0sXG5cblx0XHRcImJ1dHRvblwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0cmV0dXJuIG5hbWUgPT09IFwiaW5wdXRcIiAmJiBlbGVtLnR5cGUgPT09IFwiYnV0dG9uXCIgfHwgbmFtZSA9PT0gXCJidXR0b25cIjtcblx0XHR9LFxuXG5cdFx0XCJ0ZXh0XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0dmFyIGF0dHI7XG5cdFx0XHRyZXR1cm4gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIgJiZcblx0XHRcdFx0ZWxlbS50eXBlID09PSBcInRleHRcIiAmJlxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IElFPDhcblx0XHRcdFx0Ly8gTmV3IEhUTUw1IGF0dHJpYnV0ZSB2YWx1ZXMgKGUuZy4sIFwic2VhcmNoXCIpIGFwcGVhciB3aXRoIGVsZW0udHlwZSA9PT0gXCJ0ZXh0XCJcblx0XHRcdFx0KCAoYXR0ciA9IGVsZW0uZ2V0QXR0cmlidXRlKFwidHlwZVwiKSkgPT0gbnVsbCB8fCBhdHRyLnRvTG93ZXJDYXNlKCkgPT09IFwidGV4dFwiICk7XG5cdFx0fSxcblxuXHRcdC8vIFBvc2l0aW9uLWluLWNvbGxlY3Rpb25cblx0XHRcImZpcnN0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gWyAwIF07XG5cdFx0fSksXG5cblx0XHRcImxhc3RcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGggKSB7XG5cdFx0XHRyZXR1cm4gWyBsZW5ndGggLSAxIF07XG5cdFx0fSksXG5cblx0XHRcImVxXCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoLCBhcmd1bWVudCApIHtcblx0XHRcdHJldHVybiBbIGFyZ3VtZW50IDwgMCA/IGFyZ3VtZW50ICsgbGVuZ3RoIDogYXJndW1lbnQgXTtcblx0XHR9KSxcblxuXHRcdFwiZXZlblwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcblx0XHRcdHZhciBpID0gMDtcblx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSArPSAyICkge1xuXHRcdFx0XHRtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1hdGNoSW5kZXhlcztcblx0XHR9KSxcblxuXHRcdFwib2RkXCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoICkge1xuXHRcdFx0dmFyIGkgPSAxO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpICs9IDIgKSB7XG5cdFx0XHRcdG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF0Y2hJbmRleGVzO1xuXHRcdH0pLFxuXG5cdFx0XCJsdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG5cdFx0XHR2YXIgaSA9IGFyZ3VtZW50IDwgMCA/IGFyZ3VtZW50ICsgbGVuZ3RoIDogYXJndW1lbnQ7XG5cdFx0XHRmb3IgKCA7IC0taSA+PSAwOyApIHtcblx0XHRcdFx0bWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYXRjaEluZGV4ZXM7XG5cdFx0fSksXG5cblx0XHRcImd0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoLCBhcmd1bWVudCApIHtcblx0XHRcdHZhciBpID0gYXJndW1lbnQgPCAwID8gYXJndW1lbnQgKyBsZW5ndGggOiBhcmd1bWVudDtcblx0XHRcdGZvciAoIDsgKytpIDwgbGVuZ3RoOyApIHtcblx0XHRcdFx0bWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYXRjaEluZGV4ZXM7XG5cdFx0fSlcblx0fVxufTtcblxuRXhwci5wc2V1ZG9zW1wibnRoXCJdID0gRXhwci5wc2V1ZG9zW1wiZXFcIl07XG5cbi8vIEFkZCBidXR0b24vaW5wdXQgdHlwZSBwc2V1ZG9zXG5mb3IgKCBpIGluIHsgcmFkaW86IHRydWUsIGNoZWNrYm94OiB0cnVlLCBmaWxlOiB0cnVlLCBwYXNzd29yZDogdHJ1ZSwgaW1hZ2U6IHRydWUgfSApIHtcblx0RXhwci5wc2V1ZG9zWyBpIF0gPSBjcmVhdGVJbnB1dFBzZXVkbyggaSApO1xufVxuZm9yICggaSBpbiB7IHN1Ym1pdDogdHJ1ZSwgcmVzZXQ6IHRydWUgfSApIHtcblx0RXhwci5wc2V1ZG9zWyBpIF0gPSBjcmVhdGVCdXR0b25Qc2V1ZG8oIGkgKTtcbn1cblxuLy8gRWFzeSBBUEkgZm9yIGNyZWF0aW5nIG5ldyBzZXRGaWx0ZXJzXG5mdW5jdGlvbiBzZXRGaWx0ZXJzKCkge31cbnNldEZpbHRlcnMucHJvdG90eXBlID0gRXhwci5maWx0ZXJzID0gRXhwci5wc2V1ZG9zO1xuRXhwci5zZXRGaWx0ZXJzID0gbmV3IHNldEZpbHRlcnMoKTtcblxudG9rZW5pemUgPSBTaXp6bGUudG9rZW5pemUgPSBmdW5jdGlvbiggc2VsZWN0b3IsIHBhcnNlT25seSApIHtcblx0dmFyIG1hdGNoZWQsIG1hdGNoLCB0b2tlbnMsIHR5cGUsXG5cdFx0c29GYXIsIGdyb3VwcywgcHJlRmlsdGVycyxcblx0XHRjYWNoZWQgPSB0b2tlbkNhY2hlWyBzZWxlY3RvciArIFwiIFwiIF07XG5cblx0aWYgKCBjYWNoZWQgKSB7XG5cdFx0cmV0dXJuIHBhcnNlT25seSA/IDAgOiBjYWNoZWQuc2xpY2UoIDAgKTtcblx0fVxuXG5cdHNvRmFyID0gc2VsZWN0b3I7XG5cdGdyb3VwcyA9IFtdO1xuXHRwcmVGaWx0ZXJzID0gRXhwci5wcmVGaWx0ZXI7XG5cblx0d2hpbGUgKCBzb0ZhciApIHtcblxuXHRcdC8vIENvbW1hIGFuZCBmaXJzdCBydW5cblx0XHRpZiAoICFtYXRjaGVkIHx8IChtYXRjaCA9IHJjb21tYS5leGVjKCBzb0ZhciApKSApIHtcblx0XHRcdGlmICggbWF0Y2ggKSB7XG5cdFx0XHRcdC8vIERvbid0IGNvbnN1bWUgdHJhaWxpbmcgY29tbWFzIGFzIHZhbGlkXG5cdFx0XHRcdHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoWzBdLmxlbmd0aCApIHx8IHNvRmFyO1xuXHRcdFx0fVxuXHRcdFx0Z3JvdXBzLnB1c2goICh0b2tlbnMgPSBbXSkgKTtcblx0XHR9XG5cblx0XHRtYXRjaGVkID0gZmFsc2U7XG5cblx0XHQvLyBDb21iaW5hdG9yc1xuXHRcdGlmICggKG1hdGNoID0gcmNvbWJpbmF0b3JzLmV4ZWMoIHNvRmFyICkpICkge1xuXHRcdFx0bWF0Y2hlZCA9IG1hdGNoLnNoaWZ0KCk7XG5cdFx0XHR0b2tlbnMucHVzaCh7XG5cdFx0XHRcdHZhbHVlOiBtYXRjaGVkLFxuXHRcdFx0XHQvLyBDYXN0IGRlc2NlbmRhbnQgY29tYmluYXRvcnMgdG8gc3BhY2Vcblx0XHRcdFx0dHlwZTogbWF0Y2hbMF0ucmVwbGFjZSggcnRyaW0sIFwiIFwiIClcblx0XHRcdH0pO1xuXHRcdFx0c29GYXIgPSBzb0Zhci5zbGljZSggbWF0Y2hlZC5sZW5ndGggKTtcblx0XHR9XG5cblx0XHQvLyBGaWx0ZXJzXG5cdFx0Zm9yICggdHlwZSBpbiBFeHByLmZpbHRlciApIHtcblx0XHRcdGlmICggKG1hdGNoID0gbWF0Y2hFeHByWyB0eXBlIF0uZXhlYyggc29GYXIgKSkgJiYgKCFwcmVGaWx0ZXJzWyB0eXBlIF0gfHxcblx0XHRcdFx0KG1hdGNoID0gcHJlRmlsdGVyc1sgdHlwZSBdKCBtYXRjaCApKSkgKSB7XG5cdFx0XHRcdG1hdGNoZWQgPSBtYXRjaC5zaGlmdCgpO1xuXHRcdFx0XHR0b2tlbnMucHVzaCh7XG5cdFx0XHRcdFx0dmFsdWU6IG1hdGNoZWQsXG5cdFx0XHRcdFx0dHlwZTogdHlwZSxcblx0XHRcdFx0XHRtYXRjaGVzOiBtYXRjaFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0c29GYXIgPSBzb0Zhci5zbGljZSggbWF0Y2hlZC5sZW5ndGggKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoICFtYXRjaGVkICkge1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBsZW5ndGggb2YgdGhlIGludmFsaWQgZXhjZXNzXG5cdC8vIGlmIHdlJ3JlIGp1c3QgcGFyc2luZ1xuXHQvLyBPdGhlcndpc2UsIHRocm93IGFuIGVycm9yIG9yIHJldHVybiB0b2tlbnNcblx0cmV0dXJuIHBhcnNlT25seSA/XG5cdFx0c29GYXIubGVuZ3RoIDpcblx0XHRzb0ZhciA/XG5cdFx0XHRTaXp6bGUuZXJyb3IoIHNlbGVjdG9yICkgOlxuXHRcdFx0Ly8gQ2FjaGUgdGhlIHRva2Vuc1xuXHRcdFx0dG9rZW5DYWNoZSggc2VsZWN0b3IsIGdyb3VwcyApLnNsaWNlKCAwICk7XG59O1xuXG5mdW5jdGlvbiB0b1NlbGVjdG9yKCB0b2tlbnMgKSB7XG5cdHZhciBpID0gMCxcblx0XHRsZW4gPSB0b2tlbnMubGVuZ3RoLFxuXHRcdHNlbGVjdG9yID0gXCJcIjtcblx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0c2VsZWN0b3IgKz0gdG9rZW5zW2ldLnZhbHVlO1xuXHR9XG5cdHJldHVybiBzZWxlY3Rvcjtcbn1cblxuZnVuY3Rpb24gYWRkQ29tYmluYXRvciggbWF0Y2hlciwgY29tYmluYXRvciwgYmFzZSApIHtcblx0dmFyIGRpciA9IGNvbWJpbmF0b3IuZGlyLFxuXHRcdHNraXAgPSBjb21iaW5hdG9yLm5leHQsXG5cdFx0a2V5ID0gc2tpcCB8fCBkaXIsXG5cdFx0Y2hlY2tOb25FbGVtZW50cyA9IGJhc2UgJiYga2V5ID09PSBcInBhcmVudE5vZGVcIixcblx0XHRkb25lTmFtZSA9IGRvbmUrKztcblxuXHRyZXR1cm4gY29tYmluYXRvci5maXJzdCA/XG5cdFx0Ly8gQ2hlY2sgYWdhaW5zdCBjbG9zZXN0IGFuY2VzdG9yL3ByZWNlZGluZyBlbGVtZW50XG5cdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdHdoaWxlICggKGVsZW0gPSBlbGVtWyBkaXIgXSkgKSB7XG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzICkge1xuXHRcdFx0XHRcdHJldHVybiBtYXRjaGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0gOlxuXG5cdFx0Ly8gQ2hlY2sgYWdhaW5zdCBhbGwgYW5jZXN0b3IvcHJlY2VkaW5nIGVsZW1lbnRzXG5cdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdHZhciBvbGRDYWNoZSwgdW5pcXVlQ2FjaGUsIG91dGVyQ2FjaGUsXG5cdFx0XHRcdG5ld0NhY2hlID0gWyBkaXJydW5zLCBkb25lTmFtZSBdO1xuXG5cdFx0XHQvLyBXZSBjYW4ndCBzZXQgYXJiaXRyYXJ5IGRhdGEgb24gWE1MIG5vZGVzLCBzbyB0aGV5IGRvbid0IGJlbmVmaXQgZnJvbSBjb21iaW5hdG9yIGNhY2hpbmdcblx0XHRcdGlmICggeG1sICkge1xuXHRcdFx0XHR3aGlsZSAoIChlbGVtID0gZWxlbVsgZGlyIF0pICkge1xuXHRcdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzICkge1xuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR3aGlsZSAoIChlbGVtID0gZWxlbVsgZGlyIF0pICkge1xuXHRcdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzICkge1xuXHRcdFx0XHRcdFx0b3V0ZXJDYWNoZSA9IGVsZW1bIGV4cGFuZG8gXSB8fCAoZWxlbVsgZXhwYW5kbyBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8OSBvbmx5XG5cdFx0XHRcdFx0XHQvLyBEZWZlbmQgYWdhaW5zdCBjbG9uZWQgYXR0cm9wZXJ0aWVzIChqUXVlcnkgZ2gtMTcwOSlcblx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlID0gb3V0ZXJDYWNoZVsgZWxlbS51bmlxdWVJRCBdIHx8IChvdXRlckNhY2hlWyBlbGVtLnVuaXF1ZUlEIF0gPSB7fSk7XG5cblx0XHRcdFx0XHRcdGlmICggc2tpcCAmJiBza2lwID09PSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgKSB7XG5cdFx0XHRcdFx0XHRcdGVsZW0gPSBlbGVtWyBkaXIgXSB8fCBlbGVtO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICggKG9sZENhY2hlID0gdW5pcXVlQ2FjaGVbIGtleSBdKSAmJlxuXHRcdFx0XHRcdFx0XHRvbGRDYWNoZVsgMCBdID09PSBkaXJydW5zICYmIG9sZENhY2hlWyAxIF0gPT09IGRvbmVOYW1lICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIEFzc2lnbiB0byBuZXdDYWNoZSBzbyByZXN1bHRzIGJhY2stcHJvcGFnYXRlIHRvIHByZXZpb3VzIGVsZW1lbnRzXG5cdFx0XHRcdFx0XHRcdHJldHVybiAobmV3Q2FjaGVbIDIgXSA9IG9sZENhY2hlWyAyIF0pO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Ly8gUmV1c2UgbmV3Y2FjaGUgc28gcmVzdWx0cyBiYWNrLXByb3BhZ2F0ZSB0byBwcmV2aW91cyBlbGVtZW50c1xuXHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZVsga2V5IF0gPSBuZXdDYWNoZTtcblxuXHRcdFx0XHRcdFx0XHQvLyBBIG1hdGNoIG1lYW5zIHdlJ3JlIGRvbmU7IGEgZmFpbCBtZWFucyB3ZSBoYXZlIHRvIGtlZXAgY2hlY2tpbmdcblx0XHRcdFx0XHRcdFx0aWYgKCAobmV3Q2FjaGVbIDIgXSA9IG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApKSApIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG59XG5cbmZ1bmN0aW9uIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApIHtcblx0cmV0dXJuIG1hdGNoZXJzLmxlbmd0aCA+IDEgP1xuXHRcdGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHR2YXIgaSA9IG1hdGNoZXJzLmxlbmd0aDtcblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRpZiAoICFtYXRjaGVyc1tpXSggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IDpcblx0XHRtYXRjaGVyc1swXTtcbn1cblxuZnVuY3Rpb24gbXVsdGlwbGVDb250ZXh0cyggc2VsZWN0b3IsIGNvbnRleHRzLCByZXN1bHRzICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bGVuID0gY29udGV4dHMubGVuZ3RoO1xuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRTaXp6bGUoIHNlbGVjdG9yLCBjb250ZXh0c1tpXSwgcmVzdWx0cyApO1xuXHR9XG5cdHJldHVybiByZXN1bHRzO1xufVxuXG5mdW5jdGlvbiBjb25kZW5zZSggdW5tYXRjaGVkLCBtYXAsIGZpbHRlciwgY29udGV4dCwgeG1sICkge1xuXHR2YXIgZWxlbSxcblx0XHRuZXdVbm1hdGNoZWQgPSBbXSxcblx0XHRpID0gMCxcblx0XHRsZW4gPSB1bm1hdGNoZWQubGVuZ3RoLFxuXHRcdG1hcHBlZCA9IG1hcCAhPSBudWxsO1xuXG5cdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdGlmICggKGVsZW0gPSB1bm1hdGNoZWRbaV0pICkge1xuXHRcdFx0aWYgKCAhZmlsdGVyIHx8IGZpbHRlciggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XG5cdFx0XHRcdG5ld1VubWF0Y2hlZC5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdGlmICggbWFwcGVkICkge1xuXHRcdFx0XHRcdG1hcC5wdXNoKCBpICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbmV3VW5tYXRjaGVkO1xufVxuXG5mdW5jdGlvbiBzZXRNYXRjaGVyKCBwcmVGaWx0ZXIsIHNlbGVjdG9yLCBtYXRjaGVyLCBwb3N0RmlsdGVyLCBwb3N0RmluZGVyLCBwb3N0U2VsZWN0b3IgKSB7XG5cdGlmICggcG9zdEZpbHRlciAmJiAhcG9zdEZpbHRlclsgZXhwYW5kbyBdICkge1xuXHRcdHBvc3RGaWx0ZXIgPSBzZXRNYXRjaGVyKCBwb3N0RmlsdGVyICk7XG5cdH1cblx0aWYgKCBwb3N0RmluZGVyICYmICFwb3N0RmluZGVyWyBleHBhbmRvIF0gKSB7XG5cdFx0cG9zdEZpbmRlciA9IHNldE1hdGNoZXIoIHBvc3RGaW5kZXIsIHBvc3RTZWxlY3RvciApO1xuXHR9XG5cdHJldHVybiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlZWQsIHJlc3VsdHMsIGNvbnRleHQsIHhtbCApIHtcblx0XHR2YXIgdGVtcCwgaSwgZWxlbSxcblx0XHRcdHByZU1hcCA9IFtdLFxuXHRcdFx0cG9zdE1hcCA9IFtdLFxuXHRcdFx0cHJlZXhpc3RpbmcgPSByZXN1bHRzLmxlbmd0aCxcblxuXHRcdFx0Ly8gR2V0IGluaXRpYWwgZWxlbWVudHMgZnJvbSBzZWVkIG9yIGNvbnRleHRcblx0XHRcdGVsZW1zID0gc2VlZCB8fCBtdWx0aXBsZUNvbnRleHRzKCBzZWxlY3RvciB8fCBcIipcIiwgY29udGV4dC5ub2RlVHlwZSA/IFsgY29udGV4dCBdIDogY29udGV4dCwgW10gKSxcblxuXHRcdFx0Ly8gUHJlZmlsdGVyIHRvIGdldCBtYXRjaGVyIGlucHV0LCBwcmVzZXJ2aW5nIGEgbWFwIGZvciBzZWVkLXJlc3VsdHMgc3luY2hyb25pemF0aW9uXG5cdFx0XHRtYXRjaGVySW4gPSBwcmVGaWx0ZXIgJiYgKCBzZWVkIHx8ICFzZWxlY3RvciApID9cblx0XHRcdFx0Y29uZGVuc2UoIGVsZW1zLCBwcmVNYXAsIHByZUZpbHRlciwgY29udGV4dCwgeG1sICkgOlxuXHRcdFx0XHRlbGVtcyxcblxuXHRcdFx0bWF0Y2hlck91dCA9IG1hdGNoZXIgP1xuXHRcdFx0XHQvLyBJZiB3ZSBoYXZlIGEgcG9zdEZpbmRlciwgb3IgZmlsdGVyZWQgc2VlZCwgb3Igbm9uLXNlZWQgcG9zdEZpbHRlciBvciBwcmVleGlzdGluZyByZXN1bHRzLFxuXHRcdFx0XHRwb3N0RmluZGVyIHx8ICggc2VlZCA/IHByZUZpbHRlciA6IHByZWV4aXN0aW5nIHx8IHBvc3RGaWx0ZXIgKSA/XG5cblx0XHRcdFx0XHQvLyAuLi5pbnRlcm1lZGlhdGUgcHJvY2Vzc2luZyBpcyBuZWNlc3Nhcnlcblx0XHRcdFx0XHRbXSA6XG5cblx0XHRcdFx0XHQvLyAuLi5vdGhlcndpc2UgdXNlIHJlc3VsdHMgZGlyZWN0bHlcblx0XHRcdFx0XHRyZXN1bHRzIDpcblx0XHRcdFx0bWF0Y2hlckluO1xuXG5cdFx0Ly8gRmluZCBwcmltYXJ5IG1hdGNoZXNcblx0XHRpZiAoIG1hdGNoZXIgKSB7XG5cdFx0XHRtYXRjaGVyKCBtYXRjaGVySW4sIG1hdGNoZXJPdXQsIGNvbnRleHQsIHhtbCApO1xuXHRcdH1cblxuXHRcdC8vIEFwcGx5IHBvc3RGaWx0ZXJcblx0XHRpZiAoIHBvc3RGaWx0ZXIgKSB7XG5cdFx0XHR0ZW1wID0gY29uZGVuc2UoIG1hdGNoZXJPdXQsIHBvc3RNYXAgKTtcblx0XHRcdHBvc3RGaWx0ZXIoIHRlbXAsIFtdLCBjb250ZXh0LCB4bWwgKTtcblxuXHRcdFx0Ly8gVW4tbWF0Y2ggZmFpbGluZyBlbGVtZW50cyBieSBtb3ZpbmcgdGhlbSBiYWNrIHRvIG1hdGNoZXJJblxuXHRcdFx0aSA9IHRlbXAubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdGlmICggKGVsZW0gPSB0ZW1wW2ldKSApIHtcblx0XHRcdFx0XHRtYXRjaGVyT3V0WyBwb3N0TWFwW2ldIF0gPSAhKG1hdGNoZXJJblsgcG9zdE1hcFtpXSBdID0gZWxlbSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIHNlZWQgKSB7XG5cdFx0XHRpZiAoIHBvc3RGaW5kZXIgfHwgcHJlRmlsdGVyICkge1xuXHRcdFx0XHRpZiAoIHBvc3RGaW5kZXIgKSB7XG5cdFx0XHRcdFx0Ly8gR2V0IHRoZSBmaW5hbCBtYXRjaGVyT3V0IGJ5IGNvbmRlbnNpbmcgdGhpcyBpbnRlcm1lZGlhdGUgaW50byBwb3N0RmluZGVyIGNvbnRleHRzXG5cdFx0XHRcdFx0dGVtcCA9IFtdO1xuXHRcdFx0XHRcdGkgPSBtYXRjaGVyT3V0Lmxlbmd0aDtcblx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdGlmICggKGVsZW0gPSBtYXRjaGVyT3V0W2ldKSApIHtcblx0XHRcdFx0XHRcdFx0Ly8gUmVzdG9yZSBtYXRjaGVySW4gc2luY2UgZWxlbSBpcyBub3QgeWV0IGEgZmluYWwgbWF0Y2hcblx0XHRcdFx0XHRcdFx0dGVtcC5wdXNoKCAobWF0Y2hlckluW2ldID0gZWxlbSkgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cG9zdEZpbmRlciggbnVsbCwgKG1hdGNoZXJPdXQgPSBbXSksIHRlbXAsIHhtbCApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gTW92ZSBtYXRjaGVkIGVsZW1lbnRzIGZyb20gc2VlZCB0byByZXN1bHRzIHRvIGtlZXAgdGhlbSBzeW5jaHJvbml6ZWRcblx0XHRcdFx0aSA9IG1hdGNoZXJPdXQubGVuZ3RoO1xuXHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRpZiAoIChlbGVtID0gbWF0Y2hlck91dFtpXSkgJiZcblx0XHRcdFx0XHRcdCh0ZW1wID0gcG9zdEZpbmRlciA/IGluZGV4T2YoIHNlZWQsIGVsZW0gKSA6IHByZU1hcFtpXSkgPiAtMSApIHtcblxuXHRcdFx0XHRcdFx0c2VlZFt0ZW1wXSA9ICEocmVzdWx0c1t0ZW1wXSA9IGVsZW0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0Ly8gQWRkIGVsZW1lbnRzIHRvIHJlc3VsdHMsIHRocm91Z2ggcG9zdEZpbmRlciBpZiBkZWZpbmVkXG5cdFx0fSBlbHNlIHtcblx0XHRcdG1hdGNoZXJPdXQgPSBjb25kZW5zZShcblx0XHRcdFx0bWF0Y2hlck91dCA9PT0gcmVzdWx0cyA/XG5cdFx0XHRcdFx0bWF0Y2hlck91dC5zcGxpY2UoIHByZWV4aXN0aW5nLCBtYXRjaGVyT3V0Lmxlbmd0aCApIDpcblx0XHRcdFx0XHRtYXRjaGVyT3V0XG5cdFx0XHQpO1xuXHRcdFx0aWYgKCBwb3N0RmluZGVyICkge1xuXHRcdFx0XHRwb3N0RmluZGVyKCBudWxsLCByZXN1bHRzLCBtYXRjaGVyT3V0LCB4bWwgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIG1hdGNoZXJPdXQgKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVyRnJvbVRva2VucyggdG9rZW5zICkge1xuXHR2YXIgY2hlY2tDb250ZXh0LCBtYXRjaGVyLCBqLFxuXHRcdGxlbiA9IHRva2Vucy5sZW5ndGgsXG5cdFx0bGVhZGluZ1JlbGF0aXZlID0gRXhwci5yZWxhdGl2ZVsgdG9rZW5zWzBdLnR5cGUgXSxcblx0XHRpbXBsaWNpdFJlbGF0aXZlID0gbGVhZGluZ1JlbGF0aXZlIHx8IEV4cHIucmVsYXRpdmVbXCIgXCJdLFxuXHRcdGkgPSBsZWFkaW5nUmVsYXRpdmUgPyAxIDogMCxcblxuXHRcdC8vIFRoZSBmb3VuZGF0aW9uYWwgbWF0Y2hlciBlbnN1cmVzIHRoYXQgZWxlbWVudHMgYXJlIHJlYWNoYWJsZSBmcm9tIHRvcC1sZXZlbCBjb250ZXh0KHMpXG5cdFx0bWF0Y2hDb250ZXh0ID0gYWRkQ29tYmluYXRvciggZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbSA9PT0gY2hlY2tDb250ZXh0O1xuXHRcdH0sIGltcGxpY2l0UmVsYXRpdmUsIHRydWUgKSxcblx0XHRtYXRjaEFueUNvbnRleHQgPSBhZGRDb21iaW5hdG9yKCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBpbmRleE9mKCBjaGVja0NvbnRleHQsIGVsZW0gKSA+IC0xO1xuXHRcdH0sIGltcGxpY2l0UmVsYXRpdmUsIHRydWUgKSxcblx0XHRtYXRjaGVycyA9IFsgZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdHZhciByZXQgPSAoICFsZWFkaW5nUmVsYXRpdmUgJiYgKCB4bWwgfHwgY29udGV4dCAhPT0gb3V0ZXJtb3N0Q29udGV4dCApICkgfHwgKFxuXHRcdFx0XHQoY2hlY2tDb250ZXh0ID0gY29udGV4dCkubm9kZVR5cGUgP1xuXHRcdFx0XHRcdG1hdGNoQ29udGV4dCggZWxlbSwgY29udGV4dCwgeG1sICkgOlxuXHRcdFx0XHRcdG1hdGNoQW55Q29udGV4dCggZWxlbSwgY29udGV4dCwgeG1sICkgKTtcblx0XHRcdC8vIEF2b2lkIGhhbmdpbmcgb250byBlbGVtZW50IChpc3N1ZSAjMjk5KVxuXHRcdFx0Y2hlY2tDb250ZXh0ID0gbnVsbDtcblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fSBdO1xuXG5cdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdGlmICggKG1hdGNoZXIgPSBFeHByLnJlbGF0aXZlWyB0b2tlbnNbaV0udHlwZSBdKSApIHtcblx0XHRcdG1hdGNoZXJzID0gWyBhZGRDb21iaW5hdG9yKGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApLCBtYXRjaGVyKSBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtYXRjaGVyID0gRXhwci5maWx0ZXJbIHRva2Vuc1tpXS50eXBlIF0uYXBwbHkoIG51bGwsIHRva2Vuc1tpXS5tYXRjaGVzICk7XG5cblx0XHRcdC8vIFJldHVybiBzcGVjaWFsIHVwb24gc2VlaW5nIGEgcG9zaXRpb25hbCBtYXRjaGVyXG5cdFx0XHRpZiAoIG1hdGNoZXJbIGV4cGFuZG8gXSApIHtcblx0XHRcdFx0Ly8gRmluZCB0aGUgbmV4dCByZWxhdGl2ZSBvcGVyYXRvciAoaWYgYW55KSBmb3IgcHJvcGVyIGhhbmRsaW5nXG5cdFx0XHRcdGogPSArK2k7XG5cdFx0XHRcdGZvciAoIDsgaiA8IGxlbjsgaisrICkge1xuXHRcdFx0XHRcdGlmICggRXhwci5yZWxhdGl2ZVsgdG9rZW5zW2pdLnR5cGUgXSApIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gc2V0TWF0Y2hlcihcblx0XHRcdFx0XHRpID4gMSAmJiBlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKSxcblx0XHRcdFx0XHRpID4gMSAmJiB0b1NlbGVjdG9yKFxuXHRcdFx0XHRcdFx0Ly8gSWYgdGhlIHByZWNlZGluZyB0b2tlbiB3YXMgYSBkZXNjZW5kYW50IGNvbWJpbmF0b3IsIGluc2VydCBhbiBpbXBsaWNpdCBhbnktZWxlbWVudCBgKmBcblx0XHRcdFx0XHRcdHRva2Vucy5zbGljZSggMCwgaSAtIDEgKS5jb25jYXQoeyB2YWx1ZTogdG9rZW5zWyBpIC0gMiBdLnR5cGUgPT09IFwiIFwiID8gXCIqXCIgOiBcIlwiIH0pXG5cdFx0XHRcdFx0KS5yZXBsYWNlKCBydHJpbSwgXCIkMVwiICksXG5cdFx0XHRcdFx0bWF0Y2hlcixcblx0XHRcdFx0XHRpIDwgaiAmJiBtYXRjaGVyRnJvbVRva2VucyggdG9rZW5zLnNsaWNlKCBpLCBqICkgKSxcblx0XHRcdFx0XHRqIDwgbGVuICYmIG1hdGNoZXJGcm9tVG9rZW5zKCAodG9rZW5zID0gdG9rZW5zLnNsaWNlKCBqICkpICksXG5cdFx0XHRcdFx0aiA8IGxlbiAmJiB0b1NlbGVjdG9yKCB0b2tlbnMgKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0bWF0Y2hlcnMucHVzaCggbWF0Y2hlciApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hlckZyb21Hcm91cE1hdGNoZXJzKCBlbGVtZW50TWF0Y2hlcnMsIHNldE1hdGNoZXJzICkge1xuXHR2YXIgYnlTZXQgPSBzZXRNYXRjaGVycy5sZW5ndGggPiAwLFxuXHRcdGJ5RWxlbWVudCA9IGVsZW1lbnRNYXRjaGVycy5sZW5ndGggPiAwLFxuXHRcdHN1cGVyTWF0Y2hlciA9IGZ1bmN0aW9uKCBzZWVkLCBjb250ZXh0LCB4bWwsIHJlc3VsdHMsIG91dGVybW9zdCApIHtcblx0XHRcdHZhciBlbGVtLCBqLCBtYXRjaGVyLFxuXHRcdFx0XHRtYXRjaGVkQ291bnQgPSAwLFxuXHRcdFx0XHRpID0gXCIwXCIsXG5cdFx0XHRcdHVubWF0Y2hlZCA9IHNlZWQgJiYgW10sXG5cdFx0XHRcdHNldE1hdGNoZWQgPSBbXSxcblx0XHRcdFx0Y29udGV4dEJhY2t1cCA9IG91dGVybW9zdENvbnRleHQsXG5cdFx0XHRcdC8vIFdlIG11c3QgYWx3YXlzIGhhdmUgZWl0aGVyIHNlZWQgZWxlbWVudHMgb3Igb3V0ZXJtb3N0IGNvbnRleHRcblx0XHRcdFx0ZWxlbXMgPSBzZWVkIHx8IGJ5RWxlbWVudCAmJiBFeHByLmZpbmRbXCJUQUdcIl0oIFwiKlwiLCBvdXRlcm1vc3QgKSxcblx0XHRcdFx0Ly8gVXNlIGludGVnZXIgZGlycnVucyBpZmYgdGhpcyBpcyB0aGUgb3V0ZXJtb3N0IG1hdGNoZXJcblx0XHRcdFx0ZGlycnVuc1VuaXF1ZSA9IChkaXJydW5zICs9IGNvbnRleHRCYWNrdXAgPT0gbnVsbCA/IDEgOiBNYXRoLnJhbmRvbSgpIHx8IDAuMSksXG5cdFx0XHRcdGxlbiA9IGVsZW1zLmxlbmd0aDtcblxuXHRcdFx0aWYgKCBvdXRlcm1vc3QgKSB7XG5cdFx0XHRcdG91dGVybW9zdENvbnRleHQgPSBjb250ZXh0ID09PSBkb2N1bWVudCB8fCBjb250ZXh0IHx8IG91dGVybW9zdDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIGVsZW1lbnRzIHBhc3NpbmcgZWxlbWVudE1hdGNoZXJzIGRpcmVjdGx5IHRvIHJlc3VsdHNcblx0XHRcdC8vIFN1cHBvcnQ6IElFPDksIFNhZmFyaVxuXHRcdFx0Ly8gVG9sZXJhdGUgTm9kZUxpc3QgcHJvcGVydGllcyAoSUU6IFwibGVuZ3RoXCI7IFNhZmFyaTogPG51bWJlcj4pIG1hdGNoaW5nIGVsZW1lbnRzIGJ5IGlkXG5cdFx0XHRmb3IgKCA7IGkgIT09IGxlbiAmJiAoZWxlbSA9IGVsZW1zW2ldKSAhPSBudWxsOyBpKysgKSB7XG5cdFx0XHRcdGlmICggYnlFbGVtZW50ICYmIGVsZW0gKSB7XG5cdFx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdFx0aWYgKCAhY29udGV4dCAmJiBlbGVtLm93bmVyRG9jdW1lbnQgIT09IGRvY3VtZW50ICkge1xuXHRcdFx0XHRcdFx0c2V0RG9jdW1lbnQoIGVsZW0gKTtcblx0XHRcdFx0XHRcdHhtbCA9ICFkb2N1bWVudElzSFRNTDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0d2hpbGUgKCAobWF0Y2hlciA9IGVsZW1lbnRNYXRjaGVyc1tqKytdKSApIHtcblx0XHRcdFx0XHRcdGlmICggbWF0Y2hlciggZWxlbSwgY29udGV4dCB8fCBkb2N1bWVudCwgeG1sKSApIHtcblx0XHRcdFx0XHRcdFx0cmVzdWx0cy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIG91dGVybW9zdCApIHtcblx0XHRcdFx0XHRcdGRpcnJ1bnMgPSBkaXJydW5zVW5pcXVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFRyYWNrIHVubWF0Y2hlZCBlbGVtZW50cyBmb3Igc2V0IGZpbHRlcnNcblx0XHRcdFx0aWYgKCBieVNldCApIHtcblx0XHRcdFx0XHQvLyBUaGV5IHdpbGwgaGF2ZSBnb25lIHRocm91Z2ggYWxsIHBvc3NpYmxlIG1hdGNoZXJzXG5cdFx0XHRcdFx0aWYgKCAoZWxlbSA9ICFtYXRjaGVyICYmIGVsZW0pICkge1xuXHRcdFx0XHRcdFx0bWF0Y2hlZENvdW50LS07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gTGVuZ3RoZW4gdGhlIGFycmF5IGZvciBldmVyeSBlbGVtZW50LCBtYXRjaGVkIG9yIG5vdFxuXHRcdFx0XHRcdGlmICggc2VlZCApIHtcblx0XHRcdFx0XHRcdHVubWF0Y2hlZC5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGBpYCBpcyBub3cgdGhlIGNvdW50IG9mIGVsZW1lbnRzIHZpc2l0ZWQgYWJvdmUsIGFuZCBhZGRpbmcgaXQgdG8gYG1hdGNoZWRDb3VudGBcblx0XHRcdC8vIG1ha2VzIHRoZSBsYXR0ZXIgbm9ubmVnYXRpdmUuXG5cdFx0XHRtYXRjaGVkQ291bnQgKz0gaTtcblxuXHRcdFx0Ly8gQXBwbHkgc2V0IGZpbHRlcnMgdG8gdW5tYXRjaGVkIGVsZW1lbnRzXG5cdFx0XHQvLyBOT1RFOiBUaGlzIGNhbiBiZSBza2lwcGVkIGlmIHRoZXJlIGFyZSBubyB1bm1hdGNoZWQgZWxlbWVudHMgKGkuZS4sIGBtYXRjaGVkQ291bnRgXG5cdFx0XHQvLyBlcXVhbHMgYGlgKSwgdW5sZXNzIHdlIGRpZG4ndCB2aXNpdCBfYW55XyBlbGVtZW50cyBpbiB0aGUgYWJvdmUgbG9vcCBiZWNhdXNlIHdlIGhhdmVcblx0XHRcdC8vIG5vIGVsZW1lbnQgbWF0Y2hlcnMgYW5kIG5vIHNlZWQuXG5cdFx0XHQvLyBJbmNyZW1lbnRpbmcgYW4gaW5pdGlhbGx5LXN0cmluZyBcIjBcIiBgaWAgYWxsb3dzIGBpYCB0byByZW1haW4gYSBzdHJpbmcgb25seSBpbiB0aGF0XG5cdFx0XHQvLyBjYXNlLCB3aGljaCB3aWxsIHJlc3VsdCBpbiBhIFwiMDBcIiBgbWF0Y2hlZENvdW50YCB0aGF0IGRpZmZlcnMgZnJvbSBgaWAgYnV0IGlzIGFsc29cblx0XHRcdC8vIG51bWVyaWNhbGx5IHplcm8uXG5cdFx0XHRpZiAoIGJ5U2V0ICYmIGkgIT09IG1hdGNoZWRDb3VudCApIHtcblx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdHdoaWxlICggKG1hdGNoZXIgPSBzZXRNYXRjaGVyc1tqKytdKSApIHtcblx0XHRcdFx0XHRtYXRjaGVyKCB1bm1hdGNoZWQsIHNldE1hdGNoZWQsIGNvbnRleHQsIHhtbCApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCBzZWVkICkge1xuXHRcdFx0XHRcdC8vIFJlaW50ZWdyYXRlIGVsZW1lbnQgbWF0Y2hlcyB0byBlbGltaW5hdGUgdGhlIG5lZWQgZm9yIHNvcnRpbmdcblx0XHRcdFx0XHRpZiAoIG1hdGNoZWRDb3VudCA+IDAgKSB7XG5cdFx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCAhKHVubWF0Y2hlZFtpXSB8fCBzZXRNYXRjaGVkW2ldKSApIHtcblx0XHRcdFx0XHRcdFx0XHRzZXRNYXRjaGVkW2ldID0gcG9wLmNhbGwoIHJlc3VsdHMgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIERpc2NhcmQgaW5kZXggcGxhY2Vob2xkZXIgdmFsdWVzIHRvIGdldCBvbmx5IGFjdHVhbCBtYXRjaGVzXG5cdFx0XHRcdFx0c2V0TWF0Y2hlZCA9IGNvbmRlbnNlKCBzZXRNYXRjaGVkICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBZGQgbWF0Y2hlcyB0byByZXN1bHRzXG5cdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIHNldE1hdGNoZWQgKTtcblxuXHRcdFx0XHQvLyBTZWVkbGVzcyBzZXQgbWF0Y2hlcyBzdWNjZWVkaW5nIG11bHRpcGxlIHN1Y2Nlc3NmdWwgbWF0Y2hlcnMgc3RpcHVsYXRlIHNvcnRpbmdcblx0XHRcdFx0aWYgKCBvdXRlcm1vc3QgJiYgIXNlZWQgJiYgc2V0TWF0Y2hlZC5sZW5ndGggPiAwICYmXG5cdFx0XHRcdFx0KCBtYXRjaGVkQ291bnQgKyBzZXRNYXRjaGVycy5sZW5ndGggKSA+IDEgKSB7XG5cblx0XHRcdFx0XHRTaXp6bGUudW5pcXVlU29ydCggcmVzdWx0cyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIE92ZXJyaWRlIG1hbmlwdWxhdGlvbiBvZiBnbG9iYWxzIGJ5IG5lc3RlZCBtYXRjaGVyc1xuXHRcdFx0aWYgKCBvdXRlcm1vc3QgKSB7XG5cdFx0XHRcdGRpcnJ1bnMgPSBkaXJydW5zVW5pcXVlO1xuXHRcdFx0XHRvdXRlcm1vc3RDb250ZXh0ID0gY29udGV4dEJhY2t1cDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHVubWF0Y2hlZDtcblx0XHR9O1xuXG5cdHJldHVybiBieVNldCA/XG5cdFx0bWFya0Z1bmN0aW9uKCBzdXBlck1hdGNoZXIgKSA6XG5cdFx0c3VwZXJNYXRjaGVyO1xufVxuXG5jb21waWxlID0gU2l6emxlLmNvbXBpbGUgPSBmdW5jdGlvbiggc2VsZWN0b3IsIG1hdGNoIC8qIEludGVybmFsIFVzZSBPbmx5ICovICkge1xuXHR2YXIgaSxcblx0XHRzZXRNYXRjaGVycyA9IFtdLFxuXHRcdGVsZW1lbnRNYXRjaGVycyA9IFtdLFxuXHRcdGNhY2hlZCA9IGNvbXBpbGVyQ2FjaGVbIHNlbGVjdG9yICsgXCIgXCIgXTtcblxuXHRpZiAoICFjYWNoZWQgKSB7XG5cdFx0Ly8gR2VuZXJhdGUgYSBmdW5jdGlvbiBvZiByZWN1cnNpdmUgZnVuY3Rpb25zIHRoYXQgY2FuIGJlIHVzZWQgdG8gY2hlY2sgZWFjaCBlbGVtZW50XG5cdFx0aWYgKCAhbWF0Y2ggKSB7XG5cdFx0XHRtYXRjaCA9IHRva2VuaXplKCBzZWxlY3RvciApO1xuXHRcdH1cblx0XHRpID0gbWF0Y2gubGVuZ3RoO1xuXHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0Y2FjaGVkID0gbWF0Y2hlckZyb21Ub2tlbnMoIG1hdGNoW2ldICk7XG5cdFx0XHRpZiAoIGNhY2hlZFsgZXhwYW5kbyBdICkge1xuXHRcdFx0XHRzZXRNYXRjaGVycy5wdXNoKCBjYWNoZWQgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1lbnRNYXRjaGVycy5wdXNoKCBjYWNoZWQgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDYWNoZSB0aGUgY29tcGlsZWQgZnVuY3Rpb25cblx0XHRjYWNoZWQgPSBjb21waWxlckNhY2hlKCBzZWxlY3RvciwgbWF0Y2hlckZyb21Hcm91cE1hdGNoZXJzKCBlbGVtZW50TWF0Y2hlcnMsIHNldE1hdGNoZXJzICkgKTtcblxuXHRcdC8vIFNhdmUgc2VsZWN0b3IgYW5kIHRva2VuaXphdGlvblxuXHRcdGNhY2hlZC5zZWxlY3RvciA9IHNlbGVjdG9yO1xuXHR9XG5cdHJldHVybiBjYWNoZWQ7XG59O1xuXG4vKipcbiAqIEEgbG93LWxldmVsIHNlbGVjdGlvbiBmdW5jdGlvbiB0aGF0IHdvcmtzIHdpdGggU2l6emxlJ3MgY29tcGlsZWRcbiAqICBzZWxlY3RvciBmdW5jdGlvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSBzZWxlY3RvciBBIHNlbGVjdG9yIG9yIGEgcHJlLWNvbXBpbGVkXG4gKiAgc2VsZWN0b3IgZnVuY3Rpb24gYnVpbHQgd2l0aCBTaXp6bGUuY29tcGlsZVxuICogQHBhcmFtIHtFbGVtZW50fSBjb250ZXh0XG4gKiBAcGFyYW0ge0FycmF5fSBbcmVzdWx0c11cbiAqIEBwYXJhbSB7QXJyYXl9IFtzZWVkXSBBIHNldCBvZiBlbGVtZW50cyB0byBtYXRjaCBhZ2FpbnN0XG4gKi9cbnNlbGVjdCA9IFNpenpsZS5zZWxlY3QgPSBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQsIHJlc3VsdHMsIHNlZWQgKSB7XG5cdHZhciBpLCB0b2tlbnMsIHRva2VuLCB0eXBlLCBmaW5kLFxuXHRcdGNvbXBpbGVkID0gdHlwZW9mIHNlbGVjdG9yID09PSBcImZ1bmN0aW9uXCIgJiYgc2VsZWN0b3IsXG5cdFx0bWF0Y2ggPSAhc2VlZCAmJiB0b2tlbml6ZSggKHNlbGVjdG9yID0gY29tcGlsZWQuc2VsZWN0b3IgfHwgc2VsZWN0b3IpICk7XG5cblx0cmVzdWx0cyA9IHJlc3VsdHMgfHwgW107XG5cblx0Ly8gVHJ5IHRvIG1pbmltaXplIG9wZXJhdGlvbnMgaWYgdGhlcmUgaXMgb25seSBvbmUgc2VsZWN0b3IgaW4gdGhlIGxpc3QgYW5kIG5vIHNlZWRcblx0Ly8gKHRoZSBsYXR0ZXIgb2Ygd2hpY2ggZ3VhcmFudGVlcyB1cyBjb250ZXh0KVxuXHRpZiAoIG1hdGNoLmxlbmd0aCA9PT0gMSApIHtcblxuXHRcdC8vIFJlZHVjZSBjb250ZXh0IGlmIHRoZSBsZWFkaW5nIGNvbXBvdW5kIHNlbGVjdG9yIGlzIGFuIElEXG5cdFx0dG9rZW5zID0gbWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZSggMCApO1xuXHRcdGlmICggdG9rZW5zLmxlbmd0aCA+IDIgJiYgKHRva2VuID0gdG9rZW5zWzBdKS50eXBlID09PSBcIklEXCIgJiZcblx0XHRcdFx0Y29udGV4dC5ub2RlVHlwZSA9PT0gOSAmJiBkb2N1bWVudElzSFRNTCAmJiBFeHByLnJlbGF0aXZlWyB0b2tlbnNbMV0udHlwZSBdICkge1xuXG5cdFx0XHRjb250ZXh0ID0gKCBFeHByLmZpbmRbXCJJRFwiXSggdG9rZW4ubWF0Y2hlc1swXS5yZXBsYWNlKHJ1bmVzY2FwZSwgZnVuZXNjYXBlKSwgY29udGV4dCApIHx8IFtdIClbMF07XG5cdFx0XHRpZiAoICFjb250ZXh0ICkge1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblxuXHRcdFx0Ly8gUHJlY29tcGlsZWQgbWF0Y2hlcnMgd2lsbCBzdGlsbCB2ZXJpZnkgYW5jZXN0cnksIHNvIHN0ZXAgdXAgYSBsZXZlbFxuXHRcdFx0fSBlbHNlIGlmICggY29tcGlsZWQgKSB7XG5cdFx0XHRcdGNvbnRleHQgPSBjb250ZXh0LnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdHNlbGVjdG9yID0gc2VsZWN0b3Iuc2xpY2UoIHRva2Vucy5zaGlmdCgpLnZhbHVlLmxlbmd0aCApO1xuXHRcdH1cblxuXHRcdC8vIEZldGNoIGEgc2VlZCBzZXQgZm9yIHJpZ2h0LXRvLWxlZnQgbWF0Y2hpbmdcblx0XHRpID0gbWF0Y2hFeHByW1wibmVlZHNDb250ZXh0XCJdLnRlc3QoIHNlbGVjdG9yICkgPyAwIDogdG9rZW5zLmxlbmd0aDtcblx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdHRva2VuID0gdG9rZW5zW2ldO1xuXG5cdFx0XHQvLyBBYm9ydCBpZiB3ZSBoaXQgYSBjb21iaW5hdG9yXG5cdFx0XHRpZiAoIEV4cHIucmVsYXRpdmVbICh0eXBlID0gdG9rZW4udHlwZSkgXSApIHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIChmaW5kID0gRXhwci5maW5kWyB0eXBlIF0pICkge1xuXHRcdFx0XHQvLyBTZWFyY2gsIGV4cGFuZGluZyBjb250ZXh0IGZvciBsZWFkaW5nIHNpYmxpbmcgY29tYmluYXRvcnNcblx0XHRcdFx0aWYgKCAoc2VlZCA9IGZpbmQoXG5cdFx0XHRcdFx0dG9rZW4ubWF0Y2hlc1swXS5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLFxuXHRcdFx0XHRcdHJzaWJsaW5nLnRlc3QoIHRva2Vuc1swXS50eXBlICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8IGNvbnRleHRcblx0XHRcdFx0KSkgKSB7XG5cblx0XHRcdFx0XHQvLyBJZiBzZWVkIGlzIGVtcHR5IG9yIG5vIHRva2VucyByZW1haW4sIHdlIGNhbiByZXR1cm4gZWFybHlcblx0XHRcdFx0XHR0b2tlbnMuc3BsaWNlKCBpLCAxICk7XG5cdFx0XHRcdFx0c2VsZWN0b3IgPSBzZWVkLmxlbmd0aCAmJiB0b1NlbGVjdG9yKCB0b2tlbnMgKTtcblx0XHRcdFx0XHRpZiAoICFzZWxlY3RvciApIHtcblx0XHRcdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIHNlZWQgKTtcblx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ29tcGlsZSBhbmQgZXhlY3V0ZSBhIGZpbHRlcmluZyBmdW5jdGlvbiBpZiBvbmUgaXMgbm90IHByb3ZpZGVkXG5cdC8vIFByb3ZpZGUgYG1hdGNoYCB0byBhdm9pZCByZXRva2VuaXphdGlvbiBpZiB3ZSBtb2RpZmllZCB0aGUgc2VsZWN0b3IgYWJvdmVcblx0KCBjb21waWxlZCB8fCBjb21waWxlKCBzZWxlY3RvciwgbWF0Y2ggKSApKFxuXHRcdHNlZWQsXG5cdFx0Y29udGV4dCxcblx0XHQhZG9jdW1lbnRJc0hUTUwsXG5cdFx0cmVzdWx0cyxcblx0XHQhY29udGV4dCB8fCByc2libGluZy50ZXN0KCBzZWxlY3RvciApICYmIHRlc3RDb250ZXh0KCBjb250ZXh0LnBhcmVudE5vZGUgKSB8fCBjb250ZXh0XG5cdCk7XG5cdHJldHVybiByZXN1bHRzO1xufTtcblxuLy8gT25lLXRpbWUgYXNzaWdubWVudHNcblxuLy8gU29ydCBzdGFiaWxpdHlcbnN1cHBvcnQuc29ydFN0YWJsZSA9IGV4cGFuZG8uc3BsaXQoXCJcIikuc29ydCggc29ydE9yZGVyICkuam9pbihcIlwiKSA9PT0gZXhwYW5kbztcblxuLy8gU3VwcG9ydDogQ2hyb21lIDE0LTM1K1xuLy8gQWx3YXlzIGFzc3VtZSBkdXBsaWNhdGVzIGlmIHRoZXkgYXJlbid0IHBhc3NlZCB0byB0aGUgY29tcGFyaXNvbiBmdW5jdGlvblxuc3VwcG9ydC5kZXRlY3REdXBsaWNhdGVzID0gISFoYXNEdXBsaWNhdGU7XG5cbi8vIEluaXRpYWxpemUgYWdhaW5zdCB0aGUgZGVmYXVsdCBkb2N1bWVudFxuc2V0RG9jdW1lbnQoKTtcblxuLy8gU3VwcG9ydDogV2Via2l0PDUzNy4zMiAtIFNhZmFyaSA2LjAuMy9DaHJvbWUgMjUgKGZpeGVkIGluIENocm9tZSAyNylcbi8vIERldGFjaGVkIG5vZGVzIGNvbmZvdW5kaW5nbHkgZm9sbG93ICplYWNoIG90aGVyKlxuc3VwcG9ydC5zb3J0RGV0YWNoZWQgPSBhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHQvLyBTaG91bGQgcmV0dXJuIDEsIGJ1dCByZXR1cm5zIDQgKGZvbGxvd2luZylcblx0cmV0dXJuIGVsLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIikgKSAmIDE7XG59KTtcblxuLy8gU3VwcG9ydDogSUU8OFxuLy8gUHJldmVudCBhdHRyaWJ1dGUvcHJvcGVydHkgXCJpbnRlcnBvbGF0aW9uXCJcbi8vIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXM1MzY0MjklMjhWUy44NSUyOS5hc3B4XG5pZiAoICFhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHRlbC5pbm5lckhUTUwgPSBcIjxhIGhyZWY9JyMnPjwvYT5cIjtcblx0cmV0dXJuIGVsLmZpcnN0Q2hpbGQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSA9PT0gXCIjXCIgO1xufSkgKSB7XG5cdGFkZEhhbmRsZSggXCJ0eXBlfGhyZWZ8aGVpZ2h0fHdpZHRoXCIsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcblx0XHRpZiAoICFpc1hNTCApIHtcblx0XHRcdHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSwgbmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInR5cGVcIiA/IDEgOiAyICk7XG5cdFx0fVxuXHR9KTtcbn1cblxuLy8gU3VwcG9ydDogSUU8OVxuLy8gVXNlIGRlZmF1bHRWYWx1ZSBpbiBwbGFjZSBvZiBnZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKVxuaWYgKCAhc3VwcG9ydC5hdHRyaWJ1dGVzIHx8ICFhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHRlbC5pbm5lckhUTUwgPSBcIjxpbnB1dC8+XCI7XG5cdGVsLmZpcnN0Q2hpbGQuc2V0QXR0cmlidXRlKCBcInZhbHVlXCIsIFwiXCIgKTtcblx0cmV0dXJuIGVsLmZpcnN0Q2hpbGQuZ2V0QXR0cmlidXRlKCBcInZhbHVlXCIgKSA9PT0gXCJcIjtcbn0pICkge1xuXHRhZGRIYW5kbGUoIFwidmFsdWVcIiwgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdGlmICggIWlzWE1MICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnB1dFwiICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0fSk7XG59XG5cbi8vIFN1cHBvcnQ6IElFPDlcbi8vIFVzZSBnZXRBdHRyaWJ1dGVOb2RlIHRvIGZldGNoIGJvb2xlYW5zIHdoZW4gZ2V0QXR0cmlidXRlIGxpZXNcbmlmICggIWFzc2VydChmdW5jdGlvbiggZWwgKSB7XG5cdHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKSA9PSBudWxsO1xufSkgKSB7XG5cdGFkZEhhbmRsZSggYm9vbGVhbnMsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcblx0XHR2YXIgdmFsO1xuXHRcdGlmICggIWlzWE1MICkge1xuXHRcdFx0cmV0dXJuIGVsZW1bIG5hbWUgXSA9PT0gdHJ1ZSA/IG5hbWUudG9Mb3dlckNhc2UoKSA6XG5cdFx0XHRcdFx0KHZhbCA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZSggbmFtZSApKSAmJiB2YWwuc3BlY2lmaWVkID9cblx0XHRcdFx0XHR2YWwudmFsdWUgOlxuXHRcdFx0XHRudWxsO1xuXHRcdH1cblx0fSk7XG59XG5cbnJldHVybiBTaXp6bGU7XG5cbn0pKCB3aW5kb3cgKTtcblxuXG5cbmpRdWVyeS5maW5kID0gU2l6emxlO1xualF1ZXJ5LmV4cHIgPSBTaXp6bGUuc2VsZWN0b3JzO1xuXG4vLyBEZXByZWNhdGVkXG5qUXVlcnkuZXhwclsgXCI6XCIgXSA9IGpRdWVyeS5leHByLnBzZXVkb3M7XG5qUXVlcnkudW5pcXVlU29ydCA9IGpRdWVyeS51bmlxdWUgPSBTaXp6bGUudW5pcXVlU29ydDtcbmpRdWVyeS50ZXh0ID0gU2l6emxlLmdldFRleHQ7XG5qUXVlcnkuaXNYTUxEb2MgPSBTaXp6bGUuaXNYTUw7XG5qUXVlcnkuY29udGFpbnMgPSBTaXp6bGUuY29udGFpbnM7XG5qUXVlcnkuZXNjYXBlU2VsZWN0b3IgPSBTaXp6bGUuZXNjYXBlO1xuXG5cblxuXG52YXIgZGlyID0gZnVuY3Rpb24oIGVsZW0sIGRpciwgdW50aWwgKSB7XG5cdHZhciBtYXRjaGVkID0gW10sXG5cdFx0dHJ1bmNhdGUgPSB1bnRpbCAhPT0gdW5kZWZpbmVkO1xuXG5cdHdoaWxlICggKCBlbGVtID0gZWxlbVsgZGlyIF0gKSAmJiBlbGVtLm5vZGVUeXBlICE9PSA5ICkge1xuXHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdGlmICggdHJ1bmNhdGUgJiYgalF1ZXJ5KCBlbGVtICkuaXMoIHVudGlsICkgKSB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0bWF0Y2hlZC5wdXNoKCBlbGVtICk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBtYXRjaGVkO1xufTtcblxuXG52YXIgc2libGluZ3MgPSBmdW5jdGlvbiggbiwgZWxlbSApIHtcblx0dmFyIG1hdGNoZWQgPSBbXTtcblxuXHRmb3IgKCA7IG47IG4gPSBuLm5leHRTaWJsaW5nICkge1xuXHRcdGlmICggbi5ub2RlVHlwZSA9PT0gMSAmJiBuICE9PSBlbGVtICkge1xuXHRcdFx0bWF0Y2hlZC5wdXNoKCBuICk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG1hdGNoZWQ7XG59O1xuXG5cbnZhciBybmVlZHNDb250ZXh0ID0galF1ZXJ5LmV4cHIubWF0Y2gubmVlZHNDb250ZXh0O1xuXG5cblxuZnVuY3Rpb24gbm9kZU5hbWUoIGVsZW0sIG5hbWUgKSB7XG5cbiAgcmV0dXJuIGVsZW0ubm9kZU5hbWUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cbn07XG52YXIgcnNpbmdsZVRhZyA9ICggL148KFthLXpdW15cXC9cXDA+OlxceDIwXFx0XFxyXFxuXFxmXSopW1xceDIwXFx0XFxyXFxuXFxmXSpcXC8/Pig/OjxcXC9cXDE+fCkkL2kgKTtcblxuXG5cbnZhciByaXNTaW1wbGUgPSAvXi5bXjojXFxbXFwuLF0qJC87XG5cbi8vIEltcGxlbWVudCB0aGUgaWRlbnRpY2FsIGZ1bmN0aW9uYWxpdHkgZm9yIGZpbHRlciBhbmQgbm90XG5mdW5jdGlvbiB3aW5ub3coIGVsZW1lbnRzLCBxdWFsaWZpZXIsIG5vdCApIHtcblx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggcXVhbGlmaWVyICkgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5ncmVwKCBlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0sIGkgKSB7XG5cdFx0XHRyZXR1cm4gISFxdWFsaWZpZXIuY2FsbCggZWxlbSwgaSwgZWxlbSApICE9PSBub3Q7XG5cdFx0fSApO1xuXHR9XG5cblx0Ly8gU2luZ2xlIGVsZW1lbnRcblx0aWYgKCBxdWFsaWZpZXIubm9kZVR5cGUgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5ncmVwKCBlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gKCBlbGVtID09PSBxdWFsaWZpZXIgKSAhPT0gbm90O1xuXHRcdH0gKTtcblx0fVxuXG5cdC8vIEFycmF5bGlrZSBvZiBlbGVtZW50cyAoalF1ZXJ5LCBhcmd1bWVudHMsIEFycmF5KVxuXHRpZiAoIHR5cGVvZiBxdWFsaWZpZXIgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5ncmVwKCBlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gKCBpbmRleE9mLmNhbGwoIHF1YWxpZmllciwgZWxlbSApID4gLTEgKSAhPT0gbm90O1xuXHRcdH0gKTtcblx0fVxuXG5cdC8vIFNpbXBsZSBzZWxlY3RvciB0aGF0IGNhbiBiZSBmaWx0ZXJlZCBkaXJlY3RseSwgcmVtb3Zpbmcgbm9uLUVsZW1lbnRzXG5cdGlmICggcmlzU2ltcGxlLnRlc3QoIHF1YWxpZmllciApICkge1xuXHRcdHJldHVybiBqUXVlcnkuZmlsdGVyKCBxdWFsaWZpZXIsIGVsZW1lbnRzLCBub3QgKTtcblx0fVxuXG5cdC8vIENvbXBsZXggc2VsZWN0b3IsIGNvbXBhcmUgdGhlIHR3byBzZXRzLCByZW1vdmluZyBub24tRWxlbWVudHNcblx0cXVhbGlmaWVyID0galF1ZXJ5LmZpbHRlciggcXVhbGlmaWVyLCBlbGVtZW50cyApO1xuXHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gKCBpbmRleE9mLmNhbGwoIHF1YWxpZmllciwgZWxlbSApID4gLTEgKSAhPT0gbm90ICYmIGVsZW0ubm9kZVR5cGUgPT09IDE7XG5cdH0gKTtcbn1cblxualF1ZXJ5LmZpbHRlciA9IGZ1bmN0aW9uKCBleHByLCBlbGVtcywgbm90ICkge1xuXHR2YXIgZWxlbSA9IGVsZW1zWyAwIF07XG5cblx0aWYgKCBub3QgKSB7XG5cdFx0ZXhwciA9IFwiOm5vdChcIiArIGV4cHIgKyBcIilcIjtcblx0fVxuXG5cdGlmICggZWxlbXMubGVuZ3RoID09PSAxICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5maW5kLm1hdGNoZXNTZWxlY3RvciggZWxlbSwgZXhwciApID8gWyBlbGVtIF0gOiBbXTtcblx0fVxuXG5cdHJldHVybiBqUXVlcnkuZmluZC5tYXRjaGVzKCBleHByLCBqUXVlcnkuZ3JlcCggZWxlbXMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBlbGVtLm5vZGVUeXBlID09PSAxO1xuXHR9ICkgKTtcbn07XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0ZmluZDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHZhciBpLCByZXQsXG5cdFx0XHRsZW4gPSB0aGlzLmxlbmd0aCxcblx0XHRcdHNlbGYgPSB0aGlzO1xuXG5cdFx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIGpRdWVyeSggc2VsZWN0b3IgKS5maWx0ZXIoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRcdGlmICggalF1ZXJ5LmNvbnRhaW5zKCBzZWxmWyBpIF0sIHRoaXMgKSApIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSApICk7XG5cdFx0fVxuXG5cdFx0cmV0ID0gdGhpcy5wdXNoU3RhY2soIFtdICk7XG5cblx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0alF1ZXJ5LmZpbmQoIHNlbGVjdG9yLCBzZWxmWyBpIF0sIHJldCApO1xuXHRcdH1cblxuXHRcdHJldHVybiBsZW4gPiAxID8galF1ZXJ5LnVuaXF1ZVNvcnQoIHJldCApIDogcmV0O1xuXHR9LFxuXHRmaWx0ZXI6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHdpbm5vdyggdGhpcywgc2VsZWN0b3IgfHwgW10sIGZhbHNlICkgKTtcblx0fSxcblx0bm90OiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCB3aW5ub3coIHRoaXMsIHNlbGVjdG9yIHx8IFtdLCB0cnVlICkgKTtcblx0fSxcblx0aXM6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gISF3aW5ub3coXG5cdFx0XHR0aGlzLFxuXG5cdFx0XHQvLyBJZiB0aGlzIGlzIGEgcG9zaXRpb25hbC9yZWxhdGl2ZSBzZWxlY3RvciwgY2hlY2sgbWVtYmVyc2hpcCBpbiB0aGUgcmV0dXJuZWQgc2V0XG5cdFx0XHQvLyBzbyAkKFwicDpmaXJzdFwiKS5pcyhcInA6bGFzdFwiKSB3b24ndCByZXR1cm4gdHJ1ZSBmb3IgYSBkb2Mgd2l0aCB0d28gXCJwXCIuXG5cdFx0XHR0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgJiYgcm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvciApID9cblx0XHRcdFx0alF1ZXJ5KCBzZWxlY3RvciApIDpcblx0XHRcdFx0c2VsZWN0b3IgfHwgW10sXG5cdFx0XHRmYWxzZVxuXHRcdCkubGVuZ3RoO1xuXHR9XG59ICk7XG5cblxuLy8gSW5pdGlhbGl6ZSBhIGpRdWVyeSBvYmplY3RcblxuXG4vLyBBIGNlbnRyYWwgcmVmZXJlbmNlIHRvIHRoZSByb290IGpRdWVyeShkb2N1bWVudClcbnZhciByb290alF1ZXJ5LFxuXG5cdC8vIEEgc2ltcGxlIHdheSB0byBjaGVjayBmb3IgSFRNTCBzdHJpbmdzXG5cdC8vIFByaW9yaXRpemUgI2lkIG92ZXIgPHRhZz4gdG8gYXZvaWQgWFNTIHZpYSBsb2NhdGlvbi5oYXNoICgjOTUyMSlcblx0Ly8gU3RyaWN0IEhUTUwgcmVjb2duaXRpb24gKCMxMTI5MDogbXVzdCBzdGFydCB3aXRoIDwpXG5cdC8vIFNob3J0Y3V0IHNpbXBsZSAjaWQgY2FzZSBmb3Igc3BlZWRcblx0cnF1aWNrRXhwciA9IC9eKD86XFxzKig8W1xcd1xcV10rPilbXj5dKnwjKFtcXHctXSspKSQvLFxuXG5cdGluaXQgPSBqUXVlcnkuZm4uaW5pdCA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCwgcm9vdCApIHtcblx0XHR2YXIgbWF0Y2gsIGVsZW07XG5cblx0XHQvLyBIQU5ETEU6ICQoXCJcIiksICQobnVsbCksICQodW5kZWZpbmVkKSwgJChmYWxzZSlcblx0XHRpZiAoICFzZWxlY3RvciApIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdC8vIE1ldGhvZCBpbml0KCkgYWNjZXB0cyBhbiBhbHRlcm5hdGUgcm9vdGpRdWVyeVxuXHRcdC8vIHNvIG1pZ3JhdGUgY2FuIHN1cHBvcnQgalF1ZXJ5LnN1YiAoZ2gtMjEwMSlcblx0XHRyb290ID0gcm9vdCB8fCByb290alF1ZXJ5O1xuXG5cdFx0Ly8gSGFuZGxlIEhUTUwgc3RyaW5nc1xuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0aWYgKCBzZWxlY3RvclsgMCBdID09PSBcIjxcIiAmJlxuXHRcdFx0XHRzZWxlY3Rvclsgc2VsZWN0b3IubGVuZ3RoIC0gMSBdID09PSBcIj5cIiAmJlxuXHRcdFx0XHRzZWxlY3Rvci5sZW5ndGggPj0gMyApIHtcblxuXHRcdFx0XHQvLyBBc3N1bWUgdGhhdCBzdHJpbmdzIHRoYXQgc3RhcnQgYW5kIGVuZCB3aXRoIDw+IGFyZSBIVE1MIGFuZCBza2lwIHRoZSByZWdleCBjaGVja1xuXHRcdFx0XHRtYXRjaCA9IFsgbnVsbCwgc2VsZWN0b3IsIG51bGwgXTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bWF0Y2ggPSBycXVpY2tFeHByLmV4ZWMoIHNlbGVjdG9yICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE1hdGNoIGh0bWwgb3IgbWFrZSBzdXJlIG5vIGNvbnRleHQgaXMgc3BlY2lmaWVkIGZvciAjaWRcblx0XHRcdGlmICggbWF0Y2ggJiYgKCBtYXRjaFsgMSBdIHx8ICFjb250ZXh0ICkgKSB7XG5cblx0XHRcdFx0Ly8gSEFORExFOiAkKGh0bWwpIC0+ICQoYXJyYXkpXG5cdFx0XHRcdGlmICggbWF0Y2hbIDEgXSApIHtcblx0XHRcdFx0XHRjb250ZXh0ID0gY29udGV4dCBpbnN0YW5jZW9mIGpRdWVyeSA/IGNvbnRleHRbIDAgXSA6IGNvbnRleHQ7XG5cblx0XHRcdFx0XHQvLyBPcHRpb24gdG8gcnVuIHNjcmlwdHMgaXMgdHJ1ZSBmb3IgYmFjay1jb21wYXRcblx0XHRcdFx0XHQvLyBJbnRlbnRpb25hbGx5IGxldCB0aGUgZXJyb3IgYmUgdGhyb3duIGlmIHBhcnNlSFRNTCBpcyBub3QgcHJlc2VudFxuXHRcdFx0XHRcdGpRdWVyeS5tZXJnZSggdGhpcywgalF1ZXJ5LnBhcnNlSFRNTChcblx0XHRcdFx0XHRcdG1hdGNoWyAxIF0sXG5cdFx0XHRcdFx0XHRjb250ZXh0ICYmIGNvbnRleHQubm9kZVR5cGUgPyBjb250ZXh0Lm93bmVyRG9jdW1lbnQgfHwgY29udGV4dCA6IGRvY3VtZW50LFxuXHRcdFx0XHRcdFx0dHJ1ZVxuXHRcdFx0XHRcdCkgKTtcblxuXHRcdFx0XHRcdC8vIEhBTkRMRTogJChodG1sLCBwcm9wcylcblx0XHRcdFx0XHRpZiAoIHJzaW5nbGVUYWcudGVzdCggbWF0Y2hbIDEgXSApICYmIGpRdWVyeS5pc1BsYWluT2JqZWN0KCBjb250ZXh0ICkgKSB7XG5cdFx0XHRcdFx0XHRmb3IgKCBtYXRjaCBpbiBjb250ZXh0ICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIFByb3BlcnRpZXMgb2YgY29udGV4dCBhcmUgY2FsbGVkIGFzIG1ldGhvZHMgaWYgcG9zc2libGVcblx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdGhpc1sgbWF0Y2ggXSApICkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXNbIG1hdGNoIF0oIGNvbnRleHRbIG1hdGNoIF0gKTtcblxuXHRcdFx0XHRcdFx0XHQvLyAuLi5hbmQgb3RoZXJ3aXNlIHNldCBhcyBhdHRyaWJ1dGVzXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5hdHRyKCBtYXRjaCwgY29udGV4dFsgbWF0Y2ggXSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHRcdFx0Ly8gSEFORExFOiAkKCNpZClcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIG1hdGNoWyAyIF0gKTtcblxuXHRcdFx0XHRcdGlmICggZWxlbSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gSW5qZWN0IHRoZSBlbGVtZW50IGRpcmVjdGx5IGludG8gdGhlIGpRdWVyeSBvYmplY3Rcblx0XHRcdFx0XHRcdHRoaXNbIDAgXSA9IGVsZW07XG5cdFx0XHRcdFx0XHR0aGlzLmxlbmd0aCA9IDE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8vIEhBTkRMRTogJChleHByLCAkKC4uLikpXG5cdFx0XHR9IGVsc2UgaWYgKCAhY29udGV4dCB8fCBjb250ZXh0LmpxdWVyeSApIHtcblx0XHRcdFx0cmV0dXJuICggY29udGV4dCB8fCByb290ICkuZmluZCggc2VsZWN0b3IgKTtcblxuXHRcdFx0Ly8gSEFORExFOiAkKGV4cHIsIGNvbnRleHQpXG5cdFx0XHQvLyAod2hpY2ggaXMganVzdCBlcXVpdmFsZW50IHRvOiAkKGNvbnRleHQpLmZpbmQoZXhwcilcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yKCBjb250ZXh0ICkuZmluZCggc2VsZWN0b3IgKTtcblx0XHRcdH1cblxuXHRcdC8vIEhBTkRMRTogJChET01FbGVtZW50KVxuXHRcdH0gZWxzZSBpZiAoIHNlbGVjdG9yLm5vZGVUeXBlICkge1xuXHRcdFx0dGhpc1sgMCBdID0gc2VsZWN0b3I7XG5cdFx0XHR0aGlzLmxlbmd0aCA9IDE7XG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdC8vIEhBTkRMRTogJChmdW5jdGlvbilcblx0XHQvLyBTaG9ydGN1dCBmb3IgZG9jdW1lbnQgcmVhZHlcblx0XHR9IGVsc2UgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggc2VsZWN0b3IgKSApIHtcblx0XHRcdHJldHVybiByb290LnJlYWR5ICE9PSB1bmRlZmluZWQgP1xuXHRcdFx0XHRyb290LnJlYWR5KCBzZWxlY3RvciApIDpcblxuXHRcdFx0XHQvLyBFeGVjdXRlIGltbWVkaWF0ZWx5IGlmIHJlYWR5IGlzIG5vdCBwcmVzZW50XG5cdFx0XHRcdHNlbGVjdG9yKCBqUXVlcnkgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4galF1ZXJ5Lm1ha2VBcnJheSggc2VsZWN0b3IsIHRoaXMgKTtcblx0fTtcblxuLy8gR2l2ZSB0aGUgaW5pdCBmdW5jdGlvbiB0aGUgalF1ZXJ5IHByb3RvdHlwZSBmb3IgbGF0ZXIgaW5zdGFudGlhdGlvblxuaW5pdC5wcm90b3R5cGUgPSBqUXVlcnkuZm47XG5cbi8vIEluaXRpYWxpemUgY2VudHJhbCByZWZlcmVuY2VcbnJvb3RqUXVlcnkgPSBqUXVlcnkoIGRvY3VtZW50ICk7XG5cblxudmFyIHJwYXJlbnRzcHJldiA9IC9eKD86cGFyZW50c3xwcmV2KD86VW50aWx8QWxsKSkvLFxuXG5cdC8vIE1ldGhvZHMgZ3VhcmFudGVlZCB0byBwcm9kdWNlIGEgdW5pcXVlIHNldCB3aGVuIHN0YXJ0aW5nIGZyb20gYSB1bmlxdWUgc2V0XG5cdGd1YXJhbnRlZWRVbmlxdWUgPSB7XG5cdFx0Y2hpbGRyZW46IHRydWUsXG5cdFx0Y29udGVudHM6IHRydWUsXG5cdFx0bmV4dDogdHJ1ZSxcblx0XHRwcmV2OiB0cnVlXG5cdH07XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0aGFzOiBmdW5jdGlvbiggdGFyZ2V0ICkge1xuXHRcdHZhciB0YXJnZXRzID0galF1ZXJ5KCB0YXJnZXQsIHRoaXMgKSxcblx0XHRcdGwgPSB0YXJnZXRzLmxlbmd0aDtcblxuXHRcdHJldHVybiB0aGlzLmZpbHRlciggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgaSA9IDA7XG5cdFx0XHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdGlmICggalF1ZXJ5LmNvbnRhaW5zKCB0aGlzLCB0YXJnZXRzWyBpIF0gKSApIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblxuXHRjbG9zZXN0OiBmdW5jdGlvbiggc2VsZWN0b3JzLCBjb250ZXh0ICkge1xuXHRcdHZhciBjdXIsXG5cdFx0XHRpID0gMCxcblx0XHRcdGwgPSB0aGlzLmxlbmd0aCxcblx0XHRcdG1hdGNoZWQgPSBbXSxcblx0XHRcdHRhcmdldHMgPSB0eXBlb2Ygc2VsZWN0b3JzICE9PSBcInN0cmluZ1wiICYmIGpRdWVyeSggc2VsZWN0b3JzICk7XG5cblx0XHQvLyBQb3NpdGlvbmFsIHNlbGVjdG9ycyBuZXZlciBtYXRjaCwgc2luY2UgdGhlcmUncyBubyBfc2VsZWN0aW9uXyBjb250ZXh0XG5cdFx0aWYgKCAhcm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvcnMgKSApIHtcblx0XHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0Zm9yICggY3VyID0gdGhpc1sgaSBdOyBjdXIgJiYgY3VyICE9PSBjb250ZXh0OyBjdXIgPSBjdXIucGFyZW50Tm9kZSApIHtcblxuXHRcdFx0XHRcdC8vIEFsd2F5cyBza2lwIGRvY3VtZW50IGZyYWdtZW50c1xuXHRcdFx0XHRcdGlmICggY3VyLm5vZGVUeXBlIDwgMTEgJiYgKCB0YXJnZXRzID9cblx0XHRcdFx0XHRcdHRhcmdldHMuaW5kZXgoIGN1ciApID4gLTEgOlxuXG5cdFx0XHRcdFx0XHQvLyBEb24ndCBwYXNzIG5vbi1lbGVtZW50cyB0byBTaXp6bGVcblx0XHRcdFx0XHRcdGN1ci5ub2RlVHlwZSA9PT0gMSAmJlxuXHRcdFx0XHRcdFx0XHRqUXVlcnkuZmluZC5tYXRjaGVzU2VsZWN0b3IoIGN1ciwgc2VsZWN0b3JzICkgKSApIHtcblxuXHRcdFx0XHRcdFx0bWF0Y2hlZC5wdXNoKCBjdXIgKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggbWF0Y2hlZC5sZW5ndGggPiAxID8galF1ZXJ5LnVuaXF1ZVNvcnQoIG1hdGNoZWQgKSA6IG1hdGNoZWQgKTtcblx0fSxcblxuXHQvLyBEZXRlcm1pbmUgdGhlIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnQgd2l0aGluIHRoZSBzZXRcblx0aW5kZXg6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0Ly8gTm8gYXJndW1lbnQsIHJldHVybiBpbmRleCBpbiBwYXJlbnRcblx0XHRpZiAoICFlbGVtICkge1xuXHRcdFx0cmV0dXJuICggdGhpc1sgMCBdICYmIHRoaXNbIDAgXS5wYXJlbnROb2RlICkgPyB0aGlzLmZpcnN0KCkucHJldkFsbCgpLmxlbmd0aCA6IC0xO1xuXHRcdH1cblxuXHRcdC8vIEluZGV4IGluIHNlbGVjdG9yXG5cdFx0aWYgKCB0eXBlb2YgZWxlbSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiBpbmRleE9mLmNhbGwoIGpRdWVyeSggZWxlbSApLCB0aGlzWyAwIF0gKTtcblx0XHR9XG5cblx0XHQvLyBMb2NhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBkZXNpcmVkIGVsZW1lbnRcblx0XHRyZXR1cm4gaW5kZXhPZi5jYWxsKCB0aGlzLFxuXG5cdFx0XHQvLyBJZiBpdCByZWNlaXZlcyBhIGpRdWVyeSBvYmplY3QsIHRoZSBmaXJzdCBlbGVtZW50IGlzIHVzZWRcblx0XHRcdGVsZW0uanF1ZXJ5ID8gZWxlbVsgMCBdIDogZWxlbVxuXHRcdCk7XG5cdH0sXG5cblx0YWRkOiBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQgKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKFxuXHRcdFx0alF1ZXJ5LnVuaXF1ZVNvcnQoXG5cdFx0XHRcdGpRdWVyeS5tZXJnZSggdGhpcy5nZXQoKSwgalF1ZXJ5KCBzZWxlY3RvciwgY29udGV4dCApIClcblx0XHRcdClcblx0XHQpO1xuXHR9LFxuXG5cdGFkZEJhY2s6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gdGhpcy5hZGQoIHNlbGVjdG9yID09IG51bGwgP1xuXHRcdFx0dGhpcy5wcmV2T2JqZWN0IDogdGhpcy5wcmV2T2JqZWN0LmZpbHRlciggc2VsZWN0b3IgKVxuXHRcdCk7XG5cdH1cbn0gKTtcblxuZnVuY3Rpb24gc2libGluZyggY3VyLCBkaXIgKSB7XG5cdHdoaWxlICggKCBjdXIgPSBjdXJbIGRpciBdICkgJiYgY3VyLm5vZGVUeXBlICE9PSAxICkge31cblx0cmV0dXJuIGN1cjtcbn1cblxualF1ZXJ5LmVhY2goIHtcblx0cGFyZW50OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHR2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xuXHRcdHJldHVybiBwYXJlbnQgJiYgcGFyZW50Lm5vZGVUeXBlICE9PSAxMSA/IHBhcmVudCA6IG51bGw7XG5cdH0sXG5cdHBhcmVudHM6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBkaXIoIGVsZW0sIFwicGFyZW50Tm9kZVwiICk7XG5cdH0sXG5cdHBhcmVudHNVbnRpbDogZnVuY3Rpb24oIGVsZW0sIGksIHVudGlsICkge1xuXHRcdHJldHVybiBkaXIoIGVsZW0sIFwicGFyZW50Tm9kZVwiLCB1bnRpbCApO1xuXHR9LFxuXHRuZXh0OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gc2libGluZyggZWxlbSwgXCJuZXh0U2libGluZ1wiICk7XG5cdH0sXG5cdHByZXY6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBzaWJsaW5nKCBlbGVtLCBcInByZXZpb3VzU2libGluZ1wiICk7XG5cdH0sXG5cdG5leHRBbGw6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBkaXIoIGVsZW0sIFwibmV4dFNpYmxpbmdcIiApO1xuXHR9LFxuXHRwcmV2QWxsOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcInByZXZpb3VzU2libGluZ1wiICk7XG5cdH0sXG5cdG5leHRVbnRpbDogZnVuY3Rpb24oIGVsZW0sIGksIHVudGlsICkge1xuXHRcdHJldHVybiBkaXIoIGVsZW0sIFwibmV4dFNpYmxpbmdcIiwgdW50aWwgKTtcblx0fSxcblx0cHJldlVudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJwcmV2aW91c1NpYmxpbmdcIiwgdW50aWwgKTtcblx0fSxcblx0c2libGluZ3M6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBzaWJsaW5ncyggKCBlbGVtLnBhcmVudE5vZGUgfHwge30gKS5maXJzdENoaWxkLCBlbGVtICk7XG5cdH0sXG5cdGNoaWxkcmVuOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gc2libGluZ3MoIGVsZW0uZmlyc3RDaGlsZCApO1xuXHR9LFxuXHRjb250ZW50czogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgIGlmICggbm9kZU5hbWUoIGVsZW0sIFwiaWZyYW1lXCIgKSApIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtLmNvbnRlbnREb2N1bWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN1cHBvcnQ6IElFIDkgLSAxMSBvbmx5LCBpT1MgNyBvbmx5LCBBbmRyb2lkIEJyb3dzZXIgPD00LjMgb25seVxuICAgICAgICAvLyBUcmVhdCB0aGUgdGVtcGxhdGUgZWxlbWVudCBhcyBhIHJlZ3VsYXIgb25lIGluIGJyb3dzZXJzIHRoYXRcbiAgICAgICAgLy8gZG9uJ3Qgc3VwcG9ydCBpdC5cbiAgICAgICAgaWYgKCBub2RlTmFtZSggZWxlbSwgXCJ0ZW1wbGF0ZVwiICkgKSB7XG4gICAgICAgICAgICBlbGVtID0gZWxlbS5jb250ZW50IHx8IGVsZW07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4galF1ZXJ5Lm1lcmdlKCBbXSwgZWxlbS5jaGlsZE5vZGVzICk7XG5cdH1cbn0sIGZ1bmN0aW9uKCBuYW1lLCBmbiApIHtcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggdW50aWwsIHNlbGVjdG9yICkge1xuXHRcdHZhciBtYXRjaGVkID0galF1ZXJ5Lm1hcCggdGhpcywgZm4sIHVudGlsICk7XG5cblx0XHRpZiAoIG5hbWUuc2xpY2UoIC01ICkgIT09IFwiVW50aWxcIiApIHtcblx0XHRcdHNlbGVjdG9yID0gdW50aWw7XG5cdFx0fVxuXG5cdFx0aWYgKCBzZWxlY3RvciAmJiB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRtYXRjaGVkID0galF1ZXJ5LmZpbHRlciggc2VsZWN0b3IsIG1hdGNoZWQgKTtcblx0XHR9XG5cblx0XHRpZiAoIHRoaXMubGVuZ3RoID4gMSApIHtcblxuXHRcdFx0Ly8gUmVtb3ZlIGR1cGxpY2F0ZXNcblx0XHRcdGlmICggIWd1YXJhbnRlZWRVbmlxdWVbIG5hbWUgXSApIHtcblx0XHRcdFx0alF1ZXJ5LnVuaXF1ZVNvcnQoIG1hdGNoZWQgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmV2ZXJzZSBvcmRlciBmb3IgcGFyZW50cyogYW5kIHByZXYtZGVyaXZhdGl2ZXNcblx0XHRcdGlmICggcnBhcmVudHNwcmV2LnRlc3QoIG5hbWUgKSApIHtcblx0XHRcdFx0bWF0Y2hlZC5yZXZlcnNlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBtYXRjaGVkICk7XG5cdH07XG59ICk7XG52YXIgcm5vdGh0bWx3aGl0ZSA9ICggL1teXFx4MjBcXHRcXHJcXG5cXGZdKy9nICk7XG5cblxuXG4vLyBDb252ZXJ0IFN0cmluZy1mb3JtYXR0ZWQgb3B0aW9ucyBpbnRvIE9iamVjdC1mb3JtYXR0ZWQgb25lc1xuZnVuY3Rpb24gY3JlYXRlT3B0aW9ucyggb3B0aW9ucyApIHtcblx0dmFyIG9iamVjdCA9IHt9O1xuXHRqUXVlcnkuZWFjaCggb3B0aW9ucy5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdLCBmdW5jdGlvbiggXywgZmxhZyApIHtcblx0XHRvYmplY3RbIGZsYWcgXSA9IHRydWU7XG5cdH0gKTtcblx0cmV0dXJuIG9iamVjdDtcbn1cblxuLypcbiAqIENyZWF0ZSBhIGNhbGxiYWNrIGxpc3QgdXNpbmcgdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxuICpcbiAqXHRvcHRpb25zOiBhbiBvcHRpb25hbCBsaXN0IG9mIHNwYWNlLXNlcGFyYXRlZCBvcHRpb25zIHRoYXQgd2lsbCBjaGFuZ2UgaG93XG4gKlx0XHRcdHRoZSBjYWxsYmFjayBsaXN0IGJlaGF2ZXMgb3IgYSBtb3JlIHRyYWRpdGlvbmFsIG9wdGlvbiBvYmplY3RcbiAqXG4gKiBCeSBkZWZhdWx0IGEgY2FsbGJhY2sgbGlzdCB3aWxsIGFjdCBsaWtlIGFuIGV2ZW50IGNhbGxiYWNrIGxpc3QgYW5kIGNhbiBiZVxuICogXCJmaXJlZFwiIG11bHRpcGxlIHRpbWVzLlxuICpcbiAqIFBvc3NpYmxlIG9wdGlvbnM6XG4gKlxuICpcdG9uY2U6XHRcdFx0d2lsbCBlbnN1cmUgdGhlIGNhbGxiYWNrIGxpc3QgY2FuIG9ubHkgYmUgZmlyZWQgb25jZSAobGlrZSBhIERlZmVycmVkKVxuICpcbiAqXHRtZW1vcnk6XHRcdFx0d2lsbCBrZWVwIHRyYWNrIG9mIHByZXZpb3VzIHZhbHVlcyBhbmQgd2lsbCBjYWxsIGFueSBjYWxsYmFjayBhZGRlZFxuICpcdFx0XHRcdFx0YWZ0ZXIgdGhlIGxpc3QgaGFzIGJlZW4gZmlyZWQgcmlnaHQgYXdheSB3aXRoIHRoZSBsYXRlc3QgXCJtZW1vcml6ZWRcIlxuICpcdFx0XHRcdFx0dmFsdWVzIChsaWtlIGEgRGVmZXJyZWQpXG4gKlxuICpcdHVuaXF1ZTpcdFx0XHR3aWxsIGVuc3VyZSBhIGNhbGxiYWNrIGNhbiBvbmx5IGJlIGFkZGVkIG9uY2UgKG5vIGR1cGxpY2F0ZSBpbiB0aGUgbGlzdClcbiAqXG4gKlx0c3RvcE9uRmFsc2U6XHRpbnRlcnJ1cHQgY2FsbGluZ3Mgd2hlbiBhIGNhbGxiYWNrIHJldHVybnMgZmFsc2VcbiAqXG4gKi9cbmpRdWVyeS5DYWxsYmFja3MgPSBmdW5jdGlvbiggb3B0aW9ucyApIHtcblxuXHQvLyBDb252ZXJ0IG9wdGlvbnMgZnJvbSBTdHJpbmctZm9ybWF0dGVkIHRvIE9iamVjdC1mb3JtYXR0ZWQgaWYgbmVlZGVkXG5cdC8vICh3ZSBjaGVjayBpbiBjYWNoZSBmaXJzdClcblx0b3B0aW9ucyA9IHR5cGVvZiBvcHRpb25zID09PSBcInN0cmluZ1wiID9cblx0XHRjcmVhdGVPcHRpb25zKCBvcHRpb25zICkgOlxuXHRcdGpRdWVyeS5leHRlbmQoIHt9LCBvcHRpb25zICk7XG5cblx0dmFyIC8vIEZsYWcgdG8ga25vdyBpZiBsaXN0IGlzIGN1cnJlbnRseSBmaXJpbmdcblx0XHRmaXJpbmcsXG5cblx0XHQvLyBMYXN0IGZpcmUgdmFsdWUgZm9yIG5vbi1mb3JnZXR0YWJsZSBsaXN0c1xuXHRcdG1lbW9yeSxcblxuXHRcdC8vIEZsYWcgdG8ga25vdyBpZiBsaXN0IHdhcyBhbHJlYWR5IGZpcmVkXG5cdFx0ZmlyZWQsXG5cblx0XHQvLyBGbGFnIHRvIHByZXZlbnQgZmlyaW5nXG5cdFx0bG9ja2VkLFxuXG5cdFx0Ly8gQWN0dWFsIGNhbGxiYWNrIGxpc3Rcblx0XHRsaXN0ID0gW10sXG5cblx0XHQvLyBRdWV1ZSBvZiBleGVjdXRpb24gZGF0YSBmb3IgcmVwZWF0YWJsZSBsaXN0c1xuXHRcdHF1ZXVlID0gW10sXG5cblx0XHQvLyBJbmRleCBvZiBjdXJyZW50bHkgZmlyaW5nIGNhbGxiYWNrIChtb2RpZmllZCBieSBhZGQvcmVtb3ZlIGFzIG5lZWRlZClcblx0XHRmaXJpbmdJbmRleCA9IC0xLFxuXG5cdFx0Ly8gRmlyZSBjYWxsYmFja3Ncblx0XHRmaXJlID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIEVuZm9yY2Ugc2luZ2xlLWZpcmluZ1xuXHRcdFx0bG9ja2VkID0gbG9ja2VkIHx8IG9wdGlvbnMub25jZTtcblxuXHRcdFx0Ly8gRXhlY3V0ZSBjYWxsYmFja3MgZm9yIGFsbCBwZW5kaW5nIGV4ZWN1dGlvbnMsXG5cdFx0XHQvLyByZXNwZWN0aW5nIGZpcmluZ0luZGV4IG92ZXJyaWRlcyBhbmQgcnVudGltZSBjaGFuZ2VzXG5cdFx0XHRmaXJlZCA9IGZpcmluZyA9IHRydWU7XG5cdFx0XHRmb3IgKCA7IHF1ZXVlLmxlbmd0aDsgZmlyaW5nSW5kZXggPSAtMSApIHtcblx0XHRcdFx0bWVtb3J5ID0gcXVldWUuc2hpZnQoKTtcblx0XHRcdFx0d2hpbGUgKCArK2ZpcmluZ0luZGV4IDwgbGlzdC5sZW5ndGggKSB7XG5cblx0XHRcdFx0XHQvLyBSdW4gY2FsbGJhY2sgYW5kIGNoZWNrIGZvciBlYXJseSB0ZXJtaW5hdGlvblxuXHRcdFx0XHRcdGlmICggbGlzdFsgZmlyaW5nSW5kZXggXS5hcHBseSggbWVtb3J5WyAwIF0sIG1lbW9yeVsgMSBdICkgPT09IGZhbHNlICYmXG5cdFx0XHRcdFx0XHRvcHRpb25zLnN0b3BPbkZhbHNlICkge1xuXG5cdFx0XHRcdFx0XHQvLyBKdW1wIHRvIGVuZCBhbmQgZm9yZ2V0IHRoZSBkYXRhIHNvIC5hZGQgZG9lc24ndCByZS1maXJlXG5cdFx0XHRcdFx0XHRmaXJpbmdJbmRleCA9IGxpc3QubGVuZ3RoO1xuXHRcdFx0XHRcdFx0bWVtb3J5ID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZvcmdldCB0aGUgZGF0YSBpZiB3ZSdyZSBkb25lIHdpdGggaXRcblx0XHRcdGlmICggIW9wdGlvbnMubWVtb3J5ICkge1xuXHRcdFx0XHRtZW1vcnkgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0ZmlyaW5nID0gZmFsc2U7XG5cblx0XHRcdC8vIENsZWFuIHVwIGlmIHdlJ3JlIGRvbmUgZmlyaW5nIGZvciBnb29kXG5cdFx0XHRpZiAoIGxvY2tlZCApIHtcblxuXHRcdFx0XHQvLyBLZWVwIGFuIGVtcHR5IGxpc3QgaWYgd2UgaGF2ZSBkYXRhIGZvciBmdXR1cmUgYWRkIGNhbGxzXG5cdFx0XHRcdGlmICggbWVtb3J5ICkge1xuXHRcdFx0XHRcdGxpc3QgPSBbXTtcblxuXHRcdFx0XHQvLyBPdGhlcndpc2UsIHRoaXMgb2JqZWN0IGlzIHNwZW50XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bGlzdCA9IFwiXCI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gQWN0dWFsIENhbGxiYWNrcyBvYmplY3Rcblx0XHRzZWxmID0ge1xuXG5cdFx0XHQvLyBBZGQgYSBjYWxsYmFjayBvciBhIGNvbGxlY3Rpb24gb2YgY2FsbGJhY2tzIHRvIHRoZSBsaXN0XG5cdFx0XHRhZGQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIGxpc3QgKSB7XG5cblx0XHRcdFx0XHQvLyBJZiB3ZSBoYXZlIG1lbW9yeSBmcm9tIGEgcGFzdCBydW4sIHdlIHNob3VsZCBmaXJlIGFmdGVyIGFkZGluZ1xuXHRcdFx0XHRcdGlmICggbWVtb3J5ICYmICFmaXJpbmcgKSB7XG5cdFx0XHRcdFx0XHRmaXJpbmdJbmRleCA9IGxpc3QubGVuZ3RoIC0gMTtcblx0XHRcdFx0XHRcdHF1ZXVlLnB1c2goIG1lbW9yeSApO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdCggZnVuY3Rpb24gYWRkKCBhcmdzICkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5LmVhY2goIGFyZ3MsIGZ1bmN0aW9uKCBfLCBhcmcgKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGFyZyApICkge1xuXHRcdFx0XHRcdFx0XHRcdGlmICggIW9wdGlvbnMudW5pcXVlIHx8ICFzZWxmLmhhcyggYXJnICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRsaXN0LnB1c2goIGFyZyApO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICggYXJnICYmIGFyZy5sZW5ndGggJiYgalF1ZXJ5LnR5cGUoIGFyZyApICE9PSBcInN0cmluZ1wiICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gSW5zcGVjdCByZWN1cnNpdmVseVxuXHRcdFx0XHRcdFx0XHRcdGFkZCggYXJnICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHR9ICkoIGFyZ3VtZW50cyApO1xuXG5cdFx0XHRcdFx0aWYgKCBtZW1vcnkgJiYgIWZpcmluZyApIHtcblx0XHRcdFx0XHRcdGZpcmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBSZW1vdmUgYSBjYWxsYmFjayBmcm9tIHRoZSBsaXN0XG5cdFx0XHRyZW1vdmU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRqUXVlcnkuZWFjaCggYXJndW1lbnRzLCBmdW5jdGlvbiggXywgYXJnICkge1xuXHRcdFx0XHRcdHZhciBpbmRleDtcblx0XHRcdFx0XHR3aGlsZSAoICggaW5kZXggPSBqUXVlcnkuaW5BcnJheSggYXJnLCBsaXN0LCBpbmRleCApICkgPiAtMSApIHtcblx0XHRcdFx0XHRcdGxpc3Quc3BsaWNlKCBpbmRleCwgMSApO1xuXG5cdFx0XHRcdFx0XHQvLyBIYW5kbGUgZmlyaW5nIGluZGV4ZXNcblx0XHRcdFx0XHRcdGlmICggaW5kZXggPD0gZmlyaW5nSW5kZXggKSB7XG5cdFx0XHRcdFx0XHRcdGZpcmluZ0luZGV4LS07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgYSBnaXZlbiBjYWxsYmFjayBpcyBpbiB0aGUgbGlzdC5cblx0XHRcdC8vIElmIG5vIGFyZ3VtZW50IGlzIGdpdmVuLCByZXR1cm4gd2hldGhlciBvciBub3QgbGlzdCBoYXMgY2FsbGJhY2tzIGF0dGFjaGVkLlxuXHRcdFx0aGFzOiBmdW5jdGlvbiggZm4gKSB7XG5cdFx0XHRcdHJldHVybiBmbiA/XG5cdFx0XHRcdFx0alF1ZXJ5LmluQXJyYXkoIGZuLCBsaXN0ICkgPiAtMSA6XG5cdFx0XHRcdFx0bGlzdC5sZW5ndGggPiAwO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gUmVtb3ZlIGFsbCBjYWxsYmFja3MgZnJvbSB0aGUgbGlzdFxuXHRcdFx0ZW1wdHk6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIGxpc3QgKSB7XG5cdFx0XHRcdFx0bGlzdCA9IFtdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gRGlzYWJsZSAuZmlyZSBhbmQgLmFkZFxuXHRcdFx0Ly8gQWJvcnQgYW55IGN1cnJlbnQvcGVuZGluZyBleGVjdXRpb25zXG5cdFx0XHQvLyBDbGVhciBhbGwgY2FsbGJhY2tzIGFuZCB2YWx1ZXNcblx0XHRcdGRpc2FibGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRsb2NrZWQgPSBxdWV1ZSA9IFtdO1xuXHRcdFx0XHRsaXN0ID0gbWVtb3J5ID0gXCJcIjtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0ZGlzYWJsZWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gIWxpc3Q7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBEaXNhYmxlIC5maXJlXG5cdFx0XHQvLyBBbHNvIGRpc2FibGUgLmFkZCB1bmxlc3Mgd2UgaGF2ZSBtZW1vcnkgKHNpbmNlIGl0IHdvdWxkIGhhdmUgbm8gZWZmZWN0KVxuXHRcdFx0Ly8gQWJvcnQgYW55IHBlbmRpbmcgZXhlY3V0aW9uc1xuXHRcdFx0bG9jazogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGxvY2tlZCA9IHF1ZXVlID0gW107XG5cdFx0XHRcdGlmICggIW1lbW9yeSAmJiAhZmlyaW5nICkge1xuXHRcdFx0XHRcdGxpc3QgPSBtZW1vcnkgPSBcIlwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblx0XHRcdGxvY2tlZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAhIWxvY2tlZDtcblx0XHRcdH0sXG5cblx0XHRcdC8vIENhbGwgYWxsIGNhbGxiYWNrcyB3aXRoIHRoZSBnaXZlbiBjb250ZXh0IGFuZCBhcmd1bWVudHNcblx0XHRcdGZpcmVXaXRoOiBmdW5jdGlvbiggY29udGV4dCwgYXJncyApIHtcblx0XHRcdFx0aWYgKCAhbG9ja2VkICkge1xuXHRcdFx0XHRcdGFyZ3MgPSBhcmdzIHx8IFtdO1xuXHRcdFx0XHRcdGFyZ3MgPSBbIGNvbnRleHQsIGFyZ3Muc2xpY2UgPyBhcmdzLnNsaWNlKCkgOiBhcmdzIF07XG5cdFx0XHRcdFx0cXVldWUucHVzaCggYXJncyApO1xuXHRcdFx0XHRcdGlmICggIWZpcmluZyApIHtcblx0XHRcdFx0XHRcdGZpcmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBDYWxsIGFsbCB0aGUgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGFyZ3VtZW50c1xuXHRcdFx0ZmlyZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYuZmlyZVdpdGgoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8vIFRvIGtub3cgaWYgdGhlIGNhbGxiYWNrcyBoYXZlIGFscmVhZHkgYmVlbiBjYWxsZWQgYXQgbGVhc3Qgb25jZVxuXHRcdFx0ZmlyZWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gISFmaXJlZDtcblx0XHRcdH1cblx0XHR9O1xuXG5cdHJldHVybiBzZWxmO1xufTtcblxuXG5mdW5jdGlvbiBJZGVudGl0eSggdiApIHtcblx0cmV0dXJuIHY7XG59XG5mdW5jdGlvbiBUaHJvd2VyKCBleCApIHtcblx0dGhyb3cgZXg7XG59XG5cbmZ1bmN0aW9uIGFkb3B0VmFsdWUoIHZhbHVlLCByZXNvbHZlLCByZWplY3QsIG5vVmFsdWUgKSB7XG5cdHZhciBtZXRob2Q7XG5cblx0dHJ5IHtcblxuXHRcdC8vIENoZWNrIGZvciBwcm9taXNlIGFzcGVjdCBmaXJzdCB0byBwcml2aWxlZ2Ugc3luY2hyb25vdXMgYmVoYXZpb3Jcblx0XHRpZiAoIHZhbHVlICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCAoIG1ldGhvZCA9IHZhbHVlLnByb21pc2UgKSApICkge1xuXHRcdFx0bWV0aG9kLmNhbGwoIHZhbHVlICkuZG9uZSggcmVzb2x2ZSApLmZhaWwoIHJlamVjdCApO1xuXG5cdFx0Ly8gT3RoZXIgdGhlbmFibGVzXG5cdFx0fSBlbHNlIGlmICggdmFsdWUgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oICggbWV0aG9kID0gdmFsdWUudGhlbiApICkgKSB7XG5cdFx0XHRtZXRob2QuY2FsbCggdmFsdWUsIHJlc29sdmUsIHJlamVjdCApO1xuXG5cdFx0Ly8gT3RoZXIgbm9uLXRoZW5hYmxlc1xuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIENvbnRyb2wgYHJlc29sdmVgIGFyZ3VtZW50cyBieSBsZXR0aW5nIEFycmF5I3NsaWNlIGNhc3QgYm9vbGVhbiBgbm9WYWx1ZWAgdG8gaW50ZWdlcjpcblx0XHRcdC8vICogZmFsc2U6IFsgdmFsdWUgXS5zbGljZSggMCApID0+IHJlc29sdmUoIHZhbHVlIClcblx0XHRcdC8vICogdHJ1ZTogWyB2YWx1ZSBdLnNsaWNlKCAxICkgPT4gcmVzb2x2ZSgpXG5cdFx0XHRyZXNvbHZlLmFwcGx5KCB1bmRlZmluZWQsIFsgdmFsdWUgXS5zbGljZSggbm9WYWx1ZSApICk7XG5cdFx0fVxuXG5cdC8vIEZvciBQcm9taXNlcy9BKywgY29udmVydCBleGNlcHRpb25zIGludG8gcmVqZWN0aW9uc1xuXHQvLyBTaW5jZSBqUXVlcnkud2hlbiBkb2Vzbid0IHVud3JhcCB0aGVuYWJsZXMsIHdlIGNhbiBza2lwIHRoZSBleHRyYSBjaGVja3MgYXBwZWFyaW5nIGluXG5cdC8vIERlZmVycmVkI3RoZW4gdG8gY29uZGl0aW9uYWxseSBzdXBwcmVzcyByZWplY3Rpb24uXG5cdH0gY2F0Y2ggKCB2YWx1ZSApIHtcblxuXHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgNC4wIG9ubHlcblx0XHQvLyBTdHJpY3QgbW9kZSBmdW5jdGlvbnMgaW52b2tlZCB3aXRob3V0IC5jYWxsLy5hcHBseSBnZXQgZ2xvYmFsLW9iamVjdCBjb250ZXh0XG5cdFx0cmVqZWN0LmFwcGx5KCB1bmRlZmluZWQsIFsgdmFsdWUgXSApO1xuXHR9XG59XG5cbmpRdWVyeS5leHRlbmQoIHtcblxuXHREZWZlcnJlZDogZnVuY3Rpb24oIGZ1bmMgKSB7XG5cdFx0dmFyIHR1cGxlcyA9IFtcblxuXHRcdFx0XHQvLyBhY3Rpb24sIGFkZCBsaXN0ZW5lciwgY2FsbGJhY2tzLFxuXHRcdFx0XHQvLyAuLi4gLnRoZW4gaGFuZGxlcnMsIGFyZ3VtZW50IGluZGV4LCBbZmluYWwgc3RhdGVdXG5cdFx0XHRcdFsgXCJub3RpZnlcIiwgXCJwcm9ncmVzc1wiLCBqUXVlcnkuQ2FsbGJhY2tzKCBcIm1lbW9yeVwiICksXG5cdFx0XHRcdFx0alF1ZXJ5LkNhbGxiYWNrcyggXCJtZW1vcnlcIiApLCAyIF0sXG5cdFx0XHRcdFsgXCJyZXNvbHZlXCIsIFwiZG9uZVwiLCBqUXVlcnkuQ2FsbGJhY2tzKCBcIm9uY2UgbWVtb3J5XCIgKSxcblx0XHRcdFx0XHRqUXVlcnkuQ2FsbGJhY2tzKCBcIm9uY2UgbWVtb3J5XCIgKSwgMCwgXCJyZXNvbHZlZFwiIF0sXG5cdFx0XHRcdFsgXCJyZWplY3RcIiwgXCJmYWlsXCIsIGpRdWVyeS5DYWxsYmFja3MoIFwib25jZSBtZW1vcnlcIiApLFxuXHRcdFx0XHRcdGpRdWVyeS5DYWxsYmFja3MoIFwib25jZSBtZW1vcnlcIiApLCAxLCBcInJlamVjdGVkXCIgXVxuXHRcdFx0XSxcblx0XHRcdHN0YXRlID0gXCJwZW5kaW5nXCIsXG5cdFx0XHRwcm9taXNlID0ge1xuXHRcdFx0XHRzdGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRhbHdheXM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGRlZmVycmVkLmRvbmUoIGFyZ3VtZW50cyApLmZhaWwoIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImNhdGNoXCI6IGZ1bmN0aW9uKCBmbiApIHtcblx0XHRcdFx0XHRyZXR1cm4gcHJvbWlzZS50aGVuKCBudWxsLCBmbiApO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIEtlZXAgcGlwZSBmb3IgYmFjay1jb21wYXRcblx0XHRcdFx0cGlwZTogZnVuY3Rpb24oIC8qIGZuRG9uZSwgZm5GYWlsLCBmblByb2dyZXNzICovICkge1xuXHRcdFx0XHRcdHZhciBmbnMgPSBhcmd1bWVudHM7XG5cblx0XHRcdFx0XHRyZXR1cm4galF1ZXJ5LkRlZmVycmVkKCBmdW5jdGlvbiggbmV3RGVmZXIgKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkuZWFjaCggdHVwbGVzLCBmdW5jdGlvbiggaSwgdHVwbGUgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gTWFwIHR1cGxlcyAocHJvZ3Jlc3MsIGRvbmUsIGZhaWwpIHRvIGFyZ3VtZW50cyAoZG9uZSwgZmFpbCwgcHJvZ3Jlc3MpXG5cdFx0XHRcdFx0XHRcdHZhciBmbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKCBmbnNbIHR1cGxlWyA0IF0gXSApICYmIGZuc1sgdHVwbGVbIDQgXSBdO1xuXG5cdFx0XHRcdFx0XHRcdC8vIGRlZmVycmVkLnByb2dyZXNzKGZ1bmN0aW9uKCkgeyBiaW5kIHRvIG5ld0RlZmVyIG9yIG5ld0RlZmVyLm5vdGlmeSB9KVxuXHRcdFx0XHRcdFx0XHQvLyBkZWZlcnJlZC5kb25lKGZ1bmN0aW9uKCkgeyBiaW5kIHRvIG5ld0RlZmVyIG9yIG5ld0RlZmVyLnJlc29sdmUgfSlcblx0XHRcdFx0XHRcdFx0Ly8gZGVmZXJyZWQuZmFpbChmdW5jdGlvbigpIHsgYmluZCB0byBuZXdEZWZlciBvciBuZXdEZWZlci5yZWplY3QgfSlcblx0XHRcdFx0XHRcdFx0ZGVmZXJyZWRbIHR1cGxlWyAxIF0gXSggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHJldHVybmVkID0gZm4gJiYgZm4uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRcdFx0XHRcdGlmICggcmV0dXJuZWQgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIHJldHVybmVkLnByb21pc2UgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybmVkLnByb21pc2UoKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQucHJvZ3Jlc3MoIG5ld0RlZmVyLm5vdGlmeSApXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5kb25lKCBuZXdEZWZlci5yZXNvbHZlIClcblx0XHRcdFx0XHRcdFx0XHRcdFx0LmZhaWwoIG5ld0RlZmVyLnJlamVjdCApO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRuZXdEZWZlclsgdHVwbGVbIDAgXSArIFwiV2l0aFwiIF0oXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZuID8gWyByZXR1cm5lZCBdIDogYXJndW1lbnRzXG5cdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdFx0Zm5zID0gbnVsbDtcblx0XHRcdFx0XHR9ICkucHJvbWlzZSgpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR0aGVuOiBmdW5jdGlvbiggb25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIG9uUHJvZ3Jlc3MgKSB7XG5cdFx0XHRcdFx0dmFyIG1heERlcHRoID0gMDtcblx0XHRcdFx0XHRmdW5jdGlvbiByZXNvbHZlKCBkZXB0aCwgZGVmZXJyZWQsIGhhbmRsZXIsIHNwZWNpYWwgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdHZhciB0aGF0ID0gdGhpcyxcblx0XHRcdFx0XHRcdFx0XHRhcmdzID0gYXJndW1lbnRzLFxuXHRcdFx0XHRcdFx0XHRcdG1pZ2h0VGhyb3cgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHZhciByZXR1cm5lZCwgdGhlbjtcblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogUHJvbWlzZXMvQSsgc2VjdGlvbiAyLjMuMy4zLjNcblx0XHRcdFx0XHRcdFx0XHRcdC8vIGh0dHBzOi8vcHJvbWlzZXNhcGx1cy5jb20vI3BvaW50LTU5XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBJZ25vcmUgZG91YmxlLXJlc29sdXRpb24gYXR0ZW1wdHNcblx0XHRcdFx0XHRcdFx0XHRcdGlmICggZGVwdGggPCBtYXhEZXB0aCApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm5lZCA9IGhhbmRsZXIuYXBwbHkoIHRoYXQsIGFyZ3MgKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogUHJvbWlzZXMvQSsgc2VjdGlvbiAyLjMuMVxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gaHR0cHM6Ly9wcm9taXNlc2FwbHVzLmNvbS8jcG9pbnQtNDhcblx0XHRcdFx0XHRcdFx0XHRcdGlmICggcmV0dXJuZWQgPT09IGRlZmVycmVkLnByb21pc2UoKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggXCJUaGVuYWJsZSBzZWxmLXJlc29sdXRpb25cIiApO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBQcm9taXNlcy9BKyBzZWN0aW9ucyAyLjMuMy4xLCAzLjVcblx0XHRcdFx0XHRcdFx0XHRcdC8vIGh0dHBzOi8vcHJvbWlzZXNhcGx1cy5jb20vI3BvaW50LTU0XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBodHRwczovL3Byb21pc2VzYXBsdXMuY29tLyNwb2ludC03NVxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gUmV0cmlldmUgYHRoZW5gIG9ubHkgb25jZVxuXHRcdFx0XHRcdFx0XHRcdFx0dGhlbiA9IHJldHVybmVkICYmXG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogUHJvbWlzZXMvQSsgc2VjdGlvbiAyLjMuNFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBodHRwczovL3Byb21pc2VzYXBsdXMuY29tLyNwb2ludC02NFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBPbmx5IGNoZWNrIG9iamVjdHMgYW5kIGZ1bmN0aW9ucyBmb3IgdGhlbmFiaWxpdHlcblx0XHRcdFx0XHRcdFx0XHRcdFx0KCB0eXBlb2YgcmV0dXJuZWQgPT09IFwib2JqZWN0XCIgfHxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlb2YgcmV0dXJuZWQgPT09IFwiZnVuY3Rpb25cIiApICYmXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybmVkLnRoZW47XG5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIEhhbmRsZSBhIHJldHVybmVkIHRoZW5hYmxlXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB0aGVuICkgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3BlY2lhbCBwcm9jZXNzb3JzIChub3RpZnkpIGp1c3Qgd2FpdCBmb3IgcmVzb2x1dGlvblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIHNwZWNpYWwgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhlbi5jYWxsKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKCBtYXhEZXB0aCwgZGVmZXJyZWQsIElkZW50aXR5LCBzcGVjaWFsICksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKCBtYXhEZXB0aCwgZGVmZXJyZWQsIFRocm93ZXIsIHNwZWNpYWwgKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gTm9ybWFsIHByb2Nlc3NvcnMgKHJlc29sdmUpIGFsc28gaG9vayBpbnRvIHByb2dyZXNzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyAuLi5hbmQgZGlzcmVnYXJkIG9sZGVyIHJlc29sdXRpb24gdmFsdWVzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWF4RGVwdGgrKztcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoZW4uY2FsbChcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybmVkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSggbWF4RGVwdGgsIGRlZmVycmVkLCBJZGVudGl0eSwgc3BlY2lhbCApLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSggbWF4RGVwdGgsIGRlZmVycmVkLCBUaHJvd2VyLCBzcGVjaWFsICksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKCBtYXhEZXB0aCwgZGVmZXJyZWQsIElkZW50aXR5LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZWZlcnJlZC5ub3RpZnlXaXRoIClcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIEhhbmRsZSBhbGwgb3RoZXIgcmV0dXJuZWQgdmFsdWVzXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIE9ubHkgc3Vic3RpdHV0ZSBoYW5kbGVycyBwYXNzIG9uIGNvbnRleHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gYW5kIG11bHRpcGxlIHZhbHVlcyAobm9uLXNwZWMgYmVoYXZpb3IpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICggaGFuZGxlciAhPT0gSWRlbnRpdHkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhhdCA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRhcmdzID0gWyByZXR1cm5lZCBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gUHJvY2VzcyB0aGUgdmFsdWUocylcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gRGVmYXVsdCBwcm9jZXNzIGlzIHJlc29sdmVcblx0XHRcdFx0XHRcdFx0XHRcdFx0KCBzcGVjaWFsIHx8IGRlZmVycmVkLnJlc29sdmVXaXRoICkoIHRoYXQsIGFyZ3MgKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gT25seSBub3JtYWwgcHJvY2Vzc29ycyAocmVzb2x2ZSkgY2F0Y2ggYW5kIHJlamVjdCBleGNlcHRpb25zXG5cdFx0XHRcdFx0XHRcdFx0cHJvY2VzcyA9IHNwZWNpYWwgP1xuXHRcdFx0XHRcdFx0XHRcdFx0bWlnaHRUaHJvdyA6XG5cdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtaWdodFRocm93KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuRGVmZXJyZWQuZXhjZXB0aW9uSG9vayApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5EZWZlcnJlZC5leGNlcHRpb25Ib29rKCBlLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzLnN0YWNrVHJhY2UgKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBQcm9taXNlcy9BKyBzZWN0aW9uIDIuMy4zLjMuNC4xXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gaHR0cHM6Ly9wcm9taXNlc2FwbHVzLmNvbS8jcG9pbnQtNjFcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBJZ25vcmUgcG9zdC1yZXNvbHV0aW9uIGV4Y2VwdGlvbnNcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIGRlcHRoICsgMSA+PSBtYXhEZXB0aCApIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gT25seSBzdWJzdGl0dXRlIGhhbmRsZXJzIHBhc3Mgb24gY29udGV4dFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gYW5kIG11bHRpcGxlIHZhbHVlcyAobm9uLXNwZWMgYmVoYXZpb3IpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIGhhbmRsZXIgIT09IFRocm93ZXIgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoYXQgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGFyZ3MgPSBbIGUgXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0V2l0aCggdGhhdCwgYXJncyApO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBQcm9taXNlcy9BKyBzZWN0aW9uIDIuMy4zLjMuMVxuXHRcdFx0XHRcdFx0XHQvLyBodHRwczovL3Byb21pc2VzYXBsdXMuY29tLyNwb2ludC01N1xuXHRcdFx0XHRcdFx0XHQvLyBSZS1yZXNvbHZlIHByb21pc2VzIGltbWVkaWF0ZWx5IHRvIGRvZGdlIGZhbHNlIHJlamVjdGlvbiBmcm9tXG5cdFx0XHRcdFx0XHRcdC8vIHN1YnNlcXVlbnQgZXJyb3JzXG5cdFx0XHRcdFx0XHRcdGlmICggZGVwdGggKSB7XG5cdFx0XHRcdFx0XHRcdFx0cHJvY2VzcygpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gQ2FsbCBhbiBvcHRpb25hbCBob29rIHRvIHJlY29yZCB0aGUgc3RhY2ssIGluIGNhc2Ugb2YgZXhjZXB0aW9uXG5cdFx0XHRcdFx0XHRcdFx0Ly8gc2luY2UgaXQncyBvdGhlcndpc2UgbG9zdCB3aGVuIGV4ZWN1dGlvbiBnb2VzIGFzeW5jXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuRGVmZXJyZWQuZ2V0U3RhY2tIb29rICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cHJvY2Vzcy5zdGFja1RyYWNlID0galF1ZXJ5LkRlZmVycmVkLmdldFN0YWNrSG9vaygpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR3aW5kb3cuc2V0VGltZW91dCggcHJvY2VzcyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiBqUXVlcnkuRGVmZXJyZWQoIGZ1bmN0aW9uKCBuZXdEZWZlciApIHtcblxuXHRcdFx0XHRcdFx0Ly8gcHJvZ3Jlc3NfaGFuZGxlcnMuYWRkKCAuLi4gKVxuXHRcdFx0XHRcdFx0dHVwbGVzWyAwIF1bIDMgXS5hZGQoXG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoXG5cdFx0XHRcdFx0XHRcdFx0MCxcblx0XHRcdFx0XHRcdFx0XHRuZXdEZWZlcixcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuaXNGdW5jdGlvbiggb25Qcm9ncmVzcyApID9cblx0XHRcdFx0XHRcdFx0XHRcdG9uUHJvZ3Jlc3MgOlxuXHRcdFx0XHRcdFx0XHRcdFx0SWRlbnRpdHksXG5cdFx0XHRcdFx0XHRcdFx0bmV3RGVmZXIubm90aWZ5V2l0aFxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHQvLyBmdWxmaWxsZWRfaGFuZGxlcnMuYWRkKCAuLi4gKVxuXHRcdFx0XHRcdFx0dHVwbGVzWyAxIF1bIDMgXS5hZGQoXG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoXG5cdFx0XHRcdFx0XHRcdFx0MCxcblx0XHRcdFx0XHRcdFx0XHRuZXdEZWZlcixcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuaXNGdW5jdGlvbiggb25GdWxmaWxsZWQgKSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRvbkZ1bGZpbGxlZCA6XG5cdFx0XHRcdFx0XHRcdFx0XHRJZGVudGl0eVxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHQvLyByZWplY3RlZF9oYW5kbGVycy5hZGQoIC4uLiApXG5cdFx0XHRcdFx0XHR0dXBsZXNbIDIgXVsgMyBdLmFkZChcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZShcblx0XHRcdFx0XHRcdFx0XHQwLFxuXHRcdFx0XHRcdFx0XHRcdG5ld0RlZmVyLFxuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5pc0Z1bmN0aW9uKCBvblJlamVjdGVkICkgP1xuXHRcdFx0XHRcdFx0XHRcdFx0b25SZWplY3RlZCA6XG5cdFx0XHRcdFx0XHRcdFx0XHRUaHJvd2VyXG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSApLnByb21pc2UoKTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBHZXQgYSBwcm9taXNlIGZvciB0aGlzIGRlZmVycmVkXG5cdFx0XHRcdC8vIElmIG9iaiBpcyBwcm92aWRlZCwgdGhlIHByb21pc2UgYXNwZWN0IGlzIGFkZGVkIHRvIHRoZSBvYmplY3Rcblx0XHRcdFx0cHJvbWlzZTogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRcdFx0XHRyZXR1cm4gb2JqICE9IG51bGwgPyBqUXVlcnkuZXh0ZW5kKCBvYmosIHByb21pc2UgKSA6IHByb21pc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRkZWZlcnJlZCA9IHt9O1xuXG5cdFx0Ly8gQWRkIGxpc3Qtc3BlY2lmaWMgbWV0aG9kc1xuXHRcdGpRdWVyeS5lYWNoKCB0dXBsZXMsIGZ1bmN0aW9uKCBpLCB0dXBsZSApIHtcblx0XHRcdHZhciBsaXN0ID0gdHVwbGVbIDIgXSxcblx0XHRcdFx0c3RhdGVTdHJpbmcgPSB0dXBsZVsgNSBdO1xuXG5cdFx0XHQvLyBwcm9taXNlLnByb2dyZXNzID0gbGlzdC5hZGRcblx0XHRcdC8vIHByb21pc2UuZG9uZSA9IGxpc3QuYWRkXG5cdFx0XHQvLyBwcm9taXNlLmZhaWwgPSBsaXN0LmFkZFxuXHRcdFx0cHJvbWlzZVsgdHVwbGVbIDEgXSBdID0gbGlzdC5hZGQ7XG5cblx0XHRcdC8vIEhhbmRsZSBzdGF0ZVxuXHRcdFx0aWYgKCBzdGF0ZVN0cmluZyApIHtcblx0XHRcdFx0bGlzdC5hZGQoXG5cdFx0XHRcdFx0ZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdC8vIHN0YXRlID0gXCJyZXNvbHZlZFwiIChpLmUuLCBmdWxmaWxsZWQpXG5cdFx0XHRcdFx0XHQvLyBzdGF0ZSA9IFwicmVqZWN0ZWRcIlxuXHRcdFx0XHRcdFx0c3RhdGUgPSBzdGF0ZVN0cmluZztcblx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0Ly8gcmVqZWN0ZWRfY2FsbGJhY2tzLmRpc2FibGVcblx0XHRcdFx0XHQvLyBmdWxmaWxsZWRfY2FsbGJhY2tzLmRpc2FibGVcblx0XHRcdFx0XHR0dXBsZXNbIDMgLSBpIF1bIDIgXS5kaXNhYmxlLFxuXG5cdFx0XHRcdFx0Ly8gcHJvZ3Jlc3NfY2FsbGJhY2tzLmxvY2tcblx0XHRcdFx0XHR0dXBsZXNbIDAgXVsgMiBdLmxvY2tcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gcHJvZ3Jlc3NfaGFuZGxlcnMuZmlyZVxuXHRcdFx0Ly8gZnVsZmlsbGVkX2hhbmRsZXJzLmZpcmVcblx0XHRcdC8vIHJlamVjdGVkX2hhbmRsZXJzLmZpcmVcblx0XHRcdGxpc3QuYWRkKCB0dXBsZVsgMyBdLmZpcmUgKTtcblxuXHRcdFx0Ly8gZGVmZXJyZWQubm90aWZ5ID0gZnVuY3Rpb24oKSB7IGRlZmVycmVkLm5vdGlmeVdpdGgoLi4uKSB9XG5cdFx0XHQvLyBkZWZlcnJlZC5yZXNvbHZlID0gZnVuY3Rpb24oKSB7IGRlZmVycmVkLnJlc29sdmVXaXRoKC4uLikgfVxuXHRcdFx0Ly8gZGVmZXJyZWQucmVqZWN0ID0gZnVuY3Rpb24oKSB7IGRlZmVycmVkLnJlamVjdFdpdGgoLi4uKSB9XG5cdFx0XHRkZWZlcnJlZFsgdHVwbGVbIDAgXSBdID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGRlZmVycmVkWyB0dXBsZVsgMCBdICsgXCJXaXRoXCIgXSggdGhpcyA9PT0gZGVmZXJyZWQgPyB1bmRlZmluZWQgOiB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBkZWZlcnJlZC5ub3RpZnlXaXRoID0gbGlzdC5maXJlV2l0aFxuXHRcdFx0Ly8gZGVmZXJyZWQucmVzb2x2ZVdpdGggPSBsaXN0LmZpcmVXaXRoXG5cdFx0XHQvLyBkZWZlcnJlZC5yZWplY3RXaXRoID0gbGlzdC5maXJlV2l0aFxuXHRcdFx0ZGVmZXJyZWRbIHR1cGxlWyAwIF0gKyBcIldpdGhcIiBdID0gbGlzdC5maXJlV2l0aDtcblx0XHR9ICk7XG5cblx0XHQvLyBNYWtlIHRoZSBkZWZlcnJlZCBhIHByb21pc2Vcblx0XHRwcm9taXNlLnByb21pc2UoIGRlZmVycmVkICk7XG5cblx0XHQvLyBDYWxsIGdpdmVuIGZ1bmMgaWYgYW55XG5cdFx0aWYgKCBmdW5jICkge1xuXHRcdFx0ZnVuYy5jYWxsKCBkZWZlcnJlZCwgZGVmZXJyZWQgKTtcblx0XHR9XG5cblx0XHQvLyBBbGwgZG9uZSFcblx0XHRyZXR1cm4gZGVmZXJyZWQ7XG5cdH0sXG5cblx0Ly8gRGVmZXJyZWQgaGVscGVyXG5cdHdoZW46IGZ1bmN0aW9uKCBzaW5nbGVWYWx1ZSApIHtcblx0XHR2YXJcblxuXHRcdFx0Ly8gY291bnQgb2YgdW5jb21wbGV0ZWQgc3Vib3JkaW5hdGVzXG5cdFx0XHRyZW1haW5pbmcgPSBhcmd1bWVudHMubGVuZ3RoLFxuXG5cdFx0XHQvLyBjb3VudCBvZiB1bnByb2Nlc3NlZCBhcmd1bWVudHNcblx0XHRcdGkgPSByZW1haW5pbmcsXG5cblx0XHRcdC8vIHN1Ym9yZGluYXRlIGZ1bGZpbGxtZW50IGRhdGFcblx0XHRcdHJlc29sdmVDb250ZXh0cyA9IEFycmF5KCBpICksXG5cdFx0XHRyZXNvbHZlVmFsdWVzID0gc2xpY2UuY2FsbCggYXJndW1lbnRzICksXG5cblx0XHRcdC8vIHRoZSBtYXN0ZXIgRGVmZXJyZWRcblx0XHRcdG1hc3RlciA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuXG5cdFx0XHQvLyBzdWJvcmRpbmF0ZSBjYWxsYmFjayBmYWN0b3J5XG5cdFx0XHR1cGRhdGVGdW5jID0gZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZUNvbnRleHRzWyBpIF0gPSB0aGlzO1xuXHRcdFx0XHRcdHJlc29sdmVWYWx1ZXNbIGkgXSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gc2xpY2UuY2FsbCggYXJndW1lbnRzICkgOiB2YWx1ZTtcblx0XHRcdFx0XHRpZiAoICEoIC0tcmVtYWluaW5nICkgKSB7XG5cdFx0XHRcdFx0XHRtYXN0ZXIucmVzb2x2ZVdpdGgoIHJlc29sdmVDb250ZXh0cywgcmVzb2x2ZVZhbHVlcyApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH07XG5cblx0XHQvLyBTaW5nbGUtIGFuZCBlbXB0eSBhcmd1bWVudHMgYXJlIGFkb3B0ZWQgbGlrZSBQcm9taXNlLnJlc29sdmVcblx0XHRpZiAoIHJlbWFpbmluZyA8PSAxICkge1xuXHRcdFx0YWRvcHRWYWx1ZSggc2luZ2xlVmFsdWUsIG1hc3Rlci5kb25lKCB1cGRhdGVGdW5jKCBpICkgKS5yZXNvbHZlLCBtYXN0ZXIucmVqZWN0LFxuXHRcdFx0XHQhcmVtYWluaW5nICk7XG5cblx0XHRcdC8vIFVzZSAudGhlbigpIHRvIHVud3JhcCBzZWNvbmRhcnkgdGhlbmFibGVzIChjZi4gZ2gtMzAwMClcblx0XHRcdGlmICggbWFzdGVyLnN0YXRlKCkgPT09IFwicGVuZGluZ1wiIHx8XG5cdFx0XHRcdGpRdWVyeS5pc0Z1bmN0aW9uKCByZXNvbHZlVmFsdWVzWyBpIF0gJiYgcmVzb2x2ZVZhbHVlc1sgaSBdLnRoZW4gKSApIHtcblxuXHRcdFx0XHRyZXR1cm4gbWFzdGVyLnRoZW4oKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBNdWx0aXBsZSBhcmd1bWVudHMgYXJlIGFnZ3JlZ2F0ZWQgbGlrZSBQcm9taXNlLmFsbCBhcnJheSBlbGVtZW50c1xuXHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0YWRvcHRWYWx1ZSggcmVzb2x2ZVZhbHVlc1sgaSBdLCB1cGRhdGVGdW5jKCBpICksIG1hc3Rlci5yZWplY3QgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbWFzdGVyLnByb21pc2UoKTtcblx0fVxufSApO1xuXG5cbi8vIFRoZXNlIHVzdWFsbHkgaW5kaWNhdGUgYSBwcm9ncmFtbWVyIG1pc3Rha2UgZHVyaW5nIGRldmVsb3BtZW50LFxuLy8gd2FybiBhYm91dCB0aGVtIEFTQVAgcmF0aGVyIHRoYW4gc3dhbGxvd2luZyB0aGVtIGJ5IGRlZmF1bHQuXG52YXIgcmVycm9yTmFtZXMgPSAvXihFdmFsfEludGVybmFsfFJhbmdlfFJlZmVyZW5jZXxTeW50YXh8VHlwZXxVUkkpRXJyb3IkLztcblxualF1ZXJ5LkRlZmVycmVkLmV4Y2VwdGlvbkhvb2sgPSBmdW5jdGlvbiggZXJyb3IsIHN0YWNrICkge1xuXG5cdC8vIFN1cHBvcnQ6IElFIDggLSA5IG9ubHlcblx0Ly8gQ29uc29sZSBleGlzdHMgd2hlbiBkZXYgdG9vbHMgYXJlIG9wZW4sIHdoaWNoIGNhbiBoYXBwZW4gYXQgYW55IHRpbWVcblx0aWYgKCB3aW5kb3cuY29uc29sZSAmJiB3aW5kb3cuY29uc29sZS53YXJuICYmIGVycm9yICYmIHJlcnJvck5hbWVzLnRlc3QoIGVycm9yLm5hbWUgKSApIHtcblx0XHR3aW5kb3cuY29uc29sZS53YXJuKCBcImpRdWVyeS5EZWZlcnJlZCBleGNlcHRpb246IFwiICsgZXJyb3IubWVzc2FnZSwgZXJyb3Iuc3RhY2ssIHN0YWNrICk7XG5cdH1cbn07XG5cblxuXG5cbmpRdWVyeS5yZWFkeUV4Y2VwdGlvbiA9IGZ1bmN0aW9uKCBlcnJvciApIHtcblx0d2luZG93LnNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdHRocm93IGVycm9yO1xuXHR9ICk7XG59O1xuXG5cblxuXG4vLyBUaGUgZGVmZXJyZWQgdXNlZCBvbiBET00gcmVhZHlcbnZhciByZWFkeUxpc3QgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxualF1ZXJ5LmZuLnJlYWR5ID0gZnVuY3Rpb24oIGZuICkge1xuXG5cdHJlYWR5TGlzdFxuXHRcdC50aGVuKCBmbiApXG5cblx0XHQvLyBXcmFwIGpRdWVyeS5yZWFkeUV4Y2VwdGlvbiBpbiBhIGZ1bmN0aW9uIHNvIHRoYXQgdGhlIGxvb2t1cFxuXHRcdC8vIGhhcHBlbnMgYXQgdGhlIHRpbWUgb2YgZXJyb3IgaGFuZGxpbmcgaW5zdGVhZCBvZiBjYWxsYmFja1xuXHRcdC8vIHJlZ2lzdHJhdGlvbi5cblx0XHQuY2F0Y2goIGZ1bmN0aW9uKCBlcnJvciApIHtcblx0XHRcdGpRdWVyeS5yZWFkeUV4Y2VwdGlvbiggZXJyb3IgKTtcblx0XHR9ICk7XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cblx0Ly8gSXMgdGhlIERPTSByZWFkeSB0byBiZSB1c2VkPyBTZXQgdG8gdHJ1ZSBvbmNlIGl0IG9jY3Vycy5cblx0aXNSZWFkeTogZmFsc2UsXG5cblx0Ly8gQSBjb3VudGVyIHRvIHRyYWNrIGhvdyBtYW55IGl0ZW1zIHRvIHdhaXQgZm9yIGJlZm9yZVxuXHQvLyB0aGUgcmVhZHkgZXZlbnQgZmlyZXMuIFNlZSAjNjc4MVxuXHRyZWFkeVdhaXQ6IDEsXG5cblx0Ly8gSGFuZGxlIHdoZW4gdGhlIERPTSBpcyByZWFkeVxuXHRyZWFkeTogZnVuY3Rpb24oIHdhaXQgKSB7XG5cblx0XHQvLyBBYm9ydCBpZiB0aGVyZSBhcmUgcGVuZGluZyBob2xkcyBvciB3ZSdyZSBhbHJlYWR5IHJlYWR5XG5cdFx0aWYgKCB3YWl0ID09PSB0cnVlID8gLS1qUXVlcnkucmVhZHlXYWl0IDogalF1ZXJ5LmlzUmVhZHkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gUmVtZW1iZXIgdGhhdCB0aGUgRE9NIGlzIHJlYWR5XG5cdFx0alF1ZXJ5LmlzUmVhZHkgPSB0cnVlO1xuXG5cdFx0Ly8gSWYgYSBub3JtYWwgRE9NIFJlYWR5IGV2ZW50IGZpcmVkLCBkZWNyZW1lbnQsIGFuZCB3YWl0IGlmIG5lZWQgYmVcblx0XHRpZiAoIHdhaXQgIT09IHRydWUgJiYgLS1qUXVlcnkucmVhZHlXYWl0ID4gMCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGVyZSBhcmUgZnVuY3Rpb25zIGJvdW5kLCB0byBleGVjdXRlXG5cdFx0cmVhZHlMaXN0LnJlc29sdmVXaXRoKCBkb2N1bWVudCwgWyBqUXVlcnkgXSApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5yZWFkeS50aGVuID0gcmVhZHlMaXN0LnRoZW47XG5cbi8vIFRoZSByZWFkeSBldmVudCBoYW5kbGVyIGFuZCBzZWxmIGNsZWFudXAgbWV0aG9kXG5mdW5jdGlvbiBjb21wbGV0ZWQoKSB7XG5cdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwiRE9NQ29udGVudExvYWRlZFwiLCBjb21wbGV0ZWQgKTtcblx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwibG9hZFwiLCBjb21wbGV0ZWQgKTtcblx0alF1ZXJ5LnJlYWR5KCk7XG59XG5cbi8vIENhdGNoIGNhc2VzIHdoZXJlICQoZG9jdW1lbnQpLnJlYWR5KCkgaXMgY2FsbGVkXG4vLyBhZnRlciB0aGUgYnJvd3NlciBldmVudCBoYXMgYWxyZWFkeSBvY2N1cnJlZC5cbi8vIFN1cHBvcnQ6IElFIDw9OSAtIDEwIG9ubHlcbi8vIE9sZGVyIElFIHNvbWV0aW1lcyBzaWduYWxzIFwiaW50ZXJhY3RpdmVcIiB0b28gc29vblxuaWYgKCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgfHxcblx0KCBkb2N1bWVudC5yZWFkeVN0YXRlICE9PSBcImxvYWRpbmdcIiAmJiAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsICkgKSB7XG5cblx0Ly8gSGFuZGxlIGl0IGFzeW5jaHJvbm91c2x5IHRvIGFsbG93IHNjcmlwdHMgdGhlIG9wcG9ydHVuaXR5IHRvIGRlbGF5IHJlYWR5XG5cdHdpbmRvdy5zZXRUaW1lb3V0KCBqUXVlcnkucmVhZHkgKTtcblxufSBlbHNlIHtcblxuXHQvLyBVc2UgdGhlIGhhbmR5IGV2ZW50IGNhbGxiYWNrXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwiRE9NQ29udGVudExvYWRlZFwiLCBjb21wbGV0ZWQgKTtcblxuXHQvLyBBIGZhbGxiYWNrIHRvIHdpbmRvdy5vbmxvYWQsIHRoYXQgd2lsbCBhbHdheXMgd29ya1xuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggXCJsb2FkXCIsIGNvbXBsZXRlZCApO1xufVxuXG5cblxuXG4vLyBNdWx0aWZ1bmN0aW9uYWwgbWV0aG9kIHRvIGdldCBhbmQgc2V0IHZhbHVlcyBvZiBhIGNvbGxlY3Rpb25cbi8vIFRoZSB2YWx1ZS9zIGNhbiBvcHRpb25hbGx5IGJlIGV4ZWN1dGVkIGlmIGl0J3MgYSBmdW5jdGlvblxudmFyIGFjY2VzcyA9IGZ1bmN0aW9uKCBlbGVtcywgZm4sIGtleSwgdmFsdWUsIGNoYWluYWJsZSwgZW1wdHlHZXQsIHJhdyApIHtcblx0dmFyIGkgPSAwLFxuXHRcdGxlbiA9IGVsZW1zLmxlbmd0aCxcblx0XHRidWxrID0ga2V5ID09IG51bGw7XG5cblx0Ly8gU2V0cyBtYW55IHZhbHVlc1xuXHRpZiAoIGpRdWVyeS50eXBlKCBrZXkgKSA9PT0gXCJvYmplY3RcIiApIHtcblx0XHRjaGFpbmFibGUgPSB0cnVlO1xuXHRcdGZvciAoIGkgaW4ga2V5ICkge1xuXHRcdFx0YWNjZXNzKCBlbGVtcywgZm4sIGksIGtleVsgaSBdLCB0cnVlLCBlbXB0eUdldCwgcmF3ICk7XG5cdFx0fVxuXG5cdC8vIFNldHMgb25lIHZhbHVlXG5cdH0gZWxzZSBpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0Y2hhaW5hYmxlID0gdHJ1ZTtcblxuXHRcdGlmICggIWpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmF3ID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAoIGJ1bGsgKSB7XG5cblx0XHRcdC8vIEJ1bGsgb3BlcmF0aW9ucyBydW4gYWdhaW5zdCB0aGUgZW50aXJlIHNldFxuXHRcdFx0aWYgKCByYXcgKSB7XG5cdFx0XHRcdGZuLmNhbGwoIGVsZW1zLCB2YWx1ZSApO1xuXHRcdFx0XHRmbiA9IG51bGw7XG5cblx0XHRcdC8vIC4uLmV4Y2VwdCB3aGVuIGV4ZWN1dGluZyBmdW5jdGlvbiB2YWx1ZXNcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGJ1bGsgPSBmbjtcblx0XHRcdFx0Zm4gPSBmdW5jdGlvbiggZWxlbSwga2V5LCB2YWx1ZSApIHtcblx0XHRcdFx0XHRyZXR1cm4gYnVsay5jYWxsKCBqUXVlcnkoIGVsZW0gKSwgdmFsdWUgKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIGZuICkge1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRcdGZuKFxuXHRcdFx0XHRcdGVsZW1zWyBpIF0sIGtleSwgcmF3ID9cblx0XHRcdFx0XHR2YWx1ZSA6XG5cdFx0XHRcdFx0dmFsdWUuY2FsbCggZWxlbXNbIGkgXSwgaSwgZm4oIGVsZW1zWyBpIF0sIGtleSApIClcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZiAoIGNoYWluYWJsZSApIHtcblx0XHRyZXR1cm4gZWxlbXM7XG5cdH1cblxuXHQvLyBHZXRzXG5cdGlmICggYnVsayApIHtcblx0XHRyZXR1cm4gZm4uY2FsbCggZWxlbXMgKTtcblx0fVxuXG5cdHJldHVybiBsZW4gPyBmbiggZWxlbXNbIDAgXSwga2V5ICkgOiBlbXB0eUdldDtcbn07XG52YXIgYWNjZXB0RGF0YSA9IGZ1bmN0aW9uKCBvd25lciApIHtcblxuXHQvLyBBY2NlcHRzIG9ubHk6XG5cdC8vICAtIE5vZGVcblx0Ly8gICAgLSBOb2RlLkVMRU1FTlRfTk9ERVxuXHQvLyAgICAtIE5vZGUuRE9DVU1FTlRfTk9ERVxuXHQvLyAgLSBPYmplY3Rcblx0Ly8gICAgLSBBbnlcblx0cmV0dXJuIG93bmVyLm5vZGVUeXBlID09PSAxIHx8IG93bmVyLm5vZGVUeXBlID09PSA5IHx8ICEoICtvd25lci5ub2RlVHlwZSApO1xufTtcblxuXG5cblxuZnVuY3Rpb24gRGF0YSgpIHtcblx0dGhpcy5leHBhbmRvID0galF1ZXJ5LmV4cGFuZG8gKyBEYXRhLnVpZCsrO1xufVxuXG5EYXRhLnVpZCA9IDE7XG5cbkRhdGEucHJvdG90eXBlID0ge1xuXG5cdGNhY2hlOiBmdW5jdGlvbiggb3duZXIgKSB7XG5cblx0XHQvLyBDaGVjayBpZiB0aGUgb3duZXIgb2JqZWN0IGFscmVhZHkgaGFzIGEgY2FjaGVcblx0XHR2YXIgdmFsdWUgPSBvd25lclsgdGhpcy5leHBhbmRvIF07XG5cblx0XHQvLyBJZiBub3QsIGNyZWF0ZSBvbmVcblx0XHRpZiAoICF2YWx1ZSApIHtcblx0XHRcdHZhbHVlID0ge307XG5cblx0XHRcdC8vIFdlIGNhbiBhY2NlcHQgZGF0YSBmb3Igbm9uLWVsZW1lbnQgbm9kZXMgaW4gbW9kZXJuIGJyb3dzZXJzLFxuXHRcdFx0Ly8gYnV0IHdlIHNob3VsZCBub3QsIHNlZSAjODMzNS5cblx0XHRcdC8vIEFsd2F5cyByZXR1cm4gYW4gZW1wdHkgb2JqZWN0LlxuXHRcdFx0aWYgKCBhY2NlcHREYXRhKCBvd25lciApICkge1xuXG5cdFx0XHRcdC8vIElmIGl0IGlzIGEgbm9kZSB1bmxpa2VseSB0byBiZSBzdHJpbmdpZnktZWQgb3IgbG9vcGVkIG92ZXJcblx0XHRcdFx0Ly8gdXNlIHBsYWluIGFzc2lnbm1lbnRcblx0XHRcdFx0aWYgKCBvd25lci5ub2RlVHlwZSApIHtcblx0XHRcdFx0XHRvd25lclsgdGhpcy5leHBhbmRvIF0gPSB2YWx1ZTtcblxuXHRcdFx0XHQvLyBPdGhlcndpc2Ugc2VjdXJlIGl0IGluIGEgbm9uLWVudW1lcmFibGUgcHJvcGVydHlcblx0XHRcdFx0Ly8gY29uZmlndXJhYmxlIG11c3QgYmUgdHJ1ZSB0byBhbGxvdyB0aGUgcHJvcGVydHkgdG8gYmVcblx0XHRcdFx0Ly8gZGVsZXRlZCB3aGVuIGRhdGEgaXMgcmVtb3ZlZFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggb3duZXIsIHRoaXMuZXhwYW5kbywge1xuXHRcdFx0XHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlXG5cdFx0XHRcdFx0fSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9LFxuXHRzZXQ6IGZ1bmN0aW9uKCBvd25lciwgZGF0YSwgdmFsdWUgKSB7XG5cdFx0dmFyIHByb3AsXG5cdFx0XHRjYWNoZSA9IHRoaXMuY2FjaGUoIG93bmVyICk7XG5cblx0XHQvLyBIYW5kbGU6IFsgb3duZXIsIGtleSwgdmFsdWUgXSBhcmdzXG5cdFx0Ly8gQWx3YXlzIHVzZSBjYW1lbENhc2Uga2V5IChnaC0yMjU3KVxuXHRcdGlmICggdHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRjYWNoZVsgalF1ZXJ5LmNhbWVsQ2FzZSggZGF0YSApIF0gPSB2YWx1ZTtcblxuXHRcdC8vIEhhbmRsZTogWyBvd25lciwgeyBwcm9wZXJ0aWVzIH0gXSBhcmdzXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gQ29weSB0aGUgcHJvcGVydGllcyBvbmUtYnktb25lIHRvIHRoZSBjYWNoZSBvYmplY3Rcblx0XHRcdGZvciAoIHByb3AgaW4gZGF0YSApIHtcblx0XHRcdFx0Y2FjaGVbIGpRdWVyeS5jYW1lbENhc2UoIHByb3AgKSBdID0gZGF0YVsgcHJvcCBdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gY2FjaGU7XG5cdH0sXG5cdGdldDogZnVuY3Rpb24oIG93bmVyLCBrZXkgKSB7XG5cdFx0cmV0dXJuIGtleSA9PT0gdW5kZWZpbmVkID9cblx0XHRcdHRoaXMuY2FjaGUoIG93bmVyICkgOlxuXG5cdFx0XHQvLyBBbHdheXMgdXNlIGNhbWVsQ2FzZSBrZXkgKGdoLTIyNTcpXG5cdFx0XHRvd25lclsgdGhpcy5leHBhbmRvIF0gJiYgb3duZXJbIHRoaXMuZXhwYW5kbyBdWyBqUXVlcnkuY2FtZWxDYXNlKCBrZXkgKSBdO1xuXHR9LFxuXHRhY2Nlc3M6IGZ1bmN0aW9uKCBvd25lciwga2V5LCB2YWx1ZSApIHtcblxuXHRcdC8vIEluIGNhc2VzIHdoZXJlIGVpdGhlcjpcblx0XHQvL1xuXHRcdC8vICAgMS4gTm8ga2V5IHdhcyBzcGVjaWZpZWRcblx0XHQvLyAgIDIuIEEgc3RyaW5nIGtleSB3YXMgc3BlY2lmaWVkLCBidXQgbm8gdmFsdWUgcHJvdmlkZWRcblx0XHQvL1xuXHRcdC8vIFRha2UgdGhlIFwicmVhZFwiIHBhdGggYW5kIGFsbG93IHRoZSBnZXQgbWV0aG9kIHRvIGRldGVybWluZVxuXHRcdC8vIHdoaWNoIHZhbHVlIHRvIHJldHVybiwgcmVzcGVjdGl2ZWx5IGVpdGhlcjpcblx0XHQvL1xuXHRcdC8vICAgMS4gVGhlIGVudGlyZSBjYWNoZSBvYmplY3Rcblx0XHQvLyAgIDIuIFRoZSBkYXRhIHN0b3JlZCBhdCB0aGUga2V5XG5cdFx0Ly9cblx0XHRpZiAoIGtleSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRcdCggKCBrZXkgJiYgdHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIiApICYmIHZhbHVlID09PSB1bmRlZmluZWQgKSApIHtcblxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0KCBvd25lciwga2V5ICk7XG5cdFx0fVxuXG5cdFx0Ly8gV2hlbiB0aGUga2V5IGlzIG5vdCBhIHN0cmluZywgb3IgYm90aCBhIGtleSBhbmQgdmFsdWVcblx0XHQvLyBhcmUgc3BlY2lmaWVkLCBzZXQgb3IgZXh0ZW5kIChleGlzdGluZyBvYmplY3RzKSB3aXRoIGVpdGhlcjpcblx0XHQvL1xuXHRcdC8vICAgMS4gQW4gb2JqZWN0IG9mIHByb3BlcnRpZXNcblx0XHQvLyAgIDIuIEEga2V5IGFuZCB2YWx1ZVxuXHRcdC8vXG5cdFx0dGhpcy5zZXQoIG93bmVyLCBrZXksIHZhbHVlICk7XG5cblx0XHQvLyBTaW5jZSB0aGUgXCJzZXRcIiBwYXRoIGNhbiBoYXZlIHR3byBwb3NzaWJsZSBlbnRyeSBwb2ludHNcblx0XHQvLyByZXR1cm4gdGhlIGV4cGVjdGVkIGRhdGEgYmFzZWQgb24gd2hpY2ggcGF0aCB3YXMgdGFrZW5bKl1cblx0XHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoga2V5O1xuXHR9LFxuXHRyZW1vdmU6IGZ1bmN0aW9uKCBvd25lciwga2V5ICkge1xuXHRcdHZhciBpLFxuXHRcdFx0Y2FjaGUgPSBvd25lclsgdGhpcy5leHBhbmRvIF07XG5cblx0XHRpZiAoIGNhY2hlID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCBrZXkgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0Ly8gU3VwcG9ydCBhcnJheSBvciBzcGFjZSBzZXBhcmF0ZWQgc3RyaW5nIG9mIGtleXNcblx0XHRcdGlmICggQXJyYXkuaXNBcnJheSgga2V5ICkgKSB7XG5cblx0XHRcdFx0Ly8gSWYga2V5IGlzIGFuIGFycmF5IG9mIGtleXMuLi5cblx0XHRcdFx0Ly8gV2UgYWx3YXlzIHNldCBjYW1lbENhc2Uga2V5cywgc28gcmVtb3ZlIHRoYXQuXG5cdFx0XHRcdGtleSA9IGtleS5tYXAoIGpRdWVyeS5jYW1lbENhc2UgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGtleSA9IGpRdWVyeS5jYW1lbENhc2UoIGtleSApO1xuXG5cdFx0XHRcdC8vIElmIGEga2V5IHdpdGggdGhlIHNwYWNlcyBleGlzdHMsIHVzZSBpdC5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlLCBjcmVhdGUgYW4gYXJyYXkgYnkgbWF0Y2hpbmcgbm9uLXdoaXRlc3BhY2Vcblx0XHRcdFx0a2V5ID0ga2V5IGluIGNhY2hlID9cblx0XHRcdFx0XHRbIGtleSBdIDpcblx0XHRcdFx0XHQoIGtleS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdICk7XG5cdFx0XHR9XG5cblx0XHRcdGkgPSBrZXkubGVuZ3RoO1xuXG5cdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0ZGVsZXRlIGNhY2hlWyBrZXlbIGkgXSBdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFJlbW92ZSB0aGUgZXhwYW5kbyBpZiB0aGVyZSdzIG5vIG1vcmUgZGF0YVxuXHRcdGlmICgga2V5ID09PSB1bmRlZmluZWQgfHwgalF1ZXJ5LmlzRW1wdHlPYmplY3QoIGNhY2hlICkgKSB7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IENocm9tZSA8PTM1IC0gNDVcblx0XHRcdC8vIFdlYmtpdCAmIEJsaW5rIHBlcmZvcm1hbmNlIHN1ZmZlcnMgd2hlbiBkZWxldGluZyBwcm9wZXJ0aWVzXG5cdFx0XHQvLyBmcm9tIERPTSBub2Rlcywgc28gc2V0IHRvIHVuZGVmaW5lZCBpbnN0ZWFkXG5cdFx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0zNzg2MDcgKGJ1ZyByZXN0cmljdGVkKVxuXHRcdFx0aWYgKCBvd25lci5ub2RlVHlwZSApIHtcblx0XHRcdFx0b3duZXJbIHRoaXMuZXhwYW5kbyBdID0gdW5kZWZpbmVkO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVsZXRlIG93bmVyWyB0aGlzLmV4cGFuZG8gXTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGhhc0RhdGE6IGZ1bmN0aW9uKCBvd25lciApIHtcblx0XHR2YXIgY2FjaGUgPSBvd25lclsgdGhpcy5leHBhbmRvIF07XG5cdFx0cmV0dXJuIGNhY2hlICE9PSB1bmRlZmluZWQgJiYgIWpRdWVyeS5pc0VtcHR5T2JqZWN0KCBjYWNoZSApO1xuXHR9XG59O1xudmFyIGRhdGFQcml2ID0gbmV3IERhdGEoKTtcblxudmFyIGRhdGFVc2VyID0gbmV3IERhdGEoKTtcblxuXG5cbi8vXHRJbXBsZW1lbnRhdGlvbiBTdW1tYXJ5XG4vL1xuLy9cdDEuIEVuZm9yY2UgQVBJIHN1cmZhY2UgYW5kIHNlbWFudGljIGNvbXBhdGliaWxpdHkgd2l0aCAxLjkueCBicmFuY2hcbi8vXHQyLiBJbXByb3ZlIHRoZSBtb2R1bGUncyBtYWludGFpbmFiaWxpdHkgYnkgcmVkdWNpbmcgdGhlIHN0b3JhZ2Vcbi8vXHRcdHBhdGhzIHRvIGEgc2luZ2xlIG1lY2hhbmlzbS5cbi8vXHQzLiBVc2UgdGhlIHNhbWUgc2luZ2xlIG1lY2hhbmlzbSB0byBzdXBwb3J0IFwicHJpdmF0ZVwiIGFuZCBcInVzZXJcIiBkYXRhLlxuLy9cdDQuIF9OZXZlcl8gZXhwb3NlIFwicHJpdmF0ZVwiIGRhdGEgdG8gdXNlciBjb2RlIChUT0RPOiBEcm9wIF9kYXRhLCBfcmVtb3ZlRGF0YSlcbi8vXHQ1LiBBdm9pZCBleHBvc2luZyBpbXBsZW1lbnRhdGlvbiBkZXRhaWxzIG9uIHVzZXIgb2JqZWN0cyAoZWcuIGV4cGFuZG8gcHJvcGVydGllcylcbi8vXHQ2LiBQcm92aWRlIGEgY2xlYXIgcGF0aCBmb3IgaW1wbGVtZW50YXRpb24gdXBncmFkZSB0byBXZWFrTWFwIGluIDIwMTRcblxudmFyIHJicmFjZSA9IC9eKD86XFx7W1xcd1xcV10qXFx9fFxcW1tcXHdcXFddKlxcXSkkLyxcblx0cm11bHRpRGFzaCA9IC9bQS1aXS9nO1xuXG5mdW5jdGlvbiBnZXREYXRhKCBkYXRhICkge1xuXHRpZiAoIGRhdGEgPT09IFwidHJ1ZVwiICkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0aWYgKCBkYXRhID09PSBcImZhbHNlXCIgKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0aWYgKCBkYXRhID09PSBcIm51bGxcIiApIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdC8vIE9ubHkgY29udmVydCB0byBhIG51bWJlciBpZiBpdCBkb2Vzbid0IGNoYW5nZSB0aGUgc3RyaW5nXG5cdGlmICggZGF0YSA9PT0gK2RhdGEgKyBcIlwiICkge1xuXHRcdHJldHVybiArZGF0YTtcblx0fVxuXG5cdGlmICggcmJyYWNlLnRlc3QoIGRhdGEgKSApIHtcblx0XHRyZXR1cm4gSlNPTi5wYXJzZSggZGF0YSApO1xuXHR9XG5cblx0cmV0dXJuIGRhdGE7XG59XG5cbmZ1bmN0aW9uIGRhdGFBdHRyKCBlbGVtLCBrZXksIGRhdGEgKSB7XG5cdHZhciBuYW1lO1xuXG5cdC8vIElmIG5vdGhpbmcgd2FzIGZvdW5kIGludGVybmFsbHksIHRyeSB0byBmZXRjaCBhbnlcblx0Ly8gZGF0YSBmcm9tIHRoZSBIVE1MNSBkYXRhLSogYXR0cmlidXRlXG5cdGlmICggZGF0YSA9PT0gdW5kZWZpbmVkICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0bmFtZSA9IFwiZGF0YS1cIiArIGtleS5yZXBsYWNlKCBybXVsdGlEYXNoLCBcIi0kJlwiICkudG9Mb3dlckNhc2UoKTtcblx0XHRkYXRhID0gZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUgKTtcblxuXHRcdGlmICggdHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRkYXRhID0gZ2V0RGF0YSggZGF0YSApO1xuXHRcdFx0fSBjYXRjaCAoIGUgKSB7fVxuXG5cdFx0XHQvLyBNYWtlIHN1cmUgd2Ugc2V0IHRoZSBkYXRhIHNvIGl0IGlzbid0IGNoYW5nZWQgbGF0ZXJcblx0XHRcdGRhdGFVc2VyLnNldCggZWxlbSwga2V5LCBkYXRhICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRhdGEgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBkYXRhO1xufVxuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cdGhhc0RhdGE6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBkYXRhVXNlci5oYXNEYXRhKCBlbGVtICkgfHwgZGF0YVByaXYuaGFzRGF0YSggZWxlbSApO1xuXHR9LFxuXG5cdGRhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBkYXRhICkge1xuXHRcdHJldHVybiBkYXRhVXNlci5hY2Nlc3MoIGVsZW0sIG5hbWUsIGRhdGEgKTtcblx0fSxcblxuXHRyZW1vdmVEYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcblx0XHRkYXRhVXNlci5yZW1vdmUoIGVsZW0sIG5hbWUgKTtcblx0fSxcblxuXHQvLyBUT0RPOiBOb3cgdGhhdCBhbGwgY2FsbHMgdG8gX2RhdGEgYW5kIF9yZW1vdmVEYXRhIGhhdmUgYmVlbiByZXBsYWNlZFxuXHQvLyB3aXRoIGRpcmVjdCBjYWxscyB0byBkYXRhUHJpdiBtZXRob2RzLCB0aGVzZSBjYW4gYmUgZGVwcmVjYXRlZC5cblx0X2RhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBkYXRhICkge1xuXHRcdHJldHVybiBkYXRhUHJpdi5hY2Nlc3MoIGVsZW0sIG5hbWUsIGRhdGEgKTtcblx0fSxcblxuXHRfcmVtb3ZlRGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cdFx0ZGF0YVByaXYucmVtb3ZlKCBlbGVtLCBuYW1lICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRkYXRhOiBmdW5jdGlvbigga2V5LCB2YWx1ZSApIHtcblx0XHR2YXIgaSwgbmFtZSwgZGF0YSxcblx0XHRcdGVsZW0gPSB0aGlzWyAwIF0sXG5cdFx0XHRhdHRycyA9IGVsZW0gJiYgZWxlbS5hdHRyaWJ1dGVzO1xuXG5cdFx0Ly8gR2V0cyBhbGwgdmFsdWVzXG5cdFx0aWYgKCBrZXkgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdGlmICggdGhpcy5sZW5ndGggKSB7XG5cdFx0XHRcdGRhdGEgPSBkYXRhVXNlci5nZXQoIGVsZW0gKTtcblxuXHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgJiYgIWRhdGFQcml2LmdldCggZWxlbSwgXCJoYXNEYXRhQXR0cnNcIiApICkge1xuXHRcdFx0XHRcdGkgPSBhdHRycy5sZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cblx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDExIG9ubHlcblx0XHRcdFx0XHRcdC8vIFRoZSBhdHRycyBlbGVtZW50cyBjYW4gYmUgbnVsbCAoIzE0ODk0KVxuXHRcdFx0XHRcdFx0aWYgKCBhdHRyc1sgaSBdICkge1xuXHRcdFx0XHRcdFx0XHRuYW1lID0gYXR0cnNbIGkgXS5uYW1lO1xuXHRcdFx0XHRcdFx0XHRpZiAoIG5hbWUuaW5kZXhPZiggXCJkYXRhLVwiICkgPT09IDAgKSB7XG5cdFx0XHRcdFx0XHRcdFx0bmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUuc2xpY2UoIDUgKSApO1xuXHRcdFx0XHRcdFx0XHRcdGRhdGFBdHRyKCBlbGVtLCBuYW1lLCBkYXRhWyBuYW1lIF0gKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkYXRhUHJpdi5zZXQoIGVsZW0sIFwiaGFzRGF0YUF0dHJzXCIsIHRydWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9XG5cblx0XHQvLyBTZXRzIG11bHRpcGxlIHZhbHVlc1xuXHRcdGlmICggdHlwZW9mIGtleSA9PT0gXCJvYmplY3RcIiApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRkYXRhVXNlci5zZXQoIHRoaXMsIGtleSApO1xuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdHZhciBkYXRhO1xuXG5cdFx0XHQvLyBUaGUgY2FsbGluZyBqUXVlcnkgb2JqZWN0IChlbGVtZW50IG1hdGNoZXMpIGlzIG5vdCBlbXB0eVxuXHRcdFx0Ly8gKGFuZCB0aGVyZWZvcmUgaGFzIGFuIGVsZW1lbnQgYXBwZWFycyBhdCB0aGlzWyAwIF0pIGFuZCB0aGVcblx0XHRcdC8vIGB2YWx1ZWAgcGFyYW1ldGVyIHdhcyBub3QgdW5kZWZpbmVkLiBBbiBlbXB0eSBqUXVlcnkgb2JqZWN0XG5cdFx0XHQvLyB3aWxsIHJlc3VsdCBpbiBgdW5kZWZpbmVkYCBmb3IgZWxlbSA9IHRoaXNbIDAgXSB3aGljaCB3aWxsXG5cdFx0XHQvLyB0aHJvdyBhbiBleGNlcHRpb24gaWYgYW4gYXR0ZW1wdCB0byByZWFkIGEgZGF0YSBjYWNoZSBpcyBtYWRlLlxuXHRcdFx0aWYgKCBlbGVtICYmIHZhbHVlID09PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0Ly8gQXR0ZW1wdCB0byBnZXQgZGF0YSBmcm9tIHRoZSBjYWNoZVxuXHRcdFx0XHQvLyBUaGUga2V5IHdpbGwgYWx3YXlzIGJlIGNhbWVsQ2FzZWQgaW4gRGF0YVxuXHRcdFx0XHRkYXRhID0gZGF0YVVzZXIuZ2V0KCBlbGVtLCBrZXkgKTtcblx0XHRcdFx0aWYgKCBkYXRhICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBdHRlbXB0IHRvIFwiZGlzY292ZXJcIiB0aGUgZGF0YSBpblxuXHRcdFx0XHQvLyBIVE1MNSBjdXN0b20gZGF0YS0qIGF0dHJzXG5cdFx0XHRcdGRhdGEgPSBkYXRhQXR0ciggZWxlbSwga2V5ICk7XG5cdFx0XHRcdGlmICggZGF0YSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHJldHVybiBkYXRhO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gV2UgdHJpZWQgcmVhbGx5IGhhcmQsIGJ1dCB0aGUgZGF0YSBkb2Vzbid0IGV4aXN0LlxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNldCB0aGUgZGF0YS4uLlxuXHRcdFx0dGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHQvLyBXZSBhbHdheXMgc3RvcmUgdGhlIGNhbWVsQ2FzZWQga2V5XG5cdFx0XHRcdGRhdGFVc2VyLnNldCggdGhpcywga2V5LCB2YWx1ZSApO1xuXHRcdFx0fSApO1xuXHRcdH0sIG51bGwsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSwgbnVsbCwgdHJ1ZSApO1xuXHR9LFxuXG5cdHJlbW92ZURhdGE6IGZ1bmN0aW9uKCBrZXkgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRkYXRhVXNlci5yZW1vdmUoIHRoaXMsIGtleSApO1xuXHRcdH0gKTtcblx0fVxufSApO1xuXG5cbmpRdWVyeS5leHRlbmQoIHtcblx0cXVldWU6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCBkYXRhICkge1xuXHRcdHZhciBxdWV1ZTtcblxuXHRcdGlmICggZWxlbSApIHtcblx0XHRcdHR5cGUgPSAoIHR5cGUgfHwgXCJmeFwiICkgKyBcInF1ZXVlXCI7XG5cdFx0XHRxdWV1ZSA9IGRhdGFQcml2LmdldCggZWxlbSwgdHlwZSApO1xuXG5cdFx0XHQvLyBTcGVlZCB1cCBkZXF1ZXVlIGJ5IGdldHRpbmcgb3V0IHF1aWNrbHkgaWYgdGhpcyBpcyBqdXN0IGEgbG9va3VwXG5cdFx0XHRpZiAoIGRhdGEgKSB7XG5cdFx0XHRcdGlmICggIXF1ZXVlIHx8IEFycmF5LmlzQXJyYXkoIGRhdGEgKSApIHtcblx0XHRcdFx0XHRxdWV1ZSA9IGRhdGFQcml2LmFjY2VzcyggZWxlbSwgdHlwZSwgalF1ZXJ5Lm1ha2VBcnJheSggZGF0YSApICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cXVldWUucHVzaCggZGF0YSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcXVldWUgfHwgW107XG5cdFx0fVxuXHR9LFxuXG5cdGRlcXVldWU6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlICkge1xuXHRcdHR5cGUgPSB0eXBlIHx8IFwiZnhcIjtcblxuXHRcdHZhciBxdWV1ZSA9IGpRdWVyeS5xdWV1ZSggZWxlbSwgdHlwZSApLFxuXHRcdFx0c3RhcnRMZW5ndGggPSBxdWV1ZS5sZW5ndGgsXG5cdFx0XHRmbiA9IHF1ZXVlLnNoaWZ0KCksXG5cdFx0XHRob29rcyA9IGpRdWVyeS5fcXVldWVIb29rcyggZWxlbSwgdHlwZSApLFxuXHRcdFx0bmV4dCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRqUXVlcnkuZGVxdWV1ZSggZWxlbSwgdHlwZSApO1xuXHRcdFx0fTtcblxuXHRcdC8vIElmIHRoZSBmeCBxdWV1ZSBpcyBkZXF1ZXVlZCwgYWx3YXlzIHJlbW92ZSB0aGUgcHJvZ3Jlc3Mgc2VudGluZWxcblx0XHRpZiAoIGZuID09PSBcImlucHJvZ3Jlc3NcIiApIHtcblx0XHRcdGZuID0gcXVldWUuc2hpZnQoKTtcblx0XHRcdHN0YXJ0TGVuZ3RoLS07XG5cdFx0fVxuXG5cdFx0aWYgKCBmbiApIHtcblxuXHRcdFx0Ly8gQWRkIGEgcHJvZ3Jlc3Mgc2VudGluZWwgdG8gcHJldmVudCB0aGUgZnggcXVldWUgZnJvbSBiZWluZ1xuXHRcdFx0Ly8gYXV0b21hdGljYWxseSBkZXF1ZXVlZFxuXHRcdFx0aWYgKCB0eXBlID09PSBcImZ4XCIgKSB7XG5cdFx0XHRcdHF1ZXVlLnVuc2hpZnQoIFwiaW5wcm9ncmVzc1wiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENsZWFyIHVwIHRoZSBsYXN0IHF1ZXVlIHN0b3AgZnVuY3Rpb25cblx0XHRcdGRlbGV0ZSBob29rcy5zdG9wO1xuXHRcdFx0Zm4uY2FsbCggZWxlbSwgbmV4dCwgaG9va3MgKTtcblx0XHR9XG5cblx0XHRpZiAoICFzdGFydExlbmd0aCAmJiBob29rcyApIHtcblx0XHRcdGhvb2tzLmVtcHR5LmZpcmUoKTtcblx0XHR9XG5cdH0sXG5cblx0Ly8gTm90IHB1YmxpYyAtIGdlbmVyYXRlIGEgcXVldWVIb29rcyBvYmplY3QsIG9yIHJldHVybiB0aGUgY3VycmVudCBvbmVcblx0X3F1ZXVlSG9va3M6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlICkge1xuXHRcdHZhciBrZXkgPSB0eXBlICsgXCJxdWV1ZUhvb2tzXCI7XG5cdFx0cmV0dXJuIGRhdGFQcml2LmdldCggZWxlbSwga2V5ICkgfHwgZGF0YVByaXYuYWNjZXNzKCBlbGVtLCBrZXksIHtcblx0XHRcdGVtcHR5OiBqUXVlcnkuQ2FsbGJhY2tzKCBcIm9uY2UgbWVtb3J5XCIgKS5hZGQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRkYXRhUHJpdi5yZW1vdmUoIGVsZW0sIFsgdHlwZSArIFwicXVldWVcIiwga2V5IF0gKTtcblx0XHRcdH0gKVxuXHRcdH0gKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdHF1ZXVlOiBmdW5jdGlvbiggdHlwZSwgZGF0YSApIHtcblx0XHR2YXIgc2V0dGVyID0gMjtcblxuXHRcdGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRkYXRhID0gdHlwZTtcblx0XHRcdHR5cGUgPSBcImZ4XCI7XG5cdFx0XHRzZXR0ZXItLTtcblx0XHR9XG5cblx0XHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggPCBzZXR0ZXIgKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5LnF1ZXVlKCB0aGlzWyAwIF0sIHR5cGUgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGF0YSA9PT0gdW5kZWZpbmVkID9cblx0XHRcdHRoaXMgOlxuXHRcdFx0dGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHF1ZXVlID0galF1ZXJ5LnF1ZXVlKCB0aGlzLCB0eXBlLCBkYXRhICk7XG5cblx0XHRcdFx0Ly8gRW5zdXJlIGEgaG9va3MgZm9yIHRoaXMgcXVldWVcblx0XHRcdFx0alF1ZXJ5Ll9xdWV1ZUhvb2tzKCB0aGlzLCB0eXBlICk7XG5cblx0XHRcdFx0aWYgKCB0eXBlID09PSBcImZ4XCIgJiYgcXVldWVbIDAgXSAhPT0gXCJpbnByb2dyZXNzXCIgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmRlcXVldWUoIHRoaXMsIHR5cGUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXHR9LFxuXHRkZXF1ZXVlOiBmdW5jdGlvbiggdHlwZSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5kZXF1ZXVlKCB0aGlzLCB0eXBlICk7XG5cdFx0fSApO1xuXHR9LFxuXHRjbGVhclF1ZXVlOiBmdW5jdGlvbiggdHlwZSApIHtcblx0XHRyZXR1cm4gdGhpcy5xdWV1ZSggdHlwZSB8fCBcImZ4XCIsIFtdICk7XG5cdH0sXG5cblx0Ly8gR2V0IGEgcHJvbWlzZSByZXNvbHZlZCB3aGVuIHF1ZXVlcyBvZiBhIGNlcnRhaW4gdHlwZVxuXHQvLyBhcmUgZW1wdGllZCAoZnggaXMgdGhlIHR5cGUgYnkgZGVmYXVsdClcblx0cHJvbWlzZTogZnVuY3Rpb24oIHR5cGUsIG9iaiApIHtcblx0XHR2YXIgdG1wLFxuXHRcdFx0Y291bnQgPSAxLFxuXHRcdFx0ZGVmZXIgPSBqUXVlcnkuRGVmZXJyZWQoKSxcblx0XHRcdGVsZW1lbnRzID0gdGhpcyxcblx0XHRcdGkgPSB0aGlzLmxlbmd0aCxcblx0XHRcdHJlc29sdmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCAhKCAtLWNvdW50ICkgKSB7XG5cdFx0XHRcdFx0ZGVmZXIucmVzb2x2ZVdpdGgoIGVsZW1lbnRzLCBbIGVsZW1lbnRzIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRvYmogPSB0eXBlO1xuXHRcdFx0dHlwZSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHR0bXAgPSBkYXRhUHJpdi5nZXQoIGVsZW1lbnRzWyBpIF0sIHR5cGUgKyBcInF1ZXVlSG9va3NcIiApO1xuXHRcdFx0aWYgKCB0bXAgJiYgdG1wLmVtcHR5ICkge1xuXHRcdFx0XHRjb3VudCsrO1xuXHRcdFx0XHR0bXAuZW1wdHkuYWRkKCByZXNvbHZlICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJlc29sdmUoKTtcblx0XHRyZXR1cm4gZGVmZXIucHJvbWlzZSggb2JqICk7XG5cdH1cbn0gKTtcbnZhciBwbnVtID0gKCAvWystXT8oPzpcXGQqXFwufClcXGQrKD86W2VFXVsrLV0/XFxkK3wpLyApLnNvdXJjZTtcblxudmFyIHJjc3NOdW0gPSBuZXcgUmVnRXhwKCBcIl4oPzooWystXSk9fCkoXCIgKyBwbnVtICsgXCIpKFthLXolXSopJFwiLCBcImlcIiApO1xuXG5cbnZhciBjc3NFeHBhbmQgPSBbIFwiVG9wXCIsIFwiUmlnaHRcIiwgXCJCb3R0b21cIiwgXCJMZWZ0XCIgXTtcblxudmFyIGlzSGlkZGVuV2l0aGluVHJlZSA9IGZ1bmN0aW9uKCBlbGVtLCBlbCApIHtcblxuXHRcdC8vIGlzSGlkZGVuV2l0aGluVHJlZSBtaWdodCBiZSBjYWxsZWQgZnJvbSBqUXVlcnkjZmlsdGVyIGZ1bmN0aW9uO1xuXHRcdC8vIGluIHRoYXQgY2FzZSwgZWxlbWVudCB3aWxsIGJlIHNlY29uZCBhcmd1bWVudFxuXHRcdGVsZW0gPSBlbCB8fCBlbGVtO1xuXG5cdFx0Ly8gSW5saW5lIHN0eWxlIHRydW1wcyBhbGxcblx0XHRyZXR1cm4gZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIiB8fFxuXHRcdFx0ZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIlwiICYmXG5cblx0XHRcdC8vIE90aGVyd2lzZSwgY2hlY2sgY29tcHV0ZWQgc3R5bGVcblx0XHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3ggPD00MyAtIDQ1XG5cdFx0XHQvLyBEaXNjb25uZWN0ZWQgZWxlbWVudHMgY2FuIGhhdmUgY29tcHV0ZWQgZGlzcGxheTogbm9uZSwgc28gZmlyc3QgY29uZmlybSB0aGF0IGVsZW0gaXNcblx0XHRcdC8vIGluIHRoZSBkb2N1bWVudC5cblx0XHRcdGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICkgJiZcblxuXHRcdFx0alF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKSA9PT0gXCJub25lXCI7XG5cdH07XG5cbnZhciBzd2FwID0gZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMsIGNhbGxiYWNrLCBhcmdzICkge1xuXHR2YXIgcmV0LCBuYW1lLFxuXHRcdG9sZCA9IHt9O1xuXG5cdC8vIFJlbWVtYmVyIHRoZSBvbGQgdmFsdWVzLCBhbmQgaW5zZXJ0IHRoZSBuZXcgb25lc1xuXHRmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG5cdFx0b2xkWyBuYW1lIF0gPSBlbGVtLnN0eWxlWyBuYW1lIF07XG5cdFx0ZWxlbS5zdHlsZVsgbmFtZSBdID0gb3B0aW9uc1sgbmFtZSBdO1xuXHR9XG5cblx0cmV0ID0gY2FsbGJhY2suYXBwbHkoIGVsZW0sIGFyZ3MgfHwgW10gKTtcblxuXHQvLyBSZXZlcnQgdGhlIG9sZCB2YWx1ZXNcblx0Zm9yICggbmFtZSBpbiBvcHRpb25zICkge1xuXHRcdGVsZW0uc3R5bGVbIG5hbWUgXSA9IG9sZFsgbmFtZSBdO1xuXHR9XG5cblx0cmV0dXJuIHJldDtcbn07XG5cblxuXG5cbmZ1bmN0aW9uIGFkanVzdENTUyggZWxlbSwgcHJvcCwgdmFsdWVQYXJ0cywgdHdlZW4gKSB7XG5cdHZhciBhZGp1c3RlZCxcblx0XHRzY2FsZSA9IDEsXG5cdFx0bWF4SXRlcmF0aW9ucyA9IDIwLFxuXHRcdGN1cnJlbnRWYWx1ZSA9IHR3ZWVuID9cblx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gdHdlZW4uY3VyKCk7XG5cdFx0XHR9IDpcblx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4galF1ZXJ5LmNzcyggZWxlbSwgcHJvcCwgXCJcIiApO1xuXHRcdFx0fSxcblx0XHRpbml0aWFsID0gY3VycmVudFZhbHVlKCksXG5cdFx0dW5pdCA9IHZhbHVlUGFydHMgJiYgdmFsdWVQYXJ0c1sgMyBdIHx8ICggalF1ZXJ5LmNzc051bWJlclsgcHJvcCBdID8gXCJcIiA6IFwicHhcIiApLFxuXG5cdFx0Ly8gU3RhcnRpbmcgdmFsdWUgY29tcHV0YXRpb24gaXMgcmVxdWlyZWQgZm9yIHBvdGVudGlhbCB1bml0IG1pc21hdGNoZXNcblx0XHRpbml0aWFsSW5Vbml0ID0gKCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gfHwgdW5pdCAhPT0gXCJweFwiICYmICtpbml0aWFsICkgJiZcblx0XHRcdHJjc3NOdW0uZXhlYyggalF1ZXJ5LmNzcyggZWxlbSwgcHJvcCApICk7XG5cblx0aWYgKCBpbml0aWFsSW5Vbml0ICYmIGluaXRpYWxJblVuaXRbIDMgXSAhPT0gdW5pdCApIHtcblxuXHRcdC8vIFRydXN0IHVuaXRzIHJlcG9ydGVkIGJ5IGpRdWVyeS5jc3Ncblx0XHR1bml0ID0gdW5pdCB8fCBpbml0aWFsSW5Vbml0WyAzIF07XG5cblx0XHQvLyBNYWtlIHN1cmUgd2UgdXBkYXRlIHRoZSB0d2VlbiBwcm9wZXJ0aWVzIGxhdGVyIG9uXG5cdFx0dmFsdWVQYXJ0cyA9IHZhbHVlUGFydHMgfHwgW107XG5cblx0XHQvLyBJdGVyYXRpdmVseSBhcHByb3hpbWF0ZSBmcm9tIGEgbm9uemVybyBzdGFydGluZyBwb2ludFxuXHRcdGluaXRpYWxJblVuaXQgPSAraW5pdGlhbCB8fCAxO1xuXG5cdFx0ZG8ge1xuXG5cdFx0XHQvLyBJZiBwcmV2aW91cyBpdGVyYXRpb24gemVyb2VkIG91dCwgZG91YmxlIHVudGlsIHdlIGdldCAqc29tZXRoaW5nKi5cblx0XHRcdC8vIFVzZSBzdHJpbmcgZm9yIGRvdWJsaW5nIHNvIHdlIGRvbid0IGFjY2lkZW50YWxseSBzZWUgc2NhbGUgYXMgdW5jaGFuZ2VkIGJlbG93XG5cdFx0XHRzY2FsZSA9IHNjYWxlIHx8IFwiLjVcIjtcblxuXHRcdFx0Ly8gQWRqdXN0IGFuZCBhcHBseVxuXHRcdFx0aW5pdGlhbEluVW5pdCA9IGluaXRpYWxJblVuaXQgLyBzY2FsZTtcblx0XHRcdGpRdWVyeS5zdHlsZSggZWxlbSwgcHJvcCwgaW5pdGlhbEluVW5pdCArIHVuaXQgKTtcblxuXHRcdC8vIFVwZGF0ZSBzY2FsZSwgdG9sZXJhdGluZyB6ZXJvIG9yIE5hTiBmcm9tIHR3ZWVuLmN1cigpXG5cdFx0Ly8gQnJlYWsgdGhlIGxvb3AgaWYgc2NhbGUgaXMgdW5jaGFuZ2VkIG9yIHBlcmZlY3QsIG9yIGlmIHdlJ3ZlIGp1c3QgaGFkIGVub3VnaC5cblx0XHR9IHdoaWxlIChcblx0XHRcdHNjYWxlICE9PSAoIHNjYWxlID0gY3VycmVudFZhbHVlKCkgLyBpbml0aWFsICkgJiYgc2NhbGUgIT09IDEgJiYgLS1tYXhJdGVyYXRpb25zXG5cdFx0KTtcblx0fVxuXG5cdGlmICggdmFsdWVQYXJ0cyApIHtcblx0XHRpbml0aWFsSW5Vbml0ID0gK2luaXRpYWxJblVuaXQgfHwgK2luaXRpYWwgfHwgMDtcblxuXHRcdC8vIEFwcGx5IHJlbGF0aXZlIG9mZnNldCAoKz0vLT0pIGlmIHNwZWNpZmllZFxuXHRcdGFkanVzdGVkID0gdmFsdWVQYXJ0c1sgMSBdID9cblx0XHRcdGluaXRpYWxJblVuaXQgKyAoIHZhbHVlUGFydHNbIDEgXSArIDEgKSAqIHZhbHVlUGFydHNbIDIgXSA6XG5cdFx0XHQrdmFsdWVQYXJ0c1sgMiBdO1xuXHRcdGlmICggdHdlZW4gKSB7XG5cdFx0XHR0d2Vlbi51bml0ID0gdW5pdDtcblx0XHRcdHR3ZWVuLnN0YXJ0ID0gaW5pdGlhbEluVW5pdDtcblx0XHRcdHR3ZWVuLmVuZCA9IGFkanVzdGVkO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gYWRqdXN0ZWQ7XG59XG5cblxudmFyIGRlZmF1bHREaXNwbGF5TWFwID0ge307XG5cbmZ1bmN0aW9uIGdldERlZmF1bHREaXNwbGF5KCBlbGVtICkge1xuXHR2YXIgdGVtcCxcblx0XHRkb2MgPSBlbGVtLm93bmVyRG9jdW1lbnQsXG5cdFx0bm9kZU5hbWUgPSBlbGVtLm5vZGVOYW1lLFxuXHRcdGRpc3BsYXkgPSBkZWZhdWx0RGlzcGxheU1hcFsgbm9kZU5hbWUgXTtcblxuXHRpZiAoIGRpc3BsYXkgKSB7XG5cdFx0cmV0dXJuIGRpc3BsYXk7XG5cdH1cblxuXHR0ZW1wID0gZG9jLmJvZHkuYXBwZW5kQ2hpbGQoIGRvYy5jcmVhdGVFbGVtZW50KCBub2RlTmFtZSApICk7XG5cdGRpc3BsYXkgPSBqUXVlcnkuY3NzKCB0ZW1wLCBcImRpc3BsYXlcIiApO1xuXG5cdHRlbXAucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggdGVtcCApO1xuXG5cdGlmICggZGlzcGxheSA9PT0gXCJub25lXCIgKSB7XG5cdFx0ZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0fVxuXHRkZWZhdWx0RGlzcGxheU1hcFsgbm9kZU5hbWUgXSA9IGRpc3BsYXk7XG5cblx0cmV0dXJuIGRpc3BsYXk7XG59XG5cbmZ1bmN0aW9uIHNob3dIaWRlKCBlbGVtZW50cywgc2hvdyApIHtcblx0dmFyIGRpc3BsYXksIGVsZW0sXG5cdFx0dmFsdWVzID0gW10sXG5cdFx0aW5kZXggPSAwLFxuXHRcdGxlbmd0aCA9IGVsZW1lbnRzLmxlbmd0aDtcblxuXHQvLyBEZXRlcm1pbmUgbmV3IGRpc3BsYXkgdmFsdWUgZm9yIGVsZW1lbnRzIHRoYXQgbmVlZCB0byBjaGFuZ2Vcblx0Zm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRlbGVtID0gZWxlbWVudHNbIGluZGV4IF07XG5cdFx0aWYgKCAhZWxlbS5zdHlsZSApIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGRpc3BsYXkgPSBlbGVtLnN0eWxlLmRpc3BsYXk7XG5cdFx0aWYgKCBzaG93ICkge1xuXG5cdFx0XHQvLyBTaW5jZSB3ZSBmb3JjZSB2aXNpYmlsaXR5IHVwb24gY2FzY2FkZS1oaWRkZW4gZWxlbWVudHMsIGFuIGltbWVkaWF0ZSAoYW5kIHNsb3cpXG5cdFx0XHQvLyBjaGVjayBpcyByZXF1aXJlZCBpbiB0aGlzIGZpcnN0IGxvb3AgdW5sZXNzIHdlIGhhdmUgYSBub25lbXB0eSBkaXNwbGF5IHZhbHVlIChlaXRoZXJcblx0XHRcdC8vIGlubGluZSBvciBhYm91dC10by1iZS1yZXN0b3JlZClcblx0XHRcdGlmICggZGlzcGxheSA9PT0gXCJub25lXCIgKSB7XG5cdFx0XHRcdHZhbHVlc1sgaW5kZXggXSA9IGRhdGFQcml2LmdldCggZWxlbSwgXCJkaXNwbGF5XCIgKSB8fCBudWxsO1xuXHRcdFx0XHRpZiAoICF2YWx1ZXNbIGluZGV4IF0gKSB7XG5cdFx0XHRcdFx0ZWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKCBlbGVtLnN0eWxlLmRpc3BsYXkgPT09IFwiXCIgJiYgaXNIaWRkZW5XaXRoaW5UcmVlKCBlbGVtICkgKSB7XG5cdFx0XHRcdHZhbHVlc1sgaW5kZXggXSA9IGdldERlZmF1bHREaXNwbGF5KCBlbGVtICk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICggZGlzcGxheSAhPT0gXCJub25lXCIgKSB7XG5cdFx0XHRcdHZhbHVlc1sgaW5kZXggXSA9IFwibm9uZVwiO1xuXG5cdFx0XHRcdC8vIFJlbWVtYmVyIHdoYXQgd2UncmUgb3ZlcndyaXRpbmdcblx0XHRcdFx0ZGF0YVByaXYuc2V0KCBlbGVtLCBcImRpc3BsYXlcIiwgZGlzcGxheSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFNldCB0aGUgZGlzcGxheSBvZiB0aGUgZWxlbWVudHMgaW4gYSBzZWNvbmQgbG9vcCB0byBhdm9pZCBjb25zdGFudCByZWZsb3dcblx0Zm9yICggaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRpZiAoIHZhbHVlc1sgaW5kZXggXSAhPSBudWxsICkge1xuXHRcdFx0ZWxlbWVudHNbIGluZGV4IF0uc3R5bGUuZGlzcGxheSA9IHZhbHVlc1sgaW5kZXggXTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZWxlbWVudHM7XG59XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0c2hvdzogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHNob3dIaWRlKCB0aGlzLCB0cnVlICk7XG5cdH0sXG5cdGhpZGU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBzaG93SGlkZSggdGhpcyApO1xuXHR9LFxuXHR0b2dnbGU6IGZ1bmN0aW9uKCBzdGF0ZSApIHtcblx0XHRpZiAoIHR5cGVvZiBzdGF0ZSA9PT0gXCJib29sZWFuXCIgKSB7XG5cdFx0XHRyZXR1cm4gc3RhdGUgPyB0aGlzLnNob3coKSA6IHRoaXMuaGlkZSgpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCBpc0hpZGRlbldpdGhpblRyZWUoIHRoaXMgKSApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkuc2hvdygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkuaGlkZSgpO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fVxufSApO1xudmFyIHJjaGVja2FibGVUeXBlID0gKCAvXig/OmNoZWNrYm94fHJhZGlvKSQvaSApO1xuXG52YXIgcnRhZ05hbWUgPSAoIC88KFthLXpdW15cXC9cXDA+XFx4MjBcXHRcXHJcXG5cXGZdKykvaSApO1xuXG52YXIgcnNjcmlwdFR5cGUgPSAoIC9eJHxcXC8oPzpqYXZhfGVjbWEpc2NyaXB0L2kgKTtcblxuXG5cbi8vIFdlIGhhdmUgdG8gY2xvc2UgdGhlc2UgdGFncyB0byBzdXBwb3J0IFhIVE1MICgjMTMyMDApXG52YXIgd3JhcE1hcCA9IHtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuXHRvcHRpb246IFsgMSwgXCI8c2VsZWN0IG11bHRpcGxlPSdtdWx0aXBsZSc+XCIsIFwiPC9zZWxlY3Q+XCIgXSxcblxuXHQvLyBYSFRNTCBwYXJzZXJzIGRvIG5vdCBtYWdpY2FsbHkgaW5zZXJ0IGVsZW1lbnRzIGluIHRoZVxuXHQvLyBzYW1lIHdheSB0aGF0IHRhZyBzb3VwIHBhcnNlcnMgZG8uIFNvIHdlIGNhbm5vdCBzaG9ydGVuXG5cdC8vIHRoaXMgYnkgb21pdHRpbmcgPHRib2R5PiBvciBvdGhlciByZXF1aXJlZCBlbGVtZW50cy5cblx0dGhlYWQ6IFsgMSwgXCI8dGFibGU+XCIsIFwiPC90YWJsZT5cIiBdLFxuXHRjb2w6IFsgMiwgXCI8dGFibGU+PGNvbGdyb3VwPlwiLCBcIjwvY29sZ3JvdXA+PC90YWJsZT5cIiBdLFxuXHR0cjogWyAyLCBcIjx0YWJsZT48dGJvZHk+XCIsIFwiPC90Ym9keT48L3RhYmxlPlwiIF0sXG5cdHRkOiBbIDMsIFwiPHRhYmxlPjx0Ym9keT48dHI+XCIsIFwiPC90cj48L3Rib2R5PjwvdGFibGU+XCIgXSxcblxuXHRfZGVmYXVsdDogWyAwLCBcIlwiLCBcIlwiIF1cbn07XG5cbi8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG53cmFwTWFwLm9wdGdyb3VwID0gd3JhcE1hcC5vcHRpb247XG5cbndyYXBNYXAudGJvZHkgPSB3cmFwTWFwLnRmb290ID0gd3JhcE1hcC5jb2xncm91cCA9IHdyYXBNYXAuY2FwdGlvbiA9IHdyYXBNYXAudGhlYWQ7XG53cmFwTWFwLnRoID0gd3JhcE1hcC50ZDtcblxuXG5mdW5jdGlvbiBnZXRBbGwoIGNvbnRleHQsIHRhZyApIHtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PTkgLSAxMSBvbmx5XG5cdC8vIFVzZSB0eXBlb2YgdG8gYXZvaWQgemVyby1hcmd1bWVudCBtZXRob2QgaW52b2NhdGlvbiBvbiBob3N0IG9iamVjdHMgKCMxNTE1MSlcblx0dmFyIHJldDtcblxuXHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lICE9PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdHJldCA9IGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHRhZyB8fCBcIipcIiApO1xuXG5cdH0gZWxzZSBpZiAoIHR5cGVvZiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwgIT09IFwidW5kZWZpbmVkXCIgKSB7XG5cdFx0cmV0ID0gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKCB0YWcgfHwgXCIqXCIgKTtcblxuXHR9IGVsc2Uge1xuXHRcdHJldCA9IFtdO1xuXHR9XG5cblx0aWYgKCB0YWcgPT09IHVuZGVmaW5lZCB8fCB0YWcgJiYgbm9kZU5hbWUoIGNvbnRleHQsIHRhZyApICkge1xuXHRcdHJldHVybiBqUXVlcnkubWVyZ2UoIFsgY29udGV4dCBdLCByZXQgKTtcblx0fVxuXG5cdHJldHVybiByZXQ7XG59XG5cblxuLy8gTWFyayBzY3JpcHRzIGFzIGhhdmluZyBhbHJlYWR5IGJlZW4gZXZhbHVhdGVkXG5mdW5jdGlvbiBzZXRHbG9iYWxFdmFsKCBlbGVtcywgcmVmRWxlbWVudHMgKSB7XG5cdHZhciBpID0gMCxcblx0XHRsID0gZWxlbXMubGVuZ3RoO1xuXG5cdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRkYXRhUHJpdi5zZXQoXG5cdFx0XHRlbGVtc1sgaSBdLFxuXHRcdFx0XCJnbG9iYWxFdmFsXCIsXG5cdFx0XHQhcmVmRWxlbWVudHMgfHwgZGF0YVByaXYuZ2V0KCByZWZFbGVtZW50c1sgaSBdLCBcImdsb2JhbEV2YWxcIiApXG5cdFx0KTtcblx0fVxufVxuXG5cbnZhciByaHRtbCA9IC88fCYjP1xcdys7LztcblxuZnVuY3Rpb24gYnVpbGRGcmFnbWVudCggZWxlbXMsIGNvbnRleHQsIHNjcmlwdHMsIHNlbGVjdGlvbiwgaWdub3JlZCApIHtcblx0dmFyIGVsZW0sIHRtcCwgdGFnLCB3cmFwLCBjb250YWlucywgaixcblx0XHRmcmFnbWVudCA9IGNvbnRleHQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxuXHRcdG5vZGVzID0gW10sXG5cdFx0aSA9IDAsXG5cdFx0bCA9IGVsZW1zLmxlbmd0aDtcblxuXHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0ZWxlbSA9IGVsZW1zWyBpIF07XG5cblx0XHRpZiAoIGVsZW0gfHwgZWxlbSA9PT0gMCApIHtcblxuXHRcdFx0Ly8gQWRkIG5vZGVzIGRpcmVjdGx5XG5cdFx0XHRpZiAoIGpRdWVyeS50eXBlKCBlbGVtICkgPT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5LCBQaGFudG9tSlMgMSBvbmx5XG5cdFx0XHRcdC8vIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcblx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCBub2RlcywgZWxlbS5ub2RlVHlwZSA/IFsgZWxlbSBdIDogZWxlbSApO1xuXG5cdFx0XHQvLyBDb252ZXJ0IG5vbi1odG1sIGludG8gYSB0ZXh0IG5vZGVcblx0XHRcdH0gZWxzZSBpZiAoICFyaHRtbC50ZXN0KCBlbGVtICkgKSB7XG5cdFx0XHRcdG5vZGVzLnB1c2goIGNvbnRleHQuY3JlYXRlVGV4dE5vZGUoIGVsZW0gKSApO1xuXG5cdFx0XHQvLyBDb252ZXJ0IGh0bWwgaW50byBET00gbm9kZXNcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRtcCA9IHRtcCB8fCBmcmFnbWVudC5hcHBlbmRDaGlsZCggY29udGV4dC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkgKTtcblxuXHRcdFx0XHQvLyBEZXNlcmlhbGl6ZSBhIHN0YW5kYXJkIHJlcHJlc2VudGF0aW9uXG5cdFx0XHRcdHRhZyA9ICggcnRhZ05hbWUuZXhlYyggZWxlbSApIHx8IFsgXCJcIiwgXCJcIiBdIClbIDEgXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR3cmFwID0gd3JhcE1hcFsgdGFnIF0gfHwgd3JhcE1hcC5fZGVmYXVsdDtcblx0XHRcdFx0dG1wLmlubmVySFRNTCA9IHdyYXBbIDEgXSArIGpRdWVyeS5odG1sUHJlZmlsdGVyKCBlbGVtICkgKyB3cmFwWyAyIF07XG5cblx0XHRcdFx0Ly8gRGVzY2VuZCB0aHJvdWdoIHdyYXBwZXJzIHRvIHRoZSByaWdodCBjb250ZW50XG5cdFx0XHRcdGogPSB3cmFwWyAwIF07XG5cdFx0XHRcdHdoaWxlICggai0tICkge1xuXHRcdFx0XHRcdHRtcCA9IHRtcC5sYXN0Q2hpbGQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHksIFBoYW50b21KUyAxIG9ubHlcblx0XHRcdFx0Ly8gcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRcdFx0XHRqUXVlcnkubWVyZ2UoIG5vZGVzLCB0bXAuY2hpbGROb2RlcyApO1xuXG5cdFx0XHRcdC8vIFJlbWVtYmVyIHRoZSB0b3AtbGV2ZWwgY29udGFpbmVyXG5cdFx0XHRcdHRtcCA9IGZyYWdtZW50LmZpcnN0Q2hpbGQ7XG5cblx0XHRcdFx0Ly8gRW5zdXJlIHRoZSBjcmVhdGVkIG5vZGVzIGFyZSBvcnBoYW5lZCAoIzEyMzkyKVxuXHRcdFx0XHR0bXAudGV4dENvbnRlbnQgPSBcIlwiO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFJlbW92ZSB3cmFwcGVyIGZyb20gZnJhZ21lbnRcblx0ZnJhZ21lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xuXG5cdGkgPSAwO1xuXHR3aGlsZSAoICggZWxlbSA9IG5vZGVzWyBpKysgXSApICkge1xuXG5cdFx0Ly8gU2tpcCBlbGVtZW50cyBhbHJlYWR5IGluIHRoZSBjb250ZXh0IGNvbGxlY3Rpb24gKHRyYWMtNDA4Nylcblx0XHRpZiAoIHNlbGVjdGlvbiAmJiBqUXVlcnkuaW5BcnJheSggZWxlbSwgc2VsZWN0aW9uICkgPiAtMSApIHtcblx0XHRcdGlmICggaWdub3JlZCApIHtcblx0XHRcdFx0aWdub3JlZC5wdXNoKCBlbGVtICk7XG5cdFx0XHR9XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRjb250YWlucyA9IGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICk7XG5cblx0XHQvLyBBcHBlbmQgdG8gZnJhZ21lbnRcblx0XHR0bXAgPSBnZXRBbGwoIGZyYWdtZW50LmFwcGVuZENoaWxkKCBlbGVtICksIFwic2NyaXB0XCIgKTtcblxuXHRcdC8vIFByZXNlcnZlIHNjcmlwdCBldmFsdWF0aW9uIGhpc3Rvcnlcblx0XHRpZiAoIGNvbnRhaW5zICkge1xuXHRcdFx0c2V0R2xvYmFsRXZhbCggdG1wICk7XG5cdFx0fVxuXG5cdFx0Ly8gQ2FwdHVyZSBleGVjdXRhYmxlc1xuXHRcdGlmICggc2NyaXB0cyApIHtcblx0XHRcdGogPSAwO1xuXHRcdFx0d2hpbGUgKCAoIGVsZW0gPSB0bXBbIGorKyBdICkgKSB7XG5cdFx0XHRcdGlmICggcnNjcmlwdFR5cGUudGVzdCggZWxlbS50eXBlIHx8IFwiXCIgKSApIHtcblx0XHRcdFx0XHRzY3JpcHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBmcmFnbWVudDtcbn1cblxuXG4oIGZ1bmN0aW9uKCkge1xuXHR2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXG5cdFx0ZGl2ID0gZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKSApLFxuXHRcdGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJpbnB1dFwiICk7XG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA0LjAgLSA0LjMgb25seVxuXHQvLyBDaGVjayBzdGF0ZSBsb3N0IGlmIHRoZSBuYW1lIGlzIHNldCAoIzExMjE3KVxuXHQvLyBTdXBwb3J0OiBXaW5kb3dzIFdlYiBBcHBzIChXV0EpXG5cdC8vIGBuYW1lYCBhbmQgYHR5cGVgIG11c3QgdXNlIC5zZXRBdHRyaWJ1dGUgZm9yIFdXQSAoIzE0OTAxKVxuXHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCBcInJhZGlvXCIgKTtcblx0aW5wdXQuc2V0QXR0cmlidXRlKCBcImNoZWNrZWRcIiwgXCJjaGVja2VkXCIgKTtcblx0aW5wdXQuc2V0QXR0cmlidXRlKCBcIm5hbWVcIiwgXCJ0XCIgKTtcblxuXHRkaXYuYXBwZW5kQ2hpbGQoIGlucHV0ICk7XG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMSBvbmx5XG5cdC8vIE9sZGVyIFdlYktpdCBkb2Vzbid0IGNsb25lIGNoZWNrZWQgc3RhdGUgY29ycmVjdGx5IGluIGZyYWdtZW50c1xuXHRzdXBwb3J0LmNoZWNrQ2xvbmUgPSBkaXYuY2xvbmVOb2RlKCB0cnVlICkuY2xvbmVOb2RlKCB0cnVlICkubGFzdENoaWxkLmNoZWNrZWQ7XG5cblx0Ly8gU3VwcG9ydDogSUUgPD0xMSBvbmx5XG5cdC8vIE1ha2Ugc3VyZSB0ZXh0YXJlYSAoYW5kIGNoZWNrYm94KSBkZWZhdWx0VmFsdWUgaXMgcHJvcGVybHkgY2xvbmVkXG5cdGRpdi5pbm5lckhUTUwgPSBcIjx0ZXh0YXJlYT54PC90ZXh0YXJlYT5cIjtcblx0c3VwcG9ydC5ub0Nsb25lQ2hlY2tlZCA9ICEhZGl2LmNsb25lTm9kZSggdHJ1ZSApLmxhc3RDaGlsZC5kZWZhdWx0VmFsdWU7XG59ICkoKTtcbnZhciBkb2N1bWVudEVsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblxuXG52YXJcblx0cmtleUV2ZW50ID0gL15rZXkvLFxuXHRybW91c2VFdmVudCA9IC9eKD86bW91c2V8cG9pbnRlcnxjb250ZXh0bWVudXxkcmFnfGRyb3ApfGNsaWNrLyxcblx0cnR5cGVuYW1lc3BhY2UgPSAvXihbXi5dKikoPzpcXC4oLispfCkvO1xuXG5mdW5jdGlvbiByZXR1cm5UcnVlKCkge1xuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmV0dXJuRmFsc2UoKSB7XG5cdHJldHVybiBmYWxzZTtcbn1cblxuLy8gU3VwcG9ydDogSUUgPD05IG9ubHlcbi8vIFNlZSAjMTMzOTMgZm9yIG1vcmUgaW5mb1xuZnVuY3Rpb24gc2FmZUFjdGl2ZUVsZW1lbnQoKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cdH0gY2F0Y2ggKCBlcnIgKSB7IH1cbn1cblxuZnVuY3Rpb24gb24oIGVsZW0sIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4sIG9uZSApIHtcblx0dmFyIG9yaWdGbiwgdHlwZTtcblxuXHQvLyBUeXBlcyBjYW4gYmUgYSBtYXAgb2YgdHlwZXMvaGFuZGxlcnNcblx0aWYgKCB0eXBlb2YgdHlwZXMgPT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHQvLyAoIHR5cGVzLU9iamVjdCwgc2VsZWN0b3IsIGRhdGEgKVxuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICkge1xuXG5cdFx0XHQvLyAoIHR5cGVzLU9iamVjdCwgZGF0YSApXG5cdFx0XHRkYXRhID0gZGF0YSB8fCBzZWxlY3Rvcjtcblx0XHRcdHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHRmb3IgKCB0eXBlIGluIHR5cGVzICkge1xuXHRcdFx0b24oIGVsZW0sIHR5cGUsIHNlbGVjdG9yLCBkYXRhLCB0eXBlc1sgdHlwZSBdLCBvbmUgKTtcblx0XHR9XG5cdFx0cmV0dXJuIGVsZW07XG5cdH1cblxuXHRpZiAoIGRhdGEgPT0gbnVsbCAmJiBmbiA9PSBudWxsICkge1xuXG5cdFx0Ly8gKCB0eXBlcywgZm4gKVxuXHRcdGZuID0gc2VsZWN0b3I7XG5cdFx0ZGF0YSA9IHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKCBmbiA9PSBudWxsICkge1xuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuXG5cdFx0XHQvLyAoIHR5cGVzLCBzZWxlY3RvciwgZm4gKVxuXHRcdFx0Zm4gPSBkYXRhO1xuXHRcdFx0ZGF0YSA9IHVuZGVmaW5lZDtcblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyAoIHR5cGVzLCBkYXRhLCBmbiApXG5cdFx0XHRmbiA9IGRhdGE7XG5cdFx0XHRkYXRhID0gc2VsZWN0b3I7XG5cdFx0XHRzZWxlY3RvciA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblx0aWYgKCBmbiA9PT0gZmFsc2UgKSB7XG5cdFx0Zm4gPSByZXR1cm5GYWxzZTtcblx0fSBlbHNlIGlmICggIWZuICkge1xuXHRcdHJldHVybiBlbGVtO1xuXHR9XG5cblx0aWYgKCBvbmUgPT09IDEgKSB7XG5cdFx0b3JpZ0ZuID0gZm47XG5cdFx0Zm4gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cblx0XHRcdC8vIENhbiB1c2UgYW4gZW1wdHkgc2V0LCBzaW5jZSBldmVudCBjb250YWlucyB0aGUgaW5mb1xuXHRcdFx0alF1ZXJ5KCkub2ZmKCBldmVudCApO1xuXHRcdFx0cmV0dXJuIG9yaWdGbi5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0fTtcblxuXHRcdC8vIFVzZSBzYW1lIGd1aWQgc28gY2FsbGVyIGNhbiByZW1vdmUgdXNpbmcgb3JpZ0ZuXG5cdFx0Zm4uZ3VpZCA9IG9yaWdGbi5ndWlkIHx8ICggb3JpZ0ZuLmd1aWQgPSBqUXVlcnkuZ3VpZCsrICk7XG5cdH1cblx0cmV0dXJuIGVsZW0uZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0alF1ZXJ5LmV2ZW50LmFkZCggdGhpcywgdHlwZXMsIGZuLCBkYXRhLCBzZWxlY3RvciApO1xuXHR9ICk7XG59XG5cbi8qXG4gKiBIZWxwZXIgZnVuY3Rpb25zIGZvciBtYW5hZ2luZyBldmVudHMgLS0gbm90IHBhcnQgb2YgdGhlIHB1YmxpYyBpbnRlcmZhY2UuXG4gKiBQcm9wcyB0byBEZWFuIEVkd2FyZHMnIGFkZEV2ZW50IGxpYnJhcnkgZm9yIG1hbnkgb2YgdGhlIGlkZWFzLlxuICovXG5qUXVlcnkuZXZlbnQgPSB7XG5cblx0Z2xvYmFsOiB7fSxcblxuXHRhZGQ6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlcywgaGFuZGxlciwgZGF0YSwgc2VsZWN0b3IgKSB7XG5cblx0XHR2YXIgaGFuZGxlT2JqSW4sIGV2ZW50SGFuZGxlLCB0bXAsXG5cdFx0XHRldmVudHMsIHQsIGhhbmRsZU9iaixcblx0XHRcdHNwZWNpYWwsIGhhbmRsZXJzLCB0eXBlLCBuYW1lc3BhY2VzLCBvcmlnVHlwZSxcblx0XHRcdGVsZW1EYXRhID0gZGF0YVByaXYuZ2V0KCBlbGVtICk7XG5cblx0XHQvLyBEb24ndCBhdHRhY2ggZXZlbnRzIHRvIG5vRGF0YSBvciB0ZXh0L2NvbW1lbnQgbm9kZXMgKGJ1dCBhbGxvdyBwbGFpbiBvYmplY3RzKVxuXHRcdGlmICggIWVsZW1EYXRhICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIENhbGxlciBjYW4gcGFzcyBpbiBhbiBvYmplY3Qgb2YgY3VzdG9tIGRhdGEgaW4gbGlldSBvZiB0aGUgaGFuZGxlclxuXHRcdGlmICggaGFuZGxlci5oYW5kbGVyICkge1xuXHRcdFx0aGFuZGxlT2JqSW4gPSBoYW5kbGVyO1xuXHRcdFx0aGFuZGxlciA9IGhhbmRsZU9iakluLmhhbmRsZXI7XG5cdFx0XHRzZWxlY3RvciA9IGhhbmRsZU9iakluLnNlbGVjdG9yO1xuXHRcdH1cblxuXHRcdC8vIEVuc3VyZSB0aGF0IGludmFsaWQgc2VsZWN0b3JzIHRocm93IGV4Y2VwdGlvbnMgYXQgYXR0YWNoIHRpbWVcblx0XHQvLyBFdmFsdWF0ZSBhZ2FpbnN0IGRvY3VtZW50RWxlbWVudCBpbiBjYXNlIGVsZW0gaXMgYSBub24tZWxlbWVudCBub2RlIChlLmcuLCBkb2N1bWVudClcblx0XHRpZiAoIHNlbGVjdG9yICkge1xuXHRcdFx0alF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKCBkb2N1bWVudEVsZW1lbnQsIHNlbGVjdG9yICk7XG5cdFx0fVxuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgdGhlIGhhbmRsZXIgaGFzIGEgdW5pcXVlIElELCB1c2VkIHRvIGZpbmQvcmVtb3ZlIGl0IGxhdGVyXG5cdFx0aWYgKCAhaGFuZGxlci5ndWlkICkge1xuXHRcdFx0aGFuZGxlci5ndWlkID0galF1ZXJ5Lmd1aWQrKztcblx0XHR9XG5cblx0XHQvLyBJbml0IHRoZSBlbGVtZW50J3MgZXZlbnQgc3RydWN0dXJlIGFuZCBtYWluIGhhbmRsZXIsIGlmIHRoaXMgaXMgdGhlIGZpcnN0XG5cdFx0aWYgKCAhKCBldmVudHMgPSBlbGVtRGF0YS5ldmVudHMgKSApIHtcblx0XHRcdGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cyA9IHt9O1xuXHRcdH1cblx0XHRpZiAoICEoIGV2ZW50SGFuZGxlID0gZWxlbURhdGEuaGFuZGxlICkgKSB7XG5cdFx0XHRldmVudEhhbmRsZSA9IGVsZW1EYXRhLmhhbmRsZSA9IGZ1bmN0aW9uKCBlICkge1xuXG5cdFx0XHRcdC8vIERpc2NhcmQgdGhlIHNlY29uZCBldmVudCBvZiBhIGpRdWVyeS5ldmVudC50cmlnZ2VyKCkgYW5kXG5cdFx0XHRcdC8vIHdoZW4gYW4gZXZlbnQgaXMgY2FsbGVkIGFmdGVyIGEgcGFnZSBoYXMgdW5sb2FkZWRcblx0XHRcdFx0cmV0dXJuIHR5cGVvZiBqUXVlcnkgIT09IFwidW5kZWZpbmVkXCIgJiYgalF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCAhPT0gZS50eXBlID9cblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQuZGlzcGF0Y2guYXBwbHkoIGVsZW0sIGFyZ3VtZW50cyApIDogdW5kZWZpbmVkO1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyBIYW5kbGUgbXVsdGlwbGUgZXZlbnRzIHNlcGFyYXRlZCBieSBhIHNwYWNlXG5cdFx0dHlwZXMgPSAoIHR5cGVzIHx8IFwiXCIgKS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFsgXCJcIiBdO1xuXHRcdHQgPSB0eXBlcy5sZW5ndGg7XG5cdFx0d2hpbGUgKCB0LS0gKSB7XG5cdFx0XHR0bXAgPSBydHlwZW5hbWVzcGFjZS5leGVjKCB0eXBlc1sgdCBdICkgfHwgW107XG5cdFx0XHR0eXBlID0gb3JpZ1R5cGUgPSB0bXBbIDEgXTtcblx0XHRcdG5hbWVzcGFjZXMgPSAoIHRtcFsgMiBdIHx8IFwiXCIgKS5zcGxpdCggXCIuXCIgKS5zb3J0KCk7XG5cblx0XHRcdC8vIFRoZXJlICptdXN0KiBiZSBhIHR5cGUsIG5vIGF0dGFjaGluZyBuYW1lc3BhY2Utb25seSBoYW5kbGVyc1xuXHRcdFx0aWYgKCAhdHlwZSApIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGV2ZW50IGNoYW5nZXMgaXRzIHR5cGUsIHVzZSB0aGUgc3BlY2lhbCBldmVudCBoYW5kbGVycyBmb3IgdGhlIGNoYW5nZWQgdHlwZVxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cblx0XHRcdC8vIElmIHNlbGVjdG9yIGRlZmluZWQsIGRldGVybWluZSBzcGVjaWFsIGV2ZW50IGFwaSB0eXBlLCBvdGhlcndpc2UgZ2l2ZW4gdHlwZVxuXHRcdFx0dHlwZSA9ICggc2VsZWN0b3IgPyBzcGVjaWFsLmRlbGVnYXRlVHlwZSA6IHNwZWNpYWwuYmluZFR5cGUgKSB8fCB0eXBlO1xuXG5cdFx0XHQvLyBVcGRhdGUgc3BlY2lhbCBiYXNlZCBvbiBuZXdseSByZXNldCB0eXBlXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblxuXHRcdFx0Ly8gaGFuZGxlT2JqIGlzIHBhc3NlZCB0byBhbGwgZXZlbnQgaGFuZGxlcnNcblx0XHRcdGhhbmRsZU9iaiA9IGpRdWVyeS5leHRlbmQoIHtcblx0XHRcdFx0dHlwZTogdHlwZSxcblx0XHRcdFx0b3JpZ1R5cGU6IG9yaWdUeXBlLFxuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHRoYW5kbGVyOiBoYW5kbGVyLFxuXHRcdFx0XHRndWlkOiBoYW5kbGVyLmd1aWQsXG5cdFx0XHRcdHNlbGVjdG9yOiBzZWxlY3Rvcixcblx0XHRcdFx0bmVlZHNDb250ZXh0OiBzZWxlY3RvciAmJiBqUXVlcnkuZXhwci5tYXRjaC5uZWVkc0NvbnRleHQudGVzdCggc2VsZWN0b3IgKSxcblx0XHRcdFx0bmFtZXNwYWNlOiBuYW1lc3BhY2VzLmpvaW4oIFwiLlwiIClcblx0XHRcdH0sIGhhbmRsZU9iakluICk7XG5cblx0XHRcdC8vIEluaXQgdGhlIGV2ZW50IGhhbmRsZXIgcXVldWUgaWYgd2UncmUgdGhlIGZpcnN0XG5cdFx0XHRpZiAoICEoIGhhbmRsZXJzID0gZXZlbnRzWyB0eXBlIF0gKSApIHtcblx0XHRcdFx0aGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSA9IFtdO1xuXHRcdFx0XHRoYW5kbGVycy5kZWxlZ2F0ZUNvdW50ID0gMDtcblxuXHRcdFx0XHQvLyBPbmx5IHVzZSBhZGRFdmVudExpc3RlbmVyIGlmIHRoZSBzcGVjaWFsIGV2ZW50cyBoYW5kbGVyIHJldHVybnMgZmFsc2Vcblx0XHRcdFx0aWYgKCAhc3BlY2lhbC5zZXR1cCB8fFxuXHRcdFx0XHRcdHNwZWNpYWwuc2V0dXAuY2FsbCggZWxlbSwgZGF0YSwgbmFtZXNwYWNlcywgZXZlbnRIYW5kbGUgKSA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdFx0XHRpZiAoIGVsZW0uYWRkRXZlbnRMaXN0ZW5lciApIHtcblx0XHRcdFx0XHRcdGVsZW0uYWRkRXZlbnRMaXN0ZW5lciggdHlwZSwgZXZlbnRIYW5kbGUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBzcGVjaWFsLmFkZCApIHtcblx0XHRcdFx0c3BlY2lhbC5hZGQuY2FsbCggZWxlbSwgaGFuZGxlT2JqICk7XG5cblx0XHRcdFx0aWYgKCAhaGFuZGxlT2JqLmhhbmRsZXIuZ3VpZCApIHtcblx0XHRcdFx0XHRoYW5kbGVPYmouaGFuZGxlci5ndWlkID0gaGFuZGxlci5ndWlkO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCB0byB0aGUgZWxlbWVudCdzIGhhbmRsZXIgbGlzdCwgZGVsZWdhdGVzIGluIGZyb250XG5cdFx0XHRpZiAoIHNlbGVjdG9yICkge1xuXHRcdFx0XHRoYW5kbGVycy5zcGxpY2UoIGhhbmRsZXJzLmRlbGVnYXRlQ291bnQrKywgMCwgaGFuZGxlT2JqICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRoYW5kbGVycy5wdXNoKCBoYW5kbGVPYmogKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gS2VlcCB0cmFjayBvZiB3aGljaCBldmVudHMgaGF2ZSBldmVyIGJlZW4gdXNlZCwgZm9yIGV2ZW50IG9wdGltaXphdGlvblxuXHRcdFx0alF1ZXJ5LmV2ZW50Lmdsb2JhbFsgdHlwZSBdID0gdHJ1ZTtcblx0XHR9XG5cblx0fSxcblxuXHQvLyBEZXRhY2ggYW4gZXZlbnQgb3Igc2V0IG9mIGV2ZW50cyBmcm9tIGFuIGVsZW1lbnRcblx0cmVtb3ZlOiBmdW5jdGlvbiggZWxlbSwgdHlwZXMsIGhhbmRsZXIsIHNlbGVjdG9yLCBtYXBwZWRUeXBlcyApIHtcblxuXHRcdHZhciBqLCBvcmlnQ291bnQsIHRtcCxcblx0XHRcdGV2ZW50cywgdCwgaGFuZGxlT2JqLFxuXHRcdFx0c3BlY2lhbCwgaGFuZGxlcnMsIHR5cGUsIG5hbWVzcGFjZXMsIG9yaWdUeXBlLFxuXHRcdFx0ZWxlbURhdGEgPSBkYXRhUHJpdi5oYXNEYXRhKCBlbGVtICkgJiYgZGF0YVByaXYuZ2V0KCBlbGVtICk7XG5cblx0XHRpZiAoICFlbGVtRGF0YSB8fCAhKCBldmVudHMgPSBlbGVtRGF0YS5ldmVudHMgKSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBPbmNlIGZvciBlYWNoIHR5cGUubmFtZXNwYWNlIGluIHR5cGVzOyB0eXBlIG1heSBiZSBvbWl0dGVkXG5cdFx0dHlwZXMgPSAoIHR5cGVzIHx8IFwiXCIgKS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFsgXCJcIiBdO1xuXHRcdHQgPSB0eXBlcy5sZW5ndGg7XG5cdFx0d2hpbGUgKCB0LS0gKSB7XG5cdFx0XHR0bXAgPSBydHlwZW5hbWVzcGFjZS5leGVjKCB0eXBlc1sgdCBdICkgfHwgW107XG5cdFx0XHR0eXBlID0gb3JpZ1R5cGUgPSB0bXBbIDEgXTtcblx0XHRcdG5hbWVzcGFjZXMgPSAoIHRtcFsgMiBdIHx8IFwiXCIgKS5zcGxpdCggXCIuXCIgKS5zb3J0KCk7XG5cblx0XHRcdC8vIFVuYmluZCBhbGwgZXZlbnRzIChvbiB0aGlzIG5hbWVzcGFjZSwgaWYgcHJvdmlkZWQpIGZvciB0aGUgZWxlbWVudFxuXHRcdFx0aWYgKCAhdHlwZSApIHtcblx0XHRcdFx0Zm9yICggdHlwZSBpbiBldmVudHMgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnJlbW92ZSggZWxlbSwgdHlwZSArIHR5cGVzWyB0IF0sIGhhbmRsZXIsIHNlbGVjdG9yLCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXHRcdFx0dHlwZSA9ICggc2VsZWN0b3IgPyBzcGVjaWFsLmRlbGVnYXRlVHlwZSA6IHNwZWNpYWwuYmluZFR5cGUgKSB8fCB0eXBlO1xuXHRcdFx0aGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSB8fCBbXTtcblx0XHRcdHRtcCA9IHRtcFsgMiBdICYmXG5cdFx0XHRcdG5ldyBSZWdFeHAoIFwiKF58XFxcXC4pXCIgKyBuYW1lc3BhY2VzLmpvaW4oIFwiXFxcXC4oPzouKlxcXFwufClcIiApICsgXCIoXFxcXC58JClcIiApO1xuXG5cdFx0XHQvLyBSZW1vdmUgbWF0Y2hpbmcgZXZlbnRzXG5cdFx0XHRvcmlnQ291bnQgPSBqID0gaGFuZGxlcnMubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKCBqLS0gKSB7XG5cdFx0XHRcdGhhbmRsZU9iaiA9IGhhbmRsZXJzWyBqIF07XG5cblx0XHRcdFx0aWYgKCAoIG1hcHBlZFR5cGVzIHx8IG9yaWdUeXBlID09PSBoYW5kbGVPYmoub3JpZ1R5cGUgKSAmJlxuXHRcdFx0XHRcdCggIWhhbmRsZXIgfHwgaGFuZGxlci5ndWlkID09PSBoYW5kbGVPYmouZ3VpZCApICYmXG5cdFx0XHRcdFx0KCAhdG1wIHx8IHRtcC50ZXN0KCBoYW5kbGVPYmoubmFtZXNwYWNlICkgKSAmJlxuXHRcdFx0XHRcdCggIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSBoYW5kbGVPYmouc2VsZWN0b3IgfHxcblx0XHRcdFx0XHRcdHNlbGVjdG9yID09PSBcIioqXCIgJiYgaGFuZGxlT2JqLnNlbGVjdG9yICkgKSB7XG5cdFx0XHRcdFx0aGFuZGxlcnMuc3BsaWNlKCBqLCAxICk7XG5cblx0XHRcdFx0XHRpZiAoIGhhbmRsZU9iai5zZWxlY3RvciApIHtcblx0XHRcdFx0XHRcdGhhbmRsZXJzLmRlbGVnYXRlQ291bnQtLTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCBzcGVjaWFsLnJlbW92ZSApIHtcblx0XHRcdFx0XHRcdHNwZWNpYWwucmVtb3ZlLmNhbGwoIGVsZW0sIGhhbmRsZU9iaiApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZW1vdmUgZ2VuZXJpYyBldmVudCBoYW5kbGVyIGlmIHdlIHJlbW92ZWQgc29tZXRoaW5nIGFuZCBubyBtb3JlIGhhbmRsZXJzIGV4aXN0XG5cdFx0XHQvLyAoYXZvaWRzIHBvdGVudGlhbCBmb3IgZW5kbGVzcyByZWN1cnNpb24gZHVyaW5nIHJlbW92YWwgb2Ygc3BlY2lhbCBldmVudCBoYW5kbGVycylcblx0XHRcdGlmICggb3JpZ0NvdW50ICYmICFoYW5kbGVycy5sZW5ndGggKSB7XG5cdFx0XHRcdGlmICggIXNwZWNpYWwudGVhcmRvd24gfHxcblx0XHRcdFx0XHRzcGVjaWFsLnRlYXJkb3duLmNhbGwoIGVsZW0sIG5hbWVzcGFjZXMsIGVsZW1EYXRhLmhhbmRsZSApID09PSBmYWxzZSApIHtcblxuXHRcdFx0XHRcdGpRdWVyeS5yZW1vdmVFdmVudCggZWxlbSwgdHlwZSwgZWxlbURhdGEuaGFuZGxlICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkZWxldGUgZXZlbnRzWyB0eXBlIF07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUmVtb3ZlIGRhdGEgYW5kIHRoZSBleHBhbmRvIGlmIGl0J3Mgbm8gbG9uZ2VyIHVzZWRcblx0XHRpZiAoIGpRdWVyeS5pc0VtcHR5T2JqZWN0KCBldmVudHMgKSApIHtcblx0XHRcdGRhdGFQcml2LnJlbW92ZSggZWxlbSwgXCJoYW5kbGUgZXZlbnRzXCIgKTtcblx0XHR9XG5cdH0sXG5cblx0ZGlzcGF0Y2g6IGZ1bmN0aW9uKCBuYXRpdmVFdmVudCApIHtcblxuXHRcdC8vIE1ha2UgYSB3cml0YWJsZSBqUXVlcnkuRXZlbnQgZnJvbSB0aGUgbmF0aXZlIGV2ZW50IG9iamVjdFxuXHRcdHZhciBldmVudCA9IGpRdWVyeS5ldmVudC5maXgoIG5hdGl2ZUV2ZW50ICk7XG5cblx0XHR2YXIgaSwgaiwgcmV0LCBtYXRjaGVkLCBoYW5kbGVPYmosIGhhbmRsZXJRdWV1ZSxcblx0XHRcdGFyZ3MgPSBuZXcgQXJyYXkoIGFyZ3VtZW50cy5sZW5ndGggKSxcblx0XHRcdGhhbmRsZXJzID0gKCBkYXRhUHJpdi5nZXQoIHRoaXMsIFwiZXZlbnRzXCIgKSB8fCB7fSApWyBldmVudC50eXBlIF0gfHwgW10sXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIGV2ZW50LnR5cGUgXSB8fCB7fTtcblxuXHRcdC8vIFVzZSB0aGUgZml4LWVkIGpRdWVyeS5FdmVudCByYXRoZXIgdGhhbiB0aGUgKHJlYWQtb25seSkgbmF0aXZlIGV2ZW50XG5cdFx0YXJnc1sgMCBdID0gZXZlbnQ7XG5cblx0XHRmb3IgKCBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKyApIHtcblx0XHRcdGFyZ3NbIGkgXSA9IGFyZ3VtZW50c1sgaSBdO1xuXHRcdH1cblxuXHRcdGV2ZW50LmRlbGVnYXRlVGFyZ2V0ID0gdGhpcztcblxuXHRcdC8vIENhbGwgdGhlIHByZURpc3BhdGNoIGhvb2sgZm9yIHRoZSBtYXBwZWQgdHlwZSwgYW5kIGxldCBpdCBiYWlsIGlmIGRlc2lyZWRcblx0XHRpZiAoIHNwZWNpYWwucHJlRGlzcGF0Y2ggJiYgc3BlY2lhbC5wcmVEaXNwYXRjaC5jYWxsKCB0aGlzLCBldmVudCApID09PSBmYWxzZSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBEZXRlcm1pbmUgaGFuZGxlcnNcblx0XHRoYW5kbGVyUXVldWUgPSBqUXVlcnkuZXZlbnQuaGFuZGxlcnMuY2FsbCggdGhpcywgZXZlbnQsIGhhbmRsZXJzICk7XG5cblx0XHQvLyBSdW4gZGVsZWdhdGVzIGZpcnN0OyB0aGV5IG1heSB3YW50IHRvIHN0b3AgcHJvcGFnYXRpb24gYmVuZWF0aCB1c1xuXHRcdGkgPSAwO1xuXHRcdHdoaWxlICggKCBtYXRjaGVkID0gaGFuZGxlclF1ZXVlWyBpKysgXSApICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXHRcdFx0ZXZlbnQuY3VycmVudFRhcmdldCA9IG1hdGNoZWQuZWxlbTtcblxuXHRcdFx0aiA9IDA7XG5cdFx0XHR3aGlsZSAoICggaGFuZGxlT2JqID0gbWF0Y2hlZC5oYW5kbGVyc1sgaisrIF0gKSAmJlxuXHRcdFx0XHQhZXZlbnQuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcblxuXHRcdFx0XHQvLyBUcmlnZ2VyZWQgZXZlbnQgbXVzdCBlaXRoZXIgMSkgaGF2ZSBubyBuYW1lc3BhY2UsIG9yIDIpIGhhdmUgbmFtZXNwYWNlKHMpXG5cdFx0XHRcdC8vIGEgc3Vic2V0IG9yIGVxdWFsIHRvIHRob3NlIGluIHRoZSBib3VuZCBldmVudCAoYm90aCBjYW4gaGF2ZSBubyBuYW1lc3BhY2UpLlxuXHRcdFx0XHRpZiAoICFldmVudC5ybmFtZXNwYWNlIHx8IGV2ZW50LnJuYW1lc3BhY2UudGVzdCggaGFuZGxlT2JqLm5hbWVzcGFjZSApICkge1xuXG5cdFx0XHRcdFx0ZXZlbnQuaGFuZGxlT2JqID0gaGFuZGxlT2JqO1xuXHRcdFx0XHRcdGV2ZW50LmRhdGEgPSBoYW5kbGVPYmouZGF0YTtcblxuXHRcdFx0XHRcdHJldCA9ICggKCBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgaGFuZGxlT2JqLm9yaWdUeXBlIF0gfHwge30gKS5oYW5kbGUgfHxcblx0XHRcdFx0XHRcdGhhbmRsZU9iai5oYW5kbGVyICkuYXBwbHkoIG1hdGNoZWQuZWxlbSwgYXJncyApO1xuXG5cdFx0XHRcdFx0aWYgKCByZXQgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRcdGlmICggKCBldmVudC5yZXN1bHQgPSByZXQgKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENhbGwgdGhlIHBvc3REaXNwYXRjaCBob29rIGZvciB0aGUgbWFwcGVkIHR5cGVcblx0XHRpZiAoIHNwZWNpYWwucG9zdERpc3BhdGNoICkge1xuXHRcdFx0c3BlY2lhbC5wb3N0RGlzcGF0Y2guY2FsbCggdGhpcywgZXZlbnQgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZXZlbnQucmVzdWx0O1xuXHR9LFxuXG5cdGhhbmRsZXJzOiBmdW5jdGlvbiggZXZlbnQsIGhhbmRsZXJzICkge1xuXHRcdHZhciBpLCBoYW5kbGVPYmosIHNlbCwgbWF0Y2hlZEhhbmRsZXJzLCBtYXRjaGVkU2VsZWN0b3JzLFxuXHRcdFx0aGFuZGxlclF1ZXVlID0gW10sXG5cdFx0XHRkZWxlZ2F0ZUNvdW50ID0gaGFuZGxlcnMuZGVsZWdhdGVDb3VudCxcblx0XHRcdGN1ciA9IGV2ZW50LnRhcmdldDtcblxuXHRcdC8vIEZpbmQgZGVsZWdhdGUgaGFuZGxlcnNcblx0XHRpZiAoIGRlbGVnYXRlQ291bnQgJiZcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUUgPD05XG5cdFx0XHQvLyBCbGFjay1ob2xlIFNWRyA8dXNlPiBpbnN0YW5jZSB0cmVlcyAodHJhYy0xMzE4MClcblx0XHRcdGN1ci5ub2RlVHlwZSAmJlxuXG5cdFx0XHQvLyBTdXBwb3J0OiBGaXJlZm94IDw9NDJcblx0XHRcdC8vIFN1cHByZXNzIHNwZWMtdmlvbGF0aW5nIGNsaWNrcyBpbmRpY2F0aW5nIGEgbm9uLXByaW1hcnkgcG9pbnRlciBidXR0b24gKHRyYWMtMzg2MSlcblx0XHRcdC8vIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1FdmVudHMvI2V2ZW50LXR5cGUtY2xpY2tcblx0XHRcdC8vIFN1cHBvcnQ6IElFIDExIG9ubHlcblx0XHRcdC8vIC4uLmJ1dCBub3QgYXJyb3cga2V5IFwiY2xpY2tzXCIgb2YgcmFkaW8gaW5wdXRzLCB3aGljaCBjYW4gaGF2ZSBgYnV0dG9uYCAtMSAoZ2gtMjM0Mylcblx0XHRcdCEoIGV2ZW50LnR5cGUgPT09IFwiY2xpY2tcIiAmJiBldmVudC5idXR0b24gPj0gMSApICkge1xuXG5cdFx0XHRmb3IgKCA7IGN1ciAhPT0gdGhpczsgY3VyID0gY3VyLnBhcmVudE5vZGUgfHwgdGhpcyApIHtcblxuXHRcdFx0XHQvLyBEb24ndCBjaGVjayBub24tZWxlbWVudHMgKCMxMzIwOClcblx0XHRcdFx0Ly8gRG9uJ3QgcHJvY2VzcyBjbGlja3Mgb24gZGlzYWJsZWQgZWxlbWVudHMgKCM2OTExLCAjODE2NSwgIzExMzgyLCAjMTE3NjQpXG5cdFx0XHRcdGlmICggY3VyLm5vZGVUeXBlID09PSAxICYmICEoIGV2ZW50LnR5cGUgPT09IFwiY2xpY2tcIiAmJiBjdXIuZGlzYWJsZWQgPT09IHRydWUgKSApIHtcblx0XHRcdFx0XHRtYXRjaGVkSGFuZGxlcnMgPSBbXTtcblx0XHRcdFx0XHRtYXRjaGVkU2VsZWN0b3JzID0ge307XG5cdFx0XHRcdFx0Zm9yICggaSA9IDA7IGkgPCBkZWxlZ2F0ZUNvdW50OyBpKysgKSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVPYmogPSBoYW5kbGVyc1sgaSBdO1xuXG5cdFx0XHRcdFx0XHQvLyBEb24ndCBjb25mbGljdCB3aXRoIE9iamVjdC5wcm90b3R5cGUgcHJvcGVydGllcyAoIzEzMjAzKVxuXHRcdFx0XHRcdFx0c2VsID0gaGFuZGxlT2JqLnNlbGVjdG9yICsgXCIgXCI7XG5cblx0XHRcdFx0XHRcdGlmICggbWF0Y2hlZFNlbGVjdG9yc1sgc2VsIF0gPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRcdFx0bWF0Y2hlZFNlbGVjdG9yc1sgc2VsIF0gPSBoYW5kbGVPYmoubmVlZHNDb250ZXh0ID9cblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkoIHNlbCwgdGhpcyApLmluZGV4KCBjdXIgKSA+IC0xIDpcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuZmluZCggc2VsLCB0aGlzLCBudWxsLCBbIGN1ciBdICkubGVuZ3RoO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVkU2VsZWN0b3JzWyBzZWwgXSApIHtcblx0XHRcdFx0XHRcdFx0bWF0Y2hlZEhhbmRsZXJzLnB1c2goIGhhbmRsZU9iaiApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIG1hdGNoZWRIYW5kbGVycy5sZW5ndGggKSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVyUXVldWUucHVzaCggeyBlbGVtOiBjdXIsIGhhbmRsZXJzOiBtYXRjaGVkSGFuZGxlcnMgfSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEFkZCB0aGUgcmVtYWluaW5nIChkaXJlY3RseS1ib3VuZCkgaGFuZGxlcnNcblx0XHRjdXIgPSB0aGlzO1xuXHRcdGlmICggZGVsZWdhdGVDb3VudCA8IGhhbmRsZXJzLmxlbmd0aCApIHtcblx0XHRcdGhhbmRsZXJRdWV1ZS5wdXNoKCB7IGVsZW06IGN1ciwgaGFuZGxlcnM6IGhhbmRsZXJzLnNsaWNlKCBkZWxlZ2F0ZUNvdW50ICkgfSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBoYW5kbGVyUXVldWU7XG5cdH0sXG5cblx0YWRkUHJvcDogZnVuY3Rpb24oIG5hbWUsIGhvb2sgKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBqUXVlcnkuRXZlbnQucHJvdG90eXBlLCBuYW1lLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXG5cdFx0XHRnZXQ6IGpRdWVyeS5pc0Z1bmN0aW9uKCBob29rICkgP1xuXHRcdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoIHRoaXMub3JpZ2luYWxFdmVudCApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGhvb2soIHRoaXMub3JpZ2luYWxFdmVudCApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSA6XG5cdFx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmICggdGhpcy5vcmlnaW5hbEV2ZW50ICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5vcmlnaW5hbEV2ZW50WyBuYW1lIF07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCB0aGlzLCBuYW1lLCB7XG5cdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRcdFx0d3JpdGFibGU6IHRydWUsXG5cdFx0XHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0Zml4OiBmdW5jdGlvbiggb3JpZ2luYWxFdmVudCApIHtcblx0XHRyZXR1cm4gb3JpZ2luYWxFdmVudFsgalF1ZXJ5LmV4cGFuZG8gXSA/XG5cdFx0XHRvcmlnaW5hbEV2ZW50IDpcblx0XHRcdG5ldyBqUXVlcnkuRXZlbnQoIG9yaWdpbmFsRXZlbnQgKTtcblx0fSxcblxuXHRzcGVjaWFsOiB7XG5cdFx0bG9hZDoge1xuXG5cdFx0XHQvLyBQcmV2ZW50IHRyaWdnZXJlZCBpbWFnZS5sb2FkIGV2ZW50cyBmcm9tIGJ1YmJsaW5nIHRvIHdpbmRvdy5sb2FkXG5cdFx0XHRub0J1YmJsZTogdHJ1ZVxuXHRcdH0sXG5cdFx0Zm9jdXM6IHtcblxuXHRcdFx0Ly8gRmlyZSBuYXRpdmUgZXZlbnQgaWYgcG9zc2libGUgc28gYmx1ci9mb2N1cyBzZXF1ZW5jZSBpcyBjb3JyZWN0XG5cdFx0XHR0cmlnZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCB0aGlzICE9PSBzYWZlQWN0aXZlRWxlbWVudCgpICYmIHRoaXMuZm9jdXMgKSB7XG5cdFx0XHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGRlbGVnYXRlVHlwZTogXCJmb2N1c2luXCJcblx0XHR9LFxuXHRcdGJsdXI6IHtcblx0XHRcdHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIHRoaXMgPT09IHNhZmVBY3RpdmVFbGVtZW50KCkgJiYgdGhpcy5ibHVyICkge1xuXHRcdFx0XHRcdHRoaXMuYmx1cigpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGRlbGVnYXRlVHlwZTogXCJmb2N1c291dFwiXG5cdFx0fSxcblx0XHRjbGljazoge1xuXG5cdFx0XHQvLyBGb3IgY2hlY2tib3gsIGZpcmUgbmF0aXZlIGV2ZW50IHNvIGNoZWNrZWQgc3RhdGUgd2lsbCBiZSByaWdodFxuXHRcdFx0dHJpZ2dlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggdGhpcy50eXBlID09PSBcImNoZWNrYm94XCIgJiYgdGhpcy5jbGljayAmJiBub2RlTmFtZSggdGhpcywgXCJpbnB1dFwiICkgKSB7XG5cdFx0XHRcdFx0dGhpcy5jbGljaygpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0Ly8gRm9yIGNyb3NzLWJyb3dzZXIgY29uc2lzdGVuY3ksIGRvbid0IGZpcmUgbmF0aXZlIC5jbGljaygpIG9uIGxpbmtzXG5cdFx0XHRfZGVmYXVsdDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdFx0XHRyZXR1cm4gbm9kZU5hbWUoIGV2ZW50LnRhcmdldCwgXCJhXCIgKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0YmVmb3JldW5sb2FkOiB7XG5cdFx0XHRwb3N0RGlzcGF0Y2g6IGZ1bmN0aW9uKCBldmVudCApIHtcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBGaXJlZm94IDIwK1xuXHRcdFx0XHQvLyBGaXJlZm94IGRvZXNuJ3QgYWxlcnQgaWYgdGhlIHJldHVyblZhbHVlIGZpZWxkIGlzIG5vdCBzZXQuXG5cdFx0XHRcdGlmICggZXZlbnQucmVzdWx0ICE9PSB1bmRlZmluZWQgJiYgZXZlbnQub3JpZ2luYWxFdmVudCApIHtcblx0XHRcdFx0XHRldmVudC5vcmlnaW5hbEV2ZW50LnJldHVyblZhbHVlID0gZXZlbnQucmVzdWx0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuXG5qUXVlcnkucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbiggZWxlbSwgdHlwZSwgaGFuZGxlICkge1xuXG5cdC8vIFRoaXMgXCJpZlwiIGlzIG5lZWRlZCBmb3IgcGxhaW4gb2JqZWN0c1xuXHRpZiAoIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciApIHtcblx0XHRlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoIHR5cGUsIGhhbmRsZSApO1xuXHR9XG59O1xuXG5qUXVlcnkuRXZlbnQgPSBmdW5jdGlvbiggc3JjLCBwcm9wcyApIHtcblxuXHQvLyBBbGxvdyBpbnN0YW50aWF0aW9uIHdpdGhvdXQgdGhlICduZXcnIGtleXdvcmRcblx0aWYgKCAhKCB0aGlzIGluc3RhbmNlb2YgalF1ZXJ5LkV2ZW50ICkgKSB7XG5cdFx0cmV0dXJuIG5ldyBqUXVlcnkuRXZlbnQoIHNyYywgcHJvcHMgKTtcblx0fVxuXG5cdC8vIEV2ZW50IG9iamVjdFxuXHRpZiAoIHNyYyAmJiBzcmMudHlwZSApIHtcblx0XHR0aGlzLm9yaWdpbmFsRXZlbnQgPSBzcmM7XG5cdFx0dGhpcy50eXBlID0gc3JjLnR5cGU7XG5cblx0XHQvLyBFdmVudHMgYnViYmxpbmcgdXAgdGhlIGRvY3VtZW50IG1heSBoYXZlIGJlZW4gbWFya2VkIGFzIHByZXZlbnRlZFxuXHRcdC8vIGJ5IGEgaGFuZGxlciBsb3dlciBkb3duIHRoZSB0cmVlOyByZWZsZWN0IHRoZSBjb3JyZWN0IHZhbHVlLlxuXHRcdHRoaXMuaXNEZWZhdWx0UHJldmVudGVkID0gc3JjLmRlZmF1bHRQcmV2ZW50ZWQgfHxcblx0XHRcdFx0c3JjLmRlZmF1bHRQcmV2ZW50ZWQgPT09IHVuZGVmaW5lZCAmJlxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD0yLjMgb25seVxuXHRcdFx0XHRzcmMucmV0dXJuVmFsdWUgPT09IGZhbHNlID9cblx0XHRcdHJldHVyblRydWUgOlxuXHRcdFx0cmV0dXJuRmFsc2U7XG5cblx0XHQvLyBDcmVhdGUgdGFyZ2V0IHByb3BlcnRpZXNcblx0XHQvLyBTdXBwb3J0OiBTYWZhcmkgPD02IC0gNyBvbmx5XG5cdFx0Ly8gVGFyZ2V0IHNob3VsZCBub3QgYmUgYSB0ZXh0IG5vZGUgKCM1MDQsICMxMzE0Mylcblx0XHR0aGlzLnRhcmdldCA9ICggc3JjLnRhcmdldCAmJiBzcmMudGFyZ2V0Lm5vZGVUeXBlID09PSAzICkgP1xuXHRcdFx0c3JjLnRhcmdldC5wYXJlbnROb2RlIDpcblx0XHRcdHNyYy50YXJnZXQ7XG5cblx0XHR0aGlzLmN1cnJlbnRUYXJnZXQgPSBzcmMuY3VycmVudFRhcmdldDtcblx0XHR0aGlzLnJlbGF0ZWRUYXJnZXQgPSBzcmMucmVsYXRlZFRhcmdldDtcblxuXHQvLyBFdmVudCB0eXBlXG5cdH0gZWxzZSB7XG5cdFx0dGhpcy50eXBlID0gc3JjO1xuXHR9XG5cblx0Ly8gUHV0IGV4cGxpY2l0bHkgcHJvdmlkZWQgcHJvcGVydGllcyBvbnRvIHRoZSBldmVudCBvYmplY3Rcblx0aWYgKCBwcm9wcyApIHtcblx0XHRqUXVlcnkuZXh0ZW5kKCB0aGlzLCBwcm9wcyApO1xuXHR9XG5cblx0Ly8gQ3JlYXRlIGEgdGltZXN0YW1wIGlmIGluY29taW5nIGV2ZW50IGRvZXNuJ3QgaGF2ZSBvbmVcblx0dGhpcy50aW1lU3RhbXAgPSBzcmMgJiYgc3JjLnRpbWVTdGFtcCB8fCBqUXVlcnkubm93KCk7XG5cblx0Ly8gTWFyayBpdCBhcyBmaXhlZFxuXHR0aGlzWyBqUXVlcnkuZXhwYW5kbyBdID0gdHJ1ZTtcbn07XG5cbi8vIGpRdWVyeS5FdmVudCBpcyBiYXNlZCBvbiBET00zIEV2ZW50cyBhcyBzcGVjaWZpZWQgYnkgdGhlIEVDTUFTY3JpcHQgTGFuZ3VhZ2UgQmluZGluZ1xuLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSLzIwMDMvV0QtRE9NLUxldmVsLTMtRXZlbnRzLTIwMDMwMzMxL2VjbWEtc2NyaXB0LWJpbmRpbmcuaHRtbFxualF1ZXJ5LkV2ZW50LnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IGpRdWVyeS5FdmVudCxcblx0aXNEZWZhdWx0UHJldmVudGVkOiByZXR1cm5GYWxzZSxcblx0aXNQcm9wYWdhdGlvblN0b3BwZWQ6IHJldHVybkZhbHNlLFxuXHRpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZDogcmV0dXJuRmFsc2UsXG5cdGlzU2ltdWxhdGVkOiBmYWxzZSxcblxuXHRwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQ7XG5cblx0XHR0aGlzLmlzRGVmYXVsdFByZXZlbnRlZCA9IHJldHVyblRydWU7XG5cblx0XHRpZiAoIGUgJiYgIXRoaXMuaXNTaW11bGF0ZWQgKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXHR9LFxuXHRzdG9wUHJvcGFnYXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50O1xuXG5cdFx0dGhpcy5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVyblRydWU7XG5cblx0XHRpZiAoIGUgJiYgIXRoaXMuaXNTaW11bGF0ZWQgKSB7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH1cblx0fSxcblx0c3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcblxuXHRcdHRoaXMuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSByZXR1cm5UcnVlO1xuXG5cdFx0aWYgKCBlICYmICF0aGlzLmlzU2ltdWxhdGVkICkge1xuXHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cblx0XHR0aGlzLnN0b3BQcm9wYWdhdGlvbigpO1xuXHR9XG59O1xuXG4vLyBJbmNsdWRlcyBhbGwgY29tbW9uIGV2ZW50IHByb3BzIGluY2x1ZGluZyBLZXlFdmVudCBhbmQgTW91c2VFdmVudCBzcGVjaWZpYyBwcm9wc1xualF1ZXJ5LmVhY2goIHtcblx0YWx0S2V5OiB0cnVlLFxuXHRidWJibGVzOiB0cnVlLFxuXHRjYW5jZWxhYmxlOiB0cnVlLFxuXHRjaGFuZ2VkVG91Y2hlczogdHJ1ZSxcblx0Y3RybEtleTogdHJ1ZSxcblx0ZGV0YWlsOiB0cnVlLFxuXHRldmVudFBoYXNlOiB0cnVlLFxuXHRtZXRhS2V5OiB0cnVlLFxuXHRwYWdlWDogdHJ1ZSxcblx0cGFnZVk6IHRydWUsXG5cdHNoaWZ0S2V5OiB0cnVlLFxuXHR2aWV3OiB0cnVlLFxuXHRcImNoYXJcIjogdHJ1ZSxcblx0Y2hhckNvZGU6IHRydWUsXG5cdGtleTogdHJ1ZSxcblx0a2V5Q29kZTogdHJ1ZSxcblx0YnV0dG9uOiB0cnVlLFxuXHRidXR0b25zOiB0cnVlLFxuXHRjbGllbnRYOiB0cnVlLFxuXHRjbGllbnRZOiB0cnVlLFxuXHRvZmZzZXRYOiB0cnVlLFxuXHRvZmZzZXRZOiB0cnVlLFxuXHRwb2ludGVySWQ6IHRydWUsXG5cdHBvaW50ZXJUeXBlOiB0cnVlLFxuXHRzY3JlZW5YOiB0cnVlLFxuXHRzY3JlZW5ZOiB0cnVlLFxuXHR0YXJnZXRUb3VjaGVzOiB0cnVlLFxuXHR0b0VsZW1lbnQ6IHRydWUsXG5cdHRvdWNoZXM6IHRydWUsXG5cblx0d2hpY2g6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHR2YXIgYnV0dG9uID0gZXZlbnQuYnV0dG9uO1xuXG5cdFx0Ly8gQWRkIHdoaWNoIGZvciBrZXkgZXZlbnRzXG5cdFx0aWYgKCBldmVudC53aGljaCA9PSBudWxsICYmIHJrZXlFdmVudC50ZXN0KCBldmVudC50eXBlICkgKSB7XG5cdFx0XHRyZXR1cm4gZXZlbnQuY2hhckNvZGUgIT0gbnVsbCA/IGV2ZW50LmNoYXJDb2RlIDogZXZlbnQua2V5Q29kZTtcblx0XHR9XG5cblx0XHQvLyBBZGQgd2hpY2ggZm9yIGNsaWNrOiAxID09PSBsZWZ0OyAyID09PSBtaWRkbGU7IDMgPT09IHJpZ2h0XG5cdFx0aWYgKCAhZXZlbnQud2hpY2ggJiYgYnV0dG9uICE9PSB1bmRlZmluZWQgJiYgcm1vdXNlRXZlbnQudGVzdCggZXZlbnQudHlwZSApICkge1xuXHRcdFx0aWYgKCBidXR0b24gJiAxICkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBidXR0b24gJiAyICkge1xuXHRcdFx0XHRyZXR1cm4gMztcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBidXR0b24gJiA0ICkge1xuXHRcdFx0XHRyZXR1cm4gMjtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LndoaWNoO1xuXHR9XG59LCBqUXVlcnkuZXZlbnQuYWRkUHJvcCApO1xuXG4vLyBDcmVhdGUgbW91c2VlbnRlci9sZWF2ZSBldmVudHMgdXNpbmcgbW91c2VvdmVyL291dCBhbmQgZXZlbnQtdGltZSBjaGVja3Ncbi8vIHNvIHRoYXQgZXZlbnQgZGVsZWdhdGlvbiB3b3JrcyBpbiBqUXVlcnkuXG4vLyBEbyB0aGUgc2FtZSBmb3IgcG9pbnRlcmVudGVyL3BvaW50ZXJsZWF2ZSBhbmQgcG9pbnRlcm92ZXIvcG9pbnRlcm91dFxuLy9cbi8vIFN1cHBvcnQ6IFNhZmFyaSA3IG9ubHlcbi8vIFNhZmFyaSBzZW5kcyBtb3VzZWVudGVyIHRvbyBvZnRlbjsgc2VlOlxuLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDcwMjU4XG4vLyBmb3IgdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBidWcgKGl0IGV4aXN0ZWQgaW4gb2xkZXIgQ2hyb21lIHZlcnNpb25zIGFzIHdlbGwpLlxualF1ZXJ5LmVhY2goIHtcblx0bW91c2VlbnRlcjogXCJtb3VzZW92ZXJcIixcblx0bW91c2VsZWF2ZTogXCJtb3VzZW91dFwiLFxuXHRwb2ludGVyZW50ZXI6IFwicG9pbnRlcm92ZXJcIixcblx0cG9pbnRlcmxlYXZlOiBcInBvaW50ZXJvdXRcIlxufSwgZnVuY3Rpb24oIG9yaWcsIGZpeCApIHtcblx0alF1ZXJ5LmV2ZW50LnNwZWNpYWxbIG9yaWcgXSA9IHtcblx0XHRkZWxlZ2F0ZVR5cGU6IGZpeCxcblx0XHRiaW5kVHlwZTogZml4LFxuXG5cdFx0aGFuZGxlOiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHR2YXIgcmV0LFxuXHRcdFx0XHR0YXJnZXQgPSB0aGlzLFxuXHRcdFx0XHRyZWxhdGVkID0gZXZlbnQucmVsYXRlZFRhcmdldCxcblx0XHRcdFx0aGFuZGxlT2JqID0gZXZlbnQuaGFuZGxlT2JqO1xuXG5cdFx0XHQvLyBGb3IgbW91c2VlbnRlci9sZWF2ZSBjYWxsIHRoZSBoYW5kbGVyIGlmIHJlbGF0ZWQgaXMgb3V0c2lkZSB0aGUgdGFyZ2V0LlxuXHRcdFx0Ly8gTkI6IE5vIHJlbGF0ZWRUYXJnZXQgaWYgdGhlIG1vdXNlIGxlZnQvZW50ZXJlZCB0aGUgYnJvd3NlciB3aW5kb3dcblx0XHRcdGlmICggIXJlbGF0ZWQgfHwgKCByZWxhdGVkICE9PSB0YXJnZXQgJiYgIWpRdWVyeS5jb250YWlucyggdGFyZ2V0LCByZWxhdGVkICkgKSApIHtcblx0XHRcdFx0ZXZlbnQudHlwZSA9IGhhbmRsZU9iai5vcmlnVHlwZTtcblx0XHRcdFx0cmV0ID0gaGFuZGxlT2JqLmhhbmRsZXIuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRldmVudC50eXBlID0gZml4O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJldDtcblx0XHR9XG5cdH07XG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblxuXHRvbjogZnVuY3Rpb24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKSB7XG5cdFx0cmV0dXJuIG9uKCB0aGlzLCB0eXBlcywgc2VsZWN0b3IsIGRhdGEsIGZuICk7XG5cdH0sXG5cdG9uZTogZnVuY3Rpb24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKSB7XG5cdFx0cmV0dXJuIG9uKCB0aGlzLCB0eXBlcywgc2VsZWN0b3IsIGRhdGEsIGZuLCAxICk7XG5cdH0sXG5cdG9mZjogZnVuY3Rpb24oIHR5cGVzLCBzZWxlY3RvciwgZm4gKSB7XG5cdFx0dmFyIGhhbmRsZU9iaiwgdHlwZTtcblx0XHRpZiAoIHR5cGVzICYmIHR5cGVzLnByZXZlbnREZWZhdWx0ICYmIHR5cGVzLmhhbmRsZU9iaiApIHtcblxuXHRcdFx0Ly8gKCBldmVudCApICBkaXNwYXRjaGVkIGpRdWVyeS5FdmVudFxuXHRcdFx0aGFuZGxlT2JqID0gdHlwZXMuaGFuZGxlT2JqO1xuXHRcdFx0alF1ZXJ5KCB0eXBlcy5kZWxlZ2F0ZVRhcmdldCApLm9mZihcblx0XHRcdFx0aGFuZGxlT2JqLm5hbWVzcGFjZSA/XG5cdFx0XHRcdFx0aGFuZGxlT2JqLm9yaWdUeXBlICsgXCIuXCIgKyBoYW5kbGVPYmoubmFtZXNwYWNlIDpcblx0XHRcdFx0XHRoYW5kbGVPYmoub3JpZ1R5cGUsXG5cdFx0XHRcdGhhbmRsZU9iai5zZWxlY3Rvcixcblx0XHRcdFx0aGFuZGxlT2JqLmhhbmRsZXJcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cdFx0aWYgKCB0eXBlb2YgdHlwZXMgPT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHRcdC8vICggdHlwZXMtb2JqZWN0IFssIHNlbGVjdG9yXSApXG5cdFx0XHRmb3IgKCB0eXBlIGluIHR5cGVzICkge1xuXHRcdFx0XHR0aGlzLm9mZiggdHlwZSwgc2VsZWN0b3IsIHR5cGVzWyB0eXBlIF0gKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0XHRpZiAoIHNlbGVjdG9yID09PSBmYWxzZSB8fCB0eXBlb2Ygc2VsZWN0b3IgPT09IFwiZnVuY3Rpb25cIiApIHtcblxuXHRcdFx0Ly8gKCB0eXBlcyBbLCBmbl0gKVxuXHRcdFx0Zm4gPSBzZWxlY3Rvcjtcblx0XHRcdHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHRpZiAoIGZuID09PSBmYWxzZSApIHtcblx0XHRcdGZuID0gcmV0dXJuRmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5LmV2ZW50LnJlbW92ZSggdGhpcywgdHlwZXMsIGZuLCBzZWxlY3RvciApO1xuXHRcdH0gKTtcblx0fVxufSApO1xuXG5cbnZhclxuXG5cdC8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cblxuXHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VzbGludC9lc2xpbnQvaXNzdWVzLzMyMjlcblx0cnhodG1sVGFnID0gLzwoPyFhcmVhfGJyfGNvbHxlbWJlZHxocnxpbWd8aW5wdXR8bGlua3xtZXRhfHBhcmFtKSgoW2Etel1bXlxcL1xcMD5cXHgyMFxcdFxcclxcblxcZl0qKVtePl0qKVxcLz4vZ2ksXG5cblx0LyogZXNsaW50LWVuYWJsZSAqL1xuXG5cdC8vIFN1cHBvcnQ6IElFIDw9MTAgLSAxMSwgRWRnZSAxMiAtIDEzXG5cdC8vIEluIElFL0VkZ2UgdXNpbmcgcmVnZXggZ3JvdXBzIGhlcmUgY2F1c2VzIHNldmVyZSBzbG93ZG93bnMuXG5cdC8vIFNlZSBodHRwczovL2Nvbm5lY3QubWljcm9zb2Z0LmNvbS9JRS9mZWVkYmFjay9kZXRhaWxzLzE3MzY1MTIvXG5cdHJub0lubmVyaHRtbCA9IC88c2NyaXB0fDxzdHlsZXw8bGluay9pLFxuXG5cdC8vIGNoZWNrZWQ9XCJjaGVja2VkXCIgb3IgY2hlY2tlZFxuXHRyY2hlY2tlZCA9IC9jaGVja2VkXFxzKig/OltePV18PVxccyouY2hlY2tlZC4pL2ksXG5cdHJzY3JpcHRUeXBlTWFza2VkID0gL150cnVlXFwvKC4qKS8sXG5cdHJjbGVhblNjcmlwdCA9IC9eXFxzKjwhKD86XFxbQ0RBVEFcXFt8LS0pfCg/OlxcXVxcXXwtLSk+XFxzKiQvZztcblxuLy8gUHJlZmVyIGEgdGJvZHkgb3ZlciBpdHMgcGFyZW50IHRhYmxlIGZvciBjb250YWluaW5nIG5ldyByb3dzXG5mdW5jdGlvbiBtYW5pcHVsYXRpb25UYXJnZXQoIGVsZW0sIGNvbnRlbnQgKSB7XG5cdGlmICggbm9kZU5hbWUoIGVsZW0sIFwidGFibGVcIiApICYmXG5cdFx0bm9kZU5hbWUoIGNvbnRlbnQubm9kZVR5cGUgIT09IDExID8gY29udGVudCA6IGNvbnRlbnQuZmlyc3RDaGlsZCwgXCJ0clwiICkgKSB7XG5cblx0XHRyZXR1cm4galF1ZXJ5KCBcIj50Ym9keVwiLCBlbGVtIClbIDAgXSB8fCBlbGVtO1xuXHR9XG5cblx0cmV0dXJuIGVsZW07XG59XG5cbi8vIFJlcGxhY2UvcmVzdG9yZSB0aGUgdHlwZSBhdHRyaWJ1dGUgb2Ygc2NyaXB0IGVsZW1lbnRzIGZvciBzYWZlIERPTSBtYW5pcHVsYXRpb25cbmZ1bmN0aW9uIGRpc2FibGVTY3JpcHQoIGVsZW0gKSB7XG5cdGVsZW0udHlwZSA9ICggZWxlbS5nZXRBdHRyaWJ1dGUoIFwidHlwZVwiICkgIT09IG51bGwgKSArIFwiL1wiICsgZWxlbS50eXBlO1xuXHRyZXR1cm4gZWxlbTtcbn1cbmZ1bmN0aW9uIHJlc3RvcmVTY3JpcHQoIGVsZW0gKSB7XG5cdHZhciBtYXRjaCA9IHJzY3JpcHRUeXBlTWFza2VkLmV4ZWMoIGVsZW0udHlwZSApO1xuXG5cdGlmICggbWF0Y2ggKSB7XG5cdFx0ZWxlbS50eXBlID0gbWF0Y2hbIDEgXTtcblx0fSBlbHNlIHtcblx0XHRlbGVtLnJlbW92ZUF0dHJpYnV0ZSggXCJ0eXBlXCIgKTtcblx0fVxuXG5cdHJldHVybiBlbGVtO1xufVxuXG5mdW5jdGlvbiBjbG9uZUNvcHlFdmVudCggc3JjLCBkZXN0ICkge1xuXHR2YXIgaSwgbCwgdHlwZSwgcGRhdGFPbGQsIHBkYXRhQ3VyLCB1ZGF0YU9sZCwgdWRhdGFDdXIsIGV2ZW50cztcblxuXHRpZiAoIGRlc3Qubm9kZVR5cGUgIT09IDEgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gMS4gQ29weSBwcml2YXRlIGRhdGE6IGV2ZW50cywgaGFuZGxlcnMsIGV0Yy5cblx0aWYgKCBkYXRhUHJpdi5oYXNEYXRhKCBzcmMgKSApIHtcblx0XHRwZGF0YU9sZCA9IGRhdGFQcml2LmFjY2Vzcyggc3JjICk7XG5cdFx0cGRhdGFDdXIgPSBkYXRhUHJpdi5zZXQoIGRlc3QsIHBkYXRhT2xkICk7XG5cdFx0ZXZlbnRzID0gcGRhdGFPbGQuZXZlbnRzO1xuXG5cdFx0aWYgKCBldmVudHMgKSB7XG5cdFx0XHRkZWxldGUgcGRhdGFDdXIuaGFuZGxlO1xuXHRcdFx0cGRhdGFDdXIuZXZlbnRzID0ge307XG5cblx0XHRcdGZvciAoIHR5cGUgaW4gZXZlbnRzICkge1xuXHRcdFx0XHRmb3IgKCBpID0gMCwgbCA9IGV2ZW50c1sgdHlwZSBdLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQuYWRkKCBkZXN0LCB0eXBlLCBldmVudHNbIHR5cGUgXVsgaSBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyAyLiBDb3B5IHVzZXIgZGF0YVxuXHRpZiAoIGRhdGFVc2VyLmhhc0RhdGEoIHNyYyApICkge1xuXHRcdHVkYXRhT2xkID0gZGF0YVVzZXIuYWNjZXNzKCBzcmMgKTtcblx0XHR1ZGF0YUN1ciA9IGpRdWVyeS5leHRlbmQoIHt9LCB1ZGF0YU9sZCApO1xuXG5cdFx0ZGF0YVVzZXIuc2V0KCBkZXN0LCB1ZGF0YUN1ciApO1xuXHR9XG59XG5cbi8vIEZpeCBJRSBidWdzLCBzZWUgc3VwcG9ydCB0ZXN0c1xuZnVuY3Rpb24gZml4SW5wdXQoIHNyYywgZGVzdCApIHtcblx0dmFyIG5vZGVOYW1lID0gZGVzdC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG5cdC8vIEZhaWxzIHRvIHBlcnNpc3QgdGhlIGNoZWNrZWQgc3RhdGUgb2YgYSBjbG9uZWQgY2hlY2tib3ggb3IgcmFkaW8gYnV0dG9uLlxuXHRpZiAoIG5vZGVOYW1lID09PSBcImlucHV0XCIgJiYgcmNoZWNrYWJsZVR5cGUudGVzdCggc3JjLnR5cGUgKSApIHtcblx0XHRkZXN0LmNoZWNrZWQgPSBzcmMuY2hlY2tlZDtcblxuXHQvLyBGYWlscyB0byByZXR1cm4gdGhlIHNlbGVjdGVkIG9wdGlvbiB0byB0aGUgZGVmYXVsdCBzZWxlY3RlZCBzdGF0ZSB3aGVuIGNsb25pbmcgb3B0aW9uc1xuXHR9IGVsc2UgaWYgKCBub2RlTmFtZSA9PT0gXCJpbnB1dFwiIHx8IG5vZGVOYW1lID09PSBcInRleHRhcmVhXCIgKSB7XG5cdFx0ZGVzdC5kZWZhdWx0VmFsdWUgPSBzcmMuZGVmYXVsdFZhbHVlO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGRvbU1hbmlwKCBjb2xsZWN0aW9uLCBhcmdzLCBjYWxsYmFjaywgaWdub3JlZCApIHtcblxuXHQvLyBGbGF0dGVuIGFueSBuZXN0ZWQgYXJyYXlzXG5cdGFyZ3MgPSBjb25jYXQuYXBwbHkoIFtdLCBhcmdzICk7XG5cblx0dmFyIGZyYWdtZW50LCBmaXJzdCwgc2NyaXB0cywgaGFzU2NyaXB0cywgbm9kZSwgZG9jLFxuXHRcdGkgPSAwLFxuXHRcdGwgPSBjb2xsZWN0aW9uLmxlbmd0aCxcblx0XHRpTm9DbG9uZSA9IGwgLSAxLFxuXHRcdHZhbHVlID0gYXJnc1sgMCBdLFxuXHRcdGlzRnVuY3Rpb24gPSBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKTtcblxuXHQvLyBXZSBjYW4ndCBjbG9uZU5vZGUgZnJhZ21lbnRzIHRoYXQgY29udGFpbiBjaGVja2VkLCBpbiBXZWJLaXRcblx0aWYgKCBpc0Z1bmN0aW9uIHx8XG5cdFx0XHQoIGwgPiAxICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJlxuXHRcdFx0XHQhc3VwcG9ydC5jaGVja0Nsb25lICYmIHJjaGVja2VkLnRlc3QoIHZhbHVlICkgKSApIHtcblx0XHRyZXR1cm4gY29sbGVjdGlvbi5lYWNoKCBmdW5jdGlvbiggaW5kZXggKSB7XG5cdFx0XHR2YXIgc2VsZiA9IGNvbGxlY3Rpb24uZXEoIGluZGV4ICk7XG5cdFx0XHRpZiAoIGlzRnVuY3Rpb24gKSB7XG5cdFx0XHRcdGFyZ3NbIDAgXSA9IHZhbHVlLmNhbGwoIHRoaXMsIGluZGV4LCBzZWxmLmh0bWwoKSApO1xuXHRcdFx0fVxuXHRcdFx0ZG9tTWFuaXAoIHNlbGYsIGFyZ3MsIGNhbGxiYWNrLCBpZ25vcmVkICk7XG5cdFx0fSApO1xuXHR9XG5cblx0aWYgKCBsICkge1xuXHRcdGZyYWdtZW50ID0gYnVpbGRGcmFnbWVudCggYXJncywgY29sbGVjdGlvblsgMCBdLm93bmVyRG9jdW1lbnQsIGZhbHNlLCBjb2xsZWN0aW9uLCBpZ25vcmVkICk7XG5cdFx0Zmlyc3QgPSBmcmFnbWVudC5maXJzdENoaWxkO1xuXG5cdFx0aWYgKCBmcmFnbWVudC5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSApIHtcblx0XHRcdGZyYWdtZW50ID0gZmlyc3Q7XG5cdFx0fVxuXG5cdFx0Ly8gUmVxdWlyZSBlaXRoZXIgbmV3IGNvbnRlbnQgb3IgYW4gaW50ZXJlc3QgaW4gaWdub3JlZCBlbGVtZW50cyB0byBpbnZva2UgdGhlIGNhbGxiYWNrXG5cdFx0aWYgKCBmaXJzdCB8fCBpZ25vcmVkICkge1xuXHRcdFx0c2NyaXB0cyA9IGpRdWVyeS5tYXAoIGdldEFsbCggZnJhZ21lbnQsIFwic2NyaXB0XCIgKSwgZGlzYWJsZVNjcmlwdCApO1xuXHRcdFx0aGFzU2NyaXB0cyA9IHNjcmlwdHMubGVuZ3RoO1xuXG5cdFx0XHQvLyBVc2UgdGhlIG9yaWdpbmFsIGZyYWdtZW50IGZvciB0aGUgbGFzdCBpdGVtXG5cdFx0XHQvLyBpbnN0ZWFkIG9mIHRoZSBmaXJzdCBiZWNhdXNlIGl0IGNhbiBlbmQgdXBcblx0XHRcdC8vIGJlaW5nIGVtcHRpZWQgaW5jb3JyZWN0bHkgaW4gY2VydGFpbiBzaXR1YXRpb25zICgjODA3MCkuXG5cdFx0XHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdG5vZGUgPSBmcmFnbWVudDtcblxuXHRcdFx0XHRpZiAoIGkgIT09IGlOb0Nsb25lICkge1xuXHRcdFx0XHRcdG5vZGUgPSBqUXVlcnkuY2xvbmUoIG5vZGUsIHRydWUsIHRydWUgKTtcblxuXHRcdFx0XHRcdC8vIEtlZXAgcmVmZXJlbmNlcyB0byBjbG9uZWQgc2NyaXB0cyBmb3IgbGF0ZXIgcmVzdG9yYXRpb25cblx0XHRcdFx0XHRpZiAoIGhhc1NjcmlwdHMgKSB7XG5cblx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seSwgUGhhbnRvbUpTIDEgb25seVxuXHRcdFx0XHRcdFx0Ly8gcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRcdFx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCBzY3JpcHRzLCBnZXRBbGwoIG5vZGUsIFwic2NyaXB0XCIgKSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNhbGxiYWNrLmNhbGwoIGNvbGxlY3Rpb25bIGkgXSwgbm9kZSwgaSApO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGhhc1NjcmlwdHMgKSB7XG5cdFx0XHRcdGRvYyA9IHNjcmlwdHNbIHNjcmlwdHMubGVuZ3RoIC0gMSBdLm93bmVyRG9jdW1lbnQ7XG5cblx0XHRcdFx0Ly8gUmVlbmFibGUgc2NyaXB0c1xuXHRcdFx0XHRqUXVlcnkubWFwKCBzY3JpcHRzLCByZXN0b3JlU2NyaXB0ICk7XG5cblx0XHRcdFx0Ly8gRXZhbHVhdGUgZXhlY3V0YWJsZSBzY3JpcHRzIG9uIGZpcnN0IGRvY3VtZW50IGluc2VydGlvblxuXHRcdFx0XHRmb3IgKCBpID0gMDsgaSA8IGhhc1NjcmlwdHM7IGkrKyApIHtcblx0XHRcdFx0XHRub2RlID0gc2NyaXB0c1sgaSBdO1xuXHRcdFx0XHRcdGlmICggcnNjcmlwdFR5cGUudGVzdCggbm9kZS50eXBlIHx8IFwiXCIgKSAmJlxuXHRcdFx0XHRcdFx0IWRhdGFQcml2LmFjY2Vzcyggbm9kZSwgXCJnbG9iYWxFdmFsXCIgKSAmJlxuXHRcdFx0XHRcdFx0alF1ZXJ5LmNvbnRhaW5zKCBkb2MsIG5vZGUgKSApIHtcblxuXHRcdFx0XHRcdFx0aWYgKCBub2RlLnNyYyApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBPcHRpb25hbCBBSkFYIGRlcGVuZGVuY3ksIGJ1dCB3b24ndCBydW4gc2NyaXB0cyBpZiBub3QgcHJlc2VudFxuXHRcdFx0XHRcdFx0XHRpZiAoIGpRdWVyeS5fZXZhbFVybCApIHtcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuX2V2YWxVcmwoIG5vZGUuc3JjICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdERPTUV2YWwoIG5vZGUudGV4dENvbnRlbnQucmVwbGFjZSggcmNsZWFuU2NyaXB0LCBcIlwiICksIGRvYyApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjb2xsZWN0aW9uO1xufVxuXG5mdW5jdGlvbiByZW1vdmUoIGVsZW0sIHNlbGVjdG9yLCBrZWVwRGF0YSApIHtcblx0dmFyIG5vZGUsXG5cdFx0bm9kZXMgPSBzZWxlY3RvciA/IGpRdWVyeS5maWx0ZXIoIHNlbGVjdG9yLCBlbGVtICkgOiBlbGVtLFxuXHRcdGkgPSAwO1xuXG5cdGZvciAoIDsgKCBub2RlID0gbm9kZXNbIGkgXSApICE9IG51bGw7IGkrKyApIHtcblx0XHRpZiAoICFrZWVwRGF0YSAmJiBub2RlLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0alF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCBub2RlICkgKTtcblx0XHR9XG5cblx0XHRpZiAoIG5vZGUucGFyZW50Tm9kZSApIHtcblx0XHRcdGlmICgga2VlcERhdGEgJiYgalF1ZXJ5LmNvbnRhaW5zKCBub2RlLm93bmVyRG9jdW1lbnQsIG5vZGUgKSApIHtcblx0XHRcdFx0c2V0R2xvYmFsRXZhbCggZ2V0QWxsKCBub2RlLCBcInNjcmlwdFwiICkgKTtcblx0XHRcdH1cblx0XHRcdG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggbm9kZSApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBlbGVtO1xufVxuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cdGh0bWxQcmVmaWx0ZXI6IGZ1bmN0aW9uKCBodG1sICkge1xuXHRcdHJldHVybiBodG1sLnJlcGxhY2UoIHJ4aHRtbFRhZywgXCI8JDE+PC8kMj5cIiApO1xuXHR9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiggZWxlbSwgZGF0YUFuZEV2ZW50cywgZGVlcERhdGFBbmRFdmVudHMgKSB7XG5cdFx0dmFyIGksIGwsIHNyY0VsZW1lbnRzLCBkZXN0RWxlbWVudHMsXG5cdFx0XHRjbG9uZSA9IGVsZW0uY2xvbmVOb2RlKCB0cnVlICksXG5cdFx0XHRpblBhZ2UgPSBqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApO1xuXG5cdFx0Ly8gRml4IElFIGNsb25pbmcgaXNzdWVzXG5cdFx0aWYgKCAhc3VwcG9ydC5ub0Nsb25lQ2hlY2tlZCAmJiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgZWxlbS5ub2RlVHlwZSA9PT0gMTEgKSAmJlxuXHRcdFx0XHQhalF1ZXJ5LmlzWE1MRG9jKCBlbGVtICkgKSB7XG5cblx0XHRcdC8vIFdlIGVzY2hldyBTaXp6bGUgaGVyZSBmb3IgcGVyZm9ybWFuY2UgcmVhc29uczogaHR0cHM6Ly9qc3BlcmYuY29tL2dldGFsbC12cy1zaXp6bGUvMlxuXHRcdFx0ZGVzdEVsZW1lbnRzID0gZ2V0QWxsKCBjbG9uZSApO1xuXHRcdFx0c3JjRWxlbWVudHMgPSBnZXRBbGwoIGVsZW0gKTtcblxuXHRcdFx0Zm9yICggaSA9IDAsIGwgPSBzcmNFbGVtZW50cy5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdGZpeElucHV0KCBzcmNFbGVtZW50c1sgaSBdLCBkZXN0RWxlbWVudHNbIGkgXSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENvcHkgdGhlIGV2ZW50cyBmcm9tIHRoZSBvcmlnaW5hbCB0byB0aGUgY2xvbmVcblx0XHRpZiAoIGRhdGFBbmRFdmVudHMgKSB7XG5cdFx0XHRpZiAoIGRlZXBEYXRhQW5kRXZlbnRzICkge1xuXHRcdFx0XHRzcmNFbGVtZW50cyA9IHNyY0VsZW1lbnRzIHx8IGdldEFsbCggZWxlbSApO1xuXHRcdFx0XHRkZXN0RWxlbWVudHMgPSBkZXN0RWxlbWVudHMgfHwgZ2V0QWxsKCBjbG9uZSApO1xuXG5cdFx0XHRcdGZvciAoIGkgPSAwLCBsID0gc3JjRWxlbWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRcdGNsb25lQ29weUV2ZW50KCBzcmNFbGVtZW50c1sgaSBdLCBkZXN0RWxlbWVudHNbIGkgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjbG9uZUNvcHlFdmVudCggZWxlbSwgY2xvbmUgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBQcmVzZXJ2ZSBzY3JpcHQgZXZhbHVhdGlvbiBoaXN0b3J5XG5cdFx0ZGVzdEVsZW1lbnRzID0gZ2V0QWxsKCBjbG9uZSwgXCJzY3JpcHRcIiApO1xuXHRcdGlmICggZGVzdEVsZW1lbnRzLmxlbmd0aCA+IDAgKSB7XG5cdFx0XHRzZXRHbG9iYWxFdmFsKCBkZXN0RWxlbWVudHMsICFpblBhZ2UgJiYgZ2V0QWxsKCBlbGVtLCBcInNjcmlwdFwiICkgKTtcblx0XHR9XG5cblx0XHQvLyBSZXR1cm4gdGhlIGNsb25lZCBzZXRcblx0XHRyZXR1cm4gY2xvbmU7XG5cdH0sXG5cblx0Y2xlYW5EYXRhOiBmdW5jdGlvbiggZWxlbXMgKSB7XG5cdFx0dmFyIGRhdGEsIGVsZW0sIHR5cGUsXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWwsXG5cdFx0XHRpID0gMDtcblxuXHRcdGZvciAoIDsgKCBlbGVtID0gZWxlbXNbIGkgXSApICE9PSB1bmRlZmluZWQ7IGkrKyApIHtcblx0XHRcdGlmICggYWNjZXB0RGF0YSggZWxlbSApICkge1xuXHRcdFx0XHRpZiAoICggZGF0YSA9IGVsZW1bIGRhdGFQcml2LmV4cGFuZG8gXSApICkge1xuXHRcdFx0XHRcdGlmICggZGF0YS5ldmVudHMgKSB7XG5cdFx0XHRcdFx0XHRmb3IgKCB0eXBlIGluIGRhdGEuZXZlbnRzICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoIHNwZWNpYWxbIHR5cGUgXSApIHtcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuZXZlbnQucmVtb3ZlKCBlbGVtLCB0eXBlICk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gVGhpcyBpcyBhIHNob3J0Y3V0IHRvIGF2b2lkIGpRdWVyeS5ldmVudC5yZW1vdmUncyBvdmVyaGVhZFxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5yZW1vdmVFdmVudCggZWxlbSwgdHlwZSwgZGF0YS5oYW5kbGUgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IENocm9tZSA8PTM1IC0gNDUrXG5cdFx0XHRcdFx0Ly8gQXNzaWduIHVuZGVmaW5lZCBpbnN0ZWFkIG9mIHVzaW5nIGRlbGV0ZSwgc2VlIERhdGEjcmVtb3ZlXG5cdFx0XHRcdFx0ZWxlbVsgZGF0YVByaXYuZXhwYW5kbyBdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggZWxlbVsgZGF0YVVzZXIuZXhwYW5kbyBdICkge1xuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lIDw9MzUgLSA0NStcblx0XHRcdFx0XHQvLyBBc3NpZ24gdW5kZWZpbmVkIGluc3RlYWQgb2YgdXNpbmcgZGVsZXRlLCBzZWUgRGF0YSNyZW1vdmVcblx0XHRcdFx0XHRlbGVtWyBkYXRhVXNlci5leHBhbmRvIF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRkZXRhY2g6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gcmVtb3ZlKCB0aGlzLCBzZWxlY3RvciwgdHJ1ZSApO1xuXHR9LFxuXG5cdHJlbW92ZTogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiByZW1vdmUoIHRoaXMsIHNlbGVjdG9yICk7XG5cdH0sXG5cblx0dGV4dDogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID9cblx0XHRcdFx0alF1ZXJ5LnRleHQoIHRoaXMgKSA6XG5cdFx0XHRcdHRoaXMuZW1wdHkoKS5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoIHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0XHRcdHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKTtcblx0XHR9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCApO1xuXHR9LFxuXG5cdGFwcGVuZDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLm5vZGVUeXBlID09PSAxIHx8IHRoaXMubm9kZVR5cGUgPT09IDExIHx8IHRoaXMubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdHZhciB0YXJnZXQgPSBtYW5pcHVsYXRpb25UYXJnZXQoIHRoaXMsIGVsZW0gKTtcblx0XHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKCBlbGVtICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdHByZXBlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBkb21NYW5pcCggdGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdGlmICggdGhpcy5ub2RlVHlwZSA9PT0gMSB8fCB0aGlzLm5vZGVUeXBlID09PSAxMSB8fCB0aGlzLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gbWFuaXB1bGF0aW9uVGFyZ2V0KCB0aGlzLCBlbGVtICk7XG5cdFx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoIGVsZW0sIHRhcmdldC5maXJzdENoaWxkICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGJlZm9yZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIGVsZW0sIHRoaXMgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0YWZ0ZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBkb21NYW5pcCggdGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdGlmICggdGhpcy5wYXJlbnROb2RlICkge1xuXHRcdFx0XHR0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBlbGVtLCB0aGlzLm5leHRTaWJsaW5nICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGVtcHR5OiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZWxlbSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Zm9yICggOyAoIGVsZW0gPSB0aGlzWyBpIF0gKSAhPSBudWxsOyBpKysgKSB7XG5cdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cblx0XHRcdFx0Ly8gUHJldmVudCBtZW1vcnkgbGVha3Ncblx0XHRcdFx0alF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCBlbGVtLCBmYWxzZSApICk7XG5cblx0XHRcdFx0Ly8gUmVtb3ZlIGFueSByZW1haW5pbmcgbm9kZXNcblx0XHRcdFx0ZWxlbS50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uKCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApIHtcblx0XHRkYXRhQW5kRXZlbnRzID0gZGF0YUFuZEV2ZW50cyA9PSBudWxsID8gZmFsc2UgOiBkYXRhQW5kRXZlbnRzO1xuXHRcdGRlZXBEYXRhQW5kRXZlbnRzID0gZGVlcERhdGFBbmRFdmVudHMgPT0gbnVsbCA/IGRhdGFBbmRFdmVudHMgOiBkZWVwRGF0YUFuZEV2ZW50cztcblxuXHRcdHJldHVybiB0aGlzLm1hcCggZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5LmNsb25lKCB0aGlzLCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApO1xuXHRcdH0gKTtcblx0fSxcblxuXHRodG1sOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0dmFyIGVsZW0gPSB0aGlzWyAwIF0gfHwge30sXG5cdFx0XHRcdGkgPSAwLFxuXHRcdFx0XHRsID0gdGhpcy5sZW5ndGg7XG5cblx0XHRcdGlmICggdmFsdWUgPT09IHVuZGVmaW5lZCAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRyZXR1cm4gZWxlbS5pbm5lckhUTUw7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNlZSBpZiB3ZSBjYW4gdGFrZSBhIHNob3J0Y3V0IGFuZCBqdXN0IHVzZSBpbm5lckhUTUxcblx0XHRcdGlmICggdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmICFybm9Jbm5lcmh0bWwudGVzdCggdmFsdWUgKSAmJlxuXHRcdFx0XHQhd3JhcE1hcFsgKCBydGFnTmFtZS5leGVjKCB2YWx1ZSApIHx8IFsgXCJcIiwgXCJcIiBdIClbIDEgXS50b0xvd2VyQ2FzZSgpIF0gKSB7XG5cblx0XHRcdFx0dmFsdWUgPSBqUXVlcnkuaHRtbFByZWZpbHRlciggdmFsdWUgKTtcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0XHRcdGVsZW0gPSB0aGlzWyBpIF0gfHwge307XG5cblx0XHRcdFx0XHRcdC8vIFJlbW92ZSBlbGVtZW50IG5vZGVzIGFuZCBwcmV2ZW50IG1lbW9yeSBsZWFrc1xuXHRcdFx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRcdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIGVsZW0sIGZhbHNlICkgKTtcblx0XHRcdFx0XHRcdFx0ZWxlbS5pbm5lckhUTUwgPSB2YWx1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRlbGVtID0gMDtcblxuXHRcdFx0XHQvLyBJZiB1c2luZyBpbm5lckhUTUwgdGhyb3dzIGFuIGV4Y2VwdGlvbiwgdXNlIHRoZSBmYWxsYmFjayBtZXRob2Rcblx0XHRcdFx0fSBjYXRjaCAoIGUgKSB7fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGVsZW0gKSB7XG5cdFx0XHRcdHRoaXMuZW1wdHkoKS5hcHBlbmQoIHZhbHVlICk7XG5cdFx0XHR9XG5cdFx0fSwgbnVsbCwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggKTtcblx0fSxcblxuXHRyZXBsYWNlV2l0aDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGlnbm9yZWQgPSBbXTtcblxuXHRcdC8vIE1ha2UgdGhlIGNoYW5nZXMsIHJlcGxhY2luZyBlYWNoIG5vbi1pZ25vcmVkIGNvbnRleHQgZWxlbWVudCB3aXRoIHRoZSBuZXcgY29udGVudFxuXHRcdHJldHVybiBkb21NYW5pcCggdGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG5cblx0XHRcdGlmICggalF1ZXJ5LmluQXJyYXkoIHRoaXMsIGlnbm9yZWQgKSA8IDAgKSB7XG5cdFx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggdGhpcyApICk7XG5cdFx0XHRcdGlmICggcGFyZW50ICkge1xuXHRcdFx0XHRcdHBhcmVudC5yZXBsYWNlQ2hpbGQoIGVsZW0sIHRoaXMgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0Ly8gRm9yY2UgY2FsbGJhY2sgaW52b2NhdGlvblxuXHRcdH0sIGlnbm9yZWQgKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZWFjaCgge1xuXHRhcHBlbmRUbzogXCJhcHBlbmRcIixcblx0cHJlcGVuZFRvOiBcInByZXBlbmRcIixcblx0aW5zZXJ0QmVmb3JlOiBcImJlZm9yZVwiLFxuXHRpbnNlcnRBZnRlcjogXCJhZnRlclwiLFxuXHRyZXBsYWNlQWxsOiBcInJlcGxhY2VXaXRoXCJcbn0sIGZ1bmN0aW9uKCBuYW1lLCBvcmlnaW5hbCApIHtcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0dmFyIGVsZW1zLFxuXHRcdFx0cmV0ID0gW10sXG5cdFx0XHRpbnNlcnQgPSBqUXVlcnkoIHNlbGVjdG9yICksXG5cdFx0XHRsYXN0ID0gaW5zZXJ0Lmxlbmd0aCAtIDEsXG5cdFx0XHRpID0gMDtcblxuXHRcdGZvciAoIDsgaSA8PSBsYXN0OyBpKysgKSB7XG5cdFx0XHRlbGVtcyA9IGkgPT09IGxhc3QgPyB0aGlzIDogdGhpcy5jbG9uZSggdHJ1ZSApO1xuXHRcdFx0alF1ZXJ5KCBpbnNlcnRbIGkgXSApWyBvcmlnaW5hbCBdKCBlbGVtcyApO1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHksIFBoYW50b21KUyAxIG9ubHlcblx0XHRcdC8vIC5nZXQoKSBiZWNhdXNlIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcblx0XHRcdHB1c2guYXBwbHkoIHJldCwgZWxlbXMuZ2V0KCkgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHJldCApO1xuXHR9O1xufSApO1xudmFyIHJtYXJnaW4gPSAoIC9ebWFyZ2luLyApO1xuXG52YXIgcm51bW5vbnB4ID0gbmV3IFJlZ0V4cCggXCJeKFwiICsgcG51bSArIFwiKSg/IXB4KVthLXolXSskXCIsIFwiaVwiICk7XG5cbnZhciBnZXRTdHlsZXMgPSBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDw9MTEgb25seSwgRmlyZWZveCA8PTMwICgjMTUwOTgsICMxNDE1MClcblx0XHQvLyBJRSB0aHJvd3Mgb24gZWxlbWVudHMgY3JlYXRlZCBpbiBwb3B1cHNcblx0XHQvLyBGRiBtZWFud2hpbGUgdGhyb3dzIG9uIGZyYW1lIGVsZW1lbnRzIHRocm91Z2ggXCJkZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlXCJcblx0XHR2YXIgdmlldyA9IGVsZW0ub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldztcblxuXHRcdGlmICggIXZpZXcgfHwgIXZpZXcub3BlbmVyICkge1xuXHRcdFx0dmlldyA9IHdpbmRvdztcblx0XHR9XG5cblx0XHRyZXR1cm4gdmlldy5nZXRDb21wdXRlZFN0eWxlKCBlbGVtICk7XG5cdH07XG5cblxuXG4oIGZ1bmN0aW9uKCkge1xuXG5cdC8vIEV4ZWN1dGluZyBib3RoIHBpeGVsUG9zaXRpb24gJiBib3hTaXppbmdSZWxpYWJsZSB0ZXN0cyByZXF1aXJlIG9ubHkgb25lIGxheW91dFxuXHQvLyBzbyB0aGV5J3JlIGV4ZWN1dGVkIGF0IHRoZSBzYW1lIHRpbWUgdG8gc2F2ZSB0aGUgc2Vjb25kIGNvbXB1dGF0aW9uLlxuXHRmdW5jdGlvbiBjb21wdXRlU3R5bGVUZXN0cygpIHtcblxuXHRcdC8vIFRoaXMgaXMgYSBzaW5nbGV0b24sIHdlIG5lZWQgdG8gZXhlY3V0ZSBpdCBvbmx5IG9uY2Vcblx0XHRpZiAoICFkaXYgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0ZGl2LnN0eWxlLmNzc1RleHQgPVxuXHRcdFx0XCJib3gtc2l6aW5nOmJvcmRlci1ib3g7XCIgK1xuXHRcdFx0XCJwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO1wiICtcblx0XHRcdFwibWFyZ2luOmF1dG87Ym9yZGVyOjFweDtwYWRkaW5nOjFweDtcIiArXG5cdFx0XHRcInRvcDoxJTt3aWR0aDo1MCVcIjtcblx0XHRkaXYuaW5uZXJIVE1MID0gXCJcIjtcblx0XHRkb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoIGNvbnRhaW5lciApO1xuXG5cdFx0dmFyIGRpdlN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoIGRpdiApO1xuXHRcdHBpeGVsUG9zaXRpb25WYWwgPSBkaXZTdHlsZS50b3AgIT09IFwiMSVcIjtcblxuXHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgNC4wIC0gNC4zIG9ubHksIEZpcmVmb3ggPD0zIC0gNDRcblx0XHRyZWxpYWJsZU1hcmdpbkxlZnRWYWwgPSBkaXZTdHlsZS5tYXJnaW5MZWZ0ID09PSBcIjJweFwiO1xuXHRcdGJveFNpemluZ1JlbGlhYmxlVmFsID0gZGl2U3R5bGUud2lkdGggPT09IFwiNHB4XCI7XG5cblx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDQuMCAtIDQuMyBvbmx5XG5cdFx0Ly8gU29tZSBzdHlsZXMgY29tZSBiYWNrIHdpdGggcGVyY2VudGFnZSB2YWx1ZXMsIGV2ZW4gdGhvdWdoIHRoZXkgc2hvdWxkbid0XG5cdFx0ZGl2LnN0eWxlLm1hcmdpblJpZ2h0ID0gXCI1MCVcIjtcblx0XHRwaXhlbE1hcmdpblJpZ2h0VmFsID0gZGl2U3R5bGUubWFyZ2luUmlnaHQgPT09IFwiNHB4XCI7XG5cblx0XHRkb2N1bWVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoIGNvbnRhaW5lciApO1xuXG5cdFx0Ly8gTnVsbGlmeSB0aGUgZGl2IHNvIGl0IHdvdWxkbid0IGJlIHN0b3JlZCBpbiB0aGUgbWVtb3J5IGFuZFxuXHRcdC8vIGl0IHdpbGwgYWxzbyBiZSBhIHNpZ24gdGhhdCBjaGVja3MgYWxyZWFkeSBwZXJmb3JtZWRcblx0XHRkaXYgPSBudWxsO1xuXHR9XG5cblx0dmFyIHBpeGVsUG9zaXRpb25WYWwsIGJveFNpemluZ1JlbGlhYmxlVmFsLCBwaXhlbE1hcmdpblJpZ2h0VmFsLCByZWxpYWJsZU1hcmdpbkxlZnRWYWwsXG5cdFx0Y29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApLFxuXHRcdGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKTtcblxuXHQvLyBGaW5pc2ggZWFybHkgaW4gbGltaXRlZCAobm9uLWJyb3dzZXIpIGVudmlyb25tZW50c1xuXHRpZiAoICFkaXYuc3R5bGUgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gU3VwcG9ydDogSUUgPD05IC0gMTEgb25seVxuXHQvLyBTdHlsZSBvZiBjbG9uZWQgZWxlbWVudCBhZmZlY3RzIHNvdXJjZSBlbGVtZW50IGNsb25lZCAoIzg5MDgpXG5cdGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCA9IFwiY29udGVudC1ib3hcIjtcblx0ZGl2LmNsb25lTm9kZSggdHJ1ZSApLnN0eWxlLmJhY2tncm91bmRDbGlwID0gXCJcIjtcblx0c3VwcG9ydC5jbGVhckNsb25lU3R5bGUgPSBkaXYuc3R5bGUuYmFja2dyb3VuZENsaXAgPT09IFwiY29udGVudC1ib3hcIjtcblxuXHRjb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IFwiYm9yZGVyOjA7d2lkdGg6OHB4O2hlaWdodDowO3RvcDowO2xlZnQ6LTk5OTlweDtcIiArXG5cdFx0XCJwYWRkaW5nOjA7bWFyZ2luLXRvcDoxcHg7cG9zaXRpb246YWJzb2x1dGVcIjtcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKCBkaXYgKTtcblxuXHRqUXVlcnkuZXh0ZW5kKCBzdXBwb3J0LCB7XG5cdFx0cGl4ZWxQb3NpdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0XHRjb21wdXRlU3R5bGVUZXN0cygpO1xuXHRcdFx0cmV0dXJuIHBpeGVsUG9zaXRpb25WYWw7XG5cdFx0fSxcblx0XHRib3hTaXppbmdSZWxpYWJsZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRjb21wdXRlU3R5bGVUZXN0cygpO1xuXHRcdFx0cmV0dXJuIGJveFNpemluZ1JlbGlhYmxlVmFsO1xuXHRcdH0sXG5cdFx0cGl4ZWxNYXJnaW5SaWdodDogZnVuY3Rpb24oKSB7XG5cdFx0XHRjb21wdXRlU3R5bGVUZXN0cygpO1xuXHRcdFx0cmV0dXJuIHBpeGVsTWFyZ2luUmlnaHRWYWw7XG5cdFx0fSxcblx0XHRyZWxpYWJsZU1hcmdpbkxlZnQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29tcHV0ZVN0eWxlVGVzdHMoKTtcblx0XHRcdHJldHVybiByZWxpYWJsZU1hcmdpbkxlZnRWYWw7XG5cdFx0fVxuXHR9ICk7XG59ICkoKTtcblxuXG5mdW5jdGlvbiBjdXJDU1MoIGVsZW0sIG5hbWUsIGNvbXB1dGVkICkge1xuXHR2YXIgd2lkdGgsIG1pbldpZHRoLCBtYXhXaWR0aCwgcmV0LFxuXG5cdFx0Ly8gU3VwcG9ydDogRmlyZWZveCA1MStcblx0XHQvLyBSZXRyaWV2aW5nIHN0eWxlIGJlZm9yZSBjb21wdXRlZCBzb21laG93XG5cdFx0Ly8gZml4ZXMgYW4gaXNzdWUgd2l0aCBnZXR0aW5nIHdyb25nIHZhbHVlc1xuXHRcdC8vIG9uIGRldGFjaGVkIGVsZW1lbnRzXG5cdFx0c3R5bGUgPSBlbGVtLnN0eWxlO1xuXG5cdGNvbXB1dGVkID0gY29tcHV0ZWQgfHwgZ2V0U3R5bGVzKCBlbGVtICk7XG5cblx0Ly8gZ2V0UHJvcGVydHlWYWx1ZSBpcyBuZWVkZWQgZm9yOlxuXHQvLyAgIC5jc3MoJ2ZpbHRlcicpIChJRSA5IG9ubHksICMxMjUzNylcblx0Ly8gICAuY3NzKCctLWN1c3RvbVByb3BlcnR5KSAoIzMxNDQpXG5cdGlmICggY29tcHV0ZWQgKSB7XG5cdFx0cmV0ID0gY29tcHV0ZWQuZ2V0UHJvcGVydHlWYWx1ZSggbmFtZSApIHx8IGNvbXB1dGVkWyBuYW1lIF07XG5cblx0XHRpZiAoIHJldCA9PT0gXCJcIiAmJiAhalF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKSApIHtcblx0XHRcdHJldCA9IGpRdWVyeS5zdHlsZSggZWxlbSwgbmFtZSApO1xuXHRcdH1cblxuXHRcdC8vIEEgdHJpYnV0ZSB0byB0aGUgXCJhd2Vzb21lIGhhY2sgYnkgRGVhbiBFZHdhcmRzXCJcblx0XHQvLyBBbmRyb2lkIEJyb3dzZXIgcmV0dXJucyBwZXJjZW50YWdlIGZvciBzb21lIHZhbHVlcyxcblx0XHQvLyBidXQgd2lkdGggc2VlbXMgdG8gYmUgcmVsaWFibHkgcGl4ZWxzLlxuXHRcdC8vIFRoaXMgaXMgYWdhaW5zdCB0aGUgQ1NTT00gZHJhZnQgc3BlYzpcblx0XHQvLyBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3Nzb20vI3Jlc29sdmVkLXZhbHVlc1xuXHRcdGlmICggIXN1cHBvcnQucGl4ZWxNYXJnaW5SaWdodCgpICYmIHJudW1ub25weC50ZXN0KCByZXQgKSAmJiBybWFyZ2luLnRlc3QoIG5hbWUgKSApIHtcblxuXHRcdFx0Ly8gUmVtZW1iZXIgdGhlIG9yaWdpbmFsIHZhbHVlc1xuXHRcdFx0d2lkdGggPSBzdHlsZS53aWR0aDtcblx0XHRcdG1pbldpZHRoID0gc3R5bGUubWluV2lkdGg7XG5cdFx0XHRtYXhXaWR0aCA9IHN0eWxlLm1heFdpZHRoO1xuXG5cdFx0XHQvLyBQdXQgaW4gdGhlIG5ldyB2YWx1ZXMgdG8gZ2V0IGEgY29tcHV0ZWQgdmFsdWUgb3V0XG5cdFx0XHRzdHlsZS5taW5XaWR0aCA9IHN0eWxlLm1heFdpZHRoID0gc3R5bGUud2lkdGggPSByZXQ7XG5cdFx0XHRyZXQgPSBjb21wdXRlZC53aWR0aDtcblxuXHRcdFx0Ly8gUmV2ZXJ0IHRoZSBjaGFuZ2VkIHZhbHVlc1xuXHRcdFx0c3R5bGUud2lkdGggPSB3aWR0aDtcblx0XHRcdHN0eWxlLm1pbldpZHRoID0gbWluV2lkdGg7XG5cdFx0XHRzdHlsZS5tYXhXaWR0aCA9IG1heFdpZHRoO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXQgIT09IHVuZGVmaW5lZCA/XG5cblx0XHQvLyBTdXBwb3J0OiBJRSA8PTkgLSAxMSBvbmx5XG5cdFx0Ly8gSUUgcmV0dXJucyB6SW5kZXggdmFsdWUgYXMgYW4gaW50ZWdlci5cblx0XHRyZXQgKyBcIlwiIDpcblx0XHRyZXQ7XG59XG5cblxuZnVuY3Rpb24gYWRkR2V0SG9va0lmKCBjb25kaXRpb25GbiwgaG9va0ZuICkge1xuXG5cdC8vIERlZmluZSB0aGUgaG9vaywgd2UnbGwgY2hlY2sgb24gdGhlIGZpcnN0IHJ1biBpZiBpdCdzIHJlYWxseSBuZWVkZWQuXG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggY29uZGl0aW9uRm4oKSApIHtcblxuXHRcdFx0XHQvLyBIb29rIG5vdCBuZWVkZWQgKG9yIGl0J3Mgbm90IHBvc3NpYmxlIHRvIHVzZSBpdCBkdWVcblx0XHRcdFx0Ly8gdG8gbWlzc2luZyBkZXBlbmRlbmN5KSwgcmVtb3ZlIGl0LlxuXHRcdFx0XHRkZWxldGUgdGhpcy5nZXQ7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSG9vayBuZWVkZWQ7IHJlZGVmaW5lIGl0IHNvIHRoYXQgdGhlIHN1cHBvcnQgdGVzdCBpcyBub3QgZXhlY3V0ZWQgYWdhaW4uXG5cdFx0XHRyZXR1cm4gKCB0aGlzLmdldCA9IGhvb2tGbiApLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHR9XG5cdH07XG59XG5cblxudmFyXG5cblx0Ly8gU3dhcHBhYmxlIGlmIGRpc3BsYXkgaXMgbm9uZSBvciBzdGFydHMgd2l0aCB0YWJsZVxuXHQvLyBleGNlcHQgXCJ0YWJsZVwiLCBcInRhYmxlLWNlbGxcIiwgb3IgXCJ0YWJsZS1jYXB0aW9uXCJcblx0Ly8gU2VlIGhlcmUgZm9yIGRpc3BsYXkgdmFsdWVzOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0NTUy9kaXNwbGF5XG5cdHJkaXNwbGF5c3dhcCA9IC9eKG5vbmV8dGFibGUoPyEtY1tlYV0pLispLyxcblx0cmN1c3RvbVByb3AgPSAvXi0tLyxcblx0Y3NzU2hvdyA9IHsgcG9zaXRpb246IFwiYWJzb2x1dGVcIiwgdmlzaWJpbGl0eTogXCJoaWRkZW5cIiwgZGlzcGxheTogXCJibG9ja1wiIH0sXG5cdGNzc05vcm1hbFRyYW5zZm9ybSA9IHtcblx0XHRsZXR0ZXJTcGFjaW5nOiBcIjBcIixcblx0XHRmb250V2VpZ2h0OiBcIjQwMFwiXG5cdH0sXG5cblx0Y3NzUHJlZml4ZXMgPSBbIFwiV2Via2l0XCIsIFwiTW96XCIsIFwibXNcIiBdLFxuXHRlbXB0eVN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApLnN0eWxlO1xuXG4vLyBSZXR1cm4gYSBjc3MgcHJvcGVydHkgbWFwcGVkIHRvIGEgcG90ZW50aWFsbHkgdmVuZG9yIHByZWZpeGVkIHByb3BlcnR5XG5mdW5jdGlvbiB2ZW5kb3JQcm9wTmFtZSggbmFtZSApIHtcblxuXHQvLyBTaG9ydGN1dCBmb3IgbmFtZXMgdGhhdCBhcmUgbm90IHZlbmRvciBwcmVmaXhlZFxuXHRpZiAoIG5hbWUgaW4gZW1wdHlTdHlsZSApIHtcblx0XHRyZXR1cm4gbmFtZTtcblx0fVxuXG5cdC8vIENoZWNrIGZvciB2ZW5kb3IgcHJlZml4ZWQgbmFtZXNcblx0dmFyIGNhcE5hbWUgPSBuYW1lWyAwIF0udG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoIDEgKSxcblx0XHRpID0gY3NzUHJlZml4ZXMubGVuZ3RoO1xuXG5cdHdoaWxlICggaS0tICkge1xuXHRcdG5hbWUgPSBjc3NQcmVmaXhlc1sgaSBdICsgY2FwTmFtZTtcblx0XHRpZiAoIG5hbWUgaW4gZW1wdHlTdHlsZSApIHtcblx0XHRcdHJldHVybiBuYW1lO1xuXHRcdH1cblx0fVxufVxuXG4vLyBSZXR1cm4gYSBwcm9wZXJ0eSBtYXBwZWQgYWxvbmcgd2hhdCBqUXVlcnkuY3NzUHJvcHMgc3VnZ2VzdHMgb3IgdG9cbi8vIGEgdmVuZG9yIHByZWZpeGVkIHByb3BlcnR5LlxuZnVuY3Rpb24gZmluYWxQcm9wTmFtZSggbmFtZSApIHtcblx0dmFyIHJldCA9IGpRdWVyeS5jc3NQcm9wc1sgbmFtZSBdO1xuXHRpZiAoICFyZXQgKSB7XG5cdFx0cmV0ID0galF1ZXJ5LmNzc1Byb3BzWyBuYW1lIF0gPSB2ZW5kb3JQcm9wTmFtZSggbmFtZSApIHx8IG5hbWU7XG5cdH1cblx0cmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gc2V0UG9zaXRpdmVOdW1iZXIoIGVsZW0sIHZhbHVlLCBzdWJ0cmFjdCApIHtcblxuXHQvLyBBbnkgcmVsYXRpdmUgKCsvLSkgdmFsdWVzIGhhdmUgYWxyZWFkeSBiZWVuXG5cdC8vIG5vcm1hbGl6ZWQgYXQgdGhpcyBwb2ludFxuXHR2YXIgbWF0Y2hlcyA9IHJjc3NOdW0uZXhlYyggdmFsdWUgKTtcblx0cmV0dXJuIG1hdGNoZXMgP1xuXG5cdFx0Ly8gR3VhcmQgYWdhaW5zdCB1bmRlZmluZWQgXCJzdWJ0cmFjdFwiLCBlLmcuLCB3aGVuIHVzZWQgYXMgaW4gY3NzSG9va3Ncblx0XHRNYXRoLm1heCggMCwgbWF0Y2hlc1sgMiBdIC0gKCBzdWJ0cmFjdCB8fCAwICkgKSArICggbWF0Y2hlc1sgMyBdIHx8IFwicHhcIiApIDpcblx0XHR2YWx1ZTtcbn1cblxuZnVuY3Rpb24gYXVnbWVudFdpZHRoT3JIZWlnaHQoIGVsZW0sIG5hbWUsIGV4dHJhLCBpc0JvcmRlckJveCwgc3R5bGVzICkge1xuXHR2YXIgaSxcblx0XHR2YWwgPSAwO1xuXG5cdC8vIElmIHdlIGFscmVhZHkgaGF2ZSB0aGUgcmlnaHQgbWVhc3VyZW1lbnQsIGF2b2lkIGF1Z21lbnRhdGlvblxuXHRpZiAoIGV4dHJhID09PSAoIGlzQm9yZGVyQm94ID8gXCJib3JkZXJcIiA6IFwiY29udGVudFwiICkgKSB7XG5cdFx0aSA9IDQ7XG5cblx0Ly8gT3RoZXJ3aXNlIGluaXRpYWxpemUgZm9yIGhvcml6b250YWwgb3IgdmVydGljYWwgcHJvcGVydGllc1xuXHR9IGVsc2Uge1xuXHRcdGkgPSBuYW1lID09PSBcIndpZHRoXCIgPyAxIDogMDtcblx0fVxuXG5cdGZvciAoIDsgaSA8IDQ7IGkgKz0gMiApIHtcblxuXHRcdC8vIEJvdGggYm94IG1vZGVscyBleGNsdWRlIG1hcmdpbiwgc28gYWRkIGl0IGlmIHdlIHdhbnQgaXRcblx0XHRpZiAoIGV4dHJhID09PSBcIm1hcmdpblwiICkge1xuXHRcdFx0dmFsICs9IGpRdWVyeS5jc3MoIGVsZW0sIGV4dHJhICsgY3NzRXhwYW5kWyBpIF0sIHRydWUsIHN0eWxlcyApO1xuXHRcdH1cblxuXHRcdGlmICggaXNCb3JkZXJCb3ggKSB7XG5cblx0XHRcdC8vIGJvcmRlci1ib3ggaW5jbHVkZXMgcGFkZGluZywgc28gcmVtb3ZlIGl0IGlmIHdlIHdhbnQgY29udGVudFxuXHRcdFx0aWYgKCBleHRyYSA9PT0gXCJjb250ZW50XCIgKSB7XG5cdFx0XHRcdHZhbCAtPSBqUXVlcnkuY3NzKCBlbGVtLCBcInBhZGRpbmdcIiArIGNzc0V4cGFuZFsgaSBdLCB0cnVlLCBzdHlsZXMgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgYm9yZGVyIG5vciBtYXJnaW4sIHNvIHJlbW92ZSBib3JkZXJcblx0XHRcdGlmICggZXh0cmEgIT09IFwibWFyZ2luXCIgKSB7XG5cdFx0XHRcdHZhbCAtPSBqUXVlcnkuY3NzKCBlbGVtLCBcImJvcmRlclwiICsgY3NzRXhwYW5kWyBpIF0gKyBcIldpZHRoXCIsIHRydWUsIHN0eWxlcyApO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIEF0IHRoaXMgcG9pbnQsIGV4dHJhIGlzbid0IGNvbnRlbnQsIHNvIGFkZCBwYWRkaW5nXG5cdFx0XHR2YWwgKz0galF1ZXJ5LmNzcyggZWxlbSwgXCJwYWRkaW5nXCIgKyBjc3NFeHBhbmRbIGkgXSwgdHJ1ZSwgc3R5bGVzICk7XG5cblx0XHRcdC8vIEF0IHRoaXMgcG9pbnQsIGV4dHJhIGlzbid0IGNvbnRlbnQgbm9yIHBhZGRpbmcsIHNvIGFkZCBib3JkZXJcblx0XHRcdGlmICggZXh0cmEgIT09IFwicGFkZGluZ1wiICkge1xuXHRcdFx0XHR2YWwgKz0galF1ZXJ5LmNzcyggZWxlbSwgXCJib3JkZXJcIiArIGNzc0V4cGFuZFsgaSBdICsgXCJXaWR0aFwiLCB0cnVlLCBzdHlsZXMgKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdmFsO1xufVxuXG5mdW5jdGlvbiBnZXRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBuYW1lLCBleHRyYSApIHtcblxuXHQvLyBTdGFydCB3aXRoIGNvbXB1dGVkIHN0eWxlXG5cdHZhciB2YWx1ZUlzQm9yZGVyQm94LFxuXHRcdHN0eWxlcyA9IGdldFN0eWxlcyggZWxlbSApLFxuXHRcdHZhbCA9IGN1ckNTUyggZWxlbSwgbmFtZSwgc3R5bGVzICksXG5cdFx0aXNCb3JkZXJCb3ggPSBqUXVlcnkuY3NzKCBlbGVtLCBcImJveFNpemluZ1wiLCBmYWxzZSwgc3R5bGVzICkgPT09IFwiYm9yZGVyLWJveFwiO1xuXG5cdC8vIENvbXB1dGVkIHVuaXQgaXMgbm90IHBpeGVscy4gU3RvcCBoZXJlIGFuZCByZXR1cm4uXG5cdGlmICggcm51bW5vbnB4LnRlc3QoIHZhbCApICkge1xuXHRcdHJldHVybiB2YWw7XG5cdH1cblxuXHQvLyBDaGVjayBmb3Igc3R5bGUgaW4gY2FzZSBhIGJyb3dzZXIgd2hpY2ggcmV0dXJucyB1bnJlbGlhYmxlIHZhbHVlc1xuXHQvLyBmb3IgZ2V0Q29tcHV0ZWRTdHlsZSBzaWxlbnRseSBmYWxscyBiYWNrIHRvIHRoZSByZWxpYWJsZSBlbGVtLnN0eWxlXG5cdHZhbHVlSXNCb3JkZXJCb3ggPSBpc0JvcmRlckJveCAmJlxuXHRcdCggc3VwcG9ydC5ib3hTaXppbmdSZWxpYWJsZSgpIHx8IHZhbCA9PT0gZWxlbS5zdHlsZVsgbmFtZSBdICk7XG5cblx0Ly8gRmFsbCBiYWNrIHRvIG9mZnNldFdpZHRoL0hlaWdodCB3aGVuIHZhbHVlIGlzIFwiYXV0b1wiXG5cdC8vIFRoaXMgaGFwcGVucyBmb3IgaW5saW5lIGVsZW1lbnRzIHdpdGggbm8gZXhwbGljaXQgc2V0dGluZyAoZ2gtMzU3MSlcblx0aWYgKCB2YWwgPT09IFwiYXV0b1wiICkge1xuXHRcdHZhbCA9IGVsZW1bIFwib2Zmc2V0XCIgKyBuYW1lWyAwIF0udG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoIDEgKSBdO1xuXHR9XG5cblx0Ly8gTm9ybWFsaXplIFwiXCIsIGF1dG8sIGFuZCBwcmVwYXJlIGZvciBleHRyYVxuXHR2YWwgPSBwYXJzZUZsb2F0KCB2YWwgKSB8fCAwO1xuXG5cdC8vIFVzZSB0aGUgYWN0aXZlIGJveC1zaXppbmcgbW9kZWwgdG8gYWRkL3N1YnRyYWN0IGlycmVsZXZhbnQgc3R5bGVzXG5cdHJldHVybiAoIHZhbCArXG5cdFx0YXVnbWVudFdpZHRoT3JIZWlnaHQoXG5cdFx0XHRlbGVtLFxuXHRcdFx0bmFtZSxcblx0XHRcdGV4dHJhIHx8ICggaXNCb3JkZXJCb3ggPyBcImJvcmRlclwiIDogXCJjb250ZW50XCIgKSxcblx0XHRcdHZhbHVlSXNCb3JkZXJCb3gsXG5cdFx0XHRzdHlsZXNcblx0XHQpXG5cdCkgKyBcInB4XCI7XG59XG5cbmpRdWVyeS5leHRlbmQoIHtcblxuXHQvLyBBZGQgaW4gc3R5bGUgcHJvcGVydHkgaG9va3MgZm9yIG92ZXJyaWRpbmcgdGhlIGRlZmF1bHRcblx0Ly8gYmVoYXZpb3Igb2YgZ2V0dGluZyBhbmQgc2V0dGluZyBhIHN0eWxlIHByb3BlcnR5XG5cdGNzc0hvb2tzOiB7XG5cdFx0b3BhY2l0eToge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG5cdFx0XHRcdGlmICggY29tcHV0ZWQgKSB7XG5cblx0XHRcdFx0XHQvLyBXZSBzaG91bGQgYWx3YXlzIGdldCBhIG51bWJlciBiYWNrIGZyb20gb3BhY2l0eVxuXHRcdFx0XHRcdHZhciByZXQgPSBjdXJDU1MoIGVsZW0sIFwib3BhY2l0eVwiICk7XG5cdFx0XHRcdFx0cmV0dXJuIHJldCA9PT0gXCJcIiA/IFwiMVwiIDogcmV0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8vIERvbid0IGF1dG9tYXRpY2FsbHkgYWRkIFwicHhcIiB0byB0aGVzZSBwb3NzaWJseS11bml0bGVzcyBwcm9wZXJ0aWVzXG5cdGNzc051bWJlcjoge1xuXHRcdFwiYW5pbWF0aW9uSXRlcmF0aW9uQ291bnRcIjogdHJ1ZSxcblx0XHRcImNvbHVtbkNvdW50XCI6IHRydWUsXG5cdFx0XCJmaWxsT3BhY2l0eVwiOiB0cnVlLFxuXHRcdFwiZmxleEdyb3dcIjogdHJ1ZSxcblx0XHRcImZsZXhTaHJpbmtcIjogdHJ1ZSxcblx0XHRcImZvbnRXZWlnaHRcIjogdHJ1ZSxcblx0XHRcImxpbmVIZWlnaHRcIjogdHJ1ZSxcblx0XHRcIm9wYWNpdHlcIjogdHJ1ZSxcblx0XHRcIm9yZGVyXCI6IHRydWUsXG5cdFx0XCJvcnBoYW5zXCI6IHRydWUsXG5cdFx0XCJ3aWRvd3NcIjogdHJ1ZSxcblx0XHRcInpJbmRleFwiOiB0cnVlLFxuXHRcdFwiem9vbVwiOiB0cnVlXG5cdH0sXG5cblx0Ly8gQWRkIGluIHByb3BlcnRpZXMgd2hvc2UgbmFtZXMgeW91IHdpc2ggdG8gZml4IGJlZm9yZVxuXHQvLyBzZXR0aW5nIG9yIGdldHRpbmcgdGhlIHZhbHVlXG5cdGNzc1Byb3BzOiB7XG5cdFx0XCJmbG9hdFwiOiBcImNzc0Zsb2F0XCJcblx0fSxcblxuXHQvLyBHZXQgYW5kIHNldCB0aGUgc3R5bGUgcHJvcGVydHkgb24gYSBET00gTm9kZVxuXHRzdHlsZTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlLCBleHRyYSApIHtcblxuXHRcdC8vIERvbid0IHNldCBzdHlsZXMgb24gdGV4dCBhbmQgY29tbWVudCBub2Rlc1xuXHRcdGlmICggIWVsZW0gfHwgZWxlbS5ub2RlVHlwZSA9PT0gMyB8fCBlbGVtLm5vZGVUeXBlID09PSA4IHx8ICFlbGVtLnN0eWxlICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHdlJ3JlIHdvcmtpbmcgd2l0aCB0aGUgcmlnaHQgbmFtZVxuXHRcdHZhciByZXQsIHR5cGUsIGhvb2tzLFxuXHRcdFx0b3JpZ05hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lICksXG5cdFx0XHRpc0N1c3RvbVByb3AgPSByY3VzdG9tUHJvcC50ZXN0KCBuYW1lICksXG5cdFx0XHRzdHlsZSA9IGVsZW0uc3R5bGU7XG5cblx0XHQvLyBNYWtlIHN1cmUgdGhhdCB3ZSdyZSB3b3JraW5nIHdpdGggdGhlIHJpZ2h0IG5hbWUuIFdlIGRvbid0XG5cdFx0Ly8gd2FudCB0byBxdWVyeSB0aGUgdmFsdWUgaWYgaXQgaXMgYSBDU1MgY3VzdG9tIHByb3BlcnR5XG5cdFx0Ly8gc2luY2UgdGhleSBhcmUgdXNlci1kZWZpbmVkLlxuXHRcdGlmICggIWlzQ3VzdG9tUHJvcCApIHtcblx0XHRcdG5hbWUgPSBmaW5hbFByb3BOYW1lKCBvcmlnTmFtZSApO1xuXHRcdH1cblxuXHRcdC8vIEdldHMgaG9vayBmb3IgdGhlIHByZWZpeGVkIHZlcnNpb24sIHRoZW4gdW5wcmVmaXhlZCB2ZXJzaW9uXG5cdFx0aG9va3MgPSBqUXVlcnkuY3NzSG9va3NbIG5hbWUgXSB8fCBqUXVlcnkuY3NzSG9va3NbIG9yaWdOYW1lIF07XG5cblx0XHQvLyBDaGVjayBpZiB3ZSdyZSBzZXR0aW5nIGEgdmFsdWVcblx0XHRpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHR0eXBlID0gdHlwZW9mIHZhbHVlO1xuXG5cdFx0XHQvLyBDb252ZXJ0IFwiKz1cIiBvciBcIi09XCIgdG8gcmVsYXRpdmUgbnVtYmVycyAoIzczNDUpXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwic3RyaW5nXCIgJiYgKCByZXQgPSByY3NzTnVtLmV4ZWMoIHZhbHVlICkgKSAmJiByZXRbIDEgXSApIHtcblx0XHRcdFx0dmFsdWUgPSBhZGp1c3RDU1MoIGVsZW0sIG5hbWUsIHJldCApO1xuXG5cdFx0XHRcdC8vIEZpeGVzIGJ1ZyAjOTIzN1xuXHRcdFx0XHR0eXBlID0gXCJudW1iZXJcIjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTWFrZSBzdXJlIHRoYXQgbnVsbCBhbmQgTmFOIHZhbHVlcyBhcmVuJ3Qgc2V0ICgjNzExNilcblx0XHRcdGlmICggdmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdmFsdWUgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgYSBudW1iZXIgd2FzIHBhc3NlZCBpbiwgYWRkIHRoZSB1bml0IChleGNlcHQgZm9yIGNlcnRhaW4gQ1NTIHByb3BlcnRpZXMpXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwibnVtYmVyXCIgKSB7XG5cdFx0XHRcdHZhbHVlICs9IHJldCAmJiByZXRbIDMgXSB8fCAoIGpRdWVyeS5jc3NOdW1iZXJbIG9yaWdOYW1lIF0gPyBcIlwiIDogXCJweFwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGJhY2tncm91bmQtKiBwcm9wcyBhZmZlY3Qgb3JpZ2luYWwgY2xvbmUncyB2YWx1ZXNcblx0XHRcdGlmICggIXN1cHBvcnQuY2xlYXJDbG9uZVN0eWxlICYmIHZhbHVlID09PSBcIlwiICYmIG5hbWUuaW5kZXhPZiggXCJiYWNrZ3JvdW5kXCIgKSA9PT0gMCApIHtcblx0XHRcdFx0c3R5bGVbIG5hbWUgXSA9IFwiaW5oZXJpdFwiO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkLCB1c2UgdGhhdCB2YWx1ZSwgb3RoZXJ3aXNlIGp1c3Qgc2V0IHRoZSBzcGVjaWZpZWQgdmFsdWVcblx0XHRcdGlmICggIWhvb2tzIHx8ICEoIFwic2V0XCIgaW4gaG9va3MgKSB8fFxuXHRcdFx0XHQoIHZhbHVlID0gaG9va3Muc2V0KCBlbGVtLCB2YWx1ZSwgZXh0cmEgKSApICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0aWYgKCBpc0N1c3RvbVByb3AgKSB7XG5cdFx0XHRcdFx0c3R5bGUuc2V0UHJvcGVydHkoIG5hbWUsIHZhbHVlICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c3R5bGVbIG5hbWUgXSA9IHZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkIGdldCB0aGUgbm9uLWNvbXB1dGVkIHZhbHVlIGZyb20gdGhlcmVcblx0XHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJlxuXHRcdFx0XHQoIHJldCA9IGhvb2tzLmdldCggZWxlbSwgZmFsc2UsIGV4dHJhICkgKSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE90aGVyd2lzZSBqdXN0IGdldCB0aGUgdmFsdWUgZnJvbSB0aGUgc3R5bGUgb2JqZWN0XG5cdFx0XHRyZXR1cm4gc3R5bGVbIG5hbWUgXTtcblx0XHR9XG5cdH0sXG5cblx0Y3NzOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgZXh0cmEsIHN0eWxlcyApIHtcblx0XHR2YXIgdmFsLCBudW0sIGhvb2tzLFxuXHRcdFx0b3JpZ05hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lICksXG5cdFx0XHRpc0N1c3RvbVByb3AgPSByY3VzdG9tUHJvcC50ZXN0KCBuYW1lICk7XG5cblx0XHQvLyBNYWtlIHN1cmUgdGhhdCB3ZSdyZSB3b3JraW5nIHdpdGggdGhlIHJpZ2h0IG5hbWUuIFdlIGRvbid0XG5cdFx0Ly8gd2FudCB0byBtb2RpZnkgdGhlIHZhbHVlIGlmIGl0IGlzIGEgQ1NTIGN1c3RvbSBwcm9wZXJ0eVxuXHRcdC8vIHNpbmNlIHRoZXkgYXJlIHVzZXItZGVmaW5lZC5cblx0XHRpZiAoICFpc0N1c3RvbVByb3AgKSB7XG5cdFx0XHRuYW1lID0gZmluYWxQcm9wTmFtZSggb3JpZ05hbWUgKTtcblx0XHR9XG5cblx0XHQvLyBUcnkgcHJlZml4ZWQgbmFtZSBmb2xsb3dlZCBieSB0aGUgdW5wcmVmaXhlZCBuYW1lXG5cdFx0aG9va3MgPSBqUXVlcnkuY3NzSG9va3NbIG5hbWUgXSB8fCBqUXVlcnkuY3NzSG9va3NbIG9yaWdOYW1lIF07XG5cblx0XHQvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkIGdldCB0aGUgY29tcHV0ZWQgdmFsdWUgZnJvbSB0aGVyZVxuXHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyApIHtcblx0XHRcdHZhbCA9IGhvb2tzLmdldCggZWxlbSwgdHJ1ZSwgZXh0cmEgKTtcblx0XHR9XG5cblx0XHQvLyBPdGhlcndpc2UsIGlmIGEgd2F5IHRvIGdldCB0aGUgY29tcHV0ZWQgdmFsdWUgZXhpc3RzLCB1c2UgdGhhdFxuXHRcdGlmICggdmFsID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHR2YWwgPSBjdXJDU1MoIGVsZW0sIG5hbWUsIHN0eWxlcyApO1xuXHRcdH1cblxuXHRcdC8vIENvbnZlcnQgXCJub3JtYWxcIiB0byBjb21wdXRlZCB2YWx1ZVxuXHRcdGlmICggdmFsID09PSBcIm5vcm1hbFwiICYmIG5hbWUgaW4gY3NzTm9ybWFsVHJhbnNmb3JtICkge1xuXHRcdFx0dmFsID0gY3NzTm9ybWFsVHJhbnNmb3JtWyBuYW1lIF07XG5cdFx0fVxuXG5cdFx0Ly8gTWFrZSBudW1lcmljIGlmIGZvcmNlZCBvciBhIHF1YWxpZmllciB3YXMgcHJvdmlkZWQgYW5kIHZhbCBsb29rcyBudW1lcmljXG5cdFx0aWYgKCBleHRyYSA9PT0gXCJcIiB8fCBleHRyYSApIHtcblx0XHRcdG51bSA9IHBhcnNlRmxvYXQoIHZhbCApO1xuXHRcdFx0cmV0dXJuIGV4dHJhID09PSB0cnVlIHx8IGlzRmluaXRlKCBudW0gKSA/IG51bSB8fCAwIDogdmFsO1xuXHRcdH1cblxuXHRcdHJldHVybiB2YWw7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmVhY2goIFsgXCJoZWlnaHRcIiwgXCJ3aWR0aFwiIF0sIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXHRqUXVlcnkuY3NzSG9va3NbIG5hbWUgXSA9IHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCwgZXh0cmEgKSB7XG5cdFx0XHRpZiAoIGNvbXB1dGVkICkge1xuXG5cdFx0XHRcdC8vIENlcnRhaW4gZWxlbWVudHMgY2FuIGhhdmUgZGltZW5zaW9uIGluZm8gaWYgd2UgaW52aXNpYmx5IHNob3cgdGhlbVxuXHRcdFx0XHQvLyBidXQgaXQgbXVzdCBoYXZlIGEgY3VycmVudCBkaXNwbGF5IHN0eWxlIHRoYXQgd291bGQgYmVuZWZpdFxuXHRcdFx0XHRyZXR1cm4gcmRpc3BsYXlzd2FwLnRlc3QoIGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICkgKSAmJlxuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogU2FmYXJpIDgrXG5cdFx0XHRcdFx0Ly8gVGFibGUgY29sdW1ucyBpbiBTYWZhcmkgaGF2ZSBub24temVybyBvZmZzZXRXaWR0aCAmIHplcm9cblx0XHRcdFx0XHQvLyBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCB1bmxlc3MgZGlzcGxheSBpcyBjaGFuZ2VkLlxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9MTEgb25seVxuXHRcdFx0XHRcdC8vIFJ1bm5pbmcgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG9uIGEgZGlzY29ubmVjdGVkIG5vZGVcblx0XHRcdFx0XHQvLyBpbiBJRSB0aHJvd3MgYW4gZXJyb3IuXG5cdFx0XHRcdFx0KCAhZWxlbS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCB8fCAhZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCApID9cblx0XHRcdFx0XHRcdHN3YXAoIGVsZW0sIGNzc1Nob3csIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZ2V0V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEgKTtcblx0XHRcdFx0XHRcdH0gKSA6XG5cdFx0XHRcdFx0XHRnZXRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBuYW1lLCBleHRyYSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSwgZXh0cmEgKSB7XG5cdFx0XHR2YXIgbWF0Y2hlcyxcblx0XHRcdFx0c3R5bGVzID0gZXh0cmEgJiYgZ2V0U3R5bGVzKCBlbGVtICksXG5cdFx0XHRcdHN1YnRyYWN0ID0gZXh0cmEgJiYgYXVnbWVudFdpZHRoT3JIZWlnaHQoXG5cdFx0XHRcdFx0ZWxlbSxcblx0XHRcdFx0XHRuYW1lLFxuXHRcdFx0XHRcdGV4dHJhLFxuXHRcdFx0XHRcdGpRdWVyeS5jc3MoIGVsZW0sIFwiYm94U2l6aW5nXCIsIGZhbHNlLCBzdHlsZXMgKSA9PT0gXCJib3JkZXItYm94XCIsXG5cdFx0XHRcdFx0c3R5bGVzXG5cdFx0XHRcdCk7XG5cblx0XHRcdC8vIENvbnZlcnQgdG8gcGl4ZWxzIGlmIHZhbHVlIGFkanVzdG1lbnQgaXMgbmVlZGVkXG5cdFx0XHRpZiAoIHN1YnRyYWN0ICYmICggbWF0Y2hlcyA9IHJjc3NOdW0uZXhlYyggdmFsdWUgKSApICYmXG5cdFx0XHRcdCggbWF0Y2hlc1sgMyBdIHx8IFwicHhcIiApICE9PSBcInB4XCIgKSB7XG5cblx0XHRcdFx0ZWxlbS5zdHlsZVsgbmFtZSBdID0gdmFsdWU7XG5cdFx0XHRcdHZhbHVlID0galF1ZXJ5LmNzcyggZWxlbSwgbmFtZSApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc2V0UG9zaXRpdmVOdW1iZXIoIGVsZW0sIHZhbHVlLCBzdWJ0cmFjdCApO1xuXHRcdH1cblx0fTtcbn0gKTtcblxualF1ZXJ5LmNzc0hvb2tzLm1hcmdpbkxlZnQgPSBhZGRHZXRIb29rSWYoIHN1cHBvcnQucmVsaWFibGVNYXJnaW5MZWZ0LFxuXHRmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG5cdFx0aWYgKCBjb21wdXRlZCApIHtcblx0XHRcdHJldHVybiAoIHBhcnNlRmxvYXQoIGN1ckNTUyggZWxlbSwgXCJtYXJnaW5MZWZ0XCIgKSApIHx8XG5cdFx0XHRcdGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtXG5cdFx0XHRcdFx0c3dhcCggZWxlbSwgeyBtYXJnaW5MZWZ0OiAwIH0sIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcblx0XHRcdFx0XHR9IClcblx0XHRcdFx0KSArIFwicHhcIjtcblx0XHR9XG5cdH1cbik7XG5cbi8vIFRoZXNlIGhvb2tzIGFyZSB1c2VkIGJ5IGFuaW1hdGUgdG8gZXhwYW5kIHByb3BlcnRpZXNcbmpRdWVyeS5lYWNoKCB7XG5cdG1hcmdpbjogXCJcIixcblx0cGFkZGluZzogXCJcIixcblx0Ym9yZGVyOiBcIldpZHRoXCJcbn0sIGZ1bmN0aW9uKCBwcmVmaXgsIHN1ZmZpeCApIHtcblx0alF1ZXJ5LmNzc0hvb2tzWyBwcmVmaXggKyBzdWZmaXggXSA9IHtcblx0XHRleHBhbmQ6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdHZhciBpID0gMCxcblx0XHRcdFx0ZXhwYW5kZWQgPSB7fSxcblxuXHRcdFx0XHQvLyBBc3N1bWVzIGEgc2luZ2xlIG51bWJlciBpZiBub3QgYSBzdHJpbmdcblx0XHRcdFx0cGFydHMgPSB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgPyB2YWx1ZS5zcGxpdCggXCIgXCIgKSA6IFsgdmFsdWUgXTtcblxuXHRcdFx0Zm9yICggOyBpIDwgNDsgaSsrICkge1xuXHRcdFx0XHRleHBhbmRlZFsgcHJlZml4ICsgY3NzRXhwYW5kWyBpIF0gKyBzdWZmaXggXSA9XG5cdFx0XHRcdFx0cGFydHNbIGkgXSB8fCBwYXJ0c1sgaSAtIDIgXSB8fCBwYXJ0c1sgMCBdO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZXhwYW5kZWQ7XG5cdFx0fVxuXHR9O1xuXG5cdGlmICggIXJtYXJnaW4udGVzdCggcHJlZml4ICkgKSB7XG5cdFx0alF1ZXJ5LmNzc0hvb2tzWyBwcmVmaXggKyBzdWZmaXggXS5zZXQgPSBzZXRQb3NpdGl2ZU51bWJlcjtcblx0fVxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGNzczogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSApIHtcblx0XHRcdHZhciBzdHlsZXMsIGxlbixcblx0XHRcdFx0bWFwID0ge30sXG5cdFx0XHRcdGkgPSAwO1xuXG5cdFx0XHRpZiAoIEFycmF5LmlzQXJyYXkoIG5hbWUgKSApIHtcblx0XHRcdFx0c3R5bGVzID0gZ2V0U3R5bGVzKCBlbGVtICk7XG5cdFx0XHRcdGxlbiA9IG5hbWUubGVuZ3RoO1xuXG5cdFx0XHRcdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRcdG1hcFsgbmFtZVsgaSBdIF0gPSBqUXVlcnkuY3NzKCBlbGVtLCBuYW1lWyBpIF0sIGZhbHNlLCBzdHlsZXMgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBtYXA7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkID9cblx0XHRcdFx0alF1ZXJ5LnN0eWxlKCBlbGVtLCBuYW1lLCB2YWx1ZSApIDpcblx0XHRcdFx0alF1ZXJ5LmNzcyggZWxlbSwgbmFtZSApO1xuXHRcdH0sIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xuXHR9XG59ICk7XG5cblxuZnVuY3Rpb24gVHdlZW4oIGVsZW0sIG9wdGlvbnMsIHByb3AsIGVuZCwgZWFzaW5nICkge1xuXHRyZXR1cm4gbmV3IFR3ZWVuLnByb3RvdHlwZS5pbml0KCBlbGVtLCBvcHRpb25zLCBwcm9wLCBlbmQsIGVhc2luZyApO1xufVxualF1ZXJ5LlR3ZWVuID0gVHdlZW47XG5cblR3ZWVuLnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IFR3ZWVuLFxuXHRpbml0OiBmdW5jdGlvbiggZWxlbSwgb3B0aW9ucywgcHJvcCwgZW5kLCBlYXNpbmcsIHVuaXQgKSB7XG5cdFx0dGhpcy5lbGVtID0gZWxlbTtcblx0XHR0aGlzLnByb3AgPSBwcm9wO1xuXHRcdHRoaXMuZWFzaW5nID0gZWFzaW5nIHx8IGpRdWVyeS5lYXNpbmcuX2RlZmF1bHQ7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0XHR0aGlzLnN0YXJ0ID0gdGhpcy5ub3cgPSB0aGlzLmN1cigpO1xuXHRcdHRoaXMuZW5kID0gZW5kO1xuXHRcdHRoaXMudW5pdCA9IHVuaXQgfHwgKCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gPyBcIlwiIDogXCJweFwiICk7XG5cdH0sXG5cdGN1cjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGhvb2tzID0gVHdlZW4ucHJvcEhvb2tzWyB0aGlzLnByb3AgXTtcblxuXHRcdHJldHVybiBob29rcyAmJiBob29rcy5nZXQgP1xuXHRcdFx0aG9va3MuZ2V0KCB0aGlzICkgOlxuXHRcdFx0VHdlZW4ucHJvcEhvb2tzLl9kZWZhdWx0LmdldCggdGhpcyApO1xuXHR9LFxuXHRydW46IGZ1bmN0aW9uKCBwZXJjZW50ICkge1xuXHRcdHZhciBlYXNlZCxcblx0XHRcdGhvb2tzID0gVHdlZW4ucHJvcEhvb2tzWyB0aGlzLnByb3AgXTtcblxuXHRcdGlmICggdGhpcy5vcHRpb25zLmR1cmF0aW9uICkge1xuXHRcdFx0dGhpcy5wb3MgPSBlYXNlZCA9IGpRdWVyeS5lYXNpbmdbIHRoaXMuZWFzaW5nIF0oXG5cdFx0XHRcdHBlcmNlbnQsIHRoaXMub3B0aW9ucy5kdXJhdGlvbiAqIHBlcmNlbnQsIDAsIDEsIHRoaXMub3B0aW9ucy5kdXJhdGlvblxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5wb3MgPSBlYXNlZCA9IHBlcmNlbnQ7XG5cdFx0fVxuXHRcdHRoaXMubm93ID0gKCB0aGlzLmVuZCAtIHRoaXMuc3RhcnQgKSAqIGVhc2VkICsgdGhpcy5zdGFydDtcblxuXHRcdGlmICggdGhpcy5vcHRpb25zLnN0ZXAgKSB7XG5cdFx0XHR0aGlzLm9wdGlvbnMuc3RlcC5jYWxsKCB0aGlzLmVsZW0sIHRoaXMubm93LCB0aGlzICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBob29rcyAmJiBob29rcy5zZXQgKSB7XG5cdFx0XHRob29rcy5zZXQoIHRoaXMgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0VHdlZW4ucHJvcEhvb2tzLl9kZWZhdWx0LnNldCggdGhpcyApO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxufTtcblxuVHdlZW4ucHJvdG90eXBlLmluaXQucHJvdG90eXBlID0gVHdlZW4ucHJvdG90eXBlO1xuXG5Ud2Vlbi5wcm9wSG9va3MgPSB7XG5cdF9kZWZhdWx0OiB7XG5cdFx0Z2V0OiBmdW5jdGlvbiggdHdlZW4gKSB7XG5cdFx0XHR2YXIgcmVzdWx0O1xuXG5cdFx0XHQvLyBVc2UgYSBwcm9wZXJ0eSBvbiB0aGUgZWxlbWVudCBkaXJlY3RseSB3aGVuIGl0IGlzIG5vdCBhIERPTSBlbGVtZW50LFxuXHRcdFx0Ly8gb3Igd2hlbiB0aGVyZSBpcyBubyBtYXRjaGluZyBzdHlsZSBwcm9wZXJ0eSB0aGF0IGV4aXN0cy5cblx0XHRcdGlmICggdHdlZW4uZWxlbS5ub2RlVHlwZSAhPT0gMSB8fFxuXHRcdFx0XHR0d2Vlbi5lbGVtWyB0d2Vlbi5wcm9wIF0gIT0gbnVsbCAmJiB0d2Vlbi5lbGVtLnN0eWxlWyB0d2Vlbi5wcm9wIF0gPT0gbnVsbCApIHtcblx0XHRcdFx0cmV0dXJuIHR3ZWVuLmVsZW1bIHR3ZWVuLnByb3AgXTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUGFzc2luZyBhbiBlbXB0eSBzdHJpbmcgYXMgYSAzcmQgcGFyYW1ldGVyIHRvIC5jc3Mgd2lsbCBhdXRvbWF0aWNhbGx5XG5cdFx0XHQvLyBhdHRlbXB0IGEgcGFyc2VGbG9hdCBhbmQgZmFsbGJhY2sgdG8gYSBzdHJpbmcgaWYgdGhlIHBhcnNlIGZhaWxzLlxuXHRcdFx0Ly8gU2ltcGxlIHZhbHVlcyBzdWNoIGFzIFwiMTBweFwiIGFyZSBwYXJzZWQgdG8gRmxvYXQ7XG5cdFx0XHQvLyBjb21wbGV4IHZhbHVlcyBzdWNoIGFzIFwicm90YXRlKDFyYWQpXCIgYXJlIHJldHVybmVkIGFzLWlzLlxuXHRcdFx0cmVzdWx0ID0galF1ZXJ5LmNzcyggdHdlZW4uZWxlbSwgdHdlZW4ucHJvcCwgXCJcIiApO1xuXG5cdFx0XHQvLyBFbXB0eSBzdHJpbmdzLCBudWxsLCB1bmRlZmluZWQgYW5kIFwiYXV0b1wiIGFyZSBjb252ZXJ0ZWQgdG8gMC5cblx0XHRcdHJldHVybiAhcmVzdWx0IHx8IHJlc3VsdCA9PT0gXCJhdXRvXCIgPyAwIDogcmVzdWx0O1xuXHRcdH0sXG5cdFx0c2V0OiBmdW5jdGlvbiggdHdlZW4gKSB7XG5cblx0XHRcdC8vIFVzZSBzdGVwIGhvb2sgZm9yIGJhY2sgY29tcGF0LlxuXHRcdFx0Ly8gVXNlIGNzc0hvb2sgaWYgaXRzIHRoZXJlLlxuXHRcdFx0Ly8gVXNlIC5zdHlsZSBpZiBhdmFpbGFibGUgYW5kIHVzZSBwbGFpbiBwcm9wZXJ0aWVzIHdoZXJlIGF2YWlsYWJsZS5cblx0XHRcdGlmICggalF1ZXJ5LmZ4LnN0ZXBbIHR3ZWVuLnByb3AgXSApIHtcblx0XHRcdFx0alF1ZXJ5LmZ4LnN0ZXBbIHR3ZWVuLnByb3AgXSggdHdlZW4gKTtcblx0XHRcdH0gZWxzZSBpZiAoIHR3ZWVuLmVsZW0ubm9kZVR5cGUgPT09IDEgJiZcblx0XHRcdFx0KCB0d2Vlbi5lbGVtLnN0eWxlWyBqUXVlcnkuY3NzUHJvcHNbIHR3ZWVuLnByb3AgXSBdICE9IG51bGwgfHxcblx0XHRcdFx0XHRqUXVlcnkuY3NzSG9va3NbIHR3ZWVuLnByb3AgXSApICkge1xuXHRcdFx0XHRqUXVlcnkuc3R5bGUoIHR3ZWVuLmVsZW0sIHR3ZWVuLnByb3AsIHR3ZWVuLm5vdyArIHR3ZWVuLnVuaXQgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHR3ZWVuLmVsZW1bIHR3ZWVuLnByb3AgXSA9IHR3ZWVuLm5vdztcblx0XHRcdH1cblx0XHR9XG5cdH1cbn07XG5cbi8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG4vLyBQYW5pYyBiYXNlZCBhcHByb2FjaCB0byBzZXR0aW5nIHRoaW5ncyBvbiBkaXNjb25uZWN0ZWQgbm9kZXNcblR3ZWVuLnByb3BIb29rcy5zY3JvbGxUb3AgPSBUd2Vlbi5wcm9wSG9va3Muc2Nyb2xsTGVmdCA9IHtcblx0c2V0OiBmdW5jdGlvbiggdHdlZW4gKSB7XG5cdFx0aWYgKCB0d2Vlbi5lbGVtLm5vZGVUeXBlICYmIHR3ZWVuLmVsZW0ucGFyZW50Tm9kZSApIHtcblx0XHRcdHR3ZWVuLmVsZW1bIHR3ZWVuLnByb3AgXSA9IHR3ZWVuLm5vdztcblx0XHR9XG5cdH1cbn07XG5cbmpRdWVyeS5lYXNpbmcgPSB7XG5cdGxpbmVhcjogZnVuY3Rpb24oIHAgKSB7XG5cdFx0cmV0dXJuIHA7XG5cdH0sXG5cdHN3aW5nOiBmdW5jdGlvbiggcCApIHtcblx0XHRyZXR1cm4gMC41IC0gTWF0aC5jb3MoIHAgKiBNYXRoLlBJICkgLyAyO1xuXHR9LFxuXHRfZGVmYXVsdDogXCJzd2luZ1wiXG59O1xuXG5qUXVlcnkuZnggPSBUd2Vlbi5wcm90b3R5cGUuaW5pdDtcblxuLy8gQmFjayBjb21wYXQgPDEuOCBleHRlbnNpb24gcG9pbnRcbmpRdWVyeS5meC5zdGVwID0ge307XG5cblxuXG5cbnZhclxuXHRmeE5vdywgaW5Qcm9ncmVzcyxcblx0cmZ4dHlwZXMgPSAvXig/OnRvZ2dsZXxzaG93fGhpZGUpJC8sXG5cdHJydW4gPSAvcXVldWVIb29rcyQvO1xuXG5mdW5jdGlvbiBzY2hlZHVsZSgpIHtcblx0aWYgKCBpblByb2dyZXNzICkge1xuXHRcdGlmICggZG9jdW1lbnQuaGlkZGVuID09PSBmYWxzZSAmJiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICkge1xuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggc2NoZWR1bGUgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0d2luZG93LnNldFRpbWVvdXQoIHNjaGVkdWxlLCBqUXVlcnkuZnguaW50ZXJ2YWwgKTtcblx0XHR9XG5cblx0XHRqUXVlcnkuZngudGljaygpO1xuXHR9XG59XG5cbi8vIEFuaW1hdGlvbnMgY3JlYXRlZCBzeW5jaHJvbm91c2x5IHdpbGwgcnVuIHN5bmNocm9ub3VzbHlcbmZ1bmN0aW9uIGNyZWF0ZUZ4Tm93KCkge1xuXHR3aW5kb3cuc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG5cdFx0ZnhOb3cgPSB1bmRlZmluZWQ7XG5cdH0gKTtcblx0cmV0dXJuICggZnhOb3cgPSBqUXVlcnkubm93KCkgKTtcbn1cblxuLy8gR2VuZXJhdGUgcGFyYW1ldGVycyB0byBjcmVhdGUgYSBzdGFuZGFyZCBhbmltYXRpb25cbmZ1bmN0aW9uIGdlbkZ4KCB0eXBlLCBpbmNsdWRlV2lkdGggKSB7XG5cdHZhciB3aGljaCxcblx0XHRpID0gMCxcblx0XHRhdHRycyA9IHsgaGVpZ2h0OiB0eXBlIH07XG5cblx0Ly8gSWYgd2UgaW5jbHVkZSB3aWR0aCwgc3RlcCB2YWx1ZSBpcyAxIHRvIGRvIGFsbCBjc3NFeHBhbmQgdmFsdWVzLFxuXHQvLyBvdGhlcndpc2Ugc3RlcCB2YWx1ZSBpcyAyIHRvIHNraXAgb3ZlciBMZWZ0IGFuZCBSaWdodFxuXHRpbmNsdWRlV2lkdGggPSBpbmNsdWRlV2lkdGggPyAxIDogMDtcblx0Zm9yICggOyBpIDwgNDsgaSArPSAyIC0gaW5jbHVkZVdpZHRoICkge1xuXHRcdHdoaWNoID0gY3NzRXhwYW5kWyBpIF07XG5cdFx0YXR0cnNbIFwibWFyZ2luXCIgKyB3aGljaCBdID0gYXR0cnNbIFwicGFkZGluZ1wiICsgd2hpY2ggXSA9IHR5cGU7XG5cdH1cblxuXHRpZiAoIGluY2x1ZGVXaWR0aCApIHtcblx0XHRhdHRycy5vcGFjaXR5ID0gYXR0cnMud2lkdGggPSB0eXBlO1xuXHR9XG5cblx0cmV0dXJuIGF0dHJzO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUd2VlbiggdmFsdWUsIHByb3AsIGFuaW1hdGlvbiApIHtcblx0dmFyIHR3ZWVuLFxuXHRcdGNvbGxlY3Rpb24gPSAoIEFuaW1hdGlvbi50d2VlbmVyc1sgcHJvcCBdIHx8IFtdICkuY29uY2F0KCBBbmltYXRpb24udHdlZW5lcnNbIFwiKlwiIF0gKSxcblx0XHRpbmRleCA9IDAsXG5cdFx0bGVuZ3RoID0gY29sbGVjdGlvbi5sZW5ndGg7XG5cdGZvciAoIDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0aWYgKCAoIHR3ZWVuID0gY29sbGVjdGlvblsgaW5kZXggXS5jYWxsKCBhbmltYXRpb24sIHByb3AsIHZhbHVlICkgKSApIHtcblxuXHRcdFx0Ly8gV2UncmUgZG9uZSB3aXRoIHRoaXMgcHJvcGVydHlcblx0XHRcdHJldHVybiB0d2Vlbjtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gZGVmYXVsdFByZWZpbHRlciggZWxlbSwgcHJvcHMsIG9wdHMgKSB7XG5cdHZhciBwcm9wLCB2YWx1ZSwgdG9nZ2xlLCBob29rcywgb2xkZmlyZSwgcHJvcFR3ZWVuLCByZXN0b3JlRGlzcGxheSwgZGlzcGxheSxcblx0XHRpc0JveCA9IFwid2lkdGhcIiBpbiBwcm9wcyB8fCBcImhlaWdodFwiIGluIHByb3BzLFxuXHRcdGFuaW0gPSB0aGlzLFxuXHRcdG9yaWcgPSB7fSxcblx0XHRzdHlsZSA9IGVsZW0uc3R5bGUsXG5cdFx0aGlkZGVuID0gZWxlbS5ub2RlVHlwZSAmJiBpc0hpZGRlbldpdGhpblRyZWUoIGVsZW0gKSxcblx0XHRkYXRhU2hvdyA9IGRhdGFQcml2LmdldCggZWxlbSwgXCJmeHNob3dcIiApO1xuXG5cdC8vIFF1ZXVlLXNraXBwaW5nIGFuaW1hdGlvbnMgaGlqYWNrIHRoZSBmeCBob29rc1xuXHRpZiAoICFvcHRzLnF1ZXVlICkge1xuXHRcdGhvb2tzID0galF1ZXJ5Ll9xdWV1ZUhvb2tzKCBlbGVtLCBcImZ4XCIgKTtcblx0XHRpZiAoIGhvb2tzLnVucXVldWVkID09IG51bGwgKSB7XG5cdFx0XHRob29rcy51bnF1ZXVlZCA9IDA7XG5cdFx0XHRvbGRmaXJlID0gaG9va3MuZW1wdHkuZmlyZTtcblx0XHRcdGhvb2tzLmVtcHR5LmZpcmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCAhaG9va3MudW5xdWV1ZWQgKSB7XG5cdFx0XHRcdFx0b2xkZmlyZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblx0XHRob29rcy51bnF1ZXVlZCsrO1xuXG5cdFx0YW5pbS5hbHdheXMoIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBFbnN1cmUgdGhlIGNvbXBsZXRlIGhhbmRsZXIgaXMgY2FsbGVkIGJlZm9yZSB0aGlzIGNvbXBsZXRlc1xuXHRcdFx0YW5pbS5hbHdheXMoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRob29rcy51bnF1ZXVlZC0tO1xuXHRcdFx0XHRpZiAoICFqUXVlcnkucXVldWUoIGVsZW0sIFwiZnhcIiApLmxlbmd0aCApIHtcblx0XHRcdFx0XHRob29rcy5lbXB0eS5maXJlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0XHR9ICk7XG5cdH1cblxuXHQvLyBEZXRlY3Qgc2hvdy9oaWRlIGFuaW1hdGlvbnNcblx0Zm9yICggcHJvcCBpbiBwcm9wcyApIHtcblx0XHR2YWx1ZSA9IHByb3BzWyBwcm9wIF07XG5cdFx0aWYgKCByZnh0eXBlcy50ZXN0KCB2YWx1ZSApICkge1xuXHRcdFx0ZGVsZXRlIHByb3BzWyBwcm9wIF07XG5cdFx0XHR0b2dnbGUgPSB0b2dnbGUgfHwgdmFsdWUgPT09IFwidG9nZ2xlXCI7XG5cdFx0XHRpZiAoIHZhbHVlID09PSAoIGhpZGRlbiA/IFwiaGlkZVwiIDogXCJzaG93XCIgKSApIHtcblxuXHRcdFx0XHQvLyBQcmV0ZW5kIHRvIGJlIGhpZGRlbiBpZiB0aGlzIGlzIGEgXCJzaG93XCIgYW5kXG5cdFx0XHRcdC8vIHRoZXJlIGlzIHN0aWxsIGRhdGEgZnJvbSBhIHN0b3BwZWQgc2hvdy9oaWRlXG5cdFx0XHRcdGlmICggdmFsdWUgPT09IFwic2hvd1wiICYmIGRhdGFTaG93ICYmIGRhdGFTaG93WyBwcm9wIF0gIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRoaWRkZW4gPSB0cnVlO1xuXG5cdFx0XHRcdC8vIElnbm9yZSBhbGwgb3RoZXIgbm8tb3Agc2hvdy9oaWRlIGRhdGFcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0b3JpZ1sgcHJvcCBdID0gZGF0YVNob3cgJiYgZGF0YVNob3dbIHByb3AgXSB8fCBqUXVlcnkuc3R5bGUoIGVsZW0sIHByb3AgKTtcblx0XHR9XG5cdH1cblxuXHQvLyBCYWlsIG91dCBpZiB0aGlzIGlzIGEgbm8tb3AgbGlrZSAuaGlkZSgpLmhpZGUoKVxuXHRwcm9wVHdlZW4gPSAhalF1ZXJ5LmlzRW1wdHlPYmplY3QoIHByb3BzICk7XG5cdGlmICggIXByb3BUd2VlbiAmJiBqUXVlcnkuaXNFbXB0eU9iamVjdCggb3JpZyApICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIFJlc3RyaWN0IFwib3ZlcmZsb3dcIiBhbmQgXCJkaXNwbGF5XCIgc3R5bGVzIGR1cmluZyBib3ggYW5pbWF0aW9uc1xuXHRpZiAoIGlzQm94ICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cblx0XHQvLyBTdXBwb3J0OiBJRSA8PTkgLSAxMSwgRWRnZSAxMiAtIDEzXG5cdFx0Ly8gUmVjb3JkIGFsbCAzIG92ZXJmbG93IGF0dHJpYnV0ZXMgYmVjYXVzZSBJRSBkb2VzIG5vdCBpbmZlciB0aGUgc2hvcnRoYW5kXG5cdFx0Ly8gZnJvbSBpZGVudGljYWxseS12YWx1ZWQgb3ZlcmZsb3dYIGFuZCBvdmVyZmxvd1lcblx0XHRvcHRzLm92ZXJmbG93ID0gWyBzdHlsZS5vdmVyZmxvdywgc3R5bGUub3ZlcmZsb3dYLCBzdHlsZS5vdmVyZmxvd1kgXTtcblxuXHRcdC8vIElkZW50aWZ5IGEgZGlzcGxheSB0eXBlLCBwcmVmZXJyaW5nIG9sZCBzaG93L2hpZGUgZGF0YSBvdmVyIHRoZSBDU1MgY2FzY2FkZVxuXHRcdHJlc3RvcmVEaXNwbGF5ID0gZGF0YVNob3cgJiYgZGF0YVNob3cuZGlzcGxheTtcblx0XHRpZiAoIHJlc3RvcmVEaXNwbGF5ID09IG51bGwgKSB7XG5cdFx0XHRyZXN0b3JlRGlzcGxheSA9IGRhdGFQcml2LmdldCggZWxlbSwgXCJkaXNwbGF5XCIgKTtcblx0XHR9XG5cdFx0ZGlzcGxheSA9IGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICk7XG5cdFx0aWYgKCBkaXNwbGF5ID09PSBcIm5vbmVcIiApIHtcblx0XHRcdGlmICggcmVzdG9yZURpc3BsYXkgKSB7XG5cdFx0XHRcdGRpc3BsYXkgPSByZXN0b3JlRGlzcGxheTtcblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Ly8gR2V0IG5vbmVtcHR5IHZhbHVlKHMpIGJ5IHRlbXBvcmFyaWx5IGZvcmNpbmcgdmlzaWJpbGl0eVxuXHRcdFx0XHRzaG93SGlkZSggWyBlbGVtIF0sIHRydWUgKTtcblx0XHRcdFx0cmVzdG9yZURpc3BsYXkgPSBlbGVtLnN0eWxlLmRpc3BsYXkgfHwgcmVzdG9yZURpc3BsYXk7XG5cdFx0XHRcdGRpc3BsYXkgPSBqUXVlcnkuY3NzKCBlbGVtLCBcImRpc3BsYXlcIiApO1xuXHRcdFx0XHRzaG93SGlkZSggWyBlbGVtIF0gKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBBbmltYXRlIGlubGluZSBlbGVtZW50cyBhcyBpbmxpbmUtYmxvY2tcblx0XHRpZiAoIGRpc3BsYXkgPT09IFwiaW5saW5lXCIgfHwgZGlzcGxheSA9PT0gXCJpbmxpbmUtYmxvY2tcIiAmJiByZXN0b3JlRGlzcGxheSAhPSBudWxsICkge1xuXHRcdFx0aWYgKCBqUXVlcnkuY3NzKCBlbGVtLCBcImZsb2F0XCIgKSA9PT0gXCJub25lXCIgKSB7XG5cblx0XHRcdFx0Ly8gUmVzdG9yZSB0aGUgb3JpZ2luYWwgZGlzcGxheSB2YWx1ZSBhdCB0aGUgZW5kIG9mIHB1cmUgc2hvdy9oaWRlIGFuaW1hdGlvbnNcblx0XHRcdFx0aWYgKCAhcHJvcFR3ZWVuICkge1xuXHRcdFx0XHRcdGFuaW0uZG9uZSggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRzdHlsZS5kaXNwbGF5ID0gcmVzdG9yZURpc3BsYXk7XG5cdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdGlmICggcmVzdG9yZURpc3BsYXkgPT0gbnVsbCApIHtcblx0XHRcdFx0XHRcdGRpc3BsYXkgPSBzdHlsZS5kaXNwbGF5O1xuXHRcdFx0XHRcdFx0cmVzdG9yZURpc3BsYXkgPSBkaXNwbGF5ID09PSBcIm5vbmVcIiA/IFwiXCIgOiBkaXNwbGF5O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRzdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZiAoIG9wdHMub3ZlcmZsb3cgKSB7XG5cdFx0c3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuXHRcdGFuaW0uYWx3YXlzKCBmdW5jdGlvbigpIHtcblx0XHRcdHN0eWxlLm92ZXJmbG93ID0gb3B0cy5vdmVyZmxvd1sgMCBdO1xuXHRcdFx0c3R5bGUub3ZlcmZsb3dYID0gb3B0cy5vdmVyZmxvd1sgMSBdO1xuXHRcdFx0c3R5bGUub3ZlcmZsb3dZID0gb3B0cy5vdmVyZmxvd1sgMiBdO1xuXHRcdH0gKTtcblx0fVxuXG5cdC8vIEltcGxlbWVudCBzaG93L2hpZGUgYW5pbWF0aW9uc1xuXHRwcm9wVHdlZW4gPSBmYWxzZTtcblx0Zm9yICggcHJvcCBpbiBvcmlnICkge1xuXG5cdFx0Ly8gR2VuZXJhbCBzaG93L2hpZGUgc2V0dXAgZm9yIHRoaXMgZWxlbWVudCBhbmltYXRpb25cblx0XHRpZiAoICFwcm9wVHdlZW4gKSB7XG5cdFx0XHRpZiAoIGRhdGFTaG93ICkge1xuXHRcdFx0XHRpZiAoIFwiaGlkZGVuXCIgaW4gZGF0YVNob3cgKSB7XG5cdFx0XHRcdFx0aGlkZGVuID0gZGF0YVNob3cuaGlkZGVuO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkYXRhU2hvdyA9IGRhdGFQcml2LmFjY2VzcyggZWxlbSwgXCJmeHNob3dcIiwgeyBkaXNwbGF5OiByZXN0b3JlRGlzcGxheSB9ICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN0b3JlIGhpZGRlbi92aXNpYmxlIGZvciB0b2dnbGUgc28gYC5zdG9wKCkudG9nZ2xlKClgIFwicmV2ZXJzZXNcIlxuXHRcdFx0aWYgKCB0b2dnbGUgKSB7XG5cdFx0XHRcdGRhdGFTaG93LmhpZGRlbiA9ICFoaWRkZW47XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNob3cgZWxlbWVudHMgYmVmb3JlIGFuaW1hdGluZyB0aGVtXG5cdFx0XHRpZiAoIGhpZGRlbiApIHtcblx0XHRcdFx0c2hvd0hpZGUoIFsgZWxlbSBdLCB0cnVlICk7XG5cdFx0XHR9XG5cblx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLWxvb3AtZnVuYyAqL1xuXG5cdFx0XHRhbmltLmRvbmUoIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLWxvb3AtZnVuYyAqL1xuXG5cdFx0XHRcdC8vIFRoZSBmaW5hbCBzdGVwIG9mIGEgXCJoaWRlXCIgYW5pbWF0aW9uIGlzIGFjdHVhbGx5IGhpZGluZyB0aGUgZWxlbWVudFxuXHRcdFx0XHRpZiAoICFoaWRkZW4gKSB7XG5cdFx0XHRcdFx0c2hvd0hpZGUoIFsgZWxlbSBdICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGF0YVByaXYucmVtb3ZlKCBlbGVtLCBcImZ4c2hvd1wiICk7XG5cdFx0XHRcdGZvciAoIHByb3AgaW4gb3JpZyApIHtcblx0XHRcdFx0XHRqUXVlcnkuc3R5bGUoIGVsZW0sIHByb3AsIG9yaWdbIHByb3AgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0Ly8gUGVyLXByb3BlcnR5IHNldHVwXG5cdFx0cHJvcFR3ZWVuID0gY3JlYXRlVHdlZW4oIGhpZGRlbiA/IGRhdGFTaG93WyBwcm9wIF0gOiAwLCBwcm9wLCBhbmltICk7XG5cdFx0aWYgKCAhKCBwcm9wIGluIGRhdGFTaG93ICkgKSB7XG5cdFx0XHRkYXRhU2hvd1sgcHJvcCBdID0gcHJvcFR3ZWVuLnN0YXJ0O1xuXHRcdFx0aWYgKCBoaWRkZW4gKSB7XG5cdFx0XHRcdHByb3BUd2Vlbi5lbmQgPSBwcm9wVHdlZW4uc3RhcnQ7XG5cdFx0XHRcdHByb3BUd2Vlbi5zdGFydCA9IDA7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHByb3BGaWx0ZXIoIHByb3BzLCBzcGVjaWFsRWFzaW5nICkge1xuXHR2YXIgaW5kZXgsIG5hbWUsIGVhc2luZywgdmFsdWUsIGhvb2tzO1xuXG5cdC8vIGNhbWVsQ2FzZSwgc3BlY2lhbEVhc2luZyBhbmQgZXhwYW5kIGNzc0hvb2sgcGFzc1xuXHRmb3IgKCBpbmRleCBpbiBwcm9wcyApIHtcblx0XHRuYW1lID0galF1ZXJ5LmNhbWVsQ2FzZSggaW5kZXggKTtcblx0XHRlYXNpbmcgPSBzcGVjaWFsRWFzaW5nWyBuYW1lIF07XG5cdFx0dmFsdWUgPSBwcm9wc1sgaW5kZXggXTtcblx0XHRpZiAoIEFycmF5LmlzQXJyYXkoIHZhbHVlICkgKSB7XG5cdFx0XHRlYXNpbmcgPSB2YWx1ZVsgMSBdO1xuXHRcdFx0dmFsdWUgPSBwcm9wc1sgaW5kZXggXSA9IHZhbHVlWyAwIF07XG5cdFx0fVxuXG5cdFx0aWYgKCBpbmRleCAhPT0gbmFtZSApIHtcblx0XHRcdHByb3BzWyBuYW1lIF0gPSB2YWx1ZTtcblx0XHRcdGRlbGV0ZSBwcm9wc1sgaW5kZXggXTtcblx0XHR9XG5cblx0XHRob29rcyA9IGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdO1xuXHRcdGlmICggaG9va3MgJiYgXCJleHBhbmRcIiBpbiBob29rcyApIHtcblx0XHRcdHZhbHVlID0gaG9va3MuZXhwYW5kKCB2YWx1ZSApO1xuXHRcdFx0ZGVsZXRlIHByb3BzWyBuYW1lIF07XG5cblx0XHRcdC8vIE5vdCBxdWl0ZSAkLmV4dGVuZCwgdGhpcyB3b24ndCBvdmVyd3JpdGUgZXhpc3Rpbmcga2V5cy5cblx0XHRcdC8vIFJldXNpbmcgJ2luZGV4JyBiZWNhdXNlIHdlIGhhdmUgdGhlIGNvcnJlY3QgXCJuYW1lXCJcblx0XHRcdGZvciAoIGluZGV4IGluIHZhbHVlICkge1xuXHRcdFx0XHRpZiAoICEoIGluZGV4IGluIHByb3BzICkgKSB7XG5cdFx0XHRcdFx0cHJvcHNbIGluZGV4IF0gPSB2YWx1ZVsgaW5kZXggXTtcblx0XHRcdFx0XHRzcGVjaWFsRWFzaW5nWyBpbmRleCBdID0gZWFzaW5nO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNwZWNpYWxFYXNpbmdbIG5hbWUgXSA9IGVhc2luZztcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gQW5pbWF0aW9uKCBlbGVtLCBwcm9wZXJ0aWVzLCBvcHRpb25zICkge1xuXHR2YXIgcmVzdWx0LFxuXHRcdHN0b3BwZWQsXG5cdFx0aW5kZXggPSAwLFxuXHRcdGxlbmd0aCA9IEFuaW1hdGlvbi5wcmVmaWx0ZXJzLmxlbmd0aCxcblx0XHRkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLmFsd2F5cyggZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIERvbid0IG1hdGNoIGVsZW0gaW4gdGhlIDphbmltYXRlZCBzZWxlY3RvclxuXHRcdFx0ZGVsZXRlIHRpY2suZWxlbTtcblx0XHR9ICksXG5cdFx0dGljayA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCBzdG9wcGVkICkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHR2YXIgY3VycmVudFRpbWUgPSBmeE5vdyB8fCBjcmVhdGVGeE5vdygpLFxuXHRcdFx0XHRyZW1haW5pbmcgPSBNYXRoLm1heCggMCwgYW5pbWF0aW9uLnN0YXJ0VGltZSArIGFuaW1hdGlvbi5kdXJhdGlvbiAtIGN1cnJlbnRUaW1lICksXG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCAyLjMgb25seVxuXHRcdFx0XHQvLyBBcmNoYWljIGNyYXNoIGJ1ZyB3b24ndCBhbGxvdyB1cyB0byB1c2UgYDEgLSAoIDAuNSB8fCAwIClgICgjMTI0OTcpXG5cdFx0XHRcdHRlbXAgPSByZW1haW5pbmcgLyBhbmltYXRpb24uZHVyYXRpb24gfHwgMCxcblx0XHRcdFx0cGVyY2VudCA9IDEgLSB0ZW1wLFxuXHRcdFx0XHRpbmRleCA9IDAsXG5cdFx0XHRcdGxlbmd0aCA9IGFuaW1hdGlvbi50d2VlbnMubGVuZ3RoO1xuXG5cdFx0XHRmb3IgKCA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuXHRcdFx0XHRhbmltYXRpb24udHdlZW5zWyBpbmRleCBdLnJ1biggcGVyY2VudCApO1xuXHRcdFx0fVxuXG5cdFx0XHRkZWZlcnJlZC5ub3RpZnlXaXRoKCBlbGVtLCBbIGFuaW1hdGlvbiwgcGVyY2VudCwgcmVtYWluaW5nIF0gKTtcblxuXHRcdFx0Ly8gSWYgdGhlcmUncyBtb3JlIHRvIGRvLCB5aWVsZFxuXHRcdFx0aWYgKCBwZXJjZW50IDwgMSAmJiBsZW5ndGggKSB7XG5cdFx0XHRcdHJldHVybiByZW1haW5pbmc7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIHRoaXMgd2FzIGFuIGVtcHR5IGFuaW1hdGlvbiwgc3ludGhlc2l6ZSBhIGZpbmFsIHByb2dyZXNzIG5vdGlmaWNhdGlvblxuXHRcdFx0aWYgKCAhbGVuZ3RoICkge1xuXHRcdFx0XHRkZWZlcnJlZC5ub3RpZnlXaXRoKCBlbGVtLCBbIGFuaW1hdGlvbiwgMSwgMCBdICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlc29sdmUgdGhlIGFuaW1hdGlvbiBhbmQgcmVwb3J0IGl0cyBjb25jbHVzaW9uXG5cdFx0XHRkZWZlcnJlZC5yZXNvbHZlV2l0aCggZWxlbSwgWyBhbmltYXRpb24gXSApO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0sXG5cdFx0YW5pbWF0aW9uID0gZGVmZXJyZWQucHJvbWlzZSgge1xuXHRcdFx0ZWxlbTogZWxlbSxcblx0XHRcdHByb3BzOiBqUXVlcnkuZXh0ZW5kKCB7fSwgcHJvcGVydGllcyApLFxuXHRcdFx0b3B0czogalF1ZXJ5LmV4dGVuZCggdHJ1ZSwge1xuXHRcdFx0XHRzcGVjaWFsRWFzaW5nOiB7fSxcblx0XHRcdFx0ZWFzaW5nOiBqUXVlcnkuZWFzaW5nLl9kZWZhdWx0XG5cdFx0XHR9LCBvcHRpb25zICksXG5cdFx0XHRvcmlnaW5hbFByb3BlcnRpZXM6IHByb3BlcnRpZXMsXG5cdFx0XHRvcmlnaW5hbE9wdGlvbnM6IG9wdGlvbnMsXG5cdFx0XHRzdGFydFRpbWU6IGZ4Tm93IHx8IGNyZWF0ZUZ4Tm93KCksXG5cdFx0XHRkdXJhdGlvbjogb3B0aW9ucy5kdXJhdGlvbixcblx0XHRcdHR3ZWVuczogW10sXG5cdFx0XHRjcmVhdGVUd2VlbjogZnVuY3Rpb24oIHByb3AsIGVuZCApIHtcblx0XHRcdFx0dmFyIHR3ZWVuID0galF1ZXJ5LlR3ZWVuKCBlbGVtLCBhbmltYXRpb24ub3B0cywgcHJvcCwgZW5kLFxuXHRcdFx0XHRcdFx0YW5pbWF0aW9uLm9wdHMuc3BlY2lhbEVhc2luZ1sgcHJvcCBdIHx8IGFuaW1hdGlvbi5vcHRzLmVhc2luZyApO1xuXHRcdFx0XHRhbmltYXRpb24udHdlZW5zLnB1c2goIHR3ZWVuICk7XG5cdFx0XHRcdHJldHVybiB0d2Vlbjtcblx0XHRcdH0sXG5cdFx0XHRzdG9wOiBmdW5jdGlvbiggZ290b0VuZCApIHtcblx0XHRcdFx0dmFyIGluZGV4ID0gMCxcblxuXHRcdFx0XHRcdC8vIElmIHdlIGFyZSBnb2luZyB0byB0aGUgZW5kLCB3ZSB3YW50IHRvIHJ1biBhbGwgdGhlIHR3ZWVuc1xuXHRcdFx0XHRcdC8vIG90aGVyd2lzZSB3ZSBza2lwIHRoaXMgcGFydFxuXHRcdFx0XHRcdGxlbmd0aCA9IGdvdG9FbmQgPyBhbmltYXRpb24udHdlZW5zLmxlbmd0aCA6IDA7XG5cdFx0XHRcdGlmICggc3RvcHBlZCApIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0XHRzdG9wcGVkID0gdHJ1ZTtcblx0XHRcdFx0Zm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRcdFx0XHRhbmltYXRpb24udHdlZW5zWyBpbmRleCBdLnJ1biggMSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUmVzb2x2ZSB3aGVuIHdlIHBsYXllZCB0aGUgbGFzdCBmcmFtZTsgb3RoZXJ3aXNlLCByZWplY3Rcblx0XHRcdFx0aWYgKCBnb3RvRW5kICkge1xuXHRcdFx0XHRcdGRlZmVycmVkLm5vdGlmeVdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uLCAxLCAwIF0gKTtcblx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlV2l0aCggZWxlbSwgWyBhbmltYXRpb24sIGdvdG9FbmQgXSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdFdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uLCBnb3RvRW5kIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9ICksXG5cdFx0cHJvcHMgPSBhbmltYXRpb24ucHJvcHM7XG5cblx0cHJvcEZpbHRlciggcHJvcHMsIGFuaW1hdGlvbi5vcHRzLnNwZWNpYWxFYXNpbmcgKTtcblxuXHRmb3IgKCA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuXHRcdHJlc3VsdCA9IEFuaW1hdGlvbi5wcmVmaWx0ZXJzWyBpbmRleCBdLmNhbGwoIGFuaW1hdGlvbiwgZWxlbSwgcHJvcHMsIGFuaW1hdGlvbi5vcHRzICk7XG5cdFx0aWYgKCByZXN1bHQgKSB7XG5cdFx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCByZXN1bHQuc3RvcCApICkge1xuXHRcdFx0XHRqUXVlcnkuX3F1ZXVlSG9va3MoIGFuaW1hdGlvbi5lbGVtLCBhbmltYXRpb24ub3B0cy5xdWV1ZSApLnN0b3AgPVxuXHRcdFx0XHRcdGpRdWVyeS5wcm94eSggcmVzdWx0LnN0b3AsIHJlc3VsdCApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cdH1cblxuXHRqUXVlcnkubWFwKCBwcm9wcywgY3JlYXRlVHdlZW4sIGFuaW1hdGlvbiApO1xuXG5cdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGFuaW1hdGlvbi5vcHRzLnN0YXJ0ICkgKSB7XG5cdFx0YW5pbWF0aW9uLm9wdHMuc3RhcnQuY2FsbCggZWxlbSwgYW5pbWF0aW9uICk7XG5cdH1cblxuXHQvLyBBdHRhY2ggY2FsbGJhY2tzIGZyb20gb3B0aW9uc1xuXHRhbmltYXRpb25cblx0XHQucHJvZ3Jlc3MoIGFuaW1hdGlvbi5vcHRzLnByb2dyZXNzIClcblx0XHQuZG9uZSggYW5pbWF0aW9uLm9wdHMuZG9uZSwgYW5pbWF0aW9uLm9wdHMuY29tcGxldGUgKVxuXHRcdC5mYWlsKCBhbmltYXRpb24ub3B0cy5mYWlsIClcblx0XHQuYWx3YXlzKCBhbmltYXRpb24ub3B0cy5hbHdheXMgKTtcblxuXHRqUXVlcnkuZngudGltZXIoXG5cdFx0alF1ZXJ5LmV4dGVuZCggdGljaywge1xuXHRcdFx0ZWxlbTogZWxlbSxcblx0XHRcdGFuaW06IGFuaW1hdGlvbixcblx0XHRcdHF1ZXVlOiBhbmltYXRpb24ub3B0cy5xdWV1ZVxuXHRcdH0gKVxuXHQpO1xuXG5cdHJldHVybiBhbmltYXRpb247XG59XG5cbmpRdWVyeS5BbmltYXRpb24gPSBqUXVlcnkuZXh0ZW5kKCBBbmltYXRpb24sIHtcblxuXHR0d2VlbmVyczoge1xuXHRcdFwiKlwiOiBbIGZ1bmN0aW9uKCBwcm9wLCB2YWx1ZSApIHtcblx0XHRcdHZhciB0d2VlbiA9IHRoaXMuY3JlYXRlVHdlZW4oIHByb3AsIHZhbHVlICk7XG5cdFx0XHRhZGp1c3RDU1MoIHR3ZWVuLmVsZW0sIHByb3AsIHJjc3NOdW0uZXhlYyggdmFsdWUgKSwgdHdlZW4gKTtcblx0XHRcdHJldHVybiB0d2Vlbjtcblx0XHR9IF1cblx0fSxcblxuXHR0d2VlbmVyOiBmdW5jdGlvbiggcHJvcHMsIGNhbGxiYWNrICkge1xuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHByb3BzICkgKSB7XG5cdFx0XHRjYWxsYmFjayA9IHByb3BzO1xuXHRcdFx0cHJvcHMgPSBbIFwiKlwiIF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHByb3BzID0gcHJvcHMubWF0Y2goIHJub3RodG1sd2hpdGUgKTtcblx0XHR9XG5cblx0XHR2YXIgcHJvcCxcblx0XHRcdGluZGV4ID0gMCxcblx0XHRcdGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuXHRcdGZvciAoIDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0XHRwcm9wID0gcHJvcHNbIGluZGV4IF07XG5cdFx0XHRBbmltYXRpb24udHdlZW5lcnNbIHByb3AgXSA9IEFuaW1hdGlvbi50d2VlbmVyc1sgcHJvcCBdIHx8IFtdO1xuXHRcdFx0QW5pbWF0aW9uLnR3ZWVuZXJzWyBwcm9wIF0udW5zaGlmdCggY2FsbGJhY2sgKTtcblx0XHR9XG5cdH0sXG5cblx0cHJlZmlsdGVyczogWyBkZWZhdWx0UHJlZmlsdGVyIF0sXG5cblx0cHJlZmlsdGVyOiBmdW5jdGlvbiggY2FsbGJhY2ssIHByZXBlbmQgKSB7XG5cdFx0aWYgKCBwcmVwZW5kICkge1xuXHRcdFx0QW5pbWF0aW9uLnByZWZpbHRlcnMudW5zaGlmdCggY2FsbGJhY2sgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0QW5pbWF0aW9uLnByZWZpbHRlcnMucHVzaCggY2FsbGJhY2sgKTtcblx0XHR9XG5cdH1cbn0gKTtcblxualF1ZXJ5LnNwZWVkID0gZnVuY3Rpb24oIHNwZWVkLCBlYXNpbmcsIGZuICkge1xuXHR2YXIgb3B0ID0gc3BlZWQgJiYgdHlwZW9mIHNwZWVkID09PSBcIm9iamVjdFwiID8galF1ZXJ5LmV4dGVuZCgge30sIHNwZWVkICkgOiB7XG5cdFx0Y29tcGxldGU6IGZuIHx8ICFmbiAmJiBlYXNpbmcgfHxcblx0XHRcdGpRdWVyeS5pc0Z1bmN0aW9uKCBzcGVlZCApICYmIHNwZWVkLFxuXHRcdGR1cmF0aW9uOiBzcGVlZCxcblx0XHRlYXNpbmc6IGZuICYmIGVhc2luZyB8fCBlYXNpbmcgJiYgIWpRdWVyeS5pc0Z1bmN0aW9uKCBlYXNpbmcgKSAmJiBlYXNpbmdcblx0fTtcblxuXHQvLyBHbyB0byB0aGUgZW5kIHN0YXRlIGlmIGZ4IGFyZSBvZmZcblx0aWYgKCBqUXVlcnkuZngub2ZmICkge1xuXHRcdG9wdC5kdXJhdGlvbiA9IDA7XG5cblx0fSBlbHNlIHtcblx0XHRpZiAoIHR5cGVvZiBvcHQuZHVyYXRpb24gIT09IFwibnVtYmVyXCIgKSB7XG5cdFx0XHRpZiAoIG9wdC5kdXJhdGlvbiBpbiBqUXVlcnkuZnguc3BlZWRzICkge1xuXHRcdFx0XHRvcHQuZHVyYXRpb24gPSBqUXVlcnkuZnguc3BlZWRzWyBvcHQuZHVyYXRpb24gXTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b3B0LmR1cmF0aW9uID0galF1ZXJ5LmZ4LnNwZWVkcy5fZGVmYXVsdDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBOb3JtYWxpemUgb3B0LnF1ZXVlIC0gdHJ1ZS91bmRlZmluZWQvbnVsbCAtPiBcImZ4XCJcblx0aWYgKCBvcHQucXVldWUgPT0gbnVsbCB8fCBvcHQucXVldWUgPT09IHRydWUgKSB7XG5cdFx0b3B0LnF1ZXVlID0gXCJmeFwiO1xuXHR9XG5cblx0Ly8gUXVldWVpbmdcblx0b3B0Lm9sZCA9IG9wdC5jb21wbGV0ZTtcblxuXHRvcHQuY29tcGxldGUgPSBmdW5jdGlvbigpIHtcblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBvcHQub2xkICkgKSB7XG5cdFx0XHRvcHQub2xkLmNhbGwoIHRoaXMgKTtcblx0XHR9XG5cblx0XHRpZiAoIG9wdC5xdWV1ZSApIHtcblx0XHRcdGpRdWVyeS5kZXF1ZXVlKCB0aGlzLCBvcHQucXVldWUgKTtcblx0XHR9XG5cdH07XG5cblx0cmV0dXJuIG9wdDtcbn07XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0ZmFkZVRvOiBmdW5jdGlvbiggc3BlZWQsIHRvLCBlYXNpbmcsIGNhbGxiYWNrICkge1xuXG5cdFx0Ly8gU2hvdyBhbnkgaGlkZGVuIGVsZW1lbnRzIGFmdGVyIHNldHRpbmcgb3BhY2l0eSB0byAwXG5cdFx0cmV0dXJuIHRoaXMuZmlsdGVyKCBpc0hpZGRlbldpdGhpblRyZWUgKS5jc3MoIFwib3BhY2l0eVwiLCAwICkuc2hvdygpXG5cblx0XHRcdC8vIEFuaW1hdGUgdG8gdGhlIHZhbHVlIHNwZWNpZmllZFxuXHRcdFx0LmVuZCgpLmFuaW1hdGUoIHsgb3BhY2l0eTogdG8gfSwgc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKTtcblx0fSxcblx0YW5pbWF0ZTogZnVuY3Rpb24oIHByb3AsIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICkge1xuXHRcdHZhciBlbXB0eSA9IGpRdWVyeS5pc0VtcHR5T2JqZWN0KCBwcm9wICksXG5cdFx0XHRvcHRhbGwgPSBqUXVlcnkuc3BlZWQoIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICksXG5cdFx0XHRkb0FuaW1hdGlvbiA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdC8vIE9wZXJhdGUgb24gYSBjb3B5IG9mIHByb3Agc28gcGVyLXByb3BlcnR5IGVhc2luZyB3b24ndCBiZSBsb3N0XG5cdFx0XHRcdHZhciBhbmltID0gQW5pbWF0aW9uKCB0aGlzLCBqUXVlcnkuZXh0ZW5kKCB7fSwgcHJvcCApLCBvcHRhbGwgKTtcblxuXHRcdFx0XHQvLyBFbXB0eSBhbmltYXRpb25zLCBvciBmaW5pc2hpbmcgcmVzb2x2ZXMgaW1tZWRpYXRlbHlcblx0XHRcdFx0aWYgKCBlbXB0eSB8fCBkYXRhUHJpdi5nZXQoIHRoaXMsIFwiZmluaXNoXCIgKSApIHtcblx0XHRcdFx0XHRhbmltLnN0b3AoIHRydWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGRvQW5pbWF0aW9uLmZpbmlzaCA9IGRvQW5pbWF0aW9uO1xuXG5cdFx0cmV0dXJuIGVtcHR5IHx8IG9wdGFsbC5xdWV1ZSA9PT0gZmFsc2UgP1xuXHRcdFx0dGhpcy5lYWNoKCBkb0FuaW1hdGlvbiApIDpcblx0XHRcdHRoaXMucXVldWUoIG9wdGFsbC5xdWV1ZSwgZG9BbmltYXRpb24gKTtcblx0fSxcblx0c3RvcDogZnVuY3Rpb24oIHR5cGUsIGNsZWFyUXVldWUsIGdvdG9FbmQgKSB7XG5cdFx0dmFyIHN0b3BRdWV1ZSA9IGZ1bmN0aW9uKCBob29rcyApIHtcblx0XHRcdHZhciBzdG9wID0gaG9va3Muc3RvcDtcblx0XHRcdGRlbGV0ZSBob29rcy5zdG9wO1xuXHRcdFx0c3RvcCggZ290b0VuZCApO1xuXHRcdH07XG5cblx0XHRpZiAoIHR5cGVvZiB0eXBlICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0Z290b0VuZCA9IGNsZWFyUXVldWU7XG5cdFx0XHRjbGVhclF1ZXVlID0gdHlwZTtcblx0XHRcdHR5cGUgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdGlmICggY2xlYXJRdWV1ZSAmJiB0eXBlICE9PSBmYWxzZSApIHtcblx0XHRcdHRoaXMucXVldWUoIHR5cGUgfHwgXCJmeFwiLCBbXSApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGRlcXVldWUgPSB0cnVlLFxuXHRcdFx0XHRpbmRleCA9IHR5cGUgIT0gbnVsbCAmJiB0eXBlICsgXCJxdWV1ZUhvb2tzXCIsXG5cdFx0XHRcdHRpbWVycyA9IGpRdWVyeS50aW1lcnMsXG5cdFx0XHRcdGRhdGEgPSBkYXRhUHJpdi5nZXQoIHRoaXMgKTtcblxuXHRcdFx0aWYgKCBpbmRleCApIHtcblx0XHRcdFx0aWYgKCBkYXRhWyBpbmRleCBdICYmIGRhdGFbIGluZGV4IF0uc3RvcCApIHtcblx0XHRcdFx0XHRzdG9wUXVldWUoIGRhdGFbIGluZGV4IF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yICggaW5kZXggaW4gZGF0YSApIHtcblx0XHRcdFx0XHRpZiAoIGRhdGFbIGluZGV4IF0gJiYgZGF0YVsgaW5kZXggXS5zdG9wICYmIHJydW4udGVzdCggaW5kZXggKSApIHtcblx0XHRcdFx0XHRcdHN0b3BRdWV1ZSggZGF0YVsgaW5kZXggXSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKCBpbmRleCA9IHRpbWVycy5sZW5ndGg7IGluZGV4LS07ICkge1xuXHRcdFx0XHRpZiAoIHRpbWVyc1sgaW5kZXggXS5lbGVtID09PSB0aGlzICYmXG5cdFx0XHRcdFx0KCB0eXBlID09IG51bGwgfHwgdGltZXJzWyBpbmRleCBdLnF1ZXVlID09PSB0eXBlICkgKSB7XG5cblx0XHRcdFx0XHR0aW1lcnNbIGluZGV4IF0uYW5pbS5zdG9wKCBnb3RvRW5kICk7XG5cdFx0XHRcdFx0ZGVxdWV1ZSA9IGZhbHNlO1xuXHRcdFx0XHRcdHRpbWVycy5zcGxpY2UoIGluZGV4LCAxICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gU3RhcnQgdGhlIG5leHQgaW4gdGhlIHF1ZXVlIGlmIHRoZSBsYXN0IHN0ZXAgd2Fzbid0IGZvcmNlZC5cblx0XHRcdC8vIFRpbWVycyBjdXJyZW50bHkgd2lsbCBjYWxsIHRoZWlyIGNvbXBsZXRlIGNhbGxiYWNrcywgd2hpY2hcblx0XHRcdC8vIHdpbGwgZGVxdWV1ZSBidXQgb25seSBpZiB0aGV5IHdlcmUgZ290b0VuZC5cblx0XHRcdGlmICggZGVxdWV1ZSB8fCAhZ290b0VuZCApIHtcblx0XHRcdFx0alF1ZXJ5LmRlcXVldWUoIHRoaXMsIHR5cGUgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cdGZpbmlzaDogZnVuY3Rpb24oIHR5cGUgKSB7XG5cdFx0aWYgKCB0eXBlICE9PSBmYWxzZSApIHtcblx0XHRcdHR5cGUgPSB0eXBlIHx8IFwiZnhcIjtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgaW5kZXgsXG5cdFx0XHRcdGRhdGEgPSBkYXRhUHJpdi5nZXQoIHRoaXMgKSxcblx0XHRcdFx0cXVldWUgPSBkYXRhWyB0eXBlICsgXCJxdWV1ZVwiIF0sXG5cdFx0XHRcdGhvb2tzID0gZGF0YVsgdHlwZSArIFwicXVldWVIb29rc1wiIF0sXG5cdFx0XHRcdHRpbWVycyA9IGpRdWVyeS50aW1lcnMsXG5cdFx0XHRcdGxlbmd0aCA9IHF1ZXVlID8gcXVldWUubGVuZ3RoIDogMDtcblxuXHRcdFx0Ly8gRW5hYmxlIGZpbmlzaGluZyBmbGFnIG9uIHByaXZhdGUgZGF0YVxuXHRcdFx0ZGF0YS5maW5pc2ggPSB0cnVlO1xuXG5cdFx0XHQvLyBFbXB0eSB0aGUgcXVldWUgZmlyc3Rcblx0XHRcdGpRdWVyeS5xdWV1ZSggdGhpcywgdHlwZSwgW10gKTtcblxuXHRcdFx0aWYgKCBob29rcyAmJiBob29rcy5zdG9wICkge1xuXHRcdFx0XHRob29rcy5zdG9wLmNhbGwoIHRoaXMsIHRydWUgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTG9vayBmb3IgYW55IGFjdGl2ZSBhbmltYXRpb25zLCBhbmQgZmluaXNoIHRoZW1cblx0XHRcdGZvciAoIGluZGV4ID0gdGltZXJzLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG5cdFx0XHRcdGlmICggdGltZXJzWyBpbmRleCBdLmVsZW0gPT09IHRoaXMgJiYgdGltZXJzWyBpbmRleCBdLnF1ZXVlID09PSB0eXBlICkge1xuXHRcdFx0XHRcdHRpbWVyc1sgaW5kZXggXS5hbmltLnN0b3AoIHRydWUgKTtcblx0XHRcdFx0XHR0aW1lcnMuc3BsaWNlKCBpbmRleCwgMSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIExvb2sgZm9yIGFueSBhbmltYXRpb25zIGluIHRoZSBvbGQgcXVldWUgYW5kIGZpbmlzaCB0aGVtXG5cdFx0XHRmb3IgKCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuXHRcdFx0XHRpZiAoIHF1ZXVlWyBpbmRleCBdICYmIHF1ZXVlWyBpbmRleCBdLmZpbmlzaCApIHtcblx0XHRcdFx0XHRxdWV1ZVsgaW5kZXggXS5maW5pc2guY2FsbCggdGhpcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFR1cm4gb2ZmIGZpbmlzaGluZyBmbGFnXG5cdFx0XHRkZWxldGUgZGF0YS5maW5pc2g7XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5lYWNoKCBbIFwidG9nZ2xlXCIsIFwic2hvd1wiLCBcImhpZGVcIiBdLCBmdW5jdGlvbiggaSwgbmFtZSApIHtcblx0dmFyIGNzc0ZuID0galF1ZXJ5LmZuWyBuYW1lIF07XG5cdGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiBzcGVlZCA9PSBudWxsIHx8IHR5cGVvZiBzcGVlZCA9PT0gXCJib29sZWFuXCIgP1xuXHRcdFx0Y3NzRm4uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApIDpcblx0XHRcdHRoaXMuYW5pbWF0ZSggZ2VuRngoIG5hbWUsIHRydWUgKSwgc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKTtcblx0fTtcbn0gKTtcblxuLy8gR2VuZXJhdGUgc2hvcnRjdXRzIGZvciBjdXN0b20gYW5pbWF0aW9uc1xualF1ZXJ5LmVhY2goIHtcblx0c2xpZGVEb3duOiBnZW5GeCggXCJzaG93XCIgKSxcblx0c2xpZGVVcDogZ2VuRngoIFwiaGlkZVwiICksXG5cdHNsaWRlVG9nZ2xlOiBnZW5GeCggXCJ0b2dnbGVcIiApLFxuXHRmYWRlSW46IHsgb3BhY2l0eTogXCJzaG93XCIgfSxcblx0ZmFkZU91dDogeyBvcGFjaXR5OiBcImhpZGVcIiB9LFxuXHRmYWRlVG9nZ2xlOiB7IG9wYWNpdHk6IFwidG9nZ2xlXCIgfVxufSwgZnVuY3Rpb24oIG5hbWUsIHByb3BzICkge1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4gdGhpcy5hbmltYXRlKCBwcm9wcywgc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKTtcblx0fTtcbn0gKTtcblxualF1ZXJ5LnRpbWVycyA9IFtdO1xualF1ZXJ5LmZ4LnRpY2sgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRpbWVyLFxuXHRcdGkgPSAwLFxuXHRcdHRpbWVycyA9IGpRdWVyeS50aW1lcnM7XG5cblx0ZnhOb3cgPSBqUXVlcnkubm93KCk7XG5cblx0Zm9yICggOyBpIDwgdGltZXJzLmxlbmd0aDsgaSsrICkge1xuXHRcdHRpbWVyID0gdGltZXJzWyBpIF07XG5cblx0XHQvLyBSdW4gdGhlIHRpbWVyIGFuZCBzYWZlbHkgcmVtb3ZlIGl0IHdoZW4gZG9uZSAoYWxsb3dpbmcgZm9yIGV4dGVybmFsIHJlbW92YWwpXG5cdFx0aWYgKCAhdGltZXIoKSAmJiB0aW1lcnNbIGkgXSA9PT0gdGltZXIgKSB7XG5cdFx0XHR0aW1lcnMuc3BsaWNlKCBpLS0sIDEgKTtcblx0XHR9XG5cdH1cblxuXHRpZiAoICF0aW1lcnMubGVuZ3RoICkge1xuXHRcdGpRdWVyeS5meC5zdG9wKCk7XG5cdH1cblx0ZnhOb3cgPSB1bmRlZmluZWQ7XG59O1xuXG5qUXVlcnkuZngudGltZXIgPSBmdW5jdGlvbiggdGltZXIgKSB7XG5cdGpRdWVyeS50aW1lcnMucHVzaCggdGltZXIgKTtcblx0alF1ZXJ5LmZ4LnN0YXJ0KCk7XG59O1xuXG5qUXVlcnkuZnguaW50ZXJ2YWwgPSAxMztcbmpRdWVyeS5meC5zdGFydCA9IGZ1bmN0aW9uKCkge1xuXHRpZiAoIGluUHJvZ3Jlc3MgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aW5Qcm9ncmVzcyA9IHRydWU7XG5cdHNjaGVkdWxlKCk7XG59O1xuXG5qUXVlcnkuZnguc3RvcCA9IGZ1bmN0aW9uKCkge1xuXHRpblByb2dyZXNzID0gbnVsbDtcbn07XG5cbmpRdWVyeS5meC5zcGVlZHMgPSB7XG5cdHNsb3c6IDYwMCxcblx0ZmFzdDogMjAwLFxuXG5cdC8vIERlZmF1bHQgc3BlZWRcblx0X2RlZmF1bHQ6IDQwMFxufTtcblxuXG4vLyBCYXNlZCBvZmYgb2YgdGhlIHBsdWdpbiBieSBDbGludCBIZWxmZXJzLCB3aXRoIHBlcm1pc3Npb24uXG4vLyBodHRwczovL3dlYi5hcmNoaXZlLm9yZy93ZWIvMjAxMDAzMjQwMTQ3NDcvaHR0cDovL2JsaW5kc2lnbmFscy5jb20vaW5kZXgucGhwLzIwMDkvMDcvanF1ZXJ5LWRlbGF5L1xualF1ZXJ5LmZuLmRlbGF5ID0gZnVuY3Rpb24oIHRpbWUsIHR5cGUgKSB7XG5cdHRpbWUgPSBqUXVlcnkuZnggPyBqUXVlcnkuZnguc3BlZWRzWyB0aW1lIF0gfHwgdGltZSA6IHRpbWU7XG5cdHR5cGUgPSB0eXBlIHx8IFwiZnhcIjtcblxuXHRyZXR1cm4gdGhpcy5xdWV1ZSggdHlwZSwgZnVuY3Rpb24oIG5leHQsIGhvb2tzICkge1xuXHRcdHZhciB0aW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoIG5leHQsIHRpbWUgKTtcblx0XHRob29rcy5zdG9wID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR3aW5kb3cuY2xlYXJUaW1lb3V0KCB0aW1lb3V0ICk7XG5cdFx0fTtcblx0fSApO1xufTtcblxuXG4oIGZ1bmN0aW9uKCkge1xuXHR2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImlucHV0XCIgKSxcblx0XHRzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcInNlbGVjdFwiICksXG5cdFx0b3B0ID0gc2VsZWN0LmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcIm9wdGlvblwiICkgKTtcblxuXHRpbnB1dC50eXBlID0gXCJjaGVja2JveFwiO1xuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjMgb25seVxuXHQvLyBEZWZhdWx0IHZhbHVlIGZvciBhIGNoZWNrYm94IHNob3VsZCBiZSBcIm9uXCJcblx0c3VwcG9ydC5jaGVja09uID0gaW5wdXQudmFsdWUgIT09IFwiXCI7XG5cblx0Ly8gU3VwcG9ydDogSUUgPD0xMSBvbmx5XG5cdC8vIE11c3QgYWNjZXNzIHNlbGVjdGVkSW5kZXggdG8gbWFrZSBkZWZhdWx0IG9wdGlvbnMgc2VsZWN0XG5cdHN1cHBvcnQub3B0U2VsZWN0ZWQgPSBvcHQuc2VsZWN0ZWQ7XG5cblx0Ly8gU3VwcG9ydDogSUUgPD0xMSBvbmx5XG5cdC8vIEFuIGlucHV0IGxvc2VzIGl0cyB2YWx1ZSBhZnRlciBiZWNvbWluZyBhIHJhZGlvXG5cdGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJpbnB1dFwiICk7XG5cdGlucHV0LnZhbHVlID0gXCJ0XCI7XG5cdGlucHV0LnR5cGUgPSBcInJhZGlvXCI7XG5cdHN1cHBvcnQucmFkaW9WYWx1ZSA9IGlucHV0LnZhbHVlID09PSBcInRcIjtcbn0gKSgpO1xuXG5cbnZhciBib29sSG9vayxcblx0YXR0ckhhbmRsZSA9IGpRdWVyeS5leHByLmF0dHJIYW5kbGU7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0YXR0cjogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGpRdWVyeS5hdHRyLCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgKTtcblx0fSxcblxuXHRyZW1vdmVBdHRyOiBmdW5jdGlvbiggbmFtZSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5yZW1vdmVBdHRyKCB0aGlzLCBuYW1lICk7XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5leHRlbmQoIHtcblx0YXR0cjogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlICkge1xuXHRcdHZhciByZXQsIGhvb2tzLFxuXHRcdFx0blR5cGUgPSBlbGVtLm5vZGVUeXBlO1xuXG5cdFx0Ly8gRG9uJ3QgZ2V0L3NldCBhdHRyaWJ1dGVzIG9uIHRleHQsIGNvbW1lbnQgYW5kIGF0dHJpYnV0ZSBub2Rlc1xuXHRcdGlmICggblR5cGUgPT09IDMgfHwgblR5cGUgPT09IDggfHwgblR5cGUgPT09IDIgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRmFsbGJhY2sgdG8gcHJvcCB3aGVuIGF0dHJpYnV0ZXMgYXJlIG5vdCBzdXBwb3J0ZWRcblx0XHRpZiAoIHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZSA9PT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRcdHJldHVybiBqUXVlcnkucHJvcCggZWxlbSwgbmFtZSwgdmFsdWUgKTtcblx0XHR9XG5cblx0XHQvLyBBdHRyaWJ1dGUgaG9va3MgYXJlIGRldGVybWluZWQgYnkgdGhlIGxvd2VyY2FzZSB2ZXJzaW9uXG5cdFx0Ly8gR3JhYiBuZWNlc3NhcnkgaG9vayBpZiBvbmUgaXMgZGVmaW5lZFxuXHRcdGlmICggblR5cGUgIT09IDEgfHwgIWpRdWVyeS5pc1hNTERvYyggZWxlbSApICkge1xuXHRcdFx0aG9va3MgPSBqUXVlcnkuYXR0ckhvb2tzWyBuYW1lLnRvTG93ZXJDYXNlKCkgXSB8fFxuXHRcdFx0XHQoIGpRdWVyeS5leHByLm1hdGNoLmJvb2wudGVzdCggbmFtZSApID8gYm9vbEhvb2sgOiB1bmRlZmluZWQgKTtcblx0XHR9XG5cblx0XHRpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRpZiAoIHZhbHVlID09PSBudWxsICkge1xuXHRcdFx0XHRqUXVlcnkucmVtb3ZlQXR0ciggZWxlbSwgbmFtZSApO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmICggaG9va3MgJiYgXCJzZXRcIiBpbiBob29rcyAmJlxuXHRcdFx0XHQoIHJldCA9IGhvb2tzLnNldCggZWxlbSwgdmFsdWUsIG5hbWUgKSApICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHR9XG5cblx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCBuYW1lLCB2YWx1ZSArIFwiXCIgKTtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9XG5cblx0XHRpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiYgKCByZXQgPSBob29rcy5nZXQoIGVsZW0sIG5hbWUgKSApICE9PSBudWxsICkge1xuXHRcdFx0cmV0dXJuIHJldDtcblx0XHR9XG5cblx0XHRyZXQgPSBqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBuYW1lICk7XG5cblx0XHQvLyBOb24tZXhpc3RlbnQgYXR0cmlidXRlcyByZXR1cm4gbnVsbCwgd2Ugbm9ybWFsaXplIHRvIHVuZGVmaW5lZFxuXHRcdHJldHVybiByZXQgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IHJldDtcblx0fSxcblxuXHRhdHRySG9va3M6IHtcblx0XHR0eXBlOiB7XG5cdFx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcblx0XHRcdFx0aWYgKCAhc3VwcG9ydC5yYWRpb1ZhbHVlICYmIHZhbHVlID09PSBcInJhZGlvXCIgJiZcblx0XHRcdFx0XHRub2RlTmFtZSggZWxlbSwgXCJpbnB1dFwiICkgKSB7XG5cdFx0XHRcdFx0dmFyIHZhbCA9IGVsZW0udmFsdWU7XG5cdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCB2YWx1ZSApO1xuXHRcdFx0XHRcdGlmICggdmFsICkge1xuXHRcdFx0XHRcdFx0ZWxlbS52YWx1ZSA9IHZhbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdHJlbW92ZUF0dHI6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcblx0XHR2YXIgbmFtZSxcblx0XHRcdGkgPSAwLFxuXG5cdFx0XHQvLyBBdHRyaWJ1dGUgbmFtZXMgY2FuIGNvbnRhaW4gbm9uLUhUTUwgd2hpdGVzcGFjZSBjaGFyYWN0ZXJzXG5cdFx0XHQvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zeW50YXguaHRtbCNhdHRyaWJ1dGVzLTJcblx0XHRcdGF0dHJOYW1lcyA9IHZhbHVlICYmIHZhbHVlLm1hdGNoKCBybm90aHRtbHdoaXRlICk7XG5cblx0XHRpZiAoIGF0dHJOYW1lcyAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0d2hpbGUgKCAoIG5hbWUgPSBhdHRyTmFtZXNbIGkrKyBdICkgKSB7XG5cdFx0XHRcdGVsZW0ucmVtb3ZlQXR0cmlidXRlKCBuYW1lICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59ICk7XG5cbi8vIEhvb2tzIGZvciBib29sZWFuIGF0dHJpYnV0ZXNcbmJvb2xIb29rID0ge1xuXHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSwgbmFtZSApIHtcblx0XHRpZiAoIHZhbHVlID09PSBmYWxzZSApIHtcblxuXHRcdFx0Ly8gUmVtb3ZlIGJvb2xlYW4gYXR0cmlidXRlcyB3aGVuIHNldCB0byBmYWxzZVxuXHRcdFx0alF1ZXJ5LnJlbW92ZUF0dHIoIGVsZW0sIG5hbWUgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIG5hbWUsIG5hbWUgKTtcblx0XHR9XG5cdFx0cmV0dXJuIG5hbWU7XG5cdH1cbn07XG5cbmpRdWVyeS5lYWNoKCBqUXVlcnkuZXhwci5tYXRjaC5ib29sLnNvdXJjZS5tYXRjaCggL1xcdysvZyApLCBmdW5jdGlvbiggaSwgbmFtZSApIHtcblx0dmFyIGdldHRlciA9IGF0dHJIYW5kbGVbIG5hbWUgXSB8fCBqUXVlcnkuZmluZC5hdHRyO1xuXG5cdGF0dHJIYW5kbGVbIG5hbWUgXSA9IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcblx0XHR2YXIgcmV0LCBoYW5kbGUsXG5cdFx0XHRsb3dlcmNhc2VOYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0aWYgKCAhaXNYTUwgKSB7XG5cblx0XHRcdC8vIEF2b2lkIGFuIGluZmluaXRlIGxvb3AgYnkgdGVtcG9yYXJpbHkgcmVtb3ZpbmcgdGhpcyBmdW5jdGlvbiBmcm9tIHRoZSBnZXR0ZXJcblx0XHRcdGhhbmRsZSA9IGF0dHJIYW5kbGVbIGxvd2VyY2FzZU5hbWUgXTtcblx0XHRcdGF0dHJIYW5kbGVbIGxvd2VyY2FzZU5hbWUgXSA9IHJldDtcblx0XHRcdHJldCA9IGdldHRlciggZWxlbSwgbmFtZSwgaXNYTUwgKSAhPSBudWxsID9cblx0XHRcdFx0bG93ZXJjYXNlTmFtZSA6XG5cdFx0XHRcdG51bGw7XG5cdFx0XHRhdHRySGFuZGxlWyBsb3dlcmNhc2VOYW1lIF0gPSBoYW5kbGU7XG5cdFx0fVxuXHRcdHJldHVybiByZXQ7XG5cdH07XG59ICk7XG5cblxuXG5cbnZhciByZm9jdXNhYmxlID0gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8YnV0dG9uKSQvaSxcblx0cmNsaWNrYWJsZSA9IC9eKD86YXxhcmVhKSQvaTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRwcm9wOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgalF1ZXJ5LnByb3AsIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xuXHR9LFxuXG5cdHJlbW92ZVByb3A6IGZ1bmN0aW9uKCBuYW1lICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0ZGVsZXRlIHRoaXNbIGpRdWVyeS5wcm9wRml4WyBuYW1lIF0gfHwgbmFtZSBdO1xuXHRcdH0gKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cdHByb3A6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSApIHtcblx0XHR2YXIgcmV0LCBob29rcyxcblx0XHRcdG5UeXBlID0gZWxlbS5ub2RlVHlwZTtcblxuXHRcdC8vIERvbid0IGdldC9zZXQgcHJvcGVydGllcyBvbiB0ZXh0LCBjb21tZW50IGFuZCBhdHRyaWJ1dGUgbm9kZXNcblx0XHRpZiAoIG5UeXBlID09PSAzIHx8IG5UeXBlID09PSA4IHx8IG5UeXBlID09PSAyICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICggblR5cGUgIT09IDEgfHwgIWpRdWVyeS5pc1hNTERvYyggZWxlbSApICkge1xuXG5cdFx0XHQvLyBGaXggbmFtZSBhbmQgYXR0YWNoIGhvb2tzXG5cdFx0XHRuYW1lID0galF1ZXJ5LnByb3BGaXhbIG5hbWUgXSB8fCBuYW1lO1xuXHRcdFx0aG9va3MgPSBqUXVlcnkucHJvcEhvb2tzWyBuYW1lIF07XG5cdFx0fVxuXG5cdFx0aWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0aWYgKCBob29rcyAmJiBcInNldFwiIGluIGhvb2tzICYmXG5cdFx0XHRcdCggcmV0ID0gaG9va3Muc2V0KCBlbGVtLCB2YWx1ZSwgbmFtZSApICkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuICggZWxlbVsgbmFtZSBdID0gdmFsdWUgKTtcblx0XHR9XG5cblx0XHRpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiYgKCByZXQgPSBob29rcy5nZXQoIGVsZW0sIG5hbWUgKSApICE9PSBudWxsICkge1xuXHRcdFx0cmV0dXJuIHJldDtcblx0XHR9XG5cblx0XHRyZXR1cm4gZWxlbVsgbmFtZSBdO1xuXHR9LFxuXG5cdHByb3BIb29rczoge1xuXHRcdHRhYkluZGV4OiB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9OSAtIDExIG9ubHlcblx0XHRcdFx0Ly8gZWxlbS50YWJJbmRleCBkb2Vzbid0IGFsd2F5cyByZXR1cm4gdGhlXG5cdFx0XHRcdC8vIGNvcnJlY3QgdmFsdWUgd2hlbiBpdCBoYXNuJ3QgYmVlbiBleHBsaWNpdGx5IHNldFxuXHRcdFx0XHQvLyBodHRwczovL3dlYi5hcmNoaXZlLm9yZy93ZWIvMjAxNDExMTYyMzMzNDcvaHR0cDovL2ZsdWlkcHJvamVjdC5vcmcvYmxvZy8yMDA4LzAxLzA5L2dldHRpbmctc2V0dGluZy1hbmQtcmVtb3ZpbmctdGFiaW5kZXgtdmFsdWVzLXdpdGgtamF2YXNjcmlwdC9cblx0XHRcdFx0Ly8gVXNlIHByb3BlciBhdHRyaWJ1dGUgcmV0cmlldmFsKCMxMjA3Milcblx0XHRcdFx0dmFyIHRhYmluZGV4ID0galF1ZXJ5LmZpbmQuYXR0ciggZWxlbSwgXCJ0YWJpbmRleFwiICk7XG5cblx0XHRcdFx0aWYgKCB0YWJpbmRleCApIHtcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VJbnQoIHRhYmluZGV4LCAxMCApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHJmb2N1c2FibGUudGVzdCggZWxlbS5ub2RlTmFtZSApIHx8XG5cdFx0XHRcdFx0cmNsaWNrYWJsZS50ZXN0KCBlbGVtLm5vZGVOYW1lICkgJiZcblx0XHRcdFx0XHRlbGVtLmhyZWZcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gLTE7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdHByb3BGaXg6IHtcblx0XHRcImZvclwiOiBcImh0bWxGb3JcIixcblx0XHRcImNsYXNzXCI6IFwiY2xhc3NOYW1lXCJcblx0fVxufSApO1xuXG4vLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcbi8vIEFjY2Vzc2luZyB0aGUgc2VsZWN0ZWRJbmRleCBwcm9wZXJ0eVxuLy8gZm9yY2VzIHRoZSBicm93c2VyIHRvIHJlc3BlY3Qgc2V0dGluZyBzZWxlY3RlZFxuLy8gb24gdGhlIG9wdGlvblxuLy8gVGhlIGdldHRlciBlbnN1cmVzIGEgZGVmYXVsdCBvcHRpb24gaXMgc2VsZWN0ZWRcbi8vIHdoZW4gaW4gYW4gb3B0Z3JvdXBcbi8vIGVzbGludCBydWxlIFwibm8tdW51c2VkLWV4cHJlc3Npb25zXCIgaXMgZGlzYWJsZWQgZm9yIHRoaXMgY29kZVxuLy8gc2luY2UgaXQgY29uc2lkZXJzIHN1Y2ggYWNjZXNzaW9ucyBub29wXG5pZiAoICFzdXBwb3J0Lm9wdFNlbGVjdGVkICkge1xuXHRqUXVlcnkucHJvcEhvb2tzLnNlbGVjdGVkID0ge1xuXHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHRcdC8qIGVzbGludCBuby11bnVzZWQtZXhwcmVzc2lvbnM6IFwib2ZmXCIgKi9cblxuXHRcdFx0dmFyIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcblx0XHRcdGlmICggcGFyZW50ICYmIHBhcmVudC5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRwYXJlbnQucGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fSxcblx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0XHQvKiBlc2xpbnQgbm8tdW51c2VkLWV4cHJlc3Npb25zOiBcIm9mZlwiICovXG5cblx0XHRcdHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cdFx0XHRpZiAoIHBhcmVudCApIHtcblx0XHRcdFx0cGFyZW50LnNlbGVjdGVkSW5kZXg7XG5cblx0XHRcdFx0aWYgKCBwYXJlbnQucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0XHRwYXJlbnQucGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufVxuXG5qUXVlcnkuZWFjaCggW1xuXHRcInRhYkluZGV4XCIsXG5cdFwicmVhZE9ubHlcIixcblx0XCJtYXhMZW5ndGhcIixcblx0XCJjZWxsU3BhY2luZ1wiLFxuXHRcImNlbGxQYWRkaW5nXCIsXG5cdFwicm93U3BhblwiLFxuXHRcImNvbFNwYW5cIixcblx0XCJ1c2VNYXBcIixcblx0XCJmcmFtZUJvcmRlclwiLFxuXHRcImNvbnRlbnRFZGl0YWJsZVwiXG5dLCBmdW5jdGlvbigpIHtcblx0alF1ZXJ5LnByb3BGaXhbIHRoaXMudG9Mb3dlckNhc2UoKSBdID0gdGhpcztcbn0gKTtcblxuXG5cblxuXHQvLyBTdHJpcCBhbmQgY29sbGFwc2Ugd2hpdGVzcGFjZSBhY2NvcmRpbmcgdG8gSFRNTCBzcGVjXG5cdC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2luZnJhc3RydWN0dXJlLmh0bWwjc3RyaXAtYW5kLWNvbGxhcHNlLXdoaXRlc3BhY2Vcblx0ZnVuY3Rpb24gc3RyaXBBbmRDb2xsYXBzZSggdmFsdWUgKSB7XG5cdFx0dmFyIHRva2VucyA9IHZhbHVlLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgW107XG5cdFx0cmV0dXJuIHRva2Vucy5qb2luKCBcIiBcIiApO1xuXHR9XG5cblxuZnVuY3Rpb24gZ2V0Q2xhc3MoIGVsZW0gKSB7XG5cdHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSAmJiBlbGVtLmdldEF0dHJpYnV0ZSggXCJjbGFzc1wiICkgfHwgXCJcIjtcbn1cblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRhZGRDbGFzczogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdHZhciBjbGFzc2VzLCBlbGVtLCBjdXIsIGN1clZhbHVlLCBjbGF6eiwgaiwgZmluYWxWYWx1ZSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBqICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS5hZGRDbGFzcyggdmFsdWUuY2FsbCggdGhpcywgaiwgZ2V0Q2xhc3MoIHRoaXMgKSApICk7XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0aWYgKCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUgKSB7XG5cdFx0XHRjbGFzc2VzID0gdmFsdWUubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbXTtcblxuXHRcdFx0d2hpbGUgKCAoIGVsZW0gPSB0aGlzWyBpKysgXSApICkge1xuXHRcdFx0XHRjdXJWYWx1ZSA9IGdldENsYXNzKCBlbGVtICk7XG5cdFx0XHRcdGN1ciA9IGVsZW0ubm9kZVR5cGUgPT09IDEgJiYgKCBcIiBcIiArIHN0cmlwQW5kQ29sbGFwc2UoIGN1clZhbHVlICkgKyBcIiBcIiApO1xuXG5cdFx0XHRcdGlmICggY3VyICkge1xuXHRcdFx0XHRcdGogPSAwO1xuXHRcdFx0XHRcdHdoaWxlICggKCBjbGF6eiA9IGNsYXNzZXNbIGorKyBdICkgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIGN1ci5pbmRleE9mKCBcIiBcIiArIGNsYXp6ICsgXCIgXCIgKSA8IDAgKSB7XG5cdFx0XHRcdFx0XHRcdGN1ciArPSBjbGF6eiArIFwiIFwiO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIE9ubHkgYXNzaWduIGlmIGRpZmZlcmVudCB0byBhdm9pZCB1bm5lZWRlZCByZW5kZXJpbmcuXG5cdFx0XHRcdFx0ZmluYWxWYWx1ZSA9IHN0cmlwQW5kQ29sbGFwc2UoIGN1ciApO1xuXHRcdFx0XHRcdGlmICggY3VyVmFsdWUgIT09IGZpbmFsVmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggXCJjbGFzc1wiLCBmaW5hbFZhbHVlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0cmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHR2YXIgY2xhc3NlcywgZWxlbSwgY3VyLCBjdXJWYWx1ZSwgY2xhenosIGosIGZpbmFsVmFsdWUsXG5cdFx0XHRpID0gMDtcblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaiApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkucmVtb3ZlQ2xhc3MoIHZhbHVlLmNhbGwoIHRoaXMsIGosIGdldENsYXNzKCB0aGlzICkgKSApO1xuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdGlmICggIWFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5hdHRyKCBcImNsYXNzXCIsIFwiXCIgKTtcblx0XHR9XG5cblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZSApIHtcblx0XHRcdGNsYXNzZXMgPSB2YWx1ZS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdO1xuXG5cdFx0XHR3aGlsZSAoICggZWxlbSA9IHRoaXNbIGkrKyBdICkgKSB7XG5cdFx0XHRcdGN1clZhbHVlID0gZ2V0Q2xhc3MoIGVsZW0gKTtcblxuXHRcdFx0XHQvLyBUaGlzIGV4cHJlc3Npb24gaXMgaGVyZSBmb3IgYmV0dGVyIGNvbXByZXNzaWJpbGl0eSAoc2VlIGFkZENsYXNzKVxuXHRcdFx0XHRjdXIgPSBlbGVtLm5vZGVUeXBlID09PSAxICYmICggXCIgXCIgKyBzdHJpcEFuZENvbGxhcHNlKCBjdXJWYWx1ZSApICsgXCIgXCIgKTtcblxuXHRcdFx0XHRpZiAoIGN1ciApIHtcblx0XHRcdFx0XHRqID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoICggY2xhenogPSBjbGFzc2VzWyBqKysgXSApICkge1xuXG5cdFx0XHRcdFx0XHQvLyBSZW1vdmUgKmFsbCogaW5zdGFuY2VzXG5cdFx0XHRcdFx0XHR3aGlsZSAoIGN1ci5pbmRleE9mKCBcIiBcIiArIGNsYXp6ICsgXCIgXCIgKSA+IC0xICkge1xuXHRcdFx0XHRcdFx0XHRjdXIgPSBjdXIucmVwbGFjZSggXCIgXCIgKyBjbGF6eiArIFwiIFwiLCBcIiBcIiApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIE9ubHkgYXNzaWduIGlmIGRpZmZlcmVudCB0byBhdm9pZCB1bm5lZWRlZCByZW5kZXJpbmcuXG5cdFx0XHRcdFx0ZmluYWxWYWx1ZSA9IHN0cmlwQW5kQ29sbGFwc2UoIGN1ciApO1xuXHRcdFx0XHRcdGlmICggY3VyVmFsdWUgIT09IGZpbmFsVmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggXCJjbGFzc1wiLCBmaW5hbFZhbHVlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0dG9nZ2xlQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSwgc3RhdGVWYWwgKSB7XG5cdFx0dmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cblx0XHRpZiAoIHR5cGVvZiBzdGF0ZVZhbCA9PT0gXCJib29sZWFuXCIgJiYgdHlwZSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiBzdGF0ZVZhbCA/IHRoaXMuYWRkQ2xhc3MoIHZhbHVlICkgOiB0aGlzLnJlbW92ZUNsYXNzKCB2YWx1ZSApO1xuXHRcdH1cblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkudG9nZ2xlQ2xhc3MoXG5cdFx0XHRcdFx0dmFsdWUuY2FsbCggdGhpcywgaSwgZ2V0Q2xhc3MoIHRoaXMgKSwgc3RhdGVWYWwgKSxcblx0XHRcdFx0XHRzdGF0ZVZhbFxuXHRcdFx0XHQpO1xuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGNsYXNzTmFtZSwgaSwgc2VsZiwgY2xhc3NOYW1lcztcblxuXHRcdFx0aWYgKCB0eXBlID09PSBcInN0cmluZ1wiICkge1xuXG5cdFx0XHRcdC8vIFRvZ2dsZSBpbmRpdmlkdWFsIGNsYXNzIG5hbWVzXG5cdFx0XHRcdGkgPSAwO1xuXHRcdFx0XHRzZWxmID0galF1ZXJ5KCB0aGlzICk7XG5cdFx0XHRcdGNsYXNzTmFtZXMgPSB2YWx1ZS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdO1xuXG5cdFx0XHRcdHdoaWxlICggKCBjbGFzc05hbWUgPSBjbGFzc05hbWVzWyBpKysgXSApICkge1xuXG5cdFx0XHRcdFx0Ly8gQ2hlY2sgZWFjaCBjbGFzc05hbWUgZ2l2ZW4sIHNwYWNlIHNlcGFyYXRlZCBsaXN0XG5cdFx0XHRcdFx0aWYgKCBzZWxmLmhhc0NsYXNzKCBjbGFzc05hbWUgKSApIHtcblx0XHRcdFx0XHRcdHNlbGYucmVtb3ZlQ2xhc3MoIGNsYXNzTmFtZSApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRzZWxmLmFkZENsYXNzKCBjbGFzc05hbWUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0Ly8gVG9nZ2xlIHdob2xlIGNsYXNzIG5hbWVcblx0XHRcdH0gZWxzZSBpZiAoIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdHlwZSA9PT0gXCJib29sZWFuXCIgKSB7XG5cdFx0XHRcdGNsYXNzTmFtZSA9IGdldENsYXNzKCB0aGlzICk7XG5cdFx0XHRcdGlmICggY2xhc3NOYW1lICkge1xuXG5cdFx0XHRcdFx0Ly8gU3RvcmUgY2xhc3NOYW1lIGlmIHNldFxuXHRcdFx0XHRcdGRhdGFQcml2LnNldCggdGhpcywgXCJfX2NsYXNzTmFtZV9fXCIsIGNsYXNzTmFtZSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gSWYgdGhlIGVsZW1lbnQgaGFzIGEgY2xhc3MgbmFtZSBvciBpZiB3ZSdyZSBwYXNzZWQgYGZhbHNlYCxcblx0XHRcdFx0Ly8gdGhlbiByZW1vdmUgdGhlIHdob2xlIGNsYXNzbmFtZSAoaWYgdGhlcmUgd2FzIG9uZSwgdGhlIGFib3ZlIHNhdmVkIGl0KS5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlIGJyaW5nIGJhY2sgd2hhdGV2ZXIgd2FzIHByZXZpb3VzbHkgc2F2ZWQgKGlmIGFueXRoaW5nKSxcblx0XHRcdFx0Ly8gZmFsbGluZyBiYWNrIHRvIHRoZSBlbXB0eSBzdHJpbmcgaWYgbm90aGluZyB3YXMgc3RvcmVkLlxuXHRcdFx0XHRpZiAoIHRoaXMuc2V0QXR0cmlidXRlICkge1xuXHRcdFx0XHRcdHRoaXMuc2V0QXR0cmlidXRlKCBcImNsYXNzXCIsXG5cdFx0XHRcdFx0XHRjbGFzc05hbWUgfHwgdmFsdWUgPT09IGZhbHNlID9cblx0XHRcdFx0XHRcdFwiXCIgOlxuXHRcdFx0XHRcdFx0ZGF0YVByaXYuZ2V0KCB0aGlzLCBcIl9fY2xhc3NOYW1lX19cIiApIHx8IFwiXCJcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGhhc0NsYXNzOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0dmFyIGNsYXNzTmFtZSwgZWxlbSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Y2xhc3NOYW1lID0gXCIgXCIgKyBzZWxlY3RvciArIFwiIFwiO1xuXHRcdHdoaWxlICggKCBlbGVtID0gdGhpc1sgaSsrIF0gKSApIHtcblx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSAmJlxuXHRcdFx0XHQoIFwiIFwiICsgc3RyaXBBbmRDb2xsYXBzZSggZ2V0Q2xhc3MoIGVsZW0gKSApICsgXCIgXCIgKS5pbmRleE9mKCBjbGFzc05hbWUgKSA+IC0xICkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufSApO1xuXG5cblxuXG52YXIgcnJldHVybiA9IC9cXHIvZztcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHR2YWw6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHR2YXIgaG9va3MsIHJldCwgaXNGdW5jdGlvbixcblx0XHRcdGVsZW0gPSB0aGlzWyAwIF07XG5cblx0XHRpZiAoICFhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0aWYgKCBlbGVtICkge1xuXHRcdFx0XHRob29rcyA9IGpRdWVyeS52YWxIb29rc1sgZWxlbS50eXBlIF0gfHxcblx0XHRcdFx0XHRqUXVlcnkudmFsSG9va3NbIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSBdO1xuXG5cdFx0XHRcdGlmICggaG9va3MgJiZcblx0XHRcdFx0XHRcImdldFwiIGluIGhvb2tzICYmXG5cdFx0XHRcdFx0KCByZXQgPSBob29rcy5nZXQoIGVsZW0sIFwidmFsdWVcIiApICkgIT09IHVuZGVmaW5lZFxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0ID0gZWxlbS52YWx1ZTtcblxuXHRcdFx0XHQvLyBIYW5kbGUgbW9zdCBjb21tb24gc3RyaW5nIGNhc2VzXG5cdFx0XHRcdGlmICggdHlwZW9mIHJldCA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdFx0XHRyZXR1cm4gcmV0LnJlcGxhY2UoIHJyZXR1cm4sIFwiXCIgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEhhbmRsZSBjYXNlcyB3aGVyZSB2YWx1ZSBpcyBudWxsL3VuZGVmIG9yIG51bWJlclxuXHRcdFx0XHRyZXR1cm4gcmV0ID09IG51bGwgPyBcIlwiIDogcmV0O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aXNGdW5jdGlvbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApO1xuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHR2YXIgdmFsO1xuXG5cdFx0XHRpZiAoIHRoaXMubm9kZVR5cGUgIT09IDEgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBpc0Z1bmN0aW9uICkge1xuXHRcdFx0XHR2YWwgPSB2YWx1ZS5jYWxsKCB0aGlzLCBpLCBqUXVlcnkoIHRoaXMgKS52YWwoKSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFsID0gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRyZWF0IG51bGwvdW5kZWZpbmVkIGFzIFwiXCI7IGNvbnZlcnQgbnVtYmVycyB0byBzdHJpbmdcblx0XHRcdGlmICggdmFsID09IG51bGwgKSB7XG5cdFx0XHRcdHZhbCA9IFwiXCI7XG5cblx0XHRcdH0gZWxzZSBpZiAoIHR5cGVvZiB2YWwgPT09IFwibnVtYmVyXCIgKSB7XG5cdFx0XHRcdHZhbCArPSBcIlwiO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCBBcnJheS5pc0FycmF5KCB2YWwgKSApIHtcblx0XHRcdFx0dmFsID0galF1ZXJ5Lm1hcCggdmFsLCBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWUgKyBcIlwiO1xuXHRcdFx0XHR9ICk7XG5cdFx0XHR9XG5cblx0XHRcdGhvb2tzID0galF1ZXJ5LnZhbEhvb2tzWyB0aGlzLnR5cGUgXSB8fCBqUXVlcnkudmFsSG9va3NbIHRoaXMubm9kZU5hbWUudG9Mb3dlckNhc2UoKSBdO1xuXG5cdFx0XHQvLyBJZiBzZXQgcmV0dXJucyB1bmRlZmluZWQsIGZhbGwgYmFjayB0byBub3JtYWwgc2V0dGluZ1xuXHRcdFx0aWYgKCAhaG9va3MgfHwgISggXCJzZXRcIiBpbiBob29rcyApIHx8IGhvb2tzLnNldCggdGhpcywgdmFsLCBcInZhbHVlXCIgKSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHR0aGlzLnZhbHVlID0gdmFsO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cdHZhbEhvb2tzOiB7XG5cdFx0b3B0aW9uOiB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0XHRcdHZhciB2YWwgPSBqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBcInZhbHVlXCIgKTtcblx0XHRcdFx0cmV0dXJuIHZhbCAhPSBudWxsID9cblx0XHRcdFx0XHR2YWwgOlxuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPD0xMCAtIDExIG9ubHlcblx0XHRcdFx0XHQvLyBvcHRpb24udGV4dCB0aHJvd3MgZXhjZXB0aW9ucyAoIzE0Njg2LCAjMTQ4NTgpXG5cdFx0XHRcdFx0Ly8gU3RyaXAgYW5kIGNvbGxhcHNlIHdoaXRlc3BhY2Vcblx0XHRcdFx0XHQvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnLyNzdHJpcC1hbmQtY29sbGFwc2Utd2hpdGVzcGFjZVxuXHRcdFx0XHRcdHN0cmlwQW5kQ29sbGFwc2UoIGpRdWVyeS50ZXh0KCBlbGVtICkgKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHNlbGVjdDoge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0dmFyIHZhbHVlLCBvcHRpb24sIGksXG5cdFx0XHRcdFx0b3B0aW9ucyA9IGVsZW0ub3B0aW9ucyxcblx0XHRcdFx0XHRpbmRleCA9IGVsZW0uc2VsZWN0ZWRJbmRleCxcblx0XHRcdFx0XHRvbmUgPSBlbGVtLnR5cGUgPT09IFwic2VsZWN0LW9uZVwiLFxuXHRcdFx0XHRcdHZhbHVlcyA9IG9uZSA/IG51bGwgOiBbXSxcblx0XHRcdFx0XHRtYXggPSBvbmUgPyBpbmRleCArIDEgOiBvcHRpb25zLmxlbmd0aDtcblxuXHRcdFx0XHRpZiAoIGluZGV4IDwgMCApIHtcblx0XHRcdFx0XHRpID0gbWF4O1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aSA9IG9uZSA/IGluZGV4IDogMDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIExvb3AgdGhyb3VnaCBhbGwgdGhlIHNlbGVjdGVkIG9wdGlvbnNcblx0XHRcdFx0Zm9yICggOyBpIDwgbWF4OyBpKysgKSB7XG5cdFx0XHRcdFx0b3B0aW9uID0gb3B0aW9uc1sgaSBdO1xuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPD05IG9ubHlcblx0XHRcdFx0XHQvLyBJRTgtOSBkb2Vzbid0IHVwZGF0ZSBzZWxlY3RlZCBhZnRlciBmb3JtIHJlc2V0ICgjMjU1MSlcblx0XHRcdFx0XHRpZiAoICggb3B0aW9uLnNlbGVjdGVkIHx8IGkgPT09IGluZGV4ICkgJiZcblxuXHRcdFx0XHRcdFx0XHQvLyBEb24ndCByZXR1cm4gb3B0aW9ucyB0aGF0IGFyZSBkaXNhYmxlZCBvciBpbiBhIGRpc2FibGVkIG9wdGdyb3VwXG5cdFx0XHRcdFx0XHRcdCFvcHRpb24uZGlzYWJsZWQgJiZcblx0XHRcdFx0XHRcdFx0KCAhb3B0aW9uLnBhcmVudE5vZGUuZGlzYWJsZWQgfHxcblx0XHRcdFx0XHRcdFx0XHQhbm9kZU5hbWUoIG9wdGlvbi5wYXJlbnROb2RlLCBcIm9wdGdyb3VwXCIgKSApICkge1xuXG5cdFx0XHRcdFx0XHQvLyBHZXQgdGhlIHNwZWNpZmljIHZhbHVlIGZvciB0aGUgb3B0aW9uXG5cdFx0XHRcdFx0XHR2YWx1ZSA9IGpRdWVyeSggb3B0aW9uICkudmFsKCk7XG5cblx0XHRcdFx0XHRcdC8vIFdlIGRvbid0IG5lZWQgYW4gYXJyYXkgZm9yIG9uZSBzZWxlY3RzXG5cdFx0XHRcdFx0XHRpZiAoIG9uZSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBNdWx0aS1TZWxlY3RzIHJldHVybiBhbiBhcnJheVxuXHRcdFx0XHRcdFx0dmFsdWVzLnB1c2goIHZhbHVlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHZhbHVlcztcblx0XHRcdH0sXG5cblx0XHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdFx0XHR2YXIgb3B0aW9uU2V0LCBvcHRpb24sXG5cdFx0XHRcdFx0b3B0aW9ucyA9IGVsZW0ub3B0aW9ucyxcblx0XHRcdFx0XHR2YWx1ZXMgPSBqUXVlcnkubWFrZUFycmF5KCB2YWx1ZSApLFxuXHRcdFx0XHRcdGkgPSBvcHRpb25zLmxlbmd0aDtcblxuXHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRvcHRpb24gPSBvcHRpb25zWyBpIF07XG5cblx0XHRcdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25kLWFzc2lnbiAqL1xuXG5cdFx0XHRcdFx0aWYgKCBvcHRpb24uc2VsZWN0ZWQgPVxuXHRcdFx0XHRcdFx0alF1ZXJ5LmluQXJyYXkoIGpRdWVyeS52YWxIb29rcy5vcHRpb24uZ2V0KCBvcHRpb24gKSwgdmFsdWVzICkgPiAtMVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0b3B0aW9uU2V0ID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbmQtYXNzaWduICovXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBGb3JjZSBicm93c2VycyB0byBiZWhhdmUgY29uc2lzdGVudGx5IHdoZW4gbm9uLW1hdGNoaW5nIHZhbHVlIGlzIHNldFxuXHRcdFx0XHRpZiAoICFvcHRpb25TZXQgKSB7XG5cdFx0XHRcdFx0ZWxlbS5zZWxlY3RlZEluZGV4ID0gLTE7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHZhbHVlcztcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0gKTtcblxuLy8gUmFkaW9zIGFuZCBjaGVja2JveGVzIGdldHRlci9zZXR0ZXJcbmpRdWVyeS5lYWNoKCBbIFwicmFkaW9cIiwgXCJjaGVja2JveFwiIF0sIGZ1bmN0aW9uKCkge1xuXHRqUXVlcnkudmFsSG9va3NbIHRoaXMgXSA9IHtcblx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcblx0XHRcdGlmICggQXJyYXkuaXNBcnJheSggdmFsdWUgKSApIHtcblx0XHRcdFx0cmV0dXJuICggZWxlbS5jaGVja2VkID0galF1ZXJ5LmluQXJyYXkoIGpRdWVyeSggZWxlbSApLnZhbCgpLCB2YWx1ZSApID4gLTEgKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdGlmICggIXN1cHBvcnQuY2hlY2tPbiApIHtcblx0XHRqUXVlcnkudmFsSG9va3NbIHRoaXMgXS5nZXQgPSBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSggXCJ2YWx1ZVwiICkgPT09IG51bGwgPyBcIm9uXCIgOiBlbGVtLnZhbHVlO1xuXHRcdH07XG5cdH1cbn0gKTtcblxuXG5cblxuLy8gUmV0dXJuIGpRdWVyeSBmb3IgYXR0cmlidXRlcy1vbmx5IGluY2x1c2lvblxuXG5cbnZhciByZm9jdXNNb3JwaCA9IC9eKD86Zm9jdXNpbmZvY3VzfGZvY3Vzb3V0Ymx1cikkLztcblxualF1ZXJ5LmV4dGVuZCggalF1ZXJ5LmV2ZW50LCB7XG5cblx0dHJpZ2dlcjogZnVuY3Rpb24oIGV2ZW50LCBkYXRhLCBlbGVtLCBvbmx5SGFuZGxlcnMgKSB7XG5cblx0XHR2YXIgaSwgY3VyLCB0bXAsIGJ1YmJsZVR5cGUsIG9udHlwZSwgaGFuZGxlLCBzcGVjaWFsLFxuXHRcdFx0ZXZlbnRQYXRoID0gWyBlbGVtIHx8IGRvY3VtZW50IF0sXG5cdFx0XHR0eXBlID0gaGFzT3duLmNhbGwoIGV2ZW50LCBcInR5cGVcIiApID8gZXZlbnQudHlwZSA6IGV2ZW50LFxuXHRcdFx0bmFtZXNwYWNlcyA9IGhhc093bi5jYWxsKCBldmVudCwgXCJuYW1lc3BhY2VcIiApID8gZXZlbnQubmFtZXNwYWNlLnNwbGl0KCBcIi5cIiApIDogW107XG5cblx0XHRjdXIgPSB0bXAgPSBlbGVtID0gZWxlbSB8fCBkb2N1bWVudDtcblxuXHRcdC8vIERvbid0IGRvIGV2ZW50cyBvbiB0ZXh0IGFuZCBjb21tZW50IG5vZGVzXG5cdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAzIHx8IGVsZW0ubm9kZVR5cGUgPT09IDggKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gZm9jdXMvYmx1ciBtb3JwaHMgdG8gZm9jdXNpbi9vdXQ7IGVuc3VyZSB3ZSdyZSBub3QgZmlyaW5nIHRoZW0gcmlnaHQgbm93XG5cdFx0aWYgKCByZm9jdXNNb3JwaC50ZXN0KCB0eXBlICsgalF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCApICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICggdHlwZS5pbmRleE9mKCBcIi5cIiApID4gLTEgKSB7XG5cblx0XHRcdC8vIE5hbWVzcGFjZWQgdHJpZ2dlcjsgY3JlYXRlIGEgcmVnZXhwIHRvIG1hdGNoIGV2ZW50IHR5cGUgaW4gaGFuZGxlKClcblx0XHRcdG5hbWVzcGFjZXMgPSB0eXBlLnNwbGl0KCBcIi5cIiApO1xuXHRcdFx0dHlwZSA9IG5hbWVzcGFjZXMuc2hpZnQoKTtcblx0XHRcdG5hbWVzcGFjZXMuc29ydCgpO1xuXHRcdH1cblx0XHRvbnR5cGUgPSB0eXBlLmluZGV4T2YoIFwiOlwiICkgPCAwICYmIFwib25cIiArIHR5cGU7XG5cblx0XHQvLyBDYWxsZXIgY2FuIHBhc3MgaW4gYSBqUXVlcnkuRXZlbnQgb2JqZWN0LCBPYmplY3QsIG9yIGp1c3QgYW4gZXZlbnQgdHlwZSBzdHJpbmdcblx0XHRldmVudCA9IGV2ZW50WyBqUXVlcnkuZXhwYW5kbyBdID9cblx0XHRcdGV2ZW50IDpcblx0XHRcdG5ldyBqUXVlcnkuRXZlbnQoIHR5cGUsIHR5cGVvZiBldmVudCA9PT0gXCJvYmplY3RcIiAmJiBldmVudCApO1xuXG5cdFx0Ly8gVHJpZ2dlciBiaXRtYXNrOiAmIDEgZm9yIG5hdGl2ZSBoYW5kbGVyczsgJiAyIGZvciBqUXVlcnkgKGFsd2F5cyB0cnVlKVxuXHRcdGV2ZW50LmlzVHJpZ2dlciA9IG9ubHlIYW5kbGVycyA/IDIgOiAzO1xuXHRcdGV2ZW50Lm5hbWVzcGFjZSA9IG5hbWVzcGFjZXMuam9pbiggXCIuXCIgKTtcblx0XHRldmVudC5ybmFtZXNwYWNlID0gZXZlbnQubmFtZXNwYWNlID9cblx0XHRcdG5ldyBSZWdFeHAoIFwiKF58XFxcXC4pXCIgKyBuYW1lc3BhY2VzLmpvaW4oIFwiXFxcXC4oPzouKlxcXFwufClcIiApICsgXCIoXFxcXC58JClcIiApIDpcblx0XHRcdG51bGw7XG5cblx0XHQvLyBDbGVhbiB1cCB0aGUgZXZlbnQgaW4gY2FzZSBpdCBpcyBiZWluZyByZXVzZWRcblx0XHRldmVudC5yZXN1bHQgPSB1bmRlZmluZWQ7XG5cdFx0aWYgKCAhZXZlbnQudGFyZ2V0ICkge1xuXHRcdFx0ZXZlbnQudGFyZ2V0ID0gZWxlbTtcblx0XHR9XG5cblx0XHQvLyBDbG9uZSBhbnkgaW5jb21pbmcgZGF0YSBhbmQgcHJlcGVuZCB0aGUgZXZlbnQsIGNyZWF0aW5nIHRoZSBoYW5kbGVyIGFyZyBsaXN0XG5cdFx0ZGF0YSA9IGRhdGEgPT0gbnVsbCA/XG5cdFx0XHRbIGV2ZW50IF0gOlxuXHRcdFx0alF1ZXJ5Lm1ha2VBcnJheSggZGF0YSwgWyBldmVudCBdICk7XG5cblx0XHQvLyBBbGxvdyBzcGVjaWFsIGV2ZW50cyB0byBkcmF3IG91dHNpZGUgdGhlIGxpbmVzXG5cdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cdFx0aWYgKCAhb25seUhhbmRsZXJzICYmIHNwZWNpYWwudHJpZ2dlciAmJiBzcGVjaWFsLnRyaWdnZXIuYXBwbHkoIGVsZW0sIGRhdGEgKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZXJtaW5lIGV2ZW50IHByb3BhZ2F0aW9uIHBhdGggaW4gYWR2YW5jZSwgcGVyIFczQyBldmVudHMgc3BlYyAoIzk5NTEpXG5cdFx0Ly8gQnViYmxlIHVwIHRvIGRvY3VtZW50LCB0aGVuIHRvIHdpbmRvdzsgd2F0Y2ggZm9yIGEgZ2xvYmFsIG93bmVyRG9jdW1lbnQgdmFyICgjOTcyNClcblx0XHRpZiAoICFvbmx5SGFuZGxlcnMgJiYgIXNwZWNpYWwubm9CdWJibGUgJiYgIWpRdWVyeS5pc1dpbmRvdyggZWxlbSApICkge1xuXG5cdFx0XHRidWJibGVUeXBlID0gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgfHwgdHlwZTtcblx0XHRcdGlmICggIXJmb2N1c01vcnBoLnRlc3QoIGJ1YmJsZVR5cGUgKyB0eXBlICkgKSB7XG5cdFx0XHRcdGN1ciA9IGN1ci5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXHRcdFx0Zm9yICggOyBjdXI7IGN1ciA9IGN1ci5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRldmVudFBhdGgucHVzaCggY3VyICk7XG5cdFx0XHRcdHRtcCA9IGN1cjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gT25seSBhZGQgd2luZG93IGlmIHdlIGdvdCB0byBkb2N1bWVudCAoZS5nLiwgbm90IHBsYWluIG9iaiBvciBkZXRhY2hlZCBET00pXG5cdFx0XHRpZiAoIHRtcCA9PT0gKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQgKSApIHtcblx0XHRcdFx0ZXZlbnRQYXRoLnB1c2goIHRtcC5kZWZhdWx0VmlldyB8fCB0bXAucGFyZW50V2luZG93IHx8IHdpbmRvdyApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEZpcmUgaGFuZGxlcnMgb24gdGhlIGV2ZW50IHBhdGhcblx0XHRpID0gMDtcblx0XHR3aGlsZSAoICggY3VyID0gZXZlbnRQYXRoWyBpKysgXSApICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXG5cdFx0XHRldmVudC50eXBlID0gaSA+IDEgP1xuXHRcdFx0XHRidWJibGVUeXBlIDpcblx0XHRcdFx0c3BlY2lhbC5iaW5kVHlwZSB8fCB0eXBlO1xuXG5cdFx0XHQvLyBqUXVlcnkgaGFuZGxlclxuXHRcdFx0aGFuZGxlID0gKCBkYXRhUHJpdi5nZXQoIGN1ciwgXCJldmVudHNcIiApIHx8IHt9IClbIGV2ZW50LnR5cGUgXSAmJlxuXHRcdFx0XHRkYXRhUHJpdi5nZXQoIGN1ciwgXCJoYW5kbGVcIiApO1xuXHRcdFx0aWYgKCBoYW5kbGUgKSB7XG5cdFx0XHRcdGhhbmRsZS5hcHBseSggY3VyLCBkYXRhICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE5hdGl2ZSBoYW5kbGVyXG5cdFx0XHRoYW5kbGUgPSBvbnR5cGUgJiYgY3VyWyBvbnR5cGUgXTtcblx0XHRcdGlmICggaGFuZGxlICYmIGhhbmRsZS5hcHBseSAmJiBhY2NlcHREYXRhKCBjdXIgKSApIHtcblx0XHRcdFx0ZXZlbnQucmVzdWx0ID0gaGFuZGxlLmFwcGx5KCBjdXIsIGRhdGEgKTtcblx0XHRcdFx0aWYgKCBldmVudC5yZXN1bHQgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0ZXZlbnQudHlwZSA9IHR5cGU7XG5cblx0XHQvLyBJZiBub2JvZHkgcHJldmVudGVkIHRoZSBkZWZhdWx0IGFjdGlvbiwgZG8gaXQgbm93XG5cdFx0aWYgKCAhb25seUhhbmRsZXJzICYmICFldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSApIHtcblxuXHRcdFx0aWYgKCAoICFzcGVjaWFsLl9kZWZhdWx0IHx8XG5cdFx0XHRcdHNwZWNpYWwuX2RlZmF1bHQuYXBwbHkoIGV2ZW50UGF0aC5wb3AoKSwgZGF0YSApID09PSBmYWxzZSApICYmXG5cdFx0XHRcdGFjY2VwdERhdGEoIGVsZW0gKSApIHtcblxuXHRcdFx0XHQvLyBDYWxsIGEgbmF0aXZlIERPTSBtZXRob2Qgb24gdGhlIHRhcmdldCB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgdGhlIGV2ZW50LlxuXHRcdFx0XHQvLyBEb24ndCBkbyBkZWZhdWx0IGFjdGlvbnMgb24gd2luZG93LCB0aGF0J3Mgd2hlcmUgZ2xvYmFsIHZhcmlhYmxlcyBiZSAoIzYxNzApXG5cdFx0XHRcdGlmICggb250eXBlICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCBlbGVtWyB0eXBlIF0gKSAmJiAhalF1ZXJ5LmlzV2luZG93KCBlbGVtICkgKSB7XG5cblx0XHRcdFx0XHQvLyBEb24ndCByZS10cmlnZ2VyIGFuIG9uRk9PIGV2ZW50IHdoZW4gd2UgY2FsbCBpdHMgRk9PKCkgbWV0aG9kXG5cdFx0XHRcdFx0dG1wID0gZWxlbVsgb250eXBlIF07XG5cblx0XHRcdFx0XHRpZiAoIHRtcCApIHtcblx0XHRcdFx0XHRcdGVsZW1bIG9udHlwZSBdID0gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBQcmV2ZW50IHJlLXRyaWdnZXJpbmcgb2YgdGhlIHNhbWUgZXZlbnQsIHNpbmNlIHdlIGFscmVhZHkgYnViYmxlZCBpdCBhYm92ZVxuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgPSB0eXBlO1xuXHRcdFx0XHRcdGVsZW1bIHR5cGUgXSgpO1xuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgPSB1bmRlZmluZWQ7XG5cblx0XHRcdFx0XHRpZiAoIHRtcCApIHtcblx0XHRcdFx0XHRcdGVsZW1bIG9udHlwZSBdID0gdG1wO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBldmVudC5yZXN1bHQ7XG5cdH0sXG5cblx0Ly8gUGlnZ3liYWNrIG9uIGEgZG9ub3IgZXZlbnQgdG8gc2ltdWxhdGUgYSBkaWZmZXJlbnQgb25lXG5cdC8vIFVzZWQgb25seSBmb3IgYGZvY3VzKGluIHwgb3V0KWAgZXZlbnRzXG5cdHNpbXVsYXRlOiBmdW5jdGlvbiggdHlwZSwgZWxlbSwgZXZlbnQgKSB7XG5cdFx0dmFyIGUgPSBqUXVlcnkuZXh0ZW5kKFxuXHRcdFx0bmV3IGpRdWVyeS5FdmVudCgpLFxuXHRcdFx0ZXZlbnQsXG5cdFx0XHR7XG5cdFx0XHRcdHR5cGU6IHR5cGUsXG5cdFx0XHRcdGlzU2ltdWxhdGVkOiB0cnVlXG5cdFx0XHR9XG5cdFx0KTtcblxuXHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyKCBlLCBudWxsLCBlbGVtICk7XG5cdH1cblxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cblx0dHJpZ2dlcjogZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlciggdHlwZSwgZGF0YSwgdGhpcyApO1xuXHRcdH0gKTtcblx0fSxcblx0dHJpZ2dlckhhbmRsZXI6IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xuXHRcdHZhciBlbGVtID0gdGhpc1sgMCBdO1xuXHRcdGlmICggZWxlbSApIHtcblx0XHRcdHJldHVybiBqUXVlcnkuZXZlbnQudHJpZ2dlciggdHlwZSwgZGF0YSwgZWxlbSwgdHJ1ZSApO1xuXHRcdH1cblx0fVxufSApO1xuXG5cbmpRdWVyeS5lYWNoKCAoIFwiYmx1ciBmb2N1cyBmb2N1c2luIGZvY3Vzb3V0IHJlc2l6ZSBzY3JvbGwgY2xpY2sgZGJsY2xpY2sgXCIgK1xuXHRcIm1vdXNlZG93biBtb3VzZXVwIG1vdXNlbW92ZSBtb3VzZW92ZXIgbW91c2VvdXQgbW91c2VlbnRlciBtb3VzZWxlYXZlIFwiICtcblx0XCJjaGFuZ2Ugc2VsZWN0IHN1Ym1pdCBrZXlkb3duIGtleXByZXNzIGtleXVwIGNvbnRleHRtZW51XCIgKS5zcGxpdCggXCIgXCIgKSxcblx0ZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cblx0Ly8gSGFuZGxlIGV2ZW50IGJpbmRpbmdcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggZGF0YSwgZm4gKSB7XG5cdFx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAwID9cblx0XHRcdHRoaXMub24oIG5hbWUsIG51bGwsIGRhdGEsIGZuICkgOlxuXHRcdFx0dGhpcy50cmlnZ2VyKCBuYW1lICk7XG5cdH07XG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0aG92ZXI6IGZ1bmN0aW9uKCBmbk92ZXIsIGZuT3V0ICkge1xuXHRcdHJldHVybiB0aGlzLm1vdXNlZW50ZXIoIGZuT3ZlciApLm1vdXNlbGVhdmUoIGZuT3V0IHx8IGZuT3ZlciApO1xuXHR9XG59ICk7XG5cblxuXG5cbnN1cHBvcnQuZm9jdXNpbiA9IFwib25mb2N1c2luXCIgaW4gd2luZG93O1xuXG5cbi8vIFN1cHBvcnQ6IEZpcmVmb3ggPD00NFxuLy8gRmlyZWZveCBkb2Vzbid0IGhhdmUgZm9jdXMoaW4gfCBvdXQpIGV2ZW50c1xuLy8gUmVsYXRlZCB0aWNrZXQgLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02ODc3ODdcbi8vXG4vLyBTdXBwb3J0OiBDaHJvbWUgPD00OCAtIDQ5LCBTYWZhcmkgPD05LjAgLSA5LjFcbi8vIGZvY3VzKGluIHwgb3V0KSBldmVudHMgZmlyZSBhZnRlciBmb2N1cyAmIGJsdXIgZXZlbnRzLFxuLy8gd2hpY2ggaXMgc3BlYyB2aW9sYXRpb24gLSBodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1FdmVudHMvI2V2ZW50cy1mb2N1c2V2ZW50LWV2ZW50LW9yZGVyXG4vLyBSZWxhdGVkIHRpY2tldCAtIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ0OTg1N1xuaWYgKCAhc3VwcG9ydC5mb2N1c2luICkge1xuXHRqUXVlcnkuZWFjaCggeyBmb2N1czogXCJmb2N1c2luXCIsIGJsdXI6IFwiZm9jdXNvdXRcIiB9LCBmdW5jdGlvbiggb3JpZywgZml4ICkge1xuXG5cdFx0Ly8gQXR0YWNoIGEgc2luZ2xlIGNhcHR1cmluZyBoYW5kbGVyIG9uIHRoZSBkb2N1bWVudCB3aGlsZSBzb21lb25lIHdhbnRzIGZvY3VzaW4vZm9jdXNvdXRcblx0XHR2YXIgaGFuZGxlciA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdGpRdWVyeS5ldmVudC5zaW11bGF0ZSggZml4LCBldmVudC50YXJnZXQsIGpRdWVyeS5ldmVudC5maXgoIGV2ZW50ICkgKTtcblx0XHR9O1xuXG5cdFx0alF1ZXJ5LmV2ZW50LnNwZWNpYWxbIGZpeCBdID0ge1xuXHRcdFx0c2V0dXA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgZG9jID0gdGhpcy5vd25lckRvY3VtZW50IHx8IHRoaXMsXG5cdFx0XHRcdFx0YXR0YWNoZXMgPSBkYXRhUHJpdi5hY2Nlc3MoIGRvYywgZml4ICk7XG5cblx0XHRcdFx0aWYgKCAhYXR0YWNoZXMgKSB7XG5cdFx0XHRcdFx0ZG9jLmFkZEV2ZW50TGlzdGVuZXIoIG9yaWcsIGhhbmRsZXIsIHRydWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkYXRhUHJpdi5hY2Nlc3MoIGRvYywgZml4LCAoIGF0dGFjaGVzIHx8IDAgKSArIDEgKTtcblx0XHRcdH0sXG5cdFx0XHR0ZWFyZG93bjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBkb2MgPSB0aGlzLm93bmVyRG9jdW1lbnQgfHwgdGhpcyxcblx0XHRcdFx0XHRhdHRhY2hlcyA9IGRhdGFQcml2LmFjY2VzcyggZG9jLCBmaXggKSAtIDE7XG5cblx0XHRcdFx0aWYgKCAhYXR0YWNoZXMgKSB7XG5cdFx0XHRcdFx0ZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoIG9yaWcsIGhhbmRsZXIsIHRydWUgKTtcblx0XHRcdFx0XHRkYXRhUHJpdi5yZW1vdmUoIGRvYywgZml4ICk7XG5cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRkYXRhUHJpdi5hY2Nlc3MoIGRvYywgZml4LCBhdHRhY2hlcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fSApO1xufVxudmFyIGxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uO1xuXG52YXIgbm9uY2UgPSBqUXVlcnkubm93KCk7XG5cbnZhciBycXVlcnkgPSAoIC9cXD8vICk7XG5cblxuXG4vLyBDcm9zcy1icm93c2VyIHhtbCBwYXJzaW5nXG5qUXVlcnkucGFyc2VYTUwgPSBmdW5jdGlvbiggZGF0YSApIHtcblx0dmFyIHhtbDtcblx0aWYgKCAhZGF0YSB8fCB0eXBlb2YgZGF0YSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdC8vIFN1cHBvcnQ6IElFIDkgLSAxMSBvbmx5XG5cdC8vIElFIHRocm93cyBvbiBwYXJzZUZyb21TdHJpbmcgd2l0aCBpbnZhbGlkIGlucHV0LlxuXHR0cnkge1xuXHRcdHhtbCA9ICggbmV3IHdpbmRvdy5ET01QYXJzZXIoKSApLnBhcnNlRnJvbVN0cmluZyggZGF0YSwgXCJ0ZXh0L3htbFwiICk7XG5cdH0gY2F0Y2ggKCBlICkge1xuXHRcdHhtbCA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdGlmICggIXhtbCB8fCB4bWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwicGFyc2VyZXJyb3JcIiApLmxlbmd0aCApIHtcblx0XHRqUXVlcnkuZXJyb3IoIFwiSW52YWxpZCBYTUw6IFwiICsgZGF0YSApO1xuXHR9XG5cdHJldHVybiB4bWw7XG59O1xuXG5cbnZhclxuXHRyYnJhY2tldCA9IC9cXFtcXF0kLyxcblx0ckNSTEYgPSAvXFxyP1xcbi9nLFxuXHRyc3VibWl0dGVyVHlwZXMgPSAvXig/OnN1Ym1pdHxidXR0b258aW1hZ2V8cmVzZXR8ZmlsZSkkL2ksXG5cdHJzdWJtaXR0YWJsZSA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGtleWdlbikvaTtcblxuZnVuY3Rpb24gYnVpbGRQYXJhbXMoIHByZWZpeCwgb2JqLCB0cmFkaXRpb25hbCwgYWRkICkge1xuXHR2YXIgbmFtZTtcblxuXHRpZiAoIEFycmF5LmlzQXJyYXkoIG9iaiApICkge1xuXG5cdFx0Ly8gU2VyaWFsaXplIGFycmF5IGl0ZW0uXG5cdFx0alF1ZXJ5LmVhY2goIG9iaiwgZnVuY3Rpb24oIGksIHYgKSB7XG5cdFx0XHRpZiAoIHRyYWRpdGlvbmFsIHx8IHJicmFja2V0LnRlc3QoIHByZWZpeCApICkge1xuXG5cdFx0XHRcdC8vIFRyZWF0IGVhY2ggYXJyYXkgaXRlbSBhcyBhIHNjYWxhci5cblx0XHRcdFx0YWRkKCBwcmVmaXgsIHYgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBJdGVtIGlzIG5vbi1zY2FsYXIgKGFycmF5IG9yIG9iamVjdCksIGVuY29kZSBpdHMgbnVtZXJpYyBpbmRleC5cblx0XHRcdFx0YnVpbGRQYXJhbXMoXG5cdFx0XHRcdFx0cHJlZml4ICsgXCJbXCIgKyAoIHR5cGVvZiB2ID09PSBcIm9iamVjdFwiICYmIHYgIT0gbnVsbCA/IGkgOiBcIlwiICkgKyBcIl1cIixcblx0XHRcdFx0XHR2LFxuXHRcdFx0XHRcdHRyYWRpdGlvbmFsLFxuXHRcdFx0XHRcdGFkZFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0gKTtcblxuXHR9IGVsc2UgaWYgKCAhdHJhZGl0aW9uYWwgJiYgalF1ZXJ5LnR5cGUoIG9iaiApID09PSBcIm9iamVjdFwiICkge1xuXG5cdFx0Ly8gU2VyaWFsaXplIG9iamVjdCBpdGVtLlxuXHRcdGZvciAoIG5hbWUgaW4gb2JqICkge1xuXHRcdFx0YnVpbGRQYXJhbXMoIHByZWZpeCArIFwiW1wiICsgbmFtZSArIFwiXVwiLCBvYmpbIG5hbWUgXSwgdHJhZGl0aW9uYWwsIGFkZCApO1xuXHRcdH1cblxuXHR9IGVsc2Uge1xuXG5cdFx0Ly8gU2VyaWFsaXplIHNjYWxhciBpdGVtLlxuXHRcdGFkZCggcHJlZml4LCBvYmogKTtcblx0fVxufVxuXG4vLyBTZXJpYWxpemUgYW4gYXJyYXkgb2YgZm9ybSBlbGVtZW50cyBvciBhIHNldCBvZlxuLy8ga2V5L3ZhbHVlcyBpbnRvIGEgcXVlcnkgc3RyaW5nXG5qUXVlcnkucGFyYW0gPSBmdW5jdGlvbiggYSwgdHJhZGl0aW9uYWwgKSB7XG5cdHZhciBwcmVmaXgsXG5cdFx0cyA9IFtdLFxuXHRcdGFkZCA9IGZ1bmN0aW9uKCBrZXksIHZhbHVlT3JGdW5jdGlvbiApIHtcblxuXHRcdFx0Ly8gSWYgdmFsdWUgaXMgYSBmdW5jdGlvbiwgaW52b2tlIGl0IGFuZCB1c2UgaXRzIHJldHVybiB2YWx1ZVxuXHRcdFx0dmFyIHZhbHVlID0galF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlT3JGdW5jdGlvbiApID9cblx0XHRcdFx0dmFsdWVPckZ1bmN0aW9uKCkgOlxuXHRcdFx0XHR2YWx1ZU9yRnVuY3Rpb247XG5cblx0XHRcdHNbIHMubGVuZ3RoIF0gPSBlbmNvZGVVUklDb21wb25lbnQoIGtleSApICsgXCI9XCIgK1xuXHRcdFx0XHRlbmNvZGVVUklDb21wb25lbnQoIHZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWUgKTtcblx0XHR9O1xuXG5cdC8vIElmIGFuIGFycmF5IHdhcyBwYXNzZWQgaW4sIGFzc3VtZSB0aGF0IGl0IGlzIGFuIGFycmF5IG9mIGZvcm0gZWxlbWVudHMuXG5cdGlmICggQXJyYXkuaXNBcnJheSggYSApIHx8ICggYS5qcXVlcnkgJiYgIWpRdWVyeS5pc1BsYWluT2JqZWN0KCBhICkgKSApIHtcblxuXHRcdC8vIFNlcmlhbGl6ZSB0aGUgZm9ybSBlbGVtZW50c1xuXHRcdGpRdWVyeS5lYWNoKCBhLCBmdW5jdGlvbigpIHtcblx0XHRcdGFkZCggdGhpcy5uYW1lLCB0aGlzLnZhbHVlICk7XG5cdFx0fSApO1xuXG5cdH0gZWxzZSB7XG5cblx0XHQvLyBJZiB0cmFkaXRpb25hbCwgZW5jb2RlIHRoZSBcIm9sZFwiIHdheSAodGhlIHdheSAxLjMuMiBvciBvbGRlclxuXHRcdC8vIGRpZCBpdCksIG90aGVyd2lzZSBlbmNvZGUgcGFyYW1zIHJlY3Vyc2l2ZWx5LlxuXHRcdGZvciAoIHByZWZpeCBpbiBhICkge1xuXHRcdFx0YnVpbGRQYXJhbXMoIHByZWZpeCwgYVsgcHJlZml4IF0sIHRyYWRpdGlvbmFsLCBhZGQgKTtcblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIHJlc3VsdGluZyBzZXJpYWxpemF0aW9uXG5cdHJldHVybiBzLmpvaW4oIFwiJlwiICk7XG59O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdHNlcmlhbGl6ZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5wYXJhbSggdGhpcy5zZXJpYWxpemVBcnJheSgpICk7XG5cdH0sXG5cdHNlcmlhbGl6ZUFycmF5OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBDYW4gYWRkIHByb3BIb29rIGZvciBcImVsZW1lbnRzXCIgdG8gZmlsdGVyIG9yIGFkZCBmb3JtIGVsZW1lbnRzXG5cdFx0XHR2YXIgZWxlbWVudHMgPSBqUXVlcnkucHJvcCggdGhpcywgXCJlbGVtZW50c1wiICk7XG5cdFx0XHRyZXR1cm4gZWxlbWVudHMgPyBqUXVlcnkubWFrZUFycmF5KCBlbGVtZW50cyApIDogdGhpcztcblx0XHR9IClcblx0XHQuZmlsdGVyKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciB0eXBlID0gdGhpcy50eXBlO1xuXG5cdFx0XHQvLyBVc2UgLmlzKCBcIjpkaXNhYmxlZFwiICkgc28gdGhhdCBmaWVsZHNldFtkaXNhYmxlZF0gd29ya3Ncblx0XHRcdHJldHVybiB0aGlzLm5hbWUgJiYgIWpRdWVyeSggdGhpcyApLmlzKCBcIjpkaXNhYmxlZFwiICkgJiZcblx0XHRcdFx0cnN1Ym1pdHRhYmxlLnRlc3QoIHRoaXMubm9kZU5hbWUgKSAmJiAhcnN1Ym1pdHRlclR5cGVzLnRlc3QoIHR5cGUgKSAmJlxuXHRcdFx0XHQoIHRoaXMuY2hlY2tlZCB8fCAhcmNoZWNrYWJsZVR5cGUudGVzdCggdHlwZSApICk7XG5cdFx0fSApXG5cdFx0Lm1hcCggZnVuY3Rpb24oIGksIGVsZW0gKSB7XG5cdFx0XHR2YXIgdmFsID0galF1ZXJ5KCB0aGlzICkudmFsKCk7XG5cblx0XHRcdGlmICggdmFsID09IG51bGwgKSB7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIEFycmF5LmlzQXJyYXkoIHZhbCApICkge1xuXHRcdFx0XHRyZXR1cm4galF1ZXJ5Lm1hcCggdmFsLCBmdW5jdGlvbiggdmFsICkge1xuXHRcdFx0XHRcdHJldHVybiB7IG5hbWU6IGVsZW0ubmFtZSwgdmFsdWU6IHZhbC5yZXBsYWNlKCByQ1JMRiwgXCJcXHJcXG5cIiApIH07XG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHsgbmFtZTogZWxlbS5uYW1lLCB2YWx1ZTogdmFsLnJlcGxhY2UoIHJDUkxGLCBcIlxcclxcblwiICkgfTtcblx0XHR9ICkuZ2V0KCk7XG5cdH1cbn0gKTtcblxuXG52YXJcblx0cjIwID0gLyUyMC9nLFxuXHRyaGFzaCA9IC8jLiokLyxcblx0cmFudGlDYWNoZSA9IC8oWz8mXSlfPVteJl0qLyxcblx0cmhlYWRlcnMgPSAvXiguKj8pOlsgXFx0XSooW15cXHJcXG5dKikkL21nLFxuXG5cdC8vICM3NjUzLCAjODEyNSwgIzgxNTI6IGxvY2FsIHByb3RvY29sIGRldGVjdGlvblxuXHRybG9jYWxQcm90b2NvbCA9IC9eKD86YWJvdXR8YXBwfGFwcC1zdG9yYWdlfC4rLWV4dGVuc2lvbnxmaWxlfHJlc3x3aWRnZXQpOiQvLFxuXHRybm9Db250ZW50ID0gL14oPzpHRVR8SEVBRCkkLyxcblx0cnByb3RvY29sID0gL15cXC9cXC8vLFxuXG5cdC8qIFByZWZpbHRlcnNcblx0ICogMSkgVGhleSBhcmUgdXNlZnVsIHRvIGludHJvZHVjZSBjdXN0b20gZGF0YVR5cGVzIChzZWUgYWpheC9qc29ucC5qcyBmb3IgYW4gZXhhbXBsZSlcblx0ICogMikgVGhlc2UgYXJlIGNhbGxlZDpcblx0ICogICAgLSBCRUZPUkUgYXNraW5nIGZvciBhIHRyYW5zcG9ydFxuXHQgKiAgICAtIEFGVEVSIHBhcmFtIHNlcmlhbGl6YXRpb24gKHMuZGF0YSBpcyBhIHN0cmluZyBpZiBzLnByb2Nlc3NEYXRhIGlzIHRydWUpXG5cdCAqIDMpIGtleSBpcyB0aGUgZGF0YVR5cGVcblx0ICogNCkgdGhlIGNhdGNoYWxsIHN5bWJvbCBcIipcIiBjYW4gYmUgdXNlZFxuXHQgKiA1KSBleGVjdXRpb24gd2lsbCBzdGFydCB3aXRoIHRyYW5zcG9ydCBkYXRhVHlwZSBhbmQgVEhFTiBjb250aW51ZSBkb3duIHRvIFwiKlwiIGlmIG5lZWRlZFxuXHQgKi9cblx0cHJlZmlsdGVycyA9IHt9LFxuXG5cdC8qIFRyYW5zcG9ydHMgYmluZGluZ3Ncblx0ICogMSkga2V5IGlzIHRoZSBkYXRhVHlwZVxuXHQgKiAyKSB0aGUgY2F0Y2hhbGwgc3ltYm9sIFwiKlwiIGNhbiBiZSB1c2VkXG5cdCAqIDMpIHNlbGVjdGlvbiB3aWxsIHN0YXJ0IHdpdGggdHJhbnNwb3J0IGRhdGFUeXBlIGFuZCBUSEVOIGdvIHRvIFwiKlwiIGlmIG5lZWRlZFxuXHQgKi9cblx0dHJhbnNwb3J0cyA9IHt9LFxuXG5cdC8vIEF2b2lkIGNvbW1lbnQtcHJvbG9nIGNoYXIgc2VxdWVuY2UgKCMxMDA5OCk7IG11c3QgYXBwZWFzZSBsaW50IGFuZCBldmFkZSBjb21wcmVzc2lvblxuXHRhbGxUeXBlcyA9IFwiKi9cIi5jb25jYXQoIFwiKlwiICksXG5cblx0Ly8gQW5jaG9yIHRhZyBmb3IgcGFyc2luZyB0aGUgZG9jdW1lbnQgb3JpZ2luXG5cdG9yaWdpbkFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiYVwiICk7XG5cdG9yaWdpbkFuY2hvci5ocmVmID0gbG9jYXRpb24uaHJlZjtcblxuLy8gQmFzZSBcImNvbnN0cnVjdG9yXCIgZm9yIGpRdWVyeS5hamF4UHJlZmlsdGVyIGFuZCBqUXVlcnkuYWpheFRyYW5zcG9ydFxuZnVuY3Rpb24gYWRkVG9QcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCBzdHJ1Y3R1cmUgKSB7XG5cblx0Ly8gZGF0YVR5cGVFeHByZXNzaW9uIGlzIG9wdGlvbmFsIGFuZCBkZWZhdWx0cyB0byBcIipcIlxuXHRyZXR1cm4gZnVuY3Rpb24oIGRhdGFUeXBlRXhwcmVzc2lvbiwgZnVuYyApIHtcblxuXHRcdGlmICggdHlwZW9mIGRhdGFUeXBlRXhwcmVzc2lvbiAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGZ1bmMgPSBkYXRhVHlwZUV4cHJlc3Npb247XG5cdFx0XHRkYXRhVHlwZUV4cHJlc3Npb24gPSBcIipcIjtcblx0XHR9XG5cblx0XHR2YXIgZGF0YVR5cGUsXG5cdFx0XHRpID0gMCxcblx0XHRcdGRhdGFUeXBlcyA9IGRhdGFUeXBlRXhwcmVzc2lvbi50b0xvd2VyQ2FzZSgpLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgW107XG5cblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBmdW5jICkgKSB7XG5cblx0XHRcdC8vIEZvciBlYWNoIGRhdGFUeXBlIGluIHRoZSBkYXRhVHlwZUV4cHJlc3Npb25cblx0XHRcdHdoaWxlICggKCBkYXRhVHlwZSA9IGRhdGFUeXBlc1sgaSsrIF0gKSApIHtcblxuXHRcdFx0XHQvLyBQcmVwZW5kIGlmIHJlcXVlc3RlZFxuXHRcdFx0XHRpZiAoIGRhdGFUeXBlWyAwIF0gPT09IFwiK1wiICkge1xuXHRcdFx0XHRcdGRhdGFUeXBlID0gZGF0YVR5cGUuc2xpY2UoIDEgKSB8fCBcIipcIjtcblx0XHRcdFx0XHQoIHN0cnVjdHVyZVsgZGF0YVR5cGUgXSA9IHN0cnVjdHVyZVsgZGF0YVR5cGUgXSB8fCBbXSApLnVuc2hpZnQoIGZ1bmMgKTtcblxuXHRcdFx0XHQvLyBPdGhlcndpc2UgYXBwZW5kXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0KCBzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gPSBzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gfHwgW10gKS5wdXNoKCBmdW5jICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG5cbi8vIEJhc2UgaW5zcGVjdGlvbiBmdW5jdGlvbiBmb3IgcHJlZmlsdGVycyBhbmQgdHJhbnNwb3J0c1xuZnVuY3Rpb24gaW5zcGVjdFByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHN0cnVjdHVyZSwgb3B0aW9ucywgb3JpZ2luYWxPcHRpb25zLCBqcVhIUiApIHtcblxuXHR2YXIgaW5zcGVjdGVkID0ge30sXG5cdFx0c2Vla2luZ1RyYW5zcG9ydCA9ICggc3RydWN0dXJlID09PSB0cmFuc3BvcnRzICk7XG5cblx0ZnVuY3Rpb24gaW5zcGVjdCggZGF0YVR5cGUgKSB7XG5cdFx0dmFyIHNlbGVjdGVkO1xuXHRcdGluc3BlY3RlZFsgZGF0YVR5cGUgXSA9IHRydWU7XG5cdFx0alF1ZXJ5LmVhY2goIHN0cnVjdHVyZVsgZGF0YVR5cGUgXSB8fCBbXSwgZnVuY3Rpb24oIF8sIHByZWZpbHRlck9yRmFjdG9yeSApIHtcblx0XHRcdHZhciBkYXRhVHlwZU9yVHJhbnNwb3J0ID0gcHJlZmlsdGVyT3JGYWN0b3J5KCBvcHRpb25zLCBvcmlnaW5hbE9wdGlvbnMsIGpxWEhSICk7XG5cdFx0XHRpZiAoIHR5cGVvZiBkYXRhVHlwZU9yVHJhbnNwb3J0ID09PSBcInN0cmluZ1wiICYmXG5cdFx0XHRcdCFzZWVraW5nVHJhbnNwb3J0ICYmICFpbnNwZWN0ZWRbIGRhdGFUeXBlT3JUcmFuc3BvcnQgXSApIHtcblxuXHRcdFx0XHRvcHRpb25zLmRhdGFUeXBlcy51bnNoaWZ0KCBkYXRhVHlwZU9yVHJhbnNwb3J0ICk7XG5cdFx0XHRcdGluc3BlY3QoIGRhdGFUeXBlT3JUcmFuc3BvcnQgKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSBlbHNlIGlmICggc2Vla2luZ1RyYW5zcG9ydCApIHtcblx0XHRcdFx0cmV0dXJuICEoIHNlbGVjdGVkID0gZGF0YVR5cGVPclRyYW5zcG9ydCApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0XHRyZXR1cm4gc2VsZWN0ZWQ7XG5cdH1cblxuXHRyZXR1cm4gaW5zcGVjdCggb3B0aW9ucy5kYXRhVHlwZXNbIDAgXSApIHx8ICFpbnNwZWN0ZWRbIFwiKlwiIF0gJiYgaW5zcGVjdCggXCIqXCIgKTtcbn1cblxuLy8gQSBzcGVjaWFsIGV4dGVuZCBmb3IgYWpheCBvcHRpb25zXG4vLyB0aGF0IHRha2VzIFwiZmxhdFwiIG9wdGlvbnMgKG5vdCB0byBiZSBkZWVwIGV4dGVuZGVkKVxuLy8gRml4ZXMgIzk4ODdcbmZ1bmN0aW9uIGFqYXhFeHRlbmQoIHRhcmdldCwgc3JjICkge1xuXHR2YXIga2V5LCBkZWVwLFxuXHRcdGZsYXRPcHRpb25zID0galF1ZXJ5LmFqYXhTZXR0aW5ncy5mbGF0T3B0aW9ucyB8fCB7fTtcblxuXHRmb3IgKCBrZXkgaW4gc3JjICkge1xuXHRcdGlmICggc3JjWyBrZXkgXSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0KCBmbGF0T3B0aW9uc1sga2V5IF0gPyB0YXJnZXQgOiAoIGRlZXAgfHwgKCBkZWVwID0ge30gKSApIClbIGtleSBdID0gc3JjWyBrZXkgXTtcblx0XHR9XG5cdH1cblx0aWYgKCBkZWVwICkge1xuXHRcdGpRdWVyeS5leHRlbmQoIHRydWUsIHRhcmdldCwgZGVlcCApO1xuXHR9XG5cblx0cmV0dXJuIHRhcmdldDtcbn1cblxuLyogSGFuZGxlcyByZXNwb25zZXMgdG8gYW4gYWpheCByZXF1ZXN0OlxuICogLSBmaW5kcyB0aGUgcmlnaHQgZGF0YVR5cGUgKG1lZGlhdGVzIGJldHdlZW4gY29udGVudC10eXBlIGFuZCBleHBlY3RlZCBkYXRhVHlwZSlcbiAqIC0gcmV0dXJucyB0aGUgY29ycmVzcG9uZGluZyByZXNwb25zZVxuICovXG5mdW5jdGlvbiBhamF4SGFuZGxlUmVzcG9uc2VzKCBzLCBqcVhIUiwgcmVzcG9uc2VzICkge1xuXG5cdHZhciBjdCwgdHlwZSwgZmluYWxEYXRhVHlwZSwgZmlyc3REYXRhVHlwZSxcblx0XHRjb250ZW50cyA9IHMuY29udGVudHMsXG5cdFx0ZGF0YVR5cGVzID0gcy5kYXRhVHlwZXM7XG5cblx0Ly8gUmVtb3ZlIGF1dG8gZGF0YVR5cGUgYW5kIGdldCBjb250ZW50LXR5cGUgaW4gdGhlIHByb2Nlc3Ncblx0d2hpbGUgKCBkYXRhVHlwZXNbIDAgXSA9PT0gXCIqXCIgKSB7XG5cdFx0ZGF0YVR5cGVzLnNoaWZ0KCk7XG5cdFx0aWYgKCBjdCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0Y3QgPSBzLm1pbWVUeXBlIHx8IGpxWEhSLmdldFJlc3BvbnNlSGVhZGVyKCBcIkNvbnRlbnQtVHlwZVwiICk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ2hlY2sgaWYgd2UncmUgZGVhbGluZyB3aXRoIGEga25vd24gY29udGVudC10eXBlXG5cdGlmICggY3QgKSB7XG5cdFx0Zm9yICggdHlwZSBpbiBjb250ZW50cyApIHtcblx0XHRcdGlmICggY29udGVudHNbIHR5cGUgXSAmJiBjb250ZW50c1sgdHlwZSBdLnRlc3QoIGN0ICkgKSB7XG5cdFx0XHRcdGRhdGFUeXBlcy51bnNoaWZ0KCB0eXBlICk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIENoZWNrIHRvIHNlZSBpZiB3ZSBoYXZlIGEgcmVzcG9uc2UgZm9yIHRoZSBleHBlY3RlZCBkYXRhVHlwZVxuXHRpZiAoIGRhdGFUeXBlc1sgMCBdIGluIHJlc3BvbnNlcyApIHtcblx0XHRmaW5hbERhdGFUeXBlID0gZGF0YVR5cGVzWyAwIF07XG5cdH0gZWxzZSB7XG5cblx0XHQvLyBUcnkgY29udmVydGlibGUgZGF0YVR5cGVzXG5cdFx0Zm9yICggdHlwZSBpbiByZXNwb25zZXMgKSB7XG5cdFx0XHRpZiAoICFkYXRhVHlwZXNbIDAgXSB8fCBzLmNvbnZlcnRlcnNbIHR5cGUgKyBcIiBcIiArIGRhdGFUeXBlc1sgMCBdIF0gKSB7XG5cdFx0XHRcdGZpbmFsRGF0YVR5cGUgPSB0eXBlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGlmICggIWZpcnN0RGF0YVR5cGUgKSB7XG5cdFx0XHRcdGZpcnN0RGF0YVR5cGUgPSB0eXBlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIE9yIGp1c3QgdXNlIGZpcnN0IG9uZVxuXHRcdGZpbmFsRGF0YVR5cGUgPSBmaW5hbERhdGFUeXBlIHx8IGZpcnN0RGF0YVR5cGU7XG5cdH1cblxuXHQvLyBJZiB3ZSBmb3VuZCBhIGRhdGFUeXBlXG5cdC8vIFdlIGFkZCB0aGUgZGF0YVR5cGUgdG8gdGhlIGxpc3QgaWYgbmVlZGVkXG5cdC8vIGFuZCByZXR1cm4gdGhlIGNvcnJlc3BvbmRpbmcgcmVzcG9uc2Vcblx0aWYgKCBmaW5hbERhdGFUeXBlICkge1xuXHRcdGlmICggZmluYWxEYXRhVHlwZSAhPT0gZGF0YVR5cGVzWyAwIF0gKSB7XG5cdFx0XHRkYXRhVHlwZXMudW5zaGlmdCggZmluYWxEYXRhVHlwZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzcG9uc2VzWyBmaW5hbERhdGFUeXBlIF07XG5cdH1cbn1cblxuLyogQ2hhaW4gY29udmVyc2lvbnMgZ2l2ZW4gdGhlIHJlcXVlc3QgYW5kIHRoZSBvcmlnaW5hbCByZXNwb25zZVxuICogQWxzbyBzZXRzIHRoZSByZXNwb25zZVhYWCBmaWVsZHMgb24gdGhlIGpxWEhSIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIGFqYXhDb252ZXJ0KCBzLCByZXNwb25zZSwganFYSFIsIGlzU3VjY2VzcyApIHtcblx0dmFyIGNvbnYyLCBjdXJyZW50LCBjb252LCB0bXAsIHByZXYsXG5cdFx0Y29udmVydGVycyA9IHt9LFxuXG5cdFx0Ly8gV29yayB3aXRoIGEgY29weSBvZiBkYXRhVHlwZXMgaW4gY2FzZSB3ZSBuZWVkIHRvIG1vZGlmeSBpdCBmb3IgY29udmVyc2lvblxuXHRcdGRhdGFUeXBlcyA9IHMuZGF0YVR5cGVzLnNsaWNlKCk7XG5cblx0Ly8gQ3JlYXRlIGNvbnZlcnRlcnMgbWFwIHdpdGggbG93ZXJjYXNlZCBrZXlzXG5cdGlmICggZGF0YVR5cGVzWyAxIF0gKSB7XG5cdFx0Zm9yICggY29udiBpbiBzLmNvbnZlcnRlcnMgKSB7XG5cdFx0XHRjb252ZXJ0ZXJzWyBjb252LnRvTG93ZXJDYXNlKCkgXSA9IHMuY29udmVydGVyc1sgY29udiBdO1xuXHRcdH1cblx0fVxuXG5cdGN1cnJlbnQgPSBkYXRhVHlwZXMuc2hpZnQoKTtcblxuXHQvLyBDb252ZXJ0IHRvIGVhY2ggc2VxdWVudGlhbCBkYXRhVHlwZVxuXHR3aGlsZSAoIGN1cnJlbnQgKSB7XG5cblx0XHRpZiAoIHMucmVzcG9uc2VGaWVsZHNbIGN1cnJlbnQgXSApIHtcblx0XHRcdGpxWEhSWyBzLnJlc3BvbnNlRmllbGRzWyBjdXJyZW50IF0gXSA9IHJlc3BvbnNlO1xuXHRcdH1cblxuXHRcdC8vIEFwcGx5IHRoZSBkYXRhRmlsdGVyIGlmIHByb3ZpZGVkXG5cdFx0aWYgKCAhcHJldiAmJiBpc1N1Y2Nlc3MgJiYgcy5kYXRhRmlsdGVyICkge1xuXHRcdFx0cmVzcG9uc2UgPSBzLmRhdGFGaWx0ZXIoIHJlc3BvbnNlLCBzLmRhdGFUeXBlICk7XG5cdFx0fVxuXG5cdFx0cHJldiA9IGN1cnJlbnQ7XG5cdFx0Y3VycmVudCA9IGRhdGFUeXBlcy5zaGlmdCgpO1xuXG5cdFx0aWYgKCBjdXJyZW50ICkge1xuXG5cdFx0XHQvLyBUaGVyZSdzIG9ubHkgd29yayB0byBkbyBpZiBjdXJyZW50IGRhdGFUeXBlIGlzIG5vbi1hdXRvXG5cdFx0XHRpZiAoIGN1cnJlbnQgPT09IFwiKlwiICkge1xuXG5cdFx0XHRcdGN1cnJlbnQgPSBwcmV2O1xuXG5cdFx0XHQvLyBDb252ZXJ0IHJlc3BvbnNlIGlmIHByZXYgZGF0YVR5cGUgaXMgbm9uLWF1dG8gYW5kIGRpZmZlcnMgZnJvbSBjdXJyZW50XG5cdFx0XHR9IGVsc2UgaWYgKCBwcmV2ICE9PSBcIipcIiAmJiBwcmV2ICE9PSBjdXJyZW50ICkge1xuXG5cdFx0XHRcdC8vIFNlZWsgYSBkaXJlY3QgY29udmVydGVyXG5cdFx0XHRcdGNvbnYgPSBjb252ZXJ0ZXJzWyBwcmV2ICsgXCIgXCIgKyBjdXJyZW50IF0gfHwgY29udmVydGVyc1sgXCIqIFwiICsgY3VycmVudCBdO1xuXG5cdFx0XHRcdC8vIElmIG5vbmUgZm91bmQsIHNlZWsgYSBwYWlyXG5cdFx0XHRcdGlmICggIWNvbnYgKSB7XG5cdFx0XHRcdFx0Zm9yICggY29udjIgaW4gY29udmVydGVycyApIHtcblxuXHRcdFx0XHRcdFx0Ly8gSWYgY29udjIgb3V0cHV0cyBjdXJyZW50XG5cdFx0XHRcdFx0XHR0bXAgPSBjb252Mi5zcGxpdCggXCIgXCIgKTtcblx0XHRcdFx0XHRcdGlmICggdG1wWyAxIF0gPT09IGN1cnJlbnQgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gSWYgcHJldiBjYW4gYmUgY29udmVydGVkIHRvIGFjY2VwdGVkIGlucHV0XG5cdFx0XHRcdFx0XHRcdGNvbnYgPSBjb252ZXJ0ZXJzWyBwcmV2ICsgXCIgXCIgKyB0bXBbIDAgXSBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0Y29udmVydGVyc1sgXCIqIFwiICsgdG1wWyAwIF0gXTtcblx0XHRcdFx0XHRcdFx0aWYgKCBjb252ICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gQ29uZGVuc2UgZXF1aXZhbGVuY2UgY29udmVydGVyc1xuXHRcdFx0XHRcdFx0XHRcdGlmICggY29udiA9PT0gdHJ1ZSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnYgPSBjb252ZXJ0ZXJzWyBjb252MiBdO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gT3RoZXJ3aXNlLCBpbnNlcnQgdGhlIGludGVybWVkaWF0ZSBkYXRhVHlwZVxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIGNvbnZlcnRlcnNbIGNvbnYyIF0gIT09IHRydWUgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjdXJyZW50ID0gdG1wWyAwIF07XG5cdFx0XHRcdFx0XHRcdFx0XHRkYXRhVHlwZXMudW5zaGlmdCggdG1wWyAxIF0gKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBcHBseSBjb252ZXJ0ZXIgKGlmIG5vdCBhbiBlcXVpdmFsZW5jZSlcblx0XHRcdFx0aWYgKCBjb252ICE9PSB0cnVlICkge1xuXG5cdFx0XHRcdFx0Ly8gVW5sZXNzIGVycm9ycyBhcmUgYWxsb3dlZCB0byBidWJibGUsIGNhdGNoIGFuZCByZXR1cm4gdGhlbVxuXHRcdFx0XHRcdGlmICggY29udiAmJiBzLnRocm93cyApIHtcblx0XHRcdFx0XHRcdHJlc3BvbnNlID0gY29udiggcmVzcG9uc2UgKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBjb252KCByZXNwb25zZSApO1xuXHRcdFx0XHRcdFx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRcdFx0c3RhdGU6IFwicGFyc2VyZXJyb3JcIixcblx0XHRcdFx0XHRcdFx0XHRlcnJvcjogY29udiA/IGUgOiBcIk5vIGNvbnZlcnNpb24gZnJvbSBcIiArIHByZXYgKyBcIiB0byBcIiArIGN1cnJlbnRcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4geyBzdGF0ZTogXCJzdWNjZXNzXCIsIGRhdGE6IHJlc3BvbnNlIH07XG59XG5cbmpRdWVyeS5leHRlbmQoIHtcblxuXHQvLyBDb3VudGVyIGZvciBob2xkaW5nIHRoZSBudW1iZXIgb2YgYWN0aXZlIHF1ZXJpZXNcblx0YWN0aXZlOiAwLFxuXG5cdC8vIExhc3QtTW9kaWZpZWQgaGVhZGVyIGNhY2hlIGZvciBuZXh0IHJlcXVlc3Rcblx0bGFzdE1vZGlmaWVkOiB7fSxcblx0ZXRhZzoge30sXG5cblx0YWpheFNldHRpbmdzOiB7XG5cdFx0dXJsOiBsb2NhdGlvbi5ocmVmLFxuXHRcdHR5cGU6IFwiR0VUXCIsXG5cdFx0aXNMb2NhbDogcmxvY2FsUHJvdG9jb2wudGVzdCggbG9jYXRpb24ucHJvdG9jb2wgKSxcblx0XHRnbG9iYWw6IHRydWUsXG5cdFx0cHJvY2Vzc0RhdGE6IHRydWUsXG5cdFx0YXN5bmM6IHRydWUsXG5cdFx0Y29udGVudFR5cGU6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04XCIsXG5cblx0XHQvKlxuXHRcdHRpbWVvdXQ6IDAsXG5cdFx0ZGF0YTogbnVsbCxcblx0XHRkYXRhVHlwZTogbnVsbCxcblx0XHR1c2VybmFtZTogbnVsbCxcblx0XHRwYXNzd29yZDogbnVsbCxcblx0XHRjYWNoZTogbnVsbCxcblx0XHR0aHJvd3M6IGZhbHNlLFxuXHRcdHRyYWRpdGlvbmFsOiBmYWxzZSxcblx0XHRoZWFkZXJzOiB7fSxcblx0XHQqL1xuXG5cdFx0YWNjZXB0czoge1xuXHRcdFx0XCIqXCI6IGFsbFR5cGVzLFxuXHRcdFx0dGV4dDogXCJ0ZXh0L3BsYWluXCIsXG5cdFx0XHRodG1sOiBcInRleHQvaHRtbFwiLFxuXHRcdFx0eG1sOiBcImFwcGxpY2F0aW9uL3htbCwgdGV4dC94bWxcIixcblx0XHRcdGpzb246IFwiYXBwbGljYXRpb24vanNvbiwgdGV4dC9qYXZhc2NyaXB0XCJcblx0XHR9LFxuXG5cdFx0Y29udGVudHM6IHtcblx0XHRcdHhtbDogL1xcYnhtbFxcYi8sXG5cdFx0XHRodG1sOiAvXFxiaHRtbC8sXG5cdFx0XHRqc29uOiAvXFxianNvblxcYi9cblx0XHR9LFxuXG5cdFx0cmVzcG9uc2VGaWVsZHM6IHtcblx0XHRcdHhtbDogXCJyZXNwb25zZVhNTFwiLFxuXHRcdFx0dGV4dDogXCJyZXNwb25zZVRleHRcIixcblx0XHRcdGpzb246IFwicmVzcG9uc2VKU09OXCJcblx0XHR9LFxuXG5cdFx0Ly8gRGF0YSBjb252ZXJ0ZXJzXG5cdFx0Ly8gS2V5cyBzZXBhcmF0ZSBzb3VyY2UgKG9yIGNhdGNoYWxsIFwiKlwiKSBhbmQgZGVzdGluYXRpb24gdHlwZXMgd2l0aCBhIHNpbmdsZSBzcGFjZVxuXHRcdGNvbnZlcnRlcnM6IHtcblxuXHRcdFx0Ly8gQ29udmVydCBhbnl0aGluZyB0byB0ZXh0XG5cdFx0XHRcIiogdGV4dFwiOiBTdHJpbmcsXG5cblx0XHRcdC8vIFRleHQgdG8gaHRtbCAodHJ1ZSA9IG5vIHRyYW5zZm9ybWF0aW9uKVxuXHRcdFx0XCJ0ZXh0IGh0bWxcIjogdHJ1ZSxcblxuXHRcdFx0Ly8gRXZhbHVhdGUgdGV4dCBhcyBhIGpzb24gZXhwcmVzc2lvblxuXHRcdFx0XCJ0ZXh0IGpzb25cIjogSlNPTi5wYXJzZSxcblxuXHRcdFx0Ly8gUGFyc2UgdGV4dCBhcyB4bWxcblx0XHRcdFwidGV4dCB4bWxcIjogalF1ZXJ5LnBhcnNlWE1MXG5cdFx0fSxcblxuXHRcdC8vIEZvciBvcHRpb25zIHRoYXQgc2hvdWxkbid0IGJlIGRlZXAgZXh0ZW5kZWQ6XG5cdFx0Ly8geW91IGNhbiBhZGQgeW91ciBvd24gY3VzdG9tIG9wdGlvbnMgaGVyZSBpZlxuXHRcdC8vIGFuZCB3aGVuIHlvdSBjcmVhdGUgb25lIHRoYXQgc2hvdWxkbid0IGJlXG5cdFx0Ly8gZGVlcCBleHRlbmRlZCAoc2VlIGFqYXhFeHRlbmQpXG5cdFx0ZmxhdE9wdGlvbnM6IHtcblx0XHRcdHVybDogdHJ1ZSxcblx0XHRcdGNvbnRleHQ6IHRydWVcblx0XHR9XG5cdH0sXG5cblx0Ly8gQ3JlYXRlcyBhIGZ1bGwgZmxlZGdlZCBzZXR0aW5ncyBvYmplY3QgaW50byB0YXJnZXRcblx0Ly8gd2l0aCBib3RoIGFqYXhTZXR0aW5ncyBhbmQgc2V0dGluZ3MgZmllbGRzLlxuXHQvLyBJZiB0YXJnZXQgaXMgb21pdHRlZCwgd3JpdGVzIGludG8gYWpheFNldHRpbmdzLlxuXHRhamF4U2V0dXA6IGZ1bmN0aW9uKCB0YXJnZXQsIHNldHRpbmdzICkge1xuXHRcdHJldHVybiBzZXR0aW5ncyA/XG5cblx0XHRcdC8vIEJ1aWxkaW5nIGEgc2V0dGluZ3Mgb2JqZWN0XG5cdFx0XHRhamF4RXh0ZW5kKCBhamF4RXh0ZW5kKCB0YXJnZXQsIGpRdWVyeS5hamF4U2V0dGluZ3MgKSwgc2V0dGluZ3MgKSA6XG5cblx0XHRcdC8vIEV4dGVuZGluZyBhamF4U2V0dGluZ3Ncblx0XHRcdGFqYXhFeHRlbmQoIGpRdWVyeS5hamF4U2V0dGluZ3MsIHRhcmdldCApO1xuXHR9LFxuXG5cdGFqYXhQcmVmaWx0ZXI6IGFkZFRvUHJlZmlsdGVyc09yVHJhbnNwb3J0cyggcHJlZmlsdGVycyApLFxuXHRhamF4VHJhbnNwb3J0OiBhZGRUb1ByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHRyYW5zcG9ydHMgKSxcblxuXHQvLyBNYWluIG1ldGhvZFxuXHRhamF4OiBmdW5jdGlvbiggdXJsLCBvcHRpb25zICkge1xuXG5cdFx0Ly8gSWYgdXJsIGlzIGFuIG9iamVjdCwgc2ltdWxhdGUgcHJlLTEuNSBzaWduYXR1cmVcblx0XHRpZiAoIHR5cGVvZiB1cmwgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0XHRvcHRpb25zID0gdXJsO1xuXHRcdFx0dXJsID0gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdC8vIEZvcmNlIG9wdGlvbnMgdG8gYmUgYW4gb2JqZWN0XG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0XHR2YXIgdHJhbnNwb3J0LFxuXG5cdFx0XHQvLyBVUkwgd2l0aG91dCBhbnRpLWNhY2hlIHBhcmFtXG5cdFx0XHRjYWNoZVVSTCxcblxuXHRcdFx0Ly8gUmVzcG9uc2UgaGVhZGVyc1xuXHRcdFx0cmVzcG9uc2VIZWFkZXJzU3RyaW5nLFxuXHRcdFx0cmVzcG9uc2VIZWFkZXJzLFxuXG5cdFx0XHQvLyB0aW1lb3V0IGhhbmRsZVxuXHRcdFx0dGltZW91dFRpbWVyLFxuXG5cdFx0XHQvLyBVcmwgY2xlYW51cCB2YXJcblx0XHRcdHVybEFuY2hvcixcblxuXHRcdFx0Ly8gUmVxdWVzdCBzdGF0ZSAoYmVjb21lcyBmYWxzZSB1cG9uIHNlbmQgYW5kIHRydWUgdXBvbiBjb21wbGV0aW9uKVxuXHRcdFx0Y29tcGxldGVkLFxuXG5cdFx0XHQvLyBUbyBrbm93IGlmIGdsb2JhbCBldmVudHMgYXJlIHRvIGJlIGRpc3BhdGNoZWRcblx0XHRcdGZpcmVHbG9iYWxzLFxuXG5cdFx0XHQvLyBMb29wIHZhcmlhYmxlXG5cdFx0XHRpLFxuXG5cdFx0XHQvLyB1bmNhY2hlZCBwYXJ0IG9mIHRoZSB1cmxcblx0XHRcdHVuY2FjaGVkLFxuXG5cdFx0XHQvLyBDcmVhdGUgdGhlIGZpbmFsIG9wdGlvbnMgb2JqZWN0XG5cdFx0XHRzID0galF1ZXJ5LmFqYXhTZXR1cCgge30sIG9wdGlvbnMgKSxcblxuXHRcdFx0Ly8gQ2FsbGJhY2tzIGNvbnRleHRcblx0XHRcdGNhbGxiYWNrQ29udGV4dCA9IHMuY29udGV4dCB8fCBzLFxuXG5cdFx0XHQvLyBDb250ZXh0IGZvciBnbG9iYWwgZXZlbnRzIGlzIGNhbGxiYWNrQ29udGV4dCBpZiBpdCBpcyBhIERPTSBub2RlIG9yIGpRdWVyeSBjb2xsZWN0aW9uXG5cdFx0XHRnbG9iYWxFdmVudENvbnRleHQgPSBzLmNvbnRleHQgJiZcblx0XHRcdFx0KCBjYWxsYmFja0NvbnRleHQubm9kZVR5cGUgfHwgY2FsbGJhY2tDb250ZXh0LmpxdWVyeSApID9cblx0XHRcdFx0XHRqUXVlcnkoIGNhbGxiYWNrQ29udGV4dCApIDpcblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQsXG5cblx0XHRcdC8vIERlZmVycmVkc1xuXHRcdFx0ZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcblx0XHRcdGNvbXBsZXRlRGVmZXJyZWQgPSBqUXVlcnkuQ2FsbGJhY2tzKCBcIm9uY2UgbWVtb3J5XCIgKSxcblxuXHRcdFx0Ly8gU3RhdHVzLWRlcGVuZGVudCBjYWxsYmFja3Ncblx0XHRcdHN0YXR1c0NvZGUgPSBzLnN0YXR1c0NvZGUgfHwge30sXG5cblx0XHRcdC8vIEhlYWRlcnMgKHRoZXkgYXJlIHNlbnQgYWxsIGF0IG9uY2UpXG5cdFx0XHRyZXF1ZXN0SGVhZGVycyA9IHt9LFxuXHRcdFx0cmVxdWVzdEhlYWRlcnNOYW1lcyA9IHt9LFxuXG5cdFx0XHQvLyBEZWZhdWx0IGFib3J0IG1lc3NhZ2Vcblx0XHRcdHN0ckFib3J0ID0gXCJjYW5jZWxlZFwiLFxuXG5cdFx0XHQvLyBGYWtlIHhoclxuXHRcdFx0anFYSFIgPSB7XG5cdFx0XHRcdHJlYWR5U3RhdGU6IDAsXG5cblx0XHRcdFx0Ly8gQnVpbGRzIGhlYWRlcnMgaGFzaHRhYmxlIGlmIG5lZWRlZFxuXHRcdFx0XHRnZXRSZXNwb25zZUhlYWRlcjogZnVuY3Rpb24oIGtleSApIHtcblx0XHRcdFx0XHR2YXIgbWF0Y2g7XG5cdFx0XHRcdFx0aWYgKCBjb21wbGV0ZWQgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICFyZXNwb25zZUhlYWRlcnMgKSB7XG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlSGVhZGVycyA9IHt9O1xuXHRcdFx0XHRcdFx0XHR3aGlsZSAoICggbWF0Y2ggPSByaGVhZGVycy5leGVjKCByZXNwb25zZUhlYWRlcnNTdHJpbmcgKSApICkge1xuXHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlSGVhZGVyc1sgbWF0Y2hbIDEgXS50b0xvd2VyQ2FzZSgpIF0gPSBtYXRjaFsgMiBdO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRtYXRjaCA9IHJlc3BvbnNlSGVhZGVyc1sga2V5LnRvTG93ZXJDYXNlKCkgXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIG1hdGNoID09IG51bGwgPyBudWxsIDogbWF0Y2g7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gUmF3IHN0cmluZ1xuXHRcdFx0XHRnZXRBbGxSZXNwb25zZUhlYWRlcnM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiBjb21wbGV0ZWQgPyByZXNwb25zZUhlYWRlcnNTdHJpbmcgOiBudWxsO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIENhY2hlcyB0aGUgaGVhZGVyXG5cdFx0XHRcdHNldFJlcXVlc3RIZWFkZXI6IGZ1bmN0aW9uKCBuYW1lLCB2YWx1ZSApIHtcblx0XHRcdFx0XHRpZiAoIGNvbXBsZXRlZCA9PSBudWxsICkge1xuXHRcdFx0XHRcdFx0bmFtZSA9IHJlcXVlc3RIZWFkZXJzTmFtZXNbIG5hbWUudG9Mb3dlckNhc2UoKSBdID1cblx0XHRcdFx0XHRcdFx0cmVxdWVzdEhlYWRlcnNOYW1lc1sgbmFtZS50b0xvd2VyQ2FzZSgpIF0gfHwgbmFtZTtcblx0XHRcdFx0XHRcdHJlcXVlc3RIZWFkZXJzWyBuYW1lIF0gPSB2YWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gT3ZlcnJpZGVzIHJlc3BvbnNlIGNvbnRlbnQtdHlwZSBoZWFkZXJcblx0XHRcdFx0b3ZlcnJpZGVNaW1lVHlwZTogZnVuY3Rpb24oIHR5cGUgKSB7XG5cdFx0XHRcdFx0aWYgKCBjb21wbGV0ZWQgPT0gbnVsbCApIHtcblx0XHRcdFx0XHRcdHMubWltZVR5cGUgPSB0eXBlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBTdGF0dXMtZGVwZW5kZW50IGNhbGxiYWNrc1xuXHRcdFx0XHRzdGF0dXNDb2RlOiBmdW5jdGlvbiggbWFwICkge1xuXHRcdFx0XHRcdHZhciBjb2RlO1xuXHRcdFx0XHRcdGlmICggbWFwICkge1xuXHRcdFx0XHRcdFx0aWYgKCBjb21wbGV0ZWQgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gRXhlY3V0ZSB0aGUgYXBwcm9wcmlhdGUgY2FsbGJhY2tzXG5cdFx0XHRcdFx0XHRcdGpxWEhSLmFsd2F5cyggbWFwWyBqcVhIUi5zdGF0dXMgXSApO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBMYXp5LWFkZCB0aGUgbmV3IGNhbGxiYWNrcyBpbiBhIHdheSB0aGF0IHByZXNlcnZlcyBvbGQgb25lc1xuXHRcdFx0XHRcdFx0XHRmb3IgKCBjb2RlIGluIG1hcCApIHtcblx0XHRcdFx0XHRcdFx0XHRzdGF0dXNDb2RlWyBjb2RlIF0gPSBbIHN0YXR1c0NvZGVbIGNvZGUgXSwgbWFwWyBjb2RlIF0gXTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBDYW5jZWwgdGhlIHJlcXVlc3Rcblx0XHRcdFx0YWJvcnQ6IGZ1bmN0aW9uKCBzdGF0dXNUZXh0ICkge1xuXHRcdFx0XHRcdHZhciBmaW5hbFRleHQgPSBzdGF0dXNUZXh0IHx8IHN0ckFib3J0O1xuXHRcdFx0XHRcdGlmICggdHJhbnNwb3J0ICkge1xuXHRcdFx0XHRcdFx0dHJhbnNwb3J0LmFib3J0KCBmaW5hbFRleHQgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZG9uZSggMCwgZmluYWxUZXh0ICk7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHQvLyBBdHRhY2ggZGVmZXJyZWRzXG5cdFx0ZGVmZXJyZWQucHJvbWlzZSgganFYSFIgKTtcblxuXHRcdC8vIEFkZCBwcm90b2NvbCBpZiBub3QgcHJvdmlkZWQgKHByZWZpbHRlcnMgbWlnaHQgZXhwZWN0IGl0KVxuXHRcdC8vIEhhbmRsZSBmYWxzeSB1cmwgaW4gdGhlIHNldHRpbmdzIG9iamVjdCAoIzEwMDkzOiBjb25zaXN0ZW5jeSB3aXRoIG9sZCBzaWduYXR1cmUpXG5cdFx0Ly8gV2UgYWxzbyB1c2UgdGhlIHVybCBwYXJhbWV0ZXIgaWYgYXZhaWxhYmxlXG5cdFx0cy51cmwgPSAoICggdXJsIHx8IHMudXJsIHx8IGxvY2F0aW9uLmhyZWYgKSArIFwiXCIgKVxuXHRcdFx0LnJlcGxhY2UoIHJwcm90b2NvbCwgbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKTtcblxuXHRcdC8vIEFsaWFzIG1ldGhvZCBvcHRpb24gdG8gdHlwZSBhcyBwZXIgdGlja2V0ICMxMjAwNFxuXHRcdHMudHlwZSA9IG9wdGlvbnMubWV0aG9kIHx8IG9wdGlvbnMudHlwZSB8fCBzLm1ldGhvZCB8fCBzLnR5cGU7XG5cblx0XHQvLyBFeHRyYWN0IGRhdGFUeXBlcyBsaXN0XG5cdFx0cy5kYXRhVHlwZXMgPSAoIHMuZGF0YVR5cGUgfHwgXCIqXCIgKS50b0xvd2VyQ2FzZSgpLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgWyBcIlwiIF07XG5cblx0XHQvLyBBIGNyb3NzLWRvbWFpbiByZXF1ZXN0IGlzIGluIG9yZGVyIHdoZW4gdGhlIG9yaWdpbiBkb2Vzbid0IG1hdGNoIHRoZSBjdXJyZW50IG9yaWdpbi5cblx0XHRpZiAoIHMuY3Jvc3NEb21haW4gPT0gbnVsbCApIHtcblx0XHRcdHVybEFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiYVwiICk7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9OCAtIDExLCBFZGdlIDEyIC0gMTNcblx0XHRcdC8vIElFIHRocm93cyBleGNlcHRpb24gb24gYWNjZXNzaW5nIHRoZSBocmVmIHByb3BlcnR5IGlmIHVybCBpcyBtYWxmb3JtZWQsXG5cdFx0XHQvLyBlLmcuIGh0dHA6Ly9leGFtcGxlLmNvbTo4MHgvXG5cdFx0XHR0cnkge1xuXHRcdFx0XHR1cmxBbmNob3IuaHJlZiA9IHMudXJsO1xuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9OCAtIDExIG9ubHlcblx0XHRcdFx0Ly8gQW5jaG9yJ3MgaG9zdCBwcm9wZXJ0eSBpc24ndCBjb3JyZWN0bHkgc2V0IHdoZW4gcy51cmwgaXMgcmVsYXRpdmVcblx0XHRcdFx0dXJsQW5jaG9yLmhyZWYgPSB1cmxBbmNob3IuaHJlZjtcblx0XHRcdFx0cy5jcm9zc0RvbWFpbiA9IG9yaWdpbkFuY2hvci5wcm90b2NvbCArIFwiLy9cIiArIG9yaWdpbkFuY2hvci5ob3N0ICE9PVxuXHRcdFx0XHRcdHVybEFuY2hvci5wcm90b2NvbCArIFwiLy9cIiArIHVybEFuY2hvci5ob3N0O1xuXHRcdFx0fSBjYXRjaCAoIGUgKSB7XG5cblx0XHRcdFx0Ly8gSWYgdGhlcmUgaXMgYW4gZXJyb3IgcGFyc2luZyB0aGUgVVJMLCBhc3N1bWUgaXQgaXMgY3Jvc3NEb21haW4sXG5cdFx0XHRcdC8vIGl0IGNhbiBiZSByZWplY3RlZCBieSB0aGUgdHJhbnNwb3J0IGlmIGl0IGlzIGludmFsaWRcblx0XHRcdFx0cy5jcm9zc0RvbWFpbiA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ29udmVydCBkYXRhIGlmIG5vdCBhbHJlYWR5IGEgc3RyaW5nXG5cdFx0aWYgKCBzLmRhdGEgJiYgcy5wcm9jZXNzRGF0YSAmJiB0eXBlb2Ygcy5kYXRhICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cy5kYXRhID0galF1ZXJ5LnBhcmFtKCBzLmRhdGEsIHMudHJhZGl0aW9uYWwgKTtcblx0XHR9XG5cblx0XHQvLyBBcHBseSBwcmVmaWx0ZXJzXG5cdFx0aW5zcGVjdFByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHByZWZpbHRlcnMsIHMsIG9wdGlvbnMsIGpxWEhSICk7XG5cblx0XHQvLyBJZiByZXF1ZXN0IHdhcyBhYm9ydGVkIGluc2lkZSBhIHByZWZpbHRlciwgc3RvcCB0aGVyZVxuXHRcdGlmICggY29tcGxldGVkICkge1xuXHRcdFx0cmV0dXJuIGpxWEhSO1xuXHRcdH1cblxuXHRcdC8vIFdlIGNhbiBmaXJlIGdsb2JhbCBldmVudHMgYXMgb2Ygbm93IGlmIGFza2VkIHRvXG5cdFx0Ly8gRG9uJ3QgZmlyZSBldmVudHMgaWYgalF1ZXJ5LmV2ZW50IGlzIHVuZGVmaW5lZCBpbiBhbiBBTUQtdXNhZ2Ugc2NlbmFyaW8gKCMxNTExOClcblx0XHRmaXJlR2xvYmFscyA9IGpRdWVyeS5ldmVudCAmJiBzLmdsb2JhbDtcblxuXHRcdC8vIFdhdGNoIGZvciBhIG5ldyBzZXQgb2YgcmVxdWVzdHNcblx0XHRpZiAoIGZpcmVHbG9iYWxzICYmIGpRdWVyeS5hY3RpdmUrKyA9PT0gMCApIHtcblx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyKCBcImFqYXhTdGFydFwiICk7XG5cdFx0fVxuXG5cdFx0Ly8gVXBwZXJjYXNlIHRoZSB0eXBlXG5cdFx0cy50eXBlID0gcy50eXBlLnRvVXBwZXJDYXNlKCk7XG5cblx0XHQvLyBEZXRlcm1pbmUgaWYgcmVxdWVzdCBoYXMgY29udGVudFxuXHRcdHMuaGFzQ29udGVudCA9ICFybm9Db250ZW50LnRlc3QoIHMudHlwZSApO1xuXG5cdFx0Ly8gU2F2ZSB0aGUgVVJMIGluIGNhc2Ugd2UncmUgdG95aW5nIHdpdGggdGhlIElmLU1vZGlmaWVkLVNpbmNlXG5cdFx0Ly8gYW5kL29yIElmLU5vbmUtTWF0Y2ggaGVhZGVyIGxhdGVyIG9uXG5cdFx0Ly8gUmVtb3ZlIGhhc2ggdG8gc2ltcGxpZnkgdXJsIG1hbmlwdWxhdGlvblxuXHRcdGNhY2hlVVJMID0gcy51cmwucmVwbGFjZSggcmhhc2gsIFwiXCIgKTtcblxuXHRcdC8vIE1vcmUgb3B0aW9ucyBoYW5kbGluZyBmb3IgcmVxdWVzdHMgd2l0aCBubyBjb250ZW50XG5cdFx0aWYgKCAhcy5oYXNDb250ZW50ICkge1xuXG5cdFx0XHQvLyBSZW1lbWJlciB0aGUgaGFzaCBzbyB3ZSBjYW4gcHV0IGl0IGJhY2tcblx0XHRcdHVuY2FjaGVkID0gcy51cmwuc2xpY2UoIGNhY2hlVVJMLmxlbmd0aCApO1xuXG5cdFx0XHQvLyBJZiBkYXRhIGlzIGF2YWlsYWJsZSwgYXBwZW5kIGRhdGEgdG8gdXJsXG5cdFx0XHRpZiAoIHMuZGF0YSApIHtcblx0XHRcdFx0Y2FjaGVVUkwgKz0gKCBycXVlcnkudGVzdCggY2FjaGVVUkwgKSA/IFwiJlwiIDogXCI/XCIgKSArIHMuZGF0YTtcblxuXHRcdFx0XHQvLyAjOTY4MjogcmVtb3ZlIGRhdGEgc28gdGhhdCBpdCdzIG5vdCB1c2VkIGluIGFuIGV2ZW50dWFsIHJldHJ5XG5cdFx0XHRcdGRlbGV0ZSBzLmRhdGE7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCBvciB1cGRhdGUgYW50aS1jYWNoZSBwYXJhbSBpZiBuZWVkZWRcblx0XHRcdGlmICggcy5jYWNoZSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdGNhY2hlVVJMID0gY2FjaGVVUkwucmVwbGFjZSggcmFudGlDYWNoZSwgXCIkMVwiICk7XG5cdFx0XHRcdHVuY2FjaGVkID0gKCBycXVlcnkudGVzdCggY2FjaGVVUkwgKSA/IFwiJlwiIDogXCI/XCIgKSArIFwiXz1cIiArICggbm9uY2UrKyApICsgdW5jYWNoZWQ7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFB1dCBoYXNoIGFuZCBhbnRpLWNhY2hlIG9uIHRoZSBVUkwgdGhhdCB3aWxsIGJlIHJlcXVlc3RlZCAoZ2gtMTczMilcblx0XHRcdHMudXJsID0gY2FjaGVVUkwgKyB1bmNhY2hlZDtcblxuXHRcdC8vIENoYW5nZSAnJTIwJyB0byAnKycgaWYgdGhpcyBpcyBlbmNvZGVkIGZvcm0gYm9keSBjb250ZW50IChnaC0yNjU4KVxuXHRcdH0gZWxzZSBpZiAoIHMuZGF0YSAmJiBzLnByb2Nlc3NEYXRhICYmXG5cdFx0XHQoIHMuY29udGVudFR5cGUgfHwgXCJcIiApLmluZGV4T2YoIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIgKSA9PT0gMCApIHtcblx0XHRcdHMuZGF0YSA9IHMuZGF0YS5yZXBsYWNlKCByMjAsIFwiK1wiICk7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHRoZSBJZi1Nb2RpZmllZC1TaW5jZSBhbmQvb3IgSWYtTm9uZS1NYXRjaCBoZWFkZXIsIGlmIGluIGlmTW9kaWZpZWQgbW9kZS5cblx0XHRpZiAoIHMuaWZNb2RpZmllZCApIHtcblx0XHRcdGlmICggalF1ZXJ5Lmxhc3RNb2RpZmllZFsgY2FjaGVVUkwgXSApIHtcblx0XHRcdFx0anFYSFIuc2V0UmVxdWVzdEhlYWRlciggXCJJZi1Nb2RpZmllZC1TaW5jZVwiLCBqUXVlcnkubGFzdE1vZGlmaWVkWyBjYWNoZVVSTCBdICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGpRdWVyeS5ldGFnWyBjYWNoZVVSTCBdICkge1xuXHRcdFx0XHRqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBcIklmLU5vbmUtTWF0Y2hcIiwgalF1ZXJ5LmV0YWdbIGNhY2hlVVJMIF0gKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBTZXQgdGhlIGNvcnJlY3QgaGVhZGVyLCBpZiBkYXRhIGlzIGJlaW5nIHNlbnRcblx0XHRpZiAoIHMuZGF0YSAmJiBzLmhhc0NvbnRlbnQgJiYgcy5jb250ZW50VHlwZSAhPT0gZmFsc2UgfHwgb3B0aW9ucy5jb250ZW50VHlwZSApIHtcblx0XHRcdGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoIFwiQ29udGVudC1UeXBlXCIsIHMuY29udGVudFR5cGUgKTtcblx0XHR9XG5cblx0XHQvLyBTZXQgdGhlIEFjY2VwdHMgaGVhZGVyIGZvciB0aGUgc2VydmVyLCBkZXBlbmRpbmcgb24gdGhlIGRhdGFUeXBlXG5cdFx0anFYSFIuc2V0UmVxdWVzdEhlYWRlcihcblx0XHRcdFwiQWNjZXB0XCIsXG5cdFx0XHRzLmRhdGFUeXBlc1sgMCBdICYmIHMuYWNjZXB0c1sgcy5kYXRhVHlwZXNbIDAgXSBdID9cblx0XHRcdFx0cy5hY2NlcHRzWyBzLmRhdGFUeXBlc1sgMCBdIF0gK1xuXHRcdFx0XHRcdCggcy5kYXRhVHlwZXNbIDAgXSAhPT0gXCIqXCIgPyBcIiwgXCIgKyBhbGxUeXBlcyArIFwiOyBxPTAuMDFcIiA6IFwiXCIgKSA6XG5cdFx0XHRcdHMuYWNjZXB0c1sgXCIqXCIgXVxuXHRcdCk7XG5cblx0XHQvLyBDaGVjayBmb3IgaGVhZGVycyBvcHRpb25cblx0XHRmb3IgKCBpIGluIHMuaGVhZGVycyApIHtcblx0XHRcdGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoIGksIHMuaGVhZGVyc1sgaSBdICk7XG5cdFx0fVxuXG5cdFx0Ly8gQWxsb3cgY3VzdG9tIGhlYWRlcnMvbWltZXR5cGVzIGFuZCBlYXJseSBhYm9ydFxuXHRcdGlmICggcy5iZWZvcmVTZW5kICYmXG5cdFx0XHQoIHMuYmVmb3JlU2VuZC5jYWxsKCBjYWxsYmFja0NvbnRleHQsIGpxWEhSLCBzICkgPT09IGZhbHNlIHx8IGNvbXBsZXRlZCApICkge1xuXG5cdFx0XHQvLyBBYm9ydCBpZiBub3QgZG9uZSBhbHJlYWR5IGFuZCByZXR1cm5cblx0XHRcdHJldHVybiBqcVhIUi5hYm9ydCgpO1xuXHRcdH1cblxuXHRcdC8vIEFib3J0aW5nIGlzIG5vIGxvbmdlciBhIGNhbmNlbGxhdGlvblxuXHRcdHN0ckFib3J0ID0gXCJhYm9ydFwiO1xuXG5cdFx0Ly8gSW5zdGFsbCBjYWxsYmFja3Mgb24gZGVmZXJyZWRzXG5cdFx0Y29tcGxldGVEZWZlcnJlZC5hZGQoIHMuY29tcGxldGUgKTtcblx0XHRqcVhIUi5kb25lKCBzLnN1Y2Nlc3MgKTtcblx0XHRqcVhIUi5mYWlsKCBzLmVycm9yICk7XG5cblx0XHQvLyBHZXQgdHJhbnNwb3J0XG5cdFx0dHJhbnNwb3J0ID0gaW5zcGVjdFByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHRyYW5zcG9ydHMsIHMsIG9wdGlvbnMsIGpxWEhSICk7XG5cblx0XHQvLyBJZiBubyB0cmFuc3BvcnQsIHdlIGF1dG8tYWJvcnRcblx0XHRpZiAoICF0cmFuc3BvcnQgKSB7XG5cdFx0XHRkb25lKCAtMSwgXCJObyBUcmFuc3BvcnRcIiApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRqcVhIUi5yZWFkeVN0YXRlID0gMTtcblxuXHRcdFx0Ly8gU2VuZCBnbG9iYWwgZXZlbnRcblx0XHRcdGlmICggZmlyZUdsb2JhbHMgKSB7XG5cdFx0XHRcdGdsb2JhbEV2ZW50Q29udGV4dC50cmlnZ2VyKCBcImFqYXhTZW5kXCIsIFsganFYSFIsIHMgXSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiByZXF1ZXN0IHdhcyBhYm9ydGVkIGluc2lkZSBhamF4U2VuZCwgc3RvcCB0aGVyZVxuXHRcdFx0aWYgKCBjb21wbGV0ZWQgKSB7XG5cdFx0XHRcdHJldHVybiBqcVhIUjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVGltZW91dFxuXHRcdFx0aWYgKCBzLmFzeW5jICYmIHMudGltZW91dCA+IDAgKSB7XG5cdFx0XHRcdHRpbWVvdXRUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRqcVhIUi5hYm9ydCggXCJ0aW1lb3V0XCIgKTtcblx0XHRcdFx0fSwgcy50aW1lb3V0ICk7XG5cdFx0XHR9XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbXBsZXRlZCA9IGZhbHNlO1xuXHRcdFx0XHR0cmFuc3BvcnQuc2VuZCggcmVxdWVzdEhlYWRlcnMsIGRvbmUgKTtcblx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXG5cdFx0XHRcdC8vIFJldGhyb3cgcG9zdC1jb21wbGV0aW9uIGV4Y2VwdGlvbnNcblx0XHRcdFx0aWYgKCBjb21wbGV0ZWQgKSB7XG5cdFx0XHRcdFx0dGhyb3cgZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFByb3BhZ2F0ZSBvdGhlcnMgYXMgcmVzdWx0c1xuXHRcdFx0XHRkb25lKCAtMSwgZSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENhbGxiYWNrIGZvciB3aGVuIGV2ZXJ5dGhpbmcgaXMgZG9uZVxuXHRcdGZ1bmN0aW9uIGRvbmUoIHN0YXR1cywgbmF0aXZlU3RhdHVzVGV4dCwgcmVzcG9uc2VzLCBoZWFkZXJzICkge1xuXHRcdFx0dmFyIGlzU3VjY2Vzcywgc3VjY2VzcywgZXJyb3IsIHJlc3BvbnNlLCBtb2RpZmllZCxcblx0XHRcdFx0c3RhdHVzVGV4dCA9IG5hdGl2ZVN0YXR1c1RleHQ7XG5cblx0XHRcdC8vIElnbm9yZSByZXBlYXQgaW52b2NhdGlvbnNcblx0XHRcdGlmICggY29tcGxldGVkICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGNvbXBsZXRlZCA9IHRydWU7XG5cblx0XHRcdC8vIENsZWFyIHRpbWVvdXQgaWYgaXQgZXhpc3RzXG5cdFx0XHRpZiAoIHRpbWVvdXRUaW1lciApIHtcblx0XHRcdFx0d2luZG93LmNsZWFyVGltZW91dCggdGltZW91dFRpbWVyICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIERlcmVmZXJlbmNlIHRyYW5zcG9ydCBmb3IgZWFybHkgZ2FyYmFnZSBjb2xsZWN0aW9uXG5cdFx0XHQvLyAobm8gbWF0dGVyIGhvdyBsb25nIHRoZSBqcVhIUiBvYmplY3Qgd2lsbCBiZSB1c2VkKVxuXHRcdFx0dHJhbnNwb3J0ID0gdW5kZWZpbmVkO1xuXG5cdFx0XHQvLyBDYWNoZSByZXNwb25zZSBoZWFkZXJzXG5cdFx0XHRyZXNwb25zZUhlYWRlcnNTdHJpbmcgPSBoZWFkZXJzIHx8IFwiXCI7XG5cblx0XHRcdC8vIFNldCByZWFkeVN0YXRlXG5cdFx0XHRqcVhIUi5yZWFkeVN0YXRlID0gc3RhdHVzID4gMCA/IDQgOiAwO1xuXG5cdFx0XHQvLyBEZXRlcm1pbmUgaWYgc3VjY2Vzc2Z1bFxuXHRcdFx0aXNTdWNjZXNzID0gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDAgfHwgc3RhdHVzID09PSAzMDQ7XG5cblx0XHRcdC8vIEdldCByZXNwb25zZSBkYXRhXG5cdFx0XHRpZiAoIHJlc3BvbnNlcyApIHtcblx0XHRcdFx0cmVzcG9uc2UgPSBhamF4SGFuZGxlUmVzcG9uc2VzKCBzLCBqcVhIUiwgcmVzcG9uc2VzICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbnZlcnQgbm8gbWF0dGVyIHdoYXQgKHRoYXQgd2F5IHJlc3BvbnNlWFhYIGZpZWxkcyBhcmUgYWx3YXlzIHNldClcblx0XHRcdHJlc3BvbnNlID0gYWpheENvbnZlcnQoIHMsIHJlc3BvbnNlLCBqcVhIUiwgaXNTdWNjZXNzICk7XG5cblx0XHRcdC8vIElmIHN1Y2Nlc3NmdWwsIGhhbmRsZSB0eXBlIGNoYWluaW5nXG5cdFx0XHRpZiAoIGlzU3VjY2VzcyApIHtcblxuXHRcdFx0XHQvLyBTZXQgdGhlIElmLU1vZGlmaWVkLVNpbmNlIGFuZC9vciBJZi1Ob25lLU1hdGNoIGhlYWRlciwgaWYgaW4gaWZNb2RpZmllZCBtb2RlLlxuXHRcdFx0XHRpZiAoIHMuaWZNb2RpZmllZCApIHtcblx0XHRcdFx0XHRtb2RpZmllZCA9IGpxWEhSLmdldFJlc3BvbnNlSGVhZGVyKCBcIkxhc3QtTW9kaWZpZWRcIiApO1xuXHRcdFx0XHRcdGlmICggbW9kaWZpZWQgKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkubGFzdE1vZGlmaWVkWyBjYWNoZVVSTCBdID0gbW9kaWZpZWQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG1vZGlmaWVkID0ganFYSFIuZ2V0UmVzcG9uc2VIZWFkZXIoIFwiZXRhZ1wiICk7XG5cdFx0XHRcdFx0aWYgKCBtb2RpZmllZCApIHtcblx0XHRcdFx0XHRcdGpRdWVyeS5ldGFnWyBjYWNoZVVSTCBdID0gbW9kaWZpZWQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gaWYgbm8gY29udGVudFxuXHRcdFx0XHRpZiAoIHN0YXR1cyA9PT0gMjA0IHx8IHMudHlwZSA9PT0gXCJIRUFEXCIgKSB7XG5cdFx0XHRcdFx0c3RhdHVzVGV4dCA9IFwibm9jb250ZW50XCI7XG5cblx0XHRcdFx0Ly8gaWYgbm90IG1vZGlmaWVkXG5cdFx0XHRcdH0gZWxzZSBpZiAoIHN0YXR1cyA9PT0gMzA0ICkge1xuXHRcdFx0XHRcdHN0YXR1c1RleHQgPSBcIm5vdG1vZGlmaWVkXCI7XG5cblx0XHRcdFx0Ly8gSWYgd2UgaGF2ZSBkYXRhLCBsZXQncyBjb252ZXJ0IGl0XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXRlO1xuXHRcdFx0XHRcdHN1Y2Nlc3MgPSByZXNwb25zZS5kYXRhO1xuXHRcdFx0XHRcdGVycm9yID0gcmVzcG9uc2UuZXJyb3I7XG5cdFx0XHRcdFx0aXNTdWNjZXNzID0gIWVycm9yO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIEV4dHJhY3QgZXJyb3IgZnJvbSBzdGF0dXNUZXh0IGFuZCBub3JtYWxpemUgZm9yIG5vbi1hYm9ydHNcblx0XHRcdFx0ZXJyb3IgPSBzdGF0dXNUZXh0O1xuXHRcdFx0XHRpZiAoIHN0YXR1cyB8fCAhc3RhdHVzVGV4dCApIHtcblx0XHRcdFx0XHRzdGF0dXNUZXh0ID0gXCJlcnJvclwiO1xuXHRcdFx0XHRcdGlmICggc3RhdHVzIDwgMCApIHtcblx0XHRcdFx0XHRcdHN0YXR1cyA9IDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNldCBkYXRhIGZvciB0aGUgZmFrZSB4aHIgb2JqZWN0XG5cdFx0XHRqcVhIUi5zdGF0dXMgPSBzdGF0dXM7XG5cdFx0XHRqcVhIUi5zdGF0dXNUZXh0ID0gKCBuYXRpdmVTdGF0dXNUZXh0IHx8IHN0YXR1c1RleHQgKSArIFwiXCI7XG5cblx0XHRcdC8vIFN1Y2Nlc3MvRXJyb3Jcblx0XHRcdGlmICggaXNTdWNjZXNzICkge1xuXHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlV2l0aCggY2FsbGJhY2tDb250ZXh0LCBbIHN1Y2Nlc3MsIHN0YXR1c1RleHQsIGpxWEhSIF0gKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlZmVycmVkLnJlamVjdFdpdGgoIGNhbGxiYWNrQ29udGV4dCwgWyBqcVhIUiwgc3RhdHVzVGV4dCwgZXJyb3IgXSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdGF0dXMtZGVwZW5kZW50IGNhbGxiYWNrc1xuXHRcdFx0anFYSFIuc3RhdHVzQ29kZSggc3RhdHVzQ29kZSApO1xuXHRcdFx0c3RhdHVzQ29kZSA9IHVuZGVmaW5lZDtcblxuXHRcdFx0aWYgKCBmaXJlR2xvYmFscyApIHtcblx0XHRcdFx0Z2xvYmFsRXZlbnRDb250ZXh0LnRyaWdnZXIoIGlzU3VjY2VzcyA/IFwiYWpheFN1Y2Nlc3NcIiA6IFwiYWpheEVycm9yXCIsXG5cdFx0XHRcdFx0WyBqcVhIUiwgcywgaXNTdWNjZXNzID8gc3VjY2VzcyA6IGVycm9yIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ29tcGxldGVcblx0XHRcdGNvbXBsZXRlRGVmZXJyZWQuZmlyZVdpdGgoIGNhbGxiYWNrQ29udGV4dCwgWyBqcVhIUiwgc3RhdHVzVGV4dCBdICk7XG5cblx0XHRcdGlmICggZmlyZUdsb2JhbHMgKSB7XG5cdFx0XHRcdGdsb2JhbEV2ZW50Q29udGV4dC50cmlnZ2VyKCBcImFqYXhDb21wbGV0ZVwiLCBbIGpxWEhSLCBzIF0gKTtcblxuXHRcdFx0XHQvLyBIYW5kbGUgdGhlIGdsb2JhbCBBSkFYIGNvdW50ZXJcblx0XHRcdFx0aWYgKCAhKCAtLWpRdWVyeS5hY3RpdmUgKSApIHtcblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlciggXCJhamF4U3RvcFwiICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4ganFYSFI7XG5cdH0sXG5cblx0Z2V0SlNPTjogZnVuY3Rpb24oIHVybCwgZGF0YSwgY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5nZXQoIHVybCwgZGF0YSwgY2FsbGJhY2ssIFwianNvblwiICk7XG5cdH0sXG5cblx0Z2V0U2NyaXB0OiBmdW5jdGlvbiggdXJsLCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdldCggdXJsLCB1bmRlZmluZWQsIGNhbGxiYWNrLCBcInNjcmlwdFwiICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmVhY2goIFsgXCJnZXRcIiwgXCJwb3N0XCIgXSwgZnVuY3Rpb24oIGksIG1ldGhvZCApIHtcblx0alF1ZXJ5WyBtZXRob2QgXSA9IGZ1bmN0aW9uKCB1cmwsIGRhdGEsIGNhbGxiYWNrLCB0eXBlICkge1xuXG5cdFx0Ly8gU2hpZnQgYXJndW1lbnRzIGlmIGRhdGEgYXJndW1lbnQgd2FzIG9taXR0ZWRcblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBkYXRhICkgKSB7XG5cdFx0XHR0eXBlID0gdHlwZSB8fCBjYWxsYmFjaztcblx0XHRcdGNhbGxiYWNrID0gZGF0YTtcblx0XHRcdGRhdGEgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0Ly8gVGhlIHVybCBjYW4gYmUgYW4gb3B0aW9ucyBvYmplY3QgKHdoaWNoIHRoZW4gbXVzdCBoYXZlIC51cmwpXG5cdFx0cmV0dXJuIGpRdWVyeS5hamF4KCBqUXVlcnkuZXh0ZW5kKCB7XG5cdFx0XHR1cmw6IHVybCxcblx0XHRcdHR5cGU6IG1ldGhvZCxcblx0XHRcdGRhdGFUeXBlOiB0eXBlLFxuXHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdHN1Y2Nlc3M6IGNhbGxiYWNrXG5cdFx0fSwgalF1ZXJ5LmlzUGxhaW5PYmplY3QoIHVybCApICYmIHVybCApICk7XG5cdH07XG59ICk7XG5cblxualF1ZXJ5Ll9ldmFsVXJsID0gZnVuY3Rpb24oIHVybCApIHtcblx0cmV0dXJuIGpRdWVyeS5hamF4KCB7XG5cdFx0dXJsOiB1cmwsXG5cblx0XHQvLyBNYWtlIHRoaXMgZXhwbGljaXQsIHNpbmNlIHVzZXIgY2FuIG92ZXJyaWRlIHRoaXMgdGhyb3VnaCBhamF4U2V0dXAgKCMxMTI2NClcblx0XHR0eXBlOiBcIkdFVFwiLFxuXHRcdGRhdGFUeXBlOiBcInNjcmlwdFwiLFxuXHRcdGNhY2hlOiB0cnVlLFxuXHRcdGFzeW5jOiBmYWxzZSxcblx0XHRnbG9iYWw6IGZhbHNlLFxuXHRcdFwidGhyb3dzXCI6IHRydWVcblx0fSApO1xufTtcblxuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdHdyYXBBbGw6IGZ1bmN0aW9uKCBodG1sICkge1xuXHRcdHZhciB3cmFwO1xuXG5cdFx0aWYgKCB0aGlzWyAwIF0gKSB7XG5cdFx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBodG1sICkgKSB7XG5cdFx0XHRcdGh0bWwgPSBodG1sLmNhbGwoIHRoaXNbIDAgXSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBUaGUgZWxlbWVudHMgdG8gd3JhcCB0aGUgdGFyZ2V0IGFyb3VuZFxuXHRcdFx0d3JhcCA9IGpRdWVyeSggaHRtbCwgdGhpc1sgMCBdLm93bmVyRG9jdW1lbnQgKS5lcSggMCApLmNsb25lKCB0cnVlICk7XG5cblx0XHRcdGlmICggdGhpc1sgMCBdLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHdyYXAuaW5zZXJ0QmVmb3JlKCB0aGlzWyAwIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0d3JhcC5tYXAoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgZWxlbSA9IHRoaXM7XG5cblx0XHRcdFx0d2hpbGUgKCBlbGVtLmZpcnN0RWxlbWVudENoaWxkICkge1xuXHRcdFx0XHRcdGVsZW0gPSBlbGVtLmZpcnN0RWxlbWVudENoaWxkO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGVsZW07XG5cdFx0XHR9ICkuYXBwZW5kKCB0aGlzICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0d3JhcElubmVyOiBmdW5jdGlvbiggaHRtbCApIHtcblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBodG1sICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkud3JhcElubmVyKCBodG1sLmNhbGwoIHRoaXMsIGkgKSApO1xuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHNlbGYgPSBqUXVlcnkoIHRoaXMgKSxcblx0XHRcdFx0Y29udGVudHMgPSBzZWxmLmNvbnRlbnRzKCk7XG5cblx0XHRcdGlmICggY29udGVudHMubGVuZ3RoICkge1xuXHRcdFx0XHRjb250ZW50cy53cmFwQWxsKCBodG1sICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNlbGYuYXBwZW5kKCBodG1sICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdHdyYXA6IGZ1bmN0aW9uKCBodG1sICkge1xuXHRcdHZhciBpc0Z1bmN0aW9uID0galF1ZXJ5LmlzRnVuY3Rpb24oIGh0bWwgKTtcblxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0alF1ZXJ5KCB0aGlzICkud3JhcEFsbCggaXNGdW5jdGlvbiA/IGh0bWwuY2FsbCggdGhpcywgaSApIDogaHRtbCApO1xuXHRcdH0gKTtcblx0fSxcblxuXHR1bndyYXA6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHR0aGlzLnBhcmVudCggc2VsZWN0b3IgKS5ub3QoIFwiYm9keVwiICkuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkoIHRoaXMgKS5yZXBsYWNlV2l0aCggdGhpcy5jaGlsZE5vZGVzICk7XG5cdFx0fSApO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59ICk7XG5cblxualF1ZXJ5LmV4cHIucHNldWRvcy5oaWRkZW4gPSBmdW5jdGlvbiggZWxlbSApIHtcblx0cmV0dXJuICFqUXVlcnkuZXhwci5wc2V1ZG9zLnZpc2libGUoIGVsZW0gKTtcbn07XG5qUXVlcnkuZXhwci5wc2V1ZG9zLnZpc2libGUgPSBmdW5jdGlvbiggZWxlbSApIHtcblx0cmV0dXJuICEhKCBlbGVtLm9mZnNldFdpZHRoIHx8IGVsZW0ub2Zmc2V0SGVpZ2h0IHx8IGVsZW0uZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggKTtcbn07XG5cblxuXG5cbmpRdWVyeS5hamF4U2V0dGluZ3MueGhyID0gZnVuY3Rpb24oKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKTtcblx0fSBjYXRjaCAoIGUgKSB7fVxufTtcblxudmFyIHhoclN1Y2Nlc3NTdGF0dXMgPSB7XG5cblx0XHQvLyBGaWxlIHByb3RvY29sIGFsd2F5cyB5aWVsZHMgc3RhdHVzIGNvZGUgMCwgYXNzdW1lIDIwMFxuXHRcdDA6IDIwMCxcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG5cdFx0Ly8gIzE0NTA6IHNvbWV0aW1lcyBJRSByZXR1cm5zIDEyMjMgd2hlbiBpdCBzaG91bGQgYmUgMjA0XG5cdFx0MTIyMzogMjA0XG5cdH0sXG5cdHhoclN1cHBvcnRlZCA9IGpRdWVyeS5hamF4U2V0dGluZ3MueGhyKCk7XG5cbnN1cHBvcnQuY29ycyA9ICEheGhyU3VwcG9ydGVkICYmICggXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiB4aHJTdXBwb3J0ZWQgKTtcbnN1cHBvcnQuYWpheCA9IHhoclN1cHBvcnRlZCA9ICEheGhyU3VwcG9ydGVkO1xuXG5qUXVlcnkuYWpheFRyYW5zcG9ydCggZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cdHZhciBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaztcblxuXHQvLyBDcm9zcyBkb21haW4gb25seSBhbGxvd2VkIGlmIHN1cHBvcnRlZCB0aHJvdWdoIFhNTEh0dHBSZXF1ZXN0XG5cdGlmICggc3VwcG9ydC5jb3JzIHx8IHhoclN1cHBvcnRlZCAmJiAhb3B0aW9ucy5jcm9zc0RvbWFpbiApIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c2VuZDogZnVuY3Rpb24oIGhlYWRlcnMsIGNvbXBsZXRlICkge1xuXHRcdFx0XHR2YXIgaSxcblx0XHRcdFx0XHR4aHIgPSBvcHRpb25zLnhocigpO1xuXG5cdFx0XHRcdHhoci5vcGVuKFxuXHRcdFx0XHRcdG9wdGlvbnMudHlwZSxcblx0XHRcdFx0XHRvcHRpb25zLnVybCxcblx0XHRcdFx0XHRvcHRpb25zLmFzeW5jLFxuXHRcdFx0XHRcdG9wdGlvbnMudXNlcm5hbWUsXG5cdFx0XHRcdFx0b3B0aW9ucy5wYXNzd29yZFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdC8vIEFwcGx5IGN1c3RvbSBmaWVsZHMgaWYgcHJvdmlkZWRcblx0XHRcdFx0aWYgKCBvcHRpb25zLnhockZpZWxkcyApIHtcblx0XHRcdFx0XHRmb3IgKCBpIGluIG9wdGlvbnMueGhyRmllbGRzICkge1xuXHRcdFx0XHRcdFx0eGhyWyBpIF0gPSBvcHRpb25zLnhockZpZWxkc1sgaSBdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIE92ZXJyaWRlIG1pbWUgdHlwZSBpZiBuZWVkZWRcblx0XHRcdFx0aWYgKCBvcHRpb25zLm1pbWVUeXBlICYmIHhoci5vdmVycmlkZU1pbWVUeXBlICkge1xuXHRcdFx0XHRcdHhoci5vdmVycmlkZU1pbWVUeXBlKCBvcHRpb25zLm1pbWVUeXBlICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBYLVJlcXVlc3RlZC1XaXRoIGhlYWRlclxuXHRcdFx0XHQvLyBGb3IgY3Jvc3MtZG9tYWluIHJlcXVlc3RzLCBzZWVpbmcgYXMgY29uZGl0aW9ucyBmb3IgYSBwcmVmbGlnaHQgYXJlXG5cdFx0XHRcdC8vIGFraW4gdG8gYSBqaWdzYXcgcHV6emxlLCB3ZSBzaW1wbHkgbmV2ZXIgc2V0IGl0IHRvIGJlIHN1cmUuXG5cdFx0XHRcdC8vIChpdCBjYW4gYWx3YXlzIGJlIHNldCBvbiBhIHBlci1yZXF1ZXN0IGJhc2lzIG9yIGV2ZW4gdXNpbmcgYWpheFNldHVwKVxuXHRcdFx0XHQvLyBGb3Igc2FtZS1kb21haW4gcmVxdWVzdHMsIHdvbid0IGNoYW5nZSBoZWFkZXIgaWYgYWxyZWFkeSBwcm92aWRlZC5cblx0XHRcdFx0aWYgKCAhb3B0aW9ucy5jcm9zc0RvbWFpbiAmJiAhaGVhZGVyc1sgXCJYLVJlcXVlc3RlZC1XaXRoXCIgXSApIHtcblx0XHRcdFx0XHRoZWFkZXJzWyBcIlgtUmVxdWVzdGVkLVdpdGhcIiBdID0gXCJYTUxIdHRwUmVxdWVzdFwiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gU2V0IGhlYWRlcnNcblx0XHRcdFx0Zm9yICggaSBpbiBoZWFkZXJzICkge1xuXHRcdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCBpLCBoZWFkZXJzWyBpIF0gKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIENhbGxiYWNrXG5cdFx0XHRcdGNhbGxiYWNrID0gZnVuY3Rpb24oIHR5cGUgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0aWYgKCBjYWxsYmFjayApIHtcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2sgPSBlcnJvckNhbGxiYWNrID0geGhyLm9ubG9hZCA9XG5cdFx0XHRcdFx0XHRcdFx0eGhyLm9uZXJyb3IgPSB4aHIub25hYm9ydCA9IHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuXG5cdFx0XHRcdFx0XHRcdGlmICggdHlwZSA9PT0gXCJhYm9ydFwiICkge1xuXHRcdFx0XHRcdFx0XHRcdHhoci5hYm9ydCgpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCB0eXBlID09PSBcImVycm9yXCIgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuXHRcdFx0XHRcdFx0XHRcdC8vIE9uIGEgbWFudWFsIG5hdGl2ZSBhYm9ydCwgSUU5IHRocm93c1xuXHRcdFx0XHRcdFx0XHRcdC8vIGVycm9ycyBvbiBhbnkgcHJvcGVydHkgYWNjZXNzIHRoYXQgaXMgbm90IHJlYWR5U3RhdGVcblx0XHRcdFx0XHRcdFx0XHRpZiAoIHR5cGVvZiB4aHIuc3RhdHVzICE9PSBcIm51bWJlclwiICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29tcGxldGUoIDAsIFwiZXJyb3JcIiApO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb21wbGV0ZShcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBGaWxlOiBwcm90b2NvbCBhbHdheXMgeWllbGRzIHN0YXR1cyAwOyBzZWUgIzg2MDUsICMxNDIwN1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR4aHIuc3RhdHVzLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR4aHIuc3RhdHVzVGV4dFxuXHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29tcGxldGUoXG5cdFx0XHRcdFx0XHRcdFx0XHR4aHJTdWNjZXNzU3RhdHVzWyB4aHIuc3RhdHVzIF0gfHwgeGhyLnN0YXR1cyxcblx0XHRcdFx0XHRcdFx0XHRcdHhoci5zdGF0dXNUZXh0LFxuXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gSUU5IGhhcyBubyBYSFIyIGJ1dCB0aHJvd3Mgb24gYmluYXJ5ICh0cmFjLTExNDI2KVxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gRm9yIFhIUjIgbm9uLXRleHQsIGxldCB0aGUgY2FsbGVyIGhhbmRsZSBpdCAoZ2gtMjQ5OClcblx0XHRcdFx0XHRcdFx0XHRcdCggeGhyLnJlc3BvbnNlVHlwZSB8fCBcInRleHRcIiApICE9PSBcInRleHRcIiAgfHxcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGVvZiB4aHIucmVzcG9uc2VUZXh0ICE9PSBcInN0cmluZ1wiID9cblx0XHRcdFx0XHRcdFx0XHRcdFx0eyBiaW5hcnk6IHhoci5yZXNwb25zZSB9IDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0eyB0ZXh0OiB4aHIucmVzcG9uc2VUZXh0IH0sXG5cdFx0XHRcdFx0XHRcdFx0XHR4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKClcblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQvLyBMaXN0ZW4gdG8gZXZlbnRzXG5cdFx0XHRcdHhoci5vbmxvYWQgPSBjYWxsYmFjaygpO1xuXHRcdFx0XHRlcnJvckNhbGxiYWNrID0geGhyLm9uZXJyb3IgPSBjYWxsYmFjayggXCJlcnJvclwiICk7XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgOSBvbmx5XG5cdFx0XHRcdC8vIFVzZSBvbnJlYWR5c3RhdGVjaGFuZ2UgdG8gcmVwbGFjZSBvbmFib3J0XG5cdFx0XHRcdC8vIHRvIGhhbmRsZSB1bmNhdWdodCBhYm9ydHNcblx0XHRcdFx0aWYgKCB4aHIub25hYm9ydCAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHhoci5vbmFib3J0ID0gZXJyb3JDYWxsYmFjaztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdC8vIENoZWNrIHJlYWR5U3RhdGUgYmVmb3JlIHRpbWVvdXQgYXMgaXQgY2hhbmdlc1xuXHRcdFx0XHRcdFx0aWYgKCB4aHIucmVhZHlTdGF0ZSA9PT0gNCApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBBbGxvdyBvbmVycm9yIHRvIGJlIGNhbGxlZCBmaXJzdCxcblx0XHRcdFx0XHRcdFx0Ly8gYnV0IHRoYXQgd2lsbCBub3QgaGFuZGxlIGEgbmF0aXZlIGFib3J0XG5cdFx0XHRcdFx0XHRcdC8vIEFsc28sIHNhdmUgZXJyb3JDYWxsYmFjayB0byBhIHZhcmlhYmxlXG5cdFx0XHRcdFx0XHRcdC8vIGFzIHhoci5vbmVycm9yIGNhbm5vdCBiZSBhY2Nlc3NlZFxuXHRcdFx0XHRcdFx0XHR3aW5kb3cuc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBjYWxsYmFjayApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGVycm9yQ2FsbGJhY2soKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQ3JlYXRlIHRoZSBhYm9ydCBjYWxsYmFja1xuXHRcdFx0XHRjYWxsYmFjayA9IGNhbGxiYWNrKCBcImFib3J0XCIgKTtcblxuXHRcdFx0XHR0cnkge1xuXG5cdFx0XHRcdFx0Ly8gRG8gc2VuZCB0aGUgcmVxdWVzdCAodGhpcyBtYXkgcmFpc2UgYW4gZXhjZXB0aW9uKVxuXHRcdFx0XHRcdHhoci5zZW5kKCBvcHRpb25zLmhhc0NvbnRlbnQgJiYgb3B0aW9ucy5kYXRhIHx8IG51bGwgKTtcblx0XHRcdFx0fSBjYXRjaCAoIGUgKSB7XG5cblx0XHRcdFx0XHQvLyAjMTQ2ODM6IE9ubHkgcmV0aHJvdyBpZiB0aGlzIGhhc24ndCBiZWVuIG5vdGlmaWVkIGFzIGFuIGVycm9yIHlldFxuXHRcdFx0XHRcdGlmICggY2FsbGJhY2sgKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0YWJvcnQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIGNhbGxiYWNrICkge1xuXHRcdFx0XHRcdGNhbGxiYWNrKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHR9XG59ICk7XG5cblxuXG5cbi8vIFByZXZlbnQgYXV0by1leGVjdXRpb24gb2Ygc2NyaXB0cyB3aGVuIG5vIGV4cGxpY2l0IGRhdGFUeXBlIHdhcyBwcm92aWRlZCAoU2VlIGdoLTI0MzIpXG5qUXVlcnkuYWpheFByZWZpbHRlciggZnVuY3Rpb24oIHMgKSB7XG5cdGlmICggcy5jcm9zc0RvbWFpbiApIHtcblx0XHRzLmNvbnRlbnRzLnNjcmlwdCA9IGZhbHNlO1xuXHR9XG59ICk7XG5cbi8vIEluc3RhbGwgc2NyaXB0IGRhdGFUeXBlXG5qUXVlcnkuYWpheFNldHVwKCB7XG5cdGFjY2VwdHM6IHtcblx0XHRzY3JpcHQ6IFwidGV4dC9qYXZhc2NyaXB0LCBhcHBsaWNhdGlvbi9qYXZhc2NyaXB0LCBcIiArXG5cdFx0XHRcImFwcGxpY2F0aW9uL2VjbWFzY3JpcHQsIGFwcGxpY2F0aW9uL3gtZWNtYXNjcmlwdFwiXG5cdH0sXG5cdGNvbnRlbnRzOiB7XG5cdFx0c2NyaXB0OiAvXFxiKD86amF2YXxlY21hKXNjcmlwdFxcYi9cblx0fSxcblx0Y29udmVydGVyczoge1xuXHRcdFwidGV4dCBzY3JpcHRcIjogZnVuY3Rpb24oIHRleHQgKSB7XG5cdFx0XHRqUXVlcnkuZ2xvYmFsRXZhbCggdGV4dCApO1xuXHRcdFx0cmV0dXJuIHRleHQ7XG5cdFx0fVxuXHR9XG59ICk7XG5cbi8vIEhhbmRsZSBjYWNoZSdzIHNwZWNpYWwgY2FzZSBhbmQgY3Jvc3NEb21haW5cbmpRdWVyeS5hamF4UHJlZmlsdGVyKCBcInNjcmlwdFwiLCBmdW5jdGlvbiggcyApIHtcblx0aWYgKCBzLmNhY2hlID09PSB1bmRlZmluZWQgKSB7XG5cdFx0cy5jYWNoZSA9IGZhbHNlO1xuXHR9XG5cdGlmICggcy5jcm9zc0RvbWFpbiApIHtcblx0XHRzLnR5cGUgPSBcIkdFVFwiO1xuXHR9XG59ICk7XG5cbi8vIEJpbmQgc2NyaXB0IHRhZyBoYWNrIHRyYW5zcG9ydFxualF1ZXJ5LmFqYXhUcmFuc3BvcnQoIFwic2NyaXB0XCIsIGZ1bmN0aW9uKCBzICkge1xuXG5cdC8vIFRoaXMgdHJhbnNwb3J0IG9ubHkgZGVhbHMgd2l0aCBjcm9zcyBkb21haW4gcmVxdWVzdHNcblx0aWYgKCBzLmNyb3NzRG9tYWluICkge1xuXHRcdHZhciBzY3JpcHQsIGNhbGxiYWNrO1xuXHRcdHJldHVybiB7XG5cdFx0XHRzZW5kOiBmdW5jdGlvbiggXywgY29tcGxldGUgKSB7XG5cdFx0XHRcdHNjcmlwdCA9IGpRdWVyeSggXCI8c2NyaXB0PlwiICkucHJvcCgge1xuXHRcdFx0XHRcdGNoYXJzZXQ6IHMuc2NyaXB0Q2hhcnNldCxcblx0XHRcdFx0XHRzcmM6IHMudXJsXG5cdFx0XHRcdH0gKS5vbihcblx0XHRcdFx0XHRcImxvYWQgZXJyb3JcIixcblx0XHRcdFx0XHRjYWxsYmFjayA9IGZ1bmN0aW9uKCBldnQgKSB7XG5cdFx0XHRcdFx0XHRzY3JpcHQucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHRjYWxsYmFjayA9IG51bGw7XG5cdFx0XHRcdFx0XHRpZiAoIGV2dCApIHtcblx0XHRcdFx0XHRcdFx0Y29tcGxldGUoIGV2dC50eXBlID09PSBcImVycm9yXCIgPyA0MDQgOiAyMDAsIGV2dC50eXBlICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdC8vIFVzZSBuYXRpdmUgRE9NIG1hbmlwdWxhdGlvbiB0byBhdm9pZCBvdXIgZG9tTWFuaXAgQUpBWCB0cmlja2VyeVxuXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKCBzY3JpcHRbIDAgXSApO1xuXHRcdFx0fSxcblx0XHRcdGFib3J0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCBjYWxsYmFjayApIHtcblx0XHRcdFx0XHRjYWxsYmFjaygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufSApO1xuXG5cblxuXG52YXIgb2xkQ2FsbGJhY2tzID0gW10sXG5cdHJqc29ucCA9IC8oPSlcXD8oPz0mfCQpfFxcP1xcPy87XG5cbi8vIERlZmF1bHQganNvbnAgc2V0dGluZ3NcbmpRdWVyeS5hamF4U2V0dXAoIHtcblx0anNvbnA6IFwiY2FsbGJhY2tcIixcblx0anNvbnBDYWxsYmFjazogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGNhbGxiYWNrID0gb2xkQ2FsbGJhY2tzLnBvcCgpIHx8ICggalF1ZXJ5LmV4cGFuZG8gKyBcIl9cIiArICggbm9uY2UrKyApICk7XG5cdFx0dGhpc1sgY2FsbGJhY2sgXSA9IHRydWU7XG5cdFx0cmV0dXJuIGNhbGxiYWNrO1xuXHR9XG59ICk7XG5cbi8vIERldGVjdCwgbm9ybWFsaXplIG9wdGlvbnMgYW5kIGluc3RhbGwgY2FsbGJhY2tzIGZvciBqc29ucCByZXF1ZXN0c1xualF1ZXJ5LmFqYXhQcmVmaWx0ZXIoIFwianNvbiBqc29ucFwiLCBmdW5jdGlvbiggcywgb3JpZ2luYWxTZXR0aW5ncywganFYSFIgKSB7XG5cblx0dmFyIGNhbGxiYWNrTmFtZSwgb3ZlcndyaXR0ZW4sIHJlc3BvbnNlQ29udGFpbmVyLFxuXHRcdGpzb25Qcm9wID0gcy5qc29ucCAhPT0gZmFsc2UgJiYgKCByanNvbnAudGVzdCggcy51cmwgKSA/XG5cdFx0XHRcInVybFwiIDpcblx0XHRcdHR5cGVvZiBzLmRhdGEgPT09IFwic3RyaW5nXCIgJiZcblx0XHRcdFx0KCBzLmNvbnRlbnRUeXBlIHx8IFwiXCIgKVxuXHRcdFx0XHRcdC5pbmRleE9mKCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiICkgPT09IDAgJiZcblx0XHRcdFx0cmpzb25wLnRlc3QoIHMuZGF0YSApICYmIFwiZGF0YVwiXG5cdFx0KTtcblxuXHQvLyBIYW5kbGUgaWZmIHRoZSBleHBlY3RlZCBkYXRhIHR5cGUgaXMgXCJqc29ucFwiIG9yIHdlIGhhdmUgYSBwYXJhbWV0ZXIgdG8gc2V0XG5cdGlmICgganNvblByb3AgfHwgcy5kYXRhVHlwZXNbIDAgXSA9PT0gXCJqc29ucFwiICkge1xuXG5cdFx0Ly8gR2V0IGNhbGxiYWNrIG5hbWUsIHJlbWVtYmVyaW5nIHByZWV4aXN0aW5nIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCBpdFxuXHRcdGNhbGxiYWNrTmFtZSA9IHMuanNvbnBDYWxsYmFjayA9IGpRdWVyeS5pc0Z1bmN0aW9uKCBzLmpzb25wQ2FsbGJhY2sgKSA/XG5cdFx0XHRzLmpzb25wQ2FsbGJhY2soKSA6XG5cdFx0XHRzLmpzb25wQ2FsbGJhY2s7XG5cblx0XHQvLyBJbnNlcnQgY2FsbGJhY2sgaW50byB1cmwgb3IgZm9ybSBkYXRhXG5cdFx0aWYgKCBqc29uUHJvcCApIHtcblx0XHRcdHNbIGpzb25Qcm9wIF0gPSBzWyBqc29uUHJvcCBdLnJlcGxhY2UoIHJqc29ucCwgXCIkMVwiICsgY2FsbGJhY2tOYW1lICk7XG5cdFx0fSBlbHNlIGlmICggcy5qc29ucCAhPT0gZmFsc2UgKSB7XG5cdFx0XHRzLnVybCArPSAoIHJxdWVyeS50ZXN0KCBzLnVybCApID8gXCImXCIgOiBcIj9cIiApICsgcy5qc29ucCArIFwiPVwiICsgY2FsbGJhY2tOYW1lO1xuXHRcdH1cblxuXHRcdC8vIFVzZSBkYXRhIGNvbnZlcnRlciB0byByZXRyaWV2ZSBqc29uIGFmdGVyIHNjcmlwdCBleGVjdXRpb25cblx0XHRzLmNvbnZlcnRlcnNbIFwic2NyaXB0IGpzb25cIiBdID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoICFyZXNwb25zZUNvbnRhaW5lciApIHtcblx0XHRcdFx0alF1ZXJ5LmVycm9yKCBjYWxsYmFja05hbWUgKyBcIiB3YXMgbm90IGNhbGxlZFwiICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVzcG9uc2VDb250YWluZXJbIDAgXTtcblx0XHR9O1xuXG5cdFx0Ly8gRm9yY2UganNvbiBkYXRhVHlwZVxuXHRcdHMuZGF0YVR5cGVzWyAwIF0gPSBcImpzb25cIjtcblxuXHRcdC8vIEluc3RhbGwgY2FsbGJhY2tcblx0XHRvdmVyd3JpdHRlbiA9IHdpbmRvd1sgY2FsbGJhY2tOYW1lIF07XG5cdFx0d2luZG93WyBjYWxsYmFja05hbWUgXSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmVzcG9uc2VDb250YWluZXIgPSBhcmd1bWVudHM7XG5cdFx0fTtcblxuXHRcdC8vIENsZWFuLXVwIGZ1bmN0aW9uIChmaXJlcyBhZnRlciBjb252ZXJ0ZXJzKVxuXHRcdGpxWEhSLmFsd2F5cyggZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIElmIHByZXZpb3VzIHZhbHVlIGRpZG4ndCBleGlzdCAtIHJlbW92ZSBpdFxuXHRcdFx0aWYgKCBvdmVyd3JpdHRlbiA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRqUXVlcnkoIHdpbmRvdyApLnJlbW92ZVByb3AoIGNhbGxiYWNrTmFtZSApO1xuXG5cdFx0XHQvLyBPdGhlcndpc2UgcmVzdG9yZSBwcmVleGlzdGluZyB2YWx1ZVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0d2luZG93WyBjYWxsYmFja05hbWUgXSA9IG92ZXJ3cml0dGVuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTYXZlIGJhY2sgYXMgZnJlZVxuXHRcdFx0aWYgKCBzWyBjYWxsYmFja05hbWUgXSApIHtcblxuXHRcdFx0XHQvLyBNYWtlIHN1cmUgdGhhdCByZS11c2luZyB0aGUgb3B0aW9ucyBkb2Vzbid0IHNjcmV3IHRoaW5ncyBhcm91bmRcblx0XHRcdFx0cy5qc29ucENhbGxiYWNrID0gb3JpZ2luYWxTZXR0aW5ncy5qc29ucENhbGxiYWNrO1xuXG5cdFx0XHRcdC8vIFNhdmUgdGhlIGNhbGxiYWNrIG5hbWUgZm9yIGZ1dHVyZSB1c2Vcblx0XHRcdFx0b2xkQ2FsbGJhY2tzLnB1c2goIGNhbGxiYWNrTmFtZSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDYWxsIGlmIGl0IHdhcyBhIGZ1bmN0aW9uIGFuZCB3ZSBoYXZlIGEgcmVzcG9uc2Vcblx0XHRcdGlmICggcmVzcG9uc2VDb250YWluZXIgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIG92ZXJ3cml0dGVuICkgKSB7XG5cdFx0XHRcdG92ZXJ3cml0dGVuKCByZXNwb25zZUNvbnRhaW5lclsgMCBdICk7XG5cdFx0XHR9XG5cblx0XHRcdHJlc3BvbnNlQ29udGFpbmVyID0gb3ZlcndyaXR0ZW4gPSB1bmRlZmluZWQ7XG5cdFx0fSApO1xuXG5cdFx0Ly8gRGVsZWdhdGUgdG8gc2NyaXB0XG5cdFx0cmV0dXJuIFwic2NyaXB0XCI7XG5cdH1cbn0gKTtcblxuXG5cblxuLy8gU3VwcG9ydDogU2FmYXJpIDggb25seVxuLy8gSW4gU2FmYXJpIDggZG9jdW1lbnRzIGNyZWF0ZWQgdmlhIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudFxuLy8gY29sbGFwc2Ugc2libGluZyBmb3JtczogdGhlIHNlY29uZCBvbmUgYmVjb21lcyBhIGNoaWxkIG9mIHRoZSBmaXJzdCBvbmUuXG4vLyBCZWNhdXNlIG9mIHRoYXQsIHRoaXMgc2VjdXJpdHkgbWVhc3VyZSBoYXMgdG8gYmUgZGlzYWJsZWQgaW4gU2FmYXJpIDguXG4vLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM3MzM3XG5zdXBwb3J0LmNyZWF0ZUhUTUxEb2N1bWVudCA9ICggZnVuY3Rpb24oKSB7XG5cdHZhciBib2R5ID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCBcIlwiICkuYm9keTtcblx0Ym9keS5pbm5lckhUTUwgPSBcIjxmb3JtPjwvZm9ybT48Zm9ybT48L2Zvcm0+XCI7XG5cdHJldHVybiBib2R5LmNoaWxkTm9kZXMubGVuZ3RoID09PSAyO1xufSApKCk7XG5cblxuLy8gQXJndW1lbnQgXCJkYXRhXCIgc2hvdWxkIGJlIHN0cmluZyBvZiBodG1sXG4vLyBjb250ZXh0IChvcHRpb25hbCk6IElmIHNwZWNpZmllZCwgdGhlIGZyYWdtZW50IHdpbGwgYmUgY3JlYXRlZCBpbiB0aGlzIGNvbnRleHQsXG4vLyBkZWZhdWx0cyB0byBkb2N1bWVudFxuLy8ga2VlcFNjcmlwdHMgKG9wdGlvbmFsKTogSWYgdHJ1ZSwgd2lsbCBpbmNsdWRlIHNjcmlwdHMgcGFzc2VkIGluIHRoZSBodG1sIHN0cmluZ1xualF1ZXJ5LnBhcnNlSFRNTCA9IGZ1bmN0aW9uKCBkYXRhLCBjb250ZXh0LCBrZWVwU2NyaXB0cyApIHtcblx0aWYgKCB0eXBlb2YgZGF0YSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRyZXR1cm4gW107XG5cdH1cblx0aWYgKCB0eXBlb2YgY29udGV4dCA9PT0gXCJib29sZWFuXCIgKSB7XG5cdFx0a2VlcFNjcmlwdHMgPSBjb250ZXh0O1xuXHRcdGNvbnRleHQgPSBmYWxzZTtcblx0fVxuXG5cdHZhciBiYXNlLCBwYXJzZWQsIHNjcmlwdHM7XG5cblx0aWYgKCAhY29udGV4dCApIHtcblxuXHRcdC8vIFN0b3Agc2NyaXB0cyBvciBpbmxpbmUgZXZlbnQgaGFuZGxlcnMgZnJvbSBiZWluZyBleGVjdXRlZCBpbW1lZGlhdGVseVxuXHRcdC8vIGJ5IHVzaW5nIGRvY3VtZW50LmltcGxlbWVudGF0aW9uXG5cdFx0aWYgKCBzdXBwb3J0LmNyZWF0ZUhUTUxEb2N1bWVudCApIHtcblx0XHRcdGNvbnRleHQgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoIFwiXCIgKTtcblxuXHRcdFx0Ly8gU2V0IHRoZSBiYXNlIGhyZWYgZm9yIHRoZSBjcmVhdGVkIGRvY3VtZW50XG5cdFx0XHQvLyBzbyBhbnkgcGFyc2VkIGVsZW1lbnRzIHdpdGggVVJMc1xuXHRcdFx0Ly8gYXJlIGJhc2VkIG9uIHRoZSBkb2N1bWVudCdzIFVSTCAoZ2gtMjk2NSlcblx0XHRcdGJhc2UgPSBjb250ZXh0LmNyZWF0ZUVsZW1lbnQoIFwiYmFzZVwiICk7XG5cdFx0XHRiYXNlLmhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xuXHRcdFx0Y29udGV4dC5oZWFkLmFwcGVuZENoaWxkKCBiYXNlICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnRleHQgPSBkb2N1bWVudDtcblx0XHR9XG5cdH1cblxuXHRwYXJzZWQgPSByc2luZ2xlVGFnLmV4ZWMoIGRhdGEgKTtcblx0c2NyaXB0cyA9ICFrZWVwU2NyaXB0cyAmJiBbXTtcblxuXHQvLyBTaW5nbGUgdGFnXG5cdGlmICggcGFyc2VkICkge1xuXHRcdHJldHVybiBbIGNvbnRleHQuY3JlYXRlRWxlbWVudCggcGFyc2VkWyAxIF0gKSBdO1xuXHR9XG5cblx0cGFyc2VkID0gYnVpbGRGcmFnbWVudCggWyBkYXRhIF0sIGNvbnRleHQsIHNjcmlwdHMgKTtcblxuXHRpZiAoIHNjcmlwdHMgJiYgc2NyaXB0cy5sZW5ndGggKSB7XG5cdFx0alF1ZXJ5KCBzY3JpcHRzICkucmVtb3ZlKCk7XG5cdH1cblxuXHRyZXR1cm4galF1ZXJ5Lm1lcmdlKCBbXSwgcGFyc2VkLmNoaWxkTm9kZXMgKTtcbn07XG5cblxuLyoqXG4gKiBMb2FkIGEgdXJsIGludG8gYSBwYWdlXG4gKi9cbmpRdWVyeS5mbi5sb2FkID0gZnVuY3Rpb24oIHVybCwgcGFyYW1zLCBjYWxsYmFjayApIHtcblx0dmFyIHNlbGVjdG9yLCB0eXBlLCByZXNwb25zZSxcblx0XHRzZWxmID0gdGhpcyxcblx0XHRvZmYgPSB1cmwuaW5kZXhPZiggXCIgXCIgKTtcblxuXHRpZiAoIG9mZiA+IC0xICkge1xuXHRcdHNlbGVjdG9yID0gc3RyaXBBbmRDb2xsYXBzZSggdXJsLnNsaWNlKCBvZmYgKSApO1xuXHRcdHVybCA9IHVybC5zbGljZSggMCwgb2ZmICk7XG5cdH1cblxuXHQvLyBJZiBpdCdzIGEgZnVuY3Rpb25cblx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggcGFyYW1zICkgKSB7XG5cblx0XHQvLyBXZSBhc3N1bWUgdGhhdCBpdCdzIHRoZSBjYWxsYmFja1xuXHRcdGNhbGxiYWNrID0gcGFyYW1zO1xuXHRcdHBhcmFtcyA9IHVuZGVmaW5lZDtcblxuXHQvLyBPdGhlcndpc2UsIGJ1aWxkIGEgcGFyYW0gc3RyaW5nXG5cdH0gZWxzZSBpZiAoIHBhcmFtcyAmJiB0eXBlb2YgcGFyYW1zID09PSBcIm9iamVjdFwiICkge1xuXHRcdHR5cGUgPSBcIlBPU1RcIjtcblx0fVxuXG5cdC8vIElmIHdlIGhhdmUgZWxlbWVudHMgdG8gbW9kaWZ5LCBtYWtlIHRoZSByZXF1ZXN0XG5cdGlmICggc2VsZi5sZW5ndGggPiAwICkge1xuXHRcdGpRdWVyeS5hamF4KCB7XG5cdFx0XHR1cmw6IHVybCxcblxuXHRcdFx0Ly8gSWYgXCJ0eXBlXCIgdmFyaWFibGUgaXMgdW5kZWZpbmVkLCB0aGVuIFwiR0VUXCIgbWV0aG9kIHdpbGwgYmUgdXNlZC5cblx0XHRcdC8vIE1ha2UgdmFsdWUgb2YgdGhpcyBmaWVsZCBleHBsaWNpdCBzaW5jZVxuXHRcdFx0Ly8gdXNlciBjYW4gb3ZlcnJpZGUgaXQgdGhyb3VnaCBhamF4U2V0dXAgbWV0aG9kXG5cdFx0XHR0eXBlOiB0eXBlIHx8IFwiR0VUXCIsXG5cdFx0XHRkYXRhVHlwZTogXCJodG1sXCIsXG5cdFx0XHRkYXRhOiBwYXJhbXNcblx0XHR9ICkuZG9uZSggZnVuY3Rpb24oIHJlc3BvbnNlVGV4dCApIHtcblxuXHRcdFx0Ly8gU2F2ZSByZXNwb25zZSBmb3IgdXNlIGluIGNvbXBsZXRlIGNhbGxiYWNrXG5cdFx0XHRyZXNwb25zZSA9IGFyZ3VtZW50cztcblxuXHRcdFx0c2VsZi5odG1sKCBzZWxlY3RvciA/XG5cblx0XHRcdFx0Ly8gSWYgYSBzZWxlY3RvciB3YXMgc3BlY2lmaWVkLCBsb2NhdGUgdGhlIHJpZ2h0IGVsZW1lbnRzIGluIGEgZHVtbXkgZGl2XG5cdFx0XHRcdC8vIEV4Y2x1ZGUgc2NyaXB0cyB0byBhdm9pZCBJRSAnUGVybWlzc2lvbiBEZW5pZWQnIGVycm9yc1xuXHRcdFx0XHRqUXVlcnkoIFwiPGRpdj5cIiApLmFwcGVuZCggalF1ZXJ5LnBhcnNlSFRNTCggcmVzcG9uc2VUZXh0ICkgKS5maW5kKCBzZWxlY3RvciApIDpcblxuXHRcdFx0XHQvLyBPdGhlcndpc2UgdXNlIHRoZSBmdWxsIHJlc3VsdFxuXHRcdFx0XHRyZXNwb25zZVRleHQgKTtcblxuXHRcdC8vIElmIHRoZSByZXF1ZXN0IHN1Y2NlZWRzLCB0aGlzIGZ1bmN0aW9uIGdldHMgXCJkYXRhXCIsIFwic3RhdHVzXCIsIFwianFYSFJcIlxuXHRcdC8vIGJ1dCB0aGV5IGFyZSBpZ25vcmVkIGJlY2F1c2UgcmVzcG9uc2Ugd2FzIHNldCBhYm92ZS5cblx0XHQvLyBJZiBpdCBmYWlscywgdGhpcyBmdW5jdGlvbiBnZXRzIFwianFYSFJcIiwgXCJzdGF0dXNcIiwgXCJlcnJvclwiXG5cdFx0fSApLmFsd2F5cyggY2FsbGJhY2sgJiYgZnVuY3Rpb24oIGpxWEhSLCBzdGF0dXMgKSB7XG5cdFx0XHRzZWxmLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjYWxsYmFjay5hcHBseSggdGhpcywgcmVzcG9uc2UgfHwgWyBqcVhIUi5yZXNwb25zZVRleHQsIHN0YXR1cywganFYSFIgXSApO1xuXHRcdFx0fSApO1xuXHRcdH0gKTtcblx0fVxuXG5cdHJldHVybiB0aGlzO1xufTtcblxuXG5cblxuLy8gQXR0YWNoIGEgYnVuY2ggb2YgZnVuY3Rpb25zIGZvciBoYW5kbGluZyBjb21tb24gQUpBWCBldmVudHNcbmpRdWVyeS5lYWNoKCBbXG5cdFwiYWpheFN0YXJ0XCIsXG5cdFwiYWpheFN0b3BcIixcblx0XCJhamF4Q29tcGxldGVcIixcblx0XCJhamF4RXJyb3JcIixcblx0XCJhamF4U3VjY2Vzc1wiLFxuXHRcImFqYXhTZW5kXCJcbl0sIGZ1bmN0aW9uKCBpLCB0eXBlICkge1xuXHRqUXVlcnkuZm5bIHR5cGUgXSA9IGZ1bmN0aW9uKCBmbiApIHtcblx0XHRyZXR1cm4gdGhpcy5vbiggdHlwZSwgZm4gKTtcblx0fTtcbn0gKTtcblxuXG5cblxualF1ZXJ5LmV4cHIucHNldWRvcy5hbmltYXRlZCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRyZXR1cm4galF1ZXJ5LmdyZXAoIGpRdWVyeS50aW1lcnMsIGZ1bmN0aW9uKCBmbiApIHtcblx0XHRyZXR1cm4gZWxlbSA9PT0gZm4uZWxlbTtcblx0fSApLmxlbmd0aDtcbn07XG5cblxuXG5cbmpRdWVyeS5vZmZzZXQgPSB7XG5cdHNldE9mZnNldDogZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMsIGkgKSB7XG5cdFx0dmFyIGN1clBvc2l0aW9uLCBjdXJMZWZ0LCBjdXJDU1NUb3AsIGN1clRvcCwgY3VyT2Zmc2V0LCBjdXJDU1NMZWZ0LCBjYWxjdWxhdGVQb3NpdGlvbixcblx0XHRcdHBvc2l0aW9uID0galF1ZXJ5LmNzcyggZWxlbSwgXCJwb3NpdGlvblwiICksXG5cdFx0XHRjdXJFbGVtID0galF1ZXJ5KCBlbGVtICksXG5cdFx0XHRwcm9wcyA9IHt9O1xuXG5cdFx0Ly8gU2V0IHBvc2l0aW9uIGZpcnN0LCBpbi1jYXNlIHRvcC9sZWZ0IGFyZSBzZXQgZXZlbiBvbiBzdGF0aWMgZWxlbVxuXHRcdGlmICggcG9zaXRpb24gPT09IFwic3RhdGljXCIgKSB7XG5cdFx0XHRlbGVtLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuXHRcdH1cblxuXHRcdGN1ck9mZnNldCA9IGN1ckVsZW0ub2Zmc2V0KCk7XG5cdFx0Y3VyQ1NTVG9wID0galF1ZXJ5LmNzcyggZWxlbSwgXCJ0b3BcIiApO1xuXHRcdGN1ckNTU0xlZnQgPSBqUXVlcnkuY3NzKCBlbGVtLCBcImxlZnRcIiApO1xuXHRcdGNhbGN1bGF0ZVBvc2l0aW9uID0gKCBwb3NpdGlvbiA9PT0gXCJhYnNvbHV0ZVwiIHx8IHBvc2l0aW9uID09PSBcImZpeGVkXCIgKSAmJlxuXHRcdFx0KCBjdXJDU1NUb3AgKyBjdXJDU1NMZWZ0ICkuaW5kZXhPZiggXCJhdXRvXCIgKSA+IC0xO1xuXG5cdFx0Ly8gTmVlZCB0byBiZSBhYmxlIHRvIGNhbGN1bGF0ZSBwb3NpdGlvbiBpZiBlaXRoZXJcblx0XHQvLyB0b3Agb3IgbGVmdCBpcyBhdXRvIGFuZCBwb3NpdGlvbiBpcyBlaXRoZXIgYWJzb2x1dGUgb3IgZml4ZWRcblx0XHRpZiAoIGNhbGN1bGF0ZVBvc2l0aW9uICkge1xuXHRcdFx0Y3VyUG9zaXRpb24gPSBjdXJFbGVtLnBvc2l0aW9uKCk7XG5cdFx0XHRjdXJUb3AgPSBjdXJQb3NpdGlvbi50b3A7XG5cdFx0XHRjdXJMZWZ0ID0gY3VyUG9zaXRpb24ubGVmdDtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjdXJUb3AgPSBwYXJzZUZsb2F0KCBjdXJDU1NUb3AgKSB8fCAwO1xuXHRcdFx0Y3VyTGVmdCA9IHBhcnNlRmxvYXQoIGN1ckNTU0xlZnQgKSB8fCAwO1xuXHRcdH1cblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIG9wdGlvbnMgKSApIHtcblxuXHRcdFx0Ly8gVXNlIGpRdWVyeS5leHRlbmQgaGVyZSB0byBhbGxvdyBtb2RpZmljYXRpb24gb2YgY29vcmRpbmF0ZXMgYXJndW1lbnQgKGdoLTE4NDgpXG5cdFx0XHRvcHRpb25zID0gb3B0aW9ucy5jYWxsKCBlbGVtLCBpLCBqUXVlcnkuZXh0ZW5kKCB7fSwgY3VyT2Zmc2V0ICkgKTtcblx0XHR9XG5cblx0XHRpZiAoIG9wdGlvbnMudG9wICE9IG51bGwgKSB7XG5cdFx0XHRwcm9wcy50b3AgPSAoIG9wdGlvbnMudG9wIC0gY3VyT2Zmc2V0LnRvcCApICsgY3VyVG9wO1xuXHRcdH1cblx0XHRpZiAoIG9wdGlvbnMubGVmdCAhPSBudWxsICkge1xuXHRcdFx0cHJvcHMubGVmdCA9ICggb3B0aW9ucy5sZWZ0IC0gY3VyT2Zmc2V0LmxlZnQgKSArIGN1ckxlZnQ7XG5cdFx0fVxuXG5cdFx0aWYgKCBcInVzaW5nXCIgaW4gb3B0aW9ucyApIHtcblx0XHRcdG9wdGlvbnMudXNpbmcuY2FsbCggZWxlbSwgcHJvcHMgKTtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjdXJFbGVtLmNzcyggcHJvcHMgKTtcblx0XHR9XG5cdH1cbn07XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0b2Zmc2V0OiBmdW5jdGlvbiggb3B0aW9ucyApIHtcblxuXHRcdC8vIFByZXNlcnZlIGNoYWluaW5nIGZvciBzZXR0ZXJcblx0XHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRyZXR1cm4gb3B0aW9ucyA9PT0gdW5kZWZpbmVkID9cblx0XHRcdFx0dGhpcyA6XG5cdFx0XHRcdHRoaXMuZWFjaCggZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5Lm9mZnNldC5zZXRPZmZzZXQoIHRoaXMsIG9wdGlvbnMsIGkgKTtcblx0XHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdHZhciBkb2MsIGRvY0VsZW0sIHJlY3QsIHdpbixcblx0XHRcdGVsZW0gPSB0aGlzWyAwIF07XG5cblx0XHRpZiAoICFlbGVtICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFJldHVybiB6ZXJvcyBmb3IgZGlzY29ubmVjdGVkIGFuZCBoaWRkZW4gKGRpc3BsYXk6IG5vbmUpIGVsZW1lbnRzIChnaC0yMzEwKVxuXHRcdC8vIFN1cHBvcnQ6IElFIDw9MTEgb25seVxuXHRcdC8vIFJ1bm5pbmcgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG9uIGFcblx0XHQvLyBkaXNjb25uZWN0ZWQgbm9kZSBpbiBJRSB0aHJvd3MgYW4gZXJyb3Jcblx0XHRpZiAoICFlbGVtLmdldENsaWVudFJlY3RzKCkubGVuZ3RoICkge1xuXHRcdFx0cmV0dXJuIHsgdG9wOiAwLCBsZWZ0OiAwIH07XG5cdFx0fVxuXG5cdFx0cmVjdCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHRkb2MgPSBlbGVtLm93bmVyRG9jdW1lbnQ7XG5cdFx0ZG9jRWxlbSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cdFx0d2luID0gZG9jLmRlZmF1bHRWaWV3O1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHRvcDogcmVjdC50b3AgKyB3aW4ucGFnZVlPZmZzZXQgLSBkb2NFbGVtLmNsaWVudFRvcCxcblx0XHRcdGxlZnQ6IHJlY3QubGVmdCArIHdpbi5wYWdlWE9mZnNldCAtIGRvY0VsZW0uY2xpZW50TGVmdFxuXHRcdH07XG5cdH0sXG5cblx0cG9zaXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdGlmICggIXRoaXNbIDAgXSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR2YXIgb2Zmc2V0UGFyZW50LCBvZmZzZXQsXG5cdFx0XHRlbGVtID0gdGhpc1sgMCBdLFxuXHRcdFx0cGFyZW50T2Zmc2V0ID0geyB0b3A6IDAsIGxlZnQ6IDAgfTtcblxuXHRcdC8vIEZpeGVkIGVsZW1lbnRzIGFyZSBvZmZzZXQgZnJvbSB3aW5kb3cgKHBhcmVudE9mZnNldCA9IHt0b3A6MCwgbGVmdDogMH0sXG5cdFx0Ly8gYmVjYXVzZSBpdCBpcyBpdHMgb25seSBvZmZzZXQgcGFyZW50XG5cdFx0aWYgKCBqUXVlcnkuY3NzKCBlbGVtLCBcInBvc2l0aW9uXCIgKSA9PT0gXCJmaXhlZFwiICkge1xuXG5cdFx0XHQvLyBBc3N1bWUgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGlzIHRoZXJlIHdoZW4gY29tcHV0ZWQgcG9zaXRpb24gaXMgZml4ZWRcblx0XHRcdG9mZnNldCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBHZXQgKnJlYWwqIG9mZnNldFBhcmVudFxuXHRcdFx0b2Zmc2V0UGFyZW50ID0gdGhpcy5vZmZzZXRQYXJlbnQoKTtcblxuXHRcdFx0Ly8gR2V0IGNvcnJlY3Qgb2Zmc2V0c1xuXHRcdFx0b2Zmc2V0ID0gdGhpcy5vZmZzZXQoKTtcblx0XHRcdGlmICggIW5vZGVOYW1lKCBvZmZzZXRQYXJlbnRbIDAgXSwgXCJodG1sXCIgKSApIHtcblx0XHRcdFx0cGFyZW50T2Zmc2V0ID0gb2Zmc2V0UGFyZW50Lm9mZnNldCgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgb2Zmc2V0UGFyZW50IGJvcmRlcnNcblx0XHRcdHBhcmVudE9mZnNldCA9IHtcblx0XHRcdFx0dG9wOiBwYXJlbnRPZmZzZXQudG9wICsgalF1ZXJ5LmNzcyggb2Zmc2V0UGFyZW50WyAwIF0sIFwiYm9yZGVyVG9wV2lkdGhcIiwgdHJ1ZSApLFxuXHRcdFx0XHRsZWZ0OiBwYXJlbnRPZmZzZXQubGVmdCArIGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudFsgMCBdLCBcImJvcmRlckxlZnRXaWR0aFwiLCB0cnVlIClcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gU3VidHJhY3QgcGFyZW50IG9mZnNldHMgYW5kIGVsZW1lbnQgbWFyZ2luc1xuXHRcdHJldHVybiB7XG5cdFx0XHR0b3A6IG9mZnNldC50b3AgLSBwYXJlbnRPZmZzZXQudG9wIC0galF1ZXJ5LmNzcyggZWxlbSwgXCJtYXJnaW5Ub3BcIiwgdHJ1ZSApLFxuXHRcdFx0bGVmdDogb2Zmc2V0LmxlZnQgLSBwYXJlbnRPZmZzZXQubGVmdCAtIGpRdWVyeS5jc3MoIGVsZW0sIFwibWFyZ2luTGVmdFwiLCB0cnVlIClcblx0XHR9O1xuXHR9LFxuXG5cdC8vIFRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIGRvY3VtZW50RWxlbWVudCBpbiB0aGUgZm9sbG93aW5nIGNhc2VzOlxuXHQvLyAxKSBGb3IgdGhlIGVsZW1lbnQgaW5zaWRlIHRoZSBpZnJhbWUgd2l0aG91dCBvZmZzZXRQYXJlbnQsIHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuXG5cdC8vICAgIGRvY3VtZW50RWxlbWVudCBvZiB0aGUgcGFyZW50IHdpbmRvd1xuXHQvLyAyKSBGb3IgdGhlIGhpZGRlbiBvciBkZXRhY2hlZCBlbGVtZW50XG5cdC8vIDMpIEZvciBib2R5IG9yIGh0bWwgZWxlbWVudCwgaS5lLiBpbiBjYXNlIG9mIHRoZSBodG1sIG5vZGUgLSBpdCB3aWxsIHJldHVybiBpdHNlbGZcblx0Ly9cblx0Ly8gYnV0IHRob3NlIGV4Y2VwdGlvbnMgd2VyZSBuZXZlciBwcmVzZW50ZWQgYXMgYSByZWFsIGxpZmUgdXNlLWNhc2VzXG5cdC8vIGFuZCBtaWdodCBiZSBjb25zaWRlcmVkIGFzIG1vcmUgcHJlZmVyYWJsZSByZXN1bHRzLlxuXHQvL1xuXHQvLyBUaGlzIGxvZ2ljLCBob3dldmVyLCBpcyBub3QgZ3VhcmFudGVlZCBhbmQgY2FuIGNoYW5nZSBhdCBhbnkgcG9pbnQgaW4gdGhlIGZ1dHVyZVxuXHRvZmZzZXRQYXJlbnQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcCggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgb2Zmc2V0UGFyZW50ID0gdGhpcy5vZmZzZXRQYXJlbnQ7XG5cblx0XHRcdHdoaWxlICggb2Zmc2V0UGFyZW50ICYmIGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudCwgXCJwb3NpdGlvblwiICkgPT09IFwic3RhdGljXCIgKSB7XG5cdFx0XHRcdG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudC5vZmZzZXRQYXJlbnQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBvZmZzZXRQYXJlbnQgfHwgZG9jdW1lbnRFbGVtZW50O1xuXHRcdH0gKTtcblx0fVxufSApO1xuXG4vLyBDcmVhdGUgc2Nyb2xsTGVmdCBhbmQgc2Nyb2xsVG9wIG1ldGhvZHNcbmpRdWVyeS5lYWNoKCB7IHNjcm9sbExlZnQ6IFwicGFnZVhPZmZzZXRcIiwgc2Nyb2xsVG9wOiBcInBhZ2VZT2Zmc2V0XCIgfSwgZnVuY3Rpb24oIG1ldGhvZCwgcHJvcCApIHtcblx0dmFyIHRvcCA9IFwicGFnZVlPZmZzZXRcIiA9PT0gcHJvcDtcblxuXHRqUXVlcnkuZm5bIG1ldGhvZCBdID0gZnVuY3Rpb24oIHZhbCApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgbWV0aG9kLCB2YWwgKSB7XG5cblx0XHRcdC8vIENvYWxlc2NlIGRvY3VtZW50cyBhbmQgd2luZG93c1xuXHRcdFx0dmFyIHdpbjtcblx0XHRcdGlmICggalF1ZXJ5LmlzV2luZG93KCBlbGVtICkgKSB7XG5cdFx0XHRcdHdpbiA9IGVsZW07XG5cdFx0XHR9IGVsc2UgaWYgKCBlbGVtLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHR3aW4gPSBlbGVtLmRlZmF1bHRWaWV3O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHZhbCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRyZXR1cm4gd2luID8gd2luWyBwcm9wIF0gOiBlbGVtWyBtZXRob2QgXTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCB3aW4gKSB7XG5cdFx0XHRcdHdpbi5zY3JvbGxUbyhcblx0XHRcdFx0XHQhdG9wID8gdmFsIDogd2luLnBhZ2VYT2Zmc2V0LFxuXHRcdFx0XHRcdHRvcCA/IHZhbCA6IHdpbi5wYWdlWU9mZnNldFxuXHRcdFx0XHQpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbGVtWyBtZXRob2QgXSA9IHZhbDtcblx0XHRcdH1cblx0XHR9LCBtZXRob2QsIHZhbCwgYXJndW1lbnRzLmxlbmd0aCApO1xuXHR9O1xufSApO1xuXG4vLyBTdXBwb3J0OiBTYWZhcmkgPD03IC0gOS4xLCBDaHJvbWUgPD0zNyAtIDQ5XG4vLyBBZGQgdGhlIHRvcC9sZWZ0IGNzc0hvb2tzIHVzaW5nIGpRdWVyeS5mbi5wb3NpdGlvblxuLy8gV2Via2l0IGJ1ZzogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTI5MDg0XG4vLyBCbGluayBidWc6IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTU4OTM0N1xuLy8gZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIHBlcmNlbnQgd2hlbiBzcGVjaWZpZWQgZm9yIHRvcC9sZWZ0L2JvdHRvbS9yaWdodDtcbi8vIHJhdGhlciB0aGFuIG1ha2UgdGhlIGNzcyBtb2R1bGUgZGVwZW5kIG9uIHRoZSBvZmZzZXQgbW9kdWxlLCBqdXN0IGNoZWNrIGZvciBpdCBoZXJlXG5qUXVlcnkuZWFjaCggWyBcInRvcFwiLCBcImxlZnRcIiBdLCBmdW5jdGlvbiggaSwgcHJvcCApIHtcblx0alF1ZXJ5LmNzc0hvb2tzWyBwcm9wIF0gPSBhZGRHZXRIb29rSWYoIHN1cHBvcnQucGl4ZWxQb3NpdGlvbixcblx0XHRmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG5cdFx0XHRpZiAoIGNvbXB1dGVkICkge1xuXHRcdFx0XHRjb21wdXRlZCA9IGN1ckNTUyggZWxlbSwgcHJvcCApO1xuXG5cdFx0XHRcdC8vIElmIGN1ckNTUyByZXR1cm5zIHBlcmNlbnRhZ2UsIGZhbGxiYWNrIHRvIG9mZnNldFxuXHRcdFx0XHRyZXR1cm4gcm51bW5vbnB4LnRlc3QoIGNvbXB1dGVkICkgP1xuXHRcdFx0XHRcdGpRdWVyeSggZWxlbSApLnBvc2l0aW9uKClbIHByb3AgXSArIFwicHhcIiA6XG5cdFx0XHRcdFx0Y29tcHV0ZWQ7XG5cdFx0XHR9XG5cdFx0fVxuXHQpO1xufSApO1xuXG5cbi8vIENyZWF0ZSBpbm5lckhlaWdodCwgaW5uZXJXaWR0aCwgaGVpZ2h0LCB3aWR0aCwgb3V0ZXJIZWlnaHQgYW5kIG91dGVyV2lkdGggbWV0aG9kc1xualF1ZXJ5LmVhY2goIHsgSGVpZ2h0OiBcImhlaWdodFwiLCBXaWR0aDogXCJ3aWR0aFwiIH0sIGZ1bmN0aW9uKCBuYW1lLCB0eXBlICkge1xuXHRqUXVlcnkuZWFjaCggeyBwYWRkaW5nOiBcImlubmVyXCIgKyBuYW1lLCBjb250ZW50OiB0eXBlLCBcIlwiOiBcIm91dGVyXCIgKyBuYW1lIH0sXG5cdFx0ZnVuY3Rpb24oIGRlZmF1bHRFeHRyYSwgZnVuY05hbWUgKSB7XG5cblx0XHQvLyBNYXJnaW4gaXMgb25seSBmb3Igb3V0ZXJIZWlnaHQsIG91dGVyV2lkdGhcblx0XHRqUXVlcnkuZm5bIGZ1bmNOYW1lIF0gPSBmdW5jdGlvbiggbWFyZ2luLCB2YWx1ZSApIHtcblx0XHRcdHZhciBjaGFpbmFibGUgPSBhcmd1bWVudHMubGVuZ3RoICYmICggZGVmYXVsdEV4dHJhIHx8IHR5cGVvZiBtYXJnaW4gIT09IFwiYm9vbGVhblwiICksXG5cdFx0XHRcdGV4dHJhID0gZGVmYXVsdEV4dHJhIHx8ICggbWFyZ2luID09PSB0cnVlIHx8IHZhbHVlID09PSB0cnVlID8gXCJtYXJnaW5cIiA6IFwiYm9yZGVyXCIgKTtcblxuXHRcdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIGVsZW0sIHR5cGUsIHZhbHVlICkge1xuXHRcdFx0XHR2YXIgZG9jO1xuXG5cdFx0XHRcdGlmICggalF1ZXJ5LmlzV2luZG93KCBlbGVtICkgKSB7XG5cblx0XHRcdFx0XHQvLyAkKCB3aW5kb3cgKS5vdXRlcldpZHRoL0hlaWdodCByZXR1cm4gdy9oIGluY2x1ZGluZyBzY3JvbGxiYXJzIChnaC0xNzI5KVxuXHRcdFx0XHRcdHJldHVybiBmdW5jTmFtZS5pbmRleE9mKCBcIm91dGVyXCIgKSA9PT0gMCA/XG5cdFx0XHRcdFx0XHRlbGVtWyBcImlubmVyXCIgKyBuYW1lIF0gOlxuXHRcdFx0XHRcdFx0ZWxlbS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbIFwiY2xpZW50XCIgKyBuYW1lIF07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBHZXQgZG9jdW1lbnQgd2lkdGggb3IgaGVpZ2h0XG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0XHRkb2MgPSBlbGVtLmRvY3VtZW50RWxlbWVudDtcblxuXHRcdFx0XHRcdC8vIEVpdGhlciBzY3JvbGxbV2lkdGgvSGVpZ2h0XSBvciBvZmZzZXRbV2lkdGgvSGVpZ2h0XSBvciBjbGllbnRbV2lkdGgvSGVpZ2h0XSxcblx0XHRcdFx0XHQvLyB3aGljaGV2ZXIgaXMgZ3JlYXRlc3Rcblx0XHRcdFx0XHRyZXR1cm4gTWF0aC5tYXgoXG5cdFx0XHRcdFx0XHRlbGVtLmJvZHlbIFwic2Nyb2xsXCIgKyBuYW1lIF0sIGRvY1sgXCJzY3JvbGxcIiArIG5hbWUgXSxcblx0XHRcdFx0XHRcdGVsZW0uYm9keVsgXCJvZmZzZXRcIiArIG5hbWUgXSwgZG9jWyBcIm9mZnNldFwiICsgbmFtZSBdLFxuXHRcdFx0XHRcdFx0ZG9jWyBcImNsaWVudFwiICsgbmFtZSBdXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID9cblxuXHRcdFx0XHRcdC8vIEdldCB3aWR0aCBvciBoZWlnaHQgb24gdGhlIGVsZW1lbnQsIHJlcXVlc3RpbmcgYnV0IG5vdCBmb3JjaW5nIHBhcnNlRmxvYXRcblx0XHRcdFx0XHRqUXVlcnkuY3NzKCBlbGVtLCB0eXBlLCBleHRyYSApIDpcblxuXHRcdFx0XHRcdC8vIFNldCB3aWR0aCBvciBoZWlnaHQgb24gdGhlIGVsZW1lbnRcblx0XHRcdFx0XHRqUXVlcnkuc3R5bGUoIGVsZW0sIHR5cGUsIHZhbHVlLCBleHRyYSApO1xuXHRcdFx0fSwgdHlwZSwgY2hhaW5hYmxlID8gbWFyZ2luIDogdW5kZWZpbmVkLCBjaGFpbmFibGUgKTtcblx0XHR9O1xuXHR9ICk7XG59ICk7XG5cblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXG5cdGJpbmQ6IGZ1bmN0aW9uKCB0eXBlcywgZGF0YSwgZm4gKSB7XG5cdFx0cmV0dXJuIHRoaXMub24oIHR5cGVzLCBudWxsLCBkYXRhLCBmbiApO1xuXHR9LFxuXHR1bmJpbmQ6IGZ1bmN0aW9uKCB0eXBlcywgZm4gKSB7XG5cdFx0cmV0dXJuIHRoaXMub2ZmKCB0eXBlcywgbnVsbCwgZm4gKTtcblx0fSxcblxuXHRkZWxlZ2F0ZTogZnVuY3Rpb24oIHNlbGVjdG9yLCB0eXBlcywgZGF0YSwgZm4gKSB7XG5cdFx0cmV0dXJuIHRoaXMub24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKTtcblx0fSxcblx0dW5kZWxlZ2F0ZTogZnVuY3Rpb24oIHNlbGVjdG9yLCB0eXBlcywgZm4gKSB7XG5cblx0XHQvLyAoIG5hbWVzcGFjZSApIG9yICggc2VsZWN0b3IsIHR5cGVzIFssIGZuXSApXG5cdFx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgP1xuXHRcdFx0dGhpcy5vZmYoIHNlbGVjdG9yLCBcIioqXCIgKSA6XG5cdFx0XHR0aGlzLm9mZiggdHlwZXMsIHNlbGVjdG9yIHx8IFwiKipcIiwgZm4gKTtcblx0fVxufSApO1xuXG5qUXVlcnkuaG9sZFJlYWR5ID0gZnVuY3Rpb24oIGhvbGQgKSB7XG5cdGlmICggaG9sZCApIHtcblx0XHRqUXVlcnkucmVhZHlXYWl0Kys7XG5cdH0gZWxzZSB7XG5cdFx0alF1ZXJ5LnJlYWR5KCB0cnVlICk7XG5cdH1cbn07XG5qUXVlcnkuaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5qUXVlcnkucGFyc2VKU09OID0gSlNPTi5wYXJzZTtcbmpRdWVyeS5ub2RlTmFtZSA9IG5vZGVOYW1lO1xuXG5cblxuXG4vLyBSZWdpc3RlciBhcyBhIG5hbWVkIEFNRCBtb2R1bGUsIHNpbmNlIGpRdWVyeSBjYW4gYmUgY29uY2F0ZW5hdGVkIHdpdGggb3RoZXJcbi8vIGZpbGVzIHRoYXQgbWF5IHVzZSBkZWZpbmUsIGJ1dCBub3QgdmlhIGEgcHJvcGVyIGNvbmNhdGVuYXRpb24gc2NyaXB0IHRoYXRcbi8vIHVuZGVyc3RhbmRzIGFub255bW91cyBBTUQgbW9kdWxlcy4gQSBuYW1lZCBBTUQgaXMgc2FmZXN0IGFuZCBtb3N0IHJvYnVzdFxuLy8gd2F5IHRvIHJlZ2lzdGVyLiBMb3dlcmNhc2UganF1ZXJ5IGlzIHVzZWQgYmVjYXVzZSBBTUQgbW9kdWxlIG5hbWVzIGFyZVxuLy8gZGVyaXZlZCBmcm9tIGZpbGUgbmFtZXMsIGFuZCBqUXVlcnkgaXMgbm9ybWFsbHkgZGVsaXZlcmVkIGluIGEgbG93ZXJjYXNlXG4vLyBmaWxlIG5hbWUuIERvIHRoaXMgYWZ0ZXIgY3JlYXRpbmcgdGhlIGdsb2JhbCBzbyB0aGF0IGlmIGFuIEFNRCBtb2R1bGUgd2FudHNcbi8vIHRvIGNhbGwgbm9Db25mbGljdCB0byBoaWRlIHRoaXMgdmVyc2lvbiBvZiBqUXVlcnksIGl0IHdpbGwgd29yay5cblxuLy8gTm90ZSB0aGF0IGZvciBtYXhpbXVtIHBvcnRhYmlsaXR5LCBsaWJyYXJpZXMgdGhhdCBhcmUgbm90IGpRdWVyeSBzaG91bGRcbi8vIGRlY2xhcmUgdGhlbXNlbHZlcyBhcyBhbm9ueW1vdXMgbW9kdWxlcywgYW5kIGF2b2lkIHNldHRpbmcgYSBnbG9iYWwgaWYgYW5cbi8vIEFNRCBsb2FkZXIgaXMgcHJlc2VudC4galF1ZXJ5IGlzIGEgc3BlY2lhbCBjYXNlLiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vanJidXJrZS9yZXF1aXJlanMvd2lraS9VcGRhdGluZy1leGlzdGluZy1saWJyYXJpZXMjd2lraS1hbm9uXG5cbmlmICggdHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQgKSB7XG5cdGRlZmluZSggXCJqcXVlcnlcIiwgW10sIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBqUXVlcnk7XG5cdH0gKTtcbn1cblxuXG5cblxudmFyXG5cblx0Ly8gTWFwIG92ZXIgalF1ZXJ5IGluIGNhc2Ugb2Ygb3ZlcndyaXRlXG5cdF9qUXVlcnkgPSB3aW5kb3cualF1ZXJ5LFxuXG5cdC8vIE1hcCBvdmVyIHRoZSAkIGluIGNhc2Ugb2Ygb3ZlcndyaXRlXG5cdF8kID0gd2luZG93LiQ7XG5cbmpRdWVyeS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oIGRlZXAgKSB7XG5cdGlmICggd2luZG93LiQgPT09IGpRdWVyeSApIHtcblx0XHR3aW5kb3cuJCA9IF8kO1xuXHR9XG5cblx0aWYgKCBkZWVwICYmIHdpbmRvdy5qUXVlcnkgPT09IGpRdWVyeSApIHtcblx0XHR3aW5kb3cualF1ZXJ5ID0gX2pRdWVyeTtcblx0fVxuXG5cdHJldHVybiBqUXVlcnk7XG59O1xuXG4vLyBFeHBvc2UgalF1ZXJ5IGFuZCAkIGlkZW50aWZpZXJzLCBldmVuIGluIEFNRFxuLy8gKCM3MTAyI2NvbW1lbnQ6MTAsIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L3B1bGwvNTU3KVxuLy8gYW5kIENvbW1vbkpTIGZvciBicm93c2VyIGVtdWxhdG9ycyAoIzEzNTY2KVxuaWYgKCAhbm9HbG9iYWwgKSB7XG5cdHdpbmRvdy5qUXVlcnkgPSB3aW5kb3cuJCA9IGpRdWVyeTtcbn1cblxuXG5cblxucmV0dXJuIGpRdWVyeTtcbn0gKTtcbiJdfQ==
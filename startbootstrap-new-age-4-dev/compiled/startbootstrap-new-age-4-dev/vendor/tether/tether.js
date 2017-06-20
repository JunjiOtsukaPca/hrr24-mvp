'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! tether 1.4.0 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    root.Tether = factory();
  }
})(undefined, function (require, exports, module) {

  'use strict';

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  var TetherBase = undefined;
  if (typeof TetherBase === 'undefined') {
    TetherBase = { modules: [] };
  }

  var zeroElement = null;

  // Same as native getBoundingClientRect, except it takes into account parent <frame> offsets
  // if the element lies within a nested document (<frame> or <iframe>-like).
  function getActualBoundingClientRect(node) {
    var boundingRect = node.getBoundingClientRect();

    // The original object returned by getBoundingClientRect is immutable, so we clone it
    // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
    var rect = {};
    for (var k in boundingRect) {
      rect[k] = boundingRect[k];
    }

    if (node.ownerDocument !== document) {
      var _frameElement = node.ownerDocument.defaultView.frameElement;
      if (_frameElement) {
        var frameRect = getActualBoundingClientRect(_frameElement);
        rect.top += frameRect.top;
        rect.bottom += frameRect.top;
        rect.left += frameRect.left;
        rect.right += frameRect.left;
      }
    }

    return rect;
  }

  function getScrollParents(el) {
    // In firefox if the el is inside an iframe with display: none; window.getComputedStyle() will return null;
    // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    var computedStyle = getComputedStyle(el) || {};
    var position = computedStyle.position;
    var parents = [];

    if (position === 'fixed') {
      return [el];
    }

    var parent = el;
    while ((parent = parent.parentNode) && parent && parent.nodeType === 1) {
      var style = undefined;
      try {
        style = getComputedStyle(parent);
      } catch (err) {}

      if (typeof style === 'undefined' || style === null) {
        parents.push(parent);
        return parents;
      }

      var _style = style;
      var overflow = _style.overflow;
      var overflowX = _style.overflowX;
      var overflowY = _style.overflowY;

      if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
        if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
          parents.push(parent);
        }
      }
    }

    parents.push(el.ownerDocument.body);

    // If the node is within a frame, account for the parent window scroll
    if (el.ownerDocument !== document) {
      parents.push(el.ownerDocument.defaultView);
    }

    return parents;
  }

  var uniqueId = function () {
    var id = 0;
    return function () {
      return ++id;
    };
  }();

  var zeroPosCache = {};
  var getOrigin = function getOrigin() {
    // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
    // jitter as the user scrolls that messes with our ability to detect if two positions
    // are equivilant or not.  We place an element at the top left of the page that will
    // get the same jitter, so we can cancel the two out.
    var node = zeroElement;
    if (!node || !document.body.contains(node)) {
      node = document.createElement('div');
      node.setAttribute('data-tether-id', uniqueId());
      extend(node.style, {
        top: 0,
        left: 0,
        position: 'absolute'
      });

      document.body.appendChild(node);

      zeroElement = node;
    }

    var id = node.getAttribute('data-tether-id');
    if (typeof zeroPosCache[id] === 'undefined') {
      zeroPosCache[id] = getActualBoundingClientRect(node);

      // Clear the cache when this position call is done
      defer(function () {
        delete zeroPosCache[id];
      });
    }

    return zeroPosCache[id];
  };

  function removeUtilElements() {
    if (zeroElement) {
      document.body.removeChild(zeroElement);
    }
    zeroElement = null;
  };

  function getBounds(el) {
    var doc = undefined;
    if (el === document) {
      doc = document;
      el = document.documentElement;
    } else {
      doc = el.ownerDocument;
    }

    var docEl = doc.documentElement;

    var box = getActualBoundingClientRect(el);

    var origin = getOrigin();

    box.top -= origin.top;
    box.left -= origin.left;

    if (typeof box.width === 'undefined') {
      box.width = document.body.scrollWidth - box.left - box.right;
    }
    if (typeof box.height === 'undefined') {
      box.height = document.body.scrollHeight - box.top - box.bottom;
    }

    box.top = box.top - docEl.clientTop;
    box.left = box.left - docEl.clientLeft;
    box.right = doc.body.clientWidth - box.width - box.left;
    box.bottom = doc.body.clientHeight - box.height - box.top;

    return box;
  }

  function getOffsetParent(el) {
    return el.offsetParent || document.documentElement;
  }

  var _scrollBarSize = null;
  function getScrollBarSize() {
    if (_scrollBarSize) {
      return _scrollBarSize;
    }
    var inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '200px';

    var outer = document.createElement('div');
    extend(outer.style, {
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      visibility: 'hidden',
      width: '200px',
      height: '150px',
      overflow: 'hidden'
    });

    outer.appendChild(inner);

    document.body.appendChild(outer);

    var widthContained = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var widthScroll = inner.offsetWidth;

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }

    document.body.removeChild(outer);

    var width = widthContained - widthScroll;

    _scrollBarSize = { width: width, height: width };
    return _scrollBarSize;
  }

  function extend() {
    var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var args = [];

    Array.prototype.push.apply(args, arguments);

    args.slice(1).forEach(function (obj) {
      if (obj) {
        for (var key in obj) {
          if ({}.hasOwnProperty.call(obj, key)) {
            out[key] = obj[key];
          }
        }
      }
    });

    return out;
  }

  function removeClass(el, name) {
    if (typeof el.classList !== 'undefined') {
      name.split(' ').forEach(function (cls) {
        if (cls.trim()) {
          el.classList.remove(cls);
        }
      });
    } else {
      var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
      var className = getClassName(el).replace(regex, ' ');
      setClassName(el, className);
    }
  }

  function addClass(el, name) {
    if (typeof el.classList !== 'undefined') {
      name.split(' ').forEach(function (cls) {
        if (cls.trim()) {
          el.classList.add(cls);
        }
      });
    } else {
      removeClass(el, name);
      var cls = getClassName(el) + (' ' + name);
      setClassName(el, cls);
    }
  }

  function hasClass(el, name) {
    if (typeof el.classList !== 'undefined') {
      return el.classList.contains(name);
    }
    var className = getClassName(el);
    return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
  }

  function getClassName(el) {
    // Can't use just SVGAnimatedString here since nodes within a Frame in IE have
    // completely separately SVGAnimatedString base classes
    if (el.className instanceof el.ownerDocument.defaultView.SVGAnimatedString) {
      return el.className.baseVal;
    }
    return el.className;
  }

  function setClassName(el, className) {
    el.setAttribute('class', className);
  }

  function updateClasses(el, add, all) {
    // Of the set of 'all' classes, we need the 'add' classes, and only the
    // 'add' classes to be set.
    all.forEach(function (cls) {
      if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
        removeClass(el, cls);
      }
    });

    add.forEach(function (cls) {
      if (!hasClass(el, cls)) {
        addClass(el, cls);
      }
    });
  }

  var deferred = [];

  var defer = function defer(fn) {
    deferred.push(fn);
  };

  var flush = function flush() {
    var fn = undefined;
    while (fn = deferred.pop()) {
      fn();
    }
  };

  var Evented = function () {
    function Evented() {
      _classCallCheck(this, Evented);
    }

    _createClass(Evented, [{
      key: 'on',
      value: function on(event, handler, ctx) {
        var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

        if (typeof this.bindings === 'undefined') {
          this.bindings = {};
        }
        if (typeof this.bindings[event] === 'undefined') {
          this.bindings[event] = [];
        }
        this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
      }
    }, {
      key: 'once',
      value: function once(event, handler, ctx) {
        this.on(event, handler, ctx, true);
      }
    }, {
      key: 'off',
      value: function off(event, handler) {
        if (typeof this.bindings === 'undefined' || typeof this.bindings[event] === 'undefined') {
          return;
        }

        if (typeof handler === 'undefined') {
          delete this.bindings[event];
        } else {
          var i = 0;
          while (i < this.bindings[event].length) {
            if (this.bindings[event][i].handler === handler) {
              this.bindings[event].splice(i, 1);
            } else {
              ++i;
            }
          }
        }
      }
    }, {
      key: 'trigger',
      value: function trigger(event) {
        if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
          var i = 0;

          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          while (i < this.bindings[event].length) {
            var _bindings$event$i = this.bindings[event][i];
            var handler = _bindings$event$i.handler;
            var ctx = _bindings$event$i.ctx;
            var once = _bindings$event$i.once;

            var context = ctx;
            if (typeof context === 'undefined') {
              context = this;
            }

            handler.apply(context, args);

            if (once) {
              this.bindings[event].splice(i, 1);
            } else {
              ++i;
            }
          }
        }
      }
    }]);

    return Evented;
  }();

  TetherBase.Utils = {
    getActualBoundingClientRect: getActualBoundingClientRect,
    getScrollParents: getScrollParents,
    getBounds: getBounds,
    getOffsetParent: getOffsetParent,
    extend: extend,
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    updateClasses: updateClasses,
    defer: defer,
    flush: flush,
    uniqueId: uniqueId,
    Evented: Evented,
    getScrollBarSize: getScrollBarSize,
    removeUtilElements: removeUtilElements
  };
  /* globals TetherBase, performance */

  'use strict';

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;_e = err;
      } finally {
        try {
          if (!_n && _i['return']) _i['return']();
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError('Invalid attempt to destructure non-iterable instance');
      }
    };
  }();

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  var _get = function get(_x6, _x7, _x8) {
    var _again = true;_function: while (_again) {
      var object = _x6,
          property = _x7,
          receiver = _x8;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);if (parent === null) {
          return undefined;
        } else {
          _x6 = parent;_x7 = property;_x8 = receiver;_again = true;desc = parent = undefined;continue _function;
        }
      } else if ('value' in desc) {
        return desc.value;
      } else {
        var getter = desc.get;if (getter === undefined) {
          return undefined;
        }return getter.call(receiver);
      }
    }
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  if (typeof TetherBase === 'undefined') {
    throw new Error('You must include the utils.js file before tether.js');
  }

  var _TetherBase$Utils = TetherBase.Utils;
  var getScrollParents = _TetherBase$Utils.getScrollParents;
  var getBounds = _TetherBase$Utils.getBounds;
  var getOffsetParent = _TetherBase$Utils.getOffsetParent;
  var extend = _TetherBase$Utils.extend;
  var addClass = _TetherBase$Utils.addClass;
  var removeClass = _TetherBase$Utils.removeClass;
  var updateClasses = _TetherBase$Utils.updateClasses;
  var defer = _TetherBase$Utils.defer;
  var flush = _TetherBase$Utils.flush;
  var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;
  var removeUtilElements = _TetherBase$Utils.removeUtilElements;

  function within(a, b) {
    var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

    return a + diff >= b && b >= a - diff;
  }

  var transformKey = function () {
    if (typeof document === 'undefined') {
      return '';
    }
    var el = document.createElement('div');

    var transforms = ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
    for (var i = 0; i < transforms.length; ++i) {
      var key = transforms[i];
      if (el.style[key] !== undefined) {
        return key;
      }
    }
  }();

  var tethers = [];

  var position = function position() {
    tethers.forEach(function (tether) {
      tether.position(false);
    });
    flush();
  };

  function now() {
    if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
      return performance.now();
    }
    return +new Date();
  }

  (function () {
    var lastCall = null;
    var lastDuration = null;
    var pendingTimeout = null;

    var tick = function tick() {
      if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
        // We voluntarily throttle ourselves if we can't manage 60fps
        lastDuration = Math.min(lastDuration - 16, 250);

        // Just in case this is the last event, remember to position just once more
        pendingTimeout = setTimeout(tick, 250);
        return;
      }

      if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
        // Some browsers call events a little too frequently, refuse to run more than is reasonable
        return;
      }

      if (pendingTimeout != null) {
        clearTimeout(pendingTimeout);
        pendingTimeout = null;
      }

      lastCall = now();
      position();
      lastDuration = now() - lastCall;
    };

    if (typeof window !== 'undefined' && typeof window.addEventListener !== 'undefined') {
      ['resize', 'scroll', 'touchmove'].forEach(function (event) {
        window.addEventListener(event, tick);
      });
    }
  })();

  var MIRROR_LR = {
    center: 'center',
    left: 'right',
    right: 'left'
  };

  var MIRROR_TB = {
    middle: 'middle',
    top: 'bottom',
    bottom: 'top'
  };

  var OFFSET_MAP = {
    top: 0,
    left: 0,
    middle: '50%',
    center: '50%',
    bottom: '100%',
    right: '100%'
  };

  var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
    var left = attachment.left;
    var top = attachment.top;

    if (left === 'auto') {
      left = MIRROR_LR[relativeToAttachment.left];
    }

    if (top === 'auto') {
      top = MIRROR_TB[relativeToAttachment.top];
    }

    return { left: left, top: top };
  };

  var attachmentToOffset = function attachmentToOffset(attachment) {
    var left = attachment.left;
    var top = attachment.top;

    if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
      left = OFFSET_MAP[attachment.left];
    }

    if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
      top = OFFSET_MAP[attachment.top];
    }

    return { left: left, top: top };
  };

  function addOffset() {
    var out = { top: 0, left: 0 };

    for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
      offsets[_key] = arguments[_key];
    }

    offsets.forEach(function (_ref) {
      var top = _ref.top;
      var left = _ref.left;

      if (typeof top === 'string') {
        top = parseFloat(top, 10);
      }
      if (typeof left === 'string') {
        left = parseFloat(left, 10);
      }

      out.top += top;
      out.left += left;
    });

    return out;
  }

  function offsetToPx(offset, size) {
    if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
      offset.left = parseFloat(offset.left, 10) / 100 * size.width;
    }
    if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
      offset.top = parseFloat(offset.top, 10) / 100 * size.height;
    }

    return offset;
  }

  var parseOffset = function parseOffset(value) {
    var _value$split = value.split(' ');

    var _value$split2 = _slicedToArray(_value$split, 2);

    var top = _value$split2[0];
    var left = _value$split2[1];

    return { top: top, left: left };
  };
  var parseAttachment = parseOffset;

  var TetherClass = function (_Evented) {
    _inherits(TetherClass, _Evented);

    function TetherClass(options) {
      var _this = this;

      _classCallCheck(this, TetherClass);

      _get(Object.getPrototypeOf(TetherClass.prototype), 'constructor', this).call(this);
      this.position = this.position.bind(this);

      tethers.push(this);

      this.history = [];

      this.setOptions(options, false);

      TetherBase.modules.forEach(function (module) {
        if (typeof module.initialize !== 'undefined') {
          module.initialize.call(_this);
        }
      });

      this.position();
    }

    _createClass(TetherClass, [{
      key: 'getClass',
      value: function getClass() {
        var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        var classes = this.options.classes;

        if (typeof classes !== 'undefined' && classes[key]) {
          return this.options.classes[key];
        } else if (this.options.classPrefix) {
          return this.options.classPrefix + '-' + key;
        } else {
          return key;
        }
      }
    }, {
      key: 'setOptions',
      value: function setOptions(options) {
        var _this2 = this;

        var pos = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        var defaults = {
          offset: '0 0',
          targetOffset: '0 0',
          targetAttachment: 'auto auto',
          classPrefix: 'tether'
        };

        this.options = extend(defaults, options);

        var _options = this.options;
        var element = _options.element;
        var target = _options.target;
        var targetModifier = _options.targetModifier;

        this.element = element;
        this.target = target;
        this.targetModifier = targetModifier;

        if (this.target === 'viewport') {
          this.target = document.body;
          this.targetModifier = 'visible';
        } else if (this.target === 'scroll-handle') {
          this.target = document.body;
          this.targetModifier = 'scroll-handle';
        }

        ['element', 'target'].forEach(function (key) {
          if (typeof _this2[key] === 'undefined') {
            throw new Error('Tether Error: Both element and target must be defined');
          }

          if (typeof _this2[key].jquery !== 'undefined') {
            _this2[key] = _this2[key][0];
          } else if (typeof _this2[key] === 'string') {
            _this2[key] = document.querySelector(_this2[key]);
          }
        });

        addClass(this.element, this.getClass('element'));
        if (!(this.options.addTargetClasses === false)) {
          addClass(this.target, this.getClass('target'));
        }

        if (!this.options.attachment) {
          throw new Error('Tether Error: You must provide an attachment');
        }

        this.targetAttachment = parseAttachment(this.options.targetAttachment);
        this.attachment = parseAttachment(this.options.attachment);
        this.offset = parseOffset(this.options.offset);
        this.targetOffset = parseOffset(this.options.targetOffset);

        if (typeof this.scrollParents !== 'undefined') {
          this.disable();
        }

        if (this.targetModifier === 'scroll-handle') {
          this.scrollParents = [this.target];
        } else {
          this.scrollParents = getScrollParents(this.target);
        }

        if (!(this.options.enabled === false)) {
          this.enable(pos);
        }
      }
    }, {
      key: 'getTargetBounds',
      value: function getTargetBounds() {
        if (typeof this.targetModifier !== 'undefined') {
          if (this.targetModifier === 'visible') {
            if (this.target === document.body) {
              return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
            } else {
              var bounds = getBounds(this.target);

              var out = {
                height: bounds.height,
                width: bounds.width,
                top: bounds.top,
                left: bounds.left
              };

              out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
              out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
              out.height = Math.min(innerHeight, out.height);
              out.height -= 2;

              out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
              out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
              out.width = Math.min(innerWidth, out.width);
              out.width -= 2;

              if (out.top < pageYOffset) {
                out.top = pageYOffset;
              }
              if (out.left < pageXOffset) {
                out.left = pageXOffset;
              }

              return out;
            }
          } else if (this.targetModifier === 'scroll-handle') {
            var bounds = undefined;
            var target = this.target;
            if (target === document.body) {
              target = document.documentElement;

              bounds = {
                left: pageXOffset,
                top: pageYOffset,
                height: innerHeight,
                width: innerWidth
              };
            } else {
              bounds = getBounds(target);
            }

            var style = getComputedStyle(target);

            var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;

            var scrollBottom = 0;
            if (hasBottomScroll) {
              scrollBottom = 15;
            }

            var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;

            var out = {
              width: 15,
              height: height * 0.975 * (height / target.scrollHeight),
              left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
            };

            var fitAdj = 0;
            if (height < 408 && this.target === document.body) {
              fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
            }

            if (this.target !== document.body) {
              out.height = Math.max(out.height, 24);
            }

            var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
            out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

            if (this.target === document.body) {
              out.height = Math.max(out.height, 24);
            }

            return out;
          }
        } else {
          return getBounds(this.target);
        }
      }
    }, {
      key: 'clearCache',
      value: function clearCache() {
        this._cache = {};
      }
    }, {
      key: 'cache',
      value: function cache(k, getter) {
        // More than one module will often need the same DOM info, so
        // we keep a cache which is cleared on each position call
        if (typeof this._cache === 'undefined') {
          this._cache = {};
        }

        if (typeof this._cache[k] === 'undefined') {
          this._cache[k] = getter.call(this);
        }

        return this._cache[k];
      }
    }, {
      key: 'enable',
      value: function enable() {
        var _this3 = this;

        var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

        if (!(this.options.addTargetClasses === false)) {
          addClass(this.target, this.getClass('enabled'));
        }
        addClass(this.element, this.getClass('enabled'));
        this.enabled = true;

        this.scrollParents.forEach(function (parent) {
          if (parent !== _this3.target.ownerDocument) {
            parent.addEventListener('scroll', _this3.position);
          }
        });

        if (pos) {
          this.position();
        }
      }
    }, {
      key: 'disable',
      value: function disable() {
        var _this4 = this;

        removeClass(this.target, this.getClass('enabled'));
        removeClass(this.element, this.getClass('enabled'));
        this.enabled = false;

        if (typeof this.scrollParents !== 'undefined') {
          this.scrollParents.forEach(function (parent) {
            parent.removeEventListener('scroll', _this4.position);
          });
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var _this5 = this;

        this.disable();

        tethers.forEach(function (tether, i) {
          if (tether === _this5) {
            tethers.splice(i, 1);
          }
        });

        // Remove any elements we were using for convenience from the DOM
        if (tethers.length === 0) {
          removeUtilElements();
        }
      }
    }, {
      key: 'updateAttachClasses',
      value: function updateAttachClasses(elementAttach, targetAttach) {
        var _this6 = this;

        elementAttach = elementAttach || this.attachment;
        targetAttach = targetAttach || this.targetAttachment;
        var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];

        if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
          // updateAttachClasses can be called more than once in a position call, so
          // we need to clean up after ourselves such that when the last defer gets
          // ran it doesn't add any extra classes from previous calls.
          this._addAttachClasses.splice(0, this._addAttachClasses.length);
        }

        if (typeof this._addAttachClasses === 'undefined') {
          this._addAttachClasses = [];
        }
        var add = this._addAttachClasses;

        if (elementAttach.top) {
          add.push(this.getClass('element-attached') + '-' + elementAttach.top);
        }
        if (elementAttach.left) {
          add.push(this.getClass('element-attached') + '-' + elementAttach.left);
        }
        if (targetAttach.top) {
          add.push(this.getClass('target-attached') + '-' + targetAttach.top);
        }
        if (targetAttach.left) {
          add.push(this.getClass('target-attached') + '-' + targetAttach.left);
        }

        var all = [];
        sides.forEach(function (side) {
          all.push(_this6.getClass('element-attached') + '-' + side);
          all.push(_this6.getClass('target-attached') + '-' + side);
        });

        defer(function () {
          if (!(typeof _this6._addAttachClasses !== 'undefined')) {
            return;
          }

          updateClasses(_this6.element, _this6._addAttachClasses, all);
          if (!(_this6.options.addTargetClasses === false)) {
            updateClasses(_this6.target, _this6._addAttachClasses, all);
          }

          delete _this6._addAttachClasses;
        });
      }
    }, {
      key: 'position',
      value: function position() {
        var _this7 = this;

        var flushChanges = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

        // flushChanges commits the changes immediately, leave true unless you are positioning multiple
        // tethers (in which case call Tether.Utils.flush yourself when you're done)

        if (!this.enabled) {
          return;
        }

        this.clearCache();

        // Turn 'auto' attachments into the appropriate corner or edge
        var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);

        this.updateAttachClasses(this.attachment, targetAttachment);

        var elementPos = this.cache('element-bounds', function () {
          return getBounds(_this7.element);
        });

        var width = elementPos.width;
        var height = elementPos.height;

        if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
          var _lastSize = this.lastSize;

          // We cache the height and width to make it possible to position elements that are
          // getting hidden.
          width = _lastSize.width;
          height = _lastSize.height;
        } else {
          this.lastSize = { width: width, height: height };
        }

        var targetPos = this.cache('target-bounds', function () {
          return _this7.getTargetBounds();
        });
        var targetSize = targetPos;

        // Get an actual px offset from the attachment
        var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
        var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);

        var manualOffset = offsetToPx(this.offset, { width: width, height: height });
        var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);

        // Add the manually provided offset
        offset = addOffset(offset, manualOffset);
        targetOffset = addOffset(targetOffset, manualTargetOffset);

        // It's now our goal to make (element position + offset) == (target position + target offset)
        var left = targetPos.left + targetOffset.left - offset.left;
        var top = targetPos.top + targetOffset.top - offset.top;

        for (var i = 0; i < TetherBase.modules.length; ++i) {
          var _module2 = TetherBase.modules[i];
          var ret = _module2.position.call(this, {
            left: left,
            top: top,
            targetAttachment: targetAttachment,
            targetPos: targetPos,
            elementPos: elementPos,
            offset: offset,
            targetOffset: targetOffset,
            manualOffset: manualOffset,
            manualTargetOffset: manualTargetOffset,
            scrollbarSize: scrollbarSize,
            attachment: this.attachment
          });

          if (ret === false) {
            return false;
          } else if (typeof ret === 'undefined' || (typeof ret === 'undefined' ? 'undefined' : _typeof(ret)) !== 'object') {
            continue;
          } else {
            top = ret.top;
            left = ret.left;
          }
        }

        // We describe the position three different ways to give the optimizer
        // a chance to decide the best possible way to position the element
        // with the fewest repaints.
        var next = {
          // It's position relative to the page (absolute positioning when
          // the element is a child of the body)
          page: {
            top: top,
            left: left
          },

          // It's position relative to the viewport (fixed positioning)
          viewport: {
            top: top - pageYOffset,
            bottom: pageYOffset - top - height + innerHeight,
            left: left - pageXOffset,
            right: pageXOffset - left - width + innerWidth
          }
        };

        var doc = this.target.ownerDocument;
        var win = doc.defaultView;

        var scrollbarSize = undefined;
        if (win.innerHeight > doc.documentElement.clientHeight) {
          scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
          next.viewport.bottom -= scrollbarSize.height;
        }

        if (win.innerWidth > doc.documentElement.clientWidth) {
          scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
          next.viewport.right -= scrollbarSize.width;
        }

        if (['', 'static'].indexOf(doc.body.style.position) === -1 || ['', 'static'].indexOf(doc.body.parentElement.style.position) === -1) {
          // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
          next.page.bottom = doc.body.scrollHeight - top - height;
          next.page.right = doc.body.scrollWidth - left - width;
        }

        if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
          (function () {
            var offsetParent = _this7.cache('target-offsetparent', function () {
              return getOffsetParent(_this7.target);
            });
            var offsetPosition = _this7.cache('target-offsetparent-bounds', function () {
              return getBounds(offsetParent);
            });
            var offsetParentStyle = getComputedStyle(offsetParent);
            var offsetParentSize = offsetPosition;

            var offsetBorder = {};
            ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
              offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
            });

            offsetPosition.right = doc.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
            offsetPosition.bottom = doc.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

            if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
              if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
                // We're within the visible part of the target's scroll parent
                var scrollTop = offsetParent.scrollTop;
                var scrollLeft = offsetParent.scrollLeft;

                // It's position relative to the target's offset parent (absolute positioning when
                // the element is moved to be a child of the target's offset parent).
                next.offset = {
                  top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
                  left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
                };
              }
            }
          })();
        }

        // We could also travel up the DOM and try each containing context, rather than only
        // looking at the body, but we're gonna get diminishing returns.

        this.move(next);

        this.history.unshift(next);

        if (this.history.length > 3) {
          this.history.pop();
        }

        if (flushChanges) {
          flush();
        }

        return true;
      }

      // THE ISSUE
    }, {
      key: 'move',
      value: function move(pos) {
        var _this8 = this;

        if (!(typeof this.element.parentNode !== 'undefined')) {
          return;
        }

        var same = {};

        for (var type in pos) {
          same[type] = {};

          for (var key in pos[type]) {
            var found = false;

            for (var i = 0; i < this.history.length; ++i) {
              var point = this.history[i];
              if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
                found = true;
                break;
              }
            }

            if (!found) {
              same[type][key] = true;
            }
          }
        }

        var css = { top: '', left: '', right: '', bottom: '' };

        var transcribe = function transcribe(_same, _pos) {
          var hasOptimizations = typeof _this8.options.optimizations !== 'undefined';
          var gpu = hasOptimizations ? _this8.options.optimizations.gpu : null;
          if (gpu !== false) {
            var yPos = undefined,
                xPos = undefined;
            if (_same.top) {
              css.top = 0;
              yPos = _pos.top;
            } else {
              css.bottom = 0;
              yPos = -_pos.bottom;
            }

            if (_same.left) {
              css.left = 0;
              xPos = _pos.left;
            } else {
              css.right = 0;
              xPos = -_pos.right;
            }

            if (window.matchMedia) {
              // HubSpot/tether#207
              var retina = window.matchMedia('only screen and (min-resolution: 1.3dppx)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3)').matches;
              if (!retina) {
                xPos = Math.round(xPos);
                yPos = Math.round(yPos);
              }
            }

            css[transformKey] = 'translateX(' + xPos + 'px) translateY(' + yPos + 'px)';

            if (transformKey !== 'msTransform') {
              // The Z transform will keep this in the GPU (faster, and prevents artifacts),
              // but IE9 doesn't support 3d transforms and will choke.
              css[transformKey] += " translateZ(0)";
            }
          } else {
            if (_same.top) {
              css.top = _pos.top + 'px';
            } else {
              css.bottom = _pos.bottom + 'px';
            }

            if (_same.left) {
              css.left = _pos.left + 'px';
            } else {
              css.right = _pos.right + 'px';
            }
          }
        };

        var moved = false;
        if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
          css.position = 'absolute';
          transcribe(same.page, pos.page);
        } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
          css.position = 'fixed';
          transcribe(same.viewport, pos.viewport);
        } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
          (function () {
            css.position = 'absolute';
            var offsetParent = _this8.cache('target-offsetparent', function () {
              return getOffsetParent(_this8.target);
            });

            if (getOffsetParent(_this8.element) !== offsetParent) {
              defer(function () {
                _this8.element.parentNode.removeChild(_this8.element);
                offsetParent.appendChild(_this8.element);
              });
            }

            transcribe(same.offset, pos.offset);
            moved = true;
          })();
        } else {
          css.position = 'absolute';
          transcribe({ top: true, left: true }, pos.page);
        }

        if (!moved) {
          if (this.options.bodyElement) {
            this.options.bodyElement.appendChild(this.element);
          } else {
            var offsetParentIsBody = true;
            var currentNode = this.element.parentNode;
            while (currentNode && currentNode.nodeType === 1 && currentNode.tagName !== 'BODY') {
              if (getComputedStyle(currentNode).position !== 'static') {
                offsetParentIsBody = false;
                break;
              }

              currentNode = currentNode.parentNode;
            }

            if (!offsetParentIsBody) {
              this.element.parentNode.removeChild(this.element);
              this.element.ownerDocument.body.appendChild(this.element);
            }
          }
        }

        // Any css change will trigger a repaint, so let's avoid one if nothing changed
        var writeCSS = {};
        var write = false;
        for (var key in css) {
          var val = css[key];
          var elVal = this.element.style[key];

          if (elVal !== val) {
            write = true;
            writeCSS[key] = val;
          }
        }

        if (write) {
          defer(function () {
            extend(_this8.element.style, writeCSS);
            _this8.trigger('repositioned');
          });
        }
      }
    }]);

    return TetherClass;
  }(Evented);

  TetherClass.modules = [];

  TetherBase.position = position;

  var Tether = extend(TetherClass, TetherBase);
  /* globals TetherBase */

  'use strict';

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;_e = err;
      } finally {
        try {
          if (!_n && _i['return']) _i['return']();
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError('Invalid attempt to destructure non-iterable instance');
      }
    };
  }();

  var _TetherBase$Utils = TetherBase.Utils;
  var getBounds = _TetherBase$Utils.getBounds;
  var extend = _TetherBase$Utils.extend;
  var updateClasses = _TetherBase$Utils.updateClasses;
  var defer = _TetherBase$Utils.defer;

  var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

  function getBoundingRect(tether, to) {
    if (to === 'scrollParent') {
      to = tether.scrollParents[0];
    } else if (to === 'window') {
      to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
    }

    if (to === document) {
      to = to.documentElement;
    }

    if (typeof to.nodeType !== 'undefined') {
      (function () {
        var node = to;
        var size = getBounds(to);
        var pos = size;
        var style = getComputedStyle(to);

        to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];

        // Account any parent Frames scroll offset
        if (node.ownerDocument !== document) {
          var win = node.ownerDocument.defaultView;
          to[0] += win.pageXOffset;
          to[1] += win.pageYOffset;
          to[2] += win.pageXOffset;
          to[3] += win.pageYOffset;
        }

        BOUNDS_FORMAT.forEach(function (side, i) {
          side = side[0].toUpperCase() + side.substr(1);
          if (side === 'Top' || side === 'Left') {
            to[i] += parseFloat(style['border' + side + 'Width']);
          } else {
            to[i] -= parseFloat(style['border' + side + 'Width']);
          }
        });
      })();
    }

    return to;
  }

  TetherBase.modules.push({
    position: function position(_ref) {
      var _this = this;

      var top = _ref.top;
      var left = _ref.left;
      var targetAttachment = _ref.targetAttachment;

      if (!this.options.constraints) {
        return true;
      }

      var _cache = this.cache('element-bounds', function () {
        return getBounds(_this.element);
      });

      var height = _cache.height;
      var width = _cache.width;

      if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
        var _lastSize = this.lastSize;

        // Handle the item getting hidden as a result of our positioning without glitching
        // the classes in and out
        width = _lastSize.width;
        height = _lastSize.height;
      }

      var targetSize = this.cache('target-bounds', function () {
        return _this.getTargetBounds();
      });

      var targetHeight = targetSize.height;
      var targetWidth = targetSize.width;

      var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];

      this.options.constraints.forEach(function (constraint) {
        var outOfBoundsClass = constraint.outOfBoundsClass;
        var pinnedClass = constraint.pinnedClass;

        if (outOfBoundsClass) {
          allClasses.push(outOfBoundsClass);
        }
        if (pinnedClass) {
          allClasses.push(pinnedClass);
        }
      });

      allClasses.forEach(function (cls) {
        ['left', 'top', 'right', 'bottom'].forEach(function (side) {
          allClasses.push(cls + '-' + side);
        });
      });

      var addClasses = [];

      var tAttachment = extend({}, targetAttachment);
      var eAttachment = extend({}, this.attachment);

      this.options.constraints.forEach(function (constraint) {
        var to = constraint.to;
        var attachment = constraint.attachment;
        var pin = constraint.pin;

        if (typeof attachment === 'undefined') {
          attachment = '';
        }

        var changeAttachX = undefined,
            changeAttachY = undefined;
        if (attachment.indexOf(' ') >= 0) {
          var _attachment$split = attachment.split(' ');

          var _attachment$split2 = _slicedToArray(_attachment$split, 2);

          changeAttachY = _attachment$split2[0];
          changeAttachX = _attachment$split2[1];
        } else {
          changeAttachX = changeAttachY = attachment;
        }

        var bounds = getBoundingRect(_this, to);

        if (changeAttachY === 'target' || changeAttachY === 'both') {
          if (top < bounds[1] && tAttachment.top === 'top') {
            top += targetHeight;
            tAttachment.top = 'bottom';
          }

          if (top + height > bounds[3] && tAttachment.top === 'bottom') {
            top -= targetHeight;
            tAttachment.top = 'top';
          }
        }

        if (changeAttachY === 'together') {
          if (tAttachment.top === 'top') {
            if (eAttachment.top === 'bottom' && top < bounds[1]) {
              top += targetHeight;
              tAttachment.top = 'bottom';

              top += height;
              eAttachment.top = 'top';
            } else if (eAttachment.top === 'top' && top + height > bounds[3] && top - (height - targetHeight) >= bounds[1]) {
              top -= height - targetHeight;
              tAttachment.top = 'bottom';

              eAttachment.top = 'bottom';
            }
          }

          if (tAttachment.top === 'bottom') {
            if (eAttachment.top === 'top' && top + height > bounds[3]) {
              top -= targetHeight;
              tAttachment.top = 'top';

              top -= height;
              eAttachment.top = 'bottom';
            } else if (eAttachment.top === 'bottom' && top < bounds[1] && top + (height * 2 - targetHeight) <= bounds[3]) {
              top += height - targetHeight;
              tAttachment.top = 'top';

              eAttachment.top = 'top';
            }
          }

          if (tAttachment.top === 'middle') {
            if (top + height > bounds[3] && eAttachment.top === 'top') {
              top -= height;
              eAttachment.top = 'bottom';
            } else if (top < bounds[1] && eAttachment.top === 'bottom') {
              top += height;
              eAttachment.top = 'top';
            }
          }
        }

        if (changeAttachX === 'target' || changeAttachX === 'both') {
          if (left < bounds[0] && tAttachment.left === 'left') {
            left += targetWidth;
            tAttachment.left = 'right';
          }

          if (left + width > bounds[2] && tAttachment.left === 'right') {
            left -= targetWidth;
            tAttachment.left = 'left';
          }
        }

        if (changeAttachX === 'together') {
          if (left < bounds[0] && tAttachment.left === 'left') {
            if (eAttachment.left === 'right') {
              left += targetWidth;
              tAttachment.left = 'right';

              left += width;
              eAttachment.left = 'left';
            } else if (eAttachment.left === 'left') {
              left += targetWidth;
              tAttachment.left = 'right';

              left -= width;
              eAttachment.left = 'right';
            }
          } else if (left + width > bounds[2] && tAttachment.left === 'right') {
            if (eAttachment.left === 'left') {
              left -= targetWidth;
              tAttachment.left = 'left';

              left -= width;
              eAttachment.left = 'right';
            } else if (eAttachment.left === 'right') {
              left -= targetWidth;
              tAttachment.left = 'left';

              left += width;
              eAttachment.left = 'left';
            }
          } else if (tAttachment.left === 'center') {
            if (left + width > bounds[2] && eAttachment.left === 'left') {
              left -= width;
              eAttachment.left = 'right';
            } else if (left < bounds[0] && eAttachment.left === 'right') {
              left += width;
              eAttachment.left = 'left';
            }
          }
        }

        if (changeAttachY === 'element' || changeAttachY === 'both') {
          if (top < bounds[1] && eAttachment.top === 'bottom') {
            top += height;
            eAttachment.top = 'top';
          }

          if (top + height > bounds[3] && eAttachment.top === 'top') {
            top -= height;
            eAttachment.top = 'bottom';
          }
        }

        if (changeAttachX === 'element' || changeAttachX === 'both') {
          if (left < bounds[0]) {
            if (eAttachment.left === 'right') {
              left += width;
              eAttachment.left = 'left';
            } else if (eAttachment.left === 'center') {
              left += width / 2;
              eAttachment.left = 'left';
            }
          }

          if (left + width > bounds[2]) {
            if (eAttachment.left === 'left') {
              left -= width;
              eAttachment.left = 'right';
            } else if (eAttachment.left === 'center') {
              left -= width / 2;
              eAttachment.left = 'right';
            }
          }
        }

        if (typeof pin === 'string') {
          pin = pin.split(',').map(function (p) {
            return p.trim();
          });
        } else if (pin === true) {
          pin = ['top', 'left', 'right', 'bottom'];
        }

        pin = pin || [];

        var pinned = [];
        var oob = [];

        if (top < bounds[1]) {
          if (pin.indexOf('top') >= 0) {
            top = bounds[1];
            pinned.push('top');
          } else {
            oob.push('top');
          }
        }

        if (top + height > bounds[3]) {
          if (pin.indexOf('bottom') >= 0) {
            top = bounds[3] - height;
            pinned.push('bottom');
          } else {
            oob.push('bottom');
          }
        }

        if (left < bounds[0]) {
          if (pin.indexOf('left') >= 0) {
            left = bounds[0];
            pinned.push('left');
          } else {
            oob.push('left');
          }
        }

        if (left + width > bounds[2]) {
          if (pin.indexOf('right') >= 0) {
            left = bounds[2] - width;
            pinned.push('right');
          } else {
            oob.push('right');
          }
        }

        if (pinned.length) {
          (function () {
            var pinnedClass = undefined;
            if (typeof _this.options.pinnedClass !== 'undefined') {
              pinnedClass = _this.options.pinnedClass;
            } else {
              pinnedClass = _this.getClass('pinned');
            }

            addClasses.push(pinnedClass);
            pinned.forEach(function (side) {
              addClasses.push(pinnedClass + '-' + side);
            });
          })();
        }

        if (oob.length) {
          (function () {
            var oobClass = undefined;
            if (typeof _this.options.outOfBoundsClass !== 'undefined') {
              oobClass = _this.options.outOfBoundsClass;
            } else {
              oobClass = _this.getClass('out-of-bounds');
            }

            addClasses.push(oobClass);
            oob.forEach(function (side) {
              addClasses.push(oobClass + '-' + side);
            });
          })();
        }

        if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
          eAttachment.left = tAttachment.left = false;
        }
        if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
          eAttachment.top = tAttachment.top = false;
        }

        if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
          _this.updateAttachClasses(eAttachment, tAttachment);
          _this.trigger('update', {
            attachment: eAttachment,
            targetAttachment: tAttachment
          });
        }
      });

      defer(function () {
        if (!(_this.options.addTargetClasses === false)) {
          updateClasses(_this.target, addClasses, allClasses);
        }
        updateClasses(_this.element, addClasses, allClasses);
      });

      return { top: top, left: left };
    }
  });
  /* globals TetherBase */

  'use strict';

  var _TetherBase$Utils = TetherBase.Utils;
  var getBounds = _TetherBase$Utils.getBounds;
  var updateClasses = _TetherBase$Utils.updateClasses;
  var defer = _TetherBase$Utils.defer;

  TetherBase.modules.push({
    position: function position(_ref) {
      var _this = this;

      var top = _ref.top;
      var left = _ref.left;

      var _cache = this.cache('element-bounds', function () {
        return getBounds(_this.element);
      });

      var height = _cache.height;
      var width = _cache.width;

      var targetPos = this.getTargetBounds();

      var bottom = top + height;
      var right = left + width;

      var abutted = [];
      if (top <= targetPos.bottom && bottom >= targetPos.top) {
        ['left', 'right'].forEach(function (side) {
          var targetPosSide = targetPos[side];
          if (targetPosSide === left || targetPosSide === right) {
            abutted.push(side);
          }
        });
      }

      if (left <= targetPos.right && right >= targetPos.left) {
        ['top', 'bottom'].forEach(function (side) {
          var targetPosSide = targetPos[side];
          if (targetPosSide === top || targetPosSide === bottom) {
            abutted.push(side);
          }
        });
      }

      var allClasses = [];
      var addClasses = [];

      var sides = ['left', 'top', 'right', 'bottom'];
      allClasses.push(this.getClass('abutted'));
      sides.forEach(function (side) {
        allClasses.push(_this.getClass('abutted') + '-' + side);
      });

      if (abutted.length) {
        addClasses.push(this.getClass('abutted'));
      }

      abutted.forEach(function (side) {
        addClasses.push(_this.getClass('abutted') + '-' + side);
      });

      defer(function () {
        if (!(_this.options.addTargetClasses === false)) {
          updateClasses(_this.target, addClasses, allClasses);
        }
        updateClasses(_this.element, addClasses, allClasses);
      });

      return true;
    }
  });
  /* globals TetherBase */

  'use strict';

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;_e = err;
      } finally {
        try {
          if (!_n && _i['return']) _i['return']();
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError('Invalid attempt to destructure non-iterable instance');
      }
    };
  }();

  TetherBase.modules.push({
    position: function position(_ref) {
      var top = _ref.top;
      var left = _ref.left;

      if (!this.options.shift) {
        return;
      }

      var shift = this.options.shift;
      if (typeof this.options.shift === 'function') {
        shift = this.options.shift.call(this, { top: top, left: left });
      }

      var shiftTop = undefined,
          shiftLeft = undefined;
      if (typeof shift === 'string') {
        shift = shift.split(' ');
        shift[1] = shift[1] || shift[0];

        var _shift = shift;

        var _shift2 = _slicedToArray(_shift, 2);

        shiftTop = _shift2[0];
        shiftLeft = _shift2[1];

        shiftTop = parseFloat(shiftTop, 10);
        shiftLeft = parseFloat(shiftLeft, 10);
      } else {
        shiftTop = shift.top;
        shiftLeft = shift.left;
      }

      top += shiftTop;
      left += shiftLeft;

      return { top: top, left: left };
    }
  });
  return Tether;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3N0YXJ0Ym9vdHN0cmFwLW5ldy1hZ2UtNC1kZXYvdmVuZG9yL3RldGhlci90ZXRoZXIuanMiXSwibmFtZXMiOlsicm9vdCIsImZhY3RvcnkiLCJkZWZpbmUiLCJhbWQiLCJleHBvcnRzIiwibW9kdWxlIiwicmVxdWlyZSIsIlRldGhlciIsIl9jcmVhdGVDbGFzcyIsImRlZmluZVByb3BlcnRpZXMiLCJ0YXJnZXQiLCJwcm9wcyIsImkiLCJsZW5ndGgiLCJkZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJrZXkiLCJDb25zdHJ1Y3RvciIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsInByb3RvdHlwZSIsIl9jbGFzc0NhbGxDaGVjayIsImluc3RhbmNlIiwiVHlwZUVycm9yIiwiVGV0aGVyQmFzZSIsInVuZGVmaW5lZCIsIm1vZHVsZXMiLCJ6ZXJvRWxlbWVudCIsImdldEFjdHVhbEJvdW5kaW5nQ2xpZW50UmVjdCIsIm5vZGUiLCJib3VuZGluZ1JlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJyZWN0IiwiayIsIm93bmVyRG9jdW1lbnQiLCJkb2N1bWVudCIsIl9mcmFtZUVsZW1lbnQiLCJkZWZhdWx0VmlldyIsImZyYW1lRWxlbWVudCIsImZyYW1lUmVjdCIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsImdldFNjcm9sbFBhcmVudHMiLCJlbCIsImNvbXB1dGVkU3R5bGUiLCJnZXRDb21wdXRlZFN0eWxlIiwicG9zaXRpb24iLCJwYXJlbnRzIiwicGFyZW50IiwicGFyZW50Tm9kZSIsIm5vZGVUeXBlIiwic3R5bGUiLCJlcnIiLCJwdXNoIiwiX3N0eWxlIiwib3ZlcmZsb3ciLCJvdmVyZmxvd1giLCJvdmVyZmxvd1kiLCJ0ZXN0IiwiaW5kZXhPZiIsImJvZHkiLCJ1bmlxdWVJZCIsImlkIiwiemVyb1Bvc0NhY2hlIiwiZ2V0T3JpZ2luIiwiY29udGFpbnMiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiZXh0ZW5kIiwiYXBwZW5kQ2hpbGQiLCJnZXRBdHRyaWJ1dGUiLCJkZWZlciIsInJlbW92ZVV0aWxFbGVtZW50cyIsInJlbW92ZUNoaWxkIiwiZ2V0Qm91bmRzIiwiZG9jIiwiZG9jdW1lbnRFbGVtZW50IiwiZG9jRWwiLCJib3giLCJvcmlnaW4iLCJ3aWR0aCIsInNjcm9sbFdpZHRoIiwiaGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwiY2xpZW50VG9wIiwiY2xpZW50TGVmdCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiZ2V0T2Zmc2V0UGFyZW50Iiwib2Zmc2V0UGFyZW50IiwiX3Njcm9sbEJhclNpemUiLCJnZXRTY3JvbGxCYXJTaXplIiwiaW5uZXIiLCJvdXRlciIsInBvaW50ZXJFdmVudHMiLCJ2aXNpYmlsaXR5Iiwid2lkdGhDb250YWluZWQiLCJvZmZzZXRXaWR0aCIsIndpZHRoU2Nyb2xsIiwib3V0IiwiYXJndW1lbnRzIiwiYXJncyIsIkFycmF5IiwiYXBwbHkiLCJzbGljZSIsImZvckVhY2giLCJvYmoiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJyZW1vdmVDbGFzcyIsIm5hbWUiLCJjbGFzc0xpc3QiLCJzcGxpdCIsImNscyIsInRyaW0iLCJyZW1vdmUiLCJyZWdleCIsIlJlZ0V4cCIsImpvaW4iLCJjbGFzc05hbWUiLCJnZXRDbGFzc05hbWUiLCJyZXBsYWNlIiwic2V0Q2xhc3NOYW1lIiwiYWRkQ2xhc3MiLCJhZGQiLCJoYXNDbGFzcyIsIlNWR0FuaW1hdGVkU3RyaW5nIiwiYmFzZVZhbCIsInVwZGF0ZUNsYXNzZXMiLCJhbGwiLCJkZWZlcnJlZCIsImZuIiwiZmx1c2giLCJwb3AiLCJFdmVudGVkIiwidmFsdWUiLCJvbiIsImV2ZW50IiwiaGFuZGxlciIsImN0eCIsIm9uY2UiLCJiaW5kaW5ncyIsIm9mZiIsInNwbGljZSIsInRyaWdnZXIiLCJfbGVuIiwiX2tleSIsIl9iaW5kaW5ncyRldmVudCRpIiwiY29udGV4dCIsIlV0aWxzIiwiX3NsaWNlZFRvQXJyYXkiLCJzbGljZUl0ZXJhdG9yIiwiYXJyIiwiX2FyciIsIl9uIiwiX2QiLCJfZSIsIl9pIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJfcyIsIm5leHQiLCJkb25lIiwiaXNBcnJheSIsIl9nZXQiLCJnZXQiLCJfeDYiLCJfeDciLCJfeDgiLCJfYWdhaW4iLCJfZnVuY3Rpb24iLCJvYmplY3QiLCJwcm9wZXJ0eSIsInJlY2VpdmVyIiwiRnVuY3Rpb24iLCJkZXNjIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZ2V0UHJvdG90eXBlT2YiLCJnZXR0ZXIiLCJfaW5oZXJpdHMiLCJzdWJDbGFzcyIsInN1cGVyQ2xhc3MiLCJjcmVhdGUiLCJjb25zdHJ1Y3RvciIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiRXJyb3IiLCJfVGV0aGVyQmFzZSRVdGlscyIsIndpdGhpbiIsImEiLCJiIiwiZGlmZiIsInRyYW5zZm9ybUtleSIsInRyYW5zZm9ybXMiLCJ0ZXRoZXJzIiwidGV0aGVyIiwibm93IiwicGVyZm9ybWFuY2UiLCJEYXRlIiwibGFzdENhbGwiLCJsYXN0RHVyYXRpb24iLCJwZW5kaW5nVGltZW91dCIsInRpY2siLCJNYXRoIiwibWluIiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJNSVJST1JfTFIiLCJjZW50ZXIiLCJNSVJST1JfVEIiLCJtaWRkbGUiLCJPRkZTRVRfTUFQIiwiYXV0b1RvRml4ZWRBdHRhY2htZW50IiwiYXR0YWNobWVudCIsInJlbGF0aXZlVG9BdHRhY2htZW50IiwiYXR0YWNobWVudFRvT2Zmc2V0IiwiYWRkT2Zmc2V0Iiwib2Zmc2V0cyIsIl9yZWYiLCJwYXJzZUZsb2F0Iiwib2Zmc2V0VG9QeCIsIm9mZnNldCIsInNpemUiLCJwYXJzZU9mZnNldCIsIl92YWx1ZSRzcGxpdCIsIl92YWx1ZSRzcGxpdDIiLCJwYXJzZUF0dGFjaG1lbnQiLCJUZXRoZXJDbGFzcyIsIl9FdmVudGVkIiwib3B0aW9ucyIsIl90aGlzIiwiYmluZCIsImhpc3RvcnkiLCJzZXRPcHRpb25zIiwiaW5pdGlhbGl6ZSIsImdldENsYXNzIiwiY2xhc3NlcyIsImNsYXNzUHJlZml4IiwiX3RoaXMyIiwicG9zIiwiZGVmYXVsdHMiLCJ0YXJnZXRPZmZzZXQiLCJ0YXJnZXRBdHRhY2htZW50IiwiX29wdGlvbnMiLCJlbGVtZW50IiwidGFyZ2V0TW9kaWZpZXIiLCJqcXVlcnkiLCJxdWVyeVNlbGVjdG9yIiwiYWRkVGFyZ2V0Q2xhc3NlcyIsInNjcm9sbFBhcmVudHMiLCJkaXNhYmxlIiwiZW5hYmxlZCIsImVuYWJsZSIsImdldFRhcmdldEJvdW5kcyIsInBhZ2VZT2Zmc2V0IiwicGFnZVhPZmZzZXQiLCJpbm5lckhlaWdodCIsImlubmVyV2lkdGgiLCJib3VuZHMiLCJoYXNCb3R0b21TY3JvbGwiLCJzY3JvbGxCb3R0b20iLCJib3JkZXJUb3BXaWR0aCIsImJvcmRlckJvdHRvbVdpZHRoIiwiYm9yZGVyTGVmdFdpZHRoIiwiZml0QWRqIiwicG93IiwibWF4Iiwic2Nyb2xsUGVyY2VudGFnZSIsInNjcm9sbFRvcCIsImNsZWFyQ2FjaGUiLCJfY2FjaGUiLCJjYWNoZSIsIl90aGlzMyIsIl90aGlzNCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkZXN0cm95IiwiX3RoaXM1IiwidXBkYXRlQXR0YWNoQ2xhc3NlcyIsImVsZW1lbnRBdHRhY2giLCJ0YXJnZXRBdHRhY2giLCJfdGhpczYiLCJzaWRlcyIsIl9hZGRBdHRhY2hDbGFzc2VzIiwic2lkZSIsIl90aGlzNyIsImZsdXNoQ2hhbmdlcyIsImVsZW1lbnRQb3MiLCJsYXN0U2l6ZSIsIl9sYXN0U2l6ZSIsInRhcmdldFBvcyIsInRhcmdldFNpemUiLCJtYW51YWxPZmZzZXQiLCJtYW51YWxUYXJnZXRPZmZzZXQiLCJfbW9kdWxlMiIsInJldCIsInNjcm9sbGJhclNpemUiLCJwYWdlIiwidmlld3BvcnQiLCJ3aW4iLCJwYXJlbnRFbGVtZW50Iiwib3B0aW1pemF0aW9ucyIsIm1vdmVFbGVtZW50Iiwib2Zmc2V0UG9zaXRpb24iLCJvZmZzZXRQYXJlbnRTdHlsZSIsIm9mZnNldFBhcmVudFNpemUiLCJvZmZzZXRCb3JkZXIiLCJ0b0xvd2VyQ2FzZSIsInNjcm9sbExlZnQiLCJtb3ZlIiwidW5zaGlmdCIsIl90aGlzOCIsInNhbWUiLCJ0eXBlIiwiZm91bmQiLCJwb2ludCIsImNzcyIsInRyYW5zY3JpYmUiLCJfc2FtZSIsIl9wb3MiLCJoYXNPcHRpbWl6YXRpb25zIiwiZ3B1IiwieVBvcyIsInhQb3MiLCJtYXRjaE1lZGlhIiwicmV0aW5hIiwibWF0Y2hlcyIsInJvdW5kIiwibW92ZWQiLCJib2R5RWxlbWVudCIsIm9mZnNldFBhcmVudElzQm9keSIsImN1cnJlbnROb2RlIiwidGFnTmFtZSIsIndyaXRlQ1NTIiwid3JpdGUiLCJ2YWwiLCJlbFZhbCIsIkJPVU5EU19GT1JNQVQiLCJnZXRCb3VuZGluZ1JlY3QiLCJ0byIsInRvVXBwZXJDYXNlIiwic3Vic3RyIiwiY29uc3RyYWludHMiLCJ0YXJnZXRIZWlnaHQiLCJ0YXJnZXRXaWR0aCIsImFsbENsYXNzZXMiLCJjb25zdHJhaW50Iiwib3V0T2ZCb3VuZHNDbGFzcyIsInBpbm5lZENsYXNzIiwiYWRkQ2xhc3NlcyIsInRBdHRhY2htZW50IiwiZUF0dGFjaG1lbnQiLCJwaW4iLCJjaGFuZ2VBdHRhY2hYIiwiY2hhbmdlQXR0YWNoWSIsIl9hdHRhY2htZW50JHNwbGl0IiwiX2F0dGFjaG1lbnQkc3BsaXQyIiwibWFwIiwicCIsInBpbm5lZCIsIm9vYiIsIm9vYkNsYXNzIiwiYWJ1dHRlZCIsInRhcmdldFBvc1NpZGUiLCJzaGlmdCIsInNoaWZ0VG9wIiwic2hpZnRMZWZ0IiwiX3NoaWZ0IiwiX3NoaWZ0MiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztBQUVDLFdBQVNBLElBQVQsRUFBZUMsT0FBZixFQUF3QjtBQUN2QixNQUFJLE9BQU9DLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0NB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RDtBQXRDcUIsR0FBeEI7QUF3Q0EsU0FBT3ZDLE1BQVA7QUFFQyxDQWh4REEsQ0FBRCIsImZpbGUiOiJ0ZXRoZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgdGV0aGVyIDEuNC4wICovXG5cbihmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMsIG1vZHVsZSk7XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5UZXRoZXIgPSBmYWN0b3J5KCk7XG4gIH1cbn0odGhpcywgZnVuY3Rpb24ocmVxdWlyZSwgZXhwb3J0cywgbW9kdWxlKSB7XG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbnZhciBUZXRoZXJCYXNlID0gdW5kZWZpbmVkO1xuaWYgKHR5cGVvZiBUZXRoZXJCYXNlID09PSAndW5kZWZpbmVkJykge1xuICBUZXRoZXJCYXNlID0geyBtb2R1bGVzOiBbXSB9O1xufVxuXG52YXIgemVyb0VsZW1lbnQgPSBudWxsO1xuXG4vLyBTYW1lIGFzIG5hdGl2ZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QsIGV4Y2VwdCBpdCB0YWtlcyBpbnRvIGFjY291bnQgcGFyZW50IDxmcmFtZT4gb2Zmc2V0c1xuLy8gaWYgdGhlIGVsZW1lbnQgbGllcyB3aXRoaW4gYSBuZXN0ZWQgZG9jdW1lbnQgKDxmcmFtZT4gb3IgPGlmcmFtZT4tbGlrZSkuXG5mdW5jdGlvbiBnZXRBY3R1YWxCb3VuZGluZ0NsaWVudFJlY3Qobm9kZSkge1xuICB2YXIgYm91bmRpbmdSZWN0ID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAvLyBUaGUgb3JpZ2luYWwgb2JqZWN0IHJldHVybmVkIGJ5IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBpcyBpbW11dGFibGUsIHNvIHdlIGNsb25lIGl0XG4gIC8vIFdlIGNhbid0IHVzZSBleHRlbmQgYmVjYXVzZSB0aGUgcHJvcGVydGllcyBhcmUgbm90IGNvbnNpZGVyZWQgcGFydCBvZiB0aGUgb2JqZWN0IGJ5IGhhc093blByb3BlcnR5IGluIElFOVxuICB2YXIgcmVjdCA9IHt9O1xuICBmb3IgKHZhciBrIGluIGJvdW5kaW5nUmVjdCkge1xuICAgIHJlY3Rba10gPSBib3VuZGluZ1JlY3Rba107XG4gIH1cblxuICBpZiAobm9kZS5vd25lckRvY3VtZW50ICE9PSBkb2N1bWVudCkge1xuICAgIHZhciBfZnJhbWVFbGVtZW50ID0gbm9kZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LmZyYW1lRWxlbWVudDtcbiAgICBpZiAoX2ZyYW1lRWxlbWVudCkge1xuICAgICAgdmFyIGZyYW1lUmVjdCA9IGdldEFjdHVhbEJvdW5kaW5nQ2xpZW50UmVjdChfZnJhbWVFbGVtZW50KTtcbiAgICAgIHJlY3QudG9wICs9IGZyYW1lUmVjdC50b3A7XG4gICAgICByZWN0LmJvdHRvbSArPSBmcmFtZVJlY3QudG9wO1xuICAgICAgcmVjdC5sZWZ0ICs9IGZyYW1lUmVjdC5sZWZ0O1xuICAgICAgcmVjdC5yaWdodCArPSBmcmFtZVJlY3QubGVmdDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVjdDtcbn1cblxuZnVuY3Rpb24gZ2V0U2Nyb2xsUGFyZW50cyhlbCkge1xuICAvLyBJbiBmaXJlZm94IGlmIHRoZSBlbCBpcyBpbnNpZGUgYW4gaWZyYW1lIHdpdGggZGlzcGxheTogbm9uZTsgd2luZG93LmdldENvbXB1dGVkU3R5bGUoKSB3aWxsIHJldHVybiBudWxsO1xuICAvLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAgdmFyIGNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsKSB8fCB7fTtcbiAgdmFyIHBvc2l0aW9uID0gY29tcHV0ZWRTdHlsZS5wb3NpdGlvbjtcbiAgdmFyIHBhcmVudHMgPSBbXTtcblxuICBpZiAocG9zaXRpb24gPT09ICdmaXhlZCcpIHtcbiAgICByZXR1cm4gW2VsXTtcbiAgfVxuXG4gIHZhciBwYXJlbnQgPSBlbDtcbiAgd2hpbGUgKChwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZSkgJiYgcGFyZW50ICYmIHBhcmVudC5ub2RlVHlwZSA9PT0gMSkge1xuICAgIHZhciBzdHlsZSA9IHVuZGVmaW5lZDtcbiAgICB0cnkge1xuICAgICAgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHBhcmVudCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7fVxuXG4gICAgaWYgKHR5cGVvZiBzdHlsZSA9PT0gJ3VuZGVmaW5lZCcgfHwgc3R5bGUgPT09IG51bGwpIHtcbiAgICAgIHBhcmVudHMucHVzaChwYXJlbnQpO1xuICAgICAgcmV0dXJuIHBhcmVudHM7XG4gICAgfVxuXG4gICAgdmFyIF9zdHlsZSA9IHN0eWxlO1xuICAgIHZhciBvdmVyZmxvdyA9IF9zdHlsZS5vdmVyZmxvdztcbiAgICB2YXIgb3ZlcmZsb3dYID0gX3N0eWxlLm92ZXJmbG93WDtcbiAgICB2YXIgb3ZlcmZsb3dZID0gX3N0eWxlLm92ZXJmbG93WTtcblxuICAgIGlmICgvKGF1dG98c2Nyb2xsKS8udGVzdChvdmVyZmxvdyArIG92ZXJmbG93WSArIG92ZXJmbG93WCkpIHtcbiAgICAgIGlmIChwb3NpdGlvbiAhPT0gJ2Fic29sdXRlJyB8fCBbJ3JlbGF0aXZlJywgJ2Fic29sdXRlJywgJ2ZpeGVkJ10uaW5kZXhPZihzdHlsZS5wb3NpdGlvbikgPj0gMCkge1xuICAgICAgICBwYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwYXJlbnRzLnB1c2goZWwub3duZXJEb2N1bWVudC5ib2R5KTtcblxuICAvLyBJZiB0aGUgbm9kZSBpcyB3aXRoaW4gYSBmcmFtZSwgYWNjb3VudCBmb3IgdGhlIHBhcmVudCB3aW5kb3cgc2Nyb2xsXG4gIGlmIChlbC5vd25lckRvY3VtZW50ICE9PSBkb2N1bWVudCkge1xuICAgIHBhcmVudHMucHVzaChlbC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3KTtcbiAgfVxuXG4gIHJldHVybiBwYXJlbnRzO1xufVxuXG52YXIgdW5pcXVlSWQgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgaWQgPSAwO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiArK2lkO1xuICB9O1xufSkoKTtcblxudmFyIHplcm9Qb3NDYWNoZSA9IHt9O1xudmFyIGdldE9yaWdpbiA9IGZ1bmN0aW9uIGdldE9yaWdpbigpIHtcbiAgLy8gZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGlzIHVuZm9ydHVuYXRlbHkgdG9vIGFjY3VyYXRlLiAgSXQgaW50cm9kdWNlcyBhIHBpeGVsIG9yIHR3byBvZlxuICAvLyBqaXR0ZXIgYXMgdGhlIHVzZXIgc2Nyb2xscyB0aGF0IG1lc3NlcyB3aXRoIG91ciBhYmlsaXR5IHRvIGRldGVjdCBpZiB0d28gcG9zaXRpb25zXG4gIC8vIGFyZSBlcXVpdmlsYW50IG9yIG5vdC4gIFdlIHBsYWNlIGFuIGVsZW1lbnQgYXQgdGhlIHRvcCBsZWZ0IG9mIHRoZSBwYWdlIHRoYXQgd2lsbFxuICAvLyBnZXQgdGhlIHNhbWUgaml0dGVyLCBzbyB3ZSBjYW4gY2FuY2VsIHRoZSB0d28gb3V0LlxuICB2YXIgbm9kZSA9IHplcm9FbGVtZW50O1xuICBpZiAoIW5vZGUgfHwgIWRvY3VtZW50LmJvZHkuY29udGFpbnMobm9kZSkpIHtcbiAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGV0aGVyLWlkJywgdW5pcXVlSWQoKSk7XG4gICAgZXh0ZW5kKG5vZGUuc3R5bGUsIHtcbiAgICAgIHRvcDogMCxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub2RlKTtcblxuICAgIHplcm9FbGVtZW50ID0gbm9kZTtcbiAgfVxuXG4gIHZhciBpZCA9IG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXRldGhlci1pZCcpO1xuICBpZiAodHlwZW9mIHplcm9Qb3NDYWNoZVtpZF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgemVyb1Bvc0NhY2hlW2lkXSA9IGdldEFjdHVhbEJvdW5kaW5nQ2xpZW50UmVjdChub2RlKTtcblxuICAgIC8vIENsZWFyIHRoZSBjYWNoZSB3aGVuIHRoaXMgcG9zaXRpb24gY2FsbCBpcyBkb25lXG4gICAgZGVmZXIoZnVuY3Rpb24gKCkge1xuICAgICAgZGVsZXRlIHplcm9Qb3NDYWNoZVtpZF07XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gemVyb1Bvc0NhY2hlW2lkXTtcbn07XG5cbmZ1bmN0aW9uIHJlbW92ZVV0aWxFbGVtZW50cygpIHtcbiAgaWYgKHplcm9FbGVtZW50KSB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh6ZXJvRWxlbWVudCk7XG4gIH1cbiAgemVyb0VsZW1lbnQgPSBudWxsO1xufTtcblxuZnVuY3Rpb24gZ2V0Qm91bmRzKGVsKSB7XG4gIHZhciBkb2MgPSB1bmRlZmluZWQ7XG4gIGlmIChlbCA9PT0gZG9jdW1lbnQpIHtcbiAgICBkb2MgPSBkb2N1bWVudDtcbiAgICBlbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfSBlbHNlIHtcbiAgICBkb2MgPSBlbC5vd25lckRvY3VtZW50O1xuICB9XG5cbiAgdmFyIGRvY0VsID0gZG9jLmRvY3VtZW50RWxlbWVudDtcblxuICB2YXIgYm94ID0gZ2V0QWN0dWFsQm91bmRpbmdDbGllbnRSZWN0KGVsKTtcblxuICB2YXIgb3JpZ2luID0gZ2V0T3JpZ2luKCk7XG5cbiAgYm94LnRvcCAtPSBvcmlnaW4udG9wO1xuICBib3gubGVmdCAtPSBvcmlnaW4ubGVmdDtcblxuICBpZiAodHlwZW9mIGJveC53aWR0aCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBib3gud2lkdGggPSBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoIC0gYm94LmxlZnQgLSBib3gucmlnaHQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBib3guaGVpZ2h0ID09PSAndW5kZWZpbmVkJykge1xuICAgIGJveC5oZWlnaHQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCAtIGJveC50b3AgLSBib3guYm90dG9tO1xuICB9XG5cbiAgYm94LnRvcCA9IGJveC50b3AgLSBkb2NFbC5jbGllbnRUb3A7XG4gIGJveC5sZWZ0ID0gYm94LmxlZnQgLSBkb2NFbC5jbGllbnRMZWZ0O1xuICBib3gucmlnaHQgPSBkb2MuYm9keS5jbGllbnRXaWR0aCAtIGJveC53aWR0aCAtIGJveC5sZWZ0O1xuICBib3guYm90dG9tID0gZG9jLmJvZHkuY2xpZW50SGVpZ2h0IC0gYm94LmhlaWdodCAtIGJveC50b3A7XG5cbiAgcmV0dXJuIGJveDtcbn1cblxuZnVuY3Rpb24gZ2V0T2Zmc2V0UGFyZW50KGVsKSB7XG4gIHJldHVybiBlbC5vZmZzZXRQYXJlbnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xufVxuXG52YXIgX3Njcm9sbEJhclNpemUgPSBudWxsO1xuZnVuY3Rpb24gZ2V0U2Nyb2xsQmFyU2l6ZSgpIHtcbiAgaWYgKF9zY3JvbGxCYXJTaXplKSB7XG4gICAgcmV0dXJuIF9zY3JvbGxCYXJTaXplO1xuICB9XG4gIHZhciBpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBpbm5lci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgaW5uZXIuc3R5bGUuaGVpZ2h0ID0gJzIwMHB4JztcblxuICB2YXIgb3V0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZXh0ZW5kKG91dGVyLnN0eWxlLCB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgdG9wOiAwLFxuICAgIGxlZnQ6IDAsXG4gICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICAgIHdpZHRoOiAnMjAwcHgnLFxuICAgIGhlaWdodDogJzE1MHB4JyxcbiAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgfSk7XG5cbiAgb3V0ZXIuYXBwZW5kQ2hpbGQoaW5uZXIpO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3V0ZXIpO1xuXG4gIHZhciB3aWR0aENvbnRhaW5lZCA9IGlubmVyLm9mZnNldFdpZHRoO1xuICBvdXRlci5zdHlsZS5vdmVyZmxvdyA9ICdzY3JvbGwnO1xuICB2YXIgd2lkdGhTY3JvbGwgPSBpbm5lci5vZmZzZXRXaWR0aDtcblxuICBpZiAod2lkdGhDb250YWluZWQgPT09IHdpZHRoU2Nyb2xsKSB7XG4gICAgd2lkdGhTY3JvbGwgPSBvdXRlci5jbGllbnRXaWR0aDtcbiAgfVxuXG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQob3V0ZXIpO1xuXG4gIHZhciB3aWR0aCA9IHdpZHRoQ29udGFpbmVkIC0gd2lkdGhTY3JvbGw7XG5cbiAgX3Njcm9sbEJhclNpemUgPSB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiB3aWR0aCB9O1xuICByZXR1cm4gX3Njcm9sbEJhclNpemU7XG59XG5cbmZ1bmN0aW9uIGV4dGVuZCgpIHtcbiAgdmFyIG91dCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG4gIHZhciBhcmdzID0gW107XG5cbiAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoYXJncywgYXJndW1lbnRzKTtcblxuICBhcmdzLnNsaWNlKDEpLmZvckVhY2goZnVuY3Rpb24gKG9iaikge1xuICAgIGlmIChvYmopIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKCh7fSkuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgICBvdXRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gb3V0O1xufVxuXG5mdW5jdGlvbiByZW1vdmVDbGFzcyhlbCwgbmFtZSkge1xuICBpZiAodHlwZW9mIGVsLmNsYXNzTGlzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBuYW1lLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoY2xzKSB7XG4gICAgICBpZiAoY2xzLnRyaW0oKSkge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNscyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cCgnKF58ICknICsgbmFtZS5zcGxpdCgnICcpLmpvaW4oJ3wnKSArICcoIHwkKScsICdnaScpO1xuICAgIHZhciBjbGFzc05hbWUgPSBnZXRDbGFzc05hbWUoZWwpLnJlcGxhY2UocmVnZXgsICcgJyk7XG4gICAgc2V0Q2xhc3NOYW1lKGVsLCBjbGFzc05hbWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZENsYXNzKGVsLCBuYW1lKSB7XG4gIGlmICh0eXBlb2YgZWwuY2xhc3NMaXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIG5hbWUuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChjbHMpIHtcbiAgICAgIGlmIChjbHMudHJpbSgpKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZW1vdmVDbGFzcyhlbCwgbmFtZSk7XG4gICAgdmFyIGNscyA9IGdldENsYXNzTmFtZShlbCkgKyAoJyAnICsgbmFtZSk7XG4gICAgc2V0Q2xhc3NOYW1lKGVsLCBjbHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhc0NsYXNzKGVsLCBuYW1lKSB7XG4gIGlmICh0eXBlb2YgZWwuY2xhc3NMaXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBlbC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSk7XG4gIH1cbiAgdmFyIGNsYXNzTmFtZSA9IGdldENsYXNzTmFtZShlbCk7XG4gIHJldHVybiBuZXcgUmVnRXhwKCcoXnwgKScgKyBuYW1lICsgJyggfCQpJywgJ2dpJykudGVzdChjbGFzc05hbWUpO1xufVxuXG5mdW5jdGlvbiBnZXRDbGFzc05hbWUoZWwpIHtcbiAgLy8gQ2FuJ3QgdXNlIGp1c3QgU1ZHQW5pbWF0ZWRTdHJpbmcgaGVyZSBzaW5jZSBub2RlcyB3aXRoaW4gYSBGcmFtZSBpbiBJRSBoYXZlXG4gIC8vIGNvbXBsZXRlbHkgc2VwYXJhdGVseSBTVkdBbmltYXRlZFN0cmluZyBiYXNlIGNsYXNzZXNcbiAgaWYgKGVsLmNsYXNzTmFtZSBpbnN0YW5jZW9mIGVsLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuU1ZHQW5pbWF0ZWRTdHJpbmcpIHtcbiAgICByZXR1cm4gZWwuY2xhc3NOYW1lLmJhc2VWYWw7XG4gIH1cbiAgcmV0dXJuIGVsLmNsYXNzTmFtZTtcbn1cblxuZnVuY3Rpb24gc2V0Q2xhc3NOYW1lKGVsLCBjbGFzc05hbWUpIHtcbiAgZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzTmFtZSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNsYXNzZXMoZWwsIGFkZCwgYWxsKSB7XG4gIC8vIE9mIHRoZSBzZXQgb2YgJ2FsbCcgY2xhc3Nlcywgd2UgbmVlZCB0aGUgJ2FkZCcgY2xhc3NlcywgYW5kIG9ubHkgdGhlXG4gIC8vICdhZGQnIGNsYXNzZXMgdG8gYmUgc2V0LlxuICBhbGwuZm9yRWFjaChmdW5jdGlvbiAoY2xzKSB7XG4gICAgaWYgKGFkZC5pbmRleE9mKGNscykgPT09IC0xICYmIGhhc0NsYXNzKGVsLCBjbHMpKSB7XG4gICAgICByZW1vdmVDbGFzcyhlbCwgY2xzKTtcbiAgICB9XG4gIH0pO1xuXG4gIGFkZC5mb3JFYWNoKGZ1bmN0aW9uIChjbHMpIHtcbiAgICBpZiAoIWhhc0NsYXNzKGVsLCBjbHMpKSB7XG4gICAgICBhZGRDbGFzcyhlbCwgY2xzKTtcbiAgICB9XG4gIH0pO1xufVxuXG52YXIgZGVmZXJyZWQgPSBbXTtcblxudmFyIGRlZmVyID0gZnVuY3Rpb24gZGVmZXIoZm4pIHtcbiAgZGVmZXJyZWQucHVzaChmbik7XG59O1xuXG52YXIgZmx1c2ggPSBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgdmFyIGZuID0gdW5kZWZpbmVkO1xuICB3aGlsZSAoZm4gPSBkZWZlcnJlZC5wb3AoKSkge1xuICAgIGZuKCk7XG4gIH1cbn07XG5cbnZhciBFdmVudGVkID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRXZlbnRlZCgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRXZlbnRlZCk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoRXZlbnRlZCwgW3tcbiAgICBrZXk6ICdvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uKGV2ZW50LCBoYW5kbGVyLCBjdHgpIHtcbiAgICAgIHZhciBvbmNlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAzIHx8IGFyZ3VtZW50c1szXSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBhcmd1bWVudHNbM107XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5iaW5kaW5ncyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5iaW5kaW5ncyA9IHt9O1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0aGlzLmJpbmRpbmdzW2V2ZW50XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5iaW5kaW5nc1tldmVudF0gPSBbXTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYmluZGluZ3NbZXZlbnRdLnB1c2goeyBoYW5kbGVyOiBoYW5kbGVyLCBjdHg6IGN0eCwgb25jZTogb25jZSB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbmNlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25jZShldmVudCwgaGFuZGxlciwgY3R4KSB7XG4gICAgICB0aGlzLm9uKGV2ZW50LCBoYW5kbGVyLCBjdHgsIHRydWUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29mZicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9mZihldmVudCwgaGFuZGxlcikge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmJpbmRpbmdzID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgdGhpcy5iaW5kaW5nc1tldmVudF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBkZWxldGUgdGhpcy5iaW5kaW5nc1tldmVudF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy5iaW5kaW5nc1tldmVudF0ubGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKHRoaXMuYmluZGluZ3NbZXZlbnRdW2ldLmhhbmRsZXIgPT09IGhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZGluZ3NbZXZlbnRdLnNwbGljZShpLCAxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgKytpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3RyaWdnZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0cmlnZ2VyKGV2ZW50KSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuYmluZGluZ3MgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuYmluZGluZ3NbZXZlbnRdKSB7XG4gICAgICAgIHZhciBpID0gMDtcblxuICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy5iaW5kaW5nc1tldmVudF0ubGVuZ3RoKSB7XG4gICAgICAgICAgdmFyIF9iaW5kaW5ncyRldmVudCRpID0gdGhpcy5iaW5kaW5nc1tldmVudF1baV07XG4gICAgICAgICAgdmFyIGhhbmRsZXIgPSBfYmluZGluZ3MkZXZlbnQkaS5oYW5kbGVyO1xuICAgICAgICAgIHZhciBjdHggPSBfYmluZGluZ3MkZXZlbnQkaS5jdHg7XG4gICAgICAgICAgdmFyIG9uY2UgPSBfYmluZGluZ3MkZXZlbnQkaS5vbmNlO1xuXG4gICAgICAgICAgdmFyIGNvbnRleHQgPSBjdHg7XG4gICAgICAgICAgaWYgKHR5cGVvZiBjb250ZXh0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaGFuZGxlci5hcHBseShjb250ZXh0LCBhcmdzKTtcblxuICAgICAgICAgIGlmIChvbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRpbmdzW2V2ZW50XS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICsraTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRXZlbnRlZDtcbn0pKCk7XG5cblRldGhlckJhc2UuVXRpbHMgPSB7XG4gIGdldEFjdHVhbEJvdW5kaW5nQ2xpZW50UmVjdDogZ2V0QWN0dWFsQm91bmRpbmdDbGllbnRSZWN0LFxuICBnZXRTY3JvbGxQYXJlbnRzOiBnZXRTY3JvbGxQYXJlbnRzLFxuICBnZXRCb3VuZHM6IGdldEJvdW5kcyxcbiAgZ2V0T2Zmc2V0UGFyZW50OiBnZXRPZmZzZXRQYXJlbnQsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICBhZGRDbGFzczogYWRkQ2xhc3MsXG4gIHJlbW92ZUNsYXNzOiByZW1vdmVDbGFzcyxcbiAgaGFzQ2xhc3M6IGhhc0NsYXNzLFxuICB1cGRhdGVDbGFzc2VzOiB1cGRhdGVDbGFzc2VzLFxuICBkZWZlcjogZGVmZXIsXG4gIGZsdXNoOiBmbHVzaCxcbiAgdW5pcXVlSWQ6IHVuaXF1ZUlkLFxuICBFdmVudGVkOiBFdmVudGVkLFxuICBnZXRTY3JvbGxCYXJTaXplOiBnZXRTY3JvbGxCYXJTaXplLFxuICByZW1vdmVVdGlsRWxlbWVudHM6IHJlbW92ZVV0aWxFbGVtZW50c1xufTtcbi8qIGdsb2JhbHMgVGV0aGVyQmFzZSwgcGVyZm9ybWFuY2UgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVsncmV0dXJuJ10pIF9pWydyZXR1cm4nXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlJyk7IH0gfTsgfSkoKTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3g2LCBfeDcsIF94OCkgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeDYsIHByb3BlcnR5ID0gX3g3LCByZWNlaXZlciA9IF94ODsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeDYgPSBwYXJlbnQ7IF94NyA9IHByb3BlcnR5OyBfeDggPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgZGVzYyA9IHBhcmVudCA9IHVuZGVmaW5lZDsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaWYgKHR5cGVvZiBUZXRoZXJCYXNlID09PSAndW5kZWZpbmVkJykge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IGluY2x1ZGUgdGhlIHV0aWxzLmpzIGZpbGUgYmVmb3JlIHRldGhlci5qcycpO1xufVxuXG52YXIgX1RldGhlckJhc2UkVXRpbHMgPSBUZXRoZXJCYXNlLlV0aWxzO1xudmFyIGdldFNjcm9sbFBhcmVudHMgPSBfVGV0aGVyQmFzZSRVdGlscy5nZXRTY3JvbGxQYXJlbnRzO1xudmFyIGdldEJvdW5kcyA9IF9UZXRoZXJCYXNlJFV0aWxzLmdldEJvdW5kcztcbnZhciBnZXRPZmZzZXRQYXJlbnQgPSBfVGV0aGVyQmFzZSRVdGlscy5nZXRPZmZzZXRQYXJlbnQ7XG52YXIgZXh0ZW5kID0gX1RldGhlckJhc2UkVXRpbHMuZXh0ZW5kO1xudmFyIGFkZENsYXNzID0gX1RldGhlckJhc2UkVXRpbHMuYWRkQ2xhc3M7XG52YXIgcmVtb3ZlQ2xhc3MgPSBfVGV0aGVyQmFzZSRVdGlscy5yZW1vdmVDbGFzcztcbnZhciB1cGRhdGVDbGFzc2VzID0gX1RldGhlckJhc2UkVXRpbHMudXBkYXRlQ2xhc3NlcztcbnZhciBkZWZlciA9IF9UZXRoZXJCYXNlJFV0aWxzLmRlZmVyO1xudmFyIGZsdXNoID0gX1RldGhlckJhc2UkVXRpbHMuZmx1c2g7XG52YXIgZ2V0U2Nyb2xsQmFyU2l6ZSA9IF9UZXRoZXJCYXNlJFV0aWxzLmdldFNjcm9sbEJhclNpemU7XG52YXIgcmVtb3ZlVXRpbEVsZW1lbnRzID0gX1RldGhlckJhc2UkVXRpbHMucmVtb3ZlVXRpbEVsZW1lbnRzO1xuXG5mdW5jdGlvbiB3aXRoaW4oYSwgYikge1xuICB2YXIgZGlmZiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IDEgOiBhcmd1bWVudHNbMl07XG5cbiAgcmV0dXJuIGEgKyBkaWZmID49IGIgJiYgYiA+PSBhIC0gZGlmZjtcbn1cblxudmFyIHRyYW5zZm9ybUtleSA9IChmdW5jdGlvbiAoKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gIHZhciB0cmFuc2Zvcm1zID0gWyd0cmFuc2Zvcm0nLCAnV2Via2l0VHJhbnNmb3JtJywgJ09UcmFuc2Zvcm0nLCAnTW96VHJhbnNmb3JtJywgJ21zVHJhbnNmb3JtJ107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhbnNmb3Jtcy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBrZXkgPSB0cmFuc2Zvcm1zW2ldO1xuICAgIGlmIChlbC5zdHlsZVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuICB9XG59KSgpO1xuXG52YXIgdGV0aGVycyA9IFtdO1xuXG52YXIgcG9zaXRpb24gPSBmdW5jdGlvbiBwb3NpdGlvbigpIHtcbiAgdGV0aGVycy5mb3JFYWNoKGZ1bmN0aW9uICh0ZXRoZXIpIHtcbiAgICB0ZXRoZXIucG9zaXRpb24oZmFsc2UpO1xuICB9KTtcbiAgZmx1c2goKTtcbn07XG5cbmZ1bmN0aW9uIG5vdygpIHtcbiAgaWYgKHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHBlcmZvcm1hbmNlLm5vdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gcGVyZm9ybWFuY2Uubm93KCk7XG4gIH1cbiAgcmV0dXJuICtuZXcgRGF0ZSgpO1xufVxuXG4oZnVuY3Rpb24gKCkge1xuICB2YXIgbGFzdENhbGwgPSBudWxsO1xuICB2YXIgbGFzdER1cmF0aW9uID0gbnVsbDtcbiAgdmFyIHBlbmRpbmdUaW1lb3V0ID0gbnVsbDtcblxuICB2YXIgdGljayA9IGZ1bmN0aW9uIHRpY2soKSB7XG4gICAgaWYgKHR5cGVvZiBsYXN0RHVyYXRpb24gIT09ICd1bmRlZmluZWQnICYmIGxhc3REdXJhdGlvbiA+IDE2KSB7XG4gICAgICAvLyBXZSB2b2x1bnRhcmlseSB0aHJvdHRsZSBvdXJzZWx2ZXMgaWYgd2UgY2FuJ3QgbWFuYWdlIDYwZnBzXG4gICAgICBsYXN0RHVyYXRpb24gPSBNYXRoLm1pbihsYXN0RHVyYXRpb24gLSAxNiwgMjUwKTtcblxuICAgICAgLy8gSnVzdCBpbiBjYXNlIHRoaXMgaXMgdGhlIGxhc3QgZXZlbnQsIHJlbWVtYmVyIHRvIHBvc2l0aW9uIGp1c3Qgb25jZSBtb3JlXG4gICAgICBwZW5kaW5nVGltZW91dCA9IHNldFRpbWVvdXQodGljaywgMjUwKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGxhc3RDYWxsICE9PSAndW5kZWZpbmVkJyAmJiBub3coKSAtIGxhc3RDYWxsIDwgMTApIHtcbiAgICAgIC8vIFNvbWUgYnJvd3NlcnMgY2FsbCBldmVudHMgYSBsaXR0bGUgdG9vIGZyZXF1ZW50bHksIHJlZnVzZSB0byBydW4gbW9yZSB0aGFuIGlzIHJlYXNvbmFibGVcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocGVuZGluZ1RpbWVvdXQgIT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHBlbmRpbmdUaW1lb3V0KTtcbiAgICAgIHBlbmRpbmdUaW1lb3V0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBsYXN0Q2FsbCA9IG5vdygpO1xuICAgIHBvc2l0aW9uKCk7XG4gICAgbGFzdER1cmF0aW9uID0gbm93KCkgLSBsYXN0Q2FsbDtcbiAgfTtcblxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgIFsncmVzaXplJywgJ3Njcm9sbCcsICd0b3VjaG1vdmUnXS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRpY2spO1xuICAgIH0pO1xuICB9XG59KSgpO1xuXG52YXIgTUlSUk9SX0xSID0ge1xuICBjZW50ZXI6ICdjZW50ZXInLFxuICBsZWZ0OiAncmlnaHQnLFxuICByaWdodDogJ2xlZnQnXG59O1xuXG52YXIgTUlSUk9SX1RCID0ge1xuICBtaWRkbGU6ICdtaWRkbGUnLFxuICB0b3A6ICdib3R0b20nLFxuICBib3R0b206ICd0b3AnXG59O1xuXG52YXIgT0ZGU0VUX01BUCA9IHtcbiAgdG9wOiAwLFxuICBsZWZ0OiAwLFxuICBtaWRkbGU6ICc1MCUnLFxuICBjZW50ZXI6ICc1MCUnLFxuICBib3R0b206ICcxMDAlJyxcbiAgcmlnaHQ6ICcxMDAlJ1xufTtcblxudmFyIGF1dG9Ub0ZpeGVkQXR0YWNobWVudCA9IGZ1bmN0aW9uIGF1dG9Ub0ZpeGVkQXR0YWNobWVudChhdHRhY2htZW50LCByZWxhdGl2ZVRvQXR0YWNobWVudCkge1xuICB2YXIgbGVmdCA9IGF0dGFjaG1lbnQubGVmdDtcbiAgdmFyIHRvcCA9IGF0dGFjaG1lbnQudG9wO1xuXG4gIGlmIChsZWZ0ID09PSAnYXV0bycpIHtcbiAgICBsZWZ0ID0gTUlSUk9SX0xSW3JlbGF0aXZlVG9BdHRhY2htZW50LmxlZnRdO1xuICB9XG5cbiAgaWYgKHRvcCA9PT0gJ2F1dG8nKSB7XG4gICAgdG9wID0gTUlSUk9SX1RCW3JlbGF0aXZlVG9BdHRhY2htZW50LnRvcF07XG4gIH1cblxuICByZXR1cm4geyBsZWZ0OiBsZWZ0LCB0b3A6IHRvcCB9O1xufTtcblxudmFyIGF0dGFjaG1lbnRUb09mZnNldCA9IGZ1bmN0aW9uIGF0dGFjaG1lbnRUb09mZnNldChhdHRhY2htZW50KSB7XG4gIHZhciBsZWZ0ID0gYXR0YWNobWVudC5sZWZ0O1xuICB2YXIgdG9wID0gYXR0YWNobWVudC50b3A7XG5cbiAgaWYgKHR5cGVvZiBPRkZTRVRfTUFQW2F0dGFjaG1lbnQubGVmdF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgbGVmdCA9IE9GRlNFVF9NQVBbYXR0YWNobWVudC5sZWZ0XTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgT0ZGU0VUX01BUFthdHRhY2htZW50LnRvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgdG9wID0gT0ZGU0VUX01BUFthdHRhY2htZW50LnRvcF07XG4gIH1cblxuICByZXR1cm4geyBsZWZ0OiBsZWZ0LCB0b3A6IHRvcCB9O1xufTtcblxuZnVuY3Rpb24gYWRkT2Zmc2V0KCkge1xuICB2YXIgb3V0ID0geyB0b3A6IDAsIGxlZnQ6IDAgfTtcblxuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgb2Zmc2V0cyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIG9mZnNldHNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICBvZmZzZXRzLmZvckVhY2goZnVuY3Rpb24gKF9yZWYpIHtcbiAgICB2YXIgdG9wID0gX3JlZi50b3A7XG4gICAgdmFyIGxlZnQgPSBfcmVmLmxlZnQ7XG5cbiAgICBpZiAodHlwZW9mIHRvcCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRvcCA9IHBhcnNlRmxvYXQodG9wLCAxMCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbGVmdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGxlZnQgPSBwYXJzZUZsb2F0KGxlZnQsIDEwKTtcbiAgICB9XG5cbiAgICBvdXQudG9wICs9IHRvcDtcbiAgICBvdXQubGVmdCArPSBsZWZ0O1xuICB9KTtcblxuICByZXR1cm4gb3V0O1xufVxuXG5mdW5jdGlvbiBvZmZzZXRUb1B4KG9mZnNldCwgc2l6ZSkge1xuICBpZiAodHlwZW9mIG9mZnNldC5sZWZ0ID09PSAnc3RyaW5nJyAmJiBvZmZzZXQubGVmdC5pbmRleE9mKCclJykgIT09IC0xKSB7XG4gICAgb2Zmc2V0LmxlZnQgPSBwYXJzZUZsb2F0KG9mZnNldC5sZWZ0LCAxMCkgLyAxMDAgKiBzaXplLndpZHRoO1xuICB9XG4gIGlmICh0eXBlb2Ygb2Zmc2V0LnRvcCA9PT0gJ3N0cmluZycgJiYgb2Zmc2V0LnRvcC5pbmRleE9mKCclJykgIT09IC0xKSB7XG4gICAgb2Zmc2V0LnRvcCA9IHBhcnNlRmxvYXQob2Zmc2V0LnRvcCwgMTApIC8gMTAwICogc2l6ZS5oZWlnaHQ7XG4gIH1cblxuICByZXR1cm4gb2Zmc2V0O1xufVxuXG52YXIgcGFyc2VPZmZzZXQgPSBmdW5jdGlvbiBwYXJzZU9mZnNldCh2YWx1ZSkge1xuICB2YXIgX3ZhbHVlJHNwbGl0ID0gdmFsdWUuc3BsaXQoJyAnKTtcblxuICB2YXIgX3ZhbHVlJHNwbGl0MiA9IF9zbGljZWRUb0FycmF5KF92YWx1ZSRzcGxpdCwgMik7XG5cbiAgdmFyIHRvcCA9IF92YWx1ZSRzcGxpdDJbMF07XG4gIHZhciBsZWZ0ID0gX3ZhbHVlJHNwbGl0MlsxXTtcblxuICByZXR1cm4geyB0b3A6IHRvcCwgbGVmdDogbGVmdCB9O1xufTtcbnZhciBwYXJzZUF0dGFjaG1lbnQgPSBwYXJzZU9mZnNldDtcblxudmFyIFRldGhlckNsYXNzID0gKGZ1bmN0aW9uIChfRXZlbnRlZCkge1xuICBfaW5oZXJpdHMoVGV0aGVyQ2xhc3MsIF9FdmVudGVkKTtcblxuICBmdW5jdGlvbiBUZXRoZXJDbGFzcyhvcHRpb25zKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBUZXRoZXJDbGFzcyk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihUZXRoZXJDbGFzcy5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMpO1xuICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLmJpbmQodGhpcyk7XG5cbiAgICB0ZXRoZXJzLnB1c2godGhpcyk7XG5cbiAgICB0aGlzLmhpc3RvcnkgPSBbXTtcblxuICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zLCBmYWxzZSk7XG5cbiAgICBUZXRoZXJCYXNlLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgICBpZiAodHlwZW9mIG1vZHVsZS5pbml0aWFsaXplICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBtb2R1bGUuaW5pdGlhbGl6ZS5jYWxsKF90aGlzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMucG9zaXRpb24oKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhUZXRoZXJDbGFzcywgW3tcbiAgICBrZXk6ICdnZXRDbGFzcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENsYXNzKCkge1xuICAgICAgdmFyIGtleSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/ICcnIDogYXJndW1lbnRzWzBdO1xuICAgICAgdmFyIGNsYXNzZXMgPSB0aGlzLm9wdGlvbnMuY2xhc3NlcztcblxuICAgICAgaWYgKHR5cGVvZiBjbGFzc2VzICE9PSAndW5kZWZpbmVkJyAmJiBjbGFzc2VzW2tleV0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5jbGFzc2VzW2tleV07XG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5jbGFzc1ByZWZpeCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmNsYXNzUHJlZml4ICsgJy0nICsga2V5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzZXRPcHRpb25zJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIHBvcyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHRydWUgOiBhcmd1bWVudHNbMV07XG5cbiAgICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgb2Zmc2V0OiAnMCAwJyxcbiAgICAgICAgdGFyZ2V0T2Zmc2V0OiAnMCAwJyxcbiAgICAgICAgdGFyZ2V0QXR0YWNobWVudDogJ2F1dG8gYXV0bycsXG4gICAgICAgIGNsYXNzUHJlZml4OiAndGV0aGVyJ1xuICAgICAgfTtcblxuICAgICAgdGhpcy5vcHRpb25zID0gZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgICAgdmFyIF9vcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgdmFyIGVsZW1lbnQgPSBfb3B0aW9ucy5lbGVtZW50O1xuICAgICAgdmFyIHRhcmdldCA9IF9vcHRpb25zLnRhcmdldDtcbiAgICAgIHZhciB0YXJnZXRNb2RpZmllciA9IF9vcHRpb25zLnRhcmdldE1vZGlmaWVyO1xuXG4gICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICB0aGlzLnRhcmdldE1vZGlmaWVyID0gdGFyZ2V0TW9kaWZpZXI7XG5cbiAgICAgIGlmICh0aGlzLnRhcmdldCA9PT0gJ3ZpZXdwb3J0Jykge1xuICAgICAgICB0aGlzLnRhcmdldCA9IGRvY3VtZW50LmJvZHk7XG4gICAgICAgIHRoaXMudGFyZ2V0TW9kaWZpZXIgPSAndmlzaWJsZSc7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudGFyZ2V0ID09PSAnc2Nyb2xsLWhhbmRsZScpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgICB0aGlzLnRhcmdldE1vZGlmaWVyID0gJ3Njcm9sbC1oYW5kbGUnO1xuICAgICAgfVxuXG4gICAgICBbJ2VsZW1lbnQnLCAndGFyZ2V0J10uZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgX3RoaXMyW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZXRoZXIgRXJyb3I6IEJvdGggZWxlbWVudCBhbmQgdGFyZ2V0IG11c3QgYmUgZGVmaW5lZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBfdGhpczJba2V5XS5qcXVlcnkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgX3RoaXMyW2tleV0gPSBfdGhpczJba2V5XVswXTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgX3RoaXMyW2tleV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgX3RoaXMyW2tleV0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKF90aGlzMltrZXldKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGFkZENsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5nZXRDbGFzcygnZWxlbWVudCcpKTtcbiAgICAgIGlmICghKHRoaXMub3B0aW9ucy5hZGRUYXJnZXRDbGFzc2VzID09PSBmYWxzZSkpIHtcbiAgICAgICAgYWRkQ2xhc3ModGhpcy50YXJnZXQsIHRoaXMuZ2V0Q2xhc3MoJ3RhcmdldCcpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuYXR0YWNobWVudCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RldGhlciBFcnJvcjogWW91IG11c3QgcHJvdmlkZSBhbiBhdHRhY2htZW50Jyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudGFyZ2V0QXR0YWNobWVudCA9IHBhcnNlQXR0YWNobWVudCh0aGlzLm9wdGlvbnMudGFyZ2V0QXR0YWNobWVudCk7XG4gICAgICB0aGlzLmF0dGFjaG1lbnQgPSBwYXJzZUF0dGFjaG1lbnQodGhpcy5vcHRpb25zLmF0dGFjaG1lbnQpO1xuICAgICAgdGhpcy5vZmZzZXQgPSBwYXJzZU9mZnNldCh0aGlzLm9wdGlvbnMub2Zmc2V0KTtcbiAgICAgIHRoaXMudGFyZ2V0T2Zmc2V0ID0gcGFyc2VPZmZzZXQodGhpcy5vcHRpb25zLnRhcmdldE9mZnNldCk7XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5zY3JvbGxQYXJlbnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMudGFyZ2V0TW9kaWZpZXIgPT09ICdzY3JvbGwtaGFuZGxlJykge1xuICAgICAgICB0aGlzLnNjcm9sbFBhcmVudHMgPSBbdGhpcy50YXJnZXRdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zY3JvbGxQYXJlbnRzID0gZ2V0U2Nyb2xsUGFyZW50cyh0aGlzLnRhcmdldCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghKHRoaXMub3B0aW9ucy5lbmFibGVkID09PSBmYWxzZSkpIHtcbiAgICAgICAgdGhpcy5lbmFibGUocG9zKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXRUYXJnZXRCb3VuZHMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRUYXJnZXRCb3VuZHMoKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMudGFyZ2V0TW9kaWZpZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICh0aGlzLnRhcmdldE1vZGlmaWVyID09PSAndmlzaWJsZScpIHtcbiAgICAgICAgICBpZiAodGhpcy50YXJnZXQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHRvcDogcGFnZVlPZmZzZXQsIGxlZnQ6IHBhZ2VYT2Zmc2V0LCBoZWlnaHQ6IGlubmVySGVpZ2h0LCB3aWR0aDogaW5uZXJXaWR0aCB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgYm91bmRzID0gZ2V0Qm91bmRzKHRoaXMudGFyZ2V0KTtcblxuICAgICAgICAgICAgdmFyIG91dCA9IHtcbiAgICAgICAgICAgICAgaGVpZ2h0OiBib3VuZHMuaGVpZ2h0LFxuICAgICAgICAgICAgICB3aWR0aDogYm91bmRzLndpZHRoLFxuICAgICAgICAgICAgICB0b3A6IGJvdW5kcy50b3AsXG4gICAgICAgICAgICAgIGxlZnQ6IGJvdW5kcy5sZWZ0XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBvdXQuaGVpZ2h0ID0gTWF0aC5taW4ob3V0LmhlaWdodCwgYm91bmRzLmhlaWdodCAtIChwYWdlWU9mZnNldCAtIGJvdW5kcy50b3ApKTtcbiAgICAgICAgICAgIG91dC5oZWlnaHQgPSBNYXRoLm1pbihvdXQuaGVpZ2h0LCBib3VuZHMuaGVpZ2h0IC0gKGJvdW5kcy50b3AgKyBib3VuZHMuaGVpZ2h0IC0gKHBhZ2VZT2Zmc2V0ICsgaW5uZXJIZWlnaHQpKSk7XG4gICAgICAgICAgICBvdXQuaGVpZ2h0ID0gTWF0aC5taW4oaW5uZXJIZWlnaHQsIG91dC5oZWlnaHQpO1xuICAgICAgICAgICAgb3V0LmhlaWdodCAtPSAyO1xuXG4gICAgICAgICAgICBvdXQud2lkdGggPSBNYXRoLm1pbihvdXQud2lkdGgsIGJvdW5kcy53aWR0aCAtIChwYWdlWE9mZnNldCAtIGJvdW5kcy5sZWZ0KSk7XG4gICAgICAgICAgICBvdXQud2lkdGggPSBNYXRoLm1pbihvdXQud2lkdGgsIGJvdW5kcy53aWR0aCAtIChib3VuZHMubGVmdCArIGJvdW5kcy53aWR0aCAtIChwYWdlWE9mZnNldCArIGlubmVyV2lkdGgpKSk7XG4gICAgICAgICAgICBvdXQud2lkdGggPSBNYXRoLm1pbihpbm5lcldpZHRoLCBvdXQud2lkdGgpO1xuICAgICAgICAgICAgb3V0LndpZHRoIC09IDI7XG5cbiAgICAgICAgICAgIGlmIChvdXQudG9wIDwgcGFnZVlPZmZzZXQpIHtcbiAgICAgICAgICAgICAgb3V0LnRvcCA9IHBhZ2VZT2Zmc2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG91dC5sZWZ0IDwgcGFnZVhPZmZzZXQpIHtcbiAgICAgICAgICAgICAgb3V0LmxlZnQgPSBwYWdlWE9mZnNldDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50YXJnZXRNb2RpZmllciA9PT0gJ3Njcm9sbC1oYW5kbGUnKSB7XG4gICAgICAgICAgdmFyIGJvdW5kcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgICAgaWYgKHRhcmdldCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgdGFyZ2V0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgICAgICAgICBib3VuZHMgPSB7XG4gICAgICAgICAgICAgIGxlZnQ6IHBhZ2VYT2Zmc2V0LFxuICAgICAgICAgICAgICB0b3A6IHBhZ2VZT2Zmc2V0LFxuICAgICAgICAgICAgICBoZWlnaHQ6IGlubmVySGVpZ2h0LFxuICAgICAgICAgICAgICB3aWR0aDogaW5uZXJXaWR0aFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm91bmRzID0gZ2V0Qm91bmRzKHRhcmdldCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpO1xuXG4gICAgICAgICAgdmFyIGhhc0JvdHRvbVNjcm9sbCA9IHRhcmdldC5zY3JvbGxXaWR0aCA+IHRhcmdldC5jbGllbnRXaWR0aCB8fCBbc3R5bGUub3ZlcmZsb3csIHN0eWxlLm92ZXJmbG93WF0uaW5kZXhPZignc2Nyb2xsJykgPj0gMCB8fCB0aGlzLnRhcmdldCAhPT0gZG9jdW1lbnQuYm9keTtcblxuICAgICAgICAgIHZhciBzY3JvbGxCb3R0b20gPSAwO1xuICAgICAgICAgIGlmIChoYXNCb3R0b21TY3JvbGwpIHtcbiAgICAgICAgICAgIHNjcm9sbEJvdHRvbSA9IDE1O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBoZWlnaHQgPSBib3VuZHMuaGVpZ2h0IC0gcGFyc2VGbG9hdChzdHlsZS5ib3JkZXJUb3BXaWR0aCkgLSBwYXJzZUZsb2F0KHN0eWxlLmJvcmRlckJvdHRvbVdpZHRoKSAtIHNjcm9sbEJvdHRvbTtcblxuICAgICAgICAgIHZhciBvdXQgPSB7XG4gICAgICAgICAgICB3aWR0aDogMTUsXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCAqIDAuOTc1ICogKGhlaWdodCAvIHRhcmdldC5zY3JvbGxIZWlnaHQpLFxuICAgICAgICAgICAgbGVmdDogYm91bmRzLmxlZnQgKyBib3VuZHMud2lkdGggLSBwYXJzZUZsb2F0KHN0eWxlLmJvcmRlckxlZnRXaWR0aCkgLSAxNVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgZml0QWRqID0gMDtcbiAgICAgICAgICBpZiAoaGVpZ2h0IDwgNDA4ICYmIHRoaXMudGFyZ2V0ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICBmaXRBZGogPSAtMC4wMDAxMSAqIE1hdGgucG93KGhlaWdodCwgMikgLSAwLjAwNzI3ICogaGVpZ2h0ICsgMjIuNTg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMudGFyZ2V0ICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICBvdXQuaGVpZ2h0ID0gTWF0aC5tYXgob3V0LmhlaWdodCwgMjQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBzY3JvbGxQZXJjZW50YWdlID0gdGhpcy50YXJnZXQuc2Nyb2xsVG9wIC8gKHRhcmdldC5zY3JvbGxIZWlnaHQgLSBoZWlnaHQpO1xuICAgICAgICAgIG91dC50b3AgPSBzY3JvbGxQZXJjZW50YWdlICogKGhlaWdodCAtIG91dC5oZWlnaHQgLSBmaXRBZGopICsgYm91bmRzLnRvcCArIHBhcnNlRmxvYXQoc3R5bGUuYm9yZGVyVG9wV2lkdGgpO1xuXG4gICAgICAgICAgaWYgKHRoaXMudGFyZ2V0ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICBvdXQuaGVpZ2h0ID0gTWF0aC5tYXgob3V0LmhlaWdodCwgMjQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBnZXRCb3VuZHModGhpcy50YXJnZXQpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NsZWFyQ2FjaGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICAgICAgdGhpcy5fY2FjaGUgPSB7fTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjYWNoZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNhY2hlKGssIGdldHRlcikge1xuICAgICAgLy8gTW9yZSB0aGFuIG9uZSBtb2R1bGUgd2lsbCBvZnRlbiBuZWVkIHRoZSBzYW1lIERPTSBpbmZvLCBzb1xuICAgICAgLy8gd2Uga2VlcCBhIGNhY2hlIHdoaWNoIGlzIGNsZWFyZWQgb24gZWFjaCBwb3NpdGlvbiBjYWxsXG4gICAgICBpZiAodHlwZW9mIHRoaXMuX2NhY2hlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLl9jYWNoZSA9IHt9O1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRoaXMuX2NhY2hlW2tdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLl9jYWNoZVtrXSA9IGdldHRlci5jYWxsKHRoaXMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fY2FjaGVba107XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZW5hYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHZhciBwb3MgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB0cnVlIDogYXJndW1lbnRzWzBdO1xuXG4gICAgICBpZiAoISh0aGlzLm9wdGlvbnMuYWRkVGFyZ2V0Q2xhc3NlcyA9PT0gZmFsc2UpKSB7XG4gICAgICAgIGFkZENsYXNzKHRoaXMudGFyZ2V0LCB0aGlzLmdldENsYXNzKCdlbmFibGVkJykpO1xuICAgICAgfVxuICAgICAgYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLmdldENsYXNzKCdlbmFibGVkJykpO1xuICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuICAgICAgdGhpcy5zY3JvbGxQYXJlbnRzLmZvckVhY2goZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICBpZiAocGFyZW50ICE9PSBfdGhpczMudGFyZ2V0Lm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgICBwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgX3RoaXMzLnBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChwb3MpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbigpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2Rpc2FibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgIHJlbW92ZUNsYXNzKHRoaXMudGFyZ2V0LCB0aGlzLmdldENsYXNzKCdlbmFibGVkJykpO1xuICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLmdldENsYXNzKCdlbmFibGVkJykpO1xuICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5zY3JvbGxQYXJlbnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLnNjcm9sbFBhcmVudHMuZm9yRWFjaChmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgICAgcGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIF90aGlzNC5wb3NpdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgIHRoaXMuZGlzYWJsZSgpO1xuXG4gICAgICB0ZXRoZXJzLmZvckVhY2goZnVuY3Rpb24gKHRldGhlciwgaSkge1xuICAgICAgICBpZiAodGV0aGVyID09PSBfdGhpczUpIHtcbiAgICAgICAgICB0ZXRoZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIFJlbW92ZSBhbnkgZWxlbWVudHMgd2Ugd2VyZSB1c2luZyBmb3IgY29udmVuaWVuY2UgZnJvbSB0aGUgRE9NXG4gICAgICBpZiAodGV0aGVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmVtb3ZlVXRpbEVsZW1lbnRzKCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndXBkYXRlQXR0YWNoQ2xhc3NlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZUF0dGFjaENsYXNzZXMoZWxlbWVudEF0dGFjaCwgdGFyZ2V0QXR0YWNoKSB7XG4gICAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgICAgZWxlbWVudEF0dGFjaCA9IGVsZW1lbnRBdHRhY2ggfHwgdGhpcy5hdHRhY2htZW50O1xuICAgICAgdGFyZ2V0QXR0YWNoID0gdGFyZ2V0QXR0YWNoIHx8IHRoaXMudGFyZ2V0QXR0YWNobWVudDtcbiAgICAgIHZhciBzaWRlcyA9IFsnbGVmdCcsICd0b3AnLCAnYm90dG9tJywgJ3JpZ2h0JywgJ21pZGRsZScsICdjZW50ZXInXTtcblxuICAgICAgaWYgKHR5cGVvZiB0aGlzLl9hZGRBdHRhY2hDbGFzc2VzICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLl9hZGRBdHRhY2hDbGFzc2VzLmxlbmd0aCkge1xuICAgICAgICAvLyB1cGRhdGVBdHRhY2hDbGFzc2VzIGNhbiBiZSBjYWxsZWQgbW9yZSB0aGFuIG9uY2UgaW4gYSBwb3NpdGlvbiBjYWxsLCBzb1xuICAgICAgICAvLyB3ZSBuZWVkIHRvIGNsZWFuIHVwIGFmdGVyIG91cnNlbHZlcyBzdWNoIHRoYXQgd2hlbiB0aGUgbGFzdCBkZWZlciBnZXRzXG4gICAgICAgIC8vIHJhbiBpdCBkb2Vzbid0IGFkZCBhbnkgZXh0cmEgY2xhc3NlcyBmcm9tIHByZXZpb3VzIGNhbGxzLlxuICAgICAgICB0aGlzLl9hZGRBdHRhY2hDbGFzc2VzLnNwbGljZSgwLCB0aGlzLl9hZGRBdHRhY2hDbGFzc2VzLmxlbmd0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fYWRkQXR0YWNoQ2xhc3NlcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5fYWRkQXR0YWNoQ2xhc3NlcyA9IFtdO1xuICAgICAgfVxuICAgICAgdmFyIGFkZCA9IHRoaXMuX2FkZEF0dGFjaENsYXNzZXM7XG5cbiAgICAgIGlmIChlbGVtZW50QXR0YWNoLnRvcCkge1xuICAgICAgICBhZGQucHVzaCh0aGlzLmdldENsYXNzKCdlbGVtZW50LWF0dGFjaGVkJykgKyAnLScgKyBlbGVtZW50QXR0YWNoLnRvcCk7XG4gICAgICB9XG4gICAgICBpZiAoZWxlbWVudEF0dGFjaC5sZWZ0KSB7XG4gICAgICAgIGFkZC5wdXNoKHRoaXMuZ2V0Q2xhc3MoJ2VsZW1lbnQtYXR0YWNoZWQnKSArICctJyArIGVsZW1lbnRBdHRhY2gubGVmdCk7XG4gICAgICB9XG4gICAgICBpZiAodGFyZ2V0QXR0YWNoLnRvcCkge1xuICAgICAgICBhZGQucHVzaCh0aGlzLmdldENsYXNzKCd0YXJnZXQtYXR0YWNoZWQnKSArICctJyArIHRhcmdldEF0dGFjaC50b3ApO1xuICAgICAgfVxuICAgICAgaWYgKHRhcmdldEF0dGFjaC5sZWZ0KSB7XG4gICAgICAgIGFkZC5wdXNoKHRoaXMuZ2V0Q2xhc3MoJ3RhcmdldC1hdHRhY2hlZCcpICsgJy0nICsgdGFyZ2V0QXR0YWNoLmxlZnQpO1xuICAgICAgfVxuXG4gICAgICB2YXIgYWxsID0gW107XG4gICAgICBzaWRlcy5mb3JFYWNoKGZ1bmN0aW9uIChzaWRlKSB7XG4gICAgICAgIGFsbC5wdXNoKF90aGlzNi5nZXRDbGFzcygnZWxlbWVudC1hdHRhY2hlZCcpICsgJy0nICsgc2lkZSk7XG4gICAgICAgIGFsbC5wdXNoKF90aGlzNi5nZXRDbGFzcygndGFyZ2V0LWF0dGFjaGVkJykgKyAnLScgKyBzaWRlKTtcbiAgICAgIH0pO1xuXG4gICAgICBkZWZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghKHR5cGVvZiBfdGhpczYuX2FkZEF0dGFjaENsYXNzZXMgIT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUNsYXNzZXMoX3RoaXM2LmVsZW1lbnQsIF90aGlzNi5fYWRkQXR0YWNoQ2xhc3NlcywgYWxsKTtcbiAgICAgICAgaWYgKCEoX3RoaXM2Lm9wdGlvbnMuYWRkVGFyZ2V0Q2xhc3NlcyA9PT0gZmFsc2UpKSB7XG4gICAgICAgICAgdXBkYXRlQ2xhc3NlcyhfdGhpczYudGFyZ2V0LCBfdGhpczYuX2FkZEF0dGFjaENsYXNzZXMsIGFsbCk7XG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGUgX3RoaXM2Ll9hZGRBdHRhY2hDbGFzc2VzO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncG9zaXRpb24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwb3NpdGlvbigpIHtcbiAgICAgIHZhciBfdGhpczcgPSB0aGlzO1xuXG4gICAgICB2YXIgZmx1c2hDaGFuZ2VzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGFyZ3VtZW50c1swXTtcblxuICAgICAgLy8gZmx1c2hDaGFuZ2VzIGNvbW1pdHMgdGhlIGNoYW5nZXMgaW1tZWRpYXRlbHksIGxlYXZlIHRydWUgdW5sZXNzIHlvdSBhcmUgcG9zaXRpb25pbmcgbXVsdGlwbGVcbiAgICAgIC8vIHRldGhlcnMgKGluIHdoaWNoIGNhc2UgY2FsbCBUZXRoZXIuVXRpbHMuZmx1c2ggeW91cnNlbGYgd2hlbiB5b3UncmUgZG9uZSlcblxuICAgICAgaWYgKCF0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNsZWFyQ2FjaGUoKTtcblxuICAgICAgLy8gVHVybiAnYXV0bycgYXR0YWNobWVudHMgaW50byB0aGUgYXBwcm9wcmlhdGUgY29ybmVyIG9yIGVkZ2VcbiAgICAgIHZhciB0YXJnZXRBdHRhY2htZW50ID0gYXV0b1RvRml4ZWRBdHRhY2htZW50KHRoaXMudGFyZ2V0QXR0YWNobWVudCwgdGhpcy5hdHRhY2htZW50KTtcblxuICAgICAgdGhpcy51cGRhdGVBdHRhY2hDbGFzc2VzKHRoaXMuYXR0YWNobWVudCwgdGFyZ2V0QXR0YWNobWVudCk7XG5cbiAgICAgIHZhciBlbGVtZW50UG9zID0gdGhpcy5jYWNoZSgnZWxlbWVudC1ib3VuZHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBnZXRCb3VuZHMoX3RoaXM3LmVsZW1lbnQpO1xuICAgICAgfSk7XG5cbiAgICAgIHZhciB3aWR0aCA9IGVsZW1lbnRQb3Mud2lkdGg7XG4gICAgICB2YXIgaGVpZ2h0ID0gZWxlbWVudFBvcy5oZWlnaHQ7XG5cbiAgICAgIGlmICh3aWR0aCA9PT0gMCAmJiBoZWlnaHQgPT09IDAgJiYgdHlwZW9mIHRoaXMubGFzdFNpemUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBfbGFzdFNpemUgPSB0aGlzLmxhc3RTaXplO1xuXG4gICAgICAgIC8vIFdlIGNhY2hlIHRoZSBoZWlnaHQgYW5kIHdpZHRoIHRvIG1ha2UgaXQgcG9zc2libGUgdG8gcG9zaXRpb24gZWxlbWVudHMgdGhhdCBhcmVcbiAgICAgICAgLy8gZ2V0dGluZyBoaWRkZW4uXG4gICAgICAgIHdpZHRoID0gX2xhc3RTaXplLndpZHRoO1xuICAgICAgICBoZWlnaHQgPSBfbGFzdFNpemUuaGVpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sYXN0U2l6ZSA9IHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCB9O1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0UG9zID0gdGhpcy5jYWNoZSgndGFyZ2V0LWJvdW5kcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzNy5nZXRUYXJnZXRCb3VuZHMoKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIHRhcmdldFNpemUgPSB0YXJnZXRQb3M7XG5cbiAgICAgIC8vIEdldCBhbiBhY3R1YWwgcHggb2Zmc2V0IGZyb20gdGhlIGF0dGFjaG1lbnRcbiAgICAgIHZhciBvZmZzZXQgPSBvZmZzZXRUb1B4KGF0dGFjaG1lbnRUb09mZnNldCh0aGlzLmF0dGFjaG1lbnQpLCB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfSk7XG4gICAgICB2YXIgdGFyZ2V0T2Zmc2V0ID0gb2Zmc2V0VG9QeChhdHRhY2htZW50VG9PZmZzZXQodGFyZ2V0QXR0YWNobWVudCksIHRhcmdldFNpemUpO1xuXG4gICAgICB2YXIgbWFudWFsT2Zmc2V0ID0gb2Zmc2V0VG9QeCh0aGlzLm9mZnNldCwgeyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH0pO1xuICAgICAgdmFyIG1hbnVhbFRhcmdldE9mZnNldCA9IG9mZnNldFRvUHgodGhpcy50YXJnZXRPZmZzZXQsIHRhcmdldFNpemUpO1xuXG4gICAgICAvLyBBZGQgdGhlIG1hbnVhbGx5IHByb3ZpZGVkIG9mZnNldFxuICAgICAgb2Zmc2V0ID0gYWRkT2Zmc2V0KG9mZnNldCwgbWFudWFsT2Zmc2V0KTtcbiAgICAgIHRhcmdldE9mZnNldCA9IGFkZE9mZnNldCh0YXJnZXRPZmZzZXQsIG1hbnVhbFRhcmdldE9mZnNldCk7XG5cbiAgICAgIC8vIEl0J3Mgbm93IG91ciBnb2FsIHRvIG1ha2UgKGVsZW1lbnQgcG9zaXRpb24gKyBvZmZzZXQpID09ICh0YXJnZXQgcG9zaXRpb24gKyB0YXJnZXQgb2Zmc2V0KVxuICAgICAgdmFyIGxlZnQgPSB0YXJnZXRQb3MubGVmdCArIHRhcmdldE9mZnNldC5sZWZ0IC0gb2Zmc2V0LmxlZnQ7XG4gICAgICB2YXIgdG9wID0gdGFyZ2V0UG9zLnRvcCArIHRhcmdldE9mZnNldC50b3AgLSBvZmZzZXQudG9wO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IFRldGhlckJhc2UubW9kdWxlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgX21vZHVsZTIgPSBUZXRoZXJCYXNlLm1vZHVsZXNbaV07XG4gICAgICAgIHZhciByZXQgPSBfbW9kdWxlMi5wb3NpdGlvbi5jYWxsKHRoaXMsIHtcbiAgICAgICAgICBsZWZ0OiBsZWZ0LFxuICAgICAgICAgIHRvcDogdG9wLFxuICAgICAgICAgIHRhcmdldEF0dGFjaG1lbnQ6IHRhcmdldEF0dGFjaG1lbnQsXG4gICAgICAgICAgdGFyZ2V0UG9zOiB0YXJnZXRQb3MsXG4gICAgICAgICAgZWxlbWVudFBvczogZWxlbWVudFBvcyxcbiAgICAgICAgICBvZmZzZXQ6IG9mZnNldCxcbiAgICAgICAgICB0YXJnZXRPZmZzZXQ6IHRhcmdldE9mZnNldCxcbiAgICAgICAgICBtYW51YWxPZmZzZXQ6IG1hbnVhbE9mZnNldCxcbiAgICAgICAgICBtYW51YWxUYXJnZXRPZmZzZXQ6IG1hbnVhbFRhcmdldE9mZnNldCxcbiAgICAgICAgICBzY3JvbGxiYXJTaXplOiBzY3JvbGxiYXJTaXplLFxuICAgICAgICAgIGF0dGFjaG1lbnQ6IHRoaXMuYXR0YWNobWVudFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmV0ID09PSBmYWxzZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmV0ID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgcmV0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvcCA9IHJldC50b3A7XG4gICAgICAgICAgbGVmdCA9IHJldC5sZWZ0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFdlIGRlc2NyaWJlIHRoZSBwb3NpdGlvbiB0aHJlZSBkaWZmZXJlbnQgd2F5cyB0byBnaXZlIHRoZSBvcHRpbWl6ZXJcbiAgICAgIC8vIGEgY2hhbmNlIHRvIGRlY2lkZSB0aGUgYmVzdCBwb3NzaWJsZSB3YXkgdG8gcG9zaXRpb24gdGhlIGVsZW1lbnRcbiAgICAgIC8vIHdpdGggdGhlIGZld2VzdCByZXBhaW50cy5cbiAgICAgIHZhciBuZXh0ID0ge1xuICAgICAgICAvLyBJdCdzIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZSBwYWdlIChhYnNvbHV0ZSBwb3NpdGlvbmluZyB3aGVuXG4gICAgICAgIC8vIHRoZSBlbGVtZW50IGlzIGEgY2hpbGQgb2YgdGhlIGJvZHkpXG4gICAgICAgIHBhZ2U6IHtcbiAgICAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgICBsZWZ0OiBsZWZ0XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gSXQncyBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGUgdmlld3BvcnQgKGZpeGVkIHBvc2l0aW9uaW5nKVxuICAgICAgICB2aWV3cG9ydDoge1xuICAgICAgICAgIHRvcDogdG9wIC0gcGFnZVlPZmZzZXQsXG4gICAgICAgICAgYm90dG9tOiBwYWdlWU9mZnNldCAtIHRvcCAtIGhlaWdodCArIGlubmVySGVpZ2h0LFxuICAgICAgICAgIGxlZnQ6IGxlZnQgLSBwYWdlWE9mZnNldCxcbiAgICAgICAgICByaWdodDogcGFnZVhPZmZzZXQgLSBsZWZ0IC0gd2lkdGggKyBpbm5lcldpZHRoXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHZhciBkb2MgPSB0aGlzLnRhcmdldC5vd25lckRvY3VtZW50O1xuICAgICAgdmFyIHdpbiA9IGRvYy5kZWZhdWx0VmlldztcblxuICAgICAgdmFyIHNjcm9sbGJhclNpemUgPSB1bmRlZmluZWQ7XG4gICAgICBpZiAod2luLmlubmVySGVpZ2h0ID4gZG9jLmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpIHtcbiAgICAgICAgc2Nyb2xsYmFyU2l6ZSA9IHRoaXMuY2FjaGUoJ3Njcm9sbGJhci1zaXplJywgZ2V0U2Nyb2xsQmFyU2l6ZSk7XG4gICAgICAgIG5leHQudmlld3BvcnQuYm90dG9tIC09IHNjcm9sbGJhclNpemUuaGVpZ2h0O1xuICAgICAgfVxuXG4gICAgICBpZiAod2luLmlubmVyV2lkdGggPiBkb2MuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKSB7XG4gICAgICAgIHNjcm9sbGJhclNpemUgPSB0aGlzLmNhY2hlKCdzY3JvbGxiYXItc2l6ZScsIGdldFNjcm9sbEJhclNpemUpO1xuICAgICAgICBuZXh0LnZpZXdwb3J0LnJpZ2h0IC09IHNjcm9sbGJhclNpemUud2lkdGg7XG4gICAgICB9XG5cbiAgICAgIGlmIChbJycsICdzdGF0aWMnXS5pbmRleE9mKGRvYy5ib2R5LnN0eWxlLnBvc2l0aW9uKSA9PT0gLTEgfHwgWycnLCAnc3RhdGljJ10uaW5kZXhPZihkb2MuYm9keS5wYXJlbnRFbGVtZW50LnN0eWxlLnBvc2l0aW9uKSA9PT0gLTEpIHtcbiAgICAgICAgLy8gQWJzb2x1dGUgcG9zaXRpb25pbmcgaW4gdGhlIGJvZHkgd2lsbCBiZSByZWxhdGl2ZSB0byB0aGUgcGFnZSwgbm90IHRoZSAnaW5pdGlhbCBjb250YWluaW5nIGJsb2NrJ1xuICAgICAgICBuZXh0LnBhZ2UuYm90dG9tID0gZG9jLmJvZHkuc2Nyb2xsSGVpZ2h0IC0gdG9wIC0gaGVpZ2h0O1xuICAgICAgICBuZXh0LnBhZ2UucmlnaHQgPSBkb2MuYm9keS5zY3JvbGxXaWR0aCAtIGxlZnQgLSB3aWR0aDtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMub3B0aW1pemF0aW9ucyAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5vcHRpb25zLm9wdGltaXphdGlvbnMubW92ZUVsZW1lbnQgIT09IGZhbHNlICYmICEodHlwZW9mIHRoaXMudGFyZ2V0TW9kaWZpZXIgIT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBvZmZzZXRQYXJlbnQgPSBfdGhpczcuY2FjaGUoJ3RhcmdldC1vZmZzZXRwYXJlbnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0T2Zmc2V0UGFyZW50KF90aGlzNy50YXJnZXQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhciBvZmZzZXRQb3NpdGlvbiA9IF90aGlzNy5jYWNoZSgndGFyZ2V0LW9mZnNldHBhcmVudC1ib3VuZHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0Qm91bmRzKG9mZnNldFBhcmVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFyIG9mZnNldFBhcmVudFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShvZmZzZXRQYXJlbnQpO1xuICAgICAgICAgIHZhciBvZmZzZXRQYXJlbnRTaXplID0gb2Zmc2V0UG9zaXRpb247XG5cbiAgICAgICAgICB2YXIgb2Zmc2V0Qm9yZGVyID0ge307XG4gICAgICAgICAgWydUb3AnLCAnTGVmdCcsICdCb3R0b20nLCAnUmlnaHQnXS5mb3JFYWNoKGZ1bmN0aW9uIChzaWRlKSB7XG4gICAgICAgICAgICBvZmZzZXRCb3JkZXJbc2lkZS50b0xvd2VyQ2FzZSgpXSA9IHBhcnNlRmxvYXQob2Zmc2V0UGFyZW50U3R5bGVbJ2JvcmRlcicgKyBzaWRlICsgJ1dpZHRoJ10pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgb2Zmc2V0UG9zaXRpb24ucmlnaHQgPSBkb2MuYm9keS5zY3JvbGxXaWR0aCAtIG9mZnNldFBvc2l0aW9uLmxlZnQgLSBvZmZzZXRQYXJlbnRTaXplLndpZHRoICsgb2Zmc2V0Qm9yZGVyLnJpZ2h0O1xuICAgICAgICAgIG9mZnNldFBvc2l0aW9uLmJvdHRvbSA9IGRvYy5ib2R5LnNjcm9sbEhlaWdodCAtIG9mZnNldFBvc2l0aW9uLnRvcCAtIG9mZnNldFBhcmVudFNpemUuaGVpZ2h0ICsgb2Zmc2V0Qm9yZGVyLmJvdHRvbTtcblxuICAgICAgICAgIGlmIChuZXh0LnBhZ2UudG9wID49IG9mZnNldFBvc2l0aW9uLnRvcCArIG9mZnNldEJvcmRlci50b3AgJiYgbmV4dC5wYWdlLmJvdHRvbSA+PSBvZmZzZXRQb3NpdGlvbi5ib3R0b20pIHtcbiAgICAgICAgICAgIGlmIChuZXh0LnBhZ2UubGVmdCA+PSBvZmZzZXRQb3NpdGlvbi5sZWZ0ICsgb2Zmc2V0Qm9yZGVyLmxlZnQgJiYgbmV4dC5wYWdlLnJpZ2h0ID49IG9mZnNldFBvc2l0aW9uLnJpZ2h0KSB7XG4gICAgICAgICAgICAgIC8vIFdlJ3JlIHdpdGhpbiB0aGUgdmlzaWJsZSBwYXJ0IG9mIHRoZSB0YXJnZXQncyBzY3JvbGwgcGFyZW50XG4gICAgICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSBvZmZzZXRQYXJlbnQuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgICB2YXIgc2Nyb2xsTGVmdCA9IG9mZnNldFBhcmVudC5zY3JvbGxMZWZ0O1xuXG4gICAgICAgICAgICAgIC8vIEl0J3MgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlIHRhcmdldCdzIG9mZnNldCBwYXJlbnQgKGFic29sdXRlIHBvc2l0aW9uaW5nIHdoZW5cbiAgICAgICAgICAgICAgLy8gdGhlIGVsZW1lbnQgaXMgbW92ZWQgdG8gYmUgYSBjaGlsZCBvZiB0aGUgdGFyZ2V0J3Mgb2Zmc2V0IHBhcmVudCkuXG4gICAgICAgICAgICAgIG5leHQub2Zmc2V0ID0ge1xuICAgICAgICAgICAgICAgIHRvcDogbmV4dC5wYWdlLnRvcCAtIG9mZnNldFBvc2l0aW9uLnRvcCArIHNjcm9sbFRvcCAtIG9mZnNldEJvcmRlci50b3AsXG4gICAgICAgICAgICAgICAgbGVmdDogbmV4dC5wYWdlLmxlZnQgLSBvZmZzZXRQb3NpdGlvbi5sZWZ0ICsgc2Nyb2xsTGVmdCAtIG9mZnNldEJvcmRlci5sZWZ0XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpO1xuICAgICAgfVxuXG4gICAgICAvLyBXZSBjb3VsZCBhbHNvIHRyYXZlbCB1cCB0aGUgRE9NIGFuZCB0cnkgZWFjaCBjb250YWluaW5nIGNvbnRleHQsIHJhdGhlciB0aGFuIG9ubHlcbiAgICAgIC8vIGxvb2tpbmcgYXQgdGhlIGJvZHksIGJ1dCB3ZSdyZSBnb25uYSBnZXQgZGltaW5pc2hpbmcgcmV0dXJucy5cblxuICAgICAgdGhpcy5tb3ZlKG5leHQpO1xuXG4gICAgICB0aGlzLmhpc3RvcnkudW5zaGlmdChuZXh0KTtcblxuICAgICAgaWYgKHRoaXMuaGlzdG9yeS5sZW5ndGggPiAzKSB7XG4gICAgICAgIHRoaXMuaGlzdG9yeS5wb3AoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZsdXNoQ2hhbmdlcykge1xuICAgICAgICBmbHVzaCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBUSEUgSVNTVUVcbiAgfSwge1xuICAgIGtleTogJ21vdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtb3ZlKHBvcykge1xuICAgICAgdmFyIF90aGlzOCA9IHRoaXM7XG5cbiAgICAgIGlmICghKHR5cGVvZiB0aGlzLmVsZW1lbnQucGFyZW50Tm9kZSAhPT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHNhbWUgPSB7fTtcblxuICAgICAgZm9yICh2YXIgdHlwZSBpbiBwb3MpIHtcbiAgICAgICAgc2FtZVt0eXBlXSA9IHt9O1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBwb3NbdHlwZV0pIHtcbiAgICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcblxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5oaXN0b3J5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgcG9pbnQgPSB0aGlzLmhpc3RvcnlbaV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHBvaW50W3R5cGVdICE9PSAndW5kZWZpbmVkJyAmJiAhd2l0aGluKHBvaW50W3R5cGVdW2tleV0sIHBvc1t0eXBlXVtrZXldKSkge1xuICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgIHNhbWVbdHlwZV1ba2V5XSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBjc3MgPSB7IHRvcDogJycsIGxlZnQ6ICcnLCByaWdodDogJycsIGJvdHRvbTogJycgfTtcblxuICAgICAgdmFyIHRyYW5zY3JpYmUgPSBmdW5jdGlvbiB0cmFuc2NyaWJlKF9zYW1lLCBfcG9zKSB7XG4gICAgICAgIHZhciBoYXNPcHRpbWl6YXRpb25zID0gdHlwZW9mIF90aGlzOC5vcHRpb25zLm9wdGltaXphdGlvbnMgIT09ICd1bmRlZmluZWQnO1xuICAgICAgICB2YXIgZ3B1ID0gaGFzT3B0aW1pemF0aW9ucyA/IF90aGlzOC5vcHRpb25zLm9wdGltaXphdGlvbnMuZ3B1IDogbnVsbDtcbiAgICAgICAgaWYgKGdwdSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICB2YXIgeVBvcyA9IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgeFBvcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBpZiAoX3NhbWUudG9wKSB7XG4gICAgICAgICAgICBjc3MudG9wID0gMDtcbiAgICAgICAgICAgIHlQb3MgPSBfcG9zLnRvcDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3NzLmJvdHRvbSA9IDA7XG4gICAgICAgICAgICB5UG9zID0gLV9wb3MuYm90dG9tO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChfc2FtZS5sZWZ0KSB7XG4gICAgICAgICAgICBjc3MubGVmdCA9IDA7XG4gICAgICAgICAgICB4UG9zID0gX3Bvcy5sZWZ0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjc3MucmlnaHQgPSAwO1xuICAgICAgICAgICAgeFBvcyA9IC1fcG9zLnJpZ2h0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSkge1xuICAgICAgICAgICAgLy8gSHViU3BvdC90ZXRoZXIjMjA3XG4gICAgICAgICAgICB2YXIgcmV0aW5hID0gd2luZG93Lm1hdGNoTWVkaWEoJ29ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IDEuM2RwcHgpJykubWF0Y2hlcyB8fCB3aW5kb3cubWF0Y2hNZWRpYSgnb25seSBzY3JlZW4gYW5kICgtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDEuMyknKS5tYXRjaGVzO1xuICAgICAgICAgICAgaWYgKCFyZXRpbmEpIHtcbiAgICAgICAgICAgICAgeFBvcyA9IE1hdGgucm91bmQoeFBvcyk7XG4gICAgICAgICAgICAgIHlQb3MgPSBNYXRoLnJvdW5kKHlQb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNzc1t0cmFuc2Zvcm1LZXldID0gJ3RyYW5zbGF0ZVgoJyArIHhQb3MgKyAncHgpIHRyYW5zbGF0ZVkoJyArIHlQb3MgKyAncHgpJztcblxuICAgICAgICAgIGlmICh0cmFuc2Zvcm1LZXkgIT09ICdtc1RyYW5zZm9ybScpIHtcbiAgICAgICAgICAgIC8vIFRoZSBaIHRyYW5zZm9ybSB3aWxsIGtlZXAgdGhpcyBpbiB0aGUgR1BVIChmYXN0ZXIsIGFuZCBwcmV2ZW50cyBhcnRpZmFjdHMpLFxuICAgICAgICAgICAgLy8gYnV0IElFOSBkb2Vzbid0IHN1cHBvcnQgM2QgdHJhbnNmb3JtcyBhbmQgd2lsbCBjaG9rZS5cbiAgICAgICAgICAgIGNzc1t0cmFuc2Zvcm1LZXldICs9IFwiIHRyYW5zbGF0ZVooMClcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF9zYW1lLnRvcCkge1xuICAgICAgICAgICAgY3NzLnRvcCA9IF9wb3MudG9wICsgJ3B4JztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3NzLmJvdHRvbSA9IF9wb3MuYm90dG9tICsgJ3B4JztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoX3NhbWUubGVmdCkge1xuICAgICAgICAgICAgY3NzLmxlZnQgPSBfcG9zLmxlZnQgKyAncHgnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjc3MucmlnaHQgPSBfcG9zLnJpZ2h0ICsgJ3B4JztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHZhciBtb3ZlZCA9IGZhbHNlO1xuICAgICAgaWYgKChzYW1lLnBhZ2UudG9wIHx8IHNhbWUucGFnZS5ib3R0b20pICYmIChzYW1lLnBhZ2UubGVmdCB8fCBzYW1lLnBhZ2UucmlnaHQpKSB7XG4gICAgICAgIGNzcy5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIHRyYW5zY3JpYmUoc2FtZS5wYWdlLCBwb3MucGFnZSk7XG4gICAgICB9IGVsc2UgaWYgKChzYW1lLnZpZXdwb3J0LnRvcCB8fCBzYW1lLnZpZXdwb3J0LmJvdHRvbSkgJiYgKHNhbWUudmlld3BvcnQubGVmdCB8fCBzYW1lLnZpZXdwb3J0LnJpZ2h0KSkge1xuICAgICAgICBjc3MucG9zaXRpb24gPSAnZml4ZWQnO1xuICAgICAgICB0cmFuc2NyaWJlKHNhbWUudmlld3BvcnQsIHBvcy52aWV3cG9ydCk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzYW1lLm9mZnNldCAhPT0gJ3VuZGVmaW5lZCcgJiYgc2FtZS5vZmZzZXQudG9wICYmIHNhbWUub2Zmc2V0LmxlZnQpIHtcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjc3MucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICAgIHZhciBvZmZzZXRQYXJlbnQgPSBfdGhpczguY2FjaGUoJ3RhcmdldC1vZmZzZXRwYXJlbnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0T2Zmc2V0UGFyZW50KF90aGlzOC50YXJnZXQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKGdldE9mZnNldFBhcmVudChfdGhpczguZWxlbWVudCkgIT09IG9mZnNldFBhcmVudCkge1xuICAgICAgICAgICAgZGVmZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBfdGhpczguZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKF90aGlzOC5lbGVtZW50KTtcbiAgICAgICAgICAgICAgb2Zmc2V0UGFyZW50LmFwcGVuZENoaWxkKF90aGlzOC5lbGVtZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRyYW5zY3JpYmUoc2FtZS5vZmZzZXQsIHBvcy5vZmZzZXQpO1xuICAgICAgICAgIG1vdmVkID0gdHJ1ZTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNzcy5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIHRyYW5zY3JpYmUoeyB0b3A6IHRydWUsIGxlZnQ6IHRydWUgfSwgcG9zLnBhZ2UpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW1vdmVkKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYm9keUVsZW1lbnQpIHtcbiAgICAgICAgICB0aGlzLm9wdGlvbnMuYm9keUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgb2Zmc2V0UGFyZW50SXNCb2R5ID0gdHJ1ZTtcbiAgICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgJiYgY3VycmVudE5vZGUubm9kZVR5cGUgPT09IDEgJiYgY3VycmVudE5vZGUudGFnTmFtZSAhPT0gJ0JPRFknKSB7XG4gICAgICAgICAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShjdXJyZW50Tm9kZSkucG9zaXRpb24gIT09ICdzdGF0aWMnKSB7XG4gICAgICAgICAgICAgIG9mZnNldFBhcmVudElzQm9keSA9IGZhbHNlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghb2Zmc2V0UGFyZW50SXNCb2R5KSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBBbnkgY3NzIGNoYW5nZSB3aWxsIHRyaWdnZXIgYSByZXBhaW50LCBzbyBsZXQncyBhdm9pZCBvbmUgaWYgbm90aGluZyBjaGFuZ2VkXG4gICAgICB2YXIgd3JpdGVDU1MgPSB7fTtcbiAgICAgIHZhciB3cml0ZSA9IGZhbHNlO1xuICAgICAgZm9yICh2YXIga2V5IGluIGNzcykge1xuICAgICAgICB2YXIgdmFsID0gY3NzW2tleV07XG4gICAgICAgIHZhciBlbFZhbCA9IHRoaXMuZWxlbWVudC5zdHlsZVtrZXldO1xuXG4gICAgICAgIGlmIChlbFZhbCAhPT0gdmFsKSB7XG4gICAgICAgICAgd3JpdGUgPSB0cnVlO1xuICAgICAgICAgIHdyaXRlQ1NTW2tleV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHdyaXRlKSB7XG4gICAgICAgIGRlZmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBleHRlbmQoX3RoaXM4LmVsZW1lbnQuc3R5bGUsIHdyaXRlQ1NTKTtcbiAgICAgICAgICBfdGhpczgudHJpZ2dlcigncmVwb3NpdGlvbmVkJyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBUZXRoZXJDbGFzcztcbn0pKEV2ZW50ZWQpO1xuXG5UZXRoZXJDbGFzcy5tb2R1bGVzID0gW107XG5cblRldGhlckJhc2UucG9zaXRpb24gPSBwb3NpdGlvbjtcblxudmFyIFRldGhlciA9IGV4dGVuZChUZXRoZXJDbGFzcywgVGV0aGVyQmFzZSk7XG4vKiBnbG9iYWxzIFRldGhlckJhc2UgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVsncmV0dXJuJ10pIF9pWydyZXR1cm4nXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlJyk7IH0gfTsgfSkoKTtcblxudmFyIF9UZXRoZXJCYXNlJFV0aWxzID0gVGV0aGVyQmFzZS5VdGlscztcbnZhciBnZXRCb3VuZHMgPSBfVGV0aGVyQmFzZSRVdGlscy5nZXRCb3VuZHM7XG52YXIgZXh0ZW5kID0gX1RldGhlckJhc2UkVXRpbHMuZXh0ZW5kO1xudmFyIHVwZGF0ZUNsYXNzZXMgPSBfVGV0aGVyQmFzZSRVdGlscy51cGRhdGVDbGFzc2VzO1xudmFyIGRlZmVyID0gX1RldGhlckJhc2UkVXRpbHMuZGVmZXI7XG5cbnZhciBCT1VORFNfRk9STUFUID0gWydsZWZ0JywgJ3RvcCcsICdyaWdodCcsICdib3R0b20nXTtcblxuZnVuY3Rpb24gZ2V0Qm91bmRpbmdSZWN0KHRldGhlciwgdG8pIHtcbiAgaWYgKHRvID09PSAnc2Nyb2xsUGFyZW50Jykge1xuICAgIHRvID0gdGV0aGVyLnNjcm9sbFBhcmVudHNbMF07XG4gIH0gZWxzZSBpZiAodG8gPT09ICd3aW5kb3cnKSB7XG4gICAgdG8gPSBbcGFnZVhPZmZzZXQsIHBhZ2VZT2Zmc2V0LCBpbm5lcldpZHRoICsgcGFnZVhPZmZzZXQsIGlubmVySGVpZ2h0ICsgcGFnZVlPZmZzZXRdO1xuICB9XG5cbiAgaWYgKHRvID09PSBkb2N1bWVudCkge1xuICAgIHRvID0gdG8uZG9jdW1lbnRFbGVtZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiB0by5ub2RlVHlwZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG5vZGUgPSB0bztcbiAgICAgIHZhciBzaXplID0gZ2V0Qm91bmRzKHRvKTtcbiAgICAgIHZhciBwb3MgPSBzaXplO1xuICAgICAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0byk7XG5cbiAgICAgIHRvID0gW3Bvcy5sZWZ0LCBwb3MudG9wLCBzaXplLndpZHRoICsgcG9zLmxlZnQsIHNpemUuaGVpZ2h0ICsgcG9zLnRvcF07XG5cbiAgICAgIC8vIEFjY291bnQgYW55IHBhcmVudCBGcmFtZXMgc2Nyb2xsIG9mZnNldFxuICAgICAgaWYgKG5vZGUub3duZXJEb2N1bWVudCAhPT0gZG9jdW1lbnQpIHtcbiAgICAgICAgdmFyIHdpbiA9IG5vZGUub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldztcbiAgICAgICAgdG9bMF0gKz0gd2luLnBhZ2VYT2Zmc2V0O1xuICAgICAgICB0b1sxXSArPSB3aW4ucGFnZVlPZmZzZXQ7XG4gICAgICAgIHRvWzJdICs9IHdpbi5wYWdlWE9mZnNldDtcbiAgICAgICAgdG9bM10gKz0gd2luLnBhZ2VZT2Zmc2V0O1xuICAgICAgfVxuXG4gICAgICBCT1VORFNfRk9STUFULmZvckVhY2goZnVuY3Rpb24gKHNpZGUsIGkpIHtcbiAgICAgICAgc2lkZSA9IHNpZGVbMF0udG9VcHBlckNhc2UoKSArIHNpZGUuc3Vic3RyKDEpO1xuICAgICAgICBpZiAoc2lkZSA9PT0gJ1RvcCcgfHwgc2lkZSA9PT0gJ0xlZnQnKSB7XG4gICAgICAgICAgdG9baV0gKz0gcGFyc2VGbG9hdChzdHlsZVsnYm9yZGVyJyArIHNpZGUgKyAnV2lkdGgnXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9baV0gLT0gcGFyc2VGbG9hdChzdHlsZVsnYm9yZGVyJyArIHNpZGUgKyAnV2lkdGgnXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pKCk7XG4gIH1cblxuICByZXR1cm4gdG87XG59XG5cblRldGhlckJhc2UubW9kdWxlcy5wdXNoKHtcbiAgcG9zaXRpb246IGZ1bmN0aW9uIHBvc2l0aW9uKF9yZWYpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIHRvcCA9IF9yZWYudG9wO1xuICAgIHZhciBsZWZ0ID0gX3JlZi5sZWZ0O1xuICAgIHZhciB0YXJnZXRBdHRhY2htZW50ID0gX3JlZi50YXJnZXRBdHRhY2htZW50O1xuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuY29uc3RyYWludHMpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhciBfY2FjaGUgPSB0aGlzLmNhY2hlKCdlbGVtZW50LWJvdW5kcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBnZXRCb3VuZHMoX3RoaXMuZWxlbWVudCk7XG4gICAgfSk7XG5cbiAgICB2YXIgaGVpZ2h0ID0gX2NhY2hlLmhlaWdodDtcbiAgICB2YXIgd2lkdGggPSBfY2FjaGUud2lkdGg7XG5cbiAgICBpZiAod2lkdGggPT09IDAgJiYgaGVpZ2h0ID09PSAwICYmIHR5cGVvZiB0aGlzLmxhc3RTaXplICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFyIF9sYXN0U2l6ZSA9IHRoaXMubGFzdFNpemU7XG5cbiAgICAgIC8vIEhhbmRsZSB0aGUgaXRlbSBnZXR0aW5nIGhpZGRlbiBhcyBhIHJlc3VsdCBvZiBvdXIgcG9zaXRpb25pbmcgd2l0aG91dCBnbGl0Y2hpbmdcbiAgICAgIC8vIHRoZSBjbGFzc2VzIGluIGFuZCBvdXRcbiAgICAgIHdpZHRoID0gX2xhc3RTaXplLndpZHRoO1xuICAgICAgaGVpZ2h0ID0gX2xhc3RTaXplLmhlaWdodDtcbiAgICB9XG5cbiAgICB2YXIgdGFyZ2V0U2l6ZSA9IHRoaXMuY2FjaGUoJ3RhcmdldC1ib3VuZHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMuZ2V0VGFyZ2V0Qm91bmRzKCk7XG4gICAgfSk7XG5cbiAgICB2YXIgdGFyZ2V0SGVpZ2h0ID0gdGFyZ2V0U2l6ZS5oZWlnaHQ7XG4gICAgdmFyIHRhcmdldFdpZHRoID0gdGFyZ2V0U2l6ZS53aWR0aDtcblxuICAgIHZhciBhbGxDbGFzc2VzID0gW3RoaXMuZ2V0Q2xhc3MoJ3Bpbm5lZCcpLCB0aGlzLmdldENsYXNzKCdvdXQtb2YtYm91bmRzJyldO1xuXG4gICAgdGhpcy5vcHRpb25zLmNvbnN0cmFpbnRzLmZvckVhY2goZnVuY3Rpb24gKGNvbnN0cmFpbnQpIHtcbiAgICAgIHZhciBvdXRPZkJvdW5kc0NsYXNzID0gY29uc3RyYWludC5vdXRPZkJvdW5kc0NsYXNzO1xuICAgICAgdmFyIHBpbm5lZENsYXNzID0gY29uc3RyYWludC5waW5uZWRDbGFzcztcblxuICAgICAgaWYgKG91dE9mQm91bmRzQ2xhc3MpIHtcbiAgICAgICAgYWxsQ2xhc3Nlcy5wdXNoKG91dE9mQm91bmRzQ2xhc3MpO1xuICAgICAgfVxuICAgICAgaWYgKHBpbm5lZENsYXNzKSB7XG4gICAgICAgIGFsbENsYXNzZXMucHVzaChwaW5uZWRDbGFzcyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhbGxDbGFzc2VzLmZvckVhY2goZnVuY3Rpb24gKGNscykge1xuICAgICAgWydsZWZ0JywgJ3RvcCcsICdyaWdodCcsICdib3R0b20nXS5mb3JFYWNoKGZ1bmN0aW9uIChzaWRlKSB7XG4gICAgICAgIGFsbENsYXNzZXMucHVzaChjbHMgKyAnLScgKyBzaWRlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdmFyIGFkZENsYXNzZXMgPSBbXTtcblxuICAgIHZhciB0QXR0YWNobWVudCA9IGV4dGVuZCh7fSwgdGFyZ2V0QXR0YWNobWVudCk7XG4gICAgdmFyIGVBdHRhY2htZW50ID0gZXh0ZW5kKHt9LCB0aGlzLmF0dGFjaG1lbnQpO1xuXG4gICAgdGhpcy5vcHRpb25zLmNvbnN0cmFpbnRzLmZvckVhY2goZnVuY3Rpb24gKGNvbnN0cmFpbnQpIHtcbiAgICAgIHZhciB0byA9IGNvbnN0cmFpbnQudG87XG4gICAgICB2YXIgYXR0YWNobWVudCA9IGNvbnN0cmFpbnQuYXR0YWNobWVudDtcbiAgICAgIHZhciBwaW4gPSBjb25zdHJhaW50LnBpbjtcblxuICAgICAgaWYgKHR5cGVvZiBhdHRhY2htZW50ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBhdHRhY2htZW50ID0gJyc7XG4gICAgICB9XG5cbiAgICAgIHZhciBjaGFuZ2VBdHRhY2hYID0gdW5kZWZpbmVkLFxuICAgICAgICAgIGNoYW5nZUF0dGFjaFkgPSB1bmRlZmluZWQ7XG4gICAgICBpZiAoYXR0YWNobWVudC5pbmRleE9mKCcgJykgPj0gMCkge1xuICAgICAgICB2YXIgX2F0dGFjaG1lbnQkc3BsaXQgPSBhdHRhY2htZW50LnNwbGl0KCcgJyk7XG5cbiAgICAgICAgdmFyIF9hdHRhY2htZW50JHNwbGl0MiA9IF9zbGljZWRUb0FycmF5KF9hdHRhY2htZW50JHNwbGl0LCAyKTtcblxuICAgICAgICBjaGFuZ2VBdHRhY2hZID0gX2F0dGFjaG1lbnQkc3BsaXQyWzBdO1xuICAgICAgICBjaGFuZ2VBdHRhY2hYID0gX2F0dGFjaG1lbnQkc3BsaXQyWzFdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hhbmdlQXR0YWNoWCA9IGNoYW5nZUF0dGFjaFkgPSBhdHRhY2htZW50O1xuICAgICAgfVxuXG4gICAgICB2YXIgYm91bmRzID0gZ2V0Qm91bmRpbmdSZWN0KF90aGlzLCB0byk7XG5cbiAgICAgIGlmIChjaGFuZ2VBdHRhY2hZID09PSAndGFyZ2V0JyB8fCBjaGFuZ2VBdHRhY2hZID09PSAnYm90aCcpIHtcbiAgICAgICAgaWYgKHRvcCA8IGJvdW5kc1sxXSAmJiB0QXR0YWNobWVudC50b3AgPT09ICd0b3AnKSB7XG4gICAgICAgICAgdG9wICs9IHRhcmdldEhlaWdodDtcbiAgICAgICAgICB0QXR0YWNobWVudC50b3AgPSAnYm90dG9tJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b3AgKyBoZWlnaHQgPiBib3VuZHNbM10gJiYgdEF0dGFjaG1lbnQudG9wID09PSAnYm90dG9tJykge1xuICAgICAgICAgIHRvcCAtPSB0YXJnZXRIZWlnaHQ7XG4gICAgICAgICAgdEF0dGFjaG1lbnQudG9wID0gJ3RvcCc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZUF0dGFjaFkgPT09ICd0b2dldGhlcicpIHtcbiAgICAgICAgaWYgKHRBdHRhY2htZW50LnRvcCA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICBpZiAoZUF0dGFjaG1lbnQudG9wID09PSAnYm90dG9tJyAmJiB0b3AgPCBib3VuZHNbMV0pIHtcbiAgICAgICAgICAgIHRvcCArPSB0YXJnZXRIZWlnaHQ7XG4gICAgICAgICAgICB0QXR0YWNobWVudC50b3AgPSAnYm90dG9tJztcblxuICAgICAgICAgICAgdG9wICs9IGhlaWdodDtcbiAgICAgICAgICAgIGVBdHRhY2htZW50LnRvcCA9ICd0b3AnO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZUF0dGFjaG1lbnQudG9wID09PSAndG9wJyAmJiB0b3AgKyBoZWlnaHQgPiBib3VuZHNbM10gJiYgdG9wIC0gKGhlaWdodCAtIHRhcmdldEhlaWdodCkgPj0gYm91bmRzWzFdKSB7XG4gICAgICAgICAgICB0b3AgLT0gaGVpZ2h0IC0gdGFyZ2V0SGVpZ2h0O1xuICAgICAgICAgICAgdEF0dGFjaG1lbnQudG9wID0gJ2JvdHRvbSc7XG5cbiAgICAgICAgICAgIGVBdHRhY2htZW50LnRvcCA9ICdib3R0b20nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0QXR0YWNobWVudC50b3AgPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgaWYgKGVBdHRhY2htZW50LnRvcCA9PT0gJ3RvcCcgJiYgdG9wICsgaGVpZ2h0ID4gYm91bmRzWzNdKSB7XG4gICAgICAgICAgICB0b3AgLT0gdGFyZ2V0SGVpZ2h0O1xuICAgICAgICAgICAgdEF0dGFjaG1lbnQudG9wID0gJ3RvcCc7XG5cbiAgICAgICAgICAgIHRvcCAtPSBoZWlnaHQ7XG4gICAgICAgICAgICBlQXR0YWNobWVudC50b3AgPSAnYm90dG9tJztcbiAgICAgICAgICB9IGVsc2UgaWYgKGVBdHRhY2htZW50LnRvcCA9PT0gJ2JvdHRvbScgJiYgdG9wIDwgYm91bmRzWzFdICYmIHRvcCArIChoZWlnaHQgKiAyIC0gdGFyZ2V0SGVpZ2h0KSA8PSBib3VuZHNbM10pIHtcbiAgICAgICAgICAgIHRvcCArPSBoZWlnaHQgLSB0YXJnZXRIZWlnaHQ7XG4gICAgICAgICAgICB0QXR0YWNobWVudC50b3AgPSAndG9wJztcblxuICAgICAgICAgICAgZUF0dGFjaG1lbnQudG9wID0gJ3RvcCc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRBdHRhY2htZW50LnRvcCA9PT0gJ21pZGRsZScpIHtcbiAgICAgICAgICBpZiAodG9wICsgaGVpZ2h0ID4gYm91bmRzWzNdICYmIGVBdHRhY2htZW50LnRvcCA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgIHRvcCAtPSBoZWlnaHQ7XG4gICAgICAgICAgICBlQXR0YWNobWVudC50b3AgPSAnYm90dG9tJztcbiAgICAgICAgICB9IGVsc2UgaWYgKHRvcCA8IGJvdW5kc1sxXSAmJiBlQXR0YWNobWVudC50b3AgPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICB0b3AgKz0gaGVpZ2h0O1xuICAgICAgICAgICAgZUF0dGFjaG1lbnQudG9wID0gJ3RvcCc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGFuZ2VBdHRhY2hYID09PSAndGFyZ2V0JyB8fCBjaGFuZ2VBdHRhY2hYID09PSAnYm90aCcpIHtcbiAgICAgICAgaWYgKGxlZnQgPCBib3VuZHNbMF0gJiYgdEF0dGFjaG1lbnQubGVmdCA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgbGVmdCArPSB0YXJnZXRXaWR0aDtcbiAgICAgICAgICB0QXR0YWNobWVudC5sZWZ0ID0gJ3JpZ2h0JztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsZWZ0ICsgd2lkdGggPiBib3VuZHNbMl0gJiYgdEF0dGFjaG1lbnQubGVmdCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgIGxlZnQgLT0gdGFyZ2V0V2lkdGg7XG4gICAgICAgICAgdEF0dGFjaG1lbnQubGVmdCA9ICdsZWZ0JztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlQXR0YWNoWCA9PT0gJ3RvZ2V0aGVyJykge1xuICAgICAgICBpZiAobGVmdCA8IGJvdW5kc1swXSAmJiB0QXR0YWNobWVudC5sZWZ0ID09PSAnbGVmdCcpIHtcbiAgICAgICAgICBpZiAoZUF0dGFjaG1lbnQubGVmdCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgbGVmdCArPSB0YXJnZXRXaWR0aDtcbiAgICAgICAgICAgIHRBdHRhY2htZW50LmxlZnQgPSAncmlnaHQnO1xuXG4gICAgICAgICAgICBsZWZ0ICs9IHdpZHRoO1xuICAgICAgICAgICAgZUF0dGFjaG1lbnQubGVmdCA9ICdsZWZ0JztcbiAgICAgICAgICB9IGVsc2UgaWYgKGVBdHRhY2htZW50LmxlZnQgPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgbGVmdCArPSB0YXJnZXRXaWR0aDtcbiAgICAgICAgICAgIHRBdHRhY2htZW50LmxlZnQgPSAncmlnaHQnO1xuXG4gICAgICAgICAgICBsZWZ0IC09IHdpZHRoO1xuICAgICAgICAgICAgZUF0dGFjaG1lbnQubGVmdCA9ICdyaWdodCc7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGxlZnQgKyB3aWR0aCA+IGJvdW5kc1syXSAmJiB0QXR0YWNobWVudC5sZWZ0ID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgaWYgKGVBdHRhY2htZW50LmxlZnQgPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgbGVmdCAtPSB0YXJnZXRXaWR0aDtcbiAgICAgICAgICAgIHRBdHRhY2htZW50LmxlZnQgPSAnbGVmdCc7XG5cbiAgICAgICAgICAgIGxlZnQgLT0gd2lkdGg7XG4gICAgICAgICAgICBlQXR0YWNobWVudC5sZWZ0ID0gJ3JpZ2h0JztcbiAgICAgICAgICB9IGVsc2UgaWYgKGVBdHRhY2htZW50LmxlZnQgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgIGxlZnQgLT0gdGFyZ2V0V2lkdGg7XG4gICAgICAgICAgICB0QXR0YWNobWVudC5sZWZ0ID0gJ2xlZnQnO1xuXG4gICAgICAgICAgICBsZWZ0ICs9IHdpZHRoO1xuICAgICAgICAgICAgZUF0dGFjaG1lbnQubGVmdCA9ICdsZWZ0JztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodEF0dGFjaG1lbnQubGVmdCA9PT0gJ2NlbnRlcicpIHtcbiAgICAgICAgICBpZiAobGVmdCArIHdpZHRoID4gYm91bmRzWzJdICYmIGVBdHRhY2htZW50LmxlZnQgPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgbGVmdCAtPSB3aWR0aDtcbiAgICAgICAgICAgIGVBdHRhY2htZW50LmxlZnQgPSAncmlnaHQnO1xuICAgICAgICAgIH0gZWxzZSBpZiAobGVmdCA8IGJvdW5kc1swXSAmJiBlQXR0YWNobWVudC5sZWZ0ID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICBsZWZ0ICs9IHdpZHRoO1xuICAgICAgICAgICAgZUF0dGFjaG1lbnQubGVmdCA9ICdsZWZ0JztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZUF0dGFjaFkgPT09ICdlbGVtZW50JyB8fCBjaGFuZ2VBdHRhY2hZID09PSAnYm90aCcpIHtcbiAgICAgICAgaWYgKHRvcCA8IGJvdW5kc1sxXSAmJiBlQXR0YWNobWVudC50b3AgPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgdG9wICs9IGhlaWdodDtcbiAgICAgICAgICBlQXR0YWNobWVudC50b3AgPSAndG9wJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b3AgKyBoZWlnaHQgPiBib3VuZHNbM10gJiYgZUF0dGFjaG1lbnQudG9wID09PSAndG9wJykge1xuICAgICAgICAgIHRvcCAtPSBoZWlnaHQ7XG4gICAgICAgICAgZUF0dGFjaG1lbnQudG9wID0gJ2JvdHRvbSc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZUF0dGFjaFggPT09ICdlbGVtZW50JyB8fCBjaGFuZ2VBdHRhY2hYID09PSAnYm90aCcpIHtcbiAgICAgICAgaWYgKGxlZnQgPCBib3VuZHNbMF0pIHtcbiAgICAgICAgICBpZiAoZUF0dGFjaG1lbnQubGVmdCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgbGVmdCArPSB3aWR0aDtcbiAgICAgICAgICAgIGVBdHRhY2htZW50LmxlZnQgPSAnbGVmdCc7XG4gICAgICAgICAgfSBlbHNlIGlmIChlQXR0YWNobWVudC5sZWZ0ID09PSAnY2VudGVyJykge1xuICAgICAgICAgICAgbGVmdCArPSB3aWR0aCAvIDI7XG4gICAgICAgICAgICBlQXR0YWNobWVudC5sZWZ0ID0gJ2xlZnQnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsZWZ0ICsgd2lkdGggPiBib3VuZHNbMl0pIHtcbiAgICAgICAgICBpZiAoZUF0dGFjaG1lbnQubGVmdCA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICBsZWZ0IC09IHdpZHRoO1xuICAgICAgICAgICAgZUF0dGFjaG1lbnQubGVmdCA9ICdyaWdodCc7XG4gICAgICAgICAgfSBlbHNlIGlmIChlQXR0YWNobWVudC5sZWZ0ID09PSAnY2VudGVyJykge1xuICAgICAgICAgICAgbGVmdCAtPSB3aWR0aCAvIDI7XG4gICAgICAgICAgICBlQXR0YWNobWVudC5sZWZ0ID0gJ3JpZ2h0JztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBwaW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHBpbiA9IHBpbi5zcGxpdCgnLCcpLm1hcChmdW5jdGlvbiAocCkge1xuICAgICAgICAgIHJldHVybiBwLnRyaW0oKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHBpbiA9PT0gdHJ1ZSkge1xuICAgICAgICBwaW4gPSBbJ3RvcCcsICdsZWZ0JywgJ3JpZ2h0JywgJ2JvdHRvbSddO1xuICAgICAgfVxuXG4gICAgICBwaW4gPSBwaW4gfHwgW107XG5cbiAgICAgIHZhciBwaW5uZWQgPSBbXTtcbiAgICAgIHZhciBvb2IgPSBbXTtcblxuICAgICAgaWYgKHRvcCA8IGJvdW5kc1sxXSkge1xuICAgICAgICBpZiAocGluLmluZGV4T2YoJ3RvcCcpID49IDApIHtcbiAgICAgICAgICB0b3AgPSBib3VuZHNbMV07XG4gICAgICAgICAgcGlubmVkLnB1c2goJ3RvcCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9vYi5wdXNoKCd0b3AnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodG9wICsgaGVpZ2h0ID4gYm91bmRzWzNdKSB7XG4gICAgICAgIGlmIChwaW4uaW5kZXhPZignYm90dG9tJykgPj0gMCkge1xuICAgICAgICAgIHRvcCA9IGJvdW5kc1szXSAtIGhlaWdodDtcbiAgICAgICAgICBwaW5uZWQucHVzaCgnYm90dG9tJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb29iLnB1c2goJ2JvdHRvbScpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChsZWZ0IDwgYm91bmRzWzBdKSB7XG4gICAgICAgIGlmIChwaW4uaW5kZXhPZignbGVmdCcpID49IDApIHtcbiAgICAgICAgICBsZWZ0ID0gYm91bmRzWzBdO1xuICAgICAgICAgIHBpbm5lZC5wdXNoKCdsZWZ0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb29iLnB1c2goJ2xlZnQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobGVmdCArIHdpZHRoID4gYm91bmRzWzJdKSB7XG4gICAgICAgIGlmIChwaW4uaW5kZXhPZigncmlnaHQnKSA+PSAwKSB7XG4gICAgICAgICAgbGVmdCA9IGJvdW5kc1syXSAtIHdpZHRoO1xuICAgICAgICAgIHBpbm5lZC5wdXNoKCdyaWdodCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9vYi5wdXNoKCdyaWdodCcpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChwaW5uZWQubGVuZ3RoKSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIHBpbm5lZENsYXNzID0gdW5kZWZpbmVkO1xuICAgICAgICAgIGlmICh0eXBlb2YgX3RoaXMub3B0aW9ucy5waW5uZWRDbGFzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHBpbm5lZENsYXNzID0gX3RoaXMub3B0aW9ucy5waW5uZWRDbGFzcztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGlubmVkQ2xhc3MgPSBfdGhpcy5nZXRDbGFzcygncGlubmVkJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYWRkQ2xhc3Nlcy5wdXNoKHBpbm5lZENsYXNzKTtcbiAgICAgICAgICBwaW5uZWQuZm9yRWFjaChmdW5jdGlvbiAoc2lkZSkge1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcy5wdXNoKHBpbm5lZENsYXNzICsgJy0nICsgc2lkZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvb2IubGVuZ3RoKSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIG9vYkNsYXNzID0gdW5kZWZpbmVkO1xuICAgICAgICAgIGlmICh0eXBlb2YgX3RoaXMub3B0aW9ucy5vdXRPZkJvdW5kc0NsYXNzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgb29iQ2xhc3MgPSBfdGhpcy5vcHRpb25zLm91dE9mQm91bmRzQ2xhc3M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9vYkNsYXNzID0gX3RoaXMuZ2V0Q2xhc3MoJ291dC1vZi1ib3VuZHMnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhZGRDbGFzc2VzLnB1c2gob29iQ2xhc3MpO1xuICAgICAgICAgIG9vYi5mb3JFYWNoKGZ1bmN0aW9uIChzaWRlKSB7XG4gICAgICAgICAgICBhZGRDbGFzc2VzLnB1c2gob29iQ2xhc3MgKyAnLScgKyBzaWRlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBpbm5lZC5pbmRleE9mKCdsZWZ0JykgPj0gMCB8fCBwaW5uZWQuaW5kZXhPZigncmlnaHQnKSA+PSAwKSB7XG4gICAgICAgIGVBdHRhY2htZW50LmxlZnQgPSB0QXR0YWNobWVudC5sZWZ0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAocGlubmVkLmluZGV4T2YoJ3RvcCcpID49IDAgfHwgcGlubmVkLmluZGV4T2YoJ2JvdHRvbScpID49IDApIHtcbiAgICAgICAgZUF0dGFjaG1lbnQudG9wID0gdEF0dGFjaG1lbnQudG9wID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICh0QXR0YWNobWVudC50b3AgIT09IHRhcmdldEF0dGFjaG1lbnQudG9wIHx8IHRBdHRhY2htZW50LmxlZnQgIT09IHRhcmdldEF0dGFjaG1lbnQubGVmdCB8fCBlQXR0YWNobWVudC50b3AgIT09IF90aGlzLmF0dGFjaG1lbnQudG9wIHx8IGVBdHRhY2htZW50LmxlZnQgIT09IF90aGlzLmF0dGFjaG1lbnQubGVmdCkge1xuICAgICAgICBfdGhpcy51cGRhdGVBdHRhY2hDbGFzc2VzKGVBdHRhY2htZW50LCB0QXR0YWNobWVudCk7XG4gICAgICAgIF90aGlzLnRyaWdnZXIoJ3VwZGF0ZScsIHtcbiAgICAgICAgICBhdHRhY2htZW50OiBlQXR0YWNobWVudCxcbiAgICAgICAgICB0YXJnZXRBdHRhY2htZW50OiB0QXR0YWNobWVudFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGRlZmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghKF90aGlzLm9wdGlvbnMuYWRkVGFyZ2V0Q2xhc3NlcyA9PT0gZmFsc2UpKSB7XG4gICAgICAgIHVwZGF0ZUNsYXNzZXMoX3RoaXMudGFyZ2V0LCBhZGRDbGFzc2VzLCBhbGxDbGFzc2VzKTtcbiAgICAgIH1cbiAgICAgIHVwZGF0ZUNsYXNzZXMoX3RoaXMuZWxlbWVudCwgYWRkQ2xhc3NlcywgYWxsQ2xhc3Nlcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4geyB0b3A6IHRvcCwgbGVmdDogbGVmdCB9O1xuICB9XG59KTtcbi8qIGdsb2JhbHMgVGV0aGVyQmFzZSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfVGV0aGVyQmFzZSRVdGlscyA9IFRldGhlckJhc2UuVXRpbHM7XG52YXIgZ2V0Qm91bmRzID0gX1RldGhlckJhc2UkVXRpbHMuZ2V0Qm91bmRzO1xudmFyIHVwZGF0ZUNsYXNzZXMgPSBfVGV0aGVyQmFzZSRVdGlscy51cGRhdGVDbGFzc2VzO1xudmFyIGRlZmVyID0gX1RldGhlckJhc2UkVXRpbHMuZGVmZXI7XG5cblRldGhlckJhc2UubW9kdWxlcy5wdXNoKHtcbiAgcG9zaXRpb246IGZ1bmN0aW9uIHBvc2l0aW9uKF9yZWYpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIHRvcCA9IF9yZWYudG9wO1xuICAgIHZhciBsZWZ0ID0gX3JlZi5sZWZ0O1xuXG4gICAgdmFyIF9jYWNoZSA9IHRoaXMuY2FjaGUoJ2VsZW1lbnQtYm91bmRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGdldEJvdW5kcyhfdGhpcy5lbGVtZW50KTtcbiAgICB9KTtcblxuICAgIHZhciBoZWlnaHQgPSBfY2FjaGUuaGVpZ2h0O1xuICAgIHZhciB3aWR0aCA9IF9jYWNoZS53aWR0aDtcblxuICAgIHZhciB0YXJnZXRQb3MgPSB0aGlzLmdldFRhcmdldEJvdW5kcygpO1xuXG4gICAgdmFyIGJvdHRvbSA9IHRvcCArIGhlaWdodDtcbiAgICB2YXIgcmlnaHQgPSBsZWZ0ICsgd2lkdGg7XG5cbiAgICB2YXIgYWJ1dHRlZCA9IFtdO1xuICAgIGlmICh0b3AgPD0gdGFyZ2V0UG9zLmJvdHRvbSAmJiBib3R0b20gPj0gdGFyZ2V0UG9zLnRvcCkge1xuICAgICAgWydsZWZ0JywgJ3JpZ2h0J10uZm9yRWFjaChmdW5jdGlvbiAoc2lkZSkge1xuICAgICAgICB2YXIgdGFyZ2V0UG9zU2lkZSA9IHRhcmdldFBvc1tzaWRlXTtcbiAgICAgICAgaWYgKHRhcmdldFBvc1NpZGUgPT09IGxlZnQgfHwgdGFyZ2V0UG9zU2lkZSA9PT0gcmlnaHQpIHtcbiAgICAgICAgICBhYnV0dGVkLnB1c2goc2lkZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChsZWZ0IDw9IHRhcmdldFBvcy5yaWdodCAmJiByaWdodCA+PSB0YXJnZXRQb3MubGVmdCkge1xuICAgICAgWyd0b3AnLCAnYm90dG9tJ10uZm9yRWFjaChmdW5jdGlvbiAoc2lkZSkge1xuICAgICAgICB2YXIgdGFyZ2V0UG9zU2lkZSA9IHRhcmdldFBvc1tzaWRlXTtcbiAgICAgICAgaWYgKHRhcmdldFBvc1NpZGUgPT09IHRvcCB8fCB0YXJnZXRQb3NTaWRlID09PSBib3R0b20pIHtcbiAgICAgICAgICBhYnV0dGVkLnB1c2goc2lkZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBhbGxDbGFzc2VzID0gW107XG4gICAgdmFyIGFkZENsYXNzZXMgPSBbXTtcblxuICAgIHZhciBzaWRlcyA9IFsnbGVmdCcsICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJ107XG4gICAgYWxsQ2xhc3Nlcy5wdXNoKHRoaXMuZ2V0Q2xhc3MoJ2FidXR0ZWQnKSk7XG4gICAgc2lkZXMuZm9yRWFjaChmdW5jdGlvbiAoc2lkZSkge1xuICAgICAgYWxsQ2xhc3Nlcy5wdXNoKF90aGlzLmdldENsYXNzKCdhYnV0dGVkJykgKyAnLScgKyBzaWRlKTtcbiAgICB9KTtcblxuICAgIGlmIChhYnV0dGVkLmxlbmd0aCkge1xuICAgICAgYWRkQ2xhc3Nlcy5wdXNoKHRoaXMuZ2V0Q2xhc3MoJ2FidXR0ZWQnKSk7XG4gICAgfVxuXG4gICAgYWJ1dHRlZC5mb3JFYWNoKGZ1bmN0aW9uIChzaWRlKSB7XG4gICAgICBhZGRDbGFzc2VzLnB1c2goX3RoaXMuZ2V0Q2xhc3MoJ2FidXR0ZWQnKSArICctJyArIHNpZGUpO1xuICAgIH0pO1xuXG4gICAgZGVmZXIoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCEoX3RoaXMub3B0aW9ucy5hZGRUYXJnZXRDbGFzc2VzID09PSBmYWxzZSkpIHtcbiAgICAgICAgdXBkYXRlQ2xhc3NlcyhfdGhpcy50YXJnZXQsIGFkZENsYXNzZXMsIGFsbENsYXNzZXMpO1xuICAgICAgfVxuICAgICAgdXBkYXRlQ2xhc3NlcyhfdGhpcy5lbGVtZW50LCBhZGRDbGFzc2VzLCBhbGxDbGFzc2VzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG59KTtcbi8qIGdsb2JhbHMgVGV0aGVyQmFzZSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pWydyZXR1cm4nXSkgX2lbJ3JldHVybiddKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UnKTsgfSB9OyB9KSgpO1xuXG5UZXRoZXJCYXNlLm1vZHVsZXMucHVzaCh7XG4gIHBvc2l0aW9uOiBmdW5jdGlvbiBwb3NpdGlvbihfcmVmKSB7XG4gICAgdmFyIHRvcCA9IF9yZWYudG9wO1xuICAgIHZhciBsZWZ0ID0gX3JlZi5sZWZ0O1xuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuc2hpZnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgc2hpZnQgPSB0aGlzLm9wdGlvbnMuc2hpZnQ7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuc2hpZnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHNoaWZ0ID0gdGhpcy5vcHRpb25zLnNoaWZ0LmNhbGwodGhpcywgeyB0b3A6IHRvcCwgbGVmdDogbGVmdCB9KTtcbiAgICB9XG5cbiAgICB2YXIgc2hpZnRUb3AgPSB1bmRlZmluZWQsXG4gICAgICAgIHNoaWZ0TGVmdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAodHlwZW9mIHNoaWZ0ID09PSAnc3RyaW5nJykge1xuICAgICAgc2hpZnQgPSBzaGlmdC5zcGxpdCgnICcpO1xuICAgICAgc2hpZnRbMV0gPSBzaGlmdFsxXSB8fCBzaGlmdFswXTtcblxuICAgICAgdmFyIF9zaGlmdCA9IHNoaWZ0O1xuXG4gICAgICB2YXIgX3NoaWZ0MiA9IF9zbGljZWRUb0FycmF5KF9zaGlmdCwgMik7XG5cbiAgICAgIHNoaWZ0VG9wID0gX3NoaWZ0MlswXTtcbiAgICAgIHNoaWZ0TGVmdCA9IF9zaGlmdDJbMV07XG5cbiAgICAgIHNoaWZ0VG9wID0gcGFyc2VGbG9hdChzaGlmdFRvcCwgMTApO1xuICAgICAgc2hpZnRMZWZ0ID0gcGFyc2VGbG9hdChzaGlmdExlZnQsIDEwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2hpZnRUb3AgPSBzaGlmdC50b3A7XG4gICAgICBzaGlmdExlZnQgPSBzaGlmdC5sZWZ0O1xuICAgIH1cblxuICAgIHRvcCArPSBzaGlmdFRvcDtcbiAgICBsZWZ0ICs9IHNoaWZ0TGVmdDtcblxuICAgIHJldHVybiB7IHRvcDogdG9wLCBsZWZ0OiBsZWZ0IH07XG4gIH1cbn0pO1xucmV0dXJuIFRldGhlcjtcblxufSkpO1xuIl19
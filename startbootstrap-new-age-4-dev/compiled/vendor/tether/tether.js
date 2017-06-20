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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3ZlbmRvci90ZXRoZXIvdGV0aGVyLmpzIl0sIm5hbWVzIjpbInJvb3QiLCJmYWN0b3J5IiwiZGVmaW5lIiwiYW1kIiwiZXhwb3J0cyIsIm1vZHVsZSIsInJlcXVpcmUiLCJUZXRoZXIiLCJfY3JlYXRlQ2xhc3MiLCJkZWZpbmVQcm9wZXJ0aWVzIiwidGFyZ2V0IiwicHJvcHMiLCJpIiwibGVuZ3RoIiwiZGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwia2V5IiwiQ29uc3RydWN0b3IiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJwcm90b3R5cGUiLCJfY2xhc3NDYWxsQ2hlY2siLCJpbnN0YW5jZSIsIlR5cGVFcnJvciIsIlRldGhlckJhc2UiLCJ1bmRlZmluZWQiLCJtb2R1bGVzIiwiemVyb0VsZW1lbnQiLCJnZXRBY3R1YWxCb3VuZGluZ0NsaWVudFJlY3QiLCJub2RlIiwiYm91bmRpbmdSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicmVjdCIsImsiLCJvd25lckRvY3VtZW50IiwiZG9jdW1lbnQiLCJfZnJhbWVFbGVtZW50IiwiZGVmYXVsdFZpZXciLCJmcmFtZUVsZW1lbnQiLCJmcmFtZVJlY3QiLCJ0b3AiLCJib3R0b20iLCJsZWZ0IiwicmlnaHQiLCJnZXRTY3JvbGxQYXJlbnRzIiwiZWwiLCJjb21wdXRlZFN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInBvc2l0aW9uIiwicGFyZW50cyIsInBhcmVudCIsInBhcmVudE5vZGUiLCJub2RlVHlwZSIsInN0eWxlIiwiZXJyIiwicHVzaCIsIl9zdHlsZSIsIm92ZXJmbG93Iiwib3ZlcmZsb3dYIiwib3ZlcmZsb3dZIiwidGVzdCIsImluZGV4T2YiLCJib2R5IiwidW5pcXVlSWQiLCJpZCIsInplcm9Qb3NDYWNoZSIsImdldE9yaWdpbiIsImNvbnRhaW5zIiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImV4dGVuZCIsImFwcGVuZENoaWxkIiwiZ2V0QXR0cmlidXRlIiwiZGVmZXIiLCJyZW1vdmVVdGlsRWxlbWVudHMiLCJyZW1vdmVDaGlsZCIsImdldEJvdW5kcyIsImRvYyIsImRvY3VtZW50RWxlbWVudCIsImRvY0VsIiwiYm94Iiwib3JpZ2luIiwid2lkdGgiLCJzY3JvbGxXaWR0aCIsImhlaWdodCIsInNjcm9sbEhlaWdodCIsImNsaWVudFRvcCIsImNsaWVudExlZnQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsImdldE9mZnNldFBhcmVudCIsIm9mZnNldFBhcmVudCIsIl9zY3JvbGxCYXJTaXplIiwiZ2V0U2Nyb2xsQmFyU2l6ZSIsImlubmVyIiwib3V0ZXIiLCJwb2ludGVyRXZlbnRzIiwidmlzaWJpbGl0eSIsIndpZHRoQ29udGFpbmVkIiwib2Zmc2V0V2lkdGgiLCJ3aWR0aFNjcm9sbCIsIm91dCIsImFyZ3VtZW50cyIsImFyZ3MiLCJBcnJheSIsImFwcGx5Iiwic2xpY2UiLCJmb3JFYWNoIiwib2JqIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwicmVtb3ZlQ2xhc3MiLCJuYW1lIiwiY2xhc3NMaXN0Iiwic3BsaXQiLCJjbHMiLCJ0cmltIiwicmVtb3ZlIiwicmVnZXgiLCJSZWdFeHAiLCJqb2luIiwiY2xhc3NOYW1lIiwiZ2V0Q2xhc3NOYW1lIiwicmVwbGFjZSIsInNldENsYXNzTmFtZSIsImFkZENsYXNzIiwiYWRkIiwiaGFzQ2xhc3MiLCJTVkdBbmltYXRlZFN0cmluZyIsImJhc2VWYWwiLCJ1cGRhdGVDbGFzc2VzIiwiYWxsIiwiZGVmZXJyZWQiLCJmbiIsImZsdXNoIiwicG9wIiwiRXZlbnRlZCIsInZhbHVlIiwib24iLCJldmVudCIsImhhbmRsZXIiLCJjdHgiLCJvbmNlIiwiYmluZGluZ3MiLCJvZmYiLCJzcGxpY2UiLCJ0cmlnZ2VyIiwiX2xlbiIsIl9rZXkiLCJfYmluZGluZ3MkZXZlbnQkaSIsImNvbnRleHQiLCJVdGlscyIsIl9zbGljZWRUb0FycmF5Iiwic2xpY2VJdGVyYXRvciIsImFyciIsIl9hcnIiLCJfbiIsIl9kIiwiX2UiLCJfaSIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiX3MiLCJuZXh0IiwiZG9uZSIsImlzQXJyYXkiLCJfZ2V0IiwiZ2V0IiwiX3g2IiwiX3g3IiwiX3g4IiwiX2FnYWluIiwiX2Z1bmN0aW9uIiwib2JqZWN0IiwicHJvcGVydHkiLCJyZWNlaXZlciIsIkZ1bmN0aW9uIiwiZGVzYyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImdldFByb3RvdHlwZU9mIiwiZ2V0dGVyIiwiX2luaGVyaXRzIiwic3ViQ2xhc3MiLCJzdXBlckNsYXNzIiwiY3JlYXRlIiwiY29uc3RydWN0b3IiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsIkVycm9yIiwiX1RldGhlckJhc2UkVXRpbHMiLCJ3aXRoaW4iLCJhIiwiYiIsImRpZmYiLCJ0cmFuc2Zvcm1LZXkiLCJ0cmFuc2Zvcm1zIiwidGV0aGVycyIsInRldGhlciIsIm5vdyIsInBlcmZvcm1hbmNlIiwiRGF0ZSIsImxhc3RDYWxsIiwibGFzdER1cmF0aW9uIiwicGVuZGluZ1RpbWVvdXQiLCJ0aWNrIiwiTWF0aCIsIm1pbiIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiTUlSUk9SX0xSIiwiY2VudGVyIiwiTUlSUk9SX1RCIiwibWlkZGxlIiwiT0ZGU0VUX01BUCIsImF1dG9Ub0ZpeGVkQXR0YWNobWVudCIsImF0dGFjaG1lbnQiLCJyZWxhdGl2ZVRvQXR0YWNobWVudCIsImF0dGFjaG1lbnRUb09mZnNldCIsImFkZE9mZnNldCIsIm9mZnNldHMiLCJfcmVmIiwicGFyc2VGbG9hdCIsIm9mZnNldFRvUHgiLCJvZmZzZXQiLCJzaXplIiwicGFyc2VPZmZzZXQiLCJfdmFsdWUkc3BsaXQiLCJfdmFsdWUkc3BsaXQyIiwicGFyc2VBdHRhY2htZW50IiwiVGV0aGVyQ2xhc3MiLCJfRXZlbnRlZCIsIm9wdGlvbnMiLCJfdGhpcyIsImJpbmQiLCJoaXN0b3J5Iiwic2V0T3B0aW9ucyIsImluaXRpYWxpemUiLCJnZXRDbGFzcyIsImNsYXNzZXMiLCJjbGFzc1ByZWZpeCIsIl90aGlzMiIsInBvcyIsImRlZmF1bHRzIiwidGFyZ2V0T2Zmc2V0IiwidGFyZ2V0QXR0YWNobWVudCIsIl9vcHRpb25zIiwiZWxlbWVudCIsInRhcmdldE1vZGlmaWVyIiwianF1ZXJ5IiwicXVlcnlTZWxlY3RvciIsImFkZFRhcmdldENsYXNzZXMiLCJzY3JvbGxQYXJlbnRzIiwiZGlzYWJsZSIsImVuYWJsZWQiLCJlbmFibGUiLCJnZXRUYXJnZXRCb3VuZHMiLCJwYWdlWU9mZnNldCIsInBhZ2VYT2Zmc2V0IiwiaW5uZXJIZWlnaHQiLCJpbm5lcldpZHRoIiwiYm91bmRzIiwiaGFzQm90dG9tU2Nyb2xsIiwic2Nyb2xsQm90dG9tIiwiYm9yZGVyVG9wV2lkdGgiLCJib3JkZXJCb3R0b21XaWR0aCIsImJvcmRlckxlZnRXaWR0aCIsImZpdEFkaiIsInBvdyIsIm1heCIsInNjcm9sbFBlcmNlbnRhZ2UiLCJzY3JvbGxUb3AiLCJjbGVhckNhY2hlIiwiX2NhY2hlIiwiY2FjaGUiLCJfdGhpczMiLCJfdGhpczQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGVzdHJveSIsIl90aGlzNSIsInVwZGF0ZUF0dGFjaENsYXNzZXMiLCJlbGVtZW50QXR0YWNoIiwidGFyZ2V0QXR0YWNoIiwiX3RoaXM2Iiwic2lkZXMiLCJfYWRkQXR0YWNoQ2xhc3NlcyIsInNpZGUiLCJfdGhpczciLCJmbHVzaENoYW5nZXMiLCJlbGVtZW50UG9zIiwibGFzdFNpemUiLCJfbGFzdFNpemUiLCJ0YXJnZXRQb3MiLCJ0YXJnZXRTaXplIiwibWFudWFsT2Zmc2V0IiwibWFudWFsVGFyZ2V0T2Zmc2V0IiwiX21vZHVsZTIiLCJyZXQiLCJzY3JvbGxiYXJTaXplIiwicGFnZSIsInZpZXdwb3J0Iiwid2luIiwicGFyZW50RWxlbWVudCIsIm9wdGltaXphdGlvbnMiLCJtb3ZlRWxlbWVudCIsIm9mZnNldFBvc2l0aW9uIiwib2Zmc2V0UGFyZW50U3R5bGUiLCJvZmZzZXRQYXJlbnRTaXplIiwib2Zmc2V0Qm9yZGVyIiwidG9Mb3dlckNhc2UiLCJzY3JvbGxMZWZ0IiwibW92ZSIsInVuc2hpZnQiLCJfdGhpczgiLCJzYW1lIiwidHlwZSIsImZvdW5kIiwicG9pbnQiLCJjc3MiLCJ0cmFuc2NyaWJlIiwiX3NhbWUiLCJfcG9zIiwiaGFzT3B0aW1pemF0aW9ucyIsImdwdSIsInlQb3MiLCJ4UG9zIiwibWF0Y2hNZWRpYSIsInJldGluYSIsIm1hdGNoZXMiLCJyb3VuZCIsIm1vdmVkIiwiYm9keUVsZW1lbnQiLCJvZmZzZXRQYXJlbnRJc0JvZHkiLCJjdXJyZW50Tm9kZSIsInRhZ05hbWUiLCJ3cml0ZUNTUyIsIndyaXRlIiwidmFsIiwiZWxWYWwiLCJCT1VORFNfRk9STUFUIiwiZ2V0Qm91bmRpbmdSZWN0IiwidG8iLCJ0b1VwcGVyQ2FzZSIsInN1YnN0ciIsImNvbnN0cmFpbnRzIiwidGFyZ2V0SGVpZ2h0IiwidGFyZ2V0V2lkdGgiLCJhbGxDbGFzc2VzIiwiY29uc3RyYWludCIsIm91dE9mQm91bmRzQ2xhc3MiLCJwaW5uZWRDbGFzcyIsImFkZENsYXNzZXMiLCJ0QXR0YWNobWVudCIsImVBdHRhY2htZW50IiwicGluIiwiY2hhbmdlQXR0YWNoWCIsImNoYW5nZUF0dGFjaFkiLCJfYXR0YWNobWVudCRzcGxpdCIsIl9hdHRhY2htZW50JHNwbGl0MiIsIm1hcCIsInAiLCJwaW5uZWQiLCJvb2IiLCJvb2JDbGFzcyIsImFidXR0ZWQiLCJ0YXJnZXRQb3NTaWRlIiwic2hpZnQiLCJzaGlmdFRvcCIsInNoaWZ0TGVmdCIsIl9zaGlmdCIsIl9zaGlmdDIiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7QUFFQyxXQUFTQSxJQUFULEVBQWVDLE9BQWYsRUFBd0I7QUFDdkIsTUFBSSxPQUFPQyxNQUFQLEtBQWtCLFVBQWxCLElBQWdDQSxPQUFPQyxHQUEzQyxFQUFnRDtBQUM5Q0QsV0FBT0Qs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O0FBRUMsQ0FoeERBLENBQUQiLCJmaWxlIjoidGV0aGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohIHRldGhlciAxLjQuMCAqL1xuXG4oZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzLCBtb2R1bGUpO1xuICB9IGVsc2Uge1xuICAgIHJvb3QuVGV0aGVyID0gZmFjdG9yeSgpO1xuICB9XG59KHRoaXMsIGZ1bmN0aW9uKHJlcXVpcmUsIGV4cG9ydHMsIG1vZHVsZSkge1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG52YXIgVGV0aGVyQmFzZSA9IHVuZGVmaW5lZDtcbmlmICh0eXBlb2YgVGV0aGVyQmFzZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgVGV0aGVyQmFzZSA9IHsgbW9kdWxlczogW10gfTtcbn1cblxudmFyIHplcm9FbGVtZW50ID0gbnVsbDtcblxuLy8gU2FtZSBhcyBuYXRpdmUgZ2V0Qm91bmRpbmdDbGllbnRSZWN0LCBleGNlcHQgaXQgdGFrZXMgaW50byBhY2NvdW50IHBhcmVudCA8ZnJhbWU+IG9mZnNldHNcbi8vIGlmIHRoZSBlbGVtZW50IGxpZXMgd2l0aGluIGEgbmVzdGVkIGRvY3VtZW50ICg8ZnJhbWU+IG9yIDxpZnJhbWU+LWxpa2UpLlxuZnVuY3Rpb24gZ2V0QWN0dWFsQm91bmRpbmdDbGllbnRSZWN0KG5vZGUpIHtcbiAgdmFyIGJvdW5kaW5nUmVjdCA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgLy8gVGhlIG9yaWdpbmFsIG9iamVjdCByZXR1cm5lZCBieSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgaXMgaW1tdXRhYmxlLCBzbyB3ZSBjbG9uZSBpdFxuICAvLyBXZSBjYW4ndCB1c2UgZXh0ZW5kIGJlY2F1c2UgdGhlIHByb3BlcnRpZXMgYXJlIG5vdCBjb25zaWRlcmVkIHBhcnQgb2YgdGhlIG9iamVjdCBieSBoYXNPd25Qcm9wZXJ0eSBpbiBJRTlcbiAgdmFyIHJlY3QgPSB7fTtcbiAgZm9yICh2YXIgayBpbiBib3VuZGluZ1JlY3QpIHtcbiAgICByZWN0W2tdID0gYm91bmRpbmdSZWN0W2tdO1xuICB9XG5cbiAgaWYgKG5vZGUub3duZXJEb2N1bWVudCAhPT0gZG9jdW1lbnQpIHtcbiAgICB2YXIgX2ZyYW1lRWxlbWVudCA9IG5vZGUub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5mcmFtZUVsZW1lbnQ7XG4gICAgaWYgKF9mcmFtZUVsZW1lbnQpIHtcbiAgICAgIHZhciBmcmFtZVJlY3QgPSBnZXRBY3R1YWxCb3VuZGluZ0NsaWVudFJlY3QoX2ZyYW1lRWxlbWVudCk7XG4gICAgICByZWN0LnRvcCArPSBmcmFtZVJlY3QudG9wO1xuICAgICAgcmVjdC5ib3R0b20gKz0gZnJhbWVSZWN0LnRvcDtcbiAgICAgIHJlY3QubGVmdCArPSBmcmFtZVJlY3QubGVmdDtcbiAgICAgIHJlY3QucmlnaHQgKz0gZnJhbWVSZWN0LmxlZnQ7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlY3Q7XG59XG5cbmZ1bmN0aW9uIGdldFNjcm9sbFBhcmVudHMoZWwpIHtcbiAgLy8gSW4gZmlyZWZveCBpZiB0aGUgZWwgaXMgaW5zaWRlIGFuIGlmcmFtZSB3aXRoIGRpc3BsYXk6IG5vbmU7IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCkgd2lsbCByZXR1cm4gbnVsbDtcbiAgLy8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTQ4Mzk3XG4gIHZhciBjb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbCkgfHwge307XG4gIHZhciBwb3NpdGlvbiA9IGNvbXB1dGVkU3R5bGUucG9zaXRpb247XG4gIHZhciBwYXJlbnRzID0gW107XG5cbiAgaWYgKHBvc2l0aW9uID09PSAnZml4ZWQnKSB7XG4gICAgcmV0dXJuIFtlbF07XG4gIH1cblxuICB2YXIgcGFyZW50ID0gZWw7XG4gIHdoaWxlICgocGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGUpICYmIHBhcmVudCAmJiBwYXJlbnQubm9kZVR5cGUgPT09IDEpIHtcbiAgICB2YXIgc3R5bGUgPSB1bmRlZmluZWQ7XG4gICAgdHJ5IHtcbiAgICAgIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShwYXJlbnQpO1xuICAgIH0gY2F0Y2ggKGVycikge31cblxuICAgIGlmICh0eXBlb2Ygc3R5bGUgPT09ICd1bmRlZmluZWQnIHx8IHN0eWxlID09PSBudWxsKSB7XG4gICAgICBwYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICAgIHJldHVybiBwYXJlbnRzO1xuICAgIH1cblxuICAgIHZhciBfc3R5bGUgPSBzdHlsZTtcbiAgICB2YXIgb3ZlcmZsb3cgPSBfc3R5bGUub3ZlcmZsb3c7XG4gICAgdmFyIG92ZXJmbG93WCA9IF9zdHlsZS5vdmVyZmxvd1g7XG4gICAgdmFyIG92ZXJmbG93WSA9IF9zdHlsZS5vdmVyZmxvd1k7XG5cbiAgICBpZiAoLyhhdXRvfHNjcm9sbCkvLnRlc3Qob3ZlcmZsb3cgKyBvdmVyZmxvd1kgKyBvdmVyZmxvd1gpKSB7XG4gICAgICBpZiAocG9zaXRpb24gIT09ICdhYnNvbHV0ZScgfHwgWydyZWxhdGl2ZScsICdhYnNvbHV0ZScsICdmaXhlZCddLmluZGV4T2Yoc3R5bGUucG9zaXRpb24pID49IDApIHtcbiAgICAgICAgcGFyZW50cy5wdXNoKHBhcmVudCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcGFyZW50cy5wdXNoKGVsLm93bmVyRG9jdW1lbnQuYm9keSk7XG5cbiAgLy8gSWYgdGhlIG5vZGUgaXMgd2l0aGluIGEgZnJhbWUsIGFjY291bnQgZm9yIHRoZSBwYXJlbnQgd2luZG93IHNjcm9sbFxuICBpZiAoZWwub3duZXJEb2N1bWVudCAhPT0gZG9jdW1lbnQpIHtcbiAgICBwYXJlbnRzLnB1c2goZWwub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldyk7XG4gIH1cblxuICByZXR1cm4gcGFyZW50cztcbn1cblxudmFyIHVuaXF1ZUlkID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGlkID0gMDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKytpZDtcbiAgfTtcbn0pKCk7XG5cbnZhciB6ZXJvUG9zQ2FjaGUgPSB7fTtcbnZhciBnZXRPcmlnaW4gPSBmdW5jdGlvbiBnZXRPcmlnaW4oKSB7XG4gIC8vIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBpcyB1bmZvcnR1bmF0ZWx5IHRvbyBhY2N1cmF0ZS4gIEl0IGludHJvZHVjZXMgYSBwaXhlbCBvciB0d28gb2ZcbiAgLy8gaml0dGVyIGFzIHRoZSB1c2VyIHNjcm9sbHMgdGhhdCBtZXNzZXMgd2l0aCBvdXIgYWJpbGl0eSB0byBkZXRlY3QgaWYgdHdvIHBvc2l0aW9uc1xuICAvLyBhcmUgZXF1aXZpbGFudCBvciBub3QuICBXZSBwbGFjZSBhbiBlbGVtZW50IGF0IHRoZSB0b3AgbGVmdCBvZiB0aGUgcGFnZSB0aGF0IHdpbGxcbiAgLy8gZ2V0IHRoZSBzYW1lIGppdHRlciwgc28gd2UgY2FuIGNhbmNlbCB0aGUgdHdvIG91dC5cbiAgdmFyIG5vZGUgPSB6ZXJvRWxlbWVudDtcbiAgaWYgKCFub2RlIHx8ICFkb2N1bWVudC5ib2R5LmNvbnRhaW5zKG5vZGUpKSB7XG4gICAgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5vZGUuc2V0QXR0cmlidXRlKCdkYXRhLXRldGhlci1pZCcsIHVuaXF1ZUlkKCkpO1xuICAgIGV4dGVuZChub2RlLnN0eWxlLCB7XG4gICAgICB0b3A6IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm9kZSk7XG5cbiAgICB6ZXJvRWxlbWVudCA9IG5vZGU7XG4gIH1cblxuICB2YXIgaWQgPSBub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS10ZXRoZXItaWQnKTtcbiAgaWYgKHR5cGVvZiB6ZXJvUG9zQ2FjaGVbaWRdID09PSAndW5kZWZpbmVkJykge1xuICAgIHplcm9Qb3NDYWNoZVtpZF0gPSBnZXRBY3R1YWxCb3VuZGluZ0NsaWVudFJlY3Qobm9kZSk7XG5cbiAgICAvLyBDbGVhciB0aGUgY2FjaGUgd2hlbiB0aGlzIHBvc2l0aW9uIGNhbGwgaXMgZG9uZVxuICAgIGRlZmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIGRlbGV0ZSB6ZXJvUG9zQ2FjaGVbaWRdO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHplcm9Qb3NDYWNoZVtpZF07XG59O1xuXG5mdW5jdGlvbiByZW1vdmVVdGlsRWxlbWVudHMoKSB7XG4gIGlmICh6ZXJvRWxlbWVudCkge1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoemVyb0VsZW1lbnQpO1xuICB9XG4gIHplcm9FbGVtZW50ID0gbnVsbDtcbn07XG5cbmZ1bmN0aW9uIGdldEJvdW5kcyhlbCkge1xuICB2YXIgZG9jID0gdW5kZWZpbmVkO1xuICBpZiAoZWwgPT09IGRvY3VtZW50KSB7XG4gICAgZG9jID0gZG9jdW1lbnQ7XG4gICAgZWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIH0gZWxzZSB7XG4gICAgZG9jID0gZWwub3duZXJEb2N1bWVudDtcbiAgfVxuXG4gIHZhciBkb2NFbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgdmFyIGJveCA9IGdldEFjdHVhbEJvdW5kaW5nQ2xpZW50UmVjdChlbCk7XG5cbiAgdmFyIG9yaWdpbiA9IGdldE9yaWdpbigpO1xuXG4gIGJveC50b3AgLT0gb3JpZ2luLnRvcDtcbiAgYm94LmxlZnQgLT0gb3JpZ2luLmxlZnQ7XG5cbiAgaWYgKHR5cGVvZiBib3gud2lkdGggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgYm94LndpZHRoID0gZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aCAtIGJveC5sZWZ0IC0gYm94LnJpZ2h0O1xuICB9XG4gIGlmICh0eXBlb2YgYm94LmhlaWdodCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBib3guaGVpZ2h0ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQgLSBib3gudG9wIC0gYm94LmJvdHRvbTtcbiAgfVxuXG4gIGJveC50b3AgPSBib3gudG9wIC0gZG9jRWwuY2xpZW50VG9wO1xuICBib3gubGVmdCA9IGJveC5sZWZ0IC0gZG9jRWwuY2xpZW50TGVmdDtcbiAgYm94LnJpZ2h0ID0gZG9jLmJvZHkuY2xpZW50V2lkdGggLSBib3gud2lkdGggLSBib3gubGVmdDtcbiAgYm94LmJvdHRvbSA9IGRvYy5ib2R5LmNsaWVudEhlaWdodCAtIGJveC5oZWlnaHQgLSBib3gudG9wO1xuXG4gIHJldHVybiBib3g7XG59XG5cbmZ1bmN0aW9uIGdldE9mZnNldFBhcmVudChlbCkge1xuICByZXR1cm4gZWwub2Zmc2V0UGFyZW50IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbn1cblxudmFyIF9zY3JvbGxCYXJTaXplID0gbnVsbDtcbmZ1bmN0aW9uIGdldFNjcm9sbEJhclNpemUoKSB7XG4gIGlmIChfc2Nyb2xsQmFyU2l6ZSkge1xuICAgIHJldHVybiBfc2Nyb2xsQmFyU2l6ZTtcbiAgfVxuICB2YXIgaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgaW5uZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gIGlubmVyLnN0eWxlLmhlaWdodCA9ICcyMDBweCc7XG5cbiAgdmFyIG91dGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGV4dGVuZChvdXRlci5zdHlsZSwge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHRvcDogMCxcbiAgICBsZWZ0OiAwLFxuICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgICB3aWR0aDogJzIwMHB4JyxcbiAgICBoZWlnaHQ6ICcxNTBweCcsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gIH0pO1xuXG4gIG91dGVyLmFwcGVuZENoaWxkKGlubmVyKTtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG91dGVyKTtcblxuICB2YXIgd2lkdGhDb250YWluZWQgPSBpbm5lci5vZmZzZXRXaWR0aDtcbiAgb3V0ZXIuc3R5bGUub3ZlcmZsb3cgPSAnc2Nyb2xsJztcbiAgdmFyIHdpZHRoU2Nyb2xsID0gaW5uZXIub2Zmc2V0V2lkdGg7XG5cbiAgaWYgKHdpZHRoQ29udGFpbmVkID09PSB3aWR0aFNjcm9sbCkge1xuICAgIHdpZHRoU2Nyb2xsID0gb3V0ZXIuY2xpZW50V2lkdGg7XG4gIH1cblxuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKG91dGVyKTtcblxuICB2YXIgd2lkdGggPSB3aWR0aENvbnRhaW5lZCAtIHdpZHRoU2Nyb2xsO1xuXG4gIF9zY3JvbGxCYXJTaXplID0geyB3aWR0aDogd2lkdGgsIGhlaWdodDogd2lkdGggfTtcbiAgcmV0dXJuIF9zY3JvbGxCYXJTaXplO1xufVxuXG5mdW5jdGlvbiBleHRlbmQoKSB7XG4gIHZhciBvdXQgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuICB2YXIgYXJncyA9IFtdO1xuXG4gIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGFyZ3MsIGFyZ3VtZW50cyk7XG5cbiAgYXJncy5zbGljZSgxKS5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcbiAgICBpZiAob2JqKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmICgoe30pLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgICAgb3V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWwsIG5hbWUpIHtcbiAgaWYgKHR5cGVvZiBlbC5jbGFzc0xpc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgbmFtZS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGNscykge1xuICAgICAgaWYgKGNscy50cmltKCkpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbHMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoJyhefCApJyArIG5hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKCB8JCknLCAnZ2knKTtcbiAgICB2YXIgY2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKGVsKS5yZXBsYWNlKHJlZ2V4LCAnICcpO1xuICAgIHNldENsYXNzTmFtZShlbCwgY2xhc3NOYW1lKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRDbGFzcyhlbCwgbmFtZSkge1xuICBpZiAodHlwZW9mIGVsLmNsYXNzTGlzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBuYW1lLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoY2xzKSB7XG4gICAgICBpZiAoY2xzLnRyaW0oKSkge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGNscyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmVtb3ZlQ2xhc3MoZWwsIG5hbWUpO1xuICAgIHZhciBjbHMgPSBnZXRDbGFzc05hbWUoZWwpICsgKCcgJyArIG5hbWUpO1xuICAgIHNldENsYXNzTmFtZShlbCwgY2xzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYXNDbGFzcyhlbCwgbmFtZSkge1xuICBpZiAodHlwZW9mIGVsLmNsYXNzTGlzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpO1xuICB9XG4gIHZhciBjbGFzc05hbWUgPSBnZXRDbGFzc05hbWUoZWwpO1xuICByZXR1cm4gbmV3IFJlZ0V4cCgnKF58ICknICsgbmFtZSArICcoIHwkKScsICdnaScpLnRlc3QoY2xhc3NOYW1lKTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKGVsKSB7XG4gIC8vIENhbid0IHVzZSBqdXN0IFNWR0FuaW1hdGVkU3RyaW5nIGhlcmUgc2luY2Ugbm9kZXMgd2l0aGluIGEgRnJhbWUgaW4gSUUgaGF2ZVxuICAvLyBjb21wbGV0ZWx5IHNlcGFyYXRlbHkgU1ZHQW5pbWF0ZWRTdHJpbmcgYmFzZSBjbGFzc2VzXG4gIGlmIChlbC5jbGFzc05hbWUgaW5zdGFuY2VvZiBlbC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LlNWR0FuaW1hdGVkU3RyaW5nKSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTmFtZS5iYXNlVmFsO1xuICB9XG4gIHJldHVybiBlbC5jbGFzc05hbWU7XG59XG5cbmZ1bmN0aW9uIHNldENsYXNzTmFtZShlbCwgY2xhc3NOYW1lKSB7XG4gIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjbGFzc05hbWUpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDbGFzc2VzKGVsLCBhZGQsIGFsbCkge1xuICAvLyBPZiB0aGUgc2V0IG9mICdhbGwnIGNsYXNzZXMsIHdlIG5lZWQgdGhlICdhZGQnIGNsYXNzZXMsIGFuZCBvbmx5IHRoZVxuICAvLyAnYWRkJyBjbGFzc2VzIHRvIGJlIHNldC5cbiAgYWxsLmZvckVhY2goZnVuY3Rpb24gKGNscykge1xuICAgIGlmIChhZGQuaW5kZXhPZihjbHMpID09PSAtMSAmJiBoYXNDbGFzcyhlbCwgY2xzKSkge1xuICAgICAgcmVtb3ZlQ2xhc3MoZWwsIGNscyk7XG4gICAgfVxuICB9KTtcblxuICBhZGQuZm9yRWFjaChmdW5jdGlvbiAoY2xzKSB7XG4gICAgaWYgKCFoYXNDbGFzcyhlbCwgY2xzKSkge1xuICAgICAgYWRkQ2xhc3MoZWwsIGNscyk7XG4gICAgfVxuICB9KTtcbn1cblxudmFyIGRlZmVycmVkID0gW107XG5cbnZhciBkZWZlciA9IGZ1bmN0aW9uIGRlZmVyKGZuKSB7XG4gIGRlZmVycmVkLnB1c2goZm4pO1xufTtcblxudmFyIGZsdXNoID0gZnVuY3Rpb24gZmx1c2goKSB7XG4gIHZhciBmbiA9IHVuZGVmaW5lZDtcbiAgd2hpbGUgKGZuID0gZGVmZXJyZWQucG9wKCkpIHtcbiAgICBmbigpO1xuICB9XG59O1xuXG52YXIgRXZlbnRlZCA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEV2ZW50ZWQoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV2ZW50ZWQpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEV2ZW50ZWQsIFt7XG4gICAga2V5OiAnb24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbihldmVudCwgaGFuZGxlciwgY3R4KSB7XG4gICAgICB2YXIgb25jZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMyB8fCBhcmd1bWVudHNbM10gPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogYXJndW1lbnRzWzNdO1xuXG4gICAgICBpZiAodHlwZW9mIHRoaXMuYmluZGluZ3MgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuYmluZGluZ3MgPSB7fTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5iaW5kaW5nc1tldmVudF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuYmluZGluZ3NbZXZlbnRdID0gW107XG4gICAgICB9XG4gICAgICB0aGlzLmJpbmRpbmdzW2V2ZW50XS5wdXNoKHsgaGFuZGxlcjogaGFuZGxlciwgY3R4OiBjdHgsIG9uY2U6IG9uY2UgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb25jZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uY2UoZXZlbnQsIGhhbmRsZXIsIGN0eCkge1xuICAgICAgdGhpcy5vbihldmVudCwgaGFuZGxlciwgY3R4LCB0cnVlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvZmYnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvZmYoZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5iaW5kaW5ncyA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHRoaXMuYmluZGluZ3NbZXZlbnRdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuYmluZGluZ3NbZXZlbnRdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMuYmluZGluZ3NbZXZlbnRdLmxlbmd0aCkge1xuICAgICAgICAgIGlmICh0aGlzLmJpbmRpbmdzW2V2ZW50XVtpXS5oYW5kbGVyID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRpbmdzW2V2ZW50XS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICsraTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd0cmlnZ2VyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJpZ2dlcihldmVudCkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmJpbmRpbmdzICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmJpbmRpbmdzW2V2ZW50XSkge1xuICAgICAgICB2YXIgaSA9IDA7XG5cbiAgICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoaSA8IHRoaXMuYmluZGluZ3NbZXZlbnRdLmxlbmd0aCkge1xuICAgICAgICAgIHZhciBfYmluZGluZ3MkZXZlbnQkaSA9IHRoaXMuYmluZGluZ3NbZXZlbnRdW2ldO1xuICAgICAgICAgIHZhciBoYW5kbGVyID0gX2JpbmRpbmdzJGV2ZW50JGkuaGFuZGxlcjtcbiAgICAgICAgICB2YXIgY3R4ID0gX2JpbmRpbmdzJGV2ZW50JGkuY3R4O1xuICAgICAgICAgIHZhciBvbmNlID0gX2JpbmRpbmdzJGV2ZW50JGkub25jZTtcblxuICAgICAgICAgIHZhciBjb250ZXh0ID0gY3R4O1xuICAgICAgICAgIGlmICh0eXBlb2YgY29udGV4dCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGhhbmRsZXIuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cbiAgICAgICAgICBpZiAob25jZSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kaW5nc1tldmVudF0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICArK2k7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEV2ZW50ZWQ7XG59KSgpO1xuXG5UZXRoZXJCYXNlLlV0aWxzID0ge1xuICBnZXRBY3R1YWxCb3VuZGluZ0NsaWVudFJlY3Q6IGdldEFjdHVhbEJvdW5kaW5nQ2xpZW50UmVjdCxcbiAgZ2V0U2Nyb2xsUGFyZW50czogZ2V0U2Nyb2xsUGFyZW50cyxcbiAgZ2V0Qm91bmRzOiBnZXRCb3VuZHMsXG4gIGdldE9mZnNldFBhcmVudDogZ2V0T2Zmc2V0UGFyZW50LFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgYWRkQ2xhc3M6IGFkZENsYXNzLFxuICByZW1vdmVDbGFzczogcmVtb3ZlQ2xhc3MsXG4gIGhhc0NsYXNzOiBoYXNDbGFzcyxcbiAgdXBkYXRlQ2xhc3NlczogdXBkYXRlQ2xhc3NlcyxcbiAgZGVmZXI6IGRlZmVyLFxuICBmbHVzaDogZmx1c2gsXG4gIHVuaXF1ZUlkOiB1bmlxdWVJZCxcbiAgRXZlbnRlZDogRXZlbnRlZCxcbiAgZ2V0U2Nyb2xsQmFyU2l6ZTogZ2V0U2Nyb2xsQmFyU2l6ZSxcbiAgcmVtb3ZlVXRpbEVsZW1lbnRzOiByZW1vdmVVdGlsRWxlbWVudHNcbn07XG4vKiBnbG9iYWxzIFRldGhlckJhc2UsIHBlcmZvcm1hbmNlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9zbGljZWRUb0FycmF5ID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbJ3JldHVybiddKSBfaVsncmV0dXJuJ10oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZScpOyB9IH07IH0pKCk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94NiwgX3g3LCBfeDgpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3g2LCBwcm9wZXJ0eSA9IF94NywgcmVjZWl2ZXIgPSBfeDg7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3g2ID0gcGFyZW50OyBfeDcgPSBwcm9wZXJ0eTsgX3g4ID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGRlc2MgPSBwYXJlbnQgPSB1bmRlZmluZWQ7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbmlmICh0eXBlb2YgVGV0aGVyQmFzZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBpbmNsdWRlIHRoZSB1dGlscy5qcyBmaWxlIGJlZm9yZSB0ZXRoZXIuanMnKTtcbn1cblxudmFyIF9UZXRoZXJCYXNlJFV0aWxzID0gVGV0aGVyQmFzZS5VdGlscztcbnZhciBnZXRTY3JvbGxQYXJlbnRzID0gX1RldGhlckJhc2UkVXRpbHMuZ2V0U2Nyb2xsUGFyZW50cztcbnZhciBnZXRCb3VuZHMgPSBfVGV0aGVyQmFzZSRVdGlscy5nZXRCb3VuZHM7XG52YXIgZ2V0T2Zmc2V0UGFyZW50ID0gX1RldGhlckJhc2UkVXRpbHMuZ2V0T2Zmc2V0UGFyZW50O1xudmFyIGV4dGVuZCA9IF9UZXRoZXJCYXNlJFV0aWxzLmV4dGVuZDtcbnZhciBhZGRDbGFzcyA9IF9UZXRoZXJCYXNlJFV0aWxzLmFkZENsYXNzO1xudmFyIHJlbW92ZUNsYXNzID0gX1RldGhlckJhc2UkVXRpbHMucmVtb3ZlQ2xhc3M7XG52YXIgdXBkYXRlQ2xhc3NlcyA9IF9UZXRoZXJCYXNlJFV0aWxzLnVwZGF0ZUNsYXNzZXM7XG52YXIgZGVmZXIgPSBfVGV0aGVyQmFzZSRVdGlscy5kZWZlcjtcbnZhciBmbHVzaCA9IF9UZXRoZXJCYXNlJFV0aWxzLmZsdXNoO1xudmFyIGdldFNjcm9sbEJhclNpemUgPSBfVGV0aGVyQmFzZSRVdGlscy5nZXRTY3JvbGxCYXJTaXplO1xudmFyIHJlbW92ZVV0aWxFbGVtZW50cyA9IF9UZXRoZXJCYXNlJFV0aWxzLnJlbW92ZVV0aWxFbGVtZW50cztcblxuZnVuY3Rpb24gd2l0aGluKGEsIGIpIHtcbiAgdmFyIGRpZmYgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyAxIDogYXJndW1lbnRzWzJdO1xuXG4gIHJldHVybiBhICsgZGlmZiA+PSBiICYmIGIgPj0gYSAtIGRpZmY7XG59XG5cbnZhciB0cmFuc2Zvcm1LZXkgPSAoZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiAnJztcbiAgfVxuICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICB2YXIgdHJhbnNmb3JtcyA9IFsndHJhbnNmb3JtJywgJ1dlYmtpdFRyYW5zZm9ybScsICdPVHJhbnNmb3JtJywgJ01velRyYW5zZm9ybScsICdtc1RyYW5zZm9ybSddO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRyYW5zZm9ybXMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIga2V5ID0gdHJhbnNmb3Jtc1tpXTtcbiAgICBpZiAoZWwuc3R5bGVba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgfVxufSkoKTtcblxudmFyIHRldGhlcnMgPSBbXTtcblxudmFyIHBvc2l0aW9uID0gZnVuY3Rpb24gcG9zaXRpb24oKSB7XG4gIHRldGhlcnMuZm9yRWFjaChmdW5jdGlvbiAodGV0aGVyKSB7XG4gICAgdGV0aGVyLnBvc2l0aW9uKGZhbHNlKTtcbiAgfSk7XG4gIGZsdXNoKCk7XG59O1xuXG5mdW5jdGlvbiBub3coKSB7XG4gIGlmICh0eXBlb2YgcGVyZm9ybWFuY2UgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBwZXJmb3JtYW5jZS5ub3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHBlcmZvcm1hbmNlLm5vdygpO1xuICB9XG4gIHJldHVybiArbmV3IERhdGUoKTtcbn1cblxuKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGxhc3RDYWxsID0gbnVsbDtcbiAgdmFyIGxhc3REdXJhdGlvbiA9IG51bGw7XG4gIHZhciBwZW5kaW5nVGltZW91dCA9IG51bGw7XG5cbiAgdmFyIHRpY2sgPSBmdW5jdGlvbiB0aWNrKCkge1xuICAgIGlmICh0eXBlb2YgbGFzdER1cmF0aW9uICE9PSAndW5kZWZpbmVkJyAmJiBsYXN0RHVyYXRpb24gPiAxNikge1xuICAgICAgLy8gV2Ugdm9sdW50YXJpbHkgdGhyb3R0bGUgb3Vyc2VsdmVzIGlmIHdlIGNhbid0IG1hbmFnZSA2MGZwc1xuICAgICAgbGFzdER1cmF0aW9uID0gTWF0aC5taW4obGFzdER1cmF0aW9uIC0gMTYsIDI1MCk7XG5cbiAgICAgIC8vIEp1c3QgaW4gY2FzZSB0aGlzIGlzIHRoZSBsYXN0IGV2ZW50LCByZW1lbWJlciB0byBwb3NpdGlvbiBqdXN0IG9uY2UgbW9yZVxuICAgICAgcGVuZGluZ1RpbWVvdXQgPSBzZXRUaW1lb3V0KHRpY2ssIDI1MCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBsYXN0Q2FsbCAhPT0gJ3VuZGVmaW5lZCcgJiYgbm93KCkgLSBsYXN0Q2FsbCA8IDEwKSB7XG4gICAgICAvLyBTb21lIGJyb3dzZXJzIGNhbGwgZXZlbnRzIGEgbGl0dGxlIHRvbyBmcmVxdWVudGx5LCByZWZ1c2UgdG8gcnVuIG1vcmUgdGhhbiBpcyByZWFzb25hYmxlXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHBlbmRpbmdUaW1lb3V0ICE9IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dChwZW5kaW5nVGltZW91dCk7XG4gICAgICBwZW5kaW5nVGltZW91dCA9IG51bGw7XG4gICAgfVxuXG4gICAgbGFzdENhbGwgPSBub3coKTtcbiAgICBwb3NpdGlvbigpO1xuICAgIGxhc3REdXJhdGlvbiA9IG5vdygpIC0gbGFzdENhbGw7XG4gIH07XG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBbJ3Jlc2l6ZScsICdzY3JvbGwnLCAndG91Y2htb3ZlJ10uZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aWNrKTtcbiAgICB9KTtcbiAgfVxufSkoKTtcblxudmFyIE1JUlJPUl9MUiA9IHtcbiAgY2VudGVyOiAnY2VudGVyJyxcbiAgbGVmdDogJ3JpZ2h0JyxcbiAgcmlnaHQ6ICdsZWZ0J1xufTtcblxudmFyIE1JUlJPUl9UQiA9IHtcbiAgbWlkZGxlOiAnbWlkZGxlJyxcbiAgdG9wOiAnYm90dG9tJyxcbiAgYm90dG9tOiAndG9wJ1xufTtcblxudmFyIE9GRlNFVF9NQVAgPSB7XG4gIHRvcDogMCxcbiAgbGVmdDogMCxcbiAgbWlkZGxlOiAnNTAlJyxcbiAgY2VudGVyOiAnNTAlJyxcbiAgYm90dG9tOiAnMTAwJScsXG4gIHJpZ2h0OiAnMTAwJSdcbn07XG5cbnZhciBhdXRvVG9GaXhlZEF0dGFjaG1lbnQgPSBmdW5jdGlvbiBhdXRvVG9GaXhlZEF0dGFjaG1lbnQoYXR0YWNobWVudCwgcmVsYXRpdmVUb0F0dGFjaG1lbnQpIHtcbiAgdmFyIGxlZnQgPSBhdHRhY2htZW50LmxlZnQ7XG4gIHZhciB0b3AgPSBhdHRhY2htZW50LnRvcDtcblxuICBpZiAobGVmdCA9PT0gJ2F1dG8nKSB7XG4gICAgbGVmdCA9IE1JUlJPUl9MUltyZWxhdGl2ZVRvQXR0YWNobWVudC5sZWZ0XTtcbiAgfVxuXG4gIGlmICh0b3AgPT09ICdhdXRvJykge1xuICAgIHRvcCA9IE1JUlJPUl9UQltyZWxhdGl2ZVRvQXR0YWNobWVudC50b3BdO1xuICB9XG5cbiAgcmV0dXJuIHsgbGVmdDogbGVmdCwgdG9wOiB0b3AgfTtcbn07XG5cbnZhciBhdHRhY2htZW50VG9PZmZzZXQgPSBmdW5jdGlvbiBhdHRhY2htZW50VG9PZmZzZXQoYXR0YWNobWVudCkge1xuICB2YXIgbGVmdCA9IGF0dGFjaG1lbnQubGVmdDtcbiAgdmFyIHRvcCA9IGF0dGFjaG1lbnQudG9wO1xuXG4gIGlmICh0eXBlb2YgT0ZGU0VUX01BUFthdHRhY2htZW50LmxlZnRdICE9PSAndW5kZWZpbmVkJykge1xuICAgIGxlZnQgPSBPRkZTRVRfTUFQW2F0dGFjaG1lbnQubGVmdF07XG4gIH1cblxuICBpZiAodHlwZW9mIE9GRlNFVF9NQVBbYXR0YWNobWVudC50b3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRvcCA9IE9GRlNFVF9NQVBbYXR0YWNobWVudC50b3BdO1xuICB9XG5cbiAgcmV0dXJuIHsgbGVmdDogbGVmdCwgdG9wOiB0b3AgfTtcbn07XG5cbmZ1bmN0aW9uIGFkZE9mZnNldCgpIHtcbiAgdmFyIG91dCA9IHsgdG9wOiAwLCBsZWZ0OiAwIH07XG5cbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIG9mZnNldHMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBvZmZzZXRzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgb2Zmc2V0cy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIHRvcCA9IF9yZWYudG9wO1xuICAgIHZhciBsZWZ0ID0gX3JlZi5sZWZ0O1xuXG4gICAgaWYgKHR5cGVvZiB0b3AgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0b3AgPSBwYXJzZUZsb2F0KHRvcCwgMTApO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGxlZnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZWZ0ID0gcGFyc2VGbG9hdChsZWZ0LCAxMCk7XG4gICAgfVxuXG4gICAgb3V0LnRvcCArPSB0b3A7XG4gICAgb3V0LmxlZnQgKz0gbGVmdDtcbiAgfSk7XG5cbiAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gb2Zmc2V0VG9QeChvZmZzZXQsIHNpemUpIHtcbiAgaWYgKHR5cGVvZiBvZmZzZXQubGVmdCA9PT0gJ3N0cmluZycgJiYgb2Zmc2V0LmxlZnQuaW5kZXhPZignJScpICE9PSAtMSkge1xuICAgIG9mZnNldC5sZWZ0ID0gcGFyc2VGbG9hdChvZmZzZXQubGVmdCwgMTApIC8gMTAwICogc2l6ZS53aWR0aDtcbiAgfVxuICBpZiAodHlwZW9mIG9mZnNldC50b3AgPT09ICdzdHJpbmcnICYmIG9mZnNldC50b3AuaW5kZXhPZignJScpICE9PSAtMSkge1xuICAgIG9mZnNldC50b3AgPSBwYXJzZUZsb2F0KG9mZnNldC50b3AsIDEwKSAvIDEwMCAqIHNpemUuaGVpZ2h0O1xuICB9XG5cbiAgcmV0dXJuIG9mZnNldDtcbn1cblxudmFyIHBhcnNlT2Zmc2V0ID0gZnVuY3Rpb24gcGFyc2VPZmZzZXQodmFsdWUpIHtcbiAgdmFyIF92YWx1ZSRzcGxpdCA9IHZhbHVlLnNwbGl0KCcgJyk7XG5cbiAgdmFyIF92YWx1ZSRzcGxpdDIgPSBfc2xpY2VkVG9BcnJheShfdmFsdWUkc3BsaXQsIDIpO1xuXG4gIHZhciB0b3AgPSBfdmFsdWUkc3BsaXQyWzBdO1xuICB2YXIgbGVmdCA9IF92YWx1ZSRzcGxpdDJbMV07XG5cbiAgcmV0dXJuIHsgdG9wOiB0b3AsIGxlZnQ6IGxlZnQgfTtcbn07XG52YXIgcGFyc2VBdHRhY2htZW50ID0gcGFyc2VPZmZzZXQ7XG5cbnZhciBUZXRoZXJDbGFzcyA9IChmdW5jdGlvbiAoX0V2ZW50ZWQpIHtcbiAgX2luaGVyaXRzKFRldGhlckNsYXNzLCBfRXZlbnRlZCk7XG5cbiAgZnVuY3Rpb24gVGV0aGVyQ2xhc3Mob3B0aW9ucykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVGV0aGVyQ2xhc3MpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoVGV0aGVyQ2xhc3MucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzKTtcbiAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5iaW5kKHRoaXMpO1xuXG4gICAgdGV0aGVycy5wdXNoKHRoaXMpO1xuXG4gICAgdGhpcy5oaXN0b3J5ID0gW107XG5cbiAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucywgZmFsc2UpO1xuXG4gICAgVGV0aGVyQmFzZS5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZSkge1xuICAgICAgaWYgKHR5cGVvZiBtb2R1bGUuaW5pdGlhbGl6ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbW9kdWxlLmluaXRpYWxpemUuY2FsbChfdGhpcyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnBvc2l0aW9uKCk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoVGV0aGVyQ2xhc3MsIFt7XG4gICAga2V5OiAnZ2V0Q2xhc3MnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDbGFzcygpIHtcbiAgICAgIHZhciBrZXkgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyAnJyA6IGFyZ3VtZW50c1swXTtcbiAgICAgIHZhciBjbGFzc2VzID0gdGhpcy5vcHRpb25zLmNsYXNzZXM7XG5cbiAgICAgIGlmICh0eXBlb2YgY2xhc3NlcyAhPT0gJ3VuZGVmaW5lZCcgJiYgY2xhc3Nlc1trZXldKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY2xhc3Nlc1trZXldO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuY2xhc3NQcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5jbGFzc1ByZWZpeCArICctJyArIGtleTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2V0T3B0aW9ucycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBwb3MgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB0cnVlIDogYXJndW1lbnRzWzFdO1xuXG4gICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgIG9mZnNldDogJzAgMCcsXG4gICAgICAgIHRhcmdldE9mZnNldDogJzAgMCcsXG4gICAgICAgIHRhcmdldEF0dGFjaG1lbnQ6ICdhdXRvIGF1dG8nLFxuICAgICAgICBjbGFzc1ByZWZpeDogJ3RldGhlcidcbiAgICAgIH07XG5cbiAgICAgIHRoaXMub3B0aW9ucyA9IGV4dGVuZChkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAgIHZhciBfb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgIHZhciBlbGVtZW50ID0gX29wdGlvbnMuZWxlbWVudDtcbiAgICAgIHZhciB0YXJnZXQgPSBfb3B0aW9ucy50YXJnZXQ7XG4gICAgICB2YXIgdGFyZ2V0TW9kaWZpZXIgPSBfb3B0aW9ucy50YXJnZXRNb2RpZmllcjtcblxuICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgdGhpcy50YXJnZXRNb2RpZmllciA9IHRhcmdldE1vZGlmaWVyO1xuXG4gICAgICBpZiAodGhpcy50YXJnZXQgPT09ICd2aWV3cG9ydCcpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgICB0aGlzLnRhcmdldE1vZGlmaWVyID0gJ3Zpc2libGUnO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnRhcmdldCA9PT0gJ3Njcm9sbC1oYW5kbGUnKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgICAgdGhpcy50YXJnZXRNb2RpZmllciA9ICdzY3JvbGwtaGFuZGxlJztcbiAgICAgIH1cblxuICAgICAgWydlbGVtZW50JywgJ3RhcmdldCddLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIF90aGlzMltrZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGV0aGVyIEVycm9yOiBCb3RoIGVsZW1lbnQgYW5kIHRhcmdldCBtdXN0IGJlIGRlZmluZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgX3RoaXMyW2tleV0uanF1ZXJ5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIF90aGlzMltrZXldID0gX3RoaXMyW2tleV1bMF07XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIF90aGlzMltrZXldID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIF90aGlzMltrZXldID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihfdGhpczJba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBhZGRDbGFzcyh0aGlzLmVsZW1lbnQsIHRoaXMuZ2V0Q2xhc3MoJ2VsZW1lbnQnKSk7XG4gICAgICBpZiAoISh0aGlzLm9wdGlvbnMuYWRkVGFyZ2V0Q2xhc3NlcyA9PT0gZmFsc2UpKSB7XG4gICAgICAgIGFkZENsYXNzKHRoaXMudGFyZ2V0LCB0aGlzLmdldENsYXNzKCd0YXJnZXQnKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5vcHRpb25zLmF0dGFjaG1lbnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZXRoZXIgRXJyb3I6IFlvdSBtdXN0IHByb3ZpZGUgYW4gYXR0YWNobWVudCcpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRhcmdldEF0dGFjaG1lbnQgPSBwYXJzZUF0dGFjaG1lbnQodGhpcy5vcHRpb25zLnRhcmdldEF0dGFjaG1lbnQpO1xuICAgICAgdGhpcy5hdHRhY2htZW50ID0gcGFyc2VBdHRhY2htZW50KHRoaXMub3B0aW9ucy5hdHRhY2htZW50KTtcbiAgICAgIHRoaXMub2Zmc2V0ID0gcGFyc2VPZmZzZXQodGhpcy5vcHRpb25zLm9mZnNldCk7XG4gICAgICB0aGlzLnRhcmdldE9mZnNldCA9IHBhcnNlT2Zmc2V0KHRoaXMub3B0aW9ucy50YXJnZXRPZmZzZXQpO1xuXG4gICAgICBpZiAodHlwZW9mIHRoaXMuc2Nyb2xsUGFyZW50cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnRhcmdldE1vZGlmaWVyID09PSAnc2Nyb2xsLWhhbmRsZScpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxQYXJlbnRzID0gW3RoaXMudGFyZ2V0XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsUGFyZW50cyA9IGdldFNjcm9sbFBhcmVudHModGhpcy50YXJnZXQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoISh0aGlzLm9wdGlvbnMuZW5hYmxlZCA9PT0gZmFsc2UpKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlKHBvcyk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0VGFyZ2V0Qm91bmRzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VGFyZ2V0Qm91bmRzKCkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnRhcmdldE1vZGlmaWVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAodGhpcy50YXJnZXRNb2RpZmllciA9PT0gJ3Zpc2libGUnKSB7XG4gICAgICAgICAgaWYgKHRoaXMudGFyZ2V0ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICByZXR1cm4geyB0b3A6IHBhZ2VZT2Zmc2V0LCBsZWZ0OiBwYWdlWE9mZnNldCwgaGVpZ2h0OiBpbm5lckhlaWdodCwgd2lkdGg6IGlubmVyV2lkdGggfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGJvdW5kcyA9IGdldEJvdW5kcyh0aGlzLnRhcmdldCk7XG5cbiAgICAgICAgICAgIHZhciBvdXQgPSB7XG4gICAgICAgICAgICAgIGhlaWdodDogYm91bmRzLmhlaWdodCxcbiAgICAgICAgICAgICAgd2lkdGg6IGJvdW5kcy53aWR0aCxcbiAgICAgICAgICAgICAgdG9wOiBib3VuZHMudG9wLFxuICAgICAgICAgICAgICBsZWZ0OiBib3VuZHMubGVmdFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgb3V0LmhlaWdodCA9IE1hdGgubWluKG91dC5oZWlnaHQsIGJvdW5kcy5oZWlnaHQgLSAocGFnZVlPZmZzZXQgLSBib3VuZHMudG9wKSk7XG4gICAgICAgICAgICBvdXQuaGVpZ2h0ID0gTWF0aC5taW4ob3V0LmhlaWdodCwgYm91bmRzLmhlaWdodCAtIChib3VuZHMudG9wICsgYm91bmRzLmhlaWdodCAtIChwYWdlWU9mZnNldCArIGlubmVySGVpZ2h0KSkpO1xuICAgICAgICAgICAgb3V0LmhlaWdodCA9IE1hdGgubWluKGlubmVySGVpZ2h0LCBvdXQuaGVpZ2h0KTtcbiAgICAgICAgICAgIG91dC5oZWlnaHQgLT0gMjtcblxuICAgICAgICAgICAgb3V0LndpZHRoID0gTWF0aC5taW4ob3V0LndpZHRoLCBib3VuZHMud2lkdGggLSAocGFnZVhPZmZzZXQgLSBib3VuZHMubGVmdCkpO1xuICAgICAgICAgICAgb3V0LndpZHRoID0gTWF0aC5taW4ob3V0LndpZHRoLCBib3VuZHMud2lkdGggLSAoYm91bmRzLmxlZnQgKyBib3VuZHMud2lkdGggLSAocGFnZVhPZmZzZXQgKyBpbm5lcldpZHRoKSkpO1xuICAgICAgICAgICAgb3V0LndpZHRoID0gTWF0aC5taW4oaW5uZXJXaWR0aCwgb3V0LndpZHRoKTtcbiAgICAgICAgICAgIG91dC53aWR0aCAtPSAyO1xuXG4gICAgICAgICAgICBpZiAob3V0LnRvcCA8IHBhZ2VZT2Zmc2V0KSB7XG4gICAgICAgICAgICAgIG91dC50b3AgPSBwYWdlWU9mZnNldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvdXQubGVmdCA8IHBhZ2VYT2Zmc2V0KSB7XG4gICAgICAgICAgICAgIG91dC5sZWZ0ID0gcGFnZVhPZmZzZXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGFyZ2V0TW9kaWZpZXIgPT09ICdzY3JvbGwtaGFuZGxlJykge1xuICAgICAgICAgIHZhciBib3VuZHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMudGFyZ2V0O1xuICAgICAgICAgIGlmICh0YXJnZXQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgIHRhcmdldCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgICAgICAgICAgYm91bmRzID0ge1xuICAgICAgICAgICAgICBsZWZ0OiBwYWdlWE9mZnNldCxcbiAgICAgICAgICAgICAgdG9wOiBwYWdlWU9mZnNldCxcbiAgICAgICAgICAgICAgaGVpZ2h0OiBpbm5lckhlaWdodCxcbiAgICAgICAgICAgICAgd2lkdGg6IGlubmVyV2lkdGhcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvdW5kcyA9IGdldEJvdW5kcyh0YXJnZXQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUodGFyZ2V0KTtcblxuICAgICAgICAgIHZhciBoYXNCb3R0b21TY3JvbGwgPSB0YXJnZXQuc2Nyb2xsV2lkdGggPiB0YXJnZXQuY2xpZW50V2lkdGggfHwgW3N0eWxlLm92ZXJmbG93LCBzdHlsZS5vdmVyZmxvd1hdLmluZGV4T2YoJ3Njcm9sbCcpID49IDAgfHwgdGhpcy50YXJnZXQgIT09IGRvY3VtZW50LmJvZHk7XG5cbiAgICAgICAgICB2YXIgc2Nyb2xsQm90dG9tID0gMDtcbiAgICAgICAgICBpZiAoaGFzQm90dG9tU2Nyb2xsKSB7XG4gICAgICAgICAgICBzY3JvbGxCb3R0b20gPSAxNTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaGVpZ2h0ID0gYm91bmRzLmhlaWdodCAtIHBhcnNlRmxvYXQoc3R5bGUuYm9yZGVyVG9wV2lkdGgpIC0gcGFyc2VGbG9hdChzdHlsZS5ib3JkZXJCb3R0b21XaWR0aCkgLSBzY3JvbGxCb3R0b207XG5cbiAgICAgICAgICB2YXIgb3V0ID0ge1xuICAgICAgICAgICAgd2lkdGg6IDE1LFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQgKiAwLjk3NSAqIChoZWlnaHQgLyB0YXJnZXQuc2Nyb2xsSGVpZ2h0KSxcbiAgICAgICAgICAgIGxlZnQ6IGJvdW5kcy5sZWZ0ICsgYm91bmRzLndpZHRoIC0gcGFyc2VGbG9hdChzdHlsZS5ib3JkZXJMZWZ0V2lkdGgpIC0gMTVcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIGZpdEFkaiA9IDA7XG4gICAgICAgICAgaWYgKGhlaWdodCA8IDQwOCAmJiB0aGlzLnRhcmdldCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgZml0QWRqID0gLTAuMDAwMTEgKiBNYXRoLnBvdyhoZWlnaHQsIDIpIC0gMC4wMDcyNyAqIGhlaWdodCArIDIyLjU4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLnRhcmdldCAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgb3V0LmhlaWdodCA9IE1hdGgubWF4KG91dC5oZWlnaHQsIDI0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc2Nyb2xsUGVyY2VudGFnZSA9IHRoaXMudGFyZ2V0LnNjcm9sbFRvcCAvICh0YXJnZXQuc2Nyb2xsSGVpZ2h0IC0gaGVpZ2h0KTtcbiAgICAgICAgICBvdXQudG9wID0gc2Nyb2xsUGVyY2VudGFnZSAqIChoZWlnaHQgLSBvdXQuaGVpZ2h0IC0gZml0QWRqKSArIGJvdW5kcy50b3AgKyBwYXJzZUZsb2F0KHN0eWxlLmJvcmRlclRvcFdpZHRoKTtcblxuICAgICAgICAgIGlmICh0aGlzLnRhcmdldCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgb3V0LmhlaWdodCA9IE1hdGgubWF4KG91dC5oZWlnaHQsIDI0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZ2V0Qm91bmRzKHRoaXMudGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjbGVhckNhY2hlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgICAgIHRoaXMuX2NhY2hlID0ge307XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY2FjaGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjYWNoZShrLCBnZXR0ZXIpIHtcbiAgICAgIC8vIE1vcmUgdGhhbiBvbmUgbW9kdWxlIHdpbGwgb2Z0ZW4gbmVlZCB0aGUgc2FtZSBET00gaW5mbywgc29cbiAgICAgIC8vIHdlIGtlZXAgYSBjYWNoZSB3aGljaCBpcyBjbGVhcmVkIG9uIGVhY2ggcG9zaXRpb24gY2FsbFxuICAgICAgaWYgKHR5cGVvZiB0aGlzLl9jYWNoZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5fY2FjaGUgPSB7fTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB0aGlzLl9jYWNoZVtrXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5fY2FjaGVba10gPSBnZXR0ZXIuY2FsbCh0aGlzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlW2tdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2VuYWJsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICB2YXIgcG9zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGFyZ3VtZW50c1swXTtcblxuICAgICAgaWYgKCEodGhpcy5vcHRpb25zLmFkZFRhcmdldENsYXNzZXMgPT09IGZhbHNlKSkge1xuICAgICAgICBhZGRDbGFzcyh0aGlzLnRhcmdldCwgdGhpcy5nZXRDbGFzcygnZW5hYmxlZCcpKTtcbiAgICAgIH1cbiAgICAgIGFkZENsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5nZXRDbGFzcygnZW5hYmxlZCcpKTtcbiAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG5cbiAgICAgIHRoaXMuc2Nyb2xsUGFyZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgaWYgKHBhcmVudCAhPT0gX3RoaXMzLnRhcmdldC5vd25lckRvY3VtZW50KSB7XG4gICAgICAgICAgcGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIF90aGlzMy5wb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAocG9zKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24oKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkaXNhYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICByZW1vdmVDbGFzcyh0aGlzLnRhcmdldCwgdGhpcy5nZXRDbGFzcygnZW5hYmxlZCcpKTtcbiAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5nZXRDbGFzcygnZW5hYmxlZCcpKTtcbiAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICBpZiAodHlwZW9mIHRoaXMuc2Nyb2xsUGFyZW50cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxQYXJlbnRzLmZvckVhY2goZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICAgIHBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBfdGhpczQucG9zaXRpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkZXN0cm95JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICB0aGlzLmRpc2FibGUoKTtcblxuICAgICAgdGV0aGVycy5mb3JFYWNoKGZ1bmN0aW9uICh0ZXRoZXIsIGkpIHtcbiAgICAgICAgaWYgKHRldGhlciA9PT0gX3RoaXM1KSB7XG4gICAgICAgICAgdGV0aGVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBSZW1vdmUgYW55IGVsZW1lbnRzIHdlIHdlcmUgdXNpbmcgZm9yIGNvbnZlbmllbmNlIGZyb20gdGhlIERPTVxuICAgICAgaWYgKHRldGhlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlbW92ZVV0aWxFbGVtZW50cygpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZUF0dGFjaENsYXNzZXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVBdHRhY2hDbGFzc2VzKGVsZW1lbnRBdHRhY2gsIHRhcmdldEF0dGFjaCkge1xuICAgICAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgICAgIGVsZW1lbnRBdHRhY2ggPSBlbGVtZW50QXR0YWNoIHx8IHRoaXMuYXR0YWNobWVudDtcbiAgICAgIHRhcmdldEF0dGFjaCA9IHRhcmdldEF0dGFjaCB8fCB0aGlzLnRhcmdldEF0dGFjaG1lbnQ7XG4gICAgICB2YXIgc2lkZXMgPSBbJ2xlZnQnLCAndG9wJywgJ2JvdHRvbScsICdyaWdodCcsICdtaWRkbGUnLCAnY2VudGVyJ107XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fYWRkQXR0YWNoQ2xhc3NlcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5fYWRkQXR0YWNoQ2xhc3Nlcy5sZW5ndGgpIHtcbiAgICAgICAgLy8gdXBkYXRlQXR0YWNoQ2xhc3NlcyBjYW4gYmUgY2FsbGVkIG1vcmUgdGhhbiBvbmNlIGluIGEgcG9zaXRpb24gY2FsbCwgc29cbiAgICAgICAgLy8gd2UgbmVlZCB0byBjbGVhbiB1cCBhZnRlciBvdXJzZWx2ZXMgc3VjaCB0aGF0IHdoZW4gdGhlIGxhc3QgZGVmZXIgZ2V0c1xuICAgICAgICAvLyByYW4gaXQgZG9lc24ndCBhZGQgYW55IGV4dHJhIGNsYXNzZXMgZnJvbSBwcmV2aW91cyBjYWxscy5cbiAgICAgICAgdGhpcy5fYWRkQXR0YWNoQ2xhc3Nlcy5zcGxpY2UoMCwgdGhpcy5fYWRkQXR0YWNoQ2xhc3Nlcy5sZW5ndGgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRoaXMuX2FkZEF0dGFjaENsYXNzZXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuX2FkZEF0dGFjaENsYXNzZXMgPSBbXTtcbiAgICAgIH1cbiAgICAgIHZhciBhZGQgPSB0aGlzLl9hZGRBdHRhY2hDbGFzc2VzO1xuXG4gICAgICBpZiAoZWxlbWVudEF0dGFjaC50b3ApIHtcbiAgICAgICAgYWRkLnB1c2godGhpcy5nZXRDbGFzcygnZWxlbWVudC1hdHRhY2hlZCcpICsgJy0nICsgZWxlbWVudEF0dGFjaC50b3ApO1xuICAgICAgfVxuICAgICAgaWYgKGVsZW1lbnRBdHRhY2gubGVmdCkge1xuICAgICAgICBhZGQucHVzaCh0aGlzLmdldENsYXNzKCdlbGVtZW50LWF0dGFjaGVkJykgKyAnLScgKyBlbGVtZW50QXR0YWNoLmxlZnQpO1xuICAgICAgfVxuICAgICAgaWYgKHRhcmdldEF0dGFjaC50b3ApIHtcbiAgICAgICAgYWRkLnB1c2godGhpcy5nZXRDbGFzcygndGFyZ2V0LWF0dGFjaGVkJykgKyAnLScgKyB0YXJnZXRBdHRhY2gudG9wKTtcbiAgICAgIH1cbiAgICAgIGlmICh0YXJnZXRBdHRhY2gubGVmdCkge1xuICAgICAgICBhZGQucHVzaCh0aGlzLmdldENsYXNzKCd0YXJnZXQtYXR0YWNoZWQnKSArICctJyArIHRhcmdldEF0dGFjaC5sZWZ0KTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFsbCA9IFtdO1xuICAgICAgc2lkZXMuZm9yRWFjaChmdW5jdGlvbiAoc2lkZSkge1xuICAgICAgICBhbGwucHVzaChfdGhpczYuZ2V0Q2xhc3MoJ2VsZW1lbnQtYXR0YWNoZWQnKSArICctJyArIHNpZGUpO1xuICAgICAgICBhbGwucHVzaChfdGhpczYuZ2V0Q2xhc3MoJ3RhcmdldC1hdHRhY2hlZCcpICsgJy0nICsgc2lkZSk7XG4gICAgICB9KTtcblxuICAgICAgZGVmZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoISh0eXBlb2YgX3RoaXM2Ll9hZGRBdHRhY2hDbGFzc2VzICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVDbGFzc2VzKF90aGlzNi5lbGVtZW50LCBfdGhpczYuX2FkZEF0dGFjaENsYXNzZXMsIGFsbCk7XG4gICAgICAgIGlmICghKF90aGlzNi5vcHRpb25zLmFkZFRhcmdldENsYXNzZXMgPT09IGZhbHNlKSkge1xuICAgICAgICAgIHVwZGF0ZUNsYXNzZXMoX3RoaXM2LnRhcmdldCwgX3RoaXM2Ll9hZGRBdHRhY2hDbGFzc2VzLCBhbGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIF90aGlzNi5fYWRkQXR0YWNoQ2xhc3NlcztcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Bvc2l0aW9uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcG9zaXRpb24oKSB7XG4gICAgICB2YXIgX3RoaXM3ID0gdGhpcztcblxuICAgICAgdmFyIGZsdXNoQ2hhbmdlcyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHRydWUgOiBhcmd1bWVudHNbMF07XG5cbiAgICAgIC8vIGZsdXNoQ2hhbmdlcyBjb21taXRzIHRoZSBjaGFuZ2VzIGltbWVkaWF0ZWx5LCBsZWF2ZSB0cnVlIHVubGVzcyB5b3UgYXJlIHBvc2l0aW9uaW5nIG11bHRpcGxlXG4gICAgICAvLyB0ZXRoZXJzIChpbiB3aGljaCBjYXNlIGNhbGwgVGV0aGVyLlV0aWxzLmZsdXNoIHlvdXJzZWxmIHdoZW4geW91J3JlIGRvbmUpXG5cbiAgICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jbGVhckNhY2hlKCk7XG5cbiAgICAgIC8vIFR1cm4gJ2F1dG8nIGF0dGFjaG1lbnRzIGludG8gdGhlIGFwcHJvcHJpYXRlIGNvcm5lciBvciBlZGdlXG4gICAgICB2YXIgdGFyZ2V0QXR0YWNobWVudCA9IGF1dG9Ub0ZpeGVkQXR0YWNobWVudCh0aGlzLnRhcmdldEF0dGFjaG1lbnQsIHRoaXMuYXR0YWNobWVudCk7XG5cbiAgICAgIHRoaXMudXBkYXRlQXR0YWNoQ2xhc3Nlcyh0aGlzLmF0dGFjaG1lbnQsIHRhcmdldEF0dGFjaG1lbnQpO1xuXG4gICAgICB2YXIgZWxlbWVudFBvcyA9IHRoaXMuY2FjaGUoJ2VsZW1lbnQtYm91bmRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZ2V0Qm91bmRzKF90aGlzNy5lbGVtZW50KTtcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgd2lkdGggPSBlbGVtZW50UG9zLndpZHRoO1xuICAgICAgdmFyIGhlaWdodCA9IGVsZW1lbnRQb3MuaGVpZ2h0O1xuXG4gICAgICBpZiAod2lkdGggPT09IDAgJiYgaGVpZ2h0ID09PSAwICYmIHR5cGVvZiB0aGlzLmxhc3RTaXplICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgX2xhc3RTaXplID0gdGhpcy5sYXN0U2l6ZTtcblxuICAgICAgICAvLyBXZSBjYWNoZSB0aGUgaGVpZ2h0IGFuZCB3aWR0aCB0byBtYWtlIGl0IHBvc3NpYmxlIHRvIHBvc2l0aW9uIGVsZW1lbnRzIHRoYXQgYXJlXG4gICAgICAgIC8vIGdldHRpbmcgaGlkZGVuLlxuICAgICAgICB3aWR0aCA9IF9sYXN0U2l6ZS53aWR0aDtcbiAgICAgICAgaGVpZ2h0ID0gX2xhc3RTaXplLmhlaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubGFzdFNpemUgPSB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhcmdldFBvcyA9IHRoaXMuY2FjaGUoJ3RhcmdldC1ib3VuZHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpczcuZ2V0VGFyZ2V0Qm91bmRzKCk7XG4gICAgICB9KTtcbiAgICAgIHZhciB0YXJnZXRTaXplID0gdGFyZ2V0UG9zO1xuXG4gICAgICAvLyBHZXQgYW4gYWN0dWFsIHB4IG9mZnNldCBmcm9tIHRoZSBhdHRhY2htZW50XG4gICAgICB2YXIgb2Zmc2V0ID0gb2Zmc2V0VG9QeChhdHRhY2htZW50VG9PZmZzZXQodGhpcy5hdHRhY2htZW50KSwgeyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH0pO1xuICAgICAgdmFyIHRhcmdldE9mZnNldCA9IG9mZnNldFRvUHgoYXR0YWNobWVudFRvT2Zmc2V0KHRhcmdldEF0dGFjaG1lbnQpLCB0YXJnZXRTaXplKTtcblxuICAgICAgdmFyIG1hbnVhbE9mZnNldCA9IG9mZnNldFRvUHgodGhpcy5vZmZzZXQsIHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCB9KTtcbiAgICAgIHZhciBtYW51YWxUYXJnZXRPZmZzZXQgPSBvZmZzZXRUb1B4KHRoaXMudGFyZ2V0T2Zmc2V0LCB0YXJnZXRTaXplKTtcblxuICAgICAgLy8gQWRkIHRoZSBtYW51YWxseSBwcm92aWRlZCBvZmZzZXRcbiAgICAgIG9mZnNldCA9IGFkZE9mZnNldChvZmZzZXQsIG1hbnVhbE9mZnNldCk7XG4gICAgICB0YXJnZXRPZmZzZXQgPSBhZGRPZmZzZXQodGFyZ2V0T2Zmc2V0LCBtYW51YWxUYXJnZXRPZmZzZXQpO1xuXG4gICAgICAvLyBJdCdzIG5vdyBvdXIgZ29hbCB0byBtYWtlIChlbGVtZW50IHBvc2l0aW9uICsgb2Zmc2V0KSA9PSAodGFyZ2V0IHBvc2l0aW9uICsgdGFyZ2V0IG9mZnNldClcbiAgICAgIHZhciBsZWZ0ID0gdGFyZ2V0UG9zLmxlZnQgKyB0YXJnZXRPZmZzZXQubGVmdCAtIG9mZnNldC5sZWZ0O1xuICAgICAgdmFyIHRvcCA9IHRhcmdldFBvcy50b3AgKyB0YXJnZXRPZmZzZXQudG9wIC0gb2Zmc2V0LnRvcDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBUZXRoZXJCYXNlLm1vZHVsZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIF9tb2R1bGUyID0gVGV0aGVyQmFzZS5tb2R1bGVzW2ldO1xuICAgICAgICB2YXIgcmV0ID0gX21vZHVsZTIucG9zaXRpb24uY2FsbCh0aGlzLCB7XG4gICAgICAgICAgbGVmdDogbGVmdCxcbiAgICAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgICB0YXJnZXRBdHRhY2htZW50OiB0YXJnZXRBdHRhY2htZW50LFxuICAgICAgICAgIHRhcmdldFBvczogdGFyZ2V0UG9zLFxuICAgICAgICAgIGVsZW1lbnRQb3M6IGVsZW1lbnRQb3MsXG4gICAgICAgICAgb2Zmc2V0OiBvZmZzZXQsXG4gICAgICAgICAgdGFyZ2V0T2Zmc2V0OiB0YXJnZXRPZmZzZXQsXG4gICAgICAgICAgbWFudWFsT2Zmc2V0OiBtYW51YWxPZmZzZXQsXG4gICAgICAgICAgbWFudWFsVGFyZ2V0T2Zmc2V0OiBtYW51YWxUYXJnZXRPZmZzZXQsXG4gICAgICAgICAgc2Nyb2xsYmFyU2l6ZTogc2Nyb2xsYmFyU2l6ZSxcbiAgICAgICAgICBhdHRhY2htZW50OiB0aGlzLmF0dGFjaG1lbnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJldCA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHJldCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b3AgPSByZXQudG9wO1xuICAgICAgICAgIGxlZnQgPSByZXQubGVmdDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBXZSBkZXNjcmliZSB0aGUgcG9zaXRpb24gdGhyZWUgZGlmZmVyZW50IHdheXMgdG8gZ2l2ZSB0aGUgb3B0aW1pemVyXG4gICAgICAvLyBhIGNoYW5jZSB0byBkZWNpZGUgdGhlIGJlc3QgcG9zc2libGUgd2F5IHRvIHBvc2l0aW9uIHRoZSBlbGVtZW50XG4gICAgICAvLyB3aXRoIHRoZSBmZXdlc3QgcmVwYWludHMuXG4gICAgICB2YXIgbmV4dCA9IHtcbiAgICAgICAgLy8gSXQncyBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGUgcGFnZSAoYWJzb2x1dGUgcG9zaXRpb25pbmcgd2hlblxuICAgICAgICAvLyB0aGUgZWxlbWVudCBpcyBhIGNoaWxkIG9mIHRoZSBib2R5KVxuICAgICAgICBwYWdlOiB7XG4gICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgbGVmdDogbGVmdFxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIEl0J3MgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlIHZpZXdwb3J0IChmaXhlZCBwb3NpdGlvbmluZylcbiAgICAgICAgdmlld3BvcnQ6IHtcbiAgICAgICAgICB0b3A6IHRvcCAtIHBhZ2VZT2Zmc2V0LFxuICAgICAgICAgIGJvdHRvbTogcGFnZVlPZmZzZXQgLSB0b3AgLSBoZWlnaHQgKyBpbm5lckhlaWdodCxcbiAgICAgICAgICBsZWZ0OiBsZWZ0IC0gcGFnZVhPZmZzZXQsXG4gICAgICAgICAgcmlnaHQ6IHBhZ2VYT2Zmc2V0IC0gbGVmdCAtIHdpZHRoICsgaW5uZXJXaWR0aFxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB2YXIgZG9jID0gdGhpcy50YXJnZXQub3duZXJEb2N1bWVudDtcbiAgICAgIHZhciB3aW4gPSBkb2MuZGVmYXVsdFZpZXc7XG5cbiAgICAgIHZhciBzY3JvbGxiYXJTaXplID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKHdpbi5pbm5lckhlaWdodCA+IGRvYy5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSB7XG4gICAgICAgIHNjcm9sbGJhclNpemUgPSB0aGlzLmNhY2hlKCdzY3JvbGxiYXItc2l6ZScsIGdldFNjcm9sbEJhclNpemUpO1xuICAgICAgICBuZXh0LnZpZXdwb3J0LmJvdHRvbSAtPSBzY3JvbGxiYXJTaXplLmhlaWdodDtcbiAgICAgIH1cblxuICAgICAgaWYgKHdpbi5pbm5lcldpZHRoID4gZG9jLmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCkge1xuICAgICAgICBzY3JvbGxiYXJTaXplID0gdGhpcy5jYWNoZSgnc2Nyb2xsYmFyLXNpemUnLCBnZXRTY3JvbGxCYXJTaXplKTtcbiAgICAgICAgbmV4dC52aWV3cG9ydC5yaWdodCAtPSBzY3JvbGxiYXJTaXplLndpZHRoO1xuICAgICAgfVxuXG4gICAgICBpZiAoWycnLCAnc3RhdGljJ10uaW5kZXhPZihkb2MuYm9keS5zdHlsZS5wb3NpdGlvbikgPT09IC0xIHx8IFsnJywgJ3N0YXRpYyddLmluZGV4T2YoZG9jLmJvZHkucGFyZW50RWxlbWVudC5zdHlsZS5wb3NpdGlvbikgPT09IC0xKSB7XG4gICAgICAgIC8vIEFic29sdXRlIHBvc2l0aW9uaW5nIGluIHRoZSBib2R5IHdpbGwgYmUgcmVsYXRpdmUgdG8gdGhlIHBhZ2UsIG5vdCB0aGUgJ2luaXRpYWwgY29udGFpbmluZyBibG9jaydcbiAgICAgICAgbmV4dC5wYWdlLmJvdHRvbSA9IGRvYy5ib2R5LnNjcm9sbEhlaWdodCAtIHRvcCAtIGhlaWdodDtcbiAgICAgICAgbmV4dC5wYWdlLnJpZ2h0ID0gZG9jLmJvZHkuc2Nyb2xsV2lkdGggLSBsZWZ0IC0gd2lkdGg7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLm9wdGltaXphdGlvbnMgIT09ICd1bmRlZmluZWQnICYmIHRoaXMub3B0aW9ucy5vcHRpbWl6YXRpb25zLm1vdmVFbGVtZW50ICE9PSBmYWxzZSAmJiAhKHR5cGVvZiB0aGlzLnRhcmdldE1vZGlmaWVyICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgb2Zmc2V0UGFyZW50ID0gX3RoaXM3LmNhY2hlKCd0YXJnZXQtb2Zmc2V0cGFyZW50JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldE9mZnNldFBhcmVudChfdGhpczcudGFyZ2V0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YXIgb2Zmc2V0UG9zaXRpb24gPSBfdGhpczcuY2FjaGUoJ3RhcmdldC1vZmZzZXRwYXJlbnQtYm91bmRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldEJvdW5kcyhvZmZzZXRQYXJlbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhciBvZmZzZXRQYXJlbnRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUob2Zmc2V0UGFyZW50KTtcbiAgICAgICAgICB2YXIgb2Zmc2V0UGFyZW50U2l6ZSA9IG9mZnNldFBvc2l0aW9uO1xuXG4gICAgICAgICAgdmFyIG9mZnNldEJvcmRlciA9IHt9O1xuICAgICAgICAgIFsnVG9wJywgJ0xlZnQnLCAnQm90dG9tJywgJ1JpZ2h0J10uZm9yRWFjaChmdW5jdGlvbiAoc2lkZSkge1xuICAgICAgICAgICAgb2Zmc2V0Qm9yZGVyW3NpZGUudG9Mb3dlckNhc2UoKV0gPSBwYXJzZUZsb2F0KG9mZnNldFBhcmVudFN0eWxlWydib3JkZXInICsgc2lkZSArICdXaWR0aCddKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIG9mZnNldFBvc2l0aW9uLnJpZ2h0ID0gZG9jLmJvZHkuc2Nyb2xsV2lkdGggLSBvZmZzZXRQb3NpdGlvbi5sZWZ0IC0gb2Zmc2V0UGFyZW50U2l6ZS53aWR0aCArIG9mZnNldEJvcmRlci5yaWdodDtcbiAgICAgICAgICBvZmZzZXRQb3NpdGlvbi5ib3R0b20gPSBkb2MuYm9keS5zY3JvbGxIZWlnaHQgLSBvZmZzZXRQb3NpdGlvbi50b3AgLSBvZmZzZXRQYXJlbnRTaXplLmhlaWdodCArIG9mZnNldEJvcmRlci5ib3R0b207XG5cbiAgICAgICAgICBpZiAobmV4dC5wYWdlLnRvcCA+PSBvZmZzZXRQb3NpdGlvbi50b3AgKyBvZmZzZXRCb3JkZXIudG9wICYmIG5leHQucGFnZS5ib3R0b20gPj0gb2Zmc2V0UG9zaXRpb24uYm90dG9tKSB7XG4gICAgICAgICAgICBpZiAobmV4dC5wYWdlLmxlZnQgPj0gb2Zmc2V0UG9zaXRpb24ubGVmdCArIG9mZnNldEJvcmRlci5sZWZ0ICYmIG5leHQucGFnZS5yaWdodCA+PSBvZmZzZXRQb3NpdGlvbi5yaWdodCkge1xuICAgICAgICAgICAgICAvLyBXZSdyZSB3aXRoaW4gdGhlIHZpc2libGUgcGFydCBvZiB0aGUgdGFyZ2V0J3Mgc2Nyb2xsIHBhcmVudFxuICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG9wID0gb2Zmc2V0UGFyZW50LnNjcm9sbFRvcDtcbiAgICAgICAgICAgICAgdmFyIHNjcm9sbExlZnQgPSBvZmZzZXRQYXJlbnQuc2Nyb2xsTGVmdDtcblxuICAgICAgICAgICAgICAvLyBJdCdzIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZSB0YXJnZXQncyBvZmZzZXQgcGFyZW50IChhYnNvbHV0ZSBwb3NpdGlvbmluZyB3aGVuXG4gICAgICAgICAgICAgIC8vIHRoZSBlbGVtZW50IGlzIG1vdmVkIHRvIGJlIGEgY2hpbGQgb2YgdGhlIHRhcmdldCdzIG9mZnNldCBwYXJlbnQpLlxuICAgICAgICAgICAgICBuZXh0Lm9mZnNldCA9IHtcbiAgICAgICAgICAgICAgICB0b3A6IG5leHQucGFnZS50b3AgLSBvZmZzZXRQb3NpdGlvbi50b3AgKyBzY3JvbGxUb3AgLSBvZmZzZXRCb3JkZXIudG9wLFxuICAgICAgICAgICAgICAgIGxlZnQ6IG5leHQucGFnZS5sZWZ0IC0gb2Zmc2V0UG9zaXRpb24ubGVmdCArIHNjcm9sbExlZnQgLSBvZmZzZXRCb3JkZXIubGVmdFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcbiAgICAgIH1cblxuICAgICAgLy8gV2UgY291bGQgYWxzbyB0cmF2ZWwgdXAgdGhlIERPTSBhbmQgdHJ5IGVhY2ggY29udGFpbmluZyBjb250ZXh0LCByYXRoZXIgdGhhbiBvbmx5XG4gICAgICAvLyBsb29raW5nIGF0IHRoZSBib2R5LCBidXQgd2UncmUgZ29ubmEgZ2V0IGRpbWluaXNoaW5nIHJldHVybnMuXG5cbiAgICAgIHRoaXMubW92ZShuZXh0KTtcblxuICAgICAgdGhpcy5oaXN0b3J5LnVuc2hpZnQobmV4dCk7XG5cbiAgICAgIGlmICh0aGlzLmhpc3RvcnkubGVuZ3RoID4gMykge1xuICAgICAgICB0aGlzLmhpc3RvcnkucG9wKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmbHVzaENoYW5nZXMpIHtcbiAgICAgICAgZmx1c2goKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gVEhFIElTU1VFXG4gIH0sIHtcbiAgICBrZXk6ICdtb3ZlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbW92ZShwb3MpIHtcbiAgICAgIHZhciBfdGhpczggPSB0aGlzO1xuXG4gICAgICBpZiAoISh0eXBlb2YgdGhpcy5lbGVtZW50LnBhcmVudE5vZGUgIT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzYW1lID0ge307XG5cbiAgICAgIGZvciAodmFyIHR5cGUgaW4gcG9zKSB7XG4gICAgICAgIHNhbWVbdHlwZV0gPSB7fTtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gcG9zW3R5cGVdKSB7XG4gICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG5cbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaGlzdG9yeS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIHBvaW50ID0gdGhpcy5oaXN0b3J5W2ldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwb2ludFt0eXBlXSAhPT0gJ3VuZGVmaW5lZCcgJiYgIXdpdGhpbihwb2ludFt0eXBlXVtrZXldLCBwb3NbdHlwZV1ba2V5XSkpIHtcbiAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICBzYW1lW3R5cGVdW2tleV0gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgY3NzID0geyB0b3A6ICcnLCBsZWZ0OiAnJywgcmlnaHQ6ICcnLCBib3R0b206ICcnIH07XG5cbiAgICAgIHZhciB0cmFuc2NyaWJlID0gZnVuY3Rpb24gdHJhbnNjcmliZShfc2FtZSwgX3Bvcykge1xuICAgICAgICB2YXIgaGFzT3B0aW1pemF0aW9ucyA9IHR5cGVvZiBfdGhpczgub3B0aW9ucy5vcHRpbWl6YXRpb25zICE9PSAndW5kZWZpbmVkJztcbiAgICAgICAgdmFyIGdwdSA9IGhhc09wdGltaXphdGlvbnMgPyBfdGhpczgub3B0aW9ucy5vcHRpbWl6YXRpb25zLmdwdSA6IG51bGw7XG4gICAgICAgIGlmIChncHUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgdmFyIHlQb3MgPSB1bmRlZmluZWQsXG4gICAgICAgICAgICAgIHhQb3MgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgaWYgKF9zYW1lLnRvcCkge1xuICAgICAgICAgICAgY3NzLnRvcCA9IDA7XG4gICAgICAgICAgICB5UG9zID0gX3Bvcy50b3A7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNzcy5ib3R0b20gPSAwO1xuICAgICAgICAgICAgeVBvcyA9IC1fcG9zLmJvdHRvbTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoX3NhbWUubGVmdCkge1xuICAgICAgICAgICAgY3NzLmxlZnQgPSAwO1xuICAgICAgICAgICAgeFBvcyA9IF9wb3MubGVmdDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3NzLnJpZ2h0ID0gMDtcbiAgICAgICAgICAgIHhQb3MgPSAtX3Bvcy5yaWdodDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEpIHtcbiAgICAgICAgICAgIC8vIEh1YlNwb3QvdGV0aGVyIzIwN1xuICAgICAgICAgICAgdmFyIHJldGluYSA9IHdpbmRvdy5tYXRjaE1lZGlhKCdvbmx5IHNjcmVlbiBhbmQgKG1pbi1yZXNvbHV0aW9uOiAxLjNkcHB4KScpLm1hdGNoZXMgfHwgd2luZG93Lm1hdGNoTWVkaWEoJ29ubHkgc2NyZWVuIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAxLjMpJykubWF0Y2hlcztcbiAgICAgICAgICAgIGlmICghcmV0aW5hKSB7XG4gICAgICAgICAgICAgIHhQb3MgPSBNYXRoLnJvdW5kKHhQb3MpO1xuICAgICAgICAgICAgICB5UG9zID0gTWF0aC5yb3VuZCh5UG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjc3NbdHJhbnNmb3JtS2V5XSA9ICd0cmFuc2xhdGVYKCcgKyB4UG9zICsgJ3B4KSB0cmFuc2xhdGVZKCcgKyB5UG9zICsgJ3B4KSc7XG5cbiAgICAgICAgICBpZiAodHJhbnNmb3JtS2V5ICE9PSAnbXNUcmFuc2Zvcm0nKSB7XG4gICAgICAgICAgICAvLyBUaGUgWiB0cmFuc2Zvcm0gd2lsbCBrZWVwIHRoaXMgaW4gdGhlIEdQVSAoZmFzdGVyLCBhbmQgcHJldmVudHMgYXJ0aWZhY3RzKSxcbiAgICAgICAgICAgIC8vIGJ1dCBJRTkgZG9lc24ndCBzdXBwb3J0IDNkIHRyYW5zZm9ybXMgYW5kIHdpbGwgY2hva2UuXG4gICAgICAgICAgICBjc3NbdHJhbnNmb3JtS2V5XSArPSBcIiB0cmFuc2xhdGVaKDApXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfc2FtZS50b3ApIHtcbiAgICAgICAgICAgIGNzcy50b3AgPSBfcG9zLnRvcCArICdweCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNzcy5ib3R0b20gPSBfcG9zLmJvdHRvbSArICdweCc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKF9zYW1lLmxlZnQpIHtcbiAgICAgICAgICAgIGNzcy5sZWZ0ID0gX3Bvcy5sZWZ0ICsgJ3B4JztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3NzLnJpZ2h0ID0gX3Bvcy5yaWdodCArICdweCc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB2YXIgbW92ZWQgPSBmYWxzZTtcbiAgICAgIGlmICgoc2FtZS5wYWdlLnRvcCB8fCBzYW1lLnBhZ2UuYm90dG9tKSAmJiAoc2FtZS5wYWdlLmxlZnQgfHwgc2FtZS5wYWdlLnJpZ2h0KSkge1xuICAgICAgICBjc3MucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0cmFuc2NyaWJlKHNhbWUucGFnZSwgcG9zLnBhZ2UpO1xuICAgICAgfSBlbHNlIGlmICgoc2FtZS52aWV3cG9ydC50b3AgfHwgc2FtZS52aWV3cG9ydC5ib3R0b20pICYmIChzYW1lLnZpZXdwb3J0LmxlZnQgfHwgc2FtZS52aWV3cG9ydC5yaWdodCkpIHtcbiAgICAgICAgY3NzLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgdHJhbnNjcmliZShzYW1lLnZpZXdwb3J0LCBwb3Mudmlld3BvcnQpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2FtZS5vZmZzZXQgIT09ICd1bmRlZmluZWQnICYmIHNhbWUub2Zmc2V0LnRvcCAmJiBzYW1lLm9mZnNldC5sZWZ0KSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY3NzLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICB2YXIgb2Zmc2V0UGFyZW50ID0gX3RoaXM4LmNhY2hlKCd0YXJnZXQtb2Zmc2V0cGFyZW50JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldE9mZnNldFBhcmVudChfdGhpczgudGFyZ2V0KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmIChnZXRPZmZzZXRQYXJlbnQoX3RoaXM4LmVsZW1lbnQpICE9PSBvZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgICAgIGRlZmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgX3RoaXM4LmVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChfdGhpczguZWxlbWVudCk7XG4gICAgICAgICAgICAgIG9mZnNldFBhcmVudC5hcHBlbmRDaGlsZChfdGhpczguZWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0cmFuc2NyaWJlKHNhbWUub2Zmc2V0LCBwb3Mub2Zmc2V0KTtcbiAgICAgICAgICBtb3ZlZCA9IHRydWU7XG4gICAgICAgIH0pKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjc3MucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0cmFuc2NyaWJlKHsgdG9wOiB0cnVlLCBsZWZ0OiB0cnVlIH0sIHBvcy5wYWdlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFtb3ZlZCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJvZHlFbGVtZW50KSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zLmJvZHlFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIG9mZnNldFBhcmVudElzQm9keSA9IHRydWU7XG4gICAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5lbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICYmIGN1cnJlbnROb2RlLm5vZGVUeXBlID09PSAxICYmIGN1cnJlbnROb2RlLnRhZ05hbWUgIT09ICdCT0RZJykge1xuICAgICAgICAgICAgaWYgKGdldENvbXB1dGVkU3R5bGUoY3VycmVudE5vZGUpLnBvc2l0aW9uICE9PSAnc3RhdGljJykge1xuICAgICAgICAgICAgICBvZmZzZXRQYXJlbnRJc0JvZHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIW9mZnNldFBhcmVudElzQm9keSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQW55IGNzcyBjaGFuZ2Ugd2lsbCB0cmlnZ2VyIGEgcmVwYWludCwgc28gbGV0J3MgYXZvaWQgb25lIGlmIG5vdGhpbmcgY2hhbmdlZFxuICAgICAgdmFyIHdyaXRlQ1NTID0ge307XG4gICAgICB2YXIgd3JpdGUgPSBmYWxzZTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBjc3MpIHtcbiAgICAgICAgdmFyIHZhbCA9IGNzc1trZXldO1xuICAgICAgICB2YXIgZWxWYWwgPSB0aGlzLmVsZW1lbnQuc3R5bGVba2V5XTtcblxuICAgICAgICBpZiAoZWxWYWwgIT09IHZhbCkge1xuICAgICAgICAgIHdyaXRlID0gdHJ1ZTtcbiAgICAgICAgICB3cml0ZUNTU1trZXldID0gdmFsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh3cml0ZSkge1xuICAgICAgICBkZWZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZXh0ZW5kKF90aGlzOC5lbGVtZW50LnN0eWxlLCB3cml0ZUNTUyk7XG4gICAgICAgICAgX3RoaXM4LnRyaWdnZXIoJ3JlcG9zaXRpb25lZCcpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gVGV0aGVyQ2xhc3M7XG59KShFdmVudGVkKTtcblxuVGV0aGVyQ2xhc3MubW9kdWxlcyA9IFtdO1xuXG5UZXRoZXJCYXNlLnBvc2l0aW9uID0gcG9zaXRpb247XG5cbnZhciBUZXRoZXIgPSBleHRlbmQoVGV0aGVyQ2xhc3MsIFRldGhlckJhc2UpO1xuLyogZ2xvYmFscyBUZXRoZXJCYXNlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9zbGljZWRUb0FycmF5ID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbJ3JldHVybiddKSBfaVsncmV0dXJuJ10oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZScpOyB9IH07IH0pKCk7XG5cbnZhciBfVGV0aGVyQmFzZSRVdGlscyA9IFRldGhlckJhc2UuVXRpbHM7XG52YXIgZ2V0Qm91bmRzID0gX1RldGhlckJhc2UkVXRpbHMuZ2V0Qm91bmRzO1xudmFyIGV4dGVuZCA9IF9UZXRoZXJCYXNlJFV0aWxzLmV4dGVuZDtcbnZhciB1cGRhdGVDbGFzc2VzID0gX1RldGhlckJhc2UkVXRpbHMudXBkYXRlQ2xhc3NlcztcbnZhciBkZWZlciA9IF9UZXRoZXJCYXNlJFV0aWxzLmRlZmVyO1xuXG52YXIgQk9VTkRTX0ZPUk1BVCA9IFsnbGVmdCcsICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJ107XG5cbmZ1bmN0aW9uIGdldEJvdW5kaW5nUmVjdCh0ZXRoZXIsIHRvKSB7XG4gIGlmICh0byA9PT0gJ3Njcm9sbFBhcmVudCcpIHtcbiAgICB0byA9IHRldGhlci5zY3JvbGxQYXJlbnRzWzBdO1xuICB9IGVsc2UgaWYgKHRvID09PSAnd2luZG93Jykge1xuICAgIHRvID0gW3BhZ2VYT2Zmc2V0LCBwYWdlWU9mZnNldCwgaW5uZXJXaWR0aCArIHBhZ2VYT2Zmc2V0LCBpbm5lckhlaWdodCArIHBhZ2VZT2Zmc2V0XTtcbiAgfVxuXG4gIGlmICh0byA9PT0gZG9jdW1lbnQpIHtcbiAgICB0byA9IHRvLmRvY3VtZW50RWxlbWVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdG8ubm9kZVR5cGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBub2RlID0gdG87XG4gICAgICB2YXIgc2l6ZSA9IGdldEJvdW5kcyh0byk7XG4gICAgICB2YXIgcG9zID0gc2l6ZTtcbiAgICAgIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUodG8pO1xuXG4gICAgICB0byA9IFtwb3MubGVmdCwgcG9zLnRvcCwgc2l6ZS53aWR0aCArIHBvcy5sZWZ0LCBzaXplLmhlaWdodCArIHBvcy50b3BdO1xuXG4gICAgICAvLyBBY2NvdW50IGFueSBwYXJlbnQgRnJhbWVzIHNjcm9sbCBvZmZzZXRcbiAgICAgIGlmIChub2RlLm93bmVyRG9jdW1lbnQgIT09IGRvY3VtZW50KSB7XG4gICAgICAgIHZhciB3aW4gPSBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG4gICAgICAgIHRvWzBdICs9IHdpbi5wYWdlWE9mZnNldDtcbiAgICAgICAgdG9bMV0gKz0gd2luLnBhZ2VZT2Zmc2V0O1xuICAgICAgICB0b1syXSArPSB3aW4ucGFnZVhPZmZzZXQ7XG4gICAgICAgIHRvWzNdICs9IHdpbi5wYWdlWU9mZnNldDtcbiAgICAgIH1cblxuICAgICAgQk9VTkRTX0ZPUk1BVC5mb3JFYWNoKGZ1bmN0aW9uIChzaWRlLCBpKSB7XG4gICAgICAgIHNpZGUgPSBzaWRlWzBdLnRvVXBwZXJDYXNlKCkgKyBzaWRlLnN1YnN0cigxKTtcbiAgICAgICAgaWYgKHNpZGUgPT09ICdUb3AnIHx8IHNpZGUgPT09ICdMZWZ0Jykge1xuICAgICAgICAgIHRvW2ldICs9IHBhcnNlRmxvYXQoc3R5bGVbJ2JvcmRlcicgKyBzaWRlICsgJ1dpZHRoJ10pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvW2ldIC09IHBhcnNlRmxvYXQoc3R5bGVbJ2JvcmRlcicgKyBzaWRlICsgJ1dpZHRoJ10pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KSgpO1xuICB9XG5cbiAgcmV0dXJuIHRvO1xufVxuXG5UZXRoZXJCYXNlLm1vZHVsZXMucHVzaCh7XG4gIHBvc2l0aW9uOiBmdW5jdGlvbiBwb3NpdGlvbihfcmVmKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciB0b3AgPSBfcmVmLnRvcDtcbiAgICB2YXIgbGVmdCA9IF9yZWYubGVmdDtcbiAgICB2YXIgdGFyZ2V0QXR0YWNobWVudCA9IF9yZWYudGFyZ2V0QXR0YWNobWVudDtcblxuICAgIGlmICghdGhpcy5vcHRpb25zLmNvbnN0cmFpbnRzKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgX2NhY2hlID0gdGhpcy5jYWNoZSgnZWxlbWVudC1ib3VuZHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZ2V0Qm91bmRzKF90aGlzLmVsZW1lbnQpO1xuICAgIH0pO1xuXG4gICAgdmFyIGhlaWdodCA9IF9jYWNoZS5oZWlnaHQ7XG4gICAgdmFyIHdpZHRoID0gX2NhY2hlLndpZHRoO1xuXG4gICAgaWYgKHdpZHRoID09PSAwICYmIGhlaWdodCA9PT0gMCAmJiB0eXBlb2YgdGhpcy5sYXN0U2l6ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhciBfbGFzdFNpemUgPSB0aGlzLmxhc3RTaXplO1xuXG4gICAgICAvLyBIYW5kbGUgdGhlIGl0ZW0gZ2V0dGluZyBoaWRkZW4gYXMgYSByZXN1bHQgb2Ygb3VyIHBvc2l0aW9uaW5nIHdpdGhvdXQgZ2xpdGNoaW5nXG4gICAgICAvLyB0aGUgY2xhc3NlcyBpbiBhbmQgb3V0XG4gICAgICB3aWR0aCA9IF9sYXN0U2l6ZS53aWR0aDtcbiAgICAgIGhlaWdodCA9IF9sYXN0U2l6ZS5oZWlnaHQ7XG4gICAgfVxuXG4gICAgdmFyIHRhcmdldFNpemUgPSB0aGlzLmNhY2hlKCd0YXJnZXQtYm91bmRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLmdldFRhcmdldEJvdW5kcygpO1xuICAgIH0pO1xuXG4gICAgdmFyIHRhcmdldEhlaWdodCA9IHRhcmdldFNpemUuaGVpZ2h0O1xuICAgIHZhciB0YXJnZXRXaWR0aCA9IHRhcmdldFNpemUud2lkdGg7XG5cbiAgICB2YXIgYWxsQ2xhc3NlcyA9IFt0aGlzLmdldENsYXNzKCdwaW5uZWQnKSwgdGhpcy5nZXRDbGFzcygnb3V0LW9mLWJvdW5kcycpXTtcblxuICAgIHRoaXMub3B0aW9ucy5jb25zdHJhaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICB2YXIgb3V0T2ZCb3VuZHNDbGFzcyA9IGNvbnN0cmFpbnQub3V0T2ZCb3VuZHNDbGFzcztcbiAgICAgIHZhciBwaW5uZWRDbGFzcyA9IGNvbnN0cmFpbnQucGlubmVkQ2xhc3M7XG5cbiAgICAgIGlmIChvdXRPZkJvdW5kc0NsYXNzKSB7XG4gICAgICAgIGFsbENsYXNzZXMucHVzaChvdXRPZkJvdW5kc0NsYXNzKTtcbiAgICAgIH1cbiAgICAgIGlmIChwaW5uZWRDbGFzcykge1xuICAgICAgICBhbGxDbGFzc2VzLnB1c2gocGlubmVkQ2xhc3MpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWxsQ2xhc3Nlcy5mb3JFYWNoKGZ1bmN0aW9uIChjbHMpIHtcbiAgICAgIFsnbGVmdCcsICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJ10uZm9yRWFjaChmdW5jdGlvbiAoc2lkZSkge1xuICAgICAgICBhbGxDbGFzc2VzLnB1c2goY2xzICsgJy0nICsgc2lkZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHZhciBhZGRDbGFzc2VzID0gW107XG5cbiAgICB2YXIgdEF0dGFjaG1lbnQgPSBleHRlbmQoe30sIHRhcmdldEF0dGFjaG1lbnQpO1xuICAgIHZhciBlQXR0YWNobWVudCA9IGV4dGVuZCh7fSwgdGhpcy5hdHRhY2htZW50KTtcblxuICAgIHRoaXMub3B0aW9ucy5jb25zdHJhaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICB2YXIgdG8gPSBjb25zdHJhaW50LnRvO1xuICAgICAgdmFyIGF0dGFjaG1lbnQgPSBjb25zdHJhaW50LmF0dGFjaG1lbnQ7XG4gICAgICB2YXIgcGluID0gY29uc3RyYWludC5waW47XG5cbiAgICAgIGlmICh0eXBlb2YgYXR0YWNobWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgYXR0YWNobWVudCA9ICcnO1xuICAgICAgfVxuXG4gICAgICB2YXIgY2hhbmdlQXR0YWNoWCA9IHVuZGVmaW5lZCxcbiAgICAgICAgICBjaGFuZ2VBdHRhY2hZID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKGF0dGFjaG1lbnQuaW5kZXhPZignICcpID49IDApIHtcbiAgICAgICAgdmFyIF9hdHRhY2htZW50JHNwbGl0ID0gYXR0YWNobWVudC5zcGxpdCgnICcpO1xuXG4gICAgICAgIHZhciBfYXR0YWNobWVudCRzcGxpdDIgPSBfc2xpY2VkVG9BcnJheShfYXR0YWNobWVudCRzcGxpdCwgMik7XG5cbiAgICAgICAgY2hhbmdlQXR0YWNoWSA9IF9hdHRhY2htZW50JHNwbGl0MlswXTtcbiAgICAgICAgY2hhbmdlQXR0YWNoWCA9IF9hdHRhY2htZW50JHNwbGl0MlsxXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoYW5nZUF0dGFjaFggPSBjaGFuZ2VBdHRhY2hZID0gYXR0YWNobWVudDtcbiAgICAgIH1cblxuICAgICAgdmFyIGJvdW5kcyA9IGdldEJvdW5kaW5nUmVjdChfdGhpcywgdG8pO1xuXG4gICAgICBpZiAoY2hhbmdlQXR0YWNoWSA9PT0gJ3RhcmdldCcgfHwgY2hhbmdlQXR0YWNoWSA9PT0gJ2JvdGgnKSB7XG4gICAgICAgIGlmICh0b3AgPCBib3VuZHNbMV0gJiYgdEF0dGFjaG1lbnQudG9wID09PSAndG9wJykge1xuICAgICAgICAgIHRvcCArPSB0YXJnZXRIZWlnaHQ7XG4gICAgICAgICAgdEF0dGFjaG1lbnQudG9wID0gJ2JvdHRvbSc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG9wICsgaGVpZ2h0ID4gYm91bmRzWzNdICYmIHRBdHRhY2htZW50LnRvcCA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICB0b3AgLT0gdGFyZ2V0SGVpZ2h0O1xuICAgICAgICAgIHRBdHRhY2htZW50LnRvcCA9ICd0b3AnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGFuZ2VBdHRhY2hZID09PSAndG9nZXRoZXInKSB7XG4gICAgICAgIGlmICh0QXR0YWNobWVudC50b3AgPT09ICd0b3AnKSB7XG4gICAgICAgICAgaWYgKGVBdHRhY2htZW50LnRvcCA9PT0gJ2JvdHRvbScgJiYgdG9wIDwgYm91bmRzWzFdKSB7XG4gICAgICAgICAgICB0b3AgKz0gdGFyZ2V0SGVpZ2h0O1xuICAgICAgICAgICAgdEF0dGFjaG1lbnQudG9wID0gJ2JvdHRvbSc7XG5cbiAgICAgICAgICAgIHRvcCArPSBoZWlnaHQ7XG4gICAgICAgICAgICBlQXR0YWNobWVudC50b3AgPSAndG9wJztcbiAgICAgICAgICB9IGVsc2UgaWYgKGVBdHRhY2htZW50LnRvcCA9PT0gJ3RvcCcgJiYgdG9wICsgaGVpZ2h0ID4gYm91bmRzWzNdICYmIHRvcCAtIChoZWlnaHQgLSB0YXJnZXRIZWlnaHQpID49IGJvdW5kc1sxXSkge1xuICAgICAgICAgICAgdG9wIC09IGhlaWdodCAtIHRhcmdldEhlaWdodDtcbiAgICAgICAgICAgIHRBdHRhY2htZW50LnRvcCA9ICdib3R0b20nO1xuXG4gICAgICAgICAgICBlQXR0YWNobWVudC50b3AgPSAnYm90dG9tJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodEF0dGFjaG1lbnQudG9wID09PSAnYm90dG9tJykge1xuICAgICAgICAgIGlmIChlQXR0YWNobWVudC50b3AgPT09ICd0b3AnICYmIHRvcCArIGhlaWdodCA+IGJvdW5kc1szXSkge1xuICAgICAgICAgICAgdG9wIC09IHRhcmdldEhlaWdodDtcbiAgICAgICAgICAgIHRBdHRhY2htZW50LnRvcCA9ICd0b3AnO1xuXG4gICAgICAgICAgICB0b3AgLT0gaGVpZ2h0O1xuICAgICAgICAgICAgZUF0dGFjaG1lbnQudG9wID0gJ2JvdHRvbSc7XG4gICAgICAgICAgfSBlbHNlIGlmIChlQXR0YWNobWVudC50b3AgPT09ICdib3R0b20nICYmIHRvcCA8IGJvdW5kc1sxXSAmJiB0b3AgKyAoaGVpZ2h0ICogMiAtIHRhcmdldEhlaWdodCkgPD0gYm91bmRzWzNdKSB7XG4gICAgICAgICAgICB0b3AgKz0gaGVpZ2h0IC0gdGFyZ2V0SGVpZ2h0O1xuICAgICAgICAgICAgdEF0dGFjaG1lbnQudG9wID0gJ3RvcCc7XG5cbiAgICAgICAgICAgIGVBdHRhY2htZW50LnRvcCA9ICd0b3AnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0QXR0YWNobWVudC50b3AgPT09ICdtaWRkbGUnKSB7XG4gICAgICAgICAgaWYgKHRvcCArIGhlaWdodCA+IGJvdW5kc1szXSAmJiBlQXR0YWNobWVudC50b3AgPT09ICd0b3AnKSB7XG4gICAgICAgICAgICB0b3AgLT0gaGVpZ2h0O1xuICAgICAgICAgICAgZUF0dGFjaG1lbnQudG9wID0gJ2JvdHRvbSc7XG4gICAgICAgICAgfSBlbHNlIGlmICh0b3AgPCBib3VuZHNbMV0gJiYgZUF0dGFjaG1lbnQudG9wID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgdG9wICs9IGhlaWdodDtcbiAgICAgICAgICAgIGVBdHRhY2htZW50LnRvcCA9ICd0b3AnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlQXR0YWNoWCA9PT0gJ3RhcmdldCcgfHwgY2hhbmdlQXR0YWNoWCA9PT0gJ2JvdGgnKSB7XG4gICAgICAgIGlmIChsZWZ0IDwgYm91bmRzWzBdICYmIHRBdHRhY2htZW50LmxlZnQgPT09ICdsZWZ0Jykge1xuICAgICAgICAgIGxlZnQgKz0gdGFyZ2V0V2lkdGg7XG4gICAgICAgICAgdEF0dGFjaG1lbnQubGVmdCA9ICdyaWdodCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGVmdCArIHdpZHRoID4gYm91bmRzWzJdICYmIHRBdHRhY2htZW50LmxlZnQgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICBsZWZ0IC09IHRhcmdldFdpZHRoO1xuICAgICAgICAgIHRBdHRhY2htZW50LmxlZnQgPSAnbGVmdCc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZUF0dGFjaFggPT09ICd0b2dldGhlcicpIHtcbiAgICAgICAgaWYgKGxlZnQgPCBib3VuZHNbMF0gJiYgdEF0dGFjaG1lbnQubGVmdCA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgaWYgKGVBdHRhY2htZW50LmxlZnQgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgIGxlZnQgKz0gdGFyZ2V0V2lkdGg7XG4gICAgICAgICAgICB0QXR0YWNobWVudC5sZWZ0ID0gJ3JpZ2h0JztcblxuICAgICAgICAgICAgbGVmdCArPSB3aWR0aDtcbiAgICAgICAgICAgIGVBdHRhY2htZW50LmxlZnQgPSAnbGVmdCc7XG4gICAgICAgICAgfSBlbHNlIGlmIChlQXR0YWNobWVudC5sZWZ0ID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIGxlZnQgKz0gdGFyZ2V0V2lkdGg7XG4gICAgICAgICAgICB0QXR0YWNobWVudC5sZWZ0ID0gJ3JpZ2h0JztcblxuICAgICAgICAgICAgbGVmdCAtPSB3aWR0aDtcbiAgICAgICAgICAgIGVBdHRhY2htZW50LmxlZnQgPSAncmlnaHQnO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChsZWZ0ICsgd2lkdGggPiBib3VuZHNbMl0gJiYgdEF0dGFjaG1lbnQubGVmdCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgIGlmIChlQXR0YWNobWVudC5sZWZ0ID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIGxlZnQgLT0gdGFyZ2V0V2lkdGg7XG4gICAgICAgICAgICB0QXR0YWNobWVudC5sZWZ0ID0gJ2xlZnQnO1xuXG4gICAgICAgICAgICBsZWZ0IC09IHdpZHRoO1xuICAgICAgICAgICAgZUF0dGFjaG1lbnQubGVmdCA9ICdyaWdodCc7XG4gICAgICAgICAgfSBlbHNlIGlmIChlQXR0YWNobWVudC5sZWZ0ID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICBsZWZ0IC09IHRhcmdldFdpZHRoO1xuICAgICAgICAgICAgdEF0dGFjaG1lbnQubGVmdCA9ICdsZWZ0JztcblxuICAgICAgICAgICAgbGVmdCArPSB3aWR0aDtcbiAgICAgICAgICAgIGVBdHRhY2htZW50LmxlZnQgPSAnbGVmdCc7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRBdHRhY2htZW50LmxlZnQgPT09ICdjZW50ZXInKSB7XG4gICAgICAgICAgaWYgKGxlZnQgKyB3aWR0aCA+IGJvdW5kc1syXSAmJiBlQXR0YWNobWVudC5sZWZ0ID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIGxlZnQgLT0gd2lkdGg7XG4gICAgICAgICAgICBlQXR0YWNobWVudC5sZWZ0ID0gJ3JpZ2h0JztcbiAgICAgICAgICB9IGVsc2UgaWYgKGxlZnQgPCBib3VuZHNbMF0gJiYgZUF0dGFjaG1lbnQubGVmdCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgbGVmdCArPSB3aWR0aDtcbiAgICAgICAgICAgIGVBdHRhY2htZW50LmxlZnQgPSAnbGVmdCc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGFuZ2VBdHRhY2hZID09PSAnZWxlbWVudCcgfHwgY2hhbmdlQXR0YWNoWSA9PT0gJ2JvdGgnKSB7XG4gICAgICAgIGlmICh0b3AgPCBib3VuZHNbMV0gJiYgZUF0dGFjaG1lbnQudG9wID09PSAnYm90dG9tJykge1xuICAgICAgICAgIHRvcCArPSBoZWlnaHQ7XG4gICAgICAgICAgZUF0dGFjaG1lbnQudG9wID0gJ3RvcCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG9wICsgaGVpZ2h0ID4gYm91bmRzWzNdICYmIGVBdHRhY2htZW50LnRvcCA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICB0b3AgLT0gaGVpZ2h0O1xuICAgICAgICAgIGVBdHRhY2htZW50LnRvcCA9ICdib3R0b20nO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGFuZ2VBdHRhY2hYID09PSAnZWxlbWVudCcgfHwgY2hhbmdlQXR0YWNoWCA9PT0gJ2JvdGgnKSB7XG4gICAgICAgIGlmIChsZWZ0IDwgYm91bmRzWzBdKSB7XG4gICAgICAgICAgaWYgKGVBdHRhY2htZW50LmxlZnQgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgIGxlZnQgKz0gd2lkdGg7XG4gICAgICAgICAgICBlQXR0YWNobWVudC5sZWZ0ID0gJ2xlZnQnO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZUF0dGFjaG1lbnQubGVmdCA9PT0gJ2NlbnRlcicpIHtcbiAgICAgICAgICAgIGxlZnQgKz0gd2lkdGggLyAyO1xuICAgICAgICAgICAgZUF0dGFjaG1lbnQubGVmdCA9ICdsZWZ0JztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGVmdCArIHdpZHRoID4gYm91bmRzWzJdKSB7XG4gICAgICAgICAgaWYgKGVBdHRhY2htZW50LmxlZnQgPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgbGVmdCAtPSB3aWR0aDtcbiAgICAgICAgICAgIGVBdHRhY2htZW50LmxlZnQgPSAncmlnaHQnO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZUF0dGFjaG1lbnQubGVmdCA9PT0gJ2NlbnRlcicpIHtcbiAgICAgICAgICAgIGxlZnQgLT0gd2lkdGggLyAyO1xuICAgICAgICAgICAgZUF0dGFjaG1lbnQubGVmdCA9ICdyaWdodCc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgcGluID09PSAnc3RyaW5nJykge1xuICAgICAgICBwaW4gPSBwaW4uc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICByZXR1cm4gcC50cmltKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChwaW4gPT09IHRydWUpIHtcbiAgICAgICAgcGluID0gWyd0b3AnLCAnbGVmdCcsICdyaWdodCcsICdib3R0b20nXTtcbiAgICAgIH1cblxuICAgICAgcGluID0gcGluIHx8IFtdO1xuXG4gICAgICB2YXIgcGlubmVkID0gW107XG4gICAgICB2YXIgb29iID0gW107XG5cbiAgICAgIGlmICh0b3AgPCBib3VuZHNbMV0pIHtcbiAgICAgICAgaWYgKHBpbi5pbmRleE9mKCd0b3AnKSA+PSAwKSB7XG4gICAgICAgICAgdG9wID0gYm91bmRzWzFdO1xuICAgICAgICAgIHBpbm5lZC5wdXNoKCd0b3AnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvb2IucHVzaCgndG9wJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRvcCArIGhlaWdodCA+IGJvdW5kc1szXSkge1xuICAgICAgICBpZiAocGluLmluZGV4T2YoJ2JvdHRvbScpID49IDApIHtcbiAgICAgICAgICB0b3AgPSBib3VuZHNbM10gLSBoZWlnaHQ7XG4gICAgICAgICAgcGlubmVkLnB1c2goJ2JvdHRvbScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9vYi5wdXNoKCdib3R0b20nKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobGVmdCA8IGJvdW5kc1swXSkge1xuICAgICAgICBpZiAocGluLmluZGV4T2YoJ2xlZnQnKSA+PSAwKSB7XG4gICAgICAgICAgbGVmdCA9IGJvdW5kc1swXTtcbiAgICAgICAgICBwaW5uZWQucHVzaCgnbGVmdCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9vYi5wdXNoKCdsZWZ0Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGxlZnQgKyB3aWR0aCA+IGJvdW5kc1syXSkge1xuICAgICAgICBpZiAocGluLmluZGV4T2YoJ3JpZ2h0JykgPj0gMCkge1xuICAgICAgICAgIGxlZnQgPSBib3VuZHNbMl0gLSB3aWR0aDtcbiAgICAgICAgICBwaW5uZWQucHVzaCgncmlnaHQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvb2IucHVzaCgncmlnaHQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocGlubmVkLmxlbmd0aCkge1xuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBwaW5uZWRDbGFzcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBpZiAodHlwZW9mIF90aGlzLm9wdGlvbnMucGlubmVkQ2xhc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBwaW5uZWRDbGFzcyA9IF90aGlzLm9wdGlvbnMucGlubmVkQ2xhc3M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBpbm5lZENsYXNzID0gX3RoaXMuZ2V0Q2xhc3MoJ3Bpbm5lZCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGFkZENsYXNzZXMucHVzaChwaW5uZWRDbGFzcyk7XG4gICAgICAgICAgcGlubmVkLmZvckVhY2goZnVuY3Rpb24gKHNpZGUpIHtcbiAgICAgICAgICAgIGFkZENsYXNzZXMucHVzaChwaW5uZWRDbGFzcyArICctJyArIHNpZGUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAob29iLmxlbmd0aCkge1xuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBvb2JDbGFzcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBpZiAodHlwZW9mIF90aGlzLm9wdGlvbnMub3V0T2ZCb3VuZHNDbGFzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIG9vYkNsYXNzID0gX3RoaXMub3B0aW9ucy5vdXRPZkJvdW5kc0NsYXNzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvb2JDbGFzcyA9IF90aGlzLmdldENsYXNzKCdvdXQtb2YtYm91bmRzJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYWRkQ2xhc3Nlcy5wdXNoKG9vYkNsYXNzKTtcbiAgICAgICAgICBvb2IuZm9yRWFjaChmdW5jdGlvbiAoc2lkZSkge1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcy5wdXNoKG9vYkNsYXNzICsgJy0nICsgc2lkZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwaW5uZWQuaW5kZXhPZignbGVmdCcpID49IDAgfHwgcGlubmVkLmluZGV4T2YoJ3JpZ2h0JykgPj0gMCkge1xuICAgICAgICBlQXR0YWNobWVudC5sZWZ0ID0gdEF0dGFjaG1lbnQubGVmdCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHBpbm5lZC5pbmRleE9mKCd0b3AnKSA+PSAwIHx8IHBpbm5lZC5pbmRleE9mKCdib3R0b20nKSA+PSAwKSB7XG4gICAgICAgIGVBdHRhY2htZW50LnRvcCA9IHRBdHRhY2htZW50LnRvcCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAodEF0dGFjaG1lbnQudG9wICE9PSB0YXJnZXRBdHRhY2htZW50LnRvcCB8fCB0QXR0YWNobWVudC5sZWZ0ICE9PSB0YXJnZXRBdHRhY2htZW50LmxlZnQgfHwgZUF0dGFjaG1lbnQudG9wICE9PSBfdGhpcy5hdHRhY2htZW50LnRvcCB8fCBlQXR0YWNobWVudC5sZWZ0ICE9PSBfdGhpcy5hdHRhY2htZW50LmxlZnQpIHtcbiAgICAgICAgX3RoaXMudXBkYXRlQXR0YWNoQ2xhc3NlcyhlQXR0YWNobWVudCwgdEF0dGFjaG1lbnQpO1xuICAgICAgICBfdGhpcy50cmlnZ2VyKCd1cGRhdGUnLCB7XG4gICAgICAgICAgYXR0YWNobWVudDogZUF0dGFjaG1lbnQsXG4gICAgICAgICAgdGFyZ2V0QXR0YWNobWVudDogdEF0dGFjaG1lbnRcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBkZWZlcihmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIShfdGhpcy5vcHRpb25zLmFkZFRhcmdldENsYXNzZXMgPT09IGZhbHNlKSkge1xuICAgICAgICB1cGRhdGVDbGFzc2VzKF90aGlzLnRhcmdldCwgYWRkQ2xhc3NlcywgYWxsQ2xhc3Nlcyk7XG4gICAgICB9XG4gICAgICB1cGRhdGVDbGFzc2VzKF90aGlzLmVsZW1lbnQsIGFkZENsYXNzZXMsIGFsbENsYXNzZXMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHsgdG9wOiB0b3AsIGxlZnQ6IGxlZnQgfTtcbiAgfVxufSk7XG4vKiBnbG9iYWxzIFRldGhlckJhc2UgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX1RldGhlckJhc2UkVXRpbHMgPSBUZXRoZXJCYXNlLlV0aWxzO1xudmFyIGdldEJvdW5kcyA9IF9UZXRoZXJCYXNlJFV0aWxzLmdldEJvdW5kcztcbnZhciB1cGRhdGVDbGFzc2VzID0gX1RldGhlckJhc2UkVXRpbHMudXBkYXRlQ2xhc3NlcztcbnZhciBkZWZlciA9IF9UZXRoZXJCYXNlJFV0aWxzLmRlZmVyO1xuXG5UZXRoZXJCYXNlLm1vZHVsZXMucHVzaCh7XG4gIHBvc2l0aW9uOiBmdW5jdGlvbiBwb3NpdGlvbihfcmVmKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciB0b3AgPSBfcmVmLnRvcDtcbiAgICB2YXIgbGVmdCA9IF9yZWYubGVmdDtcblxuICAgIHZhciBfY2FjaGUgPSB0aGlzLmNhY2hlKCdlbGVtZW50LWJvdW5kcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBnZXRCb3VuZHMoX3RoaXMuZWxlbWVudCk7XG4gICAgfSk7XG5cbiAgICB2YXIgaGVpZ2h0ID0gX2NhY2hlLmhlaWdodDtcbiAgICB2YXIgd2lkdGggPSBfY2FjaGUud2lkdGg7XG5cbiAgICB2YXIgdGFyZ2V0UG9zID0gdGhpcy5nZXRUYXJnZXRCb3VuZHMoKTtcblxuICAgIHZhciBib3R0b20gPSB0b3AgKyBoZWlnaHQ7XG4gICAgdmFyIHJpZ2h0ID0gbGVmdCArIHdpZHRoO1xuXG4gICAgdmFyIGFidXR0ZWQgPSBbXTtcbiAgICBpZiAodG9wIDw9IHRhcmdldFBvcy5ib3R0b20gJiYgYm90dG9tID49IHRhcmdldFBvcy50b3ApIHtcbiAgICAgIFsnbGVmdCcsICdyaWdodCddLmZvckVhY2goZnVuY3Rpb24gKHNpZGUpIHtcbiAgICAgICAgdmFyIHRhcmdldFBvc1NpZGUgPSB0YXJnZXRQb3Nbc2lkZV07XG4gICAgICAgIGlmICh0YXJnZXRQb3NTaWRlID09PSBsZWZ0IHx8IHRhcmdldFBvc1NpZGUgPT09IHJpZ2h0KSB7XG4gICAgICAgICAgYWJ1dHRlZC5wdXNoKHNpZGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAobGVmdCA8PSB0YXJnZXRQb3MucmlnaHQgJiYgcmlnaHQgPj0gdGFyZ2V0UG9zLmxlZnQpIHtcbiAgICAgIFsndG9wJywgJ2JvdHRvbSddLmZvckVhY2goZnVuY3Rpb24gKHNpZGUpIHtcbiAgICAgICAgdmFyIHRhcmdldFBvc1NpZGUgPSB0YXJnZXRQb3Nbc2lkZV07XG4gICAgICAgIGlmICh0YXJnZXRQb3NTaWRlID09PSB0b3AgfHwgdGFyZ2V0UG9zU2lkZSA9PT0gYm90dG9tKSB7XG4gICAgICAgICAgYWJ1dHRlZC5wdXNoKHNpZGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgYWxsQ2xhc3NlcyA9IFtdO1xuICAgIHZhciBhZGRDbGFzc2VzID0gW107XG5cbiAgICB2YXIgc2lkZXMgPSBbJ2xlZnQnLCAndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbSddO1xuICAgIGFsbENsYXNzZXMucHVzaCh0aGlzLmdldENsYXNzKCdhYnV0dGVkJykpO1xuICAgIHNpZGVzLmZvckVhY2goZnVuY3Rpb24gKHNpZGUpIHtcbiAgICAgIGFsbENsYXNzZXMucHVzaChfdGhpcy5nZXRDbGFzcygnYWJ1dHRlZCcpICsgJy0nICsgc2lkZSk7XG4gICAgfSk7XG5cbiAgICBpZiAoYWJ1dHRlZC5sZW5ndGgpIHtcbiAgICAgIGFkZENsYXNzZXMucHVzaCh0aGlzLmdldENsYXNzKCdhYnV0dGVkJykpO1xuICAgIH1cblxuICAgIGFidXR0ZWQuZm9yRWFjaChmdW5jdGlvbiAoc2lkZSkge1xuICAgICAgYWRkQ2xhc3Nlcy5wdXNoKF90aGlzLmdldENsYXNzKCdhYnV0dGVkJykgKyAnLScgKyBzaWRlKTtcbiAgICB9KTtcblxuICAgIGRlZmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghKF90aGlzLm9wdGlvbnMuYWRkVGFyZ2V0Q2xhc3NlcyA9PT0gZmFsc2UpKSB7XG4gICAgICAgIHVwZGF0ZUNsYXNzZXMoX3RoaXMudGFyZ2V0LCBhZGRDbGFzc2VzLCBhbGxDbGFzc2VzKTtcbiAgICAgIH1cbiAgICAgIHVwZGF0ZUNsYXNzZXMoX3RoaXMuZWxlbWVudCwgYWRkQ2xhc3NlcywgYWxsQ2xhc3Nlcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufSk7XG4vKiBnbG9iYWxzIFRldGhlckJhc2UgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVsncmV0dXJuJ10pIF9pWydyZXR1cm4nXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlJyk7IH0gfTsgfSkoKTtcblxuVGV0aGVyQmFzZS5tb2R1bGVzLnB1c2goe1xuICBwb3NpdGlvbjogZnVuY3Rpb24gcG9zaXRpb24oX3JlZikge1xuICAgIHZhciB0b3AgPSBfcmVmLnRvcDtcbiAgICB2YXIgbGVmdCA9IF9yZWYubGVmdDtcblxuICAgIGlmICghdGhpcy5vcHRpb25zLnNoaWZ0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHNoaWZ0ID0gdGhpcy5vcHRpb25zLnNoaWZ0O1xuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLnNoaWZ0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBzaGlmdCA9IHRoaXMub3B0aW9ucy5zaGlmdC5jYWxsKHRoaXMsIHsgdG9wOiB0b3AsIGxlZnQ6IGxlZnQgfSk7XG4gICAgfVxuXG4gICAgdmFyIHNoaWZ0VG9wID0gdW5kZWZpbmVkLFxuICAgICAgICBzaGlmdExlZnQgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHR5cGVvZiBzaGlmdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHNoaWZ0ID0gc2hpZnQuc3BsaXQoJyAnKTtcbiAgICAgIHNoaWZ0WzFdID0gc2hpZnRbMV0gfHwgc2hpZnRbMF07XG5cbiAgICAgIHZhciBfc2hpZnQgPSBzaGlmdDtcblxuICAgICAgdmFyIF9zaGlmdDIgPSBfc2xpY2VkVG9BcnJheShfc2hpZnQsIDIpO1xuXG4gICAgICBzaGlmdFRvcCA9IF9zaGlmdDJbMF07XG4gICAgICBzaGlmdExlZnQgPSBfc2hpZnQyWzFdO1xuXG4gICAgICBzaGlmdFRvcCA9IHBhcnNlRmxvYXQoc2hpZnRUb3AsIDEwKTtcbiAgICAgIHNoaWZ0TGVmdCA9IHBhcnNlRmxvYXQoc2hpZnRMZWZ0LCAxMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNoaWZ0VG9wID0gc2hpZnQudG9wO1xuICAgICAgc2hpZnRMZWZ0ID0gc2hpZnQubGVmdDtcbiAgICB9XG5cbiAgICB0b3AgKz0gc2hpZnRUb3A7XG4gICAgbGVmdCArPSBzaGlmdExlZnQ7XG5cbiAgICByZXR1cm4geyB0b3A6IHRvcCwgbGVmdDogbGVmdCB9O1xuICB9XG59KTtcbnJldHVybiBUZXRoZXI7XG5cbn0pKTtcbiJdfQ==
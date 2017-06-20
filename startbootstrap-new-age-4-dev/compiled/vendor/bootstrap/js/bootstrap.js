'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Bootstrap v4.0.0-alpha.6 (https://getbootstrap.com)
 * Copyright 2011-2017 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
}

+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.');
  if (version[0] < 2 && version[1] < 9 || version[0] == 1 && version[1] == 9 && version[2] < 1 || version[0] >= 4) {
    throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
  }
}(jQuery);

+function () {

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Util = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */

    var transition = false;

    var MAX_UID = 1000000;

    var TransitionEndEvent = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };

    // shoutout AngusCroll (https://goo.gl/pxwQGp)
    function toType(obj) {
      return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }

    function isElement(obj) {
      return (obj[0] || obj).nodeType;
    }

    function getSpecialTransitionEndEvent() {
      return {
        bindType: transition.end,
        delegateType: transition.end,
        handle: function handle(event) {
          if ($(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }
          return undefined;
        }
      };
    }

    function transitionEndTest() {
      if (window.QUnit) {
        return false;
      }

      var el = document.createElement('bootstrap');

      for (var name in TransitionEndEvent) {
        if (el.style[name] !== undefined) {
          return {
            end: TransitionEndEvent[name]
          };
        }
      }

      return false;
    }

    function transitionEndEmulator(duration) {
      var _this = this;

      var called = false;

      $(this).one(Util.TRANSITION_END, function () {
        called = true;
      });

      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);

      return this;
    }

    function setTransitionEndSupport() {
      transition = transitionEndTest();

      $.fn.emulateTransitionEnd = transitionEndEmulator;

      if (Util.supportsTransitionEnd()) {
        $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
      }
    }

    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */

    var Util = {

      TRANSITION_END: 'bsTransitionEnd',

      getUID: function getUID(prefix) {
        do {
          // eslint-disable-next-line no-bitwise
          prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        } while (document.getElementById(prefix));
        return prefix;
      },
      getSelectorFromElement: function getSelectorFromElement(element) {
        var selector = element.getAttribute('data-target');

        if (!selector) {
          selector = element.getAttribute('href') || '';
          selector = /^#[a-z]/i.test(selector) ? selector : null;
        }

        return selector;
      },
      reflow: function reflow(element) {
        return element.offsetHeight;
      },
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $(element).trigger(transition.end);
      },
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(transition);
      },
      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
        for (var property in configTypes) {
          if (configTypes.hasOwnProperty(property)) {
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = value && isElement(value) ? 'element' : toType(value);

            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
            }
          }
        }
      }
    };

    setTransitionEndSupport();

    return Util;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Alert = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'alert';
    var VERSION = '4.0.0-alpha.6';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 150;

    var Selector = {
      DISMISS: '[data-dismiss="alert"]'
    };

    var Event = {
      CLOSE: 'close' + EVENT_KEY,
      CLOSED: 'closed' + EVENT_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      ALERT: 'alert',
      FADE: 'fade',
      SHOW: 'show'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Alert = function () {
      function Alert(element) {
        _classCallCheck(this, Alert);

        this._element = element;
      }

      // getters

      // public

      Alert.prototype.close = function close(element) {
        element = element || this._element;

        var rootElement = this._getRootElement(element);
        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      };

      Alert.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      };

      // private

      Alert.prototype._getRootElement = function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = $(selector)[0];
        }

        if (!parent) {
          parent = $(element).closest('.' + ClassName.ALERT)[0];
        }

        return parent;
      };

      Alert.prototype._triggerCloseEvent = function _triggerCloseEvent(element) {
        var closeEvent = $.Event(Event.CLOSE);

        $(element).trigger(closeEvent);
        return closeEvent;
      };

      Alert.prototype._removeElement = function _removeElement(element) {
        var _this2 = this;

        $(element).removeClass(ClassName.SHOW);

        if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);
          return;
        }

        $(element).one(Util.TRANSITION_END, function (event) {
          return _this2._destroyElement(element, event);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      };

      Alert.prototype._destroyElement = function _destroyElement(element) {
        $(element).detach().trigger(Event.CLOSED).remove();
      };

      // static

      Alert._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      };

      Alert._handleDismiss = function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      };

      _createClass(Alert, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }]);

      return Alert;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Alert._jQueryInterface;
    $.fn[NAME].Constructor = Alert;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert._jQueryInterface;
    };

    return Alert;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Button = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'button';
    var VERSION = '4.0.0-alpha.6';
    var DATA_KEY = 'bs.button';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];

    var ClassName = {
      ACTIVE: 'active',
      BUTTON: 'btn',
      FOCUS: 'focus'
    };

    var Selector = {
      DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
      DATA_TOGGLE: '[data-toggle="buttons"]',
      INPUT: 'input',
      ACTIVE: '.active',
      BUTTON: '.btn'
    };

    var Event = {
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
      FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Button = function () {
      function Button(element) {
        _classCallCheck(this, Button);

        this._element = element;
      }

      // getters

      // public

      Button.prototype.toggle = function toggle() {
        var triggerChangeEvent = true;
        var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = $(this._element).find(Selector.INPUT)[0];

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

                if (activeElement) {
                  $(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
              $(input).trigger('change');
            }

            input.focus();
          }
        }

        this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));

        if (triggerChangeEvent) {
          $(this._element).toggleClass(ClassName.ACTIVE);
        }
      };

      Button.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      };

      // static

      Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            data = new Button(this);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      };

      _createClass(Button, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }]);

      return Button;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      event.preventDefault();

      var button = event.target;

      if (!$(button).hasClass(ClassName.BUTTON)) {
        button = $(button).closest(Selector.BUTTON);
      }

      Button._jQueryInterface.call($(button), 'toggle');
    }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      var button = $(event.target).closest(Selector.BUTTON)[0];
      $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Button._jQueryInterface;
    $.fn[NAME].Constructor = Button;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Button._jQueryInterface;
    };

    return Button;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Carousel = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'carousel';
    var VERSION = '4.0.0-alpha.6';
    var DATA_KEY = 'bs.carousel';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 600;
    var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
    var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

    var Default = {
      interval: 5000,
      keyboard: true,
      slide: false,
      pause: 'hover',
      wrap: true
    };

    var DefaultType = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean'
    };

    var Direction = {
      NEXT: 'next',
      PREV: 'prev',
      LEFT: 'left',
      RIGHT: 'right'
    };

    var Event = {
      SLIDE: 'slide' + EVENT_KEY,
      SLID: 'slid' + EVENT_KEY,
      KEYDOWN: 'keydown' + EVENT_KEY,
      MOUSEENTER: 'mouseenter' + EVENT_KEY,
      MOUSELEAVE: 'mouseleave' + EVENT_KEY,
      LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      CAROUSEL: 'carousel',
      ACTIVE: 'active',
      SLIDE: 'slide',
      RIGHT: 'carousel-item-right',
      LEFT: 'carousel-item-left',
      NEXT: 'carousel-item-next',
      PREV: 'carousel-item-prev',
      ITEM: 'carousel-item'
    };

    var Selector = {
      ACTIVE: '.active',
      ACTIVE_ITEM: '.active.carousel-item',
      ITEM: '.carousel-item',
      NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
      INDICATORS: '.carousel-indicators',
      DATA_SLIDE: '[data-slide], [data-slide-to]',
      DATA_RIDE: '[data-ride="carousel"]'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Carousel = function () {
      function Carousel(element, config) {
        _classCallCheck(this, Carousel);

        this._items = null;
        this._interval = null;
        this._activeElement = null;

        this._isPaused = false;
        this._isSliding = false;

        this._config = this._getConfig(config);
        this._element = $(element)[0];
        this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

        this._addEventListeners();
      }

      // getters

      // public

      Carousel.prototype.next = function next() {
        if (this._isSliding) {
          throw new Error('Carousel is sliding');
        }
        this._slide(Direction.NEXT);
      };

      Carousel.prototype.nextWhenVisible = function nextWhenVisible() {
        // Don't call next when the page isn't visible
        if (!document.hidden) {
          this.next();
        }
      };

      Carousel.prototype.prev = function prev() {
        if (this._isSliding) {
          throw new Error('Carousel is sliding');
        }
        this._slide(Direction.PREVIOUS);
      };

      Carousel.prototype.pause = function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      };

      Carousel.prototype.cycle = function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
      };

      Carousel.prototype.to = function to(index) {
        var _this3 = this;

        this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          $(this._element).one(Event.SLID, function () {
            return _this3.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREVIOUS;

        this._slide(direction, this._items[index]);
      };

      Carousel.prototype.dispose = function dispose() {
        $(this._element).off(EVENT_KEY);
        $.removeData(this._element, DATA_KEY);

        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      };

      // private

      Carousel.prototype._getConfig = function _getConfig(config) {
        config = $.extend({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      Carousel.prototype._addEventListeners = function _addEventListeners() {
        var _this4 = this;

        if (this._config.keyboard) {
          $(this._element).on(Event.KEYDOWN, function (event) {
            return _this4._keydown(event);
          });
        }

        if (this._config.pause === 'hover' && !('ontouchstart' in document.documentElement)) {
          $(this._element).on(Event.MOUSEENTER, function (event) {
            return _this4.pause(event);
          }).on(Event.MOUSELEAVE, function (event) {
            return _this4.cycle(event);
          });
        }
      };

      Carousel.prototype._keydown = function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            event.preventDefault();
            this.prev();
            break;
          case ARROW_RIGHT_KEYCODE:
            event.preventDefault();
            this.next();
            break;
          default:
            return;
        }
      };

      Carousel.prototype._getItemIndex = function _getItemIndex(element) {
        this._items = $.makeArray($(element).parent().find(Selector.ITEM));
        return this._items.indexOf(element);
      };

      Carousel.prototype._getItemByDirection = function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREVIOUS;
        var activeIndex = this._getItemIndex(activeElement);
        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREVIOUS ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;

        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      };

      Carousel.prototype._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
        var slideEvent = $.Event(Event.SLIDE, {
          relatedTarget: relatedTarget,
          direction: eventDirectionName
        });

        $(this._element).trigger(slideEvent);

        return slideEvent;
      };

      Carousel.prototype._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            $(nextIndicator).addClass(ClassName.ACTIVE);
          }
        }
      };

      Carousel.prototype._slide = function _slide(direction, element) {
        var _this5 = this;

        var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var isCycling = Boolean(this._interval);

        var directionalClassName = void 0;
        var orderClassName = void 0;
        var eventDirectionName = void 0;

        if (direction === Direction.NEXT) {
          directionalClassName = ClassName.LEFT;
          orderClassName = ClassName.NEXT;
          eventDirectionName = Direction.LEFT;
        } else {
          directionalClassName = ClassName.RIGHT;
          orderClassName = ClassName.PREV;
          eventDirectionName = Direction.RIGHT;
        }

        if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = $.Event(Event.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName
        });

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

          $(nextElement).addClass(orderClassName);

          Util.reflow(nextElement);

          $(activeElement).addClass(directionalClassName);
          $(nextElement).addClass(directionalClassName);

          $(activeElement).one(Util.TRANSITION_END, function () {
            $(nextElement).removeClass(directionalClassName + ' ' + orderClassName).addClass(ClassName.ACTIVE);

            $(activeElement).removeClass(ClassName.ACTIVE + ' ' + orderClassName + ' ' + directionalClassName);

            _this5._isSliding = false;

            setTimeout(function () {
              return $(_this5._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          $(activeElement).removeClass(ClassName.ACTIVE);
          $(nextElement).addClass(ClassName.ACTIVE);

          this._isSliding = false;
          $(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      };

      // static

      Carousel._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = $.extend({}, Default, $(this).data());

          if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
            $.extend(_config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (data[action] === undefined) {
              throw new Error('No method named "' + action + '"');
            }
            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      };

      Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = $(selector)[0];

        if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
          return;
        }

        var config = $.extend({}, $(target).data(), $(this).data());
        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call($(target), config);

        if (slideIndex) {
          $(target).data(DATA_KEY).to(slideIndex);
        }

        event.preventDefault();
      };

      _createClass(Carousel, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }]);

      return Carousel;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

    $(window).on(Event.LOAD_DATA_API, function () {
      $(Selector.DATA_RIDE).each(function () {
        var $carousel = $(this);
        Carousel._jQueryInterface.call($carousel, $carousel.data());
      });
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Carousel._jQueryInterface;
    $.fn[NAME].Constructor = Carousel;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Carousel._jQueryInterface;
    };

    return Carousel;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Collapse = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'collapse';
    var VERSION = '4.0.0-alpha.6';
    var DATA_KEY = 'bs.collapse';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 600;

    var Default = {
      toggle: true,
      parent: ''
    };

    var DefaultType = {
      toggle: 'boolean',
      parent: 'string'
    };

    var Event = {
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      SHOW: 'show',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed'
    };

    var Dimension = {
      WIDTH: 'width',
      HEIGHT: 'height'
    };

    var Selector = {
      ACTIVES: '.card > .show, .card > .collapsing',
      DATA_TOGGLE: '[data-toggle="collapse"]'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Collapse = function () {
      function Collapse(element, config) {
        _classCallCheck(this, Collapse);

        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

        this._parent = this._config.parent ? this._getParent() : null;

        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        }

        if (this._config.toggle) {
          this.toggle();
        }
      }

      // getters

      // public

      Collapse.prototype.toggle = function toggle() {
        if ($(this._element).hasClass(ClassName.SHOW)) {
          this.hide();
        } else {
          this.show();
        }
      };

      Collapse.prototype.show = function show() {
        var _this6 = this;

        if (this._isTransitioning) {
          throw new Error('Collapse is transitioning');
        }

        if ($(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var actives = void 0;
        var activesData = void 0;

        if (this._parent) {
          actives = $.makeArray($(this._parent).find(Selector.ACTIVES));
          if (!actives.length) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $(actives).data(DATA_KEY);
          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = $.Event(Event.SHOW);
        $(this._element).trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($(actives), 'hide');
          if (!activesData) {
            $(actives).data(DATA_KEY, null);
          }
        }

        var dimension = this._getDimension();

        $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

        this._element.style[dimension] = 0;
        this._element.setAttribute('aria-expanded', true);

        if (this._triggerArray.length) {
          $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          $(_this6._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);

          _this6._element.style[dimension] = '';

          _this6.setTransitioning(false);

          $(_this6._element).trigger(Event.SHOWN);
        };

        if (!Util.supportsTransitionEnd()) {
          complete();
          return;
        }

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = 'scroll' + capitalizedDimension;

        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

        this._element.style[dimension] = this._element[scrollSize] + 'px';
      };

      Collapse.prototype.hide = function hide() {
        var _this7 = this;

        if (this._isTransitioning) {
          throw new Error('Collapse is transitioning');
        }

        if (!$(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var startEvent = $.Event(Event.HIDE);
        $(this._element).trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();
        var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';

        this._element.style[dimension] = this._element[offsetDimension] + 'px';

        Util.reflow(this._element);

        $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

        this._element.setAttribute('aria-expanded', false);

        if (this._triggerArray.length) {
          $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this7.setTransitioning(false);
          $(_this7._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
        };

        this._element.style[dimension] = '';

        if (!Util.supportsTransitionEnd()) {
          complete();
          return;
        }

        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      };

      Collapse.prototype.setTransitioning = function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      };

      Collapse.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);

        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      };

      // private

      Collapse.prototype._getConfig = function _getConfig(config) {
        config = $.extend({}, Default, config);
        config.toggle = Boolean(config.toggle); // coerce string values
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      Collapse.prototype._getDimension = function _getDimension() {
        var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      };

      Collapse.prototype._getParent = function _getParent() {
        var _this8 = this;

        var parent = $(this._config.parent)[0];
        var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

        $(parent).find(selector).each(function (i, element) {
          _this8._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });

        return parent;
      };

      Collapse.prototype._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
        if (element) {
          var isOpen = $(element).hasClass(ClassName.SHOW);
          element.setAttribute('aria-expanded', isOpen);

          if (triggerArray.length) {
            $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
          }
        }
      };

      // static

      Collapse._getTargetFromElement = function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? $(selector)[0] : null;
      };

      Collapse._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY);
          var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      };

      _createClass(Collapse, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }]);

      return Collapse;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();

      var target = Collapse._getTargetFromElement(this);
      var data = $(target).data(DATA_KEY);
      var config = data ? 'toggle' : $(this).data();

      Collapse._jQueryInterface.call($(target), config);
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Collapse._jQueryInterface;
    $.fn[NAME].Constructor = Collapse;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Collapse._jQueryInterface;
    };

    return Collapse;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Dropdown = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'dropdown';
    var VERSION = '4.0.0-alpha.6';
    var DATA_KEY = 'bs.dropdown';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
    var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
    var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var Event = {
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      CLICK: 'click' + EVENT_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
      FOCUSIN_DATA_API: 'focusin' + EVENT_KEY + DATA_API_KEY,
      KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      BACKDROP: 'dropdown-backdrop',
      DISABLED: 'disabled',
      SHOW: 'show'
    };

    var Selector = {
      BACKDROP: '.dropdown-backdrop',
      DATA_TOGGLE: '[data-toggle="dropdown"]',
      FORM_CHILD: '.dropdown form',
      ROLE_MENU: '[role="menu"]',
      ROLE_LISTBOX: '[role="listbox"]',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Dropdown = function () {
      function Dropdown(element) {
        _classCallCheck(this, Dropdown);

        this._element = element;

        this._addEventListeners();
      }

      // getters

      // public

      Dropdown.prototype.toggle = function toggle() {
        if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
          return false;
        }

        var parent = Dropdown._getParentFromElement(this);
        var isActive = $(parent).hasClass(ClassName.SHOW);

        Dropdown._clearMenus();

        if (isActive) {
          return false;
        }

        if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

          // if mobile we use a backdrop because click events don't delegate
          var dropdown = document.createElement('div');
          dropdown.className = ClassName.BACKDROP;
          $(dropdown).insertBefore(this);
          $(dropdown).on('click', Dropdown._clearMenus);
        }

        var relatedTarget = {
          relatedTarget: this
        };
        var showEvent = $.Event(Event.SHOW, relatedTarget);

        $(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return false;
        }

        this.focus();
        this.setAttribute('aria-expanded', true);

        $(parent).toggleClass(ClassName.SHOW);
        $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

        return false;
      };

      Dropdown.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        $(this._element).off(EVENT_KEY);
        this._element = null;
      };

      // private

      Dropdown.prototype._addEventListeners = function _addEventListeners() {
        $(this._element).on(Event.CLICK, this.toggle);
      };

      // static

      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            data = new Dropdown(this);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config].call(this);
          }
        });
      };

      Dropdown._clearMenus = function _clearMenus(event) {
        if (event && event.which === RIGHT_MOUSE_BUTTON_WHICH) {
          return;
        }

        var backdrop = $(Selector.BACKDROP)[0];
        if (backdrop) {
          backdrop.parentNode.removeChild(backdrop);
        }

        var toggles = $.makeArray($(Selector.DATA_TOGGLE));

        for (var i = 0; i < toggles.length; i++) {
          var parent = Dropdown._getParentFromElement(toggles[i]);
          var relatedTarget = {
            relatedTarget: toggles[i]
          };

          if (!$(parent).hasClass(ClassName.SHOW)) {
            continue;
          }

          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'focusin') && $.contains(parent, event.target)) {
            continue;
          }

          var hideEvent = $.Event(Event.HIDE, relatedTarget);
          $(parent).trigger(hideEvent);
          if (hideEvent.isDefaultPrevented()) {
            continue;
          }

          toggles[i].setAttribute('aria-expanded', 'false');

          $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
        }
      };

      Dropdown._getParentFromElement = function _getParentFromElement(element) {
        var parent = void 0;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = $(selector)[0];
        }

        return parent || element.parentNode;
      };

      Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
        if (!/(38|40|27|32)/.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);
        var isActive = $(parent).hasClass(ClassName.SHOW);

        if (!isActive && event.which !== ESCAPE_KEYCODE || isActive && event.which === ESCAPE_KEYCODE) {

          if (event.which === ESCAPE_KEYCODE) {
            var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
            $(toggle).trigger('focus');
          }

          $(this).trigger('click');
          return;
        }

        var items = $(parent).find(Selector.VISIBLE_ITEMS).get();

        if (!items.length) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // up
          index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      };

      _createClass(Dropdown, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }]);

      return Dropdown;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + ' ' + Event.FOCUSIN_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
      e.stopPropagation();
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Dropdown._jQueryInterface;
    $.fn[NAME].Constructor = Dropdown;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown._jQueryInterface;
    };

    return Dropdown;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Modal = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'modal';
    var VERSION = '4.0.0-alpha.6';
    var DATA_KEY = 'bs.modal';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 300;
    var BACKDROP_TRANSITION_DURATION = 150;
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var Default = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    };

    var DefaultType = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      focus: 'boolean',
      show: 'boolean'
    };

    var Event = {
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      FOCUSIN: 'focusin' + EVENT_KEY,
      RESIZE: 'resize' + EVENT_KEY,
      CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
      KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
      MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
      MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
      BACKDROP: 'modal-backdrop',
      OPEN: 'modal-open',
      FADE: 'fade',
      SHOW: 'show'
    };

    var Selector = {
      DIALOG: '.modal-dialog',
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Modal = function () {
      function Modal(element, config) {
        _classCallCheck(this, Modal);

        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = $(element).find(Selector.DIALOG)[0];
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._isTransitioning = false;
        this._originalBodyPadding = 0;
        this._scrollbarWidth = 0;
      }

      // getters

      // public

      Modal.prototype.toggle = function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      };

      Modal.prototype.show = function show(relatedTarget) {
        var _this9 = this;

        if (this._isTransitioning) {
          throw new Error('Modal is transitioning');
        }

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
        }
        var showEvent = $.Event(Event.SHOW, {
          relatedTarget: relatedTarget
        });

        $(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();
        this._setScrollbar();

        $(document.body).addClass(ClassName.OPEN);

        this._setEscapeEvent();
        this._setResizeEvent();

        $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
          return _this9.hide(event);
        });

        $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
          $(_this9._element).one(Event.MOUSEUP_DISMISS, function (event) {
            if ($(event.target).is(_this9._element)) {
              _this9._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop(function () {
          return _this9._showElement(relatedTarget);
        });
      };

      Modal.prototype.hide = function hide(event) {
        var _this10 = this;

        if (event) {
          event.preventDefault();
        }

        if (this._isTransitioning) {
          throw new Error('Modal is transitioning');
        }

        var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);
        if (transition) {
          this._isTransitioning = true;
        }

        var hideEvent = $.Event(Event.HIDE);
        $(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;

        this._setEscapeEvent();
        this._setResizeEvent();

        $(document).off(Event.FOCUSIN);

        $(this._element).removeClass(ClassName.SHOW);

        $(this._element).off(Event.CLICK_DISMISS);
        $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

        if (transition) {
          $(this._element).one(Util.TRANSITION_END, function (event) {
            return _this10._hideModal(event);
          }).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          this._hideModal();
        }
      };

      Modal.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);

        $(window, document, this._element, this._backdrop).off(EVENT_KEY);

        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._originalBodyPadding = null;
        this._scrollbarWidth = null;
      };

      // private

      Modal.prototype._getConfig = function _getConfig(config) {
        config = $.extend({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      Modal.prototype._showElement = function _showElement(relatedTarget) {
        var _this11 = this;

        var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // don't move modals dom position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';
        this._element.removeAttribute('aria-hidden');
        this._element.scrollTop = 0;

        if (transition) {
          Util.reflow(this._element);
        }

        $(this._element).addClass(ClassName.SHOW);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = $.Event(Event.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this11._config.focus) {
            _this11._element.focus();
          }
          _this11._isTransitioning = false;
          $(_this11._element).trigger(shownEvent);
        };

        if (transition) {
          $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          transitionComplete();
        }
      };

      Modal.prototype._enforceFocus = function _enforceFocus() {
        var _this12 = this;

        $(document).off(Event.FOCUSIN) // guard against infinite focus loop
        .on(Event.FOCUSIN, function (event) {
          if (document !== event.target && _this12._element !== event.target && !$(_this12._element).has(event.target).length) {
            _this12._element.focus();
          }
        });
      };

      Modal.prototype._setEscapeEvent = function _setEscapeEvent() {
        var _this13 = this;

        if (this._isShown && this._config.keyboard) {
          $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
            if (event.which === ESCAPE_KEYCODE) {
              _this13.hide();
            }
          });
        } else if (!this._isShown) {
          $(this._element).off(Event.KEYDOWN_DISMISS);
        }
      };

      Modal.prototype._setResizeEvent = function _setResizeEvent() {
        var _this14 = this;

        if (this._isShown) {
          $(window).on(Event.RESIZE, function (event) {
            return _this14._handleUpdate(event);
          });
        } else {
          $(window).off(Event.RESIZE);
        }
      };

      Modal.prototype._hideModal = function _hideModal() {
        var _this15 = this;

        this._element.style.display = 'none';
        this._element.setAttribute('aria-hidden', 'true');
        this._isTransitioning = false;
        this._showBackdrop(function () {
          $(document.body).removeClass(ClassName.OPEN);
          _this15._resetAdjustments();
          _this15._resetScrollbar();
          $(_this15._element).trigger(Event.HIDDEN);
        });
      };

      Modal.prototype._removeBackdrop = function _removeBackdrop() {
        if (this._backdrop) {
          $(this._backdrop).remove();
          this._backdrop = null;
        }
      };

      Modal.prototype._showBackdrop = function _showBackdrop(callback) {
        var _this16 = this;

        var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

        if (this._isShown && this._config.backdrop) {
          var doAnimate = Util.supportsTransitionEnd() && animate;

          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName.BACKDROP;

          if (animate) {
            $(this._backdrop).addClass(animate);
          }

          $(this._backdrop).appendTo(document.body);

          $(this._element).on(Event.CLICK_DISMISS, function (event) {
            if (_this16._ignoreBackdropClick) {
              _this16._ignoreBackdropClick = false;
              return;
            }
            if (event.target !== event.currentTarget) {
              return;
            }
            if (_this16._config.backdrop === 'static') {
              _this16._element.focus();
            } else {
              _this16.hide();
            }
          });

          if (doAnimate) {
            Util.reflow(this._backdrop);
          }

          $(this._backdrop).addClass(ClassName.SHOW);

          if (!callback) {
            return;
          }

          if (!doAnimate) {
            callback();
            return;
          }

          $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        } else if (!this._isShown && this._backdrop) {
          $(this._backdrop).removeClass(ClassName.SHOW);

          var callbackRemove = function callbackRemove() {
            _this16._removeBackdrop();
            if (callback) {
              callback();
            }
          };

          if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
            $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      };

      // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------

      Modal.prototype._handleUpdate = function _handleUpdate() {
        this._adjustDialog();
      };

      Modal.prototype._adjustDialog = function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + 'px';
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + 'px';
        }
      };

      Modal.prototype._resetAdjustments = function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      };

      Modal.prototype._checkScrollbar = function _checkScrollbar() {
        this._isBodyOverflowing = document.body.clientWidth < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      };

      Modal.prototype._setScrollbar = function _setScrollbar() {
        var bodyPadding = parseInt($(Selector.FIXED_CONTENT).css('padding-right') || 0, 10);

        this._originalBodyPadding = document.body.style.paddingRight || '';

        if (this._isBodyOverflowing) {
          document.body.style.paddingRight = bodyPadding + this._scrollbarWidth + 'px';
        }
      };

      Modal.prototype._resetScrollbar = function _resetScrollbar() {
        document.body.style.paddingRight = this._originalBodyPadding;
      };

      Modal.prototype._getScrollbarWidth = function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      };

      // static

      Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = $.extend({}, Modal.Default, $(this).data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

          if (!data) {
            data = new Modal(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      };

      _createClass(Modal, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }]);

      return Modal;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      var _this17 = this;

      var target = void 0;
      var selector = Util.getSelectorFromElement(this);

      if (selector) {
        target = $(selector)[0];
      }

      var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

      if (this.tagName === 'A' || this.tagName === 'AREA') {
        event.preventDefault();
      }

      var $target = $(target).one(Event.SHOW, function (showEvent) {
        if (showEvent.isDefaultPrevented()) {
          // only register focus restorer if modal will actually get shown
          return;
        }

        $target.one(Event.HIDDEN, function () {
          if ($(_this17).is(':visible')) {
            _this17.focus();
          }
        });
      });

      Modal._jQueryInterface.call($(target), config, this);
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Modal._jQueryInterface;
    $.fn[NAME].Constructor = Modal;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Modal._jQueryInterface;
    };

    return Modal;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var ScrollSpy = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'scrollspy';
    var VERSION = '4.0.0-alpha.6';
    var DATA_KEY = 'bs.scrollspy';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];

    var Default = {
      offset: 10,
      method: 'auto',
      target: ''
    };

    var DefaultType = {
      offset: 'number',
      method: 'string',
      target: '(string|element)'
    };

    var Event = {
      ACTIVATE: 'activate' + EVENT_KEY,
      SCROLL: 'scroll' + EVENT_KEY,
      LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      DROPDOWN_ITEM: 'dropdown-item',
      DROPDOWN_MENU: 'dropdown-menu',
      NAV_LINK: 'nav-link',
      NAV: 'nav',
      ACTIVE: 'active'
    };

    var Selector = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: '.active',
      LIST_ITEM: '.list-item',
      LI: 'li',
      LI_DROPDOWN: 'li.dropdown',
      NAV_LINKS: '.nav-link',
      DROPDOWN: '.dropdown',
      DROPDOWN_ITEMS: '.dropdown-item',
      DROPDOWN_TOGGLE: '.dropdown-toggle'
    };

    var OffsetMethod = {
      OFFSET: 'offset',
      POSITION: 'position'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var ScrollSpy = function () {
      function ScrollSpy(element, config) {
        var _this18 = this;

        _classCallCheck(this, ScrollSpy);

        this._element = element;
        this._scrollElement = element.tagName === 'BODY' ? window : element;
        this._config = this._getConfig(config);
        this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;

        $(this._scrollElement).on(Event.SCROLL, function (event) {
          return _this18._process(event);
        });

        this.refresh();
        this._process();
      }

      // getters

      // public

      ScrollSpy.prototype.refresh = function refresh() {
        var _this19 = this;

        var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

        this._offsets = [];
        this._targets = [];

        this._scrollHeight = this._getScrollHeight();

        var targets = $.makeArray($(this._selector));

        targets.map(function (element) {
          var target = void 0;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = $(targetSelector)[0];
          }

          if (target && (target.offsetWidth || target.offsetHeight)) {
            // todo (fat): remove sketch reliance on jQuery position/offset
            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
          }
          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this19._offsets.push(item[0]);
          _this19._targets.push(item[1]);
        });
      };

      ScrollSpy.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        $(this._scrollElement).off(EVENT_KEY);

        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      };

      // private

      ScrollSpy.prototype._getConfig = function _getConfig(config) {
        config = $.extend({}, Default, config);

        if (typeof config.target !== 'string') {
          var id = $(config.target).attr('id');
          if (!id) {
            id = Util.getUID(NAME);
            $(config.target).attr('id', id);
          }
          config.target = '#' + id;
        }

        Util.typeCheckConfig(NAME, config, DefaultType);

        return config;
      };

      ScrollSpy.prototype._getScrollTop = function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      };

      ScrollSpy.prototype._getScrollHeight = function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      };

      ScrollSpy.prototype._getOffsetHeight = function _getOffsetHeight() {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.offsetHeight;
      };

      ScrollSpy.prototype._process = function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;
        var scrollHeight = this._getScrollHeight();
        var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }
          return;
        }

        if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
          this._activeTarget = null;
          this._clear();
          return;
        }

        for (var i = this._offsets.length; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      };

      ScrollSpy.prototype._activate = function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(',');
        queries = queries.map(function (selector) {
          return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
        });

        var $link = $(queries.join(','));

        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
          $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          $link.addClass(ClassName.ACTIVE);
        } else {
          // todo (fat) this is kinda sus...
          // recursively add actives to tested nav-links
          $link.parents(Selector.LI).find('> ' + Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
        }

        $(this._scrollElement).trigger(Event.ACTIVATE, {
          relatedTarget: target
        });
      };

      ScrollSpy.prototype._clear = function _clear() {
        $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
      };

      // static

      ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

          if (!data) {
            data = new ScrollSpy(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      };

      _createClass(ScrollSpy, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }]);

      return ScrollSpy;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(window).on(Event.LOAD_DATA_API, function () {
      var scrollSpys = $.makeArray($(Selector.DATA_SPY));

      for (var i = scrollSpys.length; i--;) {
        var $spy = $(scrollSpys[i]);
        ScrollSpy._jQueryInterface.call($spy, $spy.data());
      }
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = ScrollSpy._jQueryInterface;
    $.fn[NAME].Constructor = ScrollSpy;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return ScrollSpy._jQueryInterface;
    };

    return ScrollSpy;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tab = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'tab';
    var VERSION = '4.0.0-alpha.6';
    var DATA_KEY = 'bs.tab';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 150;

    var Event = {
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active',
      DISABLED: 'disabled',
      FADE: 'fade',
      SHOW: 'show'
    };

    var Selector = {
      A: 'a',
      LI: 'li',
      DROPDOWN: '.dropdown',
      LIST: 'ul:not(.dropdown-menu), ol:not(.dropdown-menu), nav:not(.dropdown-menu)',
      FADE_CHILD: '> .nav-item .fade, > .fade',
      ACTIVE: '.active',
      ACTIVE_CHILD: '> .nav-item > .active, > .active',
      DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
      DROPDOWN_TOGGLE: '.dropdown-toggle',
      DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Tab = function () {
      function Tab(element) {
        _classCallCheck(this, Tab);

        this._element = element;
      }

      // getters

      // public

      Tab.prototype.show = function show() {
        var _this20 = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE) || $(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var target = void 0;
        var previous = void 0;
        var listElement = $(this._element).closest(Selector.LIST)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (listElement) {
          previous = $.makeArray($(listElement).find(Selector.ACTIVE));
          previous = previous[previous.length - 1];
        }

        var hideEvent = $.Event(Event.HIDE, {
          relatedTarget: this._element
        });

        var showEvent = $.Event(Event.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          $(previous).trigger(hideEvent);
        }

        $(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = $(selector)[0];
        }

        this._activate(this._element, listElement);

        var complete = function complete() {
          var hiddenEvent = $.Event(Event.HIDDEN, {
            relatedTarget: _this20._element
          });

          var shownEvent = $.Event(Event.SHOWN, {
            relatedTarget: previous
          });

          $(previous).trigger(hiddenEvent);
          $(_this20._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      };

      Tab.prototype.dispose = function dispose() {
        $.removeClass(this._element, DATA_KEY);
        this._element = null;
      };

      // private

      Tab.prototype._activate = function _activate(element, container, callback) {
        var _this21 = this;

        var active = $(container).find(Selector.ACTIVE_CHILD)[0];
        var isTransitioning = callback && Util.supportsTransitionEnd() && (active && $(active).hasClass(ClassName.FADE) || Boolean($(container).find(Selector.FADE_CHILD)[0]));

        var complete = function complete() {
          return _this21._transitionComplete(element, active, isTransitioning, callback);
        };

        if (active && isTransitioning) {
          $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          complete();
        }

        if (active) {
          $(active).removeClass(ClassName.SHOW);
        }
      };

      Tab.prototype._transitionComplete = function _transitionComplete(element, active, isTransitioning, callback) {
        if (active) {
          $(active).removeClass(ClassName.ACTIVE);

          var dropdownChild = $(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            $(dropdownChild).removeClass(ClassName.ACTIVE);
          }

          active.setAttribute('aria-expanded', false);
        }

        $(element).addClass(ClassName.ACTIVE);
        element.setAttribute('aria-expanded', true);

        if (isTransitioning) {
          Util.reflow(element);
          $(element).addClass(ClassName.SHOW);
        } else {
          $(element).removeClass(ClassName.FADE);
        }

        if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

          var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
          if (dropdownElement) {
            $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      };

      // static

      Tab._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY);

          if (!data) {
            data = new Tab(this);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      };

      _createClass(Tab, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }]);

      return Tab;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();
      Tab._jQueryInterface.call($(this), 'show');
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Tab._jQueryInterface;
    $.fn[NAME].Constructor = Tab;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tab._jQueryInterface;
    };

    return Tab;
  }(jQuery);

  /* global Tether */

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tooltip = function ($) {

    /**
     * Check for Tether dependency
     * Tether - http://tether.io/
     */
    if (typeof Tether === 'undefined') {
      throw new Error('Bootstrap tooltips require Tether (http://tether.io/)');
    }

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'tooltip';
    var VERSION = '4.0.0-alpha.6';
    var DATA_KEY = 'bs.tooltip';
    var EVENT_KEY = '.' + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 150;
    var CLASS_PREFIX = 'bs-tether';

    var Default = {
      animation: true,
      template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: false,
      selector: false,
      placement: 'top',
      offset: '0 0',
      constraints: [],
      container: false
    };

    var DefaultType = {
      animation: 'boolean',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
      delay: '(number|object)',
      html: 'boolean',
      selector: '(string|boolean)',
      placement: '(string|function)',
      offset: 'string',
      constraints: 'array',
      container: '(string|element|boolean)'
    };

    var AttachmentMap = {
      TOP: 'bottom center',
      RIGHT: 'middle left',
      BOTTOM: 'top center',
      LEFT: 'middle right'
    };

    var HoverState = {
      SHOW: 'show',
      OUT: 'out'
    };

    var Event = {
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      INSERTED: 'inserted' + EVENT_KEY,
      CLICK: 'click' + EVENT_KEY,
      FOCUSIN: 'focusin' + EVENT_KEY,
      FOCUSOUT: 'focusout' + EVENT_KEY,
      MOUSEENTER: 'mouseenter' + EVENT_KEY,
      MOUSELEAVE: 'mouseleave' + EVENT_KEY
    };

    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };

    var Selector = {
      TOOLTIP: '.tooltip',
      TOOLTIP_INNER: '.tooltip-inner'
    };

    var TetherClass = {
      element: false,
      enabled: false
    };

    var Trigger = {
      HOVER: 'hover',
      FOCUS: 'focus',
      CLICK: 'click',
      MANUAL: 'manual'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Tooltip = function () {
      function Tooltip(element, config) {
        _classCallCheck(this, Tooltip);

        // private
        this._isEnabled = true;
        this._timeout = 0;
        this._hoverState = '';
        this._activeTrigger = {};
        this._isTransitioning = false;
        this._tether = null;

        // protected
        this.element = element;
        this.config = this._getConfig(config);
        this.tip = null;

        this._setListeners();
      }

      // getters

      // public

      Tooltip.prototype.enable = function enable() {
        this._isEnabled = true;
      };

      Tooltip.prototype.disable = function disable() {
        this._isEnabled = false;
      };

      Tooltip.prototype.toggleEnabled = function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      };

      Tooltip.prototype.toggle = function toggle(event) {
        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = $(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {

          if ($(this.getTipElement()).hasClass(ClassName.SHOW)) {
            this._leave(null, this);
            return;
          }

          this._enter(null, this);
        }
      };

      Tooltip.prototype.dispose = function dispose() {
        clearTimeout(this._timeout);

        this.cleanupTether();

        $.removeData(this.element, this.constructor.DATA_KEY);

        $(this.element).off(this.constructor.EVENT_KEY);
        $(this.element).closest('.modal').off('hide.bs.modal');

        if (this.tip) {
          $(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;
        this._tether = null;

        this.element = null;
        this.config = null;
        this.tip = null;
      };

      Tooltip.prototype.show = function show() {
        var _this22 = this;

        if ($(this.element).css('display') === 'none') {
          throw new Error('Please use show on visible elements');
        }

        var showEvent = $.Event(this.constructor.Event.SHOW);
        if (this.isWithContent() && this._isEnabled) {
          if (this._isTransitioning) {
            throw new Error('Tooltip is transitioning');
          }
          $(this.element).trigger(showEvent);

          var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);

          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);

          this.setContent();

          if (this.config.animation) {
            $(tip).addClass(ClassName.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          var container = this.config.container === false ? document.body : $(this.config.container);

          $(tip).data(this.constructor.DATA_KEY, this).appendTo(container);

          $(this.element).trigger(this.constructor.Event.INSERTED);

          this._tether = new Tether({
            attachment: attachment,
            element: tip,
            target: this.element,
            classes: TetherClass,
            classPrefix: CLASS_PREFIX,
            offset: this.config.offset,
            constraints: this.config.constraints,
            addTargetClasses: false
          });

          Util.reflow(tip);
          this._tether.position();

          $(tip).addClass(ClassName.SHOW);

          var complete = function complete() {
            var prevHoverState = _this22._hoverState;
            _this22._hoverState = null;
            _this22._isTransitioning = false;

            $(_this22.element).trigger(_this22.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this22._leave(null, _this22);
            }
          };

          if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
            this._isTransitioning = true;
            $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
            return;
          }

          complete();
        }
      };

      Tooltip.prototype.hide = function hide(callback) {
        var _this23 = this;

        var tip = this.getTipElement();
        var hideEvent = $.Event(this.constructor.Event.HIDE);
        if (this._isTransitioning) {
          throw new Error('Tooltip is transitioning');
        }
        var complete = function complete() {
          if (_this23._hoverState !== HoverState.SHOW && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this23.element.removeAttribute('aria-describedby');
          $(_this23.element).trigger(_this23.constructor.Event.HIDDEN);
          _this23._isTransitioning = false;
          _this23.cleanupTether();

          if (callback) {
            callback();
          }
        };

        $(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $(tip).removeClass(ClassName.SHOW);

        this._activeTrigger[Trigger.CLICK] = false;
        this._activeTrigger[Trigger.FOCUS] = false;
        this._activeTrigger[Trigger.HOVER] = false;

        if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
          $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          complete();
        }

        this._hoverState = '';
      };

      // protected

      Tooltip.prototype.isWithContent = function isWithContent() {
        return Boolean(this.getTitle());
      };

      Tooltip.prototype.getTipElement = function getTipElement() {
        return this.tip = this.tip || $(this.config.template)[0];
      };

      Tooltip.prototype.setContent = function setContent() {
        var $tip = $(this.getTipElement());

        this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());

        $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);

        this.cleanupTether();
      };

      Tooltip.prototype.setElementContent = function setElementContent($element, content) {
        var html = this.config.html;
        if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object' && (content.nodeType || content.jquery)) {
          // content is a DOM node or a jQuery
          if (html) {
            if (!$(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($(content).text());
          }
        } else {
          $element[html ? 'html' : 'text'](content);
        }
      };

      Tooltip.prototype.getTitle = function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      };

      Tooltip.prototype.cleanupTether = function cleanupTether() {
        if (this._tether) {
          this._tether.destroy();
        }
      };

      // private

      Tooltip.prototype._getAttachment = function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      };

      Tooltip.prototype._setListeners = function _setListeners() {
        var _this24 = this;

        var triggers = this.config.trigger.split(' ');

        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            $(_this24.element).on(_this24.constructor.Event.CLICK, _this24.config.selector, function (event) {
              return _this24.toggle(event);
            });
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this24.constructor.Event.MOUSEENTER : _this24.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this24.constructor.Event.MOUSELEAVE : _this24.constructor.Event.FOCUSOUT;

            $(_this24.element).on(eventIn, _this24.config.selector, function (event) {
              return _this24._enter(event);
            }).on(eventOut, _this24.config.selector, function (event) {
              return _this24._leave(event);
            });
          }

          $(_this24.element).closest('.modal').on('hide.bs.modal', function () {
            return _this24.hide();
          });
        });

        if (this.config.selector) {
          this.config = $.extend({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      };

      Tooltip.prototype._fixTitle = function _fixTitle() {
        var titleType = _typeof(this.element.getAttribute('data-original-title'));
        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      };

      Tooltip.prototype._enter = function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;

        context = context || $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if ($(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
          context._hoverState = HoverState.SHOW;
          return;
        }

        clearTimeout(context._timeout);

        context._hoverState = HoverState.SHOW;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.SHOW) {
            context.show();
          }
        }, context.config.delay.show);
      };

      Tooltip.prototype._leave = function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;

        context = context || $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);

        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      };

      Tooltip.prototype._isWithActiveTrigger = function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      };

      Tooltip.prototype._getConfig = function _getConfig(config) {
        config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

        if (config.delay && typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

        return config;
      };

      Tooltip.prototype._getDelegateConfig = function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      };

      // static

      Tooltip._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      };

      _createClass(Tooltip, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }, {
        key: 'NAME',
        get: function get() {
          return NAME;
        }
      }, {
        key: 'DATA_KEY',
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: 'Event',
        get: function get() {
          return Event;
        }
      }, {
        key: 'EVENT_KEY',
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: 'DefaultType',
        get: function get() {
          return DefaultType;
        }
      }]);

      return Tooltip;
    }();

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Tooltip._jQueryInterface;
    $.fn[NAME].Constructor = Tooltip;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tooltip._jQueryInterface;
    };

    return Tooltip;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Popover = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'popover';
    var VERSION = '4.0.0-alpha.6';
    var DATA_KEY = 'bs.popover';
    var EVENT_KEY = '.' + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];

    var Default = $.extend({}, Tooltip.Default, {
      placement: 'right',
      trigger: 'click',
      content: '',
      template: '<div class="popover" role="tooltip">' + '<h3 class="popover-title"></h3>' + '<div class="popover-content"></div></div>'
    });

    var DefaultType = $.extend({}, Tooltip.DefaultType, {
      content: '(string|element|function)'
    });

    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };

    var Selector = {
      TITLE: '.popover-title',
      CONTENT: '.popover-content'
    };

    var Event = {
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      INSERTED: 'inserted' + EVENT_KEY,
      CLICK: 'click' + EVENT_KEY,
      FOCUSIN: 'focusin' + EVENT_KEY,
      FOCUSOUT: 'focusout' + EVENT_KEY,
      MOUSEENTER: 'mouseenter' + EVENT_KEY,
      MOUSELEAVE: 'mouseleave' + EVENT_KEY
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Popover = function (_Tooltip) {
      _inherits(Popover, _Tooltip);

      function Popover() {
        _classCallCheck(this, Popover);

        return _possibleConstructorReturn(this, _Tooltip.apply(this, arguments));
      }

      // overrides

      Popover.prototype.isWithContent = function isWithContent() {
        return this.getTitle() || this._getContent();
      };

      Popover.prototype.getTipElement = function getTipElement() {
        return this.tip = this.tip || $(this.config.template)[0];
      };

      Popover.prototype.setContent = function setContent() {
        var $tip = $(this.getTipElement());

        // we use append for html objects to maintain js events
        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
        this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

        $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);

        this.cleanupTether();
      };

      // private

      Popover.prototype._getContent = function _getContent() {
        return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
      };

      // static

      Popover._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      };

      _createClass(Popover, null, [{
        key: 'VERSION',

        // getters

        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }, {
        key: 'NAME',
        get: function get() {
          return NAME;
        }
      }, {
        key: 'DATA_KEY',
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: 'Event',
        get: function get() {
          return Event;
        }
      }, {
        key: 'EVENT_KEY',
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: 'DefaultType',
        get: function get() {
          return DefaultType;
        }
      }]);

      return Popover;
    }(Tooltip);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Popover._jQueryInterface;
    $.fn[NAME].Constructor = Popover;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Popover._jQueryInterface;
    };

    return Popover;
  }(jQuery);
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3ZlbmRvci9ib290c3RyYXAvanMvYm9vdHN0cmFwLmpzIl0sIm5hbWVzIjpbImpRdWVyeSIsIkVycm9yIiwiJCIsInZlcnNpb24iLCJmbiIsImpxdWVyeSIsInNwbGl0IiwiX3R5cGVvZiIsIlN5bWJvbCIsIml0ZXJhdG9yIiwib2JqIiwiY29uc3RydWN0b3IiLCJwcm90b3R5cGUiLCJfY3JlYXRlQ2xhc3MiLCJkZWZpbmVQcm9wZXJ0aWVzIiwidGFyZ2V0IiwicHJvcHMiLCJpIiwibGVuZ3RoIiwiZGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwia2V5IiwiQ29uc3RydWN0b3IiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybiIsInNlbGYiLCJjYWxsIiwiUmVmZXJlbmNlRXJyb3IiLCJfaW5oZXJpdHMiLCJzdWJDbGFzcyIsInN1cGVyQ2xhc3MiLCJUeXBlRXJyb3IiLCJjcmVhdGUiLCJ2YWx1ZSIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiX2NsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJVdGlsIiwidHJhbnNpdGlvbiIsIk1BWF9VSUQiLCJUcmFuc2l0aW9uRW5kRXZlbnQiLCJXZWJraXRUcmFuc2l0aW9uIiwiTW96VHJhbnNpdGlvbiIsIk9UcmFuc2l0aW9uIiwidG9UeXBlIiwidG9TdHJpbmciLCJtYXRjaCIsInRvTG93ZXJDYXNlIiwiaXNFbGVtZW50Iiwibm9kZVR5cGUiLCJnZXRTcGVjaWFsVHJhbnNpdGlvbkVuZEV2ZW50IiwiYmluZFR5cGUiLCJlbmQiLCJkZWxlZ2F0ZVR5cGUiLCJoYW5kbGUiLCJldmVudCIsImlzIiwiaGFuZGxlT2JqIiwiaGFuZGxlciIsImFwcGx5IiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwidHJhbnNpdGlvbkVuZFRlc3QiLCJ3aW5kb3ciLCJRVW5pdCIsImVsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwibmFtZSIsInN0eWxlIiwidHJhbnNpdGlvbkVuZEVtdWxhdG9yIiwiZHVyYXRpb24iLCJfdGhpcyIsImNhbGxlZCIsIm9uZSIsIlRSQU5TSVRJT05fRU5EIiwic2V0VGltZW91dCIsInRyaWdnZXJUcmFuc2l0aW9uRW5kIiwic2V0VHJhbnNpdGlvbkVuZFN1cHBvcnQiLCJlbXVsYXRlVHJhbnNpdGlvbkVuZCIsInN1cHBvcnRzVHJhbnNpdGlvbkVuZCIsInNwZWNpYWwiLCJnZXRVSUQiLCJwcmVmaXgiLCJNYXRoIiwicmFuZG9tIiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRTZWxlY3RvckZyb21FbGVtZW50IiwiZWxlbWVudCIsInNlbGVjdG9yIiwiZ2V0QXR0cmlidXRlIiwidGVzdCIsInJlZmxvdyIsIm9mZnNldEhlaWdodCIsInRyaWdnZXIiLCJCb29sZWFuIiwidHlwZUNoZWNrQ29uZmlnIiwiY29tcG9uZW50TmFtZSIsImNvbmZpZyIsImNvbmZpZ1R5cGVzIiwicHJvcGVydHkiLCJoYXNPd25Qcm9wZXJ0eSIsImV4cGVjdGVkVHlwZXMiLCJ2YWx1ZVR5cGUiLCJSZWdFeHAiLCJ0b1VwcGVyQ2FzZSIsIkFsZXJ0IiwiTkFNRSIsIlZFUlNJT04iLCJEQVRBX0tFWSIsIkVWRU5UX0tFWSIsIkRBVEFfQVBJX0tFWSIsIkpRVUVSWV9OT19DT05GTElDVCIsIlRSQU5TSVRJT05fRFVSQVRJT04iLCJTZWxlY3RvciIsIkRJU01JU1MiLCJFdmVudCIsIkNMT1NFIiwiQ0xPU0VEIiwiQ0xJQ0tfREFUQV9BUEkiLCJDbGFzc05hbWUiLCJBTEVSVCIsIkZBREUiLCJTSE9XIiwiX2VsZW1lbnQiLCJjbG9zZSIsInJvb3RFbGVtZW50IiwiX2dldFJvb3RFbGVtZW50IiwiY3VzdG9tRXZlbnQiLCJfdHJpZ2dlckNsb3NlRXZlbnQiLCJpc0RlZmF1bHRQcmV2ZW50ZWQiLCJfcmVtb3ZlRWxlbWVudCIsImRpc3Bvc2UiLCJyZW1vdmVEYXRhIiwicGFyZW50IiwiY2xvc2VzdCIsImNsb3NlRXZlbnQiLCJfdGhpczIiLCJyZW1vdmVDbGFzcyIsImhhc0NsYXNzIiwiX2Rlc3Ryb3lFbGVtZW50IiwiZGV0YWNoIiwicmVtb3ZlIiwiX2pRdWVyeUludGVyZmFjZSIsImVhY2giLCIkZWxlbWVudCIsImRhdGEiLCJfaGFuZGxlRGlzbWlzcyIsImFsZXJ0SW5zdGFuY2UiLCJwcmV2ZW50RGVmYXVsdCIsImdldCIsIm9uIiwibm9Db25mbGljdCIsIkJ1dHRvbiIsIkFDVElWRSIsIkJVVFRPTiIsIkZPQ1VTIiwiREFUQV9UT0dHTEVfQ0FSUk9UIiwiREFUQV9UT0dHTEUiLCJJTlBVVCIsIkZPQ1VTX0JMVVJfREFUQV9BUEkiLCJ0b2dnbGUiLCJ0cmlnZ2VyQ2hhbmdlRXZlbnQiLCJpbnB1dCIsImZpbmQiLCJ0eXBlIiwiY2hlY2tlZCIsImFjdGl2ZUVsZW1lbnQiLCJmb2N1cyIsInNldEF0dHJpYnV0ZSIsInRvZ2dsZUNsYXNzIiwiYnV0dG9uIiwiQ2Fyb3VzZWwiLCJBUlJPV19MRUZUX0tFWUNPREUiLCJBUlJPV19SSUdIVF9LRVlDT0RFIiwiRGVmYXVsdCIsImludGVydmFsIiwia2V5Ym9hcmQiLCJzbGlkZSIsInBhdXNlIiwid3JhcCIsIkRlZmF1bHRUeXBlIiwiRGlyZWN0aW9uIiwiTkVYVCIsIlBSRVYiLCJMRUZUIiwiUklHSFQiLCJTTElERSIsIlNMSUQiLCJLRVlET1dOIiwiTU9VU0VFTlRFUiIsIk1PVVNFTEVBVkUiLCJMT0FEX0RBVEFfQVBJIiwiQ0FST1VTRUwiLCJJVEVNIiwiQUNUSVZFX0lURU0iLCJORVhUX1BSRVYiLCJJTkRJQ0FUT1JTIiwiREFUQV9TTElERSIsIkRBVEFfUklERSIsIl9pdGVtcyIsIl9pbnRlcnZhbCIsIl9hY3RpdmVFbGVtZW50IiwiX2lzUGF1c2VkIiwiX2lzU2xpZGluZyIsIl9jb25maWciLCJfZ2V0Q29uZmlnIiwiX2luZGljYXRvcnNFbGVtZW50IiwiX2FkZEV2ZW50TGlzdGVuZXJzIiwibmV4dCIsIl9zbGlkZSIsIm5leHRXaGVuVmlzaWJsZSIsImhpZGRlbiIsInByZXYiLCJQUkVWSU9VUyIsImN5Y2xlIiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwidmlzaWJpbGl0eVN0YXRlIiwiYmluZCIsInRvIiwiaW5kZXgiLCJfdGhpczMiLCJhY3RpdmVJbmRleCIsIl9nZXRJdGVtSW5kZXgiLCJkaXJlY3Rpb24iLCJvZmYiLCJleHRlbmQiLCJfdGhpczQiLCJfa2V5ZG93biIsImRvY3VtZW50RWxlbWVudCIsInRhZ05hbWUiLCJ3aGljaCIsIm1ha2VBcnJheSIsImluZGV4T2YiLCJfZ2V0SXRlbUJ5RGlyZWN0aW9uIiwiaXNOZXh0RGlyZWN0aW9uIiwiaXNQcmV2RGlyZWN0aW9uIiwibGFzdEl0ZW1JbmRleCIsImlzR29pbmdUb1dyYXAiLCJkZWx0YSIsIml0ZW1JbmRleCIsIl90cmlnZ2VyU2xpZGVFdmVudCIsInJlbGF0ZWRUYXJnZXQiLCJldmVudERpcmVjdGlvbk5hbWUiLCJzbGlkZUV2ZW50IiwiX3NldEFjdGl2ZUluZGljYXRvckVsZW1lbnQiLCJuZXh0SW5kaWNhdG9yIiwiY2hpbGRyZW4iLCJhZGRDbGFzcyIsIl90aGlzNSIsIm5leHRFbGVtZW50IiwiaXNDeWNsaW5nIiwiZGlyZWN0aW9uYWxDbGFzc05hbWUiLCJvcmRlckNsYXNzTmFtZSIsInNsaWRFdmVudCIsImFjdGlvbiIsIl9kYXRhQXBpQ2xpY2tIYW5kbGVyIiwic2xpZGVJbmRleCIsIiRjYXJvdXNlbCIsIkNvbGxhcHNlIiwiU0hPV04iLCJISURFIiwiSElEREVOIiwiQ09MTEFQU0UiLCJDT0xMQVBTSU5HIiwiQ09MTEFQU0VEIiwiRGltZW5zaW9uIiwiV0lEVEgiLCJIRUlHSFQiLCJBQ1RJVkVTIiwiX2lzVHJhbnNpdGlvbmluZyIsIl90cmlnZ2VyQXJyYXkiLCJpZCIsIl9wYXJlbnQiLCJfZ2V0UGFyZW50IiwiX2FkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyIsImhpZGUiLCJzaG93IiwiX3RoaXM2IiwiYWN0aXZlcyIsImFjdGl2ZXNEYXRhIiwic3RhcnRFdmVudCIsImRpbWVuc2lvbiIsIl9nZXREaW1lbnNpb24iLCJhdHRyIiwic2V0VHJhbnNpdGlvbmluZyIsImNvbXBsZXRlIiwiY2FwaXRhbGl6ZWREaW1lbnNpb24iLCJzbGljZSIsInNjcm9sbFNpemUiLCJfdGhpczciLCJvZmZzZXREaW1lbnNpb24iLCJpc1RyYW5zaXRpb25pbmciLCJoYXNXaWR0aCIsIl90aGlzOCIsIl9nZXRUYXJnZXRGcm9tRWxlbWVudCIsInRyaWdnZXJBcnJheSIsImlzT3BlbiIsIiR0aGlzIiwiRHJvcGRvd24iLCJFU0NBUEVfS0VZQ09ERSIsIkFSUk9XX1VQX0tFWUNPREUiLCJBUlJPV19ET1dOX0tFWUNPREUiLCJSSUdIVF9NT1VTRV9CVVRUT05fV0hJQ0giLCJDTElDSyIsIkZPQ1VTSU5fREFUQV9BUEkiLCJLRVlET1dOX0RBVEFfQVBJIiwiQkFDS0RST1AiLCJESVNBQkxFRCIsIkZPUk1fQ0hJTEQiLCJST0xFX01FTlUiLCJST0xFX0xJU1RCT1giLCJOQVZCQVJfTkFWIiwiVklTSUJMRV9JVEVNUyIsImRpc2FibGVkIiwiX2dldFBhcmVudEZyb21FbGVtZW50IiwiaXNBY3RpdmUiLCJfY2xlYXJNZW51cyIsImRyb3Bkb3duIiwiY2xhc3NOYW1lIiwiaW5zZXJ0QmVmb3JlIiwic2hvd0V2ZW50IiwiYmFja2Ryb3AiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJ0b2dnbGVzIiwiY29udGFpbnMiLCJoaWRlRXZlbnQiLCJfZGF0YUFwaUtleWRvd25IYW5kbGVyIiwic3RvcFByb3BhZ2F0aW9uIiwiaXRlbXMiLCJlIiwiTW9kYWwiLCJCQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OIiwiRk9DVVNJTiIsIlJFU0laRSIsIkNMSUNLX0RJU01JU1MiLCJLRVlET1dOX0RJU01JU1MiLCJNT1VTRVVQX0RJU01JU1MiLCJNT1VTRURPV05fRElTTUlTUyIsIlNDUk9MTEJBUl9NRUFTVVJFUiIsIk9QRU4iLCJESUFMT0ciLCJEQVRBX0RJU01JU1MiLCJGSVhFRF9DT05URU5UIiwiX2RpYWxvZyIsIl9iYWNrZHJvcCIsIl9pc1Nob3duIiwiX2lzQm9keU92ZXJmbG93aW5nIiwiX2lnbm9yZUJhY2tkcm9wQ2xpY2siLCJfb3JpZ2luYWxCb2R5UGFkZGluZyIsIl9zY3JvbGxiYXJXaWR0aCIsIl90aGlzOSIsIl9jaGVja1Njcm9sbGJhciIsIl9zZXRTY3JvbGxiYXIiLCJib2R5IiwiX3NldEVzY2FwZUV2ZW50IiwiX3NldFJlc2l6ZUV2ZW50IiwiX3Nob3dCYWNrZHJvcCIsIl9zaG93RWxlbWVudCIsIl90aGlzMTAiLCJfaGlkZU1vZGFsIiwiX3RoaXMxMSIsIk5vZGUiLCJFTEVNRU5UX05PREUiLCJhcHBlbmRDaGlsZCIsImRpc3BsYXkiLCJyZW1vdmVBdHRyaWJ1dGUiLCJzY3JvbGxUb3AiLCJfZW5mb3JjZUZvY3VzIiwic2hvd25FdmVudCIsInRyYW5zaXRpb25Db21wbGV0ZSIsIl90aGlzMTIiLCJoYXMiLCJfdGhpczEzIiwiX3RoaXMxNCIsIl9oYW5kbGVVcGRhdGUiLCJfdGhpczE1IiwiX3Jlc2V0QWRqdXN0bWVudHMiLCJfcmVzZXRTY3JvbGxiYXIiLCJfcmVtb3ZlQmFja2Ryb3AiLCJjYWxsYmFjayIsIl90aGlzMTYiLCJhbmltYXRlIiwiZG9BbmltYXRlIiwiYXBwZW5kVG8iLCJjdXJyZW50VGFyZ2V0IiwiY2FsbGJhY2tSZW1vdmUiLCJfYWRqdXN0RGlhbG9nIiwiaXNNb2RhbE92ZXJmbG93aW5nIiwic2Nyb2xsSGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJjbGllbnRXaWR0aCIsImlubmVyV2lkdGgiLCJfZ2V0U2Nyb2xsYmFyV2lkdGgiLCJib2R5UGFkZGluZyIsInBhcnNlSW50IiwiY3NzIiwic2Nyb2xsRGl2Iiwic2Nyb2xsYmFyV2lkdGgiLCJvZmZzZXRXaWR0aCIsIl90aGlzMTciLCIkdGFyZ2V0IiwiU2Nyb2xsU3B5Iiwib2Zmc2V0IiwibWV0aG9kIiwiQUNUSVZBVEUiLCJTQ1JPTEwiLCJEUk9QRE9XTl9JVEVNIiwiRFJPUERPV05fTUVOVSIsIk5BVl9MSU5LIiwiTkFWIiwiREFUQV9TUFkiLCJMSVNUX0lURU0iLCJMSSIsIkxJX0RST1BET1dOIiwiTkFWX0xJTktTIiwiRFJPUERPV04iLCJEUk9QRE9XTl9JVEVNUyIsIkRST1BET1dOX1RPR0dMRSIsIk9mZnNldE1ldGhvZCIsIk9GRlNFVCIsIlBPU0lUSU9OIiwiX3RoaXMxOCIsIl9zY3JvbGxFbGVtZW50IiwiX3NlbGVjdG9yIiwiX29mZnNldHMiLCJfdGFyZ2V0cyIsIl9hY3RpdmVUYXJnZXQiLCJfc2Nyb2xsSGVpZ2h0IiwiX3Byb2Nlc3MiLCJyZWZyZXNoIiwiX3RoaXMxOSIsImF1dG9NZXRob2QiLCJvZmZzZXRNZXRob2QiLCJvZmZzZXRCYXNlIiwiX2dldFNjcm9sbFRvcCIsIl9nZXRTY3JvbGxIZWlnaHQiLCJ0YXJnZXRzIiwibWFwIiwidGFyZ2V0U2VsZWN0b3IiLCJ0b3AiLCJmaWx0ZXIiLCJpdGVtIiwic29ydCIsImEiLCJiIiwiZm9yRWFjaCIsInB1c2giLCJwYWdlWU9mZnNldCIsIm1heCIsIl9nZXRPZmZzZXRIZWlnaHQiLCJpbm5lckhlaWdodCIsIm1heFNjcm9sbCIsIl9hY3RpdmF0ZSIsIl9jbGVhciIsImlzQWN0aXZlVGFyZ2V0IiwicXVlcmllcyIsIiRsaW5rIiwiam9pbiIsInBhcmVudHMiLCJzY3JvbGxTcHlzIiwiJHNweSIsIlRhYiIsIkEiLCJMSVNUIiwiRkFERV9DSElMRCIsIkFDVElWRV9DSElMRCIsIkRST1BET1dOX0FDVElWRV9DSElMRCIsIl90aGlzMjAiLCJwcmV2aW91cyIsImxpc3RFbGVtZW50IiwiaGlkZGVuRXZlbnQiLCJjb250YWluZXIiLCJfdGhpczIxIiwiYWN0aXZlIiwiX3RyYW5zaXRpb25Db21wbGV0ZSIsImRyb3Bkb3duQ2hpbGQiLCJkcm9wZG93bkVsZW1lbnQiLCJUb29sdGlwIiwiVGV0aGVyIiwiQ0xBU1NfUFJFRklYIiwiYW5pbWF0aW9uIiwidGVtcGxhdGUiLCJ0aXRsZSIsImRlbGF5IiwiaHRtbCIsInBsYWNlbWVudCIsImNvbnN0cmFpbnRzIiwiQXR0YWNobWVudE1hcCIsIlRPUCIsIkJPVFRPTSIsIkhvdmVyU3RhdGUiLCJPVVQiLCJJTlNFUlRFRCIsIkZPQ1VTT1VUIiwiVE9PTFRJUCIsIlRPT0xUSVBfSU5ORVIiLCJUZXRoZXJDbGFzcyIsImVuYWJsZWQiLCJUcmlnZ2VyIiwiSE9WRVIiLCJNQU5VQUwiLCJfaXNFbmFibGVkIiwiX3RpbWVvdXQiLCJfaG92ZXJTdGF0ZSIsIl9hY3RpdmVUcmlnZ2VyIiwiX3RldGhlciIsInRpcCIsIl9zZXRMaXN0ZW5lcnMiLCJlbmFibGUiLCJkaXNhYmxlIiwidG9nZ2xlRW5hYmxlZCIsImRhdGFLZXkiLCJjb250ZXh0IiwiX2dldERlbGVnYXRlQ29uZmlnIiwiY2xpY2siLCJfaXNXaXRoQWN0aXZlVHJpZ2dlciIsIl9lbnRlciIsIl9sZWF2ZSIsImdldFRpcEVsZW1lbnQiLCJjbGVhclRpbWVvdXQiLCJjbGVhbnVwVGV0aGVyIiwiX3RoaXMyMiIsImlzV2l0aENvbnRlbnQiLCJpc0luVGhlRG9tIiwib3duZXJEb2N1bWVudCIsInRpcElkIiwic2V0Q29udGVudCIsImF0dGFjaG1lbnQiLCJfZ2V0QXR0YWNobWVudCIsImNsYXNzZXMiLCJjbGFzc1ByZWZpeCIsImFkZFRhcmdldENsYXNzZXMiLCJwb3NpdGlvbiIsInByZXZIb3ZlclN0YXRlIiwiX1RSQU5TSVRJT05fRFVSQVRJT04iLCJfdGhpczIzIiwiZ2V0VGl0bGUiLCIkdGlwIiwic2V0RWxlbWVudENvbnRlbnQiLCJjb250ZW50IiwiZW1wdHkiLCJhcHBlbmQiLCJ0ZXh0IiwiZGVzdHJveSIsIl90aGlzMjQiLCJ0cmlnZ2VycyIsImV2ZW50SW4iLCJldmVudE91dCIsIl9maXhUaXRsZSIsInRpdGxlVHlwZSIsIlBvcG92ZXIiLCJUSVRMRSIsIkNPTlRFTlQiLCJfVG9vbHRpcCIsIl9nZXRDb250ZW50Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7OztBQU1BLElBQUksT0FB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O0FBQ0QsS0F4R2EsQ0F3R1p6RSxPQXhHWSxDQUFkOztBQTBHQTs7Ozs7O0FBTUF0ZSxNQUFFRSxFQUFGLENBQUs2RyxJQUFMLElBQWFnYyxRQUFRNVosZ0JBQXJCO0FBQ0FuSixNQUFFRSxFQUFGLENBQUs2RyxJQUFMLEVBQVd2RixXQUFYLEdBQXlCdWhCLE9BQXpCO0FBQ0EvaUIsTUFBRUUsRUFBRixDQUFLNkcsSUFBTCxFQUFXNkMsVUFBWCxHQUF3QixZQUFZO0FBQ2xDNUosUUFBRUUsRUFBRixDQUFLNkcsSUFBTCxJQUFhSyxrQkFBYjtBQUNBLGFBQU8yYixRQUFRNVosZ0JBQWY7QUFDRCxLQUhEOztBQUtBLFdBQU80WixPQUFQO0FBQ0QsR0E5S2EsQ0E4S1pqakIsTUE5S1ksQ0FBZDtBQWdMQyxDQTU3R0EsRUFBRCIsImZpbGUiOiJib290c3RyYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEJvb3RzdHJhcCB2NC4wLjAtYWxwaGEuNiAoaHR0cHM6Ly9nZXRib290c3RyYXAuY29tKVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNyBUaGUgQm9vdHN0cmFwIEF1dGhvcnMgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ncmFwaHMvY29udHJpYnV0b3JzKVxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqL1xuXG5pZiAodHlwZW9mIGpRdWVyeSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdCb290c3RyYXBcXCdzIEphdmFTY3JpcHQgcmVxdWlyZXMgalF1ZXJ5LiBqUXVlcnkgbXVzdCBiZSBpbmNsdWRlZCBiZWZvcmUgQm9vdHN0cmFwXFwncyBKYXZhU2NyaXB0LicpXG59XG5cbitmdW5jdGlvbiAoJCkge1xuICB2YXIgdmVyc2lvbiA9ICQuZm4uanF1ZXJ5LnNwbGl0KCcgJylbMF0uc3BsaXQoJy4nKVxuICBpZiAoKHZlcnNpb25bMF0gPCAyICYmIHZlcnNpb25bMV0gPCA5KSB8fCAodmVyc2lvblswXSA9PSAxICYmIHZlcnNpb25bMV0gPT0gOSAmJiB2ZXJzaW9uWzJdIDwgMSkgfHwgKHZlcnNpb25bMF0gPj0gNCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jvb3RzdHJhcFxcJ3MgSmF2YVNjcmlwdCByZXF1aXJlcyBhdCBsZWFzdCBqUXVlcnkgdjEuOS4xIGJ1dCBsZXNzIHRoYW4gdjQuMC4wJylcbiAgfVxufShqUXVlcnkpO1xuXG5cbitmdW5jdGlvbiAoKSB7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgKHY0LjAuMC1hbHBoYS42KTogdXRpbC5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxudmFyIFV0aWwgPSBmdW5jdGlvbiAoJCkge1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogUHJpdmF0ZSBUcmFuc2l0aW9uRW5kIEhlbHBlcnNcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIHZhciB0cmFuc2l0aW9uID0gZmFsc2U7XG5cbiAgdmFyIE1BWF9VSUQgPSAxMDAwMDAwO1xuXG4gIHZhciBUcmFuc2l0aW9uRW5kRXZlbnQgPSB7XG4gICAgV2Via2l0VHJhbnNpdGlvbjogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgIE1velRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJyxcbiAgICBPVHJhbnNpdGlvbjogJ29UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kJyxcbiAgICB0cmFuc2l0aW9uOiAndHJhbnNpdGlvbmVuZCdcbiAgfTtcblxuICAvLyBzaG91dG91dCBBbmd1c0Nyb2xsIChodHRwczovL2dvby5nbC9weHdRR3ApXG4gIGZ1bmN0aW9uIHRvVHlwZShvYmopIHtcbiAgICByZXR1cm4ge30udG9TdHJpbmcuY2FsbChvYmopLm1hdGNoKC9cXHMoW2EtekEtWl0rKS8pWzFdLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBpc0VsZW1lbnQob2JqKSB7XG4gICAgcmV0dXJuIChvYmpbMF0gfHwgb2JqKS5ub2RlVHlwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNwZWNpYWxUcmFuc2l0aW9uRW5kRXZlbnQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJpbmRUeXBlOiB0cmFuc2l0aW9uLmVuZCxcbiAgICAgIGRlbGVnYXRlVHlwZTogdHJhbnNpdGlvbi5lbmQsXG4gICAgICBoYW5kbGU6IGZ1bmN0aW9uIGhhbmRsZShldmVudCkge1xuICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmlzKHRoaXMpKSB7XG4gICAgICAgICAgcmV0dXJuIGV2ZW50LmhhbmRsZU9iai5oYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcHJlZmVyLXJlc3QtcGFyYW1zXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkVuZFRlc3QoKSB7XG4gICAgaWYgKHdpbmRvdy5RVW5pdCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Jvb3RzdHJhcCcpO1xuXG4gICAgZm9yICh2YXIgbmFtZSBpbiBUcmFuc2l0aW9uRW5kRXZlbnQpIHtcbiAgICAgIGlmIChlbC5zdHlsZVtuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZW5kOiBUcmFuc2l0aW9uRW5kRXZlbnRbbmFtZV1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kRW11bGF0b3IoZHVyYXRpb24pIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuXG4gICAgJCh0aGlzKS5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgZnVuY3Rpb24gKCkge1xuICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFjYWxsZWQpIHtcbiAgICAgICAgVXRpbC50cmlnZ2VyVHJhbnNpdGlvbkVuZChfdGhpcyk7XG4gICAgICB9XG4gICAgfSwgZHVyYXRpb24pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRUcmFuc2l0aW9uRW5kU3VwcG9ydCgpIHtcbiAgICB0cmFuc2l0aW9uID0gdHJhbnNpdGlvbkVuZFRlc3QoKTtcblxuICAgICQuZm4uZW11bGF0ZVRyYW5zaXRpb25FbmQgPSB0cmFuc2l0aW9uRW5kRW11bGF0b3I7XG5cbiAgICBpZiAoVXRpbC5zdXBwb3J0c1RyYW5zaXRpb25FbmQoKSkge1xuICAgICAgJC5ldmVudC5zcGVjaWFsW1V0aWwuVFJBTlNJVElPTl9FTkRdID0gZ2V0U3BlY2lhbFRyYW5zaXRpb25FbmRFdmVudCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBQdWJsaWMgVXRpbCBBcGlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIFV0aWwgPSB7XG5cbiAgICBUUkFOU0lUSU9OX0VORDogJ2JzVHJhbnNpdGlvbkVuZCcsXG5cbiAgICBnZXRVSUQ6IGZ1bmN0aW9uIGdldFVJRChwcmVmaXgpIHtcbiAgICAgIGRvIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcbiAgICAgICAgcHJlZml4ICs9IH5+KE1hdGgucmFuZG9tKCkgKiBNQVhfVUlEKTsgLy8gXCJ+flwiIGFjdHMgbGlrZSBhIGZhc3RlciBNYXRoLmZsb29yKCkgaGVyZVxuICAgICAgfSB3aGlsZSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJlZml4KSk7XG4gICAgICByZXR1cm4gcHJlZml4O1xuICAgIH0sXG4gICAgZ2V0U2VsZWN0b3JGcm9tRWxlbWVudDogZnVuY3Rpb24gZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtZW50KSB7XG4gICAgICB2YXIgc2VsZWN0b3IgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKTtcblxuICAgICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgICBzZWxlY3RvciA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgJyc7XG4gICAgICAgIHNlbGVjdG9yID0gL14jW2Etel0vaS50ZXN0KHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGVjdG9yO1xuICAgIH0sXG4gICAgcmVmbG93OiBmdW5jdGlvbiByZWZsb3coZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIH0sXG4gICAgdHJpZ2dlclRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIHRyaWdnZXJUcmFuc2l0aW9uRW5kKGVsZW1lbnQpIHtcbiAgICAgICQoZWxlbWVudCkudHJpZ2dlcih0cmFuc2l0aW9uLmVuZCk7XG4gICAgfSxcbiAgICBzdXBwb3J0c1RyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIHN1cHBvcnRzVHJhbnNpdGlvbkVuZCgpIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHRyYW5zaXRpb24pO1xuICAgIH0sXG4gICAgdHlwZUNoZWNrQ29uZmlnOiBmdW5jdGlvbiB0eXBlQ2hlY2tDb25maWcoY29tcG9uZW50TmFtZSwgY29uZmlnLCBjb25maWdUeXBlcykge1xuICAgICAgZm9yICh2YXIgcHJvcGVydHkgaW4gY29uZmlnVHlwZXMpIHtcbiAgICAgICAgaWYgKGNvbmZpZ1R5cGVzLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICAgIHZhciBleHBlY3RlZFR5cGVzID0gY29uZmlnVHlwZXNbcHJvcGVydHldO1xuICAgICAgICAgIHZhciB2YWx1ZSA9IGNvbmZpZ1twcm9wZXJ0eV07XG4gICAgICAgICAgdmFyIHZhbHVlVHlwZSA9IHZhbHVlICYmIGlzRWxlbWVudCh2YWx1ZSkgPyAnZWxlbWVudCcgOiB0b1R5cGUodmFsdWUpO1xuXG4gICAgICAgICAgaWYgKCFuZXcgUmVnRXhwKGV4cGVjdGVkVHlwZXMpLnRlc3QodmFsdWVUeXBlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGNvbXBvbmVudE5hbWUudG9VcHBlckNhc2UoKSArICc6ICcgKyAoJ09wdGlvbiBcIicgKyBwcm9wZXJ0eSArICdcIiBwcm92aWRlZCB0eXBlIFwiJyArIHZhbHVlVHlwZSArICdcIiAnKSArICgnYnV0IGV4cGVjdGVkIHR5cGUgXCInICsgZXhwZWN0ZWRUeXBlcyArICdcIi4nKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHNldFRyYW5zaXRpb25FbmRTdXBwb3J0KCk7XG5cbiAgcmV0dXJuIFV0aWw7XG59KGpRdWVyeSk7XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuMC4wLWFscGhhLjYpOiBhbGVydC5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxudmFyIEFsZXJ0ID0gZnVuY3Rpb24gKCQpIHtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENvbnN0YW50c1xuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIE5BTUUgPSAnYWxlcnQnO1xuICB2YXIgVkVSU0lPTiA9ICc0LjAuMC1hbHBoYS42JztcbiAgdmFyIERBVEFfS0VZID0gJ2JzLmFsZXJ0JztcbiAgdmFyIEVWRU5UX0tFWSA9ICcuJyArIERBVEFfS0VZO1xuICB2YXIgREFUQV9BUElfS0VZID0gJy5kYXRhLWFwaSc7XG4gIHZhciBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkLmZuW05BTUVdO1xuICB2YXIgVFJBTlNJVElPTl9EVVJBVElPTiA9IDE1MDtcblxuICB2YXIgU2VsZWN0b3IgPSB7XG4gICAgRElTTUlTUzogJ1tkYXRhLWRpc21pc3M9XCJhbGVydFwiXSdcbiAgfTtcblxuICB2YXIgRXZlbnQgPSB7XG4gICAgQ0xPU0U6ICdjbG9zZScgKyBFVkVOVF9LRVksXG4gICAgQ0xPU0VEOiAnY2xvc2VkJyArIEVWRU5UX0tFWSxcbiAgICBDTElDS19EQVRBX0FQSTogJ2NsaWNrJyArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWVxuICB9O1xuXG4gIHZhciBDbGFzc05hbWUgPSB7XG4gICAgQUxFUlQ6ICdhbGVydCcsXG4gICAgRkFERTogJ2ZhZGUnLFxuICAgIFNIT1c6ICdzaG93J1xuICB9O1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIEFsZXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFsZXJ0KGVsZW1lbnQpIHtcbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBbGVydCk7XG5cbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgIH1cblxuICAgIC8vIGdldHRlcnNcblxuICAgIC8vIHB1YmxpY1xuXG4gICAgQWxlcnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gY2xvc2UoZWxlbWVudCkge1xuICAgICAgZWxlbWVudCA9IGVsZW1lbnQgfHwgdGhpcy5fZWxlbWVudDtcblxuICAgICAgdmFyIHJvb3RFbGVtZW50ID0gdGhpcy5fZ2V0Um9vdEVsZW1lbnQoZWxlbWVudCk7XG4gICAgICB2YXIgY3VzdG9tRXZlbnQgPSB0aGlzLl90cmlnZ2VyQ2xvc2VFdmVudChyb290RWxlbWVudCk7XG5cbiAgICAgIGlmIChjdXN0b21FdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3JlbW92ZUVsZW1lbnQocm9vdEVsZW1lbnQpO1xuICAgIH07XG5cbiAgICBBbGVydC5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICAkLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpO1xuICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIHByaXZhdGVcblxuICAgIEFsZXJ0LnByb3RvdHlwZS5fZ2V0Um9vdEVsZW1lbnQgPSBmdW5jdGlvbiBfZ2V0Um9vdEVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgdmFyIHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQpO1xuICAgICAgdmFyIHBhcmVudCA9IGZhbHNlO1xuXG4gICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgcGFyZW50ID0gJChzZWxlY3RvcilbMF07XG4gICAgICB9XG5cbiAgICAgIGlmICghcGFyZW50KSB7XG4gICAgICAgIHBhcmVudCA9ICQoZWxlbWVudCkuY2xvc2VzdCgnLicgKyBDbGFzc05hbWUuQUxFUlQpWzBdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGFyZW50O1xuICAgIH07XG5cbiAgICBBbGVydC5wcm90b3R5cGUuX3RyaWdnZXJDbG9zZUV2ZW50ID0gZnVuY3Rpb24gX3RyaWdnZXJDbG9zZUV2ZW50KGVsZW1lbnQpIHtcbiAgICAgIHZhciBjbG9zZUV2ZW50ID0gJC5FdmVudChFdmVudC5DTE9TRSk7XG5cbiAgICAgICQoZWxlbWVudCkudHJpZ2dlcihjbG9zZUV2ZW50KTtcbiAgICAgIHJldHVybiBjbG9zZUV2ZW50O1xuICAgIH07XG5cbiAgICBBbGVydC5wcm90b3R5cGUuX3JlbW92ZUVsZW1lbnQgPSBmdW5jdGlvbiBfcmVtb3ZlRWxlbWVudChlbGVtZW50KSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgJChlbGVtZW50KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuU0hPVyk7XG5cbiAgICAgIGlmICghVXRpbC5zdXBwb3J0c1RyYW5zaXRpb25FbmQoKSB8fCAhJChlbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgICAgdGhpcy5fZGVzdHJveUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgJChlbGVtZW50KS5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBfdGhpczIuX2Rlc3Ryb3lFbGVtZW50KGVsZW1lbnQsIGV2ZW50KTtcbiAgICAgIH0pLmVtdWxhdGVUcmFuc2l0aW9uRW5kKFRSQU5TSVRJT05fRFVSQVRJT04pO1xuICAgIH07XG5cbiAgICBBbGVydC5wcm90b3R5cGUuX2Rlc3Ryb3lFbGVtZW50ID0gZnVuY3Rpb24gX2Rlc3Ryb3lFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICQoZWxlbWVudCkuZGV0YWNoKCkudHJpZ2dlcihFdmVudC5DTE9TRUQpLnJlbW92ZSgpO1xuICAgIH07XG5cbiAgICAvLyBzdGF0aWNcblxuICAgIEFsZXJ0Ll9qUXVlcnlJbnRlcmZhY2UgPSBmdW5jdGlvbiBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkZWxlbWVudCA9ICQodGhpcyk7XG4gICAgICAgIHZhciBkYXRhID0gJGVsZW1lbnQuZGF0YShEQVRBX0tFWSk7XG5cbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgZGF0YSA9IG5ldyBBbGVydCh0aGlzKTtcbiAgICAgICAgICAkZWxlbWVudC5kYXRhKERBVEFfS0VZLCBkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcgPT09ICdjbG9zZScpIHtcbiAgICAgICAgICBkYXRhW2NvbmZpZ10odGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBBbGVydC5faGFuZGxlRGlzbWlzcyA9IGZ1bmN0aW9uIF9oYW5kbGVEaXNtaXNzKGFsZXJ0SW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFsZXJ0SW5zdGFuY2UuY2xvc2UodGhpcyk7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICBfY3JlYXRlQ2xhc3MoQWxlcnQsIG51bGwsIFt7XG4gICAgICBrZXk6ICdWRVJTSU9OJyxcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gVkVSU0lPTjtcbiAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQWxlcnQ7XG4gIH0oKTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkKGRvY3VtZW50KS5vbihFdmVudC5DTElDS19EQVRBX0FQSSwgU2VsZWN0b3IuRElTTUlTUywgQWxlcnQuX2hhbmRsZURpc21pc3MobmV3IEFsZXJ0KCkpKTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIGpRdWVyeVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgJC5mbltOQU1FXSA9IEFsZXJ0Ll9qUXVlcnlJbnRlcmZhY2U7XG4gICQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBBbGVydDtcbiAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1Q7XG4gICAgcmV0dXJuIEFsZXJ0Ll9qUXVlcnlJbnRlcmZhY2U7XG4gIH07XG5cbiAgcmV0dXJuIEFsZXJ0O1xufShqUXVlcnkpO1xuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgKHY0LjAuMC1hbHBoYS42KTogYnV0dG9uLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG52YXIgQnV0dG9uID0gZnVuY3Rpb24gKCQpIHtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENvbnN0YW50c1xuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIE5BTUUgPSAnYnV0dG9uJztcbiAgdmFyIFZFUlNJT04gPSAnNC4wLjAtYWxwaGEuNic7XG4gIHZhciBEQVRBX0tFWSA9ICdicy5idXR0b24nO1xuICB2YXIgRVZFTlRfS0VZID0gJy4nICsgREFUQV9LRVk7XG4gIHZhciBEQVRBX0FQSV9LRVkgPSAnLmRhdGEtYXBpJztcbiAgdmFyIEpRVUVSWV9OT19DT05GTElDVCA9ICQuZm5bTkFNRV07XG5cbiAgdmFyIENsYXNzTmFtZSA9IHtcbiAgICBBQ1RJVkU6ICdhY3RpdmUnLFxuICAgIEJVVFRPTjogJ2J0bicsXG4gICAgRk9DVVM6ICdmb2N1cydcbiAgfTtcblxuICB2YXIgU2VsZWN0b3IgPSB7XG4gICAgREFUQV9UT0dHTEVfQ0FSUk9UOiAnW2RhdGEtdG9nZ2xlXj1cImJ1dHRvblwiXScsXG4gICAgREFUQV9UT0dHTEU6ICdbZGF0YS10b2dnbGU9XCJidXR0b25zXCJdJyxcbiAgICBJTlBVVDogJ2lucHV0JyxcbiAgICBBQ1RJVkU6ICcuYWN0aXZlJyxcbiAgICBCVVRUT046ICcuYnRuJ1xuICB9O1xuXG4gIHZhciBFdmVudCA9IHtcbiAgICBDTElDS19EQVRBX0FQSTogJ2NsaWNrJyArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWSxcbiAgICBGT0NVU19CTFVSX0RBVEFfQVBJOiAnZm9jdXMnICsgRVZFTlRfS0VZICsgREFUQV9BUElfS0VZICsgJyAnICsgKCdibHVyJyArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWSlcbiAgfTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENsYXNzIERlZmluaXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIHZhciBCdXR0b24gPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQnV0dG9uKGVsZW1lbnQpIHtcbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCdXR0b24pO1xuXG4gICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICB9XG5cbiAgICAvLyBnZXR0ZXJzXG5cbiAgICAvLyBwdWJsaWNcblxuICAgIEJ1dHRvbi5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gdG9nZ2xlKCkge1xuICAgICAgdmFyIHRyaWdnZXJDaGFuZ2VFdmVudCA9IHRydWU7XG4gICAgICB2YXIgcm9vdEVsZW1lbnQgPSAkKHRoaXMuX2VsZW1lbnQpLmNsb3Nlc3QoU2VsZWN0b3IuREFUQV9UT0dHTEUpWzBdO1xuXG4gICAgICBpZiAocm9vdEVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzLl9lbGVtZW50KS5maW5kKFNlbGVjdG9yLklOUFVUKVswXTtcblxuICAgICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgaWYgKGlucHV0LmNoZWNrZWQgJiYgJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuQUNUSVZFKSkge1xuICAgICAgICAgICAgICB0cmlnZ2VyQ2hhbmdlRXZlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciBhY3RpdmVFbGVtZW50ID0gJChyb290RWxlbWVudCkuZmluZChTZWxlY3Rvci5BQ1RJVkUpWzBdO1xuXG4gICAgICAgICAgICAgIGlmIChhY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgJChhY3RpdmVFbGVtZW50KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQUNUSVZFKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0cmlnZ2VyQ2hhbmdlRXZlbnQpIHtcbiAgICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSAhJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuQUNUSVZFKTtcbiAgICAgICAgICAgICQoaW5wdXQpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcsICEkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5BQ1RJVkUpKTtcblxuICAgICAgaWYgKHRyaWdnZXJDaGFuZ2VFdmVudCkge1xuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLnRvZ2dsZUNsYXNzKENsYXNzTmFtZS5BQ1RJVkUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBCdXR0b24ucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgICAgJC5yZW1vdmVEYXRhKHRoaXMuX2VsZW1lbnQsIERBVEFfS0VZKTtcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBzdGF0aWNcblxuICAgIEJ1dHRvbi5falF1ZXJ5SW50ZXJmYWNlID0gZnVuY3Rpb24gX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGF0YSA9ICQodGhpcykuZGF0YShEQVRBX0tFWSk7XG5cbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgZGF0YSA9IG5ldyBCdXR0b24odGhpcyk7XG4gICAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcgPT09ICd0b2dnbGUnKSB7XG4gICAgICAgICAgZGF0YVtjb25maWddKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfY3JlYXRlQ2xhc3MoQnV0dG9uLCBudWxsLCBbe1xuICAgICAga2V5OiAnVkVSU0lPTicsXG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIFZFUlNJT047XG4gICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEJ1dHRvbjtcbiAgfSgpO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQoZG9jdW1lbnQpLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRV9DQVJST1QsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB2YXIgYnV0dG9uID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgaWYgKCEkKGJ1dHRvbikuaGFzQ2xhc3MoQ2xhc3NOYW1lLkJVVFRPTikpIHtcbiAgICAgIGJ1dHRvbiA9ICQoYnV0dG9uKS5jbG9zZXN0KFNlbGVjdG9yLkJVVFRPTik7XG4gICAgfVxuXG4gICAgQnV0dG9uLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkKGJ1dHRvbiksICd0b2dnbGUnKTtcbiAgfSkub24oRXZlbnQuRk9DVVNfQkxVUl9EQVRBX0FQSSwgU2VsZWN0b3IuREFUQV9UT0dHTEVfQ0FSUk9ULCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgYnV0dG9uID0gJChldmVudC50YXJnZXQpLmNsb3Nlc3QoU2VsZWN0b3IuQlVUVE9OKVswXTtcbiAgICAkKGJ1dHRvbikudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLkZPQ1VTLCAvXmZvY3VzKGluKT8kLy50ZXN0KGV2ZW50LnR5cGUpKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBqUXVlcnlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQuZm5bTkFNRV0gPSBCdXR0b24uX2pRdWVyeUludGVyZmFjZTtcbiAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IEJ1dHRvbjtcbiAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1Q7XG4gICAgcmV0dXJuIEJ1dHRvbi5falF1ZXJ5SW50ZXJmYWNlO1xuICB9O1xuXG4gIHJldHVybiBCdXR0b247XG59KGpRdWVyeSk7XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuMC4wLWFscGhhLjYpOiBjYXJvdXNlbC5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxudmFyIENhcm91c2VsID0gZnVuY3Rpb24gKCQpIHtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENvbnN0YW50c1xuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIE5BTUUgPSAnY2Fyb3VzZWwnO1xuICB2YXIgVkVSU0lPTiA9ICc0LjAuMC1hbHBoYS42JztcbiAgdmFyIERBVEFfS0VZID0gJ2JzLmNhcm91c2VsJztcbiAgdmFyIEVWRU5UX0tFWSA9ICcuJyArIERBVEFfS0VZO1xuICB2YXIgREFUQV9BUElfS0VZID0gJy5kYXRhLWFwaSc7XG4gIHZhciBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkLmZuW05BTUVdO1xuICB2YXIgVFJBTlNJVElPTl9EVVJBVElPTiA9IDYwMDtcbiAgdmFyIEFSUk9XX0xFRlRfS0VZQ09ERSA9IDM3OyAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciBsZWZ0IGFycm93IGtleVxuICB2YXIgQVJST1dfUklHSFRfS0VZQ09ERSA9IDM5OyAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciByaWdodCBhcnJvdyBrZXlcblxuICB2YXIgRGVmYXVsdCA9IHtcbiAgICBpbnRlcnZhbDogNTAwMCxcbiAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICBzbGlkZTogZmFsc2UsXG4gICAgcGF1c2U6ICdob3ZlcicsXG4gICAgd3JhcDogdHJ1ZVxuICB9O1xuXG4gIHZhciBEZWZhdWx0VHlwZSA9IHtcbiAgICBpbnRlcnZhbDogJyhudW1iZXJ8Ym9vbGVhbiknLFxuICAgIGtleWJvYXJkOiAnYm9vbGVhbicsXG4gICAgc2xpZGU6ICcoYm9vbGVhbnxzdHJpbmcpJyxcbiAgICBwYXVzZTogJyhzdHJpbmd8Ym9vbGVhbiknLFxuICAgIHdyYXA6ICdib29sZWFuJ1xuICB9O1xuXG4gIHZhciBEaXJlY3Rpb24gPSB7XG4gICAgTkVYVDogJ25leHQnLFxuICAgIFBSRVY6ICdwcmV2JyxcbiAgICBMRUZUOiAnbGVmdCcsXG4gICAgUklHSFQ6ICdyaWdodCdcbiAgfTtcblxuICB2YXIgRXZlbnQgPSB7XG4gICAgU0xJREU6ICdzbGlkZScgKyBFVkVOVF9LRVksXG4gICAgU0xJRDogJ3NsaWQnICsgRVZFTlRfS0VZLFxuICAgIEtFWURPV046ICdrZXlkb3duJyArIEVWRU5UX0tFWSxcbiAgICBNT1VTRUVOVEVSOiAnbW91c2VlbnRlcicgKyBFVkVOVF9LRVksXG4gICAgTU9VU0VMRUFWRTogJ21vdXNlbGVhdmUnICsgRVZFTlRfS0VZLFxuICAgIExPQURfREFUQV9BUEk6ICdsb2FkJyArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWSxcbiAgICBDTElDS19EQVRBX0FQSTogJ2NsaWNrJyArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWVxuICB9O1xuXG4gIHZhciBDbGFzc05hbWUgPSB7XG4gICAgQ0FST1VTRUw6ICdjYXJvdXNlbCcsXG4gICAgQUNUSVZFOiAnYWN0aXZlJyxcbiAgICBTTElERTogJ3NsaWRlJyxcbiAgICBSSUdIVDogJ2Nhcm91c2VsLWl0ZW0tcmlnaHQnLFxuICAgIExFRlQ6ICdjYXJvdXNlbC1pdGVtLWxlZnQnLFxuICAgIE5FWFQ6ICdjYXJvdXNlbC1pdGVtLW5leHQnLFxuICAgIFBSRVY6ICdjYXJvdXNlbC1pdGVtLXByZXYnLFxuICAgIElURU06ICdjYXJvdXNlbC1pdGVtJ1xuICB9O1xuXG4gIHZhciBTZWxlY3RvciA9IHtcbiAgICBBQ1RJVkU6ICcuYWN0aXZlJyxcbiAgICBBQ1RJVkVfSVRFTTogJy5hY3RpdmUuY2Fyb3VzZWwtaXRlbScsXG4gICAgSVRFTTogJy5jYXJvdXNlbC1pdGVtJyxcbiAgICBORVhUX1BSRVY6ICcuY2Fyb3VzZWwtaXRlbS1uZXh0LCAuY2Fyb3VzZWwtaXRlbS1wcmV2JyxcbiAgICBJTkRJQ0FUT1JTOiAnLmNhcm91c2VsLWluZGljYXRvcnMnLFxuICAgIERBVEFfU0xJREU6ICdbZGF0YS1zbGlkZV0sIFtkYXRhLXNsaWRlLXRvXScsXG4gICAgREFUQV9SSURFOiAnW2RhdGEtcmlkZT1cImNhcm91c2VsXCJdJ1xuICB9O1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIENhcm91c2VsID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhcm91c2VsKGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENhcm91c2VsKTtcblxuICAgICAgdGhpcy5faXRlbXMgPSBudWxsO1xuICAgICAgdGhpcy5faW50ZXJ2YWwgPSBudWxsO1xuICAgICAgdGhpcy5fYWN0aXZlRWxlbWVudCA9IG51bGw7XG5cbiAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XG4gICAgICB0aGlzLl9pc1NsaWRpbmcgPSBmYWxzZTtcblxuICAgICAgdGhpcy5fY29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICB0aGlzLl9lbGVtZW50ID0gJChlbGVtZW50KVswXTtcbiAgICAgIHRoaXMuX2luZGljYXRvcnNFbGVtZW50ID0gJCh0aGlzLl9lbGVtZW50KS5maW5kKFNlbGVjdG9yLklORElDQVRPUlMpWzBdO1xuXG4gICAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIC8vIGdldHRlcnNcblxuICAgIC8vIHB1YmxpY1xuXG4gICAgQ2Fyb3VzZWwucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgaWYgKHRoaXMuX2lzU2xpZGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhcm91c2VsIGlzIHNsaWRpbmcnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3NsaWRlKERpcmVjdGlvbi5ORVhUKTtcbiAgICB9O1xuXG4gICAgQ2Fyb3VzZWwucHJvdG90eXBlLm5leHRXaGVuVmlzaWJsZSA9IGZ1bmN0aW9uIG5leHRXaGVuVmlzaWJsZSgpIHtcbiAgICAgIC8vIERvbid0IGNhbGwgbmV4dCB3aGVuIHRoZSBwYWdlIGlzbid0IHZpc2libGVcbiAgICAgIGlmICghZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBDYXJvdXNlbC5wcm90b3R5cGUucHJldiA9IGZ1bmN0aW9uIHByZXYoKSB7XG4gICAgICBpZiAodGhpcy5faXNTbGlkaW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fyb3VzZWwgaXMgc2xpZGluZycpO1xuICAgICAgfVxuICAgICAgdGhpcy5fc2xpZGUoRGlyZWN0aW9uLlBSRVZJT1VTKTtcbiAgICB9O1xuXG4gICAgQ2Fyb3VzZWwucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gcGF1c2UoZXZlbnQpIHtcbiAgICAgIGlmICghZXZlbnQpIHtcbiAgICAgICAgdGhpcy5faXNQYXVzZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoJCh0aGlzLl9lbGVtZW50KS5maW5kKFNlbGVjdG9yLk5FWFRfUFJFVilbMF0gJiYgVXRpbC5zdXBwb3J0c1RyYW5zaXRpb25FbmQoKSkge1xuICAgICAgICBVdGlsLnRyaWdnZXJUcmFuc2l0aW9uRW5kKHRoaXMuX2VsZW1lbnQpO1xuICAgICAgICB0aGlzLmN5Y2xlKHRydWUpO1xuICAgICAgfVxuXG4gICAgICBjbGVhckludGVydmFsKHRoaXMuX2ludGVydmFsKTtcbiAgICAgIHRoaXMuX2ludGVydmFsID0gbnVsbDtcbiAgICB9O1xuXG4gICAgQ2Fyb3VzZWwucHJvdG90eXBlLmN5Y2xlID0gZnVuY3Rpb24gY3ljbGUoZXZlbnQpIHtcbiAgICAgIGlmICghZXZlbnQpIHtcbiAgICAgICAgdGhpcy5faXNQYXVzZWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2ludGVydmFsKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9jb25maWcuaW50ZXJ2YWwgJiYgIXRoaXMuX2lzUGF1c2VkKSB7XG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gc2V0SW50ZXJ2YWwoKGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA/IHRoaXMubmV4dFdoZW5WaXNpYmxlIDogdGhpcy5uZXh0KS5iaW5kKHRoaXMpLCB0aGlzLl9jb25maWcuaW50ZXJ2YWwpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBDYXJvdXNlbC5wcm90b3R5cGUudG8gPSBmdW5jdGlvbiB0byhpbmRleCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHRoaXMuX2FjdGl2ZUVsZW1lbnQgPSAkKHRoaXMuX2VsZW1lbnQpLmZpbmQoU2VsZWN0b3IuQUNUSVZFX0lURU0pWzBdO1xuXG4gICAgICB2YXIgYWN0aXZlSW5kZXggPSB0aGlzLl9nZXRJdGVtSW5kZXgodGhpcy5fYWN0aXZlRWxlbWVudCk7XG5cbiAgICAgIGlmIChpbmRleCA+IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDEgfHwgaW5kZXggPCAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2lzU2xpZGluZykge1xuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uZShFdmVudC5TTElELCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMy50byhpbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChhY3RpdmVJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB0aGlzLmN5Y2xlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGRpcmVjdGlvbiA9IGluZGV4ID4gYWN0aXZlSW5kZXggPyBEaXJlY3Rpb24uTkVYVCA6IERpcmVjdGlvbi5QUkVWSU9VUztcblxuICAgICAgdGhpcy5fc2xpZGUoZGlyZWN0aW9uLCB0aGlzLl9pdGVtc1tpbmRleF0pO1xuICAgIH07XG5cbiAgICBDYXJvdXNlbC5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLm9mZihFVkVOVF9LRVkpO1xuICAgICAgJC5yZW1vdmVEYXRhKHRoaXMuX2VsZW1lbnQsIERBVEFfS0VZKTtcblxuICAgICAgdGhpcy5faXRlbXMgPSBudWxsO1xuICAgICAgdGhpcy5fY29uZmlnID0gbnVsbDtcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgICAgdGhpcy5faW50ZXJ2YWwgPSBudWxsO1xuICAgICAgdGhpcy5faXNQYXVzZWQgPSBudWxsO1xuICAgICAgdGhpcy5faXNTbGlkaW5nID0gbnVsbDtcbiAgICAgIHRoaXMuX2FjdGl2ZUVsZW1lbnQgPSBudWxsO1xuICAgICAgdGhpcy5faW5kaWNhdG9yc0VsZW1lbnQgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBwcml2YXRlXG5cbiAgICBDYXJvdXNlbC5wcm90b3R5cGUuX2dldENvbmZpZyA9IGZ1bmN0aW9uIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgICBjb25maWcgPSAkLmV4dGVuZCh7fSwgRGVmYXVsdCwgY29uZmlnKTtcbiAgICAgIFV0aWwudHlwZUNoZWNrQ29uZmlnKE5BTUUsIGNvbmZpZywgRGVmYXVsdFR5cGUpO1xuICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9O1xuXG4gICAgQ2Fyb3VzZWwucHJvdG90eXBlLl9hZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uIF9hZGRFdmVudExpc3RlbmVycygpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5fY29uZmlnLmtleWJvYXJkKSB7XG4gICAgICAgICQodGhpcy5fZWxlbWVudCkub24oRXZlbnQuS0VZRE9XTiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzNC5fa2V5ZG93bihldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fY29uZmlnLnBhdXNlID09PSAnaG92ZXInICYmICEoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSkge1xuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uKEV2ZW50Lk1PVVNFRU5URVIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHJldHVybiBfdGhpczQucGF1c2UoZXZlbnQpO1xuICAgICAgICB9KS5vbihFdmVudC5NT1VTRUxFQVZFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXM0LmN5Y2xlKGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIENhcm91c2VsLnByb3RvdHlwZS5fa2V5ZG93biA9IGZ1bmN0aW9uIF9rZXlkb3duKGV2ZW50KSB7XG4gICAgICBpZiAoL2lucHV0fHRleHRhcmVhL2kudGVzdChldmVudC50YXJnZXQudGFnTmFtZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgIGNhc2UgQVJST1dfTEVGVF9LRVlDT0RFOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5wcmV2KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQVJST1dfUklHSFRfS0VZQ09ERTpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgQ2Fyb3VzZWwucHJvdG90eXBlLl9nZXRJdGVtSW5kZXggPSBmdW5jdGlvbiBfZ2V0SXRlbUluZGV4KGVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX2l0ZW1zID0gJC5tYWtlQXJyYXkoJChlbGVtZW50KS5wYXJlbnQoKS5maW5kKFNlbGVjdG9yLklURU0pKTtcbiAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5pbmRleE9mKGVsZW1lbnQpO1xuICAgIH07XG5cbiAgICBDYXJvdXNlbC5wcm90b3R5cGUuX2dldEl0ZW1CeURpcmVjdGlvbiA9IGZ1bmN0aW9uIF9nZXRJdGVtQnlEaXJlY3Rpb24oZGlyZWN0aW9uLCBhY3RpdmVFbGVtZW50KSB7XG4gICAgICB2YXIgaXNOZXh0RGlyZWN0aW9uID0gZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTkVYVDtcbiAgICAgIHZhciBpc1ByZXZEaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5QUkVWSU9VUztcbiAgICAgIHZhciBhY3RpdmVJbmRleCA9IHRoaXMuX2dldEl0ZW1JbmRleChhY3RpdmVFbGVtZW50KTtcbiAgICAgIHZhciBsYXN0SXRlbUluZGV4ID0gdGhpcy5faXRlbXMubGVuZ3RoIC0gMTtcbiAgICAgIHZhciBpc0dvaW5nVG9XcmFwID0gaXNQcmV2RGlyZWN0aW9uICYmIGFjdGl2ZUluZGV4ID09PSAwIHx8IGlzTmV4dERpcmVjdGlvbiAmJiBhY3RpdmVJbmRleCA9PT0gbGFzdEl0ZW1JbmRleDtcblxuICAgICAgaWYgKGlzR29pbmdUb1dyYXAgJiYgIXRoaXMuX2NvbmZpZy53cmFwKSB7XG4gICAgICAgIHJldHVybiBhY3RpdmVFbGVtZW50O1xuICAgICAgfVxuXG4gICAgICB2YXIgZGVsdGEgPSBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5QUkVWSU9VUyA/IC0xIDogMTtcbiAgICAgIHZhciBpdGVtSW5kZXggPSAoYWN0aXZlSW5kZXggKyBkZWx0YSkgJSB0aGlzLl9pdGVtcy5sZW5ndGg7XG5cbiAgICAgIHJldHVybiBpdGVtSW5kZXggPT09IC0xID8gdGhpcy5faXRlbXNbdGhpcy5faXRlbXMubGVuZ3RoIC0gMV0gOiB0aGlzLl9pdGVtc1tpdGVtSW5kZXhdO1xuICAgIH07XG5cbiAgICBDYXJvdXNlbC5wcm90b3R5cGUuX3RyaWdnZXJTbGlkZUV2ZW50ID0gZnVuY3Rpb24gX3RyaWdnZXJTbGlkZUV2ZW50KHJlbGF0ZWRUYXJnZXQsIGV2ZW50RGlyZWN0aW9uTmFtZSkge1xuICAgICAgdmFyIHNsaWRlRXZlbnQgPSAkLkV2ZW50KEV2ZW50LlNMSURFLCB7XG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHJlbGF0ZWRUYXJnZXQsXG4gICAgICAgIGRpcmVjdGlvbjogZXZlbnREaXJlY3Rpb25OYW1lXG4gICAgICB9KTtcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHNsaWRlRXZlbnQpO1xuXG4gICAgICByZXR1cm4gc2xpZGVFdmVudDtcbiAgICB9O1xuXG4gICAgQ2Fyb3VzZWwucHJvdG90eXBlLl9zZXRBY3RpdmVJbmRpY2F0b3JFbGVtZW50ID0gZnVuY3Rpb24gX3NldEFjdGl2ZUluZGljYXRvckVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgaWYgKHRoaXMuX2luZGljYXRvcnNFbGVtZW50KSB7XG4gICAgICAgICQodGhpcy5faW5kaWNhdG9yc0VsZW1lbnQpLmZpbmQoU2VsZWN0b3IuQUNUSVZFKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQUNUSVZFKTtcblxuICAgICAgICB2YXIgbmV4dEluZGljYXRvciA9IHRoaXMuX2luZGljYXRvcnNFbGVtZW50LmNoaWxkcmVuW3RoaXMuX2dldEl0ZW1JbmRleChlbGVtZW50KV07XG5cbiAgICAgICAgaWYgKG5leHRJbmRpY2F0b3IpIHtcbiAgICAgICAgICAkKG5leHRJbmRpY2F0b3IpLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIENhcm91c2VsLnByb3RvdHlwZS5fc2xpZGUgPSBmdW5jdGlvbiBfc2xpZGUoZGlyZWN0aW9uLCBlbGVtZW50KSB7XG4gICAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgICAgdmFyIGFjdGl2ZUVsZW1lbnQgPSAkKHRoaXMuX2VsZW1lbnQpLmZpbmQoU2VsZWN0b3IuQUNUSVZFX0lURU0pWzBdO1xuICAgICAgdmFyIG5leHRFbGVtZW50ID0gZWxlbWVudCB8fCBhY3RpdmVFbGVtZW50ICYmIHRoaXMuX2dldEl0ZW1CeURpcmVjdGlvbihkaXJlY3Rpb24sIGFjdGl2ZUVsZW1lbnQpO1xuXG4gICAgICB2YXIgaXNDeWNsaW5nID0gQm9vbGVhbih0aGlzLl9pbnRlcnZhbCk7XG5cbiAgICAgIHZhciBkaXJlY3Rpb25hbENsYXNzTmFtZSA9IHZvaWQgMDtcbiAgICAgIHZhciBvcmRlckNsYXNzTmFtZSA9IHZvaWQgMDtcbiAgICAgIHZhciBldmVudERpcmVjdGlvbk5hbWUgPSB2b2lkIDA7XG5cbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5ORVhUKSB7XG4gICAgICAgIGRpcmVjdGlvbmFsQ2xhc3NOYW1lID0gQ2xhc3NOYW1lLkxFRlQ7XG4gICAgICAgIG9yZGVyQ2xhc3NOYW1lID0gQ2xhc3NOYW1lLk5FWFQ7XG4gICAgICAgIGV2ZW50RGlyZWN0aW9uTmFtZSA9IERpcmVjdGlvbi5MRUZUO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlyZWN0aW9uYWxDbGFzc05hbWUgPSBDbGFzc05hbWUuUklHSFQ7XG4gICAgICAgIG9yZGVyQ2xhc3NOYW1lID0gQ2xhc3NOYW1lLlBSRVY7XG4gICAgICAgIGV2ZW50RGlyZWN0aW9uTmFtZSA9IERpcmVjdGlvbi5SSUdIVDtcbiAgICAgIH1cblxuICAgICAgaWYgKG5leHRFbGVtZW50ICYmICQobmV4dEVsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5BQ1RJVkUpKSB7XG4gICAgICAgIHRoaXMuX2lzU2xpZGluZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzbGlkZUV2ZW50ID0gdGhpcy5fdHJpZ2dlclNsaWRlRXZlbnQobmV4dEVsZW1lbnQsIGV2ZW50RGlyZWN0aW9uTmFtZSk7XG4gICAgICBpZiAoc2xpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghYWN0aXZlRWxlbWVudCB8fCAhbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgLy8gc29tZSB3ZWlyZG5lc3MgaXMgaGFwcGVuaW5nLCBzbyB3ZSBiYWlsXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5faXNTbGlkaW5nID0gdHJ1ZTtcblxuICAgICAgaWYgKGlzQ3ljbGluZykge1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NldEFjdGl2ZUluZGljYXRvckVsZW1lbnQobmV4dEVsZW1lbnQpO1xuXG4gICAgICB2YXIgc2xpZEV2ZW50ID0gJC5FdmVudChFdmVudC5TTElELCB7XG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6IG5leHRFbGVtZW50LFxuICAgICAgICBkaXJlY3Rpb246IGV2ZW50RGlyZWN0aW9uTmFtZVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChVdGlsLnN1cHBvcnRzVHJhbnNpdGlvbkVuZCgpICYmICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNMSURFKSkge1xuXG4gICAgICAgICQobmV4dEVsZW1lbnQpLmFkZENsYXNzKG9yZGVyQ2xhc3NOYW1lKTtcblxuICAgICAgICBVdGlsLnJlZmxvdyhuZXh0RWxlbWVudCk7XG5cbiAgICAgICAgJChhY3RpdmVFbGVtZW50KS5hZGRDbGFzcyhkaXJlY3Rpb25hbENsYXNzTmFtZSk7XG4gICAgICAgICQobmV4dEVsZW1lbnQpLmFkZENsYXNzKGRpcmVjdGlvbmFsQ2xhc3NOYW1lKTtcblxuICAgICAgICAkKGFjdGl2ZUVsZW1lbnQpLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJChuZXh0RWxlbWVudCkucmVtb3ZlQ2xhc3MoZGlyZWN0aW9uYWxDbGFzc05hbWUgKyAnICcgKyBvcmRlckNsYXNzTmFtZSkuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7XG5cbiAgICAgICAgICAkKGFjdGl2ZUVsZW1lbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5BQ1RJVkUgKyAnICcgKyBvcmRlckNsYXNzTmFtZSArICcgJyArIGRpcmVjdGlvbmFsQ2xhc3NOYW1lKTtcblxuICAgICAgICAgIF90aGlzNS5faXNTbGlkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAkKF90aGlzNS5fZWxlbWVudCkudHJpZ2dlcihzbGlkRXZlbnQpO1xuICAgICAgICAgIH0sIDApO1xuICAgICAgICB9KS5lbXVsYXRlVHJhbnNpdGlvbkVuZChUUkFOU0lUSU9OX0RVUkFUSU9OKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoYWN0aXZlRWxlbWVudCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7XG4gICAgICAgICQobmV4dEVsZW1lbnQpLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpO1xuXG4gICAgICAgIHRoaXMuX2lzU2xpZGluZyA9IGZhbHNlO1xuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc2xpZEV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzQ3ljbGluZykge1xuICAgICAgICB0aGlzLmN5Y2xlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIHN0YXRpY1xuXG4gICAgQ2Fyb3VzZWwuX2pRdWVyeUludGVyZmFjZSA9IGZ1bmN0aW9uIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRhdGEgPSAkKHRoaXMpLmRhdGEoREFUQV9LRVkpO1xuICAgICAgICB2YXIgX2NvbmZpZyA9ICQuZXh0ZW5kKHt9LCBEZWZhdWx0LCAkKHRoaXMpLmRhdGEoKSk7XG5cbiAgICAgICAgaWYgKCh0eXBlb2YgY29uZmlnID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihjb25maWcpKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAkLmV4dGVuZChfY29uZmlnLCBjb25maWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFjdGlvbiA9IHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnID8gY29uZmlnIDogX2NvbmZpZy5zbGlkZTtcblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IENhcm91c2VsKHRoaXMsIF9jb25maWcpO1xuICAgICAgICAgICQodGhpcykuZGF0YShEQVRBX0tFWSwgZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBkYXRhLnRvKGNvbmZpZyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAoZGF0YVthY3Rpb25dID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gbWV0aG9kIG5hbWVkIFwiJyArIGFjdGlvbiArICdcIicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhW2FjdGlvbl0oKTtcbiAgICAgICAgfSBlbHNlIGlmIChfY29uZmlnLmludGVydmFsKSB7XG4gICAgICAgICAgZGF0YS5wYXVzZSgpO1xuICAgICAgICAgIGRhdGEuY3ljbGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIENhcm91c2VsLl9kYXRhQXBpQ2xpY2tIYW5kbGVyID0gZnVuY3Rpb24gX2RhdGFBcGlDbGlja0hhbmRsZXIoZXZlbnQpIHtcbiAgICAgIHZhciBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudCh0aGlzKTtcblxuICAgICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0YXJnZXQgPSAkKHNlbGVjdG9yKVswXTtcblxuICAgICAgaWYgKCF0YXJnZXQgfHwgISQodGFyZ2V0KS5oYXNDbGFzcyhDbGFzc05hbWUuQ0FST1VTRUwpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbmZpZyA9ICQuZXh0ZW5kKHt9LCAkKHRhcmdldCkuZGF0YSgpLCAkKHRoaXMpLmRhdGEoKSk7XG4gICAgICB2YXIgc2xpZGVJbmRleCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlLXRvJyk7XG5cbiAgICAgIGlmIChzbGlkZUluZGV4KSB7XG4gICAgICAgIGNvbmZpZy5pbnRlcnZhbCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBDYXJvdXNlbC5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJCh0YXJnZXQpLCBjb25maWcpO1xuXG4gICAgICBpZiAoc2xpZGVJbmRleCkge1xuICAgICAgICAkKHRhcmdldCkuZGF0YShEQVRBX0tFWSkudG8oc2xpZGVJbmRleCk7XG4gICAgICB9XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfTtcblxuICAgIF9jcmVhdGVDbGFzcyhDYXJvdXNlbCwgbnVsbCwgW3tcbiAgICAgIGtleTogJ1ZFUlNJT04nLFxuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiBWRVJTSU9OO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ0RlZmF1bHQnLFxuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiBEZWZhdWx0O1xuICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBDYXJvdXNlbDtcbiAgfSgpO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQoZG9jdW1lbnQpLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1NMSURFLCBDYXJvdXNlbC5fZGF0YUFwaUNsaWNrSGFuZGxlcik7XG5cbiAgJCh3aW5kb3cpLm9uKEV2ZW50LkxPQURfREFUQV9BUEksIGZ1bmN0aW9uICgpIHtcbiAgICAkKFNlbGVjdG9yLkRBVEFfUklERSkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJGNhcm91c2VsID0gJCh0aGlzKTtcbiAgICAgIENhcm91c2VsLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkY2Fyb3VzZWwsICRjYXJvdXNlbC5kYXRhKCkpO1xuICAgIH0pO1xuICB9KTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIGpRdWVyeVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgJC5mbltOQU1FXSA9IENhcm91c2VsLl9qUXVlcnlJbnRlcmZhY2U7XG4gICQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBDYXJvdXNlbDtcbiAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1Q7XG4gICAgcmV0dXJuIENhcm91c2VsLl9qUXVlcnlJbnRlcmZhY2U7XG4gIH07XG5cbiAgcmV0dXJuIENhcm91c2VsO1xufShqUXVlcnkpO1xuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgKHY0LjAuMC1hbHBoYS42KTogY29sbGFwc2UuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbnZhciBDb2xsYXBzZSA9IGZ1bmN0aW9uICgkKSB7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDb25zdGFudHNcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIHZhciBOQU1FID0gJ2NvbGxhcHNlJztcbiAgdmFyIFZFUlNJT04gPSAnNC4wLjAtYWxwaGEuNic7XG4gIHZhciBEQVRBX0tFWSA9ICdicy5jb2xsYXBzZSc7XG4gIHZhciBFVkVOVF9LRVkgPSAnLicgKyBEQVRBX0tFWTtcbiAgdmFyIERBVEFfQVBJX0tFWSA9ICcuZGF0YS1hcGknO1xuICB2YXIgSlFVRVJZX05PX0NPTkZMSUNUID0gJC5mbltOQU1FXTtcbiAgdmFyIFRSQU5TSVRJT05fRFVSQVRJT04gPSA2MDA7XG5cbiAgdmFyIERlZmF1bHQgPSB7XG4gICAgdG9nZ2xlOiB0cnVlLFxuICAgIHBhcmVudDogJydcbiAgfTtcblxuICB2YXIgRGVmYXVsdFR5cGUgPSB7XG4gICAgdG9nZ2xlOiAnYm9vbGVhbicsXG4gICAgcGFyZW50OiAnc3RyaW5nJ1xuICB9O1xuXG4gIHZhciBFdmVudCA9IHtcbiAgICBTSE9XOiAnc2hvdycgKyBFVkVOVF9LRVksXG4gICAgU0hPV046ICdzaG93bicgKyBFVkVOVF9LRVksXG4gICAgSElERTogJ2hpZGUnICsgRVZFTlRfS0VZLFxuICAgIEhJRERFTjogJ2hpZGRlbicgKyBFVkVOVF9LRVksXG4gICAgQ0xJQ0tfREFUQV9BUEk6ICdjbGljaycgKyBFVkVOVF9LRVkgKyBEQVRBX0FQSV9LRVlcbiAgfTtcblxuICB2YXIgQ2xhc3NOYW1lID0ge1xuICAgIFNIT1c6ICdzaG93JyxcbiAgICBDT0xMQVBTRTogJ2NvbGxhcHNlJyxcbiAgICBDT0xMQVBTSU5HOiAnY29sbGFwc2luZycsXG4gICAgQ09MTEFQU0VEOiAnY29sbGFwc2VkJ1xuICB9O1xuXG4gIHZhciBEaW1lbnNpb24gPSB7XG4gICAgV0lEVEg6ICd3aWR0aCcsXG4gICAgSEVJR0hUOiAnaGVpZ2h0J1xuICB9O1xuXG4gIHZhciBTZWxlY3RvciA9IHtcbiAgICBBQ1RJVkVTOiAnLmNhcmQgPiAuc2hvdywgLmNhcmQgPiAuY29sbGFwc2luZycsXG4gICAgREFUQV9UT0dHTEU6ICdbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXSdcbiAgfTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENsYXNzIERlZmluaXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIHZhciBDb2xsYXBzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb2xsYXBzZShlbGVtZW50LCBjb25maWcpIHtcbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb2xsYXBzZSk7XG5cbiAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICB0aGlzLl9jb25maWcgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKTtcbiAgICAgIHRoaXMuX3RyaWdnZXJBcnJheSA9ICQubWFrZUFycmF5KCQoJ1tkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdW2hyZWY9XCIjJyArIGVsZW1lbnQuaWQgKyAnXCJdLCcgKyAoJ1tkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdW2RhdGEtdGFyZ2V0PVwiIycgKyBlbGVtZW50LmlkICsgJ1wiXScpKSk7XG5cbiAgICAgIHRoaXMuX3BhcmVudCA9IHRoaXMuX2NvbmZpZy5wYXJlbnQgPyB0aGlzLl9nZXRQYXJlbnQoKSA6IG51bGw7XG5cbiAgICAgIGlmICghdGhpcy5fY29uZmlnLnBhcmVudCkge1xuICAgICAgICB0aGlzLl9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3ModGhpcy5fZWxlbWVudCwgdGhpcy5fdHJpZ2dlckFycmF5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2NvbmZpZy50b2dnbGUpIHtcbiAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBnZXR0ZXJzXG5cbiAgICAvLyBwdWJsaWNcblxuICAgIENvbGxhcHNlLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiB0b2dnbGUoKSB7XG4gICAgICBpZiAoJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVykpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgQ29sbGFwc2UucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiBzaG93KCkge1xuICAgICAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgICAgIGlmICh0aGlzLl9pc1RyYW5zaXRpb25pbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb2xsYXBzZSBpcyB0cmFuc2l0aW9uaW5nJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICgkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBhY3RpdmVzID0gdm9pZCAwO1xuICAgICAgdmFyIGFjdGl2ZXNEYXRhID0gdm9pZCAwO1xuXG4gICAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgIGFjdGl2ZXMgPSAkLm1ha2VBcnJheSgkKHRoaXMuX3BhcmVudCkuZmluZChTZWxlY3Rvci5BQ1RJVkVTKSk7XG4gICAgICAgIGlmICghYWN0aXZlcy5sZW5ndGgpIHtcbiAgICAgICAgICBhY3RpdmVzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aXZlcykge1xuICAgICAgICBhY3RpdmVzRGF0YSA9ICQoYWN0aXZlcykuZGF0YShEQVRBX0tFWSk7XG4gICAgICAgIGlmIChhY3RpdmVzRGF0YSAmJiBhY3RpdmVzRGF0YS5faXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBzdGFydEV2ZW50ID0gJC5FdmVudChFdmVudC5TSE9XKTtcbiAgICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihzdGFydEV2ZW50KTtcbiAgICAgIGlmIChzdGFydEV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGFjdGl2ZXMpIHtcbiAgICAgICAgQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZS5jYWxsKCQoYWN0aXZlcyksICdoaWRlJyk7XG4gICAgICAgIGlmICghYWN0aXZlc0RhdGEpIHtcbiAgICAgICAgICAkKGFjdGl2ZXMpLmRhdGEoREFUQV9LRVksIG51bGwpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBkaW1lbnNpb24gPSB0aGlzLl9nZXREaW1lbnNpb24oKTtcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0UpLmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTSU5HKTtcblxuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gMDtcbiAgICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG5cbiAgICAgIGlmICh0aGlzLl90cmlnZ2VyQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICQodGhpcy5fdHJpZ2dlckFycmF5KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0VEKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0VHJhbnNpdGlvbmluZyh0cnVlKTtcblxuICAgICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICAgICQoX3RoaXM2Ll9lbGVtZW50KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0lORykuYWRkQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFKS5hZGRDbGFzcyhDbGFzc05hbWUuU0hPVyk7XG5cbiAgICAgICAgX3RoaXM2Ll9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSAnJztcblxuICAgICAgICBfdGhpczYuc2V0VHJhbnNpdGlvbmluZyhmYWxzZSk7XG5cbiAgICAgICAgJChfdGhpczYuX2VsZW1lbnQpLnRyaWdnZXIoRXZlbnQuU0hPV04pO1xuICAgICAgfTtcblxuICAgICAgaWYgKCFVdGlsLnN1cHBvcnRzVHJhbnNpdGlvbkVuZCgpKSB7XG4gICAgICAgIGNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNhcGl0YWxpemVkRGltZW5zaW9uID0gZGltZW5zaW9uWzBdLnRvVXBwZXJDYXNlKCkgKyBkaW1lbnNpb24uc2xpY2UoMSk7XG4gICAgICB2YXIgc2Nyb2xsU2l6ZSA9ICdzY3JvbGwnICsgY2FwaXRhbGl6ZWREaW1lbnNpb247XG5cbiAgICAgICQodGhpcy5fZWxlbWVudCkub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNvbXBsZXRlKS5lbXVsYXRlVHJhbnNpdGlvbkVuZChUUkFOU0lUSU9OX0RVUkFUSU9OKTtcblxuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gdGhpcy5fZWxlbWVudFtzY3JvbGxTaXplXSArICdweCc7XG4gICAgfTtcblxuICAgIENvbGxhcHNlLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gaGlkZSgpIHtcbiAgICAgIHZhciBfdGhpczcgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ29sbGFwc2UgaXMgdHJhbnNpdGlvbmluZycpO1xuICAgICAgfVxuXG4gICAgICBpZiAoISQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHN0YXJ0RXZlbnQgPSAkLkV2ZW50KEV2ZW50LkhJREUpO1xuICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHN0YXJ0RXZlbnQpO1xuICAgICAgaWYgKHN0YXJ0RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGltZW5zaW9uID0gdGhpcy5fZ2V0RGltZW5zaW9uKCk7XG4gICAgICB2YXIgb2Zmc2V0RGltZW5zaW9uID0gZGltZW5zaW9uID09PSBEaW1lbnNpb24uV0lEVEggPyAnb2Zmc2V0V2lkdGgnIDogJ29mZnNldEhlaWdodCc7XG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9IHRoaXMuX2VsZW1lbnRbb2Zmc2V0RGltZW5zaW9uXSArICdweCc7XG5cbiAgICAgIFV0aWwucmVmbG93KHRoaXMuX2VsZW1lbnQpO1xuXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTSU5HKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0UpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKTtcblxuICAgICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG5cbiAgICAgIGlmICh0aGlzLl90cmlnZ2VyQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICQodGhpcy5fdHJpZ2dlckFycmF5KS5hZGRDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0VEKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNldFRyYW5zaXRpb25pbmcodHJ1ZSk7XG5cbiAgICAgIHZhciBjb21wbGV0ZSA9IGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgICBfdGhpczcuc2V0VHJhbnNpdGlvbmluZyhmYWxzZSk7XG4gICAgICAgICQoX3RoaXM3Ll9lbGVtZW50KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0lORykuYWRkQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFKS50cmlnZ2VyKEV2ZW50LkhJRERFTik7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSAnJztcblxuICAgICAgaWYgKCFVdGlsLnN1cHBvcnRzVHJhbnNpdGlvbkVuZCgpKSB7XG4gICAgICAgIGNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgJCh0aGlzLl9lbGVtZW50KS5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgY29tcGxldGUpLmVtdWxhdGVUcmFuc2l0aW9uRW5kKFRSQU5TSVRJT05fRFVSQVRJT04pO1xuICAgIH07XG5cbiAgICBDb2xsYXBzZS5wcm90b3R5cGUuc2V0VHJhbnNpdGlvbmluZyA9IGZ1bmN0aW9uIHNldFRyYW5zaXRpb25pbmcoaXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSBpc1RyYW5zaXRpb25pbmc7XG4gICAgfTtcblxuICAgIENvbGxhcHNlLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSk7XG5cbiAgICAgIHRoaXMuX2NvbmZpZyA9IG51bGw7XG4gICAgICB0aGlzLl9wYXJlbnQgPSBudWxsO1xuICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgICB0aGlzLl90cmlnZ2VyQXJyYXkgPSBudWxsO1xuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gcHJpdmF0ZVxuXG4gICAgQ29sbGFwc2UucHJvdG90eXBlLl9nZXRDb25maWcgPSBmdW5jdGlvbiBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgICAgY29uZmlnID0gJC5leHRlbmQoe30sIERlZmF1bHQsIGNvbmZpZyk7XG4gICAgICBjb25maWcudG9nZ2xlID0gQm9vbGVhbihjb25maWcudG9nZ2xlKTsgLy8gY29lcmNlIHN0cmluZyB2YWx1ZXNcbiAgICAgIFV0aWwudHlwZUNoZWNrQ29uZmlnKE5BTUUsIGNvbmZpZywgRGVmYXVsdFR5cGUpO1xuICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9O1xuXG4gICAgQ29sbGFwc2UucHJvdG90eXBlLl9nZXREaW1lbnNpb24gPSBmdW5jdGlvbiBfZ2V0RGltZW5zaW9uKCkge1xuICAgICAgdmFyIGhhc1dpZHRoID0gJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhEaW1lbnNpb24uV0lEVEgpO1xuICAgICAgcmV0dXJuIGhhc1dpZHRoID8gRGltZW5zaW9uLldJRFRIIDogRGltZW5zaW9uLkhFSUdIVDtcbiAgICB9O1xuXG4gICAgQ29sbGFwc2UucHJvdG90eXBlLl9nZXRQYXJlbnQgPSBmdW5jdGlvbiBfZ2V0UGFyZW50KCkge1xuICAgICAgdmFyIF90aGlzOCA9IHRoaXM7XG5cbiAgICAgIHZhciBwYXJlbnQgPSAkKHRoaXMuX2NvbmZpZy5wYXJlbnQpWzBdO1xuICAgICAgdmFyIHNlbGVjdG9yID0gJ1tkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdW2RhdGEtcGFyZW50PVwiJyArIHRoaXMuX2NvbmZpZy5wYXJlbnQgKyAnXCJdJztcblxuICAgICAgJChwYXJlbnQpLmZpbmQoc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKGksIGVsZW1lbnQpIHtcbiAgICAgICAgX3RoaXM4Ll9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MoQ29sbGFwc2UuX2dldFRhcmdldEZyb21FbGVtZW50KGVsZW1lbnQpLCBbZWxlbWVudF0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgfTtcblxuICAgIENvbGxhcHNlLnByb3RvdHlwZS5fYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzID0gZnVuY3Rpb24gX2FkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyhlbGVtZW50LCB0cmlnZ2VyQXJyYXkpIHtcbiAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIHZhciBpc09wZW4gPSAkKGVsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKTtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBpc09wZW4pO1xuXG4gICAgICAgIGlmICh0cmlnZ2VyQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgJCh0cmlnZ2VyQXJyYXkpLnRvZ2dsZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTRUQsICFpc09wZW4pLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBpc09wZW4pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIHN0YXRpY1xuXG4gICAgQ29sbGFwc2UuX2dldFRhcmdldEZyb21FbGVtZW50ID0gZnVuY3Rpb24gX2dldFRhcmdldEZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgIHZhciBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtZW50KTtcbiAgICAgIHJldHVybiBzZWxlY3RvciA/ICQoc2VsZWN0b3IpWzBdIDogbnVsbDtcbiAgICB9O1xuXG4gICAgQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZSA9IGZ1bmN0aW9uIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIGRhdGEgPSAkdGhpcy5kYXRhKERBVEFfS0VZKTtcbiAgICAgICAgdmFyIF9jb25maWcgPSAkLmV4dGVuZCh7fSwgRGVmYXVsdCwgJHRoaXMuZGF0YSgpLCAodHlwZW9mIGNvbmZpZyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoY29uZmlnKSkgPT09ICdvYmplY3QnICYmIGNvbmZpZyk7XG5cbiAgICAgICAgaWYgKCFkYXRhICYmIF9jb25maWcudG9nZ2xlICYmIC9zaG93fGhpZGUvLnRlc3QoY29uZmlnKSkge1xuICAgICAgICAgIF9jb25maWcudG9nZ2xlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IENvbGxhcHNlKHRoaXMsIF9jb25maWcpO1xuICAgICAgICAgICR0aGlzLmRhdGEoREFUQV9LRVksIGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaWYgKGRhdGFbY29uZmlnXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIG1ldGhvZCBuYW1lZCBcIicgKyBjb25maWcgKyAnXCInKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YVtjb25maWddKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfY3JlYXRlQ2xhc3MoQ29sbGFwc2UsIG51bGwsIFt7XG4gICAgICBrZXk6ICdWRVJTSU9OJyxcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gVkVSU0lPTjtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdEZWZhdWx0JyxcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gRGVmYXVsdDtcbiAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQ29sbGFwc2U7XG4gIH0oKTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkKGRvY3VtZW50KS5vbihFdmVudC5DTElDS19EQVRBX0FQSSwgU2VsZWN0b3IuREFUQV9UT0dHTEUsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB2YXIgdGFyZ2V0ID0gQ29sbGFwc2UuX2dldFRhcmdldEZyb21FbGVtZW50KHRoaXMpO1xuICAgIHZhciBkYXRhID0gJCh0YXJnZXQpLmRhdGEoREFUQV9LRVkpO1xuICAgIHZhciBjb25maWcgPSBkYXRhID8gJ3RvZ2dsZScgOiAkKHRoaXMpLmRhdGEoKTtcblxuICAgIENvbGxhcHNlLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkKHRhcmdldCksIGNvbmZpZyk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogalF1ZXJ5XG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkLmZuW05BTUVdID0gQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZTtcbiAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IENvbGxhcHNlO1xuICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVDtcbiAgICByZXR1cm4gQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZTtcbiAgfTtcblxuICByZXR1cm4gQ29sbGFwc2U7XG59KGpRdWVyeSk7XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuMC4wLWFscGhhLjYpOiBkcm9wZG93bi5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxudmFyIERyb3Bkb3duID0gZnVuY3Rpb24gKCQpIHtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENvbnN0YW50c1xuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIE5BTUUgPSAnZHJvcGRvd24nO1xuICB2YXIgVkVSU0lPTiA9ICc0LjAuMC1hbHBoYS42JztcbiAgdmFyIERBVEFfS0VZID0gJ2JzLmRyb3Bkb3duJztcbiAgdmFyIEVWRU5UX0tFWSA9ICcuJyArIERBVEFfS0VZO1xuICB2YXIgREFUQV9BUElfS0VZID0gJy5kYXRhLWFwaSc7XG4gIHZhciBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkLmZuW05BTUVdO1xuICB2YXIgRVNDQVBFX0tFWUNPREUgPSAyNzsgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgRXNjYXBlIChFc2MpIGtleVxuICB2YXIgQVJST1dfVVBfS0VZQ09ERSA9IDM4OyAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciB1cCBhcnJvdyBrZXlcbiAgdmFyIEFSUk9XX0RPV05fS0VZQ09ERSA9IDQwOyAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciBkb3duIGFycm93IGtleVxuICB2YXIgUklHSFRfTU9VU0VfQlVUVE9OX1dISUNIID0gMzsgLy8gTW91c2VFdmVudC53aGljaCB2YWx1ZSBmb3IgdGhlIHJpZ2h0IGJ1dHRvbiAoYXNzdW1pbmcgYSByaWdodC1oYW5kZWQgbW91c2UpXG5cbiAgdmFyIEV2ZW50ID0ge1xuICAgIEhJREU6ICdoaWRlJyArIEVWRU5UX0tFWSxcbiAgICBISURERU46ICdoaWRkZW4nICsgRVZFTlRfS0VZLFxuICAgIFNIT1c6ICdzaG93JyArIEVWRU5UX0tFWSxcbiAgICBTSE9XTjogJ3Nob3duJyArIEVWRU5UX0tFWSxcbiAgICBDTElDSzogJ2NsaWNrJyArIEVWRU5UX0tFWSxcbiAgICBDTElDS19EQVRBX0FQSTogJ2NsaWNrJyArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWSxcbiAgICBGT0NVU0lOX0RBVEFfQVBJOiAnZm9jdXNpbicgKyBFVkVOVF9LRVkgKyBEQVRBX0FQSV9LRVksXG4gICAgS0VZRE9XTl9EQVRBX0FQSTogJ2tleWRvd24nICsgRVZFTlRfS0VZICsgREFUQV9BUElfS0VZXG4gIH07XG5cbiAgdmFyIENsYXNzTmFtZSA9IHtcbiAgICBCQUNLRFJPUDogJ2Ryb3Bkb3duLWJhY2tkcm9wJyxcbiAgICBESVNBQkxFRDogJ2Rpc2FibGVkJyxcbiAgICBTSE9XOiAnc2hvdydcbiAgfTtcblxuICB2YXIgU2VsZWN0b3IgPSB7XG4gICAgQkFDS0RST1A6ICcuZHJvcGRvd24tYmFja2Ryb3AnLFxuICAgIERBVEFfVE9HR0xFOiAnW2RhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIl0nLFxuICAgIEZPUk1fQ0hJTEQ6ICcuZHJvcGRvd24gZm9ybScsXG4gICAgUk9MRV9NRU5VOiAnW3JvbGU9XCJtZW51XCJdJyxcbiAgICBST0xFX0xJU1RCT1g6ICdbcm9sZT1cImxpc3Rib3hcIl0nLFxuICAgIE5BVkJBUl9OQVY6ICcubmF2YmFyLW5hdicsXG4gICAgVklTSUJMRV9JVEVNUzogJ1tyb2xlPVwibWVudVwiXSBsaTpub3QoLmRpc2FibGVkKSBhLCAnICsgJ1tyb2xlPVwibGlzdGJveFwiXSBsaTpub3QoLmRpc2FibGVkKSBhJ1xuICB9O1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIERyb3Bkb3duID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERyb3Bkb3duKGVsZW1lbnQpIHtcbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBEcm9wZG93bik7XG5cbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIC8vIGdldHRlcnNcblxuICAgIC8vIHB1YmxpY1xuXG4gICAgRHJvcGRvd24ucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uIHRvZ2dsZSgpIHtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICQodGhpcykuaGFzQ2xhc3MoQ2xhc3NOYW1lLkRJU0FCTEVEKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHZhciBwYXJlbnQgPSBEcm9wZG93bi5fZ2V0UGFyZW50RnJvbUVsZW1lbnQodGhpcyk7XG4gICAgICB2YXIgaXNBY3RpdmUgPSAkKHBhcmVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpO1xuXG4gICAgICBEcm9wZG93bi5fY2xlYXJNZW51cygpO1xuXG4gICAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmICEkKHBhcmVudCkuY2xvc2VzdChTZWxlY3Rvci5OQVZCQVJfTkFWKS5sZW5ndGgpIHtcblxuICAgICAgICAvLyBpZiBtb2JpbGUgd2UgdXNlIGEgYmFja2Ryb3AgYmVjYXVzZSBjbGljayBldmVudHMgZG9uJ3QgZGVsZWdhdGVcbiAgICAgICAgdmFyIGRyb3Bkb3duID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRyb3Bkb3duLmNsYXNzTmFtZSA9IENsYXNzTmFtZS5CQUNLRFJPUDtcbiAgICAgICAgJChkcm9wZG93bikuaW5zZXJ0QmVmb3JlKHRoaXMpO1xuICAgICAgICAkKGRyb3Bkb3duKS5vbignY2xpY2snLCBEcm9wZG93bi5fY2xlYXJNZW51cyk7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWxhdGVkVGFyZ2V0ID0ge1xuICAgICAgICByZWxhdGVkVGFyZ2V0OiB0aGlzXG4gICAgICB9O1xuICAgICAgdmFyIHNob3dFdmVudCA9ICQuRXZlbnQoRXZlbnQuU0hPVywgcmVsYXRlZFRhcmdldCk7XG5cbiAgICAgICQocGFyZW50KS50cmlnZ2VyKHNob3dFdmVudCk7XG5cbiAgICAgIGlmIChzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuXG4gICAgICAkKHBhcmVudCkudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpO1xuICAgICAgJChwYXJlbnQpLnRyaWdnZXIoJC5FdmVudChFdmVudC5TSE9XTiwgcmVsYXRlZFRhcmdldCkpO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIERyb3Bkb3duLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSk7XG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLm9mZihFVkVOVF9LRVkpO1xuICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIHByaXZhdGVcblxuICAgIERyb3Bkb3duLnByb3RvdHlwZS5fYWRkRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uKEV2ZW50LkNMSUNLLCB0aGlzLnRvZ2dsZSk7XG4gICAgfTtcblxuICAgIC8vIHN0YXRpY1xuXG4gICAgRHJvcGRvd24uX2pRdWVyeUludGVyZmFjZSA9IGZ1bmN0aW9uIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRhdGEgPSAkKHRoaXMpLmRhdGEoREFUQV9LRVkpO1xuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBuZXcgRHJvcGRvd24odGhpcyk7XG4gICAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmIChkYXRhW2NvbmZpZ10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBtZXRob2QgbmFtZWQgXCInICsgY29uZmlnICsgJ1wiJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFbY29uZmlnXS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgRHJvcGRvd24uX2NsZWFyTWVudXMgPSBmdW5jdGlvbiBfY2xlYXJNZW51cyhldmVudCkge1xuICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LndoaWNoID09PSBSSUdIVF9NT1VTRV9CVVRUT05fV0hJQ0gpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgYmFja2Ryb3AgPSAkKFNlbGVjdG9yLkJBQ0tEUk9QKVswXTtcbiAgICAgIGlmIChiYWNrZHJvcCkge1xuICAgICAgICBiYWNrZHJvcC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJhY2tkcm9wKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRvZ2dsZXMgPSAkLm1ha2VBcnJheSgkKFNlbGVjdG9yLkRBVEFfVE9HR0xFKSk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9nZ2xlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcGFyZW50ID0gRHJvcGRvd24uX2dldFBhcmVudEZyb21FbGVtZW50KHRvZ2dsZXNbaV0pO1xuICAgICAgICB2YXIgcmVsYXRlZFRhcmdldCA9IHtcbiAgICAgICAgICByZWxhdGVkVGFyZ2V0OiB0b2dnbGVzW2ldXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCEkKHBhcmVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdjbGljaycgJiYgL2lucHV0fHRleHRhcmVhL2kudGVzdChldmVudC50YXJnZXQudGFnTmFtZSkgfHwgZXZlbnQudHlwZSA9PT0gJ2ZvY3VzaW4nKSAmJiAkLmNvbnRhaW5zKHBhcmVudCwgZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhpZGVFdmVudCA9ICQuRXZlbnQoRXZlbnQuSElERSwgcmVsYXRlZFRhcmdldCk7XG4gICAgICAgICQocGFyZW50KS50cmlnZ2VyKGhpZGVFdmVudCk7XG4gICAgICAgIGlmIChoaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRvZ2dsZXNbaV0uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgJChwYXJlbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKS50cmlnZ2VyKCQuRXZlbnQoRXZlbnQuSElEREVOLCByZWxhdGVkVGFyZ2V0KSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIERyb3Bkb3duLl9nZXRQYXJlbnRGcm9tRWxlbWVudCA9IGZ1bmN0aW9uIF9nZXRQYXJlbnRGcm9tRWxlbWVudChlbGVtZW50KSB7XG4gICAgICB2YXIgcGFyZW50ID0gdm9pZCAwO1xuICAgICAgdmFyIHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQpO1xuXG4gICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgcGFyZW50ID0gJChzZWxlY3RvcilbMF07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXJlbnQgfHwgZWxlbWVudC5wYXJlbnROb2RlO1xuICAgIH07XG5cbiAgICBEcm9wZG93bi5fZGF0YUFwaUtleWRvd25IYW5kbGVyID0gZnVuY3Rpb24gX2RhdGFBcGlLZXlkb3duSGFuZGxlcihldmVudCkge1xuICAgICAgaWYgKCEvKDM4fDQwfDI3fDMyKS8udGVzdChldmVudC53aGljaCkgfHwgL2lucHV0fHRleHRhcmVhL2kudGVzdChldmVudC50YXJnZXQudGFnTmFtZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICQodGhpcykuaGFzQ2xhc3MoQ2xhc3NOYW1lLkRJU0FCTEVEKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBwYXJlbnQgPSBEcm9wZG93bi5fZ2V0UGFyZW50RnJvbUVsZW1lbnQodGhpcyk7XG4gICAgICB2YXIgaXNBY3RpdmUgPSAkKHBhcmVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpO1xuXG4gICAgICBpZiAoIWlzQWN0aXZlICYmIGV2ZW50LndoaWNoICE9PSBFU0NBUEVfS0VZQ09ERSB8fCBpc0FjdGl2ZSAmJiBldmVudC53aGljaCA9PT0gRVNDQVBFX0tFWUNPREUpIHtcblxuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IEVTQ0FQRV9LRVlDT0RFKSB7XG4gICAgICAgICAgdmFyIHRvZ2dsZSA9ICQocGFyZW50KS5maW5kKFNlbGVjdG9yLkRBVEFfVE9HR0xFKVswXTtcbiAgICAgICAgICAkKHRvZ2dsZSkudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQodGhpcykudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgaXRlbXMgPSAkKHBhcmVudCkuZmluZChTZWxlY3Rvci5WSVNJQkxFX0lURU1TKS5nZXQoKTtcblxuICAgICAgaWYgKCFpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgaW5kZXggPSBpdGVtcy5pbmRleE9mKGV2ZW50LnRhcmdldCk7XG5cbiAgICAgIGlmIChldmVudC53aGljaCA9PT0gQVJST1dfVVBfS0VZQ09ERSAmJiBpbmRleCA+IDApIHtcbiAgICAgICAgLy8gdXBcbiAgICAgICAgaW5kZXgtLTtcbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50LndoaWNoID09PSBBUlJPV19ET1dOX0tFWUNPREUgJiYgaW5kZXggPCBpdGVtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgIC8vIGRvd25cbiAgICAgICAgaW5kZXgrKztcbiAgICAgIH1cblxuICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICBpbmRleCA9IDA7XG4gICAgICB9XG5cbiAgICAgIGl0ZW1zW2luZGV4XS5mb2N1cygpO1xuICAgIH07XG5cbiAgICBfY3JlYXRlQ2xhc3MoRHJvcGRvd24sIG51bGwsIFt7XG4gICAgICBrZXk6ICdWRVJTSU9OJyxcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gVkVSU0lPTjtcbiAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gRHJvcGRvd247XG4gIH0oKTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkKGRvY3VtZW50KS5vbihFdmVudC5LRVlET1dOX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgRHJvcGRvd24uX2RhdGFBcGlLZXlkb3duSGFuZGxlcikub24oRXZlbnQuS0VZRE9XTl9EQVRBX0FQSSwgU2VsZWN0b3IuUk9MRV9NRU5VLCBEcm9wZG93bi5fZGF0YUFwaUtleWRvd25IYW5kbGVyKS5vbihFdmVudC5LRVlET1dOX0RBVEFfQVBJLCBTZWxlY3Rvci5ST0xFX0xJU1RCT1gsIERyb3Bkb3duLl9kYXRhQXBpS2V5ZG93bkhhbmRsZXIpLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJICsgJyAnICsgRXZlbnQuRk9DVVNJTl9EQVRBX0FQSSwgRHJvcGRvd24uX2NsZWFyTWVudXMpLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgRHJvcGRvd24ucHJvdG90eXBlLnRvZ2dsZSkub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkZPUk1fQ0hJTEQsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBqUXVlcnlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQuZm5bTkFNRV0gPSBEcm9wZG93bi5falF1ZXJ5SW50ZXJmYWNlO1xuICAkLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gRHJvcGRvd247XG4gICQuZm5bTkFNRV0ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUO1xuICAgIHJldHVybiBEcm9wZG93bi5falF1ZXJ5SW50ZXJmYWNlO1xuICB9O1xuXG4gIHJldHVybiBEcm9wZG93bjtcbn0oalF1ZXJ5KTtcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4wLjAtYWxwaGEuNik6IG1vZGFsLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG52YXIgTW9kYWwgPSBmdW5jdGlvbiAoJCkge1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ29uc3RhbnRzXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICB2YXIgTkFNRSA9ICdtb2RhbCc7XG4gIHZhciBWRVJTSU9OID0gJzQuMC4wLWFscGhhLjYnO1xuICB2YXIgREFUQV9LRVkgPSAnYnMubW9kYWwnO1xuICB2YXIgRVZFTlRfS0VZID0gJy4nICsgREFUQV9LRVk7XG4gIHZhciBEQVRBX0FQSV9LRVkgPSAnLmRhdGEtYXBpJztcbiAgdmFyIEpRVUVSWV9OT19DT05GTElDVCA9ICQuZm5bTkFNRV07XG4gIHZhciBUUkFOU0lUSU9OX0RVUkFUSU9OID0gMzAwO1xuICB2YXIgQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTiA9IDE1MDtcbiAgdmFyIEVTQ0FQRV9LRVlDT0RFID0gMjc7IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIEVzY2FwZSAoRXNjKSBrZXlcblxuICB2YXIgRGVmYXVsdCA9IHtcbiAgICBiYWNrZHJvcDogdHJ1ZSxcbiAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICBmb2N1czogdHJ1ZSxcbiAgICBzaG93OiB0cnVlXG4gIH07XG5cbiAgdmFyIERlZmF1bHRUeXBlID0ge1xuICAgIGJhY2tkcm9wOiAnKGJvb2xlYW58c3RyaW5nKScsXG4gICAga2V5Ym9hcmQ6ICdib29sZWFuJyxcbiAgICBmb2N1czogJ2Jvb2xlYW4nLFxuICAgIHNob3c6ICdib29sZWFuJ1xuICB9O1xuXG4gIHZhciBFdmVudCA9IHtcbiAgICBISURFOiAnaGlkZScgKyBFVkVOVF9LRVksXG4gICAgSElEREVOOiAnaGlkZGVuJyArIEVWRU5UX0tFWSxcbiAgICBTSE9XOiAnc2hvdycgKyBFVkVOVF9LRVksXG4gICAgU0hPV046ICdzaG93bicgKyBFVkVOVF9LRVksXG4gICAgRk9DVVNJTjogJ2ZvY3VzaW4nICsgRVZFTlRfS0VZLFxuICAgIFJFU0laRTogJ3Jlc2l6ZScgKyBFVkVOVF9LRVksXG4gICAgQ0xJQ0tfRElTTUlTUzogJ2NsaWNrLmRpc21pc3MnICsgRVZFTlRfS0VZLFxuICAgIEtFWURPV05fRElTTUlTUzogJ2tleWRvd24uZGlzbWlzcycgKyBFVkVOVF9LRVksXG4gICAgTU9VU0VVUF9ESVNNSVNTOiAnbW91c2V1cC5kaXNtaXNzJyArIEVWRU5UX0tFWSxcbiAgICBNT1VTRURPV05fRElTTUlTUzogJ21vdXNlZG93bi5kaXNtaXNzJyArIEVWRU5UX0tFWSxcbiAgICBDTElDS19EQVRBX0FQSTogJ2NsaWNrJyArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWVxuICB9O1xuXG4gIHZhciBDbGFzc05hbWUgPSB7XG4gICAgU0NST0xMQkFSX01FQVNVUkVSOiAnbW9kYWwtc2Nyb2xsYmFyLW1lYXN1cmUnLFxuICAgIEJBQ0tEUk9QOiAnbW9kYWwtYmFja2Ryb3AnLFxuICAgIE9QRU46ICdtb2RhbC1vcGVuJyxcbiAgICBGQURFOiAnZmFkZScsXG4gICAgU0hPVzogJ3Nob3cnXG4gIH07XG5cbiAgdmFyIFNlbGVjdG9yID0ge1xuICAgIERJQUxPRzogJy5tb2RhbC1kaWFsb2cnLFxuICAgIERBVEFfVE9HR0xFOiAnW2RhdGEtdG9nZ2xlPVwibW9kYWxcIl0nLFxuICAgIERBVEFfRElTTUlTUzogJ1tkYXRhLWRpc21pc3M9XCJtb2RhbFwiXScsXG4gICAgRklYRURfQ09OVEVOVDogJy5maXhlZC10b3AsIC5maXhlZC1ib3R0b20sIC5pcy1maXhlZCwgLnN0aWNreS10b3AnXG4gIH07XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICB2YXIgTW9kYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTW9kYWwoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTW9kYWwpO1xuXG4gICAgICB0aGlzLl9jb25maWcgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKTtcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgdGhpcy5fZGlhbG9nID0gJChlbGVtZW50KS5maW5kKFNlbGVjdG9yLkRJQUxPRylbMF07XG4gICAgICB0aGlzLl9iYWNrZHJvcCA9IG51bGw7XG4gICAgICB0aGlzLl9pc1Nob3duID0gZmFsc2U7XG4gICAgICB0aGlzLl9pc0JvZHlPdmVyZmxvd2luZyA9IGZhbHNlO1xuICAgICAgdGhpcy5faWdub3JlQmFja2Ryb3BDbGljayA9IGZhbHNlO1xuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLl9vcmlnaW5hbEJvZHlQYWRkaW5nID0gMDtcbiAgICAgIHRoaXMuX3Njcm9sbGJhcldpZHRoID0gMDtcbiAgICB9XG5cbiAgICAvLyBnZXR0ZXJzXG5cbiAgICAvLyBwdWJsaWNcblxuICAgIE1vZGFsLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiB0b2dnbGUocmVsYXRlZFRhcmdldCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2lzU2hvd24gPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdyhyZWxhdGVkVGFyZ2V0KTtcbiAgICB9O1xuXG4gICAgTW9kYWwucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiBzaG93KHJlbGF0ZWRUYXJnZXQpIHtcbiAgICAgIHZhciBfdGhpczkgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kYWwgaXMgdHJhbnNpdGlvbmluZycpO1xuICAgICAgfVxuXG4gICAgICBpZiAoVXRpbC5zdXBwb3J0c1RyYW5zaXRpb25FbmQoKSAmJiAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKSkge1xuICAgICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSB0cnVlO1xuICAgICAgfVxuICAgICAgdmFyIHNob3dFdmVudCA9ICQuRXZlbnQoRXZlbnQuU0hPVywge1xuICAgICAgICByZWxhdGVkVGFyZ2V0OiByZWxhdGVkVGFyZ2V0XG4gICAgICB9KTtcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHNob3dFdmVudCk7XG5cbiAgICAgIGlmICh0aGlzLl9pc1Nob3duIHx8IHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2lzU2hvd24gPSB0cnVlO1xuXG4gICAgICB0aGlzLl9jaGVja1Njcm9sbGJhcigpO1xuICAgICAgdGhpcy5fc2V0U2Nyb2xsYmFyKCk7XG5cbiAgICAgICQoZG9jdW1lbnQuYm9keSkuYWRkQ2xhc3MoQ2xhc3NOYW1lLk9QRU4pO1xuXG4gICAgICB0aGlzLl9zZXRFc2NhcGVFdmVudCgpO1xuICAgICAgdGhpcy5fc2V0UmVzaXplRXZlbnQoKTtcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KS5vbihFdmVudC5DTElDS19ESVNNSVNTLCBTZWxlY3Rvci5EQVRBX0RJU01JU1MsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZXR1cm4gX3RoaXM5LmhpZGUoZXZlbnQpO1xuICAgICAgfSk7XG5cbiAgICAgICQodGhpcy5fZGlhbG9nKS5vbihFdmVudC5NT1VTRURPV05fRElTTUlTUywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKF90aGlzOS5fZWxlbWVudCkub25lKEV2ZW50Lk1PVVNFVVBfRElTTUlTUywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5pcyhfdGhpczkuX2VsZW1lbnQpKSB7XG4gICAgICAgICAgICBfdGhpczkuX2lnbm9yZUJhY2tkcm9wQ2xpY2sgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fc2hvd0JhY2tkcm9wKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzOS5fc2hvd0VsZW1lbnQocmVsYXRlZFRhcmdldCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgTW9kYWwucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiBoaWRlKGV2ZW50KSB7XG4gICAgICB2YXIgX3RoaXMxMCA9IHRoaXM7XG5cbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kYWwgaXMgdHJhbnNpdGlvbmluZycpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdHJhbnNpdGlvbiA9IFV0aWwuc3VwcG9ydHNUcmFuc2l0aW9uRW5kKCkgJiYgJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSk7XG4gICAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgaGlkZUV2ZW50ID0gJC5FdmVudChFdmVudC5ISURFKTtcbiAgICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihoaWRlRXZlbnQpO1xuXG4gICAgICBpZiAoIXRoaXMuX2lzU2hvd24gfHwgaGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5faXNTaG93biA9IGZhbHNlO1xuXG4gICAgICB0aGlzLl9zZXRFc2NhcGVFdmVudCgpO1xuICAgICAgdGhpcy5fc2V0UmVzaXplRXZlbnQoKTtcblxuICAgICAgJChkb2N1bWVudCkub2ZmKEV2ZW50LkZPQ1VTSU4pO1xuXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKTtcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KS5vZmYoRXZlbnQuQ0xJQ0tfRElTTUlTUyk7XG4gICAgICAkKHRoaXMuX2RpYWxvZykub2ZmKEV2ZW50Lk1PVVNFRE9XTl9ESVNNSVNTKTtcblxuICAgICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KS5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMTAuX2hpZGVNb2RhbChldmVudCk7XG4gICAgICAgIH0pLmVtdWxhdGVUcmFuc2l0aW9uRW5kKFRSQU5TSVRJT05fRFVSQVRJT04pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5faGlkZU1vZGFsKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIE1vZGFsLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSk7XG5cbiAgICAgICQod2luZG93LCBkb2N1bWVudCwgdGhpcy5fZWxlbWVudCwgdGhpcy5fYmFja2Ryb3ApLm9mZihFVkVOVF9LRVkpO1xuXG4gICAgICB0aGlzLl9jb25maWcgPSBudWxsO1xuICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgICB0aGlzLl9kaWFsb2cgPSBudWxsO1xuICAgICAgdGhpcy5fYmFja2Ryb3AgPSBudWxsO1xuICAgICAgdGhpcy5faXNTaG93biA9IG51bGw7XG4gICAgICB0aGlzLl9pc0JvZHlPdmVyZmxvd2luZyA9IG51bGw7XG4gICAgICB0aGlzLl9pZ25vcmVCYWNrZHJvcENsaWNrID0gbnVsbDtcbiAgICAgIHRoaXMuX29yaWdpbmFsQm9keVBhZGRpbmcgPSBudWxsO1xuICAgICAgdGhpcy5fc2Nyb2xsYmFyV2lkdGggPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBwcml2YXRlXG5cbiAgICBNb2RhbC5wcm90b3R5cGUuX2dldENvbmZpZyA9IGZ1bmN0aW9uIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgICBjb25maWcgPSAkLmV4dGVuZCh7fSwgRGVmYXVsdCwgY29uZmlnKTtcbiAgICAgIFV0aWwudHlwZUNoZWNrQ29uZmlnKE5BTUUsIGNvbmZpZywgRGVmYXVsdFR5cGUpO1xuICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9O1xuXG4gICAgTW9kYWwucHJvdG90eXBlLl9zaG93RWxlbWVudCA9IGZ1bmN0aW9uIF9zaG93RWxlbWVudChyZWxhdGVkVGFyZ2V0KSB7XG4gICAgICB2YXIgX3RoaXMxMSA9IHRoaXM7XG5cbiAgICAgIHZhciB0cmFuc2l0aW9uID0gVXRpbC5zdXBwb3J0c1RyYW5zaXRpb25FbmQoKSAmJiAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKTtcblxuICAgICAgaWYgKCF0aGlzLl9lbGVtZW50LnBhcmVudE5vZGUgfHwgdGhpcy5fZWxlbWVudC5wYXJlbnROb2RlLm5vZGVUeXBlICE9PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICAvLyBkb24ndCBtb3ZlIG1vZGFscyBkb20gcG9zaXRpb25cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9lbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xuICAgICAgdGhpcy5fZWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuXG4gICAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgICBVdGlsLnJlZmxvdyh0aGlzLl9lbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgJCh0aGlzLl9lbGVtZW50KS5hZGRDbGFzcyhDbGFzc05hbWUuU0hPVyk7XG5cbiAgICAgIGlmICh0aGlzLl9jb25maWcuZm9jdXMpIHtcbiAgICAgICAgdGhpcy5fZW5mb3JjZUZvY3VzKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBzaG93bkV2ZW50ID0gJC5FdmVudChFdmVudC5TSE9XTiwge1xuICAgICAgICByZWxhdGVkVGFyZ2V0OiByZWxhdGVkVGFyZ2V0XG4gICAgICB9KTtcblxuICAgICAgdmFyIHRyYW5zaXRpb25Db21wbGV0ZSA9IGZ1bmN0aW9uIHRyYW5zaXRpb25Db21wbGV0ZSgpIHtcbiAgICAgICAgaWYgKF90aGlzMTEuX2NvbmZpZy5mb2N1cykge1xuICAgICAgICAgIF90aGlzMTEuX2VsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICBfdGhpczExLl9pc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcbiAgICAgICAgJChfdGhpczExLl9lbGVtZW50KS50cmlnZ2VyKHNob3duRXZlbnQpO1xuICAgICAgfTtcblxuICAgICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgICAgJCh0aGlzLl9kaWFsb2cpLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCB0cmFuc2l0aW9uQ29tcGxldGUpLmVtdWxhdGVUcmFuc2l0aW9uRW5kKFRSQU5TSVRJT05fRFVSQVRJT04pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJhbnNpdGlvbkNvbXBsZXRlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIE1vZGFsLnByb3RvdHlwZS5fZW5mb3JjZUZvY3VzID0gZnVuY3Rpb24gX2VuZm9yY2VGb2N1cygpIHtcbiAgICAgIHZhciBfdGhpczEyID0gdGhpcztcblxuICAgICAgJChkb2N1bWVudCkub2ZmKEV2ZW50LkZPQ1VTSU4pIC8vIGd1YXJkIGFnYWluc3QgaW5maW5pdGUgZm9jdXMgbG9vcFxuICAgICAgLm9uKEV2ZW50LkZPQ1VTSU4sIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoZG9jdW1lbnQgIT09IGV2ZW50LnRhcmdldCAmJiBfdGhpczEyLl9lbGVtZW50ICE9PSBldmVudC50YXJnZXQgJiYgISQoX3RoaXMxMi5fZWxlbWVudCkuaGFzKGV2ZW50LnRhcmdldCkubGVuZ3RoKSB7XG4gICAgICAgICAgX3RoaXMxMi5fZWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgTW9kYWwucHJvdG90eXBlLl9zZXRFc2NhcGVFdmVudCA9IGZ1bmN0aW9uIF9zZXRFc2NhcGVFdmVudCgpIHtcbiAgICAgIHZhciBfdGhpczEzID0gdGhpcztcblxuICAgICAgaWYgKHRoaXMuX2lzU2hvd24gJiYgdGhpcy5fY29uZmlnLmtleWJvYXJkKSB7XG4gICAgICAgICQodGhpcy5fZWxlbWVudCkub24oRXZlbnQuS0VZRE9XTl9ESVNNSVNTLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IEVTQ0FQRV9LRVlDT0RFKSB7XG4gICAgICAgICAgICBfdGhpczEzLmhpZGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICghdGhpcy5faXNTaG93bikge1xuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLm9mZihFdmVudC5LRVlET1dOX0RJU01JU1MpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBNb2RhbC5wcm90b3R5cGUuX3NldFJlc2l6ZUV2ZW50ID0gZnVuY3Rpb24gX3NldFJlc2l6ZUV2ZW50KCkge1xuICAgICAgdmFyIF90aGlzMTQgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5faXNTaG93bikge1xuICAgICAgICAkKHdpbmRvdykub24oRXZlbnQuUkVTSVpFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMxNC5faGFuZGxlVXBkYXRlKGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHdpbmRvdykub2ZmKEV2ZW50LlJFU0laRSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIE1vZGFsLnByb3RvdHlwZS5faGlkZU1vZGFsID0gZnVuY3Rpb24gX2hpZGVNb2RhbCgpIHtcbiAgICAgIHZhciBfdGhpczE1ID0gdGhpcztcblxuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5fc2hvd0JhY2tkcm9wKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJChkb2N1bWVudC5ib2R5KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuT1BFTik7XG4gICAgICAgIF90aGlzMTUuX3Jlc2V0QWRqdXN0bWVudHMoKTtcbiAgICAgICAgX3RoaXMxNS5fcmVzZXRTY3JvbGxiYXIoKTtcbiAgICAgICAgJChfdGhpczE1Ll9lbGVtZW50KS50cmlnZ2VyKEV2ZW50LkhJRERFTik7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgTW9kYWwucHJvdG90eXBlLl9yZW1vdmVCYWNrZHJvcCA9IGZ1bmN0aW9uIF9yZW1vdmVCYWNrZHJvcCgpIHtcbiAgICAgIGlmICh0aGlzLl9iYWNrZHJvcCkge1xuICAgICAgICAkKHRoaXMuX2JhY2tkcm9wKS5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5fYmFja2Ryb3AgPSBudWxsO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBNb2RhbC5wcm90b3R5cGUuX3Nob3dCYWNrZHJvcCA9IGZ1bmN0aW9uIF9zaG93QmFja2Ryb3AoY2FsbGJhY2spIHtcbiAgICAgIHZhciBfdGhpczE2ID0gdGhpcztcblxuICAgICAgdmFyIGFuaW1hdGUgPSAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKSA/IENsYXNzTmFtZS5GQURFIDogJyc7XG5cbiAgICAgIGlmICh0aGlzLl9pc1Nob3duICYmIHRoaXMuX2NvbmZpZy5iYWNrZHJvcCkge1xuICAgICAgICB2YXIgZG9BbmltYXRlID0gVXRpbC5zdXBwb3J0c1RyYW5zaXRpb25FbmQoKSAmJiBhbmltYXRlO1xuXG4gICAgICAgIHRoaXMuX2JhY2tkcm9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuX2JhY2tkcm9wLmNsYXNzTmFtZSA9IENsYXNzTmFtZS5CQUNLRFJPUDtcblxuICAgICAgICBpZiAoYW5pbWF0ZSkge1xuICAgICAgICAgICQodGhpcy5fYmFja2Ryb3ApLmFkZENsYXNzKGFuaW1hdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCh0aGlzLl9iYWNrZHJvcCkuYXBwZW5kVG8oZG9jdW1lbnQuYm9keSk7XG5cbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KS5vbihFdmVudC5DTElDS19ESVNNSVNTLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBpZiAoX3RoaXMxNi5faWdub3JlQmFja2Ryb3BDbGljaykge1xuICAgICAgICAgICAgX3RoaXMxNi5faWdub3JlQmFja2Ryb3BDbGljayA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ICE9PSBldmVudC5jdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChfdGhpczE2Ll9jb25maWcuYmFja2Ryb3AgPT09ICdzdGF0aWMnKSB7XG4gICAgICAgICAgICBfdGhpczE2Ll9lbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzMTYuaGlkZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRvQW5pbWF0ZSkge1xuICAgICAgICAgIFV0aWwucmVmbG93KHRoaXMuX2JhY2tkcm9wKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQodGhpcy5fYmFja2Ryb3ApLmFkZENsYXNzKENsYXNzTmFtZS5TSE9XKTtcblxuICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkb0FuaW1hdGUpIHtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICQodGhpcy5fYmFja2Ryb3ApLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjYWxsYmFjaykuZW11bGF0ZVRyYW5zaXRpb25FbmQoQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTik7XG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLl9pc1Nob3duICYmIHRoaXMuX2JhY2tkcm9wKSB7XG4gICAgICAgICQodGhpcy5fYmFja2Ryb3ApLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKTtcblxuICAgICAgICB2YXIgY2FsbGJhY2tSZW1vdmUgPSBmdW5jdGlvbiBjYWxsYmFja1JlbW92ZSgpIHtcbiAgICAgICAgICBfdGhpczE2Ll9yZW1vdmVCYWNrZHJvcCgpO1xuICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKFV0aWwuc3VwcG9ydHNUcmFuc2l0aW9uRW5kKCkgJiYgJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgICAgICAkKHRoaXMuX2JhY2tkcm9wKS5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgY2FsbGJhY2tSZW1vdmUpLmVtdWxhdGVUcmFuc2l0aW9uRW5kKEJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT04pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhbGxiYWNrUmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIHRoZSBmb2xsb3dpbmcgbWV0aG9kcyBhcmUgdXNlZCB0byBoYW5kbGUgb3ZlcmZsb3dpbmcgbW9kYWxzXG4gICAgLy8gdG9kbyAoZmF0KTogdGhlc2Ugc2hvdWxkIHByb2JhYmx5IGJlIHJlZmFjdG9yZWQgb3V0IG9mIG1vZGFsLmpzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgTW9kYWwucHJvdG90eXBlLl9oYW5kbGVVcGRhdGUgPSBmdW5jdGlvbiBfaGFuZGxlVXBkYXRlKCkge1xuICAgICAgdGhpcy5fYWRqdXN0RGlhbG9nKCk7XG4gICAgfTtcblxuICAgIE1vZGFsLnByb3RvdHlwZS5fYWRqdXN0RGlhbG9nID0gZnVuY3Rpb24gX2FkanVzdERpYWxvZygpIHtcbiAgICAgIHZhciBpc01vZGFsT3ZlcmZsb3dpbmcgPSB0aGlzLl9lbGVtZW50LnNjcm9sbEhlaWdodCA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cbiAgICAgIGlmICghdGhpcy5faXNCb2R5T3ZlcmZsb3dpbmcgJiYgaXNNb2RhbE92ZXJmbG93aW5nKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUucGFkZGluZ0xlZnQgPSB0aGlzLl9zY3JvbGxiYXJXaWR0aCArICdweCc7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9pc0JvZHlPdmVyZmxvd2luZyAmJiAhaXNNb2RhbE92ZXJmbG93aW5nKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gdGhpcy5fc2Nyb2xsYmFyV2lkdGggKyAncHgnO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBNb2RhbC5wcm90b3R5cGUuX3Jlc2V0QWRqdXN0bWVudHMgPSBmdW5jdGlvbiBfcmVzZXRBZGp1c3RtZW50cygpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUucGFkZGluZ0xlZnQgPSAnJztcbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gJyc7XG4gICAgfTtcblxuICAgIE1vZGFsLnByb3RvdHlwZS5fY2hlY2tTY3JvbGxiYXIgPSBmdW5jdGlvbiBfY2hlY2tTY3JvbGxiYXIoKSB7XG4gICAgICB0aGlzLl9pc0JvZHlPdmVyZmxvd2luZyA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggPCB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgIHRoaXMuX3Njcm9sbGJhcldpZHRoID0gdGhpcy5fZ2V0U2Nyb2xsYmFyV2lkdGgoKTtcbiAgICB9O1xuXG4gICAgTW9kYWwucHJvdG90eXBlLl9zZXRTY3JvbGxiYXIgPSBmdW5jdGlvbiBfc2V0U2Nyb2xsYmFyKCkge1xuICAgICAgdmFyIGJvZHlQYWRkaW5nID0gcGFyc2VJbnQoJChTZWxlY3Rvci5GSVhFRF9DT05URU5UKS5jc3MoJ3BhZGRpbmctcmlnaHQnKSB8fCAwLCAxMCk7XG5cbiAgICAgIHRoaXMuX29yaWdpbmFsQm9keVBhZGRpbmcgPSBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCB8fCAnJztcblxuICAgICAgaWYgKHRoaXMuX2lzQm9keU92ZXJmbG93aW5nKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gYm9keVBhZGRpbmcgKyB0aGlzLl9zY3JvbGxiYXJXaWR0aCArICdweCc7XG4gICAgICB9XG4gICAgfTtcblxuICAgIE1vZGFsLnByb3RvdHlwZS5fcmVzZXRTY3JvbGxiYXIgPSBmdW5jdGlvbiBfcmVzZXRTY3JvbGxiYXIoKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IHRoaXMuX29yaWdpbmFsQm9keVBhZGRpbmc7XG4gICAgfTtcblxuICAgIE1vZGFsLnByb3RvdHlwZS5fZ2V0U2Nyb2xsYmFyV2lkdGggPSBmdW5jdGlvbiBfZ2V0U2Nyb2xsYmFyV2lkdGgoKSB7XG4gICAgICAvLyB0aHggZC53YWxzaFxuICAgICAgdmFyIHNjcm9sbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgc2Nyb2xsRGl2LmNsYXNzTmFtZSA9IENsYXNzTmFtZS5TQ1JPTExCQVJfTUVBU1VSRVI7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcm9sbERpdik7XG4gICAgICB2YXIgc2Nyb2xsYmFyV2lkdGggPSBzY3JvbGxEaXYub2Zmc2V0V2lkdGggLSBzY3JvbGxEaXYuY2xpZW50V2lkdGg7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHNjcm9sbERpdik7XG4gICAgICByZXR1cm4gc2Nyb2xsYmFyV2lkdGg7XG4gICAgfTtcblxuICAgIC8vIHN0YXRpY1xuXG4gICAgTW9kYWwuX2pRdWVyeUludGVyZmFjZSA9IGZ1bmN0aW9uIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnLCByZWxhdGVkVGFyZ2V0KSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRhdGEgPSAkKHRoaXMpLmRhdGEoREFUQV9LRVkpO1xuICAgICAgICB2YXIgX2NvbmZpZyA9ICQuZXh0ZW5kKHt9LCBNb2RhbC5EZWZhdWx0LCAkKHRoaXMpLmRhdGEoKSwgKHR5cGVvZiBjb25maWcgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGNvbmZpZykpID09PSAnb2JqZWN0JyAmJiBjb25maWcpO1xuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBuZXcgTW9kYWwodGhpcywgX2NvbmZpZyk7XG4gICAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmIChkYXRhW2NvbmZpZ10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBtZXRob2QgbmFtZWQgXCInICsgY29uZmlnICsgJ1wiJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFbY29uZmlnXShyZWxhdGVkVGFyZ2V0KTtcbiAgICAgICAgfSBlbHNlIGlmIChfY29uZmlnLnNob3cpIHtcbiAgICAgICAgICBkYXRhLnNob3cocmVsYXRlZFRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfY3JlYXRlQ2xhc3MoTW9kYWwsIG51bGwsIFt7XG4gICAgICBrZXk6ICdWRVJTSU9OJyxcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gVkVSU0lPTjtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdEZWZhdWx0JyxcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gRGVmYXVsdDtcbiAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gTW9kYWw7XG4gIH0oKTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkKGRvY3VtZW50KS5vbihFdmVudC5DTElDS19EQVRBX0FQSSwgU2VsZWN0b3IuREFUQV9UT0dHTEUsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBfdGhpczE3ID0gdGhpcztcblxuICAgIHZhciB0YXJnZXQgPSB2b2lkIDA7XG4gICAgdmFyIHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KHRoaXMpO1xuXG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICB0YXJnZXQgPSAkKHNlbGVjdG9yKVswXTtcbiAgICB9XG5cbiAgICB2YXIgY29uZmlnID0gJCh0YXJnZXQpLmRhdGEoREFUQV9LRVkpID8gJ3RvZ2dsZScgOiAkLmV4dGVuZCh7fSwgJCh0YXJnZXQpLmRhdGEoKSwgJCh0aGlzKS5kYXRhKCkpO1xuXG4gICAgaWYgKHRoaXMudGFnTmFtZSA9PT0gJ0EnIHx8IHRoaXMudGFnTmFtZSA9PT0gJ0FSRUEnKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHZhciAkdGFyZ2V0ID0gJCh0YXJnZXQpLm9uZShFdmVudC5TSE9XLCBmdW5jdGlvbiAoc2hvd0V2ZW50KSB7XG4gICAgICBpZiAoc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIC8vIG9ubHkgcmVnaXN0ZXIgZm9jdXMgcmVzdG9yZXIgaWYgbW9kYWwgd2lsbCBhY3R1YWxseSBnZXQgc2hvd25cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAkdGFyZ2V0Lm9uZShFdmVudC5ISURERU4sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCQoX3RoaXMxNykuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgICBfdGhpczE3LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgTW9kYWwuX2pRdWVyeUludGVyZmFjZS5jYWxsKCQodGFyZ2V0KSwgY29uZmlnLCB0aGlzKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBqUXVlcnlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQuZm5bTkFNRV0gPSBNb2RhbC5falF1ZXJ5SW50ZXJmYWNlO1xuICAkLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gTW9kYWw7XG4gICQuZm5bTkFNRV0ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUO1xuICAgIHJldHVybiBNb2RhbC5falF1ZXJ5SW50ZXJmYWNlO1xuICB9O1xuXG4gIHJldHVybiBNb2RhbDtcbn0oalF1ZXJ5KTtcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4wLjAtYWxwaGEuNik6IHNjcm9sbHNweS5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxudmFyIFNjcm9sbFNweSA9IGZ1bmN0aW9uICgkKSB7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDb25zdGFudHNcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIHZhciBOQU1FID0gJ3Njcm9sbHNweSc7XG4gIHZhciBWRVJTSU9OID0gJzQuMC4wLWFscGhhLjYnO1xuICB2YXIgREFUQV9LRVkgPSAnYnMuc2Nyb2xsc3B5JztcbiAgdmFyIEVWRU5UX0tFWSA9ICcuJyArIERBVEFfS0VZO1xuICB2YXIgREFUQV9BUElfS0VZID0gJy5kYXRhLWFwaSc7XG4gIHZhciBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkLmZuW05BTUVdO1xuXG4gIHZhciBEZWZhdWx0ID0ge1xuICAgIG9mZnNldDogMTAsXG4gICAgbWV0aG9kOiAnYXV0bycsXG4gICAgdGFyZ2V0OiAnJ1xuICB9O1xuXG4gIHZhciBEZWZhdWx0VHlwZSA9IHtcbiAgICBvZmZzZXQ6ICdudW1iZXInLFxuICAgIG1ldGhvZDogJ3N0cmluZycsXG4gICAgdGFyZ2V0OiAnKHN0cmluZ3xlbGVtZW50KSdcbiAgfTtcblxuICB2YXIgRXZlbnQgPSB7XG4gICAgQUNUSVZBVEU6ICdhY3RpdmF0ZScgKyBFVkVOVF9LRVksXG4gICAgU0NST0xMOiAnc2Nyb2xsJyArIEVWRU5UX0tFWSxcbiAgICBMT0FEX0RBVEFfQVBJOiAnbG9hZCcgKyBFVkVOVF9LRVkgKyBEQVRBX0FQSV9LRVlcbiAgfTtcblxuICB2YXIgQ2xhc3NOYW1lID0ge1xuICAgIERST1BET1dOX0lURU06ICdkcm9wZG93bi1pdGVtJyxcbiAgICBEUk9QRE9XTl9NRU5VOiAnZHJvcGRvd24tbWVudScsXG4gICAgTkFWX0xJTks6ICduYXYtbGluaycsXG4gICAgTkFWOiAnbmF2JyxcbiAgICBBQ1RJVkU6ICdhY3RpdmUnXG4gIH07XG5cbiAgdmFyIFNlbGVjdG9yID0ge1xuICAgIERBVEFfU1BZOiAnW2RhdGEtc3B5PVwic2Nyb2xsXCJdJyxcbiAgICBBQ1RJVkU6ICcuYWN0aXZlJyxcbiAgICBMSVNUX0lURU06ICcubGlzdC1pdGVtJyxcbiAgICBMSTogJ2xpJyxcbiAgICBMSV9EUk9QRE9XTjogJ2xpLmRyb3Bkb3duJyxcbiAgICBOQVZfTElOS1M6ICcubmF2LWxpbmsnLFxuICAgIERST1BET1dOOiAnLmRyb3Bkb3duJyxcbiAgICBEUk9QRE9XTl9JVEVNUzogJy5kcm9wZG93bi1pdGVtJyxcbiAgICBEUk9QRE9XTl9UT0dHTEU6ICcuZHJvcGRvd24tdG9nZ2xlJ1xuICB9O1xuXG4gIHZhciBPZmZzZXRNZXRob2QgPSB7XG4gICAgT0ZGU0VUOiAnb2Zmc2V0JyxcbiAgICBQT1NJVElPTjogJ3Bvc2l0aW9uJ1xuICB9O1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIFNjcm9sbFNweSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTY3JvbGxTcHkoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICB2YXIgX3RoaXMxOCA9IHRoaXM7XG5cbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTY3JvbGxTcHkpO1xuXG4gICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgIHRoaXMuX3Njcm9sbEVsZW1lbnQgPSBlbGVtZW50LnRhZ05hbWUgPT09ICdCT0RZJyA/IHdpbmRvdyA6IGVsZW1lbnQ7XG4gICAgICB0aGlzLl9jb25maWcgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKTtcbiAgICAgIHRoaXMuX3NlbGVjdG9yID0gdGhpcy5fY29uZmlnLnRhcmdldCArICcgJyArIFNlbGVjdG9yLk5BVl9MSU5LUyArICcsJyArICh0aGlzLl9jb25maWcudGFyZ2V0ICsgJyAnICsgU2VsZWN0b3IuRFJPUERPV05fSVRFTVMpO1xuICAgICAgdGhpcy5fb2Zmc2V0cyA9IFtdO1xuICAgICAgdGhpcy5fdGFyZ2V0cyA9IFtdO1xuICAgICAgdGhpcy5fYWN0aXZlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIHRoaXMuX3Njcm9sbEhlaWdodCA9IDA7XG5cbiAgICAgICQodGhpcy5fc2Nyb2xsRWxlbWVudCkub24oRXZlbnQuU0NST0xMLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMTguX3Byb2Nlc3MoZXZlbnQpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgdGhpcy5fcHJvY2VzcygpO1xuICAgIH1cblxuICAgIC8vIGdldHRlcnNcblxuICAgIC8vIHB1YmxpY1xuXG4gICAgU2Nyb2xsU3B5LnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24gcmVmcmVzaCgpIHtcbiAgICAgIHZhciBfdGhpczE5ID0gdGhpcztcblxuICAgICAgdmFyIGF1dG9NZXRob2QgPSB0aGlzLl9zY3JvbGxFbGVtZW50ICE9PSB0aGlzLl9zY3JvbGxFbGVtZW50LndpbmRvdyA/IE9mZnNldE1ldGhvZC5QT1NJVElPTiA6IE9mZnNldE1ldGhvZC5PRkZTRVQ7XG5cbiAgICAgIHZhciBvZmZzZXRNZXRob2QgPSB0aGlzLl9jb25maWcubWV0aG9kID09PSAnYXV0bycgPyBhdXRvTWV0aG9kIDogdGhpcy5fY29uZmlnLm1ldGhvZDtcblxuICAgICAgdmFyIG9mZnNldEJhc2UgPSBvZmZzZXRNZXRob2QgPT09IE9mZnNldE1ldGhvZC5QT1NJVElPTiA/IHRoaXMuX2dldFNjcm9sbFRvcCgpIDogMDtcblxuICAgICAgdGhpcy5fb2Zmc2V0cyA9IFtdO1xuICAgICAgdGhpcy5fdGFyZ2V0cyA9IFtdO1xuXG4gICAgICB0aGlzLl9zY3JvbGxIZWlnaHQgPSB0aGlzLl9nZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgICAgdmFyIHRhcmdldHMgPSAkLm1ha2VBcnJheSgkKHRoaXMuX3NlbGVjdG9yKSk7XG5cbiAgICAgIHRhcmdldHMubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSB2b2lkIDA7XG4gICAgICAgIHZhciB0YXJnZXRTZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtZW50KTtcblxuICAgICAgICBpZiAodGFyZ2V0U2VsZWN0b3IpIHtcbiAgICAgICAgICB0YXJnZXQgPSAkKHRhcmdldFNlbGVjdG9yKVswXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0YXJnZXQgJiYgKHRhcmdldC5vZmZzZXRXaWR0aCB8fCB0YXJnZXQub2Zmc2V0SGVpZ2h0KSkge1xuICAgICAgICAgIC8vIHRvZG8gKGZhdCk6IHJlbW92ZSBza2V0Y2ggcmVsaWFuY2Ugb24galF1ZXJ5IHBvc2l0aW9uL29mZnNldFxuICAgICAgICAgIHJldHVybiBbJCh0YXJnZXQpW29mZnNldE1ldGhvZF0oKS50b3AgKyBvZmZzZXRCYXNlLCB0YXJnZXRTZWxlY3Rvcl07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9KS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhWzBdIC0gYlswXTtcbiAgICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgX3RoaXMxOS5fb2Zmc2V0cy5wdXNoKGl0ZW1bMF0pO1xuICAgICAgICBfdGhpczE5Ll90YXJnZXRzLnB1c2goaXRlbVsxXSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgU2Nyb2xsU3B5LnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSk7XG4gICAgICAkKHRoaXMuX3Njcm9sbEVsZW1lbnQpLm9mZihFVkVOVF9LRVkpO1xuXG4gICAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgICAgIHRoaXMuX3Njcm9sbEVsZW1lbnQgPSBudWxsO1xuICAgICAgdGhpcy5fY29uZmlnID0gbnVsbDtcbiAgICAgIHRoaXMuX3NlbGVjdG9yID0gbnVsbDtcbiAgICAgIHRoaXMuX29mZnNldHMgPSBudWxsO1xuICAgICAgdGhpcy5fdGFyZ2V0cyA9IG51bGw7XG4gICAgICB0aGlzLl9hY3RpdmVUYXJnZXQgPSBudWxsO1xuICAgICAgdGhpcy5fc2Nyb2xsSGVpZ2h0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gcHJpdmF0ZVxuXG4gICAgU2Nyb2xsU3B5LnByb3RvdHlwZS5fZ2V0Q29uZmlnID0gZnVuY3Rpb24gX2dldENvbmZpZyhjb25maWcpIHtcbiAgICAgIGNvbmZpZyA9ICQuZXh0ZW5kKHt9LCBEZWZhdWx0LCBjb25maWcpO1xuXG4gICAgICBpZiAodHlwZW9mIGNvbmZpZy50YXJnZXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBpZCA9ICQoY29uZmlnLnRhcmdldCkuYXR0cignaWQnKTtcbiAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgIGlkID0gVXRpbC5nZXRVSUQoTkFNRSk7XG4gICAgICAgICAgJChjb25maWcudGFyZ2V0KS5hdHRyKCdpZCcsIGlkKTtcbiAgICAgICAgfVxuICAgICAgICBjb25maWcudGFyZ2V0ID0gJyMnICsgaWQ7XG4gICAgICB9XG5cbiAgICAgIFV0aWwudHlwZUNoZWNrQ29uZmlnKE5BTUUsIGNvbmZpZywgRGVmYXVsdFR5cGUpO1xuXG4gICAgICByZXR1cm4gY29uZmlnO1xuICAgIH07XG5cbiAgICBTY3JvbGxTcHkucHJvdG90eXBlLl9nZXRTY3JvbGxUb3AgPSBmdW5jdGlvbiBfZ2V0U2Nyb2xsVG9wKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3Njcm9sbEVsZW1lbnQgPT09IHdpbmRvdyA/IHRoaXMuX3Njcm9sbEVsZW1lbnQucGFnZVlPZmZzZXQgOiB0aGlzLl9zY3JvbGxFbGVtZW50LnNjcm9sbFRvcDtcbiAgICB9O1xuXG4gICAgU2Nyb2xsU3B5LnByb3RvdHlwZS5fZ2V0U2Nyb2xsSGVpZ2h0ID0gZnVuY3Rpb24gX2dldFNjcm9sbEhlaWdodCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zY3JvbGxFbGVtZW50LnNjcm9sbEhlaWdodCB8fCBNYXRoLm1heChkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCk7XG4gICAgfTtcblxuICAgIFNjcm9sbFNweS5wcm90b3R5cGUuX2dldE9mZnNldEhlaWdodCA9IGZ1bmN0aW9uIF9nZXRPZmZzZXRIZWlnaHQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2Nyb2xsRWxlbWVudCA9PT0gd2luZG93ID8gd2luZG93LmlubmVySGVpZ2h0IDogdGhpcy5fc2Nyb2xsRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgfTtcblxuICAgIFNjcm9sbFNweS5wcm90b3R5cGUuX3Byb2Nlc3MgPSBmdW5jdGlvbiBfcHJvY2VzcygpIHtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSB0aGlzLl9nZXRTY3JvbGxUb3AoKSArIHRoaXMuX2NvbmZpZy5vZmZzZXQ7XG4gICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gdGhpcy5fZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgICB2YXIgbWF4U2Nyb2xsID0gdGhpcy5fY29uZmlnLm9mZnNldCArIHNjcm9sbEhlaWdodCAtIHRoaXMuX2dldE9mZnNldEhlaWdodCgpO1xuXG4gICAgICBpZiAodGhpcy5fc2Nyb2xsSGVpZ2h0ICE9PSBzY3JvbGxIZWlnaHQpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzY3JvbGxUb3AgPj0gbWF4U2Nyb2xsKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLl90YXJnZXRzW3RoaXMuX3RhcmdldHMubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZVRhcmdldCAhPT0gdGFyZ2V0KSB7XG4gICAgICAgICAgdGhpcy5fYWN0aXZhdGUodGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9hY3RpdmVUYXJnZXQgJiYgc2Nyb2xsVG9wIDwgdGhpcy5fb2Zmc2V0c1swXSAmJiB0aGlzLl9vZmZzZXRzWzBdID4gMCkge1xuICAgICAgICB0aGlzLl9hY3RpdmVUYXJnZXQgPSBudWxsO1xuICAgICAgICB0aGlzLl9jbGVhcigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLl9vZmZzZXRzLmxlbmd0aDsgaS0tOykge1xuICAgICAgICB2YXIgaXNBY3RpdmVUYXJnZXQgPSB0aGlzLl9hY3RpdmVUYXJnZXQgIT09IHRoaXMuX3RhcmdldHNbaV0gJiYgc2Nyb2xsVG9wID49IHRoaXMuX29mZnNldHNbaV0gJiYgKHRoaXMuX29mZnNldHNbaSArIDFdID09PSB1bmRlZmluZWQgfHwgc2Nyb2xsVG9wIDwgdGhpcy5fb2Zmc2V0c1tpICsgMV0pO1xuXG4gICAgICAgIGlmIChpc0FjdGl2ZVRhcmdldCkge1xuICAgICAgICAgIHRoaXMuX2FjdGl2YXRlKHRoaXMuX3RhcmdldHNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIFNjcm9sbFNweS5wcm90b3R5cGUuX2FjdGl2YXRlID0gZnVuY3Rpb24gX2FjdGl2YXRlKHRhcmdldCkge1xuICAgICAgdGhpcy5fYWN0aXZlVGFyZ2V0ID0gdGFyZ2V0O1xuXG4gICAgICB0aGlzLl9jbGVhcigpO1xuXG4gICAgICB2YXIgcXVlcmllcyA9IHRoaXMuX3NlbGVjdG9yLnNwbGl0KCcsJyk7XG4gICAgICBxdWVyaWVzID0gcXVlcmllcy5tYXAoZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3RvciArICdbZGF0YS10YXJnZXQ9XCInICsgdGFyZ2V0ICsgJ1wiXSwnICsgKHNlbGVjdG9yICsgJ1tocmVmPVwiJyArIHRhcmdldCArICdcIl0nKTtcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgJGxpbmsgPSAkKHF1ZXJpZXMuam9pbignLCcpKTtcblxuICAgICAgaWYgKCRsaW5rLmhhc0NsYXNzKENsYXNzTmFtZS5EUk9QRE9XTl9JVEVNKSkge1xuICAgICAgICAkbGluay5jbG9zZXN0KFNlbGVjdG9yLkRST1BET1dOKS5maW5kKFNlbGVjdG9yLkRST1BET1dOX1RPR0dMRSkuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7XG4gICAgICAgICRsaW5rLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdG9kbyAoZmF0KSB0aGlzIGlzIGtpbmRhIHN1cy4uLlxuICAgICAgICAvLyByZWN1cnNpdmVseSBhZGQgYWN0aXZlcyB0byB0ZXN0ZWQgbmF2LWxpbmtzXG4gICAgICAgICRsaW5rLnBhcmVudHMoU2VsZWN0b3IuTEkpLmZpbmQoJz4gJyArIFNlbGVjdG9yLk5BVl9MSU5LUykuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7XG4gICAgICB9XG5cbiAgICAgICQodGhpcy5fc2Nyb2xsRWxlbWVudCkudHJpZ2dlcihFdmVudC5BQ1RJVkFURSwge1xuICAgICAgICByZWxhdGVkVGFyZ2V0OiB0YXJnZXRcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBTY3JvbGxTcHkucHJvdG90eXBlLl9jbGVhciA9IGZ1bmN0aW9uIF9jbGVhcigpIHtcbiAgICAgICQodGhpcy5fc2VsZWN0b3IpLmZpbHRlcihTZWxlY3Rvci5BQ1RJVkUpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5BQ1RJVkUpO1xuICAgIH07XG5cbiAgICAvLyBzdGF0aWNcblxuICAgIFNjcm9sbFNweS5falF1ZXJ5SW50ZXJmYWNlID0gZnVuY3Rpb24gX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGF0YSA9ICQodGhpcykuZGF0YShEQVRBX0tFWSk7XG4gICAgICAgIHZhciBfY29uZmlnID0gKHR5cGVvZiBjb25maWcgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGNvbmZpZykpID09PSAnb2JqZWN0JyAmJiBjb25maWc7XG5cbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgZGF0YSA9IG5ldyBTY3JvbGxTcHkodGhpcywgX2NvbmZpZyk7XG4gICAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmIChkYXRhW2NvbmZpZ10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBtZXRob2QgbmFtZWQgXCInICsgY29uZmlnICsgJ1wiJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFbY29uZmlnXSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgX2NyZWF0ZUNsYXNzKFNjcm9sbFNweSwgbnVsbCwgW3tcbiAgICAgIGtleTogJ1ZFUlNJT04nLFxuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiBWRVJTSU9OO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ0RlZmF1bHQnLFxuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiBEZWZhdWx0O1xuICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBTY3JvbGxTcHk7XG4gIH0oKTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkKHdpbmRvdykub24oRXZlbnQuTE9BRF9EQVRBX0FQSSwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBzY3JvbGxTcHlzID0gJC5tYWtlQXJyYXkoJChTZWxlY3Rvci5EQVRBX1NQWSkpO1xuXG4gICAgZm9yICh2YXIgaSA9IHNjcm9sbFNweXMubGVuZ3RoOyBpLS07KSB7XG4gICAgICB2YXIgJHNweSA9ICQoc2Nyb2xsU3B5c1tpXSk7XG4gICAgICBTY3JvbGxTcHkuX2pRdWVyeUludGVyZmFjZS5jYWxsKCRzcHksICRzcHkuZGF0YSgpKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogalF1ZXJ5XG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkLmZuW05BTUVdID0gU2Nyb2xsU3B5Ll9qUXVlcnlJbnRlcmZhY2U7XG4gICQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBTY3JvbGxTcHk7XG4gICQuZm5bTkFNRV0ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUO1xuICAgIHJldHVybiBTY3JvbGxTcHkuX2pRdWVyeUludGVyZmFjZTtcbiAgfTtcblxuICByZXR1cm4gU2Nyb2xsU3B5O1xufShqUXVlcnkpO1xuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgKHY0LjAuMC1hbHBoYS42KTogdGFiLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG52YXIgVGFiID0gZnVuY3Rpb24gKCQpIHtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENvbnN0YW50c1xuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIE5BTUUgPSAndGFiJztcbiAgdmFyIFZFUlNJT04gPSAnNC4wLjAtYWxwaGEuNic7XG4gIHZhciBEQVRBX0tFWSA9ICdicy50YWInO1xuICB2YXIgRVZFTlRfS0VZID0gJy4nICsgREFUQV9LRVk7XG4gIHZhciBEQVRBX0FQSV9LRVkgPSAnLmRhdGEtYXBpJztcbiAgdmFyIEpRVUVSWV9OT19DT05GTElDVCA9ICQuZm5bTkFNRV07XG4gIHZhciBUUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwO1xuXG4gIHZhciBFdmVudCA9IHtcbiAgICBISURFOiAnaGlkZScgKyBFVkVOVF9LRVksXG4gICAgSElEREVOOiAnaGlkZGVuJyArIEVWRU5UX0tFWSxcbiAgICBTSE9XOiAnc2hvdycgKyBFVkVOVF9LRVksXG4gICAgU0hPV046ICdzaG93bicgKyBFVkVOVF9LRVksXG4gICAgQ0xJQ0tfREFUQV9BUEk6ICdjbGljaycgKyBFVkVOVF9LRVkgKyBEQVRBX0FQSV9LRVlcbiAgfTtcblxuICB2YXIgQ2xhc3NOYW1lID0ge1xuICAgIERST1BET1dOX01FTlU6ICdkcm9wZG93bi1tZW51JyxcbiAgICBBQ1RJVkU6ICdhY3RpdmUnLFxuICAgIERJU0FCTEVEOiAnZGlzYWJsZWQnLFxuICAgIEZBREU6ICdmYWRlJyxcbiAgICBTSE9XOiAnc2hvdydcbiAgfTtcblxuICB2YXIgU2VsZWN0b3IgPSB7XG4gICAgQTogJ2EnLFxuICAgIExJOiAnbGknLFxuICAgIERST1BET1dOOiAnLmRyb3Bkb3duJyxcbiAgICBMSVNUOiAndWw6bm90KC5kcm9wZG93bi1tZW51KSwgb2w6bm90KC5kcm9wZG93bi1tZW51KSwgbmF2Om5vdCguZHJvcGRvd24tbWVudSknLFxuICAgIEZBREVfQ0hJTEQ6ICc+IC5uYXYtaXRlbSAuZmFkZSwgPiAuZmFkZScsXG4gICAgQUNUSVZFOiAnLmFjdGl2ZScsXG4gICAgQUNUSVZFX0NISUxEOiAnPiAubmF2LWl0ZW0gPiAuYWN0aXZlLCA+IC5hY3RpdmUnLFxuICAgIERBVEFfVE9HR0xFOiAnW2RhdGEtdG9nZ2xlPVwidGFiXCJdLCBbZGF0YS10b2dnbGU9XCJwaWxsXCJdJyxcbiAgICBEUk9QRE9XTl9UT0dHTEU6ICcuZHJvcGRvd24tdG9nZ2xlJyxcbiAgICBEUk9QRE9XTl9BQ1RJVkVfQ0hJTEQ6ICc+IC5kcm9wZG93bi1tZW51IC5hY3RpdmUnXG4gIH07XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICB2YXIgVGFiID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYihlbGVtZW50KSB7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVGFiKTtcblxuICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8gZ2V0dGVyc1xuXG4gICAgLy8gcHVibGljXG5cbiAgICBUYWIucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiBzaG93KCkge1xuICAgICAgdmFyIF90aGlzMjAgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5fZWxlbWVudC5wYXJlbnROb2RlICYmIHRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUgJiYgJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuQUNUSVZFKSB8fCAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5ESVNBQkxFRCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gdm9pZCAwO1xuICAgICAgdmFyIHByZXZpb3VzID0gdm9pZCAwO1xuICAgICAgdmFyIGxpc3RFbGVtZW50ID0gJCh0aGlzLl9lbGVtZW50KS5jbG9zZXN0KFNlbGVjdG9yLkxJU1QpWzBdO1xuICAgICAgdmFyIHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpO1xuXG4gICAgICBpZiAobGlzdEVsZW1lbnQpIHtcbiAgICAgICAgcHJldmlvdXMgPSAkLm1ha2VBcnJheSgkKGxpc3RFbGVtZW50KS5maW5kKFNlbGVjdG9yLkFDVElWRSkpO1xuICAgICAgICBwcmV2aW91cyA9IHByZXZpb3VzW3ByZXZpb3VzLmxlbmd0aCAtIDFdO1xuICAgICAgfVxuXG4gICAgICB2YXIgaGlkZUV2ZW50ID0gJC5FdmVudChFdmVudC5ISURFLCB7XG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRoaXMuX2VsZW1lbnRcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgc2hvd0V2ZW50ID0gJC5FdmVudChFdmVudC5TSE9XLCB7XG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHByZXZpb3VzXG4gICAgICB9KTtcblxuICAgICAgaWYgKHByZXZpb3VzKSB7XG4gICAgICAgICQocHJldmlvdXMpLnRyaWdnZXIoaGlkZUV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHNob3dFdmVudCk7XG5cbiAgICAgIGlmIChzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkgfHwgaGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIHRhcmdldCA9ICQoc2VsZWN0b3IpWzBdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9hY3RpdmF0ZSh0aGlzLl9lbGVtZW50LCBsaXN0RWxlbWVudCk7XG5cbiAgICAgIHZhciBjb21wbGV0ZSA9IGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgICB2YXIgaGlkZGVuRXZlbnQgPSAkLkV2ZW50KEV2ZW50LkhJRERFTiwge1xuICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IF90aGlzMjAuX2VsZW1lbnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHNob3duRXZlbnQgPSAkLkV2ZW50KEV2ZW50LlNIT1dOLCB7XG4gICAgICAgICAgcmVsYXRlZFRhcmdldDogcHJldmlvdXNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChwcmV2aW91cykudHJpZ2dlcihoaWRkZW5FdmVudCk7XG4gICAgICAgICQoX3RoaXMyMC5fZWxlbWVudCkudHJpZ2dlcihzaG93bkV2ZW50KTtcbiAgICAgIH07XG5cbiAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgdGhpcy5fYWN0aXZhdGUodGFyZ2V0LCB0YXJnZXQucGFyZW50Tm9kZSwgY29tcGxldGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcGxldGUoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgVGFiLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgICQucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudCwgREFUQV9LRVkpO1xuICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIHByaXZhdGVcblxuICAgIFRhYi5wcm90b3R5cGUuX2FjdGl2YXRlID0gZnVuY3Rpb24gX2FjdGl2YXRlKGVsZW1lbnQsIGNvbnRhaW5lciwgY2FsbGJhY2spIHtcbiAgICAgIHZhciBfdGhpczIxID0gdGhpcztcblxuICAgICAgdmFyIGFjdGl2ZSA9ICQoY29udGFpbmVyKS5maW5kKFNlbGVjdG9yLkFDVElWRV9DSElMRClbMF07XG4gICAgICB2YXIgaXNUcmFuc2l0aW9uaW5nID0gY2FsbGJhY2sgJiYgVXRpbC5zdXBwb3J0c1RyYW5zaXRpb25FbmQoKSAmJiAoYWN0aXZlICYmICQoYWN0aXZlKS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkgfHwgQm9vbGVhbigkKGNvbnRhaW5lcikuZmluZChTZWxlY3Rvci5GQURFX0NISUxEKVswXSkpO1xuXG4gICAgICB2YXIgY29tcGxldGUgPSBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMjEuX3RyYW5zaXRpb25Db21wbGV0ZShlbGVtZW50LCBhY3RpdmUsIGlzVHJhbnNpdGlvbmluZywgY2FsbGJhY2spO1xuICAgICAgfTtcblxuICAgICAgaWYgKGFjdGl2ZSAmJiBpc1RyYW5zaXRpb25pbmcpIHtcbiAgICAgICAgJChhY3RpdmUpLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjb21wbGV0ZSkuZW11bGF0ZVRyYW5zaXRpb25FbmQoVFJBTlNJVElPTl9EVVJBVElPTik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wbGV0ZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICQoYWN0aXZlKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuU0hPVyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFRhYi5wcm90b3R5cGUuX3RyYW5zaXRpb25Db21wbGV0ZSA9IGZ1bmN0aW9uIF90cmFuc2l0aW9uQ29tcGxldGUoZWxlbWVudCwgYWN0aXZlLCBpc1RyYW5zaXRpb25pbmcsIGNhbGxiYWNrKSB7XG4gICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICQoYWN0aXZlKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQUNUSVZFKTtcblxuICAgICAgICB2YXIgZHJvcGRvd25DaGlsZCA9ICQoYWN0aXZlLnBhcmVudE5vZGUpLmZpbmQoU2VsZWN0b3IuRFJPUERPV05fQUNUSVZFX0NISUxEKVswXTtcblxuICAgICAgICBpZiAoZHJvcGRvd25DaGlsZCkge1xuICAgICAgICAgICQoZHJvcGRvd25DaGlsZCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7XG4gICAgICAgIH1cblxuICAgICAgICBhY3RpdmUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICAkKGVsZW1lbnQpLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpO1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcblxuICAgICAgaWYgKGlzVHJhbnNpdGlvbmluZykge1xuICAgICAgICBVdGlsLnJlZmxvdyhlbGVtZW50KTtcbiAgICAgICAgJChlbGVtZW50KS5hZGRDbGFzcyhDbGFzc05hbWUuU0hPVyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKGVsZW1lbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5GQURFKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVsZW1lbnQucGFyZW50Tm9kZSAmJiAkKGVsZW1lbnQucGFyZW50Tm9kZSkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkRST1BET1dOX01FTlUpKSB7XG5cbiAgICAgICAgdmFyIGRyb3Bkb3duRWxlbWVudCA9ICQoZWxlbWVudCkuY2xvc2VzdChTZWxlY3Rvci5EUk9QRE9XTilbMF07XG4gICAgICAgIGlmIChkcm9wZG93bkVsZW1lbnQpIHtcbiAgICAgICAgICAkKGRyb3Bkb3duRWxlbWVudCkuZmluZChTZWxlY3Rvci5EUk9QRE9XTl9UT0dHTEUpLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIHN0YXRpY1xuXG4gICAgVGFiLl9qUXVlcnlJbnRlcmZhY2UgPSBmdW5jdGlvbiBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIHZhciBkYXRhID0gJHRoaXMuZGF0YShEQVRBX0tFWSk7XG5cbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgZGF0YSA9IG5ldyBUYWIodGhpcyk7XG4gICAgICAgICAgJHRoaXMuZGF0YShEQVRBX0tFWSwgZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAoZGF0YVtjb25maWddID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gbWV0aG9kIG5hbWVkIFwiJyArIGNvbmZpZyArICdcIicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhW2NvbmZpZ10oKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIF9jcmVhdGVDbGFzcyhUYWIsIG51bGwsIFt7XG4gICAgICBrZXk6ICdWRVJTSU9OJyxcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gVkVSU0lPTjtcbiAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gVGFiO1xuICB9KCk7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBEYXRhIEFwaSBpbXBsZW1lbnRhdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgJChkb2N1bWVudCkub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfVE9HR0xFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFRhYi5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJCh0aGlzKSwgJ3Nob3cnKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBqUXVlcnlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQuZm5bTkFNRV0gPSBUYWIuX2pRdWVyeUludGVyZmFjZTtcbiAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IFRhYjtcbiAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1Q7XG4gICAgcmV0dXJuIFRhYi5falF1ZXJ5SW50ZXJmYWNlO1xuICB9O1xuXG4gIHJldHVybiBUYWI7XG59KGpRdWVyeSk7XG5cbi8qIGdsb2JhbCBUZXRoZXIgKi9cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4wLjAtYWxwaGEuNik6IHRvb2x0aXAuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbnZhciBUb29sdGlwID0gZnVuY3Rpb24gKCQpIHtcblxuICAvKipcbiAgICogQ2hlY2sgZm9yIFRldGhlciBkZXBlbmRlbmN5XG4gICAqIFRldGhlciAtIGh0dHA6Ly90ZXRoZXIuaW8vXG4gICAqL1xuICBpZiAodHlwZW9mIFRldGhlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jvb3RzdHJhcCB0b29sdGlwcyByZXF1aXJlIFRldGhlciAoaHR0cDovL3RldGhlci5pby8pJyk7XG4gIH1cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENvbnN0YW50c1xuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIE5BTUUgPSAndG9vbHRpcCc7XG4gIHZhciBWRVJTSU9OID0gJzQuMC4wLWFscGhhLjYnO1xuICB2YXIgREFUQV9LRVkgPSAnYnMudG9vbHRpcCc7XG4gIHZhciBFVkVOVF9LRVkgPSAnLicgKyBEQVRBX0tFWTtcbiAgdmFyIEpRVUVSWV9OT19DT05GTElDVCA9ICQuZm5bTkFNRV07XG4gIHZhciBUUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwO1xuICB2YXIgQ0xBU1NfUFJFRklYID0gJ2JzLXRldGhlcic7XG5cbiAgdmFyIERlZmF1bHQgPSB7XG4gICAgYW5pbWF0aW9uOiB0cnVlLFxuICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cInRvb2x0aXBcIiByb2xlPVwidG9vbHRpcFwiPicgKyAnPGRpdiBjbGFzcz1cInRvb2x0aXAtaW5uZXJcIj48L2Rpdj48L2Rpdj4nLFxuICAgIHRyaWdnZXI6ICdob3ZlciBmb2N1cycsXG4gICAgdGl0bGU6ICcnLFxuICAgIGRlbGF5OiAwLFxuICAgIGh0bWw6IGZhbHNlLFxuICAgIHNlbGVjdG9yOiBmYWxzZSxcbiAgICBwbGFjZW1lbnQ6ICd0b3AnLFxuICAgIG9mZnNldDogJzAgMCcsXG4gICAgY29uc3RyYWludHM6IFtdLFxuICAgIGNvbnRhaW5lcjogZmFsc2VcbiAgfTtcblxuICB2YXIgRGVmYXVsdFR5cGUgPSB7XG4gICAgYW5pbWF0aW9uOiAnYm9vbGVhbicsXG4gICAgdGVtcGxhdGU6ICdzdHJpbmcnLFxuICAgIHRpdGxlOiAnKHN0cmluZ3xlbGVtZW50fGZ1bmN0aW9uKScsXG4gICAgdHJpZ2dlcjogJ3N0cmluZycsXG4gICAgZGVsYXk6ICcobnVtYmVyfG9iamVjdCknLFxuICAgIGh0bWw6ICdib29sZWFuJyxcbiAgICBzZWxlY3RvcjogJyhzdHJpbmd8Ym9vbGVhbiknLFxuICAgIHBsYWNlbWVudDogJyhzdHJpbmd8ZnVuY3Rpb24pJyxcbiAgICBvZmZzZXQ6ICdzdHJpbmcnLFxuICAgIGNvbnN0cmFpbnRzOiAnYXJyYXknLFxuICAgIGNvbnRhaW5lcjogJyhzdHJpbmd8ZWxlbWVudHxib29sZWFuKSdcbiAgfTtcblxuICB2YXIgQXR0YWNobWVudE1hcCA9IHtcbiAgICBUT1A6ICdib3R0b20gY2VudGVyJyxcbiAgICBSSUdIVDogJ21pZGRsZSBsZWZ0JyxcbiAgICBCT1RUT006ICd0b3AgY2VudGVyJyxcbiAgICBMRUZUOiAnbWlkZGxlIHJpZ2h0J1xuICB9O1xuXG4gIHZhciBIb3ZlclN0YXRlID0ge1xuICAgIFNIT1c6ICdzaG93JyxcbiAgICBPVVQ6ICdvdXQnXG4gIH07XG5cbiAgdmFyIEV2ZW50ID0ge1xuICAgIEhJREU6ICdoaWRlJyArIEVWRU5UX0tFWSxcbiAgICBISURERU46ICdoaWRkZW4nICsgRVZFTlRfS0VZLFxuICAgIFNIT1c6ICdzaG93JyArIEVWRU5UX0tFWSxcbiAgICBTSE9XTjogJ3Nob3duJyArIEVWRU5UX0tFWSxcbiAgICBJTlNFUlRFRDogJ2luc2VydGVkJyArIEVWRU5UX0tFWSxcbiAgICBDTElDSzogJ2NsaWNrJyArIEVWRU5UX0tFWSxcbiAgICBGT0NVU0lOOiAnZm9jdXNpbicgKyBFVkVOVF9LRVksXG4gICAgRk9DVVNPVVQ6ICdmb2N1c291dCcgKyBFVkVOVF9LRVksXG4gICAgTU9VU0VFTlRFUjogJ21vdXNlZW50ZXInICsgRVZFTlRfS0VZLFxuICAgIE1PVVNFTEVBVkU6ICdtb3VzZWxlYXZlJyArIEVWRU5UX0tFWVxuICB9O1xuXG4gIHZhciBDbGFzc05hbWUgPSB7XG4gICAgRkFERTogJ2ZhZGUnLFxuICAgIFNIT1c6ICdzaG93J1xuICB9O1xuXG4gIHZhciBTZWxlY3RvciA9IHtcbiAgICBUT09MVElQOiAnLnRvb2x0aXAnLFxuICAgIFRPT0xUSVBfSU5ORVI6ICcudG9vbHRpcC1pbm5lcidcbiAgfTtcblxuICB2YXIgVGV0aGVyQ2xhc3MgPSB7XG4gICAgZWxlbWVudDogZmFsc2UsXG4gICAgZW5hYmxlZDogZmFsc2VcbiAgfTtcblxuICB2YXIgVHJpZ2dlciA9IHtcbiAgICBIT1ZFUjogJ2hvdmVyJyxcbiAgICBGT0NVUzogJ2ZvY3VzJyxcbiAgICBDTElDSzogJ2NsaWNrJyxcbiAgICBNQU5VQUw6ICdtYW51YWwnXG4gIH07XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICB2YXIgVG9vbHRpcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUb29sdGlwKGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFRvb2x0aXApO1xuXG4gICAgICAvLyBwcml2YXRlXG4gICAgICB0aGlzLl9pc0VuYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fdGltZW91dCA9IDA7XG4gICAgICB0aGlzLl9ob3ZlclN0YXRlID0gJyc7XG4gICAgICB0aGlzLl9hY3RpdmVUcmlnZ2VyID0ge307XG4gICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3RldGhlciA9IG51bGw7XG5cbiAgICAgIC8vIHByb3RlY3RlZFxuICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgIHRoaXMuY29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICB0aGlzLnRpcCA9IG51bGw7XG5cbiAgICAgIHRoaXMuX3NldExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIC8vIGdldHRlcnNcblxuICAgIC8vIHB1YmxpY1xuXG4gICAgVG9vbHRpcC5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgICAgdGhpcy5faXNFbmFibGVkID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgVG9vbHRpcC5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgICB0aGlzLl9pc0VuYWJsZWQgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgVG9vbHRpcC5wcm90b3R5cGUudG9nZ2xlRW5hYmxlZCA9IGZ1bmN0aW9uIHRvZ2dsZUVuYWJsZWQoKSB7XG4gICAgICB0aGlzLl9pc0VuYWJsZWQgPSAhdGhpcy5faXNFbmFibGVkO1xuICAgIH07XG5cbiAgICBUb29sdGlwLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiB0b2dnbGUoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICB2YXIgZGF0YUtleSA9IHRoaXMuY29uc3RydWN0b3IuREFUQV9LRVk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKGRhdGFLZXkpO1xuXG4gICAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICAgIGNvbnRleHQgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihldmVudC5jdXJyZW50VGFyZ2V0LCB0aGlzLl9nZXREZWxlZ2F0ZUNvbmZpZygpKTtcbiAgICAgICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSwgY29udGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Ll9hY3RpdmVUcmlnZ2VyLmNsaWNrID0gIWNvbnRleHQuX2FjdGl2ZVRyaWdnZXIuY2xpY2s7XG5cbiAgICAgICAgaWYgKGNvbnRleHQuX2lzV2l0aEFjdGl2ZVRyaWdnZXIoKSkge1xuICAgICAgICAgIGNvbnRleHQuX2VudGVyKG51bGwsIGNvbnRleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnRleHQuX2xlYXZlKG51bGwsIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGlmICgkKHRoaXMuZ2V0VGlwRWxlbWVudCgpKS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVykpIHtcbiAgICAgICAgICB0aGlzLl9sZWF2ZShudWxsLCB0aGlzKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9lbnRlcihudWxsLCB0aGlzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgVG9vbHRpcC5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XG5cbiAgICAgIHRoaXMuY2xlYW51cFRldGhlcigpO1xuXG4gICAgICAkLnJlbW92ZURhdGEodGhpcy5lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZKTtcblxuICAgICAgJCh0aGlzLmVsZW1lbnQpLm9mZih0aGlzLmNvbnN0cnVjdG9yLkVWRU5UX0tFWSk7XG4gICAgICAkKHRoaXMuZWxlbWVudCkuY2xvc2VzdCgnLm1vZGFsJykub2ZmKCdoaWRlLmJzLm1vZGFsJyk7XG5cbiAgICAgIGlmICh0aGlzLnRpcCkge1xuICAgICAgICAkKHRoaXMudGlwKS5yZW1vdmUoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5faXNFbmFibGVkID0gbnVsbDtcbiAgICAgIHRoaXMuX3RpbWVvdXQgPSBudWxsO1xuICAgICAgdGhpcy5faG92ZXJTdGF0ZSA9IG51bGw7XG4gICAgICB0aGlzLl9hY3RpdmVUcmlnZ2VyID0gbnVsbDtcbiAgICAgIHRoaXMuX3RldGhlciA9IG51bGw7XG5cbiAgICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgICB0aGlzLmNvbmZpZyA9IG51bGw7XG4gICAgICB0aGlzLnRpcCA9IG51bGw7XG4gICAgfTtcblxuICAgIFRvb2x0aXAucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiBzaG93KCkge1xuICAgICAgdmFyIF90aGlzMjIgPSB0aGlzO1xuXG4gICAgICBpZiAoJCh0aGlzLmVsZW1lbnQpLmNzcygnZGlzcGxheScpID09PSAnbm9uZScpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgdXNlIHNob3cgb24gdmlzaWJsZSBlbGVtZW50cycpO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2hvd0V2ZW50ID0gJC5FdmVudCh0aGlzLmNvbnN0cnVjdG9yLkV2ZW50LlNIT1cpO1xuICAgICAgaWYgKHRoaXMuaXNXaXRoQ29udGVudCgpICYmIHRoaXMuX2lzRW5hYmxlZCkge1xuICAgICAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUb29sdGlwIGlzIHRyYW5zaXRpb25pbmcnKTtcbiAgICAgICAgfVxuICAgICAgICAkKHRoaXMuZWxlbWVudCkudHJpZ2dlcihzaG93RXZlbnQpO1xuXG4gICAgICAgIHZhciBpc0luVGhlRG9tID0gJC5jb250YWlucyh0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHRoaXMuZWxlbWVudCk7XG5cbiAgICAgICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSB8fCAhaXNJblRoZURvbSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0aXAgPSB0aGlzLmdldFRpcEVsZW1lbnQoKTtcbiAgICAgICAgdmFyIHRpcElkID0gVXRpbC5nZXRVSUQodGhpcy5jb25zdHJ1Y3Rvci5OQU1FKTtcblxuICAgICAgICB0aXAuc2V0QXR0cmlidXRlKCdpZCcsIHRpcElkKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScsIHRpcElkKTtcblxuICAgICAgICB0aGlzLnNldENvbnRlbnQoKTtcblxuICAgICAgICBpZiAodGhpcy5jb25maWcuYW5pbWF0aW9uKSB7XG4gICAgICAgICAgJCh0aXApLmFkZENsYXNzKENsYXNzTmFtZS5GQURFKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwbGFjZW1lbnQgPSB0eXBlb2YgdGhpcy5jb25maWcucGxhY2VtZW50ID09PSAnZnVuY3Rpb24nID8gdGhpcy5jb25maWcucGxhY2VtZW50LmNhbGwodGhpcywgdGlwLCB0aGlzLmVsZW1lbnQpIDogdGhpcy5jb25maWcucGxhY2VtZW50O1xuXG4gICAgICAgIHZhciBhdHRhY2htZW50ID0gdGhpcy5fZ2V0QXR0YWNobWVudChwbGFjZW1lbnQpO1xuXG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbmZpZy5jb250YWluZXIgPT09IGZhbHNlID8gZG9jdW1lbnQuYm9keSA6ICQodGhpcy5jb25maWcuY29udGFpbmVyKTtcblxuICAgICAgICAkKHRpcCkuZGF0YSh0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZLCB0aGlzKS5hcHBlbmRUbyhjb250YWluZXIpO1xuXG4gICAgICAgICQodGhpcy5lbGVtZW50KS50cmlnZ2VyKHRoaXMuY29uc3RydWN0b3IuRXZlbnQuSU5TRVJURUQpO1xuXG4gICAgICAgIHRoaXMuX3RldGhlciA9IG5ldyBUZXRoZXIoe1xuICAgICAgICAgIGF0dGFjaG1lbnQ6IGF0dGFjaG1lbnQsXG4gICAgICAgICAgZWxlbWVudDogdGlwLFxuICAgICAgICAgIHRhcmdldDogdGhpcy5lbGVtZW50LFxuICAgICAgICAgIGNsYXNzZXM6IFRldGhlckNsYXNzLFxuICAgICAgICAgIGNsYXNzUHJlZml4OiBDTEFTU19QUkVGSVgsXG4gICAgICAgICAgb2Zmc2V0OiB0aGlzLmNvbmZpZy5vZmZzZXQsXG4gICAgICAgICAgY29uc3RyYWludHM6IHRoaXMuY29uZmlnLmNvbnN0cmFpbnRzLFxuICAgICAgICAgIGFkZFRhcmdldENsYXNzZXM6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIFV0aWwucmVmbG93KHRpcCk7XG4gICAgICAgIHRoaXMuX3RldGhlci5wb3NpdGlvbigpO1xuXG4gICAgICAgICQodGlwKS5hZGRDbGFzcyhDbGFzc05hbWUuU0hPVyk7XG5cbiAgICAgICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICAgICAgdmFyIHByZXZIb3ZlclN0YXRlID0gX3RoaXMyMi5faG92ZXJTdGF0ZTtcbiAgICAgICAgICBfdGhpczIyLl9ob3ZlclN0YXRlID0gbnVsbDtcbiAgICAgICAgICBfdGhpczIyLl9pc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcblxuICAgICAgICAgICQoX3RoaXMyMi5lbGVtZW50KS50cmlnZ2VyKF90aGlzMjIuY29uc3RydWN0b3IuRXZlbnQuU0hPV04pO1xuXG4gICAgICAgICAgaWYgKHByZXZIb3ZlclN0YXRlID09PSBIb3ZlclN0YXRlLk9VVCkge1xuICAgICAgICAgICAgX3RoaXMyMi5fbGVhdmUobnVsbCwgX3RoaXMyMik7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChVdGlsLnN1cHBvcnRzVHJhbnNpdGlvbkVuZCgpICYmICQodGhpcy50aXApLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKSkge1xuICAgICAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IHRydWU7XG4gICAgICAgICAgJCh0aGlzLnRpcCkub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNvbXBsZXRlKS5lbXVsYXRlVHJhbnNpdGlvbkVuZChUb29sdGlwLl9UUkFOU0lUSU9OX0RVUkFUSU9OKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb21wbGV0ZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBUb29sdGlwLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gaGlkZShjYWxsYmFjaykge1xuICAgICAgdmFyIF90aGlzMjMgPSB0aGlzO1xuXG4gICAgICB2YXIgdGlwID0gdGhpcy5nZXRUaXBFbGVtZW50KCk7XG4gICAgICB2YXIgaGlkZUV2ZW50ID0gJC5FdmVudCh0aGlzLmNvbnN0cnVjdG9yLkV2ZW50LkhJREUpO1xuICAgICAgaWYgKHRoaXMuX2lzVHJhbnNpdGlvbmluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Rvb2x0aXAgaXMgdHJhbnNpdGlvbmluZycpO1xuICAgICAgfVxuICAgICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICAgIGlmIChfdGhpczIzLl9ob3ZlclN0YXRlICE9PSBIb3ZlclN0YXRlLlNIT1cgJiYgdGlwLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICB0aXAucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aXApO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMyMy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScpO1xuICAgICAgICAkKF90aGlzMjMuZWxlbWVudCkudHJpZ2dlcihfdGhpczIzLmNvbnN0cnVjdG9yLkV2ZW50LkhJRERFTik7XG4gICAgICAgIF90aGlzMjMuX2lzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuICAgICAgICBfdGhpczIzLmNsZWFudXBUZXRoZXIoKTtcblxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAkKHRoaXMuZWxlbWVudCkudHJpZ2dlcihoaWRlRXZlbnQpO1xuXG4gICAgICBpZiAoaGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgJCh0aXApLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKTtcblxuICAgICAgdGhpcy5fYWN0aXZlVHJpZ2dlcltUcmlnZ2VyLkNMSUNLXSA9IGZhbHNlO1xuICAgICAgdGhpcy5fYWN0aXZlVHJpZ2dlcltUcmlnZ2VyLkZPQ1VTXSA9IGZhbHNlO1xuICAgICAgdGhpcy5fYWN0aXZlVHJpZ2dlcltUcmlnZ2VyLkhPVkVSXSA9IGZhbHNlO1xuXG4gICAgICBpZiAoVXRpbC5zdXBwb3J0c1RyYW5zaXRpb25FbmQoKSAmJiAkKHRoaXMudGlwKS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gdHJ1ZTtcbiAgICAgICAgJCh0aXApLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjb21wbGV0ZSkuZW11bGF0ZVRyYW5zaXRpb25FbmQoVFJBTlNJVElPTl9EVVJBVElPTik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wbGV0ZSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9ob3ZlclN0YXRlID0gJyc7XG4gICAgfTtcblxuICAgIC8vIHByb3RlY3RlZFxuXG4gICAgVG9vbHRpcC5wcm90b3R5cGUuaXNXaXRoQ29udGVudCA9IGZ1bmN0aW9uIGlzV2l0aENvbnRlbnQoKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbih0aGlzLmdldFRpdGxlKCkpO1xuICAgIH07XG5cbiAgICBUb29sdGlwLnByb3RvdHlwZS5nZXRUaXBFbGVtZW50ID0gZnVuY3Rpb24gZ2V0VGlwRWxlbWVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnRpcCA9IHRoaXMudGlwIHx8ICQodGhpcy5jb25maWcudGVtcGxhdGUpWzBdO1xuICAgIH07XG5cbiAgICBUb29sdGlwLnByb3RvdHlwZS5zZXRDb250ZW50ID0gZnVuY3Rpb24gc2V0Q29udGVudCgpIHtcbiAgICAgIHZhciAkdGlwID0gJCh0aGlzLmdldFRpcEVsZW1lbnQoKSk7XG5cbiAgICAgIHRoaXMuc2V0RWxlbWVudENvbnRlbnQoJHRpcC5maW5kKFNlbGVjdG9yLlRPT0xUSVBfSU5ORVIpLCB0aGlzLmdldFRpdGxlKCkpO1xuXG4gICAgICAkdGlwLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5GQURFICsgJyAnICsgQ2xhc3NOYW1lLlNIT1cpO1xuXG4gICAgICB0aGlzLmNsZWFudXBUZXRoZXIoKTtcbiAgICB9O1xuXG4gICAgVG9vbHRpcC5wcm90b3R5cGUuc2V0RWxlbWVudENvbnRlbnQgPSBmdW5jdGlvbiBzZXRFbGVtZW50Q29udGVudCgkZWxlbWVudCwgY29udGVudCkge1xuICAgICAgdmFyIGh0bWwgPSB0aGlzLmNvbmZpZy5odG1sO1xuICAgICAgaWYgKCh0eXBlb2YgY29udGVudCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoY29udGVudCkpID09PSAnb2JqZWN0JyAmJiAoY29udGVudC5ub2RlVHlwZSB8fCBjb250ZW50LmpxdWVyeSkpIHtcbiAgICAgICAgLy8gY29udGVudCBpcyBhIERPTSBub2RlIG9yIGEgalF1ZXJ5XG4gICAgICAgIGlmIChodG1sKSB7XG4gICAgICAgICAgaWYgKCEkKGNvbnRlbnQpLnBhcmVudCgpLmlzKCRlbGVtZW50KSkge1xuICAgICAgICAgICAgJGVsZW1lbnQuZW1wdHkoKS5hcHBlbmQoY29udGVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRlbGVtZW50LnRleHQoJChjb250ZW50KS50ZXh0KCkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkZWxlbWVudFtodG1sID8gJ2h0bWwnIDogJ3RleHQnXShjb250ZW50KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0VGl0bGUgPSBmdW5jdGlvbiBnZXRUaXRsZSgpIHtcbiAgICAgIHZhciB0aXRsZSA9IHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnKTtcblxuICAgICAgaWYgKCF0aXRsZSkge1xuICAgICAgICB0aXRsZSA9IHR5cGVvZiB0aGlzLmNvbmZpZy50aXRsZSA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMuY29uZmlnLnRpdGxlLmNhbGwodGhpcy5lbGVtZW50KSA6IHRoaXMuY29uZmlnLnRpdGxlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGl0bGU7XG4gICAgfTtcblxuICAgIFRvb2x0aXAucHJvdG90eXBlLmNsZWFudXBUZXRoZXIgPSBmdW5jdGlvbiBjbGVhbnVwVGV0aGVyKCkge1xuICAgICAgaWYgKHRoaXMuX3RldGhlcikge1xuICAgICAgICB0aGlzLl90ZXRoZXIuZGVzdHJveSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBwcml2YXRlXG5cbiAgICBUb29sdGlwLnByb3RvdHlwZS5fZ2V0QXR0YWNobWVudCA9IGZ1bmN0aW9uIF9nZXRBdHRhY2htZW50KHBsYWNlbWVudCkge1xuICAgICAgcmV0dXJuIEF0dGFjaG1lbnRNYXBbcGxhY2VtZW50LnRvVXBwZXJDYXNlKCldO1xuICAgIH07XG5cbiAgICBUb29sdGlwLnByb3RvdHlwZS5fc2V0TGlzdGVuZXJzID0gZnVuY3Rpb24gX3NldExpc3RlbmVycygpIHtcbiAgICAgIHZhciBfdGhpczI0ID0gdGhpcztcblxuICAgICAgdmFyIHRyaWdnZXJzID0gdGhpcy5jb25maWcudHJpZ2dlci5zcGxpdCgnICcpO1xuXG4gICAgICB0cmlnZ2Vycy5mb3JFYWNoKGZ1bmN0aW9uICh0cmlnZ2VyKSB7XG4gICAgICAgIGlmICh0cmlnZ2VyID09PSAnY2xpY2snKSB7XG4gICAgICAgICAgJChfdGhpczI0LmVsZW1lbnQpLm9uKF90aGlzMjQuY29uc3RydWN0b3IuRXZlbnQuQ0xJQ0ssIF90aGlzMjQuY29uZmlnLnNlbGVjdG9yLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpczI0LnRvZ2dsZShldmVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHJpZ2dlciAhPT0gVHJpZ2dlci5NQU5VQUwpIHtcbiAgICAgICAgICB2YXIgZXZlbnRJbiA9IHRyaWdnZXIgPT09IFRyaWdnZXIuSE9WRVIgPyBfdGhpczI0LmNvbnN0cnVjdG9yLkV2ZW50Lk1PVVNFRU5URVIgOiBfdGhpczI0LmNvbnN0cnVjdG9yLkV2ZW50LkZPQ1VTSU47XG4gICAgICAgICAgdmFyIGV2ZW50T3V0ID0gdHJpZ2dlciA9PT0gVHJpZ2dlci5IT1ZFUiA/IF90aGlzMjQuY29uc3RydWN0b3IuRXZlbnQuTU9VU0VMRUFWRSA6IF90aGlzMjQuY29uc3RydWN0b3IuRXZlbnQuRk9DVVNPVVQ7XG5cbiAgICAgICAgICAkKF90aGlzMjQuZWxlbWVudCkub24oZXZlbnRJbiwgX3RoaXMyNC5jb25maWcuc2VsZWN0b3IsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzMjQuX2VudGVyKGV2ZW50KTtcbiAgICAgICAgICB9KS5vbihldmVudE91dCwgX3RoaXMyNC5jb25maWcuc2VsZWN0b3IsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzMjQuX2xlYXZlKGV2ZW50KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoX3RoaXMyNC5lbGVtZW50KS5jbG9zZXN0KCcubW9kYWwnKS5vbignaGlkZS5icy5tb2RhbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMyNC5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLmNvbmZpZy5zZWxlY3Rvcikge1xuICAgICAgICB0aGlzLmNvbmZpZyA9ICQuZXh0ZW5kKHt9LCB0aGlzLmNvbmZpZywge1xuICAgICAgICAgIHRyaWdnZXI6ICdtYW51YWwnLFxuICAgICAgICAgIHNlbGVjdG9yOiAnJ1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2ZpeFRpdGxlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFRvb2x0aXAucHJvdG90eXBlLl9maXhUaXRsZSA9IGZ1bmN0aW9uIF9maXhUaXRsZSgpIHtcbiAgICAgIHZhciB0aXRsZVR5cGUgPSBfdHlwZW9mKHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnKSk7XG4gICAgICBpZiAodGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgndGl0bGUnKSB8fCB0aXRsZVR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnLCB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0aXRsZScpIHx8ICcnKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFRvb2x0aXAucHJvdG90eXBlLl9lbnRlciA9IGZ1bmN0aW9uIF9lbnRlcihldmVudCwgY29udGV4dCkge1xuICAgICAgdmFyIGRhdGFLZXkgPSB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZO1xuXG4gICAgICBjb250ZXh0ID0gY29udGV4dCB8fCAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSk7XG5cbiAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICBjb250ZXh0ID0gbmV3IHRoaXMuY29uc3RydWN0b3IoZXZlbnQuY3VycmVudFRhcmdldCwgdGhpcy5fZ2V0RGVsZWdhdGVDb25maWcoKSk7XG4gICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YShkYXRhS2V5LCBjb250ZXh0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgIGNvbnRleHQuX2FjdGl2ZVRyaWdnZXJbZXZlbnQudHlwZSA9PT0gJ2ZvY3VzaW4nID8gVHJpZ2dlci5GT0NVUyA6IFRyaWdnZXIuSE9WRVJdID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCQoY29udGV4dC5nZXRUaXBFbGVtZW50KCkpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSB8fCBjb250ZXh0Ll9ob3ZlclN0YXRlID09PSBIb3ZlclN0YXRlLlNIT1cpIHtcbiAgICAgICAgY29udGV4dC5faG92ZXJTdGF0ZSA9IEhvdmVyU3RhdGUuU0hPVztcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjbGVhclRpbWVvdXQoY29udGV4dC5fdGltZW91dCk7XG5cbiAgICAgIGNvbnRleHQuX2hvdmVyU3RhdGUgPSBIb3ZlclN0YXRlLlNIT1c7XG5cbiAgICAgIGlmICghY29udGV4dC5jb25maWcuZGVsYXkgfHwgIWNvbnRleHQuY29uZmlnLmRlbGF5LnNob3cpIHtcbiAgICAgICAgY29udGV4dC5zaG93KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5fdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoY29udGV4dC5faG92ZXJTdGF0ZSA9PT0gSG92ZXJTdGF0ZS5TSE9XKSB7XG4gICAgICAgICAgY29udGV4dC5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgIH0sIGNvbnRleHQuY29uZmlnLmRlbGF5LnNob3cpO1xuICAgIH07XG5cbiAgICBUb29sdGlwLnByb3RvdHlwZS5fbGVhdmUgPSBmdW5jdGlvbiBfbGVhdmUoZXZlbnQsIGNvbnRleHQpIHtcbiAgICAgIHZhciBkYXRhS2V5ID0gdGhpcy5jb25zdHJ1Y3Rvci5EQVRBX0tFWTtcblxuICAgICAgY29udGV4dCA9IGNvbnRleHQgfHwgJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKGRhdGFLZXkpO1xuXG4gICAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKGV2ZW50LmN1cnJlbnRUYXJnZXQsIHRoaXMuX2dldERlbGVnYXRlQ29uZmlnKCkpO1xuICAgICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSwgY29udGV4dCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICBjb250ZXh0Ll9hY3RpdmVUcmlnZ2VyW2V2ZW50LnR5cGUgPT09ICdmb2N1c291dCcgPyBUcmlnZ2VyLkZPQ1VTIDogVHJpZ2dlci5IT1ZFUl0gPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbnRleHQuX2lzV2l0aEFjdGl2ZVRyaWdnZXIoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNsZWFyVGltZW91dChjb250ZXh0Ll90aW1lb3V0KTtcblxuICAgICAgY29udGV4dC5faG92ZXJTdGF0ZSA9IEhvdmVyU3RhdGUuT1VUO1xuXG4gICAgICBpZiAoIWNvbnRleHQuY29uZmlnLmRlbGF5IHx8ICFjb250ZXh0LmNvbmZpZy5kZWxheS5oaWRlKSB7XG4gICAgICAgIGNvbnRleHQuaGlkZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQuX3RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGNvbnRleHQuX2hvdmVyU3RhdGUgPT09IEhvdmVyU3RhdGUuT1VUKSB7XG4gICAgICAgICAgY29udGV4dC5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIGNvbnRleHQuY29uZmlnLmRlbGF5LmhpZGUpO1xuICAgIH07XG5cbiAgICBUb29sdGlwLnByb3RvdHlwZS5faXNXaXRoQWN0aXZlVHJpZ2dlciA9IGZ1bmN0aW9uIF9pc1dpdGhBY3RpdmVUcmlnZ2VyKCkge1xuICAgICAgZm9yICh2YXIgdHJpZ2dlciBpbiB0aGlzLl9hY3RpdmVUcmlnZ2VyKSB7XG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVUcmlnZ2VyW3RyaWdnZXJdKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBUb29sdGlwLnByb3RvdHlwZS5fZ2V0Q29uZmlnID0gZnVuY3Rpb24gX2dldENvbmZpZyhjb25maWcpIHtcbiAgICAgIGNvbmZpZyA9ICQuZXh0ZW5kKHt9LCB0aGlzLmNvbnN0cnVjdG9yLkRlZmF1bHQsICQodGhpcy5lbGVtZW50KS5kYXRhKCksIGNvbmZpZyk7XG5cbiAgICAgIGlmIChjb25maWcuZGVsYXkgJiYgdHlwZW9mIGNvbmZpZy5kZWxheSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY29uZmlnLmRlbGF5ID0ge1xuICAgICAgICAgIHNob3c6IGNvbmZpZy5kZWxheSxcbiAgICAgICAgICBoaWRlOiBjb25maWcuZGVsYXlcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgVXRpbC50eXBlQ2hlY2tDb25maWcoTkFNRSwgY29uZmlnLCB0aGlzLmNvbnN0cnVjdG9yLkRlZmF1bHRUeXBlKTtcblxuICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9O1xuXG4gICAgVG9vbHRpcC5wcm90b3R5cGUuX2dldERlbGVnYXRlQ29uZmlnID0gZnVuY3Rpb24gX2dldERlbGVnYXRlQ29uZmlnKCkge1xuICAgICAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gICAgICBpZiAodGhpcy5jb25maWcpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuY29uZmlnKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdFtrZXldICE9PSB0aGlzLmNvbmZpZ1trZXldKSB7XG4gICAgICAgICAgICBjb25maWdba2V5XSA9IHRoaXMuY29uZmlnW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb25maWc7XG4gICAgfTtcblxuICAgIC8vIHN0YXRpY1xuXG4gICAgVG9vbHRpcC5falF1ZXJ5SW50ZXJmYWNlID0gZnVuY3Rpb24gX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGF0YSA9ICQodGhpcykuZGF0YShEQVRBX0tFWSk7XG4gICAgICAgIHZhciBfY29uZmlnID0gKHR5cGVvZiBjb25maWcgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGNvbmZpZykpID09PSAnb2JqZWN0JyAmJiBjb25maWc7XG5cbiAgICAgICAgaWYgKCFkYXRhICYmIC9kaXNwb3NlfGhpZGUvLnRlc3QoY29uZmlnKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBuZXcgVG9vbHRpcCh0aGlzLCBfY29uZmlnKTtcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaWYgKGRhdGFbY29uZmlnXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIG1ldGhvZCBuYW1lZCBcIicgKyBjb25maWcgKyAnXCInKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YVtjb25maWddKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfY3JlYXRlQ2xhc3MoVG9vbHRpcCwgbnVsbCwgW3tcbiAgICAgIGtleTogJ1ZFUlNJT04nLFxuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiBWRVJTSU9OO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ0RlZmF1bHQnLFxuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiBEZWZhdWx0O1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ05BTUUnLFxuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ0RBVEFfS0VZJyxcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gREFUQV9LRVk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnRXZlbnQnLFxuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiBFdmVudDtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdFVkVOVF9LRVknLFxuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiBFVkVOVF9LRVk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnRGVmYXVsdFR5cGUnLFxuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiBEZWZhdWx0VHlwZTtcbiAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gVG9vbHRpcDtcbiAgfSgpO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogalF1ZXJ5XG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkLmZuW05BTUVdID0gVG9vbHRpcC5falF1ZXJ5SW50ZXJmYWNlO1xuICAkLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gVG9vbHRpcDtcbiAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1Q7XG4gICAgcmV0dXJuIFRvb2x0aXAuX2pRdWVyeUludGVyZmFjZTtcbiAgfTtcblxuICByZXR1cm4gVG9vbHRpcDtcbn0oalF1ZXJ5KTtcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4wLjAtYWxwaGEuNik6IHBvcG92ZXIuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbnZhciBQb3BvdmVyID0gZnVuY3Rpb24gKCQpIHtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENvbnN0YW50c1xuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIE5BTUUgPSAncG9wb3Zlcic7XG4gIHZhciBWRVJTSU9OID0gJzQuMC4wLWFscGhhLjYnO1xuICB2YXIgREFUQV9LRVkgPSAnYnMucG9wb3Zlcic7XG4gIHZhciBFVkVOVF9LRVkgPSAnLicgKyBEQVRBX0tFWTtcbiAgdmFyIEpRVUVSWV9OT19DT05GTElDVCA9ICQuZm5bTkFNRV07XG5cbiAgdmFyIERlZmF1bHQgPSAkLmV4dGVuZCh7fSwgVG9vbHRpcC5EZWZhdWx0LCB7XG4gICAgcGxhY2VtZW50OiAncmlnaHQnLFxuICAgIHRyaWdnZXI6ICdjbGljaycsXG4gICAgY29udGVudDogJycsXG4gICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwicG9wb3ZlclwiIHJvbGU9XCJ0b29sdGlwXCI+JyArICc8aDMgY2xhc3M9XCJwb3BvdmVyLXRpdGxlXCI+PC9oMz4nICsgJzxkaXYgY2xhc3M9XCJwb3BvdmVyLWNvbnRlbnRcIj48L2Rpdj48L2Rpdj4nXG4gIH0pO1xuXG4gIHZhciBEZWZhdWx0VHlwZSA9ICQuZXh0ZW5kKHt9LCBUb29sdGlwLkRlZmF1bHRUeXBlLCB7XG4gICAgY29udGVudDogJyhzdHJpbmd8ZWxlbWVudHxmdW5jdGlvbiknXG4gIH0pO1xuXG4gIHZhciBDbGFzc05hbWUgPSB7XG4gICAgRkFERTogJ2ZhZGUnLFxuICAgIFNIT1c6ICdzaG93J1xuICB9O1xuXG4gIHZhciBTZWxlY3RvciA9IHtcbiAgICBUSVRMRTogJy5wb3BvdmVyLXRpdGxlJyxcbiAgICBDT05URU5UOiAnLnBvcG92ZXItY29udGVudCdcbiAgfTtcblxuICB2YXIgRXZlbnQgPSB7XG4gICAgSElERTogJ2hpZGUnICsgRVZFTlRfS0VZLFxuICAgIEhJRERFTjogJ2hpZGRlbicgKyBFVkVOVF9LRVksXG4gICAgU0hPVzogJ3Nob3cnICsgRVZFTlRfS0VZLFxuICAgIFNIT1dOOiAnc2hvd24nICsgRVZFTlRfS0VZLFxuICAgIElOU0VSVEVEOiAnaW5zZXJ0ZWQnICsgRVZFTlRfS0VZLFxuICAgIENMSUNLOiAnY2xpY2snICsgRVZFTlRfS0VZLFxuICAgIEZPQ1VTSU46ICdmb2N1c2luJyArIEVWRU5UX0tFWSxcbiAgICBGT0NVU09VVDogJ2ZvY3Vzb3V0JyArIEVWRU5UX0tFWSxcbiAgICBNT1VTRUVOVEVSOiAnbW91c2VlbnRlcicgKyBFVkVOVF9LRVksXG4gICAgTU9VU0VMRUFWRTogJ21vdXNlbGVhdmUnICsgRVZFTlRfS0VZXG4gIH07XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICB2YXIgUG9wb3ZlciA9IGZ1bmN0aW9uIChfVG9vbHRpcCkge1xuICAgIF9pbmhlcml0cyhQb3BvdmVyLCBfVG9vbHRpcCk7XG5cbiAgICBmdW5jdGlvbiBQb3BvdmVyKCkge1xuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFBvcG92ZXIpO1xuXG4gICAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX1Rvb2x0aXAuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgfVxuXG4gICAgLy8gb3ZlcnJpZGVzXG5cbiAgICBQb3BvdmVyLnByb3RvdHlwZS5pc1dpdGhDb250ZW50ID0gZnVuY3Rpb24gaXNXaXRoQ29udGVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFRpdGxlKCkgfHwgdGhpcy5fZ2V0Q29udGVudCgpO1xuICAgIH07XG5cbiAgICBQb3BvdmVyLnByb3RvdHlwZS5nZXRUaXBFbGVtZW50ID0gZnVuY3Rpb24gZ2V0VGlwRWxlbWVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnRpcCA9IHRoaXMudGlwIHx8ICQodGhpcy5jb25maWcudGVtcGxhdGUpWzBdO1xuICAgIH07XG5cbiAgICBQb3BvdmVyLnByb3RvdHlwZS5zZXRDb250ZW50ID0gZnVuY3Rpb24gc2V0Q29udGVudCgpIHtcbiAgICAgIHZhciAkdGlwID0gJCh0aGlzLmdldFRpcEVsZW1lbnQoKSk7XG5cbiAgICAgIC8vIHdlIHVzZSBhcHBlbmQgZm9yIGh0bWwgb2JqZWN0cyB0byBtYWludGFpbiBqcyBldmVudHNcbiAgICAgIHRoaXMuc2V0RWxlbWVudENvbnRlbnQoJHRpcC5maW5kKFNlbGVjdG9yLlRJVExFKSwgdGhpcy5nZXRUaXRsZSgpKTtcbiAgICAgIHRoaXMuc2V0RWxlbWVudENvbnRlbnQoJHRpcC5maW5kKFNlbGVjdG9yLkNPTlRFTlQpLCB0aGlzLl9nZXRDb250ZW50KCkpO1xuXG4gICAgICAkdGlwLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5GQURFICsgJyAnICsgQ2xhc3NOYW1lLlNIT1cpO1xuXG4gICAgICB0aGlzLmNsZWFudXBUZXRoZXIoKTtcbiAgICB9O1xuXG4gICAgLy8gcHJpdmF0ZVxuXG4gICAgUG9wb3Zlci5wcm90b3R5cGUuX2dldENvbnRlbnQgPSBmdW5jdGlvbiBfZ2V0Q29udGVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbnRlbnQnKSB8fCAodHlwZW9mIHRoaXMuY29uZmlnLmNvbnRlbnQgPT09ICdmdW5jdGlvbicgPyB0aGlzLmNvbmZpZy5jb250ZW50LmNhbGwodGhpcy5lbGVtZW50KSA6IHRoaXMuY29uZmlnLmNvbnRlbnQpO1xuICAgIH07XG5cbiAgICAvLyBzdGF0aWNcblxuICAgIFBvcG92ZXIuX2pRdWVyeUludGVyZmFjZSA9IGZ1bmN0aW9uIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRhdGEgPSAkKHRoaXMpLmRhdGEoREFUQV9LRVkpO1xuICAgICAgICB2YXIgX2NvbmZpZyA9ICh0eXBlb2YgY29uZmlnID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihjb25maWcpKSA9PT0gJ29iamVjdCcgPyBjb25maWcgOiBudWxsO1xuXG4gICAgICAgIGlmICghZGF0YSAmJiAvZGVzdHJveXxoaWRlLy50ZXN0KGNvbmZpZykpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IFBvcG92ZXIodGhpcywgX2NvbmZpZyk7XG4gICAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmIChkYXRhW2NvbmZpZ10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBtZXRob2QgbmFtZWQgXCInICsgY29uZmlnICsgJ1wiJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFbY29uZmlnXSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgX2NyZWF0ZUNsYXNzKFBvcG92ZXIsIG51bGwsIFt7XG4gICAgICBrZXk6ICdWRVJTSU9OJyxcblxuXG4gICAgICAvLyBnZXR0ZXJzXG5cbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gVkVSU0lPTjtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdEZWZhdWx0JyxcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gRGVmYXVsdDtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdOQU1FJyxcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdEQVRBX0tFWScsXG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIERBVEFfS0VZO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ0V2ZW50JyxcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gRXZlbnQ7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnRVZFTlRfS0VZJyxcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gRVZFTlRfS0VZO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ0RlZmF1bHRUeXBlJyxcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gRGVmYXVsdFR5cGU7XG4gICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFBvcG92ZXI7XG4gIH0oVG9vbHRpcCk7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBqUXVlcnlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQuZm5bTkFNRV0gPSBQb3BvdmVyLl9qUXVlcnlJbnRlcmZhY2U7XG4gICQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBQb3BvdmVyO1xuICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVDtcbiAgICByZXR1cm4gUG9wb3Zlci5falF1ZXJ5SW50ZXJmYWNlO1xuICB9O1xuXG4gIHJldHVybiBQb3BvdmVyO1xufShqUXVlcnkpO1xuXG59KCk7XG4iXX0=
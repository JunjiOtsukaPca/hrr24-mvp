'use strict';

(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing

    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 48
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 54
    });

    // Closes responsive menu when a link is clicked
    $('.navbar-collapse>ul>li>a').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Collapse the navbar when page is scrolled
    $(window).scroll(function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    });
})(jQuery); // End of use strict
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2pzL25ldy1hZ2UuanMiXSwibmFtZXMiOlsiJCIsImNsaWNrIiwibG9jYXRpb24iLCJwYXRobmFtZSIsInJlcGxhY2UiLCJob3N0bmFtZSIsInRhcmdldCIsImhhc2giLCJsZW5ndGgiLCJzbGljZSIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJ0b3AiLCJzY3JvbGxzcHkiLCJjb2xsYXBzZSIsIndpbmRvdyIsInNjcm9sbCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJqUXVlcnkiXSwibWFwcGluZ3MiOiI7O0FBQUEsQ0FBQyxVQUFTQSxDQUFULEVBQVk7QUFDVCxpQkFEUyxDQUNLOztBQUVkOztBQUNBQSxNQUFFLDhCQUFGLEVBQWtDQyxLQUFsQyxDQUF3QyxZQUFXO0FBQy9DLFlBQUlDLFNBQVNDLFFBQVQsQ0FBa0JDLE9BQWxCLENBQTBCLEtBQTFCLEVBQWlDLEVBQWpDLEtBQXdDLEtBQUtELFFBQUwsQ0FBY0MsT0FBZCxDQUFzQixLQUF0QixFQUE2QixFQUE3QixDQUF4QyxJQUE0RUYsU0FBU0csUUFBVCxJQUFxQixLQUFLQSxRQUExRyxFQUFvSDtBQUNoSCxnQkFBSUMsU0FBU04sRUFBRSxLQUFLTyxJQUFQLENBQWI7QUFDQUQscUJBQVNBLE9BQU9FLE1BQVAsR0FBZ0JGLE1BQWhCLEdBQXlCTixFQUFFLFdBQVcsS0FBS08sSUFBTCxDQUFVRSxLQUFWLENBQWdCLENBQWhCLENBQVgsR0FBZ0MsR0FBbEMsQ0FBbEM7QUFDQSxnQkFBSUgsT0FBT0UsTUFBWCxFQUFtQjtBQUNmUixrQkFBRSxZQUFGLEVBQWdCVSxPQUFoQixDQUF3QjtBQUNwQkMsK0JBQVlMLE9BQU9NLE1BQVAsR0FBZ0JDLEdBQWhCLEdBQXNCO0FBRGQsaUJBQXhCLEVBRUcsSUFGSCxFQUVTLGVBRlQ7QUFHQSx1QkFBTyxLQUFQO0FBQ0g7QUFDSjtBQUNKLEtBWEQ7O0FBYUE7QUFDQWIsTUFBRSxNQUFGLEVBQVVjLFNBQVYsQ0FBb0I7QUFDaEJSLGdCQUFRLFVBRFE7QUFFaEJNLGdCQUFRO0FBRlEsS0FBcEI7O0FBS0E7QUFDQVosTUFBRSwwQkFBRixFQUE4QkMsS0FBOUIsQ0FBb0MsWUFBVztBQUMzQ0QsVUFBRSxrQkFBRixFQUFzQmUsUUFBdEIsQ0FBK0IsTUFBL0I7QUFDSCxLQUZEOztBQUlBO0FBQ0FmLE1BQUVnQixNQUFGLEVBQVVDLE1BQVYsQ0FBaUIsWUFBVztBQUN4QixZQUFJakIsRUFBRSxVQUFGLEVBQWNZLE1BQWQsR0FBdUJDLEdBQXZCLEdBQTZCLEdBQWpDLEVBQXNDO0FBQ2xDYixjQUFFLFVBQUYsRUFBY2tCLFFBQWQsQ0FBdUIsZUFBdkI7QUFDSCxTQUZELE1BRU87QUFDSGxCLGNBQUUsVUFBRixFQUFjbUIsV0FBZCxDQUEwQixlQUExQjtBQUNIO0FBQ0osS0FORDtBQVFILENBckNELEVBcUNHQyxNQXJDSCxFLENBcUNZIiwiZmlsZSI6Im5ldy1hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oJCkge1xuICAgIFwidXNlIHN0cmljdFwiOyAvLyBTdGFydCBvZiB1c2Ugc3RyaWN0XG5cbiAgICAvLyBTbW9vdGggc2Nyb2xsaW5nIHVzaW5nIGpRdWVyeSBlYXNpbmdcbiAgICAkKCdhW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAobG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sICcnKSA9PSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCAnJykgJiYgbG9jYXRpb24uaG9zdG5hbWUgPT0gdGhpcy5ob3N0bmFtZSkge1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5sZW5ndGggPyB0YXJnZXQgOiAkKCdbbmFtZT0nICsgdGhpcy5oYXNoLnNsaWNlKDEpICsgJ10nKTtcbiAgICAgICAgICAgIGlmICh0YXJnZXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICh0YXJnZXQub2Zmc2V0KCkudG9wIC0gNDgpXG4gICAgICAgICAgICAgICAgfSwgMTAwMCwgXCJlYXNlSW5PdXRFeHBvXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQWN0aXZhdGUgc2Nyb2xsc3B5IHRvIGFkZCBhY3RpdmUgY2xhc3MgdG8gbmF2YmFyIGl0ZW1zIG9uIHNjcm9sbFxuICAgICQoJ2JvZHknKS5zY3JvbGxzcHkoe1xuICAgICAgICB0YXJnZXQ6ICcjbWFpbk5hdicsXG4gICAgICAgIG9mZnNldDogNTRcbiAgICB9KTtcblxuICAgIC8vIENsb3NlcyByZXNwb25zaXZlIG1lbnUgd2hlbiBhIGxpbmsgaXMgY2xpY2tlZFxuICAgICQoJy5uYXZiYXItY29sbGFwc2U+dWw+bGk+YScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcubmF2YmFyLWNvbGxhcHNlJykuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICB9KTtcblxuICAgIC8vIENvbGxhcHNlIHRoZSBuYXZiYXIgd2hlbiBwYWdlIGlzIHNjcm9sbGVkXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQoXCIjbWFpbk5hdlwiKS5vZmZzZXQoKS50b3AgPiAxMDApIHtcbiAgICAgICAgICAgICQoXCIjbWFpbk5hdlwiKS5hZGRDbGFzcyhcIm5hdmJhci1zaHJpbmtcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKFwiI21haW5OYXZcIikucmVtb3ZlQ2xhc3MoXCJuYXZiYXItc2hyaW5rXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7IC8vIEVuZCBvZiB1c2Ugc3RyaWN0XG4iXX0=
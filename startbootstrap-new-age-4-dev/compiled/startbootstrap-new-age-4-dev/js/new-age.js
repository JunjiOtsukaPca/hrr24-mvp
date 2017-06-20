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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3N0YXJ0Ym9vdHN0cmFwLW5ldy1hZ2UtNC1kZXYvanMvbmV3LWFnZS5qcyJdLCJuYW1lcyI6WyIkIiwiY2xpY2siLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwicmVwbGFjZSIsImhvc3RuYW1lIiwidGFyZ2V0IiwiaGFzaCIsImxlbmd0aCIsInNsaWNlIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsIm9mZnNldCIsInRvcCIsInNjcm9sbHNweSIsImNvbGxhcHNlIiwid2luZG93Iiwic2Nyb2xsIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImpRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxDQUFDLFVBQVNBLENBQVQsRUFBWTtBQUNULGlCQURTLENBQ0s7O0FBRWQ7O0FBQ0FBLE1BQUUsOEJBQUYsRUFBa0NDLEtBQWxDLENBQXdDLFlBQVc7QUFDL0MsWUFBSUMsU0FBU0MsUUFBVCxDQUFrQkMsT0FBbEIsQ0FBMEIsS0FBMUIsRUFBaUMsRUFBakMsS0FBd0MsS0FBS0QsUUFBTCxDQUFjQyxPQUFkLENBQXNCLEtBQXRCLEVBQTZCLEVBQTdCLENBQXhDLElBQTRFRixTQUFTRyxRQUFULElBQXFCLEtBQUtBLFFBQTFHLEVBQW9IO0FBQ2hILGdCQUFJQyxTQUFTTixFQUFFLEtBQUtPLElBQVAsQ0FBYjtBQUNBRCxxQkFBU0EsT0FBT0UsTUFBUCxHQUFnQkYsTUFBaEIsR0FBeUJOLEVBQUUsV0FBVyxLQUFLTyxJQUFMLENBQVVFLEtBQVYsQ0FBZ0IsQ0FBaEIsQ0FBWCxHQUFnQyxHQUFsQyxDQUFsQztBQUNBLGdCQUFJSCxPQUFPRSxNQUFYLEVBQW1CO0FBQ2ZSLGtCQUFFLFlBQUYsRUFBZ0JVLE9BQWhCLENBQXdCO0FBQ3BCQywrQkFBWUwsT0FBT00sTUFBUCxHQUFnQkMsR0FBaEIsR0FBc0I7QUFEZCxpQkFBeEIsRUFFRyxJQUZILEVBRVMsZUFGVDtBQUdBLHVCQUFPLEtBQVA7QUFDSDtBQUNKO0FBQ0osS0FYRDs7QUFhQTtBQUNBYixNQUFFLE1BQUYsRUFBVWMsU0FBVixDQUFvQjtBQUNoQlIsZ0JBQVEsVUFEUTtBQUVoQk0sZ0JBQVE7QUFGUSxLQUFwQjs7QUFLQTtBQUNBWixNQUFFLDBCQUFGLEVBQThCQyxLQUE5QixDQUFvQyxZQUFXO0FBQzNDRCxVQUFFLGtCQUFGLEVBQXNCZSxRQUF0QixDQUErQixNQUEvQjtBQUNILEtBRkQ7O0FBSUE7QUFDQWYsTUFBRWdCLE1BQUYsRUFBVUMsTUFBVixDQUFpQixZQUFXO0FBQ3hCLFlBQUlqQixFQUFFLFVBQUYsRUFBY1ksTUFBZCxHQUF1QkMsR0FBdkIsR0FBNkIsR0FBakMsRUFBc0M7QUFDbENiLGNBQUUsVUFBRixFQUFja0IsUUFBZCxDQUF1QixlQUF2QjtBQUNILFNBRkQsTUFFTztBQUNIbEIsY0FBRSxVQUFGLEVBQWNtQixXQUFkLENBQTBCLGVBQTFCO0FBQ0g7QUFDSixLQU5EO0FBUUgsQ0FyQ0QsRUFxQ0dDLE1BckNILEUsQ0FxQ1kiLCJmaWxlIjoibmV3LWFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7IC8vIFN0YXJ0IG9mIHVzZSBzdHJpY3RcblxuICAgIC8vIFNtb290aCBzY3JvbGxpbmcgdXNpbmcgalF1ZXJ5IGVhc2luZ1xuICAgICQoJ2FbaHJlZio9XCIjXCJdOm5vdChbaHJlZj1cIiNcIl0pJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywgJycpID09IHRoaXMucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sICcnKSAmJiBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyAnXScpO1xuICAgICAgICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogKHRhcmdldC5vZmZzZXQoKS50b3AgLSA0OClcbiAgICAgICAgICAgICAgICB9LCAxMDAwLCBcImVhc2VJbk91dEV4cG9cIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBBY3RpdmF0ZSBzY3JvbGxzcHkgdG8gYWRkIGFjdGl2ZSBjbGFzcyB0byBuYXZiYXIgaXRlbXMgb24gc2Nyb2xsXG4gICAgJCgnYm9keScpLnNjcm9sbHNweSh7XG4gICAgICAgIHRhcmdldDogJyNtYWluTmF2JyxcbiAgICAgICAgb2Zmc2V0OiA1NFxuICAgIH0pO1xuXG4gICAgLy8gQ2xvc2VzIHJlc3BvbnNpdmUgbWVudSB3aGVuIGEgbGluayBpcyBjbGlja2VkXG4gICAgJCgnLm5hdmJhci1jb2xsYXBzZT51bD5saT5hJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5uYXZiYXItY29sbGFwc2UnKS5jb2xsYXBzZSgnaGlkZScpO1xuICAgIH0pO1xuXG4gICAgLy8gQ29sbGFwc2UgdGhlIG5hdmJhciB3aGVuIHBhZ2UgaXMgc2Nyb2xsZWRcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJChcIiNtYWluTmF2XCIpLm9mZnNldCgpLnRvcCA+IDEwMCkge1xuICAgICAgICAgICAgJChcIiNtYWluTmF2XCIpLmFkZENsYXNzKFwibmF2YmFyLXNocmlua1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoXCIjbWFpbk5hdlwiKS5yZW1vdmVDbGFzcyhcIm5hdmJhci1zaHJpbmtcIik7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoalF1ZXJ5KTsgLy8gRW5kIG9mIHVzZSBzdHJpY3RcbiJdfQ==
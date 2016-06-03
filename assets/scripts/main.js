/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */
var wW, wH;

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        UTIL.layoutSettings(); 
        UTIL.eventHandlers();

      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    },
    layoutSettings: function() {
        wW = window.innerWidth, 
        wH = $(window).height();
        console.log('layoutSettings',wW,wH);
        if(wW > 1560) {
          //UTIL.scrollHandlers();
        }

    },
    scrollHandlers: function() {

            var easing = {
                // no easing, no acceleration
                linear: function(t) {
                    return t;
                },
            };

            // header minifies on scroll
            var scrolltimeout = null;
            var scrolldelta = Math.round(document.body.scrollTop || document.documentElement.scrollTop || 0);
            var scrolltemp = 0;
            var prevscroll = window.scrollY;
            var heroimage = $('#hero img');


            window.onscroll = function() {
                scrolltemp = document.body.scrollTop || document.documentElement.scrollTop || 0;
                scrolltemp = prevscroll - scrolltemp;
                scrolldelta -= scrolltemp;
                var herotemp = (scrolldelta / 2.4) - 600;
                //if (herotemp < 0) {
                //    herotemp = 0;
                //}
                  console.log(wW);

                  for (var i = 0; i < heroimage.length; i++) {
                          heroimage.css('transform', 'translateY(' + herotemp + 'px)');
                  }


                prevscroll = document.body.scrollTop || document.documentElement.scrollTop || 0;
            };


    },
    eventHandlers: function() {
            $(window).resize(function() {
                console.log('resizing');
                UTIL.layoutSettings(); 
            });
            var video = $('video')[0],
                videoCtrl = $('#video-ctrl');
            // JavaScript to be fired on all pages
            videoCtrl.on('click', function(event) {
              event.preventDefault();

              if(videoCtrl.attr('data-ctrl') === 'play') {
                videoCtrl.attr('data-ctrl','pause');
                video.play();
                videoCtrl.find('#label').text('PAUSE VIDEO');
                videoCtrl.find('#icon').removeClass('icon-play').addClass('icon-pause');
                return;
              }

              if(videoCtrl.attr('data-ctrl') === 'pause') {
                videoCtrl.attr('data-ctrl','play');
                video.pause();
                videoCtrl.find('#label').text('PLAY VIDEO');
                videoCtrl.find('#icon').removeClass('icon-pause').addClass('icon-play');
                return;
              }

            });
            $('#toggle-menu').click(function(){
              $(this).toggleClass('open');
              $('#nav-container').toggleClass('open');
            });

            $('#menu-menu-1>li>a').on('click',function(event) {
                event.preventDefault();
                if(this.href.indexOf('the-offer') !== -1) {
                  UTIL.goToSection('#the-offer',-170);
                }
                if(this.href.indexOf('downloads') !== -1) {
                  UTIL.goToSection('#downloads',0);
                }
                if(this.href.indexOf('contact') !== -1) {
                  UTIL.goToSection('#contact',0);
                }

            });

    },
    goToSection: function(id,offSetter) {
        $('html, body').animate({
            scrollTop: $(id).offset().top + offSetter
        }, 500);
    }


  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.

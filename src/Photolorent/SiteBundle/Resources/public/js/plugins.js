(function($) {

    /**********************************************************************************
     *
     * Easin
     *
     *********************************************************************************/
    // based on easing equations from Robert Penner (http://www.robertpenner.com/easing)

    var baseEasings = {};

    $.each( [ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function( i, name ) {
        baseEasings[ name ] = function( p ) {
            return Math.pow( p, i + 2 );
        };
    });

    $.extend( baseEasings, {
        Sine: function ( p ) {
            return 1 - Math.cos( p * Math.PI / 2 );
        },
        Circ: function ( p ) {
            return 1 - Math.sqrt( 1 - p * p );
        },
        Elastic: function( p ) {
            return p === 0 || p === 1 ? p :
                -Math.pow( 2, 8 * (p - 1) ) * Math.sin( ( (p - 1) * 80 - 7.5 ) * Math.PI / 15 );
        },
        Back: function( p ) {
            return p * p * ( 3 * p - 2 );
        },
        Bounce: function ( p ) {
            var pow2,
                bounce = 4;

            while ( p < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
            return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - p, 2 );
        }
    });

    $.each( baseEasings, function( name, easeIn ) {
        $.easing[ "easeIn" + name ] = easeIn;
        $.easing[ "easeOut" + name ] = function( p ) {
            return 1 - easeIn( 1 - p );
        };
        $.easing[ "easeInOut" + name ] = function( p ) {
            return p < 0.5 ?
                easeIn( p * 2 ) / 2 :
                1 - easeIn( p * -2 + 2 ) / 2;
        };
    });


    /**********************************************************************************
     *
     * Is on Screen
     *
     *********************************************************************************/
    $.fn.isOnScreen = function(){

        var win = $(window);

        var viewport = {
            top : win.scrollTop(),
            left : win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();

        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

    };

    /**********************************************************************************
     *
     * Preload slide
     *
     *********************************************************************************/
    $.fn.preloadSlide = function() {
        var $slides = this;
        $slides.each(function(index, element) {
            var $element = $(element);
            if ($element.isOnScreen() || $($slides.get(index-1)).isOnScreen() || $($slides.get(index-2)).isOnScreen()) {
                $element.attr('src', $element.data('src'));
            }
        });
    };

    /**********************************************************************************
     *
     * Follow Mouse
     *
     *********************************************************************************/
    $.fn.followMouse = function() {
        $.easing.smoothmove = function (x, t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        };

        var $element = this;
        $element.bind('mousemove', function(e){
            var center = $('body').width() / 2;
            var step = (e.pageX - center) / 50;
            if (e.pageX > center) {
                $('.slider .next').css({'opacity': step/10});
            } else {
                $('.slider .previous').css({'opacity': (-step)/10});
            }
            $element.find('img:first').animate(
                {
                    'margin-left': -step
                },
                {
                    queue:false,
                    duration:200,
                    easing:'smoothmove'
                }
            );

        });

    }
})(jQuery);
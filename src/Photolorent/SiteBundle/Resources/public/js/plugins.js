(function($) {
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

    $.fn.preloadSlide = function() {
        var $slides = this;
        $slides.each(function(index, element) {
            var $element = $(element);
            if ($element.attr('src') === '') {
                if ($element.isOnScreen() || $($slides.get(index-1)).isOnScreen()) {
                    $element.attr('src', $element.data('src'));
                }
            }
        });
    };

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
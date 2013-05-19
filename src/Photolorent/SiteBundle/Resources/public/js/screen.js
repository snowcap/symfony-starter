(function($) {
    $(document).ready(function() {
        var $slider = $('.slider');
        var $current = $('.current', $slider);
        var currentOffset = 0;
        $('img.slide', $slider).preloadSlide();
        $slider.followMouse();
        $('.previous', $slider).on('click',function(event){
            event.preventDefault();
            if (!$current.hasClass('first')) {
                currentOffset -= $current.offset().left - $current.prev().offset().left;
                $slider.stop().animate(
                    {
                        scrollLeft: currentOffset
                    },
                    1000,
                    function() {
                        $current = $current.removeClass('current').prev('img').addClass('current');
                    }
                );
            }
        });
        $('.next', $slider).on('click',function(event){
            event.preventDefault();
            if (!$current.hasClass('last')) {
                $('.slide', $slider).preloadSlide();
                currentOffset += $current.next().offset().left;
                $slider.stop().animate(
                    {
                        scrollLeft: currentOffset
                    },
                    1000,
                    function() {
                        $current = $current.removeClass('current').next('img').addClass('current');
                        $('.slide', $slider).preloadSlide();
                    }
                );

            }
        });
        $(document).on('mousewheel', '.slider', function(event, delta) {
            this.scrollLeft -= (delta * 100);
            event.preventDefault();
            $('.slide', $slider).preloadSlide();

        });
        $(document).on('click', '.menu li a:not([target="_blank"])', function(event) {
            event.preventDefault();
            var $link = $(this);
            $('.portrait').remove();
            var $loader = $('<div></div>').addClass('loader').appendTo($('body'));
            var $sight = $('<img/>').attr('src', photolorent.assets.sight).addClass('sight').appendTo($loader);
            var $objectiveTop = $('<div></div>').addClass('objective objective-top').appendTo($loader);
            var $objectiveBottom = $('<div></div>').addClass('objective objective-bottom').appendTo($loader);
            $('section').addClass('blur');

            var sightHeight = $sight.height();
            var sightWidth = $sight.width();
            for (var i=1; i<=10; i++) {
                var rand = Math.floor((Math.random()*10)+1) * 10;
                $sight.animate({
                    height: (sightHeight+rand),
                    width: (sightWidth+rand),
                    marginLeft: -((sightWidth+rand)/2),
                    marginTop: -((sightHeight+rand)/2)
                }, 250);
            }

            $.get($link.attr('href')).done(function(data) {
                $sight.stop().remove();
                $objectiveTop.animate({'height': '70%'}, 200, function() {
                    $(this).animate({'height': 0}, 100, function() {
                        $(this).remove();
                    });
                });

                $objectiveBottom.animate({'height': '70%'}, 200, function() {
                    $('section').removeClass('blur').html(data);
                    $('.slide', $slider).preloadSlide();
                    $('.slider').followMouse();
                    $(this).animate({'height': 0}, 100, function() {
                        $(this).remove();
                        $loader.remove();
                    });
                });
            });
        });
    });
})(jQuery);
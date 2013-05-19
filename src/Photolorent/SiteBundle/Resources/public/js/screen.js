jQuery(function ($) {
    $(document).ready(function() {
        $(".slider").mousewheel(function(event, delta) {
            this.scrollLeft -= (delta * 100);
            event.preventDefault();
        });
        $(document).on('click', '.menu li a:not([target="_blank"])', function(event) {
            event.preventDefault();
            var $link = $(this);

            console.log('click');
            var $sight = $('<div></div>').addClass('sight').appendTo($('body'));
            var sightHeight = $sight.height();
            var sightWidth = $sight.width();
            console.log(sightWidth, sightHeight);
            for (var i=1; i<=10; i++) {
                var rand = Math.random()+0.5;
                $sight.animate({
                    height: (sightHeight*rand),
                    width: (sightWidth*rand),
                    marginLeft: -(sightWidth*rand/2),
                    marginTop: -(sightHeight*rand/2)
                }, 500);
            }

            $.get($link.attr('href')).done(function(data) {
                var $objectiveTop = $('<div></div>').addClass('objective objective-top');
                var $objectiveBottom = $('<div></div>').addClass('objective objective-bottom');
                $objectiveTop.appendTo($('body')).animate({'height': '70%'}, 200, function() {
                    $(this).animate({'height': 0}, 100, function() {
                        $(this).remove();
                    });
                });


                $objectiveBottom.appendTo($('body')).animate({'height': '70%'}, 200, function() {
                    $sight.stop().remove();
                    $('section').html(data);
                    $(this).animate({'height': 0}, 100, function() {
                        $(this).remove();
                    });
                });
            });
        });
    });
});
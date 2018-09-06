var index = 0,
    flag = true,
    timer = null;
function init() {
    autoPlay();
    bindEvent()
}
init();
function autoPlay() {
    clearTimeout(timer);
    timer = setTimeout(function () {
        jus('right');
    }, 2500);
}
function bindEvent() {
    $('.index li').add('.left').add('.right').on('click', function () {
        if ($(this).hasClass('left')) {
            jus('left');
        } else if ($(this).hasClass('right')) {
            jus('right');
        } else {
            var i = $(this).index();
            jus(i);
        }
    })
    $('.wrap').on('mouseenter', function () {
        $('.cube').css('opacity', 1);
        clearTimeout(timer);
    }).on('mouseleave', function () {
        $('.cube').css('opacity', 0);
        autoPlay();
    })
}
function jus(a) {
    if (flag) {
        flag = false;
        if (a == 'left' || a == 'right') {
            if (a == 'left') {
                if (index == 0) {
                    $('.tupian').css({
                        'left': -5 * $('.tupian li').width()
                    })
                    index = 4;
                } else {
                    index = index - 1;
                }
            } else {
                if (index == 4) {
                    $('.tupian').animate({
                        'left': -5 * $('.tupian li').width()
                    }, function () {
                        $('.tupian').css({
                            'left': 0
                        })
                        autoPlay();
                        flag = true;
                    })
                    index = 0;
                } else {
                    index = index + 1;
                }
            }
        } else {
            index = a;
        }
        play();
        $('.active').removeClass('active');
        $('.index li').eq(index).addClass('active');
    }
}
function play() {
    $('.tupian').animate({
        'left': -index * $('.tupian li').width()
    }, function () {
        autoPlay();
        flag = true;
    })
}
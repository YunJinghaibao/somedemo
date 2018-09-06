(function ($) {
    function Broadcast(opt) {
        var opts = opt || {};
        this.upperNode = opts.upperNode,
        this.img = opts.image,
        // this.url = opts.url.length >= opts.image.length ? opts.url : ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#','#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
        // this.alt = opts.alt.length >= opts.image.length ? opts.alt : ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#','#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
        this.url = opts.url,
        this.alt = opts.alt,
        this.time = opts.time || 2000,
        this.btn = opts.btn || 'true',
        this.list = opts.list || 'true',
        this.index = 0,
        this.flag = true,
        this.timer = null,
        this.len = this.img.length,
        this.w = parseInt(this.upperNode.css('width')),
        this.h = parseInt(this.upperNode.css('height'));
        this.init();
        console.log(this);
    }
    Broadcast.prototype.init = function () {
        this.createDom();
        this.autoPlay();
        this.bindEvent();
    }
    Broadcast.prototype.createDom = function () {
        var len = this.len,
            str = '',
            indexStr = '';
        var tupian = $('<ul class="tupian"></ul>'),
            change = $(`<div class="change"><span class="cube left">&lt;</span><span class="cube right">&gt;</span></div>`),
            index = $('<div class="index"></div>'),
            ul = $('<ul></ul');
        for (var i = 0; i < len; i++) {
            str += `<li>
                        <a href="` + this.url[i] + `">
                            <img src="` + this.img[i] + `" alt="` + this.alt[i] + `">
                        </a>
                    </li>`
        }
        str += `<li>
                    <a href="` + this.url[0] + `">
                        <img src="` + this.img[0] + `" alt="` + this.alt[0] + `">
                    </a>
                </li>`;
        this.upperNode.append(tupian.html(str));
        $('.tupian').css({
            'width': (this.len + 1) * this.w,
            'height': this.h
        })
        $('.tupian li').css({
            'width': this.w
        })
        if (this.btn == 'true') {
            this.upperNode.append(change);
        }
        for (var i = 0; i < len; i++) {
            indexStr += `<li></li>`;
        }
        if (this.list == 'true') {
            index.append(ul.html(indexStr));
            this.upperNode.append(index);
            $('.index ul li').eq(0).addClass('active');
        }
    }
    Broadcast.prototype.autoPlay = function () {
        var self = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            self.jus('right');
        }, this.time);
    }
    Broadcast.prototype.bindEvent = function () {
        var self = this;
        $('.index li').add('.left').add('.right').on('click', function () {
            if ($(this).hasClass('left')) {
                self.jus('left');
            } else if ($(this).hasClass('right')) {
                self.jus('right');
            } else {
                var i = $(this).index();
                self.jus(i);
            }
        })
        $('#wrap').on('mouseenter', function () {
            $('.cube').css('opacity', 1);
            clearTimeout(self.timer);
        }).on('mouseleave', function () {
            $('.cube').css('opacity', 0);
            self.autoPlay();
        })
    }
    Broadcast.prototype.jus = function (a) {
        var self = this;
        if (this.flag) {
            this.flag = false;
            if (a == 'left' || a == 'right') {
                if (a == 'left') {
                    if (this.index == 0) {
                        $('.tupian').css({
                            'left': -(this.len * this.w)
                        })
                        this.index = this.len - 1;
                    } else {
                        this.index = this.index - 1;
                    }
                } else {
                    if (this.index == this.len - 1) {
                        $('.tupian').animate({
                            'left': -(this.len * this.w)
                        }, function () {
                            $('.tupian').css({
                                'left': 0
                            })
                            self.autoPlay();
                            self.flag = true;
                        })
                        this.index = 0;
                    } else {
                        this.index = this.index + 1;
                    }
                }
            } else {
                this.index = a;
            }
            this.play();
            $('.active').removeClass('active');
            $('.index li').eq(this.index).addClass('active');
        }
    }
    Broadcast.prototype.play = function () {
        var self = this;
        $('.tupian').animate({
            'left': -this.index * this.w
        }, function () {
            self.autoPlay();
            self.flag = true;
        })
    }
    $.fn.extend({
        broadcastPics: function (augs) {
            augs.upperNode = this || $('body');
            new Broadcast(augs);
        }
    })
})(jQuery)
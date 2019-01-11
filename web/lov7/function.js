/**
 * 如果浏览器大小改变
 */
window.onresize = function(){ init(true) }

/**
 * 初始化函数，布置场景，如果是移动端旋转90度，如果是PC端设置默认宽高
 * @param res
 */
function init(res) {
    var content = document.querySelector('.content');
    if (res) {
        document.body.style.width = window.innerWidth + 'px';
        document.body.style.height = window.innerHeight - 50 + 'px';
        content.style.marginTop = '50px';
        content.style.width = '60%';
        content.style.height = '75%';
    } else {
        if (window.orientation !== 90 && window.orientation !== '-90') {
            document.body.style.transform = 'rotate(90deg)';
            content.style.height = window.innerWidth + 'px';
            content.style.width = window.innerHeight + 'px';
        }
    }

    // 设置所有img宽等于高
    var img = document.getElementsByClassName('img');
    for (var i = 0; i < img.length; i++) {
        img[i].style.width = document.querySelector('.iceCsy_pic').offsetHeight + 'px';
    }
}

/**
 * 判断是否为电脑端浏览器
 * @returns {boolean}
 * @constructor
 */
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

/**
 * 垂直落体小水滴散开效果 (第二版) 初遇见你
 * @param i
 * @param index  index = 0 two, index = 1 two_2
 */
function vertical(i, index) {
    i ++;
    var o = i - 1,
        c = index > 0 ? 'two_2' : 'two',
        obj = $('.content .'+ c +' .show_pic .center_content');
    var style = [
        [
            {},
            {top: '50%', left: '40%', height: '2vh', width: '2vh'},
            {top: '50%', left: '300%', height: '2vh', width: '2vh'},
            {top: '25%', left: '250%', height: '2vh', width: '2vh'}
        ],
        [
            {},
            {top: '45%', left: '35%', height: '2vh', width: '2vh'},
            {top: '55%', left: '380%', height: '2vh', width: '2vh'},
            {top: '30%', left: '300%', height: '2vh', width: '2vh'}
        ]
    ];
    if (i <= 3) {
        obj.find('.span' + i).css(style[index][i]);
        setTimeout(function() {
            obj.find('.img' + i).show();
            obj.find('.img' + o).hide();
            obj.find('.span' + i).hide();
            vertical(i, index);
        }, 500);
    } else {
        shake(3, index);
        $('.content .'+ c +' .font_write').css({opacity: 1, left: '10%'});
        setTimeout(function() {
            $('.content .'+ c +' .font_write').css({left: '-40%', opacity: 0});
            $('.content .'+ c +' .center_content').css({left: '130%', opacity: 0});
            setTimeout(function() {
                if (index > 0) {
                    $('.content .two_2').hide();
                    // 第三版
                    $('.content .three').show();
                    colorAnimate();
                } else {
                    $('.content .two').hide();
                    $('.content .two_2').show();
                    vertical(0, 1);
                }
            }, 2000);
        }, 6000)
    }
}
/**
 * 水滴图片抖动效果 (第二版) 初遇见你
 * @param i
 * @param index index = 0 two, index = 1 two_2
 */
function shake(i, index) {
    var l = 0,
        ll = 0,
        t = 0,
        type = 'top',
        c = index > 0 ? 'two_2' : 'two';
    var s = setInterval(function() {
        ++ l;
        t += 0.1;
        if (l >= 15) {
            clearInterval(s);
            var ss = setInterval(function() {
                t -= 0.1;
                ++ ll;
                if (ll >= 15) {
                    clearInterval(ss);
                    shake(i, index);
                }
                $('.content .'+ c +' .show_pic .center_content .img'+ i).css(type, t + '%');
            }, 80);
        }
        $('.content .'+ c +' .show_pic .center_content .img'+ i).css(type, t + '%');
    }, 80);
}

/**
 * 颜色块动画 (第三版) 都是你
 */
function colorAnimate() {
    var one = 0;
    var start = setInterval(function() {
        one += 0.1;
        if (one >= 5) {
            clearInterval(start);
            $('.content .three .start').css({
                'transition': 'All 1s ease-in-out',
                '-webkit-transition': 'All 1s ease-in-out',
                '-moz-transition': 'All 1s ease-in-out',
                '-o-transition': 'All 1s ease-in-out',
            })
            $('.content .three .start').css('left', '75%');
            setTimeout(function() {
                $('.content .three .start').hide();
                $('.content .three .left_bottom .img_move1').css('opacity', 1);
                $('.content .three .left_bottom').animate({opacity: 1}, 200, function() {
                    $('.content .three .font1').css({'opacity': 1, 'left': '8%'});
                    $('.content .three .left_bottom').css({
                        'transition': 'All 1.5s ease-in-out',
                        '-webkit-transition': 'All 1.5s ease-in-out',
                        '-moz-transition': 'All 1.5s ease-in-out',
                        '-o-transition': 'All 1.5s ease-in-out',
                    });
                    $('.content .three .left_bottom').css('left', '36%');
                    setTimeout(function() {
                        $('.content .three .font1').css({'opacity': 0});
                        showColorPic(1);
                    }, 2000)
                });
            }, 1000);
        }
        $('.content .three .start .color').css('left', 10 - one + '%');
        $('.content .three .start .beautiful').css('left', 53 + one + '%');
    }, 15)
}

/**
 * 旋转图片并显示 (第三版) 都是你
 * @param i
 */
function showColorPic(i) {
    i++;
    if (i == 2) {
        $('.content .three .left_bottom').css({transform: 'rotate(-90deg)', left: '-140%', top: '-186%'});
        setTimeout(function() {
            $('.content .three .font2').css({'opacity': 1, 'top': '15%'});
            $('.content .three .left_bottom .img_move2').animate({opacity: 1}, 500, function() {
                $('.content .three .left_bottom').css({top: '-170%'});
                setTimeout(function() {
                    $('.content .three .font2').css({'opacity': 0});
                    showColorPic(i);
                }, 2000);
            });
        }, 1000);
    }

    if (i == 3) {
        $('.content .three .left_bottom').css({transform: 'rotate(-180deg)', left: '-228%', top: '28%'});
        setTimeout(function() {
            $('.content .three .font3').css({'opacity': 1, 'right': '15%'});
            $('.content .three .left_bottom .img_move3').animate({opacity: 1}, 500, function() {
                $('.content .three .left_bottom').css({left: '-220%'});
                setTimeout(function() {
                    $('.content .three .left_bottom img').animate({opacity: 1}, 500);
                    $('.content .three .left_bottom').css({left: '36%', opacity: 0});
                    setTimeout(function() {
                        showColorPic(i);
                    }, 1500);
                }, 1000);
            });
        }, 1000);
    }

    if (i == 4) {
        $('.content .three').hide();
        $('.content .four').show();
        autoPlayPic(0);
    }
}

/**
 * 图片动画 (第四版) 都是你
 * @param i i = 0 第四版 left， i = 1 第五版 right
 * @param String jsonSet
 */
function autoPlayPic(i) {
    var s = 0, p1 = 1, p2 = 1, p3 = 1, p4 = 1, p5 = 1, p6 = 1, p7 = 1;

    var a = setInterval(function() {
        s += 0.1;
        if (s >= 0) {
            if (p1 > 0) {
                asyncAnimate(i, 1);
                p1 = 0;
            }
        }

        if (s >= 0.5) {
            if (p2 > 0) {
                asyncAnimate(i, 2);
                p2 = 0;
            }
        }

        if (s >= 0.8) {
            if (p3 > 0) {
                asyncAnimate(i, 3);
                p3 = 0;
            }
        }

        if (s >= 1.6) {
            if (p4 > 0) {
                asyncAnimate(i, 4);
                p4 = 0;
            }
        }

        if (s >= 1.4) {
            if (p5 > 0) {
                asyncAnimate(i, 5);
                p5 = 0;
            }
        }

        if (s >= 2.2) {
            if (p6 > 0) {
                asyncAnimate(i, 6);
                p6 = 0;
            }
        }

        if (s >= 4) {
            if (p7 > 0) {
                clearInterval(a);
                asyncAnimate(i, 7);
                asyncAnimate(i, 8);
            }
        }
    }, 100);
}

/**
 * 给class添加css3动画样式 (第四版, 第五版) 都是你
 * @param int index  index = 0 left, index = 1 right
 * @param int value
 */
function asyncAnimate(index, value) {
    var style = [
        [
            [
                {},
                {width: '4%',  left: '23%',  top: '50%', height: '3%'},
                {width: '6%',  left: '29%',  top: '34%'},
                {width: '8%',  left: '12%',  top: '27%'},
                {width: '8%',  left: '38%',  top: '50%'},
                {width: '8%',  left: '2%',   top: '41%'},
                {width: '15%', left: '19%',  top: '51%'},
                {display: 'block'},
                {top: '86%'}
            ],
            [
                {},
                {},
                {width: '17%', left: '23%',  top: '16%', height: '15%'},
                {width: '11.7%', left: '6.7%',  top: '10%'},
                {},
                {width: '5.7%', left: '0.7%', top: '34%'},
                {width: '30%', left: '-28%',  top: '44%'},
                {width: '50%', left: '7%', top: '30%', transform: ' rotate(3deg)', height: '50%'},
                {width: '28%', left: '6%', top: '85%'}
            ]
        ],
        [
            [
                {},
                {width: '6%', left: '70%', top: '49%', height: '5%'},
                {width: '11%', left: '60%', top: '28%', height: '11%'},
                {width: '11%', left: '77%', top: '20%', height: '10%'},
                {width: '13%', left: '48%', top: '43%', height: '12%'},
                {width: '6%', left: '88%', top: '38%'},
                {width: '20%', left: '72%', top: '69%', height: '12%'},
                {display: 'block'},
                {width: '33%', left: '60%', top: '82%', height: '25%'}
            ],
            [
                {},
                {},
                {width: '15%', left: '60%',  top: '16%', height: '13%' , transform: 'skew(-13deg, 9deg) rotate(-18deg);'},
                {width: '22%', left: '80%',  top: '4%', height: '19%', transform: 'rotate(7deg)'},
                {},
                {width: '6%',  left: '92%', top: '39%'},
                {width: '16%', left: '94%', top: '50%', transform: 'skew(8deg, 17deg) rotate(-41deg)'},
                {width: '48%', left: '45%', top: '30%', height: '47%', transform: 'skew(2deg, 0deg) rotate(-2deg)'},
                {width: '30%', left: '60%', top: '86%', height: '24%'}
            ]
        ]
    ];

    var c = index > 0 ? 'five' : 'four';
    var s = value < 4 ? 3.5 : 2.5;
    $('.content .'+ c +' .left_pic .pic'+ value).css({
        'transition': 'All '+ s +'s ease-in-out',
        '-webkit-transition': 'All '+ s +'s ease-in-out',
        '-moz-transition': 'All '+ s +'s ease-in-out',
        '-o-transition': 'All '+ s +'s ease-in-out',
    });
    if (s < 7) {
        $('.content .'+ c +' .left_pic .pic'+ value).css(style[index][0][value]);
    }

    if (value == 7) {
        $('.content .'+ c +' .left_pic .pic7').show();

        setTimeout(function() {
            $('.content .'+ c +' .left_pic .pic2').css(style[index][1][2]);
            $('.content .'+ c +' .left_pic .pic3').css(style[index][1][3]);
            $('.content .'+ c +' .left_pic .pic5').css(style[index][1][5]);
            $('.content .'+ c +' .left_pic .pic6').css(style[index][1][6]);
            $('.content .'+ c +' .left_pic .pic7').css(style[index][1][7]);
            $('.content .'+ c +' .left_pic .pic8').css(style[index][1][8]);

            // show the font
            setTimeout(function() {
                var marginLeft = index > 0 ? '8%' : '0%';
                $('.content .'+ c +' .right_font').css({opacity: 1, marginLeft: marginLeft});
                setTimeout(function() {
                    if (index > 0) {
                        $('.content .five').animate({opacity: 0}, 500, function() {
                            $(this).hide();
                            close();
                        })
                    } else {
                        $('.content .four').animate({opacity: 0}, 500, function() {
                            $(this).hide();
                            $('.content .five').show();
                            autoPlayPic(1);
                        })
                    }
                }, 6000);
            }, 2500)
        }, 300)
    }
}

/**
 * 结束 （最后一版，紧跟第五版结束）
 */
function close() {
    var height = 0,
        obj = $('.content .end');
    obj.find('.top').css('top', 0);
    obj.find('.bottom').css('bottom', 0);
    var s = setInterval(function() {
        height += 0.1;
        if (height >= 50) {
            clearInterval(s);
            setTimeout(function() {
                var top = 50,
                    bottom = 50,
                    value = 0;
                var e = setInterval(function() {
                    value += 0.1;
                    if (value >= 20) {
                        clearInterval(e);
                        obj.find('.end').animate({opacity: 1}, 500);
                        obj.find('.end p:eq(0)').animate({marginTop: '10%'}, 500);
                    }
                    obj.find('.top').css('height', (top - value) + '%');
                    obj.find('.bottom').css('height', (bottom + value) + '%');
                }, 1)
            }, 1000);
        }
        if (height >= 40) {
            if (obj.find('.font').css('opacity') != 1) {
                obj.find('.font').animate({opacity: 1}, 500);;
            }
        }

        $('.content .end .top, .bottom').css('height', height + '%');
    }, 1)
}

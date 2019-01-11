$(function() {
    // 初始化
    init(IsPC());


    // 图片加载
    var imgdefereds=[];
    $('img').each(function() {
        var dfd=$.Deferred();
        $(this).bind('load', function() {
            dfd.resolve();
        }).bind('error', function() {
            // 图片加载错误
        })
        if(this.complete) setTimeout(function() {
            dfd.resolve();
        }, 1000);
        imgdefereds.push(dfd);
    })
    // 全部图片加载完成
    $.when.apply(null, imgdefereds).done(function() {
        document.querySelector('.zero').style.display = 'none';
        // 点击爱心开始
        document.querySelector('.heart').addEventListener('click', function() {
            $('.content .one').animate({opacity: 0}, 500, function() {
                $('.content .one').hide();
                $('.content .two').animate({opacity: 1}, 500, function() {
                    setTimeout(function() {
                        $('.content .two').show();
                        vertical(0, 0);
                    }, 1000)
                })
            });
            document.title = '谢谢从你的全世界路过';
            // 开始播放音乐
            var audio = document.getElementById('bg-music');
            audio.play();
        })
    });
});
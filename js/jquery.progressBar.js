    //动态添加html
    var html = '<div class="progressbar-mask"  style="display:none;"><div class="progressbar" data-perc="0"><div class="bar color4"><span></span></div><div class="label"><span></span><div class="perc"></div></div></div></div>'
    $('body').append(html)
        //动态引入CSS
    function includeLinkStyle(url) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }
    includeLinkStyle('./css/jquery-progress-bar.css');
    //设置进度条
    function getProgress(num) {
        $('.progressbar-mask').css('display', 'block')
        $('.progressbar').attr('data-perc', num)
        $('.progressbar').each(function() {
            var t = $(this);
            var dataperc = t.attr('data-perc'),
                barperc = Math.round(dataperc * 5.56);
            t.find('.bar').animate({
                width: barperc
            }, dataperc / 0.8);

            function perc() {
                var length = t.find('.bar').css('width'),
                    perc = Math.round(parseInt(length) / 5.56),
                    labelpos = (parseInt(length) - 2);
                t.find('.label').css('left', labelpos);
                t.find('.perc').text(perc + '%');
            }
            perc();
            var inter = setInterval(perc, 0);
            if (num == 100) {
                setTimeout(() => {
                    clearInterval(inter)
                    $('.progressbar-mask').css('display', 'none')
                    alert('上传完成')
                }, 1000)

            }
        });
    }
    //上传进度处理
    function xhrOnProgress(fun) {
        xhrOnProgress.onprogress = fun;
        return function() {
            var xhr = $.ajaxSettings.xhr();
            if (typeof xhrOnProgress.onprogress !== 'function')
                return xhr;
            if (xhrOnProgress.onprogress && xhr.upload) {
                xhr.upload.onprogress = xhrOnProgress.onprogress;
            }
            return xhr;
        }
    }
require([
    "gitbook",
    "jQuery"
], function(gitbook, $) {
    var conf;
    var rnd, pids = {}, plcs = {};

    function includeAsyncLib() {
        if (!window.AdButler){
            (function(){
                var s = document.createElement("script");
                s.async = true;
                s.type = "text/javascript";
                s.src = 'http://ab'+conf.key+'.adbutler-meson.com/app.js';
                var n = document.getElementsByTagName("script")[0];
                n.parentNode.insertBefore(s, n);
            }());
        }
    }

    function showAd($div) {
        var key = Number(conf.key);
        var zoneId = Number($div.data('zone-id'));
        var zoneSize = $div.data('zone-size');
        var width = Number(zoneSize.split('x')[0]);
        var height = Number(zoneSize.split('x')[1]);

        // Increment placement
        plcs[zoneId] = (plcs[zoneId] || 0) + 1;

        var pid = pids[zoneId] || rnd;
        var plc = plcs[zoneId] || 0;

        var abkw = window.abkw || '';
        var absrc = 'http://ab'+key+'.adbutler-meson.com/adserve/;ID='+key+';size='+zoneSize+';setID='+zoneId+';type='+conf.tagType+';sw='+screen.width+';sh='+screen.height+';spr='+window.devicePixelRatio+';kw='+abkw+';pid='+pid+';place='+plc+';rnd='+rnd+'';

        if (conf.tagType == 'iframe') {
            $div.html('<iframe src="'+absrc+'" width="'+width+'" height="'+height+'" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>');
        } else if (conf.tagType == 'js') {
            $div.html('<script src="'+absrc+'" type="text/javascript"></script>');
        } else if (conf.tagType == 'js-async') {
            $div.html('<div id="placement_'+zoneId+'_'+plc+'"></div>');

            AdButler = window.AdButler || {};
            AdButler.ads = AdButler.ads || [];
            AdButler.ads.push({
                handler: function(opt) {
                    AdButler.register(key, zoneId, [width, height], 'placement_'+zoneId+'_'+opt.place, opt);
                },
                opt: {
                    place: plc,
                    keywords: abkw,
                    domain: 'ab'+key+'.adbutler-meson.com'
                }
            });
        }
    }

    gitbook.events.bind("start", function(e, config) {
        conf = config.adbutler;

        if (conf.tagType == 'js-async') {
            includeAsyncLib();
        }
    });

    gitbook.events.bind("page.change", function() {
        // Reset states
        rnd = Math.floor(Math.random()*10e6);
        pids = {};
        plcs = {};

        $('.adbutler-ad').each(function() {
            showAd($(this));
        });
    });
});

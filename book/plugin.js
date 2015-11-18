require([
    "gitbook",
    "jQuery"
], function(gitbook, $) {
    var conf;
    var AD_RATIO = 728/90;
    var rnd, pids = {}, plcs = {};

    function showAd($div) {
        var zoneId = $div.data('zone-id');
        var zoneSize = $div.data('zone-size');
        var width = Number(zoneSize.split('x')[0]);
        var height = Number(zoneSize.split('x')[1]);

        // Increment placement
        plcs[zoneId] = (plcs[zoneId] || 0) + 1;

        var pid = pids[zoneId] || rnd;
        var plc = plcs[zoneId] || 0;

        var abkw = window.abkw || '';
        var absrc = 'http://ab'+conf.key+'.adbutler-meson.com/adserve/;ID='+conf.key+';size='+zoneSize+';setID='+zoneId+';type='+conf.tagType+';sw='+screen.width+';sh='+screen.height+';spr='+window.devicePixelRatio+';kw='+abkw+';pid='+pid+';place='+plc+';rnd='+rnd+'';

        if (conf.tagType == 'iframe') {
            $div.html('<iframe src="'+absrc+'" width="'+width+'" height="'+height+'" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>');
        } else if (conf.tagType == 'js') {
            $div.html('<script src="'+absrc+'" type="text/javascript"></script>');
        }
    }

    gitbook.events.bind("start", function(e, config) {
        conf = config.adbutler;
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

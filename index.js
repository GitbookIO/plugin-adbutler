module.exports = {
    book: {
        assets: "./book",
        js: [
            "plugin.js"
        ]
    },
    blocks: {
        adbutler: {
            process: function(block) {
                var conf = this.book.config.get('pluginsConfig.adbutler');
                var zoneID = (block.kwargs.zone || conf.defaultZone);
                var zoneSize = (block.kwargs.size || conf.defaultSize);

                if (!zoneID) throw new Error('Ad require a zone id and a set id');

                return ('<div class="adbutler-ad" ' +
                'data-zone-id="'+zoneID+'" ' +
                'data-zone-size="'+zoneSize+'" ' +
                '></div>');
            }
        }
    }
};
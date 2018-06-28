ds_helper = {}

ds_helper.now_tick = function()
{
    return Math.floor( Date.now() / 1000 );
}

module.exports = ds_helper;

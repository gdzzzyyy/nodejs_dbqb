const account_mgr = require('../game/ds_account_mgr');
const errcode = require('../def/errcode');
const data_table = require('../dt/data_table');
const util = require('util');

function get_cosume_items(line, hero_fragment_id)
{
    let citms = {};
    if (line.prop1Id > 0 && line.prop1Num > 0)
    {
        citms[line.prop1Id] = (citms[line.prop1Id] || 0 ) + line.prop1Num;
    }
    if (line.prop2Id > 0 && line.prop2Num > 0)
    {
        citms[line.prop2Id] = (citms[line.prop2Id] || 0 ) + line.prop2Num;
    }
    if (line.prop3Id > 0 && line.prop3Num > 0)
    {
        citms[line.prop3Id] = (citms[line.prop3Id] || 0 ) + line.prop3Num;
    }
    if (line.prop4Id > 0 && line.prop4Num > 0)
    {
        citms[line.prop4Id] = (citms[line.prop4Id] || 0 ) + line.prop4Num;
    }
    if (line.fragmentnum > 0)
    {
        citms[hero_fragment_id] = (citms[line.hero_fragment_id] || 0 ) + line.fragmentnum ;
    }
    return citms;
}

// 战斗开始
module.exports = async (ctx, next) =>
{
    let query 
    try
    {
        query = JSON.parse(ctx.request.body);
        if (query == null) 
        {
            ctx.state.code = errcode.REQUEST_ARGS_INVALID;
            return;
        }
    }
    catch(e)
    {
        ctx.state.code = errcode.REQUEST_ARGS_INVALID;
        return;
    }
    
    let acc_obj =account_mgr.get_acc_obj(query);
    if (acc_obj == null)
    {
        ctx.state.code = errcode.REQUEST_CONTEXT_INVALID;
        return;
    }
    
    if (!acc_obj.net_freq())
    {
        ctx.state.code = errcode.REQUEST_SO_FAST;
        return;
    }
    
    let level_up_id = parseInt(query.level_up_id); // 升级方式ID
    let hero_id = parseInt(query.hero_id); // 升级的英雄ID
    if ( Number.isNaN(level_up_id)|| level_up_id <= 0 ||
        Number.isNaN(hero_id)|| hero_id <= 0 )
    {
        ctx.state.code = errcode.REQUEST_CONTEXT_INVALID2;
        return;
    }

    let player = acc_obj.get_player();
    let hero = player.get_hero_mgr().get_hero(hero_id);
    if (hero == null)
    {
        ctx.state.code = errcode.HERO_NOT_EXIST;
        return;
    }

    let lv_line = data_table.get('levelup', level_up_id);
    if (lv_line == null)
    {
        ctx.state.code = errcode.STAGE_ID_INVALID;
        return;
    }
    
    let next_hero_level = hero.get_level() + 1;
    if (next_hero_level != lv_line.level)
    {
        console.log('next_hero_leve', next_hero_level, 'table_level', lv_line.level);
        ctx.state.code = errcode.HERO_CFG_LVLUP_FAIL;
        return;
    }

    let hero_line = data_table.get('hero', hero_id)
    if (hero_line == null)
    {
        ctx.state.code = errcode.HERO_NOT_EXIST;
        return;
    }

    let fragmentid = hero_line.fragmentid;
    let cosume_items = get_cosume_items(lv_line, fragmentid); 
    if (!player.levelup_hero(hero, cosume_items))
    {
        ctx.state.code = errcode.NEED_MORE_ASSET;
        return;
    }

    let new_hero_level = hero.get_level();
    ctx.state.code = errcode.OK;
    ctx.state.data = { 'hero_id': hero_id, 'hero_level': new_hero_level };

    console.log( util.format('hero levelup, uid=%d, hero_id=%d, new_level=%d', 
        acc_obj.get_uid(), hero_id, new_hero_level));
}
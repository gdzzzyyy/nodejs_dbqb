class ds_hero
{
    constructor()
    {
    }

    init_hero(type_id, level)
    {
        this.type_id =type_id; // 英雄ID
        this.level =level; // 英雄等级
    }

    get_type_id()
    {
        return this.type_id;
    }

    get_level()
    {
        return this.level;
    }

    levelup()
    {
        this.level++;
    }
}

class ds_heros
{
    constructor()
    {
    }

    init_heros()
    {
        this.heros= {};
    }

    get_hero(type_id)
    {
        return this.heros[type_id];
    }

    add_new_hero(hero_type_id, level)
    {
        if (this.heros[hero_type_id] != null)
        {
            return false;
        }

        let hero = new ds_hero();
        hero.init_hero(hero_type_id, level);
        this.heros[hero_type_id] = hero;
        return true;
    }

    //  load from db
    set_heros_data(datas)
    {
        this.heros = {};
        for(let hero_type_id in datas)
        {
            let obj = datas[hero_type_id];
            let level = obj['lv'] || 0;

            let hero = new ds_hero();
            hero.init_hero(hero_type_id, level);
            this.heros[hero_type_id] = hero;
        }
    }

    // to db
    get_all_hero_db()
    {
        let all_hero={};
        for(let hero_type_id in this.heros)
        {
            let hero = this.heros[hero_type_id];
            let level = hero.get_level();
            let data = 
            {
                'lv': level
            }
            all_hero[hero_type_id] = data;
        }
        return all_hero;
    }

    // to client
    get_all_hero_client()
    {
        let all_hero={};
        for(let hero_type_id in this.heros)
        {
            let hero = this.heros[hero_type_id];
            let level = hero.get_level();
            all_hero[hero_type_id] = level;
        }
        return all_hero;
    }
}

module.exports = ds_heros;

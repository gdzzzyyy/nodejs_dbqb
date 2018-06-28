class Table_battleprop{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get cd() { return this.data[1]; }; 
};
class Table_buff{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get HitRate() { return this.data[1]; }; 
get HitRateGrowth() { return this.data[2]; }; 
get Tag() { return this.data[3]; }; 
get AddType() { return this.data[4]; }; 
get BuffType() { return this.data[5]; }; 
get PropertyType() { return this.data[6]; }; 
get PropertyValue() { return this.data[7]; }; 
get DOTType() { return this.data[8]; }; 
get DOTValue() { return this.data[9]; }; 
get DOTValueGrowth() { return this.data[10]; }; 
get Round() { return this.data[11]; }; 
};
class Table_carryprop{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
};
class Table_chartab{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get key() { return this.data[0]; }; 
get value() { return this.data[1]; }; 
};
class Table_equip{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get name() { return this.data[1]; }; 
get slot() { return this.data[2]; }; 
get hpGrowth() { return this.data[3]; }; 
get phyGrowth() { return this.data[4]; }; 
get magGrowth() { return this.data[5]; }; 
get speGrowth() { return this.data[6]; }; 
get criGrowth() { return this.data[7]; }; 
get sidGrowth() { return this.data[8]; }; 
get scrGrowth() { return this.data[9]; }; 
get groupId() { return this.data[10]; }; 
get star() { return this.data[11]; }; 
};
class Table_equipgroup{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get name() { return this.data[1]; }; 
get hpGrowth() { return this.data[2]; }; 
get phyGrowth() { return this.data[3]; }; 
get magGrowth() { return this.data[4]; }; 
get speGrowth() { return this.data[5]; }; 
get criGrowth() { return this.data[6]; }; 
get sidGrowth() { return this.data[7]; }; 
get scrGrowth() { return this.data[8]; }; 
get equipgroups() { return this.data[9]; }; 
get equipprodes() { return this.data[10]; }; 
get specialEffectId() { return this.data[11]; }; 
};
class Table_fastprop{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get order() { return this.data[1]; }; 
};
class Table_hero{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get Name() { return this.data[1]; }; 
get Class() { return this.data[2]; }; 
get Prefab() { return this.data[3]; }; 
get Scale() { return this.data[4]; }; 
get MaxHp() { return this.data[5]; }; 
get PhysicalAttcak() { return this.data[6]; }; 
get MagicalAttcak() { return this.data[7]; }; 
get Speed() { return this.data[8]; }; 
get CriticalStruke() { return this.data[9]; }; 
get SideStep() { return this.data[10]; }; 
get ScrapeUpSpeed() { return this.data[11]; }; 
get AttackId() { return this.data[12]; }; 
get AttackScript() { return this.data[13]; }; 
get SkillId() { return this.data[14]; }; 
get SkillScript() { return this.data[15]; }; 
get TianFuName() { return this.data[16]; }; 
get TianFuDes() { return this.data[17]; }; 
get SkillName() { return this.data[18]; }; 
get SkillDes() { return this.data[19]; }; 
get LevelUpGroup() { return this.data[20]; }; 
get SpecialIds() { return this.data[21]; }; 
get fragmentid() { return this.data[22]; }; 
get need_fragment_num() { return this.data[23]; }; 
get hurt_height() { return this.data[24]; }; 
};
class Table_initprop{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get ID() { return this.data[0]; }; 
get count() { return this.data[1]; }; 
};
class Table_know{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get quest() { return this.data[1]; }; 
get option1() { return this.data[2]; }; 
get reward1() { return this.data[3]; }; 
get number1() { return this.data[4]; }; 
get option2() { return this.data[5]; }; 
get reward2() { return this.data[6]; }; 
get number2() { return this.data[7]; }; 
get option3() { return this.data[8]; }; 
get reward3() { return this.data[9]; }; 
get number3() { return this.data[10]; }; 
get right() { return this.data[11]; }; 
};
class Table_levelup{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get levelUpGroup() { return this.data[1]; }; 
get level() { return this.data[2]; }; 
get hpGrowth() { return this.data[3]; }; 
get phyGrowth() { return this.data[4]; }; 
get magGrowth() { return this.data[5]; }; 
get speGrowth() { return this.data[6]; }; 
get criGrowth() { return this.data[7]; }; 
get sidGrowth() { return this.data[8]; }; 
get scrGrowth() { return this.data[9]; }; 
get prop1Id() { return this.data[10]; }; 
get prop1Num() { return this.data[11]; }; 
get prop2Id() { return this.data[12]; }; 
get prop2Num() { return this.data[13]; }; 
get prop3Id() { return this.data[14]; }; 
get prop3Num() { return this.data[15]; }; 
get prop4Id() { return this.data[16]; }; 
get prop4Num() { return this.data[17]; }; 
get fragmentnum() { return this.data[18]; }; 
get icon() { return this.data[19]; }; 
get name() { return this.data[20]; }; 
};
class Table_lootpack{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get packId() { return this.data[1]; }; 
get itemTypeId() { return this.data[2]; }; 
get prob() { return this.data[3]; }; 
get min() { return this.data[4]; }; 
get max() { return this.data[5]; }; 
};
class Table_monster{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get Name() { return this.data[1]; }; 
get Prefab() { return this.data[2]; }; 
get Scale() { return this.data[3]; }; 
get MaxHp() { return this.data[4]; }; 
get PhysicalAttcak() { return this.data[5]; }; 
get MagicalAttcak() { return this.data[6]; }; 
get Speed() { return this.data[7]; }; 
get CriticalStruke() { return this.data[8]; }; 
get SideStep() { return this.data[9]; }; 
get ScrapeUpSpeed() { return this.data[10]; }; 
get AttackId() { return this.data[11]; }; 
get AttackScript() { return this.data[12]; }; 
get SkillId() { return this.data[13]; }; 
get SkillScript() { return this.data[14]; }; 
get LootPackId() { return this.data[15]; }; 
get hurt_height() { return this.data[16]; }; 
};
class Table_pagelist{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get name() { return this.data[1]; }; 
get stageId() { return this.data[2]; }; 
get floor() { return this.data[3]; }; 
get floorPut() { return this.data[4]; }; 
get stagePut() { return this.data[5]; }; 
};
class Table_prop{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get name() { return this.data[1]; }; 
get icon() { return this.data[2]; }; 
get desc() { return this.data[3]; }; 
get price() { return this.data[4]; }; 
get othername() { return this.data[5]; }; 
};
class Table_share{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get info() { return this.data[1]; }; 
get url() { return this.data[2]; }; 
get rewardid() { return this.data[3]; }; 
get num() { return this.data[4]; }; 
};
class Table_shop{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get packId() { return this.data[1]; }; 
get itemTypeId() { return this.data[2]; }; 
get prob() { return this.data[3]; }; 
get min() { return this.data[4]; }; 
get max() { return this.data[5]; }; 
};
class Table_specialeffect{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get type() { return this.data[1]; }; 
get target() { return this.data[2]; }; 
get group() { return this.data[3]; }; 
get value1() { return this.data[4]; }; 
get value2() { return this.data[5]; }; 
get value3() { return this.data[6]; }; 
get value4() { return this.data[7]; }; 
};
class Table_spell{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get Name() { return this.data[1]; }; 
get Type() { return this.data[2]; }; 
get Icon() { return this.data[3]; }; 
get CanBeStep() { return this.data[4]; }; 
get CanStruck() { return this.data[5]; }; 
};
class Table_spellaffect{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get Type() { return this.data[1]; }; 
get BaseValue() { return this.data[2]; }; 
get BaseGrowth() { return this.data[3]; }; 
get HpCoe() { return this.data[4]; }; 
get HpCoeGrowth() { return this.data[5]; }; 
get PhyCoe() { return this.data[6]; }; 
get PhyCoeGrowth() { return this.data[7]; }; 
get MagCoe() { return this.data[8]; }; 
get MagCoeGrowth() { return this.data[9]; }; 
};
class Table_stagelist{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get name() { return this.data[1]; }; 
get mapId() { return this.data[2]; }; 
get lootRefreshNum() { return this.data[3]; }; 
get lootPackId() { return this.data[4]; }; 
get lootDropNum() { return this.data[5]; }; 
get pageid() { return this.data[6]; }; 
get initadv() { return this.data[7]; }; 
get bosscome() { return this.data[8]; }; 
get StageTask() { return this.data[9]; }; 
get cost_power() { return this.data[10]; }; 
get win_add_exp() { return this.data[11]; }; 
get first_reward() { return this.data[12]; }; 
};
class Table_stagetask{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get name() { return this.data[1]; }; 
get target() { return this.data[2]; }; 
get taskitem1() { return this.data[3]; }; 
get itemid1() { return this.data[4]; }; 
get need1() { return this.data[5]; }; 
};
class Table_task{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get name() { return this.data[1]; }; 
get info() { return this.data[2]; }; 
get taskitem1() { return this.data[3]; }; 
get itemid1() { return this.data[4]; }; 
get need1() { return this.data[5]; }; 
get reward1() { return this.data[6]; }; 
get rewardid1() { return this.data[7]; }; 
get num1() { return this.data[8]; }; 
};
class Table_title{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get name() { return this.data[1]; }; 
get type() { return this.data[2]; }; 
get level() { return this.data[3]; }; 
get upId() { return this.data[4]; }; 
get proId() { return this.data[5]; }; 
get preId() { return this.data[6]; }; 
get cost() { return this.data[7]; }; 
get rank() { return this.data[8]; }; 
get hpGrowth() { return this.data[9]; }; 
get phyGrowth() { return this.data[10]; }; 
get magGrowth() { return this.data[11]; }; 
get speGrowth() { return this.data[12]; }; 
get criGrowth() { return this.data[13]; }; 
get sidGrowth() { return this.data[14]; }; 
get scrGrowth() { return this.data[15]; }; 
get specialEff1() { return this.data[16]; }; 
get specialEff1ID() { return this.data[17]; }; 
get specialEff2() { return this.data[18]; }; 
get specialEff2ID() { return this.data[19]; }; 
get specialEff3() { return this.data[20]; }; 
get specialEff3ID() { return this.data[21]; }; 
};
class Table_xianji{
constructor(dt){
this.data= dt;
};
_assign(dt){
this.data= dt;
};
get id() { return this.data[0]; }; 
get mapid() { return this.data[1]; }; 
get rewarditemid() { return this.data[2]; }; 
get attrid() { return this.data[3]; }; 
get attridnum() { return this.data[4]; }; 
get info() { return this.data[5]; }; 
};
module.exports={"battleprop": Table_battleprop,
"buff": Table_buff,
"carryprop": Table_carryprop,
"chartab": Table_chartab,
"equip": Table_equip,
"equipgroup": Table_equipgroup,
"fastprop": Table_fastprop,
"hero": Table_hero,
"initprop": Table_initprop,
"know": Table_know,
"levelup": Table_levelup,
"lootpack": Table_lootpack,
"monster": Table_monster,
"pagelist": Table_pagelist,
"prop": Table_prop,
"share": Table_share,
"shop": Table_shop,
"specialeffect": Table_specialeffect,
"spell": Table_spell,
"spellaffect": Table_spellaffect,
"stagelist": Table_stagelist,
"stagetask": Table_stagetask,
"task": Table_task,
"title": Table_title,
"xianji": Table_xianji,
};
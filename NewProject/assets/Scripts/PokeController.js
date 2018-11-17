// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        pokeUpNode: {
            default : null,
            type : cc.Node
        },
        pokeDownNode: {
            default : null,
            type : cc.Node
        },
        blinkPeriod:{
            default : 0.5
        },
        timer:{
            default : 0
        }
    },



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onEnable(){
        this.pokeUpNode.active = true;
        this.pokeDownNode.active = false;
    },

    onDisable(){
        this.pokeUpNode.active = false;
        this.pokeDownNode.active = false;
    },

    start () 
    {

    },

    update (dt) 
    {
        this.timer = this.timer + dt;
        if(this.timer > this.blinkPeriod){
            this.timer = 0;
            this.pokeUpNode.active = !this.pokeUpNode.active;
            this.pokeDownNode.active = !this.pokeDownNode.active;
        }
    },
});

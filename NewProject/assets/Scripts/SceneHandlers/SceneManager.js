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
        homeScene : {
            default : null,
            type : cc.Node
        },
        gameScene : {
            default:null,
            type: cc.Node
        },
        endScene : {
            default : null,
            type : cc.Node
        },
        gameRunning : {
            default : false
        },
        gameStartTimer : {
            default : 3
        },
        gameHandler:{
            default: null,
            type : cc.Node
        }
    },

    

    // onLoad () {},

    start () {

    },

    StartGameScene(){
        this.homeScene.active = false;
        this.gameScene.active = true;
        this.scheduleOnce(this.StartGame(), this.gameStartTimer); 
    },
    EndGame(){
        this.endScene.active =true;
    },
    ReturnToMain(){
        this.endScene.active = false;
        this.gameScene.active = false;
    },
    RestartGame(){
        this.endScene.active = false;
    },
    StartGame(){
        this.gameHandler.getComponent("GameHandler").StartGame();
    },
    

    // Life Cycle / Physics 

    update (dt) {},
});
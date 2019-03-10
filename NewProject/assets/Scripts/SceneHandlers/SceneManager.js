// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var SoundManager = require("SoundManager");
var SoundType = require("SoundType");

cc.Class({
    extends: cc.Component,

    properties: {
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
        congratsScene:{
            default: null,
            type :cc.Node
        }
        ,
        gameRunning : {
            default : false
        },
        gameStartTimer : {
            default : 3
        },
        gameController:{
            default: null,
            type : cc.Node
        },
        readySetGoText : {
            type: cc.Label,
            default : null
        }
    },

    start () {

    },

    StartGameScene(){
        this.homeScene.active = false;
        this.endScene.active = false;
        this.congratsScene.active = false;
        this.gameScene.active = true;
        //this.scheduleOnce(this.StartGame(), this.gameStartTimer);
        this.readySetGoText.String = "READY!!";
        this.readySetGoText.active = true; 
        this.scheduleOnce(this.StartGame, this.gameStartTimer);
    },
    StartGameSceneEnhanceDifficulty(){
        this.homeScene.active = false;
        this.endScene.active = false;
        this.congratsScene.active = false;
        this.gameScene.active = true;
        //this.scheduleOnce(this.StartGame(), this.gameStartTimer);
        readySetGoText.String = "READY"
        readySetGoText.active = true; 
        this.scheduleOnce(this.StartGameWithDifficultyIncrease, this.gameStartTimer - 1.5);
    },
    GameStarted(){

        this.readySetGoText.String = "GO!!";
        this.scheduleOnce(function(){
            this.readySetGoText.active = false;
        }, 1);

    },
    EndGame(){
        this.endScene.active =true;
    },
    StartCongratsScene(){
        this.congratsScene.active = true;
    },
    ReturnToMain(){
        this.endScene.active = false;
        this.gameScene.active = false;
    },
    RestartGame(){
        this.endScene.active =false;
        this.gameController.getComponent("GameControl").StartGame();
    },
    StartGame(){
		window.SoundManager.playSound(SoundType.ButtonPress, false);
        this.gameController.getComponent("GameControl").StartGame();
    },
    StartGameWithDifficultyIncrease(){
        this.congratsScene.active = false;
        this.gameController.getComponent("GameControl").StartGameEnhanceDifficulty();
    },
    
});

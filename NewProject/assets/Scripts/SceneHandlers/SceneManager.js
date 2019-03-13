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
        
        readySetGoLabel :{
            default: null,
            type : cc.Label
        },
        scoreText : {
            default: null,
            type: cc.Label
        }
    },

    onLoad(){
        
    },

    start () {
        
    },

    StartGameScene(){
        //play the button press sound here

		window.SoundManager.playSound(SoundType.ButtonPress, false);


        this.scoreText.string = "";

        this.homeScene.active = false;
        this.endScene.active = false;
        this.congratsScene.active = false;
        this.gameScene.active = true;

        this.readySetGoLabel.string = "READY!!";
        this.readySetGoLabel.active = true; 
        this.scheduleOnce(this.StartGame, this.gameStartTimer);
    },
    StartGameSceneEnhanceDifficulty(){

		window.SoundManager.playSound(SoundType.ButtonPress, false);

        this.scoreText.string = "";

        this.homeScene.active = false;
        this.endScene.active = false;
        this.congratsScene.active = false;
        this.gameScene.active = true;
        
        this.readySetGoLabel.string = "READY"
        this.readySetGoLabel.active = true; 
        this.scheduleOnce(this.StartGameWithDifficultyIncrease, this.gameStartTimer - 1.5);
    },
    GameStarted(){

        this.readySetGoLabel.string = "GO!!";
        this.scheduleOnce(function(){
            this.readySetGoLabel.string = "";
        }, 1);
    },
    EndGame( scoreVal){

        this.scoreText.string = scoreVal;
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
        this.gameController.getComponent("GameControl").StartGame();
    },
    StartGameWithDifficultyIncrease(){
        this.congratsScene.active = false;
        this.gameController.getComponent("GameControl").StartGameEnhanceDifficulty();
    },
    

    // Life Cycle / Physics 

    update (dt) {},
});

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


    properties: 
    {
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
        timer : {
            default: 0
        },
        level : {
            default : 0
        },
        cycleNumber : {
            default:0
        },
        threshold : {
            default : 5
        },
        command : {
            default: []
        },
        actionObject :{
            default : undefined
        },
        currentCommand:{
            default : "NONE"
        },
        score :{
            default : 0
        },
        sceneManager :{
            default : null,
            type : cc.Node
        },
        sceneTimer:{
            default : null,
            type : cc.Label
        },
        commandLabel:{
            default : null,
            type: cc.Label
        }
    },

    // Game Loop controllers

    SubmitCommand(sentCommand){
        if(sendCommand === currentCommand){
            AdvanceToNextCommand();
        }
        else{
            EndGame();
        }
    },

    GetNextCommand () 
    {
        let rand = Math.floor((Math.random() * this.command.length - 1) + 1 );
        console.log("RANDOM NUMBER : " + rand);
        return this.command[rand];
    },

    AdvanceToNextCommand(){
        this.currentCommand = this.GetNextCommand();
        this.timer = this.threshold;
        console.log("EVENT FIRED");
    },

    EndGame(){
        this.sceneManager.getComponent("SceneHandler").LoadScene("EndScene");
    },
   
    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {        
        this.command = ["POPIT","GUNIT","SHAKEIT","CRUSHIT"];
        this.sceneManager = cc.find("SceneHandler");
        this.timer = this.threshold;
    },

    start () 
    {
        this.currentCommand = this.AdvanceToNextCommand();

    },

    update (dt) 
    {
        this.timer = this.timer - dt;
        this.sceneTimer.string = this.timer.toString().split(".")[0];
        if(this.timer < 0){
            //End game transition
            this.EndGame();
            this.timer = 0;
        }
    },
});
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
        animationModule : {
            default : null,
            type : cc.Node
        },
        sceneTimer : {
            default : null,
            type : cc.Label
        },
        commandLabel : {
            default : null,
            type: cc.Label
        },
        handControlNode : {
            default : null,
            type : cc.Node
        },
        badAudioNode : {
            default : null,
            type : cc.Node
        },
        goodAudioNode :{
            default : null,
            type : cc.Node
        }
    },


    // Get the next command in the order (there currently is no object end to the experience)
    GetNextCommand () 
    {
        let rand = Math.floor((Math.random() * this.command.length - 1) + 1 );
        console.log("RANDOM NUMBER : " + rand);
        return this.command[rand];
    },

    // advance to the next command
    AdvanceToNextCommand(){
        this.currentCommand = this.GetNextCommand();
        this.commandLabel.string = this.currentCommand;
        console.log("Advance to this command : " + this.currentCommand);
        this.SignalCommandToHandControl(this.currentCommand);
        this.timer = this.threshold;
    },

    SignalCommandToHandControl(command){
        console.log("inside singal command to hand control");
        if(command == "POPIT"){
            this.handControlNode.getComponent("SwipingHandControl").RunAction("up");
        }
        else if(command == "GUNIT"){
            this.handControlNode.getComponent("SwipingHandControl").RunAction("poke");
        }
        else if(command == "SHAKITIT"){
            this.handControlNode.getComponent("SwipingHandControl").RunAction("shake");
        }
        else if(command == "CRUSHIT"){
            this.handControlNode.getComponent("SwipingHandControl").RunAction("down");
        }
    },

    // ends the game, triggers the transition to "EndScene"
    EndGame(){
        this.sceneManager.getComponent("SceneHandler").LoadEndScene();
    },

    //The input event calls this, this then handles the logic to see if the input
    // is correct or not
    SubmitCommand(sentCommand){        
        if(sentCommand == this.currentCommand){
            this.goodAudioNode.getComponent("AudioController").playAudio();
            this.AdvanceToNextCommand();
        }
        else{
            this.badAudioNode.getComponent("AudioController").playAudio();
            this.EndGame();
        }
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
        this.AdvanceToNextCommand();
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
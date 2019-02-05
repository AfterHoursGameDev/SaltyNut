cc.Class({
    extends: cc.Component,

    properties: 
    {
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
        gameCommandQueue :{
            default : []
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
        gameState: {
            default : null
        },
        currentState :{
            default : null
        },
        sceneManager :{
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

    /*
        Valid "active steps" are 
        * NONE
        * 
    */


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
   
    AdvanceScore(){
        this.score = this.score + 1;
        if(this.score % 10 === 0){
            this.TransitionToNextDifficulty();
        }
    },

    // State methods

    HandleState(deltaTime){
        this.timer = this.timer - deltaTime;
        switch(this.currentState){
            case this.gameState.NONE:
                break;
            case this.gameState.START:
                break;
            case this.gameState.GAME:
                RunGame(deltaTime);
                break;
            case this.gameState.TRANSITION:
                break;
            case this.END:
                break;
        }
    },

    // Game State Methods

    RunGame(deltaTime){
        this.sceneTimer.string = this.timer.toString().split(".")[0];
        if(this.timer < 0){
            //End game transition
            //this.EndGame();
            this.TransitionToEndGame();
            this.timer = 0;
        }
    },

    NextDifficulty(deltaTime){
        if(this.timer < 0 && this.gameCommandQueue.length > 0){
            
        }
    },


    // State transitions

    TransitionToNextDifficulty(){
        this.currentState = this.gameState.TRANSITION;
    },

    TransitionToEndGame(){
        this.currentState = this.gameState.END;
    },

    TransitionToGameStart(){
        this.currentState = this.gameState.START;
    },

    TransitionToNone(){
        this.currentState = this.gameState.NONE;
    },

    TransitionToGame(){
        this.currentState = this.gameState.GAME;
    },

    // State Object Constructors

    BuildTransitionQueue(){
        transitionQueue = [];
        //Add "SPEAK"
        transitionQueue.add(function(audioNode){
            audioNode.getComponent("AudioController").playAudio();
        });
        //Add "Pause"
        transitionQueue.add();
        //Add "SPEAK"
        transitionQueue.add(function(audioNode){
            audioNode.getComponent("AudioController").playAudio();
        });
        //Add "Pause"
        transitionQueue.add();
        return transitionQueue.reverse();
    },

    // State Object Methods 

    speak(audioNode){
        audioNode.getComponent("AudioController").playAudio();
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {        
        this.command = ["POPIT","GUNIT","SHAKEIT","CRUSHIT"];
        this.sceneManager = cc.find("SceneHandler");
        this.timer = this.threshold;
        this.gameState = {
            NONE : 0,
            START : 1,
            GAME : 2,
            END : 3,
            TRANSITION : 4
        };
        this.currentState = this.gameState.NONE;
    },

    start () 
    {
        this.AdvanceToNextCommand();
    },

    update (dt) 
    {
        this.HandleState(dt);
    },
});
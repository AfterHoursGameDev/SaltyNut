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
        
        //ArrowFlash Controllers

        UpArrowController :{
            default : null,
            type : cc.Node
        },
        DownArrowController : {
            default : null,
            type : cc.Node
        },

        // Scene Controller
        
        sceneController  : {
            default : null,
            type : cc.Node
        },

        // Booleans for game state
        gameRunning : {
            default : false
        },

        // Timers
        timer : {
            default : 0
        },
        maxWaitTime : {
            default : 3
        },

        // Difficulty mods
        listOfInputs:{
            default : []
        },
        inputLength:{
            default : 5
        },
        currentInputLimit :{
            default : 2
        },
        currentFlashInterval :{
            default : 1.5
        },
        flashDuration : {
            default : 0.5
        },
        currentInputIndex :{
            default : 0
        },
        flashCallback : {
            default : null
        },
        counter : {
            default : 0
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // TO - DO 

    /*
    *   Add the last button input on the end of ALL of the string of inputs
    *
    */

    // onLoad () {},
    StartGame(){
        this.currentInputLimit = 2;
        this.inputLength = 5;
        this.currentFlashInterval = 1.5;
        this.flashDuration = 0.5;
        this.listOfInputs = this.BuildInputList(this.inputLength);
        this.PresentInstruction();
    },
    StartGameEnhanceDifficulty(){
        console.log("INCREASING DIFFICULTY");
        
        this.currentInputLimit = 2;
        this.inputLength = this.inputLength + 1;
        this.currentFlashInterval = this.currentFlashInterval - 0.1;
        this.flashDuration = this.flashDuration - 0.05;
        this.listOfInputs = this.BuildInputList(this.inputLength);
        this.PresentInstruction();
    },

    PresentInstruction(){
        // Need to unschedule this from happening!!!!
        this.schedule(this.flashCallback,this.currentFlashInterval);
    },

    SendInput(value){
        if(value == this.listOfInputs[this.currentInputIndex]){
            // Valid input
            // play valid input noise
            // increment currentInputIndex
            this.currentInputIndex++;
            // check to see if the current round is over
            if(this.currentInputIndex >= this.currentInputLimit){
                this.currentInputIndex = 0;
                this.currentInputLimit++
                console.log("Player has finished the cycle");
                if(this.currentInputLimit == this.listOfInputs.length){
                    //The round is over, trigger a "congrats" and advance to next difficulty
                    this.gameRunning = false;
                    this.timer = 0;
                    this.PresentCongratulation();
                }
                else{
                    //The round isn't over, advance tp mext inputLimit
                    console.log("Presenting new instructions");
                    this.gameRunning = false;
                    this.timer = 0;
                    this.PresentInstruction();
                }
            }
        }
        else{
            // Invalid Input
            this.SetArrowAcceptInput(false);
        }
    },

    PresentCongratulation(){
        this.SetArrowAcceptInput(false);
        this.sceneController.getComponent("SceneManager").StartCongratsScene();
    },

    SetArrowAcceptInput(canAccept){
        this.DownArrowController.getComponent("ArrowFlashControl").SetAcceptInput(canAccept);
        this.UpArrowController.getComponent("ArrowFlashControl").SetAcceptInput(canAccept);
    },

    start () {
        
    },

    //

    BuildInputList(numInputs){
        let tempArray = [];
        for(let i = 0; i < numInputs; i++){
            let randNum = this.GetRandomInt(2);
            tempArray.push(randNum);    
        }
        tempArray.push(2);
        return tempArray;
    },

    GetRandomInt(max){
        return Math.floor(Math.random() * Math.floor(max));
    },

    //

    onLoad(){
        this.flashCallback = function(){
            
            if(this.counter < this.currentInputLimit){
                // this is where the flashing happens
                console.log(this.counter);
                if(this.listOfInputs[this.counter] === 0){
                    this.DownArrowController.getComponent("ArrowFlashControl").Flash(this.flashDuration);
                }else{
                    this.UpArrowController.getComponent("ArrowFlashControl").Flash(this.flashDuration);
                }
                this.counter++;
            }
            else{
                this.counter = 0;
                // This is where we allow user input
                this.gameRunning = true;
                this.unschedule(this.flashCallback);
                this.SetArrowAcceptInput(true);
            }
        } 
    },

    update (dt) {
        if(this.gameRunning){
            this.timer = this.timer + dt;
            if(this.timer > this.maxWaitTime){
                //the player has failed the input and game ends
                this.gameRunning = false;
                this.timer = 0;
                this.SetArrowAcceptInput(false);
                this.sceneController.getComponent("SceneManager").EndGame();
            }
        }
        else{
            this.timer = 0;
        }
    },
});

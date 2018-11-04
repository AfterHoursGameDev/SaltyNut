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
            default : 2
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
        
    },

    // Game Loop controllers

    GetNextCommand () 
    {
        let rand = Math.floor((Math.random() * this.command.length - 1) + 1 );
        console.log("RANDOM NUMBER : " + rand);
        return this.command[rand];
    },

    AdvanceToNextCommand(){
        this.currentCommand = this.GetNextCommand();
        this.timer = 0;
        console.log("EVENT FIRED");
        this.node.emit("advancecommandevent",{
            msg: "advance",
            score : this.score
        });
    },

    EndGame(){
        this.node.emit("endgameevent",{
            msg : "MESSAGE" 
        })
    },
   
    // LIFE-CYCLE CALLBACKS:

    

    onLoad () 
    {        
        this.command = ["POPIT","GUNIT","SHAKEIT","CRUSHIT"];
        console.log(this.command);
        this.node.on("inputevent",function(event){
            console.log("Event recieved!");
            
            if(this.currentCommand === event.detail.msg){
                //advance to the next state
                this.AdvanceToNextCommand();
            }
            else{
                //advance to the fail state
                this.EndGame();
            }
        }, this);
        

    },

    start () 
    {
        console.log(this.GetNextCommand());
    },

    update (dt) 
    {
        //this.timer = this.timer + dt;
        //if(this.timer > this.threshold){
            //End game transition
         //   this.EndGame();
          //  this.timer = 0;
       // }
    },
});

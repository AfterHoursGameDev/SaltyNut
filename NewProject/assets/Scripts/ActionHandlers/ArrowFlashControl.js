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
        AcceptInput : {
            default : false
        },
        dullArrow : {
            default : null,
            type : cc.Node
        },
        CanNode :{
            default : null,
            type : cc.Node
        },
        glowingArrow : {
            default : null,
            type : cc.Node
        },
        gameHandler :{
            default : null,
            type : cc.Node
        },
        glowingSpot :{
            default : null,
            type : cc.Node
        },
        dullSpot :{
            default : null,
            type : cc.Node
        },
        UpDownValue:{
            default : 0
        }

    },
    
    Flash(duration){ 
            
            this.dullArrow.active = false;
            this.glowingArrow.active = true;
        
            this.scheduleOnce(function()
            {
                this.dullArrow.active = true;
                this.glowingArrow.active = false;
            }, duration);
    },
    
    FlashCan(duration){
        this.CanNode.angle = -15;
		this.dullSpot.active = false;
		this.glowingSpot.active = true;
        
        this.scheduleOnce(function(){
            this.CanNode.angle = 0;
			this.dullSpot.active = true;
			this.glowingSpot.active = false;
        }, duration);
    },
    
    SetAcceptInput(acceptInput){
        this.AcceptInput = acceptInput;
    },
    InputEvent(){
        
        if(this.AcceptInput && (this.dullArrow != null)){
            this.gameHandler.getComponent("GameControl").SendInput(this.UpDownValue);
            this.gameHandler.getComponent("GameControl").IncrementScore();
            this.Flash(0.25);
        }  
        else if(this.AcceptInput && (this.CanNode != null)){
            this.gameHandler.getComponent("GameControl").SendInput(this.UpDownValue);
            this.gameHandler.getComponent("GameControl").IncrementScore();
            this.FlashCan(0.25);
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});

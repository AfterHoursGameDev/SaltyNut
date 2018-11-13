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
        touching :{
            default : false
        },
        eventFired:{
            default : false
        },
        gameHandler :{
            default : null,
            type : cc.Node
        },
        up :{
            default : false
        },
        motionLabel :{
            default: null,
            type:cc.Label
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            console.log("Mouse down!");
            this.touching = !this.touching;
        },this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE,function(event){
            if(this.touching){
                let dy = event.getDelta().y;
                console.log("The vertical delta : " + dy.toString());
                if(dy > 15){
                    console.log("Up swipe detected");
                    
                    this.eventFired = true;
                    this.up = true;
                }
                else if(dy < -15){
                    console.log("down swipe detected");
                    
                    this.eventFired = true;
                    this.up = false;
                }
            }
        }, this);
        
        this.node.on(cc.Node.EventType.TOUCH_END, function(event){
            this.touching = !this.touching;
            console.log("Mouse up!")
            if(this.eventFired)
            {
                this.eventFired = false;
                if(this.up){
                    this.gameHandler.getComponent("GameHandler").SubmitCommand("POPIT");
                }
                else if(!this.up){
                    this.gameHandler.getComponent("GameHandler").SubmitCommand("CRUSHIT");
                }
            }
            else
            {
                console.log("no swipe, but touch event detected");
                this.eventFired = false;
                this.gameHandler.getComponent("GameHandler").SubmitCommand("GUNIT");
                
            }
        },this);

        cc.systemEvent.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent,this);
    },

    onDeviceMotionEvent : function(event){
        

        // Need to define the behavior for this
        let magnitude = Math.sqrt(Math.pow(event.acc.x, 2) + Math.pow(event.acc.y, 2) + Math.pow(event.acc.z,2)); 
        
        //this.motionLabel.string = magnitude.toString();
        if(magnitude > 4){
            this.gameHandler.getComponent("GameHandler").SubmitCommand("SHAKEIT");
        }
    },

    start () {

    },

    // update (dt) {},
});

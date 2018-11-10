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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function(event){
            console.log("Mouse down!");
            this.touching = !this.touching;
        },this);

        this.node.on(cc.Node.EventType.MOUSE_MOVE,function(event){
            //console.log("Mouse moving!");
            if(this.touching){
                //console.log("DeltaX : " + event.getDelta().x + "DeltaY : " + event.getDelta().y );
                var dy = event.getDelta().y;
                if(dy > 15){
                    console.log("Up swipe detected");
                    this.node.emit("inputevent",{
                        msg: "swipeup"
                    });
                    this.eventFired = !this.eventFired;
                    
                }else if(dy < -15){
                    console.log("down swipe detected");
                    this.node.emit("inputevent", {
                        msg: "swipedown"
                    });
                    this.eventFired = !this.eventFired;
                    this.gameHandler.getComponent("GameHandler").SubmitCommand("CRUSHIT");
                }
            }
        }, this);

        this.node.on(cc.Node.EventType.MOUSE_UP, function(event){
            this.touching = !this.touching;
            console.log("Mouse up!")
            if(this.eventFired)
            {
                this.gameHandler.getComponent("GameHandler").SubmitCommand("POPIT");
                this.eventFired = !this.eventFired;
            }
            else
            {
                console.log("no swipe, but touch event detected");
                this.node.emit("inputevent", {
                    msg : "tap"
                });
                this.gameHandler.getComponent("GameHandler").SubmitCommand("GUNIT");
            }
        },this);

        cc.systemEvent.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent,this);
    },

    onDeviceMotionEvent : function(event){
        //console.log("X ACCEL : " + event.acc.x + " , Y ACCEL : " + event.acc.y);

        // Need to define the behavior for this

    },

    start () {

    },

    // update (dt) {},
});

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

        handNode : {
            default : null,
            type : cc.Node
        },
        arrowNode :{
            default : null,
            type: cc.Node
        },
        up:{
            default: true
        },
        bottomPosition:{
            default : 0
        },
        topPosition :{
            default : 0
        },
        verticalActions : {
            default : [],
            type : [cc.Action]
        },
        arrowRotation : {
            default: [],
            type: [cc.Action]
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        

    },

    start () {
        this.bottomPosition = this.handNode.position.y;
        this.topPosition = this.handNode.position.y;
        console.log(this.handNode);
        this.verticalActions[0] = cc.repeatForever(
            cc.sequence(
                cc.moveBy(1, cc.v2(0, this.bottomPosition + 350)),
                cc.moveTo(0,cc.v2(this.handNode.position.x, this.bottomPosition))
            )
        );
        this.verticalActions[1] = cc.repeatForever(
            cc.sequence(
                cc.moveBy(1, cc.v2(0, this.topPosition - 350)),
                cc.moveTo(0,cc.v2(this.handNode.position.x, this.topPosition))
            )
        );
        this.arrowRotation[0] = cc.rotateBy(0, 180);
        this.arrowRotation[1] = cc.rotateBy(0,0);
       // this.arrowNode.runAction(this.arrowRotation);
        this.RunAction("up");
    },

    RunAction(actionType){
        
        if(actionType == "up"){
            this.arrowNode.runAction(this.arrowRotation[1]);
            this.handNode.runAction(this.verticalActions[0]);
        }else{
            this.arrowNode.runAction(this.arrowRotation[0]);
            this.handNode.runAction(this.verticalActions[0]);
        }
    },

    update (dt) {
        console.log("The hand position" + this.handNode.position);
        if(this.up){
            
        }
        else{

        }
    },
});

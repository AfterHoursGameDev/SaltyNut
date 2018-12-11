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
        handNode : {
            default : null,
            type : cc.Node
        },
        arrowNode :{
            default : null,
            type: cc.Node
        },
        shakeNode :{
            default : null,
            type : cc.Node
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
        },
        shakeRotation :{
            default : null,
            type : cc.Action
        },
        pokeHandNode : {
            default : null,
            type : cc.Node
        }
    },
    onLoad () {
        

    },

    start () {
        this.bottomPosition = this.handNode.position.y;
        this.topPosition = this.handNode.position.y + 350;

        console.log("top position : " + this.topPosition);
        console.log("bottom position " + this.bottomPosition);

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
        
        this.shakeRotation = cc.repeatForever(
            cc.sequence(
                cc.rotateBy(0.25,180),
                cc.rotateBy(0.25,-180)
            )
        );
    },

    RunAction(actionType){

        // Set everything active to false

        this.arrowNode.active = false;
        this.handNode.active = false;
        this.pokeHandNode.active = false;
        this.shakeNode.active = false;
        //console.log(this.arrowNode.active);
                
        // Turn off all actions currently running actions

        if(this.arrowNode.getNumberOfRunningActions() > 0) this.arrowNode.stopAllActions();
        if(this.handNode.getNumberOfRunningActions() > 0) this.handNode.stopAllActions();
        if(this.shakeNode.getNumberOfRunningActions() > 0) this.shakeNode.stopAllActions();

        if(actionType == "up"){
            this.arrowNode.active = true;
            this.handNode.active = true;
            this.arrowNode.runAction(this.arrowRotation[1]);
            this.handNode.runAction(this.verticalActions[0]);
        }else if (actionType == "down"){
            this.arrowNode.active = true;
            this.handNode.active = true;
            this.arrowNode.runAction(this.arrowRotation[0]);
            this.handNode.runAction(this.verticalActions[1]);
        }else if (actionType == "shake"){
            this.shakeNode.active = true;
            this.shakeNode.runAction(this.shakeRotation);
        }
        else if (actionType == "poke"){
            this.pokeHandNode.active = true;
        }
    },
});

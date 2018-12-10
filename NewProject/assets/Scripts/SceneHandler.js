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
        score: {
            default : 0
        },
        labelStuff :{
            default : null,
            type : cc.Label
        }
    },

    // Custom Methods

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.game.addPersistRootNode(this);
    },

    LoadScene(sceneToBeLoaded){
        cc.director.loadScene(sceneToBeLoaded);
    },

    LoadGameScene(){
        setTimeout(function(){
            cc.director.loadScene("GameScene");
        },1000);
       
    },

    LoadMenuScene(){
        setTimeout(function(){cc.director.loadScene("IntroScene");},1000);
        
    },

    LoadEndScene(){
        setTimeout(function(){cc.director.loadScene("EndScene");
    },1000);
    },

    LoadDeviceMotionScene(){
        cc.director.loadScene("ShakeDetectionTest");
    },

    ShareToFacebook(){


	let myData = FBInstant.getEntrypointData() ;
	try{
        FBInstant.shareAsync({
            intent: 'REQUEST',
            image: myBase64Picture,
            text: 'Hey I\'m stuck on this puzzle! Can you help me?',
            data: myData,
        }).then(
            this.labelStuff.string = "PUSHED UP TO FACEBOOK"
        );
            //This will handle all of the generic facebook shenanigans
            console.log("This is where facebook stuff would be");
        }
        catch(e){
            this.labelStuff.string = "ERRRORRRORORRORO" + e.message;
        }
    }
    


    // update (dt) {},
});

cc.Class({
    extends: cc.Component,

    properties: {
        //-- 滚动的速度
        speed: 0,
        //-- X轴边缘
        resetX: 0
    },
	resetPos: null,
	
	onLoad()
	{
		this.resetPos = this.node.getPosition();
	},

    update (dt) {
//        if (D.game.state !== D.GameManager.State.Run) {
//            return;
//        }
		var pos = this.node.getPosition();
        var x = pos.x;
console.log("x=" + x + ", dt=" + dt + ", speed="+this.speed);
        x += this.speed * dt;
console.log("newx = " + x);		
        if (x <= this.resetX) {
			pos = this.resetPos;
        }
		else
		{
			pos.x = x;
		}
console.log("pos = " + pos);
		this.node.setPosition(pos);
    }
});

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
		var pos = this.node.getPosition();
        var x = pos.x;
        x += this.speed * dt;
        if (x <= this.resetX) {
			pos = this.resetPos;
        }
		else
		{
			pos.x = x;
		}
		this.node.setPosition(pos);
    }
});

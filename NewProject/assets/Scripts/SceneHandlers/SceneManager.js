// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var SoundManager = require("SoundManager");
var SoundType = require("SoundType");

cc.Class({
    extends: cc.Component,

    properties: {
        homeScene : {
            default : null,
            type : cc.Node
        },
        gameScene : {
            default:null,
            type: cc.Node
        },
        endScene : {
            default : null,
            type : cc.Node
        },
        congratsScene:{
            default: null,
            type :cc.Node
        }
        ,
        creditsScene : {
            default : null,
            type : cc.Node
        },
        gameRunning : {
            default : false
        },
        gameStartTimer : {
            default : 3
        },
        gameController:{
            default: null,
            type : cc.Node
        },
        
        readySetGoLabel :{
            default: null,
            type : cc.Label
        },
        scoreText : {
            default: null,
            type: cc.Label
        },
        scoreTextInGame : {
            default: null,
            type: cc.Label
        },
		scoreTextColorWaiting : {
			default: cc.Color.BLACK,
		},
		scoreTextColorActive : {
			default: cc.Color.BLACK,
		},
    },

    onLoad(){
        this.homeScene.active = true;
		this.endScene.active = false;
		this.congratsScene.active = false;
		this.gameScene.active = false;
		this.creditsScene.active = false;
    },

    start () {
        
    },

    StartGameScene(){
        //play the button press sound here

		window.SoundManager.playSound(SoundType.ButtonPress, false);


        this.scoreText.string = "";

        this.homeScene.active = false;
        this.endScene.active = false;
        this.congratsScene.active = false;
        this.gameScene.active = true;
		this.creditsScene.active = false;
		this.UpdateScoreInGame(0);
		this.scoreTextInGame.node.active = false;
		this.scoreTextInGame.node.color = this.scoreTextColorWaiting;
		this.scoreTextInGame.node.opacity = this.scoreTextColorWaiting.getA();

        this.readySetGoLabel.string = "READY!!";
        this.readySetGoLabel.active = true; 
        this.scheduleOnce(this.StartGame, this.gameStartTimer);
    },
    StartGameSceneEnhanceDifficulty()
	{
		window.SoundManager.playSound(SoundType.ButtonPress, false);

        this.scoreText.string = "";

        this.homeScene.active = false;
        this.endScene.active = false;
        this.congratsScene.active = false;
        this.gameScene.active = true;
		this.UpdateScoreInGame(0);
		this.scoreTextInGame.node.active = false;
		this.scoreTextInGame.node.color = this.scoreTextColorWaiting;
		this.scoreTextInGame.node.opacity = this.scoreTextColorWaiting.getA();

        this.readySetGoLabel.string = "READY"
        this.readySetGoLabel.active = true; 
        this.scheduleOnce(this.StartGameWithDifficultyIncrease, this.gameStartTimer - 1.5);
    },
    GameStarted()
	{
		this.scoreTextInGame.node.active = false;
        this.readySetGoLabel.string = "GO!!";
        this.scheduleOnce(function(){
            this.readySetGoLabel.string = "";
			this.scoreTextInGame.node.active = true;
        }, 1);
		this.scoreTextInGame.node.active = true;
    },
    EndGame( scoreVal)
	{
		this.scoreTextInGame.node.active = false;
        this.scoreText.string = "Score: " + scoreVal;
        this.endScene.active =true;
    },
	UpdateScoreInGame(scoreVal)
	{
        this.scoreTextInGame.string = "Score: " + scoreVal;
	},
	UpdateTurn(isInstructing)
	{
		if (this.readySetGoLabel.string == "")
		{
			if (isInstructing)
			{
				this.scoreTextInGame.node.active = true;
				this.scoreTextInGame.node.color = this.scoreTextColorWaiting;
				this.scoreTextInGame.node.opacity = this.scoreTextColorWaiting.getA();
			}
			else
			{
				this.scoreTextInGame.node.active = true;
				this.scoreTextInGame.node.color = this.scoreTextColorActive;
				this.scoreTextInGame.node.opacity = this.scoreTextColorActive.getA();
			}
		}
		else
		{
				this.scoreTextInGame.node.active = false;
		}
	},
    StartCongratsScene(){
        this.congratsScene.active = true;
    },
    ReturnToMain(){
		window.SoundManager.playSound(SoundType.ButtonPress, false);
        this.endScene.active = false;
        this.gameScene.active = false;
		this.scoreTextInGame.node.active = false;
    },
    RestartGame(){
		window.SoundManager.playSound(SoundType.ButtonPress, false);
        this.endScene.active =false;
		this.scoreTextInGame.node.active = false;
        this.gameController.getComponent("GameControl").StartGame();
    },
    StartGame(){
        this.gameController.getComponent("GameControl").StartGame();
    },
    StartGameWithDifficultyIncrease(){
		window.SoundManager.playSound(SoundType.ButtonPress, false);
        this.congratsScene.active = false;
        this.gameController.getComponent("GameControl").StartGameEnhanceDifficulty();
    },
    
    // Life Cycle / Physics 
    update (dt) {},

	CreditsOpenPressed()
	{
		this.homeScene.active = false;
		this.creditsScene.active = true;
	},
	
	CreditsClosePressed()
	{
		this.creditsScene.active = false;
		this.homeScene.active = true;
	},
	
	InvitePressed()
	{
		window.SoundManager.playSound(SoundType.ButtonPress, false);
		if (typeof FBInstant !== 'undefined') {
			FBInstant.shareAsync({
			  intent: 'REQUEST',
			  image:				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAKu1JREFUeNrEm3d01GX2/1+fNj0z6T0kEAKEDlIUEBRpsthFsCFgV4RVFHvD3lF0V1dx1cW2FhBxVVB67xASSEgvpEzq9PIpvz8mZHXLd/f72z3nO+c8JzPn5Mx8nuc+9973fb/vFSoqKvjfvHRdR9d1OpobiIRCGBh4uzpRTGZc8QmEwyEEQUCSZQRBRAC8ni4h4PMmBwL+Xoos53k9XWleT1dyOBRKBEO0WKytDqez3eGMbwkFgzVpGZl1kmJqMnRdtzviQIBgIICiKAiCCBhIkoxhaAQDIURJQJJkdF1HQMBkNpOUno1iNmMYxv+4H5n/5ksQUBQFwwBvV1ect6t9vLerc4rP2zU2Eg71C4dDyQGfTwwFgxiGjqZqaLqOLEnIsoxiNuGIcxotjbWdjri4cgNxX5wrcWNCUsoOq83WppjM6JqKrhv/tUf+jw/AMEAQBBSTiWgkLNbXVI3vbHfPD/g8Mz2d7emn6+vpaGulo62NUDCIqkYJh8PomoYoigiCiMlkQhBFwqEQVptVsFhtCfEJCaMTk1NGp2Vm3RmfmNhptcdtTEhM/Sg1I2tjnCs+bBgGhqr95zb7j1wgHEKSZZpPNyjt7ubZAb9naUdry8iaqgrqq6vx+3wEAwEEQUDXNCRZxmqz0ad/f6KRCJFIBF9XF56uLmx2O4IgEgmHiUYjqKqKrmmYTGasdhtZvXLJzc8nKSX1lDM+eWVO74L3XfHxfm+XB0EASf7/cwFpyZIl/0uLGxiGjhoJEQ6FqK+qmNZYX/Vlc0PNHQd27cw4sn8vNZWVBAMBIpEIJrOZSdOn8+jLL9PU0IC7qYmX33ufm+9exlU33EA4FGTz998zeMQI3v7iC+bdfjutzc0UHzmCxWpFkmWi0QjNjQ1UlJbS2tycBNqFAW/XnIDP32a1O45brNbu5zIQiMUfm8OJJMv/PRcQBAEQEEQwKQpN9XX5VadKVrS2NM4qPnyI2upKMECUJAYMGUrvvvmMnTiRYaNHg2HQUFfHk6+t4P2VK1l46cWsXP0Jw0dPJqd3LmaLmazcPOKcibz65CNs3bABi9V65siRZBnFMBAEgabTDTQ11JOakZk/cNiw1V0drXcmpmQsyc3vtx9UdF3/X7pA+al/K7hpqhr7q2kc3LF5flNdxeulxUXOokMHMXQdRTFhYKBGo7z79bckJCUQjUTpXTCcLz5cyUN3LqZgQF+sNjvVFeXk9unD7z//grTMfIqP7KRXn/689OiDfPPpJ9jj4hBFsefGiaKIYYBhxDYnSVJPHBkwZCjDRo1WE5LSHs/LH/Cc2Wo1JEn6t11AKD9Z/C/3L4oinR3tNNbVKVWnil9vdzfdvnvrFlrdLVgsViB2/aLRKPEJibz956+476b5uOITeW/t91RXHOeGWbOIhMOIgoCsKPg8HoaOGs2bn3yM3ZHFp6tW8Oz99+GKj8fo/s0zMefM7ZMkCVWNAgKaphKNRECApOQUzp44iZS0zLX5hUOvS03L9DuTUlDMln95AOK/lSoUEz6Px1Z6/NDX9dXlt2/49hvczU1YrTYEIfawkiSBYeB0ufjig1VUlZdTVV5GRelR8vL7kZmdg6qqiJKEqqqYrVZOFB2jsa4eiLDlh+9RTCaMbnczDKPn/RlXEITY52gkTP9Bg1n88MOIgojX42HDt+soLy2+9GTRwZ9bW5ozTGYLIPzL9S8PQDGZaHe3OIsO7lpfU1k26+e/fEfA7yctM5MLZs5E13SikSiqqiIrCvU11Xzx0Yc44uJodbs5fugQ4GDgsGHoqtpjUUkSwYBwJAyoBAP+2CGe2bQg9Hw+E+A0TUMQBELBILl98rnhjgd54LnnsFgsCKLA7i1bKD9xfGxp8YGfayvLciVJRNei/+MSZUXhny2r3U672+3ctvHb704WHT5/77atyLLMzMuv4LONP3HVgluIRMI9vhm7LQoWq5VwKIQkSRQdOgzAb66cjW4YPUFK0zRcCQm4XPGAhNPl+juAoWt/zfOCKCAIAgG/n76FhSx++FEgwOXXLiA7tzdaVEUURfbv3MmRfXsKj+ze/HNtWUkfRQAjGv6nSzR0g3+0REHE5/FIu7f8+HHVqZMTdm3ZgihJaLqOYjLR3NjEgCGjuP6224hEIiAIWK02REnCbDFz1fwFWG02tv+0kebGE4w8exyXXXMdZosFTdOIhCLccd8ysvNy0TQ/j778Kinp6WiqiihKCN0BV+pGiQIC4XAYV3w8L7zzPrJiwu9rx+dppauzHYvVSkp6OgJQdPgwxw8fzD92cOdXba3uBKvdjmwy/cMlaprK3y5d11BVlT1bNrx0uq5q1q7NmzFbLEiyjNls5qvVH7Fk3nW0t9ax6MHHOXfKFCKhEOFwmIDfT26fvlw1/xZESeoGThLhkI9Zs68kLSMTTdMwWcy8+cJzXHfhTK6eOpVlt9xE0B9AVhQ0TUUQRBTFhKZpaJpGMBAAw+Cplb8nJS2D395wDZ3tHYiSRDQSJatXLh//8ANTL74ERZY5vH8fZcVFww/s2vx+0B9EQPjHhhZFib9dFqudYwf3zKmvKb97208bESURURTRNQ1dN4hzumioqeGVxx8GTCx98mniXC4Cfh9+r4eJ02aQlZtPQmISZouZ91e8wuzzz+fW2VdSWVaKKIoEfD4mTZvO3IULuWr+QlwJCXi6OntcRJblWL2gadgdDsZMOJdlTz/D+MkX8tiS26guryDO6URTVfw+H464OOyORB5+8QVGjD0bAdi3Yzt1VacuPbB7y/1nvu9vl3TbLTf+yvqCKFBXVZlz/NDur/Zs2+rwebq6K68YEBFFAV3XMVssnDh2jKxemYwaN534BDuH9+7lmptuZvb8eezavJGDu3fT1FDP4X17CQWDOOPjcbriSUhO5pzzzmfMhAk8/9ADlBYd44rrrsdsttDU0ICqRgkFg8iKgq7r2OPieOTFl5g07UreeeVJPvnDuxQUFnL1TQtpc7spKynhlVV/Ys0nH/Hs/ffTfLqBgN+PKEm0tjSTnJJyttliW5+QlNKiRiM9cF6PFWLKr4EBIqdKjj578vix9IbaGgRRJBoJYrFaEbrTnSzLRKNRZEXhvddeZfCIYVxy9QKmX3oJB3ft4qbLLqfyVBk2ux2b3U6ffv3JyMohNTOD1PQMMrKyGDh8BG8+9zRBv4+g389Xq//EfU89T3xiMm2tbhrr62huqCcSCdPa3MzNV1zOC++8Q2d7G4IokJaZiShacTjjWP762+zZtoXXlj8eK8FFkQWLFrPpL99RVX6K4qOHHDZ73JvxSSnnmSxmw/gFWpR1Xe35YDKbKS06el51+cnrThw7imIy0W/QYFwuF2UlxTQ1nMZis6JpGnFxTkxmM1Xlp3j3tTd45q1VrFrxGh+9/Q6aruGIi6PvgELy8gsoGFjIoBHD6V3QF1d8ImBC0yLUVVciKyYEQeDme+5h6Kix5A/oS01FJcWHj3Dy+HGqTpVy6kQJwUCAZTffgtlixmqzISsKYOCKz6S6vJTnH1qGqmoYepSho0Zx670Pxgy04lXKSkrI61swsfxE0Y0jzz73vUg49ItawPgr1g/6A9RWlj7qbm5EVVUSkhJ58Z1VJKfl0NpSxZ6t2ziybx+1lZW0trTQWF9Hrz75dHW2sWTelez8+WcEUSA1LY2hZ41m4PARnDtlMr0L+gOxB45hLzEGRAxQo1EunjOXiVOvBKLYHYkMHJbEwGEjaayvYuuPG0nPyub44UOcrqtFlIRf1CY2WprKefD2m3A3N5ORnc28227jsusWIElmrr/tNg7s2sHB3bs5sn8fScmp93d1DvrcGZ/gPZNi5YDf32P9spJjM5pO100+fvhIjH1BIBIO4fe2IACzZl/NrNk3AipebyOna2qxxzm5dfZsGuvrMFssZOfmMXz0WCZMmcy5U6YjijZAJxr1UH6ihOIjR6goLcXd2ESb243d4aC2ooIXHrqT3Px8CocOpf/gwVisSWRk92fujb0pGLid+MQkig7up7T4eLex/Hg6a3l88SJKjh5l4V13Me+Ou0hIyqWxroR3XrmXYCDQzTkInK6ro6G2pm9VWcn8kWefu1KLRrqDrSL3FDvNDTWLq8vLYxFf13A3N/PsA/dx+7JlPHDrrTzz1u8JBf20uVvo3a8fAwaP5/Wnl9Ha0oxiMtG3/wBGnj2OmVdeTv9B5wAhyk/s56dv17N1ww+0NDUTjURJSUsjMSWZzvY2TGYzCALFR47y1Z9W40qIxxnvYsIFFzD14osZNHwMZ50znfSsbL75LA6T2czxw4c4UXSMuVMuoL62loWLFrHk0ZcJ+Ft55+VH+Wr1alqbW1DMJuwOB+mZmbQ0NXOi6BiZObm35fTu+wer3RE2dB1ZFEBWZOpPVw7t6mibVlV+Ck3XMLoj/daNGxg4bDh/XLeOUydL+O28GwgFg2Tk5LDgzkV8/v4qMAz6DijkrHPGM3v+ArJ6FVJffYy3X3qJn9Z/Szgci+gZWTnMmn0VkiSzYd1aJEnqKXF/c+VsRo+fwP6d2yg+fJjK0lI+efddJk2fzq333ktB4Tlce/NtiEIMvZeVFMcyi8vFb2bPBTwsu3k+Wzf8iMPpwhZnx9vZxZjxE7jlnrtZeOmlscDaWD+wqb7uN4OGj/46Eg4harqOrhs0NdRfXV9TLYWCAUQhRjIagCs+gdV/eJvOdg91lfX4PB7inE78Xi+vLX8STddJSUtnyFmjuHjuNWT1KmTNx29x9dQLaGlqYtDw4ZhMZixWK/XVVUQjUaLRCCeLirDYbLHrWVuL3xurL44fOoTN4cBitZKX35dQIMQ1U6fy/hvLcSUkceX8mxg8ciRZvXJRo1GsNjvJqWn8/N16dm7aRGZODooiE/D6yOzViyuuv4EhZ01m7o03EQwGqKmsoLmx7hq/z0M0GkGUZYVgICh1tLVcVFtV1V3hCTHw0533RUHgwdtv5uxJ5zJ7/nwGjRiBopgQu1Pi0FGjmDh1Bn36FfLMfTezfOlSQqEQbe4WJk6bjgFoqkpSWhoOpxNXQgK9evcmHAwSjUZxJSaSmJKMIEB2Xm8i3XTZBbMuIhgMAPDG009zz/y5OBx2Zl4xl34DB2GxWOnsaOPAzu2kZ+VgYNDe2oogCNyydClrd+wgNTONN597AKvNit0ex+m6OrraW8/vaHOnybKMdOtNC2hqqBtaWVby6NED+wQA3TDQVBVd07FabZgtFirLStE0ncdeeZeBQwex/ovPwDDo1bsP55w3memXXM4jd97E2k8/weF0oigK7uZGcnr3ITM7m+IjR7hj2QPs2ryJ/Tu2M3/RXRw9sB81EmHRgw+zfeMGdm/dwpwFN7J7y2ZGjRtPWmYW33/9FRarFbPFQllxCSeOHmT2DTcSCPjpbGulvqaGkqNHuPbm2+jTrx82h50nXnudaRdfxVvPPcXypUvZumETh3bvwmqzEgmHycjOtialZu5OSc86IS26/XZqKsvmlBUfu7CuqhJd1wkHg+Tk5REKBvD5fJhMJrJ69aLo0CFmXDaT37/0AiXHjmKxWjnrnPFcft0NfPDma6z9ZDVDzhpFa3MzoiQhyTKlx4s4d+p0xk2+gPKTJ9ixcQOdHW2crqvj+tvuZMyEc/n5u285sGsXPk8Xqqpy5fU3kJqRwZ8/eL+HEQr4/Vx9080cPbCfooP7uPKGG6mvqaK58TStzc0c2rubS+bOYcZll3H80AEe/+1dbPhmHQOHDmPxww9hsVjo6uzsgc3pmVnupJTU72XFbMXv7TqntaUFTdNIT0tn8SMP44pP5I65cxg6ahTP/u53ZGTnsP6Lz7nj6rm0nG5EkiTSs7IZOGQ4VWUnWf3O71EUhfOmzyAajVBZWoooSRi6jq5pFA4ZysZ1azEEgYTEZAaNGIHf50UQRPL7F1JXVU1HWys15ae4aPZVeD0ewqEQqholGAgwcdo0EpOTaW1pYeP6dUy56DJGjh1H6fEiPJ2dnCw6zo2XXobNYcfv9SIIAvY4B5WnSikrPs7Lq/7E2y8/y5vPP0ubuwWft+vsYDCUIKqaJgT9/kGejg5UNcrgkWcxZsIFPL3sXhwuJ8vfeJOM7EL8Pi+zZl/LgCFDY34pCKRnZdNv8CC++Wx1jF6SRNZ9/imXXn0t8YmJxCckcM8Ty6mvqeGp++7h8mvnMWDwEGbNnoMsK7zzyku88exy/D4vF8+9mozsHG5YtJj3VrzGz9+tZ8mjj5ORncM5k87j7Inn8ae3f48sSZjNVr5e/QF9+heQ1SsXi8WKtTughkMhTBYzkUiEgN9PwB/gvRW/Y+0nf8RmsyHLCp7OLvxeX34wEOgjd3W0JgUDvpxAwI8giAwfPYo/rnyFkqMneej5p8jJG0xp8R4WXTOXO+9/gHMvmMb3X33ZnV+zSUpNprKsFLPZjCTJVJSWse7zz3jguRcJ+Px88t7bHN23D1kx8eJjjxLnjKO8tBQ1quJwxmG2WPnxm28QBAGz2cyK5U/i83goLS7G3dTEbUuXISsKzz24jI621lh8MSnUV1VhsZjJ7JWL3eGguamR0ePGEQyE8Hk9DBw2DJvNRlpmJv0HD2L0hPFs+ssPsUOKhIlGQwnuxvo+sq+zPT0cDruikQiyrNC7oJC66ipGjh3BnIULgTArlj9JRWkNwUCQSDiKIArEOV2kZmSQkZXZrewIiKLIxXPm0m/wYH5c+zV2ZzyCpHDh7Dnk9u5DanoqLlccDrsVk6IgEKswdSAaUfEHgnR5fLhb3NRVV1NaXMzLjz/GoOHDue7W26mrrmLbhh/xerqQFIXk9FTSM7NwxsdTV1NFbn4/7n3yyRjnaEn+Jb0EaGT1ysFkMhMNh/F5vPj9vmxZFISUcCgkhEMhdF2j6PAB7l3+LF6PB0dcJt/++V12bPqZrF6pFA4dwpvPPYcoSiQkJpGUmoqsJDHjssv53QvPY7ZY6ersYM+2bRQOGcLAwr5cNmsSRtBDoL0Zb9spQs0eWlU1Rnl1V2WSLCOKErLZQrLdQa+cJCYMnYAwewYdPpVjxaXs3bETRZZQFBNBf4ApF12EyZRCUmoKDqcLAYHKspNIsoXT9aWcOPY91eUVeLu6aHO76ero4LFXX2XwiBEc3LMbVVNpa25MlktLjqdFo1EMw8BkNvHJu+8wYPAghowcwep3XuT3L75EaloaL733R3r1HkjlqTJESSQ+MYn4xAQgwrW33sHBXTvZu307I88+h4njR9BWeoCGI9/TrqrYElJwJKXhyu5LujOBlsoSWipPIMkKGBCJRGJMsM9Lp7sJQy/D0GMEqDXOyVm9BzD9/Ns4VFzF0f17KRw6lAWLlgAR4hMTMJutiJJEKBjk+zWf8VQ3DjlDiUcjEYaPGUNaRh9yeuexZ9tW1KiKx9PplEuOHJATEhMAsFhtRMJh7rvpJmx2Ox3tbUiSxOJHHsFsMfHOK08jimI3Fd2JyawAGiaTiYdefI1De3dRkCSw79PXScrtT+EFV2J1xhMNhwh0tBLyd9HeUIW/ow1BEGOFqACiIP6VcJEVDM5QVjqqZlBVtJ/yQzsZev5FPP7aCrJz++CMTwKimEwmZEXqxiplPHf/AxgGOOLi0LoF2IDfz3W33M7n7/+Ov3z1FTaHA8PQCIeCkix2U88IsZMyDAPFpBAI+LHabIiiyB9XrqS9rRUtqmK2Wnpy8xnGXtPCZORkMStnDt++sIiC8ReS2nsAp/b8hKelgbDfi6FrIAgIgogoKwiSBBiIonRGde1mf0V0VcWVmklccjr2xDS87tOIkkLZ/u1c/ODvMFkdaFoASbLEso8gdLuUFmN5FLlHQRIEEYvVyqer/kBFaSmKosRI3JjghTh89DmRaFQFIyZ1I8QoL0VRuiUpHa/HEwt0koimaRiAYQhEImqPwKDrKroeQVJM2BPSKNv5IwCRgB/JZEY2W5FNFqRuAiR25rEHN3Q99jQQs7ymYXUlEZecjayYMVnjsCekIimxG6cbkZ7fjUZVVE2P0Qvd2sGZPWiahq7HbsHJoiIMw+gRTGPcpyMqZuflNymKgihJiKIQ+1pB6KGlQ8EQPk8XHe1tXL3wRgYPH4EaiRAM+PF0dHZH2BiPL4oKZoeTkK+TuJRMeg05F4QzJ/tXlUcQYr9jGAa6bvT46hnlWddUHAmpREO+mOYgQDjQhcnmQDKZe74PBLxdXYQCAaKRKI64OB554UWcTlfMpUSxR1SRFaVbptcxiH12JSR6REEQ3CaLRTtDHIRDIXxeL56uLhRF4exJk7hl6VJeWfU+S598lhFjxxFVowT8PtzNzUD0l2o7ztQsAl1tmO1OuporkRRzzyEZv3jwX6YoQRAwuhUjQZQQRJG4lCyi4RCRgB97QgqdTfXEpWQiSb8WPFuamvD7vETCYQoKB3Hx3FtISU8nHAph6DHm9wzbHcs4EmazGVmWsTsczbIjztFotzvazRZLSjAQ4Kr5C9A0lZzcPCZMuYDc/H6AFYh9wfDRZ6EoJrxdnbibGuls78SV6ETXdMAgNW8ARRu/IDGrNyVb1qKYbbEN/8LqMaue0eeMngAoCCK6phKXkomhq5htcQS62ojP7E1XYw29ho7tkTMFQSAaDeJujB2Aze4gOy8Hr6eBBYsWc8/Ced3/J6KqUWRZRpIVREFEVVUsFiuJSamnxWhU7VQslnpHXByhYJDMnN488OxbXHvrfWTn5gNQfuIAzz+0iPtuuoq8ggKye+XS2dFB0+kGaioqEDB32zJKcl5/IkE/J7asQzFbf+Uixi+tbxi/ugjddwQ1GiF32Dg6TlfjSEqLNWL4OolGQqTmDwTUbh9WaKpvoOl0rAVHMSl8++cvuXbaVIaNGcOc+Qvp6uggGo3dUL/Xi6IoaJqG0xWP1e5wxyellIt2hxOrxVaUkJiMIAj8sPZLfJ56Xn7st1x27jl88OYbNDc2svqdd4hEImTn5pKdl0ckHKaxvp4TR48BsQiuaxr2+FRS+wwk5Ov6J4L8P3wLRqwMN1lsBLpaEUQRj7uBhKzenC49TFJ2PgkZeWg9LLZCydFjNDU0EAgEsNnt2O12PF1d1FdXct/Tz3L3Y48zYPAQbHY7cxbeiCs+gWDAj8Vmxe5wnDJbzFWiJAm4EhO3p2dlIsZEESrKTvH9mjUc3neCro4Oxk/+DdtLT/Dq+x+haSKd7e2YzGbqa6spO1FMfU0NkmTq2Uv+2AsQu6PtGaX3TNT/q9xNDwr8pSAqSBI1R3aRXjCEtvoKbK5EmsqO0W/8DEQxFgAlSabNfZqigweoLCslHApx9U03s+qbtXy6YQODR4xHECzcuORRVq1dz6cbfmTxI8ux2GwYhk56Zhb2OOfOOKfTK9scTpJTM3e6EpI0q80udbS3U1NewZMrXufgrp3csnQpmupD0w0iET+frlpFdUU5islE0O+nrKSYXZs2cdWCG2OYQI+QXjCEjH7DaDpVFEt7Z7R+Ufh1w0J3uuq5AoJANBRg6PQ5NJYeJnvQaBqKDxCfmUvO0LPRjXD3/5rZs3UrVeWnaG9rxelyMWb8RHr1Ho6mevh5/ecxOD5sOGedPZbc/JFs+eFLTpUUo5hMJCWnEJ+YusVqi0OOhEK4EhJPxCcmHU5JSxvl6epiyw9/4dUPvmbCBZcCsGHdxyxfejfO+HhOnTjFkofvp721jS8++pDaykqOHdxPv8GDGD56HJrmQ8DEwPMvpbn8OIauI3Y3Txi6zl/zgNCNPfRfuYSkmOhqrkdWTMiKiZpjuzhvwYMoJjuaFkSSrNRUlnJ0/34qy06iqlEGDhtBwaAhfPnRStZ+8inlJ08QCgYRpdVYrTb+8NWXHDu4j1AoRFpGBvFJyU1JKam7MXSkxYvuwOaIw+/rSmtvbZncUFvD6bo6Av52XAlWSo7tY+Wzz9Le6qbN7aZw6GCWPrGcKRddyv7tW6mtqorpbKpKn359iXMloWlh4hIzCXracFedRFZMPWkwpi9KIAq/uAhiTzpUoxG0aJjCSbM4sPaP5A2fwOAps9G0MJJkIuDzs+7TT9i7fSstTY1oqooWjbJn62Y+/N3v8Hq6MFssmMxmLBYLkWiYvdu2c/zwYTRNo++AQgoGDlmTVzDgUzUaRbrrjtsRJRE1qrV0drhvrq2okA3g4O7drPvsc35Yswaf10s0GuX8Cy/k1fc/Ii0zj4aaMmZeMZtDe3Zz6kQJAgJ+n5f8Af2x2Z3oRpTU3oW4K0vwtjd3Fz4GoiQjSDG4K8um7hvQnQN0HZsrkbMumc/RHz4HDMZfuwTZbEYUJcLhCF9+9CH7duzg+OFDGLrO0LNGce6UKcS5nERCYXweD4IogmHEuk9NZrweL5qqYug6o8aNp++AIcuS0zIrdF1HWjDvWsKhIBarrbXd3Two4PcMbqyvx2qzxegsXScajXLdLbew/PW3sNldvPPqM9wzfwGjxk1g0rQZbFi3lo72NiLhCG2tbnLyehHnTEaSZdL7DaOp7ChBTweKxYooSmiRMHSLL/wiJgiCgMlqx11Tir+jhfNufIi4pAwEZDydHXzxwQcc2rOLQ3t2I0kyDz3/PPc9/SpjJ05n/OSZTL14Ors2b6bd7UaSpB7Mf6bZKievN0PPGrNv0PDRD4qigCAKyBabLSaNmczk9h3wZpu7ae6pEydQVZWM7GwSk5OZftmlXHXDnYDMiuVLee+NN2IFiKBROGwI8YlJ+Lwejh3cRyQSxu/1Me3iWQwdNQ57fAaTFixj+0ev0HG6Btls6YGoCAKSoqCrandDlIintQmbM4HzbnqYhIwCACrLivj+67WUHD1C8ZFDqNEo8+9cxJiJ5/PwnQuIczpZsPgu0jIGkNUrj8N792G2mOk3aDCezg58Xh+GYTBw2DASktPfstrsnBFI5TNpSVWj5PYp2FlbWba2oHDgpUcP7MeVkMBrH3yMMz6TytIDtLqbyB8wgLSMDC6ZezXnz5hFm9uNpmuEgkEAThw7iqerE09nJ5Wnyjl3ymSSUvK54NYn2fvFm9QW7UM2mWN+bxgIooSkSOhqhJDfQ3rfQZwzdwn2hDy83np2/byZg7v3UHz0MLWVFRiGQV5+Pjf+9m5+XPM1X3y4GkmGxvo6Xv/Tp0y7ZBbOBBf9BhZy8Zx5PHDbzez4eQP5/fuTnpVztP+Q4Z9JsoRZtHYfQA8yA5PZQp9+g55pbqj9zamTJ5SjBw7w6OLbefHdD7n/1ltxxsezau2PzLziCiTJCcgc3f8dnW1tLH/9DfZu38Y3n31GbWUlne3tNJ9u4OSx4wwZOYJhY8cwYd69VO//iaM/fEHI70UymdHVKNFwCLPVxphL5tF3/Eza2jrYs/5Tig4epqLsJKXFRbS3utF1g4SkpBg/YbZx8dx5OFxOnnvwQeJc8YCJqRddy9SLrgeg+Mg2So/H6PuhI0eRlpm73GwyRQI+3y86RUtL/q4ncNuG9a/v3fbT4t3btiBLMufNuJCtG37kmptu5q6HnmHvtu8xMAj6A7zyxOPUVlXx0fofGT5mEls3fMmrTzxJRelJZEUhNSODnNzepKSl06tPHwqHjaBPXjqtJTsp3bMZQRDIHTKKzJFTqDndTnnxcarLy7uzTjM1lZWEgkEGDh3G+MmTWffnzxEQ6D94EHc99DD5/UfT0lSGpqp8+t57NDc29pAgxUcO09bq5qyx5zDm3PPXTLjgN5dLkvgrLCKUHDv8d8isw92SsHvLD3t3bvqpoLqiHF3XMQyDl99bxfkXzmDWmLE01NUiyzKaqjJ24kR+99lndLZ3UFZ8nILCgfzxzZUc2rOXirLSWERWFOwOB66ERHL69OWi2VeSEGkgEvBiZI3guy/XUnGyhK6O9h5s0OZ2I0oSk6ZN45Z7ltG7YDgdbVW8/dJLfPHhhyQmJ3P/s88w9aLriITbWfHU4+zctAlvdwe62WwhOS2NSdNmtJw17vwx6VnZNWo0+jcGV5S/g+uZvXI7+g8eeUcoFPixzd0iBgMBVFUlMTmNrs5OQsFgjC0SBMzx8Sx98ilEMYE3nlnKD2vXMuPSS3nitffZsO5Tlt2ysLtyi6KpKp7OLmorK9i7dRN3P/ooCUm9ee7Ou2hzNyNKIhaLFVmWMJktTJw6jYVLFpOals4n773LoT13k53bC5/Xh9VmIxDw8+Dtt3No9x5++/hylj39Kg21J1l83fUEg0FsdjtjJkwgp3e/h7J65dVEwuFuzPGrG2/+BzMBBsPGjPupo8398IQLpjy36fu/EAqFOLxvF8PHTCQ3P5/iI4eJqCr3PfUMBYWjMAwvYyeey8Sp07hnwXyGjBxFZk4urvh4rpx3A4319YhSjJlpqK0F4J1XX8Pr9SAYBnFOJ1abDU3V8Hi6WPLIY1x+3R2Axo2XTsFqs9PV2cGxAwdQTAomsxlJkrDabKz+wzt4vV6eXPEWzz/4EK0tzUQjEUaOHUtOXsG7YydOWSUIRqwX4W/nBX67+K5/OgqSnZu/o7WlqZfdbhtRU1lByZEjlBYdorGhnqaGBgYMGcKDz7+Iz9PK+j//mZmXX8sTv72TluZmOtpayczJZu+27Vwy92puu/cJzpk0gW0bfuR0fT2iILBy9WoURWH/zp306deP1z74gIWL76K+upo1H3+MJGsMHTUBCJGT25fCYcPZsWkD1u7UHQ6HkSQJxRRDiA01Vfywdg3RaJRzJp1H/oBBP4+ffOF1ZotF01Sthx365RKqTpX+8yZpWcbn9cpbf/zm44rS4qu2//wTke4fvXjOHK677U7y8ofw6hP3cvTAAUaNG8cHb70Zs2R3s6NhGOiazldbt6GYZeZMvgCvx8PgESP5cP2PlBw5yMLLLiYSDvPq+x+SlJLKI4tuo721DZPFzKo135DXdzDNp8uRFRuLr7+6G3nCwy+8yPdr1nBo7x5kWSYcCqEoCmPOnUi/gUN2j79g5kUp6Rlt0V8Aor/rFpckiX+2DMPAlZCgTp55+TX5AwZ/ct606ZyZzqitqqKrw90NVE6xa/N23nt9RU8rrCDEWuoURUFVo+zdvp20jEImTZuBz+vnwsuvBKwMHD6ckWPPRhRFcnrnsfoPv6ehrg5EgTa3m+++/BJQKCspYfnSJYiCgM/j4bzpM7hozvX4uoVQURSxWC1MmjadgsLB20aMnTgzOS39f9w8gHT3ksX/ckbIbLUaLlfiGq+3KzM9I+Msd1MjZcXFfPflV5yur2DBojtxxsfhbmpGVmSsdjtqNNrNKhtoqoYoiUy/5CogzImio9z92JO0ttQQn5iNroVprG9g+iWX89YLzyDJEoocI2q9nZ1Mu3gGBQOHsPaT1Rzcs4dZV17JY6+8jt/XwRcffkBXRweKycTEqdNJy8heO3T0uCtS0tK9YncLzv+4aivL/63Rkq7Odjrb2zl2cPeDvq72p4sOHxRPFBURCYfpU1DAU2+sZODw4YRDQQ7t2cNjixcTCsVmCHVdxxkfz2cbf0KSJarKKjmyfz/bf/qB975eT3trIyeLijl5vIg3nnkKV3z8meuJ3+vlynnzWPb0y3i72qgoLaa1uYUN69Zx8ngRzY2nScvIZOy5E9FF88rxky+8OzEpSQMBk8nUQ8b8xzNDZ1SWQcNGP1ddUbpPUUyrklPTco/s30t1RQV3XXctT7y2gqJDh/juyy+JRCI9biSKEp1tbZSfPMno8VPp08/Kk/cswd3cRNWpE/QuGMhZ5ySy4qknYkWYYaB3l86SJHFk3wF0PUJlWQnvr1zJrs2bUaNRLDYbEyZPJSklpfPAkZKF2BPXTJxpAynG/QXCkf/u3GCseVklr2//n53xiSPtzoRHU9LSb6+uKDcfO7CfJTfMQ1EULBYrkiz1sD0CEI1GObRnL6PHX8g3n31ITWUFgiDw0/r13Hz3SIqPbKe6vLy7bQ7QDaJRtac/+dG77mD7xo14vR4sVisjxowlL79v9HR9/VdrP139cMG46ZXtHj/hUAiczl/pEP/1wcloJEJCYlJ7YnLK3QlJqauc8Ykv5vXJv/DUyRNUlJ6MSWzddLcoSghSrBFzx08b+M0Vl/H1x3/CZDYjIPDDmq+5+e5lHD1woGeaRCA2iKlGoyhmK+UnT1B06CDxiYkMHz2GgsKBtLS4f1y/bt290YD/uKLIsd5TQfi3Nv1fmRzVNA3RMMjOzTvuSkic6W5qmOBKSF46YPCQmQ11tab66iqaGxsJBQNIkoTFaqW6vIIbL7scn9eD1WpFNwzqa2u469rZVFd0Wx+BaCSC2WKJDVmJIunZ2fQp6EdKWnq46XTjhs3ff/f+6ebWdbLZrMdZrWhq9P9udPZMtM/Ozd+Rkp61Ixjw5Wdk512T36/wiqDfO6Srs0Nsc7u7+3K8BAN+dF0n4Pd33xLYuelnxO5hDGe8C5PJTEpaGvGJSdjj4hCgtKTkxB83bd3xVdjvK090WLBYrWjGXxWF/7MDOMP1RaMxjT81PauiV+++T3V0dD5z9OiRwW31zWeHdXFowaChEx0OW7Yoys5IJCLp3ZMghmEgSbEWd5PJrOua6gsFQ42BgO9ka3PTrl1bNm3Ozut9tLm1IxKJqLG2fUH4jzf+358ej+leqGoUTTMRl5iiB1ThWE1Tx7Gaqgprbn3tMEXQ+8a54rNtDkeq2Wyxy4oiiqKAoRt6IOAPmkymtqbTp+s729vK7XbHqUgk3BSNRLr7BAO/lJD+a6//NwD2NIsHYvzAhAAAAABJRU5ErkJggg==',
			  text: FBInstant.player.getName() + ' wants you to play!',
			}).then(function() {
				// continue with the game.
			}).catch(error => console.error(error));
		}
	},
	
});

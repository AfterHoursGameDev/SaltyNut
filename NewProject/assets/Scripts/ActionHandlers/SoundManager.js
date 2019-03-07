
cc.Class({
	extends: cc.Component,

	properties: {
		backgroundMusic: { default: null, type: cc.AudioClip },
		audioSources: { default: [], type: cc.AudioSource },
		audioClips: { default: [], type: cc.AudioClip },
	},
	
	// LIFE-CYCLE CALLBACKS:

	onLoad () {
		// Persist the title screen
		cc.game.addPersistRootNode(this.node);

		cc.audioEngine.setMusicVolume(0.5);
		window.SoundManager = this;
		cc.audioEngine.playMusic(this.backgroundMusic, true);
	},

	start () {
		console.log('Sound started');
	},

	playSound (index) {
		cc.audioEngine.playEffect(this.audioClips[index], false);
	},
	
	stopBackgroundMusic()
	{
		cc.audioEngine.pauseMusic();
	},
	
	continueBackgroundMusic()
	{
		cc.audioEngine.resumeMusic();
	},

	// update (dt){
		// console.log('Sound here');
	// },
});

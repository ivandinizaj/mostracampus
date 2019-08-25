(function (window, document) {

	const getSocketId =(room) =>{
		return room == 1 ? '949565cb56f7304d' : 'dfaab78d55c58ae0';
	} 
	//{"secret":"0d949490c96a0628","socketId":"949565cb56f7304d"}
	//{"secret":"e673cbb208b7c744","socketId":"dfaab78d55c58ae0"}
	// More info about config & dependencies:
	// - https://github.com/hakimel/reveal.js#configuration
	// - https://github.com/hakimel/reveal.js#dependencies
	Reveal.initialize({
		// Push each slide change to the browser history
		history: true,
		slideNumber: 'c/t',
		controlsTutorial: false,
		transition: 'convex',
		multiplex: {
			// Example values. To generate your own, see the socket.io server instructions.
			secret: Reveal.getQueryHash().s || null, // Obtained from the socket.io server. Gives this (the master) control of the presentation
			id: getSocketId(Reveal.getQueryHash().room || 0), // Obtained from socket.io server
			url: 'https://mp.seanho.com' // Location of socket.io server
		},
		dependencies: [
		{ src: '//cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js', async: true },
		{ src: Reveal.getQueryHash().s ? 'plugin/multiplex/master.js' : 'plugin/multiplex/client.js', async:true }
		]
	});

	Reveal.addEventListener( 'slidechanged', function(event ) {

		var slide = event.indexh;

		var topFixed = document.getElementById("top-fixed");
		//Esconder a hashtag
		if( slide  == 0){
			topFixed.style.top = '-120px';
			if(Reveal.getQueryHash().s){
				timer.reset();
				timer.pause();
			}
		//Exibir a hashtag
		}else
			topFixed.style.top = '0px';

	});

	/**
	* Animar o título inicial
	*/
	const titleBlink = document.querySelector("#title-blink");

	const r = (min,max) =>{
	  return Math.floor(Math.random()*(max-min+1)+min);
	}
	
	setInterval(function() {
		titleBlink.style.left = r(49,51) + "%";
		titleBlink.style.top = r(49,51) + "%";
		titleBlink.style.color = "hsl("+r(0,360)+",100%, 70%)";
	}, 80);

	const disableselect = (e) => { 
		return false;
	}
	
	const reEnable = () =>{ 
		return true;
	} 
	
	//if IE4+ 
	document.onselectstart = new Function ("return false");
	document.oncontextmenu = new Function ("return false");
	
	//if NS6 
	if (window.sidebar){ 
		document.onmousedown=disableselect;
		document.onclick=reEnable;
	}

	//Caso seja o Master
	if(Reveal.getQueryHash().s){
	
		const timer 			= new Timer();
		const chrono 			= document.getElementById('chrono');
		const chronoTimer = chrono.querySelector('.values');

		chrono.style.zIndex 	= 9999;
		chrono.style.display 	= 'block';

		chrono.querySelector('.startButton').addEventListener('click', function () {
			timer.start();
		});
		chrono.querySelector('.pauseButton').addEventListener('click', function () {
			timer.pause();
		});
		chrono.querySelector('.stopButton').addEventListener('click', function () {
			timer.reset();
			timer.pause();
		});

		timer.addEventListener('secondsUpdated', function (e) {
			chronoTimer.innerHTML = (timer.getTimeValues().toString());
		});
		timer.addEventListener('started', function (e) {
			chronoTimer.innerHTML = (timer.getTimeValues().toString());
		});
		timer.addEventListener('reset', function (e) {
			chronoTimer.innerHTML = (timer.getTimeValues().toString());
		}); 

		document.addEventListener('keypress', function(e) {
			e = e || window.event;
			var code = e.which || e.keyCode;

			if(code == 49) //tecla 1
				timer.start();
			else if(code == 50) //tecla 2
				timer.pause();
			else if(code == 51){ //tecla 3
				timer.reset();
				timer.pause();
			}
		});
	}

}(window, document));

(function (window, document) {
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

}(window, document));


function disableselect(e){ 
	return false;
}

function reEnable(){ 
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
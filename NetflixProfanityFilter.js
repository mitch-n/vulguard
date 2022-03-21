//Turn on subtitles
//document.getElementsByClassName("ytp-subtitles-button ytp-button")[0].click();
console.log("STARTING!!!!!!!")
var mute_button=document.querySelectorAll("video, audio")[0];
var subtitle_class="player-timedtext";
var time_without_subs=0;

//sub_section=document.getElementsByClassName("captions-text")[0];
																								var blacklist=["god","damn","shit","bastard","jesus"," lord ","christ","ass","hell","dick","vagina","idiot","moron","trash","psycho"];

var styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = ".player-timedtext{margin-left:200%};"
document.head.appendChild(styleSheet)




var checker_interval = setInterval(check4subs,2000);
var filter_interval='';

function check4subs() {
	console.log("checking");
	if (document.getElementsByClassName(subtitle_class)[0].innerText.length>0){
		console.log("found subtitles");
		clearInterval(checker_interval);
		filter_interval=setInterval(filter,10);
	}
}

function filter(){  
	//Hide Subs
	try{
		//document.getElementsByClassName("player-timedtext")[0].style.marginLeft='100%';
		if (document.getElementsByClassName("player-timedtext")[0].innerText.length<1){
			throw "no subtitles";
		}
		//console.log("hiding subs");
		time_without_subs=0;
	}
	catch(e){
		time_without_subs+=1;
		console.log(time_without_subs);
		if (time_without_subs>3000){
			clearInterval(filter_interval);
			checker_interval=setInterval(check4subs,2000);
		}
	}
	
	//Get the words
	var subtitle_text="";
	try{
		subtitle_text=document.getElementsByClassName(subtitle_class)[0].innerText;
	}
	catch(err){}
	
	
	//Check if a blacklist word appears, and if so, mute.
	var do_mute=false;
	for (var i=0 ; i<blacklist.length ; i++){
		if(subtitle_text.toLowerCase().indexOf(blacklist[i]) >= 0){
			console.log("blacklist word: "+blacklist[i]);
			do_mute=true;
			break;
		}
	}

	//console.log(do_mute);
	
	var mute_button=document.querySelectorAll("video, audio")[0];
	
	if (do_mute){
		if (mute_button.muted==false){
			mute_button.muted=true;
			//console.log("mute");
		}
	}
	else{
		if (mute_button.muted==true){
			mute_button.muted=false;
			//console.log("un-mute");
		}
	}
}

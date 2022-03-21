// Dont run unless subtitles are present. check for subtitles every 5 seconds.

var subtitle_class="captions";

var time_without_subs=0;

var blacklist=["god","fuck","damn","shit","bastard","jesus","christ"," ass","dumbass","hell","goddamn","damnit","dick","bitch","vagina","penis","idiot","moron","trash","psycho","stupid","screw"];



var checker_interval = setInterval(check4subs,2000);
var filter_interval='';

function check4subs() {
	console.log("checking");
	if (document.getElementsByClassName(subtitle_class).length>0){
		console.log("found subtitles");
		clearInterval(checker_interval);
		filter_interval=setInterval(filter,10);
	}
}

function filter(){
	//Hide subtitle elements
	try{
		if (document.getElementsByClassName(subtitle_class)[0].style.display!='none'){
			document.getElementsByClassName(subtitle_class)[0].style.display='none';
		}
		time_without_subs=0;
	}
	catch(e){
		time_without_subs+=1;
		console.log(time_without_subs);
		if (time_without_subs>500){
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
	
	if (subtitle_text.length<1){
		console.log("NOT GETTING ANY SUBS");
	}
	
	//Check if a blacklist word appears, and if so, mute.
	var do_mute=false;
	for (var i=0 ; i<blacklist.length ; i++){
		if(subtitle_text.toLowerCase().indexOf(blacklist[i]) >= 0){
			do_mute=true;
			break;
		}
	}
	
	var video=document.querySelectorAll("video, audio");
	for (var i=0 ; i<video.length ; i++){
		if (do_mute){
			if (video[i].muted==false){
				video[i].muted=true;
				console.log("mute");
			}
		}
		
		else{
			if (video[i].muted==true){
				video[i].muted=false;
				console.log("un-mute");
			}
		}
	}
}

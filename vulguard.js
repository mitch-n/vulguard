//Turn on subtitles to filter

console.log("Starting Vulguard")

var videos=document.querySelectorAll("video, audio");
var style_id = "hidden_subtitle_style"
var subtitle_class="";

url_parts=location.hostname.split(".")
domain=url_parts[url_parts.length-2].toLowerCase()

if (domain == "netflix"){
	subtitle_class="player-timedtext"
}
else if (domain == "hulu"){
	subtitle_class="ClosedCaption"
}
else if (domain == "amazon"){
	subtitle_class="atvwebplayersdk-captions-text"
}
else if (domain == "youtube"){
	subtitle_class="ytp-caption-window-container"
}
else if (domain == "peacocktv"){
	subtitle_class="video-player__subtitles"
}
else if (domain == "max"){
	subtitle_class="CaptionWindow"
}
else if (domain == "plex"){
	subtitle_class="Subtitles-measure-"
}
else if (domain == "paramountplus"){
	subtitle_class="timed-text-css-box-container-mask"
}

subtitle_container=""

var time_without_subs=0;
var blacklist = ""

function onError(error) {
  console.log(`Error: ${error}`);
}
function onGot(item) {
	if (item.blacklist){
		blacklist_words = item.blacklist.split("\n");
		blacklist = []
		for (word of blacklist_words){
			if(word){
				blacklist.push(RegExp(word.toLowerCase()))
			}
		}
		//console.log(blacklist)
	}
}
const getting = browser.storage.sync.get("blacklist");
getting.then(onGot, onError);


var checker_interval = setInterval(check4subs,2000);
var filter_interval='';

function check4subs() {
	console.log("searching for subtitles");
	subtitle_container = document.querySelector('[class*='+subtitle_class+']')
	if (subtitle_container.innerText.length>0){
		console.log("found subtitles");
		
		if (!document.getElementById(style_id)){
			console.log("hiding subtitles")
			var styleSheet = document.createElement("style")
			styleSheet.type = "text/css"
			styleSheet.id = style_id
			styleSheet.innerText = "."+subtitle_container.className.split(" ")[0]+"{margin-left:2000%};"
			document.head.appendChild(styleSheet)
		}
		
		clearInterval(checker_interval);
		filter_interval=setInterval(filter,10);
	}
}


function filter(){
	subtitle_container = document.querySelector('[class*='+subtitle_class+']')	
	try{
		if (subtitle_container.innerText.length<1){
			throw "no subtitles found";
		}
		//console.log("hiding subs");
		time_without_subs=0;
	}
	catch(e){
		time_without_subs+=1;
		//console.log(time_without_subs);
		if (time_without_subs>3000){
			time_without_subs=0;
			clearInterval(filter_interval);
			checker_interval=setInterval(check4subs,2000);
		}
	}
	
	//Get subtitle text
	var subtitle_text="";
	try{
		//subtitle_text=document.getElementsByClassName(subtitle_class)[0].innerText;
		subtitle_text=subtitle_container.innerText;
	}
	catch(err){}
	
	//Check if a blacklist word is present in subtitle text, and if so, set do_mute to true
	var do_mute=false;
	for (var i=0 ; i<blacklist.length ; i++){		
		if (subtitle_text.toLowerCase().match(blacklist[i])){
			console.log("blacklist word: "+blacklist[i]);
			do_mute=true;
			break;
		}
	}

	//console.log(do_mute);
	
	var videos=document.querySelectorAll("video, audio");
	if (do_mute){
		for (i=0;i<videos.length;i++){
			if (videos[i].muted==false){
				videos[i].muted=true;
				//console.log("mute");
			}
		}
	}
	else{
		for (i=0;i<videos.length;i++){
			if (videos[i].muted==true){
				videos[i].muted=false;
				//console.log("unmute");
			}
		}
	}
}

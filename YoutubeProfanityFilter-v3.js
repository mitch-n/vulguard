// Dont run unless subtitles are present. check for subtitles every 5 seconds.

var subtitle_class="caption-window";
//var subtitle_class="captions-visual-line";
var video_class="video-stream html5-main-video";

var time_without_subs=0;

var blacklist=["god","fuck","damn","shit","bastard","jesus","christ"," ass ","dumbass","hell","goddamn","damnit","dick","bitch","vagina","penis","idiot","moron","trash","psycho","stupid","screw","what the","oh my"];



var checker_interval = setInterval(check4subs,2000);
var filter_interval='';

function check4subs() {
	console.log("checking");
	if (document.getElementsByClassName(subtitle_class).length>0){
		console.log("found subtitles");
		clearInterval(checker_interval);
		var sheet = window.document.styleSheets[0];
		
		//Insert Style
		var styles = '.'+subtitle_class+' { margin-left: 200%; }'
		var styleSheet = document.createElement("style")
		styleSheet.type = "text/css"
		styleSheet.innerText = styles
		document.head.appendChild(styleSheet)
		
		filter_interval=setInterval(filter,50);
	}
}

function filter(){
    //Hide subtitle elements
    var video=document.getElementsByClassName(video_class)[0];
   
    try{
        //if (document.getElementsByClassName(subtitle_class)[0].style.display!='none'){
        //    document.getElementsByClassName(subtitle_class)[0].style.display='none';
        //}
        //document.getElementsByClassName(subtitle_class)[0].style.marginLeft='200%';
        
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
   
    //if (subtitle_text.split(" ").length>10 && video.muted==true){
        //document.getElementsByClassName("ytp-subtitles-button ytp-button")[0].click();
        //document.getElementsByClassName("ytp-subtitles-button ytp-button")[0].click();
        //subtitle_text=" ";
        //video.muted=false;
        //console.log(subtitle_text);
    //}
   
    if (subtitle_text.length<5){
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
   
   

    if (do_mute){
        if (video.muted==false){
            video.muted=true;
            //console.log("mute");
        }
    }
   
    else{
        if (video.muted==true){
            video.muted=false;
            //console.log("un-mute");
        }
    }
}


var black_times = [[564.272, 566.19], [715.798, 717.466], [720.636, 722.054], [1442.023, 1444.985], [1623.496, 1625.999], [2287.285, 2290.204], [3843.381, 3846.342], [4241.695, 4243.864], [4573.151, 4574.778], [4956.076, 4959.204], [5212.749, 5215.084], [5303.506, 5305.425], [5316.269, 5319.022], [5533.611, 5535.947], [5539.867, 5541.327], [5541.41, 5544.413], [5547.458, 5550.711], [5587.54, 5589.375], [5678.089, 5681.509]]
var video = document.querySelectorAll("video")[0];

filter_interval=setInterval(filter,10);

function filter(){
	var cur_time = video.currentTime;
	//console.log(cur_time)
	for (i=0 ; i<black_times.length ; i++){
		//console.log(black_times[0])
		//console.log(black_times[1])
		//console.log()
		if (cur_time>black_times[i][0] && cur_time<black_times[i][1]){
			console.log("Muting")
			video.muted=true;
			break;
		}
	}
	
	if (i==black_times.length && video.muted==true){
		console.log("Unmuting")
		video.muted=false;
	}
	
}


var playAudio = AudioManager([
	"audio/point2.mp3", "audio/point4.mp3", "audio/point7.mp3", "audio/point10.mp3", "audio/point11.mp3"
]);

var points = [
	[
		[210, 379],
		[183, 336],
		[128, 335]
	],
	[
		[128, 335],
		[57, 328],
		[17, 274]
	],
	[
		[17, 274],
		[62, 190],
		[179, 215]
	],
	[
		[179, 215],
		[356, 235],
		[361, 108]
	],
	[
		[361, 108],
		[371, 44],
		[449, 17]
	],
	[
		[449, 17],
		[610, 138],
        [655, 348]
	],
	[
		[655, 348],
		[611, 409],
		[541, 431]
	],
	[
		[541, 431],
		[507, 411],
		[528, 375]
	],
	[
		[528, 375],
		[555, 333],
		[530, 313]
	],
	[
		[530, 313],
		[498, 285],
		[500, 227]
	],
	[
		[500, 227],
		[512, 174],
		[482, 198]
	],
	[
		[482, 198],
		[442, 241],
		[386, 289]
	],
	[
		[386, 289],
		[377, 330],
		[416, 365]
	],
	[
		[416, 365],
		[465, 408],
		[471, 474]
	],
	[
		[471, 474],
		[495, 529],
		[575, 517]
	],
	[
		[575, 517],
		[613, 500],
		[644, 495]
	],
	[
		[644, 495]
	]
];

// smaller: slower
let speedFactor = 0.001;



var speeds = [
	65,
	75,
	85,
	90,
	85,
	100,
	85,
	45,
	40,
	50,
	30,
	70,
	55,
	70,
	60,
	65,
	0
];
 

var svg = d3.select("#track").append("svg")
	.attr("width", 680)
	.attr("height", 550);

var paths = points.map(points =>
	svg.append("path")
		.data([points])
		.attr("class", "trackPart")
		.attr("d", d3.svg.line()
			.tension(0) // Catmull–Rom
			.interpolate("cardinal")
		)
);

points.forEach(points => {
	svg.selectAll(".point")
		.data(points)
		.enter().append("circle")
		.attr("transform", function(d) { 
			return "translate(" + d + ")"; 
		})
		.filter(function(d, i) {
			return i === 0;
		})
		.attr("r", 9)
		.attr("class", "stopPoint");
});

var circle = svg.append("circle")
	.attr("r", 15)
	.attr("class", "position")
	.attr("transform", "translate(" + points[0][0] + ")");

var start = transition(false, id => {
	adjustCockpit((id - 1 >= 0) ? speeds[id - 1] : 0, speeds[id]);
	if (id === 2 || id === 4 || id === 7 || id === 10 || id === 11) playAudio();
});

function transition(loop, callback, pathIndex) {
	if (pathIndex === 0 && !loop) return () => {};
	if (!pathIndex) pathIndex = 0;
	let path = paths[pathIndex].node();
	return function() {
		callback(pathIndex);
		circle.transition()
		.ease("linear")
		.duration((path.getTotalLength() || 0) / speedFactor / speeds[pathIndex])
		.attrTween("transform", translateAlong(path))
		.each("end", transition(loop, callback, ++pathIndex % paths.length));
	}
}

// Returns an attrTween for translating along the specified path element.
function translateAlong(path) {
	var l = path.getTotalLength();
	return function(d, i, a) {
		return function(t) {
			try {
                var p = path.getPointAtLength(t * l);
                return "translate(" + p.x + "," + p.y + ")";
			} catch (e) {
				let lastSegment = points[points.length - 1];
				return "translate(" + lastSegment[0][0] + "," + lastSegment[0][1] + ")";
			}
		};
	};
}
//console.log(speeds.length)


for (i = 0 ; i<speeds.length ; i++){
		//console.log(' - - - - - - - -'); 
		//console.log('  Time: ', i+1); 
		//console.log(' Speed: ', speeds[i]);
		
		var gear 
		gear = speed2gear(speeds[i]);
		
		//console.log('  Gear: ', gear) 
}

function adjustCockpit(old_speed, new_speed) {
	adjustSpeed(new_speed)
	$('#gear').text(speed2gear(new_speed));
}



 
function speed2gear(speed){
	return Math.min(Math.max(Math.ceil(speed / 20), 1), 6);
}


function AudioManager(files) {
	let fileIndex = 0;
	let audio = new Audio(files[fileIndex]);
	return function() {
		audio.play();
		try {
            audio = new Audio(files[++fileIndex]);
		} catch (e) {}
	}
}

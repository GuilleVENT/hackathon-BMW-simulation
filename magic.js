var points = [
	[
		[47, 213],
		[68, 168],
		[110, 150]
	],
	[
		[110, 150],
		[132, 155],
		[149, 160]
	],
	[
		[149, 160],
		[173, 165],
		[191, 157]
	],
	[
		[191, 157],
		[223, 147],
		[247, 132]
	],

		[247, 132],
		[266, 100],
		[285, 78]
	],
	[
		[285, 78],
		[314, 49],
		[346, 38]
	],
	[
		[346, 38],
		[376, 50],
		[398, 81]
	],
		[398, 81],
		[417, 113],
		[432, 152]
	],

	[
		[432, 152],
		[431, 175],
		[418, 198]
	],
	[
		[418, 198],
		[395, 220],
		[359, 232]
	],
		[359, 232],
		[228, 241],
		[85, 251]

	[
		[85, 251],
		[54, 238],
		[47, 213]
	]
];


var speed_arr = [
	10, 
	20, 
	25, 
	35, 
	37.5, 
	30, 
	46, 
	59, 
	64, 
	44, 
	57, 
	68, 
	75, 
	55, 
	68, 
	70, 
	79, 
	88, 
	96, 
	104, 
	84.3, 
	55, 
	47, 
	45, 
	58, 
	40, 
	37, 
	23, 
	15, 
	0 
];
 

var svg = d3.select("body").append("svg")
	.attr("width", 960)
	.attr("height", 500);

var paths = points.map(points =>
	svg.append("path")
		.data([points])
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
			return i == 0;
		})
		.attr("r", 4);
});

var circle = svg.append("circle")
	.attr("r", 13)
	.attr("transform", "translate(" + points[0][0] + ")");


transition(0, console.log)();

function transition(pathIndex, callback) {
    let path = paths[pathIndex].node();
	return function() {
		callback(pathIndex);
		circle.transition()
            .ease("linear")
			.duration(path.getTotalLength() / 0.01 / speed_arr[pathIndex])
			.attrTween("transform", translateAlong(path))
			.each("end", transition(++pathIndex % paths.length, callback));
	}
}

// Returns an attrTween for translating along the specified path element.
function translateAlong(path) {
	var l = path.getTotalLength();
	return function(d, i, a) {
		return function(t) {
			var p = path.getPointAtLength(t * l);
			return "translate(" + p.x + "," + p.y + ")";
		};
	};
}
//console.log(speed_arr.length) 


for (i = 0 ; i<speed_arr.length ;i++){ 
    //console.log(' - - - - - - - -'); 
    //console.log('  Time: ', i+1); 
    //console.log(' Speed: ', speed_arr[i]); 
    
    var gear 
    gear = speed2gear(speed_arr[i]); 
    
    //console.log('  Gear: ', gear) 
    

}



 
function speed2gear(speed){ 
    var gear_float = speed / 20  
    var gear_int = Math.ceil(gear_float) 
    if ( gear_int < 1 ) { 
        gear_int = 'N'; 
    } 
    if ( gear_int > 6) { 
        gear_int = 6 
    } 
    return gear_int 
}

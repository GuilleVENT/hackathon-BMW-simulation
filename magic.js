var points = [
	[
		[480, 200],
		[580, 400],
		[680, 100]
	],
	[
		[680, 100],
		[780, 300],
		[180, 300]
	],
	[
		[180, 300],
		[280, 100],
		[480, 200]
	]
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
			.duration(path.getTotalLength() / 0.1)
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


// test speed-array 

speed_arr = [0, 
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
            ] 
 
//console.log(speed_arr.length) 
 
for (i = 0 ; i<speed_arr.length ;i++){ 
    //console.log(' - - - - - - - -'); 
    //console.log('  Time: ', i+1); 
    //console.log(' Speed: ', speed_arr[i]); 
    var gear = speed2gear(speed_arr[i]); 
    if ( gear < 1 ) { 
        gear = 'N'; 
    } 
    if ( gear > 6) { 
        gear = 6 
    } 
    //console.log('  Gear: ', gear) 
} 
 
 
function speed2gear(speed){ 
    var gear_float = speed / 20  
    var gear_int = Math.ceil(gear_float) 
    return gear_int 
}

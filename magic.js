var points = [
	[
		[35, 299],
		[93, 198],
		[198, 145]
	],
	[
		[198, 145],
		[279, 155],
		[339, 194]
	],
	[
		[339, 194],
		[402, 230],
		[469, 240]
	],
	[
		[469, 240],
		[546, 205],
		[611, 128]
	],
	[
		[611, 128],
		[661, 64],
		[739, 32]
	],
	[
		[739, 32],
		[865, 88],
		[935, 205]
	],
	[
		[935, 205],
		[945, 282],
		[945, 368]
	],
	[
		[945, 368],
		[901, 429],
		[831, 451]
	],
	[
		[831, 451],
		[797, 431],
		[818, 395]
	],
	[
		[818, 395],
		[840, 361],
		[815, 333]
	],
	[
		[815, 333],
		[790, 309],
		[805, 267]
	],
	[
		[805, 267],
		[808, 208],
		[770, 222]
	],
	[	
		[770, 222],
		[732, 271],
		[676, 309]
	],
	[
		[676, 309],
		[667, 347],
		[706, 385]
	],
	[
		[706, 385],
		[761, 441],
		[761, 494]
	],
	[	
		[761, 494],
		[795, 539],
		[865, 537]
	],
	[
		[865, 537],
		[903, 525],
		[934, 515]
	]
];


var speed_arr = [
	40, 
	50, 
	45, 
	60, 
	45, 
	90, 
	120, 
	59, 
	150, 
	75 
	/*57, 
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
	0 */
];
 

var svg = d3.select("body").append("svg")
	.attr("id", "track")
	.attr("width", 980)
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
		.attr("r", 9)
		.attr("class", "stopPoint");
});

var circle = svg.append("circle")
	.attr("r", 15)
	.attr("transform", "translate(" + points[0][0] + ")");


transition(false, console.log)();

function transition(loop, callback, pathIndex) {
	if (pathIndex === 0 && !loop) return () => {};
	if (!pathIndex) pathIndex = 0;
    let path = paths[pathIndex].node();
    pathIndex = ++pathIndex % paths.length;
	return function() {
		callback(pathIndex);
		circle.transition()
            .ease("linear")
			.duration(path.getTotalLength() / 0.008 / speed_arr[pathIndex])
			.attrTween("transform", translateAlong(path))
			.each("end", transition(loop, callback, pathIndex));
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

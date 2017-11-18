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
		[480, 300]
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
			.duration(path.getTotalLength() / 0.1)
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
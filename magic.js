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
        .attr("r", 4)
        .attr("transform", function(d) { return "translate(" + d + ")"; });
});

var circle = svg.append("circle")
    .attr("r", 13)
    .attr("transform", "translate(" + points[0][0] + ")");


transition(0)();

function transition(pathIndex) {
    return function() {
        circle.transition()
            .duration(10000)
            .attrTween("transform", translateAlong(paths[pathIndex].node()))
            .each("end", () => {
                console.log(pathIndex);
                transition(++pathIndex % paths.length);
            });
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
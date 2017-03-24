//execute script when window is loaded
window.onload = function(){
    var container = d3.select("body") //Get the <body> element from the DOM
        .append("svg") //put new svg in body
        .attr("width", 920) //assign the width
        .attr("height", 500) //assign the height
        .attr("class", "container") //always assign a class (as a block name) for styling and future selection
        .style("background-color", "rgba(0,0,0,0.2)"); //only put a semicolon at the end of the block
    
    var innerRect = container.append("rect") //put a new rect in the svg
        .datum(400)
        .attr("width", function(d){
            return d * 2; //400 * 2 = 800
        })
        .attr("height", function(d){
            return d; //400
        }) //rectangle height
        .attr("class", "innerRect") //class name
        .attr("x", 50) //position from left on the x (horizontal) axis
        .attr("y", 50) //position from teh top of the y axis
        .style("fill", "#FFFFFF"); //fill color
    
    var dataArray = [10, 20, 30, 40, 50];
    
    var cityPop = [
        {
            city: 'Madison',
            population: 233209
        },
        {
            city: 'Milwaukee',
            population: 594833
        },
        {
            city: 'Green Bay',
            population: 104057
        },
        {
            city: 'Superior',
            population: 27244
        }
    ];
    
    //find the minimum value of the array
    var minPop = d3.min(cityPop, function(d){
        return d.population;
    });
    
    //find the maximum value of the array
    var maxPop = d3.max(cityPop, function(d){
        return d.population;
    });
    
    //scale for circles center y coordinates
    var y = d3.scaleLinear()
        .range([450, 50])
        .domain([0, 700000]);
    
    var x = d3.scaleLinear() //creates the scale
        .range([90, 750]) //output min and max
        .domain([0, 3]) //input min and max
    
    //color scale generator
    var color = d3.scaleLinear()
        .range([
            "#FDBE85",
            "#D94701"
        ])
        .domain([
            minPop,
            maxPop
        ]);
    
    var circles = container.selectAll(".circles")
        .data(cityPop) //here we feed in the array
        .enter()
        .append("circle") //add a circle for each datum
        .attr("class", "circles") //apply a class name to all circless
        .attr("id", function(d, i){ //circle radius
            return d.city;
        })
        .attr("r", function(d){
            //calculate the radius based on population value as cirlce area
            var area = d.population * 0.01;
            return Math.sqrt(area/Math.PI);
        })
        .attr("cx", function(d, i){
            //use the scale generator with the index to place each circle horizontally
            return x(i);
        })
        .attr("cy", function(d){
            return y(d.population);
        })
        .style("fill", function(d, i){ //add a fill based on the color scale generator
            return color(d.population);
        })
        .style("stroke", "#000"); //black circle stroke
    
    //create y axis generator
    var yAxis = d3.axisLeft(y)
        .scale(y);
        //.orient("left")
    
    //create axis g element and add axis
    var axis = container.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(50, 0)")
        .call(yAxis);
    
    //create a text element and add the title
    var title = container.append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", 450)
        .attr("y", 30)
        .text("City Populations");
    
    //create cirlce labels
    var labels = container.selectAll(".labels")
        .data(cityPop)
        .enter()
        .append("text")
        .attr("class", "labels")
        .attr("text-anchor", "left")
        .attr("y", function(d){
            //vertical position centered on each circle
            return y(d.population);
        })
    
    //first line of label
    var nameLine = labels.append("tspan")
        .attr("class", "nameLine")
        .attr("x", function(d,i){
            //horizonal position to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .text(function(d){
            return d.city;
        });
    
    //create format generator
    var format = d3.format(",");
    
    //second line of label
    var popLine = labels.append("tspan")
        .attr("class", "popLine")
        .attr("x", function(d,i){
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .attr("dy", "15") //vertical offset
        .text(function(d){
            return "Pop. " + format(d.population); //format generator formats numbers
        });
};
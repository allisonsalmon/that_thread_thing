$(function start() {  
var margin = {top: 10, right: 10, bottom: 40, left: 10}

    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    format = d3.format(",d");
    format = d3.time.format("%Y/%m/%d");

var x = d3.time.scale()
  .range([0, width]);
 
var y = d3.scale.linear()
  .range([height, 0] );

var w = d3.scale.linear()
  .range([0, width]);

var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(d3.time.years, 1)
    .orient("bottom");


var color = function(d) {
  if(d.status_name == "In progress")
  {
      return "#E8E290";
  }
  else if(d.status_name == "Finished")
  {
      return "#909CE8";
  }
  else if(d.status_name == "Frogged")
  {
      return "#9AE890";
  }
  else
  {
      return "#E890B5";
  }
}


var chart = d3.select("#progress_chart").append("svg")
    .attr("class", "chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("margin-left", "32px") // Tweak alignment…
  .append("g")
    .attr("transform", "translateo(10,15)");


d3.json("/threads/project_data.json", function(json) {
  // Convert strings to numbers.
  var pruned_projects = new Array();
  var stack = 0;
  var max_stack = 0;
  var current_width = 0;
  console.log(json);
  json.projects.forEach(function(d) {
      d.started = d.started ? format.parse(d.started) : 0;
      d.completed = d.started ? (d.completed ? format.parse(d.completed) : new Date()) : 0;


      //we only want projects with valid time info
      if(d.started != 0 && d.completed != 0)
      {
        console.log(d.name + " " + d.started + " " + d.completed);
        pruned_projects.push(d);
      }
  });

  pruned_projects.sort(function(a,b){if (a.started > b.started) return 1; if (b.started > a.started) return -1; return 0;});


  var ends = new Array();
  for(var j=0; j < pruned_projects.length; j++){

    stack = -1;
    for(var i=0; i < ends.length; i++)    
    {
        console.log("end " + i + " " + ends[i]);
        if(ends[i] <= pruned_projects[j].started)
        {
          ends[i] = pruned_projects[j].completed;
          stack = i;
          console.log("insert at " + stack);
          break;
        }
    }

    console.log(pruned_projects[j].name);

    if(stack == -1)
    {
      ends.push( pruned_projects[j].completed);
      stack = ends.length-1;
    }
   
     
    if(stack > max_stack)
    {
      max_stack = stack;
    }
    //console.log(d.name + " " + stack);
    pruned_projects[j].stack = stack;
        
  }

  var startDate = d3.min(pruned_projects, function(d) { return d.started; }),
    endDate = d3.max(pruned_projects, function(d) { return d.completed; });

    console.log(startDate)
    console.log(endDate)
  x.domain([startDate, endDate]);
  y.domain([0, max_stack+1]);
  w.domain([0, d3.time.days(startDate, endDate).length]);

   chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
 

  
  var bar = chart.selectAll("rect")
      .data(pruned_projects)
    .enter().append("rect")
      .attr("width", 0)
      .attr("x", function(d) {return x(d.started);})
      .attr("y", function(d, i) {return y(d.stack+1);})
      .attr("height", function(d, i) { return y(d.stack) - y(d.stack+1);})
      .attr("fill", function(d) { return color(d);});

  bar.append("title")
    .text(function(d){ return d.name + " " + d.started + " " + d.completed; })

  bar
    .data(pruned_projects)
    .transition()
    .attr("width", function(d) {return x(d.completed) - x(d.started);})
    .delay(function(d) {return d3.time.days(startDate, d.started).length;})
    .duration(function(d) {return d3.time.days(d.started, d.completed).length;});



});

function TransitionCompleted() {
  var stack = 0;
  var max_stack = 0;
  var current_width = 0;

  var ends = new Array();
  console.log(finished);

  var bar = chart.selectAll("rect");
  var finished = bar.filter(function(d) {
    stack = -1;
    if(d.status == "finished")
    {
      for(var i=0; i < ends.length; i++)    
      {
          console.log("end " + i + " " + ends[i]);
          if(ends[i] <= d.started)
          {
            ends[i] = d.completed;
            stack = i;
            console.log("insert at " + stack);
            break;
          }
      }

      console.log(d.name);

      if(stack == -1)
      {
        ends.push( d.completed);
        stack = ends.length-1;
      }
     
       
      if(stack > max_stack)
      {
        max_stack = stack;
      }
      //console.log(d.name + " " + stack);
      d.stack = stack;
    }
    return d.status == "finished";
  });
  var everything_else = bar.filter(function(d) {return d.status != "finished";});
          
  
  everything_else
    .transition()
    .attr("width", 0)
    .duration(1000);

  finished
    .transition()
    .attr("y", function(d, i) {return y(d.stack+1);})
    .attr("height", function(d, i) { return y(d.stack) - y(d.stack+1);})
    .delay(1000)
    .duration(1000);

};

function TransitionAll() {
  var stack = 0;
  var max_stack = 0;
  var current_width = 0;

  var ends = new Array();

  var bar = chart.selectAll("rect");
  console.log(bar);
  var all = bar.filter(function(d) {
      stack = -1;
      for(var i=0; i < ends.length; i++)    
      {
          //console.log("end " + i + " " + ends[i]);
          if(ends[i] <= d.started)
          {
            ends[i] = d.completed;
            stack = i;
            //console.log("insert at " + stack);
            break;
          }
      }

      console.log(d.name);

      if(stack == -1)
      {
        ends.push( d.completed);
        stack = ends.length-1;
      }
     
       
      if(stack > max_stack)
      {
        max_stack = stack;
      }
      //console.log(d.name + " " + stack);
      d.stack = stack;
      return true;
  });

  
  all
    .transition()
    .attr("y", function(d, i) {return y(d.stack+1);})
    .attr("height", function(d, i) { return y(d.stack) - y(d.stack+1);})
    .duration(1000);

  all
    .transition()
    .attr("width", function(d) {return x(d.completed) - x(d.started);})
    .delay(1000)
    .duration(1000);
};

});

$(document).ready(function () {

  var totals_by_type = {
    "Crochet":0, 
    "Knitting":0, 
    "Loom Knitting":0,
    "Machine Knitting":0,
    "Weaving":0,
    "Spinning":0
  }
  var made_for = {}
  var status = {
    "Frogged":0,
    "Hibernating":0,
    "Finished":0,
    "In progress":0
  }
  for(var p in projects)
  {
    var proj = projects[p]
    console.log(proj.craft_name)
    totals_by_type[proj.craft_name] += 1
    made_for[proj.made_for] += 1
    if(proj.status_name != null)
    {
      status[proj.status_name] += 1
    }
  }

  var keys = new Array();
  var values = new Array();
  for(var k in totals_by_type)
  {
    keys.push(k)
    values.push(totals_by_type[k])
  }
  
  var keys2 = new Array();
  var values2 = new Array();
  for(var k in status)
  {
    keys2.push(k)
    values2.push(status[k])
  }


  var data = {
    labels : keys,
    datasets : [
      {
        fillColor : "rgba(255,220,220,0.5)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        data : values
      },
    ]
  }

  var data2 = {
    labels : keys2,
    datasets : [
      {
        fillColor : "rgba(255,220,220,0.5)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        data : values2
      },
    ]
  }
  var ctx = $("#radar_project_type").get(0).getContext("2d");
  var myNewChart = new Chart(ctx).Radar(data);
  
  var ctx2 = $("#status_breakdown").get(0).getContext("2d");
  var myNewChart2 = new Chart(ctx2).Bar(data2);


});

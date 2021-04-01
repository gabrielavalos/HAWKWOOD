// CODE FOR CURVES NEED TO MAKE INTO A FUNCTION

//d3.selectAll("#siteSelection").on("change", declineCurves);

//function declineCurves() {

  //var dropDownMenu = d3.select("#siteSelection")
  //var dataset = dropDownMenu.property("value");

  d3.csv("croc.csv").then(function(data) {
      console.log(data);
    });

    d3.csv("croc.csv").then(function(data) {
    var croc_oil= data.map(data => data.Oil_BBL);
    var croc_gas= data.map(data => data.Gas_MCF);
    var croc_water= data.map(data => data.Water_BBL);
    var croc_date= data.map(data => data.Date);  

    console.log(croc_oil);
    console.log(croc_date);
    console.log(croc_gas);
    console.log(croc_water);



    // oil decline curve data
    var dataOil = [{
      x: croc_date,
      y: croc_oil,
    type: "line" }];

    var layoutOil = {
      title: "Oil BBL"
    };

    Plotly.newPlot("oilDeclineCurve", dataOil, layoutOil);

    // gas decline curve data
    var dataGas = [{
      x: croc_date,
      y: croc_gas,
    type: "line" }];

    var layoutGas = {
      title: "Gas BBL"};

    Plotly.newPlot("gasDeclineCurve", dataGas, layoutGas);

    // water decline curve data
    var dataWater = [{
      x: croc_date,
      y: croc_water,
    type: "line" }];

    var layoutWater = {
      title: "Water BBL"};

    Plotly.newPlot("waterDeclineCurve", dataWater, layoutWater);



  });
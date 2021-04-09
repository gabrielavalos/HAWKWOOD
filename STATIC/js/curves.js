// CODE FOR CURVES NEED TO MAKE INTO A FUNCTION

//d3.selectAll("#siteSelection").on("change", declineCurves);

//function declineCurves() {

  //var dropDownMenu = d3.select("#siteSelection")
  //var dataset = dropDownMenu.property("value");

  //function to create dropdown with well name options
  function createDropdownOptions() {
    //select dropdown <select> in well.html with id:"siteSelection"
    var selector = d3.select("#siteSelection");
    //read in the wellNames.json file, which contains the array "names" with all the well names
    d3.json('/DATA/wellNames.json').then((data) => {
      console.log(data);
    var wellOptions = data.names;
    wellOptions.forEach((well) => {
      selector
        .append('option')
        .text(well)
        .property('Value', well);
    })
  })
  }

createDropdownOptions();

  function curvesHome() {
      // THIS CODE IS CREATING THE CURVES
      d3.csv("croc.csv").then(function(data) {
        var croc_oil= data.map(data => data.Oil_BBL);
        var croc_gas= data.map(data => data.Gas_MCF);
        var croc_water= data.map(data => data.Water_BBL);
        var croc_date= data.map(data => data.Date);  
        //console.log(croc_oil);
        //console.log(croc_date);
        //console.log(croc_gas);
        //console.log(croc_water);
        // oil decline curve data

        // open oil data
        var dataOil = [{
          x: croc_date,
          y: croc_oil,
        type: "line" }]; // close oil data
        // open oil layout
        var layoutOil = {
          title: "Oil BBL"
        };//close oil layout
        // call oil data and layout to plot
        Plotly.newPlot("oilDeclineCurve", dataOil, layoutOil);
    
        // gas decline curve data
        // open gas data
        var dataGas = [{
          x: croc_date,
          y: croc_gas,
        type: "line" }]; //close gas data
        // open gas layout
        var layoutGas = {
          title: "Gas BBL"
        }; //close gas layout
        //call gas data & layout to plot
        Plotly.newPlot("gasDeclineCurve", dataGas, layoutGas); 
    
        // water decline curve data
        //open water data
        var dataWater = [{
          x: croc_date,
          y: croc_water,
        type: "line" }]; //close water data
        //open water layout
        var layoutWater = {
          title: "Water BBL"
        };//close water layout
        //call water data & layout to plot
        Plotly.newPlot("waterDeclineCurve", dataWater, layoutWater);
      });
  }

  d3.selectAll('body').on('change', updateCurves);

  function updateCurves(){
    var dropdownMenu = d3.selectAll("#siteSelection").node();
    var dropdownMenuID = dropdownMenu.id;
    var selectedOption = dropdownMenu.value;
    console.log(dropdownMenuID);
    console.log(selectedOption);
    d3.csv('/DATA/data.csv').then(data => {
      console.log(data[0]);
      var selectedWell = data.filter(site => site.Site_name === selectedOption);
      console.log(selectedWell)});
  };


  // TRYING TO GET SITE NAMES FROM VARIABLE INTO DROP DOWN...SO I CAN DELETE THE NAMES FROM THE HTML
  var siteNames = wellNames;
  console.log(siteNames);

  //THIS CODE IS TO UNDERSTAND WHAT THE HECK IS HAPPENING !!!!!!
  d3.csv('/DATA/data.csv').then(data => {
    console.log(data[0]);
    var selectedWell = data.map(site => site.Site_Name);
    //console.log(selectedWell);
    //data.forEach(element => {
      //console.log(element.Site_Name)}); //close forEach
  });

  d3.json("/DATA/mostRecentProduction.json").then((data) =>{ //need to export with correct datetime format
    console.log(data);
  });



      // if (requestedSiteName) {
      //   filteredData = filteredData.filter(row => row.Site_Name == requestedSiteName)
      //   console.log(filteredData); //check to see what this looks like because i dont understand it
      // var filteredSite = element.filter(element => element.Site_Name === "CROCH 1H");
      // console.log(filteredSite);

  
    //var allSiteName = data[0];
  
  

  // THIS CODE IS CREATING THE CURVES
    d3.csv("croc.csv").then(function(data) {
    var croc_oil= data.map(data => data.Oil_BBL);
    var croc_gas= data.map(data => data.Gas_MCF);
    var croc_water= data.map(data => data.Water_BBL);
    var croc_date= data.map(data => data.Date);  
    //console.log(croc_oil);
    //console.log(croc_date);
    //console.log(croc_gas);
    //console.log(croc_water);
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
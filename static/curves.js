// CODE FOR CURVES 

//FUNCTION TO CREATE DROP DOWN VALUES
  function createDropdownOptions() {
    //select dropdown <select> in well.html with id:"siteSelection"
    var selector = d3.select("#siteSelection");
    //read in the wellNames.json file, which contains the array "names" with all the well names
    d3.json('./static/wellNames.json').then((data) => {
      // console.log(data);
    var wellOptions = data.names;
    wellOptions.forEach((well) => {
      selector
        .append('option')
        .text(well)
        .property('Value', well);
    })
  })
  }

//CALL FUNCTION TO CREATE DROPDOWN MENU VALUES
  createDropdownOptions();

// //FUNCTION TO CREATE HOME CURVES
// function curvesHome() {
//   d3.json("/static/all_production.json").then((data) =>{ //THIS WORKS!!!
//     var home_oil = [];
//     var home_gas = [];
//     var home_water = [];
//     var home_date = [];
//     new Promise ((resolve) => data.forEach(site => {if (site[0] === "CROC 1H") {
//       //console.log(site); 
//       home_oil.push(site[2]);
//       home_gas.push(site[3]);
//       home_water.push(site[4]);
//       home_date.push(site[8])
//     } resolve()}));

//     //console.log(croc_oil);
//     //console.log(croc_date);
//     //console.log(croc_gas);
//     //console.log(croc_water);
//     // oil decline curve data

//     // open oil data
//     var dataOil = [{
//       x: home_date,
//       y: home_oil,
//     type: "line" }]; // close oil data
//     // open oil layout
//     var layoutOil = {
//       title: "Oil BBL"
//     };//close oil layout
//     // call oil data and layout to plot
//     Plotly.newPlot("oilDeclineCurve", dataOil, layoutOil);

//     // gas decline curve data
//     // open gas data
//     var dataGas = [{
//       x: home_date,
//       y: home_gas,
//     type: "line" }]; //close gas data
//     // open gas layout
//     var layoutGas = {
//       title: "Gas BBL"
//     }; //close gas layout
//     //call gas data & layout to plot
//     //Plotly.newPlot("gasDeclineCurve", dataGas, layoutGas); 

//     // water decline curve data
//     //open water data
//     var dataWater = [{
//       x: home_date,
//       y: home_water,
//     type: "line" }]; //close water data
//     //open water layout
//     var layoutWater = {
//       title: "Water BBL"
//     };//close water layout
//     //call water data & layout to plot
//     //Plotly.newPlot("waterDeclineCurve", dataWater, layoutWater);
//   })
// }

// curvesHome();


// LISTENER FOR CHANGE ON DROP DOWN MENU
  d3.selectAll('body').on('change', updateCurves);

  function updateCurves(){
    var dropdownMenu = d3.selectAll("#siteSelection").node();
    var dropdownMenuID = dropdownMenu.id;
    var selectedOption = dropdownMenu.value;
    console.log(dropdownMenuID);
    console.log(selectedOption);
    d3.json("./static/production_summary.json").then((data) =>{ //THIS WORKS!!!
      var site_oil = [];
      var site_gas = [];
      var site_water = [];
      var site_date = [];

      new Promise ((resolve) => data.forEach(site => {if (site[0]===selectedOption) {
        {if (site[2] > 1){ site_oil.push(site[2])}}
        {if (site[3] > 1){ site_gas.push(site[3])}}
        {if (site[4] > 1){ site_water.push(site[4])}}
    

        //console.log(site);        
          //site_oil.push(site[2]);
          //site_gas.push(site[3]);
          //site_water.push(site[4]);
          site_date.push(site[8]) 
      } resolve()}));

        console.log(site_oil);
        console.log(site_gas)
        console.log(site_water);
        console.log(site_date)

        var dataOil = [{
          x: site_date,
          y: site_oil,
        type: "line",
        line: 
          {color: "green"}
     }]; // close oil data
        // open oil layout
        var layoutOil = {
          title: "Oil BBL",
          yaxis: {
            type: 'log',
            autorange: true
          }
        };//close oil layout
        // call oil data and layout to plot
       Plotly.newPlot("oilDeclineCurve", dataOil, layoutOil); 
    
        // gas decline curve data
        // open gas data
        var dataGas = [{
          x: site_date,
          y: site_gas,
        type: "line",
        line: 
          {color: "red"} }]; //close gas data
        // open gas layout
        var layoutGas = {
          title: "Gas BBL",
          yaxis: {
            type: 'log',
            autorange: true
          }
        }; //close gas layout
        //call gas data & layout to plot
        Plotly.newPlot("gasDeclineCurve", dataGas, layoutGas); 
    
        // water decline curve data
        //open water data
        var dataWater = [{
          x: site_date,
          y: site_water,
        type: "line" }]; //close water data
        //open water layout
        var layoutWater = {
          title: "Water BBL",
          yaxis: {
            type: 'log',
            autorange: true
          }
        };//close water layout
        //call water data & layout to plot
        Plotly.newPlot("waterDeclineCurve", dataWater, layoutWater);
      })};
  
      


// //FUNCTION TO CREATE HOME CURVES
// function curvesHome() {
//   d3.json("/static/all_production.json").then((data) =>{ //THIS WORKS!!!
//     var home_oil = [];
//     var home_gas = [];
//     var home_water = [];
//     var home_date = [];
//     new Promise ((resolve) => data.forEach(site => {if (site[0] === "CROC 1H") {
//       //console.log(site); 
//       home_oil.push(site[2]);
//       home_gas.push(site[3]);
//       home_water.push(site[4]);
//       home_date.push(site[8])
//     } resolve()}));

//     //console.log(croc_oil);
//     //console.log(croc_date);
//     //console.log(croc_gas);
//     //console.log(croc_water);
//     // oil decline curve data

//     // open oil data
//     var dataOil = [{
//       x: home_date,
//       y: home_oil,
//     type: "line" }]; // close oil data
//     // open oil layout
//     var layoutOil = {
//       title: "Oil BBL"
//     };//close oil layout
//     // call oil data and layout to plot
//     Plotly.newPlot("TESToilDeclineCurve", dataOil, layoutOil);

//     // gas decline curve data
//     // open gas data
//     var dataGas = [{
//       x: home_date,
//       y: home_gas,
//     type: "line" }]; //close gas data
//     // open gas layout
//     var layoutGas = {
//       title: "Gas BBL"
//     }; //close gas layout
//     //call gas data & layout to plot
//     Plotly.newPlot("TESTgasDeclineCurve", dataGas, layoutGas); 

//     // water decline curve data
//     //open water data
//     var dataWater = [{
//       x: home_date,
//       y: home_water,
//     type: "line" }]; //close water data
//     //open water layout
//     var layoutWater = {
//       title: "Water BBL"
//     };//close water layout
//     //call water data & layout to plot
//     Plotly.newPlot("TESTwaterDeclineCurve", dataWater, layoutWater);
//   })
// }

// curvesHome();


    //d3.csv('/DATA/data.csv').then(data => {
      //console.log(data[0]);
      //var selectedWell = data.filter(site => site.Site_name === selectedOption);
      //console.log(selectedWell)});
  




  //THIS CODE IS TO UNDERSTAND WHAT THE HECK IS HAPPENING !!!!!!

    // TRYING TO GET SITE NAMES FROM VARIABLE INTO DROP DOWN...SO I CAN DELETE THE NAMES FROM THE HTML
  //var siteNames = wellNames;
  // console.log(siteNames);


  // var allProduction = productionData; productionData.js used to access production data - unnecessary, since CSV is accessed the same way and I can actually save it straight from Voila
  // console.log(allProduction[0]);

  // d3.csv('/DATA/data.csv').then(data => {
  //   //console.log(data);
  //   console.log(data[0]);
  //   //console.log(data[67]['Site_Name']);
  //   //data.forEach(site => console.log(Object.values(site))); //THIS IS IT! THIS PRINTS EVERY ROW OF THE DATA

  //   // THIS DOES NOT WORK -> data.forEach(site => console.log(site => Object.values(site))); //.filter(point => point.Site_Name === "CROC 1H"))));
  //  // console.log(Object.values(data));
  //   var selectedWell = data.map(site => site.Site_Name === "CROC 1H"); //NEED VALUES, OBJECTVALUES METHOD PERHAPS and need to run a forloop of some sort
  //   //console.log(selectedWell);
  //   //data.forEach(element => {
  //     //console.log(element.Site_Name)}); //close forEach
  // });

  //d3.json("/DATA/allData.json").then((data) =>{ //read same as csv
    //console.log(data);
  //});

  // d3.json("/DATA/values_orientation.json").then((data) =>{ //THIS WORKS!!! 
  //   data.forEach(site => {if (site[0]=="CROC 1H") {
  //     console.log(site);
  //   }})
  // });



      // if (requestedSiteName) {
      //   filteredData = filteredData.filter(row => row.Site_Name == requestedSiteName)
      //   console.log(filteredData); //check to see what this looks like because i dont understand it
      // var filteredSite = element.filter(element => element.Site_Name === "CROCH 1H");
      // console.log(filteredSite);

  
    //var allSiteName = data[0];
  
  

  // // THIS CODE IS CREATING THE CURVES
  //   d3.csv("croc.csv").then(function(data) {
  //     console.log(data[0])
  //   var croc_oil= data.map(data => data.Oil_BBL);
  //   var croc_gas= data.map(data => data.Gas_MCF);
  //   var croc_water= data.map(data => data.Water_BBL);
  //   var croc_date= data.map(data => data.Date);  
  //   //console.log(croc_oil);
  //   //console.log(croc_date);
  //   //console.log(croc_gas);
  //   //console.log(croc_water);
  //   // oil decline curve data
  //   var dataOil = [{
  //     x: croc_date,
  //     y: croc_oil,
  //   type: "line" }];
  //   var layoutOil = {
  //     title: "Oil BBL"
  //   };
  //   Plotly.newPlot("oilDeclineCurve", dataOil, layoutOil);

  //   // gas decline curve data
  //   var dataGas = [{
  //     x: croc_date,
  //     y: croc_gas,
  //   type: "line" }];
  //   var layoutGas = {
  //     title: "Gas BBL"};
  //   Plotly.newPlot("gasDeclineCurve", dataGas, layoutGas);

  //   // water decline curve data
  //   var dataWater = [{
  //     x: croc_date,
  //     y: croc_water,
  //   type: "line" }];
  //   var layoutWater = {
  //     title: "Water BBL"};
  //   Plotly.newPlot("waterDeclineCurve", dataWater, layoutWater);
  //   ;
//FUNCTION TO CREATE DROP DOWN VALUES
function createDropdownOptions() {
  var selector = d3.select("#multiple-site-selection"); //select dropdown <select> in well.html with id:"siteSelection"
  d3.json('./static/wellNames.json').then((data) => { //read in the wellNames.json file, which contains the array "names" with all the well names
    var wellOptions = data.names;
    wellOptions.forEach((well) => {
      selector
      .append('option')
      .text(well)
      .property('Value', well);
    })
  })
};

createDropdownOptions(); //CALL FUNCTION TO CREATE DROPDOWN MENU VALUES

// //FUNCTION TO CREATE HOME/SUMMARY CURVES
function curvesHome() {
  d3.json("./static/all_production.json").then((data) =>{ //THIS WORKS!!!
    var site_oil = [];
    var site_gas = [];
    var site_water = [];
    summarySiteDate = [];

    new Promise ((resolve) => data.forEach(site => {if (site[0]==="Summary") {
      site_oil.push(site[2]);
      site_gas.push(site[3]);
      site_water.push(site[4]);
      summarySiteDate.push(site[8]);
    } resolve()}));
    //console.log(site_oil); //1069
    //console.log(site_gas);
    //console.log(site_water);
    //console.log(summarySiteDate);
    
    //CALL FUNCTION TO CREATE DROPDOWN MENU VALUES
    var mostRecentEntry = summarySiteDate[0]; //MOST RECENT DATE WITHOUT HOUR AS VARIABLE
    var addingHours = "T00:00"; //HOURS TO ADD TO MOST RECENT DATE - NEEDED TO NORMALIZE FROM ORIGINAL 19 HOUR FORMAT
    var nextYear = mostRecentEntry.concat(addingHours); //DATE AND HOUR AS SINGLE VARIABLE TO MAKE INTO DATE

    var mostRecentDate = new Date(nextYear); //MAKE VARIABLE INTO DATE
    var nextYearsDate = new Date(mostRecentDate.setFullYear(mostRecentDate.getFullYear() + 1)); //GET YEAR FROM MOST RECENT DATE AND ADD A YEAR

    var nextYear= nextYearsDate.getFullYear() //GET NEXT YEARS DATE
    var nextMonth= nextYearsDate.getMonth() + 1 // GET NEXTS YEARS MONTH, ADD ONE BECAUSE MONTHS ARE INDEXED AT 0
    var nextDate= nextYearsDate.getDate() //GET NEXT YEARS DATE

    nextYearGraph = `${nextYear}-${nextMonth}-${nextDate}`; // CREATE FULL DATE FOR NEXT YEAR IN RIGHT FORMAT FOR AXIS
    console.log(`${nextYearGraph} is a year from the most recent production date. This is from curvesHome()`);

    var dataOil = [{
      x: summarySiteDate,
      y: site_oil,
      type: "line",
      line:
      {color: "green"}
    }];
    var layoutOil = {
      title: "Oil BBL",
      yaxis: {
        type: 'log',
        autorange: true
      },
      xaxis: {
        autorange: false,
        range: [summarySiteDate[summarySiteDate.length-1], nextYearGraph]
      }
    };
    Plotly.newPlot("oilDeclineCurve", dataOil, layoutOil); 
    
    // gas decline curve data
    var dataGas = [{
      x: summarySiteDate,
      y: site_gas,
      type: "line",
      line: {color: "red"} 
    }];
    var layoutGas = {
      title: "Gas BBL",
      yaxis: {
        type: 'log',
        autorange: true
        },
      xaxis: {
        autorange: false,
        range: [summarySiteDate[summarySiteDate.length-1], nextYearGraph]
        }
      }; 
      Plotly.newPlot("gasDeclineCurve", dataGas, layoutGas); 
  
    // water decline curve data
    var dataWater = [{
      x: summarySiteDate,
      y: site_water,
      type: "line" }
    ]; 
    var layoutWater = {
      title: "Water BBL",
      yaxis: {
        type: 'log',
        autorange: true
        },
      xaxis: {
        autorange: false,
        range: [summarySiteDate[summarySiteDate.length-1], nextYearGraph]
        }
      };
    Plotly.newPlot("waterDeclineCurve", dataWater, layoutWater);
  })};

curvesHome();

  // //FUNCTION TO CHANGE CURVES BASED ON DROP DOWN SELECTION
  // function updateCurves(){
  //   var dropdownMenu = d3.selectAll("#multiple-site-selection").node();
  //   var dropdownMenuID = dropdownMenu.id;
  //   var selectedOption = dropdownMenu.value;
  //   console.log(dropdownMenuID);
  //   console.log(selectedOption);
  //   d3.json("./static/all_production.json").then((data) =>{
  //     var site_oil = [];
  //     var site_gas = [];
  //     var site_water = [];
  //     var site_date = [];

  //     new Promise ((resolve) => data.forEach(site => {if (site[0]===selectedOption) {
  //       site_oil.push(site[2]);
  //       site_gas.push(site[3]);
  //       site_water.push(site[4]);
  //       site_date.push(site[8])
  //        resolve()}}));

  //       console.log(`${nextYearGraph} is a year from the most recent production date`);

  //      //OIL CURVE////

  function addArrays(){};

  //FUNCTION TO CHANGE CURVES BASED ON DROP DOWN SELECTION
  function updateCurves(){
    var dropdownMenu = document.getElementById("multiple-site-selection").selectedOptions;
    var values = Array.from(dropdownMenu).map(({ value }) => value);
    console.log(values);

    d3.json("./static/all_production.json").then((data) =>{
      
      var requestedOil = []
      var requestedGas = [] 
      var requestedWater = []
      var site_date = [];
      
      //requestedOil = new Array(summarySiteDate.length + 6); //1069
      var Oil = []; 
      var Gas = [];
      var Water = [];
    
      values.forEach((well) => {
        console.log(well)
        Oil[well] = [];
        Gas[well] = [];
        Water[well] = [];
        
        new Promise ((resolve) => data.forEach(site => {
          if(values.length == 1 && well == site[0]){
            requestedOil.push(site[2])
            requestedGas.push(site[3])
            requestedWater.push(site[4])
            site_date.push(site[8])}
          else if(values.length > 1 && well == site[0]){
            Oil[well].push(site[2])
            Gas[well].push(site[3])
            Water[well].push(site[4])
            site_date.push(site[8])}

            //requestedOil = Oil[well].map(x => x) // PASSED TO OIL VARIABLE THAT WILL BE USED TO BUILD CURVE, BUT SHOULD BE ADDED TO IT
            //requestedOil = Oil[well].values() + requestedOil.values()
            //requestedOil = Oil[well].values() + requestedOil.values()
            resolve()
            //console.log(Oil[well])}
          }));
          
          //console.log(Oil[well])
         // requestedOil = Oil[well].values() + requestedOil.values()
          //console.log(typeof requestedOil);
          //console.log(requestedOil);
          //console.log(Oil[well]);
          //console.log(Gas[well]);
         // console.log(Water[well]);
         for (i of Oil[well]) { requestedOil = Oil[well]}
         // ADD THEM HERE??
         console.log(Oil[well]);
         requestedOil.push(Oil[well])
         console.log(requestedOil)
         
         
            
          });
         
          
        //   console.log(requestedOil); // I GOT UNDEFINED 
        //  // console.log(requestedOil.length);
        //   console.log(typeof requestedOil)
        //   console.log(typeof requestedOil)
        //   //console.log(requestedGas);
        //   //console.log(requestedWater);
          
         

          //// CODE TO ADD PRODUCTION FROM SELECTED WELLS ////
          console.log(`${nextYearGraph} is a year from the most recent production date`);
          
          //// OIL CURVE ////
          var dataOil = [{
          x: site_date,
          y: requestedOil,
        type: "line",
        line: 
          {color: "green"}
     }];
        var layoutOil = {
          title: "Oil BBL",
          yaxis: {
            type: 'log',
            autorange: true 
          },
          xaxis: {
            autorange: false,
            range: [site_date[site_date.length-1], nextYearGraph]
          }
        };
       Plotly.newPlot("oilDeclineCurve", dataOil, layoutOil); 
    
        //// GAS CURVE ////
        var dataGas = [{
          x: site_date,
          y: requestedGas,
          type: "line",
          line: 
          {color: "red"} }]; 
        var layoutGas = {
          title: "Gas BBL",
          yaxis: {
            type: 'log',
            autorange: true
          },
          xaxis: {
            autorange: false,
            range: [site_date[site_date.length-1], nextYearGraph]
          }
        };
        Plotly.newPlot("gasDeclineCurve", dataGas, layoutGas); 
    
        //// WATER CURVE ////
        var dataWater = [{
          x: site_date,
          y: requestedWater,
          type: "line" }]; 
        var layoutWater = {
          title: "Water BBL",
          yaxis: {
            type: 'log',
            autorange: true
          },
          xaxis: {
            autorange: false,
            range: [site_date[site_date.length-1], nextYearGraph]
          }
        };
        Plotly.newPlot("waterDeclineCurve", dataWater, layoutWater);
      })
    };

function multiWellFilter(){
  let options = document.getElementById('multiple-site-filter').selectedOptions;
  let values = Array.from(options).map(({ value }) => value);
  console.log(values);

  var filteredData = tableData;

  var requestedData = [];

  console.log(filteredData);

  values.forEach((well) => {
    filteredData.forEach((row) => {
      {if (well == row[0]){requestedData.push(row)}}
    }  //CLOSE OF CODE BLOCK IN forEach ROW IN THE DATASET
    ) //CLOSE OF forEach ROW IN THE DATASET
    buildTable(requestedData); //BUILD TABLE WITH RequestedData ARRAY
    values = ""; //CLEARING OUT VALUES 
  })
};
     
// LISTENER FOR CHANGE ON DROP DOWN MENU
d3.selectAll('body').on('change', updateCurves);

d3.selectAll('#clear-filter-btn').on("click", curvesHome);


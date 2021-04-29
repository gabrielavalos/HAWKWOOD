d3.json('./static/todaysImport.json').then((data) => {
   //console.log(data);
tableData = data
console.log(tableData);


// a way to read in all production data from a .js file
//const tableData = recentImport;
//console.log(tableData);
//global declaration of tbody, since it will be accessed in and out of functions
tbody = d3.select("tbody")


// CODE FOR MOST RECENT PRODUCTION IN TABULAR FORM
// function to import the data from recent.json, saved in this folder from Jupyter Notebook
function buildTable(tableData) {
  //clear table...is this necessary?
  tbody.html("");
  // read in yesterdays production data for all Hawkwood sites
  //d3.json("/DATA/recent.json").then(function(data) { //this is giving me an issue !!!!!!
    // print the array to the console 
    //console.log(data);
    // loop thrugh the array
  tableData.forEach((well) => {
      //print each object in the array to the console
      //console.log(well);
      // for each well add a row to the tbody
      let row = tbody.append("tr");
      // loop through each value to add a cell for each of it
      Object.values(well).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
      })
    }); // closing forEach
  }; //closing d3



//FUNCTION TO CREATE DROP DOWN VALUES
function createDropdownOptions() {
  //select dropdown <select> in well.html with id:"siteSelection"
  // var singleSiteSelector = d3.select("#siteFilter");
  var multipleSiteSelector = d3.select("#multiple-site-filter");
  //read in the wellNames.json file, which contains the array "names" with all the well names
  d3.json('./static/wellNames.json').then((data) => {
    // console.log(data);
  var wellOptions = data.names;
  wellOptions.forEach((well) => {
    // singleSiteSelector
    //   .append('option')
    //   .text(well)
    //   .property('Value', well);
      multipleSiteSelector
      .append('option')
      .text(well)
      .property('Value', well);
  })
})
};

createDropdownOptions();

//BUILD TABLE AS SOON AS THE PAGE LOADS
buildTable(tableData);

// START OF FUNCTION TO HANGLE SINGLE WELL SELECT FILTER //
function handleClick() {
  // the value entered in the sitename filter becomes the value for the siteName variable
  let requestedSiteName = d3.select("#siteFilter").property("value");
  console.log(requestedSiteName);
  // set data be filtered to imported data (the data ready to be filtered)
  let filteredData = tableData;
  if (requestedSiteName) {
    filteredData = filteredData.filter(row => row[0] == requestedSiteName)
    console.log(filteredData); //check to see what this looks like because i dont understand it
  };
  //build table using the filteredData variable
  buildTable(filteredData);
};
//END OF FUNCTION TO HANGLE SINGLE WELL SELECT FILTER //


//START OF FUNCTION TO HANDLE MULTI WELL FILTER //
function multipleWellSelected() {
  let options = document.getElementById('multiple-site-filter').selectedOptions;
  // let options = d3.select('multiple-site-filter').node().value();
  let values = Array.from(options).map(({ value }) => value);
  // the value entered in the sitename filter becomes the value for the siteName variable
  console.log(values);
  // set data be filtered to imported data (the data ready to be filtered)
  let filteredData = tableData;
  var requestedData = [];
  console.log(filteredData);
  values.forEach((well) => // two wells selected
  {
    //  console.log(filteredData[0][0]); //this is printed twice
    filteredData.forEach((row) => {
      //console.log(row[0]); //THIS IS WHAT I NEED TO FIX! THIS! THIS! THIS! OMG
      //console.log(well); // THIS PRINTS THE WELL NAME FOR HOWEVER MANY ROWS I HAVE, SO 16 TIMES
      // if(well == row[0]){console.log("did this work?")};
      {if (well == row[0]){requestedData.push(row)}}
      // filteredData = filteredData.filter(row => row[0] == well);
      // console.log(requestedData);
    }  //CLOSE OF CODE BLOCK IN forEach ROW IN THE DATASET
    ) //CLOSE OF forEach ROW IN THE DATASET
    buildTable(requestedData); //BUILD TABLE WITH RequestedData ARRAY
  values = ""; //CLEARING OUT VALUES 
})}; //END OF multipleWellSelected()


///////////////////////// CODE I USED TO COME UP WITH THE RIGHT FUNCTION /////////////////////////
                            //filteredData = filteredData.filter(row => row[0] == requestedSiteName)
                          // console.log(filteredData); //check to see what this looks like because i dont understand it

                          // if (requestedSiteName) {
                          //   filteredData = filteredData.filter(row => row[0] == requestedSiteName)
                          //   console.log(filteredData); //check to see what this looks like because i dont understand it
                          // };
                          // //build table using the filteredData variable
                          // buildTable(filteredData);

                          // THIS IS NOT WORKING //
                          // function multipleWellSelected() {
                          //   let filteredData = tableData;
                          //   console.log(filteredData);
                          //   let options = document.getElementById('multiple-site-filter').selectedOptions;
                          //   let values = Array.from(options).map(({ value }) => value);
                          //   console.log(values);
                          //   //var filteredData = tableData
                          //   values.forEach(function(i) {
                          //     console.log(filteredData)
                          //     filteredData.forEach(function(row) {
                          //       console.log(row);
                          //       if(i === row[0]) {
                          //         filteredData = filteredData[row]
                          //         console.log(filteredData)
                                  
                          //       };
                          //     })
                          //   })
                          //   buildTable(filteredData);
                          // };

                          // END OF THIS IS NOT WORKING //

                                // if(i === row[0]) {
                                //   filteredData = filteredData.filter(row => row[0] == i)} 
                                  
                                //   filteredData = filteredData.filter(row => row[0] == i)}) // THIS IS WHERE I AM GOING WRONG
                                // })
                                // if(i === row[0]) {filteredData = filteredData.filter(row => row[0] == i)}


                            // let filteredData = tableData;
                            // var options = document.getElementById('multiple-site-filter').selectedOptions;
                            // var values = Array.from(options).map(({ value }) => value);
                            // //console.log(values);
                            // if(i === row[0]) {
                            // values.forEach((i) => {
                            //   //console.log(i) //PRINTS OUT EVERY SELECTED WELL // if i == filteredData.row[0] then filteredData =
                            //   filteredData.forEach((row) => {
                            //     console.log(row);
                            //     //console.log(i)
                            //     // if(i === row[0]) {
                            //     //   //console.log(i)
                            //       filteredData = filteredData.filter(row => row[0] == i)
                                
                            //    } 
                            //       //console.log(filteredData)
                              
                            
                              
                            // ;
                            
                          // FOR THE LENGTH OF VALUES?

                            // console.log(values)
                            
                            // values.forEach((well) => {
                            //   if(well) {
                            //     filteredData = filteredData.filter(
                            //       row => row[0] == well)
                                
                            //   }
                            //   console.log(well)
                            // });
                            //create a temporary filteresd data set variable with all the selected data
                            //build table using the filteredData variable
                            // USE VALUES ARRAY TO CREATE A FILTERES DATA?
                          // buildTable(filteredData);


                          //build table as soon as page loads

///////////////// END OF CODE I USED TO COME UP WITH THE RIGHT FUNCTION ////////////////////////


                          ////////LISTENER FOR SINGLE WELL FILTER, NOT BEING USED//////////////
                          // d3.selectAll('#siteFilter').on("change", handleClick);

                          //LISTENER TO ACTIVATE FILTER WITH A BUTTON CLICK, NOT BEING USED
                          // d3.selectAll('#multiple-site-filter').on("change", multipleWellSelected);


// LISTENER TO ACTIVATE FILTER, ALLOWS FOR SINGLW OR MULTI WELL FILTERING ON CHANGE
d3.selectAll('#multiple-site-filter').on("change", multipleWellSelected);


                          //LISTENER TO ACTIVATE FILTER WITH A BUTTON CLICK, NOT BEING USED
                          //d3.selectAll('#clear-filter-btn').on("click", multipleWellSelected);

//FUCTION TO CLEAR FILTERED TABLE
function clearTable(tableData){
  d3.json('./static/todaysImport.json').then((data) => {
    tableData = data;
    tbody = d3.select("tbody");
    tbody.html("");
    tableData.forEach((well) => {
      let row = tbody.append("tr");
      Object.values(well).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        //CODE TO RESET DROPDOWN i.e. CLEAR SELECTION
        var dropDown = document.getElementById("multiple-site-filter"); 
        dropDown.selectedIndex = 0
      })})})};
  
 //LISTENER TO TRIGGER ClearTable FUNCTION
d3.selectAll('#clear-filter-btn').on("click", clearTable);

});
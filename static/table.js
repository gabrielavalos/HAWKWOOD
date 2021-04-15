d3.json('./static/todaysImport.json').then((data) => {
  // console.log(data);
  const tableData = data.todaysImport;


// a way to read in all production data from a .js file
//const tableData = recentImport;
console.log(tableData);
//global declaration of tbody, since it will be accessed in and out of functions
var tbody = d3.select("tbody")


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
      console.log(well);
      // for each well add a row to the tbody
      let row = tbody.append("tr");
      // loop through each value to add a cell for each of it
      Object.values(well).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
      })
    }); // closing forEach
  }; //closing d3



function handleClick() {
  // the value entered in the sitename filter becomes the value for the siteName variable
  let requestedSiteName = d3.select("#siteName").property("value");
  // set data be filtered to imported data (the data ready to be filtered)
  let filteredData = tableData;
  if (requestedSiteName) {
    filteredData = filteredData.filter(row => row[0] == requestedSiteName)
    console.log(filteredData); //check to see what this looks like because i dont understand it
  };
  //build table using the filteredData variable
  buildTable(filteredData);
};

//create listener for when user wants to filter data
d3.selectAll('#filter-btn').on("click", handleClick);

//build table as soon as table loads
buildTable(tableData);
});


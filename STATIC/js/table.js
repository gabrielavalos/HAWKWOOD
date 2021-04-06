// CODE FOR MOST RECENT PRODUCTION IN TABULAR FORM
// import the data from mostRecentProduction.json


// read in yesterdays production data for all Hawkwood sites
d3.json("/DATA/recent.json").then(function(data) {
  // print the array to the console
  console.log(data);
  // loop thrugh the array
  data.forEach((well) => {
    //print each object in the array to the console
    console.log(well);
    // Reference the HTML table using d3
    var tbody = d3.select("tbody");
    // for each well add a row
    let row = tbody.append("tr");
    // loop through each value to add a cell for each of it
    Object.values(well).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    })
     }); // closing forEach
   }); //closing d3

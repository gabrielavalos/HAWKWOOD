// CODE FOR MOST RECENT PRODUCTION IN TABULAR FORM
// import the data from mostRecentProduction.json



d3.json("/DATA/recent.json").then(function(data) {
  console.log(data);

  data.forEach((siteProduction) => {
   // console.log(siteProduction.Site_Name);
   let row = tbody.append("tr");
   Object.values(siteProduction).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
   });
  })
});


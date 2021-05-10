function createWellOptions() {
    var wellSelector = d3.select("#well-partners");
    var partnerSelector = d3.select("#partner-name");

    d3.json('./static/wellNames.json').then((data) => { //read in the wellNames.json file, which contains the array "names" with all the well names
        var wellOptions = data.names.slice(1);
        wellOptions.forEach((well) => {
            wellSelector
            .append('option')
            .text(well)
            .property('Value', well);
        })
    })

    let options = document.getElementById('well-partners').selectedOptions
    let values = Array.from(options).map(({ value }) => value);



    d3.json('./static/net_interests.json').then((well) => {
    //console.log(well);
    var wellOptions = new Array()
    // IF [1] IS IN VALUES, THEN wellOptions IS[3]

    well.forEach((site) => {
        if (values.includes(site[0])) {
          wellOptions = site[3]
            console.log(wellOptions);
        }
      })

}) //END OF d3
}; //END OF createOptions() 

createWellOptions()

//function createPartnerOptions()
//based on selected wells

//d3.selectAll('well-partners').on('change', createPartnerOptions);
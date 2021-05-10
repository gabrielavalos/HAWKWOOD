function createOptions() {
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


    
    d3.json('./static/net_interests.json').then((data) => {
    console.log(data);
    var wellOptions = data

}) //END OF d3
}; //END OF createOptions() 

createOptions()
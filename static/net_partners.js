function createPartnerOptions() {
    var partnerSelector = d3.select("#partner-name");

    d3.json('./static/partner_list.json').then((partnerData) => { //read in the wellNames.json file, which contains the array "names" with all the well names
        var partnerOptions = partnerData;
        //console.log(partnerOptions)
        partnerOptions.forEach((partner) => {
            partnerSelector
            .append('option')
            .text(partner)
            .property('Value', partner);
        })
        document.getElementById("partner-name").size = partnerOptions.length
    })
}; //END OF createOptions() 



createPartnerOptions()

function createWellOptions() {
    var wellSelector = d3.select("#well-options");

    var dropdownMenu = document.getElementById("partner-name").selectedOptions;
    values = Array.from(dropdownMenu).map(({ value }) => value);
    console.log(values);
    var wellOptions = new Array

    d3.json('./static/net_interests.json').then((well) => {
        
        well.forEach((interest) => {
            if (values.includes(interest[3])) {
                wellOptions.push(interest[1])
            }
        })
        wellOptions.forEach((well) => {
            wellSelector
            .append('option')
            .text(well)
            .property('Value', well);
        });

         document.getElementById("well-options").size = wellOptions.length;
    })

     
    document.getElementById("partner-name").addEventListener("change", clearWellOptions)
    

}; //END OF createOptions() 


d3.select("#partner-name").on('change', createWellOptions);

function clearWellOptions(){
    document.getElementById("well-options").options.length = 0
};
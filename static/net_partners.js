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
    })
}; //END OF createOptions() 

// function createPartnerOptions() {
//     var partnerSelector = d3.select("#partner-name");

//     d3.json('./static/partner_dict.json').then((partnerData) => { //read in the wellNames.json file, which contains the array "names" with all the well names
//         var partnerOptions = partnerData.data;
//         console.log(partnerOptions)
//         partnerOptions.forEach((partner) => {
//             partnerSelector
//             .append('option')
//             .text(partner[1])
//             .property('Value', partner[1]);
//         })
//     })
// }; //END OF createOptions() 

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
    })

    document.getElementById("partner-name").addEventListener("change")
}; //END OF createOptions() 

createWellOptions()

d3.selectAll('body').on('change', createWellOptions);













// function createWellOptions() {
//     var wellSelector = d3.select("#well-options");

//     var dropdownMenu = document.getElementById("partner-name").selectedOptions;
//     values = Array.from(dropdownMenu).map(({ value }) => value);
//     console.log(values);


    

//     d3.json('./static/wellNames.json').then((data) => { //read in the wellNames.json file, which contains the array "names" with all the well names
//         var wellOptions = data.names.slice(1);
//         //console.log(wellOptions)
//         wellOptions.forEach((well) => {
//             wellSelector
//             .append('option')
//             .text(well)
//             .property('Value', well);
//         })
//     })
// }; //END OF createOptions() 

// createWellOptions()
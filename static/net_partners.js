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
         d3.select("#well-options").on('change', createPartnerNetCurves);
    })

    
     
    document.getElementById("partner-name").addEventListener("change", clearWellOptions)
    
    

}; //END OF createOptions() 


d3.select("#partner-name").on('change', createWellOptions);

function clearWellOptions(){
    document.getElementById("well-options").options.length = 0
};


function createPartnerNetCurves() {
    
    var dropdownMenu = document.getElementById("well-options").selectedOptions;
    values = Array.from(dropdownMenu).map(({ value }) => value);
    console.log(typeof values);

    d3.json("./static/all_production.json").then((data) =>{
        var site_oil = [];
        var site_gas = [];
        var site_water = [];
        summarySiteDate = [];
  
         data.forEach(site => {if (site[0] == values[0]) {
            site_oil.push(site[2]);
            site_gas.push(site[3]);
            site_water.push(site[4]);
            summarySiteDate.push(site[8])}
            });
  
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
                    {color: "green"}}];
            var layoutOil = {
                title: "Oil BBL",
                yaxis: {
                    type: 'log',
                    autorange: true},
                xaxis: {
                    autorange: false,
                    range: [summarySiteDate[summarySiteDate.length-1], nextYearGraph]}};
  
            Plotly.newPlot("oilDeclineCurve", dataOil, layoutOil);
            var dataGas = [{
                x: summarySiteDate,
                y: site_gas,
                type: "line",
                line:
                    {color: "red"}}];
            var layoutGas = {
                title: "Gas BBL",
                yaxis: {
                    type: 'log',
                    autorange: true},
                xaxis: {
                    autorange: false,
                    range: [summarySiteDate[summarySiteDate.length-1], nextYearGraph]}};
            Plotly.newPlot("gasDeclineCurve", dataGas, layoutGas);
  
            var dataWater = [{
                x: summarySiteDate,
                y: site_water,
                type: "line" }];
            var layoutWater = {
                title:  "Water BBL", //add each well name to title 
                yaxis: {
                    type: 'log',
                    autorange: true},
                xaxis: {
                    autorange: false,
                    range: [summarySiteDate[summarySiteDate.length-1], nextYearGraph]}};
            Plotly.newPlot("waterDeclineCurve", dataWater, layoutWater);
        })
        

};





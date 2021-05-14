function createPartnerOptions() {
    var partnerSelector = d3.select("#partner-name"); //SELECT <select> WHERE PARTNER NAMES WILL APPEAR

    d3.json('./static/partner_list.json').then((partnerOptions) => { //READ IN JSON FILE COINTAING ALL PARTNER'S NAMES
        //var partnerOptions = partnerData; 
        //console.log(partnerOptions)
        partnerOptions.forEach((partner) => { //LOOP THROUGH PARTNER LIST TO CREATE INITAL DROP DOWN
            partnerSelector
            .append('option')
            .text(partner)
            .property('Value', partner);
        })
        document.getElementById("partner-name").size = partnerOptions.length //SELECT PARTER <select> AND MAKE IT THE SIZE OF THE LENGTH OF THE PARTNER'S LIST
    })
}; //END OF createOptions() 

createPartnerOptions() //CALL FUNCTION TO CREATE PARTNER'S NAME AS SOON AS THE PAGE LOADS

function createWellOptions() {
    var wellSelector = d3.select("#well-options"); //SELECT TJE "well-options" <select>

    var dropdownMenu = document.getElementById("partner-name").selectedOptions; //MAKE SELECTED PARTNER NAME INTO A var
    values = Array.from(dropdownMenu).map(({ value }) => value); //MAKE SELECTED PARTNER INTO AN ARRAY
    console.log(values);
    wellOptions = new Array //EMPTY ARRAY WHERE PARTNER'S WELLS WILL BE PUSHED (.push) TO
 
    d3.json('./static/net_interests.json').then((well) => { //READ IN .json CONTAINING PARTNER'S WELL AND INTEREST INFO
        well.forEach((interest) => { //LOOP THROUGH IS ROW OF DATA (interest)
            if (values.includes(interest[3])) { //IF THE PARTNER SELECTION (values) HAS THE NAME OF THE PARTNER LOCATED AT INDEX 3, THEN..
                wellOptions.push(interest[1]) //TTHAT WELL IS PUSHED TO wellOptions
            }
        }) //CLOSE interest LOOP
        wellOptions.forEach((well) => { //LOOP THROUGH THE ARRAY COINTAINING PARTNER'S WELLS
            wellSelector //APPEND WELLS TO well-options <select>
            .append('option')
            .text(well)
            .property('Value', well);
        });

         document.getElementById("well-options").size = wellOptions.length; //SET THE SIZE OF THE well-options <select> TO THE LEGTH OF THE wellOptions ARRAY
         d3.select("#well-options").on('change', createPartnerNetCurves); //WHEN THERE IS A CHANGE ON THE well-options <select> CREATE THE CURVES SO THEY REFLECT THAT CHANGE, i.e. CREAT THE CURVE OF THE WELL THAT WAS SELECTED IN THE <select> (THIS NEEDS TO CHANGE)

         //CREATE CURVES GOES HERE

    })
    document.getElementById("partner-name").addEventListener("change", clearWellOptions) //WHEN THE SELECTION ON PARTNERS CHANGES, CLEAR OUT THE WELL OPTIONS
    document.getElementById("partner-name").addEventListener("change", clearCurves) //WHEN THE SELECTION ON PARTNERS CHANGES, CLEAR OUT THE CURVES
}; //END OF createOptions() 

d3.select("#partner-name").on('change', createWellOptions); //WHEN THERE IS A CHANGE IN THE PARTNERS SELECT, CREATE WELL OPTIONS FOR THAT PARTNER

function clearWellOptions(){ //FUNCTION TO CLEAR OUT WELL OPTIONS, USED WHEN PARTNER SELECTION IS CHANGED
    document.getElementById("well-options").options.length = 0
};

function createPartnerNetCurves() { //CREATE CURVES

    d3.json("./static/all_production.json").then((data) =>{
        d3.json("./static/net_interests.json").then((interestData) => { 
            var requestedOil = [];
            var requestedGas = [];
            summarySiteDate = [];

            var site_oil = {};
            var site_gas = {};
            var interestOwned = 0
            
            interestData.forEach((partner) => { if (wellSelected[0] === partner[1] && values[0] === partner[3]){
                 interestOwned = partner[4] //need to get the interest for each partner
            }})
            
            data.forEach(site => {
                if (values.includes(site[0])) {
                    site_oil[site[8]] = site_oil.hasOwnProperty(site[8])
                        ? Oil[site[8]] * interestOwned
                        : parseFloat(site[2]);
                    site_gas[site[8]] = site_gas.hasOwnProperty(site[8])
                        ? site_gas[site[8]] * interestOwned
                        : parseFloat(site[3]);

                        console.log("++++", site_oil, site);
                    }
                  })
            
                  console.log("----", site_oil);

                summarySiteDate = Object.keys(Oil);
                requestedOil = site_date.map(date => site_oil[date]);
                requestedGas = site_date.map(date => site_gas[date]);
     
            
            var mostRecentEntry = summarySiteDate[0]; //MOST RECENT DATE WITHOUT HOUR AS VARIABLE
            console.log(mostRecentEntry);
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
  
        })
    })
};

function clearCurves(){ //MAKE THIS INTO DISAPPEARING THE CURVES?
    var site_oil = [];
    var site_gas = [];
    summarySiteDate = [];
    
    var dataOil = [{
        x: summarySiteDate,
        y: site_oil,
        type: "line",
        line:
            {color: "green"}}];
    var layoutOil = {
        title: "Oil BBL",
        yaxis: {
            type: 'log'}};
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
            type: 'log'}};
    Plotly.newPlot("gasDeclineCurve", dataGas, layoutGas);
};

























// function createPartnerNetCurves() { //CREATE CURVES
//     var dropdownMenu = document.getElementById("well-options").selectedOptions; //GET SELECTED OPTION FROM well-options <select> WONT NEED THIS
//     wellSelected = Array.from(dropdownMenu).map(({ value }) => value);
//     console.log(wellSelected);

//     d3.json("./static/all_production.json").then((data) =>{
//         d3.json("./static/net_interests.json").then((interestData) => { 
//             var site_oil = [];
//             var site_gas = [];
//             // var site_water = [];
//             summarySiteDate = [];
//             var interestOwned = 0
//             // var interestOwned = .1 //USED FOR TESTING
            
//             interestData.forEach((partner) => { if (wellSelected[0] === partner[1] && values[0] === partner[3]){
//                  interestOwned = partner[4] //COMMENT OUT FOR TESTING
//             }})
//             console.log(interestOwned);
            
//             data.forEach(site => {if (site[0] === wellSelected[0]) {
//             site_oil.push(site[2] * parseFloat(interestOwned));
//             site_gas.push(site[3] * parseFloat(interestOwned));
//             // site_water.push(site[4]);
//             summarySiteDate.push(site[8])}
//             });
            
//             var mostRecentEntry = summarySiteDate[0]; //MOST RECENT DATE WITHOUT HOUR AS VARIABLE
//             console.log(mostRecentEntry);
//             var addingHours = "T00:00"; //HOURS TO ADD TO MOST RECENT DATE - NEEDED TO NORMALIZE FROM ORIGINAL 19 HOUR FORMAT
//             var nextYear = mostRecentEntry.concat(addingHours); //DATE AND HOUR AS SINGLE VARIABLE TO MAKE INTO DATE
  
//             var mostRecentDate = new Date(nextYear); //MAKE VARIABLE INTO DATE
//             var nextYearsDate = new Date(mostRecentDate.setFullYear(mostRecentDate.getFullYear() + 1)); //GET YEAR FROM MOST RECENT DATE AND ADD A YEAR
  
//             var nextYear= nextYearsDate.getFullYear() //GET NEXT YEARS DATE
//             var nextMonth= nextYearsDate.getMonth() + 1 // GET NEXTS YEARS MONTH, ADD ONE BECAUSE MONTHS ARE INDEXED AT 0
//             var nextDate= nextYearsDate.getDate() //GET NEXT YEARS DATE
  
//             nextYearGraph = `${nextYear}-${nextMonth}-${nextDate}`; // CREATE FULL DATE FOR NEXT YEAR IN RIGHT FORMAT FOR AXIS
//             console.log(`${nextYearGraph} is a year from the most recent production date. This is from curvesHome()`);
  
//             var dataOil = [{
//                 x: summarySiteDate,
//                 y: site_oil,
//                 type: "line",
//                 line:
//                     {color: "green"}}];
//             var layoutOil = {
//                 title: "Oil BBL",
//                 yaxis: {
//                     type: 'log',
//                     autorange: true},
//                 xaxis: {
//                     autorange: false,
//                     range: [summarySiteDate[summarySiteDate.length-1], nextYearGraph]}};
  
//             Plotly.newPlot("oilDeclineCurve", dataOil, layoutOil);
//             var dataGas = [{
//                 x: summarySiteDate,
//                 y: site_gas,
//                 type: "line",
//                 line:
//                     {color: "red"}}];
//             var layoutGas = {
//                 title: "Gas BBL",
//                 yaxis: {
//                     type: 'log',
//                     autorange: true},
//                 xaxis: {
//                     autorange: false,
//                     range: [summarySiteDate[summarySiteDate.length-1], nextYearGraph]}};
//             Plotly.newPlot("gasDeclineCurve", dataGas, layoutGas);
  
//         })
//     })
// };
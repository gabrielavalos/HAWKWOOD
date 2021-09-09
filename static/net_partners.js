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
        //document.getElementById("partner-name").size = partnerOptions.length //SELECT PARTER <select> AND MAKE IT THE SIZE OF THE LENGTH OF THE PARTNER'S LIST
    })
}; //END OF createOptions() 

createPartnerOptions() //CALL FUNCTION TO CREATE PARTNER'S NAME AS SOON AS THE PAGE LOADS

function createWellOptions() {
    var wellSelector = d3.select("#well-options"); //SELECT THE "well-options" <select>
    wellPartnerInterest = []; //PARTNER'S INTERESTS
   

    var partnersWellAndInterest = {} //WILL CONTAIN THE WELL(S) AND CORRESPONDING INTERESTS FOR THE SELECTED PARTNER
    

    var dropdownMenu = document.getElementById("partner-name").selectedOptions; //MAKE SELECTED PARTNER NAME INTO A var
    values = Array.from(dropdownMenu).map(({ value }) => value); //SELECTED PARTNER INTO ARRAY
    console.log(values); //SELECTED PARTNER 
    wellOptions = new Array //EMPTY ARRAY WHERE PARTNER'S WELLS WILL BE PUSHED (.push) TO
 
    d3.json('./static/net_interests.json').then((well) => { //READ IN .json CONTAINING PARTNER'S WELL AND INTEREST INFO
        well.forEach((interest) => { //LOOP THROUGH  ROW OF DATA (interest)
            if (values.includes(interest[3])) { //IF THE PARTNER SELECTED (values) HAS THE NAME OF THE PARTNER LOCATED AT INDEX 3, THEN..
                wellOptions.push(interest[1]) //THAT WELL NAME IS PUSHED TO wellOptions (LIST CONTAINING ALL THE WELLS PARTNER IS IN) NEED THIS TO DISPLAY ALL WELLS FOR USER
            }
        }) //CLOSE interest LOOP
        wellOptions.forEach((well) => { //LOOP THROUGH THE ARRAY COINTAINING PARTNER'S WELLS
            wellSelector //APPEND WELLS TO well-options <select>
            .append('option')
            .text(well)
            .property('Value', well);
        });
        document.getElementById("well-options").size = wellOptions.length; //SET THE SIZE OF THE well-options <select> TO THE LEGTH OF THE wellOptions ARRAY
        

         //CODE TO UPDATE CURVES STARTS HERE
         well.forEach((partner) =>{ //LOOP TROUGH INTEREST DATA TO GET THE INTEREST FOR EACH WELL THE PARTNER IS IN
            if (wellOptions.includes(partner[1]) && values.includes(partner[3])) { //IF THE LIST OF WELLS THE PARTNER IS IN AND THE PARTNERS NAME ARE BOTH IN THE ROW OF WELL DATE (partner)
            wellPartnerInterest.push(partner[4]) //THE INTEREST IN THAT ROW IS PUSHED TO THE LIST CONTAINING ALL INTERETS FOR THAT PARTNER
        }
    }
);

    wellOptions.forEach((key, i) => partnersWellAndInterest[key]= wellPartnerInterest[i]) //KEY:VALUES = WELL NAME:INTEREST OWNED
    console.log("partnersWellAndInterest", partnersWellAndInterest)





newData = [] //PRODUCTION DATA ONLY RELEVANT TO SELECTED PARTNER


netOilProductionForWell = []; //CONTAINS EACH WELLS DAILY OIL NET PRODUCTION OWNED 
allOilNetsAdded = []; //COINTAINS DAILY OIL SUM 

netGasProductionForWell = []; //CONTAINS EACH WELLS DAILY GAS NET PRODUCTION OWNED 
allGasNetsAdded = []; //COINTAINS DAILY GAS SUM 

all_dates = []



//production = [];
//interest = [];


//CREATING PRODUCTION DATA SET RELEVANT TO SELECTED PARTNER (COINTAINS DATA ONLY FOR THE WELLS THEY ARE IN)
{d3.json("./static/all_production.json").then((data) =>{
    data.forEach((site) =>  {if(wellOptions.includes(site[0])){
        newData.push(site);
        all_dates.push(site[8])
    }}
    );
    //console.log(newData); //CHECK THAT ONLY THEIR RELEVANT DATA IS BEING STORED IN newData

    //FOR EACH POINT IN new_data, x[0] HAS THE WELL NAME FROM  partnersWellAndInterest (THE OBJECT CONTAINING wellName:wellInterest), THEN netOilProductionForWell = THE production  x[2] * partnersInterest[x[0]] (property name [WELL NAME][0]), WHICH IS THE INTEREST FOR THAT WELL 
    newData.forEach((x) => {if(partnersWellAndInterest.hasOwnProperty(x[0])){netOilProductionForWell = newData.map(x => x[2] * partnersWellAndInterest[x[0]]);
                                                                            netGasProductionForWell = newData.map(x => x[3] * partnersWellAndInterest[x[0]])} //SITE[2]*DESIGNATED INTEREST
  
  //USE THIS TO CHECK WHAT DAILY PRODUCTION IS MULTIPLIED BY WHAT INTEREST 
   //newData.forEach((x) => {if(partnersWellAndInterest.hasOwnProperty(x[0])){production.push(x[2]), interest.push(partnersWellAndInterest[x[0]])} // dividing designated interest and designated production into two arrays

    
    //console.log(x[2], partnersWellAndInterest[x[0]])
     
    
});
//console.log(production);
//console.log(interest);

//console.log("netGasProductionForWell", netGasProductionForWell);
    //console.log("netOilProductionForWell", netOilProductionForWell);
    //console.log(newData);
    //console.log(Object.entries(partnersWellAndInterest))
  
    //console.log(x)

    //SPLIT netOilProductionForWell INTO ARRAYS OF THE LENGTH OF wellOptions (WELLS PARTNER IS IN)
    var size = wellOptions.length; var arrayOfOilArrays = []; var arrayOfGasArrays = [];

    for (var i=0; i<netOilProductionForWell.length; i+=size) {
         arrayOfOilArrays.push(netOilProductionForWell.slice(i,i+size));
    }
//SPLIT netGasProductionForWell INTO ARRAYS OF THE LENGTH OF wellOptions (WELLS PARTNER IS IN)
    for (var i=0; i<netGasProductionForWell.length; i+=size) {
        arrayOfGasArrays.push(netGasProductionForWell.slice(i,i+size));
   }
    //console.log(arrayOfArrays);
    //REDUCE EACH ARRAY (REDUCE SUMS ALL VALUES IN AN ARRAY)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    allOilNetsAdded = arrayOfOilArrays.map(x => x.reduce(reducer))
    allGasNetsAdded = arrayOfGasArrays.map(x => x.reduce(reducer))
    //console.log(allNetsAdded);

    //GET ALL UNIQUE DATES
    var site_date = [...new Set(all_dates)];
    //console.log(site_date);
    
    //})};

    var mostRecentEntry = site_date[0]; //MOST RECENT DATE WITHOUT HOUR AS VARIABLE
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
                x: site_date,
                y: allOilNetsAdded,
                type: "line",
                line:
                    {color: "green"}}];
            var layoutOil = {
                title: "Oil BBL",
                yaxis: {
                    title: "BOPD Net",
                    type: 'log',
                    autorange: true},
                xaxis: {
                    autorange: false,
                    range: [site_date[site_date.length-1], nextYearGraph]}};
  
            Plotly.newPlot("oilDeclineCurve", dataOil, layoutOil);
            var dataGas = [{
                x: site_date,
                y: allGasNetsAdded,
                type: "line",
                line:
                    {color: "red"}}];
            var layoutGas = {
                title: "Gas BBL",
                yaxis: {
                    title: "MCFD Net",
                    type: 'log',
                    autorange: true},
                xaxis: {
                    autorange: false,
                    range: [site_date[site_date.length-1], nextYearGraph]}};
            Plotly.newPlot("gasDeclineCurve", dataGas, layoutGas);

        })};

})
        
        
      
    document.getElementById("partner-name").addEventListener("change", clearWellOptions) //WHEN THE SELECTION ON PARTNERS CHANGES, CLEAR OUT THE WELL OPTIONS
    document.getElementById("partner-name").addEventListener("change", clearCurves) //WHEN THE SELECTION ON PARTNERS CHANGES, CLEAR OUT THE CURVES
}; //END OF createOptions() 

d3.select("#partner-name").on('change', createWellOptions); //WHEN THERE IS A CHANGE IN THE PARTNERS SELECT, CREATE WELL OPTIONS FOR THAT PARTNER

function clearWellOptions(){ //FUNCTION TO CLEAR OUT WELL OPTIONS, USED WHEN PARTNER SELECTION IS CHANGED
    document.getElementById("well-options").options.length = 0
 };

function clearCurves(){ //MAKE THIS INTO DISAPPEARING THE CURVES?
    var site_oil = [];
    var site_gas = [];
    site_date = [];
    
    var dataOil = [{
        x: site_date,
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
        x: site_date,            
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
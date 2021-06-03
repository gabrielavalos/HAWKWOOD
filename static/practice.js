//A FUNCTION WHERE I PASS IN EACH PRODUCTION ARRAY AND THE CORRESPONDING INTEREST
//////////////////////////OPTION LOOPING THROUGH INTEREST ARRAY INSIDE FUNCTION////////////////////////////////////////
// function netInterestPerWell(wellProduction, interestList) {
//     requestedOil = {}
//     Oil = Object.values(site_date)

//     console.log("BEFORE site_date", site_date)
//     console.log("BEFORE Oil", Oil)

//     interestList.forEach((interest) =>{
//         dayNetInterest = new Array;
//         netOwned = 0;
//         wellProduction.forEach((day) => {
//             netOwned = day * parseFloat(interest);
//             dayNetInterest.push(netOwned);
//         });
//     });
//     console.log("multiplied", dayNetInterest)
//     console.log("original", wellProduction)

//     site_date = Object.keys(Oil);
//     //requestedOil= Object.values(Oil);
//     //requestedOil = Oil.map(date => dayNetInterest[date]);
//     requestedOil = site_date.map(date => dayNetInterest[date]);
//     console.log("requestedOil", requestedOil);
//     console.log("site_date", site_date)
//     console.log("Oil", Oil)
   

// };
///////////////////////OPTION 1 END////////////////////////////


//interestOwned = array of interests owned w/o reference to well name

//dayNetInterest = Array containing net owned production
// requestedOil = all well's daily oil summed 
// Oil = daily prudction * interest owned // FOR EACH WELL PARTNER HAS INTEREST IN 
// site_date = x, date for production

function netInterestPerWell(wellProduction, interest) {
   
   // requestedOil = Object.values(site_date); //I want the values of the site_date to be the keys of requestedOil
    dayNetInterest = new Array;
    netOwned = 0; //PRODUCTION OWNED BY PARTNER 
    wellProduction.forEach((day) => {
        netOwned = day * parseFloat(interest);
        dayNetInterest.push(netOwned);
        //requestedOil=parseFloat(dayNetInterest);
        });
        console.log("site", site_date);
       
            
        
        //THIS IS WHERE THE SUMMATION HAS TO HAPPEN
        //console.log("Oil", Oil) 
        console.log("dayNetInterest", dayNetInterest); //ADD THIS TO requestedOil
        //console.log("wellProduction", wellProduction)

        // = site_date.map(function(e, i) {
        //return {[e]:dayNetInterest[i]}
        //}) //RETURNS REQUESTED OIL FOR EACH DAY, NOW I CAN DO HAS PROPERTY?? 

        

////////////// ADD SOMETHING ABOUT IF KEYS ARE THE SAME THEN SUM THE VALUES ////////////////
        
        

    };

// production = new Array;
; //, "WOMBAT 2H"
// site_date = []
// requestedOil = {};

// console.log(requestedOil)

// interestList = [1]; //, 

// interestList.forEach((interest) => //LOOPING THROUGH EACH INTEREST IN LIST TO PLUG IN PRODUCTION AND INTEREST FOR THAT WELL
// {d3.json("./static/all_production.json").then((data) =>{
//     data.forEach((site) => {
//         if(wellsIn.includes(site[0]))
//         {production.push(site[0], site[2]);
//         site_date.push(site[8]);
//         };
//     });
//     console.log("PRODUCTION", production);
//     netInterestPerWell(production, interest); //THIS NEEDS TO TAKE ONLY AN INTEREST, NOT AN INTEREST LIST.
//     console.log("requestedOil outside function", requestedOil) 
// });
// }
// );


wellsIn = ["RIDGEBACK 1H", "STINGRAY 2H", "WOMBAT 2H"] //DYNAMIC WAY OF CREATING THIS, net_partners.js
newData = []
partnersInterest = {"RIDGEBACK 1H":0.02284001, "WOMBAT 2H":0.02116946, "STINGRAY 2H": 0.00623584}; // DYNAMIC WAY OF CREATING THIS, net_partners.js
netOwnedForWell = 0 // well production * partner's interest 
netProductionForWell = []; //CONTAINS NET PRODUCTION OWNED FOR EACH WELL
allNetsAdded = [];
all_dates = []
x = wellsIn.length


{d3.json("./static/all_production.json").then((data) =>{
    //console.log(typeof data);
    data.forEach((site) =>  {if(wellsIn.includes(site[0])){
        newData.push(site);
        all_dates.push(site[8])
    }}
    );
    //FOR EACH POINT IN new_data, IF IT HAS THE WELL NAME FROM THE WELL LIST PARTNER IS IN THEN netProductionForWell EQUALS THE production * partnersInterest property name [WELL NAME][0], WHICH IS THE INTEREST FOR THAT WELL 
    newData.forEach((x) => {if(partnersInterest.hasOwnProperty(x[0])){netProductionForWell = newData.map(x => x[2] * partnersInterest[x[0]])} //SITE[2]*DESIGNATED INTEREST
   
});
    console.log("netProductionForWell", netProductionForWell);
    //console.log(newData);
    console.log(Object.entries(partnersInterest))
    console.log(x)

    //SPLIT net_production INTO ARRAYS OF THE LENGTH OF wellsPartnerIn
    var size = wellsIn.length; var arrayOfArrays = [];
    for (var i=0; i<netProductionForWell.length; i+=size) {
         arrayOfArrays.push(netProductionForWell.slice(i,i+size));
    }
    console.log(arrayOfArrays);
    //REDUCE EACH ARRAY (REDUCE SUMS ALL VALUES IN AN ARRAY)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    allNetsAdded = arrayOfArrays.map(x => x.reduce(reducer))
    console.log(allNetsAdded);
    var site_date = [...new Set(all_dates)];
    console.log(site_date);
    
    })};



 
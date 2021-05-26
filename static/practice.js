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

        requestedOil = site_date.map(function(e, i) {
        return {[e]:dayNetInterest[i]}
        }) //RETURNS REQUESTED OIL FOR EACH DAY, NOW I CAN DO HAS PROPERTY?? 

////////////// ADD SOMETHING ABOUT IF KEYS ARE THE SAME THEN SUM THE VALUES ////////////////
        
        



        
        //console.log("BEFORE", requestedOil)
       //requestedOil = dayNetInterest.map(netProductionOwned => netProductionOwned * 2) //need to ficure out how to add to requestedOil which is empty

  //console.log("dayNetInterest", dayNetInterest)
 // console.log("requestedOil", requestedOil) 
    };

production = new Array;
wellsIn = ["WOMBAT 2H", ]; //, 
site_date = []
requestedOil = {};

console.log(requestedOil)

interestList = [0.02116946]; //, 

interestList.forEach((interest) => //LOOPING THROUGH EACH INTEREST IN LIST TO PLUG IN PRODUCTION AND INTEREST FOR THAT WELL
{d3.json("./static/all_production.json").then((data) =>{
    data.forEach((site) => {
        if(wellsIn.includes(site[0]))
        {production.push(site[2]);
        site_date.push(site[8]);
        };
    });
    netInterestPerWell(production, interest); //THIS NEEDS TO TAKE ONLY AN INTEREST, NOT AN INTEREST LIST.
    console.log("requestedOil outside function", requestedOil) 
});
}
);



function netInterestPerWell(wellProduction, interestList) {
    requestedOil = {}
    Oil = Object.values(site_date)

    console.log("BEFORE site_date", site_date)
    console.log("BEFORE Oil", Oil)

    interestList.forEach((interest) =>{
        dayNetInterest = new Array;
        netOwned = 0;
        wellProduction.forEach((day) => {
            netOwned = day * parseFloat(interest);
            dayNetInterest.push(netOwned);
        });
    });
    console.log("multiplied", dayNetInterest)
    console.log("original", wellProduction)

    site_date = Object.keys(Oil);
    //requestedOil= Object.values(Oil);
    //requestedOil = Oil.map(date => dayNetInterest[date]);
    requestedOil = site_date.map(date => dayNetInterest[date]);
    console.log("requestedOil", requestedOil);
    console.log("site_date", site_date)
    console.log("Oil", Oil)
   

};


production = new Array;
wellsIn = ["GREAT WHITE 2H"];
site_date = []


d3.json("./static/all_production.json").then((data) =>{
    data.forEach((site) => {
        if(wellsIn.includes(site[0])) {
            production.push(site[2]);
            site_date.push(site[8]);
        };
});

interestList = [1,2];

netInterestPerWell(production, interestList); //THIS NEEDS TO TAKE ONLY AN INTEREST, NOT AN INTEREST LIST.

});



//netInterestPerWell([1,2,3,4,5], [2,4])
//netInterestPerWell([[1,2,3,4,5],[10,20,30,40,50]], 5)


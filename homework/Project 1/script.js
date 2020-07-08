var states = ["AK","AL","AR","AS","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MP","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"]
i = states.indexOf("AR")
console.log(i)


$(document).on("click", ".searches", function(event){
    event.preventDefault();   
    var states = ["AK","AL","AR","AS","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MP","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"]
    if ($(this).attr("id") === "searchBtn") {
        selection = $("#citySearch").val();
    }
    console.log(selection)
    i = states.indexOf(selection)
    console.log(i)
    var queryURL = "https://covidtracking.com/api/states";
     $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var state = selection;
        var stateScore = "(" + response[i].dataQualityGrade + ")"
        var cases = response[i].positive
        var recovered = response[i].recovered
        var casesPer = "("+ (Math.trunc(((response[i].positive/population[i])*1000000)))+" per million)"
        var deaths = response[i].death
        var deathsPer = "("+ (Math.trunc(((response[i].death/population[i])*1000000)))+" per million)"
        var newCases = response[i].positiveIncrease

        
        if(response[i].positiveIncrease === null){
            newCasesPer = ""
        } else {newCasesPer = "("+ (Math.trunc(((response[i].positiveIncrease/population[i])*1000000)))+" per million)"
        }   


        if(response[i].recovered === null){
            recoveredPer = ""
        } else {recoveredPer = "("+ (Math.trunc(((response[i].recovered/population[i])*1000000)))+" per million)"
        }   

        if(response[i].recovered === null){
            activePer = ""
        } else {activePer = "("+ (Math.trunc((((cases - recovered - deaths)/population[i])*1000000)))+" per million)"
        }    

        if(response[i].recovered === null){
            activeIndicator = "Data Not Available"
        } else {activeIndicator = (Math.trunc((((cases - recovered - deaths)/population[i])*1000000)))
        }    

        if(response[i].inIcuCurrently === null){
            inIcu = "Data Not Available"
        } else {inIcu = response[i].inIcuCurrently
        }
        
        if(response[i].onVentilatorCurrently === null){
            ventilator = "Data Not Available"
        } else {ventilator = response[i].onVentilatorCurrently
        }

        if(response[i].hospitalized === null){
            hospitalized = "Not Reported"
        } else { hospitalized = response[i].hospitalized
        }

        if(response[i].hospitalizedCurrently === null){
            currentHosp = "Data Not Available"
        } else { currentHosp = response[i].hospitalizedCurrently
        }

        if(response[i].recovered === null){
            active = "Data Not Available"
        } else {active = (cases - recovered - deaths)
        }        

        if(response[i].hospitalized === null){
            hospIncrease = "Data Not Available"
        } else {hospIncrease = response[i].hospitalizedIncrease
        }

        if(response[i].recovered === null){
            recovered = "Data Not Available"
        } else {recovered = response[i].recovered
        }

        var positive = response[i].positive
        var pop = population[i]
        var displayState = stateTrans[i]
        var newUrl =  `<a class="current ml-2 mt-2" href="https://www.google.com/search?rlz=1C1CHBF_enUS832US832&ei=rE7_XsXaCKGm_Qa__JKoAQ&q=${displayState}+active+covid+19+cases" target="_blank">Click Here for Latest State Trend</a>`
        $(this).attr("href", newUrl);
        
        console.log(cases)
        console.log(deaths)
        console.log(hospitalized)
        console.log(hospIncrease)
        console.log(positive)
        console.log(pop)
        console.log(casesPer)
        console.log(deathsPer)
        console.log(active)
        console.log(displayState)
        console.log(activePer)

        $("#state").empty().append(displayState);
        $("#stateScore").empty().append(stateScore);
        $("#population").empty().append(pop);
        $("#cases").empty().append(cases);
        $("#recovered").empty().append(recovered);
        $("#recoveredPerc").empty().append(recoveredPer);
        $("#deaths").empty().append(deaths);
        $("#active").empty().append(active);
        $("#casesPerc").empty().append(casesPer);
        $("#hospitalizations").empty().append(currentHosp);
        $("#deaths").empty().append(deaths);
        $("#deathsPerc").empty().append(deathsPer);
        $("#icu").empty().append(inIcu);
        $("#ventilator").empty().append(ventilator);
        $("#activePerc").empty().append(activePer);
        $("#link").empty().append(newUrl);
        $("#newCases").empty().append(newCases);
        $("#newCasesPerc").empty().append(newCasesPer);
   

        if(activeIndicator === "Data Not Available") {
            $('#indicator').attr('src','NoInfo.jpg');
        } else if(activeIndicator <= 1000) {
            $('#indicator').attr('src','Good.jpg');
        } else if (activeIndicator >= 1000 && activeIndicator <= 3000) { 
            $('#indicator').attr('src','Caution.jpg');
        } else $('#indicator').attr('src','Warning.jpg');


        var analysis = {
            green: "Green status indicates that " + displayState + " is reporting all critical data as it relates to COVID-19 tacking.  Two critical components determining the Destination Indicator are new reported cases and active cases per million. Both of these data points for " + displayState + " are favorable.  While the destination has received approval for travel, please conitue exercising safe practices as recommended by the CDC.",
            yellow: "Yellow status indicates that " + displayState + " is reporting all critical data as it relates to COVID-19 tacking.  Two critical components determining the Destination Indicator are new reported cases and active cases per million. These data points for " + displayState + " show travelers should exercise caution.",
            red: "Red status indicates that " + displayState + " is reporting all critical data as it relates to COVID-19 tacking.  Two critical components determining the Destination Indicator are new reported cases and active cases per million. These data points for " + displayState + " show this destination should be avoided if possible.",
            orange: "Orange status indicates that " + displayState + " is NOT reporting all critical data as it relates to COVID-19 tacking.  Two critical components determining the Destination Indicator are new reported cases and active cases per million. Without these data points the current status is undeterminable and as such travel to " + displayState + " should be avoided if possible.",
        }

        if(activeIndicator === "Data Not Available") {
            $('#analyis').empty().append(analysis.orange);
        } else if(activeIndicator <= 1000) {
            $('#analyis').empty().append(analysis.green);
        } else if (activeIndicator >= 1000 && activeIndicator <= 3000) { 
            $('#analyis').empty().append(analysis.yellow);
        } else $('#analyis').empty().append(analysis.red);

      

        var queryURL = "https://gnews.io/api/v3/search?q=" + displayState +"-19&token=b99b9a647a217388e8e3d23e85e198ff";
        $.ajax({
           url: queryURL,
           method: "GET"
       }).then(function(response) {
           console.log(response)
           console.log(response.articles[0].description);
           console.log(response.articles[0].source.name);
           console.log(response.articles[0].url);
           console.log(response.articles[0].image);

           var headline = response.articles[0].title
           var link = response.articles[0].url
           var source = response.articles[0].source.name
           var image = response.articles[0].image
           var newsArray = response.articles

           console.log(headline)
           console.log(link)
           console.log(image)
           console.log(newsArray)


           
        $(".hide").attr("class", "row");   
        
        for (let i = 0; i < newsArray.length; i++) {
           var headline = response.articles[i].title
           var link = response.articles[i].url
           var source = response.articles[i].source.name
           var image = response.articles[i].image

           var appHeadline = `<a class="headline white-text" href="${link}" target="_blank">${headline}</a>`
           var appSource =`<div class="source white-text"> Source: ${source} </div>`
           var spacer = `<hr>`

           $(`#headline${i}`).empty();
           $(`#headline${i}`).append(appHeadline);
           $(`#headline${i}`).append(appSource);
           $(`#image${i}`).attr("src", image);
           $(`#headline${i}`).append(spacer);
            
        }

        });      
});
});

var population = {
0: 731545,
1: 4903185,
2: 3017825,
3: "Not Available",
4: 7278717,
5: 39512223,
6: 5758736,
7: 3565287,
6: "Not Available",
9: 973764,
10: 21477737,
11: 10617423,
12: "Not Available",
13: 1415872,
14: 3155070,
15: 1787065,
16: 12671821,
17: 6732219,
18: 2913314,
19: 4467673,
20: 4648794,
21: 6949503,
22: 6045680,
23: 1344212,
24: 9986857,
25: 5639632,
26: 6137428,
27: "Not Available",
28: 2976149,
29: 1068778,
30: 10488084,
31: 762062,
32: 1934408,
33: 1359711,
34: 8882190,
35: 2096829,
36: 3080156,
37: 19453561,
38: 11689100,
39: 3956971,
40: 4217737,
41: 12801989,
42: "Not Available",
43: 1059361,
44: 5148714,
45: 884659,
46: 6833174,
47: 28995881,
48: 3205958,
49: 8535519,
50: "Not Available",
51: 623989,
52: 7614893,
53: 5822434,
54: 1792147,
55: 578759,
}

var stateTrans = {
0: "Alaska",
1: "Alabama",
2: "Arkansas",
3: "Not Available",
4: "Arizona",
5: "California",
6: "Colorado",
7: "Connecticut",
8: "District of Columbia",
9: "Delaware",
10: "Florida",
11: "Georgia",
12: "Not Available",
13: "Hawaii",
14: "Iowa",
15: "Idaho",
16: "Illinois",
17: "Indiana",
18: "Kansas",
19: "Kentucky",
20: "Louisiana",
21: "Massachusetts",
22: "Maryland",
23: "Maine",
24: "Michigan",
25: "Minnesota",
26: "Missouri",
27: "Not Available",
28: "Mississippi",
29: "Montana",
30: "North Carolina",
31: "North Dakota",
32: "Nebraska",
33: "New Hampshire",
34: "New Jersey",
35: "New Mexico",
36: "Nevada",
37: "New York",
38: "Ohio",
39: "Oklahoma",
40: "Oregon",
41: "Pennsylvania",
42: "Not Available",
43: "Rhode Island",
44: "South Carolina",
45: "South Dakota",
46: "Tennessee",
47: "Texas",
48: "Utah",
49: "Virginia",
50: "Not Available",
51: "Vermont",
52: "Washington",
53: "Wisconsin",
54: "West Virginia",
55: "Wyoming",
}
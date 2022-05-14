// java script for lab2b

/**
 * Some code below are inspired by 
 * https://www.tutorialsteacher.com/d3js/axes-in-d3
 * https://www.tutorialspoint.com/d3js/d3js_introduction_to_svg.htm
 * https://github.com/ayushGHub/CSE332_SampleCode
 * https://getbootstrap.com/
 * https://devdocs.io/d3~4/
 * https://bl.ocks.org/hrecht/f84012ee860cb4da66331f18d588eee3
 */


// initializing constants
const LINK = "http://127.0.0.1:8080";
const PROJECT = "/project";
const MIDDLE = "middle";
const SB_RED = "#990000";
const TRANSFORM = "transform";
const _D = "d";
const PATH = "path";
const CLASS = "class";
const TEXT = "text";
const ID = "id";
const TRANSLATE_LEFT = -80;
const cluster_IDs = [3,  6,  8,  9, 10];
// const cluster_dict = [
//     {"3": 3},
//     {"6": 6},
//     {"8": 8},
//     {"9": 9},
//     {"10":10}
// ];
const airlines = ["", "G4", "F9", "NK", "HA", "B6", "AA", "AS", "UA", "WN", "DL"]
const airlines_fullname = ["", "Allegiant Air", "Frontier Airlines", "Spirit Airlines"
                           , "Hawaiian Airlines", "Jetblue Airways Corporation", 
                           "American Airlines", "Alaska Airlines", "United Airlines",
                            "Southwest Airlines ", "Delta Air Lines"]
//const CARRIER_CODE = "Carrier_Code";
const all_cols = [
    'Carrier_Code', 'Origin_Airport', 'Flight_Season', 'Flight_Month',
   'Flight_Week', 'Flight_Day', 'Scheduled_Departure_Time',
   'Actual_Departure_Time', 'Departure_Delay', 'Dep_Temp_3',
   'Dep_Pressure_3', 'Dep_Humidity_3', 'Dep_Wind_Speed_3',
   'Dep_Wind_Deg_3', 'Dep_Clouds_3', 'Dep_Rain_3', 'Lat_N',
   'Lng_W', 'GMT'
];

var selected_carrier = null;


// 'Carrier_Code', 'Origin_Airport', 'Flight_Season', 'Flight_Month',
// 'Flight_Week', 'Flight_Day', 'Scheduled_Departure_Time',
// 'Actual_Departure_Time', 'Departure_Delay', 'Dep_Temp_3',
// 'Dep_Pressure_3', 'Dep_Humidity_3', 'Dep_Wind_Speed_3',
// 'Dep_Wind_Deg_3', 'Dep_Clouds_3', 'Dep_Rain_3', 'Lat_N',
// 'Lng_W', 'GMT'
// var barCharts = barChart()
//                         .x(function(d) {return d.key})
//                         .y(function(d) {return d.value})
//                         .height(100)
//                         .width(400);
var Carrier_CodebarCharts = barChart("Carrier_CodebarCharts")
                        .x(function(d) {return d.key})
                        .y(function(d) {return d.value})
                        .height(300)
                        .width(400)
                        .isColored(true)
                        //.ID("Carrier_CodebarCharts");
                        //.add_brush(Carrier_CodeBrush, "Carrier_CodeBrush");

var Flight_MonthbarCharts = barChart("Flight_MonthbarCharts")
                        .x(function(d) {return d.key})
                        .y(function(d) {return d.value})
                        .height(100)
                        .width(400)
                        //.ID("Flight_MonthbarCharts");
                        //.add_brush(Flight_MonthBrush, "Flight_MonthBrush");
var Flight_DaybarCharts = barChart()
                        .x(function(d) {return d.key})
                        .y(function(d) {return d.value})
                        .height(100)
                        .width(400);
var Scheduled_Departure_TimebarCharts = barChart()
                        .x(function(d) {return d.key})
                        .y(function(d) {return d.value})
                        .height(100)
                        .width(400);
var Dep_Temp_3barCharts = barChart()
                        .x(function(d) {return d.key})
                        .y(function(d) {return d.value})
                        .height(100)
                        .width(400)
                        .isTemp(true);
var Dep_Wind_Speed_3barCharts = barChart()
                        .x(function(d) {return d.key})
                        .y(function(d) {return d.value})
                        .height(100)
                        .width(400);
var Dep_Clouds_3barCharts = barChart()
                        .x(function(d) {return d.key})
                        .y(function(d) {return d.value})
                        .height(100)
                        .width(400);


var Departure_DelaybarCharts = barChart()
                        .x(function(d) {return d.key})
                        .y(function(d) {return d.value})
                        .height(100)
                        .width(400);
                        //'Lat_N',
                        // 'Lng_W', 'GMT'
                        var Lat_NbarCharts = barChart()
                        .x(function(d) {return d.key})
                        .y(function(d) {return d.value})
                        .height(100)
                        .width(400);

                        var Lng_WbarCharts = barChart()
                        .x(function(d) {return d.key})
                        .y(function(d) {return d.value})
                        .height(100)
                        .width(400);


let data = null;
// https://www.w3.org/wiki/CSS/Properties/color/keywords
// 3 6 8 9 10
// let clusterColor = ['lime','green','olive','purple','navy','fuchsia',
//                     'red', 'yellowgreen','teal', 'maroon', 'blue', 'aqua'];
let clusterColor = ['lime','green','olive','#1b9e77','navy','fuchsia',
                    '#d95f02', 'yellowgreen','#7570b3', '#e7298a', '#e6ab02', 'aqua'];

var csFilterData = [];
function send_request(){
    // Use axios to parse
    axios.post(LINK + PROJECT, {

    }).then(function (reponse){
        data = reponse.data;
        csFilterData = crossfilter(data["pcp_dataset"]);
        document.getElementById("loading-page").hidden = true;
        document.getElementById("main-container").hidden = false;
        document.getElementById("lines-container").hidden = false;
        console.log(data);
        setup();
    });
}




// Setup
function setup(){
    for (let i = 0; i < cluster_IDs.length; i ++)
    {
        let temp_c = cluster_IDs[i]
        d3.select("#carriers")
        .append("text")
        .text(airlines_fullname[temp_c] +"("+ airlines[temp_c] +")"+ ": "+clusterColor[temp_c]+";     ")
        .style("color", clusterColor[temp_c])
        ;
    }

    

    // https://www.youtube.com/watch?v=Oz3U38oOcNg
    // https://square.github.io/crossfilter/

    //var csFilterData = crossfilter(data["pcp_dataset"]);

    
    // 'Carrier_Code', 'Origin_Airport', 'Flight_Season', 'Flight_Month',
    // 'Flight_Week', 'Flight_Day', 'Scheduled_Departure_Time',
    // 'Actual_Departure_Time', 'Departure_Delay', 'Dep_Temp_3',
    // 'Dep_Pressure_3', 'Dep_Humidity_3', 'Dep_Wind_Speed_3',
    // 'Dep_Wind_Deg_3', 'Dep_Clouds_3', 'Dep_Rain_3', 'Lat_N',
    // 'Lng_W', 'GMT'
    csFilterData.dimCarrier_Code = csFilterData.dimension(function(d) {
        return d['Carrier_Code'];
    });
    // csFilterData.dimOrigin_Airport = csFilterData.dimension(function(d){
    //     return d['Origin_Airport'];
    // });
    // csFilterData.dimFlight_Season = csFilterData.dimension(function(d){
    //     return d['Flight_Season'];
    // });
    csFilterData.dimFlight_Month= csFilterData.dimension(function(d){
        return d['Flight_Month'];
    });
    // csFilterData.dimFlight_Week = csFilterData.dimension(function(d){
    //     return d['Flight_Week'];
    // });
    csFilterData.dimFlight_Day = csFilterData.dimension(function(d){
        return d['Flight_Day'];
    });
    csFilterData.dimScheduled_Departure_Time = csFilterData.dimension(function(d){
        return d['Scheduled_Departure_Time'];
    });
    // csFilterData.dimActual_Departure_Time= csFilterData.dimension(function(d){
    //     return d['Actual_Departure_Time'];
    // });
    csFilterData.dimDeparture_Delay = csFilterData.dimension(function(d){
        return d['Departure_Delay'];
    });
    csFilterData.dimDep_Temp_3 = csFilterData.dimension(function(d){
        return d['Dep_Temp_3'];
    });
    // csFilterData.dimDep_Pressure_3= csFilterData.dimension(function(d){
    //     return d['Dep_Pressure_3'];
    // });
    // csFilterData.dimDep_Humidity_3 = csFilterData.dimension(function(d){
    //     return d['Dep_Humidity_3'];
    // });
    csFilterData.dimDep_Wind_Speed_3 = csFilterData.dimension(function(d){
        return d['Dep_Wind_Speed_3'];
    });
    // csFilterData.dimDep_Wind_Deg_3 = csFilterData.dimension(function(d){
    //     return d['Dep_Wind_Deg_3'];
    // });
    csFilterData.dimDep_Clouds_3 = csFilterData.dimension(function(d){
        return d['Dep_Clouds_3'];
    });
    // csFilterData.dimDep_Rain_3 = csFilterData.dimension(function(d){
    //     return d['Dep_Rain_3'];
    // });
    csFilterData.dimLocation = csFilterData.dimension(function(d){
        return [d['Lat_N'], d['Lng_W'], d['Carrier_Code']];
    })
    csFilterData.dimLat_N = csFilterData.dimension(function(d){
        return d['Lat_N'];
    });
    csFilterData.dimLng_W = csFilterData.dimension(function(d){
        return d['Lng_W'];
    });
    // csFilterData.dimGMT = csFilterData.dimension(function(d){
    //     return d['GMT'];
    // });


    // 'Carrier_Code', 'Origin_Airport', 'Flight_Season', 'Flight_Month',
    // 'Flight_Week', 'Flight_Day', 'Scheduled_Departure_Time',
    // 'Actual_Departure_Time', 'Departure_Delay', 'Dep_Temp_3',
    // 'Dep_Pressure_3', 'Dep_Humidity_3', 'Dep_Wind_Speed_3',
    // 'Dep_Wind_Deg_3', 'Dep_Clouds_3', 'Dep_Rain_3', 'Lat_N',
    // 'Lng_W', 'GMT'
    csFilterData.Carrier_Code = csFilterData.dimCarrier_Code.group();
    //csFilterData.Origin_Airport = csFilterData.dimOrigin_Airport.group();
   // csFilterData.Flight_Season = csFilterData.dimFlight_Season.group();
    csFilterData.Flight_Month = csFilterData.dimFlight_Month.group();
    //csFilterData.Flight_Week = csFilterData.dimFlight_Week.group();
    csFilterData.Flight_Day = csFilterData.dimFlight_Day.group();
    csFilterData.Scheduled_Departure_Time = csFilterData.dimScheduled_Departure_Time.group();
    //csFilterData.Actual_Departure_Time = csFilterData.dimActual_Departure_Time.group();
    csFilterData.Departure_Delay = csFilterData.dimDeparture_Delay.group(function(d) {
        return Math.floor(d / 10) * 10;
    });
    csFilterData.Dep_Temp_3 = csFilterData.dimDep_Temp_3.group();
    //csFilterData.Dep_Pressure_3 = csFilterData.dimDep_Pressure_3.group();
    //csFilterData.Dep_Humidity_3 = csFilterData.dimDep_Humidity_3.group();
    csFilterData.Dep_Wind_Speed_3 = csFilterData.dimDep_Wind_Speed_3.group();
    //csFilterData.Dep_Wind_Deg_3 = csFilterData.dimDep_Wind_Deg_3.group();
    csFilterData.Dep_Clouds_3 = csFilterData.dimDep_Clouds_3.group();
    //csFilterData.Dep_Rain_3 = csFilterData.dimDep_Rain_3.group();
    csFilterData.Lat_N = csFilterData.dimLat_N.group(
        function(d) {
            return Math.floor(d / 2) * 2;
        }
    );
    csFilterData.Lng_W = csFilterData.dimLng_W.group(
        function(d) {
            return Math.floor(d / 2) * 2;
        }
    );
    csFilterData.Location = csFilterData.dimLocation.group();


    //console.log(csFilterData.dimAll)
    Carrier_CodebarCharts.onMouseOver(function(d) {
        //console.log(d.key);
        csFilterData.dimCarrier_Code.filter(d.key);
        update();
    }).onMouseOut(function(){
        csFilterData.dimCarrier_Code.filterAll();
        update();
    }).onBrushed(function(thisdata, s){
        // if (thisdata.length == 5){
        //     let this___data = csFilterData.Carrier_Code.all();
        //     let nbFt = this___data.length;
        //     let innerWidth = 380;
        //     let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
        //     let keys = [];
        //     thisdata.forEach(element => {
        //         keys.push(element.key);
        //     });
        //     let true_range = [Number(keys[current_range[0]])]
        //     if (current_range[1] < keys.length){
        //         true_range.push(Number(keys[current_range[1]]));
        //     }else {
        //         true_range.push(Number(keys[keys.length-1]+1));
        //     }
        //     console.log(true_range);
        //     csFilterData.dimCarrier_Code.filterRange(true_range);
        //     update();
        // }
    });

    Flight_MonthbarCharts.onBrushed(function(thisdata, s){
        // if (thisdata.length == 8){
        //     let this___data = csFilterData.Flight_Month.all();
        //     let nbFt = this___data.length;
        //     let innerWidth = 380;
        //     let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
        //     let keys = [];
        //     thisdata.forEach(element => {
        //         keys.push(element.key);
        //     });
        //     let true_range = [Number(keys[current_range[0]])]
        //     if (current_range[1] < keys.length){
        //         true_range.push(Number(keys[current_range[1]]));
        //     }else {
        //         true_range.push(Number(keys[keys.length-1]+1));
        //     }
        //     console.log(true_range);
        //     csFilterData.dimFlight_Month.filterRange(true_range);
        //     update();
        // }
    });
    Flight_DaybarCharts.onBrushed(function(thisdata, s){
        // if (thisdata.length == 31){
        //     let this___data = csFilterData.Flight_Day.all();
        //     let nbFt = this___data.length;
        //     let innerWidth = 380;
        //     let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
        //     let keys = [];
        //     thisdata.forEach(element => {
        //         keys.push(element.key);
        //     });
        //     let true_range = [Number(keys[current_range[0]])]
        //     if (current_range[1] < keys.length){
        //         true_range.push(Number(keys[current_range[1]]));
        //     }else {
        //         true_range.push(Number(keys[keys.length-1]+1));
        //     }
        //     console.log(true_range);
        //     csFilterData.dimFlight_Day.filterRange(true_range);
        //     update();
        // }
    });
    Scheduled_Departure_TimebarCharts.onBrushed(function(thisdata, s){
        // if (thisdata.length == 20){
        //     let this___data = csFilterData.Scheduled_Departure_Time.all();
        //     let nbFt = this___data.length;
        //     let innerWidth = 380;
        //     let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
        //     let keys = [];
        //     thisdata.forEach(element => {
        //         keys.push(element.key);
        //     });
        //     let true_range = [Number(keys[current_range[0]])]
        //     if (current_range[1] < keys.length){
        //         true_range.push(Number(keys[current_range[1]]));
        //     }else {
        //         true_range.push(Number(keys[keys.length-1]+1));
        //     }
        //     console.log(true_range);
        //     csFilterData.dimScheduled_Departure_Time.filterRange(true_range);
        //     update();
        // }
    });
    Dep_Temp_3barCharts.onBrushed(function(thisdata, s){
        // if (thisdata.length == 14){
        //     console.log("here")
        //     let this___data = csFilterData.Dep_Temp_3.all();
        //     let nbFt = this___data.length;
        //     let innerWidth = 380;
        //     let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
        //     let keys = [];
        //     thisdata.forEach(element => {
        //         keys.push(element.key);
        //     });
        //     let true_range = [Number(keys[current_range[0]])]
        //     if (current_range[1] < keys.length){
        //         true_range.push(Number(keys[current_range[1]]));
        //     }else {
        //         true_range.push(Number(keys[keys.length-1]+1));
        //     }
        //     console.log(true_range);
        //     csFilterData.dimDep_Temp_3.filterRange(true_range);
        //     update();
        // }
    });
    Dep_Wind_Speed_3barCharts.onBrushed(function(thisdata, s){
        // if (thisdata.length == 13){
        //     let this___data = csFilterData.Dep_Wind_Speed_3.all();
        //     let nbFt = this___data.length;
        //     let innerWidth = 380;
        //     let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
        //     let keys = [];
        //     thisdata.forEach(element => {
        //         keys.push(element.key);
        //     });
        //     let true_range = [Number(keys[current_range[0]])]
        //     if (current_range[1] < keys.length){
        //         true_range.push(Number(keys[current_range[1]]));
        //     }else {
        //         true_range.push(Number(keys[keys.length-1]+1));
        //     }
        //     console.log(true_range);
        //     csFilterData.dimDep_Wind_Speed_3.filterRange(true_range);
        //     update();
        // }
    });
    Dep_Clouds_3barCharts.onBrushed(function(thisdata, s){
        //console.log(thisdata.length);
        // if (thisdata.length ==11){
        //     let this___data = csFilterData.Dep_Clouds_3.all();
        //     let nbFt = this___data.length;
        //     let innerWidth = 380;
        //     let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
        //     let keys = [];
        //     thisdata.forEach(element => {
        //         keys.push(element.key);
        //     });
        //     let true_range = [Number(keys[current_range[0]])]
        //     if (current_range[1] < keys.length){
        //         true_range.push(Number(keys[current_range[1]]));
        //     }else {
        //         true_range.push(Number(keys[keys.length-1]+1));
        //     }
        //     console.log(true_range);
        //     csFilterData.dimDep_Clouds_3.filterRange(true_range);
        //     update();
        // }
    });

    Lat_NbarCharts.onBrushed(function(thisdata, s){

    });

    Departure_DelaybarCharts.onBrushed(function(thisdata, s){
        // console.log(thisdata.length);
        // // https://bl.ocks.org/mthh/0f8c11f4b017f7a640ad35315fbea278
        // if (thisdata.length == 5){
        //     let this___data = csFilterData.Carrier_Code.all();
        //     let nbFt = this___data.length;
        //     let innerWidth = 380;
        //     let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
        //     let keys = [];
        //     thisdata.forEach(element => {
        //         keys.push(element.key);
        //     });
        //     let true_range = [Number(keys[current_range[0]])]
        //     if (current_range[1] < keys.length){
        //         true_range.push(Number(keys[current_range[1]]));
        //     }else {
        //         true_range.push(Number(keys[keys.length-1]+1));
        //     }
        //     console.log(true_range);
        //     csFilterData.dimCarrier_Code.filterRange(true_range);
        //     update();
        // }
        // if (thisdata.length == 8){
        //     let this___data = csFilterData.Flight_Month.all();
        //     let nbFt = this___data.length;
        //     let innerWidth = 380;
        //     let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
        //     let keys = [];
        //     thisdata.forEach(element => {
        //         keys.push(element.key);
        //     });
        //     let true_range = [Number(keys[current_range[0]])]
        //     if (current_range[1] < keys.length){
        //         true_range.push(Number(keys[current_range[1]]));
        //     }else {
        //         true_range.push(Number(keys[keys.length-1]+1));
        //     }
        //     console.log(true_range);
        //     csFilterData.dimFlight_Month.filterRange(true_range);
        //     update();
        // }
        // if (thisdata.length == 31){
        //     let this___data = csFilterData.Flight_Day.all();
        //     let nbFt = this___data.length;
        //     let innerWidth = 380;
        //     let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
        //     let keys = [];
        //     thisdata.forEach(element => {
        //         keys.push(element.key);
        //     });
        //     let true_range = [Number(keys[current_range[0]])]
        //     if (current_range[1] < keys.length){
        //         true_range.push(Number(keys[current_range[1]]));
        //     }else {
        //         true_range.push(Number(keys[keys.length-1]+1));
        //     }
        //     console.log(true_range);
        //     csFilterData.dimFlight_Day.filterRange(true_range);
        //     update();
        // }
        // if (thisdata.length == 20){
        //     let this___data = csFilterData.Scheduled_Departure_Time.all();
        //     let nbFt = this___data.length;
        //     let innerWidth = 380;
        //     let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
        //     let keys = [];
        //     thisdata.forEach(element => {
        //         keys.push(element.key);
        //     });
        //     let true_range = [Number(keys[current_range[0]])]
        //     if (current_range[1] < keys.length){
        //         true_range.push(Number(keys[current_range[1]]));
        //     }else {
        //         true_range.push(Number(keys[keys.length-1]+1));
        //     }
        //     console.log(true_range);
        //     csFilterData.dimScheduled_Departure_Time.filterRange(true_range);
        //     update();
        // }

        // if (thisdata.length == 14){
        //     console.log("here")
        //     let this___data = csFilterData.Dep_Temp_3.all();
        //     let nbFt = this___data.length;
        //     let innerWidth = 380;
        //     let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
        //     let keys = [];
        //     thisdata.forEach(element => {
        //         keys.push(element.key);
        //     });
        //     let true_range = [Number(keys[current_range[0]])]
        //     if (current_range[1] < keys.length){
        //         true_range.push(Number(keys[current_range[1]]));
        //     }else {
        //         true_range.push(Number(keys[keys.length-1]+1));
        //     }
        //     console.log(true_range);
        //     csFilterData.dimDep_Temp_3.filterRange(true_range);
        //     update();
        // }
        // if (thisdata.length == 13){
        //     let this___data = csFilterData.Dep_Wind_Speed_3.all();
        //     let nbFt = this___data.length;
        //     let innerWidth = 380;
        //     let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
        //     let keys = [];
        //     thisdata.forEach(element => {
        //         keys.push(element.key);
        //     });
        //     let true_range = [Number(keys[current_range[0]])]
        //     if (current_range[1] < keys.length){
        //         true_range.push(Number(keys[current_range[1]]));
        //     }else {
        //         true_range.push(Number(keys[keys.length-1]+1));
        //     }
        //     console.log(true_range);
        //     csFilterData.dimDep_Wind_Speed_3.filterRange(true_range);
        //     update();
        // }
        // if (thisdata.length ==11){
        //     let this___data = csFilterData.Dep_Clouds_3.all();
        //     let nbFt = this___data.length;
        //     let innerWidth = 380;
        //     let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
        //     let keys = [];
        //     thisdata.forEach(element => {
        //         keys.push(element.key);
        //     });
        //     let true_range = [Number(keys[current_range[0]])]
        //     if (current_range[1] < keys.length){
        //         true_range.push(Number(keys[current_range[1]]));
        //     }else {
        //         true_range.push(Number(keys[keys.length-1]+1));
        //     }
        //     console.log(true_range);
        //     csFilterData.dimDep_Clouds_3.filterRange(true_range);
        //     update();
        // }
        // if (thisdata.length ==125){
        //     let this___data = csFilterData.Departure_Delay.all();
        //     let nbFt = this___data.length;
        //     let innerWidth = 380;
        //     let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
        //     let keys = [];
        //     thisdata.forEach(element => {
        //         keys.push(element.key);
        //     });
        //     let true_range = [Number(keys[current_range[0]])]
        //     if (current_range[1] < keys.length){
        //         true_range.push(Number(keys[current_range[1]]));
        //     }else {
        //         true_range.push(Number(keys[keys.length-1]+1));
        //     }
        //     console.log(true_range);
        //     csFilterData.dimDeparture_Delay.filterRange(true_range);
        //     update();
        // }
    });

    Lng_WbarCharts.onBrushed(function(thisdata, s){
        console.log(thisdata.length);
        // https://bl.ocks.org/mthh/0f8c11f4b017f7a640ad35315fbea278
        if (thisdata.length == 5){
            let this___data = csFilterData.Carrier_Code.all();
            let nbFt = this___data.length;
            let innerWidth = 380;
            let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
            let keys = [];
            thisdata.forEach(element => {
                keys.push(element.key);
            });
            let true_range = [Number(keys[current_range[0]])]
            if (current_range[1] < keys.length){
                true_range.push(Number(keys[current_range[1]]));
            }else {
                true_range.push(Number(keys[keys.length-1]+1));
            }
            //console.log(true_range);
            csFilterData.dimCarrier_Code.filterRange(true_range);
            update();
        }
        if (thisdata.length == 8){
            let this___data = csFilterData.Flight_Month.all();
            let nbFt = this___data.length;
            let innerWidth = 380;
            let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
            let keys = [];
            thisdata.forEach(element => {
                keys.push(element.key);
            });
            let true_range = [Number(keys[current_range[0]])]
            if (current_range[1] < keys.length){
                true_range.push(Number(keys[current_range[1]]));
            }else {
                true_range.push(Number(keys[keys.length-1]+1));
            }
            //console.log(true_range);
            csFilterData.dimFlight_Month.filterRange(true_range);
            update();
        }
        if (thisdata.length == 31){
            let this___data = csFilterData.Flight_Day.all();
            let nbFt = this___data.length;
            let innerWidth = 380;
            let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
            let keys = [];
            thisdata.forEach(element => {
                keys.push(element.key);
            });
            let true_range = [Number(keys[current_range[0]])]
            if (current_range[1] < keys.length){
                true_range.push(Number(keys[current_range[1]]));
            }else {
                true_range.push(Number(keys[keys.length-1]+1));
            }
            //console.log(true_range);
            csFilterData.dimFlight_Day.filterRange(true_range);
            update();
        }
        if (thisdata.length == 20){
            let this___data = csFilterData.Scheduled_Departure_Time.all();
            let nbFt = this___data.length;
            let innerWidth = 380;
            let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
            let keys = [];
            thisdata.forEach(element => {
                keys.push(element.key);
            });
            let true_range = [Number(keys[current_range[0]])]
            if (current_range[1] < keys.length){
                true_range.push(Number(keys[current_range[1]]));
            }else {
                true_range.push(Number(keys[keys.length-1]+1));
            }
            //console.log(true_range);
            csFilterData.dimScheduled_Departure_Time.filterRange(true_range);
            update();
        }

        if (thisdata.length == 14){
            console.log("here")
            let this___data = csFilterData.Dep_Temp_3.all();
            let nbFt = this___data.length;
            let innerWidth = 380;
            let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
            let keys = [];
            thisdata.forEach(element => {
                keys.push(element.key);
            });
            let true_range = [Number(keys[current_range[0]])]
            if (current_range[1] < keys.length){
                true_range.push(Number(keys[current_range[1]]));
            }else {
                true_range.push(Number(keys[keys.length-1]+1));
            }
            //console.log(true_range);
            csFilterData.dimDep_Temp_3.filterRange(true_range);
            update();
        }
        if (thisdata.length == 13){
            let this___data = csFilterData.Dep_Wind_Speed_3.all();
            let nbFt = this___data.length;
            let innerWidth = 380;
            let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
            let keys = [];
            thisdata.forEach(element => {
                keys.push(element.key);
            });
            let true_range = [Number(keys[current_range[0]])]
            if (current_range[1] < keys.length){
                true_range.push(Number(keys[current_range[1]]));
            }else {
                true_range.push(Number(keys[keys.length-1]+1));
            }
            //console.log(true_range);
            csFilterData.dimDep_Wind_Speed_3.filterRange(true_range);
            update();
        }
        if (thisdata.length ==11){
            let this___data = csFilterData.Dep_Clouds_3.all();
            let nbFt = this___data.length;
            let innerWidth = 380;
            let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
            let keys = [];
            thisdata.forEach(element => {
                keys.push(element.key);
            });
            let true_range = [Number(keys[current_range[0]])]
            if (current_range[1] < keys.length){
                true_range.push(Number(keys[current_range[1]]));
            }else {
                true_range.push(Number(keys[keys.length-1]+1));
            }
            //console.log(true_range);
            csFilterData.dimDep_Clouds_3.filterRange(true_range);
            update();
        }
        if (thisdata.length ==29){
            let this___data = csFilterData.Departure_Delay.all();
            let nbFt = this___data.length;
            let innerWidth = 380;
            let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
            let keys = [];
            thisdata.forEach(element => {
                keys.push(element.key);
            });
            let true_range = [Number(keys[current_range[0]])]
            if (current_range[1] < keys.length){
                true_range.push(Number(keys[current_range[1]]));
            }else {
                true_range.push(Number(keys[keys.length-1]+1));
            }
            //console.log(true_range);
            csFilterData.dimDeparture_Delay.filterRange(true_range);
            update();
        }

        if (thisdata.length == 17){
            let this___data = csFilterData.Lat_N.all();
            let nbFt = this___data.length;
            let innerWidth = 380;
            let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
            let keys = [];
            thisdata.forEach(element => {
                keys.push(element.key);
            });
            let true_range = [Number(keys[current_range[0]])]
            if (current_range[1] < keys.length){
                true_range.push(Number(keys[current_range[1]]));
            }else {
                true_range.push(Number(keys[keys.length-1]+1));
            }
            //console.log(true_range);
            csFilterData.dimLat_N.filterRange(true_range);
            update();
        }
        if (thisdata.length == 26){
            let this___data = csFilterData.Lng_W.all();
            let nbFt = this___data.length;
            let innerWidth = 380;
            let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
            let keys = [];
            thisdata.forEach(element => {
                keys.push(element.key);
            });
            let true_range = [Number(keys[current_range[0]])]
            if (current_range[1] < keys.length){
                true_range.push(Number(keys[current_range[1]]));
            }else {
                true_range.push(Number(keys[keys.length-1]+1));
            }
            //console.log(true_range);
            csFilterData.dimLng_W.filterRange(true_range);
            update();
        }
    })


// Departure_DelaybarCharts

    update();
}

function update()
{
    //createCarrierPlot(csFilterData.Carrier_Code.all());
    createGeoPlot(csFilterData.Location.all());
    createLines(csFilterData);
    createPieChart(csFilterData.Carrier_Code.all());
}

function createCarrierPlot(csFilterDataCarriers)
{
    d3.select("#carrier-bar-plot-container")
    .datum(csFilterDataCarriers)
    .call(Carrier_CodebarCharts);
}

// function removeLines(){
//     const lines = document.querySelectorAll('.line-row');
//     lines.forEach(l => {
//         l.remove();
//     });
// }

function createLines(csFilterData)
{
    // removeLines();
    //let lines_div = document.getElementById('lines-container');
    let i = 3;
    while (i < all_cols.length - 1)
    {
        // 'Carrier_Code', 'Origin_Airport', 'Flight_Season', 'Flight_Month',
        // 'Flight_Week', 'Flight_Day', 'Scheduled_Departure_Time',
        // 'Actual_Departure_Time', 'Departure_Delay', 'Dep_Temp_3',
        // 'Dep_Pressure_3', 'Dep_Humidity_3', 'Dep_Wind_Speed_3',
        // 'Dep_Wind_Deg_3', 'Dep_Clouds_3', 'Dep_Rain_3', 'Lat_N',
        // 'Lng_W', 'GMT'
        if ( i == 4) {
            // skip
            i++; continue;
        }
        if ( i == 7) {
            // skip
            i++; continue;
        }
        if ( i == 10) {
            // skip
            i++; continue;
        }
        if ( i == 11) {
            // skip
            i++; continue;
        }
        if ( i == 13) {
            // skip
            i++; continue;
        }
        if (i == 15){
            i++; continue;
        }


        // if (counter%4 == 0){
        //     currentRow = document.createElement("div");
        //     currentRow.classList.add("row");
        //     currentRow.classList.add("line-row");
        //     //currentRow.classList.add("center");
        //     lines_div.appendChild(currentRow);
        // }


        newChartID = "#" + all_cols[i] + "-plot-container";
        createNewLineChart(newChartID, csFilterData, i);
        i++;
    }
}


function createNewLineChart(newChartID, csFilterData, i)
{
    // console.log(newChartID);
    // console.log(i);
    switch (i)
    {
        // 'Carrier_Code', 'Origin_Airport', 'Flight_Season', 'Flight_Month',
        // 'Flight_Week', 'Flight_Day', 'Scheduled_Departure_Time',
        // 'Actual_Departure_Time', 'Departure_Delay', 'Dep_Temp_3',
        // 'Dep_Pressure_3', 'Dep_Humidity_3', 'Dep_Wind_Speed_3',
        // 'Dep_Wind_Deg_3', 'Dep_Clouds_3', 'Dep_Rain_3', 'Lat_N',
        // 'Lng_W', 'GMT'
        // case 0:
        //     // 'Carrier_Code'
        //     break;
        // case 1:
        //     // 'Origin_Airport'
        //     d3.select(newChartID)
        //       .datum(csFilterData.Origin_Airport.all())
        //       .call(barCharts)
        //       .select(".x.axis")
        //       .selectAll(".tick text")
        //       .attr(TRANSFORM, "rotate(-45)")
        //       .attr();
        //     break;
        // case 2:
        //     // 'Flight_Season'
        //     d3.select(newChartID)
        //       .datum(csFilterData.Flight_Season.all())
        //       .call(barCharts);
        //     break;
        case 3:
            // 'Flight_Month'
            d3.select(newChartID)
              .datum(csFilterData.Flight_Month.all())
              .call(Flight_MonthbarCharts)
              ;
            break;
        // case 4:
        //     // 'Flight_Week'
        //     d3.select(newChartID)
        //       .datum(csFilterData.Flight_Week.all())
        //       .call(barCharts)
        //       .select(".x.axis")
        //       .selectAll(".tick text")
        //       .attr(TRANSFORM, "rotate(-45)");
        //     break;
        case 5:
            // 'Flight_Day'
            d3.select(newChartID)
              .datum(csFilterData.Flight_Day.all())
              .call(Flight_DaybarCharts)
              ;
            break;

            // 'Carrier_Code', 'Origin_Airport', 'Flight_Season', 'Flight_Month',
        // 'Flight_Week', 'Flight_Day', 'Scheduled_Departure_Time',
        // 'Actual_Departure_Time', 'Departure_Delay', 'Dep_Temp_3',
        // 'Dep_Pressure_3', 'Dep_Humidity_3', 'Dep_Wind_Speed_3',
        // 'Dep_Wind_Deg_3', 'Dep_Clouds_3', 'Dep_Rain_3', 'Lat_N',
        // 'Lng_W', 'GMT'

        case 6:
            // 'Scheduled_Departure_Time',
            d3.select(newChartID)
              .datum(csFilterData.Scheduled_Departure_Time.all())
              .call(Scheduled_Departure_TimebarCharts);
            break;
        // case 7:
        //    // 'Actual_Departure_Time'
        //     break;
        case 8:
            // 'Departure_Delay'
            d3.select(newChartID)
              .datum(csFilterData.Departure_Delay.all())
              .call(Departure_DelaybarCharts)
              .select(".x.axis")
              .selectAll(".tick text")
              .attr(TRANSFORM, "rotate(-45)");
            break;
        case 9:
            //'Dep_Temp_3'
            d3.select(newChartID)
              .datum(csFilterData.Dep_Temp_3.all())
              .call(Dep_Temp_3barCharts);
            break;
        // case 10:
        //     //'Dep_Pressure_3'
        //     break;
        // case 11:
        //     // Dep_Humidity_3
        //     break;
        case 12:
            // 'Dep_Wind_Speed_3'
            d3.select(newChartID)
              .datum(csFilterData.Dep_Wind_Speed_3.all())
              .call(Dep_Wind_Speed_3barCharts);
            break;
        // case 13:
        //     // 'Dep_Wind_Deg_3'
        //     break;
        case 14:
            // 'Dep_Clouds_3'
            d3.select(newChartID)
              .datum(csFilterData.Dep_Clouds_3.all())
              .call(Dep_Clouds_3barCharts);
            break;
        // case 15:
        //     // 'Dep_Rain_3'
        //     d3.select(newChartID)
        //       .datum(csFilterData.Dep_Rain_3.all())
        //       .call(barCharts);
        //     break;  
        case 16:
            // Lat_N
            d3.select(newChartID)
            .datum(csFilterData.Lat_N.all())
            .call(Lat_NbarCharts);
            break;
        case 17:
            // Lng_W
            d3.select(newChartID)
            .datum(csFilterData.Lng_W.all())
            .call(Lng_WbarCharts);
            break;          
        default:
            break;
    }
}


function createPieChart(pie_data)
{
    let temp = document.querySelector("#carrier-pie-plot-container");
    while(temp.firstChild){
        temp.removeChild(temp.firstChild);
    }
    //https://medium.com/@kj_schmidt/making-an-animated-donut-chart-with-d3-js-17751fde4679
    // https://medium.com/@kj_schmidt/show-data-on-mouse-over-with-d3-js-3bf598ff8fc2
    // d3.select("#carrier-pie-plot-container")
    // .datum(csFilterDataCarriers)

    var width = 500;
    var height = 300;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 75; //This is the size of the hole in the middle

    // Create dummy data
    //var data = {a: 9, b: 20, c:30, d:8, e:12}
    data = pie_data;
    // pie_data.forEach(element => {
    //     data[element.key] = element.value;
    // });
    //console.log(data);

    var svg = d3.select('#carrier-pie-plot-container')
     .append('svg')
     .attr('width', width)
     .attr('height', height)
     .append('g')
     .attr('transform', 'translate(' + (width / 2 + 50) + ',' + (height / 2) + ')');
    var arc = d3.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);
    var pie = d3.pie()
        .value(function (d) {
            return d.value;
        })
        .sort(null);
    var path = svg.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) {
            return clusterColor[d.data.key];
        })
        .attr('transform', 'translate(0, 0)')
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                 .duration('50')
                 .attr('opacity', '.5');
                //  csFilterData.dimCarrier_Code.filter(d.key);
                //  update();
                })
       .on('mouseout', function (d, i) {
            d3.select(this).transition()
                 .duration('50')
                 .attr('opacity', '1');})
        .on('click', function(d){
            if (selected_carrier == d.data.key){
                selected_carrier == null;
                csFilterData.dimCarrier_Code.filterAll();
                update();
            }else {
                selected_carrier = d.data.key;
                //console.log(selected_carrier);
                csFilterData.dimCarrier_Code.filter(selected_carrier);
                update();
            }
        });
            

            //      csFilterData.dimCarrier_Code.filter(d.key);
            //      update();
            //  }).onMouseOut(function(){
            //      csFilterData.dimCarrier_Code.filterAll();
            //      update();
            //  }).

        var legendRectSize = 13;
        var legendSpacing = 7;
        var legend = svg.selectAll('.legend') //the legend and placement
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'circle-legend')
        .attr('transform', function (d, i) {
             var height = legendRectSize + legendSpacing;
             var offset = height * data.length / 2;
             var horz = -2 * legendRectSize - 13;
             var vert = i * height - offset;
             return 'translate(' + horz + ',' + vert + ')';
        });
        legend.append('circle') //keys
        .style('fill', function(d) {
            // console.log(d);
            return clusterColor[d.key];
        })
        .style('stroke', "black")
        .attr('cx', 10)
        .attr('cy', 0)
        .attr('r', '.5rem');
        legend.append('text') //labels
        .attr('x', legendRectSize + legendSpacing + 5)
        .attr('y', legendRectSize - legendSpacing)
        .text(function (d) {
             return airlines[d.key]+ ": "+d.value;
        });

}


function rand(start){
    shift = Math.random() * 10 * 2;
    return start + shift;
}

function createGeoPlot(geoData){
    // http://bl.ocks.org/phil-pedruco/7745589
    let temp = document.querySelector("#geo-plot-container");
    while(temp.firstChild){
        temp.removeChild(temp.firstChild);
    }

    var width = 600,
    height = 300;

    // set projection
    var projection = d3.geoMercator().scale(520).center([-71.7, 28]);;

    // create svg variable
    var geo_svg = d3.select("#geo-plot-container").append("svg")
                .attr("width", width)
                .attr("height", height)
                ;
        


    d3.json("https://raw.githubusercontent.com/janasayantan/datageojson/master/world.json", function(map_data) { 
        // set projection parameters
        // projection
        // .scale(520)
        // .center([-71.7, 28]);


        // // points
        // aa = [-122.490402, 37.786453];
        // bb = [-100.389809, 37.72728];

        // console.log(projection(aa),projection(bb));

        geo_svg.append("g").selectAll("path")
            .data(map_data.features)
            .enter()
            .append("path")
            .attr("fill", "white")
            .attr("d", d3.geoPath().projection(projection))
            .style("stroke", "black");

        clusters = [];
        let pcpDataset = geoData;
        GEO_CLUSTER = ".geo-cluster-";
        for(let i = 0; i < pcpDataset.length; i++){
            let cluster_i = cluster_IDs[i] 
            // filter out the data with the corresponding IDs
            // [d['Lat_N'], d['Lng_W'], d['Carrier_Code']]
            // key: (3) [18.43, 65.99, 8]
            // value: 1
            cluster_data = pcpDataset.filter(function(d) {
                return Number(d.key[2]) == cluster_i;
            });

            clusters.push(geo_svg
                .selectAll(GEO_CLUSTER + clusterColor[cluster_i].substring(1))
                .data(cluster_data)
                .enter()
                .append("circle")
                .attr("r", function(d) { 
                    let x = 5 * Math.sqrt(Number(d.value)); 
                    x = Math.round(x*100) / 100; 
                    return x + "px";})
                // .attr("cx", function (d) { cx = projection([-d["Lng_W"], d["Lat_N"]])[0]; return rand(cx); })
                // .attr("cy", function (d) { cy = projection([-d["Lng_W"], d["Lat_N"]])[1]; return rand(cy); })
                .attr("cx", function (d) { cx = projection([-d.key[1], d.key[0]])[0]; return rand(cx); })
                .attr("cy", function (d) { cy = projection([-d.key[1], d.key[0]])[1]; return rand(cy); })
                .attr(CLASS, GEO_CLUSTER.substring(1) + clusterColor[cluster_i])
                .style("fill", clusterColor[cluster_i]))
        };

    });

    // return [projection, geo_svg];
}

// function addGeoPoints(geoData, geo_arr)
// {
//     let temp_svg = geo_arr[1];
//     let temp_projection = geo_arr[0];
//     // svg.append("text").text("Hello");
//     d3.json("https://raw.githubusercontent.com/janasayantan/datageojson/master/world.json", function(map_data) { 
//         //console.log("here");
//         temp_svg
//         .selectAll(".geo_points")
//         .datum(geoData)
//         .enter()
//         .append("circle")
//         .attr("r", function (d) { console.log(d); return d.value;})
//         // .attr("cx", function (d) { cx = projection([-d["Lng_W"], d["Lat_N"]])[0]; return rand(cx); })
//         // .attr("cy", function (d) { cy = projection([-d["Lng_W"], d["Lat_N"]])[1]; return rand(cy); })
//         .attr("cx", function (d) { cx = temp_projection([-d.key[1], d.key[0]])[0]; return rand(cx); })
//         .attr("cy", function (d) { cy = temp_projection([-d.key[1], d.key[0]])[1]; return rand(cy); })
//         //.attr(CLASS, GEO_CLUSTER.substring(1) + clusterColor[cluster_i])
//         //.style("fill", clusterColor[d.key[2]])
//     });
// }


function translateXY(x, y){
    return "translate(" + x + "," + y + ")";
}

function rotateDegree(degree){
    return "rotate(" + degree + ")";
}


function createSVG(docID, svgID, height, width, gID) {
    let dimension = "0 0 " + width + " " + height;
    let svg = d3.select(docID)
        .append("svg")
        .attr(ID, svgID)
        .attr("viewBox", dimension);
    console.log("svg " + docID + " created");
    let g = svg.append("g")
        .attr(TRANSFORM, translateXY(82,28))
        .attr(ID, gID);
    console.log("g " + gID + " created");
    return g;
}


// Create x and y axis given g
 function createAxis(xaxis, yaxis, height,
        width,columnX, columnY,  g, margin, xAxisID, yAxisID, xaxisFont, yaxisFont){
    // x axis
    // console.log(height)
    // console.log(margin)
    // console.log(width)
    if(xaxis != null && xaxis != undefined){
        g
        .append("g")
        .attr(TRANSFORM, translateXY(0, height-margin))
        .attr(CLASS, "x-axis")
        .attr(ID, xAxisID)
        
        .call(d3.axisBottom().scale(xaxis))
        //.selectAll(TEXT)
        .style("font-size", xaxisFont);
        
        // center in the plot
        let xAxisWidth = width - margin*2;
        
        // add x axis name
        d3.select("#"+xAxisID)
        .append(TEXT)
        .attr(TRANSFORM, translateXY(-100, 40))
        .attr("x", xAxisWidth)
        .text(columnX)
        .attr("stroke", "black")
        .style("fill", 'black')
        .style("font-size", "20px");
    }

    //y axis
    if(yaxis != null && yaxis != undefined){
        g
        .append("g")
        .attr(ID, yAxisID)
        .attr(CLASS, "y-axis")
        .call(d3.axisLeft().scale(yaxis))
        //.attr(TRANSFORM, translateXY(TRANSLATE_LEFT, 0))
        .style("font-size", yaxisFont);

        // add y axis name
        d3.select("#"+yAxisID)
        .append(TEXT)
        .text(columnY)
        //.attr(TRANSFORM, rotateDegree(-90)+translateXY(60, -60))
        .attr("stroke", "black")
        .style("fill", 'black')
        .style("font-size", "20px");
    }
}


// function createDataMDSPlot(){
//     // height width margin
//     let height = 200;
//     let width = 200;
//     let svgHeight = 300;
//     let svgWidth = 300;
//     let margin = 0;
//     let mdsDataPoints = data["mds_data"];
    
//     // docID, svgID, height, width, gID
//     let g = createSVG("#data-mds-plot-div", "data-mds-plot", svgHeight,svgWidth , "data-mds-plot-container");
//     g.attr(TRANSFORM, translateXY(20, 20));
    
//     let x_domain = data["mds_data_domain_x"];
//     let y_domain = data["mds_data_domain_y"];
//     let xaxis = d3.scaleLinear().domain(x_domain).range([0, width]);
//     let yaxis = d3.scaleLinear().domain(y_domain).range([height, 0]);

//     // xaxis, yaxis, height,
//     // width,columnX, columnY,  g, margin, xAxisID, yAxisID, xaxisFont, yaxisFont
//     createAxis(xaxis, yaxis, height, 
//         width, "X", "Y", g, margin,
//         "data-mds-x-axis", "data-mds-y-axis", "6px", "6px");

//     for (let i = 0; i < mdsDataPoints.length; i++){
//         let current_cluster_class = ".data-mds-scatter-points-" + clusterColor[i];
//         g.selectAll(current_cluster_class)
//             .data(mdsDataPoints[i])
//             .enter()
//             .append("circle")
//             .attr(CLASS, current_cluster_class.substring(1))
//             .attr("cy", d => yaxis(d[1]))
//             .attr("cx", d => xaxis(d[0]))
//             .style("fill", clusterColor[i])
//             //.attr(TRANSFORM, translateXY(TRANSLATE_LEFT,0))
//             .attr("r", 2.5);
//     }
// }


// function createVariablesMDSPlot(csFilterData){
//     // height width margin
//     let height = 300;
//     let width = 400;
//     let svgHeight = 400;
//     let svgWidth = 500;
//     let margin = 0;

//     let g = createSVG("#variables-mds-plot-div", "variable-mds-plot",
//      svgHeight,svgWidth , "variables-mds-plot-container");
    
//     let xDomain = data["mds_variable_domain_x"];
//     let yDomain = data["mds_variable_domain_y"];
//     let xaxis = d3.scaleLinear().domain(xDomain).range([0, width]);
//     let yaxis = d3.scaleLinear().domain(yDomain).range([height, 0]);
    
//     g.attr(TRANSFORM, translateXY(50, 50));
//     // xaxis, yaxis, height,
//     // width,columnX, columnY,  g, margin, xAxisID, yAxisID, xaxisFont, yaxisFont
//     createAxis(xaxis, yaxis, height, width,"X",
//         "Y", g, margin,
//         "variable-mds-x-axis", "variable-mds-y-axis", "6px", "6px");

//     let variables = data["variables"];
//     let variableMDSPoints = data["mds_variables"];
    
//     // variable mds scatter points
//     let scatterPointClassName = ".variables-mds-scatter-point";
//     g.selectAll(scatterPointClassName)
//         .data(variableMDSPoints)
//         .enter()
//         .append("circle")
//         .attr(ID, (d, i) => scatterPointClassName.substring(1) + "-" + variables[i])
//         .attr(CLASS, scatterPointClassName.substring(1))
//         .attr("r", 6)
//         .attr("cy", d => yaxis(d[1]))
//         .attr("cx", d => xaxis(d[0]))
//         .attr("fill", "blue")
//         //.attr(TRANSFORM, translateXY(TRANSLATE_LEFT,0))
//         // Add listener
//         .on("click", onMouseClick);

//     // labels
//     g.selectAll(".variables-mds-labels")
//         .data(variableMDSPoints)
//         .enter()
//         .append(TEXT)
//         .text((d, i) => variables[i])
//         .attr(CLASS, "variables-mds-labels")
//         .attr("dy", "-0.7em")
//         .attr("y", d => yaxis(d[1]))
//         .attr("x", d => xaxis(d[0]))
//         .style("text-anchor", MIDDLE)
//         //.attr(TRANSFORM, translateXY(TRANSLATE_LEFT,0))
//         .style("stroke", SB_RED);

//     createPCP(variables, csFilterData);

//     let selectedFeatures = [];

//     // lines that connect the selected features.
//     function connectSelectedFeatures(){
//         let lineClassName = ".scatter-point-connected-lines"
//         d3.selectAll(lineClassName).remove();
//         let p = selectedFeatures.map(c => variableMDSPoints[variables.indexOf(c)]);
//         // https://stackoverflow.com/questions/13728402/what-is-the-difference-d3-datum-vs-data
//         g.append(PATH)
//             .datum(p)
//             .attr(_D,
//                 // http://using-d3js.com/05_04_curves.html#p_2WDH+lWvN1
//                 d3.line().curve(d3.curveLinear).x(d => xaxis(d[0])).y(d=>yaxis(d[1]))
//             )
//             .attr(CLASS, lineClassName.substring(1))
//             .style("stroke", "black")
//             .style("fill", 'none');
//     }

 
//     function redrawScatterPoints(){
//         let scatterPointClassName = ".variables-mds-scatter-point";
//         d3.selectAll(scatterPointClassName).remove();
//         g.selectAll(scatterPointClassName)
//             .data(variableMDSPoints)
//             .enter()
//             .append("circle")
//             .attr(ID, (d, i) => scatterPointClassName.substring(1) +"-" + variables[i])
//             .attr(CLASS, scatterPointClassName.substring(1))
//             .attr("r", 7)
//             .attr("cy", d => yaxis(d[1]))
//             .attr("cx", d => xaxis(d[0]))
//             // if the point is selectedFeatures, turn it red
//             .style("fill", (d, i) => selectedFeatures.includes(variables[i]) ? SB_RED : "blue")
//             // Add listener
//             .on("click", onMouseClick)
//             ;
//     }

//     // Click to select a feature
//     function onMouseClick(){
//         let id = this.id.substring(1 + this.id.lastIndexOf('-'));
//         console.log(id);
//         let index = selectedFeatures.indexOf(id);
//         if(index === -1){
//             // push the newly selected feature into the list
//             selectedFeatures.push(id);
//         }
//         else{
//             // remove all lines after the selected feature
//             selectedFeatures.splice(index, selectedFeatures.length - index);
//         }
//         // Redraw the variables MDS plot
//         redrawScatterPoints(); 
//         connectSelectedFeatures(); 
//         // if all features has been selected
//         if(variables.length === selectedFeatures.length){
//             d3.select("#pcp-plot").remove();
//             console.log("Old PCP plot removed");
//             createPCP(selectedFeatures);
//             console.log("New PCP plot created");
//         }
//     }


// }

// function createPCP(variables, csFilterData){
//     // height and width of the plot
//     let height = 400;
//     let width = 1000;
//     let svgHeight = 500;
//     let svgWidth = 1200;

//     let g = createSVG("#pcp-div", "pcp-plot", svgHeight,svgWidth , "pcp-plot-container");

//     let domains = data['pcp_dataset_domains'];
//     let pcpDataset = csFilterData;

//     let yaxis = {};
//     let i = 0;
//     while (i < variables.length){
//         let y_domain = [domains[variables[i]][0], domains[variables[i]][1]];
//         yaxis[variables[i]] = d3.scaleLinear().domain(y_domain).range([height, 0]);
//         i++;
//     }

//     // Use this x axis to scale y axis
//     let xaxis = d3.scalePoint().domain(variables).range([0, width]);

//     // https://d3-graph-gallery.com/parallel
//     function path (d){
//         return d3.line().curve(d3.curveLinear)(variables.map(v => [xaxis(v), yaxis[v](d[v])]));
//     }

//     let lines = []
//     let PCP_LINES = ".pcp-lines-";
    
//     for(let i = 0; i < 5; i++){
//         let cluster_i = cluster_IDs[i] 
//         // filter out the data with the corresponding IDs
//         cluster_data = pcpDataset.filter(function(d) {
//             return Number(d[CARRIER_CODE]) == cluster_i;
//         });

//         lines.push(g
//             .selectAll(PCP_LINES + clusterColor[cluster_i])
//             .data(cluster_data)
//             .enter()
//             .append(PATH)
//             .attr(_D, path)
//             .attr(CLASS, PCP_LINES.substring(1) + clusterColor[cluster_i])
//             .style("stroke", clusterColor[cluster_i])
//             .style("stroke-width", "0.19")
//             .style("fill", "none")
//             .style("shape-rendering", "crispEdges"))
//     }

//     let dragging = {}

//     function position(d) {
//         var v = dragging[d];
//         return v != null ? v : xaxis(d);
//     }
    
//     let PCP_AXIS = ".pcp-axis";
//     let counter = -1;
//     let groupAxes = 
//        g.selectAll(PCP_AXIS)
//         .data(variables)
//         .enter()
//         .append("g")
//         .attr(CLASS, PCP_AXIS.substring(1))
//         .attr("z-index", "999")
//         .attr(TRANSFORM, d => translateXY(xaxis(d), 0))
//         .each(function (d){
//             // append the label for each yaxis
//             d3.select(this).call(
//               d3.axisLeft().scale(yaxis[d]))
//                 .append(TEXT)
//                 .text(d)
//                 .attr("dy", function(i) {
//                     counter++;
//                     if (counter%2==0) {
//                         // console.log(counter)
//                         return "-1.1em";
//                     }
//                     else {
//                         return "-2.1em";
//                     }
//                 })
//                 .attr(CLASS, PCP_AXIS.substring(1)+"-labels");

//             // setup drag
//             // https://observablehq.com/@d3/circle-dragging-i
//             d3.select(this).call(
//               d3.drag()
//                 .on("start", function(d) {
//                     console.log("Start Dragging");
//                     dragging[d] = xaxis(d);
//                 })
//                 .on("drag", function(d) {
//                     let max_x = Math.max(0, d3.event.x);
//                     dragging[d] = Math.min(width, max_x);
//                     lines.forEach(l => l.attr(_D, path)); // append PCP lines
//                     variables.sort(function(one, two) { 
//                         return -(position(two) - position(one)); // one - two
//                     });
//                     xaxis.domain(variables.map(d => d));
//                     groupAxes.attr(TRANSFORM, d => translateXY(xaxis(d), 0));
//                 })
//                 .on("end", function(d) {
//                     delete dragging[d];
//                     console.log("End Dragging");
//                     d3.select(this).attr(TRANSFORM, translateXY(xaxis(d), 0));
//                     lines.forEach(l => l.attr(_D, path));
//                 }) )
//                 ;
//         })
//         ;
// }



window.onload = function(){
    send_request();
}

// //Initial variable
// var TrainName = "";
// var Destination = "";
// var TrainTime = "12:00";
// var Frequency = 0;
// var data = firebase.database();
// //Capture Button
// $("#add-train").on("click", function(event) {
//     event.preventDefault();
// //Logic that store and retrieve data for most recent input
// TrainName = $("#InputTrainName").val().trim();
// Destination = $("#InputDestination").val().trim();
// TrainTime = $("#InputTrainTime").val().trim();
// Frequency = $("#InputFrequency").val().trim();
// //Logic that push
// data.ref().push({
//     TrainName: TrainName,
//     Destination: Destination,
//     TrainTime: TrainTime,
//     Frequency: Frequency,
//     dataAdded: firebase.database.ServerValue.TIMESTAMP
// })
// });

// data.ref().on("child_added", function (snapshot) {
//     //Write to HTML
//     $("#TrainName-display").text(snapshot.val().TrainName);
//     $("#Destination-display").text(snapshot.val().Destination);
//     $("#TrainTime-display").text(snapshot.val().TrainTime);
//     $("#Frequency-display").text(snapshot.val().Frequency);
// });
//     // This function allows you to update your page in real-time when the firebase database changes.
//   data.ref().orderByChild('dateAdded').limitToLast(1).on('child_added', function (snapshot) {

//     let childData = snapshot.val()
//     self.employeeToTable(childData)
//     //error report
// }, function(errorObject) {
//     console.log("Error at: " + errorObject.code);
// });

// //fxn for math
// var TrainTimeConverted = moment(TrainTime, "HH:mm").subtract(1, "years");
// var currentTime = moment();
// var diffTime = moment().diff(moment(TrainTimeConverted), "minutes");
// var remainder = diffTime % Frequency;
// var minuteAway = Frequency - remainder;
// var nextArrival = moment().add(minuteAway, "minutes");

// //variable

// //fxn to generate the table
// function table () {
//     var tb = $("#th").attr("scope", "row")
//     snapshot ()
//     $("#table").append(tb)
// }
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCWDON0kp9GWDg4Hh-DKlk1fWrWeWEuY8c",
    authDomain: "trainhw-e7e9e.firebaseapp.com",
    databaseURL: "https://trainhw-e7e9e.firebaseio.com",
    projectId: "trainhw-e7e9e",
    storageBucket: "trainhw-e7e9e.appspot.com",
    messagingSenderId: "516524192383"
};
firebase.initializeApp(config);



//reference database
var data = firebase.database();

//variable
var TrainName = "";
var Destination = "";
var TrainTime = "12:00";
var Frequency = 0;






//Capture button
$("#add-train").on("click", function (event) {
    event.preventDefault();

    //Capture userInput
    TrainName = $("#InputTrainName").val().trim();
    Destination = $("#InputDestination").val().trim();
    TrainTime = $("#InputTrainTime").val().trim();
    Frequency = $("#InputFrequency").val().trim();

    //Hold temp value
    var newTrain = {
        name: TrainName,
        location: Destination,
        time: TrainTime,
        rate: Frequency
    }

    //upload data
    data.ref().push(newTrain);
    //clear user input
    $("#InputTrainName").val("");
    $("#InputDestination").val("");
    $("#InputTrainTime").val("");
    $("#InputFrequency").val("");
});

//checking
data.ref().on("child_added", function (childSnapshot) {

    //Variable input
    var csv = childSnapshot.val()

    var nTrain = csv.name;
    var nDestination = csv.location;
    var nTime = csv.time;
    var nRate = csv.rate;

    //math
    var TrainTimeConverted = moment(TrainTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(TrainTimeConverted), "minutes");
    var remainder = diffTime % nRate;
    var minuteAway = nRate - remainder;
//New tRow
var tRow = $("<tr>")
    //Add to table
    var row1 = $("<th>");
    var row2 = $("<th>");
    var row3 = $("<th>");
    var row4 = $("<th>");
    var row5 = $("<th>");


    row1.text(nTrain);
    row2.text(nDestination);
    row3.text(nRate);
    row4.text(nTime);
    row5.text(minuteAway);

    tRow.append(row1, row2, row3, row4, row5)
    $("tBody").append(tRow);

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
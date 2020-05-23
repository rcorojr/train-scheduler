
$(document).ready(function(){
  

var firebaseConfig = {
    apiKey: "AIzaSyBZfmZnbyx2oHce0WHTIorvU7SPvgY2H4k",
    authDomain: "timesheet-2f5be.firebaseapp.com",
    databaseURL: "https://timesheet-2f5be.firebaseio.com",
    projectId: "timesheet-2f5be",
    storageBucket: "timesheet-2f5be.appspot.com",
    messagingSenderId: "252647608411",
    appId: "1:252647608411:web:c48a5534aa62aebe39ef7e"
  };

  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event){
    event.preventDefault();
  

  //pulls user inputs
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainFirst = $("#first-input").val().trim();
  var trainFreq = $("#frequency-input").val().trim();


  
  var newTrain = {
    train: trainName,
    destination: trainDest,
    firstTrain: trainFirst,
    frequency: trainFreq,
  };

//pushes to database (after updated rules in firebase)
database.ref().push(newTrain);

console.log(newTrain.train);
console.log(newTrain.destination);
console.log(newTrain.firstTrain);
console.log(newTrain.frequency);

alert("New train added");

//clears fields
$("#train-name-input").val("");
$("#destination-input").val("");
$("#first-input").val("");
$("#frequency-input").val("");




});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().train;
    var trainDest = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().firstTrain;
    var trainFreq = childSnapshot.val().frequency;
    
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFirst);
    console.log(trainFreq);

    //must add moment calculations

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    var diffTime = currentTime.diff(moment(trainFirst, "HH:mm"), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime)

    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    var trainArrive = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + trainArrive);

    var trainMin = moment().add(trainArrive, "minutes");
    console.log("ARRIVAL TIME: " + moment(trainMin).format("HH:mm"));
    

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(trainArrive),
        $("<td>").text(trainMin),  
    );

    $("#train-table > tbody").append(newRow);
});
})
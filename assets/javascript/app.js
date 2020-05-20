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
    console.log(event);
  

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


database.ref().push(newTrain);

console.log(newTrain.train);
console.log(newTrain.destination);
console.log(newTrain.firstTrain);
console.log(newTrain.frequency);

alert("New train added");

});
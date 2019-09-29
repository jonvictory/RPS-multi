$('#clock');

function update() {
  $('#clock').html(moment().format('hh:mm A MMMM DD, YYYY HH:mm:ss'));
}

setInterval(update, 1000);

var firebaseConfig = {
    apiKey: "AIzaSyDM_IMX3vWQzlgxubIF4R2N_plmFvmwyOA",
    authDomain: "rps-multi-69.firebaseapp.com",
    databaseURL: "https://rps-multi-69.firebaseio.com",
    projectId: "rps-multi-69",
    storageBucket: "rps-multi-69.appspot.com",
    messagingSenderId: "314426994230",
    appId: "1:314426994230:web:6bbdd7390cd624b98a7297",
    measurementId: "G-D3JWVFDNQ8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.analytics();

var database = firebase.database()

var name = '';
    var dest = '';
    var virgin = '';
    var freq = '';

var entry = 0;

    // Capture Button Click
    $("#add-user").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      name = $("#input-name").val().trim();
      dest = $("#input-dest").val().trim();
      virgin= $("#input-time").val().trim();
      freqTime= $("#input-freq").val().trim();
        // Math values from inputs:
        virginConvert = moment(virgin, 'HH:mm').format('hh:mm A')

        var tFrequency = freqTime;

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(virginConvert, "hh:mm A")
    
        //Current Time
        var currentTime = moment();
        
        var currTime = currentTime.toString()

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        
    
        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        
    
        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        var tTillTrain = tMinutesTillTrain.toString()
    
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes").format('hh:mm A');
       var nTrain = nextTrain.toString()
        
      // Code for handling the push
      database.ref().push({
        name: name,
        dest: dest,
        virginConvert: virginConvert,
        tFrequency: tFrequency,
        currTime: currTime,
        tTillTrain: tTillTrain,
        nTrain: nTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    });

    // Firebase watcher .on("child_added"
    database.ref().on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();
        entry++
      // Console.loging the last user's data
      console.log(sv.name);
      console.log(sv.dest);
      console.log(sv.virginConvert);
      console.log(sv.tFrequency);
        console.log(sv.currTime);
        console.log(sv.tTillTrain);
        console.log(sv.nTrain);
      console.log(sv.dateAdded);

      // Change the HTML to reflect

      $('#party').append('<tr><td>'+entry+'</td><td>'+sv.name+'</td><td>'+sv.dest+'</td><td>'+sv.virginConvert+'</td><td>'+sv.tFrequency+'</td><td>'+sv.nTrain+'</td><td>'+sv.tTillTrain+'</td></tr>')
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBgzO2wZe4JNl5VThld00JBw0J1vfL7UF8",
    authDomain: "firestoredbtest-f77b4.firebaseapp.com",
    databaseURL: "https://firestoredbtest-f77b4.firebaseio.com",
    projectId: "firestoredbtest-f77b4",
    storageBucket: "firestoredbtest-f77b4.appspot.com",
    messagingSenderId: "984838070173"
  };
  
 firebase.initializeApp(config);
  //Initiallize Firestore 
 var firestore = firebase.firestore();

  //This snipet is needed to avoid errors in the requests
  const settings = {
     timestampsInSnapshots: true
    };
  firestore.settings(settings);



//test to retrieve data
const checkBtn = document.querySelector("#checkBtn");
const uploadNewBtn = document.querySelector("#uploadNewBtn");
var docRef = firestore.collection("sample3");
var allValues = document.querySelector("#allValues");
var values=[];


firestore.collection("sample3").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        values.push(doc.data().name);
        allValues.innerText=values.join(" | ");
    });
});

// This is the check button functionality

checkBtn.addEventListener("click",function(){
    var searchItem = inputBox.value.trim();
    firestore.collection("sample3")
    .where("name", "==", searchItem)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {    
            console.log(doc.data());
            
        outputNameField.innerText=doc.data().name;
        outputPopulationField.innerText=doc.data().population;
        outputCountryField.innerText=doc.data().country;
        
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
});

//By now this code is really ineficient, it adds every time new information

uploadNewBtn.addEventListener("click",function(){
    
    var newNameValue = newName.value;
    var newPopulationValue = newPopulation.value;
    var newCountryValue = newCountry.value;

    firestore.collection("sample3").add({
        name : newNameValue,
        population : newPopulationValue,
        country : newCountryValue
    });

});

// Initialize Firebase
var config = {
    apiKey: "",
    authDomain: "-.firebaseapp.com",
    databaseURL: "https://-.firebaseio.com",
    projectId: "-",
    storageBucket: "-.appspot.com",
    messagingSenderId: ""
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
var docRef = firestore.collection("");
var allValues = document.querySelector("#allValues");
var values=[];


firestore.collection("").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        values.push(doc.data().name);
        allValues.innerText=values.join(" | ");
    });
});

// This is the check button functionality

checkBtn.addEventListener("click",function(){
    var searchItem = inputBox.value.trim();
    firestore.collection("")
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

    firestore.collection("").add({
        name : newNameValue,
        population : newPopulationValue,
        country : newCountryValue
    });

});

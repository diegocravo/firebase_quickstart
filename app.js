var firebaseConfig = {
  apiKey: "AIzaSyA_9hooX2N7e7Ib4pVO3jSarw1YoX-UmJw",
  authDomain: "web-quickstart-af034.firebaseapp.com",
  projectId: "web-quickstart-af034",
  storageBucket: "web-quickstart-af034.appspot.com",
  messagingSenderId: "240345883732",
  appId: "1:240345883732:web:1323a25326a67861c2f9c1",
};
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

const docRef = firestore.doc("samples/sandwichData");
const outputHeader = document.querySelector("#hotDogOutput");
const inputTextField = document.querySelector("#latestHotDogStatus");
const saveButton = document.querySelector("#saveButton");
const loadButton = document.querySelector("#loadButton");

saveButton.addEventListener("click", function () {
  const textToSave = inputTextField.value;
  console.log("I'm going to save " + textToSave + " to Firestore");
  docRef
    .set({
      hotDogStatus: textToSave,
    })
    .then(function () {
      console.log("Status saved!");
    })
    .catch(function (error) {
      console.log("Got an error: ", error);
    });
});

loadButton.addEventListener("click", function () {
  docRef
    .get()
    .then(function (doc) {
      if (doc && doc.exists) {
        const myData = doc.data();
        outputHeader.innerText = "Hot Dog Status: " + myData.hotDogStatus;
      }
    })
    .catch(function (error) {
      console.log("Got and error: ", error);
    });
});

getRealTimeUpdates = function () {
  docRef.onSnapshot(function (doc) {
    if (doc && doc.exists) {
      const myData = doc.data();
      outputHeader.innerText = "Hot Dog Status: " + myData.hotDogStatus;
    }
  });
};

getRealTimeUpdates();

var config = {
    apiKey: "AIzaSyB3urwbUhycDY6jUTCiFloudGHBj7629M4",
    authDomain: "fir-auth-fb5c8.firebaseapp.com",
    databaseURL: "https://fir-auth-fb5c8.firebaseio.com",
    projectId: "fir-auth-fb5c8",
    storageBucket: "fir-auth-fb5c8.appspot.com",
    messagingSenderId: "143950457061"
  };
  firebase.initializeApp(config);
var messageRef=firebase.database().ref('register');
//event listener for form submit
var usernames=[];
var passwords=[];
document.getElementById('Main_reg').addEventListener('submit',submitForm);
//submit form
var flag=true;
function submitForm(e){

    e.preventDefault();
    var name=document.getElementById("fullname").value;
    var username=document.getElementById("username").value;
    var pass1=document.getElementById("password1").value;
    var pass2=document.getElementById("password2").value;
    var email=document.getElementById("email").value;
    var phno=document.getElementById("phno").value;
    var colg=document.getElementById("college").value;
    if(pass1==pass2){
      username+="";
      var password=pass1;
      password+="";
      //console.log("username:"+username+" password:"+password);
      var leadsRef = firebase.database().ref('register');
      leadsRef.on('value', function(snapshot) {
        var all=[];
        var all1=[];
            snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            var str=childData.username;
            var str1=childData.password;
            // usernames.push(str+"");
            // passwords.push(str1+"");
            all.push(str+"");
            all1.push(str1+"");
        });
    
        //console.log(all);
        //console.log(all1);
        //console.log("("+all.includes(username)+")  ("+all1.includes(password) +")  ("+ all1[all.indexOf(username)]+")  ("+password+")  "+flag);
        if(all.includes(username) && all1.includes(password) && (all1[all.indexOf(username)]+""==password) &&flag){
            flag=false;
            all=[]
            all1=[]
            window.alert("you have already registered. Login now!");
            window.location.href = "../events.html";
        }
        else if(all.includes(username) &&flag){
          //flag=false;
          all=[]
          all1=[]
          window.alert("username already taken");
        }
        else if(flag) {
          all=[]
          all1=[]
          flag=false;
          writeUserData(name,username,pass1,email,phno,colg,"M");
        }
    });
  }
  else{
    window.alert("both passwords should match");
  }
}

function writeUserData(name,username,pass1,email,phno,colg,gender) {
  firebase.database().ref('register').push({
    clg_name: colg,
    email:email,
    gender: gender,
    name:name,
    paid:0,
    password:pass1,
    phone_number:phno,
    username: username
  });
  flag=true;
  window.location.href = "../index.html";
  window.alert("user registration successful");

}

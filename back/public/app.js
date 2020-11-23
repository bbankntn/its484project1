var firebaseConfig = {
    apiKey: "AIzaSyBsTvvXu5EGgbt6QqezPNt6eh6svTwCRMY",
    authDomain: "its484project-d70fc.firebaseapp.com",
    databaseURL: "https://its484project-d70fc.firebaseio.com",
    projectId: "its484project-d70fc",
    storageBucket: "its484project-d70fc.appspot.com",
    messagingSenderId: "700866533580",
    appId: "1:700866533580:web:acb33e1a10e8dc84728a69",
    measurementId: "G-96F2FQR6N9"
  };    
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//Button SignUp
  function Togglesignup(){
    var  email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var cpassword = document.getElementById("cpassword").value;
    var role = document.getElementById("role").value;

  //check password matching
    if(password != cpassword)
    {
      alert("Your password and confirm password are not match.");
      return;
    }

    
  //Create User account on Firebase
    firebase.auth().createUserWithEmailAndPassword(email,password).then(e =>
    { 
      var user = firebase.auth().currentUser;
      var uid;
      var regist = 0; // for check first time login ?

      if(user !=null)
      {
        uid = user.uid;
      }
      writeUserData(uid,email,role,regist); 
      alert("Your account has been registed.");
      window.location.replace("index.html");
    });
    
  }

  var database = firebase.database();

// Write user uid&role on database  
  function writeUserData(uid,email,role,regist){
    firebase.database().ref("User/"+ uid).set(
      {
        regist:regist,
        email:email,
        role:role
      });
  }
// Write PI on database
  function insertData(uid,regist,fname,lname,address,city,province,postc,phone){
    //update regist status to already login to database
    firebase.database().ref("User/"+ uid).update(
      {
        regist:regist
      });
    firebase.database().ref("User/"+ uid + "/Personal Information").set(
      {
        fname:fname,
        lname:lname,
        address:address,
        city:city,
        province:province,
        postc:postc,
        phone:phone
      });

  }

// Write Health Care data on database
  function insertHealth(uid,regist,age,weight,height,pressure,heartrate,comment)
  {
    firebase.database().ref("User/"+ uid).update(
      {
        regist:regist
      });

    firebase.database().ref("User/"+ uid + "/Health Care").set(
      {
        age:age,
        weight:weight,
        height:height,
        pressure:pressure,
        heartrate:heartrate,
        comment:comment
      });

  }


//Button Login

  function Toggleslogin(){
  //check email password
  var  email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email,password).then(e =>
    { 
      var user = firebase.auth().currentUser;
      var uid;
      if(user !=null)
      {
            uid = user.uid;
            alert("You are login as  " + email);
      }

      //Get Role value from database
      firebase.database().ref("User/"+ uid +"/role").on("value",(snapshot)=>
      {
        var urole = snapshot.val();
        //check role
        if(urole=="patient")
        {
          firebase.database().ref("User/"+ uid +"/regist").on("value",(snapshot)=>
          { 
            var regist = snapshot.val();
            if(regist==0)
            {
              window.location.replace("patient.html");
            }
            else
            {
              window.location.replace("patient.html");
              firebase.database().ref("User/"+ uid + "/Personal Information");
              getData(uid);
              firebase.database().ref("User/"+ uid +"/Health Care" + "/heartrate");
              getData2(uid);
            }
          });        
        }     
        else
        {
          window.location.replace("doctor.html");
        }
      });
      
    });

}

// log out
function signOut(){
  alert("You have already log out !");
  window.location.replace("index.html");
}

//Button Confirm
function savePI()
{   var  fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var  province = document.getElementById("province").value;
    var postc = document.getElementById("postc").value;
    var phone = document.getElementById("phone").value;
    var user = firebase.auth().currentUser;
    var uid;
    var regist = 1;

      if(user !=null)
      {
        uid = user.uid;
      }

      insertData(uid,regist,fname,lname,address,city,province,postc,phone);
      getData(uid);
      alert("You have already confirmed your data !");
}

//Button Confirm2
function saveHC()
{
  var age = document.getElementById("age").value;
  var weight = document.getElementById("weight").value;
  var height = document.getElementById("height").value;
  var pressure = document.getElementById("pressure").value;
  var heartrate = document.getElementById("heartrate").value;
  var comment = document.getElementById("comment").value;
  var user = firebase.auth().currentUser;
  var uid;
  var regist = 2;

      if(user !=null)
      {
        uid = user.uid;
      }
      insertHealth(uid,regist,age,weight,height,pressure,heartrate,comment);
      getData2(uid);
      alert("You have already confirmed your data !");
}

function getData(uid)
{
  firebase.database().ref("User/"+ uid + "/Personal Information").on("value",(snapshot)=>
  {
    //get data
    var fname = (snapshot.val()&&snapshot.val().fname);
    var lname = (snapshot.val()&&snapshot.val().lname);
    var address = (snapshot.val()&&snapshot.val().address);
    var city = (snapshot.val()&&snapshot.val().city);
    var province = (snapshot.val()&&snapshot.val().province);
    var postc = (snapshot.val()&&snapshot.val().postc);
    var phone = (snapshot.val()&&snapshot.val().phone);

    //write data
    document.getElementById("fname").value = fname;
    document.getElementById("fname").disabled = true;
    document.getElementById("lname").value = lname;
    document.getElementById("lname").disabled = true;
    document.getElementById("address").value = address;
    document.getElementById("address").disabled = true;
    document.getElementById("city").value = city;
    document.getElementById("city").disabled = true;
    document.getElementById("province").value = province;
    document.getElementById("province").disabled = true;
    document.getElementById("postc").value = postc;
    document.getElementById("postc").disabled = true;
    document.getElementById("phone").value = phone;
    document.getElementById("phone").disabled = true;
  });
}

function getData2(uid)
{
  firebase.database().ref("User/"+ uid + "/Health Care").on("value",(snapshot)=>
  {
    //get data
    var age = (snapshot.val()&&snapshot.val().age);
    var weight = (snapshot.val()&&snapshot.val().weight);
    var height = (snapshot.val()&&snapshot.val().height);
    var pressure = (snapshot.val()&&snapshot.val().pressure);
    var heartrate = (snapshot.val()&&snapshot.val().heartrate);
    var comment = (snapshot.val()&&snapshot.val().comment);


    //write data
    document.getElementById("age").value = age;

    document.getElementById("weight").value = weight;

    document.getElementById("height").value = height;

    document.getElementById("pressure").value = pressure;

    document.getElementById("heartrate").value = heartrate;

    document.getElementById("comment").value = comment;
  });
}

var clicked = true;
//Button Test Heart Rate
function testHR()
{ var user = firebase.auth().currentUser;
  var uid;
  var active;
  if(user !=null)
      {
        uid = user.uid;
      }

  // On & OFF iot
  if(clicked)
  { active = "high";
    clicked =  false;
    document.getElementById("btn-test").innerHTML ="STOP";
    firebase.database().ref("iot").update(
      {
        active:active
      });
  
  }
  else
  { active = "low";
    clicked = true;
    document.getElementById("btn-test").innerHTML ="START";
    firebase.database().ref("iot").update(
      {
        active:active
      });
  }

  // get Heart rate value
  //firebase.database().ref("User/"+ uid +"/Health Care" + "/heartrate").on("value",(snapshot)=>
  //{
    //var hr = snapshot.val();

  //});
}

//Write heart rate on database
function insertHeartRate(uid,heartrate)
{
  firebase.database().ref("User/"+ uid + "/Health Care").set(
    {
      heartrate: heartrate
    });
}

//Fetch all user data
function fetchuser()
{
  database.ref("User").on("value",(datasnapshot)=>
  { 
    datasnapshot.forEach(element => {
      var childData = element.val();
      
      if(childData&&childData.role =="patient")
        {
          var x = childData;
          console.log(x);
          if(x&&x.email=="test1@gmail.com")
          {
          document.getElementById("user2").innerHTML = x.email;
          }
          if(x&&x.email=="test2@gmail.com")
          {
            document.getElementById("user3").innerHTML = x.email;
          }
          if(x&&x.email=="test3@gmail.com")
          {
            document.getElementById("user4").innerHTML = x.email;
          }
        }
      else
      {
        var y = childData;
        console.log(y);
        var f = childData&&childData.email;
        document.getElementById("user5").innerHTML =f;  
      }
    });
    
  });
}

// Patient Information
function openTab(evt, cityName) {
  var user = firebase.auth().currentUser;
  var uid;
      if(user !=null)
      {
        uid = user.uid;
      }
  // Declare all variables
  var i, tabcontent, tablinks;


  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
  getData("rB28miQ43JX1a3kUNukXgFKVxiB3");
  getData2("rB28miQ43JX1a3kUNukXgFKVxiB3");
  //getData(uid);
  //getData2(uid);
}

function tinner()
{ 
  if(clicked)
  { 
    clicked =  false;
    document.getElementById("user1").innerHTML ="ON";
  }
  else
  {
    clicked = true;
    document.getElementById("user1").innerHTML ="OFF";
  }
}

window.onload=fetchuser();
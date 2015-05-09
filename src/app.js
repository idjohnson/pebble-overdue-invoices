// Copyright (c) 2015 Intuit Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.”


var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');
//var Settings = require('settings');
var Accel = require('ui/accel');
var Vibe = require('ui/vibe');

var version = "0.0.2";
var aBody = "Written by Isaac Johnson. Version " + version;

var ParkingLetterKey = 3;
var ParkingNumberKey = 4;
var LockedKey = 5;

var optionMenu= [
  {
    title: "Set Parking Spot",
    subtitle: "Set displayed stall"
  },
  {
    title: "Set Locked",
    subtitle: "Did you lock it?"
  },
  {
    title: "GPS Address",
    subtitle: "GPS to google"
  },
  {
    title: "IP Address",
    subtitle: "IP to Google"
  },
  {
    title: "GPS Coords",
    subtitle: "Show GPS Coordinates"
  },
  {
    title: "About",
    subtitle: "About this App"
  }
];

function resetParking(window)
{
  var parkingNum = 0;
  var parkingLet = "A";
  localStorage.setItem(ParkingNumberKey,parkingNum);
  localStorage.setItem(ParkingLetterKey, parkingLet);
  Vibe.vibrate('short');
  presentParkingPicker(window);
}
function incrParkingNumber(window)
{
  
  var parkingNumber = localStorage.getItem(ParkingNumberKey);
  console.log("parking number is: " + parkingNumber);
  if (!parkingNumber)
  {
    parkingNumber = 0;
  } else if (parkingNumber === parseInt(parkingNumber, 10))
  {
    parkingNumber = 0;
  } else if (parkingNumber > 999)
  {
    parkingNumber = 0;
  } else {
    parkingNumber++;
  }
  console.log("parking number now: " + parkingNumber);
  localStorage.setItem(ParkingNumberKey,parkingNumber);
  var parkingNumberUI = new UI.Text({
    position: new Vector2(75, 65),
    size: new Vector2(40, 50),
    text: parkingNumber,
    font:'Bitham-30-Black',
    color:'black',
    textOverflow:'wrap',
    textAlign:'center',
    backgroundColor:'white'
  });
  window.add(parkingNumberUI);
}

function incrParkingLetter(window)
{
  // Persist read a key's value. May be null!
   var parkingLetter = localStorage.getItem(ParkingLetterKey);
  if (!parkingLetter)
    {
      parkingLetter = "A";
    } else {
      if (parkingLetter === "A")
        {
          parkingLetter = "B";
        } else if (parkingLetter === "B")
        {
          parkingLetter = "C";
        } else if (parkingLetter === "C")
        {
          parkingLetter = "D";
        } else if (parkingLetter === "D")
        {
          parkingLetter = "E";
        } else if (parkingLetter === "E")
        {
          parkingLetter = "F";
        } else if (parkingLetter === "F")
        {
          parkingLetter = "G";
        } else if (parkingLetter === "G")
        {
          parkingLetter = "H";
        } else if (parkingLetter === "H")
        {
          parkingLetter = "I";
        } else if (parkingLetter === "I")
        {
          parkingLetter = "J";
        } else if (parkingLetter === "J")
        {
          parkingLetter = "K";
        } else if (parkingLetter === "K")
        {
          parkingLetter = "L";
        } else if (parkingLetter === "L")
        {
          parkingLetter = "M";
        } else if (parkingLetter === "M")
        {
          parkingLetter = "N";
        } else if (parkingLetter === "N")
        {
          parkingLetter = "O";
        } else if (parkingLetter === "O")
        {
          parkingLetter = "P";
        } else if (parkingLetter === "P")
        {
          parkingLetter = "Q";
        } else if (parkingLetter === "Q")
        {
          parkingLetter = "R";
        } else if (parkingLetter === "R")
        {
          parkingLetter = "S";
        } else if (parkingLetter === "S")
        {
          parkingLetter = "T";
        } else if (parkingLetter === "T")
        {
          parkingLetter = "U";
        } else if (parkingLetter === "U")
        {
          parkingLetter = "V";
        } else if (parkingLetter === "V")
        {
          parkingLetter = "W";
        } else if (parkingLetter === "W")
        {
          parkingLetter = "X";
        } else if (parkingLetter === "X")
        {
          parkingLetter = "Y";
        } else if (parkingLetter === "Y")
        {
          parkingLetter = "Z";
        } else if (parkingLetter === "Z")
        {
          parkingLetter = "A";
        } 
    }
    
    localStorage.setItem(ParkingLetterKey, parkingLetter);
  
  //  text
  var parkingLetterUI = new UI.Text({
    position: new Vector2(20, 65),
    size: new Vector2(40, 50),
    text: parkingLetter,
    font:'Bitham-30-Black',
    color:'black',
    textOverflow:'wrap',
    textAlign:'center',
    backgroundColor:'white'
  });
  window.add(parkingLetterUI);
}

// function for showing the parking selector
function presentParkingPicker(window)
{
  // Top rectangle to blank out the page
  var rect = new UI.Rect({ 
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
    backgroundColor:'white'
  });
  
  // Persist read a key's value. May be null!
   var parkingLetter = localStorage.getItem(ParkingLetterKey);
  if (!parkingLetter)
    {
      parkingLetter = "A";
    }
  // Persist read a key's value. May be null!
   var parkingNumber = localStorage.getItem(ParkingNumberKey);
  if (!parkingNumber)
    {
      parkingNumber = "1";
    }
  
  //  text
  
  var parkingDescBox = new UI.Text({
    position: new Vector2(60, 30),
    size: new Vector2(24, 25),
    text: "Parking Stall:",
    font:'Gothic-24-Black',
    color:'black',
    textOverflow:'wrap',
    textAlign:'center',
    backgroundColor:'white'
    
  });
  var parkingLetterUI = new UI.Text({
    position: new Vector2(20, 65),
    size: new Vector2(40, 50),
    text: parkingLetter,
    font:'Bitham-30-Black',
    color:'black',
    textOverflow:'wrap',
    textAlign:'center',
    backgroundColor:'white'
  });
  
  var parkingNumberUI = new UI.Text({
    position: new Vector2(75, 65),
    size: new Vector2(40, 50),
    text: parkingNumber,
    font:'Bitham-30-Black',
    color:'black',
    textOverflow:'wrap',
    textAlign:'center',
    backgroundColor:'white'
  });
  // Add the elements to the window
  //window.add(rect);
  window.add(parkingLetterUI);
  window.add(parkingNumberUI);
  
}

// function that adds general elements to the window (top bar, icon, title, and text)
function addElementsToWindow(window, titleText, text) {
  // Top rectangle
  var rect = new UI.Rect({
    position: new Vector2(0, 0),
    size: new Vector2(144, 28),
    backgroundColor:'black'
  });
  
  // icon
  var icon = new UI.Image({
    position: new Vector2(100,10),
    size: new Vector2(12,12),
    backgroundColor: 'clear',
    borderColor: 'clear',
    image: 'images/smallcar.png'
  });
  
  
  // icon

  var lockedicon = new UI.Image({
    position: new Vector2(10,10),
    size: new Vector2(20,20),
    backgroundColor: 'clear',
    borderColor: 'clear',
    image: 'images/icon_hybrid-lock.png'
  });
  var unlockedicon = new UI.Image({
    position: new Vector2(10,10),
    size: new Vector2(20,20),
    backgroundColor: 'clear',
    borderColor: 'clear',
    image: 'images/icon_hybrid-unlock.png'
  });
  
  // Title text
  var title = new UI.Text({
    position: new Vector2(0, 35),
    size: new Vector2(144, 138),
    text:titleText,
    font:'gothic-24-bold',
    color:'black',
    textOverflow:'wrap',
    textAlign:'center',
    backgroundColor:'white'
  });
  
  //  text
  var subtext = new UI.Text({
    position: new Vector2(0, 60),
    size: new Vector2(144, 108),
    text:text,
    font:'gothic-24',
    color:'black',
    textOverflow:'wrap',
    textAlign:'center',
    backgroundColor:'white'
  });
  
  // Add the elements to the window
  window.add(rect);
  window.add(title);
  window.add(subtext);
  window.add(icon);
  
  // Persist read a key's value. May be null!
   var value = localStorage.getItem(LockedKey);
      
  if (value == "locked")
  {
      window.add(lockedicon);
  } else {
      window.add(unlockedicon);
  }
  
  presentParkingPicker(window);
}

function showLocked(window) {

  // Persist read a key's value. May be null!
   var value = localStorage.getItem(LockedKey);
      
      if (value == "locked")
      {
  // icon
  var lockedicon = new UI.Image({
    position: new Vector2(10,13),
    size: new Vector2(13,13),
    backgroundColor: 'clear',
    borderColor: 'clear',
    image: 'images/locked.png'
  });
        console.log('i plan to show locked...');
        window.add(lockedicon);
        
      } else {
          var text2 = new UI.Text({
          position: new Vector2(10, 60),
          size: new Vector2(144, 108),
          text: "unlocked",
          font:'gothic-24',
          color:'black',
          textOverflow:'wrap',
          textAlign:'left',
          backgroundColor:'white'
          });
        console.log('i plan to show unlocked...');
          window.add(text2);
      }
}

var locationOptions = {
  enableHighAccuracy: true, 
  maximumAge: 100, 
  timeout: 100
};

function locationSuccess(pos) {
  console.log('lat= ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude);
}

function locationError(err) {
  console.log('location error (' + err.code + '): ' + err.message);
}

function toggleLocked(card) {
            
  var value = localStorage.getItem(LockedKey);
  if (value == "locked")
  {
    //Settings.option('locked', null);
    value = "unlocked";
    Vibe.vibrate('short');
  } else {
    //Settings.option('locked', "locked");
    value = "locked";
    Vibe.vibrate('double');
  }

  // Persist write a key with associated value
  localStorage.setItem(LockedKey, value);

  card.body("is now " + value);
  addElementsToWindow(home, "Parked: ", "");

}

Accel.init();

// Make an asynchronous request
navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);

// Create the home screen
var home = new UI.Window();
addElementsToWindow(home, 'Parked: ', '');
home.show();


// Create the Menu, supplying the list of choices
var displayMenu = new UI.Menu({
  sections: [{
    title: 'Address List',
    items: optionMenu
  }]
});

// Add a click listener for select button click
displayMenu.on('select', function(event) {
    var stitle = optionMenu[event.itemIndex].title;
    var sbody = optionMenu[event.itemIndex].subtitle;
  
    if (event.itemIndex === 2)
    {
       //Try and ask our GeoLocation and print the Lat and Long
      navigator.geolocation.getCurrentPosition(
       function(loc) {
        console.log("lat is " + loc.coords.latitude + " and long is " + loc.coords.longitude );
        
        var GURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + loc.coords.latitude + "," + loc.coords.longitude + "&key=AIzaSyD51aJRxs-vxk5QpyuSgSg7YsmFBU3aATQ";
        ajax(
          {
            url: GURL,
            type: 'json'
          },
          function(data)
          {
            console.log('got google api data for ' + GURL);
            console.log('m2:' + data.results[0].formatted_address);
            
            // Show a card with clicked item details
            var detailCard = new UI.Card({
                 title: stitle,
                 body: data.results[0].formatted_address
            });
          
            // Show the new Card
            detailCard.show();
            
          }
        );
        
        //addElementsToWindow(home, loc.coords.latitude, loc.coords.longitude);
      });
      
      
    } else if (event.itemIndex === 3) {
  
      // Try and use the reverse lookup by IP to determine Lat and Long
      var tURL = 'http://www.telize.com/geoip?callback=';
      ajax(
        {
          url: tURL,
          type: 'json'
        },
        function(data) {
          // Success!
          console.log('Successfully fetched data!');
      
          // dont need it now
          // var ip = data.ip;
          var iplat = data.latitude;
          var iplng = data.longitude;
       
          var GURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + iplat + "," + iplng + "&key=AIzaSyD51aJRxs-vxk5QpyuSgSg7YsmFBU3aATQ";
          ajax(
            {
              url: GURL,
              type: 'json'
            },
            function(data)
            {
              console.log('got google api data for ' + GURL);
              console.log('m2:' + data.results[0].formatted_address);
              
              // Show a card with clicked item details
              var detailCard = new UI.Card({
                   title: stitle,
                   body: data.results[0].formatted_address
              });
            
              // Show the new Card
              detailCard.show();
              
            }
          );
        });
    } else if (event.itemIndex === 4) {
      
       //Try and ask our GeoLocation and print the Lat and Long
      navigator.geolocation.getCurrentPosition(
       function(loc) {
        console.log("lat is " + loc.coords.latitude + " and long is " + loc.coords.longitude );
        
       
         // Show a card with clicked item details
         var detailCard = new UI.Card({
           title: stitle,
           body: loc.coords.latitude + ", " + loc.coords.longitude
         });

         // Show the new Card
         detailCard.show();

       });
    } else if (event.itemIndex === 0) {
      // parking spot
      var parkingWindow = new UI.Window();
      presentParkingPicker(parkingWindow);
      parkingWindow.show();
      
      parkingWindow.on('click', 'back', function(e) {
          //let them click back to the displayMenu...
          parkingWindow.hide();
          presentParkingPicker(home);
          displayMenu.show();
      });
      
      
      parkingWindow.on('longClick', 'select', function(e) {
        resetParking(parkingWindow);
         // parkingWindow.hide();
        //  parkingWindow.show();
      });
      
      parkingWindow.on('click', 'up', function(e) {
        incrParkingLetter(parkingWindow);
        //  parkingWindow.hide();
        //  parkingWindow.show();
      });
      parkingWindow.on('click', 'down', function(e) {
        incrParkingNumber(parkingWindow);
          //parkingWindow.hide();
          //parkingWindow.show();
      });

    } else if (event.itemIndex === 1) {
      // Locked section 
      var value = localStorage.getItem(LockedKey);
      sbody = "is now " + value;
      var lockedCard = new UI.Card({
        title: stitle,
        body: sbody
      });
      
      // Show the new Card
      lockedCard.show();
      
      // set locked
      //showLocked(lockedCard);
      
      lockedCard.on('accelTap', function(e){
  
          toggleLocked(lockedCard);
        
      });
      lockedCard.on('click', 'select', function(e){
        toggleLocked(lockedCard);
      });

    } else if (event.itemIndex === 5) {
      // About section
      var detailCard3 = new UI.Card({
        title: stitle,
        body: aBody,
        scrollable: true
      });

      // Show the new Card
      detailCard3.show();
    
      
    } else {
      // uncaught
      var detailCard2 = new UI.Card({
        title: stitle,
        body: sbody
      });

      // Show the new Card
      detailCard2.show();
    }
          
});

// Construct URL
//var URL = 'https://www.itduzzit.com/cosmon/api/overdue-invoices-with-pages.json?daysOverdue=30&token=27vum638vrn48w2&senderId=0';

//var URL = 'http://www.telize.com/geoip?callback=';
// Make the request

console.log("starting up...");

console.log('Successfully fetched data!');

// Persist read a key's value. May be null!
var value = localStorage.getItem(LockedKey);
console.log("value first fetched: " + value);

//Try and ask our GeoLocation and print the Lat and Long
/*
navigator.geolocation.getCurrentPosition(function(loc) {
  console.log("lat is " + loc.coords.latitude + " and long is " + loc.coords.longitude );

  addElementsToWindow(home, "Parked: ", "");
});
*/

home.on('accelTap', function(e) {
  console.log('Registered a tap...');
});

//add subscreens for individual invoice details
home.on('click', 'select', function(e){
  displayMenu.show();
});

displayMenu.on('click', 'back', function(e){

  console.log("heading back now...");
  presentParkingPicker(home);

  displayMenu.hide();
});
  


// Copyright (c) 2015 Intuit Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.”


var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');
var Settings = require('settings');

var locked = "unlocked";

var optionMenu= [
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
    title: "Set Parking Spot",
    subtitle: "Set displayed stall"
  },
  {
    title: "Set Locked",
    subtitle: "Did you lock it?"
  }
];


// function that adds general elements to the window (top bar, icon, title, and text)
function addElementsToWindow(window, titleText, text) {
  // Top rectangle
  var rect = new UI.Rect({
    position: new Vector2(0, 0),
    size: new Vector2(144, 26),
    backgroundColor:'black'
  });
  
  // icon
  var icon = new UI.Image({
    position: new Vector2(100,13),
    size: new Vector2(13,13),
    backgroundColor: 'clear',
    borderColor: 'clear',
    image: 'images/smallcar.png'
  });
  
  
  // icon
  var lockedicon = new UI.Image({
    position: new Vector2(10,13),
    size: new Vector2(13,13),
    backgroundColor: 'clear',
    borderColor: 'clear',
    image: 'images/locked.png'
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
   var key = 5;
  // Persist read a key's value. May be null!
   var value = localStorage.getItem(key);
      
      if (value == "locked")
      {
      window.add(lockedicon);
  }
}

function showLocked(window) {

  var key = 5;
  // Persist read a key's value. May be null!
   var value = localStorage.getItem(key);
      
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
  maximumAge: 10000, 
  timeout: 10000
};

function locationSuccess(pos) {
  console.log('lat= ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude);
}

function locationError(err) {
  console.log('location error (' + err.code + '): ' + err.message);
}

// Make an asynchronous request
navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);

// Create the home screen
var home = new UI.Window();
addElementsToWindow(home, 'Overdue Invoices', 'Loading...');
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
  
    if (event.itemIndex === 0)
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
      
      
    } else if (event.itemIndex === 1) {
  
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
    } else if (event.itemIndex === 2) {
      
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
 //   } else if (event.itemIndex === 3) {
      // parking spot
      
      

    } else if (event.itemIndex === 4) {
      
      var lockedCard = new UI.Card({
        title: stitle,
        body: sbody
      });
      
      // Show the new Card
      lockedCard.show();
      
      // set locked
      showLocked(lockedCard);
      
      
       lockedCard.on('click', 'select', function(e){
            
          if (locked == "locked")
          {
              //Settings.option('locked', null);
              locked = "unlocked";
          } else {
              //Settings.option('locked', "locked");
              locked = "locked";
          }
         
         var key = 5;
         // Persist write a key with associated value
         localStorage.setItem(key, locked);
           
         lockedCard.body("is now " + locked);
         addElementsToWindow(home, "Parking: ", "B 6");
         
         showLocked(lockedCard);
       });
      
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

//ajax(
//  {
//    url: URL,
//    type: 'json'
//  },
//  function(data) {
    // Success!
    console.log('Successfully fetched data!');
    var key = 5;
    // Persist read a key's value. May be null!
    var value = localStorage.getItem(key);
    console.log("value first fetched: " + value);
        
//    var ip = data.ip;
//    var iplat = data.latitude;
//    var iplng = data.longitude;
    
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
          }
        );
        //addElementsToWindow(home, "GPS: ", loc.coords.latitude + "," + loc.coords.longitude);
        addElementsToWindow(home, "Parking: ", "B 6");
      });
    
    
    //add subscreens for individual invoice details
    home.on('click', 'select', function(e){
//      var newScreen = new UI.Window();
      var pos = 0;
      //addElementsToWindow(newScreen, data.overdueAccounts[0].accountCustomerName, data.overdueAccounts[0].accountBalanceDue);
//      addElementsToWindow(newScreen, ip, "locbyip: " + iplat + "," + iplng);
//      newScreen.show();
      
      displayMenu.show();
 /*     
      newScreen.on('click', 'select', function(e){
        if(pos+1 < data.overdueAccounts.length){
          pos = pos+1;
          //addElementsToWindow(newScreen, data.overdueAccounts[pos].accountCustomerName, data.overdueAccounts[pos].accountBalanceDue);
          addElementsToWindow(newScreen, data.ip, data.latitude);
        }
      });
      */
//      newScreen.on('click', 'back', function(e){
      displayMenu.on('click', 'back', function(e){
        if(pos-1 >= 0) {
          pos = pos-1;
          //addElementsToWindow(newScreen, data.overdueAccounts[pos].accountCustomerName, data.overdueAccounts[pos].accountBalanceDue);
        //  addElementsToWindow(newScreen, ip, "locbyip: " + iplat + "," + iplng);
          
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
                }
              );
              //addElementsToWindow(displayMenu, loc.coords.latitude, loc.coords.longitude);
        addElementsToWindow(displayMenu, "Parking: ", "B 6");
            });
          
        } else{
          displayMenu.hide();
        }
      });
    });
  
//  },
//  function(error) {
    // Failure!
//    console.log('Failed fetching data: ' + error);
//  }
//);

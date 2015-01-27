// Copyright (c) 2015 Intuit Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.”


var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

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
    position: new Vector2(100,20),
    size: new Vector2(25,26),
    backgroundColor: 'clear',
    borderColor: 'clear',
    image: 'images/qbo_icon.png'
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
}

// Create the home screen
var home = new UI.Window();
addElementsToWindow(home, 'Overdue Invoices', 'Loading...');
home.show();

// Construct URL
var URL = 'https://www.itduzzit.com/cosmon/api/overdue-invoices-with-pages.json?daysOverdue=30&token=your_token&senderId=0';

// Make the request
ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data) {
    // Success!
    console.log('Successfully fetched data!');

    // Create text that consists of message. Position this to replace 'Loading...' text.
    var text = new UI.Text({
      position: new Vector2(10, 60),
      size: new Vector2(144, 108),
      text:data.message,
      font:'gothic-24',
      color:'black',
      textOverflow:'wrap',
      textAlign:'left',
      backgroundColor:'white'
    });
    home.add(text);
    
    //add subscreens for individual invoice details
    home.on('click', 'select', function(e){
      var newScreen = new UI.Window();
      var pos = 0;
      addElementsToWindow(newScreen, data.overdueAccounts[0].accountCustomerName, data.overdueAccounts[0].accountBalanceDue);
      newScreen.show();
      
      newScreen.on('click', 'select', function(e){
        if(pos+1 < data.overdueAccounts.length){
          pos = pos+1;
          addElementsToWindow(newScreen, data.overdueAccounts[pos].accountCustomerName, data.overdueAccounts[pos].accountBalanceDue);
        }
      });
      newScreen.on('click', 'back', function(e){
        if(pos-1 >= 0) {
          pos = pos-1;
          addElementsToWindow(newScreen, data.overdueAccounts[pos].accountCustomerName, data.overdueAccounts[pos].accountBalanceDue);
        } else{
          newScreen.hide();
        }
      });
    });
  
  },
  function(error) {
    // Failure!
    console.log('Failed fetching data: ' + error);
  }
);

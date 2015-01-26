
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

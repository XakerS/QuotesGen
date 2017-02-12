var UI = require('ui');
var ajax = require('ajax');
var vector2 = require('vector2');
var Accel = require('ui/accel');
var Vibe = require('ui/vibe');

//Show Splash Screen while data is pulled from API 

var splash = new UI.Window({});

//Splash Screen for function to clear e-paper display
var shufsplash = new UI.Window({});


//Text and formatting for splash screen
var text = new UI.Text({
  position: new vector2(0, 30),
  size: new vector2(144, 40),
  text:'Downloading data....',
  font:'GOTHIC_28_BOLD',
  color:'white',
  textOverflow:'wrap',
  textAlign:'center'
  
});

// Add to splashWindow and show
splash.add(text);
splash.show();


          // Create a Card with title and subtitle
var card = new UI.Card({
  scrollable: 'true'
  
});

// Call API with custom API URL method
//var method = '?format=json&show_permalink=0&show_source=0&literature';
var URL = 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=general';

// Make the request to pull from API
ajax(
  {
    url: URL,
    type: 'json',
    
  },
  function(data) {
    

    // WINNING
    console.log('Successfully fetched data from andruxnet-random-famous-quotes api on start! ');
    
 //Extract data to inject into card
    //var author = data.quoteAuthor;
    var quote = data.quote;
    var author= data.author;
    
   // Show to user and hide splash window
    
    splash.hide();
    card.show();
    //card.subtitle(author);
    card.body(quote);
    
      
    // Register for 'select' events
    card.on('click', 'select', function(e) {
      
      // Add to splashWindow and show
     shufsplash.show();
     shufsplash.hide();
      
      // Make request to pull more data
      ajax(
        {
          url: URL,
          type:'json'
        },
        function(data) {
          
    
           //Extract data to inject into card
           // var shufauthor = data.quoteAuthor;
            var shufquote = data.quote;
           
           // WINNING
             console.log('Successfully fetched data from andruxnet-random-famous-quotes api (pressing select button)! ');
  
          
              //Display card with data
              card.show();
              //card.subtitle(shufauthor);
              card.body(shufquote);

          // Notify the user
          Vibe.vibrate('short');
        }
      );
    });
    
 //ACCEL FUNCTION
      
    // Register for 'accel' events
    card.on('accelTap', function(e) {
      
      // Add to splashWindow and show
      shufsplash.show();
      shufsplash.hide();
      
      // Make request to pull more data
      ajax(
        {
          url: URL,
          type:'json'
        },
        function(data) {
          
    
           //Extract data to inject into card
           // var accelauthor = data.quoteAuthor;
            var accelquote = data.quote;
           
           // WINNING
             console.log('Successfully fetched data from IHeartQuotes api (on tap)! ');
            
              //Display card with data
              card.show();
             // card.subtitle(accelauthor);
              card.body(accelquote);
             

          // Notify the user
          Vibe.vibrate('short');
        }
      );
    });
 
  },
  
  function(error) {
    console.log("Download failed: " + error);
  }
);

//Call accel function to prep accelerometer to be used

Accel.init();

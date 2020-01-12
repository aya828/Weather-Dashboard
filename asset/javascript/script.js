$(document).ready(function(){
  // You don't need all these. You need a separate URL for each city, but you build it dynamically based on 
  // the search query via the data object in line 31 below.
  var austinURL = "http://api.openweathermap.org/data/2.5/forecast?id=4254010&APPID=2633dd7957343b9edb565bc3bc9be36a";
  var chicagoURL = "http://api.openweathermap.org/data/2.5/forecast?id=4887398&APPID=2633dd7957343b9edb565bc3bc9be36a";
  var nyURL = "http://api.openweathermap.org/data/2.5/forecast?id=5128638&APPID=2633dd7957343b9edb565bc3bc9be36a";
  var orlandoURL= "http://api.openweathermap.org/data/2.5/forecast?id=4167147&APPID=2633dd7957343b9edb565bc3bc9be36a";
  var sanfranURL= "http://api.openweathermap.org/data/2.5/forecast?id=5391959&APPID=2633dd7957343b9edb565bc3bc9be36a";
  var seattleURL = "http://api.openweathermap.org/data/2.5/forecast?id=5809844&APPID=2633dd7957343b9edb565bc3bc9be36a";
  var denverURL = "http://api.openweathermap.org/data/2.5/forecast?id=4853799&APPID=2633dd7957343b9edb565bc3bc9be36a";
  var atlantaURL = "http://api.openweathermap.org/data/2.5/forecast?id=4671576&APPID=2633dd7957343b9edb565bc3bc9be36a";

  var apiKey = "2633dd7957343b9edb565bc3bc9be36a";
  var weatherURL = "http://api.openweathermap.org/data/2.5/forecast";
  var UVIndexURL = "http://api.openweathermap.org/data/2.5/uvi/forecast";

  var searchBtn = $("#searchBtn");
  var input = $("#search");
  var value = input.val();

  // Variables for today's weather
  var title = $("#cityTitle");
  var temp = $("#temp")
  var humidity = $("#humidity")
  var wind = $("#wind");

  // Variables for 5-Day forecast
  var firstTemp = $("#1Temp");
  var firstHumidity = $("#1Humidity");
  var secondTemp = $("#2Temp");
  var secondHumidity = $("#2Humidity");
  var thirdTemp = $("#3Temp");
  var thirdHumidity = $("#3Humidity");
  var fourthTemp = $("#4Temp");
  var fourthHumidity = $("#4Humidity");
  var fifthTemp = $("#5Temp");
  var fifthHumidity = $("#5Humidity");
  var firstDate = $("#1date");
  var secondDate = $("#2date");
  var thirdDate = $("#3date");
  var fourthDate = $("#4date");
  var fifthDate = $("#5date");

  searchBtn.on("click", function() {
    value = $("#search").val().toLowerCase();
      $.ajax( {
        url: weatherURL, 
        method: "GET",
        data: {    
          q: value,
          APPID: apiKey,
          units: "imperial"
        }
      }).then(function(response) {
        title.text(response.city.name + " (" + moment().format("MMM Do YYYY") + ")");
        var iconImg = "http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png";
          $("#todaysIcon").attr('src', iconImg);
        wind.text("Wind Speed: " + response.list[0].wind.speed + " MPH");
        temp.text("Temperature: " + parseInt(response.list[0].main.temp) + String.fromCharCode(176));
        humidity.text("Humidity: " + response.list[0].main.humidity + "%");

        // First day of forecast
        firstDate.text(moment().add(1, 'days').format('MMM Do'));
        var iconImgOne = "http://openweathermap.org/img/w/" + response.list[6].weather[0].icon + ".png";
          $("#1img").attr('src', iconImgOne);
        firstTemp.text("Temp: " + parseInt(response.list[6].main.temp_max) + String.fromCharCode(176))
        firstHumidity.text("Humidity: " + response.list[6].main.humidity);

        // Second day of forecast
        secondDate.text(moment().add(2, 'days').format('MMM Do'));
        var iconImgTwo = "http://openweathermap.org/img/w/" + response.list[13].weather[0].icon + ".png";
          $("#2img").attr('src', iconImgTwo);
        secondTemp.text("Temp: " + parseInt(response.list[13].main.temp_max) + String.fromCharCode(176))
        secondHumidity.text("Humidity: " + response.list[13].main.humidity);

        // Third day of forecast
        thirdDate.text(moment().add(3, 'days').format('MMM Do'));
        var iconImgThree = "http://openweathermap.org/img/w/" + response.list[21].weather[0].icon + ".png";
          $("#3img").attr('src', iconImgThree);
        thirdTemp.text("Temp: " + parseInt(response.list[21].main.temp_max) + String.fromCharCode(176))
        thirdHumidity.text("Humidity: " + response.list[21].main.humidity);

        // Fourth day of forecast
        fourthDate.text(moment().add(4, 'days').format('MMM Do'));
        var iconImgFour = "http://openweathermap.org/img/w/" + response.list[29].weather[0].icon + ".png";
          $("#4img").attr('src', iconImgFour);
        fourthTemp.text("Temp: " + parseInt(response.list[29].main.temp_max) + String.fromCharCode(176))
        fourthHumidity.text("Humidity: " + response.list[29].main.humidity);

        // Fifth day of forecast
        fifthDate.text(moment().add(5, 'days').format('MMM Do'));
        var iconImgFive = "http://openweathermap.org/img/w/" + response.list[37].weather[0].icon + ".png";
          $("#5img").attr('src', iconImgFive);
        fifthTemp.text("Temp: " + parseInt(response.list[37].main.temp_max) + String.fromCharCode(176))
        fifthHumidity.text("Humidity: " + response.list[37].main.humidity);
      });
    });
  })
$(document).ready(function(){

  var apiKey = "2633dd7957343b9edb565bc3bc9be36a";
  var weatherURL = "http://api.openweathermap.org/data/2.5/forecast";
  var UVIndexURL = "http://api.openweathermap.org/data/2.5/uvi/forecast";

  var searchBtn = $("#searchBtn");
  var input = $("#search");
  var value;

  // Variables for today's weather
  var title = $("#cityTitle");
  var temp = $("#temp")
  var humidity = $("#humidity")
  var wind = $("#wind");
  

  

  // Variables for 5-Day forecast temperature and humidity
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

  var searchedCities = [];

  function init() {
    // If there is nothing in local storage 
    if(localStorage.length < 1) {
      // setup an empty array
      searchedCities = [];
    } else {
      // Otherwise pull that data out of localstorage
      searchedCities = JSON.parse(localStorage.getItem('cities'));
    }
    console.log(`Cities: ${searchedCities}`);
    // We have our data, Let's populate the buttons
    addingButton();
  }
  // saveData();
  // ADD FUNCTION FOR ADDING BUTTONS WHEN SEARCH IS DONE. STORE HISTORY DATA IN LOCAL STORAGE FOR BUTTONS TO PULL DATA
  function saveData(data) {
    // var searchedCities = [];
    // console.log(input);
    searchedCities.push(data);
    localStorage.setItem('cities', JSON.stringify(searchedCities));
    // var item = JSON.parse(localStorage.getItem(input.val()));
    console.log(localStorage);
    
    addingButton();
    init();
  }

  function addingButton() {
    $('.list-group').empty();
    // item is an array of values from the 'cities' KEY
    console.log(`Array is : ${searchedCities}`);
    // var item = JSON.parse(localStorage.getItem('cities'));
    for(let i = 0; i < searchedCities.length; i++) {
      var newBtn = $("<button>").text(searchedCities[i]).val(searchedCities[i]);
      newBtn.on("click", function() {
        console.log('Click');
        let city = $(this).val();
        console.log(city);
        citySearch(city);
      });
      newBtn.appendTo(".list-group");
    }

  searchBtn.on("click", function() {
    // console.log("click");

    value = $("#search").val().toLowerCase();
    console.log(`value is ${value}`);
    saveData(value);
    citySearch(value);
    $("#search").val("");
    addingButton();
  })

    function citySearch(value) {
      $.ajax( {
        url: weatherURL, 
        method: "GET",
        data: {    
          q: value,
          APPID: apiKey,
          units: "imperial"
        }
      }).then(function(response) {
        console.log(response);
        title.text(response.city.name + " (" + moment().format("MMM Do YYYY") + ")");
        var iconImg = "http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png";
          $("#todaysIcon").attr('src', iconImg);
        wind.text("Wind Speed: " + response.list[0].wind.speed + " MPH");
        temp.text("Temperature: " + parseInt(response.list[0].main.temp) + String.fromCharCode(176));
        humidity.text("Humidity: " + response.list[0].main.humidity + "%");

        // First day of forecast
        firstDate.text(moment().add(1, 'days').format('dddd, MMM Do'));
        var iconImgOne = "http://openweathermap.org/img/w/" + response.list[6].weather[0].icon + ".png";
          $("#1img").attr('src', iconImgOne);
        firstTemp.text("Temp: " + parseInt(response.list[6].main.temp_max) + String.fromCharCode(176))
        firstHumidity.text("Humidity: " + response.list[6].main.humidity + "%");

        // Second day of forecast
        secondDate.text(moment().add(2, 'days').format('dddd, MMM Do'));
        var iconImgTwo = "http://openweathermap.org/img/w/" + response.list[13].weather[0].icon + ".png";
          $("#2img").attr('src', iconImgTwo);
        secondTemp.text("Temp: " + parseInt(response.list[13].main.temp_max) + String.fromCharCode(176))
        secondHumidity.text("Humidity: " + response.list[13].main.humidity + "%");

        // Third day of forecast
        thirdDate.text(moment().add(3, 'days').format('dddd, MMM Do'));
        var iconImgThree = "http://openweathermap.org/img/w/" + response.list[21].weather[0].icon + ".png";
          $("#3img").attr('src', iconImgThree);
        thirdTemp.text("Temp: " + parseInt(response.list[21].main.temp_max) + String.fromCharCode(176))
        thirdHumidity.text("Humidity: " + response.list[21].main.humidity + "%");

        // Fourth day of forecast
        fourthDate.text(moment().add(4, 'days').format('dddd, MMM Do'));
        var iconImgFour = "http://openweathermap.org/img/w/" + response.list[29].weather[0].icon + ".png";
          $("#4img").attr('src', iconImgFour);
        fourthTemp.text("Temp: " + parseInt(response.list[29].main.temp_max) + String.fromCharCode(176))
        fourthHumidity.text("Humidity: " + response.list[29].main.humidity + "%");

        // Fifth day of forecast
        fifthDate.text(moment().add(5, 'days').format('dddd, MMM Do'));
        var iconImgFive = "http://openweathermap.org/img/w/" + response.list[37].weather[0].icon + ".png";
          $("#5img").attr('src', iconImgFive);
        fifthTemp.text("Temp: " + parseInt(response.list[37].main.temp_max) + String.fromCharCode(176))
        fifthHumidity.text("Humidity: " + response.list[37].main.humidity + "%");

        // UV Index ajax
        $.ajax( {
          url: UVIndexURL,
          method: "GET",
          data: {    
            q: value,
            APPID: apiKey,
            units: "imperial",
            lat: response.city.coord.lat,
            lon: response.city.coord.lon
          }
        }).then(function(resp) {
          console.log(resp)
          $("#uvText").text(resp[0].value);
        })
      });
    };
  }
})
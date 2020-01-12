$(document).ready(function(){

var austinURL = "http://api.openweathermap.org/data/2.5/forecast?id=4254010&APPID=2633dd7957343b9edb565bc3bc9be36a";
var chicagoURL = "http://api.openweathermap.org/data/2.5/forecast?id=4887398&APPID=2633dd7957343b9edb565bc3bc9be36a";
var nyURL = "http://api.openweathermap.org/data/2.5/forecast?id=5128638&APPID=2633dd7957343b9edb565bc3bc9be36a";
var orlandoURL= "http://api.openweathermap.org/data/2.5/forecast?id=4167147&APPID=2633dd7957343b9edb565bc3bc9be36a";
var sanfranURL= "http://api.openweathermap.org/data/2.5/forecast?id=5391959&APPID=2633dd7957343b9edb565bc3bc9be36a";
var seattleURL = "http://api.openweathermap.org/data/2.5/forecast?id=5809844&APPID=2633dd7957343b9edb565bc3bc9be36a";
var denverURL = "http://api.openweathermap.org/data/2.5/forecast?id=4853799&APPID=2633dd7957343b9edb565bc3bc9be36a";
var atlantaURL = "http://api.openweathermap.org/data/2.5/forecast?id=4671576&APPID=2633dd7957343b9edb565bc3bc9be36a";
var apiKey = "2633dd7957343b9edb565bc3bc9be36a";

var weatherURL = "http://api.openweathermap.org/data/2.5/weather?" + value + "&APPID=2633dd7957343b9edb565bc3bc9be36a";

var searchBtn = $("#searchBtn");
var input = $("#search");
var value = input.val();

searchBtn.on("click", function() {
  input.on("keyup", function() {
    value = $("#search").val().toLowerCase();
  })
    $.ajax( {
      url: weatherURL,
      method: "GET",
      data: {
        q: value,
        api_key: apiKey
      }
    }).then(function(response) {
      var title = $("#title");
      var wind = $("#wind");
      console.log(response);
      title.text(response.name);
      wind.text(response.wind.speed);
    });
    
  });
})

$(document).ready(function() {
  $("#weatherSubmit").click(function(e) {
    e.preventDefault();
    var value = $("#weatherInput").val();
    console.log(value);
    var myurl= "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=fff85c855b3f2cf85fd53f5ed2859d92";
	   $.ajax({
	    url : myurl,
	    dataType : "json",
	    success : function(json) {
        var results = "";
  		results += '<h2>Weather in ' + json.name + "</h2>";
  		for (var i=0; i<json.weather.length; i++) {
  		    results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
  		}
  		results += '<h2>' + json.main.temp + " &deg;F</h2>"
  		results += "<p>"
  		for (var i=0; i<json.weather.length; i++) {
  		    results += json.weather[i].description
  		    if (i !== json.weather.length - 1)
  			results += ", "
  		}
      results += '<h3> High of: ' + json.main.temp_max + '</h3>'
      results += '<h3> Low of: ' + json.main.temp_min + '</h3>'
      results += '<h3> Humidity: ' + json.main.humidity + '% </h3>'
  		results += "</p>";
  		$("#weatherResults").html(results);
      console.log(json);
      //console.log("HIIIi")
	    }
	});
  });


  $("#bingSearchSubmit").click(function(e) {
    e.preventDefault();
    var value = $("#bingSearchInput").val();
    var params = {

    // Request parameters
   "q": value,
   "count": "100000",
   "offset": "1000",
    //"mkt": "en-us",
   //"safesearch": "Moderate",
    	    //"freshness":"Week",
            };
    console.log(value);
    var myurl = "https://api.cognitive.microsoft.com/bing/v7.0/search?q=" + $.param(params);
    $.ajax({
           url : myurl,
           beforeSend: function(xhrObj){
               // Request headers
               xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","1163f751ae98448e8e741f85ab91a87d");
           },
           type: "GET",
           success : function(data) {
             var results = '';
             console.log(data);
             len = data.webPages.value.length;
             for(i = len-2; i >=0; i-- ){
               results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + "</br>" + data.webPages.value[i].snippet + "</p>";
             }
             $('#bingResults').html(results);
           }
           // Request body
           //data: "",
       })
       .done(function(data) {
          //alert("done!");

        })
        .fail(function() {
            alert("error");
        });
  });
});

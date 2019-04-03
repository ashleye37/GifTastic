$(document).ready(function() {
    var shows = [
        "Brooklyn Nine Nine",
        "Always Sunny in Philadelphia",
        "Friends",
        "Scrubs",
        "The Office",
        "Game of Thrones",
        "Grey's Anatomy",
        "Saved By the Bell",
        "The Walking Dead",
        "Suits",
        "Stranger Things",
        "The Blacklist",
        "Black Mirror",
        "Arrested Development",
        "Parks and Recreation",
        "How I Met Your Mother",
        "Mad Men",
        "South Park",
        "Family Guy",
        "Breaking Bad"
    ]

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + shows + "&rating=pg&api_key=43ogN6W2McOGJpdI4VTX8G2IRbOe1T68&limit=10"

    function callAjax(arg) {
        var gifQuery = "https://api.giphy.com/v1/gifs/search?q=" + arg + "&api_key=43ogN6W2McOGJpdI4VTX8G2IRbOe1T68&limit=10"
        console.log(arg);
        $.ajax({
            url: gifQuery,
            method: "GET"
          }).then(function(response) {
              console.log(response);
            for (var j = 0; j < response.data.length; j++) {
                console.log("Hello!");
                var gifContainer = $("<div>");
                gifContainer.addClass("gifContainer");
                var generateGifs = $("<img>");
                generateGifs.addClass("gif");
                generateGifs.attr("data-state" , "still");
                generateGifs.attr("src", response.data[j].images.fixed_height_small_still.url);
                generateGifs.attr("data-animate", response.data[j].images.fixed_height_small.url);
                generateGifs.attr("data-still", response.data[j].images.fixed_height_small_still.url);
                var rating = $("<div>");
                rating.addClass("gifRating");
                rating.text("Rating: " + response.data[j].rating);
                $(".gifContainer").append(rating);
                $(".gifContainer").append(generateGifs);
                $(".listedGifs").append(gifContainer);
            }
            
        });
    }
    

    //Function that will dynamically create buttons with the array of shows populated in said buttons.

    function createTVButtons() {
        $("#preloadedGifs").empty();
        for (var i = 0; i <shows.length; i++) {
            var currentShows = $("<button>");
            currentShows.addClass("btn btn-info");
            currentShows.attr("src", shows[i]);
            currentShows.text(shows[i]); 
            $("#preloadedGifs").append(currentShows);
        };  
    };
    
    createTVButtons();

    $("#preloadedGifs").on("click" , function(event) {
        $(".listedGifs").empty();
        var clickedShow = $(this).text();
        callAjax(event.target.innerHTML);
        
    });

    $("body").on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

    //Event handler that will add a new show to the show array and populate it as a new button for the user to click.

    $("#submitButton").on("click", function(event) {
        event.preventDefault();
        var addShow = $("#show-input").val().trim();
        shows.push(addShow);
        createTVButtons();
    });

  
});
// Side Nav Bar - Initialize collapse button
$(".button-collapse").sideNav();

$(document).ready(function() {
    $('.parallax').parallax();
    $('select').material_select();
});

// index java
var pet;
var num = 0;
var searchTerm = $("#puppers").attr("value");
var pfApiKey = "9da4a66757d1c617a44a579e1b05eabd";
var queryURL = "http://api.petfinder.com/pet.find?format=json&key=9da4a66757d1c617a44a579e1b05eabd&callback?&output=basic";
var zipcode = $("#zipcode").val()
$(document).on('click', '#download-button', function(event) {

    event.preventDefault();
    sessionStorage.setItem("searchTerm", $("#petDropdown").val())
    sessionStorage.setItem("zipcode", $("#zipcode").val())
    searchAnimal()

});


var map;
var service;
var infowindow;

function initMap() {
    var irvine = new google.maps.LatLng(33.686502, -117.8434294);

    map = new google.maps.Map(document.getElementById('map'), {
        center: irvine,
        zoom: 10
    });

    var request = {
        location: irvine,
        radius: '500',
        type: ['places']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        var marker = new google.maps.Marker({
            map: map,
            place: {
                placeId: results[0].place_id,
                location: results[0].geometry.location
            },
            title: 'Hello'
        });
    }
};


function searchAnimal() {



    var searchTerm = sessionStorage.getItem("searchTerm");
    var pfApiKey = "9da4a66757d1c617a44a579e1b05eabd";
    var queryURL = "http://api.petfinder.com/pet.find?format=json&key=9da4a66757d1c617a44a579e1b05eabd&callback?&output=basic";
    var zipcode = sessionStorage.getItem("zipcode")

    $.ajax({
        url: queryURL,
        method: "GET",
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            //key: pfApiKey,
            animal: searchTerm,
            location: zipcode,
            //   output: 'basic',
            format: 'json',
            count: '10'
        }
    }).then(function(response) {
        pet = response.petfinder.pets.pet;
        var animal_name = pet[num].name.$t;
        var animal_sex = pet[num].sex.$t;
        var animal_age = pet[num].age.$t;
        var animal_id = pet[num].id.$t;
        var animal_photo = pet[num].media.photos.photo[3].$t;
        var animal_description = pet[num].description.$t
        var con_phoneNum = pet[num].contact.phone.$t;
        var con_email = pet[num].contact.email.$t;
        $("#pet-choose").empty();
        $("#button-row").empty();
        var petPicture = $("<div class='col s6'><div class='card'><div class='card-image'><img src=" + animal_photo + "><span class='card-title' id='animal-name'>" + animal_name + "</span></div><div class='card-content'><p id= 'text'>Name: " + animal_name + "<br>Sex: " + animal_sex + "<br>Age: " + animal_age + "<br>ID: " + animal_id + "</p></div><div class='card-action'><a href='https://www.petfinder.com'>Adopt this one</a></div></div></div>")
        var map = $("<div class='col s6' id='map'></div>")
        $("#pet-choose").append(petPicture)
        $("#pet-choose").append(map)
        initMap();
        var moreInfo = $("<div class='row' id='more-info'><div class='col s12'><p id='text'style='color: blue'>Description: " + animal_description + "<br>Phone: " + con_phoneNum + "<br>Email: " + con_email + "</p></div></div>")
        $("#pet-choose").after(moreInfo)
        $("#more-info").hide();
        $("#button-row").append("<a href = '#'id = 'info-button'class = 'btn-large waves-effect waves-light orange'>More Info</a>");
        $("#button-row").append("<a href = '#'id = 'next-button'class = 'btn-large waves-effect waves-light orange'>Next Pet</a>")
    }).catch(function(err) {
        console.log(err)

    })
    num++
}
$(document).on('click', '#next-button', function() {
    if (num <= 10) {
        $("#more-info").empty()
        searchAnimal()
    } else {
        num = 0;
        $("#more-info").empty()
        searchAnimal();
    }

})
$(document).on('click', '#info-button', function() {
    $("#more-info").toggle();
});

$(document).ready(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBgk9gIgJdoUNUBNVtMmjcTpyjrVaXcR8A",
        authDomain: "pick-a-pet.firebaseapp.com",
        databaseURL: "https://pick-a-pet.firebaseio.com",
        projectId: "pick-a-pet",
        storageBucket: "",
        messagingSenderId: "1099432899618"
    };
    firebase.initializeApp(config);
    var userId = 0;
    $('.parallax').parallax();
    // Side Nav Bar - Initialize collapse button
    $(".button-collapse").sideNav();
    var database = firebase.database();
    $(document).on('click', '#send-button', function() {
        userId++
        database.ref('contact/' + userId).set({
            FirstName: $("#first_name").val().trim(),
            LastName: $("#last_name").val().trim(),
            Email: $("#email").val().trim(),
            Message: $("#textarea1").val().trim()
        })
        $("#first_name").val('');
        $("#last_name").val('');
        $("#email").val('');
        $("#textarea1").val('');
    });
});
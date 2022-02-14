$(document).ready(function () {
    // Creates amenity object and string
    let amenObj = {};
    let amenStr = '';
    // Binds a click event to input
    $('input:checkbox').change(function () {
	if ($(this).is(:'checked')) {
	    let id = $(this).attr('data-id');
	    let name = $(this).attr('data-name');
	    amenObj[id] = name;
	} else {
	    let id = $(this).attr('data-id');
	    delete amenObj[id];
	}
	amenStr = '';
	for (let key in amenObj) {
	    amenStr = amenStr.concat(amenObj[key], ', ');
	}
	$('.amenities h4').text(amenStr.substring(0, amenStr.length - 2));
    });
    // check if status is OK for API
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
	if (textStatus === 'success') {
	    if (data.status == 'OK') {
		$('DIV#api_status').addClass('available');
	    } else {
		$('DIV#api_status').removeClass('available');
	    }
	}
    });

    // Post places dynamically for index page

    $.ajax({
	type: 'POST',
	url: 'http://0.0.0.0:5001/api/v1/places_search/',
	data: '{}',
	contentType: 'application/json; charset=utf-8',
	dataType: 'JSON',
	success: (function (data) {
	    for (let i = 0; i < data.length; i++) {
		let place = data[i];
		$('.places').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '/p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
	    }
	}

	});

	   // Post Places on index page
        ajaxCall('http://0.0.0.0:5001/api/v1/places_search/');

	   // Post places _ amenities
	   $('button').on('click', function () {
	       ajaxCall('http://0.0.0.0:5001/api/v1/places_search/', {'amenities': amenObj}});
	 });
});

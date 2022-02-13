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
});

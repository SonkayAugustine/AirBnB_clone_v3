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
});

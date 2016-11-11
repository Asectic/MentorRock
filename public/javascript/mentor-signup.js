"use strict";

$(function () {
    $('#interest-field').hide();
    $('#academic-field').hide();

    $('#academic-button').click(function () {
        $('#academic-field').show();
        $('#interest-field').hide();
        $('#academic-button').hide();
        $('#interest-button').hide();
    });

    $('#interest-button').click(function () {
        $('#interest-field').show();
        $('#academic-field').hide();
        $('#academic-button').hide();
        $('#interest-button').hide();
    });

});

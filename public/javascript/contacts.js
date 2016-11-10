"use strict";

$(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 8,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 3
            },
            720: {
                items: 5
            },
            1080: {
                items: 5
            }
        }
    })
});

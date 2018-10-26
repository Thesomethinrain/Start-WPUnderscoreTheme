
jQuery(window).on('load', function () {
    var $ = jQuery;
    // Initiate Masonry
    var $container = $('#main');
    $container.imagesLoaded(function () {
        $container.masonry({
            itemSelector: '.hentry',
            columnWidth: '.post',
            gutter: 10
        });
    });
     infinite_count = 0;
     // Triggers re-layout on infinite scroll
     $( document.body ).on( 'post-load', function () {



                /* 1
                    infinite_count = infinite_count + 1;
                    var $selector = $('#infinite-view-' + infinite_count);
                    var $elements = $selector.find('.hentry');
                    $elements.hide();
                    $container.masonry( 'reload' );
                    $elements.fadeIn();
                */

                /* 2 */

                var $newItems = $('.infinite-wrap').not('.is--replaced');
                var $elements = $newItems.find('.hentry');
                $elements.hide();
                $('#main').append($elements);
                $elements.imagesLoaded( function() {
                    console.log( 'reloaded' );
                    $('#main').masonry( "appended", $elements, true ).masonry( "reloadItems" ).masonry( "layout" );
                    $elements.fadeIn();
                });

     });


});
jQuery( document ).ready( function( $ ) {
});
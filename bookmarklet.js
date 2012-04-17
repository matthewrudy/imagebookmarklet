/*PageImages - Bookmarklet*/
/*Based on Pinterest's bookmarklet*/

/*Todo: Add functions, show total number of images, filter between background and foreground, allow user to set max and min size. resize thumbnails. lightbox image. download all. */

var ImageBookmarklet = {
  init: function(undefined){
    var $ = jQuery;

    $('html, body').animate({scrollTop:0}, 'fast');

      /* Check whether Bookmarklet is already visible */
    if($('#image-grabber-container').length == 0) {

      var numberOfImages = 0;

      /*Add css - Must change this if you want to use your own CSS*/
      $('<style type="text/css">@import url("http://dl.dropbox.com/u/5045906/imagesbookmarklet/style.css");</style>').appendTo("head");

      /*Add toggle*/
      $('body').append('<div id="background-blocker"></div><div id="image-grabber-container"><div id="button-toggle"><span id="close">Close</span><span id="count"></span></div><ul id="list-of-images"></ul></div>');


      /*Make toggle work*/
      $("#button-toggle").click(function() {
        $("#image-grabber-container, #background-blocker").remove();
      });

      /*Find images and add to list*/
      $('img').each(function() {
        addImage($(this));
      });

      /*Find background images and add to list*/
      $('*:visible').each(function() {
        var $this = $(this);

        if ($this.css('background-image') !== "none") {
          addImage($this);
        }
      });

      $('#count').text(numberOfImages+" images found.");
    }

    function addImage( imageToAdd ) {
      var imageURL = imageToAdd.attr('src');

      if (imageURL === undefined) {
        imageURL = imageToAdd.css('background-image').slice(4,-1);
      }

      var imageWidth = imageToAdd.width();
      var imageHeight = imageToAdd.height();
      var containData = imageURL.indexOf('data:');

      /*Check whether image big enough*/
      if(imageWidth > 150 && imageHeight > 200 && containData === -1) {

        var calculatedMargin;

        /*Calculate margin to vertically center*/
        if (imageWidth > imageHeight) {
          calculatedMargin = (200 - (200 * (imageHeight / imageWidth))) * 0.5;
        } else {
          calculatedMargin = 0;
        }

        var item = $("<li></li>").append(
          $("<a></a>").attr("href", imageURL).append(
            $("<img />").attr("src", imageURL).css("margin-top", calculatedMargin+"px"),
            $("<span></span>").text(imageWidth+" x "+imageHeight)
          )
        );

        $('#list-of-images').append(item);
        numberOfImages ++;
      }
    }
  }
}

if(window.jQuery) {
  ImageBookmarklet.init();
} else {
  var protocol = (("https:" == document.location.protocol) ? "https:" : "http:");
  var src = protocol+"//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js";

  var tag = document.createElement('script');
      tag.setAttribute('type','text/javascript');
      tag.setAttribute('charset','UTF-8');
      tag.setAttribute('src', src);

  tag.onload=function(){
    // avoid breaking other projects using $
    jQuery.noConflict();
    ImageBookmarklet.init();
  };
  document.body.appendChild(tag);
}
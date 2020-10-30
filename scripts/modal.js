$(document).ready(function () {
  // MODAL
  var modalText = {
    highlight: {
      title: 'Highlight Wire',
      tag: 'A website for finding and watching new sports highlights',
      detail:
        'Highlight Wire is a website that allows you to find, watch, download and share new sports video highlights. The website is automatically updated with new highlights from the MLB, NBA and NHL. The website was made using Quasar, Vue, JS, HTML and Stylus with a Firebase database. The data is polled from a REST server created with Python and Flask. The REST server utilizes the MLB, NBA and NHL APIs to congregate data including video and thumbnail links, video titles, video descriptions and the dates and times they occurred.',
      link: 'https://highlightwire.com/'
    },
    music: {
      title: 'Music Mailbox',
      tag: 'A program that notifies you of new songs from artists you enjoy listening to',
      detail:
        'Music Mailbox is a Python program that returns new songs from artists you have saved in your Spotify library using the Spotify API. I am currently working on a front-end for users to interact with and to display data.',
    },
    checkers: {
      title: 'Friendly Checkers',
      tag: 'A website that allows two Checkers agents to compete against each other',
      detail:
        "I created a Checkers agent for my Artificial Intelligence course using a Minimax Search, Alpha-Beta Pruning and an Evaluation Function. Then, for extra credit, I created a website using the Quasar framework and a REST API using python and Flask. The website let's two agents compete against each other and shows a visual for each move.",
      link: 'https://friendlycheckers.com'
    },
    breakdown: {
      title: 'Breakdownify',
      tag: "A website for sorting and viewing Jomboy Media's sports breakdowns",
      detail:
        'Breakdownify is a website for the YouTuber Jomboy Media that sorts their videos by various statistics. The website was created using Bootstrap, HTML, JS, and CSS.',
      link: 'https://breakdownify.club'
    },
    joust: {
      title: 'Jousting Jamboree',
      tag: 'A 3D jousting game created using Unity',
      detail:
        'Worked in a group of 4 to create a 3D jousting game with various mounts and weapons that provide different stats and abilities. The first to knock the other player off their mount 5 times wins the game. When a player is hit, the camera switches to a split-screen so that it is easy to see which player hits the ground first. More items can be unlocked by completing various challenges.'
    },
    sliding: {
      title: 'Sliding Tile Puzzle AI',
      tag: 'An agent that solves sliding tile puzzles',
      detail:
        'Using python, I created a graph search function that conducts a breadth-first, depth-first and A* search to solve the puzzle. Then, I ran an analysis on the accuracy and time elapsed for each type of search.',
    },
    mailbox: {
      title: 'Mailbox Toluca Lake Shopify Site',
      tag: "A Shopify website for Mailbox Toluca Lake's vocal remedies",
      detail:
        "I created a Shopify website for Mailbox Toluca Lake's Vocal Remedy business for singers, actors and radio hosts. I took photos of their products, photoshopped the backgrounds out and listed over 100 products.",
      link: 'https://mailboxtolucalake.com'
    },
    robo: {
      title: 'Robo Restaurant',
      tag: 'A 2D Tower Defense Game using Unity',
      detail:
        'Robo Restaurant is a 13-level 2D Tower Defense Game I created using Unity and C# for my Game Programming class. I created all of the graphics in Adobe Illustrator. '
    },
    pacman: {
      title: 'Pacman Reflex Agent',
      tag: 'A basic reflex agent for Pacman that runs away from ghosts',
      detail:
        'A Pacman agent created for my Artificial Intelligence class that tries to collect all of the coins. If it is in danger, meaning that a ghost is nearby or in the same row or column, then it moves in the opposite direction.'
    },
  };

  $('#gallery .button').on('click', function () {
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function () {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function () {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $('#next').click(function () {
    shiftSlide(-1);
  });
  $('#prev').click(function () {
    shiftSlide(1);
  });

  carousel.on('mousedown', function () {
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function () {
      dragEnd = event.pageX;
      $(this).css('transform', 'translateX(' + dragPos() + 'px)');
    });
    $(document).on('mouseup', function () {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup');
    carousel
      .off('mousemove')
      .addClass('transition')
      .css('transform', 'translateX(' + direction * slideWidth + 'px)');
    setTimeout(function () {
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition');
      carousel.css('transform', 'translateX(0px)');
    }, 700);
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link)
      $('#modal .button')
        .addClass('visible')
        .parent()
        .attr('href', modalText[id].link);

    $.each($('#modal li'), function (index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function (index, value) {
      $(this).css({
        background:
          "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });
    });
  }
});

$(window).on('load', function() {
  // BEGIN

  // SELECTORS

  var wh = window.innerHeight,
  $appScreen = $('.appscreen'),
  $innerS1 = $('.innerS1')
  $innerS2 = $('.innerS2')
  $innerS3 = $('.innerS3')
  $innerS4 = $('.innerS4')
  $innerS5 = $('.innerS5')
  console.log($innerS5)
  $appImg = $('.appImg'),
  $appImg2 = $('.appImg2'),
  $appImg3 = $('.appImg3'),
  $appImg4 = $('.appImg4'),
  $screenA = $('.screenA'),
  $screenB = $('.screenB'),
  $screenC = $('.screenC'),
  $highliter1 = $('.highliter1'),
  $highliter = $('.highliter')


  // CONTROLLER
  // init
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 'onLeave'
    }
  })

  // Create scene
  // This pins the sections in place for a duration of 200
  $('section').each(function() {

    new ScrollMagic.Scene({
      triggerElement: this,
      duration: 200,
      triggerHook: 200
    })
    .setPin(this)
    // .addIndicators()
    .addTo(controller)
  });

  // This controls the things that show certain interactions

  // var showHighliter = new TimelineMax();
  // showHighliter
  // .to($highliter1, 1, {
  //   autoAlpha: 1
  // })

  // new ScrollMagic.Scene({
  //   triggerElement: $innerS3,
  //   duration: '40%',
  // })
  // .setTween(showHighliter)
  // .addTo(controller)




  // appScreen intro animation Timeline
  var appScreenIntroTl = new TimelineMax();
  appScreenIntroTl
    // .from($appScreen, 1, {yPercent: 50,xPercent: 100,ease: Power4.easeInOut})
    .fromTo($appScreen, 0.85, {
      yPercent: -100,
      scale: 0.1,
      autoAlpha: 0
    }, {
      yPercent: 0,
      scale: 1,
      autoAlpha: 1,
      ease: Power4.easeInOut
    })
    .to($innerS1, 0.5, {opacity: 0,yPercent: -5,scale: 0.98}, '0');

  new ScrollMagic.Scene({
    duration: '30%'
  })
  .setTween(appScreenIntroTl)
  .triggerElement($('body')[0])
  .addTo(controller);

  var appScreenContentAppImg = new TimelineMax();
  appScreenContentAppImg
    .fromTo(
      $appImg2, 2, {
        yPercent: 20,
        autoAlpha: 0,
        scale: 0.5
      }, {
        yPercent: 0,
        autoAlpha: 1,
        scale: .8,
        ease: Power4.easeOut
      }, '0')
    .from(
      $innerS2, 1, {
        autoAlpha: 0
      },'-=.3')

    new ScrollMagic.Scene({
      offset: wh*0.6,
      triggerElement: $('body')[0],
      duration: '80%'
    })
    .setTween(appScreenContentAppImg)
    .addTo(controller);

    var appScreenContent1T1 = new TimelineMax();
    appScreenContent1T1
      .to(
        $appImg2, 0.5, {
          yPercent: -30,
          autoAlpha: 0,
          ease:Power4.easeInOut
        })
      .fromTo(
        $appImg3, 1, {
          yPercent:20,
          autoAlpha: 0,
          scale: 0.5
        }, {
          yPercent: 0,
          autoAlpha: 1,
          scale: 0.8,
          ease: Power4.easeInOut
        })
      .from(
        $innerS3, 1, {
          autoAlpha: 0
        }, '-=0.7');

    new ScrollMagic.Scene({
      triggerElement: $('.innerS2 h2')[0],
      duration: '50%'
    })
    .setTween(appScreenContent1T1)
    .addTo(controller);

    var appScreenContent2T1 = new TimelineMax();
    appScreenContent2T1
    .to(
      $appImg3, 0.3, {
        yPercent: -30,
        autoAlpha: 0,
        ease: Power4.easeInOut
      })
    .fromTo($appImg4, 1, {
      yPercent: 20,
      autoAlpha: 0
    }, {
      yPercent: 0,
      autoAlpha: 1,
      scale: 0.6,
      ease: Power4.easeInOut
    })
    .from($innerS4, 1, {
      autoAlpha: 0
    }, '-=0.7');

    new ScrollMagic.Scene({
      triggerElement: $('.innerS3 h2')[0],
      duration: '50%'
    })
    .setTween(appScreenContent2T1)
    .addTo(controller);

    // DISAPPEAR THE BOX THING

  //     var appScreenByeBye = new TweenMax();
  // appScreenByeBye
  //   // .from($appScreen, 1, {yPercent: 50,xPercent: 100,ease: Power4.easeInOut})
  //   .to($appScreen, 2, {
  //     scale: .5,
  //     autoAlpha: 0.5,
  //     ease: Power4.easeInOut
  //   })

  // new ScrollMagic.Scene({
  //   duration: '10%',
  //   triggerHook: 'onLeave'
  // })
  // .setTween(appScreenByeBye)
  // .triggerElement($innerS5)
  // .addTo(controller);



// END
})
$().ready(function() {
  var pathname = window.location.pathname;
  if (pathname === '/') {
    $('.container').tubular({videoId: 'UFmC0z_GpoU'}); // where idOfYourVideo is the YouTube ID.
  }
});
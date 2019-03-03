self.addEventListener( 'install', function () {
    console.log('Installed service worker');
  } );
  
self.addEventListener( 'fetch', function(event) {
    var url = event.request.url;
    console.log("add to home screen fired...");
    if ( url.indexOf( 'blocking' ) === -1) {
    return;
    }
  
    var promise = Promise.race( [
      new Promise( ( resolve, reject) => setTimeout(
        () => reject( new Response( 'Request killed!' ) ),
        SLOW_TIME
      ) ),
      fetch( event.request ),
    ] );
  
    event.respondWith( promise );
  } );
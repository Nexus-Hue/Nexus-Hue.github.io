document.querySelectorAll('.youtube-facade').forEach(function(el){
  el.addEventListener('click', function(){
    var vid = el.getAttribute('data-video');
    
    // Create the iframe element
    var iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '263';
    iframe.src = `https://www.youtube.com/embed/${vid}?autoplay=1&enablejsapi=1`;
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.style.borderRadius = '15px';
    
    // Replace the facade with the iframe
    el.innerHTML = '';
    el.appendChild(iframe);
    
    // Try to programmatically play the video after a slight delay
    setTimeout(function() {
      try {
        // This attempts to interact with YouTube's iframe API
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }
      } catch(e) {
        console.log('YouTube autoplay attempt:', e);
      }
    }, 300);
  });
});
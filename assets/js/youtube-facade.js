document.querySelectorAll('.youtube-facade').forEach(function(el){
  el.addEventListener('click', function(){
    var vid = el.getAttribute('data-video');
    el.outerHTML = `<iframe width="100%" height="263" src="https://www.youtube.com/embed/${vid}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" style="border-radius:15px;"></iframe>`;
  });
});

window.onload = function() {
  const num = 60;
  const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  
  const sky = document.getElementById('sky');
  const shootingstars = document.getElementById('shootingstars');
  
  // Helper functions
  function randomRadius() {
    return Math.random() * 0.7 + 0.6;
  }
  
  function getRandomX() {
    return Math.floor(Math.random() * Math.floor(vw)).toString();
  }
  
  function getRandomY() {
    return Math.floor(Math.random() * Math.floor(vh)).toString();
  }
  
  // Create stars
  for (let i = 0; i < num; i++) {
    const star = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    star.setAttribute('cx', getRandomX());
    star.setAttribute('cy', getRandomY());
    star.setAttribute('r', randomRadius());
    star.setAttribute('stroke', 'none');
    star.setAttribute('stroke-width', '0');
    star.setAttribute('fill', 'white');
    star.classList.add('star');
    sky.appendChild(star);
  }
  
  // Create shooting stars
  for (let i = 0; i < num; i++) {
    const wish = document.createElement('div');
    wish.classList.add('wish');
    wish.style.left = `${getRandomY()}px`;
    wish.style.top = `${getRandomX()}px`;
    shootingstars.appendChild(wish);
  }
  
  // Animation for twinkling stars
  anime({
    targets: '#sky .star',
    opacity: [
      { duration: 700, value: '0' },
      { duration: 700, value: '1' }
    ],
    easing: 'linear',
    loop: true,
    delay: (el, i) => 50 * i
  });
  
  // Animation for shooting stars
  anime({
    targets: '#shootingstars .wish',
    easing: 'linear',
    loop: true,
    delay: (el, i) => 1000 * i,
    opacity: [
      { duration: 700, value: '1' }
    ],
    width: [
      { value: '150px' },
      { value: '0px' }
    ],
    translateX: 350
  });
};
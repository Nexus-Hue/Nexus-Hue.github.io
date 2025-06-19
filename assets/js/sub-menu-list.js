  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('li.menu-item > div.d-flex.justify-content-between').forEach(topDiv => {
      const button = topDiv.querySelector('button.submenu-toggle');
      if (!button) return;

      topDiv.style.cursor = 'pointer'; 

      topDiv.addEventListener('click', e => {
        
        if (e.target === button || button.contains(e.target)) return;

        button.click();
      });
    });
  });
  const buttons = document.querySelectorAll('.budget-btn');
  const hiddenInput = document.getElementById('budget');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      hiddenInput.value = btn.getAttribute('data-value');
    });
  });
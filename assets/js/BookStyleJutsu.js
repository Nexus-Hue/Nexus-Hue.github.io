document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.book').forEach(function (book) {
      book.addEventListener('click', function () {
        // Toggle 'open' class on tap
        book.classList.toggle('open');
      });
    });
  });
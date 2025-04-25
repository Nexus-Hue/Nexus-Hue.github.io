document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.book').forEach(function (book) {
    book.addEventListener('click', function (e) {
      // Prevents nested clicks from bubbling and triggering unintended closes
      if (e.target.closest('.book')) {
        book.classList.toggle('open');
      }
    });
  });
});
// Get references to all toggle buttons and book elements
const toggleButtons = document.querySelectorAll('.toggle-debug');
const books = document.querySelectorAll('.book');

// Loop over each toggle button and its corresponding book
toggleButtons.forEach((toggleButton, index) => {
  const book = books[index];  // Get the corresponding book element for the button

  // Add an event listener to each button
  toggleButton.addEventListener('click', function() {
    // Toggle the 'open' class on the corresponding book element
    book.classList.toggle('open');
  });
});
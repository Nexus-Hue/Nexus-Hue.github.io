document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('category-filter');
    const blogList = document.getElementById('blog-list');
    const blogItems = blogList.querySelectorAll('.news-standard-items');
    const categoryLinks = categoryFilter.querySelectorAll('a');

    function applyCategoryFilter(category) {
        // Remove active class from all list items
        categoryFilter.querySelectorAll('li').forEach(li => li.classList.remove('active'));

        // Add active class to matching link
        categoryLinks.forEach(link => {
            if (link.getAttribute('data-category').toLowerCase() === category.toLowerCase() || (category === '' && link.getAttribute('data-category') === 'All')) {
                link.closest('li').classList.add('active');
            }
        });

        // Filter blog items
        blogItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === '' || category.toLowerCase() === 'all' || itemCategory.toLowerCase() === category.toLowerCase()) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Apply filter based on hash on page load
    let initialCategory = window.location.hash.replace('#', '');
    applyCategoryFilter(initialCategory);

    // Add click event to category links
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedCategory = this.getAttribute('data-category');
            window.location.hash = selectedCategory.toLowerCase();  // Update hash in URL
            applyCategoryFilter(selectedCategory);
        });
    });
});

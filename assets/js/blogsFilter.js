document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('category-filter');
    const blogList = document.getElementById('blog-list');
    const blogItems = blogList.querySelectorAll('.news-standard-items');
    const categoryLinks = categoryFilter.querySelectorAll('a');

    // Add click event to category links
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all list items
            categoryFilter.querySelectorAll('li').forEach(li => li.classList.remove('active'));
            
            // Add active class to the parent list item of the clicked link
            this.closest('li').classList.add('active');
            
            // Get selected category
            const selectedCategory = this.getAttribute('data-category');
            
            // Filter blog items
            blogItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (selectedCategory === 'All' || itemCategory === selectedCategory) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Set initial 'All' category as active
    const allCategoryLi = categoryFilter.querySelector('li a[data-category="All"]').closest('li');
    allCategoryLi.classList.add('active');
});
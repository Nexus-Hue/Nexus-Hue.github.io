
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.toc-header');
    const content = document.querySelector('.toc-content');

    header.addEventListener('click', function() {
        if(content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });
});

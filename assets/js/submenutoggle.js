document.addEventListener('DOMContentLoaded', function () {
    // Toggle submenus on mobile
    const submenuToggles = document.querySelectorAll('.submenu-toggle');

    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Get the submenu next to this button
            const submenu = this.parentElement.nextElementSibling;

            // Toggle button rotation
            this.classList.toggle('active');

            // Toggle parent menu-item active class (so the star can spin)
            const parentItem = this.closest('.menu-item');
            parentItem.classList.toggle('active');

            // Toggle submenu visibility
            if (submenu && submenu.classList.contains('sub-menu')) {
                submenu.classList.toggle('mobile-active');
            }
        });
    });

    // Close all submenus when clicking outside (mobile only)
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 991) {
            if (!e.target.closest('.menu-item')) {
                document.querySelectorAll('.sub-menu.mobile-active').forEach(menu => {
                    menu.classList.remove('mobile-active');
                });
                document.querySelectorAll('.submenu-toggle.active').forEach(toggle => {
                    toggle.classList.remove('active');
                });
                document.querySelectorAll('.menu-item.active').forEach(item => {
                    item.classList.remove('active');
                });
            }
        }
    });
});

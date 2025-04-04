document.addEventListener('DOMContentLoaded', function() {
    // Menu Handling Code
    const mobileMenu = document.querySelector('.mobile-menu');
    const mainMenu = document.querySelector('.main-menu');
    const closeMenuBtn = document.querySelector('.close-menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    const menuIcon = document.querySelector('.bx-menu');
    
    // Mobile Menu Toggle
    mobileMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        mainMenu.classList.toggle('active');
        menuIcon.classList.toggle('hidden');
        closeMenuBtn.classList.toggle('hidden');
    });

    // Close Menu
    closeMenuBtn.addEventListener('click', function() {
        mainMenu.classList.remove('active');
        menuIcon.classList.remove('hidden');
        closeMenuBtn.classList.add('hidden');
    });

    // Dropdown Handling
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                const parentDropdown = this.closest('.dropdown');
                parentDropdown.classList.toggle('active');
                Array.from(parentDropdown.parentElement.children)
                    .filter(child => child !== parentDropdown)
                    .forEach(sibling => sibling.classList.remove('active'));
            }
        });
    });

    // Click Outside Handler
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            mainMenu.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            menuIcon.classList.remove('hidden');
            closeMenuBtn.classList.add('hidden');
        }
    });

    // Resize Handler
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mainMenu.classList.remove('active');
            menuIcon.classList.remove('hidden');
            closeMenuBtn.classList.add('hidden');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });

    // SPA Functionality
    const originalContent = document.querySelector('.form-container').innerHTML;

    async function loadPage(page) {
        const container = document.querySelector('.form-container');
        try {
            container.classList.add('loading');
            const response = await fetch(`${page}.html`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            container.innerHTML = html;
            history.pushState({ page }, null, `?page=${page}`);
        } catch (error) {
            console.error('Failed to load page:', error);
            container.innerHTML = `
                <div class="error-message">
                    <h3>Page failed to load</h3>
                    <p>Error: ${error.message}</p>
                    <p>Requested URL: ${page}.html</p>
                </div>
            `;
        } finally {
            container.classList.remove('loading');
        }
    }

    // SPA Navigation
    document.querySelectorAll('.spa-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            console.log('Attempting to load:', page); // Debug log
            loadPage(page);
        });
    });

    // History Handling
    window.addEventListener('popstate', (event) => {
        if (event.state?.page) {
            loadPage(event.state.page);
        } else {
            document.querySelector('.form-container').innerHTML = originalContent;
        }
    });
});
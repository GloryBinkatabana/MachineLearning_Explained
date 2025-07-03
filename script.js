
        document.addEventListener('DOMContentLoaded', () => {
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('.section');
            const sidebarToggle = document.getElementById('sidebar-toggle');
            const sidebar = document.getElementById('sidebar');

            // Function to show a specific section and hide others
            const showSection = (id) => {
                sections.forEach(section => {
                    section.classList.add('hidden');
                });
                document.getElementById(id).classList.remove('hidden');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                document.querySelector(`.nav-link[data-section="${id}"]`).classList.add('active');

                // Scroll to top of content area on section change
                const contentArea = document.getElementById('content-area');
                if (contentArea) {
                    contentArea.scrollTop = 0;
                }
                // Re-typeset MathJax for the newly visible section
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById(id)]);
            };

            // Event listener for navigation links
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = e.target.dataset.section;
                    showSection(targetId);

                    // Hide sidebar on mobile after clicking a link
                    if (window.innerWidth <= 768) {
                        sidebar.classList.add('hidden-mobile');
                    }
                });
            });

            // Initial display: show the first section
            showSection('intro-ml');

            // Mobile sidebar toggle
            if (sidebarToggle) {
                sidebarToggle.addEventListener('click', () => {
                    sidebar.classList.toggle('hidden-mobile');
                });
            }

            // Function to copy code to clipboard
            window.copyCode = (button) => {
                const codeBlock = button.closest('.code-block-container').querySelector('.code-block');
                const textToCopy = codeBlock.innerText;

                // Use a temporary textarea to copy text
                const tempTextArea = document.createElement('textarea');
                tempTextArea.value = textToCopy;
                document.body.appendChild(tempTextArea);
                tempTextArea.select();
                document.execCommand('copy');
                document.body.removeChild(tempTextArea);

                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy Code';
                }, 2000);
            };
        });

        // Ensure sidebar is hidden on small screens initially
        window.addEventListener('resize', () => {
            const sidebar = document.getElementById('sidebar');
            if (window.innerWidth > 768) {
                sidebar.classList.remove('hidden-mobile');
            } else {
                // Only hide if it's not already hidden or explicitly shown by user
                if (!sidebar.classList.contains('hidden-mobile') && !sidebar.dataset.manualShow) {
                    sidebar.classList.add('hidden-mobile');
                }
            }
        });

        // Initial check on load for mobile view
        document.addEventListener('DOMContentLoaded', () => {
            const sidebar = document.getElementById('sidebar');
            if (window.innerWidth <= 768) {
                sidebar.classList.add('hidden-mobile');
            }
        });

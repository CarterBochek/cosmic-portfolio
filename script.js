       // Theme toggle functionality
        function toggleTheme() {
            const html = document.documentElement;
            const themeIcon = document.getElementById('theme-icon');
            
            if (html.getAttribute('data-theme') === 'dark') {
                html.removeAttribute('data-theme');
                themeIcon.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            } else {
                html.setAttribute('data-theme', 'dark');
                themeIcon.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            }
        }

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('theme-icon').textContent = '☀️';
        }

        // Space background animation
        let idleTimer = null;
        let isIdle = false;
        const IDLE_TIME = 5000; // 5 seconds of inactivity

        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            return particle;
        }

        function showSpaceAnimation() {
            if (!isIdle) {
                isIdle = true;
                const spaceBackground = document.getElementById('spaceBackground');
                const particlesContainer = document.getElementById('spaceParticles');
                
                // Clear existing particles
                particlesContainer.innerHTML = '';
                
                // Add particles
                for (let i = 0; i < 30; i++) {
                    particlesContainer.appendChild(createParticle());
                }
                
                spaceBackground.classList.add('active');
            }
        }

        function hideSpaceAnimation() {
            if (isIdle) {
                isIdle = false;
                const spaceBackground = document.getElementById('spaceBackground');
                spaceBackground.classList.remove('active');
            }
        }

        function resetIdleTimer() {
            clearTimeout(idleTimer);
            hideSpaceAnimation();
            
            idleTimer = setTimeout(() => {
                showSpaceAnimation();
            }, IDLE_TIME);
        }

        // Track user activity
        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'].forEach(event => {
            document.addEventListener(event, resetIdleTimer, true);
        });

        // Initialize idle timer
        resetIdleTimer();

        // Mouse cursor halo effect
        const cursorHalo = document.getElementById('cursorHalo');
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        let isMouseMoving = false;

        function updateCursorHalo() {
            // Smooth following effect
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;
            
            cursorHalo.style.left = currentX + 'px';
            cursorHalo.style.top = currentY + 'px';
            
            requestAnimationFrame(updateCursorHalo);
        }

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX - 20; // Center the halo
            mouseY = e.clientY - 20;
            
            if (!isMouseMoving) {
                isMouseMoving = true;
                cursorHalo.style.opacity = '1';
                updateCursorHalo();
            }
        });

        document.addEventListener('mouseleave', () => {
            cursorHalo.style.opacity = '0';
            isMouseMoving = false;
        });

        document.addEventListener('mouseenter', () => {
            cursorHalo.style.opacity = '1';
        });

        // Blog functionality
        let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

        function openModal() {
            document.getElementById('blogModal').style.display = 'flex';
        }

        function closeModal() {
            document.getElementById('blogModal').style.display = 'none';
            document.getElementById('blogForm').reset();
        }

        function addBlogPost(event) {
            event.preventDefault();
            
            const title = document.getElementById('postTitle').value;
            const content = document.getElementById('postContent').value;
            const date = new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            const newPost = {
                id: Date.now(),
                title,
                content,
                date
            };
            
            blogPosts.unshift(newPost);
            localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
            
            renderBlogPosts();
            closeModal();
        }

        function renderBlogPosts() {
            const blogContainer = document.getElementById('blogPosts');
            
            if (blogPosts.length === 0) {
                blogContainer.innerHTML = `
                    <div class="blog-post">
                        <h3>Welcome to My Blog!</h3>
                        <p class="blog-date">June 13, 2025</p>
                        <p class="blog-content">This is my first blog post. I'll be sharing my thoughts on development, projects I'm working on, and interesting technologies I'm learning about. Stay tuned for weekly updates!</p>
                    </div>
                `;
                return;
            }
            
            blogContainer.innerHTML = blogPosts.map(post => `
                <div class="blog-post">
                    <h3>${post.title}</h3>
                    <p class="blog-date">${post.date}</p>
                    <p class="blog-content">${post.content}</p>
                </div>
            `).join('');
        }

        // Load and render saved blog posts
        renderBlogPosts();

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('blogModal');
            if (event.target === modal) {
                closeModal();
            }
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
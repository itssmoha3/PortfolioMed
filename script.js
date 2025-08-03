
        // إصلاح مشكلة التحميل - حلول متعددة
        function hideLoadingOverlay() {
            const overlay = document.getElementById('loadingOverlay');
            if (overlay) {
                overlay.classList.add('hidden');
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 600);
            }
        }

        // تشغيل متعدد لضمان الإخفاء
        window.addEventListener('load', hideLoadingOverlay);
        setTimeout(hideLoadingOverlay, 2500); // حل احتياطي
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(hideLoadingOverlay, 1500);
        });

        // Mobile Menu Functions
        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburgerBtn = document.querySelector('.hamburger-btn');
            
            mobileMenu.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
            
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }

        function closeMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburgerBtn = document.querySelector('.hamburger-btn');
            
            mobileMenu.classList.remove('active');
            hamburgerBtn.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburgerBtn = document.querySelector('.hamburger-btn');
            
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(event.target) && 
                !hamburgerBtn.contains(event.target)) {
                closeMobileMenu();
            }
        });

        // Scroll progress indicator
        function updateScrollProgress() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            document.getElementById('scrollProgress').style.width = scrollPercent + '%';
        }

        // Scroll to section function
        function scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }

        // Back to top function
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Coming soon alert for empty portfolio items
        function showComingSoon(itemName) {
            const notification = document.createElement('div');
            notification.textContent = `${itemName} - Coming Soon! 🎨`;
            notification.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8));
                backdrop-filter: blur(20px);
                padding: 20px 30px;
                border-radius: 15px;
                border: 1px solid rgba(255, 255, 255, 0.3);
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                color: #2d3436;
                font-weight: 500;
                z-index: 10000;
                opacity: 0;
                transition: all 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.opacity = '1';
            }, 10);
            
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 2000);
        }

        // تحسين تأثير الكتابة
        function typeWriter(element, text, speed = 50) {
            let i = 0;
            element.innerHTML = '';
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    element.classList.add('typing-text');
                }
            }, speed);
        }

        // انيميشن شرائح التقدم المحسن
        function animateProgressBars() {
            const progressFills = document.querySelectorAll('.skill-progress-fill');
            
            progressFills.forEach((fill, index) => {
                const targetWidth = fill.getAttribute('data-width');
                
                setTimeout(() => {
                    fill.style.width = targetWidth;
                }, index * 200);
            });
        }

        // انيميشن النقاط للمهارات
        function animateSkillDots() {
            const skillItems = document.querySelectorAll('.skill-item');
            
            skillItems.forEach((item, itemIndex) => {
                const dots = item.querySelectorAll('.skill-dot');
                const activeDots = item.querySelectorAll('.skill-dot.active');
                
                setTimeout(() => {
                    activeDots.forEach((dot, dotIndex) => {
                        setTimeout(() => {
                            dot.style.animation = `dotPulse 1.5s ease-in-out ${dotIndex * 0.1}s infinite`;
                        }, dotIndex * 100);
                    });
                }, itemIndex * 300);
            });
        }

        // تحسين انيميشن Timeline
        function animateTimelineItems() {
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            timelineItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 1000 + (index * 150));
            });
        }

        // Update timeline navigation
        function updateTimelineNav() {
            const sections = ['home', 'about', 'posters', 'logos', 'contact'];
            const timelineItems = document.querySelectorAll('.timeline-item-nav');
            
            sections.forEach((sectionId, index) => {
                const section = document.getElementById(sectionId);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const isVisible = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
                    
                    if (isVisible) {
                        timelineItems.forEach(item => item.classList.remove('active'));
                        if (timelineItems[index]) {
                            timelineItems[index].classList.add('active');
                        }
                    }
                }
            });
        }

        // Show/hide back to top button
        function toggleBackToTop() {
            const backToTop = document.querySelector('.back-to-top');
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }

        // Intersection Observer للمهارات
        function setupSkillsObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.target.classList.contains('skills-section')) {
                        setTimeout(() => {
                            animateProgressBars();
                            animateSkillDots();
                        }, 500);
                        observer.unobserve(entry.target);
                    }
                });
            }, { 
                threshold: 0.3,
                rootMargin: '0px 0px -100px 0px'
            });

            observer.observe(document.querySelector('.skills-section'));
        }

        // Intersection Observer للتايم لاين
        function setupTimelineObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.target.classList.contains('history-section')) {
                        setTimeout(animateTimelineItems, 300);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            observer.observe(document.querySelector('.history-section'));
        }

        // Intersection Observer for portfolio items
        function setupPortfolioObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.portfolio-item').forEach(item => {
                observer.observe(item);
            });
        }

        // Add scroll event listeners
        window.addEventListener('scroll', function() {
            updateScrollProgress();
            updateTimelineNav();
            toggleBackToTop();
        });

        // Initialize all functions
        document.addEventListener('DOMContentLoaded', () => {
            // تشغيل تأثير الكتابة
            const titleElement = document.querySelector('.typing-text');
            if (titleElement) {
                const titleText = titleElement.textContent;
                setTimeout(() => {
                    typeWriter(titleElement, titleText, 45);
                }, 800);
            }

            // تفعيل جميع المراقبين
            setupSkillsObserver();
            setupTimelineObserver();
            setupPortfolioObserver();

            // معالج أخطاء الصور
            document.querySelectorAll('img').forEach(img => {
                img.onerror = function() {
                    this.style.display = 'none';
                    console.log('Image failed to load:', this.src);
                };
            });
        });

        // تحسين الأداء للأجهزة المحمولة
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.bg-shape').forEach(shape => {
                shape.style.opacity = '0.01';
            });
        }

        // Handle orientation change
        window.addEventListener('orientationchange', function() {
            setTimeout(() => {
                window.scrollTo(0, window.pageYOffset);
                closeMobileMenu();
            }, 100);
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeMobileMenu();
                    // ===============================================
// AUTO-ANIMATE TIMELINE ITEMS - ظهور تلقائي
// ===============================================

// 1. إزالة الانيميشن المرتبط بالإنتراسكشن أوبزرفر واستبداله بهذا
function autoAnimateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        // تأخير تدريجي لكل عنصر
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
            item.style.transition = 'all 0.6s ease-out';
        }, 800 + (index * 200)); // بداية بعد 800ms ثم كل 200ms
    });
}

// 2. تشغيل الانيميشن عند تحميل الصفحة
window.addEventListener('load', function() {
    setTimeout(autoAnimateTimelineItems, 1500); // بداية بعد 1.5 ثانية من التحميل
});

// 3. تشغيل إضافي عند وصول المستخدم للقسم (احتياطي)
function setupAutoTimelineObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('history-section')) {
                // التأكد من أن العناصر ظهرت، وإذا لم تظهر بعد، تشغيل الانيميشن
                const timelineItems = document.querySelectorAll('.timeline-item');
                const isAnyItemHidden = Array.from(timelineItems).some(item => 
                    item.style.opacity === '0' || item.style.opacity === ''
                );
                
                if (isAnyItemHidden) {
                    autoAnimateTimelineItems();
                }
                
                observer.unobserve(entry.target); // تشغيل مرة واحدة فقط
            }
        });
    }, { threshold: 0.3 });

    const historySection = document.querySelector('.history-section');
    if (historySection) {
        observer.observe(historySection);
    }
}

// 4. تشغيل المراقب الاحتياطي
document.addEventListener('DOMContentLoaded', setupAutoTimelineObserver);

// 5. تحسين إضافي - تشغيل فوري إذا كان القسم مرئياً عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const historySection = document.querySelector('.history-section');
        if (historySection) {
            const rect = historySection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                autoAnimateTimelineItems();
            }
        }
    }, 2000); // فحص بعد ثانيتين من التحميل
});

            }
        });

    

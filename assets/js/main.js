    // --- Language Toggle ---
    const langToggleBtn = document.getElementById('lang-toggle');
    const langToggleText = document.getElementById('lang-toggle-text');

    let currentLang = localStorage.getItem('app-lang') || 'id';

    function updateLanguageUI() {
        const idElements = document.querySelectorAll('.lang-id');
        const enElements = document.querySelectorAll('.lang-en');
        const searchInput = document.getElementById('cert-search');

        if (currentLang === 'id') {
            document.documentElement.classList.remove('lang-en-active');
            idElements.forEach(el => el.classList.remove('hidden'));
            enElements.forEach(el => el.classList.add('hidden'));
            langToggleText.textContent = 'EN';
            if (searchInput) {
                searchInput.placeholder = searchInput.getAttribute('data-placeholder-id') || 'Cari sertifikat...';
            }
        } else {
            document.documentElement.classList.add('lang-en-active');
            idElements.forEach(el => el.classList.add('hidden'));
            enElements.forEach(el => el.classList.remove('hidden'));
            langToggleText.textContent = 'ID';
            if (searchInput) {
                searchInput.placeholder = searchInput.getAttribute('data-placeholder-en') || 'Search credentials...';
            }
        }
    }

    // Initialize Language UI
    updateLanguageUI();

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'id' ? 'en' : 'id';
        localStorage.setItem('app-lang', currentLang);
        updateLanguageUI();
    });

    // --- Dark Mode ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Check user preferences or local storage
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        themeToggleLightIcon.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        themeToggleDarkIcon.classList.remove('hidden');
    }

    themeToggleBtn.addEventListener('click', function() {
        themeToggleDarkIcon.classList.toggle('hidden');
        themeToggleLightIcon.classList.toggle('hidden');

        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    });

    // --- Mobile Menu ---
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // --- Search and Filters ---
    const searchInput = document.getElementById('cert-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const certCards = document.querySelectorAll('.cert-card');

    let activeCategory = 'all';
    let searchQuery = '';

    function updateCertificatesVisibility() {
        certCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const issuer = card.querySelector('p').textContent.toLowerCase();
            const category = card.getAttribute('data-category');

            const matchesSearch = title.includes(searchQuery) || issuer.includes(searchQuery);
            const matchesCategory = activeCategory === 'all' || category === activeCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        updateCertificatesVisibility();
    });

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('bg-primary-600', 'text-white');
                b.classList.add('bg-white', 'dark:bg-slate-800', 'border', 'border-slate-200', 'dark:border-slate-700', 'hover:bg-slate-100', 'dark:hover:bg-slate-700', 'text-slate-700', 'dark:text-slate-200');
            });
            btn.classList.add('bg-primary-600', 'text-white');
            btn.classList.remove('bg-white', 'dark:bg-slate-800', 'border', 'border-slate-200', 'dark:border-slate-700', 'hover:bg-slate-100', 'dark:hover:bg-slate-700', 'text-slate-700', 'dark:text-slate-200');

            activeCategory = btn.getAttribute('data-category');
            updateCertificatesVisibility();
        });
    });

    // Attach action for Buka File Gambar button
    document.getElementById('modal-open-img-btn').addEventListener('click', () => {
        window.open(modalImg.src);
    });

    // --- Lightbox Modal with Carousel ---
    const modal = document.getElementById('cert-modal');
    const modalContainer = document.getElementById('modal-container');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalIssuer = document.getElementById('modal-issuer');
    const modalDate = document.getElementById('modal-date');
    const modalId = document.getElementById('modal-id');
    const modalTag = document.getElementById('modal-tag');
    const closeModalBtn = document.getElementById('close-modal');

    const prevBtn = document.getElementById('carousel-prev-btn');
    const nextBtn = document.getElementById('carousel-next-btn');
    const indicatorPill = document.getElementById('carousel-indicator-pill');
    const indicatorText = document.getElementById('carousel-indicator-text');

    const modalIssuerRow = document.getElementById('modal-issuer-row');
    const modalDateRow = document.getElementById('modal-date-row');
    const modalIdRow = document.getElementById('modal-id-row');

    let carouselImages = [];
    let carouselIndex = 0;

    function updateCarouselDisplay() {
        if (carouselImages.length === 0) return;

        // Soft opacity transition
        modalImg.classList.add('opacity-0');

        setTimeout(() => {
            modalImg.src = carouselImages[carouselIndex];
            if (currentLang === 'id') {
                indicatorText.textContent = `${carouselIndex + 1} dari ${carouselImages.length}`;
            } else {
                indicatorText.textContent = `${carouselIndex + 1} of ${carouselImages.length}`;
            }

            if (carouselImages.length > 1) {
                prevBtn.style.display = 'flex';
                nextBtn.style.display = 'flex';
                indicatorPill.style.display = 'flex';
            } else {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
                indicatorPill.style.display = 'none';
            }
            modalImg.classList.remove('opacity-0');
        }, 150);
    }

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        carouselIndex = (carouselIndex - 1 + carouselImages.length) % carouselImages.length;
        updateCarouselDisplay();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        carouselIndex = (carouselIndex + 1) % carouselImages.length;
        updateCarouselDisplay();
    });

    function openModal(data) {
        modalTitle.textContent = currentLang === 'id' ? data.titleId : data.titleEn;
        modalTag.textContent = currentLang === 'id' ? data.tagId : data.tagEn;

        // Setup Carousel images
        carouselImages = data.images || [];
        carouselIndex = 0;

        if (data.isCV) {
            modalIssuerRow.style.display = 'none';
            modalDateRow.style.display = 'none';
            modalIdRow.style.display = 'none';
        } else {
            modalIssuerRow.style.display = 'flex';
            modalDateRow.style.display = 'flex';
            modalIdRow.style.display = 'flex';
            modalIssuer.textContent = data.issuer;
            modalDate.textContent = currentLang === 'id' ? data.dateId : data.dateEn;
            modalId.textContent = data.id;
        }

        // Render current active image and setup controls visibility
        updateCarouselDisplay();

        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalContainer.classList.remove('scale-95');
        }, 10);
    }

    function closeModal() {
        modal.classList.add('opacity-0');
        modalContainer.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Attach event listeners to certificate card elements
    document.querySelectorAll('.cert-image-trigger, .cert-title-trigger, .cert-btn-trigger').forEach(el => {
        el.addEventListener('click', () => {
            const card = el.closest('.cert-card');
            const trigger = card.querySelector('.cert-btn-trigger');
            const imagesStr = trigger.getAttribute('data-images') || "";
            const imagesArr = imagesStr.split(',').filter(s => s.trim() !== "");

            openModal({
                images: imagesArr,
                titleId: trigger.getAttribute('data-title-id'),
                titleEn: trigger.getAttribute('data-title-en'),
                issuer: trigger.getAttribute('data-issuer'),
                dateId: trigger.getAttribute('data-date-id'),
                dateEn: trigger.getAttribute('data-date-en'),
                id: trigger.getAttribute('data-id'),
                tagId: "Info Sertifikasi",
                tagEn: "Credentials Info",
                isCV: false
            });
        });
    });

    // Attach event listeners for CV Preview triggers
    const triggerCV = () => {
         openModal({
            images: ["assets/main_cv.jpg"],
            titleId: "Curriculum Vitae Abdullah Faqih",
            titleEn: "Curriculum Vitae Abdullah Faqih",
            tagId: "Abdullah Faqih Curriculum Vitae",
            tagEn: "Abdullah Faqih Curriculum Vitae",
            isCV: true
         });
    };
    document.getElementById('view-cv-btn').addEventListener('click', triggerCV);

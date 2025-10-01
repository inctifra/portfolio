
$(async function () {
    const { initSwiper } = await import("./init")
    // Playground slider
    await initSwiper(".slider-playground", {
        slidesPerView: "auto",
        spaceBetween: 10,
        loop: true,
        speed: 1800,
        autoplay: { delay: 700, disableOnInteraction: false },
        navigation: {
            clickable: true,
            nextEl: ".navigation-next-playground",
            prevEl: ".navigation-prev-playground",
        },
        pagination: {
            el: ".pagination-playground",
            clickable: true,
        },
    });

    // Tech stack slider
    await initSwiper(".slider-tech-stack", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        speed: 1000,
        autoplay: { delay: 1000, disableOnInteraction: false },
        pagination: { el: ".pagination-tech-stack", type: "progressbar" },
        breakpoints: {
            768: { slidesPerView: 1.5, spaceBetween: 0 },
            991: { slidesPerView: 1.775, spaceBetween: 0 },
        },
    });

    // Tech stack 1
    await initSwiper(".slider-tech-stack1", {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        speed: 1000,
        autoplay: { delay: 1000, disableOnInteraction: false },
        pagination: { el: ".pagination-tech-stack1", type: "progressbar" },
        breakpoints: {
            768: { slidesPerView: 1.5 },
            991: { slidesPerView: 1.775 },
        },
    });

    // Partners
    await initSwiper(".slider-partners", {
        slidesPerView: "auto",
        spaceBetween: 0,
        loop: true,
        speed: 2000,
        autoplay: { delay: 700, disableOnInteraction: false },
    });

    // Partners 2
    await initSwiper(".slider-partners2", {
        slidesPerView: "auto",
        spaceBetween: 16,
        loop: true,
        speed: 3000,
        autoplay: { delay: 0, disableOnInteraction: false },
    });

    // Process
    await initSwiper(".slider-process", {
        slidesPerView: 1.165,
        spaceBetween: 16,
        loop: true,
        speed: 1700,
        autoplay: { delay: 1200, disableOnInteraction: false },
    });

    // Process 1 (special cards effect)
    await initSwiper(".slider-process1", {
        effect: "cards",
        grabCursor: true,
        direction: "vertical",
        speed: 800,
        autoplay: { delay: 1500, disableOnInteraction: false },
        cardsEffect: { perSlideOffset: 11.2 },
        on: {
            setTranslate() {
                this.slides.forEach((slide) => {
                    let transform = slide.style.transform;
                    transform = transform.replace(/rotateZ\([^)]+\)/, "rotateZ(0deg)");
                    slide.style.transform = transform.includes("rotateZ")
                        ? transform
                        : transform + " rotateZ(0deg)";
                });
            },
            init() {
                if (this.slides[0]) {
                    this.slides[0].classList.add(
                        "swiper-slide-thumb-active",
                        "swiper-slide-fully-visible"
                    );
                }
            },
            transitionStart() {
                this.slides.forEach((s) =>
                    s.classList.remove("swiper-slide-thumb-active", "swiper-slide-fully-visible")
                );
            },
            transitionEnd() {
                if (this.slides[this.activeIndex]) {
                    this.slides[this.activeIndex].classList.add(
                        "swiper-slide-thumb-active",
                        "swiper-slide-fully-visible"
                    );
                }
            },
        },
    });

})
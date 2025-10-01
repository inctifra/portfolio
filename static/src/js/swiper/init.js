export async function initSwiper(selector, options = {}, { autoplayOnView = true } = {}) {
    const el = document.querySelector(selector);
    if (!el) {
        console.warn(`[initSwiper] No element found for selector: ${selector}`);
        return null;
    }

    // Import Swiper dynamically
    const { default: Swiper } = await import("swiper");

    // Initialize swiper
    const swiper = new Swiper(selector, options);

    // Handle autoplay safely
    if (options.autoplay && autoplayOnView && swiper.autoplay) {
        try {
            swiper.autoplay.stop();

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            swiper.autoplay?.start();
                        } else {
                            swiper.autoplay?.stop();
                        }
                    });
                },
                { threshold: 0.5 }
            );

            observer.observe(el);

            el.addEventListener("mouseenter", () => swiper.autoplay?.stop());
            el.addEventListener("mouseleave", () => swiper.autoplay?.start());
        } catch (err) {
            console.error("[initSwiper] Autoplay error:", err);
        }
    }

    return swiper;
}

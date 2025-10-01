const { default: gsap } = require("gsap");
const { SplitText } = require("gsap/all");

$(function () {
    ("use strict");

    var animateText = function () {
        if ($(".text-color-change").length) {
            let animatedTextElements = document.querySelectorAll(".text-color-change");

            animatedTextElements.forEach((element) => {
                if (element.wordSplit) {
                    element.wordSplit.revert();
                }
                if (element.charSplit) {
                    element.charSplit.revert();
                }

                element.wordSplit = new SplitText(element, {
                    type: "words",
                    wordsClass: "word-wrapper",
                });

                element.charSplit = new SplitText(element.wordSplit.words, {
                    type: "chars",
                    charsClass: "char-wrapper",
                });

                gsap.set(element.charSplit.chars, {
                    color: "#DDDDDD4D",
                    opacity: 1,
                });

                element.animation = gsap.to(element.charSplit.chars, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%",
                        end: "bottom 35%",
                        toggleActions: "play none none reverse",
                        scrub: true,
                    },
                    color: "#ffffff",
                    stagger: {
                        each: 0.05,
                        from: "start",
                    },
                    duration: 0.5,
                    ease: "power2.out",
                });
            });
        }
        if ($(".text-fade-right").length > 0) {
            let animatedTextElements = document.querySelectorAll(".text-fade-right");
            animatedTextElements.forEach((element) => {
                if (element.animation) {
                    element.animation.progress(1).kill();
                    element.split.revert();
                }

                element.split = new SplitText(element, { type: "lines" });

                gsap.set(element, { perspective: 400 });

                gsap.set(element.split.lines, {
                    opacity: 0,
                    y: 30,
                });

                element.animation = gsap.to(element.split.lines, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%",
                        toggleActions: "play reverse play reverse",
                    },
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "back",
                    stagger: {
                        amount: 0.1,
                        from: "start",
                        ease: "sine.inOut",
                    },
                });
            });
        }

        if ($(".text-anime-clip").length > 0) {
            const textElements = document.querySelectorAll(".text-anime-clip");

            textElements.forEach((textElement) => {
                gsap.fromTo(
                    textElement,
                    { clipPath: "inset(0 0 100% 0)" },
                    {
                        clipPath: "inset(0 0 0 0)",
                        duration: 0.6,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: textElement,
                            start: "top 90%",
                            toggleActions: "play reverse play reverse",
                        },
                    }
                );
            });
        }
    };

    var tabs = function () {
        $(".wg-tabs").each(function () {
            $(this).find(".widget-content-tab").children().hide();
            $(this).find(".widget-content-tab").children(".active").show();
            $(this)
                .find(".menu-tab")
                .children(".item")
                .on("click", function () {
                    var liActive = $(this).index();
                    var contentActive = $(this)
                        .siblings()
                        .removeClass("active")
                        .parents(".wg-tabs")
                        .find(".widget-content-tab")
                        .children()
                        .eq(liActive);
                    contentActive.addClass("active").fadeIn("slow");
                    contentActive.siblings().removeClass("active");
                    $(this)
                        .addClass("active")
                        .parents(".wg-tabs")
                        .find(".widget-content-tab")
                        .children()
                        .eq(liActive)
                        .siblings()
                        .hide();
                });
        });
    };


    var canvas = function () {
        $(".kwasa-btn-menu").on("click", function () {
            $(".kwasa-sidebar-menu").addClass("active");
        });
        $(".btn-setting-color").on("click", function () {
            $(".kwasa-setting-color").addClass("active");
        });

        $(".close-canvas").on("click", function () {
            $(this).closest('.kwasa-canvas').removeClass("active");
        });
        $(".overlay").on("click", function () {
            $(this).closest('.kwasa-canvas').removeClass("active");
        });

        $(".kwasa-sidebar-menu .sidebar-nav a").on("click", function () {
            $(this).closest('.kwasa-canvas').removeClass("active");
        });
    }

    var infiniteSlide = function () {
        $(".infiniteslide").each(function () {
          var $this = $(this);
          var style = $this.data("style") || "left";
          var clone = parseInt($this.data("clone"),10) || 2;
          var speed = parseInt($this.data("speed"),10) || 100;
      
          $this.infiniteslide({
            speed: speed,
            direction: style,
            clone: clone,
          });
        });
    };

    var stickyTabs = function () {
        let sectionIds = $('a.scroll-to');
        $(function () {
            sectionIds.each(function () {
                let container = $(this).attr('href');
                let containerOffset = $(container).offset().top;
                let containerHeight = $(container).outerHeight();
                let containerBottom = containerOffset + containerHeight;
                let scrollPosition = $(document).scrollTop();
                if (scrollPosition < containerBottom - 20 && scrollPosition >= containerOffset - 20) {
                $(this).addClass('active');
                } else {
                $(this).removeClass('active');
                }
            });
        });
    }

    var active_item = function () {
        $(".choose-item").on("click", function () {
            $(this).closest(".list-choose").find(".choose-item").removeClass("active");
            $(this).addClass("active");
        });
    }

    var settings_color = function () {
        $(".settings-color a").on("click", function () {
            var index =  $(this).index() + 1;
            $("body").attr("data-color-primary", "color-primary-" + index);
        })
    }

    $(function () {
        animateText();
        tabs();
        canvas();
        infiniteSlide();
        stickyTabs();
        active_item();
        settings_color();
    });
});
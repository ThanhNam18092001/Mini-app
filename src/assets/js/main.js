/* File : main.js 
1. Animation fade text  
2. Catogory mutile menu
3. Menu open/close 
4. Select Options Form
5. Slider
6. Upload Attachment File
7. Animation Background Transition
8. Other..
*/

window.onload = () => {
    AOS.init();
    category.init();
    menu.init();
    selectOptions.init();
    uploadAttachment.init();
    animationBackground.init();
    accordionContent.init();
    mouseMoveOnPage.init();
    textScrollHorizontal.init();

    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 4.5,
        freeMode: true,
        breakpoints: {
            0: {
                slidesPerView: 1.4
            },
            568: {
              slidesPerView: 2.5
            },
            992: {
              slidesPerView: 2.5
            },
            1024: {
                slidesPerView: 3.5
            },
            1199: {
                slidesPerView: 3.5
            },
            1920: {
                slidesPerView: 4.5
            }
        }
      });
};


var $mouse = { x: 0, y: 0 }; // Cursor position
var $pos = { x: 0, y: 0 }; // Cursor position
var $ratio = 0.15; // delay follow cursor
var $active = false;
var $ball = $("#ball");

var $ballWidth = 34; // Ball default width
var $ballHeight = 34; // Ball default height
var $ballScale = 1; // Ball default scale
var $ballOpacity = 0.5; // Ball default opacity
var $ballBorderWidth = 2; // Ball default border width



// =================
  // Page transitions
  // =================

if ($("body").hasClass("tt-transition")) {
    // Wait until the whole page is loaded.
    $(window).on("load", function () {
      setTimeout(function () {
        HideLoad(); // call out animations.
      }, 0);
    });
    function RevealLoad() {
        var tl_transitIn = gsap.timeline({
          defaults: { duration: 1, ease: Expo.easeInOut },
        });
        tl_transitIn.set("#page-transition", { autoAlpha: 1 });
        tl_transitIn.to(
          ".ptr-overlay",
          { scaleY: 1, transformOrigin: "center bottom" },
          0
        );
        // tl_transitIn.to("#scroll-container", { y: -80, autoAlpha: 0 }, 0);
        // tl_transitIn.to("#tt-header", { y: -20, autoAlpha: 0 }, 0);
        tl_transitIn.to(".ptr-preloader", { autoAlpha: 1 }, 0.4);
    }

    function HideLoad() {
        var tl_transitOut = gsap.timeline();
        tl_transitOut.to(".ptr-preloader", {
          duration: 1,
          autoAlpha: 0,
          ease: Expo.easeInOut,
        });
        tl_transitOut.to(
          ".ptr-overlay",
          {
            duration: 1,
            scaleY: 0,
            transformOrigin: "center top",
            ease: Expo.easeInOut,
          },
          0.3
        );
        tl_transitOut.from(
            "#page-header",
            {
              duration: 1,
              y: 20,
              autoAlpha: 0,
              ease: Expo.easeInOut,
              clearProps: "all",
            },
            0.6
          );
    }

    window.onpageshow = function (event) {
        if (event.persisted) {
          window.location.reload();
        }
    };

    // On link click
    // ==============
    $("a")
      .not('[target="_blank"]') // omit from selection
      .not('[href^="#"]') // omit from selection
      .not('[href^="mailto"]') // omit from selection
      .not('[href^="tel"]') // omit from selection
      .not(".lg-trigger") // omit from selection
      .not(".no-transition") // omit from selection
      .on("click", function (e) {
        e.preventDefault();

        setTimeout(
          function (url) {
            window.location = url;
          },
          1000,
          this.href
        );

        RevealLoad(); // call in animations.
      });
}

// End transation load preview page.
    
function handleDeleteFile (index) {
    const dt = new DataTransfer()
    const input = document.querySelector('#attachment-file');
    const { files } = input
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (index !== i)
        dt.items.add(file) // here you exclude the file. thus removing it.
    }
    $(`#attachment-name-${index}`).remove();
    input.files = dt.files // Assign the updates list
}

const uploadAttachment = {
    init: function() {
        this.uploadAttachmentFile();
    },
    uploadAttachmentFile: function() {
        const fileSelector = document.querySelector('#attachment-file');
        if (fileSelector) {
            fileSelector.addEventListener('change', (event) => {
                let fileList = event.target.files;
                // console.log(fileList);
                let renderHTML = '';
                Array.from(fileList).forEach((item, index) => (
                    renderHTML += `<div class="file-info" id="attachment-name-${index}"> <span class="icon-delete" onClick="handleDeleteFile(${index})"> <img src="./assets/icons/close.svg" /> </span> <span class="file-name">${item.name} </span> </div>`
                ))
                $(".file-block").html(renderHTML);
            });
    
            $('#form-contact').on('submit', function(event) {
                event.preventDefault();
                var formData = new FormData(this);
            });
        }
    }

}

const menu = {
    init: function () {
        this.scrollMenu();
        this.activeItemMenu();
    },
    scrollMenu: function () {
        var scrollHeader = document.querySelector(".header-layout");
        window.onscroll = function () {
            if (document.body.scrollTop > 50 ||
                document.documentElement.scrollTop > 50) {
                scrollHeader.classList.add("add_transform");
            } else {
                scrollHeader.classList.remove("add_transform");
            }
        };

        let lastScrollTop = 0;
        $(window).on('scroll', function() {
            st = $(this).scrollTop();
            var isMobile = window.orientation > -1;
            if ( !isMobile ) {
                if(st < lastScrollTop) {
                    scrollHeader.classList.add("show__header");
                }
                else {
                    scrollHeader.classList.remove("show__header");
                }
            } else {
                if(st > 50) {
                    scrollHeader.classList.add("show__header");
                }
                else {
                    scrollHeader.classList.remove("show__header");
                }
            }
            lastScrollTop = st;
        });
    },
    
    activeItemMenu: function() {
        // var path = window.location.pathname;
        // path = path.replace(/\/$/, "");
        // path = decodeURIComponent(path);

        // $(".menu-list-content .content-item .item-link").each(function () {
        //     var href = $(this).attr('href');
        //     if(path.substring((path.lastIndexOf('/')+1),path.length) === href.substring((href.lastIndexOf('/')+1),href.length)) {    
        //         $(this).addClass('active');
        //     } else {
        //         $(this).removeClass('active');
        //     }
        // });   
        
        // $(".footer__menu-list .menu-item .item-link").each(function () {
        //     var href = $(this).attr('href');
        //     if(path.substring((path.lastIndexOf('/')+1),path.length) === href.substring((href.lastIndexOf('/')+1),href.length)) {    
        //         $(this).addClass('active');
        //     } else {
        //         $(this).removeClass('active');
        //     }
        // });   
    }
};


// const category = {
//     init: function () {
//         // this.configEventExpand();
//         this.openCloseCategory();
//         // this.selectOptions();
//         // this.openSetting();
//     },
//     configEventExpand: function () {
//         const main = document.querySelector("section.section-category");
//         if (main) {
//             const allLists = main.querySelectorAll(".category-item");
//             allLists.forEach((item) =>
//                 item.addEventListener("click", () => {
//                     item.classList.toggle("active");
//                 })
//             );
//         }
//     },
//     openCloseCategory: function () {
//         const main = document.querySelector("header.header-layout");
//         const menuList = document.querySelector("header .header-menu-list");
//         const btnOpen = document.querySelector(".header-bar");
//         if (main && btnOpen && menuList) {
//             // const overlay = main.querySelector(".category-overlay");
//             // const btnClose = main.querySelector(".category-close");
//             const imageBar = btnOpen.querySelector('img');
//             btnOpen.addEventListener("click", () => {
//                 menuList.classList.toggle("active");
//                 main.classList.toggle("active");
//                 // overlay.classList.toggle('active');
//                 if (menuList.classList.contains('active')) {
//                     imageBar.setAttribute('src', 'https://uway.asia/wp-content/themes/uway_asia/html/src/assets/icons/close-btn.svg')
//                 } else {
//                     imageBar.setAttribute('src', 'https://uway.asia/wp-content/themes/uway_asia/html/src/assets/icons/menu-btn.svg')
//                 }
//             });
//         }
//     },
//     selectOptions: function () {
//         const allSectionOption = document.querySelectorAll(
//             ".category-filter .list-select"
//         );
//         allSectionOption.forEach((item) => {
//             const allOptions = item.querySelectorAll(".button-component");
//             allOptions.forEach((btn, btnIndex) =>
//                 btn.addEventListener("click", () => {
//                     allOptions.forEach((ele, indexEle) => {
//                         if (indexEle !== btnIndex) ele.classList.remove("primary-light");
//                     });
//                     btn.classList.toggle("primary-light");
//                 })
//             );
//         });
//     },
//     openSetting: function () {
//         const settingClick = document.querySelector(".click-setting");
//         if (settingClick) {
//             const openSetting = document.querySelector(".mobile-none");
//             const mbSetting = document.querySelector(".mb-setting ");
//             settingClick.addEventListener("click", () => {
//                 openSetting.classList.toggle("active");
//                 if (mbSetting.className.includes('active')) {
//                     settingClick.innerText = "Close";
//                 } else {
//                     settingClick.innerText = "Setting";
//                 }
//             })
//         }

//     }
// };


const selectOptions = {
    init() {
        this.clickSettime();
    },
    clickSettime: function () {
        $(".select-contact .click-show-dropdow").click(function () {
            ;
            $(this).find(".dropdown").toggleClass("active");
            $(this).toggleClass("active");
        });
        $(".click-show-dropdow .dropdown li").click(function () {
            let valuatext = $(this).find(".get-valua-text").text();
            let valuaNumber = $(this).find(".get-valua-number").attr("value");
            $(this)
                .parent()
                .parent()
                .find(".valua-time")
                .attr("value", $.trim(valuaNumber));
            $(this)
                .parent()
                .parent()
                .find(".time-text")
                .text($.trim(valuatext))
                .css("color", "#141414");
        });
    },
};

function scrollListener() {
	var threshold = document.querySelectorAll(".section-bg-ground");
    if (threshold) {
        threshold.forEach(item => {
            let clientHeightThreshold = item.offsetTop - 350;
            if (window.pageYOffset >= clientHeightThreshold) {
                item.classList.add("active-bg");	

            } else if (window.pageYOffset <= clientHeightThreshold) {
                item.classList.remove("active-bg");	
            }
        })
    }
}

function throttle(func, delay) { 
	var func = func.bind(func),
	last = Date.now();
	return function() {
		if (Date.now() - last > delay) {
			func();
			last = Date.now();
		}
	}
}

const animationBackground = {
    init: function() {
        this.animationBackground();
    },
    animationBackground: function() {
        // var nickysListener = throttle(scrollListener, 500);
        // window.addEventListener('scroll', nickysListener);
        $(window).scroll(function() {
  
            // selectors
            var $window = $(window),
                $body = $('body'),
                $panel = $('.uw-bg');
            
            // Change 33% earlier than scroll position so colour is there when you arrive.
            var scroll = $window.scrollTop() + ($window.height() / 3);
           
            $panel.each(function () {
              var $this = $(this);
              
              // if position is within range of this panel.
              // So position of (position of top of div <= scroll position) && (position of bottom of div > scroll position).
              // Remember we set the scroll to 33% earlier in scroll var.
              if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
                    
                // Remove all classes on body with color-
                $body.removeClass(function (index, css) {
                  return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
                });
                 
                // Add class of currently active div
                $body.addClass('color-' + $(this).data('color'));
              }
            });    
            
          }).scroll();
    },


}

if ($("#page-header").hasClass("ph-content-parallax")) {
    let tlPhParallax = gsap.timeline({
        scrollTrigger: {
            trigger: "#page-header",
            start: "top top",
            end: "bottom top",
            scrub: true,
            markers: false,
        },
    });
    // Page header caption elements scrolling effect
    if ($(".ph-categories").length) {
        $(".ph-categories").wrapInner('<div class="ph-cat-parallax"></div>');
        tlPhParallax.to(".ph-cat-parallax", { y: -80 }, 0);
    }
    if ($(".ph-caption-title").length) {
        $(".ph-caption-title").wrapInner('<div class="ph-title-parallax"></div>');
        tlPhParallax.to(".ph-title-parallax", { y: -40 }, 0);
    }
    if ($(".ph-caption-subtitle").length) {
        $(".ph-caption-subtitle").wrapInner(
            '<div class="ph-subt-parallax"></div>'
        );
        tlPhParallax.to(".ph-subt-parallax", { y: -10 }, 0);
    }
    if ($(".ph-caption-title-ghost").length) {
        $(".ph-caption-title-ghost").wrapInner(
            '<div class="ph-ghost-parallax"></div>'
        );
        tlPhParallax.to(".ph-ghost-parallax", { y: 40 }, 0);
    }

    // Page header image scrolling effect
    if ($(".ph-image").length) {
        if ($("#page-header").hasClass("ph-bg-image")) {
            tlPhParallax.to(".ph-image-inner", { yPercent: 30, scale: 1.05 }, 0);
        } else {
            tlPhParallax.to(".ph-image-inner", { yPercent: -20 }, 0);
        }
    }
}


const textScrollHorizontal = {
    init: function() {
        this.textScrollHorizontal();
    },

    textScrollHorizontal: function() {
        // Hover scrolling speed.
    $(".service-animation-flowing-slice").each(function () {
        var $tt_stSpeed = $(this).data("scroll-speed");
        $(this)
            .find(".flow-animationp-text.to-right")
            .css({
                "animation-duration": $tt_stSpeed + "s",
            });
    });


    // Hover scrolling speed.
    $(".technology-carousel-auto").each(function () {
        var $tt_stSpeed = $(this).data("scroll-speed");
        $(this)
            .find(".automation-scroll")
            .css({
                "animation-duration": $tt_stSpeed + "s",
            });
    });

    // Hover scrolling speed.
    $(".animation-flowing-slice").each(function () {
        var $tt_stSpeed = $(this).data("scroll-speed");
        $(this)
            .find(".flow-animationp-text")
            .css({
                "animation-duration": $tt_stSpeed + "s",
            });
    });
    }
}
const mouseMoveOnPage = {
    init: function() {
        this.mouseMoveOnPage();
    },

    mouseMoveOnPage: function() {
        if ($("body").hasClass("tt-magic-cursor")) {
        
            gsap.set($ball, {
                // scale from middle and style ball
                xPercent: -50,
                yPercent: -50,
                width: $ballWidth,
                height: $ballHeight,
                borderWidth: $ballBorderWidth,
                opacity: $ballOpacity,
            });
        
            document.addEventListener("mousemove", mouseMove);
        
            function mouseMove(e) {
                $mouse.x = e.clientX;
                $mouse.y = e.clientY;
            }
        
            gsap.ticker.add(updatePosition);
        
            function updatePosition() {
                if (!$active) {
                    $pos.x += ($mouse.x - $pos.x) * $ratio;
                    $pos.y += ($mouse.y - $pos.y) * $ratio;
        
                    gsap.set($ball, { x: $pos.x, y: $pos.y });
                }
            }
        
            // Magic cursor behavior
            // ======================
            // Page nav hover.
            $(".tt-page-nav").each(function () {
                if ($(this).find(".tt-pn-image").length) {
                    $(this)
                        .find(".tt-pn-link")
                        .on("mouseenter mouseover", function () {
                            $("#magic-cursor").addClass("tt-pn-hover-on");
                            $(this).parent().find(".tt-pn-image").appendTo($ball);
                            gsap.to($ball, {
                                duration: 0.3,
                                width: "20vw",
                                height: "20vw",
                                opacity: 1,
                            });
                        })
                        .on("mouseleave", function () {
                            $("#magic-cursor").removeClass("tt-pn-hover-on");
                            $ball.find(".tt-pn-image").appendTo(this);
                            gsap.to($ball, {
                                duration: 0.3,
                                width: $ballWidth,
                                height: $ballHeight,
                                opacity: $ballOpacity,
                            });
        
                            $(this)
                                .parent()
                                .find(".tt-pn-image video")
                                .each(function () {
                                    $(this).get(0).pause();
                                });
                        });
                    $(this).find(".tt-pn-link").addClass("not-hide-cursor");
                } else {
                    $(this).find(".tt-pn-link").removeClass("not-hide-cursor");
                }
            });
        
            // Page nav hover.
            $(".tt-page-nav").each(function () {
                if ($(this).find(".tt-pn-image").length) {
                    $(this)
                        .find(".tt-pn-link")
                        .on("mouseenter mouseover", function () {
                            $("#magic-cursor").addClass("tt-pn-hover-on");
                            $(this).parent().find(".tt-pn-image").appendTo($ball);
                            gsap.to($ball, {
                                duration: 0.3,
                                width: "20vw",
                                height: "20vw",
                                opacity: 1,
                            });
                        })
                        .on("mouseleave", function () {
                            $("#magic-cursor").removeClass("tt-pn-hover-on");
                            $ball.find(".tt-pn-image").appendTo(this);
                            gsap.to($ball, {
                                duration: 0.3,
                                width: $ballWidth,
                                height: $ballHeight,
                                opacity: $ballOpacity,
                            });
        
                            $(this)
                                .parent()
                                .find(".tt-pn-image video")
                                .each(function () {
                                    $(this).get(0).pause();
                                });
                        });
                    $(this).find(".tt-pn-link").addClass("not-hide-cursor");
                } else {
                    $(this).find(".tt-pn-link").removeClass("not-hide-cursor");
                }
            });
        
        
            $(".portfolio-grid-item").each(function () {
                $(this)
                    .on("mouseenter", function () {
                        $ball.append('<div class="ball-view"></div>');
                        $(".ball-view").append($(this).data("cursor"));
                        gsap.to(ball, { duration: 0.3, yPercent: -75, width: 95, height: 95, opacity: 1, borderWidth: 0, backgroundColor: "#F58220", color : "#FFF"});
                        gsap.to(".ball-view", { duration: 0.3, scale: 1, autoAlpha: 1 });
                    })
                    .on("mouseleave", function () {
                        gsap.to(ball, { duration: 0.3, yPercent: -50, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity, borderWidth: $ballBorderWidth, backgroundColor: "#F58220" });
                        gsap.to(".ball-view", { duration: 0.3, scale: 0, autoAlpha: 0, clearProps:"all" });
                        $ball.find(".ball-view").remove();
                    });
                $(this).addClass("not-hide-cursor");
            });
        
            $(".accordion-list li").each(function () {
                $(this)
                    .on("mouseenter", function () {
                        $ball.append('<div class="ball-view"></div>');
                        if (!$(this).hasClass("active")) {
                            $(".ball-view").append($(this).data("cursor"));
                            gsap.to(ball, { duration: 0.3, yPercent: -75, width: 95, height: 95, opacity: 1, borderWidth: 0, backgroundColor: "#F58220", color : "#FFF"});
                            gsap.to(".ball-view", { duration: 0.3, scale: 1, autoAlpha: 1 });
                        } else {
                            gsap.to(ball, { duration: 0.3, yPercent: -50, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity, borderWidth: $ballBorderWidth, backgroundColor: "#F58220" });
                            gsap.to(".ball-view", { duration: 0.3, scale: 0, autoAlpha: 0, clearProps:"all" });
                            $ball.find(".ball-view").remove();
                        }
                    })
                    .on("mouseleave", function () {
                        gsap.to(ball, { duration: 0.3, yPercent: -50, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity, borderWidth: $ballBorderWidth, backgroundColor: "#F58220" });
                        gsap.to(".ball-view", { duration: 0.3, scale: 0, autoAlpha: 0, clearProps:"all" });
                        $ball.find(".ball-view").remove();
                    });
                $(this).addClass("not-hide-cursor");
            });
        
            // Show/hide magic cursor
            // =======================
            // Show/hide on document leave/enter.
            $(document)
                .on("mouseleave", function () {
                    gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 0 });
                })
                .on("mouseenter", function () {
                    gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 1 });
                });
        
            // Show as the mouse moves.
            $(document).mousemove(function () {
                gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 1 });
            });
        }
    }
}


const accordionContent = {
    init: function() {
        this.accordionContent();
    },
    accordionContent: function() {
        $(document).on('click', '.animated-accordion .accordion-sections li .accordion-header', function (e) {
            e.preventDefault();
            var parent = $(this).closest('li');
            var section = $(this).closest('.animated-accordion')
            if (!parent.is('.active')) {
                var image_section = section.find('.accordion-image-wrap');
                image_section.find('.active').removeClass('active');
                image_section.find('.image-slide[data-index=' + parent.attr('data-index') + ']').addClass('active');

                section.find('.accordion-sections .active').removeClass('active').find('.acc-content').slideUp(400);
                parent.addClass('active').find('.acc-content').slideDown(400);
                gsap.to(ball, { duration: 0.3, yPercent: -50, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity, borderWidth: $ballBorderWidth, backgroundColor: "#F58220" });
                gsap.to(".ball-view", { duration: 0.3, scale: 0, autoAlpha: 0, clearProps:"all" });
                $ball.find(".ball-view").remove();

            }

        });
    }

}


// =======================================================================================
// Smooth Scrollbar
// Source: https://github.com/idiotWu/smooth-scrollbar/
// =======================================================================================

// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// // create the smooth scroller FIRST!
// const smoother = ScrollSmoother.create({
//  wrapper: "#body-inner",
//  content: "#scroll-container",
//  smooth: 1,
//  normalizeScroll: false, // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
//  ignoreMobileResize: true, // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
//  effects: true,
//  preventDefault: true
// });

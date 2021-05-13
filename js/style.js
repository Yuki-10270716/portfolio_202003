document.addEventListener("DOMContentLoaded", function() {
    var body = document.querySelector("body");

    /*page animation*/
    var a = document.querySelectorAll("a:not([href^='#']):not([mailto]):not([target])");
    body.classList.remove("js-page-animation");
    for(var i = 0;i < a.length;i++) {
        a[i].addEventListener("click", function(e) {
            e.preventDefault();
            var url = this.getAttribute("href");
            if (url !== "") {
                body.classList.add("js-page-animation");
                setTimeout(function() {
                    window.location = url;
                }, 800);
            }
            return false;
        });
    }

    /*mv animation*/
    var mv = document.querySelector(".mv");
    mv.classList.add("is-animate");

    /*mouse stolker*/
    var follower = document.getElementById("js-mouse-stolker__follower"),
        cursor = document.getElementById("js-mouse-stolker__cursor"),
        setPointer = document.querySelectorAll("a"),
        posX = 0,
        posY = 0,
        mouseX = 0,
        mouseY = 0;
    TweenMax.to({}, 0.02, {
        repeat: -1,
        onRepeat: function() {
            posX += (mouseX - posX) / 9;
            posY += (mouseY - posY) / 9;
            TweenMax.set(follower, {
                css: {
                    top: posY - 20,
                    left: posX - 20
                }
            });
            TweenMax.set(cursor, {
                css: {
                    top: mouseY,
                    left: mouseX
                }
            });
        }
    });
    window.addEventListener("mousemove", function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
    });
    for (var i = 0; i < setPointer.length; i++) {
        setPointer[i].addEventListener("mouseenter", function() {
            follower.classList.add("is-active");
        });
        setPointer[i].addEventListener("mouseleave", function() {
            follower.classList.remove("is-active");
        });
    }

    window.addEventListener("scroll", function() {
        /*sticky header*/
        var header = document.querySelector(".header"),
            headerOffsetTop = header.getBoundingClientRect().top;
        if (window.pageYOffset > headerOffsetTop) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }

        /*scroll animation*/
        var scrollAnimationElm = document.getElementsByClassName("js-animate");
        for(var i = 0; i < scrollAnimationElm.length; i++) {
            if (window.innerHeight > scrollAnimationElm[i].getBoundingClientRect().top + 200) {
              scrollAnimationElm[i].classList.add("is-animate");
            }
        }
    });

    /* hamburgermenu*/
    var btn = document.getElementById("js-btn-hamburger");
    btn.addEventListener("click", function() {
        body.classList.toggle("is-menu-open");
        if (btn.getAttribute("aria-expanded") == "false") {
            this.setAttribute("aria-expanded", true);
        } else {
            this.setAttribute("aria-expanded", false);
        }
    });

    /* hamburgermenu内でanchorlinkをクリックした時の処理 */
    var anchor = document.querySelector("a[href^='#contact']");
    anchor.addEventListener("click", function() {
        body.classList.remove("is-menu-open");
        btn.setAttribute("aria-expanded", false);
    });

    /*smooth scroll*/
    var target = document.querySelector("a[href^='#']");
    target.addEventListener("click", function(e) {
        var target = document.querySelector(e.target.getAttribute("href")),
            position = target.getBoundingClientRect().top + window.scrollY;
        e.preventDefault();
        window.scrollTo({
            top: position,
            behavior: "smooth"
        });
    });
});
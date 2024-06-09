document.addEventListener("DOMContentLoaded", function() {
    const activeItemIndicator = CSSRulePlugin.getRule(".menu-item p.active::after");
    const toggleButton = document.querySelector(".burguer");
    const menu = document.querySelector(".overmenu");
    let isOpen = false;

    gsap.set(".menu-item p", { y: 225 });

    const timeline = gsap.timeline({ paused: true });

    timeline.to(".overlay", {
        duration: 1.5,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4.inOut"
    });

    timeline.to(".menu-item p", {
        duration: 1.5,
        y: 0,
        stagger: 0.2,
        ease: "power4.out"
    }, "-=1");

    timeline.to(activeItemIndicator, {
        width: "100%",
        duration: 1,
        ease: "power4.out",
        delay: 0.5
    }, "<");

    timeline.to(".sub-nav", {
        bottom: "10%",
        opacity: 1,
        duration: 0.5,
        delay: 0.5
    }, "<");

    toggleButton.addEventListener("click", function() {
        toggleMenu();
    });

    function toggleMenu() {
        if (isOpen) {
            timeline.reverse();
            menu.classList.remove("open");
            toggleButton.classList.remove("active");
        } else {
            timeline.play();
            menu.classList.add("open");
            toggleButton.classList.add("active");
        }
        isOpen = !isOpen;
    }

    // Set the initial active menu item based on the current page
    const activeMenuItem = localStorage.getItem('activeMenuItem') || 'inicio';
    setActiveMenuItem(activeMenuItem);
});

function setActiveMenuItem(id) {
    document.querySelectorAll('.menu-item p').forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
    localStorage.setItem('activeMenuItem', id);
}

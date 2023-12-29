/* When arrow button is clicked for project container, it shows the text description */ 
let projectContainers = document.getElementsByClassName("project-container");
let projectImages = document.getElementsByClassName("project-image");
let arrows = document.getElementsByClassName("arrow");
let projectDescriptions = document.getElementsByClassName("project-description");
let projectIcons = document.getElementsByClassName("link-project");
let hoveringOverIcons = [];

// Lightbox Effect for all projects
for (let i = 0; i < projectContainers.length; i++) {
    projectContainers[i].clicked = false;
    projectContainers[i].onclick = () => {
        toggleLightBox(i);
    }
}


// Link Icons

// 0th project has no hover icon, [false, _, _, _]
hoveringOverIcons.push(false);

// Go through all the projects that have link icons (3)
for (let i = 0; i < projectIcons.length; i++) { 
    hoveringOverIcons.push(false);
    // projectIcons[0] --> the 1st project becuase 0th project has no icon
    // projectIcons[1] --> the 2nd project becuase 0th project has no icon, etc.
    projectIcons[i].onmouseenter = () => {
        hoveringOverIcons[i + 1] = true;
    }
    projectIcons[i].onmouseout = () => {
        hoveringOverIcons[i + 1] = false;
    }
}

// projectContainers = [project0, project1, project2, project3]
// projectIcons = [linkProject1, linkProject2, linkProject3]
// hoveringOverIcons = [false, _, _, _]

// projectNumber refers to projectContainers + hoveringOverIcons index at the same time
function toggleLightBox(projectNumber) {
    if (!hoveringOverIcons[projectNumber]) {
        arrows[projectNumber].classList.toggle("flip");
        projectImages[projectNumber].classList.toggle("light-opacity");
        projectContainers[projectNumber].clicked = !projectContainers[projectNumber].clicked;
        if (projectContainers[projectNumber].clicked) {
            fadeTextIn(projectNumber);
        } else {
            fadeTextOut(projectNumber);
        }
    }
}

function fadeTextIn(projectNumber) {
    projectDescriptions[projectNumber].animate(
        [ 
            {transform: 'translate(-50%, 50px)', opacity: 0},
            {transform: 'translate(-50%, 0px)', opacity: 1}
        ], {
            duration: 500,
            easing: 'ease-out',
            fill: 'forwards'
        }
    );
}

function fadeTextOut(projectNumber) {
    projectDescriptions[projectNumber].animate(
        [ 
            {transform: 'translate(-50%, 0px)', opacity: 1},
            {transform: 'translate(-50%, 50px)', opacity: 0}
        ], {
            duration: 500,
            easing: 'ease-out',
            fill: 'forwards'
        }
    );
}




/*Only adds smooth scrolling after the nav bar is clicked so when reload, page stays put*/ 
let pageNavBar = document.querySelector("#page-navigation");
let htmlDoc = document.querySelector("html");

pageNavBar.onclick = addScrollBehavior;

function addScrollBehavior() {
    htmlDoc.classList.add("smooth-scrolling");
}


/*Scroll fading animations*/

/*containers that fade in from the left*/ 
let containerListLeft = document.getElementsByClassName("left-fade");
let containerListRight = document.getElementsByClassName("right-fade");
let body = document.querySelector("body");

/*
true when the container has been faded into the screen
*/
for (let i = 0; i < containerListLeft.length; i++) {
    containerListLeft[i].fadedIn = false;
}

for (let i = 0; i < containerListRight.length; i++) {
    containerListRight[i].fadedIn = false;
}

document.addEventListener('scroll', checkScroll);

/*when reload + loading screen comes up, calling this function automatically makes sure that  
the content will be present when the loading screen fades out, rather than waiting until the 
user scrolls to display something, even when it would normally be displayed*/
checkScroll();

function checkScroll() {
    for (let i = 0; i < containerListLeft.length; i++) {
        if (window.scrollY >= calculateScrollFromTop(containerListLeft[i])) {
            if (!containerListLeft[i].fadedIn) {
                containerListLeft[i].fadedIn = true;
                fadeInLeft(i);
            }
        } else {
            if (containerListLeft[i].fadedIn) {
                containerListLeft[i].fadedIn = false;
                fadeOutLeft(i);
            }
        }
    }
    for (let i = 0; i < containerListRight.length; i++) {
        if (window.scrollY >= calculateScrollFromTop(containerListRight[i])) {
            if (!containerListRight[i].fadedIn) {
                containerListRight[i].fadedIn = true;
                fadeInRight(i);
            }
        } else {
            if (containerListRight[i].fadedIn) {
                containerListRight[i].fadedIn = false;
                fadeOutRight(i);
            }
        }
    }
}

/* the greater than constant (0.8), the earlier the containers fade in and the later that
the containers fade out*/
function calculateScrollFromTop(container) {
    return container.getBoundingClientRect().top - body.getBoundingClientRect().top - 0.8 * window.innerHeight;
}

function fadeInLeft(listNumber) {
    containerListLeft[listNumber].animate(
        [
            {transform: 'translateX(-50px)', opacity: 0},
            {transform: 'translateX(0px)', opacity: 1}
        ], {
            duration: 500,
            easing: 'ease-out',
            fill: 'forwards'
        }
    );
}

function fadeOutLeft(listNumber) {
    containerListLeft[listNumber].animate(
        [
            {transform: 'translateX(0px)', opacity: 1},
            {transform: 'translateX(-50px)', opacity: 0}
        ], {
            duration: 500,
            easing: 'ease-in',
            fill: 'forwards'
        }
    );
}

function fadeInRight(listNumber) {
    containerListRight[listNumber].animate(
        [
            {transform: 'translateX(50px)', opacity: 0},
            {transform: 'translateX(0px)', opacity: 1}
        ], {
            duration: 500,
            easing: 'ease-out',
            fill: 'forwards'
        }
    );
}

function fadeOutRight(listNumber) {
    containerListRight[listNumber].animate(
        [
            {transform: 'translateX(0px)', opacity: 1},
            {transform: 'translateX(50px)', opacity: 0}
        ], {
            duration: 500,
            easing: 'ease-in',
            fill: 'forwards'
        }
    );
}



/* making the courseworkcontainer and languagecontainer the same height if the viewport width is 
greater than 820px; when <= 820px, the layout goes to one column so same height is no longer necessary, so 
recalculate the height of languageContainer when the screen is resized (recalculates to auto)*/
let courseworkContainer = document.getElementById("coursework-container");
let languageContainer = document.getElementById("languages-container");

//must load the element first so the clientHeight attribute it accurately updated
window.addEventListener("load", recalculateLangContainerHeight);
window.addEventListener('resize', recalculateLangContainerHeight);

function recalculateLangContainerHeight() {
    if (window.innerWidth > 820) {
        languageContainer.style.height = courseworkContainer.clientHeight - 15 +  "px";
    } else {
        languageContainer.style.height = "auto";
    }
}

let logoDescriptionLines = document.getElementsByClassName("logo-description-dividing-line");
let descriptions = document.getElementsByClassName("description-section");
window.addEventListener('load', recalculateLineHeight);
window.addEventListener('resize', recalculateLineHeight);

function recalculateLineHeight() {
    if (window.innerWidth > 820) {
        for (let i = 0; i < logoDescriptionLines.length; i++) {
            logoDescriptionLines[i].style.height = "" + descriptions[i].clientHeight + "px";
        }
    } else {
        for (let i = 0; i < logoDescriptionLines.length; i++) {
            logoDescriptionLines[i].style.height = "2px";
        }
    }
}

/* recalculating height of about me page when resize occurs, so that the gray background will always 
cover the entire height of the elements on the about me page, since the life graphics and life description
are absolutely positioned and not included in the flow of the page (useful if life description is longer than the cs
description*/
recalculateMiddlePageHeight();
window.addEventListener('resize', recalculateMiddlePageHeight);

function recalculateMiddlePageHeight() {
    let aboutMeHeader = document.getElementById("about-me-header");
    //gets the paragraph that has a bottom that is lower on the page
    let finalParagraph = getLowerElement(document.getElementById("cs-description"), document.getElementById("life-description"));
    let containerHeight = bottomAbsoluteYDistFromTop(finalParagraph) - topAbsoluteYDistFromTop(aboutMeHeader) + 80;
    let middlePage = document.getElementById("about-me");
    middlePage.style.height = containerHeight + "px";

    //adjust the line height based on how tall the finalParagraph is (hidden once 820px is hit)
    adjustLineHeight(finalParagraph);
}

function adjustLineHeight(finalParagraph) {
    let line = document.getElementById("dividing-line");
    //line is height of finalParagraph + 10px additional
    line.style.height = finalParagraph.clientHeight + 10 + "px";
}


function getLowerElement(object1, object2) {
    if (bottomAbsoluteYDistFromTop(object1) > bottomAbsoluteYDistFromTop(object2)) {
        return object1;
    }
    return object2;
}

//gets the totalY dist of an object's top from the top of the page
function topAbsoluteYDistFromTop(object) {
    return object.getBoundingClientRect().top - body.getBoundingClientRect().top;
}

//gets the totalY dist of an object's bottom from the top of the page
function bottomAbsoluteYDistFromTop(object) {
    return object.getBoundingClientRect().bottom - body.getBoundingClientRect().top;
}

//for homepage text
function typeItAnimation() {
    new TypeIt("#hero-text", {
        speed: 40,
        loop: false,
        afterComplete: function (step, instance) {
            instance.destroy();
        }
    }).go();
}

/*loading screen handling */
let loadingScreen = document.querySelector(".loading-screen");
let heroText = document.getElementById("hero-text");
window.onload = transitionToMainScreen;

//waits additional 500 milliseconds after loading
function transitionToMainScreen() {
    setTimeout(animateClosingScreen, 500);
}


function animateClosingScreen() {
    //adds back the scroll bar
    document.querySelector("html").classList.add("scroll-bar");
    //hidden until typeItAnimation() is called
    heroText.style.display = "none";
    //animates the hiding of loading screen (opacity change)
    loadingScreen.classList.add("hide");
}

loadingScreen.addEventListener("animationend", switchToMainScreen);

//executes once animation of loading screen fading ends
function switchToMainScreen() {
    loadingScreen.style.display = "none";
    heroText.style.display = "block";
    //typeItAnimation called after the loading screen is gone
    typeItAnimation();
}

/* hamburger menu for smaller screen sizes/mobile*/
let hamburgerIcon = document.getElementById("hamburger-icon");
let menu = document.querySelector(".menu");
//opens menu
hamburgerIcon.onclick = openMenu;


function openMenu() {
    //adds cancel icon to view
    document.getElementById("cancel-icon").style.display = "block";
    menu.classList.remove("closing-animation");
    menu.classList.add("opening-animation");
}

function closeMenu() {
    //removes cancel icon from view
    document.getElementById("cancel-icon").style.display = "none";
    menu.classList.remove("opening-animation");
    menu.classList.add("closing-animation");
}

//closes menu
document.getElementById("home-link-hamburger").onclick = closeMenu;
document.getElementById("about-link-hamburger").onclick = closeMenu;
document.getElementById("experience-link-hamburger").onclick = closeMenu;
document.getElementById("cancel-icon").onclick = closeMenu;

/*when open hamburger menu because width < 480px / height < 450px and then resize
window to where there should not be hamburger menu, menu still shows;
this removes the hamburger menu from view; shouldn't contain "opening-animation" if width
>480px/height>450px because shouldn't be hamburger menu to begin with*/

window.addEventListener('resize', removeHamburgerMenu);

function removeHamburgerMenu() {
    /*if either one: width >480 / height >450 is false, then the hamburger icon will be displayed in css because 
    of queries, so will continue to display the opening animation here as well; both must be
    true in order for the hamburger icon to be removed*/
    if (window.innerWidth > 480 && window.innerHeight > 450 && menu.classList.contains("opening-animation")) {
        menu.classList.remove("opening-animation");
    }
}

particlesJS("particles-about", {
    particles: {
        number: { value: 20, density: { enable: true, value_area: 800 } },
        color: { value: "#000000" },
        shape: {
        type: "circle",
        stroke: { width: 0, color: "#f0f0f0" },
        polygon: { nb_sides: 5 },
        image: { src: "img/github.svg", width: 100, height: 100 }
        },
        opacity: {
        value: 1,
        random: false,
        anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
        value: 3,
        random: true,
        anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
        },
        line_linked: {
        enable: false,
        distance: 150,
        color: "#000000",
        opacity: 0.3,
        width: 1
        },
        move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: false, mode: "push" },
        resize: true
        },
        modes: {
        grab: { distance: 400, line_linked: { opacity: 1 } },
        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 }
        }
    },
    retina_detect: true
});


particlesJS("particles-experience", {
    particles: {
        number: { value: 20, density: { enable: true, value_area: 800 } },
        color: { value: "#000000" },
        shape: {
        type: "circle",
        stroke: { width: 0, color: "#f0f0f0" },
        polygon: { nb_sides: 5 },
        image: { src: "img/github.svg", width: 100, height: 100 }
        },
        opacity: {
        value: 1,
        random: false,
        anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
        value: 3,
        random: true,
        anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
        },
        line_linked: {
        enable: false,
        distance: 150,
        color: "#000000",
        opacity: 0.3,
        width: 1
        },
        move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: false, mode: "push" },
        resize: true
        },
        modes: {
        grab: { distance: 400, line_linked: { opacity: 1 } },
        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 }
        }
    },
    retina_detect: true
});

// Alternative left and right fades for work containers
workContainers = document.getElementsByClassName("work-container");
for (let i = 0; i < workContainers.length; i++) {
    let fadeToAdd = i % 2  == 0 ? "left-fade" : "right-fade";
    workContainers[i].classList.add(fadeToAdd)
}
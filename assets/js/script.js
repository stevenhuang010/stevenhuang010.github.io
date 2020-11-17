/*When arrow button is clicked for project container, it shows the text description*/ 
let projectImages = document.getElementsByClassName("project-image");
let arrows = document.getElementsByClassName("arrow");
let projectDescriptions = document.getElementsByClassName("project-description");
let projectContainers = document.getElementsByClassName("project-container");
/*
2 project descriptions / image
*/
function toggleLightBox(projectNumber) {
    arrows[projectNumber].classList.toggle("flip");
    projectImages[projectNumber].classList.toggle("light-opacity");
    projectContainers[projectNumber].clicked = !projectContainers[projectNumber].clicked;
    if (projectContainers[projectNumber].clicked) {
        fadeTextIn(projectNumber);
    } else {
        fadeTextOut(projectNumber);
    }
}

function fadeTextOut(projectNumber) {
    projectDescriptions[2 * projectNumber].animate(
        [ 
            {transform: 'translate(-50%, 0px)', opacity: 1},
            {transform: 'translate(-50%, 50px)', opacity: 0}
        ], {
            duration: 500,
            easing: 'ease-out',
            fill: 'forwards'
        }
    );
    projectDescriptions[2 * projectNumber + 1].animate(
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

function fadeTextIn(projectNumber) {
    projectDescriptions[2 * projectNumber].animate(
        [ 
            {transform: 'translate(-50%, 50px)', opacity: 0},
            {transform: 'translate(-50%, 0px)', opacity: 1}
        ], {
            duration: 500,
            easing: 'ease-out',
            fill: 'forwards'
        }
    );
    projectDescriptions[2 * projectNumber + 1].animate(
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

for (let i = 0; i < projectContainers.length; i++) {
    projectContainers[i].clicked = false;
    projectContainers[i].onclick = function() {
        toggleLightBox(i);
    }
}


/*Only adds smooth scrolling after the nav bar is clicked so when reload, page stays put*/ 
let pageNavBar = document.querySelector("#page-navigation");

function addScrollBehavior() {
    let doc = document.querySelector("html");
    doc.classList.add("smooth-scrolling");
}

pageNavBar.onclick = addScrollBehavior;

/*scroll animations*/

/*
true when the container has been faded into the screen
*/

let containerListLeft = document.getElementsByClassName("left-fade");
let containerListRight = document.getElementsByClassName("right-fade");
let containerListUp = document.getElementsByClassName("up-fade");
let body = document.querySelector("body");
let viewportHeight = window.innerHeight;

for (let i = 0; i < containerListLeft.length; i++) {
    containerListLeft[i].fadedIn = false;
}

for (let i = 0; i < containerListRight.length; i++) {
    containerListRight[i].fadedIn = false;
}

for (let i = 0; i < containerListUp.length; i++) {
    containerListUp.fadedIn = false;
}
document.addEventListener('scroll', checkScroll);


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
    for (let i = 0; i < containerListUp.length; i++) {
        if (window.scrollY > calculateScrollFromTop(containerListUp[i])) {
            if (!containerListUp[i].fadedIn) {
                containerListUp[i].fadedIn = true;
                fadeInUp(i);
            }
        } else {
            if (containerListUp[i].fadedIn) {
                containerListUp[i].fadedIn = false;
                fadeOutUp(i);
            }
        }
    }
}

function calculateScrollFromTop(container) {
    return container.getBoundingClientRect().top - body.getBoundingClientRect().top - 0.8 * viewportHeight;
}


/*
greater constant, opens up earlier and fades later
*/
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

function fadeInUp(listNumber) {
    containerListUp[listNumber].animate(
        [ 
            {transform: 'translateY(50px)', opacity: 0},
            {transform: 'translateY(0px)', opacity: 1}
        ], {
            duration: 500,
            easing: 'ease-out',
            fill: 'forwards'
        }
    );
}

function fadeOutUp(listNumber) {
    containerListUp[listNumber].animate(
        [ 
            {transform: 'translateY(0px)', opacity: 1},
            {transform: 'translateY(50px)', opacity: 0}
        ], {
            duration: 500,
            easing: 'ease-in',
            fill: 'forwards'
        }
    );
}

//for reculating height of box whenever resize occurs for abs positioned elements, may omit if use relative positioning in 1-col layout,
//good for 1 time use when seeing if text too big for vh though
recalculateHeight();
window.addEventListener('resize', recalculateHeight);

function recalculateHeight() {
    let firstHeader = document.querySelector("h1");
    let finalPMiddle = document.getElementById("cs-description");
    let containerHeight = bottomAbsoluteYDistFromTop(finalPMiddle) - topAbsoluteYDistFromTop(firstHeader) + 80;
    let middlePage = document.getElementById("about-me");
    middlePage.style.height = containerHeight + "px";
}

function topAbsoluteYDistFromTop(object) {
    return object.getBoundingClientRect().top - body.getBoundingClientRect().top;
}

function bottomAbsoluteYDistFromTop(object) {
    return object.getBoundingClientRect().bottom - body.getBoundingClientRect().top;
}

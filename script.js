const track = document.getElementById("slider");
const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;
const screenWidth = window.screen.width;
let multiplier = -100;
if (screenWidth <= 768) {
  multiplier = -10
}
const handleOnUp = () => {
track.dataset.mouseDownAt = "0";  
track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
if(track.dataset.mouseDownAt === "0") return;

const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
maxDelta = window.innerWidth / 2;

const percentage = (mouseDelta / maxDelta) * multiplier,
nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

track.dataset.percentage = nextPercentage;

track.animate({
transform: `translate(${nextPercentage}%, -50%)`
}, { duration: 1200, fill: "forwards" });

for(const image of track.getElementsByClassName("slide")) {
image.animate({
objectPosition: `${100 + nextPercentage}% center`
}, { duration: 1200, fill: "forwards" });
}
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

document.getElementById("slider").onmousemove = e => {
  for(const card of document.getElementsByClassName("slide-container")) {
    const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };
}
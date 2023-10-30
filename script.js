const track = document.getElementById("slider");
console.log(document.activeElement)
const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
track.dataset.mouseDownAt = "0";  
track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
if(track.dataset.mouseDownAt === "0") return;

const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
maxDelta = window.innerWidth / 2;

const percentage = (mouseDelta / maxDelta) * -100,
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


// Function to check if an element is in the viewport by ID
function isElementWithIdInViewport(id) {
    const element = document.getElementById(id);
  
    if (element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    return false; // Element with the provided ID not found
  }
  
  // Function to handle the scroll event
  function handleScroll() {
    // Check if the element with ID "view" is in the viewport
    const isViewVisible = isElementWithIdInViewport("view");
  
    if (isViewVisible) {
      console.log('Element with ID "view" is currently visible on the screen.');
      document.getElementById('view').style.backgroundColor = "red";
    } else {
      console.log('Element with ID "view" is not visible on the screen.');
    }
  }
  
  // Add a scroll event listener to the document
  document.addEventListener('scroll', handleScroll);
  
  // Trigger the initial check when the page loads
  handleScroll();
  
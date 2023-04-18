// content.js


const popup = document.createElement('div');

// Create the animated circle
/*
const animatedCircle = document.createElement('div');
animatedCircle.style.width = '50px';
animatedCircle.style.height = '50px';
animatedCircle.style.borderRadius = '50%';
animatedCircle.style.position = 'fixed';
animatedCircle.style.bottom = '20px';
animatedCircle.style.right = '20px';
animatedCircle.style.zIndex = '1000';
animatedCircle.style.backgroundColor = '#FFFFFF';
animatedCircle.style.border = '1px solid #ccc';
animatedCircle.style.backgroundImage = 'url("path/to/siri-like-animation.gif")';
animatedCircle.style.backgroundSize = 'cover';
animatedCircle.style.cursor = 'pointer';
document.body.appendChild(animatedCircle);
*/

const animatedCircle = document.createElement('canvas');
animatedCircle.width = window.innerWidth;
animatedCircle.height = window.innerHeight;
animatedCircle.style.width = '50px';
animatedCircle.style.height = '50px';
animatedCircle.style.position = 'fixed';
animatedCircle.style.bottom = '20px';
animatedCircle.style.right = '20px';
animatedCircle.style.zIndex = '9999999999999999999';
animatedCircle.style.cursor = 'pointer';

document.body.appendChild(animatedCircle);

const ctx = animatedCircle.getContext('2d');

class Circle {
    constructor(x, y, radius, color, offset) {
      this.x = x;
      this.y = y;
      this.baseRadius = radius;
      this.radius = radius;
      this.color = color;
      this.opacity = 1;
      this.offset = offset;
    }
  
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
      ctx.closePath();
    }
  }
  
  const circles = [];
  const colors = ['74, 144, 226', '80, 227, 194', '245, 166, 35', '184, 233, 134'];
  const centerX = animatedCircle.width / 2;
  const centerY = animatedCircle.height / 2;
  
  for (let i = 0; i < 4; i++) {
    const radius = 400 + i * 10;
    circles.push(new Circle(centerX, centerY, radius, colors[i], i * 0.15));
  }
  
  let scaleFactor = 1;
  let scaleDirection = 1;
  const minScaleFactor = 0.8;
  const maxScaleFactor = 1.2;
  const scaleFactorStep = 0.005;
  
  function animate() {
    ctx.clearRect(0, 0, animatedCircle.width, animatedCircle.height);
  
    scaleFactor += scaleFactorStep * scaleDirection;
    if (scaleFactor < minScaleFactor || scaleFactor > maxScaleFactor) {
      scaleDirection *= -1;
    }
  
    circles.forEach((circle, index) => {
      const scale = scaleFactor + circle.offset;
      circle.radius = circle.baseRadius * scale;
      circle.opacity = 1 - (scale - minScaleFactor) / (maxScaleFactor - minScaleFactor);
      circle.draw();
    });
  
    requestAnimationFrame(animate);
  }
  
  animate();








// Create the popup box
const popupBox = document.createElement('div');
popupBox.style.display = 'none';
popupBox.style.width = '300px';
popupBox.style.height = 'auto';
popupBox.style.backgroundColor = '#fff';
popupBox.style.border = '1px solid #ccc';
popupBox.style.borderRadius = '5px';
popupBox.style.padding = '10px';
popupBox.style.position = 'fixed';
popupBox.style.bottom = '80px';
popupBox.style.right = '20px';
popupBox.style.zIndex = '1001';
document.body.appendChild(popupBox);

// Close button for the popup box
const closeButton = document.createElement('button');
closeButton.innerText = 'Close';
closeButton.style.position = 'absolute';
closeButton.style.top = '0px';
closeButton.style.right = '5px';
closeButton.style.background = 'none';
closeButton.style.border = 'none';
closeButton.style.fontSize = '14px';
closeButton.style.cursor = 'pointer';
popupBox.appendChild(closeButton);
// Function to handle click event on the animated circle
animatedCircle.addEventListener('click', async () => {
    const mainContent = document.querySelector('body').innerText;
    try {
        chrome.runtime.sendMessage({ content: 'Please give me a summary of this: ' + mainContent });
    } catch (error) {
      console.error('Error:', error);
    }
  });
  
  // Function to handle click event on the close button
  closeButton.addEventListener('click', () => {
    popupBox.style.display = 'none';
  });


  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    console.log('Response from the Service Worker',request, sender);

    if(request.method === 'summary-response') {
        popupBox.innerHTML = request.message;
      popupBox.appendChild(closeButton);
      popupBox.style.display = 'block';
    } else if (request.method === 'highlighed-definition') {
    const { x, y, width, height } = window.getSelection().getRangeAt(0).getBoundingClientRect();
      popup.style.left = `${x + width / 2}px`;
      popup.style.top = `${y - height}px`;

      popup.textContent = request.message;
      popup.appendChild(closeButton);
      popup.style.display = 'block';
    }
  });



  popup.style.display = 'none';
  popup.style.position = 'fixed';
  popup.style.zIndex = '9999';
  popup.style.padding = '20px';
  popup.style.backgroundColor = 'white';
  popup.style.border = '1px solid #ccc';
  popup.style.borderRadius = '5px';
  popup.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  popup.style.fontFamily = 'Arial, sans-serif';
  popup.style.fontSize = '14px';
  popup.style.color = '#333';
  popup.style.transform = 'translateX(-50%)';
  document.body.appendChild(popup);
  
  const closeButtonHighlighted = document.createElement('button');
  closeButtonHighlighted.textContent = 'Close';
  closeButtonHighlighted.style.display = 'block';
  closeButtonHighlighted.style.marginTop = '0px';
  closeButtonHighlighted.style.backgroundColor = '#f2f2f2';
  closeButtonHighlighted.style.border = 'none';
  closeButtonHighlighted.style.padding = '5px 10px';
  closeButtonHighlighted.style.borderRadius = '3px';
  closeButtonHighlighted.style.cursor = 'pointer';
  closeButtonHighlighted.style.fontFamily = 'Arial, sans-serif';
  closeButtonHighlighted.style.fontSize = '12px';
  closeButtonHighlighted.addEventListener('click', () => {
    popup.style.display = 'none';
  });
  


  // Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }


  function handleSelectionChange () {
    const selectedText = window.getSelection().toString().trim();

    if (selectedText) {
      try {
  
      chrome.runtime.sendMessage({ highlightedText: 'Please tell me, what is ' + selectedText });
  
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      popup.style.display = 'none';
    }
  }

// Debounced version of the handleSelectionChange function
const debouncedHandleSelectionChange = debounce(handleSelectionChange, 500);

// Listen for selectionchange event
document.addEventListener('selectionchange', debouncedHandleSelectionChange);


document.addEventListener('mousedown', () => {
  popup.style.display = 'none';
});
// Create a div element that looks like
// <div style="position: absolute; top: 0px; right: 0px;"></div>
var coordinateDiv = document.createElement('div');
coordinateDiv.style.position = 'absolute';
coordinateDiv.style.top = '0px';
coordinateDiv.style.right = '0px';

// Add the div element to the body
document.body.appendChild(coordinateDiv);

// Create a function that updates the text in the div element
var updateCoordinateDiv = function(event) {
    coordinateDiv.innerHTML = `x = ${event.clientX}, y = ${event.clientY}`;
}

// Call the update function whenever the mouse moves
document.addEventListener('mousemove', updateCoordinateDiv);

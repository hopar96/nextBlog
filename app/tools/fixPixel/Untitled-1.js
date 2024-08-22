

    // Colors
    var get = 1;
    var colors = new Array();
    colors[0] = "#ffffff";
    colors[1] = "#000000";
    colors[2] = "#ff0000";
    colors[3] = "#00ff00";
    colors[4] = "#0000ff";
    colors[5] = "#ffff00";
    colors[6] = "#ff00ff";
    colors[7] = "#00ffff";
    
    var colorsText = new Array();
    colorsText[0] = "white";
    colorsText[1] = "black";
    colorsText[2] = "red";
    colorsText[3] = "green";
    colorsText[4] = "blue";
    colorsText[5] = "yellow";
    colorsText[6] = "pink";
    colorsText[7] = "light-blue";

    document.onkeydown = changeFrame;

    function changeFrame(e) {

        if (e.keyCode == 27) {
            returnToHome(e);
        }

        if (document.getElementById('popup') === null) {

            if (e.keyCode == '37') {
                var nb = parseInt(get) - 1;
                if (nb < 0) {
                    get = 7;
                } else {
                    get = nb;
                }
            
                document.getElementById('canvas-container').style.backgroundColor = colors[get];
            } else if (e.keyCode == '39') {
                var nb = parseInt(get) + 1;
                if (nb > 7) {
                    get = 0;
                } else {
                    get = nb;
                }
                
                document.getElementById('canvas-container').style.backgroundColor = colors[get];
            }
        }

    }

    function skipToFrame(x) {
        if (document.getElementById('popup') === null) {
            get = x;
            document.getElementById('canvas-container').style.backgroundColor = colors[get];
        }
    }

    function nextFrame(e) {
        if (document.getElementById('popup') === null) {

            var nb = parseInt(get) + 1;
            if (nb > 7) {
                get = 0;
            } else {
                get = nb;
            }
            
            document.getElementById('canvas-container').style.backgroundColor = colors[get];
        }
    }

    function previousFrame(e) {

        if (document.getElementById('popup') === null) {

            var nb = parseInt(get) - 1;
            if (nb < 0) {
                get = 7;
            } else {
                get = nb;
            }
            
            document.getElementById('canvas-container').style.backgroundColor = colors[get];
        }
    }


    var isFullScreen = false;
    const canvas = document.getElementById('pixel-canvas');
    const ctx = canvas.getContext('2d');

    // Function to generate a random color
    function getRandomColor() {
        let clrs = ['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        return clrs[Math.floor(Math.random() * 8)];
    }
    
    // Initialize variables to keep track of the current section
    let currentX = 0;
    let currentY = 0;
    const sectionSize = 64;
    const squareSize = 1;
    const canvasSize = 256;
    
    // Function to draw random colored 4x4 pixel blocks across the entire canvas
    function drawRandomPixels() {

        // Draw the 32x32 section pixel by pixel
        for (let x = currentX; x < currentX + sectionSize; x++) {
            for (let y = currentY; y < currentY + sectionSize; y++) {
                ctx.fillStyle = getRandomColor();
                ctx.fillRect(x, y, squareSize, squareSize);
            }
        }
        
        var lines = canvasSize / sectionSize;
        var destX;
        var destY;
        var column;
        
        for(let y = 0; y <= lines; y++) {
            
            if(y == 0) {
                column = 1; 
            } else {
                column = 0;
            }
            
            for(let z = column; z <= lines; z++) {
                
                destX = z * sectionSize;
                destY = y * sectionSize ;
                
                copySection(0, 0, destX, destY, sectionSize, sectionSize);
            }
            
        }
        
    }
    
    function copySection(srcX, srcY, destX, destY, sectionWidth, sectionHeight) {
        // Get the image data from the source section
        const imageData = ctx.getImageData(srcX, srcY, sectionWidth, sectionHeight);
    
        // Put the image data in the destination section
        ctx.putImageData(imageData, destX, destY);
    }
    
    // Draggable functionality
    let isDragging = false;
    let dragStartX, dragStartY;

    canvas.addEventListener('mousedown', function(e) {
        const rect = canvas.getBoundingClientRect();
        dragStartX = e.pageX - rect.left; // Use pageX/Y for Safari
        dragStartY = e.pageY - rect.top;
        isDragging = true;
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const rect = canvas.getBoundingClientRect();
            canvas.style.position = 'absolute'; // Set position for dragging
            canvas.style.left = (e.pageX - dragStartX) + 'px';
            canvas.style.top = (e.pageY - dragStartY) + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            // Get the new position
            let newX = e.pageX - dragStartX;
            let newY = e.pageY - dragStartY;
    
            // Constrain the canvas to the window's boundaries
            newX = Math.max(newX, 0); // Constrain to the left
            newY = Math.max(newY, 0); // Constrain to the top
    
            // Constrain to the right and bottom, considering the canvas size
            newX = Math.min(newX, window.innerWidth - canvas.width);
            newY = Math.min(newY, window.innerHeight - canvas.height);
    
            canvas.style.position = 'absolute'; // Set position for dragging
            canvas.style.left = newX + 'px';
            canvas.style.top = newY + 'px';
        }
    });
    
    // Add these event listeners for touch events
    canvas.addEventListener('touchstart', function(e) {
        const rect = canvas.getBoundingClientRect();
        dragStartX = e.touches[0].clientX - rect.left;
        dragStartY = e.touches[0].clientY - rect.top;
        isDragging = true;
    });

    document.addEventListener('touchmove', function(e) {
        if (isDragging) {
            const rect = canvas.getBoundingClientRect();
            canvas.style.position = 'absolute'; // Set position for dragging
            canvas.style.left = (e.touches[0].clientX - dragStartX) + 'px';
            canvas.style.top = (e.touches[0].clientY - dragStartY) + 'px';
        }
    });

    document.addEventListener('touchend', function() {
        isDragging = false;
    });
    
    document.addEventListener('touchmove', function(e) {
        if (isDragging) {
            // Get the new position
            let newX = e.pageX - dragStartX;
            let newY = e.pageY - dragStartY;
    
            // Constrain the canvas to the window's boundaries
            newX = Math.max(newX, 0); // Constrain to the left
            newY = Math.max(newY, 0); // Constrain to the top
    
            // Constrain to the right and bottom, considering the canvas size
            newX = Math.min(newX, window.innerWidth - canvas.width);
            newY = Math.min(newY, window.innerHeight - canvas.height);
    
            canvas.style.position = 'absolute'; // Set position for dragging
            canvas.style.left = newX + 'px';
            canvas.style.top = newY + 'px';
        }
    });

    // Full screen and return to home
    function closePopup() {
        document.getElementById('popup').remove();
        toggleFullScreen();
        // Initialize canvas
        setInterval(drawRandomPixels, 15);
        event.stopPropagation();
        event.cancelBubble = true;
    }

    function returnToHome(e) {
        toggleFullScreen(true);
                window.location.href = "https://deadpixeltest.org/ko";
    }


    // Mousemove
    var timeout;
    var mouse = false;
    var isHidden = true;
    var keepUI = false; 

    // Check whether or not to keep UI
    var elementsToAppear = document.getElementsByClassName('toappear');

    for (var i = 0; i < elementsToAppear.length; i++) {
        elementsToAppear[i].addEventListener('mouseover', function() {
            keepUI = true;
        });
        elementsToAppear[i].addEventListener('mouseout', function() {
            keepUI = false;
        });
    }

    function mouseStatus(n) {

        mouse = n;

        if (mouse == false && keepUI != true) {
            timeout = setTimeout(function() {
                if (mouse == false) {
                    var elementsToAppear = document.getElementsByClassName('toappear');
                    var clss;

                    if(keepUI != true) {
                        for(var v = 0; v < elementsToAppear.length; v++) {
                            clss = elementsToAppear[v].className;
                            if(clss.indexOf('show') > -1) {
                                elementsToAppear[v].className = clss.replace('show', 'hide');
                            }
                        }
                        isHidden = true;
                    }
                }
            }, 750);
        } else {
            clearTimeout(timeout);
        }
    }

    document.addEventListener('mousemove', e => {

        if (document.getElementById('popup') === null && isHidden === true) {

            var elementsToAppear = document.getElementsByClassName('toappear');
            var clss; 

            for(var v = 0; v < elementsToAppear.length; v++) {
                clss = elementsToAppear[v].className;
                if(clss.indexOf('hide') > -1) {
                    elementsToAppear[v].className = clss.replace('hide', 'show');
                }
            }

            isHidden = false; 

        }
        clearTimeout(timeout);
        mouseStatus(mouse);
    });

   …
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = './original.JPG';

let text = '';
let isTyping = false;

img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    document.body.appendChild(canvas);
    drawImage();
};

img.onerror = function() {
    console.error('Error loading image:', img.src);
};

canvas.addEventListener('click', startTyping);
document.addEventListener('keydown', handleKeyPress);

function startTyping(e) {
    isTyping = true;
    text = '';
    drawImage();
}

function handleKeyPress(e) {
    if (!isTyping) return;

    if (e.key === 'Enter') {
        isTyping = false;
    } else if (e.key === 'Backspace') {
        text = text.slice(0, -1);
    } else if (e.key.length === 1) {
        text += e.key;
    }

    drawImage();
}

function drawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    if (text) {
        const fontSize = 72;
        ctx.font = `${fontSize}px "Bebas Neue", sans-serif`;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const x = canvas.width / 2;
        const y = canvas.height * 0.57;

        // Add text shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        ctx.fillText(text, x, y);

        // Reset shadow for future drawings
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }

    if (isTyping) {
        const x = canvas.width / 2;
        const y = canvas.height * 0.57;
        ctx.fillText('|', x + ctx.measureText(text).width / 2 + 5, y);
    }
}

function downloadImage() {
    const downloadCanvas = document.createElement('canvas');
    const downloadCtx = downloadCanvas.getContext('2d');
    downloadCanvas.width = img.width;
    downloadCanvas.height = img.height;

    downloadCtx.drawImage(img, 0, 0);

    if (text) {
        const fontSize = 72;
        downloadCtx.font = `${fontSize}px "Bebas Neue", sans-serif`;
        downloadCtx.fillStyle = 'white';

        const x = downloadCanvas.width / 2;
        const y = downloadCanvas.height * 0.57;

        // Add text shadow
        downloadCtx.shadowColor = 'black';
        downloadCtx.shadowBlur = 10;
        downloadCtx.shadowOffsetX = 5;
        downloadCtx.shadowOffsetY = 5;

        downloadCtx.textAlign = 'center';
        downloadCtx.fillText(text, x, y);
    }

    const dataURL = downloadCanvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'image_with_text.jpg';
    link.click();
}

// Add this at the end of the file
document.getElementById('downloadBtn').addEventListener('click', downloadImage);

// Remove or comment out this line as it's no longer needed
// window.downloadImage = downloadImage;
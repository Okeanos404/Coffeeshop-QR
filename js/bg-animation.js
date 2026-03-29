/**
 * bg-animation.js
 * Adds a subtle, floating background animation layer featuring PlayStation-style retro pixel art buttons.
 * Uses procedural pure-pixel generation (OOP) to strictly enforce 8-bit sharpness without AI artifacting.
 */

const PixelAssets = (function() {
    // 5x5 font mapping for retro words
    const chars = {
        'S': ["1111", "1000", "1111", "0001", "1111"],
        'E': ["1111", "1000", "1110", "1000", "1111"],
        'L': ["1000", "1000", "1000", "1000", "1111"],
        'C': ["1111", "1000", "1000", "1000", "1111"],
        'T': ["11111", "00100", "00100", "00100", "00100"],
        'A': ["0110", "1001", "1111", "1001", "1001"],
        'R': ["1110", "1001", "1110", "1010", "1001"]
    };

    /**
     * Mathematical generator to guarantee 100% thick, blocky, aliased pixels
     * matching the requested 8-bit aesthetic precisely.
     */
    function drawPixelLayout(layout, color, scale = 3) {
        let width = layout[0].length;
        let height = layout.length;
        const canvas = document.createElement('canvas');
        canvas.width = width * scale;
        canvas.height = height * scale;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = color;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (layout[y][x] === '1') {
                    ctx.fillRect(x * scale, y * scale, scale, scale);
                }
            }
        }
        return canvas.toDataURL('image/png');
    }

    function drawWord(word, color) {
        let lines = ["", "", "", "", ""];
        for(let i=0; i<word.length; i++) {
            let ch = chars[word[i]];
            for(let l=0; l<5; l++) {
                lines[l] += ch[l] + "0"; // Add 1 pixel horizontal tracking
            }
        }
        return drawPixelLayout(lines, color, 2);
    }

    return {
        // Emulates loading the requested 6 PNG images, bypassing external files for native perfection
        generateAll: function() {
            return {
                triangle: drawPixelLayout([
                    "000001100000",
                    "000011110000",
                    "000111111000",
                    "001110011100",
                    "011100001110",
                    "111000000111",
                    "111111111111",
                    "111111111111"
                ], '#2ecc71', 3),
                circle: drawPixelLayout([
                    "000111111000",
                    "001111111100",
                    "011100001110",
                    "111000000111",
                    "110000000011",
                    "110000000011",
                    "111000000111",
                    "011100001110",
                    "001111111100",
                    "000111111000"
                ], '#e74c3c', 3),
                square: drawPixelLayout([
                    "000000000000",
                    "011111111110",
                    "011111111110",
                    "011000000110",
                    "011000000110",
                    "011000000110",
                    "011000000110",
                    "011111111110",
                    "011111111110",
                    "000000000000"
                ], '#e84393', 3),
                cross: drawPixelLayout([
                    "111000000111",
                    "111100001111",
                    "011110011110",
                    "001111111100",
                    "000111111000",
                    "000111111000",
                    "001111111100",
                    "011110011110",
                    "111100001111",
                    "111000000111"
                ], '#3498db', 3),
                start: drawWord('START', '#00cec9'), // Changed to bright neon cyan/teal
                select: drawWord('SELECT', '#9b59b6') // Changed to vibrant purple for better contrast
            }
        }
    };
})();

class ButtonParticle {
    constructor(canvasWidth, canvasHeight, images) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.images = images;
        this.reset(true);
    }

    reset(initial = false) {
        // Randomly pick one of the 6 generated PNG images
        this.image = this.images[Math.floor(Math.random() * this.images.length)];
        
        // Random placement anywhere on screen
        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;

        // Skala bisa cukup besar (hingga 2.2x), diturunkan sedikit dari 3.0x agar tidak terlalu dominan
        this.scale = 0.4 + (Math.random() * 1.8);

        // Opacity diseimbangkan secara proporsional dengan ukurannya
        // Skala terbesar (2.2x) minimal opacity-nya agak tegas di 0.25. Objek kecil (0.4x) bisa sepekat 0.8
        this.opacity = 0.25 + ((2.2 - this.scale) / 1.8) * 0.55;

        // Rotasi (sudut) acak awal dan putaran perlahan (tumble effect) untuk kesan 3D melayang
        this.angle = Math.random() * Math.PI * 2;
        this.vAngle = (Math.random() - 0.5) * 0.02;

        // Ada kecepatan melambat (0.6x) dan sedikit lebih cepat (1.8x)
        let speedProfile = (Math.random() > 0.6) ? 1.8 : 0.6;

        // Random abstract floating velocity (up, down, left, right)
        this.vx = (Math.random() - 0.5) * speedProfile; 
        this.vy = (Math.random() - 0.5) * speedProfile; 
        
        // Prevent completely static particles
        if (Math.abs(this.vx) < 0.1) this.vx += (this.vx >= 0 ? 0.15 : -0.15);
        if (Math.abs(this.vy) < 0.1) this.vy += (this.vy >= 0 ? 0.15 : -0.15);
    }

    update(canvasWidth, canvasHeight) {
        // Adjust if canvas resizes
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.vAngle; 
        
        // Wrap around seamlessly on all screen edges
        const pad = 100;
        if (this.x < -pad) this.x = this.canvasWidth + pad;
        if (this.x > this.canvasWidth + pad) this.x = -pad;
        if (this.y < -pad) this.y = this.canvasHeight + pad;
        if (this.y > this.canvasHeight + pad) this.y = -pad;
    }

    draw(ctx) {
        if(this.image.complete) {
            ctx.globalAlpha = this.opacity; 
            let drawWidth = this.image.width * this.scale;
            let drawHeight = this.image.height * this.scale;

            ctx.save();
            
            // Offset point to center for geometric rotation
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);

            // Polish: Hard Retro Drop Shadow untuk memisahkan ikon dari bidang dasar
            ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
            ctx.shadowOffsetX = 3 * this.scale; 
            ctx.shadowOffsetY = 3 * this.scale;
            ctx.shadowBlur = 0; // 0 blur untuk pixel-art strict look
            
            ctx.drawImage(this.image, -drawWidth/2, -drawHeight/2, drawWidth, drawHeight);
            
            ctx.restore();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('coffeeLayer');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Crucial for keeping PNG rendering pixelated without antialiasing interference on canvas level
    ctx.imageSmoothingEnabled = false;

    let particles = [];
    const MAX_PARTICLES = 25; // Adjusted to be "se-pas mungkin" (perfectly balanced/subtle)
    const loadedImages = [];

    // Responsive adaptation matching Viewport, since position is fixed in CSS
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Re-enforce the property purely because context resizing resets it
        ctx.imageSmoothingEnabled = false; 
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Asset Loader simulates the strict requirement
    function initAnimation() {
        // We get 6 Base64 DataURI representations behaving exactly like PNG file load streams
        const AssetDict = PixelAssets.generateAll();
        const keys = Object.keys(AssetDict);
        
        let loadedCount = 0;

        keys.forEach(key => {
            let img = new Image();
            img.onload = () => {
                loadedCount++;
                loadedImages.push(img);
                if (loadedCount === keys.length) {
                    startLoop(); // Trigger 60FPS loop once ALL 6 are guaranteed loaded
                }
            };
            img.src = AssetDict[key];
        });
    }

    function startLoop() {
        for(let i=0; i<MAX_PARTICLES; i++) {
            particles.push(new ButtonParticle(canvas.width, canvas.height, loadedImages));
        }
        // Initiate main logic
        requestAnimationFrame(loop);
    }

    function loop() {
        // Keep transparent background logic unaffected 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Set visual balance (opacity balanced 0.5, highly visible but transparent)
        ctx.globalAlpha = 0.5;

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.update(canvas.width, canvas.height);
            p.draw(ctx);
        }

        requestAnimationFrame(loop);
    }

    // Trigger initialization
    initAnimation();
});

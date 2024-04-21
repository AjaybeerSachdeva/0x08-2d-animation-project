class CorridaDeToros {
    constructor(canvasId) {
        this.score = 0;
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.player = {
            x: 60,
            y: this.canvas.height / 2.3,
            width: 100, // Adjust according to person's image size
            height: 125, // Adjust according to person's image size
            // Remove color property
            speed: 10
        };
        this.bull = {
            x: this.canvas.width - 100,
            y: this.canvas.height / 2.5,
            width: 150,
            height: 100,
            speed: 2
        };
        this.gameOver = false;
        this.animationFrame = null;

        // Load person's image
        this.personImage = new Image();
        this.personImage.src = 'matador.png'; // Replace 'person_image.png' with the path to your person's image
    }

    drawPlayer() {
        // Draw the person's image instead of the blue rectangle
        this.ctx.drawImage(this.personImage, this.player.x, this.player.y, this.player.width, this.player.height);
    }

    drawBull() {
        const bullImg = new Image();
        bullImg.src = 'bullrun.png'; // Replace 'bull_image.png' with the path to your bull image
        this.ctx.drawImage(bullImg, this.bull.x, this.bull.y, this.bull.width, this.bull.height);
    }

    drawScore() {
        this.ctx.fillStyle = 'black';
        this.ctx.font = '24px Arial';
        this.ctx.fillText('Score: ' + this.score, 20, 30); // Display the score at position (20, 30)
    }

    update() {
        if (!this.gameOver) {
            // Move the bull horizontally with random speed
            this.bull.x -= Math.floor(Math.random() * (8 - 3) + 3); // Random speed between 1 and 5
    
            // Move the bull vertically with random speed and direction
            const verticalSpeed = Math.floor(Math.random() * (8 - 3) + 3) * (Math.random() < 0.5 ? -1 : 1);
            this.bull.y += verticalSpeed;
    
            // Ensure bull stays within canvas bounds
            if (this.bull.x + this.bull.width <= 0 || this.bull.y + this.bull.height <= 0 || this.bull.y >= this.canvas.height) {
                this.bull.x = this.canvas.width - 70; // Reset bull position to the right side of the canvas
                this.bull.y = this.canvas.height / 2; // Reset bull position to the center of the canvas vertically
            }
        }
    }
    

    handleKeyDown(event) {
        if (event.key === 'W' && this.player.y > 0) {
            this.player.y -= this.player.speed;
        } else if (event.key === 'S' && this.player.y < this.canvas.height - this.player.height) {
            this.player.y += this.player.speed;
        }
    }

    checkCollision() {
        if (this.player.x + this.player.width >= this.bull.x &&
            this.player.y + this.player.height >= this.bull.y &&
            this.player.y <= this.bull.y + this.bull.height) {
            this.gameOver = true;
        } else if (this.bull.x <= 0) {
            // Increment score when bull reaches the left boundary without collision
            this.score++;
        }
    }
    

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawPlayer();
        this.drawBull();
        this.drawScore(); // Draw the score above the canvas
    }

    animate() {
        if (!this.gameOver) {
            this.update();
            this.checkCollision();
            this.draw();
            this.animationFrame = requestAnimationFrame(() => this.animate());
        } else {
            cancelAnimationFrame(this.animationFrame);
            this.ctx.fillStyle = 'black';
            this.ctx.font = '30px Arial';
            this.ctx.fillText('Game Over', this.canvas.width / 2 - 80, this.canvas.height / 2);
        }
    }

    start() {
        document.addEventListener('keydown', (event) => this.handleKeyDown(event));
        this.animate();
    }
}

const corridaDeToros = new CorridaDeToros('canvas');
corridaDeToros.start();

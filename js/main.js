const scrn = document.getElementById('screen');
const computedStylesScreen = window.getComputedStyle ? window.getComputedStyle(scrn) : scrn.currentStyle; 
const screenWidth = parseInt(computedStylesScreen.getPropertyValue('width'), 10);
const screenHeight = parseInt(computedStylesScreen.getPropertyValue('height'), 10);

const shipImg = document.getElementById('ship');
const computedStylesImg = window.getComputedStyle ? window.getComputedStyle(shipImg) : shipImg.currentStyle; 
const shipWidth = parseInt(computedStylesImg.getPropertyValue('width'), 10);
const shipHeight = parseInt(computedStylesImg.getPropertyValue('height'), 10);

const result = document.getElementById('result');

const totalResult = document.getElementById('totalResult');

const start = document.getElementById('start');
start.addEventListener('click', game);

function game () {
    start.removeEventListener('click', game);

    const ship = {
        el: document.getElementById('ship'),
        x: 20,
        y: 140,
        speed: 2,
        score: 0,
        move() {
          this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
        },
        updateScore() {
            result.innerHTML = `Result: ${this.score}`
        }
    };

    const K = {
        function(e) {
            const key = e.which;
            const click = e.target.id;
            if (key >= 37 && key <= 40) {
                e.preventDefault();
                K[key] = e.type === "keydown";
            } else if (click == 'top' || click == 'left' || click == 'right'|| click == 'bottom' ) {
                K[click] = e.type === "mousedown"
            }
        }
    };
      
    const update = () => {
        ship.score = ship.score+1;
        ship.updateScore();

        if(ship.score % 1000 == 0) {
            ship.speed = ship.speed+1
        }

        const resetX = ship.x;
        const resetY = ship.y;

        let dist = K[38] && (K[37] || K[39]) || K[40] && (K[37] || K[39]) ? 0.707 : 1;
        dist *= ship.speed;
        
        
        if (K[37] || K['left']) ship.x -= dist;
        if (K[38] || K['top']) ship.y -= dist;
        if (K[39] || K['right']) ship.x += dist;
        if (K[40] || K['bottom']) ship.y += dist;
    
        if (ship.x <= 0 || ship.y <= 0 || ship.x >= screenWidth - shipWidth || ship.y >= screenHeight - shipHeight) {
    
            ship.x = resetX;
            ship.y = resetY;
            ship.move();
        } else {
            ship.move();
        }
    
    }

    let counter = true;
    function colideCheck(el1, el2) {
        let rect1 = el1.getBoundingClientRect();
        let rect2 = el2.getBoundingClientRect();
        if(counter){
            if (!(rect1.top > rect2.bottom ||
                rect1.right < rect2.left ||
                rect1.bottom < rect2.top ||
                rect1.left > rect2.right)) {
                    counter = false;
                    document.getElementById('endgame').style.opacity = '1';
                    let totalScore = ship.score
                    totalResult.innerHTML= `Your score: ${totalScore}`
            }
        }
        
    }

    document.addEventListener('mousedown', K.function);
    document.addEventListener('mouseup', K.function);
    document.addEventListener('keydown', K.function);
    document.addEventListener('keyup', K.function);

    let a = document.getElementById('a');
      
    (function engine() {
        update();
        window.requestAnimationFrame(engine);
        colideCheck(shipImg, a);
        colideCheck(shipImg, b);
        colideCheck(shipImg, c);
        colideCheck(shipImg, d);
        colideCheck(shipImg, e);
        colideCheck(shipImg, f);
    }());

    animateDiv('a');
    animateDiv('b');
    animateDiv('c');
    animateDiv('d');
    animateDiv('e');
    animateDiv('f');
    
    
    function makeNewPosition(){
        var newTop = Math.floor(Math.random() * (screenWidth-32));
        var newLeft = Math.floor(Math.random() * (screenHeight-32));
        return [newTop,newLeft];      
    }
    
    function animateDiv(myId){
        setInterval(function() {
            let newCoordinates = makeNewPosition();
    
            document.getElementById(myId).style.transform = 'translate('+ newCoordinates[0] +'px,' + newCoordinates[1] +'px)';
            document.getElementById('particles').style.opacity = '1';
    
            ( function(){
                animateDiv(myId);        
              });
        }, 5000);
    };
}


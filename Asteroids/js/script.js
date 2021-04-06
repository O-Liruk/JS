let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let aster  = [];
let fire = [];
let expl = [];

let timer = 0;

let ship = {x:300, y:300};

let shiping =  new Image();
shiping.src = 'ship01.png'

let fireing =  new Image();
fireing.src = 'fire.png'

let astering =  new Image();
astering.src = 'astero.png'

let fonning =  new Image();
fonning.src = 'fon.png'

let explimg =  new Image();
explimg.src = 'expl222.png'

cvs.addEventListener('mousemove', function(event){
    ship.x = event.offsetX-25;
    ship.y = event.offsetY-13;
});

explimg.onload = function(){
    game();
}

function game(){
    
    update();
    render();
    requestAnimaFrame(game)

}

function update(){

    timer++;
    if(timer%20==0){
        aster.push({ 
             x: Math.random()*600,
             y: -50, 
             dx: Math.random()*2-1, 
             dy: Math.random()*2+1,
             del:0});
    }
    if(timer%30==0){
        fire.push({x:ship.x + 10, y:ship.y, dx:0, dy:-5.2});
        fire.push({x:ship.x + 10, y:ship.y, dx:0.5, dy:-5});
        fire.push({x:ship.x + 10, y:ship.y, dx:-0.5, dy:-5});

    }

    for(i in fire){
        fire[i].x =  fire[i].x + fire[i].dx;
        fire[i].y =  fire[i].y + fire[i].dy;

    if ( fire[i].y < 30)  fire.splice(i, 1);
    }

    for(i in expl){
        expl[i].animx=expl[i].animx+0,3;
        if(expl[i].animx>7) {expl[i].animy++; expl[i].animx=0}
        if(expl[i].animy>7)
        expl.splice(i,1);
    }

    for(i in aster){
        aster[i].x =  aster[i].x + aster[i].dx;
        aster[i].y =  aster[i].y + aster[i].dy;

        if ( aster[i].x > 550 || aster[i].x<0)  aster[i].dx =-aster[i].dx;
        if ( aster[i].y > 600 )  aster.splice(i, 1);

        for(j in fire){
            if(Math.abs(aster[i].x+25-fire[j].x-15)<50 && Math.abs(aster[i].y-fire[j].y)<25){
                expl.push({x:aster[i].x-25, y:aster[i].y-25, animx:0, animy:0})
                aster[i].del=1
                fire.splice(j,1);break;
            }
        }
        if(aster[i].del==1) aster.splice(i,1);
    }
}


function render(){
    ctx.drawImage(fonning, 0, 0, 600, 600);
    ctx.drawImage(shiping, ship.x, ship.y);

    for(i in fire) ctx.drawImage(fireing,  fire[i].x, fire[i].y, 30, 30);
    
    for(i in aster) ctx.drawImage(astering,  aster[i].x, aster[i].y, 50, 50);
    
    for(i in expl) ctx.drawImage(explimg , 128*Math.floor(expl[i].animx),128*Math.floor(expl[i].animy),128,128, expl[i].x, expl[i].y, 100, 100);
}

let requestAnimaFrame = (function(){
     return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback){
                window.setTimeout(callback, 1000 / 20);
            };
 })();
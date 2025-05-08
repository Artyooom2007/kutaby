//Comrades! Actually, I'm a bad programmer.

const Mouse={
    x: 0,
    y: 0,
    act: 0,
    button: 0,
}

let canvas = document.querySelector('#gameCanvas');

//Дополню для себя:
//e (event)- Это как ключ который определяет функцию эвентлистенера
//А конструкция ()=>{} это практически как function(){}

addEventListener('mouseup', function(e){
    Mouse.act = 0 ;
    Mouse.button = e.button;
});

addEventListener('mousedown', function(e){
    Mouse.act = 1;
    Mouse.button = e.button;
});

addEventListener('mousemove', function(e){
    Mouse.x = e.offsetX;
    Mouse.y = e.offsetY;
});

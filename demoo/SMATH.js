//Возвращает рандомное число от нуля до заданного значения
function Random(max) {return Math.floor(Math.random() * max);}

//Возвращает направление из точки в точку по двум координатам XY
function FromToAngle(x1,y1,x2,y2){return Math.atan2(y2 - y1, x2 - x1);}

//Даёт движение по заданному направлению с указанной скоростью
function MoveAngle(angle,speed){return {x: Math.cos(angle) * speed,y: Math.sin(angle) * speed};}

//Выдаёт Y гиперболы с заданным размером и длиной
function Hyperbola(size,moment){return size/moment;}

//Выдаёт линейную функцию с начальной задержкой и темпом роста
function StartPeak(start,moment,amp){return Math.abs(amp*(moment-start));}
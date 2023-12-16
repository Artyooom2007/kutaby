var hId=document.getElementById('h');
var buttonId=document.getElementById('button');
var count=0;
var count2=0;
var huyovetr=1;
buttonId.addEventListener('click',function(){
 count=count+huyovetr;
 huyovetr=huyovetr+1;
  if (count > 1000000){
  count=0;
  huyovetr=1;
  count2=count2+1;
 }  


hId.textContent='Закликано:'+count2+' комков. '+count+' Пылинок.'});

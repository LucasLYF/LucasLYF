//侧边栏 
var btn = document.getElementById("btn");
var control = document.getElementById("control");
var gravity = document.getElementById('gra')
duration = document.getElementById('dur')
speed = document.getElementById('speed')
radius = document.getElementById('rad');
message = document.getElementById('message');

btn.addEventListener('click', function(e) {
    btn.classList.toggle('vertical');
    // 动态添加类名和删除类名
    control.classList.toggle("slide");
})
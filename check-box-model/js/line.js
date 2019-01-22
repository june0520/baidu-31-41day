function makeLine(data){
    var canvas = document.querySelector('#mycanvas')
    var ctx = canvas.getContext('2d')
    canvas.setAttribute('width','1016')
    canvas.setAttribute('height','700')
    //绘制轴线
    ctx.beginPath();
    ctx.moveTo(50,50);
    ctx.lineTo(50,650);
    ctx.lineTo(900,650);
    ctx.strokeStyle ='rgb(99,99,99)'
    ctx.stroke();
    ctx.font="12px Microsoft yahei"
    ctx.fillText('月份', 910, 665);
    ctx.fillText('销量', 60, 65);
    var scale = 50
    for (var i=1;i<13;i++){
        ctx.beginPath();
        ctx.moveTo(scale,650);
        ctx.lineTo(scale,640);
        ctx.stroke();
        ctx.fillText(i+'月份', scale-10, 665);
        scale += 70

    }




    //定义间距
    var spacing = 70;

    //初始化x轴坐标
    var coordinateX = 50

    //转换关系
    var outputVal = function(num){
        return 0.8*num
    }

    //再次中心绘制路径
    ctx.beginPath();
    ctx.strokeStyle ='#609cfc'
    ctx.fillStyle = "#9287e7"


    for(var item of data){
        coordinateY = 650-outputVal(item)

        ctx.arc(coordinateX,coordinateY,5,0,Math.PI*2)
        ctx.moveTo(coordinateX,coordinateY)
        ctx.fill()

        ctx.fillText(item, coordinateX, coordinateY-10);

        //绘制连线
        if(coordinateX!==50){
            ctx.lineTo(coordinateX,coordinateY)
            ctx.stroke()
        }
        //将x轴的偏移量增加
        coordinateX += spacing
    }


}
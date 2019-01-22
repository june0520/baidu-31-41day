function makeManyLines(objList){
    var colorList = [{
        product: "手机",
        region: "华东",
        color: '#60acfc'
    },{
        product: "手机",
        region: "华北",
        color: '#5bc49f'

    },{
        product: "手机",
        region: "华南",
        color: '#feb64d'

    },{
        product: "笔记本",
        region: "华东",
        color: '#ff7b7b'

    },{
        product: "笔记本",
        region: "华北",
        color: '#ff7b7b'
        
    },{
        product: "笔记本",
        region: "华南",
        color: '#9287e7'

    },{
        product: "智能音箱",
        region: "华东",
        color: '#9287e7      '

    },{
        product: "智能音箱",
        region: "华北",
        color: '#306ddb'

    },{
        product: "智能音箱",
        region: "华南",
        color: '#f53088'
    }]


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
    ctx.fillText('月份', 910, 655);
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


    //转换关系
    var outputVal = function(num){
        return 0.8*num
    }

    for (var oneVal of objList){

        //初始化x轴坐标
        var coordinateX = 50


        //再次中心绘制路径
        ctx.beginPath();
        var colorObj = colorList.filter(function(item){
            return item.product === oneVal.product && item.region === oneVal.region

        })
        ctx.strokeStyle =colorObj[0].color
        ctx.fillStyle = colorObj[0].color


        for(var item of oneVal.sale){
            coordinateY = 650-outputVal(item)
            ctx.arc(coordinateX,coordinateY,5,0,Math.PI*2)
            ctx.moveTo(coordinateX,coordinateY)
            ctx.fill()

            //绘制连线
            if(coordinateX!==50){
                ctx.lineTo(coordinateX,coordinateY)
                ctx.stroke()
            }
            //将x轴的偏移量增加
            coordinateX += spacing
        }

}
















}
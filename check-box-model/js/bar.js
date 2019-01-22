/*function 绘制一个柱状图(柱状图数据) {
    定义好柱状图绘制区域的高度，宽度，轴的高度，宽度
    定义好每一个柱子的宽度及柱子的间隔宽度
    定义好柱子颜色，轴的颜色

    拿到柱状图中的最大值Max
    根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例

    绘制横轴及纵轴
    遍历数据 {
        计算将要绘制柱子的高度和位置
        绘制每一个柱子
    }    
}
*/
function makeBarCharts(data){

    var barChart = document.querySelector('svg')


    var barHTML = ''
    var singleWidth = 50;
    var spacing = 20;
    var coordinateX = 20
    var coordinateY = 0
    var outputVal = function(num){
        return 0.8*num
    }
    barChart.style.height = "700px"
    barHTML += '<line x1="10" y1="50" x2="10" y2="650" style="stroke:rgb(99,99,99);stroke-width:2"/>'
    barHTML += '<line x1="10" y1="650" x2="860" y2="650" style="stroke:rgb(99,99,99);stroke-width:2"/>'
    barHTML += '<polyline points="4,55 10,50 16,55 " style="fill:white;stroke:rgb(99,99,99);stroke-width:2"/>'


    for(var item of data){

        coordinateY = 650-outputVal(item)

        barHTML += '<rect x="' +coordinateX + '" y="'+ coordinateY + '" width="' + singleWidth + '" height="' + outputVal(item) + '" style="fill:#feb64d"/>'

        coordinateX = coordinateX + singleWidth + spacing

    }


    barChart.innerHTML = barHTML
}
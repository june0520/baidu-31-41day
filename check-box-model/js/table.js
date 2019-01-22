function makeTable(wrap,data,localChecklist,procuctChecklist){
    //创建表头信息
    wrap.innerHTML = ''
    var headHTML = ''

    //当地区选择了一个，商品选择了多个的时候，地区作为第一列，商品作为第二列，并且把地区这一列的单元格做一个合并，只保留一个地区名称
    if(localChecklist.length === 1 && procuctChecklist.length > 1) {
        headHTML += '<table border="1" cellspacing="0" bordercolor="#000"  style="border-collapse:collapse;text-align:center;"><tr><th>地区</th><th>商品</th>'

    } else {

        headHTML += '<table border="1" cellspacing="0" bordercolor="#000"  style="border-collapse:collapse;text-align:center;"><tr><th>商品</th><th>地区</th>'
    }
    for (var i=1;i<13;i++){
        headHTML += '<th>' + i + '月份</th>'
    }
    headHTML += '</tr>'

    //数据展示部分
    //这两个变量的作用其实是一个旗帜，判断此商品/地区是不是第一次输出，如果是第一次输出则设置rowspan
    var localNum = localChecklist.length
    var productNum = procuctChecklist.length

    for (var info of data){

        //当地区选择了一个，商品选择了多个的时候
        if(localChecklist.length === 1 && procuctChecklist.length > 1){

            //是第一次输出地区名，并改变旗帜的值，后面的输出全部display: none
            if(productNum === procuctChecklist.length){
                headHTML += '<tr data-label=' + info.region + '-' + info.product + '><td rowspan='+ procuctChecklist.length + '>' + info.region + '</td>' + '<td>' + info.product + '</td>'
                productNum--
            } else {
                headHTML += '<tr data-label=' + info.region + '-' + info.product + '><td style="display: none"></td>' + '<td>' + info.product + '</td>'
            } 
        } 

        //商品名称在前      
        else {

            //如果旗帜的值减到0，说明当前商品的合并结束，要重新将旗帜恢复初始值，并进入下一个判断，进行下一个商品的合并单元格操作
            if(localNum === 0){
                localNum = localChecklist.length
            }

            //是第一次输出产品名称时，设置rowspan,并改变旗帜的值
            if(localNum === localChecklist.length){

                headHTML += '<tr data-label=' + info.region + '-' + info.product + '>' + '<td rowspan='+localChecklist.length+'>' + info.product + '</td>' + '<td>' + info.region + '</td>'
                localNum--
                
            } else if(localNum > 0 && localNum < localChecklist.length){

                headHTML += '<tr data-label=' + info.region + '-' + info.product + '>' + '<td style="display: none"></td>' + '<td>' + info.region + '</td>'
                localNum--
            }
        }

        for (var num of info.sale){
            headHTML+= '<td>' + num + '<i class="bianji iconfont icon-bianji"></i></td>'
        }

        headHTML += '</tr>'
    }
    headHTML += '</table>'
    wrap.innerHTML += headHTML
}

window.onload = function(){
    var wrap = document.querySelector('#table-wrapper')
    var selectWrap = document.querySelector('#select-wrapper')
    var regSel = document.querySelector('#region-select')
    var proSel = document.querySelector('#procuct-select')

    //采用事件代理的方式，其中任何一个选择框发生变化都会触发事件
    selectWrap.addEventListener('change',function(e){
        console.log('bianle')
        var e = event || window.event;
        var target = e.target || e.srcElement
        if(target.nodeName.toLowerCase() === "select"){
            var data = getData()
            makeTable(data)
        }

    })

    //根据select的值筛选出数据
    function getData(){

        var regVal = regSel.value;
        var proVal = proSel.value
   
        var localData = sourceData.filter(function(item){
            return item.region === regVal && item.product === proVal
        })
        return localData
    }


    function makeTable(data){
        //创建表头信息
        wrap.innerHTML = ''
        var headHTML = ''
        headHTML += '<table border="1" cellspacing="0" bordercolor="#000"  style="border-collapse:collapse;text-align:center;"><tr><th>商品</th><th>地区</th>'
        for (var i=1;i<13;i++){
            headHTML += '<th>' + i + '月份</th>'
        }
        headHTML += '</tr>'

        for (var item of data){
            headHTML += '<tr>' + '<td>' + item.product + '</td>' + '<td>' + item.region + '</td>'
            for (var num of item.sale){
                headHTML+= '<td>' + num + '</td>'

            }
            headHTML += '</tr>'
        }
        headHTML += '</table>'
        wrap.innerHTML += headHTML

    }






 
























}
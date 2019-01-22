window.onload = function(){
    var wrap = document.querySelector('#table-wrapper')
    var regionWrap = document.querySelector('#region-radio-wrapper')
    var productWrap = document.querySelector('#product-radio-wrapper')

    var regInputList = regionWrap.querySelectorAll('.single')
    var regCheckAll = regionWrap.querySelector('#all')

    var proInputList = productWrap.querySelectorAll('.single')
    var proCheckAll = productWrap.querySelector('#all')

    //从Local Storage中获取数据将sourceData重新赋值，如果不存在从ifedata.js中获取
    if(localStorage.getItem('showData')){
        sourceData = JSON.parse(localStorage.getItem('showData'))
    }
 


    //设置默认选项值并且不可取消
    regInputList[0].checked = "checked"
    regInputList[0].disabled = true
    proInputList[0].checked = "checked"
    proInputList[0].disabled = true

    //利用history把用户的一些交互状态通过某种方式记录在URL中
    var urlQuery = encodeURI(regInputList[0].value)+'-'+encodeURI(proInputList[0].value)
    history.replaceState({},null,'?reg&pro='+urlQuery)

 

    // 页面加载完成后获取当前checkbox的值
    var localChecklist = [regInputList[0].value]
    var procuctChecklist = [proInputList[0].value]

    //页面加载完获取初始数据，展示列表
    var data = getData(localChecklist,procuctChecklist)
    makeTable(wrap,data,localChecklist,procuctChecklist)

    //柱形图元素
    var barChart = document.querySelector('svg')


    var chartData = sourceData.filter(function(item){
        return item.region === regInputList[0].value && item.product === proInputList[0].value

    })
    var outputTochart = chartData[0].sale
    // 图表展示
    makeBarCharts(outputTochart)
    makeLine(outputTochart)

    
    
    

    // 点击事件发生，重新获取数据。并展示
    regionWrap.addEventListener('click',function(e){
        var e =  e || window.event
        var target = e.target || e.srcElement
        e.stopPropagation();

        if (target.nodeName.toLowerCase() === "input"){
            checkBox(target,regInputList,regCheckAll)
        }

        var a = getLocalCheckList()
        var b = getProductCheckList()
        var data = getData(a,b)

        makeTable(wrap,data,a,b)

        makeManyLines(data)
        createState(a,b)

    })
    productWrap.addEventListener('click',function(e){
        var e =  e || window.event
        var target = e.target || e.srcElement
        e.stopPropagation();

        if (target.nodeName.toLowerCase() === "input"){
            checkBox(target,proInputList,proCheckAll)
        }
        var a = getLocalCheckList()
        var b = getProductCheckList()
        var data = getData(a,b)

        makeTable(wrap,data,a,b)

        makeManyLines(data)
        createState(a,b)


    })

    //鼠标滑过表格显示当前行的数据的折线图和柱形图
    wrap.addEventListener('mouseover',function(e){
        var e = e || window.event;
        var target = e.target || e.srcElement
        if(target.nodeName.toLowerCase() === "td"){

            //动态给tr标签添加了自定义属性data-label='地区-商品'，获取属性后分割为数组，便于操作
            var showData = target.parentElement.getAttribute('data-label').split('-')

            //筛选数据
            var chartData = sourceData.filter(function(item){
                return item.region === showData[0] && item.product === showData[1]

            })
            var outputTochart = chartData[0].sale
            // 图表展示
            makeBarCharts(outputTochart)
            makeLine(outputTochart)


            //动态添加商品--地区的标识
            var canvas = document.querySelector('#mycanvas')
            var ctx = canvas.getContext('2d')
            ctx.font="14px Microsoft yahei"
            ctx.fillStyle="#000"
            ctx.fillText(chartData[0].region+'--'+chartData[0].product+'    月份销售折线图', 450, 685);
        }
    })
    wrap.addEventListener('click',edit)
    function edit(e){
        var e = e || window.event
        var target = e.target || e.srcElement
        var sureBtnFlag = 0
        e.stopPropagation();
        if(target.nodeName.toLowerCase() === "td"){

            //记录初始数据
            var initVal = target.innerText
            var input = document.createElement('input')
            input.value = initVal;
       
            //让blur事件处理程序延迟以上，先让保存事件发生，所以给保存按钮mouse down
            input.onblur = function(){
                console.log('失去焦点')
                if(sureBtnFlag === 1){
                    target.innerHTML = input.value
                }else{
                    target.innerHTML = initVal 
                }
            }

            input.addEventListener('keyup',inputHandle)

            //input修改输入框的键盘事件。回车==确认，ESC===取消
            function inputHandle(e){
                if(e.keyCode===27){
                    target.innerHTML = initVal
                }
                if(e.keyCode===13){
                    isNaN(input.value) ?  target.innerHTML = initVal : target.innerHTML = input.value
                //获取到tr标签
                var editDataFarther= target.parentElement

                //从tr的自定义属性中获取地区-产品的值 
                var editDataLabel = editDataFarther.getAttribute('data-label').split('-')
                var editObj = {}
                editObj.region = editDataLabel[0]
                editObj.product = editDataLabel[1]
 
 
                //获取到td标签的所有数值  类似["手机", "华东", "1", "8", "140", "160", "180", "185", "190", "210", "230", "245", "255", "270"]
                var editDataEle = editDataFarther.querySelectorAll('td')
                var editData = []
 
                for (var i=0;i<14;i++){
                    editData.push(Number(editDataEle[i].innerText))
                }
 
                 //数据的前两个值是标题，跳过
                editObj.sale = editData.slice(2)
                 
                 //找到对应的sourceData中相对应的数据并替换掉
                for (let i = 0; i < sourceData.length; i++) {
                    if(sourceData[i].product == editObj.product && sourceData[i].region == editObj.region) {
                        sourceData[i] = editObj;
                        window.localStorage.setItem('showData',JSON.stringify(sourceData) )
                        return 
                        }
                }
                }
            }

            target.innerText=''

            //确定按钮
            var sureBtn = document.createElement('button')
            sureBtn.id='save'
            sureBtn.innerHTML="确定"

            //让mousedown事件先于input的blur事件发生，不能用click处理。click会让blur事件先发生
            sureBtn.addEventListener('mousedown',function(){
                e.stopPropagation();

                sureBtnFlag = 1
                console.log('保存按钮')
                isNaN(input.value) ?  target.innerHTML = initVal : target.innerHTML = input.value

                //获取到tr标签
                var editDataFarther= target.parentElement

               //从tr的自定义属性中获取地区-产品的值 
                var editDataLabel = editDataFarther.getAttribute('data-label').split('-')
                var editObj = {}
                editObj.product = editDataLabel[1]
                editObj.region = editDataLabel[0]


                //获取到td标签的所有数值  类似["手机", "华东", "1", "8", "140", "160", "180", "185", "190", "210", "230", "245", "255", "270"]
                var editDataEle = editDataFarther.querySelectorAll('td')
                var editData = []

                for (var i=0;i<14;i++){
                    editData.push(Number(editDataEle[i].innerText))
                }

                //数据的前两个值是标题，跳过
                editObj.sale = editData.slice(2)
                // console.log(editObj)
                
                //找到对应的sourceData中相对应的数据并替换掉
                for (let i = 0; i < sourceData.length; i++) {
                if(sourceData[i].product == editObj.product && sourceData[i].region == editObj.region) {
                    sourceData[i] = editObj;
                    window.localStorage.setItem('showData',JSON.stringify(sourceData) )
                    return 
                    }
                }
            })

            //取消按钮
            var delBtn = document.createElement('button')
            delBtn.innerHTML="取消"
            delBtn.onclick = function(){ 
                target.innerHTML = initVal
            }
            target.appendChild(input)

            //自动获取焦点并选中
            input.focus()
            input.select();
            target.appendChild(sureBtn)
            target.appendChild(delBtn)

        }
    }

    //另外保留上面的鼠标hover某一行时显示某一行数据的图表，但鼠标移开表格后，再恢复到显示表单对应的所有数据
    wrap.addEventListener('mouseleave',function(){

        var a = getLocalCheckList()
        var b = getProductCheckList()
        var data = getData(a,b)
        makeManyLines(data)
    })

    // 点击浏览器返回箭头时返回上次的查询结果
    window.addEventListener('popstate',getState)







    //获取checkbox选中的值
    function getLocalCheckList(){
        var localChecklist = []
        for (let i=0;i<regInputList.length;i++){
            if(regInputList[i].checked){
                localChecklist.push(regInputList[i].value)
            }
        }
        return localChecklist

    }

    //获取checkbox选中的值

    function getProductCheckList(){
        var procuctChecklist = []
        for (let i=0;i<proInputList.length;i++){
            if(proInputList[i].checked){
                procuctChecklist.push(proInputList[i].value)
            }
        }
        return procuctChecklist
        
    }


























    


}
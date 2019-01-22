function getData(localChecklist, procuctChecklist){
    var finalData = []

    for (let i = 0;i < procuctChecklist.length; i++){
        for(let j = 0;j < localChecklist.length; j++){
            var singleData = sourceData.filter(function(item){
                return item.region === localChecklist[j] && item.product === procuctChecklist[i]
            })
        // singleData返回值是一个有单个元素的数组，所以取出元素放入新列表中
        finalData.push(singleData[0])
        }
    }
    return finalData
}

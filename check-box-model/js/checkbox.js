
function checkBox(target,inputList,checkAll){

    //如果点击的是全选
    if(target.id === "all"){
        if(target.checked){
            for (var i = 0; i < inputList.length; i++){
                inputList[i].checked = "checked"
            }
            //因为页面加载完成后给第一个checkbox设置了默认选中并不可取消，所以要
            for(let i = 0; i < inputList.length; i++){
                inputList[i].disabled = ''
            }
        } else{

        }

    } 
    else {
        var n = 0;
        for (let i = 0; i < inputList.length; i++){
            if(inputList[i].checked){
                n++
            }
        }
        // -----------------------------------下列方式虽然视觉上可以达到不可取消效果，但是无法获取value值-------------------------------
        //不允许一个都不勾选，所以当用户想取消唯一一个被勾选的子选项时，无交互反应，不允许取消勾选
        // if(n === 0){
        //     if(target.checked){
        //         e.preventDefault()

        //     } else{
        //         target.checked = "checked"
        //     }

        // }
        if(n === 1){
            for(let i = 0; i < inputList.length; i++){
                if(inputList[i].checked){
                    inputList[i].disabled = true;
                }
            } 
        }

        //如果当前是全选状态，取消任何一个子选项，则全选CheckBox也要置为未勾选状态
        if (n > 1 && n < inputList.length){
            checkAll.checked = ""
            for(let i = 0; i < inputList.length; i++){
                inputList[i].disabled = ''

            }
        }
      
    
        //点击最后一个未被选中的单个选项后，全选CheckBox也要置为被勾选状态
        if (n === inputList.length){
            checkAll.checked = "checked"
        }
    }

      
}


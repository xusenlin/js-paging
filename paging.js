/**
 * Created by JORDAN on 2016/7/23.
 */
//��生成分页按钮，total为总页数。id是分页的容器如：'content',callback是回调函数，可以接收当前页面值，
function pagination(total,id,callback){
    var content = document.getElementById(id);
    var html = '';

    html += '<div id="mPageList" class="m_page_list"><a id="mPagePrev" class="prev active" href="javascript:;"><b>&lt;</b>上一页</a><a id="mPageNext" class="next" href="javascript:;">';
    html += '下一页<b>&gt;</b></a><span><b id="mPageCur">1</b>/<i id="mPageTotal">';
    html += total;
    html += '</i></span>&nbsp;&nbsp;到<input id="mPageValue" class="m_page_value" type="text" value="">';
    html += '<a id="mPageGo" class="m_page_go" href="javascript:;">GO</a></div>';

    content.innerHTML=html;

    //分页生成完毕添加事件
    var pageValue = 1;//第几页
    var pageValueCon= document.getElementById('mPageCur');//第几页容器
    var pagePrevBtn = document.getElementById('mPagePrev');//上一页按钮
    var pageNextBtn = document.getElementById('mPageNext');//下一页按钮
    var inputValue = document.getElementById('mPageValue');//输入框
    var goBtn = document.getElementById('mPageGo');//go按钮

    if(total==1){
        pagePrevBtn.className = 'prev active';
        pageNextBtn.className= 'next active';
    }

    //上一页事件
    pagePrevBtn.onclick=function(){
        pageNextBtn.className = 'next';
        pageValue--;
        if(pageValue<1){
            console.log('小于1了，不在执行回调函数');
            pageValue=1;
            return;
        }
        if(pageValue==1){
            this.className= 'prev active';
        }
        pageValueCon.innerText=pageValue;
        callback(pageValue);
    }

    //下一页事件
    pageNextBtn.onclick=function(){

        NProgress.start();
        pagePrevBtn.className = 'prev';
        pageValue++;
        if(pageValue>total){
            console.log('大于'+total+'了，不在执行回调函数');
            pageValue=total;
            return;
        }
        if(pageValue==total){
            this.className= 'next active';
        }
        pageValueCon.innerText=pageValue;
        callback(pageValue);
    }

    //跳转
    goBtn.onclick=function(){

        var input_value= inputValue.value;
        if(!(input_value<=total&&input_value&&input_value>=1)){
            console.log('不在范围内或空');
            return;
        }else if(input_value==pageValue){
            console.log('输入当前页面退出');
            return;
        }else if(input_value==total){
            pagePrevBtn.className = 'prev';
            pageNextBtn.className= 'next active';

        }else if(input_value==1){
            pagePrevBtn.className = 'prev active';
            pageNextBtn.className= 'next';
        }else if(input_value!=1&&input_value!=total){
            pagePrevBtn.className = 'prev';
            pageNextBtn.className= 'next';
        }

        pageValue=input_value;
        pageValueCon.innerText=pageValue;
        callback(pageValue);
    }
}
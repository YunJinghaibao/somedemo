var detail = [
    { name: '赵', src: '01.jpg', sex: 'male', description: '海豹是只小花喵！！！' },
    { name: '钱', src: '02.jpg', sex: 'male', description: '海豹是只小花喵！！！' },
    { name: '孙', src: '03.jpg', sex: 'male', description: '海豹是只小花喵！！！' },
    { name: '李', src: '04.jpg', sex: 'male', description: '海豹是只小花喵！！！' },
    { name: '赵', src: '05.jpg', sex: 'female', description: '海豹是只小母喵！！！' },
    { name: '钱', src: '06.jpg', sex: 'female', description: '海豹是只小母喵！！！' },
    { name: '孙', src: '07.jpg', sex: 'female', description: '海豹是只小母喵！！！' },
    { name: '李', src: '08.jpg', sex: 'female', description: '海豹是只小母喵！！！' },
];//数据
var oUl = document.getElementById('selet');
var oInput = document.getElementById('input');
var oSexul = document.getElementById('sex');
function show(list) {
    var str = '';
    list.forEach(function (ele, index) {
        str += '<li><img src="./images/' + ele.src + '" alt="#">\
        <span class="name">' + ele.name + '</span>\
        <span class="description">' + ele.description + '</span></li>'
    });
    oUl.innerHTML = str;
};
show(detail);//以数据创建li标签，并插入到html里面
oInput.oninput = function(){
    state.text = this.value;
    show(addFn(obj,detail));
};
function filterText(text,arr){
    var textArr = arr.filter(function(ele,index){
        if(ele.name.indexOf(text) !== -1){
            return true;
        };
    });
    return textArr;
};//输入框输入并筛选出数组，再插入到html里面
oSexul.addEventListener('click',function(e){ 
    state.sex = e.target.getAttribute('sex');
    var sexEle = document.getElementsByClassName('a_sex')[0];
    sexEle.className = '';
    e.target.className = 'a_sex';
    show(addFn(obj,detail));
});//点击筛选
filterSex = function(sex,arr){
    if(sex == 'all'){
        return arr;
    }else{
        var sexArr;
        sexArr = arr.filter(function(ele,index){
            if(sex == ele.sex){
                return true;
            };
        });
        return sexArr;
    };
};//筛选性别
var obj = {
    text : filterText,
    sex : filterSex
};
var state = {
    text : '',
    sex : 'all'
}
function addFn(obj,arr){
    var lastArr = arr;
    for(var prop in obj){
        lastArr = obj[prop](state[prop],lastArr)
    };
    return lastArr;
}
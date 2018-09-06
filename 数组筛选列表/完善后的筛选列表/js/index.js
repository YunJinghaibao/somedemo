var detail = [
    { name: '赵', src: '01.jpg', sex: 'male', description: '海豹是只小花喵！！！' },
    { name: '钱', src: '02.jpg', sex: 'male', description: '海豹是只小花喵！！！' },
    { name: '孙', src: '03.jpg', sex: 'male', description: '海豹是只小花喵！！！' },
    { name: '李', src: '04.jpg', sex: 'male', description: '海豹是只小花喵！！！' },
    { name: '赵', src: '05.jpg', sex: 'female', description: '海豹是只小母喵！！！' },
    { name: '钱', src: '06.jpg', sex: 'female', description: '海豹是只小母喵！！！' },
    { name: '孙', src: '07.jpg', sex: 'female', description: '海豹是只小母喵！！！' },
    { name: '李', src: '08.jpg', sex: 'female', description: '海豹是只小母喵！！！' },
];
var oUl = document.getElementById('selet'),
    oInput = document.getElementById('input'),
    oSexul = document.getElementById('sex'),
    timer;
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



function createStore(initState) {
    var state = initState || {},
        eventList = [];
    function getState() {
        return state;
    }
    function disPatch(behavor) {
        state[behavor.type] = behavor.value;
        eventList.forEach(function (ele, index) {
            ele()
        })
    }
    function scripts(fn) {
        eventList.push(fn)
    }
    return {
        getState: getState,
        disPatch: disPatch,
        scripts: scripts
    }
}
var store = createStore({ text: '', sex: 'all' });
store.scripts(function () {
    show(addFn(obj, detail))
});



function delay(event, sj) {
    var timer;
    return function () {
        var self = this,
            arg = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            event.apply(self, arg)
        }, sj)
    }
}



oInput.oninput = delay(sx, 1000)
function sx() {
    store.disPatch({ type: 'text', value: this.value });
};
function filterText(text, arr) {
    var textArr = arr.filter(function (ele, index) {
        if (ele.name.indexOf(text) !== -1) {
            return true;
        };
    });
    return textArr;
};



oSexul.addEventListener('click', function (e) {
    store.disPatch({ type: 'sex', value: e.target.getAttribute('sex') });
    var sexEle = document.getElementsByClassName('a_sex')[0];
    sexEle.className = '';
    e.target.className = 'a_sex';
}, false);
filterSex = function (sex, arr) {
    if (sex == 'all') {
        return arr;
    } else {
        var sexArr;
        sexArr = arr.filter(function (ele, index) {
            if (sex == ele.sex) {
                return true;
            };
        });
        return sexArr;
    };
};



var obj = {
    text: filterText,
    sex: filterSex
};
function addFn(obj, arr) {
    var lastArr = arr;
    for (var prop in obj) {
        lastArr = obj[prop](store.getState()[prop], lastArr)
    };
    return lastArr;
}
// 倒计时封装
export default function InitTime(endtime) {  
    var hh,mm,ss = null;  
    var time = parseInt(endtime) - new Date().getTime();  
    if(time<= 0){  
        return '结束'  
    }else{   
        hh = Math.floor((time / 1000 / 60 / 60) );  
        mm = Math.floor((time / 1000 / 60) % 60);  
        ss = Math.floor((time / 1000) % 60);
        hh = hh < 10 ? "0" + hh : hh;
        mm = mm < 10 ? "0" + mm : mm;
        ss = ss < 10 ? "0" + ss : ss;   
        var arr = [] ;
        arr.push(hh,mm,ss)
        return arr;  
    }  
}  
/*专门创建为count组件服务的reducer，他的本质就是一个函数，根据原理图，他接收两个参数，一个是preState，一个是action */
import {LOGIN,LOGOUT} from './constant'
import cookie from 'react-cookies'

let initdata = 0 

const countReducer = (preState = initdata,action)=>{
    const {type,data} = action;
    switch (type){
        case LOGIN:
            preState = data
            console.log('执行登录reducer');
            return preState  
        case LOGOUT:
            preState = data
            console.log('执行退出reducer');
            return preState 
        default:
            console.log('没有reducer');
            return preState
    }
    
}
export default countReducer;
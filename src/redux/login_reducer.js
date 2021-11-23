/*专门创建为count组件服务的reducer，他的本质就是一个函数，根据原理图，他接收两个参数，一个是preState，一个是action */
import {LOGIN,LOGOUT} from './constant'

const initdata = 0 
const countReducer = (preState = initdata,action)=>{
    const {type,data} = action;
    switch (type){
        case LOGIN:
            preState = data
            return preState  
        case LOGOUT:
            preState = data
            return preState 
        default:
            return preState
    }
    
}
export default countReducer;
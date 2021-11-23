/*
    该文件专门用于暴露一个store就好了 createStore
*/

//createstore专门创建核心store
import {createStore} from 'redux'
import countReducer from './login_reducer'


//开店之前指定厨师
export default createStore(countReducer)

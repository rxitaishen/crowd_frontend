/* 
	该文件专门为Count组件生成action对象
*/
import {LOGIN,LOGOUT} from './constant'

export const login = (data=1) => ({type:LOGIN,data:data})
export const logout = () => ({type:LOGOUT,data:0})

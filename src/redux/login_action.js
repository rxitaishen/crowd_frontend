/* 
	该文件专门为Count组件生成action对象
*/
import {LOGIN,LOGOUT} from './constant'

export const login = () => ({type:LOGIN,data:1})
export const logout = () => ({type:LOGOUT,data:0})

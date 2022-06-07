import service from 'axios';
const loginApi = {
  //登录
  login: (params) => {
    return service.post('/login', params);
  },

  logout: () => {
    return service.get('/logout');
  },

  updatePassword: (params) => {
    return service.post('/updatePassword', params);
  },

  //功能权限管理
  getModuleRoles: (params) => {
    return service.post('/getModuleRoles', params);
  },

  //	使用邮箱找回密码
  retrievePassword: (params) => {
    return service.post('/sysUser/retrievePassword', params);
  },

  //	注册用户
  register: (params) => {
    return service.post('/sysUser/register', params);
  },
  // 注册用户验证用户名是否唯一
  judgeUser: (params) => {
    return service.post('/sysUser/judgeUser', params);
  }
};
export default loginApi;

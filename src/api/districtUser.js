import service from 'axios';
const userApi = {
  list: (params) => {
    return service.post('/sysUserDistrict/userList', params);
  },
  delete: (params) => {
    return service.post('/sysUserDistrict/deleteUser', params);
  },
  addUser: (params) => {
    return service.post('/sysUserDistrict/addUser', params);
  },
  updateUser: (params) => {
    return service.post('/sysUserDistrict/updateUser', params);
  },

  //获取用户角色信息
  getUserRole: (params) => {
    return service.post('/sysUser/getUserRole', params);
  },

  //获取用户角色详细信息
  getUserInfo: (params) => {
    return service.post('/sysUser/getUserInfo', params);
  }
};
export default userApi;

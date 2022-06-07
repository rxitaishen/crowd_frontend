import service from 'axios';
const projectsExpertApi = {
  //获取专家列表
  getExperts: (params) => {
    return service.post('/sklProjectsExpertScore/getExperts', params);
  },
  //分配专家
  allocateExperts: (params) => {
    return service.post('/sklProjectsExpertScore/allocateExperts', params);
  },
  //显示该项目已分配的专家
  allocateExpertsInfo: (params) => {
    return service.post('/sklProjectsExpertScore/allocateExpertsInfo', params);
  },
  //删除时检查专家是否能被删除，如果能，则删除
  deleteExperts: (params) => {
    return service.post('/sklProjectsExpertScore/deleteExperts', params);
  },
  //	一键全部不能过
  allNotPass: (params) => {
    return service.post('/sklProjects/allNotPass', params);
  },

  //查看专家评审结果
  listExperts: (params) => {
    return service.post('/sklProjectsExpertScore/listExperts', params);
  },

  //导出专家评审结果
  export: (data) => {
    return service({
      url: '/sklProjectsExpertScore/export',
      method: 'post',
      responseType: 'blob',
      data
    });
  },
  // 获取导出专家评审结果自定义字段
  exportField: (params) => {
    return service.post('/sklProjectsExpertScore/exportField', params);
  },
  //提交专家评审结果
  submit: (params) => {
    return service.post('/sklProjectsExpertScore/submit', params);
  }
};
export default projectsExpertApi;

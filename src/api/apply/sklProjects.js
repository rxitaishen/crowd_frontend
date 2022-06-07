import service from 'axios';
const sklProjectsApi = {
  addOrUpdate: (isAddHandle, params) => {
    let apiUrl = isAddHandle ? '/sklProjects/addApplyProject' : '/sklProjects/updateApplyProject';
    return service.post(apiUrl, params, { timeout: 300000 });
  },
  delete: (params) => {
    return service.post('/sklProjects/deleteApplyProjects', params);
  },
  detail: (params) => {
    return service.post('/sklProjects/getApplyProject', params);
  },
  list: (params) => {
    return service.post('/sklProjects/projectList', params);
  },
  addDraftProject: (params) => {
    return service.post('/sklProjects/addDraftProject', params, { timeout: 300000 });
  },
  getDraftProject: (params) => {
    return service.post('/sklProjects/getDraftProject', params);
  },
  updateDraftProject: (params) => {
    return service.post('/sklProjects/updateDraftProject', params, { timeout: 300000 });
  },
  exportField: (params) => {
    return service.post('/sklProjects/exportField', params);
  },
  excelExport: (data) => {
    return service({
      url: '/sklProjects/excelExport',
      method: 'post',
      responseType: 'blob',
      data
    });
  },
  auditProjectCompany: (params) => {
    return service.post('/sklProjects/auditProjectCompany', params);
  },
  auditProjectOfficial: (params) => {
    return service.post('/sklProjects/auditProjectOfficial', params);
  },
  //撤回申请
  recallApply: (params) => {
    return service.post('/sklProjects/recallApply', params);
  },
  //下载文件
  download: (params) => {
    return service({
      url: '/sklProjects/download',
      method: 'post',
      data: params,
      responseType: 'blob'
    });
  },
  exportDeclareWord: (params) => {
    return service({
      url: '/sklProjects/exportDeclareWord',
      method: 'post',
      data: params,
      responseType: 'blob'
    });
  }
};
export default sklProjectsApi;

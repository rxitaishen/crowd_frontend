import service from 'axios';
const sklApprovalProjectsApi = {
  addOrUpdate: (isAddHandle, params) => {
    let apiUrl = isAddHandle ? '/sklApprovalProjects/add' : '/sklApprovalProjects/update';
    return service.post(apiUrl, params, { timeout: 300000 });
  },
  delete: (params) => {
    return service.post('/sklApprovalProjects/delete', params);
  },
  detail: (params) => {
    return service.post('/sklApprovalProjects/detail', params);
  },
  list: (params) => {
    return service.post('/sklApprovalProjects/list', params);
  },
  auditProjectCompany: (params) => {
    return service.post('/sklApprovalProjects/auditProjectCompany', params);
  },
  auditProjectOfficial: (params) => {
    return service.post('/sklApprovalProjects/auditProjectOfficial', params);
  },
  exportApprovalWord: (data) => {
    return service({
      url: '/sklApprovalProjects/exportApprovalWord',
      method: 'post',
      responseType: 'arraybuffer',
      data
    });
  },
  downloadApprovalWord: (params) => {
    return service({
      url: '/sklApprovalProjects/downloadApprovalWord',
      method: 'post',
      data: params,
      responseType: 'blob'
    });
  }
};
export default sklApprovalProjectsApi;

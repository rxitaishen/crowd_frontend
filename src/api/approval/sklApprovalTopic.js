import service from 'axios';
const sklApprovalTopicApi = {
  addOrUpdate: (isAddHandle, params) => {
    let apiUrl = isAddHandle ? '/sklApprovalTopic/add' : '/sklApprovalTopic/update';
    return service.post(apiUrl, params);
  },
  delete: (params) => {
    return service.post('/sklApprovalTopic/delete', params);
  },
  detail: (params) => {
    return service.post('/sklApprovalTopic/detail', params);
  },
  list: (params) => {
    return service.post('/sklApprovalTopic/list', params);
  },
  getTopic: (params) => {
    return service.post('/sklApprovalTopic/getApprovalTopic', params);
  }
};
export default sklApprovalTopicApi;

import service from 'axios';
const topicApi = {
  addOrUpdate: (isAddHandle, params) => {
    let apiUrl = isAddHandle ? '/sklProjects/topicAdd' : '/sklProjects/topicUpdate';
    return service.post(apiUrl, params);
  },
  delete: (params) => {
    return service.post('/sklProjects/topicDelete', params);
  },
  detail: (params) => {
    return service.post('/sklProjects/topicDetail', params);
  },
  list: (params) => {
    return service.post('/sklProjects/topicList	', params);
  }
};
export default topicApi;

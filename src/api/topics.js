import service from 'axios';
const topicsApi = {
  list: (params) => {
    return service.post('/sklTopicsCollectionSide/topicsSideList', params);
  },
  delete: (params) => {
    return service.post('/sklTopicsCollectionSide/topicsSideDelete', params);
  },
  add: (params) => {
    return service.post('/sklTopicsCollectionSide/topicsSideAdd', params);
  },
  //查询限制投稿时间
  inquire: (params) => {
    return service.post('/sklTopicsCollectionSide/topicsSide', params);
  },
  export: (data) => {
    return service({
      url: '/sklTopicsCollectionSide/exportTopicsSide',
      method: 'post',
      responseType: 'blob',
      data
    });
  }
};
export default topicsApi;

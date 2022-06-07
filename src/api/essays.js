import service from 'axios';
const essaysApi = {
  list: (params) => {
    return service.post('/sklEssaysCollectionSide/essaysSideList', params);
  },
  delete: (params) => {
    return service.post('/sklEssaysCollectionSide/essaysSideDelete', params);
  },
  addEssays: (params) => {
    return service.post('/sklEssaysCollectionSide/essaysSideAdd', params);
  },
  //查询限制投稿时间
  inquire: (params) => {
    return service.post('/sklEssaysCollectionSide/essaysSide', params);
  },
  expor: (data) => {
    return service({
      url: '/sklEssaysCollectionSide/exportEssaysSide',
      method: 'post',
      responseType: 'blob',
      data
    });
  }
};
export default essaysApi;

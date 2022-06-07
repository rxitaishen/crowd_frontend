import service from 'axios';
const expertScoreKtListApi = {
  //专家评审课题列表
  list: (params) => {
    return service.post('/sklProjectsExpertScore/list', params);
  },
  detail: (params) => {
    return service.post('/sklProjectsExpertScore/detail', params);
  }
};
export default expertScoreKtListApi;

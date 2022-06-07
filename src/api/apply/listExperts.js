import service from 'axios';
const listExpertsApi = {
  //查看专家评审结果
  list: (params) => {
    return service.post('/sklProjectsExpertScore/listExperts', params);
  }
};
export default listExpertsApi;

import service from 'axios';
const api = {
  /*门户网站管理*/
  ns: (params) => {
    /* 列表详情 */
    return service.post('/sklManagement/ns', params);
  },
  nsUpdate: (params) => {
    /* 南宋详情 */
    return service.post('/sklManagement/nsUpdate', params);
  },
  addSocietyOrgansizations: (params) => {
    /* 社团组织列表信息添加 */
    return service.post('/sklManagement/addSocietyOrgansizations', params);
  },
  societyOrganizationsInfo: (params) => {
    /* 社团组织列表信息回显 */
    return service.post('/sklManagement/societyOrganizationsInfo', params);
  },
  selectSocietyOrgansizations: (params) => {
    /* 社团组织列表详情 */
    return service.post('/sklManagement/selectSocietyOrgansizations', params);
  },
  updateSocietyOrgansizations: (params) => {
    /* 更新社团组织 */
    return service.post('/sklManagement/updateSocietyOrgansizations', params);
  },
  deleteSocietyOrgansizations: (params) => {
    /* 删除社团组织 */
    return service.post('/sklManagement/deleteSocietyOrgansizations', params);
  },
  articlesList: (params) => {
    // 获取文章列表
    return service.post('/sklManagement/selectArticlesList', params);
  },
  specialList: (params) => {
    // 获取特殊文章列表
    return service.post('/sklManagement/selectSpecialList', params);
  },
  articlesAdd: (params) => {
    // 文件添加
    return service.post('/sklManagement/articlesAdd', params);
  },
  articlesUpdate: (params) => {
    // 更新文章
    return service.post('/sklManagement/articlesUpdate', params);
  },
  articleInfo: (params) => {
    // 点编辑获取文章信息
    return service.post('/sklManagement/articleInfo', params);
  },
  articlesDelete: (params) => {
    // 删除文章
    return service.post('/sklManagement/articlesDelete', params);
  },
  //下载文件
  download: (params) => {
    return service({
      url: '/sklManagement/download',
      method: 'post',
      data: params,
      responseType: 'blob'
    });
  },
  /* 网上申报管理 */
  topicList: (params) => {
    // 获取项目主题列表
    return service.post('/sklProjects/topicManageList', params);
  },
  topicAdd: (params) => {
    // 添加项目主题列表
    return service.post('/sklProjects/topicAdd', params);
  },
  topicDelete: (params) => {
    // 删除项目主题列表
    return service.post('/sklProjects/topicDelete', params);
  },
  topicUpdate: (params) => {
    // 更新项目主题列表
    return service.post('/sklProjects/topicUpdate', params);
  },
  topicDetail: (params) => {
    // 获取项目主题列表详情
    return service.post('/sklProjects/topicDetail', params);
  },
  /* 立项申请管理 */
  listAll: (params) => {
    // 获取立项申请管理列表
    return service.post('/sklApprovalTopic/listAll', params);
  },
  addList: (params) => {
    // 增加立项申请管理
    return service.post('/sklApprovalTopic/add', params);
  },
  deleteList: (params) => {
    // 删除立项申请管理
    return service.post('/sklApprovalTopic/delete', params);
  },
  updateList: (params) => {
    // 更新立项申请管理
    return service.post('/sklApprovalTopic/update', params);
  },
  detailList: (params) => {
    // 查看立项申请详情
    return service.post('/sklApprovalTopic/detail', params);
  },
  /* 选题征集管理 */
  selectTopicsList: (params) => {
    /* 选题列表查询 */
    return service.post('/sklTopicsCollection/selectTopicsList', params);
  },
  topicsAdd: (params) => {
    /*选题列表添加*/
    return service.post('/sklTopicsCollection/topicsAdd', params);
  },
  topicsDetail: (params) => {
    /* 选题列表详情 */
    return service.post('/sklTopicsCollection/topicsDetail', params);
  },
  topicsUpdate: (params) => {
    /* 更新选题列表 */
    return service.post('/sklTopicsCollection/topicsUpdate', params);
  },
  /*征文投稿管理*/
  selectEssaysList: (params) => {
    /* 列表查询 */
    return service.post('/sklEssaysCollection/selectEssaysList', params);
  },
  essaysUpdate: (params) => {
    /* 列表更新 */
    return service.post('sklEssaysCollection/essaysUpdate', params);
  },
  essaysAdd: (params) => {
    /* 列表添加 */
    return service.post('/sklEssaysCollection/essaysAdd', params);
  },
  essaysDetail: (params) => {
    /* 列表详情 */
    return service.post('/sklEssaysCollection/essaysDetail', params);
  }
};
export default api;

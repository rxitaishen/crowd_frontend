import service from 'axios';
const concludeApi = {
  addOrUpdate: (isAddHandle, params) => {
    let apiUrl = isAddHandle ? '/sklConcludeProjects/add' : '/sklConcludeProjects/update';
    return service.post(apiUrl, params, { timeout: 300000 });
  },
  delete: (params) => {
    return service.post('/sklConcludeProjects/delete', params);
  },
  detail: (params) => {
    return service.post('/sklConcludeProjects/detail', params);
  },
  list: (params) => {
    return service.post('/sklConcludeProjects/list', params);
  },

  //添加草稿
  addDraft: (params) => {
    return service.post('/sklConcludeProjects/addDraft', params, { timeout: 300000 });
  },

  //更新草稿
  updateDraft: (params) => {
    return service.post('/sklConcludeProjects/updateDraft', params, { timeout: 300000 });
  },

  //申报单位审核
  auditProjectCompany: (params) => {
    return service.post('/sklConcludeProjects/auditProjectCompany', params);
  },

  //官方规划项目审核
  auditProjectOfficial: (params) => {
    return service.post('/sklConcludeProjects/auditProjectOfficial', params);
  },

  //根据项目编号获取立项信息
  detailByPrjCode: (params) => {
    return service.post('/sklConcludeProjects/detailByPrjCode', params);
  },

  //获取最近一次审批结题时间和编号
  getConcludeCodeAndTime: (params) => {
    return service.post('/sklConcludeProjects/getConcludeCodeAndTime', params);
  },

  //下载文件
  download: (params) => {
    return service({
      url: '/sklConcludeProjects/download',
      method: 'post',
      data: params,
      responseType: 'blob'
    });
  },
  //证书下载
  /* certificateDownload: (params) => {
    return service({
      url: '/sklConcludeProjects/certificateDownload',
      method: 'post',
      data: params,
      responseType: 'blob'
    });
  }, */

  certificateDownload: (data) => {
    return service({
      url: '/sklConcludeProjects/certificateDownload',
      method: 'post',
      responseType: 'arraybuffer',
      data
    });
  },
  certificateWordDownload: (data) => {
    return service({
      url: '/sklConcludeProjects/certificateWordDownload',
      method: 'post',
      responseType: 'arraybuffer',
      data
    });
  },
  //导出字段列表
  exportField: (params) => {
    return service.post('/sklConcludeProjects/exportField', params);
  },

  //excel文件导出 也要像上面那样写
  excelExport: (data) => {
    return service({
      url: '/sklConcludeProjects/excelExport',
      method: 'post',
      responseType: 'blob',
      data
    });
  },

  // 结题下载
  exportConcludeWord: (data) => {
    return service({
      url: '/sklConcludeProjects/exportConcludeWord',
      method: 'post',
      responseType: 'blob',
      data
    });
  }
};
export default concludeApi;

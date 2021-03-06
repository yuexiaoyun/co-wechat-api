'use strict';

var util = require('./util');

var postJSON = util.postJSON;

/**
 * 设置所属行业
 * Examples:
 * ```
 * var industryIds = {
 *  "industry_id1":'1',
 *  "industry_id2":"4"
 * };
 * api.setIndustry(industryIds);
 * ```

 * @param {Object} industryIds 公众号模板消息所属行业编号 */
exports.setIndustry = function* (industryIds) {
  var token = yield this.ensureAccessToken();
  var apiUrl = this.prefix + 'template/api_set_industry?access_token=' + token.accessToken;
  return yield this.request(apiUrl, postJSON(industryIds));
};

/**
 * 获得模板ID
 * Examples:
 * ```
 * var templateIdShort = 'TM00015';
 * api.addTemplate(templateIdShort);
 * ```
 * @param {String} templateIdShort 模板库中模板的编号，有“TM**”和“OPENTMTM**”等形式
 */
exports.addTemplate = function* (templateIdShort) {
  var token = yield this.ensureAccessToken();
  var apiUrl = this.prefix + 'template/api_add_template?access_token=' + token.accessToken;
  var templateId = {
    template_id_short: templateIdShort
  };
  return yield this.request(apiUrl, postJSON(templateId));
};

/**
 * 发送模板消息
 * Examples:
 * ```
 * var templateId: '模板id';
 * // URL置空，则在发送后,点击模板消息会进入一个空白页面（ios）, 或无法点击（android）
 * var url: 'http://weixin.qq.com/download';
 * var topcolor = '#FF0000'; // 顶部颜色
 * var data = {
 *  user:{
 *    "value":'黄先生',
 *    "color":"#173177"
 *  }
 * };
 * api.sendTemplate('openid', templateId, url, topColor, data);
 * ```
 * @param {String} openid 用户的openid
 * @param {String} templateId 模板ID
 * @param {String} url URL置空，则在发送后，点击模板消息会进入一个空白页面（ios），或无法点击（android）
 * @param {String} topColor 顶部颜色
 * @param {Object} data 渲染模板的数据
 */
exports.sendTemplate = function* (openid, templateId, url, topColor, data) {
  var token = yield this.ensureAccessToken();
  var apiUrl = this.prefix + 'message/template/send?access_token=' + token.accessToken;
  var template = {
    touser: openid,
    template_id: templateId,
    url: url,
    topcolor: topColor,
    data: data
  };
  return yield this.request(apiUrl, postJSON(template));
};

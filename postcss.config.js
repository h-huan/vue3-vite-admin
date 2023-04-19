/*
 * @Author: h-huan
 * @Date: 2023-03-24 11:21:41
 * @LastEditors: h-huan
 * @LastEditTime: 2023-03-24 16:17:42
 * @Description: 
 */
export default {
  plugins: {
    // 添加浏览器前缀
    autoprefixer: {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8',
        'last 10 versions' // 所有主流浏览器最近10版本用
      ],
      grid: true
    },
    // 将px转换为rem
    'postcss-pxtorem': {
      rootValue: 16, // 主字体大小
      propList: ['*'],
      // unitPrecision: 2,
      selectorBlackList: ['echarts_', 'lds-ripple-spinner']
    }
  }
}
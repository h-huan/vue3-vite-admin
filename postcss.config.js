/*
 * @Author: h-huan
 * @Date: 2023-03-24 11:21:41
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-09 09:40:12
 * @Description: 
 */
export default {
  plugins: {
    // 添加浏览器前缀
    autoprefixer: {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 62",
        "ff > 31",
        "ie >= 8",
        'last 10 versions'
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
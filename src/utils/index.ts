/*
 * @Author: h-huan
 * @Date: 2023-04-23 15:32:54
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-28 09:42:07
 * @Description: 
 */

/**
 * @description: 格式化字符戳
 * @param {*} time
 * @param {string} cFormat
 * @return {*}
 */
export function parseTime(time, cFormat?: string) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'undefined' || time === null || time === 'null') {
    return ''
  } else if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @description: 下载文件
 * @param {*} obj
 * @param {*} name
 * @param {*} suffix
 * @return {*}
 */
export function downloadFile(obj, name, suffix) {
  const url = window.URL.createObjectURL(new Blob([obj]))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  const fileName = parseTime(new Date()) + '-' + name + '.' + suffix
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

interface options {
  value: Object,
  label: string,
}

/**
 * @description: 过来字典过滤方法
 * @param {Array} options 字典数组
 * @param {string} val
 * @return {*}
 */
export function dictFilters(options?:Array<options>, val?:string) {
  for (let i = 0; i < options.length; i++) {
    if(options[i]){
      options[i].value=val
      return options[i].label
    }
  }
}
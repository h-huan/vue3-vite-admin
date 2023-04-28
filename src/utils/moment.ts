/*
 * @Author: h-huan
 * @Date: 2023-03-30 19:32:54
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-28 09:36:13
 * @Description: 
 */
import moment from "moment";

// http://momentjs.cn/

/**
 * @description: 获取今日的开始结束时间
 * @param {*} param1
 * @return {*}
 */
function getToday({date = "", format = "YYYY-MM-DD HH:mm:ss"}) {
  let obj = {
    starttime: '',
    endtime: ''
  }
  obj.starttime = moment(moment(date, format).startOf("day").valueOf()).format(format);
  obj.endtime = moment(moment(date, format).valueOf()).format(format);
  return obj
}
/**
 * @description: 获取昨日的开始结束时间
 * @param {*} param1
 * @return {*}
 */
function getYesterday({date = "", format = "YYYY-MM-DD HH:mm:ss"}) {
  let obj = {
    starttime: '',
    endtime: ''
  }
  obj.starttime = moment(moment(date, format).add(-1, 'days').startOf("day").valueOf()).format(format);
  obj.endtime = moment(moment(date, format).add(-1, 'days').endOf('day').valueOf()).format(format);
  return obj
}

/**
 * @description: 获取当前周的开始结束时间
 * @param {*} param1
 * @return {*}
 */
function getCurrWeekDays({date = "", format = "YYYY-MM-DD HH:mm:ss"}) {
  let obj = {
    starttime: '',
    endtime: ''
  }
  obj.starttime = moment(moment().week(moment(date, format).week()).startOf('week').add(1, 'days').valueOf()).format(format)
  obj.endtime = moment(moment().week(moment(date, format).week()).endOf('week').add(1, 'days').valueOf()).format(format);
  return obj
}

/**
 * @description: 获取上一周开始和结束时间
 * @param {*} param1
 * @return {*}
 */
function getLastWeekDays({date = "", format = "YYYY-MM-DD HH:mm:ss"}) {
  let obj = {
    starttime: '',
    endtime: ''
  }
  obj.starttime = moment(moment().week(moment(date, format).week() - 1).startOf('week').add(1, 'days').valueOf()).format(format)
  obj.endtime = moment(moment().week(moment(date, format).week() - 1).endOf('week').add(1, 'days').valueOf()).format(format);
  return obj
}

/**
 * @description: 获取下一周开始和结束时间
 * @param {*} param1
 * @return {*}
 */
function getWeekDays({date = "", format = "YYYY-MM-DD HH:mm:ss"}) {
  let obj = {
    starttime: '',
    endtime: ''
  }
  obj.starttime = moment(moment().week(moment(date, format).week() + 1).startOf('week').add(1, 'days').valueOf()).format(format)
  obj.endtime = moment(moment().week(moment(date, format).week() + 1).endOf('week').add(1, 'days').valueOf()).format(format);
  return obj
}


/**
 * @description: 获取当前月的开始结束时间
 * @param {*} param1
 * @return {*}
 */
function getCurrMonthDays({date = "", format = "YYYY-MM-DD HH:mm:ss"}) {
  let obj = {
    starttime: '',
    endtime: ''
  }
  obj.starttime = moment(moment().month(moment(date, format).month()).startOf('month').valueOf()).format(format);
  obj.endtime = moment(moment().month(moment(date, format).month()).endOf('month').valueOf()).format(format);
  return obj
}

/**
 * @description: 格式化时间
 * @param {*} date
 * @param {*} format
 * @return {*}
 */
function momentFormat(date, format){
  return moment(date).format(format)
}

export {
  getToday,
  getYesterday,
  getCurrWeekDays,
  getLastWeekDays,
  getWeekDays,
  getCurrMonthDays,
  momentFormat
}

//   // 获取上一个月的开始结束时间
// export function  getLastMonthDays(date="",format="YYYY-MM-DD HH:mm:ss") {
//     let obj = {
//         starttime: '',
//         endtime: ''
//     }
//     obj.starttime = moment(moment().month(moment().month() - 1).startOf('month').valueOf()).format('YYYY-MM-DD HH:mm:ss');
//     obj.endtime = moment(moment().month(moment().month() - 1).endOf('month').valueOf()).format('YYYY-MM-DD HH:mm:ss');
//     return obj
// }

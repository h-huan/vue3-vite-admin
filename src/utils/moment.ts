/*
 * @Author: h-huan
 * @Date: 2023-03-30 19:32:54
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-20 17:04:18
 * @Description: 
 */
import moment from "moment";

// http://momentjs.cn/

// 获取今日的开始结束时间
export function getToday({date = "", format = "YYYY-MM-DD HH:mm:ss"}) {
  let obj = {
    starttime: '',
    endtime: ''
  }
  obj.starttime = moment(moment(date, format).startOf("day").valueOf()).format(format);
  obj.endtime = moment(moment(date, format).valueOf()).format(format);
  return obj
}
// 获取昨日的开始结束时间
export function getYesterday({date = "", format = "YYYY-MM-DD HH:mm:ss"}) {
  let obj = {
    starttime: '',
    endtime: ''
  }
  obj.starttime = moment(moment(date, format).add(-1, 'days').startOf("day").valueOf()).format(format);
  obj.endtime = moment(moment(date, format).add(-1, 'days').endOf('day').valueOf()).format(format);
  return obj
}

// 获取当前周的开始结束时间
export function getCurrWeekDays({date = "", format = "YYYY-MM-DD HH:mm:ss"}) {
  let obj = {
    starttime: '',
    endtime: ''
  }
  obj.starttime = moment(moment().week(moment(date, format).week()).startOf('week').add(1, 'days').valueOf()).format(format)
  obj.endtime = moment(moment().week(moment(date, format).week()).endOf('week').add(1, 'days').valueOf()).format(format);
  return obj
}

// 获取上一周的开始结束时间
export function getLastWeekDays({date = "", format = "YYYY-MM-DD HH:mm:ss"}) {
  let obj = {
    starttime: '',
    endtime: ''
  }
  obj.starttime = moment(moment().week(moment(date, format).week() - 1).startOf('week').add(1, 'days').valueOf()).format(format)
  obj.endtime = moment(moment().week(moment(date, format).week() - 1).endOf('week').add(1, 'days').valueOf()).format(format);
  return obj
}

// 获取下一周的开始结束时间
export function getWeekDays({date = "", format = "YYYY-MM-DD HH:mm:ss"}) {
  let obj = {
    starttime: '',
    endtime: ''
  }
  obj.starttime = moment(moment().week(moment(date, format).week() + 1).startOf('week').add(1, 'days').valueOf()).format(format)
  obj.endtime = moment(moment().week(moment(date, format).week() + 1).endOf('week').add(1, 'days').valueOf()).format(format);
  return obj
}

// 获取当前月的开始结束时间
export function getCurrMonthDays({date = "", format = "YYYY-MM-DD HH:mm:ss"}) {
  let obj = {
    starttime: '',
    endtime: ''
  }
  obj.starttime = moment(moment().month(moment(date, format).month()).startOf('month').valueOf()).format(format);
  obj.endtime = moment(moment().month(moment(date, format).month()).endOf('month').valueOf()).format(format);
  return obj
}

export function momentFormat(date, format){
  return moment(date).format(format)
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

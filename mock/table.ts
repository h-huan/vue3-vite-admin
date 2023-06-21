import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    // 获取用户信息菜单
    url: '/mock/hhuan/table/getTableLists',
    method: 'get',
    response: () => {
      return {
        code: 200,
        status: "success",
        data: [
          { id: 1, username: 'test1', nickName: '测试1', gender: '男', email: '150xxxx@163.com', enabled: false, roles: [], jobs: [], dept: { id: null }, phone: '151XXXXXXXX' },
          { id: 2, username: 'test2', nickName: '测试2', gender: '男', email: '150xxxx@163.com', enabled: true, roles: [], jobs: [], dept: { id: null }, phone: '151XXXXXXXX' },
          { id: 3, username: 'test3', nickName: '测试3', gender: '男', email: '150xxxx@163.com', enabled: true, roles: [], jobs: [], dept: { id: null }, phone: '151XXXXXXXX' },
          { id: 4, username: 'test4', nickName: '测试4', gender: '男', email: '150xxxx@163.com', enabled: false, roles: [], jobs: [], dept: { id: null }, phone: '151XXXXXXXX' },
          { id: 5, username: 'test5', nickName: '测试5', gender: '男', email: '150xxxx@163.com', enabled: false, roles: [], jobs: [], dept: { id: null }, phone: '151XXXXXXXX' },
        ]
      }
    }
  },
] as MockMethod[];
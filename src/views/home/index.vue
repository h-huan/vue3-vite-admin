<!--
 * @Author: h-huan
 * @Date: 2023-03-28 08:56:23
 * @LastEditors: h-huan
 * @LastEditTime: 2023-06-15 17:51:01
 * @Description: 
-->

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import BarChart from '/@/components/echarts/BarChart.vue'
import BarChart2 from '/@/components/echarts/BarChart2.vue'

const todoList = reactive([
  {
    title: '今天要修复100个bug',
    status: false
  },
  {
    title: '今天要修复100个bug',
    status: false
  },
  {
    title: '今天要写100行代码加几个bug吧',
    status: false
  },
  {
    title: '今天要修复100个bug',
    status: false
  },
  {
    title: '今天要修复100个bug',
    status: true
  },
  {
    title: '今天要写100行代码加几个bug吧',
    status: true
  },
  {
    title: '今天要写100行代码加几个bug吧',
    status: true
  },
  {
    title: '今天要写101行代码加几个bug吧',
    status: true
  }
]);

export default defineComponent({
  name: 'components',
  components: { BarChart, BarChart2 },
  setup() {
    const state = reactive({
      name: 'admin',
      role: '超级管理员',
      todoList,
      dayDate: ''
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :lg="8" :md="8" :sm="24" :xs="24">
        <el-card shadow="hover" class="mgb20" style="height: 252px">
          <div class="user-info">
            <div class="user-info-box">
              <el-avatar :size="120" src="/images/avatar2.png" />
              <div class="user-info-cont">
                <div class="user-info-name">{{ name }}</div>
                <div>{{ role }}</div>
              </div>
            </div>
            <div class="user-info-lists">
              <div class="item">
                <span class="item_name">上次登录时间：</span>
                <span>2023-6-01</span>
              </div>
              <div class="item">
                <span class="item_name">上次登录地点：</span>
                <span>长沙</span>
              </div>
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" style="height: 252px">
          <template #header>
            <div class="card-header">
              <span>语言详情</span>
            </div>
          </template>
          Vue
          <el-progress :percentage="79.4" color="#42b983"></el-progress>
          TypeScript
          <el-progress :percentage="14" color="#f1e05a"></el-progress>
          CSS
          <el-progress :percentage="5.6"></el-progress>
          HTML
          <el-progress :percentage="1" color="#f56c6c"></el-progress>
        </el-card>
      </el-col>
      <el-col :lg="16" :md="16" :sm="24" :xs="24">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <el-icon class="grid-con-icon">
                  <i class="iconfont icon-yonghu"></i>
                </el-icon>
                <div class="grid-cont-right">
                  <div class="grid-num">1234</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2">
                <el-icon class="grid-con-icon">
                  <i class="iconfont icon-yonghu"></i>
                </el-icon>
                <div class="grid-cont-right">
                  <div class="grid-num">321</div>
                  <div>系统消息</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-3">
                <el-icon class="grid-con-icon">
                  <i class="iconfont icon-yonghu"></i>
                </el-icon>
                <div class="grid-cont-right">
                  <div class="grid-num">5000</div>
                  <div>商品数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card shadow="hover" style="height: 403px">
          <template #header>
            <div class="card-header">
              <span>待办事项</span>
              <div>
                <el-date-picker v-model="dayDate" type="date" placeholder="选择时间" />
                <el-button type="primary">添加</el-button>
              </div>
            </div>
          </template>
          <el-scrollbar height="300px" class="memo">
            <div class="item" v-for="(item, index) in todoList" :key="item">
              <div class="box" :class="[item.status ? 'over' : '']">{{ (index + 1) }}. {{ item.title }}</div>
              <div class="right" v-if="!item.status">
                <a href="javascript:;">完成</a> <a href="javascript:;">删除</a>
              </div>
            </div>
          </el-scrollbar>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :lg="12" :md="12" :sm="24" :xs="24">
        <el-card shadow="hover">
          <BarChart />
        </el-card>
      </el-col>
      <el-col :lg="12" :md="12" :sm="24" :xs="24">
        <el-card shadow="hover">
          <BarChart2 />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>


<style scoped  lang="scss">
.el-col {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    margin-left: 15px;
  }
}


// 用户
.user-info {
  .user-info-box {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #eaeaea;
  }

  .user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;

    .user-info-name {
      font-size: 30px;
      color: #222;
      margin-bottom: 20px;
    }
  }

  .user-info-lists {
    font-size: 14px;
    color: #999;
    line-height: 25px;
    padding: 10px 0;

    .item {
      .item_name {
        display: inline-block;
        width: 150px;
      }
    }
  }
}

// 信息提示
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;

  .grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }

  .grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;

    .grid-num {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 12px;
    }
  }

  &.grid-con-1 {
    .grid-con-icon {
      background: rgb(45, 140, 240);
    }

    .grid-num {
      color: rgb(45, 140, 240);
    }
  }

  &.grid-con-2 {
    .grid-con-icon {
      background: rgb(100, 213, 114);
    }

    .grid-num {
      color: rgb(100, 213, 114);
    }
  }

  &.grid-con-3 {
    .grid-con-icon {
      background: rgb(242, 94, 67);
    }

    .grid-num {
      color: rgb(242, 94, 67);
    }
  }
}

// 备忘录
.memo {
  .item {
    display: flex;
    padding: 12px 0;
    border-bottom: 1px solid #eaeaea;

    &:last-child {
      border-bottom: 0;
    }

    .box {
      flex: 1;
      padding-left: 10px;

      &.over {
        text-decoration: line-through;
        color: #999;
      }
    }

    .right {
      text-align: center;
      width: 100px;

      a {
        margin-right: 4px;

        &:last-child {
          margin-right: 0;
        }

        &:hover {
          color: #0077ff;
        }
      }
    }
  }
}
</style>

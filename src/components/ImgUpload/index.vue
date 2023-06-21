<script lang="ts">
import { defineComponent, reactive, toRefs, ref, watch, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'

export default defineComponent({
  name: 'ImgUpload',
  props: {
    modelValue: {
      type: String,
      default: null
    },
    list: {
      type: Boolean,
      default: false
    },
    video: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: ''
    },
  },
  emits: ['update:modelValue'],
  setup(props, content) {
    let propsValue = computed(() => props.modelValue);

    const state = reactive({
      imagesArr: [] as any,
    })

    onMounted(() => {
      // 列表形式展开为
      if (props.list) {

        if (propsValue.value.length > 0) {
          propsValue.value.split(';').forEach(item => {
            state.imagesArr.push({ 'full_url': item })
          });
        }
      }
    })

    // 获取的数据转换为渲染数据


    // 上传成功
    const handleAvatarSuccess: UploadProps['onSuccess'] = (
      response,
      uploadFile
    ) => {
      ElMessage.success('上传成功')
      // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
      if (!props.list) {
        state.imagesArr = response;
        propsValue = response[0].full_url;
      } else {
        state.imagesArr = response;
      }

      let imgStr = '';
      response.forEach(item => {
        imgStr = imgStr + item.full_url + ';';
      })
      content.emit('update:modelValue', imgStr.substring(0, imgStr.length - 1))
    }
    // 上传前
    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
      const dotIdx = rawFile.name.lastIndexOf(".") //获取最后一个.的位置
      const suffix = rawFile.name.substr(dotIdx + 1);//获取文件后缀
      const imgType = ['png', 'jpg', 'jpeg', 'gif'];
      if (imgType.indexOf(suffix.toLowerCase()) == -1) {
        ElMessage.error('请输入png、jpg、jpeg、gif格式图片')
        return false
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('请输入不大于2MB大小图片')
        return false
      }
      return true
    }


    // 删除列表图片
    const delectList = (data) => {
      console.log(state.imagesArr, data);
      state.imagesArr.forEach((item, index) => {
        if (item.full_url === data.full_url) {
          state.imagesArr.splice(index, 1)
          let imgStr = '';
          state.imagesArr.forEach(item => {
            imgStr = imgStr + item.full_url + ';';
          })
          content.emit('update:modelValue', imgStr.substring(0, imgStr.length - 1))
          return
        }
      })

    }
    return {
      propsValue,
      delectList,
      handleAvatarSuccess,
      beforeAvatarUpload,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div class="images-lists">
    <template v-if="list && imagesArr.length > 0">
      <div class="list-item" v-for="item in imagesArr">
        <img v-if="!video" :src="item.full_url" alt="">
        <video v-if="video" muted :src="item.full_url">
          您的浏览器不支持 video 标签。
        </video>
        <span class="delect" @click="delectList(item)"></span>
      </div>
    </template>
    <el-upload class="avatar-uploader" :action="action" :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload" :show-file-list="false">
      <img v-if="!list && !video && propsValue" :src="propsValue" class="avatar" />
      <video v-else-if="!list && video && propsValue" muted :src="propsValue">
        您的浏览器不支持 video 标签。
      </video>
      <el-icon v-else class="avatar-uploader-icon">
        <div>
          <img class="avatar-uploader_img" src="/images/upload.png" alt="">
          <p class="avatar-uploader_text">点击上传</p>
        </div>
      </el-icon>
    </el-upload>
  </div>
</template>

<style lang="scss" scoped>
.images-lists {
  display: flex;
  flex-wrap: wrap;

  .avatar-uploader {

    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }

  .list-item {
    width: 178px;
    height: 178px;
    display: block;
    background: #F3F5F9;
    border: 1px dashed var(--el-border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    margin-bottom: 15px;
    box-sizing: border-box;
    position: relative;

    &:hover {
      border-color: var(--el-color-primary);
    }

    .delect::before {
      content: "X";
      display: inline-block;
      height: 16px;
      width: 16px;
      line-height: 16px;
      text-align: center;
      font-size: 12px;
      border: 2px solid #B3BCC5;
      background: #B3BCC5;
      color: #fff;
      border-radius: 50%;
      transform: scale(0.8);
      position: absolute;
      right: -10px;
      top: -10px;
    }

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

}
</style>

<style >
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: #F3F5F9;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 14px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

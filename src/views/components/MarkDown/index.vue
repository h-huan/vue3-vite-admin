<script lang="ts">
// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { defineComponent, reactive, toRefs, ref } from 'vue'


export default defineComponent({
  name: 'MarkDown',
  components: { 'mavon-editor': mavonEditor.mavonEditor },
  setup() {
    const mavonEditorRef = ref(null) // 获取编辑器Vue实例子
    const state = reactive({
      content: 'sdfsd',
      height: document.documentElement.clientHeight - 155 + 'px',
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      }
    })

    const imgAdd = (name, $file) => {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('image', $file);

      console.log(imgAdd)

      // axios({
      //   url: 'server url',
      //   method: 'post',
      //   data: formdata,
      //   headers: { 'Content-Type': 'multipart/form-data' },
      // }).then((url) => {
      //   // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      //   mavonEditorRef.value.$img2Url(name, url);
      // })
    }

    return {
      mavonEditorRef,
      imgAdd,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div class="app-container">
    <mavon-editor :style="'height:' + height" ref="mavonEditorRef" class="mavonEditor" :toolbars="toolbars"
      v-model="content" @imgAdd="imgAdd" />
  </div>
</template>

<style lang="scss" scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
}
</style>
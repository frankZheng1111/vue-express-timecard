<template lang='jade'>
.form-horizontal
  .form-group
    .col-sm-6
      label 开始时间
      date-picker(:date="startTime", :option="option")
    .col-sm-6
      label 时间
      input.form-control(type="number", v-model="timeCard.duration", placeholder="持续时间")
  .form-group
    .col-sm-12
      label 备注
      input.form-control(type="text", v-model="timeCard.description", placeholder="事务描述")
  button.btn.btn-primary(@click="createNewCard()") 保存
  router-link.btn.btn-danger(to="/time-cards") 取消
  hr
</template>

<script>
import Datepicker from 'vue-datepicker'
export default {
  components: {
    'date-picker': Datepicker
  },
  data () {
    return {
      timeCard: {},
      // for Vue 2.0
      // vue date-picker
      startTime: {
        time: ''
      },
      endtime: {
        time: ''
      },
      option: {
        type: 'day',
        week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        format: 'YYYY-MM-DD',
        placeholder: '开始时间',
        inputStyle: {
          'display': 'block',
          'width': '100%',
          'height': '34px',
          'padding': '6px 12px',
          'font-size': '14px',
          'line-height': '1.42857143',
          'color': '#555',
          'background-color': '#fff',
          'background-image': 'none',
          'border': '1px solid #ccc',
          'border-radius': '4px',
          'box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075)',
          'transition': 'border-color ease-in-out .15s,box-shadow ease-in-out .15s'
        },
        buttons: {
          ok: '确定',
          cancel: '取消'
        }
      }
      //
    }
  },
  // data () {
  //   return {
  //     // 模拟一个默认值
  //     timeCard: {
  //       // user: {
  //       //   name: '二哲',
  //       //   email: 'kodo@forchange.cn',
  //       //   image: 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256'
  //       // }
  //     }
  //   }
  // },
  methods: {
    createNewCard () {
      console.log(this.startTime.time)
      this.$http.post('http://localhost:8888/create', {
        description: this.timeCard.description,
        duration: this.timeCard.duration,
        startTime: this.startTime.time
      }).then((ret) => {
        let timeCard = ret.data.timeCard
        console.log(timeCard)
        this.$emit('timeUpdate', timeCard)
        this.timeCard = {
          // user: {
          //   name: '二哲',
          //   email: 'kodo@forchange.cn',
          //   image: 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256'
          // }
        }
        this.startTime.time = ''
      })
    }
  }
}
</script>


<style>
  .cov-vue-date {
    display: block !important;
  }
  .btn {
    margin: 1px;
  }
</style>

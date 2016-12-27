<template lang='jade'>
.form-horizontal
  .form-group
    .col-sm-6
      label 开始时间
      input.form-control(type="date", v-model="timeCard.startTime", placeholder="开始时间")
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
export default {
  data () {
    return {
      // 模拟一个默认值
      timeCard: {
        // user: {
        //   name: '二哲',
        //   email: 'kodo@forchange.cn',
        //   image: 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256'
        // }
      }
    }
  },
  methods: {
    createNewCard () {
      this.$http.post('http://localhost:8888/create', {
        description: this.timeCard.description,
        duration: this.timeCard.duration,
        startTime: this.timeCard.startTime
      }).then((ret) => {
        let timeCard = this.timeCard
        console.log(timeCard)
        this.$emit('timeUpdate', timeCard)
        this.timeCard = {
          // user: {
          //   name: '二哲',
          //   email: 'kodo@forchange.cn',
          //   image: 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256'
          // }
        }
      })
    }
  }
}
</script>


<style>
  .btn {
    margin: 1px;
  }
</style>

<template lang='jade'>
div
  router-link.btn.btn-primary(v-if="$route.path !== '/time-cards/new'", to="/time-cards/new") 创建
  div(v-if="$route.path === '/time-cards/new'")
    h3 创建
  hr
  //下一级视图
  router-view(v-on:timeUpdate="timeUpdate")

  .time-cards
    p(v-if="!timeCards.length")
      strong 还没有任何任务

    .list-group
      //v-for 循环渲染
      a.list-group-item(v-for="timeCard in timeCards")
        .row
          .col-sm-2.user-details
            //`:src`属性，这个是vue的属性绑定简写`v-bind`可以缩写为`:`
            // 比如a标签的`href`可以写为`:href`
            //并且在vue的指令里就一定不要写插值表达式了(`:src={{xx}}`)，vue自己会去解析
            img.avatar.img-circle.img-responsive(:src="timeCard.user.image")
            p.text-center
              strong
                {{ timeCard.user.name }}

          .col-sm-2.text-center.time-block
            h3.list-group-item-text.total-time
              i.glyphicon.glyphicon-time
              {{ timeCard.duration }}
            p.label.label-primary.text-center
              i.glyphicon.glyphicon-calendar
              {{ timeCard.startTime }}

          .col-sm-7.comment-section
            p
              {{ timeCard.description }}

          .col-sm-1
            //事件绑定简写 @xxx
            button.btn.btn-xs.btn-danger.delete-button(@click="deletetimeCard(timeCard)") X
</template>

<script>
export default {
  data () {
    // 事先模拟一个数据
    let existingCard = {
      user: {
        name: '二哲',
        email: 'kodo@forchange.cn',
        image: 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256'
      },
      description: '一个事务的备注',
      duration: 1.5,
      startTime: '2016-05-01 08:08'
    }

    return {
      timeCards: [existingCard]
    }
  },
  methods: {
    deletetimeCard (timeCard) {
      // 这个方法用于删除某一项计划
      let index = this.timeCards.indexOf(timeCard)
      if (window.confirm('确定要删除吗?')) {
        this.timeCards.splice(index, 1)
        // 这里会派发到父组件上，执行父组件events里的deleteTime方法
        this.$emit('deleteTime', timeCard)
      }
    },
    timeUpdate (timeCard) {
      this.timeCards.push(timeCard)
      // 继续向上派发
      this.$emit('timeUpdate', timeCard)
    }
  }
}
</script>

<style>
  .avatar {
    height: 75px;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .user-details {
    background-color: #f5f5f5;
    border-right: 1px solid #ddd;
    margin: -10px 0;
  }
  .time-block {
    padding: 10px;
  }
  .comment-section {
    padding: 20px;
  }
</style>

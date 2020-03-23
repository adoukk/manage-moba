<template>
    <m-card :icon="icon" :title="title" :categories="categories">
      <div class="nav jc-between">
        <div class="nav-item" v-for="(category, i) in categories" :key="i" :class="{active: active === i}" @click="$refs.list.$swiper.slideTo(i)">
          <div class="nav-link" >{{category.name}}</div>
        </div> 
      </div>

      <div class="pt-3">
        <swiper ref="list" :options="{autoHeight: true}" @slide-change="() => active = $refs.list.$swiper.realIndex">
          <swiper-slide v-for="(category, i) in categories" :key="i">
            <!-- <div class="py-2" v-for="(news,j) in category.newsList" :key="j">
              <span>[{{news.categoryName}}]</span>
              <span>|</span>
              <span>{{news.title}}</span>
              <span>{{news.date}}</span>
            </div> -->
            <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </m-card>
</template>

<script>
export default {
    props:{
        icon: { type: String, required: true},
        title: { type: String, required: true},
        categories: {type: Array, required: true}
    },
    data() {
      return {
        active: 0
      }
    }
    
}
</script>
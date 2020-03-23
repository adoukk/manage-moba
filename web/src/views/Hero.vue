<template>
    <div class="page-hero">
        <div class="topbar bg-black py-2 text-white px-3 d-flex ai-center">
            <img src="../assets/wei.jpeg" height="30">
            <div class="px-2 flex-1">
                <span class="text-white">王者荣耀</span>
                <span class="text-white">攻略站</span>
            </div>
            
            <router-link tag="div" :to="`/heroes/list`">更多英雄 &gt;</router-link>
        </div>
        <div v-if="model">
            <div class="banner">
                <img :src="model.banner" alt="" class="w-100">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props :{
      id: {require: true}  
    },
    data() {
        return {
            model:null
        }
    },
    methods: {
        async fetch() {
            const res = await this.$http.get(`heroes/${this.id}`)
            this.model = res.data
        }
    },
    created() {
        this.fetch() //获取数据
    }
}
</script>
<template>
    <div class="page-article" v-if="model">
        <div class="d-flex py-3 px-2 border-bottom">
            <div class="iconfont icon-back text-blue">  
            </div>
            <strong class="flex-1 text-blue">
                    {{model.title}}
            </strong>
            <div class="text-grey fs-xs">
                2019-06-19
            </div>
        </div>
        <div v-html="model.body" class="px-3 fs-lg body">
            
        </div>
        <div class="px-3 border-top py-3">
            <div class="d-flex ai-center">
                <i class="iconfont icon-Menu"></i>
                <strong class="text-blue fs-lg ml-1">相关资讯</strong>
            </div>
            <router-link class="py-1" :to="`articles/${item._id}`" tag="div" v-for="item in model.related" :key="item._id">{{item.title}}</router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: { required: true }
    },
    data() {
        return {
            model: null
        }
    },
    watch: { //点击链接时id变化，监听id的变化 执行fetch方法
        id: 'fetch'
        /*id() {
            this.fetch()
        }*/
    },
    methods: {
        async fetch() {
            const res = await this.$http.get(`articles/${this.id}`)
            this.model = res.data
            
        }
    },
    
    created() {
        this.fetch()
    }
}
</script>

<style lang="scss">
    .page-article {
        .body {
            img {
                max-width: 100%;
                height: auto;
            }
            iframe {
                max-width: 100%;
                height: auto;
            }
        }
    }
</style>
<template>
<div class="main">
  <p class="container">敬请期待</p>
</div>
</template>


<script>
export default {
    data () {
        return {
        }
    },
    watch: {
    },
    mounted(){
    },
    methods: {
    },
    components: {
    }
}
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  line-height: 100%;
}
.container{
    width: 100%;
    position: fixed;
    top: 50%;
    left: 0;
    height: 0.4rem;
    color: #aaa;
    margin-top: -0.2rem;
    font-size: 0.4rem;
    text-align: center;
}
</style>


<template>
 <div class="hello">
   <div>
  <button>{{text}}</button>
  </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        text: 'Hello Spec'
      }
    },
    created () {
      this.text = 'Bye Spec'
    }
  }
</script>
<template lang="html">
  <main>
    <h1 class="title --text-center">Credits</h1>
    <div class="card-grid">
      <div class="nameCard">
        <img src="https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_1164,c_limit/phonepicutres-TA.jpg"
             alt="placeholder" width="250" height="250">
        <h3>Name1</h3>
        <h3 style="font-weight: 300">description</h3>
      </div>
      <div class="nameCard">
        <img src="https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_1164,c_limit/phonepicutres-TA.jpg"
             alt="placeholder" width="250" height="250">
        <h3>Name2</h3>
        <h3 style="font-weight: 300">description</h3>
      </div>
      <div class="nameCard">
        <img src="https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_1164,c_limit/phonepicutres-TA.jpg"
             alt="placeholder" width="250" height="250">
        <h3>Name3</h3>
        <h3 style="font-weight: 300">description</h3>
      </div>
      <div class="nameCard">
        <img src="https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_1164,c_limit/phonepicutres-TA.jpg"
             alt="placeholder" width="250" height="250">
        <h3>Name4</h3>
        <h3 style="font-weight: 300">description</h3>
      </div>
    </div>
  </main>
</template>

<script>
export default {
}
</script>

<style scoped>
  .nameCard {
    text-align: center;
  }
  img{
    border-radius: 50%;
  }
  .card-grid {
     margin-top: 70px;
     display: flex;
     justify-content: space-around;
   }
</style>

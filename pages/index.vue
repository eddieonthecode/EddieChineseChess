<template>
<div
    id="app"
    style="background-color: #ccc"
    class="d-flex flex-column align-items-center"
  >
    <h4
      class="d-flex align-items-center"
      style="
        min-height: 40px;
        max-height: 40px;
        white-space: nowrap;
        backdrop-filter: blur(8px);
        padding: 10px 10px;
        border-radius: 6px;
      "
    >
      Chinese chess by&nbsp;
      <i
        ><a
          href="https://www.facebook.com/dung.nguyentien.eddie/"
          target="_blank"
        >
          EddieOnTheCode</a
        ></i
      >
    </h4>
    <div
      class="board-wrapper w-100 flex-grow-1 d-flex justify-content-center align-items-center"
    >
      <Board />
    </div>
  </div>
</template>
<script>
import Board from "../components/Board";
export default {
  name: "App",
  components: {
    Board,
  },
  data() {
    return {
      // bgList: [
      //   "https://www.iucn.org/sites/dev/files/content/images/2020/shutterstock_1458128810.jpg",
      //   "https://wallpaperaccess.com/full/31189.jpg",
      //   "https://cdn.corporate.walmart.com/dims4/WMT/572511c/2147483647/strip/true/crop/1920x1066+0+7/resize/980x544!/quality/90/?url=https%3A%2F%2Fcdn.corporate.walmart.com%2F7b%2F66%2F142c151b4cd3a19c13e1ca65f193%2Fbusinessfornature-banner.png",
      //   "https://wallpaperaccess.com/full/1089781.jpg",
      //   "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Shaqi_jrvej.jpg/1200px-Shaqi_jrvej.jpg",
      // ],
      // currBg: 0,
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
.board-wrapper {
  max-width: calc(100vh * 8 / 9 - 48px);
}
</style>
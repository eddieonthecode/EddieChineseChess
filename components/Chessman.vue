<template>
  <div
    class="chessman flex-grow-1 position-absolute"
    :style="{
      top: ((y - 1) / 9) * 100 + '%',
      left: ((x - 1) / 8) * 100 + '%',
    }"
    v-if="x != -1 && y != -1"
  >
    <div
      class="chessman__main position-absolute d-flex align-items-center justify-content-center"
      :class="{ chessman__curr: currChessman }"
    >
      <img
        v-if="name"
        class="chessman__img position-relative"
        :class="(name && name.includes('Red')) ? 'chessman__img-red' : 'chessman__img-black'"
        :src="urlImage"
        alt="Black rock"
        width="100%"
      />
      <div v-else class="chessman__suggest position-relative"></div>
    </div>
  </div>
</template>

<script>
import { EnumChessman } from "../models/enum/EnumChessman";
export default {
  name: "Chessman",
  props: {
    name: {
      type: String,
      default: null,
    },
    x: {
      type: [Number, String],
      default: -1,
    },
    y: {
      type: [Number, String],
      default: -1,
    },
    currChessman: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    urlImage() {
      switch (this.name) {
        // Red
        case EnumChessman.Red.General:
          return "https://ik.imagekit.io/uvn3cxjawn6/Production/Chinese_chessman/rg_osnJZddnk.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652146318265";
        case EnumChessman.Red.Advisor.One:
        case EnumChessman.Red.Advisor.Two:
          return "https://ik.imagekit.io/uvn3cxjawn6/Production/Chinese_chessman/ra_DmpF6GA5E.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652146317022";
        case EnumChessman.Red.Elephant.One:
        case EnumChessman.Red.Elephant.Two:
          return "https://ik.imagekit.io/uvn3cxjawn6/Production/Chinese_chessman/re_xpkQp7iRD.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652146317961";
        case EnumChessman.Red.Horse.One:
        case EnumChessman.Red.Horse.Two:
          return "https://ik.imagekit.io/uvn3cxjawn6/Production/Chinese_chessman/rk_4OL6opYlh.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652146318593";
        case EnumChessman.Red.Chariot.One:
        case EnumChessman.Red.Chariot.Two:
          return "https://ik.imagekit.io/uvn3cxjawn6/Production/Chinese_chessman/rch_tQW8SUVcg.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652146317511";
        case EnumChessman.Red.Cannon.One:
        case EnumChessman.Red.Cannon.Two:
          return "https://ik.imagekit.io/uvn3cxjawn6/Production/Chinese_chessman/rc_48TSGmOmo.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652146317353";
        case EnumChessman.Red.Soldier.One:
        case EnumChessman.Red.Soldier.Two:
        case EnumChessman.Red.Soldier.Three:
        case EnumChessman.Red.Soldier.Four:
        case EnumChessman.Red.Soldier.Five:
          return "https://ik.imagekit.io/uvn3cxjawn6/Production/Chinese_chessman/rs_AcEEjS9BJ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652146319128";
        // Black
        case EnumChessman.Black.General:
          return "https://ik.imagekit.io/uvn3cxjawn6/Production/Chinese_chessman/bg_W-Lta4EAk.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652146315043";
        case EnumChessman.Black.Advisor.One:
        case EnumChessman.Black.Advisor.Two:
          return "https://ik.imagekit.io/uvn3cxjawn6/Production/Chinese_chessman/ba_bhNL_NHbz.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652146314354";
        case EnumChessman.Black.Elephant.One:
        case EnumChessman.Black.Elephant.Two:
          return "https://ik.imagekit.io/uvn3cxjawn6/Production/Chinese_chessman/be_0spAWFM7F.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652146314703";
        case EnumChessman.Black.Horse.One:
        case EnumChessman.Black.Horse.Two:
          return "https://ik.imagekit.io/uvn3cxjawn6/Production/Chinese_chessman/bk_3BLDFlsiX.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652146315606";
        case EnumChessman.Black.Chariot.One:
        case EnumChessman.Black.Chariot.Two:
          return "https://ik.imagekit.io/uvn3cxjawn6/Production/Chinese_chessman/bch_aAWy6T9rH.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652146314401";
        case EnumChessman.Black.Cannon.One:
        case EnumChessman.Black.Cannon.Two:
          return "https://ik.imagekit.io/uvn3cxjawn6/Production/Chinese_chessman/bc_5mm5l3PEF.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652146314384";
        case EnumChessman.Black.Soldier.One:
        case EnumChessman.Black.Soldier.Two:
        case EnumChessman.Black.Soldier.Three:
        case EnumChessman.Black.Soldier.Four:
        case EnumChessman.Black.Soldier.Five:
          return "https://ik.imagekit.io/uvn3cxjawn6/Production/Chinese_chessman/bs_GKGFgPPPN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652146316333";
        default:
          return "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.chessman {
  cursor: pointer;
  width: calc(100% / 8);
  transform: translate(-50%, -50%);
  padding-top: 12%;
  .chessman__main {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    &.chessman__curr {
      &::after {
        display: block;
        content: "";
        position: absolute;
        top: 8%;
        left: 12%;
        border-radius: 50%;
        width: 76%;
        height: 82%;
        box-shadow: 0px 0px 8px 7px #9198e5;
        /* z-index: 110; */
      }
    }
    .chessman__img {
      z-index: 100;
      &.chessman__img-red {
        @media screen and (max-width: 600px) {
          transform: rotate(180deg);
        }
      }
    }
    .chessman__suggest {
      width: min(3vh, 3vw);
      height: min(3vh, 3vw);
      background: radial-gradient(yellow, #e66465) !important;
      border-radius: 50%;
      z-index: 110;
    }
  }
}
</style>

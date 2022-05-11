<template>
  <div class="board w-100 position-relative">
    <table class="board__main d-flex flex-column position-absolute">
      <tr
        class="board__row d-flex"
        v-for="y in 9"
        :class="{ board__river: y == 5 }"
        :key="y"
      >
        <td
          class="board__col d-flex"
          v-for="x in 8"
          :class="{
            'board__diagonal-tr': (y == 1 && x == 4) || (y == 8 && x == 4),
            'board__diagonal-br': (y == 2 && x == 4) || (y == 9 && x == 4),
            'board__diagonal-tl': (y == 1 && x == 5) || (y == 8 && x == 5),
            'board__diagonal-bl': (y == 2 && x == 5) || (y == 9 && x == 5),
          }"
          :key="x"
        ></td>
      </tr>
      <!-- Chessman -->
      <Chessman
        v-for="(chess, index) in positions"
        @click.native="clickChessman(chess)"
        :x="chess.x"
        :y="chess.y"
        :currChessman="chess.x == currChessman.x && chess.y == currChessman.y"
        :key="index + 'A'"
        :name="chess.name"
      />
      <!-- Suggestion -->
      <Chessman
        @click.native="setNewPosition(position)"
        v-for="(position, index) in suggestPositions"
        :x="position.x"
        :y="position.y"
        :key="index + 'B'"
      />
    </table>
  </div>
</template>

<script>
import Chessman from "./Chessman";
import { EnumChessman } from "../models/enum/EnumChessman";
import { InitPosition } from "../models/model/InitPosition";
export default {
  name: "Board",
  components: {
    Chessman,
  },
  data() {
    return {
      positions: [...InitPosition],
      currChessman: { x: 0, y: 0, name: "" },
      suggestPositions: [],
      turn: "Black",
    };
  },
  methods: {
    /**
     * Dat vi tri moi
     * createdby ntdung 10.05.2022
     */
    setNewPosition(chess) {
      var chessman = this.determindChessman(chess.x, chess.y);
      var indexCurrChessman,
        indexRemoveChessman = -1;
      InitPosition.forEach((position, index) => {
        if (position.name == this.currChessman.name) {
          indexCurrChessman = index;
        }
        if (position.name == chessman) {
          indexRemoveChessman = index;
        }
      });
      this.$set(this.positions, indexCurrChessman, {
        name: this.currChessman.name,
        x: chess.x,
        y: chess.y,
      });
      if (indexRemoveChessman != -1) {
        this.$set(this.positions, indexRemoveChessman, {
          name: chessman,
          x: -1,
          y: -1,
        });
      }
      this.turn = this.turn == "Red" ? "Black" : "Red";
      this.$nextTick(() => {
        this.checkGeneral(this.turn);
      });
      this.suggestPositions = [];
    },
    clickChessman(chess) {
      var chessman = this.determindChessman(chess.x, chess.y);
      this.currChessman = { x: chess.x, y: chess.y, name: chessman };
    },
    /**
     * Xu ly goi y nuoc di
     * createdby ntdung 10.05.2022
     */
    handleSuggestPositions() {
      // Clear suggestion
      this.suggestPositions = [];
      if (!this.currChessman.name.includes(this.turn)) {
        alert(`Is ${this.turn} turn !!!`);
        return;
      }
      switch (this.currChessman.name) {
        // Red
        case EnumChessman.Red.General:
          this.suggestGeneral("Red", this.currChessman);
          break;
        case EnumChessman.Red.Advisor.One:
        case EnumChessman.Red.Advisor.Two:
          this.suggestAdvisor("Red", this.currChessman);
          break;
        case EnumChessman.Red.Elephant.One:
        case EnumChessman.Red.Elephant.Two:
          this.suggestElephant("Red", this.currChessman);
          break;
        case EnumChessman.Red.Horse.One:
        case EnumChessman.Red.Horse.Two:
          this.suggestHorse("Red", this.currChessman);
          break;
        case EnumChessman.Red.Chariot.One:
        case EnumChessman.Red.Chariot.Two:
          this.suggestChariot("Red", this.currChessman);
          break;
        case EnumChessman.Red.Cannon.One:
        case EnumChessman.Red.Cannon.Two:
          this.suggestCannon("Red", this.currChessman);
          break;
        case EnumChessman.Red.Soldier.One:
        case EnumChessman.Red.Soldier.Two:
        case EnumChessman.Red.Soldier.Three:
        case EnumChessman.Red.Soldier.Four:
        case EnumChessman.Red.Soldier.Five:
          this.suggestSoldier("Red", this.currChessman);
          break;
        // Black
        case EnumChessman.Black.General:
          this.suggestGeneral("Black", this.currChessman);
          break;
        case EnumChessman.Black.Advisor.One:
        case EnumChessman.Black.Advisor.Two:
          this.suggestAdvisor("Black", this.currChessman);
          break;
        case EnumChessman.Black.Elephant.One:
        case EnumChessman.Black.Elephant.Two:
          this.suggestElephant("Black", this.currChessman);
          break;
        case EnumChessman.Black.Horse.One:
        case EnumChessman.Black.Horse.Two:
          this.suggestHorse("Black", this.currChessman);
          break;
        case EnumChessman.Black.Chariot.One:
        case EnumChessman.Black.Chariot.Two:
          this.suggestChariot("Black", this.currChessman);
          break;
        case EnumChessman.Black.Cannon.One:
        case EnumChessman.Black.Cannon.Two:
          this.suggestCannon("Black", this.currChessman);
          break;
        case EnumChessman.Black.Soldier.One:
        case EnumChessman.Black.Soldier.Two:
        case EnumChessman.Black.Soldier.Three:
        case EnumChessman.Black.Soldier.Four:
        case EnumChessman.Black.Soldier.Five:
          this.suggestSoldier("Black", this.currChessman);
          break;
        default:
          break;
      }
    },
    suggestGeneral(type, position) {
      // Is center point
      if (this.isCenterPoint(position.x, position.y)) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (!(i == 0 && j == 0)) {
              if (this.validPoint(position.x + i, position.y + j, type)) {
                this.suggestPositions.push({
                  x: position.x + i,
                  y: position.y + j,
                });
              }
            }
          }
        }
        return;
      }
      // Is conner point
      else if (this.isSidePoint(position.x, position.y)) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (
              Math.abs(i) != Math.abs(j) &&
              this.inCenterSquare(position.x + i, position.y + j, type)
            ) {
              if (this.validPoint(position.x + i, position.y + j, type)) {
                this.suggestPositions.push({
                  x: position.x + i,
                  y: position.y + j,
                });
              }
            }
          }
        }
      } else if (this.isConnerPoint(position.x, position.y)) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (this.inCenterSquare(position.x + i, position.y + j, type)) {
              if (this.validPoint(position.x + i, position.y + j, type)) {
                this.suggestPositions.push({
                  x: position.x + i,
                  y: position.y + j,
                });
              }
            }
          }
        }
      }
    },
    suggestAdvisor(type, position) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (Math.abs(i) == Math.abs(j)) {
            if (
              this.inCenterSquare(position.x + i, position.y + j, type) &&
              this.validPoint(position.x + i, position.y + j, type)
            ) {
              this.suggestPositions.push({
                x: position.x + i,
                y: position.y + j,
              });
            }
          }
        }
      }
    },
    suggestElephant(type, position) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (
            Math.abs(i) == Math.abs(j) &&
            this.validPoint(position.x + 2 * i, position.y + 2 * j, type)
          ) {
            this.suggestPositions.push({
              x: position.x + 2 * i,
              y: position.y + 2 * j,
            });
            this.suggestPositions = this.suggestPositions.filter((position) => {
              let middlePoint = {
                x: (position.x + position.x) / 2,
                y: (position.y + position.y) / 2,
              };
              if (this.determindChessman(middlePoint)) {
                return false;
              } else {
                return !this.isOverRiver(0, position.y, type);
              }
            });
          }
        }
      }
    },
    suggestChariot(type, position) {
      // X
      for (let i = position.x + 1; i <= 9; i++) {
        let chessman = this.determindChessman(i, position.y);
        if (!chessman) {
          this.suggestPositions.push({ x: i, y: position.y });
        } else {
          if (chessman.includes(type)) {
            break;
          } else {
            this.suggestPositions.push({ x: i, y: position.y });
            break;
          }
        }
      }
      for (let i = position.x - 1; i >= 1; i--) {
        let chessman = this.determindChessman(i, position.y);
        if (!chessman) {
          this.suggestPositions.push({ x: i, y: position.y });
        } else {
          if (chessman.includes(type)) {
            break;
          } else {
            this.suggestPositions.push({ x: i, y: position.y });
            break;
          }
        }
      }
      // Y
      for (let i = position.y + 1; i <= 10; i++) {
        let chessman = this.determindChessman(position.x, i);
        if (!chessman) {
          this.suggestPositions.push({ x: position.x, y: i });
        } else {
          if (chessman.includes(type)) {
            break;
          } else {
            this.suggestPositions.push({ x: position.x, y: i });
            break;
          }
        }
      }
      for (let i = position.y - 1; i >= 1; i--) {
        let chessman = this.determindChessman(position.x, i);
        if (!chessman) {
          this.suggestPositions.push({ x: position.x, y: i });
        } else {
          if (chessman.includes(type)) {
            break;
          } else {
            this.suggestPositions.push({ x: position.x, y: i });
            break;
          }
        }
      }
    },
    suggestHorse(type, position) {
      var horsePoint = [
        { x: 1, y: 2 },
        { x: 1, y: -2 },
        { x: -1, y: 2 },
        { x: -1, y: -2 },
        { x: 2, y: 1 },
        { x: 2, y: -1 },
        { x: -2, y: 1 },
        { x: -2, y: -1 },
      ];
      horsePoint.forEach((point) => {
        if (this.validPoint(position.x + point.x, position.y + point.y, type)) {
          let middlePoint;
          if (Math.abs(point.x) == 2) {
            middlePoint = {
              x: position.x + point.x / 2,
              y: position.y,
            };
          } else {
            middlePoint = {
              x: position.x,
              y: position.y + point.y / 2,
            };
          }
          if (!this.determindChessman(middlePoint.x, middlePoint.y)) {
            this.suggestPositions.push({
              x: position.x + point.x,
              y: position.y + point.y,
            });
          }
        }
      });
    },
    suggestCannon(type, position) {
      // X
      let stop = false;
      for (let i = position.x + 1; i <= 9; i++) {
        let chessman = this.determindChessman(i, position.y);
        if (!chessman) {
          if (!stop) this.suggestPositions.push({ x: i, y: position.y });
        } else {
          if (stop) {
            if (chessman.includes(type)) break;
            else {
              this.suggestPositions.push({ x: i, y: position.y });
              break;
            }
          }
          stop = true;
        }
      }
      stop = false;
      for (let i = position.x - 1; i >= 1; i--) {
        let chessman = this.determindChessman(i, position.y);
        if (!chessman) {
          if (!stop) this.suggestPositions.push({ x: i, y: position.y });
        } else {
          if (stop) {
            if (chessman.includes(type)) break;
            else {
              this.suggestPositions.push({ x: i, y: position.y });
              break;
            }
          }
          stop = true;
        }
      }
      // Y
      stop = false;
      for (let i = position.y + 1; i <= 10; i++) {
        let chessman = this.determindChessman(position.x, i);
        if (!chessman) {
          if (!stop) this.suggestPositions.push({ x: position.x, y: i });
        } else {
          if (stop) {
            if (chessman.includes(type)) break;
            else {
              this.suggestPositions.push({ x: position.x, y: i });
              break;
            }
          }
          stop = true;
        }
      }
      stop = false;
      for (let i = position.y - 1; i >= 1; i--) {
        let chessman = this.determindChessman(position.x, i);
        if (!chessman) {
          if (!stop) this.suggestPositions.push({ x: position.x, y: i });
        } else {
          if (stop) {
            if (chessman.includes(type)) break;
            else {
              this.suggestPositions.push({ x: position.x, y: i });
              break;
            }
          }
          stop = true;
        }
      }
    },
    suggestSoldier(type, position) {
      let newY = type == "Red" ? position.y + 1 : position.y - 1;
      if (this.validPoint(this.currChessman.x, newY, type)) {
        this.suggestPositions.push({ x: this.currChessman.x, y: newY });
      }
      if (this.isOverRiver(0, position.y, type)) {
        if (this.validPoint(this.currChessman.x + 1, position.y, type)) {
          this.suggestPositions.push({
            x: this.currChessman.x + 1,
            y: position.y,
          });
        }
        if (this.validPoint(this.currChessman.x - 1, position.y, type)) {
          this.suggestPositions.push({
            x: this.currChessman.x - 1,
            y: position.y,
          });
        }
      }
    },
    validPoint(x, y, type) {
      let chessman = this.determindChessman(x, y);
      if (!chessman || (chessman && !chessman.includes(type))) {
        return this.inChessboard(x, y);
      }
      return false;
    },
    /**
     * La tam
     * createdby ntdung 10.05.2022
     */
    isCenterPoint(x, y) {
      return (y == 2 || y == 9) && x == 5;
    },
    /**
     * La diem goc
     * createdby ntdung 10.05.2022
     */
    isConnerPoint(x, y) {
      var connerPoint = [
        { x: 4, y: 1 },
        { x: 6, y: 1 },
        { x: 4, y: 3 },
        { x: 6, y: 3 },
        { x: 4, y: 10 },
        { x: 6, y: 10 },
        { x: 4, y: 8 },
        { x: 6, y: 8 },
      ];
      return (
        connerPoint.findIndex((point) => point.x == x && point.y == y) != -1
      );
    },
    /**
     * La diem canh
     * createdby ntdung 10.05.2022
     */
    isSidePoint(x, y) {
      var sidePoint = [
        { x: 5, y: 1 },
        { x: 4, y: 2 },
        { x: 6, y: 2 },
        { x: 5, y: 3 },
        { x: 5, y: 10 },
        { x: 4, y: 9 },
        { x: 6, y: 9 },
        { x: 5, y: 8 },
      ];
      return sidePoint.findIndex((point) => point.x == x && point.y == y) != -1;
    },
    /**
     * O trong ban co
     * createdby ntdung 10.05.2022
     */
    inChessboard(x, y) {
      return x >= 1 && x <= 9 && y >= 1 && y <= 10;
    },
    /**
     * Nam trong o vuong
     * createdby ntdung 10.05.2022
     */
    inCenterSquare(x, y, type) {
      if (type == "Red") {
        for (let i = 4; i <= 6; i++) {
          for (let j = 1; j <= 3; j++) {
            if (i == x && j == y) {
              return true;
            }
          }
        }
        return false;
      } else {
        for (let i = 4; i <= 6; i++) {
          for (let j = 8; j <= 10; j++) {
            if (i == x && j == y) {
              return true;
            }
          }
        }
        return false;
      }
    },
    /**
     * Kiem tra da qua song chua
     * createdby ntdung 10.05.2022
     */
    isOverRiver(x, y, type) {
      if (type == "Red") {
        return y > 5;
      } else {
        return y <= 5;
      }
    },
    /**
     * Kiem tra chieu tuong
     * createdby ntdung 10.05.2022
     */
    checkGeneral(turn) {
      var general = this.positions.find(
        (position) =>
          position.name.includes(turn) && position.name.includes("General")
      );
      if (general && general.x == -1) {
        setTimeout(() => {
          alert(`${turn == "Red" ? "Black" : "Red"} wins !!!`);
          setTimeout(() => {
            this.reset();
          }, 500);
        }, 500);
      }
    },
    determindChessman(x, y) {
      var chessman = this.positions.find(
        (position) => position.x == x && position.y == y
      );
      return chessman && chessman.name;
    },
    reset() {
      this.turn = "red";
      this.positions = [...InitPosition];
    },
  },
  watch: {
    currChessman: {
      handler(val) {
        this.handleSuggestPositions();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.board {
  padding-top: calc(100% * 9 / 8);
  height: 0;
  .board__diagonal-tr {
    background: linear-gradient(
      to top right,
      rgb(255, 221, 165) calc(50% - 2px),
      black,
      rgb(255, 221, 165) calc(50% + 1px)
    );
  }
  .board__diagonal-br {
    background: linear-gradient(
      to bottom right,
      rgb(255, 221, 165) calc(50% - 2px),
      black,
      rgb(255, 221, 165) calc(50% + 1px)
    );
  }
  .board__diagonal-tl {
    background: linear-gradient(
      to top left,
      rgb(255, 221, 165) calc(50% - 2px),
      black,
      rgb(255, 221, 165) calc(50% + 1px)
    );
  }
  .board__diagonal-bl {
    background: linear-gradient(
      to bottom left,
      rgb(255, 221, 165) calc(50% - 2px),
      black,
      rgb(255, 221, 165) calc(50% + 1px)
    );
  }
  .board__main {
    border: calc(min(6vh, 6vw)) solid rgb(255, 221, 165);
    background-color: pink;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    table-layout: auto;
  }
  .board__row {
    flex-basis: calc(1 / 9 * 100%);
    .board__col {
      border: 1px solid #000;
      flex-basis: calc(1 / 8 * 100%);
      background-color: rgb(255, 221, 165);
      flex: 1;
      border-spacing: 0px;
      border-collapse: collapse;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
    }
    &.board__river {
      border: 1px solid #000;
      position: relative;
      .board__col {
        border: 0;
      }
      &::after {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        content: "Riverrrrrr";
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: calc(min(5vh, 5vw));
      }
    }
  }
}
</style>
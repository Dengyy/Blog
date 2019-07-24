<template>
  <div class="container">
    <div class='wrap'>
      <div v-for="(obj, index) in sortArr" :key="index">
        <div :class="getClass(obj)">{{obj.value}}</div>
        <div class="index">↑</div>
        <div class="board" v-if="obj.isBoard"></div>
      </div>
    </div>
    <div>
      <button @click="startSort">start</button>
      <button @click="reset">reset</button>
      <button @click="togglePause">{{isPause ? 'continue' : 'pause'}}</button>
    </div>
    <div>
      <input v-model="arrayStr" type="text" @input="arrayInput">
    </div>
    <div class="range-wrap">
      space<input v-model="interval" type="range" step="100" max="2000">
    </div>
  </div>
</template>

<script>
import { quikSort1 } from '../utils/sortAlgorithm'
import mixin from '../utils/mixin'
export default {
  name: 'QuikSortAnimation',
  mixins: [mixin],
  methods: {
    getClass (obj) {
      return {
        bar: true,
        low: obj.isLow,
        high: obj.isHigh,
        current: obj.isCurrent,
        swap: obj.isSwap
      }
    },
    async startSort () {
      this._quik_sort()
      await this._startAnim()
    },
    _quik_sort () {
      const sortArr = quikSort1([...this.array], this._pushAnimationQueue)

      // 增加结尾帧
      this.animationQueue.push(sortArr.map(val => ({
        value: val
      })))
    },
    _pushAnimationQueue (arr, lowIndex, highIndex, boardIndex, currentIndex, swapIndexArr = []) {
      // 防止交换统一元素造成困惑
      if (swapIndexArr[0] === swapIndexArr[1]) {
        swapIndexArr = []
      }
      this.animationQueue.push(arr.map((val, idx) => ({
        value: val,
        isLow: idx === lowIndex,
        isHigh: idx === highIndex,
        isBoard: idx === boardIndex,
        isCurrent: idx === currentIndex,
        isSwap: swapIndexArr.indexOf(idx) >= 0
      })))
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;

  & > div {
    margin-bottom: 10px;
  }
}
.wrap {
  display: flex;
  align-items: flex-end;

  & > div {
    position: relative;

     .board {
      position: absolute;
      right: 0;
      top: 0;
      height: 30px;
      width: 1px;
      background: #000;
    }
  }

  .bar {
    width: 20px;
    margin: 5px;
    border: 1px solid;

    & + .index {
      opacity: 0;

       &:after {
        display: block;
        content: '.';
        opacity: 0;
      }
    }
  }
}
.bar {
  &.low + .index {
    opacity: 1;

    &:after {
      content: 'low';
      opacity: 1;
    }
  }

  &.high + .index {
    opacity: 1;

    &:after {
      content: 'high';
      opacity: 1;
    }
  }

  &.current {
    opacity: 1;
    color: red;
  }

  &.swap {
    opacity: 1;
    color: #fff;
    background: red;
  }
}
.range-wrap {
  display: flex;
  align-items: center;
}
.notice {
  text-align: left;
}
</style>

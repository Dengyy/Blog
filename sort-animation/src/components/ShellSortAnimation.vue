<template>
  <div class="container">
    <div class='wrap'>
      <div v-for="(obj, index) in sortArr" :class="{bar: true, insert: obj.isInsert, compare: obj.isCompare, gray: obj.isGray}" :key="index" :style="{height: perHeight * obj.value + 'px'}">{{obj.value}}</div>
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
    <div class="notice">
      Notice:
      <p class="bar insert">This is the element waiting to insert</p>
      <p class="bar compare">This is the element comparing with the inserted element</p>
    </div>
  </div>
</template>

<script>
import { shellSort } from '../utils/sortAlgorithm'
import mixin from '../utils/mixin'

export default {
  name: 'CommonSortAnimation',
  mixins: [mixin],
  data () {
    return {
      perHeight: 15
    }
  },
  methods: {
    async startSort () {
      this._shell_sort()
      await this._startAnim()
    },
    _shell_sort () {
      const sortArr = shellSort([...this.array], this._pushAnimationQueue)

      // 增加结尾帧
      this.animationQueue.push(sortArr.map(val => ({
        value: val
      })))
    },
    _pushAnimationQueue (arr, insertIndex, compareIndex, gap) {
      // 防止不需要移动的情况，样式的覆盖
      if (insertIndex === compareIndex) {
        return
      }

      this.animationQueue.push(arr.map((val, idx) => ({
        value: val,
        isInsert: idx === insertIndex,
        isCompare: idx === compareIndex,
        isGray: idx % gap !== insertIndex % gap
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

  .bar {
    width: 10px;
  }
}
.bar {
  background: #CCCCFF;
  border: 1px solid #6666CC;

  &.gray {
    opacity: .5;
  }

  &.insert {
    background: #FFCCCC;
    border: 1px solid #FF9999;
  }

  &.compare {
    background: #99CC99;
    border: 1px solid #999933;
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

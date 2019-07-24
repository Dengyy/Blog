<template>
  <div class="container">
    <div class='wrap'>
      <div v-for="(obj, index) in sortArr.originArr" :key="'origin-' + index" :class="getClass(obj)">
        {{obj.value}}
      </div>
    </div>
    <div class='wrap'>
      <div v-for="(obj, index) in sortArr.countArr" :key="'count' + index" :class="getClass(obj)">
        {{obj.value}}
      </div>
    </div>
    <div class='wrap'>
      <div v-for="(obj, index) in sortArr.sortedArr" :key="'sort' + index" :class="getClass(obj)">
        {{obj.value}}
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
import { countingSort } from '../utils/sortAlgorithm'
import mixin from '../utils/mixin'
export default {
  name: 'CountingSortAnimation',
  mixins: [mixin],
  data () {
    return {
      array: [3, 1, 5, 1, 9, 4, 7]
    }
  },
  methods: {
    getClass (obj) {
      return {
        bar: true,
        count: obj.isCount,
        sum: obj.isSum,
        place: obj.isPlace
      }
    },
    async startSort () {
      this._counting_sort()
      await this._startAnim()
    },
    _counting_sort () {
      const sortArr = countingSort([...this.array], this._pushAnimationQueue)

      const queueLen = this.animationQueue.length
      const lastQueue = this.animationQueue[queueLen - 1]

      // 增加结尾帧
      this.animationQueue.push({
        originArr: lastQueue.originArr.map(val => ({
          value: val.value
        })),
        countArr: lastQueue.countArr.map(val => ({
          value: val.value
        })),
        sortedArr: sortArr.map((val, idx) => ({
          value: val
        }))
      })
    },
    _pushAnimationQueue (obj) {
      this.animationQueue.push(obj)
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

  & > div {
    position: relative;
  }

  .bar {
    width: 20px;
    min-height: 20px;
    margin: 5px;
    border: 1px solid;
  }
}
.bar {
  &.count {
    background-color: #6666CC;
    border-color: #6666CC;
  }

  &.sum {
    background-color: #FF9999;
    border-color: #FF9999;
  }

  &.place {
    background-color: #999933;
    border-color: #999933;
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

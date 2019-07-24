<template>
  <div class="container">
    <p>{{sortArr.bit && ('第' + sortArr.bit + '位')}}</p>
    <div class='wrap'>
      <div v-for="(obj, index) in sortArr.sortedArr" :key="'sort-' + index" :class="getClass(obj)">
        {{obj.value}}
      </div>
    </div>
    <div class='wrap'>
      <div v-for="(obj, index) in sortArr.bucketArr" :key="'bucket-' + index">
        <div :class="getClass(obj)">{{obj.value}}</div>
        <span>{{index}}</span>
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
import { radixSort } from '../utils/sortAlgorithm'
import mixin from '../utils/mixin'
export default {
  name: 'CountingSortAnimation',
  mixins: [mixin],
  data () {
    return {
      array: [23, 11, 15, 41, 59, 34]
    }
  },
  methods: {
    getClass (obj) {
      return {
        bar: true,
        bucket: obj.isBucket,
        merge: obj.isMerge
      }
    },
    async startSort () {
      this._radix_sort()
      await this._startAnim()
    },
    _radix_sort () {
      radixSort([...this.array], this._pushAnimationQueue)
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

  & > p {
    min-height: 18px;
  }
}
.wrap {
  display: flex;

  & > div {
    position: relative;
  }

  .bar {
    min-width: 20px;
    min-height: 20px;
    margin: 5px;
    border: 1px solid;
  }
}
.bar {
  &.bucket {
    background-color: #FF9999;
    border-color: #FF9999;
  }

  &.merge {
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

export default {
  data () {
    return {
      array: [3, 1, 5, 2, 9, 4, 7],
      arrayStr: '',
      sortArr: [],
      interval: 1000,
      animationQueue: [],
      isPause: false
    }
  },
  mounted () {
    this.reset()
    this.arrayStr = this.array.join(',')
  },
  methods: {
    reset () {
      this.sortArr = this.array.map(val => ({
        value: val
      }))
      clearTimeout(this.timer)
      this.animationQueue = []
    },
    arrayInput () {
      this.array = this.arrayStr.split(',').map(val => +val)
      this.reset()
    },
    async togglePause () {
      this.isPause = !this.isPause
      if (this.isPause) {
        clearTimeout(this.timer)
      } else {
        await this._startAnim()
      }
    },
    async _startAnim () {
      while (!this.isPause && this.animationQueue.length) {
        await this._stepAnim()
      }
    },
    _stepAnim () {
      return new Promise((resolve, reject) => {
        this.timer = setTimeout(() => {
          this.sortArr = this.animationQueue.shift()
          resolve()
        }, this.interval)
      })
    }
  }
}

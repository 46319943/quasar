import Vue from 'vue'

function width (val) {
  return { transform: `scale3d(${val},1,1)` }
}

export default Vue.extend({
  name: 'QLinearProgress',

  props: {
    value: {
      type: Number,
      default: 0
    },
    buffer: Number,

    color: String,
    trackColor: String,
    dark: Boolean,

    reverse: Boolean,
    stripe: Boolean,
    indeterminate: Boolean,
    query: Boolean,
    rounded: Boolean
  },

  computed: {
    motion () {
      return this.indeterminate || this.query
    },

    classes () {
      return {
        [`text-${this.color}`]: this.color,
        'q-linear-progress--dark': this.dark,
        'q-linear-progress--reverse': this.reverse || this.query,
        'generic-border-radius': this.rounded
      }
    },

    trackStyle () {
      return width(this.buffer !== void 0 ? this.buffer : 1)
    },

    trackClass () {
      if (this.trackColor) {
        return `bg-${this.trackColor}`
      }
    },

    modelStyle () {
      return width(this.motion ? 1 : this.value)
    },

    modelClasses () {
      return `q-linear-progress__model--${this.motion ? 'in' : ''}determinate`
    },

    stripeStyle () {
      return { width: (this.value * 100) + '%' }
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'q-linear-progress',
      'class': this.classes
    }, [
      h('div', {
        staticClass: 'q-linear-progress__track absolute-full',
        style: this.trackStyle,
        'class': this.trackClass
      }),

      h('div', {
        staticClass: 'q-linear-progress__model absolute-full',
        style: this.modelStyle,
        'class': this.modelClasses
      }),

      this.stripe && !this.motion ? h('div', {
        staticClass: 'q-linear-progress__stripe absolute-full',
        style: this.stripeStyle
      }) : null
    ])
  }
})

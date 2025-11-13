module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5, // 设计稿宽度为375px时，1rem = 37.5px
      propList: ['*'], // 匹配所有属性
      selectorBlackList: [], // 忽略的选择器，例如['.ignore']
      replace: true, // 替换px为rem
      mediaQuery: false, // 不在媒体查询中转换px
      minPixelValue: 1 // 最小的转换值
    }
  }
}
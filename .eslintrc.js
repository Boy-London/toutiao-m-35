module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  //  配置elint 关闭规则！
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 手动关闭的eslint检查规则!
    'vue/multi-word-component-names': 'off',
    camelcase: 'off',
    'space-before-function-paren': 'off',
    'no-useless-catch': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off'
  }
}

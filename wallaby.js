module.exports = wallaby => {
  return {
    files: ['tsconfig.json', 'src/**/*.ts', '!src/**/*.test.ts'],
    tests: ['src/**/*.test.ts'],
    env: {
      type: 'node',
      runner: 'node'
    },
    testFramework: 'jest',
    compilers: {
      '**/*.ts': wallaby.compilers.typeScript({
        module: 'commonjs'
      })
    }
  }
}

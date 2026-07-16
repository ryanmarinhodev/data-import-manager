import '@japa/runner'

declare module '@japa/runner' {
  interface TestContext {
    // Extend context for custom test helpers.
  }

  interface Test<TestData> {
    // Extend test metadata.
  }
}

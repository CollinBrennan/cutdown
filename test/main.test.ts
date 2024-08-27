import { hello } from "../src/main"
import { expect, test } from "vitest"

test("hello returns string", () => {
  expect(hello()).toBe("Hello!")
})

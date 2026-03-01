import { test, expect } from "@playwright/test";

test("homepage should load", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("A place to practice your automation skills!");
});

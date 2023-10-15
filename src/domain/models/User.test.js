import { describe, expect, it } from "vitest";
import { User } from "./User";

describe("User class", () => {
  it("should create a user instance with valid parameters", () => {
    const user = User.create(
      "user_id",
      "username",
      "John",
      "Doe",
      "123 Main St",
      "Male",
      "john@example.com",
      "password123"
    );

    expect(user).toBeInstanceOf(User);
    expect(user.getId()).toEqual("user_id");
    expect(user.hasName("John")).toBe(true);
    expect(user.hasName("Jane")).toBe(false);
    expect(user.hasEmail("john@example.com")).toBe(true);
    expect(user.hasEmail("jane@example.com")).toBe(false);
    expect(user.hasPassword("password123")).toBe(true);
    expect(user.hasPassword("wrongpassword")).toBe(false);
  });

  it("should throw an error if email is invalid", () => {
    expect(() =>
      User.create(
        "user_id",
        "username",
        "John",
        "Doe",
        "123 Main St",
        "Male",
        "",
        "password123"
      )
    ).toThrow("Invalid email");
  });
});

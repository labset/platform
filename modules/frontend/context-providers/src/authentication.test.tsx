/**
 * @jest-environment jsdom
 */
import { renderHook } from "@testing-library/react";

import { useAuthentication } from "./authentication";

describe("authentication", () => {
  describe("useAuthentication", () => {
    it("should render default context when used without a provider", () => {
      const { result } = renderHook(() => useAuthentication());
      expect(result.current).toBeDefined();
      expect(result.current.status).toEqual("loading");
      expect(result.current.token).toBeNull();
    });
  });
});

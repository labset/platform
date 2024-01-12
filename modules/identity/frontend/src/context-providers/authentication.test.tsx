/**
 * @jest-environment jsdom
 */
import { act, renderHook } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import React, { PropsWithChildren } from "react";

import { AuthenticationProvider, useAuthentication } from "./authentication";

describe("authentication", () => {
  describe("useAuthentication - without a provider", () => {
    it("should render default context", () => {
      const { result } = renderHook(() => useAuthentication());
      expect(result.current).toBeDefined();
      expect(result.current.status).toEqual("loading");
      expect(result.current.token).toBeNull();
    });
  });

  describe("useAuthentication - with a provider", () => {
    beforeAll(() => {
      fetchMock.enableMocks();
    });
    afterAll(() => {
      fetchMock.disableMocks();
    });
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    const product = {
      key: "my-product",
      gatewayUrl: "https://my-gateway",
    };

    const renderAuthProvider = () => {
      const wrapper = ({ children }: PropsWithChildren) => {
        return (
          <AuthenticationProvider product={product}>
            {children}
          </AuthenticationProvider>
        );
      };

      return renderHook(() => useAuthentication(), { wrapper });
    };

    it("should set status to not-authenticated when token header is not set", async () => {
      const { result } = renderAuthProvider();
      expect(result.current).toBeDefined();
      expect(result.current.status).toEqual("loading");
      expect(result.current.token).toBeNull();

      // when no token header is set, status = not-authenticated
      await act(async () => {
        result.current.actions.signIn("my-claim");
      });
      expect(result.current.status).toEqual("not-authenticated");
    });

    it("should set status to authenticated when token header is set", async () => {
      fetchMock.once(`${product.gatewayUrl}/auth/claim/token`, {
        headers: {
          [`x-labset-${product.key}-auth-token`]: "my-token",
        },
      });
      const { result } = renderAuthProvider();
      expect(result.current).toBeDefined();
      expect(result.current.status).toEqual("loading");
      expect(result.current.token).toBeNull();

      await act(async () => {
        result.current.actions.signIn("my-claim");
      });
      expect(result.current.token).toEqual("my-token");
      expect(result.current.status).toEqual("authenticated");
    });
  });
});

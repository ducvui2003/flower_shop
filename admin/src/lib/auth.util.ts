import { tokenService } from "@/lib/token.service";

export const authUtil = {
  isAuthenticated: (): boolean => {
    return tokenService.hasToken();
  },

  requireAuth: () => {
    if (!authUtil.isAuthenticated()) {
      window.location.href = "/login";
      throw new Response("Unauthorized", { status: 401 });
    }
  },

  logout: () => {
    tokenService.removeTokens();
    window.location.href = "/login";
  },
};

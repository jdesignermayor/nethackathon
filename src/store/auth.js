import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  session: null,
  setAuth: ({ session, user }) => set(() => ({ session, user })),
  signOut: async () => {
    set({ user: null, session: null });
  },
}));

export { useAuthStore };

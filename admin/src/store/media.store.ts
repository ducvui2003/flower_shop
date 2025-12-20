import { create } from "zustand";

type State = {
  reload: boolean;
};

type Action = {
  updateReload: () => void;
};

const useMediaStore = create<State & Action>((set) => ({
  reload: false,
  updateReload: () => set((state) => ({ reload: !state.reload })),
}));

export default useMediaStore;

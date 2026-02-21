import { create } from "zustand";

type UiState = {
  contactOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
  toggleContact: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  contactOpen: false,
  openContact: () => set({ contactOpen: true }),
  closeContact: () => set({ contactOpen: false }),
  toggleContact: () => set((s) => ({ contactOpen: !s.contactOpen })),
}));

import { atom } from "recoil";

export interface ModalStateAtomType {
  title: string;
  modalContents: JSX.Element | undefined;
}

export const ModalStateAtom = atom<ModalStateAtomType>({
  key: "modalState",
  default: {
    title: "",
    modalContents: undefined,
  },
});

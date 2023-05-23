export interface DropdownProps {
  dropDownType: "button" | "chance";
  labelText: string;
  icon?: string;
  onClick?: () => void;
  setDropdownState?: React.Dispatch<React.SetStateAction<boolean | "focus">>;
}

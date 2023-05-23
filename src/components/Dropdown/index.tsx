import styled from "styled-components";
import { MenuImgs } from "../../assets/images";
import { useRecoilState } from "recoil";
import { DropdownProps } from "../../types/dropdown";
import { SettingsStateAtom, SettingsStateAtomType } from "../../atoms/settingsState";

const Dropdown = ({
  dropDownType,
  labelText,
  icon,
  onClick,
  setDropdownState,
}: DropdownProps) => {
  const [settingsState, setSettingsState] =
    useRecoilState<SettingsStateAtomType>(SettingsStateAtom);

  return (
    <>
      {dropDownType === "button" && (
        <Button
          aria-disabled={onClick ? false : true}
          type="button"
          onClick={onClick}
        >
          {icon && <img src={icon} alt="" />}
          {labelText}
        </Button>
      )}
      {dropDownType === "chance" && (
        <Input>
          <label htmlFor="chance">
            {icon && <img src={icon} alt="" />}
            {labelText}
          </label>
          <input
            id="chance"
            type="number"
            min={0}
            max={100}
            value={settingsState.chance}
            onFocus={() => setDropdownState!("focus")}
            onBlur={() => setDropdownState!(true)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              !isNaN(e.currentTarget.valueAsNumber)
                ? setSettingsState((prevState) => {
                    return {
                      ...prevState,
                      chance:
                        e.currentTarget.valueAsNumber > 100
                          ? 100
                          : e.currentTarget.valueAsNumber,
                    };
                  })
                : setSettingsState((prevState) => {
                    return {
                      ...prevState,
                      chance: "",
                    };
                  })
            }
          />
        </Input>
      )}
    </>
  );
};

export default Dropdown;

const Button = styled.button`
  background-color: transparent;
  background-image: url(${MenuImgs.ButtonImg});

  padding: 8px;
  padding-left: 16px;

  @media screen and (max-width: 900px) {
    width: 30vw;
    max-width: 200px;
    min-height: 48px;
  }

  @media screen and (min-width: 900px) {
    width: 200px;
    height: 48px;
  }

  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.text};

  cursor: pointer;
  border: none;
  border-radius: 10px;
  transition: color 0.25s ease;

  :hover {
    color: ${({ theme }) => theme.colors.white};

    img {
      filter: invert(1);
    }
  }

  img {
    margin-right: 8px;

    filter: invert(0);

    transition: filter 0.25s ease;
  }
`;

const Input = styled.fieldset`
  background-color: transparent;
  background-image: url(${MenuImgs.ButtonImg});

  padding: 8px;
  padding-left: 16px;

  height: 48px;

  display: flex;

  @media screen and (max-width: 900px) {
    flex-direction: column;

    width: 100px;
    height: 100%;

    input {
      padding-left: 16px;
    }
  }

  @media screen and (min-width: 900px) {
    width: 200px;
    height: 48px;

    label {
      white-space: nowrap;
    }

    input {
      margin-left: 8px;
    }
  }

  filter: brightness(90%);
  border: none;
  border-radius: 10px;

  label {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }

  input {
    background-color: transparent;

    width: 100%;

    font-size: ${({ theme }) => theme.fontSizes.text};

    border: none;
    border-bottom: 1px solid black;
  }
  input[type="number"] {
    appearance: textfield;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    appearance: none;
  }
`;

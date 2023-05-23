import styled from "styled-components";
import { TabListType } from "../../../types/tab/list";

interface TabProps {
  tabList: TabListType[];
  displayState: string;
  setDisplayState: React.Dispatch<React.SetStateAction<string>>;
}

const ModalTab = ({ tabList, displayState, setDisplayState }: TabProps) => {
  return (
    <Wrapper>
      {tabList.map((v) => (
        <button
          key={`tab${v.id}`}
          type="button"
          className={displayState === v.id ? "active" : undefined}
          onClick={() => setDisplayState(v.id)}
        >
          {v.value}
        </button>
      ))}
    </Wrapper>
  );
};

export default ModalTab;

const Wrapper = styled.div`
  margin-bottom: 8px;

  width: 100%;
  height: 48px;

  display: flex;

  .active {
    color: ${({ theme }) => theme.colors.white};
    border-bottom: 3px solid ${({ theme }) => theme.colors.subMain};
  }

  button {
    background-color: transparent;

    width: 100%;

    color: ${({ theme }) => theme.colors.grey};
    font-size: ${({ theme }) => theme.fontSizes.text};

    cursor: pointer;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.white};
    transition: color 0.25s ease, filter 0.25s ease, border-bottom 0.25s ease;

    :hover {
      filter: drop-shadow(0 0 8px ${({ theme }) => theme.colors.darkGrey});
    }
  }
`;

import styled from "styled-components";

interface ButtonProps {
  labelText: string;
}

const Button = ({ labelText }: ButtonProps) => {
  return <Wrapper type="button">{labelText}</Wrapper>;
};

export default Button;

const Wrapper = styled.button`
  background-color: transparent;

  padding: 8px;

  width: 200px;
  height: 100%;

  color: #edfead;
  font-size: 24px;

  cursor: pointer;
  filter: drop-shadow(0 0 8px #aaa);
  border: 2px solid #ffffc9;
  border-radius: 10px;
  transition: background-color 0.25s ease, color 0.25s ease, filter 0.25s ease;

  :hover {
    background-color: white;

    color: black;

    filter: drop-shadow(0 0 8px white);
  }
`;

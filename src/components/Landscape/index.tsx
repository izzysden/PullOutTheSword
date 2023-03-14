import styled from "styled-components";
import { CloudImg, GrassImg } from "../../assets/images";

const Landscape = () => {
  return (
    <Wrapper>
      <Grass />
      <Cloud />
    </Wrapper>
  );
};

export default Landscape;

const Grass = styled.aside`
  position: absolute;

  background-image: url(${GrassImg});
  background-position: 0 70vh;
  background-size: 30vw 30vh;
  background-repeat: repeat-x;

  min-width: 100vw;
  min-height: 100vh;

  z-index: 1;
`;

const Cloud = styled.aside`
  position: absolute;

  background-image: url(${CloudImg});
  background-position: 0 0vh;
  background-size: contain;
  background-repeat: no-repeat;

  min-width: 100vw;
  min-height: 100vh;
`;

const Wrapper = styled.main`
  background-color: #edfead;

  min-width: 100vw;
  min-height: 100vh;

  pointer-events: none;
`;

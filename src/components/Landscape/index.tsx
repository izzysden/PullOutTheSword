import styled from "styled-components";
import { BackgroundImgs } from "../../assets/images";

const Landscape = () => {
  return (
    <Wrapper aria-hidden="true">
      <Grass aria-hidden="true" />
      <Cloud aria-hidden="true" />
    </Wrapper>
  );
};

export default Landscape;

const Grass = styled.div`
  position: absolute;

  background-image: url(${BackgroundImgs.GrassImg});
  background-position: 0 70vh;
  background-size: 30vw 30vh;
  background-repeat: repeat-x;

  min-width: 100vw;
  min-height: 100vh;

  z-index: 1;
`;

const Cloud = styled.div`
  position: absolute;

  background-image: url(${BackgroundImgs.CloudImg});
  background-position: 0 0vh;
  background-size: contain;
  background-repeat: no-repeat;

  min-width: 100vw;
  min-height: 100vh;
`;

const Wrapper = styled.aside`
  background-color: ${({ theme }) => theme.colors.subMain};

  min-width: 100vw;
  min-height: 100vh;

  pointer-events: none;
`;

import styled from "styled-components";

export const PageContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border: 1px solid #dfe0eb;
  border-radius: 8px;
  padding: 32px;
`;

export const DetalheLista = styled.ul`
  display: flex;
  flex-direction: column;

  li:first-child {
    grid-template-columns: ${(props) => props.layout};
    display: grid;
  }

  h3 {
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.2px;
    color: #9fa2b4;
  }
`;

import styled from 'styled-components';

const Column = styled.section`
  height: 80vh;
  min-height: 300px;
  display: grid;
  grid-template-rows: 46px calc(100% - 46px);
`;

export default Column;

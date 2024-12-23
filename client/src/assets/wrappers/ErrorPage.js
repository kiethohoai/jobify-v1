import styled from "styled-components";

export const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  img {
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  }

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--grey-500);
  }

  a {
    color: var(--primary-500);
    text-transform: capitalize;
  }

  a:hover {
    border-bottom: 1px solid var(--primary-500);
  }
`;

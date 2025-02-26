import styled from "styled-components";

interface WrapperProps {
  istextfirst: boolean;
  order: string;
}

export const Wrapper = styled.div<WrapperProps>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.istextfirst ? "40% 60%" : "60% 40%"};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-rows: 60rem 50rem;

    div:first-child {
      order: ${(props) => props.order};
    }
  }

  @media (max-width: 768px) {
    grid-template-rows: 50rem auto;
  }

  @media (max-width: 425px) {
    grid-template-rows: 25rem auto;
  }

  @media (max-width: 320px) {
    grid-template-rows: 20rem auto;
  }
`;

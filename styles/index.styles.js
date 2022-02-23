import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  transition: padding 0.5s;

  @media screen and (max-width: 480px) {
    padding: 0 1rem;
  }
`;

export const Title = styled.h1`
  margin: 2rem 0;
  font-size: 4rem;
  transition: font-size 0.5s;

  @media screen and (max-width: 768px) {
    font-size: 3rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

export const Input = styled.input`
  font-size: 1.5rem;
  padding: 0.75rem;
  width: 500px;
  border: 1px solid grey;
  outline: none;
  transition: font-size 0.5s, padding 0.5s;

  &:focus {
    border: 2px solid black;
  }

  @media screen and (max-width: 768px) {
    width: 70%;
    font-size: 1.25rem;
    padding: 0.75rem;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    font-size: 1rem;
    padding: 0.6rem;
  }
`;

export const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2rem;
  margin: 2rem 0;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const ImageContainer = styled.div`
  transition: transform 0.5s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Image = styled.img`
  max-width: 100%;
  aspect-ratio: 1.5 / 1;
  object-fit: contain;
  object-position: center center;
  transition: object-fit 0.5s;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.075);
`;

export const Error = styled.p`
  font-size: 1.5rem;
  font-style: italic;
`;

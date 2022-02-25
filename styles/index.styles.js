import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

export const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: linear-gradient(42deg, #ffffff, #dbaf72, #846ca5);
  background-size: 600% 600%;
  animation: AnimationName 16s ease infinite;

  @keyframes AnimationName {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }
`;

export const Container = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  transition: padding 0.5s;

  @media screen and (max-width: 480px) {
    padding: 0 1rem;
  }
`;

export const Title = styled.h1`
  padding: 2rem 0;
  margin: 0;
  font-size: 4rem;
  transition: font-size 0.5s;
  color: white;
  font-weight: 700;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

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
  outline: none;
  transition: font-size 0.5s, padding 0.5s;
  border: none;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.05);

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

export const ImagesContainerInf = styled(InfiniteScroll)`
  border-top: 1px solid white;
  padding-top: 2em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2rem;
  margin: 2rem 0;
  overflow: visible !important;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const ImageContainer = styled.div`
  transition: transform 0.5s;
  background-color: white;
  cursor: pointer;
  height: 100%;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ImageLink = styled.a`
  text-decoration: none;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.05);
  aspect-ratio: 1.5 / 1;
`;

export const Image = styled.img`
  max-width: 100%;
  width: 100%;
  height: 100%;
  aspect-ratio: 1.5 / 1;
  object-fit: contain;
  object-position: center center;
  transition: object-fit 0.5s;
`;

export const Error = styled.p`
  font-size: 1.5rem;
  font-style: italic;
`;

export const LargeContainer = styled.div`
  grid-column: 1/-1;
`;

export const EndMessage = styled.p`
  text-align: center;
  font-style: italic;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const LoadingImage = styled.div`
  aspect-ratio: 1.5 / 1;
  background: linear-gradient(91deg, #c3c3c3, #5f5f5f);
  background-size: 400% 400%;
  animation: AnimationName 2.5s ease infinite;
  border-radius: 5px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.075);

  @keyframes AnimationName {
    0% {
      background-position: 0% 51%;
      transform: scale(1);
    }
    50% {
      background-position: 100% 50%;
      transform: scale(1.05);
    }
    100% {
      background-position: 0% 51%;
      transform: scale(1);
    }
  }
`;

const LoadingCircle = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 4px solid #ffffff;
  border-top: 4px solid #1d1d1d;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

export const Loading = () => (
  <LoadingImage>
    <LoadingCircle/>
  </LoadingImage>
);

export const UpButton = styled.div`
  position: fixed;
  background-color: tomato;
  width: 5em;
  height: 5em;
  right: 2em;
  bottom: 2em;

  &:hover {
    cursor: pointer;
  }
`;

export const UpArrow = styled.div`
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(3.5) translate(39%, 39%);
  width: 22px;
  height: 22px;
  
  &::after,
  &::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    top: 4px;
  }

  &::after {
    width: 8px;
    height: 8px;
    border-top: 2px solid;
    border-left: 2px solid;
    transform: rotate(45deg);
    left: 7px;
  }

  &::before {
    width: 2px;
    height: 16px;
    left: 10px;
    background: currentColor;
  }
`;

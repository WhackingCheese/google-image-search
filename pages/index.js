import { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as styles from '../styles/index.styles';

export default function Home() {

  const defaultQuery = "Súðavík";

  const [ query, setQuery ] = useState(defaultQuery);
  const [ images, setImages ] = useState([]);
  const [ hasMore, setHasMore ] = useState(true);
  const [ rendered, setRendered ] = useState();
  const [ resultCount, setResultCount ] = useState();
  const [ error, setError ] = useState(false);

  const callAPI = async (start = images.length) => {
    const q = encodeURIComponent(query);
    const s = encodeURIComponent(start);

    const url = `/api/search?q=${q}&s=${s}`;

    let res;
    let data;

    try {
      res = await fetch(url);
      data = await res.json();
    } catch (err) {
      setError(true);
      return;
    }
    
    if (res.status != 200) {
      setError(true);
    }

    return data;
  }

  const setup = () => {
    if (error) return;
    setHasMore(true);
    callAPI(0).then((data) => {
      setImages(data.items);
      const count = parseInt(data.searchInformation.totalResults);
      setResultCount(count);
    });
  }

  const getMoreImages = () => {
    // INFINITE SCROLLING LOAD
    if (error) return;
    if (images.length >= 100) {
      setHasMore(false);
      return;
    }
    callAPI().then((data) => {
      if(!("items" in data)) {
        setHasMore(false);
        return;
      }
      setImages((images) => [...images, ...data.items]);
    })
  }

  useEffect(() => {
    // INITIAL LOAD
    if (!rendered) {
      setup();
      setRendered(true);
    }
  }, [rendered]);

  useEffect(() => {
    if (!rendered) return;

    const timeOutId = setTimeout(() => {
      // QUERY CHANGE LOAD
      setError(false);
      setup();
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [query]);

  useEffect(() => {
    if (resultCount <= images.length) {
      setHasMore(false);
    }
  }, [resultCount, images]);

  return (
    <styles.Container>
      <styles.Title>Myndaleit</styles.Title>
      <styles.Input
        onChange={event => setQuery(event.target.value ? event.target.value : "test")}
        type="text"
        placeholder="Leitarorð..."
      />
      {
        error ? 
        <styles.LargeContainer>
          <styles.Error>
            Villa kom upp við uppfléttingu gagna
          </styles.Error>
        </styles.LargeContainer>
        :
        <styles.ImagesContainerInf
          dataLength={images.length}
          next={getMoreImages}
          hasMore={hasMore}
          loader={<styles.Loading/>}
          endMessage={
            <styles.LargeContainer>
              <styles.EndMessage>
                Það lítur út fyrir að þú hafir náð endanum af niðurstöðum
              </styles.EndMessage>
            </styles.LargeContainer>
          }
          scrollThreshold="150px"
        >
          {images.map((item, i) => (
            <styles.ImageContainer key={i}>
              <styles.Image
                src={item.link}
                alt={item.snippet}
              />
            </styles.ImageContainer>
          ))}
          {hasMore && <styles.Loading/>}
        </styles.ImagesContainerInf>
      }
      <styles.UpButton onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'})}}>
        <styles.UpArrow/>
      </styles.UpButton>
    </styles.Container>
  )
}

import { useEffect, useState } from 'react';
import * as styles from '../styles/index.styles';
import Head from 'next/head';

/**
 * Main page component. Relatively simple page so everything for the site is here.
 * @returns Main page component.
 */
export default function Home() {

  // Defining all necessary app states.
  const [ query, setQuery ] = useState("");
  const [ images, setImages ] = useState([]);
  const [ hasMore, setHasMore ] = useState(true);
  const [ rendered, setRendered ] = useState();
  const [ resultCount, setResultCount ] = useState();
  const [ error, setError ] = useState(false);

  /**
   * callAPI function, calls the api with state variables for start and query.
   * @param {*} start The start index of the search.
   * @returns         Data resulting from API.
   */
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

  /**
   * Infinite scrolling next handler function. Calls the API and fetches the next set of results.
   * @returns Next 10 images using the current query.
   */
  const getMoreImages = () => {
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

  /**
   * Initial load handler, prevents an API call with no search query input upon page load.
   */
  useEffect(() => {
    // INITIAL LOAD
    if (!rendered) {
      setRendered(true);
    }
  }, [rendered]);

  /**
   * Query effect. Calls the API for a new search if text is no longer being typed into the search box, wait is 0.5seconds from last input. Resets if text is typed. 
   */
  useEffect(() => {
    if (!rendered) return;
    if (query === "") {
      setImages([]);
      setHasMore(false);
      return;
    }

    const timeOutId = setTimeout(() => {
      // QUERY CHANGE LOAD
      setHasMore(true);
      callAPI(0).then((data) => {
        setImages(data.items);
        const count = parseInt("searchInformation" in data ? data.searchInformation.totalResults : 0);
        if ("searchInformation" in data) setError(false);
        setResultCount(count);
      });
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [query]);

  /**
   * Checks if more results are available when new images are loaded or resultCount is updated, sets state if not.
   */
  useEffect(() => {
    if (error) return;
    if (resultCount <= images.length) {
      setHasMore(false);
    }
  }, [resultCount, images]);

  /**
   * Main render function for the component. Renders the entire website conditionally if no errors are present and all data and flags are as they should be.
   */
  return (
    <>
    <Head>
      <title>Júni - Verkefni</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <styles.Background/>
    <styles.Container>
      <styles.Title>Myndaleit</styles.Title>
      <styles.Input
        onChange={event => {
          if (event.target.value && event.target.value != query) {
            setQuery(event.target.value)
            return;
          }
        }}
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
        images.length != 0 &&
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
            <styles.ImageLink key={i} href={item.link} target={"_blank"}>
              <styles.ImageContainer>
                <styles.Image
                  src={item.image.thumbnailLink}
                  alt={item.snippet}
                />
              </styles.ImageContainer>
            </styles.ImageLink>
          ))}
          {hasMore && <styles.Loading/>}
        </styles.ImagesContainerInf>
      }
      <styles.UpButton onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'})}}>
        <styles.UpArrow/>
      </styles.UpButton>
    </styles.Container>
    </>
  )
}

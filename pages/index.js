import { useEffect, useState } from 'react';
import * as styles from '../styles/index.styles';

export default function Home() {

  const defaultValue = "mbl";

  const [ query, setQuery ] = useState(defaultValue);
  const [ data, setData ] = useState([]);
  const [ code, setCode ] = useState(200);

  useEffect(() => {
    const q = encodeURIComponent(query);
    const timeOutId = setTimeout(() =>
      fetch(`/api/search?q=${q}`)
        .then((res) => {
          setCode(res.status);
          return res.json();
        })
        .then((dat) => {
          console.log(code);
          setData(dat.items);
        }), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  return (
    <styles.Container>
      <styles.Title>Myndaleit</styles.Title>
      <styles.Input
        type="text"
        placeholder="Leitarorð..."
        onChange={event => setQuery(event.target.value ? event.target.value : defaultValue)}
      />
      <styles.ImagesContainer>
        {code === 200 ? 
          data.map((item, i) => {
            return (
              <styles.ImageContainer key={i}>
                <styles.Image
                  src={item.link}
                  alt={item.snippet}
                />
              </styles.ImageContainer>
            );
          }) :
          <styles.Error>Villa kom upp.</styles.Error>
        }
      </styles.ImagesContainer>
    </styles.Container>
  );
}

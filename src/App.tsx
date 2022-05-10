import axios from "axios";
import { FC, useState, useEffect } from "react";
import loader from "../src/img/loader.svg";
import "./App.css";
import Photo from "./components/Photo";

const App: FC = () => {
  const count = 10;
  const url = process.env.REACT_APP_UNSPLASH_API as string;
  const api = process.env.REACT_APP_API_KEY as string;
  const apiUrl = url + api + "&count=" + count;

  interface PhotoItem {
    id: string;
    urls: { regular: string };
    alt_description: string;
    loadEvent: () => void;
  }

  const [photos, setPhotos] = useState<Array<PhotoItem>>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const fetchPhotos = async () => {
    try {
      setIsLoader(true);
      await axios.get(apiUrl).then((res) => {
        setPhotos([...photos, ...res.data]);
        setIsLoader(false);
      });
    } catch (error) {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  window.addEventListener("scroll", async () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 1000
    ) {
      await fetchPhotos();
    }
  });

  return (
    <>
      {isLoader && (
        <img
          className="w-16 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src={loader}
          alt="loader"
        />
      )}
      {photos.map((photo) => (
        <Photo
          key={photo.id}
          src={photo.urls.regular}
          alt={photo.alt_description}
          loadMorePotos={photo.loadEvent}
        />
      ))}
    </>
  );
};

export default App;

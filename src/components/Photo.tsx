import { FC } from "react";

interface PhotoProps {
  src: string;
  alt: string;
  loadMorePotos: () => void;
}

const Photo: FC<PhotoProps> = ({ src, alt, loadMorePotos }) => {
  return (
    <img
      src={src}
      alt={alt}
      onLoad={loadMorePotos}
      className="mx-auto my-4 w-[30rem] h-[30rem]"
    />
  );
};

export default Photo;

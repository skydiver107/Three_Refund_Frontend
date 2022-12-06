const handleImageError = (e: { target: { src: string; }; }) => {
  e.target.src = `/images/utils/noimage.jpg`;
};

export default handleImageError;
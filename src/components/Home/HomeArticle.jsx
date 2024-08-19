
// HomeArticle Component
const HomeArticle = ({ src, alt }) => (
    <article className="home__article swiper-slide">
      <img
        src={src}
        alt={alt}
        className="home__img"
      />
    </article>
  );
  
export default HomeArticle;  
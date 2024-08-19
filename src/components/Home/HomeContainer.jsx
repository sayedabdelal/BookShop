import HomeTitle from "./HomeTitle";
import HomeImageSwiper from "./HomeImageSwiper";
// HomeContainer Component
const HomeContainer = () => (
    <section className="home section" id="home">
      <div className="home__container container grid">
        <HomeTitle />
        <HomeImageSwiper />
      </div>
    </section>
  );
export default HomeContainer;
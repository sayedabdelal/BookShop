
import './Home.css'

import HomeContainer from './HomeContainer';
import ServicesContainer from './ServicesContainer';
// import joinImage from '../../assets/img/join-bg.jpg'
import bookJoin from '../../assets/img/bg-final.avif'
import JoinContainer from './JoinContainer';





function Home() {
  return (
    <>
      <HomeContainer />
      <ServicesContainer />
      <JoinContainer joinImage = {bookJoin}/>
    </>
  );
}

export default Home;

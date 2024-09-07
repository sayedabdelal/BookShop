
import './Home.css'

import HomeContainer from './HomeContainer';
import ServicesContainer from './ServicesContainer';
import joinImage from '../../assets/img/join-bg.jpg'
import JoinContainer from './JoinContainer';





function Home() {
  return (
    <>
      <HomeContainer />
      <ServicesContainer />
      <JoinContainer joinImage = {joinImage}/>
      
    </>
  );
}

export default Home;

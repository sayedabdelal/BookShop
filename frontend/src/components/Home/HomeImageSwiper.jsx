import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Homeimg1 from '../../assets/img/home-book-1.png';
import Homeimg2 from '../../assets/img/home-book-2.png';
import Homeimg3 from '../../assets/img/home-book-3.png';
import Homeimg4 from '../../assets/img/home-book-4.png';
import HomeArticle from './HomeArticle';

const images = [Homeimg1, Homeimg2, Homeimg3, Homeimg4];

const HomeImageSwiper = () => {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth);
    }
  }, [containerRef.current]);

  useEffect(() => {
    controls.start({
      x: -width,
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: 'mirror',
      },
    });
  }, [controls, width]);

  return (
    <div className="home__images-wrapper">
      <motion.div
        className="home__images"
        ref={containerRef}
        animate={controls}
        style={{ display: 'flex', whiteSpace: 'nowrap' }}
      >
        {images.concat(images).map((src, index) => (
          <HomeArticle
            key={index}
            src={src}
            alt={`image ${index + 1}`}
            style={{ display: 'inline-block', width: '200px' }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default HomeImageSwiper;

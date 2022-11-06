import React, { useState } from 'react';
import { SliderData } from './SliderData';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import { Button } from 'antd';
const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const delay = 10000;
  const images = ["/Slide1.jpg", "/Slide2.jpg", "/Slide3.jpg"];
  React.useEffect(() => {
    setTimeout(
      () =>
        setCurrent((prevcurrent) =>
          prevcurrent === images.length - 1 ? 0 : prevcurrent + 1
        ),
      delay
    );

    return () => {};
  }, [current]);


  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className='slider'>
      
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
            
            <>
              <img src={slide.image} alt='travel image' className='image' />
              <NavLink to="/login"><Button className='btn' shape="round" size='large'>Login</Button></NavLink>
            </>
            
            )}
            
          </div>

        );

      })}

    </section>

  );
};

export default ImageSlider;

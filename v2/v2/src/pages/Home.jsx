import '../MyStyle/Home.css';
import ImageSlider from '../components/ImageSlider';
import { SliderData } from '../components/SliderData';

function Home() {
  return <ImageSlider slides={SliderData} />;
}

export default Home;
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Side';

const Banner = () => {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        fetch(`Fakebanner.json`)
            .then(response => response.json())
            .then(data => setSlides(data))

    }, []);

    const shouldLoop = slides.length > 2;
    return (
        <div className='container px-2 rounded-2xl py-10 mx-auto'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={shouldLoop}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className='mySwiper rounded-2xl'
            >
                {slides.map(slide => (
                    <SwiperSlide key={slide._id}>
                        <Slide image={slide.url} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;

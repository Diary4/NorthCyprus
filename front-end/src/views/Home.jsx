import React, { useEffect } from "react";
import "../assets/css/main.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Card from "../components/Card";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import StudiesCard from "../components/StudiesCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ApplyNow from "./ApplyNow";
import {
  MdGppGood,
  MdAirplanemodeActive,
  MdAutoGraph,
  MdBusinessCenter,
  MdComputer,
  MdFax,
  MdFoggy,
  MdMedicalServices,
  MdOutlineCompost,
} from "react-icons/md";
import { GiJusticeStar } from "react-icons/gi";
import { FaEarthAfrica } from "react-icons/fa6";
import { IoFlower } from "react-icons/io5";
import Typewriter from "../components/TypeWriter";
import Loader from "../components/AnimatedComp/AnimatedComp";
import NEU from "../assets/NEU.png";
import CIU from "../assets/CIU.png";
import BAU from "../assets/BAU.png";
import EMU from "../assets/EMU.png";
import CPU from "../assets/cyprus.jpg";
import { useNavigate } from "react-router-dom";
import ApplyNowButton from "../components/ApplyNowButton";

export default function Main() {

  const navigate = useNavigate()

  const UniversityCard = [
    {
      title: "Near East University",
      img: NEU,
      content:
        "Near East University is the most comprehensive and equipped education institution in Cyprus, which raises individuals that are beneficial for its country, moves forward with secure steps, has 20 faculties, 6 institutes, 5 colleges, 32 research centres, 196 undergraduate, 240 graduate and doctorate programs and over 28,000 students from 143 different countries.",
      direct: () => navigate('/neu-departments')
      },
    {
      title: "Cyprus International University",
      img: CIU,
      content:
        "Cyprus International University is a modern campus University based in the suburb of Haspolat on the outskirts of Nicosia, the capital city of Cyprus. At the cornerstone of three continents and rich in terms of history and culture, North Cyprus, the pearl of the Mediterranean, offers a truly international experience.",
      direct: () => navigate('/ciu-departments')
      },
    {
      title: "Bahecesehir Cyprus University",
      img: BAU,
      content:
        "The University’s purpose, aside from providing an education of the highest standards, is to offer its students the means to study at different international locations and to acquire a global vision by giving them the chance to benefit from equivalent academic opportunities on different continents and in different",
      direct: () => navigate('/bau-departments')
      },
    {
      title: "Eastern Medaterranian University",
      img: EMU,
      content:
        "Eastern Mediterranean University (EMU) established in Northern Cyprus in 1979. It has a great reputation among the international Universities; it is one of the top 1500 Universities in all over the world. Therefore, it includes over 20000 students from 106 countries and 1,100 academicians from different 35 countries.",
      direct: () => navigate('/emu-departments')
      },
  ];


  useEffect(() => {
    document.title = "North cyprus"
  });

  return (
    <div className="main">
      <Header />
      <div className="top-section" id="top-section">
        <div className="div-content">
          <Typewriter />
          <h1>Write your journey with us </h1>
          <div>
            <p>
              Whether you're pursuing an associate, bachelor, master, or PhD,
              every step you take brings you closer to your dreams. Stay
              dedicated, embrace the journey, and remember that growth happens
              one small effort at a time.
            </p>
          </div>
          <ApplyNowButton onClick={() => navigate('apply-now')}/>
        </div>
      </div>
      <div className="main-middle-section" id="main-middle-section">
        <h2>Universities in Cyprus</h2>
        <p>
          Explore a world of academic opportunities to choose from—begin your
          journey toward success today.
        </p>
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {UniversityCard.map((card, index) => (
            <SwiperSlide key={index}>
              <Card title={card.title} img={card.img} content={card.content} direct={card.direct}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="studies-section" id="studies-section">
        <h2>
          Discover our
          <span
            style={{
              color: "#577BC1",
              fontWeight: "bold",
              fontFamily: "monospace",
            }}
          >
            Studies
          </span>
        </h2>
        <div className="loader-box">
          <Loader />
        </div>
        <p>
          Explore over 1,000 academic programs across 4 universities in North
          Cyprus your pathway to success begins here.
        </p>
        <div className="studies-card-section">
          <StudiesCard icon={<MdAirplanemodeActive />} title="Aviation" />
          <StudiesCard
            icon={<MdAutoGraph />}
            title="Art, Architecture, Design & Media "
          />
          <StudiesCard
            icon={<MdBusinessCenter />}
            title="Business & Management"
          />
          <StudiesCard icon={<MdComputer />} title="Computer Science" />
          <StudiesCard icon={<MdFax />} title="Engineering Technology" />
          <StudiesCard icon={<MdFoggy />} title="Environment & Agriculture" />
          <StudiesCard icon={<MdMedicalServices />} title="Medicine & Health" />
          <StudiesCard icon={<MdOutlineCompost />} title="Natural Sciences" />
        </div>
      </div>
      <div className="keen-section" id="keen-section">
        <div className="keen-content">
          <h2 style={{ fontFamily: "Libre Baskerville" }}>
            Why <span className="keen-education">North Cypurs</span>
          </h2>
          <div width="100px">
            <p className="keen-section-p">
              North Cyprus offers countless reasons to study, combining stunning
              landscapes, rich culture, and modern amenities. Known for its
              affordability and safety, it provides a unique academic
              environment that feels like a vacation, perfect for both personal
              and academic growth.
            </p>
          </div>
          <div className="keen-container">
            <div className="keen-content-icons-cont">
              <div className="keen-content-icons">
                <div className="keen-icon">
                  <i>
                    <MdGppGood />
                  </i>
                </div>

                <p>High Quality Education</p>
              </div>
              <div className="keen-content-icons">
                <div className="keen-icon">
                  <i>
                    <GiJusticeStar />
                  </i>
                </div>
                <p>Affordable Tuition Prices</p>
              </div>
            </div>

            <div className="keen-content-icons-cont">
              <div className="keen-content-icons">
                <div className="keen-icon">
                  <i>
                    <FaEarthAfrica />
                  </i>
                </div>
                <p>Multi-Cultural Environment</p>
              </div>
              <div className="keen-content-icons">
                <div className="keen-icon">
                  <i>
                    <IoFlower />
                  </i>
                </div>
                <p>Safe & Peaceful Environment</p>
              </div>
            </div>
          </div>
        </div>
        <div className="keen-image">
          <img src={CPU} alt="keen-education" />
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

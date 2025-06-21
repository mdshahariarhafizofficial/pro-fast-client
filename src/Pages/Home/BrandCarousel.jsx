
// BrandCarousel.jsx
import Marquee from "react-fast-marquee";

import amazon from "../../assets/brands/amazon.png";
import amazonVector from "../../assets/brands/amazon_vector.png";
import casio from "../../assets/brands/casio.png";
import moonstar from "../../assets/brands/moonstar.png";
import randstad from "../../assets/brands/randstad.png";
import startPeople from "../../assets/brands/start-people 1.png";
import start from "../../assets/brands/start.png";

const logos = [
  amazon,
  amazonVector,
  casio,
  moonstar,
  randstad,
  startPeople,
  start,
];

const BrandCarousel = () => {
  return (
    <div className="mb-20 md:px-20">
      <h2 className="text-center text-xl md:text-2xl font-bold text-secondary mb-10">
        We've helped thousands of sales teams
      </h2>

      <Marquee className="pb-16 border-b-2 border-dashed border-secondary" direction="right" speed={60} pauseOnHover={true} gradient={false}>
        {logos.map((logo, idx) => (
          <div key={idx} className="mx-[60px] flex items-center">
            <img
              src={logo}
              alt={`brand-${idx}`}
              className="w-[123px] h-[24px] object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default BrandCarousel;

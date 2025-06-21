// HowItWorks.jsx
import { HiOutlineTruck } from "react-icons/hi2";
import { GiReceiveMoney } from "react-icons/gi";
import { TbBuildingWarehouse } from "react-icons/tb";
import { RiBuilding2Line } from "react-icons/ri";

const HowItWorks = () => {
  const steps = [
    {
      icon: <HiOutlineTruck size={34} className="text-[#003B49]" />,
      title: "Booking Pick & Drop",
      desc:
        "Effortlessly schedule a pickup from your home or office and drop off to any destination. We provide quick, reliable services for personal and professional delivery needs.",
    },
    {
      icon: <GiReceiveMoney size={34} className="text-[#003B49]" />,
      title: "Cash On Delivery",
      desc:
        "Increase customer convenience and trust by allowing payments upon delivery. We handle secure cash collection and transfer, so you can focus on your business.",
    },
    {
      icon: <TbBuildingWarehouse size={34} className="text-[#003B49]" />,
      title: "Delivery Hub",
      desc:
        "Access a wide network of local hubs for faster pickups and deliveries. Save time and streamline your operations by using our dedicated delivery points.",
    },
    {
      icon: <RiBuilding2Line size={34} className="text-[#003B49]" />,
      title: "Booking SME & Corporate",
      desc:
        "Unlock tailored logistics solutions for small businesses and corporate operations. Handle bulk deliveries with ease, professionalism, and timely execution.",
    },
  ];

  return (
    <div className=" pt-10 pb-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <h2 className="text-2xl md:text-3xl font-bold text-[#003B49] mb-8">
        How it Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 w-full h-full shadow-sm hover:shadow-md transition"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="font-semibold text-[#003B49] mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;

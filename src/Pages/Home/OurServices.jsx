import {
  HiOutlineLightningBolt,
  HiOutlineGlobeAlt,
  HiOutlineCube,
  HiOutlineCurrencyDollar,
  HiOutlineOfficeBuilding,
  HiOutlineArrowCircleLeft
} from "react-icons/hi";
import { TbTruckDelivery } from "react-icons/tb";
const services = [
  {
    title: "Express & Standard Delivery",
    desc: `We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. \nExpress delivery available in Dhaka within 4–6 hours from pick-up to drop-off.`,
    icon: TbTruckDelivery,
  },
  {
    title: "Nationwide Delivery",
    desc: `We deliver parcels nationwide with home delivery \nin every district; ensuring your products reach \ncustomers within 48–72 hours.`,
    icon: HiOutlineGlobeAlt,
  },
  {
    title: "Fulfillment Solution",
    desc: `We offer inventory management support, \nonline order processing, packaging, and \nafter-sales service.`,
    icon: HiOutlineCube,
  },
  {
    title: "Cash on Home Delivery",
    desc: `100% cash on delivery anywhere in Bangladesh \nwith guaranteed product safety.`,
    icon: HiOutlineCurrencyDollar,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    desc: `Customized logistics for corporate clients \nincluding warehouse & inventory solutions.`,
    icon: HiOutlineOfficeBuilding,
  },
  {
    title: "Parcel Return",
    desc: `Reverse logistics to return or exchange \nproducts through merchants & business clients.`,
    icon: HiOutlineArrowCircleLeft,
  },
];

const OurServices = () => {
  return (
    <div className="bg-[#03373D] rounded-[20px] mb-24 py-24 px-4 sm:px-6 md:px-10 lg:px-20 text-white">
      <h2 className="text-2xl md:text-4xl font-bold mb-2 text-center">
        <span className="text-[#CAEB66]">Our Services</span>
      </h2>
      <p className="text-center text-sm md:text-base max-w-2xl mx-auto mb-10 text-gray-200">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
        From personal packages to business shipments — we deliver on time, every time.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div
              key={idx}
              className="group bg-white rounded-xl p-6 text-center shadow-sm transition-all duration-300 hover:bg-[#CAEB66] h-[260px] flex flex-col justify-start"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-[#CAEB66] group-hover:bg-white transition-all duration-300 p-3 rounded-full inline-flex items-center justify-center">
                  <Icon size={28} className="text-[#03373D]" />
                </div>
              </div>
              <h3 className="font-semibold text-[#03373D] mb-2">{service.title}</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                {service.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurServices;

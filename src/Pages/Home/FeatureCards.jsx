import React from "react";

// Illustration paths (make sure these images exist in the specified path)
import LiveTracking from "../../assets/live-tracking.png";
import SafeDelivery from "../../assets/customer-top.png";
import CallSupport from "../../assets/safe-delivery.png";

const features = [
  {
    image: LiveTracking,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
  },
  {
    image: SafeDelivery,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    image: CallSupport,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];

export default function FeatureCards() {
  return (
    <div className="mb-20 pb-20 px-4 md:mx-24 border-b-2 border-dashed border-secondary">
      <div className="space-y-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6"
          >
            <div className="w-28 h-28 flex-shrink-0">
              <img src={feature.image} alt={feature.title} className="w-full h-full object-contain" />
            </div>
            <div className="border-l-2 border-dashed border-gray-300 pl-6">
              <h3 className="text-lg font-semibold text-secondary">{feature.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

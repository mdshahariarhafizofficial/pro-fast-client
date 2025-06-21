import React from 'react';

const Faq = () => {
    return (
    <div className="py-20 px-4 lg:mx-24">
        <div className='text-center space-y-4'>
            <h2 className='text-4xl text-secondary font-bold'>Frequently Asked Question (FAQ)</h2>
            <p>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your body with ease!</p>
        </div>
        <div className='max-w-6xl mx-auto mt-6 space-y-4'>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title font-semibold">How does this posture corrector work?</div>
                <div className="collapse-content text-sm">A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.</div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">Is it suitable for all ages and body types?</div>
                <div className="collapse-content text-sm">Yes! Our posture corrector is designed with adjustable straps to comfortably fit most body types and ages, from teens to adults.</div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">Does it really help with back pain and posture improvement?</div>
                <div className="collapse-content text-sm">Absolutely. Regular use of the posture corrector helps align your spine, reduce slouching, and relieve upper back and shoulder discomfort over time.</div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">Does it have smart features like vibration alerts?</div>
                <div className="collapse-content text-sm">Yes, our premium model includes smart posture detection with gentle vibration alerts when you start to slouch, helping you stay upright effortlessly.</div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">How will I be notified when the product is back in stock?</div>
                <div className="collapse-content text-sm">You can sign up for back-in-stock alerts by clicking the 'Notify Me' button on the product page. We'll email you as soon as it's available again.</div>
                </div>
        </div>
    </div>
    );
};

export default Faq;
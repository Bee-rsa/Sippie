import { useState } from "react";

const FAQSection = () => {
    const faqs = [
        {
            question: "What printing services do you offer?",
            answer: "We offer a variety of printing services including business cards, flyers, banners, signage, and custom branding solutions."
        },
        {
            question: "How long does shipping take?",
            answer: "Shipping times depend on your location and order size. Typically, it takes between 3-7 business days for national delivery."
        },
        {
            question: "Do you offer design services?",
            answer: "Yes! You can use our free online designer tool to create your artwork or modify one of our pre-made templates."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept secure online payments via credit/debit cards, PayPal, and EFT bank transfers."
        },
        {
            question: "Can I order in bulk?",
            answer: "Yes, we offer discounts on bulk orders. Please contact our sales team for more details."
        },
        {
            question: "What file formats do you accept for printing?",
            answer: "We accept PDF, JPEG, PNG, and AI files. For best results, please submit high-resolution files with a minimum of 300 DPI."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we offer international shipping to most countries. Shipping rates and times vary depending on the destination. Please contact us for more information."
        }        
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl sm:text-4xl font-semibold text-green-500 mb-8">
                Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                    <div key={index} className="mb-6 border-b border-gray-600 pb-4">
                        <button
                            className="w-full text-left text-lg font-medium flex justify-between items-center focus:outline-none"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                            <span className="text-green-400">{openIndex === index ? "−" : "+"}</span>
                        </button>
                        {openIndex === index && (
                            <p className="mt-2 text-gray-300">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQSection;

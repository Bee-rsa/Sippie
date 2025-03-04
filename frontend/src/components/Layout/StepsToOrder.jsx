const StepsToOrder = () => {
    const steps = [
        {
            step: "1",
            title: "Choose Your Product",
            description: "Browse our catalog and select the product that fits your needs. Customize the size, quantity, and other options."
        },
        {
            step: "2",
            title: "Upload Your Design",
            description: "Use our online design tool to create your artwork or upload your ready-made design file for printing."
        },
        {
            step: "3",
            title: "Review & Approve",
            description: "Double-check your order details and approve the final design before proceeding to checkout."
        },
        {
            step: "4",
            title: "Secure Payment",
            description: "Make a secure payment using your preferred payment method, including credit cards, PayPal, or EFT."
        },
        {
            step: "5",
            title: "Receive Your Order",
            description: "Sit back and relax while we print and ship your order straight to your doorstep within the estimated delivery time."
        }
    ];

    return (
        <div className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl sm:text-4xl font-semibold text-green-500 mb-8">
                How to Order
            </h2>
            <div className="max-w-3xl mx-auto">
                {steps.map((step, index) => (
                    <div key={index} className="mb-6 flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-black font-bold text-xl flex items-center justify-center rounded-full mr-4">
                            {step.step}
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-green-300">{step.title}</h3>
                            <p className="text-gray-300">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StepsToOrder;

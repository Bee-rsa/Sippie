import React from 'react';

const TermsAndConditions = () => {
  // Scroll to top when the component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col items-center">

      <div className="container mx-auto px-4 py-12 mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Table of Contents */}
        <nav className="md:col-span-1 sticky top-16 h-auto shadow-lg rounded-lg p-4 max-h-screen overflow-y-auto border-2 text-white border-custom-blue font-poppins">
          <h2 className="text-xl font-bold mb-4 text-white border-b-2 pb-2">Table of Contents</h2>
          <ul className="space-y-2">
            <li>
              <a href="#information" className="hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
                1. Definitions
              </a>
            </li>
            <li>
              <a href="#usage" className="hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
                2. Acceptance of Terms
              </a>
            </li>
            <li>
              <a href="#disclosure" className="hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
                3. User Eligibility
              </a>
            </li>
            <li>
              <a href="#security" className="hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
                4. Account Registration and Security
              </a>
            </li>
            <li>
              <a href="#rights" className="hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
                5. Use of the Van Der Holtz Promotions Platform
              </a>
            </li>
            <li>
              <a href="#changes" className="hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
                6. Product Orders and Service Agreement
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
                7. Pricing and Payment
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
                8. Cancellations and Refunds
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
                9. User Responsibilities
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
                10. Reviews and Feedback
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
                11. Limitation of Liability
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
                12. Governing Law
              </a>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="md:col-span-2 max-h-screen text-white overflow-y-auto pr-4">
          <h1 className="text-3xl font-bold mb-6 font-poppins">Terms and Conditions</h1>
          <p className="mb-4"><strong>Effective Date:</strong> [26 November 2024]</p>
          <p className="mb-4">
            Welcome to Van Der Holtz Promotions. By accessing and using our platform, you (&quot;User&quot; or &quot;Customer&quot;) agree to comply with and be bound by the following Terms and Conditions (&quot;Agreement&quot;). This Agreement governs your use of Van Der Holtz Promotions&apos; printing services, including any content, functionality, and services offered through the platform. Please read these Terms and Conditions carefully before using Van Der Holtz Promotions. If you do not agree to these Terms, you must not use the platform.
          </p>

          <h2 id="information" className="text-2xl font-bold mb-4 font-poppins">1. Definitions</h2>
          <p className="mb-4">
            Van Der Holtz Promotions is a printing business offering customized printing services, including business cards, brochures, banners, flyers, and more. The term &quot;User&quot; or &quot;Customer&quot; refers to any individual or business using Van Der Holtz Promotions to place printing orders. A &quot;Service Provider&quot; refers to Van Der Holtz Promotions, which provides the printing services. A &quot;Service Agreement&quot; refers to the agreement between the User and Van Der Holtz Promotions for the printing services provided.
          </p>

          <h2 id="usage" className="text-2xl font-bold mb-4 font-poppins">2. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing or using Van Der Holtz Promotions, you agree to these Terms and Conditions. If you do not agree, you should not access or use the platform. Van Der Holtz Promotions reserves the right to modify or update these Terms at any time without prior notice. Continued use of the platform after any changes are made constitutes acceptance of the new terms. It is your responsibility to review these Terms periodically.
          </p>

          <h2 id="disclosure" className="text-2xl font-bold mb-4 font-poppins">3. User Eligibility</h2>
          <p className="mb-4">
            You must be at least 18 years of age or have the legal capacity to enter into a binding agreement. Users are required to provide accurate and truthful information during the registration process and keep this information up to date. Additionally, users must comply with all applicable laws and regulations related to the use of Van Der Holtz Promotions and printing services. Van Der Holtz Promotions reserves the right to suspend or terminate accounts for violations of these eligibility requirements.
          </p>

          <h2 id="security" className="text-2xl font-bold mb-4 font-poppins">4. Account Registration and Security</h2>
          <p className="mb-4">
            To place orders on Van Der Holtz Promotions, you must create an account and provide accurate information about yourself or your business. You are responsible for maintaining the confidentiality of your account login credentials and for all activities that occur under your account. Van Der Holtz Promotions reserves the right to suspend or terminate your account if any information provided during registration is false, misleading, or violates these Terms. It is your responsibility to notify Van Der Holtz Promotions immediately if you suspect unauthorized use of your account.
          </p>

          <h2 id="rights" className="text-2xl font-bold mb-4 font-poppins">5. Use of the Van Der Holtz Promotions Platform</h2>
          <p className="mb-4">
            Van Der Holtz Promotions provides a platform where Users can select and order customized printing services. Users can upload designs or use templates available on the platform to place their print orders. The platform allows Users to specify product quantities, materials, and other requirements. Van Der Holtz Promotions will process the order and deliver the printed products as per the specifications. Users agree to use the platform for legitimate, non-commercial purposes, and not to engage in any fraudulent activities. Any use of automated systems or scraping tools to collect data from Van Der Holtz Promotions is prohibited.
          </p>

          <h2 id="changes" className="text-2xl font-bold mb-4 font-poppins">6. Product Orders and Service Agreement</h2>
          <p className="mb-4">
            Once a User places an order for printing services, a binding agreement is created between the User and Van Der Holtz Promotions. The terms of the agreement, including pricing, delivery timelines, and cancellation policies, are outlined during the checkout process. Van Der Holtz Promotions is responsible for fulfilling the order as per the agreed-upon specifications. Users are encouraged to review their order details carefully before finalizing the purchase.
          </p>

          <h2 id="contact" className="text-2xl font-bold mb-4 font-poppins">7. Pricing and Payment</h2>
          <p className="mb-4">
            The prices for printing services on Van Der Holtz Promotions are set and displayed at the time of placing an order. Prices include production costs, materials, and any additional fees for customizations or shipping. Users must provide accurate payment information at the time of placing an order. Payments will be processed through Van Der Holtz Promotions&apos;s secure payment gateway. By placing an order, you agree to pay the full amount specified at checkout. Van Der Holtz Promotions may charge additional fees for express processing or shipping, which will be clearly displayed during the ordering process.
          </p>

          <h2 id="contact" className="text-2xl font-bold mb-4 font-poppins">8. Cancellations and Refunds</h2>
          <p className="mb-4">
            Cancellations are subject to the terms outlined on the platform at the time of placing an order. Refunds may be granted for defective products or services, but the User must notify Van Der Holtz Promotions within a reasonable time frame. Refunds will be processed according to the refund policy provided at the time of purchase. Users are responsible for reviewing cancellation and refund policies before placing an order.
          </p>

          <h2 id="contact" className="text-2xl font-bold mb-4 font-poppins">9. User Responsibilities</h2>
          <p className="mb-4">
            Users are responsible for ensuring that all designs, artwork, or content submitted for printing comply with copyright laws and do not infringe on any third-party rights. Van Der Holtz Promotions is not liable for any legal issues that arise due to improper use of intellectual property or other unlawful content. Users are also responsible for ensuring their payment information is correct and for any issues related to the payment process.
          </p>

          <h2 id="contact" className="text-2xl font-bold mb-4 font-poppins">10. Reviews and Feedback</h2>
          <p className="mb-4">
            Users may submit reviews and feedback on the products and services provided by Van Der Holtz Promotions. All feedback must be accurate, honest, and respectful. Van Der Holtz Promotions reserves the right to remove any feedback that violates these guidelines or is deemed inappropriate. By submitting reviews, users grant Van Der Holtz Promotions the right to use, modify, and publish the feedback.
          </p>

          <h2 id="contact" className="text-2xl font-bold mb-4 font-poppins">11. Limitation of Liability</h2>
          <p className="mb-4">
            Van Der Holtz Promotions is not liable for any damages resulting from the use of the platform, including any direct, indirect, incidental, or consequential damages. In the event of a dispute, the maximum liability of Van Der Holtz Promotions is limited to the amount paid by the user for the services purchased.
          </p>

          <h2 id="contact" className="text-2xl font-bold mb-4 font-poppins">12. Governing Law</h2>
          <p className="mb-4">
            These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which Van Der Holtz Promotions operates. Any disputes arising from these Terms and Conditions will be subject to the exclusive jurisdiction of the courts in that jurisdiction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

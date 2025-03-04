import React from 'react';

const Policy = () => {
  // Scroll to top when the component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex -mt-1 flex-col items-center bg-black">
      <div className="container mx-auto px-4 py-12 mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Table of Contents */}
        <nav className="md:col-span-1 sticky top-16 h-auto shadow-lg rounded-lg p-4 max-h-screen overflow-y-auto border-2 border-custom-blue font-poppins">
          <h2 className="text-xl font-bold mb-4 text-white border-b-2 pb-2">Table of Contents</h2>
          <ul className="space-y-2">
            <li>
              <a href="#information" className="hover:no-underline hover:text-custom-blue text-white transition duration-200 font-poppins">
                1. Information We Collect
              </a>
            </li>
            <li>
              <a href="#usage" className="hover:no-underline hover:text-custom-blue text-white transition duration-200 font-poppins">
                2. How We Use Your Information
              </a>
            </li>
            <li>
              <a href="#disclosure" className="hover:no-underline hover:text-custom-blue text-white transition duration-200 font-poppins">
                3. Disclosure of Your Information
              </a>
            </li>
            <li>
              <a href="#security" className="hover:no-underline hover:text-custom-blue text-white transition duration-200 font-poppins">
                4. Data Security
              </a>
            </li>
            <li>
              <a href="#rights" className="hover:no-underline hover:text-custom-blue text-white transition duration-200 font-poppins">
                5. Your Rights
              </a>
            </li>
            <li>
              <a href="#changes" className="hover:no-underline hover:text-custom-blue text-white transition duration-200 font-poppins">
                6. Changes to This Privacy Policy
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:no-underline hover:text-custom-blue text-white transition duration-200 font-poppins">
                7. Contact Us
              </a>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="md:col-span-2 text-white max-h-screen overflow-y-auto pr-4">
          <h1 className="text-3xl font-bold mb-6 font-poppins">Privacy Policy for Van Der Holtz Promotions</h1>
          <p className="mb-4"><strong>Effective Date:</strong> [19 February 2024]</p>
          <p className="mb-4">
            Van Der Holtz Promotions (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our website and application (collectively, the &quot;Services&quot;). Please read this policy carefully. By accessing or using our Services, you agree to the collection and use of your information as outlined in this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use the Services.
          </p>

          <h2 id="information" className="text-2xl font-bold mb-4 font-poppins">1. Information We Collect</h2>
          <p className="mb-4">
            We may collect the following types of information:
            <ul className="list-disc ml-8">
              <li><strong>Personal Information:</strong> When you register for our Services, we may collect your name, email address, phone number, company name, address, and other contact information.</li>
              <li><strong>Payment Information:</strong> This may include credit card numbers, bank account details, or other financial data when you make a payment for our Services.</li>
              <li><strong>Usage Data:</strong> We collect information on how you use our Services, such as your IP address, browser type, operating system, pages visited, time spent on the Services, and other data regarding your interaction with our platform.</li>
              <li><strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and similar technologies to track your activity on our Services and to collect information such as preferences and usage patterns.</li>
            </ul>
          </p>

          <h2 id="usage" className="text-2xl font-bold mb-4 font-poppins">2. How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect for the following purposes:
            <ul className="list-disc ml-8">
              <li><strong>To provide and maintain our Services:</strong> This includes processing transactions, managing your account, and providing customer support.</li>
              <li><strong>To improve our Services:</strong> We analyze your usage data to enhance our offerings and personalize your experience.</li>
              <li><strong>To communicate with you:</strong> We may send you updates, newsletters, promotional materials, and other information that may be of interest to you. You may opt-out of marketing communications at any time.</li>
              <li><strong>To comply with legal obligations:</strong> We may use your information to comply with applicable laws, regulations, and legal processes.</li>
            </ul>
          </p>

          <h2 id="disclosure" className="text-2xl font-bold mb-4 font-poppins">3. Disclosure of Your Information</h2>
          <p className="mb-4">
            We may disclose your information in the following situations:
            <ul className="list-disc ml-8">
              <li><strong>Third-party service providers:</strong> We may share your information with vendors and service providers that help us operate our Services, process payments, or provide customer support.</li>
              <li><strong>Business transfers:</strong> If we undergo a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
              <li><strong>Legal compliance:</strong> We may disclose your information if required by law or in response to valid requests by government authorities, such as a subpoena or court order.</li>
              <li><strong>Protection of rights:</strong> We may disclose your information to protect the rights, property, and safety of Van Der Holtz Promotions, our users, or others, including investigating potential violations of our terms of service.</li>
            </ul>
          </p>

          <h2 id="security" className="text-2xl font-bold mb-4 font-poppins">4. Data Security</h2>
          <p className="mb-4">
            We employ reasonable administrative, technical, and physical safeguards to protect the information we collect. While we strive to protect your personal data, please understand that no method of transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security. By using our Services, you acknowledge and accept these risks.
          </p>

          <h2 id="rights" className="text-2xl font-bold mb-4 font-poppins">5. Your Rights</h2>
          <p className="mb-4">
            Depending on your jurisdiction, you may have the following rights regarding your personal information:
            <ul className="list-disc ml-8">
              <li><strong>Access:</strong> You have the right to request a copy of the personal information we hold about you.</li>
              <li><strong>Correction:</strong> You may request that we correct any inaccuracies in your personal data.</li>
              <li><strong>Deletion:</strong> You may request the deletion of your personal data, subject to certain legal exceptions.</li>
              <li><strong>Opt-out of marketing:</strong> You have the right to opt-out of receiving marketing communications at any time.</li>
              <li><strong>Data portability:</strong> In some cases, you may request the transfer of your personal information to another service provider.</li>
            </ul>
            To exercise any of these rights, please contact us using the contact information below.
          </p>

          <h2 id="changes" className="text-2xl font-bold mb-4 font-poppins">6. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any significant changes by posting the updated Privacy Policy on our website and updating the effective date at the top of the policy. You are encouraged to review this Privacy Policy periodically to stay informed about how we protect your personal information.
          </p>

          <h2 id="contact" className="text-2xl font-bold mb-4 font-poppins">7. Contact Us</h2>
          <p className="mb-4">
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
          </p>
          <p className="mb-4">
            Van Der Holtz Promotions<br />
            21B Blue Street, Isithebe, Mandeni, 4490<br />
            georgeholtzhausen80@gmail.com<br />
            072 369 5678
          </p>
        </div>
      </div>
    </div>
  );
};

export default Policy;

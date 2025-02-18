const ContactPage = () => {
  return (
    <div className="flex flex-col w-full font-poppins">

      <div className="flex flex-col w-full">
        {/* Top half with bg-custom-blue */}
        <div className="bg-custom-blue w-full mt-30 flex items-center justify-center">
          {/* Text Section */}
          <div className="w-full max-w-screen-lg mx-auto text-center px-4">
            <h2 className="text-3xl sm:text-4xl text-green-500 font-bold mb-4">Get in touch with an Expert</h2>
            <p className="text-base sm:text-lg mb-8">
              We always love speaking to customers, potential customers, business analysts, and digital freight enthusiasts. 
              To save you some time, check out if any of the links below may help before reaching out to us.
            </p>
          </div>
        </div>

        {/* Bottom half with bg-white */}
        <div className="w-full h-[70vh] bg-black mt-20 flex justify-center items-center">
          <div className="flex w-full max-w-screen-lg mx-auto px-4 py-8">
            {/* Left side: Contact Info */}
            <div className="w-full md:w-1/2 pr-8">
              <h3 className="text-xl text-green-500 font-bold mb-4">Contact Information</h3>
              <p className="text-base sm:text-lg mb-4">Have questions? We&apos;re here to help. Reach us through the following ways:</p>
              <ul className="list-none">
                <li className="mb-2">
                  <strong>Email:</strong> contact@vanderholtz.com
                </li>
                <li className="mb-2">
                  <strong>Phone:</strong> +123 456 7890
                </li>
                <li className="mb-2">
                  <strong>Address:</strong> 1234 Business Blvd, City, Country
                </li>
              </ul>
            </div>

            {/* Right side: Contact Form */}
            <div className="w-full md:w-1/2">
              <h3 className="text-xl text-green-500 font-bold mb-4">Get in Touch</h3>
              <form action="#" method="POST" className="flex flex-col space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">Name</label>
                  <input type="text" id="name" name="name" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
                  <input type="tel" id="phone" name="phone" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium">Email</label>
                  <input type="email" id="email" name="email" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium">Message</label>
                  <textarea id="message" name="message" rows="4" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
                </div>

                <button type="submit" className="self-start bg-green-500 text-white py-2 px-6 rounded-md hover:bg-custom-blue transition duration-200">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;

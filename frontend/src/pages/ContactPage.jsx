import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Contact form component
export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_47j7o4y", "template_80c8x2c", form.current, {
        publicKey: "62QEvBoAkwjeNxNXX",
      })
      .then(
        () => {
          toast.success("Thank you! Your message has been sent.");
          form.current.reset(); // Clear input fields
        },
        (error) => {
          toast.error("Failed to send message. Please try again.");
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="flex flex-col space-y-4">
      <div>
        <label htmlFor="user_name" className="block text-white text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="cellphone_number" className="block text-white text-sm font-medium">
          Phone Number
        </label>
        <input
          type="text"
          id="cellphone_number"
          name="cellphone_number"
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="user_email" className="block text-white text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-white text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        ></textarea>
      </div>

      <button
        type="submit"
        className="self-start bg-green-500 mb-20 text-white py-2 px-6 rounded-md hover:bg-custom-blue transition duration-200"
      >
        Send Message
      </button>
    </form>
  );
};

// Contact page component
import { ToastContainer } from "react-toastify";

const ContactPage = () => {
  return (
    <div className="flex flex-col -mt-2 bg-black w-full font-poppins">
      <ToastContainer /> {/* Add this to enable toast notifications */}
      <div className="flex flex-col w-full">
        {/* Top half with bg-custom-blue */}
        <div className="bg-custom-blue w-full mt-30 flex items-center justify-center">
          {/* Text Section */}
          <div className="w-full max-w-screen-lg mx-auto text-center px-2">
            <h2 className="text-3xl sm:text-4xl text-green-500 font-bold mb-4">
              Get in touch with an Expert
            </h2>
            <p className="text-base text-white sm:text-lg mb-8">
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
              <h3 className="text-xl text-green-500 -mt-16 font-bold mb-4">
                Contact Information
              </h3>
              <p className="text-base text-white sm:text-lg mb-4">
                Do you have any questions? We&apos;re here to help. Reach us through the following ways:
              </p>
              <ul className="list-none">
                <li className="mb-2 text-white">
                  <strong>Email:</strong> georgeholtzhausen80@gmail.com
                </li>
                <li className="mb-2 text-white">
                  <strong>Phone:</strong> <br /> 072 369 5678 <br /> 032 459 3387
                </li>
                <li className="mb-2 text-white">
                  <strong>Address:</strong> 21B Blue Street, Mandeni, Isithebe, 4490
                </li>
              </ul>
            </div>

            {/* Right side: Contact Form */}
            <div className="w-full md:w-1/2">
              <h3 className="text-xl -mt-16 text-green-500 font-bold mb-4">
                Get in Touch
              </h3>
              <ContactUs />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

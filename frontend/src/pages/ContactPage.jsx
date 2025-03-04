import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
        <label htmlFor="user_name" className="block text-sm font-medium text-white">
          Name
        </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
        />
      </div>

      <div>
        <label htmlFor="cellphone_number" className="block text-sm font-medium text-white">
          Phone Number
        </label>
        <input
          type="text"
          id="cellphone_number"
          name="cellphone_number"
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
        />
      </div>

      <div>
        <label htmlFor="user_email" className="block text-sm font-medium text-white">
          Email
        </label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
        ></textarea>
      </div>

      <button
        type="submit"
        className="self-start bg-green-500 text-white py-2 px-6 rounded-md hover:bg-custom-blue transition duration-200"
      >
        Send Message
      </button>
    </form>
  );
};

// Contact page component
const ContactPage = () => {
    return (
      <div className="flex flex-col -mt-1 w-full font-poppins bg-black">
        <ToastContainer /> {/* Enable toast notifications */}
        <div className="flex flex-col w-full">
          {/* Top half with heading and description */}
          <div className="bg-black w-full mt-30 flex items-center justify-center py-8">
            <div className="w-full max-w-screen-lg mx-auto text-center px-2">
              <h1 className="text-4xl text-green-500 font-bold mb-4">
                Get in touch with an Expert
              </h1>
              <p className="text-lg text-white mb-8">
                We always love speaking to customers, potential customers, business analysts, and digital freight enthusiasts.
                To save you some time, check out if any of the links below may help before reaching out to us.
              </p>
            </div>
          </div>
  
          {/* Bottom half with contact information and form */}
          <div className="w-full bg-black py-12">
            <div className="flex flex-col md:flex-row w-full max-w-screen-lg mx-auto px-6">
              {/* Left side: Contact Information */}
              <div className="w-full md:w-1/2 pr-8 mb-6 md:mb-0">
                <h3 className="text-2xl text-green-500 font-bold mb-4">Contact Information</h3>
                <p className="text-lg text-white mb-4">
                  Do you have any questions? We&apos;re here to help. Reach us through the following ways:
                </p>
                <ul className="list-none text-white">
                  <li className="mb-3">
                    <strong>Email:</strong> georgeholtzhausen80@gmail.com
                  </li>
                  <li className="mb-3">
                    <strong>Phone:</strong> <br /> 072 369 5678 <br /> 032 459 3387
                  </li>
                  <li className="mb-3">
                    <strong>Address:</strong> 21B Blue Street, Mandeni, Isithebe, 4490
                  </li>
                </ul>
              </div>
  
              {/* Right side: Contact Form */}
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl text-green-500 font-bold mb-4">Get in Touch</h3>
                <ContactUs />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };  

export default ContactPage;

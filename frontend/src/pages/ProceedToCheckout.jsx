import PaymentMethod from "../components/PaymentMethod"; // Import PaymentMethod

const ProceedToCheckOut = () => {
  return (
    <div className="min-h-screen bg-black mt-12 text-white flex flex-col lg:flex-row p-8">
      {/* Left Side - Delivery Information */}
      <div className="lg:w-1/2 p-6">
        <h1 className="text-4xl font-bold mb-6">Delivery Information</h1>
        <form className="space-y-4">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="p-3 bg-gray-800 text-white rounded-md w-full" />
            <input type="text" placeholder="Last Name" className="p-3 bg-gray-800 text-white rounded-md w-full" />
          </div>

          {/* Email Address */}
          <input type="email" placeholder="Email Address" className="p-3 bg-gray-800 text-white rounded-md w-full" />

          {/* Phone Number */}
          <input type="tel" placeholder="Phone Number" className="p-3 bg-gray-800 text-white rounded-md w-full" />

          {/* Street */}
          <input type="text" placeholder="Street" className="p-3 bg-gray-800 text-white rounded-md w-full" />

          {/* City & Province */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="City" className="p-3 bg-gray-800 text-white rounded-md w-full" />
            <input type="text" placeholder="Province" className="p-3 bg-gray-800 text-white rounded-md w-full" />
          </div>

          {/* Area Code & Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Area Code" className="p-3 bg-gray-800 text-white rounded-md w-full" />
            <input type="text" placeholder="Country" className="p-3 bg-gray-800 text-white rounded-md w-full" />
          </div>
        </form>
      </div>

      {/* Right Side - Payment Method */}
      <div className="lg:w-1/2 p-6 flex justify-center items-center">
        <PaymentMethod />
      </div>
    </div>
  );
};

export default ProceedToCheckOut;

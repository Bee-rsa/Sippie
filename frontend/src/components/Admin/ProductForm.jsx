import { useState } from "react";
import PrintProductForm from "../Form/PrintProductForm";
import SignsProductForm from "../Form/SignsProductForm";
import BrandingProductForm from "../Form/BrandingProductForm";
import PaintProductForm from "../Form/PaintProductForm";

const ProductForm = () => {
  const [activeTab, setActiveTab] = useState("Print Category");

  const tabs = [
    { name: "Print Category", color: "border-pink-500" },
    { name: "Signs Category", color: "border-yellow-500" },
    { name: "Branding Category", color: "border-red-500" },
    { name: "Paint Category", color: "border-lime-500" },
  ];

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-4 sm:p-8 mb-8 max-w-4xl mx-auto">
      {/* Tabs Navigation - Horizontal Scroll on Mobile */}
      <div className="flex overflow-x-auto whitespace-nowrap border-b border-gray-700 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`px-4 sm:px-6 py-2 text-sm sm:text-base text-white ${
              activeTab === tab.name
                ? `${tab.color} border-b-4 font-bold`
                : "hover:bg-gray-700 transition-colors"
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content (Stays the Same) */}
      <div className="p-4 text-white">
        {activeTab === "Print Category" && <PrintProductForm />}
        {activeTab === "Signs Category" && <SignsProductForm />}
        {activeTab === "Branding Category" && <BrandingProductForm />}
        {activeTab === "Paint Category" && <PaintProductForm />}
      </div>
    </div>
  );
};

export default ProductForm;
const AboutUs = () => {
  return (
    <div className="font-poppins p-4">
      {/* Image at the top - spans across the full width of the screen */}
      <div className="w-full h-84 mt-20 mb-6">
        <img src="/2.jpg" alt="About Us" className="w-full h-full object-cover" />
      </div>

      <h1 className="text-5xl mt-10 text-green-500 font-bold text-center mb-4">Your Trusted Trade Print Partner</h1>
      
      {/* Paragraphs with left-aligned text */}
      <p className="text-lg text-white w-1/2 ml-10 text-left">
        Based in NorthCoast with over a decade of experience, we are one of the most trusted names in the printing industry. Our company has built a solid reputation for providing high-quality print solutions to both businesses and individuals. Whether you need small-scale prints like business cards and flyers or large-format prints for advertisements, banners, or posters, we offer a wide range of services to meet the diverse needs of our customers.
      </p>
      <p className="text-lg text-white w-1/2 ml-10 mt-4 text-left">
        Our commitment to quality is reflected in every project we undertake. We use the latest technology and high-quality materials to ensure that our prints are vibrant, sharp, and durable. From full-color brochures to custom packaging, we pride ourselves on delivering precision and excellence in every order. With a focus on providing quick turnaround times and personalized customer service, we ensure that your project is completed to your exact specifications, on time and within budget.
      </p>
      <p className="text-lg text-white w-1/2 ml-10 mt-4 text-left">
        As a business, we understand the importance of delivering a product that not only meets but exceeds expectations. That’s why we work closely with each customer to understand their specific requirements and deliver solutions tailored to their needs. Our mission is to empower businesses, large and small, with high-quality printing products that enhance their brand image and marketing efforts. No matter the size or scope of your project, we are here to help bring your vision to life with unmatched quality and service.
      </p>
    </div>
  );
};

export default AboutUs;

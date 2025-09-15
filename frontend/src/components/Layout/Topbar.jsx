const Topbar = () => {
  return (
    <div className="bg-blue text-white font-semibold">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="hidden md:flex items-center space-x-4">
        </div>
        <div className="text-sm text-center flex-grow">
          <span>We courier Anywhere On Campus!</span>
        </div>
        <div className="text-sm hidden md:block">
          <a href="tel:+2789586190" className="hover:text-gray-300">
            +27 (78) 958 6190
          </a>
        </div>
      </div>
    </div>
  );
};
export default Topbar;

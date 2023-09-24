const Hero = () => {
  return (
    <div>
      <div>
        <img src="./images/hero.png" className="w-full " alt="" />
      </div>
      <div className="bg-rose-100 flex justify-center text-center py-4">
        <div className="md:text-2xl font-semibold">
          <p className="text-red-800">
            I do not own the photos used in my designs.
          </p>
          <p className="text-black">I used those photos from Google/Stock Marketplace. </p>
          <p className="text-black">You must send me the photos to use in your design.</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

const Hero = () => {
  return (
    <div>
      <div>
        <img src="./images/hero.jpg" className="w-full " alt="" />
      </div>
      <div className="bg-rose-100 flex justify-center text-center py-4">
        <div className="md:text-2xl font-semibold">
          <p className="text-red-800">
          We do not own the images used in our designs.
          </p>
          <p className="text-black text-2xl">We used those images from Google/Stock. </p>
          <p className="text-black text-2xl">You must give us the images to use in your design.</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

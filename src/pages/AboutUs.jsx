import heropage from "../assets/heropage.jpg";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 py-12 flex justify-center">
      <div className="w-[1100px] px-4">

        {/* Heading */}
        <div className="text-3xl font-semibold text-center mb-10">
          <h1 className="tracking-wide">About Our Hotel</h1>
          <p className="text-gray-500 text-sm mt-2">
            Experience luxury, comfort, and world-class hospitality
          </p>
        </div>

        {/* About Section */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <img
            className="w-full md:w-[450px] h-[300px] object-cover rounded-xl shadow-md"
            src={heropage}
            alt="Hotel"
          />

          <div className="flex flex-col gap-5 md:w-1/2 text-gray-600 leading-relaxed">
            <p>
              Welcome to our luxury hotel, where comfort meets elegance.
              Nestled in prime locations, we provide world-class hospitality
              designed to give you a memorable and relaxing stay.
            </p>

            <p>
              From beautifully designed rooms to exceptional dining experiences,
              every detail is carefully crafted to ensure your comfort and
              satisfaction. Whether you're traveling for business or leisure,
              we have everything you need.
            </p>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Our Mission
              </h3>
              <p>
                Our mission is to deliver unforgettable experiences by combining
                modern luxury with personalized service. We strive to create a
                home away from home for every guest.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold">Why Choose Us</h2>
          <p className="text-gray-500 text-sm mt-1">
            Discover what makes us different
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          
          <div className="bg-white border rounded-xl p-8 flex flex-col gap-4 hover:shadow-lg transition ">
            <h3 className="font-semibold text-lg">Luxury Rooms</h3>
            <p className="text-gray-600 text-sm">
              Enjoy spacious, beautifully designed rooms with premium amenities,
              ensuring maximum comfort during your stay.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-8 flex flex-col gap-4 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">Prime Locations</h3>
            <p className="text-gray-600 text-sm">
              Our hotels are located in the heart of top destinations, giving you
              easy access to attractions, shopping, and business centers.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-8 flex flex-col gap-4 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">24/7 Guest Support</h3>
            <p className="text-gray-600 text-sm">
              Our dedicated team is available around the clock to assist you and
              make your stay smooth and enjoyable.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AboutUs;
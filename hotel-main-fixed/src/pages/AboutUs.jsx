import heropage from "../assets/heropage.jpg";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide">
            About Our Hotel
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            Experience luxury, comfort, and world-class hospitality
          </p>
        </div>

        {/* About Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-12 sm:mb-16">

          {/* Image */}
          <img
            className="w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[450px] 
                       h-[220px] sm:h-[280px] lg:h-[300px] 
                       object-cover rounded-xl shadow-md"
            src={heropage}
            alt="Hotel"
          />

          {/* Text */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:w-1/2 text-gray-600 leading-relaxed text-sm sm:text-base">
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
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
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
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Why Choose Us
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Discover what makes us different
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white border rounded-xl p-6 sm:p-8 flex flex-col gap-4 hover:shadow-lg transition">
            <h3 className="font-semibold text-base sm:text-lg">
              Luxury Rooms
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Enjoy spacious, beautifully designed rooms with premium amenities,
              ensuring maximum comfort during your stay.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6 sm:p-8 flex flex-col gap-4 hover:shadow-lg transition">
            <h3 className="font-semibold text-base sm:text-lg">
              Prime Locations
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Our hotels are located in the heart of top destinations, giving you
              easy access to attractions, shopping, and business centers.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6 sm:p-8 flex flex-col gap-4 hover:shadow-lg transition">
            <h3 className="font-semibold text-base sm:text-lg">
              24/7 Guest Support
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
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
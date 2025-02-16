import React from "react";

export default function HeroSection() {
  return (
      <section className="relative py-12 sm:py-16 lg:pt-20 lg:pb-36 bg-gray-50">
        {/* Background Image */}
        <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0">
          <img
              className="w-auto h-full"
              src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png"
              alt="Background Pattern"
          />
        </div>

        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-y-8  lg:grid-cols-2 sm:gap-y-20 xl:grid-cols-5">
            {/* Left Content */}
            <div className="text-center xl:col-span-2 lg:text-left md:px-16 lg:px-0">
              <div className="max-w-sm mx-auto sm:max-w-md md:max-w-full">
                {/* Tagline */}
                <div className="flex justify-center lg:justify-start">
                  <a
                      className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 p-1 ps-3 rounded-full transition hover:border-gray-300"
                      href="#"
                  >
                    Seamless Bus Ticket Booking for Everyone
                    <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600">
                    <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </span>
                  </a>
                </div>

                {/* Main Heading */}
                <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl lg:leading-tight font-pj">
                  Plan your trips and book{" "}
                  <span className="relative inline-flex">
                  <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                  <span className="relative"> buses easily </span>
                </span>
                </h1>

                {/* Social Proof */}
                <div className="mt-8 lg:mt-12 lg:flex lg:items-center">
                  <div className="flex justify-center -space-x-4 overflow-hidden lg:justify-start">
                    <img
                        className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                        src="https://d33wubrfki0l68.cloudfront.net/3bfa6da479d6b9188c58f2d9a8d33350290ee2ef/301f1/images/hero/3/avatar-male.png"
                        alt="User 1"
                    />
                    <img
                        className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                        src="https://d33wubrfki0l68.cloudfront.net/b52fa09a115db3a80ceb2d52c275fadbf84cf8fc/7fd8a/images/hero/3/avatar-female-1.png"
                        alt="User 2"
                    />
                    <img
                        className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                        src="https://d33wubrfki0l68.cloudfront.net/8a2efb13f103a5ae2909e244380d73087a9c2fc4/31ed6/images/hero/3/avatar-female-2.png"
                        alt="User 3"
                    />
                  </div>
                  <p className="mt-4 text-lg text-gray-900 lg:mt-0 lg:ml-4 font-pj">
                    Trusted by <span className="font-bold">4600+ users</span> for
                    hassle-free bookings.
                  </p>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="mt-8 sm:flex sm:items-center sm:justify-center lg:justify-start sm:space-x-5 lg:mt-12">
                <a
                    href="/buses"
                    title="Book a Bus"
                    className="inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    role="button"
                >
                  Book a Bus Now
                </a>
                <a
                    href="/register"
                    title="Register"
                    className="inline-flex items-center justify-center w-full px-6 py-3 mt-4 text-lg font-bold text-gray-900 transition-all duration-200 border-2 border-gray-400 sm:w-auto sm:mt-0 rounded-xl hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    role="button"
                >
                  Register
                </a>

              </div>
            </div>

            {/* Image Section */}
            <div className="xl:col-span-3 xl:w-[500px]  ml-32  xl:h-[500px] overflow-hidden ">
              <img
                  className="w-full mx-14s scale-80 "
                  src="hero.jpeg"
                  alt="Bus Booking Illustration"
              />
            </div>
          </div>
        </div>
      </section>
  );
}
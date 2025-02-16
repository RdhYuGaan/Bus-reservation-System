import React from 'react'

export default function StatusSection() {
    return (

        <section className="py-10 bg-gray-100 sm:py-16 lg:py-24">
            <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Numbers tell our story</h2>
                    <p className="mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">Delivering happiness and building trust with every ride . Driving excellence and convenience in bus travel for over a decade and </p>
                </div>

                <div className="grid grid-cols-1 gap-8 mt-10 text-center lg:mt-24 sm:gap-x-8 md:grid-cols-3">
                    <div>
                        <h3 className="font-bold text-7xl">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600"> 10+ </span>
                        </h3>
                        <p className="mt-4 text-xl font-medium text-gray-900">Years of Service</p>
                        <p className="text-base mt-0.5 text-gray-500">Driving excellence and convenience</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-7xl">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600"> 50k+ </span>
                        </h3>
                        <p className="mt-4 text-xl font-medium text-gray-900">Tickets Booked</p>
                        <p className="text-base mt-0.5 text-gray-500">Making seamless travel</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-7xl">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600"> 370+ </span>
                        </h3>
                        <p className="mt-4 text-xl font-medium text-gray-900">Routes Covered</p>
                        <p className="text-base mt-0.5 text-gray-500">Connecting cities and communities</p>
                    </div>
                </div>
            </div>
        </section>


    )
}
import React from 'react'

export default function IntegrationSection() {
    return (

        <section className="py-10 bg-white sm:py-16 lg:py-24">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-24">
                    <div>
                        <img className="w-full max-w-md mx-auto" src="book.jpeg" alt="" />
                    </div>

                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-3xl lg:text-5xl">Grow your travel experience with booking.</h2>
                        <p className="mt-6 text-base text-gray-600">Plan your journey effortlessly with our smart bus reservation system. Find routes, compare options, and book seats in just a few clicks. Experience convenience like never before</p>

                        <a href="/login" title="" className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-200 bg-gray-900 rounded-md mt-9 hover:bg-gray-900 focus:bg-gray-700" role="button"> Book Now </a>
                    </div>
                </div>
            </div>
        </section>

    )
}
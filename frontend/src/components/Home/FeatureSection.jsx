import React from "react";

const FeatureSection = () => {
    return (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 items-center lg:py-14 mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-12">
                {/* Feature: Easy Booking */}
                <div>
                    <div
                        className="relative flex justify-center items-center text-center  size-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-neutral-900">
                        <svg
                            className="shrink-0 size-6 text-blue-600 dark:text-blue-500"
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
                            <path d="M8 6h8M8 12h8m-8 6h8"/>
                            <circle cx="12" cy="12" r="10"/>
                        </svg>
                    </div>
                    <div className="mt-5">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Easy Booking
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-neutral-400">
                            Book bus tickets easily with our user-friendly interface.
                        </p>
                    </div>
                </div>

                {/* Feature: Real-Time Tracking */}
                <div>
                    <div
                        className="relative flex justify-center items-center size-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-neutral-900">
                        <svg
                            className="shrink-0 size-6 text-blue-600 dark:text-blue-500"
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
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 2v10l4 4"/>
                        </svg>
                    </div>
                    <div className="mt-5">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Real-Time Tracking
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-neutral-400">
                            Track your bus in real-time for accurate timings.
                        </p>
                    </div>
                </div>

                {/* Feature: Multiple Payment Options */}
                <div>
                    <div
                        className="relative flex justify-center items-center size-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-neutral-900">
                        <svg
                            className="shrink-0 size-6 text-blue-600 dark:text-blue-500"
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
                            <rect x="2" y="5" width="20" height="14" rx="2"/>
                            <path d="M2 10h20M6 15h.01"/>
                        </svg>
                    </div>
                    <div className="mt-5">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Flexible Payments
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-neutral-400">
                            Multiple payment options for hassle-free booking.
                        </p>
                    </div>
                </div>

                {/* Feature: 24/7 Support */}
                <div>
                    <div
                        className="relative flex justify-center items-center size-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-neutral-900">
                        <svg
                            className="shrink-0 size-6 text-blue-600 dark:text-blue-500"
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
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 8v4l2 2"/>
                        </svg>
                    </div>
                    <div className="mt-5">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            24/7 Support
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-neutral-400">
                            Our team is here to assist you anytime, anywhere.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureSection;
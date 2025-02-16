import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { useLoader } from "../../context/LoaderContext";

const BusList = () => {
    const [buses, setBuses] = useState([]); // Original bus data from API
    const [filteredBuses, setFilteredBuses] = useState([]); // Filtered buses for display
    const [searchTerm, setSearchTerm] = useState(""); // Search input value
    const { startLoading, stopLoading } = useLoader();


    // Fetch buses from API
    useEffect(() => {

        api.get("/buses").then((res) => {
            setBuses(res.data);
            setFilteredBuses(res.data); // Initialize with full data
        });

    }, []);

    console.log(buses)
    // Handle search input change
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        // Filter buses based on the search term
        const filtered = buses.filter((bus) =>
            bus.route.toLowerCase().includes(term) ||
            bus.number?.toLowerCase().includes(term) || // Filter by bus number
            bus.type?.toLowerCase().includes(term) // Optionally filter by type if it's in the data
        );
        setFilteredBuses(filtered);
        console.log(filteredBuses)
    };

    return (
        <div>

            <div className="p-8 bg-gray-100 min-h-screen ">

                <div className="max-w-7xl mx-auto ">
                    {/* Search and Filter Section */}
                    <div className="flex items-center mb-8">
                        <input
                            type="text"
                            placeholder="Search by Route, Bus Type, or Number..."
                            className="w-full max-w-md px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-300"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        {/* <button
                            className="ml-4 px-4 py-3 text-sm font-semibold  text-white bg-gray-900 rounded-xl hover:bg-gray-700"
                            onClick={() => setFilteredBuses(buses)} // Reset search results
                        >
                            Reset
                        </button> */}
                    </div>

                    {/* Bus Cards */}


                    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto ">

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                            {filteredBuses.length > 0 ? (
                                filteredBuses.map((bus) => (

                                    <div
                                        className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
                                        key={bus._id}>
                                        <div
                                            className="h-52 flex flex-col justify-center items-center bg-gray-600 rounded-t-xl overflow-hidden">


                                            <img src={bus.image} alt="image" />

                                        </div>
                                        <div className="p-4 md:p-6">
                                            <span className="block mb-1 text-xs font-semibold uppercase text-gray-900  dark:text-blue-500">

                                                {bus.number}
                                            </span>
                                            <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
                                                {bus.route}

                                            </h3>
                                            <p className="mt-3 text-gray-500 dark:text-neutral-500">
                                                Seats: {bus.seats}

                                            </p>
                                            <p className="mt-3 text-gray-500 dark:text-neutral-500">

                                                Departure: {bus.departureTime}
                                            </p>
                                            <p className="mt-3 text-gray-500 dark:text-neutral-500">

                                                Arrival: {bus.arrivalTime}
                                            </p>
                                            <p className="mt-3 text-gray-500 dark:text-neutral-500">

                                                Date: {bus.date}
                                            </p>
                                        </div>
                                        <div
                                            className="mt-auto flex border-t border-gray-200 divide-x text-base font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-700">

                                            <Link
                                                to={`/reservation/${bus._id}`}
                                                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                            >
                                                Reserve Seats
                                            </Link>

                                            {/* <a className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
         View API
       </a> */}
                                        </div>
                                    </div>

                                ))
                            ) : (
                                <p className="text-gray-500 text-center col-span-3">
                                    No buses match your search criteria.
                                </p>
                            )}


                        </div>

                    </div>

                </div>


            </div>
        </div>
    );
};

export default BusList;

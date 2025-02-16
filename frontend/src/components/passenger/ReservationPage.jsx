import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaChair } from "react-icons/fa"; // Seat icon
import { useModal } from "../../context/ModalContext";
import api from "../../api/api";
import { useLoader } from "../../context/LoaderContext";


const ReservationPage = () => {
  const { id } = useParams(); // Get the bus ID from the route
  const [bus, setBus] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
   const { openSuccess, openAlert, openWarning } = useModal();
   const { startLoading, stopLoading } = useLoader();
 

  // Fetch bus details and reservations
  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        startLoading();
        const busResponse = await api.get(`/buses/${id}`);
        setBus(busResponse.data);
      } catch (err) {
        openAlert("Failed to fetch bus details:", err);
        // console.error("Failed to fetch bus details:", err);
      }
      finally{


        stopLoading();

      }
    };

    const fetchReservations = async () => {
      try {
        startLoading();
        
        const reservationResponse = await api.get(`/reservations/${id}`);
        setReservations(reservationResponse.data);
      } catch (err) {
        openAlert("Failed to fetch reservations:", err);
        // console.error("Failed to fetch reservations:", err);
      }
      finally{
        stopLoading();
      }
    };

    fetchBusDetails();
    fetchReservations();
  }, [id]);

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleReservation = async () => {
    if (selectedSeats.length === 0) {
      // alert("Please select at least one seat.");
      openWarning("Please select at least one seat.");
      return;
    }

    navigate("/passenger-info", {
      state: { bus, selectedSeats }, // Pass data to the next page
    });

    setLoading(true);
   
  };
  if (!bus) return <p>Loading bus details...</p>;

  const isSeatReserved = (seat) =>
    reservations.some((r) => r.seatNumber === seat);

  // Define the 3+2 seat layout
  const rows = 8; // Number of rows
  const seatsPerRow = [3, 2]; // Define the seat configuration (3+2)
  const seatLayout = Array.from({ length: rows }).map((_, rowIndex) => {
    const row = [];
    let seatNumber = rowIndex * 5 + 1; // Start seat numbering
    seatsPerRow.forEach((count, index) => {
      for (let i = 0; i < count; i++) {
        row.push(seatNumber++);
      }
      if (index === 0) row.push(null); // Add an empty space for the aisle
    });
    return row;
  });

  return (
    // <div className="p-8 bg-gray-100 min-h-screen">
    //   <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
    //     {/* Bus Information */}
    //     <div className="bg-white shadow-md rounded-lg p-6">
    //       <img
    //         src={bus.image || "https://via.placeholder.com/500x300"}
    //         alt={bus.route}
    //         className="w-full h-56 object-cover rounded-md mb-4"
    //       />
    //       <h1 className="text-2xl font-bold">{bus.route}</h1>
    //       <p className="text-gray-600 text-sm mb-2">
    //         <strong>Bus Number:</strong> {bus.number}
    //       </p>
    //       <p className="text-gray-600 text-sm mb-2">
    //         <strong>Total Seats:</strong> {bus.seats}
    //       </p>
    //       <p className="text-gray-600 text-sm mb-2">
    //         <strong>Seats Available:</strong> {bus.seats - reservations.length}
    //       </p>
    //     </div>

    //     {/* Seat Selection */}
    //     <div className="bg-white shadow-md rounded-lg p-6">
    //       <h2 className="text-lg font-bold mb-4">Select Your Seat</h2>

    //       {/* Bus Seat Layout */}
    //       <div className="flex flex-col items-center">
    //         {seatLayout.map((row, rowIndex) => (
    //           <div key={rowIndex} className="flex items-center mb-4">
    //             {row.map((seat, index) =>
    //               seat ? (
    //                 <div
    //                   key={seat}
    //                   className={`h-12 w-12 flex items-center justify-center rounded cursor-pointer border shadow-md ${
    //                     isSeatReserved(seat)
    //                       ? "bg-red-500 text-white cursor-not-allowed"
    //                       : selectedSeats.includes(seat)
    //                       ? "bg-blue-500 text-white"
    //                       : "bg-gray-200"
    //                   }`}
    //                   onClick={() => !isSeatReserved(seat) && handleSeatClick(seat)}
    //                 >
    //                   <FaChair />
    //                   <span className="text-xs">{seat}</span>
    //                 </div>
    //               ) : (
    //                 <div key={index} className="h-12 w-12"></div> // Empty space for aisle
    //               )
    //             )}
    //           </div>
    //         ))}
    //       </div>

    //       {/* Legend */}
    //       <div className="mt-6 flex justify-between text-sm">
    //         <div className="flex items-center gap-2">
    //           <div className="h-4 w-4 bg-gray-200 border rounded"></div>
    //           <span>Available</span>
    //         </div>
    //         <div className="flex items-center gap-2">
    //           <div className="h-4 w-4 bg-red-500 border rounded"></div>
    //           <span>Booked</span>
    //         </div>
    //         <div className="flex items-center gap-2">
    //           <div className="h-4 w-4 bg-blue-500 border rounded"></div>
    //           <span>Selected</span>
    //         </div>
    //       </div>

    //       {/* Selected Seats */}
    //       {selectedSeats.length > 0 && (
    //         <div className="mt-4">
    //           <h3 className="text-lg font-bold">Selected Seats:</h3>
    //           <p>{selectedSeats.join(", ")}</p>
    //         </div>
    //       )}

        
    //     </div>
    //   </div>



      
    // </div>

    <div className="flex flex-col lg:flex-row lg:items-stretch lg:min-h-[800px] bg-gray-100">
       <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0">
        <img className="w-auto h-full" src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png" alt="" />
    </div>
    <div className="relative flex items-center justify-center w-full lg:order-2 lg:w-7/12">
        

       <div className="relative xl:-mt-20 px-4 pt-24 pb-16 text-center sm:px-6 md:px-24 2xl:px-32 lg:py-24 lg:text-left">
  {/* Selected Seats */}
  {selectedSeats.length > 0 && (
    // <div className="mb-6 bg-blue-100 p-4 rounded-lg border border-blue-200 text-center shadow-md">
    //   <h3 className="text-lg font-bold text-blue-600">Selected Seats</h3>
    //   <p className="text-blue-800 font-medium">{selectedSeats.join(", ")}</p>
    // </div>

<a className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800" href="#">
<div className="p-4 md:p-5">
  <div className="flex gap-x-5">
    {/* <svg className="mt-1 shrink-0 size-5 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg> */}
  
  <FaChair className="mt-1 shrink-0 size-5 text-gray-800 dark:text-neutral-200"/>

    <div className="grow">
      <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
      Selected Seats
      </h3>
      <p className="text-sm text-gray-500 dark:text-neutral-500">
      {selectedSeats.join(", ")}
      </p>
    </div>
  </div>
</div>
</a>
  )}

  {/* Bus Seat Layout */}
  <div className="flex flex-col items-center rotate-90 space-y-2">
    {seatLayout.map((row, rowIndex) => (
      <div key={rowIndex} className="flex items-center space-x-2">
        {row.map((seat, index) =>
          seat ? (
            <div
              key={seat}
              className={`h-12 w-12 flex items-center justify-center rounded-lg cursor-pointer border shadow-md transition-transform transform hover:scale-105 ${
                isSeatReserved(seat)
                  ? "bg-red-500 text-white cursor-not-allowed"
                  : selectedSeats.includes(seat)
                  ? "bg-gray-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => !isSeatReserved(seat) && handleSeatClick(seat)}
            >
              <FaChair />
              <span className="text-xs -rotate-90 font-medium">{seat}</span>
            </div>
          ) : (
            <div key={index} className="h-12 w-12"></div> // Empty space for aisle
          )
        )}
      </div>
    ))}
  </div>

  {/* Legend */}
  <div className="mt-4 flex justify-center space-x-8 text-sm">
    <div className="flex items-center gap-2">
      <div className="h-4 w-4 bg-gray-200 border rounded"></div>
      <span>Available</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="h-4 w-4 bg-red-500 border rounded"></div>
      <span>Booked</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="h-4 w-4 bg-gray-500 border rounded"></div>
      <span>Selected</span>
    </div>
  </div>

  {/* Reservation Button */}
  <button
    className={`w-full py-3 px-6 rounded-lg mt-8 text-lg font-bold shadow-lg transition-all transform ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "text-base font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-700"
    }`}
    onClick={handleReservation}
    disabled={loading}
  >
    {loading ? "Processing..." : "Reserve Seats"}
  </button>
</div>


        
    </div>

    <div className="relative w-full overflow-hidden lg:order-1 h-96 lg:h-auto lg:w-5/12">
        <div className="absolute inset-0">
            <img className="object-cover w-full h-full scale-150" src=  { bus.image}/>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        <div className="absolute bottom-40 left-0">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-center">
                    <svg className="w-10 h-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                    </svg>
                    <h2 className="font-bold text-white text-7xl ml-2.5">{bus.route}</h2>
                    <h2 className="font-bold text-white text-4xl ml-2.5">{bus.number}</h2>
                   

                </div>
                <div>
                <h2 className="max-w-xs mt-1.5 text-xl text-white">Available Seats :{bus.seats - reservations.length}</h2>
                </div>
                <p className=" max-w-xs mt-1.5 text-xl text-white">Seats : {bus.seats}</p>
                
            </div>
        </div>
    </div>
</div>
  );
};

export default ReservationPage;

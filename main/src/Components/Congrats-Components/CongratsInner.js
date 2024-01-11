import React from "react";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const CongratsInner = () => {
  const history = useHistory();
  const { id } = useParams();
  const [payment, setPayment] = React.useState(null);
  localStorage.removeItem("bookingUserData");
  localStorage.removeItem("roomConfig");

  useEffect(() => {
    setTimeout(() => {
      fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/anonymous/payment/${id}`
      )
        .then((res) => res.json())
        .then((data) => setPayment(data.message.payment));
    }, 4000);
  }, [id]);

  useEffect(() => {
    console.log(payment);
  }, [payment]);

  return (
    <div className=" w-full flex justify-center pt-10 md:pt-20 lg:pt-32 p-8 ">
      {payment && (
        <div className="w-full md:w-1/2 flex  flex-col items-center gap-4 md:gap-8 p-4 rounded-lg shadow-2xl">
          {payment?.status === "SUCCESS" ? (
            <>
              <img
                src="/images/Checkcircle.svg"
                alt="Success"
                className="h-12 w-12"
              />
              <div className="text-md md:text-3xl">Booking Successfull!</div>
              <div className=" text-sm text-center md:text-md text-gray-500">
                Please check your email for booking information and receipts.
              </div>
              <div
                className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg"
                onClick={() => history.push("/")}
              >
                Go to Home
              </div>
            </>
          ) : (
            <>
              <img
                src="/images/Cancelled.svg"
                alt="Failure"
                className="h-12 w-12"
              />
              <div className="text-md md:text-3xl">Booking Unsuccessfull!</div>
              <div className="text-sm text-center md:text-md text-gray-500">
                Please check your email for more information.
              </div>
              <div
                className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg"
                onClick={() => history.push("/")}
              >
                Go to Home
              </div>
            </>
          )}
        </div>
      )}
      {!payment && (
        <div className="text-primary text-4xl">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* <div className="b-box1">
        <p className="confirm-title">
          <lord-icon
            src="https://cdn.lordicon.com/lupuorrc.json"
            trigger="loop"
            style={{ width: "250px", height: "250px" }}
          ></lord-icon>{" "}
          <i className="fas fa-long-arrow-alt-left"></i> Confirm your booking
        </p>

        <form className="form">
          <p className="guest-title"> Guest Information</p>

          <div className="form-grid">
            <div className="b1">
              <p>
                Name <sup>*</sup>{" "}
              </p>{" "}
              <div></div>
            </div>
            <div className="b2">
              <p>
                Gender <sup>*</sup>
              </p>{" "}
              <div></div>
            </div>
            <div className="b3">
              <p>
                Email <sup>*</sup>
              </p>{" "}
              <div></div>
            </div>
            <div className="b4">
              <p>
                Number <sup>*</sup>
              </p>{" "}
              <div></div>
            </div>
            <div className="b5">
              <p>
                Address <sup>*</sup>
              </p>{" "}
              <div></div>
            </div>
          </div>

          <p className="b6">
            Not Going Solo ? <span>Add another person</span>{" "}
          </p>
        </form>
      </div>

      <div className="b-box2">
        <div className="booking-summary-box">
          <p className="order-title">Summary</p>

          <p className="dynamic-date-box">
            Starting from {new Date(localStorage.getItem("checkIn")).getDate()}
            th{" "}
            {monthNames[new Date(localStorage.getItem("checkIn")).getMonth()]}
          </p>

          <div className="dynamic-room-details">
            {selectedRooms.length === 0 ? (
              <p>No Rooms Selected</p>
            ) : (
              selectedRooms.map((ele, index) => {
                return (
                  <div className="dynamic-room-pricing" key={index}>
                    <p className="dynamic-room-type">
                      {" "}
                      {ele.roomName} <span> X {ele.qty}</span>
                    </p>
                    <p className="dynamic-room-tprice">
                      {" "}
                      <i className="fas fa-rupee-sign"></i>{" "}
                      {ele.roomPrice * ele.qty}
                    </p>
                  </div>
                );
              })
            )}

            <div className="dynamic-subtotal">
              <p className="bordered"></p>
              <div className="tax">
                <p className="stable">Tax</p>{" "}
               
              </div>

              <div className="payable">
                <p className="stable">Total payable</p>{" "}
                <p className="dynamic">
                  <i className="fas fa-rupee-sign"></i>{" "}
                  {+selectedRooms
                    .reduce((prev, curr) => prev + curr.qty * curr.roomPrice, 0)
                    .toFixed(2) +
                    +(
                      (selectedRooms.reduce(
                        (prev, curr) => prev + curr.qty * curr.roomPrice,
                        0
                      ) *
                        18) /
                      (100).toFixed(2)
                    )}{" "}
                </p>
              </div>

              <div className="pay-btn" onClick={(e) => bookRooms(e)}>
                Pay & Reserve
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CongratsInner;

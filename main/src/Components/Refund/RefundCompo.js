import React from "react";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const RefundCompo = () => {
  const history = useHistory();
  const { id } = useParams();
  const [payment, setPayment] = React.useState();
  localStorage.removeItem("bookingUserData");
  localStorage.removeItem("roomConfig");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/anonymous/payment/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPayment(data.message.payment);
      });
  }, [id]);
  useEffect(() => {
    if (
      payment &&
      (payment?.status === "REFUNDED" || payment?.status === "SUCCESS")
    ) {
      const roomBook = payment?.roomBookings[0];
      if (
        roomBook &&
        (roomBook.status === "Failed" || roomBook.status === "FAILED")
      ) {
      } else {
        console.log(payment?.status);
        // history.push(`/payment/${id}`)
      }
    } else {
      console.log(payment);
      // history.push(`/payment/${id}`)
    }
  }, [payment]);

  const handleRefund = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/anonymous/payment/refund `,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payment: payment,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success) {
        alert("Refund Initiated");
        // history.push("/")
      } else {
        alert("Refund Failed");
      }
    } catch (error) {}
  };

  const checkRefund = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/anonymous/payment/refund/${payment._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success) {
        if (data.message.refund.status === "processed") {
          alert("refund processed! it will reflect in your bank in 3-4 days");
        } else {
          console.log("yoi");
          alert("Refund Initiated");
        }
        history.push("/");
      } else {
        alert("Refund Failed");
      }
    } catch (error) {}
  };
  return (
    <div className=" w-full flex justify-center pt-10 md:pt-20 lg:pt-32 p-8 ">
      {payment && payment?.status && (
        <div className="w-full md:w-1/2 flex  flex-col items-center gap-4 md:gap-8 p-4 rounded-lg shadow-2xl">
          {payment?.status === "SUCCESS" || payment?.status === "REFUNDED" ? (
            <>
              <img
                src="/images/Cancelled.svg"
                alt="Failed"
                className="h-12 w-12"
              />
              <div className="text-md md:text-3xl">Booking Unsuccessfull!</div>
              <div className=" text-sm text-center md:text-md text-gray-500">
                Payment was successful but booking was not done. Please contact
                us for more information. If you have been charged, you will be
                refunded. Click in refund button to get refund or contact us.
              </div>
              <div className="flex gap-2">
                <div
                  className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg"
                  onClick={() =>
                    payment?.status === "REFUNDED"
                      ? checkRefund()
                      : handleRefund()
                  }
                >
                  Refund
                </div>
                <div
                  className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg"
                  onClick={() => history.push("/")}
                >
                  Go to Home
                </div>
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
      {!payment && <div className="text-primary text-4xl">Loading...</div>}
    </div>
  );
};

export default RefundCompo;

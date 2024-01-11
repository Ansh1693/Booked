import React from "react";

const propertyPolicies = [
  "Guests are required to pay a 21% advance at the time of booking itself. The entire balance needs to be cleared upon arrival at the property during check-in.",
  "Our standard check-in time is 12 PM and the standard check-out time is 10 AM. Early check-in and late check-out requests are subject to availability, and may also attract an additional fee at the property's discretion.",
  "We strictly DO NOT allow a group of more than 8 people. In case of a group of 4 or more, you might be purposefully allotted different dorm rooms. Further, if the group behaviour is deemed unfit at the property, the Zostel Property Manager, upon subjective evaluation, retains the full right to take required action which may also result in an on-spot cancellation without refunds.",
  "Children below 18 years of age are not permitted entry/stay at any of our hostels, with or without guardians. We do not recommend families.",
  "We only accept a government ID as valid identification proof. No local IDs shall be accepted at the time of check-in.",
  "Guests are not permitted to bring outsiders inside the hostel campus.",
  "We believe in self-help and do not provide luggage assistance or room services.",
  "Drugs and any substance abuse is strictly banned inside and around the property.",
  "Alcohol consumption is strictly prohibited in and around the property premises.",
  "Right to admission reserved.",
];

const cancellationPolicy = [
  "21% advance payment is non-refundable at all times, as stated above.",
  "If you have paid any amount over this 21%, it stands applicable for a credit only if the cancellation is informed 7 days or more in advance. You will be able to avail the credited amount for any future booking at any of our properties.",
  "If informed within 7 days of the standard check-in time (12 pm), the amount shall be adjusted against the cancellation fee.",
];

const contactInformation = [
  "For any other queries, please reach out to us at reservations@zostel.com.",
];

const Policies = () => {
  const [policies, setPolicies] = React.useState(true);
  const [cancel, setCancel] = React.useState(false);
  const [contact, setContact] = React.useState(false);

  // {cancellationPolicy.map((ele) => {
  //   return <p>- {ele}</p>;
  // })}
  return (
    <div className="flex flex-col gap-4 w-full min-w-min text-sm">
      <div
        className={`sm:mb-4 bg-white rounded-t-lg ${
          policies ? "rounded-b-lg" : "rounded-b-lg"
        }`}
      >
        <div
          className={`p-4 border bg-light border-gray-200 rounded-t-lg ${
            policies ? "rounded-b-none" : "rounded-b-lg"
          } sm:text-lg font-semibold text-text flex items-center justify-between`}
        >
          Property Policy
          <button
            className={`text-text leading-none focus:outline-none ${
              policies ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => setPolicies(!policies)}
          >
            <i className="material-icons text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </i>
          </button>
        </div>
        {policies && (
          <div className="rounded-b-lg border-gray-200 border border-t-0 p-2  sm:p-4 whitespace-pre-line text-text">
            <div className="whitespace-pre-line flex flex-col gap-2">
              {propertyPolicies.map((ele) => {
                return <p>- {ele}</p>;
              })}
            </div>
          </div>
        )}
      </div>
      <div className="sm:mb-4 bg-white rounded-lg">
        <div
          className={`p-4 border bg-light border-gray-200 rounded-t-lg ${
            cancel ? "rounded-b-none" : "rounded-b-lg"
          } sm:text-lg font-semibold text-text flex items-center justify-between`}
        >
          Cancellation Policy
          <button
            className={`text-text leading-none focus:outline-none ${
              cancel ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => setCancel(!cancel)}
          >
            <i className="material-icons text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </i>
          </button>
        </div>
        {cancel && (
          <div className="rounded-b-lg border-gray-200 border border-t-0 p-2 sm:p-4 whitespace-pre-line text-text">
            <div className="whitespace-pre-line flex flex-col gap-2">
              {cancellationPolicy.map((ele) => {
                return <p>- {ele}</p>;
              })}
            </div>
          </div>
        )}
      </div>

      <div className="sm:mb-4 bg-white rounded-lg">
        <div
          className={`p-4 border bg-light border-gray-200 rounded-t-lg ${
            contact ? "rounded-b-none" : "rounded-b-lg"
          } sm:text-lg font-semibold text-text flex items-center justify-between`}
        >
          Contact Information
          <button
            className={`text-text leading-none focus:outline-none ${
              contact ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => setContact(!contact)}
          >
            <i className="material-icons text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </i>
          </button>
        </div>
        {contact && (
          <div className="rounded-b-lg border-gray-200 border border-t-0 p-2 sm:p-4 whitespace-pre-line text-text">
            <div className="whitespace-pre-line flex flex-col gap-2">
              {contactInformation.map((ele) => {
                return <p>- {ele}</p>;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Policies;

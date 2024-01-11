// @ts-nocheck
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMatch, useNavigate } from "react-router-dom";
import TextInput from "../../common/inputs/TextInput";
import TextArea from "../../common/inputs/TextArea";
import PrimaryButton from "../../common/Buttons/PrimaryButton";
import FileInput from "../../common/inputs/FileInput";
import Maps from "../Property/ShowOne/Maps";

export default function AddOneHotel({ open, setOpen, getHotels }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState({
    lat: 18.9885983229874,
    lang: 72.82971196711472,
  });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    alert("please login!! access token not found");
    navigate("/login");
  }

  async function onSubmit(data) {
    setIsSubmitting(true);
    const amenities = data.amenities.split(",");
    data.amenities = amenities;
    data.images = images;
    data.location = location;
    console.log(data);
    // return ;
    try {
      const response = await fetch(
        `http://localhost:5001/api/v1/admin/hotels`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": accessToken,
          },
          body: JSON.stringify({ ...data }),
        }
      );
      const data2 = await response.json();
      console.log(data2);
      if (data2.success === true) {
        alert("Hotel Addd Successfully");
        getHotels();
        setOpen(false);
      } else {
        alert(data2.message);
      }

      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 left-[45px] md:left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="hidden md:block text-black rounded-full border h-8 w-8 border-black"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>X
                          {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                        </button>
                        <button
                          className="md:hidden flex items-center"
                          onClick={() => setOpen(false)}
                        >
                          <i className="fa fa-angle-left text-[24px]"></i>
                          <span className="text-[17px] pt-0.5">Back</span>
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-[20px] pt-0 font-[600] text-gray-900">
                          Add Hotel
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-1 flex-1 px-4 sm:px-6">
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="flex flex-col gap-y-5"
                        >
                          <div className="mt-[20px]"></div>
                          <FileInput files={images} setFiles={setImages} />
                          <div className="mt-[20px]"></div>
                          <TextInput
                            register={register}
                            type="text"
                            id={"hotelId"}
                            label="HotelId"
                            // mb="3"
                            required
                          />
                          <TextInput
                            register={register}
                            type="text"
                            id={"hotelName"}
                            label="Hotel Name"
                            mb="3"
                            required
                          />
                          <div className="-mt-[37px]"></div>
                          <TextArea
                            register={register}
                            type="text"
                            id={"description"}
                            label="Hotel Description"
                            required
                          />
                          <div className="-mt-[50px]"></div>
                          <TextArea
                            register={register}
                            type="text"
                            id={"amenities"}
                            label="Amenities"
                            required
                          />
                          <div className="-mt-[25px]"></div>
                          <TextInput
                            register={register}
                            type="text"
                            id={"city"}
                            label="City"
                            // mb="3"
                            required
                          />
                          <TextInput
                            register={register}
                            type="text"
                            id={"hotelUrl"}
                            label="Hotel Url"
                            // mb="3"
                            required
                          />
                          <TextInput
                            register={register}
                            type="email"
                            id={"hotelEmail"}
                            label="Email"
                            // mb="3"
                            required
                          />
                          <TextInput
                            register={register}
                            type="text"
                            id={"address"}
                            label="Address"
                            mb="3"
                            required
                          />
                          <div className="-mt-[35px]"></div>
                          <TextArea
                            register={register}
                            type="text"
                            id={"policies.covid"}
                            label="Covid Policies"
                            mb="3"
                            required
                          />
                          <div className="-mt-[50px]"></div>
                          <TextArea
                            register={register}
                            type="text"
                            id={"policies.property"}
                            label="Property Policy"
                            mb="3"
                            required
                          />
                          <div className="-mt-[50px]"></div>
                          <TextArea
                            register={register}
                            type="text"
                            id={"policies.cancellation"}
                            label="Cancellation Policy"
                            mb="3"
                            required
                          />
                          {/* <div className="-mt-[50px]"></div>
                          <TextArea
                            register={register}
                            type="text"
                            id={"images"}
                            label="Enter Images link seperated by comma"
                            mb="3"
                            required
                          /> */}
                          <Maps
                            edit={true}
                            singleHotel={{}}
                            location={location}
                            setLocation={setLocation}
                            height="400px"
                          />
                          <div className="mt-[20px]"></div>

                          <PrimaryButton
                            text={"Add Hotel"}
                            type="submit"
                            capital={true}
                          />
                        </form>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

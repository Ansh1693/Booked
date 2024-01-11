// @ts-nocheck
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMatch, useNavigate } from "react-router-dom";
import TextInput from "../../../common/inputs/TextInput";
import TextArea from "../../../common/inputs/TextArea";
import PrimaryButton from "../../../common/Buttons/PrimaryButton";
import FileInput from "../../../common/inputs/FileInput";
import { fetchHotelData } from "../MainPage";
import { HotelContext } from "../../../Context/AllContexts";

export default function AddOneRoom({
  open,
  setOpen,
  edit,
  setEdit,
  singleRoom,
  hotelId,
  user,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const { hotelData, setHotelData } = React.useContext(HotelContext);
  // console.log(singleRoom);
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

  useEffect(() => {
    if (!open) {
      setImages([]);
      reset({});
    } else if (open && !edit) {
      reset({ hotelId: hotelId });
    }
  }, [open]);
  useEffect(() => {
    if (!edit) reset({ hotelId: hotelId });
    else {
      console.log(singleRoom);
      setImages(singleRoom?.images);
      reset({
        ...singleRoom,
        amenities: singleRoom?.amenities.join(","),
        images: singleRoom?.images.join(","),
      });
    }
  }, [singleRoom]);

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    alert("please login!! access token not found");
    navigate("/login");
  }

  async function addRoom(data) {
    setIsSubmitting(true);
    const amenities = data.amenities.split(",");
    data.amenities = amenities;
    data.images = images;
    const roomNumbers = data.roomNumbers.split(",");
    data.roomNumbers = roomNumbers;
    console.log(data);
    // return ;
    try {
      const response = await fetch(`http://localhost:5001/api/v1/admin/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        },
        body: JSON.stringify({ ...data }),
      });
      const data2 = await response.json();
      console.log(data2, "data");
      if (data2.success === true) {
        alert("Room Addd Successfully");
        fetchHotelData(accessToken, hotelId, user.role).then((data) => {
          setHotelData(data);
        });
        setOpen(false);
      } else {
        alert(data2.message);
      }

      setIsSubmitting(false);
    } catch (error) {
      alert(error);
      console.log(error);
      setIsSubmitting(false);
    }
    setIsSubmitting(false);
  }

  async function editRoom(data) {
    setIsSubmitting(true);
    let updateData = { ...singleRoom };
    Object.assign(updateData, {
      ...data,
      images: images,
      amenities: data.amenities.split(","),
      roomNumbers: data.roomNumbers.split(","),
      extraBedPrice: parseInt(data.extraBedPrice),
    });

    try {
      console.log(updateData, "updateData");
      const role = user.role.toLowerCase();
      const response = await fetch(
        `http://localhost:5001/api/v1/${role}/rooms/${singleRoom?.roomId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": accessToken,
          },
          body: JSON.stringify({ ...updateData }),
        }
      );
      const data = await response.json();
      // console.log(data);
      if (data.success === true) {
        fetchHotelData(accessToken, hotelId, user.role).then((data) => {
          setHotelData(data);
        });
        alert("Room Updated Successfully");
        setOpen(false);
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
                          className=" hidden md:block text-black rounded-full border h-8 w-8 border-black"
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
                          {edit ? "Update" : "Add"} Room
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-1 flex-1 px-4 sm:px-6">
                        <form
                          onSubmit={
                            edit
                              ? handleSubmit(editRoom)
                              : handleSubmit(addRoom)
                          }
                          className="flex flex-col gap-y-2"
                        >
                          <div className="mt-[20px]"></div>
                          <FileInput files={images} setFiles={setImages} />
                          <div className="mt-[20px]"></div>
                          <TextInput
                            register={register}
                            type="text"
                            id={"roomId"}
                            label="Room Id"
                            // mb="3"
                            required
                            disabled={edit}
                          />
                          <TextInput
                            register={register}
                            type="text"
                            id={"hotelId"}
                            label="Hotel Id"
                            // mb="3"
                            required
                            disabled
                          />
                          <TextInput
                            register={register}
                            type="text"
                            id={"roomName"}
                            label="Room Name"
                            // mb="3"
                            required
                          />
                          <TextInput
                            register={register}
                            type="text"
                            id={"roomType"}
                            label="Room Type"
                            // mb="3"
                            required
                          />
                          <TextInput
                            register={register}
                            type="text"
                            id={"roomSize"}
                            label="Room Size"
                            // mb="3"
                            required
                          />
                          <div className="-mt-[37px]"></div>
                          <TextArea
                            register={register}
                            type="text"
                            id={"roomDescription"}
                            label="Room Description"
                            required
                          />
                          <div className="-mt-[37px]"></div>
                          <TextArea
                            register={register}
                            type="text"
                            id={"amenities"}
                            label="Amenities"
                            required
                          />
                          <div className="-mt-[37px]"></div>
                          <TextArea
                            register={register}
                            type="text"
                            id={"roomNumbers"}
                            label="Room Numbers"
                            required={!edit}
                          />

                          {/* <div className="-mt-[37px]"></div> */}
                          {user.role === "ADMIN" && (
                            <TextInput
                              register={register}
                              type="text"
                              id={"roomPrice"}
                              label="Room Price"
                              // mb="3"
                              required
                            />
                          )}
                          {user.role === "ADMIN" && (
                            <TextInput
                              register={register}
                              type="text"
                              id={"extraBedPrice"}
                              label="Extra Bed Price"
                              // mb="3"
                              required
                            />
                          )}

                          {/* 
                          <div className="-mt-[40px]"></div>
                          <TextArea
                            register={register}
                            type="text"
                            id={"images"}
                            label="Enter Images link seperated by comma"
                            mb="3"
                            required
                          /> */}
                          <div className="mt-[20px]"></div>
                          <PrimaryButton
                            text={`${edit ? "Update" : "Add"} Room`}
                            type="submit"
                            disabled={isSubmitting}
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

// @ts-nocheck
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMatch, useNavigate } from "react-router-dom";
import TextArea from "../../common/inputs/TextArea";

export default function AddTeam({
  open,
  setOpen,
  isEdit,
  setIsEdit,
  getTeam,
  setTeam,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const match = useMatch("/hotels/:hotelId");
  console.log(match);
  const hotelId = match.params.hotelId;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    alert("please login!! access token not found");
    navigate("/login");
  }

  async function onSubmit(data) {
    try {
      setIsSubmitting(true);
      if (!data.inviteTeam) {
        alert("please add atleast one email");
        setIsSubmitting(false);
        return;
      }
      // adding data to the event model
      const updatedEvent = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/admin/addTeam`,
        {
          emails:
            data.inviteTeam.length > 1
              ? data.inviteTeam.split(",")
              : data.inviteTeam.length === 1
              ? [...data.inviteTeam.split(",")[0]]
              : [],

          role: "TEAM",
          hotelId: hotelId,
        },
        {
          headers: {
            "x-access-token": `${accessToken}`,
          },
        }
      );

      if (updatedEvent.data.success === true) {
        setOpen(false);
        setIsSubmitting(false);
        getTeam(accessToken);
        reset({
          inviteTeam: " ",
        });
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  }

  async function onSubmitRecep(data) {
    try {
      setIsSubmitting(true);
      if (!data.inviteRecep) {
        alert("please add atleast one email");
        setIsSubmitting(false);
        return;
      }
      // adding data to the event model
      const updatedEvent = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/admin/addTeam`,
        {
          emails:
            data.inviteRecep.length > 1
              ? data.inviteRecep.split(",")
              : data.inviteRecep.length === 1
              ? [...data.inviteRecep.split(",")[0]]
              : [],

          role: "RECEPTION",
          hotelId: hotelId,
        },
        {
          headers: {
            "x-access-token": `${accessToken}`,
          },
        }
      );

      if (updatedEvent.data.success === true) {
        alert("Receptionist added successfully");
        getTeam(accessToken);
        setOpen(false);
        setIsSubmitting(false);
        reset({
          inviteRecep: " ",
        });
      }
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
                        <Dialog.Title className="text-[20px] pt-8 font-[600] text-gray-900">
                          Add Team member
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-1 flex-1 px-4 sm:px-6">
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="flex flex-col gap-y-[20px]"
                        >
                          <TextArea
                            register={register}
                            type="text"
                            id={"inviteTeam"}
                            label="Add team (with comma separated emails)"
                            // placeholder="Event description"
                          />
                          <div className="-mt-[40px]"></div>
                          <input
                            value={isSubmitting ? "Loading..." : "Add team"}
                            type="submit"
                            className="primary_submit"
                          />
                        </form>
                        <form
                          onSubmit={handleSubmit(onSubmitRecep)}
                          className="flex flex-col gap-y-[20px]"
                        >
                          <TextArea
                            register={register}
                            type="text"
                            id={"inviteRecep"}
                            label="Add Receptionist (with comma separated emails)"
                            // placeholder="Event description"
                          />
                          <div className="-mt-[40px]"></div>
                          <input
                            value={
                              isSubmitting ? "Loading..." : "Add Receptionist"
                            }
                            type="submit"
                            className="primary_submit"
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

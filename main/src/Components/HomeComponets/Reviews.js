import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
{
  /* <div className="one">
            <p className="name">
              {" "}
              <span>Rahul Srivastava</span>{" "}
            </p>

            <p className="review">
              <span>
                As promised as served. Location is really accessible from Scheme
                78 ibus station. Room was clean and spacious. Overall a good
                experience.
              </span>
            </p>
          </div> */
}

const reviews = [
  {
    name: "Rahul Srivastava",
    review:
      "As promised as served. Location is really accessible from Scheme 78 ibus station. Room was clean and spacious. Overall a good experience.",
  },
  {
    name: "Rahul Srivastava",
    review:
      "As promised as served. Location is really accessible from Scheme 78 ibus station. Room was clean and spacious. Overall a good experience.",
  },
  {
    name: "Rahul",
    review:
      "As promised as served. Location is really accessible from Scheme 78 ibus station. Room was clean and spacious. Overall a good experience.",
  },
  {
    name: "Rahul  rfg Srivastava",
    review:
      "As promised as served. Location is really accessible from Scheme 78 ibus station. Room was clean and spacious. Overall a good experience.",
  },
  {
    name: "Rahul Srivastava",
    review:
      "As promised as served. Location is really accessible from Scheme 78 ibus station. Room was clean and spacious. Overall a good experience.",
  },
  {
    name: "Rahul Srivastava",
    review:
      "As promised as served. dsg,f.md,grm,;dm,.gfm,.dmgLocation is really accessible from Scheme 78 ibus station. Room was clean and spacious. Overall a good experience.",
  },
  {
    name: "Rahul Srivastava",
    review:
      "As promised as served. Location is really accessible from Scheme 78 ibus station. Room was clean and spacious. Overall a good experience.",
  },
  {
    name: "Rahul Srivastava",
    review:
      "As promised as served. Location is really accessible from Scheme 78 ibus station. Room was clean and spacious. Overall a good experience.",
  },
  {
    name: "Rahul Srivastava",
    review:
      "As promised as served. Location is really accessible from Scheme 78 ibus station. Room was clean and spacious. Overall a good experience.",
  },
];

// const Reviews = () => {
//   return (
//     <div className="w-full flex items-center justify-center my-12 min-h-max">
//       <div className="w-[90%] max-w-7xl  flex flex-col items-center gap-4 justify-center ">
//         <h3 className="text-3xl font-bold text-primary">Reviews</h3>
//         <p className="text-base font-medium">
//           Don't just take our word for it - See what our satisfied customers
//           have to say about us
//         </p>
//         <div className="overflow-hidden w-full px-12 ">

        
//         <div className="flex items-center gap-5 w-full -translate-x-2/3">
//           {reviews.map((review) => (
//             <div class="mb-12 md:mb-0 bg-secondary flex-shrink-0 p-8 rounded-xl w-1/3 shadow-md">
//               {/* <div class="mb-6 flex justify-center">
//               <img
//                 src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).jpg"
//                 class="w-32 rounded-full shadow-lg dark:shadow-black/30" />
//             </div> */}
//               <h5 class="mb-4 text-xl w-full text-center text-primary font-semibold">
//                 {review.name}
//               </h5>

//               <p class="mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   class="inline-block h-7 w-7 pr-2"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
//                 </svg>
//                 {review.review}
//               </p>
//             </div>
//           ))}
//         </div>
//         </div>
//       </div>
//     </div>
//   );
// };


const Reviews = () => {
  return (
    <div className="w-full flex items-center justify-center mt-12 pb-12 min-h-max">
       <div className="w-[90%] max-w-7xl  flex flex-col items-center gap-4 justify-center ">
         <h3 className="text-3xl font-bold text-primary">Reviews</h3>
         <p className="text-base font-medium">
           Don't just take our word for it - See what our satisfied customers
           have to say about us
         </p>

    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={false}
      scrollbar={false}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      className="w-full !px-8 !h-max"
      breakpoints={{
      650: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      768:{
        slidesPerView: 2,
        spaceBetween: 40
      },
      1080: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    }}

    >
      {reviews.map((review) => (
        <SwiperSlide className="!h-full">
          <div class="mb-12 md:mb-0 bg-secondary flex-shrink-0 p-8 rounded-xl shadow-md h-full min-h-full max-h-full">
               <h5 class="mb-4 text-xl w-full text-center text-primary font-semibold">
                 {review.name}
               </h5>

               <p class="mb-4 break-words">
                 <svg
                   xmlns="http:www.w3.org/2000/svg"
                   fill="currentColor"
                   class="inline-block h-7 w-7 pr-2"
                   viewBox="0 0 24 24"
                 >
                   <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                 </svg>
                 {review.review}
               </p>
             </div>

          </SwiperSlide>
      ))}
    </Swiper>
    </div>
</div>
  );
}


export default Reviews;

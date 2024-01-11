import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "./Footer";

const Aboutus = () => {
  return (
    <div className="w-screen  bg-white">
      <Navbar />
      <div className="my-14 p-4 sm:p-10 w-[95%] min-h-[800px] sm:w-4/5 rounded-xl relative  mx-auto">
        <div className="w-[440px] h-[640px] absolute bg-[#669bff8e] top-[100px] -left-[440px] blur"></div>
        <div className="w-[440px] h-[640px] absolute bg-[#669bff8e] top-[100px] -right-[450px] blur"></div>
        <h1 className="text-4xl m-5 text-center">
          MY STAY Group of Hotels and WB Events
        </h1>

        <img
          src="https://ik.imagekit.io/k3m4pqzpmlr/Hotel_pictures/Booked-logo-removebg-preview_Gu-jhBpNX.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656660679160"
          alt="Booked"
          className="w-[200px] h-[200px] mx-auto"
        />

        <p className="text-lg font-medium py-3 px-7 z-10">
          Walter &amp; Bruke’s Events and Exhibition along with ARN group of
          hotels had initiated their hotel business in 2018. After having 18
          hotel properties in Kota we as a group come up with our own
          hospitality brand ““MY STAY””. The group is having a great team which
          can put in their blood and sweat for the company to make it a huge
          success. “MY STAY” despite of corona pandemic has now grown to 22
          hotel properties in 3 cities Indore, Jaipur and Gurugram, with around
          600 rooms inventory with one marriage garden and bar lounge. “My Stay”
          has now grown to 200+ employees and a yearly business touching almost
          60 Mn by FY 2022. Aiming to close 250 mn by FY 23. After gaining
          enough confidence and experience (almost 8 years and 100+ events) in
          events field we have grown a beneficial business preposition in Hotel
          Business also.
        </p>
        <p className="text-lg font-medium py-3 px-7 z-10">
          With this decent confidence Promoters of the company decided to expand
          the business across major commercial and Tourist places in the
          country. WB Events has executed some of the major events across
          country which consists of Garments Expo 2020 at Labhganga Convention,
          Indore, Bonnarro Vastra Utsav 2018 2019 2020 in Jaipur Indore and Goa,
          Jems &amp; Jewelry Show- JECC Jaipur, DB Education fair-Jaipur, major
          Lifestyle exhibitions across country were also executed by us. We are
          empanelled vendor of Dainik Bhasker Group, JECC-Jaipur, Girdhar
          Banquets Indore, TGI Group of hotels. We are into execution of
          industrial expo, corporate events, business conferences, trade shows
          or weddings under Walter &amp; Bruke’s Events and Exhibitions.
        </p>
        <p className="text-lg font-medium py-3 px-7 z-10">
          We are enjoying a good repo with all our investors, Property owners
          and OTA platforms. We have now created an eco-system around us which
          is now capable enough to attract business for us. We work on ethics
          and our “Clean Business Policy” makes us a class apart. The group is
          now aiming to capture a decent market share for both Events and Hotel
          business. We are primarily planning to add 100 hotel properties in
          major commercial cities of India by FY 2025. As we are now a tested
          business model and backed up by some good investors and VC funds this
          vision is very much possible. We as a group operating properties on
          lease, management contract and revenue sharing also. Here you can see
          glimpse of our hotel properties and events.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Aboutus;

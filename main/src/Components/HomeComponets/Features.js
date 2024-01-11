import React from "react";

const Features = () => {
  return (
    <div className="md:py-12 w-screen px-12">
      <div className="flex  gap-6 items-center w-full flex-wrap justify-center">
        <div className="flex gap-4 flex-shrink-0">
          <div className="md:h-20 md:w-24">
            <img
              className="h-full w-full"
              alt=""
              src="https://d1ha4q9jvugw4k.cloudfront.net/static/img/best.svg"
              onerror="this.onerror=null;pagespeed.lazyLoadImages.loadIfVisibleAndMaybeBeacon(this);"
            />
          </div>
          <div className="flex flex-col gap-2 leading-tight">
            <div className="font-semibold text-md">BEST HOTELS</div>
            <p className="font-medium text-base w-56 lg:w-72">
              Our average rating is 4+
            </p>
          </div>
        </div>
        <div className="flex gap-4 flex-shrink-0">
          <div className="md:h-20 md:w-24">
            <img
              className="h-full w-full"
              alt=""
              src="https://d1ha4q9jvugw4k.cloudfront.net/static/img/speed.svg"
              onerror="this.onerror=null;pagespeed.lazyLoadImages.loadIfVisibleAndMaybeBeacon(this);"
            />
          </div>
          <div className="flex flex-col gap-2 leading-tight">
            <div className="font-semibold text-md">FLEXIBLE STAY</div>
            <p className="font-medium text-base w-56 lg:w-72">
              Check-in &amp; Check-out of our hotels at your convenience
            </p>
          </div>
        </div>
        <div className="flex gap-4 flex-shrink-0">
          <div className="md:h-20 md:w-24">
            <img
              className="h-full w-full"
              alt=""
              src="https://d1ha4q9jvugw4k.cloudfront.net/static/img/hand.svg"
              onerror="this.onerror=null;pagespeed.lazyLoadImages.loadIfVisibleAndMaybeBeacon(this);"
            />
          </div>
          <div className="flex flex-col gap-2 leading-tight">
            <div className="font-semibold text-md">FAIR PRICING</div>
            <p className="font-medium text-base w-56 lg:w-72">
            Always find pricing which is 20% less to the other hotels in the similar locality
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;

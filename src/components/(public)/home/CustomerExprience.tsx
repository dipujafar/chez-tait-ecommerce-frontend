import icon1 from "@/assets/icons/Icon1.png";
import icon2 from "@/assets/icons/Icon2.png";
import icon3 from "@/assets/icons/Icon3.png";
import icon4 from "@/assets/icons/Icon4.png";
import Image from "next/image";

const CustomerExprience = () => {
  return (
    <div className="lg:space-y-10 md:space-y-7 space-y-5">
      <h1 className="lg:text-4xl text-2xl font-bold">
        Customer experience is <br /> important to us
      </h1>
      <p className="text-primary-color max-w-lg">
        Sed dictum ipsum elementum diam dapibus, ut sodales orci monte
        consectetur. Fusce a mollis lorem. Orci varius natoque penatibus.
      </p>
      <div className="flex justify-between flex-grow">
        <div className="space-y-3">
          <Image src={icon1} alt="icon"></Image>
          <p className="text-primary-black font-medium">Original Products</p>
        </div>
        <div className="space-y-3">
          <Image src={icon2} alt="icon"></Image>
          <p className="text-primary-black font-medium">
            Satisfaction Guarantee
          </p>
        </div>
        <div className="space-y-3">
          <Image src={icon3} alt="icon"></Image>
          <p className="text-primary-black font-medium">New Arrival Everyday</p>
        </div>
        <div className="space-y-3">
          <Image src={icon4} alt="icon"></Image>
          <p className="text-primary-black font-medium"> Fast Shipping</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerExprience;

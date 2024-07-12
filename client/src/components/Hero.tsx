import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div className="w-screen flex flex-col items-center gap-8 mt-20">
      <h1 className="text-9xl font-black animate__bounceInDown duration-1000 ">
        WELCOME
      </h1>
      <p className="text-5xl font-bold animate__fadeInLeftBig duration-1000">
        We got everything you need!
      </p>
      <Button className="shadow-lg text-5xl font-bold animate__fadeInRightBig duration-1000 px-4 py-8 flex justify-center items-center ">
        Shop NOW!
      </Button>
    </div>
  );
}

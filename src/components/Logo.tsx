import logo from "@/assets/hang-mon-logo.png";

export default function Logo() {
  return (
    <div className="mt-2 w-[65%] md:mt-4 md:w-[50%] lg:w-[40%] xl:w-[33%]">
      <img src={logo} alt="Hang 'Mon Logo" className="h-auto w-full" />
    </div>
  );
}

import logo from "@/assets/hang-mon-logo.png";

export default function Logo() {
  return (
    <div className="mt-2 w-[65%] md:mt-4 md:w-[40%] lg:w-[35%] xl:w-[30%]">
      <img src={logo} alt="Hang 'Mon Logo" className="h-auto w-full" />
    </div>
  );
}

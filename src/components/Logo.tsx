import logo from "@/assets/hang-mon-logo.png";

export default function Logo() {
  return (
    <div className="mt-8 w-[90%] md:w-[60%] lg:w-[30%]">
      <img src={logo} alt="Hang 'Mon Logo" className="h-auto w-full" />
    </div>
  );
}

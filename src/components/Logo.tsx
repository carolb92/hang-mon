import logo from "@/assets/hang-mon-logo.png";

export default function Logo() {
  return (
    <div className="mt-8 w-[85%] pt-6 md:w-[50%] xl:w-[35%]">
      <img src={logo} alt="Hang 'Mon Logo" className="h-auto w-full" />
    </div>
  );
}

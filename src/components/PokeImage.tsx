// import pokeball3d from "../assets/pokeball-3d-removebg.png";

export default function PokeImage({ src }: { src: string }) {
  return (
    <div className="w-80 md:w-96">
      <img src={src} alt="pokemon" className="h-auto w-full" />
    </div>
  );
}

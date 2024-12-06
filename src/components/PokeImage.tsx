// import pokeball3d from "../assets/pokeball-3d-removebg.png";

export default function PokeImage({ src }: { src: string }) {
  return (
    <div className="w-72 md:w-48">
      <img src={src} alt="pokemon" className="h-auto w-full" />
    </div>
  );
}

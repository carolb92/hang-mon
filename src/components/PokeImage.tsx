export default function PokeImage({ src }: { src: string }) {
  return (
    <div className="flex max-h-[200px] min-h-[100px] w-72 items-center justify-center md:w-48">
      <img src={src} alt="pokemon" className="h-auto w-full" />
    </div>
  );
}

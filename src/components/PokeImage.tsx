export default function PokeImage({ src }: { src: string }) {
  return (
    <div className="flex max-h-[175px] min-h-[150px] min-w-[150px] max-w-[175px] items-center justify-center">
      <img src={src} alt="pokemon" className="h-auto w-full" />
    </div>
  );
}

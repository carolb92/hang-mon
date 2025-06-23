import { useState, useEffect, useRef } from "react";

export default function HPBar({
  guessesRemaining,
}: {
  guessesRemaining: number;
}) {
  const [widthClass, setWidthClass] = useState<number | string>("w-full");
  const [width, setWidth] = useState<number>(100);
  const [color, setColor] = useState<string>("green-600");
  const isFirstRender = useRef(true);

  const backgroundColor = `bg-${color}`;
  console.log(backgroundColor);
  console.log(guessesRemaining);
  console.log(widthClass);
  // const widthTest = "w-[100%]";

  // when guessesRemaining changes, decrement the width of the HP bar by 14.3%
  // don't run when the component first mounts, only run when guessesRemaining changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setWidth((prevWidth) => prevWidth - 14.3);
    setWidthClass(`w-[${Math.floor(width)}%]`);
    if (guessesRemaining > 5) {
      setColor("yellow-700");
    } else if (guessesRemaining > 3) {
      setColor("red-500");
    }
  }, [guessesRemaining]);

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-x-2">
        <span>HP:</span>
        <div className="h-2 w-24 rounded-xl border border-black bg-white">
          <div className={`h-full ${widthClass} ${backgroundColor}`}></div>
          {/* <div className={`h-full ${widthTest} bg-green-600`}></div> */}
        </div>
      </div>
      <span>{Math.floor(width)} / 100</span>
    </div>
  );
}

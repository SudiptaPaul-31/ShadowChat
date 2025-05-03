import React from "react";

const Loader = ({ text, overlay = false }: { text?: string; overlay?: boolean }) => {
  const defaultColor = '#D9D9D9'
  const activeColor = '#6E11B0'

  const [activeIndex, setActiveIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 8)
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`flex flex-col items-center z-50 ${overlay && 'fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center backdrop-blur-[10px] overflow-hidden'}`}
    >
    <svg
      className="w-12 h-12"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
    >
      {[
        { x: 22, y: 0, rotate: 0 },
        { x: 33.9, y: 16.9, rotate: -135 },
        { x: 36, y: 26, rotate: -90 },
        { x: 31.1, y: 33.9, rotate: -45 },
        { x: 22, y: 36, rotate: 0 },
        { x: 8.4, y: 42.3, rotate: -135 },
        { x: 0, y: 26, rotate: -90 },
        { x: 5.6, y: 8.4, rotate: -45 },
      ].map((rect, index) => (
        <rect
          key={index}
          x={rect.x}
          y={rect.y}
          width="4"
          height="12"
          rx="2"
          fill={index === activeIndex ? activeColor : defaultColor}
          transform={`rotate(${rect.rotate} ${rect.x} ${rect.y})`}
        />
      ))}
    </svg>
    <p className="text-3xl mt-6">{text}</p>
    </div>
  )
}

export default Loader
import { useEffect, useState } from "react";

const GenderCollectionSection = () => {
  const [balls, setBalls] = useState([]);

  useEffect(() => {
    const colors = ["#ff4c4c", "#4cffc1", "#4c6fff", "#ffec4c", "#ff4cff"];
    const newBalls = Array.from({ length: 35 }).map(() => ({
      size: Math.random() * 20 + 10,       // 10px to 30px
      color: colors[Math.floor(Math.random() * colors.length)],
      top: Math.random() * 90 + 5,         // 5% to 95% to avoid clipping
      left: Math.random() * 90 + 5,        // 5% to 95%
      duration: Math.random() * 5 + 3,     // 3s to 8s
      delay: Math.random() * 3,            // 0s to 3s
    }));
    setBalls(newBalls);
  }, []);

  return (
    <section className="relative py-32 px-4 lg:px-0 bg-black overflow-hidden">
      {/* Floating balls container */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        {balls.map((ball, index) => (
          <div
            key={index}
            className="absolute rounded-full opacity-70"
            style={{
              width: `${ball.size}px`,
              height: `${ball.size}px`,
              backgroundColor: ball.color,
              top: `${ball.top}%`,
              left: `${ball.left}%`,
              filter: "blur(6px)",
              animation: `float ${ball.duration}s ease-in-out ${ball.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center text-center text-white">
        {/* Unleash Your Thirst with fading line */}
        <div className="flex items-center gap-6 mb-6">
          <h1 className="text-5xl font-bold tracking-tight">Unleash Your Thirst</h1>
          <div
            className="h-4 rounded-sm"
            style={{
              width: "120px",
              background: "linear-gradient(to right, white 0%, rgba(255,255,255,0) 100%)",
            }}
          ></div>
        </div>

        {/* Flavours outlined and bigger */}
        <h2
          className="text-[6rem] font-extrabold mb-4 drop-shadow-lg"
          style={{
            color: "transparent",
            WebkitTextStroke: "2px #ff4c00", // outline effect
            text: "right",
          }}
        >
          Flavours
        </h2>

        {/* Subtext */}
        <p className="text-xl text-gray-200 max-w-2xl">
          Packed with a powerful mix of B vitamins
        </p>
      </div>

      {/* Keyframes for floating balls */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-40px) translateX(30px); }
            100% { transform: translateY(0px) translateX(-30px); }
          }
        `}
      </style>
    </section>
  );
};

export default GenderCollectionSection;

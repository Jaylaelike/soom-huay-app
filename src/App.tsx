import "./App.css";

import { useState, useRef, useEffect } from "react";
import CountUp from "react-countup";
import { Sparkles, Dice6 } from "lucide-react";

function randomNumber(): number {
  return Math.ceil(Math.random() * 9);
}

interface LotteryRandomMachineProps {
  title: string;
  size: number;
}

function LotteryRandomMachine({ title, size }: LotteryRandomMachineProps) {
  const initialCounter = Array(size).fill(0);
  const [counter, setCounter] = useState(initialCounter);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startNumbers, setStartNumbers] = useState(initialCounter);
  const [showFinalNumbers, setShowFinalNumbers] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    audioRef.current = new Audio(
      "https://tisxquhwharbxlrwzycc.supabase.co/storage/v1/object/public/songs/FM1/sound_buddha.mp3"
    );
    audioRef.current.addEventListener("ended", () => {
      setIsPlaying(false);
      setShowFinalNumbers(true);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", () => {
          setIsPlaying(false);
        });
      }
    };
  }, []);

  const random = () => {
    if (isPlaying) return;

    setIsPlaying(true);
    setShowFinalNumbers(false);
    setStartNumbers([...counter]);
    const result = Array(size)
      .fill(0)
      .map(() => randomNumber());
    setCounter(result);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-yellow-100 mb-6 text-center flex items-center justify-center gap-3">
        <Sparkles className="w-7 h-7 text-yellow-300" />
        {title}
      </h2>
      <div className="bg-yellow-900/30 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-yellow-500/20">
        <div className="flex justify-center gap-6 mb-8">
          {counter.map((item, index) => (
            <div
              key={index}
              className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-2xl flex items-center justify-center shadow-xl border-2 border-yellow-300/50"
            >
              {showFinalNumbers ? (
                <span className="text-5xl font-bold text-yellow-700">
                  {item}
                </span>
              ) : (
                <CountUp
                  className="text-5xl font-bold text-yellow-700"
                  start={startNumbers[index]}
                  end={item}
                  duration={4}
                  useEasing={true}
                />
              )}
            </div>
          ))}
        </div>
        <button
          onClick={random}
          disabled={isPlaying}
          className={`w-full py-4 px-8 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl
                     font-bold shadow-lg transform transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50
                     flex items-center justify-center gap-3 text-lg
                     ${
                       isPlaying
                         ? "opacity-75 cursor-not-allowed"
                         : "hover:scale-102 hover:shadow-yellow-300/30"
                     }`}
        >
          <Dice6 className={`w-6 h-6 ${isPlaying ? "animate-spin" : ""}`} />
          {isPlaying ? "กำลังอธิษฐาน..." : "อธิษฐานก่อนทาย"}
        </button>
      </div>
    </div>
  );
}

function LotteryHeader() {
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6">
      <div className="bg-yellow-900/30 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-yellow-500/20">
        <div className="relative">
          <img
            src="https://media.istockphoto.com/id/1494569724/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%9E%E0%B8%B8%E0%B8%97%E0%B8%98%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%9A%E0%B8%99%E0%B8%9E%E0%B8%B7%E0%B9%89%E0%B8%99%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%B5%E0%B8%82%E0%B8%B2%E0%B8%A7%E0%B9%81%E0%B8%A2%E0%B8%81.jpg?s=1024x1024&w=is&k=20&c=vgQZrDqFYAFkq92zckMB4Ut7QQPZfFHfG0f4M21Q27k="
            alt="Lucky numbers"
            className="w-full h-56 object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/60 to-transparent"></div>
        </div>
        <div className="p-8">
          <h1 className="text-3xl font-bold text-yellow-100 mb-4">
            รับเลขเด็ด
          </h1>
          <p className="text-yellow-100/90 text-lg">
            ตรงตัว โต๊ดเต็ง ต้อนรับเศรษฐีใหม่ จากเกจิ อาจารย์ชื่อดัง
          </p>
        </div>
      </div>
    </div>
  );
}

function Lottery() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-800 to-amber-900 py-12 px-4">
      <div className="container mx-auto">
        <LotteryHeader />
        <LotteryRandomMachine title="สามตัวงวดนี้คือ..." size={3} />
        <LotteryRandomMachine title="สองตัวงวดนี้คือ..." size={2} />
      </div>
    </div>
  );
}

export default Lottery;

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { heroSlides } from "./HeroData";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    console.log("nextside");
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const previousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  useEffect(() => {
    setInterval(() => {
      nextSlide();
    }, 4000);

    // return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative mt-4">
      {/* Image */}
      <Image
        src={heroSlides[currentSlide].image}
        alt={heroSlides[currentSlide].alt}
        width={1700}
        height={10}
        className="w-full h-125 object-cover"
      />

      {/* Left Arrow */}
      <button
        onClick={previousSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2
                   bg-white rounded-full p-3 shadow-lg
                   hover:bg-gray-100 transition"
      >
        <FaChevronLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2
                   bg-white rounded-full p-3 shadow-lg
                   hover:bg-gray-100 transition"
      >
        <FaChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full transition ${
              currentSlide === index ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

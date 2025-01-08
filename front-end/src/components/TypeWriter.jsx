import React, { useState, useEffect } from "react";
import "../assets/css/TypeWriter.css";

const Typewriter = () => {
  const words = ["Discover", "Learn", "Achieve", "Grow"];
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting && charIndex < currentWord.length) {
      // Typing characters
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentWord[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 150); // Typing speed
    } else if (isDeleting && charIndex > 0) {
      // Deleting characters
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      }, 100); // Deleting speed
    } else if (!isDeleting && charIndex === currentWord.length) {
      // Pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 1000); // Pause after typing
    } else if (isDeleting && charIndex === 0) {
      // Move to the next word after deleting
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length); // Loop through words
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words]);

  return (
    <div className="typewriter">
      <h1 className="typewriter-head">
        {displayedText}
        <span className="cursor">.|</span>
      </h1>
    </div>
  );
};

export default Typewriter;

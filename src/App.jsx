import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import img01 from "./assets/img01.png";
import img02 from "./assets/img02.png";
import img03 from "./assets/img03.png";

const icons = ["💌", "🌸", "💖", "✨", "🌹", "🎀", "🦋"];

const greetings = [
  {
    text: "Gửi đến em, em bé 3 tuổi của anh, những lời chúc tốt đẹp nhất trên đời 💐",
    image: img01,
  },
  {
    text: "Thời xưa ông cha mình viết thư tay, nay anh viết thư code, hì. Chúc em luôn vui vẻ, tỏa sáng, xinh đẹp và mạnh mẽ như những đóa hoa mang tên em 🌸",
    image: img02,
  },
  {
    text: "Anh biết nhiều lúc anh làm em giận hờn vu vơ, nhưng hãy nhớ là... dù có thế nào thì anh vẫn luôn ở đây, là chỗ dựa vững chắc cho em trong ngày giông bão 💕",
    image: img03,
  },
];

function App() {
  const [fallingIcons, setFallingIcons] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [randomGreeting, setRandomGreeting] = useState(null);
  const [flipped, setFlipped] = useState(false);

  // 🌸 Icon rơi ngẫu nhiên
  useEffect(() => {
    const interval = setInterval(() => {
      const newIcon = {
        id: Date.now() + Math.random(),
        icon: icons[Math.floor(Math.random() * icons.length)],
        left: Math.random() * 100,
        size: Math.random() * 1.5 + 1.2,
        duration: Math.random() * 5 + 6,
      };
      setFallingIcons((prev) => [...prev, newIcon]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // 💌 Khi click icon
  const handleIconClick = (e, id, icon, left, top) => {
    e.stopPropagation();
    setFallingIcons((prev) => prev.filter((i) => i.id !== id));

    if (icon === "💌") {
      const random = greetings[Math.floor(Math.random() * greetings.length)];
      setRandomGreeting(random);
      setShowPopup(true);
      return;
    }

    // 💕 Nổ trái tim
    const newHearts = Array.from({ length: 6 }).map(() => ({
      id: Math.random(),
      left: left + Math.random() * 20 - 10,
      top: top + Math.random() * 20 - 10,
    }));
    setHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setHearts((prev) => prev.slice(newHearts.length));
    }, 800);
  };

  const handleCardFlip = (e) => {
    e.stopPropagation();
    setFlipped((prev) => !prev);
  };

  const closePopup = () => {
    setShowPopup(false);
    setRandomGreeting(null);
  };

  return (
    <div className="app-container">
      {/* 🌸 Icon rơi */}
      {fallingIcons.map((item) => (
        <span
          key={item.id}
          className="falling-icon"
          style={{
            left: `${item.left}%`,
            animation: `fall ${item.duration}s linear forwards`,
            fontSize: `${item.size}rem`,
          }}
          onClick={(e) => {
            const rect = e.target.getBoundingClientRect();
            handleIconClick(e, item.id, item.icon, rect.left, rect.top);
          }}
        >
          {item.icon}
        </span>
      ))}

      {/* 💕 Trái tim nổ */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="small-heart"
          style={{
            left: `${h.left}px`,
            top: `${h.top}px`,
            animation: "heartExplode 0.8s ease-out forwards",
          }}
        >
          💕
        </span>
      ))}

      {/* 💐 Thiệp giữa màn hình */}
      <div className="card-scene" onClick={handleCardFlip}>
        <div className={`card ${flipped ? "flipped" : ""}`}>
          <div className="card-face card-front">
            <h1 className="fw-bold display-5 greeting-text">💐 Bé ơi 💐</h1>
            <p className="text-light">Lật mặt sau nếu em yêu anh 💞</p>
          </div>
          <div className="card-face card-back">
            <h2 className="fw-bold">Gửi Anh Đào iu dấu</h2>
            <p>
              Thử thách nho nhỏ cho em: tìm 3 điều anh muốn nhắn nhủ đến em
              trong những lá thư đang rơi... 🌸
            </p>
          </div>
        </div>
      </div>

      {/* 💌 Popup lời chúc */}
      {showPopup && randomGreeting && (
        <div className="popup-overlay" onClick={closePopup}>
          <div
            className="popup-card card shadow-lg bg-white text-dark"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="image-wrapper">
              <img
                src={randomGreeting.image}
                alt="Greeting"
                className="popup-image"
              />
            </div>
            <div className="card-body text-center">
              <p className="card-text">{randomGreeting.text}</p>
              <button className="btn btn-pink mt-2" onClick={closePopup}>
                Đóng 💖
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

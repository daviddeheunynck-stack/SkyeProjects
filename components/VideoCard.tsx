"use client";

import { useRef, useState } from "react";
import Link from "next/link";

interface Props {
  title: string;
  category: string;
  duration: string;
  videoSrc: string;
  posterSrc?: string;
  href?: string;
}

function Card({ title, category, duration, videoSrc, posterSrc }: Omit<Props, "href">) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => {
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        position: "relative",
        aspectRatio: "16/9",
        borderRadius: "1rem",
        overflow: "hidden",
        background: "#13131A",
        border: `1px solid ${hovered ? "#7F77DD40" : "#1E1E2A"}`,
        transition: "border-color 0.3s",
        cursor: "pointer",
      }}
    >
      {/* Video layer */}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        muted
        loop
        playsInline
        preload="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s",
        }}
      />

      {/* Poster / placeholder */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #13131A 0%, #0A0A0F 100%)",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.5s",
        }}
      >
        {posterSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={posterSrc} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ width: "52px", height: "52px", borderRadius: "50%", border: "1px solid #7F77DD30", background: "#7F77DD10", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" fill="#7F77DD" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </div>

      {/* Dark gradient overlay on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 50%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* Info overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1rem",
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          opacity: hovered ? 1 : 0,
          transition: "all 0.3s",
        }}
      >
        <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", color: "#7F77DD", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.25rem" }}>{category}</p>
        <h3 style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "white" }}>{title}</h3>
      </div>

      {/* Duration badge */}
      <div
        style={{
          position: "absolute",
          top: "0.75rem",
          right: "0.75rem",
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.6rem",
          color: "#E8E8F0",
          background: "rgba(10,10,15,0.75)",
          backdropFilter: "blur(4px)",
          padding: "0.25rem 0.5rem",
          borderRadius: "0.375rem",
        }}
      >
        {duration}
      </div>

      {/* Play button when not hovered */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}
      >
        <div style={{ width: "52px", height: "52px", borderRadius: "50%", border: "1px solid #7F77DD30", background: "#7F77DD10", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" fill="#7F77DD" viewBox="0 0 24 24" style={{ marginLeft: "2px" }}>
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function VideoCard({ href, ...props }: Props) {
  if (href) {
    return (
      <Link href={href} style={{ display: "block" }}>
        <Card {...props} />
      </Link>
    );
  }
  return <Card {...props} />;
}

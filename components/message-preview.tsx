"use client"

import { useState, useEffect } from "react"
import { Heart, Circle } from "lucide-react"

interface MessageData {
  title: string
  message: string
  recipient: string
  sender: string
  backgroundColor: string
  textColor: string
  effect: string
  backgroundImage?: string
  textEffect?: string
  fontFamily?: string
  imagePosition?: string
  imageSize?: string
  imageOpacity?: number
  imageFilterStyle?: string
  imageBase64?: string
  imageFilter?: string
  imageBrightness?: number
  imageContrast?: number
}

interface MessagePreviewProps {
  isDemo?: boolean
  messageData?: MessageData
}

export default function MessagePreview({ isDemo = false, messageData }: MessagePreviewProps) {
  const [effects, setEffects] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number }>>([])

  // Demo content
  const demoData: MessageData = {
    title: "Gửi Người Tôi Yêu",
    message:
      "Mỗi ngày bên em là một ngày tràn đầy hạnh phúc. Cảm ơn em vì đã luôn ở bên, yêu thương và chăm sóc anh. Anh yêu em rất nhiều!",
    sender: "Người luôn yêu em",
    recipient: "Người yêu của anh",
    backgroundColor: "#FF5757",
    textColor: "#FFFFFF",
    effect: "Trái tim",
    textEffect: "gradient-rainbow",
    fontFamily: "font-sans",
  }

  const data = isDemo ? demoData : messageData || demoData

  // Create effects animation
  useEffect(() => {
    const interval = setInterval(() => {
      const newEffect = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: -10,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 2 + 1,
      }

      setEffects((prev) => [...prev, newEffect])
    }, 500)

    const animationInterval = setInterval(() => {
      setEffects((prev) =>
        prev
          .map((effect) => ({
            ...effect,
            y: effect.y + effect.speed,
          }))
          .filter((effect) => effect.y < 110),
      )
    }, 50)

    return () => {
      clearInterval(interval)
      clearInterval(animationInterval)
    }
  }, [])

  const renderEffect = (effect: (typeof effects)[0]) => {
    switch (data.effect) {
      case "Trái tim":
        return <Heart fill="currentColor" />
      case "Bong bóng":
        return <Circle fill="currentColor" />
      case "Tuyết rơi":
        return <div className="text-white">❄</div>
      default:
        return <Heart fill="currentColor" />
    }
  }

  const getEffectColor = () => {
    switch (data.effect) {
      case "Trái tim":
        return "text-pink-500"
      case "Bong bóng":
        return "text-blue-400"
      case "Tuyết rơi":
        return "text-white"
      default:
        return "text-pink-500"
    }
  }

  const getTextEffectClass = (textEffect: string) => {
    switch (textEffect) {
      case "gradient-rainbow":
        return "bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text animate-pulse"
      case "gradient-sunset":
        return "bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 text-transparent bg-clip-text"
      case "gradient-ocean":
        return "bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text"
      case "gradient-forest":
        return "bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 text-transparent bg-clip-text"
      case "gradient-gold":
        return "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-transparent bg-clip-text"
      case "neon-glow":
        return "text-cyan-400 animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]"
      case "typewriter":
        return "animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white"
      case "bounce":
        return "animate-bounce"
      case "fade-in":
        return "animate-fade-in"
      case "slide-in":
        return "animate-slide-in"
      case "glow-pulse":
        return "animate-glow-pulse text-white"
      case "rainbow-shift":
        return "animate-rainbow-shift"
      default:
        return ""
    }
  }

  const getTitleEffectClass = (textEffect: string) => {
    const baseClass = getTextEffectClass(textEffect)
    switch (textEffect) {
      case "typewriter":
        return `${baseClass} animate-typing-title`
      case "bounce":
        return "animate-bounce-slow"
      case "fade-in":
        return "animate-fade-in-slow"
      case "slide-in":
        return "animate-slide-in-title"
      default:
        return baseClass
    }
  }

  const getFontClass = (fontFamily: string) => {
    switch (fontFamily) {
      case "font-sans":
        return "font-sans"
      case "font-serif":
        return "font-serif"
      case "font-mono":
        return "font-mono"
      case "font-dancing":
        return "font-dancing"
      case "font-playfair":
        return "font-playfair"
      case "font-roboto":
        return "font-roboto"
      case "font-lobster":
        return "font-lobster"
      case "font-pacifico":
        return "font-pacifico"
      default:
        return "font-sans"
    }
  }

  // Get background image style with position, size, opacity, and filters
  const getBackgroundImageStyle = () => {
    // Use base64 data if available (for shared messages), otherwise use object URL
    const imageUrl = data.imageBase64 || data.backgroundImage
    if (!imageUrl) return {}

    const imagePosition = data.imagePosition || "center"
    const imageSize = data.imageSize || "cover"
    const imageOpacity = data.imageOpacity !== undefined ? data.imageOpacity : 1

    // Build filter string
    let filterString = ""
    if (data.imageBrightness !== undefined) {
      filterString += `brightness(${data.imageBrightness}) `
    }
    if (data.imageContrast !== undefined) {
      filterString += `contrast(${data.imageContrast}) `
    }

    // Add filter effects
    switch (data.imageFilter) {
      case "grayscale":
        filterString += "grayscale(1) "
        break
      case "sepia":
        filterString += "sepia(0.7) "
        break
      case "warm":
        filterString += "sepia(0.3) saturate(1.5) "
        break
      case "cool":
        filterString += "hue-rotate(30deg) saturate(1.2) "
        break
      case "vintage":
        filterString += "sepia(0.4) saturate(0.8) brightness(0.9) "
        break
      case "dramatic":
        filterString += "contrast(1.3) saturate(1.5) brightness(0.9) "
        break
      case "dreamy":
        filterString += "brightness(1.1) contrast(0.9) saturate(0.8) blur(0.5px) "
        break
    }

    return {
      backgroundImage: `url(${imageUrl})`,
      backgroundPosition: imagePosition,
      backgroundSize: imageSize,
      opacity: imageOpacity,
      filter: filterString.trim(),
    }
  }

  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden p-4"
      style={{
        backgroundColor: data.backgroundColor,
        minHeight: "600px", // Đảm bảo chiều cao tối thiểu cho tỷ lệ dọc
      }}
    >
      {/* Background image with adjustments */}
      {(data.backgroundImage || data.imageBase64) && (
        <div className="absolute inset-0 z-0" style={getBackgroundImageStyle()}></div>
      )}

      {/* Effects animation */}
      {effects.map((effect) => (
        <div
          key={effect.id}
          className={`absolute opacity-70 ${getEffectColor()}`}
          style={{
            left: `${effect.x}%`,
            top: `${effect.y}%`,
            fontSize: `${effect.size}px`,
            transform: data.effect === "Trái tim" ? "rotate(45deg)" : "none",
            transition: "top 0.5s linear",
          }}
        >
          {renderEffect(effect)}
        </div>
      ))}

      {/* Message content */}
      <div
        className={`bg-black/30 backdrop-blur-sm text-center max-w-sm z-10 border border-white/30 rounded-xl p-4 ${getFontClass(
          data.fontFamily || "font-sans",
        )}`}
      >
        <h2
          className={`text-xl font-bold mb-3 ${data.textEffect ? getTitleEffectClass(data.textEffect) : ""}`}
          style={{ color: !data.textEffect ? data.textColor : undefined }}
        >
          {data.title || "Tiêu đề tin nhắn"}
        </h2>
        <p
          className={`mb-4 leading-relaxed text-sm ${data.textEffect ? getTextEffectClass(data.textEffect) : ""}`}
          style={{ color: !data.textEffect ? data.textColor : undefined }}
        >
          {data.message || "Nội dung tin nhắn của bạn sẽ hiển thị ở đây. Hãy viết những lời ngọt ngào nhất!"}
        </p>
        <div
          className={`text-sm italic opacity-80 ${data.textEffect ? getTextEffectClass(data.textEffect) : ""}`}
          style={{ color: !data.textEffect ? data.textColor : undefined }}
        >
          <p className="mb-1">Gửi đến: {data.recipient || "Người nhận"}</p>
          <p>Từ: {data.sender || "Người gửi"}</p>
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Palette,
  Type,
  Upload,
  Wand2,
  Loader2,
  Sparkles,
  Square,
  ImageIcon,
  AlignCenter,
  AlignLeft,
  AlignRight,
  AlignJustify,
  Maximize,
  Minimize,
  SunMedium,
  Contrast,
  CheckCircle,
  X,
  Clock,
} from "lucide-react"
import Link from "next/link"
import MessagePreview from "@/components/message-preview"
import { useToast } from "@/hooks/use-toast"

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
  imageFilter?: string
  imageBrightness?: number
  imageContrast?: number
  imageBase64?: string
}

interface UploadProgress {
  isUploading: boolean
  progress: number
  fileName: string
}

export default function CreatePage() {
  const { toast } = useToast()
  const [messageData, setMessageData] = useState<MessageData>({
    title: "",
    message: "",
    recipient: "",
    sender: "",
    backgroundColor: "#FF5757",
    textColor: "#FFFFFF",
    effect: "Trái tim",
    backgroundImage: "",
    textEffect: "gradient-rainbow",
    fontFamily: "font-sans",
    imagePosition: "center",
    imageSize: "cover",
    imageOpacity: 1,
    imageFilter: "none",
    imageBrightness: 1,
    imageContrast: 1,
  })

  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [backgroundPrompt, setBackgroundPrompt] = useState("")
  const [generatingBackground, setGeneratingBackground] = useState(false)

  // Upload progress states
  const [imageUploadProgress, setImageUploadProgress] = useState<UploadProgress>({
    isUploading: false,
    progress: 0,
    fileName: "",
  })

  const imageInputRef = useRef<HTMLInputElement>(null)

  // Font families options
  const fontFamilies = [
    { id: "font-sans", name: "Sans Serif", preview: "font-sans", sample: "Abc" },
    { id: "font-serif", name: "Serif", preview: "font-serif", sample: "Abc" },
    { id: "font-mono", name: "Monospace", preview: "font-mono", sample: "Abc" },
    { id: "font-dancing", name: "Dancing Script", preview: "font-dancing", sample: "Abc" },
    { id: "font-playfair", name: "Playfair", preview: "font-playfair", sample: "Abc" },
    { id: "font-roboto", name: "Roboto", preview: "Roboto", sample: "Abc" },
    { id: "font-lobster", name: "Lobster", preview: "Lobster", sample: "Abc" },
    { id: "font-pacifico", name: "Pacifico", preview: "Pacifico", sample: "Abc" },
  ]

  // Text effects options
  const textEffects = [
    {
      id: "gradient-rainbow",
      name: "Cầu vồng",
      preview: "bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text",
    },
    {
      id: "gradient-sunset",
      name: "Hoàng hôn",
      preview: "bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 text-transparent bg-clip-text",
    },
    {
      id: "gradient-ocean",
      name: "Đại dương",
      preview: "bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text",
    },
    {
      id: "gradient-forest",
      name: "Rừng xanh",
      preview: "bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 text-transparent bg-clip-text",
    },
    {
      id: "gradient-gold",
      name: "Vàng kim",
      preview: "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-transparent bg-clip-text",
    },
    { id: "neon-glow", name: "Neon sáng", preview: "text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]" },
    { id: "typewriter", name: "Máy đánh chữ", preview: "text-white border-r-2 border-white" },
    { id: "bounce", name: "Nhảy nhót", preview: "text-white" },
    { id: "fade-in", name: "Hiện dần", preview: "text-white" },
    { id: "slide-in", name: "Trượt vào", preview: "text-white" },
    { id: "glow-pulse", name: "Phát sáng", preview: "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" },
    { id: "rainbow-shift", name: "Đổi màu", preview: "text-white" },
  ]

  // Image position options
  const imagePositions = [
    { id: "center", name: "Giữa", icon: <AlignCenter className="h-4 w-4" /> },
    { id: "top", name: "Trên", icon: <AlignJustify className="h-4 w-4 rotate-90" /> },
    { id: "bottom", name: "Dưới", icon: <AlignJustify className="h-4 w-4 -rotate-90" /> },
    { id: "left", name: "Trái", icon: <AlignLeft className="h-4 w-4" /> },
    { id: "right", name: "Phải", icon: <AlignRight className="h-4 w-4" /> },
  ]

  // Image size options
  const imageSizes = [
    { id: "cover", name: "Phủ đầy", icon: <Maximize className="h-4 w-4" /> },
    { id: "contain", name: "Vừa khung", icon: <Minimize className="h-4 w-4" /> },
    { id: "auto", name: "Tự động", icon: <ImageIcon className="h-4 w-4" /> },
  ]

  // Image filter options
  const imageFilters = [
    { id: "none", name: "Không" },
    { id: "grayscale", name: "Đen trắng" },
    { id: "sepia", name: "Hoài cổ" },
    { id: "warm", name: "Ấm áp" },
    { id: "cool", name: "Mát mẻ" },
    { id: "vintage", name: "Cổ điển" },
    { id: "dramatic", name: "Kịch tính" },
    { id: "dreamy", name: "Mơ màng" },
  ]

  // Convert file to base64 with progress
  const fileToBase64 = (file: File | Blob, onProgress: (progress: number) => void): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        onProgress(100)
        resolve(reader.result as string)
      }

      reader.onerror = reject

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100)
          onProgress(progress)
        }
      }

      reader.readAsDataURL(file)
    })
  }

  // Simulate upload progress for better UX
  const simulateUploadProgress = (onProgress: (progress: number) => void) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 95) {
        clearInterval(interval)
        onProgress(95)
      } else {
        onProgress(Math.round(progress))
      }
    }, 100)
    return interval
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast({
          title: "File quá lớn",
          description: "Vui lòng chọn ảnh nhỏ hơn 5MB",
          variant: "destructive",
        })
        return
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Định dạng không hỗ trợ",
          description: "Vui lòng chọn file ảnh (JPG, PNG, GIF)",
          variant: "destructive",
        })
        return
      }

      try {
        await processImageUpload(file)
      } catch (error) {
        toast({
          title: "Lỗi kiểm tra file",
          description: "Không thể tải lên file ảnh",
          variant: "destructive",
        })
      }
    }
  }

  const handleInputChange = (field: keyof MessageData, value: string | number) => {
    setMessageData((prev) => ({ ...prev, [field]: value }))
  }

  const handleColorSelect = (field: "backgroundColor" | "textColor", color: string) => {
    setMessageData((prev) => ({ ...prev, [field]: color }))
  }

  const handleEffectSelect = (effect: string) => {
    setMessageData((prev) => ({ ...prev, effect }))
  }

  const handleTextEffectSelect = (textEffect: string) => {
    setMessageData((prev) => ({ ...prev, textEffect }))
  }

  const handleFontFamilySelect = (fontFamily: string) => {
    setMessageData((prev) => ({ ...prev, fontFamily }))
  }

  const handleImagePositionSelect = (position: string) => {
    setMessageData((prev) => ({ ...prev, imagePosition: position }))
  }

  const handleImageSizeSelect = (size: string) => {
    setMessageData((prev) => ({ ...prev, imageSize: size }))
  }

  const handleImageFilterSelect = (filter: string) => {
    setMessageData((prev) => ({ ...prev, imageFilter: filter }))
  }

  const processImageUpload = async (file: File) => {
    // Start upload progress
    setImageUploadProgress({
      isUploading: true,
      progress: 0,
      fileName: file.name,
    })

    try {
      // Simulate upload progress
      const progressInterval = simulateUploadProgress((progress) => {
        setImageUploadProgress((prev) => ({ ...prev, progress }))
      })

      // Resize image to 9:16 aspect ratio
      const resizedBlob = await resizeImageTo9x16(file)

      // Convert resized image to base64
      const base64 = await fileToBase64(resizedBlob, (progress) => {
        setImageUploadProgress((prev) => ({ ...prev, progress }))
      })

      clearInterval(progressInterval)

      // Create object URL for preview
      const url = URL.createObjectURL(resizedBlob)

      setUploadedImage(file)
      setMessageData((prev) => ({
        ...prev,
        backgroundImage: url,
        imageBase64: base64,
      }))

      // Complete upload
      setImageUploadProgress({
        isUploading: false,
        progress: 100,
        fileName: file.name,
      })

      toast({
        title: "Tải ảnh thành công",
        description: `Đã tải lên và tự động điều chỉnh: ${file.name}`,
      })

      // Reset progress after 2 seconds
      setTimeout(() => {
        setImageUploadProgress({
          isUploading: false,
          progress: 0,
          fileName: "",
        })
      }, 2000)
    } catch (error) {
      setImageUploadProgress({
        isUploading: false,
        progress: 0,
        fileName: "",
      })
      toast({
        title: "Lỗi tải lên",
        description: "Không thể tải lên file ảnh",
        variant: "destructive",
      })
    }
  }

  const handleGenerateBackground = async () => {
    if (!backgroundPrompt.trim()) {
      toast({
        title: "Thiếu mô tả",
        description: "Vui lòng nhập mô tả hình ảnh bạn muốn",
        variant: "destructive",
      })
      return
    }

    setGeneratingBackground(true)

    try {
      const response = await fetch("/api/generate-background", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: backgroundPrompt }),
      })

      const data = await response.json()

      if (data.success) {
        setMessageData((prev) => ({ ...prev, backgroundImage: data.imageUrl }))
        toast({
          title: "Tạo hình nền thành công",
          description: data.message,
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Lỗi tạo hình nền",
        description: "Không thể tạo hình nền, vui lòng thử lại",
        variant: "destructive",
      })
    } finally {
      setGeneratingBackground(false)
    }
  }

  const handleSave = () => {
    if (!messageData.title || !messageData.message) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng nhập tiêu đề và nội dung tin nhắn",
        variant: "destructive",
      })
      return
    }

    try {
      // Tạo một bản sao của messageData, loại bỏ dữ liệu base64 lớn
      const saveData = {
        ...messageData,
        // Lưu URL thay vì base64 để giảm kích thước
        imageBase64: undefined,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      }

      // Lưu vào localStorage
      const savedMessages = JSON.parse(localStorage.getItem("savedMessages") || "[]")
      savedMessages.push(saveData)
      localStorage.setItem("savedMessages", JSON.stringify(savedMessages))

      toast({
        title: "Lưu thành công",
        description: "Tin nhắn đã được lưu vào thư viện của bạn",
      })
    } catch (error) {
      console.error("Save error:", error)
      toast({
        title: "Lỗi lưu tin nhắn",
        description: "Không thể lưu tin nhắn. Dữ liệu có thể quá lớn.",
        variant: "destructive",
      })
    }
  }

  // Simplified and more reliable handleShare function
  const handleShare = async () => {
    if (!messageData.title || !messageData.message) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng nhập tiêu đề và nội dung tin nhắn trước khi chia sẻ",
        variant: "destructive",
      })
      return
    }

    let shareData: any

    try {
      // Create a clean copy of messageData with only essential fields
      shareData = {
        title: messageData.title,
        message: messageData.message,
        recipient: messageData.recipient,
        sender: messageData.sender,
        backgroundColor: messageData.backgroundColor,
        textColor: messageData.textColor,
        effect: messageData.effect,
        textEffect: messageData.textEffect,
        fontFamily: messageData.fontFamily,
      }

      // Only include image settings if there's an image
      if (messageData.backgroundImage) {
        // For AI generated images (external URLs), include them directly
        if (messageData.backgroundImage && !messageData.backgroundImage.startsWith("data:")) {
          shareData.backgroundImage = messageData.backgroundImage
          shareData.imagePosition = messageData.imagePosition
          shareData.imageSize = messageData.imageSize
          shareData.imageOpacity = messageData.imageOpacity
          shareData.imageFilter = messageData.imageFilter
          shareData.imageBrightness = messageData.imageBrightness
          shareData.imageContrast = messageData.imageContrast
        } else {
          // For uploaded images, try to compress and include
          if (messageData.imageBase64) {
            try {
              const compressedImage = await compressBase64Image(messageData.imageBase64, 0.3, 300)
              const testData = { ...shareData, backgroundImage: compressedImage }
              const testSize = JSON.stringify(testData).length

              // Only include if compressed data is reasonable size (under 100KB)
              if (testSize < 100000) {
                shareData.backgroundImage = compressedImage
                shareData.imagePosition = messageData.imagePosition
                shareData.imageSize = messageData.imageSize
                shareData.imageOpacity = messageData.imageOpacity
                shareData.imageFilter = messageData.imageFilter
                shareData.imageBrightness = messageData.imageBrightness
                shareData.imageContrast = messageData.imageContrast
              } else {
                toast({
                  title: "⚠️ Hình ảnh quá lớn",
                  description: "Hình ảnh sẽ không được bao gồm trong link để tránh lỗi.",
                })
              }
            } catch (error) {
              console.warn("Image compression failed:", error)
              toast({
                title: "⚠️ Không thể nén ảnh",
                description: "Link sẽ được tạo không có hình ảnh.",
              })
            }
          }
        }
      }

      // Convert to JSON string
      const jsonString = JSON.stringify(shareData)
      console.log("Data size:", jsonString.length, "characters")

      // Check size before encoding
      if (jsonString.length > 50000) {
        toast({
          title: "❌ Dữ liệu quá lớn",
          description: "Tin nhắn có quá nhiều dữ liệu để chia sẻ. Hãy thử rút ngắn nội dung.",
          variant: "destructive",
        })
        return
      }

      // Simple base64 encoding
      const base64String = btoa(unescape(encodeURIComponent(jsonString)))

      // URL encode the base64 string
      const encodedBase64 = encodeURIComponent(base64String)

      // Create share URL
      const shareUrl = `${window.location.origin}/view/${encodedBase64}`

      console.log("Final URL length:", shareUrl.length, "characters")

      // Check final URL length
      if (shareUrl.length > 2000) {
        toast({
          title: "❌ Link quá dài",
          description: "Dữ liệu quá lớn để tạo link chia sẻ. Hãy thử rút ngắn nội dung tin nhắn.",
          variant: "destructive",
        })
        return
      }

      // Copy to clipboard
      await navigator.clipboard.writeText(shareUrl)
      toast({
        title: "✅ Đã sao chép link",
        description: "Link chia sẻ đã được sao chép vào clipboard",
      })
    } catch (error) {
      console.error("Share error:", error)
      toast({
        title: "❌ Lỗi chia sẻ",
        description: "Không thể tạo link chia sẻ. Vui lòng thử lại.",
        variant: "destructive",
      })
    }
  }

  // Get CSS filter string based on selected filter and adjustments
  const getImageFilterStyle = () => {
    const { imageFilter, imageBrightness, imageContrast } = messageData
    let filterString = `brightness(${imageBrightness}) contrast(${imageContrast})`

    switch (imageFilter) {
      case "grayscale":
        filterString += " grayscale(1)"
        break
      case "sepia":
        filterString += " sepia(0.7)"
        break
      case "warm":
        filterString += " sepia(0.3) saturate(1.5)"
        break
      case "cool":
        filterString += " hue-rotate(30deg) saturate(1.2)"
        break
      case "vintage":
        filterString += " sepia(0.4) saturate(0.8) brightness(0.9)"
        break
      case "dramatic":
        filterString += " contrast(1.3) saturate(1.5) brightness(0.9)"
        break
      case "dreamy":
        filterString += " brightness(1.1) contrast(0.9) saturate(0.8) blur(0.5px)"
        break
    }

    return filterString
  }

  const removeUploadedImage = () => {
    setUploadedImage(null)
    setMessageData((prev) => ({
      ...prev,
      backgroundImage: "",
      imageBase64: undefined,
    }))
    setImageUploadProgress({
      isUploading: false,
      progress: 0,
      fileName: "",
    })
  }

  // Add this new function to resize images to 9:16 aspect ratio
  const resizeImageTo9x16 = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        if (!ctx) {
          reject(new Error("Could not get canvas context"))
          return
        }

        // Target aspect ratio 9:16
        const targetAspectRatio = 9 / 16
        const sourceAspectRatio = img.width / img.height

        // Set canvas size to 9:16 with max width of 600px (reduced for sharing)
        const maxWidth = 600
        canvas.width = maxWidth
        canvas.height = maxWidth / targetAspectRatio

        let sourceX = 0
        let sourceY = 0
        let sourceWidth = img.width
        let sourceHeight = img.height

        // Calculate crop area to maintain aspect ratio
        if (sourceAspectRatio > targetAspectRatio) {
          // Image is wider, crop horizontally
          sourceWidth = img.height * targetAspectRatio
          sourceX = (img.width - sourceWidth) / 2
        } else {
          // Image is taller, crop vertically
          sourceHeight = img.width / targetAspectRatio
          sourceY = (img.height - sourceHeight) / 2
        }

        // Draw the cropped and resized image
        ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error("Failed to create blob"))
            }
          },
          "image/jpeg",
          0.8, // Slightly higher quality for upload
        )
      }

      img.onerror = () => reject(new Error("Failed to load image"))
      img.src = URL.createObjectURL(file)
    })
  }

  // Improved and simplified image compression function
  const compressBase64Image = (base64String: string, quality = 0.3, maxWidth = 300): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        if (!ctx) {
          reject(new Error("Could not get canvas context"))
          return
        }

        // Calculate new dimensions maintaining aspect ratio
        const aspectRatio = img.width / img.height
        let newWidth = Math.min(img.width, maxWidth)
        let newHeight = newWidth / aspectRatio

        // Ensure reasonable dimensions
        if (newHeight > 500) {
          newHeight = 500
          newWidth = newHeight * aspectRatio
        }

        canvas.width = newWidth
        canvas.height = newHeight

        // Draw and compress
        ctx.drawImage(img, 0, 0, newWidth, newHeight)

        try {
          const compressedBase64 = canvas.toDataURL("image/jpeg", quality)
          resolve(compressedBase64)
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => reject(new Error("Failed to load image"))
      img.src = base64String
    })
  }

  return (
    <main className="min-h-screen bg-[#0d0e17] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" asChild className="mr-4">
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text">
            Tạo Tin Nhắn Ngọt Ngào
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Section */}
          <div className="bg-[#1a1b29]/80 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
            <Tabs defaultValue="message" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="message" className="flex items-center gap-2">
                  <Type className="h-4 w-4" /> Tin Nhắn
                </TabsTrigger>
                <TabsTrigger value="design" className="flex items-center gap-2">
                  <Square className="h-4 w-4" /> Thiết Kế
                </TabsTrigger>
                <TabsTrigger value="style" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" /> Màu Sắc
                </TabsTrigger>
              </TabsList>

              <TabsContent value="message" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề</Label>
                  <Input
                    id="title"
                    placeholder="Nhập tiêu đề tin nhắn..."
                    className="bg-[#1e2030] border-gray-700"
                    value={messageData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Nội dung</Label>
                  <Textarea
                    id="message"
                    placeholder="Nhập nội dung tin nhắn ngọt ngào của bạn..."
                    className="bg-[#1e2030] border-gray-700 min-h-[200px]"
                    value={messageData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipient">Người nhận</Label>
                  <Input
                    id="recipient"
                    placeholder="Tên người nhận..."
                    className="bg-[#1e2030] border-gray-700"
                    value={messageData.recipient}
                    onChange={(e) => handleInputChange("recipient", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sender">Người gửi</Label>
                  <Input
                    id="sender"
                    placeholder="Tên của bạn..."
                    className="bg-[#1e2030] border-gray-700"
                    value={messageData.sender}
                    onChange={(e) => handleInputChange("sender", e.target.value)}
                  />
                </div>

                {/* AI Background Generation */}
                <div className="space-y-2">
                  <Label>Tạo hình nền bằng AI</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Mô tả hình ảnh bạn muốn (VD: hoàng hôn trên biển, khu rừng thần tiên, thành phố về đêm...)"
                      className="bg-[#1e2030] border-gray-700 flex-1"
                      value={backgroundPrompt}
                      onChange={(e) => setBackgroundPrompt(e.target.value)}
                    />
                    <Button
                      onClick={handleGenerateBackground}
                      disabled={generatingBackground}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                    >
                      {generatingBackground ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Wand2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400">Nhập mô tả và nhấn nút để AI tạo hình nền cho bạn</p>
                </div>

                {/* Manual Image Upload */}
                <div className="space-y-2">
                  <Label>Hoặc tải lên ảnh nền của bạn</Label>
                  <div className="text-xs text-yellow-400 bg-yellow-400/10 p-2 rounded border border-yellow-400/20">
                    <Clock className="h-3 w-3 inline mr-1" />
                    Ảnh sẽ được tự động điều chỉnh về tỷ lệ 9:16
                  </div>

                  {/* Upload Progress */}
                  {imageUploadProgress.isUploading && (
                    <div className="space-y-2 p-3 bg-[#1e2030] rounded-md border border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Đang tải lên: {imageUploadProgress.fileName}</span>
                        <span className="text-sm text-cyan-400">{imageUploadProgress.progress}%</span>
                      </div>
                      <Progress value={imageUploadProgress.progress} className="h-2" />
                    </div>
                  )}

                  {/* Upload Complete */}
                  {imageUploadProgress.progress === 100 &&
                    !imageUploadProgress.isUploading &&
                    imageUploadProgress.fileName && (
                      <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-md border border-green-700">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                          <span className="text-sm text-green-400">Đã tải lên: {imageUploadProgress.fileName}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeUploadedImage}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                  <div
                    className="border-2 border-dashed border-gray-700 rounded-md p-4 text-center cursor-pointer hover:border-cyan-400 transition-all"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    {uploadedImage || messageData.backgroundImage ? (
                      <div className="flex items-center justify-center">
                        <img
                          src={messageData.backgroundImage || "/placeholder.svg"}
                          alt="Preview"
                          className="h-20 w-20 object-cover rounded-md mr-2"
                        />
                        <span className="text-green-400">{uploadedImage ? uploadedImage.name : "Hình nền AI"}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                        <p className="text-gray-400">Nhấp để tải lên ảnh nền</p>
                        <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF (tối đa 5MB, tỷ lệ 9:16)</p>
                      </>
                    )}
                  </div>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </TabsContent>

              <TabsContent value="design" className="space-y-6">
                {/* Font Families */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    Kiểu chữ
                  </Label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {fontFamilies.map((font) => (
                      <div
                        key={font.id}
                        className={`p-3 rounded-md text-center cursor-pointer transition-all border ${
                          messageData.fontFamily === font.id
                            ? "bg-cyan-600/20 border-cyan-400"
                            : "bg-[#1e2030] border-gray-700 hover:bg-[#2a2c42]"
                        }`}
                        onClick={() => handleFontFamilySelect(font.id)}
                      >
                        <div className={`text-lg font-medium mb-1 ${font.preview}`}>{font.sample}</div>
                        <div className="text-xs text-gray-400">{font.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Text Effects */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Hiệu ứng chữ
                  </Label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {textEffects.map((effect) => (
                      <div
                        key={effect.id}
                        className={`p-3 rounded-md text-center cursor-pointer transition-all border ${
                          messageData.textEffect === effect.id
                            ? "bg-cyan-600/20 border-cyan-400"
                            : "bg-[#1e2030] border-gray-700 hover:bg-[#2a2c42]"
                        }`}
                        onClick={() => handleTextEffectSelect(effect.id)}
                      >
                        <div className={`text-sm font-medium mb-1 ${effect.preview}`}>{effect.name}</div>
                        <div className="text-xs text-gray-400">Preview</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Adjustments - only show if there's a background image */}
                {messageData.backgroundImage && (
                  <div className="space-y-6 p-4 bg-[#1e2030]/50 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <ImageIcon className="h-5 w-5 text-cyan-400" />
                      Điều chỉnh hình ảnh
                    </h3>

                    {/* Image Position */}
                    <div className="space-y-4">
                      <Label className="flex items-center gap-2">
                        <AlignCenter className="h-4 w-4" />
                        Vị trí hình ảnh
                      </Label>
                      <div className="grid grid-cols-3 gap-2">
                        {imagePositions.map((position) => (
                          <div
                            key={position.id}
                            className={`p-3 rounded-md text-center cursor-pointer transition-all border ${
                              messageData.imagePosition === position.id
                                ? "bg-cyan-600/20 border-cyan-400"
                                : "bg-[#1e2030] border-gray-700 hover:bg-[#2a2c42]"
                            }`}
                            onClick={() => handleImagePositionSelect(position.id)}
                          >
                            {position.icon}
                            <div className="text-xs text-gray-400 mt-1">{position.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Image Size */}
                    <div className="space-y-4">
                      <Label className="flex items-center gap-2">
                        <Maximize className="h-4 w-4" />
                        Kích thước hình ảnh
                      </Label>
                      <div className="grid grid-cols-3 gap-2">
                        {imageSizes.map((size) => (
                          <div
                            key={size.id}
                            className={`p-3 rounded-md text-center cursor-pointer transition-all border ${
                              messageData.imageSize === size.id
                                ? "bg-cyan-600/20 border-cyan-400"
                                : "bg-[#1e2030] border-gray-700 hover:bg-[#2a2c42]"
                            }`}
                            onClick={() => handleImageSizeSelect(size.id)}
                          >
                            {size.icon}
                            <div className="text-xs text-gray-400 mt-1">{size.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Image Filter */}
                    <div className="space-y-4">
                      <Label className="flex items-center gap-2">
                        <Contrast className="h-4 w-4" />
                        Bộ lọc hình ảnh
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {imageFilters.map((filter) => (
                          <div
                            key={filter.id}
                            className={`p-3 rounded-md text-center cursor-pointer transition-all border ${
                              messageData.imageFilter === filter.id
                                ? "bg-cyan-600/20 border-cyan-400"
                                : "bg-[#1e2030] border-gray-700 hover:bg-[#2a2c42]"
                            }`}
                            onClick={() => handleImageFilterSelect(filter.id)}
                          >
                            <div className="text-xs text-gray-400">{filter.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Image Opacity */}
                    <div className="space-y-4">
                      <Label className="flex items-center gap-2">
                        <SunMedium className="h-4 w-4" />
                        Độ trong suốt: {Math.round(messageData.imageOpacity * 100)}%
                      </Label>
                      <Slider
                        value={[messageData.imageOpacity]}
                        min={0}
                        max={1}
                        step={0.1}
                        onValueChange={(value) => handleInputChange("imageOpacity", value[0])}
                        className="w-full"
                      />
                    </div>

                    {/* Image Brightness */}
                    <div className="space-y-4">
                      <Label className="flex items-center gap-2">
                        <SunMedium className="h-4 w-4" />
                        Độ sáng: {Math.round(messageData.imageBrightness * 100)}%
                      </Label>
                      <Slider
                        value={[messageData.imageBrightness]}
                        min={0}
                        max={2}
                        step={0.1}
                        onValueChange={(value) => handleInputChange("imageBrightness", value[0])}
                        className="w-full"
                      />
                    </div>

                    {/* Image Contrast */}
                    <div className="space-y-4">
                      <Label className="flex items-center gap-2">
                        <Contrast className="h-4 w-4" />
                        Độ tương phản: {Math.round(messageData.imageContrast * 100)}%
                      </Label>
                      <Slider
                        value={[messageData.imageContrast]}
                        min={0}
                        max={2}
                        step={0.1}
                        onValueChange={(value) => handleInputChange("imageContrast", value[0])}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="style" className="space-y-6">
                {/* Background Color */}
                <div className="space-y-4">
                  <Label htmlFor="backgroundColor">Màu nền</Label>
                  <input
                    type="color"
                    id="backgroundColor"
                    value={messageData.backgroundColor}
                    onChange={(e) => handleColorSelect("backgroundColor", e.target.value)}
                    className="w-full p-2 bg-[#1e2030] border border-gray-700 rounded"
                  />
                </div>

                {/* Text Color */}
                <div className="space-y-4">
                  <Label htmlFor="textColor">Màu chữ</Label>
                  <input
                    type="color"
                    id="textColor"
                    value={messageData.textColor}
                    onChange={(e) => handleColorSelect("textColor", e.target.value)}
                    className="w-full p-2 bg-[#1e2030] border border-gray-700 rounded"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Section */}
          <div className="bg-[#1a1b29]/80 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
            <MessagePreview messageData={messageData} />
          </div>
        </div>
        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 px-8 py-3"
          >
            💾 Lưu tin nhắn
          </Button>
          <Button
            onClick={handleShare}
            className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:opacity-90 px-8 py-3"
          >
            🔗 Chia sẻ link
          </Button>
        </div>
      </div>
    </main>
  )
}

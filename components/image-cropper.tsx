"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Crop, X, Move, RotateCcw } from "lucide-react"

interface ImageCropperProps {
  imageFile: File
  onCropComplete: (croppedBlob: Blob) => void
  onCancel: () => void
}

interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

export default function ImageCropper({ imageFile, onCropComplete, onCancel }: ImageCropperProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 0, height: 0 })
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Tính toán crop area ban đầu khi ảnh được load
  useEffect(() => {
    if (imageLoaded && imageRef.current && containerRef.current) {
      const img = imageRef.current
      const container = containerRef.current

      const containerRect = container.getBoundingClientRect()
      const imgRect = img.getBoundingClientRect()

      // Tính tỷ lệ hiển thị
      const scaleX = img.naturalWidth / imgRect.width
      const scaleY = img.naturalHeight / imgRect.height

      setImageSize({ width: img.naturalWidth, height: img.naturalHeight })
      setContainerSize({ width: imgRect.width, height: imgRect.height })

      // Tính toán crop area mặc định (9:16) ở giữa ảnh
      const aspectRatio = 9 / 16
      let cropWidth = img.naturalHeight * aspectRatio
      let cropHeight = img.naturalHeight

      // Nếu chiều rộng vượt quá, điều chỉnh theo chiều rộng
      if (cropWidth > img.naturalWidth) {
        cropWidth = img.naturalWidth
        cropHeight = cropWidth / aspectRatio
      }

      const cropX = (img.naturalWidth - cropWidth) / 2
      const cropY = (img.naturalHeight - cropHeight) / 2

      setCropArea({
        x: cropX,
        y: cropY,
        width: cropWidth,
        height: cropHeight,
      })
    }
  }, [imageLoaded])

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()
    const scaleX = imageSize.width / rect.width
    const scaleY = imageSize.height / rect.height

    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    setIsDragging(true)
    setDragStart({ x, y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()
    const scaleX = imageSize.width / rect.width
    const scaleY = imageSize.height / rect.height

    const currentX = (e.clientX - rect.left) * scaleX
    const currentY = (e.clientY - rect.top) * scaleY

    const deltaX = currentX - dragStart.x
    const deltaY = currentY - dragStart.y

    setCropArea((prev) => {
      const newX = Math.max(0, Math.min(prev.x + deltaX, imageSize.width - prev.width))
      const newY = Math.max(0, Math.min(prev.y + deltaY, imageSize.height - prev.height))

      return {
        ...prev,
        x: newX,
        y: newY,
      }
    })

    setDragStart({ x: currentX, y: currentY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const resetCropArea = () => {
    if (!imageSize.width || !imageSize.height) return

    const aspectRatio = 9 / 16
    let cropWidth = imageSize.height * aspectRatio
    let cropHeight = imageSize.height

    if (cropWidth > imageSize.width) {
      cropWidth = imageSize.width
      cropHeight = cropWidth / aspectRatio
    }

    const cropX = (imageSize.width - cropWidth) / 2
    const cropY = (imageSize.height - cropHeight) / 2

    setCropArea({
      x: cropX,
      y: cropY,
      width: cropWidth,
      height: cropHeight,
    })
  }

  const handleCrop = useCallback(async () => {
    setIsProcessing(true)

    try {
      const canvas = canvasRef.current
      const image = imageRef.current

      if (!canvas || !image) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Đặt kích thước canvas theo crop area
      canvas.width = cropArea.width
      canvas.height = cropArea.height

      // Vẽ phần đã crop lên canvas
      ctx.drawImage(
        image,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        cropArea.width,
        cropArea.height,
      )

      // Chuyển đổi canvas thành blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            onCropComplete(blob)
          }
        },
        "image/jpeg",
        0.9,
      )
    } catch (error) {
      console.error("Error cropping image:", error)
      alert("Có lỗi xảy ra khi cắt ảnh")
    } finally {
      setIsProcessing(false)
    }
  }, [cropArea, onCropComplete])

  // Tính toán vị trí và kích thước crop overlay cho hiển thị
  const getCropOverlayStyle = () => {
    if (!containerSize.width || !containerSize.height || !imageSize.width || !imageSize.height) {
      return {}
    }

    const scaleX = containerSize.width / imageSize.width
    const scaleY = containerSize.height / imageSize.height

    return {
      left: `${cropArea.x * scaleX}px`,
      top: `${cropArea.y * scaleY}px`,
      width: `${cropArea.width * scaleX}px`,
      height: `${cropArea.height * scaleY}px`,
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1a1b29] p-6 rounded-xl border border-gray-800 max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto">
        <h3 className="text-lg font-semibold mb-4 text-center">Cắt ảnh theo tỷ lệ 9:16</h3>

        <div className="space-y-4">
          {/* Preview ảnh với crop area */}
          <div
            ref={containerRef}
            className="relative cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              ref={imageRef}
              src={URL.createObjectURL(imageFile) || "/placeholder.svg"}
              alt="Preview"
              className="max-w-full h-auto mx-auto"
              style={{ maxHeight: "400px" }}
              onLoad={handleImageLoad}
              draggable={false}
            />

            {/* Crop overlay */}
            {imageLoaded && (
              <>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50 pointer-events-none" />

                {/* Crop area */}
                <div
                  className="absolute border-2 border-cyan-400 bg-transparent pointer-events-none"
                  style={getCropOverlayStyle()}
                >
                  {/* Corner handles */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-cyan-400 rounded-full"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-cyan-400 rounded-full"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full"></div>

                  {/* Center indicator */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Move className="h-6 w-6 text-cyan-400" />
                  </div>
                </div>
              </>
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />

          <div className="text-center text-sm text-gray-400">
            <p>Kéo để di chuyển vùng cắt (tỷ lệ 9:16 được giữ nguyên)</p>
            <p>Vùng sáng sẽ được giữ lại, vùng tối sẽ bị cắt bỏ</p>
          </div>

          {/* Nút điều khiển */}
          <div className="flex justify-center mb-4">
            <Button
              variant="outline"
              onClick={resetCropArea}
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Đặt lại vị trí
            </Button>
          </div>

          {/* Nút hành động */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <X className="h-4 w-4 mr-2" />
              Hủy
            </Button>
            <Button
              onClick={handleCrop}
              disabled={isProcessing || !imageLoaded}
              className="flex-1 bg-gradient-to-r from-green-500 to-cyan-500 hover:opacity-90 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <Crop className="h-4 w-4 mr-2" />
                  Cắt ảnh
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

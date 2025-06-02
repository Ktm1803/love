import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Vui lòng nhập mô tả hình ảnh" }, { status: 400 })
    }

    // Simulate AI image generation (in real app, you would use services like:
    // - OpenAI DALL-E
    // - Midjourney API
    // - Stable Diffusion
    // - Replicate
    // For demo purposes, we'll return placeholder images with different themes

    const themes = [
      "sunset",
      "ocean",
      "mountain",
      "forest",
      "city",
      "space",
      "flowers",
      "abstract",
      "romantic",
      "dreamy",
      "colorful",
      "minimalist",
      "nature",
      "galaxy",
      "beach",
      "garden",
    ]

    const randomTheme = themes[Math.floor(Math.random() * themes.length)]
    const randomSize = Math.floor(Math.random() * 400) + 400 // 400-800

    // Generate a themed placeholder image URL
    const imageUrl = `https://picsum.photos/${randomSize}/${randomSize}?random=${Date.now()}`

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return NextResponse.json({
      success: true,
      imageUrl,
      prompt,
      message: `Đã tạo hình nền với chủ đề: ${prompt}`,
    })
  } catch (error) {
    console.error("Background generation error:", error)
    return NextResponse.json({ error: "Có lỗi xảy ra khi tạo hình nền" }, { status: 500 })
  }
}

import Link from "next/link"
import { Sparkles, Pencil, Palette, Music, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between relative overflow-hidden bg-[#0d0e17]">
      {/* Stars background */}
      <div className="absolute inset-0 z-0">
        <div className="stars"></div>
      </div>

      <div className="container mx-auto px-4 py-16 z-10 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mt-16 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text">
            Một Chút Ngọt Ngào – Một Trời Hạnh Phúc
          </h1>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Tạo ra những món quà tinh thần dễ thương, những lời chúc ngọt ngào, những điều bé nhỏ nhưng đầy ý nghĩa để
            khiến ai đó mỉm cười.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Button
              className="px-8 py-6 text-lg rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 hover:opacity-90 transition-all"
              asChild
            >
              <Link href="/create">
                <Sparkles className="mr-2 h-5 w-5" /> Tạo cho riêng bạn
              </Link>
            </Button>
            <Button
              variant="outline"
              className="px-8 py-6 text-lg rounded-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all"
              asChild
            >
              <Link href="/demo">
                <span className="mr-2">🎮</span> Xem Demo
              </Link>
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Card 1 */}
            <div className="bg-[#1a1b29]/80 backdrop-blur-sm p-8 rounded-xl border border-gray-800 flex flex-col items-center text-center">
              <div className="bg-[#1e2030] p-4 rounded-lg mb-4">
                <Pencil className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-400">Tùy Chỉnh Tin Nhắn</h3>
              <p className="text-gray-300">
                Nhập những dòng chữ ý nghĩa, lời chúc sinh nhật, hay thông điệp yêu thương
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#1a1b29]/80 backdrop-blur-sm p-8 rounded-xl border border-gray-800 flex flex-col items-center text-center">
              <div className="bg-[#1e2030] p-4 rounded-lg mb-4">
                <Palette className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-400">Chọn Màu Sắc</h3>
              <p className="text-gray-300">
                Tùy chỉnh màu sắc cho từng loại tin nhắn, tạo nên hiệu ứng thị giác độc đáo
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#1a1b29]/80 backdrop-blur-sm p-8 rounded-xl border border-gray-800 flex flex-col items-center text-center">
              <div className="bg-[#1e2030] p-4 rounded-lg mb-4">
                <Music className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-400">Thêm bài hát</h3>
              <p className="text-gray-300">
                Tải lên âm thanh yêu thích của bạn từ máy tính hoặc chọn từ thư viện âm thanh có sẵn.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#1a1b29]/80 backdrop-blur-sm p-8 rounded-xl border border-gray-800 flex flex-col items-center text-center">
              <div className="bg-[#1e2030] p-4 rounded-lg mb-4">
                <Link2 className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-400">Chia Sẻ Dễ Dàng</h3>
              <p className="text-gray-300">Nhận link chia sẻ ngay lập tức, gửi cho bạn bè và gia đình</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-gray-400 text-sm z-10">
        © 2024 Bản quyền thuộc về Pink Dev Studio
      </footer>

      {/* Floating heart icon */}
      <div className="fixed bottom-6 right-6 z-20">
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-full shadow-lg shadow-pink-500/20 cursor-pointer hover:scale-110 transition-transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>
      </div>
    </main>
  )
}

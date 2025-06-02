import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import MessagePreview from "@/components/message-preview"

export default function DemoPage() {
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
            Demo Tin Nhắn Ngọt Ngào
          </h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-[#1a1b29]/80 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
            <div
              className="bg-[#0d0e17] rounded-lg overflow-hidden relative flex items-center justify-center mx-auto"
              style={{
                aspectRatio: "9/16",
                maxWidth: "300px",
                width: "100%",
              }}
            >
              <MessagePreview isDemo={true} />
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800" asChild>
                <Link href="/create">Tạo tin nhắn của riêng bạn</Link>
              </Button>
              <Button className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:opacity-90">
                <Share2 className="h-4 w-4 mr-2" /> Chia sẻ demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


import Image from "next/image";

export function AppPromo() {
  return (
    <section id="app-promo" className="w-full py-16 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h2 className="font-headline text-3xl font-bold tracking-tighter transition-colors duration-300 hover:text-accent sm:text-4xl md:text-5xl">
                Get Our App
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Download our mobile app for a seamless learning experience on the go. Access courses, materials, and get instant notifications.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="relative h-64 w-64 rounded-xl shadow-xl overflow-hidden">
             <Image
                src="https://i.postimg.cc/d16pLwYc/qr-code-placeholder.png"
                alt="App QR Code"
                fill
                className="object-cover"
                data-ai-hint="QR code"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

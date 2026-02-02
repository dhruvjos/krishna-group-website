export function MotivationalQuote() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out delay-100">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote className="font-headline text-2xl font-semibold italic text-foreground/80 md:text-3xl lg:text-4xl">
            <p>"The secret of change is to focus all of your energy, not on fighting the old, but on building the new."</p>
          </blockquote>
          <cite className="mt-6 block text-lg font-medium text-muted-foreground not-italic">
            — Socrates
          </cite>
        </div>
      </div>
    </section>
  );
}

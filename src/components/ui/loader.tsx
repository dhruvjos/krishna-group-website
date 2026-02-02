export function Loader() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-24 w-24 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" />
        <span className="text-5xl" role="img" aria-label="loading brain">
          🧠
        </span>
      </div>
    </div>
  );
}

/** Shared pending state, styled like the app's verb highlights. */
export default function AuthLoading() {
  return (
    <span role="status" aria-live="polite" className="relative isolate inline-flex items-center justify-center px-2 py-0.5 text-sm font-medium leading-6 text-white">
      <span aria-hidden="true" className="absolute inset-0 -z-10 rounded-sm bg-red-500 motion-safe:animate-pulse" />
      loading
    </span>
  );
}

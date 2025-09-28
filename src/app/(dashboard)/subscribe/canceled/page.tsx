export default function SubscribeCanceledPage() {
  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-red-500">Payment canceled</h1>
      <p className="text-muted-foreground">
        You didn’t finish checking out. Come back anytime when you’re ready.
      </p>
      <a href="/subscribe" className="underline">Back to Subscribe</a>
    </main>
  );
}

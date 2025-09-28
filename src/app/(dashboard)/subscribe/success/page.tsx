export default function SubscribeSuccessPage() {
  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Thanks for subscribing!</h1>
      <p className="text-muted-foreground">
        Your subscription was successful. You now have access to all Pro features.
      </p>
      <a href="/home" className="underline">Go to Home</a>
    </main>
  );
}

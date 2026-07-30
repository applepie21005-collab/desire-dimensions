export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Desire Dimensions 🔥</h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
          Discover your personality through 50 entertaining questions.
        </p>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition">
          Start Quiz
        </button>
      </div>
    </div>
  );
}

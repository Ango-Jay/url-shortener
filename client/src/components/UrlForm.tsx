import { useState, type FormEvent } from "react";
import { ArrowRight, Search } from "lucide-react";
import { createAlias, type CreateAliasResponse } from "../lib/api";
import { ApiError } from "../lib/http";

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CreateAliasResponse | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const created = await createAlias(url.trim());
      setResult(created);
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-3"
      >
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">URL to shorten</span>
          <Search
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-surface/50"
          />
          <input
            type="url"
            name="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com"
            required
            disabled={loading}
            className="w-full rounded-xl border border-nightBorder bg-nightRaised py-3.5 pl-12 pr-4 text-base text-surface outline-none transition placeholder:text-surface/40 focus:border-lightPurple focus:bg-nightRaised/50 focus:ring-2 focus:ring-lightPurple/40 disabled:opacity-60"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="mx-auto flex w-full max-w-[200px] items-center justify-center gap-2 rounded-xl bg-lightPurple px-6 py-3.5 text-base font-semibold text-surface transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lightPurple disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Shortening…" : "Shorten"}
          {!loading && <ArrowRight aria-hidden className="size-5" />}
        </button>
      </form>

      {error && (
        <p className="text-center text-sm text-red-300" role="alert">
          {error}
        </p>
      )}

      {result && (
        <div className="rounded-xl border border-nightBorder bg-nightRaised px-4 py-3 text-left">
          <p className="text-xs uppercase tracking-wide text-surface/50">
            Short link
          </p>
          <a
            href={result.shortLink}
            className="mt-1 block break-all font-medium text-lightPurple hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            {result.shortLink}
          </a>
        </div>
      )}
    </div>
  );
}

import { useState, type FormEvent } from "react";
import { ArrowRight, Search } from "lucide-react";

export default function UrlForm() {
  const [url, setUrl] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl flex-col gap-3"
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
          className="w-full rounded-xl border border-nightBorder bg-nightRaised focus:bg-nightRaised/50 py-3.5 pl-12 pr-4 text-base text-surface outline-none transition placeholder:text-surface/40 focus:border-lightPurple focus:ring-2 focus:ring-lightPurple/40"
        />
      </label>
      <button
        type="submit"
        className="flex w-full max-w-[200px] mx-auto items-center justify-center gap-2 rounded-xl bg-lightPurple px-6 py-3.5 text-base font-semibold text-surface transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lightPurple"
      >
        Shorten
        <ArrowRight aria-hidden className="size-5" />
      </button>
    </form>
  );
}

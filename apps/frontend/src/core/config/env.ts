export const env = {
  BACKEND_URL:
    typeof window === "undefined"
      ? process.env.BACKEND_URL ||
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        "http://localhost:4000"
      : process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000",
} as const;

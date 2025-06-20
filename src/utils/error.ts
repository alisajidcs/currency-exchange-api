// Utility function to extract error messages from various error shapes
export function getErrorMessage(err: unknown): string {
  if (typeof err === "object" && err !== null && "response" in err) {
    const response = (err as { response?: { data?: { error?: string } } })
      .response;
    return response?.data?.error || "Failed to fetch latest rates.";
  }
  if (err instanceof Error) return err.message;
  return "Unknown error";
}

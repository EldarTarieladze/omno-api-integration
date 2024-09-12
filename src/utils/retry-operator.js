export async function retryOperation(
  operation,
  maxRetries = process.env.RETRY_MAX_ATTEMPTS,
  initialDelay = process.env.RETRY_INITIAL_DELAY
) {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt} failed. Retrying...`);
      if (attempt < maxRetries) {
        await new Promise((resolve) =>
          setTimeout(resolve, initialDelay * Math.pow(2, attempt - 1))
        );
      }
    }
  }
  throw lastError;
}

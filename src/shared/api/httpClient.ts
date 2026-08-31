export class ApiError extends Error {
  readonly status: number | null

  constructor(message: string, status: number | null = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function fetchJson(url: string, signal?: AbortSignal): Promise<unknown> {
  let response: Response

  try {
    response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error
    }
    throw new ApiError('Unable to reach the server. Check your connection and try again.')
  }

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}.`, response.status)
  }

  try {
    return (await response.json()) as unknown
  } catch {
    throw new ApiError('The server returned an unexpected response.')
  }
}

export async function getDestinationImage(
  destination: string,
): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(destination)}+landmark&orientation=landscape&client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
    );
    const data = await res.json();
    return data?.urls?.regular || null;
  } catch {
    return null;
  }
}

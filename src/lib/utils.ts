export const VERSION_PRIORITY = ['2.1', '2.0.2', '2.0.1', '2.0', '1.5', '1.0'];

export function getLatestVersion(versions: Record<string, string>): string {
  const availableVersions = Object.keys(versions);
  for (const priority of VERSION_PRIORITY) {
    if (availableVersions.includes(priority)) {
      return priority;
    }
  }
  // Fallback to the first available version if none of the priorities match
  return availableVersions[0] || '';
}

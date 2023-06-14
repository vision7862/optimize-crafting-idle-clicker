
export function computeTargetFromFame(fame: number, level: number): number {
  return 10 ** (fame + level - 1);
}

export function getCostOfScientists(numScientists: number): number {
  let cost = 0;
  for (let i = 2; i < numScientists; i++) {
    cost += 50 * (1.15 ** (i - 2));
  }
  return cost;
}

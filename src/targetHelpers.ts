
export function computeTargetFromFame(fame: number, level: number): number {
  return 10 ** (fame + level - 1);
}

export function getCostOfScientists(numScientists: number): number {
  let cost = 0;
  for (let i = 0; i < numScientists; i++) {
    cost += 5e1 * (1.15 ** i);
  }
  return cost;
}

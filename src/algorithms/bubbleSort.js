// Bubble Sort: generates snapshots (steps) of the array for animation.
export function bubbleSort(arr) {
  const steps = [];
  const a = [...arr];

  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      // record state before a potential swap
      steps.push({ array: [...a], active: [j, j + 1], swap: false, fixed: new Set() });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({ array: [...a], active: [j, j + 1], swap: true, fixed: new Set() });
      }
    }
    // mark the last element of this pass as fixed
    steps.push({ array: [...a], active: [], swap: false, fixed: new Set([a.length - i - 1]) });
  }
  steps.push({ array: [...a], active: [], swap: false, fixed: new Set([...Array(a.length).keys()]) });
  return steps;
}

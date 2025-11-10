export function selectionSort(arr) {
  const steps = [];
  const a = [...arr];

  for (let i = 0; i < a.length; i++) {
    let min = i;
    for (let j = i + 1; j < a.length; j++) {
      steps.push({ array: [...a], active: [min, j], swap: false, fixed: new Set() });
      if (a[j] < a[min]) min = j;
    }
    if (min !== i) {
      [a[i], a[min]] = [a[min], a[i]];
      steps.push({ array: [...a], active: [i, min], swap: true, fixed: new Set([i]) });
    }
  }
  steps.push({ array: [...a], active: [], swap: false, fixed: new Set([...Array(a.length).keys()]) });
  return steps;
}

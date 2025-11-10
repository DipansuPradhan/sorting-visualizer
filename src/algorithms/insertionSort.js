export function insertionSort(arr) {
  const steps = [];
  const a = [...arr];

  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;

    while (j >= 0 && a[j] > key) {
      steps.push({ array: [...a], active: [j, j + 1], swap: false, fixed: new Set() });
      a[j + 1] = a[j];
      steps.push({ array: [...a], active: [j, j + 1], swap: true, fixed: new Set() });
      j--;
    }
    a[j + 1] = key;
    steps.push({ array: [...a], active: [j + 1], swap: false, fixed: new Set([j + 1]) });
  }
  steps.push({ array: [...a], active: [], swap: false, fixed: new Set([...Array(a.length).keys()]) });
  return steps;
}

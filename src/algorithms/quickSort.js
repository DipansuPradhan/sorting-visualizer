export function quickSort(arr) {
  const steps = [];
  const a = [...arr];

  function partition(low, high) {
    const pivot = a[high];
    let i = low;

    for (let j = low; j < high; j++) {
      steps.push({ array: [...a], active: [j, high], swap: false, fixed: new Set() });
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        steps.push({ array: [...a], active: [i, j], swap: true, fixed: new Set() });
        i++;
      }
    }
    [a[i], a[high]] = [a[high], a[i]];
    steps.push({ array: [...a], active: [i, high], swap: true, fixed: new Set([i]) });
    return i;
  }

  function qs(low, high) {
    if (low < high) {
      const p = partition(low, high);
      qs(low, p - 1);
      qs(p + 1, high);
    }
  }

  qs(0, a.length - 1);
  steps.push({ array: [...a], active: [], swap: false, fixed: new Set([...Array(a.length).keys()]) });
  return steps;
}

// Merge Sort that logs overwrite steps and fixed ranges.
export function mergeSort(arr) {
  const steps = [];
  const a = [...arr];

  function merge(l, m, r) {
    const left = a.slice(l, m + 1);
    const right = a.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
      steps.push({ array: [...a], active: [k], swap: false, fixed: new Set() });
      if (left[i] <= right[j]) {
        a[k] = left[i++];
      } else {
        a[k] = right[j++];
      }
      steps.push({ array: [...a], active: [k], swap: true, fixed: new Set() });
      k++;
    }
    while (i < left.length) {
      steps.push({ array: [...a], active: [k], swap: false, fixed: new Set() });
      a[k] = left[i++];
      steps.push({ array: [...a], active: [k], swap: true, fixed: new Set() });
      k++;
    }
    while (j < right.length) {
      steps.push({ array: [...a], active: [k], swap: false, fixed: new Set() });
      a[k] = right[j++];
      steps.push({ array: [...a], active: [k], swap: true, fixed: new Set() });
      k++;
    }

    // mark the merged segment as fixed for that moment
    steps.push({ array: [...a], active: [], swap: false, fixed: new Set(Array.from({length: r - l + 1}, (_, t) => l + t)) });
  }

  function sort(l, r) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    sort(l, m);
    sort(m + 1, r);
    merge(l, m, r);
  }

  sort(0, a.length - 1);
  steps.push({ array: [...a], active: [], swap: false, fixed: new Set([...Array(a.length).keys()]) });
  return steps;
}

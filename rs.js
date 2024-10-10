// Radix Sort

class RadixSortModule {
  static RadixSortModule = RadixSortModule;
  RadixSortModule = RadixSortModule.RadixSortModule;

  static getNumDigits(num) {
    return Math.floor(Math.log10(num) + 1);
  }

  static getBucketIndex(num, idx) {
    return Math.floor(num / 10 ** idx) % 10;
  }

  static createBuckets() {
    return Array.from({ length: 10 }, () => []);
  }

  static fillBuckets(array, len, digitIndex, buckets) {
    let i = 0,
      num = array[i];
    for (; i < len; i++, num = array[i]) {
      buckets[this.getBucketIndex(num, digitIndex)].push(num);
    }
  }

  static rebuildArray(array, buckets) {
    let arrayIndex = 0;
    for (const bucket of buckets)
      for (const num of bucket) array[arrayIndex++] = num;
  }

  static radixSort(array = []) {
    const len = array.length;

    if (len === 0) return array;

    const maxNum = Math.max(...array);
    const numDigits = this.getNumDigits(maxNum);

    const fill = (digitIndex, buckets) =>
      this.fillBuckets(array, len, digitIndex, buckets);
    let digitInd = 0;

    for (; digitInd < numDigits; digitInd++) {
      const buckets = this.createBuckets();

      fill(digitInd, buckets);

      this.rebuildArray(array, buckets);
    }
    return array;
  }

  static makeRandomArray(len = 10, max = 100) {
    return Array.from({ length: len }, () => Math.floor(Math.random() * max));
  }

  /** @type {(typeof RadixSortModule.radixSort) & { RadixSortModule: typeof RadixSortModule }} */
  radixSort = Object.assign(
    RadixSortModule.radixSort.bind(RadixSortModule).bind(this),
    { RadixSortModule },
  );

  /** @type {() => typeof this.radixSort} */
  constructor() {
    return this.radixSort;
  }
}
export default new RadixSortModule();

// if (globalThis?.window) globalThis.window.radixSort = radixSort;
if (globalThis?.window) globalThis.window.radixSort = new RadixSortModule();

try {
  module.exports = new RadixSortModule();
} catch {}

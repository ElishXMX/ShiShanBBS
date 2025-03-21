import { onUnmounted, ref } from 'vue';

export function useDebounce(fn, delay = 300) {
  const timer = ref(null);

  const debouncedFn = (...args) => {
    clearTimeout(timer.value);
    timer.value = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };

  onUnmounted(() => {
    clearTimeout(timer.value);
  });

  return debouncedFn;
}
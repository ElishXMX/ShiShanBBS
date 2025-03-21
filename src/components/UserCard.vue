<template>
    <h1>usercard</h1>
  <div class="user-card-container">
    <div class="parallax">
      <div class="parallax-rotator">
        <div class="parallax-inner">
          <img :src="user.avatar" class="user-avatar" />
          <div class="parallax-layers">
            <img v-for="(layer, index) in parallaxLayers" :key="index" 
                 :src="layer" :style="`--parallaxOffset: ${index * 2 - 4}`" />
          </div>
          <div class="parallax-highlight"></div>
        </div>
        <div class="parallax-shadow"></div>
      </div>
    </div>
    <div class="user-info">
      <h3>{{ user.name }}</h3>
      <p class="region">{{ user.region }}</p>
      <p class="occupation">{{ user.occupation }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps,onMounted,onBeforeMount,onBeforeUnmount } from 'vue'
import { throttle, debounce } from 'lodash-es'

const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => ({
      avatar: '',
      name: '匿名用户',
      region: '未知地区',
      occupation: '未知职业'
    })
  },
  parallaxLayers: {
    type: Array,
    default: () => [
      'https://pic.stackoverflow.wiki/uploadImages/27/38/192/45/2022/07/30/11/08/5c393b2d-bb41-44af-a5ce-e492e88571b7.svg',
      'https://pic.stackoverflow.wiki/uploadImages/27/38/192/45/2022/07/30/11/08/9bb015db-ecdf-48b0-8d4a-a725a97c9c97.svg',
      'https://pic.stackoverflow.wiki/uploadImages/27/38/192/45/2022/07/30/11/08/13b0cd67-b397-48fd-9ce9-e7538708460e.svg'
    ]
  }
})

const parallaxEl = ref(null)

const handleMouseMove = throttle((e) => {
  const { clientX, clientY } = e;
  const computedStyle = getComputedStyle(parallaxEl.value);
  const maxRotate = computedStyle.getPropertyValue('--maxRotate');

  const { width, height, left, top } = parallaxEl.value.getBoundingClientRect();
  const centerX = width / 2;
  const centerY = height / 2;
  const offsetX = clientX - left;
  const offsetY = clientY - top;

  const rotateX = (maxRotate * (offsetY - centerY)) / centerY * -1;
  const rotateY = (maxRotate * (offsetX - centerX)) / centerX;

  parallaxEl.value.style.setProperty('--rotateX', rotateX);
  parallaxEl.value.style.setProperty('--rotateY', rotateY);
}, 150);

const handleMouseLeave = debounce(() => {
  parallaxEl.value.style.setProperty('--rotateX', 0);
  parallaxEl.value.style.setProperty('--rotateY', 0);
}, 200);

onMounted(() => {
  if (parallaxEl.value) {
    parallaxEl.value.addEventListener('mousemove', handleMouseMove);
    parallaxEl.value.addEventListener('mouseleave', handleMouseLeave);
  }
});

onBeforeUnmount(() => {
  if (parallaxEl.value) {
    parallaxEl.value.removeEventListener('mousemove', handleMouseMove);
    parallaxEl.value.removeEventListener('mouseleave', handleMouseLeave);
  }
});
</script>

<style scoped>
.user-card-container {
  width: 280px;
  height: 380px;
  position: relative;
  cursor: pointer;
}

.parallax {
  --maxRotate: 8;
  width: 100%;
  height: 70%;
}

.user-avatar {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
}

/* 保留原有视差样式，调整尺寸参数 */
</style>
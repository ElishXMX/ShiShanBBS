<template>
  <div 
    class="card-3d-container"
    :style="{ perspective: `${perspective}px` }"
    @mousemove="handleMouseMove"
  >
    <div 
      class="card-3d"
      :class="{ 'is-flipped': isFlipped }"
      :style="cardTransform"
    >
      <!-- 正面 -->
      <div class="card-face front">
        <slot name="front">
          <div class="user-card" @click="handleUserClick(user.id)">
            <div class="user-avatar">
              <img :src="user.avatar" alt="Avatar" />
            </div>
            <div class="user-info">
              <h4>{{ user.name }}</h4>
              <p class="region">{{ user.region }}</p>
              <el-divider class="divider" />
              <p class="occupation">{{ user.occupation }}</p>
              <p class="register-date">注册时间：{{ user.registerDate }}</p>
            </div>
          </div>
        </slot>
        <div class="glare" :style="glareStyle"></div>
      </div>
      
      <!-- 背面 -->
      <div class="card-face back">
        <slot name="back">
          <div class="user-intro">
            <h4>自我介绍</h4>
            <p>{{ user.introduction || '暂无介绍' }}</p>
          </div>
        </slot>
        <div class="glare" :style="glareStyle"></div>
      </div>

      <button 
        class="flip-btn top-right" 
        @click.stop="toggleFlip"
        @mouseenter="handleButtonHover(true)"
        @mouseleave="handleButtonHover(false)"
      >
        <el-icon :size="20"><Refresh /></el-icon>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { throttle } from 'lodash-es'

const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      avatar: '',
      name: '匿名用户',
      region: '未知地区',
      occupation: '未知职业',
      registerDate: '2023-01-01',
      introduction: ''
    })
  },
  direction: {
    type: String,
    default: 'y',
    validator: (val) => ['x', 'y'].includes(val)
  },
  trigger: {
    type: String,
    default: 'click',
    validator: (val) => ['click', 'hover'].includes(val)
  },
  perspective: {
    type: Number,
    default: 1500
  }
})

const emit = defineEmits(['user-click'])

const isFlipped = ref(false)
const rotateX = ref(0)
const rotateY = ref(0)
const glarePos = ref({ x: 50, y: 50 })
const buttonHover = ref(false)

// 动态变换计算
const cardTransform = computed(() => {
  const transform = [
    `rotateX(${rotateX.value}deg)`,
    `rotateY(${rotateY.value}deg)`,
    isFlipped.value ? 'rotateY(180deg)' : ''
  ].join(' ')
  
  return {
    transform,
    transition: isFlipped.value ? 'transform 0.6s' : 'transform 0.1s'
  }
})

const glareStyle = computed(() => ({
  background: `radial-gradient(circle at ${glarePos.value.x}% ${glarePos.value.y}%, 
    rgba(255,255,255,0.8) 0%, 
    rgba(255,255,255,0.6) 20%, 
    transparent 60%)`
}))

// 事件处理
const handleUserClick = (id) => {
  emit('user-click', id)
}

const toggleFlip = () => {
  if (props.trigger === 'click') isFlipped.value = !isFlipped.value
}

const handleButtonHover = (isHovering) => {
  buttonHover.value = isHovering
  if (isHovering) {
    rotateX.value *= 1.2
    rotateY.value *= 1.2
  }
}

// 鼠标移动处理（带节流）
const handleMouseMove = throttle((event) => {
  if (props.trigger !== 'hover') return
  
  const { clientX, clientY } = event
  const rect = event.currentTarget.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  
  rotateX.value = ((clientY - centerY) / rect.height) * 10
  rotateY.value = ((clientX - centerX) / rect.width) * 10
  
  glarePos.value = {
    x: ((clientX - rect.left) / rect.width) * 100,
    y: ((clientY - rect.top) / rect.height) * 100
  }
}, 50)

// 自动清理节流函数
watchEffect((onInvalidate) => {
  onInvalidate(() => {
    handleMouseMove.cancel()
  })
})
</script>

<style scoped>
/* 保持原有样式，优化部分细节 */
.card-3d-container {
  position: relative;
  width: 300px;
  height: 400px;
  cursor: pointer;
}

.user-card {
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.user-info {
  text-align: center;
  
  h4 {
    margin: 0 0 12px;
    font-size: 1.4em;
    color: #333;
  }
  
  .region {
    color: #666;
    font-size: 0.9em;
  }
  
  .occupation {
    color: #409eff;
    font-weight: 500;
    margin: 8px 0;
  }
  
  .register-date {
    color: #999;
    font-size: 0.8em;
  }
}

.user-intro {
  padding: 20px;
  text-align: left;
  
  p {
    line-height: 1.6;
    color: #666;
  }
}

/* 其他保持原有样式 */
</style>
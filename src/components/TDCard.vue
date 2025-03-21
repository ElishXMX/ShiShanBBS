<template>
    <div 
      class="card-3d-container"
      :style="{ perspective: `${perspective}px` }"
    >
      <div 
        class="card-3d"
        :class="{ 'is-flipped': isFlipped }"
        :style="cardTransform"
      >
        <!-- 正面 -->
        <div class="card-face front">
          <slot name="front">
            <el-card class="user-card" @click="handleUserClick(user.id)">
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
            </el-card>
          </slot>
          <div class="glare" :style="glareStyle"></div>
        </div>
        
        <!-- 背面 -->
        <div class="card-face back">
          <slot name="back">
            
            自我介绍
          </slot>
          <div class="glare" :style="glareStyle"></div>
        </div>
        <button 
          class="flip-btn top-right" 
          @click.stop="toggleFlip"
          @mouseenter="handleButtonHover(true)"
          @mouseleave="handleButtonHover(false)">
          <el-icon :size="20"><Refresh /></el-icon>
        </button>
        <button 
          class="flip-btn bottom-left"
          @click.stop="toggleFlip"
          @mouseenter="handleButtonHover(true)"
          @mouseleave="handleButtonHover(false)">
          <el-icon :size="20"><Refresh /></el-icon>
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { throttle } from 'lodash-es'

  
  
  const props = withDefaults(defineProps<{
  user: any;
  direction?: 'x' | 'y';
  trigger?: 'click' | 'hover';
  perspective?: number;
}>(), {
  direction: 'y',
  trigger: 'click',
  perspective: 1500
})
import { useRouter } from 'vue-router';

const router = useRouter(); // 应该使用 useRouter 来获取路由实例
const handleUserClick = (userId) => {
  console.log(`Clicked on user with ID: ${userId}`);
  // router.push(`/user/${userId}`);
};
  
  const isFlipped = ref(false)
  const rotateX = ref(0)
  const rotateY = ref(0)
  const glarePos = ref({ x: 50, y: 50 })

  // 计算3D变换矩阵
  const cardTransform = computed(() => {
    // 修正 transform 字符串拼接，去除多余换行
    return {
      transform: `${isFlipped.value ? 'rotateY(180deg)' : ''} rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)`,
      transition: isFlipped.value ? 'transform 0.6s' : 'transform 0.1s'
    }
  })
  
  const toggleFlip = () => {
    if(props.trigger === 'click') isFlipped.value = !isFlipped.value
  }

  // 处理 hover 触发翻转
  if (props.trigger === 'hover') {
    const container = ref<HTMLElement | null>(null)
    const handleMouseEnter = () => {
      if (props.trigger === 'hover') isFlipped.value = true
    }
    const handleMouseLeave = () => {
      if (props.trigger === 'hover') isFlipped.value = false
    }
  }

  const buttonHover = ref(false)
const handleButtonHover = (isHovering: boolean) => {
  buttonHover.value = isHovering
  rotateX.value = isHovering ? rotateX.value * 1.2 : rotateX.value
  rotateY.value = isHovering ? rotateY.value * 1.2 : rotateY.value
}
  </script>
  
  <style scoped>
  .card-3d-container {
    position: relative;
    width: 300px;
    height: 400px;
  }
  
  .card-3d {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s;
  }
  
  .card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 10px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.12);
    overflow: hidden;
  }
  
  .back {
    transform: rotateY(180deg);
  }
  
  .glare {
    position: absolute;
    width: 150%;
    height: 150%;
    filter: blur(30px);
    pointer-events: none;
    opacity: 0.2;
    transition: opacity 0.3s;
  }
  
  /* 悬停触发逻辑 */
  .card-3d-container:hover .card-3d {
    @apply shadow-lg;
    .glare {
      opacity: 0.4;
    }
  }
  
.user-card {
  width: 100%;
  height: 400px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
}

.el-carousel__container {
  width: 100% !important;
}

.el-carousel__item {
  display: flex !important;
  justify-content: center !important;
}

.user-avatar {
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin:0px;
}

.user-avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  position: relative;
  padding: 20px;
  background: linear-gradient(145deg, rgba(255,255,255,0.9), rgba(245,247,250,0.9));
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  margin-top: -30px;
  z-index: 10;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h4 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.4em;
    color: #303133;
    margin-bottom: 12px;

    &::before {
      content: '';
      display: inline-block;
      width: 24px;
      height: 24px;
      /* background: url('@/assets/user-icon.svg') no-repeat center; */
    }
  }

  .region {
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    background: rgba(64,158,255,0.1);
    border-radius: 20px;
    font-size: 0.9em;
  }
}

.user-info h4 {
  margin: 8px 0;
  font-size: 1.2em;
}

.card-face {
  background: linear-gradient(145deg, #f0f2f5 20%, #ffffff 80%);
}
.flip-btn {
  position: absolute;
  z-index: 20;
  padding: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.flip-btn:hover {
  transform: scale(1.1) rotate(15deg);
  box-shadow: 0 4px 12px rgba(64,158,255,0.3);
}
.top-right {
  top: 16px;
  right: 16px;
}
.bottom-left {
  bottom: 16px;
  left: 16px;
}

  </style>
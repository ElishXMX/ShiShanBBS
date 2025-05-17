<template>
  <div 
    class="card-container"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :style="cardStyles"
  >
    <!-- <div class="overlay" v-if="showOverlay" @click="closeOverlay">
      <div class="overlay-content">
        <h3>课题组简介</h3>
        <p>{{ person.member_introduction }}</p>
        <button class="close-btn" @click.stop="closeOverlay">关闭</button>
      </div>
    </div> -->
    
    <div class="new-card">
      <div class="circle">
        <img src="../assets/老师教师男人.svg" alt="">
      </div>
      <div class="info">
        <span class="name">{{ person.name }}</span>
        <p class="member_position">{{ person.memberPosition}}</p>
        <span class="fenge"></span>
        <p class="member_introduction">{{ person.memberIntroduction}}</p>
        <!-- <p class="teachership">{{ person.teachership}}</p> -->
      </div>
      <!-- <button class="intro-btn" @click="redirectToWebUrl">查看课题组简介</button> -->
<button class="cta" @click="redirectToWebUrl(person.userId)">
  <span class="span">点击跳转至课题组网站</span>
  <span class="second">
    <svg
      width="50px"
      height="20px"
      viewBox="0 0 66 43"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g
        id="arrow"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <path
          class="one"
          d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
          fill="#FFFFFF"
        ></path>
        <path
          class="two"
          d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
          fill="#FFFFFF"
        ></path>
        <path
          class="three"
          d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
          fill="#FFFFFF"
        ></path>
      </g>
    </svg>
  </span>
</button>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
  person: {
    type: Object,
  }
})
// console.log(props.person, props.person.pic)

const rotateX = ref(0);
const rotateY = ref(0);
const isHovered = ref(false);
const showOverlay = ref(false);

const openOverlay = () => {
  showOverlay.value = true;
};

const closeOverlay = () => {
  showOverlay.value = false;
};

const handleMouseEnter = () => {
  isHovered.value = true;
};

const handleMouseLeave = () => {
  isHovered.value = false;
  rotateX.value = 0;
  rotateY.value = 0;
}
const redirectToWebUrl=(userId)=>{
  console.log(userId)
  // router.push(`/UserProfile/${userId}`)
}

</script>

<style scoped>
.card-container {
  perspective: 1000px;
  transform-style: preserve-3d;
}

/* 新卡片样式 */
.new-card {
  width: 600px;
  height: 400px;
  position: relative;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  border-radius: 16px;
  overflow: hidden;
  margin-top: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transform: translateZ(20px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.new-card:hover {
  transform: translateZ(40px);
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
}

.new-card::before {
  content: '';
  position: absolute;
  top: 0;
  width: 600px;
  height: 100px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background: linear-gradient(to bottom left, #e0f2fe, #fed7aa, #FFA500);
  transition: all 0.5s;
}

.new-card:hover::before {
  transform: scale(0.95);
  height: 400px;
  width: 600px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}

.circle {
  width: 120px;
  height: 120px;
  background: #FFA500;
  margin-top: 32px;
  border-radius: 50%;
  border: 16px solid #f5f5f5;
  z-index: 1;
  transition: all 0.5s;
}
.circle img{
  width: 100%;
}
.fenge{
    display: block;
    width: 70%;
    margin: auto;
    height: 4px;
    background-color: #4bb344;
    border-radius: 2px;
    
}

.new-card:hover .circle {
  transform: scale(1.2) translate(-140px, 20px);
}

.new-card:hover .fenge {
  margin: 0px;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: normal;
  z-index: 1;
  transition: all 0.3s;
  width:50%; 
  max-height: 250px;
   max-height: 250px;
   overflow: hidden;
   padding-bottom: 20px;
}
.new-card:hover .info {
  transform: translateY(-140px) translateX(120px);
  align-items: flex-start;
  transition: all 0.3s ; /* 添加线性过渡效果 */
}
.new-card:hover .info p {
  text-align: left;
  width: 100%;
  transition: all 0.3s ; /* 添加线性过渡效果 */
}

.name {
  font-size: 24px;
  font-weight: 600;
}

.member_position {
  font-size: 20px;
  background: #666;
  font-weight: 600;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.member_introduction{
  max-height: 100px;
  font-size: 20px;
  background: #878787fc;
  font-weight: 400;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.follow-btn {
  background: #FFA500;
  padding: 4px 16px;
  color: #f5f5f5;
  border-radius: 4px;
  z-index: 1;
  transition: all 0.5s;
  text-decoration: none;
}

.follow-btn:hover {
  transform: scale(1.25);
  background: #3b82f6;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 1400px;
  height: 1400px;
  background: rgba(0, 0, 0, 0.7);
  /* display: flex;
  justify-content: center;
  align-items: center; */
  z-index: 0;
}

.overlay-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 80vw;
  max-height: 80vh;
  width: 90%;
  overflow: auto;
}

.close-btn {
  margin-top: 20px;
  padding: 8px 16px;
  background: #FFA500;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
/* From Uiverse.io by mobinkakei */ 
.cta {
  display: flex;
  padding: 11px 22px;
  text-decoration: none;
  font-size: 15px;
  color: white;
  background: #4bb344;
  transition: 0.5s;
  box-shadow: 6px 6px 0 black;
  transform: skewX(-15deg);
  border: none;
  cursor: pointer;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 250%) skewX(-15deg);
  opacity: 0;
}
.new-card:hover .cta{
  opacity: 1;
}

.cta:focus {
  outline: none;
}

.cta:hover {
  transition: 0.5s;
  box-shadow: 10px 10px 0 #fbc638;
}

.cta .second {
  transition: 0.5s;
  margin-right: 0px;
}

.cta:hover .second {
  transition: 0.5s;
  margin-right: 45px;
}

.span {
  transform: skewX(15deg);
}

.second {
  width: 20px;
  margin-left: 30px;
  position: relative;
  top: 12%;
}

.one {
  transition: 0.4s;
  transform: translateX(-60%);
}

.two {
  transition: 0.5s;
  transform: translateX(-30%);
}

.cta:hover .three {
  animation: color_anim 1s infinite 0.2s;
}

.cta:hover .one {
  transform: translateX(0%);
  animation: color_anim 1s infinite 0.6s;
}

.cta:hover .two {
  transform: translateX(0%);
  animation: color_anim 1s infinite 0.4s;
}

@keyframes color_anim {
  0% {
    fill: white;
  }

  50% {
    fill: #fbc638;
  }

  100% {
    fill: white;
  }
}


</style>
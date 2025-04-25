<template>
  <el-container>
      <el-main class="center-content">
          <div class="separator">
            <img src="../assets/地图.svg" alt="Milho Separator" class="separator-image" />
            <h2>主要成员分布</h2>
          </div>
          <div class="map-container" style="height: 70vh;">
              <div ref="chinaMap" id="chinaMap" style="width: 80%;height:100%;margin: auto;"></div>
          </div>
          <div class="separator">
            <img src="../assets/computer.svg" alt="Milho Separator" class="separator-image" />
            <h2>主要成员</h2>
          </div>
          <div class="user-container" >
              <el-carousel :interval="5000" height="500px"  type="card" :initial-visible-count="5" indicator-position="outside">
                  <el-carousel-item v-for="user in chunkedUsers" :key="user.id" class="card">
                    <Card :user="user"/>
                  </el-carousel-item>
              </el-carousel>
          </div>
      </el-main>
  </el-container>
</template>

<script setup>
import * as echarts from "echarts";
import mapData from "@/assets/map.json";
import { ref, onMounted, onUnmounted, computed, reactive } from 'vue';
import { useDebounce } from '@/utils/useDebounce';
import { useRouter } from 'vue-router'
import TDCard from '../components/TDCard.vue'
import Card from '../components/Card.vue'
import axios from 'axios';
const router = useRouter()

const handleUserClick = (userId) => {
  console.log(`Clicked on user with ID: ${userId}`);
  router.push(`/userprofile`)
};
const Users = reactive({
  users: [
    {
        "userId": "3380855804",
        "account": "2023317220311",
        "nickName": "morii",
        "realName": "cui",
        "location": "北京市",
        "occupation": "前端",
        "jobTitle": "后端工程师",
        "degree": "顶级211",
        "avatar": null,
        "email": null,
        "sex": null,
        "personDescription": "非常牛皮",
        "joinTime": "2025-04-24 18:41:50",
        "lastLoginTime": "2025-04-25 13:09:07",
        "lastLoginIp": "192.168.31.213",
        "lastLoginIpAddress": "未知",
        "totalIntegral": 7,
        "currentIntegral": 7,
        "status": 1
    },
    {
        "userId": "6033927674",
        "account": "1",
        "nickName": "用户6033927674",
        "realName": "1",
        "location": "湖北省",
        "occupation": null,
        "jobTitle": null,
        "degree": null,
        "avatar": null,
        "email": null,
        "sex": null,
        "personDescription": null,
        "joinTime": "2025-04-24 23:41:49",
        "lastLoginTime": "2025-04-25 11:31:06",
        "lastLoginIp": "192.168.31.118",
        "lastLoginIpAddress": null,
        "totalIntegral": 5,
        "currentIntegral": 5,
        "status": 1
    },
    {
        "userId": "7649470918",
        "account": "3",
        "nickName": "用户7649470918",
        "realName": "3",
        "location": "上海市",
        "occupation": null,
        "jobTitle": null,
        "degree": null,
        "avatar": null,
        "email": null,
        "sex": null,
        "personDescription": null,
        "joinTime": "2025-04-25 11:35:08",
        "lastLoginTime": "2025-04-25 11:35:53",
        "lastLoginIp": null,
        "lastLoginIpAddress": null,
        "totalIntegral": 5,
        "currentIntegral": 5,
        "status": 1
    }
],
  filterRegion: null,
  loading: false,
  error: null
});

let myChart;

onMounted(() => {
  // Users.loading = true;
  // axios.post('/api/getAllUsers')
  //   .then(response => {
  //     Users.users = response.data.data;
  //     console.log(Users.users);
  //     initChart();
  //   })
  //   .catch(error => {
  //     Users.error = error;
  //     console.error('获取用户数据失败:', error);
  //   })
  //   .finally(() => {
  //     Users.loading = false;
  //   });
  initChart();
});
const provinceData = computed(() => {
  return Users.users.reduce((acc, user) => {
    acc[user.location] = (acc[user.location] || 0) + 1;
    return acc;
  }, {});
});
const initChart = () => {
  console.log(provinceData)
  myChart = echarts.init(document.getElementById('chinaMap'));
  myChart.showLoading();
  
  echarts.registerMap('China', mapData);
  
  const option = {
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2
    },
    visualMap: {
      left: 'right',
      top: 'bottom',
      min: 0,
      max: Math.max(...Object.values(provinceData.value)),
      inRange: {
        color: [
          '#f1f8e9',
          '#dcedc8',
          '#c5e1a5',
          '#aed581',
          '#9ccc65',
          '#8bc34a',
          '#7cb342',
          '#689f38',
          '#558b2f',
          '#33691e',
          '#1b5e20'
      ]
      },
      text: ['High', 'Low'],
      calculable: true
    },
    series: [{
      name: '中国地图',
      type: 'map',
      map: 'China',
      roam: true,
      selectedMode: 'single',
      layoutCenter: ['50%', '50%'],
      layoutSize: '280%',
      emphasis: {
        label: {
          show: true
        },
        itemStyle: {
          color: provinceData.value > 0 ? '#ff7f50' : '#ddd',
          cursor: provinceData.value > 0 ? 'pointer' : 'not-allowed'
        }
      },
      data: Object.entries(provinceData.value).map(([name, value]) => ({
        name: name.endsWith('省') || name.endsWith('市') ? name : name + '省',
        value: value
      }))
    }]
  };
  myChart.setOption(option);
  myChart.hideLoading();
  
  myChart.on('click', (params) => {
    if (!validProvinces.value.includes(params.name.replace(/[省市]$/, ''))) return;
    
    myChart.dispatchAction({
      type: 'unselect',
      name: Users.filterRegion
    });
    
    const region = params.name.replace(/[省市]$/, '');
    Users.filterRegion = Users.filterRegion === region ? null : region;
    
    if (Users.filterRegion) {
      myChart.dispatchAction({
        type: 'select',
        name: params.name
      });
    }
  });
};
const resizeHandler = useDebounce(() => {
  if (myChart) {
      myChart.resize();
  }
});

window.addEventListener('resize', resizeHandler);


const validProvinces = computed(() => [...new Set(Users.users.map(u => u.province))]);



const chunkedUsers = computed(() => {
  const filtered = Users.filterRegion 
    ? Users.users.filter(u => u.location === Users.filterRegion)
    : Users.users;
  return filtered
});



onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler);
  if (myChart) {
      myChart.dispose();
  }
});
</script>

<style scoped>
.common-layout,
.el-container,
.el-header,
.el-main,
.el-aside,
.el-footer {
  padding: 0 !important;
}

.el-main {
  padding: 0 !important;
}
.card{
  background-color: transparent;
  height: auto;
  width: auto;
}
.post-card {
  margin: 0 !important;
}

.map-container {
 padding: 20px;
}
.separator{
  width: 90%;
  height: 100px;
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 20px auto;
  /* background-color: #FFA500; */
  border-radius: 30px;
  padding: 10px;
  border-bottom: 5px solid #FFA500;
}
.separator h2{
  margin-left: 20px;
  font-size: 40px;
  font-weight: bold;
  font-style: normal;
  color: #333;
  text-align: left;
  text-transform: none;
  letter-spacing: 1px;
  line-height: 0;
}

.separator-image {
  max-width: 80px; 
  height: auto;
}

.user-container {
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 100px
}

.world-map-container {
  width: 100%;
  height: 400px;
  background: #f0f2f5;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
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
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.user-info h4 {
  margin: 8px 0;
  font-size: 1.2em;
}

.region,
.occupation {
  color: #666;
  margin: 5px 0;
}

.register-date {
  color: #999;
  font-size: 0.9em;
}
.divider {
  margin: 12px 0;
}
.el-carousel{
  width: 100%;
  /* 向右移动 */
}
.el-carousel__item {
  /* background: #fff; */
  /* width: 300px;
  height: 400px; */
}
</style>
addEventListener('mousewheel', handler, { passive: true })
addEventListener('wheel', handler, { passive: true })
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
const router = useRouter()

const handleUserClick = (userId) => {
  console.log(`Clicked on user with ID: ${userId}`);
  router.push(`/userprofile`)
};
const Users = reactive({
  users: [
      { 
          userId: 1,
          username: '张三',
          location: '北京',
          occupation: '前端工程师',
          jobTitle: '前端开发',
          degree:'',
          avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      },
      {
          id: 2,
          name: '李四',
          region: '上海',
          province: '上海',
          occupation: '后端开发',
          avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
          registerDate: '2022-12-01'
      },
      {
          id: 3,
          name: '王五',
          region: '广州',
          province: '广东',
          occupation: 'UI设计师',
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e99bcpng.png',
          registerDate: '2024-01-20'
      },
      {
          id: 4,
          name: '赵六',
          region: '深圳',
          province: '广东',
          occupation: '产品经理',
          avatar: 'https://cube.elemecdn.com/e/f/96d7d105e2e3cafa5a9b0b5d34d9dpng.png',
          registerDate: '2023-08-05'
      },
      {
          id: 5,
          name: '陈七',
          region: '北京',
          province: '北京',
          occupation: '全栈工程师',
          avatar: 'https://cube.elemecdn.com/2/11/6531b15b86c3103312334a6d3ee3fpng.png',
          registerDate: '2024-02-18'
      },
      {
          id: 6,
          name: '孙八',
          region: '成都',
          province: '四川',
          occupation: '测试工程师',
          avatar: 'https://cube.elemecdn.com/4/56/5c8a92c3d2d1d2355296d12d4993apng.png',
          registerDate: '2023-05-22'
      },
      {
          id: 7,
          name: '周九',
          region: '杭州',
          province: '浙江',
          occupation: '运维工程师',
          avatar: 'https://cube.elemecdn.com/7/89/7a89d1234567890123456789abcdefpng.png',
          registerDate: '2022-10-10'
      },
      {
          id: 8,
          name: '吴十',
          region: '武汉',
          province: '湖北',
          occupation: '数据分析师',
          avatar: 'https://cube.elemecdn.com/1/23/123abcdef123abcdef123abcdefpng.png',
          registerDate: '2024-03-03'
      },
      {
          id: 9,
          name: '郑十一',
          region: '南京',
          province: '江苏',
          occupation: '算法工程师',
          avatar: 'https://cube.elemecdn.com/5/67/567abcdef567abcdef567abcdefpng.png',
          registerDate: '2023-11-17'
      },
      {
          id: 10,
          name: '王十二',
          region: '天津',
          province: '天津',
          occupation: '项目经理',
          avatar: 'https://cube.elemecdn.com/8/90/890abcdef890abcdef890abcdefpng.png',
          registerDate: '2022-07-28'
      },
      {
          id: 11,
          name: '冯十三',
          region: '重庆',
          province: '重庆',
          occupation: '安全工程师',
          avatar: 'https://cube.elemecdn.com/2/34/234abcdef234abcdef234abcdefpng.png',
          registerDate: '2024-04-12'
      },
      {
          id: 12,
          name: '褚十四',
          region: '西安',
          province: '陕西',
          occupation: '运营专员',
          avatar: 'https://cube.elemecdn.com/6/78/678abcdef678abcdef678abcdefpng.png',
          registerDate: '2023-09-09'
      },
      {
          id: 13,
          name: '卫十五',
          region: '苏州',
          province: '江苏',
          occupation: '市场营销',
          avatar: 'https://cube.elemecdn.com/0/12/012abcdef012abcdef012abcdefpng.png',
          registerDate: '2022-11-25'
      },
      {
          id: 14,
          name: '蒋十六',
          region: '长沙',
          province: '湖南',
          occupation: '平面设计师',
          avatar: 'https://cube.elemecdn.com/3/45/345abcdef345abcdef345abcdefpng.png',
          registerDate: '2024-05-05'
      },
      {
          id: 15,
          name: '沈十七',
          region: '青岛',
          province: '山东',
          occupation: '人力资源',
          avatar: 'https://cube.elemecdn.com/7/89/789abcdef789abcdef789abcdefpng.png',
          registerDate: '2023-06-13'
      },
      {
          id: 16,
          name: '韩十八',
          region: '大连',
          province: '辽宁',
          occupation: '财务专员',
          avatar: 'https://cube.elemecdn.com/1/23/12345678901234567890abcdefpng.png',
          registerDate: '2022-08-19'
      },
      {
          id: 17,
          name: '杨十九',
          region: '厦门',
          province: '福建',
          occupation: '法务专员',
          avatar: 'https://cube.elemecdn.com/4/56/456abcdef456abcdef456abcdefpng.png',
          registerDate: '2024-06-16'
      },
      {
          id: 18,
          name: '朱二十',
          region: '合肥',
          province: '安徽',
          occupation: '内容审核员',
          avatar: 'https://cube.elemecdn.com/8/90/8901234567890123456789abcdefpng.png',
          registerDate: '2023-12-22'
      },
      {
          id: 19,
          name: '秦二十一',
          region: '福州',
          province: '福建',
          occupation: '网络工程师',
          avatar: 'https://cube.elemecdn.com/2/34/2345678901234567890abcdefpng.png',
          registerDate: '2022-09-30'
      },
      {
          id: 20,
          name: '尤二十二',
          region: '南昌',
          province: '江西',
          occupation: '游戏开发工程师',
          avatar: 'https://cube.elemecdn.com/6/78/678901234567890123456789abcdefpng.png',
          registerDate: '2024-07-07'
      }
  ],
  filterRegion: null
});

const validProvinces = computed(() => [...new Set(Users.users.map(u => u.province))]);

const provinceData = computed(() => {
  return Users.users.reduce((acc, user) => {
    acc[user.province] = (acc[user.province] || 0) + 1;
    return acc;
  }, {});
});

const chunkedUsers = computed(() => {
  const filtered = Users.filterRegion 
    ? Users.users.filter(u => u.province === Users.filterRegion)
    : Users.users;
  return filtered
});


let myChart;

onMounted(() => {
  // 初始化统计图对象
  myChart = echarts.init(document.getElementById('chinaMap'));
  // 显示 loading 动画
  myChart.showLoading();
  // 再得到数据的基础上，进行地图绘制
  // 得到结果后，关闭动画
  myChart.hideLoading();
  // 注册地图(数据放在axios返回对象的data中哦)
  echarts.registerMap('China', mapData);
  var option = {
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
        name: name + '省',
        value: value
      }))
    }]
  };
  myChart.setOption(option);
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
});

const resizeHandler = useDebounce(() => {
  if (myChart) {
      myChart.resize();
  }
});

window.addEventListener('resize', resizeHandler);

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
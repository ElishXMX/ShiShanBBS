<template>
        <div ref="chinaMap" id="chinaMap" style="width: 100%;height:600px;"></div>
</template>

<script setup>
//echats部分
import * as echarts from "echarts";
import mapData from "@/assets/map.json";
import { ref, onMounted, onUnmounted } from 'vue';
import { useDebounce } from '@/utils/useDebounce';


onMounted(() => {
  console.log("mapData",mapData);
    // 初始化统计图对象
    var myChart = echarts.init(document.getElementById('chinaMap'));
    // 显示 loading 动画
    myChart.showLoading();
    // 再得到数据的基础上，进行地图绘制
      // 得到结果后，关闭动画
      myChart.hideLoading();
      // 注册地图(数据放在axios返回对象的data中哦)
      echarts.registerMap('China', mapData);
      var option = {
        series: [
          {
            name: '中国地图',
            type: 'map',
            map: 'China',// 这个是上面注册时的名字哦，registerMap（'这个名字保持一致'）
            label: {
              show: false
            },
            roam: true,
            emphasis: {
              label: {
                show: true,
                color: '#333'
              }
            }
          }
        ]
      };
      myChart.setOption(option);
  }
)

const resizeHandler = useDebounce(() => {
  myChart.resize();
});

window.addEventListener('resize', resizeHandler);

onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler);
  // myChart.dispose();
});
</script>

<style scoped>
.world-map-container {
  width: 100%;
  height: 400px;
  background: #f0f2f5;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
</style>
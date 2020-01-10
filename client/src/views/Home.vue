<template>
  <div>
    <el-card shadow="always">
      <el-form class="filter-form" label-position="top" label-width="80px" :model="form">
        <el-row :gutter="24">
          <el-col :xs="{ span: 24 }" :sm="{ span: 9 }">
            <el-form-item label="餐廳名稱">
              <el-autocomplete
                class="inline-input"
                v-model="form.name"
                :fetch-suggestions="querySearch"
                placeholder="請輸入餐廳名稱"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :xs="{ span: 24 }" :sm="{ span: 5 }">
            <el-form-item label="訂位人數">
              <el-input-number v-model="form.count" :min="1" label="想輸入訂位人數"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :xs="{ span: 24 }" :sm="{ span: 5 }">
            <el-form-item label="日期區間">
              <el-date-picker
                v-model="form.date"
                type="date"
                placeholder="請選擇日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="{ span: 24 }" :sm="{ span: 5 }">
            <el-form-item label="時間區間">
              <el-time-picker
                v-model="form.time"
                placeholder="請選擇時間">
              </el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="mt-4" shadow="always">
      <el-table
        :data="currentRestaurants"
        style="width: 100%">
        <el-table-column 
          fixed="right"
          type="expand">
          <template slot-scope="props">
            <el-table :data="[props.row]">
              <el-table-column
                label="類型"
                prop="type">
              </el-table-column>
              <el-table-column
                label="米其林星"
                prop="star">
              </el-table-column>
              <el-table-column
                label="停車"
                prop="parking">
              </el-table-column>
              <el-table-column
                label="外送"
                prop="delivery">
              </el-table-column>
              <el-table-column
                label="先繳訂金"
                prop="deposit">
              </el-table-column>
              <el-table-column
                label="類型"
                prop="type">
              </el-table-column>
              <el-table-column
                label="評價"
                prop="score">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="200">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="openMap(scope.$index)"
                    type="primary"
                    size="small">
                    地圖
                  </el-button>
                  <el-button
                    @click.native.prevent="order(scope.$index)"
                    type="warning"
                    size="small">
                    訂位
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          label="餐廳名稱"
          fixed="left"
          prop="name">
        </el-table-column>
        <el-table-column
          label="日"
          prop="sun">
        </el-table-column>
        <el-table-column
          label="一"
          prop="mon">
        </el-table-column>
        <el-table-column
          label="二"
          prop="tue">
        </el-table-column>
        <el-table-column
          label="三"
          prop="wed">
        </el-table-column>
        <el-table-column
          label="四"
          prop="thu">
        </el-table-column>
        <el-table-column
          label="五"
          prop="fri">
        </el-table-column>
        <el-table-column
          label="六"
          prop="sat">
        </el-table-column>
      </el-table>
      <div class="text-center mt-4">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="page.size"
          :total="filterRestaurants.length"
          :current-page.sync="page.current">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog title="地圖" :visible.sync="showMap">
      <cusMap :lat="lat" :lng="lng">
      </cusMap>
    </el-dialog>

  </div>
</template>

<script>
import api from '../API/api'
import cusMap from '../components/map.vue'

export default {
  name: 'Home',
  components: {
    cusMap
  },
  data() {
    return {
      showMap: false,
      restaurants: [],
      form: {
        name: '',
        count: 0,
        date: '',
        time: '',
      },
      page: {
        current: 1,
        size: 10,
      },
      lat: 0,
      lng: 0
    }
  },
  created() {
    this.getData()
  },
  watch: {
    $route(to) {
      if (to) {
        this.getData()
      }
    }
  },
  methods: {
    getData() {
      api.getRestaurant()
        .then(res => {
          if (res.status === 200) {
            this.restaurants = res.data.data
          }
        })
    },
    querySearch(queryString, cb) {
      var restaurants = this._.cloneDeep(this.restaurants);
      var results = queryString ? restaurants.filter(restaurant => restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0) : restaurants;
      cb(results.map(restaurant => { return { value: restaurant.name }}));
    },
    handleSelect(item) {
      console.log(item);
    },
    openMap(index) {
      this.showMap = true
      const currentPos = this.restaurants[index].position
      let posString = currentPos.replace('POINT (', '')
      posString = posString.replace(')', '')
      const posArr = posString.split(' ')
      this.lat = +posArr[0]
      this.lng = +posArr[0]
      this.showMap = true
    },
    order() {

    }
  },
  computed: {
    filterRestaurants() {
      const { name, date, time } = this.form
      let restaurants = this._.cloneDeep(this.restaurants)

      if (name) {
        restaurants = restaurants.filter(restaurant => {
          return restaurant.name.indexOf(name) > -1
        })
      }
      if (date) {
        const d = new Date(date)
        const week = d.getDay()
        const weekString = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
        restaurants = restaurants.filter(restaurant => {
          return restaurant[weekString[week]] !== 'Closed'
        })
      }

      if (time) {

        restaurants = restaurants.filter(restaurant => {
          const d = new Date(time)
          const h = d.getHours()
          // const m = d.getMinutes()
  
          const weekString = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
          let weekArr = weekString
          if (date) {
            const week = new Date(date).getDay()
            weekArr = [weekString[week]]
          }

          let isInTime = false

          weekArr.forEach(wk => {
            if (wk !== 'Closed') {
              const timeArr = restaurant[wk].split('-')
              const startArr = timeArr[0] ? timeArr[0].split(':') : []
              const endArr = timeArr && timeArr[1] ? timeArr[1].split(':') : []

    
              if (+startArr[0] < h && h < +endArr[0]) {
                isInTime = true
              }
            }
          })

          return isInTime
        })
      }

      return restaurants;
    },
    currentRestaurants() {
      let restaurants = this._.cloneDeep(this.filterRestaurants)
      const startPos = (this.page.current - 1) * this.page.size
      restaurants = this._.slice(restaurants, startPos, startPos + this.page.size);
      return restaurants;
    }
  },
}
</script>

<style lang="scss" scoped>
  .table-expand {
    font-size: 0;
    label {
      width: 90px;
      color: #99a9bf;
    }
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }

  /deep/ {
    .el-input-number, .el-autocomplete {
      width: 100%;
    }

    .el-date-editor {
      &.el-input {
        width: 100%;
      }
    }
  }

</style>
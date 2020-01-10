import Vue from 'vue'

const getRestaurant = () => {
  const api = `${process.env.VUE_APP_API}/restaurant`
  return Vue.axios.get(api);
}

export default {
  getRestaurant
}

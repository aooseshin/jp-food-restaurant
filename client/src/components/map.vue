<template lang="">
  <div>
    <GmapMap
      :center="{lat:lat, lng:lng}"
      :zoom="7"
      map-type-id="terrain"
      style="width: 100%; height: 300px"
      ref="mapRef"
    >
    </GmapMap>
  </div>
</template>
<script>
export default {
  name: 'LayoutHeader',
  props: ['lat', 'lng'],
  mounted() {
    this.$refs.mapRef.$mapPromise.then((map) => {
      map.panTo({lat: this.lat, lng: this.lng});
    })

  },
}
</script>
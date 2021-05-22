<template>
  <q-layout view="hHh Lpr fFf">

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'LayoutClean',

  data () {
    return {
      leftDrawer: true
    }
  }
}
</script>

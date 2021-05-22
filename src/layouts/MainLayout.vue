<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title v-if="$q.platform.is.desktop" class="text-left q-pa-sm">
          <span  class="text-h6">Acelera Araguaína - Supply Chain</span>
        </q-toolbar-title>
        <q-toolbar-title v-if="$q.platform.is.mobile" class="text-center q-pa-sm">
          <span class="text-h5">Acelera Araguaína</span>
          <br>
          <span class="text-h6">Supply Chain</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <EssentialLink
          class="text-grey-9"
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Inicio',
    caption: '',
    icon: 'web',
    link: 'https://quasar.dev'
  },
  {
    title: 'Mural',
    caption: '',
    icon: 'edit_calendar',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Serviços',
    caption: '',
    icon: 'home_repair_service',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Acessos',
    caption: '',
    icon: 'groups',
    link: 'https://chat.quasar.dev'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>

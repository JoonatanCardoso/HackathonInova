<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$q.platform.is.mobile"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title v-if="$q.platform.is.desktop" class="text-left q-pa-sm">
          <span class="text-h6">Acelera Araguaína - Supply Chain</span>
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
      <q-list class="text-grey-8">
        <q-item
          class="text-grey-9"
          :to="{ name: 'dash' }"
        >
          <q-icon name="web" size="30px"/>
          <q-item-label class="text-black self-center q-px-md text-h6">
            Início
          </q-item-label>
        </q-item>
        <q-item
          class="text-grey-9"
          :to="{ name: 'mural' }"
        >
          <q-icon name="grid_view" size="30px"/>
          <q-item-label class="text-black self-center q-px-md text-h6"
          >Mural
          </q-item-label>
        </q-item>
        <q-item
          class="text-grey-9"
          :to="{ name: 'servicos' }"
        >
          <q-icon name="home_repair_service" size="30px"/>
          <q-item-label class="text-black self-center q-px-md text-h6"
          >Serviços
          </q-item-label>
        </q-item>
        <q-item
          class="text-grey-9"
          :to="{ name: 'acesso' }"
        >
          <q-icon name="groups" size="30px"/>
          <q-item-label class="text-black self-center q-px-md text-h6"
          >Acesso
          </q-item-label>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  components: {},
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

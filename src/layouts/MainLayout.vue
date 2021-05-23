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

        <q-toolbar-title
          v-if="$q.platform.is.desktop"
          class="row justify-between q-pa-sm"
        >
          <span class="text-h6">Acelera Araguaína - Supply Chain</span>
          <q-btn round color="green-6" icon="logout" @click="logout()"/>
        </q-toolbar-title>
        <q-toolbar-title
          v-if="$q.platform.is.mobile"
          class="text-center q-pa-sm"
        >
          <span class="text-h5">Acelera Araguaína</span>
          <br/>
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
      <q-list class="text-grey-7 ">
        <q-item active-class="selected" :to="{ name: 'home' }">
          <q-icon name="web" size="30px"/>
          <q-item-label class="text-black self-center q-px-md text-h6">
            Início
          </q-item-label>
        </q-item>
        <q-separator/>
        <q-item active-class="selected" :to="{ name: 'mural' }">
          <q-icon name="grid_view" size="30px"/>
          <q-item-label class="text-black self-center q-px-md text-h6"
          >Mural
          </q-item-label>
        </q-item>
        <q-separator/>
        <q-item active-class="selected" :to="{ name: 'servicos' }">
          <q-icon name="home_repair_service" size="30px"/>
          <q-item-label class="text-black self-center q-px-md text-h6"
          >Serviços
          </q-item-label>
        </q-item>
        <q-separator/>
        <q-item v-if="tipoAdm && tipoAdm === 'Prefeitura'" active-class="selected" :to="{ name: 'acesso' }">
          <q-icon name="groups" size="30px"/>
          <q-item-label class="text-black self-center q-px-md text-h6"
          >Acessos
          </q-item-label>
        </q-item>
        <q-separator/>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'MainLayout',
  tipoAdm: '',
  components: {},
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  created () {
    this.tipoAdm = this.user.data.tipo
  },
  computed: {
    ...mapState('userAuth', ['user'])
  },
  methods: {
    ...mapActions('userAuth', ['logoutUser']),
    logout () {
      this.logoutUser()
      this.$router.replace({ name: 'login' })
    }
  }
}
</script>
<style lang="sass">
.selected
  color: #008b35

  background-color: #e8f5e9
</style>

<template>
  <q-page>
    <div class="row justify-center bg-grey-3">
      <div
        class="col-xl-8 col-lg-8 col-md-8 col-sm-10 col-xs-10 text-h4 q-my-lg"
      >
        Acessos
      </div>
      <div class="col-xl-2 col-lg-2 col-md-2 col-sm-10 col-xs-10 q-my-lg">
        <q-btn
          @click="open()"
          class="bg-primary text-white text-bold q-mx-md"
          no-caps
          no-wrap
          label="Cadastrar usuário"
        />
      </div>
      <add ref="ModalUser"></add>
    </div>
  </q-page>
</template>

<script>
import ModalUser from 'components/admin/ModalUser.vue'
export default {
  name: 'GerenciarAcessos',
  components: {
    add: ModalUser
  },
  methods: {
    open () {
      this.$refs.ModalUser.open()
    }
  }
}
</script>

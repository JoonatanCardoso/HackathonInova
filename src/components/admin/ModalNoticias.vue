<template>
  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
    :maximized="$q.platform.is.mobile"
    :full-width="$q.platform.is.mobile"
    persistent
    v-model="cadNoticias"
  >
    <q-card style="width: 500px; max-width: 80vw;">
      <q-bar class="full-width bg-primary text-white">
        <q-space />

        <q-btn @click="close()" dense flat icon="close" v-close-popup> </q-btn>
      </q-bar>
      <q-card-section>
        <div class="text-h6 text-center text-weight-bolder text-primary">
          Cadastro de usuário
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none text-justify">
        Nome completo
        <q-input dense outlined></q-input>
      </q-card-section>
      <q-card-section class="q-pt-none text-justify">
        E-mail
        <q-input dense outlined></q-input>
      </q-card-section>
      <q-card-section class="q-pt-none text-justify">
        Tipo
        <q-input dense outlined></q-input>
      </q-card-section>
      <q-card-section class="q-pt-none text-justify">
        CPF
        <q-input dense outlined></q-input>
      </q-card-section>
      <q-card-section class="q-pt-none text-justify">
        Telefone
        <q-input dense outlined></q-input>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'modalNoticias',
  ref: 'modalNoticias',
  data () {
    return {
      cadNoticias: false
    }
  },
  methods: {
    open () {
      this.cadNoticias = true
    },
    close () {
      this.cadNoticias = false
    }
  }
}
</script>

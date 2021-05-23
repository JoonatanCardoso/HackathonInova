<template>
  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
    persistent
    :maximized="$q.platform.is.mobile"
    :full-width="$q.platform.is.mobile"
    v-model="orcamento"
  >
    <q-card class="row" style="width: 700px; max-width: 80vw;">
      <q-bar class="full-width bg-primary text-white">
        <q-space />

        <q-btn @click="close()" dense flat icon="close" v-close-popup> </q-btn>
      </q-bar>
      <div class="col-sm-12 col-md-6 col-lg-6">
        <q-card-section>
          <div class="text-h6 text-center text-weight-bolder text-primary">
            <span>Editar</span> serviços
          </div>
        </q-card-section>
        <!------------------------ FORM ------------------------>
        <q-form>
          <q-card-section class="q-pt-none text-justify">
            Título*
            <q-input v-model="titulo" dense outlined></q-input>
          </q-card-section>
          <q-card-section class="q-pt-none text-justify">
            Descrição*
            <q-input
              v-model="descricao"
              dense
              outlined
              type="textarea"
            ></q-input>
          </q-card-section>
          <q-card-section class="q-pt-none text-justify">
            Telefone/Whatsapp
            <q-input
              mask="(##) # ####-####"
              v-model="telefone"
              dense
              outlined
            ></q-input>
          </q-card-section>
          <q-card-section class="q-pt-none text-justify">
            Link
            <q-input v-model="link" dense outlined></q-input>
          </q-card-section>
        </q-form>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'CadOrcamento',
  ref: 'CadOrcamento',
  data () {
    return {
      orcamento: false
    }
  },
  mounted () {},
  computed: {},
  methods: {
    open () {
      this.orcamento = true
    }
  }
}
</script>

<style></style>

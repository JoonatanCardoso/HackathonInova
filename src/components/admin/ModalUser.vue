<template>
  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
    :maximized="$q.platform.is.mobile"
    :full-width="$q.platform.is.mobile"
    persistent
    v-model="modal"
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
<q-form>
      <q-card-section class="q-pt-none text-justify">
        Nome completo*
        <q-input v-model="dados.nome" dense outlined></q-input>
      </q-card-section>
      <q-card-section class="q-pt-none text-justify">
        E-mail*
        <q-input  v-model="dados.email" dense outlined></q-input>
      </q-card-section>
      <q-card-section class="q-pt-none text-justify">
        Tipo*
        <q-select :options="options" v-model="dados.tipo" dense outlined></q-select>
      </q-card-section>
      <q-card-section class="q-pt-none text-justify">
        CPF*
        <q-input mask="###.###.###-##" v-model="dados.cpf" dense outlined></q-input>
      </q-card-section>
      <q-card-section class="q-pt-none text-justify">
        Celular
        <q-input mask="(##) #####-####" v-model="dados.celular" dense outlined></q-input>
      </q-card-section>
      <q-card-section class="q-mr-xs" style="font-size:12px">
          *Campos obrigatórios<br>
        Ao registrar um usuário, as credencias de acesso serão enviadas ao e-mail.
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="CANCELAR" color="primary" />
        <q-btn  label="ADICIONAR" color="primary" />
      </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'ModalUser',
  ref: 'ModalUser',
  data () {
    return {
      options: [
        'Sebrae', 'Associação comercial', 'Sindicado Comercial', 'Associação industrial', 'Sindicado Rural', 'CDL'
      ],
      modal: false,
      dados: { nome: '', email: '', cpf: '', tipo: '', celular: '' }
    }
  },
  props: {},
  mounted () {},
  computed: {},
  methods: {
    close () {
      this.modal = false
    },
    open () {
      this.modal = true
    }
  }
}
</script>

<style></style>

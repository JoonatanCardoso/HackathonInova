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
          <span v-if="!this.editar">Cadastro de </span> <span v-else>Editar</span> item
        </div>
      </q-card-section>
      <q-form ref="formCadastro">
        <q-card-section class="q-pt-none text-justify">
          Titulo*
          <q-input
            v-model="dados.titulo"
            dense
            outlined
            :rules="[
              val =>(val && val.length > 0) || 'Este campo é obrigatório!'
            ]"
          />
        </q-card-section>
        <q-card-section class="q-pt-none text-justify">
          Tipo*
          <q-select
            :options="options"
            v-model="dados.tipo"
            dense
            outlined
            :rules="[
              val =>(val && val.length > 0) || 'Este campo é obrigatório!'
            ]"
          />
        </q-card-section>
        <q-card-section class="q-pt-none text-justify">
          Link*
          <q-input
            mask="###.###.###-##"
            v-model="dados.link"
            dense
            outlined
            :rules="[
              val =>(val && val.length > 0) ||'Este campo é obrigatório!'
            ]"
          />
        </q-card-section>
        <q-card-section class="q-pt-none text-justify">
          Data de validade*
          <q-input
            type="date"
            v-model="dados.data_validade"
            outlined
            :disable="loading"
            :rules="[
              val =>(val && val.length > 0) || 'Este campo é obrigatório!'
            ]"
            dense
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat @click="close()" label="CANCELAR" color="primary" />
          <q-btn  :label="!this.editar ? 'ADICIONAR' : 'EDITAR'" @click="validaCampos()" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ModalUser',
  ref: 'ModalUser',
  data () {
    return {
      options: [
        'Evento', 'Curso', 'Oficina', 'Webinar', 'Consultoria', 'Outros'
      ],
      modal: false,
      id: '',
      dados: { titulo: '', tipo: '', link: '', data_validade: '' }
    }
  },
  props: {
    dado: Object,
    editar: Boolean
  },
  mounted () {
    this.add({ dados: this.dados })
  },
  computed: {},
  methods: {
    ...mapActions('usuarios', ['addUsuarios', 'addUsuariosData', 'putUsuariosMerge']),
    close () {
      this.modal = false
      this.dados.nome = ''
      this.dados.email = ''
      this.dados.tipo = ''
      this.dados.cpf = ''
      this.dados.celular = ''
      this.id = ''
    },
    open () {
      this.modal = true
    },
    openEditar () {
      this.dados.nome = this.dado.nome
      this.dados.email = this.dado.email
      this.dados.tipo = this.dado.tipo
      this.dados.cpf = this.dado.cpf
      this.dados.celular = this.dado.celular
      this.id = this.dados.docid
      this.modal = true
    },
    validaCampos () {
      this.$refs.formCadastro.validate().then(success => {
        if (success) {
          this.salvarDados()
        } else {
          this.$q.notify({
            message:
              'Preencha todos os campos obrigatórios para realizar o cadastro.',
            color: 'orange'
          })
        }
      })
    },
    salvarDados () {
      if (!this.editar) {
        console.log('ADICIONAR', this.dados)
        this.addUsuarios({
          dados: this.dados
        }).then((res) => {
          console.log('🚀 ~ file: ModalUser.vue ~ line 217 ~ salvarDados ~ res', res)
          this.addUsuariosData({ dados: res })
            .then((data) => {
              console.log('🚀 ~ file: ModalUser.vue ~ line 220 ~ .then ~ data', data)
              this.$q.notify({
                position: 'bottom',
                color: 'positive',
                textColor: 'white',
                icon: 'check',
                message: 'Usuário cadastrado com sucesso!'
              })
              this.close()
            }).catch(_err => {
              console.log('🚀 ~ file: ModalUser.vue ~ line 228 ~ this.addUsuariosData ~ _err', _err)
              this.$q.notify({
                position: 'bottom',
                color: 'negative',
                textColor: 'white',
                icon: 'close',
                message: 'Usuário não cadastrado!'
              })
            })
        })
      } else {
        console.log('EDITAR', this.dados)
        // METODO DE EDITAR
      }
    }
  }
}
</script>

<style></style>

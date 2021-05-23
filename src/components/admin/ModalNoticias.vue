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
          />
        </q-card-section>
        <q-card-section class="q-pt-none text-justify">
          Link*
          <q-input
            v-model="dados.link"
            dense
            outlined
            :rules="[
              val =>(val && val.length > 0) || 'Este campo é obrigatório!'
            ]"
          />
        </q-card-section>
        <q-card-section class="q-pt-none text-justify">
          Data de validade*
          <q-input
            type="date"
            v-model="dados.data_validade"
            outlined
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
        {
          label: 'Evento',
          value: '#1976d2'
        },
        {
          label: 'Curso',
          value: '#26a69a'
        },
        {
          label: 'Oficina',
          value: '#9c27b0'
        },
        {
          label: 'Webinar',
          value: '#21ba45'
        },
        {
          label: 'Consultoria',
          value: '#c10015'
        },
        {
          label: 'Outros',
          value: '#f2c037'
        }
      ],
      modal: false,
      id: '',
      dados: { titulo: '', tipo: '', link: '', data_validade: '', cor: '' }
    }
  },
  props: {
    dado: Object,
    editar: Boolean
  },
  mounted () {},
  computed: {},
  methods: {
    ...mapActions('mural', ['addMural', 'putMural']),
    close () {
      this.modal = false
      this.dados.titulo = ''
      this.dados.tipo = ''
      this.dados.link = ''
      this.dados.data_validade = ''
      this.id = ''
    },
    open () {
      this.modal = true
      console.log(this.dado)
    },
    openEditar () {
      this.dados.titulo = this.dado.nome
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
        this.dados.cor = this.dados.tipo.value
        this.dados.tipo = this.dados.tipo.label
        this.addMural({
          dados: this.dados
        }).then((res) => {
          this.$q.notify({
            position: 'bottom',
            color: 'positive',
            textColor: 'white',
            icon: 'check',
            message: 'Item cadastrado com sucesso!'
          })
          this.modal = false
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

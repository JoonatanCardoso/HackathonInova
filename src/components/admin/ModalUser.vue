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
          <span v-if="!this.editar">Cadastro de </span> <span v-else>Editar</span> usuário
        </div>
      </q-card-section>
      <q-form ref="formCadastro">
        <q-card-section class="q-pt-none text-justify">
          Nome completo*
          <q-input
            v-model="dados.nome"
            dense
            outlined
            :rules="[
              val =>(val && val.length > 0) || 'Este campo é obrigatório!'
            ]"
          />
        </q-card-section>
        <q-card-section class="q-pt-none text-justify">
          E-mail*
          <q-input
            v-model="dados.email"
            dense
            outlined
            :rules="[
              val =>(val && validaEmail(dados.email)) ||'Informe um e-mail válido!'
            ]"
            type="email"
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
          CPF*
          <q-input
            mask="###.###.###-##"
            v-model="dados.cpf"
            dense
            outlined
            :rules="[
              val =>(val && validarCPF(dados.cpf)) ||'Informe um CPF válido!'
            ]"
          />
        </q-card-section>
        <q-card-section class="q-pt-none text-justify">
          Celular
          <q-input
            mask="(##) #####-####"
            v-model="dados.celular"
            dense
            outlined
            :rules="[
              val =>(val && val.length > 13) || 'Este campo é obrigatório!'
            ]"
          />
        </q-card-section>
        <q-card-section class="q-mr-xs" style="font-size:12px">
            *Campos obrigatórios<br>
          Ao registrar um usuário, as credencias de acesso serão enviadas ao e-mail.
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ModalUser',
  ref: 'ModalUser',
  data () {
    return {
      options: [
        'Sebrae', 'Associação comercial', 'Sindicado comercial', 'Associação industrial', 'Sindicado Rural', 'CDL'
      ],
      modal: false,
      id: '',
      dados: { nome: '', email: '', cpf: '', tipo: '', celular: '' }
    }
  },
  props: {
    dado: Object,
    editar: Boolean
  },
  mounted () {
    this.addUsuariosData({ dados: this.dados })
  },
  computed: {},
  methods: {
    ...mapGetters('usuarios', ['getListaUsuarios']),
    ...mapActions('usuarios', ['addUsuarios', 'addUsuariosData', 'putUsuariosMerge']),
    close () {
      this.modal = false
      this.dados.nome = ''
      this.dados.email = ''
      this.dados.tipo = ''
      this.dados.cpf = ''
      this.dados.cpf = ''
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
      this.dados.cpf = this.dado.cpf
      this.id = this.dados.docid
      this.modal = true
    },
    validaEmail () {
      const usuario = this.dados.email.substring(0, this.dados.email.indexOf('@'))
      const dominio = this.dados.email.substring(
        this.dados.email.indexOf('@') + 1,
        this.dados.email.length
      )
      if (
        usuario.length >= 1 &&
        dominio.length >= 3 &&
        usuario.search('@') === -1 &&
        dominio.search('@') === -1 &&
        usuario.search(' ') === -1 &&
        dominio.search(' ') === -1 &&
        dominio.search('.') !== -1 &&
        dominio.indexOf('.') >= 1 &&
        dominio.lastIndexOf('.') < dominio.length - 1
      ) {
        return true
      } else {
        return false
      }
    },
    validarCPF (cpf) {
      let soma = 0
      let i
      let resto
      const inputCPF = cpf.replace(/[^\w\s]/gi, '')
      if (
        inputCPF === '00000000000' ||
        inputCPF === '11111111111' ||
        inputCPF === '22222222222' ||
        inputCPF === '33333333333' ||
        inputCPF === '44444444444' ||
        inputCPF === '55555555555' ||
        inputCPF === '66666666666' ||
        inputCPF === '77777777777' ||
        inputCPF === '88888888888' ||
        inputCPF === '99999999999'
      ) {
        return false
      }
      for (i = 1; i <= 9; i++) {
        soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (11 - i)
      }
      resto = (soma * 10) % 11

      if (resto === 10 || resto === 11) resto = 0
      if (resto !== parseInt(inputCPF.substring(9, 10))) return false

      soma = 0
      for (i = 1; i <= 10; i++) {
        soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (12 - i)
      }
      resto = (soma * 10) % 11

      if (resto === 10 || resto === 11) resto = 0
      if (resto !== parseInt(inputCPF.substring(10, 11))) return false
      return true
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
        // METODO DE ADICIONAR
      } else {
        console.log('EDITAR', this.dados)
        // METODO DE EDITAR
      }
    }
  }
}
</script>

<style></style>

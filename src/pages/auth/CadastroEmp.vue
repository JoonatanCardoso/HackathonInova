<template>
  <q-page>
    <div class="row justify-center bg-grey-3 q-mb-sm">
      <div class="col-lg-8 col-md-7 col-sm-10 col-11  ">
        <q-btn
          :to="{ name: 'login' }"
          flat
          no-caps
          class="q-mt-sm"
          color="primary"
          >voltar ao login</q-btn
        >
      </div>
      <div
        class="col-lg-8 col-md-7 col-11 col-sm-10 text-h3 q-my-lg"
        :class="$q.screen.lt.md ? 'q-px-sm' : 'q-px-md'"
      >
        Cadastro de empresa
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-lg-8 col-md-8">
        <div class="row justify-center text-subtitle2 q-mt-lg">
          <div class="q-px-sm q-mb-md col-11 text-primary col-sm-10 col-lg-12">
            Dados inicias
          </div>
          <div class="q-px-sm col-11 col-sm-10 col-lg-12">
            Qual o tipo da sua empresa?
          </div>
          <div class="col-lg-12 col-sm-10 col-11">
            <q-radio
              v-model="dados.type"
              size="sm"
              val="pequena"
              label="Pequena"
            />
            <q-radio
              v-model="dados.type"
              size="sm"
              val="media_grande"
              label="Média/Grande"
            />
            <q-radio
              v-model="dados.type"
              size="sm"
              val="produtor_rural"
              label="Produtor Rural"
            />
          </div>
          <div class="col-lg-6">
            <q-form ref="formCadastro">
              <div class="row justify-center  text-subtitle2  q-mt-md">
                <div
                  class="col-lg-12 col-11 col-sm-10 col-md-10 q-mt-sm q-px-sm"
                >
                  Razão social*
                  <q-input
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Este campo é obrigatório!'
                    ]"
                    v-model="dados.razao_social"
                    outlined
                    dense
                    :disable="loading"
                  ></q-input>
                </div>
                <div
                  class="col-lg-12 col-11 col-sm-10 col-md-10  q-px-sm q-mt-sm"
                >
                  Nome Fantasia*
                  <q-input
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Este campo é obrigatório!'
                    ]"
                    v-model="dados.nome_fantasia"
                    outlined
                    :disable="loading"
                    dense
                  ></q-input>
                </div>
                <div
                  class="col-lg-12 col-11 col-sm-10 col-md-5 col-md-10  q-px-sm q-mt-sm"
                >
                  CNPJ*
                  <q-input
                    mask="##.###.###/####-##"
                    v-model="dados.cnpj"
                    outlined
                    :disable="loading"
                    dense
                    :rules="[
                      val =>
                        (val && val.length > 17) || 'Este campo é obrigatório!'
                    ]"
                  ></q-input>
                </div>
                <div class="col-lg-6 col-11 col-sm-5 col-md-5 q-px-sm q-mt-sm ">
                  Telefone Celular*
                  <q-input
                    mask="(##)#####-####"
                    v-model="dados.celular"
                    outlined
                    :disable="loading"
                    :rules="[
                      val =>
                        (val && val.length > 13) || 'Este campo é obrigatório!'
                    ]"
                    dense
                  ></q-input>
                </div>
                <div class="col-lg-6 col-11 col-sm-5 col-md-5 q-px-sm q-mt-sm ">
                  Data de abertura*
                  <q-input
                    type="date"
                    v-model="dados.data_abertura"
                    outlined
                    :disable="loading"
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Este campo é obrigatório!'
                    ]"
                    dense
                  ></q-input>
                </div>
                <div class="col-lg-6 col-11 col-sm-5 col-md-5 q-px-sm q-mt-sm ">
                  Ramo de atividade*
                  <q-select
                    use-input
                    style="border-radius:5px"
                    class="bg-white"
                    label-color="primary"
                    outlined
                    :rules="[
                      val =>
                        (val) || 'Este campo é obrigatório!'
                    ]"
                    dense
                    :options="ramosAtividades"
                    :option-label="(item) => item ? item.cod + ' - ' + item.desc : ''"
                    @filter="filterFn"
                    label="Escolha o ramo de atividade"
                    v-model="dados.ramo_atividade"
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          Sem resultados
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
                <div class="col-lg-6 col-11 col-sm-5 col-md-5 q-px-sm q-mt-sm ">
                  Quantidade de funcionarios*
                  <q-input
                    v-model="dados.qtd_funcionarios"
                    outlined
                    mask="#####################"
                    :disable="loading"
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Este campo é obrigatório!'
                    ]"
                    dense
                  ></q-input>
                </div>
                <div
                  class="col-lg-6 col-11 col-sm-5 col-md-5 q-px-sm q-mt-sm  q-mb-md "
                >
                  Site
                  <q-input
                    v-model="dados.link_site"
                    outlined
                    :disable="loading"
                    dense
                  ></q-input>
                </div>
                <div
                  class="col-lg-6 col-11 col-sm-5 col-md-5 q-px-sm q-mt-sm  q-mb-md"
                >
                  Inscrição social
                  <q-input
                    v-model="dados.inscricao_social"
                    outlined
                    :disable="loading"
                    dense
                  ></q-input>
                </div>
                <div class="col-lg-12 col-11  col-sm-10 col-md-10 q-my-md">
                  <q-separator color="primary"> </q-separator>
                </div>
              </div>
              <div class="row justify-center text-subtitle2">
                <div class="col-lg-12 col-sm-10 col-md-10 col-11 q-mb-md">
                  <div class="q-px-sm text-primary">
                    Endereço
                  </div>
                </div>
                <div class="col-lg-4 col-11 col-sm-3 col-md-3 q-px-sm q-mt-sm">
                  CEP*
                  <q-input
                    @change="procuraCEP(dados.cep)"
                    v-model="dados.cep"
                    mask="#####-###"
                    outlined
                    :disable="loading"
                    :rules="[
                      val =>
                        (val && val.length > 8) || 'Este campo é obrigatório!'
                    ]"
                    dense
                  ></q-input>
                </div>
                <div class="col-lg-6 col-11 col-sm-5 col-md-5 q-px-sm q-mt-sm">
                  Rua*
                  <q-input
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Este campo é obrigatório!'
                    ]"
                    v-model="dados.endereco.logradouro"
                    outlined
                    :disable="loading"
                    dense
                  ></q-input>
                </div>
                <div class="col-lg-2 col-11 col-sm-2 col-md-2 q-px-sm q-mt-sm">
                  Número*
                  <q-input
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Este campo é obrigatório!'
                    ]"
                    v-model="dados.endereco.numero"
                    outlined
                    :disable="loading"
                    mask="#######"
                    dense
                  ></q-input>
                </div>
              </div>
              <div class="row justify-center text-subtitle2">
                <div class="col-lg-4 col-11 col-sm-5 col-md-5  q-px-sm q-mt-sm">
                  Bairro*
                  <q-input
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Este campo é obrigatório!'
                    ]"
                    v-model="dados.endereco.bairro"
                    outlined
                    :disable="loading"
                    dense
                  ></q-input>
                </div>
                <div class="col-lg-8 col-11  col-sm-5 col-md-5 q-px-sm q-mt-sm">
                  Complemento
                  <q-input
                    v-model="dados.endereco.complemento"
                    outlined
                    :disable="loading"
                    dense
                  ></q-input>
                </div>
                <div class="col-lg-8 col-11  col-sm-5 col-md-5 q-px-sm q-mt-sm">
                  Cidade*
                  <q-input
                    v-model="dados.endereco.localidade"
                    outlined
                    :disable="loading"
                    dense
                  ></q-input>
                </div>
                <div class="col-lg-8 col-11  col-sm-5 col-md-5 q-px-sm q-mt-sm">
                  UF*
                  <q-input
                    v-model="dados.endereco.uf"
                    outlined
                    :disable="loading"
                    dense
                  ></q-input>
                </div>
                <div class="col-lg-12 col-11 col-sm-10 col-md-10  q-my-md">
                  <q-separator color="primary"> </q-separator>
                </div>
              </div>
              <div class="row justify-center text-subtitle2">
                <div
                  class="col-lg-12  text-primary col-sm-10 col-md-10 col-11 q-mb-md"
                >
                  <div class="q-px-sm">
                    Dados de acesso
                  </div>
                </div>
                <div class=" q-px-sm col-11 col-lg-6 col-md-5 col-sm-5 q-mt-sm">
                  E-mail*
                  <q-input
                    :rules="[
                      val =>
                        (val && validaEmail(dados.email)) ||
                        'Informe um e-mail válido!'
                    ]"
                    type="email"
                    v-model="dados.email"
                    outlined
                    :disable="loading"
                    dense
                  ></q-input>
                </div>
                <div class=" q-px-sm col-11 col-lg-6 col-md-5 col-sm-5 q-mt-sm">
                  Senha*
                  <q-input
                    :type="isPwd ? 'password' : 'text'"
                    v-model="dados.password"
                    outlined
                    :rules="[
                      val =>
                        (val && val.length > 5) ||
                        'Informe uma senha com no mínimo 6 caracteres.'
                    ]"
                    :disable="loading"
                    dense
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      /> </template
                  ></q-input>
                </div>
                <div class="col-lg-12 col-11 col-sm-10 col-md-10  q-my-md">
                  <q-separator color="primary"> </q-separator>
                </div>
              </div>
              <div class="row justify-center  q-mb-md">
                <div class="col-lg-12 col-11  q-px-sm col-sm-10 col-md-10">
                  <q-checkbox v-model="termos"></q-checkbox>Eu aceito os
                  <a href="">Termos de uso</a>
                </div>
                <div class="col-lg-12 col-11  q-px-sm col-sm-10 col-md-10">
                  <q-btn
                    @click="validaCampos()"
                    class=" full-width bg-primary text-white"
                    >Criar Conta</q-btn
                  >
                </div>
              </div>
            </q-form>
          </div>
          <div class="col-lg-6 col-md-2"></div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'CadastroEm',
  data () {
    return {
      termos: false,
      isPwd: true,
      contrato: false,
      loading: false,
      idUser: 5,
      ramosAtividades: [],
      dados: {
        razao_social: '',
        nome_fantasia: '',
        email: '',
        cnpj: '',
        ramo_atividade: null,
        password: '',
        celular: '',
        data_abertura: '',
        inscricao_social: '',
        qtd_funcionarios: '',
        link_site: '',
        estrela: 0,
        endereco: {
          logradouro: '',
          numero: '',
          complemento: '',
          localidade: '',
          bairro: '',
          uf: ''
        },
        type: 'pequena'
      }
    }
  },
  computed: {},
  mounted () {
    this.ramosAtividades = this.getCnae()
    this.addEmpresaData({ dados: this.dados })
  },
  methods: {
    ...mapGetters('usuarios', ['getCnae']),
    ...mapActions('empresas', ['addEmpresa', 'addEmpresaData']),
    validaCampos () {
      this.$refs.formCadastro.validate().then(success => {
        if (success) {
          console.log('HEHEHEHEHE')
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
    procuraCEP (strCEP) {
      const cep = strCEP.replaceAll('-', '')
      const vm = this
      delete this.$axios.defaults.headers.common.Authorization
      vm.$axios
        .get('https://viacep.com.br/ws/' + cep + '/json', {})
        .then(res => {
          this.dados.endereco.logradouro = res.data.logradouro
          this.dados.endereco.bairro = res.data.bairro
          this.dados.endereco.localidade = res.data.localidade
          this.dados.endereco.uf = res.data.uf
        })
        .catch(function (error) {
          console.log(error)
          this.$q.notify({
            message: 'CEP inválido, informe novamente!',
            color: 'red'
          })
        })
    },
    validaEmail () {
      const usuario = this.dados.email.substring(
        0,
        this.dados.email.indexOf('@')
      )
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
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.ramosAtividades = this.getCnae()
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.ramosAtividades = this.getCnae().filter(
          v =>
            v.desc.toLowerCase().indexOf(needle) > -1 ||
            v.cod.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    salvarDados () {
      console.log('SALVAR DADOS')
      this.addEmpresa({
        dados: this.dados
      }).then((res) => {
        this.addEmpresaData({ dados: res }).then(res => {
          console.log('🚀 ~ file: CadastroEmp.vue ~ line 517 ~ salvarDados ~ res', res)
          console.log('THEN DO SALVAR DADOS')
          this.$q.notify({
            position: 'bottom',
            color: 'positive',
            textColor: 'white',
            icon: 'check',
            message: 'Empresa cadastrada com sucesso!'
          })

          this.loginUser({
            dados: {
              email: this.dados.email,
              password: this.dados.password
            }
          }).then((res) => {
            console.log('res', res)
            switch (res.data.typeUser) {
              case 'empresa':
                this.$router.replace({ name: 'algo' }) // TROCAR ROTA
                break
              case 'usuario':
                this.$router.replace({ name: 'algo' }) // TROCAR ROTA
                break
              default:
                this.$router.replace({ name: 'algo' }) // TROCAR ROTA
                break
            }
          })
        })
      }).catch(err => {
        this.$q.notify({
          position: 'bottom',
          color: 'negative',
          textColor: 'white',
          icon: 'close',
          message: err.message
        })
      })
    }
  }
}
</script>

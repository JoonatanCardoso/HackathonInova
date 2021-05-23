<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-lg-6 col-md-8 q-mt-xl">
        <q-card class="q-mt-xl bordacolor bg-grey-3">
          <div class="row justify-center">
            <div class="col-lg-8 col-11 text-h5 text-primary q-my-md">
              Perfil do empresário
            </div>
            <div
              class="col-lg-3 text-h5 text-black text-primary q-my-md float-right"
            >
            {{this.getUser().data.estrela}} <q-img width="35px" src="image.png"></q-img></div>
          </div>
          <div class="row justify-center">
            <div class="col-lg-5 col-md-5 text-primary col-11 q-my-sm q-px-xs">
              Razão Social
              <q-input bg-color="white" v-model="dados.razao_social" dense outlined disable>
              </q-input>
            </div>
            <div class="col-lg-5 col-md-5  q-my-sm col-11 text-primary q-px-xs">
              Nome Fantasia
              <q-input bg-color="white" v-model="dados.nome_fantasia" dense outlined disable>
              </q-input>
            </div>
            <div
              class="col-lg-5 col-md-5   q-my-sm col-11 text-primary q-px-xs"
            >
              CNPJ
              <q-input bg-color="white" v-model="dados.cnpj" dense outlined disable> </q-input>
            </div>
            <div
              class="col-lg-5 col-md-5  q-my-sm col-11  text-primary q-px-xs"
            >
              Ramo de atividade
              <q-input bg-color="white" v-model="dados.ramo" dense outlined disable> </q-input>
            </div>
            <div
              class="col-lg-5  col-md-5  q-my-sm col-11 text-primary q-px-xs"
            >
              Tipo da empresa
              <q-input  bg-color="white" v-model="dados.tipo" dense outlined disable> </q-input>
            </div>
            <div
              class="col-lg-5 col-md-5  q-my-sm col-11  text-primary q-px-xs"
            >
              Qtd. Funcionários
              <q-input bg-color="white" v-model="dados.qtdFunc" dense outlined disable>
              </q-input>
            </div>
            <div
              class="col-lg-5 col-md-5   q-my-sm col-11 text-primary q-px-xs"
            >
              E-mail
              <q-input bg-color="white" v-model="dados.email" dense outlined disable> </q-input>
            </div>
            <div
              class="col-lg-5 col-md-5  q-my-sm col-11  text-primary q-px-xs"
            >
              Celular
              <q-input  bg-color="white" v-model="dados.celular" dense outlined disable>
              </q-input>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PerfilEmp',
  data () {
    return {
      dataHoje: '',
      diaHoje: '',
      dados: {
        razao_social: '',
        nome_fantasia: '',
        cnpj: '',
        ramo: '',
        qtdFunc: '',
        tipo: '',
        email: '',
        celular: ''
      },
      msg: '',
      loading: { mural: true, empresa: true, servicos: true }
    }
  },
  mounted () {
    this.getDados()
  },
  methods: {
    ...mapGetters('userAuth', ['getUser']),
    getDados () {
      this.dados.razao_social = this.getUser().data.razao_social
      this.dados.nome_fantasia = this.getUser().data.nome_fantasia
      this.dados.cnpj = this.getUser().data.cnpj
      this.dados.ramo = this.getUser().data.ramo_atividade.desc
      this.dados.qtdFunc = this.getUser().data.qtd_funcionarios
      this.dados.email = this.getUser().data.email
      this.dados.celular = this.getUser().data.celular
      if (this.getUser().data.type === 'pequena') {
        this.dados.tipo = 'Pequeno Porte'
      } else if (this.getUser().data.type === 'media_grande') {
        this.dados.tipo = 'Grande/Médio Porte'
      } else if (this.getUser().data.type === 'produtor_rural') {
        this.dados.tipo = 'Produtor Rural'
      }
    }
  }
}
</script>
<style>
.bordacolor {
  border-style: solid;
  border-color: white;
  border-width: 10px;
}
</style>

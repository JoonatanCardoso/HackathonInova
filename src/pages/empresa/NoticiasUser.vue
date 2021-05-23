<template>
  <q-page>
    <div class="row justify-center q-px-sm ">
      <div class="col-lg-8 col-11 col-md-8 col-sm-8 q-my-lg text-subtitle1">
        Olá, seja bem vindo(a) ao Acelara Araguína - Supply Chain,
        <span class="text-weight-bold text-primary">{{ this.getUser().data.razao_social}}</span
        >!
      </div>
      <div
        class="col-lg-2 col-md-2 col-sm-3 col-11 text-subtitle1"
        :class="$q.screen.gt.xs ? 'q-my-lg' : ' q-mb-lg'"
      >
        {{ diaHoje }}
      </div>
    </div>
    <div class="row justify-center text-subtitle1 q-px-sm ">
      <div class="col-lg-10 col-md-10 q-mt-sm">
        Últimos itens adicionados ou nosso mural:
      </div>
    </div>
    <div class="row justify-center text-center q-mt-md  text-subtitle2 q-px-sm">
      <q-card class="shadow-0 bg-grey-2">
        <div class="col-lg-10 col-10 q-mt-sm">
          Legenda
        </div>
        <div class="col-lg-5 q-mb-md q-mx-sm">
          <q-badge class="q-mx-xs" style="background-color:#1976d2">
            Evento
          </q-badge>
          <q-badge class="q-mx-xs" style="background-color:#26a69a">
            Curso
          </q-badge>
          <q-badge class="q-mx-xs" style="background-color:#9c27b0">
            Oficina
          </q-badge>
          <q-badge class="q-mx-xs" style="background-color:#21ba45">
            Webinar
          </q-badge>
          <q-badge class="q-mx-xs" style="background-color:#c10015">
            Consultoria
          </q-badge>
          <q-badge class="q-mx-xs" style="background-color:#f2c037">
            Outros
          </q-badge>
        </div>
      </q-card>
    </div>
    <div class="row justify-center q-my-lg  q-gutter-y-md  text-subtitle2 ">
      <div v-for="(item, key) in getListaMurais" :key="key" class="col-lg-2 col-12 col-md-4 col-sm-5 q-px-sm">
        <a
          :href="item.link"
          style="text-decoration: none"
          target="_blank"
          class="cursor-pointer text-black"
        >
          <q-card v-ripple>
            <div :style="'background-color:' + item.cor">
              <br />
            </div>
            <q-card-section class="text-justify">
              <span class="text-weight-bold">
                {{item.titulo}}
              </span>
              <br />
              Realização: {{item.data_validade}}
            </q-card-section>
            <div :style="'background-color:' + item.cor">
              <br /></div
          ></q-card>
        </a>
      </div>

    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
export default {
  name: 'NoticiasUser',
  data () {
    return {
      nomeUser: 'Administrador',
      dataHoje: '',
      diaHoje: '',
      corTeste: '#21ba45',
      msg: ''
    }
  },
  mounted () {
    this.pegarData()
    this.pegaDia()
    this.pegaMsg()
    this.getMurais()
  },
  computed: {
    ...mapGetters('mural', ['getListaMurais'])
  },
  methods: {
    ...mapActions('mural', ['getMurais']),
    ...mapGetters('userAuth', ['getUser']),
    pegaMsg () {
      this.msg = {
        dia: 'Bom dia',
        tarde: 'Boa tarde',
        noite: 'Boa noite'
      }
      this.msg = new Date().getDay() > 5 ? (this.msg.dia > 12 ? this.msg.tarde : this.msg.noite) : ''
    },
    pegarData () {
      this.dataHoje = moment().format('DD-MM-YYYY HH:mm')
      setInterval(() => {
        this.dataHoje = moment().format('DD-MM-YYYY HH:mm')
      }, 30000)
    },
    pegaDia () {
      this.diaHoje = moment().locale('pt').format('dddd - DD-MM-YYYY')
    }
  }
}
</script>

<template>
  <q-page>
    <div class="row justify-center q-px-sm ">
      <div class="col-lg-8 col-11 col-md-8 col-sm-8 q-my-lg text-subtitle1">
        Olá, bem vindo(a) ao Acelara Araguína - Supply Chain,
        <span class="text-weight-bold text-primary">{{ nomeUser }}</span
        >!
      </div>
      <div
        class="col-lg-2 col-md-2 col-sm-3 col-11 text-subtitle1"
        :class="$q.screen.gt.xs ? 'q-my-lg' : ' q-mb-lg'"
      >
        {{ diaHoje }} - {{ dataHoje }}
      </div>
    </div>
    <div class="row justify-center text-subtitle1 q-px-sm ">
      <div class="col-lg-10 q-mt-sm">
        Últimos itens adicionados ou nosso mural:
      </div>
    </div>
    <div class="row justify-center text-center  text-subtitle2 q-px-sm">
      <q-card class="shadow-0 bg-grey-2">
        <div class="col-lg-10 col-10 q-mt-sm">
          Legenda
        </div>
        <div class="col-lg-5 q-mb-md q-mx-sm">
          <q-badge class="q-mx-xs" style="background-color:#1976d2">
            Eventos
          </q-badge>
          <q-badge class="q-mx-xs" style="background-color:#26a69a">
            Cursos
          </q-badge>
          <q-badge class="q-mx-xs" style="background-color:#9c27b0">
            Oficinas
          </q-badge>
          <q-badge class="q-mx-xs" style="background-color:#21ba45">
            Webinars
          </q-badge>
          <q-badge class="q-mx-xs" style="background-color:#c10015">
            Consultorias
          </q-badge>
          <q-badge class="q-mx-xs" style="background-color:#f2c037">
            Outros
          </q-badge>
        </div>
      </q-card>
    </div>
    <div class="row justify-center q-mt-lg  text-subtitle2 ">
      <div class="col-lg-2 col-12  q-px-sm">
        <a
          href=""
          style="text-decoration: none"
          target="_blank"
          class="cursor-pointer text-black"
        >
          <q-card v-ripple>
            <div :style="'background-color:' + corTeste">
              <br />
            </div>
            <q-card-section class="text-justify">
              <span class="text-weight-bold">
                Evento do Sebrae bem brabo
              </span>
              <br />
              Realização: 22/05/2021
            </q-card-section>
            <div :style="'background-color:' + corTeste">
              <br /></div
          ></q-card>
        </a>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'NoticiasUser',
  data () {
    return {
      nomeUser: 'Administrador',
      dataHoje: '',
      diaHoje: '',
      corTeste: '#21ba45'
    }
  },
  mounted () {
    this.pegarData()
    this.pegaDia()
  },
  methods: {
    pegarData () {
      this.dataHoje = new Date().toLocaleDateString()
      this.diaHoje = new Date().getDay()
    },
    pegaDia () {
      if (this.diaHoje === 0) {
        this.diaHoje = 'Domingo'
      } else if (this.diaHoje === 1) {
        this.diaHoje = 'Segunda-Feira'
      } else if (this.diaHoje === 2) {
        this.diaHoje = 'Terça-Feira'
      } else if (this.diaHoje === 3) {
        this.diaHoje = 'Quarta-Feira'
      } else if (this.diaHoje === 4) {
        this.diaHoje = 'Quinta-Feira'
      } else if (this.diaHoje === 5) {
        this.diaHoje = 'Sexta-Feira'
      } else if (this.diaHoje === 6) {
        this.diaHoje = 'Sábado'
      }
    }
  }
}
</script>

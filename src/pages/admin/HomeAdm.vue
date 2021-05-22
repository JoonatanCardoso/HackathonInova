<template>
  <q-page>
    <div class="row justify-center ">
      <div class="col-lg-8 q-my-lg text-subtitle1">
        Olá, bem vindo(a) <span class="text-weight-bold text-primary">{{nomeUser}}</span>
      </div>
            <div class="col-lg-2 q-my-lg text-subtitle1">
       {{diaHoje}} - {{dataHoje}}
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'HomeAdm',
  data () {
    return {
      nomeUser: 'Administrador',
      dataHoje: '',
      diaHoje: ''
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

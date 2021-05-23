<template>
  <q-page padding>
    <div class="row">
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-6 col-xs-10 text-h4 q-my-lg">
          Orçamentos
        </div>
        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-11" :class="$q.screen.gt.xs ? 'q-my-lg' : ' q-mb-lg'">
          <q-btn class="bg-primary text-white text-bold q-mx-md" no-caps no-wrap label="Cadastrar orçamento" @click="open()"/>
        </div>
    </div>
    <div class="row justify-center q-gutter-sm">
      <q-btn class="col-xl-3 col-lg-3 col-md-3 col-sm-11 col-xs-11 bg-primary text-bold text-white shadow-2 text-center q-pa-sm"
      @click="lista = true; meus = false; aprovacao = false"
      >
        <span>Lista de Orçamentos</span>
      </q-btn>
      <q-btn class="col-xl-3 col-lg-3 col-md-3 col-sm-11 col-xs-11 bg-primary text-bold text-white shadow-2 text-center q-pa-sm"
      @click="lista = false; meus = true; aprovacao = false"
      >
        <span>Meus Orçamentos</span>
      </q-btn>
      <q-btn class="col-xl-3 col-lg-3 col-md-3 col-sm-11 col-xs-11 bg-primary text-bold text-white shadow-2 text-center q-pa-sm"
      @click="lista = false; meus = false; aprovacao = true"
      >
        <span>Aprovação de Orçamentos</span>
      </q-btn>

      <div v-if="lista == true" class="col-xl-9 col-lg-9 col-md-9 col-sm-11 col-xs-11 q-mt-lg" style="border:solid 2px; border-radius: 5px; color: #ffe600">
        <q-list>
          <q-item class="bg-grey-2 text-black q-pa-md">
            <span>Produção de Uniformes</span>
          </q-item>
          <q-separator/>
          <q-item class="bg-grey-2 text-black q-pa-md">
            <span>Produção de Uniformes</span>
          </q-item>
        </q-list>
      </div>
      <div v-if="meus == true" class="col-xl-9 col-lg-9 col-md-9 col-sm-11 col-xs-11 q-mt-lg" style="border:solid 2px; border-radius: 5px; color: #f4110e">
        <q-list>
          <q-item class="bg-grey-2 text-black q-pa-md">
            <span>Produção de Marmitas</span>
          </q-item>
          <q-separator/>
          <q-item class="bg-grey-2 text-black q-pa-md">
            <span>Produção de Marmitas</span>
          </q-item>
        </q-list>
      </div>
      <div v-if="aprovacao == true" class="col-xl-9 col-lg-9 col-md-9 col-sm-11 col-xs-11 q-mt-lg" style="border:solid 2px; border-radius: 5px; color: #008b35">
        <q-list>
          <q-item class="bg-grey-2 text-black q-pa-md">
            <span>Produção de Xícaras</span>
          </q-item>
          <q-separator/>
          <q-item class="bg-grey-2 text-black q-pa-md">
            <span>Produção de Xícaras</span>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'orcamentos',
  data () {
    return {
      lista: false,
      meus: false,
      aprovacao: false
    }
  }
}
</script>

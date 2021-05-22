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
  </q-page>
</template>

<script>
export default {
  name: 'orcamentos'
}
</script>

<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-lg-6 q-mt-xl">
        <q-card class="q-mt-xl bordacolor bg-grey-3">
          <div class="row justify-center">
            <div class="col-lg-8 col-11 text-h5 text-primary q-my-md">
              Perfil do empresário
            </div>
            <div
              class="col-lg-3 text-h5 text-primary q-my-md float-right"
            ></div>
          </div>
          <div class="row justify-center">
            <div class="col-lg-5 text-primary col-11 q-my-sm q-px-xs">
              Razão Social
              <q-input dense outlined disable> </q-input>
            </div>
            <div class="col-lg-5 q-my-sm col-11 text-primary q-px-xs">
              Nome Fantasia
              <q-input dense outlined disable> </q-input>
            </div>
            <div class="col-lg-5  q-my-sm col-11 text-primary q-px-xs">
              CNPJ
              <q-input dense outlined disable> </q-input>
            </div>
            <div class="col-lg-5 q-my-sm col-11  text-primary q-px-xs">
              Ramo de atividade
              <q-input dense outlined disable> </q-input>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PerfilEmp'
}
</script>
<style>
.bordacolor {
  border-style: solid;
  border-color: white;
  border-width: 10px;
}
</style>

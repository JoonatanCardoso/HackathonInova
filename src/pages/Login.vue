<template>
  <q-page class="bg-primary">
    <div class="row flex-center fullscreen">
      <div class="col-lg-3">
        <q-card class="bg-white">
         <q-card-section class="text-center text-secondary text-h6 text-weight-bolder">
           Acelera Araguaína - Supply chain
         </q-card-section>
         <q-card-section><q-input></q-input></q-card-section>
            <q-card-section><q-input></q-input></q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      senha: '',
      isPwd: true,
      submitting: false
    }
  },
  methods: {}
}
</script>

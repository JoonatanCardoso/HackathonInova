<template>
  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
    :maximized="$q.platform.is.mobile"
    :full-width="$q.platform.is.mobile"
    persistent
    v-model="cadNoticias"
  >
    <q-card style="width: 500px; max-width: 80vw;">
      <q-bar class="full-width bg-primary text-white">
        <q-space />

        <q-btn @click="close()" dense flat icon="close" v-close-popup> </q-btn>
      </q-bar>
      <q-card-section>
        <div class="text-h6 text-center text-weight-bolder text-primary">
          Cadastro de item
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none text-justify">
        Título
        <q-input dense outlined v-model="titulo"></q-input>
      </q-card-section>
      <q-card-section class="q-pt-none text-justify">
        Tipo
        <q-select dense outlined v-model="select"
                  :options="options" emit-value
                  map-options/>
      </q-card-section>
      <q-card-section class="q-pt-none text-justify">
        Link
        <q-input dense outlined v-model="link"></q-input>
      </q-card-section>
      <q-card-section class="q-pt-none text-justify">
        Data de Validade
        <q-input dense outlined v-model="dataV"></q-input>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cancelar" color="red" v-close-popup />
        <q-btn label="Cadastrar" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'modalNoticias',
  ref: 'modalNoticias',
  data () {
    return {
      cadNoticias: false,
      select: null,
      titulo: '',
      tipo: '',
      link: '',
      dataV: '',
      options: [
        {
          label: 'Eventos',
          value: 'eventos'
        },
        {
          label: 'Webinars',
          value: 'webinars'
        },
        {
          label: 'Cursos',
          value: 'cursos'
        },
        {
          label: 'Consultorias',
          value: 'consultorias'
        },
        {
          label: 'Oficinas',
          value: 'oficinas'
        },
        {
          label: 'Outros',
          value: 'outros'
        }
      ]
    }
  },
  methods: {
    open () {
      this.cadNoticias = true
    },
    close () {
      this.cadNoticias = false
    }
  }
}
</script>

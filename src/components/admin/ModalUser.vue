<template>
  <q-dialog v-model="modal" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center text-weight-bolder text-primary">
            Cad
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none text-justify">
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="OK"
          color="primary"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'ModalUser',
  ref: 'ModalUser',
  data () {
    return {
      modal: false
    }
  },
  props: {},
  mounted () {},
  computed: {},
  methods: {
    close () {
      this.modal = false
    },
    open () {
      this.modal = true
    }
  }
}
</script>

<style></style>

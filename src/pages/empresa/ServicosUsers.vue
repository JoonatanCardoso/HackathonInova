<template>
  <q-page>
    {{servicos}}
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'GerenciarServicos',
  data () {
    return {}
  },
  mounted () {
    this.getServicos()
  },
  computed: {
    ...mapState('servicos', ['servicos'])
  },
  methods: {
    ...mapActions('servicos', ['getServicos', 'delServiço'])
  }
}
</script>

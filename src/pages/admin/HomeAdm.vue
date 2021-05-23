<template>
  <q-page>
    <div class="row justify-center q-px-sm ">
      <div class="col-lg-8 col-11 col-md-8 col-sm-8 q-my-lg text-subtitle1">
        {{msg}}, seja bem vindo(a)
        <span class="text-weight-bold text-primary">{{ nomeUser }}</span>
      </div>
      <div class="col-lg-2 col-md-2 col-sm-3 col-11 text-subtitle1" :class="$q.screen.gt.xs ? 'q-my-lg' : ' q-mb-lg'">
        {{ diaHoje }}
      </div>
    </div>
    <div class="row justify-center q-gutter-y-md">
      <div class="col-lg-2 col-11 col-md-3 q-px-sm">
        <q-card>
          <q-card bordered class="shadow-0 bg-white border">
            <q-card-section class="text-h4">
              <p><q-circular-progress
                v-if="loading.empresa"
                indeterminate
                size="50px"
                color="red"
                class="q-ma-md"
              /></p>
              <p v-if="!loading.empresa" >{{getEstatisticas().pequena.length}}</p>
              <span class="text-subtitle1 text-grey-7">Emp. Pequenas</span>
            </q-card-section>
          </q-card>
        </q-card>
      </div>
      <div class="col-lg-2 col-11 col-md-3 q-px-sm">
        <q-card>
          <q-card bordered class="shadow-0 bg-white border">
            <q-card-section class="text-h4">
               <p><q-circular-progress
                v-if="loading.empresa"
                indeterminate
                size="50px"
                color="red"
                class="q-ma-md"
              /></p>
              <p v-if="!loading.empresa" >{{getEstatisticas().media_grande.length}}</p>
              <span class="text-subtitle1 text-grey-7"
                >Emp. Médias/Grandes</span
              >
            </q-card-section>
          </q-card>
        </q-card>
      </div>
      <div class="col-lg-2 col-11 col-md-2 q-px-sm">
        <q-card>
          <q-card bordered class="shadow-0 bg-white border">
            <q-card-section class="text-h4">
              <p><q-circular-progress
                v-if="loading.empresa"
                indeterminate
                size="50px"
                color="red"
                class="q-ma-md"
              /></p>
              <p v-if="!loading.empresa" >{{getEstatisticasMurais().geral}}</p>
              <span class="text-subtitle1 text-grey-7">Itens no mural</span>
            </q-card-section>
          </q-card>
        </q-card>
      </div>
      <div class="col-lg-2 col-11 col-md-2 q-px-sm">
        <q-card>
          <q-card bordered class="shadow-0 bg-white border">
            <q-card-section class="text-h4">
              <p>165</p>
              <span class="text-subtitle1 text-grey-7">Serviços</span>
            </q-card-section>
          </q-card>
        </q-card>
      </div>
    </div>
    <div class="row justify-center q-mt-md">
      <div class="col-lg-8  col-11 col-md-10 col-sm-11 q-px-sm">
        <q-card class="">
          <div class="row justify-center q-px-sm">
            <div class="col-lg-12 col-sm-12  q-mt-md text-h5 text-grey-7">
              Empresas -
              <span class="text-subtitle2">Por ramo de atividade</span>
            </div>
            <div class="col-12 q-my-md">
              <q-separator></q-separator>
            </div>
          </div>
          <div class="row justify-center q-px-sm q-gutter-x-sm">
            <div class="col-lg-3 col-md-3 col-11 col-sm-4 q-mb-md">
              <div class="text-justify q-px-xs">
                <q-badge color="red">Qtd - 4</q-badge> - Cultivo de outras
                plantas de lavoura permanente não especificadas anteriormente
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-11 col-sm-4 q-mb-md">
              <div class="text-justify q-px-xs">
                <q-badge color="red">Qtd - 4</q-badge> - Produção de produtos
                não-madeireiros não especificados anteriormente em florestas
                plantadas
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-11 col-sm-4 q-mb-md">
              <div class="text-justify q-px-xs">
                <q-badge color="red">Qtd - 4</q-badge> - Extração de minérios de
                cobre, chumbo, zinco e outros minerais metálicos não-ferrosos
                especificados anteriormente.
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-11 col-sm-4 q-mb-md">
              <div class="text-justify q-px-xs">
                <q-badge color="red">Qtd - 4</q-badge> - Confecção, sob medida,
                de peças do vestuário, exceto roupas íntimas SIM/NÃO O material
                será fornecido pelo executante do serviço?
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-11 col-sm-4 q-mb-md">
              <div class="text-justify q-px-xs">
                <q-badge color="red">Qtd - 4</q-badge> - Fabricação de produtos
                de papel, cartolina, papel-cartão e papelão ondulado para uso
                industrial, comercial e de escritório, exceto formulário
                contínuo
              </div>
            </div>
            <div class="col-lg-3 col-md-3  col-11 col-sm-4 q-mb-md">
              <div class="text-justify q-px-xs">
                <q-badge color="red">Qtd - 4</q-badge> - Coquerias
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
    <div class="row justify-center q-mt-lg q-mb-lg">
      <div class="col-lg-8 col-md-10  col-11 col-sm-11 q-px-sm">
        <q-card class="">
          <div class="row justify-center q-px-sm">
            <div class="col-lg-12 col-sm-12  q-mt-md text-h5 text-grey-7">
              Itens Mural -
              <span class="text-subtitle2">Por tipo</span>
            </div>
            <div class="col-12 q-my-md">
              <q-separator></q-separator>
            </div>
          </div>
          <div class="row justify-center q-px-sm q-gutter-x-sm">
            <div class="col-lg-3 col-sm-4 col-md-3 q-mb-sm">
              <q-circular-progress
                v-if="loading.mural"
                indeterminate
                size="50px"
                color="red"
                class="q-ma-md"
              />
              <div v-if="!loading.mural" >
                <div class="text-justify q-px-xs" v-for="(item, idm) in getEstatisticasMurais()" :key="item.length * 12">
                <div v-if="idm !== 'geral'"><q-badge color="red">Qtd - {{item.length}}</q-badge> - {{idm}}</div>
              </div>
              </div>

            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
export default {
  name: 'HomeAdm',
  data () {
    return {
      nomeUser: 'Administrador',
      dataHoje: '',
      diaHoje: '',
      msg: '',
      loading: { mural: true, empresa: true }
    }
  },
  mounted () {
    this.pegarData()
    this.pegaDia()
    this.pegaMsg()
    this.getCountEmpresas().then(_ => { this.loading.empresa = false })
    this.getCountMurais().then(_ => { this.loading.mural = false })
  },
  methods: {
    ...mapActions('empresas', ['getCountEmpresas']),
    ...mapGetters('empresas', ['getEstatisticas']),
    ...mapActions('mural', ['getCountMurais']),
    ...mapGetters('mural', ['getEstatisticasMurais']),
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

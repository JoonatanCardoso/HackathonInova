<template>
  <q-page padding>
    <div class="row justify-center">
      <div
        class="col-xl-10 col-lg-6 col-md-8 col-sm-6 col-xs-10 text-bold text-h4 q-my-lg"
      >
        Orçamentos
      </div>
    </div>
    <div class="row justify-center q-gutter-sm q-mt-xl">
      <q-btn
        class="col-xl-3 col-lg-3 col-md-3 col-sm-11 col-xs-11 bg-primary text-bold text-white shadow-2 text-center q-pa-sm"
        @click="
          lista = true;
          meus = false;
          aprovacao = false;
        "
      >
        <span>Propostas de Orçamentos</span>
      </q-btn>
      <q-btn
        class="col-xl-3 col-lg-3 col-md-3 col-sm-11 col-xs-11 bg-primary text-bold text-white shadow-2 text-center q-pa-sm"
        @click="
          lista = false;
          meus = true;
          aprovacao = false;
        "
      >
        <span>Meus Orçamentos</span>
      </q-btn>
      <q-btn
        class="col-xl-3 col-lg-3 col-md-3 col-sm-11 col-xs-11 bg-primary text-bold text-white shadow-2 text-center q-pa-sm"
        @click="
          lista = false;
          meus = false;
          aprovacao = true;
        "
      >
        <span>Histórico de orçamento</span>
      </q-btn>

      <div
        v-if="lista == true"
        class="col-xl-9 col-lg-9 col-md-9 col-sm-11 col-xs-11 q-mt-lg"
        style="border:solid 2px; border-radius: 5px; color: #ffe600"
      >
        <q-list>
          <q-item
            class="bg-grey-2 text-black q-pa-md"
            clickable
            @click="openInfo()"
          >
          <div class="col-8">
            <span>(Cod. 624) Produção de Uniformes</span>
            </div>
            <div class="col-2">
              <q-badge color="primary" text-color="white" icon="event">
                28/06/2021 venc.
              </q-badge>
            </div>
          </q-item>
          <infoorc ref="InfoOrcamento"></infoorc>
          <q-separator />
        </q-list>
      </div>
      <div
        v-if="meus == true"
        class="col-xl-9 col-lg-9 col-md-9 col-sm-11 col-xs-11 q-mt-lg"
        style="border:solid 2px; border-radius: 5px; color: #f4110e"
      >
        <div class="q-pa-lg text-center">
          <q-btn
            class="full-width"
            outline
            label="Cadastrar Orçamento"
            @click="open()"
          />
          <orc ref="CadOrcamento"></orc>
        </div>
        <q-list>
          <q-item
            class="row bg-grey-2 text-black q-pa-md"
            clickable
            @click="openEdit()"
          >
            <div class="col-9">
              <span>Produção de Marmitas</span>
            </div>
            <div class="col-2">
              <q-badge color="primary" text-color="white" icon="event">
                2 propostas
              </q-badge>
            </div>
          </q-item>
          <editorc ref="EditOrcamento"></editorc>
          <q-separator />
        </q-list>
      </div>
      <div
        v-if="aprovacao == true"
        class="col-xl-9 col-lg-9 col-md-9 col-sm-11 col-xs-11 q-mt-lg"
        style="border:solid 2px; border-radius: 5px; color: #008b35"
      >
        <q-list>
          <q-item
            class="row bg-grey-2 text-black q-pa-md"
            clickable
            @click="openHist()"
          >
            <div class="col-9">
              <span>Produção de Xícaras</span>
            </div>
            <div class="col-2">
              <q-badge color="primary" text-color="white" icon="event">
                Aprovado
              </q-badge>
            </div>
          </q-item>
          <horc ref="HistOrcamento"></horc>
          <q-separator />
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import CadOrcamento from 'components/empresa/CadOrcamento.vue'
import InfoOrcamento from 'components/empresa/InfoOrcamento.vue'
import EditOrcamento from 'components/empresa/EditOrcamento.vue'
import HistOrcamento from 'components/empresa/HistOrcamento.vue'

export default {
  name: 'orcamentos',
  data () {
    return {
      lista: false,
      meus: false,
      aprovacao: false
    }
  },
  components: {
    orc: CadOrcamento,
    infoorc: InfoOrcamento,
    editorc: EditOrcamento,
    horc: HistOrcamento
  },
  methods: {
    open () {
      this.$refs.CadOrcamento.open()
    },
    openInfo () {
      this.$refs.InfoOrcamento.open()
    },
    openEdit () {
      this.$refs.EditOrcamento.open()
    },
    openHist () {
      this.$refs.HistOrcamento.open()
    }
  }
}
</script>

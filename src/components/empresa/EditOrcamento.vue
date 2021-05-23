<template>
  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
    persistent
    :maximized="$q.platform.is.mobile"
    :full-width="$q.platform.is.mobile"
    v-model="editorcamento"
  >
    <q-card class="row justify-center" style="width: 700px; max-width: 80vw;">
      <q-bar class="full-width bg-primary text-white">
        <q-space />

        <q-btn @click="close()" dense flat icon="close" v-close-popup> </q-btn>
      </q-bar>
      <div
        class="justify-center col-xl-8 col-lg-8 col-md-8 col-sm-11 col-xs-11"
      >
        <q-card-section>
          <div class="text-h6 text-center text-weight-bolder text-primary">
            <span>Detalhes do Orçamento</span>
          </div>
        </q-card-section>
        <!------------------------ FORM ------------------------>
        <q-form>
          <q-card-section class="q-pt-none text-justify">
            Título*
            <q-input v-model="tituloOr" dense outlined />
          </q-card-section>
          <q-card-section class="q-pt-none text-justify">
            Ramo de atividade*
            <q-select v-model="ramoOr" dense outlined />
          </q-card-section>
          <q-card-section class="q-pt-none text-justify">
            Arquivo do orçamento
            <q-uploader class="full-width" url="http://localhost:4444/upload" />
            <q-btn
              @click="download()"
              dense
              flat
              label="Dowload do orçamento"
              icon="download"
              v-close-popup
            >
            </q-btn>
          </q-card-section>
          <q-card-section>
            <div class="row justify-between">
              <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                Data
                <q-input
                  outlined
                  dense
                  mask="##/##/####"
                  v-model="dataOr"
                  :rules="['date']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="date">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                Horas
                <q-input
                  outlined
                  dense
                  v-model="horaOr"
                  mask="time"
                  :rules="['time']"
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="time">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
          <q-separator />

          <q-card-section>
            <div class="text-h6 text-center text-weight-bolder text-primary">
              <span>Propostas para Orçamento</span>
            </div>

            <div class="q-mt-lg">
              <q-list>
                <q-separator />
                <q-item class="q-mt-sm justify-between">
                  <div class="text-bold col-6 text-left content">
                    Sabor Brasil LTDA
                  </div>
                  <div class="col-6 text-right">
                    <q-btn dense outline @click="detalOrcamento = true"
                      >Detalhes</q-btn
                    >
                  </div>
                </q-item>
                <q-separator />
                <q-item class="q-mt-sm">
                  <div class="text-bold col-6 text-left content">
                    Marmitaria João de Barro
                  </div>
                  <div class="col-6 text-right">
                    <q-btn dense outline>Detalhes</q-btn>
                  </div>
                </q-item>
              </q-list>
            </div>
          </q-card-section>

          <q-card-actions class="q-pa-md" align="right">
            <q-btn class="text-primary" label="Fechar" outline v-close-popup />
            <q-btn
              class="text-red"
              label="Deletar"
              outline
              @click="delorcamento = true"
            />
            <q-btn class="bg-primary text-white" label="Salvar" v-close-popup />
          </q-card-actions>
        </q-form>
      </div>
    </q-card>
    <q-dialog v-model="detalOrcamento">
      <div
        class="row bg-white justify-center text-center"
        style="border:solid 10px; border-radius: 20px; color: #008b35"
      >
        <div class="text-primary col-12 q-pa-xl">
          <div class="text-h6 text-center text-weight-bolder text-primary">
            <span>Propostas para Orçamento</span>
          </div>
          <div class="q-pt-md text-justify">
            Arquivo enviado por <b>Sabor Brasil LTDA</b>
            <q-uploader
              class="q-mt-md full-width"
              url="http://localhost:4444/upload"
            />
          </div>
          <div class="text-center">
            <q-btn
              class="q-ma-xs text-bold q-mt-lg"
              outline
              label="Fechar"
              no-caps
              v-close-popup
            />
            <q-btn
              class="q-ma-xs text-bold bg-red text-white q-mt-lg"
              label="Recusar"
              no-caps
              @click="editorcamento = false"
              v-close-popup
            />
            <q-btn
              class="q-ma-xs text-bold bg-primary text-white q-mt-lg"
              label="Aceitar"
              no-caps
              @click="editorcamento = false"
              v-close-popup
            />
          </div>
        </div>
      </div>
    </q-dialog>
    <q-dialog v-model="delorcamento">
      <div
        class="row bg-white justify-center text-center"
        style="border:solid 10px; border-radius: 20px; color: #008b35"
      >
        <div class="text-primary col-12 q-pa-xl">
          <div class="text-h6 text-center text-weight-bolder text-primary">
            <span>Deseja realmente deletar esse orçamento?</span>
          </div>
          <div class="text-center">
            <q-btn
              class="q-ma-xs text-bold bg-red text-white q-mt-lg"
              label="Não"
              no-caps
              @click="editorcamento = false"
              v-close-popup
            />
            <q-btn
              class="q-ma-xs text-bold bg-primary text-white q-mt-lg"
              label="Sim"
              no-caps
              @click="editorcamento = false"
              v-close-popup
            />
          </div>
        </div>
      </div>
    </q-dialog>
  </q-dialog>
</template>

<script>
import { exportFile } from 'quasar'
export default {
  name: 'EditOrcamento',
  ref: 'EditOrcamento',
  data () {
    return {
      editorcamento: false,
      delorcamento: false,
      detalOrcamento: false,
      tituloOr: 'Produção de Marmitas',
      ramoOr: 'Alimentício',
      dataOr: '21/07/2021',
      horaOr: '09:45'
    }
  },
  mounted () {},
  computed: {},
  methods: {
    download () {
      const status = exportFile(
        'orçamento.pdf',
        'Some important content',
        'pdf'
      )
      if (status === true) {
        this.$q.notify({
          position: 'bottom',
          color: 'positive',
          textColor: 'white',
          icon: 'check',
          message: 'Arquivo baixado com sucesso!'
        })
      } else {
        this.$q.notify({
          position: 'bottom',
          color: 'negative',
          textColor: 'white',
          icon: 'close',
          message: 'Erro ao baixar o arquivo!'
        })
      }
    },
    open () {
      this.editorcamento = true
    }
  }
}
</script>

<style></style>

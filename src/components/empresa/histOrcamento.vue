<template>
  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
    persistent
    :maximized="$q.platform.is.mobile"
    :full-width="$q.platform.is.mobile"
    v-model="historcamento"
  >
    <q-card class="row justify-center" style="width: 700px; max-width: 80vw;">
      <q-bar class="full-width bg-primary text-white">
        <q-space />

        <q-btn @click="close()" dense flat icon="close" v-close-popup> </q-btn>
      </q-bar>
      <div class="justify-center col-xl-8 col-lg-8 col-md-8 col-sm-11 col-xs-11">
        <q-card-section>
          <div class="text-h6 text-center text-weight-bolder text-primary">
            <span>Orçamento (Cod. 624) <q-chip outline color="primary" text-color="white" icon="event">
      Aprovado
    </q-chip>
            </span>
          </div>
        </q-card-section>
        <!------------------------ FORM ------------------------>
        <q-form>
          <q-card-section class="q-pt-none text-justify">
            Título*
            <q-input v-model="tituloOrc" dense outlined disable/>
          </q-card-section>
          <q-card-section class="q-pt-none text-justify">
            Solicitante*
            <q-input v-model="empresaOrc" dense outlined disable/>
          </q-card-section>
          <q-card-section class="q-pt-none text-justify">
            Ramo de atividade*
            <q-select v-model="ramoOrc" dense outlined disable/>
          </q-card-section>
          <q-card-section class="q-pt-none text-justify">
            Baixe o arquivo que contém informações como descrição do produto/serviço (marca), preço unitário, quantidade, total, condição de pagamento, prazo de entrega.
            <q-uploader
              class="q-mt-md full-width"
              url="http://localhost:4444/upload"
            />
          </q-card-section>
          <q-card-section>
            <div class="row justify-between">
              <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                Data
                <q-input outlined dense v-model="dataOrc" mask="date" :rules="['date']" disable>
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="date">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                Horas
                <q-input outlined dense v-model="horaOrc" mask="time" :rules="['time']" disable>
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-time v-model="time">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
          <q-card-actions class="q-pa-md" align="right">
            <q-btn class="text-primary" label="fechar" outline v-close-popup/>
            <q-btn class="bg-primary text-white" label="Contato" @click="sucesso = true;"/>
          </q-card-actions>
        </q-form>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'HistOrcamento',
  ref: 'HistOrcamento',
  data () {
    return {
      historcamento: false,
      criterios: '',
      tituloOrc: 'Produção de Xícaras',
      empresaOrc: 'Inova Porcelanas',
      ramoOrc: 'Fabricante de Porcelana',
      dataOrc: '28/05/2021',
      horaOrc: '08:00h'
    }
  },
  mounted () {},
  computed: {},
  methods: {
    open () {
      this.historcamento = true
    }
  }
}
</script>

<style></style>

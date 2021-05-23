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
      <div class="justify-center col-xl-8 col-lg-8 col-md-8 col-sm-11 col-xs-11">
        <q-card-section>
          <div class="text-h6 text-center text-weight-bolder text-primary">
            <span>Detalhes do Orçamento</span>
          </div>
        </q-card-section>
        <!------------------------ FORM ------------------------>
        <q-form>
          <q-card-section class="q-pt-none text-justify">
            Título*
            <q-input v-model="tituloOr" dense outlined/>
          </q-card-section>
          <q-card-section class="q-pt-none text-justify">
            Ramo de atividade*
            <q-select v-model="ramoOr" dense outlined/>
          </q-card-section>
          <q-card-section class="q-pt-none text-justify">
            Arquivo do orçamento
            <q-uploader
              class="full-width"
              url="http://localhost:4444/upload"
            />
          </q-card-section>
          <q-card-section>
            <div class="row justify-between">
              <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                Data
                <q-input outlined dense v-model="dataOr" mask="date" :rules="['date']">
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
                <q-input outlined dense v-model="horaOr" mask="time" :rules="['time']">
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
          <q-separator/>

          <q-card-section>
            <div class="text-h6 text-center text-weight-bolder text-primary">
              <span>Propostas para Orçamento</span>
            </div>

            <div class="q-mt-lg">
              <q-list>
                <q-separator/>
                <q-item class="q-mt-sm justify-between">
                    <div class="text-bold col-6 text-left content">Sabor Brasil LTDA</div>
                    <div class="col-6 text-right">
                      <q-btn dense outline>Detalhes</q-btn>
                    </div>
                </q-item>
                <q-separator/>
                <q-item class="q-mt-sm">
                  <div class="text-bold col-6 text-left content">Marmitaria João de Barro</div>
                  <div class="col-6 text-right">
                    <q-btn dense outline>Detalhes</q-btn>
                  </div>
                </q-item>
              </q-list>
            </div>
          </q-card-section>

          <q-card-actions class="q-pa-md" align="right">
            <q-btn class="text-primary" label="Fechar" outline v-close-popup/>
            <q-btn class="text-red" label="Deletar" outline v-close-popup/>
            <q-btn class="bg-primary text-white" label="Editar" v-close-popup/>
          </q-card-actions>
        </q-form>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'EditOrcamento',
  ref: 'EditOrcamento',
  data () {
    return {
      editorcamento: false,
      tituloOr: 'Produção de Marmitas',
      ramoOr: 'Alimentício',
      dataOr: '21/07/2021',
      horaOr: '09:45'
    }
  },
  mounted () {},
  computed: {},
  methods: {
    open () {
      this.editorcamento = true
    }
  }
}
</script>

<style></style>

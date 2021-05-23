<template>
  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
    persistent
    :maximized="$q.platform.is.mobile"
    :full-width="$q.platform.is.mobile"
    v-model="infoorcamento"
  >
    <q-card class="row justify-center" style="width: 700px; max-width: 80vw;">
      <q-bar class="full-width bg-primary text-white">
        <q-space />

        <q-btn @click="close()" dense flat icon="close" v-close-popup> </q-btn>
      </q-bar>
      <div class="justify-center col-xl-8 col-lg-8 col-md-8 col-sm-11 col-xs-11">
        <q-card-section>
          <div class="text-h6 text-center text-weight-bolder text-primary">
            <span>Orçamento (Cod. 624)</span>
          </div>
        </q-card-section>
        <!------------------------ FORM ------------------------>
        <q-form>
          <q-card-section class="q-pt-none text-justify">
            Título*
            <q-input v-model="tituloO" dense outlined disable/>
          </q-card-section>
          <q-card-section class="q-pt-none text-justify">
            Solicitante*
            <q-input v-model="empresaO" dense outlined disable/>
          </q-card-section>
          <q-card-section class="q-pt-none text-justify">
            Ramo de atividade*
            <q-select v-model="ramoO" dense outlined disable/>
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
                <q-input outlined dense v-model="dataO" mask="date" :rules="['date']" disable>
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
                <q-input outlined dense v-model="horaO" mask="time" :rules="['time']" disable>
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
          <q-card-section class="q-pt-lg text-justify">
            Preencha o formulário com as seguintes informações: descrição do produto/serviço (marca), preço unitário, quantidade, total, condição de pagamento, prazo de entrega.
            <br>
            (Somente arquivo PDF)
            <q-uploader
              class="q-mt-md full-width"
              accept=".pdf"
              url="http://localhost:4444/upload"
            />
          </q-card-section>
          <q-card-actions class="q-pa-md" align="right">
            <q-btn class="text-primary" label="cancelar" outline v-close-popup/>
            <q-btn class="bg-primary text-white" label="Cadastrar" @click="sucesso = true;"/>
          </q-card-actions>
        </q-form>
      </div>
    </q-card>
    <q-dialog v-model="sucesso">
      <div class="row bg-white justify-center text-center" style="border:solid 10px; border-radius: 20px; color: #008b35">
        <div class="text-primary col-12 q-pa-xl">
          <p class="text-h2 text-bold">Parabéns!</p>
          <p class="text-bold text-h5">Sua inscrição foi realizada com sucesso.</p>
          <p class="text-bold">
            Aguarde para que o solicitante <b>Inova Unigran</b> envie uma resposta sobre sua candidatura.
            <br>
            Para acompanhar basta entrar no painel "Histórico de orçamento"</p>
          <q-btn class="q-px-xl text-bold" outline label="Fechar" no-caps @click="infoorcamento = false" v-close-popup/>
        </div>
      </div>
    </q-dialog>
  </q-dialog>
</template>

<script>
export default {
  name: 'InfoOrcamento',
  ref: 'InfoOrcamento',
  data () {
    return {
      infoorcamento: false,
      sucesso: false,
      criterios: '',
      tituloO: 'Produção de Uniformes',
      empresaO: 'Inova Unigran',
      ramoO: 'Confecções',
      dataO: '28/06/2021',
      horaO: '14:00h',
      valor: ''
    }
  },
  mounted () {},
  computed: {},
  methods: {
    open () {
      this.infoorcamento = true
    }
  }
}
</script>

<style></style>

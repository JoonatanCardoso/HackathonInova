<template>
  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
    persistent
    :maximized="$q.platform.is.mobile"
    :full-width="$q.platform.is.mobile"
    v-model="orcamento"
  >
    <q-card class="row justify-center" style="width: 700px; max-width: 80vw;">
      <q-bar class="full-width bg-primary text-white">
        <q-space />

        <q-btn @click="close()" dense flat icon="close" v-close-popup> </q-btn>
      </q-bar>
      <div class="justify-center col-xl-8 col-lg-8 col-md-8 col-sm-11 col-xs-11">
        <q-card-section>
          <div class="text-h6 text-center text-weight-bolder text-primary">
            <span>Cadastrar Orçamento</span>
          </div>
        </q-card-section>
        <!------------------------ FORM ------------------------>
        <q-form>
          <q-card-section class="q-pt-none text-justify">
            Título*
            <q-input v-model="titulo" dense outlined/>
          </q-card-section>
          <q-card-section class="q-pt-none text-justify">
            Ramo de atividade*
            <q-select v-model="ramo" dense outlined/>
          </q-card-section>
          <q-card-section class="q-pt-none text-justify">
            Fazer upload de um documento contendo: descrição do produto/serviço (marca), preço unitário, quantidade, total, condição de pagamento, prazo de entrega.
            <br>
            O documento deve ser em papel timbrado e assinado pelo responsável da empresa
            <q-uploader
              class="full-width"
              url="http://localhost:4444/upload"
            />
          </q-card-section>
          <q-card-section>
            <div class="row justify-between">
              <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                Data
                <q-input outlined dense v-model="dataO" mask="##/##/####" :rules="['date']">
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
                <q-input outlined dense v-model="horaO" mask="time" :rules="['time']">
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
            <q-btn class="text-primary" label="cancelar" outline v-close-popup/>
            <q-btn class="bg-primary text-white" label="Cadastrar" @click="sucessoCad = true"/>
          </q-card-actions>
        </q-form>
      </div>
    </q-card>
    <q-dialog v-model="sucessoCad">
      <div class="row bg-white justify-center text-center" style="border:solid 10px; border-radius: 20px; color: #008b35">
        <div class="text-primary col-12 q-pa-xl">
          <p class="text-h2 text-bold">Parabéns!</p>
          <p class="text-bold text-h5">Seu cadastro foi criado com sucesso.</p>
          <p class="text-bold">
            Para acompanhar o orçamento criado e acompanhar os ofertantes para o serviço basta entrar no painel "Meus de orçamentos" e clicar no botão detalhes, ao lado do nome do pretendente.</p>
          <q-btn class="q-px-xl text-bold" outline label="Fechar" no-caps @click="cadorcamento = false" v-close-popup/>
        </div>
      </div>
    </q-dialog>
  </q-dialog>
</template>

<script>
export default {
  name: 'CadOrcamento',
  ref: 'CadOrcamento',
  data () {
    return {
      orcamento: false,
      sucessoCad: false,
      criterios: '',
      dataO: '',
      horaO: '',
      valor: ''
    }
  },
  mounted () {},
  computed: {},
  methods: {
    open () {
      this.orcamento = true
    }
  }
}
</script>

<style></style>

<template>
  <q-page>
    <div class="row justify-center q-px-sm ">
      <div class="col-lg-8 col-md-8 q-my-lg text-subtitle1">
        Olá, bem vindo(a)
        <span class="text-weight-bold text-primary">{{ nomeUser }}</span>
      </div>
      <div class="col-lg-2 col-md-2 q-my-lg text-subtitle1">
        {{ diaHoje }} - {{ dataHoje }}
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-lg-2 col-md-3 q-px-sm">
        <q-card>
          <q-card bordered class="shadow-0 bg-white border">
            <q-card-section class="text-h4">
              555
              <br />
              <span class="text-subtitle1 text-grey-7">Emp. Pequenas</span>
            </q-card-section>
          </q-card>
        </q-card>
      </div>
      <div class="col-lg-2 col-md-3 q-px-sm">
        <q-card>
          <q-card bordered class="shadow-0 bg-white border">
            <q-card-section class="text-h4">
              555
              <br />
              <span class="text-subtitle1 text-grey-7"
                >Emp. Médias/Grandes</span
              >
            </q-card-section>
          </q-card>
        </q-card>
      </div>
      <div class="col-lg-2 col-md-2 q-px-sm">
        <q-card>
          <q-card bordered class="shadow-0 bg-white border">
            <q-card-section class="text-h4">
              10
              <br />
              <span class="text-subtitle1 text-grey-7">Itens no mural</span>
            </q-card-section>
          </q-card>
        </q-card>
      </div>
      <div class="col-lg-2 col-md-2 q-px-sm">
        <q-card>
          <q-card bordered class="shadow-0 bg-white border">
            <q-card-section class="text-h4">
              15
              <br />
              <span class="text-subtitle1 text-grey-7">Serviços</span>
            </q-card-section>
          </q-card>
        </q-card>
      </div>
    </div>
    <div class="row justify-center q-mt-md">
      <div class="col-lg-8 col-md-10 q-px-sm">
        <q-card class="">
          <div class="row justify-center q-px-sm">
            <div class="col-lg-12  q-mt-md text-h5 text-grey-7">
              Empresas -
              <span class="text-subtitle2">Por ramo de atividade</span>
            </div>
            <div class="col-12 q-my-md">
              <q-separator></q-separator>
            </div>
          </div>
          <div class="row justify-center q-px-sm q-gutter-x-sm">
            <div class="col-lg-3 col-md-3 q-mb-sm">
              <div class="text-justify q-px-xs">
                <q-badge color="red">Qtd - 4</q-badge> - Cultivo de outras
                plantas de lavoura permanente não especificadas anteriormente
              </div>
            </div>
            <div class="col-lg-3 col-md-3 q-mb-sm">
              <div class="text-justify q-px-xs">
                <q-badge color="red">Qtd - 4</q-badge> - Produção de produtos
                não-madeireiros não especificados anteriormente em florestas
                plantadas
              </div>
            </div>
            <div class="col-lg-3 col-md-3 q-mb-sm">
              <div class="text-justify q-px-xs">
                <q-badge color="red">Qtd - 4</q-badge> - Extração de minérios de
                cobre, chumbo, zinco e outros minerais metálicos não-ferrosos
                especificados anteriormente.
              </div>
            </div>
            <div class="col-lg-3 col-md-3 q-mb-sm">
              <div class="text-justify q-px-xs">
                <q-badge color="red">Qtd - 4</q-badge> - Confecção, sob medida,
                de peças do vestuário, exceto roupas íntimas SIM/NÃO O material
                será fornecido pelo executante do serviço?
              </div>
            </div>
            <div class="col-lg-3 col-md-3 q-mb-sm">
              <div class="text-justify q-px-xs">
                <q-badge color="red">Qtd - 4</q-badge> - Fabricação de produtos
                de papel, cartolina, papel-cartão e papelão ondulado para uso
                industrial, comercial e de escritório, exceto formulário
                contínuo
              </div>
            </div>
            <div class="col-lg-3 col-md-3 q-mb-sm">
              <div class="text-justify q-px-xs">
                <q-badge color="red">Qtd - 4</q-badge> - Coquerias
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
    <div class="row justify-center q-mt-lg q-mb-lg">
      <div class="col-lg-8 col-md-10 q-px-sm">
        <q-card class="">
          <div class="row justify-center q-px-sm">
            <div class="col-lg-12  q-mt-md text-h5 text-grey-7">
              Itens Mural -
              <span class="text-subtitle2">Por tipo</span>
            </div>
            <div class="col-12 q-my-md">
              <q-separator></q-separator>
            </div>
          </div>
          <div class="row justify-center q-px-sm q-gutter-x-sm">
            <div class="col-lg-3 col-md-3 q-mb-sm">
              <div class="text-justify q-px-xs">
                <q-badge color="red">Qtd - 4</q-badge> - Eventos
              </div>
            </div>
            <div class="col-lg-3 col-md-3 q-mb-sm">
              <div class="text-justify q-px-xs">
                <q-badge color="red">Qtd - 4</q-badge> - Cursos
              </div>
            </div>
            <div class="col-lg-3 col-md-3 q-mb-sm">
              <div class="text-justify q-px-xs">
                <q-badge color="red">Qtd - 4</q-badge> - Oficinas
              </div>
            </div>
            <div class="col-lg-3 col-md-3 q-mb-sm">
              <div class="text-justify q-px-xs">
                <q-badge color="red">Qtd - 4</q-badge> - Palestras
              </div>
            </div>
            <div class="col-lg-3 col-md-3 q-mb-sm">
              <div class="text-justify q-px-xs">
                <q-badge color="red">Qtd - 4</q-badge> - Consultorias
              </div>
            </div>
            <div class="col-lg-3 col-md-3 q-mb-sm">
              <div class="text-justify q-px-xs">
                <q-badge color="red">Qtd - 4</q-badge> - Outros
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'HomeAdm',
  data () {
    return {
      nomeUser: 'Administrador',
      dataHoje: '',
      diaHoje: ''
    }
  },
  mounted () {
    this.pegarData()
    this.pegaDia()
  },
  methods: {
    pegarData () {
      this.dataHoje = new Date().toLocaleDateString()
      this.diaHoje = new Date().getDay()
    },
    pegaDia () {
      if (this.diaHoje === 0) {
        this.diaHoje = 'Domingo'
      } else if (this.diaHoje === 1) {
        this.diaHoje = 'Segunda-Feira'
      } else if (this.diaHoje === 2) {
        this.diaHoje = 'Terça-Feira'
      } else if (this.diaHoje === 3) {
        this.diaHoje = 'Quarta-Feira'
      } else if (this.diaHoje === 4) {
        this.diaHoje = 'Quinta-Feira'
      } else if (this.diaHoje === 5) {
        this.diaHoje = 'Sexta-Feira'
      } else if (this.diaHoje === 6) {
        this.diaHoje = 'Sábado'
      }
    }
  }
}
</script>

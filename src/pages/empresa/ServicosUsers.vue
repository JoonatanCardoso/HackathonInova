<template>
  <q-page>
    <div class="row justify-center bg-grey-3">
      <div
        class="col-lg-10 col-md-10 col-sm-10 col-xs-10 text-h4 q-my-lg"
      >
        Serviços oferecidos
      </div>
    </div>
          <div class="text-center text-h6 q-mt-md">
                Nesta área nossos colaboradores conseguirão sanar as sua dúvidas.
      </div>
    <q-btn
      class="q-px-lg"
      flat
      @click="
        type = null;
        subitens = [];
      "
      icon="arrow_back"
      color="primary"
      v-if="type"
    />
    <div
      v-if="!type"
      class="row justify-center q-my-lg  q-gutter-y-md  text-subtitle2 "
    >
      <div
        v-for="(item, key) in tipos"
        :key="key * 10"
        class="col-lg-3 q-pa-sm col-12 col-md-4 col-sm-5 q-px-sm"
      >
        <div
          style="text-decoration: none"
          target="_blank"
          class="cursor-pointer text-black"
        >
          <q-card v-ripple @click="setTypeService(item)">
            <div :style="'background-color:' + item.cor">
              <br />
            </div>
            <q-card-section class="text-justify">
              <span class="text-weight-bold text-h6">
                {{ item.tipo }}
              </span>
            </q-card-section>
            <div :style="'background-color:' + item.cor">
              <br /></div
          ></q-card>
        </div>
      </div>
    </div>
    <div
      v-if="type && subitens.length === 0"
      class="row justify-center q-my-lg  q-gutter-y-md  text-subtitle2 "
    >
      <div v-if="listaServices.length === 0" class="text-h6">
        Não possui serviços cadastrados para esta categoria ainda
      </div>
      <div
        v-for="(iteml, keyl) in listaServices"
        :key="keyl * 20"
        class="col-lg-4 col-12 col-md-6 col-sm-6 q-px-sm"
      >
        <div style="text-decoration: none" class="text-black">
          <q-card>
            <div :style="'background-color:' + iteml.cor">
              <br />
            </div>
            <q-card-section class="text-justify">
              <span class="text-weight-bold">
                {{ iteml.titulo }}
              </span>
              <p>{{ iteml.descricao }}</p>
              <q-btn
                v-if="iteml.perguntas"
                class="q-px-lg"
                label="Quero saber mais"
                flat
                dense
                no-caps
                @click="subitens = iteml.perguntas"
                icon="fas fa-eye"
                color="primary"
              />
            </q-card-section>
            <div
              class="text-center"
              :style="'background-color:' + iteml.cor + '; min-height: 30px'"
            >
              <q-btn
                v-if="iteml.link"
                class="q-px-lg"
                dense
                label="Acessar website"
                flat
                no-caps
                @click="abreLink(iteml.link)"
                icon="fas fa-external-link-alt"
                color="white"
              />
              <q-btn
                v-if="iteml.telefone"
                class="q-px-lg"
                label="Enviar Whatsapp"
                flat
                dense
                no-caps
                @click="abreWhats(iteml)"
                icon="fab fa-whatsapp"
                color="white"
              />
              <br /></div
          ></q-card>
        </div>
      </div>
    </div>

    <div
      v-if="subitens.length > 0"
      class="row justify-center q-my-lg  q-gutter-y-md  text-subtitle2 "
    >
      <div
        v-for="(items, keys) in subitens"
        :key="keys * 30"
        class="col-lg-4 col-12 col-md-6 col-sm-6 q-px-sm"
      >
        <div style="text-decoration: none" class="text-black">
          <q-card>
            <div style="background-color:#008b35">
              <br />
            </div>
            <q-card-section class="text-justify">
              <span class="text-weight-bold">
                {{ items.titulo }}
              </span>
              <p>{{ items.descricao }}</p>
            </q-card-section>
            <div
              class="text-center"
              style="background-color:#008b35; min-height: 30px"
            >
              <q-btn
                v-if="items.link"
                class="q-px-lg"
                dense
                label="Acessar website"
                flat
                no-caps
                @click="abreLink(items.link)"
                icon="fas fa-external-link-alt"
                color="white"
              />
              <q-btn
                v-if="items.telefone"
                class="q-px-lg"
                label="Enviar Whatsapp"
                flat
                dense
                no-caps
                @click="abreWhats(items)"
                icon="fab fa-whatsapp"
                color="white"
              />
              <br /></div
          ></q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'GerenciarServicos',
  data () {
    return {
      type: null,
      listaServices: [],
      subitensBack: null,
      subitens: [],
      tipos: [
        {
          tipo: 'Prefeitura',
          cor: '#008b35'
        },
        {
          tipo: 'Sebrae',
          cor: '#015fb8'
        },
        {
          tipo: 'Associação comercial',
          cor: '#f7c91d'
        },
        {
          tipo: 'Associação industrial',
          cor: '#00274a'
        },
        {
          tipo: 'Sindicado Rural',
          cor: '#c5c7c9'
        },
        {
          tipo: 'CDL',
          cor: '#efd109'
        }
      ]
    }
  },
  mounted () {
    this.getServicos()
  },
  computed: {
    ...mapState('servicos', ['servicos']),
    ...mapState('userAuth', ['user'])
  },
  methods: {
    ...mapActions('servicos', ['getServicos', 'delServiço']),
    setTypeService (type) {
      this.listaServices = this.servicos.filter(
        item => item.tipo === type.tipo
      )
      this.type = type
    },
    abreLink (url) {
      window.open(url, '_blank')
    },
    abreWhats (tipo) {
      const nome = this.user.data.nome || this.user.data.nome_fantasia || ''
      const msg = `Olá ${nome ? ', meu nome é ' + nome : ''}!
      %0DAcessei a Acelera Araguaína.
      %0DGostaria de saber mais sobre o *item*: ${tipo.titulo}. %0D*Descrição*: ${tipo.descricao}.%0D*Tipo*: ${tipo.tipo}`
      window.open('https://api.whatsapp.com/send?phone=55' + tipo.telefone.split(' ').join('').split('-').join('').split('(').join('').split(')').join('') + '&text=' + msg, '_blank')
    }
  }
}
</script>

<template>
  <q-page>
    <div class="row justify-center bg-grey-3">
      <div
        class="col-xl-8 col-lg-8 col-md-8 col-sm-10 col-xs-10 text-h4 q-my-lg"
      >
        Serviços
      </div>
      <div
        class="col-xl-2 col-lg-2 col-md-2 col-sm-10 col-xs-10"
        :class="$q.screen.gt.xs ? 'q-my-lg' : ' q-mb-lg'"
      >
        <q-btn
          @click="open()"
          class="bg-primary text-white text-bold"
          no-caps
          no-wrap
          label="Cadastrar serviços"
        />
      </div>
      <add :dado="dadosEditar" :editar="edit" ref="CadServicos"></add>
    </div>
    <div class="row justify-center">
      <div class="col-xl-8 col-lg-8 col-md-11  col-sm-10 col-xs-11">
        <div class="col-xl-11 col-lg-11 col-md-12 col-sm-12 col-xs-12 q-mt-xl">
          <q-table
            class="shadow-1 my-sticky-header-column-table text-weight-medium q-ml-md q-mr-md bg-white q-mb-md"
            :grid="$q.screen.sm || $q.screen.xs"
            :data="servicos"
            :columns="columns"
            :pagination="initialPagination"
            rows-per-page-label="Items por página"
            no-data-label="Não há dados disponíveis."
            no-results-label="A busca não retornou nenhum resultado."
            row-key="name"
            :filter="filter"
            :loading="loading"
          >
            <template v-slot:top-right>
              <q-input
                class="full-width"
                borderless
                dense
                debounce="300"
                v-model="filter"
                placeholder="Buscar"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>

            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
                <q-th auto-width />
              </q-tr>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  <template>
                    <p v-if="col.name !== 'link'" >{{ col.value }}</p>
                    <a v-if="col.name === 'link'" target="_blank" :href="col.value">{{
                      col.value
                    }}</a>
                  </template>
                </q-td>
                <q-td auto-width class="q-gutter-x-sm">
                  <q-btn
                    class="bg-positive text-white text-bold"
                    icon="edit"
                    size="md"
                    @click="openEdit(props)"
                    flat
                    dense
                  />
                  <q-btn
                    class="bg-negative text-white text-bold"
                    icon="delete"
                    @click="openDelete(props)"
                    size="md"
                    flat
                    dense
                  />
                </q-td>
              </q-tr>
            </template>
            <template v-slot:item="props">
              <div
                class="q-my-sm q-pa-xs col-xs-12 col-sm-12 col-md-4 col-lg-3 grid-style-transition"
              >
                <q-card class="shadow-0">
                  <q-list dense>
                    <q-item
                      v-for="col in props.cols"
                      :key="col.name"
                      :props="props"
                    >
                      <q-item-section>
                        <q-item-label>{{ col.label }}</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label caption>
                          <template>{{ col.value }} </template>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item class="justify-center q-gutter-x-sm q-mt-sm">
                      <q-btn
                        class="bg-positive text-white text-bold"
                        label="Editar"
                        icon="edit"
                        size="sm"
                        @click="openEdit(props)"
                        flat
                      />
                      <q-btn
                        class="bg-negative text-white text-bold"
                        label="Excluir"
                        icon="delete"
                        @click="openDelete(props)"
                        size="sm"
                        flat
                      />
                    </q-item>
                  </q-list>
                </q-card>
                <q-separator class="q-my-md" />
              </div>
            </template>
          </q-table>
          <q-dialog persistent v-model="deletar">
            <q-card>
              <q-card-section>
                <div class="text-h6">Deletar Serviço</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                Tem certeza que deseja deletar permanente este serviço?
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  flat
                  @click="deletar = false"
                  label="CANCELAR"
                  color="primary"
                />
                <q-btn @click="excluirServico()" label="Deletar" color="primary" />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import CadServicos from 'components/admin/CadServicos.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'GerenciarServicos',
  data () {
    return {
      filter: '',
      loading: false,
      docid: '',
      edit: false,
      deletar: false,
      dadosEditar: {},
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 15
        // rowsNumber: xx if getting data from a server
      },
      data: [
        {
          docid: 'AASDASDAGFGDSFSGDSGDSFDSFDS',
          titulo: 'aaa',
          descricao: 'Sebrae',
          telefone: '234234234',
          link: 'http://adasda.com.br',
          tipo: ''
        },
        {
          docid: 'AASDASDAGFGDSFSGDSGDSFDSFDS',
          titulo: 'bbbbbbb',
          descricao: ' adas ad adad',
          telefone: '234234234234',
          link: 'http://adasda.com.br',
          tipo: ''
        }
      ],
      columns: [
        {
          name: 'titulo',
          label: 'Título',
          align: 'left',
          field: 'titulo',
          sortable: true
        },
        {
          name: 'telefone',
          label: 'Telefone',
          field: 'telefone',
          align: 'left',
          sortable: true
        },
        {
          name: 'link',
          label: 'Link',
          field: 'link',
          align: 'left',
          sortable: true
        }
      ]
    }
  },
  components: {
    add: CadServicos
  },
  mounted () {
    this.getServicos()
  },
  computed: {
    ...mapState('servicos', ['servicos'])
  },
  methods: {
    ...mapActions('servicos', ['getServicos', 'delServiço']),
    open () {
      this.edit = false
      this.$refs.CadServicos.open()
    },
    openDelete (row) {
      this.docid = row.row.docid
      console.log(this.docid)
      this.deletar = true
    },
    openEdit (row) {
      this.edit = true
      this.dadosEditar = row.row
      console.log(this.dadosEditar)
      setTimeout(() => {
        this.$refs.CadServicos.openEditar()
        this.dadosEditar = { ...row.row }
      }, 200)
    },
    excluirServico () {
      if (this.docid) {
        this.delServiço({
          docid: this.docid
        }).then((res) => {
          this.$q.notify({
            position: 'bottom',
            color: 'positive',
            textColor: 'white',
            icon: 'check',
            message: 'Serviço excluído com sucesso!'
          })
          this.deletar = false
        })
      }
    }
  }
}
</script>

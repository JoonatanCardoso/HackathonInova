<template>
  <q-page>
    <div class="row justify-center bg-grey-3">
      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-6 col-xs-10 text-h4 q-my-lg">
        Notícias
      </div>
      <div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-11" :class="$q.screen.gt.xs ? 'q-my-lg' : ' q-mb-lg'">
        <q-btn class="bg-primary text-white text-bold q-mx-md" no-caps no-wrap label="Cadastrar Notícias" @click="open()"/>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-10 col-xs-10">
        <div class="col-xl-11 col-lg-11 col-md-11 col-sm-12 col-xs-12 q-mt-xl">
          <q-table
            class="shadow-1 my-sticky-header-column-table text-weight-medium q-ml-md q-mr-md bg-white q-mb-md"
            :grid="$q.screen.sm || $q.screen.xs"
            :data="data"
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
                    {{ col.value }}
                  </template>
                </q-td>
                <q-td auto-width class="q-gutter-x-sm">
                  <q-btn
                    class="bg-positive text-white text-bold"
                    icon="edit"
                    size="md"
                    flat
                    dense
                  />
                  <q-btn
                    class="bg-negative text-white text-bold"
                    icon="delete"
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
                          <template>{{ col.value }}
                          </template>
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
        </div>
      </div>
    </div>

    <cadmural ref="ModalNoticias"/>
  </q-page>
</template>

<script>
import ModalNoticias from 'components/admin/ModalNoticias'

export default {
  name: 'CadastroEm',
  data () {
    return {
      filter: '',
      loading: false,
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 15
        // rowsNumber: xx if getting data from a server
      },
      data: [{ titulo: 'Titulo Teste', tipo: 'Tipo Teste', link: 'https://www.google.com.br', dataV: '20/06/2021' }],
      columns: [
        {
          name: 'titulo',
          label: 'Título',
          field: 'titulo',
          align: 'left',
          sortable: true
        },
        {
          name: 'tipo',
          label: 'Tipo',
          field: 'tipo',
          align: 'left',
          sortable: true
        },
        {
          name: 'link',
          label: 'Link',
          field: 'link',
          align: 'left',
          sortable: true
        },
        {
          name: 'dataV',
          label: 'Data Vencimento',
          field: 'dataV',
          align: 'left',
          sortable: true
        }
      ]
    }
  },
  components: {
    cadmural: ModalNoticias
  },
  computed: {},
  mounted () {},
  methods: {
    open () {
      this.$refs.ModalNoticias.open()
    }
  }
}
</script>

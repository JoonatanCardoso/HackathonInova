<template>
  <q-page>
    <div class="row justify-center bg-grey-3">
      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-10 col-xs-10 text-h4 q-my-lg">
        Mural
      </div>
      <div class="col-xl-2 col-lg-2 col-md-2 col-sm-10 col-xs-10" :class="$q.screen.gt.xs ? 'q-my-lg' : ' q-mb-lg'">
        <q-btn class="bg-primary text-white text-bold q-mx-md" no-caps no-wrap label="Cadastrar Evento"/>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-10 col-xs-10">
        <div class="col-xl-11 col-lg-11 col-md-11 col-sm-12 col-xs-12 q-mt-xl">
          <q-table
            :grid="$q.screen.sm || $q.screen.xs"
            class="shadow-1 my-sticky-header-column-table text-grey-9 text-weight-medium q-mx-md q-mb-lg bg-white"
            :data="dataTable"
            :columns="columns"
            :pagination="initialPagination"
            rows-per-page-label="Items por página"
            no-data-label="Não há dados disponíveis."
            no-results-label="A busca não retornou nenhum resultado."
            row-key="name"
            :filter="filter"
          >
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
                  <template v-if="col.name === 'dataVisitaAgendada'">
                    {{new Date(col.value.seconds * 1000).toLocaleDateString()}}
                  </template>
                  <template v-else-if="col.name === 'visitaAtiva'">
                    <div color="positive" v-if="col.value === true">
                      <q-icon name="circle" style="color: green; font-size: 16px;" />
                      Sim
                    </div>
                    <div color="grey" v-if="col.value === false">
                      <q-icon name="circle" style="color: red; font-size: 16px;" />
                      Não
                    </div>
                  </template>
                  <template v-else>
                    <template v-if="col.name === 'status'">
                      <div color="positive" v-if="col.value === true">
                        <q-icon name="circle" style="color: green; font-size: 16px;" />
                        Sim
                      </div>
                      <div color="grey" v-if="col.value === false">
                        <q-icon name="circle" style="color: red; font-size: 16px;" />
                        Não
                      </div>
                    </template>
                    <template v-else>
                      {{ col.value }}
                    </template>
                  </template>
                </q-td>
                <q-td auto-width class="q-gutter-x-xs">
                  <!-- @click="abreEditar(props.row)" -->
                  <q-btn
                    class="bg-secondary text-white text-bold"
                    label="Detalhes"
                    @click="abreDetalhes(props)"
                    size="sm"
                    flat
                  />
                </q-td>
              </q-tr>
            </template>

            <template v-slot:item="props">
              <div
                class="q-my-sm q-pa-xs col-xs-12 col-sm-12 col-md-12 col-lg-3 grid-style-transition"
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
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label>Ações</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label caption>
                          <template>
                            <!-- @click="abreEditar(props.row)" -->
                            <q-btn
                              class="bg-secondary text-white text-bold q-mb-sm"
                              label="Detalhes"
                              size="sm"
                              flat
                            />
                          </template>
                        </q-item-label>
                      </q-item-section>
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

    <cad-mural ref="CadMural"/>
  </q-page>
</template>

<script>
import CadMural from 'components/admin/CadMural'

export default {
  name: 'CadastroEm',
  data () {
    return {
      isPwd: true,
      contrato: false,
      loading: false,
      idUser: 5,
      dataTable: {
        titulo: 'Show de Rock',
        tipo: 'Show',
        link: 'htpps://www.quasar.dev',
        dataValidade: '10/06/2021'
      },
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 15
        // rowsNumber: xx if getting data from a server
      },

      columns: [
        {
          name: 'titulo',
          field: 'titulo',
          label: 'Título',
          align: 'left',
          sortable: true,
          format: (val) => val.nome
        },
        {
          name: 'tipo',
          field: 'tipo',
          label: 'Tipo',
          align: 'left',
          sortable: true,
          format: (val) => val
        },
        {
          name: 'link',
          field: 'link',
          label: 'Link',
          align: 'left',
          sortable: true,
          format: (val) => val
        },
        {
          name: 'dataValidade',
          field: 'dataValidade',
          label: 'Data Validade',
          align: 'left',
          sortable: true,
          format: (val) => val
        }
      ]
    }
  },
  components: {
    CadMural
  },
  computed: {},
  mounted () {},
  methods: {}
}
</script>

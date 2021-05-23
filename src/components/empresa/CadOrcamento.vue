<template>
  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
    persistent
    :maximized="$q.platform.is.mobile"
    :full-width="$q.platform.is.mobile"
    v-model="orcamento"
  >
    <q-card class="row" style="width: 700px; max-width: 80vw;">
      <q-bar class="full-width bg-primary text-white">
        <q-space />

        <q-btn @click="close()" dense flat icon="close" v-close-popup> </q-btn>
      </q-bar>
      <div class="col-sm-12 col-md-6 col-lg-6">
        <q-card-section>
          <div class="text-h6 text-center text-weight-bolder text-primary">
            <span v-if="!this.editar">Cadastro de </span>
            <span v-else>Editar</span> serviços
          </div>
        </q-card-section>
        <!------------------------ FORM ------------------------>
        <q-form>
          <q-card-section class="q-pt-none text-justify">
            Título*
            <q-input v-model="input.titulo" dense outlined></q-input>
          </q-card-section>
          <q-card-section class="q-pt-none text-justify">
            Descrição*
            <q-input
              v-model="input.descricao"
              dense
              outlined
              type="textarea"
            ></q-input>
          </q-card-section>
          <q-card-section class="q-pt-none text-justify">
            Telefone/Whatsapp
            <q-input
              mask="(##) # ####-####"
              v-model="input.telefone"
              dense
              outlined
            ></q-input>
          </q-card-section>
          <q-card-section class="q-pt-none text-justify">
            Link
            <q-input v-model="input.link" dense outlined></q-input>
          </q-card-section>

          <!------------------------ RODAPE ------------------------>
          <q-card-actions class="q-gutter-y-md" align="right">
            <q-btn
              class="float-right float full-width"
              flat
              @click="limpaInputs()"
              label="Limpar todos os campos"
              color="primary"
            />

            <q-btn
              class="q-mt-xs full-width"
              label="Salvar e adicionar sub-item"
              color="primary"
              @click="addSubItem()"
            />
            <q-btn
              @click="salvar()"
              class="full-width bg-accent text-black"
              :label="!this.editar ? 'FINALIZAR' : 'EDITAR'"
              color="primary"
            />
          </q-card-actions>
        </q-form>
      </div>
      <div class="col-sm-12 col-12 q-px-sm col-md-6 col-lg-6">
        <div v-if="dados.titulo">
          <p class="text-h6 q-pt-md">Pergunta principal</p>
          <q-btn
            class="float-right float"
            flat
            @click="editPrincipal()"
            icon="edit"
            color="primary"
          />
          <p>{{ dados.titulo }}</p>
          <p>{{ dados.descricao }}</p>
        </div>
        <div class="q-mb-md">
          <p class="text-h6 q-pt-md">Perguntas vinculadas</p>
          <div class="q-pr-md">
            <q-card
              class="q-mt-xs"
              v-for="(item, idx) in dados.perguntas"
              :key="idx"
            >
              <q-card-section>
                <q-btn
                  class="float-right float"
                  flat
                  @click="
                    input = item;
                    sub = idx;
                  "
                  icon="edit"
                  color="primary"
                />
                <p>Ordem: {{ idx + 1 }}</p>
                <p>{{ item.titulo }}</p>
                <p>{{ item.descricao }}</p>
              </q-card-section>
            </q-card>
            <q-card v-if="dados.perguntas.length === 0">
              <q-card-section>
                <p>Sem perguntas vinculadas</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'CadServicos',
  ref: 'CadServicos',
  data () {
    return {
      orcamento: false
    }
  },
  mounted () {},
  computed: {},
  methods: {
    open () {
      this.modal = true
    }
  }
}
</script>

<style></style>

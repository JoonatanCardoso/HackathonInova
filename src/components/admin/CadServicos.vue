<template>
  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
    persistent
    :maximized="$q.platform.is.mobile"
    :full-width="$q.platform.is.mobile"
    v-model="modal"
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
          <q-card-section class="q-mr-xs" style="font-size:12px">
            *Campos obrigatórios<br />
            Ao registrar um usuário, as credencias de acesso serão enviadas ao
            e-mail.
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              class="float-right float"
              flat
              @click="limpaInputs()"
              label="Limpar todos os campos"
              color="primary"
            />

            <q-btn
              class="q-mt-xs"
              label="Salvar e adicionar sub-item"
              color="primary"
              @click="addSubItem()"
            />
            <q-btn
              @click="salvar()"
              :label="!this.editar ? 'FINALIZAR' : 'EDITAR'"
              color="primary"
            />
          </q-card-actions>
        </q-form>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-6">
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
        <div>
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
      options: [
        'Sebrae',
        'Associação comercial',
        'Sindicado comercial',
        'Associação industrial',
        'Sindicado Rural',
        'CDL'
      ],
      modal: false,
      principal: false,
      sub: false,
      id: '',
      input: {
        titulo: '',
        descricao: '',
        telefone: '',
        tipo: '',
        link: ''
      },
      base: {
        titulo: '',
        descricao: '',
        telefone: '',
        tipo: '',
        link: ''
      },
      dados: {
        titulo: '',
        descricao: '',
        telefone: '',
        tipo: '',
        link: '',
        perguntas: []
      }
    }
  },
  props: {
    dado: Object,
    editar: Boolean
  },
  mounted () {
    this.dados.tipo = this.getUser().tipo || ''
  },
  computed: {},
  methods: {
    ...mapGetters('userAuth', ['getUser']),
    ...mapActions('servicos', ['addServico']),
    addSubItem () {
      if (!this.dados.titulo || this.principal) {
        this.dados.titulo = this.input.titulo
        this.dados.descricao = this.input.descricao
        this.dados.tipo = this.getUser().tipo || ''
        this.dados.telefone = this.input.telefone
        this.dados.link = this.input.link
        this.limpaInputs()
      } else {
        this.principal = false
        const dados = { ...this.input }
        if (this.sub === false) {
          this.dados.perguntas.push({ ...dados })
        } else {
          this.dados.perguntas[this.sub] = { ...dados }
          this.sub = false
        }
        this.limpaInputs()
      }
    },
    editPrincipal () {
      this.principal = true
      this.input.titulo = this.dados.titulo
      this.input.descricao = this.dados.descricao
      this.input.tipo = this.dados.tipo
      this.input.telefone = this.dados.telefone
      this.input.link = this.dados.link
    },
    salvar () {
      if (!this.editar) {
        console.log('ADICIONAR', this.dados)
        if (!this.dados.titulo) {
          this.$q.notify({
            position: 'bottom',
            color: 'negative',
            textColor: 'white',
            icon: 'close',
            message: 'Informe todos os dados'
          })
        } else {
          this.addServico({
            dados: this.dados
          }).then((res) => {
            this.$q.notify({
              position: 'bottom',
              color: 'positive',
              textColor: 'white',
              icon: 'check',
              message: 'Serviço cadastrado com sucesso!'
            })
          }).catch(_err => {
            console.log('🚀 ~ file: ModalUser.vue ~ line 228 ~ this.addUsuariosData ~ _err', _err)
            this.$q.notify({
              position: 'bottom',
              color: 'negative',
              textColor: 'white',
              icon: 'close',
              message: 'Erro ao tentar realizar o cadastro do serviço, tente novamente mais tarde!'
            })
          })
        }
        // METODO DE ADICIONAR
      } else {
        console.log('EDITAR', this.dados)
        this.$q.notify({
          position: 'bottom',
          color: 'positive',
          textColor: 'white',
          icon: 'check',
          message: 'Serviço editado com sucesso!'
        })
        this.close()
        // METODO DE EDITAR
      }
    },
    close () {
      this.modal = false
      this.limpaInputs()
      this.id = ''
    },
    limpaInputs () {
      this.principal = false
      this.input.titulo = ''
      this.input.descricao = ''
      this.input.tipo = ''
      this.input.telefone = ''
      this.input.link = ''
    },
    open () {
      this.modal = true
    },
    openEditar () {
      this.input.titulo = this.dado.titulo
      this.input.descricao = this.dado.descricao
      this.input.tipo = this.dado.tipo
      this.input.telefone = this.dado.telefone
      this.input.link = this.dado.link
      this.dados = this.dado
      this.id = this.dados.docid
      this.modal = true
    }
  }
}
</script>

<style></style>

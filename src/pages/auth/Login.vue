<template>
  <q-page class="bg-grey-4">
    <div class="row flex-center fullscreen">
      <div class="col-lg-3 col-11 col-md-5 col-sm-8">
        <q-form @submit.prevent="login()">
          <q-card class="bg-primary">
            <q-card-section class="text-center text-accent  text-h5 ">
              <span class="text-h4 text-weight-bolder text-white"
                >Acelera <span class="text-red">Araguaína</span></span
              ><br />Supply chain
            </q-card-section>
            <q-card-section
              ><q-input bg-color="grey-4" v-model="email" dense outlined>
                <template v-slot:prepend>
                  <q-icon color="primary" name="person" /> </template></q-input
            ></q-card-section>
            <q-card-section
              ><q-input bg-color="grey-4" v-model="password" :type="isPwd ? 'password' : 'text'"  dense outlined>
                <template v-slot:prepend>
                  <q-icon color="primary" name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <span class="float-right"
                ><q-btn class="text-grey-4" no-caps flat
                  >Esqueceu a senha?</q-btn
                ></span
              >
            </q-card-section>
            <q-card-section class="q-mt-md text-center q-gutter-x-md q-gutter-y-md">
              <q-btn :to="{ name: 'cadastro' }" style="width:45%" class="bg-accent q-py-xs" flat
                >Quero acelerar</q-btn
              >

              <q-btn
                type="submit"
                :loading="loading"
                style="width:45%"
                flat
                class=" bg-grey-4 text-primary q-py-xs"
                >
                Login
              </q-btn
              ></q-card-section
            >
            <q-card-section class="text-center"> </q-card-section>
          </q-card>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      isPwd: true,
      loading: false
    }
  },
  methods: {
    ...mapActions('userAuth', ['loginUser']),
    async login () {
      const vm = this
      vm.loading = true
      if ((this.email || this.password) === '') {
        this.notify('Preencha todos os campos!', 'red-10', 'top')
        vm.loading = false
      } else if (this.email === '') {
        this.notify('Campo de email não preenchido!', 'red-10', 'top')
        vm.loading = false
      } else if (this.password === '') {
        this.notify('Campo de senha não preenchido!', 'red-10', 'top')
        vm.loading = false
      } else {
        try {
          await this.loginUser({
            dados: {
              email: vm.email,
              password: vm.password
            }
          }).then((res) => {
            console.log('res', res)
            switch (res.data.typeUser) {
              case 'empresa':
                this.$router.replace({ name: 'noticiasUser' }) // TROCAR ROTA
                break
              case 'usuario':
                this.$router.replace({ name: 'index' }) // TROCAR ROTA
                break
              default:
                this.$router.replace({ name: 'login' }) // TROCAR ROTA
                break
            }
          })
        } catch (error) {
          console.log(error)
          this.loading = false
        }
      }
    }
  }
}
</script>

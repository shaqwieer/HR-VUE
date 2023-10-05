<template>
  <div
    class="surface-500 h-screen flex  justify-content-center align-items-center"
  >
    <div class="grid surface-100 w-10 md:w-7 md:h-30rem">
      <div class=" md:col-5 hidden md:flex background bg-cover bg-no-repeat bg-center"></div>
      <div
        class="md:col-7 flex justify-content-center align-items-center flex-column"
      >
        <div class="mb-4 md:mb-6 mr-3 text-sm md:text-lg ">
          <h1 class="px-4  md:px-1">المنظومة الرئيسية لمتابعة الافراد</h1>
        </div>
        <!-- note:form designed finish but not functional -->
        <form action="">
          <div class="p-inputgroup mb-4">
            <span class="p-inputgroup-addon">
              <i class="pi pi-user"></i>
            </span>
            <InputText placeholder="اسم المسئول" v-model="textValue" />
          </div>

          <div class="p-inputgroup mb-2">
            <span class="p-inputgroup-addon">
              <i class="pi pi-lock"></i>
            </span>
            <Password
              v-model="passwordValue"
              :feedback="false"
              toggleMask
              inputId="password"
              placeholder="كلمه المرور"
            />
          </div>
          <div class="flex justify-content-between">
            <div>
              <Checkbox inputId="login" v-model="checkBox" :binary="true" />
              <label for="login" class="ml-2"> تذكرنى </label>
            </div>

            <InputSwitch v-model="checked" class="pt-3rem" />
          </div>
          <Button
            class="w-6 md:w-8 mb-4 mr-7 ml-5 mt-4 surface-700 border-none"
            label="تسجيل الدخول"
            @click="auth()"
          />
        </form>
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="authValue"
    modal
    header="رسالة تحذير"
    :style="{ width: '35vw' }"
  >
    <p>يرجى كتابة البيانات الصحيحة</p>
  </Dialog>
</template>

<script>
import { ref, watch, computed } from "vue";
import { usePrimeVue } from "primevue/config";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const imageValue = require("../../assets/loginPhoto.jpg");
    const textValue = ref(null);
    const router = useRouter();
    const passwordValue = ref(null);
    const store = useStore();
    const authAdmin = { userName: "admin", password: "admin" };
    const checkBox = ref(false);
    const authValue = ref(false);
    const checked = computed({
      get() {
        return store.getters.checked;
      },
      set(val) {
        store.commit("toggleChecked", val);
      },
    });
    function auth() {
      if (
        textValue.value === authAdmin.userName &&
        passwordValue.value === authAdmin.password
      ) {
        router.replace("/main");
        authValue.value=false;
        store.commit("isAuthenticated",true);
      } else {
        authValue.value = true;
        store.commit("isAuthenticated",false);

      }
    }

    const PrimeVue = usePrimeVue();
    watch(checked, function () {
      if (!checked.value) {
        PrimeVue.changeTheme("theme", "themeLight", "themeLink");
      } else {
        PrimeVue.changeTheme("themeLight", "theme", "themeLink");
      }
    });
    return {
      imageValue: imageValue,
      textValue,
      passwordValue,
      checkBox,
      checked,
      auth,
      authValue,
    };
  },
};
</script>

<style scoped>
.background {
  background-image: url("../../assets/loginPhoto.jpg");
}
</style>

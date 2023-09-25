<template>
  <div
    class="surface-100 w-12 flex justify-content-between align-items-center flex-wrap flex-row"
  >
    <div class="inline-flex gap-6 mr-3">
      <img src="../../assets/logo.png" alt="" class="w-3rem h-3rem mt-2" />

      <h2 class="mt-3 text-xl ml-4">
        الصفحة
        <span class="inline bg-orange-400 shadow-5 w-full border-round-xl"
          >الرئيسية</span
        >
        لشئون الأفراد
      </h2>
    </div>

    <div>
      <div class="card flex justify-content-between">
        <InputSwitch v-model="checked" class="ml-5 mt-2 pb-1" />
        <div>
          <Button
            type="button"
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            :icon="'pi pi-user'"
            class="surface-200 ml-5 w-5rem mt-2"
            text
            size="small"
          />
          <Menu ref="menu" id="overlay_menu" :popup="true">
            <template #start>
              <button
                class="w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround"
              >
                <Avatar :image="adminPhoto" class="mr-2" shape="circle" />
                <div class="flex flex-column align">
                  <span class="font-bold">الادمن</span>
                  <span class="text-sm">المسئول</span>
                </div>
              </button>
            </template>
            <template #end>
              <button
                class="w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround"
                @click="logOut()"
              >
                <i class="pi pi-sign-out" />
                <span class="ml-2">تسجيل الخروج</span>
              </button>
            </template>
          </Menu>
        </div>
      </div>
    </div>
    <Divider />
  </div>
  <div
    class="surface-200 h-full w-12 flex justify-content-start align-items-start flex-wrap flex-row"
  >
    <TabView class="tabview-custom w-12">
      <TabPanel>
        <template #header>
          <i class="pi pi-user mr-2"></i>
          <span>البيانات الشخصية</span>
        </template>
        <employeeData></employeeData>
      </TabPanel>
      <TabPanel>
        <template #header>
          <span>الجزاءات</span>
          <i class="pi pi-paperclip mr-2"></i>
        </template>
        <punishMent></punishMent>
      </TabPanel>
      <TabPanel>
        <template #header>
          <span>الاجازات</span>
          <i class="pi pi-home mr-2"></i>
        </template>
        <vacTion></vacTion>
      </TabPanel>
    </TabView>
  </div>
  <div class="surface-100 text-center h-5rem pt-3 pb-3">
    <p>تصميم مركز انتاج البرمجيات الرئيسى &copy;</p>
  </div>
</template>

<script>
import punishMent from "@/components/punishMent.vue";
import employeeData from "@/components/emplyeeData.vue";
import vacTion from "@/components/vacTion.vue";
import { ref} from "vue";

import { watch,computed} from "vue";
import { usePrimeVue } from 'primevue/config';
import { useRouter } from "vue-router";
import {useStore} from 'vuex'
export default {
  components: { punishMent, employeeData, vacTion },
  setup() {
    const menu = ref();
    const store=useStore();
    const checked = computed({
      get(){ return store.getters.checked;},
      set(val){store.commit('toggleChecked',val)}});
    const PrimeVue = usePrimeVue();
    const router=useRouter()
    function logOut(){
        router.replace("/");
        store.commit("isAuthenticated",false);
    }
    watch(checked,function(){
      if((!checked.value)){
        PrimeVue.changeTheme('theme', 'themeLight', 'themeLink');

      }else{
        PrimeVue.changeTheme('themeLight', 'theme', 'themeLink');
      }
    });


    const adminPhoto = require("../../assets/adminPhoto.png");
    const toggle = (event) => {
      menu.value.toggle(event);
    };
    return { adminPhoto, menu, toggle,checked,logOut };
  },
};
</script>
<style scoped>
:v-deep(.editable-cells-table td.p-cell-editing) {
  padding-top: 0;
  padding-bottom: 0;
}

/* :deep(.p-datatable.p-datatable-gridlines:has(.p-datatable-thead):has(.p-datatable-tbody) .p-datatable-tbody > tr > td){ */
/* padding-left: 8%; */
/* direction: rtl;
} */
</style>

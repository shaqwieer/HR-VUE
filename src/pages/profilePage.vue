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
  <div class="surface-200 h-screen flex justify-content-between">
    <div
      class="flex flex-column justify-content-start align-items-start w-8 mr-6 mt-6"
    >
      <p
        class="text-lg font-semibold mr-6 bg-orange-400 shadow-6 w-2 border-round-xl pr-4 pt-2 pb-2"
      >
        الصورة الشخصية
      </p>
      <div class="w-12 flex justify-content-between">
        <img
          src="../../assets/AvatarMaker.png"
          class="w-3 h-3 border-round-xl shadow-6"
          alt=""
        />
        <div
          class="w-7 surface-100 h-3 border-round-xl shadow-6 flex flex-column justify-content-center pr-5"
        >
          <p class="text-base font-semibold">
            رقم السرى:
            <span class="mr-4 bg-orange-400">{{ selectedInfo[0].id }}</span>
          </p>
          <Button
            label="قائمة الموظفين"
            severity="secondary"
            class="w-5 mt-4 mx-auto"
            @click="mainPage()"
          />
        </div>
      </div>

      <div class="flex justify-content-end flex-row w-12 mt-8">
        <div class="w-12 surface-100  border-round-xl shadow-6">
          <div v-if="choiceCompount == 1">
            <DataTable :value="selectedInfo" showGridlines stripedRows tableStyle="min-width: 20rem">
              <Column field="code" header="رقم الهوية"></Column>
              <Column field="name" header="اسم الموظف"></Column>
              <Column field="category" header="الحاله الاجتماعية"></Column>
              <Column field="quantity" header="المرتب"></Column>
            </DataTable>
          </div>
          <div v-else-if="choiceCompount == 2">
            <DataTable :value="selectedPun" showGridlines stripedRows tableStyle="min-width: 20rem">
              <Column field="name" header="اسم الموظف"></Column>
              <Column field="code" header="تاريخ العقوبة"></Column>
              <Column field="category" header="نوع العقوبة"></Column>
              <Column field="quantity" header="التقيم السلوكى"></Column>
            </DataTable>
          </div>
          <div v-else>
            <DataTable :value="selectedVac" showGridlines stripedRows tableStyle="min-width: 20rem">
              <Column field="name" header="اسم الموظف"></Column>
              <Column field="code" header="تاريخ الاجازة"></Column>
              <Column field="category" header="نوع الاجازة"></Column>
              <Column field="quantity" header="عدد ايام الاجازة"></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-content-end align-items-start w-4">
      <Sidebar v-model:visible="visible" position="left">
        <h2>بيانات الموظف</h2>
        <div class="flex flex-column gap-5">
          <Button
            label="البيانات الشخصية"
            severity="secondary"
            @click="changeCheck(1)"
          />
          <Button
            label="الجزاءات"
            severity="secondary"
            @click="changeCheck(2)"
          />
          <Button
            label="الاجازات"
            severity="secondary"
            @click="changeCheck(3)"
          />
        </div>
        <template #header>
          <div class="flex">
            <button class="p-sidebar-icon p-link mr-2">
              <span class="pi pi-print" />
            </button>
            <button class="p-sidebar-icon p-link mr-2">
              <span class="pi pi-search" />
            </button>
          </div>
        </template>
      </Sidebar>
      <Button
        label="اظهار  بيانات الموظف"
        class="ml-5 mt-5"
        severity="secondary"
        @click="visible = true"
      />
    </div>
  </div>
  <div class="surface-100 text-center h-5rem pt-3 pb-3">
    <p>تصميم مركز انتاج البرمجيات الرئيسى &copy;</p>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { usePrimeVue } from "primevue/config";
import { useStore } from "vuex";

export default {
  props: ["profileId"],
  setup(props) {
    const employees = [
      {
        id: "1000",
        code: "1",
        name: "محمد يسرى شوقى",
        category: "متزوج",
        quantity: 16000,
      },
      {
        id: "1001",
        code: "2",
        name: "احمد ايهاب مسعود",
        category: "اعزب",
        quantity: 66666,
      },
      {
        id: "1002",
        code: "3",
        name: "محمد احمد محمود",
        category: "اعزب",
        quantity: 87643,
      },
      {
        id: "1003",
        code: "4",
        name: "محمد شوقى يسرى ",
        category: "متزوج",
        quantity: 2345,
      },
      {
        id: "1004",
        code: "5",
        name: "محمد شوقى شوقى",
        category: "اعزب",
        quantity: 15678,
      },
      {
        id: "1005",
        code: "6",
        name: "محمد يسرى يسرى",
        category: "اعزب",
        quantity: 18790,
      },
      {
        id: "1006",
        code: "7",
        name: "يسرى يسرى شوقى",
        category: "متزوج",
        quantity: 16777,
      },
      {
        id: "1007",
        code: "8",
        name: "اسلام يسرى شوقى",
        category: "اعزب",
        quantity: 12366,
      },
      {
        id: "1008",
        code: "9",
        name: "محمد اسلام شوقى",
        category: "متزوج",
        quantity: 12886,
      },
      {
        id: "1009",
        code: "10",
        name: "محمد يسرى اسلام",
        category: "اعزب",
        quantity: 16000,
      },
      {
        id: "1010",
        code: "11",
        name: "محمود يسرى شوقى",
        category: "اعزب",
        quantity: 16000,
      },
      {
        id: "1011",
        code: "12",
        name: "محمد محمود شوقى",
        category: "متزوج",
        quantity: 14689,
      },
      {
        id: "1012",
        code: "13",
        name: "محمد يسرى محمود",
        category: "متزوج",
        quantity: 16523,
      },
      {
        id: "1013",
        code: "14",
        name: "السيد يسرى شوقى",
        category: "اعزب",
        quantity: 13689,
      },
      {
        id: "1014",
        code: "15",
        name: "محمد السيد شوقى",
        category: "متزوج",
        quantity: 95678,
      },
      {
        id: "1015",
        code: "16",
        name: "محمد يسرى السيد",
        category: "اعزب",
        quantity: 23456,
      },
      {
        id: "1016",
        code: "17",
        name: "على يسرى شوقى",
        category: "متزوج",
        quantity: 14567,
      },
      {
        id: "1017",
        code: "18",
        name: "محمد على شوقى",
        category: "اعزب",
        quantity: 78906,
      },
      {
        id: "1018",
        code: "19",
        name: "محمد يسرى على",
        category: "اعزب",
        quantity: 76543,
      },
      {
        id: "1019",
        code: "20",
        name: "مفتاح يسرى شوقى",
        category: "متزوج",
        quantity: 12345,
      },
      {
        id: "1020",
        code: "21",
        name: "محمد مفتاح شوقى",
        category: "اعزب",
        quantity: 13456,
      },
      {
        id: "1021",
        code: "22",
        name: "محمد يسرى مفتاح",
        category: "متزوج",
        quantity: 77777,
      },
      {
        id: "1022",
        code: "23",
        name: "محمد رضا شوقى",
        category: "اعزب",
        quantity: 77777,
      },
      {
        id: "1023",
        code: "23",
        name: "رضا يسرى شوقى",
        category: "اعزب",
        quantity: 23456,
      },
      {
        id: "1024",
        code: "25",
        name: "محمد يسرى رضا",
        category: "متزوج",
        quantity: 12345,
      },
    ];
    const vactions=[
        {
          id: "1000",
          code: "18/3/2021",
          name: "محمد يسرى شوقى",
          category: "سنويه",
          quantity: 8,
        },
        {
          id: "1001",
          code: "17/3/2021",
          name: "محمد يسرى شوقى",
          category: "عارضه",
          quantity: 1,
        },
        {
          id: "1002",
          code: "18/3/2022",
          name: "محمد احمد محمود",
          category: "نصف سنويه",
          quantity: 8,
        },
        {
          id: "1003",
          code: "18/3/2023",
          name: "محمد يسرى شوقى ",
          category: "سنويه",
          quantity: 4,
        },
        {
          id: "1004",
          code: "14/3/2021",
          name: "محمد احمد محمود",
          category: "راحه",
          quantity: 3,
        },
        {
          id: "1005",
          code: "18/5/2021",
          name: "محمد احمد محمود",
          category: "نصف سنويه ",
          quantity: 7,
        },
        {
          id: "1006",
          code: "18/8/2021",
          name: "يسرى يسرى شوقى",
          category: "سنويه",
          quantity: 8,
        },
        {
          id: "1007",
          code: "18/7/2021",
          name: "يسرى يسرى شوقى",
          category: "مرضيه",
          quantity: 7,
        },
        {
          id: "1008",
          code: "18/9/2021",
          name: "يسرى يسرى شوقى",
          category: "ماموريه",
          quantity: 3,
        },
        {
          id: "1009",
          code: "18/3/2013",
          name: "يسرى يسرى شوقى",
          category: "متوسطه",
          quantity: 6,
        },
        {
          id: "1010",
          code: "18/3/2015",
          name: "يسرى يسرى شوقى",
          category: "بعثه",
          quantity: 9,
        },
        {
          id: "1011",
          code: "18/1/2021",
          name: "يسرى يسرى شوقى",
          category: "طارئه",
          quantity: 1,
        },
        {
          id: "1012",
          code: "18/2/2021",
          name: "يسرى يسرى شوقى",
          category: "راحه",
          quantity: 3,
        },
        {
          id: "1013",
          code: "18/12/2021",
          name: "السيد يسرى شوقى",
          category: "سنويه",
          quantity: 9,
        },
        {
          id: "1014",
          code: "18/3/2021",
          name: "محمد السيد شوقى",
          category: "نصف سنويه",
          quantity: 6,
        },
        {
          id: "1015",
          code: "18/3/2016",
          name: "محمد السيد شوقى",
          category: "راحه",
          quantity: 5,
        },
        {
          id: "1016",
          code: "18/5/2018",
          name: "محمد السيد شوقى",
          category: "عارضه",
          quantity: 4,
        },
        {
          id: "1017",
          code: "18/7/2018",
          name: "محمد السيد شوقى",
          category: "عارضه",
          quantity: 3,
        },
        {
          id: "1018",
          code: "18/3/2008",
          name: "محمد يسرى على",
          category: "راحه",
          quantity: 7,
        },
        {
          id: "1019",
          code: "18/11/2021",
          name: "محمد يسرى على",
          category: "راحه",
          quantity: 9,
        },
        {
          id: "1020",
          code: "18/3/2021",
          name: "محمد يسرى على",
          category: "سنويه",
          quantity: 9,
        },
        {
          id: "1021",
          code: "18/3/2011",
          name: "محمد يسرى على",
          category: "نصف سنويه",
          quantity: 6,
        },
        {
          id: "1022",
          code: "18/3/2001",
          name: "محمد يسرى على",
          category: "راحه",
          quantity: 7,
        },
        {
          id: "1023",
          code: "18/3/2018",
          name: "محمد يسرى على",
          category: "سنويه",
          quantity: 5,
        },
        {
          id: "1024",
          code: "18/3/2009",
          name: "محمد يسرى رضا",
          category: "راحه",
          quantity: 5,
        },
        
      ];
      const punishment=[
        {
          id: "1000",
          code: "18/3/2021",
          name: "محمد يسرى شوقى",
          category: "شديده",
          quantity: 8,
        },
        {
          id: "1001",
          code: "17/3/2021",
          name: "محمد يسرى شوقى",
          category: "خفيف",
          quantity: 7,
        },
        {
          id: "1002",
          code: "18/3/2022",
          name: "محمد احمد محمود",
          category: "متوسطه",
          quantity: 8,
        },
        {
          id: "1003",
          code: "18/3/2023",
          name: "محمد يسرى شوقى ",
          category: "شديده",
          quantity: 4,
        },
        {
          id: "1004",
          code: "14/3/2021",
          name: "محمد احمد محمود",
          category: "شديده",
          quantity: 3,
        },
        {
          id: "1005",
          code: "18/5/2021",
          name: "محمد احمد محمود",
          category: "خفيف",
          quantity: 7,
        },
        {
          id: "1006",
          code: "18/8/2021",
          name: "يسرى يسرى شوقى",
          category: "خفيف",
          quantity: 8,
        },
        {
          id: "1007",
          code: "18/7/2021",
          name: "يسرى يسرى شوقى",
          category: "شديده",
          quantity: 7,
        },
        {
          id: "1008",
          code: "18/9/2021",
          name: "يسرى يسرى شوقى",
          category: "خفيف",
          quantity: 3,
        },
        {
          id: "1009",
          code: "18/3/2013",
          name: "يسرى يسرى شوقى",
          category: "متوسطه",
          quantity: 6,
        },
        {
          id: "1010",
          code: "18/3/2015",
          name: "يسرى يسرى شوقى",
          category: "خفيف",
          quantity: 9,
        },
        {
          id: "1011",
          code: "18/1/2021",
          name: "يسرى يسرى شوقى",
          category: "شديده",
          quantity: 1,
        },
        {
          id: "1012",
          code: "18/2/2021",
          name: "يسرى يسرى شوقى",
          category: "متزوج",
          quantity: 3,
        },
        {
          id: "1013",
          code: "18/12/2021",
          name: "السيد يسرى شوقى",
          category: "خفيف",
          quantity: 9,
        },
        {
          id: "1014",
          code: "18/3/2021",
          name: "محمد السيد شوقى",
          category: "خفيف",
          quantity: 6,
        },
        {
          id: "1015",
          code: "18/3/2016",
          name: "محمد السيد شوقى",
          category: "متوسطه",
          quantity: 5,
        },
        {
          id: "1016",
          code: "18/5/2018",
          name: "محمد السيد شوقى",
          category: "متوسطه",
          quantity: 4,
        },
        {
          id: "1017",
          code: "18/7/2018",
          name: "محمد السيد شوقى",
          category: "متوسطه",
          quantity: 3,
        },
        {
          id: "1018",
          code: "18/3/2008",
          name: "محمد يسرى على",
          category: "متوسطه",
          quantity: 7,
        },
        {
          id: "1019",
          code: "18/11/2021",
          name: "محمد يسرى على",
          category: "متوسطه",
          quantity: 9,
        },
        {
          id: "1020",
          code: "18/3/2021",
          name: "محمد يسرى على",
          category: "شديده",
          quantity: 9,
        },
        {
          id: "1021",
          code: "18/3/2011",
          name: "محمد يسرى على",
          category: "متوسطه",
          quantity: 6,
        },
        {
          id: "1022",
          code: "18/3/2001",
          name: "محمد يسرى على",
          category: "متوسطه",
          quantity: 7,
        },
        {
          id: "1023",
          code: "18/3/2018",
          name: "محمد يسرى على",
          category: "شديده",
          quantity: 5,
        },
        {
          id: "1024",
          code: "18/3/2009",
          name: "محمد يسرى رضا",
          category: "متوسطه",
          quantity: 5,
        },
        
      ];
    const selectedId = ref(props.profileId);
    const store = useStore();
    ////////
    const selectedData = employees.find(
      (employee) => employee.id === selectedId.value
    );
    const selectedInfo=[selectedData];
    ///////////
    const selectedVac = vactions.filter(
      (vac) => vac.name === selectedData.name
    );
    ////////////
    const selectedPun = punishment.filter(
      (pun) => pun.name === selectedData.name
    );

    /////////
    const checked = computed({
      get() {
        return store.getters.checked;
      },
      set(val) {
        store.commit("toggleChecked", val);
      },
    });
    const PrimeVue = usePrimeVue();
    watch(checked, function () {
      if (!checked.value) {
        PrimeVue.changeTheme("theme", "themeLight", "themeLink");
      } else {
        PrimeVue.changeTheme("themeLight", "theme", "themeLink");
      }
    });

    const visible = ref(false);
    const menu = ref();
    const choiceCompount = ref(1);
    const router = useRouter();
    function logOut() {
      router.replace("/");
      store.commit("isAuthenticated", false);
    }
    function mainPage() {
      router.push("/main");
    }
    function changeCheck(id) {
      switch (id) {
        case 2:
          choiceCompount.value = 2;
          break;
        case 3:
          choiceCompount.value = 3;

          break;
        default:
          choiceCompount.value = 1;

          break;
      }
    }

    const adminPhoto = require("../../assets/adminPhoto.png");
    const toggle = (event) => {
      menu.value.toggle(event);
    };

    return {
      visible,
      menu,
      adminPhoto,
      toggle,
      changeCheck,
      choiceCompount,
      logOut,
      mainPage,
      checked,
      selectedInfo,
      selectedVac,
      selectedPun
    };
  },
};
</script>

<style scoped></style>

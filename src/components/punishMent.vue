<template>
  <div class="card">
  
    <DataTable
      v-model:filters="filters"
      dataKey="id"
      v-model:selection="selectedProducts"
      filterDisplay="row"
      :loading="loading"
      :value="products"
      :globalFilterFields="['code', 'name', 'category', 'quantity']"
      tableStyle="min-width: 50rem"
      showGridlines
      stripedRows
      rowGroupMode="rowspan" 
      scrollable 
      scrollHeight="40rem"
      groupRowsBy="name"
      editMode="cell"
      tableClass="editable-cells-table "
      @cell-edit-complete="onCellEditComplete"
    >
      <template #header>
        <div class="flex justify-content-between align-items-center">
            <span class="p-input-icon-left hidden lg:flex">
              <i class="pi pi-search" />
              <InputText
                v-model="filters['global'].value"
                placeholder="بحث عام "
              />
            </span>
            <Button
            label="اضافة"
            icon="pi pi-plus"
            severity="success"
            class="mr-5 ml-2 w-10rem"
            @click="openNew"
          />
          <Button
            label="مسح"
            icon="pi pi-trash"
            severity="danger"
            class="ml-5 w-10rem"
            @click="confirmDeleteSelected"
            :disabled="!selectedProducts || !selectedProducts.length"
          />
          </div>
      </template>
      <template #empty> لا يوجد موظفين </template>
      <template #loading> جارى تحميل بيانات الموظفين </template>
      <Column
        selectionMode="multiple"
        style="width: 3rem"
        :exportable="false"
      ></Column>
      <Column field="name" sortable header=" اسم الموظف">
        <template #body="slotProps">
          <div class="flex align-items-center">
            <span> {{ slotProps.data.name }} </span>
          </div>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder=" بحث بأسم الموظف"

          />
        </template>
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" autofocus />
        </template>
      </Column>
      <Column field="code" sortable header="تاريخ العقوبة">
        <template #body="slotProps">
          <div class="flex align-items-center">
            <span> {{ slotProps.data.code }} </span>
          </div>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="بحث بتاريخ العقوبة "

          />
        </template>
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" autofocus />
        </template>
      </Column>
     
      <Column field="category" sortable header="نوع العقوبة">
        <template #body="slotProps">
          <div class="flex align-items-center">
            <span> {{ slotProps.data.category }} </span>
          </div>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="بحث بنوع العقوبة"
          />
        </template>
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" autofocus />
        </template>
      </Column>
      <Column field="quantity" sortable header="التقييم السلوكى">
        <template #body="slotProps">
          <div class="flex align-items-center">
            <span> {{ slotProps.data.quantity }} </span>
          </div>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="بحث بالتقييم السلوكى"
          />
        </template>
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" autofocus />
        </template>
      </Column>
    </DataTable>
  </div>
  <Dialog
      v-model:visible="deleteProductsDialog"
      :style="{ width: '450px' }"
      header="رسالة تأكيد"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="product">هل انت متأكد من مسح البيانات المحددة؟</span>
      </div>
      <template #footer>
        <Button
          label="لا"
          icon="pi pi-times"
          text
          @click="deleteProductsDialog = false"
        />
        <Button
          label="نعم"
          icon="pi pi-check"
          text
          @click="deleteSelectedProducts"
        />
      </template>
    </Dialog>
    <Dialog v-model:visible="productDialog" :style="{width: '600px'}" header="اضافة جزاءات" :modal="true" class="p-fluid">
            <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`" :alt="product.image" class="block m-auto pb-3" />
        
           
        
            <div class="field">
                <label for="name">اسم الموظف</label>
                <InputText id="name" v-model.trim="product.name" required="true" autofocus :class="{'p-invalid': submitted && !product.name}" />
                <small class="p-error" v-if="submitted && !product.name">Name is required.</small>
            </div>

            <div class="field">
                    <label for="code">تاريخ العقوبة</label>
                    <InputMask id="code" v-model="product.code" mask="9999/99/99" placeholder="99/99/9999" />
                </div>

            <div class="field">
                <label class="mb-3"> نوع العقوبة</label>
                <div class="formgrid grid">
                    <div class="field-radiobutton col-6">
                        <RadioButton id="category1" name="category" value="خفيفه" v-model="product.category" />
                        <label for="category1">خفيفه</label>
                    </div>
                    <div class="field-radiobutton col-6">
                        <RadioButton id="category2" name="category" value="متوسطه" v-model="product.category" />
                        <label for="category2">متوسطه</label>
                    </div>
                    <div class="field-radiobutton col-6">
                        <RadioButton id="category2" name="category" value="شديده" v-model="product.category" />
                        <label for="category2">شديده</label>
                    </div>
                    
                </div>
            </div>

                <div class="field ">
                    <label for="price">التقييم السلوكى</label>
                    <InputNumber id="price" v-model="product.quantity" locale="en-US" />
                </div>
                
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
                <Button label="Save" icon="pi pi-check" text @click="saveProduct" />
            </template>
        </Dialog>
</template>

<script>
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { ProductService } from "../service/punishmentService";

export default {
  setup() {
    const adminPhoto = require("../../assets/adminPhoto.png");
    const products = ref();

    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      category: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      quantity: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const loading = ref(true);
    const product = ref({});
    const productDialog = ref(false);
    const deleteProductsDialog = ref(false);
    const selectedProducts = ref();
    const confirmDeleteSelected = () => {
      deleteProductsDialog.value = true;
    };
    const deleteSelectedProducts = () => {
      products.value = products.value.filter(
        (val) => !selectedProducts.value.includes(val)
      );
      deleteProductsDialog.value = false;
      selectedProducts.value = null;
    };

    onMounted(() => {
      ProductService.getProducts().then((data) => (products.value = data));
      loading.value = false;
    });
    function isInDesiredForm(str) {
      var n = Math.floor(Number(str));
      return n !== Infinity && String(n) === str && n >= 0;
    }
    const onCellEditComplete = (event) => {
      let { data, newValue, field } = event;

      switch (field) {
        case "quantity":
        case "price":
          if (isInDesiredForm(newValue)) data[field] = newValue;
          else event.preventDefault();
          break;

        default:
          if (newValue.trim().length > 0) data[field] = newValue;
          else event.preventDefault();
          break;
      }
    };
    
    const submitted = ref(false);

const findIndexById = (id) => {
let index = -1;
for (let i = 0; i < products.value.length; i++) {
  if (products.value[i].id === id) {
      index = i;
      break;
  }
}

return index;
};
const createId = () => {
let id = '';
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
for ( var i = 0; i < 5; i++ ) {
  id += chars.charAt(Math.floor(Math.random() * chars.length));
}
return id;
}
const openNew = () => {
product.value = {};
submitted.value = false;
productDialog.value = true;
};
const hideDialog = () => {
productDialog.value = false;
submitted.value = false;
};
const saveProduct = () => {
submitted.value = true;

if (product.value.name) {
  if (product.value.id) {
      products.value[findIndexById(product.value.id)] = product.value;
  }
  else {
      product.value.id = createId();
      // product.value.code = createId();
      // product.value.image = 'product-placeholder.svg';
      // product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
      products.value.push(product.value);
  }

  productDialog.value = false;
  product.value = {};
}
};

    return {
      adminPhoto,
      products,
      filters,
      loading,
      onCellEditComplete,
      productDialog,
      deleteProductsDialog,
      selectedProducts,
      confirmDeleteSelected,
      deleteSelectedProducts,
      product,
        openNew,
        hideDialog,
        saveProduct,
        submitted
    };
  },
};
</script>

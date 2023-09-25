<template lang="">
    <Dialog>
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
</template>
<script>
export default {
    
}
</script>
<style lang="">
    
</style>
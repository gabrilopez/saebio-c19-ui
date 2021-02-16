<template>
  <div style="position: absolute;">
    <div
      class="modal"
      style="display: unset;"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ title }}
            </h5>
          </div>
          <div class="modal-body">
            {{ body }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="this.$emit('close')">
              {{ $t('modals.buttons.cancel') }}
            </button>
            <button type="button" class="btn btn-primary" @click="() => {this.$emit('accept'); this.$emit('close')}">
              {{ $t('modals.buttons.accept') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AcceptConfirmModal',
  props: {
    body: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
  .modal {
    backdrop-filter: blur(2px);
  }
  .modal-header {
    justify-content: center;
  }
</style>

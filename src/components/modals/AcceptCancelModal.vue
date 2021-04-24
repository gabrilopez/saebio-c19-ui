<template>
  <div style="position: absolute;">
    <div
      class="modal"
      style="display: unset;"
    >
      <div class="modal-dialog">
        <div class="modal-content" style="max-height: 70vh;">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ title }}
            </h5>
          </div>
          <div class="modal-body" style="overflow: scroll;">
            {{ body }}
          </div>
          <div class="modal-footer">
            <button
              v-if="showCancelButton"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="this.$emit('onClose')"
            >
              {{ $t('modals.buttons.cancel') }}
            </button>
            <button
              v-if="showAcceptButton"
              type="button"
              class="btn btn-primary"
              @click="() => {this.$emit('onAccept'); this.$emit('onClose')}"
            >
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
    showAcceptButton: {
      type: Boolean,
      default: true,
    },
    showCancelButton: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  emits: ['onAccept', 'onClose'],
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

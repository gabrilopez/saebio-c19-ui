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
          <div class="modal-body" style="overflow: scroll; white-space: pre-line;" v-html="body" />
          <div class="modal-footer">
            <button
              v-if="showCancelButton"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="$emit('on-close')"
            >
              {{ $t('modals.buttons.cancel') }}
            </button>
            <button
              v-if="showAcceptButton"
              type="button"
              class="btn btn-primary"
              @click="() => {$emit('on-accept'); $emit('on-close')}"
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
  emits: ['on-accept', 'on-close'],
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

<template>
  <div>
    <div class="notice-container">
      <span>{{ message }}</span>
      <div
        v-for="(backup, index) in backupList"
        :key="index.toString(10)"
        style="margin-top: 10px;"
      >
        <div class="notice" :style="{'border-color': backupHSL(backup)}">
          <strong :style="{'color': backupHSL(backup)}">{{ backupName(backup) }}</strong>
          <span>
            {{ $i18n.t('backups.numberOfSamples') }}: {{ backupRows(backup) }}
          </span>
          <span>
            {{ $i18n.t('backups.size') }}: {{ backup.size }}
          </span>
          <div class="round">
            <input
              :id="[`checkbox-${backup.name}`]"
              :checked="backup.selected"
              type="checkbox"
              @click="selectBackup(backup)"
              @click.prevent
            >
            <label :for="[`checkbox-${backup.name}`]" />
          </div>
        </div>
      </div>
    </div>
    <accept-cancel-modal
      v-if="showChangeBackupModal"
      :title="$i18n.t('backups.databaseChangeTitle')"
      :body="$i18n.t('backups.databaseChangeMessage', { name: backupName(newBackup) })"
      @accept="changeBackup"
      @close="closeChangeBackupModal"
    />
  </div>
</template>

<script>
import globalAxios from 'axios';
import AcceptCancelModal from '@/components/modals/AcceptCancelModal';

export default {
  name: 'BackupContainer',
  components: {
    AcceptCancelModal,
  },
  data() {
    return {
      backupList: [],
      message: '',
      newBackup: {
      },
      showChangeBackupModal: false,
    };
  },
  mounted() {
    this.getBackups();
  },
  methods: {
    backupHSL(backup) {
      const { name } = backup;
      let cont = 0;
      for (let i = 0; i < name.length; i += 1) {
        cont += name.charCodeAt(i);
      }
      cont += name.length * name.length;
      return `hsl(${(cont % 360) + (this.backupRows(backup) % 360)}, 100%, 50%)`;
    },
    backupName(backup) {
      const { name } = backup;
      return name
        ? name.substring(name.indexOf('-') + 1, name.length).replace('.db', '')
        : this.$t('backups.file');
    },
    backupRows(backup) {
      const { name } = backup;
      return name ? name.substring(0, name.indexOf(' ')) : 0;
    },
    changeBackup() {
      // TODO: CHANGE BACKUP
      // const { newBackup } = this;
      // Petición
    },
    closeChangeBackupModal() {
      this.showChangeBackupModal = false;
    },
    getBackups() {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      globalAxios.get('http://localhost:4567/backups', config)
        .then((result) => {
          const { data } = result;
          this.backupList = data.data;
          this.message = this.$i18n.t('backups.filesFound', {
            count: this.backupList.length,
          });
          console.log('RESULT DATA:', data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openChangeBackupModal() {
      this.showChangeBackupModal = true;
    },
    selectBackup(backup) {
      if (backup.selected) return;
      this.newBackup = backup;
      this.openChangeBackupModal();
    },
  },
};
</script>

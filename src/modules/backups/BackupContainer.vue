<template>
  <div>
    <div class="covid-navbar">
      <div class="row" style="justify-self: flex-start; align-items: center;">
        <div class="dropdown-menu">
          <router-link
            :to="{ name: 'covid-container' }"
          >
            {{ $i18n.t('navbar.covidLabel') }}
          </router-link>
        </div>
        <button
          id="dropdown-toggle"
          style="all: unset;"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img src="../../assets/icons/menu.png" width="24" height="24" alt="Menu">
        </button>
        <p class="h6 navbar-label">
          {{ $i18n.t('navbar.backupsLabel') }}
        </p>
      </div>
      <div>
        <img
          src="../../assets/icons/refresh.png"
          width="24"
          height="24"
          :alt="$i18n.t('metabase.alt.refresh')"
          @click="getBackups"
        >
      </div>
    </div>
    <div class="notice-container">
      <span>{{ backupList ? $i18n.t('backups.filesFound', { count: backupList.length }) : null }}</span>
      <div
        v-for="(backup, index) in backupList"
        :key="index.toString(10)"
        style="margin-top: 10px;"
      >
        <div class="notice" :style="{'border-color': backup.selected ? 'gray' : backupHSL(backup)}">
          <div class="notice-piece">
            <strong :style="{'color': backup.selected ? 'gray' : '#a5a5a5'}">{{ backupName(backup) }}</strong>
          </div>
          <div class="notice-piece">
            <span>
              {{ $i18n.t('backups.numberOfSamples') }}: {{ backupRows(backup) }}
            </span>
          </div>
          <div class="notice-piece">
            <span>
              {{ $i18n.t('backups.size') }}: {{ backup.size }}
            </span>
          </div>
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
import AcceptCancelModal from '@/components/modals/AcceptCancelModal';

export default {
  name: 'BackupContainer',
  components: {
    AcceptCancelModal,
  },
  data() {
    return {
      newBackup: {
      },
      showChangeBackupModal: false,
    };
  },
  computed: {
    backupList() {
      return this.$store.getters['BackupsStore/getBackupList'];
    },
  },
  mounted() {
    this.getBackups();
  },
  methods: {
    backupHSL(backup) {
      const string = JSON.stringify(backup);
      let cont = 0;
      for (let i = 0; i < string.length; i += 1) {
        cont += string.charCodeAt(i);
      }
      cont += string.length * string.length;
      return `hsl(${(cont % 360)}, 100%, 50%)`;
    },
    backupName(backup) {
      const { name } = backup;
      return name
        ? name.substring(name.indexOf('-') + 1, name.length).replace('.db', '')
        : this.$t('backups.file');
    },
    backupRows(backup) {
      const { rows } = backup;
      return rows || this.$t('backups.unknown');
    },
    changeBackup() {
      this.$store.dispatch('BackupsStore/changeDatabaseToBackup', this.newBackup);
      /*
      const postData = this.newBackup;
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      globalAxios.post('http://localhost:4567/change-database-to-backup', postData, config)
        .then((response) => {
          const { data } = response;
          this.backupList = data.data;
          console.log('SUCCESS', response);
        })
        .catch((error) => {
          console.log('ERROR', error);
        }); */
      // TODO: CHANGE BACKUP
      // const { newBackup } = this;
      // Petición
    },
    closeChangeBackupModal() {
      this.showChangeBackupModal = false;
    },
    getBackups() {
      this.$store.dispatch('BackupsStore/getBackups');
      /*
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      globalAxios.get('http://localhost:4567/backups', config)
        .then((result) => {
          const { data } = result;
          this.backupList = data.data;
          console.log('RESULT DATA:', data);
        })
        .catch((error) => {
          console.log(error);
        }); */
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

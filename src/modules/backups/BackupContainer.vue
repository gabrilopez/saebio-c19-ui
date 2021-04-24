<template>
  <div>
    <div class="covid-navbar">
      <div class="row" style="justify-self: flex-start; align-items: center;">
        <div class="dropdown-menu">
          <router-link
            class="dropdown-item"
            :to="{ name: 'metabase-container' }"
            style="cursor: pointer;"
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
          <fa class="navbar-icon" :icon="['fas', 'bars']" size="lg" />
        </button>
        <p class="h6 navbar-label">
          {{ $i18n.t('navbar.backupsLabel') }}
        </p>
      </div>
      <div>
        <fa
          class="navbar-icon"
          :icon="['fas', 'sync-alt']"
          size="lg"
          @click="getBackups"
        />
      </div>
    </div>
    <div class="notice-container">
      <div style="display: flex; justify-content: space-between;">
        <div v-if="loadingBackups">
        </div>
        <span v-if="!loadingBackups">{{ loadBackupsError
          ? $i18n.t('backups.connectionError')
          : $i18n.t('backups.filesFound', { count: backupList.length }) }}
        </span>
        <button
          :disabled="loadBackupsError"
          class="btn-primary btn"
          @click="createBackup"
        >
          {{ $i18n.t('backups.createBackup') }}
        </button>
      </div>
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
          <div class="notice-icon-piece">
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
            <div v-if="backup.selected" />
            <div
              v-if="!backup.selected"
              class="round round-red"
              @click="selectBackupToRemove(backup)"
            >
              <div />
              <label :for="[`delete-${backup.name}`]" style="justify-content: center; align-items: center; display: flex;">
                <img
                  src="../../assets/icons/delete.png"
                  style="position: absolute; z-index: 1;"
                  width="16"
                  height="16"
                >
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <accept-cancel-modal
      v-if="showRestoreBackupModal"
      :title="$i18n.t('backups.databaseChangeTitle')"
      :body="$i18n.t('backups.databaseChangeMessage', { name: backupName(newBackup) })"
      @onAccept="restoreBackup"
      @onClose="closeRestoreBackupModal"
    />
    <accept-cancel-modal
      v-if="showRemoveBackupModal"
      :title="$i18n.t('backups.removeBackupTitle')"
      :body="$i18n.t('backups.removeBackupMessage', { name: backupName(backupToRemove) })"
      @onAccept="removeBackup"
      @onClose="closeRemoveBackupModal"
    />
    <loading-full-page v-if="loadingBackups"/>
  </div>
</template>

<script>
import AcceptCancelModal from '@/components/modals/AcceptCancelModal';
import LoadingFullPage from '@/components/commons/LoadingFullPage';
import moment from 'moment';

export default {
  name: 'BackupContainer',
  components: {
    AcceptCancelModal,
    LoadingFullPage,
  },
  data() {
    return {
      newBackup: {
      },
      backupToRemove: {
      },
      showRestoreBackupModal: false,
      showRemoveBackupModal: false,
    };
  },
  computed: {
    backupList() {
      return this.$store.getters['BackupsStore/getBackupList'];
    },
    loadBackupsError() {
      return this.$store.getters['BackupsStore/getLoadBackupsError'];
    },
    loadingBackups() {
      return this.$store.getters['BackupsStore/getLoadingBackups'];
    },
    locale() {
      return this.$i18n.locale;
    },
  },
  watch: {
    locale(newVal) {
      moment.locale = newVal;
    },
  },
  mounted() {
    this.getBackups();
  },
  methods: {
    backupHSL(backup) {
      const { rows } = backup;
      const string = JSON.stringify(backup);
      let cont = 0;
      for (let i = 0; i < string.length; i += 1) {
        cont += string.charCodeAt(i);
      }
      cont += string.length * string.length;
      return `hsl(${((cont + rows) % 360)}, 100%, 50%)`;
    },
    backupName(backup) {
      const { name, selected } = backup;
      if (selected) return this.$t('backups.currentDatabase');
      moment.locale(this.$i18n.locale);
      const dateString = name.substring(name.indexOf(' ') + 1, name.length).replace('.db', '').replaceAll('-', '/').replaceAll('.', ':');
      const momentObj = moment(dateString, 'DD-MM-YYYY hh:mm:ss');
      return momentObj.isValid() ? momentObj.format('dddd, DD MMMM YYYY (hh:mm a)') : this.$t('backups.file');
    },
    backupRows(backup) {
      const { rows } = backup;
      return Number.isInteger(rows) ? rows : this.$t('backups.unknown');
    },
    restoreBackup() {
      this.$store.dispatch('BackupsStore/restoreBackup', this.newBackup);
    },
    closeRestoreBackupModal() {
      this.showRestoreBackupModal = false;
    },
    closeRemoveBackupModal() {
      this.showRemoveBackupModal = false;
    },
    createBackup() {
      this.$store.dispatch('BackupsStore/createBackup');
    },
    getBackups() {
      this.$store.dispatch('BackupsStore/getBackups');
    },
    openRestoreBackupModal() {
      this.showRestoreBackupModal = true;
    },
    openRemoveBackupModal() {
      this.showRemoveBackupModal = true;
    },
    removeBackup() {
      this.$store.dispatch('BackupsStore/removeBackup', this.backupToRemove);
    },
    selectBackup(backup) {
      if (backup.selected) return;
      this.newBackup = backup;
      this.openRestoreBackupModal();
    },
    selectBackupToRemove(backup) {
      if (backup.selected) return;
      this.backupToRemove = backup;
      this.openRemoveBackupModal();
    },
  },
};
</script>

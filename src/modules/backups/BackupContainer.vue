<template>
  <div>
    <div
      v-for="(backup, index) in backupList"
      :key="index.toString(10)"
      class="notice-container"
    >
      <div class="notice" :style="{'border-color': nameToHSL(backup.name)}">
        <strong :style="{'color': nameToHSL(backup.name)}">{{ backupName(backup) }}</strong>
        <span>
          {{ $i18n.t('backups.numberOfSamples') }}: {{ backupRows(backup) }} {{ $i18n.t('backups.size') }}: {{ backup.size }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackupContainer',
  data() {
    return {
      backupList: [],
    };
  },
  methods: {
    backupName(backup) {
      const { name } = backup;
      return name
        ? name.substring(name.indexOf('-') + 1, name.length).replace('.db', '')
        : 'Archivo';
    },
    backupRows(backup) {
      const { name } = backup;
      return name ? name.substring(0, name.indexOf('-')) : 0;
    },
    nameToHSL(name) {
      let cont = 0;
      for (let i = 0; i < name.length; i += 1) {
        cont += name.charCodeAt(i);
      }
      cont += name.length * name.length;
      return `hsl(${cont % 360}, 100%, 50%)`;
    },
  },
};
</script>

<style scoped>

</style>

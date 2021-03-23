const es = {
  /* BACKUPS */
  backups: {
    connectionError: 'Error en la petición al servidor',
    createBackup: 'Crear copia de seguridad',
    currentDatabase: 'Base de datos actual',
    databaseChangeMessage: 'Se cambiará la base de datos a {name}. La actual base de datos se perderá, ¿Desea continuar?',
    databaseChangeTitle: 'Confirme el cambio de base de datos',
    file: 'Archivo',
    filesFound: '{count} archivo(s) encontrados',
    numberOfSamples: 'Número de muestras',
    removeBackupMessage: 'La copia de seguridad {name} será eliminada. Esta operación no se puede deshacer, ¿Desea continuar?',
    removeBackupTitle: 'Confirme el borrado de la copia de seguridad',
    size: 'Tamaño',
    unknown: 'Desconocido',
  },

  /* METABASE */
  metabase: {
    alt: {
      refresh: 'Refrescar',
      upload: 'Subir archivo',
    },
    buttons: {
      close: 'Cerrar',
      download: 'Descargar',
      seeErrors: 'Ver errores',
      send: 'Enviar',
      tryAgain: 'Intentar de nuevo',
    },
    messages: {
      fileErrorLines: 'Líneas erróneas encontradas',
      selectFile: 'Seleccione un archivo CSV para cargar su contenido',
      selectFileError: 'Archivo no válido. Seleccione un archivo CSV para continuar',
      uploadFileError: 'Ha ocurrido un error al conectar con el servidor. Por favor, inténtelo de nuevo más tarde',
      uploadFileServerMessage: 'La carga de muestras ha finalizado. Añadidas {added} muestras, {errors} errores',
    },
  },

  /* MODALS */
  modals: {
    buttons: {
      accept: 'Aceptar',
      cancel: 'Cancelar',
    },
  },

  /* NAVBAR */
  navbar: {
    backups: 'Copias de seguridad',
    backupsLabel: 'Copias de seguridad de la base de datos',
    covidDashboard: 'Covid-19',
    covidLabel: 'Estadísticas metabase',
    samplesDashboard: 'Muestras',
  },

  saebio: 'Saebio',
};

export default es;

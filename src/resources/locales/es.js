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
      alreadyExistingSamples: 'Filas con muestras ya registradas en la base de datos',
      fileErrorLines: 'Filas erróneas encontradas',
      insertError: 'Filas afectadas por un error al insertar en la base de datos',
      rowFormatError: 'Filas con errores de formato en el archivo CSV',
      selectFile: 'Seleccione un archivo CSV para cargar su contenido',
      selectFileError: 'Archivo no válido. Seleccione un archivo CSV para continuar',
      uploadFileError: 'Ha ocurrido un error al conectar con el servidor. Por favor, inténtelo de nuevo más tarde',
      uploadFileServerMessage: 'La carga de muestras ha finalizado. Añadidas {added} muestras, {errors} errores.',
      uploadFileServerMessageUpdatedSamples: 'Actualizados el motivo, linaje y variante de {updatedReasonLineageVariant} muestras.',
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
    covidDashboard: 'Cuadro de mando general',
    covidLabel: 'Estadísticas metabase',
    samplesDashboard: 'Cuadro de mando de muestras',
    lineagesDashboard: 'Cuadro de mando de linajes',
  },

  notifications: {
    createBackupSuccess: '¡Copia de seguridad creada correctamente!',
    createBackupError: 'No se ha podido crear la copia de seguridad',
    errorTitle: 'Error',
    getBackupsError: 'No se han podido cargar las copias de seguridad',
    removeBackupSuccess: '¡Copia de seguridad eliminada correctamente!',
    removeBackupError: 'No se ha podido eliminar la copia de seguridad',
    restoreBackupSuccess: '¡Copia de seguridad restaurada correctamente!',
    restoreBackupError: 'No se ha podido restaurar la copia de seguridad',
    successTitle: '¡Hecho!',
    uploadSamplesSuccess: '¡El archivo CSV ha sido procesado!',
    uploadSamplesError: 'No se ha podido procesar el archivo CSV',
  },

  saebio: 'Saebio',
};

export default es;

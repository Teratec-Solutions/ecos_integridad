# Variables de entorno

## Carpeta server

Acá se debe crear un archivo ```.env```

```properties
PORT=5103
NODE_ENV='development'
#MONGODB
COMPLET_URL='mongodb+srv://tesso:camarasip2022@cluster0.du1lf.mongodb.net/ecos-integridad-development'
DEFAULT_LANGUAGE='es'
PLATFORM_NAME='Ecos Integridad'
NOMBRE='Gonzalo'
APELLIDO1='Orellana'
EMAIL='gonzalo.orellana@tesso.cl'
PASSWORD='ecosIntegridad*2022'
ROLE='superAdmin'
# Storage Azure
AZURE_ACCOUNT='ecosintegridad'
STORAGE_URL='https://ecosintegridad.blob.core.windows.net/'
#TOKEN_SAS_BLOB='sp=racwdli&st=2022-01-10T00:14:05Z&se=2022-01-10T08:14:05Z&spr=https&sv=2020-08-04&sr=c&sig=D8MVsycwMtEXXvscpnkpEussrqUujrbMUjplXCwU0HQ%3D'
ACCESS_KEYS='DefaultEndpointsProtocol=https;AccountName=ecosintegridad;AccountKey=Hm3KZbZC0ng0vk+f03nB1P5HoE94hY3BkkwFNOmxItCqG00kpa1b0BvKn3k9fvfHcY29xXPCfkfM+AStTy1pDA==;BlobEndpoint=https://ecosintegridad.blob.core.windows.net/;QueueEndpoint=https://ecosintegridad.queue.core.windows.net/;TableEndpoint=https://ecosintegridad.table.core.windows.net/;FileEndpoint=https://ecosintegridad.file.core.windows.net/;'
#ACCESS_KEYS='DefaultEndpointsProtocol=https;AccountName=icvmantencion;AccountKey=cz+hJzm3PrM0bYun7IU1OjlFJH7xrHcrgqtI4pGxPBmyT0PEl/+fc+o32YKZRzYt68H/zrTFKJ3HyY+zk9eC0A==;EndpointSuffix=core.windows.net'
REPORT_IMAGES_CONTAINER='REPORTES-DEV'
PDF_CONTAINER='pdf-dev'
```
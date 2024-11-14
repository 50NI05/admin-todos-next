# Development
Pasos para levantar la app en desarrollo

1. levantar la base de datos
```
docker compose up -d
```

2.  Crear una copia del env.template, y Renombrar el env.template a .env

3. Reemplazar las variables de 

4. Ejecutar el comando ```npm install```

5. Ejecutar el comando ```npm run dev```

6. Ejecutar estos comandos de prisma
```
npx prisma migrate dev
npx prisma generate
```

7. Ejecutar el SEED para [crear la base de datos local](http://localhost:3000/api/seed)

# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
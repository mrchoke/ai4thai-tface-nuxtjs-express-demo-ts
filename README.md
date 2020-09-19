# ตัวอย่างการใข้งาน AI For Thai T-Face API ด้วย Nuxt.js & Expess

## Config

```bash
.env
```

```bash
API_KEY=aadsdfsdfrwerjkwejrkl
PROJECT_ID=sdfse-werw-er-wer
```

[ศึกษาเพิ่มเติม](https://aiforthai.in.th)

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev:express

# build for production and launch server
$ yarn build
$ yarn start:express

# generate static project
$ yarn generate
```

## Docker Compose

### Build and Up

```bash
docker-compose up -d
```

### Rebuild and Up

```bash
docker-compose up --build -d
```

### Down

```bash
docker-compose down
```

## Docker with out Compose

### Build
```bash
docker build -t yourname/tface-nuxt:1 .
```

### Run

```bash
docker run -itd -p3000:3000 -name tface yourname/tface-nuxt:1
```

### Down

```bash
docker stop tface
docker rm  tface
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

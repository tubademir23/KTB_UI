# Proje Hakkında
## Bu proje basit bir crud operasyonları takip etmekte olup tek bir ekrandan(Eser İşlemleri) oluşmaktadır.

`crud-utils` dosyası generic olarak crud işlemlerini gerçekleştirmektedir.

`API` tarafı Serverless [`AWS Lambda`](https://aws.amazon.com/tr/lambda/?nc2=h_ql_prod_cp_lbd)'da oluşturulmuştur ve aynı şekilde generic yapıdadır.

Veritabanı olarak NoSQL [`DynamoDB`](https://aws.amazon.com/tr/dynamodb/?nc2=h_ql_prod_serv_ddb) kullanmaktadır.

Başka bir tablo kullanılmak istenirse;
### `Eser.js`
dosyası örnek alınabilir.

İşlem yapılan tabloya yeni bir column eklenmek istenirse, kayıt formuna yeni alanın eklenmesi yeterlidir.

Uygulama; [Versel](https://ktb-ui.vercel.app/) üzerinnden yayınlanmaktadır.

Ekran Görüntüsü:
![alt text](KTB_.png?raw=true)
_________________________________________________
# Getting Started with Mebsis

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
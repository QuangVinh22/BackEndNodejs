# Sử dụng hình ảnh cơ sở Node.js
FROM node:20.10.0

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép file 'package.json' và 'package-lock.json' (nếu có) vào thư mục làm việc
COPY package*.json ./

# Cài đặt các phụ thuộc của ứng dụng
RUN npm install

# Sao chép tất cả các file còn lại của dự án vào thư mục làm việc trong container
COPY . .

# Cung cấp thông tin về port mà ứng dụng sẽ chạy trên đó
EXPOSE 3000

# Định nghĩa lệnh để chạy ứng dụng
CMD ["npm", "start"]

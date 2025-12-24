# 阶段1：构建React应用
FROM node:16-alpine as build
WORKDIR /app
# 复制依赖文件
COPY package.json package-lock.json ./
# 安装依赖
RUN npm install
# 复制源代码
COPY . .
# 构建生产版本
RUN npm run build

# 阶段2：部署到Nginx
FROM nginx:alpine
# 复制构建产物到Nginx静态目录
COPY --from=build /app/build /usr/share/nginx/html
# 复制自定义Nginx配置（处理React路由）
COPY nginx.conf /etc/nginx/conf.d/default.conf
# 暴露端口
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
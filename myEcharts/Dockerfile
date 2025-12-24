FROM nginx:alpine
# 复制所有静态文件到Nginx
COPY . /usr/share/nginx/html
# 无需复杂路由，使用默认Nginx配置即可
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
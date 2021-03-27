# 指定Node版本
FROM node

# 将代码复制到Docker容器中的Web目录
COPY . /web

# 容器中应用程序的路径。将Web目录作为工作目录
WORKDIR /web

# 安装依赖
RUN npm install 

# 暴露容器内部访问端口，根据项目变动
EXPOSE 3000

## 如果是Vue CLi，则换成 yarn serve
CMD ["npm", "run", "dev"]
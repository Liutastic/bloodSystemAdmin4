#!bin/bash
# read -p "请输入目录:" Dir
# echo "开始打包..."
# npm run build:devh5
project="o2o"
gitBase="git@47.107.73.162:wendidi/gysa_official_web.git"
echo "开始拉取部署的项目："
branch="develop"

git clone -b $branch --depth=1 $gitBase deployDir
echo "拉取完成,开始替换文件"
if [ ! -d ./deployDir/$project  ];then
  mkdir ./deployDir/$project
else
  echo dir exist
fi
cd ./deployDir/$project && rm -rf ./*
cd ../../ && cp -r ./dist/dev/h5/* ./deployDir/$project
echo "文件替换完成，开始提交代码"
# now=$(date "+%Y-%m-%d")
cd ./deployDir && git add -A && git commit -m "buid: $project" && git pull && git push -u origin $branch
echo "提交完成,删除目录.."
cd ../ && rm -rf ./deployDir
echo  -e "\033[32m "操作完成\!按任意键结束" \033[0m" 
read -n 1
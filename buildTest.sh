#!/bin/bash
# BACKUP_DIR=/www/wwwroot/admin.vodeshop.com/backup

# WEBSITE_DIR=/www/wwwroot/admin.vodeshop.com/release

# CODE_DIR=/www/wwwroot/admin.vodeshop.com/code
BASE_DIR=/e/project/framwork
BACKUP_DIR=${BASE_DIR}/backup

WEBSITE_DIR=${BASE_DIR}/release

CODE_DIR=${BASE_DIR}/code


TIMEPOINT=$(date +%Y-%m-%d)
COPIES=30  # 备份天数

cd $CODE_DIR
echo "开始拉取项目"
git checkout master && git pull
echo "拉取项目 success 开始构建...."
yarn build
echo "build项目success"

test ! -d "$BACKUP_DIR" && mkdir -p "$BACKUP_DIR"
test ! -d "$WEBSITE_DIR" && mkdir -p "$WEBSITE_DIR"

test ! -w $BACKUP_DIR && echo "Error: $BACKUP_DIR is un-writeable." && exit 0

umask 0077

tar -zcf $BACKUP_DIR/www.$TIMEPOINT.tar.gz $WEBSITE_DIR
echo "从release备份到backup文件夹压缩success"

find $BACKUP_DIR -type f -mtime +$COPIES -delete

cp -r $CODE_DIR/dist/* $WEBSITE_DIR/
echo  -e "\033[32m "部署完成" \033[0m" 



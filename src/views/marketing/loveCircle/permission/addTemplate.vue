<template>
  <d2-container>
    <template slot="header">新增/编辑权限模板</template>
    <el-row class="mb-25" type="flex" align="center">
      <span class="label flex align-center">模板名称：</span>
      <el-input
        size="mini"
        class="input"
        maxlength="8"
        show-word-limit
        placeholder="请输入内容"
        v-model="formData.title">
      </el-input>
    </el-row>
    <el-row class="mb-25" type="flex" align="center">
      <span class="label flex align-center">权限分配：</span>
      <el-button size="mini" type="primary" @click="selectAll">全选权限</el-button>
      <el-button size="mini" type="danger" @click="clearAll">清空权限</el-button>
    </el-row>
    <el-row class="mb-25" type="flex" align="center">
      <span class="label flex align-center">商城&美肌：</span>
      <el-checkbox-group v-model="mallCheckList">
        <el-checkbox v-for="(item, index) in mallOption" :value="item.id" :key="index" :label="item.title"></el-checkbox>
      </el-checkbox-group>
    </el-row>
    <el-row class="mb-25" type="flex" align="center">
      <span class="label flex align-center">名媛私享：</span>
      <el-checkbox-group v-model="dymCheckList">
        <el-checkbox v-for="(item, index) in dymOption" :value="item.id" :key="index" :label="item.title"></el-checkbox>
      </el-checkbox-group>
    </el-row>
    <el-row class="mb-25" type="flex" align="center">
      <span class="label flex align-center">O2O新零售：</span>
      <el-checkbox-group v-model="retailCheckList">
        <el-checkbox v-for="(item, index) in retailOption" :value="item.id" :key="index" :label="item.title"></el-checkbox>
      </el-checkbox-group>
    </el-row>
    <el-row class="mt-40" type="flex" align="center" justify="center">
     <el-button @click="save" size="mini" type="primary">保存</el-button>
    </el-row>
  </d2-container>
</template>

<script>
export default {
  name: 'addTemplate',
  data () {
    return {
      formData: {
        title: '',
        competence: []
      },
      id: null,
      // 各有所爱权限 0= 普通用户 1=saver会员 2=三星服务商 3=五星服务商 4=七星服务商
      mallOption: [
        { title: '普通用户', id: 0 },
        { title: 'saver会员', id: 1 },
        { title: '三星服务商', id: 2 },
        { title: '五星服务商', id: 3 },
        { title: '七星服务商', id: 4 }
      ],
      mallCheckList: [],
      // 名媛私享 0= 普通用户 1=名媛 2=名流 3=大王
      dymOption: [
        { title: '普通用户', id: 0 },
        { title: '名媛', id: 1 },
        { title: '名流', id: 2 },
        { title: '大王', id: 3 }
      ],
      dymCheckList: [],
      // O2O新零售 0= 普通用户 1=联合店长 2=店铺合伙人 3=标准店主 4=区代 5=市代
      retailOption: [
        { title: '普通用户', id: 0 },
        { title: '联合店长', id: 1 },
        { title: '店铺合伙人', id: 2 },
        { title: '标准店主', id: 3 },
        { title: '区代', id: 4 },
        { title: '市代', id: 5 }
      ],
      retailCheckList: []
    }
  },
  methods: {
    // 获取权限详细
    async getPermissionDetail () {
      const { code, msg, data } = await this.$apis.GetPermissionDetail({ id: this.id })
      console.log(code, msg, data)
      if (code === 0) {
        console.log('成功了')
        this.formData.title = data.title
        this.mallCheckList = this.handelTagShowList(data.competence.mall, this.mallOption)
        this.dymCheckList = this.handelTagShowList(data.competence.dym, this.dymOption)
        this.retailCheckList = this.handelTagShowList(data.competence.retail, this.retailOption)
        console.log(this.mallCheckList, this.dymCheckList, this.retailCheckList)
      }
    },
    // 处理编辑回显的所选权限数据
    handelTagShowList (selList, optionList) {
      const list = []
      selList.forEach(val => {
        const item = optionList.find(item => item.id === Number(val))
        list.push(item.title)
      })
      return list
    },
    // 处理保存的时候所选择权限的数据
    handelTagList (selList, optionList, tag) {
      const list = []
      selList.forEach(val => {
        const item = optionList.find(item => item.title === val)
        list.push({ tag: tag + item.id })
      })
      return list
    },
    async save () {
      if (!this.formData.title) {
        this.$message({
          message: '权限模板名称不能为空！',
          type: 'warning'
        })
        return
      }
      if (!this.mallCheckList.length || !this.dymCheckList.length || !this.retailCheckList.length) {
        this.$message({
          message: '请选择权限！',
          type: 'warning'
        })
        return
      }
      const mallTagList = this.handelTagList(this.mallCheckList, this.mallOption, 'mall_')
      const dymTagList = this.handelTagList(this.dymCheckList, this.dymOption, 'dym_')
      const retailTagList = this.handelTagList(this.retailCheckList, this.retailOption, 'retail_')
      this.formData.competence = [...mallTagList, ...dymTagList, ...retailTagList]
      if (this.id) this.formData.id = this.id
      console.log('mallTagList', mallTagList, dymTagList, retailTagList)
      const { code, msg, data } = await this.$apis.AddAndEditPermission(this.formData)
      console.log(code, msg, data)
      if (code === 0) {
        this.$message({
          message: '操作成功！',
          type: 'success'
        })
        // setTimeout(() => {
        //   this.$router.back(-1)
        // }, 2000)
        setTimeout(() => {
          this.$router.push({
            path: '/marketing/loveCircle/permission/template'
          })
        }, 2000)
      }
      // const tagList = [...this.mallCheckList, ...this.dymCheckList, ...this.retailCheckList]
    },
    selectAll () {
      this.mallCheckList = this.mallOption.reduce((pre, cur) => {
        pre.push(cur.title)
        return pre
      }, [])
      this.dymCheckList = this.dymOption.reduce((pre, cur) => {
        pre.push(cur.title)
        return pre
      }, [])
      this.retailCheckList = this.retailOption.reduce((pre, cur) => {
        pre.push(cur.title)
        return pre
      }, [])
    },
    clearAll () {
      this.mallCheckList = []
      this.dymCheckList = []
      this.retailCheckList = []
    }
  },
  mounted () {
    console.log('this.$route.query', this.$route.query)
    // 通过传参数type来判断是新增还是修改
    this.id = this.$route.query.id ? this.$route.query.id : null
    if (this.id) this.getPermissionDetail()
  }
}
</script>

<style lang="scss" scoped>
.flex{
  display:flex;
}
.align-center{
  align-items: center;
}
.mb-25{
  margin-bottom:25px;
}
.input{
  width:30%;
}
.mt-40{
  margin-top:40px;
}
.label{
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
</style>
